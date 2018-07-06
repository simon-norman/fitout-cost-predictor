webpackJsonp([1],{107:function(t,e){},116:function(t,e){},118:function(t,e){},122:function(t,e){},124:function(t,e){},129:function(t,e){},132:function(t,e){},141:function(t,e){},143:function(t,e){},146:function(t,e){},149:function(t,e){},150:function(t,e){},155:function(t,e){},162:function(t,e){},168:function(t,e){},171:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(64),o=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,function(){return r[t]})}(i);var a=n(172),u=n(39),s=u(o.a,a.a,!1,null,null,null);s.options.__file="src\\App.vue",e.default=s.exports},172:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("router-view",{attrs:{name:"alert"}}),t._v(" "),n("router-view")],1)},o=[];r._withStripped=!0;var i={render:r,staticRenderFns:o};e.a=i},173:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(31),i=r(o),a=n(174),u=r(a),s=n(175),l=r(s),c=n(285),f=r(c);i.default.use(u.default),e.default=new u.default({routes:[{path:"/",name:"FitoutCostPredictor",components:{default:l.default,alert:f.default}}]})},175:function(t,e,n){"use strict";function r(t){s||n(176)}Object.defineProperty(e,"__esModule",{value:!0});var o=n(65),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);var u=n(284),s=!1,l=n(39),c=r,f=l(i.a,u.a,!1,c,"data-v-5a60009c",null);f.options.__file="src\\components\\FitoutCostPredictor.vue",e.default=f.exports},176:function(t,e,n){var r=n(177);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(57)("672cff5e",r,!1,{})},177:function(t,e,n){e=t.exports=n(56)(!1),e.push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},235:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(236),i=r(o),a=n(84),u=r(a),s=n(240),l=r(s),c=n(244),f=r(c),d=n(256),p=r(d),v=n(264),_=r(v),m=function(t){function e(){(0,u.default)(this,e);var t=(0,f.default)(this,(e.__proto__||(0,i.default)(e)).call(this,{baseURL:"https://test-api-fitout-cost-predictor.herokuapp.com"}));return t.fitoutCostPredictionPath="/fitOutCostPrediction",t}return(0,p.default)(e,t),(0,l.default)(e,[{key:"getFitoutCostPrediction",value:function(t){return this.axios.post(this.fitoutCostPredictionPath,t)}}]),e}(_.default);e.default=m},264:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(84),i=r(o),a=n(265),u=r(a),s=function t(e){var n=e.baseURL,r=void 0===n?"":n;(0,i.default)(this,t),this.axios=u.default.create({baseURL:r,responseType:"json"})};e.default=s},284:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-content",[n("v-container",{attrs:{fluid:"","fill-height":""}},[n("v-layout",{attrs:{"justify-center":"","align-center":""}},[n("v-flex",{attrs:{xs12:"",s4:"",md3:""},on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.calculateCostPrediction()}}},[n("v-text-field",{attrs:{id:"floorAreaInput","error-messages":t.floorAreaErrors,type:"number",name:"floor-area-input",label:"Floor area (sq. m.)"},model:{value:t.fitoutPredictionParameters.floorArea,callback:function(e){t.$set(t.fitoutPredictionParameters,"floorArea",e)},expression:"fitoutPredictionParameters.floorArea"}}),t._v(" "),n("v-text-field",{attrs:{id:"floorHeightInput","error-messages":t.floorHeightErrors,type:"number",name:"floor-height-input",label:"Slab to slab floor height (m.)"},model:{value:t.fitoutPredictionParameters.floorHeight,callback:function(e){t.$set(t.fitoutPredictionParameters,"floorHeight",e)},expression:"fitoutPredictionParameters.floorHeight"}}),t._v(" "),n("v-btn",{staticClass:"secondary",attrs:{id:"calculateCostPrediction",block:""},on:{click:function(e){t.calculateCostPrediction()}}},[t._v("Calculate cost prediction")]),t._v(" "),n("div",{staticClass:"display-3",attrs:{id:"displayedCostPrediction"}},[t._v("Cost:  "+t._s(t.fitoutCostPrediction.cost))]),t._v(" "),n("div",{staticClass:"title",attrs:{id:"displayedPredictionAccuracy"}},[t._v("Accurate to "+t._s(t.fitoutCostPrediction.predictionAccuracy))])],1)],1)],1)],1)},o=[];r._withStripped=!0;var i={render:r,staticRenderFns:o};e.a=i},285:function(t,e,n){"use strict";function r(t){s||n(286)}Object.defineProperty(e,"__esModule",{value:!0});var o=n(93),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);var u=n(288),s=!1,l=n(39),c=r,f=l(i.a,u.a,!1,c,"data-v-81311d08",null);f.options.__file="src\\components\\Alert.vue",e.default=f.exports},286:function(t,e,n){var r=n(287);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(57)("e6b32b00",r,!1,{})},287:function(t,e,n){e=t.exports=n(56)(!1),e.push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},288:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;return(t._self._c||e)("v-alert",{attrs:{id:"errorAlert",transition:"scale-transition",type:"error",dismissible:""},model:{value:t.errorStatus,callback:function(e){t.errorStatus=e},expression:"errorStatus"}},[t._v("\n  "+t._s(t.getErrorMessage)+"\n")])},o=[];r._withStripped=!0;var i={render:r,staticRenderFns:o};e.a=i},289:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.store=void 0;var o=n(31),i=r(o),a=n(50),u=r(a),s=n(290),l=r(s);i.default.use(u.default);e.store=new u.default.Store({modules:{alerts:l.default}})},290:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={UPDATE_ERROR_MESSAGE:function(t,e){t.errorMessage=e},UPDATE_ERROR_STATUS:function(t,e){t.errorStatus=e}},o={getErrorMessage:function(t){return t.errorMessage},getErrorStatus:function(t){return t.errorStatus}},i={errorStatus:!1,errorMessage:""};e.default={state:i,mutations:r,getters:o}},291:function(t,e){},292:function(t,e){},37:function(t,e){},64:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"App",data:function(){return{clipped:!1,drawer:!0,fixed:!1,items:[{icon:"bubble_chart",title:"Inspire"}],miniVariant:!1,right:!0,rightDrawer:!1,title:"Vuetify.js"}}}},65:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(178),i=r(o),a=n(181),u=r(a),s=n(206),l=r(s),c=n(83),f=r(c),d=n(50),p=n(215),v=n(235),_=r(v),m=new _.default;e.default={name:"FitoutCostPredictor",data:function(){return{fitoutCostPrediction:{cost:"",predictionAccuracy:""},fitoutPredictionParameters:{floorArea:"",floorHeight:""},errorMessage:"So sorry, there's been an error - please try again later"}},validations:{fitoutPredictionParameters:{floorArea:{required:p.required,minValue:(0,p.minValue)(50)},floorHeight:{required:p.required,minValue:(0,p.minValue)(1)}}},computed:{floorAreaErrors:function(){var t=[];return this.$v.fitoutPredictionParameters.floorArea.$error&&t.push("Please provide a floor area (minimum 50 sq.m.)"),t},buildingVolume:function(){return parseFloat(this.fitoutPredictionParameters.floorArea)*parseFloat(this.fitoutPredictionParameters.floorHeight)},floorHeightErrors:function(){var t=[];return this.$v.fitoutPredictionParameters.floorHeight.$error&&t.push("Please provide a floor height (minimum 1 m.)"),t}},methods:(0,f.default)({},(0,d.mapMutations)(["UPDATE_ERROR_MESSAGE","UPDATE_ERROR_STATUS"]),{formatCost:function(t){return t<.999?this.formatCostInThousands(t):this.formatCostInMillions(t)},formatCostInThousands:function(t){return"£"+(1e3*(0,l.default)(t)).toPrecision(3)+"k"},formatCostInMillions:function(t){return"£"+(0,l.default)(t).toFixed(2)+"m"},handleError:function(){this.UPDATE_ERROR_MESSAGE(this.errorMessage),this.UPDATE_ERROR_STATUS(!0)},calculateCostPrediction:function(){var t=this;return(0,u.default)(i.default.mark(function e(){var n;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.$v.$touch(),t.$v.$error){e.next=17;break}return t.$v.$reset(),e.prev=3,e.next=6,m.getFitoutCostPrediction({volume:t.buildingVolume});case 6:n=e.sent,console.log(n),console.log("nada"),t.fitoutCostPrediction.cost=t.formatCost(n.data[0]),t.fitoutCostPrediction.predictionAccuracy=n.data.predictionAccuracy,e.next=17;break;case 13:e.prev=13,e.t0=e.catch(3),console.log(e.t0),t.handleError();case 17:case"end":return e.stop()}},e,t,[[3,13]])}))()}})}},93:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(83),o=function(t){return t&&t.__esModule?t:{default:t}}(r),i=n(50);e.default={name:"Alert",computed:(0,o.default)({},(0,i.mapGetters)(["getErrorMessage","getErrorStatus"]),{errorStatus:{get:function(){return this.getErrorStatus},set:function(t){this.UPDATE_ERROR_STATUS(t)}}}),methods:(0,o.default)({},(0,i.mapMutations)(["UPDATE_ERROR_STATUS"]))}},94:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(31),i=r(o),a=n(97),u=r(a),s=n(99),l=r(s),c=n(105),f=r(c),d=n(114),p=r(d),v=n(120),_=r(v),m=n(127),P=r(m),h=n(130),g=r(h),b=n(63),A=r(b),E=n(18),y=r(E),M=n(147),S=r(M),C=n(160),R=r(C),T=n(166),x=r(T),O=n(36),V=r(O),k=n(171),U=r(k),w=n(173),$=r(w),j=n(289);n(291),n(292),i.default.use(u.default),i.default.use(l.default,{components:{VApp:f.default,VAlert:p.default,VNavigationDrawer:_.default,VFooter:P.default,VList:g.default,VBtn:A.default,VIcon:y.default,VGrid:R.default,VTextField:S.default,VToolbar:x.default,transitions:V.default}}),i.default.config.productionTip=!1,new i.default({el:"#app",store:j.store,router:$.default,render:function(t){return t(U.default)}})}},[94]);
//# sourceMappingURL=app.dd2e22b5903a593ed1b1.js.map