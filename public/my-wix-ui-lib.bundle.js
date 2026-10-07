/* eslint-disable */
/* global globalThis, litPropertyMetadata */
var globalThis = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this;
if (!globalThis.litPropertyMetadata) {
  globalThis.litPropertyMetadata = new WeakMap();
}
var litPropertyMetadata = globalThis.litPropertyMetadata;
var mt=Object.defineProperty;var bt=(m,$,E)=>$ in m?mt(m,$,{enumerable:!0,configurable:!0,writable:!0,value:E}):m[$]=E;var v=(m,$,E)=>bt(m,typeof $!="symbol"?$+"":$,E);(function(m){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var We;const $=globalThis,E=$.ShadowRoot&&($.ShadyCSS===void 0||$.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,de=Symbol(),Ae=new WeakMap;let Se=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==de)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(E&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Ae.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Ae.set(t,e))}return e}toString(){return this.cssText}};const Qe=n=>new Se(typeof n=="string"?n:n+"",void 0,de),_=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((i,r,s)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+n[s+1],n[0]);return new Se(t,n,de)},Ve=(n,e)=>{if(E)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),r=$.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,n.appendChild(i)}},Ce=E?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Qe(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ke,defineProperty:qe,getOwnPropertyDescriptor:Ge,getOwnPropertyNames:Ze,getOwnPropertySymbols:Je,getPrototypeOf:Xe}=Object,T=globalThis,$e=T.trustedTypes,et=$e?$e.emptyScript:"",pe=T.reactiveElementPolyfillSupport,Q=(n,e)=>n,he={toAttribute(n,e){switch(e){case Boolean:n=n?et:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Ie=(n,e)=>!Ke(n,e),_e={attribute:!0,type:String,converter:he,reflect:!1,useDefault:!1,hasChanged:Ie};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),T.litPropertyMetadata??(T.litPropertyMetadata=new WeakMap);let H=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_e){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&qe(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=Ge(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:r,set(o){const a=r==null?void 0:r.call(this);s==null||s.call(this,o),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_e}static _$Ei(){if(this.hasOwnProperty(Q("elementProperties")))return;const e=Xe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Q("properties"))){const t=this.properties,i=[...Ze(t),...Je(t)];for(const r of i)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(Ce(r))}else e!==void 0&&t.push(Ce(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ve(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var s;const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:he).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){var s,o;const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const a=i.getPropertyOptions(r),c=typeof a.converter=="function"?{fromAttribute:a.converter}:((s=a.converter)==null?void 0:s.fromAttribute)!==void 0?a.converter:he;this._$Em=r;const g=c.fromAttribute(t,a.type);this[r]=g??((o=this._$Ej)==null?void 0:o.get(r))??g,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){var o;if(e!==void 0){const a=this.constructor;if(r===!1&&(s=this[e]),i??(i=a.getPropertyOptions(e)),!((i.hasChanged??Ie)(s,t)||i.useDefault&&i.reflect&&s===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),s!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[s,o]of r){const{wrapped:a}=o,c=this[s];a!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,o,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(r=>{var s;return(s=r.hostUpdate)==null?void 0:s.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};H.elementStyles=[],H.shadowRootOptions={mode:"open"},H[Q("elementProperties")]=new Map,H[Q("finalized")]=new Map,pe==null||pe({ReactiveElement:H}),(T.reactiveElementVersions??(T.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=globalThis,Be=n=>n,ie=V.trustedTypes,Pe=ie?ie.createPolicy("lit-html",{createHTML:n=>n}):void 0,Ee="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,Te="?"+R,tt=`<${Te}>`,L=document,K=()=>L.createComment(""),q=n=>n===null||typeof n!="object"&&typeof n!="function",ge=Array.isArray,it=n=>ge(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",ue=`[ 	
\f\r]`,G=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Re=/-->/g,ze=/>/g,F=RegExp(`>|${ue}(?:([^\\s"'>=/]+)(${ue}*=${ue}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ue=/'/g,Le=/"/g,Fe=/^(?:script|style|textarea|title)$/i,rt=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),l=rt(1),O=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),De=new WeakMap,D=L.createTreeWalker(L,129);function Me(n,e){if(!ge(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Pe!==void 0?Pe.createHTML(e):e}const st=(n,e)=>{const t=n.length-1,i=[];let r,s=e===2?"<svg>":e===3?"<math>":"",o=G;for(let a=0;a<t;a++){const c=n[a];let g,u,p=-1,b=0;for(;b<c.length&&(o.lastIndex=b,u=o.exec(c),u!==null);)b=o.lastIndex,o===G?u[1]==="!--"?o=Re:u[1]!==void 0?o=ze:u[2]!==void 0?(Fe.test(u[2])&&(r=RegExp("</"+u[2],"g")),o=F):u[3]!==void 0&&(o=F):o===F?u[0]===">"?(o=r??G,p=-1):u[1]===void 0?p=-2:(p=o.lastIndex-u[2].length,g=u[1],o=u[3]===void 0?F:u[3]==='"'?Le:Ue):o===Le||o===Ue?o=F:o===Re||o===ze?o=G:(o=F,r=void 0);const h=o===F&&n[a+1].startsWith("/>")?" ":"";s+=o===G?c+tt:p>=0?(i.push(g),c.slice(0,p)+Ee+c.slice(p)+R+h):c+R+(p===-2?a:h)}return[Me(n,s+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class Z{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,o=0;const a=e.length-1,c=this.parts,[g,u]=st(e,t);if(this.el=Z.createElement(g,i),D.currentNode=this.el.content,t===2||t===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=D.nextNode())!==null&&c.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(const p of r.getAttributeNames())if(p.endsWith(Ee)){const b=u[o++],h=r.getAttribute(p).split(R),y=/([.?@])?(.*)/.exec(b);c.push({type:1,index:s,name:y[2],strings:h,ctor:y[1]==="."?nt:y[1]==="?"?at:y[1]==="@"?lt:re}),r.removeAttribute(p)}else p.startsWith(R)&&(c.push({type:6,index:s}),r.removeAttribute(p));if(Fe.test(r.tagName)){const p=r.textContent.split(R),b=p.length-1;if(b>0){r.textContent=ie?ie.emptyScript:"";for(let h=0;h<b;h++)r.append(p[h],K()),D.nextNode(),c.push({type:2,index:++s});r.append(p[b],K())}}}else if(r.nodeType===8)if(r.data===Te)c.push({type:2,index:s});else{let p=-1;for(;(p=r.data.indexOf(R,p+1))!==-1;)c.push({type:7,index:s}),p+=R.length-1}s++}}static createElement(e,t){const i=L.createElement("template");return i.innerHTML=e,i}}function Y(n,e,t=n,i){var o,a;if(e===O)return e;let r=i!==void 0?(o=t._$Co)==null?void 0:o[i]:t._$Cl;const s=q(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==s&&((a=r==null?void 0:r._$AO)==null||a.call(r,!1),s===void 0?r=void 0:(r=new s(n),r._$AT(n,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=r:t._$Cl=r),r!==void 0&&(e=Y(n,r._$AS(n,e.values),r,i)),e}class ot{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=((e==null?void 0:e.creationScope)??L).importNode(t,!0);D.currentNode=r;let s=D.nextNode(),o=0,a=0,c=i[0];for(;c!==void 0;){if(o===c.index){let g;c.type===2?g=new J(s,s.nextSibling,this,e):c.type===1?g=new c.ctor(s,c.name,c.strings,this,e):c.type===6&&(g=new ct(s,this,e)),this._$AV.push(g),c=i[++a]}o!==(c==null?void 0:c.index)&&(s=D.nextNode(),o++)}return D.currentNode=L,r}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class J{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),q(e)?e===w||e==null||e===""?(this._$AH!==w&&this._$AR(),this._$AH=w):e!==this._$AH&&e!==O&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):it(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==w&&q(this._$AH)?this._$AA.nextSibling.data=e:this.T(L.createTextNode(e)),this._$AH=e}$(e){var s;const{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Z.createElement(Me(i.h,i.h[0]),this.options)),i);if(((s=this._$AH)==null?void 0:s._$AD)===r)this._$AH.p(t);else{const o=new ot(r,this),a=o.u(this.options);o.p(t),this.T(a),this._$AH=o}}_$AC(e){let t=De.get(e.strings);return t===void 0&&De.set(e.strings,t=new Z(e)),t}k(e){ge(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new J(this.O(K()),this.O(K()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const r=Be(e).nextSibling;Be(e).remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class re{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=w,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=w}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(s===void 0)e=Y(this,e,t,0),o=!q(e)||e!==this._$AH&&e!==O,o&&(this._$AH=e);else{const a=e;let c,g;for(e=s[0],c=0;c<s.length-1;c++)g=Y(this,a[i+c],t,c),g===O&&(g=this._$AH[c]),o||(o=!q(g)||g!==this._$AH[c]),g===w?e=w:e!==w&&(e+=(g??"")+s[c+1]),this._$AH[c]=g}o&&!r&&this.j(e)}j(e){e===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class nt extends re{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===w?void 0:e}}class at extends re{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==w)}}class lt extends re{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=Y(this,e,t,0)??w)===O)return;const i=this._$AH,r=e===w&&i!==w||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==w&&(i===w||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class ct{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}}const fe=V.litHtmlPolyfillSupport;fe==null||fe(Z,J),(V.litHtmlVersions??(V.litHtmlVersions=[])).push("3.3.3");const dt=(n,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let r=i._$litPart$;if(r===void 0){const s=(t==null?void 0:t.renderBefore)??null;i._$litPart$=r=new J(e.insertBefore(K(),s),s,void 0,t??{})}return r._$AI(n),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=globalThis;class C extends H{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=dt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return O}}C._$litElement$=!0,C.finalized=!0,(We=M.litElementHydrateSupport)==null||We.call(M,{LitElement:C});const me=M.litElementPolyfillSupport;me==null||me({LitElement:C}),(M.litElementVersions??(M.litElementVersions=[])).push("4.2.2");function S(n,e){if(!(typeof window>"u"||!window.customElements||window.customElements.get(n)))try{window.customElements.define(n,e)}catch(i){if(i.name==="NotSupportedError"&&i.message.includes("constructor")){class r extends e{}window.customElements.define(n,r)}else console.warn(`[my-wix-ui-lib] Không thể đăng ký ${n}:`,i)}}function B(n,e,t={}){const i=new CustomEvent(e,{detail:t,bubbles:!0,composed:!0,cancelable:!0});return n.dispatchEvent(i),i}function z(n){if(n==null||n==="")return"";if(typeof n=="string"){const e=Number(n.replace(/[^\d]/g,""));!isNaN(e)&&e>0&&(n=e)}return isNaN(n)||Number(n)<=0?"":new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",maximumFractionDigits:0}).format(n)}function be(n){if(!n||typeof n!="object")return 0;const e=[n.minPrice,n.price,n.min_price,n.regularPrice,n.unitPrice,n.gia,n.donGia,n.cost,n.maxPrice,n.max_price];for(const t of e)if(t!=null&&t!==""){if(typeof t=="number"&&t>0)return t;if(typeof t=="string"){const i=Number(t.replace(/[^\d]/g,""));if(!isNaN(i)&&i>0)return i}}return 0}function xe(n){if(!n||typeof n!="object")return{price:0,comparePrice:null,discountPercent:null};const e=a=>{if(a==null||a==="")return 0;if(typeof a=="number")return isNaN(a)?0:a;if(typeof a=="string"){const c=Number(a.replace(/[^\d]/g,""));return isNaN(c)?0:c}return 0},t=e(n.maxPrice)||e(n.max_price)||e(n.compareAtPrice)||e(n.regularPrice)||e(n.price),i=e(n.minPrice)||e(n.min_price)||e(n.discountedPrice);let r=0,s=null,o=null;return t>0&&i>0&&t>i?(r=i,s=t,o=Math.round((t-i)/t*100)):(r=t||i||e(n.price)||e(n.unitPrice),s=null,o=null),(!r||r<=0)&&typeof be=="function"&&(r=be(n)),{price:r,comparePrice:s,discountPercent:o}}function pt(n){if(!n||typeof n!="object")return 0;const{price:e}=xe(n);if(typeof e=="number"&&!isNaN(e)&&e>0)return e;const t=be(n);return typeof t=="number"&&!isNaN(t)&&t>0?t:0}function ye(n,e=null){if(!n)return e;if(typeof n=="object")return n;try{return JSON.parse(n)}catch{return e}}function P(n,e=""){if(!n||(typeof n=="object"&&n&&(n=n.src||n.url||e),typeof n!="string"))return e;const t=n.trim();if(!t)return e;if(t.startsWith("wix:image://")){const i=t.split("/");if(i.length>=4)return`https://static.wixstatic.com/media/${i[3].split("#")[0]}`}return t}function ve(n){if(!n)return[];if(typeof n=="string"){const e=n.trim();if(e.startsWith("[")||e.startsWith("{"))try{const t=JSON.parse(e);t&&(n=t)}catch{}}return Array.isArray(n)?n.map(e=>e?typeof e=="object"?e.src||e.url||"":String(e):"").filter(Boolean):typeof n!="string"?[]:n.split(";").map(e=>e.trim()).filter(Boolean)}function Ne(n){return typeof n!="string"?"":n.replace(/&quot;/g,'"').replace(/&#34;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">")}const A={fromAttribute(n){if(!n)return[];if(typeof n=="object")return Array.isArray(n)?n:[n];try{let e=typeof n=="string"?Ne(n.trim()):"";if(e.startsWith("[")||e.startsWith("{")){const t=JSON.parse(e);return Array.isArray(t)?t:[t]}if(e.includes(">")||e.includes(",")){const t=e.includes(">")?">":",";return e.split(t).map(i=>i.trim()).filter(Boolean).map((i,r,s)=>({label:i,url:r===0?"/":r===s.length-1?"#":""}))}return e?[{label:e,url:"#"}]:[]}catch(e){return console.warn("[jsonArrayConverter] Lỗi parse JSON:",e,n),[]}},toAttribute(n){return JSON.stringify(n)}},I={fromAttribute(n){if(!n)return null;if(typeof n=="object")return n;try{let e=typeof n=="string"?Ne(n.trim()):"";return JSON.parse(e)}catch(e){return console.warn("[jsonObjectConverter] Lỗi parse JSON:",e,n),null}},toAttribute(n){return JSON.stringify(n)}},we={fromAttribute(n){if(n==null)return!1;if(typeof n=="boolean")return n;const e=String(n).trim().toLowerCase();return!(e==="false"||e==="0"||e===""||e==="null"||e==="undefined")},toAttribute(n){return n?"true":null}};function ht(n){if(!n)return"#cccccc";const e=n.toLowerCase();return e.includes("nhiều màu")?"linear-gradient(135deg, #e53935, #fb8c00, #43a047, #1e88e5)":e.includes("trong suốt")?"linear-gradient(135deg, #ffffff 40%, #e0e0e0 60%)":e.includes("cherry blossom")||e.includes("anh đào")?"#e8a8b8":e.includes("đỏ cherry")?"#b51a2b":e.includes("grenadine")?"#6b1d28":e.includes("bordeaux")?"#58111a":e.includes("đỏ cam")?"#d34125":e.includes("đỏ")?"#c8102e":e.includes("basil")?"#315438":e.includes("sage")?"#879b83":e.includes("lime")?"#84b82c":e.includes("lục")?"#2d7a3a":e.includes("dark blue")?"#1b3558":e.includes("hoàng gia")?"#1f487e":e.includes("lamer")||e.includes("la mer")?"#2b767a":e.includes("xanh")?"#1d5f8a":e.includes("truffle")||e.includes("trufle")?"#ece8db":e.includes("trắng")?"#f8f8f8":e.includes("citron")?"#f1b82d":e.includes("gold")?"#d4af37":e.includes("vàng hồng")?"#d49a89":e.includes("vàng")?"#f1b82d":e.includes("chocolate")?"#4a2c20":e.includes("nâu")?"#5a3d2e":e.includes("granada")||e.includes("cinnamon")||e.includes("quế")||e.includes("cam")?"#d65a27":e.includes("macaron")?"#eec0c8":e.includes("sorbet")?"#f28599":e.includes("hồng")?"#f098aa":e.includes("kem")?"#f3e5ab":e.includes("đen")?"#222222":e.includes("bạc")||e.includes("inox")||e.includes("bề mặt bóng")?"#c0c0c0":e.includes("xám")?"#808080":"#cccccc"}const se={vi:{resultsCount:n=>`${n} sản phẩm`,sortBy:"Sắp xếp theo",sortPriceAsc:"Giá: Thấp đến Cao",sortPriceDesc:"Giá: Cao đến Thấp",sortTitleAsc:"Tên: A đến Z",filterCategory:"Danh mục",filterBrand:"Thương hiệu",filterSeries:"Dòng sản phẩm",filterColor:"Màu sắc",filterPrice:"Mức giá",clearAll:"Xóa tất cả",emptyProducts:"Không có sản phẩm nào phù hợp với bộ lọc.",showingItems:(n,e)=>`Đang hiển thị ${n} trên tổng số ${e} sản phẩm`,loadMore:"XEM THÊM SẢN PHẨM",searchFilters:"BỘ LỌC TÌM KIẾM",clear:"Xóa",categories:"DANH MỤC",allCategories:"Tất cả danh mục",noCategories:"Không có danh mục nào",brands:"THƯƠNG HIỆU",allBrands:"Tất cả thương hiệu",series:"DÒNG SẢN PHẨM",allSeries:"Tất cả dòng sản phẩm",noSeries:"Không có dòng sản phẩm nào",color:"MÀU SẮC",allColors:"Tất cả màu sắc",noColors:"Không có màu sắc nào",priceRange:"KHOẢNG GIÁ",allPrices:"Tất cả mức giá",priceUnder1m:"Dưới 1.000.000 ₫",price1mTo3m:"1.000.000 ₫ - 3.000.000 ₫",price3mTo5m:"3.000.000 ₫ - 5.000.000 ₫",priceOver5m:"Trên 5.000.000 ₫",reset:"Thiết lập lại",viewResults:n=>`Xem ${n} sản phẩm`,close:"Đóng",productFilterAria:"Bộ lọc sản phẩm",contactUs:"Liên hệ",noImage:"Chưa có ảnh",prevImage:"Ảnh trước",nextImage:"Ảnh sau",seriesLabel:n=>`Dòng sản phẩm: ${n}`,reviewsCount:n=>`(${n} Đánh giá)`,highlights:"Đặc điểm nổi bật:",descriptionTab:"MÔ TẢ SẢN PHẨM",specsTab:"THÔNG SỐ KỸ THUẬT",instructionsTab:"HƯỚNG DẪN SỬ DỤNG & BẢO QUẢN",noDescription:"Chưa có thông tin mô tả cho sản phẩm này.",noSpecs:"Chưa có thông số kỹ thuật.",defaultInstructions:["Vệ sinh bằng tay với nước ấm và xà phòng nhẹ sau khi sử dụng.","Lau khô hoàn toàn trước khi cất giữ.","Bảo quản nơi khô ráo, thoáng mát."],relatedProducts:"SẢN PHẨM LIÊN QUAN",toolbarResults:n=>`${n} KẾT QUẢ`,allBrandsToolbar:"Tất cả Thương hiệu",allCategoriesToolbar:"Tất cả Danh mục",sortDefault:"Sắp xếp: Mặc định",clearFilters:"Xóa bộ lọc",brandSectionTitle:"THƯƠNG HIỆU",seriesSectionTitle:"DÒNG SẢN PHẨM",seriesTag:"Dòng sản phẩm",scrollLeft:"Cuộn sang trái",scrollRight:"Cuộn sang phải",home:"TRANG CHỦ",products:"SẢN PHẨM",brandsBreadcrumb:"THƯƠNG HIỆU",about:"GIỚI THIỆU",news:"TIN TỨC"},en:{resultsCount:n=>`${n} Results`,sortBy:"Sort by",sortPriceAsc:"Price: Low to High",sortPriceDesc:"Price: High to Low",sortTitleAsc:"Name: A to Z",filterCategory:"Category",filterBrand:"Brand",filterSeries:"Series",filterColor:"Color",filterPrice:"Price",clearAll:"Clear All",emptyProducts:"No products found matching your filters.",showingItems:(n,e)=>`Showing ${n} of ${e} items`,loadMore:"LOAD MORE",searchFilters:"SEARCH FILTERS",clear:"Clear",categories:"CATEGORIES",allCategories:"All Categories",noCategories:"No categories found",brands:"BRANDS",allBrands:"All Brands",series:"SERIES",allSeries:"All Series",noSeries:"No series found",color:"COLOR",allColors:"All Colors",noColors:"No colors found",priceRange:"PRICE RANGE",allPrices:"All Prices",priceUnder1m:"Under 1,000,000 ₫",price1mTo3m:"1,000,000 ₫ - 3,000,000 ₫",price3mTo5m:"3,000,000 ₫ - 5,000,000 ₫",priceOver5m:"Over 5,000,000 ₫",reset:"Reset",viewResults:n=>`View ${n} products`,close:"Close",productFilterAria:"Product filters",contactUs:"Contact Us",noImage:"No image available",prevImage:"Previous image",nextImage:"Next image",seriesLabel:n=>`Series: ${n}`,reviewsCount:n=>`(${n} Reviews)`,highlights:"Highlights:",descriptionTab:"PRODUCT DESCRIPTION",specsTab:"SPECIFICATIONS",instructionsTab:"INSTRUCTIONS & CARE",noDescription:"No description available for this product.",noSpecs:"No specifications available.",defaultInstructions:["Hand wash with warm water and mild soap after use.","Dry completely before storage.","Store in a cool, dry place."],relatedProducts:"RELATED PRODUCTS",toolbarResults:n=>`${n} RESULTS`,allBrandsToolbar:"All Brands",allCategoriesToolbar:"All Categories",sortDefault:"Sort: Default",clearFilters:"Clear Filters",brandSectionTitle:"BRANDS",seriesSectionTitle:"SERIES",seriesTag:"Series",scrollLeft:"Scroll left",scrollRight:"Scroll right",home:"HOME",products:"PRODUCTS",brandsBreadcrumb:"BRANDS",about:"ABOUT US",news:"NEWS"}};function d(n,e="vi",...t){let i="vi";e&&typeof e=="string"?i=e.toLowerCase().startsWith("en")?"en":"vi":typeof document<"u"&&document.documentElement&&document.documentElement.lang&&(i=document.documentElement.lang.toLowerCase().startsWith("en")?"en":"vi");const r=se[i]||se.vi,s=r[n]!==void 0?r[n]:se.vi[n];return typeof s=="function"?s(...t):s!==void 0?s:n}class oe extends C{constructor(){super(),this.items=null,this.defaultItems="",this.current="",this.lang="vi",this.loading=!1}connectedCallback(){super.connectedCallback(),this._checkContext()}firstUpdated(e){super.firstUpdated(e),this._checkContext(),setTimeout(()=>this._checkContext(),200),setTimeout(()=>this._checkContext(),600)}_checkContext(){if(!this.items||!this.items.length){const e=this._getEffectiveItems();e&&e.length>0&&(this.items=e,this.loading=!1,this.requestUpdate())}}_getEffectiveItems(){if(this.items&&Array.isArray(this.items)&&this.items.length>0)return this.items;if(this.defaultItems){const e=A.fromAttribute(this.defaultItems);if(e&&e.length>0)return e}if(this.current)return[{label:"TRANG CHỦ",url:"/"},{label:this.current,url:"#"}];if(typeof document<"u"){try{if(document.querySelector("wx-store-locator")||document.querySelector("[data-locator]"))return[{label:"TRANG CHỦ",url:"/"},{label:"CỬA HÀNG",url:"/stores"}]}catch{}try{const e=(window.location.href||"")+" "+(window.location.pathname||"")+" "+(document.title||"");if(/store|cua-hang|cửa hàng/i.test(e))return[{label:"TRANG CHỦ",url:"/"},{label:"CỬA HÀNG",url:"/stores"}]}catch{}}return null}_formatLabel(e){if(!e||typeof e!="string")return"";const t=e.trim().toUpperCase();return t==="HOME"||t==="TRANG CHỦ"?d("home",this.lang):t==="PRODUCTS"||t==="SẢN PHẨM"?d("products",this.lang):t==="BRANDS"||t==="THƯƠNG HIỆU"?d("brandsBreadcrumb",this.lang):t==="ABOUT"||t==="ABOUT US"||t==="GIỚI THIỆU"||t==="VỀ CHÚNG TÔI"?d("about",this.lang):t==="BLOG"||t==="NEWS"||t==="BÀI VIẾT"||t==="TIN TỨC"?d("news",this.lang):e}_resolveUrl(e){if(!e||e==="#"||e==="")return"#";if(/^https?:\/\//i.test(e))return e;if(typeof window<"u"&&window.location){const t=window.location.hostname||"",i=window.location.pathname||"";if(t.includes("wixstudio.com")||t.includes("wixsite.com")){const r=i.split("/").filter(Boolean);if(r.length>0){const s="/"+r[0];if(e==="/")return s+"/";if(!e.startsWith(s))return e.startsWith("/")?`${s}${e}`:`${s}/${e}`}}}return e}_handleClick(e,t,i,r=this.items){if(r&&i===r.length-1)return;e.preventDefault(),B(this,"breadcrumb-click",{item:t,index:i});const s=t&&(t.url||t.link||t.href);if(!s||s==="#"||s==="")return;const o=this._resolveUrl(s);setTimeout(()=>{try{if(typeof window<"u"&&window.location){const a=(window.location.pathname||"").replace(/\/$/,""),c=o.replace(/\/$/,"");a!==c&&(window.location.href=o)}}catch{}},150)}render(){const e=this._getEffectiveItems();if((this.loading===!0||this.loading==="true"||!e&&this.items===null&&this.loading!==!1)&&!e)return l`
        <nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 8px;">
          <div class="skeleton-box" style="width: 70px; height: 14px;"></div>
          <span class="separator" aria-hidden="true">&#x203A;</span>
          <div class="skeleton-box" style="width: 100px; height: 14px;"></div>
        </nav>
      `;const r=e||[];return r.length?l`
      <nav aria-label="Breadcrumb">
        ${r.map((s,o)=>{const a=o===0,c=o===r.length-1,g=typeof s=="string"?s:s.label||s.title,u=this._formatLabel(g);return l`
            ${o>0?l`<span class="separator" aria-hidden="true">&#x203A;</span>`:""}
            <button
              class="crumb-btn ${a?"first":""} ${c?"active":""}"
              ?disabled="${c}"
              @click="${p=>this._handleClick(p,s,o,r)}"
              aria-current="${c?"page":"false"}"
            >
              ${u}
            </button>
          `})}
      </nav>
    `:l``}}v(oe,"properties",{items:{type:Array,converter:A},defaultItems:{type:String,attribute:"default-items"},current:{type:String},lang:{type:String},loading:{type:Boolean,converter:we}}),v(oe,"styles",_`
    :host {
      display: block;
      font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      padding: 0;
      margin: 0;
      background: transparent;
    }

    :host([hidden]) {
      display: none !important;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    button, input, select, textarea, a {
      font-family: inherit;
    }

    @keyframes wx-shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    .skeleton-box {
      background: linear-gradient(90deg, #f2f2f2 25%, #e8e8e8 50%, #f2f2f2 75%);
      background-size: 200% 100%;
      animation: wx-shimmer 1.5s infinite ease-in-out;
      border-radius: 4px;
    }

    nav {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }

    .crumb-btn {
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      font-family: inherit;
      font-size: 13px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #555555;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      transition: color 0.15s ease;
      font-weight: 500;
    }

    .crumb-btn:hover {
      color: #111111;
    }

    .crumb-btn.first {
      font-weight: 800;
      color: #111111;
    }

    .crumb-btn.active {
      color: #222222;
      font-weight: 500;
      cursor: default;
      pointer-events: none;
    }

    .separator {
      font-size: 13px;
      color: #999999;
      user-select: none;
      display: inline-flex;
      align-items: center;
    }
  `),S("wx-breadcrumb",oe);class X extends C{constructor(){super(),this.items=null,this.categories=null,this.data=null,this.selectedId="",this.lang="vi",this.loading=!1,this._progressLeft=0,this._progressWidth=30}firstUpdated(){this._track=this.shadowRoot.querySelector(".track"),this._checkScroll()}updated(e){(e.has("items")||e.has("categories")||e.has("data"))&&this._checkScroll()}_checkScroll(){const e=this.categories||this.data||this.items||[];this._track&&e.length>=6&&(this._track.addEventListener("scroll",()=>this._updateProgress()),this._updateProgress())}_updateProgress(){if(!this._track)return;const{scrollLeft:e,scrollWidth:t,clientWidth:i}=this._track,r=t-i;if(r<=0)this._progressWidth=100,this._progressLeft=0;else{this._progressWidth=Math.max(15,i/t*100);const o=100-this._progressWidth;this._progressLeft=e/r*o}const s=this.shadowRoot.querySelector(".progress-thumb");s&&(s.style.width=`${this._progressWidth}%`,s.style.left=`${this._progressLeft}%`)}_scroll(e){if(!this._track)return;const t=300*e;this._track.scrollBy({left:t,behavior:"smooth"})}_selectItem(e){this.selectedId=e._id||e.ID||e.id||e.slug,B(this,"category-select",{category:e})}render(){const e=this.categories||this.data||this.items,t=e!=null,i=Array.isArray(e)?e:[];if(t&&i.length===0&&!this.loading)return this.removeAttribute("has-items"),l``;if(!i.length)return l`
        <div class="carousel-wrapper">
          <div class="track static-grid" role="status" aria-label="Loading categories">
            ${[1,2,3,4,5].map(()=>l`
              <div class="skeleton-card">
                <div class="skeleton-box skeleton-img"></div>
                <div class="skeleton-box skeleton-label"></div>
              </div>
            `)}
          </div>
        </div>
      `;this.setAttribute("has-items","");const r=i.length>=6;return l`
      <div class="carousel-wrapper">
        <div class="track ${r?"":"static-grid"}" role="list">
          ${i.map(s=>{const o=s._id||s.ID||s.id||s.slug,a=this.selectedId===o,c=s.title||s.name||"",g=s.description||s.subtitle||s.desc||"",u=s.image||s.mainImage||s.bannerImage,p=u?P(u):"";return l`
              <button
                class="item-card ${a?"active":""}"
                @click="${()=>this._selectItem(s)}"
                role="listitem"
              >
                <div class="image-box">
                  ${p?l`
                        <img
                          src="${p}"
                          alt="${c}"
                          loading="lazy"
                          @error="${b=>{b.target.style.display="none";const h=b.target.parentElement.querySelector(".placeholder-box");h&&(h.style.display="flex")}}"
                        />
                        <div class="placeholder-box" style="display: none;">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                          <span>${d("noImage",this.lang)}</span>
                        </div>
                      `:l`
                        <div class="placeholder-box">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                          <span>${d("noImage",this.lang)}</span>
                        </div>
                      `}
                </div>
                <span class="item-label">${c}</span>
                ${g?l`<span class="item-description">${g}</span>`:""}
              </button>
            `})}
        </div>

        ${r?l`
              <div class="controls-row">
                <button class="nav-arrow-btn" @click="${()=>this._scroll(-1)}" aria-label="${d("scrollLeft",this.lang)}">&#x2039;</button>
                <div class="progress-track">
                  <div class="progress-thumb"></div>
                </div>
                <button class="nav-arrow-btn" @click="${()=>this._scroll(1)}" aria-label="${d("scrollRight",this.lang)}">&#x203A;</button>
              </div>
            `:""}
      </div>
    `}}v(X,"properties",{items:{type:Array,converter:A},categories:{type:Array,converter:A},data:{type:Array,converter:A},selectedId:{type:String},lang:{type:String},loading:{type:Boolean}}),v(X,"styles",_`
    :host {
      display: block;
      font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      background: #ffffff;
      padding: 0;
      width: 100%;
      min-height: 0;
      box-sizing: border-box;
    }

    :host([hidden]) {
      display: none !important;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    button, input, select, textarea {
      font-family: inherit;
    }

    @keyframes wx-shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    @keyframes wx-fade-in {
      from {
        opacity: 0;
        transform: translateY(3px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .carousel-wrapper {
      position: relative;
      width: 100%;
    }

    /* Carousel track khi >= 6 items */
    .track {
      display: flex;
      gap: 28px;
      overflow-x: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 4px 0 8px 0;
      animation: wx-fade-in 0.25s ease-out;
    }

    /* Skeleton Loading Cards */
    .skeleton-card {
      flex: 0 0 188px;
      width: 188px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      box-sizing: border-box;
    }

    .skeleton-box {
      background: linear-gradient(90deg, #f2f2f2 25%, #e8e8e8 50%, #f2f2f2 75%);
      background-size: 200% 100%;
      animation: wx-shimmer 1.5s infinite ease-in-out;
      border-radius: 4px;
    }

    .skeleton-img {
      width: 188px;
      height: 188px;
    }

    .skeleton-label {
      width: 110px;
      height: 16px;
    }

    @media (max-width: 600px) {
      .skeleton-card {
        flex: 0 0 145px;
        width: 145px;
      }
      .skeleton-img {
        width: 145px;
        height: 145px;
      }
      .skeleton-label {
        width: 80px;
        height: 14px;
      }
    }

    .track::-webkit-scrollbar {
      display: none;
    }

    /* Khi < 6 items: Bỏ carousel, xếp cân đối */
    .track.static-grid {
      overflow-x: visible;
      flex-wrap: wrap;
      justify-content: center;
      gap: 28px;
      padding: 4px 0 0 0;
    }

    .item-card {
      font-family: inherit;
      flex: 0 0 188px;
      width: 188px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
      color: inherit;
      text-decoration: none;
    }

    .item-card.active .item-label {
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    .image-box {
      width: 188px;
      height: 188px;
      aspect-ratio: 1 / 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
      overflow: hidden;
      background: transparent;
      position: relative;
    }

    .image-box img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      transition: transform 0.35s cubic-bezier(0.2, 0, 0.2, 1);
    }

    .item-card:hover .image-box img {
      transform: scale(1.06);
    }

    .item-card:hover .item-label {
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    .placeholder-box {
      width: 100%;
      height: 100%;
      background: #f5f5f5;
      border: 1px dashed #d5d5d5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #999999;
      font-size: 11px;
      gap: 4px;
    }

    .item-label {
      font-family: inherit;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #111111;
      margin: 0;
      line-height: 1.35;
      text-align: center;
      transition: color 0.2s ease, text-decoration 0.2s ease;
    }

    .item-description {
      font-family: inherit;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: normal;
      text-transform: none;
      color: #666666;
      margin: 4px 0 0 0;
      line-height: 1.4;
      text-align: center;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      transition: color 0.2s ease;
    }

    .item-card:hover .item-description {
      color: #333333;
    }

    @media (max-width: 600px) {
      .track, .track.static-grid {
        gap: 16px;
      }
      .item-card {
        flex: 0 0 145px;
        width: 145px;
      }
      .image-box {
        width: 145px;
        height: 145px;
      }
      .item-label {
        font-size: 13px;
      }
      .item-description {
        font-size: 11px;
        margin-top: 2px;
      }
    }

    /* Controls row: chỉ hiện khi >= 6 items */
    .controls-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 12px;
      padding: 0 4px;
    }

    .nav-arrow-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid #e0e0e0;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #555555;
      font-size: 13px;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .nav-arrow-btn:hover {
      border-color: #111111;
      color: #111111;
    }

    .progress-track {
      flex: 1;
      height: 2px;
      background: #dcdcdc;
      position: relative;
      border-radius: 1px;
      overflow: hidden;
    }

    .progress-thumb {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: #111111;
      width: 30%;
      transition: left 0.2s ease, width 0.2s ease;
    }
  `),S("wx-category-carousel",X),S("wx-product-categories",class extends X{});class ne extends C{constructor(){super(),this.product=null,this.activeImageIndex=0,this.lang="vi"}_getImages(){if(!this.product)return[];const e=this.product,t=[];if(e.mainImage){const r=P(e.mainImage);r&&t.push(r)}const i=e.gallery||e.media||e.images||e.mediaGallery;return i&&ve(i).forEach(s=>{const o=P(s);o&&!t.includes(o)&&t.push(o)}),t}_prevImage(e,t){e.stopPropagation(),t.length&&(this.activeImageIndex=(this.activeImageIndex-1+t.length)%t.length)}_nextImage(e,t){e.stopPropagation(),t.length&&(this.activeImageIndex=(this.activeImageIndex+1)%t.length)}_onClick(){B(this,"product-click",{product:this.product})}_getCardColors(){if(!this.product)return[];const e=this.product,t=[];if(e.variants&&Array.isArray(e.variants)&&e.variants.length>0)for(const i of e.variants){const r=i.color||"";r&&!t.some(s=>s.toLowerCase()===r.toLowerCase())&&t.push(r)}else e.color&&t.push(e.color);return t}render(){if(!this.product)return l``;const e=this.product,t=this._getImages(),i=t[this.activeImageIndex]||e.mainImage||(t.length?t[0]:""),{price:r,comparePrice:s,discountPercent:o}=xe(e),a=e.brand?e.brand.replace("brand-","").toUpperCase():"",c=this._getCardColors(),g=!!(e.variants&&e.variants.length>1&&e.minPrice&&e.maxPrice&&Number(e.minPrice)<Number(e.maxPrice)),u=g?null:o;let p=[];if(Array.isArray(e.labels))p=e.labels;else if(typeof e.labels=="string"){const f=ye(e.labels);if(Array.isArray(f))p=f;else if(e.labels.trim()&&e.labels!=="[]"){const k=e.labels.replace(/[\[\]"']/g,"").trim();k&&(p=[k])}}else e.label?p=[e.label]:e.ribbon&&(p=[e.ribbon]);if(e.isBestseller||e.bestseller){const f=this.lang==="vi"?"Bán chạy":"Bestseller";!p.includes(f)&&!p.includes("Bestseller")&&!p.includes("Bán chạy")&&p.unshift(f)}const b={"bán chạy":"Bestseller",mới:"New","mới mở bán":"New to sale","giảm giá":"On sale"},h={bestseller:"Bán chạy","best seller":"Bán chạy",new:"Mới","new to sale":"Mới mở bán","on sale":"Giảm giá"};p=p.filter(Boolean).map(f=>{const k=String(f).trim().toLowerCase();return this.lang==="en"?b[k]||f:h[k]||f});const y=t.length,U=y>1?100/y:100,x=y>1?this.activeImageIndex/y*100:0;return l`
      <div class="card" @click="${this._onClick}">
        <!-- Top Bar: % Giảm giá + Labels (Đã bỏ icon heart) -->
        <div class="top-bar">
          <div class="badges-group">
            ${u?l`<span class="badge-pill badge-discount">-${u}%</span>`:""}
            ${p.map(f=>l`<span class="badge-pill badge-label">${f}</span>`)}
          </div>
        </div>

        <!-- Image Viewport với Nút Next/Back Gallery khi Hover -->
        <div class="image-viewport">
          ${y>1?l`
                <button
                  class="nav-arrow prev"
                  @click="${f=>this._prevImage(f,t)}"
                  aria-label="${d("prevImage",this.lang)}"
                >
                  &#x2039;
                </button>
                <button
                  class="nav-arrow next"
                  @click="${f=>this._nextImage(f,t)}"
                  aria-label="${d("nextImage",this.lang)}"
                >
                  &#x203A;
                </button>
              `:""}

          ${i?l`<img src="${i}" alt="${e.title}" loading="lazy" />`:l`
                <div class="image-placeholder">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <span>${d("noImage",this.lang)}</span>
                </div>
              `}
        </div>

        <!-- Thanh chỉ báo ảnh hiện tại nếu có nhiều ảnh gallery -->
        ${y>1?l`
              <div class="image-progress-bar">
                <div
                  class="image-progress-thumb"
                  style="width: ${U}%; left: ${x}%;"
                ></div>
              </div>
            `:""}

        <div class="content-area">
          ${a?l`<div class="brand-title">${a}</div>`:""}
          <h3 class="product-title" title="${e.title}">${e.title}</h3>

          ${e.rating?l`
                <div class="rating-row">
                  <span class="stars">★★★★★</span>
                  <span class="rating-text">${e.rating} ${e.reviewCount?`(${e.reviewCount})`:""}</span>
                </div>
              `:""}

          ${e.sizeLabel?l`<div class="variant-sizes">${e.sizeLabel}</div>`:""}

          ${c.length>1?l`
                <div class="card-color-swatches" title="${c.join(", ")}">
                  ${c.slice(0,5).map(f=>l`
                      <span
                        class="card-color-dot"
                        style="background: ${ht(f)}"
                        title="${f}"
                      ></span>
                    `)}
                  ${c.length>5?l`<span class="card-color-more">+${c.length-5}</span>`:""}
                </div>
              `:""}

          <div class="footer-row">
            <div class="price-col">
              ${!g&&s&&s>r?l`<span class="compare-price">${z(s)}</span>`:""}
              <span class="current-price">
                ${g?`${z(e.minPrice)} – ${z(e.maxPrice)}`:r?z(r):d("contactUs",this.lang)}
              </span>
            </div>
          </div>
        </div>
      </div>
    `}}v(ne,"properties",{product:{type:Object,converter:I},data:{type:Object,converter:I},activeImageIndex:{type:Number},lang:{type:String}}),v(ne,"styles",_`
    :host {
      display: block;
      font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      box-sizing: border-box;
      height: 100%;
      margin: 0;
      padding: 0;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    button, input, select, textarea, a {
      font-family: inherit;
    }

    .card {
      background: #ffffff;
      border: 1px solid #e7e7e7;
      border-radius: 4px; /* Bo góc 4px */
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
      padding: 0;
      cursor: pointer;
      transition: box-shadow 0.2s ease, border-color 0.2s ease;
    }

    .card:hover {
      border-color: #cccccc;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07);
    }

    /* Top Bar: Chỉ còn % Giảm giá (Đỏ) + Labels (Đen) - padding trên dưới 8px, trái phải 16px */
    .top-bar {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      min-height: 38px;
      padding: 8px 16px;
      margin-bottom: 0;
      position: relative;
      z-index: 5;
      font-size: 12px;
      box-sizing: border-box;
    }

    .badges-group {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
    }

    .badge-pill {
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 2px;
      line-height: 1.1;
      display: inline-block;
    }

    .badge-discount {
      background: #d40026;
      color: #ffffff;
    }

    .badge-label {
      background: #111111;
      color: #ffffff;
    }

    /* Image Viewport: Full w theo card sản phẩm */
    .image-viewport {
      position: relative;
      width: 100%;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0;
      overflow: hidden;
      border-radius: 0;
    }

    .image-viewport img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      transition: transform 0.25s ease, opacity 0.2s ease;
    }

    .card:hover .image-viewport img {
      transform: scale(1.02);
    }

    .image-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background: #fbfbfb;
      border: 1px dashed #e2e2e2;
      border-radius: 4px;
      color: #aaaaaa;
      gap: 6px;
      font-size: 11px;
    }

    /* Nút Next / Back khi hover card */
    .nav-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #111111;
      font-size: 14px;
      font-weight: 700;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease, visibility 0.2s ease, background 0.15s ease;
      z-index: 10;
    }

    .card:hover .nav-arrow {
      opacity: 1;
      visibility: visible;
    }

    .nav-arrow:hover {
      background: #111111;
      color: #ffffff;
      border-color: #111111;
    }

    .nav-arrow.prev {
      left: 8px;
    }

    .nav-arrow.next {
      right: 8px;
    }

    /* Thanh tiến trình phân đoạn ảnh */
    .image-progress-bar {
      width: 100%;
      height: 2px;
      background: #e5e5e5;
      position: relative;
      margin-bottom: 0;
      border-radius: 0;
      overflow: hidden;
    }

    .image-progress-thumb {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: #111111;
      transition: left 0.2s ease, width 0.2s ease;
    }

    /* Content Area: padding trên dưới 8px, trái phải 16px */
    .content-area {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      padding: 8px 16px;
    }

    .brand-title {
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #666666;
      margin-bottom: 4px;
    }

    .product-title {
      font-size: 16px;
      font-weight: 700;
      color: #111111;
      line-height: 1.35;
      margin: 0 0 10px 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-height: 44px;
    }

    /* Rating Stars */
    .rating-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 12px;
      font-size: 12px;
      color: #555555;
    }

    .stars {
      color: #f59e0b;
      font-size: 13px;
      letter-spacing: 1px;
    }

    .rating-text {
      font-size: 11px;
      color: #666666;
    }

    .variant-sizes {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #444444;
      margin-bottom: 6px;
    }

    .card-color-swatches {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 4px;
      margin-bottom: 8px;
    }

    .card-color-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.15);
      display: inline-block;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
      flex-shrink: 0;
      transition: transform 0.15s ease;
    }

    .card-color-dot:hover {
      transform: scale(1.2);
    }

    .card-color-more {
      font-size: 11px;
      font-weight: 600;
      color: #666666;
      margin-left: 2px;
    }

    /* Price Row */
    .footer-row {
      margin-top: auto;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      padding-top: 8px;
    }

    .price-col {
      display: flex;
      flex-direction: column;
    }

    .compare-price {
      font-size: 14px;
      color: #817367;
      text-decoration: line-through;
      margin-bottom: 2px;
    }

    .current-price {
      font-size: 16px;
      font-weight: 700;
      color: #111111;
    }
  `),S("wx-product-card",ne);class ee extends C{constructor(){super(),this.title="",this.products=null,this.items=null,this.data=null,this.lang="vi",this.loading=!1,this._progressLeft=0,this._progressWidth=25}firstUpdated(){this._track=this.shadowRoot.querySelector(".track"),this._initScroll()}updated(e){(e.has("products")||e.has("items")||e.has("data"))&&this._initScroll()}_initScroll(){this._track&&(this._track.addEventListener("scroll",()=>this._updateProgress()),this._updateProgress())}_updateProgress(){if(!this._track)return;const{scrollLeft:e,scrollWidth:t,clientWidth:i}=this._track,r=t-i;if(r<=0)this._progressWidth=100,this._progressLeft=0;else{this._progressWidth=Math.max(15,i/t*100);const o=100-this._progressWidth;this._progressLeft=e/r*o}const s=this.shadowRoot.querySelector(".progress-thumb");s&&(s.style.width=`${this._progressWidth}%`,s.style.left=`${this._progressLeft}%`)}_scroll(e){if(!this._track)return;const t=320*e;this._track.scrollBy({left:t,behavior:"smooth"})}_onProductClick(e){B(this,"product-select",{product:e.detail.product})}render(){const e=this.data||this.items||this.products,t=e!=null,i=Array.isArray(e)?e:[];return t&&i.length===0&&!this.loading?l``:i.length?l`
      <div class="carousel-wrapper">
        ${this.title?l`<div class="carousel-title">${this.title}</div>`:""}
        <div class="track" role="list">
          ${i.map(r=>l`
              <div class="card-item" role="listitem">
                <wx-product-card
                  .product="${r}"
                  .lang="${this.lang}"
                  @product-click="${this._onProductClick}"
                ></wx-product-card>
              </div>
            `)}
        </div>

        <div class="controls-row">
          <button class="nav-arrow-btn" @click="${()=>this._scroll(-1)}" aria-label="${d("scrollLeft",this.lang)}">&#x2039;</button>
          <div class="progress-track">
            <div class="progress-thumb"></div>
          </div>
          <button class="nav-arrow-btn" @click="${()=>this._scroll(1)}" aria-label="${d("scrollRight",this.lang)}">&#x203A;</button>
        </div>
      </div>
    `:l`
        <div class="carousel-wrapper">
          ${this.title?l`<div class="carousel-title">${this.title}</div>`:""}
          <div class="track" role="status" aria-label="Loading products">
            ${[1,2,3,4].map(()=>l`
                <div class="card-item skeleton-card">
                  <div class="skeleton-box skeleton-img"></div>
                  <div class="skeleton-box skeleton-brand"></div>
                  <div class="skeleton-box skeleton-title"></div>
                  <div class="skeleton-box skeleton-price"></div>
                </div>
              `)}
          </div>
        </div>
      `}}v(ee,"properties",{title:{type:String},products:{type:Array,converter:A},items:{type:Array,converter:A},data:{type:Array,converter:A},lang:{type:String},loading:{type:Boolean}}),v(ee,"styles",_`
    :host {
      display: block;
      font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      background: #ffffff;
      padding: 0;
      width: 100%;
    }

    :host([hidden]) {
      display: none !important;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    button, input, select, textarea {
      font-family: inherit;
    }

    @keyframes wx-shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    @keyframes wx-fade-in {
      from {
        opacity: 0;
        transform: translateY(3px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .carousel-title {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #111111;
      margin-bottom: 16px;
    }

    .carousel-wrapper {
      position: relative;
      width: 100%;
    }

    .track {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 4px 0 8px 0;
      animation: wx-fade-in 0.25s ease-out;
    }

    .track::-webkit-scrollbar {
      display: none;
    }

    .card-item {
      flex: 0 0 260px;
      height: 420px;
    }

    /* Skeleton Loading Cards */
    .skeleton-card {
      background: #ffffff;
      border: 1px solid #eeeeee;
      padding: 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .skeleton-box {
      background: linear-gradient(90deg, #f2f2f2 25%, #e8e8e8 50%, #f2f2f2 75%);
      background-size: 200% 100%;
      animation: wx-shimmer 1.5s infinite ease-in-out;
      border-radius: 4px;
    }

    .skeleton-img {
      width: 100%;
      height: 300px;
    }

    .skeleton-brand {
      width: 40%;
      height: 12px;
    }

    .skeleton-title {
      width: 85%;
      height: 16px;
    }

    .skeleton-price {
      width: 55%;
      height: 18px;
      margin-top: auto;
    }

    @media (max-width: 640px) {
      .card-item {
        flex: 0 0 220px;
        height: 390px;
      }
      .skeleton-img {
        height: 210px;
      }
    }

    /* Bottom progress bar & navigation arrows */
    .controls-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 14px;
      padding: 0 4px;
    }

    .nav-arrow-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid #e0e0e0;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #555555;
      font-size: 13px;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .nav-arrow-btn:hover {
      border-color: #111111;
      color: #111111;
    }

    .progress-track {
      flex: 1;
      height: 2px;
      background: #dcdcdc;
      position: relative;
      border-radius: 1px;
      overflow: hidden;
    }

    .progress-thumb {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: #111111;
      width: 25%;
      transition: left 0.2s ease, width 0.2s ease;
    }
  `),S("wx-product-carousel",ee),S("wx-product",class extends ee{});class ae extends C{constructor(){super(),this.products=null,this.data=null,this.brands=[],this.categories=[],this.series=[],this.selectedCategory="",this.selectedBrand="",this.selectedSeries="",this.selectedColor="",this.selectedPriceRange="",this.selectedSort="default",this.sidebarOpen=!1,this.activeSidebarTab="all",this.visibleCount=32,this.pageSize=32,this.lang="vi",this.loading=!1}_categoryMatchesProduct(e,t){if(!e||!t)return!1;const i=e.ID||e._id,r=e.slug,s=e.path;return!!(i&&(t.category===i||t.brandCategory===i)||r&&(t.category===r||t.primaryCategorySlug===r)||t.category&&i&&t.category.includes(i)||t.categoryPath&&(r&&(t.categoryPath.includes(`/${r}/`)||t.categoryPath.endsWith(`/${r}`)||t.categoryPath.includes(r))||i&&t.categoryPath.includes(i)||s&&t.categoryPath.startsWith(s))||t.brandCategoryPath&&r&&t.brandCategoryPath.includes(r))}_seriesMatchesProduct(e,t){if(!e||!t)return!1;const i=e.ID||e._id,r=e.slug,s=e.title,o=t.series;if(!o)return!1;if(typeof o=="object"){const a=o.ID||o._id,c=o.slug;return!!(i&&(a===i||c===i)||r&&(a===r||c===r)||s&&o.title===s)}return!!(typeof o=="string"&&(i&&(o===i||o.includes(i))||r&&(o===r||o.includes(r))||s&&o.toLowerCase().includes(s.toLowerCase())))}_getAvailableCategories(){const e=this.data||this.products,t=Array.isArray(e)?e:[],i=Array.isArray(this.categories)?this.categories:[];return i.length?t.length?i.filter(r=>t.some(s=>this._categoryMatchesProduct(r,s))):[]:[]}_getAvailableSeries(){const e=this.data||this.products,t=Array.isArray(e)?e:[];let i=Array.isArray(this.series)?[...this.series]:[];if(!i.length&&t.length){const r=new Map;for(const s of t)if(s.series){let o="",a="",c=s.brand||"";typeof s.series=="object"?(o=s.series.ID||s.series._id||s.series.slug||"",a=s.series.title||o,c=s.series.brand||c):typeof s.series=="string"&&(o=s.series,a=o.replace(/^series-/,"").replace(/^brand-/,"").replace(/^[a-z]+-/,"").replace(/-/g," ").toUpperCase()),o&&!r.has(o)&&r.set(o,{ID:o,title:a,brand:c})}i=Array.from(r.values())}if(!i.length||!t.length)return[];if(this.selectedBrand){const r=this.selectedBrand.toLowerCase().replace(/^brand-/,"");i=i.filter(s=>{const o=(s.brand||"").toLowerCase().replace(/^brand-/,""),a=(s.ID||s.slug||"").toLowerCase();return o===r||o.includes(r)||r.includes(o)||a.includes(r)})}return i.filter(r=>t.some(s=>this._seriesMatchesProduct(r,s)))}_normalizeColor(e,t){if(!e)return"";let i=e.trim();if(/^(cao |dáng |H:|H :|Quánh|size |5 rãnh|Phiên bản|Mới)/i.test(i)||i==="Dáng thấp"){const r=t&&t.title||"";return r.includes("thép")||r.includes("Thép")||r.includes("Núm nồi gang")?"Bạc":r.includes("FRESH & SAVE")?"Trắng Trong":r.includes("Ebony")||r.includes("Chảo Rán")?"Đen":"Bạc"}return i==="Trắng Trufle"&&(i="Trắng Truffle"),i==="Bề mặt bóng"&&(i="Bạc"),i.toLowerCase()==="kem"&&(i="Kem"),i.toLowerCase()==="hồng"&&(i="Hồng"),i.toLowerCase()==="bạc"&&(i="Bạc"),i==="bạc, kèm ống hút"&&(i="Bạc"),i==="kem, kèm ống hút"&&(i="Kem"),i==="hồng, kèm ống hút"&&(i="Hồng"),i.toLowerCase()==="xanh dark blue"&&(i="Xanh Dark Blue"),i==="Set màu Macaron"&&(i="Macaron"),i==="Nhiều Màu"&&(i="Nhiều màu"),i}_getProductColor(e){if(!e)return"";let t=e.color||"";if(!t&&e.variants&&Array.isArray(e.variants)&&e.variants.length>0&&(t=e.variants[0].color||""),!t&&e.title){const i=e.title.match(/\((?:Màu\s+)?([^)]+)\)/i);i?t=i[1].trim():e.title.includes("ZWILLING Nova")&&(t="Bạc")}return this._normalizeColor(t,e)}_getProductColors(e){if(!e)return[];const t=new Set;if(e.variants&&Array.isArray(e.variants)&&e.variants.length>0)for(const s of e.variants){let o=s.color||"";if(!o&&s.title){const c=s.title.match(/\((?:Màu\s+)?([^)]+)\)/i);c&&(o=c[1].trim())}const a=this._normalizeColor(o,e);a&&t.add(a)}let i=e.color||"";if(!i&&e.title){const s=e.title.match(/\((?:Màu\s+)?([^)]+)\)/i);s?i=s[1].trim():e.title.includes("ZWILLING Nova")&&(i="Bạc")}const r=this._normalizeColor(i,e);if(r&&t.add(r),t.size===0){const s=this._getProductColor(e);s&&t.add(s)}return Array.from(t)}_getColorHex(e){if(!e)return"#cccccc";const t=e.toLowerCase();return t.includes("nhiều màu")?"linear-gradient(135deg, #e53935, #fb8c00, #43a047, #1e88e5)":t.includes("trong suốt")?"linear-gradient(135deg, #ffffff 40%, #e0e0e0 60%)":t.includes("cherry blossom")||t.includes("anh đào")?"#e8a8b8":t.includes("đỏ cherry")?"#b51a2b":t.includes("grenadine")?"#6b1d28":t.includes("bordeaux")?"#58111a":t.includes("đỏ cam")?"#d34125":t.includes("đỏ")?"#c8102e":t.includes("basil")?"#315438":t.includes("sage")?"#879b83":t.includes("lime")?"#84b82c":t.includes("lục")?"#2d7a3a":t.includes("dark blue")?"#1b3558":t.includes("hoàng gia")?"#1f487e":t.includes("lamer")||t.includes("la mer")?"#2b767a":t.includes("xanh")?"#1d5f8a":t.includes("truffle")||t.includes("trufle")?"#ece8db":t.includes("trắng")?"#f8f8f8":t.includes("citron")?"#f1b82d":t.includes("gold")?"#d4af37":t.includes("vàng hồng")?"#d49a89":t.includes("vàng")?"#f1b82d":t.includes("chocolate")?"#4a2c20":t.includes("nâu")?"#5a3d2e":t.includes("granada")||t.includes("cinnamon")||t.includes("quế")||t.includes("cam")?"#d65a27":t.includes("macaron")?"#eec0c8":t.includes("sorbet")?"#f28599":t.includes("hồng")?"#f098aa":t.includes("kem")?"#f3e5ab":t.includes("đen")?"#222222":t.includes("bạc")||t.includes("inox")||t.includes("bề mặt bóng")?"#c0c0c0":t.includes("xám")?"#808080":"#cccccc"}_getAvailableColors(){const e=this.data||this.products,t=Array.isArray(e)?[...e]:[];if(!t.length)return[];let i=t;if(this.selectedCategory){const o=(Array.isArray(this.categories)?this.categories:[]).find(a=>a.ID===this.selectedCategory||a._id===this.selectedCategory||a.slug===this.selectedCategory);o?i=i.filter(a=>this._categoryMatchesProduct(o,a)):i=i.filter(a=>{const c=this.selectedCategory;return a.category===c||a.categorySlug===c||a.brandCategory===c||a.category&&a.category.includes(c)||a.categoryPath&&a.categoryPath.includes(c)})}if(this.selectedBrand&&(i=i.filter(s=>{const o=this.selectedBrand.toLowerCase(),a=(s.brand||"").toLowerCase();return a===o||a.includes(o)||s.brandPath&&s.brandPath.toLowerCase().includes(o)})),this.selectedSeries){const o=(Array.isArray(this.series)?this.series:[]).find(a=>a.ID===this.selectedSeries||a._id===this.selectedSeries||a.slug===this.selectedSeries);o?i=i.filter(a=>this._seriesMatchesProduct(o,a)):i=i.filter(a=>{const c=this.selectedSeries;return a.series?typeof a.series=="object"?a.series.ID===c||a.series._id===c||a.series.slug===c:a.series===c||a.series.includes(c):!1})}this.selectedPriceRange&&(i=i.filter(s=>{const o=this._getProductPrice(s);switch(this.selectedPriceRange){case"under-1m":return o>0&&o<1e6;case"1m-3m":return o>=1e6&&o<=3e6;case"3m-5m":return o>=3e6&&o<=5e6;case"over-5m":return o>5e6;default:return!0}}));const r=new Map;for(const s of i){const o=this._getProductColors(s);for(const a of o)r.set(a,(r.get(a)||0)+1)}return Array.from(r.entries()).map(([s,o])=>({color:s,count:o})).sort((s,o)=>o.count-s.count||s.color.localeCompare(o.color))}_getFilteredProducts(){const e=this.data||this.products;let i=Array.isArray(e)?[...e]:[];if(this.selectedCategory){const s=(Array.isArray(this.categories)?this.categories:[]).find(o=>o.ID===this.selectedCategory||o._id===this.selectedCategory||o.slug===this.selectedCategory);s?i=i.filter(o=>this._categoryMatchesProduct(s,o)):i=i.filter(o=>{const a=this.selectedCategory;return o.category===a||o.categorySlug===a||o.brandCategory===a||o.category&&o.category.includes(a)||o.categoryPath&&o.categoryPath.includes(a)})}if(this.selectedBrand&&(i=i.filter(r=>{const s=this.selectedBrand.toLowerCase(),o=(r.brand||"").toLowerCase();return o===s||o.includes(s)||r.brandPath&&r.brandPath.toLowerCase().includes(s)})),this.selectedSeries){const s=(Array.isArray(this.series)?this.series:[]).find(o=>o.ID===this.selectedSeries||o._id===this.selectedSeries||o.slug===this.selectedSeries);s?i=i.filter(o=>this._seriesMatchesProduct(s,o)):i=i.filter(o=>{const a=this.selectedSeries;return o.series?typeof o.series=="object"?o.series.ID===a||o.series._id===a||o.series.slug===a:o.series===a||o.series.includes(a):!1})}if(this.selectedPriceRange&&(i=i.filter(r=>{const s=this._getProductPrice(r);switch(this.selectedPriceRange){case"under-1m":return s>0&&s<1e6;case"1m-3m":return s>=1e6&&s<=3e6;case"3m-5m":return s>=3e6&&s<=5e6;case"over-5m":return s>5e6;default:return!0}})),this.selectedColor){const r=this.selectedColor.toLowerCase();i=i.filter(s=>this._getProductColors(s).some(a=>a.toLowerCase()===r))}return this.selectedSort==="price-asc"?i.sort((r,s)=>this._getProductPrice(r)-this._getProductPrice(s)):this.selectedSort==="price-desc"?i.sort((r,s)=>this._getProductPrice(s)-this._getProductPrice(r)):this.selectedSort==="title-asc"&&i.sort((r,s)=>(r.title||"").localeCompare(s.title||"")),i}_getProductPrice(e){return pt(e)}_openSidebar(e="all"){this.activeSidebarTab=e,this.sidebarOpen=!0,e&&e!=="all"&&setTimeout(()=>{var i;const t=(i=this.shadowRoot)==null?void 0:i.querySelector(`#filter-section-${e}`);t&&t.scrollIntoView({behavior:"smooth",block:"nearest"})},50)}_closeSidebar(){this.sidebarOpen=!1}_clearAllFilters(e){e&&e.preventDefault(),this.selectedCategory="",this.selectedBrand="",this.selectedSeries="",this.selectedColor="",this.selectedPriceRange="",this.selectedSort="default",this.visibleCount=this.pageSize||32,this.requestUpdate()}_clearCategoryFilter(e){e&&(e.preventDefault(),e.stopPropagation()),this.selectedCategory="",this.requestUpdate()}_clearBrandFilter(e){e&&(e.preventDefault(),e.stopPropagation()),this.selectedBrand="",this.requestUpdate()}_clearSeriesFilter(e){e&&(e.preventDefault(),e.stopPropagation()),this.selectedSeries="",this.requestUpdate()}_clearColorFilter(e){e&&(e.preventDefault(),e.stopPropagation()),this.selectedColor="",this.requestUpdate()}_clearPriceFilter(e){e&&(e.preventDefault(),e.stopPropagation()),this.selectedPriceRange="",this.requestUpdate()}_loadMore(){this.visibleCount+=this.pageSize}updated(e){(e.has("selectedCategory")||e.has("selectedBrand")||e.has("selectedSeries")||e.has("selectedColor")||e.has("selectedPriceRange")||e.has("selectedSort")||e.has("products")||e.has("data"))&&(this.visibleCount=this.pageSize||32)}_onProductCardClick(e){B(this,"product-select",{product:e.detail.product})}render(){const e=this.data||this.products,t=Array.isArray(e)?e.length>0:e!=null;if(this.loading===!0||this.loading==="true"||this.products===null&&!t)return l`
        <div>
          <div class="filter-toolbar">
            <div class="skeleton-box" style="width: 130px; height: 18px;"></div>
            <div class="skeleton-box" style="width: 120px; height: 34px; border-radius: 4px;"></div>
            <div class="skeleton-box" style="width: 100px; height: 34px; border-radius: 4px;"></div>
            <div class="skeleton-box" style="width: 100px; height: 34px; border-radius: 4px;"></div>
          </div>
          <div class="product-grid" role="status" aria-label="Loading products">
            ${[1,2,3,4,5,6,7,8].map(()=>l`
                <div class="skeleton-card">
                  <div style="height: 38px; padding: 8px 16px; display: flex; align-items: center;">
                    <div class="skeleton-box" style="width: 50px; height: 18px; border-radius: 2px;"></div>
                  </div>
                  <div class="skeleton-box skeleton-img"></div>
                  <div class="skeleton-content">
                    <div class="skeleton-box skeleton-brand"></div>
                    <div class="skeleton-box skeleton-title"></div>
                    <div class="skeleton-box skeleton-price"></div>
                  </div>
                </div>
              `)}
          </div>
        </div>
      `;const s=this._getFilteredProducts(),o=this._getAvailableCategories(),a=this._getAvailableSeries(),c=this._getAvailableColors(),g=this.selectedCategory||this.selectedBrand||this.selectedSeries||this.selectedColor||this.selectedPriceRange,u=s.length,p=s.slice(0,this.visibleCount),b=u>0?Math.min(100,p.length/u*100):0;return l`
      <div>
        <div class="filter-toolbar">
          <span class="results-text">${d("resultsCount",this.lang,s.length)}</span>

          <div class="sort-select-wrap">
            <select
              class="sort-select"
              @change="${h=>this.selectedSort=h.target.value}"
              .value="${this.selectedSort}"
            >
              <option value="default">${d("sortBy",this.lang)}</option>
              <option value="price-asc">${d("sortPriceAsc",this.lang)}</option>
              <option value="price-desc">${d("sortPriceDesc",this.lang)}</option>
              <option value="title-asc">${d("sortTitleAsc",this.lang)}</option>
            </select>
            <span class="sort-arrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>

          <div class="filter-buttons-group">
            <button
              class="filter-trigger-btn ${this.selectedBrand?"has-value":""}"
              @click="${()=>this._openSidebar("brand")}"
            >
              <span>${d("filterBrand",this.lang)}</span>
            </button>

            <button
              class="filter-trigger-btn ${this.selectedSeries?"has-value":""}"
              @click="${()=>this._openSidebar("series")}"
            >
              <span>${d("filterSeries",this.lang)}</span>
            </button>

            <button
              class="filter-trigger-btn ${this.selectedColor?"has-value":""}"
              @click="${()=>this._openSidebar("color")}"
            >
              <span>${d("filterColor",this.lang)}</span>
            </button>

            <button
              class="filter-trigger-btn ${this.selectedPriceRange?"has-value":""}"
              @click="${()=>this._openSidebar("price")}"
            >
              <span>${d("filterPrice",this.lang)}</span>
            </button>

            <button
              class="filter-trigger-btn ${this.selectedCategory?"has-value":""}"
              @click="${()=>this._openSidebar("category")}"
            >
              <span>${d("filterCategory",this.lang)}</span>
            </button>

            ${g?l`<button class="reset-link" @click="${this._clearAllFilters}">${d("clearAll",this.lang)}</button>`:""}

            <button
              class="filter-trigger-btn all-filters-btn ${g?"has-value":""}"
              @click="${()=>this._openSidebar("all")}"
            >
              <span>${this.lang==="vi"?"Tất cả bộ lọc":"All Filters"}</span>
              ${g?l`<span class="active-dot"></span>`:""}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM1 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5zm12 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM1 8.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm5 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5zm3 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM1 13.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm10 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="product-grid">
          ${p.length>0?p.map(h=>l`
                  <wx-product-card
                    .product="${h}"
                    .lang="${this.lang}"
                    @product-click="${this._onProductCardClick}"
                  ></wx-product-card>
                `):l`
                <div class="empty-state">
                  <p>${d("emptyProducts",this.lang)}</p>
                </div>
              `}
        </div>

        ${u>this.pageSize?l`
              <div class="pagination-wrapper">
                <div class="showing-text">
                  ${d("showingItems",this.lang,p.length,u)}
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar-fill" style="width: ${b}%;"></div>
                </div>
                ${p.length<u?l`
                      <button class="btn-load-more" @click="${this._loadMore}">
                        ${d("loadMore",this.lang)}
                      </button>
                    `:""}
              </div>
            `:""}

        <div
          class="drawer-overlay ${this.sidebarOpen?"open":""}"
          @click="${this._closeSidebar}"
        ></div>

        <aside class="filter-sidebar ${this.sidebarOpen?"open":""}" aria-label="${d("productFilterAria",this.lang)}">
          <div class="sidebar-header">
            <h3 class="sidebar-title">${d("searchFilters",this.lang)}</h3>
            <button class="close-btn" @click="${this._closeSidebar}" aria-label="${d("close",this.lang)}">✕</button>
          </div>

          <div class="sidebar-content">
            <div class="filter-section" id="filter-section-category">
              <div class="filter-group-title">
                <span>${d("categories",this.lang)}</span>
                ${this.selectedCategory?l`<button type="button" class="clear-section-btn" @click="${this._clearCategoryFilter}">${d("clear",this.lang)}</button>`:""}
              </div>
              <div class="filter-options-list">
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="cat_filter"
                    value=""
                    .checked="${!this.selectedCategory}"
                    @change="${()=>this.selectedCategory=""}"
                  />
                  <span>${d("allCategories",this.lang)}</span>
                </label>
                <div class="filter-options-scrollable">
                  ${o&&o.length>0?o.map(h=>l`
                          <label class="filter-option-label">
                            <input
                              type="radio"
                              name="cat_filter"
                              value="${h.ID||h.slug||h._id}"
                              .checked="${this.selectedCategory===(h.ID||h.slug||h._id)}"
                              @change="${()=>this.selectedCategory=h.ID||h.slug||h._id}"
                            />
                            <span>${h.title}</span>
                          </label>
                        `):l`<span style="font-size: 12px; color: #888888; padding: 4px 0;">${d("noCategories",this.lang)}</span>`}
                </div>
              </div>
            </div>

            <div class="filter-section" id="filter-section-brand">
              <div class="filter-group-title">
                <span>${d("brands",this.lang)}</span>
                ${this.selectedBrand?l`<button type="button" class="clear-section-btn" @click="${this._clearBrandFilter}">${d("clear",this.lang)}</button>`:""}
              </div>
              <div class="filter-options-list">
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="brand_filter"
                    value=""
                    .checked="${!this.selectedBrand}"
                    @change="${()=>this.selectedBrand=""}"
                  />
                  <span>${d("allBrands",this.lang)}</span>
                </label>
                ${this.brands&&this.brands.length>0?this.brands.map(h=>l`
                        <label class="filter-option-label">
                          <input
                            type="radio"
                            name="brand_filter"
                            value="${h.ID||h.slug||h._id}"
                            .checked="${this.selectedBrand===(h.ID||h.slug||h._id)}"
                            @change="${()=>this.selectedBrand=h.ID||h.slug||h._id}"
                          />
                          <span>${h.title}</span>
                        </label>
                      `):""}
              </div>
            </div>

            <div class="filter-section" id="filter-section-series">
              <div class="filter-group-title">
                <span>${d("series",this.lang)}</span>
                ${this.selectedSeries?l`<button type="button" class="clear-section-btn" @click="${this._clearSeriesFilter}">${d("clear",this.lang)}</button>`:""}
              </div>
              <div class="filter-options-list">
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="series_filter"
                    value=""
                    .checked="${!this.selectedSeries}"
                    @change="${()=>this.selectedSeries=""}"
                  />
                  <span>${d("allSeries",this.lang)}</span>
                </label>
                <div class="filter-options-scrollable">
                  ${a&&a.length>0?a.map(h=>l`
                          <label class="filter-option-label">
                            <input
                              type="radio"
                              name="series_filter"
                              value="${h.ID||h.slug||h._id}"
                              .checked="${this.selectedSeries===(h.ID||h.slug||h._id)}"
                              @change="${()=>this.selectedSeries=h.ID||h.slug||h._id}"
                            />
                            <span>${h.title}</span>
                          </label>
                        `):l`<span style="font-size: 12px; color: #888888; padding: 4px 0;">${d("noSeries",this.lang)}</span>`}
                </div>
              </div>
            </div>

            <div class="filter-section" id="filter-section-color">
              <div class="filter-group-title">
                <span>${d("color",this.lang)}</span>
                ${this.selectedColor?l`<button type="button" class="clear-section-btn" @click="${this._clearColorFilter}">${d("clear",this.lang)}</button>`:""}
              </div>
              <div class="filter-options-list">
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="color_filter"
                    value=""
                    .checked="${!this.selectedColor}"
                    @change="${()=>this.selectedColor=""}"
                  />
                  <span>${d("allColors",this.lang)}</span>
                </label>
                <div class="filter-options-scrollable">
                  ${c&&c.length>0?c.map(h=>l`
                          <label class="filter-option-label">
                            <input
                              type="radio"
                              name="color_filter"
                              value="${h.color}"
                              .checked="${this.selectedColor===h.color}"
                              @change="${()=>this.selectedColor=h.color}"
                            />
                            <span class="color-swatch-circle" style="background: ${this._getColorHex(h.color)};"></span>
                            <span>${h.color} (${h.count})</span>
                          </label>
                        `):l`<span style="font-size: 12px; color: #888888; padding: 4px 0;">${d("noColors",this.lang)}</span>`}
                </div>
              </div>
            </div>

            <div class="filter-section" id="filter-section-price">
              <div class="filter-group-title">
                <span>${d("priceRange",this.lang)}</span>
                ${this.selectedPriceRange?l`<button type="button" class="clear-section-btn" @click="${this._clearPriceFilter}">${d("clear",this.lang)}</button>`:""}
              </div>
              <div class="filter-options-list">
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value=""
                    .checked="${!this.selectedPriceRange}"
                    @change="${()=>this.selectedPriceRange=""}"
                  />
                  <span>${d("allPrices",this.lang)}</span>
                </label>
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value="under-1m"
                    .checked="${this.selectedPriceRange==="under-1m"}"
                    @change="${()=>this.selectedPriceRange="under-1m"}"
                  />
                  <span>${d("priceUnder1m",this.lang)}</span>
                </label>
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value="1m-3m"
                    .checked="${this.selectedPriceRange==="1m-3m"}"
                    @change="${()=>this.selectedPriceRange="1m-3m"}"
                  />
                  <span>${d("price1mTo3m",this.lang)}</span>
                </label>
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value="3m-5m"
                    .checked="${this.selectedPriceRange==="3m-5m"}"
                    @change="${()=>this.selectedPriceRange="3m-5m"}"
                  />
                  <span>${d("price3mTo5m",this.lang)}</span>
                </label>
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value="over-5m"
                    .checked="${this.selectedPriceRange==="over-5m"}"
                    @change="${()=>this.selectedPriceRange="over-5m"}"
                  />
                  <span>${d("priceOver5m",this.lang)}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="sidebar-footer">
            <button class="btn-clear" @click="${this._clearAllFilters}">${d("reset",this.lang)}</button>
            <button class="btn-apply" @click="${this._closeSidebar}">${d("viewResults",this.lang,s.length)}</button>
          </div>
        </aside>
      </div>
    `}}v(ae,"properties",{products:{type:Array,converter:A},data:{type:Array,converter:A},brands:{type:Array,converter:A},categories:{type:Array,converter:A},series:{type:Array,converter:A},selectedCategory:{type:String},selectedBrand:{type:String},selectedSeries:{type:String},selectedColor:{type:String},selectedPriceRange:{type:String},selectedSort:{type:String},sidebarOpen:{type:Boolean},activeSidebarTab:{type:String},visibleCount:{type:Number},pageSize:{type:Number},lang:{type:String},loading:{type:Boolean,converter:we}}),v(ae,"styles",_`
    :host {
      display: block;
      font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: #ffffff;
      position: relative;
      width: 100%;
    }

    :host([hidden]) {
      display: none !important;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    button, input, select, textarea, a {
      font-family: inherit;
    }

    @keyframes wx-shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    @keyframes wx-fade-in {
      from {
        opacity: 0;
        transform: translateY(3px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .product-grid {
      animation: wx-fade-in 0.25s ease-out;
    }

    /* Skeleton Loading Cards */
    .skeleton-card {
      background: #ffffff;
      border: 1px solid #e7e7e7;
      border-radius: 4px;
      overflow: hidden;
      padding: 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      min-height: 420px;
    }

    .skeleton-box {
      background: linear-gradient(90deg, #f2f2f2 25%, #e8e8e8 50%, #f2f2f2 75%);
      background-size: 200% 100%;
      animation: wx-shimmer 1.5s infinite ease-in-out;
      border-radius: 4px;
    }

    .skeleton-img {
      width: 100%;
      height: 300px;
      border-radius: 0;
    }

    .skeleton-content {
      padding: 8px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex-grow: 1;
    }

    .skeleton-brand {
      width: 40%;
      height: 12px;
    }

    .skeleton-title {
      width: 85%;
      height: 16px;
    }

    .skeleton-price {
      width: 55%;
      height: 18px;
      margin-top: auto;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    /* Filter Toolbar */
    .filter-toolbar {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f2;
      font-size: 14px;
    }

    .results-text {
      font-size: 14px;
      font-weight: 500;
      color: #000000;
      margin-right: 12px;
      white-space: nowrap;
    }

    .sort-select-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    .sort-select {
      appearance: none;
      -webkit-appearance: none;
      background-color: #efecea;
      border: 1px solid #efecea;
      border-radius: 3px;
      color: #000;
      display: inline-block;
      height: 44px;
      padding: 12px 38px 12px 20px;
      font-size: 14px;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      box-sizing: border-box;
      transition: background-color 0.2s ease, border-color 0.2s ease;
    }

    .sort-select:hover,
    .sort-select:focus {
      background-color: #fff;
      border: 1px solid #817367;
      outline: none;
    }

    .sort-arrow {
      position: absolute;
      right: 14px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: #000000;
      display: flex;
      align-items: center;
    }

    .filter-buttons-group {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      flex: 1;
    }

    .filter-trigger-btn {
      background-color: #efecea;
      border: 1px solid #efecea;
      border-radius: 3px;
      color: #000;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 44px;
      padding: 12px 24px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      font-family: inherit;
      box-sizing: border-box;
      transition: background-color 0.2s ease, border-color 0.2s ease;
      gap: 8px;
      white-space: nowrap;
    }

    .filter-trigger-btn:hover {
      background-color: #fff;
      border: 1px solid #817367;
      color: #000;
    }

    .filter-trigger-btn.has-value {
      background-color: #fff;
      border: 1px solid #817367;
      color: #000;
      font-weight: 600;
    }

    .all-filters-btn {
      margin-left: auto;
    }

    .active-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #817367;
      display: inline-block;
    }

    .reset-link {
      background: none;
      border: none;
      color: #d40026;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      padding: 6px 8px;
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      .filter-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 20px;
        padding-bottom: 12px;
      }
      .results-text {
        font-size: 13px;
        margin-right: auto;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .sort-select-wrap {
        position: relative;
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
      }
      .sort-select {
        height: 38px;
        padding: 8px 26px 8px 10px;
        font-size: 12px;
      }
      .sort-arrow {
        right: 8px;
      }
      .filter-buttons-group {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
        margin-left: 0;
        gap: 8px;
      }
      /* On mobile, ONLY display results count, sort dropdown, and all filters button */
      .filter-buttons-group .filter-trigger-btn:not(.all-filters-btn),
      .filter-buttons-group .reset-link {
        display: none !important;
      }
      .filter-trigger-btn {
        height: 38px;
        padding: 8px 12px;
        font-size: 12px;
        gap: 6px;
        flex-shrink: 0;
      }
      .all-filters-btn {
        margin-left: 0;
      }
    }

    /* 4 Column Product Grid */
    .product-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }

    @media (max-width: 1080px) {
      .product-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 768px) {
      .product-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
    }

    @media (max-width: 480px) {
      .product-grid {
        grid-template-columns: 1fr;
      }
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #777777;
      grid-column: 1 / -1;
    }

    /* Sidebar Drawer Bên Phải */
    .drawer-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.4);
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.25s ease, visibility 0.25s ease;
    }

    .drawer-overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .filter-sidebar {
      position: fixed;
      top: 0;
      right: 0;
      width: 380px;
      max-width: 90vw;
      height: 100vh;
      background: #ffffff;
      z-index: 1000;
      box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
    }

    .filter-sidebar.open {
      transform: translateX(0);
    }

    .sidebar-header {
      padding: 20px 24px;
      border-bottom: 1px solid #eeeeee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .sidebar-title {
      font-size: 16px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #111111;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 20px;
      color: #555555;
      cursor: pointer;
      line-height: 1;
      padding: 4px;
      transition: color 0.15s ease;
    }

    .close-btn:hover {
      color: #111111;
    }

    .sidebar-content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .filter-group-title {
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #111111;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .filter-options-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .filter-options-scrollable {
      max-height: 180px;
      overflow-y: auto;
      padding-right: 6px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scrollbar-width: thin;
      scrollbar-color: #d1d5db transparent;
    }

    .filter-options-scrollable::-webkit-scrollbar {
      width: 4px;
    }

    .filter-options-scrollable::-webkit-scrollbar-track {
      background: #f4f4f4;
      border-radius: 2px;
    }

    .filter-options-scrollable::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 2px;
    }

    .filter-options-scrollable::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }

    .color-swatch-circle {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.15);
      flex-shrink: 0;
      display: inline-block;
    }

    .filter-option-label {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      color: #333333;
      cursor: pointer;
    }

    .filter-option-label input[type="radio"] {
      accent-color: #111111;
      width: 16px;
      height: 16px;
      cursor: pointer;
    }

    .clear-section-btn {
      background: none;
      border: none;
      padding: 0;
      font-size: 11px;
      font-weight: 700;
      color: #d40026;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      font-family: inherit;
      transition: opacity 0.2s;
    }

    .clear-section-btn:hover {
      opacity: 0.8;
      text-decoration: underline;
    }

    .sidebar-footer {
      padding: 16px 24px;
      border-top: 1px solid #eeeeee;
      display: flex;
      gap: 12px;
    }

    .btn-apply {
      flex: 1;
      background: #111111;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      padding: 12px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .btn-apply:hover {
      background: #333333;
    }

    .btn-clear {
      background: #f4f4f4;
      color: #444444;
      border: 1px solid #e2e2e2;
      border-radius: 4px;
      padding: 12px 18px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-clear:hover {
      background: #eaeaea;
    }

    /* Pagination & Load More Section */
    .pagination-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 48px;
      margin-bottom: 24px;
      width: 100%;
    }

    .showing-text {
      font-size: 15px;
      font-weight: 700;
      color: #111111;
      margin-bottom: 18px;
      text-align: center;
      letter-spacing: -0.01em;
    }

    .progress-bar-container {
      width: 100%;
      max-width: 520px;
      height: 2px;
      background: #e0e0e0;
      position: relative;
      margin-bottom: 28px;
      border-radius: 1px;
    }

    .progress-bar-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: #d40026;
      transition: width 0.3s ease;
    }

    .btn-load-more {
      background: #000000;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 14px 44px;
      border: none;
      border-radius: 2px;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.15s ease;
      font-family: inherit;
    }

    .btn-load-more:hover {
      background: #222222;
      transform: translateY(-1px);
    }

    .btn-load-more:active {
      transform: translateY(0);
    }
  `),S("wx-product-listing",ae);const gt="data:image/png;base64,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",ut="data:image/png;base64,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",ft="data:image/png;base64,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";class le extends C{constructor(){super(),this.product=null,this.data=null,this.selectedImageIndex=0,this.selectedVariantIndex=0,this.lang="vi",this.loading=!1,this.shopeeUrl="",this.tiktokUrl="",this.messUrl="",this.shopeeIcon="",this.tiktokIcon="",this.messIcon="",this.openSections={description:!0,specifications:!1,instructions:!1},this.isZoomed=!1,this.zoomX=50,this.zoomY=50}_onMouseMove(e){const t=e.currentTarget.getBoundingClientRect();if(!t.width||!t.height)return;const i=(e.clientX-t.left)/t.width*100,r=(e.clientY-t.top)/t.height*100;this.zoomX=Math.max(0,Math.min(100,i)),this.zoomY=Math.max(0,Math.min(100,r)),this.isZoomed=!0}_onMouseLeave(){this.isZoomed=!1,this.zoomX=50,this.zoomY=50}_getVariants(){const e=this.data||this.product;return e?Array.isArray(e.variants)&&e.variants.length>0?e.variants:[{ID:e.ID,title:e.title,color:e.color||"",sizeLabel:e.sizeLabel||e.size||"",price:e.minPrice||e.price||0,compareAtPrice:e.maxPrice||e.compareAtPrice||"",mainImage:e.mainImage||"",gallery:e.gallery||"",shopeeUrl:e.shopeeUrl||this.shopeeUrl||"",tiktokUrl:e.tiktokUrl||this.tiktokUrl||""}]:[]}_getActiveVariant(){const e=this._getVariants();if(!e.length)return null;const t=Math.max(0,Math.min(this.selectedVariantIndex,e.length-1));return e[t]||e[0]}_selectVariant(e){this.selectedVariantIndex=e,this.selectedImageIndex=0;const t=this._getActiveVariant();t&&B(this,"variant-change",{variant:t}),this.requestUpdate()}_getColorHex(e){if(!e)return"#cccccc";const t=e.toLowerCase();return t.includes("nhiều màu")?"linear-gradient(135deg, #e53935, #fb8c00, #43a047, #1e88e5)":t.includes("trong suốt")?"linear-gradient(135deg, #ffffff 40%, #e0e0e0 60%)":t.includes("cherry blossom")||t.includes("anh đào")?"#e8a8b8":t.includes("đỏ cherry")?"#b51a2b":t.includes("grenadine")?"#6b1d28":t.includes("bordeaux")?"#58111a":t.includes("đỏ cam")?"#d34125":t.includes("đỏ")?"#c8102e":t.includes("basil")?"#315438":t.includes("sage")?"#879b83":t.includes("lime")?"#84b82c":t.includes("lục")?"#2d7a3a":t.includes("dark blue")?"#1b3558":t.includes("hoàng gia")?"#1f487e":t.includes("lamer")||t.includes("la mer")?"#2b767a":t.includes("xanh")?"#1d5f8a":t.includes("truffle")||t.includes("trufle")?"#ece8db":t.includes("trắng")?"#f8f8f8":t.includes("citron")?"#f1b82d":t.includes("gold")?"#d4af37":t.includes("vàng hồng")?"#d49a89":t.includes("vàng")?"#f1b82d":t.includes("chocolate")?"#4a2c20":t.includes("nâu")?"#5a3d2e":t.includes("granada")||t.includes("cinnamon")||t.includes("quế")||t.includes("cam")?"#d65a27":t.includes("macaron")?"#eec0c8":t.includes("sorbet")?"#f28599":t.includes("hồng")?"#f098aa":t.includes("kem")?"#f3e5ab":t.includes("đen")?"#222222":t.includes("bạc")||t.includes("inox")||t.includes("bề mặt bóng")?"#c0c0c0":t.includes("xám")?"#808080":"#cccccc"}_getImages(){const e=[],t=this.data||this.product;if(!t)return e;const i=this._getActiveVariant(),r=i&&i.mainImage||t.mainImage;if(r){const o=P(r);o&&e.push(o)}const s=i&&i.gallery||t.gallery||t.media||t.images||t.mediaGallery;return s&&ve(s).forEach(a=>{const c=P(a);c&&!e.includes(c)&&e.push(c)}),e}_prevImage(e){e.length&&(this.selectedImageIndex=(this.selectedImageIndex-1+e.length)%e.length)}_nextImage(e){e.length&&(this.selectedImageIndex=(this.selectedImageIndex+1)%e.length)}_toggleSection(e){this.openSections={...this.openSections,[e]:!this.openSections[e]}}_renderHighlights(e){if(!e||typeof e!="string")return l``;const t=e.split(`
`).map(o=>o.trim()).filter(Boolean),i=[],r=[],s=/^[-–—*•·]\s*/;for(const o of t)s.test(o)?r.push(o.replace(s,"")):r.length===0?i.push(o):r.push(o);return l`
      ${i.length?l`<div class="highlights-heading">${i.join(" ")}</div>`:""}
      ${r.length?l`<ul class="highlights-list">
            ${r.map(o=>l`<li>${o}</li>`)}
          </ul>`:""}
    `}_getSocialUrl(e,t){const i=this._getActiveVariant()||t;if(e==="shopee"){const r=this.shopeeUrl||i&&i.shopeeUrl||t&&t.shopeeUrl;return r&&typeof r=="string"&&r.trim()&&r.trim()!=="#"?r.trim():""}if(e==="tiktok"){const r=this.tiktokUrl||i&&i.tiktokUrl||t&&t.tiktokUrl;return r&&typeof r=="string"&&r.trim()&&r.trim()!=="#"?r.trim():""}if(e==="mess"){const r="https://www.facebook.com/zwillingvietnamofficial/",s=this.messUrl||i&&(i.messUrl||i.messengerUrl)||t&&(t.messUrl||t.messengerUrl)||r;return s&&typeof s=="string"&&s.trim()&&s.trim()!=="#"?s.trim():r}return""}_onSocialClick(e,t){const i=this.product||this.data||{},r=this._getSocialUrl(e,i);B(this,"social-click",{channel:e,url:r,product:i}),B(this,`${e}-click`,{url:r,product:i})}_renderSocialActions(e){const t=this._getSocialUrl("shopee",e),i=this._getSocialUrl("tiktok",e),r=this._getSocialUrl("mess",e);if(!t&&!i&&!r)return"";const s=this.shopeeIcon||e&&e.shopeeIcon||gt,o=this.tiktokIcon||e&&e.tiktokIcon||ut,a=this.messIcon||e&&e.messIcon||ft;return l`
      <div class="social-actions-group" aria-label="Kênh liên hệ và mua hàng">
        <!-- Button 1: Shopee (Ảnh 1) - Chỉ hiển thị khi sản phẩm có link Shopee -->
        ${t?l`
              <a
                class="social-btn shopee"
                href="${t}"
                target="_blank"
                rel="noopener noreferrer"
                @click="${c=>this._onSocialClick("shopee",c)}"
                title="Mua trên Shopee"
              >
                <img src="${s}" alt="Shopee" width="22" height="22" loading="lazy" decoding="async" />
                <span>Shopee</span>
              </a>
            `:""}

        <!-- Button 2: TikTok (Ảnh 2) - Chỉ hiển thị khi sản phẩm có link TikTok -->
        ${i?l`
              <a
                class="social-btn tiktok"
                href="${i}"
                target="_blank"
                rel="noopener noreferrer"
                @click="${c=>this._onSocialClick("tiktok",c)}"
                title="Xem trên TikTok"
              >
                <img src="${o}" alt="TikTok" width="22" height="22" loading="lazy" decoding="async" />
                <span>TikTok</span>
              </a>
            `:""}

        <!-- Button 3: Messenger (Ảnh 3) -->
        ${r?l`
              <a
                class="social-btn mess"
                href="${r}"
                target="_blank"
                rel="noopener noreferrer"
                @click="${c=>this._onSocialClick("mess",c)}"
                title="Nhắn tin qua Messenger"
              >
                <img src="${a}" alt="Mess" width="22" height="22" loading="lazy" decoding="async" />
                <span>Mess</span>
              </a>
            `:""}
      </div>
    `}_renderDescription(e){if(!e||typeof e!="string")return l``;const t=e.split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean),i=[],r=/^[-–—*•·]\s*/;for(const s of t){const o=s.split(`
`).map(c=>c.trim()).filter(Boolean);if(o.every(c=>r.test(c))){const c=o.map(g=>g.replace(r,""));i.push(l`<ul class="desc-bullets">
          ${c.map(g=>l`<li>${g}</li>`)}
        </ul>`)}else{const c=[],g=[];for(const u of o)r.test(u)?g.push(u.replace(r,"")):c.push(u);c.length&&i.push(l`<p class="desc-paragraph">${c.join(" ")}</p>`),g.length&&i.push(l`<ul class="desc-bullets">
            ${g.map(u=>l`<li>${u}</li>`)}
          </ul>`)}}return l`<div class="desc-formatted">${i}</div>`}render(){const e=this.data||this.product;if(this.loading===!0||this.loading==="true"||!e&&this.product===null)return l`
        <div class="pdp-grid" role="status" aria-label="Loading product details">
          <!-- Cột Gallery Skeleton -->
          <div class="gallery-col">
            <div class="skeleton-box skeleton-main-img"></div>
            <div class="skeleton-thumbs">
              <div class="skeleton-box skeleton-thumb"></div>
              <div class="skeleton-box skeleton-thumb"></div>
              <div class="skeleton-box skeleton-thumb"></div>
              <div class="skeleton-box skeleton-thumb"></div>
            </div>
          </div>

          <!-- Cột Info Skeleton -->
          <div class="skeleton-info-col">
            <div class="skeleton-box" style="width: 35%; height: 16px;"></div>
            <div class="skeleton-box" style="width: 85%; height: 32px;"></div>
            <div class="skeleton-box" style="width: 45%; height: 28px; margin-top: 8px;"></div>
            <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 14px;">
              <div class="skeleton-box" style="width: 100%; height: 48px; border-radius: 4px;"></div>
              <div class="skeleton-box" style="width: 100%; height: 48px; border-radius: 4px;"></div>
              <div class="skeleton-box" style="width: 100%; height: 48px; border-radius: 4px;"></div>
            </div>
          </div>
        </div>
      `;if(!e)return l``;const r=e,s=this._getVariants(),o=this._getActiveVariant()||r,a=this._getImages(),c=a[this.selectedImageIndex]||a[0],g=r.brand?r.brand.replace("brand-","").toUpperCase():"",u=r.series?r.series.replace("series-","").replace(/--.+/,"").toUpperCase():"",{price:p,comparePrice:b,discountPercent:h}=xe(o||r),y=o&&o.sizeLabel||r.sizeLabel||r.size||"",U=ye(r.specs,[]);return l`
      <div class="pdp-grid">
        <!-- Cột Gallery bên trái -->
        <div class="gallery-col">
          <div
            class="main-viewport-box ${this.isZoomed?"zoomed":""}"
            @mousemove="${this._onMouseMove}"
            @mouseleave="${this._onMouseLeave}"
          >
            ${r.labels&&r.labels.length?l`<span class="badge-top-left">${Array.isArray(r.labels)?r.labels[0]:r.labels}</span>`:""}
            
            ${a.length>1?l`
                  <button class="nav-arrow prev" @click="${x=>{x.stopPropagation(),this._prevImage(a)}}" aria-label="${d("prevImage",this.lang)}">&#x2039;</button>
                  <button class="nav-arrow next" @click="${x=>{x.stopPropagation(),this._nextImage(a)}}" aria-label="${d("nextImage",this.lang)}">&#x203A;</button>
                `:""}

            <!-- Icon kính lúp có dấu + góc dưới phải -->
            <div class="zoom-badge" aria-hidden="true" title="Phóng to chi tiết">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>

            ${c?l`
                  <img
                    class="main-img"
                    src="${c}"
                    alt="${r.title}"
                    style="${this.isZoomed?`transform-origin: ${this.zoomX}% ${this.zoomY}%; transform: scale(2.4);`:"transform-origin: center center; transform: scale(1);"}"
                  />
                `:l`
                  <div style="width: 100%; height: 350px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #f9f9f9; border: 1px dashed #d5d5d5; border-radius: 4px; color: #999; gap: 8px;">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span style="font-size: 12px;">${d("noImage",this.lang)}</span>
                  </div>
                `}
          </div>

          <!-- Thumbnail Matrix -->
          ${a.length>1?l`
                <div class="thumbnails-grid">
                  ${a.map((x,f)=>l`
                    <div
                      class="thumb-cell ${f===this.selectedImageIndex?"active":""}"
                      @click="${()=>this.selectedImageIndex=f}"
                    >
                      <img src="${x}" alt="Thumbnail ${f+1}" />
                    </div>
                  `)}
                </div>
              `:""}
        </div>

        <!-- Cột Thông tin bên phải -->
        <div class="info-col">
          ${g?l`<div class="brand-row">${g}</div>`:""}

          <h1 class="product-title">${r.title}</h1>

          ${u?l`<div class="series-name">${d("seriesLabel",this.lang,u)}</div>`:""}

          <!-- Price Row -->
          <div class="price-row">
            ${b&&b>p?l`<span class="compare-price">${z(b)}</span>`:""}
            <span class="sale-price">${p?z(p):d("contactUs",this.lang)}</span>
            ${h?l`<span class="discount-box">-${h}%</span>`:""}
          </div>

          <!-- Ratings nếu có -->
          ${r.rating?l`
                <div class="rating-row">
                  <span class="stars">★★★★★</span>
                  <span>${r.rating}</span>
                  ${r.reviewCount?l`<span class="rating-link">${d("reviewsCount",this.lang,r.reviewCount)}</span>`:""}
                </div>
              `:""}

          <!-- Variant Selectors: Colour & Size (y hệt ảnh mẫu của Staub / Zwilling) -->
          ${s&&s.length>0&&(s.length>1||o&&o.color||y)?l`
              <div class="variant-selectors-container">
                <!-- 1. Colour Section -->
                ${o&&(o.color||s.some(x=>x.color))?l`
                    <div class="variant-group colour-group">
                      <div class="variant-header-row">
                        <span class="variant-label">${this.lang==="vi"?"Màu sắc":"Colour"}:</span>
                        <span class="variant-value">${o.color||""}</span>
                      </div>
                      <div class="color-swatches-list">
                        ${s.map((x,f)=>{const k=f===this.selectedVariantIndex,N=x.mainImage?P(x.mainImage):"",j=this._getColorHex(x.color),je=x.price?z(x.price):"";return l`
                            <div
                              class="color-swatch-item ${k?"selected":""}"
                              @click="${()=>this._selectVariant(f)}"
                              title="${x.color}"
                            >
                              <div class="swatch-circle">
                                ${N?l`<img class="swatch-img" src="${N}" alt="${x.color}" />`:l`<div class="swatch-fallback-dot" style="background: ${j};"></div>`}
                              </div>
                              ${je?l`<div class="swatch-price">${je}</div>`:l`<div class="swatch-price not-available">${this.lang==="vi"?"HẾT HÀNG":"NOT AVAILABLE"}</div>`}
                            </div>
                          `})}
                      </div>
                    </div>
                  `:""}

                <!-- 2. Size Section (cm) -->
                ${y?l`
                    <div class="variant-group size-group">
                      <div class="variant-header-row">
                        <span class="variant-label">${this.lang==="vi"?"Kích thước":"Size"}:</span>
                        <span class="variant-value">${y}</span>
                      </div>
                      <div class="size-pills-list">
                        <button type="button" class="size-pill active">${y}</button>
                      </div>
                    </div>
                  `:""}
              </div>
            `:""}

          <!-- Highlights Bullet list nếu có shortDescription & 3 Buttons: Facebook, TikTok, Mess -->
          ${r.shortDescription?l`
                <div class="highlights-box">
                  <div class="highlights-title">${d("highlights",this.lang)}</div>
                  ${this._renderHighlights(r.shortDescription)}
                  ${this._renderSocialActions(r)}
                </div>
              `:l`
                <div class="highlights-box empty-highlights">
                  ${this._renderSocialActions(r)}
                </div>
              `}

          <!-- Accordion Sections -->
          <div class="accordion-section">
            <!-- 1. Description -->
            <div class="accordion-item">
              <button class="accordion-header" @click="${()=>this._toggleSection("description")}">
                <span>${d("descriptionTab",this.lang)}</span>
                <span class="accordion-icon">${this.openSections.description?"▲":"▼"}</span>
              </button>
              ${this.openSections.description?l`
                    <div class="accordion-body">
                      ${this._renderDescription(r.description||r.shortDescription||d("noDescription",this.lang))}
                    </div>
                  `:""}
            </div>

            <!-- 2. Specifications -->
            <div class="accordion-item">
              <button class="accordion-header" @click="${()=>this._toggleSection("specifications")}">
                <span>${d("specsTab",this.lang)}</span>
                <span class="accordion-icon">${this.openSections.specifications?"▲":"▼"}</span>
              </button>
              ${this.openSections.specifications?l`
                    <div class="accordion-body">
                      ${U&&U.length>0?l`
                            <table class="specs-table">
                              <tbody>
                                ${U.map(x=>l`
                                    <tr>
                                      <td>${x.name||x.key}</td>
                                      <td>${x.value}</td>
                                    </tr>
                                  `)}
                              </tbody>
                            </table>
                          `:l`<p>${d("noSpecs",this.lang)}</p>`}
                    </div>
                  `:""}
            </div>

            <!-- 3. Manual and Safety Instructions -->
            <div class="accordion-item">
              <button class="accordion-header" @click="${()=>this._toggleSection("instructions")}">
                <span>${d("instructionsTab",this.lang)}</span>
                <span class="accordion-icon">${this.openSections.instructions?"▲":"▼"}</span>
              </button>
              ${this.openSections.instructions?l`
                    <div class="accordion-body">
                      ${r.instructions||r.manual||l`
                        <ul>
                          ${(d("defaultInstructions",this.lang)||[]).map(x=>l`<li>${x}</li>`)}
                        </ul>
                      `}
                    </div>
                  `:""}
            </div>
          </div>
        </div>
      </div>
    `}}v(le,"properties",{product:{type:Object,converter:I},data:{type:Object,converter:I},selectedImageIndex:{type:Number},selectedVariantIndex:{type:Number},openSections:{type:Object},lang:{type:String},loading:{type:Boolean,converter:we},shopeeUrl:{type:String,attribute:"shopee-url"},tiktokUrl:{type:String,attribute:"tiktok-url"},messUrl:{type:String,attribute:"mess-url"},shopeeIcon:{type:String,attribute:"shopee-icon"},tiktokIcon:{type:String,attribute:"tiktok-icon"},messIcon:{type:String,attribute:"mess-icon"},isZoomed:{state:!0},zoomX:{state:!0},zoomY:{state:!0}}),v(le,"styles",_`
    :host {
      display: block;
      font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 15px;
      line-height: 1.5;
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #111111;
    }

    :host([hidden]) {
      display: none !important;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      font-family: inherit;
    }

    button, input, select, textarea {
      font-family: inherit;
    }

    @keyframes wx-shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    @keyframes wx-fade-in {
      from {
        opacity: 0;
        transform: translateY(3px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    .pdp-grid {
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      gap: 56px;
      animation: wx-fade-in 0.25s ease-out;
    }

    .skeleton-box {
      background: linear-gradient(90deg, #f2f2f2 25%, #e8e8e8 50%, #f2f2f2 75%);
      background-size: 200% 100%;
      animation: wx-shimmer 1.5s infinite ease-in-out;
      border-radius: 4px;
    }

    .skeleton-main-img {
      width: 100%;
      max-width: 650px;
      height: 650px;
      margin-bottom: 24px;
    }

    @media (max-width: 768px) {
      .skeleton-main-img {
        height: auto;
        aspect-ratio: 1 / 1;
      }
    }

    .skeleton-thumbs {
      display: flex;
      gap: 12px;
      max-width: 650px;
    }

    .skeleton-thumb {
      width: 64px;
      height: 64px;
    }

    .skeleton-info-col {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    @media (max-width: 900px) {
      .pdp-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }
    }

    /* Left Gallery */
    .gallery-col {
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .main-viewport-box {
      position: relative;
      width: 100%;
      max-width: 650px;
      height: 650px;
      background: radial-gradient(#ffffff, #f8f7f6);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
      overflow: hidden;
      cursor: zoom-in;
    }

    @media (max-width: 768px) {
      .main-viewport-box {
        height: auto;
        aspect-ratio: 1 / 1;
      }
    }

    .badge-top-left {
      position: absolute;
      top: 14px;
      left: 14px;
      border: 1px solid #111111;
      padding: 4px 8px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      background: #ffffff;
      z-index: 2;
      pointer-events: none;
    }

    .main-img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      background: transparent;
      mix-blend-mode: multiply;
      transition: transform 0.12s ease-out, opacity 0.2s ease;
      pointer-events: none;
      user-select: none;
      will-change: transform, transform-origin;
    }

    /* Icon kính lúp có dấu + ở góc dưới phải */
    .zoom-badge {
      position: absolute;
      bottom: 14px;
      right: 14px;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #222222;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
      z-index: 3;
    }

    .main-viewport-box.zoomed .zoom-badge {
      opacity: 0;
      transform: scale(0.8);
    }

    .nav-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.92);
      border: 1px solid #e0e0e0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 18px;
      color: #222222;
      transition: all 0.15s ease;
      z-index: 4;
    }

    .nav-arrow:hover {
      background: #111111;
      color: #ffffff;
      border-color: #111111;
    }

    .nav-arrow.prev {
      left: 12px;
    }

    .nav-arrow.next {
      right: 12px;
    }

    /* Thumbnail Matrix */
    .thumbnails-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      max-width: 650px;
      width: 100%;
      gap: 10px;
    }

    @media (max-width: 600px) {
      .thumbnails-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .thumb-cell {
      aspect-ratio: 1;
      border: 1px solid #e2e2e2;
      border-radius: 2px;
      background: #ffffff;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.15s ease;
      position: relative;
    }

    .thumb-cell:hover {
      border-color: #999999;
    }

    .thumb-cell.active {
      border: 2px solid #111111;
    }

    .thumb-cell img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    /* Right Info */
    .info-col {
      display: flex;
      flex-direction: column;
    }

    .brand-logo-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }

    .brand-row,
    .brand-name {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #555555;
      margin-bottom: 8px;
    }

    .brand-logo-sq {
      width: 32px;
      height: 32px;
      background: #d40026;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 900;
      border-radius: 2px;
    }

    .product-title {
      font-size: 28px;
      font-weight: 800;
      line-height: 1.25;
      margin: 0 0 12px 0;
      color: #111111;
      letter-spacing: -0.01em;
    }

    .series-name {
      font-size: 14px;
      color: #666666;
      margin: 0 0 16px 0;
      font-weight: 500;
      letter-spacing: 0.01em;
    }

    /* Price Row */
    .price-row {
      display: flex;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 18px;
    }

    .compare-price {
      font-size: 18px;
      color: #888888;
      text-decoration: line-through;
    }

    .sale-price {
      font-size: 30px;
      font-weight: 800;
      color: #111111;
      letter-spacing: -0.02em;
    }

    .discount-box {
      border: 1px solid #d40026;
      color: #d40026;
      font-size: 12px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 2px;
    }

    /* Rating row */
    .rating-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      margin-bottom: 20px;
    }

    .stars {
      color: #f59e0b;
      font-size: 14px;
      letter-spacing: 2px;
    }

    .rating-link {
      color: #444444;
      text-decoration: underline;
      cursor: pointer;
    }

    /* Bullet highlights */
    .highlights-box {
      margin-bottom: 28px;
      border-top: 1px solid #f0f0f0;
      padding-top: 16px;
    }

    .highlights-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 12px;
      color: #111111;
    }

    .highlights-list {
      list-style-type: none;
      padding-left: 0;
      font-family: var(--wx-font-family);
      font-size: 16px;
      color: #444444;
      line-height: 1.7;
      margin: 0;
    }

    .highlights-list li {
      margin-bottom: 6px;
      padding-left: 20px;
      position: relative;
    }

    .highlights-list li::before {
      content: '•';
      position: absolute;
      left: 2px;
      color: #444444;
      font-size: 18px;
      line-height: 1.5;
    }

    .highlights-heading {
      font-family: var(--wx-font-family);
      font-size: 16px;
      font-weight: 400;
      color: #222222;
      line-height: 1.6;
      margin-bottom: 12px;
    }

    /* 3 Action Buttons: Shopee, TikTok, Mess */
    .social-actions-group {
      display: flex;
      gap: 12px;
      margin-top: 20px;
      flex-wrap: wrap;
    }

    .social-btn {
      flex: 1;
      min-width: 105px;
      height: 42px;
      padding: 0 14px;
      border: 1.5px solid transparent;
      border-radius: 4px;
      font-family: inherit;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.02em;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      text-decoration: none;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
      box-sizing: border-box;
      background: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    .social-btn svg,
    .social-btn img {
      width: 22px;
      height: 22px;
      object-fit: contain;
      flex-shrink: 0;
      display: block;
      pointer-events: none;
    }

    .social-btn:hover {
      transform: translateY(-2px);
    }

    .social-btn:active {
      transform: translateY(0);
    }

    /* Shopee Button */
    .social-btn.shopee {
      border-color: #EE4D2D;
      color: #EE4D2D;
    }

    .social-btn.shopee:hover {
      background: #FFF5F2;
      border-color: #d73211;
      color: #d73211;
      box-shadow: 0 4px 14px rgba(238, 77, 45, 0.25);
    }

    /* TikTok Button */
    .social-btn.tiktok {
      border-color: #111111;
      color: #111111;
    }

    .social-btn.tiktok:hover {
      background: #F7F7F7;
      border-color: #000000;
      color: #000000;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16);
    }

    /* Mess (Messenger) Button */
    .social-btn.mess {
      border-color: #0084FF;
      color: #0084FF;
    }

    .social-btn.mess:hover {
      background: #F2F8FF;
      border-color: #0066d6;
      color: #0066d6;
      box-shadow: 0 4px 14px rgba(0, 132, 255, 0.25);
    }

    @media (max-width: 480px) {
      .social-actions-group {
        gap: 8px;
      }
      .social-btn {
        min-width: 95px;
        height: 38px;
        font-size: 13px;
        padding: 0 10px;
        gap: 6px;
      }
      .social-btn svg,
      .social-btn img {
        width: 18px;
        height: 18px;
      }
    }

    /* Accordions */
    .accordion-section {
      border-top: 1px solid #e5e5e5;
    }

    .accordion-item {
      border-bottom: 1px solid #e5e5e5;
    }

    .accordion-header {
      width: 100%;
      background: none;
      border: none;
      padding: 18px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      font-size: 18px;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #111111;
      text-align: left;
    }

    .accordion-icon {
      font-size: 16px;
      transition: transform 0.2s ease;
    }

    .accordion-body {
      padding: 0 0 20px 0;
      font-family: var(--wx-font-family);
      font-size: 16px;
      line-height: 1.7;
      color: #444444;
    }

    .accordion-body ul:not(.desc-bullets) {
      list-style-type: none;
      padding-left: 0;
      margin: 0 0 16px 0;
      font-size: 16px;
      line-height: 1.7;
      color: #444444;
    }

    .accordion-body ul:not(.desc-bullets) li {
      margin-bottom: 6px;
      padding-left: 20px;
      position: relative;
    }

    .accordion-body ul:not(.desc-bullets) li::before {
      content: '•';
      position: absolute;
      left: 2px;
      color: #444444;
      font-size: 18px;
      line-height: 1.5;
    }

    .desc-formatted {
      font-family: var(--wx-font-family);
    }

    .desc-paragraph {
      margin: 0 0 16px 0;
      font-size: 16px;
      line-height: 1.7;
      color: #444444;
    }

    .desc-paragraph:last-child {
      margin-bottom: 0;
    }

    .desc-bullets {
      list-style-type: none;
      padding-left: 0;
      margin: 0 0 16px 0;
      font-size: 16px;
      line-height: 1.7;
      color: #444444;
    }

    .desc-bullets:last-child {
      margin-bottom: 0;
    }

    .desc-bullets li {
      margin-bottom: 6px;
      padding-left: 20px;
      position: relative;
    }

    .desc-bullets li::before {
      content: '•';
      position: absolute;
      left: 2px;
      color: #444444;
      font-size: 18px;
      line-height: 1.5;
    }

    .specs-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
    }

    .specs-table td {
      padding: 10px 14px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 16px;
      line-height: 1.5;
    }

    .specs-table td:first-child {
      background-color: #EFECEA;
      font-weight: 600;
      width: 40%;
      color: #333333;
      border-bottom: 1px solid #ffffff;
    }

    /* Variant Selectors: Colour & Size (Matching official Staub / Zwilling PDP) */
    .variant-selectors-container {
      margin: 18px 0 22px 0;
      padding-top: 18px;
      border-top: 1px solid #ebebeb;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .variant-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .variant-header-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
      font-size: 15px;
    }

    .variant-header-row .variant-label {
      font-weight: 700;
      color: #111111;
      letter-spacing: -0.01em;
    }

    .variant-header-row .variant-value {
      font-weight: 500;
      color: #333333;
      text-transform: capitalize;
    }

    .color-swatches-list {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 14px;
      align-items: flex-start;
    }

    .color-swatch-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      width: 66px;
      user-select: none;
      transition: transform 0.15s ease;
    }

    .color-swatch-item:hover {
      transform: translateY(-2px);
    }

    .swatch-circle {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      border: 1.5px solid #dcdcdc;
      background: #ffffff;
      padding: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      box-sizing: border-box;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .color-swatch-item:hover .swatch-circle {
      border-color: #888888;
    }

    .color-swatch-item.selected .swatch-circle {
      border: 2.5px solid #000000;
      box-shadow: 0 0 0 1px #000000;
    }

    .swatch-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: contain;
      background: #ffffff;
    }

    .swatch-fallback-dot {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .swatch-price {
      margin-top: 6px;
      font-size: 12px;
      font-weight: 600;
      color: #222222;
      text-align: center;
      line-height: 1.2;
      white-space: nowrap;
    }

    .color-swatch-item.selected .swatch-price {
      font-weight: 800;
      color: #000000;
    }

    .swatch-price.not-available {
      color: #888888;
      font-size: 11px;
    }

    .size-pills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
    }

    .size-pill {
      min-width: 76px;
      height: 42px;
      padding: 0 18px;
      border-radius: 4px;
      border: 1.5px solid #d0d0d0;
      background: #efecea;
      color: #222222;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
      font-family: inherit;
    }

    .size-pill:hover {
      border-color: #888888;
      background: #ffffff;
    }

    .size-pill.active {
      border: 2px solid #000000;
      background: #ffffff;
      color: #000000;
      font-weight: 700;
    }
  `),S("wx-product-detail",le);class te extends C{constructor(){super(),this.title="",this.products=null,this.items=null,this.data=null,this.currentProduct=null,this.product=null,this.category="",this.limit=4,this.lang="vi",this.loading=!1,this._progressLeft=0,this._progressWidth=25}firstUpdated(){this._grid=this.shadowRoot.querySelector(".related-grid"),this._initScroll()}updated(e){(e.has("products")||e.has("items")||e.has("data"))&&this._initScroll()}_initScroll(){this._grid&&(this._grid.addEventListener("scroll",()=>this._updateProgress()),this._updateProgress())}_updateProgress(){if(!this._grid)return;const{scrollLeft:e,scrollWidth:t,clientWidth:i}=this._grid,r=t-i;if(r<=0)this._progressWidth=100,this._progressLeft=0;else{this._progressWidth=Math.max(25,i/t*100);const o=100-this._progressWidth;this._progressLeft=e/r*o}const s=this.shadowRoot.querySelector(".progress-thumb");s&&(s.style.width=`${this._progressWidth}%`,s.style.left=`${this._progressLeft}%`)}_scroll(e){if(!this._grid)return;const t=260*e;this._grid.scrollBy({left:t,behavior:"smooth"})}_getEffectiveProducts(){const e=this.data||this.items||this.products;if(!e||!Array.isArray(e))return[];const t=this.currentProduct||this.product,i=t?t.ID||t.id||t._id||t.slug:"";let r=i?e.filter(u=>(u.ID||u.id||u._id||u.slug)!==i):[...e],s=this.category,o="",a="",c="";if(t&&(s||(typeof t.category=="object"&&t.category!==null?s=t.category._id||t.category.ID||t.category.slug||"":s=t.category||""),o=t.categoryPath||"",a=t.brandCategory||"",c=t.brand||""),s||o||a){const u=(s||"").toLowerCase().trim(),p=(a||"").toLowerCase().trim(),b=(o||"").split("/").filter(Boolean),h=b.length>0?b[0].toLowerCase().trim():"",y=r.filter(k=>{const N=String(k.category||"").toLowerCase().trim(),j=String(k.brandCategory||"").toLowerCase().trim();return u&&(N===u||j===u)||p&&(N===p||j===p)}),U=r.filter(k=>{if(y.includes(k))return!1;const N=String(k.categoryPath||"").toLowerCase(),j=String(k.category||"").toLowerCase();return h&&(N.includes(`/${h}/`)||j.includes(h))}),x=r.filter(k=>y.includes(k)||U.includes(k)?!1:c&&k.brand===c),f=[...y,...U,...x];f.length>0&&(r=f)}const g=Number(this.limit)>0?Number(this.limit):4;return r.slice(0,g)}_onProductClick(e){B(this,"product-select",{product:e.detail.product})}render(){const e=this._getEffectiveProducts(),t=this.title||d("relatedProducts",this.lang),i=Number(this.limit)>0?Number(this.limit):4;return this.loading||this.products===null&&this.items===null&&this.data===null?l`
        <div class="related-container">
          <div class="related-title">${t}</div>
          <div class="related-grid" role="status" aria-label="Loading related products">
            ${Array.from({length:i}).map(()=>l`
                <div class="card-item skeleton-card">
                  <div class="skeleton-box skeleton-img"></div>
                  <div class="skeleton-box skeleton-brand"></div>
                  <div class="skeleton-box skeleton-title"></div>
                  <div class="skeleton-box skeleton-price"></div>
                </div>
              `)}
          </div>
        </div>
      `:e.length?l`
      <div class="related-container">
        <div class="related-title">${t}</div>
        <div class="related-grid" role="list">
          ${e.map(r=>l`
              <div class="card-item" role="listitem">
                <wx-product-card
                  .product="${r}"
                  .lang="${this.lang}"
                  @product-click="${this._onProductClick}"
                ></wx-product-card>
              </div>
            `)}
        </div>

        <div class="controls-row">
          <button class="nav-arrow-btn" @click="${()=>this._scroll(-1)}" aria-label="${d("scrollLeft",this.lang)}">&#x2039;</button>
          <div class="progress-track">
            <div class="progress-thumb"></div>
          </div>
          <button class="nav-arrow-btn" @click="${()=>this._scroll(1)}" aria-label="${d("scrollRight",this.lang)}">&#x203A;</button>
        </div>
      </div>
    `:l``}}v(te,"properties",{title:{type:String},products:{type:Array,converter:A},items:{type:Array,converter:A},data:{type:Array,converter:A},currentProduct:{type:Object,converter:I},product:{type:Object,converter:I},category:{type:String},limit:{type:Number},lang:{type:String},loading:{type:Boolean}}),v(te,"styles",_`
    :host {
      display: block;
      font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      background: transparent;
      padding: 0;
      width: 100%;
    }

    :host([hidden]) {
      display: none !important;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    button, input, select, textarea {
      font-family: inherit;
    }

    @keyframes wx-shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    @keyframes wx-fade-in {
      from {
        opacity: 0;
        transform: translateY(3px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .related-container {
      width: 100%;
      position: relative;
      background-color: #EFECEA;
      padding: 0;
      border-radius: 4px;
      box-sizing: border-box;
    }

    .related-title {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #111111;
      text-align: center;
      margin: 0 0 32px 0;
      padding: 0;
      background: transparent;
      line-height: 1.2;
    }

    /* 4-Column Grid Layout on Desktop */
    .related-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      animation: wx-fade-in 0.25s ease-out;
    }

    .card-item {
      width: 100%;
      height: 420px;
      display: flex;
    }

    .card-item > wx-product-card {
      width: 100%;
      height: 100%;
    }

    /* Controls: arrows & progress bar (Dành cho màn hình nhỏ khi cuộn ngang) */
    .controls-row {
      display: none;
      align-items: center;
      gap: 16px;
      margin-top: 14px;
      padding: 0 4px;
    }

    .nav-arrow-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid #e0e0e0;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #555555;
      font-size: 13px;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .nav-arrow-btn:hover {
      border-color: #111111;
      color: #111111;
    }

    .progress-track {
      flex: 1;
      height: 2px;
      background: #dcdcdc;
      position: relative;
      border-radius: 1px;
      overflow: hidden;
    }

    .progress-thumb {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: #111111;
      width: 25%;
      transition: left 0.2s ease, width 0.2s ease;
    }

    /* Skeleton Loading Cards */
    .skeleton-card {
      background: #ffffff;
      border: 1px solid #eeeeee;
      padding: 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 12px;
      height: 420px;
    }

    .skeleton-box {
      background: linear-gradient(90deg, #f2f2f2 25%, #e8e8e8 50%, #f2f2f2 75%);
      background-size: 200% 100%;
      animation: wx-shimmer 1.5s infinite ease-in-out;
      border-radius: 4px;
    }

    .skeleton-img {
      width: 100%;
      height: 300px;
    }

    .skeleton-brand {
      width: 40%;
      height: 12px;
    }

    .skeleton-title {
      width: 85%;
      height: 16px;
    }

    .skeleton-price {
      width: 55%;
      height: 18px;
      margin-top: auto;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .related-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
      }
      .card-item {
        height: 410px;
      }
    }

    @media (max-width: 640px) {
      .related-grid {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        -ms-overflow-style: none;
        gap: 12px;
        padding-bottom: 8px;
      }

      .related-grid::-webkit-scrollbar {
        display: none;
      }

      .card-item {
        flex: 0 0 240px;
        height: 390px;
        scroll-snap-align: start;
      }

      .skeleton-card {
        flex: 0 0 240px;
        height: 390px;
      }

      .skeleton-img {
        height: 210px;
      }

      .controls-row {
        display: flex;
      }

      .related-container {
        padding: 0;
      }

      .related-title {
        font-size: 16px;
        margin-bottom: 20px;
        padding: 0;
      }
    }
  `),S("wx-related-products",te),S("wx-related",class extends te{});const ke=_`
  :host {
    --wx-font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --wx-color-primary: #d40026;
    --wx-color-primary-hover: #b00020;
    --wx-color-dark: #111111;
    --wx-color-surface: #ffffff;
    --wx-color-surface-subtle: #f8f9fa;
    --wx-color-surface-hover: #f1f3f5;
    --wx-color-border: #e5e7eb;
    --wx-color-border-hover: #d1d5db;
    --wx-color-text: #191919;
    --wx-color-text-secondary: #595959;
    --wx-color-text-muted: #8c8c8c;
    --wx-color-accent: #b48c5e;
    --wx-color-badge-bg: #fdf2f2;
    --wx-color-badge-text: #d40026;
    
    --wx-radius-sm: 4px;
    --wx-radius-md: 8px;
    --wx-radius-lg: 12px;
    --wx-radius-full: 9999px;
    
    --wx-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --wx-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
    --wx-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --wx-shadow-hover: 0 12px 24px -4px rgba(0, 0, 0, 0.12);

    --wx-transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    --wx-transition-normal: 0.25s cubic-bezier(0.4, 0, 0.2, 1);

    font-family: var(--wx-font-family);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: var(--wx-color-text);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  button, input, select, textarea, optgroup {
    font-family: inherit;
  }
`;class W extends C{constructor(){super(),this.blocks=[],this.items=[],this.data=null,this.type="all",this.lang="vi",this.activeHotspotIndex=0,this.failedImages=new Set}updated(e){super.updated(e);const t=this._getFilteredBlocks();this.hidden=!t||t.length===0}_getFilteredBlocks(){const e=this._getEffectiveBlocks();return!e||e.length===0?[]:e.filter(t=>{const i=t.component||"story";return i==="intro"?!1:!this.type||this.type==="all"?i==="story"||i==="highlights":i===this.type})}_getEffectiveBlocks(){return this.block&&typeof this.block=="object"?[this.block]:this.data&&Array.isArray(this.data.blocks)?this.data.blocks:this.data&&this.data.block&&typeof this.data.block=="object"?[this.data.block]:Array.isArray(this.blocks)?this.blocks:[]}_getEffectiveItems(){return this.data&&Array.isArray(this.data.items)?this.data.items:Array.isArray(this.items)?this.items:[]}_getItemsForBlock(e){const t=this._getEffectiveItems();if(!t||t.length===0)return[];if(t.length<=10)return t.slice().sort((o,a)=>(Number(o.position)||0)-(Number(a.position)||0));const i=typeof e=="object"&&e?e._id||"":e,r=typeof e=="object"&&e?e.ID||"":e,s=typeof e=="object"&&e&&e.title||"";return t.filter(o=>{const a=o.block;if(!a)return!0;if(typeof a=="object"&&a!==null){const c=a._id||"",g=a.ID||"",u=a.title||"";return i&&(c===i||g===i)||r&&(c===r||g===r)||s&&(c===s||g===s||u===s)}return i&&a===i||r&&a===r||s&&a===s}).sort((o,a)=>(Number(o.position)||0)-(Number(a.position)||0))}_onImageError(e){if(e){const t=new Set(this.failedImages);t.add(e),this.failedImages=t}}_isImageAvailable(e){return!e||typeof e!="string"||!e.trim()?!1:!this.failedImages.has(e)}_renderPlaceholder(e="220px",t=null){const i=t||d("noImage",this.lang)||"Chưa có ảnh";return l`
      <div class="no-image-placeholder" style="min-height: ${e};">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <span>${i}</span>
      </div>
    `}_renderMedia(e,t="",i="220px"){const r=P(e);return this._isImageAvailable(r)?l`
        <img
          src="${r}"
          alt="${t}"
          loading="lazy"
          @error="${()=>this._onImageError(r)}"
        />
      `:this._renderPlaceholder(i)}_renderStoryBlock(e,t){let i=e.heading||e.title,r=e.body||"",s=t,o=e.image||"";if(t&&t.length>0){const a=t[0];i=a.title||i,r=a.body||r,o=a.image||o,s=t.slice(1)}return l`
      <div class="story-section">
        <!-- Banner 50/50 -->
        <div class="story-banner">
          <div class="story-media">
            ${this._renderMedia(o,i,"320px")}
          </div>

          <div class="story-content">
            <h2 class="story-heading">${i}</h2>
            ${r?l`<div class="story-body">${r}</div>`:""}
          </div>
        </div>

        <!-- 3-Column Feature Cards bên dưới -->
        ${s.length>0?l`
              <div class="cards-grid">
                ${s.map(a=>l`
                    <div class="feature-card">
                      <div class="card-media">
                        ${this._renderMedia(a.image,a.title,"180px")}
                      </div>
                      <h3 class="card-title">${a.title}</h3>
                      ${a.body?l`<p class="card-body">${a.body}</p>`:""}
                    </div>
                  `)}
              </div>
            `:""}
      </div>
    `}_toggleAccordion(e){this.activeHotspotIndex===e?this.activeHotspotIndex=-1:this.activeHotspotIndex=e}_selectHotspot(e){this.activeHotspotIndex=e}_renderHighlightsBlock(e,t){const i=t.length>0?t:[],r=e.image||(e.ID?`/images/${e.ID}.png`:e._id?`/images/${e._id}.png`:""),s=P(r),o=this._isImageAvailable(s);return l`
      <div class="hotspot-section">
        <!-- Cột Trái: Ảnh Dao -->
        <div class="knife-viewport">
          ${o?l`
                <div class="knife-media-wrapper">
                  <img
                    src="${s}"
                    alt="${e.title||"Dao chi tiết"}"
                    loading="lazy"
                    @error="${()=>this._onImageError(s)}"
                  />
                  ${i.map((a,c)=>{const g=a.coordX!==void 0&&a.coordX!==null&&a.coordX!==""?a.coordX:a.x??a.hotspotX,u=a.coordY!==void 0&&a.coordY!==null&&a.coordY!==""?a.coordY:a.y??a.hotspotY;if(g==null||g==="")return"";const p=parseFloat(g),b=parseFloat(u);if(isNaN(p)||isNaN(b))return"";const h=this.activeHotspotIndex===c;return l`
                      <button
                        type="button"
                        class="hotspot-pin ${h?"active":""}"
                        style="left: ${p}%; top: ${b}%;"
                        @click="${y=>{y.stopPropagation(),this._selectHotspot(c)}}"
                        title="${a.title||`Điểm #${c+1}`}"
                        aria-label="${a.title||`Điểm #${c+1}`}"
                      >
                        <span class="hotspot-pin-pulse"></span>
                        <span class="hotspot-pin-inner"></span>
                      </button>
                    `})}
                </div>
              `:l`
                <div style="width: 100%;">
                  ${this._renderPlaceholder("260px")}
                </div>
              `}
        </div>

        <!-- Cột Phải: Danh sách Accordion tương tác -->
        <div class="accordion-col">
          ${i.map((a,c)=>{const g=this.activeHotspotIndex===c;return l`
              <div class="accordion-row ${g?"active":""}">
                <button
                  class="accordion-btn"
                  @click="${()=>this._toggleAccordion(c)}"
                  aria-expanded="${g}"
                >
                  <span class="accordion-title">${a.title}</span>
                  <span class="accordion-icon">${g?"▲":"▼"}</span>
                </button>

                ${g?l`
                      <div class="accordion-details">
                        ${a.body}
                      </div>
                    `:""}
              </div>
            `})}
        </div>
      </div>
    `}_renderIntroBlock(e){return l`
      <div class="intro-banner">
        <h2 class="intro-heading">${e.heading||e.title}</h2>
        ${e.body?l`<div class="intro-body">${e.body}</div>`:""}
        ${e.ctaLabel?l`<button class="story-cta-btn" type="button">${e.ctaLabel}</button>`:""}
      </div>
    `}render(){const e=this._getFilteredBlocks();return e.length===0?l``:l`
      <div class="feature-blocks-container">
        ${e.map(t=>{const i=this._getItemsForBlock(t),r=t.component||"story";return r==="highlights"?this._renderHighlightsBlock(t,i):r==="story"?this._renderStoryBlock(t,i):""})}
      </div>
    `}}v(W,"properties",{blocks:{type:Array,converter:I},block:{type:Object,converter:I},items:{type:Array,converter:I},data:{type:Object,converter:I},type:{type:String},lang:{type:String},activeHotspotIndex:{state:!0},failedImages:{state:!0}}),v(W,"styles",[ke,_`
      :host {
        display: block;
        width: 100%;
        margin: 0;
        padding: 0;
        font-family: var(--wx-font-family);
        color: #111111;
        background: transparent;
        box-sizing: border-box;
      }

      :host([hidden]) {
        display: none !important;
      }

      *, *::before, *::after {
        box-sizing: border-box;
      }

      button, input, select, textarea {
        font-family: inherit;
      }

      .feature-blocks-container {
        display: flex;
        flex-direction: column;
        gap: 48px;
        width: 100%;
        margin: 0;
      }

      /* -----------------------------------------
       * COMMON: KHUNG "CHƯA CÓ ẢNH" PLACEHOLDER
       * ----------------------------------------- */
      .no-image-placeholder {
        width: 100%;
        height: 100%;
        min-height: 220px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #fbfbfb;
        border: 1px dashed #d5d5d5;
        border-radius: 4px;
        color: #888888;
        gap: 10px;
        user-select: none;
      }

      .no-image-placeholder svg {
        opacity: 0.6;
      }

      .no-image-placeholder span {
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.02em;
      }

      /* -----------------------------------------
       * COMPONENT 1: STORY & 3-COLUMN HIGHLIGHTS
       * ----------------------------------------- */
      .story-section {
        display: flex;
        flex-direction: column;
        gap: 32px;
        background: #EFECEA;
        padding: 0;
        border-radius: 4px;
      }

      @media (max-width: 768px) {
        .story-section {
          padding: 0;
          gap: 20px;
        }
      }

      /* Story Banner (50/50 Layout) */
      .story-banner {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        align-items: center;
        background: #ffffff;
        padding-right: 40px;
        border-radius: 2px;
        overflow: hidden;
      }

      @media (max-width: 860px) {
        .story-banner {
          grid-template-columns: 1fr;
          gap: 24px;
          padding-right: 0;
          padding-bottom: 24px;
        }
      }

      .story-media {
        position: relative;
        width: 100%;
        min-height: 320px;
        background: #f8f8f8;
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .story-media img {
        width: 100%;
        height: 100%;
        max-height: 420px;
        object-fit: cover;
        display: block;
      }

      .story-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 18px;
        padding: 32px 0;
      }

      @media (max-width: 860px) {
        .story-content {
          padding: 0 20px 24px 20px;
        }
      }

      .story-heading {
        font-size: 22px;
        font-weight: 800;
        line-height: 1.25;
        color: #111111;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        margin: 0;
      }

      @media (max-width: 768px) {
        .story-heading {
          font-size: 18px;
        }
      }

      .story-body {
        font-size: 16px;
        line-height: 1.65;
        color: #444444;
        white-space: pre-line;
      }

      .story-cta-btn {
        align-self: flex-start;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #000000;
        color: #ffffff;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 12px 24px;
        border-radius: 2px;
        text-decoration: none;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s ease, transform 0.15s ease;
        margin-top: 6px;
      }

      .story-cta-btn:hover {
        background: #262626;
        transform: translateY(-1px);
      }

      /* 3-Column Highlights Grid */
      .cards-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }

      @media (max-width: 900px) {
        .cards-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 600px) {
        .cards-grid {
          grid-template-columns: 1fr;
        }
      }

      .feature-card {
        display: flex;
        flex-direction: column;
        background: #ffffff;
        border-radius: 2px;
        overflow: hidden;
        padding-bottom: 24px;
      }

      .card-media {
        width: 100%;
        aspect-ratio: 4 / 3;
        background: #f8f8f8;
        overflow: hidden;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .card-media img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .card-title {
        font-size: 18px;
        font-weight: 800;
        color: #111111;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        margin: 0 20px 8px 20px;
      }

      .card-body {
        font-size: 16px;
        line-height: 1.55;
        color: #555555;
        margin: 0 20px;
      }

      /* --------------------------------------------------
       * COMPONENT 2: INTERACTIVE KNIFE HOTSPOT & ACCORDION
       * -------------------------------------------------- */
      .hotspot-section {
        display: grid;
        grid-template-columns: 1.15fr 1fr;
        gap: 48px;
        align-items: center;
        background: #ffffff;
        padding: 24px 0;
      }

      @media (max-width: 920px) {
        .hotspot-section {
          grid-template-columns: 1fr;
          gap: 32px;
        }
      }

      /* Viewport Dao kèm Hotspot */
      .knife-viewport {
        position: relative;
        width: 100%;
        min-height: 280px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffffff;
        user-select: none;
        padding: 10px 0;
      }

      .knife-media-wrapper {
        position: relative;
        display: inline-block;
        max-width: 100%;
        line-height: 0;
      }

      .knife-media-wrapper img {
        width: auto;
        max-width: 100%;
        height: auto;
        max-height: 320px;
        display: block;
        pointer-events: none;
      }

      /* Hotspot Pins trên ảnh dao */
      .hotspot-pin {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(18, 18, 18, 0.22);
        border: 2px solid rgba(255, 255, 255, 0.95);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
        cursor: pointer;
        padding: 0;
        margin: 0;
        outline: none;
        z-index: 5;
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                    background-color 0.2s ease,
                    border-color 0.2s ease,
                    box-shadow 0.2s ease;
      }

      .hotspot-pin:hover {
        transform: translate(-50%, -50%) scale(1.15);
        background: rgba(18, 18, 18, 0.35);
        border-color: #ffffff;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
      }

      .hotspot-pin-inner {
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #ffffff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s ease, background-color 0.2s ease;
        pointer-events: none;
      }

      .hotspot-pin-pulse {
        position: absolute;
        inset: -5px;
        border-radius: 50%;
        border: 2px solid #d40026;
        opacity: 0;
        pointer-events: none;
      }

      /* Điểm Active (màu đỏ như trong thiết kế mẫu) */
      .hotspot-pin.active {
        background: rgba(212, 0, 38, 0.25);
        border-color: #d40026;
        box-shadow: 0 0 14px rgba(212, 0, 38, 0.7), 0 2px 8px rgba(0, 0, 0, 0.3);
        transform: translate(-50%, -50%) scale(1.1);
        z-index: 10;
      }

      .hotspot-pin.active .hotspot-pin-inner {
        background: #d40026;
        box-shadow: 0 0 8px rgba(212, 0, 38, 0.8);
      }

      .hotspot-pin.active .hotspot-pin-pulse {
        animation: wx-hotspot-pulse 2s cubic-bezier(0.24, 0, 0.38, 1) infinite;
      }

      @keyframes wx-hotspot-pulse {
        0% {
          transform: scale(0.9);
          opacity: 0.85;
        }
        100% {
          transform: scale(1.65);
          opacity: 0;
        }
      }


      /* Cột Accordion */
      .accordion-col {
        display: flex;
        flex-direction: column;
        border-top: 1px solid #e5e5e5;
      }

      .accordion-row {
        border-bottom: 1px solid #e5e5e5;
      }

      .accordion-btn {
        width: 100%;
        background: none;
        border: none;
        padding: 16px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        text-align: left;
        color: #111111;
        transition: color 0.15s ease;
      }

      .accordion-btn:hover {
        color: #d40026;
      }

      .accordion-title {
        font-size: 18px;
        font-weight: 800;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        margin: 0;
      }

      .accordion-row.active .accordion-title {
        color: #111111;
      }

      .accordion-icon {
        font-size: 12px;
        color: #111111;
        transition: transform 0.2s ease;
      }

      .accordion-details {
        padding: 0 0 16px 0;
        font-size: 16px;
        line-height: 1.6;
        color: #555555;
        animation: wx-fade-down 0.2s ease-out;
      }

      @keyframes wx-fade-down {
        from {
          opacity: 0;
          transform: translateY(-4px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* -----------------------------------------
       * COMPONENT 3: INTRO BANNER
       * ----------------------------------------- */
      .intro-banner {
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
        padding: 40px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
      }

      .intro-heading {
        font-size: 24px;
        font-weight: 800;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #111111;
        margin: 0;
      }

      .intro-body {
        font-size: 14px;
        line-height: 1.7;
        color: #555555;
      }
    `]),S("wx-feature-blocks",W);class He extends W{constructor(){super(),this.type="story"}}S("wx-story-section",He);class Oe extends W{constructor(){super(),this.type="highlights"}}S("wx-hotspot-section",Oe);const Ye=[{id:"store-crescent-mall",ID:"store-crescent-mall",title:"ZWILLING CRESCENT MALL",address:"Tầng 4F - 33, Crescent Mall, 101 Tôn Dật Tiên, Phường Tân Phú, Quận 7, TP.HCM",city:"TP. Hồ Chí Minh",hotline:"028 399 07010",openHours:"10:00 - 22:00",latitude:10.7293,longitude:106.7198,googleMapsUrl:"https://maps.google.com/?q=Crescent+Mall+101+Ton+Dat+Tien+Tan+Phu+Quan+7+TPHCM",image:"/images/store-crescent-mall.jpg",position:1},{id:"store-estella-place",ID:"store-estella-place",title:"ZWILLING ESTELLA PLACE",address:"Tầng 3 - Estella Place, 88 Song Hành, Phường An Phú, TP. Thủ Đức, TP.HCM",city:"TP. Hồ Chí Minh",hotline:"0283 519 3209",openHours:"09:30 - 22:00",latitude:10.8016,longitude:106.7431,googleMapsUrl:"https://maps.google.com/?q=Estella+Place+88+Song+Hanh+An+Phu+TP+Thu+Duc+TPHCM",image:"/images/store-estella.jpg",position:2},{id:"store-lotte-lieu-giai",ID:"store-lotte-lieu-giai",title:"ZWILLING LOTTE DEPARTMENT STORE",address:"Tầng 5 - Lotte Department Store, 54 Liễu Giai, Phường Cống Vị, Ba Đình, Hà Nội",city:"Hà Nội",hotline:"0243 212 1177",openHours:"09:30 - 22:00",latitude:21.0318,longitude:105.8142,googleMapsUrl:"https://maps.google.com/?q=Lotte+Department+Store+54+Lieu+Giai+Ba+Dinh+Ha+Noi",image:"/images/store-lotte.jpg",position:3}];class ce extends C{constructor(){super(),this.stores=[],this.data=null,this.selectedStoreId="",this.searchQuery="",this.selectedCity="all",this.onlyOpen=!1,this.activeTab="list",this.lang="vi",this._boundOnMessage=null,this._lastStoresKey="",this._cachedSrcDoc=""}connectedCallback(){super.connectedCallback(),this._boundOnMessage=this._onWindowMessage.bind(this),window.addEventListener("message",this._boundOnMessage)}disconnectedCallback(){super.disconnectedCallback(),this._boundOnMessage&&window.removeEventListener("message",this._boundOnMessage)}_onWindowMessage(e){if(e.data&&e.data.type==="STORE_MARKER_CLICK"){const t=String(e.data.id||"");if(t){this.selectedStoreId=t;const i=this.shadowRoot.querySelector(`[data-store-id="${t}"]`);i&&i.scrollIntoView({behavior:"smooth",block:"nearest"})}}else if(e.data&&e.data.type==="MAP_READY"&&this.selectedStoreId){const t=this.shadowRoot.getElementById("storeMapFrame");t&&t.contentWindow&&t.contentWindow.postMessage({type:"FLY_TO_STORE",id:this.selectedStoreId},"*")}}firstUpdated(){this._initStoreSelection()}updated(e){(e.has("stores")||e.has("data"))&&this._initStoreSelection()}_getStoreId(e,t=0){return!e||typeof e!="object"?`store-${t}`:String(e._id||e.id||e.ID||e.storeId||e.title||`store-${t}`)}_getEffectiveStores(){let e=[];return Array.isArray(this.stores)&&this.stores.length>0?e=this.stores:this.data&&Array.isArray(this.data.stores)&&this.data.stores.length>0?e=this.data.stores:e=Ye,e.map((t,i)=>{const r=this._getStoreId(t,i),s=Number(t.latitude||t.lat||t.Latitude)||0,o=Number(t.longitude||t.lng||t.Longitude)||0,a=t.title||t.name||"ZWILLING Store",c=t.address||t.diaChi||"";return{...t,id:r,_id:r,ID:r,title:a,address:c,city:t.city||t.thanhPho||"",hotline:t.hotline||t.phone||t.soDienThoai||"",openHours:t.openHours||t.gioMoCua||"09:30 - 22:00",latitude:s,longitude:o,googleMapsUrl:t.googleMapsUrl||t.mapUrl||(s&&o?`https://www.google.com/maps?q=${s},${o}`:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a+" "+c)}`),image:t.image||t.hinhAnh||t.thumbnail||""}})}_isCityMatch(e,t){if(!t||t==="all")return!0;if(!e)return!1;const i=e.trim().toLowerCase(),r=t.trim().toLowerCase();if(i.includes(r)||r.includes(i))return!0;const s=["tp.hcm","hcm","tp. hcm","hồ chí minh","ho chi minh","tp. hồ chí minh","tp hồ chí minh"],o=s.some(p=>i.includes(p)),a=s.some(p=>r.includes(p));if(o&&a)return!0;const c=["hà nội","ha noi","hn"],g=c.some(p=>i.includes(p)),u=c.some(p=>r.includes(p));return!!(g&&u)}_initStoreSelection(){const e=this._getFilteredStores();e.length>0&&(!this.selectedStoreId||!e.some(t=>t.id===this.selectedStoreId))&&(this.selectedStoreId=e[0].id)}_getFilteredStores(){const e=this._getEffectiveStores(),t=(this.searchQuery||"").trim().toLowerCase(),i=this.selectedCity;return e.filter(r=>!(!this._isCityMatch(r.city,i)||t&&![r.title,r.name,r.address,r.city,r.hotline].filter(Boolean).join(" ").toLowerCase().includes(t)))}_getCitiesList(){const e=this._getEffectiveStores(),t=new Map;return e.forEach(i=>{const r=(i.city||"").trim();if(!r)return;let s=r,o=r;const a=r.toLowerCase();a.includes("hồ chí minh")||a.includes("hcm")?(s="TP.HCM",o="TP.HCM"):(a.includes("hà nội")||a.includes("hn"))&&(s="Hà Nội",o="Hà Nội");const c=t.get(o)||{label:s,filterValue:o,count:0};c.count+=1,t.set(o,c)}),Array.from(t.values())}_isCityActive(e){return this.selectedCity==="all"?!1:this._isCityMatch(e,this.selectedCity)}_onSearchInput(e){this.searchQuery=e.target.value}_onSelectCity(e){this.selectedCity=e,this._initStoreSelection();const i=this._getFilteredStores().map(s=>s.id),r=this.shadowRoot.getElementById("storeMapFrame");r&&r.contentWindow&&r.contentWindow.postMessage({type:"FIT_BOUNDS",ids:i},"*")}_selectStore(e){const t=this._getStoreId(e);this.selectedStoreId=t,this.activeTab="map";const i=this.shadowRoot.getElementById("storeMapFrame");i&&i.contentWindow&&i.contentWindow.postMessage({type:"FLY_TO_STORE",id:t},"*")}_getMapIframeSrcDoc(e){const t=e.map(r=>`${r.id}:${r.latitude}:${r.longitude}`).join("|");if(this._lastStoresKey===t&&this._cachedSrcDoc)return this._cachedSrcDoc;this._lastStoresKey=t;const i=JSON.stringify(e.map(r=>({id:String(r.id),title:r.title||"",address:r.address||"",hotline:r.hotline||"",openHours:r.openHours||"09:30 - 22:00",latitude:Number(r.latitude)||0,longitude:Number(r.longitude)||0,googleMapsUrl:r.googleMapsUrl||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((r.title||"")+" "+(r.address||""))}`})));return this._cachedSrcDoc=`<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ZWILLING Store Locations Map</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #eef2f5;
    }
    #map {
      width: 100%;
      height: 100%;
    }
    .leaflet-popup-content-wrapper {
      border-radius: 4px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.18);
      padding: 0;
    }
    .leaflet-popup-content {
      margin: 12px 14px;
      line-height: 1.4;
    }
    .popup-box {
      font-size: 12px;
    }
    .popup-title {
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #111111;
      margin: 0 0 4px 0;
    }
    .popup-address {
      font-size: 12px;
      color: #555555;
      margin: 0 0 6px 0;
    }
    .popup-hotline {
      font-size: 12px;
      font-weight: 700;
      color: #d40026;
      margin: 0 0 8px 0;
    }
    .popup-btn {
      display: inline-block;
      padding: 5px 12px;
      background: #111111;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      border-radius: 2px;
      transition: background 0.2s;
    }
    .popup-btn:hover {
      background: #333333;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const stores = ${i};

    const map = L.map('map', {
      center: [16.0471, 107.8443],
      zoom: 6,
      zoomControl: true,
      scrollWheelZoom: true
    });

    // Google Maps Tile Layer
    L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google Maps'
    }).addTo(map);

    // Custom Red Pin
    const redPin = L.divIcon({
      className: 'zwilling-pin',
      html: '<div style="width:32px;height:32px;background:#d40026;border:2.5px solid #ffffff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 4px 10px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><div style="width:10px;height:10px;background:#ffffff;border-radius:50%;transform:rotate(45deg);"></div></div>',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const markers = {};
    const bounds = [];

    stores.forEach(s => {
      if (s.latitude && s.longitude) {
        bounds.push([s.latitude, s.longitude]);
        const m = L.marker([s.latitude, s.longitude], { icon: redPin }).addTo(map);

        const popupHtml = '<div class="popup-box">' +
          '<div class="popup-title">' + (s.title || '') + '</div>' +
          '<div class="popup-address">' + (s.address || '') + '</div>' +
          '<div class="popup-hotline">Hotline: ' + (s.hotline || '') + '</div>' +
          '<a class="popup-btn" href="' + s.googleMapsUrl + '" target="_blank">Chỉ đường ↗</a>' +
          '</div>';

        m.bindPopup(popupHtml);

        m.on('click', () => {
          window.parent.postMessage({ type: 'STORE_MARKER_CLICK', id: s.id }, '*');
        });

        markers[String(s.id)] = m;
      }
    });

    // Khởi tạo vị trí ban đầu
    if (bounds.length === 1) {
      map.setView(bounds[0], 15);
      if (stores[0] && markers[String(stores[0].id)]) {
        markers[String(stores[0].id)].openPopup();
      }
    } else if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }

    // Báo cho parent component là map đã sẵn sàng
    try {
      window.parent.postMessage({ type: 'MAP_READY' }, '*');
    } catch (e) {}

    // Nhận thông điệp từ ngoài component
    window.addEventListener('message', (e) => {
      if (!e.data) return;
      if (e.data.type === 'FLY_TO_STORE') {
        const id = String(e.data.id || '');
        if (!id) return;
        const s = stores.find(x => String(x.id) === id);
        if (s && s.latitude && s.longitude) {
          map.flyTo([s.latitude, s.longitude], 15, { duration: 1.0 });
          if (markers[id]) {
            markers[id].openPopup();
          }
        }
      } else if (e.data.type === 'FIT_BOUNDS') {
        const activeIds = (e.data.ids || []).map(x => String(x));
        const activeBounds = stores
          .filter(x => activeIds.includes(String(x.id)))
          .filter(x => x.latitude && x.longitude)
          .map(x => [x.latitude, x.longitude]);
        if (activeBounds.length === 1) {
          map.flyTo(activeBounds[0], 15, { duration: 1.0 });
          const single = stores.find(x => activeIds.includes(String(x.id)));
          if (single && markers[String(single.id)]) {
            markers[String(single.id)].openPopup();
          }
        } else if (activeBounds.length > 1) {
          map.fitBounds(activeBounds, { padding: [50, 50], maxZoom: 14 });
        }
      }
    });
  <\/script>
</body>
</html>`,this._cachedSrcDoc}render(){const e=this._getFilteredStores(),t=this._getCitiesList();return l`
      <!-- Mobile Toggle Tabs (Danh sách / Bản đồ) -->
      <div class="mobile-view-toggle">
        <button
          class="toggle-btn ${this.activeTab==="list"?"active":""}"
          @click="${()=>{this.activeTab="list"}}"
        >
          Danh sách (${e.length})
        </button>
        <button
          class="toggle-btn ${this.activeTab==="map"?"active":""}"
          @click="${()=>{this.activeTab="map"}}"
        >
          Bản đồ
        </button>
      </div>

      <!-- Main Layout -->
      <div class="locator-layout">
        <!-- Cột trái: Tìm kiếm & Danh sách Showroom -->
        <aside class="sidebar ${this.activeTab==="map"?"mobile-hide":""}">
          <div class="search-box">
            <input
              type="text"
              class="search-input"
              placeholder="Search locations..."
              .value="${this.searchQuery}"
              @input="${this._onSearchInput}"
            />
            <button class="search-btn" type="button">Search</button>
          </div>

          <div class="filter-bar">
            <div class="city-pills">
              <button
                class="city-pill ${this.selectedCity==="all"?"active":""}"
                @click="${()=>this._onSelectCity("all")}"
              >
                Tất cả (${this._getEffectiveStores().length})
              </button>
              ${t.map(i=>l`
                <button
                  class="city-pill ${this._isCityActive(i.filterValue)?"active":""}"
                  @click="${()=>this._onSelectCity(i.filterValue)}"
                >
                  ${i.label} (${i.count})
                </button>
              `)}
            </div>

            <label class="open-filter">
              <input
                type="checkbox"
                .checked="${this.onlyOpen}"
                @change="${i=>{this.onlyOpen=i.target.checked}}"
              />
              Only open locations
            </label>
          </div>

          <ul class="store-list">
            ${e.length===0?l`<li class="empty-state">Không tìm thấy cửa hàng phù hợp.</li>`:e.map(i=>{const r=i.id,s=r===this.selectedStoreId;return l`
                    <li
                      class="store-card ${s?"active":""}"
                      data-store-id="${r}"
                      @click="${()=>this._selectStore(i)}"
                    >
                      <div class="store-info">
                        <h3 class="store-name">${i.title}</h3>
                        <p class="store-address">${i.address}</p>
                        <div class="store-hotline">
                          Hotline:
                          <a href="tel:${(i.hotline||"").replace(/\s+/g,"")}">
                            ${i.hotline}
                          </a>
                        </div>
                        <div class="store-status">
                          <span class="status-dot"></span>
                          <span>Open now ${i.openHours||"09:30 - 22:00"}</span>
                        </div>
                        <div class="store-actions">
                          <a
                            href="${i.googleMapsUrl||"#"}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="direction-link"
                            @click="${o=>o.stopPropagation()}"
                          >
                            Chỉ đường ↗
                          </a>
                        </div>
                      </div>

                      ${i.image?l`
                            <img
                              src="${P(i.image)}"
                              alt="${i.title}"
                              class="store-thumb"
                              loading="lazy"
                            />
                          `:""}
                    </li>
                  `})}
          </ul>
        </aside>

        <!-- Cột phải: Bản đồ tương tác -->
        <main class="map-wrapper ${this.activeTab==="list"?"mobile-hide":""}">
          <iframe
            id="storeMapFrame"
            class="map-iframe"
            title="ZWILLING Store Locations Map"
            .srcdoc="${this._getMapIframeSrcDoc(e)}"
          ></iframe>
        </main>
      </div>
    `}}v(ce,"properties",{stores:{type:Array,converter:I},data:{type:Object,converter:I},selectedStoreId:{state:!0},searchQuery:{state:!0},selectedCity:{state:!0},onlyOpen:{state:!0},activeTab:{state:!0},lang:{type:String}}),v(ce,"styles",[ke,_`
      :host {
        display: block;
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 0 40px 0;
        font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        color: #111111;
        box-sizing: border-box;
      }

      *, *::before, *::after {
        box-sizing: border-box;
        font-family: inherit;
      }

      button, input, select, textarea, a, h1, h2, h3, h4, p, span, div {
        font-family: inherit;
      }

      /* ------------------------------------
       * MAIN 2-COLUMN LAYOUT
       * ------------------------------------ */
      .locator-layout {
        display: grid;
        grid-template-columns: 440px 1fr;
        gap: 24px;
        min-height: 680px;
        align-items: stretch;
      }

      @media (max-width: 1024px) {
        .locator-layout {
          grid-template-columns: 380px 1fr;
        }
      }

      @media (max-width: 860px) {
        .locator-layout {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
      }

      /* Mobile Toggle Tabs */
      .mobile-view-toggle {
        display: none;
      }

      @media (max-width: 860px) {
        .mobile-view-toggle {
          display: flex;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .toggle-btn {
          flex: 1;
          padding: 10px;
          border: none;
          background: #f8f9fa;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }

        .toggle-btn.active {
          background: #111111;
          color: #ffffff;
        }
      }

      /* ------------------------------------
       * LEFT COLUMN: STORE LIST & SEARCH
       * ------------------------------------ */
      .sidebar {
        display: flex;
        flex-direction: column;
        border: 1px solid #e6e6e6;
        border-radius: 4px;
        background: #ffffff;
        overflow: hidden;
        height: 680px;
      }

      @media (max-width: 860px) {
        .sidebar {
          height: auto;
          max-height: 580px;
        }
        .sidebar.mobile-hide {
          display: none;
        }
      }

      /* Search form */
      .search-box {
        display: flex;
        padding: 16px;
        border-bottom: 1px solid #e6e6e6;
        background: #fafafa;
        gap: 8px;
      }

      .search-input {
        flex: 1;
        height: 42px;
        padding: 0 14px;
        border: 1px solid #cccccc;
        border-radius: 2px;
        font-size: 13px;
        outline: none;
        transition: border-color 0.2s;
      }

      .search-input:focus {
        border-color: #111111;
      }

      .search-btn {
        height: 42px;
        padding: 0 20px;
        background: #111111;
        color: #ffffff;
        border: none;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        cursor: pointer;
        transition: background 0.2s;
        white-space: nowrap;
      }

      .search-btn:hover {
        background: #333333;
      }

      /* Filter bar */
      .filter-bar {
        padding: 12px 16px;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: #ffffff;
      }

      .city-pills {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }

      .city-pill {
        padding: 4px 12px;
        border: 1px solid #e0e0e0;
        border-radius: 20px;
        font-size: 12px;
        background: #ffffff;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .city-pill:hover {
        border-color: #999999;
      }

      .city-pill.active {
        background: #111111;
        border-color: #111111;
        color: #ffffff;
        font-weight: 600;
      }

      .open-filter {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: #444444;
        cursor: pointer;
        user-select: none;
      }

      .open-filter input[type="checkbox"] {
        accent-color: #d40026;
        cursor: pointer;
      }

      /* Store list scroll container */
      .store-list {
        flex: 1;
        overflow-y: auto;
        padding: 0;
        margin: 0;
        list-style: none;
      }

      .store-list::-webkit-scrollbar {
        width: 6px;
      }
      .store-list::-webkit-scrollbar-thumb {
        background: #d4d4d4;
        border-radius: 3px;
      }

      /* Store Card */
      .store-card {
        padding: 18px 16px;
        border-bottom: 1px solid #f0f0f0;
        cursor: pointer;
        display: flex;
        gap: 14px;
        position: relative;
        transition: background 0.15s ease;
      }

      .store-card:hover {
        background: #fbfbfb;
      }

      .store-card.active {
        background: #fbf6f6;
        border-left: 4px solid #d40026;
      }

      .store-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .store-name {
        font-size: 14px;
        font-weight: 800;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: #111111;
        margin: 0;
        line-height: 1.4;
      }

      .store-address {
        font-size: 13px;
        color: #555555;
        line-height: 1.5;
        margin: 0;
      }

      .store-hotline {
        font-size: 13px;
        color: #111111;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 2px;
      }

      .store-hotline a {
        color: #d40026;
        text-decoration: none;
      }

      .store-hotline a:hover {
        text-decoration: underline;
      }

      .store-status {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: #444444;
        margin-top: 4px;
      }

      .status-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #10b981;
        display: inline-block;
      }

      .store-actions {
        display: flex;
        gap: 12px;
        margin-top: 6px;
      }

      .direction-link {
        font-size: 12px;
        font-weight: 600;
        color: #111111;
        text-decoration: underline;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }

      .direction-link:hover {
        color: #d40026;
      }

      .store-thumb {
        width: 72px;
        height: 72px;
        border-radius: 2px;
        object-fit: cover;
        background: #f0f0f0;
        flex-shrink: 0;
      }

      .empty-state {
        padding: 32px 16px;
        text-align: center;
        color: #888888;
        font-size: 13px;
      }

      /* ------------------------------------
       * RIGHT COLUMN: INTERACTIVE MAP
       * ------------------------------------ */
      .map-wrapper {
        border: 1px solid #e6e6e6;
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        background: #eef2f5;
        height: 680px;
      }

      @media (max-width: 860px) {
        .map-wrapper {
          height: 480px;
        }
        .map-wrapper.mobile-hide {
          display: none;
        }
      }

      .map-iframe {
        width: 100%;
        height: 100%;
        border: none;
        display: block;
      }
    `]),S("wx-store-locator",ce),console.log("[my-wix-ui-lib] Đã đăng ký thành công 5 Web Components tái sử dụng (Lit 3)"),m.DEFAULT_STORES=Ye,m.WxBreadcrumb=oe,m.WxCategoryCarousel=X,m.WxFeatureBlocks=W,m.WxHotspotSection=Oe,m.WxProductCard=ne,m.WxProductCarousel=ee,m.WxProductDetail=le,m.WxProductListing=ae,m.WxRelatedProducts=te,m.WxStoreLocator=ce,m.WxStorySection=He,m.dispatchCustomEvent=B,m.formatCurrencyVND=z,m.parseGallery=ve,m.safeDefine=S,m.safeJsonParse=ye,m.t=d,m.themeStyles=ke,m.translations=se,Object.defineProperty(m,Symbol.toStringTag,{value:"Module"})})(this.MyWixUiLib=this.MyWixUiLib||{});
