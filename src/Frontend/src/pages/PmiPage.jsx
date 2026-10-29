import React from 'react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const F = '"Noto Kufi Arabic",serif';
const C = { o: '#f57c00', b: '#0865a8', bd: '#044474', w: '#fff', k: '#0a0a0a', k2: '#111827', g1: '#f9fafb', g3: '#e5e7eb', g5: '#6b7280', g7: '#374151' };

const wa = (msg) => `https://wa.me/201201737593?text=${encodeURIComponent(msg)}`;
const P = (file) => encodeURI(`/images/pmi/${file}`);
const programs = [
    {
        code: 'PMP', en: 'Project Management Professional', ar: 'إدارة المشروعات الاحترافية', hours: 45,
        desc: 'المعيار العالمي الأكثر اعتمادًا في إدارة المشروعات، يقدمه PMI لإثبات كفاءة مدير المشروع في قيادة الأفراد والعمليات بمختلف المنهجيات.'
    },
    {
        code: 'PMI-CP', en: 'Construction Professional', ar: 'محترف الإنشاءات', hours: 35,
        desc: 'شهادة متخصصة من PMI لإدارة مشروعات البناء والتشييد والتحكم في عقودها ومخاطرها.'
    },
    {
        code: 'PMI-RMP', en: 'Risk Management Professional', ar: 'إدارة مخاطر المشروع', hours: 30,
        desc: 'شهادة تخصصية متقدمة تثبت القدرة على تحديد مخاطر المشروعات وتقييمها والتعامل معها (تهديدات أو فرصًا) لحماية نجاحها.'
    },
    {
        code: 'CAPM', en: 'Certified Associate in Project Management', ar: 'مشارك معتمد في إدارة المشروعات', hours: 23,
        desc: 'شهادة أساسية للمبتدئين وحديثي الخبرة، تثبت الإلمام بمفاهيم ومصطلحات وأساسيات إدارة المشروعات.'
    },
    {
        code: 'PMO', en: 'Project Management Office (PMOCP)', ar: 'إدارة مكتب المشروع', hours: 15,
        desc: 'الوحدة التنظيمية المسؤولة عن توحيد معايير إدارة المشروعات ومتابعة أدائها وضمان توافقها مع أهداف المؤسسة.'
    },
];

const lecturers = [
    { name: 'د. شعبان عثمان', certs: ['PMP', 'RMP', 'CAPM', 'PMOCP'], note: 'خبرة في إدارة المخاطر ومكاتب المشروعات', photo: P('lecturers/shabaan2.jpeg') },
    { name: 'هبة عادل عباس', certs: ['PMP', 'PMOCP'], note: 'خبرة في إدارة المشروعات والتطوير المؤسسي', photo: P('lecturers/heba.jpg') },
    { name: 'م. محمد غانم', certs: ['PMP'], note: '', photo: P('lecturers/ghanem.jpeg') },
    { name: 'د. محمد حاتم محمد', certs: ['PMP'], note: '', photo: P('lecturers/hatem.jpeg') },
];

const certSamples = [
    { title: 'شهادة PMP', sub: 'إعداد لامتحان PMI-PMP · 45 ساعة اتصال', img: P('4.png') },
    { title: 'شهادة PMO', sub: 'إعداد لامتحان PMI-PMOCP · 15 ساعة اتصال', img: P('3.png') },
];

const features = [
    { Icon: SchoolIcon, t: 'تدريب مهني متخصص', d: 'بمحتوى حديث ومعايير عالمية' },
    { Icon: GroupsIcon, t: 'محاضرون ذوو خبرة', d: 'خبرات عملية في مختلف القطاعات' },
    { Icon: CalendarMonthIcon, t: 'خدمات حجز الامتحانات', d: 'دعم كامل لإجراءات التقديم لدى PMI' },
];

const steps = [
    { n: 1, t: 'اختر البرنامج', d: 'اختر البرنامج المناسب لأهدافك المهنية' },
    { n: 2, t: 'أتم التدريب', d: 'حضوريًا أو أونلاين مع محاضرين معتمدين' },
    { n: 3, t: 'استكمل التقديم', d: 'جهّز مستنداتك واستكمل إجراءات التقدم لدى PMI' },
    { n: 4, t: 'احجز الامتحان', d: 'نقدم لك الدعم الكامل في حجز الامتحان' },
];

