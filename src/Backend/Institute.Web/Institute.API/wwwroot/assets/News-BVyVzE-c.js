import{r as o,j as t}from"./vendor-core-AwIg9RWo.js";import{m as N}from"./vendor-framer-DfgDkh6P.js";const e={orange:"#f57c00",orangeLight:"#ff9a3c",blue:"#0865a8",blueDark:"#044478",black:"#0a0a0a",white:"#ffffff",gray100:"#f0f1f2",gray300:"#d0d3d8",gray500:"#6b7280",gray700:"#374151",font:'"Noto Kufi Arabic", serif'},_=`

    .nw-root { direction: rtl; font-family: ${e.font}; background: ${e.white}; overflow-x: hidden; }

    .nw-hero-grid::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image:
            linear-gradient(rgba(245,124,0,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,124,0,0.07) 1px, transparent 1px);
        background-size: 56px 56px;
        pointer-events: none;
        z-index: 1;
    }

    .nw-hero-cut::after  { content:''; position:absolute; bottom:-2px; left:0; right:0; height:clamp(40px,8vw,110px); background:${e.white}; clip-path:polygon(0 100%,100% 0,100% 100%); z-index:3; }
    .nw-black-cut::after { content:''; position:absolute; bottom:-2px; left:0; right:0; height:clamp(40px,8vw,110px); background:${e.black}; clip-path:polygon(0 100%,100% 0,100% 100%); z-index:3; }

    .nw-bc-link { transition: color 0.25s; }
    .nw-bc-link:hover { color: ${e.orange} !important; }

    .nw-year-pill {
        padding: clamp(7px,1.2vw,11px) clamp(16px,2.5vw,26px);
        border-radius: 2px;
        border: 2px solid rgba(255,255,255,0.2);
        background: transparent;
        color: rgba(255,255,255,0.6);
        font-family: ${e.font};
        font-size: clamp(12px,1.5vw,16px);
        font-weight: 700;
        cursor: pointer;
        transition: background 0.28s, border-color 0.28s, color 0.28s, transform 0.28s;
        white-space: nowrap;
    }
    .nw-year-pill:hover { border-color: ${e.orangeLight}; color: ${e.orangeLight}; transform: translateY(-2px); }
    .nw-year-pill--active { background: ${e.orange}; border-color: ${e.orange}; color: ${e.white} !important; box-shadow: 0 4px 16px rgba(245,124,0,0.4); }

    .nw-arrow {
        background: rgba(255,255,255,0.1);
        border: 2px solid rgba(255,255,255,0.2);
        color: ${e.white};
        border-radius: 2px;
        width: clamp(32px,4vw,44px);
        height: clamp(32px,4vw,44px);
        display: flex; align-items: center; justify-content: center;
        font-size: clamp(18px,2.5vw,26px);
        cursor: pointer;
        flex-shrink: 0;
        transition: background 0.28s, border-color 0.28s, transform 0.28s;
        user-select: none;
    }
    .nw-arrow:hover { background: ${e.orange}; border-color: ${e.orange}; transform: scale(1.1); }

    .nw-card {
        position: relative;
        background: ${e.white};
        border-radius: 3px;
        overflow: hidden;
        border: 1.5px solid ${e.gray100};
        box-shadow: 0 2px 12px rgba(0,0,0,0.07);
        display: flex;
        flex-direction: column;
        cursor: pointer;
        transition: transform 0.38s cubic-bezier(.4,0,.2,1), box-shadow 0.38s, border-color 0.38s;
    }
    .nw-card::before {
        content:''; position:absolute; top:0; right:0; width:4px; height:100%;
        background:${e.orange}; transform:scaleY(0); transform-origin:bottom;
        transition:transform 0.38s cubic-bezier(.4,0,.2,1); z-index:2;
    }
    .nw-card:hover { transform: translateY(-8px); box-shadow: 0 18px 48px rgba(0,0,0,0.18); border-color: ${e.orange}; }
    .nw-card:hover::before { transform: scaleY(1); }
    .nw-card:hover .nw-card__img { transform: scale(1.06); }
    .nw-card:hover .nw-card__bar { transform: scaleX(1); }
    .nw-card:hover .nw-card__title { color: ${e.orange}; }

    .nw-card__img { width:100%; height:100%; object-fit:cover; display:block; transition: transform 0.5s cubic-bezier(.4,0,.2,1); }
    .nw-card__bar { height:4px; background:linear-gradient(to left,${e.orange},${e.blue}); transform:scaleX(0); transform-origin:right; transition:transform 0.38s cubic-bezier(.4,0,.2,1); }
    .nw-card__title { transition: color 0.3s; }

    .nw-grid { display:grid; gap:clamp(16px,3vw,28px); grid-template-columns:1fr; }
    @media(min-width:480px){ .nw-grid { grid-template-columns:repeat(2,1fr); } }
    @media(min-width:900px){ .nw-grid { grid-template-columns:repeat(3,1fr); } }
    @media(min-width:1300px){ .nw-grid { grid-template-columns:repeat(4,1fr); } }

    .nw-page-btn {
        min-width: clamp(32px,4vw,42px);
        height: clamp(32px,4vw,42px);
        padding: 0 clamp(8px,1.2vw,14px);
        border-radius: 2px;
        border: 1.5px solid rgba(255,255,255,0.2);
        background: transparent;
        color: rgba(255,255,255,0.6);
        font-family: ${e.font};
        font-size: clamp(12px,1.5vw,15px);
        font-weight: 700;
        cursor: pointer;
        transition: background 0.28s, border-color 0.28s, color 0.28s, transform 0.2s;
        display: flex; align-items: center; justify-content: center;
    }
    .nw-page-btn:hover:not(:disabled) { background: ${e.orange}; border-color: ${e.orange}; color: ${e.white}; transform: translateY(-2px); }
    .nw-page-btn--active { background: ${e.orange} !important; border-color: ${e.orange} !important; color: ${e.white} !important; box-shadow: 0 4px 14px rgba(245,124,0,0.4); }
    .nw-page-btn:disabled { opacity: 0.3; cursor: not-allowed; }

    @keyframes nw-spin { 0%{ transform:rotate(0deg); } 100%{ transform:rotate(360deg); } }
    .nw-spinner {
        width: 52px; height: 52px;
        border: 4px solid rgba(255,255,255,0.1);
        border-top: 4px solid ${e.orange};
        border-radius: 50%;
        animation: nw-spin 1s linear infinite;
    }

    .nw-scroller { display:flex; gap:clamp(8px,1.5vw,14px); overflow-x:auto; padding: 4px 0; scroll-behavior:smooth; }
    .nw-scroller::-webkit-scrollbar { display:none; }
    .nw-scroller { -ms-overflow-style:none; scrollbar-width:none; }
`;function A(){if(document.getElementById("nw-styles"))return;const r=document.createElement("style");r.id="nw-styles",r.textContent=_,document.head.appendChild(r)}const C=({light:r=!1,children:s})=>t.jsx("span",{style:{display:"inline-block",background:r?"rgba(255,255,255,0.12)":e.orange,color:r?e.orangeLight:e.white,fontFamily:e.font,fontSize:"clamp(10px,1.2vw,13px)",fontWeight:700,padding:"5px 18px",borderRadius:"2px",marginBottom:"10px",letterSpacing:"0.05em"},children:s}),E=({light:r=!1,children:s})=>t.jsx("h2",{style:{fontSize:"clamp(20px,3vw,36px)",fontWeight:900,color:r?e.white:e.black,fontFamily:e.font,lineHeight:1.35,marginBottom:"10px"},children:s}),F=({light:r=!1})=>t.jsx("div",{style:{display:"flex",justifyContent:"center",marginTop:"10px",marginBottom:"clamp(28px,4.5vw,50px)"},children:t.jsx("div",{style:{width:"52px",height:"4px",background:r?e.orangeLight:e.orange,borderRadius:"2px"}})}),I=({item:r,index:s})=>{const i=r.imageUrl||Array.isArray(r.imageUrls)&&r.imageUrls[0]||null;return t.jsxs(N.a,{href:`/news/${r.id}`,className:"nw-card",initial:{opacity:0,y:28},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:s*.06,ease:[.4,0,.2,1]},style:{textDecoration:"none"},children:[t.jsxs("div",{style:{position:"relative",width:"100%",paddingTop:"65%",overflow:"hidden",background:e.gray100},children:[i&&t.jsx("img",{src:i,alt:r.title,className:"nw-card__img",style:{position:"absolute",inset:0}}),t.jsx("span",{style:{position:"absolute",top:"10px",right:"10px",zIndex:2,background:e.orange,color:e.white,fontFamily:e.font,fontSize:"clamp(9px,1.1vw,12px)",fontWeight:700,padding:"4px 12px",borderRadius:"2px"},children:new Date(r.publishedAt).toLocaleDateString("ar-EG",{day:"2-digit",month:"long",year:"numeric"})})]}),t.jsx("div",{className:"nw-card__bar"}),t.jsx("div",{style:{padding:"clamp(12px,2vw,18px) clamp(12px,2vw,18px) clamp(14px,2.5vw,22px)",flex:1,display:"flex",flexDirection:"column"},children:t.jsx("h3",{className:"nw-card__title",style:{fontSize:"clamp(13px,1.5vw,16px)",fontWeight:700,color:e.blue,fontFamily:e.font,lineHeight:1.65,margin:0,flex:1},children:r.title})})]})},W=()=>{const[r,s]=o.useState([]),[i,p]=o.useState(!0),[d,w]=o.useState(null),[f,b]=o.useState(null),[l,x]=o.useState(null),[c,u]=o.useState(1),[g,j]=o.useState(0),m=o.useRef(null),k={maxWidth:"min(1280px,94vw)",margin:"0 auto"},y="https://icemt.arabcont.com/api/News";o.useEffect(()=>{A()},[]),o.useEffect(()=>{fetch(`${y}/years`).then(n=>{if(!n.ok)throw new Error;return n.json()}).then(n=>{const a=Array.isArray(n)?n.map(String).sort((S,z)=>Number(z)-Number(S)):[];b(a),x(a[0]??null)}).catch(()=>{b([]),x(null)})},[]),o.useEffect(()=>{u(1)},[l]),o.useEffect(()=>{l&&(p(!0),w(null),fetch(`${y}/getAllNews?year=${l}&pageIndex=${c}`).then(n=>{if(!n.ok)throw new Error("Failed to fetch");return n.json()}).then(n=>{s(n.data??[]),j(n.totalPages??0),p(!1)}).catch(n=>{w(n.message),p(!1)}))},[l,c]);const v=n=>{m.current&&m.current.scrollBy({left:n==="left"?-200:200,behavior:"smooth"})},h=n=>{u(n),window.scrollTo({top:300,behavior:"smooth"})},$=f!==null&&l!==null;return t.jsxs("div",{className:"nw-root",children:[t.jsx("div",{style:{position:"fixed",top:70,left:0,zIndex:50,width:"100%",borderBottom:`1px solid ${e.gray300}`,backgroundColor:"#f5f5f5",padding:"8px 20px"},children:t.jsxs("div",{style:{textAlign:"center",fontFamily:e.font,fontSize:"1rem"},children:[t.jsx("a",{href:"/",className:"nw-bc-link",style:{color:e.gray700,fontWeight:700,textDecoration:"none",marginLeft:"8px"},children:"الصفحة الرئيسية"}),t.jsx("span",{style:{color:e.gray500,margin:"0 6px"},children:"-"}),t.jsx("span",{style:{color:e.gray700,fontWeight:700},children:"الأخبار"})]})}),t.jsxs("section",{className:"nw-hero-grid nw-hero-cut",style:{position:"relative",minHeight:"clamp(300px,44vw,520px)",background:e.blueDark,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",overflow:"hidden",padding:"clamp(130px,16vw,180px) clamp(20px,6vw,80px) clamp(90px,12vw,140px)"},children:[t.jsx("div",{style:{position:"absolute",top:0,right:0,width:"clamp(6px,0.8vw,10px)",height:"100%",background:`linear-gradient(to bottom, ${e.orange}, ${e.orangeLight})`,zIndex:4}}),t.jsxs("div",{style:{position:"relative",zIndex:2,textAlign:"center",maxWidth:"720px",width:"100%",marginBottom:"clamp(32px,5vw,56px)"},children:[t.jsx("span",{style:{display:"inline-block",background:e.orange,color:e.white,fontFamily:e.font,fontSize:"clamp(10px,1.3vw,14px)",fontWeight:700,padding:"6px 22px",borderRadius:"2px",marginBottom:"clamp(12px,2.5vw,24px)",letterSpacing:"0.05em"},children:"المعهد التكنولوجي لهندسة التشييد والإدارة"}),t.jsxs("h1",{style:{fontSize:"clamp(24px,4.5vw,58px)",fontWeight:900,color:e.white,fontFamily:e.font,lineHeight:1.3,marginBottom:"clamp(12px,2vw,20px)"},children:["آخر"," ",t.jsx("span",{style:{color:e.orangeLight},children:"الأخبار"})]}),t.jsx("p",{style:{fontSize:"clamp(12px,1.6vw,17px)",color:"rgba(255,255,255,0.65)",fontFamily:e.font,lineHeight:1.9},children:"تابع أحدث أخبار وفعاليات المعهد"})]}),t.jsxs("div",{style:{position:"relative",zIndex:2,width:"100%",maxWidth:"min(900px,90vw)",display:"flex",alignItems:"center",gap:"clamp(8px,1.5vw,14px)"},children:[t.jsx("button",{className:"nw-arrow",onClick:()=>v("right"),children:"«"}),t.jsx("div",{ref:m,className:"nw-scroller",style:{flex:1},children:$?f.map(n=>t.jsx("button",{className:`nw-year-pill${l===n?" nw-year-pill--active":""}`,onClick:()=>x(n),children:n},n)):Array.from({length:6}).map((n,a)=>t.jsx("div",{style:{width:"clamp(52px,7vw,72px)",height:"clamp(30px,4vw,42px)",borderRadius:"2px",background:"rgba(255,255,255,0.08)",flexShrink:0}},a))}),t.jsx("button",{className:"nw-arrow",onClick:()=>v("left"),children:"»"})]})]}),t.jsx("section",{className:"nw-black-cut",style:{position:"relative",background:e.white,padding:"clamp(56px,8vw,100px) clamp(16px,6vw,60px) clamp(100px,15vw,170px)"},children:t.jsxs("div",{style:k,children:[t.jsxs("div",{style:{textAlign:"center",marginBottom:"clamp(32px,5vw,52px)"},children:[t.jsxs(C,{children:["أخبار ",l]}),t.jsx("br",{}),t.jsxs(E,{children:["أبرز ",t.jsx("span",{style:{color:e.orange},children:"الأخبار"})]}),t.jsx(F,{})]}),i&&t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"260px",gap:"20px"},children:[t.jsx("div",{className:"nw-spinner"}),t.jsx("p",{style:{color:e.blue,fontFamily:e.font,fontSize:"clamp(13px,1.6vw,16px)"},children:"جارٍ تحميل الأخبار..."})]}),!i&&d&&t.jsx("div",{style:{textAlign:"center",padding:"60px 20px",color:e.orange,fontFamily:e.font,fontSize:"clamp(13px,1.6vw,16px)"},children:"حدث خطأ في تحميل الأخبار"}),!i&&!d&&r.length===0&&t.jsxs("div",{style:{textAlign:"center",padding:"60px 20px",color:e.gray500,fontFamily:e.font,fontSize:"clamp(13px,1.6vw,16px)"},children:["لا توجد أخبار لعام ",l]}),!i&&!d&&r.length>0&&t.jsx("div",{className:"nw-grid",children:r.map((n,a)=>t.jsx(I,{item:n,index:a},n.id))})]})}),!i&&g>1&&t.jsx("section",{style:{background:e.black,padding:"clamp(40px,6vw,70px) clamp(16px,6vw,60px)"},children:t.jsxs("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:"clamp(6px,1vw,10px)",flexWrap:"wrap"},children:[t.jsx("button",{className:"nw-page-btn",disabled:c===1,onClick:()=>h(c-1),children:"‹"}),[...Array(g)].map((n,a)=>t.jsx("button",{className:`nw-page-btn${c===a+1?" nw-page-btn--active":""}`,onClick:()=>h(a+1),children:a+1},a)),t.jsx("button",{className:"nw-page-btn",disabled:c===g,onClick:()=>h(c+1),children:"›"})]})}),t.jsx("div",{style:{background:e.black,borderTop:"1px solid rgba(255,255,255,0.06)",padding:"clamp(36px,5vw,60px) clamp(16px,6vw,60px)",textAlign:"center"},children:t.jsxs("p",{style:{color:"rgba(255,255,255,0.3)",fontFamily:e.font,fontSize:"clamp(11px,1.3vw,14px)"},children:["المعهد التكنولوجي لهندسة التشييد والإدارة © ",new Date().getFullYear()]})})]})};export{W as default};
