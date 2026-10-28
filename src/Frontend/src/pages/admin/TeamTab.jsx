// src/components/admin/tabs/TeamTab.jsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { T, API_BASE as API_ROOT } from '../../components/admin/constants';
import { RichTextEditor } from './LecturersTab';
// Adjust this path to the same depth as your T import if needed
import { encodeRichText, decodeRichText, isBlankHtml } from '../../utils/richText';

const API_BASE = `${API_ROOT}/admin/AdminTeam`;

const LEVELS = [
    { value: 1, label: 'رئيس مجلس الإدارة' },
    { value: 2, label: 'مدير المعهد' },
    { value: 3, label: 'نائب مدير المعهد' },
];
const levelLabel = (v) => LEVELS.find(l => l.value === Number(v))?.label || '—';

function apiToForm(m) {
    return {
        id: m.id,
        name: m.name || '',
        role: m.role || '',
        level: m.level ?? 3,
        displayOrder: m.displayOrder ?? 0,
        isActive: m.isActive ?? true,
        photo: m.pic || null,
        email: m.email || '',
        details: decodeRichText(m.details || ''),
    };
}

function formToApi(f) {
    return {
        name: f.name,
        role: f.role,
        level: Number(f.level),
        displayOrder: Number(f.displayOrder) || 0,
        isActive: !!f.isActive,
        email: f.email,
        // empty editor -> '' ; otherwise base64 (WAF workaround, same as lecturers)
        details: isBlankHtml(f.details) ? '' : encodeRichText(f.details),
    };
}

const BLANK = {
    id: 0, name: '', role: '', level: 3, displayOrder: 0, isActive: true, photo: null,
    email: '', details: '',
};

function initials(name = '') {
    return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '؟';
}

const httpError = (res) =>
    res.status === 401 || res.status === 403
        ? 'غير مصرح لك بهذا الإجراء (سجّل الدخول مرة أخرى)'
        : `HTTP ${res.status}`;

