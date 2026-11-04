import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';
import logoSrc from '../../assets/white.webp';
import { T, API_BASE, ITEMS_PER_PAGE } from '../../components/admin/constants';
import { rtlExport } from '../../components/admin/helpers';
import { exportExcel, exportPDF, exportWord, withExport } from '../../components/admin/exportHelpers';
import { Pagination } from '../../components/admin/Pagination';

const URL = `${API_BASE}/admin/AdminActivity`;
const REFRESH_MS = 10000;   // auto refresh interval

const ACTIONS = {
    Create: { label: '➕ إضافة', style: { background: '#dcfce7', color: '#166534' } },
    Update: { label: '✏️ تعديل', style: { background: '#e0f2fe', color: '#0369a1' } },
    Delete: { label: '🗑 حذف', style: { background: '#fee2e2', color: '#b91c1c' } },
};

// Same sections / icons / order as the admin sidebar.
// If you add a tab to the sidebar, add it here too (id = Section value in ActivityMap.cs).
const SECTIONS = [
    { id: 'users', label: 'المستخدمون', icon: '👤' },
    { id: 'courses', label: 'الدورات', icon: '📚' },
    { id: 'attendance', label: 'الحضور', icon: '✅' },
    { id: 'certificates', label: 'الشهادات', icon: '📜' },
    { id: 'refunds', label: 'المستردات', icon: '💳' },
    { id: 'financial', label: 'المالية', icon: '💰' },
    { id: 'lecturers', label: 'المحاضرون', icon: '🎓' },
    { id: 'team', label: 'فريق العمل', icon: '👥' },
    { id: 'customers', label: 'العملاء', icon: '🏢' },
    { id: 'protocols', label: 'البروتوكولات', icon: '🤝' },
    { id: 'siteCerts', label: 'الشهادات وخطابات الشكر', icon: '🏅' },
    { id: 'news', label: 'الأخبار', icon: '📰' },
    { id: 'books', label: 'الكتب', icon: '📖' },
    { id: 'planwork', label: 'الدورات التدريبية', icon: '📋' },
    { id: 'settings', label: 'الإعدادات', icon: '⚙️' },
    { id: 'other', label: 'أخرى', icon: '📁' },
];
const sectionOf = (id) => SECTIONS.find(s => s.id === id);

const fmt = (iso) => new Date(iso).toLocaleString('ar-EG', {
    timeZone: 'Africa/Cairo', dateStyle: 'medium', timeStyle: 'short',
});

// today's date (YYYY-MM-DD) in Cairo
const todayStr = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Cairo' });

