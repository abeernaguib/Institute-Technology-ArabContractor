import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaUserTie,
    FaWrench,
    FaRulerCombined,
    FaCubes,
    FaHammer,
    FaTools,
    FaHardHat,
    FaShieldAlt,
    FaArrowRight,
    FaChevronLeft,
    FaChevronRight,
} from 'react-icons/fa';
import './transformational.css';

/* غيّر الامتداد هنا لو بعض الصور ليست jpg */
const photos = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg']
    .map((file) => `/images/transformational/${file}`);

const AUTOPLAY_MS = 4000;

const intro = [
    'في إطار دور المعهد التكنولوجي لهندسة التشييد والإدارة في تطوير الكوادر الفنية والمهنية، ودعم توجهات شركة المقاولون العرب نحو رفع الإنتاجية وتحسين كفاءة التشغيل، يقدم المعهد مجموعة من برامج التدريب التحويلي التي تستهدف إعادة تأهيل العاملين وتوجيههم من الوظائف ذات الطبيعة غير الإنتاجية إلى المهن الفنية والمهنية المنتجة والأكثر احتياجًا، وفقًا لمتطلبات مواقع العمل والمشروعات.',
    'وتعتمد هذه البرامج على تنمية المهارات الفنية والعملية للمتدربين، من خلال برامج تدريبية متخصصة تجمع بين التأهيل النظري والتطبيق العملي، بما يسهم في تحقيق الاستخدام الأمثل للموارد البشرية، وسد الفجوات في العمالة المهنية، ورفع كفاءة الأداء، مع الالتزام بمعايير الجودة والسلامة المهنية.',
];

const programs = [
    { title: 'مشرف تنفيذ', detail: 'تخصصات المباني والبياض والدهانات', icon: <FaUserTie aria-hidden="true" /> },
    { title: 'مساعد سباك', icon: <FaWrench aria-hidden="true" /> },
    { title: 'مهنة قياس', icon: <FaRulerCombined aria-hidden="true" /> },
    { title: 'مهنة بحري (صَبّان)', icon: <FaCubes aria-hidden="true" /> },
    { title: 'مساعد نجار مسلح', icon: <FaHammer aria-hidden="true" /> },
    { title: 'فني تركيب شدة معدنية', icon: <FaTools aria-hidden="true" /> },
    { title: 'مساعد فني تركيب شدة معدنية', icon: <FaTools aria-hidden="true" /> },
    { title: 'مشرف سلامة وصحة مهنية', icon: <FaHardHat aria-hidden="true" /> },
    { title: 'عامل سلامة وصحة مهنية', icon: <FaShieldAlt aria-hidden="true" /> },
];

