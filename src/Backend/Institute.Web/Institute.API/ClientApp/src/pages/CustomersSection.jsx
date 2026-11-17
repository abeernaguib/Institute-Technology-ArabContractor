import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'https://icemt.arabcont.com/api';
const AUTO_PLAY_MS = 4000;
const SWIPE_THRESHOLD = 40;

// الـ logo من الـ API بييجي full URL من الـ Blob Storage، بنستخدمه مباشرة
const FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f3f4f6' width='100' height='100'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='44' fill='%23899aaa'%3E%F0%9F%8F%A2%3C/text%3E%3C/svg%3E";

const CustomersSection = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(6);
    const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
    const touchStartX = useRef(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/Customer`);
                if (!response.ok) throw new Error('فشل في تحميل بيانات العملاء');
                setCustomers(await response.json());
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    // Sync JS logic with Tailwind breakpoints
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) setItemsPerSlide(2);
            else if (width < 768) setItemsPerSlide(3);
            else if (width < 1024) setItemsPerSlide(4);
            else if (width < 1280) setItemsPerSlide(5);
            else setItemsPerSlide(6);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalSlides = Math.ceil(customers.length / itemsPerSlide);

    // Reset index if it exceeds new totalSlides on resize / data change
    useEffect(() => {
        if (currentIndex >= totalSlides) setCurrentIndex(0);
    }, [itemsPerSlide, totalSlides, currentIndex]);

    const nextSlide = () => {
        if (!totalSlides) return;
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };
    const prevSlide = () => {
        if (!totalSlides) return;
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };
    const goToSlide = (index) => {
        setDirection(index >= currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    // Auto-play. Depends on currentIndex so the timer restarts after any manual change/swipe.
    useEffect(() => {
        if (totalSlides <= 1) return undefined;
        const timer = setTimeout(nextSlide, AUTO_PLAY_MS);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, totalSlides]);

    // Touch swipe (the arrow buttons are hidden on small screens)
    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) < SWIPE_THRESHOLD) return;
        // RTL layout: swiping left reveals the next slide
        if (dx < 0) nextSlide();
        else prevSlide();
    };

    const getVisibleCustomers = () => {
        const start = currentIndex * itemsPerSlide;
        return customers.slice(start, start + itemsPerSlide);
    };

    // Nothing to show (API failed or no active customers): hide the whole section instead of an empty block
    if (!loading && (error || customers.length === 0)) return null;

    return (
        <section style={{ height: '500px' }} className="bg-gray-5 overflow-hidden py-1 md:py-2" dir="rtl">
            {/* Keyframes live here so the animation doesn't depend on tailwind.config */}
            <style>{`
                @keyframes customerCardIn {
                    from { opacity: 0; transform: translateX(var(--from-x, 40px)) scale(0.88); }
                    to   { opacity: 1; transform: translateX(0) scale(1); }
                }
                .customer-card-anim {
                    animation: customerCardIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
                }
                @media (prefers-reduced-motion: reduce) {
                    .customer-card-anim { animation: none; }
                }
            `}</style>

            <div className="container mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="mb-16 text-center">
                    <Link to="/customers" className="group/title inline-block">
                        <h3 className="mb-1 text-3xl font-bold text-[#065a8a] transition-colors group-hover/title:text-blue-700 md:text-4xl">
                            عملاؤنا
                        </h3>
                        <div className="mx-auto mb-1 h-1 w-20 rounded-full bg-[#065a8a] transition-all group-hover/title:w-32"></div>
                    </Link>
                    <p className="text-gray-600">نسعى دائما لإرضاء العميل بتقديم أفضل الخدمات</p>
                </div>

                {/* Slider Wrapper */}
                <div className="group relative">

                    <button
                        onClick={prevSlide}
                        aria-label="Previous"
                        className="-translate-y-1/2 absolute -left-4 top-1/2 z-20 hidden rounded-full bg-white/90 p-2 opacity-0 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-[#065a8a] hover:text-white sm:block md:-left-6 md:p-3"
                    >
                        <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div
                        className="w-full"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center py-16">
                                <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-[#065a8a]"></div>
                            </div>
                        ) : (
                            /* key={currentIndex} remounts the grid on every slide so the entrance animation replays */
                            <div
                                key={currentIndex}
                                className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-8 lg:grid-cols-5 xl:grid-cols-6"
                            >
                                {getVisibleCustomers().map((customer, i) => (
                                    <div
                                        key={customer.id}
                                        className="customer-card-anim group flex flex-col items-center"
                                        style={{
                                            '--from-x': `${direction * -50}px`,
                                            animationDelay: `${i * 90}ms`,
                                        }}
                                    >
                                        <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 active:-translate-y-2 active:scale-95 active:border-[#065a8a]/30 active:shadow-xl md:group-hover:-translate-y-2 md:group-hover:shadow-2xl">
                                            <img
                                                src={customer.logo || FALLBACK}
                                                alt={customer.name}
                                                className="max-h-full max-w-full object-contain transition-transform duration-300 md:group-hover:scale-105"
                                                onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK; }}
                                            />
                                        </div>
                                        <h6 className="mt-4 line-clamp-2 px-2 text-center text-xs font-semibold text-gray-500 transition-colors duration-300 group-active:text-[#065a8a] md:text-sm md:group-hover:text-[#065a8a]">
                                            {customer.name}
                                        </h6>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={nextSlide}
                        aria-label="Next"
                        className="-translate-y-1/2 absolute -right-4 top-1/2 z-20 hidden rounded-full bg-white/90 p-2 opacity-0 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-[#065a8a] hover:text-white sm:block md:-right-6 md:p-3"
                    >
                        <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Indicators */}
                <div className="mt-12 flex items-center justify-center gap-3">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`rounded-full transition-all duration-500 ${currentIndex === index
                                ? 'h-2 w-8 bg-[#065a8a]'
                                : 'h-2 w-2 bg-gray-300 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomersSection;