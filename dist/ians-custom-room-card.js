/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a, _b, _c, _d, _e, _f;
const t$2 = globalThis, e$2 = t$2.ShadowRoot && (void 0 === t$2.ShadyCSS || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$4 = /* @__PURE__ */ new WeakMap();
let n$3 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$2 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$4.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$4.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$4 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s$2), i$3 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$3(o2, t2, s$2);
}, S$1 = (s2, o2) => {
  if (e$2) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$2.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$2 = e$2 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$4(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$2, defineProperty: e$1, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$3, getOwnPropertySymbols: o$3, getPrototypeOf: n$2 } = Object, a$1 = globalThis, c$1 = a$1.trustedTypes, l$1 = c$1 ? c$1.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i2 = t2;
  switch (s2) {
    case Boolean:
      i2 = null !== t2;
      break;
    case Number:
      i2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(t2);
      } catch (t3) {
        i2 = null;
      }
  }
  return i2;
} }, f$1 = (t2, s2) => !i$2(t2, s2), b$1 = { attribute: true, type: String, converter: u$1, reflect: false, useDefault: false, hasChanged: f$1 };
(_a = Symbol.metadata) != null ? _a : Symbol.metadata = Symbol("metadata"), (_b = a$1.litPropertyMetadata) != null ? _b : a$1.litPropertyMetadata = /* @__PURE__ */ new WeakMap();
let y$1 = class y extends HTMLElement {
  static addInitializer(t2) {
    var _a2;
    this._$Ei(), ((_a2 = this.l) != null ? _a2 : this.l = []).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = b$1) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i2 = Symbol(), h2 = this.getPropertyDescriptor(t2, i2, s2);
      void 0 !== h2 && e$1(this.prototype, t2, h2);
    }
  }
  static getPropertyDescriptor(t2, s2, i2) {
    var _a2;
    const { get: e2, set: r2 } = (_a2 = h$1(this.prototype, t2)) != null ? _a2 : { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const h2 = e2 == null ? void 0 : e2.call(this);
      r2 == null ? void 0 : r2.call(this, s3), this.requestUpdate(t2, h2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    var _a2;
    return (_a2 = this.elementProperties.get(t2)) != null ? _a2 : b$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t2 = n$2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...r$3(t3), ...o$3(t3)];
      for (const i2 of s2) this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i2] of s2) this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i2 = this._$Eu(t3, s2);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i2 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i2.unshift(c$2(s3));
    } else void 0 !== s2 && i2.push(c$2(s2));
    return i2;
  }
  static _$Eu(t2, s2) {
    const i2 = s2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a2;
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach((t2) => t2(this));
  }
  addController(t2) {
    var _a2, _b2;
    ((_a2 = this._$EO) != null ? _a2 : this._$EO = /* @__PURE__ */ new Set()).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_b2 = t2.hostConnected) == null ? void 0 : _b2.call(t2));
  }
  removeController(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i2 of s2.keys()) this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    var _a2;
    const t2 = (_a2 = this.shadowRoot) != null ? _a2 : this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a2, _b2;
    (_a2 = this.renderRoot) != null ? _a2 : this.renderRoot = this.createRenderRoot(), this.enableUpdating(true), (_b2 = this._$EO) == null ? void 0 : _b2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostConnected) == null ? void 0 : _a3.call(t2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostDisconnected) == null ? void 0 : _a3.call(t2);
    });
  }
  attributeChangedCallback(t2, s2, i2) {
    this._$AK(t2, i2);
  }
  _$ET(t2, s2) {
    var _a2;
    const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e2 && true === i2.reflect) {
      const h2 = (void 0 !== ((_a2 = i2.converter) == null ? void 0 : _a2.toAttribute) ? i2.converter : u$1).toAttribute(s2, i2.type);
      this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a2, _b2, _c2;
    const i2 = this.constructor, e2 = i2._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i2.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a2 = t3.converter) == null ? void 0 : _a2.fromAttribute) ? t3.converter : u$1;
      this._$Em = e2;
      const r2 = h2.fromAttribute(s2, t3.type);
      this[e2] = (_c2 = r2 != null ? r2 : (_b2 = this._$Ej) == null ? void 0 : _b2.get(e2)) != null ? _c2 : r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i2, e2 = false, h2) {
    var _a2, _b2;
    if (void 0 !== t2) {
      const r2 = this.constructor;
      if (false === e2 && (h2 = this[t2]), i2 != null ? i2 : i2 = r2.getPropertyOptions(t2), !(((_a2 = i2.hasChanged) != null ? _a2 : f$1)(h2, s2) || i2.useDefault && i2.reflect && h2 === ((_b2 = this._$Ej) == null ? void 0 : _b2.get(t2)) && !this.hasAttribute(r2._$Eu(t2, i2)))) return;
      this.C(t2, s2, i2);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i2, reflect: e2, wrapped: h2 }, r2) {
    var _a2, _b2, _c2;
    i2 && !((_a2 = this._$Ej) != null ? _a2 : this._$Ej = /* @__PURE__ */ new Map()).has(t2) && (this._$Ej.set(t2, (_b2 = r2 != null ? r2 : s2) != null ? _b2 : this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i2 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && ((_c2 = this._$Eq) != null ? _c2 : this._$Eq = /* @__PURE__ */ new Set()).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a2, _b2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((_a2 = this.renderRoot) != null ? _a2 : this.renderRoot = this.createRenderRoot(), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i2] of t3) {
        const { wrapped: t4 } = i2, e2 = this[s3];
        true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i2, e2);
      }
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), (_b2 = this._$EO) == null ? void 0 : _b2.forEach((t3) => {
        var _a3;
        return (_a3 = t3.hostUpdate) == null ? void 0 : _a3.call(t3);
      }), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t2 = false, this._$EM(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
      var _a3;
      return (_a3 = t3.hostUpdated) == null ? void 0 : _a3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t3) => this._$ET(t3, this[t3]))), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