const TeamTab = () => {
    const { getToken } = useAuth();

    // AdminTeamController has [Authorize]: attach the Clerk token to every request.
    // Does NOT set Content-Type, so FormData uploads keep their multipart boundary.
    const authFetch = useCallback(async (url, options = {}) => {
        const token = await getToken();
        const headers = { ...(options.headers || {}) };
        if (token) headers.Authorization = `Bearer ${token}`;
        return fetch(url, { ...options, headers });
    }, [getToken]);

    const [members, setMembers] = useState([]);
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
    const pendingPhotoRef = useRef(null);

    const toast = (msg, type = 'success') => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3500);
    };

    useEffect(() => { fetchAll(); }, []);

    // Reloads the list from the server (keeps the order correct) and selects one member
    const fetchAll = async (selectId = null) => {
        setListLoading(true);
        try {
            const res = await authFetch(API_BASE);
            if (!res.ok) throw new Error(httpError(res));
            const mapped = (await res.json()).map(apiToForm);
            setMembers(mapped);
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

    const filtered = members.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase())
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
        if (!res.ok) throw new Error(`فشل رفع الصورة: ${httpError(res)}`);
    };

    const handleSave = async () => {
        if (!form.name.trim()) { toast('الاسم مطلوب', 'error'); return; }
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

            if (pendingPhotoRef.current) {
                await uploadPhoto(id, pendingPhotoRef.current);
                pendingPhotoRef.current = null;
            }

            await fetchAll(id);
            toast(isNew ? 'تم إضافة العضو بنجاح' : 'تم حفظ التغييرات بنجاح');
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
        pendingPhotoRef.current = null;
    };

    const handleDelete = async () => {
        if (!deleteConfirm) { setDeleteConfirm(true); return; }
        setLoading(true);
        try {
            const res = await authFetch(`${API_BASE}/${selected.id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error(httpError(res));
            setDeleteConfirm(false);
            await fetchAll();
            toast('تم حذف العضو', 'error');
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
                            فريق العمل
                        </span>
                        <button className="lec-new-btn" onClick={handleNew}>+ جديد</button>
                    </div>

                    <div style={{ padding: '10px 10px 6px', position: 'relative' }}>
                        <div className="adm-search" style={{ minWidth: 'unset' }}>
                            <input
                                type="text"
                                placeholder="بحث بالاسم أو المنصب..."
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
                                        {m.photo ? <img src={m.photo} alt="" /> : <span>{initials(m.name)}</span>}
                                    </div>
                                    <div className="lec-row-info">
                                        <div className="lec-row-name">{m.name || 'بدون اسم'}</div>
                                        <div className="lec-row-spec">{levelLabel(m.level)}{m.isActive ? '' : ' • مخفي'}</div>
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
                                    {isNew ? 'عضو جديد' : `ID: #${selected?.id}`}
                                </div>
                                <h2 className="lec-form-title">
                                    {isNew ? '➕ إضافة عضو جديد' : '✏️ تعديل بيانات العضو'}
                                </h2>
                                {!isNew && selected && <p className="lec-form-sub">{selected.name}</p>}
                            </div>
                            <div className="lec-stat-pill">👥 {members.length} عضو</div>
                        </div>

                        <div className="lec-form-body">
                            <div className="lec-top-row">

                                {/* Photo */}
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
                                                <img src={form.photo} alt="عضو" className="lec-photo-img" />
                                                <div className="lec-photo-overlay">
                                                    <span style={{ fontSize: '1.6rem' }}>📷</span>
                                                    <span className="lec-photo-overlay-txt">تغيير الصورة</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="lec-photo-placeholder">
                                                <div className="lec-photo-icon">👤</div>
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
                                        <label className="lec-label">الاسم *</label>
                                        <input className="lec-inp" name="name" value={form.name} onChange={handleChange} placeholder="م. / د. / أ. الاسم..." />
                                    </div>
                                    <div className="lec-field" style={{ gridColumn: '1/-1' }}>
                                        <label className="lec-label">المنصب</label>
                                        <input className="lec-inp" name="role" value={form.role} onChange={handleChange} placeholder="مثال: نائب مدير المعهد للشئون الفنية" />
                                    </div>
                                    <div className="lec-field">
                                        <label className="lec-label">المستوى في الهيكل</label>
                                        <select className="lec-inp" name="level" value={form.level} onChange={handleChange}>
                                            {LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                                        </select>
                                    </div>
                                    <div className="lec-field">
                                        <label className="lec-label">ترتيب العرض (الأصغر أولاً)</label>
                                        <input className="lec-inp" type="number" name="displayOrder" value={form.displayOrder} onChange={handleChange} />
                                    </div>
                                    <div className="lec-field" style={{ gridColumn: '1/-1' }}>
                                        <label className="lec-label">البريد الإلكتروني</label>
                                        <input
                                            className="lec-inp"
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="example@domain.com"
                                            style={{ direction: 'ltr', textAlign: 'right' }}
                                        />
                                    </div>
                                    <div className="lec-field" style={{ gridColumn: '1/-1' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
                                            <span className="lec-label" style={{ margin: 0 }}>ظاهر في صفحة فريق العمل</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="lec-divider" />

                            <RichTextEditor
                                icon="📋"
                                label="المؤهلات والخبرات"
                                sub="حدد النص أولاً ثم اختر الخط أو الحجم أو اللون — يمكن إضافة روابط"
                                name="details"
                                value={form.details}
                                onChange={handleChange}
                                placeholder="المؤهلات العلمية والخبرات العملية والمشروعات..."
                                minHeight={160}
                            />

                            {/* Actions */}
                            <div className="lec-actions">
                                <button className="lec-act-btn save" onClick={handleSave} disabled={loading}>
                                    {loading ? '⏳ جاري الحفظ...' : '💾 حفظ'}
                                </button>
                                <button className="lec-act-btn new" onClick={handleNew} disabled={loading}>➕ عضو جديد</button>
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
                                        <button className="lec-act-btn delete" onClick={handleDelete} disabled={loading}>🗑 حذف العضو</button>
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

export default TeamTab;