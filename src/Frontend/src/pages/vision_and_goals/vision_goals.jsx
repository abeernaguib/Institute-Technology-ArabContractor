import React from 'react';
import './vision_goals.css';
import {
    FaLeaf, FaLaptopCode, FaHardHat, FaChartLine, FaHandshake, FaUserTie,
    FaAward, FaLightbulb, FaUsers, FaBalanceScale, FaShieldAlt, FaRecycle,
    FaChalkboardTeacher, FaTools, FaDesktop, FaCogs, FaGlobe, FaClipboardCheck,
} from 'react-icons/fa';
import img2 from '/images/vision.jfif';
import img1 from '../../assets/img1.jpg';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/* ════════════ المحتوى (عربي). أضف مفتاح en لاحقًا للترجمة الإنجليزية ════════════ */
const CONTENT = {
    ar: {
        vision:
            'ترسيخ منظومة تدريبية متقدمة وشاملة تستهدف تنمية القدرات الهندسية والإدارية والمهنية والفنية للعاملين، بما يحقّق تحسينًا مستدامًا للأداء وفق أعلى المعايير المعتمدة. وتشمل الرؤية دعم التدريب المهني والفني عبر مدرسة المقاولون العرب وتمكين جميع الفئات من مواكبة التحوّل الرقمي وتبنّي التقنيات الحديثة في قطاع التشييد والبنية التحتية، بما يعزّز التميز ويحافظ على الريادة محليًا وإقليميًا.',
        mission:
            'تطوير منظومة تدريبية متكاملة تُعدّ وتُؤهّل الكوادر الهندسية والمهنية والفنية والإدارية وفق أحدث المعايير العلمية والمهنية، وتضمن تنمية مستدامة للعنصر البشري. وتركّز الشركة على برامج متخصصة تعزّز القدرة على مواكبة التحوّل الرقمي وتطوير الأعمال، وترسّخ ثقافة الجودة والسلامة، مع إيلاء اهتمام محوري لبرامج التدريب المهني والفني من خلال مدرسة المقاولون العرب لتلبية احتياجات المشروعات القومية ورفع التنافسية.',
        strategies: [
            { icon: FaLeaf, title: 'تعزيز الاستدامة في تنمية الموارد البشرية', text: 'تصميم سياسات تدريبية تؤدي إلى أثر طويل المدى في الكفاءة والإنتاجية، وربط التدريب بمؤشرات أداء مؤسسية مستدامة.' },
            { icon: FaLaptopCode, title: 'دعم التحوّل الرقمي وتطوير الأعمال', text: 'دمج الحلول الرقمية والتطبيقات الذكية في عمليات التدريب والعمل، وتبني تقنيات إدارة المشروعات الحديثة.' },
            { icon: FaHardHat, title: 'تطوير وتأهيل العمالة الفنية والمهنية', text: 'توسيع دور مدرسة المقاولون العرب ورفع الطاقة الاستيعابية للبرامج العملية لتمكين فنيين مهرة يدعمون المشروعات القومية والخارجية.' },
            { icon: FaChartLine, title: 'رفع كفاءة الخطط التدريبية', text: 'مواءمة البرامج مع احتياجات قطاعات الشركة وربطها بخطط التطوير الوظيفي، وقياس أثر التدريب بمؤشرات كمية ونوعية.' },
            { icon: FaHandshake, title: 'تعزيز الشراكات المؤسسية', text: 'توسيع التعاون مع الجامعات والهيئات المحلية والدولية لتبادل الخبرات ورفع جودة المحتوى.' },
            { icon: FaUserTie, title: 'تمكين القيادات الوسطى وإعداد صف ثانٍ', text: 'تنفيذ برامج قيادية متقدمة في التخطيط، إدارة المخاطر، واتخاذ القرار لضمان استدامة القيادة التشغيلية.' },
        ],
        values: [
            { icon: FaAward, title: 'الالتزام بالجودة', text: 'تقديم برامج رفيعة المستوى تُفضي إلى أداء فعّال ومستدام.' },
            { icon: FaLightbulb, title: 'الابتكار والتطوير ومواكبة التحوّل الرقمي', text: 'تحديث مستمر للمحتوى واعتماد حلول رقمية تعزّز كفاءة التشغيل.' },
            { icon: FaUsers, title: 'تنمية العنصر البشري', text: 'الاستثمار في المهارات الهندسية والفنية والمهنية بوصفها أساس استدامة التميز.' },
            { icon: FaBalanceScale, title: 'المهنية والشفافية', text: 'تطبيق أعلى درجات الانضباط والحوكمة في إدارة وتنفيذ البرامج.' },
            { icon: FaHandshake, title: 'الشراكات المؤسسية المستدامة', text: 'التعاون مع الجامعات والمدارس الفنية والمراكز المتخصصة لضمان جودة دائمة.' },
            { icon: FaShieldAlt, title: 'ثقافة السلامة', text: 'دمج معايير السلامة والصحة المهنية في جميع البرامج والمستويات.' },
            { icon: FaRecycle, title: 'الاستدامة', text: 'الاستخدام الأمثل للموارد وتنمية المهارات بما يدعم استمرارية الأداء وتقليل المخاطر طويلة المدى.' },
        ],
        goals: [
            { icon: FaLaptopCode, title: 'توسيع البرامج الرقمية والفنية', text: 'تنفيذ برامج متقدمة في BIM، إدارة المشروعات الذكية، وأنظمة المتابعة الرقمية لمواقع العمل بما يضمن تطويرًا مستدامًا للأعمال.' },
            { icon: FaChalkboardTeacher, title: 'تعزيز قدرات مدرسة المقاولون العرب', text: 'رفع الطاقة الاستيعابية وجودة التدريب العملي لإعداد فنيين مهرة يدعمون المشروعات القومية والخارجية.' },
            { icon: FaTools, title: 'مسارات تدريب مهني متخصصة', text: 'إنشاء مسارات معتمدة في الخرسانة، النجارة، الحدادة، تشغيل المعدات، وغيرها من تخصصات المواقع.' },
            { icon: FaDesktop, title: 'منظومة تدريب إلكترونية متكاملة (E-Learning)', text: 'منصة رقمية للتعلّم والتقييم عن بُعد تدعم نشر المعرفة وقياس أثرها بصورة مستدامة.' },
            { icon: FaShieldAlt, title: 'برامج السلامة والصحة المهنية المتقدمة', text: 'رفع الوعي وتقليل المخاطر لضمان مواقع عمل آمنة ومستدامة.' },
            { icon: FaCogs, title: 'تطوير الأعمال وتحسين الكفاءة', text: 'برامج لرفع الإنتاجية، تحسين الجودة، خفض التكاليف، ونشر ثقافة التحسين المستمر.' },
            { icon: FaGlobe, title: 'شراكات محلية ودولية', text: 'اتفاقيات تعاون لنقل الخبرات العالمية في التدريب الهندسي والمهني والفني.' },
            { icon: FaClipboardCheck, title: 'تقييم أثر التدريب', text: 'آليات علمية لقياس العائد من التدريب وربطه بالمسار الوظيفي ومؤشرات الاستدامة المؤسسية.' },
        ],
    },
};

