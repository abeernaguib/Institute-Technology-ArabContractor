import React, { useEffect, useRef, useState } from "react";
const API_BASE_URL = 'https://icemt.arabcont.com/api';

// الـ logo من الـ API بييجي full URL من الـ Blob Storage، بنستخدمه مباشرة
const FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f3f4f6' width='100' height='100'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='44' fill='%23899aaa'%3E%F0%9F%8F%A2%3C/text%3E%3C/svg%3E";

// Each card fades + slides up the first time it enters the viewport.
// Hover effects are limited to md+ screens; on touch screens the card reacts to press (active).
const CustomerCard = ({ item, index }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Respect "reduce motion" system setting: show immediately, no animation
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="group flex flex-col items-center"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.92)',
                transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: `${(index % 6) * 80}ms`,
            }}
        >
            <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 active:-translate-y-2 active:scale-95 active:border-[#0865a8]/30 active:shadow-lg md:group-hover:-translate-y-2 md:group-hover:shadow-lg">
                <img
                    src={item.logo || FALLBACK}
                    alt={item.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 md:group-hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK; }}
                />
            </div>

            <p className="mt-4 line-clamp-2 px-2 text-center text-xs font-semibold text-gray-500 transition-colors duration-300 group-active:text-[#0865a8] md:text-sm md:group-hover:text-[#0865a8]">
                {item.name}
            </p>
        </div>
    );
};

const CustomersPage = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/Customer`);
                if (!response.ok) throw new Error('فشل في تحميل بيانات العملاء');
                const data = await response.json();
                setCustomers(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-white font-['Droid_Arabic_Kufi']"
        >
            {/* Fixed Overview Bar — SAME STYLE & COLORS */}
            <div style={{ position: 'fixed', top: 70, left: 0, zIndex: 50, width: '100%', borderBottom: '1px solid #d1d5db', backgroundColor: '#f5f5f5', padding: '8px 20px' }}>
                <div style={{ textAlign: 'center', fontFamily: '"Noto Kufi Arabic", serif', fontSize: '1rem' }}>
                    <a
                        href="/"
                        style={{ color: '#0865a8', fontWeight: 700, textDecoration: 'none', marginLeft: '8px' }}
                        onMouseEnter={e => e.target.style.color = '#f57c00'}
                        onMouseLeave={e => e.target.style.color = '#0865a8'}
                    >
                        الصفحة الرئيسية
                    </a>
                    <span style={{ color: '#6b7280', margin: '0 6px' }}>•</span>
                    <span style={{ color: '#374151', marginRight: '8px' }}>عملاؤنا</span>
                </div>
            </div>

            {/* PAGE CONTENT */}
            <div className="container mx-auto px-9 pt-[110px] pb-24 sm:px-9 lg:px-16">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-[#0865a8] md:text-4xl">
                        عملاؤنا
                    </h1>
                    <div className="mx-auto mb-3 h-1 w-20 rounded-full bg-[#f57c00]" />
                    <p className="text-gray-600">
                        نسعى دائمًا لإرضاء العميل بتقديم أفضل الخدمات
                    </p>
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-4 border-[#0865a8]"></div>
                            <p className="text-lg text-gray-700">جاري تحميل العملاء...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mx-auto max-w-2xl">
                        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
                            <p className="mb-2 font-bold text-red-700">حدث خطأ</p>
                            <p className="text-red-600">{error}</p>
                        </div>
                    </div>
                )}

                {!loading && !error && (
                    customers.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="text-lg text-gray-600">لا يوجد عملاء لعرضهم حاليًا</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {customers.map((item, index) => (
                                <CustomerCard key={item.id} item={item} index={index} />
                            ))}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default CustomersPage;