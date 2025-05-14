(()=>{var e={};e.id=974,e.ids=[974],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1180:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,6346,23)),Promise.resolve().then(t.t.bind(t,7924,23)),Promise.resolve().then(t.t.bind(t,5656,23)),Promise.resolve().then(t.t.bind(t,99,23)),Promise.resolve().then(t.t.bind(t,8243,23)),Promise.resolve().then(t.t.bind(t,8827,23)),Promise.resolve().then(t.t.bind(t,2763,23)),Promise.resolve().then(t.t.bind(t,7173,23))},1777:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>i.a,__next_app__:()=>c,pages:()=>p,routeModule:()=>u,tree:()=>d});var s=t(5239),o=t(8088),n=t(8170),i=t.n(n),a=t(893),l={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);t.d(r,l);let d=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,7716)),"/Users/deiv/Local Sites/__portfolio/gutenberg-custom-blocks/app/page.tsx"]}]},{layout:[()=>Promise.resolve().then(t.bind(t,8014)),"/Users/deiv/Local Sites/__portfolio/gutenberg-custom-blocks/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,7398,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(t.t.bind(t,9999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(t.t.bind(t,5284,23)),"next/dist/client/components/unauthorized-error"]}],p=["/Users/deiv/Local Sites/__portfolio/gutenberg-custom-blocks/app/page.tsx"],c={require:t,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:o.RouteKind.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},2704:()=>{},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},3873:e=>{"use strict";e.exports=require("path")},3943:()=>{},5695:()=>{},6487:()=>{},7628:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,6444,23)),Promise.resolve().then(t.t.bind(t,6042,23)),Promise.resolve().then(t.t.bind(t,8170,23)),Promise.resolve().then(t.t.bind(t,9477,23)),Promise.resolve().then(t.t.bind(t,9345,23)),Promise.resolve().then(t.t.bind(t,2089,23)),Promise.resolve().then(t.t.bind(t,6577,23)),Promise.resolve().then(t.t.bind(t,1307,23))},7716:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>c});var s=t(7413),o=t(1120);let n=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),i=(...e)=>e.filter((e,r,t)=>!!e&&""!==e.trim()&&t.indexOf(e)===r).join(" ").trim();var a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let l=(0,o.forwardRef)(({color:e="currentColor",size:r=24,strokeWidth:t=2,absoluteStrokeWidth:s,className:n="",children:l,iconNode:d,...p},c)=>(0,o.createElement)("svg",{ref:c,...a,width:r,height:r,stroke:e,strokeWidth:s?24*Number(t)/Number(r):t,className:i("lucide",n),...p},[...d.map(([e,r])=>(0,o.createElement)(e,r)),...Array.isArray(l)?l:[l]])),d=((e,r)=>{let t=(0,o.forwardRef)(({className:t,...s},a)=>(0,o.createElement)(l,{ref:a,iconNode:r,className:i(`lucide-${n(e)}`,t),...s}));return t.displayName=`${e}`,t})("FolderTree",[["path",{d:"M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",key:"hod4my"}],["path",{d:"M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",key:"w4yl2u"}],["path",{d:"M3 5a2 2 0 0 0 2 2h3",key:"f2jnh7"}],["path",{d:"M3 3v13a2 2 0 0 0 2 2h3",key:"k8epm1"}]]);function p(){return(0,s.jsxs)("div",{className:"p-4 border rounded-lg bg-slate-50 dark:bg-slate-900",children:[(0,s.jsxs)("h3",{className:"font-semibold mb-2 flex items-center gap-2",children:[(0,s.jsx)(d,{className:"h-5 w-5"}),"Plugin Structure"]}),(0,s.jsx)("pre",{className:"text-sm overflow-auto p-3 bg-white dark:bg-slate-800 rounded border",children:`wordpress-blocks-plugin/
├── .github/                      # GitHub workflows for CI/CD
├── .vscode/                      # VS Code settings
├── assets/                       # Static assets
├── build/                        # Production build output
├── node_modules/                 # JS dependencies
├── src/
│   ├── Blocks/                   # Block classes
│   │   ├── CTABlock.php
│   │   ├── GoogleMapsBlock.php
│   │   └── YouTubeBlock.php
│   ├── Core/                     # Core plugin functionality
│   │   ├── Assets.php            # Asset management
│   │   ├── BlocksManager.php     # Register blocks
│   │   └── Plugin.php            # Main plugin class
│   └── js/
│       ├── blocks/               # React block components
│       │   ├── cta/
│       │   ├── google-maps/
│       │   └── youtube/
│       └── index.js              # JS entry point
├── tests/                        # PHP and JS tests
│   ├── php/
│   └── js/
├── vendor/                       # Composer dependencies
├── .editorconfig                 # Editor settings
├── .eslintrc.js                  # ESLint config
├── .gitignore                    # Git ignore file
├── .phpcs.xml.dist               # PHP Code Sniffer config
├── composer.json                 # PHP dependencies
├── package.json                  # JS dependencies
├── phpunit.xml.dist              # PHPUnit config
├── webpack.config.js             # Webpack config
└── wordpress-blocks-plugin.php   # Main plugin file`})]})}function c(){return(0,s.jsx)("div",{children:(0,s.jsx)(p,{})})}},8014:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>n,metadata:()=>o});var s=t(7413);t(2704);let o={title:"v0 App",description:"Created with v0",generator:"v0.dev"};function n({children:e}){return(0,s.jsx)("html",{lang:"en",children:(0,s.jsx)("body",{children:e})})}},8335:()=>{},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")}};var r=require("../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[825],()=>t(1777));module.exports=s})();