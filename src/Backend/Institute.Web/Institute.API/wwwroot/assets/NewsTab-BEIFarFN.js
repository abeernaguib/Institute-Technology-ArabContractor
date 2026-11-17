import{r as p,j as e}from"./vendor-core-AwIg9RWo.js";const ee="https://icemt.arabcont.com",oe={gray500:"#6b7280"},W={id:0,date:"",title:"",details:"",showFlag:!0};function X(t){if(!t)return"—";try{return new Date(t).toLocaleDateString("ar-EG",{year:"numeric",month:"long",day:"numeric"})}catch{return t}}function q(t){if(!t)return"";try{return new Date(t).toISOString().slice(0,10)}catch{return""}}function B(t){return!t||t==="N/A"||t==="pending"?null:t.startsWith("http")?t:`${ee}/${t.replace(/^\//,"")}`}function ie(t,i=55){return t?t.length>i?t.slice(0,i)+"…":t:"—"}function ae(t){if(!t)return t;const i=document.createElement("div");i.innerHTML=t,i.querySelectorAll("[style]").forEach(n=>{const o=(n.getAttribute("style")||"").trim();/^(color:\s*#?0a0a0a;?\s*)?(font-size:\s*14px;?\s*)?$/i.test(o)&&n.removeAttribute("style")}),i.querySelectorAll("a[href]").forEach(n=>n.removeAttribute("rel"));let s=i.innerHTML;return s=s.replace(/<div><br><\/div>/gi,"<br>"),s=s.replace(/<div>/gi,"").replace(/<\/div>/gi,"<br>"),s}function se({value:t,onChange:i}){return e.jsxs("label",{className:"nt-toggle-wrap",title:t?"مرئي — اضغط للإخفاء":"مخفي — اضغط للإظهار",children:[e.jsx("div",{className:`nt-toggle-track${t?" on":""}`,onClick:()=>i(!t),children:e.jsx("div",{className:"nt-toggle-thumb"})}),e.jsx("span",{className:`nt-toggle-label${t?" on":" off"}`,children:t?"👁 مرئي":"🙈 مخفي"})]})}const Z=[8,9,10,11,12,13,14,15,16,18,20,22,24,26,28,32,36,40,48,56,64,72];function le(t=""){return t?/<[a-z][\s\S]*>/i.test(t)?t:t.split(`
`).map(i=>i?`<div>${i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</div>`:"<div><br></div>").join(""):""}function ce(t,i){const s=window.getSelection();if(!s||s.rangeCount===0||s.isCollapsed)return;const n=s.getRangeAt(0),o=document.createElement("span");o.style[t]=i;try{n.surroundContents(o)}catch{const c=n.extractContents();o.appendChild(c),n.insertNode(o)}s.removeAllRanges();const m=document.createRange();m.selectNodeContents(o),s.addRange(m)}function de(t,i){const s=window.getSelection();if(!s||s.rangeCount===0)return null;let n=s.anchorNode;for(;n&&n!==t;){if(n.nodeType===1){const o=window.getComputedStyle(n)[i];if(o)return o}n=n.parentNode}return null}function pe({icon:t,label:i,sub:s,name:n,value:o,onChange:m,placeholder:c,minHeight:j=180}){const b=p.useRef(null),k=p.useRef(null),v=p.useRef(null),z=p.useRef(null),[y,I]=p.useState("#0a0a0a"),[l,f]=p.useState(14),[g,h]=p.useState(!1),[C,M]=p.useState("");p.useEffect(()=>{!b.current||o===v.current||(b.current.innerHTML=le(o),v.current=o)},[o]),p.useEffect(()=>{g&&z.current&&z.current.focus()},[g]),p.useEffect(()=>{if(!g)return;const r=u=>{u.target.closest(".nt-rte-url-wrap")||h(!1)};return document.addEventListener("mousedown",r),()=>document.removeEventListener("mousedown",r)},[g]);const R=()=>{const r=window.getSelection();(r==null?void 0:r.rangeCount)>0&&(k.current=r.getRangeAt(0).cloneRange())},D=()=>{const r=window.getSelection();r&&k.current&&(r.removeAllRanges(),r.addRange(k.current))},U=()=>{if(!b.current)return;const r=b.current.innerHTML;v.current=r,m({target:{name:n,value:r}})},N=(r,u=null)=>{var w;(w=b.current)==null||w.focus(),document.execCommand(r,!1,u),U()},E=()=>{const r=de(b.current,"fontSize");if(r){const u=Math.round(parseFloat(r));f(Z.reduce((w,P)=>Math.abs(P-u)<Math.abs(w-u)?P:w))}},Y=r=>{var w;const u=Number(r.target.value);f(u),D(),(w=b.current)==null||w.focus(),ce("fontSize",`${u}px`),U()},S=()=>{D();const r=C.trim();if(r&&r!=="https://"){N("createLink",r);const u=window.getSelection();if(u!=null&&u.anchorNode){let w=u.anchorNode;for(;w&&w!==b.current;){if(w.nodeName==="A"){w.target="_blank",w.rel="noopener noreferrer";break}w=w.parentNode}}}h(!1),U()};return e.jsxs("div",{className:"nt-rte-block",children:[e.jsxs("div",{className:"nt-rte-hdr",children:[e.jsx("span",{className:"nt-rte-icon",children:t}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"nt-rte-label",children:i}),s&&e.jsx("div",{className:"nt-rte-sub",children:s})]})]}),e.jsxs("div",{className:"nt-rte-toolbar",onMouseDown:r=>{r.target.tagName!=="SELECT"&&r.preventDefault()},children:[e.jsx("button",{className:"nt-tb-btn bold",onClick:()=>N("bold"),children:"B"}),e.jsx("button",{className:"nt-tb-btn italic",onClick:()=>N("italic"),children:"I"}),e.jsx("button",{className:"nt-tb-btn under",onClick:()=>N("underline"),children:"U"}),e.jsx("div",{className:"nt-rte-sep"}),e.jsxs("div",{className:"nt-tb-size-wrap",children:[e.jsx("select",{className:"nt-tb-select",value:l,onChange:Y,onMouseDown:R,children:Z.map(r=>e.jsx("option",{value:r,children:r},r))}),e.jsx("span",{className:"nt-tb-size-unit",children:"px"})]}),e.jsx("div",{className:"nt-rte-sep"}),e.jsx("div",{className:"nt-tb-color-wrap",children:e.jsxs("button",{className:"nt-tb-color-btn",onMouseDown:R,children:[e.jsx("span",{className:"nt-color-letter",style:{color:y},children:"A"}),e.jsx("span",{className:"nt-color-bar",style:{background:y}}),e.jsx("input",{type:"color",className:"nt-tb-color-input",value:y,onChange:r=>{const u=r.target.value;I(u),D(),N("foreColor",u)}})]})}),e.jsx("div",{className:"nt-rte-sep"}),e.jsxs("div",{className:"nt-rte-url-wrap",children:[e.jsx("button",{className:`nt-tb-btn${g?" active":""}`,onClick:()=>{R(),M("https://"),h(!0)},onMouseDown:R,children:"🔗"}),g&&e.jsxs("div",{className:"nt-url-popover",children:[e.jsx("input",{ref:z,type:"url",placeholder:"https://example.com",value:C,onChange:r=>M(r.target.value),onKeyDown:r=>{r.key==="Enter"&&S(),r.key==="Escape"&&(h(!1),D())}}),e.jsx("button",{className:"nt-url-ok",onClick:S,children:"إدراج"}),e.jsx("button",{className:"nt-url-cancel",onClick:()=>{h(!1),D()},children:"إلغاء"})]})]}),e.jsx("button",{className:"nt-tb-btn",onClick:()=>N("unlink"),onMouseDown:R,style:{fontSize:".7rem"},children:"✂️"})]}),e.jsx("div",{ref:b,contentEditable:!0,suppressContentEditableWarning:!0,className:"nt-rte-editor","data-placeholder":c,style:{minHeight:j},onInput:U,onKeyDown:r=>{(r.ctrlKey||r.metaKey)&&(r.key==="b"&&(r.preventDefault(),N("bold")),r.key==="i"&&(r.preventDefault(),N("italic")),r.key==="u"&&(r.preventDefault(),N("underline")))},onMouseUp:()=>{R(),E()},onKeyUp:()=>{R(),E()}})]})}const te=t=>[...t].sort((i,s)=>(i.priority??9999)-(s.priority??9999)),Q=t=>te(t).map((i,s)=>({...i,priority:s+1}));function fe({images:t,onChange:i,newsId:s,onServerImageDeleted:n}){const o=p.useRef(),[m,c]=p.useState(!1),[j,b]=p.useState(null),k=l=>{const f=Array.from(l).filter(h=>h.type.startsWith("image/"));if(!f.length)return;const g=t.length;i([...t,...f.map((h,C)=>({file:h,previewSrc:URL.createObjectURL(h),serverUrl:null,picId:null,startUp:g===0&&C===0,priority:g+C+1}))])},v=async l=>{const f=t[l];if(f.file||!f.picId||!s){i(Q(t.filter((g,h)=>h!==l)));return}b(f.picId);try{await L(`/api/admin/AdminNews/${s}/images/${f.picId}`,{method:"DELETE"}),i(Q(t.filter((g,h)=>h!==l))),n==null||n("تم حذف الصورة بنجاح")}catch(g){n==null||n("فشل حذف الصورة: "+g.message,"error")}finally{b(null)}},z=(l,f)=>{const g=t[l].priority;i(te(t.map((h,C)=>C===l?{...h,priority:f}:h.priority===f?{...h,priority:g}:h)))},y=l=>i(t.map((f,g)=>g===l?{...f,startUp:!f.startUp}:f)),I=(l,f)=>{if(!f||!f.type.startsWith("image/"))return;const g=[...t];g[l]={...g[l],file:f,previewSrc:URL.createObjectURL(f),serverUrl:null,picId:null},i(g)};return e.jsxs("div",{className:"nt-multi-img-wrap",children:[e.jsxs("div",{className:"nt-label",style:{marginBottom:8},children:["صور الخبر",e.jsx("span",{style:{marginRight:8,fontSize:".65rem",color:oe.gray500,fontWeight:400},children:"حدّد صور البداية وترتيب كل صورة"})]}),t.length>0&&e.jsx("div",{className:"nt-imgs-grid",children:t.map((l,f)=>e.jsx(ue,{img:l,idx:f,total:t.length,isDeleting:j===l.picId&&l.picId!=null,onRemove:()=>v(f),onToggleStartUp:()=>y(f),onPriority:g=>z(f,g),onReplace:g=>I(f,g)},l.picId??l.previewSrc))}),e.jsx("div",{className:`nt-img-zone${m?" over":""}`,style:{minHeight:72,marginTop:t.length?12:0},onDragOver:l=>{l.preventDefault(),c(!0)},onDragLeave:()=>c(!1),onDrop:l=>{l.preventDefault(),c(!1),k(l.dataTransfer.files)},onClick:()=>o.current.click(),children:e.jsxs("div",{className:"nt-img-placeholder",style:{padding:"14px 12px"},children:[e.jsx("div",{style:{fontSize:"1.6rem"},children:"🖼️"}),e.jsx("span",{className:"nt-img-hint",children:t.length===0?"اسحب الصور هنا أو اضغط للاختيار":"+ إضافة صور أخرى"}),e.jsx("span",{className:"nt-img-types",children:"JPG · PNG · WEBP"})]})}),e.jsx("input",{ref:o,type:"file",accept:"image/*",multiple:!0,style:{display:"none"},onChange:l=>{k(l.target.files),l.target.value=""}})]})}function ue({img:t,idx:i,total:s,isDeleting:n,onRemove:o,onToggleStartUp:m,onPriority:c,onReplace:j}){const b=p.useRef(),[k,v]=p.useState(!1),z=!t.file&&!!t.picId;return e.jsxs("div",{className:"nt-img-card",children:[e.jsxs("div",{className:`nt-img-slot${t.startUp?" main":""}${n?" deleting":""}`,children:[n&&e.jsx("div",{className:"nt-slot-deleting-overlay",children:"⏳"}),e.jsx("img",{src:t.previewSrc,alt:`صورة ${i+1}`,className:"nt-slot-img"}),t.startUp&&e.jsx("div",{className:"nt-main-badge",children:"⭐ بداية"}),t.file&&e.jsx("div",{className:"nt-new-badge-slot",children:"جديدة"}),!t.file&&t.serverUrl&&e.jsx("div",{className:"nt-server-badge-slot",children:"محفوظة"}),e.jsxs("div",{className:"nt-slot-actions",children:[e.jsxs("button",{type:"button",className:"nt-slot-btn replace","data-tip":"استبدال بصورة أخرى","aria-label":"استبدال الصورة",onClick:()=>b.current.click(),disabled:n,children:["📤 ",e.jsx("span",{children:"رفع"})]}),e.jsxs("button",{type:"button",className:"nt-slot-btn remove","data-tip":"حذف الصورة","aria-label":"حذف الصورة",onClick:()=>v(!0),disabled:n,children:["✕ ",e.jsx("span",{children:"حذف"})]})]}),k&&!n&&e.jsxs("div",{className:"nt-slot-confirm",children:[e.jsx("div",{className:"nt-slot-confirm-msg",children:z?"سيتم حذف هذه الصورة نهائياً من السيرفر. هل أنت متأكد؟":"هل تريد إزالة هذه الصورة؟"}),e.jsxs("div",{className:"nt-slot-confirm-btns",children:[e.jsx("button",{type:"button",className:"nt-slot-confirm-yes",onClick:()=>{v(!1),o()},children:"نعم، احذف"}),e.jsx("button",{type:"button",className:"nt-slot-confirm-no",onClick:()=>v(!1),children:"إلغاء"})]})]}),e.jsx("input",{ref:b,type:"file",accept:"image/*",style:{display:"none"},onChange:y=>{j(y.target.files[0]),y.target.value=""}})]}),e.jsxs("div",{className:"nt-img-controls",children:[e.jsxs("label",{className:"nt-chk",children:[e.jsx("input",{type:"checkbox",checked:!!t.startUp,onChange:m,disabled:n}),"صورة البداية"]}),e.jsxs("div",{className:"nt-prio",children:[e.jsx("span",{children:"الترتيب"}),e.jsx("select",{value:t.priority??i+1,onChange:y=>c(Number(y.target.value)),disabled:n,children:Array.from({length:s},(y,I)=>I+1).map(y=>e.jsx("option",{value:y,children:y},y))})]})]})]})}const be=`
.nt-layout {
    display: flex;
    direction: rtl;
    gap: 16px;
    align-items: stretch;
}
.nt-left-panel {
    width: clamp(230px, 26vw, 290px);
    flex-shrink: 0;
    background: #fff;
    border-radius: 3px;
    border: 1.5px solid #d0d3d8;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 120px);
    overflow-y: auto;
}
.nt-form-wrap {
    flex: 1;
    min-width: 0;
    height: calc(100vh - 120px);
    overflow-y: auto;
}
.nt-left-panel::-webkit-scrollbar,
.nt-form-wrap::-webkit-scrollbar { width: 4px; }
.nt-left-panel::-webkit-scrollbar-thumb,
.nt-form-wrap::-webkit-scrollbar-thumb { background: rgba(245,124,0,.35); border-radius: 2px; }

.nt-panel-hdr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px 10px;
    border-bottom: 1.5px solid #f0f1f2;
    flex-shrink: 0;
    gap: 8px;
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 5;
}
.nt-brand-icon {
    width: 36px; height: 36px; border-radius: 3px;
    background: linear-gradient(135deg, #0865a8, #1a84d4);
    display: flex; align-items: center; justify-content: center;
    font-size: .9rem; color: #bfdbfe;
    border: 1.5px solid rgba(8,101,168,.25); flex-shrink: 0;
}
.nt-brand-name { font-size: .78rem; font-weight: 800; color: #0a0a0a; }
.nt-brand-sub { font-size: .64rem; color: #6b7280; margin-top: 2px; }

.nt-search-wrap { padding: 10px 12px 6px; flex-shrink: 0; position: relative; }
.nt-search-wrap input {
    width: 100%; padding: 8px 32px 8px 12px;
    background: #fff; border: 1.5px solid #d0d3d8;
    border-radius: 3px; color: #0a0a0a;
    font-family: inherit; font-size: .76rem;
    direction: rtl; outline: none; box-sizing: border-box;
}
.nt-search-wrap input::placeholder { color: #6b7280; }
.nt-search-wrap input:focus { border-color: #f57c00; box-shadow: 0 0 0 3px rgba(245,124,0,.1); }
.nt-search-icon { position: absolute; right: 22px; top: 50%; transform: translateY(-50%); font-size: .75rem; opacity: .4; pointer-events: none; }
.nt-search-clear { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #6b7280; font-size: 1rem; padding: 2px; }

.nt-list-hdr {
    padding: 4px 14px 8px;
    display: flex; align-items: center; justify-content: space-between;
    flex-shrink: 0;
}
.nt-count-badge {
    background: rgba(8,101,168,.1); color: #0865a8;
    border: 1.5px solid rgba(8,101,168,.25); border-radius: 2px;
    padding: 1px 9px; font-size: .66rem; font-weight: 900;
    font-family: 'Courier New', monospace;
}
.nt-new-btn {
    background: rgba(245,124,0,.1); color: #f57c00;
    border: 1.5px solid rgba(245,124,0,.35); border-radius: 2px;
    padding: 4px 12px; font-size: .72rem; font-weight: 800;
    cursor: pointer; font-family: inherit; transition: all .16s;
}
.nt-new-btn:hover { background: rgba(245,124,0,.18); }

.nt-list { flex: 1; overflow-y: auto; padding: 4px 8px 12px; }
.nt-list::-webkit-scrollbar { width: 4px; }
.nt-list::-webkit-scrollbar-thumb { background: rgba(245,124,0,.35); border-radius: 2px; }
.nt-row {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 10px; border-radius: 3px; margin-bottom: 3px;
    cursor: pointer; border: 1.5px solid transparent;
    transition: background .13s, border-color .13s;
}
.nt-row:hover { background: rgba(8,101,168,.05); border-color: rgba(8,101,168,.12); }
.nt-row.active { background: rgba(245,124,0,.09); border-color: rgba(245,124,0,.35); border-right: 3px solid #f57c00; }
.nt-row-icon {
    width: 38px; height: 38px; border-radius: 3px;
    background: linear-gradient(135deg, #0865a8, #1a84d4);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; flex-shrink: 0;
    border: 1.5px solid rgba(8,101,168,.3); overflow: hidden;
}
.nt-row-info { overflow: hidden; flex: 1; }
.nt-row-title { color: #0a0a0a; font-size: .75rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nt-row-date { color: #6b7280; font-size: .63rem; margin-top: 2px; }
.nt-row-id {
    background: #f0f1f2; color: #6b7280; font-size: .6rem;
    padding: 2px 7px; border-radius: 2px; flex-shrink: 0;
    font-weight: 700; font-family: 'Courier New', monospace;
}
.nt-row-status { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; margin-top: 2px; }
.nt-row-status.on { background: #16a34a; }
.nt-row-status.off { background: #d0d3d8; }
.nt-sidebar-footer {
    padding: 10px 14px; border-top: 1.5px solid #f0f1f2;
    text-align: center; font-size: .6rem; color: #6b7280;
    background: #fff; flex-shrink: 0;
}

.nt-form-card {
    background: #fff;
    border: 1.5px solid #d0d3d8;
    border-radius: 3px;
    margin-bottom: 0;
}
.nt-form-hdr {
    background: #044478; padding: 20px 26px;
    display: flex; align-items: flex-start;
    justify-content: space-between; gap: 12px;
    flex-wrap: wrap; position: relative; overflow: hidden;
}
.nt-form-hdr::before {
    content: ''; position: absolute; inset: 0;
    background-image: linear-gradient(rgba(245,124,0,.07) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(245,124,0,.07) 1px, transparent 1px);
    background-size: 36px 36px; pointer-events: none;
}
.nt-form-tag {
    display: inline-block; background: #f57c00; color: #fff;
    font-size: .7rem; font-weight: 700; padding: 4px 14px;
    border-radius: 2px; margin-bottom: 6px; position: relative; z-index: 1;
}
.nt-form-title { font-size: 1.1rem; font-weight: 900; color: #fff; margin: 0; position: relative; z-index: 1; }
.nt-form-sub { font-size: .72rem; color: rgba(255,255,255,.4); margin: 4px 0 0; position: relative; z-index: 1; }
.nt-stat-pill {
    display: inline-flex; align-items: center;
    padding: 5px 14px; border-radius: 2px;
    background: rgba(255,255,255,.08); border: 1.5px solid rgba(255,255,255,.15);
    color: rgba(255,255,255,.72); font-size: .72rem; font-weight: 700;
    position: relative; z-index: 1;
}
.nt-form-body { padding: 26px; }
.nt-fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 20px; margin-bottom: 22px; }
.nt-field { display: flex; flex-direction: column; gap: 5px; }
.nt-label { font-size: .72rem; font-weight: 700; color: #374151; }
.nt-inp {
    border: 1.5px solid #d0d3d8; border-radius: 3px;
    padding: 9px 12px; font-size: .8rem; color: #0a0a0a;
    width: 100%; background: #fff; direction: rtl;
    font-family: inherit; transition: border .18s, box-shadow .18s;
    outline: none; box-sizing: border-box;
}
.nt-inp:focus { border-color: #f57c00; box-shadow: 0 0 0 3px rgba(245,124,0,.1); }
.nt-inp::placeholder { color: #6b7280; }
.nt-inp:disabled { background: #f0f1f2; color: #6b7280; cursor: not-allowed; }
.nt-divider { height: 1px; background: #f0f1f2; margin: 4px 0 20px; }

.nt-toggle-wrap { display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; padding: 6px 0; }
.nt-toggle-track {
    width: 46px; height: 26px; border-radius: 13px;
    background: #d0d3d8; border: 1.5px solid #d0d3d8;
    position: relative; transition: background .22s, border-color .22s; flex-shrink: 0;
}
.nt-toggle-track.on { background: #16a34a; border-color: #16a34a; }
.nt-toggle-thumb {
    position: absolute; top: 2px; right: 2px;
    width: 18px; height: 18px; border-radius: 50%;
    background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,.25);
    transition: transform .22s cubic-bezier(.4,0,.2,1);
}
.nt-toggle-track.on .nt-toggle-thumb { transform: translateX(-20px); }
.nt-toggle-label { font-size: .76rem; font-weight: 800; }
.nt-toggle-label.on { color: #16a34a; }
.nt-toggle-label.off { color: #6b7280; }

.nt-img-zone {
    width: 100%; border-radius: 6px; border: 2px dashed #d0d3d8;
    background: #f8f9fa; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    cursor: pointer; position: relative;
    transition: border-color .18s, background .18s;
    box-sizing: border-box;
}
.nt-img-zone:hover, .nt-img-zone.over { border-color: #f57c00; background: rgba(245,124,0,.03); }
.nt-img-placeholder { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 18px 12px; }
.nt-img-hint { color: #6b7280; font-size: .68rem; font-weight: 600; text-align: center; }
.nt-img-types { color: #d0d3d8; font-size: .62rem; background: #f0f1f2; padding: 2px 10px; border-radius: 2px; }
.nt-multi-img-wrap { margin-bottom: 4px; }
.nt-imgs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px,1fr)); gap: 10px; margin-bottom: 4px; }

/* overflow is visible so the tooltips can extend past the image edge;
   the image and overlays carry their own border-radius instead */
.nt-img-slot {
    position: relative; border-radius: 6px; overflow: visible;
    border: 2px solid #d0d3d8; background: #000;
    aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center;
    transition: border-color .2s, box-shadow .2s;
}
.nt-img-slot.main { border-color: #f57c00; box-shadow: 0 0 0 3px rgba(245,124,0,.2); }
.nt-img-slot.deleting { opacity: .5; pointer-events: none; }
.nt-slot-deleting-overlay {
    position: absolute; inset: 0; z-index: 10; border-radius: inherit;
    background: rgba(0,0,0,.5); display: flex;
    align-items: center; justify-content: center; font-size: 1.4rem;
}
.nt-slot-img { width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 4px; }
.nt-main-badge { position: absolute; top: 5px; right: 5px; background: #f57c00; color: #fff; font-size: .55rem; font-weight: 800; padding: 2px 8px; border-radius: 3px; pointer-events: none; z-index: 2; }
.nt-new-badge-slot { position: absolute; top: 5px; left: 5px; background: #f59e0b; color: #fff; font-size: .52rem; font-weight: 800; padding: 2px 6px; border-radius: 3px; pointer-events: none; z-index: 2; }
.nt-server-badge-slot { position: absolute; top: 5px; left: 5px; background: #0865a8; color: #fff; font-size: .52rem; font-weight: 800; padding: 2px 6px; border-radius: 3px; pointer-events: none; z-index: 2; }

/* action bar: larger buttons with text labels; always visible on touch devices */
.nt-slot-actions {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: rgba(0,0,0,.7); display: flex; align-items: center; justify-content: center;
    gap: 8px; padding: 7px; opacity: 0; transition: opacity .18s;
    border-radius: 0 0 4px 4px; z-index: 3;
}
.nt-img-slot:hover .nt-slot-actions,
.nt-slot-actions:focus-within { opacity: 1; }
@media (hover: none) { .nt-slot-actions { opacity: 1; } }

.nt-slot-btn {
    border: none; border-radius: 4px; padding: 6px 12px; min-height: 30px;
    font-size: .74rem; cursor: pointer; font-family: inherit; font-weight: 800; line-height: 1;
    display: inline-flex; align-items: center; gap: 5px; position: relative;
}
.nt-slot-btn span { font-size: .7rem; }
.nt-slot-btn.promote { background: #f57c00; color: #fff; }
.nt-slot-btn.replace { background: #0865a8; color: #fff; }
.nt-slot-btn.remove { background: #dc2626; color: #fff; }
.nt-slot-btn:disabled { opacity: .4; cursor: not-allowed; }

/* Tooltip (CSS only, driven by data-tip) */
.nt-slot-btn[data-tip]::after {
    content: attr(data-tip);
    position: absolute; bottom: calc(100% + 8px); left: 50%;
    transform: translateX(-50%) translateY(4px);
    background: #0a0a0a; color: #fff; font-size: .68rem; font-weight: 700;
    padding: 5px 10px; border-radius: 4px; white-space: nowrap;
    opacity: 0; pointer-events: none; transition: opacity .15s, transform .15s; z-index: 30;
}
.nt-slot-btn[data-tip]::before {
    content: ''; position: absolute; bottom: calc(100% + 3px); left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent; border-top-color: #0a0a0a; border-bottom: 0;
    opacity: 0; transition: opacity .15s; z-index: 30;
}
.nt-slot-btn[data-tip]:hover::after,
.nt-slot-btn[data-tip]:focus-visible::after { opacity: 1; transform: translateX(-50%) translateY(0); }
.nt-slot-btn[data-tip]:hover::before,
.nt-slot-btn[data-tip]:focus-visible::before { opacity: 1; }

/* Delete confirmation overlay */
.nt-slot-confirm {
    position: absolute; inset: 0; z-index: 20; border-radius: 4px;
    background: rgba(10,10,10,.88);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 10px; padding: 10px; text-align: center; direction: rtl;
}
.nt-slot-confirm-msg { color: #fff; font-size: .72rem; font-weight: 700; line-height: 1.6; }
.nt-slot-confirm-btns { display: flex; gap: 6px; }
.nt-slot-confirm-yes, .nt-slot-confirm-no {
    border: none; border-radius: 4px; padding: 6px 12px;
    font-family: inherit; font-size: .72rem; font-weight: 800; cursor: pointer;
}
.nt-slot-confirm-yes { background: #dc2626; color: #fff; }
.nt-slot-confirm-yes:hover { background: #b91c1c; }
.nt-slot-confirm-no { background: #f0f1f2; color: #374151; }
.nt-slot-confirm-no:hover { background: #d0d3d8; }

.nt-img-card { display: flex; flex-direction: column; gap: 6px; }
.nt-img-controls {
    display: flex; align-items: center; justify-content: space-between; gap: 6px;
    background: #f8f9fa; border: 1.5px solid #d0d3d8; border-radius: 3px; padding: 5px 8px;
}
.nt-chk { display: flex; align-items: center; gap: 5px; font-size: .68rem; font-weight: 700; color: #374151; cursor: pointer; }
.nt-chk input { width: 15px; height: 15px; accent-color: #f57c00; cursor: pointer; }
.nt-prio { display: flex; align-items: center; gap: 4px; font-size: .66rem; font-weight: 700; color: #6b7280; }
.nt-prio select { padding: 2px 4px; border: 1.5px solid #d0d3d8; border-radius: 3px; font-family: inherit; font-size: .72rem; background: #fff; }
.nt-prio select:focus { border-color: #f57c00; outline: none; }

.nt-rte-block { border-radius: 3px; border: 1.5px solid #d0d3d8; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,.04); }
.nt-rte-hdr { background: #f8f9fa; padding: 10px 16px; border-bottom: 1.5px solid #f0f1f2; display: flex; align-items: center; gap: 9px; }
.nt-rte-icon { font-size: 1.1rem; }
.nt-rte-label { font-weight: 800; font-size: .8rem; color: #0a0a0a; }
.nt-rte-sub { font-size: .65rem; color: #6b7280; margin-top: 2px; }
.nt-rte-toolbar { display: flex; align-items: center; gap: 4px; padding: 7px 12px; background: #fff; border-bottom: 1.5px solid #f0f1f2; flex-wrap: wrap; }
.nt-rte-sep { width: 1px; height: 20px; background: #e5e7eb; margin: 0 2px; flex-shrink: 0; }
.nt-tb-btn { min-width: 30px; height: 28px; padding: 0 7px; border-radius: 4px; border: 1.5px solid #d0d3d8; background: #f8f9fa; color: #374151; font-size: .78rem; font-weight: 700; cursor: pointer; transition: all .14s; font-family: inherit; }
.nt-tb-btn:hover, .nt-tb-btn.active { background: #f57c00; color: #fff; border-color: #f57c00; }
.nt-tb-btn.bold { font-weight: 900; }
.nt-tb-btn.italic { font-style: italic; }
.nt-tb-btn.under { text-decoration: underline; }
.nt-tb-size-wrap { display: flex; align-items: center; gap: 3px; }
.nt-tb-select { padding: 4px 6px; border-radius: 4px; border: 1.5px solid #d0d3d8; background: #f8f9fa; color: #374151; font-family: inherit; font-size: .74rem; cursor: pointer; outline: none; }
.nt-tb-select:focus { border-color: #f57c00; }
.nt-tb-size-unit { font-size: .65rem; color: #6b7280; font-weight: 700; }
.nt-tb-color-wrap { position: relative; }
.nt-tb-color-btn { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 3px 6px; border-radius: 4px; border: 1.5px solid #d0d3d8; background: #f8f9fa; cursor: pointer; position: relative; }
.nt-color-letter { font-size: .9rem; font-weight: 900; line-height: 1; }
.nt-color-bar { width: 14px; height: 3px; border-radius: 2px; }
.nt-tb-color-input { position: absolute; inset: 0; opacity: 0; width: 100%; height: 100%; cursor: pointer; border: none; padding: 0; }
.nt-rte-url-wrap { position: relative; }
.nt-url-popover {
    position: absolute; top: calc(100% + 6px); right: 0;
    background: #fff; border: 1.5px solid #d0d3d8;
    border-radius: 6px; box-shadow: 0 8px 24px rgba(0,0,0,.12);
    padding: 10px; z-index: 500;
    display: flex; gap: 6px; min-width: 320px;
    border-top: 3px solid #f57c00;
}
.nt-url-popover input { flex: 1; padding: 7px 10px; border: 1.5px solid #d0d3d8; border-radius: 4px; font-family: inherit; font-size: .76rem; direction: ltr; outline: none; }
.nt-url-popover input:focus { border-color: #f57c00; }
.nt-url-ok { padding: 7px 14px; background: #f57c00; color: #fff; border: none; border-radius: 4px; font-family: inherit; font-size: .74rem; font-weight: 700; cursor: pointer; }
.nt-url-cancel { padding: 7px 10px; background: #f0f1f2; color: #374151; border: 1.5px solid #d0d3d8; border-radius: 4px; font-family: inherit; font-size: .74rem; font-weight: 700; cursor: pointer; }
.nt-rte-editor {
    padding: 12px 16px; outline: none;
    font-family: inherit; font-size: .82rem; color: #0a0a0a;
    line-height: 1.9; direction: rtl; background: #fff;
    overflow-wrap: break-word; word-break: break-word; white-space: pre-wrap;
}
.nt-rte-editor:empty::before { content: attr(data-placeholder); color: #9ca3af; pointer-events: none; }
.nt-rte-editor a { color: #0865a8; text-decoration: underline; }

.nt-actions {
    display: flex; gap: 9px; margin-top: 24px;
    padding-top: 18px; border-top: 2px solid #f0f1f2;
    flex-wrap: wrap; align-items: center;
}
.nt-act-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 20px; border-radius: 3px;
    font-family: inherit; font-size: .8rem; font-weight: 800;
    cursor: pointer; border: none;
    transition: all .2s cubic-bezier(.4,0,.2,1); white-space: nowrap;
}
.nt-act-btn:hover { transform: translateY(-2px); }
.nt-act-btn:active { transform: translateY(0); }
.nt-act-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }
.nt-act-btn.save { background: #16a34a; color: #fff; box-shadow: 0 3px 12px rgba(22,163,74,.3); }
.nt-act-btn.save:hover { background: #15803d; }
.nt-act-btn.new { background: #0865a8; color: #fff; box-shadow: 0 3px 12px rgba(8,101,168,.3); }
.nt-act-btn.new:hover { background: #044478; }
.nt-act-btn.reset { background: #f57c00; color: #fff; box-shadow: 0 3px 12px rgba(245,124,0,.3); }
.nt-act-btn.reset:hover { background: #bf5200; }
.nt-act-btn.delete { background: #dc2626; color: #fff; box-shadow: 0 3px 12px rgba(220,38,38,.3); }
.nt-act-btn.delete:hover { background: #b91c1c; }
.nt-act-btn.cancel { background: #f0f1f2; color: #6b7280; border: 1.5px solid #d0d3d8; box-shadow: none; }
.nt-act-btn.cancel:hover { border-color: #0a0a0a; color: #0a0a0a; }
.nt-delete-confirm {
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
    background: #fef2f2; border: 1.5px solid rgba(220,38,38,.3);
    border-radius: 3px; padding: 9px 14px; border-right: 4px solid #dc2626;
}
.nt-delete-warn { font-size: .78rem; color: #dc2626; font-weight: 700; }

.nt-notif {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 16px; border-radius: 3px;
    font-size: .8rem; font-weight: 700;
    border-right: 4px solid;
    margin-bottom: 12px;
    animation: nt-notif-in .3s cubic-bezier(.34,1.56,.64,1);
}
.nt-notif-success { background: #f0fdf4; border-color: #16a34a; color: #15803d; }
.nt-notif-error { background: #fef2f2; border-color: #dc2626; color: #dc2626; }
.nt-notif-info { background: rgba(8,101,168,.06); border-color: #0865a8; color: #0865a8; }
@keyframes nt-notif-in { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }

.nt-skeleton { background: linear-gradient(90deg, #f0f1f2 25%, #e0e2e5 50%, #f0f1f2 75%); background-size: 200% 100%; animation: nt-shimmer 1.4s infinite; border-radius: 3px; }
@keyframes nt-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.nt-loading-row { display: flex; align-items: center; gap: 10px; padding: 9px 10px; margin-bottom: 3px; }

.nt-empty { text-align: center; padding: 40px 12px; color: #6b7280; }
.nt-empty-icon { font-size: 2rem; margin-bottom: 10px; opacity: .35; }

@media (max-width: 900px) {
    .nt-layout { flex-direction: column; }
    .nt-left-panel { width: 100%; height: 260px; }
    .nt-form-wrap { height: auto; }
    .nt-fields-grid { grid-template-columns: 1fr; }
}
`;function xe(){if(document.getElementById("nt-styles"))return;const t=document.createElement("style");t.id="nt-styles",t.textContent=be,document.head.appendChild(t)}async function ge(){var i,s,n;const t=Date.now();for(;!((i=window.Clerk)!=null&&i.loaded)&&Date.now()-t<5e3;)await new Promise(o=>setTimeout(o,50));try{return await((n=(s=window.Clerk)==null?void 0:s.session)==null?void 0:n.getToken())||null}catch{return null}}async function L(t,i={}){const s=await ge(),n={...i.headers||{}};s&&(n.Authorization=`Bearer ${s}`);const o=await fetch(`${ee}${t}`,{...i,headers:n});if(!o.ok){let c=`HTTP ${o.status}`;try{if((o.headers.get("content-type")||"").includes("application/json")){const b=await o.json();c+=" — "+((b==null?void 0:b.title)||(b==null?void 0:b.message)||JSON.stringify(b))}else{const b=await o.text();b&&(c+=" — "+b.slice(0,200))}}catch{}throw new Error(c)}const m=o.headers.get("content-type")||"";if(m.includes("application/json")||m.includes("text/plain"))try{return await o.json()}catch{return null}return null}function he(t,i,s){const n=new FormData;return n.append("Id",s?"0":String(t.id)),n.append("Title",t.title||""),n.append("Details",ae(t.details)||""),n.append("Date",t.date?`${t.date}T00:00:00.000Z`:""),n.append("ShowFlag",String(t.showFlag)),i.filter(o=>!o.file&&o.picId).forEach((o,m)=>{n.append(`ExistingPics[${m}].PicId`,String(o.picId)),n.append(`ExistingPics[${m}].StartUpPic`,String(!!o.startUp)),n.append(`ExistingPics[${m}].Priority`,String(o.priority))}),i.filter(o=>o.file).forEach((o,m)=>{n.append("Images",o.file),n.append(`NewPics[${m}].StartUpPic`,String(!!o.startUp)),n.append(`NewPics[${m}].Priority`,String(o.priority))}),n}function we(){xe();const[t,i]=p.useState([]),[s,n]=p.useState(0),[o,m]=p.useState(null),[c,j]=p.useState({...W}),[b,k]=p.useState([]),[v,z]=p.useState(!1),[y,I]=p.useState(""),[l,f]=p.useState(null),[g,h]=p.useState(!1),[C,M]=p.useState(!0),[R,D]=p.useState(!1),[U,N]=p.useState(!1),E=p.useRef(null),Y="nt_showflag_map",S=p.useRef(null);if(!S.current)try{S.current=JSON.parse(localStorage.getItem(Y)||"{}")}catch{S.current={}}const r=(a,d)=>{S.current[a]=d;try{localStorage.setItem(Y,JSON.stringify(S.current))}catch{}},u=(a,d="success")=>{f({msg:a,type:d}),setTimeout(()=>f(null),3500)},w=p.useCallback(async(a=null)=>{M(!0);try{const d=await L("/api/admin/AdminNews/getAllNews?PageIndex=1&PageSize=200"),x=(d==null?void 0:d.data)??[];i(x),n((d==null?void 0:d.totalItems)??x.length);const F=a??E.current;if(F){const T=x.find(A=>A.id===F);if(T){P(T.id,T);return}}x.length&&!E.current&&P(x[0].id,x[0])}catch(d){u("فشل تحميل الأخبار: "+d.message,"error")}finally{M(!1)}},[]);p.useEffect(()=>{w()},[w]);const P=async(a,d)=>{if(D(!0),h(!1),z(!1),E.current=a,d){m(A=>({...A||{},id:d.id,title:d.title||""}));const x=S.current[d.id],F=x!==void 0?x:d.showFlag??d.isActive??!0;j(A=>({...A,id:d.id,title:d.title||"",date:q(d.publishedAt),showFlag:F}));const T=B(d.imageUrl);k(T?[{file:null,previewSrc:T,serverUrl:d.imageUrl,picId:null,startUp:!0,priority:1}]:[])}try{const x=await L(`/api/admin/AdminNews/${a}`);if(!x)return;const F={id:x.id,title:x.title||"",details:x.details||"",date:q(x.publishedAt||x.date),showFlag:S.current[x.id]??x.showFlag??x.isActive??!0};r(F.id,F.showFlag),m(F),j(F);const T=x.images??[];let A=[];if(T.length>0)A=[...T].sort(($,H)=>($.priority??9999)-(H.priority??9999)).map(($,H)=>{const O=B($.imageUrl);return O?{file:null,previewSrc:O,serverUrl:$.imageUrl,picId:$.picId??null,startUp:!!$.isMain,priority:H+1}:null}).filter(Boolean);else{const $=B(x.imageUrl);$&&A.push({file:null,previewSrc:$,serverUrl:x.imageUrl,picId:null,startUp:!0,priority:1}),(Array.isArray(x.imageUrls)?x.imageUrls:[]).forEach(O=>{const J=B(O);J&&A.push({file:null,previewSrc:J,serverUrl:O,picId:null,startUp:!1,priority:A.length+1})})}k(A)}catch(x){u("فشل تحميل تفاصيل الخبر: "+x.message,"error")}finally{D(!1)}},_=a=>j(d=>({...d,[a.target.name]:a.target.value})),ne=async()=>{if(!c.title.trim()){u("عنوان الخبر مطلوب","error");return}if(!c.date){u("التاريخ مطلوب","error");return}if(b.length===0){u("صورة الخبر مطلوبة","error");return}if(!c.details||!c.details.trim()||c.details==="<div><br></div>"){u("تفاصيل الخبر مطلوبة","error");return}N(!0);try{const a=he(c,b,v);v?(await L("/api/admin/AdminNews",{method:"POST",body:a}),u("تم إضافة الخبر بنجاح"),z(!1),await w()):(await L(`/api/admin/AdminNews/${c.id}`,{method:"PUT",body:a}),r(c.id,c.showFlag),u("تم حفظ التغييرات بنجاح"),await w(c.id))}catch(a){u("فشل الحفظ: "+a.message,"error")}finally{N(!1)}},V=()=>{j({...W}),m(null),z(!0),h(!1),k([]),E.current=null},G=async()=>{if(!g){h(!0);return}N(!0);try{await L(`/api/admin/AdminNews/${c.id}`,{method:"DELETE"}),u("تم حذف الخبر","error"),h(!1),m(null),E.current=null,j({...W}),k([]),z(!1),await w()}catch(a){u("فشل الحذف: "+a.message,"error")}finally{N(!1)}},re=()=>{v?(j({...W}),k([])):E.current&&P(E.current,null),h(!1),u("تم إلغاء التغييرات","info")},K=t.filter(a=>(a.title||"").toLowerCase().includes(y.toLowerCase())||X(a.publishedAt).includes(y));return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:0},children:[l&&e.jsxs("div",{className:`nt-notif nt-notif-${l.type}`,style:{marginBottom:12},children:[e.jsx("span",{children:l.type==="success"?"✅":l.type==="error"?"❌":"ℹ️"}),l.msg]}),e.jsxs("div",{className:"nt-layout",children:[e.jsxs("div",{className:"nt-left-panel",children:[e.jsxs("div",{className:"nt-panel-hdr",children:[e.jsx("div",{className:"nt-brand-icon",children:"📰"}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"nt-brand-name",children:"ICEMT"}),e.jsx("div",{className:"nt-brand-sub",children:"إدارة الأخبار"})]}),e.jsx("span",{className:"nt-count-badge",children:K.length})]}),e.jsxs("div",{className:"nt-search-wrap",style:{position:"relative"},children:[e.jsx("input",{type:"text",placeholder:"بحث بالعنوان أو التاريخ...",value:y,onChange:a=>I(a.target.value)}),e.jsx("span",{className:"nt-search-icon",children:"🔍"}),y&&e.jsx("button",{className:"nt-search-clear",onClick:()=>I(""),children:"✕"})]}),e.jsxs("div",{className:"nt-list-hdr",children:[e.jsx("span",{style:{color:"#374151",fontSize:".68rem",fontWeight:700},children:"الأخبار"}),e.jsx("button",{className:"nt-new-btn",onClick:V,children:"+ جديد"})]}),e.jsxs("div",{className:"nt-list",children:[C&&[1,2,3].map(a=>e.jsxs("div",{className:"nt-loading-row",children:[e.jsx("div",{className:"nt-skeleton",style:{width:38,height:38,flexShrink:0}}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"nt-skeleton",style:{height:12,marginBottom:6}}),e.jsx("div",{className:"nt-skeleton",style:{height:10,width:"60%"}})]})]},a)),!C&&K.length===0&&e.jsxs("div",{className:"nt-empty",children:[e.jsx("div",{className:"nt-empty-icon",children:"🔍"}),e.jsx("p",{style:{fontSize:".74rem"},children:"لا توجد نتائج"})]}),!C&&K.map(a=>{const d=B(a.imageUrl),x=S.current[a.id]!==void 0?S.current[a.id]:a.showFlag??a.isActive??!0;return e.jsxs("div",{className:`nt-row${E.current===a.id?" active":""}`,onClick:()=>P(a.id,a),children:[e.jsx("div",{className:"nt-row-icon",children:d?e.jsx("img",{src:d,alt:"",style:{width:"100%",height:"100%",objectFit:"cover"}}):"📰"}),e.jsxs("div",{className:"nt-row-info",children:[e.jsx("div",{className:"nt-row-title",children:a.title||"بدون عنوان"}),e.jsx("div",{className:"nt-row-date",children:X(a.publishedAt)})]}),e.jsx("div",{className:`nt-row-status ${x?"on":"off"}`,title:x?"مرئي":"مخفي"}),e.jsxs("div",{className:"nt-row-id",children:["#",a.id]})]},a.id)})]}),e.jsxs("div",{className:"nt-sidebar-footer",children:["ICEMT © ",new Date().getFullYear()]})]}),e.jsx("div",{className:"nt-form-wrap",children:e.jsxs("div",{className:"nt-form-card",children:[e.jsxs("div",{className:"nt-form-hdr",children:[e.jsxs("div",{children:[e.jsx("div",{className:"nt-form-tag",children:v?"خبر جديد":`ID: #${c.id}`}),e.jsx("h2",{className:"nt-form-title",children:R?"⏳ جاري التحميل...":v?"➕ إضافة خبر جديد":"✏️ تعديل بيانات الخبر"}),!v&&c.title&&e.jsx("p",{className:"nt-form-sub",children:ie(c.title,60)})]}),e.jsxs("div",{className:"nt-stat-pill",children:["📰 ",s," خبر"]})]}),R?e.jsx("div",{style:{padding:40,textAlign:"center",color:"#6b7280"},children:"⏳ جاري تحميل البيانات..."}):e.jsxs("div",{className:"nt-form-body",children:[e.jsxs("div",{className:"nt-fields-grid",children:[e.jsxs("div",{className:"nt-field",children:[e.jsx("label",{className:"nt-label",children:"الرقم"}),e.jsx("input",{className:"nt-inp",value:v?"تلقائي":c.id,disabled:!0,style:{background:"#f0f1f2",color:"#6b7280",cursor:"not-allowed",fontFamily:"'Courier New',monospace",fontSize:".74rem"}})]}),e.jsxs("div",{className:"nt-field",children:[e.jsxs("label",{className:"nt-label",children:["التاريخ ",e.jsx("span",{style:{color:"#dc2626"},children:"*"})]}),e.jsx("input",{className:"nt-inp",type:"date",name:"date",value:c.date,onChange:_,style:{direction:"ltr",textAlign:"right"}})]}),e.jsxs("div",{className:"nt-field",style:{gridColumn:"1/-1"},children:[e.jsx("label",{className:"nt-label",children:"حالة الظهور"}),e.jsx(se,{value:!!c.showFlag,onChange:a=>j(d=>({...d,showFlag:a}))})]}),e.jsxs("div",{className:"nt-field",style:{gridColumn:"1/-1"},children:[e.jsxs("label",{className:"nt-label",children:["عنوان الخبر ",e.jsx("span",{style:{color:"#dc2626"},children:"*"})]}),e.jsx("input",{className:"nt-inp",name:"title",value:c.title,onChange:_,placeholder:"أدخل عنوان الخبر هنا..."})]})]}),e.jsx("div",{style:{marginBottom:20},children:e.jsx(fe,{images:b,onChange:k,newsId:v?null:c.id,onServerImageDeleted:(a,d="success")=>u(a,d)})}),e.jsx("div",{className:"nt-divider"}),e.jsx(pe,{icon:"📝",label:"تفاصيل الخبر *",sub:"حدد النص أولاً ثم اختر التنسيق من شريط الأدوات",name:"details",value:c.details,onChange:_,placeholder:"أدخل تفاصيل الخبر هنا...",minHeight:200}),e.jsxs("div",{className:"nt-actions",children:[e.jsx("button",{className:"nt-act-btn save",onClick:ne,disabled:U,children:U?"⏳ جاري الحفظ...":"💾 حفظ"}),e.jsx("button",{className:"nt-act-btn new",onClick:V,disabled:U,children:"➕ خبر جديد"}),e.jsx("button",{className:"nt-act-btn reset",onClick:re,disabled:U,children:"↩ إلغاء"}),e.jsx("div",{style:{flex:1}}),!v&&(g?e.jsxs("div",{className:"nt-delete-confirm",children:[e.jsx("span",{className:"nt-delete-warn",children:"⚠️ هل أنت متأكد من حذف هذا الخبر؟"}),e.jsx("button",{className:"nt-act-btn delete",onClick:G,disabled:U,children:"تأكيد الحذف"}),e.jsx("button",{className:"nt-act-btn cancel",onClick:()=>h(!1),children:"إلغاء"})]}):e.jsx("button",{className:"nt-act-btn delete",onClick:G,disabled:U,children:"🗑 حذف الخبر"}))]})]})]})})]})]})}export{we as default};
