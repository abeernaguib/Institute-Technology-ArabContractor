import { useLocation } from 'react-router-dom';
import Seo from '../components/Seo';

const SITE_NAME = 'المعهد التكنولوجي لهندسة التشييد والإدارة';

// pages that must NOT appear in Google
const PRIVATE = ['/admin', '/mohadren', '/cart', '/checkout', '/payment', '/my-courses', '/search'];

// last-resort title for any URL not matched below
const FALLBACK = {
    title: `${SITE_NAME} | دورات تدريبية معتمدة`,
    description: 'دورات تدريبية معتمدة في إدارة المشروعات والتشييد، تدريب أونلاين وفي الموقع، وشهادات معتمدة.',
};

// ─── Static public pages ─────────────────────────────────────────────────────
const PAGES = {
    '/': {
        title: 'المعهد التكنولوجي لهندسة التشييد والإدارة',
        description: 'المعهد التكنولوجي لهندسة التشييد والإدارة بالمقاولون العرب: دورات تدريبية معتمدة في التشييد وإدارة المشروعات، تدريب أونلاين وفي الموقع، منذ 1978.',
    },
    '/overview': {
        title: `نبذة عن ${SITE_NAME}`,
        description: 'أول معهد تدريب تُنشئه شركة مقاولات في الشرق الأوسط، يخدم الوزارات والهيئات والقطاع الخاص بمعايير الجودة الدولية.',
    },
    '/mission': {
        title: 'الرؤية والرسالة والأهداف | المعهد التكنولوجي',
        description: 'رؤية ورسالة وأهداف المعهد التكنولوجي في التعليم والتدريب الهندسي والمهني محليًا وإقليميًا.',
    },
    '/news': {
        title: `أخبار ${SITE_NAME}`,
        description: 'آخر أخبار وأنشطة وفعاليات المعهد التكنولوجي لهندسة التشييد والإدارة.',
    },
    '/library': {
        title: 'مكتبة المعهد التكنولوجي | مراجع التشييد والإدارة',
        description: 'مكتبة متخصصة في العلوم الهندسية والإدارية مع قواعد بيانات رقمية، وبروتوكول سفارة المعرفة مع مكتبة الإسكندرية.',
    },
    '/customers': {
        title: 'عملاؤنا | المعهد التكنولوجي',
        description: 'الجهات والشركات والهيئات التي استفادت من البرامج التدريبية للمعهد التكنولوجي لهندسة التشييد والإدارة.',
    },
    '/certifications': {
        title: 'الشهادات والاعتمادات | المعهد التكنولوجي',
        description: 'اعتمادات المعهد: المعهد القومي للجودة، ISO 9001:2015، معهد إدارة المشروعات PMI، ومركز تدريب معتمد من Autodesk.',
    },
    '/team': {
        title: 'فريق العمل | المعهد التكنولوجي',
        description: 'تعرف على فريق عمل المعهد التكنولوجي لهندسة التشييد والإدارة.',
    },
    '/instructors': {
        title: 'قائمة المحاضرين | المعهد التكنولوجي',
        description: 'المحاضرون والمدربون بالمعهد التكنولوجي لهندسة التشييد والإدارة وخبراتهم.',
    },
    '/future-leaders': {
        title: 'مجلس قادة المستقبل | المعهد التكنولوجي',
        description: 'مجلس قادة المستقبل بالمعهد التكنولوجي لهندسة التشييد والإدارة وبرامجه.',
    },
    '/protocols': {
        title: 'البروتوكولات والاتفاقيات | المعهد التكنولوجي',
        description: 'بروتوكولات التعاون بين المعهد التكنولوجي ومؤسسات وهيئات محلية ودولية لتعزيز جودة التدريب.',
    },
    '/contact': {
        title: `اتصل بنا | ${SITE_NAME}`,
        description: 'تواصل مع المعهد التكنولوجي للاستفسار عن الدورات التدريبية والتسجيل والعناوين.',
    },
    '/gallery': {
        title: 'مكتبة الصور والفيديوهات | المعهد التكنولوجي',
        description: 'صور وفيديوهات من الدورات والفعاليات والأنشطة التدريبية للمعهد التكنولوجي.',
    },
    '/vocational-training': {
        title: 'التدريب الحرفي | المعهد التكنولوجي',
        description: 'برامج التدريب الحرفي بمراكز جسر السويس وشبرا لبناء المهارات الحرفية وتأهيل الكوادر المتخصصة.',
    },
    '/gesr-el-suez': {
        title: 'مركز تدريب جسر السويس | المعهد التكنولوجي',
        description: 'مركز تدريب جسر السويس للتدريب الحرفي التابع للمعهد التكنولوجي لهندسة التشييد والإدارة.',
    },
    '/shobra': {
        title: 'مركز تدريب شبرا | المعهد التكنولوجي',
        description: 'ورش ومركز تدريب شبرا للتدريب الميكانيكي والكهربائي وتأهيل الكوادر الهندسية.',
    },
    '/online-training': {
        title: 'التدريب الأونلاين (عن بُعد) | المعهد التكنولوجي',
        description: 'برامج تدريبية مباشرة عبر Microsoft Teams: إدارة المشاريع PMP، القيادة التنفيذية، عقود الفيديك، السلامة والجودة، بشهادة معتمدة.',
    },
    '/Technical_Schools': {
        title: 'مدرسة المقاولون العرب الفنية',
        description: 'مدرسة فنية تابعة لشركة المقاولون العرب لإعداد كوادر مهنية مؤهلة في الهندسة والحرف الصناعية.',
    },
    '/technical-education': {
        title: 'تطوير التعليم الفني | المعهد التكنولوجي',
        description: 'بروتوكول التعاون مع وزارة التربية والتعليم لتأهيل طلاب الثانويات الصناعية عمليًا في ورش ومراكز المعهد.',
    },
    '/training-methods': {
        title: 'أساليب التدريب | المعهد التكنولوجي',
        description: 'أساليب وخدمات التدريب بالمعهد: داخل المعهد، في موقع العمل، وعن بُعد.',
    },
    '/onsite-training': {
        title: 'التدريب في موقع العمل | المعهد التكنولوجي',
        description: 'تدريب ميداني احترافي في موقع العمل للشركات والجهات.',
    },
    '/cea-program': {
        title: 'برنامج إعداد مهندس مكتب فني | المعهد التكنولوجي',
        description: 'برنامج CEA لإعداد مهندس المكتب الفني بالمعهد التكنولوجي لهندسة التشييد والإدارة.',
    },
    '/tests': {
        title: 'الاختبارات والتقييم | المعهد التكنولوجي',
        description: 'اختبارات سيكومترية وتقييمات تخصصية في اللغة والحاسب والهندسة.',
    },

    // ─── Private pages (still get a title for the browser tab; they are noindex) ───
    '/search': { title: `نتائج البحث | ${SITE_NAME}`, description: 'نتائج البحث عن الدورات التدريبية.' },
    '/cart': { title: `سلة المشتريات | ${SITE_NAME}`, description: 'سلة الدورات التدريبية.' },
    '/checkout': { title: `إتمام الدفع | ${SITE_NAME}`, description: 'إتمام تسجيل الدورات التدريبية.' },
    '/payment/result': { title: `نتيجة الدفع | ${SITE_NAME}`, description: 'نتيجة عملية الدفع.' },
    '/my-courses': { title: `دوراتي | ${SITE_NAME}`, description: 'الدورات التدريبية المسجلة.' },
    '/admin': { title: `لوحة التحكم | ${SITE_NAME}`, description: 'لوحة التحكم.' },
    '/mohadren': { title: `إدارة المحاضرين | ${SITE_NAME}`, description: 'إدارة المحاضرين.' },
    '/admin/news': { title: `إدارة الأخبار | ${SITE_NAME}`, description: 'إدارة الأخبار.' },
    '/admin/books': { title: `إدارة الكتب | ${SITE_NAME}`, description: 'إدارة الكتب.' },
    '/admin/planwork': { title: `إدارة الخطة التدريبية | ${SITE_NAME}`, description: 'إدارة الخطة التدريبية.' },
};

