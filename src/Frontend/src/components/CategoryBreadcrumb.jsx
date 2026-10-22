import React from 'react';
import { Link } from 'react-router-dom';

const FONT = '"Noto Kufi Arabic", serif';
const bar = { position: 'fixed', left: 0, top: 70, zIndex: 40, width: '100%', backgroundColor: '#f5f5f5', padding: '10px 24px', boxSizing: 'border-box', boxShadow: '0 2px 4px rgba(0,0,0,0.08)', borderBottom: '1px solid #e0e0e0' };
const row = { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '4px 0', fontSize: 14, fontFamily: FONT, lineHeight: 1.8 };
const link = { color: '#0865a8', textDecoration: 'none', fontWeight: 500, transition: 'color .2s' };
const sep = { color: '#000', margin: '0 8px', opacity: 0.4 };
const cur = { color: '#000', fontWeight: 600 };

// items: [{ label, to? }]  — the last item is the current page (not a link)
const CategoryBreadcrumb = ({ items }) => (
    <div style={bar} className="overview-bar">
        <nav aria-label="breadcrumb" style={row}>
            <Link to="/" style={link}>الصفحة الرئيسية</Link>
            {items.map((it, i) => (
                <React.Fragment key={`${it.label}-${i}`}>
                    <span style={sep}>•</span>
                    {it.to
                        ? <Link to={it.to} style={link}
                            onMouseEnter={e => (e.currentTarget.style.color = '#f57c00')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#0865a8')}>{it.label}</Link>
                        : <span style={cur} aria-current="page">{it.label}</span>}
                </React.Fragment>
            ))}
        </nav>
    </div>
);

export default CategoryBreadcrumb;