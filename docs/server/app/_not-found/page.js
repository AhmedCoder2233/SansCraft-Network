(()=>{var e={};e.id=409,e.ids=[409],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},7034:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>f,tree:()=>d}),s(9333),s(996),s(3733);var r=s(170),n=s(5002),i=s(3876),o=s.n(i),a=s(6299),l={};for(let e in a)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);s.d(t,l);let d=["",{children:["/_not-found",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.t.bind(s,996,23)),"next/dist/client/components/not-found-error"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,3733)),"D:\\I.T Coding Work\\Sans-Craft-Minecraft\\my-app\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,996,23)),"next/dist/client/components/not-found-error"]}],c=[],u="/_not-found/page",p={require:s,loadChunk:()=>Promise.resolve()},f=new r.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/_not-found/page",pathname:"/_not-found",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},9969:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,3642,23)),Promise.resolve().then(s.t.bind(s,7586,23)),Promise.resolve().then(s.t.bind(s,7838,23)),Promise.resolve().then(s.t.bind(s,8057,23)),Promise.resolve().then(s.t.bind(s,7741,23)),Promise.resolve().then(s.t.bind(s,3118,23))},3837:(e,t,s)=>{Promise.resolve().then(s.bind(s,5906))},5906:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>l});var r=s(7247),n=s(8964),i=s(9312),o=s(7078),a=s(878);let l=()=>{let[e,t]=(0,n.useState)(!1),[s,l]=(0,n.useState)([]),[d,c]=(0,n.useState)(""),u=(0,n.useRef)(null);(0,n.useEffect)(()=>{let e=setTimeout(()=>{p("Hey there! I'm the SansCraft Assistant. How can I help you today?")},3e3);return()=>clearTimeout(e)},[]),(0,n.useEffect)(()=>{u.current?.scrollIntoView({behavior:"smooth"})},[s]);let p=e=>{l(t=>[...t,{text:e,isUser:!1}])},f=e=>{l(t=>[...t,{text:e,isUser:!0}]),c(""),m(e)},m=e=>{setTimeout(()=>{let t=e.toLowerCase();t.includes("discord")?p("Our Discord server is: https://discord.gg/hUdzUc4HFX"):t.includes("java")||t.includes("ip")&&!t.includes("bedrock")?p("Java Edition IP: sanscraft.top"):t.includes("bedrock")?p("Bedrock Edition IP: sanscraft.top\nPort: 20041"):t.includes("mode")||t.includes("game")?p("Current game modes:\n- BoxPvP (Competitive 1v1 battles)\n- More coming soon!"):t.includes("help")||t.includes("support")?p("You can ask me about:\n- Server IPs (Java/Bedrock)\n- Discord link\n- Game modes\n- Rules & Policies\n- How to join"):t.includes("rule")||t.includes("conduct")||t.includes("policy")?p(`Here are our server rules and policies. What would you like to know more about?
        
[1] In-Game Rules & Conduct
[2] Modifications Policy
[3] Unban Policy
[4] Refund Policy

Reply with the number for details.`):t.includes("1")||t.includes("game rules")||t.includes("conduct")?p(`**In-Game Rules & Conduct**

• Chat & Communication:
  - Keep all communication respectful, appropriate, and in English
  - Offensive usernames/skins are prohibited

• Fair Play:
  - No hacking/unfair mods
  - No IRL trading
  - No bug/glitch exploitation
  - No automation tools

• Behavior:
  - No drama/disputes
  - No doxing/threats
  - Scamming is allowed (no refunds)

• Prohibited:
  - No sensitive topics (politics, etc.)
  - No advertising
  - No report system abuse`):t.includes("2")||t.includes("mod")||t.includes("client")?p(`**Modifications Policy**

🚫 Disallowed Mods:
- Freecam, Francium, CW
- Auto Clickers, Tweakeroo
- Elytra/Chestplate Swappers

✅ Allowed Mods:
- Performance mods (OptiFine, Sodium)
- Inventory HUD
- Totem Counter
- Health Indicators

Note: Any mod giving unfair advantage may be bannable.`):t.includes("3")||t.includes("unban")?p(`**Unban Policy**

We only consider unbans if:
- You provide clear, unedited video evidence
- The clip shows full context of the incident

❌ Requests without video proof will be denied`):t.includes("4")||t.includes("refund")?p(`**Refund Policy**

🔄 Eligible Cases:
- Death to confirmed cheaters
- Server faults (lag/crashes)
- False bans
- Elytra bugs

📌 Requirements:
- Evidence must be <24h old
- Show full Minecraft client
- Clearly display the issue

❌ No refunds for:
- Deaths during reboots
- Client-side issues`):t.includes("join")||t.includes("play")?p(`To join SansCraft:
        
1. Open Minecraft
2. Add server:
   - Java: sanscraft.top
   - Bedrock: sanscraft.top Port: 20041
3. Click Join Server!`):p(`I'm not sure I understand. Try asking about:
- Server IPs (Java/Bedrock)
- Discord
- Game modes
- Rules & Policies
Or type 'help' for options.`)},800)},x=e=>{f(e)};return(0,r.jsxs)(r.Fragment,{children:[r.jsx(i.E.div,{className:"fixed bottom-6 right-6 z-50 cursor-pointer",initial:{scale:0},animate:{scale:1},transition:{delay:1.5,type:"spring"},whileHover:{scale:1.1},onClick:()=>t(!0),children:(0,r.jsxs)("div",{className:"relative",children:[r.jsx("div",{className:"w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg",children:r.jsx(a.iNY,{className:"text-white text-2xl"})}),r.jsx(i.E.div,{className:"absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs",animate:{scale:[1,1.2,1]},transition:{duration:2,repeat:1/0},children:"!"})]})}),r.jsx(o.M,{children:e&&(0,r.jsxs)(i.E.div,{className:"fixed bottom-24 right-6 w-80 h-96 bg-gray-800 rounded-lg shadow-xl flex flex-col z-50 overflow-hidden border border-gray-700",initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:20},children:[(0,r.jsxs)("div",{className:"bg-gradient-to-r from-blue-600 to-purple-700 p-3 flex justify-between items-center",children:[(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx(a.iNY,{className:"text-white mr-2"}),r.jsx("h3",{className:"text-white font-bold",children:"SansCraft Assistant"})]}),r.jsx("button",{onClick:()=>t(!1),className:"text-white hover:text-gray-200",children:r.jsx(a.aHS,{})})]}),(0,r.jsxs)("div",{className:"flex-1 p-4 overflow-y-auto bg-gray-900/50",children:[0===s.length?r.jsx("div",{className:"text-center text-gray-400 flex items-center justify-center h-full",children:"Ask me anything about SansCraft!"}):s.map((e,t)=>r.jsx(i.E.div,{className:`mb-3 ${e.isUser?"text-right":"text-left"}`,initial:{opacity:0,x:e.isUser?20:-20},animate:{opacity:1,x:0},children:r.jsx("div",{className:`inline-block px-3 py-2 rounded-lg max-w-xs ${e.isUser?"bg-blue-600 text-white":"bg-gray-700 text-white"}`,children:e.text.split("\n").map((e,t)=>r.jsx("p",{children:e},t))})},t)),r.jsx("div",{ref:u})]}),r.jsx("div",{className:"px-3 py-2 bg-gray-800 border-t border-gray-700",children:(0,r.jsxs)("div",{className:"flex overflow-x-auto pb-2 space-x-2",children:[["IP?","Bedrock?","Rules"].map((e,t)=>(0,r.jsxs)("button",{onClick:()=>x(e),className:"px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-full whitespace-nowrap flex items-center",children:["Rules"===e&&r.jsx(a.Mp$,{className:"mr-1",size:10}),"IP?"===e&&r.jsx(a.MXt,{className:"mr-1",size:10}),"Bedrock?"===e&&r.jsx(a.MXt,{className:"mr-1",size:10}),e]},t)),(0,r.jsxs)("button",{onClick:()=>x("Mods Policy"),className:"px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-full whitespace-nowrap flex items-center",children:[r.jsx(a.r5K,{className:"mr-1",size:10}),"Mods"]}),(0,r.jsxs)("button",{onClick:()=>x("Unban Policy"),className:"px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-full whitespace-nowrap flex items-center",children:[r.jsx(a.wXW,{className:"mr-1",size:10}),"Unban"]}),(0,r.jsxs)("button",{onClick:()=>x("Refund Policy"),className:"px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-full whitespace-nowrap flex items-center",children:[r.jsx(a.l80,{className:"mr-1",size:10}),"Refund"]})]})}),r.jsx("div",{className:"p-3 bg-gray-800 border-t border-gray-700",children:(0,r.jsxs)("form",{onSubmit:e=>{e.preventDefault(),d.trim()&&f(d)},className:"flex",children:[r.jsx("input",{type:"text",value:d,onChange:e=>c(e.target.value),placeholder:"Ask me anything...",className:"flex-1 bg-gray-700 text-white px-3 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"}),r.jsx("button",{type:"submit",className:"bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-lg",children:"Send"})]})})]})})]})}},6868:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var s in t)Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}(t,{isNotFoundError:function(){return n},notFound:function(){return r}});let s="NEXT_NOT_FOUND";function r(){let e=Error(s);throw e.digest=s,e}function n(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===s}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9333:(e,t,s)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var s in t)Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}(t,{PARALLEL_ROUTE_DEFAULT_PATH:function(){return n},default:function(){return i}});let r=s(6868),n="next/dist/client/components/parallel-route-default.js";function i(){(0,r.notFound)()}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4253:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(5347).createProxy)(String.raw`D:\I.T Coding Work\Sans-Craft-Minecraft\my-app\src\app\Chatbot\page.tsx#default`)},3733:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>c,metadata:()=>d});var r=s(2051),n=s(2017),i=s.n(n),o=s(9005),a=s.n(o);s(5023);var l=s(4253);let d={title:"Sans-Craft Network",description:"Join Our Server IP: sanscraft.top"};function c({children:e}){return r.jsx("html",{lang:"en",children:(0,r.jsxs)("body",{className:`${i().variable} ${a().variable} antialiased`,children:[e,r.jsx(l.default,{})]})})}},5023:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[379,873],()=>s(7034));module.exports=r})();