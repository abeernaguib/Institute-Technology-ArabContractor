import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function TechnicalSchoolPage() {
    const [openAccordion, setOpenAccordion] = useState(null);
    const [openAccordion2, setOpenAccordion2] = useState(null);
    const [openAccordion3, setOpenAccordion3] = useState(null);
    const [openAccordion4, setOpenAccordion4] = useState(null);

    const toggleAccordion = (id) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    const toggleAccordion2 = (id) => {
        setOpenAccordion2(openAccordion2 === id ? null : id);
    };

    const toggleAccordion3 = (id) => {
        setOpenAccordion3(openAccordion3 === id ? null : id);
    };

    const toggleAccordion4 = (id) => {
        setOpenAccordion4(openAccordion4 === id ? null : id);
    };

    // Images are named 1.png ... 13.png (no captions)
    const images = Array.from({ length: 13 }, (_, i) => ({
        src: `/images/t3lem/${i + 1}.jpg`
    }));

    const [currentImage, setCurrentImage] = useState(0);

    return (

        <div style={{ fontFamily: '"Noto Kufi Arabic", serif', direction: 'rtl' }}>
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

            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #070707 0%, #0865a8 100%)',
                color: 'white',
                padding: '80px 20px',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                        مدرسة المقاولون العرب الثانوية الفنية
                    </h1>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                        للتعليم والتدريب المزدوج
                    </h2>
                </div>
            </div>

            {/* Content Section */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
                <div style={{ marginBottom: '40px', lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
                    <p style={{ marginBottom: '20px' }}>
                        يعاني السوق المصري من نقص في العمالة الفنية المدربة في مجال معدات التشييد، في ظل التطور التكنولوجي المستمر للمعدات الحديثة وما تتطلبه من مهارات متخصصة في التشغيل والصيانة والإصلاح الميكانيكي والكهربائي وأنظمة التحكم، الأمر الذي دفع العديد من الشركات إلى الاستعانة بعمالة مدربة من الخارج.
                    </p>
                    <p style={{ marginBottom: '20px' }}>
                        وتحتاج الشركة، باعتبارها إحدى الشركات الرائدة في قطاع التشييد والبناء محليًا ودوليًا، إلى هذه الكوادر لتلبية احتياجات مشروعاتها، وهو ما يعزز أهمية التوسع في التخصصات الفنية بالمدرسة التابعة للشركة، بما يسهم في توفير العمالة الماهرة للشركة وسوق العمل، والحد من البطالة، وتوفير فرص عمل لائقة للشباب.
                    </p>
                    <p>
                        وامتدادًا لهذا الدور، تقرر التوسع في تخصصات المدرسة باستحداث تخصص بناء هياكل السفن اعتبارًا من العام الدراسي ٢٠٢٦/٢٠٢٧، بهدف إعداد كوادر فنية متخصصة في تصنيع وتشكيل وتجميع هياكل السفن وأعمال اللحام وتشغيل المعادن، بما يلبي احتياجات الشركة والجهات العاملة في الصناعات البحرية، ويدعم الصناعة الوطنية ويربط مخرجات التعليم الفني باحتياجات سوق العمل.
                    </p>
                </div>

                {/* Image Gallery */}
                <div style={{ marginBottom: '60px', backgroundColor: '#f5f5f5', padding: '30px', borderRadius: '15px' }}>
                    <div style={{
                        position: 'relative',
                        marginBottom: '20px',
                        width: '100%',
                        height: '500px',
                        backgroundColor: '#e9e9e9',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}>
                        <img
                            src={images[currentImage].src}
                            alt={`صورة ${currentImage + 1}`}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                width: 'auto',
                                height: 'auto',
                                objectFit: 'contain',
                                display: 'block'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '10px 0' }}>
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img.src}
                                alt={`صورة ${index + 1}`}
                                onClick={() => setCurrentImage(index)}
                                style={{
                                    width: '120px',
                                    height: '80px',
                                    objectFit: 'contain',
                                    backgroundColor: '#e9e9e9',
                                    flexShrink: 0,
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    border: currentImage === index ? '3px solid #f57c00' : '3px solid transparent',
                                    transition: '0.3s'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Accordion Section 1: Vision, Mission, Goals */}
                <div style={{ marginBottom: '60px' }}>
                    {[
                        {
                            id: 1,
                            title: 'الرؤية',
                            content: 'قيام الشركة ببناء قدراتها على كافة المستويات وخاصة الفنية والحرفية لسد العجز في بعض التخصصات التي تتطلب مهارات تقنية عالية وأن تساهم الشركة في حل مشكلة البطالة بالدولة'
                        },
                        {
                            id: 2,
                            title: 'الرسالة',
                            content: 'قيام الشركة ببناء قدراتها على كافة المستويات وخاصة الفنية والحرفية لسد العجز في بعض التخصصات التي تتطلب مهارات تقنية عالية و أن تساهم الشركة في حل مشكلة البطالة بالدولةتوفير برامج التعليم الفني والتدريب المهني المبتكر المتصلة بإحتياجات سوق العمل المحلى والدولي ووفقًا للمعايير الدولية، مع التركيز على المهارات والكفاءات والجدارات وبناء الشخصية'
                        },
                        {
                            id: 3,
                            title: 'الأهداف',
                            content: null,
                            list: [
                                'توفير الاحتياجات الحالية والمستقبلية من الفنيين المهرة والمؤهلين في مجالي صيانة وإصلاح المعدات الثقيلة وبناء هياكل السفن، بما يلبي احتياجات مشروعات الشركة والقطاعات الهندسية والبحرية.',
                                'استقبال الطلاب الحاصلين على الشهادة الإعدادية بالتنسيق مع وزارة التربية والتعليم والتعليم الفني، وتأهيلهم للحصول على دبلوم المدارس الثانوية الفنية الصناعية (نظام الثلاث سنوات)، وإعدادهم للعمل بالمشروعات القومية.',
                                'إكساب الطلاب المهارات الفنية والمهنية والحياتية اللازمة، مع التركيز على التدريب العملي واللغة الإنجليزية التخصصية.',
                                'إنشاء منظومة مستدامة لإعداد وتوفير الفنيين المتخصصين بما يدعم استمرارية التنمية والتطوير بالشركة.',
                                'المساهمة في توفير العمالة الفنية المدربة، والحد من البطالة، وتعزيز فرص التوظيف للشباب، مع إمكانية تعميم التجربة على الشركات والقطاعات الأخرى.'
                            ]
                        },
                        {
                            id: 4,
                            title: 'وصف للدراسة والتدريب',
                            content: null,
                            list: [
                                'المؤهل دبلوم المدارس الثانوية الفنيه نظام الثلاث سنوات.',
                                'مدة الدراسة والتدريب ثلاث سنوات دراسية .',
                                'العام الدراسي 11 شهر ويمنح المتدرب أجازة سنوية شهر عن كل سنة بطلب توافق الشركة عليه.',
                                'يتلقى الطالب الدراسة النظرية في المدرسة يومان أسبوعياً.',
                                'يتلقى الطالب التدريبات المهنية 4 أيام أسبوعياً في المكان التدريبي .',
                                'الأجازة الصيفية ونصف العام للمدارس يتواجد الطالب بالشركة 6 أيام أسبوعياً .',
                                'يحصل الطالب على 21 يوم أجازة خلال الصيف بطلب يوافق المكان التدريبي علية. .',
                                'يحصل الطالب على دورات عملية داخل معامل وورش الشركه وخارجها .',
                                'في نهاية المرحلة تقوم الشركة بإبرام عقد توظيف للطلاب المتميزين براتب مناسب في حالة وجود أماكن خالية .',
                                'يقوم المعهد بترشيح الخريج إلى وظيفة بأحد الشركات في حالة عدم تعيينه بالشركه .'
                            ]
                        },
                        {
                            id: 5,
                            title: 'إنشاء المدرسة',
                            content: null,
                            list: [
                                'تم إبرام اتفاقية تعاون مع وزاره التربية و التعليم و التعليم الفني لإنشاء مدرسة ثانوية فنية صناعية للتعليم والتدريب المزدوج للمعدات الثقيلة داخل شركة المقاولون العرب بمقر مركز تدريب شبرا التابع لإدارة المعهد التكنولوجي لهندسة التشييد والإدارة.',
                                'تم إصدار قرار وزاري رقم (358) بإنشاء مدرسة المقاولون العرب الثانوية الفنية للتعليم و التدريب المزدوج التابعة لإدارة شرق شبرا الخيمة التعليمية بمحافظه القليوبية',
                                'تم إصدار قرار وزاري رقم (392) بمهنه صيانة وإصلاح المعدات الثقيلة بنظام التعليم المزدوج بمدرسة المقاولون العرب الثانوية الفنية للتعليم و التدريب المزدوج .'
                            ]
                        }
                    ].map((item) => (
                        <div key={item.id} style={{
                            marginBottom: '15px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '10px',
                            overflow: 'hidden'
                        }}>
                            <button
                                onClick={() => toggleAccordion(item.id)}
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    backgroundColor: openAccordion === item.id ? '#f57c00' : 'white',
                                    color: openAccordion === item.id ? 'white' : '#333',
                                    border: 'none',
                                    textAlign: 'right',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: '0.3s'
                                }}
                            >
                                {item.title}
                                <ChevronDown style={{
                                    transform: openAccordion === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: '0.3s'
                                }} />
                            </button>
                            {openAccordion === item.id && (
                                <div style={{ padding: '25px', backgroundColor: '#f9f9f9', lineHeight: '1.8' }}>
                                    {item.content && <p>{item.content}</p>}
                                    {item.list && (
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {item.list.map((listItem, index) => (
                                                <li key={index} style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                                                    <Check style={{ color: '#f57c00', marginLeft: '10px', marginTop: '5px', flexShrink: 0 }} size={20} />
                                                    <span>{listItem}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Section 2: Heavy Equipment */}
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '30px',
                    color: '#f57c00',
                    textAlign: 'center'
                }}>
                    صيانة وإصلاح المعدات الثقيلة
                </h2>

                <div style={{ marginBottom: '60px' }}>
                    {[
                        {
                            id: 1,
                            title: 'تعريف بالمهنة',
                            content: 'العمل في مهنة صيانة وإصلاح المعدات ثقيلة بمجال التشييد و البناء يتطلب الإلمام بجانب من المعارف الأساسية وإتقان عدد من المهارات الأدائية مع بعض المعارف الخاصة بالأجزاء الميكانيكية و الكهربية للمعدة التي تمكن العامل من صيانة وإصلاح المعدات الثقيلة تحت إشراف , مع مراعاة تعليمات السلامة والصحة المهنية و الحفاظ على بيئة العمل.'
                        },
                        {
                            id: 2,
                            title: 'المهارات المعرفية',
                            content: 'يجب الإلمام بالمعارف و المعلومات الفنيه التى تساعده على انجاز العمل المكلف بأدائه على الوجه الأكمل وفقا للأصول الفنية المتعارف عليها . و على هذا يجب أن يكون ملماً بالمعارف و المعلومات الفنية الاتيه :-',
                            list: [
                                'جميع أنواع أجهزة القياس المختلفة وكيفية استخدامها وصيانتها والمحافظة عليها',
                                'معرفة محركات الديزل والبنزين ودورة الوقود و التزييت و التبريد ودوائر الكهرباء للمعدة و أجهزة نقل الحركة و دوائر الهيدروليك و الفرامل في المعدات.',
                                'معرفة مكونات الدوائر الهيدروليكية وطريقة عملها وتشخيص أعطالها.',
                                'معرفة المصطلحات التخصصية المرتبطة بالمفاهيم الميكانيكية في مجال المعدات الثقيلة.',
                                'معرفة إستراتيجية لتشخيص الأعطال الميكانيكية في منظومات ومكونات المعدة.',
                                'استخدام كتالوجات الخدمة والصيانة للأنواع المختلفة من المعدات والتعامل مع قطع غيار المعدات.',
                                'استخدام الأجهزة المختلفة في مجال المعدات لإجراء الاختبارات اللازمة على منظومات ومكونات المعدات.'
                            ]
                        },
                        {
                            id: 3,
                            title: 'المهارات الادائية',
                            content: 'يجب ان يكون قادرا على اداء العمل المكلف بأدائه وفقا للأصول الفنية المتعارف عليها و على هذا يجب ان يكون متقنا للمهارات الادائية الفنية الاتية :-',
                            list: [
                                'استخدام أجهزة القياس والعدد المختلفة لإجراء الصيانة والإصلاحات اللازمة على منظومات ومكونات المعدة.',
                                'تنفيذ الصيانة والإصلاحات البسيطة لكل من محركات الديزل والبنزين ومجموعة الفرامل الهواء والزيت ومجموعة نقل الحركة (التورك كونفرتر والترانسميشن والكرونه) والمنظومات الهيدروليكية والدوائر الكهربائية بالمعدة.',
                                'فك وتركيب الأجزاء الآتية للمعدة الهيكل السفلي للمعدات ذات الكاتينة و الطلمبات والبلوف والمواتير والبساتم الهيدروليكية',
                                'تجهيز الأجزاء والخامات لإجراء العمليات الصناعية من لحام وشنكرة والترميز والتذنيب ونشر للصاج والمواسير.',
                                'تنفيذ إجراءات وتعليمات الأمن والسلامة داخل ورش المعدات قبل الشروع في أداء أي عمل يوكل إليه.'
                            ]
                        }
                    ].map((item) => (
                        <div key={item.id} style={{
                            marginBottom: '15px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '10px',
                            overflow: 'hidden'
                        }}>
                            <button
                                onClick={() => toggleAccordion2(item.id)}
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    backgroundColor: openAccordion2 === item.id ? '#0865a8' : 'white',
                                    color: openAccordion2 === item.id ? 'white' : '#333',
                                    border: 'none',
                                    textAlign: 'right',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: '0.3s'
                                }}
                            >
                                {item.title}
                                <ChevronDown style={{
                                    transform: openAccordion2 === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: '0.3s'
                                }} />
                            </button>
                            {openAccordion2 === item.id && (
                                <div style={{ padding: '25px', backgroundColor: '#f9f9f9', lineHeight: '1.8' }}>
                                    {item.content && <p style={{ marginBottom: '15px' }}>{item.content}</p>}
                                    {item.list && (
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {item.list.map((listItem, index) => (
                                                <li key={index} style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                                                    <Check style={{ color: '#0865a8', marginLeft: '10px', marginTop: '5px', flexShrink: 0 }} size={20} />
                                                    <span>{listItem}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Section 2B: Ship Hull Building (NEW) */}
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '30px',
                    color: '#f57c00',
                    textAlign: 'center'
                }}>
                    بناء هياكل السفن
                </h2>

                <div style={{ marginBottom: '60px' }}>
                    {[
                        {
                            id: 1,
                            title: 'تعريف بالمهنة',
                            content: 'فني بناء هياكل السفن هو الفني المتخصص في تنفيذ أعمال تصنيع وتجهيز وتشكيل وتجميع الهياكل المعدنية للسفن والمنشآت البحرية، من خلال قراءة الرسومات والمخططات الهندسية، وقياس وشنكرة الألواح والقطاعات المعدنية وقصها وتشكيلها، وتنفيذ أعمال التجميع واللحام والتثبيت وفقًا للمواصفات الفنية المعتمدة. كما يشارك في أعمال الفحص ومراقبة الجودة وتجهيز الأسطح ومعالجتها ضد التآكل، مع الالتزام بمتطلبات السلامة والصحة المهنية وحماية البيئة داخل الورش والترسانات البحرية.'
                        },
                        {
                            id: 2,
                            title: 'المهارات المعرفية',
                            content: 'يجب أن يكتسب الطالب المعارف الفنية اللازمة لتنفيذ أعمال تصنيع وتجميع هياكل السفن والمنشآت البحرية وفقًا للأصول الفنية والمواصفات المعتمدة، وتشمل ما يلي:',
                            list: [
                                'الرسومات والمخططات الهندسية: قراءة وتفسير الرسومات التنفيذية لهياكل السفن والمنشآت البحرية وفهم الرموز والاصطلاحات الفنية.',
                                'المواد والخامات المعدنية: التعرف على أنواع وخواص المعادن المستخدمة في بناء السفن وطرق تشكيلها وحمايتها من الصدأ والتآكل البحري.',
                                'تكنولوجيا تشغيل وتشكيل المعادن: معرفة أساليب القياس والشنكرة والقص والثني والدرفلة وتجهيز الألواح والقطاعات المعدنية.',
                                'تقنيات اللحام والقطع: الإلمام بطرق اللحام المختلفة، مثل SMAW وMIG/MAG، وتقنيات القطع الحراري بالبلازما والأوكسي أستيلين.',
                                'تجميع الهياكل البحرية وضبط الجودة: فهم مكونات بدن السفينة وأساليب التجميع والتثبيت والمحاذاة، ومبادئ فحص اللحامات والوصلات المعدنية واختبار إحكام الهياكل.',
                                'السلامة والصحة المهنية وحماية البيئة: معرفة مخاطر العمل داخل الورش والترسانات البحرية وإجراءات الوقاية والسلامة، وأساليب الحد من الفاقد والتلوث البيئي.'
                            ]
                        },
                        {
                            id: 3,
                            title: 'المهارات الأدائية',
                            content: 'يجب أن يكون الطالب قادرًا على تنفيذ الأعمال الفنية المرتبطة ببناء هياكل السفن وفقًا للرسومات والمواصفات المعتمدة، وتحت الإشراف الفني المختص، وتشمل المهارات الآتية:',
                            list: [
                                'قراءة الرسومات التنفيذية: قراءة وتفسير المخططات الهندسية وتحديد الأبعاد والمكونات وتسلسل تنفيذ أعمال بناء هياكل السفن.',
                                'القياس والشنكرة: قياس الألواح والقطاعات المعدنية وتوقيع خطوط القطع والثني والتجميع بدقة باستخدام أدوات القياس المناسبة.',
                                'تشغيل وتشكيل المعادن: استخدام المعدات والأدوات المخصصة لقص وثني وتشكيل الألواح والقطاعات المعدنية وفقًا للأبعاد المطلوبة.',
                                'تجميع هياكل السفن: تجميع الأجزاء المعدنية الرئيسية والفرعية وضبط استقامتها ومحاذاتها وتثبيتها على القزق أو تجهيزات التجميع المخصصة.',
                                'تنفيذ اللحام والفحص وضبط الجودة: تنفيذ أعمال اللحام والقطع الحراري، وفحص الوصلات والأجزاء المجمعة والتحقق من مطابقتها للمواصفات الفنية المطلوبة.',
                                'تجهيز الأسطح والسلامة المهنية: تجهيز الأسطح المعدنية للدهان والحماية من التآكل، والالتزام بإجراءات السلامة والصحة المهنية وحماية البيئة داخل الورش والترسانات البحرية.'
                            ]
                        }
                    ].map((item) => (
                        <div key={item.id} style={{
                            marginBottom: '15px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '10px',
                            overflow: 'hidden'
                        }}>
                            <button
                                onClick={() => toggleAccordion4(item.id)}
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    backgroundColor: openAccordion4 === item.id ? '#0865a8' : 'white',
                                    color: openAccordion4 === item.id ? 'white' : '#333',
                                    border: 'none',
                                    textAlign: 'right',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: '0.3s'
                                }}
                            >
                                {item.title}
                                <ChevronDown style={{
                                    transform: openAccordion4 === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: '0.3s'
                                }} />
                            </button>
                            {openAccordion4 === item.id && (
                                <div style={{ padding: '25px', backgroundColor: '#f9f9f9', lineHeight: '1.8' }}>
                                    {item.content && <p style={{ marginBottom: '15px' }}>{item.content}</p>}
                                    {item.list && (
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {item.list.map((listItem, index) => (
                                                <li key={index} style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start' }}>
                                                    <Check style={{ color: '#0865a8', marginLeft: '10px', marginTop: '5px', flexShrink: 0 }} size={20} />
                                                    <span>{listItem}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Section 3: Application Details */}
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '30px',
                    color: '#f57c00',
                    textAlign: 'center'
                }}>
                    التقديم بمدرسة المقاولون العرب الثانوية الفنية للتعليم والتدريب المزدوج لحاملي الإعدادية
                </h2>

                <div style={{ marginBottom: '60px' }}>
                    {[
                        {
                            id: 1,
                            title: 'عنوان مدرسة المقاولون العرب الثانوية الفنية للتعليم والتدريب المزدوج',
                            content: 'العنوان: ١٠ شارع ٦ أكتوبر – ترعة الاسماعيلية – شبرا الخيمة – القليوبية (بجوار ادارة المصانع و الورش المركزية)'
                        },
                        {
                            id: 2,
                            title: 'شروط التقدم للمدرسة',
                            list: [
                                'أن يكون الطالب حاصلًا على الشهادة الإعدادية من إحدى مدارس محافظة القليوبية في سنة التقدم للالتحاق بالمدرسة.',
                                'أن يحقق الطالب الحد الأدنى لمجموع الدرجات، والذي يُعلن عنه مع بداية فترة التقديم.',
                                'ألا يزيد سن الطالب على ١٨ عامًا في بداية العام الدراسي الجديد، مع إعطاء الأفضلية للأصغر سنًا.',
                                'اجتياز اختبارات القبول والكشف الطبي والمقابلة الشخصية التي تُجرى بمقر الشركة.',
                                'يُعد القبول مبدئيًا لحين تقديم أصول المستندات المطلوبة، مع تقديم إقرار من ولي الأمر بعدم قيد الطالب بمدرسة أخرى.',
                                'تُحدد مواعيد اختبارات القبول والمقابلات الشخصية ويُعلن عنها تباعًا.'
                            ]
                        },
                        {
                            id: 3,
                            title: 'المستندات المطلوبة',
                            list: [
                                'ملف التقديم من وزاره التربيه و التعليم و التعليم الفنى .',
                                'صور من استمارة النجاح بالشهادة الاعدادية.',
                                'صورة شهادة الميلاد.',
                                'صورة بطاقة الرقم القومي لولى الأمر.',
                                'عدد (4) صور شخصية للطالب.',
                                'استيفاء نموذج طلب التقديم المعد لذلك بمقر المدرسة بشركة المقاولون العرب.'
                            ]
                        },
                        {
                            id: 4,
                            title: 'مميزات المدرسة',
                            list: [
                                'التدريب العملي والتطبيقي: ٨٠% بالمصنع و٢٠% بالمدرسة، بما يضمن اكتساب الطلاب المهارات الفنية والمهنية اللازمة.',
                                'شهادة خبرة معتمدة من شركة المقاولون العرب.',
                                'توفير الزي المدرسي للطلاب.',
                                'تأمين طبي للطلاب.',
                                'توفير وجبات غذائية خلال اليوم الدراسي.',
                                'مصروف جيب يومي وفقًا للصف الدراسي.',
                                'ممارسة الأنشطة الرياضية بنادي المقاولون العرب الرياضي.'
                            ]
                        }
                    ].map((item) => (
                        <div key={item.id} style={{
                            marginBottom: '15px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '10px',
                            overflow: 'hidden'
                        }}>
                            <button
                                onClick={() => toggleAccordion3(item.id)}
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    backgroundColor: openAccordion3 === item.id ? '#f57c00' : 'white',
                                    color: openAccordion3 === item.id ? 'white' : '#333',
                                    border: 'none',
                                    textAlign: 'right',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: '0.3s'
                                }}
                            >
                                {item.title}
                                <ChevronDown
                                    style={{
                                        transform:
                                            openAccordion3 === item.id
                                                ? 'rotate(180deg)'
                                                : 'rotate(0deg)',
                                        transition: '0.3s'
                                    }}
                                />
                            </button>

                            {openAccordion3 === item.id && (
                                <div
                                    style={{
                                        padding: '25px',
                                        backgroundColor: '#f9f9f9',
                                        lineHeight: '1.8'
                                    }}
                                >
                                    {item.content && (
                                        <p style={{ marginBottom: '15px' }}>{item.content}</p>
                                    )}

                                    {item.list && (
                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                            {item.list.map((listItem, index) => (
                                                <li
                                                    key={index}
                                                    style={{
                                                        marginBottom: '15px',
                                                        display: 'flex',
                                                        alignItems: 'flex-start'
                                                    }}
                                                >
                                                    <Check
                                                        size={20}
                                                        style={{
                                                            color: '#f57c00',
                                                            marginLeft: '10px',
                                                            marginTop: '5px',
                                                            flexShrink: 0
                                                        }}
                                                    />
                                                    <span>{listItem}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}