function Vision_goals() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const c = CONTENT[i18n.language] || CONTENT.ar;
    const align = isRTL ? 'right' : 'left';

    return (
        <div className="page-root-vision" style={{ fontFamily: '"Noto Kufi Arabic", serif', direction: isRTL ? 'rtl' : 'ltr' }}>

            {/* Fixed breadcrumb bar */}
            <div style={{ position: 'fixed', top: 70, left: 0, zIndex: 50, width: '100%', borderBottom: '1px solid #d1d5db', backgroundColor: '#f5f5f5', padding: '8px 20px' }}>
                <div style={{ textAlign: 'center', fontFamily: '"Noto Kufi Arabic", serif', fontSize: '1rem' }}>
                    <Link
                        to="/"
                        style={{ color: '#0865a8', fontWeight: 700, textDecoration: 'none', marginLeft: isRTL ? '8px' : 0, marginRight: isRTL ? 0 : '8px' }}
                        onMouseEnter={e => e.target.style.color = '#f57c00'}
                        onMouseLeave={e => e.target.style.color = '#0865a8'}
                    >
                        {t('nav.home')}
                    </Link>
                    <span style={{ color: '#6b7280', margin: '0 6px' }}>•</span>
                    <span style={{ color: '#374151', marginRight: isRTL ? '8px' : 0, marginLeft: isRTL ? 0 : '8px' }}>
                        {t('vision.pageTitle')}
                    </span>
                </div>
            </div>

            {/* Hero */}
            <section className="vision-hero">
                <div className="vision-hero-accent" />
                <div className="vision-hero-content">
                    <span className="vision-hero-eyebrow">{t('footer.instituteName')}</span>
                    <h1 className="vision-hero-title">
                        {t('vision.heroTitle')} <em>{t('vision.heroTitleAccent')}</em>
                    </h1>
                </div>
            </section>

            {/* Section 1 — Vision & Mission */}
            <section className="vision-mission-section" id="vision">
                <div className="section-inner">
                    <div className="vision-mission-container">

                        <div className="image-container">
                            <img src={img1} alt={t('vision.visionMissionAlt')} className="main-image" />
                            <div className="image-overlay">
                                <h2 className="overlay-title">{t('vision.visionMissionOverlay')}</h2>
                            </div>
                        </div>

                        <div className="vision-mission-grid">
                            <div className="vision-section">
                                <h2 className="section-title" style={{ textAlign: align }}>{t('vision.visionTitle', 'الرؤية')}</h2>
                                <p className="text-content" style={{ textAlign: align }}>{c.vision}</p>
                            </div>
                            <div className="mission-section">
                                <h2 className="section-title" style={{ textAlign: align }}>{t('vision.missionTitle', 'الرسالة')}</h2>
                                <p className="text-content" style={{ textAlign: align }}>{c.mission}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2 — Senior management strategies */}
            <section className="strategy-container" id="strategy">
                <div className="section-inner">
                    <div className="strategy-wrapper">

                        <div className="image-container">
                            <img src={img2} alt={t('vision.strategyAlt')} className="main-image" />
                            <div className="image-overlay">
                                <h2 className="overlay-title">{t('vision.strategyOverlay')}</h2>
                            </div>
                        </div>

                        <div className="strategy-section">
                            <span className="section-label">الإدارة العليا</span>
                            <h2 className="section-heading" style={{ textAlign: align }}>
                                استراتيجيات <span>الإدارة العليا</span>
                            </h2>
                            <div className="heading-bar" />

                            <div className="strategy-items">
                                {c.strategies.map(({ icon: Icon, title, text }, i) => (
                                    <div className="strategy-item" key={title}>
                                        <div className="icon-box">
                                            <Icon className="icon" aria-hidden="true" />
                                        </div>
                                        <div className="strategy-body">
                                            <h3 className="strategy-title" style={{ textAlign: align }}>{i + 1}. {title}</h3>
                                            <p className="strategy-text" style={{ textAlign: align }}>{text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3 — Future training goals */}
            <section className="goals-container" id="goals">
                <div className="goals-wrapper">
                    <div className="goals-title-section">
                        <h2 className="goals-title">
                            أهداف <em>التدريب المستقبلية</em>
                        </h2>
                    </div>

                    <div className="bottom-boxes">
                        {c.goals.map(({ icon: Icon, title, text }, i) => (
                            <div className="goal-box" key={title}>
                                <span className="goal-num">{String(i + 1).padStart(2, '0')}</span>
                                <div className="goal-icon">
                                    <Icon className="icon-svg" aria-hidden="true" />
                                </div>
                                <h3 className="goal-name">{title}</h3>
                                <p className="goal-text">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 4 — Values */}
            <section className="values-section" id="values">
                <div className="section-inner">
                    <h2 className="section-heading" style={{ textAlign: 'center' }}>
                        <span>القيم</span>
                    </h2>
                    <div className="heading-bar center" />

                    <div className="values-grid">
                        {c.values.map(({ icon: Icon, title, text }) => (
                            <article className="value-card" key={title}>
                                <div className="value-icon"><Icon aria-hidden="true" /></div>
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Vision_goals;