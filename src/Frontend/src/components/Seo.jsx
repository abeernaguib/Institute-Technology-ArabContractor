import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE = 'https://icemt.arabcont.com';
const SITE_NAME = 'المعهد التكنولوجي لهندسة التشييد والإدارة';
const DEFAULT_DESCRIPTION =
    'المعهد التكنولوجي لهندسة التشييد والإدارة: دورات وبرامج تدريبية متخصصة في صناعة التشييد والبناء.';
const DEFAULT_IMAGE = `${SITE}/withbackgr.jpg`;

// How long the prerender robot waits before saving the page (ms).
// Raised from 3000 so heavy lazy-loaded pages (like /pmi) finish rendering first.
const RENDER_DELAY = 5000;

// create the meta tag if it doesn't exist, otherwise update it
function setMeta(attr, key, content) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

export default function Seo({ title, description, image = DEFAULT_IMAGE, noindex = false }) {
    const { pathname } = useLocation();

    // never let a missing title/description produce "undefined"
    const finalTitle = title?.trim() || SITE_NAME;
    const finalDesc = description?.trim() || DEFAULT_DESCRIPTION;

    useEffect(() => {
        const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : '/';
        const url = SITE + clean;

        document.title = finalTitle;
        setMeta('name', 'description', finalDesc);
        setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
        setMeta('property', 'og:type', 'website');
        setMeta('property', 'og:site_name', SITE_NAME);
        setMeta('property', 'og:title', finalTitle);
        setMeta('property', 'og:description', finalDesc);
        setMeta('property', 'og:url', url);
        setMeta('property', 'og:image', image);
        setMeta('name', 'twitter:card', 'summary_large_image');
        setMeta('name', 'twitter:title', finalTitle);
        setMeta('name', 'twitter:description', finalDesc);
        setMeta('name', 'twitter:image', image);

        let link = document.head.querySelector('link[rel="canonical"]');
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }
        link.setAttribute('href', url);

        // Tell the prerender robot: "the page is ready, save it now"
        const t = setTimeout(() => document.dispatchEvent(new Event('render-event')), RENDER_DELAY);
        return () => clearTimeout(t);
    }, [finalTitle, finalDesc, image, noindex, pathname]);

    return null;
}