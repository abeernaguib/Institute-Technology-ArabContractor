import React, { useState, useEffect } from "react";

// Image helper: tech-01.png, tech-02.png ...
const img = (n) => `/images/tech-${String(n).padStart(2, '0')}.png`;

// Slideshow range (section 3). Change these two numbers when needed.
const SLIDE_FIRST = 7;
const SLIDE_LAST = 14; // update to the last image number when you send the rest

export default function TechnicalEducationAlt() {
    const [modalImage, setModalImage] = useState(null);
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const openModal = (imageSrc, title) => {
        setModalImage({ src: imageSrc, title });
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setModalImage(null);
        document.body.style.overflow = 'auto';
    };

    const introText =
        'تسهم شركة المقاولون العرب في تطوير منظومة التعليم الفني والتدريب المهني من خلال الشراكات مع المؤسسات التعليمية والجهات الدولية، وتوفير التدريب العملي للطلاب، وتأهيل المعلمين والمدربين، وتطوير الورش والإمكانات التدريبية؛ لإعداد كوادر فنية مؤهلة تلبي احتياجات سوق العمل.';

    const protocolText =
        'يهدف البروتوكول إلى إعداد جيل جديد من خريجي المدارس الثانوية الصناعية، يمتلك المهارات الفنية والعملية والقدرة على التعامل مع التكنولوجيا الحديثة، بما يسهم في توفير كوادر فنية مؤهلة لتلبية احتياجات الشركة وسوق العمل.';

    const roles = [
        { icon: '🎓', title: 'التأهيل والرعاية', text: 'اختيار الطلاب وتوفير التدريب العملي والرعاية اللازمة، ومنح الخريجين شهادات خبرة وفقًا للنظم المعتمدة.' },
        { icon: '👨‍🏫', title: 'تطوير الكوادر التعليمية', text: 'رفع كفاءة المعلمين من خلال برامج تدريبية فنية وإدارية متخصصة.' },
        { icon: '🛠️', title: 'تطوير البنية التدريبية', text: 'تحديث ورش المدارس وتوفير المعدات والأدوات اللازمة وصيانتها.' }
    ];

    // Image numbers follow the PDF: صورة 1،2 / 3،4 / 5،6
    const schools = [
        {
            name: 'مدرسة أبو رواش الثانوية الصناعية المشتركة',
            major: 'فني ديزل ومعدات ثقيلة',
            count: 40,
            place: 'مركز التدريب على المهن الميكانيكية والكهربائية بشبرا',
            images: [img(1), img(2)]
        },
        {
            name: 'مدرسة مدينة نصر الثانوية الصناعية',
            major: 'فني التشطيبات المعمارية',
            count: 40,
            place: 'مركز التدريب الحرفي على مهن التشييد والبناء',
            images: [img(3), img(4)]
        },
        {
            name: 'مدرسة المعدات الثقيلة الصناعية بالإسماعيلية',
            major: 'فني ديزل ومعدات ثقيلة',
            count: 38,
            place: 'ورش دويتس التابعة لإدارة ورش العمرات بالإسماعيلية',
            images: [ img(6)]
        }
    ];

    const totalStudents = schools.reduce((sum, s) => sum + s.count, 0);

    const intlText = [
        'في إطار التعاون مع الوكالة الألمانية للتعاون الدولي (GIZ) ومعهد ICON INSTITUT، يساهم المعهد في تنفيذ برامج تدريبية متخصصة لمدربي وزارة التربية والتعليم والتعليم الفني في قطاعي التشييد والبناء والأخشاب والأثاث، وذلك ضمن مشروع الدعم الفني لمبادرة التعليم الفني الشامل في مصر (TCTI).',
        'ويستهدف هذا التعاون رفع كفاءة المدربين، والمساهمة في تطوير المناهج والبرامج التدريبية القائمة على نظام الجدارات، وتعزيز جودة التعليم الفني والتدريب المهني بما يتوافق مع متطلبات سوق العمل والتطورات التكنولوجية.'
    ];

    const slides = Array.from({ length: SLIDE_LAST - SLIDE_FIRST + 1 }, (_, i) => img(SLIDE_FIRST + i));

    const next = () => setCurrent((c) => (c + 1) % slides.length);
    const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

    // Autoplay
    useEffect(() => {
        if (paused || modalImage) return;
        const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 4000);
        return () => clearInterval(t);
    }, [paused, modalImage, slides.length]);

    return (
        <div className="tech-page-wrapper">
            <style>{`

                :root {
                    --primary-color: #0865a8;
                    --secondary-color: #f57c00;
                    --bg-light: #F5F7E1;
                    --text-dark: #333333;
                    --border-color: #e8e8e8;
                    --transition-speed: 0.3s;
                }

                .tech-page-wrapper {
                    direction: rtl;
                    background: #ffffff;
                    min-height: 100vh;
                    font-family: 'Noto Kufi Arabic', serif;
                    color: var(--text-dark);
                }

                .tech-page-wrapper * {
                    font-family: 'Noto Kufi Arabic', serif;
                    box-sizing: border-box;
                }

                .tech-main-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 120px 5% 60px;
                }

                .tech-card {
                    background: #fff;
                    border-radius: 18px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                    border: 1px solid var(--border-color);
                    margin-bottom: 30px;
                    overflow: hidden;
                    transition: transform var(--transition-speed), box-shadow var(--transition-speed);
                }

                .tech-header-card {
                    padding: 40px 30px;
                    text-align: center;
                }

                .tech-title {
                    font-size: clamp(1.5rem, 4vw, 2.2rem);
                    color: var(--primary-color);
                    font-weight: bold;
                    margin-bottom: 15px;
                }

                .tech-title-underline {
                    width: 70px;
                    height: 4px;
                    background: var(--secondary-color);
                    border-radius: 6px;
                    margin: 0 auto 25px;
                }

                .tech-subtitle {
                    font-size: clamp(1rem, 2vw, 1.1rem);
                    font-weight: 600;
                    margin-bottom: 20px;
                }

                .tech-description {
                    line-height: 1.9;
                    font-size: clamp(0.9rem, 1.8vw, 1rem);
                    max-width: 900px;
                    margin: 0 auto;
                }

                .tech-section-title {
                    color: var(--primary-color);
                    font-weight: bold;
                    font-size: clamp(1.2rem, 3vw, 1.6rem);
                    margin: 50px 0 10px;
                    padding-right: 14px;
                    border-right: 5px solid var(--secondary-color);
                }

                .tech-section-text {
                    line-height: 2;
                    font-size: clamp(0.92rem, 1.8vw, 1.02rem);
                    margin-bottom: 25px;
                }

                .tech-grid {
                    display: grid;
                    gap: 25px;
                    margin-bottom: 40px;
                }

                .tech-grid-3 { grid-template-columns: repeat(3, 1fr); }

                .role-card {
                    padding: 28px 24px;
                    text-align: center;
                    border-top: 4px solid var(--secondary-color);
                    margin-bottom: 0;
                    height: 100%;
                }

                .role-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 24px rgba(245, 124, 0, 0.18);
                }

                .role-icon { font-size: 2.2rem; margin-bottom: 10px; }

                .role-title {
                    color: var(--primary-color);
                    font-weight: bold;
                    font-size: 1.1rem;
                    margin-bottom: 10px;
                }

                .role-text { line-height: 1.9; font-size: 0.95rem; margin: 0; }

                .school-block {
                    margin-bottom: 30px;
                    border-top: 4px solid var(--primary-color);
                }

                .school-block:hover { box-shadow: 0 8px 24px rgba(8, 101, 168, 0.15); }

                .school-info { padding: 24px 28px; background: #fafcff; }

                .school-name {
                    color: var(--primary-color);
                    font-weight: bold;
                    font-size: clamp(1.05rem, 2.2vw, 1.25rem);
                    margin-bottom: 16px;
                }

                .school-rows {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 14px;
                }

                .school-row {
                    background: #fff;
                    border: 1px solid var(--border-color);
                    border-radius: 12px;
                    padding: 12px 14px;
                }

                .school-row-label { font-size: 0.78rem; color: #888; margin-bottom: 4px; }
                .school-row-value { font-weight: 700; font-size: 0.95rem; line-height: 1.6; }

.school-imgs {
    display: flex;
    justify-content: center;
    align-items: center;
}

.school-imgs .school-img {
    width: 70%;
    height: clamp(260px, 38vw, 420px);
}
                .school-img {
    height: clamp(260px, 38vw, 420px);
    cursor: pointer;
    overflow: hidden;
    background: #eef1f5;
    display: flex;
    align-items: center;
    justify-content: center;
}

.school-img img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
    transition: transform 0.5s ease;
}

.school-img:hover img { transform: scale(1.03); }

                .total-banner {
                    background: linear-gradient(135deg, var(--primary-color), #044474);
                    color: #fff;
                    border-radius: 18px;
                    padding: 22px 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 18px;
                    flex-wrap: wrap;
                    margin-bottom: 40px;
                }

                .total-banner-num {
                    font-size: clamp(2rem, 5vw, 2.8rem);
                    font-weight: 900;
                    color: var(--secondary-color);
                    line-height: 1;
                }

                .total-banner-label { font-size: clamp(1rem, 2.2vw, 1.2rem); font-weight: 700; }

                /* Slideshow */
                .slideshow {
                    background: #f5f5f5;
                    border-radius: 18px;
                    padding: 20px;
                    margin-bottom: 40px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                }

                .slide-frame {
                    position: relative;
                    width: 100%;
                    height: clamp(260px, 50vw, 560px);
                    background: #e9e9e9;
                    border-radius: 12px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                .slide-frame img {
                    max-width: 100%;
                    max-height: 100%;
                    width: auto;
                    height: auto;
                    object-fit: contain;
                    display: block;
                    animation: fadeIn 0.5s ease;
                }

                .slide-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 46px;
                    height: 46px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(0,0,0,0.5);
                    color: #fff;
                    font-size: 1.4rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background var(--transition-speed);
                    z-index: 2;
                }

                .slide-btn:hover { background: var(--secondary-color); }
                .slide-btn-next { left: 14px; }
                .slide-btn-prev { right: 14px; }

                .slide-counter {
                    position: absolute;
                    bottom: 12px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0,0,0,0.6);
                    color: #fff;
                    padding: 4px 16px;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    direction: ltr;
                }

                .slide-thumbs {
                    display: flex;
                    gap: 10px;
                    overflow-x: auto;
                    padding: 14px 0 4px;
                }

                .slide-thumb {
    width: 110px;
    height: 72px;
    flex-shrink: 0;
    object-fit: contain;
    background: #e9e9e9;
    border-radius: 8px;
    cursor: pointer;
    border: 3px solid transparent;
    transition: border-color var(--transition-speed), opacity var(--transition-speed);
    opacity: 0.7;
}

                .slide-thumb.active { border-color: var(--secondary-color); opacity: 1; }

                .tech-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background-color: rgba(0, 0, 0, 0.9);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    padding: 20px;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

                .tech-modal-content {
                    position: relative;
                    max-width: 95%;
                    max-height: 85vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .tech-modal-image {
                    max-width: 100%;
                    max-height: 80vh;
                    border-radius: 8px;
                    object-fit: contain;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                }

                .tech-modal-close {
                    position: absolute;
                    top: -50px;
                    right: 0;
                    background: var(--secondary-color);
                    color: white;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background var(--transition-speed);
                }

                .tech-modal-close:hover { background: var(--primary-color); }

                .tech-modal-title {
                    color: white;
                    margin-top: 15px;
                    font-size: 1.1rem;
                    text-align: center;
                }

                @media (min-width: 1920px) {
                    .tech-main-container { max-width: 1600px; }
                }

                @media (max-width: 900px) {
                    .tech-grid-3 { grid-template-columns: 1fr; }
                    .school-rows { grid-template-columns: 1fr; }
                }

                @media (max-width: 768px) {
                    .tech-main-container { padding-top: 100px; }
                    .tech-header-card { padding: 30px 20px; }
                }

                @media (max-width: 480px) {
                    .tech-main-container { padding: 90px 15px 40px; }
.school-imgs .school-img {
    width: 100%;
}                    .slide-btn { width: 38px; height: 38px; }
                    .tech-modal-close { top: -45px; width: 35px; height: 35px; }
                }

                @media (max-width: 320px) {
                    .tech-title { font-size: 1.3rem; }
                }
            `}</style>

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
                    <span style={{ color: '#374151', marginRight: '8px' }}>تطوير التعليم الفني</span>
                </div>
            </div>

            <main className="tech-main-container">
                {/* Header */}
                <section className="tech-card tech-header-card">
                    <h1 className="tech-title">تطوير التعليم الفني</h1>
                    <div className="tech-title-underline"></div>
                    <p className="tech-subtitle">بروتوكول التعاون بين وزارة التربية والتعليم وشركة المقاولون العرب</p>
                    <p className="tech-description">{introText}</p>
                </section>

                {/* 1. Protocol */}
                <h2 className="tech-section-title">١. بروتوكول التعاون مع وزارة التربية والتعليم والتعليم الفني</h2>
                <p className="tech-section-text">{protocolText}</p>

                <section className="tech-grid tech-grid-3">
                    {roles.map((r, idx) => (
                        <div key={idx} className="tech-card role-card">
                            <div className="role-icon">{r.icon}</div>
                            <h3 className="role-title">{r.title}</h3>
                            <p className="role-text">{r.text}</p>
                        </div>
                    ))}
                </section>

                {/* 2. Beneficiary schools */}
                <h2 className="tech-section-title">٢. المدارس المستفيدة من برامج التدريب</h2>

                {schools.map((s, idx) => (
                    <section key={idx} className="tech-card school-block">
                        <div className="school-info">
                            <h3 className="school-name">{s.name}</h3>
                            <div className="school-rows">
                                <div className="school-row">
                                    <div className="school-row-label">التخصص</div>
                                    <div className="school-row-value">{s.major}</div>
                                </div>
                                <div className="school-row">
                                    <div className="school-row-label">العدد</div>
                                    <div className="school-row-value">{s.count} طالبًا</div>
                                </div>
                                <div className="school-row">
                                    <div className="school-row-label">مكان التدريب</div>
                                    <div className="school-row-value">{s.place}</div>
                                </div>
                            </div>
                        </div>
                        <div className="school-imgs">
                            {s.images.map((src, k) => (
                                <div key={k} className="school-img" onClick={() => openModal(src, s.name)}>
                                    <img src={src} alt={s.name} />
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

                <div className="total-banner">
                    <span className="total-banner-label">إجمالي عدد الطلاب</span>
                    <span className="total-banner-num">{totalStudents}</span>
                    <span className="total-banner-label">طالب</span>
                </div>

                {/* 3. International cooperation */}
                <h2 className="tech-section-title">٣. التعاون الدولي لتطوير التعليم الفني والتدريب المهني</h2>
                {intlText.map((p, idx) => (
                    <p key={idx} className="tech-section-text">{p}</p>
                ))}

                {/* Slideshow */}
                <section
                    className="slideshow"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <div
                        className="slide-frame"
                        onClick={() => openModal(slides[current], 'التعاون الدولي لتطوير التعليم الفني')}
                    >
                        <img key={current} src={slides[current]} alt={`صورة ${current + 1}`} />

                        <button
                            className="slide-btn slide-btn-prev"
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                            aria-label="السابق"
                        >›</button>
                        <button
                            className="slide-btn slide-btn-next"
                            onClick={(e) => { e.stopPropagation(); next(); }}
                            aria-label="التالي"
                        >‹</button>

                        <div className="slide-counter">{current + 1} / {slides.length}</div>
                    </div>

                    <div className="slide-thumbs">
                        {slides.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt={`مصغرة ${i + 1}`}
                                className={`slide-thumb ${i === current ? 'active' : ''}`}
                                onClick={() => setCurrent(i)}
                            />
                        ))}
                    </div>
                </section>
            </main>

            {modalImage && (
                <div className="tech-modal-overlay" onClick={closeModal}>
                    <div className="tech-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="tech-modal-close" onClick={closeModal}>✕</button>
                        <img src={modalImage.src} alt={modalImage.title} className="tech-modal-image" />
                        <div className="tech-modal-title">{modalImage.title}</div>
                    </div>
                </div>
            )}
        </div>
    );
}