import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer'

const API = 'https://icemt.arabcont.com/api';

// Cap on prerendered news pages (newest first), to keep build time sane
const MAX_NEWS = 200;

const STATIC_ROUTES = [
    '/', '/overview', '/mission', '/news', '/library', '/customers',
    '/certifications', '/team', '/instructors', '/future-leaders',
    '/protocols', '/contact', '/gallery', '/vocational-training',
    '/gesr-el-suez', '/shobra', '/online-training', '/Technical_Schools',
    '/technical-education', '/training-methods', '/onsite-training',
    '/cea-program', '/tests',
];

async function getJson(url) {
    try {
        const r = await fetch(url);
        if (!r.ok) return null;
        return await r.json();
    } catch {
        return null;
    }
}

// Run an async function over a list, a few at a time
async function mapInBatches(items, size, fn) {
    const out = [];
    for (let i = 0; i < items.length; i += size) {
        out.push(...await Promise.all(items.slice(i, i + size).map(fn)));
    }
    return out;
}

// Same tree the Navbar uses: collect every category slug (root excluded)
function collectSlugs(nodes, set) {
    (nodes || []).forEach(n => {
        if (n.slug) set.add(n.slug);
        if (n.children) collectSlugs(n.children, set);
    });
}

// Returns { programRoutes: ['/courses/..'], courseRoutes: ['/course/..'] }
async function getCategoryAndCourseRoutes() {
    const tree = await getJson(`${API}/Categories/tree`);
    const slugs = new Set();
    if (Array.isArray(tree) && tree[0]?.children) collectSlugs(tree[0].children, slugs);

    const programRoutes = [];
    const courseSlugs = new Set();

    await mapInBatches([...slugs], 5, async (slug) => {
        const data = await getJson(`${API}/course/programs/${encodeURIComponent(slug)}/courses`);
        if (!data) return; // not a real /courses/ page, skip it
        programRoutes.push(`/courses/${slug}`);
        const list = Array.isArray(data) ? data : (data.courses || data.data || []);
        list.forEach(c => { if (c.slug) courseSlugs.add(c.slug); });
    });

    // also pick up anything in the latest list
    const latest = await getJson(`${API}/course/latest`);
    if (Array.isArray(latest)) {
        latest.forEach(c => { const s = c.slug ?? c.Slug; if (s) courseSlugs.add(s); });
    }

    return {
        programRoutes,
        courseRoutes: [...courseSlugs].map(s => `/course/${s}`),
    };
}

async function getNewsRoutes() {
    const years = await getJson(`${API}/News/years`);
    if (!Array.isArray(years)) return [];
    const ids = [];
    for (const year of [...years].sort((a, b) => Number(b) - Number(a))) {
        const first = await getJson(`${API}/News/getAllNews?year=${year}&pageIndex=1`);
        if (!first) continue;
        ids.push(...(first.data || []).map(n => n.id));
        for (let p = 2; p <= (first.totalPages ?? 1); p++) {
            const res = await getJson(`${API}/News/getAllNews?year=${year}&pageIndex=${p}`);
            ids.push(...((res && res.data) || []).map(n => n.id));
        }
        if (ids.length >= MAX_NEWS) break;
    }
    return [...new Set(ids)].slice(0, MAX_NEWS).map(id => `/news/${id}`);
}

export default defineConfig(async ({ command }) => {
    // Only call the API when building, not on `npm run dev`
    let dynamicRoutes = [];
    if (command === 'build') {
        const { programRoutes, courseRoutes } = await getCategoryAndCourseRoutes();
        const newsRoutes = await getNewsRoutes();
        dynamicRoutes = [...programRoutes, ...courseRoutes, ...newsRoutes];
        console.log(`[prerender] programs:${programRoutes.length} courses:${courseRoutes.length} news:${newsRoutes.length}`);
    }

    return {
        plugins: [
            react(),
            // After the build, a robot browser visits each route and saves the final HTML
            prerender({
                routes: [...STATIC_ROUTES, ...dynamicRoutes],
                renderer: new PuppeteerRenderer({
                    // the robot saves the page when Seo.jsx fires this event
                    renderAfterDocumentEvent: 'render-event',
                    maxConcurrentRoutes: 1,
                    launchOptions: {
                        headless: true,
                        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
                        // desktop-size window so the full desktop Navbar is rendered
                        defaultViewport: { width: 1440, height: 900 },
                    },
                }),
            }),
        ],
        server: {
            port: 5173,
            strictPort: false
        },
        optimizeDeps: {
            include: [
                '@mui/material',
                '@mui/icons-material',
                '@emotion/react',
                '@emotion/styled',
                '@clerk/clerk-react'
            ],
            exclude: [
                'exceljs',
                'xlsx',
                'jspdf',
                'jspdf-autotable',
                'docx'
            ]
        },
        build: {
            chunkSizeWarningLimit: 1000,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (
                            id.includes('exceljs') ||
                            id.includes('xlsx') ||
                            id.includes('jspdf') ||
                            id.includes('jspdf-autotable') ||
                            id.includes('docx') ||
                            id.includes('jszip')
                        ) {
                            return 'vendor-export';
                        }
                        if (id.includes('recharts') || id.includes('d3-') || id.includes('victory')) {
                            return 'vendor-charts';
                        }
                        if (id.includes('framer-motion')) {
                            return 'vendor-framer';
                        }
                        if (id.includes('lucide-react') || id.includes('react-icons')) {
                            return 'vendor-icons';
                        }
                        if (id.includes('@clerk')) {
                            return 'vendor-clerk';
                        }
                        if (id.includes('gsap') || id.includes('swiper')) {
                            return 'vendor-animation';
                        }
                        if (id.includes('@mui')) {
                            return 'vendor-mui';
                        }
                        if (id.includes('node_modules')) {
                            return 'vendor-core';
                        }
                    }
                }
            }
        }
    }
})