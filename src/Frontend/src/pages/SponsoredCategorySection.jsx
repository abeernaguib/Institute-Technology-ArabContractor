import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Production API. For local testing temporarily use 'https://localhost:7177/api'
const API_BASE = 'https://icemt.arabcont.com/api';

const F = '"Noto Kufi Arabic",serif';
const C = { o: '#f57c00', od: '#e65100', b: '#0865a8', bd: '#044474', k: '#0a0a0a', g1: '#f9fafb', g3: '#e5e7eb', g5: '#6b7280', g7: '#374151', tint: '#f4f8fc' };

const Price = ({ cost }) => {
    if (cost > 0) return <span style={{ fontFamily: F, fontWeight: 800, color: C.o }}>{cost} جنيه</span>;
    if (cost === 0) return <span style={{ fontFamily: F, fontWeight: 800, color: '#1a7a3c' }}>مجاناً</span>;
    return null;
};

const Meta = ({ Icon, text }) => text ? (
    <span style={{ fontFamily: F, fontSize: '.72rem', color: C.g5, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon sx={{ fontSize: 14, color: C.b }} />{text}
    </span>
) : null;

const Chip = () => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: F, fontSize: '.68rem', fontWeight: 700, color: C.o, border: `1px solid ${C.o}`, borderRadius: 20, padding: '3px 12px' }}>
        <StarIcon sx={{ fontSize: 12 }} /> قسم مميز
    </span>
);

// ── A sponsored COURSE: featured card with a "سجل الآن" button at the bottom ──
function SponsoredCourse({ item }) {
    const to = `/course/${item.slug || item.id}`;
    return (
        <div style={{ borderRadius: 16, border: `1px solid ${C.g3}`, background: '#fff', borderInlineStart: `5px solid ${C.o}`, padding: 'clamp(20px,3vw,32px)', display: 'flex', flexDirection: 'column', gap: 14, boxShadow: '0 4px 18px rgba(0,0,0,.05)' }}>
            <div><Chip /></div>
            <Link to={to} style={{ textDecoration: 'none' }}>
                <h3 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(1.1rem,2vw,1.6rem)', lineHeight: 1.5, color: C.bd, margin: 0 }}>{item.title}</h3>
            </Link>
            {(item.sponsorDesc || item.description) && (
                <p style={{ fontFamily: F, fontSize: 'clamp(.8rem,1.1vw,.92rem)', lineHeight: 2, color: C.g7, margin: 0, maxWidth: 820 }}>
                    {item.sponsorDesc || item.description}
                </p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px' }}>
                <Meta Icon={LocationOnIcon} text={item.place} />
                <Meta Icon={CalendarTodayIcon} text={item.date} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, borderTop: `1px solid ${C.g3}`, paddingTop: 16, marginTop: 4 }}>
                <Price cost={item.cost} />
                <Link to={to}
                    style={{ fontFamily: F, fontWeight: 800, fontSize: '.9rem', color: '#fff', background: C.o, borderRadius: 10, padding: '11px 32px', textDecoration: 'none', transition: 'background .2s, transform .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.od; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = C.o; e.currentTarget.style.transform = ''; }}>
                    سجل الآن
                </Link>
            </div>
        </div>
    );
}

// ── A sponsored CATEGORY: header (click → all courses) + max 4 course cards ──
function SponsoredCategory({ item }) {
    const courses = item.courses || [];
    const total = item.coursesCount ?? courses.length;
    const catTo = item.slug ? `/category/${encodeURIComponent(item.slug)}` : null;

    const title = (
        <h3 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(1.2rem,2.4vw,1.9rem)', lineHeight: 1.5, color: C.bd, margin: 0 }}>
            {item.title}
        </h3>
    );

    return (
        <div style={{ borderRadius: 16, border: `1px solid ${C.g3}`, background: '#fff', overflow: 'hidden', boxShadow: '0 4px 18px rgba(0,0,0,.05)' }}>
            <div style={{ background: C.tint, borderBottom: `1px solid ${C.g3}`, borderInlineStart: `5px solid ${C.o}`, padding: 'clamp(18px,3vw,30px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: '1 1 320px', minWidth: 0 }}>
                    <div><Chip /></div>
                    {catTo ? <Link to={catTo} style={{ textDecoration: 'none' }}>{title}</Link> : title}
                    {item.sponsorDesc && (
                        <p style={{ fontFamily: F, fontSize: 'clamp(.8rem,1.1vw,.92rem)', lineHeight: 2, color: C.g7, margin: 0, maxWidth: 780 }}>{item.sponsorDesc}</p>
                    )}
                </div>
                {catTo && total > 0 && (
                    <Link to={catTo}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: F, fontWeight: 700, fontSize: '.82rem', color: C.b, background: '#fff', border: `1.5px solid ${C.b}`, borderRadius: 10, padding: '9px 20px', textDecoration: 'none', transition: 'all .2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = C.b; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = C.b; }}>
                        عرض كل البرامج ({total}) <ArrowBackIcon sx={{ fontSize: 16 }} />
                    </Link>
                )}
            </div>

            <div style={{ padding: 'clamp(16px,3vw,28px)' }}>
                {courses.length === 0 ? (
                    <p style={{ fontFamily: F, color: C.g5, textAlign: 'center', margin: 0 }}>سيتم إضافة البرامج قريبًا</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
                        {courses.map(c => (
                            <Link key={c.id} to={`/course/${c.slug || c.id}`}
                                style={{ textDecoration: 'none', border: `1px solid ${C.g3}`, borderTop: `4px solid ${C.b}`, borderRadius: 10, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, background: '#fff', transition: 'border-color .25s, transform .25s, box-shadow .25s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = C.o; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,.08)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = C.g3; e.currentTarget.style.borderTopColor = C.b; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                                <div style={{ fontFamily: F, fontWeight: 800, fontSize: '.9rem', lineHeight: 1.7, color: C.k, minHeight: 62, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.title}</div>
                                <Meta Icon={LocationOnIcon} text={c.place} />
                                <Meta Icon={CalendarTodayIcon} text={c.date} />
                                <div style={{ marginTop: 'auto', paddingTop: 6 }}><Price cost={c.cost} /></div>
                            </Link>
                        ))}
                    </div>
                )}
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

    return (
        <section dir="rtl" style={{ background: '#fff', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,56px) 0' }}>
            <div style={{ maxWidth: 1320, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
                        <div style={{ width: 32, height: 2, background: C.o }} />
                        <span style={{ fontFamily: F, fontSize: '.72rem', fontWeight: 700, letterSpacing: 3, color: C.o }}>برامج مميزة</span>
                        <div style={{ width: 32, height: 2, background: C.o }} />
                    </div>
                    <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(1.5rem,3.2vw,2.4rem)', color: C.k, margin: 0 }}>قطاعات وبرامج نرشحها لك</h2>
                    <div style={{ width: 56, height: 3, background: C.o, margin: '16px auto 0', borderRadius: 2 }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                    {items.map(it => it.type === 'course'
                        ? <SponsoredCourse key={it.id} item={it} />
                        : <SponsoredCategory key={it.id} item={it} />)}
                </div>
            </div>
        </section>
    );
}