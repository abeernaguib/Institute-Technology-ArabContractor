import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const API_BASE = 'https://icemt.arabcont.com/api';

const F = '"Noto Kufi Arabic",serif';
const C = { o: '#f57c00', b: '#0865a8', bd: '#044474', k: '#0a0a0a', g3: '#e5e7eb', g5: '#6b7280', tint: '#f4f8fc' };

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

export default function SponsoredCategoryPage() {
    const { slug } = useParams();
    const [data, setData] = useState(null);
    const [state, setState] = useState('loading'); // loading | ok | notfound | error

    useEffect(() => {
        setState('loading');
        fetch(`${API_BASE}/Course/programs/${encodeURIComponent(slug)}/courses`)
            .then(r => {
                if (r.status === 404) { setState('notfound'); return null; }
                if (!r.ok) throw new Error();
                return r.json();
            })
            .then(d => { if (d) { setData(d); setState('ok'); } })
            .catch(() => setState('error'));
        window.scrollTo(0, 0);
    }, [slug]);

    const courses = data?.courses || [];

    return (
        <div dir="rtl" style={{ background: '#fff', minHeight: '70vh' }}>
            <div style={{ background: C.tint, borderBottom: `1px solid ${C.g3}`, borderInlineStart: `5px solid ${C.o}`, padding: 'clamp(28px,5vw,56px) clamp(16px,4vw,56px)' }}>
                <div style={{ maxWidth: 1320, margin: '0 auto' }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: F, fontSize: '.8rem', fontWeight: 700, color: C.b, textDecoration: 'none', marginBottom: 14 }}>
                        <ArrowForwardIcon sx={{ fontSize: 16 }} /> الرئيسية
                    </Link>
                    <h1 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(1.5rem,3.4vw,2.6rem)', color: C.bd, lineHeight: 1.5, margin: 0 }}>
                        {state === 'ok' ? data.programName : '...'}
                    </h1>
                    {state === 'ok' && (
                        <p style={{ fontFamily: F, fontSize: '.9rem', color: C.g5, margin: '10px 0 0' }}>{courses.length} برنامج</p>
                    )}
                </div>
            </div>

            <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(24px,4vw,48px) clamp(16px,4vw,56px) clamp(48px,7vw,80px)' }}>
                {state === 'loading' && <p style={{ fontFamily: F, textAlign: 'center', color: C.b }}>جاري التحميل...</p>}
                {state === 'notfound' && <p style={{ fontFamily: F, textAlign: 'center', color: C.g5 }}>القسم غير موجود</p>}
                {state === 'error' && <p style={{ fontFamily: F, textAlign: 'center', color: '#dc2626' }}>تعذر تحميل البرامج، حاول مرة أخرى</p>}
                {state === 'ok' && courses.length === 0 && <p style={{ fontFamily: F, textAlign: 'center', color: C.g5 }}>سيتم إضافة البرامج قريبًا</p>}

                {state === 'ok' && courses.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 18 }}>
                        {courses.map(c => (
                            <Link key={c.id} to={`/course/${c.slug || c.id}`}
                                style={{ textDecoration: 'none', border: `1px solid ${C.g3}`, borderTop: `4px solid ${C.b}`, borderRadius: 10, padding: 18, display: 'flex', flexDirection: 'column', gap: 10, background: '#fff', transition: 'border-color .25s, transform .25s, box-shadow .25s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = C.o; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,.08)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = C.g3; e.currentTarget.style.borderTopColor = C.b; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                                <div style={{ fontFamily: F, fontWeight: 800, fontSize: '.92rem', lineHeight: 1.7, color: C.k, minHeight: 62 }}>{c.title}</div>
                                {c.description && (
                                    <p style={{ fontFamily: F, fontSize: '.74rem', lineHeight: 1.8, color: C.g5, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.description}</p>
                                )}
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