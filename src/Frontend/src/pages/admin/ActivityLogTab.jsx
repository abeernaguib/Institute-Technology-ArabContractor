import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { T, API_BASE, ITEMS_PER_PAGE } from '../../components/admin/constants';
import { Pagination } from '../../components/admin/Pagination';

const URL = `${API_BASE}/admin/AdminActivity`;

const ACTIONS = {
    Create: { label: '➕ إضافة', style: { background: '#dcfce7', color: '#166534' } },
    Update: { label: '✏️ تعديل', style: { background: '#e0f2fe', color: '#0369a1' } },
    Delete: { label: '🗑 حذف', style: { background: '#fee2e2', color: '#b91c1c' } },
};

// key = controller name saved in the database
const ENTITIES = {
    Admin: 'الإدارة العامة (حضور / شهادات / دورات)',
    AdminUsers: 'المستخدمون (مدير)',
    UserPermissions: 'صلاحيات المستخدمين',
    AdminBook: 'الكتب',
    AdminBooksType: 'أنواع الكتب',
    AdminCertifications: 'شهادات وخطابات الشكر',
    AdminCustomer: 'العملاء',
    AdminLecturer: 'المحاضرون',
    AdminNews: 'الأخبار',
    AdminPlanEmails: 'إيميلات الدورات',
    AdminPlanFiles: 'ملفات الدورات',
    AdminPlanwork: 'الدورات التدريبية',
    AdminProtocol: 'البروتوكولات',
    AdminTeam: 'فريق العمل',
    Refund: 'المستردات',
};

const fmt = (iso) => new Date(iso).toLocaleString('ar-EG', {
    timeZone: 'Africa/Cairo', dateStyle: 'medium', timeStyle: 'short',
});

const ActivityLogTab = () => {
    const { getToken } = useAuth();
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState('');
    const [actionType, setActionType] = useState('');
    const [entityType, setEntityType] = useState('');
    const [role, setRole] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const load = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const p = new URLSearchParams({ page, pageSize: ITEMS_PER_PAGE });
            if (search.trim()) p.set('search', search.trim());
            if (actionType) p.set('actionType', actionType);
            if (entityType) p.set('entityType', entityType);
            if (role) p.set('role', role);
            if (dateFrom) p.set('from', new Date(`${dateFrom}T00:00:00`).toISOString());
            if (dateTo) {
                const e = new Date(`${dateTo}T00:00:00`); e.setDate(e.getDate() + 1);
                p.set('to', e.toISOString());
            }
            const token = await getToken();
            const res = await fetch(`${URL}?${p}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            if (!res.ok) throw new Error(res.status === 401 || res.status === 403
                ? 'غير مصرح لك بهذا الإجراء' : `HTTP ${res.status}`);
            const json = await res.json();
            setItems(json.items || []); setTotal(json.total || 0);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [page, search, actionType, entityType, role, dateFrom, dateTo, getToken]);

    useEffect(() => {
        const t = setTimeout(load, 350);
        return () => clearTimeout(t);
    }, [load]);

    useEffect(() => { setPage(1); }, [search, actionType, entityType, role, dateFrom, dateTo]);

    const hasFilter = search || actionType || entityType || role || dateFrom || dateTo;
    const clear = () => { setSearch(''); setActionType(''); setEntityType(''); setRole(''); setDateFrom(''); setDateTo(''); };

    return (
        <>
            <div className="adm-section-hdr">
                <div>
                    <div className="adm-section-tag">المراقبة</div>
                    <div className="adm-section-title">سجل <span>النشاط</span></div>
                </div>
            </div>

            <div className="adm-toolbar">
                <div className="adm-search">
                    <input type="text" placeholder="ابحث باسم الأدمن أو البريد أو التفاصيل..."
                        value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select className="adm-fdate" value={role} onChange={e => setRole(e.target.value)}>
                    <option value="">كل الأدوار</option>
                    <option value="Manager">مدير</option>
                    <option value="Admin">أدمن</option>
                </select>
                <select className="adm-fdate" value={actionType} onChange={e => setActionType(e.target.value)}>
                    <option value="">كل الإجراءات</option>
                    {Object.entries(ACTIONS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
                <select className="adm-fdate" value={entityType} onChange={e => setEntityType(e.target.value)}>
                    <option value="">كل الأقسام</option>
                    {Object.entries(ENTITIES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
                <span style={{ fontSize: '.68rem', color: T.gray500 }}>من</span>
                <input type="date" className="adm-fdate" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
                <span style={{ fontSize: '.68rem', color: T.gray500 }}>إلى</span>
                <input type="date" className="adm-fdate" value={dateTo} min={dateFrom} onChange={e => setDateTo(e.target.value)} />
                {hasFilter && <button className="adm-fclear" onClick={clear}>✕</button>}
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
                                            <th>المستخدم</th><th className="c">الإجراء</th><th>القسم</th>
                                            <th className="c">رقم العنصر</th><th>التفاصيل</th><th>التاريخ والوقت</th>
                                        </tr></thead>
                                        <tbody>
                                            {items.map((r, i) => {
                                                const a = ACTIONS[r.actionType] || { label: r.actionType, style: {} };
                                                return (
                                                    <tr key={r.id}>
                                                        <td style={{ color: T.gray500, fontSize: '.68rem', textAlign: 'center' }}>
                                                            {(page - 1) * ITEMS_PER_PAGE + i + 1}
                                                        </td>
                                                        <td>
                                                            <div className="adm-uname">{r.adminName || '—'}</div>
                                                            <div className="adm-email">{r.adminEmail}</div>
                                                            <span className="adm-mode-badge" style={r.adminRole === 'Manager'
                                                                ? { background: '#fef3c7', color: '#92400e' }
                                                                : { background: '#e0f2fe', color: '#0369a1' }}>
                                                                {r.adminRole === 'Manager' ? '🔐 مدير' : '👤 أدمن'}
                                                            </span>
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <span className="adm-mode-badge" style={a.style}>{a.label}</span>
                                                        </td>
                                                        <td>{ENTITIES[r.entityType] || r.entityType}</td>
                                                        <td style={{ textAlign: 'center' }}>{r.entityId || '—'}</td>
                                                        <td dir="auto" style={{ maxWidth: 380, whiteSpace: 'normal', lineHeight: 1.7, fontSize: '.72rem' }}>
                                                            {r.details || '—'}
                                                        </td>
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