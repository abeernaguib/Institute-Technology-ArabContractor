// src/pages/admin/CustomersImport.jsx
// TEMPORARY one-time tool: copies the 74 static customers (names + /images/customerNN.jpg)
// into the database through the real admin API (the API uploads each logo to Azure Blob).
// Safe to re-run: customers that already exist (same name) are skipped; ones without a logo only get the logo.
// Delete this file (and its usage in Admin.jsx) after the import is done.
import React, { useState, useCallback, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { API_BASE as API_ROOT } from '../../components/admin/constants';

const API = `${API_ROOT}/admin/AdminCustomer`;

const STATIC_CUSTOMERS = [
    { id: 1, name: 'جامعة حلوان', image: 'customer01.jpg' },
    { id: 2, name: 'جامعة القاهرة', image: 'customer02.jpg' },
    { id: 3, name: 'نقابه المهندسين المصرية العامة', image: 'customer03.jpg' },
    { id: 4, name: 'المعهد العالى للتكنولوجيا السادس من اكتوبر', image: 'customer04.jpg' },
    { id: 5, name: 'مصر الجديدة للإسكان والتعمير', image: 'customer05.jpg' },
    { id: 6, name: 'المعهد العالى للتكنولوجيا العاشر من رمضان', image: 'customer06.jpg' },
    { id: 7, name: 'جامعة المنوفية', image: 'customer07.jpg' },
    { id: 8, name: 'جامعة عين شمس', image: 'customer08.jpg' },
    { id: 9, name: 'جامعة 6 اكتوبر', image: 'customer09.jpg' },
    { id: 10, name: '(مختار ابراهيم سابقا)المقاولات المصرية', image: 'customer10.jpg' },
    { id: 11, name: 'جامعة قناة السويس', image: 'customer11.jpg' },
    { id: 12, name: 'الجامعة الامريكية', image: 'customer12.jpg' },
    { id: 13, name: 'العربية العامة للمقاولات', image: 'customer13.jpg' },
    { id: 14, name: 'شركة بتروجيت', image: 'customer14.jpg' },
    { id: 15, name: 'مجموعة شركات طلعت مصطفى', image: 'customer15.jpg' },
    { id: 16, name: 'جامعة جازان (المملكة العربية السعودية)', image: 'customer16.jpg' },
    { id: 17, name: 'مودرن اكاديمي', image: 'customer17.jpg' },
    { id: 18, name: 'جامعة الاهرام الكندية', image: 'customer18.jpg' },
    { id: 19, name: 'هيئة المحطات النووية لتوليد الكهرباء', image: 'customer19.jpg' },
    { id: 20, name: 'الجامعة الروسية', image: 'customer20.jpg' },
    { id: 21, name: 'شركة فنسي الفرنسية', image: 'customer21.jpg' },
    { id: 22, name: 'مؤسسة الثقافة العمالية', image: 'customer22.jpg' },
    { id: 23, name: 'جامعة دمشق', image: 'customer23.jpg' },
    { id: 24, name: 'مجلس التدريب الصناعى', image: 'customer24.jpg' },
    { id: 25, name: 'جامعة السودان', image: 'customer25.jpg' },
    { id: 26, name: 'جمعية المحاسبين والمراجعين المصرية', image: 'customer26.jpg' },
    { id: 27, name: 'جامعة اليمن', image: 'customer27.jpg' },
    { id: 28, name: 'نقابه المهندسين المصرية الفرعية بالقاهرة', image: 'customer28.jpg' },
    { id: 29, name: 'وزارة الاسكان والمرافق والمجتمعات العمرانية', image: 'customer29.jpg' },
    { id: 30, name: 'جمعية الهندسة الادارية', image: 'customer30.jpg' },
    { id: 31, name: 'نقابه المهندسين المصرية الفرعية بدمياط', image: 'customer31.jpg' },
    { id: 32, name: 'شركة خليج السويس ( جابكو )', image: 'customer32.jpg' },
    { id: 33, name: 'شركة بترول بلاعيم', image: 'customer33.jpg' },
    { id: 34, name: 'شركة غاز مصر', image: 'customer34.jpg' },
    { id: 35, name: 'القابضة للتشييد والتعمير', image: 'customer35.jpg' },
    { id: 36, name: 'طابا للمقاولات', image: 'customer36.jpg' },
    { id: 37, name: 'الاتحاد المصرى لمقاولى التشييد و البناء', image: 'customer37.jpg' },
    { id: 38, name: 'الصعيد العامة للمقاولات', image: 'customer38.jpg' },
    { id: 39, name: 'النصر للمرافق والتركيبات', image: 'customer39.jpg' },
    { id: 40, name: 'العامة للإنشاءات (رولان)', image: 'customer40.jpg' },
    { id: 41, name: 'هيئة قناة السويس', image: 'customer41.jpg' },
    { id: 42, name: 'الهيئة العامة للابنية التعليمية', image: 'customer42.jpg' },
    { id: 43, name: 'دول الكومنولث', image: 'customer43.jpg' },
    { id: 44, name: 'وزارة الاسكان اليمنية', image: 'customer44.jpg' },
    { id: 45, name: 'وزارة الدفاع المصرية', image: 'customer45.jpg' },
    { id: 46, name: 'البحر الاحمر العامة للمقاولات', image: 'customer46.jpg' },
    { id: 47, name: 'رئاسة جمهورية مصر العربية', image: 'customer47.jpg' },
    { id: 48, name: 'الجيزة العامة للمقاولات', image: 'customer48.jpg' },
    { id: 49, name: 'النيل للخرسانة الجاهزة', image: 'customer49.jpg' },
    { id: 50, name: 'النصر العامة للمقاولات (حسن علام)', image: 'customer50.jpg' },
    { id: 51, name: 'مدينة نصر للإسكان والتعمير', image: 'customer51.jpg' },
    { id: 52, name: 'العامة للمقاولات والاعمال الصحية والتكميلية', image: 'customer52.jpg' },
    { id: 53, name: 'دريم لاند (احمد بهجت)', image: 'customer53.jpg' },
    { id: 54, name: 'الهيئة العامة للطرق و الكبارى و النقل البرى', image: 'customer54.jpg' },
    { id: 55, name: 'اطلس العامة للمقاولات', image: 'customer55.jpg' },
    { id: 56, name: 'اتحاد عمال البناء', image: 'customer56.jpg' },
    { id: 57, name: 'الهيئة القومية للانفاق', image: 'customer57.jpg' },
    { id: 58, name: 'القاهرة العامة للمقاولات', image: 'customer58.jpg' },
    { id: 59, name: 'النصر العامة للأعمال المدنية', image: 'customer59.jpg' },
    { id: 60, name: 'الدلتا العامة للمقاولات المصرية للإنشاءات', image: 'customer60.jpg' },
    { id: 61, name: 'وزارة الاسكان البحرانية', image: 'customer61.jpg' },
    { id: 62, name: 'هندسة المنشآت العسكرية الكويتية', image: 'customer62.jpg' },
    { id: 63, name: 'وزارة الاسكان السودانية', image: 'customer63.jpg' },
    { id: 64, name: 'وزارة البترول الليبية', image: 'customer64.jpg' },
    { id: 65, name: 'الشمس للإسكان والتعمير', image: 'customer65.jpg' },
    { id: 66, name: 'مصر لأعمال الاسمنت المسلح', image: 'customer66.jpg' },
    { id: 67, name: 'المكتب العربي للتصميمات', image: 'customer67.jpg' },
    { id: 68, name: 'المحمودية العامة للمقاولات', image: 'customer68.jpg' },
    { id: 69, name: 'النصر للمباني والانشاءات', image: 'customer69.jpg' },
    { id: 70, name: 'شركة مصر الدولية للمقاولات', image: 'customer70.jpg' },
    { id: 71, name: 'شركة AHD', image: 'customer71.jpg' },
    { id: 72, name: 'شركة ايفل', image: 'customer72.jpg' },
    { id: 73, name: 'شركة ريدكون للتعمير', image: 'customer73.jpg' },
    { id: 74, name: 'شركة الحازق', image: 'customer74.jpg' }
];

const norm = (s = '') => s.replace(/\s+/g, ' ').trim();

const CustomersImport = () => {
    const { getToken } = useAuth();
    const [running, setRunning] = useState(false);
    const [done, setDone] = useState(0);
    const [log, setLog] = useState([]);
    const stopRef = useRef(false);

    const authFetch = useCallback(async (url, options = {}) => {
        const token = await getToken();
        const headers = { ...(options.headers || {}) };
        if (token) headers.Authorization = `Bearer ${token}`;
        return fetch(url, { ...options, headers });
    }, [getToken]);

    const add = (type, msg) => setLog(l => [{ type, msg }, ...l].slice(0, 300));

    const uploadLogo = async (id, item) => {
        const imgRes = await fetch(`/images/${item.image}`);
        if (!imgRes.ok) throw new Error(`الصورة ${item.image} غير موجودة (HTTP ${imgRes.status})`);
        const blob = await imgRes.blob();
        if (!blob.type.startsWith('image/')) throw new Error(`الملف ${item.image} مش صورة`);
        if (blob.size > 5 * 1024 * 1024) throw new Error(`الصورة ${item.image} أكبر من 5MB`);

        const fd = new FormData();
        fd.append('file', new File([blob], item.image, { type: blob.type }));
        const res = await authFetch(`${API}/${id}/logo`, { method: 'POST', body: fd });
        if (!res.ok) throw new Error(`فشل رفع اللوجو (HTTP ${res.status})`);
    };

    const run = async () => {
        if (!window.confirm(`سيتم استيراد ${STATIC_CUSTOMERS.length} عميل إلى الداتا بيز. متابعة؟`)) return;
        stopRef.current = false;
        setRunning(true); setDone(0); setLog([]);

        let created = 0, logosOnly = 0, skipped = 0, failed = 0;
        try {
            const listRes = await authFetch(API);
            if (!listRes.ok) throw new Error(`تعذّر قراءة العملاء الحاليين (HTTP ${listRes.status})`);
            const existing = new Map((await listRes.json()).map(c => [norm(c.name), c]));

            for (let i = 0; i < STATIC_CUSTOMERS.length; i++) {
                if (stopRef.current) { add('warn', 'تم الإيقاف يدويًا'); break; }
                const item = STATIC_CUSTOMERS[i];
                try {
                    const found = existing.get(norm(item.name));
                    if (found) {
                        if (found.logo) { skipped++; add('info', `⏭ موجود: ${item.name}`); }
                        else { await uploadLogo(found.id, item); logosOnly++; add('ok', `🖼 تم رفع اللوجو فقط: ${item.name}`); }
                    } else {
                        const res = await authFetch(API, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: norm(item.name), displayOrder: item.id, isActive: true }),
                        });
                        if (!res.ok) throw new Error(`فشل إنشاء العميل (HTTP ${res.status})`);
                        const createdRow = await res.json();
                        created++;
                        await uploadLogo(createdRow.id, item);
                        add('ok', `✅ ${item.name}`);
                    }
                } catch (err) {
                    failed++;
                    add('error', `❌ ${item.name}: ${err.message}`);
                }
                setDone(i + 1);
            }
        } catch (err) {
            add('error', `❌ ${err.message}`);
        } finally {
            add('info', `انتهى — جديد: ${created} | لوجو فقط: ${logosOnly} | موجود: ${skipped} | أخطاء: ${failed}`);
            setRunning(false);
        }
    };

    const total = STATIC_CUSTOMERS.length;
    const color = { ok: '#16a34a', error: '#dc2626', warn: '#d97706', info: '#475569' };

    return (
        <div className="adm-card" style={{ padding: 16, marginBottom: 16, border: '2px dashed #f57c00' }} dir="rtl">
            <div style={{ fontWeight: 800, marginBottom: 6 }}>⚠️ أداة استيراد مؤقتة — عملاؤنا ({total} عميل)</div>
            <div style={{ fontSize: '.8rem', color: '#555', marginBottom: 10 }}>
                بتنسخ الأسماء واللوجوهات من الملفات الثابتة للداتا بيز (والـ API بيرفع الصور على Azure Blob). شغّلها مرة واحدة وبعدها احذف الملف.
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                <button className="lec-act-btn save" onClick={run} disabled={running}>
                    {running ? '⏳ جاري الاستيراد...' : '⬆️ ابدأ الاستيراد'}
                </button>
                {running && <button className="lec-act-btn reset" onClick={() => { stopRef.current = true; }}>إيقاف</button>}
                <span style={{ fontSize: '.85rem', fontWeight: 700 }}>{done} / {total}</span>
            </div>
            <div style={{ height: 8, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden', marginBottom: 10 }}>
                <div style={{ width: `${(done / total) * 100}%`, height: '100%', background: '#0865a8', transition: 'width .2s' }} />
            </div>
            <div style={{ maxHeight: 220, overflowY: 'auto', fontSize: '.78rem', lineHeight: 1.9 }}>
                {log.map((l, i) => <div key={i} style={{ color: color[l.type] }}>{l.msg}</div>)}
            </div>
        </div>
    );
};

export default CustomersImport;