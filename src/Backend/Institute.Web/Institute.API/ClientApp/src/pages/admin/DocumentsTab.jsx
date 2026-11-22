// src/pages/admin/DocumentsTab.jsx   (same folder as CustomersTab.jsx)
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { T, API_BASE as API_ROOT } from '../../components/admin/constants';

const API_BASE = `${API_ROOT}/admin/AdminSiteDocument`;
const MAX_BYTES = 20 * 1024 * 1024;

const ICONS = { AnnualTrainingPlan: '🏆', StrategicPlan: '🏛️' };

const httpError = (res) =>
    res.status === 401 || res.status === 403
        ? 'غير مصرح لك بهذا الإجراء (سجّل الدخول مرة أخرى)'
        : `HTTP ${res.status}`;

const fmtDate = (d) => d
    ? new Date(d).toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' })
    : '—';

// ── One card per document ────────────────────────────────────────────────────
const DocCard = ({ doc, onUpload, busy }) => {
    const fileRef = useRef();
    const [picked, setPicked] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const [err, setErr] = useState('');

    const applyFile = (file) => {
        if (!file) return;
        if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
            setErr('مسموح بملفات PDF فقط'); return;
        }
        if (file.size > MAX_BYTES) { setErr('الحد الأقصى لحجم الملف 20 ميجا'); return; }
        setErr('');
        setPicked(file);
    };

    const handleUpload = async () => {
        if (!picked) return;
        const ok = await onUpload(doc.docKey, picked);
        if (ok) {
            setPicked(null);
            if (fileRef.current) fileRef.current.value = '';
        }
    };

    return (
        <div className="adm-card lec-form-card" style={{ flex: '1 1 340px' }}>
            <div className="lec-form-hdr">
                <div>
                    <div className="adm-hero-tag" style={{ marginBottom: 6, position: 'relative', zIndex: 1 }}>
                        {doc.docKey}
                    </div>
                    <h2 className="lec-form-title">{ICONS[doc.docKey] || '📄'} {doc.title}</h2>
                    <p className="lec-form-sub">{doc.subtitle}</p>
                </div>
            </div>

            <div className="lec-form-body">
                {/* Current file */}
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

                {/* Drop zone */}
                <div className="lec-field" style={{ marginTop: 14 }}>
                    <label className="lec-label">رفع ملف جديد (يستبدل الحالي)</label>
                    <div
                        className={`lec-photo-zone${dragOver ? ' over' : ''}`}
                        style={{ width: '100%', minHeight: 130 }}
                        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={e => { e.preventDefault(); setDragOver(false); applyFile(e.dataTransfer.files[0]); }}
                        onClick={() => fileRef.current.click()}
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
                        ref={fileRef} type="file" accept="application/pdf,.pdf"
                        style={{ display: 'none' }}
                        onChange={e => applyFile(e.target.files[0])}
                    />
                    {err && <div style={{ color: '#dc2626', fontSize: '.75rem', marginTop: 6 }}>{err}</div>}
                </div>

                <div className="lec-actions">
                    <button className="lec-act-btn save" onClick={handleUpload} disabled={!picked || busy}>
                        {busy ? '⏳ جاري الرفع...' : '⬆️ رفع واستبدال'}
                    </button>
                    {picked && (
                        <button className="lec-act-btn reset" onClick={() => { setPicked(null); setErr(''); if (fileRef.current) fileRef.current.value = ''; }} disabled={busy}>
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
    const [notification, setNotification] = useState(null);

    const toast = (msg, type = 'success') => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3500);
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

    const handleUpload = async (docKey, file) => {
        setBusyKey(docKey);
        try {
            const fd = new FormData();
            fd.append('file', file);
            const res = await authFetch(`${API_BASE}/${docKey}/file`, { method: 'POST', body: fd });
            if (!res.ok) {
                let msg = httpError(res);
                try { msg = (await res.json()).message || msg; } catch { /* ignore */ }
                throw new Error(msg);
            }
            await fetchAll();
            toast('تم رفع الملف بنجاح');
            return true;
        } catch (err) {
            toast(`فشل الرفع: ${err.message}`, 'error');
            return false;
        } finally {
            setBusyKey(null);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {notification && (
                <div className={`lec-notif lec-notif-${notification.type}`} style={{ marginBottom: 12 }}>
                    <span>{notification.type === 'success' ? '✅' : notification.type === 'error' ? '❌' : 'ℹ️'}</span>
                    {notification.msg}
                </div>
            )}

            {listLoading ? (
                <div className="adm-empty" style={{ padding: '32px 12px' }}>
                    <div className="adm-emi">⏳</div><p>جاري التحميل...</p>
                </div>
            ) : docs.length === 0 ? (
                <div className="adm-empty" style={{ padding: '32px 12px' }}>
                    <div className="adm-emi">📄</div><p>لا توجد ملفات (تأكد من تشغيل سكريبت SQL)</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                    {docs.map(d => (
                        <DocCard key={d.docKey} doc={d} onUpload={handleUpload} busy={busyKey === d.docKey} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DocumentsTab;