import React, { useState } from 'react';

// Image helper: /images/shobra/<prefix>-1.jpg ... <prefix>-N.jpg
const imgs = (prefix, count) =>
    Array.from({ length: count }, (_, i) => `/images/shobra/${prefix}-${i + 1}.jpg`);

// Top gallery: the two images kept from the old page + the 7 new ones (gallery-1 ... gallery-7)
const gallery = [
    { src: '/images/Shobra12.jpg', title: 'التدريبات العملية' },
    { src: '/images/Shobra11.jpg', title: 'التدريبات العملية' },
    { src: '/images/sh1.jpg', title: 'التدريبات العملية' },
    { src: '/images/sh2.jpg', title: 'التدريبات العملية' },
    { src: '/images/sh3.jpg', title: 'التدريبات العملية' },
    { src: '/images/sh4.jpg', title: 'التدريبات العملية' },
    { src: '/images/sh5.jpg', title: 'التدريبات العملية' },
    { src: '/images/sh6.jpg', title: 'التدريبات العملية' },
    { src: '/images/sh7.jpg', title: 'التدريبات العملية' },
];

const mission = [
    'إعداد وتأهيل العمالة الفنية المتخصصة في تشغيل وصيانة وإصلاح معدات الإنشاء بمختلف أنواعها، لتلبية احتياجات الشركة.',
    'تطوير كفاءة العمالة الحالية ومواكبة التطورات التكنولوجية في المعدات وأساليب الإنشاء الحديثة.',
    'تعزيز التعاون مع التوكيلات والشركات المتخصصة في المعدات لتنمية مهارات المهندسين والفنيين والعاملين وفقًا لتخصصاتهم.',
    'إتاحة البرامج التدريبية للجهات الخارجية، والمساهمة في تنمية الكوادر الفنية الوطنية وخدمة المجتمع.',
];

