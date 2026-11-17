// src/pages/admin/CertificationsTab.jsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { T } from '../../components/admin/constants';

const API_BASE = 'https://icemt.arabcont.com/api/admin/AdminCertifications';

const TYPES = [
    { value: 1, label: 'شهادة / اعتماد' },
    { value: 2, label: 'خطاب شكر' },
];
const typeLabel = (v) => TYPES.find(t => t.value === Number(v))?.label || '—';

function apiToForm(m) {
    return {
        id: m.id,
        type: m.type ?? 1,
        title: m.title || '',
        description: m.description || '',
        linkUrl: m.linkUrl || '',
        linkText: m.linkText || '',
        displayOrder: m.displayOrder ?? 0,
        isActive: m.isActive ?? true,
        photo: m.pic || null,
    };
}

function formToApi(f) {
    return {
        type: Number(f.type),
        title: f.title,
        description: f.description,
        linkUrl: f.linkUrl,
        linkText: f.linkText,
        displayOrder: Number(f.displayOrder) || 0,
        isActive: !!f.isActive,
    };
}

const BLANK = {
    id: 0, type: 1, title: '', description: '', linkUrl: '', linkText: '',
    displayOrder: 0, isActive: true, photo: null,
};

function initials(text = '') {
    return text.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '؟';
}

