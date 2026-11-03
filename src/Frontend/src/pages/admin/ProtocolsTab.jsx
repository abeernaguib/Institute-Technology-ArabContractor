// src/pages/admin/ProtocolsTab.jsx   (same folder as CustomersTab.jsx / TeamTab.jsx)
import React, { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { T, API_BASE as API_ROOT } from '../../components/admin/constants';

const API_BASE = `${API_ROOT}/admin/AdminProtocol`;

const BLANK_ITEM = { id: 0, name: '', groupId: 0, displayOrder: 0, isActive: true };
const BLANK_GROUP = { id: 0, title: '', icon: '', displayOrder: 0, isActive: true };

const httpError = (res) =>
    res.status === 401 || res.status === 403
        ? 'غير مصرح لك بهذا الإجراء (سجّل الدخول مرة أخرى)'
        : `HTTP ${res.status}`;

// Prefer the message the API sends (e.g. "group still has protocols"), fall back to the HTTP status
const errMsg = async (res) => {
    try {
        const j = await res.json();
        if (j?.message) return j.message;
    } catch { /* not json */ }
    return httpError(res);
};

// ══════════════════════════════════════════════════════════════════════════════
// Protocols (items) pane
// ══════════════════════════════════════════════════════════════════════════════
const ItemsPane = ({ authFetch, toast, groups }) => {
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState({ ...BLANK_ITEM });
    const [isNew, setIsNew] = useState(false);
    const [search, setSearch] = useState('');
    const [groupFilter, setGroupFilter] = useState('all');
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listLoading, setListLoading] = useState(true);

    const firstGroupId = groups[0]?.id ?? 0;
    const blank = useCallback(
        () => ({ ...BLANK_ITEM, groupId: groupFilter !== 'all' ? Number(groupFilter) : firstGroupId }),
        [groupFilter, firstGroupId]
    );

    const fetchAll = useCallback(async (selectId = null) => {
        setListLoading(true);
        try {
            const res = await authFetch(API_BASE);
            if (!res.ok) throw new Error(await errMsg(res));
            const data = await res.json();
            setItems(data);
            const target = data.find(i => i.id === selectId) || data[0];
            if (target) {
                setSelected(target);
                setForm({ ...target });
                setIsNew(false);
            } else {
                setSelected(null);
                setForm({ ...BLANK_ITEM, groupId: firstGroupId });
                setIsNew(true);
            }
        } catch (err) {
            toast(`فشل تحميل البيانات: ${err.message}`, 'error');
        } finally {
            setListLoading(false);
        }
    }, [authFetch, toast, firstGroupId]);

    useEffect(() => { fetchAll(); }, []); // eslint-disable-line

    const q = search.trim().toLowerCase();
    const filtered = items.filter(i =>
        (groupFilter === 'all' || i.groupId === Number(groupFilter)) &&
        (!q || i.name.toLowerCase().includes(q) || (i.groupTitle || '').toLowerCase().includes(q))
    );

    const pick = (it) => { setSelected(it); setForm({ ...it }); setIsNew(false); setDeleteConfirm(false); };

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSave = async () => {
        if (!form.name.trim()) { toast('اسم البروتوكول مطلوب', 'error'); return; }
        if (!Number(form.groupId)) { toast('اختر القسم', 'error'); return; }
        setLoading(true);
        try {
            const body = JSON.stringify({
                groupId: Number(form.groupId),
                name: form.name.trim(),
                displayOrder: Number(form.displayOrder) || 0,
                isActive: !!form.isActive,
            });
            const headers = { 'Content-Type': 'application/json' };
            let id = form.id;

            if (isNew) {
                const res = await authFetch(API_BASE, { method: 'POST', headers, body });
                if (!res.ok) throw new Error(await errMsg(res));
                id = (await res.json()).id;
            } else {
                const res = await authFetch(`${API_BASE}/${form.id}`, { method: 'PUT', headers, body });
                if (!res.ok) throw new Error(await errMsg(res));
            }
            await fetchAll(id);
            toast(isNew ? 'تم إضافة البروتوكول بنجاح' : 'تم حفظ التغييرات بنجاح');
        } catch (err) {
            toast(`حدث خطأ: ${err.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleNew = () => { setForm(blank()); setSelected(null); setIsNew(true); setDeleteConfirm(false); };

    const handleDelete = async () => {
        if (!deleteConfirm) { setDeleteConfirm(true); return; }
        setLoading(true);
        try {
            const res = await authFetch(`${API_BASE}/${selected.id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error(await errMsg(res));
            setDeleteConfirm(false);
            await fetchAll();
            toast('تم حذف البروتوكول', 'error');
        } catch (err) {
            toast(`فشل الحذف: ${err.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        if (isNew) setForm(blank()); else setForm({ ...selected });
        setDeleteConfirm(false);
        toast('تم إلغاء التغييرات', 'info');
    };

    return (
        <>
            {loading && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 9999, fontSize: '1.4rem', color: '#fff', gap: 10,
                }}>
                    <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
                    جاري الحفظ...
                </div>
            )}

            <div className="lec-layout">
                {/* ══ LIST PANEL ══ */}
                <div className="lec-panel" style={{ height: 'calc(100vh - 170px)', overflowY: 'auto', position: 'sticky', top: 0 }}>
                    <div className="lec-panel-hdr">
                        <span className="lec-count-badge">{filtered.length}</span>
                        <span style={{ fontWeight: 800, fontSize: '.8rem', color: '#0a0a0a', flex: 1, textAlign: 'center' }}>
                            البروتوكولات
                        </span>
                        <button className="lec-new-btn" onClick={handleNew}>+ جديد</button>
                    </div>

                    <div style={{ padding: '10px 10px 6px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <div className="adm-search" style={{ minWidth: 'unset' }}>
                            <input
                                type="text"
                                placeholder="بحث بالاسم أو القسم..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{ fontSize: '.76rem' }}
                            />
                            {search && <button className="lec-search-clear" onClick={() => setSearch('')}>✕</button>}
                        </div>
                        <select className="lec-inp" value={groupFilter} onChange={e => setGroupFilter(e.target.value)} style={{ fontSize: '.76rem' }}>
                            <option value="all">كل الأقسام</option>
                            {groups.map(g => <option key={g.id} value={g.id}>{g.icon} {g.title}</option>)}
                        </select>
                    </div>

                    <div className="lec-list">
                        {listLoading ? (
                            <div className="adm-empty" style={{ padding: '32px 12px' }}>
                                <div className="adm-emi">⏳</div><p>جاري التحميل...</p>
                            </div>
                        ) : filtered.length === 0 ? (
                            <div className="adm-empty" style={{ padding: '32px 12px' }}>
                                <div className="adm-emi">🔍</div><p>لا توجد نتائج</p>
                            </div>
                        ) : (
                            filtered.map(it => (
                                <div
                                    key={it.id}
                                    className={`lec-row${selected?.id === it.id ? ' active' : ''}`}
                                    onClick={() => pick(it)}
                                    style={it.isActive ? undefined : { opacity: 0.5 }}
                                >
                                    <div className="lec-avatar"><span>{it.groupIcon || '📄'}</span></div>
                                    <div className="lec-row-info">
                                        <div className="lec-row-name">{it.name}</div>
                                        <div className="lec-row-spec">{it.groupTitle || '—'}{it.isActive ? '' : ' • مخفي'}</div>
                                    </div>
                                    <div className="lec-row-id">#{it.id}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* ══ FORM AREA ══ */}
                <div className="lec-form-wrap" style={{ height: 'calc(100vh - 170px)', overflowY: 'auto' }}>
                    <div className="adm-card lec-form-card">
                        <div className="lec-form-hdr">
                            <div>
                                <div className="adm-hero-tag" style={{ marginBottom: 6, position: 'relative', zIndex: 1 }}>
                                    {isNew ? 'بروتوكول جديد' : `ID: #${selected?.id}`}
                                </div>
                                <h2 className="lec-form-title">{isNew ? '➕ إضافة بروتوكول جديد' : '✏️ تعديل البروتوكول'}</h2>
                                {!isNew && selected && <p className="lec-form-sub">{selected.name}</p>}
                            </div>
                            <div className="lec-stat-pill">📑 {items.length} بروتوكول</div>
                        </div>

                        <div className="lec-form-body">
                            {groups.length === 0 && (
                                <div className="lec-notif lec-notif-error" style={{ marginBottom: 12 }}>
                                    ❌ لا توجد أقسام. أضف قسمًا أولاً من تبويب "الأقسام" بالأعلى.
                                </div>
                            )}

                            <div className="lec-fields-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                                <div className="lec-field">
                                    <label className="lec-label">الرقم</label>
                                    <input
                                        className="lec-inp"
                                        value={isNew ? 'تلقائي' : form.id}
                                        disabled
                                        style={{ background: T.gray100, color: T.gray500, cursor: 'not-allowed' }}
                                    />
                                </div>
                                <div className="lec-field">
                                    <label className="lec-label">ترتيب العرض (الأصغر أولاً)</label>
                                    <input className="lec-inp" type="number" name="displayOrder" value={form.displayOrder} onChange={handleChange} />
                                </div>
                                <div className="lec-field" style={{ gridColumn: '1/-1' }}>
                                    <label className="lec-label">القسم *</label>
                                    <select className="lec-inp" name="groupId" value={form.groupId} onChange={handleChange}>
                                        <option value={0} disabled>— اختر القسم —</option>
                                        {groups.map(g => <option key={g.id} value={g.id}>{g.icon} {g.title}</option>)}
                                    </select>
                                </div>
                                <div className="lec-field" style={{ gridColumn: '1/-1' }}>
                                    <label className="lec-label">اسم البروتوكول / الجهة *</label>
                                    <input className="lec-inp" name="name" value={form.name} onChange={handleChange} placeholder="مثال: جامعة بنها" />
                                </div>
                                <div className="lec-field" style={{ gridColumn: '1/-1' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                        <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
                                        <span className="lec-label" style={{ margin: 0 }}>ظاهر في صفحة البروتوكولات</span>
                                    </label>
                                </div>
                            </div>

                            <div className="lec-actions" style={{ marginTop: 16 }}>
                                <button className="lec-act-btn save" onClick={handleSave} disabled={loading || groups.length === 0}>
                                    {loading ? '⏳ جاري الحفظ...' : '💾 حفظ'}
                                </button>
                                <button className="lec-act-btn new" onClick={handleNew} disabled={loading}>➕ بروتوكول جديد</button>
                                <button className="lec-act-btn reset" onClick={handleReset} disabled={loading}>↩ إلغاء</button>
                                <div style={{ flex: 1 }} />
                                {!isNew && (
                                    deleteConfirm ? (
                                        <div className="lec-delete-confirm">
                                            <span className="lec-delete-warn">⚠️ هل أنت متأكد من الحذف؟</span>
                                            <button className="lec-act-btn delete" onClick={handleDelete} disabled={loading}>تأكيد الحذف</button>
                                            <button className="adm-fclear" onClick={() => setDeleteConfirm(false)}>إلغاء</button>
                                        </div>
                                    ) : (
                                        <button className="lec-act-btn delete" onClick={handleDelete} disabled={loading}>🗑 حذف</button>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// ══════════════════════════════════════════════════════════════════════════════
// Groups (sections) pane
// ══════════════════════════════════════════════════════════════════════════════
const GroupsPane = ({ authFetch, toast, onChanged }) => {
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState({ ...BLANK_GROUP });
    const [isNew, setIsNew] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listLoading, setListLoading] = useState(true);

    const fetchAll = useCallback(async (selectId = null) => {
        setListLoading(true);
        try {
            const res = await authFetch(`${API_BASE}/groups`);
            if (!res.ok) throw new Error(await errMsg(res));
            const data = await res.json();
            setList(data);
            const target = data.find(g => g.id === selectId) || data[0];
            if (target) {
                setSelected(target);
                setForm({ ...target, icon: target.icon || '' });
                setIsNew(false);
            } else {
                setSelected(null);
                setForm({ ...BLANK_GROUP });
                setIsNew(true);
            }
        } catch (err) {
            toast(`فشل تحميل الأقسام: ${err.message}`, 'error');
        } finally {
            setListLoading(false);
        }
    }, [authFetch, toast]);

    useEffect(() => { fetchAll(); }, []); // eslint-disable-line

    const pick = (g) => { setSelected(g); setForm({ ...g, icon: g.icon || '' }); setIsNew(false); setDeleteConfirm(false); };

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSave = async () => {
        if (!form.title.trim()) { toast('عنوان القسم مطلوب', 'error'); return; }
        setLoading(true);
        try {
            const body = JSON.stringify({
                title: form.title.trim(),
                icon: form.icon.trim() || null,
                displayOrder: Number(form.displayOrder) || 0,
                isActive: !!form.isActive,
            });
            const headers = { 'Content-Type': 'application/json' };
            let id = form.id;

            if (isNew) {
                const res = await authFetch(`${API_BASE}/groups`, { method: 'POST', headers, body });
                if (!res.ok) throw new Error(await errMsg(res));
                id = (await res.json()).id;
            } else {
                const res = await authFetch(`${API_BASE}/groups/${form.id}`, { method: 'PUT', headers, body });
                if (!res.ok) throw new Error(await errMsg(res));
            }
            await fetchAll(id);
            onChanged();
            toast(isNew ? 'تم إضافة القسم بنجاح' : 'تم حفظ التغييرات بنجاح');
        } catch (err) {
            toast(`حدث خطأ: ${err.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleNew = () => { setForm({ ...BLANK_GROUP }); setSelected(null); setIsNew(true); setDeleteConfirm(false); };

    const handleDelete = async () => {
        if (!deleteConfirm) { setDeleteConfirm(true); return; }
        setLoading(true);
        try {
            const res = await authFetch(`${API_BASE}/groups/${selected.id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error(await errMsg(res));   // 409 → "section still has protocols"
            setDeleteConfirm(false);
            await fetchAll();
            onChanged();
            toast('تم حذف القسم', 'error');
        } catch (err) {
            setDeleteConfirm(false);
            toast(err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        if (isNew) setForm({ ...BLANK_GROUP }); else setForm({ ...selected, icon: selected.icon || '' });
        setDeleteConfirm(false);
        toast('تم إلغاء التغييرات', 'info');
    };

    return (
        <>
            {loading && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 9999, fontSize: '1.4rem', color: '#fff', gap: 10,
                }}>
                    <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
                    جاري الحفظ...
                </div>
            )}

            <div className="lec-layout">
                <div className="lec-panel" style={{ height: 'calc(100vh - 170px)', overflowY: 'auto', position: 'sticky', top: 0 }}>
                    <div className="lec-panel-hdr">
                        <span className="lec-count-badge">{list.length}</span>
                        <span style={{ fontWeight: 800, fontSize: '.8rem', color: '#0a0a0a', flex: 1, textAlign: 'center' }}>الأقسام</span>
                        <button className="lec-new-btn" onClick={handleNew}>+ جديد</button>
                    </div>

                    <div className="lec-list">
                        {listLoading ? (
                            <div className="adm-empty" style={{ padding: '32px 12px' }}>
                                <div className="adm-emi">⏳</div><p>جاري التحميل...</p>
                            </div>
                        ) : list.length === 0 ? (
                            <div className="adm-empty" style={{ padding: '32px 12px' }}>
                                <div className="adm-emi">📂</div><p>لا توجد أقسام</p>
                            </div>
                        ) : (
                            list.map(g => (
                                <div
                                    key={g.id}
                                    className={`lec-row${selected?.id === g.id ? ' active' : ''}`}
                                    onClick={() => pick(g)}
                                    style={g.isActive ? undefined : { opacity: 0.5 }}
                                >
                                    <div className="lec-avatar"><span>{g.icon || '📄'}</span></div>
                                    <div className="lec-row-info">
                                        <div className="lec-row-name">{g.title}</div>
                                        <div className="lec-row-spec">{g.itemsCount} بروتوكول{g.isActive ? '' : ' • مخفي'}</div>
                                    </div>
                                    <div className="lec-row-id">#{g.id}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="lec-form-wrap" style={{ height: 'calc(100vh - 170px)', overflowY: 'auto' }}>
                    <div className="adm-card lec-form-card">
                        <div className="lec-form-hdr">
                            <div>
                                <div className="adm-hero-tag" style={{ marginBottom: 6, position: 'relative', zIndex: 1 }}>
                                    {isNew ? 'قسم جديد' : `ID: #${selected?.id}`}
                                </div>
                                <h2 className="lec-form-title">{isNew ? '➕ إضافة قسم جديد' : '✏️ تعديل القسم'}</h2>
                                {!isNew && selected && <p className="lec-form-sub">{selected.title}</p>}
                            </div>
                            <div className="lec-stat-pill">📂 {list.length} قسم</div>
                        </div>

                        <div className="lec-form-body">
                            <div className="lec-fields-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                                <div className="lec-field">
                                    <label className="lec-label">الرقم</label>
                                    <input
                                        className="lec-inp"
                                        value={isNew ? 'تلقائي' : form.id}
                                        disabled
                                        style={{ background: T.gray100, color: T.gray500, cursor: 'not-allowed' }}
                                    />
                                </div>
                                <div className="lec-field">
                                    <label className="lec-label">ترتيب العرض (الأصغر أولاً)</label>
                                    <input className="lec-inp" type="number" name="displayOrder" value={form.displayOrder} onChange={handleChange} />
                                </div>
                                <div className="lec-field" style={{ gridColumn: '1/-1' }}>
                                    <label className="lec-label">عنوان القسم *</label>
                                    <input className="lec-inp" name="title" value={form.title} onChange={handleChange} placeholder="مثال: البروتوكولات الدولية" />
                                </div>
                                <div className="lec-field" style={{ gridColumn: '1/-1' }}>
                                    <label className="lec-label">الأيقونة (إيموجي)</label>
                                    <input className="lec-inp" name="icon" value={form.icon} onChange={handleChange} placeholder="🌍" maxLength={20} />
                                </div>
                                <div className="lec-field" style={{ gridColumn: '1/-1' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                        <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
                                        <span className="lec-label" style={{ margin: 0 }}>ظاهر في صفحة البروتوكولات</span>
                                    </label>
                                </div>
                            </div>

                            <div className="lec-actions" style={{ marginTop: 16 }}>
                                <button className="lec-act-btn save" onClick={handleSave} disabled={loading}>
                                    {loading ? '⏳ جاري الحفظ...' : '💾 حفظ'}
                                </button>
                                <button className="lec-act-btn new" onClick={handleNew} disabled={loading}>➕ قسم جديد</button>
                                <button className="lec-act-btn reset" onClick={handleReset} disabled={loading}>↩ إلغاء</button>
                                <div style={{ flex: 1 }} />
                                {!isNew && (
                                    deleteConfirm ? (
                                        <div className="lec-delete-confirm">
                                            <span className="lec-delete-warn">⚠️ هل أنت متأكد من الحذف؟</span>
                                            <button className="lec-act-btn delete" onClick={handleDelete} disabled={loading}>تأكيد الحذف</button>
                                            <button className="adm-fclear" onClick={() => setDeleteConfirm(false)}>إلغاء</button>
                                        </div>
                                    ) : (
                                        <button className="lec-act-btn delete" onClick={handleDelete} disabled={loading}>🗑 حذف القسم</button>
                                    )
                                )}
                            </div>
                            <p style={{ fontSize: '.74rem', color: '#6b7280', marginTop: 12 }}>
                                لا يمكن حذف قسم يحتوي على بروتوكولات: انقل بروتوكولاته لقسم آخر أو احذفها أولاً. لإخفاء قسم بدون حذفه، أزل علامة "ظاهر".
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// ══════════════════════════════════════════════════════════════════════════════
// Tab shell: switches between protocols and sections
// ══════════════════════════════════════════════════════════════════════════════
const ProtocolsTab = () => {
    const { getToken } = useAuth();

    // Attaches the Clerk token (no Content-Type here, callers set it for JSON bodies)
    const authFetch = useCallback(async (url, options = {}) => {
        const token = await getToken();
        const headers = { ...(options.headers || {}) };
        if (token) headers.Authorization = `Bearer ${token}`;
        return fetch(url, { ...options, headers });
    }, [getToken]);

    const [view, setView] = useState('items');
    const [groups, setGroups] = useState([]);
    const [notification, setNotification] = useState(null);

    const toast = useCallback((msg, type = 'success') => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3500);
    }, []);

    const loadGroups = useCallback(async () => {
        try {
            const res = await authFetch(`${API_BASE}/groups`);
            if (!res.ok) throw new Error(await errMsg(res));
            setGroups(await res.json());
        } catch (err) {
            toast(`فشل تحميل الأقسام: ${err.message}`, 'error');
        }
    }, [authFetch, toast]);

    useEffect(() => { loadGroups(); }, [loadGroups]);

    const tabBtn = (id, label) => (
        <button
            key={id}
            className={`lec-act-btn ${view === id ? 'save' : 'reset'}`}
            onClick={() => setView(id)}
            style={{ minWidth: 130 }}
        >
            {label}
        </button>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {notification && (
                <div className={`lec-notif lec-notif-${notification.type}`} style={{ marginBottom: 12 }}>
                    <span>{notification.type === 'success' ? '✅' : notification.type === 'error' ? '❌' : 'ℹ️'}</span>
                    {notification.msg}
                </div>
            )}

            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                {tabBtn('items', '📑 البروتوكولات')}
                {tabBtn('groups', '📂 الأقسام')}
            </div>

            {/* key = remount on switch so each pane reloads fresh data */}
            {view === 'items'
                ? <ItemsPane key="items" authFetch={authFetch} toast={toast} groups={groups} />
                : <GroupsPane key="groups" authFetch={authFetch} toast={toast} onChanged={loadGroups} />}
        </div>
    );
};

export default ProtocolsTab;