const workshops = [
    {
        id: 1,
        title: 'ورشة المحركات',
        text: 'تحتوي الورشة على مجموعة متنوعة من محركات الديزل والبنزين المستخدمة في المعدات والسيارات، لتدريب المتدربين على أنظمة التشغيل ودورات عمل المحركات، وأساسيات أنظمة حقن الديزل والحساسات المرتبطة بمحركات البنزين، بالإضافة إلى تنفيذ عمليات فك وتجميع المحركات باستخدام العدد والأدوات المناسبة، ووفقًا للأصول الفنية السليمة.',
        images: [
            '/images/warshamohrk1.jpg',
            '/images/warshamohrk2.jpg'
        ],
    },
    {
        id: 2,
        title: 'ورشة نقل القدرة وأنظمة الفرامل للمعدات والسيارات',
        text: 'تحتوي الورشة على المكونات والوحدات الأساسية لمجموعات نقل القدرة وأنظمة الفرامل المستخدمة في المعدات والسيارات، لتدريب المتدربين على أساسيات نقل القدرة، وفهم مكونات ومبادئ عمل القابض (الدبرياج) وصناديق التروس اليدوية، والتعرف على أنظمة الفرامل الهيدروليكية والهوائية، مع التدريب على عمليات الفك والتركيب واختبار المنظومات وتشخيص الأعطال وتحديد طرق معالجتها، باستخدام العدد والأدوات المناسبة ووفقًا للأصول الفنية السليمة.',
        images: [
            '/images/warshanakl1.jpg',
            '/images/warshanakl2.jpg',
            '/images/warshanakl3.jpg',
            '/images/warshanakl4.jpg',
            '/images/warshanakl5.jpg'
        ],
    },
    {
        id: 3,
        title: 'ورشة الهيدروليك',
        text: 'تحتوي الورشة على مجموعة متنوعة من الطلمبات والمحركات والصمامات الهيدروليكية المستخدمة في الدوائر الهيدروليكية للمعدات، لتدريب المتدربين على التعرف على مكوناتها ومبادئ عملها وطرق تشغيلها، وتنفيذ عمليات الفك والتركيب والصيانة باستخدام العدد والأدوات المناسبة، وفقًا للأساليب الفنية السليمة.',
        images: [
            '/images/warshahydro1.jpg',
            '/images/warshahydro2.jpg',
            '/images/warshahydro3.jpg',
            '/images/warshahydro4.jpg',
            '/images/warshahydro5.jpg'
        ],
    },
    {
        id: 4,
        title: 'ورشة اللحام',
        text: 'تضم الورشة مجموعة من ماكينات اللحام اللازمة لتدريب المتدربين عمليًا على اللحام بالقوس الكهربائي (SMAW)، واللحام بالغاز الواقي (MIG/MAG – CO₂)، واللحام بالأوكسي أستيلين، بالإضافة إلى عمليات القطع الحراري للمعادن، بما يسهم في إكسابهم المهارات الفنية اللازمة لتنفيذ أعمال اللحام وفقًا للأصول الفنية السليمة، مع الالتزام باشتراطات السلامة والصحة المهنية.',
        images: [
            '/images/warshabrad1.jpg',
            '/images/warshabrad2.jpg',
            '/images/warshabrad3.jpg'
        ],
    },
    {
        id: 5,
        title: 'ورشة البرادة',
        text: 'تحتوي الورشة على العدد والأدوات اللازمة للتدريب على الأعمال الأساسية لقطع وتشغيل المعادن، مثل القياس والشنكرة والنشر والبرد والثقب والقلاووظ، بهدف إكساب المتدربين المهارات العملية الأساسية في أعمال البرادة، وتأهيلهم للعمل في مجالات التركيبات الميكانيكية والمواسير والأعمال المعدنية.',
        images: [
            '/images/warshabrad4.jpg',
            '/images/warshabrad5.jpg'
        ],
    },
    {
        id: 6,
        title: 'ورشة التركيبات الكهربائية الداخلية',
        text: 'تحتوي الورشة على نماذج متنوعة لدوائر التركيبات الكهربائية الداخلية بالمباني والمنشآت، لتدريب المتدربين على أعمال التأسيس والتمديدات وسحب الأسلاك وتوزيع الأحمال وتوصيل المكونات الكهربائية، وإجراء الاختبارات وعمليات الاستلام وإعداد المقايسات المطلوبة، وفقًا للأصول الفنية ومستويات المهارة القومية. كما تضم الورشة العدد والأدوات وأجهزة القياس اللازمة لتنفيذ أعمال التركيبات الكهربائية والتحقق من سلامتها وكفاءة أدائها.',
        images: [
            '/images/warshatarkeb1.jpg',
            '/images/warshatarkeb2.jpg',
            '/images/warshatarkeb3.jpg',
            '/images/warshatarkeb4.jpg'
        ],
    },
    {
        id: 7,
        title: 'ورشة كهرباء التحكم الآلي',
        text: 'تحتوي الورشة على المكونات والأدوات اللازمة لتنفيذ دوائر التحكم الكهربائي التقليدي (Classic Control) والتحكم الآلي، بالإضافة إلى وحدات التحكم المنطقي المبرمج (PLC)، لتدريب المتدربين على تصميم وتوصيل دوائر التحكم وبرمجتها، ومحاكاة نظم التشغيل المختلفة، بما يسهم في تنمية مهاراتهم في تشغيل الأنظمة الكهربائية والتحكم في المعدات وفقًا للأصول الفنية السليمة.',
        images: [
            '/images/warshakahrb1.jpg',
            '/images/warshakahrb2.jpg',
            '/images/warshakahrb3.jpg',
            '/images/warshakahrb4.jpg'
        ],
    },
    {
        id: 8,
        title: 'ورشة كهرباء المعدات',
        text: 'تحتوي الورشة على نماذج متنوعة من الدوائر الكهربائية للمعدات الثقيلة والمولدات والمحركات الكهربائية، لتدريب المتدربين على التعرف على مكوناتها ومبادئ عملها، وتنفيذ أعمال الفحص والصيانة والفك والتركيب والتجميع للوحدات الكهربائية باستخدام العدد والأدوات المناسبة، وفقًا للأصول والأساليب الفنية السليمة.',
        images: [
            '/images/warshamoad1.jpg',
            '/images/warshamoad2.jpg'
        ],
    },
];

