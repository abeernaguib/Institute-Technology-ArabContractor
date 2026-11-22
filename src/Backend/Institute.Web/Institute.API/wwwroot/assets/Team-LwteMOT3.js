import{r as l,j as e,aR as S}from"./vendor-core-AwIg9RWo.js";import{d as F,p as A}from"./richText-CXuIcG0w.js";import{m as B}from"./vendor-framer-DfgDkh6P.js";const k="/api/Team",m="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23dde3ea' width='300' height='300'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-size='120' fill='%23899aaa'%3E%F0%9F%91%A4%3C/text%3E%3C/svg%3E",t={orange:"#f57c00",orangeLight:"#ff9a3c",orangeDark:"#bf5200",blue:"#0865a8",blueDark:"#044478",black:"#0a0a0a",white:"#ffffff",gray50:"#f8f9fa",gray100:"#f0f1f2",gray300:"#d0d3d8",gray500:"#6b7280",gray700:"#374151",font:'"Noto Kufi Arabic", serif'},T=`
    .team-root { direction: rtl; font-family: ${t.font}; background: ${t.white}; overflow-x: hidden; }

    /* hero grid overlay */
    .team-hero-grid::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image:
            linear-gradient(rgba(245,124,0,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,124,0,0.07) 1px, transparent 1px);
        background-size: 56px 56px;
        pointer-events: none;
    }

    /* card hover effects */
    .team-card { transition: transform 0.38s cubic-bezier(.4,0,.2,1), box-shadow 0.38s cubic-bezier(.4,0,.2,1), border-color 0.38s cubic-bezier(.4,0,.2,1); }
    .team-card:hover { transform: translateY(-8px) !important; box-shadow: 0 18px 48px rgba(0,0,0,0.18) !important; border-color: ${t.orange} !important; }
    .team-card--large:hover { border-color: ${t.blue} !important; box-shadow: 0 20px 56px rgba(8,101,168,0.22) !important; }

    /* right accent bar */
    .team-card::before { content: ''; position: absolute; top:0; right:0; width:4px; height:100%; background:${t.orange}; transform:scaleY(0); transform-origin:bottom; transition:transform 0.38s cubic-bezier(.4,0,.2,1); z-index:2; }
    .team-card--large::before { background:${t.blue}; }
    .team-card:hover::before { transform: scaleY(1); }

    /* gradient bar between image and body */
    .team-card__bar { height:4px; background:linear-gradient(to left,${t.orange},${t.blue}); transform:scaleX(0); transform-origin:right; transition:transform 0.38s cubic-bezier(.4,0,.2,1); }
    .team-card:hover .team-card__bar { transform:scaleX(1); }

    /* image zoom (kept subtle so the photo is never cropped) */
    .team-card__img { transition: transform 0.5s cubic-bezier(.4,0,.2,1); }
    .team-card:hover .team-card__img { transform:scale(1.03); }

    /* image overlay fade */
    .team-card__overlay { transition: opacity 0.38s cubic-bezier(.4,0,.2,1); }
    .team-card:hover .team-card__overlay { opacity:1 !important; }

    /* name color flip */
    .team-card__name { transition: color 0.3s; }
    .team-card:hover .team-card__name { color:${t.orange} !important; }

    /* CV button on the card */
    .team-card__cv {
        margin-top: 12px;
        background: ${t.orange};
        color: ${t.white};
        border: none;
        border-radius: 4px;
        padding: 9px 18px;
        font-family: ${t.font};
        font-size: clamp(12px,1.4vw,14px);
        font-weight: 700;
        cursor: pointer;
        transition: background 0.25s, opacity 0.25s;
    }
    .team-card__cv:hover { background: ${t.orangeDark}; }
    .team-card__cv:disabled { opacity: 0.6; cursor: wait; }

    /* breadcrumb link */
    .bc-link { transition:color 0.25s; }
    .bc-link:hover { color:${t.orange} !important; }

    /* hero diagonal */
    .hero-cut::after { content:''; position:absolute; bottom:-2px; left:0; right:0; height:clamp(40px,8vw,110px); background:${t.white}; clip-path:polygon(0 100%,100% 0,100% 100%); }
    .chairman-cut::after { content:''; position:absolute; bottom:-2px; left:0; right:0; height:clamp(40px,8vw,110px); background:${t.blue}; clip-path:polygon(0 100%,100% 0,100% 100%); }
    .team-cut::after { content:''; position:absolute; bottom:-2px; left:0; right:0; height:clamp(40px,8vw,110px); background:${t.black}; clip-path:polygon(0 100%,100% 0,100% 100%); }

    /* ───────── Org tree (pyramid) ───────── */
    .org-tree { display:flex; flex-direction:column; align-items:center; }
    .org-top { display:flex; justify-content:center; flex-wrap:wrap; gap:24px; width:100%; }

    /* vertical line from the director down to the horizontal bar */
    .org-stem { width:2px; height:40px; background:${t.orangeLight}; }

    .org-level { display:flex; justify-content:center; width:100%; }

    .org-branch {
        position:relative;
        flex:0 1 360px;
        display:flex;
        justify-content:center;
        padding:40px clamp(10px,2.5vw,30px) 0;
    }
    /* horizontal bar */
    .org-branch::before {
        content:'';
        position:absolute;
        top:0;
        inset-inline-start:0;
        inset-inline-end:0;
        height:2px;
        background:${t.orangeLight};
    }
    /* vertical drop to the card */
    .org-branch::after {
        content:'';
        position:absolute;
        top:0; left:50%;
        width:2px; height:40px;
        transform:translateX(-50%);
        background:${t.orangeLight};
    }
    /* the bar stops at the center on the outer edges so it forms a clean "T" */
    .org-branch:first-child::before { inset-inline-start:50%; inset-inline-end:0; }
    .org-branch:last-child::before  { inset-inline-start:0; inset-inline-end:50%; }
    .org-branch:only-child::before  { display:none; }

    /* little dot where the stem meets the bar */
    .org-dot {
        width:12px; height:12px; border-radius:50%;
        background:${t.orange};
        box-shadow:0 0 0 4px rgba(245,124,0,0.25);
        margin-top:-1px;
    }

    @media (max-width:700px) {
        .org-level { flex-direction:column; align-items:center; }
        .org-branch { flex:0 0 auto; width:100%; max-width:340px; }
        .org-branch::before { display:none; }
        .org-branch:not(:first-child)::after { height:32px; }
        .org-branch { padding-top:32px; }
    }

    /* ───────── CV dialog ───────── */
    .cv-overlay {
        position:fixed; inset:0; z-index:1000;
        background:rgba(0,0,0,0.55);
        overflow-y:auto;
        display:flex; align-items:flex-start; justify-content:center;
        padding:90px 16px 40px;
    }
    .cv-modal {
        width:100%; max-width:760px; margin:auto 0;
        background:${t.white}; border-radius:16px; overflow:hidden;
        box-shadow:0 24px 64px rgba(0,0,0,0.35);
        font-family:${t.font};
    }
    .cv-head {
        position:relative; text-align:center; padding:28px 20px;
        background:linear-gradient(135deg, ${t.blueDark}, ${t.blue});
    }
    .cv-close {
        position:absolute; top:14px; left:14px;
        width:38px; height:38px; border:none; border-radius:50%;
        background:rgba(255,255,255,0.15); color:${t.white};
        font-size:20px; line-height:1; cursor:pointer;
    }
    .cv-close:hover { background:rgba(255,255,255,0.3); }
    .cv-photo {
        display:block; margin:0 auto 14px;
        width:96px; height:96px; border-radius:50%; object-fit:cover;
        border:4px solid ${t.white}; background:#e5e7eb;
    }
    .cv-name { margin:0 0 6px; font-size:clamp(18px,2.4vw,24px); font-weight:800; color:${t.white}; }
    .cv-role { margin:0; font-size:clamp(12px,1.5vw,15px); color:rgba(255,255,255,0.85); line-height:1.7; }
    .cv-body { padding:24px; max-height:calc(100vh - 280px); overflow-y:auto; }
    .cv-section { margin-bottom:22px; }
    .cv-section-title { margin:0 0 10px; font-size:18px; font-weight:800; color:${t.blue}; }
    .cv-box { border:1px solid ${t.gray300}; background:#fffbeb; border-radius:8px; padding:14px 16px; }
    .cv-sub { margin:0 0 8px; font-size:14px; font-weight:700; color:${t.blue}; overflow-wrap:anywhere; }
    .cv-item { display:flex; align-items:flex-start; gap:8px; margin-bottom:8px; }
    .cv-dot { flex-shrink:0; width:8px; height:8px; margin-top:9px; border-radius:50%; background:${t.orange}; }
    .cv-text { margin:0; min-width:0; font-size:14px; line-height:1.8; color:${t.gray700}; overflow-wrap:anywhere; }
    .cv-contact { margin:0; font-size:14px; color:${t.gray700}; overflow-wrap:anywhere; }
    .cv-contact b { color:${t.black}; }
    .cv-close-btn {
        width:100%; border:none; border-radius:8px; padding:12px;
        background:${t.orange}; color:${t.white};
        font-family:${t.font}; font-size:15px; font-weight:700; cursor:pointer;
    }
    .cv-close-btn:hover { background:${t.orangeDark}; }
`,$=({light:a=!1,children:r})=>e.jsx("span",{style:{display:"inline-block",background:a?"rgba(255,255,255,0.12)":t.orange,color:a?t.orangeLight:t.white,fontFamily:t.font,fontSize:"clamp(10px,1.2vw,13px)",fontWeight:700,padding:"5px 18px",borderRadius:"2px",marginBottom:"10px",letterSpacing:"0.05em"},children:r}),N=({light:a=!1,children:r})=>e.jsx("h2",{style:{fontSize:"clamp(20px,3vw,38px)",fontWeight:900,color:a?t.white:t.black,fontFamily:t.font,lineHeight:1.35,marginBottom:"10px"},children:r}),z=({light:a=!1})=>e.jsx("div",{style:{display:"flex",justifyContent:"center",marginTop:"10px",marginBottom:"clamp(28px,4.5vw,50px)"},children:e.jsx("div",{style:{width:"52px",height:"4px",background:a?t.orangeLight:t.orange,borderRadius:"2px"}})}),v=({member:a,large:r=!1,onOpenCv:n,loadingCv:s=!1})=>e.jsxs(B.div,{className:`team-card ${r?"team-card--large":""}`,initial:{opacity:0,y:28},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,ease:[.4,0,.2,1]},style:{width:"100%",maxWidth:r?"340px":"300px",background:t.white,borderRadius:"3px",overflow:"hidden",display:"flex",flexDirection:"column",fontFamily:t.font,position:"relative",border:r?`2px solid ${t.orange}`:`1.5px solid ${t.gray100}`,boxShadow:r?"0 10px 36px rgba(8,101,168,0.18)":"0 2px 12px rgba(0,0,0,0.07)"},children:[e.jsxs("div",{style:{position:"relative",width:"100%",paddingTop:"120%",overflow:"hidden",background:t.gray50},children:[e.jsx("img",{src:a.pic||m,alt:a.name,className:"team-card__img",onError:i=>{i.target.onerror=null,i.target.src=m},style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"contain",objectPosition:"center"}}),e.jsx("div",{className:"team-card__overlay",style:{position:"absolute",inset:0,opacity:0,pointerEvents:"none",background:"linear-gradient(to bottom, transparent 50%, rgba(4,68,120,0.55) 100%)"}})]}),e.jsx("div",{className:"team-card__bar"}),e.jsxs("div",{style:{padding:"clamp(14px,2.5vw,22px) clamp(12px,2vw,18px) clamp(16px,2.5vw,24px)",textAlign:"center",flex:1},children:[e.jsx("h3",{className:"team-card__name",style:{fontSize:r?"clamp(16px,2vw,20px)":"clamp(14px,1.8vw,18px)",fontWeight:700,color:t.blue,fontFamily:t.font,marginBottom:"6px"},children:a.name}),e.jsx("p",{style:{fontSize:"clamp(11px,1.4vw,14px)",color:t.gray500,fontFamily:t.font,lineHeight:1.65,minHeight:"38px",margin:0},children:a.role}),a.hasCv&&e.jsx("button",{type:"button",className:"team-card__cv",disabled:s,onClick:()=>n&&n(a.id),children:s?"جاري التحميل...":"السيرة الذاتية"})]})]}),R=a=>{const r=A(a);return r.length?r.map((n,s)=>e.jsxs("div",{style:{marginTop:s>0?18:0},children:[n.title&&e.jsx("p",{className:"cv-sub",children:n.title}),n.items.map((i,d)=>e.jsxs("div",{className:"cv-item",children:[e.jsx("span",{className:"cv-dot"}),e.jsx("p",{className:"cv-text",children:i})]},d))]},s)):null},W=({member:a,onClose:r})=>{l.useEffect(()=>{const i=x=>{x.key==="Escape"&&r()};document.addEventListener("keydown",i);const d=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.removeEventListener("keydown",i),document.body.style.overflow=d}},[r]);const n=R(a.details),s=!n&&!a.email;return e.jsx("div",{className:"cv-overlay",onClick:r,children:e.jsxs("div",{className:"cv-modal",onClick:i=>i.stopPropagation(),children:[e.jsxs("div",{className:"cv-head",children:[e.jsx("button",{type:"button",className:"cv-close",onClick:r,"aria-label":"إغلاق",children:"✕"}),e.jsx("img",{className:"cv-photo",src:a.pic||m,alt:a.name,onError:i=>{i.target.onerror=null,i.target.src=m}}),e.jsx("h2",{className:"cv-name",children:a.name}),a.role&&e.jsx("p",{className:"cv-role",children:a.role})]}),e.jsxs("div",{className:"cv-body",children:[n&&e.jsxs("div",{className:"cv-section",children:[e.jsx("h3",{className:"cv-section-title",children:"المؤهلات والخبرات"}),e.jsx("div",{className:"cv-box",children:n})]}),a.email&&e.jsxs("div",{className:"cv-section",children:[e.jsx("h3",{className:"cv-section-title",children:"وسائل الإتصال"}),e.jsx("div",{className:"cv-box",children:e.jsxs("p",{className:"cv-contact",children:[e.jsx("b",{children:"البريد الإلكتروني: "}),e.jsx("bdi",{children:a.email})]})})]}),s&&e.jsx("p",{className:"cv-text",style:{textAlign:"center",marginBottom:20},children:"لا توجد بيانات متاحة حالياً"}),e.jsx("button",{type:"button",className:"cv-close-btn",onClick:r,children:"إغلاق"})]})]})})},M=()=>{const[a,r]=l.useState([]),[n,s]=l.useState(!0),[i,d]=l.useState(null),[x,u]=l.useState(null),[_,y]=l.useState(null);l.useEffect(()=>{(async()=>{try{s(!0);const c=await fetch(k);if(!c.ok)throw new Error("فشل في تحميل بيانات فريق العمل");const p=await c.json();r(Array.isArray(p)?p.filter(E=>E.isActive!==!1):[]),d(null)}catch(c){d(c.message)}finally{s(!1)}})()},[]);const C=async o=>{try{y(o);const c=await fetch(`${k}/${o}`);if(!c.ok)throw new Error("failed");const p=await c.json();u({...p,details:F(p.details)})}catch{alert("حدث خطأ في تحميل السيرة الذاتية")}finally{y(null)}},L=l.useCallback(()=>u(null),[]),b=o=>({member:o,onOpenCv:C,loadingCv:_===o.id}),f=a.filter(o=>Number(o.level)===1),g=a.filter(o=>Number(o.level)===2),h=a.filter(o=>Number(o.level)===3),w=g.length>0||h.length>0,j={maxWidth:"min(1280px, 94vw)",margin:"0 auto"};return e.jsxs("div",{className:"team-root",children:[e.jsx("style",{children:T}),e.jsx("div",{style:{position:"fixed",top:70,zIndex:40,width:"100%",borderBottom:`1px solid ${t.gray300}`,backgroundColor:"#f5f5f5",padding:"8px 16px",fontFamily:t.font},children:e.jsx("div",{style:{textAlign:"center"},children:e.jsxs("span",{children:[e.jsx(S,{to:"/",className:"bc-link",style:{fontWeight:700,textDecoration:"none",color:t.blue,marginLeft:"12px"},children:"الصفحة الرئيسية"}),e.jsx("span",{style:{color:t.gray500,margin:"0 6px"},children:" - "}),e.jsx("span",{style:{color:t.gray700,marginRight:"12px"},children:"فريق العمل"})]})})}),e.jsxs("section",{className:"team-hero-grid hero-cut",style:{position:"relative",minHeight:"clamp(300px,44vw,520px)",background:t.blueDark,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",padding:"clamp(130px,16vw,180px) clamp(20px,6vw,80px) clamp(90px,12vw,140px)"},children:[e.jsx("div",{style:{position:"absolute",top:0,right:0,width:"clamp(6px,0.8vw,10px)",height:"100%",background:`linear-gradient(to bottom, ${t.orange}, ${t.orangeLight})`}}),e.jsxs("div",{style:{position:"relative",zIndex:2,textAlign:"center",maxWidth:"720px",width:"100%"},children:[e.jsx("span",{style:{display:"inline-block",background:t.orange,color:t.white,fontFamily:t.font,fontSize:"clamp(10px,1.3vw,14px)",fontWeight:700,padding:"6px 22px",borderRadius:"2px",marginBottom:"clamp(12px,2.5vw,24px)",letterSpacing:"0.05em"},children:"المعهد التكنولوجي لهندسة التشييد والإدارة"}),e.jsxs("h1",{style:{fontSize:"clamp(24px,4.5vw,58px)",fontWeight:900,color:t.white,fontFamily:t.font,lineHeight:1.3,marginBottom:"clamp(12px,2vw,20px)"},children:["فريق"," ",e.jsx("span",{style:{color:t.orangeLight},children:"العمل"})]}),e.jsx("p",{style:{fontSize:"clamp(12px,1.6vw,17px)",color:"rgba(255,255,255,0.65)",fontFamily:t.font,lineHeight:1.9},children:"لدينا فريق عمل على أعلى مستوى من الكفاءة والخبرة"})]})]}),n&&e.jsx("div",{style:{display:"flex",justifyContent:"center",padding:"80px 20px"},children:e.jsxs("div",{style:{textAlign:"center",fontFamily:t.font},children:[e.jsx("div",{style:{width:56,height:56,margin:"0 auto 16px",border:`4px solid ${t.gray100}`,borderBottomColor:t.blue,borderRadius:"50%",animation:"team-spin 1s linear infinite"}}),e.jsx("style",{children:"@keyframes team-spin { to { transform: rotate(360deg); } }"}),e.jsx("p",{style:{color:t.gray700},children:"جاري تحميل فريق العمل..."})]})}),!n&&i&&e.jsx("div",{style:{maxWidth:560,margin:"60px auto",padding:"0 20px",fontFamily:t.font},children:e.jsxs("div",{style:{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:24,textAlign:"center"},children:[e.jsx("p",{style:{color:"#b91c1c",fontWeight:700,marginBottom:6},children:"حدث خطأ"}),e.jsx("p",{style:{color:"#dc2626",margin:0},children:i})]})}),!n&&!i&&a.length===0&&e.jsx("div",{style:{textAlign:"center",padding:"60px 20px",fontFamily:t.font,color:t.gray500},children:"لا توجد بيانات متاحة حالياً"}),!n&&!i&&f.length>0&&e.jsx("section",{className:"chairman-cut",style:{position:"relative",background:t.white,padding:"clamp(56px,8vw,100px) clamp(16px,6vw,60px) clamp(100px,14vw,160px)"},children:e.jsxs("div",{style:j,children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:"clamp(32px,5vw,56px)"},children:[e.jsx($,{children:"القيادة العليا"}),e.jsx("br",{}),e.jsxs(N,{children:["رئيس ",e.jsx("span",{style:{color:t.orange},children:"مجلس الإدارة"})]}),e.jsx(z,{})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",flexWrap:"wrap",gap:24},children:f.map(o=>e.jsx(v,{...b(o),large:!0},o.id))})]})}),!n&&!i&&f.length>0&&w&&e.jsxs("div",{style:{position:"relative",zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",marginTop:"-28px",marginBottom:"-28px",pointerEvents:"none"},children:[e.jsx("div",{style:{width:"2px",height:"clamp(40px,6vw,70px)",background:`linear-gradient(to bottom, ${t.white}, ${t.orangeLight})`,opacity:.7}}),e.jsx("div",{style:{width:"12px",height:"12px",borderRadius:"50%",background:t.orange,boxShadow:"0 0 0 4px rgba(245,124,0,0.25)"}})]}),!n&&!i&&w&&e.jsx("section",{className:"team-cut",style:{position:"relative",background:t.blue,padding:"clamp(80px,12vw,150px) clamp(16px,6vw,60px) clamp(100px,14vw,160px)"},children:e.jsxs("div",{style:j,children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:"clamp(32px,5vw,56px)"},children:[e.jsx($,{light:!0,children:"الإدارة التنفيذية"}),e.jsx("br",{}),e.jsxs(N,{light:!0,children:["القيادات"," ",e.jsx("span",{style:{color:t.orangeLight},children:"التنفيذية"})]}),e.jsx(z,{light:!0})]}),e.jsxs("div",{className:"org-tree",children:[g.length>0&&e.jsx("div",{className:"org-top",children:g.map(o=>e.jsx(v,{...b(o),large:!0},o.id))}),g.length>0&&h.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"org-stem"}),e.jsx("div",{className:"org-dot"})]}),h.length>0&&e.jsx("div",{className:"org-level",children:h.map(o=>e.jsx("div",{className:"org-branch",children:e.jsx(v,{...b(o)})},o.id))})]})]})}),e.jsx("div",{style:{background:t.black,padding:"clamp(50px,8vw,100px) clamp(16px,6vw,60px)",textAlign:"center"},children:e.jsxs("p",{style:{color:"rgba(255,255,255,0.3)",fontFamily:t.font,fontSize:"clamp(11px,1.3vw,14px)"},children:["المعهد التكنولوجي لهندسة التشييد والإدارة © ",new Date().getFullYear()]})}),x&&e.jsx(W,{member:x,onClose:L})]})};export{M as default};
