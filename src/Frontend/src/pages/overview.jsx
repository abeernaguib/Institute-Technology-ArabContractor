import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FaHardHat,
    FaCalendarAlt,
    FaUsers,
    FaGraduationCap,
    FaArrowLeft,
    FaChalkboardTeacher,
    FaBuilding,
    FaUserTie,
    FaBookOpen,
    FaMapMarkerAlt,
    FaChair,
} from 'react-icons/fa';
import './overview.css';

const serviceCards = [
    {
        title: 'التدريب التنفيذي والإشرافي والخدمي',
        description: 'برامج مدينة نصر للتدريب التنفيذي والإشرافي والخدمي.',
        path: '/services/executive-supervisory-service-training',
        icon: <FaChalkboardTeacher aria-hidden="true" />,
        featured: true,
    },
    {
        title: 'برامج للتدريب التحويلي',
        description: 'برامج تساعد على تطوير المهارات والانتقال إلى أدوار مهنية جديدة.',
        path: '/services/transformational-training',
        icon: <FaGraduationCap aria-hidden="true" />,
    },
    {
        title: 'تصميم وتنفيذ حلول تدريب متكاملة للمشروعات',
        description: 'حلول تدريبية مصممة وفق احتياجات المشروع وطبيعة فرق العمل.',
        path: '/services/project-training-solutions',
        icon: <FaBuilding aria-hidden="true" />,
    },
    {
        title: 'التدريب في موقع العمل',
        description: 'تدريب عملي داخل مواقع العمل يركز على التطبيق ورفع الكفاءة.',
        path: '/services/on-job-training',
        icon: <FaHardHat aria-hidden="true" />,
    },
];

// المحتوى المنقول من صفحة "أساليب التدريب" (اقرأ المزيد سابقًا)
const trainingMethods = [
    {
        title: 'الثروة البشرية',
        description:
            'لدينا ثروة بشرية هائلة لديها خبرات تراكمية تكونت عبر سنوات من العمل الطويل في المشروعات القومية سواء كان ذلك في داخل جمهورية مصر العربية أو خارجها.',
        icon: <FaUserTie aria-hidden="true" className="my-custom-class" />,
    },
    {
        title: 'المواد العلمية والتدريبية',
        description:
            'نمتلك مجموعة كبيرة من المواد العلمية والتدريبية (حوالي 2500 مادة تدريبية) موضوعة من خلال مجموعة منتقاة من الخبراء وأساتذة الجامعات، ومن خلالها يمكن تنفيذ دورات تدريبية محددة طبقًا لخطة المعهد أو طبقًا لاحتياجات العميل.',
        icon: <FaBuilding aria-hidden="true" className="my-custom-class" />,
    },
    {
        title: 'مركز المعلومات والمكتبة',
        description:
            'نمتلك مركزًا للمعلومات ومكتبة متخصصة في العلوم (الهندسية - المالية - الإدارية) بكافة أنواعها لخدمة قطاع البناء والتشييد والقطاعات الأخرى بالدولة.',
        icon: <FaBookOpen aria-hidden="true" className="my-custom-class" />,
    },
    {
        title: 'التدريب في الموقع',
        description:
            'لدينا ميزة التدريب في الموقع والمشروعات التابعة للشركة والمنتشرة في جميع أنحاء الجمهورية.',
        icon: <FaMapMarkerAlt aria-hidden="true" className="my-custom-class" />,
    },
    {
        title: 'قاعات التدريب',
        description: 'نمتلك قاعات تدريب مجهزة بأحدث وسائل العرض والمساعدات التدريبية.',
        icon: <FaChair aria-hidden="true" className="my-custom-class" />,
    },
];

const stats = [
    {
        value: '176,418',
        label: 'إجمالي عدد المتدربين منذ إنشاء المعهد وحتى الآن',
        icon: <FaUsers aria-hidden="true" />,
    },
    {
        value: '9 مدربين',
        label: 'عدد المدربين في أول دورة بالمعهد',
        icon: <FaUsers aria-hidden="true" />,
    },
    {
        value: '22/04/1978 – 01/06/1978',
        label: 'تاريخ انعقاد أول دورة',
        icon: <FaCalendarAlt aria-hidden="true" />,
    },
];