const waData = [
    'الاسم رباعي',
    'الجنسية ومحل الإقامة',
    'هل تم دفع عضوية PMI؟',
    'نوع الشهادة المطلوبة',
    'هل أنهيت الـ Application على موقع PMI وتمت الموافقة عليه؟',
    'لقطة شاشة من موقع PMI توضح قيمة العضوية والامتحان (مع إجمالي الـ Checkout)',
    'كيف عرفتنا (عن طريق أي محاضر)؟',
];

function H({ eyebrow, title, light, center }) {
    return (
        <div style={{ textAlign: center ? 'center' : 'right', marginBottom: 'clamp(24px,4vw,40px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: center ? 'center' : 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 28, height: 2, background: C.o }} />
                <span style={{ fontFamily: F, fontSize: '.72rem', fontWeight: 700, letterSpacing: 2, color: light ? 'rgba(255,255,255,.6)' : C.o }}>{eyebrow}</span>
            </div>
            <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(1.4rem,3vw,2.2rem)', lineHeight: 1.5, color: light ? C.w : C.k, margin: 0 }}>{title}</h2>
        </div>
    );
}

function Btn({ href, to, orange, outline, children }) {
    const s = {
        display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: F, fontWeight: 700, fontSize: '.88rem',
        textDecoration: 'none', borderRadius: 8, padding: '11px 26px', transition: 'opacity .2s, transform .2s',
        color: C.w, background: outline ? 'transparent' : orange ? C.o : C.b, border: outline ? '1.5px solid rgba(255,255,255,.5)' : 'none',
    };
    const over = e => { e.currentTarget.style.opacity = '.85'; e.currentTarget.style.transform = 'translateY(-1px)'; };
    const out = e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = ''; };
    return href
        ? <a href={href} target="_blank" rel="noopener noreferrer" style={s} onMouseEnter={over} onMouseLeave={out}>{children}</a>
        : <Link to={to} style={s} onMouseEnter={over} onMouseLeave={out}>{children}</Link>;
}

export default function PmiPage() {
    return (
        <div dir="rtl" style={{ fontFamily: F, background: C.w, overflowX: 'hidden' }}>
            <style>{`
                .pp-W{max-width:1200px;margin:0 auto;padding:0 clamp(16px,4vw,48px);}
                .pp-S{padding:clamp(40px,6vw,80px) 0;}
                .pp-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(12px,2vw,20px);}
                .pp-g4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(12px,2vw,20px);}
                .pp-g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(14px,2.5vw,28px);}
                @media(max-width:980px){.pp-g4{grid-template-columns:repeat(2,minmax(0,1fr));}}
                @media(max-width:840px){.pp-g3{grid-template-columns:repeat(2,minmax(0,1fr));}}
                @media(max-width:580px){.pp-g2,.pp-g3,.pp-g4{grid-template-columns:1fr;}}
                .pp-card{background:${C.w};border:1px solid ${C.g3};border-radius:12px;padding:22px;transition:border-color .25s,transform .25s,box-shadow .25s;}
                .pp-card:hover{border-color:${C.o};transform:translateY(-4px);box-shadow:0 12px 30px rgba(245,124,0,.12);}
                .pp-cert{display:block;border:1px solid ${C.g3};border-radius:12px;overflow:hidden;background:${C.w};text-decoration:none;transition:transform .25s,box-shadow .25s;}
                .pp-cert:hover{transform:translateY(-4px);box-shadow:0 14px 34px rgba(0,0,0,.12);}
            `}</style>

            {/* HERO */}
            <section style={{ background: `linear-gradient(135deg,${C.bd} 0%,${C.b} 100%)`, color: C.w, padding: 'clamp(40px,7vw,90px) 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -90, left: -90, width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(255,255,255,.1)' }} />
                <div className="pp-W" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px,4vw,48px)', flexWrap: 'wrap', position: 'relative' }}>
                    <div style={{ flex: '1 1 380px' }}>
                        <div style={{ fontFamily: F, fontSize: '.74rem', fontWeight: 700, letterSpacing: 2, color: C.o, marginBottom: 12 }}>Authorized Training Partner | ATP 4066</div>
                        <h1 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(1.7rem,4.2vw,3.1rem)', lineHeight: 1.4, margin: '0 0 14px' }}>
                            شريك تدريب معتمد من PMI
                        </h1>
                        <p style={{ fontFamily: F, fontSize: 'clamp(.9rem,1.4vw,1.05rem)', color: 'rgba(255,255,255,.8)', lineHeight: 2, margin: '0 0 26px', maxWidth: 560 }}>
                            طوّر مهاراتك في إدارة المشروعات مع المعهد التكنولوجي لهندسة التشييد والإدارة (ICEMT). تدريب حضوري أو أونلاين للإعداد لشهادات PMI، مع دعم كامل لحجز الامتحانات الدولية.
                        </p>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            <Btn href={wa('مرحبًا، أرغب في الاستفسار عن برامج PMI')} orange><WhatsAppIcon sx={{ fontSize: 18 }} /> احجز عبر واتساب</Btn>
                            <a href="#programs" style={{ display: 'inline-flex', alignItems: 'center', fontFamily: F, fontWeight: 700, fontSize: '.88rem', color: C.w, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,.5)', borderRadius: 8, padding: '11px 26px' }}>
                                استعرض البرامج
                            </a>
                        </div>
                    </div>
                    <div style={{ flex: '0 1 220px', display: 'flex', justifyContent: 'center' }}>
                        <img src="/images/pmi/PNI-ATP-2026.png" alt="PMI Authorized Training Partner" style={{ width: 'clamp(150px,20vw,220px)', filter: 'drop-shadow(0 12px 30px rgba(0,0,0,.35))' }} />
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section style={{ background: C.g1, padding: 'clamp(24px,4vw,40px) 0', borderBottom: `1px solid ${C.g3}` }}>
                <div className="pp-W pp-g3">
                    {features.map(({ Icon, t, d }) => (
                        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                            <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(245,124,0,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Icon sx={{ color: C.o, fontSize: 28 }} />
                            </div>
                            <div>
                                <div style={{ fontFamily: F, fontWeight: 800, fontSize: '.92rem', color: C.k }}>{t}</div>
                                <div style={{ fontFamily: F, fontSize: '.76rem', color: C.g5, lineHeight: 1.7 }}>{d}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ABOUT PMI */}
            <section className="pp-S">
                <div className="pp-W pp-g2" style={{ alignItems: 'center' }}>
                    <div>
                        <H eyebrow="عن PMI" title="منظمة عالمية لتطوير مهنة إدارة المشروعات" />
                        <p style={{ fontFamily: F, fontSize: 'clamp(.86rem,1.2vw,.98rem)', color: C.g7, lineHeight: 2, marginTop: -12 }}>
                            معهد إدارة المشروعات (PMI) منظمة عالمية غير ربحية تعمل على تطوير مهنة إدارة المشروعات من خلال وضع المعايير وإصدار الشهادات المهنية، وتوفير الموارد المعرفية لدعم الأفراد والمؤسسات حول العالم.
                        </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
                        <img src="/images/pmi/PMI-Logo.png" alt="Project Management Institute" style={{ height: 90, objectFit: 'contain' }} />
                        <img src="/images/pmi/finallogo.png" alt="ICEMT" style={{ height: 90, objectFit: 'contain' }} />
                    </div>
                </div>
            </section>

            {/* PROGRAMS */}
            <section id="programs" className="pp-S" style={{ background: C.g1 }}>
                <div className="pp-W">
                    <H eyebrow="البرامج التدريبية" title="برامج متخصصة في إدارة المشروعات والتشييد" />
                    <div className="pp-g3">
                        {programs.map(p => (
                            <div key={p.code} className="pp-card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <div style={{ fontFamily: F, fontSize: '1.3rem', fontWeight: 900, color: C.b }}>{p.code}</div>
                                <div style={{ fontFamily: F, fontSize: '.95rem', fontWeight: 800, color: C.k }}>{p.ar}</div>
                                <div style={{ fontFamily: 'sans-serif', direction: 'ltr', textAlign: 'right', fontSize: '.72rem', color: C.g5 }}>{p.en}</div>
                                <p style={{ fontFamily: F, fontSize: '.8rem', color: C.g7, lineHeight: 1.9, flex: 1, margin: '6px 0' }}>{p.desc}</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${C.g3}`, paddingTop: 12 }}>
                                    <span style={{ fontFamily: F, fontSize: '.74rem', fontWeight: 700, color: C.g7, display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <AccessTimeIcon sx={{ fontSize: 15, color: C.o }} /> {p.hours} ساعة تدريبية
                                    </span>
                                    <a href={wa(`مرحبًا، أرغب في الاستفسار عن برنامج ${p.code}`)} target="_blank" rel="noopener noreferrer"
                                        style={{ fontFamily: F, fontSize: '.74rem', fontWeight: 700, color: C.b, textDecoration: 'none' }}>
                                        استفسر ←
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontFamily: F, fontSize: '.8rem', color: C.g5, marginTop: 20, lineHeight: 1.9 }}>
                        طريقة التدريب: حضوري أو أونلاين. الدفع من داخل مصر بالجنيه المصري ومن خارجها بالدولار الأمريكي.
                    </p>
                </div>
            </section>

            {/* LECTURERS */}
            <section className="pp-S">
                <div className="pp-W">
                    <H eyebrow="فريق المحاضرين" title="محاضرون معتمدون بخبرة عملية" />
                    <div className="pp-g4">
                        {lecturers.map(l => (
                            <div key={l.name} className="pp-card" style={{ padding: 0, overflow: 'hidden', textAlign: 'center' }}>
                                <div style={{ aspectRatio: '4/5', background: C.g1, overflow: 'hidden' }}>
                                    <img src={l.photo} alt={l.name} loading="lazy"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                                </div>
                                <div style={{ padding: '16px 14px 18px' }}>
                                    <div style={{ fontFamily: F, fontWeight: 900, fontSize: '.95rem', color: C.k, marginBottom: 10 }}>{l.name}</div>
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                                        {l.certs.map(c => (
                                            <span key={c} style={{ fontFamily: 'sans-serif', fontSize: '.68rem', fontWeight: 700, color: C.b, background: 'rgba(8,101,168,.08)', padding: '3px 10px', borderRadius: 20 }}>{c}</span>
                                        ))}
                                    </div>
                                    {l.note && <div style={{ fontFamily: F, fontSize: '.72rem', color: C.g5, lineHeight: 1.8, marginTop: 10 }}>{l.note}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CERTIFICATES */}
            <section className="pp-S" style={{ background: C.k2 }}>
                <div className="pp-W">
                    <H light eyebrow="شهادة المعهد" title="نموذج الشهادة التي يحصل عليها المتدرب" />
                    <p style={{ fontFamily: F, fontSize: '.88rem', color: 'rgba(255,255,255,.6)', lineHeight: 2, margin: '-14px 0 28px', maxWidth: 640 }}>
                        يحصل المتدرب بعد إتمام البرنامج على شهادة إتمام من المعهد بصفته شريك تدريب معتمد من PMI، موضحًا بها عدد ساعات الاتصال (Contact Hours) المطلوبة للتقدم للامتحان.
                    </p>
                    <div className="pp-g2">
                        {certSamples.map(c => (
                            <a key={c.title} className="pp-cert" href={c.img} target="_blank" rel="noopener noreferrer">
                                <img src={c.img} alt={c.title} loading="lazy" style={{ width: '100%', display: 'block' }} />
                                <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                                    <div>
                                        <div style={{ fontFamily: F, fontWeight: 800, fontSize: '.92rem', color: C.k }}>{c.title}</div>
                                        <div style={{ fontFamily: F, fontSize: '.74rem', color: C.g5, marginTop: 2 }}>{c.sub}</div>
                                    </div>
                                    <OpenInNewIcon sx={{ fontSize: 18, color: C.b }} />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* DISCOUNT */}
            <section style={{ background: 'rgba(245,124,0,.08)', padding: 'clamp(24px,4vw,40px) 0' }}>
                <div className="pp-W" style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 60, height: 60, borderRadius: '50%', background: C.o, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <EmojiEventsIcon sx={{ color: C.w, fontSize: 32 }} />
                        </div>
                        <div>
                            <div style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(1rem,2vw,1.4rem)', color: C.k }}>خصومات خاصة على الامتحانات الدولية</div>
                            <div style={{ fontFamily: F, fontSize: '.82rem', color: C.g7, lineHeight: 1.9 }}>
                                الخصم غير مرتبط بالاشتراك في دورات المعهد. استفسر عن الخصم المتاح وخدمة الحجز.
                            </div>
                        </div>
                    </div>
                    <Btn href={wa('مرحبًا، أرغب في الاستفسار عن خصومات الامتحانات الدولية')} orange><WhatsAppIcon sx={{ fontSize: 18 }} /> استفسر الآن</Btn>
                </div>
            </section>

            {/* STEPS */}
            <section className="pp-S">
                <div className="pp-W">
                    <H eyebrow="رحلتك" title="خطواتك نحو الشهادة الدولية" />
                    <div className="pp-g4">
                        {steps.map(s => (
                            <div key={s.n} className="pp-card" style={{ textAlign: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: '50%', background: C.b, color: C.w, fontFamily: F, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>{s.n}</div>
                                <div style={{ fontFamily: F, fontWeight: 800, fontSize: '.92rem', color: C.k, marginBottom: 6 }}>{s.t}</div>
                                <div style={{ fontFamily: F, fontSize: '.76rem', color: C.g5, lineHeight: 1.8 }}>{s.d}</div>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontFamily: F, fontSize: '.76rem', color: C.g5, marginTop: 14 }}>دخول الامتحان يخضع لشروط PMI وقبول الطلب.</p>
                </div>
            </section>

            {/* HOW TO APPLY */}
            <section className="pp-S" style={{ background: C.g1 }}>
                <div className="pp-W pp-g2" style={{ alignItems: 'start' }}>
                    <div>
                        <H eyebrow="خدمة حجز الامتحانات" title="ما الذي نحتاجه منك عبر واتساب؟" />
                        <ol style={{ margin: 0, paddingInlineStart: 22, fontFamily: F, fontSize: '.86rem', color: C.g7, lineHeight: 2.2 }}>
                            {waData.map(d => <li key={d}>{d}</li>)}
                        </ol>
                        <p style={{ fontFamily: F, fontSize: '.78rem', color: C.g5, marginTop: 14, lineHeight: 1.9 }}>
                            الرسوم حسب نوع الامتحان المطلوب. تفاصيل السداد يرسلها لك فريق المعهد مباشرة بعد التواصل.
                        </p>
                    </div>
                    <div style={{ background: `linear-gradient(135deg,${C.bd},${C.b})`, borderRadius: 14, padding: 'clamp(22px,3vw,36px)', color: C.w, textAlign: 'center' }}>
                        <WorkspacePremiumIcon sx={{ fontSize: 44, color: C.o }} />
                        <div style={{ fontFamily: F, fontWeight: 900, fontSize: '1.2rem', margin: '10px 0 6px' }}>ابدأ رحلتك المهنية معنا</div>
                        <p style={{ fontFamily: F, fontSize: '.84rem', color: 'rgba(255,255,255,.75)', lineHeight: 1.9, marginBottom: 20 }}>
                            تواصل معنا للاستفسار عن البرامج التدريبية وخدمات حجز الامتحانات.
                        </p>
                        <Btn href={wa('مرحبًا، أرغب في الاستفسار عن برامج PMI')} orange><WhatsAppIcon sx={{ fontSize: 18 }} /> 01201737593</Btn>
                    </div>
                </div>
            </section>
        </div>
    );
}