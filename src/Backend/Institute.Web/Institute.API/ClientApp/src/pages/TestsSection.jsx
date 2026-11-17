import React, { useState } from 'react';
import CategoryBreadcrumb from '../components/CategoryBreadcrumb';

export default function ICMETTests() {
    const [selectedImg, setSelectedImg] = useState(null);

    const heroParagraphs = [
        'أنشأ المعهد التكنولوجي للهندسة والتشييد والإدارة ICEMT قسم الاختبارات منذ 2013 ليكون أحد أهم الأدوات العلمية التي تعتمد عليها الشركة في اتخاذ القرارات المتعلقة بالموارد البشرية، حيث يوفر بيانات موضوعية ودقيقة تساعد متخذي القرار على اختيار أفضل العناصر البشرية، وتوجيهها إلى الوظائف التي تتوافق مع قدراتها وإمكاناتها، بما يحقق أعلى مستويات الكفاءة والفاعلية.',
        'ويمتلك قسم الاختبارات خبرة في تصميم وإدارة وتنفيذ الاختبارات الإلكترونية، سواء للعاملين داخل شركة المقاولون العرب AC أو للعملاء من الجهات الخارجية، مستنداً إلى أساليب علمية ومعايير مهنية تضمن العدالة والموضوعية والدقة في القياس، مع الاعتماد الكامل على أنظمة إلكترونية تقوم بتصحيح الاختبارات واستخراج النتائج بصورة آلية دون تدخل بشري، الأمر الذي يحقق السرعة والشفافية ويقضي على احتمالات التحيز.',
        'يقدّم القسم منظومة متكاملة من الاختبارات تغطي ثلاثة محاور رئيسة، تتكامل فيما بينها لتشكّل صورة شاملة عن قدرات الفرد ومؤهلاته، وذلك للعاملين بالشركة وكذلك للعملاء من خارجها على حدٍّ سواء.'
    ];

    // Vision & mission
    const visionMission = [
        {
            title: 'رؤية القسم',
            icon: '👁️',
            text: 'أن نكون المرجعية العلمية الأولى داخل شركة المقاولون العرب AC في تقييم الكفاءات البشرية، عبر منظومة اختبارات رقمية متطورة تُسهم في بناء بيئة عمل تقوم على الجدارة والكفاءة، وتُمكّن الشركة من اتخاذ قراراتها المتعلقة بمواردها البشرية على أسس علمية راسخة.'
        },
        {
            title: 'رسالة القسم',
            icon: '🎯',
            text: 'تقديم خدمات تقييم شاملة ودقيقة وموضوعية للعاملين بالشركة وللعملاء من خارجها، تغطي الجوانب الفنية والحاسب الآلي واللغوية والسيكومترية والمعرفية، باستخدام أدوات قياس علمية معتمدة، وتقنيات آلية تضمن الحياد الكامل واستخراج النتائج دون أي تدخل بشري، بما يعزز الثقة في مخرجات القسم ويرسّخ مكانته كشريك استراتيجي في قرارات اختيار وتطوير الموارد البشرية.'
        }
    ];

    // Assessment axes
    const axes = [
        {
            title: 'التقييمات الفنية',
            icon: '🛠️',
            desc: 'تقييم المعارف والمهارات الفنية المتخصصة المرتبطة بطبيعة الوظيفة.',
            goal: 'التحقق من الكفاءة العملية والتخصصية للمرشح أو الموظف طبقاً للوصف الوظيفي لكل وظيفة.'
        },
        {
            title: 'الحاسب الآلي واللغات',
            icon: '💻',
            desc: 'تقييم مهارات استخدام الحاسب الآلي، وتحديد مستوى إجادة اللغتين الإنجليزية والفرنسية.',
            goal: 'قياس الجاهزية للتعامل مع أدوات العمل الرقمية والتواصل بلغات متعددة.'
        },
        {
            title: 'القياسات السيكومترية',
            icon: '🧠',
            desc: 'قياسات الشخصية والذكاء وتحديد السمات السلوكية للفرد.',
            goal: 'الكشف عن الفروق الشخصية بين الأفراد أو بين الجماعات الإنسانية وتحديد نوعيتها، والكشف عن نقاط القوة والضعف لدى الممتحن.'
        }
    ];

    // Objectives
    const objectives = [
        'تحسين وتطوير الاختبارات المقدَّمة من المعهد للعملاء الداخليين والخارجيين بصورة مستمرة، بما يواكب أحدث المعايير العالمية في القياس والتقييم، ويلبي التطورات المتلاحقة في متطلبات سوق العمل.',
        'تطوير نماذج الاختبارات المقدَّمة للعملاء، من حيث المحتوى والشكل وآلية العرض، بما يضمن قياساً أدق للمعارف والمهارات، ويحقق تجربة اختبار سلسة وموثوقة للمتقدمين.',
        'تطوير وتحديث قاعدة بيانات كاملة وشاملة للمرشحين للاختبارات، توثّق نتائجهم وتاريخهم التقييمي، وتتيح تحليل الاتجاهات والمقارنات، وتشكّل ذاكرة مؤسسية يُستند إليها في القرارات المستقبلية.',
        'رفع كفاءة أدوات القياس النفسي والشخصي بما يضمن تقييماً متكاملاً لا يقتصر على الجانب المعرفي، بل يمتد إلى السمات السلوكية والقدرات الكامنة لدى الأفراد.',
        'ترسيخ ثقافة الشفافية والحياد في جميع مراحل التقييم، بدءاً من إعداد الاختبار وانتهاءً باستخراج النتيجة النهائية آلياً دون أي تدخل بشري.',
        'بناء بنوك أسئلة متخصصة تغطي مختلف التخصصات والمستويات الوظيفية.',
        'تقديم تقارير تحليلية تدعم متخذي القرار في جميع مراحل إدارة الموارد البشرية.'
    ];

    // Vital role
    const roleItems = [
        'تقييم مدى توافق المرشح مع متطلبات الوظيفة.',
        'قياس الكفاءة الفنية بصورة موضوعية.',
        'تحديد نقاط القوة وفرص التطوير لكل مرشح.',
        'دعم قرارات التعيين والترقية والنقل والتكليف.',
        'تقليل مخاطر الاختيار غير المناسب.',
        'رفع جودة رأس المال البشري داخل المؤسسة.',
        'تحقيق العدالة وتكافؤ الفرص بين جميع المتقدمين.'
    ];

    // Remaining sections
    const news = [
        {
            title: 'التصحيح الآلي',
            text: 'وتُجرى هذه الاختبارات جميعها إلكترونياً عبر منظومة آلية متكاملة، تتولى استخراج النتائج آلياً فور الانتهاء من الاختبار، دون أي تدخل بشري في عملية التصحيح أو التقدير، الأمر الذي يرفع من مستوى الحياد والموضوعية، ويقطع الطريق أمام أي تحيّز أو اجتهاد شخصي قد يشوب عملية التقييم.'
        },
        {
            title: 'كيف تُجرى اختبارات السيكومترى؟',
            text: 'هذه الاختبارات تأخذ شكلاً رقمياً وهو ما يسهل دمجها ضمن عملية التوظيف، وتُستخدم كطريقة عملية لفحص وفرز وتصفية عدد كبير من المرشحين في بداية عملية التوظيف. وبالتالي تخفف هذه الاختبارات عبء العمل على مدير التوظيف لأنها تساعد في تحديد العدد الأقل من المرشحين المتمتعين بالمواصفات النفسية المطلوبة لشغل الوظيفة، لتسهل عملية الاختيار. ويتم عمل القياسات الشخصية والذكاءات لتحديد بعض ملامح وقدرات الشخصية، لأخذها في الاعتبار في تحديد الوظيفة المناسبة للمرشح لشغلها. نسبة الذكاء IQ هي الدرجة الكلية المشتقة من عدة اختبارات قياسية مصممة لقياس الذكاء الإنساني.'
        },
        {
            title: 'الدور الحيوي في اختيار أفضل العناصر البشرية',
            text: 'يمثل قسم الاختبارات أحد أهم الأدوات الاستراتيجية الداعمة لإدارة الموارد البشرية، حيث يعتمد على القياس العلمي بدلاً من التقديرات الشخصية والانطباعات الفردية. كما تسهم نتائج الاختبارات في بناء قاعدة معلومات دقيقة يمكن الرجوع إليها عند شغل الوظائف المستقبلية أو تكوين فرق العمل أو إعداد القيادات.'
        },
        {
            title: 'رسم المسار المهني للمرشحين من خلال القياسات',
            text: 'لا يقف دور القسم عند لحظة الاختيار الأولى، بل يمتد ليكون بوصلة توجّه المسار المهني للفرد طوال حياته الوظيفية. فمن خلال تحليل نتائج الاختبارات الفنية والمعرفية والسيكومترية مجتمعة، يمكن رسم صورة متكاملة عن نقاط القوة الكامنة لدى كل مرشح، وتحديد المسارات التي يُرجَّح أن يبرع فيها، سواء في التخصصات الفنية الدقيقة أو في الأدوار الإشرافية والقيادية. وتُستخدم هذه البيانات في وضع خطط تطوير فردية تُراعي الفروق بين الأفراد، وتحديد الاحتياجات التدريبية اللازمة لسد الفجوات المعرفية أو المهارية، وتوجيه كل موظف نحو المسار الذي يحقق أعلى مستويات الإنتاجية والرضا الوظيفي معاً، بما يخدم مصلحة الفرد والمؤسسة في آنٍ واحد.'
        },
        {
            title: 'الكشف عن الكفاءات المؤهَّلة لتقلّد المناصب القيادية',
            text: 'تحظى القياسات السيكومترية بأهمية خاصة في هذا الإطار، إذ تتجاوز قياس المعرفة إلى سبر أغوار الشخصية؛ من قدرة على اتخاذ القرار تحت الضغط، ومهارة في التعامل مع الفرق، وذكاء انفعالي، وقدرة على التخطيط الاستراتيجي. ومن خلال دمج هذه المؤشرات مع نتائج التقييمات الفنية والمعرفية، يتمكّن القسم من تحديد الكفاءات التي تحمل بذور القيادة قبل أن تتجلى بوضوح في الممارسة العملية، فيتيح ذلك للمؤسسة بناء قاعدة بيانات استباقية بالقيادات المرشّحة للمستقبل، وإعدادها وتأهيلها في الوقت المناسب، بدلاً من الاكتفاء بالبحث عن القيادة عند الحاجة الطارئة إليها.'
        }
    ];

    // External clients
    const externalClients = [
        { name: 'وزارة الإسكان - هيئة المجتمعات العمرانية', purpose: 'مشروع المعاونين من القيادات الشابة لنواب ورؤساء الأجهزة - هيئة المجتمعات العمرانية', count: 226 },
        { name: 'شركة اليومصر', purpose: 'اختبارات تعيينات مهندسين - ماليين', count: 16 },
        { name: 'شركة دار المعمار DMC', purpose: 'اختبارات مشرفي تنفيذ - مهن حرفية', count: 51 },
        { name: 'شركة منار الخليج', purpose: 'اختبار عمالة حرفية للسفر', count: 181 },
        { name: 'شركة العربي لإلحاق العمالة المصرية بالخارج', purpose: 'اختبار عمالة حرفية للسفر', count: 655 },
        { name: 'شركة الصالحية للاستثمار والتنمية', purpose: 'اختبارات للسادة المرشحين للترقي لدرجتي مدير عام - مدير إدارة', count: 111 },
        { name: 'شركة سفر لإلحاق العمالة بالخارج', purpose: 'اختبار عمالة حرفية للسفر', count: 220 },
        { name: 'شركة العاصمة الإدارية', purpose: 'اختبارات تعيينات مهندسين - ماليين - إداريين', count: 52 },
        { name: 'شركة أحمد الشحات لإلحاق العمالة بالخارج', purpose: 'اختبار عمالة حرفية للسفر', count: 26 }
    ];

    const maxClientCount = Math.max(...externalClients.map(c => c.count));

    const testCounts = {
        period: 'الربع الأول من 2026/07/01 حتى 2026/09/30',
        inside: 414,
        outside: 224
    };

    const facilities = [
        'معامل اختبارات إلكترونية مجهزة بأجهزة حاسب حديثة ذات مواصفات مناسبة لتشغيل جميع أنظمة الاختبارات.',
        'شبكة داخلية مؤمنة لضمان سرعة الاتصال وسلامة البيانات.',
        'خادم مركزي لإدارة قواعد البيانات وحفظ نتائج الاختبارات.',
        'نظام آلي لتصحيح الاختبارات وإصدار النتائج والتقارير.',
        'قواعد بيانات مؤمنة لحفظ نتائج المرشحين.'
    ];

    return (
        <div className="rtl-layout" dir="rtl">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
                @import url('https://fonts.googleapis.com/earlyaccess/droidarabickufi.css');

                :root {
                    --primary: #0865a8;
                    --secondary: #f57c00;
                    --dark: #000000;
                    --light: #ffffff;
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    background: #ffffff;
                    color: var(--dark);
                    line-height: 1.6;
                    font-size: 16px;
                    font-family: 'Noto Kufi Arabic', sans-serif;
                }

                .rtl-layout {
                    text-align: right;
                    direction: rtl;
                    min-height: 100vh;
                    padding-top: 0;
                    font-family: 'Noto Kufi Arabic', sans-serif;
                }

                .fixed-nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    background-color: #f5f5f5;
                    border-bottom: 1px solid #d1d5db;
                    padding: 8px 16px;
                    z-index: 1000;
                    text-align: center;
                    font-size: 0.9rem;
                }

                .main-content {
                    padding-top: 130px;
                }

                .hero-section {
                    max-width: 1200px;
                    margin: 0.5rem auto 1rem auto;
                    background: #ffffff;
                    padding: 1.5rem;
                    border-radius: 24px;
                }

                .hero-title {
                    font-family: 'Noto Kufi Arabic', sans-serif;
                    font-size: clamp(1.6rem, 5vw, 2.2rem);
                    font-weight: 800;
                    color: var(--primary);
                    text-align: center;
                    margin-bottom: 1.5rem;
                    position: relative;
                    line-height: 1.3;
                }

                .hero-title::after {
                    content: '';
                    position: absolute;
                    bottom: -12px;
                    right: 50%;
                    transform: translateX(50%);
                    width: 100px;
                    height: 4px;
                    background: linear-gradient(90deg, transparent, var(--secondary), transparent);
                    border-radius: 2px;
                }

                .hero-description {
                    font-size: 1rem;
                    line-height: 1.7;
                    color: var(--dark);
                    margin-bottom: 1.2rem;
                    padding: 1.2rem;
                    background: #f9f9f9;
                    border-radius: 16px;
                    border-right: 4px solid var(--secondary);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 1.5rem;
                    margin: 2rem auto;
                    max-width: 1200px;
                    padding: 0 1.5rem;
                }

                .stats-grid.wide {
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                }

                .stat-card {
                    background: white;
                    padding: 1.2rem 0.5rem;
                    border-radius: 20px;
                    text-align: center;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
                    transition: all 0.3s ease;
                    aspect-ratio: 1/1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }

                /* text-heavy cards: no forced square ratio */
                .stat-card.text-card {
                    aspect-ratio: auto;
                    padding: 1.5rem 1.2rem;
                    justify-content: flex-start;
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(8,101,168,0.15);
                }

                .stat-icon { font-size: 2rem; color: var(--secondary); }
                .stat-title { font-size: 1rem; font-weight: 700; color: var(--dark); }
                .stat-number { font-size: 1.6rem; font-weight: 800; color: var(--primary); }
                .stat-text { font-size: 0.95rem; line-height: 1.8; color: #333; }
                .stat-goal { font-size: 0.9rem; line-height: 1.8; color: var(--primary); font-weight: 600; }

                .content-section {
                    max-width: 1200px;
                    margin: 3rem auto;
                    padding: 0 1.5rem;
                }

                .content-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                @media (max-width: 768px) {
                    .content-grid { grid-template-columns: 1fr; }
                    .image-grid { grid-template-columns: 1fr; }
                    .bar-row { flex-direction: column; align-items: stretch; gap: 0.3rem; }
                    .bar-label { flex: none; }
                }

                .content-image {
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                    cursor: pointer;
                    background: #fff;
                }

                .content-image img {
                    width: 100%;
                    height: auto;
                    display: block;
                    transition: transform 0.3s ease;
                }

                .content-image:hover img { transform: scale(1.02); }

                /* Same size for every image inside the grid */
                .image-grid .content-image {
                    aspect-ratio: 4 / 3;
                }

                .image-grid .content-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;      /* fills the box, crops the edges a little */
                    object-position: center;
                    display: block;
                    transition: transform 0.3s ease;
                }

                .list-container {
                    background: white;
                    padding: 1.2rem;
                    border-radius: 20px;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.05);
                    border: 1px solid #eee;
                }

                .custom-list { list-style: none; padding: 0; }

                .custom-list > li {
                    margin-bottom: 1.2rem;
                    padding-right: 2.2rem;
                    position: relative;
                    font-size: 1rem;
                    line-height: 1.6;
                }

                .custom-list > li::before {
                    content: '✓';
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 24px;
                    height: 24px;
                    background: var(--secondary);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                }

                .nested-list { list-style: none; margin-top: 0.8rem; padding-right: 1.2rem; }

                .nested-list li {
                    margin-bottom: 0.6rem;
                    padding-right: 1.5rem;
                    position: relative;
                    font-size: 0.95rem;
                    line-height: 1.8;
                    color: #333;
                }

                .nested-list li::before {
                    content: '◆';
                    position: absolute;
                    right: 0;
                    color: var(--primary);
                    font-size: 0.8rem;
                }

                .image-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                    margin: 2rem 0;
                }

                .large-stats-section {
                    background: var(--primary);
                    padding: 2rem 1rem;
                    margin: 3rem 0;
                    text-align: center;
                }

                .large-stats-title { font-size: 1.6rem; color: white; margin-bottom: 1rem; font-weight: 700; }

                .large-stats-row {
                    display: flex;
                    justify-content: center;
                    gap: 4rem;
                    flex-wrap: wrap;
                }

                .large-stat-icon {
                    font-size: 2.5rem;
                    color: var(--secondary);
                    animation: bounce 2s infinite;
                }

                @keyframes bounce {
                    0%,100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }

                .large-stat-number { font-size: 3.2rem; font-weight: 900; color: white; line-height: 1.2; }
                .large-stat-label { font-size: 1.3rem; color: white; font-weight: 600; }

                .news-section {
                    background: white;
                    padding: 2rem;
                    border-radius: 24px;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.08);
                    margin-top: 2rem;
                }

                .section-title { color: var(--primary); font-size: 1.6rem; font-weight: bold; margin-bottom: 1.5rem; }

                .section-text { font-size: 1rem; line-height: 1.9; margin-bottom: 1rem; }

                .news-item {
                    padding: 1rem 2.5rem 1rem 1rem;
                    margin-bottom: 1.2rem;
                    background: #fcfcfc;
                    border-radius: 16px;
                    border-right: 4px solid var(--primary);
                    position: relative;
                    line-height: 1.7;
                    font-size: 0.95rem;
                }

                .news-item::before {
                    content: '✓';
                    position: absolute;
                    right: 0.8rem;
                    top: 1rem;
                    width: 20px;
                    height: 20px;
                    background: var(--secondary);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.7rem;
                }

                .news-item h3 {
                    color: var(--primary);
                    font-size: 1.05rem;
                    margin-bottom: 0.5rem;
                }

                .bar-row {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 0.9rem;
                }

                .bar-label {
                    flex: 0 0 260px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    line-height: 1.5;
                }

                .bar-track {
                    flex: 1;
                    background: #f1f1f1;
                    border-radius: 8px;
                    overflow: hidden;
                }

                .bar-fill {
                    background: var(--primary);
                    color: white;
                    font-weight: 700;
                    font-size: 0.9rem;
                    padding: 0.4rem 0.8rem;
                    border-radius: 8px;
                    min-width: 36px;
                    transition: width 0.6s ease;
                }

                .modal-overlay {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    background: rgba(0,0,0,0.85);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    cursor: pointer;
                }

                .modal-content { max-width: 90%; max-height: 90%; position: relative; }
                .modal-content img { width: 100%; height: auto; border-radius: 12px; }
                .close-modal { position: absolute; top: -35px; left: 0; color: white; font-size: 2rem; cursor: pointer; }
            `}</style>

            {/* Breadcrumb (sits under the main navbar) */}
            <CategoryBreadcrumb items={[{ label: 'الخدمات' }, { label: 'الاختبارات' }]} />

            <div className="main-content">
                <section className="hero-section">
                    <h1 className="hero-title">الاختبارات</h1>
                    {heroParagraphs.map((p, idx) => (
                        <p key={idx} className="hero-description">{p}</p>
                    ))}
                </section>

                {/* Vision & Mission */}
                <div className="stats-grid wide">
                    {visionMission.map((item, idx) => (
                        <div key={idx} className="stat-card text-card">
                            <div className="stat-icon">{item.icon}</div>
                            <h3 className="stat-title">{item.title}</h3>
                            <p className="stat-text">{item.text}</p>
                        </div>
                    ))}
                </div>

                {/* Assessment method */}
                <h2 className="hero-title" style={{ fontSize: '1.7rem', marginTop: '2rem' }}>أسلوب التقييم</h2>

                <div className="stats-grid wide">
                    {axes.map((axis, idx) => (
                        <div key={idx} className="stat-card text-card">
                            <div className="stat-icon">{axis.icon}</div>
                            <h3 className="stat-title">{axis.title}</h3>
                            <p className="stat-text">{axis.desc}</p>
                            <p className="stat-goal">{axis.goal}</p>
                        </div>
                    ))}
                </div>

                <section className="content-section">
                    {/* Top Full-Width Image */}
                    <div className="main-banner-image" onClick={() => setSelectedImg('/images/t1.jpeg')}>
                        <img src="/images/t1.jpeg" alt="Testing facilities" />
                    </div>

                    {/* Content Container spanning full width */}
                    <div className="content-container">
                        <div className="content-text">
                            <div className="list-container">
                                <ul className="custom-list">
                                    <li>
                                        الأهداف: يسعى القسم إلى تحقيق مجموعة من الأهداف الاستراتيجية التي تصب جميعها في خدمة رسالته ورؤيته، ومن أبرزها:
                                        <ul className="nested-list">
                                            {objectives.map((obj, idx) => (
                                                <li key={idx}>{obj}</li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Image Grid */}
                    <div className="image-grid">
                        <div className="content-image" onClick={() => setSelectedImg('/images/t2.jpg')}>
                            <img src="/images/t2.jpg" alt="Testing environment" />
                        </div>
                        <div className="content-image" onClick={() => setSelectedImg('/images/t3.jpg')}>
                            <img src="/images/t3.jpg" alt="Testing sessions" />
                        </div>
                    </div>
                </section>

                {/* Big number band: founding year */}
                <section className="large-stats-section">
                    <h2 className="large-stats-title">قسم الاختبارات بالمعهد</h2>
                    <div className="large-stat-display">
                        <div className="large-stat-icon">🏛️</div>
                        <div className="large-stat-number">2013</div>
                        <div className="large-stat-label">عام تأسيس القسم</div>
                    </div>
                </section>

                {/* Vital role list */}
                <section className="content-section">
                    <div className="list-container">
                        <ul className="custom-list">
                            <li>
                                يؤدي القسم دوراً محورياً في:
                                <ul className="nested-list">
                                    {roleItems.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Remaining sections */}
                <section className="content-section">
                    <div className="news-section">
                        <h2 className="section-title">المزيد عن قسم الاختبارات</h2>
                        {news.map((item, idx) => (
                            <div key={idx} className="news-item">
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* External clients */}
                <h2 className="hero-title" style={{ fontSize: '1.7rem', marginTop: '2rem' }}>
                    العملاء الخارجيون
                </h2>
                <p className="hero-description" style={{ maxWidth: '1200px', margin: '0 auto 1rem auto' }}>
                    لم يقتصر العمل في قسم الاختبارات على العاملين بالشركة فقط، بل امتد عمل التقييمات ليشمل العملاء الخارجيين أيضاً:
                </p>

                <div className="stats-grid wide">
                    {externalClients.map((client, idx) => (
                        <div key={idx} className="stat-card text-card">
                            <div className="stat-icon">📊</div>
                            <h3 className="stat-title">{client.name}</h3>
                            <p className="stat-text">{client.purpose}</p>
                            <div className="stat-number">{client.count}</div>
                        </div>
                    ))}
                </div>

                {/* Chart */}
                <section className="content-section">
                    <div className="list-container">
                        <h2 className="section-title">أعداد المختبرين من العملاء الخارجيين</h2>
                        {externalClients.map((client, idx) => (
                            <div key={idx} className="bar-row">
                                <div className="bar-label">{client.name}</div>
                                <div className="bar-track">
                                    <div
                                        className="bar-fill"
                                        style={{ width: `${(client.count / maxClientCount) * 100}%` }}
                                    >
                                        {client.count}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Test counts */}
                <section className="large-stats-section">
                    <h2 className="large-stats-title">عداد الاختبارات</h2>
                    <p className="large-stat-label" style={{ marginBottom: '1.5rem' }}>{testCounts.period}</p>
                    <div className="large-stats-row">
                        <div className="large-stat-display">
                            <div className="large-stat-icon">🏢</div>
                            <div className="large-stat-number">{testCounts.inside}</div>
                            <div className="large-stat-label">مختبر داخل الشركة</div>
                        </div>
                        <div className="large-stat-display">
                            <div className="large-stat-icon">🤝</div>
                            <div className="large-stat-number">{testCounts.outside}</div>
                            <div className="large-stat-label">مختبر خارج الشركة</div>
                        </div>
                    </div>
                </section>

                {/* Facilities */}
                <section className="content-section">
                    <h2 className="section-title">الإمكانيات المادية للقسم</h2>
                    <div className="list-container">
                        <ul className="custom-list">
                            <li>
                                يمتلك القسم بنية تحتية متكاملة تتيح تنفيذ الاختبارات بكفاءة عالية، وتشمل:
                                <ul className="nested-list">
                                    {facilities.map((f, idx) => (
                                        <li key={idx}>{f}</li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <p className="section-text" style={{ marginTop: '1rem' }}>
                        ويبلغ عدد أجهزة الاختبارات الإلكترونية (12 جهاز)، مع إمكانية استخدام قاعة التدريب (11 جهاز) وكذلك تشغيل عدة جلسات اختبار في اليوم نفسه، بما يسمح بخدمة أعداد كبيرة من المتقدمين بكفاءة عالية.
                    </p>
                </section>
            </div>

            {selectedImg && (
                <div className="modal-overlay" onClick={() => setSelectedImg(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <span className="close-modal" onClick={() => setSelectedImg(null)}>&times;</span>
                        <img src={selectedImg} alt="Enlarged view" />
                    </div>
                </div>
            )}
        </div>
    );
}