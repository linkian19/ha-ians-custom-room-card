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
    height: 100%;
    min-height: 64px;
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
    --ians-title-align: left;
    --ians-sub-button-icon-color: var(--primary-text-color);
    --ians-sub-button-background-color: rgba(255, 255, 255, 0.1);
    --ians-sub-button-size: 32px;
    --ians-sub-button-gap: 6px;
    --ians-sub-button-opacity: 1;
  }

  ha-card {
    --ha-card-background: transparent;
    position: relative;
    height: 100%;
    min-height: 64px;
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
    padding: 12px;
    box-sizing: border-box;
    gap: 8px;
  }

  /* ── Header: icon + title ────────────────────────────────────────────────── */
  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    min-width: 0;
    order: 1;
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
    font-weight: 500;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
    text-align: var(--ians-title-align);
  }

  /* Title with absolute position — rendered as direct child of ha-card, same
     z-index 2 approach as icon-absolute but placed AFTER card-inner in DOM */
  .card-title-absolute {
    position: absolute;
    z-index: 4;
    color: var(--ians-title-color);
    font-size: var(--ians-title-font-size);
    font-weight: 500;
    line-height: 1.3;
    pointer-events: none;
    max-width: calc(100% - 24px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    touch-action: none; /* prevent scroll interference during global-action gesture detection */
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
    justify-content: flex-start;
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
    justify-content: flex-start;
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
    touch-action: none;
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

  /* Absolute positions for corners/custom layouts */
  .sub-button.pos-top-left    { position: absolute; top: 8px;    left: 8px; }
  .sub-button.pos-top-center  { position: absolute; top: 8px;    left: 50%; transform: translateX(-50%); }
  .sub-button.pos-top-right   { position: absolute; top: 8px;    right: 8px; }
  .sub-button.pos-bottom-left  { position: absolute; bottom: 8px; left: 8px; }
  .sub-button.pos-bottom-center { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); }
  .sub-button.pos-bottom-right { position: absolute; bottom: 8px; right: 8px; }

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
const ICON_POSITION_OPTIONS = [
  { value: "", label: "Default (inline with title)" },
  { value: "top-left", label: "Top Left" },
  { value: "top-right", label: "Top Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-right", label: "Bottom Right" },
  { value: "center", label: "Center" },
  { value: "center-left", label: "Center Left" },
  { value: "center-right", label: "Center Right" },
  { value: "custom", label: "Custom (% recommended for responsive)" }
];
const TITLE_POSITION_OPTIONS = [
  { value: "", label: "Default (inline with icon)" },
  { value: "top-left", label: "Top Left" },
  { value: "top-center", label: "Top Center" },
  { value: "top-right", label: "Top Right" },
  { value: "center-left", label: "Center Left" },
  { value: "center", label: "Center" },
  { value: "center-right", label: "Center Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-right", label: "Bottom Right" },
  { value: "custom", label: "Custom (% recommended for responsive)" }
];
const TITLE_ALIGN_OPTIONS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" }
];
const BADGE_POSITION_OPTIONS = [
  { value: "top-right", label: "Top Right (default)" },
  { value: "top-left", label: "Top Left" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-right", label: "Bottom Right" },
  { value: "custom", label: "Custom" }
];
const ICON_SHAPE_OPTIONS = [
  { value: "circle", label: "Circle (default)" },
  { value: "rounded-rect", label: "Rounded Rectangle" },
  { value: "squircle", label: "Squircle" },
  { value: "square", label: "Square" }
];
const SUB_BUTTON_LAYOUT_OPTIONS = [
  { value: "bottom-row", label: "Bottom Row" },
  { value: "top-row", label: "Top Row" },
  { value: "right-column", label: "Right Column" },
  { value: "left-column", label: "Left Column" },
  { value: "corners", label: "Corners (up to 4)" },
  { value: "grid", label: "Grid" },
  { value: "custom", label: "Custom positions" }
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
const OPACITY_SELECTOR = { number: { min: 0, max: 1, step: 0.05, mode: "slider" } };
function cssToHex(value) {
  if (!value) return "#000000";
  if (/^#[0-9a-f]{6}$/i.test(value)) return value.toLowerCase();
  if (/^#[0-9a-f]{3}$/i.test(value)) {
    const [, r2, g2, b2] = value.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
    return `#${r2}${r2}${g2}${g2}${b2}${b2}`.toLowerCase();
  }
  return "#000000";
}
let IansCustomRoomCardEditor = class extends i {
  constructor() {
    super(...arguments);
    this._loaded = false;
    this._templateMode = /* @__PURE__ */ new Set();
    this._expandedSubButton = null;
    this._activeTab = "basic";
  }
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
      if (val && isTemplate(val)) templateSet.add(field);
    }
    this._templateMode = templateSet;
  }
  // ── Event helpers ────────────────────────────────────────────────────────────
  _fireConfigChanged(config) {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true
    }));
  }
  _fieldChanged(field, value) {
    if (!this._config) return;
    this._fireConfigChanged({ ...this._config, [field]: value });
  }
  _gridFieldChanged(field, value) {
    var _a2;
    if (!this._config) return;
    this._fireConfigChanged({
      ...this._config,
      grid_options: { ...(_a2 = this._config.grid_options) != null ? _a2 : {}, [field]: value }
    });
  }
  _globalActionFieldChanged(field, value) {
    var _a2;
    if (!this._config) return;
    this._fireConfigChanged({
      ...this._config,
      global_action: { ...(_a2 = this._config.global_action) != null ? _a2 : {}, [field]: value }
    });
  }
  _subButtonChanged(index, patch) {
    var _a2;
    if (!((_a2 = this._config) == null ? void 0 : _a2.sub_buttons)) return;
    const buttons = [...this._config.sub_buttons];
    buttons[index] = { ...buttons[index], ...patch };
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
      state_based_color: false,
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
    next.has(field) ? next.delete(field) : next.add(field);
    this._templateMode = next;
  }
  // ── Render helpers ────────────────────────────────────────────────────────────
  /** Color swatch + native text input, with optional label and template toggle.
   *
   *  When showLabel=true (default): a header row shows the label, and the
   *  template button (if applicable) sits inline with the label at the right.
   *
   *  When showLabel=false: no header is rendered. If template-capable, the
   *  template button is placed inside the color-row itself (after the text input),
   *  so it's naturally center-aligned by the row's align-items:center. */
  _renderColorField(fieldKey, label, placeholder = "e.g. red, #ff0000, var(--primary-color)", showLabel = true) {
    var _a2, _b2;
    const isTemplateCapable = TEMPLATE_CAPABLE_FIELDS.has(fieldKey);
    const currentValue = (_b2 = (_a2 = this._config) == null ? void 0 : _a2[fieldKey]) != null ? _b2 : "";
    const inTemplateMode = isTemplateCapable && this._templateMode.has(fieldKey);
    const tmplBtn = isTemplateCapable ? b`
      <button
        class="tmpl-btn ${inTemplateMode ? "active" : ""}"
        title="${inTemplateMode ? "Jinja2 template active — click to switch back to simple input" : "Click to enter a Jinja2 template (e.g. {{ states('sensor.temp') }})"}"
        @click=${() => this._toggleTemplateMode(fieldKey)}
      ><ha-icon icon="mdi:code-braces" class="tmpl-icon"></ha-icon></button>
    ` : A;
    if (inTemplateMode) {
      return b`
        <div class="color-field">
          ${showLabel ? b`<span class="color-field-label">${label}</span>` : A}
          <div class="color-tmpl-row">
            <textarea
              .value=${currentValue}
              placeholder="{{ states('sensor.example') }}"
              @change=${(ev) => this._fieldChanged(fieldKey, ev.target.value)}
              @input=${(ev) => this._fieldChanged(fieldKey, ev.target.value)}
            ></textarea>
            ${tmplBtn}
          </div>
          <div class="hint">HA Jinja2 template</div>
        </div>
      `;
    }
    return b`
      <div class="color-field">
        ${showLabel ? b`
          <div class="color-field-header">
            <span class="color-field-label">${label}</span>
            ${tmplBtn}
          </div>
        ` : A}
        <div class="color-row">
          <label class="color-btn" title="Click to open color picker">
            <div class="color-checker"></div>
            <div class="color-fill" style="background: ${currentValue || "transparent"}"></div>
            <ha-icon icon="mdi:eyedropper-variant" class="color-icon"></ha-icon>
            <input
              type="color"
              class="color-native"
              .value=${cssToHex(currentValue)}
              @change=${(ev) => this._fieldChanged(fieldKey, ev.target.value || void 0)}
            />
          </label>
          <input
            type="text"
            class="color-text-input"
            .value=${currentValue}
            placeholder=${placeholder}
            @change=${(ev) => this._fieldChanged(fieldKey, ev.target.value || void 0)}
            @input=${(ev) => this._fieldChanged(fieldKey, ev.target.value || void 0)}
          />
          ${!showLabel ? tmplBtn : A}
        </div>
      </div>
    `;
  }
  /** Same color field but reads from SubButtonConfig (not top-level CardConfig). */
  _renderSubBtnColorField(btn, index, field, label, placeholder = "e.g. #ff9800, var(--primary-color)") {
    var _a2;
    const currentValue = (_a2 = btn[field]) != null ? _a2 : "";
    return b`
      <div class="color-field">
        <span class="color-field-label">${label}</span>
        <div class="color-row">
          <label class="color-btn" title="Click to open color picker">
            <div class="color-checker"></div>
            <div class="color-fill" style="background: ${currentValue || "transparent"}"></div>
            <ha-icon icon="mdi:eyedropper-variant" class="color-icon"></ha-icon>
            <input
              type="color"
              class="color-native"
              .value=${cssToHex(currentValue)}
              @change=${(ev) => this._subButtonChanged(index, { [field]: ev.target.value || void 0 })}
            />
          </label>
          <input
            type="text"
            class="color-text-input"
            .value=${currentValue}
            placeholder=${placeholder}
            @change=${(ev) => this._subButtonChanged(index, { [field]: ev.target.value || void 0 })}
            @input=${(ev) => this._subButtonChanged(index, { [field]: ev.target.value || void 0 })}
          />
        </div>
      </div>
    `;
  }
  _renderTemplateField(fieldKey, label, renderWidget) {
    var _a2, _b2;
    const inTemplateMode = this._templateMode.has(fieldKey);
    const currentValue = (_b2 = (_a2 = this._config) == null ? void 0 : _a2[fieldKey]) != null ? _b2 : "";
    return b`
      <div class="template-row">
        <div class="template-input">
          ${inTemplateMode ? b`
                <textarea
                  .value=${currentValue}
                  placeholder="{{ states('sensor.example') }}"
                  @change=${(ev) => this._fieldChanged(fieldKey, ev.target.value)}
                  @input=${(ev) => this._fieldChanged(fieldKey, ev.target.value)}
                ></textarea>
                <div class="hint">HA Jinja2 template</div>
              ` : renderWidget()}
        </div>
        <button
          class="tmpl-btn ${inTemplateMode ? "active" : ""}"
          title="${inTemplateMode ? "Jinja2 template active — click to switch back to simple input" : "Click to enter a Jinja2 template (e.g. {{ states('sensor.temp') }})"}"
          @click=${() => this._toggleTemplateMode(fieldKey)}
        ><ha-icon icon="mdi:code-braces" class="tmpl-icon"></ha-icon></button>
      </div>
    `;
  }
  _renderOpacityField(fieldKey, label, defaultVal = 1) {
    var _a2, _b2;
    const hint = "Use this slider for element opacity. For color transparency, add alpha to the color value instead (e.g. rgba(255,0,0,0.5)).";
    return b`
      <ha-selector
        .hass=${this.hass}
        .label=${label}
        .selector=${OPACITY_SELECTOR}
        .value=${(_b2 = (_a2 = this._config) == null ? void 0 : _a2[fieldKey]) != null ? _b2 : defaultVal}
        title=${hint}
        @value-changed=${(ev) => this._fieldChanged(fieldKey, ev.detail.value)}
      ></ha-selector>
    `;
  }
  _renderNumField(fieldKey, label, min, max, step, defaultVal, suffix = "") {
    var _a2, _b2;
    return b`
      <ha-selector
        .hass=${this.hass}
        .label=${label}
        .selector=${{ number: { min, max, step, mode: "box", ...suffix ? { unit_of_measurement: suffix } : {} } }}
        .value=${(_b2 = (_a2 = this._config) == null ? void 0 : _a2[fieldKey]) != null ? _b2 : defaultVal}
        @value-changed=${(ev) => this._fieldChanged(fieldKey, ev.detail.value)}
      ></ha-selector>
    `;
  }
  _renderCoordFields(xKey, yKey, xLabel = "X (CSS)", yLabel = "Y (CSS)") {
    var _a2, _b2, _c2, _d2;
    return b`
      <div class="two-col">
        <ha-selector .hass=${this.hass} .label=${xLabel}
          .selector=${{ text: {} }}
          .value=${(_b2 = (_a2 = this._config) == null ? void 0 : _a2[xKey]) != null ? _b2 : ""}
          .placeholder=${"e.g. 10px, 25%"}
          @value-changed=${(ev) => this._fieldChanged(xKey, ev.detail.value || void 0)}
        ></ha-selector>
        <ha-selector .hass=${this.hass} .label=${yLabel}
          .selector=${{ text: {} }}
          .value=${(_d2 = (_c2 = this._config) == null ? void 0 : _c2[yKey]) != null ? _d2 : ""}
          .placeholder=${"e.g. 10px, 25%"}
          @value-changed=${(ev) => this._fieldChanged(yKey, ev.detail.value || void 0)}
        ></ha-selector>
      </div>
      <div class="hint">Tip: use <code>%</code> values (e.g. <code>25%</code>) for positions that adapt to card size. Fixed <code>px</code> values stay constant when the card is resized.</div>
    `;
  }
  // ── Tab bar ──────────────────────────────────────────────────────────────────
  _renderTabBar() {
    const tabs = [
      { id: "basic", label: "Basic" },
      { id: "icon", label: "Icon" },
      { id: "card", label: "Card" },
      { id: "buttons", label: "Buttons" },
      { id: "actions", label: "Actions" }
    ];
    return b`
      <div class="tab-bar">
        ${tabs.map((t2) => b`
          <button
            class="tab ${this._activeTab === t2.id ? "active" : ""}"
            @click=${() => {
      this._activeTab = t2.id;
    }}
          >${t2.label}</button>
        `)}
      </div>
    `;
  }
  // ── Tab content ───────────────────────────────────────────────────────────────
  _renderBasicTab() {
    var _a2, _b2, _c2;
    const c2 = this._config;
    return b`
      <div class="section">
        <div class="section-label">Entity</div>
        <ha-entity-picker
          .hass=${this.hass}
          .label=${"Entity (optional)"}
          .value=${(_a2 = c2.entity) != null ? _a2 : ""}
          allow-custom-entity
          @value-changed=${(ev) => this._fieldChanged("entity", ev.detail.value || void 0)}
        ></ha-entity-picker>
      </div>

      <div class="section">
        <div class="section-label">Title</div>
        ${this._renderTemplateField(
      "title",
      "Title",
      () => {
        var _a3;
        return b`
            <ha-selector .hass=${this.hass} .label=${"Title"}
              .selector=${{ text: {} }}
              .value=${(_a3 = c2.title) != null ? _a3 : ""}
              .placeholder=${"Room name, or leave blank to hide"}
              @value-changed=${(ev) => this._fieldChanged("title", ev.detail.value || void 0)}
            ></ha-selector>
          `;
      }
    )}

        <ha-selector .hass=${this.hass} .label=${"Position"}
          .selector=${{ select: { options: TITLE_POSITION_OPTIONS, mode: "dropdown" } }}
          .value=${(_b2 = c2.title_position) != null ? _b2 : ""}
          @value-changed=${(ev) => this._fieldChanged("title_position", ev.detail.value || void 0)}
        ></ha-selector>

        ${c2.title_position === "custom" ? this._renderCoordFields("title_position_x", "title_position_y", "X offset", "Y offset") : A}

        ${!c2.title_position ? b`
          <ha-selector .hass=${this.hass} .label=${"Text Alignment"}
            .selector=${{ select: { options: TITLE_ALIGN_OPTIONS, mode: "list" } }}
            .value=${(_c2 = c2.title_align) != null ? _c2 : "left"}
            @value-changed=${(ev) => this._fieldChanged("title_align", ev.detail.value || void 0)}
          ></ha-selector>
        ` : A}

        ${this._renderNumField("title_font_size", "Font Size", 8, 48, 1, 14, "px")}
        ${this._renderColorField("title_color", "Title Color", "e.g. white, #ffffff")}
      </div>

      <div class="section">
        <div class="section-label">Icon</div>
        ${this._renderTemplateField(
      "icon",
      "Icon",
      () => {
        var _a3;
        return b`
            <ha-icon-picker .hass=${this.hass} .label=${"Icon"}
              .value=${(_a3 = c2.icon) != null ? _a3 : ""}
              @value-changed=${(ev) => this._fieldChanged("icon", ev.detail.value || void 0)}
            ></ha-icon-picker>
          `;
      }
    )}
      </div>
    `;
  }
  _renderIconTab() {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i, _j, _k, _l, _m;
    const c2 = this._config;
    return b`
      <!-- ── Icon color ── -->
      <div class="section">
        <div class="section-label">Icon Color</div>
        ${this._renderColorField("icon_color", "Icon Color", void 0, false)}

        <ha-form
          .hass=${this.hass}
          .data=${{ state_based_color: (_a2 = c2.state_based_color) != null ? _a2 : false }}
          .schema=${[{ name: "state_based_color", label: "Auto-color by entity state", selector: { boolean: {} } }]}
          .computeLabel=${(s2) => s2.label}
          @value-changed=${(ev) => this._fieldChanged("state_based_color", ev.detail.value.state_based_color)}
        ></ha-form>

        ${c2.state_based_color ? b`
          <div class="hint">When active (on/open/playing/home): uses the color below or a domain default (yellow for lights). When inactive: uses the off-color or falls back to Icon Color.</div>
          ${this._renderColorField("icon_color_on", "Active Color (on/open/playing)", "e.g. #FDD835, yellow")}
          ${this._renderColorField("icon_color_off", "Inactive Color (off/closed)", "e.g. #888888, grey")}
        ` : A}

        <ha-selector .hass=${this.hass} .label=${"Icon Opacity"}
          .selector=${OPACITY_SELECTOR} .value=${(_b2 = c2.icon_opacity) != null ? _b2 : 1}
          @value-changed=${(ev) => this._fieldChanged("icon_opacity", ev.detail.value)}
        ></ha-selector>
      </div>

      <!-- ── Icon background ── -->
      <div class="section">
        <div class="section-label">Icon Background</div>
        <ha-selector .hass=${this.hass} .label=${"Shape"}
          .selector=${{ select: { options: ICON_SHAPE_OPTIONS, mode: "dropdown" } }}
          .value=${(_c2 = c2.icon_background_shape) != null ? _c2 : "circle"}
          @value-changed=${(ev) => this._fieldChanged("icon_background_shape", ev.detail.value || void 0)}
        ></ha-selector>

        <ha-selector .hass=${this.hass} .label=${"Custom Border Radius (CSS — overrides shape)"}
          .selector=${{ text: {} }}
          .value=${(_d2 = c2.icon_background_border_radius) != null ? _d2 : ""}
          .placeholder=${"e.g. 10px 20px 30px 40px, 50% 0"}
          @value-changed=${(ev) => this._fieldChanged("icon_background_border_radius", ev.detail.value || void 0)}
        ></ha-selector>

        ${this._renderColorField("icon_background_color", "Background Color")}

        <ha-selector .hass=${this.hass} .label=${"Background Opacity"}
          .selector=${OPACITY_SELECTOR} .value=${(_e2 = c2.icon_background_opacity) != null ? _e2 : 1}
          @value-changed=${(ev) => this._fieldChanged("icon_background_opacity", ev.detail.value)}
        ></ha-selector>

        <div class="two-col">
          ${this._renderNumField("icon_size", "Icon Size", 8, 120, 2, 24, "px")}
          ${this._renderNumField("icon_background_size", "Background Size", 8, 160, 2, 40, "px")}
        </div>

        <div class="hint">Width/Height override Background Size for non-square backgrounds.</div>
        <div class="two-col">
          ${this._renderNumField("icon_background_width", "Width", 8, 200, 2, (_f2 = c2.icon_background_size) != null ? _f2 : 40, "px")}
          ${this._renderNumField("icon_background_height", "Height", 8, 200, 2, (_g = c2.icon_background_size) != null ? _g : 40, "px")}
        </div>

        <ha-selector .hass=${this.hass} .label=${"Background Position (independent of icon)"}
          .selector=${{ select: { options: ICON_POSITION_OPTIONS, mode: "dropdown" } }}
          .value=${(_h = c2.icon_background_position) != null ? _h : ""}
          @value-changed=${(ev) => this._fieldChanged("icon_background_position", ev.detail.value || void 0)}
        ></ha-selector>
        ${c2.icon_background_position === "custom" ? this._renderCoordFields("icon_background_position_x", "icon_background_position_y", "X offset", "Y offset") : A}
        ${c2.icon_background_position ? b`
          <div class="hint">The background shape renders at this position; the icon renders at its own position below with no background behind it.</div>
        ` : A}
      </div>

      <!-- ── Icon position ── -->
      <div class="section">
        <div class="section-label">Icon Position</div>
        <ha-selector .hass=${this.hass} .label=${"Position"}
          .selector=${{ select: { options: ICON_POSITION_OPTIONS, mode: "dropdown" } }}
          .value=${(_i = c2.icon_position) != null ? _i : ""}
          @value-changed=${(ev) => this._fieldChanged("icon_position", ev.detail.value || void 0)}
        ></ha-selector>
        ${c2.icon_position === "custom" ? this._renderCoordFields("icon_position_x", "icon_position_y", "X offset", "Y offset") : A}
        <div class="hint">Size fields accept whole numbers (px applied automatically). Coordinate fields accept any CSS value — use <code>%</code> for responsive positioning or <code>px</code> for fixed.</div>
      </div>

      <!-- ── Badge ── -->
      <div class="section">
        <div class="section-label">Badge</div>
        ${this._renderTemplateField(
      "badge_icon",
      "Badge Icon",
      () => {
        var _a3;
        return b`
            <ha-icon-picker .hass=${this.hass} .label=${"Badge Icon (blank to hide)"}
              .value=${(_a3 = c2.badge_icon) != null ? _a3 : ""}
              @value-changed=${(ev) => this._fieldChanged("badge_icon", ev.detail.value || void 0)}
            ></ha-icon-picker>
          `;
      }
    )}

        ${this._renderColorField("badge_color", "Badge Icon Color")}
        ${this._renderColorField("badge_background_color", "Badge Background Color")}

        <div class="two-col">
          ${this._renderNumField("badge_size", "Badge Size", 8, 48, 1, 18, "px")}
          <ha-selector .hass=${this.hass} .label=${"Opacity"}
            .selector=${OPACITY_SELECTOR} .value=${(_j = c2.badge_opacity) != null ? _j : 1}
            @value-changed=${(ev) => this._fieldChanged("badge_opacity", ev.detail.value)}
          ></ha-selector>
        </div>

        <ha-selector .hass=${this.hass} .label=${"Badge Position"}
          .selector=${{ select: { options: BADGE_POSITION_OPTIONS, mode: "dropdown" } }}
          .value=${(_k = c2.badge_position) != null ? _k : "top-right"}
          @value-changed=${(ev) => this._fieldChanged("badge_position", ev.detail.value || void 0)}
        ></ha-selector>
        ${c2.badge_position === "custom" ? b`
          <div class="two-col">
            <ha-selector .hass=${this.hass} .label=${"X (CSS)"} .selector=${{ text: {} }}
              .value=${(_l = c2.badge_position_x) != null ? _l : ""} .placeholder=${"e.g. 10px"}
              @value-changed=${(ev) => this._fieldChanged("badge_position_x", ev.detail.value || void 0)}
            ></ha-selector>
            <ha-selector .hass=${this.hass} .label=${"Y (CSS)"} .selector=${{ text: {} }}
              .value=${(_m = c2.badge_position_y) != null ? _m : ""} .placeholder=${"e.g. 10px"}
              @value-changed=${(ev) => this._fieldChanged("badge_position_y", ev.detail.value || void 0)}
            ></ha-selector>
          </div>
        ` : A}
      </div>
    `;
  }
  _renderCardTab() {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i;
    const c2 = this._config;
    return b`
      <!-- ── Background ── -->
      <div class="section">
        <div class="section-label">Background</div>
        ${this._renderColorField("background_color", "Background Color", void 0, false)}
        <ha-selector .hass=${this.hass} .label=${"Opacity"}
          .selector=${OPACITY_SELECTOR} .value=${(_a2 = c2.background_opacity) != null ? _a2 : 1}
          @value-changed=${(ev) => this._fieldChanged("background_opacity", ev.detail.value)}
        ></ha-selector>
        <ha-selector .hass=${this.hass} .label=${"Image URL (or type 'area' to use room picture)"}
          .selector=${{ text: {} }} .value=${(_b2 = c2.background_image) != null ? _b2 : ""}
          .placeholder=${"e.g. /local/room.jpg   or   area"}
          @value-changed=${(ev) => this._fieldChanged("background_image", ev.detail.value || void 0)}
        ></ha-selector>

        ${c2.background_image ? b`
          <ha-selector .hass=${this.hass} .label=${"Image Position (CSS background-position)"}
            .selector=${{ text: {} }} .value=${(_c2 = c2.background_image_position) != null ? _c2 : ""}
            .placeholder=${"e.g. center, top right, 75% 25%"}
            @value-changed=${(ev) => this._fieldChanged("background_image_position", ev.detail.value || void 0)}
          ></ha-selector>
        ` : A}
      </div>

      <!-- ── Hover highlight ── -->
      <div class="section">
        <div class="section-label">Interaction</div>
        <ha-form
          .hass=${this.hass}
          .data=${{ hover_highlight: (_d2 = c2.hover_highlight) != null ? _d2 : true }}
          .schema=${[{
      name: "hover_highlight",
      label: "Show hover highlight (ripple overlay on mouse-over)",
      selector: { boolean: {} }
    }]}
          .computeLabel=${(s2) => s2.label}
          @value-changed=${(ev) => this._fieldChanged("hover_highlight", ev.detail.value.hover_highlight)}
        ></ha-form>
        <div class="hint">When enabled, a subtle white overlay appears on hover. Enabled by default when a Global Action is configured.</div>
      </div>

      <!-- ── Border ── -->
      <div class="section">
        <div class="section-label">Border</div>
        ${this._renderColorField("border_color", "Border Color", void 0, false)}
        <ha-selector .hass=${this.hass} .label=${"Opacity"}
          .selector=${OPACITY_SELECTOR} .value=${(_e2 = c2.border_opacity) != null ? _e2 : 1}
          @value-changed=${(ev) => this._fieldChanged("border_opacity", ev.detail.value)}
        ></ha-selector>
      </div>

      <!-- ── Grid sizing ── -->
      <div class="section">
        <div class="section-label">Grid Sizing (Sections Dashboard)</div>
        <div class="two-col">
          <ha-selector .hass=${this.hass} .label=${"Columns"}
            .selector=${{ number: { min: 1, max: 12, step: 1, mode: "box" } }}
            .value=${(_g = (_f2 = c2.grid_options) == null ? void 0 : _f2.columns) != null ? _g : 6}
            @value-changed=${(ev) => this._gridFieldChanged("columns", ev.detail.value)}
          ></ha-selector>
          <ha-selector .hass=${this.hass} .label=${"Rows"}
            .selector=${{ number: { min: 1, max: 6, step: 1, mode: "box" } }}
            .value=${(_i = (_h = c2.grid_options) == null ? void 0 : _h.rows) != null ? _i : 2}
            @value-changed=${(ev) => this._gridFieldChanged("rows", ev.detail.value)}
          ></ha-selector>
        </div>
      </div>
    `;
  }
  _renderButtonsTab() {
    var _a2, _b2, _c2, _d2, _e2, _f2;
    const c2 = this._config;
    const layout = (_a2 = c2.sub_buttons_layout) != null ? _a2 : "bottom-row";
    return b`
      <!-- ── Layout ── -->
      <div class="section">
        <div class="section-label">Layout</div>
        <ha-selector .hass=${this.hass} .label=${"Layout"}
          .selector=${{ select: { options: SUB_BUTTON_LAYOUT_OPTIONS, mode: "dropdown" } }}
          .value=${layout}
          @value-changed=${(ev) => this._fieldChanged("sub_buttons_layout", ev.detail.value)}
        ></ha-selector>

        ${layout === "grid" ? b`
          <div class="two-col">
            <ha-selector .hass=${this.hass} .label=${"Columns (0 = auto-fill)"}
              .selector=${{ number: { min: 0, max: 8, step: 1, mode: "box" } }}
              .value=${(_b2 = c2.sub_buttons_grid_columns) != null ? _b2 : 0}
              @value-changed=${(ev) => this._fieldChanged("sub_buttons_grid_columns", ev.detail.value || void 0)}
            ></ha-selector>
            <ha-selector .hass=${this.hass} .label=${"Cell Min Width"}
              .selector=${{ number: { min: 32, max: 200, step: 4, mode: "box", unit_of_measurement: "px" } }}
              .value=${(_c2 = c2.sub_buttons_grid_min_width) != null ? _c2 : 56}
              @value-changed=${(ev) => this._fieldChanged("sub_buttons_grid_min_width", ev.detail.value)}
            ></ha-selector>
          </div>
        ` : A}
      </div>

      <!-- ── Global style ── -->
      <div class="section">
        <div class="section-label">Global Button Style</div>
        ${this._renderColorField("sub_button_icon_color", "Icon Color (default for all)")}
        ${this._renderColorField("sub_button_background_color", "Background Color (default for all)")}
        <div class="two-col">
          <ha-selector .hass=${this.hass} .label=${"Opacity"}
            .selector=${OPACITY_SELECTOR} .value=${(_d2 = c2.sub_button_opacity) != null ? _d2 : 1}
            @value-changed=${(ev) => this._fieldChanged("sub_button_opacity", ev.detail.value)}
          ></ha-selector>
          <ha-selector .hass=${this.hass} .label=${"Button Gap"}
            .selector=${{ number: { min: 0, max: 32, step: 1, mode: "box", unit_of_measurement: "px" } }}
            .value=${(_e2 = c2.sub_button_gap) != null ? _e2 : 6}
            @value-changed=${(ev) => this._fieldChanged("sub_button_gap", ev.detail.value)}
          ></ha-selector>
        </div>
      </div>

      <!-- ── Individual buttons ── -->
      <div class="section">
        <div class="section-label">Buttons</div>
        ${((_f2 = c2.sub_buttons) != null ? _f2 : []).map((btn, i2) => this._renderSubButtonRow(btn, i2))}
        <button class="add-btn" @click=${this._addSubButton}>+ Add Button</button>
      </div>
    `;
  }
  _renderActionsTab() {
    var _a2, _b2, _c2, _d2, _e2, _f2;
    const c2 = this._config;
    return b`
      <div class="section">
        <div class="section-label">Global Action</div>
        <div class="warning-box">
          When a global action is set, all sub-button tap/hold/double-tap actions are disabled.
          Sub-buttons become non-interactive decorations and the entire card is a single tap target.
        </div>

        <ha-selector .hass=${this.hass} .label=${"Tap Action"}
          .selector=${{ ui_action: {} }}
          .value=${(_b2 = (_a2 = c2.global_action) == null ? void 0 : _a2.tap_action) != null ? _b2 : { action: "none" }}
          @value-changed=${(ev) => this._globalActionFieldChanged("tap_action", ev.detail.value)}
        ></ha-selector>
        <ha-selector .hass=${this.hass} .label=${"Hold Action"}
          .selector=${{ ui_action: {} }}
          .value=${(_d2 = (_c2 = c2.global_action) == null ? void 0 : _c2.hold_action) != null ? _d2 : { action: "none" }}
          @value-changed=${(ev) => this._globalActionFieldChanged("hold_action", ev.detail.value)}
        ></ha-selector>
        <ha-selector .hass=${this.hass} .label=${"Double-Tap Action"}
          .selector=${{ ui_action: {} }}
          .value=${(_f2 = (_e2 = c2.global_action) == null ? void 0 : _e2.double_tap_action) != null ? _f2 : { action: "none" }}
          @value-changed=${(ev) => this._globalActionFieldChanged("double_tap_action", ev.detail.value)}
        ></ha-selector>

        <button class="clear-btn"
          @click=${() => {
      const cfg = { ...this._config };
      delete cfg.global_action;
      this._fireConfigChanged(cfg);
    }}
        >Clear Global Action</button>
      </div>
    `;
  }
  // ── Sub-button row ────────────────────────────────────────────────────────────
  _renderSubButtonRow(btn, index) {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i, _j, _k, _l, _m, _n, _o;
    const isExpanded = this._expandedSubButton === index;
    const label = (_c2 = (_b2 = (_a2 = btn.entity) != null ? _a2 : btn.label) != null ? _b2 : btn.icon) != null ? _c2 : `Sub-button ${index + 1}`;
    const layout = (_e2 = (_d2 = this._config) == null ? void 0 : _d2.sub_buttons_layout) != null ? _e2 : "bottom-row";
    const showPosition = layout === "custom";
    return b`
      <div class="sub-btn-row">
        <div class="sub-btn-header"
          @click=${() => this._expandedSubButton = isExpanded ? null : index}
        >
          <ha-icon .icon=${(_f2 = btn.icon) != null ? _f2 : "mdi:gesture-tap"}></ha-icon>
          <span class="sub-btn-label">${label}</span>
          <ha-icon .icon=${isExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
          <button class="del-btn"
            @click=${(ev) => {
      ev.stopPropagation();
      this._deleteSubButton(index);
    }}
          >✕</button>
        </div>

        ${isExpanded ? b`
          <div class="sub-btn-body">
            <!-- Entity & display -->
            <div class="sub-group-label">Entity &amp; Display</div>

            <ha-entity-picker .hass=${this.hass} .label=${"Entity"}
              .value=${(_g = btn.entity) != null ? _g : ""} allow-custom-entity
              @value-changed=${(ev) => this._subButtonChanged(index, { entity: ev.detail.value || void 0 })}
            ></ha-entity-picker>

            <ha-icon-picker .hass=${this.hass}
              .label=${"Icon (blank = auto-pick from entity domain)"}
              .value=${(_h = btn.icon) != null ? _h : ""}
              @value-changed=${(ev) => this._subButtonChanged(index, { icon: ev.detail.value || void 0 })}
            ></ha-icon-picker>

            <ha-selector .hass=${this.hass}
              .label=${"Label (blank to hide, or type 'entity' for entity name)"}
              .selector=${{ text: {} }} .value=${(_i = btn.label) != null ? _i : ""}
              @value-changed=${(ev) => this._subButtonChanged(index, { label: ev.detail.value || void 0 })}
            ></ha-selector>

            <ha-form .hass=${this.hass} .data=${btn}
              .schema=${[
      { name: "show_icon", label: "Show Icon", selector: { boolean: {} } },
      { name: "show_label", label: "Show Label", selector: { boolean: {} } },
      { name: "show_state", label: "Show State", selector: { boolean: {} } },
      { name: "background", label: "Show Background", selector: { boolean: {} } }
    ]}
              .computeLabel=${(s2) => s2.label}
              @value-changed=${(ev) => {
      this._subButtonChanged(index, {
        show_icon: ev.detail.value.show_icon,
        show_label: ev.detail.value.show_label,
        show_state: ev.detail.value.show_state,
        background: ev.detail.value.background
      });
    }}
            ></ha-form>

            <!-- Color & opacity -->
            <div class="sub-group-label">Color &amp; Opacity</div>

            <ha-form .hass=${this.hass}
              .data=${{ state_based_color: (_j = btn.state_based_color) != null ? _j : false }}
              .schema=${[{ name: "state_based_color", label: "Auto-color by entity state", selector: { boolean: {} } }]}
              .computeLabel=${(s2) => s2.label}
              @value-changed=${(ev) => this._subButtonChanged(index, { state_based_color: ev.detail.value.state_based_color })}
            ></ha-form>

            ${btn.state_based_color ? b`
              <div class="hint">Active when entity is on/open/home/playing. Defaults to domain color (yellow for lights) if left blank.</div>
              ${this._renderSubBtnColorField(btn, index, "icon_color_on", "Active Icon Color")}
              ${this._renderSubBtnColorField(btn, index, "icon_color_off", "Inactive Icon Color")}
            ` : b`
              ${this._renderSubBtnColorField(btn, index, "icon_color", "Icon Color")}
            `}

            ${this._renderSubBtnColorField(btn, index, "background_color", "Background Color", "e.g. rgba(255,255,255,0.15)")}

            <ha-selector .hass=${this.hass} .label=${"Button Opacity"}
              .selector=${OPACITY_SELECTOR} .value=${(_k = btn.opacity) != null ? _k : 1}
              @value-changed=${(ev) => this._subButtonChanged(index, { opacity: ev.detail.value })}
            ></ha-selector>

            ${showPosition ? b`
              <div class="sub-group-label">Position</div>
              <ha-selector .hass=${this.hass} .label=${"Position"}
                .selector=${{ select: { options: SUB_BUTTON_POSITION_OPTIONS, mode: "dropdown" } }}
                .value=${(_l = btn.position) != null ? _l : "bottom-left"}
                @value-changed=${(ev) => this._subButtonChanged(index, { position: ev.detail.value })}
              ></ha-selector>
            ` : A}

            <!-- Actions -->
            <div class="sub-group-label">Actions</div>
            <ha-selector .hass=${this.hass} .label=${"Tap Action"}
              .selector=${{ ui_action: {} }} .value=${(_m = btn.tap_action) != null ? _m : { action: "toggle" }}
              @value-changed=${(ev) => this._subButtonChanged(index, { tap_action: ev.detail.value })}
            ></ha-selector>
            <ha-selector .hass=${this.hass} .label=${"Hold Action"}
              .selector=${{ ui_action: {} }} .value=${(_n = btn.hold_action) != null ? _n : { action: "more-info" }}
              @value-changed=${(ev) => this._subButtonChanged(index, { hold_action: ev.detail.value })}
            ></ha-selector>
            <ha-selector .hass=${this.hass} .label=${"Double-Tap Action"}
              .selector=${{ ui_action: {} }} .value=${(_o = btn.double_tap_action) != null ? _o : { action: "none" }}
              @value-changed=${(ev) => this._subButtonChanged(index, { double_tap_action: ev.detail.value })}
            ></ha-selector>
          </div>
        ` : A}
      </div>
    `;
  }
  // ── Main render ───────────────────────────────────────────────────────────────
  render() {
    if (!this._loaded || !this._config) {
      return b`<div class="loading">Loading editor…</div>`;
    }
    return b`
      ${this._renderTabBar()}
      <div class="tab-content">
        ${this._activeTab === "basic" ? this._renderBasicTab() : A}
        ${this._activeTab === "icon" ? this._renderIconTab() : A}
        ${this._activeTab === "card" ? this._renderCardTab() : A}
        ${this._activeTab === "buttons" ? this._renderButtonsTab() : A}
        ${this._activeTab === "actions" ? this._renderActionsTab() : A}
      </div>
    `;
  }
  // ── Styles ────────────────────────────────────────────────────────────────────
  static get styles() {
    return i$3`
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
        align-items: center;
        gap: 6px;
      }

      .template-input { flex: 1; min-width: 0; }

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

      /* Header row: label on left, template button on right */
      .color-field-header {
        display: flex;
        align-items: center;
        gap: 8px;
        min-height: 20px;
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

      /* Native text input styled to match HA filled-variant text fields */
      .color-text-input {
        flex: 1;
        min-width: 0;
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
        color: var(--error-color, #db4437);
        border: 1px solid var(--error-color, #db4437);
        border-radius: 4px;
        padding: 2px 6px;
        cursor: pointer;
        background: transparent;
        font-size: 12px;
        flex-shrink: 0;
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
__decorateClass$1([
  r()
], IansCustomRoomCardEditor.prototype, "_activeTab", 2);
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
const ACTIVE_STATES = /* @__PURE__ */ new Set(["on", "open", "home", "playing", "unlocked", "connected"]);
const DOMAIN_ACTIVE_COLORS = {
  light: "var(--state-light-active-color, #FDD835)",
  switch: "var(--state-switch-active-color, #FDD835)",
  fan: "var(--state-fan-active-color, #26A69A)",
  media_player: "var(--state-media_player-active-color, #FDD835)",
  cover: "var(--state-cover-active-color, #FDD835)",
  lock: "var(--success-color, #4CAF50)",
  binary_sensor: "var(--state-binary_sensor-active-color, #FDD835)",
  alarm_control_panel: "var(--error-color, #db4437)"
};
const DOMAIN_ICONS = {
  light: "mdi:lightbulb",
  switch: "mdi:toggle-switch",
  sensor: "mdi:eye",
  binary_sensor: "mdi:radiobox-marked",
  climate: "mdi:thermostat",
  cover: "mdi:garage",
  fan: "mdi:fan",
  media_player: "mdi:cast",
  lock: "mdi:lock",
  vacuum: "mdi:robot-vacuum",
  camera: "mdi:camera",
  person: "mdi:account",
  device_tracker: "mdi:map-marker",
  weather: "mdi:weather-partly-cloudy",
  script: "mdi:script-text",
  automation: "mdi:robot",
  scene: "mdi:palette",
  input_boolean: "mdi:toggle-switch-outline",
  input_number: "mdi:numeric",
  input_select: "mdi:form-select",
  number: "mdi:numeric",
  select: "mdi:form-select",
  button: "mdi:gesture-tap-button",
  water_heater: "mdi:water-boiler",
  alarm_control_panel: "mdi:shield-home"
};
const SHAPE_BORDER_RADIUS = {
  circle: "50%",
  "rounded-rect": "8px",
  squircle: "30%",
  square: "0"
};
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
  // HA calls getGridOptions() on the element instance (not as static) to drive
  // the resize UI. Delegate to the static implementation.
  getGridOptions() {
    return IansCustomRoomCard.getGridOptions(this._config);
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
      this._subscribeSubButtonTemplates();
    }
    if (this._config) {
      this._setupCardActionHandler();
      this._setupSubButtonHandlers();
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
    const hassChanged = changedProps.has("hass");
    if (configChanged) {
      this._subscribeTemplates();
      this._subscribeSubButtonTemplates();
      this._setupCardActionHandler();
    }
    if (configChanged || templateResultsChanged || changedProps.has("_subTemplateResults") || hassChanged) {
      this._applyConfigStyles();
    }
    if (configChanged || templateResultsChanged || changedProps.has("_subTemplateResults")) {
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
    var _a2, _b2, _c2;
    const c2 = this._config;
    if (!c2) return;
    const resolve = (field, configValue) => {
      var _a3;
      return (_a3 = this._templateResults[field]) != null ? _a3 : configValue;
    };
    this._setCSSVar("--ians-card-background-color", resolve("background_color", c2.background_color));
    this._setCSSVar("--ians-card-background-opacity", c2.background_opacity !== void 0 ? String(c2.background_opacity) : void 0);
    this._setCSSVar("--ians-card-border-color", resolve("border_color", c2.border_color));
    this._setCSSVar("--ians-card-border-opacity", c2.border_opacity !== void 0 ? String(c2.border_opacity) : void 0);
    let iconColor = resolve("icon_color", c2.icon_color);
    if (c2.state_based_color && c2.entity && this.hass) {
      const es = this.hass.states[c2.entity];
      const domain = c2.entity.split(".")[0];
      if (es) {
        const isActive = ACTIVE_STATES.has(es.state);
        iconColor = isActive ? (_b2 = (_a2 = c2.icon_color_on) != null ? _a2 : DOMAIN_ACTIVE_COLORS[domain]) != null ? _b2 : iconColor : (_c2 = c2.icon_color_off) != null ? _c2 : iconColor;
      }
    }
    this._setCSSVar("--ians-icon-color", iconColor);
    this._setCSSVar("--ians-icon-opacity", c2.icon_opacity !== void 0 ? String(c2.icon_opacity) : void 0);
    this._setCSSVar("--ians-icon-background-color", c2.icon_background_color);
    this._setCSSVar("--ians-icon-background-opacity", c2.icon_background_opacity !== void 0 ? String(c2.icon_background_opacity) : void 0);
    this._setCSSVar("--ians-icon-background-size", c2.icon_background_size !== void 0 ? `${c2.icon_background_size}px` : void 0);
    this._setCSSVar("--ians-icon-background-width", c2.icon_background_width !== void 0 ? `${c2.icon_background_width}px` : void 0);
    this._setCSSVar("--ians-icon-background-height", c2.icon_background_height !== void 0 ? `${c2.icon_background_height}px` : void 0);
    const borderRadius = c2.icon_background_border_radius || (c2.icon_background_shape ? SHAPE_BORDER_RADIUS[c2.icon_background_shape] : void 0);
    this._setCSSVar("--ians-icon-background-border-radius", borderRadius);
    this._setCSSVar("--ians-icon-size", c2.icon_size !== void 0 ? `${c2.icon_size}px` : void 0);
    this._setCSSVar("--ians-badge-color", resolve("badge_color", c2.badge_color));
    this._setCSSVar("--ians-badge-background-color", c2.badge_background_color);
    this._setCSSVar("--ians-badge-size", c2.badge_size !== void 0 ? `${c2.badge_size}px` : void 0);
    this._setCSSVar("--ians-badge-opacity", c2.badge_opacity !== void 0 ? String(c2.badge_opacity) : void 0);
    this._setCSSVar("--ians-title-color", c2.title_color);
    this._setCSSVar("--ians-title-font-size", c2.title_font_size !== void 0 ? `${c2.title_font_size}px` : void 0);
    this._setCSSVar("--ians-title-align", c2.title_align);
    this._setCSSVar("--ians-sub-button-icon-color", c2.sub_button_icon_color);
    this._setCSSVar("--ians-sub-button-background-color", c2.sub_button_background_color);
    this._setCSSVar("--ians-sub-button-opacity", c2.sub_button_opacity !== void 0 ? String(c2.sub_button_opacity) : void 0);
    this._setCSSVar("--ians-sub-button-gap", c2.sub_button_gap !== void 0 ? `${c2.sub_button_gap}px` : void 0);
    if (c2.sub_buttons_layout === "grid") {
      if (c2.sub_buttons_grid_columns) {
        this._setCSSVar("--ians-sub-buttons-grid-template-columns", `repeat(${c2.sub_buttons_grid_columns}, 1fr)`);
      } else if (c2.sub_buttons_grid_min_width) {
        this._setCSSVar("--ians-sub-buttons-grid-template-columns", `repeat(auto-fill, minmax(${c2.sub_buttons_grid_min_width}px, 1fr))`);
      } else {
        this.style.removeProperty("--ians-sub-buttons-grid-template-columns");
      }
    } else {
      this.style.removeProperty("--ians-sub-buttons-grid-template-columns");
    }
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
    var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i, _j, _k, _l;
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
    const bgImageStyle = bgImageUrl ? `background-image: url('${bgImageUrl}'); background-position: ${(_c2 = c2.background_image_position) != null ? _c2 : "center"};` : "";
    const iconPosition = c2.icon_position;
    const iconBgPosition = c2.icon_background_position;
    const hasIndependentBg = !!iconBgPosition;
    const badgePosition = (_d2 = c2.badge_position) != null ? _d2 : "top-right";
    const titlePosition = c2.title_position;
    const showHighlight = isInteractive ? c2.hover_highlight !== false : c2.hover_highlight === true;
    const badgeEl = badgeIcon ? b`
          <div
            part="badge"
            class=${[
      "badge",
      badgePosition !== "custom" ? `badge-pos-${badgePosition}` : ""
    ].filter(Boolean).join(" ")}
            style=${badgePosition === "custom" ? `top: ${(_e2 = c2.badge_position_y) != null ? _e2 : "auto"}; left: ${(_f2 = c2.badge_position_x) != null ? _f2 : "auto"};` : ""}
          >
            <ha-icon part="badge-icon" .icon=${badgeIcon}></ha-icon>
          </div>
        ` : A;
    const iconBgOnlyEl = hasIndependentBg ? b`
          <div
            class=${[
      "icon-bg-only",
      "icon-absolute",
      iconBgPosition !== "custom" ? `icon-pos-${iconBgPosition}` : ""
    ].filter(Boolean).join(" ")}
            style=${iconBgPosition === "custom" ? `top: ${(_g = c2.icon_background_position_y) != null ? _g : "auto"}; left: ${(_h = c2.icon_background_position_x) != null ? _h : "auto"};` : ""}
          ></div>
        ` : A;
    const iconEl = icon !== void 0 ? iconPosition ? b`
              <div
                part="icon-container"
                class=${[
      "icon-container",
      "icon-absolute",
      hasIndependentBg ? "icon-no-bg" : "",
      iconPosition !== "custom" ? `icon-pos-${iconPosition}` : ""
    ].filter(Boolean).join(" ")}
                style=${iconPosition === "custom" ? `top: ${(_i = c2.icon_position_y) != null ? _i : "auto"}; left: ${(_j = c2.icon_position_x) != null ? _j : "auto"};` : ""}
              >
                <ha-icon part="icon" .icon=${icon}></ha-icon>
                ${badgeEl}
              </div>
            ` : b`
              <div
                part="icon-container"
                class=${["icon-container", hasIndependentBg ? "icon-no-bg" : ""].filter(Boolean).join(" ")}
              >
                <ha-icon part="icon" .icon=${icon}></ha-icon>
                ${badgeEl}
              </div>
            ` : A;
    const titleAbsoluteEl = title && titlePosition ? b`
          <span
            part="title"
            class=${[
      "card-title-absolute",
      titlePosition !== "custom" ? `card-title-abs-${titlePosition}` : ""
    ].filter(Boolean).join(" ")}
            style=${titlePosition === "custom" ? `top: ${(_k = c2.title_position_y) != null ? _k : "auto"}; left: ${(_l = c2.title_position_x) != null ? _l : "auto"};` : ""}
          >${title}</span>` : A;
    return b`
      <ha-card
        part="card"
        class=${[
      hasErrors ? "has-template-error" : "",
      isInteractive ? "interactive" : "",
      showHighlight ? "highlight-on-hover" : ""
    ].filter(Boolean).join(" ")}
      >
        <div part="background" class="card-background-color"></div>
        ${bgImageStyle ? b`<div class="card-background-image" style=${bgImageStyle}></div>` : A}
        ${showHighlight ? b`<div class="hover-ripple"></div>` : A}

        <!-- Independent icon background (before card-inner so it's below content) -->
        ${iconBgOnlyEl}

        <!-- Absolutely positioned icon — z-index 2, BEFORE card-inner so card-inner (same z-index, later in DOM) renders on top -->
        ${iconPosition ? iconEl : A}

        <div class="card-inner">
          <div part="header" class="card-header">
            ${!iconPosition ? iconEl : A}
            ${title && !titlePosition ? b`<span part="title" class="card-title">${title}</span>` : A}
          </div>

          ${hasErrors ? b`
                <div class="template-error">
                  <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                  <span>Template error — check browser console</span>
                </div>
              ` : A}

          ${this._renderSubButtons()}
        </div>

        <!-- Absolute title — rendered after card-inner so it paints on top -->
        ${titleAbsoluteEl}
      </ha-card>
    `;
  }
  // ── Helpers ────────────────────────────────────────────────────────────────
  _renderSubButtons() {
    var _a2, _b2;
    const c2 = this._config;
    if (!((_a2 = c2 == null ? void 0 : c2.sub_buttons) == null ? void 0 : _a2.length)) return A;
    const layout = (_b2 = c2.sub_buttons_layout) != null ? _b2 : "bottom-row";
    const isGlobal = !!c2.global_action;
    const buttons = c2.sub_buttons.map((btn, i2) => {
      var _a3, _b3, _c2, _d2, _e2, _f2, _g, _h, _i, _j, _k, _l, _m;
      const entityState = btn.entity ? (_a3 = this.hass) == null ? void 0 : _a3.states[btn.entity] : void 0;
      const domain = (_c2 = (_b3 = btn.entity) == null ? void 0 : _b3.split(".")[0]) != null ? _c2 : "";
      const domainIcon = domain ? (_d2 = DOMAIN_ICONS[domain]) != null ? _d2 : "mdi:circle" : "mdi:circle";
      const icon = (_g = (_f2 = (_e2 = this._subTemplateResults[`sub_${i2}_icon`]) != null ? _e2 : btn.icon) != null ? _f2 : entityState == null ? void 0 : entityState.attributes.icon) != null ? _g : domainIcon;
      let label;
      if (btn.label !== void 0) {
        if (btn.label === "entity" && entityState) {
          label = (_h = entityState.attributes.friendly_name) != null ? _h : btn.entity;
        } else {
          label = (_i = this._subTemplateResults[`sub_${i2}_label`]) != null ? _i : btn.label;
        }
      }
      let posClass = "";
      if (layout === "corners") {
        posClass = `pos-${(_j = CORNER_POSITIONS[i2]) != null ? _j : "bottom-right"}`;
      } else if (layout === "custom" && btn.position) {
        posClass = `pos-${btn.position}`;
      }
      const classes = [
        "sub-button",
        btn.background !== false ? "has-background" : "",
        isGlobal ? "display-only" : "",
        posClass
      ].filter(Boolean).join(" ");
      let btnIconColor = btn.icon_color;
      if (btn.state_based_color && entityState) {
        const isActive = ACTIVE_STATES.has(entityState.state);
        btnIconColor = isActive ? (_l = (_k = btn.icon_color_on) != null ? _k : DOMAIN_ACTIVE_COLORS[domain]) != null ? _l : btn.icon_color : (_m = btn.icon_color_off) != null ? _m : btn.icon_color;
      }
      const btnStyle = [
        btnIconColor ? `--ians-sub-button-icon-color: ${btnIconColor}` : "",
        btn.background_color ? `--ians-sub-button-background-color: ${btn.background_color}` : "",
        btn.opacity !== void 0 ? `opacity: ${btn.opacity}` : ""
      ].filter(Boolean).join("; ");
      return b`
        <div class=${classes} part="sub-button" style=${btnStyle || A}>
          ${btn.show_icon !== false ? b`<ha-icon part="sub-button-icon" .icon=${icon}></ha-icon>` : A}
          ${btn.show_label && label ? b`<span part="sub-button-label" class="sub-button-label">${label}</span>` : A}
          ${btn.show_state && entityState ? b`<span part="sub-button-state" class="sub-button-state">${entityState.state}</span>` : A}
        </div>
      `;
    });
    const containerClasses = ["sub-buttons", `layout-${layout}`].filter(Boolean).join(" ");
    return b`<div part="sub-buttons" class=${containerClasses}>${buttons}</div>`;
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