const mechanicsPrograms = [
    'إعداد وتأهيل ميكانيكا سيارات',
    'إعداد وتأهيل فني ميكانيكا سيارات',
    'إعداد وتأهيل ميكانيكا معدات',
    'إعداد وتأهيل فني ميكانيكا معدات',
    'إعداد وتأهيل فني ميكانيكا هيدروليك',
    'إعداد وتأهيل فني ميكانيكا محركات',
    'مجموعة نقل القدرة (Power Train)',
    'إعداد وتأهيل فني تشغيل معدات',
    'إعداد وتأهيل فني وناش ارضي',
    'دورة عامة عن سيارات الإفيكو',
    'صيانة وإصلاح الإطارات (لحام كاوتش)',
];

const weldingPrograms = [
    'رفع كفاءة فني وملاحظ برادة معادن',
    'رفع كفاءة فني براد تركيبات',
    'رفع كفاءة فني و ملاحظ لحام معادن',
    'رفع كفاءة فني لحام كهرباء وأكسجين',
    'رفع كفاءة فني لحام Co2',
    'رفع كفاءة في عمليات اللحام والقطع المختلفة',
    'طرق فحص اللحام و كيفية تلافيها',
];

const electricalPrograms = [
    'إعداد وتأهيل كهربائي تركيبات داخلية - المستوى الثاني',
    'إعداد وتأهيل فني / ملاحظ كهرباء تركيبات كهربائية - المستوى الثالث',
    'إعداد وتأهيل فني / ملاحظ كهرباء صيانة وتشغيل',
    'إعداد وتأهيل فني / ملاحظ كهرباء سيارات ومعدات',
    'مقدمة في التحكم المنطقي المبرمج PLC',
    'التمديدات ولوحات التوزيع الكهربائية',
    'دوائر التحكم الآلي',
];

