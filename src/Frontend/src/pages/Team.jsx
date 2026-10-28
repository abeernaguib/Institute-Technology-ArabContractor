import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// Adjust this path to where your richText utils live
import { decodeRichText, parseHTMLContent } from "../utils/richText";

const API_URL = 'https://icemt.arabcont.com/api/Team';

const FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23dde3ea' width='300' height='300'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='120' fill='%23899aaa'%3E%F0%9F%91%A4%3C/text%3E%3C/svg%3E";

/* ─── Design tokens ──────────────────────── */
const T = {
    orange: '#f57c00',
    orangeLight: '#ff9a3c',
    orangeDark: '#bf5200',
    blue: '#0865a8',
    blueLight: '#1a84d4',
    blueDark: '#044478',
    black: '#0a0a0a',
    white: '#ffffff',
    gray50: '#f8f9fa',
    gray100: '#f0f1f2',
    gray300: '#d0d3d8',
    gray500: '#6b7280',
    gray700: '#374151',
    font: '"Noto Kufi Arabic", serif',
};

/* ─── Styles ─────────────────────────────── */
const STYLES = `
    .team-root { direction: rtl; font-family: ${T.font}; background: ${T.white}; overflow-x: hidden; }

    /* hero grid overlay */
    .team-hero-grid::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image:
            linear-gradient(rgba(245,124,0,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,124,0,0.07) 1px, transparent 1px);
        background-size: 56px 56px;
        pointer-events: none;
    }

    /* card hover effects */
    .team-card { transition: transform 0.38s cubic-bezier(.4,0,.2,1), box-shadow 0.38s cubic-bezier(.4,0,.2,1), border-color 0.38s cubic-bezier(.4,0,.2,1); }
    .team-card:hover { transform: translateY(-8px) !important; box-shadow: 0 18px 48px rgba(0,0,0,0.18) !important; border-color: ${T.orange} !important; }
    .team-card--large:hover { border-color: ${T.blue} !important; box-shadow: 0 20px 56px rgba(8,101,168,0.22) !important; }

    /* right accent bar */
    .team-card::before { content: ''; position: absolute; top:0; right:0; width:4px; height:100%; background:${T.orange}; transform:scaleY(0); transform-origin:bottom; transition:transform 0.38s cubic-bezier(.4,0,.2,1); z-index:2; }
    .team-card--large::before { background:${T.blue}; }
    .team-card:hover::before { transform: scaleY(1); }

    /* gradient bar between image and body */
    .team-card__bar { height:4px; background:linear-gradient(to left,${T.orange},${T.blue}); transform:scaleX(0); transform-origin:right; transition:transform 0.38s cubic-bezier(.4,0,.2,1); }
    .team-card:hover .team-card__bar { transform:scaleX(1); }

    /* image zoom */
    .team-card__img { transition: transform 0.5s cubic-bezier(.4,0,.2,1); }
    .team-card:hover .team-card__img { transform:scale(1.06); }

    /* image overlay fade */
    .team-card__overlay { transition: opacity 0.38s cubic-bezier(.4,0,.2,1); }
    .team-card:hover .team-card__overlay { opacity:1 !important; }

    /* name color flip */
    .team-card__name { transition: color 0.3s; }
    .team-card:hover .team-card__name { color:${T.orange} !important; }

    /* CV button on the card */
    .team-card__cv {
        margin-top: 12px;
        background: ${T.orange};
        color: ${T.white};
        border: none;
        border-radius: 4px;
        padding: 9px 18px;
        font-family: ${T.font};
        font-size: clamp(12px,1.4vw,14px);
        font-weight: 700;
        cursor: pointer;
        transition: background 0.25s, opacity 0.25s;
    }
    .team-card__cv:hover { background: ${T.orangeDark}; }
    .team-card__cv:disabled { opacity: 0.6; cursor: wait; }

    /* breadcrumb link */
    .bc-link { transition:color 0.25s; }
    .bc-link:hover { color:${T.orange} !important; }

    /* hero diagonal */
    .hero-cut::after { content:''; position:absolute; bottom:-2px; left:0; right:0; height:clamp(40px,8vw,110px); background:${T.white}; clip-path:polygon(0 100%,100% 0,100% 100%); }
    .chairman-cut::after { content:''; position:absolute; bottom:-2px; left:0; right:0; height:clamp(40px,8vw,110px); background:${T.blue}; clip-path:polygon(0 100%,100% 0,100% 100%); }
    .team-cut::after { content:''; position:absolute; bottom:-2px; left:0; right:0; height:clamp(40px,8vw,110px); background:${T.black}; clip-path:polygon(0 100%,100% 0,100% 100%); }

    /* ───────── Org tree (pyramid) ───────── */
    .org-tree { display:flex; flex-direction:column; align-items:center; }
    .org-top { display:flex; justify-content:center; flex-wrap:wrap; gap:24px; width:100%; }

    /* vertical line from the director down to the horizontal bar */
    .org-stem { width:2px; height:40px; background:${T.orangeLight}; }

    .org-level { display:flex; justify-content:center; width:100%; }

    .org-branch {
        position:relative;
        flex:0 1 360px;
        display:flex;
        justify-content:center;
        padding:40px clamp(10px,2.5vw,30px) 0;
    }
    /* horizontal bar */
    .org-branch::before {
        content:'';
        position:absolute;
        top:0;
        inset-inline-start:0;
        inset-inline-end:0;
        height:2px;
        background:${T.orangeLight};
    }
    /* vertical drop to the card */
    .org-branch::after {
        content:'';
        position:absolute;
        top:0; left:50%;
        width:2px; height:40px;
        transform:translateX(-50%);
        background:${T.orangeLight};
    }
    /* the bar stops at the center on the outer edges so it forms a clean "T" */
    .org-branch:first-child::before { inset-inline-start:50%; inset-inline-end:0; }
    .org-branch:last-child::before  { inset-inline-start:0; inset-inline-end:50%; }
    .org-branch:only-child::before  { display:none; }

    /* little dot where the stem meets the bar */
    .org-dot {
        width:12px; height:12px; border-radius:50%;
        background:${T.orange};
        box-shadow:0 0 0 4px rgba(245,124,0,0.25);
        margin-top:-1px;
    }

    @media (max-width:700px) {
        .org-level { flex-direction:column; align-items:center; }
        .org-branch { flex:0 0 auto; width:100%; max-width:340px; }
        .org-branch::before { display:none; }
        .org-branch:not(:first-child)::after { height:32px; }
        .org-branch { padding-top:32px; }
    }

    /* ───────── CV dialog ───────── */
    .cv-overlay {
        position:fixed; inset:0; z-index:1000;
        background:rgba(0,0,0,0.55);
        overflow-y:auto;
        display:flex; align-items:flex-start; justify-content:center;
        padding:90px 16px 40px;
    }
    .cv-modal {
        width:100%; max-width:760px; margin:auto 0;
        background:${T.white}; border-radius:16px; overflow:hidden;
        box-shadow:0 24px 64px rgba(0,0,0,0.35);
        font-family:${T.font};
    }
    .cv-head {
        position:relative; text-align:center; padding:28px 20px;
        background:linear-gradient(135deg, ${T.blueDark}, ${T.blue});
    }
    .cv-close {
        position:absolute; top:14px; left:14px;
        width:38px; height:38px; border:none; border-radius:50%;
        background:rgba(255,255,255,0.15); color:${T.white};
        font-size:20px; line-height:1; cursor:pointer;
    }
    .cv-close:hover { background:rgba(255,255,255,0.3); }
    .cv-photo {
        display:block; margin:0 auto 14px;
        width:96px; height:96px; border-radius:50%; object-fit:cover;
        border:4px solid ${T.white}; background:#e5e7eb;
    }
    .cv-name { margin:0 0 6px; font-size:clamp(18px,2.4vw,24px); font-weight:800; color:${T.white}; }
    .cv-role { margin:0; font-size:clamp(12px,1.5vw,15px); color:rgba(255,255,255,0.85); line-height:1.7; }
    .cv-body { padding:24px; max-height:calc(100vh - 280px); overflow-y:auto; }
    .cv-section { margin-bottom:22px; }
    .cv-section-title { margin:0 0 10px; font-size:18px; font-weight:800; color:${T.blue}; }
    .cv-box { border:1px solid ${T.gray300}; background:#fffbeb; border-radius:8px; padding:14px 16px; }
    .cv-sub { margin:0 0 8px; font-size:14px; font-weight:700; color:${T.blue}; overflow-wrap:anywhere; }
    .cv-item { display:flex; align-items:flex-start; gap:8px; margin-bottom:8px; }
    .cv-dot { flex-shrink:0; width:8px; height:8px; margin-top:9px; border-radius:50%; background:${T.orange}; }
    .cv-text { margin:0; min-width:0; font-size:14px; line-height:1.8; color:${T.gray700}; overflow-wrap:anywhere; }
    .cv-contact { margin:0; font-size:14px; color:${T.gray700}; overflow-wrap:anywhere; }
    .cv-contact b { color:${T.black}; }
    .cv-close-btn {
        width:100%; border:none; border-radius:8px; padding:12px;
        background:${T.orange}; color:${T.white};
        font-family:${T.font}; font-size:15px; font-weight:700; cursor:pointer;
    }
    .cv-close-btn:hover { background:${T.orangeDark}; }
`;

