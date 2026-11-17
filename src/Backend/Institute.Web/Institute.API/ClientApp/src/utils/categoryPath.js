const API_BASE = 'https://icemt.arabcont.com/api';

let treePromise = null;
export const fetchTreeOnce = () => {
    if (!treePromise) {
        treePromise = fetch(`${API_BASE}/Categories/tree`)
            .then(r => { if (!r.ok) throw new Error('tree failed'); return r.json(); })
            .catch(e => { treePromise = null; throw e; });
    }
    return treePromise;
};

// Walks the tree and returns [{title, slug}, ...] from top category down to the matching one
const findPath = (nodes = [], slug, trail = []) => {
    for (const n of nodes) {
        const t = [...trail, { title: n.title, slug: n.slug }];
        if (n.slug === slug) return t;
        const r = findPath(n.children, slug, t);
        if (r) return r;
    }
    return null;
};

// Used by the Courses page (the URL slug is already a category slug)
export async function getCategoryTrailBySlug(slug) {
    const tree = await fetchTreeOnce();
    return findPath(tree?.[0]?.children, slug) || [];
}

// ── Used by the Course Details page ──────────────────────────────────────────
// Finds which (deepest) category a course belongs to.
const INDEX_KEY = 'courseCategoryIndex_v1';
const INDEX_TTL = 30 * 60 * 1000;
let indexPromise = null;

const buildCourseIndex = async () => {
    try {
        const c = JSON.parse(sessionStorage.getItem(INDEX_KEY) || 'null');
        if (c && Date.now() - c.t < INDEX_TTL) return c.map;
    } catch { /* ignore */ }

    const tree = await fetchTreeOnce();
    const cats = [];
    const collect = (nodes, depth) => nodes.forEach(n => {
        if (n.slug) cats.push({ slug: n.slug, depth });
        if (n.children) collect(n.children, depth + 1);
    });
    collect(tree?.[0]?.children || [], 0);

    const fetched = {};
    const queue = [...cats];
    const worker = async () => {
        while (queue.length) {
            const { slug } = queue.shift();
            try {
                const res = await fetch(`${API_BASE}/course/programs/${slug}/courses`);
                if (!res.ok) continue;
                const data = await res.json();
                fetched[slug] = (Array.isArray(data) ? data : data.courses || []).map(c => c.id);
            } catch { /* skip */ }
        }
    };
    await Promise.all(Array.from({ length: 4 }, worker));

    // deepest category wins (parents also list their children's courses)
    const map = {};
    [...cats].sort((a, b) => b.depth - a.depth).forEach(({ slug }) => {
        (fetched[slug] || []).forEach(id => { if (!(id in map)) map[id] = slug; });
    });
    try { sessionStorage.setItem(INDEX_KEY, JSON.stringify({ t: Date.now(), map })); } catch { }
    return map;
};

export async function getCategoryTrailForCourse(course) {
    if (!course) return [];
    // 1) if the course API already returns its category slug, use it directly
    let slug = course.categorySlug ?? course.programSlug ?? course.category?.slug ?? null;
    // 2) otherwise look it up
    if (!slug) {
        if (!indexPromise) indexPromise = buildCourseIndex().catch(e => { indexPromise = null; throw e; });
        const map = await indexPromise;
        slug = map[course.id] ?? null;
    }
    return slug ? getCategoryTrailBySlug(slug) : [];
}