y$1.elementStyles = [], y$1.shadowRootOptions = { mode: "open" }, y$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$1 == null ? void 0 : p$1({ ReactiveElement: y$1 }), ((_c = a$1.reactiveElementVersions) != null ? _c : a$1.reactiveElementVersions = []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = globalThis, i$1 = (t2) => t2, s$1 = t$1.trustedTypes, e = s$1 ? s$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, h = "$lit$", o$2 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$1 = "?" + o$2, r$2 = `<${n$1}>`, l = document, c = () => l.createComment(""), a = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u = Array.isArray, d = (t2) => u(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), f = "[ 	\n\f\r]", v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), b = x(1), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l.createTreeWalker(l, 129);
function V(t2, i2) {
  if (!u(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e ? e.createHTML(i2) : i2;
}
const N = (t2, i2) => {
  const s2 = t2.length - 1, e2 = [];
  let n3, l2 = 2 === i2 ? "<svg>" : 3 === i2 ? "<math>" : "", c2 = v;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let a2, u2, d2 = -1, f2 = 0;
    for (; f2 < s3.length && (c2.lastIndex = f2, u2 = c2.exec(s3), null !== u2); ) f2 = c2.lastIndex, c2 === v ? "!--" === u2[1] ? c2 = _ : void 0 !== u2[1] ? c2 = m : void 0 !== u2[2] ? (y2.test(u2[2]) && (n3 = RegExp("</" + u2[2], "g")), c2 = p) : void 0 !== u2[3] && (c2 = p) : c2 === p ? ">" === u2[0] ? (c2 = n3 != null ? n3 : v, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p : '"' === u2[3] ? $ : g) : c2 === $ || c2 === g ? c2 = p : c2 === _ || c2 === m ? c2 = v : (c2 = p, n3 = void 0);
    const x2 = c2 === p && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === v ? s3 + r$2 : d2 >= 0 ? (e2.push(a2), s3.slice(0, d2) + h + s3.slice(d2) + o$2 + x2) : s3 + o$2 + (-2 === d2 ? i3 : x2);
  }
  return [V(t2, l2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : 3 === i2 ? "</math>" : "")), e2];
};
class S {
  constructor({ strings: t2, _$litType$: i2 }, e2) {
    let r2;
    this.parts = [];
    let l2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = N(t2, i2);
    if (this.el = S.createElement(f2, e2), P.currentNode = this.el.content, 2 === i2 || 3 === i2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = P.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(h)) {
          const i3 = v2[a2++], s2 = r2.getAttribute(t3).split(o$2), e3 = /([.?@])?(.*)/.exec(i3);
          d2.push({ type: 1, index: l2, name: e3[2], strings: s2, ctor: "." === e3[1] ? I : "?" === e3[1] ? L : "@" === e3[1] ? z : H }), r2.removeAttribute(t3);
        } else t3.startsWith(o$2) && (d2.push({ type: 6, index: l2 }), r2.removeAttribute(t3));
        if (y2.test(r2.tagName)) {
          const t3 = r2.textContent.split(o$2), i3 = t3.length - 1;
          if (i3 > 0) {
            r2.textContent = s$1 ? s$1.emptyScript : "";
            for (let s2 = 0; s2 < i3; s2++) r2.append(t3[s2], c()), P.nextNode(), d2.push({ type: 2, index: ++l2 });
            r2.append(t3[i3], c());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === n$1) d2.push({ type: 2, index: l2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(o$2, t3 + 1)); ) d2.push({ type: 7, index: l2 }), t3 += o$2.length - 1;
      }
      l2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = l.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function M(t2, i2, s2 = t2, e2) {
  var _a2, _b2, _c2;
  if (i2 === E) return i2;
  let h2 = void 0 !== e2 ? (_a2 = s2._$Co) == null ? void 0 : _a2[e2] : s2._$Cl;
  const o2 = a(i2) ? void 0 : i2._$litDirective$;
  return (h2 == null ? void 0 : h2.constructor) !== o2 && ((_b2 = h2 == null ? void 0 : h2._$AO) == null ? void 0 : _b2.call(h2, false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? ((_c2 = s2._$Co) != null ? _c2 : s2._$Co = [])[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i2 = M(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
class R {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    var _a2;
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = ((_a2 = t2 == null ? void 0 : t2.creationScope) != null ? _a2 : l).importNode(i2, true);
    P.currentNode = e2;
    let h2 = P.nextNode(), o2 = 0, n3 = 0, r2 = s2[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i3;
        2 === r2.type ? i3 = new k(h2, h2.nextSibling, this, t2) : 1 === r2.type ? i3 = new r2.ctor(h2, r2.name, r2.strings, this, t2) : 6 === r2.type && (i3 = new Z(h2, this, t2)), this._$AV.push(i3), r2 = s2[++n3];
      }
      o2 !== (r2 == null ? void 0 : r2.index) && (h2 = P.nextNode(), o2++);
    }
    return P.currentNode = l, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class k {
  get _$AU() {
    var _a2, _b2;
    return (_b2 = (_a2 = this._$AM) == null ? void 0 : _a2._$AU) != null ? _b2 : this._$Cv;
  }
  constructor(t2, i2, s2, e2) {
    var _a2;
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = (_a2 = e2 == null ? void 0 : e2.isConnected) != null ? _a2 : true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = M(this, t2, i2), a(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== E && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : d(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== A && a(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(l.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var _a2;
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = S.createElement(V(s2.h, s2.h[0]), this.options)), s2);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e2) this._$AH.p(i2);
    else {
      const t3 = new R(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = C.get(t2.strings);
    return void 0 === i2 && C.set(t2.strings, i2 = new S(t2)), i2;
  }
  k(t2) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i2.length ? i2.push(s2 = new k(this.O(c()), this.O(c()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, s2) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, s2); t2 !== this._$AB; ) {
      const s3 = i$1(t2).nextSibling;
      i$1(t2).remove(), t2 = s3;
    }
  }
  setConnected(t2) {
    var _a2;
    void 0 === this._$AM && (this._$Cv = t2, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t2));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = M(this, t2, i2, 0), o2 = !a(t2) || t2 !== this._$AH && t2 !== E, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = M(this, e3[s2 + n3], i2, n3), r2 === E && (r2 = this._$AH[n3]), o2 || (o2 = !a(r2) || r2 !== this._$AH[n3]), r2 === A ? t2 = A : t2 !== A && (t2 += (r2 != null ? r2 : "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
  }
}
class I extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
}
class L extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== A);
  }
}
class z extends H {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    var _a2;
    if ((t2 = (_a2 = M(this, t2, i2, 0)) != null ? _a2 : A) === E) return;
    const s2 = this._$AH, e2 = t2 === A && s2 !== A || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== A && (s2 === A || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a2, _b2;
    "function" == typeof this._$AH ? this._$AH.call((_b2 = (_a2 = this.options) == null ? void 0 : _a2.host) != null ? _b2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class Z {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    M(this, t2);
  }
}
const B = t$1.litHtmlPolyfillSupport;
B == null ? void 0 : B(S, k), ((_d = t$1.litHtmlVersions) != null ? _d : t$1.litHtmlVersions = []).push("3.3.3");
const D = (t2, i2, s2) => {
  var _a2, _b2;
  const e2 = (_a2 = s2 == null ? void 0 : s2.renderBefore) != null ? _a2 : i2;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = (_b2 = s2 == null ? void 0 : s2.renderBefore) != null ? _b2 : null;
    e2._$litPart$ = h2 = new k(i2.insertBefore(c(), t3), t3, void 0, s2 != null ? s2 : {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s = globalThis;
class i extends y$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a2, _b2;
    const t2 = super.createRenderRoot();
    return (_b2 = (_a2 = this.renderOptions).renderBefore) != null ? _b2 : _a2.renderBefore = t2.firstChild, t2;
  }
  update(t2) {
    const r2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = D(r2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(true);
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(false);
  }
  render() {
    return E;
  }
}
i._$litElement$ = true, i["finalized"] = true, (_e = s.litElementHydrateSupport) == null ? void 0 : _e.call(s, { LitElement: i });
const o$1 = s.litElementPolyfillSupport;
o$1 == null ? void 0 : o$1({ LitElement: i });
((_f = s.litElementVersions) != null ? _f : s.litElementVersions = []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = (t2) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e2);
  }) : customElements.define(t2, e2);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$1 }, r$1 = (t2 = o, e2, r2) => {
  const { kind: n3, metadata: i2 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t2 = Object.create(t2)).wrapped = true), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t2, e3), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n2(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$1(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r(r2) {
  return n2({ ...r2, state: true, attribute: false });
}
const CARD_TYPE = "ians-custom-room-card";
const CARD_NAME = "Ian's Custom Room Card";
const CARD_DESCRIPTION = "Customizable room card with icon, badge, sub-buttons, and navigable actions";
const cardStyles = i$3`
  :host {
    display: block;
    /* ── CSS custom property defaults (all overridable via card-mod or external CSS) ── */
    --ians-card-background-color: var(--ha-card-background, var(--card-background-color, #fff));
    --ians-card-background-opacity: 1;
    --ians-card-border-color: var(--ha-card-border-color, var(--divider-color, rgba(0, 0, 0, 0.12)));
    --ians-card-border-opacity: 1;
    --ians-card-border-radius: var(--ha-card-border-radius, 12px);
    --ians-icon-color: var(--state-icon-color, var(--primary-text-color));
    --ians-icon-background-color: transparent;
    --ians-icon-size: 40px;
    --ians-badge-color: #fff;
    --ians-badge-background-color: var(--error-color, #db4437);
    --ians-badge-size: 18px;
    --ians-title-color: var(--primary-text-color);
    --ians-title-font-size: 14px;
    --ians-sub-button-icon-color: var(--primary-text-color);
    --ians-sub-button-background-color: rgba(255, 255, 255, 0.1);
    --ians-sub-button-size: 32px;
    --ians-sub-button-gap: 6px;
  }

  ha-card {
    /* Transparent so our background layer fully controls the card color */
    --ha-card-background: transparent;
    position: relative;
    height: 100%;
    overflow: hidden;
    cursor: default;
    touch-action: none;
    border-color: color-mix(
      in srgb,
      var(--ians-card-border-color) calc(var(--ians-card-border-opacity) * 100%),
      transparent
    );
  }

  /* ── Background layers (absolute, behind content) ────────────────────────── */
  /* Color layer: opacity from background_opacity applies here only */
  .card-background-color {
    position: absolute;
    inset: 0;
    background-color: var(--ians-card-background-color);
    opacity: var(--ians-card-background-opacity);
    border-radius: inherit;
    pointer-events: none;
    z-index: 0;
  }

  /* Image layer: always full opacity, stacked on top of color layer */
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

  /* ── Content wrapper (above background layers) ───────────────────────────── */
  .card-inner {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 12px;
    box-sizing: border-box;
    gap: 8px;
  }

  /* ── Header: icon + title ─────────────────────────────────────────────────── */
  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    min-width: 0;
  }

  /* ── Icon ─────────────────────────────────────────────────────────────────── */
  .icon-container {
    position: relative;
    width: var(--ians-icon-size);
    height: var(--ians-icon-size);
    flex-shrink: 0;
    border-radius: 50%;
    background-color: var(--ians-icon-background-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-container ha-icon {
    --mdc-icon-size: calc(var(--ians-icon-size) * 0.6);
    color: var(--ians-icon-color);
    display: flex;
  }

  /* ── Icon badge ───────────────────────────────────────────────────────────── */
  .badge {
    position: absolute;
    top: -2px;
    right: -2px;
    width: var(--ians-badge-size);
    height: var(--ians-badge-size);
    border-radius: 50%;
    background-color: var(--ians-badge-background-color);
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

  /* ── Title ────────────────────────────────────────────────────────────────── */
  .card-title {
    color: var(--ians-title-color);
    font-size: var(--ians-title-font-size);
    font-weight: 500;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
  }

  /* ── Interactive card (global_action active) ─────────────────────────────── */
  ha-card.interactive {
    cursor: pointer;
  }

  ha-card.interactive:hover .card-inner {
    opacity: 0.9;
  }

  /* ── Sub-buttons ─────────────────────────────────────────────────────────── */
  .sub-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ians-sub-button-gap);
    order: 2; /* default: after header */
  }

  /* Top row: render sub-buttons before the header using flex order */
  .card-header {
    order: 1;
  }

  .sub-buttons.layout-top-row {
    order: 0;
  }

  /* Columns layout */
  .sub-buttons.layout-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  /* Grid layout */
  .sub-buttons.layout-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
  }

  /* Corners and custom: absolute overlay, container doesn't capture pointer events */
  .sub-buttons.layout-corners,
  .sub-buttons.layout-custom {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
  }

  /* ── Individual sub-button ────────────────────────────────────────────────── */
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
    touch-action: none;
    -webkit-tap-highlight-color: transparent;
    transition: opacity 0.15s;
  }

  .sub-button:hover {
    opacity: 0.85;
  }

  .sub-button:active {
    opacity: 0.65;
  }

  .sub-button.has-background {
    background-color: var(--ians-sub-button-background-color);
  }

  /* display-only: sub-button rendered but non-interactive (global_action active) */
  .sub-button.display-only {
    pointer-events: none;
    cursor: default;
    opacity: 0.65;
  }

  .sub-button ha-icon {
    --mdc-icon-size: calc(var(--ians-sub-button-size) * 0.65);
    color: var(--ians-sub-button-icon-color);
    display: flex;
    flex-shrink: 0;
  }

  .sub-button-label,
  .sub-button-state {
    font-size: 11px;
    font-weight: 500;
    color: var(--ians-sub-button-icon-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 60px;
  }

  .sub-button-state {
    opacity: 0.75;
  }

  /* Absolute positions for corners and custom layouts */
  .sub-button.pos-top-left {
    position: absolute;
    top: 8px;
    left: 8px;
  }

  .sub-button.pos-top-center {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
  }

  .sub-button.pos-top-right {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .sub-button.pos-bottom-left {
    position: absolute;
    bottom: 8px;
    left: 8px;
  }

  .sub-button.pos-bottom-center {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
  }

  .sub-button.pos-bottom-right {
    position: absolute;
    bottom: 8px;
    right: 8px;
  }

  /* ── Template error state ─────────────────────────────────────────────────── */
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
`;
function resolveAreaImage(hass, entityId) {
  var _a2, _b2;
  if (!entityId) return void 0;
  const entityEntry = (_a2 = hass.entities) == null ? void 0 : _a2[entityId];
  const areaId = entityEntry == null ? void 0 : entityEntry.area_id;
  if (!areaId) return void 0;
  const area = (_b2 = hass.areas) == null ? void 0 : _b2[areaId];
  if (!(area == null ? void 0 : area.picture)) return void 0;
  return area.picture;
}
function isTemplate(value) {
  const trimmed = value.trim();
  return trimmed.startsWith("{{") || trimmed.startsWith("{%");
}
function subscribeTemplate(hass, template, variables, onResult, onError) {
  return hass.connection.subscribeMessage(
    (msg) => {
      if ("error" in msg) {
        onError == null ? void 0 : onError(msg.error);
      } else {
        onResult(msg.result);
      }
    },
    {
      type: "render_template",
      template,
      variables,
      strict: false,
      report_errors: true
    }
  );
}
const HOLD_DELAY_MS = 500;
const DOUBLE_TAP_DELAY_MS = 350;
const MOVE_THRESHOLD_PX = 10;
function normalizeActionConfig(config) {
  const normalize = (action) => {
    if (!action) return void 0;
    const a2 = { ...action };
    if (a2.action === "call-service") {
      a2.action = "perform-action";
    }
    if (a2.service && !a2.perform_action) {
      a2.perform_action = a2.service;
    }
    if (a2.service_data && !a2.data) {
      a2.data = a2.service_data;
    }
    return a2;
  };
  return {
    ...config,
    tap_action: normalize(config.tap_action),
    hold_action: normalize(config.hold_action),
    double_tap_action: normalize(config.double_tap_action)
  };
}
function dispatchAction(element, config, action) {
  const normalized = normalizeActionConfig(config);
  const event = new Event("hass-action", { bubbles: true, composed: true });
  event.detail = { config: normalized, action };
  element.dispatchEvent(event);
}
function attachActionHandler(element, config, dispatch) {
  var _a2;
  let holdTimeout = null;
  let tapTimeout = null;
  let tapCount = 0;
  let startX = 0;
  let startY = 0;
  let moved = false;
  let holdFired = false;
  const hasDoubleTap = ((_a2 = config.double_tap_action) == null ? void 0 : _a2.action) !== void 0 && config.double_tap_action.action !== "none";
  const clearHold = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      holdTimeout = null;
    }
  };
  const clearTap = () => {
    if (tapTimeout) {
      clearTimeout(tapTimeout);
      tapTimeout = null;
    }
    tapCount = 0;
  };
  const onPointerDown = (e2) => {
    if (e2.button !== void 0 && e2.button !== 0 && e2.pointerType !== "touch") {
      return;
    }
    startX = e2.clientX;
    startY = e2.clientY;
    moved = false;
    holdFired = false;
    holdTimeout = setTimeout(() => {
      holdTimeout = null;
      if (!moved) {
        holdFired = true;
        clearTap();
        dispatch("hold");
      }
    }, HOLD_DELAY_MS);
  };
  const onPointerMove = (e2) => {
    const dx = Math.abs(e2.clientX - startX);
    const dy = Math.abs(e2.clientY - startY);
    if (dx > MOVE_THRESHOLD_PX || dy > MOVE_THRESHOLD_PX) {
      moved = true;
      clearHold();
    }
  };
  const onPointerUp = () => {
    clearHold();
    if (moved || holdFired) return;
    if (!hasDoubleTap) {
      dispatch("tap");
      return;
    }
    tapCount++;
    if (tapCount === 1) {
      tapTimeout = setTimeout(() => {
        tapCount = 0;
        dispatch("tap");
      }, DOUBLE_TAP_DELAY_MS);
    } else {
      clearTap();
      dispatch("double_tap");
    }
  };
  const onPointerCancel = () => {
    clearHold();
    clearTap();
    moved = true;
  };
  const onContextMenu = (e2) => {
    e2.preventDefault();
  };
  element.addEventListener("pointerdown", onPointerDown);
  element.addEventListener("pointermove", onPointerMove);
  element.addEventListener("pointerup", onPointerUp);
  element.addEventListener("pointercancel", onPointerCancel);
  element.addEventListener("contextmenu", onContextMenu);
  return () => {
    clearHold();
    clearTap();
    element.removeEventListener("pointerdown", onPointerDown);
    element.removeEventListener("pointermove", onPointerMove);
    element.removeEventListener("pointerup", onPointerUp);
    element.removeEventListener("pointercancel", onPointerCancel);
    element.removeEventListener("contextmenu", onContextMenu);
  };
}
async function loadHaComponents() {
  var _a2, _b2;
  if (!customElements.get("ha-form")) {
    (_b2 = (_a2 = customElements.get("hui-tile-card")) == null ? void 0 : _a2.getConfigElement) == null ? void 0 : _b2.call(_a2);
  }
  await Promise.resolve();
}
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
const SUB_BUTTON_LAYOUT_OPTIONS = [
  { value: "bottom-row", label: "Bottom Row" },
  { value: "top-row", label: "Top Row" },
  { value: "corners", label: "Corners" },
  { value: "columns", label: "Columns" },
  { value: "grid", label: "Grid" },
  { value: "custom", label: "Custom" }
];
const SUB_BUTTON_POSITION_OPTIONS = [
  { value: "top-left", label: "Top Left" },
  { value: "top-center", label: "Top Center" },
  { value: "top-right", label: "Top Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-right", label: "Bottom Right" }
];
const TEMPLATE_CAPABLE_FIELDS = /* @__PURE__ */ new Set([
  "title",
  "icon",
  "icon_color",
  "badge_icon",
  "badge_color",
  "background_color",
  "border_color"
]);
const OPACITY_SCHEMA = (name, label) => ({
  name,
  label,
  selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } }
});
let IansCustomRoomCardEditor = class extends i {
  constructor() {
    super(...arguments);
    this._loaded = false;
    this._templateMode = /* @__PURE__ */ new Set();
    this._expandedSubButton = null;
  }
  // ── Lifecycle ──────────────────────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback();
    loadHaComponents().then(() => {
      this._loaded = true;
    });
  }
  setConfig(config) {
    this._config = config;
    const templateSet = /* @__PURE__ */ new Set();
    for (const field of TEMPLATE_CAPABLE_FIELDS) {
      const val = config[field];
      if (val && isTemplate(val)) {
        templateSet.add(field);
      }
    }
    this._templateMode = templateSet;
  }
  // ── Event helpers ──────────────────────────────────────────────────────────
  _fireConfigChanged(config) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true
      })
    );
  }
  _fieldChanged(field, value) {
    if (!this._config) return;
    const newConfig = { ...this._config, [field]: value };
    this._fireConfigChanged(newConfig);
  }
  _gridFieldChanged(field, value) {
    var _a2;
    if (!this._config) return;
    const newConfig = {
      ...this._config,
      grid_options: { ...(_a2 = this._config.grid_options) != null ? _a2 : {}, [field]: value }
    };
    this._fireConfigChanged(newConfig);
  }
  _globalActionFieldChanged(field, value) {
    var _a2;
    if (!this._config) return;
    const newConfig = {
      ...this._config,
      global_action: { ...(_a2 = this._config.global_action) != null ? _a2 : {}, [field]: value }
    };
    this._fireConfigChanged(newConfig);
  }
  _subButtonChanged(index, field, value) {
    var _a2;
    if (!((_a2 = this._config) == null ? void 0 : _a2.sub_buttons)) return;
    const buttons = [...this._config.sub_buttons];
    buttons[index] = { ...buttons[index], [field]: value };
    this._fieldChanged("sub_buttons", buttons);
  }
  _subButtonActionChanged(index, actionField, value) {
    var _a2;
    if (!((_a2 = this._config) == null ? void 0 : _a2.sub_buttons)) return;
    const buttons = [...this._config.sub_buttons];
    buttons[index] = { ...buttons[index], [actionField]: value };
    this._fieldChanged("sub_buttons", buttons);
  }
  _addSubButton() {
    var _a2, _b2;
    const buttons = [...(_b2 = (_a2 = this._config) == null ? void 0 : _a2.sub_buttons) != null ? _b2 : []];
    buttons.push({
      show_icon: true,
      show_label: false,
      show_state: false,
      background: true,
      tap_action: { action: "toggle" },
      hold_action: { action: "more-info" },
      double_tap_action: { action: "none" }
    });
    this._fieldChanged("sub_buttons", buttons);
    this._expandedSubButton = buttons.length - 1;
  }
  _deleteSubButton(index) {
    var _a2;
    if (!((_a2 = this._config) == null ? void 0 : _a2.sub_buttons)) return;
    const buttons = [...this._config.sub_buttons];
    buttons.splice(index, 1);
    this._fieldChanged("sub_buttons", buttons);
    if (this._expandedSubButton === index) this._expandedSubButton = null;
  }
  _toggleTemplateMode(field) {
    const next = new Set(this._templateMode);
    if (next.has(field)) {
      next.delete(field);
    } else {
      next.add(field);
    }
    this._templateMode = next;
  }
  _onFormChange(handler, ev) {
    handler(ev.detail.value);
  }
  // ── Render helpers ─────────────────────────────────────────────────────────
  _renderTemplateField(fieldKey, label, renderWidget) {
    var _a2, _b2;
    const inTemplateMode = this._templateMode.has(fieldKey);
    const currentValue = (_b2 = (_a2 = this._config) == null ? void 0 : _a2[fieldKey]) != null ? _b2 : "";
    return b`
      <div class="field-row">
        <div class="field-label">${label}</div>
        <div class="field-input">
          ${inTemplateMode ? b`
                <textarea
                  .value=${currentValue}
                  placeholder="&#123;&#123; states('sensor.example') &#125;&#125;"
                  @change=${(ev) => this._fieldChanged(
      fieldKey,
      ev.target.value
    )}
                  @input=${(ev) => this._fieldChanged(
      fieldKey,
      ev.target.value
    )}
                ></textarea>
                <div class="template-note">Advanced: HA Template (Jinja2)</div>
              ` : renderWidget()}
        </div>
        <button
          class="template-toggle ${inTemplateMode ? "active" : ""}"
          title="${inTemplateMode ? "Switch to simple input" : "Use HA template"}"
          @click=${() => this._toggleTemplateMode(fieldKey)}
        >
          T
        </button>
      </div>
    `;
  }
  _renderColorField(fieldKey, label) {
    const isTemplate2 = TEMPLATE_CAPABLE_FIELDS.has(fieldKey);
    const widget = () => {
      var _a2, _b2;
      return b`
      <ha-selector
        .hass=${this.hass}
        .label=${label}
        .selector=${{ text: {} }}
        .value=${(_b2 = (_a2 = this._config) == null ? void 0 : _a2[fieldKey]) != null ? _b2 : ""}
        @value-changed=${(ev) => this._fieldChanged(fieldKey, ev.detail.value || void 0)}
      ></ha-selector>
    `;
    };
    if (!isTemplate2) return widget();
    return this._renderTemplateField(fieldKey, label, widget);
  }
  // ── Main render ────────────────────────────────────────────────────────────
  render() {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    if (!this._loaded || !this._config) {
      return b`<div class="loading">Loading editor…</div>`;
    }
    const c2 = this._config;
    return b`
      <!-- ── Basic ──────────────────────────────────────────────────────── -->
      <div class="section-header">Basic</div>
      <div class="section-body">
        <ha-entity-picker
          .hass=${this.hass}
          .label=${"Entity (optional)"}
          .value=${(_a2 = c2.entity) != null ? _a2 : ""}
          allow-custom-entity
          @value-changed=${(ev) => this._fieldChanged("entity", ev.detail.value || void 0)}
        ></ha-entity-picker>

        ${this._renderTemplateField(
      "title",
      "Title",
      () => {
        var _a3;
        return b`
            <ha-selector
              .hass=${this.hass}
              .label=${"Title"}
              .selector=${{ text: {} }}
              .value=${(_a3 = c2.title) != null ? _a3 : ""}
              @value-changed=${(ev) => this._fieldChanged("title", ev.detail.value || void 0)}
            ></ha-selector>
          `;
      }
    )}
        ${this._renderTemplateField(
      "icon",
      "Icon",
      () => {
        var _a3;
        return b`
            <ha-icon-picker
              .hass=${this.hass}
              .label=${"Icon"}
              .value=${(_a3 = c2.icon) != null ? _a3 : ""}
              @value-changed=${(ev) => this._fieldChanged("icon", ev.detail.value || void 0)}
            ></ha-icon-picker>
          `;
      }
    )}
      </div>

      <!-- ── Icon appearance ────────────────────────────────────────────── -->
      <div class="section-header">Icon Appearance</div>
      <div class="section-body">
        ${this._renderColorField("icon_color", "Icon Color")}
        <ha-selector
          .hass=${this.hass}
          .label=${"Icon Background Color"}
          .selector=${{ text: {} }}
          .value=${(_b2 = c2.icon_background_color) != null ? _b2 : ""}
          @value-changed=${(ev) => this._fieldChanged("icon_background_color", ev.detail.value || void 0)}
        ></ha-selector>
      </div>

      <!-- ── Badge ──────────────────────────────────────────────────────── -->
      <div class="section-header">Icon Badge</div>
      <div class="section-body">
        ${this._renderTemplateField(
      "badge_icon",
      "Badge Icon",
      () => {
        var _a3;
        return b`
            <ha-icon-picker
              .hass=${this.hass}
              .label=${"Badge Icon (omit to hide)"}
              .value=${(_a3 = c2.badge_icon) != null ? _a3 : ""}
              @value-changed=${(ev) => this._fieldChanged("badge_icon", ev.detail.value || void 0)}
            ></ha-icon-picker>
          `;
      }
    )}
        ${this._renderColorField("badge_color", "Badge Icon Color")}
        <ha-selector
          .hass=${this.hass}
          .label=${"Badge Background Color"}
          .selector=${{ text: {} }}
          .value=${(_c2 = c2.badge_background_color) != null ? _c2 : ""}
          @value-changed=${(ev) => this._fieldChanged("badge_background_color", ev.detail.value || void 0)}
        ></ha-selector>
      </div>

      <!-- ── Card background & border ──────────────────────────────────── -->
      <div class="section-header">Card Background &amp; Border</div>
      <div class="section-body">
        ${this._renderColorField("background_color", "Background Color")}

        <div class="labeled-slider">
          <label>Background Opacity</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${OPACITY_SCHEMA("background_opacity", "Background Opacity").selector}
            .value=${(_d2 = c2.background_opacity) != null ? _d2 : 1}
            @value-changed=${(ev) => this._fieldChanged("background_opacity", ev.detail.value)}
          ></ha-selector>
        </div>

        <ha-selector
          .hass=${this.hass}
          .label=${"Background Image URL (or 'area')"}
          .selector=${{ text: {} }}
          .value=${(_e2 = c2.background_image) != null ? _e2 : ""}
          @value-changed=${(ev) => this._fieldChanged("background_image", ev.detail.value || void 0)}
        ></ha-selector>

        ${this._renderColorField("border_color", "Border Color")}

        <div class="labeled-slider">
          <label>Border Opacity</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${OPACITY_SCHEMA("border_opacity", "Border Opacity").selector}
            .value=${(_f2 = c2.border_opacity) != null ? _f2 : 1}
            @value-changed=${(ev) => this._fieldChanged("border_opacity", ev.detail.value)}
          ></ha-selector>
        </div>
      </div>

      <!-- ── Grid sizing ────────────────────────────────────────────────── -->
      <div class="section-header">Grid Sizing (Sections Dashboard)</div>
      <div class="section-body grid-options">
        <ha-selector
          .hass=${this.hass}
          .label=${"Columns"}
          .selector=${{ number: { min: 1, max: 12, step: 1, mode: "box" } }}
          .value=${(_h = (_g = c2.grid_options) == null ? void 0 : _g.columns) != null ? _h : 6}
          @value-changed=${(ev) => this._gridFieldChanged("columns", ev.detail.value)}
        ></ha-selector>
        <ha-selector
          .hass=${this.hass}
          .label=${"Rows"}
          .selector=${{ number: { min: 1, max: 6, step: 1, mode: "box" } }}
          .value=${(_j = (_i = c2.grid_options) == null ? void 0 : _i.rows) != null ? _j : 2}
          @value-changed=${(ev) => this._gridFieldChanged("rows", ev.detail.value)}
        ></ha-selector>
      </div>

      <!-- ── Sub-buttons ────────────────────────────────────────────────── -->
      <div class="section-header">Sub-Buttons</div>
      <div class="section-body">
        <ha-selector
          .hass=${this.hass}
          .label=${"Layout"}
          .selector=${{
      select: {
        options: SUB_BUTTON_LAYOUT_OPTIONS,
        mode: "dropdown"
      }
    }}
          .value=${(_k = c2.sub_buttons_layout) != null ? _k : "bottom-row"}
          @value-changed=${(ev) => this._fieldChanged("sub_buttons_layout", ev.detail.value)}
        ></ha-selector>

        ${((_l = c2.sub_buttons) != null ? _l : []).map(
      (btn, i2) => this._renderSubButtonRow(btn, i2)
    )}

        <button class="add-button" @click=${this._addSubButton}>
          + Add Sub-Button
        </button>
      </div>

      <!-- ── Global action ──────────────────────────────────────────────── -->
      <div class="section-header">Global Action</div>
      <div class="section-body">
        <div class="warning-box">
          ⚠ When Global Action is set, sub-buttons become non-interactive
          decorations. The entire card surface becomes a single tap target.
        </div>

        <ha-selector
          .hass=${this.hass}
          .label=${"Tap Action"}
          .selector=${{ ui_action: {} }}
          .value=${(_n = (_m = c2.global_action) == null ? void 0 : _m.tap_action) != null ? _n : { action: "none" }}
          @value-changed=${(ev) => this._globalActionFieldChanged("tap_action", ev.detail.value)}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .label=${"Hold Action"}
          .selector=${{ ui_action: {} }}
          .value=${(_p = (_o = c2.global_action) == null ? void 0 : _o.hold_action) != null ? _p : { action: "none" }}
          @value-changed=${(ev) => this._globalActionFieldChanged("hold_action", ev.detail.value)}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .label=${"Double-Tap Action"}
          .selector=${{ ui_action: {} }}
          .value=${(_r = (_q = c2.global_action) == null ? void 0 : _q.double_tap_action) != null ? _r : { action: "none" }}
          @value-changed=${(ev) => this._globalActionFieldChanged("double_tap_action", ev.detail.value)}
        ></ha-selector>

        <button
          class="clear-button"
          @click=${() => {
      const cfg = { ...this._config };
      delete cfg.global_action;
      this._fireConfigChanged(cfg);
    }}
        >
          Clear Global Action
        </button>
      </div>
    `;
  }
  _renderSubButtonRow(btn, index) {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i, _j, _k, _l, _m;
    const isExpanded = this._expandedSubButton === index;
    const label = (_c2 = (_b2 = (_a2 = btn.entity) != null ? _a2 : btn.label) != null ? _b2 : btn.icon) != null ? _c2 : `Sub-button ${index + 1}`;
    const showPosition = ((_e2 = (_d2 = this._config) == null ? void 0 : _d2.sub_buttons_layout) != null ? _e2 : "bottom-row") === "custom";
    return b`
      <div class="sub-button-row">
        <div
          class="sub-button-header"
          @click=${() => this._expandedSubButton = isExpanded ? null : index}
        >
          <ha-icon .icon=${(_f2 = btn.icon) != null ? _f2 : "mdi:gesture-tap"}></ha-icon>
          <span class="sub-button-label">${label}</span>
          <ha-icon
            .icon=${isExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}
          ></ha-icon>
          <button
            class="delete-button"
            @click=${(ev) => {
      ev.stopPropagation();
      this._deleteSubButton(index);
    }}
          >
            ✕
          </button>
        </div>

        ${isExpanded ? b`
              <div class="sub-button-body">
                <ha-entity-picker
                  .hass=${this.hass}
                  .label=${"Entity"}
                  .value=${(_g = btn.entity) != null ? _g : ""}
                  allow-custom-entity
                  @value-changed=${(ev) => this._subButtonChanged(
      index,
      "entity",
      ev.detail.value || void 0
    )}
                ></ha-entity-picker>

                <ha-icon-picker
                  .hass=${this.hass}
                  .label=${"Icon"}
                  .value=${(_h = btn.icon) != null ? _h : ""}
                  @value-changed=${(ev) => this._subButtonChanged(
      index,
      "icon",
      ev.detail.value || void 0
    )}
                ></ha-icon-picker>

                <ha-selector
                  .hass=${this.hass}
                  .label=${"Label (or 'entity')"}
                  .selector=${{ text: {} }}
                  .value=${(_i = btn.label) != null ? _i : ""}
                  @value-changed=${(ev) => this._subButtonChanged(index, "label", ev.detail.value || void 0)}
                ></ha-selector>

                <ha-form
                  .hass=${this.hass}
                  .data=${btn}
                  .schema=${[
      {
        name: "show_icon",
        label: "Show Icon",
        selector: { boolean: {} }
      },
      {
        name: "show_label",
        label: "Show Label",
        selector: { boolean: {} }
      },
      {
        name: "show_state",
        label: "Show State",
        selector: { boolean: {} }
      },
      {
        name: "background",
        label: "Show Background",
        selector: { boolean: {} }
      }
    ]}
                  .computeLabel=${(s2) => s2.label}
                  @value-changed=${(ev) => {
      this._subButtonChanged(
        index,
        "show_icon",
        ev.detail.value.show_icon
      );
      this._subButtonChanged(
        index,
        "show_label",
        ev.detail.value.show_label
      );
      this._subButtonChanged(
        index,
        "show_state",
        ev.detail.value.show_state
      );
      this._subButtonChanged(
        index,
        "background",
        ev.detail.value.background
      );
    }}
                ></ha-form>

                ${showPosition ? b`
                      <ha-selector
                        .hass=${this.hass}
                        .label=${"Position"}
                        .selector=${{
      select: {
        options: SUB_BUTTON_POSITION_OPTIONS,
        mode: "dropdown"
      }
    }}
                        .value=${(_j = btn.position) != null ? _j : "bottom-left"}
                        @value-changed=${(ev) => this._subButtonChanged(
      index,
      "position",
      ev.detail.value
    )}
                      ></ha-selector>
                    ` : A}

                <div class="sub-section-label">Actions</div>
                <ha-selector
                  .hass=${this.hass}
                  .label=${"Tap Action"}
                  .selector=${{ ui_action: {} }}
                  .value=${(_k = btn.tap_action) != null ? _k : { action: "toggle" }}
                  @value-changed=${(ev) => this._subButtonActionChanged(
      index,
      "tap_action",
      ev.detail.value
    )}
                ></ha-selector>
                <ha-selector
                  .hass=${this.hass}
                  .label=${"Hold Action"}
                  .selector=${{ ui_action: {} }}
                  .value=${(_l = btn.hold_action) != null ? _l : { action: "more-info" }}
                  @value-changed=${(ev) => this._subButtonActionChanged(
      index,
      "hold_action",
      ev.detail.value
    )}
                ></ha-selector>
                <ha-selector
                  .hass=${this.hass}
                  .label=${"Double-Tap Action"}
                  .selector=${{ ui_action: {} }}
                  .value=${(_m = btn.double_tap_action) != null ? _m : { action: "none" }}
                  @value-changed=${(ev) => this._subButtonActionChanged(
      index,
      "double_tap_action",
      ev.detail.value
    )}
                ></ha-selector>
              </div>
            ` : A}
      </div>
    `;
  }
  // ── Styles ─────────────────────────────────────────────────────────────────
  static get styles() {
    return i$3`
      :host {
        display: block;
      }

      .loading {
        padding: 16px;
        color: var(--secondary-text-color);
      }

      .section-header {
        font-size: 13px;
        font-weight: 600;
        color: var(--primary-text-color);
        padding: 16px 16px 4px;
        border-top: 1px solid var(--divider-color);
        margin-top: 8px;
      }

      .section-header:first-child {
        border-top: none;
        margin-top: 0;
      }

      .section-body {
        padding: 4px 16px 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .grid-options {
        flex-direction: row;
        gap: 12px;
      }

      .grid-options ha-selector {
        flex: 1;
      }

      .field-row {
        display: flex;
        align-items: flex-start;
        gap: 6px;
      }

      .field-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        min-width: 80px;
        padding-top: 12px;
      }

      .field-input {
        flex: 1;
        min-width: 0;
      }

      .field-input textarea {
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

      .template-note {
        font-size: 10px;
        color: var(--secondary-text-color);
        margin-top: 2px;
      }

      .template-toggle {
        margin-top: 8px;
        padding: 2px 6px;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: transparent;
        color: var(--secondary-text-color);
        flex-shrink: 0;
      }

      .template-toggle.active {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }

      .labeled-slider label {
        font-size: 12px;
        color: var(--secondary-text-color);
        display: block;
        margin-bottom: 2px;
      }

      .warning-box {
        background: var(--warning-color, #ff9800);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        line-height: 1.4;
      }

      /* Sub-button editor */
      .sub-button-row {
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        overflow: hidden;
      }

      .sub-button-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        cursor: pointer;
        background: var(--secondary-background-color, #f5f5f5);
      }

      .sub-button-header:hover {
        background: var(--primary-background-color, #fff);
      }

      .sub-button-header .sub-button-label {
        flex: 1;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .delete-button,
      .add-button,
      .clear-button {
        cursor: pointer;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        padding: 4px 10px;
        font-size: 12px;
        background: transparent;
        color: var(--primary-text-color);
      }

      .delete-button {
        color: var(--error-color, #db4437);
        border-color: var(--error-color, #db4437);
        padding: 2px 6px;
      }

      .add-button {
        align-self: flex-start;
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }

      .clear-button {
        align-self: flex-start;
      }

      .sub-button-body {
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: var(--primary-background-color, #fff);
      }

      .sub-section-label {
        font-size: 11px;
        font-weight: 600;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }

    `;
  }
};
__decorateClass$1([
  n2({ attribute: false })
], IansCustomRoomCardEditor.prototype, "hass", 2);
__decorateClass$1([
  r()
], IansCustomRoomCardEditor.prototype, "_config", 2);
__decorateClass$1([
  r()
], IansCustomRoomCardEditor.prototype, "_loaded", 2);
__decorateClass$1([
  r()
], IansCustomRoomCardEditor.prototype, "_templateMode", 2);
__decorateClass$1([
  r()
], IansCustomRoomCardEditor.prototype, "_expandedSubButton", 2);
IansCustomRoomCardEditor = __decorateClass$1([
  t(`${CARD_TYPE}-editor`)
], IansCustomRoomCardEditor);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
const TEMPLATE_FIELDS = [
  "icon",
  "icon_color",
  "badge_icon",
  "badge_color",
  "background_color",
  "border_color",
  "title"
];
const CORNER_POSITIONS = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right"
];
let IansCustomRoomCard = class extends i {
  constructor() {
    super(...arguments);
    this._templateResults = {};
    this._templateErrors = {};
    this._templateUnsubs = /* @__PURE__ */ new Map();
    this._subTemplateResults = {};
    this._subTemplateUnsubs = /* @__PURE__ */ new Map();
    this._subButtonCleanups = [];
  }
  // ── Static card metadata ───────────────────────────────────────────────────
  static getStubConfig(hass) {
    var _a2, _b2;
    if (hass) {
      const lightKey = Object.keys(hass.states).find(
        (e2) => e2.startsWith("light.")
      );
      if (lightKey) {
        return {
          type: `custom:${CARD_TYPE}`,
          entity: lightKey,
          title: (_b2 = (_a2 = hass.states[lightKey]) == null ? void 0 : _a2.attributes.friendly_name) != null ? _b2 : "Room",
          icon: "mdi:lightbulb"
        };
      }
    }
    return { type: `custom:${CARD_TYPE}`, title: "Room", icon: "mdi:home" };
  }
  static getGridOptions(config) {
    var _a2, _b2, _c2, _d2, _e2;
    const g2 = (_a2 = config == null ? void 0 : config.grid_options) != null ? _a2 : {};
    return {
      columns: (_b2 = g2.columns) != null ? _b2 : 6,
      rows: (_c2 = g2.rows) != null ? _c2 : 2,
      min_columns: (_d2 = g2.min_columns) != null ? _d2 : 3,
      min_rows: (_e2 = g2.min_rows) != null ? _e2 : 1,
      ...g2.max_columns !== void 0 && { max_columns: g2.max_columns },
      ...g2.max_rows !== void 0 && { max_rows: g2.max_rows }
    };
  }
  static getConfigElement() {
    return document.createElement(`${CARD_TYPE}-editor`);
  }
  // ── Config ─────────────────────────────────────────────────────────────────
  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    this._config = config;
  }
  // ── Lifecycle ──────────────────────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback();
    if (this._config && this.hass) {
      this._subscribeTemplates();
    }
  }
  firstUpdated() {
    this._setupCardActionHandler();
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback();
    this._unsubscribeTemplates();
    this._unsubscribeSubButtonTemplates();
    (_a2 = this._cardActionCleanup) == null ? void 0 : _a2.call(this);
    this._cardActionCleanup = void 0;
    this._cleanupSubButtonHandlers();
  }
  updated(changedProps) {
    super.updated(changedProps);
    const configChanged = changedProps.has("_config");
    const templateResultsChanged = changedProps.has("_templateResults");
    if (configChanged) {
      this._subscribeTemplates();
      this._subscribeSubButtonTemplates();
      this._setupCardActionHandler();
    }
    if (configChanged || templateResultsChanged || changedProps.has("_subTemplateResults")) {
      this._applyConfigStyles();
      this._setupSubButtonHandlers();
    }
  }
  // ── Template subscriptions ─────────────────────────────────────────────────
  async _subscribeTemplates() {
    var _a2, _b2;
    await this._unsubscribeTemplates();
    const c2 = this._config;
    if (!c2 || !this.hass) return;
    const variables = {
      config: c2,
      user: (_b2 = (_a2 = this.hass.user) == null ? void 0 : _a2.name) != null ? _b2 : "",
      entity: c2.entity ? this.hass.states[c2.entity] : void 0
    };
    const templateErrors = {};
    for (const field of TEMPLATE_FIELDS) {
      const value = c2[field];
      if (!value || !isTemplate(value)) continue;
      try {
        const unsub = await subscribeTemplate(
          this.hass,
          value,
          variables,
          (result) => {
            this._templateResults = { ...this._templateResults, [field]: result };
            const errs = { ...this._templateErrors };
            delete errs[field];
            this._templateErrors = errs;
          },
          (error) => {
            console.warn(`[ians-room-card] Template error in ${field}:`, error);
            this._templateErrors = { ...this._templateErrors, [field]: error };
          }
        );
        this._templateUnsubs.set(field, unsub);
      } catch (e2) {
        console.error(`[ians-room-card] Failed to subscribe template for ${field}:`, e2);
        templateErrors[field] = String(e2);
      }
    }
    if (Object.keys(templateErrors).length > 0) {
      this._templateErrors = { ...this._templateErrors, ...templateErrors };
    }
  }
  async _unsubscribeTemplates() {
    for (const unsub of this._templateUnsubs.values()) {
      try {
        await unsub();
      } catch (e2) {
      }
    }
    this._templateUnsubs.clear();
    this._templateResults = {};
    this._templateErrors = {};
  }
  async _subscribeSubButtonTemplates() {
    var _a2, _b2;
    await this._unsubscribeSubButtonTemplates();
    const c2 = this._config;
    if (!(c2 == null ? void 0 : c2.sub_buttons) || !this.hass) return;
    const variables = {
      config: c2,
      user: (_b2 = (_a2 = this.hass.user) == null ? void 0 : _a2.name) != null ? _b2 : ""
    };
    for (const [i2, btn] of c2.sub_buttons.entries()) {
      const btnVars = {
        ...variables,
        entity: btn.entity ? this.hass.states[btn.entity] : void 0
      };
      for (const field of ["icon", "label"]) {
        const value = btn[field];
        if (!value || !isTemplate(value)) continue;
        const key = `sub_${i2}_${field}`;
        try {
          const unsub = await subscribeTemplate(
            this.hass,
            value,
            btnVars,
            (result) => {
              this._subTemplateResults = { ...this._subTemplateResults, [key]: result };
            }
          );
          this._subTemplateUnsubs.set(key, unsub);
        } catch (e2) {
          console.warn(`[ians-room-card] Sub-button template error (${key}):`, e2);
        }
      }
    }
  }
  async _unsubscribeSubButtonTemplates() {
    for (const unsub of this._subTemplateUnsubs.values()) {
      try {
        await unsub();
      } catch (e2) {
      }
    }
    this._subTemplateUnsubs.clear();
    this._subTemplateResults = {};
  }
  // ── CSS variable application ───────────────────────────────────────────────
  _applyConfigStyles() {
    const c2 = this._config;
    if (!c2) return;
    const resolve = (field, configValue) => {
      var _a2;
      return (_a2 = this._templateResults[field]) != null ? _a2 : configValue;
    };
    this._setCSSVar(
      "--ians-card-background-color",
      resolve("background_color", c2.background_color)
    );
    this._setCSSVar(
      "--ians-card-background-opacity",
      c2.background_opacity !== void 0 ? String(c2.background_opacity) : void 0
    );
    this._setCSSVar(
      "--ians-card-border-color",
      resolve("border_color", c2.border_color)
    );
    this._setCSSVar(
      "--ians-card-border-opacity",
      c2.border_opacity !== void 0 ? String(c2.border_opacity) : void 0
    );
    this._setCSSVar("--ians-icon-color", resolve("icon_color", c2.icon_color));
    this._setCSSVar(
      "--ians-icon-background-color",
      c2.icon_background_color
    );
    this._setCSSVar("--ians-badge-color", resolve("badge_color", c2.badge_color));
    this._setCSSVar(
      "--ians-badge-background-color",
      c2.badge_background_color
    );
  }
  // ── Action handlers ────────────────────────────────────────────────────────
  _setupSubButtonHandlers() {
    var _a2;
    this._cleanupSubButtonHandlers();
    const c2 = this._config;
    if (!(c2 == null ? void 0 : c2.sub_buttons) || c2.global_action) return;
    const subBtnEls = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelectorAll(".sub-button");
    if (!subBtnEls) return;
    subBtnEls.forEach((el, i2) => {
      var _a3, _b2, _c2;
      const btn = c2.sub_buttons[i2];
      if (!btn) return;
      const actionConfig = {
        entity: btn.entity,
        tap_action: (_a3 = btn.tap_action) != null ? _a3 : { action: "more-info" },
        hold_action: (_b2 = btn.hold_action) != null ? _b2 : { action: "more-info" },
        double_tap_action: (_c2 = btn.double_tap_action) != null ? _c2 : { action: "none" }
      };
      const cleanup = attachActionHandler(
        el,
        actionConfig,
        (action) => dispatchAction(el, actionConfig, action)
      );
      this._subButtonCleanups.push(cleanup);
    });
  }
  _cleanupSubButtonHandlers() {
    for (const cleanup of this._subButtonCleanups) cleanup();
    this._subButtonCleanups = [];
  }
  _setupCardActionHandler() {
    var _a2, _b2;
    (_a2 = this._cardActionCleanup) == null ? void 0 : _a2.call(this);
    this._cardActionCleanup = void 0;
    const c2 = this._config;
    if (!(c2 == null ? void 0 : c2.global_action)) return;
    const haCard = (_b2 = this.shadowRoot) == null ? void 0 : _b2.querySelector("ha-card");
    if (!haCard) return;
    const actionConfig = {
      entity: c2.entity,
      tap_action: c2.global_action.tap_action,
      hold_action: c2.global_action.hold_action,
      double_tap_action: c2.global_action.double_tap_action
    };
    this._cardActionCleanup = attachActionHandler(
      haCard,
      actionConfig,
      (action) => dispatchAction(haCard, actionConfig, action)
    );
  }
  _setCSSVar(prop, value) {
    if (value !== void 0 && value !== "") {
      this.style.setProperty(prop, value);
    } else {
      this.style.removeProperty(prop);
    }
  }
  // ── Render ─────────────────────────────────────────────────────────────────
  render() {
    var _a2, _b2;
    if (!this._config) return A;
    const c2 = this._config;
    const hasErrors = Object.keys(this._templateErrors).length > 0;
    const isInteractive = !!c2.global_action;
    const icon = (_a2 = this._templateResults.icon) != null ? _a2 : c2.icon;
    const badgeIcon = (_b2 = this._templateResults.badge_icon) != null ? _b2 : c2.badge_icon;
    const title = this._resolveTitle();
    let bgImageUrl;
    if (c2.background_image === "area") {
      bgImageUrl = this.hass ? resolveAreaImage(this.hass, c2.entity) : void 0;
    } else if (c2.background_image) {
      bgImageUrl = c2.background_image;
    }
    const bgImageStyle = bgImageUrl ? `background-image: url('${bgImageUrl}');` : "";
    return b`
      <ha-card
        part="card"
        class=${[
      hasErrors ? "has-template-error" : "",
      isInteractive ? "interactive" : ""
    ].filter(Boolean).join(" ")}
      >
        <!-- Background: color layer (opacity-controlled) -->
        <div part="background" class="card-background-color"></div>
        <!-- Background: image layer (always full opacity) -->
        ${bgImageStyle ? b`<div
              class="card-background-image"
              style=${bgImageStyle}
            ></div>` : A}

        <!-- Content -->
        <div class="card-inner">
          <!-- Header: icon + title -->
          <div part="header" class="card-header">
            ${icon !== void 0 ? b`
                  <div part="icon-container" class="icon-container">
                    <ha-icon part="icon" .icon=${icon}></ha-icon>
                    ${badgeIcon ? b`
                          <div part="badge" class="badge">
                            <ha-icon
                              part="badge-icon"
                              .icon=${badgeIcon}
                            ></ha-icon>
                          </div>
                        ` : A}
                  </div>
                ` : A}
            ${title ? b`<span part="title" class="card-title">${title}</span>` : A}
          </div>

          <!-- Template error indicator -->
          ${hasErrors ? b`
                <div class="template-error">
                  <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                  <span>Template error — check browser console</span>
                </div>
              ` : A}

          <!-- Sub-buttons -->
          ${this._renderSubButtons()}
        </div>
      </ha-card>
    `;
  }
  // ── Helpers ────────────────────────────────────────────────────────────────
  _renderSubButtons() {
    var _a2, _b2;
    const c2 = this._config;
    if (!((_a2 = c2 == null ? void 0 : c2.sub_buttons) == null ? void 0 : _a2.length)) return A;
    const layout = (_b2 = c2.sub_buttons_layout) != null ? _b2 : "bottom-row";
    const isAbsolute = layout === "corners" || layout === "custom";
    const isGlobal = !!c2.global_action;
    const buttons = c2.sub_buttons.map((btn, i2) => {
      var _a3, _b3, _c2, _d2, _e2, _f2, _g;
      const entityState = btn.entity ? (_a3 = this.hass) == null ? void 0 : _a3.states[btn.entity] : void 0;
      let icon = (_d2 = (_c2 = (_b3 = this._subTemplateResults[`sub_${i2}_icon`]) != null ? _b3 : btn.icon) != null ? _c2 : entityState == null ? void 0 : entityState.attributes.icon) != null ? _d2 : "mdi:circle";
      let label;
      if (btn.label !== void 0) {
        if (btn.label === "entity" && entityState) {
          label = (_e2 = entityState.attributes.friendly_name) != null ? _e2 : btn.entity;
        } else {
          label = (_f2 = this._subTemplateResults[`sub_${i2}_label`]) != null ? _f2 : btn.label;
        }
      }
      let posClass = "";
      if (layout === "corners") {
        posClass = `pos-${(_g = CORNER_POSITIONS[i2]) != null ? _g : "bottom-right"}`;
      } else if (layout === "custom" && btn.position) {
        posClass = `pos-${btn.position}`;
      }
      const classes = [
        "sub-button",
        btn.background !== false ? "has-background" : "",
        isGlobal ? "display-only" : "",
        posClass
      ].filter(Boolean).join(" ");
      return b`
        <div class=${classes} part="sub-button">
          ${btn.show_icon !== false ? b`<ha-icon part="sub-button-icon" .icon=${icon}></ha-icon>` : A}
          ${btn.show_label && label ? b`<span part="sub-button-label" class="sub-button-label"
                >${label}</span
              >` : A}
          ${btn.show_state && entityState ? b`<span part="sub-button-state" class="sub-button-state"
                >${entityState.state}</span
              >` : A}
        </div>
      `;
    });
    const containerClasses = [
      "sub-buttons",
      `layout-${layout}`,
      isAbsolute ? "absolute-layout" : ""
    ].filter(Boolean).join(" ");
    return b`<div part="sub-buttons" class=${containerClasses}>
      ${buttons}
    </div>`;
  }
  _resolveTitle() {
    var _a2, _b2;
    const c2 = this._config;
    if (!c2) return void 0;
    if (this._templateResults.title) return this._templateResults.title;
    if (!c2.title) return void 0;
    if (c2.title === "entity" && c2.entity && this.hass) {
      return (_b2 = (_a2 = this.hass.states[c2.entity]) == null ? void 0 : _a2.attributes.friendly_name) != null ? _b2 : c2.entity;
    }
    return c2.title;
  }
  // ── Styles ─────────────────────────────────────────────────────────────────
  static get styles() {
    return cardStyles;
  }
};
__decorateClass([
  n2({ attribute: false })
], IansCustomRoomCard.prototype, "hass", 2);
__decorateClass([
  r()
], IansCustomRoomCard.prototype, "_config", 2);
__decorateClass([
  r()
], IansCustomRoomCard.prototype, "_templateResults", 2);
__decorateClass([
  r()
], IansCustomRoomCard.prototype, "_templateErrors", 2);
__decorateClass([
  r()
], IansCustomRoomCard.prototype, "_subTemplateResults", 2);
IansCustomRoomCard = __decorateClass([
  t(CARD_TYPE)
], IansCustomRoomCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TYPE,
  name: CARD_NAME,
  description: CARD_DESCRIPTION,
  preview: false,
  documentationURL: "https://github.com/IanStanek/ha-ians-custom-room-card"
});
export {
  IansCustomRoomCard
};
