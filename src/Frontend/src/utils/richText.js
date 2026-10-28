// src/utils/richText.js

// Must match what the admin does before saving (avoids the WAF 403 on HTML bodies)
export function encodeRichText(html) {
    if (!html) return html;
    try {
        return btoa(unescape(encodeURIComponent(html)));
    } catch {
        return html;
    }
}

export function decodeRichText(value) {
    if (!value) return value;
    let v = String(value).trim();
    if (!/^[A-Za-z0-9+/]+={0,2}$/.test(v)) return value;   // plain HTML/text -> leave as is
    if (v.length % 4 === 1) return value;
    while (v.length % 4 !== 0) v += '=';
    try {
        const decoded = decodeURIComponent(escape(atob(v)));
        if (/[\u0000-\u0008\u000E-\u001F]/.test(decoded)) return value;
        return decoded;
    } catch {
        return value;
    }
}

// true for '', '<div><br></div>', '&nbsp;' ... (nothing readable)
export function isBlankHtml(html) {
    if (!html) return true;
    const body = new DOMParser().parseFromString(html, 'text/html').body;
    return body.textContent.replace(/\u00a0/g, ' ').trim() === '';
}

// HTML -> [{ title, items[] }]
export function parseHTMLContent(htmlString) {
    if (!htmlString) return [];
    const div = new DOMParser().parseFromString(htmlString, 'text/html').body;
    const sections = [];
    let current = { title: null, items: [] };

    const hasH5 = div.querySelector('h5') !== null;
    const hasP = div.querySelector('p') !== null;
    const hasLi = div.querySelector('li') !== null;

    if (hasH5 || hasP) {
        const ownText = (node) => {
            const c = node.cloneNode(true);
            c.querySelectorAll('p').forEach(p => p.remove());
            return c.textContent.trim();
        };
        const hasTextP = Array.from(div.querySelectorAll('p')).some(p => p.textContent.trim());

        div.querySelectorAll('h5, p').forEach((node) => {
            if (node.tagName === 'H5') {
                const text = ownText(node);
                if (!text) return;
                if (!hasTextP) { current.items.push(text); return; }
                if (current.title !== null || current.items.length > 0) sections.push(current);
                current = { title: text, items: [] };
            } else {
                const text = node.textContent.trim();
                if (text) current.items.push(text);
            }
        });
        if (current.title !== null || current.items.length > 0) sections.push(current);
        return sections;
    }

    if (hasLi) {
        const items = Array.from(div.querySelectorAll('li')).map(li => li.textContent.trim()).filter(Boolean);
        return items.length ? [{ title: null, items }] : [];
    }

    const leafDivs = Array.from(div.querySelectorAll('div')).filter(d => !d.querySelector('div'));
    if (leafDivs.length > 0) {
        const items = leafDivs.map(d => d.textContent.trim()).filter(Boolean);
        return items.length ? [{ title: null, items }] : [];
    }

    const lines = htmlString.replace(/<[^>]+>/g, '\n').split('\n').map(l => l.trim()).filter(Boolean);
    return lines.length ? [{ title: null, items: lines }] : [];
}