/* ─── Sub-components ─────────────────────── */

const SectionLabel = ({ light = false, children }) => (
    <span style={{
        display: 'inline-block',
        background: light ? 'rgba(255,255,255,0.12)' : T.orange,
        color: light ? T.orangeLight : T.white,
        fontFamily: T.font,
        fontSize: 'clamp(10px,1.2vw,13px)',
        fontWeight: 700,
        padding: '5px 18px',
        borderRadius: '2px',
        marginBottom: '10px',
        letterSpacing: '0.05em',
    }}>
        {children}
    </span>
);

const SectionHeading = ({ light = false, children }) => (
    <h2 style={{
        fontSize: 'clamp(20px,3vw,38px)',
        fontWeight: 900,
        color: light ? T.white : T.black,
        fontFamily: T.font,
        lineHeight: 1.35,
        marginBottom: '10px',
    }}>
        {children}
    </h2>
);

const HeadingBar = ({ light = false }) => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: 'clamp(28px,4.5vw,50px)' }}>
        <div style={{ width: '52px', height: '4px', background: light ? T.orangeLight : T.orange, borderRadius: '2px' }} />
    </div>
);

/* ─── Member Card ────────────────────────── */
const MemberCard = ({ member, large = false, onOpenCv, loadingCv = false }) => (
    <motion.div
        className={`team-card ${large ? 'team-card--large' : ''}`}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{
            width: '100%',
            maxWidth: large ? '340px' : '300px',
            background: T.white,
            borderRadius: '3px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: T.font,
            position: 'relative',
            border: large ? `2px solid ${T.orange}` : `1.5px solid ${T.gray100}`,
            boxShadow: large
                ? `0 10px 36px rgba(8,101,168,0.18)`
                : `0 2px 12px rgba(0,0,0,0.07)`,
        }}
    >
        {/* Image */}
        <div style={{ position: 'relative', width: '100%', paddingTop: '100%', overflow: 'hidden' }}>
            <img
                src={member.pic || FALLBACK}
                alt={member.name}
                className="team-card__img"
                onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK; }}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
                className="team-card__overlay"
                style={{
                    position: 'absolute', inset: 0, opacity: 0,
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(4,68,120,0.55) 100%)',
                }}
            />
        </div>

        {/* Gradient bar */}
        <div className="team-card__bar" />

        {/* Body */}
        <div style={{ padding: 'clamp(14px,2.5vw,22px) clamp(12px,2vw,18px) clamp(16px,2.5vw,24px)', textAlign: 'center', flex: 1 }}>
            <h3
                className="team-card__name"
                style={{
                    fontSize: large ? 'clamp(16px,2vw,20px)' : 'clamp(14px,1.8vw,18px)',
                    fontWeight: 700,
                    color: T.blue,
                    fontFamily: T.font,
                    marginBottom: '6px',
                }}
            >
                {member.name}
            </h3>
            <p style={{
                fontSize: 'clamp(11px,1.4vw,14px)',
                color: T.gray500,
                fontFamily: T.font,
                lineHeight: 1.65,
                minHeight: '38px',
                margin: 0,
            }}>
                {member.role}
            </p>

            {member.hasCv && (
                <button
                    type="button"
                    className="team-card__cv"
                    disabled={loadingCv}
                    onClick={() => onOpenCv && onOpenCv(member.id)}
                >
                    {loadingCv ? 'جاري التحميل...' : 'السيرة الذاتية'}
                </button>
            )}
        </div>
    </motion.div>
);

