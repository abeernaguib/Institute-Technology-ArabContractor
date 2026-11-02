import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// All images are local: src/Frontend/public/images/...
// Files in "public" are served from the site root, so don't write "public" in the path.
const IMAGES = {
    etqaanInstitutional: "/images/etqaan-institutional.jpeg",
    etqaanProgrammatic: "/images/etqaan-programmatic.jpeg",
    nqi: "/images/NQI-lg.jpg",
    iso: "/images/iso9001.jpg",
    pmi: "/images/pmi.jpg",
    atp: "/images/Partner.jpg",
    autodesk: "/images/autodeskCert.jpg",
    thanks: [
        "/images/cert01.jpg",
        "/images/cert02.jpg",
        "/images/cert03.jpg",
        "/images/cert04.jpg",
        "/images/cert05.jpg",
        "/images/cert06.jpg",
        "/images/cert07.jpg",
        "/images/cert08.jpg",
        "/images/cert09.jpeg", // Misr Development Company
    ],
};

const ETQAAN_LINK = "https://etqaan.eg/%d9%82%d8%b7%d8%a7%d8%b9-%d8%a7%d9%84%d8%aa%d8%af%d8%b1%d9%8a%d8%a8-%d8%a7%d9%84%d9%85%d9%87%d9%86%d9%89";

const Certifications = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const primaryColor = "#0865a8";
    const accentColor = "#f57c00";
    const globalFont = '"Noto Kufi Arabic", serif';

    // Certificate titles are official English names — kept as-is
    // Only the Arabic description text is translated
    const certificates = [
        {
            title: "شهادة الاعتماد المؤسسي",
            titleEn: "Institutional Accreditation (ETQAAN)",
            textKey: 'certs.etqaanInst',
            image: IMAGES.etqaanInstitutional,
            link: ETQAAN_LINK,
            linkKey: 'certs.etqaanLink',
        },
        {
            title: "شهادة الاعتماد البرامجي",
            titleEn: "Programmatic Accreditation (ETQAAN)",
            textKey: 'certs.etqaanProg',
            image: IMAGES.etqaanProgrammatic,
            link: ETQAAN_LINK,
            linkKey: 'certs.etqaanLink',
        },
        {
            title: "الإعتماد القومي للجودة",          // institution name, keep Arabic
            titleEn: "National Quality Institute",
            textKey: 'certs.nqi',
            image: IMAGES.nqi,
        },
        {
            title: "ISO 9001:2015",                    // standard name, always English
            textKey: 'certs.iso',
            image: IMAGES.iso,
        },
        {
            title: "PMI",                              // brand name, always English
            textKey: 'certs.pmi',
            image: IMAGES.pmi,
        },
        {
            title: "Authorized Training Partner",      // brand designation, always English
            textKey: 'certs.atp',
            image: IMAGES.atp,
        },
        {
            title: "Autodesk Training Center",         // brand name, always English
            textKey: 'certs.autodesk',
            image: IMAGES.autodesk,
        },
    ];

    // Thank-letter names are proper nouns — kept as-is
    // Order matters: item N uses IMAGES.thanks[N]
    const thankNames = [
        "شكر دولة موريتانيا",
        "شكر الغرفة الالمانية",
        "وزارة القوى العاملة",
        "الغرفة الالمانية",
        "جامعة جازان السعودية",
        "الاكاديمية الحديثة للهندسة والتكنولوجيا",
        "البرنامج السودانى",
        "البرنامج الاثيوبى",
        "شكر شركة مصر للتعمير",
    ];

    const thankNamesEn = [
        "Mauritania",
        "German Chamber",
        "Ministry of Manpower",
        "German Chamber",
        "Jazan University",
        "Modern Academy",
        "Sudan Program",
        "Ethiopia Program",
        "Misr Development Company",
    ];

    const thankImages = thankNames.map((name, i) => ({
        name: isRTL ? name : thankNamesEn[i],
        url: IMAGES.thanks[i],
    }));

    const [visibleImages, setVisibleImages] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const toggleImage = (index) => setVisibleImages(prev => ({ ...prev, [index]: !prev[index] }));

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

                    {/* Certificates */}
                    {certificates.map((cert, index) => {
                        const displayTitle = (!isRTL && cert.titleEn) ? cert.titleEn : cert.title;
                        return (
                            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                style={{ backgroundColor: "#fff", borderRadius: "18px", padding: "24px", marginBottom: "24px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", display: "flex", flexWrap: "wrap", gap: "24px" }}>
                                <div style={{ flex: "1 1 450px" }}>
                                    {/* Title: English brand names stay English; Arabic institution names switch */}
                                    <h2 style={{ color: primaryColor, fontSize: "1.4rem", marginBottom: "12px" }}>
                                        {displayTitle}
                                    </h2>
                                    <p style={{ lineHeight: "1.8", color: "#333" }}>{t(cert.textKey)}</p>

                                    {/* Optional link under the description */}
                                    {cert.link && (
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ display: "inline-block", marginTop: "10px", color: primaryColor, fontWeight: 700, textDecoration: "underline" }}
                                            onMouseEnter={e => e.currentTarget.style.color = accentColor}
                                            onMouseLeave={e => e.currentTarget.style.color = primaryColor}
                                        >
                                            {t(cert.linkKey)}
                                        </a>
                                    )}

                                    <div>
                                        <button
                                            onClick={() => toggleImage(index)}
                                            style={{ marginTop: "16px", backgroundColor: visibleImages[index] ? "#eee" : accentColor, color: "#000", border: "none", padding: "10px 26px", borderRadius: "30px", fontWeight: "600", cursor: "pointer" }}>
                                            {visibleImages[index] ? t('certs.hideCert') : t('certs.showCert')}
                                        </button>
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {visibleImages[index] && (
                                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ flex: "1 1 280px", textAlign: "center" }}>
                                            <img src={cert.image} alt={displayTitle} onClick={() => setSelectedImage(cert.image)} style={{ maxWidth: "100%", borderRadius: "14px", cursor: "zoom-in" }} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}

                    {/* Thank Letters */}
                    <section style={{ marginTop: "60px", textAlign: "center" }}>
                        <h2 style={{ color: primaryColor, marginBottom: "10px" }}>{t('certs.thankLettersTitle')}</h2>
                        <p style={{ color: "#555", marginBottom: "30px" }}>{t('certs.thankLettersSubtitle')}</p>

                        <Swiper modules={[Autoplay, Navigation, Pagination]} autoplay={{ delay: 2500 }} navigation pagination={{ clickable: true }} spaceBetween={20} slidesPerView={1} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} style={{ paddingBottom: '50px' }}>
                            {thankImages.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <div onClick={() => setSelectedImage(img.url)} style={{ backgroundColor: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 6px 16px rgba(0,0,0,0.08)", cursor: "pointer" }}>
                                        <img src={img.url} alt={img.name} style={{ width: "100%", height: "240px", objectFit: "contain", padding: "10px" }} />
                                        <div style={{ backgroundColor: primaryColor, color: "#fff", padding: "10px", fontWeight: "600" }}>
                                            {img.name}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </section>
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