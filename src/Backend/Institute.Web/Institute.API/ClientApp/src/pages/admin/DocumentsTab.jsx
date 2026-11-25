// src/pages/admin/DocumentsTab.jsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { T, API_BASE as API_ROOT } from '../../components/admin/constants';

const API_BASE = `${API_ROOT}/admin/AdminSiteDocument`;
const MAX_BYTES = 20 * 1024 * 1024;

const ICONS = { AnnualTrainingPlan: '🏆', StrategicPlan: '🏛️' };
const PROTECTED = ['AnnualTrainingPlan', 'StrategicPlan'];

const httpError = (res) =>
    res.status === 401 || res.status === 403
        ? 'غير مصرح لك بهذا الإجراء (سجّل الدخول مرة أخرى)'
        : `HTTP ${res.status}`;

const fmtDate = (d) => d
    ? new Date(d).toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' })
    : '—';

const inputStyle = {
    width: '100%', padding: '9px 12px', border: '1.5px solid #d6dbe4',
    borderRadius: 8, fontFamily: 'inherit', fontSize: '.88rem', boxSizing: 'border-box',
};

const validatePdf = (file) => {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf'))
        return 'مسموح بملفات PDF فقط';
    if (file.size > MAX_BYTES) return 'الحد الأقصى لحجم الملف 20 ميجا';
    return '';
};

// ── Reusable PDF drop zone ───────────────────────────────────────────────────
const PdfDropZone = ({ picked, onPick, error, setError, inputRef }) => {
    const [dragOver, setDragOver] = useState(false);

    const apply = (file) => {
        if (!file) return;
        const e = validatePdf(file);
        if (e) { setError(e); return; }
        setError('');
        onPick(file);
    };

    return (
        <>
            <div
                className={`lec-photo-zone${dragOver ? ' over' : ''}`}
                style={{ width: '100%', minHeight: 130 }}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); apply(e.dataTransfer.files[0]); }}
                onClick={() => inputRef.current.click()}
            >
                <div className="lec-photo-placeholder">
                    <div className="lec-photo-icon">📄</div>
                    {picked ? (
                        <span className="lec-photo-hint">{picked.name}<br />{(picked.size / 1024 / 1024).toFixed(2)} MB</span>
                    ) : (
                        <span className="lec-photo-hint">اسحب ملف PDF هنا<br />أو اضغط للاختيار</span>
                    )}
                    <span className="lec-photo-types">PDF · حتى 20 ميجا</span>
                </div>
            </div>
            <input
                ref={inputRef} type="file" accept="application/pdf,.pdf"
                style={{ display: 'none' }}
                onChange={e => apply(e.target.files[0])}
            />
            {error && <div style={{ color: '#dc2626', fontSize: '.75rem', marginTop: 6 }}>{error}</div>}
        </>
    );
};

// ── New document form ────────────────────────────────────────────────────────
const NewDocForm = ({ onCreate, onCancel, busy }) => {
    const fileRef = useRef();
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [picked, setPicked] = useState(null);
    const [err, setErr] = useState('');

    const submit = async () => {
        if (!title.trim()) { setErr('العنوان مطلوب'); return; }
        const ok = await onCreate({ title: title.trim(), subtitle: subtitle.trim(), file: picked });
        if (ok) onCancel();
    };

    return (
        <div className="adm-card lec-form-card" style={{ marginBottom: 16 }}>
            <div className="lec-form-hdr">
                <div>
                    <h2 className="lec-form-title">➕ إضافة وثيقة جديدة</h2>
                    <p className="lec-form-sub">أنشئ وثيقة جديدة تظهر في الموقع</p>
                </div>
            </div>
            <div className="lec-form-body">
                <div className="lec-field">
                    <label className="lec-label">العنوان *</label>
                    <input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} placeholder="مثال: الخطة التشغيلية" />
                </div>
                <div className="lec-field" style={{ marginTop: 12 }}>
                    <label className="lec-label">الوصف</label>
                    <input style={inputStyle} value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="وصف مختصر (اختياري)" />
                </div>
                <div className="lec-field" style={{ marginTop: 12 }}>
                    <label className="lec-label">ملف PDF (اختياري، ممكن ترفعه بعدين)</label>
                    <PdfDropZone picked={picked} onPick={setPicked} error={err} setError={setErr} inputRef={fileRef} />
                </div>
                <div className="lec-actions">
                    <button className="lec-act-btn save" onClick={submit} disabled={busy}>
                        {busy ? '⏳ جاري الحفظ...' : '💾 إنشاء'}
                    </button>
                    <button className="lec-act-btn reset" onClick={onCancel} disabled={busy}>↩ إلغاء</button>
                </div>
            </div>
        </div>
    );
};

