import { useLocation } from 'react-router-dom';
import Seo from '../components/Seo';

const SITE_NAME = 'المعهد التكنولوجي لهندسة التشييد والإدارة';
const t = (title) => `${title} | ${SITE_NAME}`;

// Static routes only. Dynamic pages (/news/:id, /course/:slug, /courses/:slug,
// /category/:slug) render their own <Seo> once their data is loaded.
// If a route has no description here, Seo uses its default description.
const PAGES = {
    '/': { title: SITE_NAME },

    // About
    '/overview': { title: t('نبذة عن المعهد') },
    '/mission': { title: t('الرؤية والرسالة والأهداف') },
    '/organizational-structure': { title: t('الهيكل التنظيمي') },
    '/team': { title: t('فريق العمل') },
    '/instructors': { title: t('محاضرونا') },
    '/future-leaders': { title: t('مجلس قادة المستقبل') },
    '/protocols': { title: t('بروتوكولات التعاون') },
    '/customers': { title: t('عملاؤنا') },
    '/certifications': { title: t('الشهادات والاعتمادات') },

    // Media / info
    '/news': { title: t('الأخبار') },
    '/library': { title: t('المكتبة') },
    '/gallery': { title: t('معرض الصور') },
    '/contact': { title: t('تواصل معنا') },
    '/search': { title: t('البحث'), noindex: true },

    // Training
    '/vocational-training': { title: t('التدريب المهني') },
    '/gesr-el-suez': { title: t('مركز تدريب جسر السويس') },
    '/shobra': { title: t('مركز تدريب شبرا') },
    '/online-training': { title: t('التدريب أونلاين') },
    '/onsite-training': { title: t('التدريب في الموقع') },
    '/training-methods': { title: t('أساليب التدريب') },
    '/Technical_Schools': { title: t('المدارس الفنية') },
    '/technical-education': { title: t('التعليم الفني') },
    '/cea-program': { title: t('برنامج CEA') },
    '/tests': { title: t('الاختبارات') },

    '/pmi': {
        title: t('شريك تدريب معتمد من PMI'),
        description:
            'تدريب PMI حضوري أو أونلاين للإعداد لشهادات PMI مع دعم كامل لحجز الامتحانات الدولية.',
    },
    '/clac': {
        title: t('برامج CLAC: الجوانب التعاقدية والقانونية في صناعة التشييد والبناء'),
        description:
            'برامج إدارة العقود والمطالبات وتسوية المنازعات بالتعاون مع مركز الإدارة التعاقدية والتحكيم.',
    },

    // Private / transactional pages: keep out of search results
    '/cart': { title: t('سلة المشتريات'), noindex: true },
    '/checkout': { title: t('إتمام الشراء'), noindex: true },
    '/payment/result': { title: t('نتيجة الدفع'), noindex: true },
    '/my-courses': { title: t('دوراتي'), noindex: true },
    '/admin': { title: t('لوحة التحكم'), noindex: true },
    '/mohadren': { title: t('إدارة المحاضرين'), noindex: true },
    '/admin/news': { title: t('إدارة الأخبار'), noindex: true },
    '/admin/books': { title: t('إدارة الكتب'), noindex: true },
    '/admin/planwork': { title: t('إدارة الدورات'), noindex: true },
};

export default function RouteSeo() {
    const { pathname } = useLocation();
    const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : '/';
    const page = PAGES[clean];
    return page ? <Seo {...page} /> : null;
}