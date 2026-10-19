import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const API_BASE = 'https://icemt.arabcont.com/api';
const F = '"Noto Kufi Arabic",serif';
const C = { o: '#f57c00', b: '#0865a8', bd: '#044474', k: '#0a0a0a', g3: '#e5e7eb', g5: '#6b7280' };
const PREVIEW = 4;

function SponsorBlock({ item }) {
    const [showAll, setShowAll] = useState(false);
    const list = showAll ? item.courses : item.courses.slice(0, PREVIEW);

    return (
        <div style={{ marginBottom: 40, borderRadius: 16, overflow: 'hidden', border: `1px solid ${C.g3}`, background: '#fff' }}>
            {/* Header */}
            <div style={{ background: `linear-gradient(135deg, ${C.b} 0%, ${C.bd} 100%)`, padding: 'clamp(24px,4vw,48px)', color: '#fff', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: C.o }} />
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 20, padding: '4px 14px', marginBottom: 16 }}>
                    <StarIcon sx={{ fontSize: 13, color: C.o }} />
                    <span style={{ fontFamily: F, fontSize: '.68rem', fontWeight: 700, letterSpacing: 1.5 }}>قسم مميز</span>
                </div>
                <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(1.4rem,3vw,2.4rem)', lineHeight: 1.4, margin: '0 0 12px' }}>
                    {item.title}
                </h2>
                {item.sponsorDesc && (
                    <p style={{ fontFamily: F, fontSize: 'clamp(.84rem,1.2vw,.98rem)', lineHeight: 2, color: 'rgba(255,255,255,.8)', maxWidth: 760, margin: 0 }}>
                        {item.sponsorDesc}
                    </p>
                )}
            </div>

            {/* Courses */}
            <div style={{ padding: 'clamp(16px,3vw,32px)' }}>
                {item.courses.length === 0 ? (
                    <p style={{ fontFamily: F, color: C.g5, textAlign: 'center', margin: 0 }}>سيتم إضافة البرامج قريبًا</p>
                ) : (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
                            {list.map(c => (
                                <Link key={c.id} to={`/course/${c.slug}`}
                                    style={{ textDecoration: 'none', border: `1px solid ${C.g3}`, borderRadius: 10, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, background: '#fff', transition: 'border-color .25s, transform .25s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.o; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.g3; e.currentTarget.style.transform = ''; }}>
                                    <div style={{ fontFamily: F, fontWeight: 800, fontSize: '.9rem', lineHeight: 1.6, color: C.k, minHeight: 58 }}>{c.title}</div>
                                    {c.place && (
                                        <span style={{ fontFamily: F, fontSize: '.68rem', color: C.g5, display: 'flex', alignItems: 'center', gap: 5 }}>
                                            <LocationOnIcon sx={{ fontSize: 13, color: C.b }} />{c.place}
                                        </span>
                                    )}
                                    {c.date && (
                                        <span style={{ fontFamily: F, fontSize: '.68rem', color: C.g5, display: 'flex', alignItems: 'center', gap: 5 }}>
                                            <CalendarTodayIcon sx={{ fontSize: 12, color: C.b }} />{c.date}
                                        </span>
                                    )}
                                    <div style={{ marginTop: 'auto', fontFamily: F, fontWeight: 800, color: c.cost > 0 ? C.o : '#1a7a3c' }}>
                                        {c.cost > 0 ? `${c.cost} جنيه` : 'مجاناً'}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {item.courses.length > PREVIEW && (
                            <div style={{ textAlign: 'center', marginTop: 24 }}>
                                <button onClick={() => setShowAll(s => !s)}
                                    style={{ fontFamily: F, fontWeight: 700, fontSize: '.85rem', color: '#fff', background: C.o, border: 'none', borderRadius: 8, padding: '10px 28px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                    {showAll ? 'عرض أقل' : `عرض كل البرامج (${item.coursesCount})`}
                                    <ArrowForwardIosIcon sx={{ fontSize: 11, transform: showAll ? 'rotate(-90deg)' : 'rotate(90deg)' }} />
                                </button>
                            </div>
                        )}
                    </>
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

    if (!items.length) return null; // nothing sponsored → section disappears

    return (
        <section dir="rtl" style={{ background: '#fff', padding: 'clamp(40px,6vw,80px) clamp(16px,4vw,56px) 0' }}>
            <div style={{ maxWidth: 1320, margin: '0 auto' }}>
                {items.map(it => <SponsorBlock key={it.id} item={it} />)}
            </div>
        </section>
    );
}