// src/pages/admin/CustomersTab.jsx   (same folder as TeamTab.jsx / mohadren.jsx)
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { T, API_BASE as API_ROOT } from '../../components/admin/constants';

const API_BASE = `${API_ROOT}/admin/AdminCustomer`;

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_LOGO_BYTES = 5 * 1024 * 1024;

function apiToForm(c) {
    return {
        id: c.id,
        name: c.name || '',
        displayOrder: c.displayOrder ?? 0,
        isActive: c.isActive ?? true,
        logo: c.logo || null,
    };
}

function formToApi(f) {
    return {
        name: f.name.trim(),
        displayOrder: Number(f.displayOrder) || 0,
        isActive: !!f.isActive,
    };
}

const BLANK = { id: 0, name: '', displayOrder: 0, isActive: true, logo: null };

function initials(name = '') {
    return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '؟';
}

const httpError = (res) =>
    res.status === 401 || res.status === 403
        ? 'غير مصرح لك بهذا الإجراء (سجّل الدخول مرة أخرى)'
        : `HTTP ${res.status}`;

const CustomersTab = () => {
    const { getToken } = useAuth();

    // Attaches the Clerk token. Does NOT set Content-Type, so FormData keeps its multipart boundary.
    const authFetch = useCallback(async (url, options = {}) => {
        const token = await getToken();
        const headers = { ...(options.headers || {}) };
        if (token) headers.Authorization = `Bearer ${token}`;
        return fetch(url, { ...options, headers });
    }, [getToken]);

    const [customers, setCustomers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState({ ...BLANK });
    const [isNew, setIsNew] = useState(false);
    const [search, setSearch] = useState('');
    const [notification, setNotification] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listLoading, setListLoading] = useState(true);
    const fileRef = useRef();
    const pendingLogoRef = useRef(null);   // a newly picked file, not uploaded yet
    const removeLogoRef = useRef(false);   // user pressed "حذف الصورة" on an existing logo

    const toast = (msg, type = 'success') => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3500);
    };

    useEffect(() => { fetchAll(); }, []); // eslint-disable-line

    // Reloads the list from the server (keeps the order correct) and selects one customer
    const fetchAll = async (selectId = null) => {
        setListLoading(true);
        try {
            const res = await authFetch(API_BASE);
            if (!res.ok) throw new Error(httpError(res));
            const mapped = (await res.json()).map(apiToForm);
            setCustomers(mapped);
            const target = mapped.find(c => c.id === selectId) || mapped[0];
            if (target) {
                setSelected(target);
                setForm({ ...target });
                setIsNew(false);
            } else {
                setSelected(null);
                setForm({ ...BLANK });
                setIsNew(true);
            }
        } catch (err) {
            toast(`فشل تحميل البيانات: ${err.message}`, 'error');
        } finally {
            setListLoading(false);
        }
    };

    const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const resetPending = () => {
        pendingLogoRef.current = null;
        removeLogoRef.current = false;
    };

    const pick = (c) => {
        setSelected(c);
        setForm({ ...c });
        setIsNew(false);
        setDeleteConfirm(false);
        resetPending();
    };

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    };

    const applyLogo = useCallback((file) => {
        if (!file) return;
        if (!ALLOWED_TYPES.includes(file.type)) { toast('الأنواع المسموحة: JPG · PNG · WEBP', 'error'); return; }
        if (file.size > MAX_LOGO_BYTES) { toast('الحد الأقصى لحجم الصورة 5 ميجا', 'error'); return; }
        pendingLogoRef.current = file;
        removeLogoRef.current = false;
        const reader = new FileReader();
        reader.onload = e => setForm(f => ({ ...f, logo: e.target.result }));
        reader.readAsDataURL(file);
    }, []); // eslint-disable-line

    const handleRemoveLogo = (e) => {
        e.stopPropagation();
        // a not-yet-uploaded file is simply dropped; a saved logo is deleted on the server at save time
        if (!pendingLogoRef.current && selected?.logo) removeLogoRef.current = true;
        pendingLogoRef.current = null;
        if (fileRef.current) fileRef.current.value = '';
        setForm(f => ({ ...f, logo: null }));
    };

    const uploadLogo = async (id, file) => {
        const fd = new FormData();
        fd.append('file', file);
        const res = await authFetch(`${API_BASE}/${id}/logo`, { method: 'POST', body: fd });
        if (!res.ok) throw new Error(`فشل رفع الصورة: ${httpError(res)}`);
    };

    const deleteLogo = async (id) => {
        const res = await authFetch(`${API_BASE}/${id}/logo`, { method: 'DELETE' });
        if (!res.ok) throw new Error(`فشل حذف الصورة: ${httpError(res)}`);
    };

    const handleSave = async () => {
        if (!form.name.trim()) { toast('اسم العميل مطلوب', 'error'); return; }
        setLoading(true);
        try {
            const body = JSON.stringify(formToApi(form));
            const headers = { 'Content-Type': 'application/json' };
            let id = form.id;

            if (isNew) {
                const res = await authFetch(API_BASE, { method: 'POST', headers, body });
                if (!res.ok) throw new Error(httpError(res));
                id = (await res.json()).id;
            } else {
                const res = await authFetch(`${API_BASE}/${form.id}`, { method: 'PUT', headers, body });
                if (!res.ok) throw new Error(httpError(res));
            }

            if (pendingLogoRef.current) {
                await uploadLogo(id, pendingLogoRef.current);
            } else if (removeLogoRef.current) {
                await deleteLogo(id);
            }
            resetPending();

            await fetchAll(id);
            toast(isNew ? 'تم إضافة العميل بنجاح' : 'تم حفظ التغييرات بنجاح');
        } catch (err) {
            toast(`حدث خطأ: ${err.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleNew = () => {
        setForm({ ...BLANK });
        setSelected(null);
        setIsNew(true);
        setDeleteConfirm(false);
        resetPending();
    };

    const handleDelete = async () => {
        if (!deleteConfirm) { setDeleteConfirm(true); return; }
        setLoading(true);
        try {
            const res = await authFetch(`${API_BASE}/${selected.id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error(httpError(res));
            setDeleteConfirm(false);
            await fetchAll();
            toast('تم حذف العميل', 'error');
        } catch (err) {
            toast(`فشل الحذف: ${err.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        if (isNew) setForm({ ...BLANK }); else setForm({ ...selected });
        setDeleteConfirm(false);
        resetPending();
        toast('تم إلغاء التغييرات', 'info');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

            {notification && (
                <div className={`lec-notif lec-notif-${notification.type}`} style={{ marginBottom: 12 }}>
                    <span>{notification.type === 'success' ? '✅' : notification.type === 'error' ? '❌' : 'ℹ️'}</span>
                    {notification.msg}
                </div>
            )}

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
                <div className="lec-panel" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto', position: 'sticky', top: 0 }}>
                    <div className="lec-panel-hdr">
                        <span className="lec-count-badge">{filtered.length}</span>
                        <span style={{ fontWeight: 800, fontSize: '.8rem', color: '#0a0a0a', flex: 1, textAlign: 'center' }}>
                            العملاء
                        </span>
                        <button className="lec-new-btn" onClick={handleNew}>+ جديد</button>
                    </div>

                    <div style={{ padding: '10px 10px 6px', position: 'relative' }}>
                        <div className="adm-search" style={{ minWidth: 'unset' }}>
                            <input
                                type="text"
                                placeholder="بحث باسم العميل..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{ fontSize: '.76rem' }}
                            />
                            {search && <button className="lec-search-clear" onClick={() => setSearch('')}>✕</button>}
                        </div>
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
                            filtered.map(c => (
                                <div
                                    key={c.id}
                                    className={`lec-row${selected?.id === c.id ? ' active' : ''}`}
                                    onClick={() => pick(c)}
                                    style={c.isActive ? undefined : { opacity: 0.5 }}
                                >
                                    <div className="lec-avatar">
                                        {c.logo
                                            ? <img src={c.logo} alt="" style={{ objectFit: 'contain' }} />
                                            : <span>{initials(c.name)}</span>}
                                    </div>
                                    <div className="lec-row-info">
                                        <div className="lec-row-name">{c.name || 'بدون اسم'}</div>
                                        <div className="lec-row-spec">ترتيب: {c.displayOrder}{c.isActive ? '' : ' • مخفي'}</div>
                                    </div>
                                    <div className="lec-row-id">#{c.id}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* ══ FORM AREA ══ */}
                <div className="lec-form-wrap" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
                    <div className="adm-card lec-form-card">

                        <div className="lec-form-hdr">
                            <div>
                                <div className="adm-hero-tag" style={{ marginBottom: 6, position: 'relative', zIndex: 1 }}>
                                    {isNew ? 'عميل جديد' : `ID: #${selected?.id}`}
                                </div>
                                <h2 className="lec-form-title">
                                    {isNew ? '➕ إضافة عميل جديد' : '✏️ تعديل بيانات العميل'}
                                </h2>
                                {!isNew && selected && <p className="lec-form-sub">{selected.name}</p>}
                            </div>
                            <div className="lec-stat-pill">🏢 {customers.length} عميل</div>
                        </div>

                        <div className="lec-form-body">
                            <div className="lec-top-row">

                                {/* Logo */}
                                <div className="lec-photo-col">
                                    <label className="lec-label">الشعار (اللوجو)</label>
                                    <div
                                        className={`lec-photo-zone${dragOver ? ' over' : ''}`}
                                        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                                        onDragLeave={() => setDragOver(false)}
                                        onDrop={e => { e.preventDefault(); setDragOver(false); applyLogo(e.dataTransfer.files[0]); }}
                                        onClick={() => fileRef.current.click()}
                                    >
                                        {form.logo ? (
                                            <>
                                                <img src={form.logo} alt="شعار العميل" className="lec-photo-img" style={{ objectFit: 'contain', background: '#fff' }} />
                                                <div className="lec-photo-overlay">
                                                    <span style={{ fontSize: '1.6rem' }}>📷</span>
                                                    <span className="lec-photo-overlay-txt">تغيير الشعار</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="lec-photo-placeholder">
                                                <div className="lec-photo-icon">🏢</div>
                                                <span className="lec-photo-hint">اسحب الشعار هنا<br />أو اضغط للاختيار</span>
                                                <span className="lec-photo-types">JPG · PNG · WEBP</span>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp"
                                        style={{ display: 'none' }}
                                        onChange={e => applyLogo(e.target.files[0])}
                                    />
                                    {form.logo && (
                                        <button className="lec-remove-photo" onClick={handleRemoveLogo}>
                                            ✕ حذف الصورة
                                        </button>
                                    )}
                                </div>

                                {/* Fields */}
                                <div className="lec-fields-grid">
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
                                        <label className="lec-label">اسم العميل *</label>
                                        <input className="lec-inp" name="name" value={form.name} onChange={handleChange} placeholder="مثال: جامعة القاهرة" />
                                    </div>
                                    <div className="lec-field" style={{ gridColumn: '1/-1' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
                                            <span className="lec-label" style={{ margin: 0 }}>ظاهر في صفحة عملائنا</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="lec-actions">
                                <button className="lec-act-btn save" onClick={handleSave} disabled={loading}>
                                    {loading ? '⏳ جاري الحفظ...' : '💾 حفظ'}
                                </button>
                                <button className="lec-act-btn new" onClick={handleNew} disabled={loading}>➕ عميل جديد</button>
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
                                        <button className="lec-act-btn delete" onClick={handleDelete} disabled={loading}>🗑 حذف العميل</button>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CustomersTab;