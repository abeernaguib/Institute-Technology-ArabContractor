import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
    AppBar, Toolbar, Box, IconButton, InputBase,
    Badge, Button, Divider, Typography, Stack,
    List, ListItemButton, ListItemText, useMediaQuery, useTheme,
    Drawer, Collapse, Paper, ClickAwayListener,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Skeleton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/black.webp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HistoryIcon from '@mui/icons-material/History';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser, useAuth } from '@clerk/clerk-react';
import AuthSync from '../components/AuthSync.jsx';
import { useTranslation } from 'react-i18next';

const RECENT_SEARCHES_KEY = 'recentSearches';
const MAX_RECENT_SEARCHES = 5;
const API_BASE = 'https://icemt.arabcont.com/api';
const FONT = '"Noto Kufi Arabic",serif';

// ── Menu data ──────────────────────────────────────────────
// 1) عن المعهد
const aboutLinks = [
    { ar: 'نبذة عامة والخدمات', path: '/overview' },
    { ar: 'الرؤية والأهداف', path: '/mission' },
    { ar: 'الخطة الاستراتيجية', path: '/pdf/StrategicPlan_2024_2030.pdf' },
    { ar: 'الهيكل التنظيمي', path: '/organizational-structure' },
    { ar: 'الشهادات والاعتمادات', path: '/certifications' },
    { ar: 'فريق العمل', path: '/team' },
    { ar: 'قائمة المحاضرين', path: '/instructors' },
    { ar: 'الخطة التدريبية السنوية', path: '/pdf/ICEMT_Plan_Training.pdf' },
    { ar: 'البروتوكولات والإتفاقيات', path: '/protocols' },
    { ar: 'عملاؤنا', path: '/customers' },
];

// 3) الخدمات
const serviceLinks = [
    { ar: 'التدريب الحرفى', path: '/vocational-training' },
    { ar: 'التعليم الفنى', path: '/technical-education' },
    { ar: 'التدريب عن بعد', path: '/online-training' },
    { ar: 'الإختبارات', path: '/tests' },
    { ar: 'مجلس قادة المستقبل', path: '/future-leaders' },
];

// 5) الإعلام والميديا
const mediaLinks = [
    { ar: 'مكتبة الصور والفيديوهات', path: '/gallery' },
    { ar: 'الأخبار', path: '/news' },
    { ar: 'الأرشيف', path: '/archive' },
];

const label = (item) => item.ar;
const isPdfPath = (p) => p.endsWith('.pdf');

const navBtnSx = {
    px: 1.2, whiteSpace: 'nowrap', fontFamily: FONT,
    color: '#000', fontSize: '0.85rem',
    '&:hover': { bgcolor: 'rgba(8,101,168,0.08)', color: '#0865a8' },
};

// ── Module-level shared helpers (cached across renders and page navigations) ──
const generateSlug = (title = '') =>
    title.trim().replace(/\s+/g, '-').replace(/[^\w\u0600-\u06FF\u0660-\u0669-]/g, '').toLowerCase();

let treePromise = null;
const fetchTreeOnce = () => {
    if (!treePromise) {
        treePromise = fetch(`${API_BASE}/Categories/tree`)
            .then(r => { if (!r.ok) throw new Error('Failed to load categories'); return r.json(); })
            .catch(e => { treePromise = null; throw e; });
    }
    return treePromise;
};

const COURSES_CACHE_KEY = 'allCoursesCache_v1';
const COURSES_TTL = 30 * 60 * 1000; // 30 minutes
let coursesPromise = null;

const mapCourse = (c) => ({
    id: c.id || c.courseId,
    title: c.title || c.name || c.courseName || '',
    slug: c.slug || generateSlug(c.title || c.name || String(c.id)),
    description: c.description || '',
    category: c.categoryName || c.category || '',
    place: c.place || '',
    date: c.date || '',
    cost: c.cost,
    instructor: c.instructorName || c.instructor || '',
    image: c.imageUrl || c.image || c.thumbnail || null,
});

const getAllCoursesOnce = () => {
    if (coursesPromise) return coursesPromise;

    try {
        const cached = JSON.parse(sessionStorage.getItem(COURSES_CACHE_KEY) || 'null');
        if (cached && Date.now() - cached.t < COURSES_TTL) {
            coursesPromise = Promise.resolve(cached.data);
            return coursesPromise;
        }
    } catch { /* ignore */ }

    coursesPromise = (async () => {
        const tree = await fetchTreeOnce();
        const slugs = new Set();
        const collect = (cats) => cats.forEach(c => { if (c.slug) slugs.add(c.slug); if (c.children) collect(c.children); });
        if (tree[0]?.children) collect(tree[0].children);

        const queue = Array.from(slugs);
        const results = [];
        const worker = async () => {
            while (queue.length) {
                const slug = queue.shift();
                try {
                    const res = await fetch(`${API_BASE}/course/programs/${slug}/courses`);
                    if (!res.ok) continue;
                    const data = await res.json();
                    const list = Array.isArray(data) ? data : (data.courses || data.data || []);
                    results.push(...list.map(mapCourse));
                } catch { /* skip */ }
            }
        };
        await Promise.all(Array.from({ length: 4 }, worker)); // only 4 requests in parallel

        const unique = Array.from(new Map(results.map(c => [c.id, c])).values());
        try { sessionStorage.setItem(COURSES_CACHE_KEY, JSON.stringify({ t: Date.now(), data: unique })); } catch { }
        return unique;
    })().catch(e => { coursesPromise = null; throw e; });

    return coursesPromise;
};

// ── Programs menu: build one uniform tree (used by desktop AND mobile) ──
const topicsToNodes = (topics = []) => topics.map(tp => ({
    key: `t${tp.id}`,
    title: tp.name,
    link: tp.link,
    children: tp.subTopics?.length
        ? tp.subTopics.map(st => ({
            key: `st${st.id}`,
            title: st.name,
            link: st.link,
            children: st.subSubTopics?.length
                ? st.subSubTopics.map(sst => ({ key: `sst${sst.id}`, title: sst.name, link: sst.link }))
                : undefined,
        }))
        : undefined,
}));

const buildMenuNodes = (cats) => cats.map(cat => {
    const node = {
        key: `c${cat.id}`,
        id: cat.id,
        title: cat.title,
        link: cat.link || (cat.slug ? `/courses/${cat.slug}` : undefined),
        leaf: !cat.sub,
    };
    if (cat.sub) {
        const flat = cat.sub.length === 1 && cat.sub[0].id === cat.id + 1000;
        node.children = flat
            ? topicsToNodes(cat.sub[0].topics)
            : cat.sub.map(sub => ({
                key: `s${sub.id}`,
                title: sub.title,
                link: sub.link,
                children: sub.topics?.length ? topicsToNodes(sub.topics) : undefined,
            }));
    }
    return node;
});

// number of end programs inside a node
const countLeaves = (node) =>
    node.children?.length ? node.children.reduce((s, c) => s + countLeaves(c), 0) : 1;

// total number of nodes inside a node (used to estimate its height)
const nodeWeight = (n) =>
    1 + (n.children?.reduce((s, c) => s + nodeWeight(c), 0) || 0);

// Split groups into columns: each next group goes into the currently shortest column
const distributeToColumns = (items, cols = 2) => {
    const columns = Array.from({ length: cols }, () => ({ h: 0, items: [] }));
    items.forEach((item, idx) => {
        const target = columns.reduce((a, b) => (b.h < a.h ? b : a));
        target.items.push({ item, idx });
        target.h += nodeWeight(item) + 2; // +2 = group header and padding
    });
    return columns.map((c) => c.items);
};

// Desktop dropdown link (handles PDFs opening in a new tab)
const DropdownLink = ({ item }) => {
    const pdf = isPdfPath(item.path);
    return (
        <Link
            to={!pdf ? item.path : '#'}
            onClick={pdf ? e => { e.preventDefault(); window.open(item.path, '_blank'); } : undefined}
            className="dropdown-menu-item">
            {label(item)}
        </Link>
    );
};

// Recursive list of links used inside the desktop mega menu (shows EVERY level, full names)
const TreeLinks = ({ nodes, depth = 0 }) => nodes.map(n => {
    const Comp = n.link ? Link : 'div';
    return (
        <React.Fragment key={n.key}>
            <Comp
                {...(n.link ? { to: n.link } : {})}
                className="mega-link"
                style={{ paddingInlineStart: 8 + depth * 14, fontSize: depth ? '0.76rem' : '0.8rem' }}>
                <span className="mega-bullet" style={depth ? { opacity: 0.55 } : undefined} />
                <span>{n.title}</span>
            </Comp>
            {n.children?.length > 0 && <TreeLinks nodes={n.children} depth={depth + 1} />}
        </React.Fragment>
    );
});

