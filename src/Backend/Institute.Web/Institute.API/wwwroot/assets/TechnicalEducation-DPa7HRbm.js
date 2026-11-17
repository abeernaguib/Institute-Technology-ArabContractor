import{r as c,j as e}from"./vendor-core-AwIg9RWo.js";const I=[7,8,9,10,11],n=r=>`/images/tech-${String(r).padStart(2,"0")}.${I.includes(r)?"png":"jpg"}`,d=r=>{const i=r.currentTarget;i.dataset.retried||(i.dataset.retried="1",i.src=i.src.endsWith(".png")?i.src.replace(/\.png$/,".jpg"):i.src.replace(/\.jpg$/,".png"))},b=7,S=12;function C(){const[r,i]=c.useState(null),[s,l]=c.useState(0),[h,p]=c.useState(!1),m=(o,t)=>{i({src:o,title:t}),document.body.style.overflow="hidden"},x=()=>{i(null),document.body.style.overflow="auto"},u="تسهم شركة المقاولون العرب في تطوير منظومة التعليم الفني والتدريب المهني من خلال الشراكات مع المؤسسات التعليمية والجهات الدولية، وتوفير التدريب العملي للطلاب، وتأهيل المعلمين والمدربين، وتطوير الورش والإمكانات التدريبية؛ لإعداد كوادر فنية مؤهلة تلبي احتياجات سوق العمل.",v="يهدف البروتوكول إلى إعداد جيل جديد من خريجي المدارس الثانوية الصناعية، يمتلك المهارات الفنية والعملية والقدرة على التعامل مع التكنولوجيا الحديثة، بما يسهم في توفير كوادر فنية مؤهلة لتلبية احتياجات الشركة وسوق العمل.",w=[{icon:"🎓",title:"التأهيل والرعاية",text:"اختيار الطلاب وتوفير التدريب العملي والرعاية اللازمة، ومنح الخريجين شهادات خبرة وفقًا للنظم المعتمدة."},{icon:"👨‍🏫",title:"تطوير الكوادر التعليمية",text:"رفع كفاءة المعلمين من خلال برامج تدريبية فنية وإدارية متخصصة."},{icon:"🛠️",title:"تطوير البنية التدريبية",text:"تحديث ورش المدارس وتوفير المعدات والأدوات اللازمة وصيانتها."}],g=[{name:"مدرسة أبو رواش الثانوية الصناعية المشتركة",major:"فني ديزل ومعدات ثقيلة",count:40,place:"مركز التدريب على المهن الميكانيكية والكهربائية بشبرا",images:[n(1),n(2)]},{name:"مدرسة مدينة نصر الثانوية الصناعية",major:"فني التشطيبات المعمارية",count:40,place:"مركز التدريب الحرفي على مهن التشييد والبناء",images:[n(3),n(4)]},{name:"مدرسة المعدات الثقيلة الصناعية بالإسماعيلية",major:"فني ديزل ومعدات ثقيلة",count:38,place:"ورش دويتس التابعة لإدارة ورش العمرات بالإسماعيلية",images:[n(6)]}],j=g.reduce((o,t)=>o+t.count,0),y=["في إطار التعاون مع الوكالة الألمانية للتعاون الدولي (GIZ) ومعهد ICON INSTITUT، يساهم المعهد في تنفيذ برامج تدريبية متخصصة لمدربي وزارة التربية والتعليم والتعليم الفني في قطاعي التشييد والبناء والأخشاب والأثاث، وذلك ضمن مشروع الدعم الفني لمبادرة التعليم الفني الشامل في مصر (TCTI).","ويستهدف هذا التعاون رفع كفاءة المدربين، والمساهمة في تطوير المناهج والبرامج التدريبية القائمة على نظام الجدارات، وتعزيز جودة التعليم الفني والتدريب المهني بما يتوافق مع متطلبات سوق العمل والتطورات التكنولوجية."],a=Array.from({length:S-b+1},(o,t)=>n(b+t)),N=()=>l(o=>(o+1)%a.length),k=()=>l(o=>(o-1+a.length)%a.length);return c.useEffect(()=>{if(h||r)return;const o=setInterval(()=>l(t=>(t+1)%a.length),4e3);return()=>clearInterval(o)},[h,r,a.length]),e.jsxs("div",{className:"tech-page-wrapper",children:[e.jsx("style",{children:`

                :root {
                    --primary-color: #0865a8;
                    --secondary-color: #f57c00;
                    --bg-light: #F5F7E1;
                    --text-dark: #333333;
                    --border-color: #e8e8e8;
                    --transition-speed: 0.3s;
                }

                .tech-page-wrapper {
                    direction: rtl;
                    background: #ffffff;
                    min-height: 100vh;
                    font-family: 'Noto Kufi Arabic', serif;
                    color: var(--text-dark);
                }

                .tech-page-wrapper * {
                    font-family: 'Noto Kufi Arabic', serif;
                    box-sizing: border-box;
                }

                .tech-main-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 120px 5% 60px;
                }

                .tech-card {
                    background: #fff;
                    border-radius: 18px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                    border: 1px solid var(--border-color);
                    margin-bottom: 30px;
                    overflow: hidden;
                    transition: transform var(--transition-speed), box-shadow var(--transition-speed);
                }

                .tech-header-card {
                    padding: 40px 30px;
                    text-align: center;
                }

                .tech-title {
                    font-size: clamp(1.5rem, 4vw, 2.2rem);
                    color: var(--primary-color);
                    font-weight: bold;
                    margin-bottom: 15px;
                }

                .tech-title-underline {
                    width: 70px;
                    height: 4px;
                    background: var(--secondary-color);
                    border-radius: 6px;
                    margin: 0 auto 25px;
                }

                .tech-subtitle {
                    font-size: clamp(1rem, 2vw, 1.1rem);
                    font-weight: 600;
                    margin-bottom: 20px;
                }

                .tech-description {
                    line-height: 1.9;
                    font-size: clamp(0.9rem, 1.8vw, 1rem);
                    max-width: 900px;
                    margin: 0 auto;
                }

                .tech-section-title {
                    color: var(--primary-color);
                    font-weight: bold;
                    font-size: clamp(1.2rem, 3vw, 1.6rem);
                    margin: 50px 0 10px;
                    padding-right: 14px;
                    border-right: 5px solid var(--secondary-color);
                }

                .tech-section-text {
                    line-height: 2;
                    font-size: clamp(0.92rem, 1.8vw, 1.02rem);
                    margin-bottom: 25px;
                }

                .tech-grid {
                    display: grid;
                    gap: 25px;
                    margin-bottom: 40px;
                }

                .tech-grid-3 { grid-template-columns: repeat(3, 1fr); }

                .role-card {
                    padding: 28px 24px;
                    text-align: center;
                    border-top: 4px solid var(--secondary-color);
                    margin-bottom: 0;
                    height: 100%;
                }

                .role-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 24px rgba(245, 124, 0, 0.18);
                }

                .role-icon { font-size: 2.2rem; margin-bottom: 10px; }

                .role-title {
                    color: var(--primary-color);
                    font-weight: bold;
                    font-size: 1.1rem;
                    margin-bottom: 10px;
                }

                .role-text { line-height: 1.9; font-size: 0.95rem; margin: 0; }

                .school-block {
                    margin-bottom: 30px;
                    border-top: 4px solid var(--primary-color);
                }

                .school-block:hover { box-shadow: 0 8px 24px rgba(8, 101, 168, 0.15); }

                .school-info { padding: 24px 28px; background: #fafcff; }

                .school-name {
                    color: var(--primary-color);
                    font-weight: bold;
                    font-size: clamp(1.05rem, 2.2vw, 1.25rem);
                    margin-bottom: 16px;
                }

                .school-rows {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 14px;
                }

                .school-row {
                    background: #fff;
                    border: 1px solid var(--border-color);
                    border-radius: 12px;
                    padding: 12px 14px;
                }

                .school-row-label { font-size: 0.78rem; color: #888; margin-bottom: 4px; }
                .school-row-value { font-weight: 700; font-size: 0.95rem; line-height: 1.6; }

                .school-imgs {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .school-imgs .school-img {
                    width: 70%;
                    height: clamp(260px, 38vw, 420px);
                }

                .school-img {
                    height: clamp(260px, 38vw, 420px);
                    cursor: pointer;
                    overflow: hidden;
                    background: #eef1f5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* School photos: fill the box, keep proportions */
                .school-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    display: block;
                    transition: transform 0.5s ease;
                }

                .school-img:hover img { transform: scale(1.03); }

                .total-banner {
                    background: linear-gradient(135deg, var(--primary-color), #044474);
                    color: #fff;
                    border-radius: 18px;
                    padding: 22px 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 18px;
                    flex-wrap: wrap;
                    margin-bottom: 40px;
                }

                .total-banner-num {
                    font-size: clamp(2rem, 5vw, 2.8rem);
                    font-weight: 900;
                    color: var(--secondary-color);
                    line-height: 1;
                }

                .total-banner-label { font-size: clamp(1rem, 2.2vw, 1.2rem); font-weight: 700; }

                /* Slideshow */
                .slideshow {
                    background: #f5f5f5;
                    border-radius: 18px;
                    padding: 20px;
                    margin-bottom: 40px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                }

                .slide-frame {
                    position: relative;
                    width: 100%;
                    height: clamp(280px, 55vw, 650px);
                    background: #e9e9e9;
                    border-radius: 12px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                /* Slideshow photo: fill the frame, keep proportions */
                .slide-frame img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;   /* use "cover" to fill the whole frame (crops edges) */
                    display: block;
                    animation: fadeIn 0.5s ease;
                }

                .slide-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 46px;
                    height: 46px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(0,0,0,0.5);
                    color: #fff;
                    font-size: 1.4rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background var(--transition-speed);
                    z-index: 2;
                }

                .slide-btn:hover { background: var(--secondary-color); }
                .slide-btn-next { left: 14px; }
                .slide-btn-prev { right: 14px; }

                .slide-counter {
                    position: absolute;
                    bottom: 12px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0,0,0,0.6);
                    color: #fff;
                    padding: 4px 16px;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    direction: ltr;
                }

                .slide-thumbs {
                    display: flex;
                    gap: 10px;
                    overflow-x: auto;
                    padding: 14px 0 4px;
                }

                .slide-thumb {
                    width: 110px;
                    height: 72px;
                    flex-shrink: 0;
                    object-fit: contain;
                    background: #e9e9e9;
                    border-radius: 8px;
                    cursor: pointer;
                    border: 3px solid transparent;
                    transition: border-color var(--transition-speed), opacity var(--transition-speed);
                    opacity: 0.7;
                }

                .slide-thumb.active { border-color: var(--secondary-color); opacity: 1; }

                .tech-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background-color: rgba(0, 0, 0, 0.9);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    padding: 20px;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

                .tech-modal-content {
                    position: relative;
                    max-width: 95%;
                    max-height: 85vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .tech-modal-image {
                    width: 90vw;
                    max-width: 1400px;
                    height: 80vh;
                    border-radius: 8px;
                    object-fit: contain;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                }

                .tech-modal-close {
                    position: absolute;
                    top: -50px;
                    right: 0;
                    background: var(--secondary-color);
                    color: white;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background var(--transition-speed);
                }

                .tech-modal-close:hover { background: var(--primary-color); }

                .tech-modal-title {
                    color: white;
                    margin-top: 15px;
                    font-size: 1.1rem;
                    text-align: center;
                }

                @media (min-width: 1920px) {
                    .tech-main-container { max-width: 1600px; }
                }

                @media (max-width: 900px) {
                    .tech-grid-3 { grid-template-columns: 1fr; }
                    .school-rows { grid-template-columns: 1fr; }
                }

                @media (max-width: 768px) {
                    .tech-main-container { padding-top: 100px; }
                    .tech-header-card { padding: 30px 20px; }

                    /* Stack the school images under each other */
                    .school-imgs {
                        flex-direction: column;
                        gap: 12px;
                        padding-bottom: 12px;
                    }

                    .school-imgs .school-img {
                        width: 100%;
                    }
                }

                @media (max-width: 480px) {
                    .tech-main-container { padding: 90px 15px 40px; }

                    .slide-btn { width: 38px; height: 38px; }
                    .tech-modal-close { top: -45px; width: 35px; height: 35px; }
                }

                @media (max-width: 320px) {
                    .tech-title { font-size: 1.3rem; }
                }
            `}),e.jsx("div",{style:{position:"fixed",top:70,left:0,zIndex:50,width:"100%",borderBottom:"1px solid #d1d5db",backgroundColor:"#f5f5f5",padding:"8px 20px"},children:e.jsxs("div",{style:{textAlign:"center",fontFamily:'"Noto Kufi Arabic", serif',fontSize:"1rem"},children:[e.jsx("a",{href:"/",style:{color:"#0865a8",fontWeight:700,textDecoration:"none",marginLeft:"8px"},onMouseEnter:o=>o.target.style.color="#f57c00",onMouseLeave:o=>o.target.style.color="#0865a8",children:"الصفحة الرئيسية"}),e.jsx("span",{style:{color:"#6b7280",margin:"0 6px"},children:"•"}),e.jsx("span",{style:{color:"#374151",marginRight:"8px"},children:"تطوير التعليم الفني"})]})}),e.jsxs("main",{className:"tech-main-container",children:[e.jsxs("section",{className:"tech-card tech-header-card",children:[e.jsx("h1",{className:"tech-title",children:"تطوير التعليم الفني"}),e.jsx("div",{className:"tech-title-underline"}),e.jsx("p",{className:"tech-subtitle",children:"بروتوكول التعاون بين وزارة التربية والتعليم وشركة المقاولون العرب"}),e.jsx("p",{className:"tech-description",children:u})]}),e.jsx("h2",{className:"tech-section-title",children:"١. بروتوكول التعاون مع وزارة التربية والتعليم والتعليم الفني"}),e.jsx("p",{className:"tech-section-text",children:v}),e.jsx("section",{className:"tech-grid tech-grid-3",children:w.map((o,t)=>e.jsxs("div",{className:"tech-card role-card",children:[e.jsx("div",{className:"role-icon",children:o.icon}),e.jsx("h3",{className:"role-title",children:o.title}),e.jsx("p",{className:"role-text",children:o.text})]},t))}),e.jsx("h2",{className:"tech-section-title",children:"٢. المدارس المستفيدة من برامج التدريب"}),g.map((o,t)=>e.jsxs("section",{className:"tech-card school-block",children:[e.jsxs("div",{className:"school-info",children:[e.jsx("h3",{className:"school-name",children:o.name}),e.jsxs("div",{className:"school-rows",children:[e.jsxs("div",{className:"school-row",children:[e.jsx("div",{className:"school-row-label",children:"التخصص"}),e.jsx("div",{className:"school-row-value",children:o.major})]}),e.jsxs("div",{className:"school-row",children:[e.jsx("div",{className:"school-row-label",children:"العدد"}),e.jsxs("div",{className:"school-row-value",children:[o.count," طالبًا"]})]}),e.jsxs("div",{className:"school-row",children:[e.jsx("div",{className:"school-row-label",children:"مكان التدريب"}),e.jsx("div",{className:"school-row-value",children:o.place})]})]})]}),e.jsx("div",{className:"school-imgs",children:o.images.map((f,z)=>e.jsx("div",{className:"school-img",onClick:()=>m(f,o.name),children:e.jsx("img",{src:f,alt:o.name,onError:d})},z))})]},t)),e.jsxs("div",{className:"total-banner",children:[e.jsx("span",{className:"total-banner-label",children:"إجمالي عدد الطلاب"}),e.jsx("span",{className:"total-banner-num",children:j}),e.jsx("span",{className:"total-banner-label",children:"طالب"})]}),e.jsx("h2",{className:"tech-section-title",children:"٣. التعاون الدولي لتطوير التعليم الفني والتدريب المهني"}),y.map((o,t)=>e.jsx("p",{className:"tech-section-text",children:o},t)),e.jsxs("section",{className:"slideshow",onMouseEnter:()=>p(!0),onMouseLeave:()=>p(!1),children:[e.jsxs("div",{className:"slide-frame",onClick:()=>m(a[s],"التعاون الدولي لتطوير التعليم الفني"),children:[e.jsx("img",{src:a[s],alt:`صورة ${s+1}`,onError:d},s),e.jsx("button",{className:"slide-btn slide-btn-prev",onClick:o=>{o.stopPropagation(),k()},"aria-label":"السابق",children:"›"}),e.jsx("button",{className:"slide-btn slide-btn-next",onClick:o=>{o.stopPropagation(),N()},"aria-label":"التالي",children:"‹"}),e.jsxs("div",{className:"slide-counter",children:[s+1," / ",a.length]})]}),e.jsx("div",{className:"slide-thumbs",children:a.map((o,t)=>e.jsx("img",{src:o,alt:`مصغرة ${t+1}`,className:`slide-thumb ${t===s?"active":""}`,onClick:()=>l(t),onError:d},t))})]})]}),r&&e.jsx("div",{className:"tech-modal-overlay",onClick:x,children:e.jsxs("div",{className:"tech-modal-content",onClick:o=>o.stopPropagation(),children:[e.jsx("button",{className:"tech-modal-close",onClick:x,children:"✕"}),e.jsx("img",{src:r.src,alt:r.title,className:"tech-modal-image",onError:d}),e.jsx("div",{className:"tech-modal-title",children:r.title})]})})]})}export{C as default};
