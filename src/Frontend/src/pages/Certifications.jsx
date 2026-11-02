import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const API_URL = 'https://icemt.arabcont.com/api/Certifications';

// Only real web links are rendered as <a href>
const isHttpUrl = (u) => /^https?:\/\//i.test(u || '');

const Certifications = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const primaryColor = "#0865a8";
    const accentColor = "#f57c00";
    const globalFont = '"Noto Kufi Arabic", serif';

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [visibleImages, setVisibleImages] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const toggleImage = (id) => setVisibleImages(prev => ({ ...prev, [id]: !prev[id] }));

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error('HTTP ' + res.status);
                const data = await res.json();
                setItems(Array.isArray(data) ? data : []);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const certificates = items.filter(i => i.type === 1);
    const thankLetters = items.filter(i => i.type === 2);

    return (
        <div style={{ direction: isRTL ? 'rtl' : 'ltr', fontFamily: globalFont }}>

            <style>{`
                .swiper-pagination { bottom: 0px !important; }
                .swiper-pagination-bullet { background-color: ${primaryColor}; opacity: 0.5; }
                .swiper-pagination-bullet-active { opacity: 1; }
            `}</style>

            {/* Breadcrumb */}
            <div style={{ position: 'fixed', top: 70, left: 0, zIndex: 50, width: '100%', borderBottom: '1px solid #d1d5db', backgroundColor: '#f5f5f5', padding: '8px 20px' }}>
                <div style={{ textAlign: 'center', fontFamily: globalFont, fontSize: '1rem' }}>
                    <Link to="/" style={{ color: '#0865a8', fontWeight: 700, textDecoration: 'none', marginLeft: isRTL ? '8px' : 0, marginRight: isRTL ? 0 : '8px' }}
                        onMouseEnter={e => e.target.style.color = '#f57c00'} onMouseLeave={e => e.target.style.color = '#0865a8'}>
                        {t('nav.home')}
                    </Link>
                    <span style={{ color: '#6b7280', margin: '0 6px' }}>•</span>
                    <span style={{ color: '#374151', marginRight: isRTL ? '8px' : 0, marginLeft: isRTL ? 0 : '8px' }}>
                        {t('certs.pageTitle')}
                    </span>
                </div>
            </div>

            <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "90px 16px 40px" }}>
                <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

                    {/* Header */}
                    <header style={{ textAlign: "center", marginBottom: "40px" }}>
                        <h1 style={{ color: primaryColor, fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: "bold" }}>
                            {t('certs.pageTitle')}
                        </h1>
                        <div style={{ height: "4px", width: "70px", backgroundColor: accentColor, margin: "12px auto" }} />
                    </header>

                    {/* Loading / error */}
                    {loading && (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                            <div style={{ width: 48, height: 48, margin: '0 auto', border: '4px solid #e5e7eb', borderBottomColor: primaryColor, borderRadius: '50%', animation: 'cert-spin 1s linear infinite' }} />
                            <style>{`@keyframes cert-spin { to { transform: rotate(360deg); } }`}</style>
                        </div>
                    )}

                    {!loading && error && (
                        <div style={{ textAlign: 'center', padding: '30px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, color: '#b91c1c' }}>
                            {error}
                        </div>
                    )}

                    {/* Certificates */}
                    {!loading && !error && certificates.map((cert) => (
                        <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            style={{ backgroundColor: "#fff", borderRadius: "18px", padding: "24px", marginBottom: "24px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", display: "flex", flexWrap: "wrap", gap: "24px" }}>
                            <div dir="rtl" style={{ flex: "1 1 450px", textAlign: "right" }}>
                                <h2 style={{ color: primaryColor, fontSize: "1.4rem", marginBottom: "12px" }}>
                                    {cert.title}
                                </h2>

                                {cert.description && (
                                    <p style={{ lineHeight: "1.8", color: "#333", whiteSpace: "pre-line" }}>{cert.description}</p>
                                )}

                                {isHttpUrl(cert.linkUrl) && (
                                    <a
                                        href={cert.linkUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ display: "inline-block", marginTop: "10px", color: primaryColor, fontWeight: 700, textDecoration: "underline" }}
                                        onMouseEnter={e => e.currentTarget.style.color = accentColor}
                                        onMouseLeave={e => e.currentTarget.style.color = primaryColor}
                                    >
                                        {cert.linkText || cert.linkUrl}
                                    </a>
                                )}

                                {cert.pic && (
                                    <div>
                                        <button
                                            onClick={() => toggleImage(cert.id)}
                                            style={{ marginTop: "16px", backgroundColor: visibleImages[cert.id] ? "#eee" : accentColor, color: "#000", border: "none", padding: "10px 26px", borderRadius: "30px", fontWeight: "600", cursor: "pointer" }}>
                                            {visibleImages[cert.id] ? t('certs.hideCert') : t('certs.showCert')}
                                        </button>
                                    </div>
                                )}
                            </div>
                            <AnimatePresence>
                                {cert.pic && visibleImages[cert.id] && (
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ flex: "1 1 280px", textAlign: "center" }}>
                                        <img src={cert.pic} alt={cert.title} onClick={() => setSelectedImage(cert.pic)} style={{ maxWidth: "100%", borderRadius: "14px", cursor: "zoom-in" }} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}

                    {/* Thank Letters */}
                    {!loading && !error && thankLetters.length > 0 && (
                        <section style={{ marginTop: "60px", textAlign: "center" }}>
                            <h2 style={{ color: primaryColor, marginBottom: "10px" }}>{t('certs.thankLettersTitle')}</h2>
                            <p style={{ color: "#555", marginBottom: "30px" }}>{t('certs.thankLettersSubtitle')}</p>

                            <Swiper modules={[Autoplay, Navigation, Pagination]} autoplay={{ delay: 2500 }} navigation pagination={{ clickable: true }} spaceBetween={20} slidesPerView={1} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} style={{ paddingBottom: '50px' }}>
                                {thankLetters.map((letter) => (
                                    <SwiperSlide key={letter.id}>
                                        <div onClick={() => letter.pic && setSelectedImage(letter.pic)} style={{ backgroundColor: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 6px 16px rgba(0,0,0,0.08)", cursor: letter.pic ? "pointer" : "default" }}>
                                            {letter.pic && (
                                                <img src={letter.pic} alt={letter.title} style={{ width: "100%", height: "240px", objectFit: "contain", padding: "10px" }} />
                                            )}
                                            <div dir="rtl" style={{ backgroundColor: primaryColor, color: "#fff", padding: "10px", fontWeight: "600" }}>
                                                {letter.title}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </section>
                    )}
                </div>
            </div>

            {/* Image Preview */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)}
                        style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.9)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                        <img src={selectedImage} alt="preview" style={{ maxWidth: "100%", maxHeight: "90%", borderRadius: "12px" }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Certifications;