const ActivityLogTab = ({ setExporting, setExportError }) => {
    const { getToken } = useAuth();
    const exportRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [auto, setAuto] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);

    const [search, setSearch] = useState('');
    const [actionType, setActionType] = useState('');
    const [section, setSection] = useState('');
    const [role, setRole] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const buildParams = useCallback((pg, size) => {
        const p = new URLSearchParams({ page: pg, pageSize: size });
        if (search.trim()) p.set('search', search.trim());
        if (actionType) p.set('actionType', actionType);
        if (section) p.set('section', section);
        if (role) p.set('role', role);
        if (dateFrom) p.set('from', new Date(`${dateFrom}T00:00:00`).toISOString());
        if (dateTo) {
            const e = new Date(`${dateTo}T00:00:00`); e.setDate(e.getDate() + 1);
            p.set('to', e.toISOString());
        }
        return p;
    }, [search, actionType, section, role, dateFrom, dateTo]);

    const request = useCallback(async (pg, size) => {
        const token = await getToken();
        const res = await fetch(`${URL}?${buildParams(pg, size)}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error(res.status === 401 || res.status === 403
            ? 'غير مصرح لك بهذا الإجراء' : `HTTP ${res.status}`);
        return res.json();
    }, [getToken, buildParams]);

    // silent = background refresh: no spinner, keeps the old rows if the request fails
    const load = useCallback(async (silent = false) => {
        if (!silent) { setLoading(true); setError(null); }
        try {
            const json = await request(page, ITEMS_PER_PAGE);
            setItems(json.items || []); setTotal(json.total || 0);
            setLastUpdated(new Date());
            setError(null);
        } catch (err) {
            if (!silent) setError(err.message);
        } finally {
            if (!silent) setLoading(false);
        }
    }, [page, request]);

    // load when page / filters change (debounced so typing doesn't spam the API)
    useEffect(() => {
        const t = setTimeout(() => load(false), 350);
        return () => clearTimeout(t);
    }, [load]);

    // auto refresh (paused while the browser tab is hidden)
    useEffect(() => {
        if (!auto) return;
        const id = setInterval(() => { if (!document.hidden) load(true); }, REFRESH_MS);
        return () => clearInterval(id);
    }, [auto, load]);

    useEffect(() => { setPage(1); }, [search, actionType, section, role, dateFrom, dateTo]);

    const hasFilter = search || actionType || section || role || dateFrom || dateTo;
    const clear = () => { setSearch(''); setActionType(''); setSection(''); setRole(''); setDateFrom(''); setDateTo(''); };
    const setToday = () => { const t = todayStr(); setDateFrom(t); setDateTo(t); };

    // ── Export (all rows that match the current filters, not just this page) ──
    const wrap = withExport(setExporting, setExportError, () => setMenuOpen(false));

    const getExportData = async () => {
        const json = await request(1, 5000);
        const list = json.items || [];
        if (list.length === 0) throw new Error('لا توجد سجلات للتصدير');
        const headers = ['#', 'المستخدم', 'البريد الإلكتروني', 'الدور', 'الإجراء', 'القسم', 'الجزء', 'النوع', 'رقم العنصر', 'التفاصيل', 'عنوان IP', 'التاريخ والوقت'];
        const rows = list.map((r, i) => {
            const s = sectionOf(r.section);
            return [
                i + 1,
                r.adminName || '',
                r.adminEmail || '',
                r.adminRole === 'Manager' ? 'مدير' : 'أدمن',
                (ACTIONS[r.actionType]?.label || r.actionType).replace(/^\S+\s/, ''),
                s ? s.label : '',
                r.subSection || '',
                r.entityType || '',
                r.entityId || '',
                (r.details || '').replace(/\s*\n\s*/g, ' | '),
                r.ipAddress || '',
                fmt(r.createdAt),
            ];
        });
        return rtlExport(headers, rows);
    };

    const titleText = `سجل النشاط${dateFrom ? ` - من ${dateFrom}` : ''}${dateTo ? ` إلى ${dateTo}` : ''}`;
    const fileBase = `سجل-النشاط${dateFrom ? `-${dateFrom}` : ''}${dateTo && dateTo !== dateFrom ? `-${dateTo}` : ''}`;

    const doExcel = wrap(async () => { const { headers, rows } = await getExportData(); await exportExcel(`${fileBase}.xlsx`, titleText, headers, rows, logoSrc); });
    const doPDF = wrap(async () => { const { headers, rows } = await getExportData(); await exportPDF(`${fileBase}.pdf`, titleText, headers, rows, 'ICEMT', logoSrc); });
    const doWord = wrap(async () => { const { headers, rows } = await getExportData(); await exportWord(`${fileBase}.docx`, titleText, 'ICEMT', headers, rows, logoSrc); });

    return (
        <>
            <div className="adm-section-hdr">
                <div>
                    <div className="adm-section-tag">المراقبة</div>
                    <div className="adm-section-title">سجل <span>النشاط</span></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '.72rem', color: T.gray500 }}>
                    {lastUpdated && (
                        <span>آخر تحديث: {lastUpdated.toLocaleTimeString('ar-EG', { timeZone: 'Africa/Cairo' })}</span>
                    )}
                    <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                        <input type="checkbox" checked={auto} onChange={e => setAuto(e.target.checked)} />
                        تحديث تلقائي
                    </label>
                    <button className="adm-fclear" onClick={() => load(false)}>🔄 تحديث</button>
                </div>
            </div>

            <div className="adm-toolbar">
                <div className="adm-search">
                    <input type="text" placeholder="ابحث باسم الأدمن أو البريد أو التفاصيل..."
                        value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select className="adm-fdate" value={role} onChange={e => setRole(e.target.value)}>
                    <option value="">كل الأدوار</option>
                    <option value="Manager">🔐 مدير</option>
                    <option value="Admin">👤 أدمن</option>
                </select>
                <select className="adm-fdate" value={actionType} onChange={e => setActionType(e.target.value)}>
                    <option value="">كل الإجراءات</option>
                    {Object.entries(ACTIONS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
                <select className="adm-fdate" value={section} onChange={e => setSection(e.target.value)}>
                    <option value="">كل الأقسام</option>
                    {SECTIONS.map(s => <option key={s.id} value={s.id}>{s.icon} {s.label}</option>)}
                </select>
                <button className="adm-fclear" onClick={setToday} style={{ fontWeight: 700 }}>📅 اليوم</button>
                <span style={{ fontSize: '.68rem', color: T.gray500 }}>من</span>
                <input type="date" className="adm-fdate" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
                <span style={{ fontSize: '.68rem', color: T.gray500 }}>إلى</span>
                <input type="date" className="adm-fdate" value={dateTo} min={dateFrom} onChange={e => setDateTo(e.target.value)} />
                {hasFilter && <button className="adm-fclear" onClick={clear}>✕</button>}

                <div className="adm-expw" ref={exportRef} style={{ marginRight: 'auto' }}>
                    <button className="adm-expbtn" onClick={() => setMenuOpen(p => !p)}>⬇ تصدير ▾</button>
                    {menuOpen && (
                        <div className="adm-expmenu">
                            <button className="adm-expitem" onClick={doExcel}>📊 Excel (.xlsx)</button>
                            <button className="adm-expitem" onClick={doPDF}>📄 PDF</button>
                            <button className="adm-expitem" onClick={doWord}>📝 Word (.docx)</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="adm-card">
                {loading ? <div className="adm-ld"><div className="adm-sp" /><p>جاري تحميل السجل...</p></div>
                    : error ? <div className="adm-empty"><div className="adm-emi">⚠️</div><p>{error}</p></div>
                        : items.length === 0 ? <div className="adm-empty"><div className="adm-emi">🔍</div><p>لا توجد سجلات</p></div>
                            : (<>
                                <div className="adm-tscr">
                                    <table className="adm-tbl">
                                        <thead><tr>
                                            <th className="c" style={{ width: 40 }}>#</th>
                                            <th>المستخدم</th>
                                            <th>البريد الإلكتروني</th>
                                            <th className="c">الدور</th>
                                            <th className="c">الإجراء</th>
                                            <th>القسم</th>
                                            <th>الجزء</th>
                                            <th>النوع</th>
                                            <th className="c">رقم العنصر</th>
                                            <th style={{ minWidth: 380 }}>التفاصيل</th>
                                            <th>عنوان IP</th>
                                            <th>التاريخ والوقت</th>
                                        </tr></thead>
                                        <tbody>
                                            {items.map((r, i) => {
                                                const a = ACTIONS[r.actionType] || { label: r.actionType, style: {} };
                                                const s = sectionOf(r.section);
                                                return (
                                                    <tr key={r.id}>
                                                        <td style={{ color: T.gray500, fontSize: '.68rem', textAlign: 'center' }}>
                                                            {(page - 1) * ITEMS_PER_PAGE + i + 1}
                                                        </td>
                                                        <td className="adm-uname">{r.adminName || '—'}</td>
                                                        <td className="adm-email">{r.adminEmail || '—'}</td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <span className="adm-mode-badge" style={r.adminRole === 'Manager'
                                                                ? { background: '#fef3c7', color: '#92400e' }
                                                                : { background: '#e0f2fe', color: '#0369a1' }}>
                                                                {r.adminRole === 'Manager' ? '🔐 مدير' : '👤 أدمن'}
                                                            </span>
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <span className="adm-mode-badge" style={a.style}>{a.label}</span>
                                                        </td>
                                                        <td style={{ fontWeight: 700 }}>{s ? `${s.icon} ${s.label}` : '—'}</td>
                                                        <td>{r.subSection || '—'}</td>
                                                        <td style={{ fontSize: '.7rem', color: T.gray500 }}>{r.entityType || '—'}</td>
                                                        <td style={{ textAlign: 'center' }}>{r.entityId || '—'}</td>
                                                        <td dir="auto" style={{ minWidth: 380, maxWidth: 520, whiteSpace: 'pre-line', lineHeight: 1.8, fontSize: '.72rem' }}>
                                                            {r.details || '—'}
                                                        </td>
                                                        <td style={{ direction: 'ltr', textAlign: 'right', fontSize: '.7rem' }}>{r.ipAddress || '—'}</td>
                                                        <td style={{ whiteSpace: 'nowrap' }}>{fmt(r.createdAt)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination currentPage={page} totalItems={total}
                                    itemsPerPage={ITEMS_PER_PAGE} onPageChange={setPage} accentColor={T.blue} />
                            </>)}
            </div>
        </>
    );
};

export default ActivityLogTab;