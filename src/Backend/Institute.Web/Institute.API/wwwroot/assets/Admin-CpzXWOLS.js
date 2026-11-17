const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor-export-DY9zrLY-.js","assets/vendor-core-AwIg9RWo.js"])))=>i.map(i=>d[i]);
import{r as n,j as e,i as $t,aP as or}from"./vendor-core-AwIg9RWo.js";import{u as Oe,a as cr}from"./vendor-clerk-DpoBFpOG.js";import{A as fe,T as a,N as dr,O as pr,a as mr,R as qe,I as xe,b as fr}from"./constants-CEdaY71d.js";import{_ as ot}from"./vendor-export-DY9zrLY-.js";import{R as xt,L as xr,C as Ft,X as Pt,Y as Rt,T as ht,a as hr,P as gr,b as br,c as gt,B as ba,d as ua}from"./vendor-charts-Cassb1Z9.js";import ur,{RichTextEditor as yr}from"./mohadren-BLTdWy6R.js";import wr from"./NewsTab-BEIFarFN.js";import vr from"./BooksTab-B2z-KqEk.js";import jr from"./PlanworkTab--Ibs-GRj.js";import{d as kr,i as Nr,e as Cr}from"./richText-CXuIcG0w.js";const Je=`${fe}/admin/AdminCustomer`,$r=["image/jpeg","image/png","image/webp"],Sr=5*1024*1024;function zr(t){return{id:t.id,name:t.name||"",displayOrder:t.displayOrder??0,isActive:t.isActive??!0,logo:t.logo||null}}function Ar(t){return{name:t.name.trim(),displayOrder:Number(t.displayOrder)||0,isActive:!!t.isActive}}const bt={id:0,name:"",displayOrder:0,isActive:!0,logo:null};function Tr(t=""){return t.trim().split(/\s+/).slice(0,2).map(r=>r[0]).join("").toUpperCase()||"؟"}const Ve=t=>t.status===401||t.status===403?"غير مصرح لك بهذا الإجراء (سجّل الدخول مرة أخرى)":`HTTP ${t.status}`,Er=()=>{const{getToken:t}=Oe(),r=n.useCallback(async(f,W={})=>{const q=await t(),Q={...W.headers||{}};return q&&(Q.Authorization=`Bearer ${q}`),fetch(f,{...W,headers:Q})},[t]),[s,l]=n.useState([]),[i,o]=n.useState(null),[p,c]=n.useState({...bt}),[j,w]=n.useState(!1),[b,h]=n.useState(""),[d,v]=n.useState(null),[I,P]=n.useState(!1),[_,U]=n.useState(!1),[R,y]=n.useState(!1),[z,O]=n.useState(!0),V=n.useRef(),F=n.useRef(null),E=n.useRef(!1),u=(f,W="success")=>{v({msg:f,type:W}),setTimeout(()=>v(null),3500)};n.useEffect(()=>{M()},[]);const M=async(f=null)=>{O(!0);try{const W=await r(Je);if(!W.ok)throw new Error(Ve(W));const q=(await W.json()).map(zr);l(q);const Q=q.find(ve=>ve.id===f)||q[0];Q?(o(Q),c({...Q}),w(!1)):(o(null),c({...bt}),w(!0))}catch(W){u(`فشل تحميل البيانات: ${W.message}`,"error")}finally{O(!1)}},G=s.filter(f=>f.name.toLowerCase().includes(b.toLowerCase())),B=()=>{F.current=null,E.current=!1},k=f=>{o(f),c({...f}),w(!1),U(!1),B()},Y=f=>{const{name:W,value:q,type:Q,checked:ve}=f.target;c(x=>({...x,[W]:Q==="checkbox"?ve:q}))},ie=n.useCallback(f=>{if(!f)return;if(!$r.includes(f.type)){u("الأنواع المسموحة: JPG · PNG · WEBP","error");return}if(f.size>Sr){u("الحد الأقصى لحجم الصورة 5 ميجا","error");return}F.current=f,E.current=!1;const W=new FileReader;W.onload=q=>c(Q=>({...Q,logo:q.target.result})),W.readAsDataURL(f)},[]),C=f=>{f.stopPropagation(),!F.current&&(i!=null&&i.logo)&&(E.current=!0),F.current=null,V.current&&(V.current.value=""),c(W=>({...W,logo:null}))},A=async(f,W)=>{const q=new FormData;q.append("file",W);const Q=await r(`${Je}/${f}/logo`,{method:"POST",body:q});if(!Q.ok)throw new Error(`فشل رفع الصورة: ${Ve(Q)}`)},Z=async f=>{const W=await r(`${Je}/${f}/logo`,{method:"DELETE"});if(!W.ok)throw new Error(`فشل حذف الصورة: ${Ve(W)}`)},m=async()=>{if(!p.name.trim()){u("اسم العميل مطلوب","error");return}y(!0);try{const f=JSON.stringify(Ar(p)),W={"Content-Type":"application/json"};let q=p.id;if(j){const Q=await r(Je,{method:"POST",headers:W,body:f});if(!Q.ok)throw new Error(Ve(Q));q=(await Q.json()).id}else{const Q=await r(`${Je}/${p.id}`,{method:"PUT",headers:W,body:f});if(!Q.ok)throw new Error(Ve(Q))}F.current?await A(q,F.current):E.current&&await Z(q),B(),await M(q),u(j?"تم إضافة العميل بنجاح":"تم حفظ التغييرات بنجاح")}catch(f){u(`حدث خطأ: ${f.message}`,"error")}finally{y(!1)}},T=()=>{c({...bt}),o(null),w(!0),U(!1),B()},L=async()=>{if(!_){U(!0);return}y(!0);try{const f=await r(`${Je}/${i.id}`,{method:"DELETE"});if(!f.ok)throw new Error(Ve(f));U(!1),await M(),u("تم حذف العميل","error")}catch(f){u(`فشل الحذف: ${f.message}`,"error")}finally{y(!1)}},ae=()=>{c(j?{...bt}:{...i}),U(!1),B(),u("تم إلغاء التغييرات","info")};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:0},children:[d&&e.jsxs("div",{className:`lec-notif lec-notif-${d.type}`,style:{marginBottom:12},children:[e.jsx("span",{children:d.type==="success"?"✅":d.type==="error"?"❌":"ℹ️"}),d.msg]}),R&&e.jsxs("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.25)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,fontSize:"1.4rem",color:"#fff",gap:10},children:[e.jsx("span",{style:{animation:"spin 1s linear infinite",display:"inline-block"},children:"⏳"}),"جاري الحفظ..."]}),e.jsxs("div",{className:"lec-layout",children:[e.jsxs("div",{className:"lec-panel",style:{height:"calc(100vh - 120px)",overflowY:"auto",position:"sticky",top:0},children:[e.jsxs("div",{className:"lec-panel-hdr",children:[e.jsx("span",{className:"lec-count-badge",children:G.length}),e.jsx("span",{style:{fontWeight:800,fontSize:".8rem",color:"#0a0a0a",flex:1,textAlign:"center"},children:"العملاء"}),e.jsx("button",{className:"lec-new-btn",onClick:T,children:"+ جديد"})]}),e.jsx("div",{style:{padding:"10px 10px 6px",position:"relative"},children:e.jsxs("div",{className:"adm-search",style:{minWidth:"unset"},children:[e.jsx("input",{type:"text",placeholder:"بحث باسم العميل...",value:b,onChange:f=>h(f.target.value),style:{fontSize:".76rem"}}),b&&e.jsx("button",{className:"lec-search-clear",onClick:()=>h(""),children:"✕"})]})}),e.jsx("div",{className:"lec-list",children:z?e.jsxs("div",{className:"adm-empty",style:{padding:"32px 12px"},children:[e.jsx("div",{className:"adm-emi",children:"⏳"}),e.jsx("p",{children:"جاري التحميل..."})]}):G.length===0?e.jsxs("div",{className:"adm-empty",style:{padding:"32px 12px"},children:[e.jsx("div",{className:"adm-emi",children:"🔍"}),e.jsx("p",{children:"لا توجد نتائج"})]}):G.map(f=>e.jsxs("div",{className:`lec-row${(i==null?void 0:i.id)===f.id?" active":""}`,onClick:()=>k(f),style:f.isActive?void 0:{opacity:.5},children:[e.jsx("div",{className:"lec-avatar",children:f.logo?e.jsx("img",{src:f.logo,alt:"",style:{objectFit:"contain"}}):e.jsx("span",{children:Tr(f.name)})}),e.jsxs("div",{className:"lec-row-info",children:[e.jsx("div",{className:"lec-row-name",children:f.name||"بدون اسم"}),e.jsxs("div",{className:"lec-row-spec",children:["ترتيب: ",f.displayOrder,f.isActive?"":" • مخفي"]})]}),e.jsxs("div",{className:"lec-row-id",children:["#",f.id]})]},f.id))})]}),e.jsx("div",{className:"lec-form-wrap",style:{height:"calc(100vh - 120px)",overflowY:"auto"},children:e.jsxs("div",{className:"adm-card lec-form-card",children:[e.jsxs("div",{className:"lec-form-hdr",children:[e.jsxs("div",{children:[e.jsx("div",{className:"adm-hero-tag",style:{marginBottom:6,position:"relative",zIndex:1},children:j?"عميل جديد":`ID: #${i==null?void 0:i.id}`}),e.jsx("h2",{className:"lec-form-title",children:j?"➕ إضافة عميل جديد":"✏️ تعديل بيانات العميل"}),!j&&i&&e.jsx("p",{className:"lec-form-sub",children:i.name})]}),e.jsxs("div",{className:"lec-stat-pill",children:["🏢 ",s.length," عميل"]})]}),e.jsxs("div",{className:"lec-form-body",children:[e.jsxs("div",{className:"lec-top-row",children:[e.jsxs("div",{className:"lec-photo-col",children:[e.jsx("label",{className:"lec-label",children:"الشعار (اللوجو)"}),e.jsx("div",{className:`lec-photo-zone${I?" over":""}`,onDragOver:f=>{f.preventDefault(),P(!0)},onDragLeave:()=>P(!1),onDrop:f=>{f.preventDefault(),P(!1),ie(f.dataTransfer.files[0])},onClick:()=>V.current.click(),children:p.logo?e.jsxs(e.Fragment,{children:[e.jsx("img",{src:p.logo,alt:"شعار العميل",className:"lec-photo-img",style:{objectFit:"contain",background:"#fff"}}),e.jsxs("div",{className:"lec-photo-overlay",children:[e.jsx("span",{style:{fontSize:"1.6rem"},children:"📷"}),e.jsx("span",{className:"lec-photo-overlay-txt",children:"تغيير الشعار"})]})]}):e.jsxs("div",{className:"lec-photo-placeholder",children:[e.jsx("div",{className:"lec-photo-icon",children:"🏢"}),e.jsxs("span",{className:"lec-photo-hint",children:["اسحب الشعار هنا",e.jsx("br",{}),"أو اضغط للاختيار"]}),e.jsx("span",{className:"lec-photo-types",children:"JPG · PNG · WEBP"})]})}),e.jsx("input",{ref:V,type:"file",accept:"image/jpeg,image/png,image/webp",style:{display:"none"},onChange:f=>ie(f.target.files[0])}),p.logo&&e.jsx("button",{className:"lec-remove-photo",onClick:C,children:"✕ حذف الصورة"})]}),e.jsxs("div",{className:"lec-fields-grid",children:[e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"الرقم"}),e.jsx("input",{className:"lec-inp",value:j?"تلقائي":p.id,disabled:!0,style:{background:a.gray100,color:a.gray500,cursor:"not-allowed"}})]}),e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"ترتيب العرض (الأصغر أولاً)"}),e.jsx("input",{className:"lec-inp",type:"number",name:"displayOrder",value:p.displayOrder,onChange:Y})]}),e.jsxs("div",{className:"lec-field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{className:"lec-label",children:"اسم العميل *"}),e.jsx("input",{className:"lec-inp",name:"name",value:p.name,onChange:Y,placeholder:"مثال: جامعة القاهرة"})]}),e.jsx("div",{className:"lec-field",style:{gridColumn:"1/-1"},children:e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",name:"isActive",checked:p.isActive,onChange:Y}),e.jsx("span",{className:"lec-label",style:{margin:0},children:"ظاهر في صفحة عملائنا"})]})})]})]}),e.jsxs("div",{className:"lec-actions",children:[e.jsx("button",{className:"lec-act-btn save",onClick:m,disabled:R,children:R?"⏳ جاري الحفظ...":"💾 حفظ"}),e.jsx("button",{className:"lec-act-btn new",onClick:T,disabled:R,children:"➕ عميل جديد"}),e.jsx("button",{className:"lec-act-btn reset",onClick:ae,disabled:R,children:"↩ إلغاء"}),e.jsx("div",{style:{flex:1}}),!j&&(_?e.jsxs("div",{className:"lec-delete-confirm",children:[e.jsx("span",{className:"lec-delete-warn",children:"⚠️ هل أنت متأكد من الحذف؟"}),e.jsx("button",{className:"lec-act-btn delete",onClick:L,disabled:R,children:"تأكيد الحذف"}),e.jsx("button",{className:"adm-fclear",onClick:()=>U(!1),children:"إلغاء"})]}):e.jsx("button",{className:"lec-act-btn delete",onClick:L,disabled:R,children:"🗑 حذف العميل"}))]})]})]})})]})]})},Ir=`

    .adm-root {
    direction: rtl;
    font-family: ${a.font};
    background: ${a.white};
    overflow-x: hidden;
    margin-top: 20px;
    display: flex;
    align-items: stretch;
    /* make root itself at least full viewport */
    min-height: calc(100vh - 20px);
}

    /* ── Keyframes ── */
    @keyframes adm-spin    { to { transform: rotate(360deg) } }
    @keyframes adm-fadeUp  { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
    @keyframes adm-slideIn { from { opacity:0; transform:translateX(8px)  } to { opacity:1; transform:translateX(0) } }
    @keyframes adm-pulse   { 0%,100%{ opacity:1 } 50%{ opacity:.45 } }
    @keyframes adm-slideDown { from { opacity:0; transform:translateY(-14px) } to { opacity:1; transform:translateY(0) } }
    @keyframes adm-barGrow { from { transform:scaleY(0) } to { transform:scaleY(1) } }

    /* ── Sidebar ── */
    .adm-sidebar {
    width: 240px; flex-shrink: 0;
    background: ${a.blueDark};
    display: flex; flex-direction: column;
    position: sticky; top: 0;
    min-height: 100vh;
    height: auto;
    overflow: hidden; z-index: 200;
    box-shadow: -4px 0 24px rgba(4,68,120,0.35);
    border-left: 3px solid ${a.orange};
    align-self: stretch;
}
    .adm-sidebar::before {
        content: ''; position: absolute; inset: 0;
        background-image:
            linear-gradient(rgba(245,124,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,124,0,0.05) 1px, transparent 1px);
        background-size: 40px 40px; pointer-events: none; z-index: 0;
    }
    .adm-sidebar-brand {
        position: relative; z-index: 1;
        padding: 18px 16px 14px; border-bottom: 3px solid ${a.orange};
        display: flex; align-items: center; gap: 10px;
        background: rgba(0,0,0,0.25); flex-shrink: 0;
    }
    .adm-sb-logo  { width: 36px; height: 36px; object-fit: contain; flex-shrink:0; }
    .adm-sb-name  { font-size: .86rem; font-weight: 900; color: ${a.white}; white-space:nowrap; }
    .adm-sb-sub   { font-size: .6rem; color: rgba(255,255,255,.45); margin-top:2px; }
    .adm-sidebar-user {
        position: relative; z-index: 1;
        padding: 12px 16px; border-bottom: 1.5px solid rgba(245,124,0,0.2);
        display: flex; align-items: center; gap: 10px;
        background: rgba(0,0,0,0.15); flex-shrink: 0;
    }
    .adm-su-av   { width: 36px; height: 36px; border-radius: 4px; background: ${a.orange}; display: flex; align-items: center; justify-content: center; font-size: .7rem; font-weight: 900; color: ${a.white}; flex-shrink:0; }
    .adm-su-name { font-size: .75rem; font-weight: 700; color: ${a.white}; }
    .adm-su-role { display: inline-flex; align-items: center; gap: 3px; margin-top: 2px; padding: 1px 7px; background: rgba(245,124,0,0.2); border: 1px solid rgba(245,124,0,0.4); border-radius: 2px; font-size: .58rem; color: ${a.orangeLight}; font-weight: 700; }
    .adm-sidebar-nav { flex:1; padding: 12px 8px; overflow-y:auto; overflow-x:hidden; position:relative; z-index:1; }
    .adm-sidebar-nav::-webkit-scrollbar { width:3px; }
    .adm-sidebar-nav::-webkit-scrollbar-thumb { background: rgba(245,124,0,0.4); border-radius:2px; }
    .adm-nav-label { font-size:.56rem; font-weight:700; color:rgba(255,255,255,0.3); letter-spacing:1.5px; text-transform:uppercase; padding: 0 8px; margin-bottom:6px; margin-top:4px; }
    .adm-nav-btn {
        width: 100%; display:flex; align-items:center; gap:9px;
        padding: 10px 12px; border-radius:3px;
        border: 1.5px solid transparent; background: transparent;
        color: rgba(255,255,255,0.6); font-family: ${a.font};
        font-size:.8rem; font-weight:700; cursor:pointer;
        transition: all .22s cubic-bezier(.4,0,.2,1);
        text-align:right; margin-bottom:3px;
        white-space:normal;
        min-height:42px; line-height:1.45;
        overflow:hidden; position:relative;
    }
    .adm-nav-btn::before { content:''; position:absolute; right:0; top:0; bottom:0; width:3px; background:${a.orange}; transform:scaleY(0); transform-origin:bottom; transition:transform .3s cubic-bezier(.4,0,.2,1); }
    .adm-nav-btn:hover  { background: rgba(245,124,0,0.1); color:${a.white}; border-color:rgba(245,124,0,0.2); }
    .adm-nav-btn.active { background: rgba(245,124,0,0.15); color:${a.white}; border-color:rgba(245,124,0,0.35); }
    .adm-nav-btn.active::before { transform:scaleY(1); }
    .adm-nav-icon  { font-size:.95rem; flex-shrink:0; }
    .adm-nav-txt   { flex:1; text-align:right; overflow:visible; text-overflow:clip; word-break:break-word; }
    .adm-nav-badge { padding:1px 7px; border-radius:2px; font-size:.58rem; font-weight:900; background:${a.orange}; color:${a.white}; flex-shrink:0; }
    .adm-nav-badge.pulse { animation: adm-pulse 2s ease infinite; }
    .adm-sidebar-footer { position:relative; z-index:1; padding: 10px 14px; border-top: 1.5px solid rgba(245,124,0,0.2); font-size:.6rem; color:rgba(255,255,255,0.25); text-align:center; background:rgba(0,0,0,0.2); flex-shrink:0; }

    /* ── Main ── */
    .adm-main { flex:1; min-width:0; overflow-y:auto; background: ${a.gray100}; animation: adm-fadeUp .28s ease; }
    .adm-main::-webkit-scrollbar { width:5px; }
    .adm-main::-webkit-scrollbar-thumb { background:${a.gray300}; border-radius:3px; }

    /* ── Page hero ── */
    .adm-page-hero { position:relative; background: ${a.blueDark}; padding: 32px clamp(20px,4vw,48px) 56px; overflow:hidden; }
    .adm-page-hero::before { content:''; position:absolute; inset:0; background-image: linear-gradient(rgba(245,124,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(245,124,0,0.07) 1px, transparent 1px); background-size:40px 40px; pointer-events:none; }
    .adm-page-hero::after  { content:''; position:absolute; bottom:-2px; left:0; right:0; height: clamp(28px,5vw,56px); background:${a.gray100}; clip-path: polygon(0 100%, 100% 0, 100% 100%); }
    .adm-hero-accent   { position:absolute; top:0; right:0; width:6px; height:100%; background:linear-gradient(to bottom,${a.orange},${a.orangeLight}); }
    .adm-hero-content  { position:relative; z-index:2; }
    .adm-hero-tag      { display:inline-block; background:${a.orange}; color:${a.white}; font-family:${a.font}; font-size:clamp(9px,1.1vw,12px); font-weight:700; padding: 4px 16px; border-radius:2px; margin-bottom:10px; letter-spacing:.05em; }
    .adm-hero-title    { font-size:clamp(18px,3vw,32px); font-weight:900; color:${a.white}; font-family:${a.font}; line-height:1.3; }
    .adm-hero-title span { color:${a.orangeLight}; }
    .adm-hero-date     { font-size:clamp(10px,1.2vw,13px); color:rgba(255,255,255,0.5); margin-top:6px; }

    /* ── Content area ── */
    .adm-content { padding: clamp(16px,2.5vw,32px) clamp(16px,3vw,40px) clamp(40px,5vw,64px); }

        /* ── Stat cards (circles) ── */
    .adm-stats {
        display:grid; grid-template-columns:repeat(6,1fr);
        gap: clamp(10px,1.5vw,20px) clamp(6px,1.2vw,18px);
        margin-bottom: clamp(20px,2.5vw,32px);
    }
    .adm-sc {
        display:flex; flex-direction:column; align-items:center; gap:8px;
        min-width:0; background:none; border:none; box-shadow:none; padding:0;
        --sc-color: ${a.orange};
    }
    .adm-sc.blue { --sc-color: ${a.blue}; }
    .adm-sc-ring {
        width: clamp(84px, 9.5vw, 124px); aspect-ratio: 1; border-radius: 50%;
        background: ${a.white};
        border: 4px solid var(--sc-color);
        box-shadow: 0 4px 14px rgba(0,0,0,.08), inset 0 0 0 4px rgba(255,255,255,1);
        display:flex; flex-direction:column; align-items:center; justify-content:center;
        gap:2px; line-height:1;
        transition: transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s;
    }
    .adm-sc:hover .adm-sc-ring { transform: translateY(-4px) scale(1.04); box-shadow: 0 10px 26px rgba(0,0,0,.14); }
    .adm-sc-icon { font-size: clamp(1rem, 1.7vw, 1.4rem); }
    .adm-sc-val  { font-size: clamp(1.1rem, 2.2vw, 1.75rem); font-weight:900; color:var(--sc-color); font-family:'Courier New',monospace; }
    .adm-sc-lbl  { font-size: clamp(.64rem, 1.1vw, .74rem); color:${a.gray700}; font-weight:700; text-align:center; line-height:1.4; }

    @media(max-width:1100px){ .adm-stats{ grid-template-columns:repeat(3,1fr); } }
    @media(max-width:640px){
        .adm-stats { gap: 14px 6px; }
        .adm-sc-ring  { width: 74px; border-width: 3px; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
        .adm-sc-icon  { font-size: .9rem; }
        .adm-sc-val   { font-size: 1.1rem; }
        .adm-sc-lbl   { font-size: .64rem; }
    }
    @media(max-width:380px){
        .adm-sc-ring { width: 64px; }
        .adm-sc-val  { font-size: 1rem; }
    }
    /* ── Section headers ── */
    .adm-section-hdr { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-bottom: clamp(14px,2vw,22px); padding-bottom: clamp(10px,1.5vw,16px); border-bottom: 3px solid ${a.orange}; position:relative; }
    .adm-section-tag   { display:inline-block; background:${a.blue}; color:${a.white}; font-family:${a.font}; font-size:clamp(9px,1.1vw,12px); font-weight:700; padding:4px 14px; border-radius:2px; margin-bottom:4px; letter-spacing:.04em; }
    .adm-section-title { font-size:clamp(14px,2vw,20px); font-weight:900; color:${a.black}; font-family:${a.font}; }
    .adm-section-title span { color:${a.orange}; }

    /* ── Toolbar ── */
    .adm-toolbar { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom: clamp(12px,2vw,18px); background:${a.white}; border:1.5px solid ${a.gray300}; border-radius:3px; padding: clamp(10px,1.5vw,14px) clamp(12px,2vw,18px); box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .adm-search input { width:100%; padding: clamp(8px,1.2vw,11px) 34px clamp(8px,1.2vw,11px) clamp(10px,1.5vw,14px); border-radius:3px; border:1.5px solid ${a.gray300}; background:${a.gray100}; color:${a.black}; font-family:${a.font}; font-size:clamp(.72rem,1.3vw,.8rem); outline:none; direction:rtl; transition: border .18s, box-shadow .18s; }
    .adm-search input::placeholder { color:${a.gray500}; }
    .adm-search input:focus { border-color:${a.orange}; background:${a.white}; box-shadow:0 0 0 3px rgba(245,124,0,0.1); }
    .adm-search::after { content:''; position:absolute; right:10px; top:50%; transform:translateY(-50%); font-size:.68rem; pointer-events:none; opacity:.5; }
    .adm-fdate { padding: clamp(7px,1.1vw,10px) clamp(8px,1.2vw,12px); border-radius:3px; border:1.5px solid ${a.gray300}; background:${a.gray100}; color:${a.black}; font-family:${a.font}; font-size:clamp(.7rem,1.2vw,.78rem); outline:none; direction:ltr; transition: border .18s; }
    .adm-fdate:focus { border-color:${a.orange}; background:${a.white}; }
    .adm-fsel { padding: clamp(7px,1.1vw,10px) clamp(8px,1.2vw,12px); border-radius:3px; border:1.5px solid ${a.gray300}; background:${a.gray100}; color:${a.black}; font-family:${a.font}; font-size:clamp(.7rem,1.2vw,.78rem); outline:none; cursor:pointer; }
    .adm-filter-active { display:inline-flex; align-items:center; gap:5px; padding:3px 12px; border-radius:2px; background:rgba(245,124,0,0.08); border:1.5px solid rgba(245,124,0,0.3); color:${a.orange}; font-size:.68rem; font-weight:700; }
    .adm-fclear { padding: clamp(6px,1vw,9px) clamp(10px,1.5vw,14px); border-radius:3px; background:${a.gray100}; border:1.5px solid ${a.gray300}; font-family:${a.font}; font-size:clamp(.64rem,1.1vw,.72rem); font-weight:700; cursor:pointer; color:${a.gray500}; transition:all .16s; }
    .adm-fclear:hover { border-color:${a.orange}; color:${a.orange}; background:rgba(245,124,0,0.06); }

    /* ── Export button ── */
    .adm-expw { position:relative; }
    .adm-expbtn { display:flex; align-items:center; gap:6px; padding: clamp(8px,1.2vw,11px) clamp(14px,2vw,20px); background:${a.orange}; color:${a.white}; border:none; border-radius:3px; font-family:${a.font}; font-size:clamp(.72rem,1.3vw,.8rem); font-weight:700; cursor:pointer; white-space:nowrap; transition:all .22s cubic-bezier(.4,0,.2,1); box-shadow:0 4px 14px rgba(245,124,0,0.3); }
    .adm-expbtn:hover    { background:${a.orangeDark}; transform:translateY(-2px); box-shadow:0 6px 20px rgba(245,124,0,0.38); }
    .adm-expbtn:disabled { opacity:.5; cursor:not-allowed; transform:none; }
    .adm-expmenu { position:absolute; top:calc(100% + 6px); left:0; background:${a.white}; border:1.5px solid ${a.gray300}; border-radius:3px; box-shadow:0 10px 32px rgba(0,0,0,0.12); overflow:hidden; z-index:400; min-width:190px; animation: adm-slideIn .15s ease; border-top:3px solid ${a.orange}; }
    .adm-expitem { display:flex; align-items:center; gap:9px; width:100%; padding: clamp(10px,1.8vw,13px) clamp(14px,2vw,18px); background:none; border:none; border-bottom:1px solid ${a.gray100}; font-family:${a.font}; font-size:clamp(.72rem,1.3vw,.8rem); font-weight:700; color:${a.gray700}; direction:rtl; cursor:pointer; transition:background .12s,color .12s; }
    .adm-expitem:last-child { border-bottom:none; }
    .adm-expitem:hover { background:rgba(245,124,0,0.06); color:${a.orange}; }

    /* ── Table card ── */
    .adm-card { background:${a.white}; border-radius:3px; border:1.5px solid ${a.gray300}; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.06); position:relative; }
    .adm-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(to left,${a.orange},${a.blue}); z-index:2; }
    .adm-tscr { overflow-x:auto; -webkit-overflow-scrolling:touch; }
    .adm-tbl  { width:100%; border-collapse:collapse; min-width:480px; }
    .adm-tbl thead th { background:${a.blue}; color:${a.white}; padding: clamp(12px,1.8vw,16px) clamp(10px,2vw,18px); font-family:${a.font}; font-size:clamp(.7rem,1.2vw,.78rem); font-weight:700; text-align:right; white-space:nowrap; border-bottom:3px solid ${a.orange}; letter-spacing:.3px; }
    .adm-tbl thead th.or { background:${a.orange}; border-bottom-color:rgba(255,255,255,0.3); }
    .adm-tbl thead th.gr { background:#16a34a; border-bottom-color:#86efac; }
    .adm-tbl thead th.pu { background:#7c3aed; border-bottom-color:#c4b5fd; }
    .adm-tbl thead th.rd { background:#dc2626; border-bottom-color:#fca5a5; }
    .adm-tbl thead th.c  { text-align:center; }
    .adm-tbl tbody tr { border-bottom:1px solid ${a.gray100}; transition:background .12s; }
    .adm-tbl tbody tr:last-child { border-bottom:none; }
    .adm-tbl tbody tr:hover { background:rgba(8,101,168,0.04); }
    .adm-tbl tbody tr.xopen { background:rgba(8,101,168,0.05); }
    .adm-tbl tbody tr:nth-child(even) { background:#fafbfc; }
    .adm-tbl tbody tr:nth-child(even):hover { background:rgba(8,101,168,0.04); }
    .adm-tbl td { padding: clamp(11px,1.6vw,14px) clamp(10px,2vw,18px); font-family:${a.font}; font-size:clamp(.69rem,1.25vw,.78rem); color:${a.gray700}; vertical-align:middle; }

    /* ── Table helpers ── */
    .adm-av { width:clamp(30px,3.5vw,36px); height:clamp(30px,3.5vw,36px); border-radius:3px; background:${a.blue}; color:${a.white}; display:inline-flex; align-items:center; justify-content:center; font-weight:900; font-size:clamp(.6rem,1vw,.68rem); flex-shrink:0; }
    .adm-av.or { background:${a.orange}; }
    .adm-av.rd { background:#dc2626; }
    .adm-av.sm { width:24px; height:24px; font-size:.58rem; }
    .adm-uc    { display:flex; align-items:center; gap:9px; }
    .adm-uname { font-weight:700; color:${a.black}; }
    .adm-cb    { display:inline-flex; align-items:center; justify-content:center; min-width:26px; height:26px; border-radius:2px; background:rgba(8,101,168,0.08); border:1.5px solid rgba(8,101,168,0.25); color:${a.blue}; font-size:clamp(.64rem,1.1vw,.72rem); font-weight:900; padding:0 6px; font-family:'Courier New',monospace; }
    .adm-cb.or { background:rgba(245,124,0,0.08); border-color:rgba(245,124,0,0.3); color:${a.orange}; }
    .adm-pill  { display:inline-block; padding:4px 12px; border-radius:2px; font-size:clamp(.62rem,1.1vw,.7rem); font-weight:700; cursor:pointer; border:1.5px solid rgba(8,101,168,0.3); color:${a.blue}; background:rgba(8,101,168,0.07); user-select:none; transition:all .14s; font-family:${a.font}; }
    .adm-pill:hover,.adm-pill.op { background:rgba(8,101,168,0.14); border-color:rgba(8,101,168,0.55); }
    .adm-pill.or { border-color:rgba(245,124,0,0.3); color:${a.orange}; background:rgba(245,124,0,0.07); }
    .adm-pill.or:hover,.adm-pill.or.op { background:rgba(245,124,0,0.14); border-color:rgba(245,124,0,0.55); }

    /* ── Expanded rows ── */
    .adm-xrow td { padding:0!important; border:none; }
    .adm-xin  { padding: clamp(12px,2vw,16px) clamp(14px,2.5vw,22px); display:flex; flex-wrap:wrap; gap:clamp(7px,1.3vw,11px); background:rgba(8,101,168,0.04); border-top:2px solid rgba(8,101,168,0.1); }
    .adm-mc   { background:${a.white}; border-radius:3px; padding:clamp(9px,1.8vw,13px) clamp(10px,2vw,14px); border:1.5px solid ${a.gray300}; min-width:clamp(150px,20vw,200px); flex:1 1 150px; max-width:260px; transition:border-color .14s; box-shadow:0 2px 8px rgba(0,0,0,0.05); }
    .adm-mc:hover { border-color:rgba(245,124,0,0.4); }
    .adm-mt { font-size:clamp(.7rem,1.25vw,.78rem); font-weight:700; color:${a.blue}; margin-bottom:2px; }
    .adm-mt.or { color:${a.orange}; }
    .adm-ms { font-size:clamp(.63rem,1.1vw,.7rem); color:${a.gray500}; }
    .adm-md { font-size:clamp(.6rem,1vw,.66rem); color:${a.gray300}; margin-top:4px; }

    /* ── Empty / loading ── */
    .adm-empty { text-align:center; padding:clamp(40px,8vw,70px) 20px; }
    .adm-emi   { font-size:clamp(1.8rem,4vw,2.5rem); margin-bottom:12px; opacity:.35; }
    .adm-empty p { color:${a.gray300}; font-size:clamp(.74rem,1.4vw,.82rem); }
    .adm-ld    { text-align:center; padding:clamp(50px,10vw,80px) 20px; }
    .adm-sp    { width:clamp(32px,4.5vw,42px); height:clamp(32px,4.5vw,42px); border:3px solid ${a.gray300}; border-top-color:${a.blue}; border-radius:50%; animation:adm-spin .7s linear infinite; margin:0 auto clamp(12px,2vw,18px); }
    .adm-ld p  { color:${a.gray300}; font-size:clamp(.72rem,1.3vw,.8rem); }

    /* ── Overlay ── */
    .adm-ovl  { position:fixed; inset:0; background:rgba(245,247,250,.88); z-index:9999; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(6px); }
    .adm-ovlb { background:${a.white}; border-radius:3px; padding:clamp(28px,5vw,44px) clamp(44px,7vw,64px); text-align:center; box-shadow:0 20px 56px rgba(8,101,168,0.18); border:2px solid rgba(8,101,168,0.15); border-top:4px solid ${a.orange}; }
    .adm-ovlb p { font-size:clamp(.78rem,1.5vw,.86rem); margin-top:14px; color:${a.gray500}; font-family:${a.font}; }

    /* ── Error ── */
    .adm-err { background:#fef2f2; border:1.5px solid rgba(220,38,38,.3); color:#dc2626; border-radius:3px; padding:clamp(8px,1.5vw,11px) clamp(10px,2vw,14px); margin-bottom:14px; font-size:clamp(.7rem,1.3vw,.78rem); display:flex; align-items:center; gap:9px; border-right:4px solid #dc2626; }

    /* ── Attendance ── */
    .adm-chk { width:22px; height:22px; border-radius:3px; border:2px solid ${a.gray300}; background:${a.gray100}; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; transition:all .16s; flex-shrink:0; font-size:.75rem; color:transparent; }
    .adm-chk:hover { border-color:#16a34a; background:#f0fdf4; }
    .adm-chk.on    { background:#f0fdf4; border-color:#16a34a; color:#16a34a; }
    .adm-chk.spin  { border-color:#16a34a; border-top-color:transparent; border-radius:50%; animation:adm-spin .6s linear infinite; }
    .adm-att-badge { display:inline-flex; align-items:center; gap:3px; padding:3px 9px; border-radius:2px; font-size:clamp(.62rem,1.1vw,.7rem); font-weight:700; }
    .adm-att-badge.on  { background:#f0fdf4; color:#16a34a; border:1px solid #86efac; }
    .adm-att-badge.off { background:${a.gray100}; color:${a.gray300}; border:1px solid ${a.gray300}; }
    .adm-att-sum { display:flex; align-items:center; gap:clamp(10px,2vw,20px); flex-wrap:wrap; background:${a.blue}; border-radius:3px; padding:clamp(10px,1.8vw,14px) clamp(14px,2.5vw,20px); margin-bottom:clamp(12px,2vw,18px); box-shadow:0 4px 16px rgba(8,101,168,0.25); position:relative; overflow:hidden; }
    .adm-att-sum::before { content:''; position:absolute; inset:0; background-image: linear-gradient(rgba(245,124,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(245,124,0,0.06) 1px,transparent 1px); background-size:28px 28px; pointer-events:none; }
    .adm-att-sum span { font-size:clamp(.7rem,1.3vw,.78rem); font-weight:700; color:rgba(255,255,255,0.85); position:relative; z-index:1; }
    .adm-prog-wrap { flex:1; min-width:100px; height:5px; background:rgba(255,255,255,0.2); border-radius:3px; overflow:hidden; position:relative; z-index:1; }
    .adm-prog-fill { height:100%; border-radius:3px; background:linear-gradient(90deg,${a.orange},${a.orangeLight}); transition:width .5s ease; }

    /* ── Certificate cards ── */
    .adm-cert-grid { display:grid; gap:clamp(10px,1.8vw,16px); padding:clamp(12px,2vw,20px); grid-template-columns:repeat(auto-fill,minmax(clamp(240px,28vw,300px),1fr)); }
    .adm-cert-card { background:${a.white}; border-radius:3px; padding:clamp(12px,2vw,16px); border:1.5px solid ${a.gray300}; display:flex; flex-direction:column; gap:10px; transition:transform .3s cubic-bezier(.4,0,.2,1), box-shadow .3s, border-color .3s; box-shadow:0 2px 8px rgba(0,0,0,0.05); position:relative; }
    .adm-cert-card::before { content:''; position:absolute; top:0; right:0; width:3px; height:100%; background:${a.orange}; transform:scaleY(0); transform-origin:bottom; transition:transform .3s cubic-bezier(.4,0,.2,1); }
    .adm-cert-card:hover { border-color:${a.orange}; box-shadow:0 8px 28px rgba(245,124,0,0.14); transform:translateY(-4px); }
    .adm-cert-card:hover::before { transform:scaleY(1); }
    .adm-cert-card.has-cert::before { background:#16a34a; }
    .adm-cert-card.has-cert:hover  { border-color:#86efac; box-shadow:0 8px 28px rgba(22,163,74,0.12); }
    .adm-cert-card-top   { display:flex; align-items:flex-start; gap:10px; }
    .adm-cert-icon { width:40px; height:40px; border-radius:3px; display:flex; align-items:center; justify-content:center; font-size:1.1rem; flex-shrink:0; background:rgba(8,101,168,0.08); border:1.5px solid rgba(8,101,168,0.2); }
    .adm-cert-icon.has  { background:#f0fdf4; border-color:#86efac; }
    .adm-cert-icon.grey { background:rgba(156,163,175,.06); border-color:rgba(156,163,175,.15); }
    .adm-cert-info   { flex:1; min-width:0; }
    .adm-cert-name   { font-weight:700; font-size:.8rem; color:${a.black}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .adm-cert-course { font-size:.7rem; color:${a.blue}; margin-top:3px; line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
    .adm-cert-badges  { display:flex; gap:5px; flex-wrap:wrap; margin-top:5px; }
    .adm-cert-actions { display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px solid ${a.gray100}; padding-top:9px; }
    .adm-cert-btn { padding:clamp(5px,1vw,7px) clamp(10px,1.5vw,14px); border-radius:2px; font-family:${a.font}; font-size:clamp(.64rem,1.1vw,.72rem); font-weight:700; cursor:pointer; border:none; transition:all .16s; white-space:nowrap; }
    .adm-cert-btn.up   { background:rgba(8,101,168,0.08); color:${a.blue}; border:1.5px solid rgba(8,101,168,0.25); }
    .adm-cert-btn.up:hover { background:rgba(8,101,168,0.16); }
    .adm-cert-btn.dl   { background:rgba(245,124,0,0.08); color:${a.orange}; border:1.5px solid rgba(245,124,0,0.25); }
    .adm-cert-btn.dl:hover { background:rgba(245,124,0,0.16); }
    .adm-cert-btn.rm   { background:#fef2f2; color:#dc2626; border:1.5px solid rgba(220,38,38,.2); }
    .adm-cert-btn.rm:hover { background:#fee2e2; }
    .adm-cert-btn.full { width:100%; text-align:center; justify-content:center; background:${a.blue}; color:${a.white}; border:none; }
    .adm-cert-btn.full:hover { background:${a.blueDark}; }
    .adm-cert-btn:disabled { opacity:.45; cursor:not-allowed; }
    .adm-cert-sum { display:flex; align-items:center; gap:14px; flex-wrap:wrap; background:${a.white}; border:1.5px solid ${a.gray300}; border-radius:3px; padding:12px 20px; margin-bottom:16px; box-shadow:0 2px 8px rgba(0,0,0,0.05); border-top:4px solid ${a.blue}; }

    /* ── Modals ── */
    .adm-modal-bg { position:fixed; inset:0; background:rgba(4,68,120,0.45); z-index:10000; display:flex; align-items:center; justify-content:center; padding:16px; backdrop-filter:blur(6px); animation:adm-fadeUp .16s ease; }
    .adm-modal { background:${a.white}; border-radius:3px; padding:clamp(16px,2.5vw,24px); max-width:clamp(290px,88vw,520px); width:100%; box-shadow:0 20px 56px rgba(4,68,120,0.22); direction:rtl; border:1.5px solid ${a.gray300}; border-top:4px solid ${a.orange}; }
    .adm-modal.rd { border-top-color:#dc2626; max-width:clamp(290px,92vw,540px); max-height:90vh; overflow-y:auto; }
    .adm-modal h3 { font-size:clamp(.82rem,1.5vw,.94rem); font-weight:900; color:${a.black}; margin-bottom:4px; }
    .adm-modal p  { font-size:clamp(.66rem,1.1vw,.74rem); color:${a.gray500}; margin-bottom:12px; font-family:${a.font}; }
    .adm-drop { border:2px dashed rgba(8,101,168,0.35); border-radius:3px; padding:clamp(24px,5vw,36px) 16px; text-align:center; cursor:pointer; transition:all .16s; background:rgba(8,101,168,0.03); }
    .adm-drop.over  { border-color:${a.orange}; background:rgba(245,124,0,0.05); }
    .adm-drop:hover { border-color:rgba(8,101,168,0.6); }
    .adm-drop-icon  { font-size:clamp(1.7rem,3.5vw,2.3rem); margin-bottom:8px; }
    .adm-drop-txt   { font-size:clamp(.72rem,1.4vw,.8rem); color:${a.gray700}; margin-bottom:4px; font-family:${a.font}; }
    .adm-drop-sub   { font-size:clamp(.62rem,1.1vw,.7rem); color:${a.gray500}; }
    .adm-modal-actions { display:flex; gap:7px; margin-top:18px; justify-content:flex-end; }
    .adm-modal-cancel { padding:clamp(7px,1.3vw,10px) clamp(12px,2vw,18px); border-radius:3px; background:${a.gray100}; border:1.5px solid ${a.gray300}; font-family:${a.font}; font-size:clamp(.7rem,1.3vw,.78rem); font-weight:700; cursor:pointer; color:${a.gray500}; transition:all .14s; }
    .adm-modal-cancel:hover { border-color:${a.black}; color:${a.black}; background:${a.white}; }
    .adm-email { direction:ltr; text-align:right; color:${a.gray500}; font-size:clamp(.65rem,1.15vw,.73rem); }

    /* ── Refund ── */
    .rf-stat-bar { display:grid; grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); gap:10px; margin-bottom:20px; }
    .rf-sc { background:${a.white}; border-radius:3px; padding:14px 16px; border:1.5px solid ${a.gray300}; box-shadow:0 2px 8px rgba(0,0,0,0.05); display:flex; align-items:center; gap:11px; transition:transform .2s; border-right:4px solid ${a.orange}; }
    .rf-sc:hover { transform:translateY(-2px); }
    .rf-sc-icon { width:36px; height:36px; border-radius:3px; display:flex; align-items:center; justify-content:center; font-size:1rem; flex-shrink:0; }
    .rf-sc-val  { font-size:1.3rem; font-weight:900; line-height:1; font-family:'Courier New',monospace; }
    .rf-sc-lbl  { font-size:.62rem; color:${a.gray500}; font-weight:700; margin-top:3px; }
    .rf-status  { display:inline-flex; align-items:center; gap:5px; padding:4px 10px; border-radius:2px; font-size:.7rem; font-weight:700; white-space:nowrap; border:1.5px solid transparent; }
    .rf-amount  { font-family:'Courier New',monospace; font-weight:900; font-size:.88rem; color:#15803d; direction:ltr; display:inline-block; }
    .rf-filter-btns { display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
    .rf-fbtn { padding:5px 13px; border-radius:2px; border:1.5px solid ${a.gray300}; background:${a.gray100}; font-family:${a.font}; font-size:.7rem; font-weight:700; cursor:pointer; color:${a.gray500}; transition:all .14s; }
    .rf-fbtn:hover { border-color:${a.blue}; color:${a.blue}; background:rgba(8,101,168,0.06); }
    .rf-fbtn.active      { background:rgba(8,101,168,0.1); border-color:rgba(8,101,168,0.4); color:${a.blue}; }
    .rf-fbtn.active.pend { background:rgba(245,124,0,0.08); border-color:rgba(245,124,0,0.4); color:${a.orange}; }
    .rf-fbtn.active.appr { background:#f0fdf4; border-color:#86efac; color:#16a34a; }
    .rf-fbtn.active.bank { background:rgba(8,101,168,0.08); border-color:rgba(8,101,168,0.35); color:${a.blue}; }
    .rf-fbtn.active.rjct { background:#fef2f2; border-color:rgba(220,38,38,.35); color:#dc2626; }
    .rf-action-btn { padding:5px 12px; border-radius:2px; font-family:${a.font}; font-size:.68rem; font-weight:700; cursor:pointer; border:1.5px solid; transition:all .14s; white-space:nowrap; }
    .rf-action-btn:disabled { opacity:.4; cursor:not-allowed; }
    .rf-action-btn.view    { background:rgba(8,101,168,0.07); color:${a.blue}; border-color:rgba(8,101,168,0.3); }
    .rf-action-btn.view:hover    { background:rgba(8,101,168,0.14); }
    .rf-action-btn.approve { background:#f0fdf4; color:#16a34a; border-color:#86efac; }
    .rf-action-btn.approve:hover { background:#dcfce7; }
    .rf-action-btn.bank    { background:rgba(8,101,168,0.07); color:${a.blue}; border-color:rgba(8,101,168,0.35); }
    .rf-action-btn.bank:hover    { background:rgba(8,101,168,0.14); }
    .rf-action-btn.reject  { background:#fef2f2; color:#dc2626; border-color:rgba(220,38,38,.3); }
    .rf-action-btn.reject:hover  { background:#fee2e2; }
    .rf-detail    { display:grid; grid-template-columns:1fr 1fr; gap:8px 16px; }
    .rf-field-lbl { font-size:.58rem; color:${a.gray500}; font-weight:700; margin-bottom:2px; }
    .rf-field-val { font-size:.74rem; color:${a.black}; font-weight:700; word-break:break-all; }
    .rf-field-val.mono { font-family:'Courier New',monospace; direction:ltr; display:inline-block; }
    .rf-full      { grid-column:1/-1; }
    .rf-divider   { grid-column:1/-1; border:none; border-top:1.5px dashed ${a.gray300}; margin:4px 0; }
    .rf-bank-block  { grid-column:1/-1; background:${a.gray100}; border:1.5px solid rgba(8,101,168,0.15); border-radius:3px; padding:10px 14px; border-right:4px solid ${a.blue}; }
    .rf-bank-title  { font-size:.68rem; font-weight:900; color:${a.blue}; margin-bottom:7px; display:flex; align-items:center; gap:5px; }
    .rf-bank-grid   { display:grid; grid-template-columns:1fr 1fr; gap:5px 14px; }
    .rf-action-area { margin-top:12px; border-top:1.5px solid ${a.gray300}; padding-top:10px; }
    .rf-action-row  { display:flex; gap:7px; flex-wrap:wrap; }
    .rf-textarea { width:100%; padding:8px 10px; border-radius:3px; border:1.5px solid ${a.gray300}; background:${a.gray100}; font-family:${a.font}; font-size:.74rem; color:${a.black}; resize:vertical; min-height:60px; outline:none; direction:rtl; margin-top:8px; transition:border .18s; }
    .rf-textarea:focus { border-color:${a.orange}; background:${a.white}; }
    .rf-action-confirm { padding:8px 18px; border-radius:2px; font-family:${a.font}; font-size:.76rem; font-weight:700; cursor:pointer; border:none; transition:all .16s; }
    .rf-action-confirm.approve       { background:#16a34a; color:${a.white}; }
    .rf-action-confirm.approve:hover { background:#15803d; }
    .rf-action-confirm.bank          { background:${a.blue}; color:${a.white}; }
    .rf-action-confirm.bank:hover    { background:${a.blueDark}; }
    .rf-action-confirm.reject        { background:#dc2626; color:${a.white}; }
    .rf-action-confirm.reject:hover  { background:#b91c1c; }
    .rf-action-confirm:disabled      { opacity:.5; cursor:not-allowed; }
    .rf-bank-banner { padding:12px 16px; border-radius:3px; font-family:${a.font}; font-size:.78rem; font-weight:700; display:flex; align-items:center; gap:10px; margin-bottom:16px; animation:adm-slideDown .3s ease; position:relative; border-right:4px solid; }
    .rf-bank-banner.success { background:#f0fdf4; border-color:#86efac; color:#15803d; }
    .rf-bank-banner.failed  { background:rgba(245,124,0,0.06); border-color:${a.orange}; color:${a.orangeDark}; }
    .rf-bank-banner-close { position:absolute; left:12px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; font-size:1rem; color:inherit; opacity:.6; }
    .rf-bank-banner-close:hover { opacity:1; }

    /* ── Pagination ── */
    .adm-pg { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; padding:14px 18px; border-top:1.5px solid ${a.gray300}; background:${a.gray100}; font-family:${a.font}; direction:rtl; }
    .adm-pg-info { font-size:.72rem; color:${a.gray500}; font-weight:700; }
    .adm-pg-info strong { color:${a.black}; }

    /* ── Breadcrumb ── */
    .adm-bc { position:fixed; top:${dr}px; left:0; z-index:1050; width:100%; height:${pr}px; background:#f5f5f5; border-bottom:1px solid ${a.gray300}; display:flex; align-items:center; justify-content:center; font-family:${a.font}; font-size:clamp(.72rem,1.3vw,.82rem); }
    .adm-bc a     { margin-left:6px; color:${a.blue}; text-decoration:none; font-weight:700; transition:color .15s; }
    .adm-bc a:hover { color:${a.orange}; }
    .adm-bc .sep  { color:${a.gray500}; margin:0 6px; }
    .adm-bc .cur  { color:${a.gray700}; margin-right:8px; }

    /* ── Footer ── */
    .adm-footer { background:${a.black}; padding:clamp(24px,4vw,40px) clamp(16px,3vw,32px); text-align:center; margin-top: clamp(32px,5vw,60px); }
    .adm-footer p { color:rgba(255,255,255,0.25); font-family:${a.font}; font-size:clamp(.62rem,1.1vw,.7rem); }

    /* ── Responsive ── */

    /* ── Drawer pieces (hidden on desktop) ── */
    .adm-backdrop  { display:none; }
    .adm-sb-close  { display:none; }
    .adm-menu-btn  { display:none; }

    @media(max-width:1100px){
        .adm-sidebar {
            position: fixed; top:0; right:0; bottom:0;
            width: min(290px, 85vw);
            height: 100vh; height: 100dvh; min-height: 0;
            z-index: 5000;
            transform: translateX(100%);
            visibility: hidden;
            transition: transform .28s cubic-bezier(.4,0,.2,1), visibility 0s linear .28s;
        }
        .adm-sidebar.open {
            transform: translateX(0);
            visibility: visible;
            transition: transform .28s cubic-bezier(.4,0,.2,1), visibility 0s;
        }
        .adm-backdrop.show {
            display:block; position:fixed; inset:0; z-index:4999;
            background:rgba(4,30,60,.55); backdrop-filter:blur(2px);
        }
        .adm-sb-close {
            display:flex; align-items:center; justify-content:center;
            margin-right:auto; width:32px; height:32px; border-radius:3px;
            background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.2);
            color:#fff; font-size:1rem; cursor:pointer;
        }
        .adm-nav-btn { padding: 13px 14px; min-height:46px; font-size:.86rem; }  /* bigger touch targets */

        .adm-menu-btn {
            display:flex; align-items:center; gap:10px; width:100%;
            padding:12px 16px; border:none; cursor:pointer;
            background:${a.blueDark}; color:${a.white};
            border-bottom:3px solid ${a.orange};
            font-family:${a.font}; font-size:.86rem; font-weight:800; text-align:right;
        }
        .adm-menu-btn .cur { color:${a.orangeLight}; margin-right:auto; }
    }
    @media(max-width:768px){
        .rf-detail,.rf-bank-grid { grid-template-columns:1fr; }
        .adm-cert-grid { grid-template-columns:1fr!important; }
        .adm-mc { max-width:100%; }
        .adm-toolbar { flex-direction:column; align-items:stretch; }
        .adm-expw { align-self:flex-start; }

        .adm-toolbar .adm-search { min-width:0 !important; width:100%; }
        .adm-toolbar .adm-fdate, .adm-toolbar .adm-fsel { width:100%; }
        .adm-expw { align-self:stretch !important; margin-right:0 !important; }
        .adm-expbtn { width:100%; justify-content:center; }
        .adm-expmenu { left:0; right:0; }
    }
            /* push the page below the fixed navbar spacer + breadcrumb */
    @media(max-width:1100px){ .adm-root { margin-top: 48px; } }   /* navbar spacer 70px */
    @media(max-width:899px) { .adm-root { margin-top: 56px; } }   /* navbar spacer 64px */
    @media(max-width:599px) { .adm-root { margin-top: 60px; } }   /* navbar spacer 56px */
    @media(max-width:480px){ .adm-content { padding:12px 10px 32px; } }
    @media print {
        .adm-sidebar,.adm-toolbar,.adm-bc { display:none!important; }
        .adm-root { margin-top:0!important; }
    }

    /* ══ FINANCIAL TAB ══ */
    .fin-income-hero {
        display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px;
        background: linear-gradient(135deg, #073f6e 0%, #044478 60%, #0b4a1c 100%);
        border-radius:3px; padding:clamp(20px,3vw,32px) clamp(20px,3.5vw,40px);
        margin-bottom:clamp(18px,2.5vw,28px); position:relative; overflow:hidden;
        box-shadow: 0 8px 32px rgba(4,68,120,0.3); border:1.5px solid rgba(22,163,74,0.3);
    }
    .fin-income-hero::before {
        content:''; position:absolute; inset:0;
        background-image: linear-gradient(rgba(22,163,74,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(22,163,74,0.07) 1px,transparent 1px);
        background-size:36px 36px; pointer-events:none;
    }
    .fin-income-hero::after {
        content:''; position:absolute; top:0; right:0;
        width:5px; height:100%; background:linear-gradient(to bottom,#16a34a,#22c55e);
    }
    .fin-total-label { font-size:clamp(.72rem,1.3vw,.82rem); color:rgba(255,255,255,.55); font-weight:700; margin-bottom:6px; }
    .fin-total-amount { font-size:clamp(2rem,4.5vw,3.2rem); font-weight:900; color:#ffffff; font-family:'Courier New',monospace; line-height:1; letter-spacing:-1px; text-shadow:0 2px 12px rgba(22,163,74,0.4); }
    .fin-total-amount .fin-currency { font-size:clamp(.9rem,1.8vw,1.3rem); color:#4ade80; margin-right:6px; font-weight:700; }
    .fin-total-sub { font-size:clamp(.65rem,1.15vw,.74rem); color:rgba(255,255,255,.4); margin-top:4px; }
    .fin-income-pills { display:flex; gap:10px; flex-wrap:wrap; position:relative; z-index:1; }
    .fin-ip { display:flex; flex-direction:column; align-items:center; padding:12px 18px; border-radius:3px; min-width:110px; background:rgba(255,255,255,0.07); border:1.5px solid rgba(255,255,255,0.12); backdrop-filter:blur(4px); transition:all .2s; }
    .fin-ip:hover { background:rgba(255,255,255,0.12); border-color:rgba(22,163,74,0.4); }
    .fin-ip-val { font-size:clamp(1.1rem,2.2vw,1.5rem); font-weight:900; font-family:'Courier New',monospace; color:#ffffff; }
    .fin-ip-lbl { font-size:clamp(.58rem,1vw,.65rem); color:rgba(255,255,255,.5); margin-top:3px; font-weight:700; }

    .fin-stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(10px,1.5vw,16px); margin-bottom:clamp(16px,2.5vw,26px); }
    @media(max-width:900px){ .fin-stats-row{ grid-template-columns:repeat(2,1fr); } }
    @media(max-width:480px){ .fin-stats-row{ grid-template-columns:1fr 1fr; } }
    .fin-sc { background:#ffffff; border-radius:3px; border:1.5px solid #d0d3d8; padding:clamp(14px,2vw,20px) clamp(12px,1.8vw,16px); display:flex; align-items:center; gap:12px; box-shadow:0 2px 10px rgba(0,0,0,0.06); position:relative; overflow:hidden; transition:transform .25s cubic-bezier(.4,0,.2,1), box-shadow .25s; }
    .fin-sc::before { content:''; position:absolute; top:0; right:0; width:4px; height:100%; background:#16a34a; transform:scaleY(0); transform-origin:bottom; transition:transform .3s cubic-bezier(.4,0,.2,1); }
    .fin-sc:hover { transform:translateY(-4px); box-shadow:0 10px 28px rgba(0,0,0,0.1); }
    .fin-sc:hover::before { transform:scaleY(1); }
    .fin-sc-icon { width:44px; height:44px; border-radius:3px; display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0; }
    .fin-sc-body { flex:1; min-width:0; }
    .fin-sc-val { font-size:clamp(1.15rem,2.5vw,1.5rem); font-weight:900; font-family:'Courier New',monospace; line-height:1; }
    .fin-sc-lbl { font-size:clamp(.62rem,1.1vw,.7rem); color:#6b7280; font-weight:700; margin-top:3px; }
    .fin-sc-bar { height:3px; border-radius:2px; margin-top:6px; width:60%; opacity:.55; }

    .fin-cb-row { display:flex; align-items:center; gap:12px; margin-bottom:8px; }
    .fin-cb-name { font-size:.76rem; font-weight:700; color:#0a0a0a; min-width:clamp(120px,25vw,200px); max-width:clamp(120px,25vw,200px); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; text-align:right; }
    .fin-cb-track { flex:1; height:8px; background:#f0f1f2; border-radius:4px; overflow:hidden; }
    .fin-cb-fill { height:100%; border-radius:4px; background:linear-gradient(90deg,#16a34a,#22c55e); transition:width .6s cubic-bezier(.4,0,.2,1); }
    .fin-cb-fill.alt { background:linear-gradient(90deg,#0865a8,#1a84d4); }
    .fin-cb-amt { font-size:.74rem; font-weight:900; font-family:'Courier New',monospace; color:#16a34a; min-width:90px; text-align:left; }
    .fin-cb-count { font-size:.64rem; color:#6b7280; min-width:50px; text-align:left; }

    .fin-user-total { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:2px; background:#f0fdf4; border:1.5px solid #86efac; font-family:'Courier New',monospace; font-size:.78rem; font-weight:900; color:#16a34a; }
    .fin-course-chip { display:inline-flex; align-items:center; gap:7px; background:#ffffff; border:1.5px solid #d0d3d8; border-radius:3px; padding:7px 12px; margin:4px; font-size:.72rem; transition:border-color .15s; }
    .fin-course-chip:hover { border-color:#16a34a; }
    .fin-course-chip-name { font-weight:700; color:#0a0a0a; }
    .fin-course-chip-price { font-family:'Courier New',monospace; font-weight:900; color:#16a34a; font-size:.78rem; }
    .fin-xin { padding:14px 20px; background:rgba(22,163,74,0.03); border-top:2px solid rgba(22,163,74,0.1); }

    /* financial hero / accent overrides */
    .adm-page-hero.fin-hero { background:linear-gradient(135deg,#073f6e 0%,#044478 60%,#0a4a1a 100%); }
    .adm-hero-accent.green   { background:linear-gradient(to bottom,#16a34a,#22c55e); }
    .adm-hero-tag.green      { background:#16a34a; }
    .adm-hero-title span.green { color:#4ade80; }
    .adm-section-hdr.green   { border-bottom-color:#16a34a; }
    .adm-section-tag.green   { background:#16a34a; }
    .adm-section-title span.green { color:#16a34a; }
    .adm-card.green::before  { background:linear-gradient(to left,#16a34a,#0865a8); }

    /* sidebar financial nav item */
    .adm-nav-divider   { height:1px; background:rgba(245,124,0,0.15); margin:8px 8px; }
    .adm-nav-btn.fin-nav::before { background:#16a34a; }
    .adm-nav-btn.fin-nav.active  { background:rgba(22,163,74,0.15); border-color:rgba(22,163,74,0.35); }
    .adm-nav-badge.green { background:#16a34a; }

    /* export button green variant */
    .adm-expbtn.green { background:#16a34a; box-shadow:0 4px 14px rgba(22,163,74,0.3); }
    .adm-expbtn.green:hover { background:#15803d; box-shadow:0 6px 20px rgba(22,163,74,0.38); }
    .adm-expmenu.green { border-top-color:#16a34a; }

    /* table cell variants used in FinancialTab */
    .adm-av.gr   { background:#16a34a; }
    .adm-cb.gr   { background:rgba(22,163,74,0.08); border-color:rgba(22,163,74,0.3); color:#16a34a; }
    .adm-pill.gr { border-color:rgba(22,163,74,0.3); color:#16a34a; background:rgba(22,163,74,0.07); }
    .adm-pill.gr:hover,.adm-pill.gr.op { background:rgba(22,163,74,0.14); border-color:rgba(22,163,74,0.55); }

    /* ═══ LECTURERS TAB ═══ */

    @keyframes lec-notif-in { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }

    /* ── Lecturers layout ── */
    .lec-layout {
    display: flex;
    gap: clamp(10px, 1.5vw, 18px);
    align-items: stretch;
}

    /* ── Left panel (list) ── */
    .lec-panel {
    width: clamp(230px,26vw,290px);
    flex-shrink: 0;
    background: #ffffff;
    border-radius: 3px;
    border: 1.5px solid #d0d3d8;
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    top: 16px;
    height: fit-content;
    max-height: calc(100vh - 32px);
    overflow: hidden;
}
    .lec-panel-hdr {
        display: flex; align-items: center; justify-content: space-between;
        padding: 14px 14px 10px; border-bottom: 1.5px solid #f0f1f2;
        flex-shrink: 0; gap: 8px;
    }
    .lec-count-badge {
        background: rgba(8,101,168,0.1); color: #0865a8;
        border: 1.5px solid rgba(8,101,168,0.25); border-radius: 2px;
        padding: 1px 9px; font-size: .68rem; font-weight: 900; font-family: 'Courier New',monospace;
    }
    .lec-new-btn {
        background: rgba(245,124,0,0.1); color: #f57c00;
        border: 1.5px solid rgba(245,124,0,0.35); border-radius: 2px;
        padding: 4px 12px; font-size: .72rem; font-weight: 800;
        cursor: pointer; font-family: inherit; transition: all .16s;
    }
    .lec-new-btn:hover { background: rgba(245,124,0,0.18); }
    .lec-search-wrap { flex-shrink:0; padding:10px 10px 6px; min-width:unset!important; }
    .lec-search-wrap input { font-size:.76rem!important; }
    .lec-search-clear { position:absolute; left:8px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:#6b7280; font-size:1rem; line-height:1; padding:2px; }
    .lec-list { 
        flex: 1; 
        overflow-y: auto; 
        padding: 6px 8px 10px;
        min-height: 0;  /* critical for flex children to scroll */
    }    
    .lec-list::-webkit-scrollbar { width:4px; }
    .lec-list::-webkit-scrollbar-thumb { background:#d0d3d8; border-radius:2px; }

    /* ── List row ── */
    .lec-row {
        display:flex; align-items:center; gap:9px;
        padding:9px 10px; border-radius:3px; margin-bottom:3px;
        cursor:pointer; border:1.5px solid transparent;
        transition:background .13s, border-color .13s;
    }
    .lec-row:hover  { background:rgba(8,101,168,0.05); border-color:rgba(8,101,168,0.12); }
    .lec-row.active { background:rgba(245,124,0,0.09); border-color:rgba(245,124,0,0.35); border-right:3px solid #f57c00; }
    .lec-avatar {
        width:36px; height:36px; border-radius:3px; flex-shrink:0;
        overflow:hidden; background:linear-gradient(135deg,#0865a8,#1a84d4);
        display:flex; align-items:center; justify-content:center;
        border:1.5px solid rgba(8,101,168,0.25);
    }
    .lec-avatar img  { width:100%; height:100%; object-fit:cover; }
    .lec-avatar span { color:#bfdbfe; font-weight:900; font-size:.65rem; }
    .lec-row-info  { overflow:hidden; flex:1; }
    .lec-row-name  { color:#0a0a0a; font-size:.76rem; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .lec-row-spec  { color:#6b7280; font-size:.64rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:1px; }
    .lec-row-id    { background:#f0f1f2; color:#6b7280; font-size:.6rem; padding:2px 7px; border-radius:2px; flex-shrink:0; font-weight:700; font-family:'Courier New',monospace; }

    /* ── Form area ── */
    .lec-form-wrap { flex:1; min-width:0; display:flex; flex-direction:column; gap:12px; }

    .lec-notif {
        display:flex; align-items:center; gap:10px;
        padding:11px 16px; border-radius:3px;
        font-size:.8rem; font-weight:700;
        animation:lec-notif-in .3s cubic-bezier(.34,1.56,.64,1);
        border-right:4px solid;
    }
    .lec-notif-success { background:#f0fdf4; border-color:#16a34a; color:#15803d; }
    .lec-notif-error   { background:#fef2f2; border-color:#dc2626; color:#dc2626; }
    .lec-notif-info    { background:rgba(8,101,168,0.06); border-color:#0865a8; color:#0865a8; }

    .lec-form-card { overflow:visible!important; }

    .lec-form-hdr {
        background:#044478;
        padding:clamp(16px,2.5vw,22px) clamp(18px,3vw,28px);
        display:flex; align-items:flex-start;
        justify-content:space-between; gap:12px; flex-wrap:wrap;
        position:relative; overflow:hidden; border-radius:3px 3px 0 0;
    }
    .lec-form-hdr::before {
        content:''; position:absolute; inset:0;
        background-image: linear-gradient(rgba(245,124,0,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(245,124,0,0.07) 1px,transparent 1px);
        background-size:36px 36px; pointer-events:none;
    }
    .lec-form-title { font-size:clamp(15px,2vw,19px); font-weight:900; color:#ffffff; margin:0; position:relative; z-index:1; }
    .lec-form-sub   { font-size:.74rem; color:rgba(255,255,255,.45); margin:4px 0 0; position:relative; z-index:1; }
    .lec-stat-pill  { display:inline-flex; align-items:center; padding:5px 14px; border-radius:2px; background:rgba(255,255,255,0.08); border:1.5px solid rgba(255,255,255,0.15); color:rgba(255,255,255,.75); font-size:.72rem; font-weight:700; position:relative; z-index:1; }

    .lec-form-body { padding:clamp(16px,2.5vw,26px); }
    .lec-top-row   { display:flex; gap:clamp(14px,2.5vw,24px); margin-bottom:22px; align-items:flex-start; flex-wrap:wrap; }
    .lec-photo-col { flex-shrink:0; display:flex; flex-direction:column; gap:8px; }

    /* ── Photo zone ── */
    .lec-photo-zone {
        width:140px; height:160px; border-radius:3px;
        border:2px dashed #d0d3d8; background:#f8f9fa;
        display:flex; flex-direction:column; align-items:center; justify-content:center;
        cursor:pointer; overflow:hidden; position:relative;
        transition:border-color .18s, background .18s;
    }
    .lec-photo-zone:hover { border-color:#f57c00; background:rgba(245,124,0,0.04); }
    .lec-photo-zone.over  { border-color:#f57c00; background:rgba(245,124,0,0.07); }
    .lec-photo-img { width:100%; height:100%; object-fit:cover; position:absolute; inset:0; }
    .lec-photo-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.52); display:flex; flex-direction:column; align-items:center; justify-content:center; opacity:0; transition:opacity .2s; }
    .lec-photo-zone:hover .lec-photo-overlay { opacity:1; }
    .lec-photo-overlay-txt { color:#fff; font-size:.72rem; font-weight:700; margin-top:5px; }
    .lec-photo-placeholder { display:flex; flex-direction:column; align-items:center; gap:6px; padding:10px; }
    .lec-photo-icon  { width:48px; height:48px; border-radius:3px; background:#e2e8f0; display:flex; align-items:center; justify-content:center; font-size:1.4rem; }
    .lec-photo-hint  { color:#6b7280; font-size:.68rem; font-weight:600; text-align:center; line-height:1.6; }
    .lec-photo-types { color:#d0d3d8; font-size:.62rem; background:#e2e8f0; padding:2px 10px; border-radius:2px; }
    .lec-remove-photo { background:#fef2f2; color:#dc2626; border:1.5px solid rgba(220,38,38,.3); border-radius:2px; padding:6px 0; font-size:.72rem; font-weight:700; cursor:pointer; width:100%; font-family:inherit; transition:background .14s; }
    .lec-remove-photo:hover { background:#fee2e2; }

    /* ── Fields ── */
    .lec-fields-grid { flex:1; display:grid; grid-template-columns:1fr 1fr; gap:12px 18px; min-width:0; }
    .lec-field { display:flex; flex-direction:column; gap:5px; }
    .lec-label { font-size:.72rem; font-weight:700; color:#374151; }
    .lec-inp {
        border:1.5px solid #d0d3d8; border-radius:3px; padding:9px 12px;
        font-size:.8rem; color:#0a0a0a; width:100%; background:#fff;
        direction:rtl; font-family:inherit;
        transition:border-color .18s, box-shadow .18s; outline:none;
    }
    .lec-inp:focus { border-color:#f57c00; box-shadow:0 0 0 3px rgba(245,124,0,0.1); }
    .lec-inp::placeholder { color:#6b7280; }

    .lec-divider { height:1px; background:#f0f1f2; margin:4px 0 20px; }

    /* ══ RICH TEXT EDITOR ══ */

    .lec-rte-block {
        margin-bottom: 16px;
        border-radius: 3px;
        border: 1.5px solid #d0d3d8;
        overflow: hidden;
        box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        transition: border-color .18s;
    }
    .lec-rte-block:focus-within {
        border-color: #f57c00;
        box-shadow: 0 0 0 3px rgba(245,124,0,0.08);
    }

    .lec-rte-hdr {
        background: #f8f9fa;
        padding: 10px 16px;
        border-bottom: 1.5px solid #e2e8f0;
        display: flex;
        align-items: center;
        gap: 9px;
        flex-wrap: wrap;
    }
    .lec-rte-icon  { font-size: 1.1rem; flex-shrink: 0; }
    .lec-rte-label { font-weight: 800; font-size: .8rem; color: #0a0a0a; }
    .lec-rte-sub   { font-size: .66rem; color: #6b7280; margin-top: 1px; }

    /* ── Toolbar ── */
    .lec-rte-toolbar {
        background: #ffffff;
        border-bottom: 1.5px solid #e2e8f0;
        padding: 6px 10px;
        display: flex;
        align-items: center;
        gap: 3px;
        flex-wrap: wrap;
    }

    .lec-rte-sep {
        width: 1px;
        height: 20px;
        background: #e2e8f0;
        margin: 0 3px;
        flex-shrink: 0;
    }

    /* Toolbar buttons */
    .lec-tb-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 28px;
        border: 1.5px solid transparent;
        border-radius: 3px;
        background: none;
        cursor: pointer;
        font-size: .82rem;
        font-family: inherit;
        color: #374151;
        font-weight: 700;
        transition: all .13s;
        flex-shrink: 0;
        padding: 0;
    }
    .lec-tb-btn:hover  { background: rgba(8,101,168,0.07); border-color: rgba(8,101,168,0.2); color: #0865a8; }
    .lec-tb-btn.active { background: rgba(245,124,0,0.1); border-color: rgba(245,124,0,0.4); color: #f57c00; }
    .lec-tb-btn.bold   { font-weight: 900; font-size: .9rem; }
    .lec-tb-btn.italic { font-style: italic; font-size: .9rem; }
    .lec-tb-btn.under  { text-decoration: underline; }

    /* ── Font family select ── */
    .lec-tb-font-select {
        height: 28px;
        border: 1.5px solid #d0d3d8;
        border-radius: 3px;
        background: #fff;
        font-size: .74rem;
        font-weight: 600;
        color: #0a0a0a;
        padding: 0 4px;
        cursor: pointer;
        outline: none;
        transition: border-color .13s;
        max-width: 120px;
    }
    .lec-tb-font-select:hover { border-color: #0865a8; }
    .lec-tb-font-select:focus { border-color: #f57c00; box-shadow: 0 0 0 2px rgba(245,124,0,0.1); }

    /* ── Font size wrapper ── */
    .lec-tb-size-wrap {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        flex-shrink: 0;
    }
    .lec-tb-size-unit {
        font-size: .62rem;
        color: #6b7280;
        font-weight: 600;
        line-height: 1;
        user-select: none;
    }

    /* Font size select */
    .lec-tb-select {
        height: 28px;
        border: 1.5px solid #d0d3d8;
        border-radius: 3px;
        background: #fff;
        font-size: .78rem;
        font-family: 'Courier New', monospace;
        font-weight: 700;
        color: #0a0a0a;
        padding: 0 4px 0 2px;
        cursor: pointer;
        outline: none;
        transition: border-color .13s;
        text-align: center;
    }
    .lec-tb-size-select {
        width: 58px;
        text-align: center;
        -webkit-appearance: auto;
        appearance: auto;
    }
    .lec-tb-select:hover  { border-color: #0865a8; }
    .lec-tb-select:focus  { border-color: #f57c00; box-shadow: 0 0 0 2px rgba(245,124,0,0.1); }

    /* Color picker wrapper */
    .lec-tb-color-wrap {
        position: relative;
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
    }
    .lec-tb-color-btn {
        width: 34px;
        height: 28px;
        border: 1.5px solid #d0d3d8;
        border-radius: 3px;
        background: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 3px 5px;
        gap: 1px;
        transition: border-color .13s;
        position: relative;
        overflow: hidden;
    }
    .lec-tb-color-btn:hover { border-color: #f57c00; }
    .lec-tb-color-btn .color-letter {
        font-size: .85rem;
        font-weight: 900;
        line-height: 1;
    }
    .lec-tb-color-btn .color-bar {
        height: 3px;
        width: 18px;
        border-radius: 1px;
    }
    .lec-tb-color-input {
        position: absolute;
        inset: 0;
        opacity: 0;
        cursor: pointer;
        width: 100%;
        height: 100%;
        border: none;
        padding: 0;
    }

    /* URL button & popover */
    .lec-tb-url-wrap {
        position: relative;
        flex-shrink: 0;
    }
    .lec-url-popover {
        position: absolute;
        top: calc(100% + 6px);
        right: 0;
        background: #fff;
        border: 1.5px solid #d0d3d8;
        border-radius: 3px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        padding: 10px 12px;
        display: flex;
        gap: 6px;
        align-items: center;
        z-index: 100;
        min-width: 280px;
        animation: lec-notif-in .2s ease;
    }
    .lec-url-popover input {
        flex: 1;
        border: 1.5px solid #d0d3d8;
        border-radius: 3px;
        padding: 6px 10px;
        font-size: .76rem;
        font-family: inherit;
        outline: none;
        direction: ltr;
        transition: border-color .15s;
    }
    .lec-url-popover input:focus { border-color: #f57c00; }
    .lec-url-popover-ok {
        background: #0865a8; color: #fff;
        border: none; border-radius: 3px;
        padding: 6px 12px; font-size: .72rem;
        font-weight: 800; cursor: pointer;
        font-family: inherit; transition: background .13s;
        white-space: nowrap;
    }
    .lec-url-popover-ok:hover { background: #044478; }
    .lec-url-popover-cancel {
        background: #f0f1f2; color: #374151;
        border: none; border-radius: 3px;
        padding: 6px 10px; font-size: .72rem;
        font-weight: 700; cursor: pointer;
        font-family: inherit; transition: background .13s;
    }
    .lec-url-popover-cancel:hover { background: #e2e8f0; }

    /* ── Editable area ── */
    .lec-rte-editor {
        min-height: 120px;
        padding: 13px 16px;
        font-size: .8rem;
        color: #0a0a0a;
        font-family: inherit;
        line-height: 1.9;
        direction: rtl;
        background: #fff;
        outline: none;
        transition: background .14s;
        word-break: break-word;
    }
    .lec-rte-editor:focus { background: #fffdf9; }
    .lec-rte-editor:empty:before {
        content: attr(data-placeholder);
        color: #6b7280;
        pointer-events: none;
        white-space: pre-line;
    }
    .lec-rte-editor a { color: #0865a8; text-decoration: underline; }

    /* ── Action buttons ── */
    .lec-actions { display:flex; gap:9px; margin-top:24px; padding-top:18px; border-top:2px solid #f0f1f2; flex-wrap:wrap; align-items:center; }
    .lec-act-btn {
        display:inline-flex; align-items:center; gap:6px;
        padding:9px 20px; border-radius:3px;
        font-family:inherit; font-size:.8rem; font-weight:800;
        cursor:pointer; border:none; transition:all .2s cubic-bezier(.4,0,.2,1); white-space:nowrap;
    }
    .lec-act-btn:hover  { transform:translateY(-2px); }
    .lec-act-btn:active { transform:translateY(0); }
    .lec-act-btn.save   { background:#16a34a; color:#fff; box-shadow:0 3px 12px rgba(22,163,74,0.3); }
    .lec-act-btn.save:hover   { background:#15803d; box-shadow:0 5px 16px rgba(22,163,74,0.4); }
    .lec-act-btn.new    { background:#0865a8; color:#fff; box-shadow:0 3px 12px rgba(8,101,168,0.3); }
    .lec-act-btn.new:hover    { background:#044478; box-shadow:0 5px 16px rgba(8,101,168,0.4); }
    .lec-act-btn.reset  { background:#f57c00; color:#fff; box-shadow:0 3px 12px rgba(245,124,0,0.3); }
    .lec-act-btn.reset:hover  { background:#bf5200; box-shadow:0 5px 16px rgba(245,124,0,0.4); }
    .lec-act-btn.delete { background:#dc2626; color:#fff; box-shadow:0 3px 12px rgba(220,38,38,0.3); }
    .lec-act-btn.delete:hover { background:#b91c1c; box-shadow:0 5px 16px rgba(220,38,38,0.4); }
    .lec-delete-confirm { display:flex; align-items:center; gap:10px; flex-wrap:wrap; background:#fef2f2; border:1.5px solid rgba(220,38,38,.3); border-radius:3px; padding:9px 14px; border-right:4px solid #dc2626; }
    .lec-delete-warn    { font-size:.78rem; color:#dc2626; font-weight:700; }

    /* ══ RESPONSIVE ══ */

    @media(min-width:2000px){
        .lec-panel        { width: 360px; }
        .lec-form-body    { padding: 36px; }
        .lec-inp, .lec-rte-editor { font-size: .9rem; }
        .lec-form-title   { font-size: 1.3rem; }
        .lec-fields-grid  { grid-template-columns: 1fr 1fr 1fr; }
    }

    @media(min-width:1600px) and (max-width:1999px){
        .lec-panel        { width: 320px; }
        .lec-fields-grid  { grid-template-columns: 1fr 1fr 1fr; }
    }

    @media(max-width:1100px){
        .lec-panel { width: clamp(190px, 26vw, 250px); }
    }

    @media(max-width:900px){
        .lec-layout       { flex-direction: column; }
        .lec-panel        { width: 100% !important; height: auto !important; max-height: none !important; position: static !important; }
        .lec-list         { display: flex; flex-direction: row; flex-wrap: nowrap; overflow-x: auto; overflow-y: hidden; max-height: 80px; gap: 6px; padding: 6px 8px 10px; }
        .lec-list::-webkit-scrollbar         { height: 4px; width: unset; }
        .lec-list::-webkit-scrollbar-thumb   { background: rgba(245,124,0,0.35); border-radius: 2px; }
        .lec-row          { flex: 0 0 auto; width: clamp(160px, 44vw, 220px); margin-bottom: 0; }
        .lec-row-spec     { display: none; }
        .lec-form-wrap    { width: 100%; }
        .lec-top-row      { flex-direction: column; }
        .lec-photo-col    { width: 100%; }
        .lec-photo-zone   { width: 100%; height: 120px; }
        .lec-fields-grid  { grid-template-columns: 1fr 1fr; }
    }

    @media(max-width:640px){
        .lec-panel-hdr    { flex-wrap: wrap; gap: 6px; }
        .lec-search-wrap  { padding: 8px 10px 4px; }
        .lec-list         { max-height: 74px; }
        .lec-row          { width: clamp(150px, 55vw, 200px); }
        .lec-fields-grid  { grid-template-columns: 1fr; }
        .lec-form-hdr     { flex-direction: column; gap: 8px; }
        .lec-stat-pill    { align-self: flex-start; }
        .lec-form-body    { padding: clamp(12px, 3vw, 18px); }
        .lec-actions      { flex-direction: column; align-items: stretch; }
        .lec-act-btn      { width: 100%; justify-content: center; }
        .lec-delete-confirm { flex-direction: column; align-items: stretch; }
        .lec-delete-confirm .lec-act-btn,
        .lec-delete-confirm .adm-fclear { width: 100%; justify-content: center; text-align: center; }
        .lec-rte-toolbar  { gap: 2px; padding: 5px 8px; }
        .lec-tb-btn       { width: 26px; height: 26px; }
        .lec-tb-size-select { width: 46px; }
        .lec-url-popover  { min-width: 220px; right: auto; left: 0; }
        .lec-tb-font-select { max-width: 90px; font-size: .68rem; }
    }

    @media(max-width:400px){
        .lec-panel-hdr    { padding: 10px; }
        .lec-new-btn      { padding: 4px 10px; font-size: .68rem; }
        .lec-count-badge  { font-size: .6rem; }
        .lec-row          { width: clamp(140px, 60vw, 180px); }
        .lec-form-body    { padding: 10px; }
        .lec-inp          { padding: 8px 10px; font-size: .76rem; }
        .lec-rte-editor   { padding: 10px 12px; font-size: .76rem; }
        .lec-photo-zone   { height: 100px; }
        .lec-act-btn      { padding: 8px 14px; font-size: .76rem; }
        .lec-tb-size-select { width: 40px; font-size: .7rem; }
        .lec-tb-font-select { max-width: 80px; }
    }

    /* ═══ BOOKS TAB ═══ */

    @keyframes bk-notif-in { from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);} }

    /* ── Layout ── */
    .bk-layout {
        display: flex;
        gap: clamp(10px,1.5vw,20px);
        align-items: flex-start;
    }

    /* ── Left panel ── */
    .bk-panel {
        width: clamp(200px,24vw,270px);
        flex-shrink: 0;
        background: #ffffff;
        border-radius: 3px;
        border: 1.5px solid #d0d3d8;
        box-shadow: 0 2px 10px rgba(0,0,0,0.06);
        display: flex;
        flex-direction: column;
        height: 100vh;
        max-height: 100vh;
        position: sticky;
        top: 0;
        overflow: hidden;
    }

    /* ── Sub-page tabs (books / types) ── */
    .bk-subtabs {
        display: flex;
        gap: 5px;
        padding: 10px 10px 4px;
        flex-shrink: 0;
        border-bottom: 1.5px solid #f0f1f2;
    }
    .bk-subtab {
        flex: 1;
        padding: 7px 6px;
        border-radius: 3px;
        font-size: clamp(.64rem,1.1vw,.72rem);
        font-weight: 800;
        cursor: pointer;
        border: 1.5px solid rgba(245,124,0,0.2);
        color: #6b7280;
        background: transparent;
        text-align: center;
        font-family: inherit;
        transition: all .15s;
    }
    .bk-subtab:hover:not(.active) { background: rgba(8,101,168,0.05); color: #374151; border-color: rgba(8,101,168,0.2); }
    .bk-subtab.active { background: rgba(245,124,0,0.12); color: #f57c00; border-color: rgba(245,124,0,0.45); }

    /* ── Panel header ── */
    .bk-panel-hdr {
        display: flex; align-items: center; justify-content: space-between;
        padding: 10px 12px 8px; border-bottom: 1.5px solid #f0f1f2;
        flex-shrink: 0; gap: 7px;
    }
    .bk-count-badge {
        background: rgba(8,101,168,0.1); color: #0865a8;
        border: 1.5px solid rgba(8,101,168,0.25); border-radius: 2px;
        padding: 1px 9px; font-size: .66rem; font-weight: 900;
        font-family: 'Courier New', monospace;
    }
    .bk-new-btn {
        background: rgba(245,124,0,0.1); color: #f57c00;
        border: 1.5px solid rgba(245,124,0,0.35); border-radius: 2px;
        padding: 4px 12px; font-size: .7rem; font-weight: 800;
        cursor: pointer; font-family: inherit; transition: all .16s;
    }
    .bk-new-btn:hover { background: rgba(245,124,0,0.18); }

    /* ── Search wrap ── */
    .bk-search-wrap { flex-shrink: 0; padding: 8px 10px 5px; min-width: unset !important; }
    .bk-search-wrap input { font-size: .74rem !important; }
    .bk-search-clear { position: absolute; left: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #6b7280; font-size: 1rem; line-height: 1; padding: 2px; }

    /* ── List ── */
    .bk-list {
    flex: 0 1 auto;        /* instead of flex: 1 */
    overflow-y: auto;
    padding: 5px 7px 10px;
    max-height: 100%;      /* prevents overflow */
}
    .bk-list::-webkit-scrollbar { width: 4px; }
    .bk-list::-webkit-scrollbar-thumb { background: #d0d3d8; border-radius: 2px; }

    /* ── List row ── */
    .bk-row {
        display: flex; align-items: center; gap: 9px;
        padding: 9px 10px; border-radius: 3px; margin-bottom: 2px;
        cursor: pointer; border: 1.5px solid transparent;
        transition: background .13s, border-color .13s;
    }
    .bk-row:hover  { background: rgba(8,101,168,0.05); border-color: rgba(8,101,168,0.12); }
    .bk-row.active { background: rgba(245,124,0,0.09); border-color: rgba(245,124,0,0.35); border-right: 3px solid #f57c00; }
    .bk-row-avatar {
        width: 36px; height: 36px; border-radius: 3px; flex-shrink: 0;
        overflow: hidden; background: linear-gradient(135deg,#0865a8,#1a84d4);
        display: flex; align-items: center; justify-content: center;
        border: 1.5px solid rgba(8,101,168,0.25); font-size: 1.1rem;
    }
    .bk-row-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .bk-row-info { overflow: hidden; flex: 1; }
    .bk-row-name { color: #0a0a0a; font-size: .74rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .bk-row-sub  { color: #6b7280; font-size: .62rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 1px; }
    .bk-row-id   { background: #f0f1f2; color: #6b7280; font-size: .58rem; padding: 2px 6px; border-radius: 2px; flex-shrink: 0; font-weight: 700; font-family: 'Courier New', monospace; }

    /* ── Form wrap ── */
    .bk-form-wrap { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 12px; }

    /* ── Notification ── */
    .bk-notif {
        display: flex; align-items: center; gap: 10px;
        padding: 11px 16px; border-radius: 3px;
        font-size: .8rem; font-weight: 700;
        animation: bk-notif-in .3s cubic-bezier(.34,1.56,.64,1);
        border-right: 4px solid;
    }
    .bk-notif-success { background: #f0fdf4; border-color: #16a34a; color: #15803d; }
    .bk-notif-error   { background: #fef2f2; border-color: #dc2626; color: #dc2626; }
    .bk-notif-info    { background: rgba(8,101,168,0.06); border-color: #0865a8; color: #0865a8; }

    /* ── Form card ── */
    .bk-form-card { overflow: visible !important; }

    .bk-form-hdr {
        background: #044478;
        padding: clamp(14px,2.5vw,22px) clamp(16px,3vw,28px);
        display: flex; align-items: flex-start;
        justify-content: space-between; gap: 12px; flex-wrap: wrap;
        position: relative; overflow: hidden; border-radius: 3px 3px 0 0;
    }
    .bk-form-hdr::before {
        content: ''; position: absolute; inset: 0;
        background-image: linear-gradient(rgba(245,124,0,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(245,124,0,0.07) 1px,transparent 1px);
        background-size: 36px 36px; pointer-events: none;
    }
    .bk-form-title { font-size: clamp(14px,2vw,19px); font-weight: 900; color: #ffffff; margin: 0; position: relative; z-index: 1; }
    .bk-form-sub   { font-size: clamp(.64rem,1.1vw,.74rem); color: rgba(255,255,255,.4); margin: 4px 0 0; position: relative; z-index: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
    .bk-stat-pill  { display: inline-flex; align-items: center; padding: 5px 14px; border-radius: 2px; background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.15); color: rgba(255,255,255,.75); font-size: .72rem; font-weight: 700; position: relative; z-index: 1; flex-shrink: 0; }

    .bk-form-body { padding: clamp(14px,2.5vw,24px); }

    /* ── Top row (cover + fields) ── */
    .bk-top-row   { display: flex; gap: clamp(12px,2.5vw,22px); margin-bottom: 20px; align-items: flex-start; flex-wrap: wrap; }
    .bk-cover-col { flex-shrink: 0; display: flex; flex-direction: column; gap: 7px; }

    /* ── Cover zone ── */
    .bk-cover-zone {
        width: clamp(110px,14vw,150px);
        height: clamp(130px,17vw,195px);
        border-radius: 3px; border: 2px dashed #d0d3d8; background: #f8f9fa;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        cursor: pointer; overflow: hidden; position: relative;
        transition: border-color .18s, background .18s;
    }
    .bk-cover-zone:hover, .bk-cover-zone.over { border-color: #f57c00; background: rgba(245,124,0,0.04); }
    .bk-cover-img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
    .bk-cover-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.52); display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity .2s; }
    .bk-cover-zone:hover .bk-cover-overlay { opacity: 1; }
    .bk-cover-overlay-txt { color: #fff; font-size: .7rem; font-weight: 700; margin-top: 5px; }
    .bk-cover-placeholder { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 10px; }
    .bk-cover-icon  { width: 44px; height: 52px; border-radius: 3px; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; }
    .bk-cover-hint  { color: #6b7280; font-size: clamp(.6rem,1vw,.68rem); font-weight: 600; text-align: center; line-height: 1.6; }
    .bk-cover-types { color: #d0d3d8; font-size: .6rem; background: #e2e8f0; padding: 2px 10px; border-radius: 2px; }
    .bk-remove-cover { background: #fef2f2; color: #dc2626; border: 1.5px solid rgba(220,38,38,.3); border-radius: 2px; padding: 6px 0; font-size: .7rem; font-weight: 700; cursor: pointer; width: 100%; font-family: inherit; transition: background .14s; }
    .bk-remove-cover:hover { background: #fee2e2; }

    /* ── Fields grid ── */
    .bk-fields-grid { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 11px 16px; min-width: 0; }
    .bk-field { display: flex; flex-direction: column; gap: 5px; }
    .bk-label { font-size: .72rem; font-weight: 700; color: #374151; }
    .bk-inp {
        border: 1.5px solid #d0d3d8; border-radius: 3px;
        padding: clamp(7px,1.1vw,10px) 12px;
        font-size: clamp(.74rem,1.3vw,.8rem); color: #0a0a0a;
        width: 100%; background: #fff; direction: rtl;
        font-family: inherit; transition: border .18s, box-shadow .18s; outline: none;
    }
    .bk-inp:focus { border-color: #f57c00; box-shadow: 0 0 0 3px rgba(245,124,0,0.1); }
    .bk-inp::placeholder { color: #6b7280; }
    .bk-select { cursor: pointer; }

    /* ── Divider ── */
    .bk-divider { height: 1px; background: #f0f1f2; margin: 4px 0 18px; }

    /* ── Textarea block ── */
    .bk-ta-block { margin-bottom: 14px; border-radius: 3px; border: 1.5px solid #d0d3d8; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
    .bk-ta-hdr   { background: #f8f9fa; padding: 9px 15px; border-bottom: 1.5px solid #e2e8f0; display: flex; align-items: center; gap: 8px; }
    .bk-ta-icon  { font-size: 1rem; flex-shrink: 0; }
    .bk-ta-label { font-weight: 800; font-size: clamp(.74rem,1.3vw,.8rem); color: #0a0a0a; }
    .bk-ta-sub   { font-size: .64rem; color: #6b7280; margin-top: 1px; }
    .bk-ta-count { background: #e2e8f0; border-radius: 2px; padding: 2px 10px; font-size: .64rem; color: #374151; font-weight: 700; flex-shrink: 0; }
    .bk-ta {
        width: 100%; border: none; outline: none; resize: vertical;
        padding: 12px 15px; font-size: clamp(.74rem,1.3vw,.8rem);
        color: #0a0a0a; font-family: inherit; line-height: 1.9;
        direction: rtl; background: #fff; display: block; transition: background .14s;
    }
    .bk-ta:focus { background: #fffdf9; }
    .bk-ta::placeholder { color: #6b7280; }

    /* ── Actions ── */
    .bk-actions { display: flex; gap: 8px; margin-top: 22px; padding-top: 16px; border-top: 2px solid #f0f1f2; flex-wrap: wrap; align-items: center; }
    .bk-act-btn {
        display: inline-flex; align-items: center; gap: 6px;
        padding: clamp(7px,1.2vw,9px) clamp(14px,2vw,20px);
        border-radius: 3px; font-family: inherit;
        font-size: clamp(.74rem,1.3vw,.8rem); font-weight: 800;
        cursor: pointer; border: none;
        transition: all .2s cubic-bezier(.4,0,.2,1); white-space: nowrap;
    }
    .bk-act-btn:hover  { transform: translateY(-2px); }
    .bk-act-btn:active { transform: translateY(0); }
    .bk-act-btn.save   { background: #16a34a; color: #fff; box-shadow: 0 3px 12px rgba(22,163,74,0.3); }
    .bk-act-btn.save:hover   { background: #15803d; box-shadow: 0 5px 16px rgba(22,163,74,0.4); }
    .bk-act-btn.new    { background: #0865a8; color: #fff; box-shadow: 0 3px 12px rgba(8,101,168,0.3); }
    .bk-act-btn.new:hover    { background: #044478; box-shadow: 0 5px 16px rgba(8,101,168,0.4); }
    .bk-act-btn.reset  { background: #f57c00; color: #fff; box-shadow: 0 3px 12px rgba(245,124,0,0.3); }
    .bk-act-btn.reset:hover  { background: #bf5200; box-shadow: 0 5px 16px rgba(245,124,0,0.4); }
    .bk-act-btn.delete { background: #dc2626; color: #fff; box-shadow: 0 3px 12px rgba(220,38,38,0.3); }
    .bk-act-btn.delete:hover { background: #b91c1c; box-shadow: 0 5px 16px rgba(220,38,38,0.4); }
    .bk-delete-confirm { display: flex; align-items: center; gap: 9px; flex-wrap: wrap; background: #fef2f2; border: 1.5px solid rgba(220,38,38,.3); border-radius: 3px; padding: 8px 13px; border-right: 4px solid #dc2626; }
    .bk-delete-warn { font-size: .76rem; color: #dc2626; font-weight: 700; }

    /* ══ RESPONSIVE — 300px → 2000px+ ══ */

    /* ≥2000px */
    @media(min-width:2000px){
        .bk-panel         { width: 340px; }
        .bk-fields-grid   { grid-template-columns: 1fr 1fr 1fr; }
        .bk-form-body     { padding: 34px; }
        .bk-inp, .bk-ta   { font-size: .88rem; }
        .bk-form-title    { font-size: 1.25rem; }
        .bk-cover-zone    { width: 170px; height: 220px; }
    }

    /* 1600px – 1999px */
    @media(min-width:1600px) and (max-width:1999px){
        .bk-panel         { width: 300px; }
        .bk-fields-grid   { grid-template-columns: 1fr 1fr 1fr; }
        .bk-cover-zone    { width: 155px; height: 205px; }
    }

    /* 1200px – 1599px — default desktop, nothing extra */

    /* ≤1100px */
    @media(max-width:1100px){
        .bk-panel { width: clamp(180px,24vw,240px); }
    }

    /* ≤900px — panel becomes horizontal strip */
    @media(max-width:900px){
        .bk-layout         { flex-direction: column; }
        .bk-panel          { width: 100% !important; height: auto !important; max-height: none !important; position: static !important; }
        .bk-list           { display: flex; flex-direction: row; flex-wrap: nowrap; overflow-x: auto; overflow-y: hidden; max-height: 80px; gap: 6px; padding: 6px 8px 10px; }
        .bk-list::-webkit-scrollbar        { height: 4px; width: unset; }
        .bk-list::-webkit-scrollbar-thumb  { background: rgba(245,124,0,0.35); border-radius: 2px; }
        .bk-row            { flex: 0 0 auto; width: clamp(150px,44vw,210px); margin-bottom: 0; }
        .bk-row-sub        { display: none; }
        .bk-top-row        { flex-direction: column; }
        .bk-cover-col      { width: 100%; }
        .bk-cover-zone     { width: 100%; height: 120px; flex-direction: row; gap: 16px; padding: 12px; }
        .bk-cover-placeholder { flex-direction: row; gap: 12px; }
        .bk-fields-grid    { grid-template-columns: 1fr 1fr; }
    }

    /* ≤640px */
    @media(max-width:640px){
        .bk-subtabs        { padding: 8px 8px 4px; gap: 4px; }
        .bk-panel-hdr      { padding: 8px 10px 6px; flex-wrap: wrap; gap: 5px; }
        .bk-search-wrap    { padding: 7px 8px 4px; }
        .bk-list           { max-height: 74px; }
        .bk-row            { width: clamp(140px,54vw,200px); }
        .bk-fields-grid    { grid-template-columns: 1fr; }
        .bk-form-hdr       { flex-direction: column; gap: 8px; padding: 14px 16px; }
        .bk-stat-pill      { align-self: flex-start; }
        .bk-form-body      { padding: clamp(12px,3vw,18px); }
        .bk-actions        { flex-direction: column; align-items: stretch; }
        .bk-act-btn        { width: 100%; justify-content: center; }
        .bk-delete-confirm { flex-direction: column; align-items: stretch; }
        .bk-delete-confirm .bk-act-btn,
        .bk-delete-confirm .adm-fclear { width: 100%; justify-content: center; text-align: center; }
        .bk-ta-hdr         { flex-wrap: wrap; }
        .bk-ta-count       { margin-right: auto; }
    }

    /* ≤480px */
    @media(max-width:480px){
        .bk-layout         { gap: 8px; }
        .bk-row            { width: clamp(130px,60vw,185px); }
        .bk-list           { max-height: 70px; }
        .bk-cover-zone     { height: 100px; }
        .bk-form-body      { padding: 10px 11px; }
        .bk-inp            { padding: 8px 10px; font-size: .76rem; }
        .bk-ta             { padding: 10px 12px; font-size: .76rem; }
        .bk-act-btn        { padding: 8px 14px; font-size: .76rem; }
        .bk-subtab         { font-size: .62rem; padding: 6px 4px; }
    }

    /* ≤380px (very small phones) */
    @media(max-width:380px){
        .bk-panel-hdr      { padding: 6px 8px; }
        .bk-new-btn        { padding: 3px 8px; font-size: .64rem; }
        .bk-count-badge    { font-size: .58rem; }
        .bk-row            { width: clamp(120px,65vw,170px); }
        .bk-list           { max-height: 66px; }
        .bk-form-hdr       { padding: 11px 13px; }
        .bk-form-title     { font-size: .9rem; }
        .bk-form-body      { padding: 9px; }
        .bk-fields-grid    { gap: 8px 10px; }
        .bk-inp            { padding: 7px 9px; font-size: .74rem; }
        .bk-ta             { padding: 9px 10px; font-size: .74rem; }
        .bk-act-btn        { padding: 7px 12px; font-size: .74rem; }
    }

    /* ═══ PLANWORK TAB ═══ */

    /* sidebar nav accent */
    .adm-nav-btn.pw-nav::before   { background: #7c3aed; }
    .adm-nav-btn.pw-nav.active    { background: rgba(124,58,237,0.15); border-color: rgba(124,58,237,0.35); }
    .adm-nav-badge.pw             { background: #7c3aed; }

    /* page-hero variant */
    .adm-page-hero.pw-hero        { background: linear-gradient(135deg,#1e1b4b 0%,#312e81 55%,#3730a3 100%); }
    .adm-hero-accent.pw           { background: linear-gradient(to bottom,#7c3aed,#a78bfa); }
    .adm-hero-tag.pw              { background: #7c3aed; }
    .adm-hero-title span.pw       { color: #c4b5fd; }
    .adm-section-hdr.pw           { border-bottom-color: #7c3aed; }
    .adm-section-tag.pw           { background: #7c3aed; }
    .adm-section-title span.pw    { color: #7c3aed; }
    .adm-card.pw::before          { background: linear-gradient(to left,#7c3aed,#0865a8); }

    /* ── Left panel override ── */
    .pw-left-panel { width: clamp(230px,27vw,310px); }
    .pw-records-list { max-height: 32vh; overflow-y: auto; }

    /* ── Parent selector ── */
    .pw-parent-field { grid-column: 1 / -1; }

    .pw-parent-wrap {
        display: flex;
        align-items: flex-end;
        gap: 8px;
        flex-wrap: nowrap;
    }
    .pw-parent-id-sel {
        width: 80px !important;
        flex: 0 0 80px;
        font-family: 'Courier New', monospace;
        font-weight: 700;
        font-size: .76rem !important;
        text-align: center;
        padding: 9px 6px !important;
    }
    .pw-parent-clear {
        flex-shrink: 0;
        align-self: flex-end;
        padding: 8px 10px;
        border-radius: 3px;
        border: 1.5px solid rgba(220,38,38,.3);
        background: #fef2f2;
        color: #dc2626;
        font-size: .76rem;
        font-weight: 700;
        cursor: pointer;
        transition: background .14s;
        white-space: nowrap;
        height: 38px;
        display: flex;
        align-items: center;
    }
    .pw-parent-clear:hover { background: #fee2e2; }

    /* ── Tree viewer ── */
    .pw-tree-panel {
        flex-shrink: 0;
        border-top: 2px solid #f0f1f2;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        min-height: 0;
    }
    .pw-tree-header {
        padding: 8px 12px;
        font-size: .78rem;
        font-weight: 900;
        color: #0a0a0a;
        background: #f8f9fa;
        border-bottom: 1.5px solid #e2e8f0;
        flex-shrink: 0;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
        flex-wrap: wrap;
    }
    .pw-tree-selected-badge {
        font-size: .62rem;
        font-weight: 700;
        color: #7c3aed;
        background: rgba(124,58,237,0.08);
        border: 1px solid rgba(124,58,237,0.25);
        border-radius: 2px;
        padding: 2px 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 140px;
    }
    .pw-tree-scroll {
        overflow-y: auto;
        flex: 1;
        padding: 4px 2px 6px;
        min-height: 120px;
        max-height: 38vh;
        background: #fff;
    }
    .pw-tree-scroll::-webkit-scrollbar { width: 5px; }
    .pw-tree-scroll::-webkit-scrollbar-thumb { background: #c8cdd4; border-radius: 2px; }

    /* tree footer (shows selected parent + clear) */
    .pw-tree-footer {
        flex-shrink: 0;
        padding: 8px 12px;
        background: rgba(124,58,237,0.06);
        border-top: 1.5px solid rgba(124,58,237,0.2);
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        direction: rtl;
    }
    .pw-tree-footer-name {
        flex: 1;
        font-size: .72rem;
        font-weight: 700;
        color: #7c3aed;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .pw-tree-footer-clear {
        padding: 3px 10px;
        border-radius: 2px;
        border: 1.5px solid rgba(124,58,237,0.3);
        background: rgba(124,58,237,0.08);
        color: #7c3aed;
        font-size: .68rem;
        font-weight: 700;
        cursor: pointer;
        font-family: inherit;
        transition: background .13s;
        white-space: nowrap;
    }
    .pw-tree-footer-clear:hover { background: rgba(124,58,237,0.16); }

    /* base row */
    .pw-tree-row {
        display: flex;
        align-items: flex-start;
        gap: 4px;
        padding: 4px 10px 4px 4px;
        cursor: pointer;
        direction: rtl;
        transition: background .11s;
        border-right: 3px solid transparent;
        text-align: right;
        line-height: 1.55;
        user-select: none;
    }
    .pw-tree-row:hover { background: rgba(8,101,168,0.05); }
    .pw-tree-row.active { background: rgba(124,58,237,0.09); border-right-color: #7c3aed; }

    /* depth 0 — root */
    .pw-tree-d0 { font-size: .78rem; font-weight: 900; color: #0a0a0a; background: #f0f4f8; border-bottom: 1px solid #d0d3d8; }
    .pw-tree-d0:hover { background: #e4eaf2; }
    .pw-tree-d0.active { background: #dce8f4; border-right-color: #0865a8; }
    /* depth 1 — parent */
    .pw-tree-d1 { font-size: .75rem; font-weight: 800; color: #1a3a5c; background: #f7f9fc; border-bottom: 1px solid #eaecef; }
    .pw-tree-d1:hover { background: #edf2f9; }
    .pw-tree-d1.active { background: #dce8f4; border-right-color: #0865a8; }
    /* depth 2 — sub */
    .pw-tree-d2 { font-size: .73rem; font-weight: 700; color: #374151; }
    .pw-tree-d2:hover { background: rgba(8,101,168,0.05); }
    .pw-tree-d2.active { background: rgba(124,58,237,0.09); border-right-color: #7c3aed; }
    /* depth 3 — leaf */
    .pw-tree-d3 { font-size: .7rem; font-weight: 400; color: #555f6e; }
    .pw-tree-d3:hover { background: rgba(245,124,0,0.04); }
    .pw-tree-d3.active { background: rgba(245,124,0,0.09); border-right-color: #f57c00; color: #bf5200; font-weight: 600; }

    .pw-tree-children { border-right: 1.5px solid #e2e8f0; margin-right: 18px; }
    .pw-tree-children.pw-children-d0 { border-right-color: #c8d8ea; }
    .pw-tree-children.pw-children-d1 { border-right-color: #dde6ef; }
    .pw-tree-children.pw-children-d2 { border-right-color: #eaeef2; }
    .pw-tree-toggle { flex-shrink:0; width:16px; font-size:.72rem; color:#6b7280; text-align:center; margin-top:1px; }
    .pw-tree-label  { flex: 1; }

    /* ── Files section ── */
    .pw-files-section { background:#f8f9fa; border:1.5px solid #d0d3d8; border-radius:3px; overflow:hidden; margin-top:4px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
    .pw-files-hdr { display:flex; align-items:center; gap:10px; padding:12px 16px; background:#044478; border-bottom:1.5px solid rgba(245,124,0,0.3); position:relative; overflow:hidden; }
    .pw-files-hdr::before { content:''; position:absolute; inset:0; background-image:linear-gradient(rgba(245,124,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(245,124,0,0.06) 1px,transparent 1px); background-size:28px 28px; pointer-events:none; }
    .pw-files-icon  { font-size:1.2rem; position:relative; z-index:1; }
    .pw-files-title { font-size:.84rem; font-weight:900; color:#fff; position:relative; z-index:1; }
    .pw-files-sub   { font-size:.68rem; color:rgba(255,255,255,.45); margin-top:2px; position:relative; z-index:1; }
    .pw-files-body  { display:flex; gap:18px; padding:16px; flex-wrap:wrap; }
    .pw-files-form  { display:flex; flex-direction:column; gap:11px; flex:1; min-width:220px; }
    .pw-files-actions { display:flex; gap:7px; flex-wrap:wrap; align-items:center; padding-top:6px; }
    .pw-select-file-btn { padding:7px 12px; border-radius:3px; border:1.5px solid #d0d3d8; background:#f0f1f2; font-family:inherit; font-size:.74rem; font-weight:700; cursor:pointer; color:#374151; white-space:nowrap; transition:all .14s; flex-shrink:0; }
    .pw-select-file-btn:hover { border-color:#f57c00; color:#f57c00; background:rgba(245,124,0,0.06); }
    .pw-files-table-wrap { flex:1; min-width:200px; border:1.5px solid #d0d3d8; border-radius:3px; overflow:hidden; background:#fff; align-self:flex-start; }
    .pw-files-tbl { width:100%; border-collapse:collapse; direction:rtl; font-family:inherit; }
    .pw-files-tbl thead th { background:#374151; color:#fff; padding:8px 14px; font-size:.74rem; font-weight:700; text-align:right; border-bottom:2px solid #f57c00; white-space:nowrap; }
    .pw-files-tbl tbody tr { border-bottom:1px solid #f0f1f2; cursor:pointer; transition:background .12s; }
    .pw-files-tbl tbody tr:last-child { border-bottom:none; }
    .pw-files-tbl tbody tr:hover  { background:rgba(8,101,168,0.05); }
    .pw-files-tbl tbody tr.active { background:rgba(124,58,237,0.08); border-right:3px solid #7c3aed; }
    .pw-files-tbl tbody tr:nth-child(even) { background:#fafbfc; }
    .pw-files-tbl tbody tr:nth-child(even):hover  { background:rgba(8,101,168,0.05); }
    .pw-files-tbl tbody tr.active:nth-child(even) { background:rgba(124,58,237,0.08); }
    .pw-files-tbl td { padding:8px 14px; font-size:.74rem; color:#374151; text-align:right; }
    .adm-mode-badge{display:inline-block;padding:2px 10px;border-radius:999px;font-size:.66rem;font-weight:700}
.adm-mode-badge.online{background:#e0f2fe;color:#0369a1}
.adm-mode-badge.inperson{background:#dcfce7;color:#15803d}
.adm-mode-badge.none{background:#f3f4f6;color:#6b7280}
    .adm-md { font-size:clamp(.6rem,1vw,.66rem); color:${a.gray300}; margin-top:4px; }
    /* ══ RESPONSIVE 300px → 2000px ══ */

    /* ≥ 2000px */
    @media(min-width:2000px){
        .pw-left-panel        { width: 380px; }
        .pw-records-list      { max-height: 28vh; }
        .pw-tree-scroll       { max-height: 44vh; }
        .pw-parent-id-sel     { width: 100px !important; flex-basis: 100px; }
        .pw-files-body        { gap: 28px; padding: 24px; }
    }

    /* 1600px – 1999px */
    @media(min-width:1600px) and (max-width:1999px){
        .pw-left-panel        { width: 340px; }
        .pw-tree-scroll       { max-height: 42vh; }
    }

    /* 1200px – 1599px  — default desktop, nothing extra */

    /* ≤ 1100px */
    @media(max-width:1100px){
        .pw-left-panel        { width: clamp(210px,26vw,270px); }
        .pw-tree-scroll       { max-height: 34vh; }
    }

    /* ≤ 900px — stack vertically */
    @media(max-width:900px){
        .pw-left-panel        { width: 100% !important; height: auto !important; max-height: none !important; position: static !important; }
        .pw-records-list      { display:flex; flex-direction:row; flex-wrap:nowrap; overflow-x:auto; overflow-y:hidden; max-height:82px; gap:6px; padding:6px 8px 10px; }
        .pw-records-list::-webkit-scrollbar { height:4px; width:unset; }
        .pw-records-list::-webkit-scrollbar-thumb { background:rgba(245,124,0,0.35); border-radius:2px; }
        .lec-row              { flex:0 0 auto; width:clamp(160px,44vw,220px); margin-bottom:0; }
        .pw-tree-scroll       { max-height: 220px; }
        .pw-files-body        { flex-direction: column; }
        .pw-parent-wrap       { flex-wrap: wrap; }
        .pw-parent-id-sel     { width: 70px !important; flex-basis: 70px; }
    }

    /* ≤ 640px */
    @media(max-width:640px){
        .pw-records-list      { max-height: 74px; }
        .lec-row              { width: clamp(150px,54vw,200px); }
        .pw-tree-scroll       { max-height: 180px; }
        .pw-tree-header       { font-size: .72rem; padding: 7px 10px; }
        .pw-tree-selected-badge { max-width: 100px; }
        .pw-files-form        { min-width: unset; }
        .pw-files-actions     { flex-direction: column; align-items: stretch; }
        .pw-files-actions .lec-act-btn { width: 100%; justify-content: center; }
        .pw-parent-wrap       { flex-direction: column; gap: 6px; }
        .pw-parent-id-sel     { width: 100% !important; flex-basis: auto; }
        .pw-parent-clear      { width: 100%; justify-content: center; height: auto; }
    }

    /* ≤ 480px */
    @media(max-width:480px){
        .pw-records-list      { max-height: 68px; }
        .lec-row              { width: clamp(140px,60vw,185px); }
        .pw-tree-scroll       { max-height: 150px; }
        .pw-files-body        { padding: 10px; gap: 10px; }
        .pw-tree-footer       { padding: 6px 10px; }
        .pw-tree-footer-name  { font-size: .66rem; }
        .pw-files-title       { font-size: .76rem; }
        .pw-files-sub         { font-size: .62rem; }
        .pw-select-file-btn   { font-size: .68rem; padding: 6px 9px; }
    }

    /* ≤ 380px — very small */
    @media(max-width:380px){
        .pw-records-list      { max-height: 62px; }
        .lec-row              { width: clamp(130px,65vw,175px); }
        .pw-tree-scroll       { max-height: 120px; }
        .pw-tree-header       { font-size: .68rem; }
        .pw-files-hdr         { padding: 9px 11px; }
        .pw-files-body        { padding: 8px; gap: 8px; }
        .pw-parent-id-sel     { font-size: .7rem !important; }
    }

    /* ≤ 320px */
    @media(max-width:320px){
        .pw-records-list      { max-height: 56px; }
        .pw-tree-scroll       { max-height: 100px; }
        .pw-files-body        { padding: 6px; }
    }

`;function Fr(){if(document.getElementById("adm-styles"))return;const t=document.createElement("style");t.id="adm-styles",t.textContent=Ir,document.head.appendChild(t)}function Be(t){if(!t)return"";try{const r=new Date(t);return isNaN(r.getTime())?String(t):r.toISOString().split("T")[0]}catch{return String(t)}}function Fa(t){return t?{pending:"Pending",approved:"Approved",sent:"Sent",sent_to_bank:"Sent",rejected:"Rejected"}[String(t).toLowerCase()]??t:"Pending"}function Vt(t){const r=(t==null?void 0:t.attendanceMode)??(t==null?void 0:t.AttendanceMode)??(t==null?void 0:t.attendanceType)??(t==null?void 0:t.AttendanceType)??(t==null?void 0:t.attendMode)??(t==null?void 0:t.mode)??(t==null?void 0:t.isOnline)??(t==null?void 0:t.IsOnline)??null;if(r==null||r==="")return null;if(typeof r=="boolean")return r?"online":"inperson";const s=String(r).trim().toLowerCase();return["online","أونلاين","اونلاين","اون لاين","عن بعد","remote","virtual","1","true"].includes(s)?"online":["inperson","in-person","in_person","onsite","offline","حضوري","حضورى","0","false"].includes(s)?"inperson":null}const ya={online:{label:"💻 أونلاين",text:"أونلاين",cls:"online"},inperson:{label:"🏫 حضوري",text:"حضوري",cls:"inperson"},none:{label:"— لم يُحدَّد",text:"لم يُحدَّد",cls:"none"}};function ct(t){return ya[t]??ya.none}function Ne(t,r){return{headers:[...t].reverse(),rows:r.map(s=>[...s].reverse())}}function Pa(t,r){const s=URL.createObjectURL(t),l=document.createElement("a");l.href=s,l.download=r,document.body.appendChild(l),l.click(),document.body.removeChild(l),setTimeout(()=>URL.revokeObjectURL(s),1e4)}let ut=null;function qt(t){return new Promise(r=>{if(ut){r(ut);return}const s=new Image;s.crossOrigin="anonymous",s.onload=()=>{try{const l=document.createElement("canvas");l.width=s.naturalWidth||300,l.height=s.naturalHeight||200,l.getContext("2d").drawImage(s,0,0),ut=l.toDataURL("image/png"),r(ut)}catch{r(null)}},s.onerror=()=>r(null),s.src=t})}function Pr(t){return{id:t.id,username:t.username??t.email??"",firstName:t.firstName??t.first_name??(t.username??"").split(" ")[0]??"",lastName:t.lastName??t.last_name??(t.username??"").split(" ").slice(1).join(" ")??"",email:t.email??"",phone:t.phone??"",enrolledCourses:(t.courses??[]).map(r=>({enrollmentId:r.enrollmentId,id:r.planworkId??r.PlanworkId??r.planwork_id??r.courseId??r.serviceId??null,title:r.title??r.serviceTitle??"—",date:Be(r.enrolledAt),attended:!!r.attended,attendanceMode:Vt(r),isOnline:r.isOnline??r.IsOnline,certificateUrl:r.certificateUrl??null,certificateName:r.certificateName??null,_userId:t.id,_titleRaw:r.title??r.serviceTitle??""}))}}function Rr(t){return{id:t.id,title:t.serviceTitle??t.title??"—",category:t.category??t.type??"",enrolledUsers:(t.users??[]).map(r=>{const s=(r.username??"").trim().split(" ");return{enrollmentId:r.enrollmentId??null,id:r.id??r.userId??null,username:r.username??r.email??"",firstName:r.firstName??s[0]??"",lastName:r.lastName??s.slice(1).join(" ")??"",email:r.email??"",phone:r.phone??"",date:Be(r.enrolledAt),attended:!!(r.attended??!1),attendanceMode:Vt(r),isOnline:r.isOnline??r.IsOnline,certificateUrl:r.certificateUrl??null,certificateName:r.certificateName??null}})}}function wa(t){return{id:t.id??t.Id,refNumber:t.refNumber??t.RefNumber??t.ref_number??"",orderId:t.orderId??t.OrderId??t.order_id??"",userId:t.userId??t.UserId??t.user_id,courseId:t.planworkId??t.PlanworkId??t.planwork_id??t.courseId??t.CourseId,enrollmentId:t.enrollmentId??t.EnrollmentId??null,attendanceMode:Vt(t),isOnline:t.isOnline??t.IsOnline,amount:t.amount??t.Amount??0,currency:t.currency??t.Currency??"EGP",reason:t.reason??t.Reason??"",details:t.details??t.Details??t.notes??"",status:Fa(t.status??t.Status??"Pending"),bankName:t.bankName??t.BankName??t.bank_name??"",accountNumber:t.accountNumber??t.AccountNumber??t.account_number??"",accountHolder:t.accountHolder??t.AccountHolder??t.account_holder??"",iban:t.iban??t.IBAN??"",adminNote:t.adminNote??t.AdminNote??"",rejectionReason:t.rejectionReason??t.RejectionReason??"",requestedAt:Be(t.requestedAt??t.RequestedAt??t.createdAt??t.CreatedAt),approvedAt:Be(t.approvedAt??t.ApprovedAt),sentAt:Be(t.sentAt??t.SentAt),rejectedAt:Be(t.rejectedAt??t.RejectedAt),bankResult:t.bankResult??t.BankResult??null}}const we="/assets/white-CuNsRP6o.webp";function Or({user:t,activeTab:r,tabs:s,totalCerts:l,pendingRefunds:i,onTabChange:o,open:p=!1,onClose:c=()=>{}}){var j,w;return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`adm-backdrop${p?" show":""}`,onClick:c}),e.jsxs("aside",{className:`adm-sidebar${p?" open":""}`,children:[e.jsxs("div",{className:"adm-sidebar-brand",children:[e.jsx("img",{src:we,alt:"ICEMT",className:"adm-sb-logo"}),e.jsxs("div",{className:"adm-sb-title",children:[e.jsx("div",{className:"adm-sb-name",children:"ICEMT"}),e.jsx("div",{className:"adm-sb-sub",children:"لوحة التحكم الإدارية"})]}),e.jsx("button",{className:"adm-sb-close",onClick:c,"aria-label":"إغلاق القائمة",children:"✕"})]}),e.jsxs("div",{className:"adm-sidebar-user",children:[e.jsxs("div",{className:"adm-su-av",children:[((j=t==null?void 0:t.firstName)==null?void 0:j[0])||"م",((w=t==null?void 0:t.lastName)==null?void 0:w[0])||""]}),e.jsxs("div",{className:"adm-su-info",children:[e.jsxs("div",{className:"adm-su-name",children:[t==null?void 0:t.firstName," ",t==null?void 0:t.lastName]}),e.jsx("div",{className:"adm-su-role",children:"🔐 مدير النظام"})]})]}),e.jsxs("nav",{className:"adm-sidebar-nav",children:[e.jsx("div",{className:"adm-nav-label",children:"القائمة الرئيسية"}),s.map(b=>e.jsxs("button",{title:b.label,className:`adm-nav-btn${r===b.id?" active":""}`,onClick:()=>{o(b.id),c()},children:[e.jsx("span",{className:"adm-nav-icon",children:b.icon}),e.jsx("span",{className:"adm-nav-txt",children:b.label}),b.id==="certificates"&&l>0&&e.jsx("span",{className:"adm-nav-badge",children:l}),b.id==="refunds"&&i>0&&e.jsx("span",{className:"adm-nav-badge pulse",children:i})]},b.id))]}),e.jsxs("div",{className:"adm-sidebar-footer",children:["المعهد التكنولوجي لهندسة التشييد والإدارة © ",new Date().getFullYear()]})]})]})}function Lr({activeTab:t}){const r=mr[t]??{tag:"لوحة الإدارة",title:["",""]},[s,l,i]=r.title;return e.jsxs("div",{className:"adm-page-hero",children:[e.jsx("div",{className:"adm-hero-accent"}),e.jsxs("div",{className:"adm-hero-content",children:[e.jsx("div",{className:"adm-hero-tag",children:r.tag}),e.jsxs("h1",{className:"adm-hero-title",children:[s," ",e.jsx("span",{children:l}),i]}),e.jsx("div",{className:"adm-hero-date",children:new Date().toLocaleDateString("ar-EG",{weekday:"long",year:"numeric",month:"long",day:"numeric"})})]})]})}const Dr=[{key:"users",label:"المستخدمون",icon:"👤",blue:!1},{key:"courses",label:"الدورات",icon:"📚",blue:!0},{key:"enrollments",label:"التسجيلات",icon:"🔗",blue:!1},{key:"attended",label:"حضروا",icon:"🎓",blue:!0},{key:"certificates",label:"الشهادات",icon:"📜",blue:!1},{key:"refundsPending",label:"المستردات",icon:"💳",blue:!0}];function Mr({stats:t}){return e.jsx("div",{className:"adm-stats",children:Dr.map(r=>e.jsxs("div",{className:`adm-sc${r.blue?" blue":""}`,children:[e.jsxs("div",{className:"adm-sc-ring",children:[e.jsx("div",{className:"adm-sc-icon",children:r.icon}),e.jsx("div",{className:"adm-sc-val",children:t[r.key]})]}),e.jsx("div",{className:"adm-sc-lbl",children:r.label})]},r.key))})}function rt(t,{fontSize:r=12,bold:s=!1,color:l="#111111",width:i=200,height:o=30,bgColor:p=null,align:c="right"}={}){const w=document.createElement("canvas");w.width=Math.round(i*3),w.height=Math.round(o*3);const b=w.getContext("2d");b.scale(3,3),p&&(b.fillStyle=p,b.fillRect(0,0,i,o));const h=`${s?"bold ":""}${r}px "Cairo","Amiri","Noto Naskh Arabic","Noto Sans Arabic","Noto Kufi Arabic","Tahoma","Arial Unicode MS","Arial",sans-serif`;b.font=h,b.direction="rtl",b.textAlign=c==="center"?"center":c==="left"?"left":"right",b.textBaseline="middle",b.fillStyle=l;const d=6;let v=c==="right"?i-d:c==="left"?d:i/2;const I=String(t??"");let P=I;const _=i-d*2;if(b.measureText(P).width>_){let U=0,R=I.length;for(;U<R;){const y=Math.floor((U+R+1)/2);b.measureText(I.slice(0,y)+"…").width<=_?U=y:R=y-1}P=I.slice(0,U)+"…"}return b.fillText(P,v,o/2),w.toDataURL("image/png")}function va(t,r,s,l){let i=String(t[s]??"").length;for(const o of r){const p=String(o[s]??"").length;p>i&&(i=p)}return Math.min(i+6,l)}async function We(t,r,s,l,i){const o=new Date().toLocaleDateString("ar-EG");try{const{default:b}=await ot(async()=>{const{default:R}=await import("./vendor-export-DY9zrLY-.js").then(y=>y.e);return{default:R}},__vite__mapDeps([0,1])),h=new b.Workbook;h.views=[{rightToLeft:!0}];const d=h.addWorksheet("التقرير",{views:[{rightToLeft:!0}]});d.columns=s.map((R,y)=>({width:va(s,l,y,50)}));const v=await qt(i);if(v){const R=h.addImage({base64:v.split(",")[1],extension:"png"});d.addImage(R,{tl:{col:0,row:0},br:{col:2,row:5}})}d.mergeCells(1,1,2,s.length);const I=d.getCell("A1");I.value=r,I.font={bold:!0,size:18,color:{argb:"FFFFFFFF"}},I.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FF0865A8"}},I.alignment={horizontal:"center",vertical:"middle",readingOrder:"rightToLeft"},d.getRow(1).height=42,d.getRow(2).height=10,d.mergeCells(3,1,3,s.length);const P=d.getCell("A3");P.value=`تاريخ التقرير: ${o}`,P.font={italic:!0,size:10,color:{argb:"FF555555"}},P.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FFF0F4F8"}},P.alignment={horizontal:"center",readingOrder:"rightToLeft"},d.getRow(3).height=20;const _=d.addRow(s);_.height=28,_.eachCell(R=>{R.font={bold:!0,size:11,color:{argb:"FFFFFFFF"}},R.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FF0865A8"}},R.alignment={horizontal:"center",vertical:"middle",readingOrder:"rightToLeft"},R.border={bottom:{style:"medium",color:{argb:"FFF57C00"}}}}),l.forEach((R,y)=>{const z=d.addRow(R);z.height=20;const O=y%2!==0;z.eachCell({includeEmpty:!0},(V,F)=>{V.alignment={horizontal:F===s.length?"center":"right",readingOrder:"rightToLeft"},O&&(V.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FFF7F9FC"}});const E={style:"thin",color:{argb:"FFD0D0D0"}};V.border={top:E,bottom:E,left:E,right:E}})});const U=await h.xlsx.writeBuffer();Pa(new Blob([U],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),t);return}catch{}const p=await ot(()=>import("./vendor-export-DY9zrLY-.js").then(b=>b.x),__vite__mapDeps([0,1])),c=[[r,...Array(s.length-1).fill("")],[`تاريخ التقرير: ${o}`,...Array(s.length-1).fill("")],[],s,...l],j=p.utils.aoa_to_sheet(c);j["!cols"]=s.map((b,h)=>({wch:va(s,l,h,55)})),j["!merges"]=[{s:{r:0,c:0},e:{r:0,c:s.length-1}},{s:{r:1,c:0},e:{r:1,c:s.length-1}}];const w=p.utils.book_new();w.Workbook={Views:[{RTL:!0}]},p.utils.book_append_sheet(w,j,"التقرير"),p.writeFile(w,t)}async function _e(t,r,s,l,i="",o){const p=await qt(o),c=new Date().toLocaleDateString("ar-EG"),j=await ot(()=>import("./vendor-export-DY9zrLY-.js").then(y=>y.j),__vite__mapDeps([0,1])),w=j.default||j.jsPDF,{default:b}=await ot(async()=>{const{default:y}=await import("./vendor-export-DY9zrLY-.js").then(z=>z.a);return{default:y}},__vite__mapDeps([0,1])),h=new w({orientation:"landscape",unit:"mm",format:"a4"}),d=h.internal.pageSize.getWidth(),v=h.internal.pageSize.getHeight(),I=[8,101,168],P=[245,124,0],_="المعهد التكنولوجى لهندسة التشييد والإدارة",U=()=>{if(h.setFillColor(...I),h.rect(0,0,d,34,"F"),h.setFillColor(...P),h.rect(0,34,d,2.5,"F"),p){h.setFillColor(255,255,255),h.roundedRect(5,4,36,26,3,3,"F");try{h.addImage(p,"PNG",6,5,34,24)}catch{}}const y=rt(r,{fontSize:17,bold:!0,color:"#FFFFFF",width:520,height:44,align:"center"});if(h.addImage(y,"PNG",d/2-85,3,170,17),i){const O=rt(i,{fontSize:9,color:"#CCE4FF",width:400,height:28,align:"center"});h.addImage(O,"PNG",d/2-55,21,110,9)}const z=rt(c,{fontSize:8,color:"#BBDAFF",width:160,height:22,align:"right"});h.addImage(z,"PNG",d-58,25,52,7)};U();const R=s.length-1;b(h,{startY:40,head:[s],body:l.map(y=>y.map(z=>String(z??""))),theme:"grid",styles:{font:"helvetica",fontSize:.01,textColor:[255,255,255,0],cellPadding:{top:2,bottom:2,left:2,right:2},lineColor:[218,218,218],lineWidth:.3,minCellHeight:10,valign:"middle"},headStyles:{fillColor:I,textColor:[255,255,255,0],minCellHeight:12,lineColor:P,lineWidth:{bottom:1.2,top:.3,left:.3,right:.3}},alternateRowStyles:{fillColor:[240,246,251]},columnStyles:{[R]:{cellWidth:14,halign:"center"}},margin:{top:40,left:8,right:8,bottom:16},didDrawCell:y=>{const z=String(y.cell.raw??"");if(!(z!=null&&z.trim()))return;const{x:O,y:V,width:F,height:E}=y.cell,u=y.section==="head",M=y.column.index===y.table.columns.length-1,G=rt(z,{fontSize:u?10:9,bold:u,color:u?"#FFFFFF":"#1A1A1A",width:Math.max(Math.round(F*3.8),50),height:Math.max(Math.round(E*3.8),20),align:M?"center":"right"});try{h.addImage(G,"PNG",O+.5,V+.3,F-1,E-.6)}catch{}},didDrawPage:y=>{y.pageNumber>1&&U();const z=h.internal.getNumberOfPages();h.setFillColor(245,247,250),h.rect(0,v-12,d,12,"F"),h.setDrawColor(...P),h.setLineWidth(.5),h.line(8,v-12,d-8,v-12);const O=(V,F,E)=>rt(V,{fontSize:7.5,color:"#555555",width:F,height:18,align:E});h.addImage(O(_,340,"right"),"PNG",8,v-10.5,90,6),h.addImage(O(`${y.pageNumber} / ${z}`,110,"center"),"PNG",d/2-18,v-10.5,36,6),h.addImage(O(c,160,"left"),"PNG",d-56,v-10.5,48,6)}}),h.save(t)}async function Ue(t,r,s,l,i,o){const p=new Date().toLocaleDateString("ar-EG"),c=await qt(o);let j=null,w=90,b=60;c&&(j=c.split(",")[1],await new Promise(T=>{const L=new Image;L.onload=()=>{L.naturalHeight>0&&(b=60,w=Math.round(L.naturalWidth/L.naturalHeight*b)),T()},L.onerror=T,L.src=c}));const h=await ot(()=>import("./vendor-export-DY9zrLY-.js").then(T=>T.i),__vite__mapDeps([0,1])),{Document:d,Packer:v,Paragraph:I,TextRun:P,Table:_,TableRow:U,TableCell:R,AlignmentType:y,WidthType:z,ShadingType:O,BorderStyle:V,VerticalAlign:F,PageOrientation:E,ImageRun:u}=h,M=13440,G=l.length-1,B=Math.max(600,Math.floor(M*.05)),k=Math.floor((M-B)/Math.max(l.length-1,1)),Y=l.map((T,L)=>L===G?B:k),ie={top:{style:V.SINGLE,size:4,color:"D5E8F0"},bottom:{style:V.SINGLE,size:4,color:"D5E8F0"},left:{style:V.SINGLE,size:4,color:"D5E8F0"},right:{style:V.SINGLE,size:4,color:"D5E8F0"}},C=(T,{isHeader:L=!1,width:ae,center:f=!1,altRow:W=!1}={})=>new R({width:{size:ae,type:z.DXA},shading:{fill:L?"0865A8":W?"F0F6FB":"FFFFFF",type:O.CLEAR},borders:ie,margins:{top:80,bottom:80,left:120,right:120},verticalAlign:F.CENTER,children:[new I({bidirectional:!0,alignment:f?y.CENTER:y.RIGHT,children:[new P({text:String(T??""),bold:L,color:L?"FFFFFF":"1A1A1A",size:L?22:20,rtl:!0,font:{ascii:"Arial",hAnsi:"Arial",cs:"Arial"},language:{value:"ar-SA",eastAsia:"ar-SA"}})]})]}),A=[];if(j&&u)try{const T=atob(j),L=new Uint8Array(T.length);for(let ae=0;ae<T.length;ae++)L[ae]=T.charCodeAt(ae);A.push(new u({data:L,transformation:{width:w,height:b},type:"png"}),new P({text:"   ",size:28}))}catch{}const Z=new d({sections:[{properties:{page:{size:{width:15840,height:12240,orientation:E.LANDSCAPE},margin:{top:720,right:720,bottom:900,left:720}}},children:[new I({bidirectional:!0,alignment:y.CENTER,shading:{fill:"0865A8",type:O.CLEAR},border:{bottom:{style:V.THICK,size:18,color:"F57C00",space:6}},spacing:{before:0,after:80},children:[...A,new P({text:r,color:"FFFFFF",bold:!0,size:28,rtl:!0,font:{ascii:"Arial",hAnsi:"Arial",cs:"Arial"},language:{value:"ar-SA",eastAsia:"ar-SA"}}),...s?[new P({text:`  —  ${s}`,color:"D0E8FF",size:20,rtl:!0,font:{ascii:"Arial",hAnsi:"Arial",cs:"Arial"}})]:[]]}),new I({bidirectional:!0,alignment:y.RIGHT,spacing:{before:100,after:200},children:[new P({text:`تاريخ التقرير: ${p}   |   إجمالي السجلات: ${i.length}`,size:18,color:"555555",italics:!0,rtl:!0,font:{ascii:"Arial",hAnsi:"Arial",cs:"Arial"},language:{value:"ar-SA",eastAsia:"ar-SA"}})]}),new _({width:{size:M,type:z.DXA},columnWidths:Y,rows:[new U({tableHeader:!0,children:l.map((T,L)=>C(T,{isHeader:!0,width:Y[L],center:L===G}))}),...i.map((T,L)=>new U({children:T.map((ae,f)=>C(ae,{width:Y[f],center:f===G,altRow:L%2!==0}))}))]})]}]});let m;if(typeof v.toBlob=="function")m=await v.toBlob(Z);else{const T=await v.toBuffer(Z);m=new Blob([T],{type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"})}Pa(m,t)}function dt(t){const r=(t==null?void 0:t.isOnline)??(t==null?void 0:t.IsOnline);return r===!0?"أونلاين":r===!1?"حضوري":ct(t==null?void 0:t.attendanceMode).text}function Ot(t){const r=["#","الاسم الكامل","البريد الإلكتروني","رقم الموبايل","اسم الدورة","طريقة الحضور","تاريخ التسجيل"],s=[];let l=1;return t.forEach(i=>{const o=i.phone||"—";i.enrolledCourses.length?i.enrolledCourses.forEach((p,c)=>{const j=dt(p);s.push(c===0?[l++,`${i.firstName} ${i.lastName}`,i.email,o,p.title,j,p.date||"—"]:["","","","",p.title,j,p.date||"—"])}):s.push([l++,`${i.firstName} ${i.lastName}`,i.email,o,"—","—","—"])}),{headers:r,rows:s}}function Lt(t){const r=["#","اسم الدورة","الفئة","اسم المستخدم","البريد الإلكتروني","طريقة الحضور","تاريخ التسجيل"],s=[];let l=1;return t.forEach(i=>{i.enrolledUsers.length?i.enrolledUsers.forEach((o,p)=>{const c=dt(o);s.push(p===0?[l++,i.title,i.category,`${o.firstName} ${o.lastName}`,o.email,c,o.date||"—"]:["","","",`${o.firstName} ${o.lastName}`,o.email,c,o.date||"—"])}):s.push([l++,i.title,i.category,"—","—","—","—"])}),{headers:r,rows:s}}function Dt(t,r){const s=["#","اسم المستخدم","البريد الإلكتروني","الدورة","طريقة الحضور","الحضور"],l=t.map((i,o)=>[o+1,`${i.user.firstName||i.user.username} ${i.user.lastName}`.trim(),i.user.email,i.course.title,dt(i.course),r[String(i.course.enrollmentId)]?"حضر":"غائب"]);return{headers:s,rows:l}}function Mt(t,r,s){const l=["#","اسم المستخدم","البريد الإلكتروني","الدورة","طريقة الحضور","الحضور","الشهادة"],i=t.map((o,p)=>{const c=r[o.certKey]??(o.altKey?r[o.altKey]:void 0),j=!!s[String(o.enrollmentId)];return[p+1,`${o.user.firstName||o.user.username} ${o.user.lastName}`.trim(),o.user.email,o.course.title,dt(o.course),j?"حضر":"غائب",c?c.name&&c.name!=="uploaded"?c.name:"مرفوعة":"لم تُرفع"]});return{headers:l,rows:i}}function Bt(t,r,s){const l=["#","رقم الطلب","المستخدم","البريد الإلكتروني","الدورة","طريقة الحضور","المبلغ","العملة","الحالة","السبب","تاريخ الطلب"],i=t.map((o,p)=>{const c=r.find(d=>d.id===o.userId)??{firstName:"—",lastName:"",email:"—",enrolledCourses:[]},j=s.find(d=>d.id===o.courseId)??{title:"—"},w=qe[o.status]||qe.Pending,b=(c.enrolledCourses||[]).find(d=>o.enrollmentId!=null&&d.enrollmentId===o.enrollmentId||d.id===o.courseId),h=dt({isOnline:o.isOnline??(b==null?void 0:b.isOnline),attendanceMode:o.attendanceMode??(b==null?void 0:b.attendanceMode)});return[p+1,o.refNumber||o.id,`${c.firstName} ${c.lastName}`.trim(),c.email,j.title,h,o.amount,o.currency,w.label,o.reason||"",o.requestedAt||""]});return{headers:l,rows:i}}function Xe(t,r,s){return l=>async()=>{t(!0),s==null||s(),r(null);try{await l()}catch(i){r("فشل التصدير: "+((i==null?void 0:i.message)||"خطأ"))}finally{t(!1)}}}const Br="https://icemt.arabcont.com/api",Wt=new URL("/assets/black-DkODS4uD.webp",import.meta.url).href,yt={orange:"#f57c00",blue:"#0865a8",green:"#16a34a",purple:"#7c3aed"},ja=[yt.blue,yt.orange,yt.green,yt.purple,"#ec4899","#06b6d4","#f59e0b","#84cc16"],wt=15,Wr="التقرير المالي — إيرادات المعهد",_t=["#","اسم المستخدم","البريد الإلكتروني","الدورة","سعر الدورة (EGP)","تاريخ التسجيل","الحضور","إجمالي المستخدم (EGP)"],ka=["يناير","فبراير","مارس","إبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],_r=[{k:"all",l:"الكل"},{k:"today",l:"اليوم"},{k:"7",l:"آخر 7 أيام"},{k:"30",l:"آخر 30 يوم"},{k:"month",l:"هذا الشهر"},{k:"lastmonth",l:"الشهر الماضي"},{k:"year",l:"هذا العام"}];async function Ur(){var t,r,s;try{if((r=(t=window.parent)==null?void 0:t.Clerk)!=null&&r.session)return await window.parent.Clerk.session.getToken();if((s=window.Clerk)!=null&&s.session)return await window.Clerk.session.getToken();const l=document.cookie.match(/(?:^|;\s*)__session=([^;]+)/);if(l)return l[1]}catch{}return null}async function Gr(t){const r=await Ur(),s={};r&&(s.Authorization=`Bearer ${r}`);const l=await fetch(`${Br}${t}`,{headers:s});if(!l.ok)throw new Error(`HTTP ${l.status}`);return l.json()}function ye(t){return t==null||isNaN(Number(t))?"0":Number(t).toLocaleString("en-US")}function Kr(t){if(!t)return null;try{return new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}catch{return t}}function Me(t){const r=s=>String(s).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())}`}function Yr(t){const r=new Date,s=Me(r);if(t==="today")return[s,s];if(t==="7"){const l=new Date;return l.setDate(l.getDate()-6),[Me(l),s]}if(t==="30"){const l=new Date;return l.setDate(l.getDate()-29),[Me(l),s]}return t==="month"?[Me(new Date(r.getFullYear(),r.getMonth(),1)),s]:t==="lastmonth"?[Me(new Date(r.getFullYear(),r.getMonth()-1,1)),Me(new Date(r.getFullYear(),r.getMonth(),0))]:t==="year"?[Me(new Date(r.getFullYear(),0,1)),s]:["",""]}function Hr(t,r){const s=[];let l=1;return t.forEach(i=>{i.courses.forEach((o,p)=>{s.push(p===0?[l++,i.username,i.email,o.title,o.price,o.date||"—",o.attended==null?"—":o.attended?"حضر":"غائب",i.totalPaid]:["","","",o.title,o.price,o.date||"—",o.attended==null?"—":o.attended?"حضر":"غائب",""])})}),r.showRefunds?(s.push(["","","","","","","إجمالي الفترة (قبل المرتجعات)",r.gross]),s.push(["","","","","","","المرتجعات",r.refunds]),s.push(["","","","","","","الصافي",r.net])):s.push(["","","","","","","إجمالي المعروض",r.net]),s}const Jr=`
@import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700;900&display=swap');
.fin-wrap{direction:rtl;font-family:"Noto Kufi Arabic",sans-serif;}
.fin-income-hero{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;background:linear-gradient(135deg,#044478 0%,#073f6e 50%,#0a3a5c 100%);border-radius:6px;padding:clamp(20px,3vw,32px) clamp(20px,3.5vw,40px);margin-bottom:clamp(18px,2.5vw,24px);position:relative;overflow:hidden;box-shadow:0 8px 32px rgba(4,68,120,0.35);border:1.5px solid rgba(245,124,0,0.3);}
.fin-income-hero::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(245,124,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(245,124,0,0.06) 1px,transparent 1px);background-size:40px 40px;pointer-events:none;}
.fin-income-hero::after{content:'';position:absolute;top:0;right:0;width:5px;height:100%;background:linear-gradient(to bottom,#f57c00,#ff9a3c);}
.fin-total-label{font-size:clamp(.72rem,1.3vw,.82rem);color:rgba(255,255,255,.55);font-weight:700;margin-bottom:6px;}
.fin-total-amount{font-size:clamp(2rem,4.5vw,3.2rem);font-weight:900;color:#fff;line-height:1;letter-spacing:-1px;text-shadow:0 2px 12px rgba(245,124,0,0.35);}
.fin-total-amount .fin-currency{font-size:clamp(.9rem,1.8vw,1.3rem);color:#ff9a3c;margin-right:6px;font-weight:700;}
.fin-total-sub{font-size:clamp(.65rem,1.15vw,.74rem);color:rgba(255,255,255,.4);margin-top:4px;}
.fin-income-pills{display:flex;gap:10px;flex-wrap:wrap;position:relative;z-index:1;}
.fin-ip{display:flex;flex-direction:column;align-items:center;padding:12px 18px;border-radius:6px;min-width:110px;background:rgba(255,255,255,0.07);border:1.5px solid rgba(255,255,255,0.12);transition:all .2s;}
.fin-ip:hover{background:rgba(255,255,255,0.12);border-color:rgba(245,124,0,0.5);transform:translateY(-2px);}
.fin-ip-val{font-size:clamp(1rem,2.2vw,1.4rem);font-weight:900;color:#fff;}
.fin-ip-lbl{font-size:clamp(.58rem,1vw,.65rem);color:rgba(255,255,255,.5);margin-top:3px;font-weight:700;text-align:center;}
.fin-kpi-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-bottom:22px;}
@media(max-width:1100px){.fin-kpi-grid{grid-template-columns:repeat(3,1fr);}}
@media(max-width:680px){.fin-kpi-grid{grid-template-columns:repeat(2,1fr);}}
.fin-kpi{background:#fff;border-radius:6px;border:1.5px solid #d0d3d8;padding:16px;display:flex;flex-direction:column;gap:6px;box-shadow:0 2px 10px rgba(0,0,0,0.06);position:relative;overflow:hidden;transition:transform .25s,box-shadow .25s;}
.fin-kpi::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;}
.fin-kpi.orange::after{background:#f57c00;}.fin-kpi.blue::after{background:#0865a8;}.fin-kpi.green::after{background:#16a34a;}.fin-kpi.red::after{background:#dc2626;}.fin-kpi.purple::after{background:#7c3aed;}
.fin-kpi:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,0.1);}
.fin-kpi-icon{font-size:1.6rem;line-height:1;}
.fin-kpi-val{font-size:clamp(1rem,2.5vw,1.4rem);font-weight:900;line-height:1.1;word-break:break-all;}
.fin-kpi-lbl{font-size:.68rem;color:#6b7280;font-weight:700;}
.fin-kpi-sub{font-size:.62rem;color:#6b7280;}
.fin-charts-grid{display:grid;grid-template-columns:2fr 1fr;gap:20px;margin-bottom:22px;}
@media(max-width:900px){.fin-charts-grid{grid-template-columns:1fr;}}
.fin-charts-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:22px;}
@media(max-width:800px){.fin-charts-row{grid-template-columns:1fr;}}
.fin-chart-card{background:#fff;border-radius:6px;border:1.5px solid #d0d3d8;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.06);}
.fin-chart-hdr{padding:14px 20px 10px;border-bottom:1px solid #f0f1f2;}
.fin-chart-title{font-weight:900;font-size:.88rem;color:#0a0a0a;}
.fin-chart-sub{font-size:.65rem;color:#6b7280;}
.fin-chart-body{padding:14px 8px 8px;}
.fin-cb-row{display:flex;align-items:center;gap:12px;margin-bottom:8px;}
.fin-cb-name{font-size:.74rem;font-weight:700;color:#0a0a0a;min-width:clamp(100px,22vw,180px);max-width:clamp(100px,22vw,180px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right;}
.fin-cb-track{flex:1;height:8px;background:#f0f1f2;border-radius:4px;overflow:hidden;}
.fin-cb-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,#f57c00,#ff9a3c);transition:width .8s cubic-bezier(.4,0,.2,1);}
.fin-cb-fill.blue{background:linear-gradient(90deg,#0865a8,#1a84d4);}
.fin-cb-amt{font-size:.72rem;font-weight:900;color:#f57c00;min-width:75px;text-align:left;}
.fin-cb-count{font-size:.62rem;color:#6b7280;min-width:48px;text-align:left;}

/* ── Period filter ── */
.fin-period{display:flex;align-items:center;gap:14px;flex-wrap:wrap;background:#fff;border:1.5px solid #d0d3d8;border-right:4px solid #0865a8;border-radius:6px;padding:12px 18px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.06);}
.fin-period.on{border-right-color:#f57c00;background:#fffaf4;}
.fin-period-lbl{font-size:.78rem;font-weight:900;color:#0a0a0a;}
.fin-period-dates{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.fin-period-dates label{font-size:.7rem;font-weight:700;color:#6b7280;}
.fin-date{padding:7px 10px;border-radius:6px;border:1.5px solid #d0d3d8;background:#f0f1f2;color:#0a0a0a;font-family:"Noto Kufi Arabic",sans-serif;font-size:.76rem;outline:none;}
.fin-date:focus{border-color:#f57c00;background:#fff;box-shadow:0 0 0 3px rgba(245,124,0,0.1);}
.fin-presets{display:flex;gap:6px;flex-wrap:wrap;}
.fin-preset{padding:7px 12px;border-radius:4px;border:1.5px solid #d0d3d8;background:#f0f1f2;color:#374151;font-family:"Noto Kufi Arabic",sans-serif;font-size:.7rem;font-weight:700;cursor:pointer;transition:all .14s;}
.fin-preset:hover{border-color:#f57c00;color:#f57c00;}
.fin-preset.act{background:#0865a8;border-color:#0865a8;color:#fff;}
.fin-period-note{width:100%;font-size:.68rem;color:#6b7280;font-weight:700;}
.fin-period-note b{color:#bf5200;}

.fin-toolbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:18px;background:#fff;border:1.5px solid #d0d3d8;border-radius:6px;padding:12px 18px;box-shadow:0 2px 8px rgba(0,0,0,0.06);}
.fin-search-input{padding:9px 14px;border-radius:6px;border:1.5px solid #d0d3d8;background:#f0f1f2;color:#0a0a0a;font-family:"Noto Kufi Arabic",sans-serif;font-size:.8rem;outline:none;direction:rtl;transition:border .18s,box-shadow .18s;min-width:220px;}
.fin-search-input:focus{border-color:#f57c00;background:#fff;box-shadow:0 0 0 3px rgba(245,124,0,0.1);}
.fin-search-input::placeholder{color:#6b7280;}
.fin-sort-sel{padding:9px 12px;border-radius:6px;border:1.5px solid #d0d3d8;background:#f0f1f2;color:#0a0a0a;font-family:"Noto Kufi Arabic",sans-serif;font-size:.78rem;outline:none;cursor:pointer;}
.fin-expw{position:relative;}
.fin-expbtn{display:flex;align-items:center;gap:6px;padding:9px 20px;background:#f57c00;color:#fff;border:none;border-radius:6px;font-family:"Noto Kufi Arabic",sans-serif;font-size:.8rem;font-weight:700;cursor:pointer;white-space:nowrap;transition:all .22s;box-shadow:0 4px 14px rgba(245,124,0,0.3);}
.fin-expbtn:hover{background:#bf5200;transform:translateY(-2px);}
.fin-expbtn:disabled{opacity:.5;cursor:not-allowed;transform:none;}
.fin-expmenu{position:absolute;top:calc(100% + 6px);left:0;background:#fff;border:1.5px solid #d0d3d8;border-radius:6px;box-shadow:0 10px 32px rgba(0,0,0,0.12);overflow:hidden;z-index:400;min-width:200px;border-top:3px solid #f57c00;animation:fin-slide .15s ease;}
@keyframes fin-slide{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
.fin-expitem{display:flex;align-items:center;gap:9px;width:100%;padding:12px 18px;background:none;border:none;border-bottom:1px solid #f0f1f2;font-family:"Noto Kufi Arabic",sans-serif;font-size:.8rem;font-weight:700;color:#374151;direction:rtl;cursor:pointer;transition:background .12s,color .12s;}
.fin-expitem:last-child{border-bottom:none;}
.fin-expitem:hover{background:rgba(245,124,0,0.06);color:#f57c00;}
.fin-table-wrap{overflow-x:auto;}
.fin-tbl{width:100%;border-collapse:collapse;min-width:700px;}
.fin-tbl thead th{background:#044478;color:#fff;padding:14px 16px;font-family:"Noto Kufi Arabic",sans-serif;font-size:.76rem;font-weight:700;text-align:right;white-space:nowrap;border-bottom:3px solid #f57c00;}
.fin-tbl thead th.c{text-align:center;}
.fin-tbl thead th.gr{background:#16a34a;border-bottom-color:#86efac;}
.fin-tbl thead th.or{background:#f57c00;border-bottom-color:rgba(255,255,255,0.3);}
.fin-tbl tbody tr{border-bottom:1px solid #f0f1f2;transition:background .12s;}
.fin-tbl tbody tr:hover{background:rgba(8,101,168,0.04);}
.fin-tbl tbody tr:nth-child(even){background:#fafbfc;}
.fin-tbl td{padding:11px 16px;font-family:"Noto Kufi Arabic",sans-serif;font-size:.76rem;color:#374151;vertical-align:middle;}
.fin-tbl td.c{text-align:center;}
.fin-tbl .fin-xrow td{padding:0!important;border:none;}
.fin-xin{padding:14px 20px;background:rgba(8,101,168,0.03);border-top:2px solid rgba(8,101,168,0.08);}
.fin-course-chip{display:inline-flex;align-items:center;gap:7px;background:#fff;border:1.5px solid #d0d3d8;border-radius:4px;padding:7px 12px;margin:4px;font-size:.72rem;transition:border-color .15s;}
.fin-course-chip:hover{border-color:#f57c00;}
.fin-course-chip-name{font-weight:700;color:#0a0a0a;}
.fin-course-chip-price{font-weight:900;color:#16a34a;font-size:.78rem;}
.fin-user-total{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:3px;background:#f0fdf4;border:1.5px solid #86efac;font-size:.78rem;font-weight:900;color:#16a34a;}
.fin-pill{display:inline-block;padding:4px 12px;border-radius:3px;font-size:.7rem;font-weight:700;cursor:pointer;border:1.5px solid rgba(8,101,168,0.3);color:#0865a8;background:rgba(8,101,168,0.07);user-select:none;transition:all .14s;font-family:"Noto Kufi Arabic",sans-serif;}
.fin-pill:hover,.fin-pill.op{background:rgba(8,101,168,0.14);border-color:rgba(8,101,168,0.55);}
.fin-av{width:36px;height:36px;border-radius:6px;background:#0865a8;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:900;font-size:.68rem;flex-shrink:0;}
.fin-uc{display:flex;align-items:center;gap:9px;}
.fin-uname{font-weight:700;color:#0a0a0a;font-size:.8rem;}
.fin-email{font-size:.68rem;color:#6b7280;direction:ltr;display:block;}
.fin-pg{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;padding:14px 18px;border-top:1.5px solid #d0d3d8;background:#f0f1f2;font-family:"Noto Kufi Arabic",sans-serif;direction:rtl;}
.fin-pg-info{font-size:.72rem;color:#6b7280;font-weight:700;}
.fin-pg-info strong{color:#0a0a0a;}
.fin-card{background:#fff;border-radius:6px;border:1.5px solid #d0d3d8;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.06);position:relative;}
.fin-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(to left,#f57c00,#0865a8);z-index:2;}
.fin-section-hdr{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:20px;padding-bottom:14px;border-bottom:3px solid #f57c00;}
.fin-section-tag{display:inline-block;background:#0865a8;color:#fff;font-size:11px;font-weight:700;padding:4px 14px;border-radius:3px;margin-bottom:4px;}
.fin-section-title{font-size:clamp(15px,2vw,20px);font-weight:900;color:#0a0a0a;}
.fin-section-title span{color:#f57c00;}
.fin-err{background:#fef2f2;border:1.5px solid rgba(220,38,38,.3);color:#dc2626;border-radius:6px;padding:10px 14px;margin-bottom:14px;font-size:.76rem;display:flex;align-items:center;gap:9px;border-right:4px solid #dc2626;font-family:"Noto Kufi Arabic",sans-serif;}
.fin-ld{text-align:center;padding:60px 20px;}
.fin-sp{width:40px;height:40px;border:3px solid #d0d3d8;border-top-color:#0865a8;border-radius:50%;animation:fin-spin .7s linear infinite;margin:0 auto 16px;}
@keyframes fin-spin{to{transform:rotate(360deg)}}
.fin-ld p,.fin-empty p{color:#6b7280;font-size:.8rem;font-family:"Noto Kufi Arabic",sans-serif;text-align:center;padding:60px 20px;}
`;function Vr(){if(document.getElementById("fin-styles-v5"))return;const t=document.getElementById("fin-styles-v4");t&&t.remove();const r=document.createElement("style");r.id="fin-styles-v5",r.textContent=Jr,document.head.appendChild(r)}const Ut=({active:t,payload:r,label:s,suffix:l="EGP"})=>!t||!(r!=null&&r.length)?null:e.jsxs("div",{style:{background:"#fff",border:"1.5px solid #d0d3d8",borderRadius:6,padding:"10px 14px",boxShadow:"0 4px 16px rgba(0,0,0,0.12)",fontFamily:'"Noto Kufi Arabic",sans-serif',direction:"rtl",minWidth:140},children:[e.jsx("div",{style:{fontWeight:900,fontSize:".78rem",color:"#0a0a0a",marginBottom:6},children:s}),r.map((i,o)=>e.jsxs("div",{style:{fontSize:".74rem",color:i.color,fontWeight:700,display:"flex",gap:6,alignItems:"center"},children:[e.jsx("span",{style:{width:8,height:8,borderRadius:"50%",background:i.color,display:"inline-block"}}),ye(i.value)," ",l]},o))]}),qr=({active:t,payload:r})=>{if(!t||!(r!=null&&r.length))return null;const s=r[0];return e.jsxs("div",{style:{background:"#fff",border:"1.5px solid #d0d3d8",borderRadius:6,padding:"10px 14px",boxShadow:"0 4px 16px rgba(0,0,0,0.12)",fontFamily:'"Noto Kufi Arabic",sans-serif',direction:"rtl"},children:[e.jsx("div",{style:{fontWeight:900,fontSize:".76rem",color:"#0a0a0a",marginBottom:4},children:s.name}),e.jsxs("div",{style:{fontSize:".74rem",color:s.payload.fill,fontWeight:700},children:[ye(s.value)," EGP"]}),e.jsxs("div",{style:{fontSize:".65rem",color:"#6b7280"},children:[s.payload.percent,"% من الإجمالي"]})]})},Xr=({currentPage:t,totalItems:r,itemsPerPage:s,onPageChange:l})=>{const i=Math.ceil(r/s);if(i<=1)return null;const o=(t-1)*s+1,p=Math.min(t*s,r),c=[],j=2;for(let d=1;d<=i;d++)(d===1||d===i||d>=t-j&&d<=t+j)&&c.push(d);const w=[];let b=null;for(const d of c)b!==null&&d-b>1&&w.push("..."),w.push(d),b=d;const h=(d,v,I,P)=>e.jsx("button",{onClick:v,disabled:P,style:{minWidth:34,height:34,padding:"0 8px",borderRadius:4,border:I?"2px solid #0865a8":"1.5px solid #d0d3d8",background:I?"#0865a8":P?"#f0f1f2":"#fff",color:I?"#fff":P?"#d0d3d8":"#374151",fontFamily:'"Noto Kufi Arabic",sans-serif',fontSize:".78rem",fontWeight:700,cursor:P?"not-allowed":"pointer",opacity:P?.5:1,display:"inline-flex",alignItems:"center",justifyContent:"center"},children:d},d+Math.random());return e.jsxs("div",{className:"fin-pg",children:[e.jsxs("span",{className:"fin-pg-info",children:["عرض ",e.jsx("strong",{children:o}),"–",e.jsx("strong",{children:p})," من ",e.jsx("strong",{style:{color:"#0865a8"},children:r})]}),e.jsxs("div",{style:{display:"flex",gap:4,flexWrap:"wrap"},children:[h("«",()=>l(1),!1,t===1),h("‹",()=>l(t-1),!1,t===1),w.map((d,v)=>d==="..."?e.jsx("span",{style:{padding:"0 4px",color:"#d0d3d8"},children:"…"},"el"+v):h(d,()=>l(d),d===t,!1)),h("›",()=>l(t+1),!1,t===i),h("»",()=>l(i),!1,t===i)]})]})};function Zr({authFetch:t,API_BASE:r}){var Le;Vr();const[s,l]=n.useState(!0),[i,o]=n.useState([]),[p,c]=n.useState(null),[j,w]=n.useState(!1),[b,h]=n.useState(""),[d,v]=n.useState("total_desc"),[I,P]=n.useState(1),[_,U]=n.useState(null),[R,y]=n.useState(!1),[z,O]=n.useState(!1),[V,F]=n.useState(null),E=n.useRef(null),[u,M]=n.useState(""),[G,B]=n.useState(""),[k,Y]=n.useState("all"),ie=!!(u||G),C=N=>{const[re,he]=Yr(N);M(re),B(he),Y(N),P(1),U(null)},A=(N,re)=>{N==="from"?M(re):B(re),Y("custom"),P(1),U(null)};n.useEffect(()=>{const N=re=>{E.current&&!E.current.contains(re.target)&&O(!1)};return document.addEventListener("mousedown",N),()=>document.removeEventListener("mousedown",N)},[]),n.useEffect(()=>{let N=!1;w(!0);const re=new URLSearchParams;u&&re.set("from",u),G&&re.set("to",G);const he=re.toString()?`?${re}`:"";return(t&&r?t(`${r}/Financial/report${he}`).then(me=>{if(!me.ok)throw new Error(`HTTP ${me.status}`);return me.json()}):Gr(`/Financial/report${he}`)).then(me=>{N||(c(me),o([]))}).catch(me=>{N||o([`فشل تحميل التقرير المالي (${(me==null?void 0:me.message)||"خطأ"})`])}).finally(()=>{N||(l(!1),w(!1))}),()=>{N=!0}},[u,G,t,r]);const Z=(p==null?void 0:p.summary)||{},m=n.useMemo(()=>((p==null?void 0:p.rows)||[]).map(N=>({id:N.userId,username:N.username||N.email||"",email:N.email||"",courses:(N.courses||[]).map(re=>({title:re.title||"—",price:Number(re.price||0),date:Kr(re.paidAt),rawDate:re.paidAt,attended:re.attended,refunded:Number(re.refunded||0)})),totalPaid:Number(N.totalPaid||0)})),[p]),T=Number(Z.gross||0),L=Number(Z.refundsSent||0),ae=Number(Z.refundsPending||0),f=Number(Z.net||0),W=Number(Z.enrollments||0),q=Number(Z.refundsCount||0),Q=m.length>0?Math.round(f/m.length):0,ve=m.length>0?m.reduce((N,re)=>N.totalPaid>re.totalPaid?N:re):null,x=n.useMemo(()=>((p==null?void 0:p.courses)||[]).map(N=>({title:N.title||"—",total:Number(N.revenue||0),count:Number(N.count||0)})).sort((N,re)=>re.total-N.total),[p]),S=((Le=x[0])==null?void 0:Le.total)||1,K=n.useMemo(()=>{const N=x.slice(0,5),re=x.slice(5).reduce((be,me)=>be+me.total,0);return(re>0?[...N,{title:"أخرى",total:re,count:0}]:N).map((be,me)=>({name:be.title,value:be.total,fill:ja[me%ja.length],percent:T>0?Math.round(be.total/T*100):0}))},[x,T]),D=n.useMemo(()=>{const N=(p==null?void 0:p.monthly)||[],re=new Set(N.map(he=>he.year)).size>1;return[...N].sort((he,be)=>he.year*12+he.month-(be.year*12+be.month)).map(he=>({month:re?`${ka[he.month-1]} ${he.year}`:ka[he.month-1],revenue:Number(he.revenue||0),enrollments:Number(he.enrollments||0)}))},[p]),ne=b.toLowerCase(),se=[...m.filter(N=>`${N.username} ${N.email}`.toLowerCase().includes(ne)||N.courses.some(re=>re.title.toLowerCase().includes(ne)))].sort((N,re)=>d==="total_desc"?re.totalPaid-N.totalPaid:d==="total_asc"?N.totalPaid-re.totalPaid:d==="courses_desc"?re.courses.length-N.courses.length:N.username.localeCompare(re.username,"ar")),de=se.slice((I-1)*wt,I*wt),je=ie?`${u||"البداية"} ← ${G||"اليوم"}`:"كل الفترات",ge=`${Wr} (${je})`,$e=ie?`_${u||"start"}_${G||"now"}`:"",Te=N=>async()=>{y(!0),O(!1),F(null);try{await N()}catch(re){F("فشل التصدير: "+((re==null?void 0:re.message)||"خطأ"))}finally{y(!1)}},Se=()=>{const N=!!b.trim(),re=se.reduce((he,be)=>he+be.totalPaid,0);return Hr(se,{gross:T,refunds:L,net:N?re:f,showRefunds:!N})},Qe=()=>We(`التقرير-المالي${$e}.xlsx`,ge,_t,Se(),Wt),ze=()=>{const{headers:N,rows:re}=Ne(_t,Se());return _e(`التقرير-المالي${$e}.pdf`,ge,N,re,"",Wt)},Ge=()=>Ue(`التقرير-المالي${$e}.docx`,ge,"",_t,Se(),Wt),Ke=[{icon:"💰",val:`${ye(T)} EGP`,lbl:"إجمالي الإيرادات",sub:"قبل المرتجعات",cls:"orange",color:"#f57c00"},{icon:"🔻",val:`${ye(L)} EGP`,lbl:"إجمالي المرتجعات",sub:`${q} طلب مرتجع`,cls:"red",color:"#dc2626"},{icon:"✅",val:`${ye(f)} EGP`,lbl:"صافي الإيرادات",sub:"بعد خصم المرتجعات",cls:"green",color:"#16a34a"},{icon:"📚",val:W,lbl:"إجمالي الاشتراكات",sub:`عبر ${x.length} دورة`,cls:"blue",color:"#0865a8"},{icon:"👥",val:m.length,lbl:"العملاء الدافعون",sub:`متوسط ${ye(Q)} EGP`,cls:"purple",color:"#7c3aed"}];return s?e.jsx("div",{className:"fin-wrap",children:e.jsxs("div",{className:"fin-ld",children:[e.jsx("div",{className:"fin-sp"}),e.jsx("p",{children:"جاري تحميل البيانات المالية..."})]})}):e.jsxs("div",{className:"fin-wrap",children:[e.jsx("div",{className:"fin-section-hdr",children:e.jsxs("div",{children:[e.jsx("div",{className:"fin-section-tag",children:"التقارير المالية"}),e.jsxs("div",{className:"fin-section-title",children:["إيرادات ",e.jsx("span",{children:"المعهد"})]})]})}),i.map((N,re)=>e.jsxs("div",{className:"fin-err",children:["⚠️ ",N]},re)),e.jsxs("div",{className:`fin-period${ie?" on":""}`,children:[e.jsxs("span",{className:"fin-period-lbl",children:["📅 الفترة",j?" ⏳":""]}),e.jsxs("div",{className:"fin-period-dates",children:[e.jsx("label",{children:"من"}),e.jsx("input",{type:"date",className:"fin-date",value:u,max:G||void 0,onChange:N=>A("from",N.target.value)}),e.jsx("label",{children:"إلى"}),e.jsx("input",{type:"date",className:"fin-date",value:G,min:u||void 0,onChange:N=>A("to",N.target.value)})]}),e.jsx("div",{className:"fin-presets",children:_r.map(N=>e.jsx("button",{className:`fin-preset${k===N.k?" act":""}`,onClick:()=>C(N.k),children:N.l},N.k))}),ie&&e.jsxs("div",{className:"fin-period-note",children:["الأرقام والرسوم والتصدير كلها للفترة: ",e.jsx("b",{children:je}),ae>0&&e.jsxs(e.Fragment,{children:[" · مرتجعات موافق عليها ولم تُرسل بعد: ",e.jsx("b",{children:ye(ae)})," EGP"]})]})]}),e.jsxs("div",{className:"fin-income-hero",children:[e.jsxs("div",{style:{position:"relative",zIndex:1},children:[e.jsxs("div",{className:"fin-total-label",children:["✅ صافي الإيرادات ",ie?"للفترة":"الكلية"," (بعد المرتجعات)"]}),e.jsxs("div",{className:"fin-total-amount",children:[e.jsx("span",{className:"fin-currency",children:"EGP"}),ye(f)]}),e.jsxs("div",{className:"fin-total-sub",children:["من ",m.length," مستخدم · ",W," تسجيل",ie?` · ${je}`:""]})]}),e.jsx("div",{className:"fin-income-pills",children:[{label:"المستخدمون الدافعون",val:m.length,icon:"👤"},{label:"إجمالي التسجيلات",val:W,icon:"📚"},{label:"متوسط لكل مستخدم",val:`${ye(Q)} EGP`,icon:"📊"},{label:"إجمالي قبل المرتجعات",val:`${ye(T)} EGP`,icon:"📋"},{label:"إجمالي المرتجعات",val:`${ye(L)} EGP`,icon:"🔻"},...ve?[{label:"أعلى دافع",val:ve.username,icon:"🏆"}]:[]].map(N=>e.jsxs("div",{className:"fin-ip",children:[e.jsxs("div",{className:"fin-ip-val",children:[N.icon," ",N.val]}),e.jsx("div",{className:"fin-ip-lbl",children:N.label})]},N.label))})]}),e.jsx("div",{className:"fin-kpi-grid",children:Ke.map(N=>e.jsxs("div",{className:`fin-kpi ${N.cls}`,children:[e.jsx("div",{className:"fin-kpi-icon",children:N.icon}),e.jsx("div",{className:"fin-kpi-val",style:{color:N.color},children:N.val}),e.jsx("div",{className:"fin-kpi-lbl",children:N.lbl}),e.jsx("div",{className:"fin-kpi-sub",children:N.sub})]},N.lbl))}),D.length>0&&e.jsxs("div",{className:"fin-charts-grid",children:[e.jsxs("div",{className:"fin-chart-card",children:[e.jsxs("div",{className:"fin-chart-hdr",children:[e.jsx("div",{className:"fin-chart-title",children:"📈 الإيرادات الشهرية"}),e.jsx("div",{className:"fin-chart-sub",children:"تطور الإيرادات عبر الأشهر"})]}),e.jsx("div",{className:"fin-chart-body",children:e.jsx(xt,{width:"100%",height:240,children:e.jsxs(xr,{data:D,margin:{top:5,right:20,left:10,bottom:5},children:[e.jsx(Ft,{strokeDasharray:"3 3",stroke:"#f0f1f2"}),e.jsx(Pt,{dataKey:"month",tick:{fontFamily:'"Noto Kufi Arabic",sans-serif',fontSize:11,fill:"#6b7280"},axisLine:!1,tickLine:!1}),e.jsx(Rt,{tick:{fontSize:10,fill:"#6b7280"},axisLine:!1,tickLine:!1,tickFormatter:N=>ye(N),width:65}),e.jsx(ht,{content:e.jsx(Ut,{})}),e.jsx(hr,{type:"monotone",dataKey:"revenue",stroke:"#0865a8",strokeWidth:2.5,dot:{fill:"#0865a8",r:4,strokeWidth:2,stroke:"#fff"},activeDot:{r:6,fill:"#f57c00"}})]})})})]}),e.jsxs("div",{className:"fin-chart-card",children:[e.jsxs("div",{className:"fin-chart-hdr",children:[e.jsx("div",{className:"fin-chart-title",children:"🥧 توزيع إيرادات الدورات"}),e.jsx("div",{className:"fin-chart-sub",children:"نسبة كل دورة من الإجمالي"})]}),e.jsxs("div",{className:"fin-chart-body",style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx(xt,{width:"100%",height:180,children:e.jsxs(gr,{children:[e.jsx(br,{data:K,cx:"50%",cy:"50%",innerRadius:50,outerRadius:80,dataKey:"value",paddingAngle:3,children:K.map((N,re)=>e.jsx(gt,{fill:N.fill,stroke:"none"},re))}),e.jsx(ht,{content:e.jsx(qr,{})})]})}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center",padding:"0 10px 10px"},children:K.map(N=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5,fontSize:".62rem",fontFamily:'"Noto Kufi Arabic",sans-serif',color:"#374151"},children:[e.jsx("span",{style:{width:10,height:10,borderRadius:2,background:N.fill,display:"inline-block",flexShrink:0}}),N.name.slice(0,18),N.name.length>18?"…":""," (",N.percent,"%)"]},N.name))})]})]})]}),e.jsxs("div",{className:"fin-charts-row",children:[D.length>0&&e.jsxs("div",{className:"fin-chart-card",children:[e.jsxs("div",{className:"fin-chart-hdr",children:[e.jsx("div",{className:"fin-chart-title",children:"📊 الاشتراكات الشهرية"}),e.jsx("div",{className:"fin-chart-sub",children:"عدد التسجيلات لكل شهر"})]}),e.jsx("div",{className:"fin-chart-body",children:e.jsx(xt,{width:"100%",height:200,children:e.jsxs(ba,{data:D,margin:{top:5,right:20,left:0,bottom:5},children:[e.jsx(Ft,{strokeDasharray:"3 3",stroke:"#f0f1f2"}),e.jsx(Pt,{dataKey:"month",tick:{fontFamily:'"Noto Kufi Arabic",sans-serif',fontSize:11,fill:"#6b7280"},axisLine:!1,tickLine:!1}),e.jsx(Rt,{tick:{fontSize:10,fill:"#6b7280"},axisLine:!1,tickLine:!1,allowDecimals:!1}),e.jsx(ht,{content:e.jsx(Ut,{suffix:"تسجيل"})}),e.jsx(ua,{dataKey:"enrollments",fill:"#f57c00",radius:[4,4,0,0]})]})})})]}),e.jsxs("div",{className:"fin-chart-card",children:[e.jsxs("div",{className:"fin-chart-hdr",children:[e.jsx("div",{className:"fin-chart-title",children:"📉 الإيرادات vs المرتجعات"}),e.jsx("div",{className:"fin-chart-sub",children:"مقارنة الصافي بالمرتجعات"})]}),e.jsx("div",{className:"fin-chart-body",children:e.jsx(xt,{width:"100%",height:200,children:e.jsxs(ba,{data:[{name:"الإيرادات",value:T},{name:"المرتجعات",value:L},{name:"الصافي",value:f}],margin:{top:5,right:20,left:10,bottom:5},children:[e.jsx(Ft,{strokeDasharray:"3 3",stroke:"#f0f1f2"}),e.jsx(Pt,{dataKey:"name",tick:{fontFamily:'"Noto Kufi Arabic",sans-serif',fontSize:10,fill:"#6b7280"},axisLine:!1,tickLine:!1}),e.jsx(Rt,{tick:{fontSize:10,fill:"#6b7280"},axisLine:!1,tickLine:!1,tickFormatter:N=>ye(N),width:65}),e.jsx(ht,{content:e.jsx(Ut,{})}),e.jsxs(ua,{dataKey:"value",radius:[4,4,0,0],children:[e.jsx(gt,{fill:"#0865a8"}),e.jsx(gt,{fill:"#dc2626"}),e.jsx(gt,{fill:"#16a34a"})]})]})})})]})]}),x.length>0&&e.jsxs("div",{className:"fin-card",style:{marginBottom:22},children:[e.jsxs("div",{style:{padding:"16px 20px 4px",borderBottom:"1.5px solid #f0f1f2"},children:[e.jsx("span",{style:{fontWeight:900,fontSize:".9rem",color:"#0a0a0a",fontFamily:'"Noto Kufi Arabic",sans-serif'},children:"📊 إيرادات الدورات"}),e.jsxs("span",{style:{fontSize:".68rem",color:"#6b7280",marginRight:10,fontFamily:'"Noto Kufi Arabic",sans-serif'},children:["أعلى ",Math.min(x.length,8)," دورات"]})]}),e.jsx("div",{style:{padding:"16px 20px"},children:x.slice(0,8).map((N,re)=>e.jsxs("div",{className:"fin-cb-row",children:[e.jsx("div",{className:"fin-cb-name",title:N.title,children:N.title}),e.jsx("div",{className:"fin-cb-track",children:e.jsx("div",{className:`fin-cb-fill${re%2===0?"":" blue"}`,style:{width:`${Math.round(N.total/S*100)}%`}})}),e.jsxs("div",{className:"fin-cb-amt",children:[ye(N.total)," EGP"]}),e.jsxs("div",{className:"fin-cb-count",children:[N.count," مسجّل"]})]},N.title))})]}),e.jsxs("div",{className:"fin-toolbar",children:[e.jsx("input",{className:"fin-search-input",type:"text",placeholder:"ابحث باسم المستخدم أو الدورة...",value:b,onChange:N=>{h(N.target.value),P(1)}}),b&&e.jsx("button",{style:{padding:"7px 12px",borderRadius:4,border:"1.5px solid #d0d3d8",background:"#f0f1f2",cursor:"pointer",color:"#6b7280",fontFamily:'"Noto Kufi Arabic",sans-serif',fontSize:".72rem",fontWeight:700},onClick:()=>{h(""),P(1)},children:"✕ مسح"}),e.jsxs("select",{className:"fin-sort-sel",value:d,onChange:N=>{v(N.target.value),P(1)},children:[e.jsx("option",{value:"total_desc",children:"الأعلى دفعًا"}),e.jsx("option",{value:"total_asc",children:"الأقل دفعًا"}),e.jsx("option",{value:"courses_desc",children:"الأكثر دورات"}),e.jsx("option",{value:"name",children:"الاسم أبجديًا"})]}),e.jsxs("div",{className:"fin-expw",ref:E,style:{marginRight:"auto"},children:[e.jsx("button",{className:"fin-expbtn",disabled:R||se.length===0,onClick:()=>O(N=>!N),children:R?"⏳ جاري التصدير...":`⬇ تصدير ${ie?"الفترة":"التقرير"} ▾`}),z&&e.jsxs("div",{className:"fin-expmenu",children:[e.jsx("button",{className:"fin-expitem",onClick:Te(Qe),children:"📊 Excel (.xlsx)"}),e.jsx("button",{className:"fin-expitem",onClick:Te(ze),children:"📄 PDF (.pdf)"}),e.jsx("button",{className:"fin-expitem",onClick:Te(Ge),children:"📝 Word (.docx)"})]})]})]}),V&&e.jsxs("div",{className:"fin-err",children:["⚠️ ",V]}),e.jsx("div",{className:"fin-card",children:se.length===0?e.jsx("div",{className:"fin-empty",children:e.jsx("p",{children:ie?"لا توجد تسجيلات في هذه الفترة":"لا توجد نتائج مطابقة"})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"fin-table-wrap",children:e.jsxs("table",{className:"fin-tbl",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"c",style:{width:40},children:"#"}),e.jsx("th",{children:"المستخدم"}),e.jsx("th",{children:"البريد الإلكتروني"}),e.jsx("th",{className:"c",children:"عدد الدورات"}),e.jsx("th",{className:"gr c",children:"إجمالي المدفوع (EGP)"}),e.jsx("th",{className:"or c",children:"تفاصيل"})]})}),e.jsx("tbody",{children:de.map((N,re)=>{const he=(I-1)*wt+re+1,be=_===N.id;return e.jsxs($t.Fragment,{children:[e.jsxs("tr",{style:{background:be?"rgba(8,101,168,0.05)":void 0},children:[e.jsx("td",{style:{color:"#6b7280",fontSize:".68rem",textAlign:"center"},children:he}),e.jsx("td",{children:e.jsxs("div",{className:"fin-uc",children:[e.jsx("div",{className:"fin-av",children:(N.username||"?")[0].toUpperCase()}),e.jsx("div",{className:"fin-uname",children:N.username})]})}),e.jsx("td",{children:e.jsx("span",{className:"fin-email",children:N.email})}),e.jsx("td",{className:"c",children:e.jsx("span",{style:{display:"inline-flex",alignItems:"center",justifyContent:"center",minWidth:28,height:28,borderRadius:4,background:"rgba(8,101,168,0.08)",border:"1.5px solid rgba(8,101,168,0.25)",color:"#0865a8",fontSize:".76rem",fontWeight:900,padding:"0 6px"},children:N.courses.length})}),e.jsx("td",{className:"c",children:e.jsxs("span",{className:"fin-user-total",children:[ye(N.totalPaid)," EGP"]})}),e.jsx("td",{className:"c",children:e.jsx("span",{className:`fin-pill${be?" op":""}`,onClick:()=>U(be?null:N.id),children:be?"▲ إخفاء":"▼ الدورات"})})]}),be&&e.jsx("tr",{className:"fin-xrow",children:e.jsx("td",{colSpan:6,children:e.jsxs("div",{className:"fin-xin",children:[e.jsxs("div",{style:{marginBottom:10,fontSize:".72rem",fontWeight:900,color:"#0865a8",fontFamily:'"Noto Kufi Arabic",sans-serif'},children:["📚 دورات ",N.username," (",N.courses.length," دورة)"]}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:4},children:N.courses.map((me,et)=>e.jsxs("div",{className:"fin-course-chip",children:[e.jsxs("span",{className:"fin-course-chip-name",children:["📖 ",me.title]}),e.jsx("span",{style:{width:1,height:14,background:"#d0d3d8",display:"inline-block",margin:"0 4px"}}),e.jsxs("span",{className:"fin-course-chip-price",children:[ye(me.price)," EGP"]}),me.refunded>0&&e.jsxs("span",{style:{fontSize:".6rem",fontWeight:700,color:"#dc2626"},children:["↩ مرتجع ",ye(me.refunded)]}),me.date&&e.jsxs("span",{style:{fontSize:".62rem",color:"#6b7280"},children:["📅 ",me.date]}),me.attended!=null&&e.jsx("span",{style:{fontSize:".6rem",fontWeight:700,padding:"2px 7px",borderRadius:3,background:me.attended?"rgba(22,163,74,0.1)":"rgba(220,38,38,0.08)",color:me.attended?"#16a34a":"#dc2626",border:`1px solid ${me.attended?"#86efac":"rgba(220,38,38,0.3)"}`},children:me.attended?"✓ حضر":"✗ غائب"})]},et))}),e.jsxs("div",{style:{marginTop:10,display:"flex",alignItems:"center",gap:8},children:[e.jsx("span",{style:{fontSize:".74rem",fontWeight:700,color:"#374151",fontFamily:'"Noto Kufi Arabic",sans-serif'},children:"المجموع:"}),e.jsxs("span",{className:"fin-user-total",children:[ye(N.totalPaid)," EGP"]})]})]})})})]},N.id)})}),e.jsx("tfoot",{children:e.jsxs("tr",{style:{background:"#044478"},children:[e.jsxs("td",{colSpan:4,style:{padding:"12px 16px",fontWeight:900,color:"#fff",fontSize:".82rem",fontFamily:'"Noto Kufi Arabic",sans-serif'},children:["✅ صافي الإيرادات ",ie?"للفترة":"الكلية"," (بعد المرتجعات)"]}),e.jsx("td",{style:{padding:"12px 16px",textAlign:"center"},children:e.jsxs("span",{style:{fontWeight:900,fontSize:"1rem",color:"#ff9a3c"},children:[ye(f)," EGP"]})}),e.jsx("td",{})]})})]})}),e.jsx(Xr,{currentPage:I,totalItems:se.length,itemsPerPage:wt,onPageChange:N=>{P(N),U(null)}})]})})]})}const Ee=`${fe}/admin/AdminProtocol`,Gt={id:0,name:"",groupId:0,displayOrder:0,isActive:!0},vt={id:0,title:"",icon:"",displayOrder:0,isActive:!0},Qr=t=>t.status===401||t.status===403?"غير مصرح لك بهذا الإجراء (سجّل الدخول مرة أخرى)":`HTTP ${t.status}`,Ie=async t=>{try{const r=await t.json();if(r!=null&&r.message)return r.message}catch{}return Qr(t)},en=({authFetch:t,toast:r,groups:s})=>{var C;const[l,i]=n.useState([]),[o,p]=n.useState(null),[c,j]=n.useState({...Gt}),[w,b]=n.useState(!1),[h,d]=n.useState(""),[v,I]=n.useState("all"),[P,_]=n.useState(!1),[U,R]=n.useState(!1),[y,z]=n.useState(!0),O=((C=s[0])==null?void 0:C.id)??0,V=n.useCallback(()=>({...Gt,groupId:v!=="all"?Number(v):O}),[v,O]),F=n.useCallback(async(A=null)=>{z(!0);try{const Z=await t(Ee);if(!Z.ok)throw new Error(await Ie(Z));const m=await Z.json();i(m);const T=m.find(L=>L.id===A)||m[0];T?(p(T),j({...T}),b(!1)):(p(null),j({...Gt,groupId:O}),b(!0))}catch(Z){r(`فشل تحميل البيانات: ${Z.message}`,"error")}finally{z(!1)}},[t,r,O]);n.useEffect(()=>{F()},[]);const E=h.trim().toLowerCase(),u=l.filter(A=>(v==="all"||A.groupId===Number(v))&&(!E||A.name.toLowerCase().includes(E)||(A.groupTitle||"").toLowerCase().includes(E))),M=A=>{p(A),j({...A}),b(!1),_(!1)},G=A=>{const{name:Z,value:m,type:T,checked:L}=A.target;j(ae=>({...ae,[Z]:T==="checkbox"?L:m}))},B=async()=>{if(!c.name.trim()){r("اسم البروتوكول مطلوب","error");return}if(!Number(c.groupId)){r("اختر القسم","error");return}R(!0);try{const A=JSON.stringify({groupId:Number(c.groupId),name:c.name.trim(),displayOrder:Number(c.displayOrder)||0,isActive:!!c.isActive}),Z={"Content-Type":"application/json"};let m=c.id;if(w){const T=await t(Ee,{method:"POST",headers:Z,body:A});if(!T.ok)throw new Error(await Ie(T));m=(await T.json()).id}else{const T=await t(`${Ee}/${c.id}`,{method:"PUT",headers:Z,body:A});if(!T.ok)throw new Error(await Ie(T))}await F(m),r(w?"تم إضافة البروتوكول بنجاح":"تم حفظ التغييرات بنجاح")}catch(A){r(`حدث خطأ: ${A.message}`,"error")}finally{R(!1)}},k=()=>{j(V()),p(null),b(!0),_(!1)},Y=async()=>{if(!P){_(!0);return}R(!0);try{const A=await t(`${Ee}/${o.id}`,{method:"DELETE"});if(!A.ok)throw new Error(await Ie(A));_(!1),await F(),r("تم حذف البروتوكول","error")}catch(A){r(`فشل الحذف: ${A.message}`,"error")}finally{R(!1)}},ie=()=>{j(w?V():{...o}),_(!1),r("تم إلغاء التغييرات","info")};return e.jsxs(e.Fragment,{children:[U&&e.jsxs("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.25)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,fontSize:"1.4rem",color:"#fff",gap:10},children:[e.jsx("span",{style:{animation:"spin 1s linear infinite",display:"inline-block"},children:"⏳"}),"جاري الحفظ..."]}),e.jsxs("div",{className:"lec-layout",children:[e.jsxs("div",{className:"lec-panel",style:{height:"calc(100vh - 170px)",overflowY:"auto",position:"sticky",top:0},children:[e.jsxs("div",{className:"lec-panel-hdr",children:[e.jsx("span",{className:"lec-count-badge",children:u.length}),e.jsx("span",{style:{fontWeight:800,fontSize:".8rem",color:"#0a0a0a",flex:1,textAlign:"center"},children:"البروتوكولات"}),e.jsx("button",{className:"lec-new-btn",onClick:k,children:"+ جديد"})]}),e.jsxs("div",{style:{padding:"10px 10px 6px",display:"flex",flexDirection:"column",gap:6},children:[e.jsxs("div",{className:"adm-search",style:{minWidth:"unset"},children:[e.jsx("input",{type:"text",placeholder:"بحث بالاسم أو القسم...",value:h,onChange:A=>d(A.target.value),style:{fontSize:".76rem"}}),h&&e.jsx("button",{className:"lec-search-clear",onClick:()=>d(""),children:"✕"})]}),e.jsxs("select",{className:"lec-inp",value:v,onChange:A=>I(A.target.value),style:{fontSize:".76rem"},children:[e.jsx("option",{value:"all",children:"كل الأقسام"}),s.map(A=>e.jsxs("option",{value:A.id,children:[A.icon," ",A.title]},A.id))]})]}),e.jsx("div",{className:"lec-list",children:y?e.jsxs("div",{className:"adm-empty",style:{padding:"32px 12px"},children:[e.jsx("div",{className:"adm-emi",children:"⏳"}),e.jsx("p",{children:"جاري التحميل..."})]}):u.length===0?e.jsxs("div",{className:"adm-empty",style:{padding:"32px 12px"},children:[e.jsx("div",{className:"adm-emi",children:"🔍"}),e.jsx("p",{children:"لا توجد نتائج"})]}):u.map(A=>e.jsxs("div",{className:`lec-row${(o==null?void 0:o.id)===A.id?" active":""}`,onClick:()=>M(A),style:A.isActive?void 0:{opacity:.5},children:[e.jsx("div",{className:"lec-avatar",children:e.jsx("span",{children:A.groupIcon||"📄"})}),e.jsxs("div",{className:"lec-row-info",children:[e.jsx("div",{className:"lec-row-name",children:A.name}),e.jsxs("div",{className:"lec-row-spec",children:[A.groupTitle||"—",A.isActive?"":" • مخفي"]})]}),e.jsxs("div",{className:"lec-row-id",children:["#",A.id]})]},A.id))})]}),e.jsx("div",{className:"lec-form-wrap",style:{height:"calc(100vh - 170px)",overflowY:"auto"},children:e.jsxs("div",{className:"adm-card lec-form-card",children:[e.jsxs("div",{className:"lec-form-hdr",children:[e.jsxs("div",{children:[e.jsx("div",{className:"adm-hero-tag",style:{marginBottom:6,position:"relative",zIndex:1},children:w?"بروتوكول جديد":`ID: #${o==null?void 0:o.id}`}),e.jsx("h2",{className:"lec-form-title",children:w?"➕ إضافة بروتوكول جديد":"✏️ تعديل البروتوكول"}),!w&&o&&e.jsx("p",{className:"lec-form-sub",children:o.name})]}),e.jsxs("div",{className:"lec-stat-pill",children:["📑 ",l.length," بروتوكول"]})]}),e.jsxs("div",{className:"lec-form-body",children:[s.length===0&&e.jsx("div",{className:"lec-notif lec-notif-error",style:{marginBottom:12},children:'❌ لا توجد أقسام. أضف قسمًا أولاً من تبويب "الأقسام" بالأعلى.'}),e.jsxs("div",{className:"lec-fields-grid",style:{gridTemplateColumns:"1fr 1fr"},children:[e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"الرقم"}),e.jsx("input",{className:"lec-inp",value:w?"تلقائي":c.id,disabled:!0,style:{background:a.gray100,color:a.gray500,cursor:"not-allowed"}})]}),e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"ترتيب العرض (الأصغر أولاً)"}),e.jsx("input",{className:"lec-inp",type:"number",name:"displayOrder",value:c.displayOrder,onChange:G})]}),e.jsxs("div",{className:"lec-field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{className:"lec-label",children:"القسم *"}),e.jsxs("select",{className:"lec-inp",name:"groupId",value:c.groupId,onChange:G,children:[e.jsx("option",{value:0,disabled:!0,children:"— اختر القسم —"}),s.map(A=>e.jsxs("option",{value:A.id,children:[A.icon," ",A.title]},A.id))]})]}),e.jsxs("div",{className:"lec-field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{className:"lec-label",children:"اسم البروتوكول / الجهة *"}),e.jsx("input",{className:"lec-inp",name:"name",value:c.name,onChange:G,placeholder:"مثال: جامعة بنها"})]}),e.jsx("div",{className:"lec-field",style:{gridColumn:"1/-1"},children:e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",name:"isActive",checked:c.isActive,onChange:G}),e.jsx("span",{className:"lec-label",style:{margin:0},children:"ظاهر في صفحة البروتوكولات"})]})})]}),e.jsxs("div",{className:"lec-actions",style:{marginTop:16},children:[e.jsx("button",{className:"lec-act-btn save",onClick:B,disabled:U||s.length===0,children:U?"⏳ جاري الحفظ...":"💾 حفظ"}),e.jsx("button",{className:"lec-act-btn new",onClick:k,disabled:U,children:"➕ بروتوكول جديد"}),e.jsx("button",{className:"lec-act-btn reset",onClick:ie,disabled:U,children:"↩ إلغاء"}),e.jsx("div",{style:{flex:1}}),!w&&(P?e.jsxs("div",{className:"lec-delete-confirm",children:[e.jsx("span",{className:"lec-delete-warn",children:"⚠️ هل أنت متأكد من الحذف؟"}),e.jsx("button",{className:"lec-act-btn delete",onClick:Y,disabled:U,children:"تأكيد الحذف"}),e.jsx("button",{className:"adm-fclear",onClick:()=>_(!1),children:"إلغاء"})]}):e.jsx("button",{className:"lec-act-btn delete",onClick:Y,disabled:U,children:"🗑 حذف"}))]})]})]})})]})]})},tn=({authFetch:t,toast:r,onChanged:s})=>{const[l,i]=n.useState([]),[o,p]=n.useState(null),[c,j]=n.useState({...vt}),[w,b]=n.useState(!1),[h,d]=n.useState(!1),[v,I]=n.useState(!1),[P,_]=n.useState(!0),U=n.useCallback(async(E=null)=>{_(!0);try{const u=await t(`${Ee}/groups`);if(!u.ok)throw new Error(await Ie(u));const M=await u.json();i(M);const G=M.find(B=>B.id===E)||M[0];G?(p(G),j({...G,icon:G.icon||""}),b(!1)):(p(null),j({...vt}),b(!0))}catch(u){r(`فشل تحميل الأقسام: ${u.message}`,"error")}finally{_(!1)}},[t,r]);n.useEffect(()=>{U()},[]);const R=E=>{p(E),j({...E,icon:E.icon||""}),b(!1),d(!1)},y=E=>{const{name:u,value:M,type:G,checked:B}=E.target;j(k=>({...k,[u]:G==="checkbox"?B:M}))},z=async()=>{if(!c.title.trim()){r("عنوان القسم مطلوب","error");return}I(!0);try{const E=JSON.stringify({title:c.title.trim(),icon:c.icon.trim()||null,displayOrder:Number(c.displayOrder)||0,isActive:!!c.isActive}),u={"Content-Type":"application/json"};let M=c.id;if(w){const G=await t(`${Ee}/groups`,{method:"POST",headers:u,body:E});if(!G.ok)throw new Error(await Ie(G));M=(await G.json()).id}else{const G=await t(`${Ee}/groups/${c.id}`,{method:"PUT",headers:u,body:E});if(!G.ok)throw new Error(await Ie(G))}await U(M),s(),r(w?"تم إضافة القسم بنجاح":"تم حفظ التغييرات بنجاح")}catch(E){r(`حدث خطأ: ${E.message}`,"error")}finally{I(!1)}},O=()=>{j({...vt}),p(null),b(!0),d(!1)},V=async()=>{if(!h){d(!0);return}I(!0);try{const E=await t(`${Ee}/groups/${o.id}`,{method:"DELETE"});if(!E.ok)throw new Error(await Ie(E));d(!1),await U(),s(),r("تم حذف القسم","error")}catch(E){d(!1),r(E.message,"error")}finally{I(!1)}},F=()=>{j(w?{...vt}:{...o,icon:o.icon||""}),d(!1),r("تم إلغاء التغييرات","info")};return e.jsxs(e.Fragment,{children:[v&&e.jsxs("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.25)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,fontSize:"1.4rem",color:"#fff",gap:10},children:[e.jsx("span",{style:{animation:"spin 1s linear infinite",display:"inline-block"},children:"⏳"}),"جاري الحفظ..."]}),e.jsxs("div",{className:"lec-layout",children:[e.jsxs("div",{className:"lec-panel",style:{height:"calc(100vh - 170px)",overflowY:"auto",position:"sticky",top:0},children:[e.jsxs("div",{className:"lec-panel-hdr",children:[e.jsx("span",{className:"lec-count-badge",children:l.length}),e.jsx("span",{style:{fontWeight:800,fontSize:".8rem",color:"#0a0a0a",flex:1,textAlign:"center"},children:"الأقسام"}),e.jsx("button",{className:"lec-new-btn",onClick:O,children:"+ جديد"})]}),e.jsx("div",{className:"lec-list",children:P?e.jsxs("div",{className:"adm-empty",style:{padding:"32px 12px"},children:[e.jsx("div",{className:"adm-emi",children:"⏳"}),e.jsx("p",{children:"جاري التحميل..."})]}):l.length===0?e.jsxs("div",{className:"adm-empty",style:{padding:"32px 12px"},children:[e.jsx("div",{className:"adm-emi",children:"📂"}),e.jsx("p",{children:"لا توجد أقسام"})]}):l.map(E=>e.jsxs("div",{className:`lec-row${(o==null?void 0:o.id)===E.id?" active":""}`,onClick:()=>R(E),style:E.isActive?void 0:{opacity:.5},children:[e.jsx("div",{className:"lec-avatar",children:e.jsx("span",{children:E.icon||"📄"})}),e.jsxs("div",{className:"lec-row-info",children:[e.jsx("div",{className:"lec-row-name",children:E.title}),e.jsxs("div",{className:"lec-row-spec",children:[E.itemsCount," بروتوكول",E.isActive?"":" • مخفي"]})]}),e.jsxs("div",{className:"lec-row-id",children:["#",E.id]})]},E.id))})]}),e.jsx("div",{className:"lec-form-wrap",style:{height:"calc(100vh - 170px)",overflowY:"auto"},children:e.jsxs("div",{className:"adm-card lec-form-card",children:[e.jsxs("div",{className:"lec-form-hdr",children:[e.jsxs("div",{children:[e.jsx("div",{className:"adm-hero-tag",style:{marginBottom:6,position:"relative",zIndex:1},children:w?"قسم جديد":`ID: #${o==null?void 0:o.id}`}),e.jsx("h2",{className:"lec-form-title",children:w?"➕ إضافة قسم جديد":"✏️ تعديل القسم"}),!w&&o&&e.jsx("p",{className:"lec-form-sub",children:o.title})]}),e.jsxs("div",{className:"lec-stat-pill",children:["📂 ",l.length," قسم"]})]}),e.jsxs("div",{className:"lec-form-body",children:[e.jsxs("div",{className:"lec-fields-grid",style:{gridTemplateColumns:"1fr 1fr"},children:[e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"الرقم"}),e.jsx("input",{className:"lec-inp",value:w?"تلقائي":c.id,disabled:!0,style:{background:a.gray100,color:a.gray500,cursor:"not-allowed"}})]}),e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"ترتيب العرض (الأصغر أولاً)"}),e.jsx("input",{className:"lec-inp",type:"number",name:"displayOrder",value:c.displayOrder,onChange:y})]}),e.jsxs("div",{className:"lec-field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{className:"lec-label",children:"عنوان القسم *"}),e.jsx("input",{className:"lec-inp",name:"title",value:c.title,onChange:y,placeholder:"مثال: البروتوكولات الدولية"})]}),e.jsxs("div",{className:"lec-field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{className:"lec-label",children:"الأيقونة (إيموجي)"}),e.jsx("input",{className:"lec-inp",name:"icon",value:c.icon,onChange:y,placeholder:"🌍",maxLength:20})]}),e.jsx("div",{className:"lec-field",style:{gridColumn:"1/-1"},children:e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",name:"isActive",checked:c.isActive,onChange:y}),e.jsx("span",{className:"lec-label",style:{margin:0},children:"ظاهر في صفحة البروتوكولات"})]})})]}),e.jsxs("div",{className:"lec-actions",style:{marginTop:16},children:[e.jsx("button",{className:"lec-act-btn save",onClick:z,disabled:v,children:v?"⏳ جاري الحفظ...":"💾 حفظ"}),e.jsx("button",{className:"lec-act-btn new",onClick:O,disabled:v,children:"➕ قسم جديد"}),e.jsx("button",{className:"lec-act-btn reset",onClick:F,disabled:v,children:"↩ إلغاء"}),e.jsx("div",{style:{flex:1}}),!w&&(h?e.jsxs("div",{className:"lec-delete-confirm",children:[e.jsx("span",{className:"lec-delete-warn",children:"⚠️ هل أنت متأكد من الحذف؟"}),e.jsx("button",{className:"lec-act-btn delete",onClick:V,disabled:v,children:"تأكيد الحذف"}),e.jsx("button",{className:"adm-fclear",onClick:()=>d(!1),children:"إلغاء"})]}):e.jsx("button",{className:"lec-act-btn delete",onClick:V,disabled:v,children:"🗑 حذف القسم"}))]}),e.jsx("p",{style:{fontSize:".74rem",color:"#6b7280",marginTop:12},children:'لا يمكن حذف قسم يحتوي على بروتوكولات: انقل بروتوكولاته لقسم آخر أو احذفها أولاً. لإخفاء قسم بدون حذفه، أزل علامة "ظاهر".'})]})]})})]})]})},an=()=>{const{getToken:t}=Oe(),r=n.useCallback(async(h,d={})=>{const v=await t(),I={...d.headers||{}};return v&&(I.Authorization=`Bearer ${v}`),fetch(h,{...d,headers:I})},[t]),[s,l]=n.useState("items"),[i,o]=n.useState([]),[p,c]=n.useState(null),j=n.useCallback((h,d="success")=>{c({msg:h,type:d}),setTimeout(()=>c(null),3500)},[]),w=n.useCallback(async()=>{try{const h=await r(`${Ee}/groups`);if(!h.ok)throw new Error(await Ie(h));o(await h.json())}catch(h){j(`فشل تحميل الأقسام: ${h.message}`,"error")}},[r,j]);n.useEffect(()=>{w()},[w]);const b=(h,d)=>e.jsx("button",{className:`lec-act-btn ${s===h?"save":"reset"}`,onClick:()=>l(h),style:{minWidth:130},children:d},h);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:0},children:[p&&e.jsxs("div",{className:`lec-notif lec-notif-${p.type}`,style:{marginBottom:12},children:[e.jsx("span",{children:p.type==="success"?"✅":p.type==="error"?"❌":"ℹ️"}),p.msg]}),e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:12},children:[b("items","📑 البروتوكولات"),b("groups","📂 الأقسام")]}),s==="items"?e.jsx(en,{authFetch:r,toast:j,groups:i},"items"):e.jsx(tn,{authFetch:r,toast:j,onChanged:w},"groups")]})};function Ze({currentPage:t,totalItems:r,itemsPerPage:s=xe,onPageChange:l,accentColor:i=a.blue}){const o=Math.ceil(r/s);if(o<=1)return null;const p=(t-1)*s+1,c=Math.min(t*s,r),j=()=>{const b=[];for(let I=1;I<=o;I++)(I===1||I===o||I>=t-2&&I<=t+2)&&b.push(I);const d=[];let v=null;for(const I of b)v!==null&&I-v>1&&d.push("..."),d.push(I),v=I;return d},w=(b,h,d,v)=>e.jsx("button",{onClick:h,disabled:v,style:{minWidth:34,height:34,padding:"0 8px",borderRadius:2,border:d?`2px solid ${i}`:`1.5px solid ${a.gray300}`,background:d?i:v?a.gray100:a.white,color:d?a.white:v?a.gray300:a.gray700,fontFamily:a.font,fontSize:".78rem",fontWeight:700,cursor:v?"not-allowed":"pointer",opacity:v?.5:1,transition:"all .14s",lineHeight:1,display:"inline-flex",alignItems:"center",justifyContent:"center"},children:b},b+Math.random());return e.jsxs("div",{className:"adm-pg",children:[e.jsxs("span",{className:"adm-pg-info",children:["عرض ",e.jsx("strong",{children:p})," – ",e.jsx("strong",{children:c})," من إجمالي"," ",e.jsx("strong",{style:{color:i},children:r})," سجل"]}),e.jsxs("div",{style:{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap"},children:[w("«",()=>l(1),!1,t===1),w("‹",()=>l(t-1),!1,t===1),j().map((b,h)=>b==="..."?e.jsx("span",{style:{padding:"0 4px",color:a.gray300,fontSize:".78rem"},children:"…"},`el-${h}`):w(b,()=>l(b),b===t,!1)),w("›",()=>l(t+1),!1,t===o),w("»",()=>l(o),!1,t===o)]})]})}function rn(t){return t==null?null:t?{label:"💻 أونلاين",style:{background:"#e0f2fe",color:"#0369a1"}}:{label:"🏢 حضوري",style:{background:"#f3f4f6",color:"#374151"}}}function nn({data:t,loading:r,error:s,searchQuery:l,setSearchQuery:i,dateFrom:o,setDateFrom:p,dateTo:c,setDateTo:j,currentPage:w,setCurrentPage:b,expandedRow:h,setExpandedRow:d,attendance:v,certificates:I,setExporting:P,setExportError:_}){const U=n.useRef(null),[R,y]=n.useState(!1),z=t.slice((w-1)*xe,w*xe),O=Xe(P,_,()=>y(!1)),V=O(async()=>{const{headers:u,rows:M}=Ne(...Object.values(Ot(t)));await We("المستخدمون-والدورات.xlsx","تقرير المستخدمين والدورات",u,M,we)}),F=O(async()=>{const{headers:u,rows:M}=Ne(...Object.values(Ot(t)));await _e("تقرير-المستخدمين.pdf","تقرير المستخدمين والدورات",u,M,"ICEMT",we)}),E=O(async()=>{const{headers:u,rows:M}=Ne(...Object.values(Ot(t)));await Ue("تقرير-المستخدمين.docx","تقرير المستخدمين والدورات","ICEMT",u,M,we)});return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"adm-section-hdr",children:e.jsxs("div",{children:[e.jsx("div",{className:"adm-section-tag",children:"إدارة البيانات"}),e.jsxs("div",{className:"adm-section-title",children:["المستخدمون ",e.jsx("span",{children:"والدورات"})]})]})}),e.jsxs("div",{className:"adm-toolbar",children:[e.jsx("div",{className:"adm-search",children:e.jsx("input",{type:"text",placeholder:"ابحث باسم المستخدم أو البريد...",value:l,onChange:u=>{i(u.target.value),d(null)}})}),e.jsx("span",{style:{fontSize:".74rem",fontWeight:700,color:a.gray700},children:"📅"}),e.jsx("span",{style:{fontSize:".68rem",color:a.gray500},children:"من"}),e.jsx("input",{type:"date",className:"adm-fdate",value:o,onChange:u=>{p(u.target.value),d(null)}}),e.jsx("span",{style:{fontSize:".68rem",color:a.gray500},children:"إلى"}),e.jsx("input",{type:"date",className:"adm-fdate",value:c,min:o,onChange:u=>{j(u.target.value),d(null)}}),(o||c)&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"adm-filter-active",children:"🔶 فلتر نشط"}),e.jsx("button",{className:"adm-fclear",onClick:()=>{p(""),j(""),d(null)},children:"✕"})]}),e.jsxs("div",{className:"adm-expw",ref:U,style:{marginRight:"auto"},children:[e.jsx("button",{className:"adm-expbtn",onClick:()=>y(u=>!u),children:"⬇ تصدير ▾"}),R&&e.jsxs("div",{className:"adm-expmenu",children:[e.jsx("button",{className:"adm-expitem",onClick:V,children:"📊 Excel (.xlsx)"}),e.jsx("button",{className:"adm-expitem",onClick:F,children:"📄 PDF"}),e.jsx("button",{className:"adm-expitem",onClick:E,children:"📝 Word (.docx)"})]})]})]}),e.jsx("div",{className:"adm-card",children:r?e.jsxs("div",{className:"adm-ld",children:[e.jsx("div",{className:"adm-sp"}),e.jsx("p",{children:"جاري تحميل البيانات..."})]}):s?e.jsxs("div",{className:"adm-empty",children:[e.jsx("div",{className:"adm-emi",children:"⚠️"}),e.jsx("p",{children:s})]}):t.length===0?e.jsxs("div",{className:"adm-empty",children:[e.jsx("div",{className:"adm-emi",children:"🔍"}),e.jsx("p",{children:"لا توجد نتائج مطابقة"})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"adm-tscr",children:e.jsxs("table",{className:"adm-tbl",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"c",style:{width:40},children:"#"}),e.jsx("th",{children:"المستخدم"}),e.jsx("th",{children:"البريد الإلكتروني"}),e.jsx("th",{children:"رقم الموبايل"}),e.jsx("th",{className:"c",children:"الدورات"}),e.jsx("th",{className:"c",children:"تفاصيل"})]})}),e.jsx("tbody",{children:z.map((u,M)=>{const G=(w-1)*xe+M+1;return e.jsxs($t.Fragment,{children:[e.jsxs("tr",{className:h===u.id?"xopen":"",children:[e.jsx("td",{style:{color:a.gray500,fontSize:".68rem",textAlign:"center"},children:G}),e.jsx("td",{children:e.jsxs("div",{className:"adm-uc",children:[e.jsxs("div",{className:"adm-av",children:[(u.firstName||u.username||"?")[0],(u.lastName||"")[0]]}),e.jsxs("span",{className:"adm-uname",children:[u.firstName||u.username," ",u.lastName]})]})}),e.jsx("td",{className:"adm-email",children:u.email}),e.jsx("td",{style:{direction:"ltr",textAlign:"right"},children:u.phone?e.jsx("a",{href:`tel:${u.phone}`,style:{color:a.blue,fontWeight:700,textDecoration:"none"},children:u.phone}):e.jsx("span",{style:{color:a.gray300},children:"—"})}),e.jsx("td",{style:{textAlign:"center"},children:e.jsx("span",{className:"adm-cb",children:u.enrolledCourses.length})}),e.jsx("td",{style:{textAlign:"center"},children:u.enrolledCourses.length>0?e.jsx("span",{className:`adm-pill${h===u.id?" op":""}`,onClick:()=>d(h===u.id?null:u.id),children:h===u.id?"▲ إخفاء":"▼ عرض"}):e.jsx("span",{style:{color:a.gray300},children:"—"})})]}),h===u.id&&e.jsx("tr",{className:"adm-xrow",children:e.jsx("td",{colSpan:6,children:e.jsx("div",{className:"adm-xin",children:u.enrolledCourses.map(B=>{const k=String(B.enrollmentId??`${u.id}-${B.id}`),Y=rn(B.isOnline),ie=ct(B.attendanceMode);return e.jsxs("div",{className:"adm-mc",children:[e.jsxs("div",{className:"adm-mt",children:["📚 ",B.title]}),B.date&&e.jsxs("div",{className:"adm-md",children:["📅 ",B.date]}),e.jsxs("div",{className:"adm-md",children:["طريقة الحضور:"," ",Y?e.jsx("span",{className:"adm-mode-badge",style:Y.style,children:Y.label}):e.jsx("span",{className:`adm-mode-badge ${ie.cls}`,children:ie.label})]}),e.jsxs("div",{style:{marginTop:5,display:"flex",gap:5,flexWrap:"wrap"},children:[e.jsx("span",{className:`adm-att-badge ${v[String(B.enrollmentId)]?"on":"off"}`,style:{fontSize:".62rem"},children:v[String(B.enrollmentId)]?"✅ حضر":"❌ غائب"}),I[k]??I[`${u.id}-${B.id}`]?e.jsx("span",{style:{fontSize:".62rem",color:a.orange,fontWeight:700},children:"📜 شهادة"}):null]})]},k)})})})})]},u.id)})})]})}),e.jsx(Ze,{currentPage:w,totalItems:t.length,itemsPerPage:xe,onPageChange:b,accentColor:a.blue})]})})]})}const Jt=t=>(t==null?void 0:t.isOnline)??(t==null?void 0:t.IsOnline);function sn(t){const r=Jt(t);return r==null?null:r?{label:"💻 أونلاين",style:{background:"#e0f2fe",color:"#0369a1"}}:{label:"🏢 حضوري",style:{background:"#f3f4f6",color:"#374151"}}}function ln({data:t,loading:r,error:s,searchQuery:l,setSearchQuery:i,dateFrom:o,setDateFrom:p,dateTo:c,setDateTo:j,currentPage:w,setCurrentPage:b,expandedRow:h,setExpandedRow:d,setExporting:v,setExportError:I}){const P=n.useRef(null),[_,U]=n.useState(!1),R=t.slice((w-1)*xe,w*xe),y=Xe(v,I,()=>U(!1)),z=y(async()=>{const{headers:F,rows:E}=Ne(...Object.values(Lt(t)));await We("الدورات-والمستخدمون.xlsx","تقرير الدورات والمستخدمين",F,E,we)}),O=y(async()=>{const{headers:F,rows:E}=Ne(...Object.values(Lt(t)));await _e("تقرير-الدورات.pdf","تقرير الدورات والمستخدمين",F,E,"ICEMT",we)}),V=y(async()=>{const{headers:F,rows:E}=Ne(...Object.values(Lt(t)));await Ue("تقرير-الدورات.docx","تقرير الدورات والمستخدمين","ICEMT",F,E,we)});return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"adm-section-hdr",children:e.jsxs("div",{children:[e.jsx("div",{className:"adm-section-tag",children:"إدارة البيانات"}),e.jsxs("div",{className:"adm-section-title",children:["الدورات ",e.jsx("span",{children:"والمستخدمون"})]})]})}),e.jsxs("div",{className:"adm-toolbar",children:[e.jsx("div",{className:"adm-search",children:e.jsx("input",{type:"text",placeholder:"ابحث باسم الدورة أو الفئة...",value:l,onChange:F=>{i(F.target.value),d(null)}})}),e.jsx("span",{style:{fontSize:".74rem",fontWeight:700,color:a.gray700},children:"📅"}),e.jsx("span",{style:{fontSize:".68rem",color:a.gray500},children:"من"}),e.jsx("input",{type:"date",className:"adm-fdate",value:o,onChange:F=>{p(F.target.value),d(null)}}),e.jsx("span",{style:{fontSize:".68rem",color:a.gray500},children:"إلى"}),e.jsx("input",{type:"date",className:"adm-fdate",value:c,min:o,onChange:F=>{j(F.target.value),d(null)}}),(o||c)&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"adm-filter-active",children:"🔶 فلتر نشط"}),e.jsx("button",{className:"adm-fclear",onClick:()=>{p(""),j(""),d(null)},children:"✕"})]}),e.jsxs("div",{className:"adm-expw",ref:P,style:{marginRight:"auto"},children:[e.jsx("button",{className:"adm-expbtn",onClick:()=>U(F=>!F),children:"⬇ تصدير ▾"}),_&&e.jsxs("div",{className:"adm-expmenu",children:[e.jsx("button",{className:"adm-expitem",onClick:z,children:"📊 Excel (.xlsx)"}),e.jsx("button",{className:"adm-expitem",onClick:O,children:"📄 PDF"}),e.jsx("button",{className:"adm-expitem",onClick:V,children:"📝 Word (.docx)"})]})]})]}),e.jsx("div",{className:"adm-card",children:r?e.jsxs("div",{className:"adm-ld",children:[e.jsx("div",{className:"adm-sp"}),e.jsx("p",{children:"جاري تحميل البيانات..."})]}):s?e.jsxs("div",{className:"adm-empty",children:[e.jsx("div",{className:"adm-emi",children:"⚠️"}),e.jsx("p",{children:s})]}):t.length===0?e.jsxs("div",{className:"adm-empty",children:[e.jsx("div",{className:"adm-emi",children:"🔍"}),e.jsx("p",{children:"لا توجد نتائج"})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"adm-tscr",children:e.jsxs("table",{className:"adm-tbl",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"c",style:{width:40},children:"#"}),e.jsx("th",{className:"or",children:"اسم الدورة"}),e.jsx("th",{className:"or c",children:"المسجّلون"}),e.jsx("th",{className:"or c",children:"تفاصيل"})]})}),e.jsx("tbody",{children:R.map((F,E)=>{const u=(w-1)*xe+E+1,M=F.enrolledUsers.filter(k=>Jt(k)===!0).length,G=F.enrolledUsers.filter(k=>Jt(k)===!1).length,B=M+G>0;return e.jsxs($t.Fragment,{children:[e.jsxs("tr",{className:h===F.id?"xopen":"",children:[e.jsx("td",{style:{color:a.gray500,fontSize:".68rem",textAlign:"center"},children:u}),e.jsxs("td",{style:{fontWeight:700,color:a.blue},children:["📚 ",F.title]}),e.jsxs("td",{style:{textAlign:"center"},children:[e.jsx("span",{className:"adm-cb or",children:F.enrolledUsers.length}),B&&e.jsxs("div",{style:{fontSize:".62rem",color:a.gray500,marginTop:3},children:["💻 ",M," • 🏢 ",G]})]}),e.jsx("td",{style:{textAlign:"center"},children:F.enrolledUsers.length>0?e.jsx("span",{className:`adm-pill or${h===F.id?" op":""}`,onClick:()=>d(h===F.id?null:F.id),children:h===F.id?"▲ إخفاء":"▼ عرض"}):e.jsx("span",{style:{color:a.gray300},children:"—"})})]}),h===F.id&&e.jsx("tr",{className:"adm-xrow",children:e.jsx("td",{colSpan:4,children:e.jsx("div",{className:"adm-xin",children:F.enrolledUsers.map(k=>{const Y=sn(k);return e.jsxs("div",{className:"adm-mc",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:7,marginBottom:3},children:[e.jsxs("div",{className:"adm-av or sm",children:[(k.firstName||k.username||"?")[0],(k.lastName||"")[0]]}),e.jsxs("div",{children:[e.jsxs("div",{className:"adm-mt or",children:[k.firstName||k.username," ",k.lastName]}),e.jsxs("div",{className:"adm-ms",children:["✉ ",k.email]})]})]}),k.date&&e.jsxs("div",{className:"adm-md",children:["📅 ",k.date]}),Y&&e.jsx("span",{className:"adm-mode-badge",style:{...Y.style,display:"inline-block",marginTop:4},children:Y.label})]},k.enrollmentId??k.email)})})})})]},F.id)})})]})}),e.jsx(Ze,{currentPage:w,totalItems:t.length,itemsPerPage:xe,onPageChange:b,accentColor:a.orange})]})})]})}function on(t){const r=(t==null?void 0:t.isOnline)??(t==null?void 0:t.IsOnline);return r==null?null:r?{label:"💻 أونلاين",style:{background:"#e0f2fe",color:"#0369a1"}}:{label:"🏢 حضوري",style:{background:"#f3f4f6",color:"#374151"}}}function cn({rows:t,loading:r,attendance:s,attendanceSaving:l,error:i,setError:o,courseFilter:p,setCourseFilter:c,userSearch:j,setUserSearch:w,currentPage:b,setCurrentPage:h,coursesData:d,toggleAttendance:v,setExporting:I,setExportError:P}){const _=n.useRef(null),[U,R]=n.useState(!1),y=t.slice((b-1)*xe,b*xe),z=t.filter(u=>!!s[String(u.course.enrollmentId)]).length,O=Xe(I,P,()=>R(!1)),V=O(async()=>{const{headers:u,rows:M}=Ne(...Object.values(Dt(t,s)));await We("تقرير-الحضور.xlsx","تقرير الحضور",u,M,we)}),F=O(async()=>{const{headers:u,rows:M}=Ne(...Object.values(Dt(t,s)));await _e("تقرير-الحضور.pdf","تقرير الحضور",u,M,"ICEMT",we)}),E=O(async()=>{const{headers:u,rows:M}=Ne(...Object.values(Dt(t,s)));await Ue("تقرير-الحضور.docx","تقرير الحضور","ICEMT",u,M,we)});return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"adm-section-hdr",children:e.jsxs("div",{children:[e.jsx("div",{className:"adm-section-tag",children:"متابعة الحضور"}),e.jsxs("div",{className:"adm-section-title",children:["سجل ",e.jsx("span",{children:"الحضور"})]})]})}),e.jsxs("div",{className:"adm-toolbar",children:[e.jsx("span",{style:{fontSize:".74rem",fontWeight:700,color:a.gray700},children:"🎓 الدورة:"}),e.jsxs("select",{className:"adm-fsel",value:p,onChange:u=>c(u.target.value),children:[e.jsx("option",{value:"all",children:"جميع الدورات"}),d.map(u=>e.jsx("option",{value:u.id,children:u.title},u.id))]}),e.jsx("div",{className:"adm-search",style:{minWidth:170},children:e.jsx("input",{type:"text",placeholder:"ابحث باسم المستخدم...",value:j,onChange:u=>w(u.target.value)})}),j&&e.jsx("button",{className:"adm-fclear",onClick:()=>w(""),children:"✕ مسح"}),e.jsxs("div",{className:"adm-expw",ref:_,style:{marginRight:"auto"},children:[e.jsx("button",{className:"adm-expbtn",onClick:()=>R(u=>!u),children:"⬇ تصدير ▾"}),U&&e.jsxs("div",{className:"adm-expmenu",children:[e.jsx("button",{className:"adm-expitem",onClick:V,children:"📊 Excel (.xlsx)"}),e.jsx("button",{className:"adm-expitem",onClick:F,children:"📄 PDF"}),e.jsx("button",{className:"adm-expitem",onClick:E,children:"📝 Word (.docx)"})]})]})]}),e.jsxs("div",{className:"adm-att-sum",children:[e.jsxs("span",{children:["✅ ",z," حضر"]}),e.jsxs("span",{children:["❌ ",t.length-z," غائب"]}),e.jsxs("span",{children:["📋 ",t.length," إجمالي"]}),t.length>0&&(()=>{const u=Math.round(z/t.length*100);return e.jsxs(e.Fragment,{children:[e.jsxs("span",{children:[u,"٪ حضور"]}),e.jsx("div",{className:"adm-prog-wrap",children:e.jsx("div",{className:"adm-prog-fill",style:{width:`${u}%`}})})]})})()]}),i&&e.jsxs("div",{className:"adm-err",children:["⚠️ ",i,e.jsx("button",{style:{marginRight:"auto",background:"none",border:"none",cursor:"pointer",color:"#dc2626",fontSize:"1rem"},onClick:()=>o(null),children:"✕"})]}),e.jsx("div",{className:"adm-card",children:r?e.jsxs("div",{className:"adm-ld",children:[e.jsx("div",{className:"adm-sp"}),e.jsx("p",{children:"جاري التحميل..."})]}):t.length===0?e.jsxs("div",{className:"adm-empty",children:[e.jsx("div",{className:"adm-emi",children:"🔍"}),e.jsx("p",{children:"لا توجد نتائج"})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"adm-tscr",children:e.jsxs("table",{className:"adm-tbl",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"c",style:{width:40},children:"#"}),e.jsx("th",{children:"المستخدم"}),e.jsx("th",{children:"البريد الإلكتروني"}),e.jsx("th",{children:"الدورة"}),e.jsx("th",{className:"c",children:"طريقة الحضور"}),e.jsx("th",{className:"gr c",children:"تسجيل الحضور"}),e.jsx("th",{className:"gr c",children:"الحالة"})]})}),e.jsx("tbody",{children:y.map((u,M)=>{const G=(b-1)*xe+M+1,B=u.course.enrollmentId,k=String(B),Y=!!s[k],ie=!!l[k],C=on(u.course),A=ct(u.course.attendanceMode);return e.jsxs("tr",{children:[e.jsx("td",{style:{color:a.gray500,fontSize:".68rem",textAlign:"center"},children:G}),e.jsx("td",{children:e.jsxs("div",{className:"adm-uc",children:[e.jsxs("div",{className:"adm-av",children:[(u.user.firstName||u.user.username||"?")[0],(u.user.lastName||"")[0]]}),e.jsxs("span",{className:"adm-uname",children:[u.user.firstName||u.user.username," ",u.user.lastName]})]})}),e.jsx("td",{className:"adm-email",children:u.user.email}),e.jsx("td",{style:{color:a.blue,fontWeight:700},children:u.course.title}),e.jsx("td",{style:{textAlign:"center"},children:C?e.jsx("span",{className:"adm-mode-badge",style:C.style,children:C.label}):e.jsx("span",{className:`adm-mode-badge ${A.cls}`,children:A.label})}),e.jsx("td",{style:{textAlign:"center"},children:e.jsx("div",{className:`adm-chk${ie?" spin":Y?" on":""}`,onClick:()=>!ie&&v(B,Y),children:!ie&&Y&&"✓"})}),e.jsx("td",{style:{textAlign:"center"},children:e.jsx("span",{className:`adm-att-badge ${Y?"on":"off"}`,children:Y?"✅ حضر":"❌ غائب"})})]},k+M)})})]})}),e.jsx(Ze,{currentPage:b,totalItems:t.length,itemsPerPage:xe,onPageChange:h,accentColor:"#16a34a"})]})})]})}function dn({rows:t,loading:r,certificates:s,certUploading:l,certDeleting:i,error:o,setError:p,search:c,setSearch:j,statusFilter:w,setStatusFilter:b,currentPage:h,setCurrentPage:d,attendance:v,onOpenModal:I,onViewCert:P,onDeleteCert:_,setExporting:U,setExportError:R}){const y=n.useRef(null),[z,O]=n.useState(!1),V=t.slice((h-1)*xe,h*xe),F=Xe(U,R,()=>O(!1)),E=F(async()=>{const{headers:m,rows:T}=Ne(...Object.values(Mt(t,s,v)));await We("تقرير-الشهادات.xlsx","تقرير الشهادات",m,T,we)}),u=F(async()=>{const{headers:m,rows:T}=Ne(...Object.values(Mt(t,s,v)));await _e("تقرير-الشهادات.pdf","تقرير الشهادات",m,T,"ICEMT",we)}),M=F(async()=>{const{headers:m,rows:T}=Ne(...Object.values(Mt(t,s,v)));await Ue("تقرير-الشهادات.docx","تقرير الشهادات","ICEMT",m,T,we)}),G=m=>s[m.certKey]??(m.altKey?s[m.altKey]:void 0),B=t.filter(m=>{var T;return!!((T=G(m))!=null&&T.url)}).length,k=B,Y=t.filter(m=>!!v[String(m.enrollmentId)]).length,ie=t.filter(m=>{var T;return!((T=G(m))!=null&&T.url)&&!!v[String(m.enrollmentId)]}).length,C=t.filter(m=>!v[String(m.enrollmentId)]).length,A=Y>0?Math.round(B/Y*100):0,Z=[{id:"all",label:"الكل",icon:"📋"},{id:"uploaded",label:"مرفوعة",icon:"✅"},{id:"pending",label:"حضر / لم تُرفع",icon:"📄"},{id:"not-attended",label:"لم يحضر",icon:"🚫"}];return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"adm-section-hdr",children:e.jsxs("div",{children:[e.jsx("div",{className:"adm-section-tag",children:"إدارة الشهادات"}),e.jsxs("div",{className:"adm-section-title",children:[e.jsx("span",{children:"الشهادات"})," الإلكترونية"]})]})}),e.jsxs("div",{className:"adm-toolbar",children:[e.jsx("div",{className:"adm-search",style:{minWidth:210},children:e.jsx("input",{type:"text",placeholder:"ابحث باسم المستخدم أو الدورة...",value:c,onChange:m=>j(m.target.value)})}),c&&e.jsx("button",{className:"adm-fclear",onClick:()=>j(""),children:"✕"}),e.jsx("div",{style:{display:"flex",gap:5,marginRight:"auto",flexWrap:"wrap"},children:Z.map(m=>e.jsxs("button",{style:{padding:"5px 12px",borderRadius:2,border:"1.5px solid",fontFamily:a.font,fontSize:".7rem",fontWeight:700,cursor:"pointer",transition:"all .14s",background:w===m.id?m.id==="uploaded"?"#f0fdf4":"rgba(8,101,168,0.08)":a.gray100,borderColor:w===m.id?m.id==="uploaded"?"#86efac":"rgba(8,101,168,0.3)":a.gray300,color:w===m.id?m.id==="uploaded"?"#15803d":a.blue:a.gray500},onClick:()=>b(m.id),children:[m.icon," ",m.label]},m.id))}),e.jsxs("div",{className:"adm-expw",ref:y,children:[e.jsx("button",{className:"adm-expbtn",onClick:()=>O(m=>!m),children:"⬇ تصدير ▾"}),z&&e.jsxs("div",{className:"adm-expmenu",children:[e.jsx("button",{className:"adm-expitem",onClick:E,children:"📊 Excel (.xlsx)"}),e.jsx("button",{className:"adm-expitem",onClick:u,children:"📄 PDF"}),e.jsx("button",{className:"adm-expitem",onClick:M,children:"📝 Word (.docx)"})]})]})]}),!r&&e.jsxs("div",{className:"adm-cert-sum",children:[e.jsx("span",{style:{fontSize:".76rem",fontWeight:900,color:a.black},children:"📜 ملخص الشهادات"}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",flex:1},children:[{label:`✅ مرفوعة: ${B}${k>0?` (${k} قابلة للعرض)`:""}`,bg:"#f0fdf4",color:"#15803d",border:"#86efac"},{label:`📄 حضر ولم تُرفع: ${ie}`,bg:"rgba(8,101,168,0.06)",color:a.blue,border:"rgba(8,101,168,0.2)"},{label:`🚫 لم يحضر: ${C}`,bg:a.gray100,color:a.gray500,border:a.gray300},{label:`📋 الإجمالي: ${t.length}`,bg:"rgba(8,101,168,0.06)",color:a.blue,border:"rgba(8,101,168,0.2)"}].map(m=>e.jsx("span",{style:{display:"inline-flex",alignItems:"center",padding:"3px 11px",borderRadius:2,background:m.bg,border:`1.5px solid ${m.border}`,color:m.color,fontSize:".7rem",fontWeight:700},children:m.label},m.label))}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,minWidth:140},children:[e.jsx("div",{style:{flex:1,height:6,background:a.gray300,borderRadius:3,overflow:"hidden"},children:e.jsx("div",{style:{width:`${A}%`,height:"100%",background:`linear-gradient(90deg,${a.orange},${a.orangeLight})`,borderRadius:3,transition:"width .5s ease"}})}),e.jsxs("span",{style:{fontSize:".68rem",fontWeight:700,color:a.orange,minWidth:32},children:[A,"٪"]})]})]}),o&&e.jsxs("div",{className:"adm-err",children:["⚠️ ",o,e.jsx("button",{style:{marginRight:"auto",background:"none",border:"none",cursor:"pointer",color:"#dc2626",fontSize:"1rem"},onClick:()=>p(null),children:"✕"})]}),e.jsx("div",{className:"adm-card",children:r?e.jsxs("div",{className:"adm-ld",children:[e.jsx("div",{className:"adm-sp"}),e.jsx("p",{children:"جاري التحميل..."})]}):t.length===0?e.jsxs("div",{className:"adm-empty",children:[e.jsx("div",{className:"adm-emi",children:"🔍"}),e.jsx("p",{children:"لا توجد نتائج"})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"adm-cert-grid",children:V.map(m=>{const T=m.certKey,L=G(m),ae=(L==null?void 0:L.url)??null,f=l[T],W=!!i[T],q=!!v[String(m.enrollmentId)],Q=!!ae;return e.jsxs("div",{className:`adm-cert-card${Q?" has-cert":""}`,style:{opacity:!q&&!Q?.75:1},children:[e.jsxs("div",{className:"adm-cert-card-top",children:[e.jsx("div",{className:`adm-cert-icon${Q?" has":q?"":" grey"}`,children:Q?"📜":q?"📄":"🚫"}),e.jsxs("div",{className:"adm-cert-info",children:[e.jsxs("div",{className:"adm-cert-name",children:[m.user.firstName||m.user.username," ",m.user.lastName]}),e.jsxs("div",{className:"adm-cert-course",children:["📚 ",m.course.title]}),e.jsxs("div",{className:"adm-cert-badges",children:[e.jsx("span",{style:{fontSize:".6rem",fontWeight:700,padding:"2px 8px",borderRadius:2,background:q?"#f0fdf4":a.gray100,color:q?"#15803d":a.gray500,border:`1px solid ${q?"#86efac":a.gray300}`},children:q?"✅ حضر":"❌ غائب"}),Q&&e.jsxs("span",{style:{fontSize:".6rem",fontWeight:700,padding:"2px 8px",borderRadius:2,background:"#f0fdf4",color:"#15803d",border:"1px solid #86efac"},children:["📜 ",L.name&&L.name!=="uploaded"?L.name.length>20?L.name.slice(0,20)+"…":L.name:"مرفوعة"]}),!Q&&q&&e.jsx("span",{style:{fontSize:".6rem",color:a.orange,padding:"2px 8px",borderRadius:2,background:"rgba(245,124,0,0.06)",border:"1px solid rgba(245,124,0,0.2)"},children:"لم تُرفع بعد"}),!Q&&!q&&e.jsx("span",{style:{fontSize:".6rem",color:a.gray500,padding:"2px 8px",borderRadius:2,background:a.gray100,border:`1px solid ${a.gray300}`},children:"يجب تسجيل الحضور أولاً"}),(L==null?void 0:L.uploadedAt)&&e.jsxs("span",{style:{fontSize:".58rem",color:a.gray500,padding:"2px 6px",borderRadius:2,background:a.gray100,border:`1px solid ${a.gray300}`},children:["🗓 ",L.uploadedAt]})]})]})]}),e.jsx("div",{className:"adm-cert-actions",children:Q?e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"adm-cert-btn dl",onClick:()=>P(L.id,ae,L.rawUrl,L.name,m.userId,m.planworkId),children:"👁 عرض"}),e.jsx("button",{className:"adm-cert-btn up",disabled:f,onClick:()=>I({enrollmentId:m.enrollmentId,userId:m.userId,planworkId:m.planworkId,certKey:T,userName:`${m.user.firstName||m.user.username} ${m.user.lastName}`,courseTitle:m.course.title}),children:f?"⏳":"🔄 تحديث"}),e.jsx("button",{className:"adm-cert-btn rm",disabled:W,onClick:()=>_(T,m.altKey),children:W?"⏳":"🗑"})]}):q?e.jsx("button",{className:"adm-cert-btn up full",disabled:f,onClick:()=>I({enrollmentId:m.enrollmentId,userId:m.userId,planworkId:m.planworkId,certKey:T,userName:`${m.user.firstName||m.user.username} ${m.user.lastName}`,courseTitle:m.course.title}),children:f?"⏳ جاري الرفع...":"⬆ رفع شهادة"}):e.jsx("span",{style:{fontSize:".62rem",color:a.gray300,width:"100%",textAlign:"center"},children:"سجّل الحضور أولاً لرفع الشهادة"})})]},T)})}),e.jsx(Ze,{currentPage:h,totalItems:t.length,itemsPerPage:xe,onPageChange:d,accentColor:a.orange})]})})]})}function pn(t){return t==null?null:t?{label:"💻 أونلاين",style:{background:"#e0f2fe",color:"#0369a1"}}:{label:"🏢 حضوري",style:{background:"#f3f4f6",color:"#374151"}}}function mn({refunds:t,allRefunds:r,loading:s,error:l,setError:i,search:o,setSearch:p,statusFilter:c,setStatusFilter:j,currentPage:w,setCurrentPage:b,usersData:h,coursesData:d,bankResultBanner:v,setBankResultBanner:I,onViewDetail:P,onAction:_,setExporting:U,setExportError:R}){const y=n.useRef(null),[z,O]=n.useState(!1),V=t.slice((w-1)*xe,w*xe),F={total:r.length,pending:r.filter(k=>k.status==="Pending").length,approved:r.filter(k=>k.status==="Approved").length,sent:r.filter(k=>k.status==="Sent").length,rejected:r.filter(k=>k.status==="Rejected").length,totalAmount:r.filter(k=>k.status!=="Rejected").reduce((k,Y)=>k+(Y.amount||0),0)},E=Xe(U,R,()=>O(!1)),u=E(async()=>{const{headers:k,rows:Y}=Ne(...Object.values(Bt(t,h,d)));await We("تقرير-المستردات.xlsx","تقرير المستردات",k,Y,we)}),M=E(async()=>{const{headers:k,rows:Y}=Ne(...Object.values(Bt(t,h,d)));await _e("تقرير-المستردات.pdf","تقرير المستردات",k,Y,"ICEMT",we)}),G=E(async()=>{const{headers:k,rows:Y}=Ne(...Object.values(Bt(t,h,d)));await Ue("تقرير-المستردات.docx","تقرير المستردات","ICEMT",k,Y,we)}),B=[{id:"all",lbl:"الكل",cls:""},{id:"Pending",lbl:"⏳ قيد المراجعة",cls:"pend"},{id:"Approved",lbl:"✅ موافق عليه",cls:"appr"},{id:"Sent",lbl:"🏦 أُرسل للبنك",cls:"bank"},{id:"Rejected",lbl:"❌ مرفوض",cls:"rjct"}];return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"adm-section-hdr",children:e.jsxs("div",{children:[e.jsx("div",{className:"adm-section-tag",children:"إدارة المالية"}),e.jsxs("div",{className:"adm-section-title",children:["طلبات ",e.jsx("span",{children:"الاسترداد"})]})]})}),v&&e.jsxs("div",{className:`rf-bank-banner ${v.type}`,children:[e.jsx("span",{children:v.msg}),e.jsx("button",{className:"rf-bank-banner-close",onClick:()=>I(null),children:"✕"})]}),e.jsx("div",{className:"rf-stat-bar",children:[{lbl:"إجمالي",val:F.total,icon:"📋",bg:a.gray100,color:a.black},{lbl:"قيد المراجعة",val:F.pending,icon:"⏳",bg:"rgba(245,124,0,0.08)",color:a.orange},{lbl:"موافق عليها",val:F.approved,icon:"✅",bg:"#f0fdf4",color:"#16a34a"},{lbl:"أُرسل للبنك",val:F.sent,icon:"🏦",bg:"rgba(8,101,168,0.06)",color:a.blue},{lbl:"مرفوضة",val:F.rejected,icon:"❌",bg:"#fef2f2",color:"#dc2626"},{lbl:"إجمالي المبالغ",val:`${F.totalAmount.toLocaleString()} EGP`,icon:"💰",bg:"#f0fdf4",color:"#15803d"}].map(k=>e.jsxs("div",{className:"rf-sc",children:[e.jsx("div",{className:"rf-sc-icon",style:{background:k.bg,color:k.color},children:k.icon}),e.jsxs("div",{children:[e.jsx("div",{className:"rf-sc-val",style:{color:k.color,fontSize:typeof k.val=="string"?".82rem":"1.3rem"},children:k.val}),e.jsx("div",{className:"rf-sc-lbl",children:k.lbl})]})]},k.lbl))}),e.jsxs("div",{className:"adm-toolbar",children:[e.jsx("div",{className:"adm-search",style:{minWidth:200},children:e.jsx("input",{type:"text",placeholder:"ابحث برقم الطلب، المبلغ، المستخدم...",value:o,onChange:k=>p(k.target.value)})}),e.jsxs("div",{className:"rf-filter-btns",children:[e.jsx("span",{style:{fontSize:".74rem",fontWeight:700,color:a.gray700},children:"الحالة:"}),B.map(k=>e.jsx("button",{className:`rf-fbtn${c===k.id?` active ${k.cls}`:""}`,onClick:()=>j(k.id),children:k.lbl},k.id))]}),o&&e.jsx("button",{className:"adm-fclear",onClick:()=>p(""),children:"✕"}),e.jsxs("div",{className:"adm-expw",ref:y,style:{marginRight:"auto"},children:[e.jsx("button",{className:"adm-expbtn",onClick:()=>O(k=>!k),children:"⬇ تصدير ▾"}),z&&e.jsxs("div",{className:"adm-expmenu",children:[e.jsx("button",{className:"adm-expitem",onClick:u,children:"📊 Excel (.xlsx)"}),e.jsx("button",{className:"adm-expitem",onClick:M,children:"📄 PDF"}),e.jsx("button",{className:"adm-expitem",onClick:G,children:"📝 Word (.docx)"})]})]})]}),l&&e.jsxs("div",{className:"adm-err",children:["⚠️ ",l,e.jsx("button",{style:{marginRight:"auto",background:"none",border:"none",cursor:"pointer",color:"#dc2626",fontSize:"1rem"},onClick:()=>i(null),children:"✕"})]}),e.jsx("div",{className:"adm-card",children:s?e.jsxs("div",{className:"adm-ld",children:[e.jsx("div",{className:"adm-sp"}),e.jsx("p",{children:"جاري تحميل طلبات الاسترداد..."})]}):t.length===0?e.jsxs("div",{className:"adm-empty",children:[e.jsx("div",{className:"adm-emi",children:"🔍"}),e.jsx("p",{children:"لا توجد طلبات مطابقة"})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"adm-tscr",children:e.jsxs("table",{className:"adm-tbl",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"rd c",style:{width:36},children:"#"}),e.jsx("th",{className:"rd",children:"رقم الطلب"}),e.jsx("th",{className:"rd",children:"المستخدم"}),e.jsx("th",{className:"rd c",children:"طريقة الحضور"}),e.jsx("th",{className:"rd c",children:"المبلغ"}),e.jsx("th",{className:"rd",children:"السبب"}),e.jsx("th",{className:"rd c",children:"الحالة"}),e.jsx("th",{className:"rd",children:"تاريخ الطلب"}),e.jsx("th",{className:"rd c",children:"الإجراءات"})]})}),e.jsx("tbody",{children:V.map((k,Y)=>{var L,ae;const ie=(w-1)*xe+Y+1,C=h.find(f=>f.id===k.userId)??{firstName:"—",lastName:"",email:"—",enrolledCourses:[]},A=qe[k.status]||qe.Pending,Z=(C.enrolledCourses||[]).find(f=>k.enrollmentId!=null&&f.enrollmentId===k.enrollmentId||f.id===k.courseId),m=pn(k.isOnline??(Z==null?void 0:Z.isOnline)),T=ct(k.attendanceMode??(Z==null?void 0:Z.attendanceMode));return e.jsxs("tr",{children:[e.jsx("td",{style:{color:a.gray500,fontSize:".68rem",textAlign:"center"},children:ie}),e.jsx("td",{children:e.jsx("span",{style:{fontFamily:"Courier New",fontSize:".76rem",fontWeight:700,color:a.blue},children:k.refNumber||k.id})}),e.jsx("td",{children:e.jsxs("div",{className:"adm-uc",children:[e.jsxs("div",{className:"adm-av rd",children:[(L=C.firstName)==null?void 0:L[0],(ae=C.lastName)==null?void 0:ae[0]]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:".78rem"},children:`${C.firstName} ${C.lastName}`.trim()||"—"}),e.jsx("div",{className:"adm-email",children:C.email})]})]})}),e.jsx("td",{style:{textAlign:"center"},children:m?e.jsx("span",{className:"adm-mode-badge",style:m.style,children:m.label}):e.jsx("span",{className:`adm-mode-badge ${T.cls}`,children:T.label})}),e.jsxs("td",{style:{textAlign:"center"},children:[e.jsx("span",{className:"rf-amount",children:Number(k.amount||0).toLocaleString()}),e.jsx("span",{style:{fontSize:".6rem",color:a.gray500,marginRight:3},children:k.currency})]}),e.jsx("td",{style:{maxWidth:150},children:e.jsx("div",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:".74rem",color:a.gray500},title:k.reason,children:k.reason||"—"})}),e.jsx("td",{style:{textAlign:"center"},children:e.jsxs("span",{className:"rf-status",style:{background:A.bg,color:A.color,borderColor:A.border},children:[A.icon," ",A.label]})}),e.jsx("td",{style:{fontSize:".72rem",fontFamily:"Courier New",color:a.gray500,whiteSpace:"nowrap"},children:k.requestedAt||"—"}),e.jsx("td",{children:e.jsxs("div",{style:{display:"flex",gap:5,flexWrap:"wrap",justifyContent:"center"},children:[e.jsx("button",{className:"rf-action-btn view",onClick:()=>P(k),children:"🔍 تفاصيل"}),k.status==="Pending"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"rf-action-btn approve",onClick:()=>_(k,"approve"),children:"✅"}),e.jsx("button",{className:"rf-action-btn bank",onClick:()=>_(k,"send_to_bank"),children:"🏦"}),e.jsx("button",{className:"rf-action-btn reject",onClick:()=>_(k,"reject"),children:"❌"})]}),k.status==="Approved"&&e.jsx("button",{className:"rf-action-btn bank",onClick:()=>_(k,"send_to_bank"),children:"🏦 إرسال للبنك"})]})})]},k.id)})})]})}),e.jsx(Ze,{currentPage:w,totalItems:t.length,itemsPerPage:xe,onPageChange:b,accentColor:"#dc2626"})]})})]})}function fn({modal:t,uploading:r,onClose:s,onFile:l}){const i=n.useRef(null),[o,p]=n.useState(!1);return e.jsx("div",{className:"adm-modal-bg",onClick:s,children:e.jsxs("div",{className:"adm-modal",onClick:c=>c.stopPropagation(),children:[e.jsx("h3",{children:"📜 رفع شهادة"}),e.jsxs("p",{children:[t.userName," — ",t.courseTitle]}),e.jsxs("div",{className:`adm-drop${o?" over":""}`,onClick:()=>{var c;return(c=i.current)==null?void 0:c.click()},onDragOver:c=>{c.preventDefault(),p(!0)},onDragLeave:()=>p(!1),onDrop:c=>{c.preventDefault(),p(!1);const j=c.dataTransfer.files[0];j&&l(t.enrollmentId,t.userId,t.planworkId,j)},children:[e.jsx("div",{className:"adm-drop-icon",children:"📂"}),e.jsx("div",{className:"adm-drop-txt",children:"اسحب الملف هنا أو اضغط للاختيار"}),e.jsx("div",{className:"adm-drop-sub",children:"PDF, JPG, PNG — حجم أقصى 10 MB"}),e.jsx("input",{ref:i,type:"file",accept:".pdf,.jpg,.jpeg,.png",style:{display:"none"},onChange:c=>{const j=c.target.files[0];j&&l(t.enrollmentId,t.userId,t.planworkId,j),c.target.value=""}})]}),r&&e.jsx("div",{style:{textAlign:"center",marginTop:12,color:"#f57c00",fontSize:".8rem",fontWeight:700},children:"⏳ جاري الرفع على السيرفر..."}),e.jsx("div",{className:"adm-modal-actions",children:e.jsx("button",{className:"adm-modal-cancel",onClick:s,children:"إلغاء"})})]})})}function xn(t){return t==null?null:t?{label:"💻 أونلاين",style:{background:"#e0f2fe",color:"#0369a1"}}:{label:"🏢 حضوري",style:{background:"#f3f4f6",color:"#374151"}}}function hn({refund:t,usersData:r,coursesData:s,onClose:l,onAction:i}){const o=r.find(h=>h.id===t.userId)??{firstName:"—",lastName:"",email:"—",enrolledCourses:[]},p=s.find(h=>h.id===t.courseId)??{title:"—"},c=qe[t.status]||qe.Pending,j=(o.enrolledCourses||[]).find(h=>t.enrollmentId!=null&&h.enrollmentId===t.enrollmentId||h.id===t.courseId),w=xn(t.isOnline??(j==null?void 0:j.isOnline)),b=ct(t.attendanceMode??(j==null?void 0:j.attendanceMode));return e.jsx("div",{className:"adm-modal-bg",onClick:l,children:e.jsxs("div",{className:"adm-modal rd",style:{borderTopColor:c.color},onClick:h=>h.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10},children:[e.jsxs("div",{children:[e.jsx("h3",{children:"💳 تفاصيل طلب الاسترداد"}),e.jsx("div",{style:{fontSize:".62rem",color:"#6b7280",marginTop:2},children:t.refNumber||t.id})]}),e.jsxs("span",{className:"rf-status",style:{background:c.bg,color:c.color,borderColor:c.border},children:[c.icon," ",c.label]})]}),e.jsxs("div",{className:"rf-detail",children:[e.jsxs("div",{children:[e.jsx("div",{className:"rf-field-lbl",children:"رقم الأوردر"}),e.jsx("div",{className:"rf-field-val mono",children:t.orderId||"—"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"rf-field-lbl",children:"المبلغ"}),e.jsxs("div",{className:"rf-field-val",children:[e.jsx("span",{className:"rf-amount",children:Number(t.amount||0).toLocaleString()})," ",e.jsx("span",{style:{fontSize:".6rem",color:"#6b7280"},children:t.currency})]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"rf-field-lbl",children:"المستخدم"}),e.jsx("div",{className:"rf-field-val",children:`${o.firstName} ${o.lastName}`.trim()||"—"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"rf-field-lbl",children:"البريد الإلكتروني"}),e.jsx("div",{className:"rf-field-val mono",style:{fontSize:".68rem"},children:o.email||"—"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"rf-field-lbl",children:"الدورة"}),e.jsx("div",{className:"rf-field-val",children:p.title||"—"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"rf-field-lbl",children:"طريقة الحضور"}),e.jsx("div",{className:"rf-field-val",children:w?e.jsx("span",{className:"adm-mode-badge",style:w.style,children:w.label}):e.jsx("span",{className:`adm-mode-badge ${b.cls}`,children:b.label})})]}),e.jsxs("div",{children:[e.jsx("div",{className:"rf-field-lbl",children:"تاريخ الطلب"}),e.jsx("div",{className:"rf-field-val mono",children:t.requestedAt||"—"})]}),e.jsxs("div",{className:"rf-full",children:[e.jsx("div",{className:"rf-field-lbl",children:"سبب الاسترداد"}),e.jsx("div",{className:"rf-field-val",style:{fontWeight:400},children:t.reason||"—"})]}),t.details&&e.jsxs("div",{className:"rf-full",children:[e.jsx("div",{className:"rf-field-lbl",children:"تفاصيل إضافية"}),e.jsx("div",{className:"rf-field-val",style:{fontWeight:400,fontSize:".72rem",lineHeight:1.5},children:t.details})]}),e.jsx("hr",{className:"rf-divider"}),e.jsxs("div",{className:"rf-bank-block",children:[e.jsx("div",{className:"rf-bank-title",children:"🏦 بيانات البنك"}),e.jsx("div",{className:"rf-bank-grid",children:[["اسم البنك",t.bankName||"—",!1],["صاحب الحساب",t.accountHolder||"—",!1],["رقم الحساب",t.accountNumber||"—",!0],["IBAN",t.iban||"—",!0]].map(([h,d,v])=>e.jsxs("div",{children:[e.jsx("div",{className:"rf-field-lbl",children:h}),e.jsx("div",{className:`rf-field-val${v?" mono":""}`,style:{fontSize:".72rem"},children:d})]},h))})]})]}),(t.status==="Pending"||t.status==="Approved")&&e.jsx("div",{className:"rf-action-area",children:e.jsxs("div",{className:"rf-action-row",children:[t.status==="Pending"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"rf-action-btn approve",onClick:()=>i(t,"approve"),children:"✅ موافقة"}),e.jsx("button",{className:"rf-action-btn bank",onClick:()=>i(t,"send_to_bank"),children:"🏦 إرسال للبنك"}),e.jsx("button",{className:"rf-action-btn reject",onClick:()=>i(t,"reject"),children:"❌ رفض"})]}),t.status==="Approved"&&e.jsx("button",{className:"rf-action-btn bank",onClick:()=>i(t,"send_to_bank"),children:"🏦 إرسال للبنك"})]})}),e.jsx("div",{className:"adm-modal-actions",children:e.jsx("button",{className:"adm-modal-cancel",onClick:l,children:"إغلاق"})})]})})}const gn={approve:{title:"✅ تأكيد الموافقة",color:"#16a34a",cls:"approve",placeholder:"ملاحظة للمستخدم (اختياري)..."},reject:{title:"❌ تأكيد الرفض",color:"#dc2626",cls:"reject",placeholder:"سبب الرفض (مطلوب)..."},send_to_bank:{title:"🏦 تأكيد الإرسال للبنك",color:"#0865a8",cls:"bank",placeholder:"مرجع التحويل البنكي (اختياري)..."}};function bn({modal:t,note:r,saving:s,error:l,usersData:i,onNoteChange:o,onConfirm:p,onClose:c}){const{refund:j,action:w}=t,b=gn[w],h=i.find(d=>d.id===j.userId)??{firstName:"—",lastName:""};return e.jsx("div",{className:"adm-modal-bg",onClick:()=>!s&&c(),children:e.jsxs("div",{className:"adm-modal rd",style:{maxWidth:450,borderTopColor:b.color},onClick:d=>d.stopPropagation(),children:[e.jsx("h3",{children:b.title}),e.jsxs("p",{children:["طلب ",e.jsx("strong",{children:j.refNumber||j.id})," — ",e.jsx("strong",{children:`${h.firstName} ${h.lastName}`.trim()||"—"}),e.jsx("br",{}),"المبلغ:"," ",e.jsxs("strong",{style:{color:"#15803d",fontFamily:"Courier New"},children:[Number(j.amount||0).toLocaleString()," ",j.currency]})]}),l&&e.jsxs("div",{className:"adm-err",children:["⚠️ ",l]}),e.jsx("textarea",{className:"rf-textarea",placeholder:b.placeholder,value:r,onChange:d=>o(d.target.value),disabled:s}),e.jsxs("div",{className:"adm-modal-actions",children:[e.jsx("button",{className:"adm-modal-cancel",onClick:c,disabled:s,children:"إلغاء"}),e.jsx("button",{className:`rf-action-confirm ${b.cls}`,onClick:p,disabled:s||w==="reject"&&!r.trim(),children:s?e.jsxs(e.Fragment,{children:[e.jsx("span",{style:{display:"inline-block",width:12,height:12,border:"2px solid rgba(255,255,255,.4)",borderTopColor:"#fff",borderRadius:"50%",animation:"adm-spin .6s linear infinite",marginLeft:6,verticalAlign:"middle"}}),"جاري..."]}):"تأكيد"})]})]})})}const ee={orange:"#f57c00",blue:"#0865a8",black:"#0a0a0a",white:"#ffffff",gray100:"#f0f1f2",gray300:"#d0d3d8",gray500:"#6b7280",gray700:"#374151",green:"#16a34a",greenBg:"#f0fdf4",greenBorder:"#86efac",red:"#dc2626",redBg:"#fef2f2",redBorder:"rgba(220,38,38,.2)",yellow:"#b45309",yellowBg:"#fffbea",font:'"Noto Kufi Arabic", serif'},Ct=[{id:"users",label:"👤 المستخدمون",permissionName:"Users"},{id:"activity",label:"🕵️ سجل النشاط",permissionName:"ActivityLog",managerOnly:!0},{id:"courses",label:"📚 الدورات",permissionName:"Courses"},{id:"attendance",label:"✅ الحضور",permissionName:"Attendance"},{id:"certificates",label:"📜 الشهادات",permissionName:"Certificates"},{id:"refunds",label:"💳 المستردات",permissionName:"Refunds"},{id:"finance",label:"💰 المالية",permissionName:"Finance"},{id:"lecturers",label:"🎓 المحاضرون",permissionName:"Lecturers"},{id:"customers",label:"🏢 العملاء",permissionName:"Customers"},{id:"siteCerts",label:"🏅 الشهادات وخطابات الشكر",permissionName:"Certificates and Letters of Appreciation"},{id:"team",label:"👥 فريق العمل",permissionName:"Team"},{id:"gallery",label:"مكتبة الصور والفيديو",icon:"🖼️",permissionName:"Gallery"},{id:"news",label:"📰 الأخبار",permissionName:"News"},{id:"books",label:"📖 الكتب",permissionName:"Books"},{id:"protocols",label:"🤝 البروتوكولات",permissionName:"Protocols"},{id:"workplan",label:"📋 الدورات التدريبية",permissionName:"Workplan"},{id:"planFiles",label:"📎 ملفات الخطة التدريبية",permissionName:"PlanFiles"},{id:"planEmails",label:"✉️ متدربو المعهد (البريد)",permissionName:"PlanEmails"},{id:"settings",label:"⚙️ الإعدادات",permissionName:"Settings",managerOnly:!0}],un=Ct.filter(t=>t.managerOnly),yn=un.map(t=>t.label).join(" و "),jt=6,wn="https://icemt.arabcont.com/".replace(/\/$/,""),Na=(t,r)=>{if(!Array.isArray(t))return[];const s=new Map(r.map(l=>[String(l.name??"").trim().toLowerCase(),l.id]));return t.map(l=>{if(typeof l=="string")return s.get(l.trim().toLowerCase());if(typeof l=="number")return l;const i=(l==null?void 0:l.permissionId)??(l==null?void 0:l.PermissionId)??(l==null?void 0:l.id)??(l==null?void 0:l.Id);if(i!=null)return i;const o=(l==null?void 0:l.name)??(l==null?void 0:l.Name)??(l==null?void 0:l.permissionName);return o?s.get(String(o).trim().toLowerCase()):void 0}).filter(l=>l!=null)},nt=()=>({isManager:!1,tabs:new Set});function vn({currentUserEmail:t=""}){const{getToken:r}=Oe(),[s,l]=n.useState(""),[i,o]=n.useState(1),[p,c]=n.useState(null),[j,w]=n.useState([]),[b,h]=n.useState([]),[d,v]=n.useState({}),[I,P]=n.useState(!0),[_,U]=n.useState({}),[R,y]=n.useState(null),z=n.useCallback((x,S)=>{y({type:x,msg:S}),setTimeout(()=>y(null),4200)},[]),O=n.useCallback(async(x,S={})=>{const K=await r();if(!K)throw new Error("لم يتم العثور على Authentication Token");const D={Accept:"application/json",...S.headers||{},Authorization:`Bearer ${K}`};S.body&&!D["Content-Type"]&&(D["Content-Type"]="application/json");const ne=await fetch(`${wn}${x}`,{...S,headers:D});if(!ne.ok){let se=`HTTP ${ne.status}`;try{const de=await ne.json();typeof de=="string"?se=de:de!=null&&de.message?se=de.message:de!=null&&de.title&&(se=de.title)}catch{}throw new Error(se)}if(ne.status===204)return null;const le=await ne.text();if(!le)return null;try{return JSON.parse(le)}catch{return le}},[r]),V=n.useCallback(x=>({id:(x==null?void 0:x.id)??(x==null?void 0:x.Id)??(x==null?void 0:x.permissionId)??(x==null?void 0:x.PermissionId),name:(x==null?void 0:x.name)??(x==null?void 0:x.Name)??""}),[]),F=n.useCallback(x=>{const S=x.permissionName.trim().toLowerCase();return b.find(K=>{var D;return((D=K.name)==null?void 0:D.trim().toLowerCase())===S})},[b]),E=n.useCallback(async()=>{P(!0);try{const x=await O("/api/Permissions"),S=Array.isArray(x)?x.map(V):[];h(S);const K=await O("/api/AdminUsers"),D=Array.isArray(K)?K:[];w(D);const ne=await Promise.all(D.map(async se=>{try{return{userId:se.id,data:await O(`/api/UserPermissions/${se.id}`)}}catch(de){return console.error(`Failed to load permissions for user ${se.id}`,de),{userId:se.id,data:[]}}})),le={};ne.forEach(({userId:se,data:de})=>{const je=D.find(ge=>ge.id===se);je&&(le[se]={isManager:!!je.isManager,tabs:new Set(Na(de,S))})}),v(le)}catch(x){console.error("Failed loading settings:",x),z("error",`فشل تحميل البيانات: ${x.message}`)}finally{P(!1)}},[O,V,z]);n.useEffect(()=>{E()},[E]);const u=n.useCallback((x,S)=>{U(K=>({...K,[x]:S}))},[]),M=n.useCallback(x=>!!_[x],[_]),G=n.useCallback(async(x,S)=>{await O("/api/UserPermissions/assign",{method:"POST",body:JSON.stringify({userId:x,permissionId:S})})},[O]),B=n.useCallback(async(x,S)=>{await O(`/api/UserPermissions/remove?userId=${encodeURIComponent(x)}&permissionId=${encodeURIComponent(S)}`,{method:"DELETE"})},[O]),k=n.useCallback(async(x,S)=>{try{const K=await O(`/api/UserPermissions/${x}`),D=Na(K,b);v(ne=>({...ne,[x]:{...ne[x],tabs:new Set(D)}}))}catch{v(K=>({...K,[x]:{...K[x],tabs:S}}))}},[O,b]),Y=n.useCallback(async(x,S)=>{const K=d[x]??nt(),D={isManager:K.isManager,tabs:new Set(K.tabs)};u(x,!0);try{await O(`/api/AdminUsers/${x}/manager`,{method:"PATCH",body:JSON.stringify({isManager:S})}),v(ne=>({...ne,[x]:{...ne[x],isManager:S,tabs:new Set(D.tabs)}})),z("success",S?"✅ تم منح صلاحية المدير العام":"تم سحب صلاحية المدير العام")}catch(ne){v(le=>({...le,[x]:D})),z("error",`فشل تغيير صلاحية المدير: ${ne.message}`)}finally{u(x,!1)}},[d,O,u,z]),ie=n.useCallback(async(x,S)=>{const K=d[x]??nt(),D=F(S),ne=!!D&&K.tabs.has(D.id);if(S.managerOnly&&!ne){z("error",`⛔ لا يمكن منح "${S.label}" لـ Admin — يجب أن يكون المستخدم Manager`);return}if(!D){z("error",`صلاحية "${S.label}" غير مضافة في قاعدة البيانات`);return}const le=new Set(K.tabs);v(se=>{var je;const de=new Set(((je=se[x])==null?void 0:je.tabs)??[]);return ne?de.delete(D.id):de.add(D.id),{...se,[x]:{...se[x],tabs:de}}}),u(x,!0);try{ne?await B(x,D.id):await G(x,D.id),z("success",ne?`تم سحب صلاحية ${S.label}`:`✅ تم منح صلاحية ${S.label}`)}catch(se){v(de=>({...de,[x]:{...de[x],tabs:le}})),z("error",`فشل تحديث التبويب: ${se.message}`)}finally{u(x,!1)}},[d,F,G,B,u,z]),C=n.useCallback(async x=>{const S=d[x]??nt(),K=new Set(S.tabs),D=Ct.filter(se=>!se.managerOnly).map(se=>({tab:se,permission:F(se)})).filter(se=>se.permission&&!K.has(se.permission.id)),ne=`⛔ ${yn} للمدير (Manager) فقط ولا يمكن منحها لـ Admin`;if(D.length===0){z("error",`كل الصلاحيات المتاحة لـ Admin محددة بالفعل — ${ne}`);return}const le=new Set(K);D.forEach(se=>le.add(se.permission.id)),v(se=>({...se,[x]:{...se[x],tabs:le}})),u(x,!0);try{await Promise.all(D.map(se=>G(x,se.permission.id))),z("error",`تم تحديد ${D.length} صلاحية — لكن ${ne}`)}catch(se){await k(x,K),z("error",`فشل تحديد الصلاحيات: ${se.message}`)}finally{u(x,!1)}},[d,F,G,k,u,z]),A=n.useCallback(async x=>{const S=d[x]??nt(),K=new Set(S.tabs);if(K.size===0){z("success","لا توجد صلاحيات لإلغائها");return}v(D=>({...D,[x]:{...D[x],tabs:new Set}})),u(x,!0);try{await Promise.all([...K].map(D=>B(x,D))),z("success","تم إلغاء جميع الصلاحيات")}catch(D){await k(x,K),z("error",`فشل إلغاء الصلاحيات: ${D.message}`)}finally{u(x,!1)}},[d,B,k,u,z]),Z=n.useCallback(x=>d[x]??nt(),[d]),m=n.useCallback(x=>!!x&&x.toLowerCase()===(t==null?void 0:t.toLowerCase()),[t]),T=n.useCallback(x=>{c(S=>S===x?null:x)},[]),L=x=>!!(x!=null&&x.isManager)||(x==null?void 0:x.tabs)instanceof Set&&x.tabs.size>0,ae=n.useMemo(()=>{const x=s.trim().toLowerCase();return x?j.filter(S=>[S.username,S.email,S.firstName,S.lastName].some(K=>((K==null?void 0:K.toLowerCase())??"").includes(x))):j},[s,j]),f=Math.max(1,Math.ceil(ae.length/jt)),W=Math.min(i,f),q=ae.slice((W-1)*jt,W*jt),Q=n.useMemo(()=>{let x=0,S=0;return j.forEach(K=>{var ne;const D=d[K.id];D!=null&&D.isManager?S++:((ne=D==null?void 0:D.tabs)==null?void 0:ne.size)>0&&x++}),{admins:x,managers:S,total:j.length}},[j,d]);if(I)return e.jsxs("div",{style:{textAlign:"center",padding:"60px 0",color:ee.gray500,fontFamily:ee.font},children:[e.jsx("div",{style:{fontSize:"2rem",marginBottom:10},children:"⏳"}),e.jsx("div",{children:"جاري تحميل الصلاحيات..."})]});const ve=Ct.some(x=>!x.managerOnly&&!F(x));return e.jsxs("div",{children:[e.jsxs("div",{className:"adm-section-hdr",children:[e.jsxs("div",{children:[e.jsx("div",{className:"adm-section-tag",children:"إعدادات النظام"}),e.jsxs("div",{className:"adm-section-title",children:["إدارة ",e.jsx("span",{children:"الصلاحيات"})]})]}),e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsx(Kt,{color:ee.blue,icon:"🛡",label:"Admin",value:Q.admins}),e.jsx(Kt,{color:ee.orange,icon:"👑",label:"Manager",value:Q.managers}),e.jsx(Kt,{color:ee.gray500,icon:"👥",label:"Users",value:Q.total})]})]}),e.jsxs("div",{style:jn,children:[e.jsx("span",{style:{fontSize:"1.1rem",flexShrink:0},children:"ℹ️"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:".78rem",color:ee.blue,marginBottom:3},children:"كيف تعمل الصلاحيات؟"}),e.jsxs("div",{style:{fontSize:".72rem",color:ee.gray700,lineHeight:1.8},children:[e.jsx("b",{children:"Admin:"})," اختر التبويبات التي يمكنه الوصول إليها يدوياً.   ",e.jsx("b",{children:"Manager:"})," يصل تلقائياً لجميع التبويبات دون قيود.",e.jsx("br",{}),e.jsx("b",{children:"Manager فقط:"})," سجل النشاط والإعدادات لا يمكن منحهما لـ Admin."]})]})]}),R&&e.jsx("div",{style:{...kn,background:R.type==="success"?ee.greenBg:ee.redBg,border:`1.5px solid ${R.type==="success"?ee.greenBorder:ee.redBorder}`,borderRight:`4px solid ${R.type==="success"?ee.green:ee.red}`,color:R.type==="success"?ee.green:ee.red},children:R.msg}),e.jsxs("div",{className:"adm-toolbar",style:{marginBottom:14},children:[e.jsx("div",{className:"adm-search",style:{flex:1},children:e.jsx("input",{type:"text",placeholder:"ابحث بالاسم أو البريد الإلكتروني...",value:s,onChange:x=>{l(x.target.value),o(1),c(null)}})}),s&&e.jsx("button",{className:"adm-fclear",onClick:()=>{l(""),o(1)},children:"✕"})]}),e.jsxs("div",{className:"adm-card",children:[e.jsxs("div",{style:{padding:"14px 20px 10px",borderBottom:`1.5px solid ${ee.gray100}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8},children:[e.jsx("span",{style:{fontWeight:900,fontSize:".88rem",color:ee.black,fontFamily:ee.font},children:"👥 قائمة المستخدمين"}),e.jsxs("span",{style:{fontSize:".68rem",color:ee.gray500,fontFamily:ee.font},children:[ae.length," نتيجة"]})]}),ae.length===0?e.jsxs("div",{className:"adm-empty",children:[e.jsx("div",{className:"adm-emi",children:"🔍"}),e.jsx("p",{children:"لا توجد نتائج مطابقة"})]}):e.jsx("div",{className:"adm-tscr",children:e.jsxs("table",{className:"adm-tbl",style:{minWidth:680},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"c",style:{width:36},children:"#"}),e.jsx("th",{children:"User"}),e.jsx("th",{children:"Email"}),e.jsx("th",{className:"c",style:{width:110},children:"Admin"}),e.jsx("th",{className:"c",style:{width:110},children:"Manager"}),e.jsx("th",{className:"c",style:{width:100},children:"Tabs"})]})}),e.jsx("tbody",{children:q.map((x,S)=>{const K=(W-1)*jt+S+1,D=Z(x.id),ne=m(x.email),le=M(x.id),se=p===x.id,de=L(D),je=D.tabs.size;return e.jsxs($t.Fragment,{children:[e.jsxs("tr",{className:se?"xopen":"",style:ne?{background:"rgba(8,101,168,0.04)"}:{},children:[e.jsx("td",{style:{textAlign:"center",color:ee.gray500,fontSize:".68rem"},children:K}),e.jsx("td",{children:e.jsxs("div",{className:"adm-uc",children:[e.jsx("div",{className:"adm-av",style:{background:D.isManager?ee.orange:de?ee.blue:ee.gray300,opacity:le?.6:1},children:(x.username??x.email??"?")[0].toUpperCase()}),e.jsxs("div",{children:[e.jsx("span",{className:"adm-uname",children:x.username||`${x.firstName??""} ${x.lastName??""}`.trim()||x.email}),ne&&e.jsx("span",{style:{marginRight:6,fontSize:".58rem",padding:"1px 6px",borderRadius:2,background:ee.greenBg,border:`1px solid ${ee.greenBorder}`,color:ee.green},children:"● أنت"}),le&&e.jsx("span",{style:{marginRight:6,fontSize:".58rem",color:ee.gray500},children:"⏳"})]})]})}),e.jsx("td",{className:"adm-email",style:{direction:"ltr",textAlign:"left"},children:x.email}),e.jsx("td",{style:{textAlign:"center"},children:e.jsxs("label",{style:{...Ca,opacity:le?.5:1},children:[e.jsx("input",{type:"checkbox",checked:de,disabled:!0,readOnly:!0,style:{accentColor:ee.blue,width:15,height:15,cursor:"default"}}),e.jsx("span",{style:{fontSize:".68rem",color:de?ee.blue:ee.gray500,fontWeight:700,fontFamily:ee.font},children:de?"Admin":"نعم"})]})}),e.jsx("td",{style:{textAlign:"center"},children:e.jsxs("label",{style:{...Ca,opacity:le?.5:1},children:[e.jsx("input",{type:"checkbox",checked:D.isManager,disabled:le,onChange:ge=>Y(x.id,ge.target.checked),style:{accentColor:ee.orange,width:15,height:15,cursor:le?"not-allowed":"pointer"}}),e.jsx("span",{style:{fontSize:".68rem",color:D.isManager?ee.orange:ee.gray500,fontWeight:700,fontFamily:ee.font},children:D.isManager?"Manager":"نعم"})]})}),e.jsx("td",{style:{textAlign:"center"},children:D.isManager?e.jsx("span",{style:{fontSize:".62rem",color:ee.orange,fontWeight:700,fontFamily:ee.font},children:"كل التبويبات"}):e.jsx("span",{className:`adm-pill${se?" op":""}`,onClick:()=>T(x.id),style:{cursor:"pointer"},children:se?"▲ إخفاء":`▼ ${je>0?je:"اختر"}`})})]}),se&&!D.isManager&&e.jsx("tr",{className:"adm-xrow",children:e.jsx("td",{colSpan:6,children:e.jsxs("div",{className:"adm-xin",style:{padding:"14px 18px"},children:[e.jsxs("div",{style:{fontWeight:700,fontSize:".78rem",color:ee.blue,fontFamily:ee.font,marginBottom:10},children:["🔑 التبويبات المتاحة لـ"," ",e.jsx("span",{style:{fontFamily:"Courier New"},children:x.email})]}),e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:12},children:[e.jsx("button",{onClick:()=>C(x.id),disabled:le,style:{...$a(ee.blue),opacity:le?.5:1},children:"✅ تحديد الكل"}),e.jsx("button",{onClick:()=>A(x.id),disabled:le,style:{...$a(ee.gray500),opacity:le?.5:1},children:"✕ إلغاء الكل"})]}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:Ct.map(ge=>{const $e=F(ge),Te=!!$e,Se=Te&&D.tabs.has($e.id),Qe=!!ge.managerOnly&&!Se,ze=!Te&&!ge.managerOnly;return e.jsxs("label",{title:ge.managerOnly?"🔒 للمدير (Manager) فقط":Te?"":"⚠️ هذا التبويب غير مضاف في قاعدة البيانات",style:{display:"flex",alignItems:"center",gap:6,padding:"7px 13px",borderRadius:3,cursor:le||ze?"not-allowed":"pointer",border:`1.5px solid ${Se?ee.blue:ze?"#f0c040":ee.gray300}`,background:Se?"rgba(8,101,168,0.06)":ze?ee.yellowBg:ee.white,transition:"all .14s",fontFamily:ee.font,opacity:le?.6:Qe?.75:1},children:[e.jsx("input",{type:"checkbox",checked:Se,disabled:le||ze,onChange:()=>ie(x.id,ge),style:{accentColor:ee.blue,width:13,height:13}}),e.jsxs("span",{style:{fontSize:".74rem",fontWeight:Se?700:500,color:Se?ee.blue:ze?ee.yellow:ee.gray700},children:[ge.label,ze&&" ⚠️",ge.managerOnly&&" 🔒"]})]},ge.id)})}),ve&&e.jsx("div",{style:{marginTop:10,fontSize:".66rem",color:ee.yellow,fontFamily:ee.font},children:"⚠️ التبويبات المعلّمة بـ ⚠️ تحتاج إضافتها في جدول Permissions أولاً."}),e.jsx("div",{style:{marginTop:6,fontSize:".66rem",color:ee.gray500,fontFamily:ee.font},children:"🔒 التبويبات المعلّمة بـ 🔒 متاحة للمدير (Manager) فقط."}),e.jsx("div",{style:{marginTop:6,fontSize:".68rem",color:ee.gray500,fontFamily:ee.font},children:D.tabs.size===0?"⚠️ لم يتم تحديد أي تبويب":`✅ تم تحديد ${D.tabs.size} صلاحية من الصلاحيات الموجودة في قاعدة البيانات`})]})})})]},x.id)})})]})}),f>1&&e.jsxs("div",{style:{padding:"10px 20px 14px",borderTop:`1.5px solid ${ee.gray100}`,display:"flex",alignItems:"center",justifyContent:"center",gap:6},children:[e.jsx("button",{disabled:W===1,onClick:()=>o(x=>Math.max(1,x-1)),style:Yt(W===1),children:"›"}),Array.from({length:f},(x,S)=>S+1).map(x=>e.jsx("button",{onClick:()=>o(x),style:Yt(!1,x===W),children:x},x)),e.jsx("button",{disabled:W===f,onClick:()=>o(x=>Math.min(f,x+1)),style:Yt(W===f),children:"‹"})]})]})]})}function Kt({color:t,icon:r,label:s,value:l}){return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:3,background:`${t}10`,border:`1px solid ${t}30`},children:[e.jsx("span",{style:{fontSize:".8rem"},children:r}),e.jsx("span",{style:{fontSize:".68rem",color:t,fontWeight:700,fontFamily:'"Noto Kufi Arabic",serif'},children:s}),e.jsx("span",{style:{fontFamily:"Courier New",fontWeight:900,fontSize:".9rem",color:t},children:l})]})}const jn={background:"rgba(8,101,168,0.05)",border:"1.5px solid rgba(8,101,168,0.18)",borderRadius:3,borderRight:"4px solid #0865a8",padding:"12px 16px",marginBottom:18,display:"flex",alignItems:"flex-start",gap:10,fontFamily:'"Noto Kufi Arabic",serif'},kn={borderRadius:3,padding:"10px 14px",marginBottom:14,fontSize:".78rem",display:"flex",alignItems:"center",gap:8,fontFamily:'"Noto Kufi Arabic",serif'},Ca={display:"inline-flex",alignItems:"center",gap:5,cursor:"pointer",userSelect:"none"},$a=t=>({padding:"5px 14px",background:`${t}12`,border:`1.5px solid ${t}40`,borderRadius:2,color:t,fontFamily:'"Noto Kufi Arabic",serif',fontSize:".7rem",fontWeight:700,cursor:"pointer"}),Yt=(t,r=!1)=>({width:30,height:30,border:r?"1.5px solid #0865a8":"1.5px solid #d0d3d8",borderRadius:2,background:r?"#0865a8":"#fff",color:r?"#fff":t?"#d0d3d8":"#374151",fontWeight:700,fontSize:".78rem",cursor:t?"not-allowed":"pointer",opacity:t?.4:1}),st=`${fe}/admin/AdminTeam`,Ra=[{value:1,label:"رئيس مجلس الإدارة"},{value:2,label:"مدير المعهد"},{value:3,label:"نائب مدير المعهد"}],Nn=t=>{var r;return((r=Ra.find(s=>s.value===Number(t)))==null?void 0:r.label)||"—"};function Cn(t){return{id:t.id,name:t.name||"",role:t.role||"",level:t.level??3,displayOrder:t.displayOrder??0,isActive:t.isActive??!0,photo:t.pic||null,email:t.email||"",details:kr(t.details||"")}}function $n(t){return{name:t.name,role:t.role,level:Number(t.level),displayOrder:Number(t.displayOrder)||0,isActive:!!t.isActive,email:t.email,details:Nr(t.details)?"":Cr(t.details)}}const kt={id:0,name:"",role:"",level:3,displayOrder:0,isActive:!0,photo:null,email:"",details:""};function Sn(t=""){return t.trim().split(/\s+/).slice(0,2).map(r=>r[0]).join("").toUpperCase()||"؟"}const it=t=>t.status===401||t.status===403?"غير مصرح لك بهذا الإجراء (سجّل الدخول مرة أخرى)":`HTTP ${t.status}`,zn=()=>{const{getToken:t}=Oe(),r=n.useCallback(async(m,T={})=>{const L=await t(),ae={...T.headers||{}};return L&&(ae.Authorization=`Bearer ${L}`),fetch(m,{...T,headers:ae})},[t]),[s,l]=n.useState([]),[i,o]=n.useState(null),[p,c]=n.useState({...kt}),[j,w]=n.useState(!1),[b,h]=n.useState(""),[d,v]=n.useState(null),[I,P]=n.useState(!1),[_,U]=n.useState(!1),[R,y]=n.useState(!1),[z,O]=n.useState(!0),V=n.useRef(),F=n.useRef(null),E=(m,T="success")=>{v({msg:m,type:T}),setTimeout(()=>v(null),3500)};n.useEffect(()=>{u()},[]);const u=async(m=null)=>{O(!0);try{const T=await r(st);if(!T.ok)throw new Error(it(T));const L=(await T.json()).map(Cn);l(L);const ae=L.find(f=>f.id===m)||L[0];ae?(o(ae),c({...ae}),w(!1)):(o(null),c({...kt}),w(!0))}catch(T){E(`فشل تحميل البيانات: ${T.message}`,"error")}finally{O(!1)}},M=s.filter(m=>m.name.toLowerCase().includes(b.toLowerCase())||m.role.toLowerCase().includes(b.toLowerCase())),G=m=>{o(m),c({...m}),w(!1),U(!1),F.current=null},B=m=>{const{name:T,value:L,type:ae,checked:f}=m.target;c(W=>({...W,[T]:ae==="checkbox"?f:L}))},k=n.useCallback(m=>{if(!m||!m.type.startsWith("image/"))return;F.current=m;const T=new FileReader;T.onload=L=>c(ae=>({...ae,photo:L.target.result})),T.readAsDataURL(m)},[]),Y=async(m,T)=>{const L=new FormData;L.append("file",T);const ae=await r(`${st}/${m}/photo`,{method:"POST",body:L});if(!ae.ok)throw new Error(`فشل رفع الصورة: ${it(ae)}`)},ie=async()=>{if(!p.name.trim()){E("الاسم مطلوب","error");return}y(!0);try{const m=JSON.stringify($n(p)),T={"Content-Type":"application/json"};let L=p.id;if(j){const ae=await r(st,{method:"POST",headers:T,body:m});if(!ae.ok)throw new Error(it(ae));L=(await ae.json()).id}else{const ae=await r(`${st}/${p.id}`,{method:"PUT",headers:T,body:m});if(!ae.ok)throw new Error(it(ae))}F.current&&(await Y(L,F.current),F.current=null),await u(L),E(j?"تم إضافة العضو بنجاح":"تم حفظ التغييرات بنجاح")}catch(m){E(`حدث خطأ: ${m.message}`,"error")}finally{y(!1)}},C=()=>{c({...kt}),o(null),w(!0),U(!1),F.current=null},A=async()=>{if(!_){U(!0);return}y(!0);try{const m=await r(`${st}/${i.id}`,{method:"DELETE"});if(!m.ok)throw new Error(it(m));U(!1),await u(),E("تم حذف العضو","error")}catch(m){E(`فشل الحذف: ${m.message}`,"error")}finally{y(!1)}},Z=()=>{c(j?{...kt}:{...i}),U(!1),F.current=null,E("تم إلغاء التغييرات","info")};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:0},children:[d&&e.jsxs("div",{className:`lec-notif lec-notif-${d.type}`,style:{marginBottom:12},children:[e.jsx("span",{children:d.type==="success"?"✅":d.type==="error"?"❌":"ℹ️"}),d.msg]}),R&&e.jsxs("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.25)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,fontSize:"1.4rem",color:"#fff",gap:10},children:[e.jsx("span",{style:{animation:"spin 1s linear infinite",display:"inline-block"},children:"⏳"}),"جاري الحفظ..."]}),e.jsxs("div",{className:"lec-layout",children:[e.jsxs("div",{className:"lec-panel",style:{height:"calc(100vh - 120px)",overflowY:"auto",position:"sticky",top:0},children:[e.jsxs("div",{className:"lec-panel-hdr",children:[e.jsx("span",{className:"lec-count-badge",children:M.length}),e.jsx("span",{style:{fontWeight:800,fontSize:".8rem",color:"#0a0a0a",flex:1,textAlign:"center"},children:"فريق العمل"}),e.jsx("button",{className:"lec-new-btn",onClick:C,children:"+ جديد"})]}),e.jsx("div",{style:{padding:"10px 10px 6px",position:"relative"},children:e.jsxs("div",{className:"adm-search",style:{minWidth:"unset"},children:[e.jsx("input",{type:"text",placeholder:"بحث بالاسم أو المنصب...",value:b,onChange:m=>h(m.target.value),style:{fontSize:".76rem"}}),b&&e.jsx("button",{className:"lec-search-clear",onClick:()=>h(""),children:"✕"})]})}),e.jsx("div",{className:"lec-list",children:z?e.jsxs("div",{className:"adm-empty",style:{padding:"32px 12px"},children:[e.jsx("div",{className:"adm-emi",children:"⏳"}),e.jsx("p",{children:"جاري التحميل..."})]}):M.length===0?e.jsxs("div",{className:"adm-empty",style:{padding:"32px 12px"},children:[e.jsx("div",{className:"adm-emi",children:"🔍"}),e.jsx("p",{children:"لا توجد نتائج"})]}):M.map(m=>e.jsxs("div",{className:`lec-row${(i==null?void 0:i.id)===m.id?" active":""}`,onClick:()=>G(m),style:m.isActive?void 0:{opacity:.5},children:[e.jsx("div",{className:"lec-avatar",children:m.photo?e.jsx("img",{src:m.photo,alt:""}):e.jsx("span",{children:Sn(m.name)})}),e.jsxs("div",{className:"lec-row-info",children:[e.jsx("div",{className:"lec-row-name",children:m.name||"بدون اسم"}),e.jsxs("div",{className:"lec-row-spec",children:[Nn(m.level),m.isActive?"":" • مخفي"]})]}),e.jsxs("div",{className:"lec-row-id",children:["#",m.id]})]},m.id))})]}),e.jsx("div",{className:"lec-form-wrap",style:{height:"calc(100vh - 120px)",overflowY:"auto"},children:e.jsxs("div",{className:"adm-card lec-form-card",children:[e.jsxs("div",{className:"lec-form-hdr",children:[e.jsxs("div",{children:[e.jsx("div",{className:"adm-hero-tag",style:{marginBottom:6,position:"relative",zIndex:1},children:j?"عضو جديد":`ID: #${i==null?void 0:i.id}`}),e.jsx("h2",{className:"lec-form-title",children:j?"➕ إضافة عضو جديد":"✏️ تعديل بيانات العضو"}),!j&&i&&e.jsx("p",{className:"lec-form-sub",children:i.name})]}),e.jsxs("div",{className:"lec-stat-pill",children:["👥 ",s.length," عضو"]})]}),e.jsxs("div",{className:"lec-form-body",children:[e.jsxs("div",{className:"lec-top-row",children:[e.jsxs("div",{className:"lec-photo-col",children:[e.jsx("label",{className:"lec-label",children:"الصورة"}),e.jsx("div",{className:`lec-photo-zone${I?" over":""}`,onDragOver:m=>{m.preventDefault(),P(!0)},onDragLeave:()=>P(!1),onDrop:m=>{m.preventDefault(),P(!1),k(m.dataTransfer.files[0])},onClick:()=>V.current.click(),children:p.photo?e.jsxs(e.Fragment,{children:[e.jsx("img",{src:p.photo,alt:"عضو",className:"lec-photo-img"}),e.jsxs("div",{className:"lec-photo-overlay",children:[e.jsx("span",{style:{fontSize:"1.6rem"},children:"📷"}),e.jsx("span",{className:"lec-photo-overlay-txt",children:"تغيير الصورة"})]})]}):e.jsxs("div",{className:"lec-photo-placeholder",children:[e.jsx("div",{className:"lec-photo-icon",children:"👤"}),e.jsxs("span",{className:"lec-photo-hint",children:["اسحب صورة هنا",e.jsx("br",{}),"أو اضغط للاختيار"]}),e.jsx("span",{className:"lec-photo-types",children:"JPG · PNG · WEBP"})]})}),e.jsx("input",{ref:V,type:"file",accept:"image/jpeg,image/png,image/webp",style:{display:"none"},onChange:m=>k(m.target.files[0])})]}),e.jsxs("div",{className:"lec-fields-grid",children:[e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"الرقم"}),e.jsx("input",{className:"lec-inp",value:j?"تلقائي":p.id,disabled:!0,style:{background:a.gray100,color:a.gray500,cursor:"not-allowed"}})]}),e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"الاسم *"}),e.jsx("input",{className:"lec-inp",name:"name",value:p.name,onChange:B,placeholder:"م. / د. / أ. الاسم..."})]}),e.jsxs("div",{className:"lec-field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{className:"lec-label",children:"المنصب"}),e.jsx("input",{className:"lec-inp",name:"role",value:p.role,onChange:B,placeholder:"مثال: نائب مدير المعهد للشئون الفنية"})]}),e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"المستوى في الهيكل"}),e.jsx("select",{className:"lec-inp",name:"level",value:p.level,onChange:B,children:Ra.map(m=>e.jsx("option",{value:m.value,children:m.label},m.value))})]}),e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"ترتيب العرض (الأصغر أولاً)"}),e.jsx("input",{className:"lec-inp",type:"number",name:"displayOrder",value:p.displayOrder,onChange:B})]}),e.jsxs("div",{className:"lec-field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{className:"lec-label",children:"البريد الإلكتروني"}),e.jsx("input",{className:"lec-inp",type:"email",name:"email",value:p.email,onChange:B,placeholder:"example@domain.com",style:{direction:"ltr",textAlign:"right"}})]}),e.jsx("div",{className:"lec-field",style:{gridColumn:"1/-1"},children:e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",name:"isActive",checked:p.isActive,onChange:B}),e.jsx("span",{className:"lec-label",style:{margin:0},children:"ظاهر في صفحة فريق العمل"})]})})]})]}),e.jsx("div",{className:"lec-divider"}),e.jsx(yr,{icon:"📋",label:"المؤهلات والخبرات",sub:"حدد النص أولاً ثم اختر الخط أو الحجم أو اللون — يمكن إضافة روابط",name:"details",value:p.details,onChange:B,placeholder:"المؤهلات العلمية والخبرات العملية والمشروعات...",minHeight:160}),e.jsxs("div",{className:"lec-actions",children:[e.jsx("button",{className:"lec-act-btn save",onClick:ie,disabled:R,children:R?"⏳ جاري الحفظ...":"💾 حفظ"}),e.jsx("button",{className:"lec-act-btn new",onClick:C,disabled:R,children:"➕ عضو جديد"}),e.jsx("button",{className:"lec-act-btn reset",onClick:Z,disabled:R,children:"↩ إلغاء"}),e.jsx("div",{style:{flex:1}}),!j&&(_?e.jsxs("div",{className:"lec-delete-confirm",children:[e.jsx("span",{className:"lec-delete-warn",children:"⚠️ هل أنت متأكد من الحذف؟"}),e.jsx("button",{className:"lec-act-btn delete",onClick:A,disabled:R,children:"تأكيد الحذف"}),e.jsx("button",{className:"adm-fclear",onClick:()=>U(!1),children:"إلغاء"})]}):e.jsx("button",{className:"lec-act-btn delete",onClick:A,disabled:R,children:"🗑 حذف العضو"}))]})]})]})})]})]})},lt="https://icemt.arabcont.com/api/admin/AdminCertifications",Oa=[{value:1,label:"شهادة / اعتماد"},{value:2,label:"خطاب شكر"}],An=t=>{var r;return((r=Oa.find(s=>s.value===Number(t)))==null?void 0:r.label)||"—"};function Tn(t){return{id:t.id,type:t.type??1,title:t.title||"",description:t.description||"",linkUrl:t.linkUrl||"",linkText:t.linkText||"",displayOrder:t.displayOrder??0,isActive:t.isActive??!0,photo:t.pic||null}}function En(t){return{type:Number(t.type),title:t.title,description:t.description,linkUrl:t.linkUrl,linkText:t.linkText,displayOrder:Number(t.displayOrder)||0,isActive:!!t.isActive}}const Nt={id:0,type:1,title:"",description:"",linkUrl:"",linkText:"",displayOrder:0,isActive:!0,photo:null};function In(t=""){return t.trim().split(/\s+/).slice(0,2).map(r=>r[0]).join("").toUpperCase()||"؟"}const Fn=()=>{const{getToken:t}=Oe(),r=async(f,W={})=>{const q=await t();return fetch(f,{...W,headers:{...W.headers||{},Authorization:`Bearer ${q}`}})},[s,l]=n.useState([]),[i,o]=n.useState(null),[p,c]=n.useState({...Nt}),[j,w]=n.useState(!1),[b,h]=n.useState(""),[d,v]=n.useState("all"),[I,P]=n.useState(null),[_,U]=n.useState(!1),[R,y]=n.useState(!1),[z,O]=n.useState(!1),[V,F]=n.useState(!0),E=n.useRef(),u=n.useRef(null),M=(f,W="success")=>{P({msg:f,type:W}),setTimeout(()=>P(null),3500)};n.useEffect(()=>{G()},[]);const G=async(f=null)=>{F(!0);try{const W=await r(lt);if(!W.ok)throw new Error(`HTTP ${W.status}`);const q=(await W.json()).map(Tn);l(q);const Q=q.find(ve=>ve.id===f)||q[0];Q?(o(Q),c({...Q}),w(!1)):(o(null),c({...Nt}),w(!0))}catch(W){M(`فشل تحميل البيانات: ${W.message}`,"error")}finally{F(!1)}},B=b.toLowerCase(),k=s.filter(f=>(d==="all"||f.type===d)&&f.title.toLowerCase().includes(B)),Y=f=>{o(f),c({...f}),w(!1),y(!1),u.current=null},ie=f=>{const{name:W,value:q,type:Q,checked:ve}=f.target;c(x=>({...x,[W]:Q==="checkbox"?ve:q}))},C=n.useCallback(f=>{if(!f||!f.type.startsWith("image/"))return;u.current=f;const W=new FileReader;W.onload=q=>c(Q=>({...Q,photo:q.target.result})),W.readAsDataURL(f)},[]),A=async(f,W)=>{const q=new FormData;q.append("file",W);const Q=await r(`${lt}/${f}/photo`,{method:"POST",body:q});if(!Q.ok)throw new Error(`فشل رفع الصورة: HTTP ${Q.status}`)},Z=async()=>{if(!p.title.trim()){M("العنوان مطلوب","error");return}if(p.linkUrl.trim()&&!/^https?:\/\//i.test(p.linkUrl.trim())){M("الرابط يجب أن يبدأ بـ http:// أو https://","error");return}O(!0);try{const f=JSON.stringify(En(p)),W={"Content-Type":"application/json"};let q=p.id;if(j){const Q=await r(lt,{method:"POST",headers:W,body:f});if(!Q.ok)throw new Error(`HTTP ${Q.status}`);q=(await Q.json()).id}else{const Q=await r(`${lt}/${p.id}`,{method:"PUT",headers:W,body:f});if(!Q.ok)throw new Error(`HTTP ${Q.status}`)}u.current&&(await A(q,u.current),u.current=null),await G(q),M(j?"تمت الإضافة بنجاح":"تم حفظ التغييرات بنجاح")}catch(f){M(`حدث خطأ: ${f.message}`,"error")}finally{O(!1)}},m=()=>{c({...Nt,type:d==="all"?1:d}),o(null),w(!0),y(!1),u.current=null},T=async()=>{if(!R){y(!0);return}O(!0);try{const f=await r(`${lt}/${i.id}`,{method:"DELETE"});if(!f.ok)throw new Error(`HTTP ${f.status}`);y(!1),await G(),M("تم الحذف","error")}catch(f){M(`فشل الحذف: ${f.message}`,"error")}finally{O(!1)}},L=()=>{c(j?{...Nt}:{...i}),y(!1),u.current=null,M("تم إلغاء التغييرات","info")},ae=Number(p.type)===1;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:0},children:[I&&e.jsxs("div",{className:`lec-notif lec-notif-${I.type}`,style:{marginBottom:12},children:[e.jsx("span",{children:I.type==="success"?"✅":I.type==="error"?"❌":"ℹ️"}),I.msg]}),z&&e.jsxs("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,.25)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,fontSize:"1.4rem",color:"#fff",gap:10},children:[e.jsx("span",{style:{animation:"spin 1s linear infinite",display:"inline-block"},children:"⏳"}),"جاري الحفظ..."]}),e.jsxs("div",{className:"lec-layout",children:[e.jsxs("div",{className:"lec-panel",style:{height:"calc(100vh - 120px)",overflowY:"auto",position:"sticky",top:0},children:[e.jsxs("div",{className:"lec-panel-hdr",children:[e.jsx("span",{className:"lec-count-badge",children:k.length}),e.jsx("span",{style:{fontWeight:800,fontSize:".8rem",color:"#0a0a0a",flex:1,textAlign:"center"},children:"الشهادات وخطابات الشكر"}),e.jsx("button",{className:"lec-new-btn",onClick:m,children:"+ جديد"})]}),e.jsx("div",{style:{padding:"10px 10px 0",display:"flex",gap:6,flexWrap:"wrap"},children:[{id:"all",label:"الكل"},{id:1,label:"الشهادات"},{id:2,label:"خطابات الشكر"}].map(f=>e.jsx("button",{className:"adm-fclear",style:d===f.id?{background:a.blue,color:"#fff"}:void 0,onClick:()=>v(f.id),children:f.label},String(f.id)))}),e.jsx("div",{style:{padding:"10px 10px 6px",position:"relative"},children:e.jsxs("div",{className:"adm-search",style:{minWidth:"unset"},children:[e.jsx("input",{type:"text",placeholder:"بحث بالعنوان...",value:b,onChange:f=>h(f.target.value),style:{fontSize:".76rem"}}),b&&e.jsx("button",{className:"lec-search-clear",onClick:()=>h(""),children:"✕"})]})}),e.jsx("div",{className:"lec-list",children:V?e.jsxs("div",{className:"adm-empty",style:{padding:"32px 12px"},children:[e.jsx("div",{className:"adm-emi",children:"⏳"}),e.jsx("p",{children:"جاري التحميل..."})]}):k.length===0?e.jsxs("div",{className:"adm-empty",style:{padding:"32px 12px"},children:[e.jsx("div",{className:"adm-emi",children:"🔍"}),e.jsx("p",{children:"لا توجد نتائج"})]}):k.map(f=>e.jsxs("div",{className:`lec-row${(i==null?void 0:i.id)===f.id?" active":""}`,onClick:()=>Y(f),style:f.isActive?void 0:{opacity:.5},children:[e.jsx("div",{className:"lec-avatar",children:f.photo?e.jsx("img",{src:f.photo,alt:""}):e.jsx("span",{children:In(f.title)})}),e.jsxs("div",{className:"lec-row-info",children:[e.jsx("div",{className:"lec-row-name",children:f.title||"بدون عنوان"}),e.jsxs("div",{className:"lec-row-spec",children:[An(f.type),f.isActive?"":" • مخفي"]})]}),e.jsxs("div",{className:"lec-row-id",children:["#",f.id]})]},f.id))})]}),e.jsx("div",{className:"lec-form-wrap",style:{height:"calc(100vh - 120px)",overflowY:"auto"},children:e.jsxs("div",{className:"adm-card lec-form-card",children:[e.jsxs("div",{className:"lec-form-hdr",children:[e.jsxs("div",{children:[e.jsx("div",{className:"adm-hero-tag",style:{marginBottom:6,position:"relative",zIndex:1},children:j?"عنصر جديد":`ID: #${i==null?void 0:i.id}`}),e.jsx("h2",{className:"lec-form-title",children:j?"➕ إضافة عنصر جديد":"✏️ تعديل العنصر"}),!j&&i&&e.jsx("p",{className:"lec-form-sub",children:i.title})]}),e.jsxs("div",{className:"lec-stat-pill",children:["🏅 ",s.length," عنصر"]})]}),e.jsxs("div",{className:"lec-form-body",children:[e.jsxs("div",{className:"lec-top-row",children:[e.jsxs("div",{className:"lec-photo-col",children:[e.jsx("label",{className:"lec-label",children:"الصورة"}),e.jsx("div",{className:`lec-photo-zone${_?" over":""}`,onDragOver:f=>{f.preventDefault(),U(!0)},onDragLeave:()=>U(!1),onDrop:f=>{f.preventDefault(),U(!1),C(f.dataTransfer.files[0])},onClick:()=>E.current.click(),children:p.photo?e.jsxs(e.Fragment,{children:[e.jsx("img",{src:p.photo,alt:"",className:"lec-photo-img",style:{objectFit:"contain"}}),e.jsxs("div",{className:"lec-photo-overlay",children:[e.jsx("span",{style:{fontSize:"1.6rem"},children:"📷"}),e.jsx("span",{className:"lec-photo-overlay-txt",children:"تغيير الصورة"})]})]}):e.jsxs("div",{className:"lec-photo-placeholder",children:[e.jsx("div",{className:"lec-photo-icon",children:"🏅"}),e.jsxs("span",{className:"lec-photo-hint",children:["اسحب صورة هنا",e.jsx("br",{}),"أو اضغط للاختيار"]}),e.jsx("span",{className:"lec-photo-types",children:"JPG · PNG · WEBP"})]})}),e.jsx("input",{ref:E,type:"file",accept:"image/jpeg,image/png,image/webp",style:{display:"none"},onChange:f=>C(f.target.files[0])})]}),e.jsxs("div",{className:"lec-fields-grid",children:[e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"الرقم"}),e.jsx("input",{className:"lec-inp",value:j?"تلقائي":p.id,disabled:!0,style:{background:a.gray100,color:a.gray500,cursor:"not-allowed"}})]}),e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"النوع"}),e.jsx("select",{className:"lec-inp",name:"type",value:p.type,onChange:ie,children:Oa.map(f=>e.jsx("option",{value:f.value,children:f.label},f.value))})]}),e.jsxs("div",{className:"lec-field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{className:"lec-label",children:"العنوان *"}),e.jsx("input",{className:"lec-inp",name:"title",value:p.title,onChange:ie,placeholder:"مثال: شهادة الاعتماد المؤسسي"})]}),e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"ترتيب العرض (الأصغر أولاً)"}),e.jsx("input",{className:"lec-inp",type:"number",name:"displayOrder",value:p.displayOrder,onChange:ie})]}),e.jsx("div",{className:"lec-field",style:{display:"flex",alignItems:"flex-end"},children:e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",name:"isActive",checked:p.isActive,onChange:ie}),e.jsx("span",{className:"lec-label",style:{margin:0},children:"ظاهر في الصفحة"})]})})]})]}),ae&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"lec-divider"}),e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"الوصف"}),e.jsx("textarea",{className:"lec-inp",rows:5,name:"description",value:p.description,onChange:ie,placeholder:"نص الوصف الذي يظهر تحت العنوان..."})]}),e.jsxs("div",{className:"lec-fields-grid",style:{marginTop:12},children:[e.jsxs("div",{className:"lec-field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{className:"lec-label",children:"الرابط (اختياري)"}),e.jsx("input",{className:"lec-inp",name:"linkUrl",value:p.linkUrl,onChange:ie,placeholder:"https://...",style:{direction:"ltr",textAlign:"left"}})]}),e.jsxs("div",{className:"lec-field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{className:"lec-label",children:"نص الرابط"}),e.jsx("input",{className:"lec-inp",name:"linkText",value:p.linkText,onChange:ie,placeholder:"مثال: عرض الاعتماد على موقع إتقان"})]})]})]}),e.jsxs("div",{className:"lec-actions",style:{marginTop:16},children:[e.jsx("button",{className:"lec-act-btn save",onClick:Z,disabled:z,children:z?"⏳ جاري الحفظ...":"💾 حفظ"}),e.jsx("button",{className:"lec-act-btn new",onClick:m,disabled:z,children:"➕ جديد"}),e.jsx("button",{className:"lec-act-btn reset",onClick:L,disabled:z,children:"↩ إلغاء"}),e.jsx("div",{style:{flex:1}}),!j&&(R?e.jsxs("div",{className:"lec-delete-confirm",children:[e.jsx("span",{className:"lec-delete-warn",children:"⚠️ هل أنت متأكد من الحذف؟"}),e.jsx("button",{className:"lec-act-btn delete",onClick:T,disabled:z,children:"تأكيد الحذف"}),e.jsx("button",{className:"adm-fclear",onClick:()=>y(!1),children:"إلغاء"})]}):e.jsx("button",{className:"lec-act-btn delete",onClick:T,disabled:z,children:"🗑 حذف"}))]})]})]})})]})]})},Pn=`${fe}/admin/AdminActivity`,Rn=1e4,Ht={Create:{label:"➕ إضافة",style:{background:"#dcfce7",color:"#166534"}},Update:{label:"✏️ تعديل",style:{background:"#e0f2fe",color:"#0369a1"}},Delete:{label:"🗑 حذف",style:{background:"#fee2e2",color:"#b91c1c"}}},La=[{id:"users",label:"المستخدمون",icon:"👤"},{id:"courses",label:"الدورات",icon:"📚"},{id:"attendance",label:"الحضور",icon:"✅"},{id:"certificates",label:"الشهادات",icon:"📜"},{id:"refunds",label:"المستردات",icon:"💳"},{id:"financial",label:"المالية",icon:"💰"},{id:"lecturers",label:"المحاضرون",icon:"🎓"},{id:"team",label:"فريق العمل",icon:"👥"},{id:"customers",label:"العملاء",icon:"🏢"},{id:"protocols",label:"البروتوكولات",icon:"🤝"},{id:"siteCerts",label:"الشهادات وخطابات الشكر",icon:"🏅"},{id:"news",label:"الأخبار",icon:"📰"},{id:"books",label:"الكتب",icon:"📖"},{id:"planwork",label:"الدورات التدريبية",icon:"📋"},{id:"settings",label:"الإعدادات",icon:"⚙️"},{id:"other",label:"أخرى",icon:"📁"}],Sa=t=>La.find(r=>r.id===t),za=t=>new Date(t).toLocaleString("en-GB",{timeZone:"Africa/Cairo",day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}),On=()=>new Date().toLocaleDateString("en-CA",{timeZone:"Africa/Cairo"}),Aa=(t="")=>t?t.split(/\r?\n/).filter(r=>!/CreatedBy/i.test(r)&&!/البريد الإلكتروني/.test(r)).join(`
`).replace(/\s*[|،;]?\s*CreatedBy\s*[:：]\s*[«"]?[^»"\n|]*[»"]?/gi,"").replace(/\s*[|،;]?\s*البريد الإلكتروني\s*[:：]\s*[«"]?[^»"\n|]*[»"]?/g,"").trim():"",Ln=({setExporting:t,setExportError:r})=>{const{getToken:s}=Oe(),l=n.useRef(null),[i,o]=n.useState(!1),[p,c]=n.useState([]),[j,w]=n.useState(0),[b,h]=n.useState(1),[d,v]=n.useState(!0),[I,P]=n.useState(null),[_,U]=n.useState(!0),[R,y]=n.useState(null),[z,O]=n.useState(""),[V,F]=n.useState(""),[E,u]=n.useState(""),[M,G]=n.useState(""),[B,k]=n.useState(""),[Y,ie]=n.useState(""),C=n.useCallback((S,K)=>{const D=new URLSearchParams({page:S,pageSize:K});if(z.trim()&&D.set("search",z.trim()),V&&D.set("actionType",V),E&&D.set("section",E),M&&D.set("role",M),B&&D.set("from",new Date(`${B}T00:00:00`).toISOString()),Y){const ne=new Date(`${Y}T00:00:00`);ne.setDate(ne.getDate()+1),D.set("to",ne.toISOString())}return D},[z,V,E,M,B,Y]),A=n.useCallback(async(S,K)=>{const D=await s(),ne=await fetch(`${Pn}?${C(S,K)}`,{headers:D?{Authorization:`Bearer ${D}`}:{}});if(!ne.ok)throw new Error(ne.status===401||ne.status===403?"غير مصرح لك بهذا الإجراء":`HTTP ${ne.status}`);return ne.json()},[s,C]),Z=n.useCallback(async(S=!1)=>{S||(v(!0),P(null));try{const K=await A(b,xe);c(K.items||[]),w(K.total||0),y(new Date),P(null)}catch(K){S||P(K.message)}finally{S||v(!1)}},[b,A]);n.useEffect(()=>{const S=setTimeout(()=>Z(!1),350);return()=>clearTimeout(S)},[Z]),n.useEffect(()=>{if(!_)return;const S=setInterval(()=>{document.hidden||Z(!0)},Rn);return()=>clearInterval(S)},[_,Z]),n.useEffect(()=>{h(1)},[z,V,E,M,B,Y]);const m=z||V||E||M||B||Y,T=()=>{O(""),F(""),u(""),G(""),k(""),ie("")},L=()=>{const S=On();k(S),ie(S)},ae=Xe(t,r,()=>o(!1)),f=async()=>{const K=(await A(1,5e3)).items||[];if(K.length===0)throw new Error("لا توجد سجلات للتصدير");const D=["#","المستخدم","البريد الإلكتروني","الدور","الإجراء","القسم","الجزء","النوع","رقم العنصر","التفاصيل","عنوان IP","التاريخ والوقت"],ne=K.map((le,se)=>{var je;const de=Sa(le.section);return[se+1,le.adminName||"",le.adminEmail||"",le.adminRole==="Manager"?"مدير":"أدمن",(((je=Ht[le.actionType])==null?void 0:je.label)||le.actionType).replace(/^\S+\s/,""),de?de.label:"",le.subSection||"",le.entityType||"",le.entityId||"",Aa(le.details).replace(/\s*\n\s*/g," | "),le.ipAddress||"",za(le.createdAt)]});return Ne(D,ne)},W=`سجل النشاط${B?` - من ${B}`:""}${Y?` إلى ${Y}`:""}`,q=`سجل-النشاط${B?`-${B}`:""}${Y&&Y!==B?`-${Y}`:""}`,Q=ae(async()=>{const{headers:S,rows:K}=await f();await We(`${q}.xlsx`,W,S,K,we)}),ve=ae(async()=>{const{headers:S,rows:K}=await f();await _e(`${q}.pdf`,W,S,K,"ICEMT",we)}),x=ae(async()=>{const{headers:S,rows:K}=await f();await Ue(`${q}.docx`,W,"ICEMT",S,K,we)});return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"adm-section-hdr",children:[e.jsxs("div",{children:[e.jsx("div",{className:"adm-section-tag",children:"المراقبة"}),e.jsxs("div",{className:"adm-section-title",children:["سجل ",e.jsx("span",{children:"النشاط"})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,fontSize:".72rem",color:a.gray500},children:[R&&e.jsxs("span",{children:["آخر تحديث: ",R.toLocaleTimeString("en-GB",{timeZone:"Africa/Cairo",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0})]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:4,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:_,onChange:S=>U(S.target.checked)}),"تحديث تلقائي"]}),e.jsx("button",{className:"adm-fclear",onClick:()=>Z(!1),children:"🔄 تحديث"})]})]}),e.jsxs("div",{className:"adm-toolbar",children:[e.jsx("div",{className:"adm-search",children:e.jsx("input",{type:"text",placeholder:"ابحث باسم الأدمن أو البريد أو التفاصيل...",value:z,onChange:S=>O(S.target.value)})}),e.jsxs("select",{className:"adm-fdate",value:M,onChange:S=>G(S.target.value),children:[e.jsx("option",{value:"",children:"كل الأدوار"}),e.jsx("option",{value:"Manager",children:"🔐 مدير"}),e.jsx("option",{value:"Admin",children:"👤 أدمن"})]}),e.jsxs("select",{className:"adm-fdate",value:V,onChange:S=>F(S.target.value),children:[e.jsx("option",{value:"",children:"كل الإجراءات"}),Object.entries(Ht).map(([S,K])=>e.jsx("option",{value:S,children:K.label},S))]}),e.jsxs("select",{className:"adm-fdate",value:E,onChange:S=>u(S.target.value),children:[e.jsx("option",{value:"",children:"كل الأقسام"}),La.map(S=>e.jsxs("option",{value:S.id,children:[S.icon," ",S.label]},S.id))]}),e.jsx("button",{className:"adm-fclear",onClick:L,style:{fontWeight:700},children:"📅 اليوم"}),e.jsx("span",{style:{fontSize:".68rem",color:a.gray500},children:"من"}),e.jsx("input",{type:"date",className:"adm-fdate",value:B,onChange:S=>k(S.target.value)}),e.jsx("span",{style:{fontSize:".68rem",color:a.gray500},children:"إلى"}),e.jsx("input",{type:"date",className:"adm-fdate",value:Y,min:B,onChange:S=>ie(S.target.value)}),m&&e.jsx("button",{className:"adm-fclear",onClick:T,children:"✕"}),e.jsxs("div",{className:"adm-expw",ref:l,style:{marginRight:"auto"},children:[e.jsx("button",{className:"adm-expbtn",onClick:()=>o(S=>!S),children:"⬇ تصدير ▾"}),i&&e.jsxs("div",{className:"adm-expmenu",children:[e.jsx("button",{className:"adm-expitem",onClick:Q,children:"📊 Excel (.xlsx)"}),e.jsx("button",{className:"adm-expitem",onClick:ve,children:"📄 PDF"}),e.jsx("button",{className:"adm-expitem",onClick:x,children:"📝 Word (.docx)"})]})]})]}),e.jsx("div",{className:"adm-card",children:d?e.jsxs("div",{className:"adm-ld",children:[e.jsx("div",{className:"adm-sp"}),e.jsx("p",{children:"جاري تحميل السجل..."})]}):I?e.jsxs("div",{className:"adm-empty",children:[e.jsx("div",{className:"adm-emi",children:"⚠️"}),e.jsx("p",{children:I})]}):p.length===0?e.jsxs("div",{className:"adm-empty",children:[e.jsx("div",{className:"adm-emi",children:"🔍"}),e.jsx("p",{children:"لا توجد سجلات"})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"adm-tscr",children:e.jsxs("table",{className:"adm-tbl",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"c",style:{width:40},children:"#"}),e.jsx("th",{children:"المستخدم"}),e.jsx("th",{children:"البريد الإلكتروني"}),e.jsx("th",{className:"c",children:"الدور"}),e.jsx("th",{className:"c",children:"الإجراء"}),e.jsx("th",{children:"القسم"}),e.jsx("th",{children:"الجزء"}),e.jsx("th",{children:"النوع"}),e.jsx("th",{className:"c",children:"رقم العنصر"}),e.jsx("th",{style:{minWidth:380},children:"التفاصيل"}),e.jsx("th",{children:"عنوان IP"}),e.jsx("th",{children:"التاريخ والوقت"})]})}),e.jsx("tbody",{children:p.map((S,K)=>{const D=Ht[S.actionType]||{label:S.actionType,style:{}},ne=Sa(S.section);return e.jsxs("tr",{children:[e.jsx("td",{style:{color:a.gray500,fontSize:".68rem",textAlign:"center"},children:(b-1)*xe+K+1}),e.jsx("td",{className:"adm-uname",children:S.adminName||"—"}),e.jsx("td",{className:"adm-email",children:S.adminEmail||"—"}),e.jsx("td",{style:{textAlign:"center"},children:e.jsx("span",{className:"adm-mode-badge",style:S.adminRole==="Manager"?{background:"#fef3c7",color:"#92400e"}:{background:"#e0f2fe",color:"#0369a1"},children:S.adminRole==="Manager"?"🔐 مدير":"👤 أدمن"})}),e.jsx("td",{style:{textAlign:"center"},children:e.jsx("span",{className:"adm-mode-badge",style:D.style,children:D.label})}),e.jsx("td",{style:{fontWeight:700},children:ne?`${ne.icon} ${ne.label}`:"—"}),e.jsx("td",{children:S.subSection||"—"}),e.jsx("td",{style:{fontSize:".7rem",color:a.gray500},children:S.entityType||"—"}),e.jsx("td",{style:{textAlign:"center"},children:S.entityId||"—"}),e.jsx("td",{dir:"auto",style:{minWidth:380,maxWidth:520,whiteSpace:"pre-line",lineHeight:1.7,fontSize:".72rem"},children:Aa(S.details)||"—"}),e.jsx("td",{style:{direction:"ltr",textAlign:"right",fontSize:".7rem"},children:S.ipAddress||"—"}),e.jsx("td",{dir:"ltr",style:{whiteSpace:"nowrap",textAlign:"right"},children:za(S.createdAt)})]},S.id)})})]})}),e.jsx(Ze,{currentPage:b,totalItems:j,itemsPerPage:xe,onPageChange:h,accentColor:a.blue})]})})]})},Dn="https://icemt.arabcont.com/api/admin/AdminGallery",Mn=[{id:"albums",label:"🖼️ ألبومات الصور"},{id:"videos",label:"🎬 الفيديوهات"},{id:"categories",label:"🗂️ التصنيفات"}];function Ta({cat:t,ctx:r,isNew:s=!1}){const{call:l,toast:i,reload:o}=r,[p,c]=n.useState({name:t.name,description:t.description||"",displayOrder:t.displayOrder,isActive:t.isActive}),[j,w]=n.useState(!1),b=(v,I)=>c(P=>({...P,[v]:I})),h=async()=>{if(!p.name.trim()){i("اسم التصنيف مطلوب","error");return}w(!0);try{const v={kind:t.kind,name:p.name,description:p.description,displayOrder:Number(p.displayOrder)||0,isActive:p.isActive};s?await l("/categories","POST",v):await l(`/categories/${t.id}`,"PUT",v),await o(),i(s?"تمت الإضافة":"تم الحفظ")}catch(v){i(v.message,"error")}finally{w(!1)}},d=async()=>{if(window.confirm("حذف هذا التصنيف؟")){w(!0);try{await l(`/categories/${t.id}`,"DELETE"),await o(),i("تم الحذف","error")}catch(v){i(v.message,"error")}finally{w(!1)}}};return e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #eee"},children:[e.jsx("input",{className:"lec-inp",style:{flex:"2 1 180px"},placeholder:"اسم التصنيف",value:p.name,onChange:v=>b("name",v.target.value)}),t.kind===2&&e.jsx("input",{className:"lec-inp",style:{flex:"2 1 220px"},placeholder:"عنوان يظهر فوق الفيديوهات (اختياري)",value:p.description,onChange:v=>b("description",v.target.value)}),e.jsx("input",{className:"lec-inp",type:"number",style:{width:80},title:"الترتيب",value:p.displayOrder,onChange:v=>b("displayOrder",v.target.value)}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:4,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:p.isActive,onChange:v=>b("isActive",v.target.checked)})," ظاهر"]}),e.jsx("button",{className:"lec-act-btn save",onClick:h,disabled:j,children:s?"➕ إضافة":"💾 حفظ"}),!s&&e.jsx("button",{className:"lec-act-btn delete",onClick:d,disabled:j,children:"🗑"})]})}function Bn({ctx:t}){const{data:r}=t;return e.jsx("div",{children:[{kind:1,title:"تصنيفات الصور"},{kind:2,title:"تصنيفات الفيديو"}].map(s=>{const l=r.categories.filter(i=>i.kind===s.kind);return e.jsxs("div",{className:"adm-card",style:{padding:16,marginBottom:16},children:[e.jsx("h3",{style:{margin:"0 0 6px",color:a.blue},children:s.title}),e.jsx("p",{style:{margin:"0 0 12px",fontSize:".75rem",color:a.gray500},children:"الترتيب: الأصغر يظهر أولاً. لا يمكن حذف تصنيف يحتوي على عناصر."}),l.map(i=>e.jsx(Ta,{cat:i,ctx:t},i.id)),e.jsx(Ta,{cat:{id:0,kind:s.kind,name:"",description:"",displayOrder:l.length+1,isActive:!0},ctx:t,isNew:!0},`new-${s.kind}-${l.length}`)]},s.kind)})})}function Wn({ctx:t}){var Y,ie;const{data:r,call:s,toast:l,reload:i}=t,o=r.categories.filter(C=>C.kind===1),p=()=>{var C;return{categoryId:((C=o[0])==null?void 0:C.id)??"",title:"",displayOrder:r.albums.length+1,isActive:!0}},[c,j]=n.useState(0),[w,b]=n.useState(p()),[h,d]=n.useState(null),[v,I]=n.useState("all"),[P,_]=n.useState(!1),[U,R]=n.useState(""),y=n.useRef(),z=async C=>{try{d(await s(`/albums/${C}`))}catch(A){l(A.message,"error")}},O=C=>{j(C.id),b({categoryId:C.categoryId,title:C.title,displayOrder:C.displayOrder,isActive:C.isActive}),d(null),z(C.id)};n.useEffect(()=>{r.albums[0]&&O(r.albums[0])},[]);const V=()=>{j(0),d(null),b(p())},F=async()=>{if(!w.title.trim()){l("عنوان الألبوم مطلوب","error");return}if(!w.categoryId){l("اختر التصنيف","error");return}_(!0);try{const C={categoryId:Number(w.categoryId),title:w.title,displayOrder:Number(w.displayOrder)||0,isActive:w.isActive};if(c===0){const A=await s("/albums","POST",C);await i(),j(A.id),z(A.id),l("تم إنشاء الألبوم — يمكنك الآن إضافة الصور")}else await s(`/albums/${c}`,"PUT",C),await i(),l("تم حفظ التغييرات")}catch(C){l(C.message,"error")}finally{_(!1)}},E=async()=>{if(window.confirm("حذف الألبوم وكل صوره؟")){_(!0);try{await s(`/albums/${c}`,"DELETE");const C=await i();l("تم حذف الألبوم","error"),C.albums[0]?O(C.albums[0]):V()}catch(C){l(C.message,"error")}finally{_(!1)}}},u=async C=>{const A=Array.from(C||[]);if(!A.length||c===0)return;_(!0);let Z=0;for(let m=0;m<A.length;m++){R(`رفع ${m+1} من ${A.length}...`);try{const T=new FormData;T.append("file",A[m]),await s(`/albums/${c}/photos`,"POST",T,!0),Z++}catch(T){l(`${A[m].name}: ${T.message}`,"error")}}R(""),y.current&&(y.current.value=""),await z(c),await i(),_(!1),Z&&l(`تم رفع ${Z} صورة`)},M=async C=>{if(window.confirm("حذف هذه الصورة؟"))try{await s(`/photos/${C}`,"DELETE"),await z(c),await i()}catch(A){l(A.message,"error")}},G=async C=>{try{await s(`/albums/${c}/cover/${C}`,"PUT"),await z(c),await i(),l("تم تعيين الغلاف")}catch(A){l(A.message,"error")}},B=r.albums.filter(C=>v==="all"||String(C.categoryId)===v),k=C=>{var A;return((A=r.categories.find(Z=>Z.id===C))==null?void 0:A.name)||"—"};return e.jsxs("div",{className:"lec-layout",children:[e.jsxs("div",{className:"lec-panel",style:{height:"calc(100vh - 220px)",overflowY:"auto",position:"sticky",top:0},children:[e.jsxs("div",{className:"lec-panel-hdr",children:[e.jsx("span",{className:"lec-count-badge",children:B.length}),e.jsx("span",{style:{fontWeight:800,fontSize:".8rem",flex:1,textAlign:"center"},children:"الألبومات"}),e.jsx("button",{className:"lec-new-btn",onClick:V,children:"+ جديد"})]}),e.jsx("div",{style:{padding:"10px"},children:e.jsxs("select",{className:"lec-inp",value:v,onChange:C=>I(C.target.value),children:[e.jsx("option",{value:"all",children:"كل التصنيفات"}),o.map(C=>e.jsx("option",{value:String(C.id),children:C.name},C.id))]})}),e.jsx("div",{className:"lec-list",children:B.map(C=>e.jsxs("div",{className:`lec-row${c===C.id?" active":""}`,onClick:()=>O(C),style:C.isActive?void 0:{opacity:.5},children:[e.jsx("div",{className:"lec-avatar",children:C.cover?e.jsx("img",{src:C.cover,alt:""}):e.jsx("span",{children:"🖼️"})}),e.jsxs("div",{className:"lec-row-info",children:[e.jsx("div",{className:"lec-row-name",children:C.title}),e.jsxs("div",{className:"lec-row-spec",children:[k(C.categoryId)," • ",C.photosCount," صورة",C.isActive?"":" • مخفي"]})]}),e.jsxs("div",{className:"lec-row-id",children:["#",C.id]})]},C.id))})]}),e.jsx("div",{className:"lec-form-wrap",style:{height:"calc(100vh - 220px)",overflowY:"auto"},children:e.jsxs("div",{className:"adm-card lec-form-card",children:[e.jsxs("div",{className:"lec-form-hdr",children:[e.jsx("div",{children:e.jsx("h2",{className:"lec-form-title",children:c===0?"➕ ألبوم جديد":"✏️ تعديل الألبوم"})}),U&&e.jsx("div",{className:"lec-stat-pill",children:U})]}),e.jsxs("div",{className:"lec-form-body",children:[e.jsxs("div",{className:"lec-fields-grid",children:[e.jsxs("div",{className:"lec-field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{className:"lec-label",children:"عنوان الألبوم *"}),e.jsx("input",{className:"lec-inp",value:w.title,onChange:C=>b(A=>({...A,title:C.target.value}))})]}),e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"التصنيف *"}),e.jsx("select",{className:"lec-inp",value:w.categoryId,onChange:C=>b(A=>({...A,categoryId:C.target.value})),children:o.map(C=>e.jsx("option",{value:C.id,children:C.name},C.id))})]}),e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"الترتيب (الأصغر أولاً)"}),e.jsx("input",{className:"lec-inp",type:"number",value:w.displayOrder,onChange:C=>b(A=>({...A,displayOrder:C.target.value}))})]}),e.jsx("div",{className:"lec-field",style:{gridColumn:"1/-1"},children:e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:w.isActive,onChange:C=>b(A=>({...A,isActive:C.target.checked}))}),e.jsx("span",{className:"lec-label",style:{margin:0},children:"ظاهر في الصفحة"})]})})]}),e.jsxs("div",{className:"lec-actions",style:{marginTop:14},children:[e.jsx("button",{className:"lec-act-btn save",onClick:F,disabled:P,children:"💾 حفظ"}),e.jsx("button",{className:"lec-act-btn new",onClick:V,disabled:P,children:"➕ ألبوم جديد"}),e.jsx("div",{style:{flex:1}}),c!==0&&e.jsx("button",{className:"lec-act-btn delete",onClick:E,disabled:P,children:"🗑 حذف الألبوم"})]}),e.jsx("div",{className:"lec-divider"}),c===0?e.jsx("p",{style:{color:a.gray500,fontSize:".8rem"},children:"احفظ الألبوم أولاً ثم أضف الصور."}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:10},children:[e.jsxs("strong",{children:["الصور (",((Y=h==null?void 0:h.photos)==null?void 0:Y.length)??"…",")"]}),e.jsx("button",{className:"lec-act-btn new",disabled:P,onClick:()=>{var C;return(C=y.current)==null?void 0:C.click()},children:"📷 إضافة صور"}),e.jsx("input",{ref:y,type:"file",multiple:!0,accept:"image/jpeg,image/png,image/webp",style:{display:"none"},onChange:C=>u(C.target.files)}),e.jsx("span",{style:{fontSize:".7rem",color:a.gray500},children:"JPG / PNG / WEBP — حتى 5MB للصورة"})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(120px, 1fr))",gap:10},children:(ie=h==null?void 0:h.photos)==null?void 0:ie.map(C=>e.jsxs("div",{style:{border:C.isCover?`2px solid ${a.orange}`:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden",background:"#fff"},children:[e.jsx("img",{src:C.url,alt:"",style:{width:"100%",height:90,objectFit:"cover",display:"block"}}),e.jsxs("div",{style:{display:"flex",gap:4,padding:4},children:[e.jsx("button",{className:"adm-fclear",style:{flex:1,fontSize:".65rem"},disabled:C.isCover,onClick:()=>G(C.id),children:C.isCover?"⭐ الغلاف":"غلاف"}),e.jsx("button",{className:"adm-fclear",style:{fontSize:".65rem"},onClick:()=>M(C.id),children:"🗑"})]})]},C.id))})]})]})]})})]})}function _n({video:t,ctx:r}){const{call:s,toast:l,reload:i}=r,[o,p]=n.useState(t.title||""),[c,j]=n.useState(t.displayOrder),[w,b]=n.useState(!1),h=async()=>{b(!0);try{await s(`/videos/${t.id}`,"PUT",{video:t.youtubeId,title:o,displayOrder:Number(c)||0}),await i(),l("تم الحفظ")}catch(v){l(v.message,"error")}finally{b(!1)}},d=async()=>{if(window.confirm("حذف هذا الفيديو؟")){b(!0);try{await s(`/videos/${t.id}`,"DELETE"),await i(),l("تم الحذف","error")}catch(v){l(v.message,"error")}finally{b(!1)}}};return e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",padding:"6px 0",borderBottom:"1px solid #eee",flexWrap:"wrap"},children:[e.jsx("img",{src:`https://img.youtube.com/vi/${t.youtubeId}/default.jpg`,alt:"",style:{width:80,height:45,objectFit:"cover",borderRadius:4}}),e.jsx("code",{style:{fontSize:".7rem",direction:"ltr"},children:t.youtubeId}),e.jsx("input",{className:"lec-inp",style:{flex:"1 1 160px"},placeholder:"عنوان الفيديو",value:o,onChange:v=>p(v.target.value)}),e.jsx("input",{className:"lec-inp",type:"number",style:{width:70},title:"الترتيب",value:c,onChange:v=>j(v.target.value)}),e.jsx("button",{className:"lec-act-btn save",onClick:h,disabled:w,children:"💾"}),e.jsx("button",{className:"lec-act-btn delete",onClick:d,disabled:w,children:"🗑"})]})}function Un({groupId:t,ctx:r}){const{call:s,toast:l,reload:i}=r,[o,p]=n.useState(""),[c,j]=n.useState(""),[w,b]=n.useState(!1),h=async()=>{if(!o.trim()){l("ألصق رابط يوتيوب","error");return}b(!0);try{await s(`/video-groups/${t}/videos`,"POST",{video:o,title:c,displayOrder:0}),p(""),j(""),await i(),l("تمت إضافة الفيديو")}catch(d){l(d.message,"error")}finally{b(!1)}};return e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",paddingTop:10,flexWrap:"wrap"},children:[e.jsx("input",{className:"lec-inp",style:{flex:"2 1 240px",direction:"ltr",textAlign:"left"},placeholder:"https://www.youtube.com/watch?v=...",value:o,onChange:d=>p(d.target.value)}),e.jsx("input",{className:"lec-inp",style:{flex:"1 1 160px"},placeholder:"عنوان الفيديو (اختياري)",value:c,onChange:d=>j(d.target.value)}),e.jsx("button",{className:"lec-act-btn save",onClick:h,disabled:w,children:"➕ إضافة فيديو"})]})}function Gn({ctx:t}){const{data:r,call:s,toast:l,reload:i}=t,o=r.categories.filter(y=>y.kind===2),p=()=>{var y;return{categoryId:((y=o[0])==null?void 0:y.id)??"",title:"",color:"#0865a8",isLtr:!1,displayOrder:r.videoGroups.length+1,isActive:!0}},[c,j]=n.useState(0),[w,b]=n.useState(p()),[h,d]=n.useState(!1),v=r.videoGroups.find(y=>y.id===c),I=y=>{j(y.id),b({categoryId:y.categoryId,title:y.title,color:y.color,isLtr:y.isLtr,displayOrder:y.displayOrder,isActive:y.isActive})};n.useEffect(()=>{r.videoGroups[0]&&I(r.videoGroups[0])},[]);const P=()=>{j(0),b(p())},_=async()=>{if(!w.title.trim()){l("عنوان المجموعة مطلوب","error");return}if(!w.categoryId){l("اختر التصنيف","error");return}d(!0);try{const y={categoryId:Number(w.categoryId),title:w.title,color:w.color,isLtr:w.isLtr,displayOrder:Number(w.displayOrder)||0,isActive:w.isActive};if(c===0){const z=await s("/video-groups","POST",y);await i(),j(z.id),l("تم إنشاء المجموعة — يمكنك الآن إضافة الفيديوهات")}else await s(`/video-groups/${c}`,"PUT",y),await i(),l("تم حفظ التغييرات")}catch(y){l(y.message,"error")}finally{d(!1)}},U=async()=>{if(window.confirm("حذف المجموعة وكل فيديوهاتها؟")){d(!0);try{await s(`/video-groups/${c}`,"DELETE");const y=await i();l("تم الحذف","error"),y.videoGroups[0]?I(y.videoGroups[0]):P()}catch(y){l(y.message,"error")}finally{d(!1)}}},R=y=>{var z;return((z=r.categories.find(O=>O.id===y))==null?void 0:z.name)||"—"};return e.jsxs("div",{className:"lec-layout",children:[e.jsxs("div",{className:"lec-panel",style:{height:"calc(100vh - 220px)",overflowY:"auto",position:"sticky",top:0},children:[e.jsxs("div",{className:"lec-panel-hdr",children:[e.jsx("span",{className:"lec-count-badge",children:r.videoGroups.length}),e.jsx("span",{style:{fontWeight:800,fontSize:".8rem",flex:1,textAlign:"center"},children:"مجموعات الفيديو"}),e.jsx("button",{className:"lec-new-btn",onClick:P,children:"+ جديد"})]}),e.jsx("div",{className:"lec-list",children:r.videoGroups.map(y=>e.jsxs("div",{className:`lec-row${c===y.id?" active":""}`,onClick:()=>I(y),style:y.isActive?void 0:{opacity:.5},children:[e.jsx("div",{className:"lec-avatar",style:{background:y.color},children:e.jsx("span",{children:"🎬"})}),e.jsxs("div",{className:"lec-row-info",children:[e.jsx("div",{className:"lec-row-name",children:y.title}),e.jsxs("div",{className:"lec-row-spec",children:[R(y.categoryId)," • ",y.videos.length," فيديو",y.isActive?"":" • مخفي"]})]}),e.jsxs("div",{className:"lec-row-id",children:["#",y.id]})]},y.id))})]}),e.jsx("div",{className:"lec-form-wrap",style:{height:"calc(100vh - 220px)",overflowY:"auto"},children:e.jsxs("div",{className:"adm-card lec-form-card",children:[e.jsx("div",{className:"lec-form-hdr",children:e.jsx("h2",{className:"lec-form-title",children:c===0?"➕ مجموعة جديدة":"✏️ تعديل المجموعة"})}),e.jsxs("div",{className:"lec-form-body",children:[e.jsxs("div",{className:"lec-fields-grid",children:[e.jsxs("div",{className:"lec-field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{className:"lec-label",children:"عنوان المجموعة *"}),e.jsx("input",{className:"lec-inp",value:w.title,onChange:y=>b(z=>({...z,title:y.target.value}))})]}),e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"التصنيف *"}),e.jsx("select",{className:"lec-inp",value:w.categoryId,onChange:y=>b(z=>({...z,categoryId:y.target.value})),children:o.map(y=>e.jsx("option",{value:y.id,children:y.name},y.id))})]}),e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"اللون"}),e.jsx("input",{type:"color",value:w.color,onChange:y=>b(z=>({...z,color:y.target.value})),style:{width:60,height:36,border:"none",background:"none"}})]}),e.jsxs("div",{className:"lec-field",children:[e.jsx("label",{className:"lec-label",children:"الترتيب (الأصغر أولاً)"}),e.jsx("input",{className:"lec-inp",type:"number",value:w.displayOrder,onChange:y=>b(z=>({...z,displayOrder:y.target.value}))})]}),e.jsxs("div",{className:"lec-field",style:{display:"flex",flexDirection:"column",gap:6,justifyContent:"flex-end"},children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:w.isLtr,onChange:y=>b(z=>({...z,isLtr:y.target.checked}))}),e.jsx("span",{className:"lec-label",style:{margin:0},children:"العنوان إنجليزي / فرنسي (من اليسار)"})]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:w.isActive,onChange:y=>b(z=>({...z,isActive:y.target.checked}))}),e.jsx("span",{className:"lec-label",style:{margin:0},children:"ظاهرة في الصفحة"})]})]})]}),e.jsxs("div",{className:"lec-actions",style:{marginTop:14},children:[e.jsx("button",{className:"lec-act-btn save",onClick:_,disabled:h,children:"💾 حفظ"}),e.jsx("button",{className:"lec-act-btn new",onClick:P,disabled:h,children:"➕ مجموعة جديدة"}),e.jsx("div",{style:{flex:1}}),c!==0&&e.jsx("button",{className:"lec-act-btn delete",onClick:U,disabled:h,children:"🗑 حذف المجموعة"})]}),e.jsx("div",{className:"lec-divider"}),c===0||!v?e.jsx("p",{style:{color:a.gray500,fontSize:".8rem"},children:"احفظ المجموعة أولاً ثم أضف الفيديوهات."}):e.jsxs(e.Fragment,{children:[e.jsxs("strong",{children:["الفيديوهات (",v.videos.length,")"]}),v.videos.map(y=>e.jsx(_n,{video:y,ctx:t},`${y.id}-${y.title}-${y.displayOrder}`)),e.jsx(Un,{groupId:c,ctx:t})]})]})]})})]})}const Kn=()=>{const{getToken:t}=Oe(),[r,s]=n.useState(null),[l,i]=n.useState("albums"),[o,p]=n.useState(null),[c,j]=n.useState(null),w=n.useCallback((v,I="success")=>{p({msg:v,type:I}),setTimeout(()=>p(null),3500)},[]),b=async(v,I="GET",P=null,_=!1)=>{const R={Authorization:`Bearer ${await t()}`};P&&!_&&(R["Content-Type"]="application/json");const y=await fetch(`${Dn}${v}`,{method:I,headers:R,body:P?_?P:JSON.stringify(P):void 0});if(!y.ok){let O=`HTTP ${y.status}`;try{O=(await y.json()).message||O}catch{}throw new Error(O)}const z=await y.text();return z?JSON.parse(z):null},h=async()=>{const v=await b("");return s(v),v};if(n.useEffect(()=>{h().catch(v=>j(v.message))},[]),c)return e.jsxs("div",{className:"adm-err",children:["⚠️ فشل تحميل البيانات: ",c]});if(!r)return e.jsxs("div",{className:"adm-ld",children:[e.jsx("div",{className:"adm-sp"}),e.jsx("p",{children:"جاري التحميل..."})]});const d={data:r,call:b,toast:w,reload:h};return e.jsxs("div",{children:[o&&e.jsxs("div",{className:`lec-notif lec-notif-${o.type}`,style:{marginBottom:12},children:[e.jsx("span",{children:o.type==="success"?"✅":o.type==="error"?"❌":"ℹ️"}),o.msg]}),e.jsx("div",{style:{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"},children:Mn.map(v=>e.jsx("button",{className:"adm-fclear",style:l===v.id?{background:a.blue,color:"#fff",fontWeight:700}:void 0,onClick:()=>i(v.id),children:v.label},v.id))}),l==="albums"&&e.jsx(Wn,{ctx:d}),l==="videos"&&e.jsx(Gn,{ctx:d}),l==="categories"&&e.jsx(Bn,{ctx:d})]})},Ea=[{id:"users",label:"المستخدمون",icon:"👤",permissionName:"Users"},{id:"activity",label:"سجل النشاط",icon:"🕵️",permissionName:"ActivityLog",managerOnly:!0},{id:"courses",label:"الدورات",icon:"📚",permissionName:"Courses"},{id:"attendance",label:"الحضور",icon:"✅",permissionName:"Attendance"},{id:"certificates",label:"الشهادات",icon:"📜",permissionName:"Certificates"},{id:"refunds",label:"المستردات",icon:"💳",permissionName:"Refunds"},{id:"financial",label:"المالية",icon:"💰",permissionName:"Finance"},{id:"lecturers",label:"المحاضرون",icon:"🎓",permissionName:"Lecturers"},{id:"team",label:"فريق العمل",icon:"👥",permissionName:"Team"},{id:"gallery",label:"مكتبة الصور والفيديو",icon:"🖼️",permissionName:"Gallery"},{id:"customers",label:"العملاء",icon:"🏢",permissionName:"Customers"},{id:"protocols",label:"البروتوكولات",icon:"🤝",permissionName:"Protocols"},{id:"siteCerts",label:"الشهادات وخطابات الشكر",icon:"🏅",permissionName:"Certificates and Letters of Appreciation"},{id:"news",label:"الأخبار",icon:"📰",permissionName:"News"},{id:"books",label:"الكتب",icon:"📖",permissionName:"Books"},{id:"planwork",label:"الدورات التدريبية",icon:"📋",permissionName:"Workplan",alsoPermissions:["PlanFiles","PlanEmails"]},{id:"settings",label:"الإعدادات",icon:"⚙️",permissionName:"Settings",managerOnly:!0}],Yn=t=>(typeof t=="string"?t:(t==null?void 0:t.name)??(t==null?void 0:t.permissionName)??"").trim().toLowerCase(),Ia=t=>String(t??"").replace(/\D/g,""),rs=()=>{var ha,ga;const{user:t,isLoaded:r}=cr(),{getToken:s}=Oe(),l=or(),[i,o]=n.useState("users"),[p,c]=n.useState(null),[j,w]=n.useState(!1),[b,h]=n.useState(null),[d,v]=n.useState(!1),[I,P]=n.useState([]),[_,U]=n.useState([]),[R,y]=n.useState(null),[z,O]=n.useState(!0),[V,F]=n.useState(null),[E,u]=n.useState({}),[M,G]=n.useState({}),[B,k]=n.useState(null),[Y,ie]=n.useState("all"),[C,A]=n.useState(""),[Z,m]=n.useState({}),[T,L]=n.useState({}),[ae,f]=n.useState({}),[W,q]=n.useState(null),[Q,ve]=n.useState(null),[x,S]=n.useState(""),[K,D]=n.useState("all"),[ne,le]=n.useState([]),[se,de]=n.useState(!1),[je,ge]=n.useState(null),[$e,Te]=n.useState("all"),[Se,Qe]=n.useState(""),[ze,Ge]=n.useState(null),[Ke,Le]=n.useState(null),[N,re]=n.useState(""),[he,be]=n.useState(!1),[me,et]=n.useState(""),[Da,pt]=n.useState(null),[tt,St]=n.useState(""),[Fe,Xt]=n.useState(""),[Pe,Zt]=n.useState(""),[Ma,Ba]=n.useState([]),[Wa,Qt]=n.useState(1),[_a,Ua]=n.useState(""),[Ga,zt]=n.useState(1),[Ka,ea]=n.useState(1),[Ya,ta]=n.useState(1),[Ha,aa]=n.useState(1),[Ja,ra]=n.useState(1),[Ye,na]=n.useState({isManager:!1,tabs:new Set}),[at,sa]=n.useState(!0),[ia,la]=n.useState(null);n.useEffect(()=>{Fr()},[]),n.useEffect(()=>{zt(1),ea(1),Qt(1),c(null)},[i]),n.useEffect(()=>{zt(1),c(null)},[tt,Fe,Pe]),n.useEffect(()=>{ta(1)},[Y,C]),n.useEffect(()=>{aa(1)},[x,K]),n.useEffect(()=>{ra(1)},[Se,$e]),n.useEffect(()=>{if(!d)return;const g=H=>H.key==="Escape"&&v(!1);document.addEventListener("keydown",g);const $=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.removeEventListener("keydown",g),document.body.style.overflow=$}},[d]);const ue=n.useCallback(async(g,$={})=>{let H=null;try{H=await s()}catch{}return fetch(g,{...$,headers:{"Content-Type":"application/json",...H?{Authorization:`Bearer ${H}`}:{},...$.headers}})},[s]),Va=n.useCallback(async(g,$)=>{let H=null;try{H=await s()}catch{}return fetch(g,{method:"POST",headers:H?{Authorization:`Bearer ${H}`}:{},body:$})},[s]),oa=n.useCallback(async()=>{if(!(!r||!t)){sa(!0),la(null);try{const g=await ue(`${fe}/UserPermissions/me`);if(!g.ok){na({isManager:!1,tabs:new Set});return}const $=await g.json();na({isManager:!!$.isManager,tabs:new Set(($.permissions||[]).map(Yn).filter(Boolean))})}catch(g){console.error("Failed to load current admin role:",g),la(g.message||"تعذّر تحميل الصلاحيات")}finally{sa(!1)}}},[r,t,ue]);n.useEffect(()=>{oa()},[oa]);const qa=g=>[g.permissionName,...g.alsoPermissions||[]].some($=>Ye.tabs.has($.trim().toLowerCase())),Re=Ye.isManager?Ea:Ea.filter(g=>!g.managerOnly&&qa(g));n.useEffect(()=>{!r||!t||at||Re.length===0&&l("/")},[r,t,at,Ye,l]),n.useEffect(()=>{at||Re.length!==0&&(Re.some(g=>g.id===i)||o(Re[0].id))},[at,Ye]);const mt=n.useCallback(async()=>{try{const g=await ue(`${fe}/Admin/stats`);g.ok&&y(await g.json())}catch{}},[ue]),At=n.useCallback(async()=>{try{const g=await ue(`${fe}/Admin/AdminBook`);if(g.ok){const $=await g.json();Ba(Array.isArray($)?$:$.result||[])}}catch(g){console.error("Failed to load books:",g)}},[ue]);n.useEffect(()=>{i==="books"&&At()},[i,At]),n.useEffect(()=>{r&&t&&(async()=>{O(!0),F(null);try{const[$,H,te]=await Promise.all([ue(`${fe}/Admin/users`),ue(`${fe}/Admin/planworks`),ue(`${fe}/Admin/stats`)]);let J=[],pe=[],oe=null;if($.ok){const X=await $.json();J=Array.isArray(X)?X:(X==null?void 0:X.data)??(X==null?void 0:X.users)??(X==null?void 0:X.result)??[]}else{const X=await $.text().catch(()=>"");F(`Users API ${$.status}: ${X.slice(0,200)}`)}if(H.ok){const X=await H.json();pe=Array.isArray(X)?X:(X==null?void 0:X.data)??(X==null?void 0:X.planWorks)??(X==null?void 0:X.courses)??(X==null?void 0:X.result)??[]}te.ok&&(oe=await te.json());const Ce=J.map(Pr).filter(X=>X.id!=null),ce=pe.map(Rr).filter(X=>X.id!=null);P(Ce),U(ce),y(oe),Xa(Ce),await Tt()}catch($){F($.message||"حدث خطأ أثناء تحميل البيانات")}finally{O(!1)}})()},[r,t,ue]),n.useEffect(()=>{i==="refunds"&&ca($e)},[i,$e]),n.useEffect(()=>{i==="certificates"&&ft()},[i]);const Xa=n.useCallback(g=>{const $={};g.forEach(H=>H.enrolledCourses.forEach(te=>{te.enrollmentId!=null&&($[String(te.enrollmentId)]=!!te.attended)})),u($)},[]),Za=async(g,$)=>{if(g==null){k("لا يوجد enrollmentId لهذا التسجيل");return}const H=String(g),te=!$;u(J=>({...J,[H]:te})),G(J=>({...J,[H]:!0})),k(null);try{const J=await ue(`${fe}/Admin/enrollments/${g}/attendance`,{method:"PATCH",body:JSON.stringify(te)});if(!J.ok){const pe=await J.json().catch(()=>({}));throw new Error((pe==null?void 0:pe.message)??`HTTP ${J.status}`)}await mt()}catch(J){u(pe=>({...pe,[H]:$})),k("فشل تحديث الحضور: "+J.message)}finally{G(J=>({...J,[H]:!1}))}},Tt=n.useCallback(async()=>{try{const g=await ue(`${fe}/Admin/certificates`);if(!g.ok)return;const $=await g.json(),H=Array.isArray($)?$:($==null?void 0:$.data)??($==null?void 0:$.certificates)??($==null?void 0:$.result)??[],te={};H.forEach(J=>{const pe=J.id??J.Id??null,oe=J.userId??J.UserId??null,Ce=J.planworkId??J.PlanworkId??null,ce=J.fileUrl??J.FileUrl??J.filePath??J.FilePath??null,X=J.fileName??J.FileName??(ce?ce.split("/").pop().split("?")[0]:"certificate"),Ae=Be(J.uploadedAt??J.UploadedAt??null);let ke=null;if(ce&&ce!=="uploaded"&&(ke=ce.startsWith("http")?ce:`${fe.replace("/api","")}${ce}`),!pe||oe==null||Ce==null)return;const De=`${Number(oe)}-${Number(Ce)}`;te[De]={certId:pe,name:X,url:ke,rawUrl:ce,size:null,fromDb:!0,uploadedAt:Ae,userId:oe,planworkId:Ce}}),m(te)}catch(g){console.warn("[Certs] load failed:",g.message)}},[ue]),ft=n.useCallback(async()=>{await Tt(),await mt()},[Tt,mt]),Qa=async(g,$,H,te)=>{if(!te)return;const J=`${Number($)}-${Number(H)}`;L(pe=>({...pe,[J]:!0})),q(null);try{const pe=Z[J];let oe,Ce;if((pe==null?void 0:pe.certId)!=null){const ce=new FormData;ce.append("CertificateId",Number(pe.certId)),ce.append("File",te,te.name);let X=null;try{X=await s()}catch{}oe=await fetch(`${fe}/Admin/certificates`,{method:"PUT",headers:X?{Authorization:`Bearer ${X}`}:{},body:ce}),Ce=await oe.text()}else{const ce=new FormData;$!=null&&ce.append("UserId",Number($)),H!=null&&ce.append("PlanworkId",Number(H)),g!=null&&ce.append("EnrollmentId",Number(g)),ce.append("File",te,te.name),oe=await Va(`${fe}/Admin/upload`,ce),Ce=await oe.text()}if(!oe.ok){let ce=`HTTP ${oe.status}`;try{const X=JSON.parse(Ce);ce=(X==null?void 0:X.message)??(X==null?void 0:X.error)??(X==null?void 0:X.title)??(X==null?void 0:X.detail)??ce}catch{Ce.trim().length<400&&(ce=Ce.trim())}throw new Error(ce)}await ft()}catch(pe){q("فشل رفع الشهادة: "+pe.message)}finally{L(pe=>({...pe,[J]:!1})),ve(null)}},er=n.useCallback(async(g,$=null)=>{const H=Z[g]??($?Z[$]:void 0);if(window.confirm("هل تريد حذف هذه الشهادة؟")){f(te=>({...te,[g]:!0})),q(null);try{if((H==null?void 0:H.certId)!=null){const te=await ue(`${fe}/Admin/certificates/${H.certId}`,{method:"DELETE"});if(!te.ok&&te.status!==404){const J=await te.json().catch(()=>({}));throw new Error((J==null?void 0:J.message)??(J==null?void 0:J.title)??`HTTP ${te.status}`)}}await ft()}catch(te){q("فشل حذف الشهادة: "+te.message)}finally{f(te=>({...te,[g]:!1}))}}},[ue,Z,ft]),tr=n.useCallback(async(g,$,H,te,J,pe)=>{let oe=null;try{oe=await s()}catch{}const Ce=oe?{Authorization:`Bearer ${oe}`}:{};let ce=null;if(J!=null&&pe!=null)try{const X=await fetch(`${fe}/Admin/certificates/${J}/${pe}`,{headers:Ce});if(X.ok){const Ae=await X.json(),ke=Array.isArray(Ae)?Ae[0]:Ae,De=(ke==null?void 0:ke.fileUrl)??(ke==null?void 0:ke.FileUrl)??(ke==null?void 0:ke.url)??(ke==null?void 0:ke.Url)??null;De&&De!=="uploaded"&&(ce=De.startsWith("http")?De:`${fe.replace("/api","")}${De}`)}}catch{}if(!ce&&$&&$!=="uploaded"&&(ce=$),!ce&&H&&(ce=H.startsWith("http")?H:`${fe.replace("/api","")}${H}`),ce){window.open(ce,"_blank");return}q("تعذّر فتح الشهادة — تأكد من صلاحية الجلسة")},[s]),ca=n.useCallback(async(g="all")=>{de(!0),ge(null);try{const $=g!=="all"?`?status=${g}`:"",H=await ue(`${fe}/refund/admin/all${$}`);if(!H.ok)throw new Error(`HTTP ${H.status}`);const te=await H.json(),J=Array.isArray(te)?te:(te==null?void 0:te.data)??(te==null?void 0:te.items)??[];le(J.map(wa))}catch($){ge("فشل تحميل طلبات الاسترداد: "+$.message)}finally{de(!1)}},[ue]),ar=async()=>{if(!Ke)return;const{refund:g,action:$}=Ke;if(!($==="reject"&&!N.trim())){be(!0),et("");try{const H={approve:`${fe}/refund/${g.id}/approve`,reject:`${fe}/refund/${g.id}/reject`,send_to_bank:`${fe}/refund/${g.id}/sent`}[$],te={};$==="reject"&&(te.rejectionReason=N.trim()),$==="approve"&&(te.adminNote=N.trim()),$==="send_to_bank"&&(te.adminNote=N.trim());const J=await ue(H,{method:"PUT",body:JSON.stringify(te)});if(!J.ok){const oe=await J.json().catch(()=>({}));throw new Error((oe==null?void 0:oe.message)??(oe==null?void 0:oe.error)??`HTTP ${J.status}`)}const pe=wa(await J.json());if($==="send_to_bank"){const oe=pe.bankResult;oe==="SUCCESS"||oe==="success"?pt({type:"success",msg:`✅ نجح التحويل البنكي (${g.refNumber||g.id})`}):(oe==="FAILED"||oe==="failed")&&pt({type:"failed",msg:`⚠️ فشل التحويل — يتم التحويل يدوياً على IBAN: ${g.iban||"—"}`}),setTimeout(()=>pt(null),12e3)}Le(null),re(""),Ge(null),await ca($e),await mt()}catch(H){et(H.message||"حدث خطأ")}finally{be(!1)}}},da=g=>{if(!Fe&&!Pe)return!0;if(!g)return!1;const $=new Date(g);if(isNaN($)||Fe&&$<new Date(Fe))return!1;if(Pe){const H=new Date(Pe);if(H.setDate(H.getDate()+1),$>=H)return!1}return!0},pa=tt.toLowerCase(),ma=Ia(tt),rr=I.map(g=>({...g,enrolledCourses:g.enrolledCourses.filter($=>da($.date))})).filter(g=>{const $=`${g.firstName} ${g.lastName} ${g.email} ${g.username} ${g.phone??""}`.toLowerCase().includes(pa),H=ma.length>0&&Ia(g.phone).includes(ma),te=$||H;return Fe||Pe?te&&g.enrolledCourses.length>0:te}),nr=_.map(g=>({...g,enrolledUsers:g.enrolledUsers.filter($=>da($.date))})).filter(g=>{const $=`${g.title} ${g.category}`.toLowerCase().includes(pa);return Fe||Pe?$&&g.enrolledUsers.length>0:$}),fa=I.flatMap(g=>g.enrolledCourses.filter($=>$.enrollmentId!=null).map($=>({user:g,course:$}))).filter(g=>(Y==="all"||g.course.id===Number(Y))&&`${g.user.firstName} ${g.user.lastName} ${g.user.email} ${g.user.username}`.toLowerCase().includes(C.toLowerCase())),Et={};Object.values(Z).forEach(g=>{if(!g||g.userId==null)return;const $=Number(g.userId);(Et[$]=Et[$]||[]).push(g)});const sr=I.flatMap(g=>g.enrolledCourses.map($=>{const H=_.find(X=>X.title===$.title||X.title===$._titleRaw),te=$.id??(H==null?void 0:H.id)??null,J=g.databaseId??g.dbId??g.userId??g.internalId??(isNaN(Number(g.id))?null:Number(g.id)),oe=(J?Et[J]??[]:[]).find(X=>{const Ae=_.find(ke=>Number(ke.id)===Number(X.planworkId));return Ae&&(Ae.title===$.title||Ae.title===$._titleRaw)}),Ce=te!=null&&J?`${J}-${Number(te)}`:oe&&J?`${J}-${Number(oe.planworkId)}`:`${g.id}-unknown`,ce=oe&&J?`${J}-${Number(oe.planworkId)}`:null;return{user:g,course:$,certKey:Ce,altKey:ce,enrollmentId:$.enrollmentId,userId:J,planworkId:te??(oe==null?void 0:oe.planworkId)??null}})).filter(g=>{const $=!!(Z[g.certKey]??(g.altKey?Z[g.altKey]:void 0)),H=!!E[String(g.enrollmentId)];return`${g.user.firstName} ${g.user.lastName} ${g.user.email} ${g.course.title}`.toLowerCase().includes(x.toLowerCase())&&(K==="all"?!0:K==="uploaded"?$:K==="pending"?!$&&H:!H)}),It=(()=>{const g=new Set;return Object.values(Z).forEach($=>{$&&g.add($.certId??Math.random())}),g.size})(),He=(g,$)=>{if(!R)return $;for(const H of g)if(R[H]!=null)return R[H];return $},ir={users:He(["usersCount"],I.length),courses:He(["planworksCount"],_.length),enrollments:He(["enrollmentsCount"],I.reduce((g,$)=>g+$.enrolledCourses.length,0)),attended:He(["attendanceCount"],fa.filter(g=>!!E[String(g.course.enrollmentId)]).length),certificates:It>0?It:He(["certificatesCount"],0),refundsPending:He(["refundsCount"],ne.filter(g=>g.status==="Pending").length)},xa=Se.toLowerCase(),lr=ne.filter(g=>{const $=I.find(pe=>pe.id===g.userId),H=_.find(pe=>pe.id===g.courseId),te=$e==="all"||g.status===Fa($e),J=!xa||[g.refNumber,g.orderId,g.reason,$?`${$.firstName} ${$.lastName}`:"",(H==null?void 0:H.title)??"",String(g.amount)].join(" ").toLowerCase().includes(xa);return te&&J});return!r||!t||at?e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:a.gray100},children:e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{width:48,height:48,border:`3px solid ${a.gray300}`,borderTopColor:a.blue,borderRadius:"50%",animation:"adm-spin .7s linear infinite",margin:"0 auto 16px"}}),e.jsx("p",{style:{color:a.blue,fontFamily:a.font,fontSize:".9rem"},children:"جاري التحقق..."})]})}):ia?e.jsxs("div",{style:{padding:40,textAlign:"center",fontFamily:a.font,color:"#dc2626"},children:["⚠️ ",ia]}):Re.length===0?null:e.jsxs(e.Fragment,{children:[j&&e.jsx("div",{className:"adm-ovl",children:e.jsxs("div",{className:"adm-ovlb",children:[e.jsx("div",{className:"adm-sp"}),e.jsx("p",{children:"جاري تصدير الملف... يرجى الانتظار"})]})}),e.jsxs("div",{className:"adm-bc",children:[e.jsx("a",{href:"/",children:"الصفحة الرئيسية"}),e.jsx("span",{className:"sep",children:"•"}),e.jsx("span",{className:"cur",children:"لوحة الإدارة"})]}),Q&&e.jsx(fn,{modal:Q,uploading:T[Q.certKey],onClose:()=>ve(null),onFile:Qa}),ze&&e.jsx(hn,{refund:ne.find(g=>g.id===ze.id)||ze,usersData:I,coursesData:_,onClose:()=>Ge(null),onAction:(g,$)=>{Ge(null),Le({refund:g,action:$})}}),Ke&&e.jsx(bn,{modal:Ke,note:N,saving:he,error:me,usersData:I,onNoteChange:re,onConfirm:ar,onClose:()=>{Le(null),re(""),et("")}}),e.jsxs("div",{className:"adm-root",children:[e.jsx(Or,{user:t,activeTab:i,tabs:Re,totalCerts:It,pendingRefunds:ne.filter(g=>g.status==="Pending").length,open:d,onClose:()=>v(!1),onTabChange:g=>{o(g),c(null),St(""),v(!1)}}),e.jsxs("main",{className:"adm-main",children:[e.jsxs("button",{className:"adm-menu-btn",onClick:()=>v(!0),children:[e.jsx("span",{style:{fontSize:"1.2rem"},children:"☰"})," القائمة",e.jsx("span",{className:"cur",children:(ha=Re.find(g=>g.id===i))==null?void 0:ha.label})]}),e.jsx(Lr,{activeTab:i}),e.jsxs("div",{className:"adm-content",children:[!z&&!V&&e.jsx(Mr,{stats:ir}),b&&e.jsxs("div",{className:"adm-err",children:["⚠️ ",b,e.jsx("button",{style:{marginRight:"auto",background:"none",border:"none",cursor:"pointer",color:"#dc2626",fontSize:"1rem"},onClick:()=>h(null),children:"✕"})]}),Re.length===0&&e.jsx("div",{className:"adm-err",children:"⚠️ لا توجد صلاحيات مُفعّلة لحسابك بعد. تواصل مع مدير النظام."}),i==="users"&&e.jsx(nn,{data:rr,loading:z,error:V,searchQuery:tt,setSearchQuery:St,dateFrom:Fe,setDateFrom:Xt,dateTo:Pe,setDateTo:Zt,currentPage:Ga,setCurrentPage:g=>{zt(g),c(null)},expandedRow:p,setExpandedRow:c,attendance:E,certificates:Z,setExporting:w,setExportError:h}),i==="activity"&&e.jsx(Ln,{setExporting:w,setExportError:h}),i==="courses"&&e.jsx(ln,{data:nr,loading:z,error:V,searchQuery:tt,setSearchQuery:St,dateFrom:Fe,setDateFrom:Xt,dateTo:Pe,setDateTo:Zt,currentPage:Ka,setCurrentPage:g=>{ea(g),c(null)},expandedRow:p,setExpandedRow:c,setExporting:w,setExportError:h}),i==="attendance"&&e.jsx(cn,{rows:fa,loading:z,attendance:E,attendanceSaving:M,error:B,setError:k,courseFilter:Y,setCourseFilter:ie,userSearch:C,setUserSearch:A,currentPage:Ya,setCurrentPage:ta,coursesData:_,toggleAttendance:Za,setExporting:w,setExportError:h}),i==="certificates"&&e.jsx(dn,{rows:sr,loading:z,certificates:Z,certUploading:T,certDeleting:ae,error:W,setError:q,search:x,setSearch:S,statusFilter:K,setStatusFilter:D,currentPage:Ha,setCurrentPage:aa,attendance:E,onOpenModal:ve,onViewCert:tr,onDeleteCert:er,setExporting:w,setExportError:h}),i==="refunds"&&e.jsx(mn,{refunds:lr,allRefunds:ne,loading:se,error:je,setError:ge,search:Se,setSearch:Qe,statusFilter:$e,setStatusFilter:Te,currentPage:Ja,setCurrentPage:ra,usersData:I,coursesData:_,bankResultBanner:Da,setBankResultBanner:pt,onViewDetail:Ge,onAction:(g,$)=>Le({refund:g,action:$}),setExporting:w,setExportError:h}),i==="financial"&&e.jsx(Zr,{usersData:I,coursesData:_,authFetch:ue,API_BASE:fe,API_HOST:fr}),i==="lecturers"&&e.jsx(ur,{}),i==="news"&&e.jsx(wr,{}),i==="team"&&e.jsx(zn,{}),i==="gallery"&&e.jsx(Kn,{}),i==="customers"&&e.jsx(Er,{}),i==="protocols"&&e.jsx(an,{}),i==="siteCerts"&&e.jsx(Fn,{}),i==="books"&&e.jsx(vr,{data:Ma,loading:z,search:_a,setSearch:Ua,currentPage:Wa,setCurrentPage:Qt,authFetch:ue,onRefresh:At}),i==="planwork"&&(()=>{const g=H=>Ye.tabs.has(H),$=Ye.isManager||g("workplan");return e.jsx(jr,{canFull:$,canFiles:$||g("planfiles"),canEmails:$||g("planemails")})})(),i==="settings"&&e.jsx(vn,{currentUserEmail:((ga=t==null?void 0:t.primaryEmailAddress)==null?void 0:ga.emailAddress)||""})]}),e.jsx("div",{className:"adm-footer",children:e.jsxs("p",{children:["المعهد التكنولوجي لهندسة التشييد والإدارة © ",new Date().getFullYear()]})})]})]})]})};export{rs as default};
