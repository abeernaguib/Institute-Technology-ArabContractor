// MyCourses.jsx  — fully responsive 300px → 3000px
// ─────────────────────────────────────────────────────────────────────────────
// What changed vs. the old version:
//  • Every size that must change with the screen now lives in CSS classes
//    (inline styles can't use media queries) and uses clamp() so it scales smoothly.
//  • Container width grows with the screen (1200 → 2500px) instead of stopping at 1200.
//  • Course grid: 1 → 2 → 3 → 4 → 5 → 6 columns as the screen gets wider.
//  • Stats are a 3‑column grid that shrinks (no more wrapping/orphan card).
//  • Breadcrumb / hero offset use ONE variable: --mc-hdr (height of your site header).
//  • flex/grid children got min-width:0 so nothing is pushed outside the screen.
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, useUser, useAuth } from '@clerk/clerk-react';
import { Button } from '@mui/material';

const API_BASE = 'https://icemt.arabcont.com/api';

function resolveCertUrl(url) {
    if (!url) return null;
    if (url === 'uploaded') return null;
    if (url.startsWith('https://') || url.startsWith('http://')) return url;
    if (url.startsWith('/')) return `${API_BASE.replace('/api', '')}${url}`;
    return null;
}

// Normalise a raw cert object from the API
function normaliseCert(raw) {
    if (!raw) return null;
    const rawUrl = raw.fileUrl ?? raw.url ?? raw.filePath ?? raw.path ?? null;
    const url = resolveCertUrl(rawUrl);
    if (!url) return null;
    return {
        ...raw,
        url,
        rawUrl,
        name: raw.fileName ?? raw.filename ?? raw.name ?? null,
    };
}