/* ─── CV helpers + dialog ────────────────── */
const renderSections = (html) => {
    const sections = parseHTMLContent(html);
    if (!sections.length) return null;
    return sections.map((section, sIdx) => (
        <div key={sIdx} style={{ marginTop: sIdx > 0 ? 18 : 0 }}>
            {section.title && <p className="cv-sub">{section.title}</p>}
            {section.items.map((item, iIdx) => (
                <div className="cv-item" key={iIdx}>
                    <span className="cv-dot" />
                    <p className="cv-text">{item}</p>
                </div>
            ))}
        </div>
    ));
};

const CVDialog = ({ member, onClose }) => {
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [onClose]);

    const detailsContent = renderSections(member.details);
    const isEmpty = !detailsContent && !member.email;

    return (
        <div className="cv-overlay" onClick={onClose}>
            <div className="cv-modal" onClick={(e) => e.stopPropagation()}>
                <div className="cv-head">
                    <button type="button" className="cv-close" onClick={onClose} aria-label="إغلاق">✕</button>
                    <img
                        className="cv-photo"
                        src={member.pic || FALLBACK}
                        alt={member.name}
                        onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK; }}
                    />
                    <h2 className="cv-name">{member.name}</h2>
                    {member.role && <p className="cv-role">{member.role}</p>}
                </div>

                <div className="cv-body">
                    {detailsContent && (
                        <div className="cv-section">
                            <h3 className="cv-section-title">المؤهلات والخبرات</h3>
                            <div className="cv-box">{detailsContent}</div>
                        </div>
                    )}

                    {member.email && (
                        <div className="cv-section">
                            <h3 className="cv-section-title">وسائل الإتصال</h3>
                            <div className="cv-box">
                                <p className="cv-contact"><b>البريد الإلكتروني: </b><bdi>{member.email}</bdi></p>
                            </div>
                        </div>
                    )}

                    {isEmpty && (
                        <p className="cv-text" style={{ textAlign: 'center', marginBottom: 20 }}>
                            لا توجد بيانات متاحة حالياً
                        </p>
                    )}

                    <button type="button" className="cv-close-btn" onClick={onClose}>إغلاق</button>
                </div>
            </div>
        </div>
    );
};

