import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE = 'https://icemt.arabcont.com';
const DEFAULT_IMAGE = `${SITE}/withbackgr.jpg`;

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

    useEffect(() => {
        const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : '/';
        const url = SITE + clean;

        document.title = title;
        setMeta('name', 'description', description);
        setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
        setMeta('property', 'og:title', title);
        setMeta('property', 'og:description', description);
        setMeta('property', 'og:url', url);
        setMeta('property', 'og:image', image);
        setMeta('name', 'twitter:title', title);
        setMeta('name', 'twitter:description', description);
        setMeta('name', 'twitter:image', image);

        let link = document.head.querySelector('link[rel="canonical"]');
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }
        link.setAttribute('href', url);

        // Tell the prerender robot: "the page is ready, save it now"
        const t = setTimeout(() => document.dispatchEvent(new Event('render-event')), 3000);
        return () => clearTimeout(t);
    }, [title, description, image, noindex, pathname]);

    return null;
}