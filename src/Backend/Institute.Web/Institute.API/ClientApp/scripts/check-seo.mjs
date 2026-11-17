// @ts-nocheck
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * @param {string} dir
 * @returns {string[]}
 */
const walk = (dir) =>
    readdirSync(dir).flatMap((f) => {
        const p = join(dir, f);
        return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
    });

for (const file of walk('dist')) {
    const html = readFileSync(file, 'utf8');

    /** @param {RegExp} re */
    const count = (re) => (html.match(re) || []).length;

    const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
    const generic = /تفاصيل الدورة التدريبية \||^خبر \|/.test(title || '');

    console.log(
        `${file}\n  h1:${count(/<h1[\s>]/g)}  h2:${count(/<h2[\s>]/g)}  links:${count(/<a\s[^>]*href=/g)}  canonical:${/rel="canonical"/.test(html)}${generic ? '  ⚠ GENERIC TITLE' : ''}\n  title: ${title}`
    );
}