function Overview() {
    const { hash } = useLocation();

    // Scroll to a section when the URL has a hash, e.g. /overview#training-methods
    useEffect(() => {
        if (!hash) return undefined;
        const timer = setTimeout(() => {
            const el = document.getElementById(hash.slice(1));
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return () => clearTimeout(timer);
    }, [hash]);

    return (
        <main className="page-root" dir="rtl">
            <div className="overview-bar-wrapper">
                <div className="overview-bar">
                    <Link to="/" className="overview-home-link">الصفحة الرئيسية</Link>
                    <span className="overview-separator">•</span>
                    <span>نبذة عامة والخدمات</span>
                </div>
            </div>

            <section className="hero" aria-labelledby="overview-title">
                <div className="hero-accent-bar" />
                <div className="hero-content">
                    <span className="hero-eyebrow">منذ عام 1978</span>
                    <h1 id="overview-title" className="hero-title">
                        المعهد التكنولوجي<br />
                        <em>لهندسة التشييد والإدارة</em>
                    </h1>
                    <p className="hero-body">
                        إيمانًا من شركة المقاولون العرب بأهمية التدريب لتنمية المعارف والمهارات للموارد البشرية،
                        كانت أولى شركات المقاولات في منطقة الشرق الأوسط التي أنشأت معهدًا للتدريب منذ أكثر من
                        40 عامًا لمواكبة التطورات المستمرة في مجال التشييد والبناء.
                    </p>
                </div>
            </section>

            <section className="section_2" aria-labelledby="services-title">
                <div className="section-inner">
                    <h2 id="services-title" className="section-heading">
                        لدينا القدرة على عمل <span>برامج تدريبية متنوعة</span>
                    </h2>
                    <div className="heading-bar" />

                    <div className="section_2_cards">
                        {serviceCards.map((service) => (
                            <Link
                                key={service.path}
                                to={service.path}
                                className={`service-card-link ${service.featured ? 'service-card-link--featured' : ''}`}
                            >
                                <article className="section_2_card">
                                    <div className="service-card-icon">{service.icon}</div>
                                    <h3 className="txt_card_sec_2">{service.title}</h3>
                                    <p className="service-card-description">{service.description}</p>
                                    <span className="service-card-action">عرض التفاصيل <FaArrowLeft aria-hidden="true" /></span>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section_3" aria-labelledby="numbers-title">
                <div className="section-inner">
                    <h2 id="numbers-title" className="section-heading">أرقام <span>تتحدث عن نفسها</span></h2>
                    <div className="heading-bar" />
                    <div className="cards_sec_3">
                        <article className="card_sec_3">
                            <h3 className="h1_card_sec3">أكثر من 60 عميل</h3>
                            <p className="p_sec_3">نساهم في تطوير صناعة التشييد بإتاحة إمكانيات الإدارة في التدريب للوزارات والهيئات الحكومية والخاصة.</p>
                        </article>
                        <article className="card_sec_3">
                            <h3 className="h1_card_sec3">أكثر من 2500 مادة تدريبية</h3>
                            <p className="p_sec_3">نمتلك مواد علمية وتدريبية أعدّتها مجموعة منتقاة من الخبراء وأساتذة الجامعات.</p>
                        </article>
                        <article className="card_sec_3">
                            <h3 className="h1_card_sec3">بدأنا منذ 1978</h3>
                            <p className="p_sec_3">تم تأسيس المعهد لمواكبة التطورات المستمرة في مجال التشييد والبناء.</p>
                        </article>
                    </div>
                </div>
            </section>

            <section className="section_4" aria-labelledby="first-course-title">
                <div className="section-inner">
                    <h2 id="first-course-title" className="h1_sec_4">أول دورة بالمعهد</h2>
                    <p className="section-intro">بداية المسيرة التدريبية للمعهد ودورته الأولى في مجال برامج الهندسة المدنية.</p>
                    <div className="heading-bar" />

                    <div className="first-course-layout">
                        <article className="first-course-feature-card">
                            <div className="first-course-feature-icon"><FaHardHat aria-hidden="true" /></div>
                            <span className="first-course-kicker">الانطلاقة الأولى</span>
                            <h3>دورة برامج الهندسة المدنية</h3>
                            <p>أولى الدورات التي أسست لمسيرة المعهد في إعداد الكوادر ورفع كفاءة العاملين في قطاع التشييد.</p>
                            <div className="first-course-date">22 أبريل 1978 — 1 يونيو 1978</div>
                        </article>
                        <div className="course-stats-grid">
                            {stats.map((stat) => (
                                <article className="course-stat-card" key={stat.label}>
                                    <div className="icon_sec_4">{stat.icon}</div>
                                    <div className="content_icon_sec_4">
                                        <strong>{stat.value}</strong>
                                        <span>{stat.label}</span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* قسم أساليب التدريب (منقول من صفحة "اقرأ المزيد") */}
            <section className="section_5 section_methods" id="training-methods" aria-labelledby="methods-title">
                <div className="section-inner">
                    <h2 id="methods-title" className="section-heading">
                        أحدث <span>طرق التدريب</span>
                    </h2>
                    <p className="section-intro">
                        يمتلك المعهد مجموعة من المقومات التي تأهله لتقديم خدمات تدريبية مميزة.
                    </p>
                    <div className="heading-bar" />
                    <div className="cards_sec_5">
                        {trainingMethods.map((item) => (
                            <article className="card_sec_5" key={item.title}>
                                <div className="div_icon">{item.icon}</div>
                                <div className="div_title"><h3>{item.title}</h3></div>
                                <p className="div_dis_txt">{item.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section_5" aria-labelledby="why-title">
                <div className="section-inner">
                    <h2 id="why-title" className="section-heading"><span className="why-title-prefix">لماذا تشترك</span> <span>بمعهد التدريب</span></h2>
                    <div className="heading-bar" />
                    <div className="cards_sec_5">
                        <article className="card_sec_5"><div className="div_icon"><FaBuilding className="my-custom-class" /></div><div className="div_title"><h3>خدمات متميزة</h3></div><p className="div_dis_txt">نقدم البرامج التدريبية ومدارس التعليم الفني والتدريب للشركات والجهات الحكومية.</p></article>
                        <article className="card_sec_5"><div className="div_icon"><FaUsers className="my-custom-class" /></div><div className="div_title"><h3>مجموعة متميزة من المدربين</h3></div><p className="div_dis_txt">نعتمد على خبرات وكفاءات بشرية تتسم بقدر عالٍ من المهارات والقدرات.</p></article>
                        <article className="card_sec_5"><div className="div_icon"><FaGraduationCap className="my-custom-class" /></div><div className="div_title"><h3>شهادات معتمدة دوليًا</h3></div><p className="div_dis_txt">حاصلون على ISO 9001:2015 ومعتمدون من معهد إدارة المشاريع PMI مع تحديث سنوي مستمر.</p></article>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Overview;