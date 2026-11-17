import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ComputerIcon from '@mui/icons-material/Computer';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CloseIcon from '@mui/icons-material/Close';

const F = '"Noto Kufi Arabic",serif';
const C = { o: '#f57c00', b: '#0865a8', bd: '#044474', w: '#fff', k: '#0a0a0a', k2: '#111827', g1: '#f9fafb', g2: '#f3f4f6', g3: '#e5e7eb', g5: '#6b7280', g7: '#374151' };

const IMG = {
    clac: '/images/clac/1789471122001.jpeg',
    icemt: '/images/clac/finallogo.jpg',
    banner: '/images/clac/1760184010163.jpeg',
    qr: '/images/clac/QR.png',
    overview: '/images/clac/Clac.jpeg',
};
const FORM = 'https://forms.cloud.microsoft/r/Aq55wCC9Tv';
const WA = (msg) => `https://wa.me/201109754459?text=${encodeURIComponent(msg)}`;

const courses = [
    {
        code: 'CLAC 010', ar: 'مصادر وأحكام الالتزامات', en: 'Sources & Regimes of Obligations',
        rows: [
            ['نظرية الالتزام', 'Theory of Obligations'],
            ['نظرية العقد', 'Theory of Contract'],
            ['مصادر الالتزامات', 'Sources of Obligations'],
            ['آثار الالتزامات وأحكامها', 'Consequences & Rules of Obligations'],
            ['انتقال الالتزامات', 'Transmission of Obligations'],
            ['انقضاء الالتزامات', 'Extinction of Obligations'],
            ['إثبات الالتزامات', 'Proof of Obligations'],
            ['المسؤولية التقصيرية', 'Tort'],
        ],
    },
    {
        code: 'CLAC 020', ar: 'العقود المسماة / قانون الإثبات / مسؤوليات المهندس والمقاول', en: 'Specific Contracts / Law of Evidence / Liabilities of the Engineer & the Contractor',
        rows: [
            ['عقد المقاولة مقارنةً بعقد العمل', 'Contract for Works vs. Contract for Employment'],
            ['عقود المقاولات من الباطن', 'Subcontracts'],
            ['عقود الاستشارات', 'Consultancy Contracts'],
            ['قانون رقم 182 لسنة 2018', 'Law No. 182/2018'],
            ['عقد العمل', 'Contract for Labor'],
            ['قانون الإثبات', 'Law of Evidence'],
            ['مسؤوليات المهندس والمقاول', 'Liabilities of the Engineer and the Contractor'],
        ],
    },
    {
        code: 'CLAC 030', ar: 'عقود الفيديك: منهج تفسيري قائم على الحالات العملية', en: 'FIDIC Contracts: Interpretive Case-Oriented Approach',
        rows: [
            ['المخاطر في صناعة التشييد', 'Risks in the Construction Industry'],
            ['العقود المتوازنة وتوزيع المخاطر', 'Balanced Contracts / Sharing of Risks'],
            ['أنواع العقود', 'Types of Contracts'],
            ['الكتاب الأحمر للفيديك: منهج تفسيري قائم على الحالات العملية', 'FIDIC Red Book: Interpretative Case-Oriented Approach'],
            ['أحكام المطالبات وتسوية المنازعات', 'Claims Provisions / Resolution of Disputes'],
        ],
    },
    {
        code: 'CLAC 040', ar: 'المطالبات والمنازعات في صناعة التشييد', en: 'Claims & Disputes in the Construction Industry',
        rows: [
            ['مقدمة وتعريف', 'Introduction and Definition'],
            ['المطالبات المتعلقة بوجود العقد وتكوينه', 'Claims Concerning the Existence (Formation) of a Contract'],
            ['المطالبات الناشئة عن المستندات، مثل خطاب النوايا والمواصفات', 'Claims Arising from Documentation (Letter of Intent / Specifications…)'],
            ['المطالبات المتعلقة بتنفيذ الأعمال، مثل ظروف التربة وطرق التنفيذ ومقاولي الباطن المسمّين', 'Claims Concerning Execution of Works (Soil Conditions / Methods of Construction / Nominated Subcontractors…)'],
            ['المطالبات المتعلقة بأحكام الدفع، مثل تقييم التغييرات', 'Claims Concerning Payment Provisions (Valuation of Variations…)'],
            ['المطالبات المتعلقة بالتأخيرات: أنواع التأخير، والبرنامج الزمني، وتعطّل الأعمال، والتأخيرات المتزامنة', 'Claims Concerning Delays (Types of Delays / Construction Programme / Disruption / Concurrent Delays…)'],
            ['المطالبات الناشئة عن الإخلال بالعقد وإنهائه، والوقت المفتوح لإتمام الأعمال، وتمديد مدة التنفيذ، والمنهج الصافي مقابل الإجمالي', 'Claims Arising from Default, Termination, Time at Large, Extension of Time, Net vs. Gross Approach…'],
        ],
    },
    {
        code: 'CLAC 050', ar: 'تسوية المنازعات / مجالس فض المنازعات / التحكيم', en: 'Resolution of Disputes / Dispute Boards / Arbitration',
        rows: [
            ['الوسائل البديلة لتسوية المنازعات', 'Alternative Dispute Resolution (ADR)'],
            ['مجالس فض المنازعات بأنواعها', 'Dispute Boards (DAB / DRB / CDB)'],
            ['الأحكام المتعلقة بسقوط الحق لعدم مراعاة المدد المحددة', 'Time-Barring Provisions'],
            ['اتفاق التحكيم وآثاره القانونية', 'Arbitration Agreement and Its Legal Effects'],
            ['تشكيل هيئة التحكيم', 'Constitution of the Arbitration Tribunal'],
            ['إجراءات التحكيم', 'Arbitration Procedures'],
            ['حكم التحكيم', 'The Arbitral Award'],
            ['بطلان حكم التحكيم', 'Annulment of the Arbitration Award'],
        ],
    },
];