// Egyptian mobile: 01 + (0/1/2/5) + 8 digits, or the international +20 form
const isValidPhone = (value) => /^(\+20|0020|0)?1[0125][0-9]{8}$/.test(value.replace(/[\s-]/g, ''));

// Copies the phone into our database (Clerk already has it). Failure is not fatal:
// /Account/sync copies it from Clerk on the user's next visit.
const savePhoneToDb = async (getToken, phone, retries = 1) => {
    try {
        const token = await getToken({ template: 'backend' });
        if (!token) return false;
        const res = await fetch(`${API_BASE}/Account/phone`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ phone }),
        });
        if (res.ok) return true;
        // 404 = the user row isn't created yet (sync still running): wait and retry once
        if (res.status === 404 && retries > 0) {
            await new Promise(r => setTimeout(r, 1500));
            return savePhoneToDb(getToken, phone, retries - 1);
        }
        return false;
    } catch (err) {
        console.error('Failed to save phone to DB:', err);
        return false;
    }
};

const PhonePage = () => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const [phone, setPhone] = useState(user?.unsafeMetadata?.phone || '');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    const handleSave = async () => {
        const cleaned = phone.replace(/[\s-]/g, '');
        if (!isValidPhone(cleaned)) {
            setError('من فضلك أدخل رقم موبايل مصري صحيح');
            return;
        }
        setSaving(true);
        setSaved(false);
        setError('');
        try {
            await user.update({
                unsafeMetadata: { ...user.unsafeMetadata, phone: cleaned },
            });
            await savePhoneToDb(getToken, cleaned);
            setSaved(true);
        } catch (err) {
            console.error('Failed to save phone:', err);
            setError('حصلت مشكلة أثناء الحفظ، حاول تاني');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Box dir="rtl" sx={{ p: 1 }}>
            <Typography sx={{ fontFamily: '"Noto Kufi Arabic",serif', fontWeight: 'bold', mb: 2 }}>
                phone number
            </Typography>
            <InputBase
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setSaved(false); setError(''); }}
                placeholder="01001234567"
                inputProps={{ inputMode: 'tel', dir: 'ltr' }}
                sx={{ border: error ? '1px solid #f44336' : '1px solid #ccc', borderRadius: 1, px: 1.5, py: 0.5, width: '100%', mb: 2 }}
            />
            {error && <Typography sx={{ color: '#f44336', fontSize: '0.78rem', mb: 1, fontFamily: FONT }}>{error}</Typography>}
            <Button variant="contained" onClick={handleSave} disabled={saving || !phone.trim()}
                sx={{ bgcolor: '#0865a8', fontFamily: '"Noto Kufi Arabic",serif', '&:hover': { bgcolor: '#f57c00' } }}>
                {saving ? 'جاري الحفظ...' : 'حفظ'}
            </Button>
            {saved && (
                <Typography sx={{ color: 'green', fontSize: '0.8rem', mt: 1, fontFamily: '"Noto Kufi Arabic",serif' }}>
                    تم الحفظ ✓
                </Typography>
            )}
        </Box>
    );
};