function TransformationalTraining() {
    const total = photos.length;
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const touchX = useRef(null);

    const go = useCallback((i) => setCurrent(((i % total) + total) % total), [total]);
    const next = useCallback(() => go(current + 1), [go, current]);
    const prev = useCallback(() => go(current - 1), [go, current]);

    // Auto-play (restarts after every manual change)
    useEffect(() => {
        if (paused) return undefined;
        const id = setTimeout(() => setCurrent((c) => (c + 1) % total), AUTOPLAY_MS);
        return () => clearTimeout(id);
    }, [paused, current, total]);

    const onKeyDown = (e) => {
        if (e.key === 'ArrowLeft') next();   // RTL: left = next
        if (e.key === 'ArrowRight') prev();
    };

    const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; setPaused(true); };
    const onTouchEnd = (e) => {
        if (touchX.current !== null) {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (dx > 50) prev();
            else if (dx < -50) next();
        }
        touchX.current = null;
        setPaused(false);
    };

    return (
        <main className="tt-root" dir="rtl">
            <div className="tt-bar-wrapper">
                <div className="tt-bar">
                    <Link to="/" className="tt-bar-link">الصفحة الرئيسية</Link>
                    <span>•</span>
                    <Link to="/overview" className="tt-bar-link">نبذة عامة </Link>
                    <span>•</span>
                    <span>برامج للتدريب التحويلي</span>
                </div>
            </div>

            {/* Hero */}
            <section className="tt-hero" aria-labelledby="tt-title">
                <div className="tt-hero-accent" />
                <div className="tt-hero-content">
                    <span className="tt-eyebrow">التدريب التحويلي</span>
                    <h1 id="tt-title" className="tt-hero-title">
                        برامج التدريب التحويلي<br />
                        <em>لتطوير العمالة الفنية والمهنية</em>
                    </h1>
                </div>
            </section>

            {/* Intro */}
            <section className="tt-section tt-intro" aria-label="مقدمة البرامج">
                <div className="tt-inner">
                    <div className="tt-intro-grid">
                        {intro.map((p, i) => (
                            <article className={`tt-intro-card ${i === 0 ? 'tt-intro-card--accent' : ''}`} key={i}>
                                <p>{p}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Programs */}
            <section className="tt-section tt-programs" id="programs" aria-labelledby="tt-programs-title">
                <div className="tt-inner">
                    <h2 id="tt-programs-title" className="tt-heading">البرامج <span>التدريبية</span></h2>
                    <div className="tt-bar-line" />

                    <div className="tt-programs-grid">
                        {programs.map((p, i) => (
                            <article className="tt-program" key={p.title}>
                                <span className="tt-program-num">{String(i + 1).padStart(2, '0')}</span>
                                <div className="tt-program-icon">{p.icon}</div>
                                <span className="tt-program-kicker">التدريب التحويلي إلى</span>
                                <h3>{p.title}</h3>
                                {p.detail && <span className="tt-program-detail">{p.detail}</span>}
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery — slideshow */}
            <section className="tt-section tt-gallery" aria-labelledby="tt-gallery-title">
                <div className="tt-inner">
                    <h2 id="tt-gallery-title" className="tt-heading">لقطات من <span>التدريب العملي</span></h2>
                    <div className="tt-bar-line" />

                    <div
                        className="tt-slider"
                        dir="ltr"
                        tabIndex={0}
                        role="region"
                        aria-roledescription="carousel"
                        aria-label="لقطات من التدريب العملي"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                        onFocus={() => setPaused(true)}
                        onBlur={() => setPaused(false)}
                        onKeyDown={onKeyDown}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                    >
                        <div className="tt-slides" style={{ transform: `translateX(-${current * 100}%)` }}>
                            {photos.map((src, i) => (
                                <div className="tt-slide" key={src} aria-hidden={i !== current}>
                                    <img className="tt-slide-bg" src={src} alt="" aria-hidden="true" />
                                    <img
                                        className="tt-slide-img"
                                        src={src}
                                        alt={`لقطة من برامج التدريب التحويلي ${i + 1}`}
                                        loading={i === 0 ? 'eager' : 'lazy'}
                                    />
                                </div>
                            ))}
                        </div>

                        <button type="button" className="tt-arrow tt-arrow--next" onClick={next} aria-label="الصورة التالية">
                            <FaChevronLeft aria-hidden="true" />
                        </button>
                        <button type="button" className="tt-arrow tt-arrow--prev" onClick={prev} aria-label="الصورة السابقة">
                            <FaChevronRight aria-hidden="true" />
                        </button>

                        <span className="tt-counter">{current + 1} / {total}</span>
                        <span
                            key={current}
                            className="tt-progress"
                            style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                        />
                    </div>

                    <div className="tt-thumbs" dir="ltr">
                        {photos.map((src, i) => (
                            <button
                                type="button"
                                key={src}
                                className={`tt-thumb ${i === current ? 'is-active' : ''}`}
                                onClick={() => go(i)}
                                aria-label={`عرض الصورة ${i + 1}`}
                                aria-current={i === current}
                            >
                                <img src={src} alt="" loading="lazy" />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing */}
            <section className="tt-closing" aria-labelledby="tt-closing-title">
                <div className="tt-inner tt-closing-inner">
                    <h2 id="tt-closing-title" className="tt-heading">نحو كوادر فنية <span>أكثر كفاءة</span></h2>
                    <div className="tt-bar-line" />
                    <p>
                        يسعى المعهد من خلال هذه البرامج إلى تحويل الطاقات البشرية المتاحة إلى كوادر فنية ومهنية مؤهلة ومنتجة،
                        تمتلك المهارات اللازمة لتلبية احتياجات العمل الفعلية، بما يدعم كفاءة التنفيذ في مواقع المشروعات،
                        ويعزز التكامل بين تنمية الموارد البشرية ومتطلبات قطاع التشييد والبناء.
                    </p>
                    <Link to="/overview" className="tt-back">
                        <FaArrowRight aria-hidden="true" /> العودة إلى نبذة عامة 
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default TransformationalTraining;