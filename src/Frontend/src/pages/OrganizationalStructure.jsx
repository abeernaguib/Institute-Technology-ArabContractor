import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearchPlus, FaTimes, FaDownload, FaUserTie, FaSitemap } from 'react-icons/fa';
import orgChart from '../assets/hykl.png'; // adjust the path/extension to your folder
import './overview.css';
import './organizational-structure.css';

const director = { title: 'مدير المعهد', name: 'م. شريف حمدي' };

const departments = [
    {
        title: 'نائب مدير المعهد للشؤون الفنية والاختبارات',
        items: ['إدارة الشؤون الفنية', 'إدارة الاختبارات'],
    },
    {
        title: 'نائب مدير المعهد للشؤون العلمية والتدريب الفني والمهني',
        items: [
            'إدارة الشؤون العلمية',
            'مركز تدريب جسر السويس',
            'مركز تدريب شبرا',
            'المكتبة الرئيسية',
            'مدرسة المقاولون العرب للمعدات الثقيلة',
        ],
    },
    {
        title: 'مدير التدريب',
        items: [
            'تدريب المهندسين',
            'تدريب الماليين',
            'تدريب الموارد البشرية',
            'تدريب الأمن',
            'التدريب الصيفي لطلبة الجامعات',
        ],
    },
    {
        title: 'مدير ضمان الجودة',
        items: [],
    },
    {
        title: 'مدير مركز المعلومات والتحول الرقمي',
        items: [
            'وحدة التحول الرقمي',
            'وحدة الدعم الفني',
            'إدارة الموقع الإلكتروني',
            'التدريب الإلكتروني والمنصات التعليمية',
            'التسويق الإلكتروني والملتيميديا',
            'تطوير الأعمال',
            'تطبيقات الذكاء الاصطناعي وتحليل البيانات',
        ],
    },
];

export default function OrganizationalStructure() {
    const [zoomed, setZoomed] = useState(false);

    // Close the zoomed view with Escape + lock page scroll while it's open
    useEffect(() => {
        if (!zoomed) return;
        const onKey = (e) => { if (e.key === 'Escape') setZoomed(false); };
        document.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
        };
    }, [zoomed]);

    return (
        <main className="page-root" dir="rtl">
            {/* Breadcrumb */}
            <div className="overview-bar-wrapper">
                <div className="overview-bar">
                    <Link to="/" className="overview-home-link">الصفحة الرئيسية</Link>
                    <span className="overview-separator">•</span>
                    <span>الهيكل التنظيمي</span>
                </div>
            </div>

            {/* Hero */}
            <section className="hero org-hero" aria-labelledby="org-title">
                <div className="hero-accent-bar" />
                <div className="hero-content">
                    <span className="hero-eyebrow">عن المعهد</span>
                    <h1 id="org-title" className="hero-title">
                        الهيكل التنظيمي<br />
                        <em>للمعهد التكنولوجي لهندسة التشييد والإدارة</em>
                    </h1>
                    <p className="hero-body">
                        يوضح الهيكل التنظيمي الإدارات والمراكز التابعة للمعهد وتسلسل المسؤوليات بينها،
                        بما يضمن تكامل العمل بين الشؤون الفنية والعلمية والتدريب والجودة والتحول الرقمي.
                    </p>
                </div>
            </section>

            {/* Chart */}
            <section className="section_2 org-chart-section" aria-labelledby="chart-title">
                <div className="section-inner">
                    <h2 id="chart-title" className="section-heading">
                        مخطط <span>الهيكل التنظيمي</span>
                    </h2>
                    <div className="heading-bar" />

                    <figure className="org-figure">
                        <button
                            type="button"
                            className="org-image-btn"
                            onClick={() => setZoomed(true)}
                            aria-label="تكبير صورة الهيكل التنظيمي"
                        >
                            <img
                                src={orgChart}
                                alt="الهيكل التنظيمي للمعهد التكنولوجي لهندسة التشييد والإدارة"
                                className="org-image"
                                loading="lazy"
                            />
                            <span className="org-zoom-hint"><FaSearchPlus aria-hidden="true" /> اضغط للتكبير</span>
                        </button>
                        <figcaption className="org-actions">
                            <button type="button" className="org-btn" onClick={() => setZoomed(true)}>
                                <FaSearchPlus aria-hidden="true" /> تكبير الصورة
                            </button>
                            <a className="org-btn org-btn--outline" href={orgChart} download="ICEMT_Organizational_Structure">
                                <FaDownload aria-hidden="true" /> تحميل الصورة
                            </a>
                        </figcaption>
                    </figure>
                </div>
            </section>

            {/* Text version (accessible + SEO friendly) */}
            <section className="section_4 org-details" aria-labelledby="details-title">
                <div className="section-inner">
                    <h2 id="details-title" className="h1_sec_4">تفاصيل الإدارات والمراكز</h2>
                    <p className="section-intro">نظرة سريعة على مكونات الهيكل التنظيمي للمعهد.</p>
                    <div className="heading-bar" />

                    <article className="org-director">
                        <div className="org-director-icon"><FaUserTie aria-hidden="true" /></div>
                        <div>
                            <span className="first-course-kicker">رأس الهيكل التنظيمي</span>
                            <h3>{director.title}</h3>
                            <p>{director.name}</p>
                        </div>
                    </article>

                    <div className="org-grid">
                        {departments.map((dep) => (
                            <article className="org-card" key={dep.title}>
                                <div className="org-card-head">
                                    <span className="org-card-icon"><FaSitemap aria-hidden="true" /></span>
                                    <h3>{dep.title}</h3>
                                </div>
                                {dep.items.length > 0 && (
                                    <ul>
                                        {dep.items.map((item) => <li key={item}>{item}</li>)}
                                    </ul>
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Zoomed view */}
            {zoomed && (
                <div className="org-lightbox" role="dialog" aria-modal="true" aria-label="الهيكل التنظيمي" onClick={() => setZoomed(false)}>
                    <button type="button" className="org-lightbox-close" onClick={() => setZoomed(false)} aria-label="إغلاق">
                        <FaTimes aria-hidden="true" />
                    </button>
                    <div className="org-lightbox-scroll" onClick={(e) => e.stopPropagation()}>
                        <img src={orgChart} alt="الهيكل التنظيمي للمعهد" className="org-lightbox-img" />
                    </div>
                </div>
            )}
        </main>
    );
}