const PhoneRequiredDialog = () => {
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();
    const [phone, setPhone] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    if (!isLoaded || !user) return null;

    const hasPhone = !!user.unsafeMetadata?.phone;
    if (hasPhone) return null;

    const handleSave = async () => {
        const cleaned = phone.replace(/[\s-]/g, '');
        if (!isValidPhone(cleaned)) {
            setError('من فضلك أدخل رقم موبايل مصري صحيح');
            return;
        }
        setSaving(true);
        setError('');
        try {
            await user.update({
                unsafeMetadata: { ...user.unsafeMetadata, phone: cleaned },
            });
            await savePhoneToDb(getToken, cleaned);
        } catch (err) {
            console.error('Failed to save phone:', err);
            setError('حصلت مشكلة أثناء الحفظ، حاول تاني');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open disableEscapeKeyDown dir="rtl" maxWidth="xs" fullWidth
            onClose={() => { /* مفيش إغلاق: الرقم إجباري */ }}>
            <DialogTitle sx={{ fontFamily: '"Noto Kufi Arabic",serif', fontWeight: 'bold', color: '#0865a8' }}>
                أكمل بياناتك
            </DialogTitle>
            <DialogContent>
                <Typography sx={{ fontFamily: '"Noto Kufi Arabic",serif', fontSize: '0.85rem', color: '#555', mb: 2 }}>
                    من فضلك أدخل رقم الموبايل للتواصل .
                </Typography>
                <InputBase
                    autoFocus
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setError(''); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }}
                    placeholder="01001234567"
                    inputProps={{ inputMode: 'tel', dir: 'ltr', 'aria-label': 'رقم الموبايل' }}
                    sx={{
                        border: error ? '1px solid #f44336' : '1px solid #ccc',
                        borderRadius: 1, px: 1.5, py: 0.8, width: '100%',
                    }}
                />
                {error && (
                    <Typography sx={{ color: '#f44336', fontSize: '0.78rem', mt: 1, fontFamily: '"Noto Kufi Arabic",serif' }}>
                        {error}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button variant="contained" onClick={handleSave} disabled={saving || !phone.trim()}
                    sx={{ bgcolor: '#0865a8', fontFamily: '"Noto Kufi Arabic",serif', '&:hover': { bgcolor: '#f57c00' } }}>
                    {saving ? 'جاري الحفظ...' : 'حفظ'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};



const Navbar = () => {
    const { t, i18n } = useTranslation();

    // Force Arabic on mount (in case i18n was previously set to 'en' via localStorage, etc.)
    useEffect(() => {
        i18n.changeLanguage('ar');
    }, [i18n]);

    // Keep the real navbar hidden until the component has mounted and its styles are applied.
    // This removes the "unstyled navbar flash" (huge icons, plain text) on page load.
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const trainingPlanLabel = t('nav.trainingPlan', { defaultValue: 'الدورات التدريبية' });
    const mediaLabel = t('nav.media', { defaultValue: 'الإعلام والميديا' });
    const contactLabel = t('nav.contact', { defaultValue: 'تواصل معنا' });

    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileView, setMobileView] = useState('main');      // 'main' | 'courses'
    const [drillStack, setDrillStack] = useState([]);           // mobile drill-down path
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [mobileMediaOpen, setMobileMediaOpen] = useState(false);
    const [mainCourses, setMainCourses] = useState([]);
    const [rootSlug, setRootSlug] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [coursesLoading, setCoursesLoading] = useState(false);
    const [coursesLoaded, setCoursesLoaded] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const searchInputRef = useRef(null);
    const searchBoxRef = useRef(null);
    const suggestionDebounce = useRef(null);
    const hoverTimer = useRef(null);
    const [selectedCatId, setSelectedCatId] = useState(null);
    const { user } = useUser();
    const { getToken, isLoaded: authLoaded } = useAuth();

    // ── Desktop programs menu: open/close is controlled by state (hover, click, route change, Escape) ──
    const [coursesMenuOpen, setCoursesMenuOpen] = useState(false);
    const closeTimer = useRef(null);

    const openCoursesMenu = () => {
        clearTimeout(closeTimer.current);
        setCoursesMenuOpen(true);
    };
    const closeCoursesMenu = (delay = 120) => {
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setCoursesMenuOpen(false), delay);
    };

    // ── Admin/Manager access — driven by live DB permissions via /api/UserPermissions/me ──
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        if (!authLoaded) return () => { cancelled = true; };

        const loadAdminAccess = async () => {
            setAdminLoading(true);
            if (!user) {
                if (!cancelled) {
                    setIsAdmin(false);
                    setAdminLoading(false);
                }
                return;
            }
            try {
                let token = null;
                try { token = await getToken(); } catch (_) { }
                const headers = {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                };

                const res = await fetch(`${API_BASE}/UserPermissions/me`, { headers });
                if (!res.ok) { if (!cancelled) setIsAdmin(false); return; }
                const data = await res.json();

                const hasAccess = !!data.isManager || (Array.isArray(data.permissions) && data.permissions.length > 0);
                if (!cancelled) setIsAdmin(hasAccess);
            } catch (err) {
                console.error('Failed to check admin access:', err);
                if (!cancelled) setIsAdmin(false);
            } finally {
                if (!cancelled) setAdminLoading(false);
            }
        };

        loadAdminAccess();
        return () => { cancelled = true; };
    }, [authLoaded, user, getToken]);

    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    // noSsr: read the real screen size on the very first render (no desktop-menu flash on phones)
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'), { noSsr: true });
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

    // Close the programs menu on every page change and drop keyboard focus from inside it
    useEffect(() => {
        setCoursesMenuOpen(false);
        const el = document.activeElement;
        if (el && el.closest && el.closest('.courses-dropdown-wrapper')) el.blur();
    }, [location.pathname]);

    const updateCartCount = () => {
        try {
            const s = localStorage.getItem('cartItems');
            setCartCount(s ? JSON.parse(s).length : 0);
        } catch { setCartCount(0); }
    };

    useEffect(() => {
        updateCartCount();
        window.addEventListener('cartUpdated', updateCartCount);
        return () => window.removeEventListener('cartUpdated', updateCartCount);
    }, []);

    useEffect(() => {
        try {
            const s = localStorage.getItem(RECENT_SEARCHES_KEY);
            if (s) setRecentSearches(JSON.parse(s));
        } catch { setRecentSearches([]); }
    }, []);

    useEffect(() => () => {
        clearTimeout(hoverTimer.current);
        clearTimeout(closeTimer.current);
    }, []);

    const saveRecentSearch = useCallback((term) => {
        if (!term.trim()) return;
        setRecentSearches(prev => {
            const u = [term, ...prev.filter(s => s.toLowerCase() !== term.toLowerCase())].slice(0, MAX_RECENT_SEARCHES);
            try { localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(u)); } catch { }
            return u;
        });
    }, []);

    const removeRecentSearch = useCallback((term, e) => {
        e.stopPropagation();
        setRecentSearches(prev => {
            const u = prev.filter(s => s !== term);
            try { localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(u)); } catch { }
            return u;
        });
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await fetchTreeOnce();
                const transformed = transformCategories(data);
                setMainCourses(transformed);
                setRootSlug(Array.isArray(data) ? (data[0]?.slug || null) : null);
                if (transformed.length > 0) setSelectedCatId(transformed[0].id);
                setError(null);
            } catch (err) {
                setError(err.message);
                setMainCourses([]);
            } finally { setLoading(false); }
        };
        fetchCategories();
    }, []);

    const transformCategories = (apiData) => {
        if (!Array.isArray(apiData) || !apiData.length) return [];
        const root = apiData[0];
        if (!root?.children) return [];
        return root.children.map(cat => {
            const item = { id: cat.id, title: cat.title, slug: cat.slug };
            if (cat.children?.length) {
                const hasGrand = cat.children.some(c => c.children?.length);
                if (!hasGrand) {
                    item.sub = [{ id: cat.id + 1000, title: cat.title, topics: cat.children.map(c => ({ id: c.id, name: c.title, link: `/courses/${c.slug}` })) }];
                } else {
                    item.sub = cat.children.map(sub => {
                        const s = { id: sub.id, title: sub.title, link: sub.slug ? `/courses/${sub.slug}` : undefined };
                        if (sub.children?.length) {
                            s.topics = sub.children.map(tp => {
                                const r = { id: tp.id, name: tp.title, link: `/courses/${tp.slug}` };
                                if (tp.children?.length) {
                                    r.subTopics = tp.children.map(st => {
                                        const st2 = { id: st.id, name: st.title, link: `/courses/${st.slug}` };
                                        if (st.children?.length) st2.subSubTopics = st.children.map(sst => ({ id: sst.id, name: sst.title, link: `/courses/${sst.slug}` }));
                                        return st2;
                                    });
                                }
                                return r;
                            });
                        }
                        return s;
                    });
                }
            } else { item.link = `/courses/${cat.slug}`; }
            return item;
        });
    };

    // Uniform tree for the programs menu
    const menuNodes = useMemo(() => buildMenuNodes(mainCourses), [mainCourses]);
    const activeNode = menuNodes.find(n => n.id === selectedCatId) || menuNodes[0];

    // One group card inside the desktop mega menu (same look with or without sub-items)
    const renderGroup = (child, idx) => {
        const hasKids = child.children?.length > 0;
        const Title = child.link ? Link : 'div';

        return (
            <div className="mega-group" key={child.key}>
                <div className={`mega-group-head${hasKids ? '' : ' mega-group-head--solo'}`}>
                    <Title
                        {...(child.link ? { to: child.link } : {})}
                        className="mega-group-title">
                        <span className="mega-num">{idx + 1}</span>
                        <span>{child.title}</span>
                    </Title>
                    {hasKids && child.link && (
                        <Link to={child.link} className="mega-viewall">عرض الكل</Link>
                    )}
                </div>
                {hasKids && <TreeLinks nodes={child.children} />}
            </div>
        );
    };

    // Desktop: small delay on hover so a diagonal mouse move doesn't switch category by accident
    const hoverSelect = (id) => {
        clearTimeout(hoverTimer.current);
        hoverTimer.current = setTimeout(() => setSelectedCatId(id), 120);
    };
    const cancelHover = () => clearTimeout(hoverTimer.current);

    // Mobile drill-down
    const currentNode = drillStack[drillStack.length - 1] || null;
    const currentList = currentNode ? (currentNode.children || []) : menuNodes;
    const drillBack = () => {
        if (drillStack.length) setDrillStack(s => s.slice(0, -1));
        else setMobileView('main');
    };

    // Lazy: only runs when the user focuses the search box (cached + 4 parallel requests max)
    const loadAllCourses = useCallback(async () => {
        if (coursesLoaded || coursesLoading) return;
        setCoursesLoading(true);
        try {
            setAllCourses(await getAllCoursesOnce());
            setCoursesLoaded(true);
        } catch (err) {
            console.error('Error loading courses:', err);
        } finally {
            setCoursesLoading(false);
        }
    }, [coursesLoaded, coursesLoading]);

    useEffect(() => {
        if (suggestionDebounce.current) clearTimeout(suggestionDebounce.current);
        if (!searchValue.trim()) { setSuggestions([]); return; }
        suggestionDebounce.current = setTimeout(() => {
            const q = searchValue.trim().toLowerCase();
            setSuggestions(allCourses.filter(c =>
                c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) ||
                c.category.toLowerCase().includes(q) || c.place.toLowerCase().includes(q)
            ).slice(0, 10));
        }, 200);
        return () => { if (suggestionDebounce.current) clearTimeout(suggestionDebounce.current); };
    }, [searchValue, allCourses]);

    const toggleDrawer = (open) => () => setMobileOpen(open);
    const dropdownVisible = searchFocused && (suggestions.length > 0 || (recentSearches.length > 0 && !searchValue.trim()) || (coursesLoading && !coursesLoaded));
    const dropdownItems = searchValue.trim() ? suggestions : recentSearches;

    const executeSearch = useCallback((term) => {
        const q = (typeof term === 'string' ? term : term?.title || '').trim();
        if (!q) return;
        saveRecentSearch(q);
        setSearchValue(q);
        setSearchFocused(false);
        setActiveSuggestionIndex(-1);
        const matched = allCourses.filter(c =>
            c.title.toLowerCase().includes(q.toLowerCase()) || c.description.toLowerCase().includes(q.toLowerCase()) ||
            c.category.toLowerCase().includes(q.toLowerCase()) || c.place.toLowerCase().includes(q.toLowerCase())
        );
        navigate(`/search?q=${encodeURIComponent(q)}`, { state: { results: matched, query: q } });
    }, [navigate, saveRecentSearch, allCourses]);

    const handleSearchSubmit = (e) => {
        if (e?.preventDefault) e.preventDefault();
        if (activeSuggestionIndex >= 0 && dropdownItems[activeSuggestionIndex]) {
            const item = dropdownItems[activeSuggestionIndex];
            if (typeof item === 'string') { executeSearch(item); }
            else { saveRecentSearch(item.title); setSearchValue(''); setSuggestions([]); setSearchFocused(false); setActiveSuggestionIndex(-1); navigate(`/course/${item.slug}`); }
        } else { executeSearch(searchValue); }
    };

    const handleSearchKeyDown = (e) => {
        if (!dropdownVisible) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); setActiveSuggestionIndex(p => p < dropdownItems.length - 1 ? p + 1 : 0); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveSuggestionIndex(p => p > 0 ? p - 1 : dropdownItems.length - 1); }
        else if (e.key === 'Escape') { setSearchFocused(false); setActiveSuggestionIndex(-1); searchInputRef.current?.blur(); }
    };

    // Shared styles for mobile menu items
    const mobileHeaderSx = (open) => ({
        bgcolor: open ? 'rgba(8,101,168,0.08)' : 'transparent',
        borderRadius: 1, mb: 0.5,
        '&:hover': { bgcolor: 'rgba(8,101,168,0.12)' },
        justifyContent: 'space-between',
    });
    const mobileHeaderTextProps = {
        fontFamily: FONT, fontWeight: 'bold', color: '#0865a8', textAlign: 'start',
    };
    const mobileSubTextProps = {
        fontFamily: FONT, fontSize: '0.85rem', textAlign: 'start',
    };
    const mobileDivider = <Divider sx={{ my: 2, bgcolor: '#0865a8', height: 2 }} />;

    return (
        <>
            <style>{`
                .courses-dropdown-wrapper,
                .about-dropdown-wrapper,
                .services-dropdown-wrapper,
                .media-dropdown-wrapper {
                    position: relative;
                    display: inline-block;
                }

                /* ── Programs mega menu ── */
                .courses-dropdown-wrapper::after {      /* invisible bridge so hover isn't lost */
                    content: '';
                    position: absolute;
                    top: 100%; left: 0; right: 0;
                    height: 26px;
                }
                .courses-dropdown-menu {
                    position: fixed;
                    top: 70px;
                    left: 50%;
                    transform: translateX(-50%) translateY(-10px);
                    width: min(980px, 94vw);
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 12px 40px rgba(0,0,0,0.16);
                    border: 1px solid #e0e0e0;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.25s, visibility 0.25s, transform 0.25s;
                    z-index: 1300;
                }
                .courses-dropdown-menu::before {
                    content: '';
                    position: absolute;
                    top: -30px; left: 0; right: 0;
                    height: 30px;
                }

                /* Open state is controlled by React (hover / click / route change / Escape) */
                .courses-dropdown-wrapper.is-open .courses-dropdown-menu {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(-50%) translateY(0);
                }

                /* Keyboard users (Tab key) can still open it; mouse clicks no longer keep it open */
                .courses-dropdown-wrapper:has(:focus-visible) .courses-dropdown-menu {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(-50%) translateY(0);
                }

                /* Two independent columns: a long group no longer pushes the next group out of view */
                .mega-grid {
                    display: flex;
                    gap: 14px;
                    align-items: flex-start;
                }
                .mega-col {
                    flex: 1 1 0;
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }
                .mega-group {
                    border: 1px solid #eef0f2;
                    border-radius: 10px;
                    padding: 10px 8px 8px;
                    background: #fff;
                }
                .mega-group-head {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                    padding: 0 8px 8px;
                    margin-bottom: 6px;
                    border-bottom: 1px solid #f0f0f0;
                }
                .mega-group-head--solo {
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }
                .mega-group-title {
                    display: flex; align-items: flex-start; gap: 8px;
                    color: #0865a8; font-weight: 700; font-size: 0.86rem; line-height: 1.6;
                    text-decoration: none; font-family: ${FONT};
                }
                a.mega-group-title:hover { color: #f57c00; }
                .mega-num {
                    flex: 0 0 22px; width: 22px; height: 22px; border-radius: 50%;
                    background: #f0f7ff; color: #0865a8; font-size: 11px; font-weight: 700;
                    display: flex; align-items: center; justify-content: center; margin-top: 2px;
                }
                .mega-link {
                    display: flex; align-items: flex-start; gap: 8px;
                    padding: 5px 8px; border-radius: 6px;
                    text-decoration: none; color: #444; line-height: 1.7;
                    font-family: ${FONT};
                    transition: background 0.15s, color 0.15s;
                }
                .mega-link:hover { background: rgba(245,124,0,0.08); color: #f57c00; }
                .mega-bullet {
                    flex-shrink: 0; width: 6px; height: 6px; border-radius: 50%;
                    background: #0865a8; margin-top: 10px; transition: background 0.15s;
                }
                .mega-link:hover .mega-bullet { background: #f57c00; }
                .mega-viewall {
                    font-size: 0.72rem; color: #f57c00; font-weight: 700;
                    text-decoration: none; white-space: nowrap; font-family: ${FONT};
                }
                .mega-viewall:hover { text-decoration: underline; }
                .mega-count {
                    min-width: 24px; height: 20px; padding: 0 7px; border-radius: 10px;
                    background: rgba(8,101,168,0.1); color: #0865a8;
                    font-size: 0.7rem; font-weight: 700; font-family: ${FONT};
                    display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
                }

                .about-dropdown-menu,
                .services-dropdown-menu,
                .media-dropdown-menu {
                    position: absolute;
                    top: 100%;
                    min-width: 220px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    border: 1px solid #e0e0e0;
                    opacity: 0; visibility: hidden;
                    transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
                    transform: translateY(-10px);
                    z-index: 1300;
                    padding: 8px 0;
                    inset-inline-start: 0;
                    inset-inline-end: auto;
                }
                .about-dropdown-wrapper:hover .about-dropdown-menu,
                .services-dropdown-wrapper:hover .services-dropdown-menu,
                .media-dropdown-wrapper:hover .media-dropdown-menu {
                    opacity: 1; visibility: visible; transform: translateY(0);
                }
                .dropdown-menu-item {
                    padding: 10px 16px;
                    cursor: pointer;
                    transition: background 0.2s, padding 0.2s, color 0.2s;
                    text-decoration: none;
                    color: #000;
                    display: block;
                    font-family: "Noto Kufi Arabic", serif;
                    font-size: 0.85rem;
                    text-align: start;
                }
                .dropdown-menu-item:hover {
                    background-color: rgba(245,124,0,0.08);
                    color: #f57c00;
                    padding-inline-start: 24px;
                }
                .my-courses-nav-btn:hover {
                    background-color: rgba(8,101,168,0.08) !important;
                    transform: scale(1.05);
                }
                .admin-nav-btn {
                    display: inline-flex !important; align-items: center !important;
                    justify-content: center !important; gap: 3px !important;
                    width: 72px !important; height: 26px !important; padding: 0 !important;
                    background: #f57c00 !important; color: #fff !important;
                    border-radius: 6px !important; font-size: 0.7rem !important;
                    font-weight: 400 !important; text-decoration: none !important;
                    border: 2px solid #f57c00 !important; transition: all 0.2s !important;
                    cursor: pointer !important; white-space: nowrap !important;
                    flex-shrink: 0 !important; line-height: 1 !important;
                }
                .admin-nav-btn:hover {
                    background: #fff !important; color: #f57c00 !important;
                    box-shadow: 0 3px 10px rgba(245,124,0,0.28) !important;
                }
            `}</style>

            {/* Plain white bar shown only until the real navbar is ready (uses inline styles, so it never looks unstyled) */}
            {!mounted && (
                <div
                    aria-hidden="true"
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, height: 70,
                        background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.15)', zIndex: 1100,
                    }}
                />
            )}

            {/* Real navbar: stays in the HTML (good for SEO) but is invisible until mounted */}
            <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
                <AppBar
                    position="fixed" elevation={4}
                    dir="rtl"
                    sx={{ bgcolor: 'white', color: '#000', py: 0.5, top: 0, zIndex: 1100, height: 70 }}
                >
                    <Toolbar sx={{ justifyContent: 'space-between', display: 'flex', px: { xs: 1, md: 4 } }}>

                        {/* ── LOGO ── */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                            {isMobile && (
                                <IconButton onClick={toggleDrawer(true)} sx={{ color: '#0865a8', '&:hover': { bgcolor: 'rgba(8,101,168,0.08)' } }}>
                                    <MenuIcon />
                                </IconButton>
                            )}
                            <Stack direction="row" alignItems="center" component={Link} to="/"
                                sx={{ textDecoration: 'none', color: 'inherit', flexShrink: 0 }}>
                                <Box component="img" src={logo} alt="ICEMT Logo" className="nav-logo"
                                    sx={{ height: 62, width: 'auto', minWidth: 62, flexShrink: 0 }} />
                                {!isSmallMobile && (
                                    <Box sx={{ mx: 1 }}>
                                        <Typography variant="body2" sx={{
                                            fontWeight: 'bold', color: '#0865a8', fontSize: '0.8rem',
                                            whiteSpace: 'nowrap', fontFamily: FONT,
                                        }}>
                                            المقاولون العرب
                                        </Typography>
                                        <Typography variant="caption" sx={{
                                            color: '#000', display: { xs: 'none', md: 'block' },
                                            fontFamily: FONT,
                                        }}>
                                            المعهد التكنولوجى لهندسة التشييد والإدارة
                                        </Typography>
                                    </Box>
                                )}
                            </Stack>
                        </Box>

                        {/* ── DESKTOP: Main menu (ordered) ── */}
                        {!isMobile && (
                            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flexShrink: 0 }}>

                                {/* 1. عن المعهد */}
                                <div className="about-dropdown-wrapper">
                                    <Button color="inherit" endIcon={<KeyboardArrowDownIcon />} sx={navBtnSx}>{t('nav.about')}</Button>
                                    <div className="about-dropdown-menu">
                                        {aboutLinks.map(item => <DropdownLink key={item.ar} item={item} />)}
                                    </div>
                                </div>

                                {/* 2. الخطة التدريبية — redesigned mega menu (open/close controlled by state) */}
                                <div
                                    className={`courses-dropdown-wrapper${coursesMenuOpen ? ' is-open' : ''}`}
                                    onMouseEnter={openCoursesMenu}
                                    onMouseLeave={() => closeCoursesMenu()}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') {
                                            setCoursesMenuOpen(false);
                                            const el = document.activeElement;
                                            if (el && e.currentTarget.contains(el)) el.blur();
                                        }
                                    }}
                                >
                                    <Button color="inherit" endIcon={<KeyboardArrowDownIcon />} sx={navBtnSx}>
                                        {trainingPlanLabel}
                                    </Button>
                                    <div
                                        className="courses-dropdown-menu"
                                        onClick={(e) => { if (e.target.closest('a')) setCoursesMenuOpen(false); }}
                                    >
                                        <Box sx={{ borderRadius: '10px', overflow: 'hidden' }} dir="rtl">
                                            <Box sx={{ display: 'flex', height: 'min(560px, calc(100vh - 150px))' }}>

                                                {/* Right: categories */}
                                                <Box sx={{
                                                    width: '270px', flexShrink: 0,
                                                    borderInlineEnd: '1px solid #e0e0e0',
                                                    bgcolor: '#fafafa', overflowY: 'auto',
                                                    '&::-webkit-scrollbar': { width: '6px' },
                                                    '&::-webkit-scrollbar-thumb': { backgroundColor: '#d0d0d0', borderRadius: '3px' },
                                                }}>
                                                    <List sx={{ p: 1 }}>
                                                        {loading
                                                            ? <Box sx={{ minHeight: 300, p: 1 }}>
                                                                {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} variant="rounded" height={42} sx={{ mb: 1, borderRadius: 1.5 }} />)}
                                                            </Box>
                                                            : error
                                                                ? <ListItemButton><ListItemText primary={t('common.error')} primaryTypographyProps={{ fontSize: 13, fontFamily: FONT, color: '#f44336' }} /></ListItemButton>
                                                                : menuNodes.map(node => {
                                                                    const selected = activeNode?.id === node.id;
                                                                    return (
                                                                        <ListItemButton key={node.key}
                                                                            onMouseEnter={() => hoverSelect(node.id)}
                                                                            onMouseLeave={cancelHover}
                                                                            onFocus={() => setSelectedCatId(node.id)}
                                                                            onClick={() => setSelectedCatId(node.id)}
                                                                            selected={selected}
                                                                            component={node.leaf ? Link : 'div'}
                                                                            to={node.leaf ? node.link : undefined}
                                                                            sx={{
                                                                                py: 1.2, px: 1.5, mb: 0.5, borderRadius: 1.5, transition: 'all 0.2s', position: 'relative',
                                                                                '&.Mui-selected': {
                                                                                    bgcolor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                                                                    '&::before': {
                                                                                        content: '""', position: 'absolute',
                                                                                        insetInlineEnd: 0,
                                                                                        top: '50%', transform: 'translateY(-50%)',
                                                                                        width: '4px', height: '60%',
                                                                                        bgcolor: '#f57c00', borderRadius: '2px',
                                                                                    },
                                                                                },
                                                                                '&:hover': { bgcolor: selected ? 'white' : 'rgba(8,101,168,0.05)' },
                                                                            }}>
                                                                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
                                                                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: selected ? '#f57c00' : '#0865a8', flexShrink: 0 }} />
                                                                                <ListItemText
                                                                                    primary={node.title}
                                                                                    sx={{ m: 0 }}
                                                                                    primaryTypographyProps={{ fontSize: 13, fontFamily: FONT, fontWeight: selected ? 'bold' : '500', color: selected ? '#0865a8' : '#333', lineHeight: 1.5 }} />
                                                                                {!node.leaf && <span className="mega-count">{countLeaves(node)}</span>}
                                                                            </Box>
                                                                        </ListItemButton>
                                                                    );
                                                                })
                                                        }
                                                    </List>
                                                </Box>

                                                {/* Left: programs of the selected category */}
                                                <Box sx={{ flex: 1, minWidth: 0, p: 2.5, bgcolor: 'white', overflowY: 'auto', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#d0d0d0', borderRadius: '3px' } }}>
                                                    {loading
                                                        ? <Box sx={{ minHeight: 300, py: 1 }}>
                                                            {[1, 2, 3, 4].map(i => <Skeleton key={i} variant="rounded" height={28} width={`${75 + (i % 2) * 15}%`} sx={{ mb: 2 }} />)}
                                                        </Box>
                                                        : error
                                                            ? <Box sx={{ textAlign: 'center', py: 4 }}><Typography sx={{ color: '#f44336', fontFamily: FONT }}>{t('common.error')}</Typography></Box>
                                                            : activeNode ? (
                                                                <>
                                                                    <Box sx={{ mb: 2, pb: 1.5, borderBottom: '2px solid #f57c00', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                                                                            <Box sx={{ width: 4, height: 20, bgcolor: '#f57c00', borderRadius: 1, flexShrink: 0 }} />
                                                                            <Typography sx={{ color: '#0865a8', fontWeight: 'bold', fontFamily: FONT, fontSize: '1rem', lineHeight: 1.5 }}>{activeNode.title}</Typography>
                                                                        </Box>
                                                                        {activeNode.link && (
                                                                            <Link to={activeNode.link} className="mega-viewall">عرض الكل ←</Link>
                                                                        )}
                                                                    </Box>

                                                                    {activeNode.leaf ? (
                                                                        <Box sx={{ textAlign: 'center', py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                                                            <Typography sx={{ color: '#666', fontFamily: FONT, fontSize: '0.9rem', mb: 1 }}>{t('courses.clickToView')}</Typography>
                                                                            <Button component={Link} to={activeNode.link} variant="contained"
                                                                                sx={{ bgcolor: '#0865a8', color: 'white', fontFamily: FONT, px: 4, py: 1, borderRadius: 2, textTransform: 'none', '&:hover': { bgcolor: '#f57c00' } }}>
                                                                                {t('courses.details')}
                                                                            </Button>
                                                                        </Box>
                                                                    ) : (
                                                                        <div className="mega-grid">
                                                                            {distributeToColumns(activeNode.children || [], 2).map((col, ci) => (
                                                                                <div className="mega-col" key={ci}>
                                                                                    {col.map(({ item, idx }) => renderGroup(item, idx))}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </>
                                                            ) : null
                                                    }
                                                </Box>
                                            </Box>

                                            {/* Footer */}
                                            {rootSlug && (
                                                <Box sx={{ borderTop: '1px solid #e0e0e0', bgcolor: '#f7f9fb', px: 2.5, py: 1.2, display: 'flex', justifyContent: 'center' }}>
                                                    <Link to={`/courses/${rootSlug}`} className="mega-viewall" style={{ fontSize: '0.82rem' }}>
                                                        عرض جميع البرامج التدريبية ←
                                                    </Link>
                                                </Box>
                                            )}
                                        </Box>
                                    </div>
                                </div>

                                {/* 3. الخدمات */}
                                <div className="services-dropdown-wrapper">
                                    <Button color="inherit" endIcon={<KeyboardArrowDownIcon />} sx={navBtnSx}>{t('nav.services')}</Button>
                                    <div className="services-dropdown-menu">
                                        {serviceLinks.map(item => <DropdownLink key={item.path} item={item} />)}
                                    </div>
                                </div>

                                {/* 4. المكتبة */}
                                <Button color="inherit" component={Link} to="/library" sx={navBtnSx}>{t('nav.library')}</Button>

                                {/* 5. الإعلام والميديا */}
                                <div className="media-dropdown-wrapper">
                                    <Button color="inherit" endIcon={<KeyboardArrowDownIcon />} sx={navBtnSx}>{mediaLabel}</Button>
                                    <div className="media-dropdown-menu">
                                        {mediaLinks.map(item => <DropdownLink key={item.path} item={item} />)}
                                    </div>
                                </div>

                                {/* 6. تواصل معنا */}
                                <Button color="inherit" component={Link} to="/contact" sx={navBtnSx}>{contactLabel}</Button>
                            </Stack>
                        )}

                        {/* ── SEARCH BAR ── */}
                        <ClickAwayListener onClickAway={() => { setSearchFocused(false); setActiveSuggestionIndex(-1); }}>
                            <Box ref={searchBoxRef} sx={{
                                display: 'flex', alignItems: 'center', flexGrow: 0, flexShrink: 1, justifyContent: 'center',
                                width: { xs: 'auto', sm: '350px', md: '300px', lg: '260px', xl: '380px' },
                                maxWidth: { xs: 'calc(100% - 200px)', sm: '350px', md: '300px', lg: '260px', xl: '380px' },
                                mx: { xs: 0.5, sm: 1, md: 2 }, position: 'relative',
                                minWidth: { xs: '120px', sm: '250px', lg: '220px' },
                            }}>
                                <Box component="form" onSubmit={handleSearchSubmit} role="search" sx={{
                                    bgcolor: searchFocused ? '#ffffff' : '#f1f3f4',
                                    borderRadius: searchFocused && dropdownVisible ? '24px 24px 0 0' : 9,
                                    display: 'flex', alignItems: 'center', px: 2, py: 0.8, width: '100%',
                                    transition: 'all 0.2s',
                                    border: searchFocused ? '1px solid #0865a8' : '1px solid transparent',
                                    boxShadow: searchFocused ? '0 0 0 2px rgba(8,101,168,0.1)' : 'none',
                                    borderBottom: searchFocused && dropdownVisible ? '1px solid #e0e0e0' : undefined,
                                }}>
                                    <IconButton type="submit" disabled={!searchValue.trim()}
                                        sx={{ p: 0.5, '&:hover': { bgcolor: 'transparent' }, '&.Mui-disabled': { opacity: 0.4 }, order: 3 }}
                                        aria-label={t('courses.search')}>
                                        <SearchIcon sx={{ color: '#0865a8', fontSize: { xs: 18, md: 22 } }} />
                                    </IconButton>
                                    <InputBase
                                        inputRef={searchInputRef}
                                        name="q"
                                        value={searchValue}
                                        onChange={e => { setSearchValue(e.target.value); setActiveSuggestionIndex(-1); }}
                                        onFocus={() => { setSearchFocused(true); loadAllCourses(); }}
                                        onKeyDown={handleSearchKeyDown}
                                        placeholder={t('courses.search')}
                                        autoComplete="off"
                                        inputProps={{ 'aria-label': t('courses.search'), 'aria-autocomplete': 'both', 'aria-haspopup': 'true', 'aria-expanded': dropdownVisible, role: 'combobox' }}
                                        sx={{
                                            color: '#000', flexGrow: 1,
                                            fontFamily: FONT,
                                            fontSize: { xs: '0.8rem', md: '0.95rem' },
                                            px: 1,
                                            '& input': { textAlign: 'start' },
                                        }}
                                    />
                                    {searchValue && (
                                        <IconButton size="small"
                                            onClick={() => { setSearchValue(''); setSuggestions([]); setActiveSuggestionIndex(-1); searchInputRef.current?.focus(); }}
                                            sx={{ p: 0.5 }} aria-label={t('common.cancel')}>
                                            <CloseIcon sx={{ fontSize: 16, color: '#888' }} />
                                        </IconButton>
                                    )}
                                </Box>

                                {dropdownVisible && (
                                    <Paper elevation={6} sx={{
                                        position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1300,
                                        borderRadius: '0 0 12px 12px', border: '1px solid #0865a8', borderTop: 'none',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.14)', overflow: 'hidden', bgcolor: 'white',
                                        maxHeight: '420px', overflowY: 'auto',
                                        '&::-webkit-scrollbar': { width: '5px' },
                                        '&::-webkit-scrollbar-thumb': { bgcolor: '#d0d0d0', borderRadius: '3px' },
                                    }}>
                                        {suggestions.length === 0 && !searchValue.trim() && recentSearches.length > 0 && (
                                            <>
                                                <Box sx={{ px: 2, pt: 1.5, pb: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <HistoryIcon sx={{ fontSize: 13, color: '#aaa' }} />
                                                    <Typography sx={{ fontSize: '0.7rem', color: '#aaa', fontFamily: FONT, fontWeight: 'bold', letterSpacing: 0.6 }}>{t('search.recentSearches')}</Typography>
                                                </Box>
                                                {recentSearches.map((term, i) => (
                                                    <Box key={term}
                                                        onMouseDown={() => { saveRecentSearch(term); setSearchValue(term); setSearchFocused(false); const matched = allCourses.filter(c => c.title.toLowerCase().includes(term.toLowerCase()) || c.description.toLowerCase().includes(term.toLowerCase())); navigate(`/search?q=${encodeURIComponent(term)}`, { state: { results: matched, query: term } }); }}
                                                        onMouseEnter={() => setActiveSuggestionIndex(i)}
                                                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 0.9, cursor: 'pointer', bgcolor: activeSuggestionIndex === i ? 'rgba(8,101,168,0.06)' : 'transparent', '&:hover': { bgcolor: 'rgba(8,101,168,0.06)' }, transition: 'background 0.15s' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                            <HistoryIcon sx={{ fontSize: 16, color: '#bbb', flexShrink: 0 }} />
                                                            <Typography sx={{ fontFamily: FONT, fontSize: '0.87rem', color: '#333' }}>{term}</Typography>
                                                        </Box>
                                                        <IconButton size="small" onMouseDown={e => removeRecentSearch(term, e)} sx={{ p: 0.3, color: '#ccc', '&:hover': { color: '#f57c00' } }} aria-label={t('common.delete')}>
                                                            <CloseIcon sx={{ fontSize: 12 }} />
                                                        </IconButton>
                                                    </Box>
                                                ))}
                                                <Box sx={{ height: '1px', bgcolor: '#f5f5f5', mx: 2 }} />
                                            </>
                                        )}
                                        {coursesLoading && !coursesLoaded && searchValue.trim() && (
                                            <Box sx={{ px: 2, py: 2, textAlign: 'center' }}><Typography sx={{ color: '#aaa', fontFamily: FONT, fontSize: '0.82rem' }}>{t('search.loadingCourses')}</Typography></Box>
                                        )}
                                        {suggestions.length > 0 && (
                                            <>
                                                <Box sx={{ px: 2, pt: 1.5, pb: 0.8, display: 'flex', alignItems: 'center', gap: 0.8, borderBottom: '1px solid #f5f5f5' }}>
                                                    <Box sx={{ width: 18, height: 18, borderRadius: '50%', background: 'linear-gradient(135deg,#0865a8 0%,#f57c00 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                        <SearchIcon sx={{ fontSize: 10, color: 'white' }} />
                                                    </Box>
                                                    <Typography sx={{ fontSize: '0.7rem', color: '#999', fontFamily: FONT, fontWeight: 'bold', letterSpacing: 0.5 }}>{t('search.matchingCourses', { count: suggestions.length })}</Typography>
                                                </Box>
                                                {suggestions.map((course, i) => {
                                                    const title = course.title || '';
                                                    const q = searchValue.toLowerCase();
                                                    const matchIdx = title.toLowerCase().indexOf(q);
                                                    return (
                                                        <Box key={course.id}
                                                            onMouseDown={e => { e.preventDefault(); saveRecentSearch(title); setSearchValue(''); setSuggestions([]); setSearchFocused(false); setActiveSuggestionIndex(-1); navigate(`/course/${course.slug}`); }}
                                                            onMouseEnter={() => setActiveSuggestionIndex(i)}
                                                            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1.5, py: 1, cursor: 'pointer', bgcolor: activeSuggestionIndex === i ? 'rgba(8,101,168,0.05)' : 'transparent', '&:hover': { bgcolor: 'rgba(8,101,168,0.05)' }, transition: 'background 0.15s', borderBottom: i < suggestions.length - 1 ? '1px solid #fafafa' : 'none' }}>
                                                            <Box sx={{ width: 52, height: 52, flexShrink: 0, borderRadius: '10px', overflow: 'hidden', background: 'linear-gradient(135deg,#0865a8 0%,#f57c00 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 8px rgba(8,101,168,0.25)' }}>
                                                                {course.image
                                                                    ? <Box component="img" src={course.image} alt={title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                    : <Box sx={{ bgcolor: 'rgba(255,255,255,0.15)', borderRadius: '50%', p: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                                                    </Box>
                                                                }
                                                            </Box>
                                                            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                                                <Typography sx={{ fontFamily: FONT, fontSize: '0.88rem', fontWeight: '600', color: '#1a1a1a', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                                    {matchIdx === -1 || !searchValue ? title : (
                                                                        <>{title.slice(0, matchIdx)}<Box component="span" sx={{ fontWeight: 'bold', color: '#0865a8', borderBottom: '1px solid rgba(8,101,168,0.3)' }}>{title.slice(matchIdx, matchIdx + searchValue.length)}</Box>{title.slice(matchIdx + searchValue.length)}</>
                                                                    )}
                                                                </Typography>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mt: 0.4 }}>
                                                                    <Box sx={{ display: 'inline-flex', alignItems: 'center', bgcolor: 'rgba(8,101,168,0.09)', px: 0.8, py: 0.2, borderRadius: '4px', flexShrink: 0 }}>
                                                                        <Typography sx={{ fontFamily: FONT, fontSize: '0.68rem', color: '#0865a8', fontWeight: 'bold' }}>{t('search.courseTag')}</Typography>
                                                                    </Box>
                                                                    {(course.category || course.place) && (
                                                                        <Typography sx={{ fontFamily: FONT, fontSize: '0.72rem', color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                                            {course.category || course.place}
                                                                        </Typography>
                                                                    )}
                                                                </Box>
                                                            </Box>
                                                            <Box sx={{ opacity: activeSuggestionIndex === i ? 1 : 0, transition: 'opacity 0.15s', color: '#0865a8', flexShrink: 0 }}>
                                                                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                                                </svg>
                                                            </Box>
                                                        </Box>
                                                    );
                                                })}
                                            </>
                                        )}
                                        {!coursesLoading && coursesLoaded && searchValue.trim() && suggestions.length === 0 && (
                                            <Box sx={{ px: 2, py: 2, textAlign: 'center' }}><Typography sx={{ color: '#aaa', fontFamily: FONT, fontSize: '0.82rem' }}>{t('search.noResults', { query: searchValue })}</Typography></Box>
                                        )}
                                        {searchValue.trim() && (
                                            <Box onMouseDown={e => { e.preventDefault(); executeSearch(searchValue); }}
                                                sx={{ px: 2, py: 1, borderTop: '1px solid #f0f0f0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(8,101,168,0.02)', '&:hover': { bgcolor: 'rgba(8,101,168,0.08)' }, transition: 'background 0.15s' }}>
                                                <SearchIcon sx={{ fontSize: 15, color: '#0865a8' }} />
                                                <Typography sx={{ fontFamily: FONT, fontSize: '0.82rem', color: '#0865a8', fontWeight: 'bold' }}>{t('search.showAllResults', { query: searchValue })}</Typography>
                                            </Box>
                                        )}
                                    </Paper>
                                )}
                            </Box>
                        </ClickAwayListener>

                        {/* ── RIGHT-SIDE CONTROLS ── */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1.5 }, flexShrink: 0 }}>
                            {!isMobile && authLoaded && !adminLoading && isAdmin && (
                                <Link to="/admin" className="admin-nav-btn">
                                    <AdminPanelSettingsIcon sx={{ fontSize: 12 }} />
                                    {t('nav.admin')}
                                </Link>
                            )}

                            {authLoaded && <SignedIn>
                                <IconButton className="my-courses-nav-btn" component={Link} to="/my-courses" size="small" title={t('nav.myCourses')}
                                    sx={{ position: 'relative', transition: 'all 0.2s', color: '#0865a8', '&:hover': { backgroundColor: 'rgba(8,101,168,0.08)', transform: 'scale(1.05)' } }}>
                                    <MenuBookIcon sx={{ fontSize: 22 }} />
                                </IconButton>
                            </SignedIn>}

                            <IconButton color="inherit" size="small" component={Link} to="/cart"
                                sx={{ position: 'relative', transition: 'all 0.2s', color: '#0865a8', '&:hover': { backgroundColor: 'rgba(8,101,168,0.08)', transform: 'scale(1.05)' } }}>
                                <Badge badgeContent={cartCount} sx={{ '& .MuiBadge-badge': { bgcolor: '#f57c00', color: 'white', fontSize: '0.7rem', height: '18px', minWidth: '18px', padding: '0 4px', fontFamily: FONT } }}>
                                    <ShoppingCartIcon sx={{ fontSize: 22 }} />
                                </Badge>
                            </IconButton>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {authLoaded && <SignedOut>
                                    <SignInButton mode="modal">
                                        <Button variant="contained" size="small"
                                            sx={{ fontFamily: FONT, fontSize: '0.8rem', bgcolor: '#0865a8', color: '#ffffff', px: 1, py: 0.5, borderRadius: 5, textTransform: 'none', fontWeight: 600, boxShadow: '0 4px 12px rgba(8,101,168,0.25)', minWidth: 'auto', '&:hover': { bgcolor: '#f57c00', boxShadow: '0 6px 18px rgba(245,124,0,0.35)' } }}>
                                            {t('nav.login')}
                                        </Button>
                                    </SignInButton>
                                </SignedOut>}
                                {authLoaded && <SignedIn>
                                    <UserButton afterSignOutUrl="/">
                                        <UserButton.UserProfilePage label="رقم التليفون" url="phone" labelIcon={<span>📞</span>}>
                                            <PhonePage />
                                        </UserButton.UserProfilePage>
                                    </UserButton>
                                    <AuthSync />
                                    <PhoneRequiredDialog />
                                </SignedIn>}
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
            </div>

            {/* ── MOBILE DRAWER ── */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={toggleDrawer(false)}
                SlideProps={{ onExited: () => { setMobileView('main'); setDrillStack([]); } }}
            >
                <Box sx={{ width: 300, p: 2, bgcolor: 'white', height: '100%', overflowY: 'auto' }} dir="rtl">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 2, borderBottom: '2px solid #0865a8' }}>
                        <Typography variant="h6" sx={{ fontFamily: FONT, color: '#0865a8', fontWeight: 'bold' }}>{t('nav.menu')}</Typography>
                        <IconButton onClick={toggleDrawer(false)} sx={{ color: '#f57c00', '&:hover': { bgcolor: 'rgba(245,124,0,0.08)' } }}><CloseIcon /></IconButton>
                    </Box>

                    {mobileView === 'courses' ? (
                        /* ═══ Programs drill-down ═══ */
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                <IconButton onClick={drillBack} aria-label="رجوع" sx={{ color: '#0865a8', bgcolor: 'rgba(8,101,168,0.08)' }}>
                                    <ChevronRightIcon />
                                </IconButton>
                                <Typography sx={{ flex: 1, fontFamily: FONT, fontWeight: 'bold', color: '#0865a8', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                    {currentNode ? currentNode.title : trainingPlanLabel}
                                </Typography>
                            </Box>

                            {(currentNode?.link || (!currentNode && rootSlug)) && (
                                <Button
                                    component={Link}
                                    to={currentNode ? currentNode.link : `/courses/${rootSlug}`}
                                    onClick={toggleDrawer(false)}
                                    fullWidth variant="contained"
                                    sx={{ mb: 1.5, bgcolor: '#f57c00', color: '#fff', fontFamily: FONT, fontWeight: 'bold', fontSize: '0.8rem', borderRadius: 2, boxShadow: 'none', '&:hover': { bgcolor: '#e65100', boxShadow: 'none' } }}>
                                    {currentNode ? 'عرض كل البرامج في هذا القسم' : 'عرض جميع البرامج التدريبية'}
                                </Button>
                            )}

                            <List disablePadding>
                                {loading
                                    ? <Box sx={{ minHeight: 220, p: 1 }}>
                                        {[1, 2, 3, 4].map(i => <Skeleton key={i} variant="rounded" height={44} sx={{ mb: 1 }} />)}
                                    </Box>
                                    : error
                                        ? <ListItemButton><ListItemText primary={t('common.error')} primaryTypographyProps={{ fontFamily: FONT, fontSize: '0.9rem', color: '#f44336', textAlign: 'start' }} /></ListItemButton>
                                        : currentList.map(node => {
                                            const hasKids = node.children?.length > 0;
                                            return hasKids ? (
                                                <ListItemButton key={node.key}
                                                    onClick={() => setDrillStack(s => [...s, node])}
                                                    sx={{ mb: 0.5, borderRadius: 1, bgcolor: 'rgba(0,0,0,0.02)', borderInlineStart: '3px solid #0865a8', '&:hover': { bgcolor: 'rgba(8,101,168,0.08)' }, justifyContent: 'space-between', gap: 1 }}>
                                                    <ListItemText primary={node.title} primaryTypographyProps={{ fontFamily: FONT, fontSize: '0.86rem', fontWeight: 'bold', color: '#0865a8', textAlign: 'start', lineHeight: 1.7 }} />
                                                    <span className="mega-count">{countLeaves(node)}</span>
                                                    <ChevronLeftIcon fontSize="small" sx={{ color: '#0865a8' }} />
                                                </ListItemButton>
                                            ) : (
                                                <ListItemButton key={node.key}
                                                    component={node.link ? Link : 'div'}
                                                    to={node.link || undefined}
                                                    onClick={node.link ? toggleDrawer(false) : undefined}
                                                    sx={{ mb: 0.5, borderRadius: 1, '&:hover': { bgcolor: 'rgba(245,124,0,0.08)' } }}>
                                                    <ListItemText primary={node.title} primaryTypographyProps={{ fontFamily: FONT, fontSize: '0.82rem', color: '#000', textAlign: 'start', lineHeight: 1.7 }} />
                                                </ListItemButton>
                                            );
                                        })
                                }
                            </List>
                        </Box>
                    ) : (
                        /* ═══ Main menu ═══ */
                        <List>
                            {/* 1. عن المعهد */}
                            <ListItemButton onClick={() => setMobileAboutOpen(!mobileAboutOpen)} sx={mobileHeaderSx(mobileAboutOpen)}>
                                <ListItemText primary={t('nav.about')} primaryTypographyProps={mobileHeaderTextProps} />
                                {mobileAboutOpen ? <ExpandMoreIcon sx={{ color: '#0865a8' }} /> : <ChevronRightIcon sx={{ color: '#0865a8' }} />}
                            </ListItemButton>
                            <Collapse in={mobileAboutOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding sx={{ paddingInlineStart: 2 }}>
                                    {aboutLinks.map(item => {
                                        const pdf = isPdfPath(item.path);
                                        return (
                                            <ListItemButton key={item.ar}
                                                component={pdf ? 'a' : Link}
                                                to={!pdf ? item.path : undefined}
                                                href={pdf ? item.path : undefined}
                                                target={pdf ? '_blank' : undefined}
                                                rel={pdf ? 'noopener noreferrer' : undefined}
                                                onClick={!pdf ? toggleDrawer(false) : undefined}
                                                sx={{ '&:hover': { bgcolor: 'rgba(245,124,0,0.08)' } }}>
                                                <ListItemText primary={label(item)} primaryTypographyProps={mobileSubTextProps} />
                                            </ListItemButton>
                                        );
                                    })}
                                </List>
                            </Collapse>
                            {mobileDivider}

                            {/* 2. الخطة التدريبية → opens the drill-down view */}
                            <ListItemButton onClick={() => { setDrillStack([]); setMobileView('courses'); }} sx={mobileHeaderSx(false)}>
                                <ListItemText primary={trainingPlanLabel} primaryTypographyProps={mobileHeaderTextProps} />
                                <ChevronLeftIcon sx={{ color: '#0865a8' }} />
                            </ListItemButton>
                            {mobileDivider}

                            {/* 3. الخدمات */}
                            <ListItemButton onClick={() => setMobileServicesOpen(!mobileServicesOpen)} sx={mobileHeaderSx(mobileServicesOpen)}>
                                <ListItemText primary={t('nav.services')} primaryTypographyProps={mobileHeaderTextProps} />
                                {mobileServicesOpen ? <ExpandMoreIcon sx={{ color: '#0865a8' }} /> : <ChevronRightIcon sx={{ color: '#0865a8' }} />}
                            </ListItemButton>
                            <Collapse in={mobileServicesOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding sx={{ paddingInlineStart: 2 }}>
                                    {serviceLinks.map(item => (
                                        <ListItemButton key={item.path} component={Link} to={item.path} onClick={toggleDrawer(false)} sx={{ '&:hover': { bgcolor: 'rgba(245,124,0,0.08)' } }}>
                                            <ListItemText primary={label(item)} primaryTypographyProps={mobileSubTextProps} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                            {mobileDivider}

                            {/* 4. المكتبة */}
                            <ListItemButton component={Link} to="/library" onClick={toggleDrawer(false)} sx={{ borderRadius: 1, mb: 0.5, '&:hover': { bgcolor: 'rgba(245,124,0,0.08)' } }}>
                                <ListItemText primary={t('nav.library')} primaryTypographyProps={mobileHeaderTextProps} />
                            </ListItemButton>
                            {mobileDivider}

                            {/* 5. الإعلام والميديا */}
                            <ListItemButton onClick={() => setMobileMediaOpen(!mobileMediaOpen)} sx={mobileHeaderSx(mobileMediaOpen)}>
                                <ListItemText primary={mediaLabel} primaryTypographyProps={mobileHeaderTextProps} />
                                {mobileMediaOpen ? <ExpandMoreIcon sx={{ color: '#0865a8' }} /> : <ChevronRightIcon sx={{ color: '#0865a8' }} />}
                            </ListItemButton>
                            <Collapse in={mobileMediaOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding sx={{ paddingInlineStart: 2 }}>
                                    {mediaLinks.map(item => (
                                        <ListItemButton key={item.path} component={Link} to={item.path} onClick={toggleDrawer(false)} sx={{ '&:hover': { bgcolor: 'rgba(245,124,0,0.08)' } }}>
                                            <ListItemText primary={label(item)} primaryTypographyProps={mobileSubTextProps} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                            {mobileDivider}

                            {/* 6. تواصل معنا */}
                            <ListItemButton component={Link} to="/contact" onClick={toggleDrawer(false)} sx={{ borderRadius: 1, mb: 0.5, '&:hover': { bgcolor: 'rgba(245,124,0,0.08)' } }}>
                                <ListItemText primary={contactLabel} primaryTypographyProps={mobileHeaderTextProps} />
                            </ListItemButton>

                            {/* My Courses */}
                            {authLoaded && <SignedIn>
                                {mobileDivider}
                                <ListItemButton component={Link} to="/my-courses" onClick={toggleDrawer(false)}
                                    sx={{ borderRadius: 1, mb: 0.5, bgcolor: 'rgba(8,101,168,0.05)', '&:hover': { bgcolor: 'rgba(8,101,168,0.12)' } }}>
                                    <MenuBookIcon sx={{ color: '#0865a8', marginInlineEnd: 1, fontSize: 20 }} />
                                    <ListItemText primary={t('nav.myCourses')} primaryTypographyProps={mobileHeaderTextProps} />
                                </ListItemButton>
                            </SignedIn>}

                            {/* Admin */}
                            {authLoaded && !adminLoading && isAdmin && (
                                <>
                                    <Divider sx={{ my: 2, bgcolor: '#f57c00', height: 2 }} />
                                    <ListItemButton component={Link} to="/admin" onClick={toggleDrawer(false)}
                                        sx={{ borderRadius: 1, mb: 0.5, bgcolor: '#f57c00', border: '2px solid #f57c00', '&:hover': { bgcolor: '#e65100', borderColor: '#e65100' }, transition: 'all 0.2s' }}>
                                        <AdminPanelSettingsIcon sx={{ color: '#fff', marginInlineEnd: 1, fontSize: 20 }} />
                                        <ListItemText primary={t('nav.adminPanel')} primaryTypographyProps={{ fontFamily: FONT, fontWeight: 'bold', color: '#fff', textAlign: 'start' }} />
                                    </ListItemButton>
                                </>
                            )}
                        </List>
                    )}
                </Box>
            </Drawer>

            <Box sx={{ height: { xs: 56, sm: 64, md: 70 } }} />
        </>
    );
};

export default Navbar;