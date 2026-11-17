import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Production API. For local testing temporarily use 'https://localhost:7177/api'
const API_BASE = 'https://icemt.arabcont.com/api';

// ── Texts (change them here) ─────────────────────────────────────────────────
const EYEBROW = 'جديد';
const TITLE = 'جديد المعهد';
const SUBTITLE = 'أحدث ما أضفناه إلى خطة المعهد التدريبية';
const BADGE = 'جديد';

// ── Section background (change it here) ─────────────────────────────────────
const SECTION_BG =
    'radial-gradient(ellipse at 85% 0%, rgba(245,124,0,.24) 0%, transparent 50%),' +
    'radial-gradient(ellipse at 10% 100%, rgba(8,101,168,.5) 0%, transparent 55%),' +
    'linear-gradient(160deg, #0b2a4a 0%, #0f172a 100%)';

// Max standalone courses placed on the SAME row beside a lone category.
// The category gives up one course slot per standalone course (4 → 3 → 2 → 1).
// The category always keeps at least 1 course.
const MAX_BESIDE = 3;

const F = '"Noto Kufi Arabic",serif';
const C = { o: '#f57c00', od: '#e65100', b: '#0865a8', bd: '#044474', k: '#0a0a0a', g3: '#eceff3', g5: '#6b7280', g7: '#374151', tint: '#f1f6fb' };
const SHADOW = '0 18px 44px rgba(0,0,0,.35)';

const clamp = (n) => ({ display: '-webkit-box', WebkitLineClamp: n, WebkitBoxOrient: 'vertical', overflow: 'hidden' });

// The row is a 4-slot grid: a course card takes 1 slot, a category takes as many
// slots as the courses it shows (4 alone, 3 beside one course, 2 beside two / next to another category,
// 1 beside three courses).
const css = `
.nw-grid4 { display: grid; gap: 24px; margin-bottom: 24px; grid-template-columns: repeat(4, minmax(0, 1fr)); align-items: stretch; }
.nw-inner { display: grid; gap: 14px; }
@media (max-width: 1100px) {
  .nw-grid4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .nw-cat { grid-column: 1 / -1 !important; }
  .nw-inner { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
}
@media (max-width: 640px) {
  .nw-grid4 { grid-template-columns: 1fr; }
  .nw-inner { grid-template-columns: 1fr !important; }
}
`;

const Price = ({ cost, size = '1rem' }) => {
    if (cost > 0) return <span style={{ fontFamily: F, fontWeight: 800, fontSize: size, color: C.o, whiteSpace: 'nowrap' }}>{cost} جنيه</span>;
    if (cost === 0) return <span style={{ fontFamily: F, fontWeight: 800, fontSize: size, color: '#1a7a3c' }}>مجاناً</span>;
    return null;
};

const Chip = ({ Icon, text }) => text ? (
    <span style={{ fontFamily: F, fontSize: '.73rem', color: C.g7, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', background: C.tint, borderRadius: 20, maxWidth: '100%', boxSizing: 'border-box' }}>
        <Icon sx={{ fontSize: 14, color: C.b, flexShrink: 0 }} />
        <span style={clamp(1)}>{text}</span>
    </span>
) : null;

const NewBadge = () => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: F, fontSize: '.7rem', fontWeight: 800, color: '#fff', background: `linear-gradient(135deg, ${C.o}, ${C.od})`, borderRadius: 20, padding: '4px 12px', boxShadow: '0 3px 10px rgba(245,124,0,.4)' }}>
        <StarIcon sx={{ fontSize: 13 }} /> {BADGE}
    </span>
);

// mode 'row'  → shares the line with the price (grows horizontally)
// mode 'full' → full-width button (own line)
const DetailsBtn = ({ to, mode = 'row' }) => (
    <Link to={to}
        style={{ ...(mode === 'row' ? { flex: 1, minWidth: 110 } : { display: 'block', width: '100%' }), textAlign: 'center', fontFamily: F, fontWeight: 700, fontSize: '.8rem', color: C.b, background: '#fff', border: `2px solid ${C.b}`, borderRadius: 10, padding: '9px 14px', textDecoration: 'none', transition: 'all .25s', boxSizing: 'border-box' }}
        onMouseEnter={e => { e.currentTarget.style.background = C.b; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = C.b; }}>
        عرض التفاصيل
    </Link>
);