/* ─── Main Component ─────────────────────── */
const Team = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [cvMember, setCvMember] = useState(null);
    const [cvLoadingId, setCvLoadingId] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                setLoading(true);
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error('فشل في تحميل بيانات فريق العمل');
                const data = await res.json();
                // Defensive: hide inactive members even if the API returns them
                setMembers(Array.isArray(data) ? data.filter(m => m.isActive !== false) : []);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    // Fetches the full record (details + email) on demand and opens the dialog
    const openCv = async (id) => {
        try {
            setCvLoadingId(id);
            const res = await fetch(`${API_URL}/${id}`);
            if (!res.ok) throw new Error('failed');
            const d = await res.json();
            setCvMember({ ...d, details: decodeRichText(d.details) });
        } catch {
            alert('حدث خطأ في تحميل السيرة الذاتية');
        } finally {
            setCvLoadingId(null);
        }
    };

    const closeCv = useCallback(() => setCvMember(null), []);

    const cardProps = (m) => ({ member: m, onOpenCv: openCv, loadingCv: cvLoadingId === m.id });

    // The API already returns them ordered by level then display order.
    // Number() so it works whether the API sends 2 or "2".
    const chairmen = members.filter(m => Number(m.level) === 1);
    const directors = members.filter(m => Number(m.level) === 2);
    const deputies = members.filter(m => Number(m.level) === 3);
    const hasExecutive = directors.length > 0 || deputies.length > 0;

    const sectionInner = {
        maxWidth: 'min(1280px, 94vw)',
        margin: '0 auto',
    };

    return (
        <div className="team-root">
            <style>{STYLES}</style>

            {/* ══ FIXED BREADCRUMB BAR ════════════════ */}
            <div style={{
                position: 'fixed',
                top: 70,
                zIndex: 40,
                width: '100%',
                borderBottom: `1px solid ${T.gray300}`,
                backgroundColor: '#f5f5f5',
                padding: '8px 16px',
                fontFamily: T.font,
            }}>
                <div style={{ textAlign: 'center' }}>
                    <span>
                        <Link to="/" className="bc-link" style={{ fontWeight: 700, textDecoration: 'none', color: T.blue, marginLeft: '12px' }}>الصفحة الرئيسية</Link>
                        <span style={{ color: T.gray500, margin: '0 6px' }}> - </span>
                        <span style={{ color: T.gray700, marginRight: '12px' }}>فريق العمل</span>
                    </span>
                </div>
            </div>

            {/* ══ HERO ════════════════════════════════ */}
            <section
                className="team-hero-grid hero-cut"
                style={{
                    position: 'relative',
                    minHeight: 'clamp(300px,44vw,520px)',
                    background: T.blueDark,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    padding: 'clamp(130px,16vw,180px) clamp(20px,6vw,80px) clamp(90px,12vw,140px)',
                }}
            >
                <div style={{
                    position: 'absolute', top: 0, right: 0,
                    width: 'clamp(6px,0.8vw,10px)', height: '100%',
                    background: `linear-gradient(to bottom, ${T.orange}, ${T.orangeLight})`,
                }} />

                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '720px', width: '100%' }}>
                    <span style={{
                        display: 'inline-block',
                        background: T.orange,
                        color: T.white,
                        fontFamily: T.font,
                        fontSize: 'clamp(10px,1.3vw,14px)',
                        fontWeight: 700,
                        padding: '6px 22px',
                        borderRadius: '2px',
                        marginBottom: 'clamp(12px,2.5vw,24px)',
                        letterSpacing: '0.05em',
                    }}>
                        المعهد التكنولوجي لهندسة التشييد والإدارة
                    </span>

                    <h1 style={{
                        fontSize: 'clamp(24px,4.5vw,58px)',
                        fontWeight: 900,
                        color: T.white,
                        fontFamily: T.font,
                        lineHeight: 1.3,
                        marginBottom: 'clamp(12px,2vw,20px)',
                    }}>
                        فريق{' '}
                        <span style={{ color: T.orangeLight }}>العمل</span>
                    </h1>

                    <p style={{
                        fontSize: 'clamp(12px,1.6vw,17px)',
                        color: 'rgba(255,255,255,0.65)',
                        fontFamily: T.font,
                        lineHeight: 1.9,
                    }}>
                        لدينا فريق عمل على أعلى مستوى من الكفاءة والخبرة
                    </p>
                </div>
            </section>

            {/* ══ LOADING / ERROR ═════════════════════ */}
            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 20px' }}>
                    <div style={{ textAlign: 'center', fontFamily: T.font }}>
                        <div style={{
                            width: 56, height: 56, margin: '0 auto 16px',
                            border: `4px solid ${T.gray100}`, borderBottomColor: T.blue,
                            borderRadius: '50%', animation: 'team-spin 1s linear infinite',
                        }} />
                        <style>{`@keyframes team-spin { to { transform: rotate(360deg); } }`}</style>
                        <p style={{ color: T.gray700 }}>جاري تحميل فريق العمل...</p>
                    </div>
                </div>
            )}

            {!loading && error && (
                <div style={{ maxWidth: 560, margin: '60px auto', padding: '0 20px', fontFamily: T.font }}>
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: 24, textAlign: 'center' }}>
                        <p style={{ color: '#b91c1c', fontWeight: 700, marginBottom: 6 }}>حدث خطأ</p>
                        <p style={{ color: '#dc2626', margin: 0 }}>{error}</p>
                    </div>
                </div>
            )}

            {!loading && !error && members.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 20px', fontFamily: T.font, color: T.gray500 }}>
                    لا توجد بيانات متاحة حالياً
                </div>
            )}

            {/* ══ CHAIRMAN SECTION (top of the pyramid) ══ */}
            {!loading && !error && chairmen.length > 0 && (
                <section
                    className="chairman-cut"
                    style={{
                        position: 'relative',
                        background: T.white,
                        padding: 'clamp(56px,8vw,100px) clamp(16px,6vw,60px) clamp(100px,14vw,160px)',
                    }}
                >
                    <div style={sectionInner}>
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,5vw,56px)' }}>
                            <SectionLabel>القيادة العليا</SectionLabel><br />
                            <SectionHeading>
                                رئيس <span style={{ color: T.orange }}>مجلس الإدارة</span>
                            </SectionHeading>
                            <HeadingBar />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 24 }}>
                            {chairmen.map(m => <MemberCard key={m.id} {...cardProps(m)} large={true} />)}
                        </div>
                    </div>
                </section>
            )}

            {/* ══ CONNECTOR: chairman → director ══════ */}
            {!loading && !error && chairmen.length > 0 && hasExecutive && (
                <div style={{
                    position: 'relative', zIndex: 10,
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    marginTop: '-28px', marginBottom: '-28px',
                    pointerEvents: 'none',
                }}>
                    <div style={{
                        width: '2px',
                        height: 'clamp(40px,6vw,70px)',
                        background: `linear-gradient(to bottom, ${T.white}, ${T.orangeLight})`,
                        opacity: 0.7,
                    }} />
                    <div style={{
                        width: '12px', height: '12px',
                        borderRadius: '50%',
                        background: T.orange,
                        boxShadow: `0 0 0 4px rgba(245,124,0,0.25)`,
                    }} />
                </div>
            )}

            {/* ══ EXECUTIVE SECTION: director → deputies ══ */}
            {!loading && !error && hasExecutive && (
                <section
                    className="team-cut"
                    style={{
                        position: 'relative',
                        background: T.blue,
                        padding: 'clamp(80px,12vw,150px) clamp(16px,6vw,60px) clamp(100px,14vw,160px)',
                    }}
                >
                    <div style={sectionInner}>
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,5vw,56px)' }}>
                            <SectionLabel light>الإدارة التنفيذية</SectionLabel><br />
                            <SectionHeading light>
                                القيادات{' '}
                                <span style={{ color: T.orangeLight }}>التنفيذية</span>
                            </SectionHeading>
                            <HeadingBar light />
                        </div>

                        <div className="org-tree">
                            {/* Level 2: Institute director */}
                            {directors.length > 0 && (
                                <div className="org-top">
                                    {directors.map(m => <MemberCard key={m.id} {...cardProps(m)} large={true} />)}
                                </div>
                            )}

                            {directors.length > 0 && deputies.length > 0 && (
                                <>
                                    <div className="org-stem" />
                                    <div className="org-dot" />
                                </>
                            )}

                            {/* Level 3: Deputies */}
                            {deputies.length > 0 && (
                                <div className="org-level">
                                    {deputies.map((m) => (
                                        <div className="org-branch" key={m.id}>
                                            <MemberCard {...cardProps(m)} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ══ BLACK CLOSING STRIP ══════════════════ */}
            <div style={{
                background: T.black,
                padding: 'clamp(50px,8vw,100px) clamp(16px,6vw,60px)',
                textAlign: 'center',
            }}>
                <p style={{
                    color: 'rgba(255,255,255,0.3)',
                    fontFamily: T.font,
                    fontSize: 'clamp(11px,1.3vw,14px)',
                }}>
                    المعهد التكنولوجي لهندسة التشييد والإدارة © {new Date().getFullYear()}
                </p>
            </div>

            {cvMember && <CVDialog member={cvMember} onClose={closeCv} />}
        </div>
    );
};

export default Team;