const ShobraTrainingPage = () => {
    const [openSection, setOpenSection] = useState(null);
    const [modalImage, setModalImage] = useState(null);

    const toggleSection = (id) => {
        setOpenSection(openSection === id ? null : id);
    };

    const openModal = (imageSrc, title) => {
        setModalImage({ src: imageSrc, title });
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setModalImage(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Droid+Arabic+Kufi:wght@400;700&display=swap');

                .shobra-container * {
                    font-family: 'Noto Kufi Arabic', serif;
                }

                .shobra-accordion-button {
                    transition: all 0.3s ease;
                }

                .shobra-accordion-button:hover {
                    background-color: rgba(8, 101, 168, 0.05);
                }

                /* Top gallery */
                .shobra-gallery {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                }

                .shobra-gallery-item {
                    height: 240px;
                    overflow: hidden;
                    border-radius: 16px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e8e8e8;
                    background-color: #f5f5f5;
                }

                .shobra-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center top;
                    cursor: pointer;
                    display: block;
                    transition: transform 0.4s ease;
                }

                .shobra-image:hover {
                    transform: scale(1.05);
                }

                /* Workshop thumbnails */
                .shobra-thumbs {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                    gap: 0.75rem;
                    margin-top: 1rem;
                }

                .shobra-thumb {
                    height: 130px;
                    overflow: hidden;
                    border-radius: 8px;
                    border: 2px solid #e8e8e8;
                    background-color: #f5f5f5;
                }

                /* Modal Styles */
                .shobra-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.85);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    padding: 1rem;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .shobra-modal-content {
                    position: relative;
                    max-width: 90vw;
                    max-height: 90vh;
                    animation: scaleIn 0.3s ease;
                }

                @keyframes scaleIn {
                    from {
                        transform: scale(0.9);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .shobra-modal-image {
                    max-width: 100%;
                    max-height: 85vh;
                    width: auto;
                    height: auto;
                    border-radius: 8px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    object-fit: contain;
                }

                .shobra-modal-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background-color: #f57c00;
                    color: white;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    font-weight: bold;
                }

                .shobra-modal-close:hover {
                    background-color: #0865a8;
                    transform: rotate(90deg);
                }

                .shobra-modal-title {
                    position: absolute;
                    bottom: -50px;
                    left: 0;
                    right: 0;
                    text-align: center;
                    color: white;
                    font-size: 1.1rem;
                    padding: 0.5rem;
                }

                /* Responsive Styles */
                @media (max-width: 1024px) {
                    .shobra-main-content {
                        padding-left: 1.5rem !important;
                        padding-right: 1.5rem !important;
                    }
                }

                @media (max-width: 768px) {
                    .shobra-main-content {
                        padding-top: calc(60px + 45px + 2rem) !important;
                        padding-left: 1rem !important;
                        padding-right: 1rem !important;
                    }

                    .shobra-header {
                        padding: 1.5rem !important;
                    }

                    .shobra-header-title {
                        font-size: 1.75rem !important;
                    }

                    .shobra-gallery {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .shobra-gallery-item {
                        height: 200px;
                    }

                    .shobra-vision-grid {
                        grid-template-columns: 1fr !important;
                    }

                    .shobra-programs-grid {
                        grid-template-columns: 1fr !important;
                    }

                    .shobra-modal-close {
                        top: 10px;
                        right: 10px;
                    }

                    .shobra-modal-title {
                        position: relative;
                        bottom: auto;
                        margin-top: 1rem;
                    }
                }

                @media (max-width: 480px) {
                    .shobra-header {
                        padding: 1rem !important;
                        border-right-width: 4px !important;
                    }

                    .shobra-header-title {
                        font-size: 1.5rem !important;
                        margin-bottom: 1rem !important;
                    }

                    .shobra-header-text {
                        font-size: 0.95rem !important;
                    }

                    .shobra-gallery {
                        grid-template-columns: 1fr;
                    }

                    .shobra-gallery-item {
                        height: 220px;
                    }

                    .shobra-thumbs {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .shobra-section-title {
                        font-size: 1.25rem !important;
                    }

                    .shobra-workshop-title {
                        font-size: 1rem !important;
                    }

                    .shobra-modal-close {
                        width: 32px;
                        height: 32px;
                        font-size: 1.2rem;
                    }

                    .shobra-modal-title {
                        font-size: 0.9rem;
                    }

                    .shobra-program-card {
                        padding: 1.25rem !important;
                    }

                    .shobra-program-title {
                        font-size: 1rem !important;
                    }

                    .shobra-program-item {
                        font-size: 0.85rem !important;
                    }
                }

                @media (max-width: 360px) {
                    .shobra-header-title {
                        font-size: 1.3rem !important;
                    }
                }
            `}</style>

            <div className="shobra-container" style={{
                minHeight: '100vh',
                backgroundColor: '#ffffff',
                direction: 'rtl',
                textAlign: 'right'
            }}>
                {/* Fixed Overview Bar */}
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
                        <span style={{ color: '#374151', marginRight: '8px' }}>مركز التدريب على المهن الميكانيكية و الكهربائية</span>
                    </div>
                </div>

                <div
                    className="shobra-main-content"
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '0 1.5rem 2rem',
                        paddingTop: 'calc(70px + 50px + 2rem)'
                    }}
                >
                    {/* Header Section */}
                    <header
                        className="shobra-header"
                        style={{
                            marginBottom: '2rem',
                            borderRadius: '16px',
                            borderRight: '8px solid #f57c00',
                            backgroundColor: '#ffffff',
                            padding: '2rem',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                            border: '1px solid #e8e8e8'
                        }}
                    >
                        <h1
                            className="shobra-header-title"
                            style={{
                                marginBottom: '1.5rem',
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                color: '#000000'
                            }}
                        >
                            مركز التدريب على المهن الميكانيكية و الكهربائية
                        </h1>
                        <p
                            className="shobra-header-text"
                            style={{
                                fontSize: '1.125rem',
                                lineHeight: '1.9',
                                color: '#333333',
                                margin: 0
                            }}
                        >
                            يُعد مركز التدريب على المهن الميكانيكية والكهربائية بشبرا، التابع للمعهد التكنولوجي لهندسة التشييد والإدارة، أحد مراكز تدريب شركة المقاولون العرب المتخصصة في إعداد وتأهيل الفنيين ومساعدي الفنيين وملاحظي المعدات، وتطوير مهارات العاملين بالشركة من خلال برامج التدريب الفني والتدريب التحويلي، بما يلبي احتياجات مشروعات الشركة. كما يقدم المركز خدماته للجهات الخارجية، من خلال تدريب طلاب المدارس الصناعية والمعاهد الفنية وكليات الهندسة، وربط الدراسة النظرية بالتطبيق العملي.
                        </p>
                        <div
                            style={{
                                marginTop: '1.5rem',
                                paddingTop: '1.25rem',
                                borderTop: '1px solid #e8e8e8',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.5rem',
                                alignItems: 'flex-start',
                                lineHeight: '1.9'
                            }}
                        >
                            <strong style={{ color: '#f57c00' }}>📍 العنوان :</strong>
                            <span style={{ color: '#333333', fontWeight: 600 }}>
                                ١٠ شارع ٦ أكتوبر – ترعة الاسماعيلية – شبرا الخيمة - القليوبية
                            </span>
                        </div>
                    </header>

                    {/* Image Gallery */}
                    <div className="shobra-gallery" style={{ marginBottom: '3rem' }}>
                        {gallery.map((g, i) => (
                            <div key={i} className="shobra-gallery-item">
                                <img
                                    src={g.src}
                                    alt={g.title}
                                    className="shobra-image"
                                    onClick={() => openModal(g.src, g.title)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Vision & Mission */}
                    <div
                        className="shobra-vision-grid"
                        style={{
                            marginBottom: '3rem',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1.5rem',
                            alignItems: 'start'
                        }}
                    >
                        <div
                            style={{
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #0865a8 0%, #1976d2 100%)',
                                padding: '2rem',
                                color: '#ffffff',
                                boxShadow: '0 8px 20px rgba(8, 101, 168, 0.3)'
                            }}
                        >
                            <h3
                                style={{
                                    marginBottom: '1rem',
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                👁️ الرؤية
                            </h3>
                            <p
                                style={{
                                    lineHeight: '1.8',
                                    opacity: 0.95,
                                    margin: 0
                                }}
                            >
                                يسعى المركز إلى تلبية الاحتياجات التدريبية للشركة والجهات الخارجية، من خلال برامج تدريبية متكاملة تسهم في تطوير الكفاءات ورفع كفاءة الأداء.
                            </p>
                        </div>
                        <div
                            style={{
                                borderRadius: '16px',
                                border: '2px solid #0865a8',
                                backgroundColor: '#ffffff',
                                padding: '2rem',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                            }}
                        >
                            <h3
                                style={{
                                    marginBottom: '1rem',
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    color: '#0865a8'
                                }}
                            >
                                ✉️ الرسالة
                            </h3>
                            <ul
                                style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    color: '#333333',
                                    lineHeight: '1.9',
                                    fontSize: '0.95rem'
                                }}
                            >
                                {mission.map((m, i) => (
                                    <li key={i} style={{ marginBottom: i === mission.length - 1 ? 0 : '0.75rem', display: 'flex', gap: '0.5rem' }}>
                                        <span style={{ color: '#f57c00', fontWeight: 'bold' }}>✓</span>
                                        <span>{m}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Workshops Section */}
                    <h2
                        className="shobra-section-title"
                        style={{
                            marginBottom: '1.5rem',
                            fontSize: '1.75rem',
                            fontWeight: 'bold',
                            color: '#0865a8',
                            borderBottom: '2px solid #f57c00',
                            paddingBottom: '0.5rem',
                            display: 'inline-block'
                        }}
                    >
                        الورش العملية بالمركز
                    </h2>
                    <div style={{ marginBottom: '3rem' }}>
                        {workshops.map((ws) => (
                            <div
                                key={ws.id}
                                style={{
                                    overflow: 'hidden',
                                    borderRadius: '12px',
                                    border: '1px solid #e8e8e8',
                                    backgroundColor: '#ffffff',
                                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                                    marginBottom: '1rem'
                                }}
                            >
                                <button
                                    onClick={() => toggleSection(`ws${ws.id}`)}
                                    className="shobra-accordion-button"
                                    style={{
                                        width: '100%',
                                        padding: '1.25rem',
                                        textAlign: 'right',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        border: 'none',
                                        backgroundColor: 'transparent',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <span
                                        className="shobra-workshop-title"
                                        style={{
                                            fontWeight: 'bold',
                                            color: '#0865a8',
                                            fontSize: '1.125rem'
                                        }}
                                    >
                                        {ws.title}
                                    </span>
                                    <span
                                        style={{
                                            color: '#f57c00',
                                            fontSize: '1.25rem',
                                            transform: openSection === `ws${ws.id}` ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s ease'
                                        }}
                                    >
                                        ▼
                                    </span>
                                </button>
                                {openSection === `ws${ws.id}` && (
                                    <div
                                        style={{
                                            borderTop: '1px solid #f0f0f0',
                                            backgroundColor: '#fafafa',
                                            padding: '1.25rem',
                                            color: '#333333',
                                            lineHeight: '1.8'
                                        }}
                                    >
                                        <p style={{ margin: 0 }}>{ws.text}</p>
                                        {ws.images.length > 0 && (
                                            <div className="shobra-thumbs">
                                                {ws.images.map((src, index) => (
                                                    <div key={index} className="shobra-thumb">
                                                        <img
                                                            src={src}
                                                            alt={`${ws.title} - صورة ${index + 1}`}
                                                            className="shobra-image"
                                                            onClick={() => openModal(src, ws.title)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Training Programs */}
                    <h2
                        className="shobra-section-title"
                        style={{
                            marginBottom: '1.5rem',
                            fontSize: '1.75rem',
                            fontWeight: 'bold',
                            color: '#000000'
                        }}
                    >
                        البرامج التدريبية
                    </h2>
                    <div
                        className="shobra-programs-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '1.5rem'
                        }}
                    >
                        {/* Mechanics Programs */}
                        <div
                            className="shobra-program-card"
                            style={{
                                borderRadius: '16px',
                                borderTop: '4px solid #0865a8',
                                backgroundColor: '#ffffff',
                                padding: '1.5rem',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                            }}
                        >
                            <h4
                                className="shobra-program-title"
                                style={{
                                    marginBottom: '1rem',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    color: '#0865a8',
                                    fontSize: '1.125rem'
                                }}
                            >
                                برامج قسم الميكانيكا
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {mechanicsPrograms.map((item, index) => (
                                    <li
                                        key={index}
                                        className="shobra-program-item"
                                        style={{
                                            marginBottom: '0.5rem',
                                            fontSize: '0.9rem',
                                            color: '#333333',
                                            lineHeight: '1.6'
                                        }}
                                    >
                                        • {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Welding Programs */}
                        <div
                            className="shobra-program-card"
                            style={{
                                borderRadius: '16px',
                                borderTop: '4px solid #f57c00',
                                backgroundColor: '#ffffff',
                                padding: '1.5rem',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                            }}
                        >
                            <h4
                                className="shobra-program-title"
                                style={{
                                    marginBottom: '1rem',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    color: '#f57c00',
                                    fontSize: '1.125rem'
                                }}
                            >
                                برامج اللحام والبرادة
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {weldingPrograms.map((item, index) => (
                                    <li
                                        key={index}
                                        className="shobra-program-item"
                                        style={{
                                            marginBottom: '0.5rem',
                                            fontSize: '0.9rem',
                                            color: '#333333',
                                            lineHeight: '1.6'
                                        }}
                                    >
                                        • {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Electrical Programs */}
                        <div
                            className="shobra-program-card"
                            style={{
                                borderRadius: '16px',
                                borderTop: '4px solid #0865a8',
                                backgroundColor: '#ffffff',
                                padding: '1.5rem',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                            }}
                        >
                            <h4
                                className="shobra-program-title"
                                style={{
                                    marginBottom: '1rem',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    color: '#0865a8',
                                    fontSize: '1.125rem'
                                }}
                            >
                                برامج قسم الكهرباء
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {electricalPrograms.map((item, index) => (
                                    <li
                                        key={index}
                                        className="shobra-program-item"
                                        style={{
                                            marginBottom: '0.5rem',
                                            fontSize: '0.9rem',
                                            color: '#333333',
                                            lineHeight: '1.6'
                                        }}
                                    >
                                        • {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Image Modal */}
                {modalImage && (
                    <div
                        className="shobra-modal-overlay"
                        onClick={closeModal}
                    >
                        <div
                            className="shobra-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="shobra-modal-close"
                                onClick={closeModal}
                                aria-label="إغلاق"
                            >
                                ✕
                            </button>
                            <img
                                src={modalImage.src}
                                alt={modalImage.title}
                                className="shobra-modal-image"
                            />
                            <div className="shobra-modal-title">
                                {modalImage.title}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ShobraTrainingPage;