// ── A compact course card shown INSIDE a category container ─────────────────
function MiniCourse({ c }) {
    const to = `/course/${c.slug || c.id}`;
    return (
        <div
            style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 14, background: '#fff', border: `1px solid ${C.g3}`, borderRight: `4px solid ${C.b}`, borderRadius: 14, boxShadow: '0 3px 10px rgba(0,0,0,.05)', transition: 'transform .25s, box-shadow .25s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 22px rgba(0,0,0,.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,.05)'; }}>
            <div style={{ fontFamily: F, fontWeight: 800, fontSize: '.88rem', lineHeight: 1.7, color: C.k, minHeight: '3.4em', ...clamp(2) }}>{c.title}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <Chip Icon={LocationOnIcon} text={c.place} />
                <Chip Icon={CalendarTodayIcon} text={c.date || 'لا توجد مواعيد متاحة حالياً'} />
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <Price cost={c.cost} size=".95rem" />
                <DetailsBtn to={to} mode="row" />
            </div>
        </div>
    );
}

// ── A category container. `slots` = grid slots it spans = courses it shows ──
function CategoryBox({ item, slots }) {
    const courses = (item.courses || []).slice(0, slots);
    const total = item.coursesCount ?? (item.courses ? item.courses.length : 0);
    // the page that lists the category's courses
    const to = item.slug ? `/courses/${encodeURIComponent(item.slug)}` : null;
    const narrow = slots === 1;

    const title = (
        <h3 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(1.15rem,2vw,1.65rem)', lineHeight: 1.5, color: C.bd, margin: 0 }}>{item.title}</h3>
    );

    return (
        <div className="nw-cat"
            style={{ gridColumn: `span ${slots}`, borderRadius: 24, overflow: 'hidden', background: '#fff', boxShadow: SHADOW, display: 'flex', flexDirection: 'column' }}>
            {/* header */}
            <div style={{ position: 'relative', padding: 'clamp(18px,2.6vw,28px)', paddingRight: 'clamp(26px,3vw,36px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', background: '#fff' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 8, background: `linear-gradient(180deg, ${C.o}, ${C.od})` }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: '1 1 220px', minWidth: 0 }}>
                    <div><NewBadge /></div>
                    {to ? <Link to={to} style={{ textDecoration: 'none' }}>{title}</Link> : title}
                    {item.sponsorDesc && (
                        <p style={{ fontFamily: F, fontSize: '.84rem', lineHeight: 1.9, color: C.g5, margin: 0, ...clamp(2) }}>{item.sponsorDesc}</p>
                    )}
                </div>
                {to && (
                    <Link to={to}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: F, fontWeight: 700, fontSize: '.82rem', color: '#fff', background: C.o, borderRadius: 12, padding: '11px 22px', textDecoration: 'none', boxShadow: '0 4px 12px rgba(245,124,0,.35)', transition: 'background .2s', ...(narrow ? { width: '100%', justifyContent: 'center', boxSizing: 'border-box' } : {}) }}
                        onMouseEnter={e => { e.currentTarget.style.background = C.od; }}
                        onMouseLeave={e => { e.currentTarget.style.background = C.o; }}>
                        عرض كل البرامج{total > 0 ? ` (${total})` : ''} <ArrowBackIcon sx={{ fontSize: 16 }} />
                    </Link>
                )}
            </div>

            {/* courses */}
            <div style={{ padding: 'clamp(14px,2.2vw,22px)', background: C.tint, flex: 1 }}>
                {courses.length === 0 ? (
                    <p style={{ fontFamily: F, color: C.g5, textAlign: 'center', margin: 0, padding: '18px 0' }}>سيتم إضافة البرامج قريبًا</p>
                ) : (
                    <div className="nw-inner" style={{ gridTemplateColumns: `repeat(${slots}, minmax(0, 1fr))` }}>
                        {courses.map(c => <MiniCourse key={c.id} c={c} />)}
                    </div>
                )}
            </div>
        </div>
    );
}

