/* eslint-disable */
/* global globalThis, litPropertyMetadata */
var globalThis = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this;
if (!globalThis.litPropertyMetadata) {
  globalThis.litPropertyMetadata = new WeakMap();
}
var litPropertyMetadata = globalThis.litPropertyMetadata;
var st=Object.defineProperty;var rt=(u,w,A)=>w in u?st(u,w,{enumerable:!0,configurable:!0,writable:!0,value:A}):u[w]=A;var y=(u,w,A)=>rt(u,typeof w!="symbol"?w+"":w,A);(function(u){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Re;const w=globalThis,A=w.ShadowRoot&&(w.ShadyCSS===void 0||w.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,re=Symbol(),ue=new WeakMap;let me=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==re)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(A&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=ue.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&ue.set(t,e))}return e}toString(){return this.cssText}};const He=r=>new me(typeof r=="string"?r:r+"",void 0,re),S=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new me(t,r,re)},Ue=(r,e)=>{if(A)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=w.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,r.appendChild(s)}},be=A?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return He(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Oe,defineProperty:De,getOwnPropertyDescriptor:Fe,getOwnPropertyNames:je,getOwnPropertySymbols:We,getPrototypeOf:Ge}=Object,C=globalThis,xe=C.trustedTypes,Ye=xe?xe.emptyScript:"",oe=C.reactiveElementPolyfillSupport,U=(r,e)=>r,ne={toAttribute(r,e){switch(e){case Boolean:r=r?Ye:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},ye=(r,e)=>!Oe(r,e),ve={attribute:!0,type:String,converter:ne,reflect:!1,useDefault:!1,hasChanged:ye};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),C.litPropertyMetadata??(C.litPropertyMetadata=new WeakMap);let L=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ve){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&De(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:o}=Fe(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:i,set(n){const l=i==null?void 0:i.call(this);o==null||o.call(this,n),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ve}static _$Ei(){if(this.hasOwnProperty(U("elementProperties")))return;const e=Ge(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(U("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(U("properties"))){const t=this.properties,s=[...je(t),...We(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(be(i))}else e!==void 0&&t.push(be(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ue(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var o;const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const n=(((o=s.converter)==null?void 0:o.toAttribute)!==void 0?s.converter:ne).toAttribute(t,s.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){var o,n;const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),c=typeof l.converter=="function"?{fromAttribute:l.converter}:((o=l.converter)==null?void 0:o.fromAttribute)!==void 0?l.converter:ne;this._$Em=i;const h=c.fromAttribute(t,l.type);this[i]=h??((n=this._$Ej)==null?void 0:n.get(i))??h,this._$Em=null}}requestUpdate(e,t,s,i=!1,o){var n;if(e!==void 0){const l=this.constructor;if(i===!1&&(o=this[e]),s??(s=l.getPropertyOptions(e)),!((s.hasChanged??ye)(o,t)||s.useDefault&&s.reflect&&o===((n=this._$Ej)==null?void 0:n.get(e))&&!this.hasAttribute(l._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,n]of i){const{wrapped:l}=n,c=this[o];l!==!0||this._$AL.has(o)||c===void 0||this.C(o,void 0,n,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};L.elementStyles=[],L.shadowRootOptions={mode:"open"},L[U("elementProperties")]=new Map,L[U("finalized")]=new Map,oe==null||oe({ReactiveElement:L}),(C.reactiveElementVersions??(C.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O=globalThis,we=r=>r,X=O.trustedTypes,$e=X?X.createPolicy("lit-html",{createHTML:r=>r}):void 0,ke="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,_e="?"+I,qe=`<${_e}>`,T=document,D=()=>T.createComment(""),F=r=>r===null||typeof r!="object"&&typeof r!="function",ae=Array.isArray,Ve=r=>ae(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",le=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Se=/-->/g,Ae=/>/g,z=RegExp(`>|${le}(?:([^\\s"'>=/]+)(${le}*=${le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ce=/'/g,Ie=/"/g,Pe=/^(?:script|style|textarea|title)$/i,Ze=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),a=Ze(1),M=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),Te=new WeakMap,E=T.createTreeWalker(T,129);function ze(r,e){if(!ae(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return $e!==void 0?$e.createHTML(e):e}const Xe=(r,e)=>{const t=r.length-1,s=[];let i,o=e===2?"<svg>":e===3?"<math>":"",n=j;for(let l=0;l<t;l++){const c=r[l];let h,g,d=-1,b=0;for(;b<c.length&&(n.lastIndex=b,g=n.exec(c),g!==null);)b=n.lastIndex,n===j?g[1]==="!--"?n=Se:g[1]!==void 0?n=Ae:g[2]!==void 0?(Pe.test(g[2])&&(i=RegExp("</"+g[2],"g")),n=z):g[3]!==void 0&&(n=z):n===z?g[0]===">"?(n=i??j,d=-1):g[1]===void 0?d=-2:(d=n.lastIndex-g[2].length,h=g[1],n=g[3]===void 0?z:g[3]==='"'?Ie:Ce):n===Ie||n===Ce?n=z:n===Se||n===Ae?n=j:(n=z,i=void 0);const f=n===z&&r[l+1].startsWith("/>")?" ":"";o+=n===j?c+qe:d>=0?(s.push(h),c.slice(0,d)+ke+c.slice(d)+I+f):c+I+(d===-2?l:f)}return[ze(r,o+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class W{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let o=0,n=0;const l=e.length-1,c=this.parts,[h,g]=Xe(e,t);if(this.el=W.createElement(h,s),E.currentNode=this.el.content,t===2||t===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=E.nextNode())!==null&&c.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(ke)){const b=g[n++],f=i.getAttribute(d).split(I),m=/([.?@])?(.*)/.exec(b);c.push({type:1,index:o,name:m[2],strings:f,ctor:m[1]==="."?Je:m[1]==="?"?Qe:m[1]==="@"?et:K}),i.removeAttribute(d)}else d.startsWith(I)&&(c.push({type:6,index:o}),i.removeAttribute(d));if(Pe.test(i.tagName)){const d=i.textContent.split(I),b=d.length-1;if(b>0){i.textContent=X?X.emptyScript:"";for(let f=0;f<b;f++)i.append(d[f],D()),E.nextNode(),c.push({type:2,index:++o});i.append(d[b],D())}}}else if(i.nodeType===8)if(i.data===_e)c.push({type:2,index:o});else{let d=-1;for(;(d=i.data.indexOf(I,d+1))!==-1;)c.push({type:7,index:o}),d+=I.length-1}o++}}static createElement(e,t){const s=T.createElement("template");return s.innerHTML=e,s}}function B(r,e,t=r,s){var n,l;if(e===M)return e;let i=s!==void 0?(n=t._$Co)==null?void 0:n[s]:t._$Cl;const o=F(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==o&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=B(r,i._$AS(r,e.values),i,s)),e}class Ke{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=((e==null?void 0:e.creationScope)??T).importNode(t,!0);E.currentNode=i;let o=E.nextNode(),n=0,l=0,c=s[0];for(;c!==void 0;){if(n===c.index){let h;c.type===2?h=new G(o,o.nextSibling,this,e):c.type===1?h=new c.ctor(o,c.name,c.strings,this,e):c.type===6&&(h=new tt(o,this,e)),this._$AV.push(h),c=s[++l]}n!==(c==null?void 0:c.index)&&(o=E.nextNode(),n++)}return E.currentNode=T,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class G{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=B(this,e,t),F(e)?e===x||e==null||e===""?(this._$AH!==x&&this._$AR(),this._$AH=x):e!==this._$AH&&e!==M&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ve(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==x&&F(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=W.createElement(ze(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===i)this._$AH.p(t);else{const n=new Ke(i,this),l=n.u(this.options);n.p(t),this.T(l),this._$AH=n}}_$AC(e){let t=Te.get(e.strings);return t===void 0&&Te.set(e.strings,t=new W(e)),t}k(e){ae(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const o of e)i===t.length?t.push(s=new G(this.O(D()),this.O(D()),this,this.options)):s=t[i],s._$AI(o),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e!==this._$AB;){const i=we(e).nextSibling;we(e).remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class K{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,o){this.type=1,this._$AH=x,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=x}_$AI(e,t=this,s,i){const o=this.strings;let n=!1;if(o===void 0)e=B(this,e,t,0),n=!F(e)||e!==this._$AH&&e!==M,n&&(this._$AH=e);else{const l=e;let c,h;for(e=o[0],c=0;c<o.length-1;c++)h=B(this,l[s+c],t,c),h===M&&(h=this._$AH[c]),n||(n=!F(h)||h!==this._$AH[c]),h===x?e=x:e!==x&&(e+=(h??"")+o[c+1]),this._$AH[c]=h}n&&!i&&this.j(e)}j(e){e===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Je extends K{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===x?void 0:e}}class Qe extends K{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==x)}}class et extends K{constructor(e,t,s,i,o){super(e,t,s,i,o),this.type=5}_$AI(e,t=this){if((e=B(this,e,t,0)??x)===M)return;const s=this._$AH,i=e===x&&s!==x||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==x&&(s===x||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class tt{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){B(this,e)}}const ce=O.litHtmlPolyfillSupport;ce==null||ce(W,G),(O.litHtmlVersions??(O.litHtmlVersions=[])).push("3.3.3");const it=(r,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let i=s._$litPart$;if(i===void 0){const o=(t==null?void 0:t.renderBefore)??null;s._$litPart$=i=new G(e.insertBefore(D(),o),o,void 0,t??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N=globalThis;class $ extends L{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=it(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return M}}$._$litElement$=!0,$.finalized=!0,(Re=N.litElementHydrateSupport)==null||Re.call(N,{LitElement:$});const de=N.litElementPolyfillSupport;de==null||de({LitElement:$}),(N.litElementVersions??(N.litElementVersions=[])).push("4.2.2");function v(r,e){if(!(typeof window>"u"||!window.customElements||window.customElements.get(r)))try{window.customElements.define(r,e)}catch(s){if(s.name==="NotSupportedError"&&s.message.includes("constructor")){class i extends e{}window.customElements.define(r,i)}else console.warn(`[my-wix-ui-lib] Không thể đăng ký ${r}:`,s)}}function R(r,e,t={}){const s=new CustomEvent(e,{detail:t,bubbles:!0,composed:!0,cancelable:!0});return r.dispatchEvent(s),s}function Y(r){if(r==null||r==="")return"";if(typeof r=="string"){const e=Number(r.replace(/[^\d]/g,""));!isNaN(e)&&e>0&&(r=e)}return isNaN(r)||Number(r)<=0?"":new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",maximumFractionDigits:0}).format(r)}function Ee(r){if(!r||typeof r!="object")return{price:0,comparePrice:null,discountPercent:null};const e=l=>{if(l==null||l==="")return 0;if(typeof l=="number")return isNaN(l)?0:l;if(typeof l=="string"){const c=Number(l.replace(/[^\d]/g,""));return isNaN(c)?0:c}return 0},t=e(r.maxPrice)||e(r.compareAtPrice)||e(r.price),s=e(r.minPrice);let i=0,o=null,n=null;return t>0&&s>0&&t>s?(i=s,o=t,n=Math.round((t-s)/t*100)):(i=t||s||e(r.price),o=null,n=null),{price:i,comparePrice:o,discountPercent:n}}function pe(r,e=null){if(!r)return e;if(typeof r=="object")return r;try{return JSON.parse(r)}catch{return e}}function P(r,e=""){if(!r||(typeof r=="object"&&r&&(r=r.src||r.url||e),typeof r!="string"))return e;const t=r.trim();if(!t)return e;if(t.startsWith("wix:image://")){const s=t.split("/");if(s.length>=4)return`https://static.wixstatic.com/media/${s[3].split("#")[0]}`}return t}function he(r){if(!r)return[];if(typeof r=="string"){const e=r.trim();if(e.startsWith("[")||e.startsWith("{"))try{const t=JSON.parse(e);t&&(r=t)}catch{}}return Array.isArray(r)?r.map(e=>e?typeof e=="object"?e.src||e.url||"":String(e):"").filter(Boolean):typeof r!="string"?[]:r.split(";").map(e=>e.trim()).filter(Boolean)}function Ne(r){return typeof r!="string"?"":r.replace(/&quot;/g,'"').replace(/&#34;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">")}const k={fromAttribute(r){if(!r)return[];if(typeof r=="object")return Array.isArray(r)?r:[r];try{let e=typeof r=="string"?Ne(r.trim()):"";if(e.startsWith("[")||e.startsWith("{")){const t=JSON.parse(e);return Array.isArray(t)?t:[t]}if(e.includes(">")||e.includes(",")){const t=e.includes(">")?">":",";return e.split(t).map(s=>s.trim()).filter(Boolean).map((s,i,o)=>({label:s,url:i===0?"/":i===o.length-1?"#":""}))}return e?[{label:e,url:"#"}]:[]}catch(e){return console.warn("[jsonArrayConverter] Lỗi parse JSON:",e,r),[]}},toAttribute(r){return JSON.stringify(r)}},_={fromAttribute(r){if(!r)return null;if(typeof r=="object")return r;try{let e=typeof r=="string"?Ne(r.trim()):"";return JSON.parse(e)}catch(e){return console.warn("[jsonObjectConverter] Lỗi parse JSON:",e,r),null}},toAttribute(r){return JSON.stringify(r)}},ge={fromAttribute(r){if(r==null)return!1;if(typeof r=="boolean")return r;const e=String(r).trim().toLowerCase();return!(e==="false"||e==="0"||e===""||e==="null"||e==="undefined")},toAttribute(r){return r?"true":null}},J={vi:{resultsCount:r=>`${r} sản phẩm`,sortBy:"Sắp xếp theo",sortPriceAsc:"Giá: Thấp đến Cao",sortPriceDesc:"Giá: Cao đến Thấp",sortTitleAsc:"Tên: A đến Z",filterCategory:"Danh mục",filterBrand:"Thương hiệu",filterPrice:"Mức giá",clearAll:"Xóa tất cả",emptyProducts:"Không có sản phẩm nào phù hợp với bộ lọc.",showingItems:(r,e)=>`Đang hiển thị ${r} trên tổng số ${e} sản phẩm`,loadMore:"XEM THÊM SẢN PHẨM",searchFilters:"BỘ LỌC TÌM KIẾM",clear:"Xóa",categories:"DANH MỤC",allCategories:"Tất cả danh mục",noCategories:"Không có danh mục nào",brands:"THƯƠNG HIỆU",allBrands:"Tất cả thương hiệu",priceRange:"KHOẢNG GIÁ",allPrices:"Tất cả mức giá",priceUnder1m:"Dưới 1.000.000 ₫",price1mTo3m:"1.000.000 ₫ - 3.000.000 ₫",price3mTo5m:"3.000.000 ₫ - 5.000.000 ₫",priceOver5m:"Trên 5.000.000 ₫",reset:"Thiết lập lại",viewResults:r=>`Xem ${r} sản phẩm`,close:"Đóng",productFilterAria:"Bộ lọc sản phẩm",contactUs:"Liên hệ",noImage:"Chưa có ảnh",prevImage:"Ảnh trước",nextImage:"Ảnh sau",seriesLabel:r=>`Dòng sản phẩm: ${r}`,reviewsCount:r=>`(${r} Đánh giá)`,highlights:"Đặc điểm nổi bật:",descriptionTab:"MÔ TẢ SẢN PHẨM",specsTab:"THÔNG SỐ KỸ THUẬT",instructionsTab:"HƯỚNG DẪN SỬ DỤNG & BẢO QUẢN",noDescription:"Chưa có thông tin mô tả cho sản phẩm này.",noSpecs:"Chưa có thông số kỹ thuật.",defaultInstructions:["Vệ sinh bằng tay với nước ấm và xà phòng nhẹ sau khi sử dụng.","Lau khô hoàn toàn trước khi cất giữ.","Bảo quản nơi khô ráo, thoáng mát."],toolbarResults:r=>`${r} KẾT QUẢ`,allBrandsToolbar:"Tất cả Thương hiệu",allCategoriesToolbar:"Tất cả Danh mục",sortDefault:"Sắp xếp: Mặc định",clearFilters:"Xóa bộ lọc",brandSectionTitle:"THƯƠNG HIỆU",seriesSectionTitle:"DÒNG SẢN PHẨM",seriesTag:"Dòng sản phẩm",scrollLeft:"Cuộn sang trái",scrollRight:"Cuộn sang phải",home:"TRANG CHỦ",products:"SẢN PHẨM",brandsBreadcrumb:"THƯƠNG HIỆU",about:"GIỚI THIỆU",news:"TIN TỨC"},en:{resultsCount:r=>`${r} Results`,sortBy:"Sort by",sortPriceAsc:"Price: Low to High",sortPriceDesc:"Price: High to Low",sortTitleAsc:"Name: A to Z",filterCategory:"Category",filterBrand:"Brand",filterPrice:"Price",clearAll:"Clear All",emptyProducts:"No products found matching your filters.",showingItems:(r,e)=>`Showing ${r} of ${e} items`,loadMore:"LOAD MORE",searchFilters:"SEARCH FILTERS",clear:"Clear",categories:"CATEGORIES",allCategories:"All Categories",noCategories:"No categories found",brands:"BRANDS",allBrands:"All Brands",priceRange:"PRICE RANGE",allPrices:"All Prices",priceUnder1m:"Under 1,000,000 ₫",price1mTo3m:"1,000,000 ₫ - 3,000,000 ₫",price3mTo5m:"3,000,000 ₫ - 5,000,000 ₫",priceOver5m:"Over 5,000,000 ₫",reset:"Reset",viewResults:r=>`View ${r} products`,close:"Close",productFilterAria:"Product filters",contactUs:"Contact Us",noImage:"No image available",prevImage:"Previous image",nextImage:"Next image",seriesLabel:r=>`Series: ${r}`,reviewsCount:r=>`(${r} Reviews)`,highlights:"Highlights:",descriptionTab:"PRODUCT DESCRIPTION",specsTab:"SPECIFICATIONS",instructionsTab:"INSTRUCTIONS & CARE",noDescription:"No description available for this product.",noSpecs:"No specifications available.",defaultInstructions:["Hand wash with warm water and mild soap after use.","Dry completely before storage.","Store in a cool, dry place."],toolbarResults:r=>`${r} RESULTS`,allBrandsToolbar:"All Brands",allCategoriesToolbar:"All Categories",sortDefault:"Sort: Default",clearFilters:"Clear Filters",brandSectionTitle:"BRANDS",seriesSectionTitle:"SERIES",seriesTag:"Series",scrollLeft:"Scroll left",scrollRight:"Scroll right",home:"HOME",products:"PRODUCTS",brandsBreadcrumb:"BRANDS",about:"ABOUT US",news:"NEWS"}};function p(r,e="vi",...t){let s="vi";e&&typeof e=="string"?s=e.toLowerCase().startsWith("en")?"en":"vi":typeof document<"u"&&document.documentElement&&document.documentElement.lang&&(s=document.documentElement.lang.toLowerCase().startsWith("en")?"en":"vi");const i=J[s]||J.vi,o=i[r]!==void 0?i[r]:J.vi[r];return typeof o=="function"?o(...t):o!==void 0?o:r}class Q extends ${constructor(){super(),this.items=null,this.defaultItems="",this.current="",this.lang="vi",this.loading=!1}connectedCallback(){super.connectedCallback(),this._checkContext()}firstUpdated(e){super.firstUpdated(e),this._checkContext(),setTimeout(()=>this._checkContext(),200),setTimeout(()=>this._checkContext(),600)}_checkContext(){if(!this.items||!this.items.length){const e=this._getEffectiveItems();e&&e.length>0&&(this.items=e,this.loading=!1,this.requestUpdate())}}_getEffectiveItems(){if(this.items&&Array.isArray(this.items)&&this.items.length>0)return this.items;if(this.defaultItems){const e=k.fromAttribute(this.defaultItems);if(e&&e.length>0)return e}if(this.current)return[{label:"TRANG CHỦ",url:"/"},{label:this.current,url:"#"}];if(typeof document<"u"){try{if(document.querySelector("wx-store-locator")||document.querySelector("[data-locator]"))return[{label:"TRANG CHỦ",url:"/"},{label:"CỬA HÀNG",url:"/stores"}]}catch{}try{const e=(window.location.href||"")+" "+(window.location.pathname||"")+" "+(document.title||"");if(/store|cua-hang|cửa hàng/i.test(e))return[{label:"TRANG CHỦ",url:"/"},{label:"CỬA HÀNG",url:"/stores"}]}catch{}}return null}_formatLabel(e){if(!e||typeof e!="string")return"";const t=e.trim().toUpperCase();return t==="HOME"||t==="TRANG CHỦ"?p("home",this.lang):t==="PRODUCTS"||t==="SẢN PHẨM"?p("products",this.lang):t==="BRANDS"||t==="THƯƠNG HIỆU"?p("brandsBreadcrumb",this.lang):t==="ABOUT"||t==="ABOUT US"||t==="GIỚI THIỆU"||t==="VỀ CHÚNG TÔI"?p("about",this.lang):t==="BLOG"||t==="NEWS"||t==="BÀI VIẾT"||t==="TIN TỨC"?p("news",this.lang):e}_resolveUrl(e){if(!e||e==="#"||e==="")return"#";if(/^https?:\/\//i.test(e))return e;if(typeof window<"u"&&window.location){const t=window.location.hostname||"",s=window.location.pathname||"";if(t.includes("wixstudio.com")||t.includes("wixsite.com")){const i=s.split("/").filter(Boolean);if(i.length>0){const o="/"+i[0];if(e==="/")return o+"/";if(!e.startsWith(o))return e.startsWith("/")?`${o}${e}`:`${o}/${e}`}}}return e}_handleClick(e,t,s,i=this.items){if(i&&s===i.length-1)return;e.preventDefault(),R(this,"breadcrumb-click",{item:t,index:s});const o=t&&(t.url||t.link||t.href);if(!o||o==="#"||o==="")return;const n=this._resolveUrl(o);setTimeout(()=>{try{if(typeof window<"u"&&window.location){const l=(window.location.pathname||"").replace(/\/$/,""),c=n.replace(/\/$/,"");l!==c&&(window.location.href=n)}}catch{}},150)}render(){const e=this._getEffectiveItems();if((this.loading===!0||this.loading==="true"||!e&&this.items===null&&this.loading!==!1)&&!e)return a`
        <nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 8px;">
          <div class="skeleton-box" style="width: 70px; height: 14px;"></div>
          <span class="separator" aria-hidden="true">&#x203A;</span>
          <div class="skeleton-box" style="width: 100px; height: 14px;"></div>
        </nav>
      `;const i=e||[];return i.length?a`
      <nav aria-label="Breadcrumb">
        ${i.map((o,n)=>{const l=n===0,c=n===i.length-1,h=typeof o=="string"?o:o.label||o.title,g=this._formatLabel(h);return a`
            ${n>0?a`<span class="separator" aria-hidden="true">&#x203A;</span>`:""}
            <button
              class="crumb-btn ${l?"first":""} ${c?"active":""}"
              ?disabled="${c}"
              @click="${d=>this._handleClick(d,o,n,i)}"
              aria-current="${c?"page":"false"}"
            >
              ${g}
            </button>
          `})}
      </nav>
    `:a``}}y(Q,"properties",{items:{type:Array,converter:k},defaultItems:{type:String,attribute:"default-items"},current:{type:String},lang:{type:String},loading:{type:Boolean,converter:ge}}),y(Q,"styles",S`
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
  `),v("wx-breadcrumb",Q);class q extends ${constructor(){super(),this.items=null,this.categories=null,this.data=null,this.selectedId="",this.lang="vi",this.loading=!1,this._progressLeft=0,this._progressWidth=30}firstUpdated(){this._track=this.shadowRoot.querySelector(".track"),this._checkScroll()}updated(e){(e.has("items")||e.has("categories")||e.has("data"))&&this._checkScroll()}_checkScroll(){const e=this.categories||this.data||this.items||[];this._track&&e.length>=6&&(this._track.addEventListener("scroll",()=>this._updateProgress()),this._updateProgress())}_updateProgress(){if(!this._track)return;const{scrollLeft:e,scrollWidth:t,clientWidth:s}=this._track,i=t-s;if(i<=0)this._progressWidth=100,this._progressLeft=0;else{this._progressWidth=Math.max(15,s/t*100);const n=100-this._progressWidth;this._progressLeft=e/i*n}const o=this.shadowRoot.querySelector(".progress-thumb");o&&(o.style.width=`${this._progressWidth}%`,o.style.left=`${this._progressLeft}%`)}_scroll(e){if(!this._track)return;const t=300*e;this._track.scrollBy({left:t,behavior:"smooth"})}_selectItem(e){this.selectedId=e._id||e.ID||e.id||e.slug,R(this,"category-select",{category:e})}render(){const e=this.categories||this.data||this.items,t=e!=null,s=Array.isArray(e)?e:[];if(t&&s.length===0&&!this.loading)return this.removeAttribute("has-items"),a``;if(!s.length)return a`
        <div class="carousel-wrapper">
          <div class="track static-grid" role="status" aria-label="Loading categories">
            ${[1,2,3,4,5].map(()=>a`
              <div class="skeleton-card">
                <div class="skeleton-box skeleton-img"></div>
                <div class="skeleton-box skeleton-label"></div>
              </div>
            `)}
          </div>
        </div>
      `;this.setAttribute("has-items","");const i=s.length>=6;return a`
      <div class="carousel-wrapper">
        <div class="track ${i?"":"static-grid"}" role="list">
          ${s.map(o=>{const n=o._id||o.ID||o.id||o.slug,l=this.selectedId===n,c=o.title||o.name||"",h=o.description||o.subtitle||o.desc||"",g=o.image||o.mainImage||o.bannerImage,d=g?P(g):"";return a`
              <button
                class="item-card ${l?"active":""}"
                @click="${()=>this._selectItem(o)}"
                role="listitem"
              >
                <div class="image-box">
                  ${d?a`
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
                      `:a`
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
                ${h?a`<span class="item-description">${h}</span>`:""}
              </button>
            `})}
        </div>

        ${i?a`
              <div class="controls-row">
                <button class="nav-arrow-btn" @click="${()=>this._scroll(-1)}" aria-label="${p("scrollLeft",this.lang)}">&#x2039;</button>
                <div class="progress-track">
                  <div class="progress-thumb"></div>
                </div>
                <button class="nav-arrow-btn" @click="${()=>this._scroll(1)}" aria-label="${p("scrollRight",this.lang)}">&#x203A;</button>
              </div>
            `:""}
      </div>
    `}}y(q,"properties",{items:{type:Array,converter:k},categories:{type:Array,converter:k},data:{type:Array,converter:k},selectedId:{type:String},lang:{type:String},loading:{type:Boolean}}),y(q,"styles",S`
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
  `),v("wx-category-carousel",q),v("wx-product-categories",class extends q{});class ee extends ${constructor(){super(),this.product=null,this.activeImageIndex=0,this.lang="vi"}_getImages(){if(!this.product)return[];const e=this.product,t=[];if(e.mainImage){const i=P(e.mainImage);i&&t.push(i)}const s=e.gallery||e.media||e.images||e.mediaGallery;return s&&he(s).forEach(o=>{const n=P(o);n&&!t.includes(n)&&t.push(n)}),t}_prevImage(e,t){e.stopPropagation(),t.length&&(this.activeImageIndex=(this.activeImageIndex-1+t.length)%t.length)}_nextImage(e,t){e.stopPropagation(),t.length&&(this.activeImageIndex=(this.activeImageIndex+1)%t.length)}_onClick(){R(this,"product-click",{product:this.product})}render(){if(!this.product)return a``;const e=this.product,t=this._getImages(),s=t[this.activeImageIndex]||e.mainImage||(t.length?t[0]:""),{price:i,comparePrice:o,discountPercent:n}=Ee(e),l=e.brand?e.brand.replace("brand-","").toUpperCase():"";let c=[];if(Array.isArray(e.labels))c=e.labels;else if(typeof e.labels=="string"){const m=pe(e.labels);if(Array.isArray(m))c=m;else if(e.labels.trim()&&e.labels!=="[]"){const Z=e.labels.replace(/[\[\]"']/g,"").trim();Z&&(c=[Z])}}else e.label?c=[e.label]:e.ribbon&&(c=[e.ribbon]);if(e.isBestseller||e.bestseller){const m=this.lang==="vi"?"Bán chạy":"Bestseller";!c.includes(m)&&!c.includes("Bestseller")&&!c.includes("Bán chạy")&&c.unshift(m)}const h={"bán chạy":"Bestseller",mới:"New","mới mở bán":"New to sale","giảm giá":"On sale"},g={bestseller:"Bán chạy","best seller":"Bán chạy",new:"Mới","new to sale":"Mới mở bán","on sale":"Giảm giá"};c=c.filter(Boolean).map(m=>{const Z=String(m).trim().toLowerCase();return this.lang==="en"?h[Z]||m:g[Z]||m});const d=t.length,b=d>1?100/d:100,f=d>1?this.activeImageIndex/d*100:0;return a`
      <div class="card" @click="${this._onClick}">
        <!-- Top Bar: % Giảm giá + Labels (Đã bỏ icon heart) -->
        <div class="top-bar">
          <div class="badges-group">
            ${n?a`<span class="badge-pill badge-discount">-${n}%</span>`:""}
            ${c.map(m=>a`<span class="badge-pill badge-label">${m}</span>`)}
          </div>
        </div>

        <!-- Image Viewport với Nút Next/Back Gallery khi Hover -->
        <div class="image-viewport">
          ${d>1?a`
                <button
                  class="nav-arrow prev"
                  @click="${m=>this._prevImage(m,t)}"
                  aria-label="${p("prevImage",this.lang)}"
                >
                  &#x2039;
                </button>
                <button
                  class="nav-arrow next"
                  @click="${m=>this._nextImage(m,t)}"
                  aria-label="${p("nextImage",this.lang)}"
                >
                  &#x203A;
                </button>
              `:""}

          ${s?a`<img src="${s}" alt="${e.title}" loading="lazy" />`:a`
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
        ${d>1?a`
              <div class="image-progress-bar">
                <div
                  class="image-progress-thumb"
                  style="width: ${b}%; left: ${f}%;"
                ></div>
              </div>
            `:""}

        <div class="content-area">
          ${l?a`<div class="brand-title">${l}</div>`:""}
          <h3 class="product-title" title="${e.title}">${e.title}</h3>

          ${e.rating?a`
                <div class="rating-row">
                  <span class="stars">★★★★★</span>
                  <span class="rating-text">${e.rating} ${e.reviewCount?`(${e.reviewCount})`:""}</span>
                </div>
              `:""}

          ${e.sizeLabel?a`<div class="variant-sizes">${e.sizeLabel}</div>`:""}

          <div class="footer-row">
            <div class="price-col">
              ${o&&o>i?a`<span class="compare-price">${Y(o)}</span>`:""}
              <span class="current-price">${i?Y(i):p("contactUs",this.lang)}</span>
            </div>
          </div>
        </div>
      </div>
    `}}y(ee,"properties",{product:{type:Object,converter:_},data:{type:Object,converter:_},activeImageIndex:{type:Number},lang:{type:String}}),y(ee,"styles",S`
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
  `),v("wx-product-card",ee);class V extends ${constructor(){super(),this.title="",this.products=null,this.items=null,this.data=null,this.lang="vi",this.loading=!1,this._progressLeft=0,this._progressWidth=25}firstUpdated(){this._track=this.shadowRoot.querySelector(".track"),this._initScroll()}updated(e){(e.has("products")||e.has("items")||e.has("data"))&&this._initScroll()}_initScroll(){this._track&&(this._track.addEventListener("scroll",()=>this._updateProgress()),this._updateProgress())}_updateProgress(){if(!this._track)return;const{scrollLeft:e,scrollWidth:t,clientWidth:s}=this._track,i=t-s;if(i<=0)this._progressWidth=100,this._progressLeft=0;else{this._progressWidth=Math.max(15,s/t*100);const n=100-this._progressWidth;this._progressLeft=e/i*n}const o=this.shadowRoot.querySelector(".progress-thumb");o&&(o.style.width=`${this._progressWidth}%`,o.style.left=`${this._progressLeft}%`)}_scroll(e){if(!this._track)return;const t=320*e;this._track.scrollBy({left:t,behavior:"smooth"})}_onProductClick(e){R(this,"product-select",{product:e.detail.product})}render(){const e=this.data||this.items||this.products,t=e!=null,s=Array.isArray(e)?e:[];return t&&s.length===0&&!this.loading?a``:s.length?a`
      <div class="carousel-wrapper">
        ${this.title?a`<div class="carousel-title">${this.title}</div>`:""}
        <div class="track" role="list">
          ${s.map(i=>a`
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
    `:a`
        <div class="carousel-wrapper">
          ${this.title?a`<div class="carousel-title">${this.title}</div>`:""}
          <div class="track" role="status" aria-label="Loading products">
            ${[1,2,3,4].map(()=>a`
                <div class="card-item skeleton-card">
                  <div class="skeleton-box skeleton-img"></div>
                  <div class="skeleton-box skeleton-brand"></div>
                  <div class="skeleton-box skeleton-title"></div>
                  <div class="skeleton-box skeleton-price"></div>
                </div>
              `)}
          </div>
        </div>
      `}}y(V,"properties",{title:{type:String},products:{type:Array,converter:k},items:{type:Array,converter:k},data:{type:Array,converter:k},lang:{type:String},loading:{type:Boolean}}),y(V,"styles",S`
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
  `),v("wx-product-carousel",V),v("wx-product",class extends V{});class te extends ${constructor(){super(),this.products=null,this.data=null,this.brands=[],this.categories=[],this.selectedCategory="",this.selectedBrand="",this.selectedPriceRange="",this.selectedSort="default",this.sidebarOpen=!1,this.activeSidebarTab="all",this.visibleCount=32,this.pageSize=32,this.lang="vi",this.loading=!1}_categoryMatchesProduct(e,t){if(!e||!t)return!1;const s=e.ID||e._id,i=e.slug,o=e.path;return!!(s&&(t.category===s||t.brandCategory===s)||i&&(t.category===i||t.primaryCategorySlug===i)||t.category&&s&&t.category.includes(s)||t.categoryPath&&(i&&(t.categoryPath.includes(`/${i}/`)||t.categoryPath.endsWith(`/${i}`)||t.categoryPath.includes(i))||s&&t.categoryPath.includes(s)||o&&t.categoryPath.startsWith(o))||t.brandCategoryPath&&i&&t.brandCategoryPath.includes(i))}_getAvailableCategories(){const e=this.data||this.products,t=Array.isArray(e)?e:[],s=Array.isArray(this.categories)?this.categories:[];return s.length?t.length?s.filter(i=>t.some(o=>this._categoryMatchesProduct(i,o))):[]:[]}_getFilteredProducts(){const e=this.data||this.products;let s=Array.isArray(e)?[...e]:[];if(this.selectedCategory){const o=(Array.isArray(this.categories)?this.categories:[]).find(n=>n.ID===this.selectedCategory||n._id===this.selectedCategory||n.slug===this.selectedCategory);o?s=s.filter(n=>this._categoryMatchesProduct(o,n)):s=s.filter(n=>{const l=this.selectedCategory;return n.category===l||n.categorySlug===l||n.brandCategory===l||n.category&&n.category.includes(l)||n.categoryPath&&n.categoryPath.includes(l)})}return this.selectedBrand&&(s=s.filter(i=>{const o=this.selectedBrand.toLowerCase(),n=(i.brand||"").toLowerCase();return n===o||n.includes(o)||i.brandPath&&i.brandPath.toLowerCase().includes(o)})),this.selectedPriceRange&&(s=s.filter(i=>{const o=Number(i.minPrice||i.price||0);switch(this.selectedPriceRange){case"under-1m":return o<1e6;case"1m-3m":return o>=1e6&&o<=3e6;case"3m-5m":return o>=3e6&&o<=5e6;case"over-5m":return o>5e6;default:return!0}})),this.selectedSort==="price-asc"?s.sort((i,o)=>Number(i.minPrice||i.price||0)-Number(o.minPrice||o.price||0)):this.selectedSort==="price-desc"?s.sort((i,o)=>Number(o.minPrice||o.price||0)-Number(i.minPrice||i.price||0)):this.selectedSort==="title-asc"&&s.sort((i,o)=>(i.title||"").localeCompare(o.title||"")),s}_openSidebar(e="all"){this.activeSidebarTab=e,this.sidebarOpen=!0}_closeSidebar(){this.sidebarOpen=!1}_clearAllFilters(e){e&&e.preventDefault(),this.selectedCategory="",this.selectedBrand="",this.selectedPriceRange="",this.selectedSort="default",this.visibleCount=this.pageSize||32,this.requestUpdate()}_clearCategoryFilter(e){e&&(e.preventDefault(),e.stopPropagation()),this.selectedCategory="",this.requestUpdate()}_clearBrandFilter(e){e&&(e.preventDefault(),e.stopPropagation()),this.selectedBrand="",this.requestUpdate()}_clearPriceFilter(e){e&&(e.preventDefault(),e.stopPropagation()),this.selectedPriceRange="",this.requestUpdate()}_loadMore(){this.visibleCount+=this.pageSize}updated(e){(e.has("selectedCategory")||e.has("selectedBrand")||e.has("selectedPriceRange")||e.has("selectedSort")||e.has("products")||e.has("data"))&&(this.visibleCount=this.pageSize||32)}_onProductCardClick(e){R(this,"product-select",{product:e.detail.product})}render(){const e=this.data||this.products,t=Array.isArray(e)?e.length>0:e!=null;if(this.loading===!0||this.loading==="true"||this.products===null&&!t)return a`
        <div>
          <div class="filter-toolbar">
            <div class="skeleton-box" style="width: 130px; height: 18px;"></div>
            <div class="skeleton-box" style="width: 120px; height: 34px; border-radius: 4px;"></div>
            <div class="skeleton-box" style="width: 100px; height: 34px; border-radius: 4px;"></div>
            <div class="skeleton-box" style="width: 100px; height: 34px; border-radius: 4px;"></div>
          </div>
          <div class="product-grid" role="status" aria-label="Loading products">
            ${[1,2,3,4,5,6,7,8].map(()=>a`
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
      `;const o=this._getFilteredProducts(),n=this._getAvailableCategories(),l=this.selectedCategory||this.selectedBrand||this.selectedPriceRange,c=o.length,h=o.slice(0,this.visibleCount),g=c>0?Math.min(100,h.length/c*100):0;return a`
      <div>
        <div class="filter-toolbar">
          <span class="results-text">${p("resultsCount",this.lang,o.length)}</span>

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

            ${l?a`<button class="reset-link" @click="${this._clearAllFilters}">${p("clearAll",this.lang)}</button>`:""}

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
          ${h.length>0?h.map(d=>a`
                  <wx-product-card
                    .product="${d}"
                    .lang="${this.lang}"
                    @product-click="${this._onProductCardClick}"
                  ></wx-product-card>
                `):a`
                <div class="empty-state">
                  <p>${p("emptyProducts",this.lang)}</p>
                </div>
              `}
        </div>

        ${c>this.pageSize?a`
              <div class="pagination-wrapper">
                <div class="showing-text">
                  ${p("showingItems",this.lang,h.length,c)}
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar-fill" style="width: ${g}%;"></div>
                </div>
                ${h.length<c?a`
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
                ${this.selectedCategory?a`<button type="button" class="clear-section-btn" @click="${this._clearCategoryFilter}">${p("clear",this.lang)}</button>`:""}
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
                  ${n&&n.length>0?n.map(d=>a`
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
                        `):a`<span style="font-size: 12px; color: #888888; padding: 4px 0;">${p("noCategories",this.lang)}</span>`}
                </div>
              </div>
            </div>

            <div class="filter-section">
              <div class="filter-group-title">
                <span>${p("brands",this.lang)}</span>
                ${this.selectedBrand?a`<button type="button" class="clear-section-btn" @click="${this._clearBrandFilter}">${p("clear",this.lang)}</button>`:""}
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
                ${this.brands&&this.brands.length>0?this.brands.map(d=>a`
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
                ${this.selectedPriceRange?a`<button type="button" class="clear-section-btn" @click="${this._clearPriceFilter}">${p("clear",this.lang)}</button>`:""}
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
            <button class="btn-apply" @click="${this._closeSidebar}">${p("viewResults",this.lang,o.length)}</button>
          </div>
        </aside>
      </div>
    `}}y(te,"properties",{products:{type:Array,converter:k},data:{type:Array,converter:k},brands:{type:Array,converter:k},categories:{type:Array,converter:k},selectedCategory:{type:String},selectedBrand:{type:String},selectedPriceRange:{type:String},selectedSort:{type:String},sidebarOpen:{type:Boolean},activeSidebarTab:{type:String},visibleCount:{type:Number},pageSize:{type:Number},lang:{type:String},loading:{type:Boolean,converter:ge}}),y(te,"styles",S`
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
  `),v("wx-product-listing",te);class ie extends ${constructor(){super(),this.product=null,this.data=null,this.selectedImageIndex=0,this.lang="vi",this.loading=!1,this.openSections={description:!0,specifications:!1,instructions:!1},this.isZoomed=!1,this.zoomX=50,this.zoomY=50}_onMouseMove(e){const t=e.currentTarget.getBoundingClientRect();if(!t.width||!t.height)return;const s=(e.clientX-t.left)/t.width*100,i=(e.clientY-t.top)/t.height*100;this.zoomX=Math.max(0,Math.min(100,s)),this.zoomY=Math.max(0,Math.min(100,i)),this.isZoomed=!0}_onMouseLeave(){this.isZoomed=!1,this.zoomX=50,this.zoomY=50}_getImages(){const e=[],t=this.data||this.product;if(!t)return e;if(t.mainImage){const i=P(t.mainImage);i&&e.push(i)}const s=t.gallery||t.media||t.images||t.mediaGallery;return s&&he(s).forEach(o=>{const n=P(o);n&&!e.includes(n)&&e.push(n)}),e}_prevImage(e){e.length&&(this.selectedImageIndex=(this.selectedImageIndex-1+e.length)%e.length)}_nextImage(e){e.length&&(this.selectedImageIndex=(this.selectedImageIndex+1)%e.length)}_toggleSection(e){this.openSections={...this.openSections,[e]:!this.openSections[e]}}_renderHighlights(e){if(!e||typeof e!="string")return a``;const t=e.split(`
`).map(n=>n.trim()).filter(Boolean),s=[],i=[],o=/^[-–—*•·]\s*/;for(const n of t)o.test(n)?i.push(n.replace(o,"")):i.length===0?s.push(n):i.push(n);return a`
      ${s.length?a`<div class="highlights-heading">${s.join(" ")}</div>`:""}
      ${i.length?a`<ul class="highlights-list">
            ${i.map(n=>a`<li>${n}</li>`)}
          </ul>`:""}
    `}_renderDescription(e){if(!e||typeof e!="string")return a``;const t=e.split(/\n\s*\n/).map(o=>o.trim()).filter(Boolean),s=[],i=/^[-–—*•·]\s*/;for(const o of t){const n=o.split(`
`).map(c=>c.trim()).filter(Boolean);if(n.every(c=>i.test(c))){const c=n.map(h=>h.replace(i,""));s.push(a`<ul class="desc-bullets">
          ${c.map(h=>a`<li>${h}</li>`)}
        </ul>`)}else{const c=[],h=[];for(const g of n)i.test(g)?h.push(g.replace(i,"")):c.push(g);c.length&&s.push(a`<p class="desc-paragraph">${c.join(" ")}</p>`),h.length&&s.push(a`<ul class="desc-bullets">
            ${h.map(g=>a`<li>${g}</li>`)}
          </ul>`)}}return a`<div class="desc-formatted">${s}</div>`}render(){const e=this.data||this.product;if(this.loading===!0||this.loading==="true"||!e&&this.product===null)return a`
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
      `;if(!e)return a``;const i=e,o=this._getImages(),n=o[this.selectedImageIndex]||o[0],l=i.brand?i.brand.replace("brand-","").toUpperCase():"",c=i.series?i.series.replace("series-","").replace(/--.+/,"").toUpperCase():"",{price:h,comparePrice:g,discountPercent:d}=Ee(i),b=pe(i.specs,[]);return a`
      <div class="pdp-grid">
        <!-- Cột Gallery bên trái -->
        <div class="gallery-col">
          <div
            class="main-viewport-box ${this.isZoomed?"zoomed":""}"
            @mousemove="${this._onMouseMove}"
            @mouseleave="${this._onMouseLeave}"
          >
            ${i.labels&&i.labels.length?a`<span class="badge-top-left">${Array.isArray(i.labels)?i.labels[0]:i.labels}</span>`:""}
            
            ${o.length>1?a`
                  <button class="nav-arrow prev" @click="${f=>{f.stopPropagation(),this._prevImage(o)}}" aria-label="${p("prevImage",this.lang)}">&#x2039;</button>
                  <button class="nav-arrow next" @click="${f=>{f.stopPropagation(),this._nextImage(o)}}" aria-label="${p("nextImage",this.lang)}">&#x203A;</button>
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

            ${n?a`
                  <img
                    class="main-img"
                    src="${n}"
                    alt="${i.title}"
                    style="${this.isZoomed?`transform-origin: ${this.zoomX}% ${this.zoomY}%; transform: scale(2.4);`:"transform-origin: center center; transform: scale(1);"}"
                  />
                `:a`
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
          ${o.length>1?a`
                <div class="thumbnails-grid">
                  ${o.map((f,m)=>a`
                    <div
                      class="thumb-cell ${m===this.selectedImageIndex?"active":""}"
                      @click="${()=>this.selectedImageIndex=m}"
                    >
                      <img src="${f}" alt="Thumbnail ${m+1}" />
                    </div>
                  `)}
                </div>
              `:""}
        </div>

        <!-- Cột Thông tin bên phải -->
        <div class="info-col">
          ${l?a`<div class="brand-row">${l}</div>`:""}

          <h1 class="product-title">${i.title}</h1>

          ${c?a`<div class="series-name">${p("seriesLabel",this.lang,c)}</div>`:""}

          <!-- Price Row -->
          <div class="price-row">
            ${g&&g>h?a`<span class="compare-price">${Y(g)}</span>`:""}
            <span class="sale-price">${h?Y(h):p("contactUs",this.lang)}</span>
            ${d?a`<span class="discount-box">-${d}%</span>`:""}
          </div>

          <!-- Ratings nếu có -->
          ${i.rating?a`
                <div class="rating-row">
                  <span class="stars">★★★★★</span>
                  <span>${i.rating}</span>
                  ${i.reviewCount?a`<span class="rating-link">${p("reviewsCount",this.lang,i.reviewCount)}</span>`:""}
                </div>
              `:""}

          <!-- Highlights Bullet list nếu có shortDescription -->
          ${i.shortDescription?a`
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
              ${this.openSections.description?a`
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
              ${this.openSections.specifications?a`
                    <div class="accordion-body">
                      ${b&&b.length>0?a`
                            <table class="specs-table">
                              <tbody>
                                ${b.map(f=>a`
                                    <tr>
                                      <td>${f.name||f.key}</td>
                                      <td>${f.value}</td>
                                    </tr>
                                  `)}
                              </tbody>
                            </table>
                          `:a`<p>${p("noSpecs",this.lang)}</p>`}
                    </div>
                  `:""}
            </div>

            <!-- 3. Manual and Safety Instructions -->
            <div class="accordion-item">
              <button class="accordion-header" @click="${()=>this._toggleSection("instructions")}">
                <span>${p("instructionsTab",this.lang)}</span>
                <span class="accordion-icon">${this.openSections.instructions?"▲":"▼"}</span>
              </button>
              ${this.openSections.instructions?a`
                    <div class="accordion-body">
                      ${i.instructions||i.manual||a`
                        <ul>
                          ${(p("defaultInstructions",this.lang)||[]).map(f=>a`<li>${f}</li>`)}
                        </ul>
                      `}
                    </div>
                  `:""}
            </div>
          </div>
        </div>
      </div>
    `}}y(ie,"properties",{product:{type:Object,converter:_},data:{type:Object,converter:_},selectedImageIndex:{type:Number},openSections:{type:Object},lang:{type:String},loading:{type:Boolean,converter:ge},isZoomed:{state:!0},zoomX:{state:!0},zoomY:{state:!0}}),y(ie,"styles",S`
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
  `),v("wx-product-detail",ie);const fe=S`
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
`;class H extends ${constructor(){super(),this.blocks=[],this.items=[],this.data=null,this.type="all",this.lang="vi",this.activeHotspotIndex=0,this.failedImages=new Set}updated(e){super.updated(e);const t=this._getFilteredBlocks();this.hidden=!t||t.length===0}_getFilteredBlocks(){const e=this._getEffectiveBlocks();return!e||e.length===0?[]:e.filter(t=>{const s=t.component||"story";return s==="intro"?!1:!this.type||this.type==="all"?s==="story"||s==="highlights":s===this.type})}_getEffectiveBlocks(){return this.block&&typeof this.block=="object"?[this.block]:this.data&&Array.isArray(this.data.blocks)?this.data.blocks:this.data&&this.data.block&&typeof this.data.block=="object"?[this.data.block]:Array.isArray(this.blocks)?this.blocks:[]}_getEffectiveItems(){return this.data&&Array.isArray(this.data.items)?this.data.items:Array.isArray(this.items)?this.items:[]}_getItemsForBlock(e){const t=this._getEffectiveItems();if(!t||t.length===0)return[];if(t.length<=10)return t.slice().sort((n,l)=>(Number(n.position)||0)-(Number(l.position)||0));const s=typeof e=="object"&&e?e._id||"":e,i=typeof e=="object"&&e?e.ID||"":e,o=typeof e=="object"&&e&&e.title||"";return t.filter(n=>{const l=n.block;if(!l)return!0;if(typeof l=="object"&&l!==null){const c=l._id||"",h=l.ID||"",g=l.title||"";return s&&(c===s||h===s)||i&&(c===i||h===i)||o&&(c===o||h===o||g===o)}return s&&l===s||i&&l===i||o&&l===o}).sort((n,l)=>(Number(n.position)||0)-(Number(l.position)||0))}_onImageError(e){if(e){const t=new Set(this.failedImages);t.add(e),this.failedImages=t}}_isImageAvailable(e){return!e||typeof e!="string"||!e.trim()?!1:!this.failedImages.has(e)}_renderPlaceholder(e="220px",t=null){const s=t||p("noImage",this.lang)||"Chưa có ảnh";return a`
      <div class="no-image-placeholder" style="min-height: ${e};">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <span>${s}</span>
      </div>
    `}_renderMedia(e,t="",s="220px"){const i=P(e);return this._isImageAvailable(i)?a`
        <img
          src="${i}"
          alt="${t}"
          loading="lazy"
          @error="${()=>this._onImageError(i)}"
        />
      `:this._renderPlaceholder(s)}_renderStoryBlock(e,t){let s=e.heading||e.title,i=e.body||"",o=t,n=e.image||"";if(t&&t.length>0){const l=t[0];s=l.title||s,i=l.body||i,n=l.image||n,o=t.slice(1)}return a`
      <div class="story-section">
        <!-- Banner 50/50 -->
        <div class="story-banner">
          <div class="story-media">
            ${this._renderMedia(n,s,"320px")}
          </div>

          <div class="story-content">
            <h2 class="story-heading">${s}</h2>
            ${i?a`<div class="story-body">${i}</div>`:""}
          </div>
        </div>

        <!-- 3-Column Feature Cards bên dưới -->
        ${o.length>0?a`
              <div class="cards-grid">
                ${o.map(l=>a`
                    <div class="feature-card">
                      <div class="card-media">
                        ${this._renderMedia(l.image,l.title,"180px")}
                      </div>
                      <h3 class="card-title">${l.title}</h3>
                      ${l.body?a`<p class="card-body">${l.body}</p>`:""}
                    </div>
                  `)}
              </div>
            `:""}
      </div>
    `}_toggleAccordion(e){this.activeHotspotIndex===e?this.activeHotspotIndex=-1:this.activeHotspotIndex=e}_selectHotspot(e){this.activeHotspotIndex=e}_renderHighlightsBlock(e,t){const s=t.length>0?t:[],i=e.image||(e.ID?`/images/${e.ID}.png`:e._id?`/images/${e._id}.png`:""),o=P(i),n=this._isImageAvailable(o);return a`
      <div class="hotspot-section">
        <!-- Cột Trái: Ảnh Dao -->
        <div class="knife-viewport">
          ${n?a`
                <div class="knife-media-wrapper">
                  <img
                    src="${o}"
                    alt="${e.title||"Dao chi tiết"}"
                    loading="lazy"
                    @error="${()=>this._onImageError(o)}"
                  />
                  ${s.map((l,c)=>{const h=l.coordX!==void 0&&l.coordX!==null&&l.coordX!==""?l.coordX:l.x??l.hotspotX,g=l.coordY!==void 0&&l.coordY!==null&&l.coordY!==""?l.coordY:l.y??l.hotspotY;if(h==null||h==="")return"";const d=parseFloat(h),b=parseFloat(g);if(isNaN(d)||isNaN(b))return"";const f=this.activeHotspotIndex===c;return a`
                      <button
                        type="button"
                        class="hotspot-pin ${f?"active":""}"
                        style="left: ${d}%; top: ${b}%;"
                        @click="${m=>{m.stopPropagation(),this._selectHotspot(c)}}"
                        title="${l.title||`Điểm #${c+1}`}"
                        aria-label="${l.title||`Điểm #${c+1}`}"
                      >
                        <span class="hotspot-pin-pulse"></span>
                        <span class="hotspot-pin-inner"></span>
                      </button>
                    `})}
                </div>
              `:a`
                <div style="width: 100%;">
                  ${this._renderPlaceholder("260px")}
                </div>
              `}
        </div>

        <!-- Cột Phải: Danh sách Accordion tương tác -->
        <div class="accordion-col">
          ${s.map((l,c)=>{const h=this.activeHotspotIndex===c;return a`
              <div class="accordion-row ${h?"active":""}">
                <button
                  class="accordion-btn"
                  @click="${()=>this._toggleAccordion(c)}"
                  aria-expanded="${h}"
                >
                  <span class="accordion-title">${l.title}</span>
                  <span class="accordion-icon">${h?"▲":"▼"}</span>
                </button>

                ${h?a`
                      <div class="accordion-details">
                        ${l.body}
                      </div>
                    `:""}
              </div>
            `})}
        </div>
      </div>
    `}_renderIntroBlock(e){return a`
      <div class="intro-banner">
        <h2 class="intro-heading">${e.heading||e.title}</h2>
        ${e.body?a`<div class="intro-body">${e.body}</div>`:""}
        ${e.ctaLabel?a`<button class="story-cta-btn" type="button">${e.ctaLabel}</button>`:""}
      </div>
    `}render(){const e=this._getFilteredBlocks();return e.length===0?a``:a`
      <div class="feature-blocks-container">
        ${e.map(t=>{const s=this._getItemsForBlock(t),i=t.component||"story";return i==="highlights"?this._renderHighlightsBlock(t,s):i==="story"?this._renderStoryBlock(t,s):""})}
      </div>
    `}}y(H,"properties",{blocks:{type:Array,converter:_},block:{type:Object,converter:_},items:{type:Array,converter:_},data:{type:Object,converter:_},type:{type:String},lang:{type:String},activeHotspotIndex:{state:!0},failedImages:{state:!0}}),y(H,"styles",[fe,S`
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
        background: #f2f0ee;
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
    `]),v("wx-feature-blocks",H);class Le extends H{constructor(){super(),this.type="story"}}v("wx-story-section",Le);class Me extends H{constructor(){super(),this.type="highlights"}}v("wx-hotspot-section",Me);const Be=[{id:"store-crescent-mall",ID:"store-crescent-mall",title:"ZWILLING CRESCENT MALL",address:"Tầng 4F - 33, Crescent Mall, 101 Tôn Dật Tiên, Phường Tân Phú, Quận 7, TP.HCM",city:"TP. Hồ Chí Minh",hotline:"028 399 07010",openHours:"10:00 - 22:00",latitude:10.7293,longitude:106.7198,googleMapsUrl:"https://maps.google.com/?q=Crescent+Mall+101+Ton+Dat+Tien+Tan+Phu+Quan+7+TPHCM",image:"/images/store-crescent-mall.jpg",position:1},{id:"store-estella-place",ID:"store-estella-place",title:"ZWILLING ESTELLA PLACE",address:"Tầng 3 - Estella Place, 88 Song Hành, Phường An Phú, TP. Thủ Đức, TP.HCM",city:"TP. Hồ Chí Minh",hotline:"0283 519 3209",openHours:"09:30 - 22:00",latitude:10.8016,longitude:106.7431,googleMapsUrl:"https://maps.google.com/?q=Estella+Place+88+Song+Hanh+An+Phu+TP+Thu+Duc+TPHCM",image:"/images/store-estella.jpg",position:2},{id:"store-lotte-lieu-giai",ID:"store-lotte-lieu-giai",title:"ZWILLING LOTTE DEPARTMENT STORE",address:"Tầng 5 - Lotte Department Store, 54 Liễu Giai, Phường Cống Vị, Ba Đình, Hà Nội",city:"Hà Nội",hotline:"0243 212 1177",openHours:"09:30 - 22:00",latitude:21.0318,longitude:105.8142,googleMapsUrl:"https://maps.google.com/?q=Lotte+Department+Store+54+Lieu+Giai+Ba+Dinh+Ha+Noi",image:"/images/store-lotte.jpg",position:3}];class se extends ${constructor(){super(),this.stores=[],this.data=null,this.selectedStoreId="",this.searchQuery="",this.selectedCity="all",this.onlyOpen=!1,this.activeTab="list",this.lang="vi",this._boundOnMessage=null}connectedCallback(){super.connectedCallback(),this._boundOnMessage=this._onWindowMessage.bind(this),window.addEventListener("message",this._boundOnMessage)}disconnectedCallback(){super.disconnectedCallback(),this._boundOnMessage&&window.removeEventListener("message",this._boundOnMessage)}_onWindowMessage(e){if(e.data&&e.data.type==="STORE_MARKER_CLICK"){const t=e.data.id;if(t){this.selectedStoreId=t;const s=this.shadowRoot.querySelector(`[data-store-id="${t}"]`);s&&s.scrollIntoView({behavior:"smooth",block:"nearest"})}}}firstUpdated(){this._initStoreSelection()}updated(e){(e.has("stores")||e.has("data"))&&this._initStoreSelection()}_getEffectiveStores(){return Array.isArray(this.stores)&&this.stores.length>0?this.stores:this.data&&Array.isArray(this.data.stores)&&this.data.stores.length>0?this.data.stores:Be}_initStoreSelection(){const e=this._getFilteredStores();e.length>0&&(!this.selectedStoreId||!e.some(t=>(t.id||t.ID)===this.selectedStoreId))&&(this.selectedStoreId=e[0].id||e[0].ID)}_getFilteredStores(){const e=this._getEffectiveStores(),t=(this.searchQuery||"").trim().toLowerCase(),s=this.selectedCity;return e.filter(i=>!(s!=="all"&&i.city&&!i.city.toLowerCase().includes(s.toLowerCase())||t&&![i.title,i.name,i.address,i.city,i.hotline].filter(Boolean).join(" ").toLowerCase().includes(t)))}_onSearchInput(e){this.searchQuery=e.target.value}_onSelectCity(e){this.selectedCity=e,this._initStoreSelection();const s=this._getFilteredStores().map(o=>o.id||o.ID),i=this.shadowRoot.getElementById("storeMapFrame");i&&i.contentWindow&&i.contentWindow.postMessage({type:"FIT_BOUNDS",ids:s},"*")}_selectStore(e){const t=e.id||e.ID;this.selectedStoreId=t,this.activeTab="map";const s=this.shadowRoot.getElementById("storeMapFrame");s&&s.contentWindow&&s.contentWindow.postMessage({type:"FLY_TO_STORE",id:t},"*")}_getMapIframeSrcDoc(e,t){return`<!DOCTYPE html>
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
</html>`}render(){const e=this._getFilteredStores();return a`
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
            ${e.length===0?a`<li class="empty-state">Không tìm thấy cửa hàng phù hợp.</li>`:e.map(t=>{const s=t.id||t.ID,i=s===this.selectedStoreId;return a`
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
                            @click="${o=>o.stopPropagation()}"
                          >
                            Chỉ đường ↗
                          </a>
                        </div>
                      </div>

                      ${t.image?a`
                            <img
                              src="${P(t.image)}"
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
    `}}y(se,"properties",{stores:{type:Array,converter:_},data:{type:Object,converter:_},selectedStoreId:{state:!0},searchQuery:{state:!0},selectedCity:{state:!0},onlyOpen:{state:!0},activeTab:{state:!0},lang:{type:String}}),y(se,"styles",[fe,S`
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
    `]),v("wx-store-locator",se),console.log("[my-wix-ui-lib] Đã đăng ký thành công 5 Web Components tái sử dụng (Lit 3)"),u.DEFAULT_STORES=Be,u.WxBreadcrumb=Q,u.WxCategoryCarousel=q,u.WxFeatureBlocks=H,u.WxHotspotSection=Me,u.WxProductCard=ee,u.WxProductCarousel=V,u.WxProductDetail=ie,u.WxProductListing=te,u.WxStoreLocator=se,u.WxStorySection=Le,u.dispatchCustomEvent=R,u.formatCurrencyVND=Y,u.parseGallery=he,u.safeDefine=v,u.safeJsonParse=pe,u.t=p,u.themeStyles=fe,u.translations=J,Object.defineProperty(u,Symbol.toStringTag,{value:"Module"})})(this.MyWixUiLib=this.MyWixUiLib||{});
