/* eslint-disable */
/* global globalThis, litPropertyMetadata */
var globalThis = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this;
if (!globalThis.litPropertyMetadata) {
  globalThis.litPropertyMetadata = new WeakMap();
}
var litPropertyMetadata = globalThis.litPropertyMetadata;
var ut=Object.defineProperty;var ft=(m,C,T)=>C in m?ut(m,C,{enumerable:!0,configurable:!0,writable:!0,value:T}):m[C]=T;var v=(m,C,T)=>ft(m,typeof C!="symbol"?C+"":C,T);(function(m){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var We;const C=globalThis,T=C.ShadowRoot&&(C.ShadyCSS===void 0||C.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,de=Symbol(),ke=new WeakMap;let _e=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==de)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(T&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=ke.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ke.set(t,e))}return e}toString(){return this.cssText}};const Ve=n=>new _e(typeof n=="string"?n:n+"",void 0,de),I=(n,...e)=>{const t=n.length===1?n[0]:e.reduce((i,r,s)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+n[s+1],n[0]);return new _e(t,n,de)},Ye=(n,e)=>{if(T)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),r=C.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,n.appendChild(i)}},Se=T?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Ve(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:qe,defineProperty:Ke,getOwnPropertyDescriptor:Ze,getOwnPropertyNames:Xe,getOwnPropertySymbols:Je,getPrototypeOf:Qe}=Object,E=globalThis,Ce=E.trustedTypes,et=Ce?Ce.emptyScript:"",pe=E.reactiveElementPolyfillSupport,V=(n,e)=>n,he={toAttribute(n,e){switch(e){case Boolean:n=n?et:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Ae=(n,e)=>!qe(n,e),Ie={attribute:!0,type:String,converter:he,reflect:!1,useDefault:!1,hasChanged:Ae};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),E.litPropertyMetadata??(E.litPropertyMetadata=new WeakMap);let D=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ie){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&Ke(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=Ze(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:r,set(o){const a=r==null?void 0:r.call(this);s==null||s.call(this,o),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ie}static _$Ei(){if(this.hasOwnProperty(V("elementProperties")))return;const e=Qe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(V("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(V("properties"))){const t=this.properties,i=[...Xe(t),...Je(t)];for(const r of i)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(Se(r))}else e!==void 0&&t.push(Se(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ye(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var s;const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:he).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){var s,o;const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const a=i.getPropertyOptions(r),c=typeof a.converter=="function"?{fromAttribute:a.converter}:((s=a.converter)==null?void 0:s.fromAttribute)!==void 0?a.converter:he;this._$Em=r;const u=c.fromAttribute(t,a.type);this[r]=u??((o=this._$Ej)==null?void 0:o.get(r))??u,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){var o;if(e!==void 0){const a=this.constructor;if(r===!1&&(s=this[e]),i??(i=a.getPropertyOptions(e)),!((i.hasChanged??Ae)(s,t)||i.useDefault&&i.reflect&&s===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),s!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[s,o]of r){const{wrapped:a}=o,c=this[s];a!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,o,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(r=>{var s;return(s=r.hostUpdate)==null?void 0:s.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[V("elementProperties")]=new Map,D[V("finalized")]=new Map,pe==null||pe({ReactiveElement:D}),(E.reactiveElementVersions??(E.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=globalThis,Pe=n=>n,ie=Y.trustedTypes,ze=ie?ie.createPolicy("lit-html",{createHTML:n=>n}):void 0,Te="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,Ee="?"+L,tt=`<${Ee}>`,B=document,q=()=>B.createComment(""),K=n=>n===null||typeof n!="object"&&typeof n!="function",ue=Array.isArray,it=n=>ue(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",fe=`[ 	
\f\r]`,Z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Le=/-->/g,Me=/>/g,U=RegExp(`>|${fe}(?:([^\\s"'>=/]+)(${fe}*=${fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ne=/'/g,Be=/"/g,Ue=/^(?:script|style|textarea|title)$/i,rt=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),l=rt(1),O=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),Fe=new WeakMap,F=B.createTreeWalker(B,129);function Re(n,e){if(!ue(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ze!==void 0?ze.createHTML(e):e}const st=(n,e)=>{const t=n.length-1,i=[];let r,s=e===2?"<svg>":e===3?"<math>":"",o=Z;for(let a=0;a<t;a++){const c=n[a];let u,f,p=-1,b=0;for(;b<c.length&&(o.lastIndex=b,f=o.exec(c),f!==null);)b=o.lastIndex,o===Z?f[1]==="!--"?o=Le:f[1]!==void 0?o=Me:f[2]!==void 0?(Ue.test(f[2])&&(r=RegExp("</"+f[2],"g")),o=U):f[3]!==void 0&&(o=U):o===U?f[0]===">"?(o=r??Z,p=-1):f[1]===void 0?p=-2:(p=o.lastIndex-f[2].length,u=f[1],o=f[3]===void 0?U:f[3]==='"'?Be:Ne):o===Be||o===Ne?o=U:o===Le||o===Me?o=Z:(o=U,r=void 0);const h=o===U&&n[a+1].startsWith("/>")?" ":"";s+=o===Z?c+tt:p>=0?(i.push(u),c.slice(0,p)+Te+c.slice(p)+L+h):c+L+(p===-2?a:h)}return[Re(n,s+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class X{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,o=0;const a=e.length-1,c=this.parts,[u,f]=st(e,t);if(this.el=X.createElement(u,i),F.currentNode=this.el.content,t===2||t===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=F.nextNode())!==null&&c.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(const p of r.getAttributeNames())if(p.endsWith(Te)){const b=f[o++],h=r.getAttribute(p).split(L),y=/([.?@])?(.*)/.exec(b);c.push({type:1,index:s,name:y[2],strings:h,ctor:y[1]==="."?nt:y[1]==="?"?at:y[1]==="@"?lt:re}),r.removeAttribute(p)}else p.startsWith(L)&&(c.push({type:6,index:s}),r.removeAttribute(p));if(Ue.test(r.tagName)){const p=r.textContent.split(L),b=p.length-1;if(b>0){r.textContent=ie?ie.emptyScript:"";for(let h=0;h<b;h++)r.append(p[h],q()),F.nextNode(),c.push({type:2,index:++s});r.append(p[b],q())}}}else if(r.nodeType===8)if(r.data===Ee)c.push({type:2,index:s});else{let p=-1;for(;(p=r.data.indexOf(L,p+1))!==-1;)c.push({type:7,index:s}),p+=L.length-1}s++}}static createElement(e,t){const i=B.createElement("template");return i.innerHTML=e,i}}function j(n,e,t=n,i){var o,a;if(e===O)return e;let r=i!==void 0?(o=t._$Co)==null?void 0:o[i]:t._$Cl;const s=K(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==s&&((a=r==null?void 0:r._$AO)==null||a.call(r,!1),s===void 0?r=void 0:(r=new s(n),r._$AT(n,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=r:t._$Cl=r),r!==void 0&&(e=j(n,r._$AS(n,e.values),r,i)),e}class ot{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=((e==null?void 0:e.creationScope)??B).importNode(t,!0);F.currentNode=r;let s=F.nextNode(),o=0,a=0,c=i[0];for(;c!==void 0;){if(o===c.index){let u;c.type===2?u=new J(s,s.nextSibling,this,e):c.type===1?u=new c.ctor(s,c.name,c.strings,this,e):c.type===6&&(u=new ct(s,this,e)),this._$AV.push(u),c=i[++a]}o!==(c==null?void 0:c.index)&&(s=F.nextNode(),o++)}return F.currentNode=B,r}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class J{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=j(this,e,t),K(e)?e===w||e==null||e===""?(this._$AH!==w&&this._$AR(),this._$AH=w):e!==this._$AH&&e!==O&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):it(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==w&&K(this._$AH)?this._$AA.nextSibling.data=e:this.T(B.createTextNode(e)),this._$AH=e}$(e){var s;const{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=X.createElement(Re(i.h,i.h[0]),this.options)),i);if(((s=this._$AH)==null?void 0:s._$AD)===r)this._$AH.p(t);else{const o=new ot(r,this),a=o.u(this.options);o.p(t),this.T(a),this._$AH=o}}_$AC(e){let t=Fe.get(e.strings);return t===void 0&&Fe.set(e.strings,t=new X(e)),t}k(e){ue(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new J(this.O(q()),this.O(q()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const r=Pe(e).nextSibling;Pe(e).remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class re{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=w,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=w}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(s===void 0)e=j(this,e,t,0),o=!K(e)||e!==this._$AH&&e!==O,o&&(this._$AH=e);else{const a=e;let c,u;for(e=s[0],c=0;c<s.length-1;c++)u=j(this,a[i+c],t,c),u===O&&(u=this._$AH[c]),o||(o=!K(u)||u!==this._$AH[c]),u===w?e=w:e!==w&&(e+=(u??"")+s[c+1]),this._$AH[c]=u}o&&!r&&this.j(e)}j(e){e===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class nt extends re{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===w?void 0:e}}class at extends re{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==w)}}class lt extends re{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=j(this,e,t,0)??w)===O)return;const i=this._$AH,r=e===w&&i!==w||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==w&&(i===w||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class ct{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){j(this,e)}}const ge=Y.litHtmlPolyfillSupport;ge==null||ge(X,J),(Y.litHtmlVersions??(Y.litHtmlVersions=[])).push("3.3.3");const dt=(n,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let r=i._$litPart$;if(r===void 0){const s=(t==null?void 0:t.renderBefore)??null;i._$litPart$=r=new J(e.insertBefore(q(),s),s,void 0,t??{})}return r._$AI(n),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R=globalThis;class S extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=dt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return O}}S._$litElement$=!0,S.finalized=!0,(We=R.litElementHydrateSupport)==null||We.call(R,{LitElement:S});const me=R.litElementPolyfillSupport;me==null||me({LitElement:S}),(R.litElementVersions??(R.litElementVersions=[])).push("4.2.2");function _(n,e){if(!(typeof window>"u"||!window.customElements||window.customElements.get(n)))try{window.customElements.define(n,e)}catch(i){if(i.name==="NotSupportedError"&&i.message.includes("constructor")){class r extends e{}window.customElements.define(n,r)}else console.warn(`[my-wix-ui-lib] Không thể đăng ký ${n}:`,i)}}function P(n,e,t={}){const i=new CustomEvent(e,{detail:t,bubbles:!0,composed:!0,cancelable:!0});return n.dispatchEvent(i),i}function M(n){if(n==null||n==="")return"";if(typeof n=="string"){const e=Number(n.replace(/[^\d]/g,""));!isNaN(e)&&e>0&&(n=e)}return isNaN(n)||Number(n)<=0?"":new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",maximumFractionDigits:0}).format(n)}function be(n){if(!n||typeof n!="object")return 0;const e=[n.minPrice,n.price,n.min_price,n.regularPrice,n.unitPrice,n.gia,n.donGia,n.cost,n.maxPrice,n.max_price];for(const t of e)if(t!=null&&t!==""){if(typeof t=="number"&&t>0)return t;if(typeof t=="string"){const i=Number(t.replace(/[^\d]/g,""));if(!isNaN(i)&&i>0)return i}}return 0}function xe(n){if(!n||typeof n!="object")return{price:0,comparePrice:null,discountPercent:null};const e=a=>{if(a==null||a==="")return 0;if(typeof a=="number")return isNaN(a)?0:a;if(typeof a=="string"){const c=Number(a.replace(/[^\d]/g,""));return isNaN(c)?0:c}return 0},t=e(n.maxPrice)||e(n.max_price)||e(n.compareAtPrice)||e(n.regularPrice)||e(n.price),i=e(n.minPrice)||e(n.min_price)||e(n.discountedPrice);let r=0,s=null,o=null;return t>0&&i>0&&t>i?(r=i,s=t,o=Math.round((t-i)/t*100)):(r=t||i||e(n.price)||e(n.unitPrice),s=null,o=null),(!r||r<=0)&&typeof be=="function"&&(r=be(n)),{price:r,comparePrice:s,discountPercent:o}}function pt(n){if(!n||typeof n!="object")return 0;const{price:e}=xe(n);if(typeof e=="number"&&!isNaN(e)&&e>0)return e;const t=be(n);return typeof t=="number"&&!isNaN(t)&&t>0?t:0}function ye(n,e=null){if(!n)return e;if(typeof n=="object")return n;try{return JSON.parse(n)}catch{return e}}function z(n,e=""){if(!n||(typeof n=="object"&&n&&(n=n.src||n.url||e),typeof n!="string"))return e;const t=n.trim();if(!t)return e;if(t.startsWith("wix:image://")){const i=t.split("/");if(i.length>=4)return`https://static.wixstatic.com/media/${i[3].split("#")[0]}`}return t}function ve(n){if(!n)return[];if(typeof n=="string"){const e=n.trim();if(e.startsWith("[")||e.startsWith("{"))try{const t=JSON.parse(e);t&&(n=t)}catch{}}return Array.isArray(n)?n.map(e=>e?typeof e=="object"?e.src||e.url||"":String(e):"").filter(Boolean):typeof n!="string"?[]:n.split(";").map(e=>e.trim()).filter(Boolean)}function He(n){return typeof n!="string"?"":n.replace(/&quot;/g,'"').replace(/&#34;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">")}const k={fromAttribute(n){if(!n)return[];if(typeof n=="object")return Array.isArray(n)?n:[n];try{let e=typeof n=="string"?He(n.trim()):"";if(e.startsWith("[")||e.startsWith("{")){const t=JSON.parse(e);return Array.isArray(t)?t:[t]}if(e.includes(">")||e.includes(",")){const t=e.includes(">")?">":",";return e.split(t).map(i=>i.trim()).filter(Boolean).map((i,r,s)=>({label:i,url:r===0?"/":r===s.length-1?"#":""}))}return e?[{label:e,url:"#"}]:[]}catch(e){return console.warn("[jsonArrayConverter] Lỗi parse JSON:",e,n),[]}},toAttribute(n){return JSON.stringify(n)}},A={fromAttribute(n){if(!n)return null;if(typeof n=="object")return n;try{let e=typeof n=="string"?He(n.trim()):"";return JSON.parse(e)}catch(e){return console.warn("[jsonObjectConverter] Lỗi parse JSON:",e,n),null}},toAttribute(n){return JSON.stringify(n)}},we={fromAttribute(n){if(n==null)return!1;if(typeof n=="boolean")return n;const e=String(n).trim().toLowerCase();return!(e==="false"||e==="0"||e===""||e==="null"||e==="undefined")},toAttribute(n){return n?"true":null}};function ht(n){if(!n)return"#cccccc";const e=n.toLowerCase();return e.includes("nhiều màu")?"linear-gradient(135deg, #e53935, #fb8c00, #43a047, #1e88e5)":e.includes("trong suốt")?"linear-gradient(135deg, #ffffff 40%, #e0e0e0 60%)":e.includes("cherry blossom")||e.includes("anh đào")?"#e8a8b8":e.includes("đỏ cherry")?"#b51a2b":e.includes("grenadine")?"#6b1d28":e.includes("bordeaux")?"#58111a":e.includes("đỏ cam")?"#d34125":e.includes("đỏ")?"#c8102e":e.includes("basil")?"#315438":e.includes("sage")?"#879b83":e.includes("lime")?"#84b82c":e.includes("lục")?"#2d7a3a":e.includes("dark blue")?"#1b3558":e.includes("hoàng gia")?"#1f487e":e.includes("lamer")||e.includes("la mer")?"#2b767a":e.includes("xanh")?"#1d5f8a":e.includes("truffle")||e.includes("trufle")?"#ece8db":e.includes("trắng")?"#f8f8f8":e.includes("citron")?"#f1b82d":e.includes("gold")?"#d4af37":e.includes("vàng hồng")?"#d49a89":e.includes("vàng")?"#f1b82d":e.includes("chocolate")?"#4a2c20":e.includes("nâu")?"#5a3d2e":e.includes("granada")||e.includes("cinnamon")||e.includes("quế")||e.includes("cam")?"#d65a27":e.includes("macaron")?"#eec0c8":e.includes("sorbet")?"#f28599":e.includes("hồng")?"#f098aa":e.includes("kem")?"#f3e5ab":e.includes("đen")?"#222222":e.includes("bạc")||e.includes("inox")||e.includes("bề mặt bóng")?"#c0c0c0":e.includes("xám")?"#808080":"#cccccc"}const se={vi:{resultsCount:n=>`${n} sản phẩm`,sortBy:"Sắp xếp theo",sortPriceAsc:"Giá: Thấp đến Cao",sortPriceDesc:"Giá: Cao đến Thấp",sortTitleAsc:"Tên: A đến Z",filterCategory:"Danh mục",filterBrand:"Thương hiệu",filterSeries:"Dòng sản phẩm",filterColor:"Màu sắc",filterPrice:"Mức giá",clearAll:"Xóa tất cả",emptyProducts:"Không có sản phẩm nào phù hợp với bộ lọc.",showingItems:(n,e)=>`Đang hiển thị ${n} trên tổng số ${e} sản phẩm`,loadMore:"XEM THÊM SẢN PHẨM",searchFilters:"BỘ LỌC TÌM KIẾM",clear:"Xóa",categories:"DANH MỤC",allCategories:"Tất cả danh mục",noCategories:"Không có danh mục nào",brands:"THƯƠNG HIỆU",allBrands:"Tất cả thương hiệu",series:"DÒNG SẢN PHẨM",allSeries:"Tất cả dòng sản phẩm",noSeries:"Không có dòng sản phẩm nào",color:"MÀU SẮC",allColors:"Tất cả màu sắc",noColors:"Không có màu sắc nào",priceRange:"KHOẢNG GIÁ",allPrices:"Tất cả mức giá",priceUnder1m:"Dưới 1.000.000 ₫",price1mTo3m:"1.000.000 ₫ - 3.000.000 ₫",price3mTo5m:"3.000.000 ₫ - 5.000.000 ₫",priceOver5m:"Trên 5.000.000 ₫",reset:"Thiết lập lại",viewResults:n=>`Xem ${n} sản phẩm`,close:"Đóng",productFilterAria:"Bộ lọc sản phẩm",contactUs:"Liên hệ",noImage:"Chưa có ảnh",prevImage:"Ảnh trước",nextImage:"Ảnh sau",seriesLabel:n=>`Dòng sản phẩm: ${n}`,reviewsCount:n=>`(${n} Đánh giá)`,highlights:"Đặc điểm nổi bật:",descriptionTab:"MÔ TẢ SẢN PHẨM",specsTab:"THÔNG SỐ KỸ THUẬT",instructionsTab:"HƯỚNG DẪN SỬ DỤNG & BẢO QUẢN",noDescription:"Chưa có thông tin mô tả cho sản phẩm này.",noSpecs:"Chưa có thông số kỹ thuật.",defaultInstructions:["Vệ sinh bằng tay với nước ấm và xà phòng nhẹ sau khi sử dụng.","Lau khô hoàn toàn trước khi cất giữ.","Bảo quản nơi khô ráo, thoáng mát."],relatedProducts:"SẢN PHẨM LIÊN QUAN",toolbarResults:n=>`${n} KẾT QUẢ`,allBrandsToolbar:"Tất cả Thương hiệu",allCategoriesToolbar:"Tất cả Danh mục",sortDefault:"Sắp xếp: Mặc định",clearFilters:"Xóa bộ lọc",brandSectionTitle:"THƯƠNG HIỆU",seriesSectionTitle:"DÒNG SẢN PHẨM",seriesTag:"Dòng sản phẩm",scrollLeft:"Cuộn sang trái",scrollRight:"Cuộn sang phải",home:"TRANG CHỦ",products:"SẢN PHẨM",brandsBreadcrumb:"THƯƠNG HIỆU",about:"GIỚI THIỆU",news:"TIN TỨC"},en:{resultsCount:n=>`${n} Results`,sortBy:"Sort by",sortPriceAsc:"Price: Low to High",sortPriceDesc:"Price: High to Low",sortTitleAsc:"Name: A to Z",filterCategory:"Category",filterBrand:"Brand",filterSeries:"Series",filterColor:"Color",filterPrice:"Price",clearAll:"Clear All",emptyProducts:"No products found matching your filters.",showingItems:(n,e)=>`Showing ${n} of ${e} items`,loadMore:"LOAD MORE",searchFilters:"SEARCH FILTERS",clear:"Clear",categories:"CATEGORIES",allCategories:"All Categories",noCategories:"No categories found",brands:"BRANDS",allBrands:"All Brands",series:"SERIES",allSeries:"All Series",noSeries:"No series found",color:"COLOR",allColors:"All Colors",noColors:"No colors found",priceRange:"PRICE RANGE",allPrices:"All Prices",priceUnder1m:"Under 1,000,000 ₫",price1mTo3m:"1,000,000 ₫ - 3,000,000 ₫",price3mTo5m:"3,000,000 ₫ - 5,000,000 ₫",priceOver5m:"Over 5,000,000 ₫",reset:"Reset",viewResults:n=>`View ${n} products`,close:"Close",productFilterAria:"Product filters",contactUs:"Contact Us",noImage:"No image available",prevImage:"Previous image",nextImage:"Next image",seriesLabel:n=>`Series: ${n}`,reviewsCount:n=>`(${n} Reviews)`,highlights:"Highlights:",descriptionTab:"PRODUCT DESCRIPTION",specsTab:"SPECIFICATIONS",instructionsTab:"INSTRUCTIONS & CARE",noDescription:"No description available for this product.",noSpecs:"No specifications available.",defaultInstructions:["Hand wash with warm water and mild soap after use.","Dry completely before storage.","Store in a cool, dry place."],relatedProducts:"RELATED PRODUCTS",toolbarResults:n=>`${n} RESULTS`,allBrandsToolbar:"All Brands",allCategoriesToolbar:"All Categories",sortDefault:"Sort: Default",clearFilters:"Clear Filters",brandSectionTitle:"BRANDS",seriesSectionTitle:"SERIES",seriesTag:"Series",scrollLeft:"Scroll left",scrollRight:"Scroll right",home:"HOME",products:"PRODUCTS",brandsBreadcrumb:"BRANDS",about:"ABOUT US",news:"NEWS"}};function d(n,e="vi",...t){let i="vi";e&&typeof e=="string"?i=e.toLowerCase().startsWith("en")?"en":"vi":typeof document<"u"&&document.documentElement&&document.documentElement.lang&&(i=document.documentElement.lang.toLowerCase().startsWith("en")?"en":"vi");const r=se[i]||se.vi,s=r[n]!==void 0?r[n]:se.vi[n];return typeof s=="function"?s(...t):s!==void 0?s:n}class oe extends S{constructor(){super(),this.items=null,this.defaultItems="",this.current="",this.lang="vi",this.loading=!1}connectedCallback(){super.connectedCallback(),this._checkContext()}firstUpdated(e){super.firstUpdated(e),this._checkContext(),setTimeout(()=>this._checkContext(),200),setTimeout(()=>this._checkContext(),600)}_checkContext(){if(!this.items||!this.items.length){const e=this._getEffectiveItems();e&&e.length>0&&(this.items=e,this.loading=!1,this.requestUpdate())}}_getEffectiveItems(){if(this.items&&Array.isArray(this.items)&&this.items.length>0)return this.items;if(this.defaultItems){const e=k.fromAttribute(this.defaultItems);if(e&&e.length>0)return e}if(this.current)return[{label:"TRANG CHỦ",url:"/"},{label:this.current,url:"#"}];if(typeof document<"u"){try{if(document.querySelector("wx-store-locator")||document.querySelector("[data-locator]"))return[{label:"TRANG CHỦ",url:"/"},{label:"CỬA HÀNG",url:"/stores"}]}catch{}try{const e=(window.location.href||"")+" "+(window.location.pathname||"")+" "+(document.title||"");if(/store|cua-hang|cửa hàng/i.test(e))return[{label:"TRANG CHỦ",url:"/"},{label:"CỬA HÀNG",url:"/stores"}]}catch{}}return null}_formatLabel(e){if(!e||typeof e!="string")return"";const t=e.trim().toUpperCase();return t==="HOME"||t==="TRANG CHỦ"?d("home",this.lang):t==="PRODUCTS"||t==="SẢN PHẨM"?d("products",this.lang):t==="BRANDS"||t==="THƯƠNG HIỆU"?d("brandsBreadcrumb",this.lang):t==="ABOUT"||t==="ABOUT US"||t==="GIỚI THIỆU"||t==="VỀ CHÚNG TÔI"?d("about",this.lang):t==="BLOG"||t==="NEWS"||t==="BÀI VIẾT"||t==="TIN TỨC"?d("news",this.lang):e}_resolveUrl(e){if(!e||e==="#"||e==="")return"#";if(/^https?:\/\//i.test(e))return e;if(typeof window<"u"&&window.location){const t=window.location.hostname||"",i=window.location.pathname||"";if(t.includes("wixstudio.com")||t.includes("wixsite.com")){const r=i.split("/").filter(Boolean);if(r.length>0){const s="/"+r[0];if(e==="/")return s+"/";if(!e.startsWith(s))return e.startsWith("/")?`${s}${e}`:`${s}/${e}`}}}return e}_handleClick(e,t,i,r=this.items){if(r&&i===r.length-1)return;e.preventDefault(),P(this,"breadcrumb-click",{item:t,index:i});const s=t&&(t.url||t.link||t.href);if(!s||s==="#"||s==="")return;const o=this._resolveUrl(s);setTimeout(()=>{try{if(typeof window<"u"&&window.location){const a=(window.location.pathname||"").replace(/\/$/,""),c=o.replace(/\/$/,"");a!==c&&(window.location.href=o)}}catch{}},150)}render(){const e=this._getEffectiveItems();if((this.loading===!0||this.loading==="true"||!e&&this.items===null&&this.loading!==!1)&&!e)return l`
        <nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 8px;">
          <div class="skeleton-box" style="width: 70px; height: 14px;"></div>
          <span class="separator" aria-hidden="true">&#x203A;</span>
          <div class="skeleton-box" style="width: 100px; height: 14px;"></div>
        </nav>
      `;const r=e||[];return r.length?l`
      <nav aria-label="Breadcrumb">
        ${r.map((s,o)=>{const a=o===0,c=o===r.length-1,u=typeof s=="string"?s:s.label||s.title,f=this._formatLabel(u);return l`
            ${o>0?l`<span class="separator" aria-hidden="true">&#x203A;</span>`:""}
            <button
              class="crumb-btn ${a?"first":""} ${c?"active":""}"
              ?disabled="${c}"
              @click="${p=>this._handleClick(p,s,o,r)}"
              aria-current="${c?"page":"false"}"
            >
              ${f}
            </button>
          `})}
      </nav>
    `:l``}}v(oe,"properties",{items:{type:Array,converter:k},defaultItems:{type:String,attribute:"default-items"},current:{type:String},lang:{type:String},loading:{type:Boolean,converter:we}}),v(oe,"styles",I`
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
  `),_("wx-breadcrumb",oe);class Q extends S{constructor(){super(),this.items=null,this.categories=null,this.data=null,this.selectedId="",this.lang="vi",this.loading=!1,this._progressLeft=0,this._progressWidth=30}firstUpdated(){this._track=this.shadowRoot.querySelector(".track"),this._checkScroll()}updated(e){(e.has("items")||e.has("categories")||e.has("data"))&&this._checkScroll()}_checkScroll(){const e=this.categories||this.data||this.items||[];this._track&&e.length>=6&&(this._track.addEventListener("scroll",()=>this._updateProgress()),this._updateProgress())}_updateProgress(){if(!this._track)return;const{scrollLeft:e,scrollWidth:t,clientWidth:i}=this._track,r=t-i;if(r<=0)this._progressWidth=100,this._progressLeft=0;else{this._progressWidth=Math.max(15,i/t*100);const o=100-this._progressWidth;this._progressLeft=e/r*o}const s=this.shadowRoot.querySelector(".progress-thumb");s&&(s.style.width=`${this._progressWidth}%`,s.style.left=`${this._progressLeft}%`)}_scroll(e){if(!this._track)return;const t=300*e;this._track.scrollBy({left:t,behavior:"smooth"})}_selectItem(e){this.selectedId=e._id||e.ID||e.id||e.slug,P(this,"category-select",{category:e})}render(){const e=this.categories||this.data||this.items,t=e!=null,i=Array.isArray(e)?e:[];if(t&&i.length===0&&!this.loading)return this.removeAttribute("has-items"),l``;if(!i.length)return l`
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
          ${i.map(s=>{const o=s._id||s.ID||s.id||s.slug,a=this.selectedId===o,c=s.title||s.name||"",u=s.description||s.subtitle||s.desc||"",f=s.image||s.mainImage||s.bannerImage,p=f?z(f):"";return l`
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
                ${u?l`<span class="item-description">${u}</span>`:""}
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
    `}}v(Q,"properties",{items:{type:Array,converter:k},categories:{type:Array,converter:k},data:{type:Array,converter:k},selectedId:{type:String},lang:{type:String},loading:{type:Boolean}}),v(Q,"styles",I`
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
  `),_("wx-category-carousel",Q),_("wx-product-categories",class extends Q{});class ne extends S{constructor(){super(),this.product=null,this.activeImageIndex=0,this.lang="vi"}_getImages(){if(!this.product)return[];const e=this.product,t=[];if(e.mainImage){const r=z(e.mainImage);r&&t.push(r)}const i=e.gallery||e.media||e.images||e.mediaGallery;return i&&ve(i).forEach(s=>{const o=z(s);o&&!t.includes(o)&&t.push(o)}),t}_prevImage(e,t){e.stopPropagation(),t.length&&(this.activeImageIndex=(this.activeImageIndex-1+t.length)%t.length)}_nextImage(e,t){e.stopPropagation(),t.length&&(this.activeImageIndex=(this.activeImageIndex+1)%t.length)}_onClick(){P(this,"product-click",{product:this.product})}_getCardColors(){if(!this.product)return[];const e=this.product,t=[];if(e.variants&&Array.isArray(e.variants)&&e.variants.length>0)for(const i of e.variants){const r=i.color||"";r&&!t.some(s=>s.toLowerCase()===r.toLowerCase())&&t.push(r)}else e.color&&t.push(e.color);return t}render(){if(!this.product)return l``;const e=this.product,t=this._getImages(),i=t[this.activeImageIndex]||e.mainImage||(t.length?t[0]:""),{price:r,comparePrice:s,discountPercent:o}=xe(e),a=e.brand?e.brand.replace("brand-","").toUpperCase():"",c=this._getCardColors(),u=!!(e.variants&&e.variants.length>1&&e.minPrice&&e.maxPrice&&Number(e.minPrice)<Number(e.maxPrice)),f=u?null:o;let p=[];if(Array.isArray(e.labels))p=e.labels;else if(typeof e.labels=="string"){const g=ye(e.labels);if(Array.isArray(g))p=g;else if(e.labels.trim()&&e.labels!=="[]"){const $=e.labels.replace(/[\[\]"']/g,"").trim();$&&(p=[$])}}else e.label?p=[e.label]:e.ribbon&&(p=[e.ribbon]);if(e.isBestseller||e.bestseller){const g=this.lang==="vi"?"Bán chạy":"Bestseller";!p.includes(g)&&!p.includes("Bestseller")&&!p.includes("Bán chạy")&&p.unshift(g)}const b={"bán chạy":"Bestseller",mới:"New","mới mở bán":"New to sale","giảm giá":"On sale"},h={bestseller:"Bán chạy","best seller":"Bán chạy",new:"Mới","new to sale":"Mới mở bán","on sale":"Giảm giá"};p=p.filter(Boolean).map(g=>{const $=String(g).trim().toLowerCase();return this.lang==="en"?b[$]||g:h[$]||g});const y=t.length,N=y>1?100/y:100,x=y>1?this.activeImageIndex/y*100:0;return l`
      <div class="card" @click="${this._onClick}">
        <!-- Top Bar: % Giảm giá + Labels (Đã bỏ icon heart) -->
        <div class="top-bar">
          <div class="badges-group">
            ${f?l`<span class="badge-pill badge-discount">-${f}%</span>`:""}
            ${p.map(g=>l`<span class="badge-pill badge-label">${g}</span>`)}
          </div>
        </div>

        <!-- Image Viewport với Nút Next/Back Gallery khi Hover -->
        <div class="image-viewport">
          ${y>1?l`
                <button
                  class="nav-arrow prev"
                  @click="${g=>this._prevImage(g,t)}"
                  aria-label="${d("prevImage",this.lang)}"
                >
                  &#x2039;
                </button>
                <button
                  class="nav-arrow next"
                  @click="${g=>this._nextImage(g,t)}"
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
                  style="width: ${N}%; left: ${x}%;"
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
                  ${c.slice(0,5).map(g=>l`
                      <span
                        class="card-color-dot"
                        style="background: ${ht(g)}"
                        title="${g}"
                      ></span>
                    `)}
                  ${c.length>5?l`<span class="card-color-more">+${c.length-5}</span>`:""}
                </div>
              `:""}

          <div class="footer-row">
            <div class="price-col">
              ${!u&&s&&s>r?l`<span class="compare-price">${M(s)}</span>`:""}
              <span class="current-price">
                ${u?`${M(e.minPrice)} – ${M(e.maxPrice)}`:r?M(r):d("contactUs",this.lang)}
              </span>
            </div>
          </div>
        </div>
      </div>
    `}}v(ne,"properties",{product:{type:Object,converter:A},data:{type:Object,converter:A},activeImageIndex:{type:Number},lang:{type:String}}),v(ne,"styles",I`
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
  `),_("wx-product-card",ne);class ee extends S{constructor(){super(),this.title="",this.products=null,this.items=null,this.data=null,this.lang="vi",this.loading=!1,this._progressLeft=0,this._progressWidth=25}firstUpdated(){this._track=this.shadowRoot.querySelector(".track"),this._initScroll()}updated(e){(e.has("products")||e.has("items")||e.has("data"))&&this._initScroll()}_initScroll(){this._track&&(this._track.addEventListener("scroll",()=>this._updateProgress()),this._updateProgress())}_updateProgress(){if(!this._track)return;const{scrollLeft:e,scrollWidth:t,clientWidth:i}=this._track,r=t-i;if(r<=0)this._progressWidth=100,this._progressLeft=0;else{this._progressWidth=Math.max(15,i/t*100);const o=100-this._progressWidth;this._progressLeft=e/r*o}const s=this.shadowRoot.querySelector(".progress-thumb");s&&(s.style.width=`${this._progressWidth}%`,s.style.left=`${this._progressLeft}%`)}_scroll(e){if(!this._track)return;const t=320*e;this._track.scrollBy({left:t,behavior:"smooth"})}_onProductClick(e){P(this,"product-select",{product:e.detail.product})}render(){const e=this.data||this.items||this.products,t=e!=null,i=Array.isArray(e)?e:[];return t&&i.length===0&&!this.loading?l``:i.length?l`
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
      `}}v(ee,"properties",{title:{type:String},products:{type:Array,converter:k},items:{type:Array,converter:k},data:{type:Array,converter:k},lang:{type:String},loading:{type:Boolean}}),v(ee,"styles",I`
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
  `),_("wx-product-carousel",ee),_("wx-product",class extends ee{});class ae extends S{constructor(){super(),this.products=null,this.data=null,this.brands=[],this.categories=[],this.series=[],this.selectedCategory="",this.selectedBrand="",this.selectedSeries="",this.selectedColor="",this.selectedPriceRange="",this.selectedSort="default",this.sidebarOpen=!1,this.activeSidebarTab="all",this.visibleCount=32,this.pageSize=32,this.lang="vi",this.loading=!1}_categoryMatchesProduct(e,t){if(!e||!t)return!1;const i=e.ID||e._id,r=e.slug,s=e.path;return!!(i&&(t.category===i||t.brandCategory===i)||r&&(t.category===r||t.primaryCategorySlug===r)||t.category&&i&&t.category.includes(i)||t.categoryPath&&(r&&(t.categoryPath.includes(`/${r}/`)||t.categoryPath.endsWith(`/${r}`)||t.categoryPath.includes(r))||i&&t.categoryPath.includes(i)||s&&t.categoryPath.startsWith(s))||t.brandCategoryPath&&r&&t.brandCategoryPath.includes(r))}_seriesMatchesProduct(e,t){if(!e||!t)return!1;const i=e.ID||e._id,r=e.slug,s=e.title,o=t.series;if(!o)return!1;if(typeof o=="object"){const a=o.ID||o._id,c=o.slug;return!!(i&&(a===i||c===i)||r&&(a===r||c===r)||s&&o.title===s)}return!!(typeof o=="string"&&(i&&(o===i||o.includes(i))||r&&(o===r||o.includes(r))||s&&o.toLowerCase().includes(s.toLowerCase())))}_getAvailableCategories(){const e=this.data||this.products,t=Array.isArray(e)?e:[],i=Array.isArray(this.categories)?this.categories:[];return i.length?t.length?i.filter(r=>t.some(s=>this._categoryMatchesProduct(r,s))):[]:[]}_getAvailableSeries(){const e=this.data||this.products,t=Array.isArray(e)?e:[];let i=Array.isArray(this.series)?[...this.series]:[];if(!i.length&&t.length){const r=new Map;for(const s of t)if(s.series){let o="",a="",c=s.brand||"";typeof s.series=="object"?(o=s.series.ID||s.series._id||s.series.slug||"",a=s.series.title||o,c=s.series.brand||c):typeof s.series=="string"&&(o=s.series,a=o.replace(/^series-/,"").replace(/^brand-/,"").replace(/^[a-z]+-/,"").replace(/-/g," ").toUpperCase()),o&&!r.has(o)&&r.set(o,{ID:o,title:a,brand:c})}i=Array.from(r.values())}if(!i.length||!t.length)return[];if(this.selectedBrand){const r=this.selectedBrand.toLowerCase().replace(/^brand-/,"");i=i.filter(s=>{const o=(s.brand||"").toLowerCase().replace(/^brand-/,""),a=(s.ID||s.slug||"").toLowerCase();return o===r||o.includes(r)||r.includes(o)||a.includes(r)})}return i.filter(r=>t.some(s=>this._seriesMatchesProduct(r,s)))}_normalizeColor(e,t){if(!e)return"";let i=e.trim();if(/^(cao |dáng |H:|H :|Quánh|size |5 rãnh|Phiên bản|Mới)/i.test(i)||i==="Dáng thấp"){const r=t&&t.title||"";return r.includes("thép")||r.includes("Thép")||r.includes("Núm nồi gang")?"Bạc":r.includes("FRESH & SAVE")?"Trắng Trong":r.includes("Ebony")||r.includes("Chảo Rán")?"Đen":"Bạc"}return i==="Trắng Trufle"&&(i="Trắng Truffle"),i==="Bề mặt bóng"&&(i="Bạc"),i.toLowerCase()==="kem"&&(i="Kem"),i.toLowerCase()==="hồng"&&(i="Hồng"),i.toLowerCase()==="bạc"&&(i="Bạc"),i==="bạc, kèm ống hút"&&(i="Bạc"),i==="kem, kèm ống hút"&&(i="Kem"),i==="hồng, kèm ống hút"&&(i="Hồng"),i.toLowerCase()==="xanh dark blue"&&(i="Xanh Dark Blue"),i==="Set màu Macaron"&&(i="Macaron"),i==="Nhiều Màu"&&(i="Nhiều màu"),i}_getProductColor(e){if(!e)return"";let t=e.color||"";if(!t&&e.variants&&Array.isArray(e.variants)&&e.variants.length>0&&(t=e.variants[0].color||""),!t&&e.title){const i=e.title.match(/\((?:Màu\s+)?([^)]+)\)/i);i?t=i[1].trim():e.title.includes("ZWILLING Nova")&&(t="Bạc")}return this._normalizeColor(t,e)}_getProductColors(e){if(!e)return[];const t=new Set;if(e.variants&&Array.isArray(e.variants)&&e.variants.length>0)for(const s of e.variants){let o=s.color||"";if(!o&&s.title){const c=s.title.match(/\((?:Màu\s+)?([^)]+)\)/i);c&&(o=c[1].trim())}const a=this._normalizeColor(o,e);a&&t.add(a)}let i=e.color||"";if(!i&&e.title){const s=e.title.match(/\((?:Màu\s+)?([^)]+)\)/i);s?i=s[1].trim():e.title.includes("ZWILLING Nova")&&(i="Bạc")}const r=this._normalizeColor(i,e);if(r&&t.add(r),t.size===0){const s=this._getProductColor(e);s&&t.add(s)}return Array.from(t)}_getColorHex(e){if(!e)return"#cccccc";const t=e.toLowerCase();return t.includes("nhiều màu")?"linear-gradient(135deg, #e53935, #fb8c00, #43a047, #1e88e5)":t.includes("trong suốt")?"linear-gradient(135deg, #ffffff 40%, #e0e0e0 60%)":t.includes("cherry blossom")||t.includes("anh đào")?"#e8a8b8":t.includes("đỏ cherry")?"#b51a2b":t.includes("grenadine")?"#6b1d28":t.includes("bordeaux")?"#58111a":t.includes("đỏ cam")?"#d34125":t.includes("đỏ")?"#c8102e":t.includes("basil")?"#315438":t.includes("sage")?"#879b83":t.includes("lime")?"#84b82c":t.includes("lục")?"#2d7a3a":t.includes("dark blue")?"#1b3558":t.includes("hoàng gia")?"#1f487e":t.includes("lamer")||t.includes("la mer")?"#2b767a":t.includes("xanh")?"#1d5f8a":t.includes("truffle")||t.includes("trufle")?"#ece8db":t.includes("trắng")?"#f8f8f8":t.includes("citron")?"#f1b82d":t.includes("gold")?"#d4af37":t.includes("vàng hồng")?"#d49a89":t.includes("vàng")?"#f1b82d":t.includes("chocolate")?"#4a2c20":t.includes("nâu")?"#5a3d2e":t.includes("granada")||t.includes("cinnamon")||t.includes("quế")||t.includes("cam")?"#d65a27":t.includes("macaron")?"#eec0c8":t.includes("sorbet")?"#f28599":t.includes("hồng")?"#f098aa":t.includes("kem")?"#f3e5ab":t.includes("đen")?"#222222":t.includes("bạc")||t.includes("inox")||t.includes("bề mặt bóng")?"#c0c0c0":t.includes("xám")?"#808080":"#cccccc"}_getAvailableColors(){const e=this.data||this.products,t=Array.isArray(e)?[...e]:[];if(!t.length)return[];let i=t;if(this.selectedCategory){const o=(Array.isArray(this.categories)?this.categories:[]).find(a=>a.ID===this.selectedCategory||a._id===this.selectedCategory||a.slug===this.selectedCategory);o?i=i.filter(a=>this._categoryMatchesProduct(o,a)):i=i.filter(a=>{const c=this.selectedCategory;return a.category===c||a.categorySlug===c||a.brandCategory===c||a.category&&a.category.includes(c)||a.categoryPath&&a.categoryPath.includes(c)})}if(this.selectedBrand&&(i=i.filter(s=>{const o=this.selectedBrand.toLowerCase(),a=(s.brand||"").toLowerCase();return a===o||a.includes(o)||s.brandPath&&s.brandPath.toLowerCase().includes(o)})),this.selectedSeries){const o=(Array.isArray(this.series)?this.series:[]).find(a=>a.ID===this.selectedSeries||a._id===this.selectedSeries||a.slug===this.selectedSeries);o?i=i.filter(a=>this._seriesMatchesProduct(o,a)):i=i.filter(a=>{const c=this.selectedSeries;return a.series?typeof a.series=="object"?a.series.ID===c||a.series._id===c||a.series.slug===c:a.series===c||a.series.includes(c):!1})}this.selectedPriceRange&&(i=i.filter(s=>{const o=this._getProductPrice(s);switch(this.selectedPriceRange){case"under-1m":return o>0&&o<1e6;case"1m-3m":return o>=1e6&&o<=3e6;case"3m-5m":return o>=3e6&&o<=5e6;case"over-5m":return o>5e6;default:return!0}}));const r=new Map;for(const s of i){const o=this._getProductColors(s);for(const a of o)r.set(a,(r.get(a)||0)+1)}return Array.from(r.entries()).map(([s,o])=>({color:s,count:o})).sort((s,o)=>o.count-s.count||s.color.localeCompare(o.color))}_getFilteredProducts(){const e=this.data||this.products;let i=Array.isArray(e)?[...e]:[];if(this.selectedCategory){const s=(Array.isArray(this.categories)?this.categories:[]).find(o=>o.ID===this.selectedCategory||o._id===this.selectedCategory||o.slug===this.selectedCategory);s?i=i.filter(o=>this._categoryMatchesProduct(s,o)):i=i.filter(o=>{const a=this.selectedCategory;return o.category===a||o.categorySlug===a||o.brandCategory===a||o.category&&o.category.includes(a)||o.categoryPath&&o.categoryPath.includes(a)})}if(this.selectedBrand&&(i=i.filter(r=>{const s=this.selectedBrand.toLowerCase(),o=(r.brand||"").toLowerCase();return o===s||o.includes(s)||r.brandPath&&r.brandPath.toLowerCase().includes(s)})),this.selectedSeries){const s=(Array.isArray(this.series)?this.series:[]).find(o=>o.ID===this.selectedSeries||o._id===this.selectedSeries||o.slug===this.selectedSeries);s?i=i.filter(o=>this._seriesMatchesProduct(s,o)):i=i.filter(o=>{const a=this.selectedSeries;return o.series?typeof o.series=="object"?o.series.ID===a||o.series._id===a||o.series.slug===a:o.series===a||o.series.includes(a):!1})}if(this.selectedPriceRange&&(i=i.filter(r=>{const s=this._getProductPrice(r);switch(this.selectedPriceRange){case"under-1m":return s>0&&s<1e6;case"1m-3m":return s>=1e6&&s<=3e6;case"3m-5m":return s>=3e6&&s<=5e6;case"over-5m":return s>5e6;default:return!0}})),this.selectedColor){const r=this.selectedColor.toLowerCase();i=i.filter(s=>this._getProductColors(s).some(a=>a.toLowerCase()===r))}return this.selectedSort==="price-asc"?i.sort((r,s)=>this._getProductPrice(r)-this._getProductPrice(s)):this.selectedSort==="price-desc"?i.sort((r,s)=>this._getProductPrice(s)-this._getProductPrice(r)):this.selectedSort==="title-asc"&&i.sort((r,s)=>(r.title||"").localeCompare(s.title||"")),i}_getProductPrice(e){return pt(e)}_openSidebar(e="all"){this.activeSidebarTab=e,this.sidebarOpen=!0,e&&e!=="all"&&setTimeout(()=>{var i;const t=(i=this.shadowRoot)==null?void 0:i.querySelector(`#filter-section-${e}`);t&&t.scrollIntoView({behavior:"smooth",block:"nearest"})},50)}_closeSidebar(){this.sidebarOpen=!1}_clearAllFilters(e){e&&e.preventDefault(),this.selectedCategory="",this.selectedBrand="",this.selectedSeries="",this.selectedColor="",this.selectedPriceRange="",this.selectedSort="default",this.visibleCount=this.pageSize||32,this.requestUpdate()}_clearCategoryFilter(e){e&&(e.preventDefault(),e.stopPropagation()),this.selectedCategory="",this.requestUpdate()}_clearBrandFilter(e){e&&(e.preventDefault(),e.stopPropagation()),this.selectedBrand="",this.requestUpdate()}_clearSeriesFilter(e){e&&(e.preventDefault(),e.stopPropagation()),this.selectedSeries="",this.requestUpdate()}_clearColorFilter(e){e&&(e.preventDefault(),e.stopPropagation()),this.selectedColor="",this.requestUpdate()}_clearPriceFilter(e){e&&(e.preventDefault(),e.stopPropagation()),this.selectedPriceRange="",this.requestUpdate()}_loadMore(){this.visibleCount+=this.pageSize}updated(e){(e.has("selectedCategory")||e.has("selectedBrand")||e.has("selectedSeries")||e.has("selectedColor")||e.has("selectedPriceRange")||e.has("selectedSort")||e.has("products")||e.has("data"))&&(this.visibleCount=this.pageSize||32)}_onProductCardClick(e){P(this,"product-select",{product:e.detail.product})}render(){const e=this.data||this.products,t=Array.isArray(e)?e.length>0:e!=null;if(this.loading===!0||this.loading==="true"||this.products===null&&!t)return l`
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
      `;const s=this._getFilteredProducts(),o=this._getAvailableCategories(),a=this._getAvailableSeries(),c=this._getAvailableColors(),u=this.selectedCategory||this.selectedBrand||this.selectedSeries||this.selectedColor||this.selectedPriceRange,f=s.length,p=s.slice(0,this.visibleCount),b=f>0?Math.min(100,p.length/f*100):0;return l`
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

            ${u?l`<button class="reset-link" @click="${this._clearAllFilters}">${d("clearAll",this.lang)}</button>`:""}

            <button
              class="filter-trigger-btn all-filters-btn ${u?"has-value":""}"
              @click="${()=>this._openSidebar("all")}"
            >
              <span>${this.lang==="vi"?"Tất cả bộ lọc":"All Filters"}</span>
              ${u?l`<span class="active-dot"></span>`:""}
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

        ${f>this.pageSize?l`
              <div class="pagination-wrapper">
                <div class="showing-text">
                  ${d("showingItems",this.lang,p.length,f)}
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar-fill" style="width: ${b}%;"></div>
                </div>
                ${p.length<f?l`
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
    `}}v(ae,"properties",{products:{type:Array,converter:k},data:{type:Array,converter:k},brands:{type:Array,converter:k},categories:{type:Array,converter:k},series:{type:Array,converter:k},selectedCategory:{type:String},selectedBrand:{type:String},selectedSeries:{type:String},selectedColor:{type:String},selectedPriceRange:{type:String},selectedSort:{type:String},sidebarOpen:{type:Boolean},activeSidebarTab:{type:String},visibleCount:{type:Number},pageSize:{type:Number},lang:{type:String},loading:{type:Boolean,converter:we}}),v(ae,"styles",I`
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
  `),_("wx-product-listing",ae);class le extends S{constructor(){super(),this.product=null,this.data=null,this.selectedImageIndex=0,this.selectedVariantIndex=0,this.lang="vi",this.loading=!1,this.shopeeUrl="",this.tiktokUrl="",this.messUrl="",this.openSections={description:!0,specifications:!1,instructions:!1},this.isZoomed=!1,this.zoomX=50,this.zoomY=50}_onMouseMove(e){const t=e.currentTarget.getBoundingClientRect();if(!t.width||!t.height)return;const i=(e.clientX-t.left)/t.width*100,r=(e.clientY-t.top)/t.height*100;this.zoomX=Math.max(0,Math.min(100,i)),this.zoomY=Math.max(0,Math.min(100,r)),this.isZoomed=!0}_onMouseLeave(){this.isZoomed=!1,this.zoomX=50,this.zoomY=50}_getVariants(){const e=this.data||this.product;return e?Array.isArray(e.variants)&&e.variants.length>0?e.variants:[{ID:e.ID,title:e.title,color:e.color||"",sizeLabel:e.sizeLabel||e.size||"",price:e.minPrice||e.price||0,compareAtPrice:e.maxPrice||e.compareAtPrice||"",mainImage:e.mainImage||"",gallery:e.gallery||"",shopeeUrl:e.shopeeUrl||this.shopeeUrl||"",tiktokUrl:e.tiktokUrl||this.tiktokUrl||""}]:[]}_getActiveVariant(){const e=this._getVariants();if(!e.length)return null;const t=Math.max(0,Math.min(this.selectedVariantIndex,e.length-1));return e[t]||e[0]}_selectVariant(e){this.selectedVariantIndex=e,this.selectedImageIndex=0;const t=this._getActiveVariant();t&&P(this,"variant-change",{variant:t}),this.requestUpdate()}_getColorHex(e){if(!e)return"#cccccc";const t=e.toLowerCase();return t.includes("nhiều màu")?"linear-gradient(135deg, #e53935, #fb8c00, #43a047, #1e88e5)":t.includes("trong suốt")?"linear-gradient(135deg, #ffffff 40%, #e0e0e0 60%)":t.includes("cherry blossom")||t.includes("anh đào")?"#e8a8b8":t.includes("đỏ cherry")?"#b51a2b":t.includes("grenadine")?"#6b1d28":t.includes("bordeaux")?"#58111a":t.includes("đỏ cam")?"#d34125":t.includes("đỏ")?"#c8102e":t.includes("basil")?"#315438":t.includes("sage")?"#879b83":t.includes("lime")?"#84b82c":t.includes("lục")?"#2d7a3a":t.includes("dark blue")?"#1b3558":t.includes("hoàng gia")?"#1f487e":t.includes("lamer")||t.includes("la mer")?"#2b767a":t.includes("xanh")?"#1d5f8a":t.includes("truffle")||t.includes("trufle")?"#ece8db":t.includes("trắng")?"#f8f8f8":t.includes("citron")?"#f1b82d":t.includes("gold")?"#d4af37":t.includes("vàng hồng")?"#d49a89":t.includes("vàng")?"#f1b82d":t.includes("chocolate")?"#4a2c20":t.includes("nâu")?"#5a3d2e":t.includes("granada")||t.includes("cinnamon")||t.includes("quế")||t.includes("cam")?"#d65a27":t.includes("macaron")?"#eec0c8":t.includes("sorbet")?"#f28599":t.includes("hồng")?"#f098aa":t.includes("kem")?"#f3e5ab":t.includes("đen")?"#222222":t.includes("bạc")||t.includes("inox")||t.includes("bề mặt bóng")?"#c0c0c0":t.includes("xám")?"#808080":"#cccccc"}_getImages(){const e=[],t=this.data||this.product;if(!t)return e;const i=this._getActiveVariant(),r=i&&i.mainImage||t.mainImage;if(r){const o=z(r);o&&e.push(o)}const s=i&&i.gallery||t.gallery||t.media||t.images||t.mediaGallery;return s&&ve(s).forEach(a=>{const c=z(a);c&&!e.includes(c)&&e.push(c)}),e}_prevImage(e){e.length&&(this.selectedImageIndex=(this.selectedImageIndex-1+e.length)%e.length)}_nextImage(e){e.length&&(this.selectedImageIndex=(this.selectedImageIndex+1)%e.length)}_toggleSection(e){this.openSections={...this.openSections,[e]:!this.openSections[e]}}_renderHighlights(e){if(!e||typeof e!="string")return l``;const t=e.split(`
`).map(o=>o.trim()).filter(Boolean),i=[],r=[],s=/^[-–—*•·]\s*/;for(const o of t)s.test(o)?r.push(o.replace(s,"")):r.length===0?i.push(o):r.push(o);return l`
      ${i.length?l`<div class="highlights-heading">${i.join(" ")}</div>`:""}
      ${r.length?l`<ul class="highlights-list">
            ${r.map(o=>l`<li>${o}</li>`)}
          </ul>`:""}
    `}_getSocialUrl(e,t){const i=this._getActiveVariant()||t;if(e==="shopee"){const r=this.shopeeUrl||i&&i.shopeeUrl||t&&t.shopeeUrl;return r&&typeof r=="string"&&r.trim()&&r.trim()!=="#"?r.trim():""}if(e==="tiktok"){const r=this.tiktokUrl||i&&i.tiktokUrl||t&&t.tiktokUrl;return r&&typeof r=="string"&&r.trim()&&r.trim()!=="#"?r.trim():""}if(e==="mess"){const r="https://www.messenger.com/login.php?next=https%3A%2F%2Fwww.messenger.com%2Ft%2F103476402846237%2F%3Fmessaging_source%3Dsource%253Apages%253Amessage_shortlink%26source_id%3D1441792%26recurring_notification%3D0",s=this.messUrl||i&&(i.messUrl||i.messengerUrl)||t&&(t.messUrl||t.messengerUrl)||r;return s&&typeof s=="string"&&s.trim()&&s.trim()!=="#"?s.trim():r}return""}_onSocialClick(e,t){const i=this.product||this.data||{},r=this._getSocialUrl(e,i);P(this,"social-click",{channel:e,url:r,product:i}),P(this,`${e}-click`,{url:r,product:i})}_renderSocialActions(e){const t=this._getSocialUrl("shopee",e),i=this._getSocialUrl("tiktok",e),r=this._getSocialUrl("mess",e);return!t&&!i&&!r?"":l`
      <div class="social-actions-group" aria-label="Kênh liên hệ và mua hàng">
        <!-- Button 1: Shopee (Icon 1) - Chỉ hiển thị khi sản phẩm có link Shopee -->
        ${t?l`
              <a
                class="social-btn shopee"
                href="${t}"
                target="_blank"
                rel="noopener noreferrer"
                @click="${s=>this._onSocialClick("shopee",s)}"
                title="Mua trên Shopee"
              >
                <svg viewBox="0 0 512 512" width="22" height="22" style="flex-shrink:0;">
                  <!-- Quai túi cam -->
                  <path fill="#EE4D2D" d="M344 144c0-48.6-39.4-88-88-88s-88 39.4-88 88v16h36v-16c0-28.7 23.3-52 52-52s52 23.3 52 52v16h36v-16z"/>
                  <!-- Thân túi cam -->
                  <path fill="#EE4D2D" d="M56 156l24 290c2 24.2 22.2 43 46.5 43h259c24.3 0 44.5-18.8 46.5-43l24-290H56z"/>
                  <!-- Chữ S trắng nét cong mềm mại -->
                  <path fill="none" stroke="#FFFFFF" stroke-width="36" stroke-linecap="round" stroke-linejoin="round" d="M312 245c-14-25-33-35-56-35-32 0-56 22-56 50 0 46 112 36 112 94 0 32-26 56-56 56-28 0-48-15-58-40"/>
                </svg>
                <span>Shopee</span>
              </a>
            `:""}

        <!-- Button 2: TikTok - Chỉ hiển thị khi sản phẩm có link TikTok -->
        ${i?l`
              <a
                class="social-btn tiktok"
                href="${i}"
                target="_blank"
                rel="noopener noreferrer"
                @click="${s=>this._onSocialClick("tiktok",s)}"
                title="Xem trên TikTok"
              >
                <svg viewBox="0 0 512 512" width="20" height="20" style="flex-shrink:0;">
                  <path fill="#25F4EE" d="M352 144c-35-15-58-48-60-88h-40v268c0 35.3-28.7 64-64 64s-64-28.7-64-64 28.7-64 64-64c8 0 15.7 1.5 22.8 4.2V178c-7.3-1.3-14.9-2-22.8-2-61.9 0-112 50.1-112 112s50.1 112 112 112 112-50.1 112-112V180c35 25 78 40 124 40v-40c-30 0-58-13-72-36z" transform="translate(-4, -4)"/>
                  <path fill="#FE2C55" d="M352 144c-35-15-58-48-60-88h-40v268c0 35.3-28.7 64-64 64s-64-28.7-64-64 28.7-64 64-64c8 0 15.7 1.5 22.8 4.2V178c-7.3-1.3-14.9-2-22.8-2-61.9 0-112 50.1-112 112s50.1 112 112 112 112-50.1 112-112V180c35 25 78 40 124 40v-40c-30 0-58-13-72-36z" transform="translate(4, 4)"/>
                  <path fill="#010101" d="M352 144c-35-15-58-48-60-88h-40v268c0 35.3-28.7 64-64 64s-64-28.7-64-64 28.7-64 64-64c8 0 15.7 1.5 22.8 4.2V178c-7.3-1.3-14.9-2-22.8-2-61.9 0-112 50.1-112 112s50.1 112 112 112 112-50.1 112-112V180c35 25 78 40 124 40v-40c-30 0-58-13-72-36z"/>
                </svg>
                <span>TikTok</span>
              </a>
            `:""}

        <!-- Button 3: Messenger (Icon 2) -->
        ${r?l`
              <a
                class="social-btn mess"
                href="${r}"
                target="_blank"
                rel="noopener noreferrer"
                @click="${s=>this._onSocialClick("mess",s)}"
                title="Nhắn tin qua Messenger"
              >
                <svg viewBox="0 0 512 512" width="22" height="22" style="flex-shrink:0;">
                  <defs>
                    <linearGradient id="wx-msg-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#0078FF"/>
                      <stop offset="30%" stop-color="#0099FF"/>
                      <stop offset="60%" stop-color="#A033FF"/>
                      <stop offset="85%" stop-color="#FF5277"/>
                      <stop offset="100%" stop-color="#FF6969"/>
                    </linearGradient>
                  </defs>
                  <!-- Khung bong bóng chat gradient -->
                  <path fill="url(#wx-msg-gradient)" d="M256 20C132.3 20 32 113.8 32 229.4c0 65.5 32.8 122.2 84.4 159.2 4.4 3.1 7.1 8.2 6.9 13.6l-3.2 42.4c-.9 12 11.2 20.8 22 15.3l48.8-24.6c4.1-2.1 8.9-2.5 13.3-1.2 16.5 4.9 34.1 7.6 52.3 7.6 123.7 0 224-93.8 224-209.4C480 113.8 379.7 20 256 20z"/>
                  <!-- Tia sét trắng bo góc mềm mại -->
                  <path fill="#FFFFFF" d="M142 328l76.5-121.2c8.9-14.1 28.7-16.4 40.6-4.8l60.8 59.1c4.3 4.2 11.1 4.2 15.4 0l81.8-62c11-8.4 25.4 5.4 17.9 17.2l-76.5 121.2c-8.9 14.1-28.7 16.4-40.6 4.8l-60.8-59.1c-4.3-4.2-11.1-4.2-15.4 0l-81.8 62c-11 8.4-25.4-5.4-17.9-17.2z"/>
                </svg>
                <span>Mess</span>
              </a>
            `:""}
      </div>
    `}_renderDescription(e){if(!e||typeof e!="string")return l``;const t=e.split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean),i=[],r=/^[-–—*•·]\s*/;for(const s of t){const o=s.split(`
`).map(c=>c.trim()).filter(Boolean);if(o.every(c=>r.test(c))){const c=o.map(u=>u.replace(r,""));i.push(l`<ul class="desc-bullets">
          ${c.map(u=>l`<li>${u}</li>`)}
        </ul>`)}else{const c=[],u=[];for(const f of o)r.test(f)?u.push(f.replace(r,"")):c.push(f);c.length&&i.push(l`<p class="desc-paragraph">${c.join(" ")}</p>`),u.length&&i.push(l`<ul class="desc-bullets">
            ${u.map(f=>l`<li>${f}</li>`)}
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
      `;if(!e)return l``;const r=e,s=this._getVariants(),o=this._getActiveVariant()||r,a=this._getImages(),c=a[this.selectedImageIndex]||a[0],u=r.brand?r.brand.replace("brand-","").toUpperCase():"",f=r.series?r.series.replace("series-","").replace(/--.+/,"").toUpperCase():"",{price:p,comparePrice:b,discountPercent:h}=xe(o||r),y=o&&o.sizeLabel||r.sizeLabel||r.size||"",N=ye(r.specs,[]);return l`
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
                  ${a.map((x,g)=>l`
                    <div
                      class="thumb-cell ${g===this.selectedImageIndex?"active":""}"
                      @click="${()=>this.selectedImageIndex=g}"
                    >
                      <img src="${x}" alt="Thumbnail ${g+1}" />
                    </div>
                  `)}
                </div>
              `:""}
        </div>

        <!-- Cột Thông tin bên phải -->
        <div class="info-col">
          ${u?l`<div class="brand-row">${u}</div>`:""}

          <h1 class="product-title">${r.title}</h1>

          ${f?l`<div class="series-name">${d("seriesLabel",this.lang,f)}</div>`:""}

          <!-- Price Row -->
          <div class="price-row">
            ${b&&b>p?l`<span class="compare-price">${M(b)}</span>`:""}
            <span class="sale-price">${p?M(p):d("contactUs",this.lang)}</span>
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
                        ${s.map((x,g)=>{const $=g===this.selectedVariantIndex,H=x.mainImage?z(x.mainImage):"",G=this._getColorHex(x.color),Ge=x.price?M(x.price):"";return l`
                            <div
                              class="color-swatch-item ${$?"selected":""}"
                              @click="${()=>this._selectVariant(g)}"
                              title="${x.color}"
                            >
                              <div class="swatch-circle">
                                ${H?l`<img class="swatch-img" src="${H}" alt="${x.color}" />`:l`<div class="swatch-fallback-dot" style="background: ${G};"></div>`}
                              </div>
                              ${Ge?l`<div class="swatch-price">${Ge}</div>`:l`<div class="swatch-price not-available">${this.lang==="vi"?"HẾT HÀNG":"NOT AVAILABLE"}</div>`}
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
                      ${N&&N.length>0?l`
                            <table class="specs-table">
                              <tbody>
                                ${N.map(x=>l`
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
    `}}v(le,"properties",{product:{type:Object,converter:A},data:{type:Object,converter:A},selectedImageIndex:{type:Number},selectedVariantIndex:{type:Number},openSections:{type:Object},lang:{type:String},loading:{type:Boolean,converter:we},shopeeUrl:{type:String,attribute:"shopee-url"},tiktokUrl:{type:String,attribute:"tiktok-url"},messUrl:{type:String,attribute:"mess-url"},isZoomed:{state:!0},zoomX:{state:!0},zoomY:{state:!0}}),v(le,"styles",I`
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

    .social-btn svg {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
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
      .social-btn svg {
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
      gap: 6px;
      font-size: 14px;
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
      font-size: 11px;
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
      font-size: 10px;
    }

    .size-pills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
    }

    .size-pill {
      min-width: 68px;
      height: 40px;
      padding: 0 16px;
      border-radius: 4px;
      border: 1px solid #d0d0d0;
      background: #efecea;
      color: #222222;
      font-size: 13px;
      font-weight: 500;
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
  `),_("wx-product-detail",le);class te extends S{constructor(){super(),this.title="",this.products=null,this.items=null,this.data=null,this.currentProduct=null,this.product=null,this.category="",this.limit=4,this.lang="vi",this.loading=!1,this._progressLeft=0,this._progressWidth=25}firstUpdated(){this._grid=this.shadowRoot.querySelector(".related-grid"),this._initScroll()}updated(e){(e.has("products")||e.has("items")||e.has("data"))&&this._initScroll()}_initScroll(){this._grid&&(this._grid.addEventListener("scroll",()=>this._updateProgress()),this._updateProgress())}_updateProgress(){if(!this._grid)return;const{scrollLeft:e,scrollWidth:t,clientWidth:i}=this._grid,r=t-i;if(r<=0)this._progressWidth=100,this._progressLeft=0;else{this._progressWidth=Math.max(25,i/t*100);const o=100-this._progressWidth;this._progressLeft=e/r*o}const s=this.shadowRoot.querySelector(".progress-thumb");s&&(s.style.width=`${this._progressWidth}%`,s.style.left=`${this._progressLeft}%`)}_scroll(e){if(!this._grid)return;const t=260*e;this._grid.scrollBy({left:t,behavior:"smooth"})}_getEffectiveProducts(){const e=this.data||this.items||this.products;if(!e||!Array.isArray(e))return[];const t=this.currentProduct||this.product,i=t?t.ID||t.id||t._id||t.slug:"";let r=i?e.filter(f=>(f.ID||f.id||f._id||f.slug)!==i):[...e],s=this.category,o="",a="",c="";if(t&&(s||(typeof t.category=="object"&&t.category!==null?s=t.category._id||t.category.ID||t.category.slug||"":s=t.category||""),o=t.categoryPath||"",a=t.brandCategory||"",c=t.brand||""),s||o||a){const f=(s||"").toLowerCase().trim(),p=(a||"").toLowerCase().trim(),b=(o||"").split("/").filter(Boolean),h=b.length>0?b[0].toLowerCase().trim():"",y=r.filter($=>{const H=String($.category||"").toLowerCase().trim(),G=String($.brandCategory||"").toLowerCase().trim();return f&&(H===f||G===f)||p&&(H===p||G===p)}),N=r.filter($=>{if(y.includes($))return!1;const H=String($.categoryPath||"").toLowerCase(),G=String($.category||"").toLowerCase();return h&&(H.includes(`/${h}/`)||G.includes(h))}),x=r.filter($=>y.includes($)||N.includes($)?!1:c&&$.brand===c),g=[...y,...N,...x];g.length>0&&(r=g)}const u=Number(this.limit)>0?Number(this.limit):4;return r.slice(0,u)}_onProductClick(e){P(this,"product-select",{product:e.detail.product})}render(){const e=this._getEffectiveProducts(),t=this.title||d("relatedProducts",this.lang),i=Number(this.limit)>0?Number(this.limit):4;return this.loading||this.products===null&&this.items===null&&this.data===null?l`
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
    `:l``}}v(te,"properties",{title:{type:String},products:{type:Array,converter:k},items:{type:Array,converter:k},data:{type:Array,converter:k},currentProduct:{type:Object,converter:A},product:{type:Object,converter:A},category:{type:String},limit:{type:Number},lang:{type:String},loading:{type:Boolean}}),v(te,"styles",I`
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
  `),_("wx-related-products",te),_("wx-related",class extends te{});const $e=I`
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
`;class W extends S{constructor(){super(),this.blocks=[],this.items=[],this.data=null,this.type="all",this.lang="vi",this.activeHotspotIndex=0,this.failedImages=new Set}updated(e){super.updated(e);const t=this._getFilteredBlocks();this.hidden=!t||t.length===0}_getFilteredBlocks(){const e=this._getEffectiveBlocks();return!e||e.length===0?[]:e.filter(t=>{const i=t.component||"story";return i==="intro"?!1:!this.type||this.type==="all"?i==="story"||i==="highlights":i===this.type})}_getEffectiveBlocks(){return this.block&&typeof this.block=="object"?[this.block]:this.data&&Array.isArray(this.data.blocks)?this.data.blocks:this.data&&this.data.block&&typeof this.data.block=="object"?[this.data.block]:Array.isArray(this.blocks)?this.blocks:[]}_getEffectiveItems(){return this.data&&Array.isArray(this.data.items)?this.data.items:Array.isArray(this.items)?this.items:[]}_getItemsForBlock(e){const t=this._getEffectiveItems();if(!t||t.length===0)return[];if(t.length<=10)return t.slice().sort((o,a)=>(Number(o.position)||0)-(Number(a.position)||0));const i=typeof e=="object"&&e?e._id||"":e,r=typeof e=="object"&&e?e.ID||"":e,s=typeof e=="object"&&e&&e.title||"";return t.filter(o=>{const a=o.block;if(!a)return!0;if(typeof a=="object"&&a!==null){const c=a._id||"",u=a.ID||"",f=a.title||"";return i&&(c===i||u===i)||r&&(c===r||u===r)||s&&(c===s||u===s||f===s)}return i&&a===i||r&&a===r||s&&a===s}).sort((o,a)=>(Number(o.position)||0)-(Number(a.position)||0))}_onImageError(e){if(e){const t=new Set(this.failedImages);t.add(e),this.failedImages=t}}_isImageAvailable(e){return!e||typeof e!="string"||!e.trim()?!1:!this.failedImages.has(e)}_renderPlaceholder(e="220px",t=null){const i=t||d("noImage",this.lang)||"Chưa có ảnh";return l`
      <div class="no-image-placeholder" style="min-height: ${e};">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <span>${i}</span>
      </div>
    `}_renderMedia(e,t="",i="220px"){const r=z(e);return this._isImageAvailable(r)?l`
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
    `}_toggleAccordion(e){this.activeHotspotIndex===e?this.activeHotspotIndex=-1:this.activeHotspotIndex=e}_selectHotspot(e){this.activeHotspotIndex=e}_renderHighlightsBlock(e,t){const i=t.length>0?t:[],r=e.image||(e.ID?`/images/${e.ID}.png`:e._id?`/images/${e._id}.png`:""),s=z(r),o=this._isImageAvailable(s);return l`
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
                  ${i.map((a,c)=>{const u=a.coordX!==void 0&&a.coordX!==null&&a.coordX!==""?a.coordX:a.x??a.hotspotX,f=a.coordY!==void 0&&a.coordY!==null&&a.coordY!==""?a.coordY:a.y??a.hotspotY;if(u==null||u==="")return"";const p=parseFloat(u),b=parseFloat(f);if(isNaN(p)||isNaN(b))return"";const h=this.activeHotspotIndex===c;return l`
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
          ${i.map((a,c)=>{const u=this.activeHotspotIndex===c;return l`
              <div class="accordion-row ${u?"active":""}">
                <button
                  class="accordion-btn"
                  @click="${()=>this._toggleAccordion(c)}"
                  aria-expanded="${u}"
                >
                  <span class="accordion-title">${a.title}</span>
                  <span class="accordion-icon">${u?"▲":"▼"}</span>
                </button>

                ${u?l`
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
    `}}v(W,"properties",{blocks:{type:Array,converter:A},block:{type:Object,converter:A},items:{type:Array,converter:A},data:{type:Object,converter:A},type:{type:String},lang:{type:String},activeHotspotIndex:{state:!0},failedImages:{state:!0}}),v(W,"styles",[$e,I`
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
    `]),_("wx-feature-blocks",W);class De extends W{constructor(){super(),this.type="story"}}_("wx-story-section",De);class Oe extends W{constructor(){super(),this.type="highlights"}}_("wx-hotspot-section",Oe);const je=[{id:"store-crescent-mall",ID:"store-crescent-mall",title:"ZWILLING CRESCENT MALL",address:"Tầng 4F - 33, Crescent Mall, 101 Tôn Dật Tiên, Phường Tân Phú, Quận 7, TP.HCM",city:"TP. Hồ Chí Minh",hotline:"028 399 07010",openHours:"10:00 - 22:00",latitude:10.7293,longitude:106.7198,googleMapsUrl:"https://maps.google.com/?q=Crescent+Mall+101+Ton+Dat+Tien+Tan+Phu+Quan+7+TPHCM",image:"/images/store-crescent-mall.jpg",position:1},{id:"store-estella-place",ID:"store-estella-place",title:"ZWILLING ESTELLA PLACE",address:"Tầng 3 - Estella Place, 88 Song Hành, Phường An Phú, TP. Thủ Đức, TP.HCM",city:"TP. Hồ Chí Minh",hotline:"0283 519 3209",openHours:"09:30 - 22:00",latitude:10.8016,longitude:106.7431,googleMapsUrl:"https://maps.google.com/?q=Estella+Place+88+Song+Hanh+An+Phu+TP+Thu+Duc+TPHCM",image:"/images/store-estella.jpg",position:2},{id:"store-lotte-lieu-giai",ID:"store-lotte-lieu-giai",title:"ZWILLING LOTTE DEPARTMENT STORE",address:"Tầng 5 - Lotte Department Store, 54 Liễu Giai, Phường Cống Vị, Ba Đình, Hà Nội",city:"Hà Nội",hotline:"0243 212 1177",openHours:"09:30 - 22:00",latitude:21.0318,longitude:105.8142,googleMapsUrl:"https://maps.google.com/?q=Lotte+Department+Store+54+Lieu+Giai+Ba+Dinh+Ha+Noi",image:"/images/store-lotte.jpg",position:3}];class ce extends S{constructor(){super(),this.stores=[],this.data=null,this.selectedStoreId="",this.searchQuery="",this.selectedCity="all",this.onlyOpen=!1,this.activeTab="list",this.lang="vi",this._boundOnMessage=null,this._lastStoresKey="",this._cachedSrcDoc=""}connectedCallback(){super.connectedCallback(),this._boundOnMessage=this._onWindowMessage.bind(this),window.addEventListener("message",this._boundOnMessage)}disconnectedCallback(){super.disconnectedCallback(),this._boundOnMessage&&window.removeEventListener("message",this._boundOnMessage)}_onWindowMessage(e){if(e.data&&e.data.type==="STORE_MARKER_CLICK"){const t=String(e.data.id||"");if(t){this.selectedStoreId=t;const i=this.shadowRoot.querySelector(`[data-store-id="${t}"]`);i&&i.scrollIntoView({behavior:"smooth",block:"nearest"})}}else if(e.data&&e.data.type==="MAP_READY"&&this.selectedStoreId){const t=this.shadowRoot.getElementById("storeMapFrame");t&&t.contentWindow&&t.contentWindow.postMessage({type:"FLY_TO_STORE",id:this.selectedStoreId},"*")}}firstUpdated(){this._initStoreSelection()}updated(e){(e.has("stores")||e.has("data"))&&this._initStoreSelection()}_getStoreId(e,t=0){return!e||typeof e!="object"?`store-${t}`:String(e._id||e.id||e.ID||e.storeId||e.title||`store-${t}`)}_getEffectiveStores(){let e=[];return Array.isArray(this.stores)&&this.stores.length>0?e=this.stores:this.data&&Array.isArray(this.data.stores)&&this.data.stores.length>0?e=this.data.stores:e=je,e.map((t,i)=>{const r=this._getStoreId(t,i),s=Number(t.latitude||t.lat||t.Latitude)||0,o=Number(t.longitude||t.lng||t.Longitude)||0,a=t.title||t.name||"ZWILLING Store",c=t.address||t.diaChi||"";return{...t,id:r,_id:r,ID:r,title:a,address:c,city:t.city||t.thanhPho||"",hotline:t.hotline||t.phone||t.soDienThoai||"",openHours:t.openHours||t.gioMoCua||"09:30 - 22:00",latitude:s,longitude:o,googleMapsUrl:t.googleMapsUrl||t.mapUrl||(s&&o?`https://www.google.com/maps?q=${s},${o}`:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a+" "+c)}`),image:t.image||t.hinhAnh||t.thumbnail||""}})}_isCityMatch(e,t){if(!t||t==="all")return!0;if(!e)return!1;const i=e.trim().toLowerCase(),r=t.trim().toLowerCase();if(i.includes(r)||r.includes(i))return!0;const s=["tp.hcm","hcm","tp. hcm","hồ chí minh","ho chi minh","tp. hồ chí minh","tp hồ chí minh"],o=s.some(p=>i.includes(p)),a=s.some(p=>r.includes(p));if(o&&a)return!0;const c=["hà nội","ha noi","hn"],u=c.some(p=>i.includes(p)),f=c.some(p=>r.includes(p));return!!(u&&f)}_initStoreSelection(){const e=this._getFilteredStores();e.length>0&&(!this.selectedStoreId||!e.some(t=>t.id===this.selectedStoreId))&&(this.selectedStoreId=e[0].id)}_getFilteredStores(){const e=this._getEffectiveStores(),t=(this.searchQuery||"").trim().toLowerCase(),i=this.selectedCity;return e.filter(r=>!(!this._isCityMatch(r.city,i)||t&&![r.title,r.name,r.address,r.city,r.hotline].filter(Boolean).join(" ").toLowerCase().includes(t)))}_getCitiesList(){const e=this._getEffectiveStores(),t=new Map;return e.forEach(i=>{const r=(i.city||"").trim();if(!r)return;let s=r,o=r;const a=r.toLowerCase();a.includes("hồ chí minh")||a.includes("hcm")?(s="TP.HCM",o="TP.HCM"):(a.includes("hà nội")||a.includes("hn"))&&(s="Hà Nội",o="Hà Nội");const c=t.get(o)||{label:s,filterValue:o,count:0};c.count+=1,t.set(o,c)}),Array.from(t.values())}_isCityActive(e){return this.selectedCity==="all"?!1:this._isCityMatch(e,this.selectedCity)}_onSearchInput(e){this.searchQuery=e.target.value}_onSelectCity(e){this.selectedCity=e,this._initStoreSelection();const i=this._getFilteredStores().map(s=>s.id),r=this.shadowRoot.getElementById("storeMapFrame");r&&r.contentWindow&&r.contentWindow.postMessage({type:"FIT_BOUNDS",ids:i},"*")}_selectStore(e){const t=this._getStoreId(e);this.selectedStoreId=t,this.activeTab="map";const i=this.shadowRoot.getElementById("storeMapFrame");i&&i.contentWindow&&i.contentWindow.postMessage({type:"FLY_TO_STORE",id:t},"*")}_getMapIframeSrcDoc(e){const t=e.map(r=>`${r.id}:${r.latitude}:${r.longitude}`).join("|");if(this._lastStoresKey===t&&this._cachedSrcDoc)return this._cachedSrcDoc;this._lastStoresKey=t;const i=JSON.stringify(e.map(r=>({id:String(r.id),title:r.title||"",address:r.address||"",hotline:r.hotline||"",openHours:r.openHours||"09:30 - 22:00",latitude:Number(r.latitude)||0,longitude:Number(r.longitude)||0,googleMapsUrl:r.googleMapsUrl||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((r.title||"")+" "+(r.address||""))}`})));return this._cachedSrcDoc=`<!DOCTYPE html>
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
                              src="${z(i.image)}"
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
    `}}v(ce,"properties",{stores:{type:Array,converter:A},data:{type:Object,converter:A},selectedStoreId:{state:!0},searchQuery:{state:!0},selectedCity:{state:!0},onlyOpen:{state:!0},activeTab:{state:!0},lang:{type:String}}),v(ce,"styles",[$e,I`
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
    `]),_("wx-store-locator",ce),console.log("[my-wix-ui-lib] Đã đăng ký thành công 5 Web Components tái sử dụng (Lit 3)"),m.DEFAULT_STORES=je,m.WxBreadcrumb=oe,m.WxCategoryCarousel=Q,m.WxFeatureBlocks=W,m.WxHotspotSection=Oe,m.WxProductCard=ne,m.WxProductCarousel=ee,m.WxProductDetail=le,m.WxProductListing=ae,m.WxRelatedProducts=te,m.WxStoreLocator=ce,m.WxStorySection=De,m.dispatchCustomEvent=P,m.formatCurrencyVND=M,m.parseGallery=ve,m.safeDefine=_,m.safeJsonParse=ye,m.t=d,m.themeStyles=$e,m.translations=se,Object.defineProperty(m,Symbol.toStringTag,{value:"Module"})})(this.MyWixUiLib=this.MyWixUiLib||{});
