// src/pages/admin/GalleryTab.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { T } from '../../components/admin/constants';

const API = 'https://icemt.arabcont.com/api/admin/AdminGallery';

const SECTIONS = [
    { id: 'albums', label: '🖼️ ألبومات الصور' },
    { id: 'videos', label: '🎬 الفيديوهات' },
    { id: 'categories', label: '🗂️ التصنيفات' },
];

// ══════════════════════════════════════════════════════════════════════════════
// Categories
// ══════════════════════════════════════════════════════════════════════════════
function CategoryRow({ cat, ctx, isNew = false }) {
    const { call, toast, reload } = ctx;
    const [f, setF] = useState({
        name: cat.name, description: cat.description || '',
        displayOrder: cat.displayOrder, isActive: cat.isActive,
    });
    const [busy, setBusy] = useState(false);
    const set = (k, v) => setF(p => ({ ...p, [k]: v }));

    const save = async () => {
        if (!f.name.trim()) { toast('اسم التصنيف مطلوب', 'error'); return; }
        setBusy(true);
        try {
            const body = { kind: cat.kind, name: f.name, description: f.description, displayOrder: Number(f.displayOrder) || 0, isActive: f.isActive };
            if (isNew) await call('/categories', 'POST', body);
            else await call(`/categories/${cat.id}`, 'PUT', body);
            await reload();
            toast(isNew ? 'تمت الإضافة' : 'تم الحفظ');
        } catch (e) { toast(e.message, 'error'); }
        finally { setBusy(false); }
    };

    const remove = async () => {
        if (!window.confirm('حذف هذا التصنيف؟')) return;
        setBusy(true);
        try {
            await call(`/categories/${cat.id}`, 'DELETE');
            await reload();
            toast('تم الحذف', 'error');
        } catch (e) { toast(e.message, 'error'); }
        finally { setBusy(false); }
    };

    return (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <input className="lec-inp" style={{ flex: '2 1 180px' }} placeholder="اسم التصنيف" value={f.name} onChange={e => set('name', e.target.value)} />
            {cat.kind === 2 && (
                <input className="lec-inp" style={{ flex: '2 1 220px' }} placeholder="عنوان يظهر فوق الفيديوهات (اختياري)" value={f.description} onChange={e => set('description', e.target.value)} />
            )}
            <input className="lec-inp" type="number" style={{ width: 80 }} title="الترتيب" value={f.displayOrder} onChange={e => set('displayOrder', e.target.value)} />
            <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                <input type="checkbox" checked={f.isActive} onChange={e => set('isActive', e.target.checked)} /> ظاهر
            </label>
            <button className="lec-act-btn save" onClick={save} disabled={busy}>{isNew ? '➕ إضافة' : '💾 حفظ'}</button>
            {!isNew && <button className="lec-act-btn delete" onClick={remove} disabled={busy}>🗑</button>}
        </div>
    );
}