// ── A sponsored COURSE: one slot, price + "عرض التفاصيل" at the bottom ──────
function CourseCard({ item }) {
    const to = `/course/${item.slug || item.id}`;
    const text = item.sponsorDesc || item.description;
    return (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 12, borderRadius: 24, overflow: 'hidden', background: '#fff', boxShadow: SHADOW, padding: 'clamp(18px,2.2vw,24px)', paddingRight: 'clamp(26px,3vw,32px)' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 8, background: `linear-gradient(180deg, ${C.o}, ${C.od})` }} />
            <div><NewBadge /></div>
            <h3 style={{ fontFamily: F, fontWeight: 900, fontSize: '1.05rem', lineHeight: 1.7, color: C.bd, margin: 0, ...clamp(4) }}>{item.title}</h3>
            {text && <p style={{ fontFamily: F, fontSize: '.82rem', lineHeight: 1.9, color: C.g5, margin: 0, ...clamp(3) }}>{text}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <Chip Icon={LocationOnIcon} text={item.place} />
                <Chip Icon={CalendarTodayIcon} text={item.date || 'لا توجد مواعيد متاحة حالياً'} />
            </div>
            <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: `2px solid ${C.g3}`, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Price cost={item.cost} size="1.3rem" />
                <DetailsBtn to={to} mode="full" />
            </div>
        </div>
    );
}

export default function SponsoredCategorySection() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE}/Course/sponsored`)
            .then(r => (r.ok ? r.json() : []))
            .then(d => setItems(Array.isArray(d) ? d : []))
            .catch(() => setItems([]));
    }, []);

    // nothing sponsored → the section disappears completely
    if (!items.length) return null;

    const categories = items.filter(i => i.type !== 'course');
    const courses = items.filter(i => i.type === 'course');

    // Categories go in rows of two (2 slots each, 2 courses each).
    // A lone category (the only one, or the last odd one) takes the rest of its row:
    // courses are placed on the SAME row and the category gives up one slot per course,
    // down to a minimum of 1 course (MAX_BESIDE = 3 standalone courses beside it).
    const rows = [];
    for (let i = 0; i < categories.length; i += 2) rows.push({ cats: categories.slice(i, i + 2), side: [] });

    let rest = courses;
    const last = rows[rows.length - 1];
    if (last && last.cats.length === 1) {
        last.side = courses.slice(0, MAX_BESIDE);
        rest = courses.slice(MAX_BESIDE);
    }

    return (
        <section dir="rtl"
            style={{ position: 'relative', overflow: 'hidden', background: SECTION_BG, clipPath: 'polygon(0 0, 100% 36px, 100% calc(100% - 36px), 0 100%)', padding: 'calc(clamp(40px,6vw,72px) + 36px) clamp(16px,4vw,56px)' }}>
            <style>{css}</style>
            {/* subtle dotted texture */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px)', backgroundSize: '22px 22px', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', maxWidth: 1320, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
                        <div style={{ width: 32, height: 2, background: C.o }} />
                        <span style={{ fontFamily: F, fontSize: '.8rem', fontWeight: 700, letterSpacing: 3, color: C.o }}>{EYEBROW}</span>
                        <div style={{ width: 32, height: 2, background: C.o }} />
                    </div>
                    <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(1.6rem,3.4vw,2.6rem)', color: '#fff', margin: 0 }}>{TITLE}</h2>
                    {SUBTITLE && <p style={{ fontFamily: F, fontSize: '.95rem', color: 'rgba(255,255,255,.72)', margin: '12px 0 0' }}>{SUBTITLE}</p>}
                    <div style={{ width: 56, height: 3, background: C.o, margin: '16px auto 0', borderRadius: 2 }} />
                </div>

                {rows.map((row, i) => {
                    const two = row.cats.length === 2;
                    // two categories → 2 slots each; lone category → 4 minus the courses beside it (min 1)
                    const slots = two ? 2 : Math.max(1, 4 - row.side.length);
                    return (
                        <div key={i} className="nw-grid4">
                            {row.cats.map(cat => <CategoryBox key={cat.id} item={cat} slots={slots} />)}
                            {row.side.map(c => <CourseCard key={c.id} item={c} />)}
                        </div>
                    );
                })}

                {rest.length > 0 && (
                    <div className="nw-grid4">
                        {rest.map(c => <CourseCard key={c.id} item={c} />)}
                    </div>
                )}
            </div>
        </section>
    );
}