const highlights = [
    { Icon: ComputerIcon, t: 'حضوري أو أونلاين', d: 'بمرونة في التعلم' },
    { Icon: MenuBookIcon, t: 'خمسة مقررات', d: 'متخصصة' },
    { Icon: WorkspacePremiumIcon, t: 'شهادة مشتركة', d: 'من الطرفين' },
];

const audience = [
    'المهندسون ومديرو المشروعات',
    'مهندسو ومسؤولو العقود والمطالبات',
    'المقاولون والاستشاريون وممثلو أصحاب الأعمال',
    'مسؤولو المشتريات والتعاقدات',
    'المحامون والمختصون بالشؤون القانونية في قطاع التشييد والبناء',
];

function H({ eyebrow, title, light, center }) {
    return (
        <div style={{ textAlign: center ? 'center' : 'right', marginBottom: 'clamp(22px,4vw,36px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: center ? 'center' : 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 28, height: 2, background: C.o }} />
                <span style={{ fontFamily: F, fontSize: '.72rem', fontWeight: 700, letterSpacing: 2, color: light ? 'rgba(255,255,255,.6)' : C.o }}>{eyebrow}</span>
            </div>
            <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(1.4rem,3vw,2.2rem)', lineHeight: 1.5, color: light ? C.w : C.k, margin: 0 }}>{title}</h2>
        </div>
    );
}

function Btn({ href, orange, outline, children }) {
    const s = {
        display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: F, fontWeight: 700, fontSize: '.88rem',
        textDecoration: 'none', borderRadius: 8, padding: '11px 26px', transition: 'opacity .2s, transform .2s',
        color: C.w, background: outline ? 'transparent' : orange ? C.o : C.b,
        border: outline ? '1.5px solid rgba(255,255,255,.55)' : 'none',
    };
    return (
        <a href={href} target={href.startsWith('#') ? undefined : '_blank'} rel="noopener noreferrer" style={s}
            onMouseEnter={e => { e.currentTarget.style.opacity = '.85'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = ''; }}>
            {children}
        </a>
    );
}

export default function ClacPage() {
    const [open, setOpen] = useState(2); // CLAC 030 open by default, like the infographic
    const [chartOpen, setChartOpen] = useState(false);
    const [zoomed, setZoomed] = useState(false);

    const closeChart = () => { setChartOpen(false); setZoomed(false); };

    // modal: Esc to close + lock page scroll
    useEffect(() => {
        if (!chartOpen) return;
        const onKey = (e) => { if (e.key === 'Escape') { setChartOpen(false); setZoomed(false); } };
        window.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
        };
    }, [chartOpen]);

    return (
        <div dir="rtl" style={{ fontFamily: F, background: C.w, overflowX: 'hidden' }}>
            <style>{`
                .cl-W{max-width:1200px;margin:0 auto;padding:0 clamp(16px,4vw,48px);}
                .cl-S{padding:clamp(40px,6vw,80px) 0;}
                .cl-g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(16px,3vw,40px);}
                .cl-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(12px,2vw,20px);}
                @media(max-width:840px){.cl-g2{grid-template-columns:1fr;}}
                @media(max-width:700px){.cl-g3{grid-template-columns:1fr;}}
                .cl-acc{border:1px solid ${C.g3};border-radius:12px;background:${C.w};overflow:hidden;transition:border-color .25s,box-shadow .25s;}
                .cl-acc.on{border-color:${C.b};box-shadow:0 10px 30px rgba(8,101,168,.12);}
                .cl-acc-h{width:100%;display:flex;align-items:center;gap:14px;padding:16px 18px;background:none;border:none;cursor:pointer;text-align:right;font-family:${F};}
                .cl-code{font-weight:900;color:${C.b};font-size:.95rem;min-width:84px;padding-inline-end:14px;border-inline-end:2px solid ${C.o};}
                .cl-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:11px 18px;border-top:1px solid ${C.g2};}
                .cl-row:nth-child(odd){background:${C.g1};}
                @media(max-width:640px){.cl-row{grid-template-columns:1fr;gap:2px;}}
                .cl-step{background:${C.w};border:1px solid ${C.g3};border-radius:14px;padding:22px;}

                .cl-chart-btn{display:flex;align-items:center;gap:clamp(14px,2.5vw,24px);width:100%;max-width:640px;margin-top:24px;padding:14px;background:${C.w};border:2px solid ${C.b};border-right:6px solid ${C.o};border-radius:14px;cursor:pointer;font-family:${F};box-shadow:0 8px 24px rgba(8,101,168,.12);transition:transform .25s,box-shadow .25s;}
                .cl-chart-btn:hover{transform:translateY(-3px);box-shadow:0 14px 34px rgba(8,101,168,.22);}
                .cl-chart-thumb{position:relative;flex-shrink:0;width:clamp(120px,22vw,200px);aspect-ratio:4/3;border-radius:10px;overflow:hidden;border:1px solid ${C.g3};background:${C.g2};}
                .cl-chart-thumb img{width:100%;height:100%;object-fit:cover;display:block;}
                .cl-chart-zoom{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(4,68,116,.45);color:#fff;opacity:0;transition:opacity .25s;}
                .cl-chart-btn:hover .cl-chart-zoom{opacity:1;}
                @keyframes clFade{from{opacity:0}to{opacity:1}}
                @keyframes clPop{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
            `}</style>

            {/* HERO */}
            <section style={{ background: `linear-gradient(135deg,${C.bd} 0%,${C.b} 100%)`, color: C.w, padding: 'clamp(40px,7vw,90px) 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -90, left: -90, width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(255,255,255,.1)' }} />
                <div className="cl-W" style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 22 }}>
                        <span style={{ background: C.w, borderRadius: 14, padding: 8, display: 'inline-flex' }}>
                            <img src={IMG.clac} alt="CLAC" style={{ height: 64, width: 64, objectFit: 'contain' }} />
                        </span>
                        <span style={{ background: C.w, borderRadius: 14, padding: 8, display: 'inline-flex' }}>
                            <img src={IMG.icemt} alt="ICEMT" style={{ height: 64, width: 64, objectFit: 'contain' }} />
                        </span>
                    </div>
                    <h1 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(1.8rem,4.6vw,3.4rem)', lineHeight: 1.35, margin: '0 0 8px' }}>
                        برامج <span style={{ color: C.o }}>CLAC</span>
                    </h1>
                    <h2 style={{ fontFamily: F, fontWeight: 800, fontSize: 'clamp(1.1rem,2.4vw,1.7rem)', lineHeight: 1.6, margin: '0 0 12px' }}>
                        الجوانب التعاقدية والقانونية في صناعة التشييد والبناء
                    </h2>
                    <p style={{ fontFamily: F, fontSize: 'clamp(.86rem,1.3vw,1rem)', color: 'rgba(255,255,255,.8)', lineHeight: 2, margin: '0 0 8px', maxWidth: 760 }}>
                        بالتعاون بين شركة المقاولون العرب متمثلة في المعهد التكنولوجي لهندسة التشييد والإدارة ومركز الإدارة التعاقدية والتحكيم — دكتور مهندس / شريف الهجان
                    </p>
                    <p style={{ fontFamily: F, fontSize: 'clamp(.86rem,1.3vw,1rem)', color: 'rgba(255,255,255,.7)', lineHeight: 2, margin: '0 0 26px', maxWidth: 760 }}>
                        طوّر مهاراتك في إدارة العقود والمطالبات وتسوية المنازعات من خلال برامج CLAC، التي تجمع بين الأسس القانونية والتعاقدية والتطبيقات العملية في صناعة التشييد والبناء.
                    </p>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <Btn href={FORM} orange>سجّل اهتمامك الآن</Btn>
                        <Btn href="#programs" outline>استعرض البرامج</Btn>
                    </div>
                </div>
            </section>

            {/* HIGHLIGHTS */}
            <section style={{ background: C.g1, padding: 'clamp(22px,4vw,36px) 0', borderBottom: `1px solid ${C.g3}` }}>
                <div className="cl-W cl-g3">
                    {highlights.map(({ Icon, t, d }) => (
                        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                            <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(8,101,168,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Icon sx={{ color: C.b, fontSize: 28 }} />
                            </div>
                            <div>
                                <div style={{ fontFamily: F, fontWeight: 800, fontSize: '.92rem', color: C.k }}>{t}</div>
                                <div style={{ fontFamily: F, fontSize: '.76rem', color: C.g5 }}>{d}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* COOPERATION */}
            <section className="cl-S">
                <div className="cl-W cl-g2" style={{ alignItems: 'center' }}>
                    <div>
                        <H eyebrow="عن اتفاقية التعاون" title="تعاون يجمع الخبرة والتطبيق" />
                        <p style={{ fontFamily: F, fontSize: 'clamp(.86rem,1.2vw,.98rem)', color: C.g7, lineHeight: 2.1, margin: '-10px 0 12px' }}>
                            أبرمت شركة المقاولون العرب، ممثلةً في المعهد التكنولوجي لهندسة التشييد والإدارة، اتفاقية تدريب مع مركز الإدارة التعاقدية والتحكيم — دكتور مهندس / شريف الهجان، لتقديم برامج CLAC المتخصصة في الدراسات التعاقدية والقانونية في صناعة التشييد والبناء.
                        </p>
                        <p style={{ fontFamily: F, fontSize: 'clamp(.86rem,1.2vw,.98rem)', color: C.g7, lineHeight: 2.1, margin: '0 0 12px' }}>
                            يهدف التعاون إلى تطوير مهارات المهندسين والعاملين في إدارة المشروعات والعقود والشؤون القانونية، وتعزيز قدراتهم على التعامل مع الالتزامات التعاقدية والمطالبات والمنازعات.
                        </p>
                        <p style={{ fontFamily: F, fontSize: 'clamp(.86rem,1.2vw,.98rem)', color: C.g7, lineHeight: 2.1, margin: 0 }}>
                            وتُقدَّم المحاضرات حضوريًا أو أونلاين وفقًا للنظام المحدد لكل دفعة، مع إصدار شهادة مشتركة معتمدة من الطرفين.
                        </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
                        <img src={IMG.icemt} alt="ICEMT" style={{ height: 130, objectFit: 'contain' }} />
                        <div style={{ width: 2, height: 90, background: C.o }} />
                        <img src={IMG.clac} alt="CLAC" style={{ height: 130, objectFit: 'contain' }} />
                    </div>
                </div>
            </section>

            {/* WHAT IS CLAC */}
            <section style={{ background: C.k2, padding: 'clamp(32px,5vw,56px) 0' }}>
                <div className="cl-W">
                    <div style={{ fontFamily: F, fontSize: '.74rem', fontWeight: 700, letterSpacing: 2, color: C.o, marginBottom: 10 }}>ما هو برنامج CLAC؟</div>
                    <div style={{ fontFamily: 'sans-serif', direction: 'ltr', textAlign: 'right', fontWeight: 800, fontSize: 'clamp(1.05rem,2.2vw,1.5rem)', color: C.w, marginBottom: 14 }}>
                        Contractual &amp; Legal Aspects in the Construction Industry
                    </div>
                    <p style={{ fontFamily: F, fontSize: 'clamp(.86rem,1.2vw,.98rem)', color: 'rgba(255,255,255,.7)', lineHeight: 2.1, margin: 0, maxWidth: 900 }}>
                        برنامج متخصص في الجوانب التعاقدية والقانونية في صناعة التشييد والبناء، صممه الدكتور المهندس شريف الهجان، ويضم خمس مقررات تغطي مصادر الالتزامات وأحكامها، والعقود والمسؤوليات، وعقود الفيديك، والمطالبات والمنازعات، ووسائل تسويتها والتحكيم.
                    </p>
                </div>
            </section>

            {/* PROGRAMS */}
            <section id="programs" className="cl-S" style={{ background: C.g1 }}>
                <div className="cl-W">
                    <H eyebrow="البرامج والمحتوى العلمي" title="اختر البرنامج المناسب لك" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {courses.map((c, i) => {
                            const on = open === i;
                            return (
                                <div key={c.code} className={`cl-acc${on ? ' on' : ''}`}>
                                    <button className="cl-acc-h" onClick={() => setOpen(on ? -1 : i)} aria-expanded={on}>
                                        <span className="cl-code">{c.code}</span>
                                        <span style={{ flex: 1 }}>
                                            <span style={{ display: 'block', fontWeight: 800, fontSize: 'clamp(.86rem,1.3vw,1rem)', color: C.k, lineHeight: 1.7 }}>{c.ar}</span>
                                            <span style={{ display: 'block', fontFamily: 'sans-serif', direction: 'ltr', textAlign: 'right', fontSize: '.74rem', color: C.g5, lineHeight: 1.6 }}>{c.en}</span>
                                        </span>
                                        <span style={{ width: 34, height: 34, borderRadius: '50%', background: on ? C.b : C.g2, color: on ? C.w : C.g7, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            {on ? <RemoveIcon sx={{ fontSize: 20 }} /> : <AddIcon sx={{ fontSize: 20 }} />}
                                        </span>
                                    </button>
                                    {on && (
                                        <div>
                                            <div className="cl-row" style={{ background: 'rgba(8,101,168,.06)', fontWeight: 800, fontSize: '.76rem', color: C.b }}>
                                                <span>المحتوى بالعربية</span>
                                                <span style={{ fontFamily: 'sans-serif', direction: 'ltr', textAlign: 'right' }}>Content in English</span>
                                            </div>
                                            {c.rows.map(([ar, en]) => (
                                                <div key={en} className="cl-row">
                                                    <span style={{ fontSize: '.84rem', color: C.k, lineHeight: 1.9, display: 'flex', gap: 8 }}>
                                                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.o, flexShrink: 0, marginTop: 10 }} />{ar}
                                                    </span>
                                                    <span style={{ fontFamily: 'sans-serif', direction: 'ltr', textAlign: 'right', fontSize: '.8rem', color: C.g7, lineHeight: 1.8 }}>{en}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* CHART CARD → opens modal */}
                    <button
                        type="button"
                        onClick={() => setChartOpen(true)}
                        className="cl-chart-btn"
                        aria-label="عرض مخطط المقررات الكامل"
                    >
                        <span className="cl-chart-thumb">
                            <img src={IMG.overview} alt="" loading="lazy" />
                            <span className="cl-chart-zoom"><ZoomInIcon sx={{ fontSize: 30 }} /></span>
                        </span>
                        <span style={{ textAlign: 'right', flex: 1 }}>
                            <span style={{ display: 'block', fontFamily: F, fontWeight: 900, fontSize: 'clamp(1rem,1.8vw,1.3rem)', color: C.k, lineHeight: 1.6 }}>
                                عرض مخطط المقررات الكامل
                            </span>
                            <span style={{ display: 'block', fontFamily: 'sans-serif', direction: 'ltr', textAlign: 'right', fontWeight: 800, fontSize: '.85rem', color: C.o, marginTop: 2 }}>
                                ONLINE &amp; OFFLINE
                            </span>
                            <span style={{ display: 'block', fontFamily: F, fontSize: '.78rem', color: C.g5, marginTop: 6 }}>
                                اضغط لعرض الصورة بحجم كبير
                            </span>
                        </span>
                    </button>
                </div>
            </section>

            {/* DR. SHERIF */}
            <section className="cl-S">
                <div className="cl-W">
                    <H eyebrow="مصمم البرنامج" title="الدكتور المهندس شريف الهجان" />
                    <div className="cl-g2" style={{ alignItems: 'center' }}>
                        <div style={{ borderRadius: 14, overflow: 'hidden', border: `1px solid ${C.g3}`, boxShadow: '0 12px 34px rgba(0,0,0,.1)' }}>
                            <img src={IMG.banner} alt="Dr. Sherif El Haggan - Arbitrator, Adjudicator, Mediator" loading="lazy" style={{ width: '100%', display: 'block' }} />
                        </div>
                        <div>
                            <p style={{ fontFamily: F, fontSize: 'clamp(.86rem,1.2vw,.98rem)', color: C.g7, lineHeight: 2.1, margin: '0 0 12px' }}>
                                مؤسس ومدير <strong>مركز الإدارة التعاقدية والتحكيم</strong>، وزميل المجمع الملكي البريطاني للمحكمين الدوليين، ووسيط معتمد من مركز فض المنازعات بلندن.
                            </p>
                            <p style={{ fontFamily: F, fontSize: 'clamp(.86rem,1.2vw,.98rem)', color: C.g7, lineHeight: 2.1, margin: 0 }}>
                                من كبار الخبراء في إعداد المطالبات وعقود الفيديك «FIDIC» والتحكيم وفض المنازعات بالوسائل الودية، ومصمم برنامج <strong>CLAC</strong> الرائد في مجال الدراسات التعاقدية والقانونية في صناعة التشييد والبناء.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* AUDIENCE + SYSTEM */}
            <section className="cl-S" style={{ background: C.g1 }}>
                <div className="cl-W cl-g2" style={{ alignItems: 'start' }}>
                    <div>
                        <H eyebrow="الفئة المستهدفة" title="لمن هذه البرامج؟" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {audience.map(a => (
                                <div key={a} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: C.w, border: `1px solid ${C.g3}`, borderRadius: 10, padding: '12px 16px' }}>
                                    <CheckCircleOutlineIcon sx={{ fontSize: 20, color: C.o, flexShrink: 0, marginTop: '2px' }} />
                                    <span style={{ fontFamily: F, fontSize: '.86rem', color: C.k, lineHeight: 1.8 }}>{a}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <H eyebrow="نظام الدراسة والشهادة" title="كيف تتم الدراسة؟" />
                        <div className="cl-step" style={{ marginBottom: 14 }}>
                            <div style={{ fontFamily: F, fontWeight: 800, color: C.b, marginBottom: 6 }}>نظام الدراسة</div>
                            <div style={{ fontFamily: F, fontSize: '.86rem', color: C.g7, lineHeight: 2 }}>
                                تُقدَّم المحاضرات حضوريًا أو أونلاين وفقًا للنظام المحدد لكل دفعة.
                            </div>
                        </div>
                        <div className="cl-step">
                            <div style={{ fontFamily: F, fontWeight: 800, color: C.b, marginBottom: 6 }}>الشهادة</div>
                            <div style={{ fontFamily: F, fontSize: '.86rem', color: C.g7, lineHeight: 2 }}>
                                تُصدر شهادة مشتركة معتمدة من المعهد التكنولوجي لهندسة التشييد والإدارة ومركز الإدارة التعاقدية والتحكيم — دكتور مهندس / شريف الهجان، وفقًا لمتطلبات إتمام البرنامج.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW TO REGISTER */}
            <section style={{ background: `linear-gradient(160deg,${C.bd},${C.k2})`, color: C.w, padding: 'clamp(40px,6vw,80px) 0' }}>
                <div className="cl-W">
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(24px,4vw,40px)' }}>
                        <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(1.5rem,3.2vw,2.4rem)', margin: '0 0 10px' }}>ابدأ رحلتك مع <span style={{ color: C.o }}>CLAC</span></h2>
                        <div style={{ width: 56, height: 3, background: C.o, margin: '0 auto', borderRadius: 2 }} />
                    </div>

                    <div className="cl-g3" style={{ alignItems: 'stretch' }}>
                        {/* step 1 */}
                        <div className="cl-step" style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.15)', color: C.w, textAlign: 'center' }}>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: C.o, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>1</div>
                            <div style={{ fontWeight: 800, marginBottom: 6 }}>استكمل استمارة تسجيل الاهتمام</div>
                            <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.7)', lineHeight: 1.9, margin: '0 0 14px' }}>
                                اضغط على الرابط، وأدخل بياناتك وحدد البرنامج الذي ترغب في الالتحاق به. أو امسح رمز QR.
                            </p>
                            <img src={IMG.qr} alt="CLAC registration QR" loading="lazy" style={{ width: 150, borderRadius: 12, marginBottom: 14 }} />
                            <div><Btn href={FORM} orange><DescriptionIcon sx={{ fontSize: 18 }} /> افتح استمارة التسجيل</Btn></div>
                        </div>

                        {/* step 2 */}
                        <div className="cl-step" style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.15)', color: C.w, textAlign: 'center' }}>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: C.o, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>2</div>
                            <div style={{ fontWeight: 800, marginBottom: 6 }}>تواصل مع المعهد عبر واتساب</div>
                            <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.7)', lineHeight: 1.9, margin: '0 0 14px' }}>
                                بعد إرسال الاستمارة، تواصل معنا لمعرفة المواعيد والتفاصيل المالية ونظام الحضور للدفعات المتاحة. يرجى إرسال اسمك والبرنامج المطلوب مع الإشارة إلى استكمال استمارة تسجيل الاهتمام.
                            </p>
                            <div style={{ fontWeight: 800, direction: 'ltr', marginBottom: 14 }}>+20 11 09754459</div>
                            <a href={WA('مرحبًا، قمت بتعبئة استمارة تسجيل الاهتمام ببرامج CLAC. الاسم: ... البرنامج المطلوب: ...')}
                                target="_blank" rel="noopener noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: C.w, fontFamily: F, fontWeight: 700, fontSize: '.88rem', textDecoration: 'none', borderRadius: 8, padding: '11px 24px' }}>
                                <WhatsAppIcon sx={{ fontSize: 20 }} /> تواصل عبر واتساب بعد التسجيل
                            </a>
                        </div>

                        {/* step 3 */}
                        <div className="cl-step" style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.15)', color: C.w, textAlign: 'center' }}>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: C.o, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>3</div>
                            <div style={{ fontWeight: 800, marginBottom: 6 }}>استكمل إجراءات الحجز</div>
                            <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.7)', lineHeight: 1.9, margin: 0 }}>
                                يوضح لك فريق المعهد خطوات استكمال الحجز والسداد وتأكيد الالتحاق.
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 28, fontFamily: F, fontSize: '.82rem', color: 'rgba(255,255,255,.75)', textAlign: 'center' }}>
                        <InfoOutlinedIcon sx={{ fontSize: 18, color: C.o }} />
                        تعبئة الاستمارة تُعد تسجيلًا للاهتمام، ولا تُعد تأكيدًا نهائيًا للحجز.
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 10, fontFamily: F, fontSize: '.8rem', color: 'rgba(255,255,255,.55)' }}>
                        شهادة مشتركة معتمدة من المعهد ومركز الإدارة التعاقدية والتحكيم
                    </div>
                </div>
            </section>

            {/* ── CHART MODAL ── */}
            {chartOpen && createPortal(
                <div
                    onClick={closeChart}
                    role="dialog"
                    aria-modal="true"
                    aria-label="مخطط المقررات"
                    style={{
                        position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,.88)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        padding: 'clamp(12px,3vw,32px)', animation: 'clFade .25s ease',
                    }}
                >
                    <button
                        onClick={closeChart}
                        aria-label="إغلاق"
                        style={{
                            position: 'absolute', top: 'clamp(12px,2vw,24px)', left: 'clamp(12px,2vw,24px)',
                            width: 46, height: 46, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.4)',
                            background: 'rgba(255,255,255,.15)', color: '#fff', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
                        }}
                    >
                        <CloseIcon />
                    </button>

                    <div style={{ fontFamily: F, color: '#fff', fontWeight: 800, fontSize: 'clamp(.9rem,1.6vw,1.1rem)', marginBottom: 12, textAlign: 'center' }}>
                        مخطط برامج CLAC — Online &amp; Offline
                    </div>

                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '96vw', maxHeight: '82vh', overflow: 'auto', borderRadius: 10,
                            background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,.5)',
                            animation: 'clPop .3s cubic-bezier(.22,1,.36,1)',
                        }}
                    >
                        <img
                            src={IMG.overview}
                            alt="مخطط مقررات CLAC"
                            onClick={() => setZoomed(z => !z)}
                            style={{
                                display: 'block',
                                width: zoomed ? 'max(1400px, 100%)' : 'auto',
                                maxWidth: zoomed ? 'none' : '96vw',
                                maxHeight: zoomed ? 'none' : '82vh',
                                cursor: zoomed ? 'zoom-out' : 'zoom-in',
                            }}
                        />
                    </div>

                    <div style={{ fontFamily: F, color: 'rgba(255,255,255,.6)', fontSize: '.75rem', marginTop: 10 }}>
                        اضغط على الصورة للتكبير / التصغير
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}