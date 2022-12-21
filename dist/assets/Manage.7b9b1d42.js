import{_ as x,j as S,k as b,s as f,o as g,c as u,a as s,n as h,l as d,F as k,g as U,d as D,t as v,m as F,r as _,f as y,v as w,p as E,b as p,w as R,h as C}from"./index.e62c4b49.js";const I={name:"AppUpload",props:{addSong:{type:Function,required:!0}},data(){return{is_dragover:!1,uploads:[]}},methods:{upload(o){this.is_dragover=!1,(o.dataTransfer?[...o.dataTransfer.files]:[...o.target.files]).forEach(a=>{if(a.type!="audio/mpeg")return;if(!navigator.onLine){this.uploads.push({task:{},current_progress:100,name:a.name,variant:"bg-red-400",icon:"fas fa-times",text:"text-red-400"});return}const r=S.ref().child(`songs/${a.name}`).put(a),t=this.uploads.push({task:r,current_progress:0,name:a.name,variant:"bg-blue-400",icon:"fas fa-spinner fa-spin",text_class:""})-1;r.on("state_changed",i=>{const c=i.bytesTransferred/i.totalBytes*100;this.uploads[t].current_progress=c},i=>{this.uploads[t].variant="bg-red-400",this.uploads[t].icon="fas fa-times",this.uploads[t].text_class="text-red-400",console.log(i)},async()=>{const i={uid:b.currentUser.uid,display_name:b.currentUser.displayName,original_name:r.snapshot.ref.name,modified_name:r.snapshot.ref.name,genre:"",comment_count:0};i.url=await r.snapshot.ref.getDownloadURL();const l=await(await f.add(i)).get();this.addSong(l),this.uploads[t].variant="bg-green-400",this.uploads[t].icon="fas fa-check",this.uploads[t].text_class="text-green-400"})})},beforeUnmount(){this.uploads.forEach(o=>{o.task.cancel()})}}},N={class:"col-span-1"},$={class:"relative flex flex-col bg-white border border-gray-200 rounded"},q=s("div",{class:"px-6 pt-6 pb-5 font-bold border-b border-gray-200"},[s("span",{class:"card-title"},"Upload"),s("i",{class:"float-right text-2xl text-green-400 fas fa-upload"})],-1),B={class:"p-6"},T=s("h5",null,"Drop your files here",-1),M=[T],A=s("hr",{class:"my-6"},null,-1),G={class:"flex h-4 overflow-hidden bg-gray-200 rounded"};function L(o,e,a,m,n,r){return g(),u("div",N,[s("div",$,[q,s("div",B,[s("div",{class:h(["w-full px-10 py-20 text-center text-gray-400 transition duration-500 border border-gray-400 border-dashed rounded cursor-pointer hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid",{"bg-green-400 border-green-400 border-solid":n.is_dragover}]),onDrag:e[0]||(e[0]=d(()=>{},["prevent","stop"])),onDragstart:e[1]||(e[1]=d(()=>{},["prevent","stop"])),onDragend:e[2]||(e[2]=d(t=>n.is_dragover=!1,["prevent","stop"])),onDragover:e[3]||(e[3]=d(t=>n.is_dragover=!0,["prevent","stop"])),onDragenter:e[4]||(e[4]=d(t=>n.is_dragover=!0,["prevent","stop"])),onDragleave:e[5]||(e[5]=d(t=>n.is_dragover=!1,["prevent","stop"])),onDrop:e[6]||(e[6]=d(t=>r.upload(t),["prevent","stop"]))},M,34),s("input",{type:"file",multiple:"",onChange:e[7]||(e[7]=t=>r.upload(t))},null,32),A,(g(!0),u(k,null,U(n.uploads,t=>(g(),u("div",{class:"mb-4",key:t.name},[s("div",{class:h(["text-sm font-bold",t.text_class])},[s("i",{class:h(t.icon)},null,2),D(v(t.name),1)],2),s("div",G,[s("div",{class:h(["transition-all progress-bar",t.variant]),style:F({width:t.current_progress+"%"})},null,6)])]))),128))])])])}const V=x(I,[["render",L]]),P={name:"CompositionItem",props:{song:{type:Object,required:!0},updateSong:{type:Function,required:!0},index:{type:Number,required:!0},removeSong:{type:Function,required:!0},updateUnsavedFlag:{type:Function}},data(){return{showEdit:!1,compositionSchema:{modified_name:"required",genre:"alpha_spaces"},songData:{modified_name:this.song.original_name,genre:this.song.genre},in_submission:!1,show_alert:!1,alert_variant:"bg-blue-500",alert_msg:"Please wait! Updating song info."}},methods:{async submitEdit(o){this.show_alert=!0,this.in_submission=!0,this.alert_variant="bg-blue-500",this.alert_msg="Please wait! Updating song info.";try{await f.doc(this.song.docID).update(o)}catch{this.in_submission=!1,this.alert_variant="bg-red-500",this.alert_msg="An unexpected error occured. Please try again later.";return}this.updateSong(this.index,o),this.updateUnsavedFlag(!1),this.in_submission=!1,this.alert_variant="bg-green-500",this.alert_msg="Success!"},async deleteSong(){await S.ref().child(`songs/${this.song.original_name}`).delete(),await f.doc(this.song.docID).delete(),this.removeSong(this.index)}}},j={class:"p-3 mb-4 border border-gray-200 rounded"},z={class:"inline-block text-2xl font-bold"},O=s("i",{class:"fa fa-times"},null,-1),Y=[O],H=s("i",{class:"fa fa-pencil-alt"},null,-1),J=[H],K={class:"mb-3"},Q=s("label",{class:"inline-block mb-2"},"Song Title",-1),W={class:"mb-3"},X=s("label",{class:"inline-block mb-2"},"Genre",-1),Z=["disabled"],ee=["disabled"];function se(o,e,a,m,n,r){const t=_("vee-field"),i=_("ErrorMessage"),c=_("vee-form");return g(),u("div",j,[y(s("div",null,[s("h4",z,v(a.song.modified_name),1),s("button",{class:"float-right px-2 py-1 ml-1 text-sm text-white bg-red-600 rounded",onClick:e[0]||(e[0]=d((...l)=>r.deleteSong&&r.deleteSong(...l),["prevent"]))},Y),s("button",{class:"float-right px-2 py-1 ml-1 text-sm text-white bg-blue-600 rounded",onClick:e[1]||(e[1]=d(l=>n.showEdit=!n.showEdit,["prevent"]))},J)],512),[[w,!n.showEdit]]),y(s("div",null,[n.show_alert?(g(),u("div",{key:0,class:h(["p-4 mb-4 font-bold text-center text-white",n.alert_variant])},v(n.alert_msg),3)):E("",!0),p(c,{"validation-schema":n.compositionSchema,onSubmit:r.submitEdit,"initial-values":n.songData},{default:R(()=>[s("div",K,[Q,p(t,{name:"modified_name",type:"text",class:"block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded",placeholder:"Enter Song Title",onInput:e[2]||(e[2]=l=>a.updateUnsavedFlag(!0))}),p(i,{class:"text-red-600",name:"modified_name"})]),s("div",W,[X,p(t,{name:"genre",type:"text",class:"block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded",placeholder:"Enter Genre",onInput:e[3]||(e[3]=l=>a.updateUnsavedFlag(!0))}),p(i,{class:"text-red-600",name:"genre"})]),s("button",{type:"submit",class:"py-1.5 px-3 rounded text-white bg-green-600",disabled:n.in_submission}," Submit ",8,Z),s("button",{type:"button",class:"py-1.5 px-3 rounded text-white bg-gray-600",disabled:n.in_submission,onClick:e[4]||(e[4]=d(l=>n.showEdit=!1,["prevent"]))}," Go Back ",8,ee)]),_:1},8,["validation-schema","onSubmit","initial-values"])],512),[[w,n.showEdit]])])}const te=x(P,[["render",se]]),oe={name:"manage",components:{AppUpload:V,CompositionItem:te},data(){return{songs:[],unsavedFlag:!1}},async created(){(await f.where("uid","==",b.currentUser.uid).get()).forEach(this.addSong)},methods:{updateSong(o,e){this.songs[o].modified_name=e.modified_name,this.songs[o].genre=e.genre},removeSong(o){this.songs.splice(o,1)},addSong(o){const e={...o.data(),docID:o.id};this.songs.push(e)},updateUnsavedFlag(o){this.unsavedFlag=o}},beforeRouteLeave(o,e,a){if(!this.unsavedFlag)a();else{const m=window.confirm("You have unsaved changes. Are you sure you want to leave this page?");a(m)}}},ne={class:"container mx-auto mt-6"},re={class:"md:grid md:grid-cols-3 md:gap-4"},ae={class:"col-span-2"},ie={class:"relative flex flex-col bg-white border border-gray-200 rounded"},de=s("div",{class:"px-6 pt-6 pb-5 font-bold border-b border-gray-200"},[s("span",{class:"card-title"},"My SONGS"),s("i",{class:"float-right text-2xl text-green-400 fa fa-compact-disc"})],-1),le={class:"p-6"};function ge(o,e,a,m,n,r){const t=_("app-upload"),i=_("composition-item");return g(),u("section",ne,[s("div",re,[p(t,{addSong:r.addSong},null,8,["addSong"]),s("div",ae,[s("div",ie,[de,s("div",le,[(g(!0),u(k,null,U(n.songs,(c,l)=>(g(),C(i,{key:c.docID,song:c,updateSong:r.updateSong,index:l,removeSong:r.removeSong,updateUnsavedFlag:r.updateUnsavedFlag},null,8,["song","updateSong","index","removeSong","updateUnsavedFlag"]))),128))])])])])])}const ue=x(oe,[["render",ge]]);export{ue as default};