const BookIcon = () => (
    <svg width="48" height="48" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const DownloadIcon = () => (
    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
    </svg>
);

// Helper: enroll in free course
export const enrollFreeCourse = async (planworkId, getToken) => {
    const token = await getToken();
    const res = await fetch(`${API_BASE}/course/enroll-free/${planworkId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || 'فشل التسجيل في الكورس');
    return data;
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
const MyCourses = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { getToken, isSignedIn } = useAuth();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [search, setSearch] = useState('');

    // certificates map: { [courseId]: normalisedCert | null }
    const [certificates, setCertificates] = useState({});
    const [certsLoading, setCertsLoading] = useState({});

    const userName = user?.firstName || user?.fullName?.split(' ')[0] || '';

    // ── Fetch enrollments ────────────────────────────────────────────────────
    const fetchMyCourses = useCallback(async () => {
        if (!isSignedIn) return [];
        setLoading(true);
        setError(null);
        try {
            const token = await getToken();
            const res = await fetch(`${API_BASE}/course/my-courses`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error('فشل تحميل الدورات');
            const data = await res.json();
            const mapped = data.map(e => ({
                id: e.childId,
                slug: e.slug || '',
                title: e.serviceTitle || e.title || '',
                place: e.coursePlace || e.place || '',
                // The round the user bought decides the date; old enrollments fall back to the legacy text
                date: e.roundStart
                    ? `${e.roundStart.replace(/-/g, '/')} - ${(e.roundEnd || e.roundStart).replace(/-/g, '/')}`
                    : (e.courseDate || e.date || ''),
                enrolledAt: e.enrolledAt || '',
                isFree: e.isFree === true ||
                    (e.orderId === null || e.orderId === undefined) ||
                    (!e.cost && !e.price && !e.amount),
            }));
            setCourses(mapped);
            return mapped;
        } catch (err) {
            setError(err.message);
            return [];
        } finally {
            setLoading(false);
        }
    }, [isSignedIn, getToken]);

    // ── Fetch ALL certificates with ONE request, then match by planworkId ────
    const fetchAllCerts = useCallback(async (courseList) => {
        if (!isSignedIn || !courseList?.length) return;
        const loadingMap = {};
        courseList.forEach(c => { loadingMap[c.id] = true; });
        setCertsLoading(loadingMap);
        try {
            const token = await getToken();
            const res = await fetch(`${API_BASE}/Admin/certificates`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = res.ok ? await res.json() : [];
            const list = Array.isArray(data) ? data : [data];
            const map = {};
            courseList.forEach(c => {
                const raw = list.find(x => String(x?.planworkId ?? x?.PlanworkId ?? '') === String(c.id));
                map[c.id] = normaliseCert(raw);
            });
            setCertificates(map);
        } catch {
            setCertificates({});
        } finally {
            setCertsLoading({});
        }
    }, [isSignedIn, getToken]);

    // Initial load
    useEffect(() => {
        if (isSignedIn) {
            fetchMyCourses().then(list => fetchAllCerts(list));
        }
    }, [isSignedIn, fetchMyCourses, fetchAllCerts]);

    // Refresh on enroll/cart events
    useEffect(() => {
        const onUpdate = () => fetchMyCourses().then(list => fetchAllCerts(list));
        window.addEventListener('enrollUpdated', onUpdate);
        window.addEventListener('cartUpdated', onUpdate);
        return () => {
            window.removeEventListener('enrollUpdated', onUpdate);
            window.removeEventListener('cartUpdated', onUpdate);
        };
    }, [fetchMyCourses, fetchAllCerts]);

    const filtered = courses.filter(c =>
        search.trim() === '' ||
        (c.title || '').toLowerCase().includes(search.toLowerCase())
    );

    const certCount = Object.values(certificates).filter(v => v !== null && v !== undefined).length;

    const stats = [
        { label: 'إجمالي الدورات', value: courses.length, icon: '📚' },
        { label: 'الدورات المسجلة', value: courses.length, icon: '🎓' },
        { label: 'الشهادات', value: certCount, icon: '📜' },
    ];

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700&display=swap" rel="stylesheet" />
            <style>{css}</style>
            <div dir="rtl" className="mc-page" style={styles.page}>

                {/* Breadcrumb */}
                <div className="mc-crumb">
                    <div className="mc-crumb-inner">
                        <a href="/" className="mc-crumb-link"
                            onMouseEnter={e => e.target.style.color = '#f57c00'}
                            onMouseLeave={e => e.target.style.color = '#0865a8'}>
                            الصفحة الرئيسية
                        </a>
                        <span style={{ color: '#6b7280' }}>•</span>
                        <span className="mc-crumb-current">دوراتي التدريبية</span>
                    </div>
                </div>

                <SignedOut>
                    <div className="mc-auth-gate">
                        <div className="mc-auth-card">
                            <div style={styles.authGateIcon}>🔒</div>
                            <h2 style={styles.authGateTitle}>تسجيل الدخول مطلوب</h2>
                            <p style={styles.authGateSub}>يجب تسجيل الدخول أولاً لعرض دوراتك التدريبية</p>
                            <SignInButton mode="modal">
                                <Button variant="contained" sx={{ fontFamily: '"Noto Kufi Arabic", serif', fontSize: '1rem', bgcolor: '#0865a8', color: '#ffffff', px: 4, py: 1.5, borderRadius: 5, textTransform: 'none', fontWeight: 600, '&:hover': { bgcolor: '#f57c00' } }}>
                                    تسجيل دخول
                                </Button>
                            </SignInButton>
                            <button style={styles.btnBrowse} onClick={() => navigate('/')}>
                                استعرض الدورات بدون تسجيل
                            </button>
                        </div>
                    </div>
                </SignedOut>

                <SignedIn>
                    {/* Hero */}
                    <div className="mc-hero">
                        <div style={styles.heroDeco1} />
                        <div style={styles.heroDeco2} />
                        <div style={styles.heroDeco3} />
                        <div className="mc-container">
                            <div className="mc-hero-top">
                                <div className="mc-avatar">📚</div>
                                <div>
                                    <p className="mc-greeting">مرحباً {userName}،</p>
                                    <h1 className="mc-hero-title">دوراتك التدريبية</h1>
                                </div>
                            </div>
                            <p className="mc-hero-sub">تابع رحلتك التعليمية — كل دوراتك في مكان واحد</p>
                            <div style={styles.heroDivider} />
                            <div className="mc-stats-row">
                                {stats.map((s, i) => (
                                    <div key={i} className="mc-stat-card">
                                        <span className="mc-stat-icon">{s.icon}</span>
                                        <span className="mc-stat-value">{s.value}</span>
                                        <span className="mc-stat-label">{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main */}
                    <div className="mc-main">
                        <div className="mc-container">
                            <div className="mc-toolbar">
                                <div className="mc-search">
                                    <svg style={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                                    </svg>
                                    <input
                                        className="mc-search-input"
                                        placeholder="ابحث في دوراتك..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                </div>
                                <button
                                    onClick={() => fetchMyCourses().then(list => fetchAllCerts(list))}
                                    className="mc-refresh-btn"
                                >
                                    🔄 تحديث
                                </button>
                            </div>

                            {loading ? (
                                <div style={styles.loadingWrap}>
                                    <div style={styles.spinner} />
                                    <p style={styles.loadingText}>جاري تحميل دوراتك...</p>
                                </div>
                            ) : error ? (
                                <div style={styles.errorWrap}>
                                    <div style={styles.emptyIcon}>⚠️</div>
                                    <h3 style={styles.emptyTitle}>{error}</h3>
                                    <button style={styles.emptyBtn} onClick={() => fetchMyCourses()}>إعادة المحاولة</button>
                                </div>
                            ) : filtered.length === 0 ? (
                                <EmptyState search={search} navigate={navigate} />
                            ) : (
                                <div className="mc-grid">
                                    {filtered.map(course => {
                                        const cert = certificates[course.id];   // normalised or null
                                        const isCertLoading = certsLoading[course.id];
                                        const hasCert = !!cert;
                                        const certUrl = cert?.url ?? '';

                                        return (
                                            <CourseCard
                                                key={course.id}
                                                course={course}
                                                cert={cert}
                                                certUrl={certUrl}
                                                hasCert={hasCert}
                                                isCertLoading={isCertLoading}
                                                hovered={hoveredCard === course.id}
                                                onHover={() => setHoveredCard(course.id)}
                                                onLeave={() => setHoveredCard(null)}
                                                navigate={navigate}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </SignedIn>
            </div>
        </>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// Course Card
// ─────────────────────────────────────────────────────────────────────────────
const CourseCard = ({
    course, cert, certUrl, hasCert, isCertLoading,
    hovered, onHover, onLeave, navigate,
}) => {
    const certName = cert?.name || `شهادة_${course.title || 'الدورة'}.pdf`;

    return (
        <div
            style={{ ...styles.card, ...(hovered ? styles.cardHover : {}) }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className="mc-card"
        >
            <div className="mc-card-header">
                <div style={{
                    ...styles.cardImgPlaceholder,
                    background: course.isFree
                        ? 'linear-gradient(135deg, #1a7a4a 0%, #34c77b 100%)'
                        : 'linear-gradient(135deg, #0865a8 0%, #f57c00 100%)',
                }}>
                    <div style={styles.iconWrapper}><BookIcon /></div>
                </div>
                <span className="mc-badge" style={course.isFree ? styles.badgeFree : styles.badgePaid}>
                    ✅ {course.isFree ? 'مجاني - مسجل' : 'مسجل'}
                </span>
                {hasCert && (
                    <div className="mc-cert-ribbon">📜 شهادة جاهزة</div>
                )}
            </div>

            <div className="mc-card-body">
                <h3 className="mc-card-title">{course.title}</h3>

                {course.place && (
                    <div className="mc-meta-row">
                        <svg style={styles.metaIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span style={styles.metaText}>{course.place}</span>
                    </div>
                )}
                {course.date && (
                    <div className="mc-meta-row">
                        <svg style={styles.metaIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span style={styles.metaText}>{course.date}</span>
                    </div>
                )}
                {course.enrolledAt && (
                    <div className="mc-meta-row">
                        <svg style={styles.metaIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span style={styles.metaText}>
                            تسجيل: {new Date(course.enrolledAt).toLocaleDateString('ar-EG')}
                        </span>
                    </div>
                )}

                {/* Certificate section */}
                <div style={{ ...styles.certSection, backgroundColor: hasCert ? '#faf5ff' : '#f9fafb', borderColor: hasCert ? '#e8d8ff' : '#e5e7eb' }}>
                    <div style={{ ...styles.certSectionHeader, color: hasCert ? '#7c3aed' : '#6b7280' }}>
                        <svg width="16" height="16" style={{ flexShrink: 0 }} fill="none" stroke={hasCert ? '#7c3aed' : '#9ca3af'} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        <span className="mc-cert-title" style={{ color: hasCert ? '#7c3aed' : '#6b7280' }}>
                            {isCertLoading
                                ? 'جاري التحقق من الشهادة...'
                                : hasCert
                                    ? 'شهادة الإتمام جاهزة 🎉'
                                    : 'الشهادة لم تُضاف بعد'}
                        </span>
                    </div>

                    {hasCert && !isCertLoading && certUrl && (
                        <div className="mc-cert-actions">
                            {/* Open in new tab */}
                            <a
                                href={certUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mc-cert-btn mc-cert-open"
                                onClick={e => e.stopPropagation()}
                            >
                                <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
                                <span>فتح</span>
                            </a>
                            {/* Download */}
                            <a
                                href={certUrl}
                                download={certName}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mc-cert-btn mc-cert-download"
                                onClick={e => e.stopPropagation()}
                            >
                                <DownloadIcon />
                                <span>تحميل الشهادة</span>
                            </a>
                        </div>
                    )}
                </div>

                <button
                    className="mc-cta"
                    style={hovered ? styles.ctaBtnHover : undefined}
                    onClick={() => { if (course.slug) navigate(`/course/${course.slug}`); }}
                >
                    ابدأ الدورة
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        style={{ marginRight: '8px', transform: 'rotate(180deg)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

const EmptyState = ({ search, navigate }) => (
    <div className="mc-empty">
        <div style={styles.emptyIcon}>{search ? '🔍' : '📭'}</div>
        <h3 style={styles.emptyTitle}>
            {search ? 'لا توجد دورات تطابق بحثك' : 'لم تنضم إلى أي دورة بعد'}
        </h3>
        <p style={styles.emptySub}>
            {search ? 'جرّب كلمات بحث مختلفة' : 'استعرض الدورات المتاحة وابدأ رحلتك التعليمية'}
        </p>
        {!search && (
            <button style={styles.emptyBtn} onClick={() => navigate('/')}>استعرض الدورات</button>
        )}
    </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Static styles only (things that never change with screen size)
// ─────────────────────────────────────────────────────────────────────────────
const styles = {
    page: { backgroundColor: '#f7f8fc', fontFamily: '"Noto Kufi Arabic", serif', direction: 'rtl' },
    heroDeco1: { position: 'absolute', top: '-60px', left: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' },
    heroDeco2: { position: 'absolute', bottom: '-80px', right: '-40px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(245,124,0,0.18)', pointerEvents: 'none' },
    heroDeco3: { position: 'absolute', top: '40px', right: '30%', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' },
    heroDivider: { width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)', marginBottom: 'clamp(16px, 1.5vw + 8px, 32px)' },
    searchIcon: { width: '18px', height: '18px', color: '#aaa', flexShrink: 0 },
    loadingWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', gap: '20px' },
    spinner: { width: '48px', height: '48px', border: '4px solid #e0e0e0', borderTopColor: '#0865a8', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
    loadingText: { fontSize: '16px', color: '#666', fontFamily: '"Noto Kufi Arabic", serif' },
    errorWrap: { textAlign: 'center', padding: '80px 20px' },
    card: { backgroundColor: '#fff', borderRadius: '16px', border: '2px solid #f0f0f0', boxShadow: '0 4px 14px rgba(0,0,0,0.06)', overflow: 'hidden', transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)', display: 'flex', flexDirection: 'column', minWidth: 0 },
    cardHover: { transform: 'translateY(-7px)', boxShadow: '0 14px 28px rgba(0,0,0,0.13)', borderColor: '#0865a8' },
    cardImgPlaceholder: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    iconWrapper: { borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', padding: 'clamp(14px, 1vw + 8px, 24px)', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.3)', display: 'flex' },
    badgePaid: { backgroundColor: '#0865a8', color: '#fff', boxShadow: '0 2px 8px rgba(8,101,168,0.35)' },
    badgeFree: { backgroundColor: '#1a7a4a', color: '#fff', boxShadow: '0 2px 8px rgba(26,122,74,0.35)' },
    metaIcon: { width: '15px', height: '15px', flexShrink: 0, color: '#0865a8' },
    metaText: { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', minWidth: 0 },
    certSection: { borderRadius: '12px', border: '1.5px solid', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '10px' },
    certSectionHeader: { display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 },
    ctaBtnHover: { transform: 'translateY(-2px)', boxShadow: '0 6px 18px rgba(8,101,168,0.32)' },
    emptyIcon: { fontSize: '64px', marginBottom: '16px' },
    emptyTitle: { fontSize: 'clamp(17px, 0.8vw + 14px, 26px)', fontWeight: 'bold', color: '#222', fontFamily: '"Noto Kufi Arabic", serif', margin: '0 0 10px' },
    emptySub: { fontSize: 'clamp(13px, 0.4vw + 12px, 18px)', color: '#777', fontFamily: '"Noto Kufi Arabic", serif', margin: '0 0 28px' },
    emptyBtn: { padding: '13px 36px', background: 'linear-gradient(135deg, #0865a8 0%, #f57c00 100%)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', fontFamily: '"Noto Kufi Arabic", serif', cursor: 'pointer' },
    authGateIcon: { fontSize: '64px' },
    authGateTitle: { fontSize: 'clamp(20px, 1vw + 14px, 30px)', fontWeight: 'bold', color: '#111', fontFamily: '"Noto Kufi Arabic", serif', margin: 0 },
    authGateSub: { fontSize: 'clamp(13px, 0.4vw + 12px, 17px)', color: '#666', fontFamily: '"Noto Kufi Arabic", serif', margin: 0 },
    btnBrowse: { marginTop: '4px', width: '100%', padding: '10px 24px', backgroundColor: 'transparent', color: '#888', border: '1.5px solid #ddd', borderRadius: '10px', fontSize: '14px', fontFamily: '"Noto Kufi Arabic", serif', cursor: 'pointer' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Responsive CSS
// ─────────────────────────────────────────────────────────────────────────────
const css = `
  * { font-family: "Noto Kufi Arabic", serif !important; box-sizing: border-box; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  /* ── Tokens ─────────────────────────────────────────────────────────────
     --mc-hdr : height of your SITE header (the fixed one above the breadcrumb).
                Change these two numbers if your header height is different.   */
  .mc-page {
    --mc-hdr: 70px;
    --mc-gutter: clamp(14px, 1.6vw + 6px, 40px);
    min-height: 100vh;
    min-height: 100dvh;
    overflow-x: clip;
  }
  @media (max-width: 640px) { .mc-page { --mc-hdr: 90px; } }

  /* ── Container: grows with the screen ─────────────────────────────────── */
  .mc-container { width: 100%; max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
  @media (min-width: 1440px) { .mc-container { max-width: 1360px; } }
  @media (min-width: 1700px) { .mc-container { max-width: 1560px; } }
  @media (min-width: 2000px) { .mc-container { max-width: 1800px; } }
  @media (min-width: 2300px) { .mc-container { max-width: 2100px; } }
  @media (min-width: 2800px) { .mc-container { max-width: 2500px; } }

  /* ── Breadcrumb ───────────────────────────────────────────────────────── */
  .mc-crumb {
    position: fixed; top: var(--mc-hdr); left: 0; right: 0; z-index: 50;
    border-bottom: 1px solid #d1d5db; background-color: #f5f5f5;
    padding: 8px var(--mc-gutter);
  }
  .mc-crumb-inner {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    font-size: clamp(12px, 0.5vw + 10px, 20px);
    white-space: nowrap; overflow: hidden; min-width: 0;
  }
  .mc-crumb-link { color: #0865a8; font-weight: 700; text-decoration: none; flex-shrink: 0; }
  .mc-crumb-current { color: #374151; min-width: 0; overflow: hidden; text-overflow: ellipsis; }

  /* ── Hero ─────────────────────────────────────────────────────────────── */
  .mc-hero {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, #05416d 0%, #0865a8 45%, #c96000 100%);
    padding: calc(var(--mc-hdr) + 56px) var(--mc-gutter) clamp(28px, 3vw + 16px, 72px);
  }
  .mc-hero-top {
    display: flex; align-items: center;
    gap: clamp(12px, 1.2vw + 6px, 24px);
    margin-bottom: clamp(10px, 1vw + 6px, 18px);
  }
  .mc-hero-top > div:last-child { min-width: 0; }
  .mc-avatar {
    width: clamp(48px, 2.6vw + 32px, 96px); height: clamp(48px, 2.6vw + 32px, 96px);
    border-radius: 50%; flex-shrink: 0;
    background: rgba(255,255,255,0.2); border: 2.5px solid rgba(255,255,255,0.5);
    backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    font-size: clamp(20px, 1.2vw + 14px, 42px);
  }
  .mc-greeting {
    margin: 0; font-weight: bold; color: #fff;
    font-size: clamp(15px, 0.6vw + 14px, 28px);
    overflow-wrap: anywhere;
  }
  .mc-hero-title {
    margin: 4px 0 0; font-weight: bold; color: #fff; line-height: 1.3;
    font-size: clamp(22px, 1.2vw + 18px, 48px);
    overflow-wrap: anywhere;
  }
  .mc-hero-sub {
    margin: 0 0 clamp(16px, 1.5vw + 8px, 28px);
    color: rgba(255,255,255,0.8); line-height: 1.7;
    font-size: clamp(13px, 0.4vw + 12px, 22px);
  }

  /* ── Stats: always a tidy 3-up grid ───────────────────────────────────── */
  .mc-stats-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(8px, 1.2vw, 24px);
  }
  @media (min-width: 641px) {
    .mc-stats-row { grid-template-columns: repeat(3, minmax(0, clamp(140px, 14vw, 280px))); }
  }
  .mc-stat-card {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; gap: clamp(3px, 0.4vw, 8px); min-width: 0;
    background-color: rgba(255,255,255,0.12);
    backdrop-filter: blur(12px);
    border: 1.5px solid rgba(255,255,255,0.25);
    border-radius: clamp(12px, 0.8vw + 6px, 24px);
    padding: clamp(10px, 1vw + 6px, 28px) clamp(4px, 1.4vw, 28px);
  }
  .mc-stat-icon  { font-size: clamp(20px, 1vw + 14px, 38px); line-height: 1; }
  .mc-stat-value { font-size: clamp(22px, 1.2vw + 16px, 46px); font-weight: bold; color: #fff; line-height: 1; }
  .mc-stat-label { font-size: clamp(11px, 0.3vw + 9px, 18px); color: rgba(255,255,255,0.85); line-height: 1.4; overflow-wrap: anywhere; }

  /* ── Main + toolbar ───────────────────────────────────────────────────── */
  .mc-main { padding: clamp(20px, 2vw + 12px, 56px) var(--mc-gutter) clamp(40px, 3vw + 24px, 90px); }
  .mc-toolbar {
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;
    gap: 12px 16px;
    margin-bottom: clamp(18px, 1.5vw + 10px, 36px);
    background-color: #fff; border: 1.5px solid #ebebeb;
    border-radius: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    padding: clamp(10px, 0.6vw + 8px, 20px) clamp(12px, 0.8vw + 8px, 24px);
  }
  .mc-search {
    display: flex; align-items: center; gap: 10px;
    flex: 1 1 220px; min-width: 0;
    background-color: #f7f8fc; border: 1.5px solid #e0e0e0;
    border-radius: 10px; padding: 8px 14px;
  }
  .mc-search-input {
    border: none; background: transparent; outline: none; direction: rtl;
    flex: 1; min-width: 0; width: 100%; color: #333;
    font-size: clamp(13px, 0.3vw + 12px, 17px);
  }
  .mc-refresh-btn {
    padding: 8px 20px; border-radius: 10px; border: 1.5px solid #e0e0e0;
    background-color: #fff; color: #555; cursor: pointer;
    font-size: clamp(13px, 0.3vw + 12px, 17px);
  }
  @media (max-width: 640px) {
    .mc-toolbar { flex-direction: column; align-items: stretch; }
    .mc-search { flex: 0 0 auto; }
    .mc-refresh-btn { width: 100%; }
  }

  /* ── Course grid: 1 → 2 → 3 → 4 → 5 → 6 columns ───────────────────────── */
  .mc-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(16px, 1.4vw + 8px, 36px);
  }
  @media (min-width: 641px)  { .mc-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1025px) { .mc-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  @media (min-width: 1700px) { .mc-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  @media (min-width: 2300px) { .mc-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); } }
  @media (min-width: 2800px) { .mc-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); } }

  /* ── Card ─────────────────────────────────────────────────────────────── */
  .mc-card-header { position: relative; overflow: hidden; height: clamp(130px, 5vw + 90px, 220px); }
  .mc-badge {
    position: absolute; top: 12px; right: 12px; border-radius: 8px; padding: 5px 12px;
    font-weight: bold; font-size: clamp(11px, 0.2vw + 10px, 15px);
  }
  .mc-cert-ribbon {
    position: absolute; bottom: 12px; left: 12px; color: #fff; font-weight: bold;
    background: linear-gradient(135deg, #7c3aed, #9f67f5);
    border-radius: 8px; padding: 4px 12px; box-shadow: 0 2px 8px rgba(124,58,237,0.4);
    font-size: clamp(10px, 0.2vw + 9px, 14px);
  }
  .mc-card-body {
    flex: 1; min-width: 0; display: flex; flex-direction: column;
    gap: clamp(10px, 0.5vw + 8px, 16px);
    padding: clamp(14px, 0.8vw + 10px, 26px);
  }
  .mc-card-title {
    margin: 0; font-weight: bold; color: #111; line-height: 1.5;
    font-size: clamp(15px, 0.35vw + 13px, 22px);
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    overflow-wrap: anywhere;
  }
  .mc-meta-row {
    display: flex; align-items: center; gap: 8px; min-width: 0; color: #555;
    font-size: clamp(12px, 0.25vw + 10.5px, 16px);
  }
  .mc-cert-title { font-weight: bold; font-size: clamp(12px, 0.25vw + 10.5px, 16px); min-width: 0; }

  .mc-cert-actions { display: flex; flex-wrap: wrap; gap: 8px; }
  .mc-cert-btn {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    border-radius: 8px; font-weight: bold; text-decoration: none; cursor: pointer;
    transition: all 0.2s ease; white-space: nowrap;
    font-size: clamp(12px, 0.2vw + 10.5px, 15px);
  }
  .mc-cert-open {
    flex: 1 1 70px; padding: 8px 10px;
    background: rgba(124,58,237,0.1); color: #7c3aed; border: 1.5px solid rgba(124,58,237,0.3);
  }
  .mc-cert-download {
    flex: 2 1 130px; padding: 9px 14px; border: none; color: #fff;
    background: linear-gradient(135deg, #7c3aed 0%, #9f67f5 100%);
    box-shadow: 0 3px 10px rgba(124,58,237,0.3);
  }
  .mc-cert-download:hover { opacity: 0.9; transform: translateY(-1px); }

  .mc-cta {
    margin-top: auto; width: 100%; border: none; border-radius: 10px; color: #fff; cursor: pointer;
    background: linear-gradient(135deg, #0865a8 0%, #f57c00 100%);
    display: flex; align-items: center; justify-content: center;
    font-weight: bold; transition: all 0.3s ease;
    padding: clamp(10px, 0.4vw + 9px, 16px) 20px;
    font-size: clamp(14px, 0.3vw + 12px, 19px);
  }

  /* ── Empty state / auth gate ──────────────────────────────────────────── */
  .mc-empty {
    text-align: center; background-color: #fff; border-radius: 16px; border: 2px dashed #d0dce8;
    padding: clamp(40px, 4vw + 20px, 110px) clamp(16px, 2vw, 40px);
  }
  .mc-auth-gate {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; min-height: 100dvh;
    padding: calc(var(--mc-hdr) + 70px) var(--mc-gutter) 60px;
  }
  .mc-auth-card {
    background-color: #fff; border-radius: 20px; box-shadow: 0 8px 40px rgba(0,0,0,0.1);
    text-align: center; width: 100%; max-width: clamp(300px, 30vw, 560px);
    display: flex; flex-direction: column; align-items: center; gap: 16px;
    padding: clamp(28px, 4vw, 56px) clamp(18px, 3.5vw, 48px);
  }

  /* ── Extra-small phones (≤360px) ──────────────────────────────────────── */
  @media (max-width: 360px) {
    .mc-hero-top { gap: 10px; }
    .mc-badge { top: 8px; right: 8px; padding: 4px 8px; }
    .mc-cert-ribbon { bottom: 8px; left: 8px; padding: 3px 8px; }
  }

  @media (prefers-reduced-motion: reduce) {
    * { transition: none !important; animation-duration: 0.01ms !important; }
  }
`;

export default MyCourses;