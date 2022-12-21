import{_ as f,r as p,o as n,c as i,a as t,b as _,w as h,d as u,t as r,s as l,e as x,f as w,F as v,g as y,h as k}from"./index.c2c45c10.js";const S={props:["song"],name:"SongItem"},D={class:"flex items-center justify-between p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50"},$={class:"text-sm text-gray-500"},I={class:"text-lg text-gray-600"},P=["onClick"],C=t("i",{class:"text-gray-600 fa fa-comments"},null,-1);function E(o,e,s,d,g,b){const a=p("router-link");return n(),i("li",D,[t("div",null,[_(a,{to:{name:"song",params:{id:s.song.docID}},class:"block font-bold text-gray-600"},{default:h(()=>[u(r(s.song.modified_name),1)]),_:1},8,["to"]),t("span",$,r(s.song.display_name),1)]),t("div",I,[_(a,{custom:"",to:{name:"song",params:{id:s.song.docID},hash:"#comments"}},{default:h(({navigate:c})=>[t("span",{onClick:c,class:"comments"},[C,u(" "+r(s.song.comment_count),1)],8,P)]),_:1},8,["to"])])])}const q=f(S,[["render",E]]),B="/assets/img/hauz-vynil.webp",H={name:"Home",components:{SongItem:q},data(){return{songs:[],maxPerPage:3,pendingRequest:!1}},async created(){this.getSongs(),window.addEventListener("scroll",this.handleScroll)},beforeUnmount(){window.removeEventListener("scroll",this.handleScroll)},methods:{handleScroll(){const{scrollTop:o,offsetHeight:e}=document.documentElement,{innerHeight:s}=window;Math.round(o)+s===e&&this.getSongs()},async getSongs(){if(this.pendingRequest)return;this.pendingRequest=!0;let o;if(this.songs.length){const e=await l.doc(this.songs[this.songs.length-1].docID).get();o=await l.startAfter(e).limit(this.maxPerPage).get()}else o=await l.limit(this.maxPerPage).get();o.forEach(e=>{this.songs.push({docID:e.id,...e.data()})}),this.pendingRequest=!1}}},R=t("section",{class:"relative min-h-full py-20 mb-8 text-white center"},[t("div",{class:"absolute inset-0 w-full h-full bg-center bg-cover center introduction-bg",style:{"background-image":"url('/assets/img/hauz_party.jpg')"}}),t("img",{class:"relative block w-auto mx-auto opacity-80 rotating",src:B})],-1),V={class:"container mx-auto"},L={class:"relative flex flex-col bg-white border border-gray-200 rounded"},N={class:"px-6 pt-6 pb-5 font-bold border-b border-gray-200"},j=t("span",{class:"card-title"},"Songs",-1),z=[j],F={id:"playlist"};function O(o,e,s,d,g,b){const a=p("song-item"),c=x("icon");return n(),i("main",null,[R,t("section",V,[t("div",L,[w((n(),i("div",N,z)),[[c,"headphones-alt",void 0,{right:!0,black:!0}]]),t("ol",F,[(n(!0),i(v,null,y(g.songs,m=>(n(),k(a,{key:m.docID,song:m},null,8,["song"]))),128))])])])])}const W=f(H,[["render",O]]);export{W as default};
