/* eslint-disable */
/* global globalThis, litPropertyMetadata */
var globalThis = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this;
if (!globalThis.litPropertyMetadata) {
  globalThis.litPropertyMetadata = new WeakMap();
}
var litPropertyMetadata = globalThis.litPropertyMetadata;
var tt=Object.defineProperty;var it=(b,v,_)=>v in b?tt(b,v,{enumerable:!0,configurable:!0,writable:!0,value:_}):b[v]=_;var y=(b,v,_)=>it(b,typeof v!="symbol"?v+"":v,_);(function(b){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Re;const v=globalThis,_=v.ShadowRoot&&(v.ShadyCSS===void 0||v.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,se=Symbol(),ge=new WeakMap;let fe=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(_&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=ge.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ge.set(t,e))}return e}toString(){return this.cssText}};const Le=r=>new fe(typeof r=="string"?r:r+"",void 0,se),A=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((i,s,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[o+1],r[0]);return new fe(t,r,se)},He=(r,e)=>{if(_)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),s=v.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,r.appendChild(i)}},ue=_?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Le(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Me,defineProperty:Ue,getOwnPropertyDescriptor:Oe,getOwnPropertyNames:De,getOwnPropertySymbols:je,getPrototypeOf:Fe}=Object,S=globalThis,be=S.trustedTypes,We=be?be.emptyScript:"",re=S.reactiveElementPolyfillSupport,U=(r,e)=>r,oe={toAttribute(r,e){switch(e){case Boolean:r=r?We:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},me=(r,e)=>!Me(r,e),xe={attribute:!0,type:String,converter:oe,reflect:!1,useDefault:!1,hasChanged:me};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),S.litPropertyMetadata??(S.litPropertyMetadata=new WeakMap);let B=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=xe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Ue(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=Oe(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){const l=s==null?void 0:s.call(this);o==null||o.call(this,n),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??xe}static _$Ei(){if(this.hasOwnProperty(U("elementProperties")))return;const e=Fe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(U("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(U("properties"))){const t=this.properties,i=[...De(t),...je(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(ue(s))}else e!==void 0&&t.push(ue(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return He(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var o;const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const n=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:oe).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){var o,n;const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const l=i.getPropertyOptions(s),c=typeof l.converter=="function"?{fromAttribute:l.converter}:((o=l.converter)==null?void 0:o.fromAttribute)!==void 0?l.converter:oe;this._$Em=s;const h=c.fromAttribute(t,l.type);this[s]=h??((n=this._$Ej)==null?void 0:n.get(s))??h,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){var n;if(e!==void 0){const l=this.constructor;if(s===!1&&(o=this[e]),i??(i=l.getPropertyOptions(e)),!((i.hasChanged??me)(o,t)||i.useDefault&&i.reflect&&o===((n=this._$Ej)==null?void 0:n.get(e))&&!this.hasAttribute(l._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,n]of s){const{wrapped:l}=n,c=this[o];l!==!0||this._$AL.has(o)||c===void 0||this.C(o,void 0,n,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};B.elementStyles=[],B.shadowRootOptions={mode:"open"},B[U("elementProperties")]=new Map,B[U("finalized")]=new Map,re==null||re({ReactiveElement:B}),(S.reactiveElementVersions??(S.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O=globalThis,ye=r=>r,J=O.trustedTypes,ve=J?J.createPolicy("lit-html",{createHTML:r=>r}):void 0,we="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,$e="?"+C,Ge=`<${$e}>`,P=document,D=()=>P.createComment(""),j=r=>r===null||typeof r!="object"&&typeof r!="function",ne=Array.isArray,Ye=r=>ne(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",ae=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ke=/-->/g,_e=/>/g,z=RegExp(`>|${ae}(?:([^\\s"'>=/]+)(${ae}*=${ae}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ae=/'/g,Se=/"/g,Ce=/^(?:script|style|textarea|title)$/i,Ve=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),a=Ve(1),R=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),Ie=new WeakMap,E=P.createTreeWalker(P,129);function Pe(r,e){if(!ne(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ve!==void 0?ve.createHTML(e):e}const Xe=(r,e)=>{const t=r.length-1,i=[];let s,o=e===2?"<svg>":e===3?"<math>":"",n=F;for(let l=0;l<t;l++){const c=r[l];let h,g,d=-1,m=0;for(;m<c.length&&(n.lastIndex=m,g=n.exec(c),g!==null);)m=n.lastIndex,n===F?g[1]==="!--"?n=ke:g[1]!==void 0?n=_e:g[2]!==void 0?(Ce.test(g[2])&&(s=RegExp("</"+g[2],"g")),n=z):g[3]!==void 0&&(n=z):n===z?g[0]===">"?(n=s??F,d=-1):g[1]===void 0?d=-2:(d=n.lastIndex-g[2].length,h=g[1],n=g[3]===void 0?z:g[3]==='"'?Se:Ae):n===Se||n===Ae?n=z:n===ke||n===_e?n=F:(n=z,s=void 0);const f=n===z&&r[l+1].startsWith("/>")?" ":"";o+=n===F?c+Ge:d>=0?(i.push(h),c.slice(0,d)+we+c.slice(d)+C+f):c+C+(d===-2?l:f)}return[Pe(r,o+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class W{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const l=e.length-1,c=this.parts,[h,g]=Xe(e,t);if(this.el=W.createElement(h,i),E.currentNode=this.el.content,t===2||t===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=E.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const d of s.getAttributeNames())if(d.endsWith(we)){const m=g[n++],f=s.getAttribute(d).split(C),u=/([.?@])?(.*)/.exec(m);c.push({type:1,index:o,name:u[2],strings:f,ctor:u[1]==="."?Je:u[1]==="?"?Ke:u[1]==="@"?Ze:K}),s.removeAttribute(d)}else d.startsWith(C)&&(c.push({type:6,index:o}),s.removeAttribute(d));if(Ce.test(s.tagName)){const d=s.textContent.split(C),m=d.length-1;if(m>0){s.textContent=J?J.emptyScript:"";for(let f=0;f<m;f++)s.append(d[f],D()),E.nextNode(),c.push({type:2,index:++o});s.append(d[m],D())}}}else if(s.nodeType===8)if(s.data===$e)c.push({type:2,index:o});else{let d=-1;for(;(d=s.data.indexOf(C,d+1))!==-1;)c.push({type:7,index:o}),d+=C.length-1}o++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function L(r,e,t=r,i){var n,l;if(e===R)return e;let s=i!==void 0?(n=t._$Co)==null?void 0:n[i]:t._$Cl;const o=j(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),o===void 0?s=void 0:(s=new o(r),s._$AT(r,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=s:t._$Cl=s),s!==void 0&&(e=L(r,s._$AS(r,e.values),s,i)),e}class qe{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=((e==null?void 0:e.creationScope)??P).importNode(t,!0);E.currentNode=s;let o=E.nextNode(),n=0,l=0,c=i[0];for(;c!==void 0;){if(n===c.index){let h;c.type===2?h=new G(o,o.nextSibling,this,e):c.type===1?h=new c.ctor(o,c.name,c.strings,this,e):c.type===6&&(h=new Qe(o,this,e)),this._$AV.push(h),c=i[++l]}n!==(c==null?void 0:c.index)&&(o=E.nextNode(),n++)}return E.currentNode=P,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class G{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=L(this,e,t),j(e)?e===x||e==null||e===""?(this._$AH!==x&&this._$AR(),this._$AH=x):e!==this._$AH&&e!==R&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ye(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==x&&j(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=W.createElement(Pe(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(t);else{const n=new qe(s,this),l=n.u(this.options);n.p(t),this.T(l),this._$AH=n}}_$AC(e){let t=Ie.get(e.strings);return t===void 0&&Ie.set(e.strings,t=new W(e)),t}k(e){ne(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new G(this.O(D()),this.O(D()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const s=ye(e).nextSibling;ye(e).remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class K{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=x,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=x}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(o===void 0)e=L(this,e,t,0),n=!j(e)||e!==this._$AH&&e!==R,n&&(this._$AH=e);else{const l=e;let c,h;for(e=o[0],c=0;c<o.length-1;c++)h=L(this,l[i+c],t,c),h===R&&(h=this._$AH[c]),n||(n=!j(h)||h!==this._$AH[c]),h===x?e=x:e!==x&&(e+=(h??"")+o[c+1]),this._$AH[c]=h}n&&!s&&this.j(e)}j(e){e===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Je extends K{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===x?void 0:e}}class Ke extends K{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==x)}}class Ze extends K{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=L(this,e,t,0)??x)===R)return;const i=this._$AH,s=e===x&&i!==x||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==x&&(i===x||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Qe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){L(this,e)}}const le=O.litHtmlPolyfillSupport;le==null||le(W,G),(O.litHtmlVersions??(O.litHtmlVersions=[])).push("3.3.3");const et=(r,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let s=i._$litPart$;if(s===void 0){const o=(t==null?void 0:t.renderBefore)??null;i._$litPart$=s=new G(e.insertBefore(D(),o),o,void 0,t??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N=globalThis;class $ extends B{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=et(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return R}}$._$litElement$=!0,$.finalized=!0,(Re=N.litElementHydrateSupport)==null||Re.call(N,{LitElement:$});const ce=N.litElementPolyfillSupport;ce==null||ce({LitElement:$}),(N.litElementVersions??(N.litElementVersions=[])).push("4.2.2");function w(r,e){if(!(typeof window>"u"||!window.customElements||window.customElements.get(r)))try{window.customElements.define(r,e)}catch(i){if(i.name==="NotSupportedError"&&i.message.includes("constructor")){class s extends e{}window.customElements.define(r,s)}else console.warn(`[my-wix-ui-lib] Không thể đăng ký ${r}:`,i)}}function H(r,e,t={}){const i=new CustomEvent(e,{detail:t,bubbles:!0,composed:!0,cancelable:!0});return r.dispatchEvent(i),i}function Y(r){if(r==null||r==="")return"";if(typeof r=="string"){const e=Number(r.replace(/[^\d]/g,""));!isNaN(e)&&e>0&&(r=e)}return isNaN(r)||Number(r)<=0?"":new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",maximumFractionDigits:0}).format(r)}function ze(r){if(!r||typeof r!="object")return{price:0,comparePrice:null,discountPercent:null};const e=l=>{if(l==null||l==="")return 0;if(typeof l=="number")return isNaN(l)?0:l;if(typeof l=="string"){const c=Number(l.replace(/[^\d]/g,""));return isNaN(c)?0:c}return 0},t=e(r.maxPrice)||e(r.compareAtPrice)||e(r.price),i=e(r.minPrice);let s=0,o=null,n=null;return t>0&&i>0&&t>i?(s=i,o=t,n=Math.round((t-i)/t*100)):(s=t||i||e(r.price),o=null,n=null),{price:s,comparePrice:o,discountPercent:n}}function de(r,e=null){if(!r)return e;if(typeof r=="object")return r;try{return JSON.parse(r)}catch{return e}}function T(r,e=""){if(!r||(typeof r=="object"&&r&&(r=r.src||r.url||e),typeof r!="string"))return e;const t=r.trim();if(!t)return e;if(t.startsWith("wix:image://")){const i=t.split("/");if(i.length>=4)return`https://static.wixstatic.com/media/${i[3].split("#")[0]}`}return t}function pe(r){if(!r)return[];if(typeof r=="string"){const e=r.trim();if(e.startsWith("[")||e.startsWith("{"))try{const t=JSON.parse(e);t&&(r=t)}catch{}}return Array.isArray(r)?r.map(e=>e?typeof e=="object"?e.src||e.url||"":String(e):"").filter(Boolean):typeof r!="string"?[]:r.split(";").map(e=>e.trim()).filter(Boolean)}function Ee(r){return typeof r!="string"?"":r.replace(/&quot;/g,'"').replace(/&#34;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">")}const k={fromAttribute(r){if(!r)return[];if(typeof r=="object")return Array.isArray(r)?r:[r];try{let e=typeof r=="string"?Ee(r.trim()):"";const t=JSON.parse(e);return Array.isArray(t)?t:[t]}catch(e){return console.warn("[jsonArrayConverter] Lỗi parse JSON:",e,r),[]}},toAttribute(r){return JSON.stringify(r)}},I={fromAttribute(r){if(!r)return null;if(typeof r=="object")return r;try{let e=typeof r=="string"?Ee(r.trim()):"";return JSON.parse(e)}catch(e){return console.warn("[jsonObjectConverter] Lỗi parse JSON:",e,r),null}},toAttribute(r){return JSON.stringify(r)}},he={fromAttribute(r){if(r==null)return!1;if(typeof r=="boolean")return r;const e=String(r).trim().toLowerCase();return!(e==="false"||e==="0"||e===""||e==="null"||e==="undefined")},toAttribute(r){return r?"true":null}},Z={vi:{resultsCount:r=>`${r} sản phẩm`,sortBy:"Sắp xếp theo",sortPriceAsc:"Giá: Thấp đến Cao",sortPriceDesc:"Giá: Cao đến Thấp",sortTitleAsc:"Tên: A đến Z",filterCategory:"Danh mục",filterBrand:"Thương hiệu",filterPrice:"Mức giá",clearAll:"Xóa tất cả",emptyProducts:"Không có sản phẩm nào phù hợp với bộ lọc.",showingItems:(r,e)=>`Đang hiển thị ${r} trên tổng số ${e} sản phẩm`,loadMore:"XEM THÊM SẢN PHẨM",searchFilters:"BỘ LỌC TÌM KIẾM",clear:"Xóa",categories:"DANH MỤC",allCategories:"Tất cả danh mục",noCategories:"Không có danh mục nào",brands:"THƯƠNG HIỆU",allBrands:"Tất cả thương hiệu",priceRange:"KHOẢNG GIÁ",allPrices:"Tất cả mức giá",priceUnder1m:"Dưới 1.000.000 ₫",price1mTo3m:"1.000.000 ₫ - 3.000.000 ₫",price3mTo5m:"3.000.000 ₫ - 5.000.000 ₫",priceOver5m:"Trên 5.000.000 ₫",reset:"Thiết lập lại",viewResults:r=>`Xem ${r} sản phẩm`,close:"Đóng",productFilterAria:"Bộ lọc sản phẩm",contactUs:"Liên hệ",noImage:"Chưa có ảnh",prevImage:"Ảnh trước",nextImage:"Ảnh sau",seriesLabel:r=>`Dòng sản phẩm: ${r}`,reviewsCount:r=>`(${r} Đánh giá)`,highlights:"Đặc điểm nổi bật:",descriptionTab:"MÔ TẢ SẢN PHẨM",specsTab:"THÔNG SỐ KỸ THUẬT",instructionsTab:"HƯỚNG DẪN SỬ DỤNG & BẢO QUẢN",noDescription:"Chưa có thông tin mô tả cho sản phẩm này.",noSpecs:"Chưa có thông số kỹ thuật.",defaultInstructions:["Vệ sinh bằng tay với nước ấm và xà phòng nhẹ sau khi sử dụng.","Lau khô hoàn toàn trước khi cất giữ.","Bảo quản nơi khô ráo, thoáng mát."],toolbarResults:r=>`${r} KẾT QUẢ`,allBrandsToolbar:"Tất cả Thương hiệu",allCategoriesToolbar:"Tất cả Danh mục",sortDefault:"Sắp xếp: Mặc định",clearFilters:"Xóa bộ lọc",brandSectionTitle:"THƯƠNG HIỆU",seriesSectionTitle:"DÒNG SẢN PHẨM",seriesTag:"Dòng sản phẩm",scrollLeft:"Cuộn sang trái",scrollRight:"Cuộn sang phải",home:"TRANG CHỦ",products:"SẢN PHẨM",brandsBreadcrumb:"THƯƠNG HIỆU",about:"GIỚI THIỆU",blog:"BÀI VIẾT"},en:{resultsCount:r=>`${r} Results`,sortBy:"Sort by",sortPriceAsc:"Price: Low to High",sortPriceDesc:"Price: High to Low",sortTitleAsc:"Name: A to Z",filterCategory:"Category",filterBrand:"Brand",filterPrice:"Price",clearAll:"Clear All",emptyProducts:"No products found matching your filters.",showingItems:(r,e)=>`Showing ${r} of ${e} items`,loadMore:"LOAD MORE",searchFilters:"SEARCH FILTERS",clear:"Clear",categories:"CATEGORIES",allCategories:"All Categories",noCategories:"No categories found",brands:"BRANDS",allBrands:"All Brands",priceRange:"PRICE RANGE",allPrices:"All Prices",priceUnder1m:"Under 1,000,000 ₫",price1mTo3m:"1,000,000 ₫ - 3,000,000 ₫",price3mTo5m:"3,000,000 ₫ - 5,000,000 ₫",priceOver5m:"Over 5,000,000 ₫",reset:"Reset",viewResults:r=>`View ${r} products`,close:"Close",productFilterAria:"Product filters",contactUs:"Contact Us",noImage:"No image available",prevImage:"Previous image",nextImage:"Next image",seriesLabel:r=>`Series: ${r}`,reviewsCount:r=>`(${r} Reviews)`,highlights:"Highlights:",descriptionTab:"PRODUCT DESCRIPTION",specsTab:"SPECIFICATIONS",instructionsTab:"INSTRUCTIONS & CARE",noDescription:"No description available for this product.",noSpecs:"No specifications available.",defaultInstructions:["Hand wash with warm water and mild soap after use.","Dry completely before storage.","Store in a cool, dry place."],toolbarResults:r=>`${r} RESULTS`,allBrandsToolbar:"All Brands",allCategoriesToolbar:"All Categories",sortDefault:"Sort: Default",clearFilters:"Clear Filters",brandSectionTitle:"BRANDS",seriesSectionTitle:"SERIES",seriesTag:"Series",scrollLeft:"Scroll left",scrollRight:"Scroll right",home:"HOME",products:"PRODUCTS",brandsBreadcrumb:"BRANDS",about:"ABOUT US",blog:"BLOG"}};function p(r,e="vi",...t){let i="vi";e&&typeof e=="string"?i=e.toLowerCase().startsWith("en")?"en":"vi":typeof document<"u"&&document.documentElement&&document.documentElement.lang&&(i=document.documentElement.lang.toLowerCase().startsWith("en")?"en":"vi");const s=Z[i]||Z.vi,o=s[r]!==void 0?s[r]:Z.vi[r];return typeof o=="function"?o(...t):o!==void 0?o:r}class Q extends ${constructor(){super(),this.items=null,this.lang="vi",this.loading=!1}_formatLabel(e){if(!e||typeof e!="string")return"";const t=e.trim().toUpperCase();return t==="HOME"||t==="TRANG CHỦ"?p("home",this.lang):t==="PRODUCTS"||t==="SẢN PHẨM"?p("products",this.lang):t==="BRANDS"||t==="THƯƠNG HIỆU"?p("brandsBreadcrumb",this.lang):t==="ABOUT"||t==="ABOUT US"||t==="GIỚI THIỆU"||t==="VỀ CHÚNG TÔI"?p("about",this.lang):t==="BLOG"||t==="BÀI VIẾT"||t==="TIN TỨC"?p("blog",this.lang):e}_handleClick(e,t,i){i!==this.items.length-1&&(e.preventDefault(),H(this,"breadcrumb-click",{item:t,index:i}))}render(){return this.loading===!0||this.loading==="true"||!this.items&&this.items===null?a`
        <nav aria-label="Breadcrumb" style="display: flex; align-items: center; gap: 8px;">
          <div class="skeleton-box" style="width: 70px; height: 14px;"></div>
          <span class="separator" aria-hidden="true">&#x203A;</span>
          <div class="skeleton-box" style="width: 100px; height: 14px;"></div>
        </nav>
      `:!this.items||!this.items.length?a``:a`
      <nav aria-label="Breadcrumb">
        ${this.items.map((i,s)=>{const o=s===0,n=s===this.items.length-1,l=typeof i=="string"?i:i.label||i.title,c=this._formatLabel(l);return a`
            ${s>0?a`<span class="separator" aria-hidden="true">&#x203A;</span>`:""}
            <button
              class="crumb-btn ${o?"first":""} ${n?"active":""}"
              ?disabled="${n}"
              @click="${h=>this._handleClick(h,i,s)}"
              aria-current="${n?"page":"false"}"
            >
              ${c}
            </button>
          `})}
      </nav>
    `}}y(Q,"properties",{items:{type:Array,converter:k},lang:{type:String},loading:{type:Boolean,converter:he}}),y(Q,"styles",A`
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
  `),w("wx-breadcrumb",Q);class V extends ${constructor(){super(),this.items=null,this.categories=null,this.data=null,this.selectedId="",this.lang="vi",this.loading=!1,this._progressLeft=0,this._progressWidth=30}firstUpdated(){this._track=this.shadowRoot.querySelector(".track"),this._checkScroll()}updated(e){(e.has("items")||e.has("categories")||e.has("data"))&&this._checkScroll()}_checkScroll(){const e=this.categories||this.data||this.items||[];this._track&&e.length>=6&&(this._track.addEventListener("scroll",()=>this._updateProgress()),this._updateProgress())}_updateProgress(){if(!this._track)return;const{scrollLeft:e,scrollWidth:t,clientWidth:i}=this._track,s=t-i;if(s<=0)this._progressWidth=100,this._progressLeft=0;else{this._progressWidth=Math.max(15,i/t*100);const n=100-this._progressWidth;this._progressLeft=e/s*n}const o=this.shadowRoot.querySelector(".progress-thumb");o&&(o.style.width=`${this._progressWidth}%`,o.style.left=`${this._progressLeft}%`)}_scroll(e){if(!this._track)return;const t=300*e;this._track.scrollBy({left:t,behavior:"smooth"})}_selectItem(e){this.selectedId=e._id||e.ID||e.id||e.slug,H(this,"category-select",{category:e})}render(){const e=this.categories||this.data||this.items,t=e!=null,i=Array.isArray(e)?e:[];if(t&&i.length===0&&!this.loading)return this.removeAttribute("has-items"),a``;if(!i.length)return a`
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
      `;this.setAttribute("has-items","");const s=i.length>=6;return a`
      <div class="carousel-wrapper">
        <div class="track ${s?"":"static-grid"}" role="list">
          ${i.map(o=>{const n=o._id||o.ID||o.id||o.slug,l=this.selectedId===n,c=o.title||o.name||"",h=o.description||o.subtitle||o.desc||"",g=o.image||o.mainImage||o.bannerImage,d=g?T(g):"";return a`
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
                          @error="${m=>{m.target.style.display="none";const f=m.target.parentElement.querySelector(".placeholder-box");f&&(f.style.display="flex")}}"
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

        ${s?a`
              <div class="controls-row">
                <button class="nav-arrow-btn" @click="${()=>this._scroll(-1)}" aria-label="${p("scrollLeft",this.lang)}">&#x2039;</button>
                <div class="progress-track">
                  <div class="progress-thumb"></div>
                </div>
                <button class="nav-arrow-btn" @click="${()=>this._scroll(1)}" aria-label="${p("scrollRight",this.lang)}">&#x203A;</button>
              </div>
            `:""}
      </div>
    `}}y(V,"properties",{items:{type:Array,converter:k},categories:{type:Array,converter:k},data:{type:Array,converter:k},selectedId:{type:String},lang:{type:String},loading:{type:Boolean}}),y(V,"styles",A`
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
  `),w("wx-category-carousel",V),w("wx-product-categories",class extends V{});class ee extends ${constructor(){super(),this.product=null,this.activeImageIndex=0,this.lang="vi"}_getImages(){if(!this.product)return[];const e=this.product,t=[];if(e.mainImage){const s=T(e.mainImage);s&&t.push(s)}const i=e.gallery||e.media||e.images||e.mediaGallery;return i&&pe(i).forEach(o=>{const n=T(o);n&&!t.includes(n)&&t.push(n)}),t}_prevImage(e,t){e.stopPropagation(),t.length&&(this.activeImageIndex=(this.activeImageIndex-1+t.length)%t.length)}_nextImage(e,t){e.stopPropagation(),t.length&&(this.activeImageIndex=(this.activeImageIndex+1)%t.length)}_onClick(){H(this,"product-click",{product:this.product})}render(){if(!this.product)return a``;const e=this.product,t=this._getImages(),i=t[this.activeImageIndex]||e.mainImage||(t.length?t[0]:""),{price:s,comparePrice:o,discountPercent:n}=ze(e),l=e.brand?e.brand.replace("brand-","").toUpperCase():"";let c=[];if(Array.isArray(e.labels))c=e.labels;else if(typeof e.labels=="string"){const u=de(e.labels);if(Array.isArray(u))c=u;else if(e.labels.trim()&&e.labels!=="[]"){const q=e.labels.replace(/[\[\]"']/g,"").trim();q&&(c=[q])}}else e.label?c=[e.label]:e.ribbon&&(c=[e.ribbon]);if(e.isBestseller||e.bestseller){const u=this.lang==="vi"?"Bán chạy":"Bestseller";!c.includes(u)&&!c.includes("Bestseller")&&!c.includes("Bán chạy")&&c.unshift(u)}const h={"bán chạy":"Bestseller",mới:"New","mới mở bán":"New to sale","giảm giá":"On sale"},g={bestseller:"Bán chạy","best seller":"Bán chạy",new:"Mới","new to sale":"Mới mở bán","on sale":"Giảm giá"};c=c.filter(Boolean).map(u=>{const q=String(u).trim().toLowerCase();return this.lang==="en"?h[q]||u:g[q]||u});const d=t.length,m=d>1?100/d:100,f=d>1?this.activeImageIndex/d*100:0;return a`
      <div class="card" @click="${this._onClick}">
        <!-- Top Bar: % Giảm giá + Labels (Đã bỏ icon heart) -->
        <div class="top-bar">
          <div class="badges-group">
            ${n?a`<span class="badge-pill badge-discount">-${n}%</span>`:""}
            ${c.map(u=>a`<span class="badge-pill badge-label">${u}</span>`)}
          </div>
        </div>

        <!-- Image Viewport với Nút Next/Back Gallery khi Hover -->
        <div class="image-viewport">
          ${d>1?a`
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

          ${i?a`<img src="${i}" alt="${e.title}" loading="lazy" />`:a`
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
                  style="width: ${m}%; left: ${f}%;"
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
              ${o&&o>s?a`<span class="compare-price">${Y(o)}</span>`:""}
              <span class="current-price">${s?Y(s):p("contactUs",this.lang)}</span>
            </div>
          </div>
        </div>
      </div>
    `}}y(ee,"properties",{product:{type:Object,converter:I},data:{type:Object,converter:I},activeImageIndex:{type:Number},lang:{type:String}}),y(ee,"styles",A`
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
  `),w("wx-product-card",ee);class X extends ${constructor(){super(),this.title="",this.products=null,this.items=null,this.data=null,this.lang="vi",this.loading=!1,this._progressLeft=0,this._progressWidth=25}firstUpdated(){this._track=this.shadowRoot.querySelector(".track"),this._initScroll()}updated(e){(e.has("products")||e.has("items")||e.has("data"))&&this._initScroll()}_initScroll(){this._track&&(this._track.addEventListener("scroll",()=>this._updateProgress()),this._updateProgress())}_updateProgress(){if(!this._track)return;const{scrollLeft:e,scrollWidth:t,clientWidth:i}=this._track,s=t-i;if(s<=0)this._progressWidth=100,this._progressLeft=0;else{this._progressWidth=Math.max(15,i/t*100);const n=100-this._progressWidth;this._progressLeft=e/s*n}const o=this.shadowRoot.querySelector(".progress-thumb");o&&(o.style.width=`${this._progressWidth}%`,o.style.left=`${this._progressLeft}%`)}_scroll(e){if(!this._track)return;const t=320*e;this._track.scrollBy({left:t,behavior:"smooth"})}_onProductClick(e){H(this,"product-select",{product:e.detail.product})}render(){const e=this.data||this.items||this.products,t=e!=null,i=Array.isArray(e)?e:[];return t&&i.length===0&&!this.loading?a``:i.length?a`
      <div class="carousel-wrapper">
        ${this.title?a`<div class="carousel-title">${this.title}</div>`:""}
        <div class="track" role="list">
          ${i.map(s=>a`
              <div class="card-item" role="listitem">
                <wx-product-card
                  .product="${s}"
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
      `}}y(X,"properties",{title:{type:String},products:{type:Array,converter:k},items:{type:Array,converter:k},data:{type:Array,converter:k},lang:{type:String},loading:{type:Boolean}}),y(X,"styles",A`
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
  `),w("wx-product-carousel",X),w("wx-product",class extends X{});class te extends ${constructor(){super(),this.products=null,this.data=null,this.brands=[],this.categories=[],this.selectedCategory="",this.selectedBrand="",this.selectedPriceRange="",this.selectedSort="default",this.sidebarOpen=!1,this.activeSidebarTab="all",this.visibleCount=32,this.pageSize=32,this.lang="vi",this.loading=!1}_categoryMatchesProduct(e,t){if(!e||!t)return!1;const i=e.ID||e._id,s=e.slug,o=e.path;return!!(i&&(t.category===i||t.brandCategory===i)||s&&(t.category===s||t.primaryCategorySlug===s)||t.category&&i&&t.category.includes(i)||t.categoryPath&&(s&&(t.categoryPath.includes(`/${s}/`)||t.categoryPath.endsWith(`/${s}`)||t.categoryPath.includes(s))||i&&t.categoryPath.includes(i)||o&&t.categoryPath.startsWith(o))||t.brandCategoryPath&&s&&t.brandCategoryPath.includes(s))}_getAvailableCategories(){const e=this.data||this.products,t=Array.isArray(e)?e:[],i=Array.isArray(this.categories)?this.categories:[];return i.length?t.length?i.filter(s=>t.some(o=>this._categoryMatchesProduct(s,o))):[]:[]}_getFilteredProducts(){const e=this.data||this.products;let i=Array.isArray(e)?[...e]:[];if(this.selectedCategory){const o=(Array.isArray(this.categories)?this.categories:[]).find(n=>n.ID===this.selectedCategory||n._id===this.selectedCategory||n.slug===this.selectedCategory);o?i=i.filter(n=>this._categoryMatchesProduct(o,n)):i=i.filter(n=>{const l=this.selectedCategory;return n.category===l||n.categorySlug===l||n.brandCategory===l||n.category&&n.category.includes(l)||n.categoryPath&&n.categoryPath.includes(l)})}return this.selectedBrand&&(i=i.filter(s=>{const o=this.selectedBrand.toLowerCase(),n=(s.brand||"").toLowerCase();return n===o||n.includes(o)||s.brandPath&&s.brandPath.toLowerCase().includes(o)})),this.selectedPriceRange&&(i=i.filter(s=>{const o=Number(s.minPrice||s.price||0);switch(this.selectedPriceRange){case"under-1m":return o<1e6;case"1m-3m":return o>=1e6&&o<=3e6;case"3m-5m":return o>=3e6&&o<=5e6;case"over-5m":return o>5e6;default:return!0}})),this.selectedSort==="price-asc"?i.sort((s,o)=>Number(s.minPrice||s.price||0)-Number(o.minPrice||o.price||0)):this.selectedSort==="price-desc"?i.sort((s,o)=>Number(o.minPrice||o.price||0)-Number(s.minPrice||s.price||0)):this.selectedSort==="title-asc"&&i.sort((s,o)=>(s.title||"").localeCompare(o.title||"")),i}_openSidebar(e="all"){this.activeSidebarTab=e,this.sidebarOpen=!0}_closeSidebar(){this.sidebarOpen=!1}_clearAllFilters(){this.selectedCategory="",this.selectedBrand="",this.selectedPriceRange="",this.selectedSort="default",this.visibleCount=this.pageSize}_loadMore(){this.visibleCount+=this.pageSize}updated(e){(e.has("selectedCategory")||e.has("selectedBrand")||e.has("selectedPriceRange")||e.has("selectedSort")||e.has("products")||e.has("data"))&&(this.visibleCount=this.pageSize||32)}_onProductCardClick(e){H(this,"product-select",{product:e.detail.product})}render(){const e=this.data||this.products,t=Array.isArray(e)?e.length>0:e!=null;if(this.loading===!0||this.loading==="true"||this.products===null&&!t)return a`
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
                ${this.selectedCategory?a`<a style="font-size: 11px; color: #d40026; cursor: pointer;" @click="${()=>this.selectedCategory=""}">${p("clear",this.lang)}</a>`:""}
              </div>
              <div class="filter-options-list">
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="cat_filter"
                    value=""
                    ?checked="${!this.selectedCategory}"
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
                              ?checked="${this.selectedCategory===(d.ID||d.slug||d._id)}"
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
                ${this.selectedBrand?a`<a style="font-size: 11px; color: #d40026; cursor: pointer;" @click="${()=>this.selectedBrand=""}">${p("clear",this.lang)}</a>`:""}
              </div>
              <div class="filter-options-list">
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="brand_filter"
                    value=""
                    ?checked="${!this.selectedBrand}"
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
                            ?checked="${this.selectedBrand===(d.ID||d.slug||d._id)}"
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
                ${this.selectedPriceRange?a`<a style="font-size: 11px; color: #d40026; cursor: pointer;" @click="${()=>this.selectedPriceRange=""}">${p("clear",this.lang)}</a>`:""}
              </div>
              <div class="filter-options-list">
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value=""
                    ?checked="${!this.selectedPriceRange}"
                    @change="${()=>this.selectedPriceRange=""}"
                  />
                  <span>${p("allPrices",this.lang)}</span>
                </label>
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value="under-1m"
                    ?checked="${this.selectedPriceRange==="under-1m"}"
                    @change="${()=>this.selectedPriceRange="under-1m"}"
                  />
                  <span>${p("priceUnder1m",this.lang)}</span>
                </label>
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value="1m-3m"
                    ?checked="${this.selectedPriceRange==="1m-3m"}"
                    @change="${()=>this.selectedPriceRange="1m-3m"}"
                  />
                  <span>${p("price1mTo3m",this.lang)}</span>
                </label>
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value="3m-5m"
                    ?checked="${this.selectedPriceRange==="3m-5m"}"
                    @change="${()=>this.selectedPriceRange="3m-5m"}"
                  />
                  <span>${p("price3mTo5m",this.lang)}</span>
                </label>
                <label class="filter-option-label">
                  <input
                    type="radio"
                    name="price_filter"
                    value="over-5m"
                    ?checked="${this.selectedPriceRange==="over-5m"}"
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
    `}}y(te,"properties",{products:{type:Array,converter:k},data:{type:Array,converter:k},brands:{type:Array,converter:k},categories:{type:Array,converter:k},selectedCategory:{type:String},selectedBrand:{type:String},selectedPriceRange:{type:String},selectedSort:{type:String},sidebarOpen:{type:Boolean},activeSidebarTab:{type:String},visibleCount:{type:Number},pageSize:{type:Number},lang:{type:String},loading:{type:Boolean,converter:he}}),y(te,"styles",A`
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
  `),w("wx-product-listing",te);class ie extends ${constructor(){super(),this.product=null,this.data=null,this.selectedImageIndex=0,this.lang="vi",this.loading=!1,this.openSections={description:!0,specifications:!1,instructions:!1},this.isZoomed=!1,this.zoomX=50,this.zoomY=50}_onMouseMove(e){const t=e.currentTarget.getBoundingClientRect();if(!t.width||!t.height)return;const i=(e.clientX-t.left)/t.width*100,s=(e.clientY-t.top)/t.height*100;this.zoomX=Math.max(0,Math.min(100,i)),this.zoomY=Math.max(0,Math.min(100,s)),this.isZoomed=!0}_onMouseLeave(){this.isZoomed=!1,this.zoomX=50,this.zoomY=50}_getImages(){const e=[],t=this.data||this.product;if(!t)return e;if(t.mainImage){const s=T(t.mainImage);s&&e.push(s)}const i=t.gallery||t.media||t.images||t.mediaGallery;return i&&pe(i).forEach(o=>{const n=T(o);n&&!e.includes(n)&&e.push(n)}),e}_prevImage(e){e.length&&(this.selectedImageIndex=(this.selectedImageIndex-1+e.length)%e.length)}_nextImage(e){e.length&&(this.selectedImageIndex=(this.selectedImageIndex+1)%e.length)}_toggleSection(e){this.openSections={...this.openSections,[e]:!this.openSections[e]}}_renderHighlights(e){if(!e||typeof e!="string")return a``;const t=e.split(`
`).map(o=>o.trim()).filter(Boolean),i=[],s=[];for(const o of t)o.startsWith("- ")||o.startsWith("• ")||o.startsWith("· ")?s.push(o.replace(/^[-•·]\s*/,"")):s.length===0?i.push(o):s.push(o);return a`
      ${i.length?a`<div class="highlights-heading">${i.join(" ")}</div>`:""}
      ${s.length?a`<ul class="highlights-list">
            ${s.map(o=>a`<li>${o}</li>`)}
          </ul>`:""}
    `}_renderDescription(e){if(!e||typeof e!="string")return a``;const t=e.split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean),i=[];for(const s of t){const o=s.split(`
`).map(l=>l.trim()).filter(Boolean);if(o.every(l=>l.startsWith("- ")||l.startsWith("• ")||l.startsWith("· "))){const l=o.map(c=>c.replace(/^[-•·]\s*/,""));i.push(a`<ul class="desc-bullets">
          ${l.map(c=>a`<li>${c}</li>`)}
        </ul>`)}else{const l=[],c=[];for(const h of o)h.startsWith("- ")||h.startsWith("• ")||h.startsWith("· ")?c.push(h.replace(/^[-•·]\s*/,"")):l.push(h);l.length&&i.push(a`<p class="desc-paragraph">${l.join(" ")}</p>`),c.length&&i.push(a`<ul class="desc-bullets">
            ${c.map(h=>a`<li>${h}</li>`)}
          </ul>`)}}return a`<div class="desc-formatted">${i}</div>`}render(){const e=this.data||this.product;if(this.loading===!0||this.loading==="true"||!e&&this.product===null)return a`
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
      `;if(!e)return a``;const s=e,o=this._getImages(),n=o[this.selectedImageIndex]||o[0],l=s.brand?s.brand.replace("brand-","").toUpperCase():"",c=s.series?s.series.replace("series-","").replace(/--.+/,"").toUpperCase():"",{price:h,comparePrice:g,discountPercent:d}=ze(s),m=de(s.specs,[]);return a`
      <div class="pdp-grid">
        <!-- Cột Gallery bên trái -->
        <div class="gallery-col">
          <div
            class="main-viewport-box ${this.isZoomed?"zoomed":""}"
            @mousemove="${this._onMouseMove}"
            @mouseleave="${this._onMouseLeave}"
          >
            ${s.labels&&s.labels.length?a`<span class="badge-top-left">${Array.isArray(s.labels)?s.labels[0]:s.labels}</span>`:""}
            
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
                    alt="${s.title}"
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
                  ${o.map((f,u)=>a`
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
          ${l?a`<div class="brand-row">${l}</div>`:""}

          <h1 class="product-title">${s.title}</h1>

          ${c?a`<div class="series-name">${p("seriesLabel",this.lang,c)}</div>`:""}

          <!-- Price Row -->
          <div class="price-row">
            ${g&&g>h?a`<span class="compare-price">${Y(g)}</span>`:""}
            <span class="sale-price">${h?Y(h):p("contactUs",this.lang)}</span>
            ${d?a`<span class="discount-box">-${d}%</span>`:""}
          </div>

          <!-- Ratings nếu có -->
          ${s.rating?a`
                <div class="rating-row">
                  <span class="stars">★★★★★</span>
                  <span>${s.rating}</span>
                  ${s.reviewCount?a`<span class="rating-link">${p("reviewsCount",this.lang,s.reviewCount)}</span>`:""}
                </div>
              `:""}

          <!-- Highlights Bullet list nếu có shortDescription -->
          ${s.shortDescription?a`
                <div class="highlights-box">
                  <div class="highlights-title">${p("highlights",this.lang)}</div>
                  ${this._renderHighlights(s.shortDescription)}
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
                      ${this._renderDescription(s.description||s.shortDescription||p("noDescription",this.lang))}
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
                      ${m&&m.length>0?a`
                            <table class="specs-table">
                              <tbody>
                                ${m.map(f=>a`
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
                      ${s.instructions||s.manual||a`
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
    `}}y(ie,"properties",{product:{type:Object,converter:I},data:{type:Object,converter:I},selectedImageIndex:{type:Number},openSections:{type:Object},lang:{type:String},loading:{type:Boolean,converter:he},isZoomed:{state:!0},zoomX:{state:!0},zoomY:{state:!0}}),y(ie,"styles",A`
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
      background: transparent;
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
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 10px;
      color: #111111;
    }

    .highlights-list {
      list-style-type: none;
      padding-left: 0;
      font-family: var(--wx-font-family);
      font-size: 13px;
      color: #444444;
      line-height: 1.7;
      margin: 0;
    }

    .highlights-list li {
      margin-bottom: 4px;
      padding-left: 16px;
      position: relative;
    }

    .highlights-list li::before {
      content: '–';
      position: absolute;
      left: 0;
      color: #444444;
    }

    .highlights-heading {
      font-family: var(--wx-font-family);
      font-size: 14px;
      font-weight: 400;
      color: #222222;
      line-height: 1.5;
      margin-bottom: 10px;
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
      padding: 16px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #111111;
      text-align: left;
    }

    .accordion-icon {
      font-size: 14px;
      transition: transform 0.2s ease;
    }

    .accordion-body {
      padding: 0 0 20px 0;
      font-family: var(--wx-font-family);
      font-size: 13px;
      line-height: 1.6;
      color: #444444;
    }

    .desc-formatted {
      font-family: var(--wx-font-family);
    }

    .desc-paragraph {
      margin: 0 0 14px 0;
      font-size: 13px;
      line-height: 1.7;
      color: #444444;
    }

    .desc-paragraph:last-child {
      margin-bottom: 0;
    }

    .desc-bullets {
      list-style-type: none;
      padding-left: 0;
      margin: 0 0 14px 0;
      font-size: 13px;
      line-height: 1.7;
      color: #444444;
    }

    .desc-bullets:last-child {
      margin-bottom: 0;
    }

    .desc-bullets li {
      margin-bottom: 4px;
      padding-left: 16px;
      position: relative;
    }

    .desc-bullets li::before {
      content: '–';
      position: absolute;
      left: 0;
      color: #444444;
    }

    .specs-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
    }

    .specs-table td {
      padding: 8px 12px;
      border-bottom: 1px solid #f0f0f0;
    }

    .specs-table td:first-child {
      font-weight: 600;
      width: 40%;
      color: #666666;
    }
  `),w("wx-product-detail",ie);const Ne=A`
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
`;class M extends ${constructor(){super(),this.blocks=[],this.items=[],this.data=null,this.type="all",this.lang="vi",this.activeHotspotIndex=0,this.failedImages=new Set}_getEffectiveBlocks(){return this.block&&typeof this.block=="object"?[this.block]:this.data&&Array.isArray(this.data.blocks)?this.data.blocks:this.data&&this.data.block&&typeof this.data.block=="object"?[this.data.block]:Array.isArray(this.blocks)?this.blocks:[]}_getEffectiveItems(){return this.data&&Array.isArray(this.data.items)?this.data.items:Array.isArray(this.items)?this.items:[]}_getItemsForBlock(e){const t=typeof e=="object"&&e?e._id||"":e,i=typeof e=="object"&&e?e.ID||"":e;return this._getEffectiveItems().filter(o=>{const n=o.block;if(!n)return!0;if(typeof n=="object"&&n!==null){const l=n._id||"",c=n.ID||"";return t&&(l===t||c===t)||i&&(l===i||c===i)}return t&&n===t||i&&n===i}).sort((o,n)=>(Number(o.position)||0)-(Number(n.position)||0))}_onImageError(e){if(e){const t=new Set(this.failedImages);t.add(e),this.failedImages=t}}_isImageAvailable(e){return!e||typeof e!="string"||!e.trim()?!1:!this.failedImages.has(e)}_renderPlaceholder(e="220px",t=null){const i=t||p("noImage",this.lang)||"Chưa có ảnh";return a`
      <div class="no-image-placeholder" style="min-height: ${e};">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <span>${i}</span>
      </div>
    `}_renderMedia(e,t="",i="220px"){const s=T(e);return this._isImageAvailable(s)?a`
        <img
          src="${s}"
          alt="${t}"
          loading="lazy"
          @error="${()=>this._onImageError(s)}"
        />
      `:this._renderPlaceholder(i)}_renderStoryBlock(e,t){let i=e.heading||e.title,s=e.body||"",o=t,n=e.image||"";if(t&&t.length>0){const l=t[0];i=l.title||i,s=l.body||s,n=l.image||n,o=t.slice(1)}return a`
      <div class="story-section">
        <!-- Banner 50/50 -->
        <div class="story-banner">
          <div class="story-media">
            ${this._renderMedia(n,i,"320px")}
          </div>

          <div class="story-content">
            <h2 class="story-heading">${i}</h2>
            ${s?a`<div class="story-body">${s}</div>`:""}
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
    `}_toggleAccordion(e){this.activeHotspotIndex===e?this.activeHotspotIndex=-1:this.activeHotspotIndex=e}_selectHotspot(e){this.activeHotspotIndex=e}_renderHighlightsBlock(e,t){const i=t.length>0?t:[],s=e.image||(e.ID?`/images/${e.ID}.png`:e._id?`/images/${e._id}.png`:""),o=T(s),n=this._isImageAvailable(o);return a`
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
                  ${i.map((l,c)=>{const h=l.coordX!==void 0&&l.coordX!==null&&l.coordX!==""?l.coordX:l.x??l.hotspotX,g=l.coordY!==void 0&&l.coordY!==null&&l.coordY!==""?l.coordY:l.y??l.hotspotY;if(h==null||h==="")return"";const d=parseFloat(h),m=parseFloat(g);if(isNaN(d)||isNaN(m))return"";const f=this.activeHotspotIndex===c;return a`
                      <button
                        type="button"
                        class="hotspot-pin ${f?"active":""}"
                        style="left: ${d}%; top: ${m}%;"
                        @click="${u=>{u.stopPropagation(),this._selectHotspot(c)}}"
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
          ${i.map((l,c)=>{const h=this.activeHotspotIndex===c;return a`
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
    `}render(){const e=this._getEffectiveBlocks();if(!e||e.length===0)return a``;const t=e.filter(i=>{const s=i.component||"story";return s==="intro"?!1:!this.type||this.type==="all"?s==="story"||s==="highlights":s===this.type});return a`
      <div class="feature-blocks-container">
        ${t.map(i=>{const s=this._getItemsForBlock(i),o=i.component||"story";return o==="highlights"?this._renderHighlightsBlock(i,s):o==="story"?this._renderStoryBlock(i,s):""})}
      </div>
    `}}y(M,"properties",{blocks:{type:Array,converter:I},block:{type:Object,converter:I},items:{type:Array,converter:I},data:{type:Object,converter:I},type:{type:String},lang:{type:String},activeHotspotIndex:{state:!0},failedImages:{state:!0}}),y(M,"styles",[Ne,A`
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
    `]),w("wx-feature-blocks",M);class Te extends M{constructor(){super(),this.type="story"}}w("wx-story-section",Te);class Be extends M{constructor(){super(),this.type="highlights"}}w("wx-hotspot-section",Be),console.log("[my-wix-ui-lib] Đã đăng ký thành công 5 Web Components tái sử dụng (Lit 3)"),b.WxBreadcrumb=Q,b.WxCategoryCarousel=V,b.WxFeatureBlocks=M,b.WxHotspotSection=Be,b.WxProductCard=ee,b.WxProductCarousel=X,b.WxProductDetail=ie,b.WxProductListing=te,b.WxStorySection=Te,b.dispatchCustomEvent=H,b.formatCurrencyVND=Y,b.parseGallery=pe,b.safeDefine=w,b.safeJsonParse=de,b.t=p,b.themeStyles=Ne,b.translations=Z,Object.defineProperty(b,Symbol.toStringTag,{value:"Module"})})(this.MyWixUiLib=this.MyWixUiLib||{});
