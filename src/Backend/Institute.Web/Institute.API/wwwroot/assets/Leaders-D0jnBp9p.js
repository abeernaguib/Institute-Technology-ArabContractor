import{r as s,j as t}from"./vendor-core-AwIg9RWo.js";import{U as h,T as b,W as u,X as y,S as v,Y as w}from"./vendor-icons-CLluaA_d.js";const e={orange:"#f57c00",orangeLight:"#ff9a3c",blue:"#0865a8",blueLight:"#1a84d4",blueDark:"#044478",black:"#0a0a0a",white:"#ffffff",gray50:"#f8f9fa",gray100:"#f0f1f2",gray500:"#6b7280",gray700:"#374151",font:'"Noto Kufi Arabic", serif'},c=["/images/leader1.jpeg","/images/leader2.jpeg","/images/leader3.jpeg","/images/leader4.jpeg","/images/leader5.jpeg","/images/leader6.jpeg","/images/leader7.jpeg","/images/leader8.jpeg"],j=`
* { box-sizing:border-box; }
html { scroll-behavior:smooth; }

::-webkit-scrollbar { width:8px; }
::-webkit-scrollbar-track { background:#f1f1f1; }
::-webkit-scrollbar-thumb {
    background:linear-gradient(to bottom,${e.orange},${e.blue});
    border-radius:4px;
}

.flc-progress {
    position:fixed;
    top:0;
    left:0;
    right:0;
    height:4px;
    background:#e5e7eb;
    z-index:1001;
}

/* hero grid */
.flc-hero::before {
    content:'';
    position:absolute;
    inset:0;
    background-image:
        linear-gradient(rgba(245,124,0,.07) 1px,transparent 1px),
        linear-gradient(90deg,rgba(245,124,0,.07) 1px,transparent 1px);
    background-size:56px 56px;
    pointer-events:none;
}

/* diagonal cuts */
.flc-hero::after {
    content:'';
    position:absolute;
    bottom:-2px;
    left:0;
    right:0;
    height:clamp(40px,8vw,110px);
    background:${e.white};
    clip-path:polygon(0 100%,100% 0,100% 100%);
}

.flc-about::after {
    content:'';
    position:absolute;
    bottom:-2px;
    left:0;
    right:0;
    height:clamp(40px,8vw,110px);
    background:${e.blue};
    clip-path:polygon(0 100%,100% 0,100% 100%);
}

.flc-role::after {
    content:'';
    position:absolute;
    bottom:-2px;
    left:0;
    right:0;
    height:clamp(40px,8vw,110px);
    background:${e.gray50};
    clip-path:polygon(0 100%,0 0,100% 100%);
}

.flc-proposals::after {
    content:'';
    position:absolute;
    bottom:-2px;
    left:0;
    right:0;
    height:clamp(40px,8vw,110px);
    background:${e.black};
    clip-path:polygon(0 100%,100% 0,100% 100%);
}

/* stat cards */
.flc-stat {
    transition:transform .35s cubic-bezier(.4,0,.2,1),box-shadow .35s;
}

.flc-stat:hover {
    transform:translateY(-6px);
    box-shadow:0 16px 40px rgba(0,0,0,.22);
}

/* responsibility card */
.flc-resp {
    transition:transform .35s cubic-bezier(.4,0,.2,1),
        box-shadow .35s,border-color .35s;
    position:relative;
    overflow:hidden;
}

.flc-resp::before {
    content:'';
    position:absolute;
    top:0;
    right:0;
    width:4px;
    height:100%;
    background:${e.orange};
    transform:scaleY(0);
    transform-origin:bottom;
    transition:transform .38s cubic-bezier(.4,0,.2,1);
}

.flc-resp:hover {
    transform:translateY(-3px);
    box-shadow:0 10px 28px rgba(0,0,0,.12);
    border-color:${e.orange} !important;
}

.flc-resp:hover::before {
    transform:scaleY(1);
}

/* proposal card */
.flc-prop {
    transition:transform .35s cubic-bezier(.4,0,.2,1),box-shadow .35s;
    position:relative;
    overflow:hidden;
}

.flc-prop-o::before,
.flc-prop-b::before,
.flc-prop-k::before,
.flc-prop-m::before {
    content:'';
    position:absolute;
    top:0;
    left:0;
    right:0;
    height:3px;
    transform:scaleX(0);
    transform-origin:right;
    transition:transform .38s cubic-bezier(.4,0,.2,1);
}

.flc-prop-o::before { background:${e.orange}; }
.flc-prop-b::before { background:${e.blue}; }
.flc-prop-k::before { background:${e.black}; }

.flc-prop-m::before {
    background:linear-gradient(to left,${e.orange},${e.blue});
}

.flc-prop:hover {
    transform:translateY(-5px);
    box-shadow:0 14px 36px rgba(0,0,0,.14);
}

.flc-prop:hover::before {
    transform:scaleX(1);
}

/* breadcrumb link */
.flc-bc:hover {
    color:${e.orange} !important;
}

/* image slideshow */
.flc-imgw {
    position:relative;
    overflow:hidden;
    isolation:isolate;
}

.flc-slide-image {
    position:absolute;
    inset:0;
    display:block;
    width:100%;
    height:100%;
    object-fit:contain;
    object-position:center;
    opacity:0;
    transition:opacity .8s ease-in-out;
    pointer-events:none;
}

.flc-slide-image.active {
    opacity:1;
    pointer-events:auto;
}

.flc-slide-dot {
    width:9px;
    height:9px;
    flex-shrink:0;
    padding:0;
    border:0;
    border-radius:20px;
    background:rgba(255,255,255,.6);
    cursor:pointer;
    transition:width .3s ease,background .3s ease;
}

.flc-slide-dot.active {
    width:24px;
    background:#fff;
}

.flc-slide-dot:focus-visible {
    outline:2px solid #fff;
    outline-offset:4px;
}

/* grids */
.flc-stats-grid {
    display:grid;
    gap:clamp(14px,2.5vw,24px);
    grid-template-columns:repeat(2,1fr);
    max-width:560px;
    margin:0 auto;
}

.flc-about-grid {
    display:grid;
    grid-template-columns:1fr;
}

.flc-prop-grid {
    display:grid;
    gap:clamp(12px,2vw,20px);
    grid-template-columns:1fr;
}

@media(min-width:640px) {
    .flc-prop-grid {
        grid-template-columns:repeat(2,1fr);
    }
}

@media(min-width:1024px) {
    .flc-about-grid {
        grid-template-columns:3fr 2fr;
    }

    .flc-prop-grid {
        grid-template-columns:repeat(3,1fr);
    }
}

@media(min-width:1441px) {
    .flc-prop-grid {
        grid-template-columns:repeat(4,1fr);
    }
}

@media(max-width:480px) {
    .flc-hero::after,
    .flc-about::after,
    .flc-role::after,
    .flc-proposals::after {
        height:36px;
    }

    .flc-stats-grid {
        grid-template-columns:1fr;
        max-width:280px;
    }
}

@media(prefers-reduced-motion:reduce) {
    .flc-slide-image {
        transition:none;
    }

    .flc-slide-dot {
        transition:none;
    }
}
`;function k(){if(document.getElementById("flc-styles"))return;const o=document.createElement("style");o.id="flc-styles",o.textContent=j,document.head.appendChild(o)}const x={maxWidth:"min(1280px,94vw)",margin:"0 auto"},d=({light:o,children:l})=>t.jsx("span",{style:{display:"inline-block",background:o?"rgba(255,255,255,0.12)":e.orange,color:o?e.orangeLight:e.white,fontFamily:e.font,fontSize:"clamp(10px,1.2vw,13px)",fontWeight:700,padding:"5px 18px",borderRadius:"2px",marginBottom:"10px",letterSpacing:"0.05em"},children:l}),g=({light:o,center:l})=>t.jsx("div",{style:{display:"flex",justifyContent:l?"center":"flex-start",marginTop:"10px",marginBottom:"clamp(24px,4vw,44px)"},children:t.jsx("div",{style:{width:"52px",height:"4px",background:o?e.orangeLight:e.orange,borderRadius:"2px"}})}),f=({title:o,items:l,isExpandable:a=!1})=>{const[n,i]=s.useState(!a);return t.jsx("div",{className:"flc-resp",style:{background:e.white,border:`1.5px solid ${e.gray100}`,marginBottom:"2px"},children:t.jsxs("div",{style:{padding:"clamp(14px,2.5vw,22px)",cursor:a?"pointer":"default"},onClick:()=>a&&i(!n),children:[t.jsxs("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"12px"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"12px",flex:1},children:[t.jsx("div",{style:{width:"clamp(36px,5vw,44px)",height:"clamp(36px,5vw,44px)",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:`linear-gradient(135deg,${e.orange},${e.blue})`,borderRadius:"3px",boxShadow:"0 4px 12px rgba(245,124,0,.28)"},children:t.jsx(u,{size:18,color:e.white})}),t.jsx("h3",{style:{fontSize:"clamp(13px,1.8vw,17px)",fontWeight:700,color:e.black,fontFamily:e.font,lineHeight:1.5,paddingTop:"6px"},children:o})]}),a&&t.jsx("div",{style:{width:"30px",height:"30px",flexShrink:0,borderRadius:"2px",display:"flex",alignItems:"center",justifyContent:"center",background:n?e.orange:e.gray100,transition:"background .3s"},children:t.jsx(y,{size:16,color:n?e.white:e.gray700,style:{transform:n?"rotate(180deg)":"none",transition:"transform .3s"}})})]}),n&&t.jsx("ul",{style:{borderRight:`4px solid ${e.orange}`,paddingRight:"16px",marginTop:"14px"},children:l.map((r,p)=>t.jsxs("li",{style:{display:"flex",alignItems:"flex-start",gap:"10px",paddingBottom:"8px",color:e.gray700},children:[t.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:e.blue,flexShrink:0,marginTop:"6px"}}),t.jsx("span",{style:{fontSize:"clamp(12px,1.5vw,15px)",lineHeight:1.85,fontFamily:e.font},children:r})]},p))})]})})},S={orange:"flc-prop-o",blue:"flc-prop-b",black:"flc-prop-k",mixed:"flc-prop-m"},z={orange:e.orange,blue:e.blue,black:e.black,mixed:`linear-gradient(135deg,${e.orange},${e.blue})`},$={orange:"rgba(245,124,0,.22)",blue:"rgba(8,101,168,.22)",black:"rgba(10,10,10,.18)",mixed:"rgba(245,124,0,.22)"},C=({title:o,description:l,subitems:a,color:n="orange"})=>t.jsx("div",{className:`flc-prop ${S[n]}`,style:{background:e.white,border:`1.5px solid ${$[n]}`,borderRadius:"3px",padding:"clamp(16px,3vw,24px)"},children:t.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"12px",position:"relative",zIndex:1},children:[t.jsx("div",{style:{width:"clamp(34px,4.5vw,42px)",height:"clamp(34px,4.5vw,42px)",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:z[n],borderRadius:"3px",boxShadow:"0 4px 12px rgba(0,0,0,.18)"},children:t.jsx(v,{size:16,color:e.white})}),t.jsxs("div",{style:{flex:1},children:[t.jsx("h3",{style:{fontSize:"clamp(12px,1.6vw,15px)",fontWeight:700,color:e.black,fontFamily:e.font,marginBottom:"6px",lineHeight:1.5},children:o}),l&&t.jsx("p",{style:{fontSize:"clamp(11px,1.4vw,13px)",color:e.gray500,fontFamily:e.font,lineHeight:1.85},children:l}),a&&t.jsx("ul",{style:{marginTop:"8px"},children:a.map((i,r)=>t.jsxs("li",{style:{display:"flex",alignItems:"flex-start",gap:"8px",paddingBottom:"4px"},children:[t.jsx(w,{size:12,color:e.orange,style:{marginTop:"4px",flexShrink:0}}),t.jsx("span",{style:{fontSize:"clamp(11px,1.4vw,13px)",fontFamily:e.font,lineHeight:1.8,color:e.gray700},children:i})]},r))})]})]})}),m=["orange","blue","black","mixed"],F=[{title:"تنظيم جمعية تيسير الحج التابعة للشركة رحلات للحج والعمرة بالتقسيط",description:"نظرًا لارتفاع الأسعار"},{title:"استخدام الطاقة الشمسية كطاقة بديلة للكهرباء"},{title:"إدراج تحليل أسعار للبنود (تحليل استرشادي)",description:"لدراسة الأسعار"},{title:"عقد دورات خاصة بـ Current Light & IT"},{title:"إمكانية استخدام ألواح الويزافورم المستهلكة من الشدة المعدنية",description:"ومعالجتها وإعادة استخدامها مرة أخرى كأرضيات للكرفانات"},{title:"تعظيم الاستفادة من الفوائض المخزنية",description:"لتوفير السيولة"},{title:"اقتراح لجان لإعادة تقييم مكثف للتنفيذ",description:"مع وضع وصف وظيفي محدد لهم"},{title:"تفعيل دور وحدة مراقبة التكاليف في المشروعات",description:"على حدة، وذلك من خلال وحدة مركزية في الشركة"},{title:"توفير وحدة هندسية داخل الإدارة",description:"تختص بمراجعة التصميمات واللوحات التنفيذية للمشاريع ومراجعة أساليب التنفيذ الحديثة، وتوفير المعلومات والدراسات للمشروعات فيما يخص الأعمال وتنفيذها بالطريقة الصحيحة"},{title:"إمكانية رفع الحد الأدنى للشراء النقدي من 2000 ج إلى 5000 ج",description:"وذلك نظرًا لارتفاع أسعار الخامات والمواد المشتراة طبقًا لمعدل التضخم في الدولة"},{title:"إنشاء وحدة برمجة لوحدات التحكم الحديثة"},{title:"مقترح لإصدار لائحة لمصنعيات إصلاح المعدات",description:"عامة على مستوى الشركة"},{title:"إمكانية الاستفادة من طرق الاستدامة البيئية",description:"عن طريق التركيز على تقليل استهلاك الموارد، وتحسين كفاءة الطاقة، وتقليل النفايات"},{title:"مقترح لتوفير الوقود ( بنزين - سولار )",subitems:["تحويل الخلاطات والمعدات للعمل بالغاز الطبيعي","تركيب أجهزة GPS","استخدام خلايا الهيدروجين"]},{title:"تفعيل قسم الجودة في جميع مراحل التصنيع",description:"من بداية اختبار العينات وحتى خروج المصنعات"},{title:"إنشاء قاعدة بيانات شاملة للمشروعات",description:"تكون بمثابة دليل مرجعي للمشروعات القادمة ( الدروس المستفادة من المشروعات )"},{title:"مقترح نظام الحماية الكاملة للمعدات",description:"من السرقة وخلافه، من خلال عرض للشركة المصرية لخدمات التتبع وتكنولوجيا المعلومات"},{title:"عمل خط احتياجات للموارد البشرية",subitems:["إنشاء وعمل قاعدة بيانات محدثة تضم جميع الفنيين وتصنيفهم حسب الخبرة، وانتقاء مجموعات للعمل في المشروعات المتخصصة","توفير عمالة يومية مؤقتة لتفادي العجز","إعادة التوزيع الجغرافي للعمالة","إعادة تأهيل العمالة لمهن أخرى","تمييز العامل المميز بجهد إضافي طبقًا للوائح الأجور"]},{title:"الاهتمام بالبيئة المحيطة بالمشروعات",description:"عن طريق توفير أماكن للتخلص من المخلفات والزيوت، وعمل مجرى للكشف على السيارات، وعمل أرضيات خرسانية مناسبة لأعمال الصيانة بالورش"},{title:"استخدام الطاقة الشمسية وكيفية الاستفادة منها",description:"لتقليل التكاليف"},{title:"مقترح لإيجاد مصادر أخرى لزيادة الإيراد",description:"عن طريق تعظيم الاستفادة من الأصول العقارية والأراضي المملوكة للشركة"},{title:"مقترح لإنشاء ورش للسلامة",description:"تقوم بعمل مهمات السلامة من بواقي عمليات الإنشاء"},{title:"مقترح بإنشاء تطبيق على المحمول",description:"للدليل التنظيمي للشركة"},{title:"مقترح بإصدار تعليمات توضح المستندات المطلوبة لتأجير المعدات داخل المشاريع",description:"لسهولة وسرعة التنفيذ"},{title:"الاستغلال الأمثل للـ Cloud Computing",description:"في تخزين البيانات"},{title:"استغلال كميات هالك الكاوتش",subitems:["إنشاء مصنع لإعادة تدوير الكاوتش","استخدام الهالك في إنتاج خلطة خرسانية مطاطية"]},{title:"تطبيق كتابة الخطابات باللغتين العربية والإنجليزية معًا",description:"لرفع مستوى اللغة الإنجليزية لدى الأفراد"}],I=F.map((o,l)=>({...o,color:m[l%m.length]}));function B(){const[o,l]=s.useState(0),[a,n]=s.useState(0);return s.useEffect(()=>{k()},[]),s.useEffect(()=>{const i=()=>{const r=document.documentElement.scrollHeight-window.innerHeight,p=r>0?window.scrollY/r*100:0;l(Math.min(100,Math.max(0,p)))};return window.addEventListener("scroll",i,{passive:!0}),i(),()=>window.removeEventListener("scroll",i)},[]),s.useEffect(()=>{if(c.length<=1)return;const i=setInterval(()=>{n(r=>(r+1)%c.length)},3500);return()=>clearInterval(i)},[]),t.jsxs("div",{dir:"rtl",style:{fontFamily:e.font,background:e.white,overflowX:"hidden"},children:[t.jsx("div",{className:"flc-progress",children:t.jsx("div",{style:{height:"100%",width:`${o}%`,background:`linear-gradient(to right,${e.orange},${e.blue})`,transition:"width .2s"}})}),t.jsx("div",{style:{position:"fixed",top:70,left:0,zIndex:50,width:"100%",borderBottom:"1px solid #d1d5db",backgroundColor:"#f5f5f5",padding:"8px 20px"},children:t.jsxs("div",{style:{textAlign:"center",fontFamily:e.font,fontSize:"1rem"},children:[t.jsx("a",{href:"/",className:"flc-bc",style:{color:e.blue,fontWeight:700,textDecoration:"none",marginLeft:"8px",transition:"color .25s"},onMouseEnter:i=>{i.currentTarget.style.color=e.orange},onMouseLeave:i=>{i.currentTarget.style.color=e.blue},children:"الصفحة الرئيسية"}),t.jsx("span",{style:{color:e.gray500,margin:"0 6px"},children:"•"}),t.jsx("span",{style:{color:e.gray700,marginRight:"8px"},children:"مجلس قادة المستقبل"})]})}),t.jsxs("section",{className:"flc-hero",style:{position:"relative",overflow:"hidden",background:e.blueDark,minHeight:"clamp(320px,46vw,540px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"clamp(130px,16vw,180px) clamp(20px,6vw,80px) clamp(90px,13vw,150px)"},children:[t.jsx("div",{style:{position:"absolute",top:0,right:0,width:"clamp(6px,.8vw,10px)",height:"100%",background:`linear-gradient(to bottom,${e.orange},${e.orangeLight})`}}),t.jsxs("div",{style:{position:"relative",zIndex:2,textAlign:"center",maxWidth:"800px",width:"100%"},children:[t.jsx(d,{children:"برنامج تطوير القيادات"}),t.jsxs("h1",{style:{fontSize:"clamp(24px,4.5vw,58px)",fontWeight:900,color:e.white,fontFamily:e.font,lineHeight:1.3,margin:"clamp(10px,2vw,18px) 0"},children:["مجلس قادة ",t.jsx("span",{style:{color:e.orangeLight},children:"المستقبل"})]}),t.jsx("p",{style:{fontSize:"clamp(12px,1.7vw,18px)",color:"rgba(255,255,255,.68)",fontFamily:e.font,lineHeight:2,maxWidth:"640px",margin:"0 auto clamp(24px,4vw,40px)"},children:"نؤمن بأن الاستثمار في شباب الشركة هو الاستثمار في مستقبلها، من خلال برنامج متكامل لتطوير المهارات القيادية والإدارية."}),t.jsx("div",{className:"flc-stats-grid",children:[{num:"30",label:"فرع / إدارة",accent:e.orange},{num:"9",label:"أعضاء لكل مجلس",accent:e.blueLight}].map((i,r)=>t.jsxs("div",{className:"flc-stat",style:{background:"rgba(255,255,255,.07)",border:`2px solid ${i.accent}`,borderRadius:"3px",padding:"clamp(16px,3vw,28px) clamp(12px,2vw,20px)",textAlign:"center"},children:[t.jsx("div",{style:{fontSize:"clamp(32px,5vw,52px)",fontWeight:900,color:i.accent,fontFamily:e.font,lineHeight:1},children:i.num}),t.jsx("div",{style:{fontSize:"clamp(11px,1.4vw,14px)",fontWeight:700,color:"rgba(255,255,255,.7)",fontFamily:e.font,marginTop:"8px"},children:i.label})]},r))})]})]}),t.jsx("section",{className:"flc-about",style:{position:"relative",background:e.white,padding:"clamp(56px,8vw,100px) clamp(16px,6vw,60px) clamp(100px,14vw,160px)"},children:t.jsxs("div",{style:x,children:[t.jsxs("div",{style:{textAlign:"center",marginBottom:"clamp(28px,4vw,46px)"},children:[t.jsx(d,{children:"نبذة عن المجلس"}),t.jsxs("h2",{style:{fontSize:"clamp(20px,3vw,38px)",fontWeight:900,color:e.black,fontFamily:e.font,lineHeight:1.35,marginBottom:"10px"},children:["عن ",t.jsx("span",{style:{color:e.orange},children:"المجلس"})]}),t.jsx(g,{center:!0})]}),t.jsxs("div",{className:"flc-about-grid",style:{border:`2px solid ${e.orange}`,borderRadius:"3px",overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,.10)"},children:[t.jsxs("div",{style:{padding:"clamp(24px,4vw,48px)",display:"flex",flexDirection:"column",gap:"20px"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"14px"},children:[t.jsx("div",{style:{width:"clamp(40px,5vw,52px)",height:"clamp(40px,5vw,52px)",background:e.blue,borderRadius:"3px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:t.jsx(h,{size:22,color:e.white})}),t.jsx("h2",{style:{fontSize:"clamp(18px,2.5vw,28px)",fontWeight:900,color:e.black,fontFamily:e.font},children:"عن المجلس"})]}),t.jsx("p",{style:{fontSize:"clamp(13px,1.6vw,16px)",color:e.gray700,lineHeight:2,fontFamily:e.font},children:"إضافة إلى دور المعهد في المساهمة في أهداف الشركة الاستراتيجية وبالتحديد في تدريب الصف الثاني ورعاية المهارات الإدارية لشباب العاملين وتأهيلهم كقادة المستقبل، صدر قرار رئيس مجلس الإدارة رقم 352 لسنة 2016 بتاريخ 15/05/2016 بعقد مجالس قادة المستقبل."}),t.jsx("p",{style:{fontSize:"clamp(13px,1.6vw,16px)",color:e.gray700,lineHeight:2,fontFamily:e.font},children:"يعتبر المجلس بمثابة صورة مصغرة للمجلس التنفيذي للفروع والإدارات، ويتشكل بعضوية مهندسين – ماليين – إداريين – بالإضافة إلى ممثل المؤهلات المتوسطة (مشرفي التنفيذ – المهن العمالية)."}),t.jsx("div",{style:{borderRight:`4px solid ${e.blue}`,padding:"16px",background:e.gray50,borderRadius:"0 3px 3px 0"},children:t.jsx("p",{style:{fontSize:"clamp(12px,1.5vw,15px)",color:e.gray700,lineHeight:1.95,fontFamily:e.font},children:"تم مخاطبة عدد 30 فرع / إدارة لترشيح أعضاء للمجلس بما لا يزيد عن 9 أعضاء لكل مجلس، وتكون مدة العضوية سنتين ماليتين."})})]}),t.jsxs("div",{className:"flc-imgw",style:{position:"relative",width:"100%",height:"100%",minHeight:"clamp(240px,32vw,420px)",overflow:"hidden",background:"#f0f1f2"},children:[c.map((i,r)=>t.jsx("img",{src:i,alt:`Future Leaders - ${r+1}`,className:`flc-slide-image ${a===r?"active":""}`,loading:r===0?"eager":"lazy",onError:p=>{p.currentTarget.style.visibility="hidden"}},i)),t.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",background:"linear-gradient(to bottom,transparent 55%,rgba(4,68,120,.55) 100%)",zIndex:1}}),t.jsx("div",{style:{position:"absolute",bottom:"16px",left:"50%",transform:"translateX(-50%)",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",zIndex:3,direction:"ltr"},children:c.map((i,r)=>t.jsx("button",{type:"button",className:`flc-slide-dot ${a===r?"active":""}`,"aria-label":`عرض الصورة ${r+1}`,"aria-pressed":a===r,onClick:()=>n(r)},r))})]})]})]})}),t.jsx("section",{className:"flc-role",style:{position:"relative",background:e.blue,padding:"clamp(80px,12vw,150px) clamp(16px,6vw,60px) clamp(100px,14vw,160px)"},children:t.jsxs("div",{style:x,children:[t.jsxs("div",{style:{textAlign:"center",marginBottom:"clamp(28px,4vw,46px)"},children:[t.jsx(d,{light:!0,children:"مهام ومسؤوليات"}),t.jsxs("h2",{style:{fontSize:"clamp(20px,3vw,38px)",fontWeight:900,color:e.white,fontFamily:e.font,lineHeight:1.35,marginBottom:"10px"},children:["دور المعهد ",t.jsx("span",{style:{color:e.orangeLight},children:"في المجلس"})]}),t.jsx(g,{light:!0,center:!0})]}),t.jsx("p",{style:{fontSize:"clamp(13px,1.6vw,16px)",color:"rgba(255,255,255,.72)",fontFamily:e.font,lineHeight:2,textAlign:"center",marginBottom:"clamp(24px,4vw,36px)"},children:"تفعيلًا لدور المعهد في الإشراف على مجالس قادة المستقبل، يقوم ممثلو المعهد بالمهام التالية:"}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[t.jsx(f,{title:"الإدارة الفعالة للاجتماعات",items:["الحرص على أن ينعقد المجلس إداريًا طبقًا للأعراف والإجراءات المعمول بها (استكمال الأجندة وفقًا للنموذج الموضوع — استكمال النصاب القانوني للأعضاء — الالتزام بقرار مجلس الإدارة في هذا الصدد)."]}),t.jsx(f,{title:"متابعة تنفيذ مهام ومسؤوليات المشاركين",isExpandable:!0,items:["دراسة جدول الأعمال وأي وثائق أخرى والتأكد من استكمال بحث الموضوعات والاستعداد التام للاجتماع.","متابعة أهداف الاجتماع وتحديدها والتأكد من عدم انحرافها عن أجندة العمل.","متابعة الاستراتيجية المتبعة في الاجتماع والإصغاء بعناية والمساهمة في الوقت المناسب.","معرفة الإجراءات أو القواعد التي سيسير الاجتماع وفقها والسيطرة على ردود الأفعال الشخصية.","تدوين الملاحظات والمشاركة في النقاش الجاد الفعال والمساعدة في اتخاذ القرارات.","الحرص على الحيادية والتقيد بالموضوع في مناقشة مجالات الاجتماع.","تدريب أعضاء المجلس على مهارات العرض Presentation."]}),t.jsx(f,{title:"متابعة مقرر المجلس في تنفيذ مهامه",isExpandable:!0,items:["التأكد من اتخاذ كافة الترتيبات الإدارية بشكل مناسب ومن سيرها بسلاسة.","تدوين ملاحظات دقيقة عن الفعاليات وكتابة محضر ليكون سجلًا دائمًا ورسميًا.","مساعدة رئيس الاجتماع طوال الاجتماع والاحتفاظ بكافة الوثائق ذات العلاقة.","إجراءات التحضير قبل الاجتماع وتجهيز أجندة الاجتماع."]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"14px",border:`2px solid ${e.orange}`,background:"rgba(255,255,255,.07)",padding:"clamp(14px,2.5vw,20px)"},children:[t.jsx("div",{style:{width:"40px",height:"40px",flexShrink:0,background:e.orange,borderRadius:"3px",display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsx(b,{size:20,color:e.white})}),t.jsx("span",{style:{fontSize:"clamp(13px,1.7vw,16px)",fontWeight:700,color:e.white,fontFamily:e.font},children:"تقييم اجتماعات قادة المستقبل دوريًا"})]})]})]})}),t.jsx("section",{className:"flc-proposals",style:{position:"relative",background:e.gray50,padding:"clamp(80px,12vw,150px) clamp(16px,6vw,60px) clamp(100px,14vw,160px)"},children:t.jsxs("div",{style:x,children:[t.jsxs("div",{style:{textAlign:"center",marginBottom:"clamp(28px,4vw,46px)"},children:[t.jsx(d,{children:"مبادرات مبتكرة"}),t.jsxs("h2",{style:{fontSize:"clamp(20px,3vw,38px)",fontWeight:900,color:e.black,fontFamily:e.font,lineHeight:1.35,marginBottom:"6px"},children:["مقترحات ",t.jsx("span",{style:{color:e.orange},children:"قادة المستقبل"})]}),t.jsx("p",{style:{fontSize:"clamp(12px,1.5vw,15px)",color:e.gray500,fontFamily:e.font},children:"لتطوير العمل وتحسين الأداء"}),t.jsx(g,{center:!0})]}),t.jsx("div",{className:"flc-prop-grid",children:I.map((i,r)=>t.jsx(C,{...i},r))})]})}),t.jsx("div",{style:{background:e.black,padding:"clamp(50px,8vw,100px) clamp(16px,6vw,60px)",textAlign:"center"},children:t.jsxs("p",{style:{color:"rgba(255,255,255,.3)",fontFamily:e.font,fontSize:"clamp(11px,1.3vw,14px)"},children:["المعهد التكنولوجي لهندسة التشييد والإدارة ©"," ",new Date().getFullYear()]})})]})}export{B as default};