const CertificationsTab = () => {
    // ── ADAPT HERE if your admin tabs get the token differently ──
    const { getToken } = useAuth();
    const authFetch = async (url, options = {}) => {
        const token = await getToken();
        return fetch(url, {
            ...options,
            headers: { ...(options.headers || {}), Authorization: `Bearer ${token}` },
        });
    };
    // ─────────────────────────────────────────────────────────────

    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState({ ...BLANK });
    const [isNew, setIsNew] = useState(false);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [notification, setNotification] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listLoading, setListLoading] = useState(true);
    const fileRef = useRef();
    const pendingPhotoRef = useRef(null);

    const toast = (msg, type = 'success') => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3500);
    };

    useEffect(() => { fetchAll(); }, []);

    const fetchAll = async (selectId = null) => {
        setListLoading(true);
        try {
            const res = await authFetch(API_BASE);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const mapped = (await res.json()).map(apiToForm);
            setItems(mapped);
            const target = mapped.find(m => m.id === selectId) || mapped[0];
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

    const q = search.toLowerCase();
    const filtered = items.filter(m =>
        (typeFilter === 'all' || m.type === typeFilter) &&
        m.title.toLowerCase().includes(q)
    );

    const pick = (m) => {
        setSelected(m);
        setForm({ ...m });
        setIsNew(false);
        setDeleteConfirm(false);
        pendingPhotoRef.current = null;
    };

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    };

    const applyPhoto = useCallback((file) => {
        if (!file || !file.type.startsWith('image/')) return;
        pendingPhotoRef.current = file;
        const reader = new FileReader();
        reader.onload = e => setForm(f => ({ ...f, photo: e.target.result }));
        reader.readAsDataURL(file);
    }, []);

    const uploadPhoto = async (id, file) => {
        const fd = new FormData();
        fd.append('file', file);
        const res = await authFetch(`${API_BASE}/${id}/photo`, { method: 'POST', body: fd });
        if (!res.ok) throw new Error(`فشل رفع الصورة: HTTP ${res.status}`);
    };

    const handleSave = async () => {
        if (!form.title.trim()) { toast('العنوان مطلوب', 'error'); return; }
        if (form.linkUrl.trim() && !/^https?:\/\//i.test(form.linkUrl.trim())) {
            toast('الرابط يجب أن يبدأ بـ http:// أو https://', 'error');
            return;
        }
        setLoading(true);
        try {
            const body = JSON.stringify(formToApi(form));
            const headers = { 'Content-Type': 'application/json' };
            let id = form.id;

            if (isNew) {
                const res = await authFetch(API_BASE, { method: 'POST', headers, body });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                id = (await res.json()).id;
            } else {
                const res = await authFetch(`${API_BASE}/${form.id}`, { method: 'PUT', headers, body });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
            }

            if (pendingPhotoRef.current) {
                await uploadPhoto(id, pendingPhotoRef.current);
                pendingPhotoRef.current = null;
            }

            await fetchAll(id);
            toast(isNew ? 'تمت الإضافة بنجاح' : 'تم حفظ التغييرات بنجاح');
        } catch (err) {
            toast(`حدث خطأ: ${err.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleNew = () => {
        setForm({ ...BLANK, type: typeFilter === 'all' ? 1 : typeFilter });
        setSelected(null);
        setIsNew(true);
        setDeleteConfirm(false);
        pendingPhotoRef.current = null;
    };

    const handleDelete = async () => {
        if (!deleteConfirm) { setDeleteConfirm(true); return; }
        setLoading(true);
        try {
            const res = await authFetch(`${API_BASE}/${selected.id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            setDeleteConfirm(false);
            await fetchAll();
            toast('تم الحذف', 'error');
        } catch (err) {
            toast(`فشل الحذف: ${err.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        if (isNew) setForm({ ...BLANK }); else setForm({ ...selected });
        setDeleteConfirm(false);
        pendingPhotoRef.current = null;
        toast('تم إلغاء التغييرات', 'info');
    };

    const isCertificate = Number(form.type) === 1;

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

                {/* ══ LEFT PANEL ══ */}
                <div className="lec-panel" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto', position: 'sticky', top: 0 }}>
                    <div className="lec-panel-hdr">
                        <span className="lec-count-badge">{filtered.length}</span>
                        <span style={{ fontWeight: 800, fontSize: '.8rem', color: '#0a0a0a', flex: 1, textAlign: 'center' }}>
                            الشهادات وخطابات الشكر
                        </span>
                        <button className="lec-new-btn" onClick={handleNew}>+ جديد</button>
                    </div>

                    <div style={{ padding: '10px 10px 0', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {[{ id: 'all', label: 'الكل' }, { id: 1, label: 'الشهادات' }, { id: 2, label: 'خطابات الشكر' }].map(f => (
                            <button
                                key={String(f.id)}
                                className="adm-fclear"
                                style={typeFilter === f.id ? { background: T.blue, color: '#fff' } : undefined}
                                onClick={() => setTypeFilter(f.id)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    <div style={{ padding: '10px 10px 6px', position: 'relative' }}>
                        <div className="adm-search" style={{ minWidth: 'unset' }}>
                            <input
                                type="text"
                                placeholder="بحث بالعنوان..."
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
                            filtered.map(m => (
                                <div
                                    key={m.id}
                                    className={`lec-row${selected?.id === m.id ? ' active' : ''}`}
                                    onClick={() => pick(m)}
                                    style={m.isActive ? undefined : { opacity: 0.5 }}
                                >
                                    <div className="lec-avatar">
                                        {m.photo ? <img src={m.photo} alt="" /> : <span>{initials(m.title)}</span>}
                                    </div>
                                    <div className="lec-row-info">
                                        <div className="lec-row-name">{m.title || 'بدون عنوان'}</div>
                                        <div className="lec-row-spec">{typeLabel(m.type)}{m.isActive ? '' : ' • مخفي'}</div>
                                    </div>
                                    <div className="lec-row-id">#{m.id}</div>
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
                                    {isNew ? 'عنصر جديد' : `ID: #${selected?.id}`}
                                </div>
                                <h2 className="lec-form-title">
                                    {isNew ? '➕ إضافة عنصر جديد' : '✏️ تعديل العنصر'}
                                </h2>
                                {!isNew && selected && <p className="lec-form-sub">{selected.title}</p>}
                            </div>
                            <div className="lec-stat-pill">🏅 {items.length} عنصر</div>
                        </div>

                        <div className="lec-form-body">
                            <div className="lec-top-row">

                                {/* Image */}
                                <div className="lec-photo-col">
                                    <label className="lec-label">الصورة</label>
                                    <div
                                        className={`lec-photo-zone${dragOver ? ' over' : ''}`}
                                        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                                        onDragLeave={() => setDragOver(false)}
                                        onDrop={e => { e.preventDefault(); setDragOver(false); applyPhoto(e.dataTransfer.files[0]); }}
                                        onClick={() => fileRef.current.click()}
                                    >
                                        {form.photo ? (
                                            <>
                                                <img src={form.photo} alt="" className="lec-photo-img" style={{ objectFit: 'contain' }} />
                                                <div className="lec-photo-overlay">
                                                    <span style={{ fontSize: '1.6rem' }}>📷</span>
                                                    <span className="lec-photo-overlay-txt">تغيير الصورة</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="lec-photo-placeholder">
                                                <div className="lec-photo-icon">🏅</div>
                                                <span className="lec-photo-hint">اسحب صورة هنا<br />أو اضغط للاختيار</span>
                                                <span className="lec-photo-types">JPG · PNG · WEBP</span>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp"
                                        style={{ display: 'none' }}
                                        onChange={e => applyPhoto(e.target.files[0])}
                                    />
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
                                        <label className="lec-label">النوع</label>
                                        <select className="lec-inp" name="type" value={form.type} onChange={handleChange}>
                                            {TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                                        </select>
                                    </div>
                                    <div className="lec-field" style={{ gridColumn: '1/-1' }}>
                                        <label className="lec-label">العنوان *</label>
                                        <input className="lec-inp" name="title" value={form.title} onChange={handleChange} placeholder="مثال: شهادة الاعتماد المؤسسي" />
                                    </div>
                                    <div className="lec-field">
                                        <label className="lec-label">ترتيب العرض (الأصغر أولاً)</label>
                                        <input className="lec-inp" type="number" name="displayOrder" value={form.displayOrder} onChange={handleChange} />
                                    </div>
                                    <div className="lec-field" style={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
                                            <span className="lec-label" style={{ margin: 0 }}>ظاهر في الصفحة</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {isCertificate && (
                                <>
                                    <div className="lec-divider" />

                                    <div className="lec-field">
                                        <label className="lec-label">الوصف</label>
                                        <textarea className="lec-inp" rows={5} name="description" value={form.description} onChange={handleChange} placeholder="نص الوصف الذي يظهر تحت العنوان..." />
                                    </div>

                                    <div className="lec-fields-grid" style={{ marginTop: 12 }}>
                                        <div className="lec-field" style={{ gridColumn: '1/-1' }}>
                                            <label className="lec-label">الرابط (اختياري)</label>
                                            <input className="lec-inp" name="linkUrl" value={form.linkUrl} onChange={handleChange} placeholder="https://..." style={{ direction: 'ltr', textAlign: 'left' }} />
                                        </div>
                                        <div className="lec-field" style={{ gridColumn: '1/-1' }}>
                                            <label className="lec-label">نص الرابط</label>
                                            <input className="lec-inp" name="linkText" value={form.linkText} onChange={handleChange} placeholder="مثال: عرض الاعتماد على موقع إتقان" />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Actions */}
                            <div className="lec-actions" style={{ marginTop: 16 }}>
                                <button className="lec-act-btn save" onClick={handleSave} disabled={loading}>
                                    {loading ? '⏳ جاري الحفظ...' : '💾 حفظ'}
                                </button>
                                <button className="lec-act-btn new" onClick={handleNew} disabled={loading}>➕ جديد</button>
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
        </div>
    );
};

export default CertificationsTab;