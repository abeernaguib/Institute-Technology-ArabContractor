import React, { useState, useEffect } from "react";

const API_BASE_URL = 'https://icemt.arabcont.com/api';

export default function Protocols() {
    const isMobile = window.innerWidth < 700;
    const globalFont = '"Noto Kufi Arabic", serif';

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProtocols = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/Protocol`);
                if (!response.ok) throw new Error('فشل في تحميل البروتوكولات');
                setGroups(await response.json());
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProtocols();
    }, []);

    const getColumns = () => {
        const w = window.innerWidth;
        if (w > 900) return 3;
        if (w > 600) return 2;
        return 1;
    };

    return (
        <div
            dir="rtl"
            style={{
                background: "#ffffff",
                minHeight: "100vh",
                fontFamily: globalFont,
            }}
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
                    <span style={{ color: '#374151', marginRight: '8px' }}>البروتوكولات و التعاقدات</span>
                </div>
            </div>

            {/* CONTENT */}
            <div
                style={{
                    paddingTop: 140, // navbar + overview
                    paddingLeft: isMobile ? 16 : 80,
                    paddingRight: isMobile ? 16 : 80,
                    paddingBottom: 40,
                }}
            >
                {/* TITLE */}
                <div style={{ textAlign: "center" }}>
                    <h1
                        style={{
                            fontSize: isMobile ? 22 : 32,
                            color: "#0865a8",
                            marginBottom: 10,
                            fontFamily: globalFont,
                        }}
                    >
                        البروتوكولات و التعاقدات
                    </h1>
                    <div
                        style={{
                            width: 90,
                            height: 4,
                            background: "#f57c00",
                            borderRadius: 8,
                            margin: "0 auto",
                        }}
                    />
                </div>

                {/* DESCRIPTION */}
                <p
                    style={{
                        marginTop: 30,
                        fontSize: isMobile ? 14 : 16,
                        lineHeight: 1.9,
                        color: "#000",
                        fontFamily: globalFont,
                    }}
                >
                    تشرف المعهد بعقد بروتوكولات و اتفاقيات تعاون و عقود تدريب مع العديد من
                    الجامعات و الهيئات بهدف إثراء العملية التدريبية و تبادل الخبرات، و تتمثل
                    في:
                </p>

                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div
                                style={{
                                    width: 56, height: 56, margin: '0 auto 16px',
                                    border: '4px solid #e5e7eb', borderTopColor: '#0865a8',
                                    borderRadius: '50%', animation: 'protoSpin .8s linear infinite',
                                }}
                            />
                            <p style={{ color: '#374151', fontFamily: globalFont }}>جاري تحميل البروتوكولات...</p>
                            <style>{`@keyframes protoSpin { to { transform: rotate(360deg); } }`}</style>
                        </div>
                    </div>
                )}

                {error && (
                    <div style={{ maxWidth: 640, margin: '40px auto', padding: 24, textAlign: 'center', border: '1px solid #fecaca', background: '#fef2f2', borderRadius: 12 }}>
                        <p style={{ color: '#b91c1c', fontWeight: 700, marginBottom: 6, fontFamily: globalFont }}>حدث خطأ</p>
                        <p style={{ color: '#dc2626', fontFamily: globalFont }}>{error}</p>
                    </div>
                )}

                {!loading && !error && groups.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#6b7280', padding: '48px 0', fontFamily: globalFont }}>
                        لا توجد بروتوكولات لعرضها حاليًا
                    </p>
                )}

                {/* GROUPS */}
                {!loading && !error && groups.map((group) => (
                    <div key={group.id} style={{ marginTop: 40 }}>
                        <h2
                            style={{
                                fontSize: isMobile ? 18 : 24,
                                color: "#0865a8",
                                fontFamily: globalFont,
                                borderRight: "4px solid #f57c00",
                                paddingRight: 12,
                            }}
                        >
                            {group.icon} {group.title}
                        </h2>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
                                gap: 14,
                                marginTop: 20,
                            }}
                        >
                            {group.items.map((p) => (
                                <div
                                    key={p.id}
                                    style={{
                                        background: "#fff",
                                        borderRadius: 16,
                                        padding: "12px 14px",
                                        display: "flex",
                                        alignItems: "center",
                                        boxShadow: "0 5px 12px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    {group.icon && (
                                        <span
                                            style={{
                                                fontSize: isMobile ? 20 : 22,
                                                color: "#0865a8",
                                                marginLeft: 10,
                                            }}
                                        >
                                            {group.icon}
                                        </span>
                                    )}
                                    <span
                                        style={{
                                            fontSize: isMobile ? 12 : 13.5,
                                            lineHeight: 1.5,
                                            color: "#000",
                                            fontFamily: globalFont,
                                        }}
                                    >
                                        {p.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}