function CategoriesPanel({ ctx }) {
    const { data } = ctx;
    return (
        <div>
            {[{ kind: 1, title: 'تصنيفات الصور' }, { kind: 2, title: 'تصنيفات الفيديو' }].map(sec => {
                const list = data.categories.filter(c => c.kind === sec.kind);
                return (
                    <div key={sec.kind} className="adm-card" style={{ padding: 16, marginBottom: 16 }}>
                        <h3 style={{ margin: '0 0 6px', color: T.blue }}>{sec.title}</h3>
                        <p style={{ margin: '0 0 12px', fontSize: '.75rem', color: T.gray500 }}>الترتيب: الأصغر يظهر أولاً. لا يمكن حذف تصنيف يحتوي على عناصر.</p>
                        {list.map(c => <CategoryRow key={c.id} cat={c} ctx={ctx} />)}
                        <CategoryRow
                            key={`new-${sec.kind}-${list.length}`}
                            cat={{ id: 0, kind: sec.kind, name: '', description: '', displayOrder: list.length + 1, isActive: true }}
                            ctx={ctx}
                            isNew
                        />
                    </div>
                );
            })}
        </div>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// Albums + photos
// ══════════════════════════════════════════════════════════════════════════════
function AlbumsPanel({ ctx }) {
    const { data, call, toast, reload } = ctx;
    const photoCats = data.categories.filter(c => c.kind === 1);

    const blankForm = () => ({ categoryId: photoCats[0]?.id ?? '', title: '', displayOrder: data.albums.length + 1, isActive: true });

    const [selectedId, setSelectedId] = useState(0);        // 0 = new album
    const [form, setForm] = useState(blankForm());
    const [details, setDetails] = useState(null);
    const [filterCat, setFilterCat] = useState('all');
    const [busy, setBusy] = useState(false);
    const [progress, setProgress] = useState('');
    const fileRef = useRef();

    const loadDetails = async (id) => {
        try { setDetails(await call(`/albums/${id}`)); }
        catch (e) { toast(e.message, 'error'); }
    };

    const pick = (a) => {
        setSelectedId(a.id);
        setForm({ categoryId: a.categoryId, title: a.title, displayOrder: a.displayOrder, isActive: a.isActive });
        setDetails(null);
        loadDetails(a.id);
    };

    useEffect(() => { if (data.albums[0]) pick(data.albums[0]); }, []); // eslint-disable-line

    const startNew = () => { setSelectedId(0); setDetails(null); setForm(blankForm()); };

    const save = async () => {
        if (!form.title.trim()) { toast('عنوان الألبوم مطلوب', 'error'); return; }
        if (!form.categoryId) { toast('اختر التصنيف', 'error'); return; }
        setBusy(true);
        try {
            const body = { categoryId: Number(form.categoryId), title: form.title, displayOrder: Number(form.displayOrder) || 0, isActive: form.isActive };
            if (selectedId === 0) {
                const created = await call('/albums', 'POST', body);
                await reload();
                setSelectedId(created.id);
                loadDetails(created.id);
                toast('تم إنشاء الألبوم — يمكنك الآن إضافة الصور');
            } else {
                await call(`/albums/${selectedId}`, 'PUT', body);
                await reload();
                toast('تم حفظ التغييرات');
            }
        } catch (e) { toast(e.message, 'error'); }
        finally { setBusy(false); }
    };

    const remove = async () => {
        if (!window.confirm('حذف الألبوم وكل صوره؟')) return;
        setBusy(true);
        try {
            await call(`/albums/${selectedId}`, 'DELETE');
            const d = await reload();
            toast('تم حذف الألبوم', 'error');
            if (d.albums[0]) pick(d.albums[0]); else startNew();
        } catch (e) { toast(e.message, 'error'); }
        finally { setBusy(false); }
    };

    const upload = async (fileList) => {
        const files = Array.from(fileList || []);
        if (!files.length || selectedId === 0) return;
        setBusy(true);
        let ok = 0;
        for (let i = 0; i < files.length; i++) {
            setProgress(`رفع ${i + 1} من ${files.length}...`);
            try {
                const fd = new FormData();
                fd.append('file', files[i]);
                await call(`/albums/${selectedId}/photos`, 'POST', fd, true);
                ok++;
            } catch (e) { toast(`${files[i].name}: ${e.message}`, 'error'); }
        }
        setProgress('');
        if (fileRef.current) fileRef.current.value = '';
        await loadDetails(selectedId);
        await reload();
        setBusy(false);
        if (ok) toast(`تم رفع ${ok} صورة`);
    };

    const deletePhoto = async (photoId) => {
        if (!window.confirm('حذف هذه الصورة؟')) return;
        try {
            await call(`/photos/${photoId}`, 'DELETE');
            await loadDetails(selectedId);
            await reload();
        } catch (e) { toast(e.message, 'error'); }
    };

    const setCover = async (photoId) => {
        try {
            await call(`/albums/${selectedId}/cover/${photoId}`, 'PUT');
            await loadDetails(selectedId);
            await reload();
            toast('تم تعيين الغلاف');
        } catch (e) { toast(e.message, 'error'); }
    };

    const list = data.albums.filter(a => filterCat === 'all' || String(a.categoryId) === filterCat);
    const catName = (id) => data.categories.find(c => c.id === id)?.name || '—';

    return (
        <div className="lec-layout">
            {/* LEFT: list */}
            <div className="lec-panel" style={{ height: 'calc(100vh - 220px)', overflowY: 'auto', position: 'sticky', top: 0 }}>
                <div className="lec-panel-hdr">
                    <span className="lec-count-badge">{list.length}</span>
                    <span style={{ fontWeight: 800, fontSize: '.8rem', flex: 1, textAlign: 'center' }}>الألبومات</span>
                    <button className="lec-new-btn" onClick={startNew}>+ جديد</button>
                </div>
                <div style={{ padding: '10px' }}>
                    <select className="lec-inp" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
                        <option value="all">كل التصنيفات</option>
                        {photoCats.map(c => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
                    </select>
                </div>
                <div className="lec-list">
                    {list.map(a => (
                        <div key={a.id} className={`lec-row${selectedId === a.id ? ' active' : ''}`} onClick={() => pick(a)} style={a.isActive ? undefined : { opacity: 0.5 }}>
                            <div className="lec-avatar">{a.cover ? <img src={a.cover} alt="" /> : <span>🖼️</span>}</div>
                            <div className="lec-row-info">
                                <div className="lec-row-name">{a.title}</div>
                                <div className="lec-row-spec">{catName(a.categoryId)} • {a.photosCount} صورة{a.isActive ? '' : ' • مخفي'}</div>
                            </div>
                            <div className="lec-row-id">#{a.id}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT: form */}
            <div className="lec-form-wrap" style={{ height: 'calc(100vh - 220px)', overflowY: 'auto' }}>
                <div className="adm-card lec-form-card">
                    <div className="lec-form-hdr">
                        <div>
                            <h2 className="lec-form-title">{selectedId === 0 ? '➕ ألبوم جديد' : '✏️ تعديل الألبوم'}</h2>
                        </div>
                        {progress && <div className="lec-stat-pill">{progress}</div>}
                    </div>

                    <div className="lec-form-body">
                        <div className="lec-fields-grid">
                            <div className="lec-field" style={{ gridColumn: '1/-1' }}>
                                <label className="lec-label">عنوان الألبوم *</label>
                                <input className="lec-inp" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                            </div>
                            <div className="lec-field">
                                <label className="lec-label">التصنيف *</label>
                                <select className="lec-inp" value={form.categoryId} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}>
                                    {photoCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="lec-field">
                                <label className="lec-label">الترتيب (الأصغر أولاً)</label>
                                <input className="lec-inp" type="number" value={form.displayOrder} onChange={e => setForm(f => ({ ...f, displayOrder: e.target.value }))} />
                            </div>
                            <div className="lec-field" style={{ gridColumn: '1/-1' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                    <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} />
                                    <span className="lec-label" style={{ margin: 0 }}>ظاهر في الصفحة</span>
                                </label>
                            </div>
                        </div>

                        <div className="lec-actions" style={{ marginTop: 14 }}>
                            <button className="lec-act-btn save" onClick={save} disabled={busy}>💾 حفظ</button>
                            <button className="lec-act-btn new" onClick={startNew} disabled={busy}>➕ ألبوم جديد</button>
                            <div style={{ flex: 1 }} />
                            {selectedId !== 0 && <button className="lec-act-btn delete" onClick={remove} disabled={busy}>🗑 حذف الألبوم</button>}
                        </div>

                        {/* Photos */}
                        <div className="lec-divider" />
                        {selectedId === 0 ? (
                            <p style={{ color: T.gray500, fontSize: '.8rem' }}>احفظ الألبوم أولاً ثم أضف الصور.</p>
                        ) : (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                    <strong>الصور ({details?.photos?.length ?? '…'})</strong>
                                    <button className="lec-act-btn new" disabled={busy} onClick={() => fileRef.current?.click()}>📷 إضافة صور</button>
                                    <input ref={fileRef} type="file" multiple accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }} onChange={e => upload(e.target.files)} />
                                    <span style={{ fontSize: '.7rem', color: T.gray500 }}>JPG / PNG / WEBP — حتى 5MB للصورة</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
                                    {details?.photos?.map(p => (
                                        <div key={p.id} style={{ border: p.isCover ? `2px solid ${T.orange}` : '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
                                            <img src={p.url} alt="" style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }} />
                                            <div style={{ display: 'flex', gap: 4, padding: 4 }}>
                                                <button className="adm-fclear" style={{ flex: 1, fontSize: '.65rem' }} disabled={p.isCover} onClick={() => setCover(p.id)}>{p.isCover ? '⭐ الغلاف' : 'غلاف'}</button>
                                                <button className="adm-fclear" style={{ fontSize: '.65rem' }} onClick={() => deletePhoto(p.id)}>🗑</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// Videos
// ══════════════════════════════════════════════════════════════════════════════
function VideoRow({ video, ctx }) {
    const { call, toast, reload } = ctx;
    const [title, setTitle] = useState(video.title || '');
    const [order, setOrder] = useState(video.displayOrder);
    const [busy, setBusy] = useState(false);

    const save = async () => {
        setBusy(true);
        try {
            await call(`/videos/${video.id}`, 'PUT', { video: video.youtubeId, title, displayOrder: Number(order) || 0 });
            await reload();
            toast('تم الحفظ');
        } catch (e) { toast(e.message, 'error'); }
        finally { setBusy(false); }
    };
    const remove = async () => {
        if (!window.confirm('حذف هذا الفيديو؟')) return;
        setBusy(true);
        try { await call(`/videos/${video.id}`, 'DELETE'); await reload(); toast('تم الحذف', 'error'); }
        catch (e) { toast(e.message, 'error'); }
        finally { setBusy(false); }
    };

    return (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #eee', flexWrap: 'wrap' }}>
            <img src={`https://img.youtube.com/vi/${video.youtubeId}/default.jpg`} alt="" style={{ width: 80, height: 45, objectFit: 'cover', borderRadius: 4 }} />
            <code style={{ fontSize: '.7rem', direction: 'ltr' }}>{video.youtubeId}</code>
            <input className="lec-inp" style={{ flex: '1 1 160px' }} placeholder="عنوان الفيديو" value={title} onChange={e => setTitle(e.target.value)} />
            <input className="lec-inp" type="number" style={{ width: 70 }} title="الترتيب" value={order} onChange={e => setOrder(e.target.value)} />
            <button className="lec-act-btn save" onClick={save} disabled={busy}>💾</button>
            <button className="lec-act-btn delete" onClick={remove} disabled={busy}>🗑</button>
        </div>
    );
}

function AddVideoRow({ groupId, ctx }) {
    const { call, toast, reload } = ctx;
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [busy, setBusy] = useState(false);

    const add = async () => {
        if (!url.trim()) { toast('ألصق رابط يوتيوب', 'error'); return; }
        setBusy(true);
        try {
            await call(`/video-groups/${groupId}/videos`, 'POST', { video: url, title, displayOrder: 0 });
            setUrl(''); setTitle('');
            await reload();
            toast('تمت إضافة الفيديو');
        } catch (e) { toast(e.message, 'error'); }
        finally { setBusy(false); }
    };

    return (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingTop: 10, flexWrap: 'wrap' }}>
            <input className="lec-inp" style={{ flex: '2 1 240px', direction: 'ltr', textAlign: 'left' }} placeholder="https://www.youtube.com/watch?v=..." value={url} onChange={e => setUrl(e.target.value)} />
            <input className="lec-inp" style={{ flex: '1 1 160px' }} placeholder="عنوان الفيديو (اختياري)" value={title} onChange={e => setTitle(e.target.value)} />
            <button className="lec-act-btn save" onClick={add} disabled={busy}>➕ إضافة فيديو</button>
        </div>
    );
}

function VideosPanel({ ctx }) {
    const { data, call, toast, reload } = ctx;
    const videoCats = data.categories.filter(c => c.kind === 2);

    const blankForm = () => ({ categoryId: videoCats[0]?.id ?? '', title: '', color: '#0865a8', isLtr: false, displayOrder: data.videoGroups.length + 1, isActive: true });

    const [selectedId, setSelectedId] = useState(0);        // 0 = new group
    const [form, setForm] = useState(blankForm());
    const [busy, setBusy] = useState(false);
    const selected = data.videoGroups.find(g => g.id === selectedId);

    const pick = (g) => {
        setSelectedId(g.id);
        setForm({ categoryId: g.categoryId, title: g.title, color: g.color, isLtr: g.isLtr, displayOrder: g.displayOrder, isActive: g.isActive });
    };

    useEffect(() => { if (data.videoGroups[0]) pick(data.videoGroups[0]); }, []); // eslint-disable-line

    const startNew = () => { setSelectedId(0); setForm(blankForm()); };

    const save = async () => {
        if (!form.title.trim()) { toast('عنوان المجموعة مطلوب', 'error'); return; }
        if (!form.categoryId) { toast('اختر التصنيف', 'error'); return; }
        setBusy(true);
        try {
            const body = { categoryId: Number(form.categoryId), title: form.title, color: form.color, isLtr: form.isLtr, displayOrder: Number(form.displayOrder) || 0, isActive: form.isActive };
            if (selectedId === 0) {
                const created = await call('/video-groups', 'POST', body);
                await reload();
                setSelectedId(created.id);
                toast('تم إنشاء المجموعة — يمكنك الآن إضافة الفيديوهات');
            } else {
                await call(`/video-groups/${selectedId}`, 'PUT', body);
                await reload();
                toast('تم حفظ التغييرات');
            }
        } catch (e) { toast(e.message, 'error'); }
        finally { setBusy(false); }
    };

    const remove = async () => {
        if (!window.confirm('حذف المجموعة وكل فيديوهاتها؟')) return;
        setBusy(true);
        try {
            await call(`/video-groups/${selectedId}`, 'DELETE');
            const d = await reload();
            toast('تم الحذف', 'error');
            if (d.videoGroups[0]) pick(d.videoGroups[0]); else startNew();
        } catch (e) { toast(e.message, 'error'); }
        finally { setBusy(false); }
    };

    const catName = (id) => data.categories.find(c => c.id === id)?.name || '—';

    return (
        <div className="lec-layout">
            <div className="lec-panel" style={{ height: 'calc(100vh - 220px)', overflowY: 'auto', position: 'sticky', top: 0 }}>
                <div className="lec-panel-hdr">
                    <span className="lec-count-badge">{data.videoGroups.length}</span>
                    <span style={{ fontWeight: 800, fontSize: '.8rem', flex: 1, textAlign: 'center' }}>مجموعات الفيديو</span>
                    <button className="lec-new-btn" onClick={startNew}>+ جديد</button>
                </div>
                <div className="lec-list">
                    {data.videoGroups.map(g => (
                        <div key={g.id} className={`lec-row${selectedId === g.id ? ' active' : ''}`} onClick={() => pick(g)} style={g.isActive ? undefined : { opacity: 0.5 }}>
                            <div className="lec-avatar" style={{ background: g.color }}><span>🎬</span></div>
                            <div className="lec-row-info">
                                <div className="lec-row-name">{g.title}</div>
                                <div className="lec-row-spec">{catName(g.categoryId)} • {g.videos.length} فيديو{g.isActive ? '' : ' • مخفي'}</div>
                            </div>
                            <div className="lec-row-id">#{g.id}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lec-form-wrap" style={{ height: 'calc(100vh - 220px)', overflowY: 'auto' }}>
                <div className="adm-card lec-form-card">
                    <div className="lec-form-hdr">
                        <h2 className="lec-form-title">{selectedId === 0 ? '➕ مجموعة جديدة' : '✏️ تعديل المجموعة'}</h2>
                    </div>
                    <div className="lec-form-body">
                        <div className="lec-fields-grid">
                            <div className="lec-field" style={{ gridColumn: '1/-1' }}>
                                <label className="lec-label">عنوان المجموعة *</label>
                                <input className="lec-inp" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                            </div>
                            <div className="lec-field">
                                <label className="lec-label">التصنيف *</label>
                                <select className="lec-inp" value={form.categoryId} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}>
                                    {videoCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="lec-field">
                                <label className="lec-label">اللون</label>
                                <input type="color" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} style={{ width: 60, height: 36, border: 'none', background: 'none' }} />
                            </div>
                            <div className="lec-field">
                                <label className="lec-label">الترتيب (الأصغر أولاً)</label>
                                <input className="lec-inp" type="number" value={form.displayOrder} onChange={e => setForm(f => ({ ...f, displayOrder: e.target.value }))} />
                            </div>
                            <div className="lec-field" style={{ display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'flex-end' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                    <input type="checkbox" checked={form.isLtr} onChange={e => setForm(f => ({ ...f, isLtr: e.target.checked }))} />
                                    <span className="lec-label" style={{ margin: 0 }}>العنوان إنجليزي / فرنسي (من اليسار)</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                    <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} />
                                    <span className="lec-label" style={{ margin: 0 }}>ظاهرة في الصفحة</span>
                                </label>
                            </div>
                        </div>

                        <div className="lec-actions" style={{ marginTop: 14 }}>
                            <button className="lec-act-btn save" onClick={save} disabled={busy}>💾 حفظ</button>
                            <button className="lec-act-btn new" onClick={startNew} disabled={busy}>➕ مجموعة جديدة</button>
                            <div style={{ flex: 1 }} />
                            {selectedId !== 0 && <button className="lec-act-btn delete" onClick={remove} disabled={busy}>🗑 حذف المجموعة</button>}
                        </div>

                        <div className="lec-divider" />
                        {selectedId === 0 || !selected ? (
                            <p style={{ color: T.gray500, fontSize: '.8rem' }}>احفظ المجموعة أولاً ثم أضف الفيديوهات.</p>
                        ) : (
                            <>
                                <strong>الفيديوهات ({selected.videos.length})</strong>
                                {selected.videos.map(v => <VideoRow key={`${v.id}-${v.title}-${v.displayOrder}`} video={v} ctx={ctx} />)}
                                <AddVideoRow groupId={selectedId} ctx={ctx} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// Tab shell
// ══════════════════════════════════════════════════════════════════════════════
const GalleryTab = () => {
    const { getToken } = useAuth();

    const [data, setData] = useState(null);
    const [section, setSection] = useState('albums');
    const [notification, setNotification] = useState(null);
    const [error, setError] = useState(null);

    const toast = useCallback((msg, type = 'success') => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3500);
    }, []);

    const call = async (path, method = 'GET', body = null, isForm = false) => {
        const token = await getToken();
        const headers = { Authorization: `Bearer ${token}` };
        if (body && !isForm) headers['Content-Type'] = 'application/json';
        const res = await fetch(`${API}${path}`, {
            method,
            headers,
            body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
        });
        if (!res.ok) {
            let msg = `HTTP ${res.status}`;
            try { const j = await res.json(); msg = j.message || msg; } catch { /* no body */ }
            throw new Error(msg);
        }
        const text = await res.text();
        return text ? JSON.parse(text) : null;
    };

    const reload = async () => {
        const d = await call('');
        setData(d);
        return d;
    };

    useEffect(() => { reload().catch(e => setError(e.message)); }, []); // eslint-disable-line

    if (error) return <div className="adm-err">⚠️ فشل تحميل البيانات: {error}</div>;
    if (!data) return <div className="adm-ld"><div className="adm-sp" /><p>جاري التحميل...</p></div>;

    const ctx = { data, call, toast, reload };

    return (
        <div>
            {notification && (
                <div className={`lec-notif lec-notif-${notification.type}`} style={{ marginBottom: 12 }}>
                    <span>{notification.type === 'success' ? '✅' : notification.type === 'error' ? '❌' : 'ℹ️'}</span>
                    {notification.msg}
                </div>
            )}

            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                {SECTIONS.map(s => (
                    <button
                        key={s.id}
                        className="adm-fclear"
                        style={section === s.id ? { background: T.blue, color: '#fff', fontWeight: 700 } : undefined}
                        onClick={() => setSection(s.id)}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            {section === 'albums' && <AlbumsPanel ctx={ctx} />}
            {section === 'videos' && <VideosPanel ctx={ctx} />}
            {section === 'categories' && <CategoriesPanel ctx={ctx} />}
        </div>
    );
};

export default GalleryTab;