var t,e,o,i,n=globalThis,a=n.ShadowRoot&&(void 0===n.ShadyCSS||n.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),l=/* @__PURE__ */new WeakMap,r=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(a&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=l.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&l.set(e,t))}return t}toString(){return this.cssText}},d=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]);return new r(o,t,s)},c=a?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:u,defineProperty:h,getOwnPropertyDescriptor:p,getOwnPropertyNames:b,getOwnPropertySymbols:v,getPrototypeOf:_}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",$=g.reactiveElementPolyfillSupport,x=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},w=(t,e)=>!u(t,e),C={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:w};null!==(e=(t=Symbol).metadata)&&void 0!==e||(t.metadata=Symbol("metadata")),null!==(o=g.litPropertyMetadata)&&void 0!==o||(g.litPropertyMetadata=/* @__PURE__ */new WeakMap);var k,S=class extends HTMLElement{static addInitializer(t){var e;this._$Ei(),(null!==(e=this.l)&&void 0!==e?e:this.l=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=C){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){var i;const{get:n,set:a}=null!==(i=p(this.prototype,t))&&void 0!==i?i:{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const i=null==n?void 0:n.call(this);null==a||a.call(this,e),this.requestUpdate(t,i,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){var e;return null!==(e=this.elementProperties.get(t))&&void 0!==e?e:C}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=_(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,e=[...b(t),...v(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=/* @__PURE__ */new Map;for(const[e,o]of this.elementProperties){const t=this._$Eu(e,o);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=/* @__PURE__ */new Map,this._$E_(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,o;(null!==(e=this._$EO)&&void 0!==e?e:this._$EO=/* @__PURE__ */new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&(null===(o=t.hostConnected)||void 0===o||o.call(t))}removeController(t){var e;null===(e=this._$EO)||void 0===e||e.delete(t)}_$E_(){const t=/* @__PURE__ */new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(a)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of e){const e=document.createElement("style"),i=n.litNonce;void 0!==i&&e.setAttribute("nonce",i),e.textContent=o.cssText,t.appendChild(e)}})(e,this.constructor.elementStyles),e}connectedCallback(){var t,e;null!==(t=this.renderRoot)&&void 0!==t||(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$EO)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$EO)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){var n;const a=(void 0!==(null===(n=o.converter)||void 0===n?void 0:n.toAttribute)?o.converter:y).toAttribute(e,o.type);this._$Em=t,null==a?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){var n,a,s;const t=o.getPropertyOptions(i),l="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(n=t.converter)||void 0===n?void 0:n.fromAttribute)?t.converter:y;this._$Em=i;const r=l.fromAttribute(e,t.type);this[i]=null!==(a=null!=r?r:null===(s=this._$Ej)||void 0===s?void 0:s.get(i))&&void 0!==a?a:r,this._$Em=null}}requestUpdate(t,e,o,i=!1,n){if(void 0!==t){var a,s,l;const r=this.constructor;if(!1===i&&(n=this[t]),null!==(a=o)&&void 0!==a||(o=r.getPropertyOptions(t)),!((null!==(s=o.hasChanged)&&void 0!==s?s:w)(n,e)||o.useDefault&&o.reflect&&n===(null===(l=this._$Ej)||void 0===l?void 0:l.get(t))&&!this.hasAttribute(r._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:n},a){var s,l,r;o&&!(null!==(s=this._$Ej)&&void 0!==s?s:this._$Ej=/* @__PURE__ */new Map).has(t)&&(this._$Ej.set(t,null!==(l=null!=a?a:e)&&void 0!==l?l:this[t]),!0!==n||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(null!==(r=this._$Eq)&&void 0!==r?r:this._$Eq=/* @__PURE__ */new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){var t;if(null!==(t=this.renderRoot)&&void 0!==t||(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,o]of e){const{wrapped:e}=o,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,o,i)}}let e=!1;const o=this._$AL;try{var i;e=this.shouldUpdate(o),e?(this.willUpdate(o),null===(i=this._$EO)||void 0===i||i.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(o)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(o)}willUpdate(t){}_$AE(t){var e;null===(e=this._$EO)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=/* @__PURE__ */new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(t){}firstUpdated(t){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[x("elementProperties")]=/* @__PURE__ */new Map,S[x("finalized")]=/* @__PURE__ */new Map,null==$||$({ReactiveElement:S}),(null!==(i=g.reactiveElementVersions)&&void 0!==i?i:g.reactiveElementVersions=[]).push("2.1.2");var A=globalThis,B=t=>t,T=A.trustedTypes,E=T?T.createPolicy("lit-html",{createHTML:t=>t}):void 0,z="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,G="?"+R,O=`<${G}>`,I=document,P=()=>I.createComment(""),j=t=>null===t||"object"!=typeof t&&"function"!=typeof t,F=Array.isArray,M="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,H=/>/g,U=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,V=/"/g,W=/^(?:script|style|textarea|title)$/i,q=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),Y=q(1),X=(q(2),q(3),Symbol.for("lit-noChange")),J=Symbol.for("lit-nothing"),K=/* @__PURE__ */new WeakMap,Z=I.createTreeWalker(I,129);function Q(t,e){if(!F(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}var tt=(t,e)=>{const o=t.length-1,i=[];let n,a=2===e?"<svg>":3===e?"<math>":"",s=D;for(let r=0;r<o;r++){var l;const e=t[r];let o,d,c=-1,u=0;for(;u<e.length&&(s.lastIndex=u,d=s.exec(e),null!==d);)u=s.lastIndex,s===D?"!--"===d[1]?s=L:void 0!==d[1]?s=H:void 0!==d[2]?(W.test(d[2])&&(n=RegExp("</"+d[2],"g")),s=U):void 0!==d[3]&&(s=U):s===U?">"===d[0]?(s=null!==(l=n)&&void 0!==l?l:D,c=-1):void 0===d[1]?c=-2:(c=s.lastIndex-d[2].length,o=d[1],s=void 0===d[3]?U:'"'===d[3]?V:N):s===V||s===N?s=U:s===L||s===H?s=D:(s=U,n=void 0);const h=s===U&&t[r+1].startsWith("/>")?" ":"";a+=s===D?e+O:c>=0?(i.push(o),e.slice(0,c)+z+e.slice(c)+R+h):e+R+(-2===c?r:h)}return[Q(t,a+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]},et=class t{constructor({strings:e,_$litType$:o},i){let n;this.parts=[];let a=0,s=0;const l=e.length-1,r=this.parts,[d,c]=tt(e,o);if(this.el=t.createElement(d,i),Z.currentNode=this.el.content,2===o||3===o){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=Z.nextNode())&&r.length<l;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(z)){const e=c[s++],o=n.getAttribute(t).split(R),i=/([.?@])?(.*)/.exec(e);r.push({type:1,index:a,name:i[2],strings:o,ctor:"."===i[1]?st:"?"===i[1]?lt:"@"===i[1]?rt:at}),n.removeAttribute(t)}else t.startsWith(R)&&(r.push({type:6,index:a}),n.removeAttribute(t));if(W.test(n.tagName)){const t=n.textContent.split(R),e=t.length-1;if(e>0){n.textContent=T?T.emptyScript:"";for(let o=0;o<e;o++)n.append(t[o],P()),Z.nextNode(),r.push({type:2,index:++a});n.append(t[e],P())}}}else if(8===n.nodeType)if(n.data===G)r.push({type:2,index:a});else{let t=-1;for(;-1!==(t=n.data.indexOf(R,t+1));)r.push({type:7,index:a}),t+=R.length-1}a++}}static createElement(t,e){const o=I.createElement("template");return o.innerHTML=t,o}};function ot(t,e,o=t,i){var n,a,s;if(e===X)return e;let l=void 0!==i?null===(n=o._$Co)||void 0===n?void 0:n[i]:o._$Cl;const r=j(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==r&&(null==l||null===(a=l._$AO)||void 0===a||a.call(l,!1),void 0===r?l=void 0:(l=new r(t),l._$AT(t,o,i)),void 0!==i?(null!==(s=o._$Co)&&void 0!==s?s:o._$Co=[])[i]=l:o._$Cl=l),void 0!==l&&(e=ot(t,l._$AS(t,e.values),l,i)),e}var it=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:o},parts:i}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:I).importNode(o,!0);Z.currentNode=n;let a=Z.nextNode(),s=0,l=0,r=i[0];for(;void 0!==r;){if(s===r.index){let e;2===r.type?e=new nt(a,a.nextSibling,this,t):1===r.type?e=new r.ctor(a,r.name,r.strings,this,t):6===r.type&&(e=new dt(a,this,t)),this._$AV.push(e),r=i[++l]}s!==(null==r?void 0:r.index)&&(a=Z.nextNode(),s++)}return Z.currentNode=I,n}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}},nt=class t{get _$AU(){var t,e;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cv}constructor(t,e,o,i){var n;this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=null===(n=null==i?void 0:i.isConnected)||void 0===n||n}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=ot(this,t,e),j(t)?t===J||null==t||""===t?(this._$AH!==J&&this._$AR(),this._$AH=J):t!==this._$AH&&t!==X&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>F(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==J&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(I.createTextNode(t)),this._$AH=t}$(t){var e;const{values:o,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=et.createElement(Q(i.h,i.h[0]),this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.p(o);else{const t=new it(n,this),e=t.u(this.options);t.p(o),this.T(e),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new et(t)),e}k(e){F(this._$AH)||(this._$AH=[],this._$AR());const o=this._$AH;let i,n=0;for(const a of e)n===o.length?o.push(i=new t(this.O(P()),this.O(P()),this,this.options)):i=o[n],i._$AI(a),n++;n<o.length&&(this._$AR(i&&i._$AB.nextSibling,n),o.length=n)}_$AR(t=this._$AA.nextSibling,e){var o;for(null===(o=this._$AP)||void 0===o||o.call(this,!1,!0,e);t!==this._$AB;){const e=B(t).nextSibling;B(t).remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cv=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}},at=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,n){this.type=1,this._$AH=J,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(/* @__PURE__ */new String),this.strings=o):this._$AH=J}_$AI(t,e=this,o,i){const n=this.strings;let a=!1;if(void 0===n)t=ot(this,t,e,0),a=!j(t)||t!==this._$AH&&t!==X,a&&(this._$AH=t);else{var s;const i=t;let l,r;for(t=n[0],l=0;l<n.length-1;l++)r=ot(this,i[o+l],e,l),r===X&&(r=this._$AH[l]),a||(a=!j(r)||r!==this._$AH[l]),r===J?t=J:t!==J&&(t+=(null!==(s=r)&&void 0!==s?s:"")+n[l+1]),this._$AH[l]=r}a&&!i&&this.j(t)}j(t){t===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}},st=class extends at{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===J?void 0:t}},lt=class extends at{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==J)}},rt=class extends at{constructor(t,e,o,i,n){super(t,e,o,i,n),this.type=5}_$AI(t,e=this){var o;if((t=null!==(o=ot(this,t,e,0))&&void 0!==o?o:J)===X)return;const i=this._$AH,n=t===J&&i!==J||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==J&&(i===J||n);n&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,o;"function"==typeof this._$AH?this._$AH.call(null!==(e=null===(o=this.options)||void 0===o?void 0:o.host)&&void 0!==e?e:this.element,t):this._$AH.handleEvent(t)}},dt=class{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){ot(this,t)}},ct=A.litHtmlPolyfillSupport;null==ct||ct(et,nt),(null!==(k=A.litHtmlVersions)&&void 0!==k?k:A.litHtmlVersions=[]).push("3.3.3");var ut,ht,pt=globalThis,bt=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const o=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=o.firstChild),o}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{var i;const n=null!==(i=null==o?void 0:o.renderBefore)&&void 0!==i?i:e;let a=n._$litPart$;if(void 0===a){var s;const t=null!==(s=null==o?void 0:o.renderBefore)&&void 0!==s?s:null;n._$litPart$=a=new nt(e.insertBefore(P(),t),t,void 0,null!=o?o:{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return X}};bt._$litElement$=!0,bt.finalized=!0,null===(ut=pt.litElementHydrateSupport)||void 0===ut||ut.call(pt,{LitElement:bt});var vt=pt.litElementPolyfillSupport;null==vt||vt({LitElement:bt}),(null!==(ht=pt.litElementVersions)&&void 0!==ht?ht:pt.litElementVersions=[]).push("4.2.2");var _t={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:w},gt=(t=_t,e,o)=>{const{kind:i,metadata:n}=o;let a=globalThis.litPropertyMetadata.get(n);if(void 0===a&&globalThis.litPropertyMetadata.set(n,a=/* @__PURE__ */new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),a.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const n=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,n,t,!0,o)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=o;return function(o){const n=this[i];e.call(this,o),this.requestUpdate(i,n,t,!0,o)}}throw Error("Unsupported decorator location: "+i)};function mt(t){return(e,o)=>"object"==typeof o?gt(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function ft(t){return mt({...t,state:!0,attribute:!1})}var $t="ians-custom-room-card",xt=d`
  :host {
    display: block;
    height: 100%;
    padding: var(--ians-card-margin, 0px);
    box-sizing: border-box;
    /* ── CSS custom property defaults (all overridable via card-mod or external CSS) ── */
    --ians-card-background-color: var(--ha-card-background, var(--card-background-color, #fff));
    --ians-card-background-opacity: 1;
    --ians-card-border-color: var(--ha-card-border-color, var(--divider-color, rgba(0, 0, 0, 0.12)));
    --ians-card-border-opacity: 1;
    --ians-card-border-radius: var(--ha-card-border-radius, 12px);
    --ians-icon-color: var(--state-icon-color, var(--primary-text-color));
    --ians-icon-opacity: 1;
    --ians-icon-background-color: transparent;
    --ians-icon-background-opacity: 1;
    --ians-icon-background-size: 40px;
    --ians-icon-background-width: var(--ians-icon-background-size);
    --ians-icon-background-height: var(--ians-icon-background-size);
    --ians-icon-background-border-radius: 50%;
    --ians-icon-size: calc(var(--ians-icon-background-size) * 0.6);
    --ians-badge-color: #fff;
    --ians-badge-background-color: var(--error-color, #db4437);
    --ians-badge-size: 18px;
    --ians-badge-opacity: 1;
    --ians-title-color: var(--primary-text-color);
    --ians-title-font-size: 14px;
    --ians-title-font-weight: 500;
    --ians-title-align: left;
    --ians-sub-button-icon-color: var(--primary-text-color);
    --ians-sub-button-background-color: rgba(255, 255, 255, 0.1);
    --ians-sub-button-size: 32px;
    --ians-sub-button-gap: 6px;
    --ians-sub-button-opacity: 1;
    --ians-sub-button-state-font-size: 11px;
    --ians-sub-button-state-font-weight: 500;
    --ians-sub-button-text-max-width: none;
  }

  ha-card {
    --ha-card-background: transparent;
    position: relative;
    height: 100%;
    overflow: hidden;
    cursor: default;
    border-color: color-mix(
      in srgb,
      var(--ians-card-border-color) calc(var(--ians-card-border-opacity) * 100%),
      transparent
    );
  }

  /* ── Background layers ───────────────────────────────────────────────────── */
  .card-background-color {
    position: absolute;
    inset: 0;
    background-color: var(--ians-card-background-color);
    opacity: var(--ians-card-background-opacity);
    border-radius: inherit;
    pointer-events: none;
    z-index: 0;
  }

  .card-background-image {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: inherit;
    pointer-events: none;
    z-index: 1;
  }

  /* ── Content wrapper ─────────────────────────────────────────────────────── */
  .card-inner {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 12px;
    box-sizing: border-box;
    gap: 8px;
  }

  /* ── Header: icon + title ────────────────────────────────────────────────── */
  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    order: 1;
  }

  /* Placeholder reserves the icon's width in the header when the icon is
     absolutely positioned on the left side, so the title stays to its right */
  .icon-spacer {
    width: var(--ians-icon-background-width);
    flex-shrink: 0;
  }

  /* ── Icon ────────────────────────────────────────────────────────────────── */
  .icon-container {
    position: relative;
    width: var(--ians-icon-background-width);
    height: var(--ians-icon-background-height);
    flex-shrink: 0;
    border-radius: var(--ians-icon-background-border-radius);
    background-color: color-mix(
      in srgb,
      var(--ians-icon-background-color) calc(var(--ians-icon-background-opacity) * 100%),
      transparent
    );
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-container ha-icon {
    --mdc-icon-size: var(--ians-icon-size);
    color: var(--ians-icon-color);
    opacity: var(--ians-icon-opacity);
    display: flex;
  }

  /* Absolute positioning — z-index 2, same as card-inner.
     Rendered BEFORE card-inner in DOM so card-inner (later sibling, same z-index)
     paints on top, keeping sub-buttons above the icon. */
  .icon-container.icon-absolute {
    position: absolute;
    z-index: 2;
    flex-shrink: 0;
  }

  .icon-container.icon-pos-top-left    { top: 12px; left: 12px; }
  .icon-container.icon-pos-top-right   { top: 12px; right: 12px; }
  .icon-container.icon-pos-bottom-left { bottom: 12px; left: 12px; }
  .icon-container.icon-pos-bottom-right { bottom: 12px; right: 12px; }
  .icon-container.icon-pos-center      { top: 50%; left: 50%; transform: translate(-50%, -50%); }
  .icon-container.icon-pos-center-left { top: 50%; left: 12px; transform: translateY(-50%); }
  .icon-container.icon-pos-center-right { top: 50%; right: 12px; transform: translateY(-50%); }

  /* When background has its own position, strip background from icon container */
  .icon-container.icon-no-bg {
    background-color: transparent !important;
  }

  /* ── Independent icon background (background shape without icon) ─────────── */
  .icon-bg-only {
    position: absolute;
    z-index: 1;
    width: var(--ians-icon-background-width);
    height: var(--ians-icon-background-height);
    border-radius: var(--ians-icon-background-border-radius);
    background-color: color-mix(
      in srgb,
      var(--ians-icon-background-color) calc(var(--ians-icon-background-opacity) * 100%),
      transparent
    );
    pointer-events: none;
    flex-shrink: 0;
  }

  /* Shares position classes with icon-container */
  .icon-bg-only.icon-pos-top-left    { top: 12px; left: 12px; }
  .icon-bg-only.icon-pos-top-right   { top: 12px; right: 12px; }
  .icon-bg-only.icon-pos-bottom-left { bottom: 12px; left: 12px; }
  .icon-bg-only.icon-pos-bottom-right { bottom: 12px; right: 12px; }
  .icon-bg-only.icon-pos-center      { top: 50%; left: 50%; transform: translate(-50%, -50%); }
  .icon-bg-only.icon-pos-center-left { top: 50%; left: 12px; transform: translateY(-50%); }
  .icon-bg-only.icon-pos-center-right { top: 50%; right: 12px; transform: translateY(-50%); }

  /* ── Icon badge ──────────────────────────────────────────────────────────── */
  .badge {
    position: absolute;
    top: -4px;
    right: -4px;
    width: var(--ians-badge-size);
    height: var(--ians-badge-size);
    border-radius: 50%;
    background-color: var(--ians-badge-background-color);
    opacity: var(--ians-badge-opacity);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .badge ha-icon {
    --mdc-icon-size: calc(var(--ians-badge-size) * 0.65);
    color: var(--ians-badge-color);
    display: flex;
  }

  .badge.badge-pos-top-left    { top: -4px;  left: -4px;  right: auto;  bottom: auto; }
  .badge.badge-pos-top-right   { top: -4px;  right: -4px; left: auto;   bottom: auto; }
  .badge.badge-pos-bottom-left { bottom: -4px; left: -4px;  top: auto; right: auto; }
  .badge.badge-pos-bottom-right { bottom: -4px; right: -4px; top: auto; left: auto; }

  /* ── Title ───────────────────────────────────────────────────────────────── */
  .card-title {
    color: var(--ians-title-color);
    font-size: var(--ians-title-font-size);
    font-weight: var(--ians-title-font-weight);
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
    text-align: var(--ians-title-align);
    transition: opacity 0.15s ease;
  }

  /* Title with absolute position — rendered as direct child of ha-card, same
     z-index 2 approach as icon-absolute but placed AFTER card-inner in DOM */
  .card-title-absolute {
    position: absolute;
    z-index: 4;
    color: var(--ians-title-color);
    font-size: var(--ians-title-font-size);
    font-weight: var(--ians-title-font-weight);
    line-height: 1.3;
    pointer-events: none;
    max-width: calc(100% - 24px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: opacity 0.15s ease;
  }

  /* Template result not yet available — invisible but in layout flow */
  .card-title.pending,
  .card-title-absolute.pending {
    opacity: 0;
  }

  .card-title-abs-top-left     { top: 12px;  left: 12px; }
  .card-title-abs-top-right    { top: 12px;  right: 12px; text-align: right; }
  .card-title-abs-top-center   { top: 12px;  left: 50%; transform: translateX(-50%); }
  .card-title-abs-center-left  { top: 50%;   left: 12px; transform: translateY(-50%); }
  .card-title-abs-center       { top: 50%;   left: 50%; transform: translate(-50%, -50%); text-align: center; }
  .card-title-abs-center-right { top: 50%;   right: 12px; transform: translateY(-50%); text-align: right; }
  .card-title-abs-bottom-left  { bottom: 12px; left: 12px; }
  .card-title-abs-bottom-right { bottom: 12px; right: 12px; text-align: right; }
  .card-title-abs-bottom-center { bottom: 12px; left: 50%; transform: translateX(-50%); }

  /* ── Interactive card ────────────────────────────────────────────────────── */
  ha-card.interactive {
    cursor: pointer;
    /* manipulation (not none) so swipes on the card still scroll the dashboard;
       the gesture handler cancels on pointercancel/movement */
    touch-action: manipulation;
  }

  ha-card.interactive:focus-visible,
  .sub-button:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }

  /* ── Hover highlight ripple ──────────────────────────────────────────────── */
  .hover-ripple {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: rgba(255, 255, 255, 0.08);
    opacity: 0;
    transition: opacity 0.15s ease;
    pointer-events: none;
    z-index: 5;
  }

  ha-card.highlight-on-hover:hover .hover-ripple {
    opacity: 1;
  }

  /* ── Sub-buttons ─────────────────────────────────────────────────────────── */
  .sub-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ians-sub-button-gap);
    order: 2;
  }

  .sub-buttons.layout-top-row {
    order: 0;
  }

  /* Grid: auto-fill by default; overridden by --ians-sub-buttons-grid-template-columns */
  .sub-buttons.layout-grid {
    display: grid;
    grid-template-columns: var(--ians-sub-buttons-grid-template-columns, repeat(auto-fill, minmax(56px, 1fr)));
    align-content: start;
  }

  /* Grid cells stack icon + label/state vertically */
  .sub-buttons.layout-grid .sub-button {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px 4px;
    min-height: 56px;
    min-width: 0;
    border-radius: 8px;
    text-align: center;
  }

  .sub-buttons.layout-grid .sub-button-label,
  .sub-buttons.layout-grid .sub-button-state {
    max-width: 100%;
    text-align: center;
    font-size: 10px;
  }

  /* Corners and custom: absolute overlay */
  .sub-buttons.layout-corners,
  .sub-buttons.layout-custom {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
  }

  /* Column layouts: absolute, stacked vertically on a side */
  .sub-buttons.layout-right-column {
    position: absolute;
    right: 8px;
    top: 8px;
    bottom: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: var(--ians-sub-buttons-column-justify, flex-start);
    gap: var(--ians-sub-button-gap);
    z-index: 3;
    pointer-events: none;
  }

  .sub-buttons.layout-left-column {
    position: absolute;
    left: 8px;
    top: 8px;
    bottom: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: var(--ians-sub-buttons-column-justify, flex-start);
    gap: var(--ians-sub-button-gap);
    z-index: 3;
    pointer-events: none;
  }

  /* ── Individual sub-button ───────────────────────────────────────────────── */
  .sub-button {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: calc(var(--ians-sub-button-size) / 2);
    min-height: var(--ians-sub-button-size);
    cursor: pointer;
    pointer-events: auto;
    user-select: none;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    transition: opacity 0.15s;
    opacity: var(--ians-sub-button-opacity);
  }

  .sub-button:hover {
    filter: brightness(1.15);
  }

  .sub-button:active {
    filter: brightness(0.85);
  }

  .sub-button.has-background {
    background-color: var(--ians-sub-button-background-color);
  }

  .sub-button.display-only {
    pointer-events: none;
    cursor: default;
  }

  .sub-button ha-icon,
  .sub-button ha-state-icon {
    --mdc-icon-size: calc(var(--ians-sub-button-size) * 0.65);
    color: var(--ians-sub-button-icon-color);
    display: flex;
    flex-shrink: 0;
  }

  .sub-button-label {
    font-size: 11px;
    font-weight: 500;
    color: var(--ians-sub-button-icon-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: var(--ians-sub-button-text-max-width);
  }

  .sub-button-state {
    font-size: var(--ians-sub-button-state-font-size);
    font-weight: var(--ians-sub-button-state-font-weight);
    color: var(--ians-sub-button-icon-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: var(--ians-sub-button-text-max-width);
    opacity: 0.75;
  }

  /* Absolute positions for corners/custom layouts */
  .sub-button.pos-top-left    { position: absolute; top: 8px;    left: 8px; }
  .sub-button.pos-top-center  { position: absolute; top: 8px;    left: 50%; transform: translateX(-50%); }
  .sub-button.pos-top-right   { position: absolute; top: 8px;    right: 8px; }
  .sub-button.pos-bottom-left  { position: absolute; bottom: 8px; left: 8px; }
  .sub-button.pos-bottom-center { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); }
  .sub-button.pos-bottom-right { position: absolute; bottom: 8px; right: 8px; }

  /* Grid cells: horizontal layout (icon beside label) */
  .sub-buttons.layout-grid.grid-horizontal .sub-button {
    flex-direction: row;
    min-height: auto;
    padding: 6px 10px;
    text-align: left;
    border-radius: calc(var(--ians-sub-button-size) / 2);
  }

  .sub-buttons.layout-grid.grid-horizontal .sub-button-label,
  .sub-buttons.layout-grid.grid-horizontal .sub-button-state {
    text-align: left;
    max-width: none;
  }

  /* ── Sub-button groups (multi-group mode) ────────────────────────────────── */
  .sub-button-group {
    position: absolute;
    z-index: 3;
    pointer-events: none;
    display: flex;
    flex-wrap: wrap;
    gap: var(--ians-sub-button-gap);
  }

  /* Full-edge anchor positions */
  .sub-button-group.group-pos-bottom-row  { bottom: 8px; left: 8px; right: 8px; flex-direction: row; }
  .sub-button-group.group-pos-top-row     { top: 8px;    left: 8px; right: 8px; flex-direction: row; }
  .sub-button-group.group-pos-left-column {
    left: 8px; top: 8px; bottom: 8px;
    flex-direction: column; align-items: flex-start;
    justify-content: var(--ians-sub-buttons-column-justify, flex-start);
    flex-wrap: nowrap;
  }
  .sub-button-group.group-pos-right-column {
    right: 8px; top: 8px; bottom: 8px;
    flex-direction: column; align-items: flex-end;
    justify-content: var(--ians-sub-buttons-column-justify, flex-start);
    flex-wrap: nowrap;
  }

  /* Corner/center anchor positions */
  .sub-button-group.group-pos-top-left     { top: 8px;    left: 8px; }
  .sub-button-group.group-pos-top-center   { top: 8px;    left: 50%; transform: translateX(-50%); }
  .sub-button-group.group-pos-top-right    { top: 8px;    right: 8px; }
  .sub-button-group.group-pos-center-left  { top: 50%;    left: 8px;  transform: translateY(-50%); flex-direction: column; flex-wrap: nowrap; }
  .sub-button-group.group-pos-center       { top: 50%;    left: 50%; transform: translate(-50%, -50%); }
  .sub-button-group.group-pos-center-right { top: 50%;    right: 8px; transform: translateY(-50%); flex-direction: column; flex-wrap: nowrap; }
  .sub-button-group.group-pos-bottom-left  { bottom: 8px; left: 8px; }
  .sub-button-group.group-pos-bottom-center { bottom: 8px; left: 50%; transform: translateX(-50%); }
  .sub-button-group.group-pos-bottom-right  { bottom: 8px; right: 8px; }

  /* Full card overlay — for corners/custom sub-button layouts within a group */
  .sub-button-group.group-pos-full { inset: 0; }

  /* Grid layout within a group */
  .sub-button-group.group-layout-grid {
    display: grid;
    grid-template-columns: var(--ians-sub-buttons-grid-template-columns, repeat(auto-fill, minmax(56px, 1fr)));
    flex-wrap: unset;
    align-content: start;
  }

  .sub-button-group.group-layout-grid .sub-button {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px 4px;
    min-height: 56px;
    min-width: 0;
    border-radius: 8px;
    text-align: center;
  }

  .sub-button-group.group-layout-grid .sub-button-label,
  .sub-button-group.group-layout-grid .sub-button-state {
    max-width: 100%;
    text-align: center;
    font-size: 10px;
  }

  .sub-button-group.group-layout-grid.grid-horizontal .sub-button {
    flex-direction: row;
    min-height: auto;
    padding: 6px 10px;
    text-align: left;
    border-radius: calc(var(--ians-sub-button-size) / 2);
  }

  .sub-button-group.group-layout-grid.grid-horizontal .sub-button-label,
  .sub-button-group.group-layout-grid.grid-horizontal .sub-button-state {
    text-align: left;
    max-width: none;
  }

  /* ── Icon animations ─────────────────────────────────────────────────────── */

  @keyframes ians-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes ians-pulse {
    0%, 100% { transform: scale(1); }
    50%      { transform: scale(1.25); }
  }

  @keyframes ians-blink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.1; }
  }

  @keyframes ians-bounce {
    0%, 100% { transform: translateY(0); }
    40%      { transform: translateY(-6px); }
    70%      { transform: translateY(-2px); }
  }

  @keyframes ians-shake {
    0%, 100%    { transform: translateX(0); }
    20%, 60%    { transform: translateX(-5px); }
    40%, 80%    { transform: translateX(5px); }
  }

  /* --ians-anim-dur is set on the icon container via inline style and inherited by the icon */
  .anim-spin   { animation: ians-spin   var(--ians-anim-dur, 2s)   linear      infinite; }
  .anim-pulse  { animation: ians-pulse  var(--ians-anim-dur, 1.5s) ease-in-out infinite; }
  .anim-blink  { animation: ians-blink  var(--ians-anim-dur, 1.2s) ease-in-out infinite; }
  .anim-bounce { animation: ians-bounce var(--ians-anim-dur, 0.8s) ease-in-out infinite; }
  .anim-shake  { animation: ians-shake  var(--ians-anim-dur, 0.6s) ease-in-out infinite; }

  /* Respect the OS "reduce motion" setting */
  @media (prefers-reduced-motion: reduce) {
    .anim-spin, .anim-pulse, .anim-blink, .anim-bounce, .anim-shake {
      animation: none;
    }
  }

  /* ── Template error state ────────────────────────────────────────────────── */
  ha-card.has-template-error {
    border: 2px solid var(--error-color, #db4437);
  }

  .template-error {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--error-color, #db4437);
    font-size: 11px;
    padding: 2px 0;
  }

  .template-error ha-icon {
    --mdc-icon-size: 14px;
    flex-shrink: 0;
  }
`;function yt(t){const e=t.trim();return e.startsWith("{{")||e.startsWith("{%")}function wt(t,e,o,i,n){return t.connection.subscribeMessage(t=>{"error"in t?null==n||n(t.error):i(t.result)},{type:"render_template",template:e,variables:o,strict:!1,report_errors:!0})}function Ct(t,e,o){const i=function(t){const e=t=>{if(!t)return;const e={...t};return"call-service"===e.action&&(e.action="perform-action"),e.service&&!e.perform_action&&(e.perform_action=e.service),e.service_data&&!e.data&&(e.data=e.service_data),e};return{...t,tap_action:e(t.tap_action),hold_action:e(t.hold_action),double_tap_action:e(t.double_tap_action)}}(e),n=new Event("hass-action",{bubbles:!0,composed:!0});n.detail={config:i,action:o},t.dispatchEvent(n)}function kt(t,e,o){var i,n;let a=null,s=null,l=0,r=0,d=0,c=!1,u=!1;const h=void 0!==(null===(i=e.double_tap_action)||void 0===i?void 0:i.action)&&"none"!==e.double_tap_action.action,p=void 0!==(null===(n=e.hold_action)||void 0===n?void 0:n.action)&&"none"!==e.hold_action.action,b=()=>{a&&(clearTimeout(a),a=null)},v=()=>{s&&(clearTimeout(s),s=null),l=0},_=t=>{void 0!==t.button&&0!==t.button&&"touch"!==t.pointerType||(r=t.clientX,d=t.clientY,c=!1,u=!1,p&&(a=setTimeout(()=>{a=null,c||(u=!0,v(),o("hold"))},500)))},g=t=>{const e=Math.abs(t.clientX-r),o=Math.abs(t.clientY-d);(e>10||o>10)&&(c=!0,b())},m=()=>{b(),c||u||(h?(l++,1===l?s=setTimeout(()=>{l=0,o("tap")},350):(v(),o("double_tap"))):o("tap"))},f=()=>{b(),v(),c=!0},$=t=>{p&&t.preventDefault()},x=e=>{"Enter"!==e.key&&" "!==e.key||e.target!==t||e.repeat||(e.preventDefault(),o("tap"))};return t.addEventListener("pointerdown",_),t.addEventListener("pointermove",g),t.addEventListener("pointerup",m),t.addEventListener("pointercancel",f),t.addEventListener("contextmenu",$),t.addEventListener("keydown",x),()=>{b(),v(),t.removeEventListener("pointerdown",_),t.removeEventListener("pointermove",g),t.removeEventListener("pointerup",m),t.removeEventListener("pointercancel",f),t.removeEventListener("contextmenu",$),t.removeEventListener("keydown",x)}}function St(t,e,o,i){var n,a=arguments.length,s=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(s=(a<3?n(s):a>3?n(e,o,s):n(e,o))||s);return a>3&&s&&Object.defineProperty(e,o,s),s}var At=[{value:"",label:"Default (inline with title)"},{value:"top-left",label:"Top Left"},{value:"top-right",label:"Top Right"},{value:"bottom-left",label:"Bottom Left"},{value:"bottom-right",label:"Bottom Right"},{value:"center",label:"Center"},{value:"center-left",label:"Center Left"},{value:"center-right",label:"Center Right"},{value:"custom",label:"Custom (% recommended for responsive)"}],Bt=[{value:"",label:"Default (inline with icon)"},{value:"top-left",label:"Top Left"},{value:"top-center",label:"Top Center"},{value:"top-right",label:"Top Right"},{value:"center-left",label:"Center Left"},{value:"center",label:"Center"},{value:"center-right",label:"Center Right"},{value:"bottom-left",label:"Bottom Left"},{value:"bottom-center",label:"Bottom Center"},{value:"bottom-right",label:"Bottom Right"},{value:"custom",label:"Custom (% recommended for responsive)"}],Tt=[{value:"left",label:"Left"},{value:"center",label:"Center"},{value:"right",label:"Right"}],Et=[{value:"top-right",label:"Top Right (default)"},{value:"top-left",label:"Top Left"},{value:"bottom-left",label:"Bottom Left"},{value:"bottom-right",label:"Bottom Right"},{value:"custom",label:"Custom"}],zt=[{value:"circle",label:"Circle (default)"},{value:"rounded-rect",label:"Rounded Rectangle"},{value:"squircle",label:"Squircle"},{value:"square",label:"Square"}],Rt=[{value:"",label:"Default (from theme)"},{value:"square",label:"Square (no rounding)"},{value:"rounded-sm",label:"Rounded Small (8px)"},{value:"rounded",label:"Rounded (12px)"},{value:"rounded-lg",label:"Rounded Large (24px)"},{value:"pill",label:"Pill (999px)"}],Gt=[{value:"bottom-row",label:"Bottom Row"},{value:"top-row",label:"Top Row"},{value:"right-column",label:"Right Column"},{value:"left-column",label:"Left Column"},{value:"corners",label:"Corners (up to 4)"},{value:"grid",label:"Grid"},{value:"custom",label:"Custom positions"}],Ot=[{value:"top-left",label:"Top Left"},{value:"top-center",label:"Top Center"},{value:"top-right",label:"Top Right"},{value:"bottom-left",label:"Bottom Left"},{value:"bottom-center",label:"Bottom Center"},{value:"bottom-right",label:"Bottom Right"}],It=[{value:"none",label:"None"},{value:"spin",label:"Spin (continuous rotation)"},{value:"pulse",label:"Pulse (scale breathe)"},{value:"blink",label:"Blink (opacity flash)"},{value:"bounce",label:"Bounce (vertical hop)"},{value:"shake",label:"Shake (horizontal wiggle)"}],Pt=[{value:"always",label:"Always"},{value:"active",label:"When entity is active (on/open/playing)"},{value:"inactive",label:"When entity is inactive (off/closed)"}],jt=[{value:"slow",label:"Slow"},{value:"normal",label:"Normal"},{value:"fast",label:"Fast"}],Ft=[{value:"top",label:"Top (default)"},{value:"center",label:"Center"},{value:"bottom",label:"Bottom"},{value:"space-between",label:"Space Between"},{value:"space-around",label:"Space Around"}],Mt=[{value:"",label:"Default (derived from layout)"},{value:"bottom-row",label:"Full width — bottom edge"},{value:"top-row",label:"Full width — top edge"},{value:"right-column",label:"Full height — right side"},{value:"left-column",label:"Full height — left side"},{value:"top-left",label:"Top Left corner"},{value:"top-center",label:"Top Center"},{value:"top-right",label:"Top Right corner"},{value:"center-left",label:"Center Left"},{value:"center",label:"Center"},{value:"center-right",label:"Center Right"},{value:"bottom-left",label:"Bottom Left corner"},{value:"bottom-center",label:"Bottom Center"},{value:"bottom-right",label:"Bottom Right corner"},{value:"custom",label:"Custom (X/Y coordinates)"}],Dt=[{value:"vertical",label:"Vertical — icon above label (default)"},{value:"horizontal",label:"Horizontal — icon beside label"}],Lt=/* @__PURE__ */new Set(["title","icon","icon_color","icon_background_color","badge_icon","badge_color","badge_background_color","background_color","border_color"]),Ht={number:{min:0,max:1,step:.05,mode:"slider"}};function Ut(t){if(!t)return"#000000";if(/^#[0-9a-f]{6}$/i.test(t))return t.toLowerCase();if(/^#[0-9a-f]{3}$/i.test(t)){const[,e,o,i]=t.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);return`#${e}${e}${o}${o}${i}${i}`.toLowerCase()}return"#000000"}var Nt={entity:{}},Vt={icon:{}},Wt=class extends bt{constructor(...t){super(...t),this._loaded=!1,this._templateMode=/* @__PURE__ */new Set,this._expandedSubButton=null,this._activeTab="basic",this._dragOverIndex=null,this._dragIndex=null,this._expandedGroup=null,this._expandedGroupButton={},this._dragGroupContext=null}connectedCallback(){super.connectedCallback(),async function(){var t,e;customElements.get("ha-form")||null===(t=customElements.get("hui-tile-card"))||void 0===t||null===(e=t.getConfigElement)||void 0===e||e.call(t),await Promise.resolve()}().then(()=>{this._loaded=!0})}setConfig(t){this._config=t;const e=/* @__PURE__ */new Set;for(const o of Lt){const i=t[o];i&&yt(i)&&e.add(o)}this._templateMode=e}_fireConfigChanged(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_fieldChanged(t,e){this._config&&this._fireConfigChanged({...this._config,[t]:e})}_gridFieldChanged(t,e){var o;this._config&&this._fireConfigChanged({...this._config,grid_options:{...null!==(o=this._config.grid_options)&&void 0!==o?o:{},[t]:e}})}_globalActionFieldChanged(t,e){var o;this._config&&this._fireConfigChanged({...this._config,global_action:{...null!==(o=this._config.global_action)&&void 0!==o?o:{},[t]:e}})}_subButtonChanged(t,e){var o;if(!(null===(o=this._config)||void 0===o?void 0:o.sub_buttons))return;const i=[...this._config.sub_buttons];i[t]={...i[t],...e},this._fieldChanged("sub_buttons",i)}_addSubButton(){var t,e;const o=[...null!==(t=null===(e=this._config)||void 0===e?void 0:e.sub_buttons)&&void 0!==t?t:[]];o.push({show_icon:!0,show_label:!1,show_state:!1,background:!0,state_based_color:!1,tap_action:{action:"toggle"},hold_action:{action:"more-info"},double_tap_action:{action:"none"}}),this._fieldChanged("sub_buttons",o),this._expandedSubButton=o.length-1}_deleteSubButton(t){var e;if(!(null===(e=this._config)||void 0===e?void 0:e.sub_buttons))return;const o=[...this._config.sub_buttons];o.splice(t,1),this._fieldChanged("sub_buttons",o),this._expandedSubButton===t&&(this._expandedSubButton=null)}_moveSubButton(t,e){var o,i;const n=[...null!==(o=null===(i=this._config)||void 0===i?void 0:i.sub_buttons)&&void 0!==o?o:[]];e<0||e>=n.length||([n[t],n[e]]=[n[e],n[t]],this._fieldChanged("sub_buttons",n),this._expandedSubButton=null)}_moveGroupButton(t,e,o){var i,n,a,s;const l=[...null!==(i=null===(n=this._config)||void 0===n?void 0:n.sub_button_groups)&&void 0!==i?i:[]],r=[...null!==(a=null===(s=l[t])||void 0===s?void 0:s.buttons)&&void 0!==a?a:[]];o<0||o>=r.length||([r[e],r[o]]=[r[o],r[e]],l[t]={...l[t],buttons:r},this._fieldChanged("sub_button_groups",l),this._expandedGroupButton={...this._expandedGroupButton,[t]:null})}_renderMoveButtons(t,e,o){return Y`
      <div class="move-btns">
        ${t>0?Y`
          <button class="icon-btn" title="Move up"
            @click=${e=>{e.stopPropagation(),o(t,t-1)}}
          ><ha-icon icon="mdi:arrow-up" style="--mdc-icon-size:14px;"></ha-icon></button>
        `:J}
        ${t<e-1?Y`
          <button class="icon-btn" title="Move down"
            @click=${e=>{e.stopPropagation(),o(t,t+1)}}
          ><ha-icon icon="mdi:arrow-down" style="--mdc-icon-size:14px;"></ha-icon></button>
        `:J}
      </div>
    `}_onDragHandleMousedown(t,e){const o=t.currentTarget.closest(".sub-btn-row");o&&o.setAttribute("draggable","true"),this._dragIndex=e}_onDragStart(t,e){var o;null===(o=t.dataTransfer)||void 0===o||o.setData("text/plain",String(e)),t.dataTransfer&&(t.dataTransfer.effectAllowed="move"),this._dragIndex=e}_onDragOver(t,e){null!==this._dragIndex&&this._dragIndex!==e&&(t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="move"),this._dragOverIndex!==e&&(this._dragOverIndex=e))}_onDragLeave(t){this._dragOverIndex===t&&(this._dragOverIndex=null)}_onDrop(t,e){var o;t.preventDefault();const i=this._dragIndex;if(this._dragIndex=null,this._dragOverIndex=null,null===i||i===e||!(null===(o=this._config)||void 0===o?void 0:o.sub_buttons))return;const n=[...this._config.sub_buttons],[a]=n.splice(i,1);n.splice(e,0,a),this._fieldChanged("sub_buttons",n),this._expandedSubButton=null}_onDragEnd(t){t.currentTarget.removeAttribute("draggable"),this._dragIndex=null,this._dragOverIndex=null}_toggleTemplateMode(t){const e=new Set(this._templateMode);e.has(t)?e.delete(t):e.add(t),this._templateMode=e}_renderColorField(t,e,o="e.g. red, #ff0000, var(--primary-color)",i=!0){var n,a;const s=Lt.has(t),l=null!==(n=null===(a=this._config)||void 0===a?void 0:a[t])&&void 0!==n?n:"",r=s&&this._templateMode.has(t),d=s?Y`
      <button
        class="tmpl-btn ${r?"active":""}"
        title="${r?"Jinja2 template active — click to switch back to simple input":"Click to enter a Jinja2 template (e.g. {{ states('sensor.temp') }})"}"
        @click=${()=>this._toggleTemplateMode(t)}
      ><ha-icon icon="mdi:code-braces" class="tmpl-icon"></ha-icon></button>
    `:J;return r?Y`
        <div class="color-field">
          ${i?Y`<span class="color-field-label">${e}</span>`:J}
          <div class="color-tmpl-row">
            <textarea
              .value=${l}
              placeholder="{{ states('sensor.example') }}"
              @change=${e=>this._fieldChanged(t,e.target.value)}
              @input=${e=>this._fieldChanged(t,e.target.value)}
            ></textarea>
            ${d}
          </div>
          <div class="hint">HA Jinja2 template</div>
        </div>
      `:Y`
      <div class="color-field">
        ${i?Y`<span class="color-field-label">${e}</span>`:J}
        <div class="color-row">
          <label class="color-btn" title="Click to open color picker">
            <div class="color-checker"></div>
            <div class="color-fill" style="background: ${l||"transparent"}"></div>
            <ha-icon icon="mdi:eyedropper-variant" class="color-icon"></ha-icon>
            <input
              type="color"
              class="color-native"
              .value=${Ut(l)}
              @change=${e=>this._fieldChanged(t,e.target.value||void 0)}
            />
          </label>
          <input
            type="text"
            class="color-text-input"
            .value=${l}
            placeholder=${o}
            @change=${e=>this._fieldChanged(t,e.target.value||void 0)}
            @input=${e=>this._fieldChanged(t,e.target.value||void 0)}
          />
          ${d}
        </div>
      </div>
    `}_renderButtonColorField(t,e,o,i){return Y`
      <div class="color-field">
        <span class="color-field-label">${e}</span>
        <div class="color-row">
          <label class="color-btn" title="Click to open color picker">
            <div class="color-checker"></div>
            <div class="color-fill" style="background: ${t||"transparent"}"></div>
            <ha-icon icon="mdi:eyedropper-variant" class="color-icon"></ha-icon>
            <input type="color" class="color-native"
              .value=${Ut(t)}
              @change=${t=>i(t.target.value||void 0)}
            />
          </label>
          <input type="text" class="color-text-input"
            .value=${t}
            placeholder=${o}
            @change=${t=>i(t.target.value||void 0)}
            @input=${t=>i(t.target.value||void 0)}
          />
        </div>
      </div>
    `}_renderSubBtnColorField(t,e,o,i,n="e.g. #ff9800, var(--primary-color)"){var a;return this._renderButtonColorField(null!==(a=t[o])&&void 0!==a?a:"",i,n,t=>this._subButtonChanged(e,{[o]:t}))}_renderButtonBody(t,e,o,i){var n,a,s,l,r,d,c,u,h,p,b,v,_,g,m,f,$,x,y;return Y`
      <div class="sub-group-label">Entity &amp; Display</div>

      <ha-selector .hass=${this.hass} .label=${"Entity"}
        .selector=${Nt}
        .value=${null!==(n=t.entity)&&void 0!==n?n:""}
        @value-changed=${t=>o({entity:t.detail.value||void 0})}
      ></ha-selector>

      <ha-selector .hass=${this.hass}
        .label=${"Icon (blank = Home Assistant's icon for the entity)"}
        .selector=${Vt}
        .value=${null!==(a=t.icon)&&void 0!==a?a:""}
        .context=${{icon_entity:t.entity}}
        @value-changed=${t=>o({icon:t.detail.value||void 0})}
      ></ha-selector>

      <ha-selector .hass=${this.hass}
        .label=${"Label (blank to hide, or type 'entity' for entity name)"}
        .selector=${{text:{}}} .value=${null!==(s=t.label)&&void 0!==s?s:""}
        @value-changed=${t=>o({label:t.detail.value||void 0})}
      ></ha-selector>

      <ha-form .hass=${this.hass} .data=${t}
        .schema=${[{name:"show_icon",label:"Show Icon",selector:{boolean:{}}},{name:"show_label",label:"Show Label",selector:{boolean:{}}},{name:"show_state",label:"Show State (includes unit of measurement)",selector:{boolean:{}}},{name:"background",label:"Show Background",selector:{boolean:{}}}]}
        .computeLabel=${t=>t.label}
        @value-changed=${t=>{o({show_icon:t.detail.value.show_icon,show_label:t.detail.value.show_label,show_state:t.detail.value.show_state,background:t.detail.value.background})}}
      ></ha-form>

      <div class="sub-group-label">Color &amp; Opacity</div>

      <ha-form .hass=${this.hass}
        .data=${{state_based_color:null!==(l=t.state_based_color)&&void 0!==l&&l}}
        .schema=${[{name:"state_based_color",label:"Auto-color by entity state",selector:{boolean:{}}}]}
        .computeLabel=${t=>t.label}
        @value-changed=${t=>o({state_based_color:t.detail.value.state_based_color})}
      ></ha-form>

      ${t.state_based_color?Y`
        <div class="hint">Active when entity is on/open/home/playing. Defaults to domain color (yellow for lights) if left blank.</div>
        ${this._renderButtonColorField(null!==(r=t.icon_color_on)&&void 0!==r?r:"","Active Icon Color","e.g. #FDD835, yellow",t=>i("icon_color_on",t))}
        ${this._renderButtonColorField(null!==(d=t.icon_color_off)&&void 0!==d?d:"","Inactive Icon Color","e.g. #888888, grey",t=>i("icon_color_off",t))}
      `:Y`
        ${this._renderButtonColorField(null!==(c=t.icon_color)&&void 0!==c?c:"","Icon Color","e.g. #ff9800, var(--primary-color)",t=>i("icon_color",t))}
      `}

      ${this._renderButtonColorField(null!==(u=t.background_color)&&void 0!==u?u:"","Background Color","e.g. rgba(255,255,255,0.15)",t=>i("background_color",t))}

      <ha-selector .hass=${this.hass} .label=${"Button Opacity"}
        .selector=${Ht} .value=${null!==(h=t.opacity)&&void 0!==h?h:1}
        @value-changed=${t=>o({opacity:t.detail.value})}
      ></ha-selector>

      <div class="sub-group-label">Animation</div>
      <ha-selector .hass=${this.hass} .label=${"Animation"}
        .selector=${{select:{options:It,mode:"dropdown"}}}
        .value=${null!==(p=t.animation)&&void 0!==p?p:"none"}
        @value-changed=${t=>o({animation:"none"===t.detail.value?void 0:t.detail.value})}
      ></ha-selector>
      ${t.animation&&"none"!==t.animation?Y`
        <div class="two-col">
          <ha-selector .hass=${this.hass} .label=${"When"}
            .selector=${{select:{options:Pt,mode:"dropdown"}}}
            .value=${null!==(b=t.animation_when)&&void 0!==b?b:"always"}
            @value-changed=${t=>o({animation_when:t.detail.value||void 0})}
          ></ha-selector>
          <ha-selector .hass=${this.hass} .label=${"Speed"}
            .selector=${{select:{options:jt,mode:"dropdown"}}}
            .value=${null!==(v=t.animation_speed)&&void 0!==v?v:"normal"}
            @value-changed=${t=>o({animation_speed:t.detail.value||void 0})}
          ></ha-selector>
        </div>
      `:J}

      <div class="sub-group-label">Text Style</div>
      <div class="two-col">
        <ha-selector .hass=${this.hass} .label=${"State Font Size"}
          .selector=${{number:{min:8,max:32,step:1,mode:"box",unit_of_measurement:"px"}}}
          .value=${null!==(_=t.state_font_size)&&void 0!==_?_:11}
          @value-changed=${t=>o({state_font_size:11!==t.detail.value?t.detail.value:void 0})}
        ></ha-selector>
        <ha-selector .hass=${this.hass} .label=${"State Font Weight"}
          .selector=${{number:{min:100,max:900,step:100,mode:"box"}}}
          .value=${null!==(g=t.state_font_weight)&&void 0!==g?g:500}
          @value-changed=${t=>o({state_font_weight:500!==t.detail.value?t.detail.value:void 0})}
        ></ha-selector>
      </div>
      <ha-selector .hass=${this.hass} .label=${"State/Label Max Width (0 = auto)"}
        .selector=${{number:{min:0,max:400,step:1,mode:"box",unit_of_measurement:"px"}}}
        .value=${null!==(m=t.text_max_width)&&void 0!==m?m:0}
        @value-changed=${t=>o({text_max_width:t.detail.value||void 0})}
      ></ha-selector>

      ${e?Y`
        <div class="sub-group-label">Position</div>
        <ha-selector .hass=${this.hass} .label=${"Position"}
          .selector=${{select:{options:Ot,mode:"dropdown"}}}
          .value=${null!==(f=t.position)&&void 0!==f?f:"bottom-left"}
          @value-changed=${t=>o({position:t.detail.value})}
        ></ha-selector>
      `:J}

      <div class="sub-group-label">Actions</div>
      <ha-selector .hass=${this.hass} .label=${"Tap Action"}
        .selector=${{ui_action:{}}} .value=${null!==($=t.tap_action)&&void 0!==$?$:{action:"toggle"}}
        @value-changed=${t=>o({tap_action:t.detail.value})}
      ></ha-selector>
      <ha-selector .hass=${this.hass} .label=${"Hold Action"}
        .selector=${{ui_action:{}}} .value=${null!==(x=t.hold_action)&&void 0!==x?x:{action:"more-info"}}
        @value-changed=${t=>o({hold_action:t.detail.value})}
      ></ha-selector>
      <ha-selector .hass=${this.hass} .label=${"Double-Tap Action"}
        .selector=${{ui_action:{}}} .value=${null!==(y=t.double_tap_action)&&void 0!==y?y:{action:"none"}}
        @value-changed=${t=>o({double_tap_action:t.detail.value})}
      ></ha-selector>
    `}_renderTemplateField(t,e,o){var i,n;const a=this._templateMode.has(t),s=null!==(i=null===(n=this._config)||void 0===n?void 0:n[t])&&void 0!==i?i:"";return Y`
      <div class="template-row">
        <div class="template-input">
          ${a?Y`
                <textarea
                  .value=${s}
                  placeholder="{{ states('sensor.example') }}"
                  @change=${e=>this._fieldChanged(t,e.target.value)}
                  @input=${e=>this._fieldChanged(t,e.target.value)}
                ></textarea>
                <div class="hint">HA Jinja2 template</div>
              `:o()}
        </div>
        <button
          class="tmpl-btn ${a?"active":""}"
          title="${a?"Jinja2 template active — click to switch back to simple input":"Click to enter a Jinja2 template (e.g. {{ states('sensor.temp') }})"}"
          @click=${()=>this._toggleTemplateMode(t)}
        ><ha-icon icon="mdi:code-braces" class="tmpl-icon"></ha-icon></button>
      </div>
    `}_renderOpacityField(t,e,o=1){var i,n;return Y`
      <ha-selector
        .hass=${this.hass}
        .label=${e}
        .selector=${Ht}
        .value=${null!==(i=null===(n=this._config)||void 0===n?void 0:n[t])&&void 0!==i?i:o}
        title=${"Use this slider for element opacity. For color transparency, add alpha to the color value instead (e.g. rgba(255,0,0,0.5))."}
        @value-changed=${e=>this._fieldChanged(t,e.detail.value)}
      ></ha-selector>
    `}_renderNumField(t,e,o,i,n,a,s=""){var l,r;return Y`
      <ha-selector
        .hass=${this.hass}
        .label=${e}
        .selector=${{number:{min:o,max:i,step:n,mode:"box",...s?{unit_of_measurement:s}:{}}}}
        .value=${null!==(l=null===(r=this._config)||void 0===r?void 0:r[t])&&void 0!==l?l:a}
        @value-changed=${e=>this._fieldChanged(t,e.detail.value)}
      ></ha-selector>
    `}_renderCoordFields(t,e,o="X (CSS)",i="Y (CSS)"){var n,a,s,l;return Y`
      <div class="two-col">
        <ha-selector .hass=${this.hass} .label=${o}
          .selector=${{text:{}}}
          .value=${null!==(n=null===(a=this._config)||void 0===a?void 0:a[t])&&void 0!==n?n:""}
          .placeholder=${"e.g. 10px, 25%"}
          @value-changed=${e=>this._fieldChanged(t,e.detail.value||void 0)}
        ></ha-selector>
        <ha-selector .hass=${this.hass} .label=${i}
          .selector=${{text:{}}}
          .value=${null!==(s=null===(l=this._config)||void 0===l?void 0:l[e])&&void 0!==s?s:""}
          .placeholder=${"e.g. 10px, 25%"}
          @value-changed=${t=>this._fieldChanged(e,t.detail.value||void 0)}
        ></ha-selector>
      </div>
      <div class="hint">Tip: use <code>%</code> values (e.g. <code>25%</code>) for positions that adapt to card size. Fixed <code>px</code> values stay constant when the card is resized.</div>
    `}_renderTabBar(){return Y`
      <div class="tab-bar">
        ${[{id:"basic",label:"Basic"},{id:"icon",label:"Icon"},{id:"card",label:"Card"},{id:"buttons",label:"Buttons"},{id:"actions",label:"Actions"}].map(t=>Y`
          <button
            class="tab ${this._activeTab===t.id?"active":""}"
            @click=${()=>{this._activeTab=t.id}}
          >${t.label}</button>
        `)}
      </div>
    `}_renderBasicTab(){var t,e,o;const i=this._config;return Y`
      <div class="section">
        <div class="section-label">Entity</div>
        <ha-selector
          .hass=${this.hass}
          .label=${"Entity (optional)"}
          .selector=${Nt}
          .value=${null!==(t=i.entity)&&void 0!==t?t:""}
          @value-changed=${t=>this._fieldChanged("entity",t.detail.value||void 0)}
        ></ha-selector>
      </div>

      <div class="section">
        <div class="section-label">Title</div>
        ${this._renderTemplateField("title","Title",()=>{var t;return Y`
            <input
              type="text"
              class="color-text-input"
              .value=${null!==(t=i.title)&&void 0!==t?t:""}
              placeholder="Room name, or leave blank to hide"
              @change=${t=>this._fieldChanged("title",t.target.value||void 0)}
              @input=${t=>this._fieldChanged("title",t.target.value||void 0)}
            />
          `})}

        <ha-selector .hass=${this.hass} .label=${"Position"}
          .selector=${{select:{options:Bt,mode:"dropdown"}}}
          .value=${null!==(e=i.title_position)&&void 0!==e?e:""}
          @value-changed=${t=>this._fieldChanged("title_position",t.detail.value||void 0)}
        ></ha-selector>

        ${"custom"===i.title_position?this._renderCoordFields("title_position_x","title_position_y","X offset","Y offset"):J}

        ${i.title_position?J:Y`
          <ha-selector .hass=${this.hass} .label=${"Text Alignment"}
            .selector=${{select:{options:Tt,mode:"list"}}}
            .value=${null!==(o=i.title_align)&&void 0!==o?o:"left"}
            @value-changed=${t=>this._fieldChanged("title_align",t.detail.value||void 0)}
          ></ha-selector>
        `}

        <div class="two-col">
          ${this._renderNumField("title_font_size","Font Size",8,48,1,14,"px")}
          ${this._renderNumField("title_font_weight","Font Weight",100,900,100,500)}
        </div>
        ${this._renderColorField("title_color","Title Color","e.g. white, #ffffff")}
      </div>

      <div class="section">
        <div class="section-label">Icon</div>
        ${this._renderTemplateField("icon","Icon",()=>{var t;return Y`
            <ha-selector .hass=${this.hass} .label=${"Icon"}
              .selector=${Vt}
              .value=${null!==(t=i.icon)&&void 0!==t?t:""}
              @value-changed=${t=>this._fieldChanged("icon",t.detail.value||void 0)}
            ></ha-selector>
          `})}
      </div>
    `}_renderIconTab(){var t,e,o,i,n,a,s,l,r,d,c,u,h,p,b,v,_,g,m;const f=this._config;return Y`
      <!-- ── Icon color ── -->
      <div class="section">
        <div class="section-label">Icon Color</div>
        ${this._renderColorField("icon_color","Icon Color",void 0,!1)}

        <ha-form
          .hass=${this.hass}
          .data=${{state_based_color:null!==(t=f.state_based_color)&&void 0!==t&&t}}
          .schema=${[{name:"state_based_color",label:"Auto-color by entity state",selector:{boolean:{}}}]}
          .computeLabel=${t=>t.label}
          @value-changed=${t=>this._fieldChanged("state_based_color",t.detail.value.state_based_color)}
        ></ha-form>

        ${f.state_based_color?Y`
          <div class="hint">When active (on/open/playing/home): uses the color below or a domain default (yellow for lights). When inactive: uses the off-color or falls back to Icon Color.</div>
          ${this._renderColorField("icon_color_on","Active Color (on/open/playing)","e.g. #FDD835, yellow")}
          ${this._renderColorField("icon_color_off","Inactive Color (off/closed)","e.g. #888888, grey")}
        `:J}

        <ha-selector .hass=${this.hass} .label=${"Icon Opacity"}
          .selector=${Ht} .value=${null!==(e=f.icon_opacity)&&void 0!==e?e:1}
          @value-changed=${t=>this._fieldChanged("icon_opacity",t.detail.value)}
        ></ha-selector>
      </div>

      <!-- ── Icon background ── -->
      <div class="section">
        <div class="section-label">Icon Background</div>
        <ha-selector .hass=${this.hass} .label=${"Shape"}
          .selector=${{select:{options:zt,mode:"dropdown"}}}
          .value=${null!==(o=f.icon_background_shape)&&void 0!==o?o:"circle"}
          @value-changed=${t=>this._fieldChanged("icon_background_shape",t.detail.value||void 0)}
        ></ha-selector>

        <ha-selector .hass=${this.hass} .label=${"Custom Border Radius (CSS — overrides shape)"}
          .selector=${{text:{}}}
          .value=${null!==(i=f.icon_background_border_radius)&&void 0!==i?i:""}
          .placeholder=${"e.g. 10px 20px 30px 40px, 50% 0"}
          @value-changed=${t=>this._fieldChanged("icon_background_border_radius",t.detail.value||void 0)}
        ></ha-selector>

        ${this._renderColorField("icon_background_color","Background Color")}

        <ha-selector .hass=${this.hass} .label=${"Background Opacity"}
          .selector=${Ht} .value=${null!==(n=f.icon_background_opacity)&&void 0!==n?n:1}
          @value-changed=${t=>this._fieldChanged("icon_background_opacity",t.detail.value)}
        ></ha-selector>

        <div class="two-col">
          ${this._renderNumField("icon_size","Icon Size",8,120,2,24,"px")}
          ${this._renderNumField("icon_background_size","Background Size",8,160,2,40,"px")}
        </div>

        <div class="hint">Width/Height override Background Size for non-square backgrounds.</div>
        <div class="two-col">
          ${this._renderNumField("icon_background_width","Width",8,200,2,null!==(a=f.icon_background_size)&&void 0!==a?a:40,"px")}
          ${this._renderNumField("icon_background_height","Height",8,200,2,null!==(s=f.icon_background_size)&&void 0!==s?s:40,"px")}
        </div>

        <ha-selector .hass=${this.hass} .label=${"Background Position (independent of icon)"}
          .selector=${{select:{options:At,mode:"dropdown"}}}
          .value=${null!==(l=f.icon_background_position)&&void 0!==l?l:""}
          @value-changed=${t=>this._fieldChanged("icon_background_position",t.detail.value||void 0)}
        ></ha-selector>
        ${"custom"===f.icon_background_position?this._renderCoordFields("icon_background_position_x","icon_background_position_y","X offset","Y offset"):J}
        ${f.icon_background_position?Y`
          <div class="hint">The background shape renders at this position; the icon renders at its own position below with no background behind it.</div>
        `:J}
      </div>

      <!-- ── Icon animation ── -->
      <div class="section">
        <div class="section-label">Icon Animation</div>
        <ha-selector .hass=${this.hass} .label=${"Animation"}
          .selector=${{select:{options:It,mode:"dropdown"}}}
          .value=${null!==(r=f.icon_animation)&&void 0!==r?r:"none"}
          @value-changed=${t=>this._fieldChanged("icon_animation","none"===t.detail.value?void 0:t.detail.value)}
        ></ha-selector>
        ${f.icon_animation&&"none"!==f.icon_animation?Y`
          <div class="two-col">
            <ha-selector .hass=${this.hass} .label=${"When"}
              .selector=${{select:{options:Pt,mode:"dropdown"}}}
              .value=${null!==(d=f.icon_animation_when)&&void 0!==d?d:"always"}
              @value-changed=${t=>this._fieldChanged("icon_animation_when",t.detail.value||void 0)}
            ></ha-selector>
            <ha-selector .hass=${this.hass} .label=${"Speed"}
              .selector=${{select:{options:jt,mode:"dropdown"}}}
              .value=${null!==(c=f.icon_animation_speed)&&void 0!==c?c:"normal"}
              @value-changed=${t=>this._fieldChanged("icon_animation_speed",t.detail.value||void 0)}
            ></ha-selector>
          </div>
        `:J}
      </div>

      <!-- ── Icon position ── -->
      <div class="section">
        <div class="section-label">Icon Position</div>
        <ha-selector .hass=${this.hass} .label=${"Position"}
          .selector=${{select:{options:At,mode:"dropdown"}}}
          .value=${null!==(u=f.icon_position)&&void 0!==u?u:""}
          @value-changed=${t=>this._fieldChanged("icon_position",t.detail.value||void 0)}
        ></ha-selector>
        ${"custom"===f.icon_position?this._renderCoordFields("icon_position_x","icon_position_y","X offset","Y offset"):J}
        <div class="hint">Size fields accept whole numbers (px applied automatically). Coordinate fields accept any CSS value — use <code>%</code> for responsive positioning or <code>px</code> for fixed.</div>
      </div>

      <!-- ── Badge ── -->
      <div class="section">
        <div class="section-label">Badge</div>
        ${this._renderTemplateField("badge_icon","Badge Icon",()=>{var t;return Y`
            <ha-selector .hass=${this.hass} .label=${"Badge Icon (blank to hide)"}
              .selector=${Vt}
              .value=${null!==(t=f.badge_icon)&&void 0!==t?t:""}
              @value-changed=${t=>this._fieldChanged("badge_icon",t.detail.value||void 0)}
            ></ha-selector>
          `})}

        ${this._renderColorField("badge_color","Badge Icon Color")}
        ${this._renderColorField("badge_background_color","Badge Background Color")}

        <div class="two-col">
          ${this._renderNumField("badge_size","Badge Size",8,48,1,18,"px")}
          <ha-selector .hass=${this.hass} .label=${"Opacity"}
            .selector=${Ht} .value=${null!==(h=f.badge_opacity)&&void 0!==h?h:1}
            @value-changed=${t=>this._fieldChanged("badge_opacity",t.detail.value)}
          ></ha-selector>
        </div>

        <ha-selector .hass=${this.hass} .label=${"Badge Position"}
          .selector=${{select:{options:Et,mode:"dropdown"}}}
          .value=${null!==(p=f.badge_position)&&void 0!==p?p:"top-right"}
          @value-changed=${t=>this._fieldChanged("badge_position",t.detail.value||void 0)}
        ></ha-selector>
        ${"custom"===f.badge_position?Y`
          <div class="two-col">
            <ha-selector .hass=${this.hass} .label=${"X (CSS)"} .selector=${{text:{}}}
              .value=${null!==(b=f.badge_position_x)&&void 0!==b?b:""} .placeholder=${"e.g. 10px"}
              @value-changed=${t=>this._fieldChanged("badge_position_x",t.detail.value||void 0)}
            ></ha-selector>
            <ha-selector .hass=${this.hass} .label=${"Y (CSS)"} .selector=${{text:{}}}
              .value=${null!==(v=f.badge_position_y)&&void 0!==v?v:""} .placeholder=${"e.g. 10px"}
              @value-changed=${t=>this._fieldChanged("badge_position_y",t.detail.value||void 0)}
            ></ha-selector>
          </div>
        `:J}

        <ha-selector .hass=${this.hass} .label=${"Badge Animation"}
          .selector=${{select:{options:It,mode:"dropdown"}}}
          .value=${null!==(_=f.badge_animation)&&void 0!==_?_:"none"}
          @value-changed=${t=>this._fieldChanged("badge_animation","none"===t.detail.value?void 0:t.detail.value)}
        ></ha-selector>
        ${f.badge_animation&&"none"!==f.badge_animation?Y`
          <div class="two-col">
            <ha-selector .hass=${this.hass} .label=${"When"}
              .selector=${{select:{options:Pt,mode:"dropdown"}}}
              .value=${null!==(g=f.badge_animation_when)&&void 0!==g?g:"always"}
              @value-changed=${t=>this._fieldChanged("badge_animation_when",t.detail.value||void 0)}
            ></ha-selector>
            <ha-selector .hass=${this.hass} .label=${"Speed"}
              .selector=${{select:{options:jt,mode:"dropdown"}}}
              .value=${null!==(m=f.badge_animation_speed)&&void 0!==m?m:"normal"}
              @value-changed=${t=>this._fieldChanged("badge_animation_speed",t.detail.value||void 0)}
            ></ha-selector>
          </div>
        `:J}
      </div>
    `}_renderCardTab(){var t,e,o,i,n,a,s,l,r,d,c,u;const h=this._config;return Y`
      <!-- ── Background ── -->
      <div class="section">
        <div class="section-label">Background</div>
        ${this._renderColorField("background_color","Background Color",void 0,!1)}
        <ha-selector .hass=${this.hass} .label=${"Opacity"}
          .selector=${Ht} .value=${null!==(t=h.background_opacity)&&void 0!==t?t:1}
          @value-changed=${t=>this._fieldChanged("background_opacity",t.detail.value)}
        ></ha-selector>
        <ha-selector .hass=${this.hass} .label=${"Image URL (or type 'area' to use room picture)"}
          .selector=${{text:{}}} .value=${null!==(e=h.background_image)&&void 0!==e?e:""}
          .placeholder=${"e.g. /local/room.jpg   or   area"}
          @value-changed=${t=>this._fieldChanged("background_image",t.detail.value||void 0)}
        ></ha-selector>

        ${h.background_image?Y`
          <ha-selector .hass=${this.hass} .label=${"Image Position (CSS background-position)"}
            .selector=${{text:{}}} .value=${null!==(o=h.background_image_position)&&void 0!==o?o:""}
            .placeholder=${"e.g. center, top right, 75% 25%"}
            @value-changed=${t=>this._fieldChanged("background_image_position",t.detail.value||void 0)}
          ></ha-selector>
        `:J}
      </div>

      <!-- ── Shape ── -->
      <div class="section">
        <div class="section-label">Shape</div>
        <ha-selector .hass=${this.hass} .label=${"Card Shape"}
          .selector=${{select:{options:Rt,mode:"dropdown"}}}
          .value=${null!==(i=h.card_shape)&&void 0!==i?i:""}
          @value-changed=${t=>this._fieldChanged("card_shape",t.detail.value||void 0)}
        ></ha-selector>
        <ha-selector .hass=${this.hass} .label=${"Custom Border Radius (CSS — overrides shape)"}
          .selector=${{text:{}}}
          .value=${null!==(n=h.card_border_radius)&&void 0!==n?n:""}
          .placeholder=${"e.g. 12px, 50% 0 50% 0, 8px 24px"}
          @value-changed=${t=>this._fieldChanged("card_border_radius",t.detail.value||void 0)}
        ></ha-selector>
        <ha-selector .hass=${this.hass} .label=${"Card Margin (space around card within grid cell)"}
          .selector=${{number:{min:0,max:32,step:1,mode:"box",unit_of_measurement:"px"}}}
          .value=${null!==(a=h.card_margin)&&void 0!==a?a:0}
          @value-changed=${t=>this._fieldChanged("card_margin",t.detail.value||void 0)}
        ></ha-selector>
      </div>

      <!-- ── Hover highlight ── -->
      <div class="section">
        <div class="section-label">Interaction</div>
        <ha-form
          .hass=${this.hass}
          .data=${{hover_highlight:null===(s=h.hover_highlight)||void 0===s||s}}
          .schema=${[{name:"hover_highlight",label:"Show hover highlight (ripple overlay on mouse-over)",selector:{boolean:{}}}]}
          .computeLabel=${t=>t.label}
          @value-changed=${t=>this._fieldChanged("hover_highlight",t.detail.value.hover_highlight)}
        ></ha-form>
        <div class="hint">When enabled, a subtle white overlay appears on hover. Enabled by default when a Global Action is configured.</div>
      </div>

      <!-- ── Border ── -->
      <div class="section">
        <div class="section-label">Border</div>
        ${this._renderColorField("border_color","Border Color",void 0,!1)}
        <ha-selector .hass=${this.hass} .label=${"Opacity"}
          .selector=${Ht} .value=${null!==(l=h.border_opacity)&&void 0!==l?l:1}
          @value-changed=${t=>this._fieldChanged("border_opacity",t.detail.value)}
        ></ha-selector>
      </div>

      <!-- ── Grid sizing ── -->
      <div class="section">
        <div class="section-label">Grid Sizing (Sections Dashboard)</div>
        <div class="two-col">
          <ha-selector .hass=${this.hass} .label=${"Columns"}
            .selector=${{number:{min:1,max:12,step:1,mode:"box"}}}
            .value=${null!==(r=null===(d=h.grid_options)||void 0===d?void 0:d.columns)&&void 0!==r?r:6}
            @value-changed=${t=>this._gridFieldChanged("columns",t.detail.value)}
          ></ha-selector>
          <ha-selector .hass=${this.hass} .label=${"Rows"}
            .selector=${{number:{min:1,max:6,step:1,mode:"box"}}}
            .value=${null!==(c=null===(u=h.grid_options)||void 0===u?void 0:u.rows)&&void 0!==c?c:2}
            @value-changed=${t=>this._gridFieldChanged("rows",t.detail.value)}
          ></ha-selector>
        </div>
      </div>
    `}_renderButtonsTab(){var t,e,o,i,n,a,s,l,r,d;const c=this._config;var u,h,p;if(null===(t=c.sub_button_groups)||void 0===t?void 0:t.length)return Y`
        <div class="section">
          <div class="section-label">Button Groups</div>
          <div class="hint">Each group is an independent set of buttons with its own layout and position. Max 4 groups.</div>
          ${(null!==(u=c.sub_button_groups)&&void 0!==u?u:[]).map((t,e)=>this._renderGroupRow(t,e))}
          ${(null!==(h=null===(p=c.sub_button_groups)||void 0===p?void 0:p.length)&&void 0!==h?h:0)<4?Y`
            <button class="add-btn" @click=${()=>this._addGroup()}>+ Add Group</button>
          `:J}
        </div>
        <div class="section">
          <button class="clear-btn"
            @click=${()=>{confirm("Revert to single-group mode? Only the first group's settings will be kept.")&&this._revertToSingleGroup()}}
          >Revert to Single Group Mode</button>
        </div>
      `;const b=null!==(e=c.sub_buttons_layout)&&void 0!==e?e:"bottom-row";return Y`
      <!-- ── Layout ── -->
      <div class="section">
        <div class="section-label">Layout</div>
        <ha-selector .hass=${this.hass} .label=${"Layout"}
          .selector=${{select:{options:Gt,mode:"dropdown"}}}
          .value=${b}
          @value-changed=${t=>this._fieldChanged("sub_buttons_layout",t.detail.value)}
        ></ha-selector>

        ${"grid"===b?Y`
          <div class="two-col">
            <ha-selector .hass=${this.hass} .label=${"Columns (0 = auto-fill)"}
              .selector=${{number:{min:0,max:8,step:1,mode:"box"}}}
              .value=${null!==(o=c.sub_buttons_grid_columns)&&void 0!==o?o:0}
              @value-changed=${t=>this._fieldChanged("sub_buttons_grid_columns",t.detail.value||void 0)}
            ></ha-selector>
            <ha-selector .hass=${this.hass} .label=${"Cell Min Width"}
              .selector=${{number:{min:32,max:200,step:4,mode:"box",unit_of_measurement:"px"}}}
              .value=${null!==(i=c.sub_buttons_grid_min_width)&&void 0!==i?i:56}
              @value-changed=${t=>this._fieldChanged("sub_buttons_grid_min_width",t.detail.value)}
            ></ha-selector>
          </div>
          <ha-selector .hass=${this.hass} .label=${"Cell Layout"}
            .selector=${{select:{options:Dt,mode:"list"}}}
            .value=${null!==(n=c.sub_buttons_grid_cell_layout)&&void 0!==n?n:"vertical"}
            @value-changed=${t=>this._fieldChanged("sub_buttons_grid_cell_layout",t.detail.value||void 0)}
          ></ha-selector>
        `:J}

        ${"left-column"===b||"right-column"===b?Y`
          <ha-selector .hass=${this.hass} .label=${"Column Alignment"}
            .selector=${{select:{options:Ft,mode:"dropdown"}}}
            .value=${null!==(a=c.sub_buttons_column_justify)&&void 0!==a?a:"top"}
            @value-changed=${t=>this._fieldChanged("sub_buttons_column_justify",t.detail.value||void 0)}
          ></ha-selector>
        `:J}
      </div>

      <!-- ── Global style ── -->
      <div class="section">
        <div class="section-label">Global Button Style</div>
        ${this._renderColorField("sub_button_icon_color","Icon Color (default for all)")}
        ${this._renderColorField("sub_button_background_color","Background Color (default for all)")}
        <div class="two-col">
          <ha-selector .hass=${this.hass} .label=${"Opacity"}
            .selector=${Ht} .value=${null!==(s=c.sub_button_opacity)&&void 0!==s?s:1}
            @value-changed=${t=>this._fieldChanged("sub_button_opacity",t.detail.value)}
          ></ha-selector>
          <ha-selector .hass=${this.hass} .label=${"Button Gap"}
            .selector=${{number:{min:0,max:32,step:1,mode:"box",unit_of_measurement:"px"}}}
            .value=${null!==(l=c.sub_button_gap)&&void 0!==l?l:6}
            @value-changed=${t=>this._fieldChanged("sub_button_gap",t.detail.value)}
          ></ha-selector>
        </div>
        <div class="two-col">
          ${this._renderNumField("sub_button_state_font_size","State Font Size",8,32,1,11,"px")}
          ${this._renderNumField("sub_button_state_font_weight","State Font Weight",100,900,100,500)}
        </div>
        <ha-selector .hass=${this.hass} .label=${"State/Label Max Width (0 = auto)"}
          .selector=${{number:{min:0,max:400,step:1,mode:"box",unit_of_measurement:"px"}}}
          .value=${null!==(r=c.sub_button_text_max_width)&&void 0!==r?r:0}
          @value-changed=${t=>this._fieldChanged("sub_button_text_max_width",t.detail.value||void 0)}
        ></ha-selector>
      </div>

      <!-- ── Individual buttons ── -->
      <div class="section">
        <div class="section-label">Buttons</div>
        ${(null!==(d=c.sub_buttons)&&void 0!==d?d:[]).map((t,e)=>this._renderSubButtonRow(t,e))}
        <button class="add-btn" @click=${this._addSubButton}>+ Add Button</button>
      </div>

      <!-- ── Switch to groups mode ── -->
      <div class="section">
        <div class="hint">Groups mode allows multiple independent button groups with different layouts and positions.</div>
        <button class="clear-btn"
          @click=${()=>this._switchToGroupsMode()}
        >Switch to Groups Mode</button>
      </div>
    `}_renderActionsTab(){var t,e,o,i,n,a;const s=this._config;return Y`
      <div class="section">
        <div class="section-label">Global Action</div>
        <div class="warning-box">
          When a global action is set, all sub-button tap/hold/double-tap actions are disabled.
          Sub-buttons become non-interactive decorations and the entire card is a single tap target.
        </div>

        <ha-selector .hass=${this.hass} .label=${"Tap Action"}
          .selector=${{ui_action:{}}}
          .value=${null!==(t=null===(e=s.global_action)||void 0===e?void 0:e.tap_action)&&void 0!==t?t:{action:"none"}}
          @value-changed=${t=>this._globalActionFieldChanged("tap_action",t.detail.value)}
        ></ha-selector>
        <ha-selector .hass=${this.hass} .label=${"Hold Action"}
          .selector=${{ui_action:{}}}
          .value=${null!==(o=null===(i=s.global_action)||void 0===i?void 0:i.hold_action)&&void 0!==o?o:{action:"none"}}
          @value-changed=${t=>this._globalActionFieldChanged("hold_action",t.detail.value)}
        ></ha-selector>
        <ha-selector .hass=${this.hass} .label=${"Double-Tap Action"}
          .selector=${{ui_action:{}}}
          .value=${null!==(n=null===(a=s.global_action)||void 0===a?void 0:a.double_tap_action)&&void 0!==n?n:{action:"none"}}
          @value-changed=${t=>this._globalActionFieldChanged("double_tap_action",t.detail.value)}
        ></ha-selector>

        <button class="clear-btn"
          @click=${()=>{const t={...this._config};delete t.global_action,this._fireConfigChanged(t)}}
        >Clear Global Action</button>
      </div>
    `}_renderSubButtonRow(t,e){var o,i,n,a,s,l,r,d;const c=this._expandedSubButton===e,u=null!==(o=null!==(i=null!==(n=t.entity)&&void 0!==n?n:t.label)&&void 0!==i?i:t.icon)&&void 0!==o?o:`Sub-button ${e+1}`,h="custom"===(null!==(a=null===(s=this._config)||void 0===s?void 0:s.sub_buttons_layout)&&void 0!==a?a:"bottom-row");return Y`
      <div class="sub-btn-row ${this._dragOverIndex===e?"drag-over":""}"
        @dragstart=${t=>this._onDragStart(t,e)}
        @dragover=${t=>this._onDragOver(t,e)}
        @dragleave=${()=>this._onDragLeave(e)}
        @dragend=${t=>this._onDragEnd(t)}
        @drop=${t=>this._onDrop(t,e)}
      >
        <div class="sub-btn-header"
          @click=${()=>this._expandedSubButton=c?null:e}
        >
          <ha-icon class="drag-handle" icon="mdi:drag-vertical"
            @mousedown=${t=>this._onDragHandleMousedown(t,e)}
          ></ha-icon>
          <ha-icon .icon=${null!==(l=t.icon)&&void 0!==l?l:"mdi:gesture-tap"}></ha-icon>
          <span class="sub-btn-label">${u}</span>
          ${this._renderMoveButtons(e,null!==(r=null===(d=this._config)||void 0===d||null===(d=d.sub_buttons)||void 0===d?void 0:d.length)&&void 0!==r?r:0,(t,e)=>this._moveSubButton(t,e))}
          <ha-icon .icon=${c?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
          <button class="del-btn"
            @click=${t=>{t.stopPropagation(),this._deleteSubButton(e)}}
          ><ha-icon icon="mdi:delete" class="del-icon"></ha-icon></button>
        </div>

        ${c?Y`
          <div class="sub-btn-body">
            ${this._renderButtonBody(t,h,t=>this._subButtonChanged(e,t),(t,o)=>this._subButtonChanged(e,{[t]:o}))}
          </div>
        `:J}
      </div>
    `}_addGroup(){var t,e;const o=[...null!==(t=null===(e=this._config)||void 0===e?void 0:e.sub_button_groups)&&void 0!==t?t:[]];o.length>=4||(o.push({layout:"bottom-row",buttons:[]}),this._fieldChanged("sub_button_groups",o),this._expandedGroup=o.length-1)}_deleteGroup(t){var e,o;const i=[...null!==(e=null===(o=this._config)||void 0===o?void 0:o.sub_button_groups)&&void 0!==e?e:[]];i.splice(t,1),this._fieldChanged("sub_button_groups",i.length?i:void 0),this._expandedGroup===t&&(this._expandedGroup=null)}_moveGroupUp(t){var e,o;if(0===t)return;const i=[...null!==(e=null===(o=this._config)||void 0===o?void 0:o.sub_button_groups)&&void 0!==e?e:[]];[i[t-1],i[t]]=[i[t],i[t-1]],this._fieldChanged("sub_button_groups",i)}_moveGroupDown(t){var e,o;const i=null!==(e=null===(o=this._config)||void 0===o?void 0:o.sub_button_groups)&&void 0!==e?e:[];if(t>=i.length-1)return;const n=[...i];[n[t],n[t+1]]=[n[t+1],n[t]],this._fieldChanged("sub_button_groups",n)}_groupChanged(t,e){var o,i;const n=[...null!==(o=null===(i=this._config)||void 0===i?void 0:i.sub_button_groups)&&void 0!==o?o:[]];n[t]={...n[t],...e},this._fieldChanged("sub_button_groups",n)}_groupButtonChanged(t,e,o){var i,n,a,s;const l=[...null!==(i=null===(n=this._config)||void 0===n?void 0:n.sub_button_groups)&&void 0!==i?i:[]],r=[...null!==(a=null===(s=l[t])||void 0===s?void 0:s.buttons)&&void 0!==a?a:[]];r[e]={...r[e],...o},l[t]={...l[t],buttons:r},this._fieldChanged("sub_button_groups",l)}_addGroupButton(t){var e,o,i,n;const a=[...null!==(e=null===(o=this._config)||void 0===o?void 0:o.sub_button_groups)&&void 0!==e?e:[]],s=[...null!==(i=null===(n=a[t])||void 0===n?void 0:n.buttons)&&void 0!==i?i:[]];s.push({show_icon:!0,show_label:!1,show_state:!1,background:!0,state_based_color:!1,tap_action:{action:"toggle"},hold_action:{action:"more-info"},double_tap_action:{action:"none"}}),a[t]={...a[t],buttons:s},this._fieldChanged("sub_button_groups",a),this._expandedGroupButton={...this._expandedGroupButton,[t]:s.length-1}}_deleteGroupButton(t,e){var o,i,n,a;const s=[...null!==(o=null===(i=this._config)||void 0===i?void 0:i.sub_button_groups)&&void 0!==o?o:[]],l=[...null!==(n=null===(a=s[t])||void 0===a?void 0:a.buttons)&&void 0!==n?n:[]];l.splice(e,1),s[t]={...s[t],buttons:l},this._fieldChanged("sub_button_groups",s),this._expandedGroupButton[t]===e&&(this._expandedGroupButton={...this._expandedGroupButton,[t]:null})}_switchToGroupsMode(){var t,e;const o={...this._config};o.sub_button_groups=[{layout:null!==(t=o.sub_buttons_layout)&&void 0!==t?t:"bottom-row",gap:o.sub_button_gap,grid_columns:o.sub_buttons_grid_columns,grid_min_width:o.sub_buttons_grid_min_width,grid_cell_layout:o.sub_buttons_grid_cell_layout,column_justify:o.sub_buttons_column_justify,icon_color:o.sub_button_icon_color,background_color:o.sub_button_background_color,opacity:o.sub_button_opacity,buttons:null!==(e=o.sub_buttons)&&void 0!==e?e:[]}],delete o.sub_buttons,delete o.sub_buttons_layout,delete o.sub_button_gap,delete o.sub_buttons_grid_columns,delete o.sub_buttons_grid_min_width,delete o.sub_buttons_grid_cell_layout,delete o.sub_buttons_column_justify,delete o.sub_button_icon_color,delete o.sub_button_background_color,delete o.sub_button_opacity,this._fireConfigChanged(o),this._expandedGroup=0}_revertToSingleGroup(){var t,e,o;const i=null!==(t=null===(e=this._config)||void 0===e||null===(e=e.sub_button_groups)||void 0===e?void 0:e[0])&&void 0!==t?t:{},n={...this._config};n.sub_buttons=null!==(o=i.buttons)&&void 0!==o?o:[],i.layout&&(n.sub_buttons_layout=i.layout),void 0!==i.gap&&(n.sub_button_gap=i.gap),void 0!==i.grid_columns&&(n.sub_buttons_grid_columns=i.grid_columns),void 0!==i.grid_min_width&&(n.sub_buttons_grid_min_width=i.grid_min_width),i.grid_cell_layout&&(n.sub_buttons_grid_cell_layout=i.grid_cell_layout),i.column_justify&&(n.sub_buttons_column_justify=i.column_justify),i.icon_color&&(n.sub_button_icon_color=i.icon_color),i.background_color&&(n.sub_button_background_color=i.background_color),void 0!==i.opacity&&(n.sub_button_opacity=i.opacity),delete n.sub_button_groups,this._fireConfigChanged(n)}_onGroupBtnDragHandleMousedown(t,e,o){const i=t.currentTarget.closest(".sub-btn-row");i&&i.setAttribute("draggable","true"),this._dragGroupContext=e,this._dragIndex=o}_onGroupBtnDragStart(t,e,o){var i;null===(i=t.dataTransfer)||void 0===i||i.setData("text/plain",String(o)),t.dataTransfer&&(t.dataTransfer.effectAllowed="move"),this._dragGroupContext=e,this._dragIndex=o}_onGroupBtnDragOver(t,e,o){this._dragGroupContext===e&&null!==this._dragIndex&&this._dragIndex!==o&&(t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="move"),this._dragOverIndex!==o&&(this._dragOverIndex=o))}_onGroupBtnDrop(t,e,o){var i,n,a,s;t.preventDefault();const l=this._dragIndex;if(this._dragGroupContext=null,this._dragIndex=null,this._dragOverIndex=null,null===l||l===o)return;const r=[...null!==(i=null===(n=this._config)||void 0===n?void 0:n.sub_button_groups)&&void 0!==i?i:[]],d=[...null!==(a=null===(s=r[e])||void 0===s?void 0:s.buttons)&&void 0!==a?a:[]],[c]=d.splice(l,1);d.splice(o,0,c),r[e]={...r[e],buttons:d},this._fieldChanged("sub_button_groups",r),this._expandedGroupButton={...this._expandedGroupButton,[e]:null}}_renderGroupButtonRow(t,e,o,i){var n,a,s,l,r,d;const c=this._expandedGroupButton[o]===e,u=null!==(n=null!==(a=null!==(s=t.entity)&&void 0!==s?s:t.label)&&void 0!==a?a:t.icon)&&void 0!==n?n:`Button ${e+1}`,h="custom"===i,p=this._dragGroupContext===o&&this._dragOverIndex===e;return Y`
      <div class="sub-btn-row ${p?"drag-over":""}"
        @dragstart=${t=>this._onGroupBtnDragStart(t,o,e)}
        @dragover=${t=>this._onGroupBtnDragOver(t,o,e)}
        @dragleave=${()=>{this._dragGroupContext===o&&this._dragOverIndex===e&&(this._dragOverIndex=null)}}
        @dragend=${t=>{t.currentTarget.removeAttribute("draggable"),this._dragGroupContext=null,this._dragIndex=null,this._dragOverIndex=null}}
        @drop=${t=>this._onGroupBtnDrop(t,o,e)}
      >
        <div class="sub-btn-header"
          @click=${()=>{const t=this._expandedGroupButton[o];this._expandedGroupButton={...this._expandedGroupButton,[o]:t===e?null:e}}}
        >
          <ha-icon class="drag-handle" icon="mdi:drag-vertical"
            @mousedown=${t=>this._onGroupBtnDragHandleMousedown(t,o,e)}
          ></ha-icon>
          <ha-icon .icon=${null!==(l=t.icon)&&void 0!==l?l:"mdi:gesture-tap"}></ha-icon>
          <span class="sub-btn-label">${u}</span>
          ${this._renderMoveButtons(e,null!==(r=null===(d=this._config)||void 0===d||null===(d=d.sub_button_groups)||void 0===d||null===(d=d[o])||void 0===d||null===(d=d.buttons)||void 0===d?void 0:d.length)&&void 0!==r?r:0,(t,e)=>this._moveGroupButton(o,t,e))}
          <ha-icon .icon=${c?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
          <button class="del-btn"
            @click=${t=>{t.stopPropagation(),this._deleteGroupButton(o,e)}}
          ><ha-icon icon="mdi:delete" class="del-icon"></ha-icon></button>
        </div>
        ${c?Y`
          <div class="sub-btn-body">
            ${this._renderButtonBody(t,h,t=>this._groupButtonChanged(o,e,t),(t,i)=>this._groupButtonChanged(o,e,{[t]:i}))}
          </div>
        `:J}
      </div>
    `}_renderGroupRow(t,e){var o,i,n,a,s,l,r,d,c,u,h,p,b,v,_,g,m;const f=this._config,$=this._expandedGroup===e,x=null!==(o=null===(i=f.sub_button_groups)||void 0===i?void 0:i.length)&&void 0!==o?o:0,y=null!==(n=t.label)&&void 0!==n?n:`Group ${e+1}`,w=null!==(a=t.layout)&&void 0!==a?a:"bottom-row",C="left-column"===w||"right-column"===w,k="grid"===w,S="custom"===t.position;return Y`
      <div class="sub-btn-row">
        <div class="sub-btn-header" @click=${()=>this._expandedGroup=$?null:e}>
          <ha-icon icon="mdi:layers" style="--mdc-icon-size:18px; opacity:0.7; flex-shrink:0;"></ha-icon>
          <span class="sub-btn-label">${y}</span>
          <span class="group-layout-chip">${w}</span>
          <ha-icon .icon=${$?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
          <div style="display:flex; gap:2px; flex-shrink:0;">
            ${e>0?Y`
              <button class="icon-btn" title="Move up"
                @click=${t=>{t.stopPropagation(),this._moveGroupUp(e)}}
              ><ha-icon icon="mdi:arrow-up" style="--mdc-icon-size:14px;"></ha-icon></button>
            `:J}
            ${e<x-1?Y`
              <button class="icon-btn" title="Move down"
                @click=${t=>{t.stopPropagation(),this._moveGroupDown(e)}}
              ><ha-icon icon="mdi:arrow-down" style="--mdc-icon-size:14px;"></ha-icon></button>
            `:J}
            <button class="del-btn"
              @click=${t=>{t.stopPropagation(),this._deleteGroup(e)}}
            ><ha-icon icon="mdi:delete" class="del-icon"></ha-icon></button>
          </div>
        </div>

        ${$?Y`
          <div class="sub-btn-body">
            <ha-selector .hass=${this.hass} .label=${"Group Name (editor label only)"}
              .selector=${{text:{}}} .value=${null!==(s=t.label)&&void 0!==s?s:""}
              @value-changed=${t=>this._groupChanged(e,{label:t.detail.value||void 0})}
            ></ha-selector>

            <div class="sub-group-label">Layout &amp; Position</div>

            <ha-selector .hass=${this.hass} .label=${"Button Layout"}
              .selector=${{select:{options:Gt,mode:"dropdown"}}}
              .value=${w}
              @value-changed=${t=>this._groupChanged(e,{layout:t.detail.value})}
            ></ha-selector>

            <ha-selector .hass=${this.hass} .label=${"Group Position (overrides layout default)"}
              .selector=${{select:{options:Mt,mode:"dropdown"}}}
              .value=${null!==(l=t.position)&&void 0!==l?l:""}
              @value-changed=${t=>this._groupChanged(e,{position:t.detail.value||void 0})}
            ></ha-selector>

            ${S?Y`
              <div class="two-col">
                <ha-selector .hass=${this.hass} .label=${"X (CSS left)"}
                  .selector=${{text:{}}} .value=${null!==(r=t.position_x)&&void 0!==r?r:""}
                  .placeholder=${"e.g. 10px, 25%"}
                  @value-changed=${t=>this._groupChanged(e,{position_x:t.detail.value||void 0})}
                ></ha-selector>
                <ha-selector .hass=${this.hass} .label=${"Y (CSS top)"}
                  .selector=${{text:{}}} .value=${null!==(d=t.position_y)&&void 0!==d?d:""}
                  .placeholder=${"e.g. 10px, 25%"}
                  @value-changed=${t=>this._groupChanged(e,{position_y:t.detail.value||void 0})}
                ></ha-selector>
              </div>
            `:J}

            ${C?Y`
              <ha-selector .hass=${this.hass} .label=${"Column Alignment"}
                .selector=${{select:{options:Ft,mode:"dropdown"}}}
                .value=${null!==(c=t.column_justify)&&void 0!==c?c:"top"}
                @value-changed=${t=>this._groupChanged(e,{column_justify:t.detail.value||void 0})}
              ></ha-selector>
            `:J}

            ${k?Y`
              <div class="two-col">
                <ha-selector .hass=${this.hass} .label=${"Columns (0 = auto-fill)"}
                  .selector=${{number:{min:0,max:8,step:1,mode:"box"}}}
                  .value=${null!==(u=t.grid_columns)&&void 0!==u?u:0}
                  @value-changed=${t=>this._groupChanged(e,{grid_columns:t.detail.value||void 0})}
                ></ha-selector>
                <ha-selector .hass=${this.hass} .label=${"Cell Min Width"}
                  .selector=${{number:{min:32,max:200,step:4,mode:"box",unit_of_measurement:"px"}}}
                  .value=${null!==(h=t.grid_min_width)&&void 0!==h?h:56}
                  @value-changed=${t=>this._groupChanged(e,{grid_min_width:t.detail.value})}
                ></ha-selector>
              </div>
              <ha-selector .hass=${this.hass} .label=${"Cell Layout"}
                .selector=${{select:{options:Dt,mode:"list"}}}
                .value=${null!==(p=t.grid_cell_layout)&&void 0!==p?p:"vertical"}
                @value-changed=${t=>this._groupChanged(e,{grid_cell_layout:t.detail.value||void 0})}
              ></ha-selector>
            `:J}

            <div class="sub-group-label">Group Style</div>
            <div class="two-col">
              <ha-selector .hass=${this.hass} .label=${"Opacity"}
                .selector=${Ht} .value=${null!==(b=t.opacity)&&void 0!==b?b:1}
                @value-changed=${t=>this._groupChanged(e,{opacity:t.detail.value})}
              ></ha-selector>
              <ha-selector .hass=${this.hass} .label=${"Button Gap"}
                .selector=${{number:{min:0,max:32,step:1,mode:"box",unit_of_measurement:"px"}}}
                .value=${null!==(v=t.gap)&&void 0!==v?v:6}
                @value-changed=${t=>this._groupChanged(e,{gap:t.detail.value})}
              ></ha-selector>
            </div>
            ${this._renderButtonColorField(null!==(_=t.icon_color)&&void 0!==_?_:"","Icon Color (default for group)","e.g. #ff9800",t=>this._groupChanged(e,{icon_color:t}))}
            ${this._renderButtonColorField(null!==(g=t.background_color)&&void 0!==g?g:"","Background Color (default for group)","e.g. rgba(255,255,255,0.1)",t=>this._groupChanged(e,{background_color:t}))}

            <div class="sub-group-label">Buttons</div>
            ${(null!==(m=t.buttons)&&void 0!==m?m:[]).map((t,o)=>this._renderGroupButtonRow(t,o,e,w))}
            <button class="add-btn" @click=${()=>this._addGroupButton(e)}>+ Add Button</button>
          </div>
        `:J}
      </div>
    `}render(){return this._loaded&&this._config?Y`
      ${this._renderTabBar()}
      <div class="tab-content">
        ${"basic"===this._activeTab?this._renderBasicTab():J}
        ${"icon"===this._activeTab?this._renderIconTab():J}
        ${"card"===this._activeTab?this._renderCardTab():J}
        ${"buttons"===this._activeTab?this._renderButtonsTab():J}
        ${"actions"===this._activeTab?this._renderActionsTab():J}
      </div>
    `:Y`<div class="loading">Loading editor…</div>`}static get styles(){return d`
      :host { display: block; }

      .loading { padding: 16px; color: var(--secondary-text-color); }

      /* ── Tab bar ── */
      .tab-bar {
        display: flex;
        overflow-x: auto;
        scrollbar-width: none;
        border-bottom: 2px solid var(--divider-color);
        background: var(--card-background-color, #fff);
        padding: 0 4px;
        position: sticky;
        top: 0;
        z-index: 10;
      }

      .tab-bar::-webkit-scrollbar { display: none; }

      .tab {
        flex-shrink: 0;
        padding: 10px 14px;
        border: none;
        background: transparent;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        color: var(--secondary-text-color);
        border-bottom: 2px solid transparent;
        margin-bottom: -2px;
        white-space: nowrap;
        transition: color 0.15s, border-color 0.15s;
      }

      .tab:hover { color: var(--primary-text-color); }

      .tab.active {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
      }

      /* ── Tab content ── */
      .tab-content {
        padding: 0 0 16px;
      }

      /* ── Section ── */
      .section {
        padding: 12px 16px 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-top: 1px solid var(--divider-color);
      }

      .section:first-child { border-top: none; }

      .section-label {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--secondary-text-color);
        padding-bottom: 2px;
      }

      /* ── Layout helpers ── */
      .two-col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        align-items: end;
      }

      .hint {
        font-size: 11px;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }

      .hint code {
        font-family: monospace;
        background: var(--secondary-background-color, #f0f0f0);
        padding: 1px 4px;
        border-radius: 3px;
      }

      /* ── Template field ── */
      .template-row {
        display: flex;
        align-items: flex-start;
        gap: 6px;
      }

      .template-input {
        flex: 1;
        min-width: 0;
        align-self: flex-start; /* shrink to content height; tmpl-btn centers against this */
      }

      /* Center the template toggle button against the input component height */
      .template-row .tmpl-btn {
        align-self: center;
      }

      .template-input textarea {
        width: 100%;
        min-height: 56px;
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--secondary-background-color, #f5f5f5);
        color: var(--primary-text-color);
        font-family: monospace;
        font-size: 12px;
        resize: vertical;
        box-sizing: border-box;
      }

      .tmpl-btn {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        background: transparent;
        color: var(--secondary-text-color);
        flex-shrink: 0;
        transition: background 0.15s, color 0.15s, border-color 0.15s;
      }


      .tmpl-btn:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }

      .tmpl-btn.active {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }

      .tmpl-icon {
        --mdc-icon-size: 16px;
      }

      /* ── Color field: label above, swatch + native input below ── */
      .color-field {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .color-field-label {
        flex: 1;
        font-size: 12px;
        color: var(--secondary-text-color);
        padding-left: 2px;
        line-height: 1;
      }

      .color-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      /* Template-active row inside a color-field (textarea + toggle button) */
      .color-tmpl-row {
        display: flex;
        align-items: flex-start;
        gap: 6px;
      }

      .color-tmpl-row textarea {
        flex: 1;
        min-height: 56px;
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--secondary-background-color, #f5f5f5);
        color: var(--primary-text-color);
        font-family: monospace;
        font-size: 12px;
        resize: vertical;
        box-sizing: border-box;
      }

      .color-tmpl-row .tmpl-btn {
        align-self: flex-start;
        flex-shrink: 0;
      }

      /* Native text input styled to match HA filled-variant text fields.
         flex:1 handles width in color-row; width:100% handles it elsewhere. */
      .color-text-input {
        flex: 1;
        min-width: 0;
        width: 100%;
        height: 48px;
        padding: 0 12px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        border-radius: 4px;
        background: var(--input-fill-color, var(--secondary-background-color, rgba(0,0,0,0.06)));
        color: var(--primary-text-color);
        font-family: inherit;
        font-size: 14px;
        box-sizing: border-box;
        outline: none;
        transition: border-color 0.15s;
      }

      .color-text-input:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-color) 20%, transparent);
      }

      .color-text-input::placeholder {
        color: var(--secondary-text-color);
        opacity: 0.6;
      }

      .color-btn {
        position: relative;
        width: 48px;
        height: 48px;
        border-radius: 8px;
        border: 2px solid var(--divider-color);
        cursor: pointer;
        overflow: hidden;
        display: block;
        flex-shrink: 0;
        transition: border-color 0.15s, box-shadow 0.15s;
      }

      .color-btn:hover {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-color) 25%, transparent);
      }

      /* Checkerboard base (shows for transparent/empty) */
      .color-checker {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(45deg, #ccc 25%, transparent 25%),
          linear-gradient(-45deg, #ccc 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #ccc 75%),
          linear-gradient(-45deg, transparent 75%, #ccc 75%);
        background-size: 8px 8px;
        background-position: 0 0, 0 4px, 4px -4px, -4px 0;
        background-color: #fff;
      }

      /* Actual color fill on top of checkerboard */
      .color-fill {
        position: absolute;
        inset: 0;
        z-index: 1;
      }

      /* Eyedropper icon as affordance hint */
      .color-icon {
        position: absolute;
        bottom: 3px;
        right: 3px;
        z-index: 2;
        --mdc-icon-size: 12px;
        color: rgba(255, 255, 255, 0.95);
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8));
        pointer-events: none;
      }

      /* Transparent native color input covers the whole button */
      .color-native {
        position: absolute;
        inset: 0;
        z-index: 3;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        padding: 0;
        border: none;
      }

      /* ── Warning ── */
      .warning-box {
        background: color-mix(in srgb, var(--warning-color, #ff9800) 15%, transparent);
        border: 1px solid var(--warning-color, #ff9800);
        color: var(--primary-text-color);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        line-height: 1.4;
      }

      /* ── Sub-button accordion ── */
      .sub-btn-row {
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        overflow: hidden;
        transition: border-color 0.15s, box-shadow 0.15s;
      }

      .sub-btn-row.drag-over {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-color) 30%, transparent);
      }

      .sub-btn-row[draggable="true"] {
        opacity: 0.5;
      }

      .sub-btn-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        cursor: pointer;
        background: var(--secondary-background-color, #f5f5f5);
        user-select: none;
      }

      .sub-btn-header:hover { background: var(--primary-background-color, #fff); }

      .drag-handle {
        cursor: grab;
        color: var(--secondary-text-color);
        --mdc-icon-size: 18px;
        flex-shrink: 0;
        opacity: 0.6;
      }

      .drag-handle:active { cursor: grabbing; }

      .sub-btn-label {
        flex: 1;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .sub-btn-body {
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: var(--primary-background-color, #fff);
      }

      .sub-group-label {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--secondary-text-color);
        margin-top: 4px;
        padding-top: 4px;
        border-top: 1px solid var(--divider-color);
      }

      /* ── Buttons ── */
      .del-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        color: var(--error-color, #db4437);
        border: 1px solid var(--error-color, #db4437);
        border-radius: 6px;
        padding: 0;
        cursor: pointer;
        background: transparent;
        flex-shrink: 0;
        transition: background 0.15s;
      }

      .del-btn:hover {
        background: color-mix(in srgb, var(--error-color, #db4437) 15%, transparent);
      }

      .del-icon {
        --mdc-icon-size: 16px;
      }

      .add-btn {
        align-self: flex-start;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 6px 12px;
        font-size: 13px;
        cursor: pointer;
      }

      .clear-btn {
        align-self: flex-start;
        background: transparent;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        padding: 6px 12px;
        font-size: 13px;
        cursor: pointer;
        color: var(--primary-text-color);
      }

      .move-btns {
        display: flex;
        gap: 2px;
        flex-shrink: 0;
      }

      .icon-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        background: transparent;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        color: var(--secondary-text-color);
        padding: 0;
        flex-shrink: 0;
        transition: background 0.15s;
      }

      .icon-btn:hover {
        background: color-mix(in srgb, var(--primary-color) 12%, transparent);
        color: var(--primary-color);
      }

      .group-layout-chip {
        font-size: 11px;
        background: color-mix(in srgb, var(--primary-color) 15%, transparent);
        color: var(--primary-color);
        border-radius: 10px;
        padding: 2px 7px;
        margin-left: 4px;
        font-weight: 500;
        flex-shrink: 0;
      }
    `}};St([mt({attribute:!1})],Wt.prototype,"hass",void 0),St([ft()],Wt.prototype,"_config",void 0),St([ft()],Wt.prototype,"_loaded",void 0),St([ft()],Wt.prototype,"_templateMode",void 0),St([ft()],Wt.prototype,"_expandedSubButton",void 0),St([ft()],Wt.prototype,"_activeTab",void 0),St([ft()],Wt.prototype,"_dragOverIndex",void 0),St([ft()],Wt.prototype,"_expandedGroup",void 0),St([ft()],Wt.prototype,"_expandedGroupButton",void 0),customElements.get("ians-custom-room-card-editor")||customElements.define(`${$t}-editor`,Wt);var qt=["icon","icon_color","icon_background_color","badge_icon","badge_color","badge_background_color","background_color","border_color","title"],Yt=/* @__PURE__ */new Set(["unavailable","unknown","off"]);function Xt(t){const e=t.state;if(Yt.has(e))return!1;switch(t.entity_id.split(".")[0]){case"alarm_control_panel":return"disarmed"!==e;case"alert":return"idle"!==e;case"cover":case"valve":return"closed"!==e;case"device_tracker":case"person":return"not_home"!==e;case"lawn_mower":return"mowing"===e||"error"===e;case"lock":return"locked"!==e;case"media_player":return"standby"!==e;case"vacuum":return!["idle","docked","paused"].includes(e);case"plant":return"problem"===e;case"group":return["on","home","open","locked","problem"].includes(e);case"timer":return"active"===e;case"camera":return"streaming"===e;default:return!0}}var Jt={light:"var(--state-light-active-color, #FDD835)",switch:"var(--state-switch-active-color, #FDD835)",fan:"var(--state-fan-active-color, #26A69A)",media_player:"var(--state-media_player-active-color, #FDD835)",cover:"var(--state-cover-active-color, #FDD835)",lock:"var(--success-color, #4CAF50)",binary_sensor:"var(--state-binary_sensor-active-color, #FDD835)",alarm_control_panel:"var(--error-color, #db4437)",climate:"var(--state-climate-active-color, #FF9800)",vacuum:"var(--state-vacuum-active-color, #26A69A)",humidifier:"var(--state-humidifier-active-color, #2196F3)",water_heater:"var(--state-water_heater-active-color, #FF9800)"},Kt={light:"mdi:lightbulb",switch:"mdi:toggle-switch",sensor:"mdi:eye",binary_sensor:"mdi:radiobox-marked",climate:"mdi:thermostat",cover:"mdi:garage",fan:"mdi:fan",media_player:"mdi:cast",lock:"mdi:lock",vacuum:"mdi:robot-vacuum",camera:"mdi:camera",person:"mdi:account",device_tracker:"mdi:map-marker",weather:"mdi:weather-partly-cloudy",script:"mdi:script-text",automation:"mdi:robot",scene:"mdi:palette",input_boolean:"mdi:toggle-switch-outline",input_number:"mdi:numeric",input_select:"mdi:form-select",number:"mdi:numeric",select:"mdi:form-select",button:"mdi:gesture-tap-button",water_heater:"mdi:water-boiler",alarm_control_panel:"mdi:shield-home"},Zt={top:"flex-start",center:"center",bottom:"flex-end","space-between":"space-between","space-around":"space-around"},Qt={circle:"50%","rounded-rect":"8px",squircle:"30%",square:"0"},te={square:"0","rounded-sm":"8px",rounded:"12px","rounded-lg":"24px",pill:"999px"},ee={spin:{slow:"4s",normal:"2s",fast:"0.8s"},pulse:{slow:"3s",normal:"1.5s",fast:"0.6s"},blink:{slow:"2.4s",normal:"1.2s",fast:"0.5s"},bounce:{slow:"1.6s",normal:"0.8s",fast:"0.35s"},shake:{slow:"1.2s",normal:"0.6s",fast:"0.25s"}},oe=["top-left","top-right","bottom-left","bottom-right"],ie=/* @__PURE__ */new Map;function ne(t){return JSON.stringify(t)}var ae=class t extends bt{constructor(...t){super(...t),this._templateResults={},this._templateErrors={},this._templateUnsubs=/* @__PURE__ */new Map,this._subTemplateResults={},this._subTemplateUnsubs=/* @__PURE__ */new Map,this._subButtonCleanups=[],this._templateGen=0,this._subTemplateGen=0,this._watchedEntities=[]}static getStubConfig(t){if(t){const i=Object.keys(t.states).find(t=>t.startsWith("light."));var e,o;if(i)return{type:`custom:${$t}`,entity:i,title:null!==(e=null===(o=t.states[i])||void 0===o?void 0:o.attributes.friendly_name)&&void 0!==e?e:"Room",icon:"mdi:lightbulb"}}return{type:`custom:${$t}`,title:"Room",icon:"mdi:home"}}static getGridOptions(t){var e,o,i,n,a;const s=null!==(e=null==t?void 0:t.grid_options)&&void 0!==e?e:{};return{columns:null!==(o=s.columns)&&void 0!==o?o:6,rows:null!==(i=s.rows)&&void 0!==i?i:2,min_columns:null!==(n=s.min_columns)&&void 0!==n?n:3,min_rows:null!==(a=s.min_rows)&&void 0!==a?a:1,...void 0!==s.max_columns&&{max_columns:s.max_columns},...void 0!==s.max_rows&&{max_rows:s.max_rows}}}getGridOptions(){return t.getGridOptions(this._config)}static getConfigElement(){return document.createElement(`${$t}-editor`)}getCardSize(){var t,e;return null!==(t=null===(e=this._config)||void 0===e||null===(e=e.grid_options)||void 0===e?void 0:e.rows)&&void 0!==t?t:2}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config=t,this._watchedEntities=this._collectEntities(t)}_collectEntities(t){var e,o;const i=/* @__PURE__ */new Set;t.entity&&i.add(t.entity);const n=(null===(e=t.sub_button_groups)||void 0===e?void 0:e.length)?t.sub_button_groups.flatMap(t=>{var e;return null!==(e=t.buttons)&&void 0!==e?e:[]}):null!==(o=t.sub_buttons)&&void 0!==o?o:[];for(const a of n)a.entity&&i.add(a.entity);return[...i]}shouldUpdate(t){if(!t.has("hass")||t.size>1)return!0;const e=t.get("hass");return!e||!this.hass||e.themes!==this.hass.themes||e.locale!==this.hass.locale||e.formatEntityState!==this.hass.formatEntityState||e.entities!==this.hass.entities||e.devices!==this.hass.devices||e.areas!==this.hass.areas||this._watchedEntities.some(t=>e.states[t]!==this.hass.states[t])}connectedCallback(){if(super.connectedCallback(),this._config){const t=ie.get(ne(this._config));t&&(this._templateResults={...t})}this.hasUpdated&&(this._config&&this.hass&&(this._subscribeTemplates(),this._subscribeSubButtonTemplates()),this._config&&(this._setupCardActionHandler(),this._setupSubButtonHandlers()))}firstUpdated(){this._setupCardActionHandler()}disconnectedCallback(){var t;if(super.disconnectedCallback(),this._config&&Object.keys(this._templateResults).length>0){const t=ne(this._config);ie.set(t,{...this._templateResults}),window.setTimeout(()=>ie.delete(t),2e3)}this._templateGen++,this._subTemplateGen++,this._unsubscribeTemplates(),this._unsubscribeSubButtonTemplates(),null===(t=this._cardActionCleanup)||void 0===t||t.call(this),this._cardActionCleanup=void 0,this._cleanupSubButtonHandlers()}updated(t){super.updated(t);const e=t.has("_config"),o=t.has("_templateResults"),i=t.has("hass"),n=i&&void 0===t.get("hass");(e||n)&&(this._subscribeTemplates(),this._subscribeSubButtonTemplates()),e&&this._setupCardActionHandler(),(e||o||t.has("_subTemplateResults")||i)&&this._applyConfigStyles(),e&&this._setupSubButtonHandlers()}async _subscribeTemplates(){var t,e;const o=++this._templateGen;if(await this._unsubscribeTemplates(),o!==this._templateGen)return;const i=this._config;if(!i||!this.hass)return;const n={...this._templateResults};for(const l of qt){const t=i[l];t&&yt(t)||delete n[l]}this._templateResults=n;const a={config:i,user:null!==(t=null===(e=this.hass.user)||void 0===e?void 0:e.name)&&void 0!==t?t:"",entity:i.entity},s=qt.filter(t=>{const e=i[t];return!!e&&yt(e)});await Promise.all(s.map(async t=>{const e=i[t];try{const i=await wt(this.hass,e,a,e=>{if(o===this._templateGen&&(this._templateResults={...this._templateResults,[t]:e},t in this._templateErrors)){const e={...this._templateErrors};delete e[t],this._templateErrors=e}},e=>{o===this._templateGen&&(console.warn(`[ians-room-card] Template error in ${t}:`,e),this._templateErrors={...this._templateErrors,[t]:e})});if(o!==this._templateGen)return void i().catch(()=>{});this._templateUnsubs.set(t,i)}catch(E){if(o!==this._templateGen)return;console.error(`[ians-room-card] Failed to subscribe template for ${t}:`,E),this._templateErrors={...this._templateErrors,[t]:String(E)}}}))}async _unsubscribeTemplates(){const t=[...this._templateUnsubs.values()];this._templateUnsubs.clear(),this._templateErrors={};for(const o of t)try{await o()}catch(e){}}async _subscribeSubButtonTemplates(){var t,e,o;const i=++this._subTemplateGen;if(await this._unsubscribeSubButtonTemplates(),i!==this._subTemplateGen)return;const n=this._config;if(!n||!this.hass)return;const a={config:n,user:null!==(t=null===(e=this.hass.user)||void 0===e?void 0:e.name)&&void 0!==t?t:""},s=[],l=(t,e)=>{for(const[o,i]of t.entries())for(const t of["icon","label"]){const n=i[t];n&&yt(n)&&s.push({key:`${e}sub_${o}_${t}`,template:n,entity:i.entity})}};if(null===(o=n.sub_button_groups)||void 0===o?void 0:o.length)for(const[u,h]of n.sub_button_groups.slice(0,4).entries()){var r;l(null!==(r=h.buttons)&&void 0!==r?r:[],`g${u}_`)}else n.sub_buttons&&l(n.sub_buttons,"");const d=new Set(s.map(t=>t.key)),c={};for(const[u,h]of Object.entries(this._subTemplateResults))d.has(u)&&(c[u]=h);this._subTemplateResults=c,await Promise.all(s.map(async({key:t,template:e,entity:o})=>{try{const n=await wt(this.hass,e,{...a,entity:o},e=>{i===this._subTemplateGen&&(this._subTemplateResults={...this._subTemplateResults,[t]:e})});if(i!==this._subTemplateGen)return void n().catch(()=>{});this._subTemplateUnsubs.set(t,n)}catch(E){console.warn(`[ians-room-card] Sub-button template error (${t}):`,E)}}))}async _unsubscribeSubButtonTemplates(){const t=[...this._subTemplateUnsubs.values()];this._subTemplateUnsubs.clear();for(const o of t)try{await o()}catch(e){}}_applyConfigStyles(){var t;const e=this._config;if(!e)return;const o=(t,e)=>{var o;return null!==(o=this._templateResults[t])&&void 0!==o?o:e};this._setCSSVar("--ians-card-margin",void 0!==e.card_margin?`${e.card_margin}px`:void 0),this._setCSSVar("--ians-card-background-color",o("background_color",e.background_color)),this._setCSSVar("--ians-card-background-opacity",void 0!==e.background_opacity?String(e.background_opacity):void 0),this._setCSSVar("--ians-card-border-color",o("border_color",e.border_color)),this._setCSSVar("--ians-card-border-opacity",void 0!==e.border_opacity?String(e.border_opacity):void 0);const i=e.card_border_radius||(e.card_shape?te[e.card_shape]:void 0);this._setCSSVar("--ians-card-border-radius",i),this._setCSSVar("--ha-card-border-radius",i);let n=o("icon_color",e.icon_color);if(e.state_based_color&&e.entity&&this.hass){const t=this.hass.states[e.entity],o=e.entity.split(".")[0];var a,s,l;t&&(n=Xt(t)?null!==(a=null!==(s=e.icon_color_on)&&void 0!==s?s:Jt[o])&&void 0!==a?a:n:null!==(l=e.icon_color_off)&&void 0!==l?l:n)}this._setCSSVar("--ians-icon-color",n),this._setCSSVar("--ians-icon-opacity",void 0!==e.icon_opacity?String(e.icon_opacity):void 0),this._setCSSVar("--ians-icon-background-color",o("icon_background_color",e.icon_background_color)),this._setCSSVar("--ians-icon-background-opacity",void 0!==e.icon_background_opacity?String(e.icon_background_opacity):void 0),this._setCSSVar("--ians-icon-background-size",void 0!==e.icon_background_size?`${e.icon_background_size}px`:void 0),this._setCSSVar("--ians-icon-background-width",void 0!==e.icon_background_width?`${e.icon_background_width}px`:void 0),this._setCSSVar("--ians-icon-background-height",void 0!==e.icon_background_height?`${e.icon_background_height}px`:void 0);const r=e.icon_background_border_radius||(e.icon_background_shape?Qt[e.icon_background_shape]:void 0);if(this._setCSSVar("--ians-icon-background-border-radius",r),this._setCSSVar("--ians-icon-size",void 0!==e.icon_size?`${e.icon_size}px`:void 0),this._setCSSVar("--ians-badge-color",o("badge_color",e.badge_color)),this._setCSSVar("--ians-badge-background-color",o("badge_background_color",e.badge_background_color)),this._setCSSVar("--ians-badge-size",void 0!==e.badge_size?`${e.badge_size}px`:void 0),this._setCSSVar("--ians-badge-opacity",void 0!==e.badge_opacity?String(e.badge_opacity):void 0),this._setCSSVar("--ians-title-color",e.title_color),this._setCSSVar("--ians-title-font-size",void 0!==e.title_font_size?`${e.title_font_size}px`:void 0),this._setCSSVar("--ians-title-font-weight",void 0!==e.title_font_weight?String(e.title_font_weight):void 0),this._setCSSVar("--ians-title-align",e.title_align),this._setCSSVar("--ians-sub-button-icon-color",e.sub_button_icon_color),this._setCSSVar("--ians-sub-button-background-color",e.sub_button_background_color),this._setCSSVar("--ians-sub-button-opacity",void 0!==e.sub_button_opacity?String(e.sub_button_opacity):void 0),this._setCSSVar("--ians-sub-button-gap",void 0!==e.sub_button_gap?`${e.sub_button_gap}px`:void 0),this._setCSSVar("--ians-sub-button-state-font-size",void 0!==e.sub_button_state_font_size?`${e.sub_button_state_font_size}px`:void 0),this._setCSSVar("--ians-sub-button-state-font-weight",void 0!==e.sub_button_state_font_weight?String(e.sub_button_state_font_weight):void 0),this._setCSSVar("--ians-sub-button-text-max-width",void 0!==e.sub_button_text_max_width?`${e.sub_button_text_max_width}px`:void 0),null===(t=e.sub_button_groups)||void 0===t?void 0:t.length)this.style.removeProperty("--ians-sub-buttons-grid-template-columns"),this.style.removeProperty("--ians-sub-buttons-column-justify");else if("grid"===e.sub_buttons_layout?e.sub_buttons_grid_columns?this._setCSSVar("--ians-sub-buttons-grid-template-columns",`repeat(${e.sub_buttons_grid_columns}, 1fr)`):e.sub_buttons_grid_min_width?this._setCSSVar("--ians-sub-buttons-grid-template-columns",`repeat(auto-fill, minmax(${e.sub_buttons_grid_min_width}px, 1fr))`):this.style.removeProperty("--ians-sub-buttons-grid-template-columns"):this.style.removeProperty("--ians-sub-buttons-grid-template-columns"),"left-column"===e.sub_buttons_layout||"right-column"===e.sub_buttons_layout){const t=e.sub_buttons_column_justify?Zt[e.sub_buttons_column_justify]:void 0;this._setCSSVar("--ians-sub-buttons-column-justify",t)}else this.style.removeProperty("--ians-sub-buttons-column-justify")}_setupSubButtonHandlers(){var t,e,o;this._cleanupSubButtonHandlers();const i=this._config;if(!i||i.global_action)return;const n=!!(null===(t=i.sub_button_groups)||void 0===t?void 0:t.length);if(!n&&!(null===(e=i.sub_buttons)||void 0===e?void 0:e.length))return;const a=null===(o=this.shadowRoot)||void 0===o?void 0:o.querySelectorAll(".sub-button");a&&a.forEach((t,e)=>{var o,a,s;let l;if(n){var r,d,c;const e=parseInt(null!==(r=t.dataset.group)&&void 0!==r?r:"0"),o=parseInt(null!==(d=t.dataset.index)&&void 0!==d?d:"0");l=null===(c=i.sub_button_groups)||void 0===c||null===(c=c[e])||void 0===c||null===(c=c.buttons)||void 0===c?void 0:c[o]}else{var u;l=null===(u=i.sub_buttons)||void 0===u?void 0:u[e]}if(!l)return;const h={entity:l.entity,tap_action:null!==(o=l.tap_action)&&void 0!==o?o:{action:"more-info"},hold_action:null!==(a=l.hold_action)&&void 0!==a?a:{action:"more-info"},double_tap_action:null!==(s=l.double_tap_action)&&void 0!==s?s:{action:"none"}},p=kt(t,h,e=>Ct(t,h,e));this._subButtonCleanups.push(p)})}_cleanupSubButtonHandlers(){for(const t of this._subButtonCleanups)t();this._subButtonCleanups=[]}_setupCardActionHandler(){var t,e;null===(t=this._cardActionCleanup)||void 0===t||t.call(this),this._cardActionCleanup=void 0;const o=this._config;if(!(null==o?void 0:o.global_action))return;const i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("ha-card");if(!i)return;const n={entity:o.entity,tap_action:o.global_action.tap_action,hold_action:o.global_action.hold_action,double_tap_action:o.global_action.double_tap_action};this._cardActionCleanup=kt(i,n,t=>Ct(i,n,t))}_getAnimClass(t,e,o){if(!t||"none"===t)return"";const i=null!=e?e:"always";if("always"!==i&&o){const t=Xt(o);if("active"===i&&!t)return"";if("inactive"===i&&t)return""}return`anim-${t}`}_getAnimDur(t,e){var o,i;if(t&&"none"!==t)return null!==(o=null===(i=ee[t])||void 0===i?void 0:i[null!=e?e:"normal"])&&void 0!==o?o:"2s"}_setCSSVar(t,e){void 0!==e&&""!==e?this.style.setProperty(t,e):this.style.removeProperty(t)}render(){var t,e,o,i,n,a,s,l,r,d,c,u,h;if(!this._config)return J;const p=this._config,b=Object.keys(this._templateErrors).length>0,v=!!p.global_action,_=null!==(t=this._templateResults.icon)&&void 0!==t?t:p.icon,g=null!==(e=this._templateResults.badge_icon)&&void 0!==e?e:p.badge_icon,m=this._resolveTitle(),f=!!p.title;let $;"area"===p.background_image?$=this.hass?function(t,e){var o,i,n,a;if(!e)return;const s=null===(o=t.entities)||void 0===o?void 0:o[e],l=null!==(i=null==s?void 0:s.area_id)&&void 0!==i?i:(null==s?void 0:s.device_id)?null===(n=t.devices)||void 0===n||null===(n=n[s.device_id])||void 0===n?void 0:n.area_id:void 0;if(!l)return;const r=null===(a=t.areas)||void 0===a?void 0:a[l];return(null==r?void 0:r.picture)?r.picture:void 0}(this.hass,p.entity):void 0:p.background_image&&($=p.background_image);const x=$?`background-image: url('${$}'); background-position: ${null!==(o=p.background_image_position)&&void 0!==o?o:"center"};`:"",y=p.icon_position,w=p.icon_background_position,C=!!w,k=null!==(i=p.badge_position)&&void 0!==i?i:"top-right",S=p.title_position,A=v?!1!==p.hover_highlight:!0===p.hover_highlight,B=p.entity?null===(n=this.hass)||void 0===n?void 0:n.states[p.entity]:void 0,T=this._getAnimClass(p.icon_animation,p.icon_animation_when,B),E=this._getAnimDur(p.icon_animation,p.icon_animation_speed),z=this._getAnimClass(p.badge_animation,p.badge_animation_when,B),R=this._getAnimDur(p.badge_animation,p.badge_animation_speed),G=["custom"===y?`top: ${null!==(a=p.icon_position_y)&&void 0!==a?a:"auto"}; left: ${null!==(s=p.icon_position_x)&&void 0!==s?s:"auto"}`:"",E?`--ians-anim-dur: ${E}`:""].filter(Boolean).join("; "),O=["custom"===k?`top: ${null!==(l=p.badge_position_y)&&void 0!==l?l:"auto"}; left: ${null!==(r=p.badge_position_x)&&void 0!==r?r:"auto"}`:"",R?`--ians-anim-dur: ${R}`:""].filter(Boolean).join("; "),I=g?Y`
          <div
            part="badge"
            class=${["badge","custom"!==k?`badge-pos-${k}`:""].filter(Boolean).join(" ")}
            style=${O||J}
          >
            <ha-icon part="badge-icon" .icon=${g} class=${z||J}></ha-icon>
          </div>
        `:J,P=C?Y`
          <div
            class=${["icon-bg-only","icon-absolute","custom"!==w?`icon-pos-${w}`:""].filter(Boolean).join(" ")}
            style=${"custom"===w?`top: ${null!==(d=p.icon_background_position_y)&&void 0!==d?d:"auto"}; left: ${null!==(c=p.icon_background_position_x)&&void 0!==c?c:"auto"};`:""}
          ></div>
        `:J,j=void 0!==_?y?Y`
              <div
                part="icon-container"
                class=${["icon-container","icon-absolute",C?"icon-no-bg":"","custom"!==y?`icon-pos-${y}`:""].filter(Boolean).join(" ")}
                style=${G||J}
              >
                <ha-icon part="icon" .icon=${_} class=${T||J}></ha-icon>
                ${I}
              </div>
            `:Y`
              <div
                part="icon-container"
                class=${["icon-container",C?"icon-no-bg":""].filter(Boolean).join(" ")}
                style=${G||J}
              >
                <ha-icon part="icon" .icon=${_} class=${T||J}></ha-icon>
                ${I}
              </div>
            `:J,F=f&&S?Y`
          <span
            part="title"
            class=${["card-title-absolute","custom"!==S?`card-title-abs-${S}`:"",m?"":"pending"].filter(Boolean).join(" ")}
            style=${"custom"===S?`top: ${null!==(u=p.title_position_y)&&void 0!==u?u:"auto"}; left: ${null!==(h=p.title_position_x)&&void 0!==h?h:"auto"};`:""}
          >${null!=m?m:""}</span>`:J;return Y`
      <ha-card
        part="card"
        class=${[b?"has-template-error":"",v?"interactive":"",A?"highlight-on-hover":""].filter(Boolean).join(" ")}
        role=${v?"button":J}
        tabindex=${v?"0":J}
        aria-label=${v&&m?m:J}
      >
        <div part="background" class="card-background-color"></div>
        ${x?Y`<div class="card-background-image" style=${x}></div>`:J}
        ${A?Y`<div class="hover-ripple"></div>`:J}

        <!-- Independent icon background (before card-inner so it's below content) -->
        ${P}

        <!-- Absolutely positioned icon — z-index 2, BEFORE card-inner so card-inner (same z-index, later in DOM) renders on top -->
        ${y?j:J}

        <div class="card-inner">
          <div part="header" class="card-header">
            ${y?!f||S||"top-left"!==y&&"center-left"!==y&&"bottom-left"!==y?J:Y`<div class="icon-spacer"></div>`:j}
            ${f&&!S?Y`<span part="title" class=${["card-title",m?"":"pending"].filter(Boolean).join(" ")}>${null!=m?m:""}</span>`:J}
          </div>

          ${b?Y`
                <div class="template-error">
                  <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                  <span>Template error — check browser console</span>
                </div>
              `:J}

          ${this._renderSubButtons()}
        </div>

        <!-- Absolute title — rendered after card-inner so it paints on top -->
        ${F}
      </ha-card>
    `}_renderSubButtons(){var t,e,o;const i=this._config;if(!i)return J;if(null===(t=i.sub_button_groups)||void 0===t?void 0:t.length)return i.sub_button_groups.slice(0,4).map((t,e)=>this._renderGroup(t,e));if(!(null===(e=i.sub_buttons)||void 0===e?void 0:e.length))return J;const n=null!==(o=i.sub_buttons_layout)&&void 0!==o?o:"bottom-row",a=!!i.global_action,s=i.sub_buttons.map((t,e)=>this._renderSingleButton(t,e,null,n,a)),l=["sub-buttons",`layout-${n}`,"grid"===n&&"horizontal"===i.sub_buttons_grid_cell_layout?"grid-horizontal":""].filter(Boolean).join(" ");return Y`<div part="sub-buttons" class=${l}>${s}</div>`}_deriveGroupPosition(t){switch(t){case"top-row":return"top-row";case"left-column":return"left-column";case"right-column":return"right-column";case"corners":case"custom":return"full";default:return"bottom-row"}}_renderGroup(t,e){var o,i,n,a,s,l;const r=this._config,d=null!==(o=t.layout)&&void 0!==o?o:"bottom-row",c=!!r.global_action,u="left-column"===d||"right-column"===d,h="grid"===d,p=null!==(i=t.position)&&void 0!==i?i:this._deriveGroupPosition(d),b=["custom"===p?`top: ${null!==(n=t.position_y)&&void 0!==n?n:"auto"}; left: ${null!==(a=t.position_x)&&void 0!==a?a:"auto"}`:"",void 0!==t.gap?`--ians-sub-button-gap: ${t.gap}px`:"",t.icon_color?`--ians-sub-button-icon-color: ${t.icon_color}`:"",t.background_color?`--ians-sub-button-background-color: ${t.background_color}`:"",void 0!==t.opacity?`opacity: ${t.opacity}`:"",u&&t.column_justify?`--ians-sub-buttons-column-justify: ${null!==(s=Zt[t.column_justify])&&void 0!==s?s:"flex-start"}`:"",h&&t.grid_columns?`--ians-sub-buttons-grid-template-columns: repeat(${t.grid_columns}, 1fr)`:h&&t.grid_min_width?`--ians-sub-buttons-grid-template-columns: repeat(auto-fill, minmax(${t.grid_min_width}px, 1fr))`:""].filter(Boolean).join("; "),v=["sub-button-group",`group-pos-${p}`,h?"group-layout-grid":"",h&&"horizontal"===t.grid_cell_layout?"grid-horizontal":""].filter(Boolean).join(" "),_=(null!==(l=t.buttons)&&void 0!==l?l:[]).map((t,o)=>this._renderSingleButton(t,o,e,d,c));return Y`<div class=${v} part="sub-button-group" style=${b||J}>${_}</div>`}_renderSingleButton(t,e,o,i,n){var a,s,l,r,d,c,u,h,p,b,v,_;const g=t.entity?null===(a=this.hass)||void 0===a?void 0:a.states[t.entity]:void 0,m=null!==(s=null===(l=t.entity)||void 0===l?void 0:l.split(".")[0])&&void 0!==s?s:"",f=m&&null!==(r=Kt[m])&&void 0!==r?r:"mdi:circle",$=null!==o?`g${o}_sub_${e}`:`sub_${e}`,x=null!==(d=this._subTemplateResults[`${$}_icon`])&&void 0!==d?d:t.icon,y=!x&&!!g&&!!customElements.get("ha-state-icon"),w=null!==(c=null!=x?x:null==g?void 0:g.attributes.icon)&&void 0!==c?c:f;let C;var k,S;void 0!==t.label&&(C="entity"===t.label&&g?null!==(k=g.attributes.friendly_name)&&void 0!==k?k:t.entity:null!==(S=this._subTemplateResults[`${$}_label`])&&void 0!==S?S:t.label);let A="";var B;"corners"===i?A=`pos-${null!==(B=oe[e])&&void 0!==B?B:"bottom-right"}`:"custom"===i&&t.position&&(A=`pos-${t.position}`);const T=["sub-button",!1!==t.background?"has-background":"",n?"display-only":"",A].filter(Boolean).join(" ");let E=t.icon_color;var z,R,G;t.state_based_color&&g&&(E=Xt(g)?null!==(z=null!==(R=t.icon_color_on)&&void 0!==R?R:Jt[m])&&void 0!==z?z:t.icon_color:null!==(G=t.icon_color_off)&&void 0!==G?G:t.icon_color);const O=this._getAnimClass(t.animation,t.animation_when,g),I=this._getAnimDur(t.animation,t.animation_speed),P=g?null!==(u=null===(h=(p=this.hass).formatEntityState)||void 0===h?void 0:h.call(p,g))&&void 0!==u?u:`${g.state}${g.attributes.unit_of_measurement?` ${g.attributes.unit_of_measurement}`:""}`:"",j=null!==(b=null!==(v=null!==(_=C)&&void 0!==_?_:null==g?void 0:g.attributes.friendly_name)&&void 0!==v?v:t.entity)&&void 0!==b?b:x,F=[E?`--ians-sub-button-icon-color: ${E}`:"",t.background_color?`--ians-sub-button-background-color: ${t.background_color}`:"",void 0!==t.opacity?`opacity: ${t.opacity}`:"",I?`--ians-anim-dur: ${I}`:"",void 0!==t.state_font_size?`--ians-sub-button-state-font-size: ${t.state_font_size}px`:"",void 0!==t.state_font_weight?`--ians-sub-button-state-font-weight: ${t.state_font_weight}`:"",void 0!==t.text_max_width?`--ians-sub-button-text-max-width: ${t.text_max_width}px`:""].filter(Boolean).join("; ");return Y`
      <div class=${T} part="sub-button" style=${F||J}
        data-index=${String(e)}
        data-group=${null!==o?String(o):J}
        role=${n?J:"button"}
        tabindex=${n?J:"0"}
        aria-label=${!n&&j?j:J}
      >
        ${!1!==t.show_icon?y?Y`<ha-state-icon part="sub-button-icon" .hass=${this.hass} .stateObj=${g} class=${O||J}></ha-state-icon>`:Y`<ha-icon part="sub-button-icon" .icon=${w} class=${O||J}></ha-icon>`:J}
        ${t.show_label&&C?Y`<span part="sub-button-label" class="sub-button-label">${C}</span>`:J}
        ${t.show_state&&g?Y`<span part="sub-button-state" class="sub-button-state">${P}</span>`:J}
      </div>
    `}_resolveTitle(){const t=this._config;if(t){if(this._templateResults.title)return this._templateResults.title;var e,o;if(t.title&&!yt(t.title))return"entity"===t.title&&t.entity&&this.hass?null!==(e=null===(o=this.hass.states[t.entity])||void 0===o?void 0:o.attributes.friendly_name)&&void 0!==e?e:t.entity:t.title}}static get styles(){return xt}};St([mt({attribute:!1})],ae.prototype,"hass",void 0),St([ft()],ae.prototype,"_config",void 0),St([ft()],ae.prototype,"_templateResults",void 0),St([ft()],ae.prototype,"_templateErrors",void 0),St([ft()],ae.prototype,"_subTemplateResults",void 0),customElements.get("ians-custom-room-card")||(customElements.define($t,ae),console.info("%c IANS-CUSTOM-ROOM-CARD %c v0.3.1 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;")),window.customCards=window.customCards||[],window.customCards.some(t=>"ians-custom-room-card"===t.type)||window.customCards.push({type:$t,name:"Ian's Custom Room Card",description:"A highly customizable room card with icon, badge, sub-button groups, animations, templates, and more",preview:!1,documentationURL:"https://github.com/linkian19/ha-ians-custom-room-card"});export{ae as IansCustomRoomCard};