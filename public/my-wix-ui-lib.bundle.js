/* eslint-disable */
/* global globalThis, litPropertyMetadata */
var globalThis = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this;
if (!globalThis.litPropertyMetadata) {
  globalThis.litPropertyMetadata = new WeakMap();
}
var litPropertyMetadata = globalThis.litPropertyMetadata;
var ct=Object.defineProperty;var dt=(m,k,C)=>k in m?ct(m,k,{enumerable:!0,configurable:!0,writable:!0,value:C}):m[k]=C;var x=(m,k,C)=>dt(m,typeof k!="symbol"?k+"":k,C);(function(m){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var De;const k=globalThis,C=k.ShadowRoot&&(k.ShadyCSS===void 0||k.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,le=Symbol(),ye=new WeakMap;let ve=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==le)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(C&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=ye.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&ye.set(t,e))}return e}toString(){return this.cssText}};const je=o=>new ve(typeof o=="string"?o:o+"",void 0,le),S=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((s,i,r)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[r+1],o[0]);return new ve(t,o,le)},We=(o,e)=>{if(C)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=k.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,o.appendChild(s)}},we=C?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return je(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ge,defineProperty:Ye,getOwnPropertyDescriptor:qe,getOwnPropertyNames:Ve,getOwnPropertySymbols:Ze,getPrototypeOf:Ke}=Object,I=globalThis,$e=I.trustedTypes,Xe=$e?$e.emptyScript:"",ce=I.reactiveElementPolyfillSupport,D=(o,e)=>o,de={toAttribute(o,e){switch(e){case Boolean:o=o?Xe:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},ke=(o,e)=>!Ge(o,e),_e={attribute:!0,type:String,converter:de,reflect:!1,useDefault:!1,hasChanged:ke};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),I.litPropertyMetadata??(I.litPropertyMetadata=new WeakMap);let R=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_e){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&Ye(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:r}=qe(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:i,set(a){const l=i==null?void 0:i.call(this);r==null||r.call(this,a),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_e}static _$Ei(){if(this.hasOwnProperty(D("elementProperties")))return;const e=Ke(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(D("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(D("properties"))){const t=this.properties,s=[...Ve(t),...Ze(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(we(i))}else e!==void 0&&t.push(we(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return We(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var r;const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const a=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:de).toAttribute(t,s.type);this._$Em=e,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,t){var r,a;const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),c=typeof l.converter=="function"?{fromAttribute:l.converter}:((r=l.converter)==null?void 0:r.fromAttribute)!==void 0?l.converter:de;this._$Em=i;const h=c.fromAttribute(t,l.type);this[i]=h??((a=this._$Ej)==null?void 0:a.get(i))??h,this._$Em=null}}requestUpdate(e,t,s,i=!1,r){var a;if(e!==void 0){const l=this.constructor;if(i===!1&&(r=this[e]),s??(s=l.getPropertyOptions(e)),!((s.hasChanged??ke)(r,t)||s.useDefault&&s.reflect&&r===((a=this._$Ej)==null?void 0:a.get(e))&&!this.hasAttribute(l._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:r},a){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),r!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,a]of i){const{wrapped:l}=a,c=this[r];l!==!0||this._$AL.has(r)||c===void 0||this.C(r,void 0,a,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(i=>{var r;return(r=i.hostUpdate)==null?void 0:r.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};R.elementStyles=[],R.shadowRootOptions={mode:"open"},R[D("elementProperties")]=new Map,R[D("finalized")]=new Map,ce==null||ce({ReactiveElement:R}),(I.reactiveElementVersions??(I.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const F=globalThis,Se=o=>o,J=F.trustedTypes,Ae=J?J.createPolicy("lit-html",{createHTML:o=>o}):void 0,Ce="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,Ie="?"+P,Je=`<${Ie}>`,E=document,j=()=>E.createComment(""),W=o=>o===null||typeof o!="object"&&typeof o!="function",pe=Array.isArray,Qe=o=>pe(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",he=`[ 	
\f\r]`,G=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pe=/-->/g,Te=/>/g,N=RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ze=/'/g,Ee=/"/g,Ne=/^(?:script|style|textarea|title)$/i,et=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),n=et(1),H=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),Le=new WeakMap,L=E.createTreeWalker(E,129);function Me(o,e){if(!pe(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ae!==void 0?Ae.createHTML(e):e}const tt=(o,e)=>{const t=o.length-1,s=[];let i,r=e===2?"<svg>":e===3?"<math>":"",a=G;for(let l=0;l<t;l++){const c=o[l];let h,g,d=-1,b=0;for(;b<c.length&&(a.lastIndex=b,g=a.exec(c),g!==null);)b=a.lastIndex,a===G?g[1]==="!--"?a=Pe:g[1]!==void 0?a=Te:g[2]!==void 0?(Ne.test(g[2])&&(i=RegExp("</"+g[2],"g")),a=N):g[3]!==void 0&&(a=N):a===N?g[0]===">"?(a=i??G,d=-1):g[1]===void 0?d=-2:(d=a.lastIndex-g[2].length,h=g[1],a=g[3]===void 0?N:g[3]==='"'?Ee:ze):a===Ee||a===ze?a=N:a===Pe||a===Te?a=G:(a=N,i=void 0);const f=a===N&&o[l+1].startsWith("/>")?" ":"";r+=a===G?c+Je:d>=0?(s.push(h),c.slice(0,d)+Ce+c.slice(d)+P+f):c+P+(d===-2?l:f)}return[Me(o,r+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class Y{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let r=0,a=0;const l=e.length-1,c=this.parts,[h,g]=tt(e,t);if(this.el=Y.createElement(h,s),L.currentNode=this.el.content,t===2||t===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=L.nextNode())!==null&&c.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(Ce)){const b=g[a++],f=i.getAttribute(d).split(P),u=/([.?@])?(.*)/.exec(b);c.push({type:1,index:r,name:u[2],strings:f,ctor:u[1]==="."?st:u[1]==="?"?rt:u[1]==="@"?ot:Q}),i.removeAttribute(d)}else d.startsWith(P)&&(c.push({type:6,index:r}),i.removeAttribute(d));if(Ne.test(i.tagName)){const d=i.textContent.split(P),b=d.length-1;if(b>0){i.textContent=J?J.emptyScript:"";for(let f=0;f<b;f++)i.append(d[f],j()),L.nextNode(),c.push({type:2,index:++r});i.append(d[b],j())}}}else if(i.nodeType===8)if(i.data===Ie)c.push({type:2,index:r});else{let d=-1;for(;(d=i.data.indexOf(P,d+1))!==-1;)c.push({type:7,index:r}),d+=P.length-1}r++}}static createElement(e,t){const s=E.createElement("template");return s.innerHTML=e,s}}function U(o,e,t=o,s){var a,l;if(e===H)return e;let i=s!==void 0?(a=t._$Co)==null?void 0:a[s]:t._$Cl;const r=W(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==r&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),r===void 0?i=void 0:(i=new r(o),i._$AT(o,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=U(o,i._$AS(o,e.values),i,s)),e}class it{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=((e==null?void 0:e.creationScope)??E).importNode(t,!0);L.currentNode=i;let r=L.nextNode(),a=0,l=0,c=s[0];for(;c!==void 0;){if(a===c.index){let h;c.type===2?h=new q(r,r.nextSibling,this,e):c.type===1?h=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(h=new at(r,this,e)),this._$AV.push(h),c=s[++l]}a!==(c==null?void 0:c.index)&&(r=L.nextNode(),a++)}return L.currentNode=E,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class q{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),W(e)?e===y||e==null||e===""?(this._$AH!==y&&this._$AR(),this._$AH=y):e!==this._$AH&&e!==H&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Qe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==y&&W(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Y.createElement(Me(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)==null?void 0:r._$AD)===i)this._$AH.p(t);else{const a=new it(i,this),l=a.u(this.options);a.p(t),this.T(l),this._$AH=a}}_$AC(e){let t=Le.get(e.strings);return t===void 0&&Le.set(e.strings,t=new Y(e)),t}k(e){pe(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const r of e)i===t.length?t.push(s=new q(this.O(j()),this.O(j()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e!==this._$AB;){const i=Se(e).nextSibling;Se(e).remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=y}_$AI(e,t=this,s,i){const r=this.strings;let a=!1;if(r===void 0)e=U(this,e,t,0),a=!W(e)||e!==this._$AH&&e!==H,a&&(this._$AH=e);else{const l=e;let c,h;for(e=r[0],c=0;c<r.length-1;c++)h=U(this,l[s+c],t,c),h===H&&(h=this._$AH[c]),a||(a=!W(h)||h!==this._$AH[c]),h===y?e=y:e!==y&&(e+=(h??"")+r[c+1]),this._$AH[c]=h}a&&!i&&this.j(e)}j(e){e===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class st extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===y?void 0:e}}class rt extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==y)}}class ot extends Q{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=U(this,e,t,0)??y)===H)return;const s=this._$AH,i=e===y&&s!==y||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==y&&(s===y||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class at{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}}const ge=F.litHtmlPolyfillSupport;ge==null||ge(Y,q),(F.litHtmlVersions??(F.litHtmlVersions=[])).push("3.3.3");const nt=(o,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let i=s._$litPart$;if(i===void 0){const r=(t==null?void 0:t.renderBefore)??null;s._$litPart$=i=new q(e.insertBefore(j(),r),r,void 0,t??{})}return i._$AI(o),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=globalThis;class $ extends R{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=nt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return H}}$._$litElement$=!0,$.finalized=!0,(De=M.litElementHydrateSupport)==null||De.call(M,{LitElement:$});const fe=M.litElementPolyfillSupport;fe==null||fe({LitElement:$}),(M.litElementVersions??(M.litElementVersions=[])).push("4.2.2");function v(o,e){if(!(typeof window>"u"||!window.customElements||window.customElements.get(o)))try{window.customElements.define(o,e)}catch(s){if(s.name==="NotSupportedError"&&s.message.includes("constructor")){class i extends e{}window.customElements.define(o,i)}else console.warn(`[my-wix-ui-lib] Không thể đăng ký ${o}:`,s)}}function B(o,e,t={}){const s=new CustomEvent(e,{detail:t,bubbles:!0,composed:!0,cancelable:!0});return o.dispatchEvent(s),s}function V(o){if(o==null||o==="")return"";if(typeof o=="string"){const e=Number(o.replace(/[^\d]/g,""));!isNaN(e)&&e>0&&(o=e)}return isNaN(o)||Number(o)<=0?"":new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",maximumFractionDigits:0}).format(o)}function Be(o){if(!o||typeof o!="object")return{price:0,comparePrice:null,discountPercent:null};const e=l=>{if(l==null||l==="")return 0;if(typeof l=="number")return isNaN(l)?0:l;if(typeof l=="string"){const c=Number(l.replace(/[^\d]/g,""));return isNaN(c)?0:c}return 0},t=e(o.maxPrice)||e(o.compareAtPrice)||e(o.price),s=e(o.minPrice);let i=0,r=null,a=null;return t>0&&s>0&&t>s?(i=s,r=t,a=Math.round((t-s)/t*100)):(i=t||s||e(o.price),r=null,a=null),{price:i,comparePrice:r,discountPercent:a}}function ue(o,e=null){if(!o)return e;if(typeof o=="object")return o;try{return JSON.parse(o)}catch{return e}}function T(o,e=""){if(!o||(typeof o=="object"&&o&&(o=o.src||o.url||e),typeof o!="string"))return e;const t=o.trim();if(!t)return e;if(t.startsWith("wix:image://")){const s=t.split("/");if(s.length>=4)return`https://static.wixstatic.com/media/${s[3].split("#")[0]}`}return t}function me(o){if(!o)return[];if(typeof o=="string"){const e=o.trim();if(e.startsWith("[")||e.startsWith("{"))try{const t=JSON.parse(e);t&&(o=t)}catch{}}return Array.isArray(o)?o.map(e=>e?typeof e=="object"?e.src||e.url||"":String(e):"").filter(Boolean):typeof o!="string"?[]:o.split(";").map(e=>e.trim()).filter(Boolean)}function Re(o){return typeof o!="string"?"":o.replace(/&quot;/g,'"').replace(/&#34;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">")}const w={fromAttribute(o){if(!o)return[];if(typeof o=="object")return Array.isArray(o)?o:[o];try{let e=typeof o=="string"?Re(o.trim()):"";if(e.startsWith("[")||e.startsWith("{")){const t=JSON.parse(e);return Array.isArray(t)?t:[t]}if(e.includes(">")||e.includes(",")){const t=e.includes(">")?">":",";return e.split(t).map(s=>s.trim()).filter(Boolean).map((s,i,r)=>({label:s,url:i===0?"/":i===r.length-1?"#":""}))}return e?[{label:e,url:"#"}]:[]}catch(e){return console.warn("[jsonArrayConverter] Lỗi parse JSON:",e,o),[]}},toAttribute(o){return JSON.stringify(o)}},_={fromAttribute(o){if(!o)return null;if(typeof o=="object")return o;try{let e=typeof o=="string"?Re(o.trim()):"";return JSON.parse(e)}catch(e){return console.warn("[jsonObjectConverter] Lỗi parse JSON:",e,o),null}},toAttribute(o){return JSON.stringify(o)}},be={fromAttribute(o){if(o==null)return!1;if(typeof o=="boolean")return o;const e=String(o).trim().toLowerCase();return!(e==="false"||e==="0"||e===""||e==="null"||e==="undefined")},toAttribute(o){return o?"true":null}},ee={vi:{resultsCount:o=>`${o} sản phẩm`,sortBy:"Sắp xếp theo",sortPriceAsc:"Giá: Thấp đến Cao",sortPriceDesc:"Giá: Cao đến Thấp",sortTitleAsc:"Tên: A đến Z",filterCategory:"Danh mục",filterBrand:"Thương hiệu",filterPrice:"Mức giá",clearAll:"Xóa tất cả",emptyProducts:"Không có sản phẩm nào phù hợp với bộ lọc.",showingItems:(o,e)=>`Đang hiển thị ${o} trên tổng số ${e} sản phẩm`,loadMore:"XEM THÊM SẢN PHẨM",searchFilters:"BỘ LỌC TÌM KIẾM",clear:"Xóa",categories:"DANH MỤC",allCategories:"Tất cả danh mục",noCategories:"Không có danh mục nào",brands:"THƯƠNG HIỆU",allBrands:"Tất cả thương hiệu",priceRange:"KHOẢNG GIÁ",allPrices:"Tất cả mức giá",priceUnder1m:"Dưới 1.000.000 ₫",price1mTo3m:"1.000.000 ₫ - 3.000.000 ₫",price3mTo5m:"3.000.000 ₫ - 5.000.000 ₫",priceOver5m:"Trên 5.000.000 ₫",reset:"Thiết lập lại",viewResults:o=>`Xem ${o} sản phẩm`,close:"Đóng",productFilterAria:"Bộ lọc sản phẩm",contactUs:"Liên hệ",noImage:"Chưa có ảnh",prevImage:"Ảnh trước",nextImage:"Ảnh sau",seriesLabel:o=>`Dòng sản phẩm: ${o}`,reviewsCount:o=>`(${o} Đánh giá)`,highlights:"Đặc điểm nổi bật:",descriptionTab:"MÔ TẢ SẢN PHẨM",specsTab:"THÔNG SỐ KỸ THUẬT",instructionsTab:"HƯỚNG DẪN SỬ DỤNG & BẢO QUẢN",noDescription:"Chưa có thông tin mô tả cho sản phẩm này.",noSpecs:"Chưa có thông số kỹ thuật.",defaultInstructions:["Vệ sinh bằng tay với nước ấm và xà phòng nhẹ sau khi sử dụng.","Lau khô hoàn toàn trước khi cất giữ.","Bảo quản nơi khô ráo, thoáng mát."],relatedProducts:"SẢN PHẨM LIÊN QUAN",toolbarResults:o=>`${o} KẾT QUẢ`,allBrandsToolbar:"Tất cả Thương hiệu",allCategoriesToolbar:"Tất cả Danh mục",sortDefault:"Sắp xếp: Mặc định",clearFilters:"Xóa bộ lọc",brandSectionTitle:"THƯƠNG HIỆU",seriesSectionTitle:"DÒNG SẢN PHẨM",seriesTag:"Dòng sản phẩm",scrollLeft:"Cuộn sang trái",scrollRight:"Cuộn sang phải",home:"TRANG CHỦ",products:"SẢN PHẨM",brandsBreadcrumb:"THƯƠNG HIỆU",about:"GIỚI THIỆU",news:"TIN TỨC"},en:{resultsCount:o=>`${o} Results`,sortBy:"Sort by",sortPriceAsc:"Price: Low to High",sortPriceDesc:"Price: High to Low",sortTitleAsc:"Name: A to Z",filterCategory:"Category",filterBrand:"Brand",filterPrice:"Price",clearAll:"Clear All",emptyProducts:"No products found matching your filters.",showingItems:(o,e)=>`Showing ${o} of ${e} items`,loadMore:"LOAD MORE",searchFilters:"SEARCH FILTERS",clear:"Clear",categories:"CATEGORIES",allCategories:"All Categories",noCategories:"No categories found",brands:"BRANDS",allBrands:"All Brands",priceRange:"PRICE RANGE",allPrices:"All Prices",priceUnder1m:"Under 1,000,000 ₫",price1mTo3m:"1,000,000 ₫ - 3,000,000 ₫",price3mTo5m:"3,000,000 ₫ - 5,000,000 ₫",priceOver5m:"Over 5,000,000 ₫",reset:"Reset",viewResults:o=>`View ${o} products`,close:"Close",productFilterAria:"Product filters",contactUs:"Contact Us",noImage:"No image available",prevImage:"Previous image",nextImage:"Next image",seriesLabel:o=>`Series: ${o}`,reviewsCount:o=>`(${o} Reviews)`,highlights:"Highlights:",descriptionTab:"PRODUCT DESCRIPTION",specsTab:"SPECIFICATIONS",instructionsTab:"INSTRUCTIONS & CARE",noDescription:"No description available for this product.",noSpecs:"No specifications available.",defaultInstructions:["Hand wash with warm water and mild soap after use.","Dry completely before storage.","Store in a cool, dry place."],relatedProducts:"RELATED PRODUCTS",toolbarResults:o=>`${o} RESULTS`,allBrandsToolbar:"All Brands",allCategoriesToolbar:"All Categories",sortDefault:"Sort: Default",clearFilters:"Clear Filters",brandSectionTitle:"BRANDS",seriesSectionTitle:"SERIES",seriesTag:"Series",scrollLeft:"Scroll left",scrollRight:"Scroll right",home:"HOME",products:"PRODUCTS",brandsBreadcrumb:"BRANDS",about:"ABOUT US",news:"NEWS"}};function p(o,e="vi",...t){let s="vi";e&&typeof e=="string"?s=e.toLowerCase().startsWith("en")?"en":"vi":typeof document<"u"&&document.documentElement&&document.documentElement.lang&&(s=document.documentElement.lang.toLowerCase().startsWith("en")?"en":"vi");const i=ee[s]||ee.vi,r=i[o]!==void 0?i[o]:ee.vi[o];return typeof r=="function"?r(...t):r!==void 0?r:o}class te extends ${constructor(){super(),this.items=null,this.defaultItems="",this.current="",this.lang="vi",this.loading=!1}connectedCallback(){super.connectedCallback(),this._checkContext()}firstUpdated(e){super.firstUpdated(e),this._checkContext(),setTimeout(()=>this._checkContext(),200),setTimeout(()=>this._checkContext(),600)}_checkContext(){if(!this.items||!this.items.length){const e=this._getEffectiveItems();e&&e.length>0&&(this.items=e,this.loading=!1,this.requestUpdate())}}_getEffectiveItems(){if(this.items&&Array.isArray(this.items)&&this.items.length>0)return this.items;if(this.defaultItems){const e=w.fromAttribute(this.defaultItems);if(e&&e.length>0)return e}if(this.current)return[{label:"TRANG CHỦ",url:"/"},{label:this.current,url:"#"}];if(typeof document<"u"){try{if(document.querySelector("wx-store-locator")||document.querySelector("[data-locator]"))return[{label:"TRANG CHỦ",url:"/"},{label:"CỬA HÀNG",url:"/stores"}]}catch{}try{const e=(window.location.href||"")+" "+(window.location.pathname||"")+" "+(document.title||"");if(/store|cua-hang|cửa hàng/i.test(e))return[{label:"TRANG CHỦ",url:"/"},{label:"CỬA HÀNG",url:"/stores"}]}catch{}}return null}_formatLabel(e){if(!e||typeof e!="string")return"";const t=e.trim().toUpperCase();return t==="HOME"||t==="TRANG CHỦ"?p("home",this.lang):t==="PRODUCTS"||t==="SẢN PHẨM"?p("products",this.lang):t==="BRANDS"||t==="THƯƠNG HIỆU"?p("brandsBreadcrumb",this.lang):t==="ABOUT"||t==="ABOUT US"||t==="GIỚI THIỆU"||t==="VỀ CHÚNG TÔI"?p("about",this.lang):t==="BLOG"||t==="NEWS"||t==="BÀI VIẾT"||t==="TIN TỨC"?p("news",this.lang):e}_resolveUrl(e){if(!e||e==="#"||e==="")return"#";if(/^https?:\/\//i.test(e))return e;if(typeof window<"u"&&window.location){const t=window.location.hostname||"",s=window.location.pathname||"";if(t.includes("wixstudio.com")||t.includes("wixsite.com")){const i=s.split("/").filter(Boolean);if(i.length>0){const r="/"+i[0];if(e==="/")return r+"/";if(!e.startsWith(r))return e.startsWith("/")?`${r}${e}`:`${r}/${e}`}}}return e}_handleClick(e,t,s,i=this.items){if(i&&s===i.length-1)return;e.preventDefault(),B(this,"breadcrumb-click",{item:t,index:s});const r=t&&(t.url||t.link||t.href);if(!r||r==="#"||r==="")return;const a=this._resolveUrl(r);setTimeout(()=>{try{if(typeof window<"u"&&window.location){const l=(window.location.pathname||"").replace(/\/$/,""),c=a.replace(/\/$/,"");l!==c&&(window.location.href=a)}}catch{}},150)}render(){const e=this._getEffectiveItems();if((this.loading===!0||this.loading==="true"||!e&&this.items===null&&this.loading!==!1)&&!e)return n`
        <nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 8px;">
          <div class="skeleton-box" style="width: 70px; height: 14px;"></div>
          <span class="separator" aria-hidden="true">&#x203A;</span>
          <div class="skeleton-box" style="width: 100px; height: 14px;"></div>
        </nav>
      `;const i=e||[];return i.length?n`
      <nav aria-label="Breadcrumb">
        ${i.map((r,a)=>{const l=a===0,c=a===i.length-1,h=typeof r=="string"?r:r.label||r.title,g=this._formatLabel(h);return n`
            ${a>0?n`<span class="separator" aria-hidden="true">&#x203A;</span>`:""}
            <button
              class="crumb-btn ${l?"first":""} ${c?"active":""}"
              ?disabled="${c}"
              @click="${d=>this._handleClick(d,r,a,i)}"
              aria-current="${c?"page":"false"}"
            >
              ${g}
            </button>
          `})}
      </nav>
    `:n``}}x(te,"properties",{items:{type:Array,converter:w},defaultItems:{type:String,attribute:"default-items"},current:{type:String},lang:{type:String},loading:{type:Boolean,converter:be}}),x(te,"styles",S`
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
  `),v("wx-breadcrumb",te);class Z extends ${constructor(){super(),this.items=null,this.categories=null,this.data=null,this.selectedId="",this.lang="vi",this.loading=!1,this._progressLeft=0,this._progressWidth=30}firstUpdated(){this._track=this.shadowRoot.querySelector(".track"),this._checkScroll()}updated(e){(e.has("items")||e.has("categories")||e.has("data"))&&this._checkScroll()}_checkScroll(){const e=this.categories||this.data||this.items||[];this._track&&e.length>=6&&(this._track.addEventListener("scroll",()=>this._updateProgress()),this._updateProgress())}_updateProgress(){if(!this._track)return;const{scrollLeft:e,scrollWidth:t,clientWidth:s}=this._track,i=t-s;if(i<=0)this._progressWidth=100,this._progressLeft=0;else{this._progressWidth=Math.max(15,s/t*100);const a=100-this._progressWidth;this._progressLeft=e/i*a}const r=this.shadowRoot.querySelector(".progress-thumb");r&&(r.style.width=`${this._progressWidth}%`,r.style.left=`${this._progressLeft}%`)}_scroll(e){if(!this._track)return;const t=300*e;this._track.scrollBy({left:t,behavior:"smooth"})}_selectItem(e){this.selectedId=e._id||e.ID||e.id||e.slug,B(this,"category-select",{category:e})}render(){const e=this.categories||this.data||this.items,t=e!=null,s=Array.isArray(e)?e:[];if(t&&s.length===0&&!this.loading)return this.removeAttribute("has-items"),n``;if(!s.length)return n`
        <div class="carousel-wrapper">
          <div class="track static-grid" role="status" aria-label="Loading categories">
            ${[1,2,3,4,5].map(()=>n`
              <div class="skeleton-card">
                <div class="skeleton-box skeleton-img"></div>
                <div class="skeleton-box skeleton-label"></div>
              </div>
            `)}
          </div>
        </div>
      `;this.setAttribute("has-items","");const i=s.length>=6;return n`
      <div class="carousel-wrapper">
        <div class="track ${i?"":"static-grid"}" role="list">
          ${s.map(r=>{const a=r._id||r.ID||r.id||r.slug,l=this.selectedId===a,c=r.title||r.name||"",h=r.description||r.subtitle||r.desc||"",g=r.image||r.mainImage||r.bannerImage,d=g?T(g):"";return n`
              <button
                class="item-card ${l?"active":""}"
                @click="${()=>this._selectItem(r)}"
                role="listitem"
              >
                <div class="image-box">
                  ${d?n`
                        <img
                          src="${d}"
                          alt="${c}"
                          loading="lazy"
                          @error="${b=>{b.target.style.display="none";const f=b.target.parentElement.querySelector(".placeholder-box");f&&(f.style.display="flex")}}"
                        />
                        <div class="placeholder-box" style="display: none;">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                          <span>${p("noImage",this.lang)}</span>
                        </div>
                      `:n`
                        <div class="placeholder-box">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                          <span>${p("noImage",this.lang)}</span>
                        </div>
                      `}
                </div>
                <span class="item-label">${c}</span>
                ${h?n`<span class="item-description">${h}</span>`:""}
              </button>
            `})}
        </div>

        ${i?n`
              <div class="controls-row">
                <button class="nav-arrow-btn" @click="${()=>this._scroll(-1)}" aria-label="${p("scrollLeft",this.lang)}">&#x2039;</button>
                <div class="progress-track">
                  <div class="progress-thumb"></div>
                </div>
                <button class="nav-arrow-btn" @click="${()=>this._scroll(1)}" aria-label="${p("scrollRight",this.lang)}">&#x203A;</button>
              </div>
            `:""}
      </div>
    `}}x(Z,"properties",{items:{type:Array,converter:w},categories:{type:Array,converter:w},data:{type:Array,converter:w},selectedId:{type:String},lang:{type:String},loading:{type:Boolean}}),x(Z,"styles",S`
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
  `),v("wx-category-carousel",Z),v("wx-product-categories",class extends Z{});class ie extends ${constructor(){super(),this.product=null,this.activeImageIndex=0,this.lang="vi"}_getImages(){if(!this.product)return[];const e=this.product,t=[];if(e.mainImage){const i=T(e.mainImage);i&&t.push(i)}const s=e.gallery||e.media||e.images||e.mediaGallery;return s&&me(s).forEach(r=>{const a=T(r);a&&!t.includes(a)&&t.push(a)}),t}_prevImage(e,t){e.stopPropagation(),t.length&&(this.activeImageIndex=(this.activeImageIndex-1+t.length)%t.length)}_nextImage(e,t){e.stopPropagation(),t.length&&(this.activeImageIndex=(this.activeImageIndex+1)%t.length)}_onClick(){B(this,"product-click",{product:this.product})}render(){if(!this.product)return n``;const e=this.product,t=this._getImages(),s=t[this.activeImageIndex]||e.mainImage||(t.length?t[0]:""),{price:i,comparePrice:r,discountPercent:a}=Be(e),l=e.brand?e.brand.replace("brand-","").toUpperCase():"";let c=[];if(Array.isArray(e.labels))c=e.labels;else if(typeof e.labels=="string"){const u=ue(e.labels);if(Array.isArray(u))c=u;else if(e.labels.trim()&&e.labels!=="[]"){const z=e.labels.replace(/[\[\]"']/g,"").trim();z&&(c=[z])}}else e.label?c=[e.label]:e.ribbon&&(c=[e.ribbon]);if(e.isBestseller||e.bestseller){const u=this.lang==="vi"?"Bán chạy":"Bestseller";!c.includes(u)&&!c.includes("Bestseller")&&!c.includes("Bán chạy")&&c.unshift(u)}const h={"bán chạy":"Bestseller",mới:"New","mới mở bán":"New to sale","giảm giá":"On sale"},g={bestseller:"Bán chạy","best seller":"Bán chạy",new:"Mới","new to sale":"Mới mở bán","on sale":"Giảm giá"};c=c.filter(Boolean).map(u=>{const z=String(u).trim().toLowerCase();return this.lang==="en"?h[z]||u:g[z]||u});const d=t.length,b=d>1?100/d:100,f=d>1?this.activeImageIndex/d*100:0;return n`
      <div class="card" @click="${this._onClick}">
        <!-- Top Bar: % Giảm giá + Labels (Đã bỏ icon heart) -->
        <div class="top-bar">
          <div class="badges-group">
            ${a?n`<span class="badge-pill badge-discount">-${a}%</span>`:""}
            ${c.map(u=>n`<span class="badge-pill badge-label">${u}</span>`)}
          </div>
        </div>

        <!-- Image Viewport với Nút Next/Back Gallery khi Hover -->
        <div class="image-viewport">
          ${d>1?n`
                <button
                  class="nav-arrow prev"
                  @click="${u=>this._prevImage(u,t)}"
                  aria-label="${p("prevImage",this.lang)}"
                >
                  &#x2039;
                </button>
                <button
                  class="nav-arrow next"
                  @click="${u=>this._nextImage(u,t)}"
                  aria-label="${p("nextImage",this.lang)}"
                >
                  &#x203A;
                </button>
              `:""}

          ${s?n`<img src="${s}" alt="${e.title}" loading="lazy" />`:n`
                <div class="image-placeholder">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <span>${p("noImage",this.lang)}</span>
                </div>
              `}
        </div>

        <!-- Thanh chỉ báo ảnh hiện tại nếu có nhiều ảnh gallery -->
        ${d>1?n`
              <div class="image-progress-bar">
                <div
                  class="image-progress-thumb"
                  style="width: ${b}%; left: ${f}%;"
                ></div>
              </div>
            `:""}

        <div class="content-area">
          ${l?n`<div class="brand-title">${l}</div>`:""}
          <h3 class="product-title" title="${e.title}">${e.title}</h3>

          ${e.rating?n`
                <div class="rating-row">
                  <span class="stars">★★★★★</span>
                  <span class="rating-text">${e.rating} ${e.reviewCount?`(${e.reviewCount})`:""}</span>
                </div>
              `:""}

          ${e.sizeLabel?n`<div class="variant-sizes">${e.sizeLabel}</div>`:""}

          <div class="footer-row">
            <div class="price-col">
              ${r&&r>i?n`<span class="compare-price">${V(r)}</span>`:""}
              <span class="current-price">${i?V(i):p("contactUs",this.lang)}</span>
            </div>
          </div>
        </div>
      </div>
    `}}x(ie,"properties",{product:{type:Object,converter:_},data:{type:Object,converter:_},activeImageIndex:{type:Number},lang:{type:String}}),x(ie,"styles",S`
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
      margin-bottom: 10px;
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
  `),v("wx-product-card",ie);class K extends ${constructor(){super(),this.title="",this.products=null,this.items=null,this.data=null,this.lang="vi",this.loading=!1,this._progressLeft=0,this._progressWidth=25}firstUpdated(){this._track=this.shadowRoot.querySelector(".track"),this._initScroll()}updated(e){(e.has("products")||e.has("items")||e.has("data"))&&this._initScroll()}_initScroll(){this._track&&(this._track.addEventListener("scroll",()=>this._updateProgress()),this._updateProgress())}_updateProgress(){if(!this._track)return;const{scrollLeft:e,scrollWidth:t,clientWidth:s}=this._track,i=t-s;if(i<=0)this._progressWidth=100,this._progressLeft=0;else{this._progressWidth=Math.max(15,s/t*100);const a=100-this._progressWidth;this._progressLeft=e/i*a}const r=this.shadowRoot.querySelector(".progress-thumb");r&&(r.style.width=`${this._progressWidth}%`,r.style.left=`${this._progressLeft}%`)}_scroll(e){if(!this._track)return;const t=320*e;this._track.scrollBy({left:t,behavior:"smooth"})}_onProductClick(e){B(this,"product-select",{product:e.detail.product})}render(){const e=this.data||this.items||this.products,t=e!=null,s=Array.isArray(e)?e:[];return t&&s.length===0&&!this.loading?n``:s.length?n`
      <div class="carousel-wrapper">
        ${this.title?n`<div class="carousel-title">${this.title}</div>`:""}
        <div class="track" role="list">
          ${s.map(i=>n`
              <div class="card-item" role="listitem">
                <wx-product-card
                  .product="${i}"
                  .lang="${this.lang}"
                  @product-click="${this._onProductClick}"
                ></wx-product-card>
              </div>
            `)}
        </div>

        <div class="controls-row">
          <button class="nav-arrow-btn" @click="${()=>this._scroll(-1)}" aria-label="${p("scrollLeft",this.lang)}">&#x2039;</button>
          <div class="progress-track">
            <div class="progress-thumb"></div>
          </div>
          <button class="nav-arrow-btn" @click="${()=>this._scroll(1)}" aria-label="${p("scrollRight",this.lang)}">&#x203A;</button>
        </div>
      </div>
    `:n`
        <div class="carousel-wrapper">
          ${this.title?n`<div class="carousel-title">${this.title}</div>`:""}
          <div class="track" role="status" aria-label="Loading products">
            ${[1,2,3,4].map(()=>n`
                <div class="card-item skeleton-card">
                  <div class="skeleton-box skeleton-img"></div>
                  <div class="skeleton-box skeleton-brand"></div>
                  <div class="skeleton-box skeleton-title"></div>
                  <div class="skeleton-box skeleton-price"></div>
                </div>
              `)}
          </div>
        </div>
      `}}x(K,"properties",{title:{type:String},products:{type:Array,converter:w},items:{type:Array,converter:w},data:{type:Array,converter:w},lang:{type:String},loading:{type:Boolean}}),x(K,"styles",S`
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
  `),v("wx-product-carousel",K),v("wx-product",class extends K{});class se extends ${constructor(){super(),this.products=null,this.data=null,this.brands=[],this.categories=[],this.selectedCategory="",this.selectedBrand="",this.selectedPriceRange="",this.selectedSort="default",this.sidebarOpen=!1,this.activeSidebarTab="all",this.visibleCount=32,this.pageSize=32,this.lang="vi",this.loading=!1}_categoryMatchesProduct(e,t){if(!e||!t)return!1;const s=e.ID||e._id,i=e.slug,r=e.path;return!!(s&&(t.category===s||t.brandCategory===s)||i&&(t.category===i||t.primaryCategorySlug===i)||t.category&&s&&t.category.includes(s)||t.categoryPath&&(i&&(t.categoryPath.includes(`/${i}/`)||t.categoryPath.endsWith(`/${i}`)||t.categoryPath.includes(i))||s&&t.categoryPath.includes(s)||r&&t.categoryPath.startsWith(r))||t.brandCategoryPath&&i&&t.brandCategoryPath.includes(i))}_getAvailableCategories(){const e=this.data||this.products,t=Array.isArray(e)?e:[],s=Array.isArray(this.categories)?this.categories:[];return s.length?t.length?s.filter(i=>t.some(r=>this._categoryMatchesProduct(i,r))):[]:[]}_getFilteredProducts(){const e=this.data||this.products;let s=Array.isArray(e)?[...e]:[];if(this.selectedCategory){const r=(Array.isArray(this.categories)?this.categories:[]).find(a=>a.ID===this.selectedCategory||a._id===this.selectedCategory||a.slug===this.selectedCategory);r?s=s.filter(a=>this._categoryMatchesProduct(r,a)):s=s.filter(a=>{const l=this.selectedCategory;return a.category===l||a.categorySlug===l||a.brandCategory===l||a.category&&a.category.includes(l)||a.categoryPath&&a.categoryPath.includes(l)})}return this.selectedBrand&&(s=s.filter(i=>{const r=this.selectedBrand.toLowerCase(),a=(i.brand||"").toLowerCase();return a===r||a.includes(r)||i.brandPath&&i.brandPath.toLowerCase().includes(r)})),this.selectedPriceRange&&(s=s.filter(i=>{const r=Number(i.minPrice||i.price||0);switch(this.selectedPriceRange){case"under-1m":return r<1e6;case"1m-3m":return r>=1e6&&r<=3e6;case"3m-5m":return r>=3e6&&r<=5e6;case"over-5m":return r>5e6;default:return!0}})),this.selectedSort==="price-asc"?s.sort((i,r)=>Number(i.minPrice||i.price||0)-Number(r.minPrice||r.price||0)):this.selectedSort==="price-desc"?s.sort((i,r)=>Number(r.minPrice||r.price||0)-Number(i.minPrice||i.price||0)):this.selectedSort==="title-asc"&&s.sort((i,r)=>(i.title||"").localeCompare(r.title||"")),s}_openSidebar(e="all"){this.activeSidebarTab=e,this.sidebarOpen=!0}_closeSidebar(){this.sidebarOpen=!1}_clearAllFilters(e){e&&e.preventDefault(),this.selectedCategory="",this.selectedBrand="",this.selectedPriceRange="",this.selectedSort="default",this.visibleCount=this.pageSize||32,this.requestUpdate()}_clearCategoryFilter(e){e&&(e.preventDefault(),e.stopPropagation()),this.selectedCategory="",this.requestUpdate()}_clearBrandFilter(e){e&&(e.preventDefault(),e.stopPropagation()),this.selectedBrand="",this.requestUpdate()}_clearPriceFilter(e){e&&(e.preventDefault(),e.stopPropagation()),this.selectedPriceRange="",this.requestUpdate()}_loadMore(){this.visibleCount+=this.pageSize}updated(e){(e.has("selectedCategory")||e.has("selectedBrand")||e.has("selectedPriceRange")||e.has("selectedSort")||e.has("products")||e.has("data"))&&(this.visibleCount=this.pageSize||32)}_onProductCardClick(e){B(this,"product-select",{product:e.detail.product})}render(){const e=this.data||this.products,t=Array.isArray(e)?e.length>0:e!=null;if(this.loading===!0||this.loading==="true"||this.products===null&&!t)return n`
        <div>
          <div class="filter-toolbar">
            <div class="skeleton-box" style="width: 130px; height: 18px;"></div>
            <div class="skeleton-box" style="width: 120px; height: 34px; border-radius: 4px;"></div>
            <div class="skeleton-box" style="width: 100px; height: 34px; border-radius: 4px;"></div>
            <div class="skeleton-box" style="width: 100px; height: 34px; border-radius: 4px;"></div>
          </div>
          <div class="product-grid" role="status" aria-label="Loading products">
            ${[1,2,3,4,5,6,7,8].map(()=>n`
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
      `;const r=this._getFilteredProducts(),a=this._getAvailableCategories(),l=this.selectedCategory||this.selectedBrand||this.selectedPriceRange,c=r.length,h=r.slice(0,this.visibleCount),g=c>0?Math.min(100,h.length/c*100):0;return n`
      <div>
        <div class="filter-toolbar">
          <span class="results-text">${p("resultsCount",this.lang,r.length)}</span>

          <div class="sort-select-wrap">
            <select
              class="sort-select"
              @change="${d=>this.selectedSort=d.target.value}"
              .value="${this.selectedSort}"
            >
              <option value="default">${p("sortBy",this.lang)}</option>
              <option value="price-asc">${p("sortPriceAsc",this.lang)}</option>
              <option value="price-desc">${p("sortPriceDesc",this.lang)}</option>
              <option value="title-asc">${p("sortTitleAsc",this.lang)}</option>
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
              <span>${p("filterBrand",this.lang)}</span>
            </button>

            <button
              class="filter-trigger-btn ${this.selectedPriceRange?"has-value":""}"
              @click="${()=>this._openSidebar("price")}"
            >
              <span>${p("filterPrice",this.lang)}</span>
            </button>

            <button
              class="filter-trigger-btn ${this.selectedCategory?"has-value":""}"
              @click="${()=>this._openSidebar("category")}"
            >
              <span>${p("filterCategory",this.lang)}</span>
            </button>

            ${l?n`<button class="reset-link" @click="${this._clearAllFilters}">${p("clearAll",this.lang)}</button>`:""}

            <button
              class="filter-trigger-btn all-filters-btn"
              @click="${()=>this._openSidebar("all")}"
            >
              <span>${this.lang==="vi"?"Tất cả bộ lọc":"All Filters"}</span>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM1 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5zm12 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM1 8.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm5 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5zm3 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM1 13.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm10 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="product-grid">
          ${h.length>0?h.map(d=>n`
                  <wx-product-card
                    .product="${d}"
                    .lang="${this.lang}"
                    @product-click="${this._onProductCardClick}"
                  ></wx-product-card>
                `):n`
                <div class="empty-state">
                  <p>${p("emptyProducts",this.lang)}</p>
                </div>
              `}
        </div>

        ${c>this.pageSize?n`
              <div class="pagination-wrapper">
                <div class="showing-text">
                  ${p("showingItems",this.lang,h.length,c)}
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar-fill" style="width: ${g}%;"></div>
                </div>
                ${h.length<c?n`
                      <button class="btn-load-more" @click="${this._loadMore}">
                        ${p("loadMore",this.lang)}
                      </button>
                    `:""}
              </div>
            `:""}

        <div
          class="drawer-overlay ${this.sidebarOpen?"open":""}"
          @click="${this._closeSidebar}"
        ></div>

        <aside class="filter-sidebar ${this.sidebarOpen?"open":""}" aria-label="${p("productFilterAria",this.lang)}">
          <div class="sidebar-header">
            <h3 class="sidebar-title">${p("searchFilters",this.lang)}</h3>
            <button class="close-btn" @click="${this._closeSidebar}" aria-label="${p("close",this.lang)}">✕</button>
          </div>

          <div class="sidebar-content">
            <div class="filter-section">
              <div class="filter-group-title">
                <span>${p("categories",this.lang)}</span>
                ${this.selectedCategory?n`<button type="button" class="clear-section-btn" @click="${this._clearCategoryFilter}">${p("clear",this.lang)}</button>`:""}
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
                  <span>${p("allCategories",this.lang)}</span>
                </label>
                <div class="filter-options-scrollable">
                  ${a&&a.length>0?a.map(d=>n`
                          <label class="filter-option-label">
                            <input
                              type="radio"
                              name="cat_filter"
                              value="${d.ID||d.slug||d._id}"
                              .checked="${this.selectedCategory===(d.ID||d.slug||d._id)}"
                              @change="${()=>this.selectedCategory=d.ID||d.slug||d._id}"
                            />
                            <span>${d.title}</span>
                          </label>
                        `):n`<span style="font-size: 12px; color: #888888; padding: 4px 0;">${p("noCategories",this.lang)}</span>`}
                </div>
              </div>
            </div>

            <div class="filter-section">
              <div class="filter-group-title">
                <span>${p("brands",this.lang)}</span>
                ${this.selectedBrand?n`<button type="button" class="clear-section-btn" @click="${this._clearBrandFilter}">${p("clear",this.lang)}</button>`:""}
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
                  <span>${p("allBrands",this.lang)}</span>
                </label>
                ${this.brands&&this.brands.length>0?this.brands.map(d=>n`
                        <label class="filter-option-label">
                          <input
                            type="radio"
                            name="brand_filter"
                            value="${d.ID||d.slug||d._id}"
                            .checked="${this.selectedBrand===(d.ID||d.slug||d._id)}"
                            @change="${()=>this.selectedBrand=d.ID||d.slug||d._id}"
                          />
                          <span>${d.title}</span>
                        </label>
                      `):""}
              </div>
            </div>

            <div class="filter-section">
              <div class="filter-group-title">
                <span>${p("priceRange",this.lang)}</span>
                ${this.selectedPriceRange?n`<button type="button" class="clear-section-btn" @click="${this._clearPriceFilter}">${p("clear",this.lang)}</button>`:""}
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
                  <span>${p("allPrices",this.lang)}</span>
                </label>
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value="under-1m"
                    .checked="${this.selectedPriceRange==="under-1m"}"
                    @change="${()=>this.selectedPriceRange="under-1m"}"
                  />
                  <span>${p("priceUnder1m",this.lang)}</span>
                </label>
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value="1m-3m"
                    .checked="${this.selectedPriceRange==="1m-3m"}"
                    @change="${()=>this.selectedPriceRange="1m-3m"}"
                  />
                  <span>${p("price1mTo3m",this.lang)}</span>
                </label>
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value="3m-5m"
                    .checked="${this.selectedPriceRange==="3m-5m"}"
                    @change="${()=>this.selectedPriceRange="3m-5m"}"
                  />
                  <span>${p("price3mTo5m",this.lang)}</span>
                </label>
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value="over-5m"
                    .checked="${this.selectedPriceRange==="over-5m"}"
                    @change="${()=>this.selectedPriceRange="over-5m"}"
                  />
                  <span>${p("priceOver5m",this.lang)}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="sidebar-footer">
            <button class="btn-clear" @click="${this._clearAllFilters}">${p("reset",this.lang)}</button>
            <button class="btn-apply" @click="${this._closeSidebar}">${p("viewResults",this.lang,r.length)}</button>
          </div>
        </aside>
      </div>
    `}}x(se,"properties",{products:{type:Array,converter:w},data:{type:Array,converter:w},brands:{type:Array,converter:w},categories:{type:Array,converter:w},selectedCategory:{type:String},selectedBrand:{type:String},selectedPriceRange:{type:String},selectedSort:{type:String},sidebarOpen:{type:Boolean},activeSidebarTab:{type:String},visibleCount:{type:Number},pageSize:{type:Number},lang:{type:String},loading:{type:Boolean,converter:be}}),x(se,"styles",S`
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
        gap: 8px;
      }
      .filter-trigger-btn {
        height: 38px;
        padding: 8px 14px;
        font-size: 12px;
      }
      .sort-select {
        height: 38px;
        padding: 8px 30px 8px 12px;
        font-size: 12px;
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
  `),v("wx-product-listing",se);class re extends ${constructor(){super(),this.product=null,this.data=null,this.selectedImageIndex=0,this.lang="vi",this.loading=!1,this.openSections={description:!0,specifications:!1,instructions:!1},this.isZoomed=!1,this.zoomX=50,this.zoomY=50}_onMouseMove(e){const t=e.currentTarget.getBoundingClientRect();if(!t.width||!t.height)return;const s=(e.clientX-t.left)/t.width*100,i=(e.clientY-t.top)/t.height*100;this.zoomX=Math.max(0,Math.min(100,s)),this.zoomY=Math.max(0,Math.min(100,i)),this.isZoomed=!0}_onMouseLeave(){this.isZoomed=!1,this.zoomX=50,this.zoomY=50}_getImages(){const e=[],t=this.data||this.product;if(!t)return e;if(t.mainImage){const i=T(t.mainImage);i&&e.push(i)}const s=t.gallery||t.media||t.images||t.mediaGallery;return s&&me(s).forEach(r=>{const a=T(r);a&&!e.includes(a)&&e.push(a)}),e}_prevImage(e){e.length&&(this.selectedImageIndex=(this.selectedImageIndex-1+e.length)%e.length)}_nextImage(e){e.length&&(this.selectedImageIndex=(this.selectedImageIndex+1)%e.length)}_toggleSection(e){this.openSections={...this.openSections,[e]:!this.openSections[e]}}_renderHighlights(e){if(!e||typeof e!="string")return n``;const t=e.split(`
`).map(a=>a.trim()).filter(Boolean),s=[],i=[],r=/^[-–—*•·]\s*/;for(const a of t)r.test(a)?i.push(a.replace(r,"")):i.length===0?s.push(a):i.push(a);return n`
      ${s.length?n`<div class="highlights-heading">${s.join(" ")}</div>`:""}
      ${i.length?n`<ul class="highlights-list">
            ${i.map(a=>n`<li>${a}</li>`)}
          </ul>`:""}
    `}_renderDescription(e){if(!e||typeof e!="string")return n``;const t=e.split(/\n\s*\n/).map(r=>r.trim()).filter(Boolean),s=[],i=/^[-–—*•·]\s*/;for(const r of t){const a=r.split(`
`).map(c=>c.trim()).filter(Boolean);if(a.every(c=>i.test(c))){const c=a.map(h=>h.replace(i,""));s.push(n`<ul class="desc-bullets">
          ${c.map(h=>n`<li>${h}</li>`)}
        </ul>`)}else{const c=[],h=[];for(const g of a)i.test(g)?h.push(g.replace(i,"")):c.push(g);c.length&&s.push(n`<p class="desc-paragraph">${c.join(" ")}</p>`),h.length&&s.push(n`<ul class="desc-bullets">
            ${h.map(g=>n`<li>${g}</li>`)}
          </ul>`)}}return n`<div class="desc-formatted">${s}</div>`}render(){const e=this.data||this.product;if(this.loading===!0||this.loading==="true"||!e&&this.product===null)return n`
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
      `;if(!e)return n``;const i=e,r=this._getImages(),a=r[this.selectedImageIndex]||r[0],l=i.brand?i.brand.replace("brand-","").toUpperCase():"",c=i.series?i.series.replace("series-","").replace(/--.+/,"").toUpperCase():"",{price:h,comparePrice:g,discountPercent:d}=Be(i),b=ue(i.specs,[]);return n`
      <div class="pdp-grid">
        <!-- Cột Gallery bên trái -->
        <div class="gallery-col">
          <div
            class="main-viewport-box ${this.isZoomed?"zoomed":""}"
            @mousemove="${this._onMouseMove}"
            @mouseleave="${this._onMouseLeave}"
          >
            ${i.labels&&i.labels.length?n`<span class="badge-top-left">${Array.isArray(i.labels)?i.labels[0]:i.labels}</span>`:""}
            
            ${r.length>1?n`
                  <button class="nav-arrow prev" @click="${f=>{f.stopPropagation(),this._prevImage(r)}}" aria-label="${p("prevImage",this.lang)}">&#x2039;</button>
                  <button class="nav-arrow next" @click="${f=>{f.stopPropagation(),this._nextImage(r)}}" aria-label="${p("nextImage",this.lang)}">&#x203A;</button>
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

            ${a?n`
                  <img
                    class="main-img"
                    src="${a}"
                    alt="${i.title}"
                    style="${this.isZoomed?`transform-origin: ${this.zoomX}% ${this.zoomY}%; transform: scale(2.4);`:"transform-origin: center center; transform: scale(1);"}"
                  />
                `:n`
                  <div style="width: 100%; height: 350px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #f9f9f9; border: 1px dashed #d5d5d5; border-radius: 4px; color: #999; gap: 8px;">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span style="font-size: 12px;">${p("noImage",this.lang)}</span>
                  </div>
                `}
          </div>

          <!-- Thumbnail Matrix -->
          ${r.length>1?n`
                <div class="thumbnails-grid">
                  ${r.map((f,u)=>n`
                    <div
                      class="thumb-cell ${u===this.selectedImageIndex?"active":""}"
                      @click="${()=>this.selectedImageIndex=u}"
                    >
                      <img src="${f}" alt="Thumbnail ${u+1}" />
                    </div>
                  `)}
                </div>
              `:""}
        </div>

        <!-- Cột Thông tin bên phải -->
        <div class="info-col">
          ${l?n`<div class="brand-row">${l}</div>`:""}

          <h1 class="product-title">${i.title}</h1>

          ${c?n`<div class="series-name">${p("seriesLabel",this.lang,c)}</div>`:""}

          <!-- Price Row -->
          <div class="price-row">
            ${g&&g>h?n`<span class="compare-price">${V(g)}</span>`:""}
            <span class="sale-price">${h?V(h):p("contactUs",this.lang)}</span>
            ${d?n`<span class="discount-box">-${d}%</span>`:""}
          </div>

          <!-- Ratings nếu có -->
          ${i.rating?n`
                <div class="rating-row">
                  <span class="stars">★★★★★</span>
                  <span>${i.rating}</span>
                  ${i.reviewCount?n`<span class="rating-link">${p("reviewsCount",this.lang,i.reviewCount)}</span>`:""}
                </div>
              `:""}

          <!-- Highlights Bullet list nếu có shortDescription -->
          ${i.shortDescription?n`
                <div class="highlights-box">
                  <div class="highlights-title">${p("highlights",this.lang)}</div>
                  ${this._renderHighlights(i.shortDescription)}
                </div>
              `:""}

          <!-- Accordion Sections -->
          <div class="accordion-section">
            <!-- 1. Description -->
            <div class="accordion-item">
              <button class="accordion-header" @click="${()=>this._toggleSection("description")}">
                <span>${p("descriptionTab",this.lang)}</span>
                <span class="accordion-icon">${this.openSections.description?"▲":"▼"}</span>
              </button>
              ${this.openSections.description?n`
                    <div class="accordion-body">
                      ${this._renderDescription(i.description||i.shortDescription||p("noDescription",this.lang))}
                    </div>
                  `:""}
            </div>

            <!-- 2. Specifications -->
            <div class="accordion-item">
              <button class="accordion-header" @click="${()=>this._toggleSection("specifications")}">
                <span>${p("specsTab",this.lang)}</span>
                <span class="accordion-icon">${this.openSections.specifications?"▲":"▼"}</span>
              </button>
              ${this.openSections.specifications?n`
                    <div class="accordion-body">
                      ${b&&b.length>0?n`
                            <table class="specs-table">
                              <tbody>
                                ${b.map(f=>n`
                                    <tr>
                                      <td>${f.name||f.key}</td>
                                      <td>${f.value}</td>
                                    </tr>
                                  `)}
                              </tbody>
                            </table>
                          `:n`<p>${p("noSpecs",this.lang)}</p>`}
                    </div>
                  `:""}
            </div>

            <!-- 3. Manual and Safety Instructions -->
            <div class="accordion-item">
              <button class="accordion-header" @click="${()=>this._toggleSection("instructions")}">
                <span>${p("instructionsTab",this.lang)}</span>
                <span class="accordion-icon">${this.openSections.instructions?"▲":"▼"}</span>
              </button>
              ${this.openSections.instructions?n`
                    <div class="accordion-body">
                      ${i.instructions||i.manual||n`
                        <ul>
                          ${(p("defaultInstructions",this.lang)||[]).map(f=>n`<li>${f}</li>`)}
                        </ul>
                      `}
                    </div>
                  `:""}
            </div>
          </div>
        </div>
      </div>
    `}}x(re,"properties",{product:{type:Object,converter:_},data:{type:Object,converter:_},selectedImageIndex:{type:Number},openSections:{type:Object},lang:{type:String},loading:{type:Boolean,converter:be},isZoomed:{state:!0},zoomX:{state:!0},zoomY:{state:!0}}),x(re,"styles",S`
    :host {
      display: block;
      font-family: wfont_abc117_da7ed18ea46143cfbe0543c9975115a1, wf_da7ed18ea46143cfbe0543c99, orig_sfu_futura, 'SFU Futura', 'SFUFutura', Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
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

    .brand-name {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #444444;
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
      font-size: 24px;
      font-weight: 800;
      line-height: 1.3;
      margin: 0 0 14px 0;
      color: #111111;
    }

    /* Price Row */
    .price-row {
      display: flex;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 16px;
    }

    .compare-price {
      font-size: 16px;
      color: #888888;
      text-decoration: line-through;
    }

    .sale-price {
      font-size: 26px;
      font-weight: 800;
      color: #111111;
    }

    .discount-box {
      border: 1px solid #d40026;
      color: #d40026;
      font-size: 12px;
      font-weight: 700;
      padding: 2px 6px;
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
  `),v("wx-product-detail",re);class X extends ${constructor(){super(),this.title="",this.products=null,this.items=null,this.data=null,this.currentProduct=null,this.product=null,this.category="",this.limit=4,this.lang="vi",this.loading=!1,this._progressLeft=0,this._progressWidth=25}firstUpdated(){this._grid=this.shadowRoot.querySelector(".related-grid"),this._initScroll()}updated(e){(e.has("products")||e.has("items")||e.has("data"))&&this._initScroll()}_initScroll(){this._grid&&(this._grid.addEventListener("scroll",()=>this._updateProgress()),this._updateProgress())}_updateProgress(){if(!this._grid)return;const{scrollLeft:e,scrollWidth:t,clientWidth:s}=this._grid,i=t-s;if(i<=0)this._progressWidth=100,this._progressLeft=0;else{this._progressWidth=Math.max(25,s/t*100);const a=100-this._progressWidth;this._progressLeft=e/i*a}const r=this.shadowRoot.querySelector(".progress-thumb");r&&(r.style.width=`${this._progressWidth}%`,r.style.left=`${this._progressLeft}%`)}_scroll(e){if(!this._grid)return;const t=260*e;this._grid.scrollBy({left:t,behavior:"smooth"})}_getEffectiveProducts(){const e=this.data||this.items||this.products;if(!e||!Array.isArray(e))return[];const t=this.currentProduct||this.product,s=t?t.ID||t.id||t._id||t.slug:"";let i=s?e.filter(g=>(g.ID||g.id||g._id||g.slug)!==s):[...e],r=this.category,a="",l="",c="";if(t&&(r||(typeof t.category=="object"&&t.category!==null?r=t.category._id||t.category.ID||t.category.slug||"":r=t.category||""),a=t.categoryPath||"",l=t.brandCategory||"",c=t.brand||""),r||a||l){const g=(r||"").toLowerCase().trim(),d=(l||"").toLowerCase().trim(),b=(a||"").split("/").filter(Boolean),f=b.length>0?b[0].toLowerCase().trim():"",u=i.filter(A=>{const ae=String(A.category||"").toLowerCase().trim(),ne=String(A.brandCategory||"").toLowerCase().trim();return g&&(ae===g||ne===g)||d&&(ae===d||ne===d)}),z=i.filter(A=>{if(u.includes(A))return!1;const ae=String(A.categoryPath||"").toLowerCase(),ne=String(A.category||"").toLowerCase();return f&&(ae.includes(`/${f}/`)||ne.includes(f))}),lt=i.filter(A=>u.includes(A)||z.includes(A)?!1:c&&A.brand===c),Fe=[...u,...z,...lt];Fe.length>0&&(i=Fe)}const h=Number(this.limit)>0?Number(this.limit):4;return i.slice(0,h)}_onProductClick(e){B(this,"product-select",{product:e.detail.product})}render(){const e=this._getEffectiveProducts(),t=this.title||p("relatedProducts",this.lang),s=Number(this.limit)>0?Number(this.limit):4;return this.loading||this.products===null&&this.items===null&&this.data===null?n`
        <div class="related-container">
          <div class="related-title">${t}</div>
          <div class="related-grid" role="status" aria-label="Loading related products">
            ${Array.from({length:s}).map(()=>n`
                <div class="card-item skeleton-card">
                  <div class="skeleton-box skeleton-img"></div>
                  <div class="skeleton-box skeleton-brand"></div>
                  <div class="skeleton-box skeleton-title"></div>
                  <div class="skeleton-box skeleton-price"></div>
                </div>
              `)}
          </div>
        </div>
      `:e.length?n`
      <div class="related-container">
        <div class="related-title">${t}</div>
        <div class="related-grid" role="list">
          ${e.map(i=>n`
              <div class="card-item" role="listitem">
                <wx-product-card
                  .product="${i}"
                  .lang="${this.lang}"
                  @product-click="${this._onProductClick}"
                ></wx-product-card>
              </div>
            `)}
        </div>

        <div class="controls-row">
          <button class="nav-arrow-btn" @click="${()=>this._scroll(-1)}" aria-label="${p("scrollLeft",this.lang)}">&#x2039;</button>
          <div class="progress-track">
            <div class="progress-thumb"></div>
          </div>
          <button class="nav-arrow-btn" @click="${()=>this._scroll(1)}" aria-label="${p("scrollRight",this.lang)}">&#x203A;</button>
        </div>
      </div>
    `:n``}}x(X,"properties",{title:{type:String},products:{type:Array,converter:w},items:{type:Array,converter:w},data:{type:Array,converter:w},currentProduct:{type:Object,converter:_},product:{type:Object,converter:_},category:{type:String},limit:{type:Number},lang:{type:String},loading:{type:Boolean}}),x(X,"styles",S`
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
      padding: 44px 32px 48px;
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
        padding: 28px 16px 32px;
      }

      .related-title {
        font-size: 16px;
        margin-bottom: 20px;
        padding: 0;
      }
    }
  `),v("wx-related-products",X),v("wx-related",class extends X{});const xe=S`
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
`;class O extends ${constructor(){super(),this.blocks=[],this.items=[],this.data=null,this.type="all",this.lang="vi",this.activeHotspotIndex=0,this.failedImages=new Set}updated(e){super.updated(e);const t=this._getFilteredBlocks();this.hidden=!t||t.length===0}_getFilteredBlocks(){const e=this._getEffectiveBlocks();return!e||e.length===0?[]:e.filter(t=>{const s=t.component||"story";return s==="intro"?!1:!this.type||this.type==="all"?s==="story"||s==="highlights":s===this.type})}_getEffectiveBlocks(){return this.block&&typeof this.block=="object"?[this.block]:this.data&&Array.isArray(this.data.blocks)?this.data.blocks:this.data&&this.data.block&&typeof this.data.block=="object"?[this.data.block]:Array.isArray(this.blocks)?this.blocks:[]}_getEffectiveItems(){return this.data&&Array.isArray(this.data.items)?this.data.items:Array.isArray(this.items)?this.items:[]}_getItemsForBlock(e){const t=this._getEffectiveItems();if(!t||t.length===0)return[];if(t.length<=10)return t.slice().sort((a,l)=>(Number(a.position)||0)-(Number(l.position)||0));const s=typeof e=="object"&&e?e._id||"":e,i=typeof e=="object"&&e?e.ID||"":e,r=typeof e=="object"&&e&&e.title||"";return t.filter(a=>{const l=a.block;if(!l)return!0;if(typeof l=="object"&&l!==null){const c=l._id||"",h=l.ID||"",g=l.title||"";return s&&(c===s||h===s)||i&&(c===i||h===i)||r&&(c===r||h===r||g===r)}return s&&l===s||i&&l===i||r&&l===r}).sort((a,l)=>(Number(a.position)||0)-(Number(l.position)||0))}_onImageError(e){if(e){const t=new Set(this.failedImages);t.add(e),this.failedImages=t}}_isImageAvailable(e){return!e||typeof e!="string"||!e.trim()?!1:!this.failedImages.has(e)}_renderPlaceholder(e="220px",t=null){const s=t||p("noImage",this.lang)||"Chưa có ảnh";return n`
      <div class="no-image-placeholder" style="min-height: ${e};">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <span>${s}</span>
      </div>
    `}_renderMedia(e,t="",s="220px"){const i=T(e);return this._isImageAvailable(i)?n`
        <img
          src="${i}"
          alt="${t}"
          loading="lazy"
          @error="${()=>this._onImageError(i)}"
        />
      `:this._renderPlaceholder(s)}_renderStoryBlock(e,t){let s=e.heading||e.title,i=e.body||"",r=t,a=e.image||"";if(t&&t.length>0){const l=t[0];s=l.title||s,i=l.body||i,a=l.image||a,r=t.slice(1)}return n`
      <div class="story-section">
        <!-- Banner 50/50 -->
        <div class="story-banner">
          <div class="story-media">
            ${this._renderMedia(a,s,"320px")}
          </div>

          <div class="story-content">
            <h2 class="story-heading">${s}</h2>
            ${i?n`<div class="story-body">${i}</div>`:""}
          </div>
        </div>

        <!-- 3-Column Feature Cards bên dưới -->
        ${r.length>0?n`
              <div class="cards-grid">
                ${r.map(l=>n`
                    <div class="feature-card">
                      <div class="card-media">
                        ${this._renderMedia(l.image,l.title,"180px")}
                      </div>
                      <h3 class="card-title">${l.title}</h3>
                      ${l.body?n`<p class="card-body">${l.body}</p>`:""}
                    </div>
                  `)}
              </div>
            `:""}
      </div>
    `}_toggleAccordion(e){this.activeHotspotIndex===e?this.activeHotspotIndex=-1:this.activeHotspotIndex=e}_selectHotspot(e){this.activeHotspotIndex=e}_renderHighlightsBlock(e,t){const s=t.length>0?t:[],i=e.image||(e.ID?`/images/${e.ID}.png`:e._id?`/images/${e._id}.png`:""),r=T(i),a=this._isImageAvailable(r);return n`
      <div class="hotspot-section">
        <!-- Cột Trái: Ảnh Dao -->
        <div class="knife-viewport">
          ${a?n`
                <div class="knife-media-wrapper">
                  <img
                    src="${r}"
                    alt="${e.title||"Dao chi tiết"}"
                    loading="lazy"
                    @error="${()=>this._onImageError(r)}"
                  />
                  ${s.map((l,c)=>{const h=l.coordX!==void 0&&l.coordX!==null&&l.coordX!==""?l.coordX:l.x??l.hotspotX,g=l.coordY!==void 0&&l.coordY!==null&&l.coordY!==""?l.coordY:l.y??l.hotspotY;if(h==null||h==="")return"";const d=parseFloat(h),b=parseFloat(g);if(isNaN(d)||isNaN(b))return"";const f=this.activeHotspotIndex===c;return n`
                      <button
                        type="button"
                        class="hotspot-pin ${f?"active":""}"
                        style="left: ${d}%; top: ${b}%;"
                        @click="${u=>{u.stopPropagation(),this._selectHotspot(c)}}"
                        title="${l.title||`Điểm #${c+1}`}"
                        aria-label="${l.title||`Điểm #${c+1}`}"
                      >
                        <span class="hotspot-pin-pulse"></span>
                        <span class="hotspot-pin-inner"></span>
                      </button>
                    `})}
                </div>
              `:n`
                <div style="width: 100%;">
                  ${this._renderPlaceholder("260px")}
                </div>
              `}
        </div>

        <!-- Cột Phải: Danh sách Accordion tương tác -->
        <div class="accordion-col">
          ${s.map((l,c)=>{const h=this.activeHotspotIndex===c;return n`
              <div class="accordion-row ${h?"active":""}">
                <button
                  class="accordion-btn"
                  @click="${()=>this._toggleAccordion(c)}"
                  aria-expanded="${h}"
                >
                  <span class="accordion-title">${l.title}</span>
                  <span class="accordion-icon">${h?"▲":"▼"}</span>
                </button>

                ${h?n`
                      <div class="accordion-details">
                        ${l.body}
                      </div>
                    `:""}
              </div>
            `})}
        </div>
      </div>
    `}_renderIntroBlock(e){return n`
      <div class="intro-banner">
        <h2 class="intro-heading">${e.heading||e.title}</h2>
        ${e.body?n`<div class="intro-body">${e.body}</div>`:""}
        ${e.ctaLabel?n`<button class="story-cta-btn" type="button">${e.ctaLabel}</button>`:""}
      </div>
    `}render(){const e=this._getFilteredBlocks();return e.length===0?n``:n`
      <div class="feature-blocks-container">
        ${e.map(t=>{const s=this._getItemsForBlock(t),i=t.component||"story";return i==="highlights"?this._renderHighlightsBlock(t,s):i==="story"?this._renderStoryBlock(t,s):""})}
      </div>
    `}}x(O,"properties",{blocks:{type:Array,converter:_},block:{type:Object,converter:_},items:{type:Array,converter:_},data:{type:Object,converter:_},type:{type:String},lang:{type:String},activeHotspotIndex:{state:!0},failedImages:{state:!0}}),x(O,"styles",[xe,S`
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
        padding: 40px;
        border-radius: 4px;
      }

      @media (max-width: 768px) {
        .story-section {
          padding: 20px 16px;
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
    `]),v("wx-feature-blocks",O);class He extends O{constructor(){super(),this.type="story"}}v("wx-story-section",He);class Ue extends O{constructor(){super(),this.type="highlights"}}v("wx-hotspot-section",Ue);const Oe=[{id:"store-crescent-mall",ID:"store-crescent-mall",title:"ZWILLING CRESCENT MALL",address:"Tầng 4F - 33, Crescent Mall, 101 Tôn Dật Tiên, Phường Tân Phú, Quận 7, TP.HCM",city:"TP. Hồ Chí Minh",hotline:"028 399 07010",openHours:"10:00 - 22:00",latitude:10.7293,longitude:106.7198,googleMapsUrl:"https://maps.google.com/?q=Crescent+Mall+101+Ton+Dat+Tien+Tan+Phu+Quan+7+TPHCM",image:"/images/store-crescent-mall.jpg",position:1},{id:"store-estella-place",ID:"store-estella-place",title:"ZWILLING ESTELLA PLACE",address:"Tầng 3 - Estella Place, 88 Song Hành, Phường An Phú, TP. Thủ Đức, TP.HCM",city:"TP. Hồ Chí Minh",hotline:"0283 519 3209",openHours:"09:30 - 22:00",latitude:10.8016,longitude:106.7431,googleMapsUrl:"https://maps.google.com/?q=Estella+Place+88+Song+Hanh+An+Phu+TP+Thu+Duc+TPHCM",image:"/images/store-estella.jpg",position:2},{id:"store-lotte-lieu-giai",ID:"store-lotte-lieu-giai",title:"ZWILLING LOTTE DEPARTMENT STORE",address:"Tầng 5 - Lotte Department Store, 54 Liễu Giai, Phường Cống Vị, Ba Đình, Hà Nội",city:"Hà Nội",hotline:"0243 212 1177",openHours:"09:30 - 22:00",latitude:21.0318,longitude:105.8142,googleMapsUrl:"https://maps.google.com/?q=Lotte+Department+Store+54+Lieu+Giai+Ba+Dinh+Ha+Noi",image:"/images/store-lotte.jpg",position:3}];class oe extends ${constructor(){super(),this.stores=[],this.data=null,this.selectedStoreId="",this.searchQuery="",this.selectedCity="all",this.onlyOpen=!1,this.activeTab="list",this.lang="vi",this._boundOnMessage=null}connectedCallback(){super.connectedCallback(),this._boundOnMessage=this._onWindowMessage.bind(this),window.addEventListener("message",this._boundOnMessage)}disconnectedCallback(){super.disconnectedCallback(),this._boundOnMessage&&window.removeEventListener("message",this._boundOnMessage)}_onWindowMessage(e){if(e.data&&e.data.type==="STORE_MARKER_CLICK"){const t=e.data.id;if(t){this.selectedStoreId=t;const s=this.shadowRoot.querySelector(`[data-store-id="${t}"]`);s&&s.scrollIntoView({behavior:"smooth",block:"nearest"})}}}firstUpdated(){this._initStoreSelection()}updated(e){(e.has("stores")||e.has("data"))&&this._initStoreSelection()}_getEffectiveStores(){return Array.isArray(this.stores)&&this.stores.length>0?this.stores:this.data&&Array.isArray(this.data.stores)&&this.data.stores.length>0?this.data.stores:Oe}_initStoreSelection(){const e=this._getFilteredStores();e.length>0&&(!this.selectedStoreId||!e.some(t=>(t.id||t.ID)===this.selectedStoreId))&&(this.selectedStoreId=e[0].id||e[0].ID)}_getFilteredStores(){const e=this._getEffectiveStores(),t=(this.searchQuery||"").trim().toLowerCase(),s=this.selectedCity;return e.filter(i=>!(s!=="all"&&i.city&&!i.city.toLowerCase().includes(s.toLowerCase())||t&&![i.title,i.name,i.address,i.city,i.hotline].filter(Boolean).join(" ").toLowerCase().includes(t)))}_onSearchInput(e){this.searchQuery=e.target.value}_onSelectCity(e){this.selectedCity=e,this._initStoreSelection();const s=this._getFilteredStores().map(r=>r.id||r.ID),i=this.shadowRoot.getElementById("storeMapFrame");i&&i.contentWindow&&i.contentWindow.postMessage({type:"FIT_BOUNDS",ids:s},"*")}_selectStore(e){const t=e.id||e.ID;this.selectedStoreId=t,this.activeTab="map";const s=this.shadowRoot.getElementById("storeMapFrame");s&&s.contentWindow&&s.contentWindow.postMessage({type:"FLY_TO_STORE",id:t},"*")}_getMapIframeSrcDoc(e,t){return`<!DOCTYPE html>
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
    const stores = ${JSON.stringify(e.map(i=>({id:i.id||i.ID,title:i.title||"",address:i.address||"",hotline:i.hotline||"",openHours:i.openHours||"09:30 - 22:00",latitude:Number(i.latitude)||0,longitude:Number(i.longitude)||0,googleMapsUrl:i.googleMapsUrl||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((i.title||"")+" "+(i.address||""))}`})))};
    let currentSelectedId = "${t||""}";

    const map = L.map('map', {
      center: [16.0471, 107.8443],
      zoom: 6,
      zoomControl: true,
      scrollWheelZoom: true
    });

    // Google Maps Tile Layer - Hoàn toàn không cần API key, không watermark, tải cực nhanh tại Việt Nam
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
          '<div class="popup-title">' + s.title + '</div>' +
          '<div class="popup-address">' + s.address + '</div>' +
          '<div class="popup-hotline">Hotline: ' + s.hotline + '</div>' +
          '<a class="popup-btn" href="' + s.googleMapsUrl + '" target="_blank">Chỉ đường ↗</a>' +
          '</div>';

        m.bindPopup(popupHtml);

        m.on('click', () => {
          currentSelectedId = s.id;
          window.parent.postMessage({ type: 'STORE_MARKER_CLICK', id: s.id }, '*');
        });

        markers[s.id] = m;
      }
    });

    // Khởi tạo vị trí ban đầu
    if (currentSelectedId && markers[currentSelectedId]) {
      const s = stores.find(x => x.id === currentSelectedId);
      if (s) {
        map.setView([s.latitude, s.longitude], 15);
        markers[currentSelectedId].openPopup();
      }
    } else if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }

    // Nhận thông điệp từ ngoài component
    window.addEventListener('message', (e) => {
      if (!e.data) return;
      if (e.data.type === 'FLY_TO_STORE') {
        const id = e.data.id;
        const s = stores.find(x => x.id === id);
        if (s && s.latitude && s.longitude) {
          map.flyTo([s.latitude, s.longitude], 15, { duration: 1.0 });
          if (markers[id]) {
            markers[id].openPopup();
          }
        }
      } else if (e.data.type === 'FIT_BOUNDS') {
        const activeIds = e.data.ids || [];
        const activeBounds = stores
          .filter(x => activeIds.includes(x.id))
          .map(x => [x.latitude, x.longitude]);
        if (activeBounds.length > 0) {
          map.fitBounds(activeBounds, { padding: [50, 50], maxZoom: 14 });
        }
      }
    });
  <\/script>
</body>
</html>`}render(){const e=this._getFilteredStores();return n`
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
              <button
                class="city-pill ${this.selectedCity==="TP. Hồ Chí Minh"?"active":""}"
                @click="${()=>this._onSelectCity("TP. Hồ Chí Minh")}"
              >
                TP.HCM (2)
              </button>
              <button
                class="city-pill ${this.selectedCity==="Hà Nội"?"active":""}"
                @click="${()=>this._onSelectCity("Hà Nội")}"
              >
                Hà Nội (1)
              </button>
            </div>

            <label class="open-filter">
              <input
                type="checkbox"
                .checked="${this.onlyOpen}"
                @change="${t=>{this.onlyOpen=t.target.checked}}"
              />
              Only open locations
            </label>
          </div>

          <ul class="store-list">
            ${e.length===0?n`<li class="empty-state">Không tìm thấy cửa hàng phù hợp.</li>`:e.map(t=>{const s=t.id||t.ID,i=s===this.selectedStoreId;return n`
                    <li
                      class="store-card ${i?"active":""}"
                      data-store-id="${s}"
                      @click="${()=>this._selectStore(t)}"
                    >
                      <div class="store-info">
                        <h3 class="store-name">${t.title}</h3>
                        <p class="store-address">${t.address}</p>
                        <div class="store-hotline">
                          Hotline:
                          <a href="tel:${(t.hotline||"").replace(/\s+/g,"")}">
                            ${t.hotline}
                          </a>
                        </div>
                        <div class="store-status">
                          <span class="status-dot"></span>
                          <span>Open now ${t.openHours||"09:30 - 22:00"}</span>
                        </div>
                        <div class="store-actions">
                          <a
                            href="${t.googleMapsUrl||"#"}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="direction-link"
                            @click="${r=>r.stopPropagation()}"
                          >
                            Chỉ đường ↗
                          </a>
                        </div>
                      </div>

                      ${t.image?n`
                            <img
                              src="${T(t.image)}"
                              alt="${t.title}"
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
            .srcdoc="${this._getMapIframeSrcDoc(e,this.selectedStoreId)}"
          ></iframe>
        </main>
      </div>
    `}}x(oe,"properties",{stores:{type:Array,converter:_},data:{type:Object,converter:_},selectedStoreId:{state:!0},searchQuery:{state:!0},selectedCity:{state:!0},onlyOpen:{state:!0},activeTab:{state:!0},lang:{type:String}}),x(oe,"styles",[xe,S`
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
    `]),v("wx-store-locator",oe),console.log("[my-wix-ui-lib] Đã đăng ký thành công 5 Web Components tái sử dụng (Lit 3)"),m.DEFAULT_STORES=Oe,m.WxBreadcrumb=te,m.WxCategoryCarousel=Z,m.WxFeatureBlocks=O,m.WxHotspotSection=Ue,m.WxProductCard=ie,m.WxProductCarousel=K,m.WxProductDetail=re,m.WxProductListing=se,m.WxRelatedProducts=X,m.WxStoreLocator=oe,m.WxStorySection=He,m.dispatchCustomEvent=B,m.formatCurrencyVND=V,m.parseGallery=me,m.safeDefine=v,m.safeJsonParse=ue,m.t=p,m.themeStyles=xe,m.translations=ee,Object.defineProperty(m,Symbol.toStringTag,{value:"Module"})})(this.MyWixUiLib=this.MyWixUiLib||{});