// ── One card per document ────────────────────────────────────────────────────
const DocCard = ({ doc, onUpload, onUpdate, onDelete, busy }) => {
    const fileRef = useRef();
    const [picked, setPicked] = useState(null);
    const [err, setErr] = useState('');
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(doc.title);
    const [subtitle, setSubtitle] = useState(doc.subtitle || '');

    const isProtected = PROTECTED.includes(doc.docKey);

    const handleUpload = async () => {
        if (!picked) return;
        const ok = await onUpload(doc.docKey, picked);
        if (ok) {
            setPicked(null);
            if (fileRef.current) fileRef.current.value = '';
        }
    };

    const saveEdit = async () => {
        if (!title.trim()) return;
        const ok = await onUpdate(doc.docKey, { title: title.trim(), subtitle: subtitle.trim() });
        if (ok) setEditing(false);
    };

    const cancelEdit = () => {
        setTitle(doc.title);
        setSubtitle(doc.subtitle || '');
        setEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm(`هل تريد حذف "${doc.title}" نهائياً؟`)) onDelete(doc.docKey);
    };

    return (
        <div className="adm-card lec-form-card" style={{ flex: '1 1 340px' }}>
            <div className="lec-form-hdr">
                <div style={{ flex: 1 }}>
                    <div className="adm-hero-tag" style={{ marginBottom: 6, position: 'relative', zIndex: 1 }}>
                        {doc.docKey}
                    </div>
                    {editing ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', zIndex: 1 }}>
                            <input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} placeholder="العنوان" />
                            <input style={inputStyle} value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="الوصف" />
                        </div>
                    ) : (
                        <>
                            <h2 className="lec-form-title">{ICONS[doc.docKey] || '📄'} {doc.title}</h2>
                            <p className="lec-form-sub">{doc.subtitle}</p>
                        </>
                    )}
                </div>
            </div>

            <div className="lec-form-body">
                <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                    {editing ? (
                        <>
                            <button className="lec-act-btn save" onClick={saveEdit} disabled={busy || !title.trim()}>💾 حفظ</button>
                            <button className="lec-act-btn reset" onClick={cancelEdit} disabled={busy}>↩ إلغاء</button>
                        </>
                    ) : (
                        <>
                            <button className="lec-act-btn reset" onClick={() => setEditing(true)} disabled={busy}>✏️ تعديل</button>
                            {!isProtected && (
                                <button className="lec-act-btn reset" style={{ color: '#dc2626' }} onClick={handleDelete} disabled={busy}>🗑️ حذف</button>
                            )}
                        </>
                    )}
                </div>

                <div className="lec-field">
                    <label className="lec-label">الملف الحالي</label>
                    {doc.fileUrl ? (
                        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer"
                            style={{ color: T.blue || '#2c5fa8', fontWeight: 700, fontSize: '.85rem', wordBreak: 'break-all' }}>
                            📎 {doc.originalFileName || 'فتح الملف الحالي'}
                        </a>
                    ) : (
                        <span style={{ color: T.gray500, fontSize: '.85rem' }}>لا يوجد ملف</span>
                    )}
                    <div style={{ color: T.gray500, fontSize: '.72rem', marginTop: 4 }}>
                        آخر تحديث: {fmtDate(doc.updatedAt)}
                    </div>
                </div>

                <div className="lec-field" style={{ marginTop: 14 }}>
                    <label className="lec-label">رفع ملف جديد (يستبدل الحالي)</label>
                    <PdfDropZone picked={picked} onPick={setPicked} error={err} setError={setErr} inputRef={fileRef} />
                </div>

                <div className="lec-actions">
                    <button className="lec-act-btn save" onClick={handleUpload} disabled={!picked || busy}>
                        {busy ? '⏳ جاري الرفع...' : '⬆️ رفع واستبدال'}
                    </button>
                    {picked && (
                        <button className="lec-act-btn reset" disabled={busy}
                            onClick={() => { setPicked(null); setErr(''); if (fileRef.current) fileRef.current.value = ''; }}>
                            ↩ إلغاء
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// ── Tab ──────────────────────────────────────────────────────────────────────
const DocumentsTab = () => {
    const { getToken } = useAuth();

    const authFetch = useCallback(async (url, options = {}) => {
        const token = await getToken();
        const headers = { ...(options.headers || {}) };
        if (token) headers.Authorization = `Bearer ${token}`;
        return fetch(url, { ...options, headers });
    }, [getToken]);

    const [docs, setDocs] = useState([]);
    const [listLoading, setListLoading] = useState(true);
    const [busyKey, setBusyKey] = useState(null);
    const [showNew, setShowNew] = useState(false);
    const [notification, setNotification] = useState(null);

    const toast = (msg, type = 'success') => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3500);
    };

    const readError = async (res) => {
        let msg = httpError(res);
        try { msg = (await res.json()).message || msg; } catch { /* ignore */ }
        return msg;
    };

    const fetchAll = async () => {
        setListLoading(true);
        try {
            const res = await authFetch(API_BASE);
            if (!res.ok) throw new Error(httpError(res));
            setDocs(await res.json());
        } catch (err) {
            toast(`فشل تحميل البيانات: ${err.message}`, 'error');
        } finally {
            setListLoading(false);
        }
    };

    useEffect(() => { fetchAll(); }, []); // eslint-disable-line

    const run = async (key, fn, okMsg, errPrefix) => {
        setBusyKey(key);
        try {
            const res = await fn();
            if (!res.ok) throw new Error(await readError(res));
            await fetchAll();
            toast(okMsg);
            return true;
        } catch (err) {
            toast(`${errPrefix}: ${err.message}`, 'error');
            return false;
        } finally {
            setBusyKey(null);
        }
    };

    const handleUpload = (docKey, file) => {
        const fd = new FormData();
        fd.append('file', file);
        return run(docKey,
            () => authFetch(`${API_BASE}/${docKey}/file`, { method: 'POST', body: fd }),
            'تم رفع الملف بنجاح', 'فشل الرفع');
    };

    const handleCreate = ({ title, subtitle, file }) => {
        const fd = new FormData();
        fd.append('title', title);
        fd.append('subtitle', subtitle);
        if (file) fd.append('file', file);
        return run('__new__',
            () => authFetch(API_BASE, { method: 'POST', body: fd }),
            'تمت إضافة الوثيقة', 'فشل الإضافة');
    };

    const handleUpdate = (docKey, body) =>
        run(docKey,
            () => authFetch(`${API_BASE}/${docKey}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }),
            'تم حفظ التعديلات', 'فشل التعديل');

    const handleDelete = (docKey) =>
        run(docKey,
            () => authFetch(`${API_BASE}/${docKey}`, { method: 'DELETE' }),
            'تم حذف الوثيقة', 'فشل الحذف');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {notification && (
                <div className={`lec-notif lec-notif-${notification.type}`} style={{ marginBottom: 12 }}>
                    <span>{notification.type === 'success' ? '✅' : notification.type === 'error' ? '❌' : 'ℹ️'}</span>
                    {notification.msg}
                </div>
            )}

            {!showNew && (
                <div style={{ marginBottom: 16 }}>
                    <button className="lec-act-btn save" onClick={() => setShowNew(true)}>➕ إضافة وثيقة جديدة</button>
                </div>
            )}

            {showNew && (
                <NewDocForm
                    onCreate={handleCreate}
                    onCancel={() => setShowNew(false)}
                    busy={busyKey === '__new__'}
                />
            )}

            {listLoading && docs.length === 0 ? (
                <div className="adm-empty" style={{ padding: '32px 12px' }}>
                    <div className="adm-emi">⏳</div><p>جاري التحميل...</p>
                </div>
            ) : docs.length === 0 ? (
                <div className="adm-empty" style={{ padding: '32px 12px' }}>
                    <div className="adm-emi">📄</div><p>لا توجد وثائق، أضف أول وثيقة</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                    {docs.map(d => (
                        <DocCard
                            key={d.docKey}
                            doc={d}
                            onUpload={handleUpload}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                            busy={busyKey === d.docKey}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DocumentsTab;