// lowercase lookup, because react-router matches URLs without caring about case
const PAGES_LOWER = Object.fromEntries(
    Object.entries(PAGES).map(([key, value]) => [key.toLowerCase(), value])
);

// ─── Dynamic pages (the URL contains a slug or id) ───────────────────────────
// Read the readable part of the slug, e.g. /course/إدارة-المشروعات -> "إدارة المشروعات".
// Only used when the slug contains Arabic letters; otherwise we use the generic title.
function nameFromSlug(path, prefix) {
    const raw = path.slice(prefix.length).split('/')[0];
    let text = raw;
    try { text = decodeURIComponent(raw); } catch { /* keep raw */ }
    text = text.replace(/-/g, ' ').trim().slice(0, 60);
    return /[\u0600-\u06FF]/.test(text) ? text : '';
}

const DYNAMIC = [
    {
        prefix: '/course/',
        build: (path) => {
            const name = nameFromSlug(path, '/course/');
            return {
                title: name ? `${name} | ${SITE_NAME}` : `تفاصيل الدورة التدريبية | ${SITE_NAME}`,
                description: name
                    ? `تفاصيل دورة ${name}: المحتوى والمواعيد والتكلفة وإمكانية التسجيل بالمعهد التكنولوجي لهندسة التشييد والإدارة.`
                    : 'تفاصيل الدورة التدريبية ومواعيدها وتكلفتها وإمكانية التسجيل بالمعهد التكنولوجي لهندسة التشييد والإدارة.',
            };
        },
    },
    {
        prefix: '/courses/',
        build: (path) => {
            const name = nameFromSlug(path, '/courses/');
            return {
                title: name ? `دورات ${name} | ${SITE_NAME}` : `الدورات التدريبية | ${SITE_NAME}`,
                description: name
                    ? `استعرض دورات ${name} المتاحة بالمعهد التكنولوجي لهندسة التشييد والإدارة وسجّل الآن.`
                    : 'استعرض الدورات التدريبية المتاحة بالمعهد التكنولوجي لهندسة التشييد والإدارة وسجّل الآن.',
            };
        },
    },
    {
        prefix: '/news/',
        build: () => ({
            title: `خبر | أخبار ${SITE_NAME}`,
            description: 'تفاصيل خبر من أخبار وأنشطة المعهد التكنولوجي لهندسة التشييد والإدارة.',
        }),
    },
];

export default function RouteSeo() {
    const { pathname } = useLocation();
    const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : '/';
    const isPrivate = PRIVATE.some(p => clean === p || clean.startsWith(p + '/'));

    const dynamic = DYNAMIC.find(d => clean.startsWith(d.prefix));
    const page =
        PAGES_LOWER[clean.toLowerCase()] ||
        (dynamic ? dynamic.build(clean) : null) ||
        FALLBACK;

    return <Seo title={page.title} description={page.description} noindex={isPrivate} />;
}