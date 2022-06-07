parcelRequire = (function (e, r, t, n) {
  var i,
    o = "function" == typeof parcelRequire && parcelRequire,
    u = "function" == typeof require && require;
  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      (p.resolve = function (r) {
        return e[t][1][r] || r;
      }),
        (p.cache = {});
      var l = (r[t] = new f.Module(t));
      e[t][0].call(l.exports, p, l, l.exports, this);
    }
    return r[t].exports;
    function p(e) {
      return f(p.resolve(e));
    }
  }
  (f.isParcelRequire = !0),
    (f.Module = function (e) {
      (this.id = e), (this.bundle = f), (this.exports = {});
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function (r, t) {
      e[r] = [
        function (e, r) {
          r.exports = t;
        },
        {},
      ];
    });
  for (var c = 0; c < t.length; c++)
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = l)
      : "function" == typeof define && define.amd
      ? define(function () {
          return l;
        })
      : n && (this[n] = l);
  }
  if (((parcelRequire = f), i)) throw i;
  return f;
})(
  {
    L2W1: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var t = {},
          e = t.hasOwnProperty,
          o = t.toString,
          r = e.toString,
          c = r.call(Object),
          l = function (t) {
            var l, n;
            return (
              !(!t || "[object Object]" !== o.call(t)) &&
              (!(l = Object.getPrototypeOf(t)) ||
                ("function" == typeof (n = e.call(l, "constructor") && l.constructor) && r.call(n) === c))
            );
          },
          n = l;
        exports.default = n;
      },
      {},
    ],
    v4QR: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = r(require("./isPlainObject.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var t = Object.create(null),
          o = function () {
            var r,
              u,
              a,
              f,
              i,
              l,
              n = arguments[2] || {},
              s = 3,
              d = arguments.length,
              c = arguments[0] || !1,
              _ = arguments[1] ? void 0 : t;
            for ("object" != typeof n && "function" != typeof n && (n = {}); s < d; s++)
              if (null != (i = arguments[s]))
                for (f in i)
                  (r = n[f]),
                    (a = i[f]),
                    "__proto__" !== f &&
                      n !== a &&
                      (c && a && ((0, e.default)(a) || (u = Array.isArray(a)))
                        ? (u ? ((u = !1), (l = r && Array.isArray(r) ? r : [])) : (l = r && (0, e.default)(r) ? r : {}),
                          (n[f] = o(c, arguments[1], l, a)))
                        : a !== _ && (n[f] = a));
            return n;
          },
          u = o;
        exports.default = u;
      },
      { "./isPlainObject.js": "L2W1" },
    ],
    QNvL: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = r(require("./_merge.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var t = function () {
            var r = [!0, !1];
            return r.push.apply(r, arguments), e.default.apply(null, r);
          },
          u = t;
        exports.default = u;
      },
      { "./_merge.js": "v4QR" },
    ],
    vNEW: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        class e {
          constructor() {
            this._eventRegistry = new Map();
          }
          attachEvent(e, t) {
            const s = this._eventRegistry,
              r = s.get(e);
            Array.isArray(r) ? r.includes(t) || r.push(t) : s.set(e, [t]);
          }
          detachEvent(e, t) {
            const s = this._eventRegistry,
              r = s.get(e);
            if (!r) return;
            const n = r.indexOf(t);
            -1 !== n && r.splice(n, 1), 0 === r.length && s.delete(e);
          }
          fireEvent(e, t) {
            const s = this._eventRegistry.get(e);
            return s ? s.map((e) => e.call(this, t)) : [];
          }
          fireEventAsync(e, t) {
            return Promise.all(this.fireEvent(e, t));
          }
          isHandlerAttached(e, t) {
            const s = this._eventRegistry.get(e);
            return !!s && s.includes(t);
          }
          hasListeners(e) {
            return !!this._eventRegistry.get(e);
          }
        }
        var t = e;
        exports.default = t;
      },
      {},
    ],
    VCct: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = () =>
          new Promise((e) => {
            document.body
              ? e()
              : document.addEventListener("DOMContentLoaded", () => {
                  e();
                });
          });
        var t = e;
        exports.default = t;
      },
      {},
    ],
    byga: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = (e, t = {}) => {
          const r = document.createElement("style");
          return (
            (r.type = "text/css"),
            Object.entries(t).forEach((e) => r.setAttribute(...e)),
            (r.textContent = e),
            document.head.appendChild(r),
            r
          );
        };
        var t = e;
        exports.default = t;
      },
      {},
    ],
    uxMq: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = (e, t = {}) => {
          const r = document.createElement("link");
          return (
            (r.type = "text/css"),
            (r.rel = "stylesheet"),
            Object.entries(t).forEach((e) => r.setAttribute(...e)),
            (r.href = e),
            document.head.appendChild(r),
            r
          );
        };
        var t = e;
        exports.default = t;
      },
      {},
    ],
    TlaO: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.shouldUseLinks = exports.shouldPreloadLinks = exports.setUseLinks = exports.setPreloadLinks = exports.setPackageCSSRoot = exports.getUrl = void 0);
        const s = new Map();
        let e = !1,
          t = !0;
        const o = (e, t) => {
          s.set(e, t);
        };
        exports.setPackageCSSRoot = o;
        const r = (e, t) => `${s.get(e)}${t}`;
        exports.getUrl = r;
        const n = (s) => {
          e = s;
        };
        exports.setUseLinks = n;
        const p = (s) => {
          t = s;
        };
        exports.setPreloadLinks = p;
        const l = () => e;
        exports.shouldUseLinks = l;
        const x = () => t;
        exports.shouldPreloadLinks = x;
      },
      {},
    ],
    iNx9: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.updateStyle = exports.removeStyle = exports.hasStyle = exports.createStyle = exports.createOrUpdateStyle = void 0);
        var e = d(require("./util/createStyleInHead.js")),
          t = d(require("./util/createLinkInHead.js")),
          o = require("./CSP.js");
        function d(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const l = (e, t) => (t ? `${e}|${t}` : e),
          s = (d, s, n = "") => {
            const r = "string" == typeof d ? d : d.content;
            if ((0, o.shouldUseLinks)()) {
              const e = {};
              e[s] = n;
              const l = (0, o.getUrl)(d.packageName, d.fileName);
              (0, t.default)(l, e);
            } else if (document.adoptedStyleSheets) {
              const e = new CSSStyleSheet();
              e.replaceSync(r),
                (e._ui5StyleId = l(s, n)),
                (document.adoptedStyleSheets = [...document.adoptedStyleSheets, e]);
            } else {
              const t = {};
              (t[s] = n), (0, e.default)(r, t);
            }
          };
        exports.createStyle = s;
        const n = (e, t, d = "") => {
          const s = "string" == typeof e ? e : e.content;
          (0, o.shouldUseLinks)()
            ? (document.querySelector(`head>link[${t}="${d}"]`).href = (0, o.getUrl)(e.packageName, e.fileName))
            : document.adoptedStyleSheets
            ? document.adoptedStyleSheets.find((e) => e._ui5StyleId === l(t, d)).replaceSync(s || "")
            : (document.querySelector(`head>style[${t}="${d}"]`).textContent = s || "");
        };
        exports.updateStyle = n;
        const r = (e, t = "") =>
          (0, o.shouldUseLinks)()
            ? !!document.querySelector(`head>link[${e}="${t}"]`)
            : document.adoptedStyleSheets
            ? !!document.adoptedStyleSheets.find((o) => o._ui5StyleId === l(e, t))
            : !!document.querySelector(`head>style[${e}="${t}"]`);
        exports.hasStyle = r;
        const c = (e, t = "") => {
          if ((0, o.shouldUseLinks)()) {
            const o = document.querySelector(`head>link[${e}="${t}"]`);
            o && o.parentElement.removeChild(o);
          } else if (document.adoptedStyleSheets)
            document.adoptedStyleSheets = document.adoptedStyleSheets.filter((o) => o._ui5StyleId !== l(e, t));
          else {
            const o = document.querySelector(`head > style[${e}="${t}"]`);
            o && o.parentElement.removeChild(o);
          }
        };
        exports.removeStyle = c;
        const S = (e, t, o = "") => {
          r(t, o) ? n(e, t, o) : s(e, t, o);
        };
        exports.createOrUpdateStyle = S;
      },
      { "./util/createStyleInHead.js": "byga", "./util/createLinkInHead.js": "uxMq", "./CSP.js": "TlaO" },
    ],
    rnHX: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.registerFeature = exports.getFeature = void 0);
        const e = new Map(),
          t = (t, r) => {
            e.set(t, r);
          };
        exports.registerFeature = t;
        const r = (t) => e.get(t);
        exports.getFeature = r;
      },
      {},
    ],
    MXIi: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var o = {
          packageName: "@ui5/webcomponents-base",
          fileName: "FontFace.css",
          content:
            '@font-face{font-family:"72";font-style:normal;font-weight:400;src:local("72"),url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff2?ui5-webcomponents) format("woff2"),url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff?ui5-webcomponents) format("woff")}@font-face{font-family:"72full";font-style:normal;font-weight:400;src:local(\'72-full\'),url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular-full.woff2?ui5-webcomponents) format("woff2"),url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular-full.woff?ui5-webcomponents) format("woff")}@font-face{font-family:"72";font-style:normal;font-weight:700;src:local(\'72-Bold\'),url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff?ui5-webcomponents) format("woff")}@font-face{font-family:"72full";font-style:normal;font-weight:700;src:local(\'72-Bold-full\'),url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2"),url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff?ui5-webcomponents) format("woff")}@font-face{font-family:"72Black";font-style:bold;font-weight:900;src:local(\'72Black\'),url(https://openui5nightly.hana.ondemand.com/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black.woff2?ui5-webcomponents) format("woff2"),url(https://openui5nightly.hana.ondemand.com/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black.woff?ui5-webcomponents) format("woff")}',
        };
        exports.default = o;
      },
      {},
    ],
    UiwO: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = {
          packageName: "@ui5/webcomponents-base",
          fileName: "OverrideFontFace.css",
          content:
            "@font-face{font-family:'72override';unicode-range:U+0102-0103,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EB7,U+1EB8-1EC7,U+1EC8-1ECB,U+1ECC-1EE3,U+1EE4-1EF1,U+1EF4-1EF7;src:local('Arial'),local('Helvetica'),local('sans-serif')}",
        };
        exports.default = e;
      },
      {},
    ],
    gtEG: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("./ManagedStyles.js"),
          t = require("./FeaturesRegistry.js"),
          a = s(require("./generated/css/FontFace.css.js")),
          r = s(require("./generated/css/OverrideFontFace.css.js"));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const u = () => {
            const e = (0, t.getFeature)("OpenUI5Support");
            (e && e.isLoaded()) || d(), o();
          },
          d = () => {
            (0, e.hasStyle)("data-ui5-font-face") || (0, e.createStyle)(a.default, "data-ui5-font-face");
          },
          o = () => {
            (0, e.hasStyle)("data-ui5-font-face-override") ||
              (0, e.createStyle)(r.default, "data-ui5-font-face-override");
          };
        var c = u;
        exports.default = c;
      },
      {
        "./ManagedStyles.js": "iNx9",
        "./FeaturesRegistry.js": "rnHX",
        "./generated/css/FontFace.css.js": "MXIi",
        "./generated/css/OverrideFontFace.css.js": "UiwO",
      },
    ],
    xn1d: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var t = {
          packageName: "@ui5/webcomponents-base",
          fileName: "SystemCSSVars.css",
          content:
            ":root{--_ui5_content_density:cozy}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_content_density:compact}[dir=rtl]{--_ui5_dir:rtl}[dir=ltr]{--_ui5_dir:ltr}",
        };
        exports.default = t;
      },
      {},
    ],
    cL5I: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("./ManagedStyles.js"),
          s = t(require("./generated/css/SystemCSSVars.css.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const a = () => {
          (0, e.hasStyle)("data-ui5-system-css-vars") || (0, e.createStyle)(s.default, "data-ui5-system-css-vars");
        };
        var r = a;
        exports.default = r;
      },
      { "./ManagedStyles.js": "iNx9", "./generated/css/SystemCSSVars.css.js": "xn1d" },
    ],
    U6MM: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.SUPPORTED_LOCALES = exports.DEFAULT_THEME = exports.DEFAULT_LOCALE = exports.DEFAULT_LANGUAGE = void 0);
        const e = {
            themes: {
              default: "sap_fiori_3",
              all: [
                "sap_fiori_3",
                "sap_fiori_3_dark",
                "sap_belize",
                "sap_belize_hcb",
                "sap_belize_hcw",
                "sap_fiori_3_hcb",
                "sap_fiori_3_hcw",
                "sap_horizon",
                "sap_horizon_exp",
              ],
            },
            languages: {
              default: "en",
              all: [
                "ar",
                "bg",
                "ca",
                "cs",
                "cy",
                "da",
                "de",
                "el",
                "en",
                "en_GB",
                "en_US_sappsd",
                "en_US_saprigi",
                "en_US_saptrc",
                "es",
                "es_MX",
                "et",
                "fi",
                "fr",
                "fr_CA",
                "hi",
                "hr",
                "hu",
                "in",
                "it",
                "iw",
                "ja",
                "kk",
                "ko",
                "lt",
                "lv",
                "ms",
                "nl",
                "no",
                "pl",
                "pt_PT",
                "pt",
                "ro",
                "ru",
                "sh",
                "sk",
                "sl",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh_CN",
                "zh_TW",
              ],
            },
            locales: {
              default: "en",
              all: [
                "ar",
                "ar_EG",
                "ar_SA",
                "bg",
                "ca",
                "cs",
                "da",
                "de",
                "de_AT",
                "de_CH",
                "el",
                "el_CY",
                "en",
                "en_AU",
                "en_GB",
                "en_HK",
                "en_IE",
                "en_IN",
                "en_NZ",
                "en_PG",
                "en_SG",
                "en_ZA",
                "es",
                "es_AR",
                "es_BO",
                "es_CL",
                "es_CO",
                "es_MX",
                "es_PE",
                "es_UY",
                "es_VE",
                "et",
                "fa",
                "fi",
                "fr",
                "fr_BE",
                "fr_CA",
                "fr_CH",
                "fr_LU",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "it_CH",
                "ja",
                "kk",
                "ko",
                "lt",
                "lv",
                "ms",
                "nb",
                "nl",
                "nl_BE",
                "pl",
                "pt",
                "pt_PT",
                "ro",
                "ru",
                "ru_UA",
                "sk",
                "sl",
                "sr",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh_CN",
                "zh_HK",
                "zh_SG",
                "zh_TW",
              ],
            },
          },
          _ = e.themes.default;
        exports.DEFAULT_THEME = _;
        const s = e.languages.default;
        exports.DEFAULT_LANGUAGE = s;
        const a = e.locales.default;
        exports.DEFAULT_LOCALE = a;
        const r = e.locales.all;
        exports.SUPPORTED_LOCALES = r;
      },
      {},
    ],
    fa6t: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.getTheme = exports.getRTL = exports.getNoConflict = exports.getLanguage = exports.getFormatSettings = exports.getFetchDefaultLanguage = exports.getCalendarType = exports.getAnimationMode = void 0);
        var e = o(require("./thirdparty/merge.js")),
          t = require("./FeaturesRegistry.js"),
          a = require("./generated/AssetParameters.js");
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        let n = !1,
          s = {
            animationMode: "full",
            theme: a.DEFAULT_THEME,
            rtl: null,
            language: null,
            calendarType: null,
            noConflict: !1,
            formatSettings: {},
            fetchDefaultLanguage: !1,
          };
        const r = () => (T(), s.animationMode);
        exports.getAnimationMode = r;
        const i = () => (T(), s.theme);
        exports.getTheme = i;
        const g = () => (T(), s.rtl);
        exports.getRTL = g;
        const c = () => (T(), s.language);
        exports.getLanguage = c;
        const u = () => (T(), s.fetchDefaultLanguage);
        exports.getFetchDefaultLanguage = u;
        const l = () => (T(), s.noConflict);
        exports.getNoConflict = l;
        const p = () => (T(), s.calendarType);
        exports.getCalendarType = p;
        const f = () => (T(), s.formatSettings);
        exports.getFormatSettings = f;
        const d = new Map();
        d.set("true", !0), d.set("false", !1);
        const h = () => {
            const t =
              document.querySelector("[data-ui5-config]") || document.querySelector("[data-id='sap-ui-config']");
            let a;
            if (t) {
              try {
                a = JSON.parse(t.innerHTML);
              } catch (o) {
                console.warn("Incorrect data-sap-ui-config format. Please use JSON");
              }
              a && (s = (0, e.default)(s, a));
            }
          },
          m = () => {
            const e = new URLSearchParams(window.location.search);
            e.forEach((e, t) => {
              const a = t.split("sap-").length;
              0 !== a && a !== t.split("sap-ui-").length && L(t, e, "sap");
            }),
              e.forEach((e, t) => {
                t.startsWith("sap-ui") && L(t, e, "sap-ui");
              });
          },
          x = (e, t) => ("theme" === e && t.includes("@") ? t.split("@")[0] : t),
          L = (e, t, a) => {
            const o = t.toLowerCase(),
              n = e.split(`${a}-`)[1];
            d.has(t) && (t = d.get(o)), (t = x(n, t)), (s[n] = t);
          },
          S = () => {
            const a = (0, t.getFeature)("OpenUI5Support");
            if (!a || !a.isLoaded()) return;
            const o = a.getConfigurationSettingsObject();
            s = (0, e.default)(s, o);
          },
          T = () => {
            n || (h(), m(), S(), (n = !0));
          };
      },
      { "./thirdparty/merge.js": "QNvL", "./FeaturesRegistry.js": "rnHX", "./generated/AssetParameters.js": "U6MM" },
    ],
    E26R: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const t = 10;
        class s {
          constructor() {
            (this.list = []), (this.lookup = new Set());
          }
          add(t) {
            this.lookup.has(t) || (this.list.push(t), this.lookup.add(t));
          }
          remove(t) {
            this.lookup.has(t) && ((this.list = this.list.filter((s) => s !== t)), this.lookup.delete(t));
          }
          shift() {
            const t = this.list.shift();
            if (t) return this.lookup.delete(t), t;
          }
          isEmpty() {
            return 0 === this.list.length;
          }
          isAdded(t) {
            return this.lookup.has(t);
          }
          process(s) {
            let e;
            const o = new Map();
            for (e = this.shift(); e; ) {
              const i = o.get(e) || 0;
              if (i > t) throw new Error(`Web component processed too many times this task, max allowed is: ${t}`);
              s(e), o.set(e, i + 1), (e = this.shift());
            }
          }
        }
        var e = s;
        exports.default = e;
      },
      {},
    ],
    TK0G: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = (e) => {
          const t = [];
          return (
            e.forEach((e) => {
              t.push(e);
            }),
            t
          );
        };
        var t = e;
        exports.default = t;
      },
      {},
    ],
    BtPA: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.registerTag = exports.recordTagRegistrationFailure = exports.isTagRegistered = exports.getAllRegisteredTags = void 0);
        var e = t(require("./util/setToArray.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const r = new Set(),
          s = new Set();
        let o;
        const a = (e) => {
          r.add(e);
        };
        exports.registerTag = a;
        const i = (e) => r.has(e);
        exports.isTagRegistered = i;
        const n = () => (0, e.default)(r);
        exports.getAllRegisteredTags = n;
        const d = (e) => {
          s.add(e),
            o ||
              (o = setTimeout(() => {
                g(), (o = void 0);
              }, 1e3));
        };
        exports.recordTagRegistrationFailure = d;
        const g = () => {
          console.warn(
            `The following tags have already been defined by a different UI5 Web Components version: ${(0, e.default)(
              s
            ).join(", ")}`
          ),
            s.clear();
        };
      },
      { "./util/setToArray.js": "TK0G" },
    ],
    WhUZ: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.markAsRtlAware = exports.isRtlAware = void 0);
        const e = new Set(),
          t = (t) => {
            e.add(t);
          };
        exports.markAsRtlAware = t;
        const s = (t) => e.has(t);
        exports.isRtlAware = s;
      },
      {},
    ],
    tP7g: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.renderImmediately = exports.renderFinished = exports.renderDeferred = exports.reRenderAllUI5Elements = exports.detachBeforeComponentRender = exports.cancelRender = exports.attachBeforeComponentRender = void 0);
        var e = o(require("./EventProvider.js")),
          t = o(require("./RenderQueue.js")),
          r = require("./CustomElementsRegistry.js"),
          n = require("./locale/RTLAwareRegistry.js");
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = new Set(),
          a = new e.default(),
          d = new t.default();
        let i, c, m, l;
        const p = async (e) => {
          d.add(e), await f();
        };
        exports.renderDeferred = p;
        const u = (e) => {
          a.fireEvent("beforeComponentRender", e), s.add(e), e._render();
        };
        exports.renderImmediately = u;
        const w = (e) => {
          d.remove(e), s.delete(e);
        };
        exports.cancelRender = w;
        const f = async () => {
            l ||
              (l = new Promise((e) => {
                window.requestAnimationFrame(() => {
                  d.process(u),
                    (l = null),
                    e(),
                    m ||
                      (m = setTimeout(() => {
                        (m = void 0), d.isEmpty() && v();
                      }, 200));
                });
              })),
              await l;
          },
          R = () =>
            i ||
            (i = new Promise((e) => {
              (c = e),
                window.requestAnimationFrame(() => {
                  d.isEmpty() && ((i = void 0), e());
                });
            })),
          g = () => {
            const e = (0, r.getAllRegisteredTags)().map((e) => customElements.whenDefined(e));
            return Promise.all(e);
          },
          x = async () => {
            await g(), await R();
          };
        exports.renderFinished = x;
        const v = () => {
            d.isEmpty() && c && (c(), (c = void 0), (i = void 0));
          },
          h = async (e) => {
            s.forEach((t) => {
              const r = t.constructor.getMetadata().getTag(),
                o = (0, n.isRtlAware)(t.constructor),
                s = t.constructor.getMetadata().isLanguageAware(),
                a = t.constructor.getMetadata().isThemeAware();
              (!e || e.tag === r || (e.rtlAware && o) || (e.languageAware && s) || (e.themeAware && a)) && p(t);
            }),
              await x();
          };
        exports.reRenderAllUI5Elements = h;
        const y = (e) => {
          a.attachEvent("beforeComponentRender", e);
        };
        exports.attachBeforeComponentRender = y;
        const A = (e) => {
          a.detachEvent("beforeComponentRender", e);
        };
        exports.detachBeforeComponentRender = A;
      },
      {
        "./EventProvider.js": "vNEW",
        "./RenderQueue.js": "E26R",
        "./CustomElementsRegistry.js": "BtPA",
        "./locale/RTLAwareRegistry.js": "WhUZ",
      },
    ],
    ZA2u: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.registerThemePropertiesLoader = exports.registerThemeProperties = exports.isThemeRegistered = exports.getThemeProperties = exports.getRegisteredPackages = void 0);
        var e = require("../generated/AssetParameters.js");
        const r = new Map(),
          t = new Map(),
          s = new Set(),
          o = new Set(),
          i = (e, r, t) => {
            throw new Error(
              "`registerThemeProperties` has been depracated. Use `registerThemePropertiesLoader` instead."
            );
          };
        exports.registerThemeProperties = i;
        const a = (e, r, i) => {
          t.set(`${e}/${r}`, i), s.add(e), o.add(r);
        };
        exports.registerThemePropertiesLoader = a;
        const n = async (s, i) => {
          const a = r.get(`${s}_${i}`);
          if (void 0 !== a) return a;
          if (!o.has(i)) {
            const t = [...o.values()].join(", ");
            return (
              console.warn(
                `You have requested a non-registered theme - falling back to ${e.DEFAULT_THEME}. Registered themes are: ${t}`
              ),
              r.get(`${s}_${e.DEFAULT_THEME}`)
            );
          }
          const n = t.get(`${s}/${i}`);
          if (!n) return void console.error(`Theme [${i}] not registered for package [${s}]`);
          let g;
          try {
            g = await n(i);
          } catch (p) {
            return void console.error(s, p.message);
          }
          const d = g._ || g;
          return r.set(`${s}_${i}`, d), d;
        };
        exports.getThemeProperties = n;
        const g = () => s;
        exports.getRegisteredPackages = g;
        const d = (e) => o.has(e);
        exports.isThemeRegistered = d;
      },
      { "../generated/AssetParameters.js": "U6MM" },
    ],
    wrBv: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = new Set(),
          t = () => {
            let e =
              document.querySelector(".sapThemeMetaData-Base-baseLib") ||
              document.querySelector(".sapThemeMetaData-UI5-sap-ui-core");
            if (e) return getComputedStyle(e).backgroundImage;
            ((e = document.createElement("span")).style.display = "none"),
              e.classList.add("sapThemeMetaData-Base-baseLib"),
              document.body.appendChild(e);
            let t = getComputedStyle(e).backgroundImage;
            return (
              "none" === t &&
                (e.classList.add("sapThemeMetaData-UI5-sap-ui-core"), (t = getComputedStyle(e).backgroundImage)),
              document.body.removeChild(e),
              t
            );
          },
          a = (t) => {
            const a = /\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(t);
            if (a && a.length >= 2) {
              let t = a[1];
              if ("{" !== (t = t.replace(/\\"/g, '"')).charAt(0) && "}" !== t.charAt(t.length - 1))
                try {
                  t = decodeURIComponent(t);
                } catch (o) {
                  return void (
                    e.has("decode") ||
                    (console.warn("Malformed theme metadata string, unable to decodeURIComponent"), e.add("decode"))
                  );
                }
              try {
                return JSON.parse(t);
              } catch (o) {
                e.has("parse") ||
                  (console.warn("Malformed theme metadata string, unable to parse JSON"), e.add("parse"));
              }
            }
          },
          o = (t) => {
            let a, o;
            try {
              (a = t.Path.match(/\.([^.]+)\.css_variables$/)[1]), (o = t.Extends[0]);
            } catch (r) {
              return void (e.has("object") || (console.warn("Malformed theme metadata Object", t), e.add("object")));
            }
            return { themeName: a, baseThemeName: o };
          },
          r = () => {
            const e = t();
            if (!e || "none" === e) return;
            const r = a(e);
            return o(r);
          };
        var d = r;
        exports.default = d;
      },
      {},
    ],
    hcsr: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.fireThemeLoaded = exports.detachThemeLoaded = exports.attachThemeLoaded = void 0);
        var e = t(require("../EventProvider.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const d = new e.default(),
          o = "themeLoaded",
          a = (e) => {
            d.attachEvent(o, e);
          };
        exports.attachThemeLoaded = a;
        const r = (e) => {
          d.detachEvent(o, e);
        };
        exports.detachThemeLoaded = r;
        const s = (e) => d.fireEvent(o, e);
        exports.fireThemeLoaded = s;
      },
      { "../EventProvider.js": "vNEW" },
    ],
    A8qW: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("../asset-registries/Themes.js"),
          t = require("../ManagedStyles.js"),
          r = i(require("./getThemeDesignerTheme.js")),
          a = require("./ThemeLoaded.js"),
          s = require("../FeaturesRegistry.js");
        function i(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const o = "@ui5/webcomponents-theming",
          n = () => {
            return (0, e.getRegisteredPackages)().has(o);
          },
          u = async (r) => {
            if (!(0, e.getRegisteredPackages)().has(o)) return;
            const a = await (0, e.getThemeProperties)(o, r);
            a && (0, t.createOrUpdateStyle)(a, "data-ui5-theme-properties", o);
          },
          d = () => {
            (0, t.removeStyle)("data-ui5-theme-properties", o);
          },
          c = async (r) => {
            (0, e.getRegisteredPackages)().forEach(async (a) => {
              if (a === o) return;
              const s = await (0, e.getThemeProperties)(a, r);
              s && (0, t.createOrUpdateStyle)(s, "data-ui5-theme-properties", a);
            });
          },
          m = () => {
            const e = (0, r.default)();
            if (e) return e;
            const t = (0, s.getFeature)("OpenUI5Support");
            if (t) {
              if (t.cssVariablesLoaded()) return { themeName: t.getConfigurationSettingsObject().theme };
            }
          },
          g = async (r) => {
            const s = m();
            s && r === s.themeName ? (0, t.removeStyle)("data-ui5-theme-properties", o) : await u(r);
            const i = (0, e.isThemeRegistered)(r) ? r : s && s.baseThemeName;
            await c(i), (0, a.fireThemeLoaded)(r);
          };
        var h = g;
        exports.default = h;
      },
      {
        "../asset-registries/Themes.js": "ZA2u",
        "../ManagedStyles.js": "iNx9",
        "./getThemeDesignerTheme.js": "wrBv",
        "./ThemeLoaded.js": "hcsr",
        "../FeaturesRegistry.js": "rnHX",
      },
    ],
    b5d6: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.setTheme = exports.isTheme = exports.getTheme = void 0);
        var e = require("../InitialConfiguration.js"),
          t = require("../Render.js"),
          r = s(require("../theming/applyTheme.js"));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        let o;
        const i = () => (void 0 === o && (o = (0, e.getTheme)()), o);
        exports.getTheme = i;
        const n = async (e) => {
          o !== e && ((o = e), await (0, r.default)(o), await (0, t.reRenderAllUI5Elements)({ themeAware: !0 }));
        };
        exports.setTheme = n;
        const a = (e) => {
          const t = i();
          return t === e || t === `${e}_exp`;
        };
        exports.isTheme = a;
      },
      { "../InitialConfiguration.js": "fa6t", "../Render.js": "tP7g", "../theming/applyTheme.js": "A8qW" },
    ],
    oXKF: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.boot = exports.attachBoot = void 0);
        var e = u(require("./EventProvider.js")),
          t = u(require("./util/whenDOMReady.js")),
          r = u(require("./FontFace.js")),
          a = u(require("./SystemCSSVars.js")),
          o = require("./config/Theme.js"),
          s = u(require("./theming/applyTheme.js")),
          i = require("./FeaturesRegistry.js");
        function u(e) {
          return e && e.__esModule ? e : { default: e };
        }
        let n = !1;
        const c = new e.default(),
          d = (e) => {
            c.attachEvent("boot", e);
          };
        exports.attachBoot = d;
        const l = async () => {
          if (n) return;
          const e = (0, i.getFeature)("OpenUI5Support");
          e && (await e.init()),
            await (0, t.default)(),
            await (0, s.default)((0, o.getTheme)()),
            e && e.attachListeners(),
            (0, r.default)(),
            (0, a.default)(),
            await c.fireEventAsync("boot"),
            (n = !0);
        };
        exports.boot = l;
      },
      {
        "./EventProvider.js": "vNEW",
        "./util/whenDOMReady.js": "VCct",
        "./FontFace.js": "gtEG",
        "./SystemCSSVars.js": "cL5I",
        "./config/Theme.js": "b5d6",
        "./theming/applyTheme.js": "A8qW",
        "./FeaturesRegistry.js": "rnHX",
      },
    ],
    bqvp: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        class t {
          static isValid(t) {}
          static attributeToProperty(t) {
            return t;
          }
          static propertyToAttribute(t) {
            return `${t}`;
          }
          static valuesAreEqual(t, e) {
            return t === e;
          }
          static generateTypeAccessors(t) {
            Object.keys(t).forEach((e) => {
              Object.defineProperty(this, e, { get: () => t[e] });
            });
          }
        }
        var e = t;
        exports.default = e;
      },
      {},
    ],
    oX07: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = (e, t, o = !1) => {
          if ("function" != typeof e || "function" != typeof t) return !1;
          if (o && e === t) return !0;
          let r = e;
          do {
            r = Object.getPrototypeOf(r);
          } while (null !== r && r !== t);
          return r === t;
        };
        var t = e;
        exports.default = t;
      },
      {},
    ],
    DrCH: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.kebabToCamelCase = exports.camelToKebabCase = void 0);
        const e = new Map(),
          s = new Map(),
          t = (s) => {
            if (!e.has(s)) {
              const t = o(s.split("-"));
              e.set(s, t);
            }
            return e.get(s);
          };
        exports.kebabToCamelCase = t;
        const a = (e) => {
          if (!s.has(e)) {
            const t = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
            s.set(e, t);
          }
          return s.get(e);
        };
        exports.camelToKebabCase = a;
        const o = (e) =>
          e.map((e, s) => (0 === s ? e.toLowerCase() : e.charAt(0).toUpperCase() + e.slice(1).toLowerCase())).join("");
      },
      {},
    ],
    CFla: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.isSlot = exports.getSlottedElementsList = exports.getSlottedElements = exports.getSlotName = void 0);
        const t = (t) => {
          if (!(t instanceof HTMLElement)) return "default";
          const e = t.getAttribute("slot");
          if (e) {
            const t = e.match(/^(.+?)-\d+$/);
            return t ? t[1] : e;
          }
          return "default";
        };
        exports.getSlotName = t;
        const e = (t) => t && t instanceof HTMLElement && "slot" === t.localName;
        exports.isSlot = e;
        const o = (t) => (e(t) ? t.assignedNodes({ flatten: !0 }).filter((t) => t instanceof HTMLElement) : [t]);
        exports.getSlottedElements = o;
        const s = (t) => {
          return t.reduce((t, e) => t.concat(o(e)), []);
        };
        exports.getSlottedElementsList = s;
      },
      {},
    ],
    dBN8: [
      function (require, module, exports) {
        "use strict";
        let e;
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.shouldScopeCustomElement = exports.setCustomElementsScopingSuffix = exports.setCustomElementsScopingRules = exports.getEffectiveScopingSuffixForTag = exports.getCustomElementsScopingSuffix = exports.getCustomElementsScopingRules = void 0);
        let t = { include: [/^ui5-/], exclude: [] };
        const s = new Map(),
          o = (t) => {
            if (!t.match(/^[a-zA-Z0-9_-]+$/))
              throw new Error("Only alphanumeric characters and dashes allowed for the scoping suffix");
            e = t;
          };
        exports.setCustomElementsScopingSuffix = o;
        const r = () => e;
        exports.getCustomElementsScopingSuffix = r;
        const n = (e) => {
          if (!e || !e.include) throw new Error('"rules" must be an object with at least an "include" property');
          if (!Array.isArray(e.include) || e.include.some((e) => !(e instanceof RegExp)))
            throw new Error('"rules.include" must be an array of regular expressions');
          if (e.exclude && (!Array.isArray(e.exclude) || e.exclude.some((e) => !(e instanceof RegExp))))
            throw new Error('"rules.exclude" must be an array of regular expressions');
          (e.exclude = e.exclude || []), (t = e), s.clear();
        };
        exports.setCustomElementsScopingRules = n;
        const u = () => t;
        exports.getCustomElementsScopingRules = u;
        const c = (e) => {
          if (!s.has(e)) {
            const o = t.include.some((t) => e.match(t)) && !t.exclude.some((t) => e.match(t));
            s.set(e, o);
          }
          return s.get(e);
        };
        exports.shouldScopeCustomElement = c;
        const l = (e) => {
          if (c(e)) return r();
        };
        exports.getEffectiveScopingSuffixForTag = l;
      },
      {},
    ],
    sPrT: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var t = o(require("./types/DataType.js")),
          e = o(require("./util/isDescendantOf.js")),
          r = require("./util/StringHelper.js"),
          a = require("./util/SlotsHelper.js"),
          i = require("./CustomElementsScope.js");
        function o(t) {
          return t && t.__esModule ? t : { default: t };
        }
        class s {
          constructor(t) {
            this.metadata = t;
          }
          getInitialState() {
            if (Object.prototype.hasOwnProperty.call(this, "_initialState")) return this._initialState;
            const t = {},
              e = this.slotsAreManaged(),
              r = this.getProperties();
            for (const a in r) {
              const e = r[a].type,
                i = r[a].defaultValue;
              e === Boolean
                ? ((t[a] = !1),
                  void 0 !== i &&
                    console.warn(
                      "The 'defaultValue' metadata key is ignored for all booleans properties, they would be initialized with 'false' by default"
                    ))
                : r[a].multiple
                ? (t[a] = [])
                : e === Object
                ? (t[a] = "defaultValue" in r[a] ? r[a].defaultValue : {})
                : e === String
                ? (t[a] = "defaultValue" in r[a] ? r[a].defaultValue : "")
                : (t[a] = i);
            }
            if (e) {
              const e = this.getSlots();
              for (const [r, a] of Object.entries(e)) {
                t[a.propertyName || r] = [];
              }
            }
            return (this._initialState = t), t;
          }
          static validatePropertyValue(t, e) {
            return e.multiple ? t.map((t) => n(t, e)) : n(t, e);
          }
          static validateSlotValue(t, e) {
            return l(t, e);
          }
          getPureTag() {
            return this.metadata.tag;
          }
          getTag() {
            const t = this.metadata.tag,
              e = (0, i.getEffectiveScopingSuffixForTag)(t);
            return e ? `${t}-${e}` : t;
          }
          getAltTag() {
            const t = this.metadata.altTag;
            if (!t) return;
            const e = (0, i.getEffectiveScopingSuffixForTag)(t);
            return e ? `${t}-${e}` : t;
          }
          hasAttribute(t) {
            const e = this.getProperties()[t];
            return e.type !== Object && !e.noAttribute && !e.multiple;
          }
          getPropertiesList() {
            return Object.keys(this.getProperties());
          }
          getAttributesList() {
            return this.getPropertiesList().filter(this.hasAttribute, this).map(r.camelToKebabCase);
          }
          getSlots() {
            return this.metadata.slots || {};
          }
          canSlotText() {
            const t = this.getSlots().default;
            return t && t.type === Node;
          }
          hasSlots() {
            return !!Object.entries(this.getSlots()).length;
          }
          hasIndividualSlots() {
            return this.slotsAreManaged() && Object.entries(this.getSlots()).some(([t, e]) => e.individualSlots);
          }
          slotsAreManaged() {
            return !!this.metadata.managedSlots;
          }
          getProperties() {
            return this.metadata.properties || {};
          }
          getEvents() {
            return this.metadata.events || {};
          }
          isLanguageAware() {
            return !!this.metadata.languageAware;
          }
          isThemeAware() {
            return !!this.metadata.themeAware;
          }
          shouldInvalidateOnChildChange(t, e, r) {
            const a = this.getSlots()[t].invalidateOnChildChange;
            if (void 0 === a) return !1;
            if ("boolean" == typeof a) return a;
            if ("object" == typeof a) {
              if ("property" === e) {
                if (void 0 === a.properties) return !1;
                if ("boolean" == typeof a.properties) return a.properties;
                if (Array.isArray(a.properties)) return a.properties.includes(r);
                throw new Error("Wrong format for invalidateOnChildChange.properties: boolean or array is expected");
              }
              if ("slot" === e) {
                if (void 0 === a.slots) return !1;
                if ("boolean" == typeof a.slots) return a.slots;
                if (Array.isArray(a.slots)) return a.slots.includes(r);
                throw new Error("Wrong format for invalidateOnChildChange.slots: boolean or array is expected");
              }
            }
            throw new Error("Wrong format for invalidateOnChildChange: boolean or object is expected");
          }
        }
        const n = (r, a) => {
            const i = a.type;
            return i === Boolean
              ? "boolean" == typeof r && r
              : i === String
              ? "string" == typeof r || null == r
                ? r
                : r.toString()
              : i === Object
              ? "object" == typeof r
                ? r
                : a.defaultValue
              : (0, e.default)(i, t.default)
              ? i.isValid(r)
                ? r
                : a.defaultValue
              : void 0;
          },
          l = (t, e) => (
            t &&
              (0, a.getSlottedElements)(t).forEach((t) => {
                if (!(t instanceof e.type)) throw new Error(`${t} is not of type ${e.type}`);
              }),
            t
          );
        var u = s;
        exports.default = u;
      },
      {
        "./types/DataType.js": "bqvp",
        "./util/isDescendantOf.js": "oX07",
        "./util/StringHelper.js": "DrCH",
        "./util/SlotsHelper.js": "CFla",
        "./CustomElementsScope.js": "dBN8",
      },
    ],
    zr7a: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = (e, t = document.body) => {
          let r = document.querySelector(e);
          return r || ((r = document.createElement(e)), t.insertBefore(r, t.firstChild));
        };
        var t = e;
        exports.default = t;
      },
      {},
    ],
    Wpg3: [
      function (require, module, exports) {
        customElements.get("ui5-static-area") || customElements.define("ui5-static-area", class extends HTMLElement {});
      },
      {},
    ],
    XzaV: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("../CustomElementsScope.js");
        const t = (t, o) => {
          const s = o.constructor
            .getUniqueDependencies()
            .map((e) => e.getMetadata().getPureTag())
            .filter(e.shouldScopeCustomElement);
          return t(o, s, (0, e.getCustomElementsScopingSuffix)());
        };
        var o = t;
        exports.default = o;
      },
      { "../CustomElementsScope.js": "dBN8" },
    ],
    bZie: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("./util/getSingletonElementInstance.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const r = () => (0, e.default)("ui5-shared-resources", document.head),
          o = (e, t) => {
            const o = e.split(".");
            let l = r();
            for (let r = 0; r < o.length; r++) {
              const e = o[r],
                n = r === o.length - 1;
              Object.prototype.hasOwnProperty.call(l, e) || (l[e] = n ? t : {}), (l = l[e]);
            }
            return l;
          };
        var l = o;
        exports.default = l;
      },
      { "./util/getSingletonElementInstance.js": "zr7a" },
    ],
    I7OA: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.getCustomCSS = exports.detachCustomCSSChange = exports.attachCustomCSSChange = exports.addCustomCSS = void 0);
        var e = require("../Render.js"),
          t = o(require("../getSharedResource.js")),
          s = o(require("../EventProvider.js"));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const r = (0, t.default)("CustomStyle.eventProvider", new s.default()),
          C = "CustomCSSChange",
          n = (e) => {
            r.attachEvent("CustomCSSChange", e);
          };
        exports.attachCustomCSSChange = n;
        const u = (e) => {
          r.detachEvent("CustomCSSChange", e);
        };
        exports.detachCustomCSSChange = u;
        const a = (e) => r.fireEvent("CustomCSSChange", e),
          S = (0, t.default)("CustomStyle.customCSSFor", {});
        let d;
        n((t) => {
          d || (0, e.reRenderAllUI5Elements)({ tag: t });
        });
        const l = (t, s) => {
          S[t] || (S[t] = []), S[t].push(s), (d = !0);
          try {
            a(t);
          } finally {
            d = !1;
          }
          return (0, e.reRenderAllUI5Elements)({ tag: t });
        };
        exports.addCustomCSS = l;
        const m = (e) => (S[e] ? S[e].join("") : "");
        exports.getCustomCSS = m;
      },
      { "../Render.js": "tP7g", "../getSharedResource.js": "bZie", "../EventProvider.js": "vNEW" },
    ],
    L88J: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = (e) =>
            Array.isArray(e)
              ? t(e.filter((e) => !!e))
                  .map((e) => ("string" == typeof e ? e : e.content))
                  .join(" ")
              : "string" == typeof e
              ? e
              : e.content,
          t = (e) => e.reduce((e, r) => e.concat(Array.isArray(r) ? t(r) : r), []);
        var r = e;
        exports.default = r;
      },
      {},
    ],
    pJL8: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("./CustomStyle.js"),
          t = s(require("./getStylesString.js"));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const a = new Map();
        (0, e.attachCustomCSSChange)((e) => {
          a.delete(`${e}_normal`);
        });
        const r = (s, r = !1) => {
          const l = s.getMetadata().getTag(),
            o = `${l}_${r ? "static" : "normal"}`;
          if (!a.has(o)) {
            let u;
            if (r) u = (0, t.default)(s.staticAreaStyles);
            else {
              const a = (0, e.getCustomCSS)(l) || "";
              u = `${(0, t.default)(s.styles)} ${a}`;
            }
            a.set(o, u);
          }
          return a.get(o);
        };
        var l = r;
        exports.default = l;
      },
      { "./CustomStyle.js": "I7OA", "./getStylesString.js": "L88J" },
    ],
    WrNB: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = a(require("./getEffectiveStyle.js")),
          t = require("./CustomStyle.js");
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const r = new Map();
        (0, t.attachCustomCSSChange)((e) => {
          r.delete(`${e}_normal`);
        });
        const s = (t, a = !1) => {
          const s = `${t.getMetadata().getTag()}_${a ? "static" : "normal"}`;
          if (!r.has(s)) {
            const o = (0, e.default)(t, a),
              n = new CSSStyleSheet();
            n.replaceSync(o), r.set(s, [n]);
          }
          return r.get(s);
        };
        var o = s;
        exports.default = o;
      },
      { "./getEffectiveStyle.js": "pJL8", "./CustomStyle.js": "I7OA" },
    ],
    OVXr: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("../CSP.js");
        const r = (e) => e.reduce((e, t) => e.concat(Array.isArray(t) ? r(t) : t), []),
          t = (t, a = !1) => {
            let s = t[a ? "staticAreaStyles" : "styles"];
            if (s)
              return (
                Array.isArray(s) || (s = [s]),
                r(s)
                  .filter((e) => !!e)
                  .map((r) => (0, e.getUrl)(r.packageName, r.fileName))
              );
          };
        var a = t;
        exports.default = a;
      },
      { "../CSP.js": "TlaO" },
    ],
    tMqU: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = () => !!window.ShadyDOM;
        var t = e;
        exports.default = t;
      },
      {},
    ],
    KNVy: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = a(require("./renderer/executeTemplate.js")),
          t = a(require("./theming/getConstructableStyle.js")),
          r = a(require("./theming/getEffectiveStyle.js")),
          s = a(require("./theming/getEffectiveLinksHrefs.js")),
          o = a(require("./isLegacyBrowser.js")),
          u = require("./CSP.js");
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const c = (a, c = !1) => {
          let d;
          const l = c ? "staticAreaTemplate" : "template",
            i = c ? a.staticAreaItem.shadowRoot : a.shadowRoot,
            n = (0, e.default)(a.constructor[l], a);
          (0, u.shouldUseLinks)()
            ? (d = (0, s.default)(a.constructor, c))
            : document.adoptedStyleSheets
            ? (i.adoptedStyleSheets = (0, t.default)(a.constructor, c))
            : (0, o.default)() || (d = (0, r.default)(a.constructor, c)),
            a.constructor.render(n, i, d, { host: a });
        };
        var d = c;
        exports.default = d;
      },
      {
        "./renderer/executeTemplate.js": "XzaV",
        "./theming/getConstructableStyle.js": "WrNB",
        "./theming/getEffectiveStyle.js": "pJL8",
        "./theming/getEffectiveLinksHrefs.js": "OVXr",
        "./isLegacyBrowser.js": "tMqU",
        "./CSP.js": "TlaO",
      },
    ],
    SN5R: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = "--_ui5_content_density",
          t = (e) => getComputedStyle(e).getPropertyValue("--_ui5_content_density");
        var o = t;
        exports.default = o;
      },
      {},
    ],
    O6Sq: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.fireLanguageChange = exports.detachLanguageChange = exports.attachLanguageChange = void 0);
        var e = a(require("../EventProvider.js"));
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const t = new e.default(),
          n = "languageChange",
          g = (e) => {
            t.attachEvent(n, e);
          };
        exports.attachLanguageChange = g;
        const r = (e) => {
          t.detachEvent(n, e);
        };
        exports.detachLanguageChange = r;
        const o = (e) => t.fireEventAsync(n, e);
        exports.fireLanguageChange = o;
      },
      { "../EventProvider.js": "vNEW" },
    ],
    Ilua: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.setLanguage = exports.setFetchDefaultLanguage = exports.getLanguage = exports.getFetchDefaultLanguage = void 0);
        var e = require("../InitialConfiguration.js"),
          a = require("../locale/languageChange.js"),
          t = require("../Render.js");
        let g, n;
        const r = () => (void 0 === g && (g = (0, e.getLanguage)()), g);
        exports.getLanguage = r;
        const s = async (e) => {
          g !== e &&
            ((g = e), await (0, a.fireLanguageChange)(e), await (0, t.reRenderAllUI5Elements)({ languageAware: !0 }));
        };
        exports.setLanguage = s;
        const u = (e) => {
          n = e;
        };
        exports.setFetchDefaultLanguage = u;
        const o = () => (void 0 === n && u((0, e.getFetchDefaultLanguage)()), n);
        exports.getFetchDefaultLanguage = o;
      },
      { "../InitialConfiguration.js": "fa6t", "../locale/languageChange.js": "O6Sq", "../Render.js": "tP7g" },
    ],
    wQLE: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = (e) => {
          const t = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(e);
          return t && t[2] ? t[2].split(/,/) : null;
        };
        exports.default = e;
      },
      {},
    ],
    LP58: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("../generated/AssetParameters.js"),
          a = () => {
            const a = navigator.languages;
            return (
              (a && a[0]) ||
              (() => navigator.language)() ||
              navigator.userLanguage ||
              navigator.browserLanguage ||
              e.DEFAULT_LANGUAGE
            );
          };
        exports.default = a;
      },
      { "../generated/AssetParameters.js": "U6MM" },
    ],
    fVM0: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.getRTL = void 0);
        var e = require("../InitialConfiguration.js"),
          t = require("./Language.js"),
          r = u(require("../util/getDesigntimePropertyAsArray.js")),
          i = u(require("../util/detectNavigatorLanguage.js"));
        function u(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const a = { iw: "he", ji: "yi", in: "id", sh: "sr" },
          s = (0, r.default)("$cldr-rtl-locales:ar,fa,he$") || [],
          n = (e) => ((e = (e && a[e]) || e), s.indexOf(e) >= 0),
          l = () => {
            const r = (0, e.getRTL)();
            return null !== r ? !!r : n((0, t.getLanguage)() || (0, i.default)());
          };
        exports.getRTL = l;
      },
      {
        "../InitialConfiguration.js": "fa6t",
        "./Language.js": "Ilua",
        "../util/getDesigntimePropertyAsArray.js": "wQLE",
        "../util/detectNavigatorLanguage.js": "LP58",
      },
    ],
    sSAH: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("../config/RTL.js");
        const t = "--_ui5_dir",
          d = (t) => {
            const d = window.document,
              r = ["ltr", "rtl"],
              i = getComputedStyle(t).getPropertyValue("--_ui5_dir");
            return r.includes(i)
              ? i
              : r.includes(t.dir)
              ? t.dir
              : r.includes(d.documentElement.dir)
              ? d.documentElement.dir
              : r.includes(d.body.dir)
              ? d.body.dir
              : (0, e.getRTL)()
              ? "rtl"
              : void 0;
          };
        var r = d;
        exports.default = r;
      },
      { "../config/RTL.js": "fVM0" },
    ],
    MRAU: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = void 0),
          require("./StaticArea.js");
        var e = r(require("./updateShadowRoot.js")),
          t = require("./Render.js"),
          s = r(require("./util/getEffectiveContentDensity.js")),
          i = require("./CustomElementsScope.js"),
          n = r(require("./locale/getEffectiveDir.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        class a extends HTMLElement {
          constructor() {
            super(), (this._rendered = !1), this.attachShadow({ mode: "open" });
          }
          setOwnerElement(e) {
            (this.ownerElement = e), this.classList.add(this.ownerElement._id);
          }
          update() {
            this._rendered &&
              (this._updateContentDensity(), this._updateDirection(), (0, e.default)(this.ownerElement, !0));
          }
          _updateContentDensity() {
            "compact" === (0, s.default)(this.ownerElement)
              ? (this.classList.add("sapUiSizeCompact"), this.classList.add("ui5-content-density-compact"))
              : (this.classList.remove("sapUiSizeCompact"), this.classList.remove("ui5-content-density-compact"));
          }
          _updateDirection() {
            const e = (0, n.default)(this.ownerElement);
            e ? this.setAttribute("dir", e) : this.removeAttribute("dir");
          }
          async getDomRef() {
            return (
              this._updateContentDensity(),
              this._rendered || ((this._rendered = !0), (0, e.default)(this.ownerElement, !0)),
              await (0, t.renderFinished)(),
              this.shadowRoot
            );
          }
          static getTag() {
            const e = "ui5-static-area-item",
              t = (0, i.getEffectiveScopingSuffixForTag)(e);
            return t ? `${e}-${t}` : e;
          }
          static createInstance() {
            return (
              customElements.get(a.getTag()) || customElements.define(a.getTag(), a),
              document.createElement(this.getTag())
            );
          }
        }
        var o = a;
        exports.default = o;
      },
      {
        "./StaticArea.js": "Wpg3",
        "./updateShadowRoot.js": "KNVy",
        "./Render.js": "tP7g",
        "./util/getEffectiveContentDensity.js": "SN5R",
        "./CustomElementsScope.js": "dBN8",
        "./locale/getEffectiveDir.js": "sSAH",
      },
    ],
    L3gz: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.unobserveDOMNode = exports.setDestroyObserverCallback = exports.setCreateObserverCallback = exports.observeDOMNode = void 0);
        const e = new WeakMap();
        let t = (e, t, s) => {
            const o = new MutationObserver(t);
            return o.observe(e, s), o;
          },
          s = (e) => {
            e.disconnect();
          };
        const o = (e) => {
          "function" == typeof e && (t = e);
        };
        exports.setCreateObserverCallback = o;
        const r = (e) => {
          "function" == typeof e && (s = e);
        };
        exports.setDestroyObserverCallback = r;
        const n = (s, o, r) => {
          const n = t(s, o, r);
          e.set(s, n);
        };
        exports.observeDOMNode = n;
        const c = (t) => {
          const o = e.get(t);
          o && (s(o), e.delete(t));
        };
        exports.unobserveDOMNode = c;
      },
      {},
    ],
    sOcp: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.skipOriginalEvent = exports.setNoConflict = exports.getNoConflict = void 0);
        var e = require("../InitialConfiguration.js");
        const t = ["value-changed"],
          o = (e) => t.includes(e);
        let n;
        const s = (e) => {
            const t = i();
            return !(t.events && t.events.includes && t.events.includes(e));
          },
          i = () => (void 0 === n && (n = (0, e.getNoConflict)()), n);
        exports.getNoConflict = i;
        const r = (e) => {
          const t = i();
          return !o(e) && (!0 === t || !s(e));
        };
        exports.skipOriginalEvent = r;
        const c = (e) => {
          n = e;
        };
        exports.setNoConflict = c;
      },
      { "../InitialConfiguration.js": "fa6t" },
    ],
    J1oz: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = ["disabled", "title", "hidden", "role", "draggable"],
          t = (t) => {
            if (e.includes(t) || t.startsWith("aria")) return !0;
            return ![HTMLElement, Element, Node].some((e) => e.prototype.hasOwnProperty(t));
          };
        var r = t;
        exports.default = r;
      },
      {},
    ],
    NY3S: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = (e, t) => {
          if (e.length !== t.length) return !1;
          for (let r = 0; r < e.length; r++) if (e[r] !== t[r]) return !1;
          return !0;
        };
        var t = e;
        exports.default = t;
      },
      {},
    ],
    bozk: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = (e, t) =>
          class extends e {
            constructor() {
              super(), t && t();
            }
          };
        var t = e;
        exports.default = t;
      },
      {},
    ],
    Cm8r: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = s(require("./getEffectiveLinksHrefs.js")),
          r = s(require("../util/createLinkInHead.js")),
          t = require("../CSP.js");
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const u = new Set(),
          a = (s) => {
            if (!(0, t.shouldUseLinks)() || !(0, t.shouldPreloadLinks)()) return;
            [...((0, e.default)(s, !1) || []), ...((0, e.default)(s, !0) || [])].forEach((e) => {
              u.has(e) || ((0, r.default)(e, { rel: "preload", as: "style" }), u.add(e));
            });
          };
        var d = a;
        exports.default = d;
      },
      { "./getEffectiveLinksHrefs.js": "OVXr", "../util/createLinkInHead.js": "uxMq", "../CSP.js": "TlaO" },
    ],
    Kogr: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var t = C(require("./thirdparty/merge.js")),
          e = require("./Boot.js"),
          s = C(require("./UI5ElementMetadata.js")),
          i = C(require("./EventProvider.js")),
          a = C(require("./util/getSingletonElementInstance.js")),
          r = C(require("./StaticAreaItem.js")),
          n = C(require("./updateShadowRoot.js")),
          o = require("./Render.js"),
          l = require("./CustomElementsRegistry.js"),
          h = require("./DOMObserver.js"),
          d = require("./config/NoConflict.js"),
          c = C(require("./locale/getEffectiveDir.js")),
          u = C(require("./types/DataType.js")),
          g = require("./util/StringHelper.js"),
          p = C(require("./util/isValidPropertyName.js")),
          f = C(require("./util/isDescendantOf.js")),
          m = require("./util/SlotsHelper.js"),
          _ = C(require("./util/arraysAreEqual.js")),
          y = C(require("./util/getClassCopy.js")),
          v = require("./locale/RTLAwareRegistry.js"),
          w = C(require("./theming/preloadLinks.js"));
        function C(t) {
          return t && t.__esModule ? t : { default: t };
        }
        let b = 0;
        const M = new Map(),
          A = new Map();
        function S(t) {
          this._suppressInvalidation ||
            (this.onInvalidation(t),
            this._changedState.push(t),
            (0, o.renderDeferred)(this),
            this._eventProvider.fireEvent("invalidate", { ...t, target: this }));
        }
        class E extends HTMLElement {
          constructor() {
            let t;
            super(),
              (this._changedState = []),
              (this._suppressInvalidation = !0),
              (this._inDOM = !1),
              (this._fullyConnected = !1),
              (this._childChangeListeners = new Map()),
              (this._slotChangeListeners = new Map()),
              (this._eventProvider = new i.default()),
              (this._domRefReadyPromise = new Promise((e) => {
                t = e;
              })),
              (this._domRefReadyPromise._deferredResolve = t),
              this._initializeState(),
              this._upgradeAllProperties(),
              this.constructor._needsShadowDOM() && this.attachShadow({ mode: "open" });
          }
          get _id() {
            return this.__id || (this.__id = `ui5wc_${++b}`), this.__id;
          }
          async connectedCallback() {
            this.setAttribute(this.constructor.getMetadata().getPureTag(), "");
            const t = this.constructor.getMetadata().slotsAreManaged();
            (this._inDOM = !0),
              t && (this._startObservingDOMChildren(), await this._processChildren()),
              this._inDOM &&
                ((0, o.renderImmediately)(this),
                this._domRefReadyPromise._deferredResolve(),
                (this._fullyConnected = !0),
                "function" == typeof this.onEnterDOM && this.onEnterDOM());
          }
          disconnectedCallback() {
            const t = this.constructor.getMetadata().slotsAreManaged();
            (this._inDOM = !1),
              t && this._stopObservingDOMChildren(),
              this._fullyConnected &&
                ("function" == typeof this.onExitDOM && this.onExitDOM(), (this._fullyConnected = !1)),
              this.staticAreaItem &&
                this.staticAreaItem.parentElement &&
                this.staticAreaItem.parentElement.removeChild(this.staticAreaItem),
              (0, o.cancelRender)(this);
          }
          _startObservingDOMChildren() {
            if (!this.constructor.getMetadata().hasSlots()) return;
            const t = this.constructor.getMetadata().canSlotText(),
              e = { childList: !0, subtree: t, characterData: t };
            (0, h.observeDOMNode)(this, this._processChildren.bind(this), e);
          }
          _stopObservingDOMChildren() {
            (0, h.unobserveDOMNode)(this);
          }
          async _processChildren() {
            this.constructor.getMetadata().hasSlots() && (await this._updateSlots());
          }
          async _updateSlots() {
            const t = this.constructor.getMetadata().getSlots(),
              e = this.constructor.getMetadata().canSlotText(),
              s = Array.from(e ? this.childNodes : this.children),
              i = new Map(),
              a = new Map();
            for (const [h, d] of Object.entries(t)) {
              const t = d.propertyName || h;
              a.set(t, h), i.set(t, [...this._state[t]]), this._clearSlot(h, d);
            }
            const r = new Map(),
              n = new Map(),
              o = s.map(async (e, s) => {
                const i = (0, m.getSlotName)(e),
                  a = t[i];
                if (void 0 === a) {
                  const s = Object.keys(t).join(", ");
                  return void console.warn(`Unknown slotName: ${i}, ignoring`, e, `Valid values are: ${s}`);
                }
                if (a.individualSlots) {
                  const t = (r.get(i) || 0) + 1;
                  r.set(i, t), (e._individualSlot = `${i}-${t}`);
                }
                if (e instanceof HTMLElement) {
                  const t = e.localName;
                  if (t.includes("-")) {
                    if (!window.customElements.get(t)) {
                      const e = window.customElements.whenDefined(t);
                      let s = M.get(t);
                      s || ((s = new Promise((t) => setTimeout(t, 1e3))), M.set(t, s)), await Promise.race([e, s]);
                    }
                    window.customElements.upgrade(e);
                  }
                }
                (e = this.constructor.getMetadata().constructor.validateSlotValue(e, a)).isUI5Element &&
                  a.invalidateOnChildChange &&
                  e.attachInvalidate(this._getChildChangeListener(i)),
                  (0, m.isSlot)(e) && this._attachSlotChange(e, i);
                const o = a.propertyName || i;
                n.has(o) ? n.get(o).push({ child: e, idx: s }) : n.set(o, [{ child: e, idx: s }]);
              });
            await Promise.all(o),
              n.forEach((t, e) => {
                this._state[e] = t.sort((t, e) => t.idx - e.idx).map((t) => t.child);
              });
            let l = !1;
            for (const [h, d] of Object.entries(t)) {
              const t = d.propertyName || h;
              (0, _.default)(i.get(t), this._state[t]) ||
                (S.call(this, { type: "slot", name: a.get(t), reason: "children" }), (l = !0));
            }
            l || S.call(this, { type: "slot", name: "default", reason: "textcontent" });
          }
          _clearSlot(t, e) {
            const s = e.propertyName || t;
            this._state[s].forEach((e) => {
              e && e.isUI5Element && e.detachInvalidate(this._getChildChangeListener(t)),
                (0, m.isSlot)(e) && this._detachSlotChange(e, t);
            }),
              (this._state[s] = []);
          }
          attachInvalidate(t) {
            this._eventProvider.attachEvent("invalidate", t);
          }
          detachInvalidate(t) {
            this._eventProvider.detachEvent("invalidate", t);
          }
          _onChildChange(t, e) {
            this.constructor.getMetadata().shouldInvalidateOnChildChange(t, e.type, e.name) &&
              S.call(this, { type: "slot", name: t, reason: "childchange", child: e.target });
          }
          attributeChangedCallback(t, e, s) {
            const i = this.constructor.getMetadata().getProperties(),
              a = t.replace(/^ui5-/, ""),
              r = (0, g.kebabToCamelCase)(a);
            if (i.hasOwnProperty(r)) {
              const t = i[r].type;
              t === Boolean ? (s = null !== s) : (0, f.default)(t, u.default) && (s = t.attributeToProperty(s)),
                (this[r] = s);
            }
          }
          _updateAttribute(t, e) {
            if (!this.constructor.getMetadata().hasAttribute(t)) return;
            const s = this.constructor.getMetadata().getProperties()[t].type,
              i = (0, g.camelToKebabCase)(t),
              a = this.getAttribute(i);
            s === Boolean
              ? !0 === e && null === a
                ? this.setAttribute(i, "")
                : !1 === e && null !== a && this.removeAttribute(i)
              : (0, f.default)(s, u.default)
              ? this.setAttribute(i, s.propertyToAttribute(e))
              : "object" != typeof e && a !== e && this.setAttribute(i, e);
          }
          _upgradeProperty(t) {
            if (this.hasOwnProperty(t)) {
              const e = this[t];
              delete this[t], (this[t] = e);
            }
          }
          _upgradeAllProperties() {
            this.constructor.getMetadata().getPropertiesList().forEach(this._upgradeProperty, this);
          }
          _initializeState() {
            this._state = { ...this.constructor.getMetadata().getInitialState() };
          }
          _getChildChangeListener(t) {
            return (
              this._childChangeListeners.has(t) || this._childChangeListeners.set(t, this._onChildChange.bind(this, t)),
              this._childChangeListeners.get(t)
            );
          }
          _getSlotChangeListener(t) {
            return (
              this._slotChangeListeners.has(t) || this._slotChangeListeners.set(t, this._onSlotChange.bind(this, t)),
              this._slotChangeListeners.get(t)
            );
          }
          _attachSlotChange(t, e) {
            t.addEventListener("slotchange", this._getSlotChangeListener(e));
          }
          _detachSlotChange(t, e) {
            t.removeEventListener("slotchange", this._getSlotChangeListener(e));
          }
          _onSlotChange(t) {
            S.call(this, { type: "slot", name: t, reason: "slotchange" });
          }
          onInvalidation(t) {}
          _render() {
            const t = this.constructor.getMetadata().hasIndividualSlots();
            (this._suppressInvalidation = !0),
              "function" == typeof this.onBeforeRendering && this.onBeforeRendering(),
              this._onComponentStateFinalized && this._onComponentStateFinalized(),
              (this._suppressInvalidation = !1),
              (this._changedState = []),
              this.constructor._needsShadowDOM() && (0, n.default)(this),
              this.staticAreaItem && this.staticAreaItem.update(),
              t && this._assignIndividualSlotsToChildren(),
              "function" == typeof this.onAfterRendering && this.onAfterRendering();
          }
          _assignIndividualSlotsToChildren() {
            Array.from(this.children).forEach((t) => {
              t._individualSlot && t.setAttribute("slot", t._individualSlot);
            });
          }
          _waitForDomRef() {
            return this._domRefReadyPromise;
          }
          getDomRef() {
            if ("function" == typeof this._getRealDomRef) return this._getRealDomRef();
            if (!this.shadowRoot || 0 === this.shadowRoot.children.length) return;
            const t = [...this.shadowRoot.children].filter((t) => !["link", "style"].includes(t.localName));
            return (
              1 !== t.length &&
                console.warn(
                  `The shadow DOM for ${this.constructor
                    .getMetadata()
                    .getTag()} does not have a top level element, the getDomRef() method might not work as expected`
                ),
              t[0]
            );
          }
          getFocusDomRef() {
            const t = this.getDomRef();
            if (t) {
              return t.querySelector("[data-sap-focus-ref]") || t;
            }
          }
          async getFocusDomRefAsync() {
            return await this._waitForDomRef(), this.getFocusDomRef();
          }
          async focus() {
            await this._waitForDomRef();
            const t = this.getFocusDomRef();
            t && "function" == typeof t.focus && t.focus();
          }
          fireEvent(t, e, s = !1, i = !0) {
            const a = this._fireEvent(t, e, s, i),
              r = (0, g.kebabToCamelCase)(t);
            return r !== t ? a && this._fireEvent(r, e, s) : a;
          }
          _fireEvent(t, e, s = !1, i = !0) {
            const a = new CustomEvent(`ui5-${t}`, { detail: e, composed: !1, bubbles: i, cancelable: s }),
              r = this.dispatchEvent(a);
            if ((0, d.skipOriginalEvent)(t)) return r;
            const n = new CustomEvent(t, { detail: e, composed: !1, bubbles: i, cancelable: s });
            return this.dispatchEvent(n) && r;
          }
          getSlottedNodes(t) {
            return (0, m.getSlottedElementsList)(this[t]);
          }
          get effectiveDir() {
            return (0, v.markAsRtlAware)(this.constructor), (0, c.default)(this);
          }
          get isUI5Element() {
            return !0;
          }
          static get observedAttributes() {
            return this.getMetadata().getAttributesList();
          }
          static _needsShadowDOM() {
            return !!this.template;
          }
          static _needsStaticArea() {
            return !!this.staticAreaTemplate;
          }
          getStaticAreaItemDomRef() {
            if (!this.constructor._needsStaticArea()) throw new Error("This component does not use the static area");
            return (
              this.staticAreaItem ||
                ((this.staticAreaItem = r.default.createInstance()), this.staticAreaItem.setOwnerElement(this)),
              this.staticAreaItem.parentElement || (0, a.default)("ui5-static-area").appendChild(this.staticAreaItem),
              this.staticAreaItem.getDomRef()
            );
          }
          static _generateAccessors() {
            const t = this.prototype,
              e = this.getMetadata().slotsAreManaged(),
              s = this.getMetadata().getProperties();
            for (const [i, a] of Object.entries(s)) {
              if (
                ((0, p.default)(i) ||
                  console.warn(`"${i}" is not a valid property name. Use a name that does not collide with DOM APIs`),
                a.type === Boolean && a.defaultValue)
              )
                throw new Error(`Cannot set a default value for property "${i}". All booleans are false by default.`);
              if (a.type === Array)
                throw new Error(
                  `Wrong type for property "${i}". Properties cannot be of type Array - use "multiple: true" and set "type" to the single value type, such as "String", "Object", etc...`
                );
              if (a.type === Object && a.defaultValue)
                throw new Error(
                  `Cannot set a default value for property "${i}". All properties of type "Object" are empty objects by default.`
                );
              if (a.multiple && a.defaultValue)
                throw new Error(
                  `Cannot set a default value for property "${i}". All multiple properties are empty arrays by default.`
                );
              Object.defineProperty(t, i, {
                get() {
                  if (void 0 !== this._state[i]) return this._state[i];
                  const t = a.defaultValue;
                  return a.type !== Boolean && (a.type === String ? t : a.multiple ? [] : t);
                },
                set(t) {
                  let e;
                  t = this.constructor.getMetadata().constructor.validatePropertyValue(t, a);
                  const s = this._state[i];
                  (e =
                    a.multiple && a.compareValues
                      ? !(0, _.default)(s, t)
                      : (0, f.default)(a.type, u.default)
                      ? !a.type.valuesAreEqual(s, t)
                      : s !== t) &&
                    ((this._state[i] = t),
                    S.call(this, { type: "property", name: i, newValue: t, oldValue: s }),
                    this._updateAttribute(i, t));
                },
              });
            }
            if (e) {
              const e = this.getMetadata().getSlots();
              for (const [s, i] of Object.entries(e)) {
                (0, p.default)(s) ||
                  console.warn(`"${s}" is not a valid property name. Use a name that does not collide with DOM APIs`);
                const e = i.propertyName || s;
                Object.defineProperty(t, e, {
                  get() {
                    return void 0 !== this._state[e] ? this._state[e] : [];
                  },
                  set() {
                    throw new Error(
                      "Cannot set slot content directly, use the DOM APIs (appendChild, removeChild, etc...)"
                    );
                  },
                });
              }
            }
          }
          static get metadata() {
            return {};
          }
          static get styles() {
            return "";
          }
          static get staticAreaStyles() {
            return "";
          }
          static get dependencies() {
            return [];
          }
          static getUniqueDependencies() {
            if (!A.has(this)) {
              const t = this.dependencies.filter((t, e, s) => s.indexOf(t) === e);
              A.set(this, t);
            }
            return A.get(this);
          }
          static whenDependenciesDefined() {
            return Promise.all(this.getUniqueDependencies().map((t) => t.define()));
          }
          static async onDefine() {
            return Promise.resolve();
          }
          static async define() {
            await (0, e.boot)(), await Promise.all([this.whenDependenciesDefined(), this.onDefine()]);
            const t = this.getMetadata().getTag(),
              s = this.getMetadata().getAltTag(),
              i = (0, l.isTagRegistered)(t),
              a = customElements.get(t);
            return (
              a && !i
                ? (0, l.recordTagRegistrationFailure)(t)
                : a ||
                  (this._generateAccessors(),
                  (0, l.registerTag)(t),
                  window.customElements.define(t, this),
                  (0, w.default)(this),
                  s &&
                    !customElements.get(s) &&
                    ((0, l.registerTag)(s),
                    window.customElements.define(
                      s,
                      (0, y.default)(this, () => {
                        console.log(
                          `The ${s} tag is deprecated and will be removed in the next release, please use ${t} instead.`
                        );
                      })
                    ))),
              this
            );
          }
          static getMetadata() {
            if (this.hasOwnProperty("_metadata")) return this._metadata;
            const e = [this.metadata];
            let i = this;
            for (; i !== E; ) (i = Object.getPrototypeOf(i)), e.unshift(i.metadata);
            const a = (0, t.default)({}, ...e);
            return (this._metadata = new s.default(a)), this._metadata;
          }
        }
        var D = E;
        exports.default = D;
      },
      {
        "./thirdparty/merge.js": "QNvL",
        "./Boot.js": "oXKF",
        "./UI5ElementMetadata.js": "sPrT",
        "./EventProvider.js": "vNEW",
        "./util/getSingletonElementInstance.js": "zr7a",
        "./StaticAreaItem.js": "MRAU",
        "./updateShadowRoot.js": "KNVy",
        "./Render.js": "tP7g",
        "./CustomElementsRegistry.js": "BtPA",
        "./DOMObserver.js": "L3gz",
        "./config/NoConflict.js": "sOcp",
        "./locale/getEffectiveDir.js": "sSAH",
        "./types/DataType.js": "bqvp",
        "./util/StringHelper.js": "DrCH",
        "./util/isValidPropertyName.js": "J1oz",
        "./util/isDescendantOf.js": "oX07",
        "./util/SlotsHelper.js": "CFla",
        "./util/arraysAreEqual.js": "NY3S",
        "./util/getClassCopy.js": "bozk",
        "./locale/RTLAwareRegistry.js": "WhUZ",
        "./theming/preloadLinks.js": "Cm8r",
      },
    ],
    KMqM: [
      function (require, module, exports) {
        "use strict";
        var t;
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.svg = exports.render = exports.nothing = exports.noChange = exports.html = exports._$LH = void 0);
        const e = globalThis.trustedTypes,
          i = e ? e.createPolicy("lit-html", { createHTML: (t) => t }) : void 0,
          s = `lit$${(Math.random() + "").slice(9)}$`,
          n = "?" + s,
          o = `<${n}>`,
          l = document,
          r = (t = "") => l.createComment(t),
          h = (t) => null === t || ("object" != typeof t && "function" != typeof t),
          $ = Array.isArray,
          d = (t) => {
            var e;
            return $(t) || "function" == typeof (null === (e = t) || void 0 === e ? void 0 : e[Symbol.iterator]);
          },
          a = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
          A = /-->/g,
          u = />/g,
          _ = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
          c = /'/g,
          v = /"/g,
          p = /^(?:script|style|textarea)$/i,
          g = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }),
          m = g(1),
          f = g(2),
          x = Symbol.for("lit-noChange"),
          y = Symbol.for("lit-nothing"),
          H = new WeakMap(),
          N = (t, e, i) => {
            var s, n;
            const o = null !== (s = null == i ? void 0 : i.renderBefore) && void 0 !== s ? s : e;
            let l = o._$litPart$;
            if (void 0 === l) {
              const t = null !== (n = null == i ? void 0 : i.renderBefore) && void 0 !== n ? n : null;
              o._$litPart$ = l = new w(e.insertBefore(r(), t), t, void 0, null != i ? i : {});
            }
            return l._$AI(t), l;
          },
          b = l.createTreeWalker(l, 129, null, !1),
          C = (t, e) => {
            const n = t.length - 1,
              l = [];
            let r,
              h = 2 === e ? "<svg>" : "",
              $ = a;
            for (let i = 0; i < n; i++) {
              const e = t[i];
              let n,
                d,
                g = -1,
                m = 0;
              for (; m < e.length && (($.lastIndex = m), null !== (d = $.exec(e))); )
                (m = $.lastIndex),
                  $ === a
                    ? "!--" === d[1]
                      ? ($ = A)
                      : void 0 !== d[1]
                      ? ($ = u)
                      : void 0 !== d[2]
                      ? (p.test(d[2]) && (r = RegExp("</" + d[2], "g")), ($ = _))
                      : void 0 !== d[3] && ($ = _)
                    : $ === _
                    ? ">" === d[0]
                      ? (($ = null != r ? r : a), (g = -1))
                      : void 0 === d[1]
                      ? (g = -2)
                      : ((g = $.lastIndex - d[2].length), (n = d[1]), ($ = void 0 === d[3] ? _ : '"' === d[3] ? v : c))
                    : $ === v || $ === c
                    ? ($ = _)
                    : $ === A || $ === u
                    ? ($ = a)
                    : (($ = _), (r = void 0));
              const f = $ === _ && t[i + 1].startsWith("/>") ? " " : "";
              h +=
                $ === a
                  ? e + o
                  : g >= 0
                  ? (l.push(n), e.slice(0, g) + "$lit$" + e.slice(g) + s + f)
                  : e + s + (-2 === g ? (l.push(void 0), i) : f);
            }
            const d = h + (t[n] || "<?>") + (2 === e ? "</svg>" : "");
            return [void 0 !== i ? i.createHTML(d) : d, l];
          };
        (exports.render = N), (exports.nothing = y), (exports.noChange = x), (exports.svg = f), (exports.html = m);
        class T {
          constructor({ strings: t, _$litType$: i }, o) {
            let l;
            this.parts = [];
            let h = 0,
              $ = 0;
            const d = t.length - 1,
              a = this.parts,
              [A, u] = C(t, i);
            if (((this.el = T.createElement(A, o)), (b.currentNode = this.el.content), 2 === i)) {
              const t = this.el.content,
                e = t.firstChild;
              e.remove(), t.append(...e.childNodes);
            }
            for (; null !== (l = b.nextNode()) && a.length < d; ) {
              if (1 === l.nodeType) {
                if (l.hasAttributes()) {
                  const t = [];
                  for (const e of l.getAttributeNames())
                    if (e.endsWith("$lit$") || e.startsWith(s)) {
                      const i = u[$++];
                      if ((t.push(e), void 0 !== i)) {
                        const t = l.getAttribute(i.toLowerCase() + "$lit$").split(s),
                          e = /([.?@])?(.*)/.exec(i);
                        a.push({
                          type: 1,
                          index: h,
                          name: e[2],
                          strings: t,
                          ctor: "." === e[1] ? B : "?" === e[1] ? E : "@" === e[1] ? L : I,
                        });
                      } else a.push({ type: 6, index: h });
                    }
                  for (const e of t) l.removeAttribute(e);
                }
                if (p.test(l.tagName)) {
                  const t = l.textContent.split(s),
                    i = t.length - 1;
                  if (i > 0) {
                    l.textContent = e ? e.emptyScript : "";
                    for (let e = 0; e < i; e++) l.append(t[e], r()), b.nextNode(), a.push({ type: 2, index: ++h });
                    l.append(t[i], r());
                  }
                }
              } else if (8 === l.nodeType)
                if (l.data === n) a.push({ type: 2, index: h });
                else {
                  let t = -1;
                  for (; -1 !== (t = l.data.indexOf(s, t + 1)); ) a.push({ type: 7, index: h }), (t += s.length - 1);
                }
              h++;
            }
          }
          static createElement(t, e) {
            const i = l.createElement("template");
            return (i.innerHTML = t), i;
          }
        }
        function M(t, e, i = t, s) {
          var n, o, l, r;
          if (e === x) return e;
          let $ = void 0 !== s ? (null === (n = i._$Cl) || void 0 === n ? void 0 : n[s]) : i._$Cu;
          const d = h(e) ? void 0 : e._$litDirective$;
          return (
            (null == $ ? void 0 : $.constructor) !== d &&
              (null === (o = null == $ ? void 0 : $._$AO) || void 0 === o || o.call($, !1),
              void 0 === d ? ($ = void 0) : ($ = new d(t))._$AT(t, i, s),
              void 0 !== s ? ((null !== (l = (r = i)._$Cl) && void 0 !== l ? l : (r._$Cl = []))[s] = $) : (i._$Cu = $)),
            void 0 !== $ && (e = M(t, $._$AS(t, e.values), $, s)),
            e
          );
        }
        class S {
          constructor(t, e) {
            (this.v = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = e);
          }
          get parentNode() {
            return this._$AM.parentNode;
          }
          get _$AU() {
            return this._$AM._$AU;
          }
          p(t) {
            var e;
            const {
                el: { content: i },
                parts: s,
              } = this._$AD,
              n = (null !== (e = null == t ? void 0 : t.creationScope) && void 0 !== e ? e : l).importNode(i, !0);
            b.currentNode = n;
            let o = b.nextNode(),
              r = 0,
              h = 0,
              $ = s[0];
            for (; void 0 !== $; ) {
              if (r === $.index) {
                let e;
                2 === $.type
                  ? (e = new w(o, o.nextSibling, this, t))
                  : 1 === $.type
                  ? (e = new $.ctor(o, $.name, $.strings, this, t))
                  : 6 === $.type && (e = new P(o, this, t)),
                  this.v.push(e),
                  ($ = s[++h]);
              }
              r !== (null == $ ? void 0 : $.index) && ((o = b.nextNode()), r++);
            }
            return n;
          }
          m(t) {
            let e = 0;
            for (const i of this.v)
              void 0 !== i && (void 0 !== i.strings ? (i._$AI(t, i, e), (e += i.strings.length - 2)) : i._$AI(t[e])),
                e++;
          }
        }
        class w {
          constructor(t, e, i, s) {
            var n;
            (this.type = 2),
              (this._$AH = y),
              (this._$AN = void 0),
              (this._$AA = t),
              (this._$AB = e),
              (this._$AM = i),
              (this.options = s),
              (this._$Cg = null === (n = null == s ? void 0 : s.isConnected) || void 0 === n || n);
          }
          get _$AU() {
            var t, e;
            return null !== (e = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== e
              ? e
              : this._$Cg;
          }
          get parentNode() {
            let t = this._$AA.parentNode;
            const e = this._$AM;
            return void 0 !== e && 11 === t.nodeType && (t = e.parentNode), t;
          }
          get startNode() {
            return this._$AA;
          }
          get endNode() {
            return this._$AB;
          }
          _$AI(t, e = this) {
            (t = M(this, t, e)),
              h(t)
                ? t === y || null == t || "" === t
                  ? (this._$AH !== y && this._$AR(), (this._$AH = y))
                  : t !== this._$AH && t !== x && this.$(t)
                : void 0 !== t._$litType$
                ? this.T(t)
                : void 0 !== t.nodeType
                ? this.S(t)
                : d(t)
                ? this.M(t)
                : this.$(t);
          }
          A(t, e = this._$AB) {
            return this._$AA.parentNode.insertBefore(t, e);
          }
          S(t) {
            this._$AH !== t && (this._$AR(), (this._$AH = this.A(t)));
          }
          $(t) {
            this._$AH !== y && h(this._$AH) ? (this._$AA.nextSibling.data = t) : this.S(l.createTextNode(t)),
              (this._$AH = t);
          }
          T(t) {
            var e;
            const { values: i, _$litType$: s } = t,
              n =
                "number" == typeof s
                  ? this._$AC(t)
                  : (void 0 === s.el && (s.el = T.createElement(s.h, this.options)), s);
            if ((null === (e = this._$AH) || void 0 === e ? void 0 : e._$AD) === n) this._$AH.m(i);
            else {
              const t = new S(n, this),
                e = t.p(this.options);
              t.m(i), this.S(e), (this._$AH = t);
            }
          }
          _$AC(t) {
            let e = H.get(t.strings);
            return void 0 === e && H.set(t.strings, (e = new T(t))), e;
          }
          M(t) {
            $(this._$AH) || ((this._$AH = []), this._$AR());
            const e = this._$AH;
            let i,
              s = 0;
            for (const n of t)
              s === e.length ? e.push((i = new w(this.A(r()), this.A(r()), this, this.options))) : (i = e[s]),
                i._$AI(n),
                s++;
            s < e.length && (this._$AR(i && i._$AB.nextSibling, s), (e.length = s));
          }
          _$AR(t = this._$AA.nextSibling, e) {
            var i;
            for (null === (i = this._$AP) || void 0 === i || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
              const e = t.nextSibling;
              t.remove(), (t = e);
            }
          }
          setConnected(t) {
            var e;
            void 0 === this._$AM && ((this._$Cg = t), null === (e = this._$AP) || void 0 === e || e.call(this, t));
          }
        }
        class I {
          constructor(t, e, i, s, n) {
            (this.type = 1),
              (this._$AH = y),
              (this._$AN = void 0),
              (this.element = t),
              (this.name = e),
              (this._$AM = s),
              (this.options = n),
              i.length > 2 || "" !== i[0] || "" !== i[1]
                ? ((this._$AH = Array(i.length - 1).fill(new String())), (this.strings = i))
                : (this._$AH = y);
          }
          get tagName() {
            return this.element.tagName;
          }
          get _$AU() {
            return this._$AM._$AU;
          }
          _$AI(t, e = this, i, s) {
            const n = this.strings;
            let o = !1;
            if (void 0 === n) (t = M(this, t, e, 0)), (o = !h(t) || (t !== this._$AH && t !== x)) && (this._$AH = t);
            else {
              const s = t;
              let l, r;
              for (t = n[0], l = 0; l < n.length - 1; l++)
                (r = M(this, s[i + l], e, l)) === x && (r = this._$AH[l]),
                  o || (o = !h(r) || r !== this._$AH[l]),
                  r === y ? (t = y) : t !== y && (t += (null != r ? r : "") + n[l + 1]),
                  (this._$AH[l] = r);
            }
            o && !s && this.k(t);
          }
          k(t) {
            t === y
              ? this.element.removeAttribute(this.name)
              : this.element.setAttribute(this.name, null != t ? t : "");
          }
        }
        class B extends I {
          constructor() {
            super(...arguments), (this.type = 3);
          }
          k(t) {
            this.element[this.name] = t === y ? void 0 : t;
          }
        }
        class E extends I {
          constructor() {
            super(...arguments), (this.type = 4);
          }
          k(t) {
            t && t !== y ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
          }
        }
        class L extends I {
          constructor(t, e, i, s, n) {
            super(t, e, i, s, n), (this.type = 5);
          }
          _$AI(t, e = this) {
            var i;
            if ((t = null !== (i = M(this, t, e, 0)) && void 0 !== i ? i : y) === x) return;
            const s = this._$AH,
              n = (t === y && s !== y) || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive,
              o = t !== y && (s === y || n);
            n && this.element.removeEventListener(this.name, this, s),
              o && this.element.addEventListener(this.name, this, t),
              (this._$AH = t);
          }
          handleEvent(t) {
            var e, i;
            "function" == typeof this._$AH
              ? this._$AH.call(
                  null !== (i = null === (e = this.options) || void 0 === e ? void 0 : e.host) && void 0 !== i
                    ? i
                    : this.element,
                  t
                )
              : this._$AH.handleEvent(t);
          }
        }
        class P {
          constructor(t, e, i) {
            (this.element = t), (this.type = 6), (this._$AN = void 0), (this._$AM = e), (this.options = i);
          }
          get _$AU() {
            return this._$AM._$AU;
          }
          _$AI(t) {
            M(this, t);
          }
        }
        const U = { P: "$lit$", V: s, L: n, I: 1, N: C, R: S, D: d, j: M, H: w, O: I, F: E, B: L, W: B, Z: P },
          R = window.litHtmlPolyfillSupport;
        (exports._$LH = U),
          null == R || R(T, w),
          (null !== (t = globalThis.litHtmlVersions) && void 0 !== t ? t : (globalThis.litHtmlVersions = [])).push(
            "2.0.1"
          );
      },
      {},
    ],
    STPk: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.withStatic = exports.unsafeStatic = exports.svg = exports.literal = exports.html = void 0);
        var t = require("./lit-html.js");
        const e = (t) => ({ _$litStatic$: t }),
          s = (t, ...e) => ({
            _$litStatic$: e.reduce(
              (e, s, i) =>
                e +
                ((t) => {
                  if (void 0 !== t._$litStatic$) return t._$litStatic$;
                  throw Error(
                    `Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`
                  );
                })(s) +
                t[i + 1],
              t[0]
            ),
          }),
          i = new Map(),
          r = (t) => (e, ...s) => {
            var r;
            const o = s.length;
            let l, a;
            const u = [],
              c = [];
            let n,
              p = 0,
              $ = !1;
            for (; p < o; ) {
              for (
                n = e[p];
                p < o && void 0 !== (l = null === (r = a = s[p]) || void 0 === r ? void 0 : r._$litStatic$);

              )
                (n += l + e[++p]), ($ = !0);
              c.push(a), u.push(n), p++;
            }
            if ((p === o && u.push(e[o]), $)) {
              const t = u.join("$$lit$$");
              void 0 === (e = i.get(t)) && i.set(t, (e = u)), (s = c);
            }
            return t(e, ...s);
          },
          o = r(t.html),
          l = r(t.svg);
        (exports.svg = l),
          (exports.html = o),
          (exports.withStatic = r),
          (exports.literal = s),
          (exports.unsafeStatic = e);
      },
      { "./lit-html.js": "KMqM" },
    ],
    EGfe: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.directive = exports.PartType = exports.Directive = void 0);
        const e = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 },
          t = (e) => (...t) => ({ _$litDirective$: e, values: t });
        (exports.directive = t), (exports.PartType = e);
        class r {
          constructor(e) {}
          get _$AU() {
            return this._$AM._$AU;
          }
          _$AT(e, t, r) {
            (this._$Ct = e), (this._$AM = t), (this._$Ci = r);
          }
          _$AS(e, t) {
            return this.update(e, t);
          }
          update(e, t) {
            return this.render(...t);
          }
        }
        exports.Directive = r;
      },
      {},
    ],
    RGyk: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.setCommittedValue = exports.setChildPartValue = exports.removePart = exports.isTemplateResult = exports.isSingleExpression = exports.isPrimitive = exports.isDirectiveResult = exports.insertPart = exports.getDirectiveClass = exports.getCommittedValue = exports.clearPart = exports.TemplateResultType = void 0);
        var e = require("./lit-html.js");
        const { H: t } = e._$LH,
          i = (e) => null === e || ("object" != typeof e && "function" != typeof e),
          r = { HTML: 1, SVG: 2 },
          o = (e, t) => {
            var i, r;
            return void 0 === t
              ? void 0 !== (null === (i = e) || void 0 === i ? void 0 : i._$litType$)
              : (null === (r = e) || void 0 === r ? void 0 : r._$litType$) === t;
          },
          s = (e) => {
            var t;
            return void 0 !== (null === (t = e) || void 0 === t ? void 0 : t._$litDirective$);
          },
          l = (e) => {
            var t;
            return null === (t = e) || void 0 === t ? void 0 : t._$litDirective$;
          },
          n = (e) => void 0 === e.strings,
          p = () => document.createComment(""),
          v = (e, i, r) => {
            var o;
            const s = e._$AA.parentNode,
              l = void 0 === i ? e._$AB : i._$AA;
            if (void 0 === r) {
              const i = s.insertBefore(p(), l),
                o = s.insertBefore(p(), l);
              r = new t(i, o, e, e.options);
            } else {
              const t = r._$AB.nextSibling,
                i = r._$AM,
                n = i !== e;
              if (n) {
                let t;
                null === (o = r._$AQ) || void 0 === o || o.call(r, e),
                  (r._$AM = e),
                  void 0 !== r._$AP && (t = e._$AU) !== i._$AU && r._$AP(t);
              }
              if (t !== l || n) {
                let e = r._$AA;
                for (; e !== t; ) {
                  const t = e.nextSibling;
                  s.insertBefore(e, l), (e = t);
                }
              }
            }
            return r;
          },
          a = (e, t, i = e) => (e._$AI(t, i), e),
          x = {},
          u = (e, t = x) => (e._$AH = t),
          d = (e) => e._$AH,
          $ = (e) => {
            var t;
            null === (t = e._$AP) || void 0 === t || t.call(e, !1, !0);
            let i = e._$AA;
            const r = e._$AB.nextSibling;
            for (; i !== r; ) {
              const e = i.nextSibling;
              i.remove(), (i = e);
            }
          },
          _ = (e) => {
            e._$AR();
          };
        (exports.clearPart = _),
          (exports.removePart = $),
          (exports.getCommittedValue = d),
          (exports.setCommittedValue = u),
          (exports.setChildPartValue = a),
          (exports.insertPart = v),
          (exports.isSingleExpression = n),
          (exports.getDirectiveClass = l),
          (exports.isDirectiveResult = s),
          (exports.isTemplateResult = o),
          (exports.TemplateResultType = r),
          (exports.isPrimitive = i);
      },
      { "./lit-html.js": "KMqM" },
    ],
    jBp4: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.repeat = void 0);
        var e = require("../lit-html.js"),
          t = require("../directive.js"),
          r = require("../directive-helpers.js");
        const s = (e, t, r) => {
            const s = new Map();
            for (let l = t; l <= r; l++) s.set(e[l], l);
            return s;
          },
          l = (0, t.directive)(
            class extends t.Directive {
              constructor(e) {
                if ((super(e), e.type !== t.PartType.CHILD))
                  throw Error("repeat() can only be used in text expressions");
              }
              dt(e, t, r) {
                let s;
                void 0 === r ? (r = t) : void 0 !== t && (s = t);
                const l = [],
                  i = [];
                let a = 0;
                for (const n of e) (l[a] = s ? s(n, a) : a), (i[a] = r(n, a)), a++;
                return { values: i, keys: l };
              }
              render(e, t, r) {
                return this.dt(e, t, r).values;
              }
              update(t, [l, i, a]) {
                var n;
                const o = (0, r.getCommittedValue)(t),
                  { values: u, keys: d } = this.dt(l, i, a);
                if (!Array.isArray(o)) return (this.ct = d), u;
                const c = null !== (n = this.ct) && void 0 !== n ? n : (this.ct = []),
                  h = [];
                let v,
                  f,
                  P = 0,
                  p = o.length - 1,
                  C = 0,
                  V = u.length - 1;
                for (; P <= p && C <= V; )
                  if (null === o[P]) P++;
                  else if (null === o[p]) p--;
                  else if (c[P] === d[C]) (h[C] = (0, r.setChildPartValue)(o[P], u[C])), P++, C++;
                  else if (c[p] === d[V]) (h[V] = (0, r.setChildPartValue)(o[p], u[V])), p--, V--;
                  else if (c[P] === d[V])
                    (h[V] = (0, r.setChildPartValue)(o[P], u[V])), (0, r.insertPart)(t, h[V + 1], o[P]), P++, V--;
                  else if (c[p] === d[C])
                    (h[C] = (0, r.setChildPartValue)(o[p], u[C])), (0, r.insertPart)(t, o[P], o[p]), p--, C++;
                  else if ((void 0 === v && ((v = s(d, C, V)), (f = s(c, P, p))), v.has(c[P])))
                    if (v.has(c[p])) {
                      const e = f.get(d[C]),
                        s = void 0 !== e ? o[e] : null;
                      if (null === s) {
                        const e = (0, r.insertPart)(t, o[P]);
                        (0, r.setChildPartValue)(e, u[C]), (h[C] = e);
                      } else (h[C] = (0, r.setChildPartValue)(s, u[C])), (0, r.insertPart)(t, o[P], s), (o[e] = null);
                      C++;
                    } else (0, r.removePart)(o[p]), p--;
                  else (0, r.removePart)(o[P]), P++;
                for (; C <= V; ) {
                  const e = (0, r.insertPart)(t, h[V + 1]);
                  (0, r.setChildPartValue)(e, u[C]), (h[C++] = e);
                }
                for (; P <= p; ) {
                  const e = o[P++];
                  null !== e && (0, r.removePart)(e);
                }
                return (this.ct = d), (0, r.setCommittedValue)(t, h), e.noChange;
              }
            }
          );
        exports.repeat = l;
      },
      { "../lit-html.js": "KMqM", "../directive.js": "EGfe", "../directive-helpers.js": "RGyk" },
    ],
    zFN9: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.classMap = void 0);
        var t = require("../lit-html.js"),
          e = require("../directive.js");
        const s = (0, e.directive)(
          class extends e.Directive {
            constructor(t) {
              var s;
              if (
                (super(t),
                t.type !== e.PartType.ATTRIBUTE ||
                  "class" !== t.name ||
                  (null === (s = t.strings) || void 0 === s ? void 0 : s.length) > 2)
              )
                throw Error(
                  "`classMap()` can only be used in the `class` attribute and must be the only part in the attribute."
                );
            }
            render(t) {
              return (
                " " +
                Object.keys(t)
                  .filter((e) => t[e])
                  .join(" ") +
                " "
              );
            }
            update(e, [s]) {
              var i, r;
              if (void 0 === this.st) {
                (this.st = new Set()),
                  void 0 !== e.strings &&
                    (this.et = new Set(
                      e.strings
                        .join(" ")
                        .split(/\s/)
                        .filter((t) => "" !== t)
                    ));
                for (const t in s)
                  s[t] && !(null === (i = this.et) || void 0 === i ? void 0 : i.has(t)) && this.st.add(t);
                return this.render(s);
              }
              const n = e.element.classList;
              this.st.forEach((t) => {
                t in s || (n.remove(t), this.st.delete(t));
              });
              for (const t in s) {
                const e = !!s[t];
                e === this.st.has(t) ||
                  (null === (r = this.et) || void 0 === r ? void 0 : r.has(t)) ||
                  (e ? (n.add(t), this.st.add(t)) : (n.remove(t), this.st.delete(t)));
              }
              return t.noChange;
            }
          }
        );
        exports.classMap = s;
      },
      { "../lit-html.js": "KMqM", "../directive.js": "EGfe" },
    ],
    I5ut: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.styleMap = void 0);
        var e = require("lit-html"),
          t = require("lit-html/directive.js");
        class r extends t.Directive {
          constructor(e) {
            var r;
            if (
              (super(e),
              e.type !== t.PartType.ATTRIBUTE ||
                "style" !== e.name ||
                (null === (r = e.strings) || void 0 === r ? void 0 : r.length) > 2)
            )
              throw new Error(
                "The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute."
              );
          }
          render(e) {
            return "";
          }
          update(t, [r]) {
            const { style: s } = t.element;
            if (void 0 === this._previousStyleProperties) {
              this._previousStyleProperties = new Set();
              for (const e in r) this._previousStyleProperties.add(e);
            }
            this._previousStyleProperties.forEach((e) => {
              null == r[e] &&
                (this._previousStyleProperties.delete(e), e.includes("-") ? s.removeProperty(e) : (s[e] = ""));
            });
            for (const e in r) {
              const t = r[e];
              null != t && (this._previousStyleProperties.add(e), e.includes("-") ? s.setProperty(e, t) : (s[e] = t));
            }
            return e.noChange;
          }
        }
        const s = (0, t.directive)(r);
        exports.styleMap = s;
      },
      { "lit-html": "KMqM", "lit-html/directive.js": "EGfe" },
    ],
    CFRe: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.ifDefined = void 0);
        var e = require("../lit-html.js");
        const t = (t) => (null != t ? t : e.nothing);
        exports.ifDefined = t;
      },
      { "../lit-html.js": "KMqM" },
    ],
    VZdO: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.unsafeHTML = exports.UnsafeHTMLDirective = void 0);
        var t = require("../lit-html.js"),
          e = require("../directive.js");
        class r extends e.Directive {
          constructor(r) {
            if ((super(r), (this.it = t.nothing), r.type !== e.PartType.CHILD))
              throw Error(this.constructor.directiveName + "() can only be used in child bindings");
          }
          render(e) {
            if (e === t.nothing || null == e) return (this.vt = void 0), (this.it = e);
            if (e === t.noChange) return e;
            if ("string" != typeof e) throw Error(this.constructor.directiveName + "() called with a non-string value");
            if (e === this.it) return this.vt;
            this.it = e;
            const r = [e];
            return (r.raw = r), (this.vt = { _$litType$: this.constructor.resultType, strings: r, values: [] });
          }
        }
        (exports.UnsafeHTMLDirective = r), (r.directiveName = "unsafeHTML"), (r.resultType = 1);
        const i = (0, e.directive)(r);
        exports.unsafeHTML = i;
      },
      { "../lit-html.js": "KMqM", "../directive.js": "EGfe" },
    ],
    rvEG: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          Object.defineProperty(exports, "classMap", {
            enumerable: !0,
            get: function () {
              return s.classMap;
            },
          }),
          (exports.default = void 0),
          Object.defineProperty(exports, "html", {
            enumerable: !0,
            get: function () {
              return t.html;
            },
          }),
          Object.defineProperty(exports, "ifDefined", {
            enumerable: !0,
            get: function () {
              return i.ifDefined;
            },
          }),
          Object.defineProperty(exports, "repeat", {
            enumerable: !0,
            get: function () {
              return r.repeat;
            },
          }),
          (exports.scopeTag = void 0),
          Object.defineProperty(exports, "styleMap", {
            enumerable: !0,
            get: function () {
              return n.styleMap;
            },
          }),
          Object.defineProperty(exports, "svg", {
            enumerable: !0,
            get: function () {
              return t.svg;
            },
          }),
          Object.defineProperty(exports, "unsafeHTML", {
            enumerable: !0,
            get: function () {
              return u.unsafeHTML;
            },
          }),
          Object.defineProperty(exports, "unsafeStatic", {
            enumerable: !0,
            get: function () {
              return t.unsafeStatic;
            },
          });
        var e = require("lit-html"),
          t = require("lit-html/static.js"),
          r = require("lit-html/directives/repeat.js"),
          s = require("lit-html/directives/class-map.js"),
          n = require("./directives/style-map.js"),
          i = require("lit-html/directives/if-defined.js"),
          u = require("lit-html/directives/unsafe-html.js");
        const l = (r, s, n, { host: i } = {}) => {
            "string" == typeof n
              ? (r = t.html`<style>${n}</style>${r}`)
              : Array.isArray(n) &&
                n.length &&
                (r = t.html`${n.map((e) => t.html`<link type="text/css" rel="stylesheet" href="${e}">`)}${r}`),
              (0, e.render)(r, s, { host: i });
          },
          a = (e, r, s) => {
            const n = s && (r || []).includes(e) ? `${e}-${s}` : e;
            return (0, t.unsafeStatic)(n);
          };
        exports.scopeTag = a;
        var o = l;
        exports.default = o;
      },
      {
        "lit-html": "KMqM",
        "lit-html/static.js": "STPk",
        "lit-html/directives/repeat.js": "jBp4",
        "lit-html/directives/class-map.js": "zFN9",
        "./directives/style-map.js": "I5ut",
        "lit-html/directives/if-defined.js": "CFRe",
        "lit-html/directives/unsafe-html.js": "VZdO",
      },
    ],
    nuHb: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = { H1: "H1", H2: "H2", H3: "H3", H4: "H4", H5: "H5", H6: "H6" };
        class r extends e.default {
          static isValid(e) {
            return !!s[e];
          }
        }
        r.generateTypeAccessors(s);
        var a = r;
        exports.default = a;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    kicx: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = { None: "None", Normal: "Normal" };
        class r extends e.default {
          static isValid(e) {
            return !!s[e];
          }
        }
        r.generateTypeAccessors(s);
        var a = r;
        exports.default = a;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    AOX8: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var i = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const t = (t, r, h) =>
            i.html`${t.h1 ? e(t, r, h) : void 0}${t.h2 ? s(t, r, h) : void 0}${t.h3 ? o(t, r, h) : void 0}${
              t.h4 ? n(t, r, h) : void 0
            }${t.h5 ? l(t, r, h) : void 0}${t.h6 ? d(t, r, h) : void 0}`,
          e = (t, e, s) =>
            i.html`<h1 class="ui5-title-root"><span id="${(0, i.ifDefined)(t._id)}-inner"><slot></slot></span></h1>`,
          s = (t, e, s) =>
            i.html`<h2 class="ui5-title-root"><span id="${(0, i.ifDefined)(t._id)}-inner"><slot></slot></span></h2>`,
          o = (t, e, s) =>
            i.html`<h3 class="ui5-title-root"><span id="${(0, i.ifDefined)(t._id)}-inner"><slot></slot></span></h3>`,
          n = (t, e, s) =>
            i.html`<h4 class="ui5-title-root"><span id="${(0, i.ifDefined)(t._id)}-inner"><slot></slot></span></h4>`,
          l = (t, e, s) =>
            i.html`<h5 class="ui5-title-root"><span id="${(0, i.ifDefined)(t._id)}-inner"><slot></slot></span></h5>`,
          d = (t, e, s) =>
            i.html`<h6 class="ui5-title-root"><span id="${(0, i.ifDefined)(t._id)}-inner"><slot></slot></span></h6>`;
        var r = t;
        exports.default = r;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    QviM: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var o = {
          packageName: "@ui5/webcomponents-theming",
          fileName: "themes/sap_fiori_3/parameters-bundle.css",
          content:
            ':root{--sapBrandColor:#0a6ed1;--sapHighlightColor:#0854a0;--sapBaseColor:#fff;--sapShellColor:#354a5f;--sapBackgroundColor:#f7f7f7;--sapFontFamily:"72","72full",Arial,Helvetica,sans-serif;--sapFontLightFamily:"72-Light","72-Lightfull","72","72full",Arial,Helvetica,sans-serif;--sapFontBoldFamily:"72-Bold","72-Boldfull","72","72full",Arial,Helvetica,sans-serif;--sapFontBlackFamily:"72Black","72","72full",Arial,Helvetica,sans-serif;--sapFontHeaderFamily:"72","72full",Arial,Helvetica,sans-serif;--sapFontSize:.875rem;--sapFontSmallSize:.75rem;--sapFontLargeSize:1rem;--sapFontHeader1Size:2.25rem;--sapFontHeader2Size:1.5rem;--sapFontHeader3Size:1.25rem;--sapFontHeader4Size:1.125rem;--sapFontHeader5Size:1rem;--sapFontHeader6Size:.875rem;--sapTextColor:#32363a;--sapLinkColor:#0a6ed1;--sapLink_Hover_Color:#0854a0;--sapLink_Active_Color:#0a6ed1;--sapLink_Visited_Color:#0a6ed1;--sapLink_InvertedColor:#d3e8fd;--sapLink_SubtleColor:#074888;--sapCompanyLogo:none;--sapBackgroundImage:none;--sapBackgroundImageOpacity:1.0;--sapBackgroundImageRepeat:false;--sapSelectedColor:#0854a0;--sapActiveColor:#0854a0;--sapHighlightTextColor:#fff;--sapTitleColor:#32363a;--sapNegativeColor:#b00;--sapCriticalColor:#df6e0c;--sapPositiveColor:#107e3e;--sapInformativeColor:#0a6ed1;--sapNeutralColor:#6a6d70;--sapNegativeElementColor:#b00;--sapCriticalElementColor:#df6e0c;--sapPositiveElementColor:#107e3e;--sapInformativeElementColor:#0a6ed1;--sapNeutralElementColor:#6a6d70;--sapNegativeTextColor:#b00;--sapPositiveTextColor:#107e3e;--sapCriticalTextColor:#df6e0c;--sapInformativeTextColor:#0a6ed1;--sapNeutralTextColor:#6a6d70;--sapNeutralBorderColor:#6a6d70;--sapErrorColor:#b00;--sapErrorBorderColor:#b00;--sapWarningColor:#df6e0c;--sapWarningBorderColor:#df6e0c;--sapSuccessColor:#107e3e;--sapSuccessBorderColor:#107e3e;--sapInformationColor:#0a6ed1;--sapInformationBorderColor:#0a6ed1;--sapErrorBackground:#ffebeb;--sapWarningBackground:#fef7f1;--sapSuccessBackground:#f1fdf6;--sapInformationBackground:#f5faff;--sapNeutralBackground:#f4f4f4;--sapIndicationColor_1:#800;--sapIndicationColor_1_Hover_Background:#6f0000;--sapIndicationColor_1_Active_Background:#500;--sapIndicationColor_1_TextColor:#fff;--sapIndicationColor_2:#b00;--sapIndicationColor_2_Hover_Background:#a20000;--sapIndicationColor_2_Active_Background:#800;--sapIndicationColor_2_TextColor:#fff;--sapIndicationColor_3:#df6e0c;--sapIndicationColor_3_Hover_Background:#d0670b;--sapIndicationColor_3_Active_Background:#c2600a;--sapIndicationColor_3_TextColor:#fff;--sapIndicationColor_4:#107e3e;--sapIndicationColor_4_Hover_Background:#0d6733;--sapIndicationColor_4_Active_Background:#0a5128;--sapIndicationColor_4_TextColor:#fff;--sapIndicationColor_5:#0a6ed1;--sapIndicationColor_5_Hover_Background:#0961b9;--sapIndicationColor_5_Active_Background:#0854a0;--sapIndicationColor_5_TextColor:#fff;--sapIndicationColor_6:#0f828f;--sapIndicationColor_6_Hover_Background:#0d6d78;--sapIndicationColor_6_Active_Background:#0a5861;--sapIndicationColor_6_TextColor:#fff;--sapIndicationColor_7:#925ace;--sapIndicationColor_7_Hover_Background:#8546c8;--sapIndicationColor_7_Active_Background:#7838bd;--sapIndicationColor_7_TextColor:#fff;--sapIndicationColor_8:#c0399f;--sapIndicationColor_8_Hover_Background:#ac338f;--sapIndicationColor_8_Active_Background:#992d7e;--sapIndicationColor_8_TextColor:#fff;--sapElement_LineHeight:2.75rem;--sapElement_Height:2.25rem;--sapElement_BorderWidth:.0625rem;--sapElement_BorderCornerRadius:.25rem;--sapElement_Compact_LineHeight:2rem;--sapElement_Compact_Height:1.625rem;--sapElement_Condensed_LineHeight:1.5rem;--sapElement_Condensed_Height:1.375rem;--sapContent_LineHeight:1.4;--sapContent_IconHeight:1rem;--sapContent_IconColor:#0854a0;--sapContent_ContrastIconColor:#fff;--sapContent_NonInteractiveIconColor:#6a6d70;--sapContent_MarkerIconColor:#286eb4;--sapContent_MarkerTextColor:#0e7581;--sapContent_ImagePlaceholderBackground:#ccc;--sapContent_ImagePlaceholderForegroundColor:#fff;--sapContent_RatedColor:#d08014;--sapContent_UnratedColor:#89919a;--sapContent_FocusColor:#000;--sapContent_FocusStyle:dotted;--sapContent_FocusWidth:.0625rem;--sapContent_ContrastFocusColor:#fff;--sapContent_ShadowColor:#000;--sapContent_ContrastShadowColor:#fff;--sapContent_Shadow0:0 0 0 0.0625rem rgba(0,0,0,0.1),0 0.125rem 0.5rem 0 rgba(0,0,0,0.1);--sapContent_Shadow1:0 0 0 0.0625rem rgba(0,0,0,0.42),0 0.125rem 0.5rem 0 rgba(0,0,0,0.3);--sapContent_Shadow2:0 0 0 0.0625rem rgba(0,0,0,0.42),0 0.625rem 1.875rem 0 rgba(0,0,0,0.3);--sapContent_Shadow3:0 0 0 0.0625rem rgba(0,0,0,0.42),0 1.25rem 5rem 0 rgba(0,0,0,0.3);--sapContent_TextShadow:0 0 0.125rem #fff;--sapContent_ContrastTextShadow:0 0 0.0625rem rgba(0,0,0,0.7);--sapContent_HeaderShadow:0 0 0.25rem 0 rgba(0,0,0,0.15),inset 0 -0.0625rem 0 0 #d9d9d9;--sapContent_Interaction_Shadow:none;--sapContent_Selected_Shadow:none;--sapContent_Negative_Shadow:none;--sapContent_Critical_Shadow:none;--sapContent_Positive_Shadow:none;--sapContent_Informative_Shadow:none;--sapContent_Neutral_Shadow:none;--sapContent_SearchHighlightColor:#d4f7db;--sapContent_HelpColor:#3f8600;--sapContent_LabelColor:#6a6d70;--sapContent_MonospaceFontFamily:"72Mono","72Monofull",lucida console,monospace;--sapContent_MonospaceBoldFontFamily:"72Mono-Bold","72Mono-Boldfull",lucida console,monospace;--sapContent_IconFontFamily:"SAP-icons";--sapContent_DisabledTextColor:rgba(50,54,58,0.6);--sapContent_DisabledOpacity:0.4;--sapContent_ContrastTextThreshold:0.65;--sapContent_ContrastTextColor:#fff;--sapContent_ForegroundColor:#efefef;--sapContent_ForegroundBorderColor:#89919a;--sapContent_ForegroundTextColor:#32363a;--sapContent_BadgeBackground:#d04343;--sapContent_BadgeTextColor:#fff;--sapContent_Placeholderloading_Background:#ccc;--sapContent_Placeholderloading_Gradient:linear-gradient(90deg,#ccc 0%,#ccc 20%,#999 50%,#ccc 80%,#ccc);--sapContent_DragAndDropActiveColor:#0854a0;--sapContent_Selected_Background:#0854a0;--sapContent_Selected_TextColor:#fff;--sapContent_Selected_Hover_Background:#095caf;--sapContent_Selected_ForegroundColor:#0854a0;--sapContent_Illustrative_Color1:#0a6ed1;--sapContent_Illustrative_Color2:#72b5f8;--sapContent_Illustrative_Color3:#ffba10;--sapContent_Illustrative_Color4:#4a5055;--sapContent_Illustrative_Color5:#9da4aa;--sapContent_Illustrative_Color6:#c6cace;--sapContent_Illustrative_Color7:#e7e9ea;--sapContent_Illustrative_Color8:#fff;--sapContent_Illustrative_Color9:#64edd2;--sapContent_Illustrative_Color10:#e7e9ea;--sapContent_Illustrative_Color11:#f31ded;--sapContent_Illustrative_Color12:#5dc122;--sapContent_Illustrative_Color13:#4ba1f6;--sapContent_Illustrative_Color14:#298ff4;--sapContent_Illustrative_Color15:#e6a400;--sapContent_Illustrative_Color16:#085aaa;--sapContent_Illustrative_Color17:#00a5a8;--sapContent_Illustrative_Color18:#d9ddde;--sapContent_Illustrative_Color19:#ccd0d2;--sapContent_Illustrative_Color20:#bec4c6;--sapShell_Background:#edeff0;--sapShell_BackgroundImage:linear-gradient(180deg,#dfe3e4,#f3f4f5);--sapShell_BackgroundGradient:linear-gradient(180deg,#dfe3e4,#f3f4f5);--sapShell_BackgroundImageOpacity:1.0;--sapShell_BackgroundImageRepeat:false;--sapShell_BorderColor:#354a5f;--sapShell_TextColor:#fff;--sapShell_InteractiveBackground:#354a5f;--sapShell_InteractiveTextColor:#d1e8ff;--sapShell_InteractiveBorderColor:#7996b4;--sapShell_GroupTitleTextColor:#32363a;--sapShell_GroupTitleTextShadow:0 0 0.125rem #fff;--sapShell_Hover_Background:#283848;--sapShell_Active_Background:#23303e;--sapShell_Active_TextColor:#fff;--sapShell_Selected_Background:#23303e;--sapShell_Selected_TextColor:#fff;--sapShell_Selected_Hover_Background:#23303e;--sapShell_Favicon:none;--sapShell_Navigation_Background:#354a5f;--sapShell_Navigation_SelectedColor:#d1e8ff;--sapShell_Navigation_Selected_TextColor:#d1e8ff;--sapShell_Navigation_TextColor:#fff;--sapShell_Navigation_Hover_Background:#283848;--sapShell_Navigation_Active_Background:#23303e;--sapShell_Navigation_Active_TextColor:#fff;--sapShell_Shadow:0 0 0.25rem 0 rgba(0,0,0,0.4),inset 0 -0.0625rem 0 0 rgba(0,0,0,0.2);--sapShell_NegativeColor:#f88;--sapShell_CriticalColor:#f8b67d;--sapShell_PositiveColor:#abe2c2;--sapShell_InformativeColor:#b1d6fb;--sapShell_NeutralColor:#d4d6d7;--sapButton_BorderWidth:.0625rem;--sapButton_BorderCornerRadius:.25rem;--sapButton_Background:#fff;--sapButton_BorderColor:#0854a0;--sapButton_TextColor:#0854a0;--sapButton_Hover_Background:#ebf5fe;--sapButton_Hover_BorderColor:#0854a0;--sapButton_Hover_TextColor:#0854a0;--sapButton_IconColor:#0854a0;--sapButton_Active_Background:#0854a0;--sapButton_Active_BorderColor:#0854a0;--sapButton_Active_TextColor:#fff;--sapButton_Emphasized_Background:#0a6ed1;--sapButton_Emphasized_BorderColor:#0a6ed1;--sapButton_Emphasized_TextColor:#fff;--sapButton_Emphasized_Hover_Background:#085caf;--sapButton_Emphasized_Hover_BorderColor:#085caf;--sapButton_Emphasized_Hover_TextColor:#fff;--sapButton_Emphasized_Active_Background:#0854a0;--sapButton_Emphasized_Active_BorderColor:#0854a0;--sapButton_Emphasized_Active_TextColor:#fff;--sapButton_Emphasized_TextShadow:transparent;--sapButton_Reject_Background:#fff;--sapButton_Reject_BorderColor:#b00;--sapButton_Reject_Hover_Background:#ffebeb;--sapButton_Reject_Hover_BorderColor:#b00;--sapButton_Reject_Hover_TextColor:#b00;--sapButton_Reject_Active_Background:#a20000;--sapButton_Reject_Active_BorderColor:#a20000;--sapButton_Reject_Active_TextColor:#fff;--sapButton_Reject_TextColor:#b00;--sapButton_Reject_Selected_Background:#a20000;--sapButton_Reject_Selected_BorderColor:#a20000;--sapButton_Reject_Selected_TextColor:#fff;--sapButton_Reject_Selected_Hover_Background:#b00;--sapButton_Reject_Selected_Hover_BorderColor:#b00;--sapButton_Accept_Background:#fff;--sapButton_Accept_BorderColor:#107e3e;--sapButton_Accept_Hover_Background:#f1fdf6;--sapButton_Accept_Hover_BorderColor:#107e3e;--sapButton_Accept_Hover_TextColor:#107e3e;--sapButton_Accept_Active_Background:#0d6733;--sapButton_Accept_Active_BorderColor:#0d6733;--sapButton_Accept_Active_TextColor:#fff;--sapButton_Accept_TextColor:#107e3e;--sapButton_Accept_Selected_Background:#0d6733;--sapButton_Accept_Selected_BorderColor:#0d6733;--sapButton_Accept_Selected_TextColor:#fff;--sapButton_Accept_Selected_Hover_Background:#107e3e;--sapButton_Accept_Selected_Hover_BorderColor:#107e3e;--sapButton_Lite_Background:transparent;--sapButton_Lite_BorderColor:transparent;--sapButton_Lite_TextColor:#0854a0;--sapButton_Lite_Hover_Background:#ebf5fe;--sapButton_Lite_Hover_BorderColor:#0854a0;--sapButton_Lite_Hover_TextColor:#0854a0;--sapButton_Lite_Active_Background:#0854a0;--sapButton_Lite_Active_BorderColor:#0854a0;--sapButton_Selected_Background:#0854a0;--sapButton_Selected_BorderColor:#0854a0;--sapButton_Selected_TextColor:#fff;--sapButton_Selected_Hover_Background:#095caf;--sapButton_Selected_Hover_BorderColor:#095caf;--sapButton_Attention_Background:#fff;--sapButton_Attention_BorderColor:#df6e0c;--sapButton_Attention_TextColor:#32363a;--sapButton_Attention_Hover_Background:#fef7f1;--sapButton_Attention_Hover_BorderColor:#df6e0c;--sapButton_Attention_Hover_TextColor:#32363a;--sapButton_Attention_Active_Background:#f3801c;--sapButton_Attention_Active_BorderColor:#f3801c;--sapButton_Attention_Active_TextColor:#fff;--sapButton_Attention_Selected_Background:#f3801c;--sapButton_Attention_Selected_BorderColor:#f3801c;--sapButton_Attention_Selected_TextColor:#fff;--sapButton_Attention_Selected_Hover_Background:#f48e34;--sapButton_Attention_Selected_Hover_BorderColor:#f48e34;--sapButton_Negative_Background:#b00;--sapButton_Negative_BorderColor:#b00;--sapButton_Negative_TextColor:#fff;--sapButton_Negative_Hover_Background:#970000;--sapButton_Negative_Hover_BorderColor:#970000;--sapButton_Negative_Hover_TextColor:#fff;--sapButton_Negative_Active_Background:#800;--sapButton_Negative_Active_BorderColor:#800;--sapButton_Negative_Active_TextColor:#fff;--sapButton_Critical_Background:#df6e0c;--sapButton_Critical_BorderColor:#df6e0c;--sapButton_Critical_TextColor:#fff;--sapButton_Critical_Hover_Background:#f3801c;--sapButton_Critical_Hover_BorderColor:#f3801c;--sapButton_Critical_Hover_TextColor:#fff;--sapButton_Critical_Active_Background:#f5933e;--sapButton_Critical_Active_BorderColor:#f5933e;--sapButton_Critical_Active_TextColor:#fff;--sapButton_Success_Background:#107e3e;--sapButton_Success_BorderColor:#107e3e;--sapButton_Success_TextColor:#fff;--sapButton_Success_Hover_Background:#0c5e2e;--sapButton_Success_Hover_BorderColor:#0c5e2e;--sapButton_Success_Hover_TextColor:#fff;--sapButton_Success_Active_Background:#0a5128;--sapButton_Success_Active_BorderColor:#0a5128;--sapButton_Success_Active_TextColor:#fff;--sapButton_Information_Background:#0a6ed1;--sapButton_Information_BorderColor:#0a6ed1;--sapButton_Information_TextColor:#fff;--sapButton_Information_Hover_Background:#0961b9;--sapButton_Information_Hover_BorderColor:#0961b9;--sapButton_Information_Hover_TextColor:#fff;--sapButton_Information_Active_Background:#0854a0;--sapButton_Information_Active_BorderColor:#0854a0;--sapButton_Neutral_Background:#6a6d70;--sapButton_Neutral_BorderColor:#6a6d70;--sapButton_Neutral_TextColor:#fff;--sapButton_Neutral_Hover_Background:#595b5e;--sapButton_Neutral_Hover_BorderColor:#595b5e;--sapButton_Neutral_Hover_TextColor:#fff;--sapButton_Neutral_Active_Background:#515456;--sapButton_Neutral_Active_BorderColor:#515456;--sapButton_Neutral_Active_TextColor:#fff;--sapButton_Track_Selected_Background:#ebf5fe;--sapButton_Track_Selected_TextColor:#32363a;--sapButton_Track_Background:#ededed;--sapButton_Track_TextColor:#32363a;--sapButton_TokenBackground:#fafafa;--sapButton_TokenBorderColor:#c2c2c2;--sapField_Background:#fff;--sapField_TextColor:#32363a;--sapField_PlaceholderTextColor:#74777a;--sapField_BorderColor:#89919a;--sapField_HelpBackground:#fff;--sapField_BorderWidth:.0625rem;--sapField_BorderCornerRadius:.125rem;--sapField_Hover_Background:#fff;--sapField_Hover_BorderColor:#0854a0;--sapField_Hover_HelpBackground:#ebf5fe;--sapField_Active_BorderColor:#0854a0;--sapField_Focus_Background:#fff;--sapField_Focus_BorderColor:#89919a;--sapField_Focus_HelpBackground:#fff;--sapField_ReadOnly_Background:hsla(0,0%,94.9%,0.5);--sapField_ReadOnly_BorderColor:#89919a;--sapField_ReadOnly_HelpBackground:hsla(0,0%,94.9%,0.5);--sapField_RequiredColor:#ce3b3b;--sapField_InvalidColor:#b00;--sapField_InvalidBackground:#fff;--sapField_InvalidBorderWidth:.125rem;--sapField_InvalidBorderStyle:solid;--sapField_WarningColor:#df6e0c;--sapField_WarningBackground:#fff;--sapField_WarningBorderWidth:.125rem;--sapField_WarningBorderStyle:solid;--sapField_SuccessColor:#107e3e;--sapField_SuccessBackground:#fff;--sapField_SuccessBorderWidth:.0625rem;--sapField_SuccessBorderStyle:solid;--sapField_InformationColor:#0a6ed1;--sapField_InformationBackground:#fff;--sapField_InformationBorderWidth:.125rem;--sapField_InformationBorderStyle:solid;--sapGroup_TitleBackground:transparent;--sapGroup_TitleBorderColor:#d9d9d9;--sapGroup_TitleTextColor:#32363a;--sapGroup_ContentBackground:#fff;--sapGroup_ContentBorderColor:#d9d9d9;--sapGroup_BorderWidth:.0625rem;--sapGroup_BorderCornerRadius:0;--sapGroup_FooterBackground:transparent;--sapToolbar_Background:transparent;--sapToolbar_SeparatorColor:#d9d9d9;--sapList_HeaderBackground:#f2f2f2;--sapList_HeaderBorderColor:#e5e5e5;--sapList_HeaderTextColor:#32363a;--sapList_BorderColor:#e5e5e5;--sapList_TextColor:#32363a;--sapList_Active_TextColor:#fff;--sapList_BorderWidth:.0625rem;--sapList_SelectionBackgroundColor:#e5f0fa;--sapList_SelectionBorderColor:#0854a0;--sapList_Hover_SelectionBackground:#d8e9f8;--sapList_Background:#fff;--sapList_Hover_Background:#f5f5f5;--sapList_AlternatingBackground:#f2f2f2;--sapList_GroupHeaderBackground:#fff;--sapList_GroupHeaderBorderColor:#d9d9d9;--sapList_GroupHeaderTextColor:#32363a;--sapList_FooterBackground:#fafafa;--sapList_FooterTextColor:#32363a;--sapList_TableGroupHeaderBackground:#efefef;--sapList_TableGroupHeaderBorderColor:#d9d9d9;--sapList_TableGroupHeaderTextColor:#32363a;--sapList_TableFooterBorder:#d9d9d9;--sapList_TableFixedBorderColor:#8c8c8c;--sapList_Active_Background:#0854a0;--sapScrollBar_FaceColor:#949494;--sapScrollBar_TrackColor:#fff;--sapScrollBar_BorderColor:#949494;--sapScrollBar_SymbolColor:#0854a0;--sapScrollBar_Dimension:.75rem;--sapScrollBar_Hover_FaceColor:#8c8c8c;--sapPageHeader_Background:#fff;--sapPageHeader_BorderColor:#d9d9d9;--sapPageHeader_TextColor:#32363a;--sapPageFooter_Background:#fff;--sapPageFooter_BorderColor:#d9d9d9;--sapPageFooter_TextColor:#32363a;--sapInfobar_Background:#0f828f;--sapInfobar_Hover_Background:#0e7581;--sapInfobar_Active_Background:#0a545c;--sapInfobar_NonInteractive_Background:#e6e6e6;--sapInfobar_TextColor:#fff;--sapObjectHeader_Background:#fff;--sapObjectHeader_BorderColor:#d9d9d9;--sapObjectHeader_Hover_Background:#f5f5f5;--sapBlockLayer_Background:#000;--sapTile_Background:#fff;--sapTile_Hover_Background:#f5f5f5;--sapTile_Active_Background:#f5f5f5;--sapTile_BorderColor:transparent;--sapTile_TitleTextColor:#32363a;--sapTile_TextColor:#6a6d70;--sapTile_IconColor:#5a7da0;--sapTile_SeparatorColor:#ccc;--sapTile_Interactive_BorderColor:#b3b3b3;--sapTile_OverlayBackground:rgba(0,0,0,0.8);--sapTile_OverlayForegroundColor:#fff;--sapAccentColor1:#d08014;--sapAccentColor2:#d04343;--sapAccentColor3:#db1f77;--sapAccentColor4:#c0399f;--sapAccentColor5:#6367de;--sapAccentColor6:#286eb4;--sapAccentColor7:#0f828f;--sapAccentColor8:#7ca10c;--sapAccentColor9:#925ace;--sapAccentColor10:#647987;--sapAccentBackgroundColor1:#fff3b8;--sapAccentBackgroundColor2:#ffd0e7;--sapAccentBackgroundColor3:#fff0fa;--sapAccentBackgroundColor4:#ffdcf3;--sapAccentBackgroundColor5:#ded3ff;--sapAccentBackgroundColor6:#d1efff;--sapAccentBackgroundColor7:#c2fcee;--sapAccentBackgroundColor8:#ebf5cb;--sapAccentBackgroundColor9:#dafdf5;--sapAccentBackgroundColor10:#eaecee;--sapLegend_WorkingBackground:#fafafa;--sapLegend_NonWorkingBackground:#dedede;--sapLegend_CurrentDateTime:#c0399f;--sapLegendColor1:#d58215;--sapLegendColor2:#dc5b5b;--sapLegendColor3:#db1f77;--sapLegendColor4:#9b3b3b;--sapLegendColor5:#cf5db3;--sapLegendColor6:#286eb4;--sapLegendColor7:#1193a2;--sapLegendColor8:#8b9668;--sapLegendColor9:#647987;--sapLegendColor10:#892971;--sapLegendColor11:#725a3a;--sapLegendColor12:#bb2f2f;--sapLegendColor13:#bc1b66;--sapLegendColor14:#8b714f;--sapLegendColor15:#606190;--sapLegendColor16:#597da1;--sapLegendColor17:#49797e;--sapLegendColor18:#687a33;--sapLegendColor19:#295989;--sapLegendColor20:#5154bd;--sapLegendBackgroundColor1:#fdf3e7;--sapLegendBackgroundColor2:#faeaea;--sapLegendBackgroundColor3:#fce9f2;--sapLegendBackgroundColor4:#f8ecec;--sapLegendBackgroundColor5:#f9ebf5;--sapLegendBackgroundColor6:#ebf3fa;--sapLegendBackgroundColor7:#e8fbfd;--sapLegendBackgroundColor8:#f3f4ef;--sapLegendBackgroundColor9:#f1f3f4;--sapLegendBackgroundColor10:#f9ebf6;--sapLegendBackgroundColor11:#f6f2ed;--sapLegendBackgroundColor12:#faeaea;--sapLegendBackgroundColor13:#fce9f2;--sapLegendBackgroundColor14:#f5f2ee;--sapLegendBackgroundColor15:#f0f0f5;--sapLegendBackgroundColor16:#eff2f6;--sapLegendBackgroundColor17:#eff5f6;--sapLegendBackgroundColor18:#f5f7ed;--sapLegendBackgroundColor19:#ebf2f9;--sapLegendBackgroundColor20:#ecedf8;--sapChart_OrderedColor_1:#5899da;--sapChart_OrderedColor_2:#e8743b;--sapChart_OrderedColor_3:#19a979;--sapChart_OrderedColor_4:#ed4a7b;--sapChart_OrderedColor_5:#945ecf;--sapChart_OrderedColor_6:#13a4b4;--sapChart_OrderedColor_7:#525df4;--sapChart_OrderedColor_8:#bf399e;--sapChart_OrderedColor_9:#6c8893;--sapChart_OrderedColor_10:#ee6868;--sapChart_OrderedColor_11:#2f6497;--sapChart_Bad:#dc0d0e;--sapChart_Critical:#de890d;--sapChart_Good:#3fa45b;--sapChart_Neutral:#848f94;--sapChart_Sequence_1:#5899da;--sapChart_Sequence_2:#e8743b;--sapChart_Sequence_3:#19a979;--sapChart_Sequence_4:#ed4a7b;--sapChart_Sequence_5:#945ecf;--sapChart_Sequence_6:#13a4b4;--sapChart_Sequence_7:#525df4;--sapChart_Sequence_8:#bf399e;--sapChart_Sequence_9:#6c8893;--sapChart_Sequence_10:#ee6868;--sapChart_Sequence_11:#2f6497;--sapChart_Sequence_Neutral:#848f94;}',
        };
        exports.default = o;
      },
      {},
    ],
    TttV: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var _ = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/sap_fiori_3/parameters-bundle.css",
          content:
            ':root{--_ui5_calendar_height:24.5rem;--_ui5_calendar_width:20.5rem;--_ui5_calendar_padding:0.75rem;--_ui5_calendar_header_height:3rem;--_ui5_calendar_header_arrow_button_width:2.5rem;--_ui5_calendar_header_padding:0.25rem 0;--_ui5_checkbox_root_side_padding:.6875rem;--_ui5_checkbox_icon_size:1rem;--_ui5_checkbox_partially_icon_size:.75rem;--_ui5_custom_list_item_height:3rem;--_ui5_custom_list_item_rb_min_width:2.75rem;--_ui5_day_picker_item_width:2.25rem;--_ui5_day_picker_item_height:2.875rem;--_ui5_day_picker_empty_height:3rem;--_ui5_day_picker_item_justify_content:space-between;--_ui5_color-palette-item-height:1.75rem;--_ui5_color-palette-item-hover-height:2.375rem;--_ui5_color-palette-item-margin:calc(var(--_ui5_color-palette-item-hover-height)/2 - var(--_ui5_color-palette-item-height)/2);--_ui5_color-palette-row-width:12rem;--_ui5_datetime_picker_width:40.0625rem;--_ui5_datetime_picker_height:25rem;--_ui5_datetime_timeview_phonemode_width:19.5rem;--_ui5_datetime_timeview_padding:1rem;--_ui5_dialog_content_min_height:2.75rem;--_ui5_input_inner_padding:0 0.625rem;--_ui5_input_inner_padding_with_icon:0 0.25rem 0 0.625rem;--_ui5_input_value_state_icon_padding:var(--_ui5-input-icon-padding);--_ui5_list_no_data_height:3rem;--_ui5_list_item_cb_margin_right:0;--_ui5_list_item_title_size:var(--sapFontLargeSize);--_ui5_list_item_img_size:3rem;--_ui5_list_item_img_margin:0.5rem 0.75rem 0.5rem 0rem;--_ui5_list_item_base_height:2.75rem;--_ui5_list_item_icon_size:1.125rem;--_ui5_group_header_list_item_height:2.75rem;--_ui5_list_busy_row_height:3rem;--_ui5_month_picker_item_height:3rem;--_ui5_popup_default_header_height:2.75rem;--_ui5_year_picker_item_height:3rem;--_ui5_tokenizer_root_padding:0.1875rem;--_ui5_token_height:1.625rem;--_ui5_token_icon_padding:0.25rem 0.5rem;--_ui5_token_wrapper_right_padding:0.3125rem;--_ui5_tl_bubble_padding:1rem;--_ui5_tl_indicator_before_bottom:-1.625rem;--_ui5_tl_padding:1rem 1rem 1rem .5rem;--_ui5_tl_li_margin_bottom:1.625rem;--_ui5_switch_focus_width_size_horizon_exp:calc(100% + 4px);--_ui5_switch_focus_height_size_horizon_exp:calc(100% + 4px);--_ui5_switch_text_on_left:calc(-100% + 1.9125rem);--_ui5_switch_slide_transform:translateX(100%) translateX(-1.875rem);--_ui5_switch_rtl_transform:translateX(1.875rem) translateX(-100%);--_ui5_switch_text_right:calc(-100% + 1.9125rem);--_ui5_tc_item_text:3rem;--_ui5_tc_item_height:4.75rem;--_ui5_tc_item_text_only_height:2.75rem;--_ui5_tc_item_text_only_with_additional_text_height:3.75rem;--_ui5_tc_item_text_line_height:normal;--_ui5_tc_item_icon_circle_size:2.75rem;--_ui5_tc_item_icon_size:1.25rem;--_ui5_tc_item_add_text_margin_top:0.375rem;--_ui5_textarea_padding:0.5625rem 0.6875rem;--_ui5_radio_button_height:2.75rem;--_ui5_radio_button_label_side_padding:.875rem;--_ui5_radio_button_focus_dist:.5rem;--_ui5_radio_button_inner_size:2.75rem;--_ui5_radio_button_svg_size:1.375rem;--_ui5_radio_button_label_width:calc(100% - 2.75rem);--_ui5_radio_button_rtl_focus_right:0.5rem;--_ui5-responsive_popover_header_height:2.75rem;--ui5_side_navigation_item_height:2.75rem;--_ui5_load_more_text_height:2.75rem;--_ui5_load_more_text_font_size:var(--sapFontMediumSize);--_ui5_load_more_desc_padding:0.375rem 2rem 0.875rem 2rem;--_ui5-tree-indent-step:1.5rem;--_ui5-tree-toggle-box-width:2.75rem;--_ui5-tree-toggle-box-height:2.25rem;--_ui5-tree-toggle-icon-size:1.0625rem;--_ui5_timeline_tli_indicator_before_bottom:-1.625rem;--_ui5_timeline_tli_indicator_before_right:-1.625rem;--_ui5_timeline_tli_indicator_before_without_icon_bottom:-1.875rem;--_ui5_timeline_tli_indicator_before_without_icon_right:-1.9375rem;--_ui5_segmented_btn_border_radius:0.375rem}.sapUiSizeCompact,.ui5-content-density-compact,:root,[data-ui5-compact-size]{--_ui5_datetime_timeview_width:17rem;--_ui5_list_item_selection_btn_margin_top:calc(var(--_ui5_checkbox_wrapper_padding)*-1);--_ui5_token_icon_size:.75rem;--_ui5_token_wrapper_left_padding:0}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_button_base_height:1.625rem;--_ui5_button_base_padding:0.4375rem;--_ui5_button_base_min_width:2rem;--_ui5_button_icon_font_size:1rem;--_ui5_calendar_height:18rem;--_ui5_calendar_width:17.75rem;--_ui5_calendar_padding:0.5rem;--_ui5_calendar_header_height:2rem;--_ui5_calendar_header_arrow_button_width:2rem;--_ui5_calendar_header_padding:0;--_ui5_checkbox_root_side_padding:var(--_ui5_checkbox_wrapped_focus_padding);--_ui5_checkbox_wrapped_content_margin_top:var(--_ui5_checkbox_compact_wrapped_label_margin_top);--_ui5_checkbox_wrapped_focus_left_top_bottom_position:var(--_ui5_checkbox_compact_focus_position);--_ui5_checkbox_width_height:var(--_ui5_checkbox_compact_width_height);--_ui5_checkbox_wrapper_padding:var(--_ui5_checkbox_compact_wrapper_padding);--_ui5_checkbox_focus_position:var(--_ui5_checkbox_compact_focus_position);--_ui5_checkbox_inner_width_height:var(--_ui5_checkbox_compact_inner_size);--_ui5_checkbox_icon_size:.75rem;--_ui5_checkbox_partially_icon_size:.5rem;--_ui5_color-palette-item-height:1.25rem;--_ui5_color-palette-item-focus-height:1rem;--_ui5_color-palette-item-container-sides-padding:0.1875rem;--_ui5_color-palette-item-container-rows-padding:0.8125rem;--_ui5_color-palette-item-hover-height:1.625rem;--_ui5_color-palette-item-margin:calc(var(--_ui5_color-palette-item-hover-height)/2 - var(--_ui5_color-palette-item-height)/2);--_ui5_color-palette-row-width:8.125rem;--_ui5_color-palette-item-hover-margin:0;--_ui5_color-palette-row-height:7.5rem;--_ui5_color-palette-button-height:2rem;--_ui5_custom_list_item_height:2rem;--_ui5_custom_list_item_rb_min_width:2rem;--_ui5_daypicker_weeknumbers_container_padding_top:2rem;--_ui5_day_picker_item_width:2rem;--_ui5_day_picker_item_height:2rem;--_ui5_day_picker_empty_height:2.125rem;--_ui5_day_picker_item_justify_content:flex-end;--_ui5_datetime_picker_height:17rem;--_ui5_datetime_picker_width:34.0625rem;--_ui5_datetime_timeview_phonemode_width:18.5rem;--_ui5_datetime_timeview_padding:0.5rem;--_ui5_dialog_content_min_height:2.5rem;--_ui5_input_height:var(--_ui5_input_compact_height);--_ui5_input_inner_padding:0 0.5rem;--_ui5_input_icon_min_width:var(--_ui5_input_compact_min_width);--_ui5_input_icon_padding:.25rem .5rem;--_ui5_input_value_state_icon_padding:.1875rem .5rem;--_ui5_popup_default_header_height:2.5rem;--_ui5_textarea_padding:.1875rem .5rem;--_ui5_list_no_data_height:2rem;--_ui5_list_item_cb_margin_right:.5rem;--_ui5_list_item_title_size:var(--sapFontSize);--_ui5_list_item_img_margin:0.55rem 0.75rem 0.5rem 0rem;--_ui5_list_item_base_height:2rem;--_ui5_list_item_icon_size:1rem;--_ui5_list_busy_row_height:2rem;--_ui5_month_picker_item_height:2rem;--_ui5_panel_header_height:2rem;--_ui5_year_picker_item_height:2rem;--_ui5_tokenizer_root_padding:0.125rem;--_ui5_token_height:1.125rem;--_ui5_token_icon_padding:0.1rem 0.25rem;--_ui5_token_wrapper_right_padding:0.25rem;--_ui5_tl_bubble_padding:.5rem;--_ui5_tl_indicator_before_bottom:-.5rem;--_ui5_tl_padding:.5rem;--_ui5_tl_li_margin_bottom:.5rem;--_ui5_wheelslider_item_width:64px;--_ui5_wheelslider_item_height:32px;--_ui5_wheelslider_height:224px;--_ui5_wheelslider_selection_frame_margin_top:calc(var(--_ui5_wheelslider_item_height)*2);--_ui5_wheelslider_arrows_visibility:visible;--_ui5_wheelslider_mobile_selection_frame_margin_top:128px;--_ui5_switch_height:var(--_ui5_switch_compact_height);--_ui5_switch_width:var(--_ui5_switch_compact_width);--_ui5_switch_handle_height:var(--_ui5_switch_handle_compact_height);--_ui5_switch_handle_width:var(--_ui5_switch_handle_compact_width);--_ui5_switch_text_on_left:calc(-100% + 1.5625rem);--_ui5_switch_slide_transform:translateX(100%) translateX(-1.5rem);--_ui5_switch_no_label_width:var(--_ui5_switch_compact_no_label_width);--_ui5_switch_no_label_width_horizon:var(--_ui5_switch_compact_no_label_width_horizon);--_ui5_switch_rtl_transform:translateX(-100%) translateX(1.5rem);--_ui5_switch_text_right:calc(-100% + 1.5625rem);--_ui5_switch_root_outline_top_bottom:var(--_ui5_switch_compact_root_outline_top_bottom);--_ui5_switch_root_outline_left_right:var(--_ui5_switch_compact_root_outline_left_right);--_ui5_switch_root_outline_top_bottom_horizon:var(--_ui5_switch_compact_root_outline_top_bottom_horizon);--_ui5_switch_root_outline_left_right_horizon:var(--_ui5_switch_compact_root_outline_left_right_horizon);--_ui5_switch_root_outline_top_bottom_hcb:var(--_ui5_switch_compact_root_outline_top_bottom_hcb);--_ui5_switch_root_outline_left_right_hcb:var(--_ui5_switch_compact_root_outline_left_right_hcb);--_ui5_tc_item_text:2rem;--_ui5_tc_item_text_line_height:1.325rem;--_ui5_tc_item_add_text_margin_top:0.3125rem;--_ui5_tc_header_height:var(--_ui5_tc_header_height_compact);--_ui5_tc_item_height:4rem;--_ui5_tc_item_icon_circle_size:2rem;--_ui5_tc_item_icon_size:1rem;--_ui5_radio_button_min_width:var(--_ui5_radio_button_min_width_compact);--_ui5_radio_button_height:2rem;--_ui5_radio_button_label_side_padding:.5rem;--_ui5_radio_button_focus_dist:.375rem;--_ui5_radio_button_inner_size:2rem;--_ui5_radio_button_svg_size:1rem;--_ui5_radio_button_label_width:calc(100% - 2rem + 1px);--_ui5_radio_button_rtl_focus_right:0.375rem;--_ui5-responsive_popover_header_height:2.5rem;--ui5_side_navigation_item_height:2rem;--_ui5_slider_handle_height:1.25rem;--_ui5_slider_handle_width:1.25rem;--_ui5_slider_handle_top:-0.6425rem;--_ui5_slider_handle_margin_left:-0.7825rem;--_ui5_slider_tooltip_height:1rem;--_ui5_slider_tooltip_padding:0.25rem;--_ui5_slider_tooltip_bottom:1.825rem;--_ui5_slider_progress_outline_offset:-0.625rem;--_ui5_slider_outer_height:1.3125rem;--_ui5_load_more_text_height:2.625rem;--_ui5_load_more_text_font_size:var(--sapFontSize);--_ui5_load_more_desc_padding:0 2rem 0.875rem 2rem;--_ui5-tree-indent-step:0.5rem;--_ui5-tree-toggle-box-width:2rem;--_ui5-tree-toggle-box-height:1.5rem;--_ui5-tree-toggle-icon-size:0.8125rem;--_ui5_timeline_tli_indicator_before_bottom:-0.5rem;--_ui5_timeline_tli_indicator_before_right:-0.5rem;--_ui5_timeline_tli_indicator_before_without_icon_bottom:-0.75rem;--_ui5_timeline_tli_indicator_before_without_icon_right:-0.8125rem}:root{--ui5-avatar-initials-color:var(--sapContent_ImagePlaceholderForegroundColor);--ui5-avatar-initials-border:none;--ui5-avatar-accent1:var(--sapAccentColor1);--ui5-avatar-accent2:var(--sapAccentColor2);--ui5-avatar-accent3:var(--sapAccentColor3);--ui5-avatar-accent4:var(--sapAccentColor4);--ui5-avatar-accent5:var(--sapAccentColor5);--ui5-avatar-accent6:var(--sapAccentColor6);--ui5-avatar-accent7:var(--sapAccentColor7);--ui5-avatar-accent8:var(--sapAccentColor8);--ui5-avatar-accent9:var(--sapAccentColor9);--ui5-avatar-accent10:var(--sapAccentColor10);--ui5-avatar-placeholder:var(--sapContent_ImagePlaceholderBackground);--ui5-avatar-accent1-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent2-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent3-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent4-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent5-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent6-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent7-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent8-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent9-color:var(--ui5-avatar-initials-color);--ui5-avatar-accent10-color:var(--ui5-avatar-initials-color);--ui5-avatar-placeholder-color:var(--ui5-avatar-initials-color);--_ui5_avatar_outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5_avatar_focus_offset:1px;--_ui5_avatar_focus_width:1px;--_ui5_avatar_focus_color:var(--sapContent_FocusColor);--_ui5_avatar_fontsize_XS:0.75rem;--_ui5_avatar_fontsize_M:1.625rem;--_ui5_avatar_fontsize_L:2rem;--_ui5_avatar_fontsize_XL:2.75rem;--_ui5_avatar_fontsize_XS:1rem;--_ui5_avatar_fontsize_S:1.125rem;--_ui5_avatar_fontsize_M:1.5rem;--_ui5_avatar_fontsize_L:2.25rem;--_ui5_avatar_fontsize_XL:3rem;--ui5-badge-font-size:0.75em;--_ui5-badge-height:1rem;--_ui5-badge-border:0.0625em solid;--_ui5-badge-left-border:1px solid;--_ui5-badge-border-radius:0.5em;--_ui5-badge-font-weight:bold;--_ui5-badge-text-transform:uppercase;--_ui5-badge-cursor:default;--_ui5_badge_pointer_events:none;--ui5-badge-color-scheme-1-background:var(--sapLegendBackgroundColor1);--ui5-badge-color-scheme-1-hover-background:var(--ui5-badge-color-scheme-1-background);--ui5-badge-color-scheme-1-border:var(--sapAccentColor1);--ui5-badge-color-scheme-1-color:var(--sapAccentColor1);--ui5-badge-color-scheme-2-background:var(--sapLegendBackgroundColor2);--ui5-badge-color-scheme-2-hover-background:var(--ui5-badge-color-scheme-2-background);--ui5-badge-color-scheme-2-border:var(--sapAccentColor2);--ui5-badge-color-scheme-2-color:var(--sapAccentColor2);--ui5-badge-color-scheme-3-background:var(--sapLegendBackgroundColor3);--ui5-badge-color-scheme-3-hover-background:var(--ui5-badge-color-scheme-3-background);--ui5-badge-color-scheme-3-border:var(--sapAccentColor3);--ui5-badge-color-scheme-3-color:var(--sapAccentColor3);--ui5-badge-color-scheme-4-background:var(--sapLegendBackgroundColor5);--ui5-badge-color-scheme-4-hover-background:var(--ui5-badge-color-scheme-4-background);--ui5-badge-color-scheme-4-border:var(--sapAccentColor4);--ui5-badge-color-scheme-4-color:var(--sapAccentColor4);--ui5-badge-color-scheme-5-background:var(--sapLegendBackgroundColor20);--ui5-badge-color-scheme-5-hover-background:var(--ui5-badge-color-scheme-5-background);--ui5-badge-color-scheme-5-border:var(--sapAccentColor5);--ui5-badge-color-scheme-5-color:var(--sapAccentColor5);--ui5-badge-color-scheme-6-background:var(--sapLegendBackgroundColor6);--ui5-badge-color-scheme-6-hover-background:var(--ui5-badge-color-scheme-6-background);--ui5-badge-color-scheme-6-border:var(--sapAccentColor6);--ui5-badge-color-scheme-6-color:var(--sapAccentColor6);--ui5-badge-color-scheme-7-background:var(--sapLegendBackgroundColor7);--ui5-badge-color-scheme-7-hover-background:var(--ui5-badge-color-scheme-7-background);--ui5-badge-color-scheme-7-border:var(--sapAccentColor7);--ui5-badge-color-scheme-7-color:var(--sapAccentColor7);--ui5-badge-color-scheme-8-background:var(--sapLegendBackgroundColor18);--ui5-badge-color-scheme-8-hover-background:var(--ui5-badge-color-scheme-8-background);--ui5-badge-color-scheme-8-border:var(--sapLegendColor18);--ui5-badge-color-scheme-8-color:var(--sapLegendColor18);--ui5-badge-color-scheme-9-background:var(--sapLegendBackgroundColor10);--ui5-badge-color-scheme-9-hover-background:var(--ui5-badge-color-scheme-9-background);--ui5-badge-color-scheme-9-border:var(--sapAccentColor10);--ui5-badge-color-scheme-9-color:var(--sapAccentColor10);--ui5-badge-color-scheme-10-background:var(--sapLegendBackgroundColor9);--ui5-badge-color-scheme-10-hover-background:var(--ui5-badge-color-scheme-10-background);--ui5-badge-color-scheme-10-border:var(--sapAccentColor9);--ui5-badge-color-scheme-10-color:var(--sapAccentColor9);--_ui5_busy_indicator_color:var(--sapContent_IconColor);--_ui5_busy_indicator_focus_outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5_busy_indicator_focus_border_radius:0px;--_ui5_button_base_min_width:2.5rem;--_ui5_button_base_min_compact_width:2rem;--_ui5_button_base_height:2.5rem;--_ui5_button_compact_height:1.625rem;--_ui5_button_border_radius:var(--sapButton_BorderCornerRadius);--_ui5_button_base_padding:0.6875rem;--_ui5_button_compact_padding:0.4375rem;--_ui5_button_base_icon_margin:0.563rem;--_ui5_button_icon_font_size:1.375rem;--_ui5_button_outline:1px dotted var(--sapContent_FocusColor);--_ui5_button_emphasized_outline:1px dotted var(--sapContent_FocusColor);--_ui5_button_outline_offset:-0.1875rem;--_ui5_button_emphasized_font_weight:normal;--_ui5_button_text_shadow:var(--sapContent_TextShadow);--_ui5_button_focus_offset:1px;--_ui5_button_focus_width:1px;--_ui5_button_focus_color:var(--sapContent_FocusColor);--_ui5_button_focus_outline_focus_color:var(--sapContent_ContrastFocusColor);--_ui5_button_positive_border_focus_hover_color:var(--sapContent_FocusColor);--_ui5_button_positive_focus_border_color:var(--sapButton_Accept_BorderColor);--_ui5_button_negative_focus_border_color:var(--sapButton_Reject_BorderColor);--_ui5_button_attention_focus_border_color:var(--sapButton_Negative_BorderColor);--_ui5_button_emphasized_focused_border_color:var(--sapButton_Emphasized_BorderColor);--_ui5_button_fontFamily:"72override",var(--sapFontFamily);--_ui5_button_emphasized_focused_border_radius:0;--_ui5_button_transparent_hover:transparent;--_ui5_button_base_min_width:2.25rem;--_ui5_button_base_height:2.25rem;--_ui5_button_base_padding:0.5625rem;--_ui5_button_base_icon_only_padding:0.5625rem;--_ui5_button_base_icon_margin:0.375rem;--_ui5_button_icon_font_size:1rem;--_ui5_button_emphasized_font_weight:bold;--_ui5_button_text_shadow:none;--_ui5_button_emphasized_focused_border:0.0625rem dotted var(--sapContent_ContrastFocusColor);--_ui5_button_emphasized_outline:1px solid var(--sapContent_FocusColor);--_ui5_card_box_shadow:var(--sapContent_Shadow0);--_ui5_card_hover_box_shadow:var(--_ui5_card_box_shadow);--_ui5_card_border_color:var(--sapTile_BorderColor);--_ui5_card_border-radius:.25rem;--_ui5_card_content_padding:1rem;--_ui5_card_header_hover_bg:var(--sapList_Hover_Background);--_ui5_card_header_active_bg:var(--_ui5_card_header_hover_bg);--_ui5_card_header_border_color:var(--sapTile_SeparatorColor);--_ui5_card_header_focus_border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5_card_header_focus_radius:0px;--_ui5_card_header_focus_bottom_radius:0px;--_ui5_card_header_focus_offset:1px;--_ui5_card_header_title_font_family:"72override",var(--sapFontFamily);--_ui5_card_header_title_font_size:var(--sapFontHeader5Size);--_ui5_card_header_title_font_weight:normal;--ui5_carousel_button_size:2.5rem;--ui5_carousel_height:0.25rem;--ui5_carousel_width:0.25rem;--ui5_carousel_margin:0 0.375rem;--ui5_carousel_border:1px solid var(--sapContent_ForegroundBorderColor);--ui5_carousel_dot_border:none;--ui5_carousel_dot_background:var(--sapContent_NonInteractiveIconColor);--_ui5_checkbox_wrapper_padding:.8125rem;--_ui5_checkbox_width_height:3rem;--_ui5_checkbox_box_shadow:none;--_ui5_checkbox_transition:unset;--_ui5_checkbox_focus_border:none;--_ui5_checkbox_border_radius:0;--_ui5_checkbox_hover_background:var(--sapField_Hover_Background);--_ui5_checkbox_active_background:var(--sapField_Hover_Background);--_ui5_checkbox_checkmark_warning_color:var(--sapField_TextColor);--_ui5_checkbox_checkmark_color:var(--sapSelectedColor);--_ui5_checkbox_focus_position:.6875rem;--_ui5_checkbox_focus_outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5_checkbox_focus_border_radius:0;--_ui5_checkbox_outer_hover_background:transparent;--_ui5_checkbox_inner_width_height:1.375rem;--_ui5_checkbox_inner_border:solid .125rem var(--sapField_BorderColor);--_ui5_checkbox_inner_hover_border_color:var(--sapField_HoverBorderColor);--_ui5_checkbox_inner_hover_checked_border_color:var(--sapField_HoverBorderColor);--_ui5_checkbox_inner_selected_border_color:var(--sapField_BorderColor);--_ui5_checkbox_inner_disabled_border_color:var(--sapField_BorderColor);--_ui5_checkbox_inner_active_border_color:var(--sapField_BorderColor);--_ui5_checkbox_inner_border_radius:0;--_ui5_checkbox_inner_error_border:0.125rem solid var(--sapField_InvalidColor);--_ui5_checkbox_inner_warning_border:0.125rem solid var(--sapField_WarningColor);--_ui5_checkbox_inner_information_border:0.125rem solid var(--sapField_InformationColor);--_ui5_checkbox_inner_information_box_shadow:none;--_ui5_checkbox_inner_warning_box_shadow:none;--_ui5_checkbox_inner_error_box_shadow:none;--_ui5_checkbox_inner_success_box_shadow:none;--_ui5_checkbox_inner_default_box_shadow:none;--_ui5_checkbox_inner_warning_background_hover:var(--sapField_WarningBackground);--_ui5_checkbox_inner_error_background_hover:var(--sapField_InvalidBackground);--_ui5_checkbox_inner_success_background_hover:var(--sapField_SuccessBackground);--_ui5_checkbox_inner_information_background_hover:var(--sapField_InformationBackground);--_ui5_checkbox_inner_success_border:var(--sapField_BorderWidth) solid var(--sapField_SuccessColor);--_ui5_checkbox_inner_readonly_border:0.125rem solid var(--sapField_ReadOnly_BorderColor);--_ui5_checkbox_inner_background:var(--sapField_Background);--_ui5_checkbox_wrapped_focus_padding:.375rem;--_ui5_checkbox_wrapped_content_margin_top:.125rem;--_ui5_checkbox_wrapped_focus_left_top_bottom_position:.5625rem;--_ui5_checkbox_compact_wrapper_padding:.5rem;--_ui5_checkbox_compact_width_height:2rem;--_ui5_checkbox_compact_inner_size:1rem;--_ui5_checkbox_compact_focus_position:.375rem;--_ui5_checkbox_compact_wrapped_label_margin_top:-1px;--_ui5_checkbox_label_color:var(--sapContent_LabelColor);--_ui5_checkbox_label_offset_left:var(--_ui5_checkbox_wrapper_padding);--_ui5_checkbox_label_offset_right:0;--_ui5_checkbox_disabled_label_color:var(--sapContent_LabelColor);--_ui5_checkbox_default_focus_border:none;--_ui5_checkbox_focus_outline_display:block;--_ui5_checkbox_wrapper_padding:.6875rem;--_ui5_checkbox_width_height:2.75rem;--_ui5_checkbox_inner_border:.0625rem solid var(--sapField_BorderColor);--_ui5_checkbox_focus_position:0.5625rem;--_ui5_checkbox_inner_border_radius:.125rem;--_ui5_checkbox_wrapped_content_margin_top:0;--_ui5_checkbox_wrapped_focus_padding:.5rem;--_ui5_checkbox_inner_readonly_border:1px solid var(--sapField_ReadOnly_BorderColor);--_ui5_checkbox_compact_wrapped_label_margin_top:-0.125rem;--_ui5_color-palette-item-container-sides-padding:0.3125rem;--_ui5_color-palette-item-container-rows-padding:0.6875rem;--_ui5_color-palette-item-focus-height:1.5rem;--_ui5_color-palette-item-container-padding:var(--_ui5_color-palette-item-container-sides-padding) var(--_ui5_color-palette-item-container-rows-padding);--_ui5_color-palette-item-hover-margin:0;--_ui5_color-palette-row-height:9.5rem;--_ui5_color-palette-button-height:3rem;--_ui5_color-palette-item-before-focus-color:0.0625rem solid #fff;--_ui5_color-palette-item-before-focus-offset:0.0625rem;--_ui5_color-palette-item-after-focus-color:0.0625rem dotted #000;--_ui5_color-palette-item-after-focus-offset:0.0625rem;--_ui5_color-palette-item-border-radius:0;--_ui5_color_picker_slider_handle_box_shadow:0.0625rem solid var(--sapField_BorderColor);--_ui5_color_picker_slider_handle_border:0.125rem solid var(--sapField_BorderColor);--_ui5_color_picker_slider_handle_outline_hover:0.125rem solid var(--sapButton_Hover_BorderColor);--_ui5_color_picker_slider_handle_outline_focus:0.0625rem dotted var(--sapContent_FocusColor);--_ui5_color_picker_slider_handle_margin_top:0.0625rem;--_ui5_color_picker_slider_handle_focus_margin_top:0.0625rem;--_ui5_datepicker_icon_border:none;--_ui5-datepicker_border_radius:0;--_ui5-datepicker-hover-background:var(--sapField_Hover_Background);--_ui5-datepicker_icon_border_radius:0;--_ui5_daypicker_item_box_shadow:inset 0 0 0 0.0625rem var(--sapContent_Selected_ForegroundColor);--_ui5_daypicker_item_margin:2px;--_ui5_daypicker_item_border:none;--_ui5_daypicker_item_selected_border_color:var(--sapList_Background);--_ui5_daypicker_daynames_container_height:2rem;--_ui5_daypicker_weeknumbers_container_padding_top:2rem;--_ui5_daypicker_item_othermonth_background_color:var(--sapList_Background);--_ui5_daypicker_item_othermonth_color:var(--sapContent_LabelColor);--_ui5_daypicker_item_othermonth_hover_color:var(--sapContent_LabelColor);--_ui5_daypicker_item_border_radius:0;--_ui5_daypicker_item_now_inner_border_radius:0;--_ui5_daypicker_dayname_color:var(--sapContent_LabelColor);--_ui5_daypicker_weekname_color:var(--sapContent_LabelColor);--_ui5_daypicker_item_outline_width:1px;--_ui5_daypicker_item_outline_offset:1px;--_ui5_daypicker_item_now_selected_outline_offset:2px;--_ui5_daypicker_item_now_focus_after_width:calc(100% - 0.25rem);--_ui5_daypicker_item_now_focus_after_height:calc(100% - 0.25rem);--_ui5_daypicker_item_now_selected_focus_after_width:calc(100% - 0.375rem);--_ui5_daypicker_item_now_selected_focus_after_height:calc(100% - 0.375rem);--_ui5_daypicker_item_selected_background:transparent;--_ui5_daypicker_item_selected_box_shadow:var(--_ui5_daypicker_item_box_shadow),var(--_ui5_daypicker_item_box_shadow);--_ui5_daypicker_item_selected_daytext_hover_background:transparent;--_ui5_daypicker_item_outline_focus_after:none;--_ui5_daypicker_item_border_radius_focus_after:none;--_ui5_daypicker_item_border_focus_after:var(--_ui5_daypicker_item_outline_width) dotted var(--sapContent_FocusColor);--_ui5_daypicker_item_width_focus_after:calc(100% - 0.25rem);--_ui5_daypicker_item_height_focus_after:calc(100% - 0.25rem);--_ui5_daypicker_item_now_border:0.125rem solid var(--sapLegend_CurrentDateTime);--_ui5_daypicker_item_now_outline:none;--_ui5_daypicker_item_now_outline_offset:none;--_ui5_daypicker_item_now_outline_offset_focus_after:var(--_ui5_daypicker_item_now_outline_offset);--_ui5_daypicker_item_selected_between_border:5%;--_ui5_daypicker_item_selected_between_background:transparent;--_ui5_daypicker_item_selected_between_text_background:var(--sapList_SelectionBackgroundColor);--_ui5_daypicker_item_selected_between_text_font:inherit;--_ui5_daypicker_item_selected_between_hover_background:inherit;--_ui5_daypicker_item_now_box_shadow:inset 0 0 0 0.0625rem var(--_ui5_daypicker_item_selected_border_color);--_ui5_daypicker_item_selected_text_outline:none;--_ui5_daypicker_item_border_radius:0.25rem;--_ui5_daypicker_item_now_inner_border_radius:0.125rem;--_ui5_dialog_resize_handle_color:var(--sapButton_Lite_TextColor);--_ui5_dialog_header_focus_width:0.0625rem;--_ui5_dialog_header_focus_offset:-0.1875rem;--_ui5_dialog_outline:var(--_ui5_dialog_header_focus_width) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5_dialog_header_border_radius:0px;--_ui5_dialog_resize_handle_right:-0.25rem;--_ui5_dialog_resize_handle_bottom:-0.0625rem;--ui5-group-header-listitem-background-color:var(--sapList_GroupHeaderBackground);--_ui5_input_width:13.125rem;--_ui5_input_height:2.5rem;--_ui5_input_compact_height:1.625rem;--_ui5-input-hover-border:1px solid var(--sapField_Hover_BorderColor);--_ui5-input-hover-box-shadow:none;--_ui5-input-focus-box-shadow:none;--_ui5-input-background-color:var(--sapField_Background);--_ui5-input-border-radius:var(--sapField_BorderCornerRadius);--_ui5-input-border:2px solid transparent;--_ui5-input-placeholder-style:italic;--_ui5-input-placeholder-color:var(--sapField_PlaceholderTextColor);--_ui5-input-bottom-border-height:0;--_ui5-input-bottom-border-color:transparent;--_ui5-input-focused-border-color:var(--sapField_Hover_BorderColor);--_ui5-input-focus-outline:var(--_ui5_input_focus_border_width) dotted var(--sapContent_FocusColor);--_ui5-input-focus-outline-offset:-3px;--_ui5_input_state_border_width:0.125rem;--_ui5-input-information_border_width:0.125rem;--_ui5_input_error_font_weight:normal;--_ui5_input_focus_border_width:1px;--_ui5_input_error_warning_border_style:solid;--_ui5_input_error_warning_font_style:inherit;--_ui5_input_disabled_color:var(--sapContent_DisabledTextColor);--_ui5_input_disabled_font_weight:normal;--_ui5_input_disabled_border_color:var(--sapField_ReadOnly_BorderColor);--_ui5-input-disabled-background:var(--sapField_ReadOnly_Background);--_ui5_input_readonly_border_color:var(--sapField_ReadOnly_BorderColor);--_ui5-input-readonly-background:var(--sapField_ReadOnly_Background);--_ui5_input_icon_padding:0.625rem .6875rem;--_ui5_input_disabled_opacity:0.5;--_ui5_input_icon_min_width:2.375rem;--_ui5_input_compact_min_width:2rem;--_ui5-input-value-state-outline:var(--_ui5_input_focus_border_width) dotted var(--sapContent_FocusColor);--_ui5-input-value-state-outline-offset:-4px;--_ui5-input-transition:none;--_ui5-input-value-state-icon-display:none;--_ui5-input-focused-value-state-error-background:var(--sapField_InvalidBackground);--_ui5-input-focused-value-state-warning-background:var(--sapField_WarningBackground);--_ui5-input-focused-value-state-success-background:var(--sapField_SuccessBackground);--_ui5-input-focused-value-state-information-background:var(--sapField_InformationBackground);--_ui5-input-value-state-error-border-color:var(--sapField_InvalidColor);--_ui5-input-focused-value-state-error-border-color:var(--sapField_InvalidColor);--_ui5-input-value-state-warning-border-color:var(--sapField_WarningColor);--_ui5-input-focused-value-state-warning-border-color:var(--sapField_WarningColor);--_ui5-input-value-state-success-border-color:var(--sapField_SuccessColor);--_ui5-input-focused-value-state-success-border-color:var(--sapField_SuccessColor);--_ui5-input-value-state-success-border-width:1px;--_ui5-input-value-state-information-border-color:var(--sapField_InformationColor);--_ui5-input-focused-value-state-information-border-color:var(--sapField_InformationColor);--_ui5-input-value-state-information-border-width:1px;--_ui5-input-background-image:none;--_ui5-input-information-background-image:none;--_ui5-input-success-background-image:none;--_ui5-input-error-background-image:none;--_ui5-input-warning-background-image:none;--_ui5_input_readonly_icon_display:none;--_ui5_input_height:2.25rem;--_ui5-input-border:1px solid var(--sapField_BorderColor);--_ui5_input_disabled_opacity:0.4;--_ui5_input_icon_padding:.5625rem .6875rem;--_ui5_input_icon_color:var(--sapContent_IconColor);--_ui5_input_icon_pressed_color:var(--sapButton_Active_TextColor);--_ui5_input_icon_pressed_bg:var(--sapButton_Selected_Background);--_ui5_input_icon_hover_bg:var(--sapButton_Lite_Hover_Background);--_ui5_input_icon_border_radius:0;--_ui5_input_icon_box_shadow:none;--_ui5_input_icon_border:1px solid transparent;--_ui5_input_icon_margin:0;--_ui5_link_opacity:0.5;--_ui5_link_border:0.0625rem dotted transparent;--_ui5_link_border_focus:0.0625rem dotted var(--sapContent_FocusColor);--_ui5_link_focus_border-radius:0;--_ui5_link_opacity:0.4;--_ui5_link_text_decoration:none;--_ui5_link_hover_text_decoration:underline;--ui5_list_footer_text_color:var(--sapPageFooter_TextColor);--ui5_list_footer_text_color:var(--sapTextColor);--ui5-listitem-background-color:var(--sapList_Background);--ui5-listitem-border-bottom:1px solid var(--sapList_BorderColor);--ui5-listitem-selected-border-bottom:1px solid var(--sapList_SelectionBorderColor);--ui5-listitem-active-border-color:var(--sapContent_ContrastFocusColor);--_ui5_listitembase_focus_width:1px;--_ui5-listitembase_disabled_opacity:0.5;--_ui5_product_switch_item_border:none;--_ui5_monthpicker_item_border_radius:0;--_ui5_monthpicker_item_border:none;--_ui5_monthpicker_item_margin:1px;--_ui5_monthpicker_item_focus_after_width:calc(100% - 0.375rem);--_ui5_monthpicker_item_focus_after_height:calc(100% - 0.375rem);--_ui5_monthpicker_item_focus_after_border:1px dotted var(--sapContent_FocusColor);--_ui5_monthpicker_item_focus_after_offset:2px;--_ui5_monthpicker_item_focus_after_border_radius:0;--_ui5_monthpicker_item_selected_text_color:var(--sapContent_ContrastTextColor);--_ui5_monthpicker_item_selected_background_color:var(--sapSelectedColor);--_ui5_monthpicker_item_selected_hover_color:var(--sapContent_Selected_Background);--_ui5_monthpicker_item_selected_box_shadow:none;--_ui5_monthpicker_item_focus_after_outline:none;--_ui5_monthpicker_item_selected_font_wieght:inherit;--_ui5_monthpicker_item_border_radius:0.25rem;--_ui5_message_strip_icon_width:2.5rem;--_ui5_message_strip_border_radius:0.1875rem;--_ui5_message_strip_success_border_color:var(--sapSuccessBorderColor);--_ui5_message_strip_error_border_color:var(--sapErrorBorderColor);--_ui5_message_strip_warning_border_color:var(--sapWarningBorderColor);--_ui5_message_strip_information_border_color:var(--sapInformationBorderColor);--_ui5_message_strip_button_border_width:0;--_ui5_message_strip_button_border_style:none;--_ui5_message_strip_button_border_color:transparent;--_ui5_message_strip_button_border_radius:0;--_ui5_message_strip_padding:0.4375rem 2.5rem 0.4375rem 2.5rem;--_ui5_message_strip_padding_no_icon:0.4375rem 2.5rem 0.4375rem 1rem;--_ui5_message_strip_button_height:1.625rem;--_ui5_message_strip_border_width:1px;--_ui5_message_strip_close_button_border:none;--_ui5_message_strip_close_button_size:1.625rem;--_ui5_message_strip_icon_top:0.4375rem;--_ui5_message_strip_focus_width:1px;--_ui5_message_strip_focus_offset:-2px;--_ui5_panel_focus_border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5_panel_header_height:3rem;--_ui5_panel_button_root_width:3rem;--_ui5_panel_background_color:var(--sapGroup_TitleBackground);--_ui5_panel_border_radius:0px;--_ui5_panel_border_radius_expanded:0;--_ui5_panel_border_bottom:1px solid var(--sapGroup_TitleBorderColor);--_ui5_panel_outline_offset:-3px;--_ui5_panel_title_font_weight:normal;--_ui5_panel_header_height:2.75rem;--_ui5_panel_button_root_width:2.75rem;--_ui5_popup_content_padding:.4375em;--_ui5_popup_viewport_margin:10px;--_ui5-popup-border-radius:0.25rem;--_ui5_popup_header_shadow:var(--sapContent_Shadow0);--_ui5_popup_footer_border_top:1px solid var(--sapPageFooter_BorderColor);--_ui5_popup_header_footer_font_weight:400;--_ui5_progress_indicator_background_none:var(--sapField_Background);--_ui5_progress_indicator_background_error:var(--sapField_Background);--_ui5_progress_indicator_background_warning:var(--sapField_Background);--_ui5_progress_indicator_background_success:var(--sapField_Background);--_ui5_progress_indicator_background_information:var(--sapField_Background);--_ui5_progress_indicator_value_state_none:var(--sapNeutralElementColor);--_ui5_progress_indicator_value_state_error:var(--sapNegativeElementColor);--_ui5_progress_indicator_value_state_warning:var(--sapCriticalElementColor);--_ui5_progress_indicator_value_state_success:var(--sapPositiveElementColor);--_ui5_progress_indicator_value_state_information:var(--sapInformativeElementColor);--_ui5_progress_indicator_border_color_error:var(--sapField_BorderColor);--_ui5_progress_indicator_border_color_warning:var(--sapField_BorderColor);--_ui5_progress_indicator_border_color_success:var(--sapField_BorderColor);--_ui5_progress_indicator_border_color_information:var(--sapField_BorderColor);--_ui5_progress_indicator_color:var(--sapTextColor);--_ui5_progress_indicator_bar_color:var(--sapContent_ContrastTextColor);--_ui5_progress_indicator_border:0.0625rem solid var(--sapField_BorderColor);--_ui5_progress_indicator_bar_border_max:none;--_ui5_progress_indicator_icon_visibility:none;--_ui5_radio_button_min_width:2.75rem;--_ui5_radio_button_min_width_compact:2rem;--_ui5_radio_button_hover_fill:var(--sapField_Hover_Background);--_ui5_radio_button_border_width:1px;--_ui5_radio_button_checked_fill:var(--sapSelectedColor);--_ui5_radio_button_checked_error_fill:var(--sapField_InvalidColor);--_ui5_radio_button_checked_warning_fill:var(--sapField_TextColor);--_ui5_radio_button_warning_error_border_dash:0;--_ui5_radio_button_outer_ring_color:var(--sapField_BorderColor);--_ui5_radio_button_outer_ring_width:1;--_ui5_radio_button_outer_ring_bg:var(--sapField_Background);--_ui5_radio_button_outer_ring_hover_color:var(--sapField_Hover_BorderColor);--_ui5_radio_button_outer_ring_active_color:var(--sapField_Hover_BorderColor);--_ui5_radio_button_outer_ring_checked_hover_color:var(--sapField_Hover_BorderColor);--_ui5_radio_button_outer_ring_padding:0 0.625rem;--_ui5_radio_button_outer_ring_padding_with_label:0 0.625rem;--_ui5_radio_button_outer_ring_padding_rtl:0 0.625rem;--_ui5_radio_button_border_radius:0;--_ui5_radio_button_border:none;--_ui5_radio_button_focus_border:none;--_ui5_radio_button_focus_outline:block;--_ui5_radio_button_hover_shadow:none;--_ui5_radio_button_transition:none;--_ui5_radio_button_hover_background:inherit;--_ui5_radio_button_color:var(--sapField_BorderColor);--_ui5_radio_button_label_offset:1px;--_ui5_radio_button_label_color:var(--sapContent_LabelColor);--_ui5_radio_button_items_align:unset;--_ui5_radio_button_inner_width:initial;--_ui5_radio_button_border_readonly_focus_style:var(--sapContent_FocusStyle);--_ui5_segmented_btn_inner_border:0.0625rem solid var(--sapButton_Selected_BorderColor);--_ui5_segmented_btn_inner_border_odd_child:0;--_ui5_segmented_btn_inner_pressed_border_odd_child:0;--_ui5_segmented_btn_border_radius:0.35rem;--_ui5_segmented_btn_inner_border_radius:0;--_ui5_segmented_btn_background_color:transparent;--_ui5_select_disabled_background:var(--sapField_Background);--_ui5_select_disabled_border_color:var(--sapField_BorderColor);--_ui5_select_state_error_warning_border_style:solid;--_ui5_select_state_error_warning_border_width:0.125rem;--_ui5_select_hover_icon_left_border:1px solid transparent;--_ui5_select_rtl_hover_icon_left_border:none;--_ui5_select_rtl_hover_icon_right_border:none;--_ui5_select_focus_width:1px;--_ui5_select_label_olor:var(--sapField_TextColor);--_ui5_switch_height:2.75rem;--_ui5_switch_width:3.875rem;--_ui5_switch_no_label_width:3.25rem;--_ui5_switch_no_label_width_horizon:3.875rem;--_ui5_switch_root_outline_top_bottom:0.25rem;--_ui5_switch_root_outline_left_right:-0.125rem;--_ui5_switch_root_outline_top_bottom_horizon:0.3125rem;--_ui5_switch_root_outline_left_right_horizon:-0.0625rem;--_ui5_switch_root_outline_top_bottom_hcb:0.1875rem;--_ui5_switch_root_outline_left_right_hcb:-0.1875rem;--_ui5_switch_compact_height:2rem;--_ui5_switch_compact_width:3.5rem;--_ui5_switch_compact_no_label_width:2.5rem;--_ui5_switch_compact_no_label_width_horizon:3.5rem;--_ui5_switch_compact_root_outline_top_bottom:0.0625rem;--_ui5_switch_compact_root_outline_left_right:-0.125rem;--_ui5_switch_compact_root_outline_top_bottom_horizon:0.125em;--_ui5_switch_compact_root_outline_left_right_horizon:-0.125rem;--_ui5_switch_compact_root_outline_top_bottom_hcb:0;--_ui5_switch_compact_root_outline_left_right_hcb:-0.1875rem;--_ui5_switch_foucs_border_size:1px;--_ui5_switch_focus_outline:var(--_ui5_switch_foucs_border_size) dotted var(--sapContent_FocusColor);--_ui5_switch_root_after_boreder:var(--_ui5_switch_outline) dotted var(--sapContent_FocusColor);--_ui5-switch-root-border-radius:0;--_ui5-switch-root-box-shadow:none;--_ui5_switch_root_after_outline:none;--_ui5-switch-focus:"";--_ui5_switch_semantic_button_background:var(--sapButton_Background);--_ui5_switch_track_height:1.375rem;--_ui5_switch_track_no_label_height:1.25rem;--_ui5_switch_track_no_label_height_horizont:var(--_ui5_switch_track_height);--_ui5-switch-track-border:1px solid;--_ui5-switch-track-border_color:var(--sapContent_ForegroundBorderColor);--_ui5-switch_handle-off-hover_box_shadow:none;--_ui5-switch_handle-on-hover_box_shadow:none;--_ui5_switch_track_semantic_success_backgroud_color:var(--sapSuccessBackground);--_ui5_switch_track_semantic_error_backgroud_color:var(----sapErrorBackground);--_ui5_switch_track_semantic_border_color:var(--sapSuccessBorderColor);--_ui5_switch_track_semantic_not_checked_border_color:var(--sapErrorBorderColor);--_ui5_switch_track_semantic_checked_hover_border_color:var(--sapSuccessBorderColor);--_ui5_switch_track_semantic_hover_border_color:var(--sapErrorBorderColor);--_ui5_switch_handle_hover_border_color:var(--sapButton_Hover_BorderColor);--_ui5_switch_track_hover_border_color:var(--_ui5_switch_track_checked_border_color);--_ui5_switch_track_hover_background_color:var(--sapButton_Track_Background);--_ui5_switch_track_hover_checked_background_color:var(--sapButton_Track_Selected_Background);--_ui5-switch_track-on-hover-background:var(--_ui5-switch_track-on-background);--_ui5_switch_track_border_radius:0.75rem;--_ui5-switch_track-off-background:var(--sapButton_Track_Background);--_ui5-switch_track-on-background:var(--sapButton_Track_Selected_Background);--_ui5-switch_track-off-hover-color:var(--_ui5-switch_track-off-background);--_ui5-switch-track-transition:none;--_ui5_switch_disabled_opacity:.4;--_ui5_switch_track_disabled_checked_bg:var(--_ui5_switch_track_checked_bg);--_ui5_switch_track_disabled_border_color:var(--sapContent_ForegroundBorderColor);--_ui5_switch_track_disabled_semantic_checked_bg:var(--sapSuccessBackground);--_ui5_switch_track_disabled_semantic_checked_border_color:var(--sapSuccessBorderColor);--_ui5_switch_track_disabled_semantic_bg:var(--sapErrorBackground);--_ui5_switch_track_disabled_semantic_border_color:var(--sapErrorBorderColor);--_ui5-switch-track-icon-display:none;--_ui5_switch_handle_width:2rem;--_ui5_switch_handle_height:2rem;--_ui5_switch_handle_border_width:1px;--_ui5_switch_handle_border_radius:1rem;--_ui5_switch_handle_bg:var(--sapButton_TokenBackground);--_ui5_switch_handle_checked_bg:var(--sapButton_Selected_Background);--_ui5_switch_handle_checked_border_color:var(--sapButton_Selected_BorderColor);--_ui5_switch_handle_semantic_hover_bg:var(--sapErrorBackground);--_ui5_switch_handle_semantic_checked_hover_bg:var(--sapSuccessBackground);--_ui5_switch_handle_semantic_hover_border_color:var(--sapErrorBorderColor);--_ui5_switch_handle_semantic_checked_hover_border_color:var(--sapSuccessBorderColor);--_ui5_switch_handle_compact_width:1.625rem;--_ui5_switch_handle_compact_height:1.625rem;--_ui5-switch-handle-border:var(--_ui5_switch_handle_border_width) solid var(--sapContent_ForegroundBorderColor);--_ui5-switch-handle-left:-1px;--_ui5_switch_handle_disabled_bg:var(--_ui5_switch_handle_bg);--_ui5_switch_handle_disabled_checked_bg:var(--_ui5_switch_handle_checked_bg);--_ui5_switch_handle_disabled_border_color:var(--sapContent_ForegroundBorderColor);--_ui5_switch_handle_disabled_semantic_checked_bg:var(--sapButton_Background);--_ui5_switch_handle_disabled_semantic_checked_border_color:var(--sapSuccessBorderColor);--_ui5_switch_handle_disabled_semantic_border_color:var(--sapErrorBorderColor);--_ui5-switch-handle-icon-display:none;--_ui5-switch-slider-texts-display:inline;--_ui5_switch_text_on_semantic_color:var(--sapPositiveElementColor);--_ui5_switch_text_off_semantic_color:var(--sapNegativeElementColor);--_ui5_switch_text_disabled_color:var(--sapTextColor);--_ui5_tc_header_height_text_only:var(--_ui5_tc_item_text_only_height);--_ui5_tc_header_height_text_with_additional_text:var(--_ui5_tc_item_text_only_with_additional_text_height);--_ui5_tc_header_box_shadow:var(--sapContent_HeaderShadow);--_ui5_tc_header_border_bottom:0.125rem solid var(--sapObjectHeader_Background);--_ui5_tc_headeritem_padding:0 1rem;--_ui5_tc_headerItem_color:var(--sapContent_LabelColor);--_ui5_tc_headerItem_text_hover_color:var(--_ui5_tc_headerItem_color);--_ui5_tc_headeritem_text_selected_color:var(--sapSelectedColor);--_ui5_tc_headeritem_text_selected_hover_color:var(--sapSelectedColor);--_ui5_tc_headeritem_text_font_weight:normal;--_ui5_tc_headeritem_additional_text_font_weight:normal;--_ui5_tc_headerItem_neutral_color:var(--sapNeutralColor);--_ui5_tc_headerItem_positive_color:var(--sapPositiveColor);--_ui5_tc_headerItem_negative_color:var(--sapNegativeColor);--_ui5_tc_headerItem_critical_color:var(--sapCriticalColor);--_ui5_tc_headerItem_neutral_border_color:var(--_ui5_tc_headerItem_neutral_color);--_ui5_tc_headerItem_positive_border_color:var(--_ui5_tc_headerItem_positive_color);--_ui5_tc_headerItem_negative_border_color:var(--_ui5_tc_headerItem_negative_color);--_ui5_tc_headerItem_critical_border_color:var(--_ui5_tc_headerItem_critical_color);--_ui5_tc_headerItem_neutral_selected_border_color:var(--_ui5_tc_headerItem_neutral_color);--_ui5_tc_headerItem_positive_selected_border_color:var(--_ui5_tc_headerItem_positive_color);--_ui5_tc_headerItem_negative_selected_border_color:var(--_ui5_tc_headerItem_negative_color);--_ui5_tc_headerItem_critical_selected_border_color:var(--_ui5_tc_headerItem_critical_color);--_ui5_tc_headerItem_transition:none;--_ui5_tc_headerItem_hover_border_visibility:hidden;--_ui5_tc_headerItem_focus_offset:0px;--_ui5_tc_headerItemContent_border_radius:0.125rem 0.125rem 0 0;--_ui5_tc_headerItemContent_border_bottom:0.125rem solid var(--sapSelectedColor);--_ui5_tc_headerItemContent_border_bg:transparent;--_ui5_tc_headerItem_neutral_border_bg:transparent;--_ui5_tc_headerItem_positive_border_bg:transparent;--_ui5_tc_headerItem_negative_border_bg:transparent;--_ui5_tc_headerItem_critical_border_bg:transparent;--_ui5_tc_headerItem_hover_border_bg:transparent;--_ui5_tc_headerItem_hover_selected_hover_border_bg:transparent;--_ui5_tc_headerItemContent_border_height:0;--_ui5_tc_headerItemContent_offset:1rem;--_ui5_tc_headerItemContent_focus_offset:1rem;--_ui5_tc_headerItem_focus_border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5_tc_headerItemContent_padding:0;--_ui5_tc_headerItemContent_focus_border:none;--_ui5_tc_headerItemContent_default_focus_border:none;--_ui5_tc_headerItemContent_focus_border_radius:0;--_ui5_tc_headerItemSemanticIcon_display:none;--_ui5_tc_headerItem_focus_border_radius:0px;--_ui5_tc_overflowItem_neutral_color:var(--sapNeutralColor);--_ui5_tc_overflowItem_positive_color:var(--sapPositiveColor);--_ui5_tc_overflowItem_negative_color:var(--sapNegativeColor);--_ui5_tc_overflowItem_critical_color:var(--sapCriticalColor);--_ui5_tc_overflowItem_focus_border:0px;--_ui5_tc_headerItemIcon_border:1px solid var(--sapHighlightColor);--_ui5_tc_headerItemIcon_color:var(--sapHighlightColor);--_ui5_tc_headerItemIcon_selected_background:var(--sapHighlightColor);--_ui5_tc_headerItemIcon_selected_color:var(--sapGroup_ContentBackground);--_ui5_tc_headerItemIcon_positive_selected_background:var(--sapPositiveColor);--_ui5_tc_headerItemIcon_negative_selected_background:var(--sapNegativeColor);--_ui5_tc_headerItemIcon_critical_selected_background:var(--sapCriticalColor);--_ui5_tc_headerItemIcon_neutral_selected_background:var(--sapNeutralColor);--_ui5_tc_headerItemIcon_semantic_selected_color:var(--sapGroup_ContentBackground);--_ui5_tc_content_border_bottom:0.125rem solid var(--sapObjectHeader_BorderColor);--_ui5_tc_headerItem_focus_border_offset:-2px;--_ui5_tc_headerItemIcon_focus_border_radius:0}.sapUiSizeCompact,.ui5-content-density-compact,:root,[data-ui5-compact-size]{--_ui5_tc_header_height:var(--_ui5_tc_item_height)}:root{--_ui5_tc_header_border_bottom:0.0625rem solid var(--sapObjectHeader_Background);--_ui5_tc_headerItemContent_border_bottom:0.1875rem solid var(--sapSelectedColor);--_ui5_tc_overflowItem_default_color:var(--sapHighlightColor);--_ui5_tc_overflowItem_current_color:CurrentColor;--_ui5_tc_content_border_bottom:0.0625rem solid var(--sapObjectHeader_BorderColor);--_ui5_textarea_focus_after_width:1px;--_ui5_textarea_warning_border_style:solid;--_ui5_textarea_state_border_width:0.125rem;--_ui5_textarea_background_image:none;--_ui5_textarea_error_background_image:none;--_ui5_textarea_warning_background_image:none;--_ui5_textarea_information_background_image:none;--_ui_textarea_success_background_image:none;--_ui5_textarea_focus_box_shadow:none;--_ui5_textarea_value_state_warning_focus_box_shadow:none;--_ui5_textarea_value_state_error_focus_box_shadow:none;--_ui5_textarea_value_state_success_focus_box_shadow:none;--_ui5_textarea_hover_box_shadow:none;--_ui5_textarea_inner_border_width:1px;--_ui5_textarea_success_border_width:1px;--_ui5_textarea_focus_outline:var(--_ui5_textarea_focus_after_width) dotted var(--sapContent_FocusColor);--_ui5_textarea_value_state_focus_outline:var(--_ui5_input_focus_border_width) dotted var(--sapContent_FocusColor);--_ui5_textarea_after_element_display:none;--_ui5_textarea_placeholder_font_style:italic;--_ui5-time_picker_border_radius:0;--_ui5_time_picker_border:0.0625rem solid transparent;--_ui5_toast_vertical_offset:3rem;--_ui5_toast_horizontal_offset:2rem;--_ui5_toast_background:var(--sapList_Background);--_ui5_toast_shadow:var(--sapContent_Shadow2);--_ui5_wheelslider_item_text_size:var(--sapFontSize);--_ui5_wheelslider_selected_item_hover_background_color:var(--sapList_BorderColor);--_ui5_wheelslider_label_text_size:var(--sapFontSmallSize);--_ui5_wheelslider_selection_frame_margin_top:calc(var(--_ui5_wheelslider_item_height)*2);--_ui5_wheelslider_mobile_selection_frame_margin_top:calc(var(--_ui5_wheelslider_item_height)*4);--_ui5_wheelslider_label_text_color:var(--sapContent_LabelColor);--_ui5_wheelslider_height:240px;--_ui5_wheelslider_mobile_height:432px;--_ui5_wheelslider_item_width:48px;--_ui5_wheelslider_item_height:46px;--_ui5_wheelslider_arrows_visibility:hidden;--_ui_wheelslider_item_expanded_hover_color:var(--sapList_Hover_Background);--_ui5_wheelslider_item_background_color:var(--sapLegend_WorkingBackground);--_ui5_wheelslider_item_text_color:var(--sapTextColor);--_ui_wheelslider_item_hover_color:var(--sapButton_Emphasized_Hover_BorderColor);--_ui5_wheelslider_item_border_color:var(--sapList_Background);--_ui5_wheelslider_item_hovered_border_color:var(--sapList_Background);--_ui5_wheelslider_collapsed_item_text_color:var(--_ui5_wheelslider_item_border_color);--_ui5_wheelslider_selected_item_background_color:var(--sapContent_Selected_Background);--_ui5_wheelslider_selected_item_hover_background_color:var(--sapButton_Emphasized_Hover_BorderColor);--_ui5_wheelslider_active_item_background_color:var(--sapContent_Selected_Background);--_ui5_wheelslider_active_item_text_color:var(--sapContent_Selected_TextColor);--_ui5_wheelslider_selection_frame_color:var(--sapList_SelectionBorderColor);--_ui_wheelslider_item_border_radius:var(--_ui5_button_border_radius);--_ui5_toggle_button_pressed_focussed:var(--sapButton_Selected_BorderColor);--_ui5_toggle_button_pressed_focussed_hovered:var(--sapButton_Selected_BorderColor);--_ui5_toggle_button_selected_positive_text_color:var(--sapButton_Selected_TextColor);--_ui5_toggle_button_selected_negative_text_color:var(--sapButton_Selected_TextColor);--_ui5_toggle_button_selected_attention_text_color:var(--sapButton_Selected_TextColor);--_ui5_toggle_button_emphasized_pressed_focussed_hovered:var(--sapContent_FocusColor);--_ui5_yearpicker_item_selected_focus:var(--sapContent_Selected_Background);--_ui5_yearpicker_item_selected_hover_color:var(--sapContent_Selected_Background);--_ui5_yearpicker_item_border:none;--_ui5_yearpicker_item_border_radius:0;--_ui5_yearpicker_item_margin:1px;--_ui5_yearpicker_item_focus_after_width:calc(100% - 0.375rem);--_ui5_yearpicker_item_focus_after_height:calc(100% - 0.375rem);--_ui5_yearpicker_item_focus_after_border:1px dotted var(--sapContent_FocusColor);--_ui5_yearpicker_item_focus_after_offset:2px;--_ui5_yearpicker_item_focus_after_border_radius:0;--_ui5_yearpicker_item_selected_background_color:var(--sapSelectedColor);--_ui5_yearpicker_item_selected_text_color:var(--sapContent_ContrastTextColor);--_ui5_yearpicker_item_selected_box_shadow:none;--_ui5_yearpicker_item_focus_after_outline:none;--_ui5_yearpicker_item_border_radius:0.25rem;--_ui5_calendar_header_arrow_button_border:none;--_ui5_calendar_header_arrow_button_border_radius:0.25rem;--_ui5_calendar_header_middle_button_width:6.25rem;--_ui5_calendar_header_middle_button_flex:1 1 auto;--_ui5_calendar_header_middle_button_focus_border_radius:0.25rem;--_ui5_calendar_header_middle_button_focus_border:none;--_ui5_calendar_header_middle_button_focus_after_display:block;--_ui5_calendar_header_middle_button_focus_after_width:calc(100% - 0.25rem);--_ui5_calendar_header_middle_button_focus_after_height:calc(100% - 0.25rem);--_ui5_calendar_header_middle_button_focus_after_top_offset:1px;--_ui5_calendar_header_middle_button_focus_after_left_offset:1px;--_ui5_calendar_header_button_background_color:none;--_ui5_calendar_header_arrow_button_box_shadow:none;--_ui5_calendar_header_middle_button_focus_background:transparent;--_ui5_calendar_header_middle_button_focus_outline:none;--_ui5_calendar_header_middle_button_focus_active_outline:none;--_ui5_calendar_header_middle_button_focus_active_background:var(--sapButton_Active_Background);--_ui5_calendar_header_middle_button_focus_after_border:1px dotted var(--sapContent_FocusColor);--_ui5_calendar_header_middle_button_focus_after_width:calc(100% - 0.375rem);--_ui5_calendar_header_middle_button_focus_after_height:calc(100% - 0.375rem);--_ui5_calendar_header_middle_button_focus_after_top_offset:0.125rem;--_ui5_calendar_header_middle_button_focus_after_left_offset:0.125rem;--ui5_table_bottom_border:1px solid var(--sapList_BorderColor);--ui5_table_header_row_outline_width:1px;--ui5_table_multiselect_column_width:2.75rem;--ui5_table_header_row_font_weight:normal;--ui5_table_row_outline_width:1px;--_ui5_load_more_padding:0;--_ui5_load_more_border:1px top solid transparent;--_ui5_load_more_border_radius:none;--_ui5_load_more_outline_width:1px;--ui5_title_level_1Size:1.625rem;--ui5_title_level_2Size:1.375rem;--ui5_title_level_3Size:1.250rem;--ui5_title_level_4Size:1.125rem;--ui5_title_level_5Size:1rem;--ui5_title_level_6Size:0.875rem;--_ui5_token_background:var(--sapButton_Background);--_ui5_token_border_radius:0.125rem;--_ui5_token_text_color:var(--sapButton_TextColor);--_ui5_token_hover_background:var(--sapButton_Hover_Background);--_ui5_token_hover_border_color:var(--sapButton_Hover_BorderColor);--_ui5_token_top_margin:0;--_ui5_token_bottom_margin:0;--_ui5_token_selected_focus_outline:var(--_ui5_token_focus_outline_width) dotted var(--sapContent_ContrastFocusColor);--_ui5_token_focus_outline:var(--_ui5_token_focus_outline_width) dotted var(--sapContent_FocusColor);--_ui5_token_selected_hover_background:var(--sapButton_Selected_Hover_Background);--_ui5_token_selected_hover_border_color:var(--sapButton_Selected_Hover_BorderColor);--_ui5_token_selected_box_shadow:none;--_ui5_token_focused_border:1px solid var(--sapButton_TokenBorderColor);--_ui5_token_focused_selected_border:1px solid var(--sapButton_Selected_BorderColor);--_ui5_token_background:var(--sapButton_TokenBackground);--_ui5_token_border_radius:0.25rem;--_ui5_token_focus_outline_width:0.0625rem;--_ui5_token_text_color:var(--sapTextColor);--_ui5_token_icon_color:var(--sapContent_IconColor);--_ui5_tokenizer_n_more_indicator_font_weight:normal;--_ui5_tokenizer_n_more_indicator_color:var(--sapField_TextColor);--_ui5_value_state_message_border:none;--_ui5_value_state_message_focus_border_radius:0;--_ui5_input_value_state_icon_display:none;--_ui5_value_state_message_padding:0.5rem;--_ui5_value_state_header_padding:.5625rem 1rem;--_ui5-multi_combobox_token_margin_top:3px;--_ui5-multi_combobox_token_margin_top:1px;--_ui5_slider_progress_container_background:var(--sapField_BorderColor);--_ui5_slider_progress_container_dot_display:none;--_ui5_slider_progress_container_dot_background:var(--sapField_BorderColor);--_ui5_slider_progress_border:none;--_ui5_slider_inner_height:0.25rem;--_ui5_slider_outer_height:1.6875rem;--_ui5_slider_progress_border_radius:0.25rem;--_ui5_slider_progress_background:var(--sapActiveColor);--_ui5_slider_handle_icon_display:none;--_ui5_slider_handle_height:1.625rem;--_ui5_slider_handle_width:1.625rem;--_ui5_slider_handle_border:solid 0.125rem var(--sapField_BorderColor);--_ui5_slider_handle_border_radius:1rem;--_ui5_slider_handle_box_shadow:none;--_ui5_slider_handle_box_shadow_focus:none;--_ui5_slider_handle_background:var(--sapButton_Background);--_ui5_range_slider_handle_background:#fff;--_ui5_slider_handle_top:-0.825rem;--_ui5_slider_handle_margin_left:-0.9725rem;--_ui5_slider_handle_hover_background:var(--sapButton_Hover_Background);--_ui5_slider_handle_hover_border:0.125rem solid var(--sapButton_Hover_BorderColor);--_ui5_slider_handle_outline:0.0625rem dotted var(--sapContent_FocusColor);--_ui5_slider_handle_focus_border:var(--_ui5_slider_handle_hover_border);--_ui5_slider_handle_active_border:var(--_ui5_slider_handle_hover_border);--_ui5_slider_handle_focused_top:var(--_ui5_slider_handle_top);--_ui5_slider_handle_focused_margin_left:var(--_ui5_slider_handle_margin_left);--_ui5_slider_handle_outline_offset:0.075rem;--_ui5_slider_icon_left:0.5rem;--_ui5_slider_icon_top:0.125rem;--_ui5_range_slider_handle_hover_background:rgba(var(--sapButton_Background),0.25);--_ui5_range_slider_handle_hover_icon_display:none;--_ui5_slider_progress_outline:0.0625rem dotted var(--sapContent_FocusColor);--_ui5_slider_progress_outline_offset:-0.8125rem;--_ui5_slider_tickmark_top:-0.375rem;--_ui5_slider_disabled_opacity:0.4;--_ui5_slider_tooltip_fontsize:var(--sapFontSmallSize);--_ui5_slider_tooltip_color:var(--sapContent_LabelColor);--_ui5_slider_tooltip_background:var(--sapField_Background);--_ui5_slider_tooltip_border_radius:var(--sapElement_BorderCornerRadius);--_ui5_slider_tooltip_border_color:var(--sapField_BorderColor);--_ui5_slider_tooltip_border:0.0625rem solid var(--_ui5_slider_tooltip_border_color);--_ui5_slider_tooltip_box_shadow:none;--_ui5_slider_tooltip_padding:0.4125rem;--_ui5_slider_tooltip_height:1rem;--_ui5_slider_tooltip_min_width:2rem;--_ui5_slider_tooltip_bottom:2rem;--_ui5_slider_label_fontsize:var(--sapFontSmallSize);--_ui5_slider_label_color:var(--sapContent_LabelColor);--_ui5_range_slider_progress_focus_display:none;--_ui5_range_slider_progress_focus_top:-1.063rem;--_ui5_range_slider_progress_focus_left:-1.438rem;--_ui5_range_slider_progress_focus_padding:0 1.375rem 0 1.438rem;--_ui5_range_slider_progress_focus_height:2rem;--_ui5_range_slider_legacy_progress_focus_display:block;--_ui5_slider_inner_min_width:4rem;--_ui5_suggestions_item_focus_border_radius:0;--_ui5_step_input_input_error_background_color:var(--sapField_InvalidBackground);--_ui5-step_input_button_state_hover_background_color:var(--sapField_Background);--_ui5_step_input_border_style:1px solid var(--sapField_BorderColor);--_ui5_step_input_border_style_hover:1px solid var(--sapField_Hover_BorderColor);--_ui5_step_input_button_background_color:var(--sapField_Background);--_ui5_step_input_input_border:1px solid transparent;--_ui5_step_input_input_margin_top:-0.0625rem;--_ui5_step_input_button_display:inline-block;--_ui5_step_input_button_left:0;--_ui5_step_input_button_right:0;--_ui5_step_input_input_border_focused_after:var(--_ui5_input_focus_border_width) dotted var(--sapContent_FocusColor);--_ui5_step_input_input_border_top_bottom_focused_after:0.0625rem;--_ui5_step_input_input_border_radius_focused_after:0;--_ui5_step_input_input_information_border_color_focused_after:var(--sapField_BorderColor);--_ui5_step_input_input_warning_border_color_focused_after:var(--sapField_BorderColor);--_ui5_step_input_input_success_border_color_focused_after:var(--sapField_BorderColor);--_ui5_step_input_input_error_border_color_focused_after:var(--sapField_BorderColor);--_ui5_step_input_disabled_button_background:var(--sapField_ReadOnly_Background);--_ui5_step_input_border_color_hover:var(--sapField_Hover_Background);--_ui5_step_input_border_hover:1px solid var(--sapField_Hover_BorderColor);--_ui5_input_input_background_color:var(--sapField_InvalidBackground)}',
        };
        exports.default = _;
      },
      {},
    ],
    zZs4: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          t = o(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          i = o(require("./sap_fiori_3/parameters-bundle.css.js"));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => t.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => i.default);
        var r = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/Title.css",
          content:
            ':host(:not([hidden])){display:block;cursor:text}:host{max-width:100%;color:var(--sapGroup_TitleTextColor);font-size:var(--ui5_title_level_2Size);font-family:"72override",var(--sapFontFamily);text-shadow:var(--sapContent_TextShadow)}.ui5-title-root{display:inline-block;position:relative;font-weight:400;font-size:inherit;box-sizing:border-box;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;vertical-align:bottom;-webkit-margin-before:0;-webkit-margin-after:0;-webkit-margin-start:0;-webkit-margin-end:0;margin:0;cursor:inherit}:host([wrapping-type=Normal]) .ui5-title-root{white-space:pre-line}:host([level=H1]){font-size:var(--ui5_title_level_1Size)}:host([level=H2]){font-size:var(--ui5_title_level_2Size)}:host([level=H3]){font-size:var(--ui5_title_level_3Size)}:host([level=H4]){font-size:var(--ui5_title_level_4Size)}:host([level=H5]){font-size:var(--ui5_title_level_5Size)}:host([level=H6]){font-size:var(--ui5_title_level_6Size)}',
        };
        exports.default = r;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    Figp: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = i(require("@ui5/webcomponents-base/dist/UI5Element.js")),
          t = i(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js")),
          r = i(require("./types/TitleLevel.js")),
          l = i(require("./types/WrappingType.js")),
          s = i(require("./generated/templates/TitleTemplate.lit.js")),
          a = i(require("./generated/themes/Title.css.js"));
        function i(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const u = {
          tag: "ui5-title",
          properties: {
            wrappingType: { type: l.default, defaultValue: l.default.None },
            level: { type: r.default, defaultValue: r.default.H2 },
          },
          slots: { default: { type: Node } },
        };
        class n extends e.default {
          static get metadata() {
            return u;
          }
          static get render() {
            return t.default;
          }
          static get template() {
            return s.default;
          }
          static get styles() {
            return a.default;
          }
          get normalizedLevel() {
            return this.level.toLowerCase();
          }
          get h1() {
            return "h1" === this.normalizedLevel;
          }
          get h2() {
            return "h2" === this.normalizedLevel;
          }
          get h3() {
            return "h3" === this.normalizedLevel;
          }
          get h4() {
            return "h4" === this.normalizedLevel;
          }
          get h5() {
            return "h5" === this.normalizedLevel;
          }
          get h6() {
            return "h6" === this.normalizedLevel;
          }
        }
        n.define();
        var d = n;
        exports.default = d;
      },
      {
        "@ui5/webcomponents-base/dist/UI5Element.js": "Kogr",
        "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG",
        "./types/TitleLevel.js": "nuHb",
        "./types/WrappingType.js": "kicx",
        "./generated/templates/TitleTemplate.lit.js": "AOX8",
        "./generated/themes/Title.css.js": "zZs4",
      },
    ],
    UuMk: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = { defaultDuration: 400, element: document.createElement("DIV"), identity: () => {} };
        exports.default = e;
      },
      {},
    ],
    njdC: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = new WeakMap();
        class t {
          static get tasks() {
            return e;
          }
          static enqueue(t, s) {
            e.has(t) || e.set(t, []), e.get(t).push(s);
          }
          static run(s, u) {
            return (
              e.has(s) || e.set(s, []),
              u().then(() => {
                const u = e.get(s);
                if (u.length > 0) return t.run(s, u.shift());
                e.delete(s);
              })
            );
          }
          static push(s, u) {
            e.get(s) ? t.enqueue(s, u) : t.run(s, u);
          }
        }
        var s = t;
        exports.default = s;
      },
      {},
    ],
    Yo1E: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = r(require("./AnimationQueue.js")),
          t = r(require("./config.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var n = ({
          beforeStart: r = t.default.identity,
          duration: n = t.default.defaultDuration,
          element: i = t.default.element,
          progress: a = t.default.identity,
        }) => {
          let o,
            u,
            s,
            l = null,
            d = !1;
          const f = new Promise((e, t) => {
            (s = (t) => {
              const r = t - (l = l || t);
              if (r <= n) {
                a(1 - (n - r) / n), (o = !d && requestAnimationFrame(s));
              } else a(1), e();
            }),
              (u = () => {
                (d = !0), cancelAnimationFrame(o), t(new Error("animation stopped"));
              });
          }).catch((e) => e);
          return (
            e.default.push(
              i,
              () => (
                r(),
                requestAnimationFrame(s),
                new Promise((e) => {
                  f.then(() => e());
                })
              )
            ),
            { promise: () => f, stop: () => u }
          );
        };
        exports.default = n;
      },
      { "./AnimationQueue.js": "njdC", "./config.js": "UuMk" },
    ],
    bDoo: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var t = o(require("./config.js")),
          e = o(require("./animate.js"));
        function o(t) {
          return t && t.__esModule ? t : { default: t };
        }
        var l = ({
          element: o = t.default.element,
          duration: l = t.default.defaultDuration,
          progress: a = t.default.identity,
        }) => {
          let s, r, i, d, p, n, y, g, m, u, f, h;
          const B = (0, e.default)({
            beforeStart: () => {
              (o.style.display = "block"),
                (s = getComputedStyle(o)),
                (r = parseFloat(s.paddingTop)),
                (i = parseFloat(s.paddingBottom)),
                (d = parseFloat(s.marginTop)),
                (p = parseFloat(s.marginBottom)),
                (n = parseFloat(s.height)),
                (y = o.style.overflow),
                (g = o.style.paddingTop),
                (m = o.style.paddingBottom),
                (u = o.style.marginTop),
                (f = o.style.marginBottom),
                (h = o.style.height),
                (o.style.overflow = "hidden"),
                (o.style.paddingTop = 0),
                (o.style.paddingBottom = 0),
                (o.style.marginTop = 0),
                (o.style.marginBottom = 0),
                (o.style.height = 0);
            },
            duration: l,
            element: o,
            progress(t) {
              a(t),
                (o.style.display = "block"),
                (o.style.paddingTop = 0 + r * t + "px"),
                (o.style.paddingBottom = 0 + i * t + "px"),
                (o.style.marginTop = 0 + d * t + "px"),
                (o.style.marginBottom = 0 + p * t + "px"),
                (o.style.height = 0 + n * t + "px");
            },
          });
          return (
            B.promise().then(() => {
              (o.style.overflow = y),
                (o.style.paddingTop = g),
                (o.style.paddingBottom = m),
                (o.style.marginTop = u),
                (o.style.marginBottom = f),
                (o.style.height = h);
            }),
            B
          );
        };
        exports.default = l;
      },
      { "./config.js": "UuMk", "./animate.js": "Yo1E" },
    ],
    iIHK: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = o(require("./config.js")),
          t = o(require("./animate.js"));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var a = ({
          element: o = e.default.element,
          duration: a = e.default.defaultDuration,
          progress: r = e.default.identity,
        }) => {
          let l, s, i, n, d, p, g, y, m, u, f, h;
          const x = (0, t.default)({
            beforeStart: () => {
              (l = getComputedStyle(o)),
                (s = parseFloat(l.paddingTop)),
                (i = parseFloat(l.paddingBottom)),
                (n = parseFloat(l.marginTop)),
                (d = parseFloat(l.marginBottom)),
                (p = parseFloat(l.height)),
                (g = o.style.overflow),
                (y = o.style.paddingTop),
                (m = o.style.paddingBottom),
                (u = o.style.marginTop),
                (f = o.style.marginBottom),
                (h = o.style.height),
                (o.style.overflow = "hidden");
            },
            duration: a,
            element: o,
            progress(e) {
              r(e),
                (o.style.paddingTop = `${s - s * e}px`),
                (o.style.paddingBottom = `${i - i * e}px`),
                (o.style.marginTop = `${n - n * e}px`),
                (o.style.marginBottom = `${d - d * e}px`),
                (o.style.height = `${p - p * e}px`);
            },
          });
          return (
            x.promise().then((e) => {
              e instanceof Error ||
                ((o.style.overflow = g),
                (o.style.paddingTop = y),
                (o.style.paddingBottom = m),
                (o.style.marginTop = u),
                (o.style.marginBottom = f),
                (o.style.height = h),
                (o.style.display = "none"));
            }),
            x
          );
        };
        exports.default = a;
      },
      { "./config.js": "UuMk", "./animate.js": "Yo1E" },
    ],
    glQL: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.isUpShiftCtrl = exports.isUpShift = exports.isUpCtrl = exports.isUp = exports.isTabPrevious = exports.isTabNext = exports.isSpaceShift = exports.isSpace = exports.isShow = exports.isRightShift = exports.isRightCtrl = exports.isRight = exports.isPlus = exports.isPageUpShiftCtrl = exports.isPageUpShift = exports.isPageUpAlt = exports.isPageUp = exports.isPageDownShiftCtrl = exports.isPageDownShift = exports.isPageDownAlt = exports.isPageDown = exports.isMinus = exports.isLeftShift = exports.isLeftCtrl = exports.isLeft = exports.isHomeCtrl = exports.isHome = exports.isF7 = exports.isF4Shift = exports.isF4 = exports.isEscape = exports.isEnterShift = exports.isEnter = exports.isEndCtrl = exports.isEnd = exports.isDownShiftCtrl = exports.isDownShift = exports.isDownCtrl = exports.isDown = exports.isDelete = exports.isBackSpace = void 0);
        const e = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CONTROL: 17,
            ALT: 18,
            BREAK: 19,
            CAPS_LOCK: 20,
            ESCAPE: 27,
            SPACE: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            ARROW_LEFT: 37,
            ARROW_UP: 38,
            ARROW_RIGHT: 39,
            ARROW_DOWN: 40,
            PRINT: 44,
            INSERT: 45,
            DELETE: 46,
            DIGIT_0: 48,
            DIGIT_1: 49,
            DIGIT_2: 50,
            DIGIT_3: 51,
            DIGIT_4: 52,
            DIGIT_5: 53,
            DIGIT_6: 54,
            DIGIT_7: 55,
            DIGIT_8: 56,
            DIGIT_9: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            WINDOWS: 91,
            CONTEXT_MENU: 93,
            TURN_OFF: 94,
            SLEEP: 95,
            NUMPAD_0: 96,
            NUMPAD_1: 97,
            NUMPAD_2: 98,
            NUMPAD_3: 99,
            NUMPAD_4: 100,
            NUMPAD_5: 101,
            NUMPAD_6: 102,
            NUMPAD_7: 103,
            NUMPAD_8: 104,
            NUMPAD_9: 105,
            NUMPAD_ASTERISK: 106,
            NUMPAD_PLUS: 107,
            NUMPAD_MINUS: 109,
            NUMPAD_COMMA: 110,
            NUMPAD_SLASH: 111,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            NUM_LOCK: 144,
            SCROLL_LOCK: 145,
            OPEN_BRACKET: 186,
            PLUS: 187,
            COMMA: 188,
            SLASH: 189,
            DOT: 190,
            PIPE: 191,
            SEMICOLON: 192,
            MINUS: 219,
            GREAT_ACCENT: 220,
            EQUALS: 221,
            SINGLE_QUOTE: 222,
            BACKSLASH: 226,
          },
          o = (o) => (o.key ? "Enter" === o.key : o.keyCode === e.ENTER) && !v(o);
        exports.isEnter = o;
        const s = (o) => (o.key ? "Enter" === o.key : o.keyCode === e.ENTER) && X(o, !1, !1, !0);
        exports.isEnterShift = s;
        const t = (o) => (o.key ? "Spacebar" === o.key || " " === o.key : o.keyCode === e.SPACE) && !v(o);
        exports.isSpace = t;
        const y = (o) => (o.key ? "Spacebar" === o.key || " " === o.key : o.keyCode === e.SPACE) && X(o, !1, !1, !0);
        exports.isSpaceShift = y;
        const r = (o) => (o.key ? "ArrowLeft" === o.key || "Left" === o.key : o.keyCode === e.ARROW_LEFT) && !v(o);
        exports.isLeft = r;
        const k = (o) => (o.key ? "ArrowRight" === o.key || "Right" === o.key : o.keyCode === e.ARROW_RIGHT) && !v(o);
        exports.isRight = k;
        const i = (o) => (o.key ? "ArrowUp" === o.key || "Up" === o.key : o.keyCode === e.ARROW_UP) && !v(o);
        exports.isUp = i;
        const p = (o) => (o.key ? "ArrowDown" === o.key || "Down" === o.key : o.keyCode === e.ARROW_DOWN) && !v(o);
        exports.isDown = p;
        const A = (o) =>
          (o.key ? "ArrowLeft" === o.key || "Left" === o.key : o.keyCode === e.ARROW_LEFT) && X(o, !0, !1, !1);
        exports.isLeftCtrl = A;
        const n = (o) =>
          (o.key ? "ArrowRight" === o.key || "Right" === o.key : o.keyCode === e.ARROW_RIGHT) && X(o, !0, !1, !1);
        exports.isRightCtrl = n;
        const C = (o) => (o.key ? "ArrowUp" === o.key || "Up" === o.key : o.keyCode === e.ARROW_UP) && X(o, !0, !1, !1);
        exports.isUpCtrl = C;
        const x = (o) =>
          (o.key ? "ArrowDown" === o.key || "Down" === o.key : o.keyCode === e.ARROW_DOWN) && X(o, !0, !1, !1);
        exports.isDownCtrl = x;
        const P = (o) => (o.key ? "ArrowUp" === o.key || "Up" === o.key : o.keyCode === e.ARROW_UP) && X(o, !1, !1, !0);
        exports.isUpShift = P;
        const D = (o) =>
          (o.key ? "ArrowDown" === o.key || "Down" === o.key : o.keyCode === e.ARROW_DOWN) && X(o, !1, !1, !0);
        exports.isDownShift = D;
        const E = (o) =>
          (o.key ? "ArrowLeft" === o.key || "Left" === o.key : o.keyCode === e.ARROW_LEFT) && X(o, !1, !1, !0);
        exports.isLeftShift = E;
        const U = (o) =>
          (o.key ? "ArrowRight" === o.key || "Right" === o.key : o.keyCode === e.ARROW_RIGHT) && X(o, !1, !1, !0);
        exports.isRightShift = U;
        const S = (o) => (o.key ? "ArrowUp" === o.key || "Up" === o.key : o.keyCode === e.ARROW_UP) && X(o, !0, !1, !0);
        exports.isUpShiftCtrl = S;
        const R = (o) =>
          (o.key ? "ArrowDown" === o.key || "Down" === o.key : o.keyCode === e.ARROW_DOWN) && X(o, !0, !1, !0);
        exports.isDownShiftCtrl = R;
        const _ = (o) => (o.key ? "Home" === o.key : o.keyCode === e.HOME) && !v(o);
        exports.isHome = _;
        const c = (o) => (o.key ? "End" === o.key : o.keyCode === e.END) && !v(o);
        exports.isEnd = c;
        const N = (o) => (o.key ? "Home" === o.key : o.keyCode === e.HOME) && X(o, !0, !1, !1);
        exports.isHomeCtrl = N;
        const d = (o) => (o.key ? "End" === o.key : o.keyCode === e.END) && X(o, !0, !1, !1);
        exports.isEndCtrl = d;
        const a = (o) => (o.key ? "Escape" === o.key || "Esc" === o.key : o.keyCode === e.ESCAPE) && !v(o);
        exports.isEscape = a;
        const O = (o) => (o.key ? "Tab" === o.key : o.keyCode === e.TAB) && !v(o);
        exports.isTabNext = O;
        const w = (o) => (o.key ? "Tab" === o.key : o.keyCode === e.TAB) && X(o, !1, !1, !0);
        exports.isTabPrevious = w;
        const T = (o) => (o.key ? "Backspace" === o.key : o.keyCode === e.BACKSPACE) && !v(o);
        exports.isBackSpace = T;
        const h = (o) => (o.key ? "Delete" === o.key : o.keyCode === e.DELETE) && !v(o);
        exports.isDelete = h;
        const f = (o) => (o.key ? "PageUp" === o.key : o.keyCode === e.PAGE_UP) && !v(o);
        exports.isPageUp = f;
        const I = (o) => (o.key ? "PageDown" === o.key : o.keyCode === e.PAGE_DOWN) && !v(o);
        exports.isPageDown = I;
        const L = (o) => (o.key ? "PageUp" === o.key : o.keyCode === e.PAGE_UP) && X(o, !1, !1, !0);
        exports.isPageUpShift = L;
        const g = (o) => (o.key ? "PageUp" === o.key : o.keyCode === e.PAGE_UP) && X(o, !1, !0, !1);
        exports.isPageUpAlt = g;
        const M = (o) => (o.key ? "PageDown" === o.key : o.keyCode === e.PAGE_DOWN) && X(o, !1, !1, !0);
        exports.isPageDownShift = M;
        const l = (o) => (o.key ? "PageDown" === o.key : o.keyCode === e.PAGE_DOWN) && X(o, !1, !0, !1);
        exports.isPageDownAlt = l;
        const W = (o) => (o.key ? "PageUp" === o.key : o.keyCode === e.PAGE_UP) && X(o, !0, !1, !0);
        exports.isPageUpShiftCtrl = W;
        const F = (o) => (o.key ? "PageDown" === o.key : o.keyCode === e.PAGE_DOWN) && X(o, !0, !1, !0);
        exports.isPageDownShiftCtrl = F;
        const G = (o) => (o.key ? "+" === o.key : o.keyCode === e.PLUS) || (o.keyCode === e.NUMPAD_PLUS && !v(o));
        exports.isPlus = G;
        const H = (o) => (o.key ? "-" === o.key : o.keyCode === e.MINUS) || (o.keyCode === e.NUMPAD_MINUS && !v(o));
        exports.isMinus = H;
        const K = (o) =>
          o.key ? B(o) || m(o) : (o.keyCode === e.F4 && !v(o)) || (o.keyCode === e.ARROW_DOWN && X(o, !1, !0, !1));
        exports.isShow = K;
        const B = (e) => "F4" === e.key && !v(e);
        exports.isF4 = B;
        const b = (o) => (o.key ? "F4" === o.key : o.keyCode === e.F4) && X(o, !1, !1, !0);
        exports.isF4Shift = b;
        const u = (o) => (o.key ? "F7" === o.key : o.keyCode === e.F7) && !v(o);
        exports.isF7 = u;
        const m = (e) =>
            ("ArrowDown" === e.key || "Down" === e.key || "ArrowUp" === e.key || "Up" === e.key) && X(e, !1, !0, !1),
          v = (e) => e.shiftKey || e.altKey || Q(e),
          Q = (e) => !(!e.metaKey && !e.ctrlKey),
          X = (e, o, s, t) => e.shiftKey === t && e.altKey === s && Q(e) === o;
      },
      {},
    ],
    xc5H: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = { Full: "full", Basic: "basic", Minimal: "minimal", None: "none" };
        var l = e;
        exports.default = l;
      },
      {},
    ],
    B6P1: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.setAnimationMode = exports.getAnimationMode = void 0);
        var e = require("../InitialConfiguration.js"),
          t = o(require("../types/AnimationMode.js"));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        let i;
        const n = () => (void 0 === i && (i = (0, e.getAnimationMode)()), i);
        exports.getAnimationMode = n;
        const s = (e) => {
          Object.values(t.default).includes(e) && (i = e);
        };
        exports.setAnimationMode = s;
      },
      { "../InitialConfiguration.js": "fa6t", "../types/AnimationMode.js": "xc5H" },
    ],
    i4Js: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const s = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
        class t {
          constructor(t) {
            const e = s.exec(t.replace(/_/g, "-"));
            if (null === e) throw new Error(`The given language ${t} does not adhere to BCP-47.`);
            (this.sLocaleId = t),
              (this.sLanguage = e[1] || null),
              (this.sScript = e[2] || null),
              (this.sRegion = e[3] || null),
              (this.sVariant = (e[4] && e[4].slice(1)) || null),
              (this.sExtension = (e[5] && e[5].slice(1)) || null),
              (this.sPrivateUse = e[6] || null),
              this.sLanguage && (this.sLanguage = this.sLanguage.toLowerCase()),
              this.sScript && (this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, (s) => s.toUpperCase())),
              this.sRegion && (this.sRegion = this.sRegion.toUpperCase());
          }
          getLanguage() {
            return this.sLanguage;
          }
          getScript() {
            return this.sScript;
          }
          getRegion() {
            return this.sRegion;
          }
          getVariant() {
            return this.sVariant;
          }
          getVariantSubtags() {
            return this.sVariant ? this.sVariant.split("-") : [];
          }
          getExtension() {
            return this.sExtension;
          }
          getExtensionSubtags() {
            return this.sExtension ? this.sExtension.slice(2).split("-") : [];
          }
          getPrivateUse() {
            return this.sPrivateUse;
          }
          getPrivateUseSubtags() {
            return this.sPrivateUse ? this.sPrivateUse.slice(2).split("-") : [];
          }
          hasPrivateUseSubtag(s) {
            return this.getPrivateUseSubtags().indexOf(s) >= 0;
          }
          toString() {
            const s = [this.sLanguage];
            return (
              this.sScript && s.push(this.sScript),
              this.sRegion && s.push(this.sRegion),
              this.sVariant && s.push(this.sVariant),
              this.sExtension && s.push(this.sExtension),
              this.sPrivateUse && s.push(this.sPrivateUse),
              s.join("-")
            );
          }
        }
        var e = t;
        exports.default = e;
      },
      {},
    ],
    UHbV: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = r(require("../util/detectNavigatorLanguage.js")),
          t = require("../config/Language.js"),
          a = r(require("./Locale.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const u = new Map(),
          g = (e) => (u.has(e) || u.set(e, new a.default(e)), u.get(e)),
          n = (e) => {
            try {
              if (e && "string" == typeof e) return g(e);
            } catch (t) {}
          },
          s = (a) => (a ? n(a) : (0, t.getLanguage)() ? g((0, t.getLanguage)()) : n((0, e.default)()));
        var o = s;
        exports.default = o;
      },
      { "../util/detectNavigatorLanguage.js": "LP58", "../config/Language.js": "Ilua", "./Locale.js": "i4Js" },
    ],
    sKkz: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("../generated/AssetParameters.js");
        const r = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i,
          t = /(?:^|-)(saptrc|sappsd)(?:-|$)/i,
          s = { he: "iw", yi: "ji", id: "in", sr: "sh" },
          o = (o) => {
            let a;
            if (!o) return e.DEFAULT_LOCALE;
            if ("string" == typeof o && (a = r.exec(o.replace(/_/g, "-")))) {
              let e = a[1].toLowerCase(),
                r = a[3] ? a[3].toUpperCase() : void 0;
              const o = a[2] ? a[2].toLowerCase() : void 0,
                i = a[4] ? a[4].slice(1) : void 0,
                A = a[6];
              return (
                (e = s[e] || e),
                (A && (a = t.exec(A))) || (i && (a = t.exec(i)))
                  ? `en_US_${a[1].toLowerCase()}`
                  : ("zh" !== e || r || ("hans" === o ? (r = "CN") : "hant" === o && (r = "TW")),
                    e + (r ? "_" + r + (i ? "_" + i.replace("-", "_") : "") : ""))
              );
            }
          };
        var a = o;
        exports.default = a;
      },
      { "../generated/AssetParameters.js": "U6MM" },
    ],
    HHmh: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("../generated/AssetParameters.js");
        const r = (r) => {
          if (!r) return e.DEFAULT_LOCALE;
          if ("zh_HK" === r) return "zh_TW";
          const t = r.lastIndexOf("_");
          return t >= 0 ? r.slice(0, t) : r !== e.DEFAULT_LOCALE ? e.DEFAULT_LOCALE : "";
        };
        var t = r;
        exports.default = t;
      },
      { "../generated/AssetParameters.js": "U6MM" },
    ],
    GpBY: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.registerI18nLoader = exports.registerI18nBundle = exports.getI18nBundleData = exports.fetchI18nBundle = void 0);
        var e = o(require("../locale/getLocale.js")),
          t = require("../locale/languageChange.js"),
          s = o(require("../locale/normalizeLocale.js")),
          n = o(require("../locale/nextFallbackLocale.js")),
          r = require("../generated/AssetParameters.js"),
          a = require("../config/Language.js");
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const l = new Set(),
          u = new Set(),
          i = new Map(),
          c = new Map(),
          d = new Map(),
          g = (e, t, s) => {
            const n = `${e}/${t}`;
            d.set(n, s);
          };
        exports.registerI18nLoader = g;
        const p = (e, t) => {
            i.set(e, t);
          },
          f = (e) => i.get(e);
        exports.getI18nBundleData = f;
        const m = (e, t) => {
          throw new Error("This method has been removed. Use `registerI18nLoader` instead.");
        };
        exports.registerI18nBundle = m;
        const h = (e, t) => {
            const s = `${e}/${t}`;
            return d.has(s);
          },
          L = (e, t) => {
            const s = `${e}/${t}`,
              n = d.get(s);
            return c.get(s) || c.set(s, n(t)), c.get(s);
          },
          x = (e) => {
            l.has(e) ||
              (console.warn(
                `[${e}]: Message bundle assets are not configured. Falling back to English texts.`,
                ` Add \`import "${e}/dist/Assets.js"\` in your bundle and make sure your build tool supports dynamic imports and JSON imports. See section "Assets" in the documentation for more information.`
              ),
              l.add(e));
          },
          A = async (t) => {
            const o = (0, e.default)().getLanguage(),
              l = (0, e.default)().getRegion();
            let i = (0, s.default)(o + (l ? `-${l}` : ""));
            for (; i !== r.DEFAULT_LANGUAGE && !h(t, i); ) i = (0, n.default)(i);
            const c = (0, a.getFetchDefaultLanguage)();
            if (i !== r.DEFAULT_LANGUAGE || c)
              if (h(t, i))
                try {
                  const e = await L(t, i);
                  p(t, e);
                } catch (d) {
                  u.has(d.message) || (u.add(d.message), console.error(d.message));
                }
              else x(t);
            else p(t, null);
          };
        (exports.fetchI18nBundle = A),
          (0, t.attachLanguageChange)(() => {
            const e = [...i.keys()];
            return Promise.all(e.map(A));
          });
      },
      {
        "../locale/getLocale.js": "UHbV",
        "../locale/languageChange.js": "O6Sq",
        "../locale/normalizeLocale.js": "sKkz",
        "../locale/nextFallbackLocale.js": "HHmh",
        "../generated/AssetParameters.js": "U6MM",
        "../config/Language.js": "Ilua",
      },
    ],
    gsgT: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const r = /('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g,
          e = (e, t) => (
            (t = t || []),
            e.replace(r, (r, e, n, o, s) => {
              if (e) return "'";
              if (n) return n.replace(/''/g, "'");
              if (o) return String(t[parseInt(o)]);
              throw new Error(`[i18n]: pattern syntax error at pos ${s}`);
            })
          );
        var t = e;
        exports.default = t;
      },
      {},
    ],
    F4Ye: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.registerCustomI18nBundleGetter = exports.getI18nBundle = void 0),
          Object.defineProperty(exports, "registerI18nLoader", {
            enumerable: !0,
            get: function () {
              return e.registerI18nLoader;
            },
          });
        var e = require("./asset-registries/i18n.js"),
          t = r(require("./util/formatMessage.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const n = new Map();
        let s;
        class u {
          constructor(e) {
            this.packageName = e;
          }
          getText(r, ...n) {
            if (("string" == typeof r && (r = { key: r, defaultText: r }), !r || !r.key)) return "";
            const s = (0, e.getI18nBundleData)(this.packageName);
            s && !s[r.key] && console.warn(`Key ${r.key} not found in the i18n bundle, the default text will be used`);
            const u = s && s[r.key] ? s[r.key] : r.defaultText || r.key;
            return (0, t.default)(u, n);
          }
        }
        const o = (e) => {
            if (n.has(e)) return n.get(e);
            const t = new u(e);
            return n.set(e, t), t;
          },
          a = (e) => {
            s = e;
          };
        exports.registerCustomI18nBundleGetter = a;
        const i = async (t) => (s ? s(t) : (await (0, e.fetchI18nBundle)(t), o(t)));
        exports.getI18nBundle = i;
      },
      { "./asset-registries/i18n.js": "GpBY", "./util/formatMessage.js": "gsgT" },
    ],
    ODfo: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = { "SAP-icons-TNT": "tnt", BusinessSuiteInAppSymbols: "business-suite", horizon: "SAP-icons-v5" };
        var s = e;
        exports.default = s;
      },
      {},
    ],
    tYyB: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.registerIconLoader = exports.registerIconBundle = exports.registerIcon = exports.getIconDataSync = exports.getIconData = exports._getRegisteredNames = void 0);
        var e = a(require("../getSharedResource.js")),
          t = a(require("../assets-meta/IconCollectionsAlias.js")),
          r = require("../config/Theme.js");
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const o = new Map(),
          s = (0, e.default)("SVGIcons.registry", new Map()),
          c = (0, e.default)("SVGIcons.promises", new Map()),
          n = "ICON_NOT_FOUND",
          i = async (e, t) => {
            throw new Error("This method has been removed. Use `registerIconLoader` instead.");
          };
        exports.registerIconBundle = i;
        const l = async (e, t) => {
          o.set(e, t);
        };
        exports.registerIconLoader = l;
        const p = async (e) => {
            if (!c.has(e)) {
              if (!o.has(e))
                throw new Error(
                  `No loader registered for the ${e} icons collection. Probably you forgot to import the "AllIcons.js" module for the respective package.`
                );
              const t = o.get(e);
              c.set(e, t(e));
            }
            return c.get(e);
          },
          g = (e) => {
            Object.keys(e.data).forEach((t) => {
              const r = e.data[t];
              d(t, {
                pathData: r.path,
                ltr: r.ltr,
                accData: r.acc,
                collection: e.collection,
                packageName: e.packageName,
              });
            });
          },
          d = (e, { pathData: t, ltr: r, accData: a, collection: o, packageName: c } = {}) => {
            o || (o = I());
            const n = `${o}/${e}`;
            s.set(n, { pathData: t, ltr: r, accData: a, packageName: c });
          };
        exports.registerIcon = d;
        const u = (e) => {
            let t;
            return (
              e.startsWith("sap-icon://") && (e = e.replace("sap-icon://", "")),
              ([e, t] = e.split("/").reverse()),
              (t = t || I()),
              (t = f(t)),
              { name: (e = e.replace("icon-", "")), collection: t, registryKey: `${t}/${e}` }
            );
          },
          h = (e) => {
            const { registryKey: t } = u(e);
            return s.get(t);
          };
        exports.getIconDataSync = h;
        const y = async (e) => {
          const { collection: t, registryKey: r } = u(e);
          let a = n;
          try {
            a = await p(t);
          } catch (o) {
            console.error(o.message);
          }
          return a === n ? a : (s.has(r) || g(a), s.get(r));
        };
        exports.getIconData = y;
        const m = async () => (
          await y("edit"), await y("tnt/arrow"), await y("business-suite/3d"), Array.from(s.keys())
        );
        exports._getRegisteredNames = m;
        const I = () => ((0, r.isTheme)("sap_horizon") ? "SAP-icons-v5" : "SAP-icons"),
          f = (e) => (t.default[e] ? t.default[e] : e);
      },
      {
        "../getSharedResource.js": "bZie",
        "../assets-meta/IconCollectionsAlias.js": "ODfo",
        "../config/Theme.js": "b5d6",
      },
    ],
    To2I: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const s = "slim-arrow-right",
          t =
            "M275.5 256l-103-102c-6-7-9-14-9-22s3-16 9-22c7-6 14-9 22-9s16 3 22 9l124 124c6 6 9 14 9 22s-3 15-9 22l-124 124c-6 6-14 9-22 9s-15-3-22-9c-6-7-9-14-9-22s3-16 9-22z",
          o = !1,
          r = "SAP-icons-v5",
          a = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(s, { pathData: t, ltr: !1, collection: r, packageName: a });
        var c = { pathData: t };
        exports.default = c;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    DLPE: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const t = "slim-arrow-right",
          s =
            "M357.5 233q10 10 10 23t-10 23l-165 165q-12 11-23 0t0-23l160-159q6-6 0-12l-159-159q-5-5-5-11t5-11 11-5 11 5z",
          o = !1,
          r = "SAP-icons",
          a = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(t, { pathData: s, ltr: !1, collection: r, packageName: a });
        var i = { pathData: s };
        exports.default = i;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    TK0l: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/config/Theme.js"),
          r = s(require("./v5/slim-arrow-right.js")),
          t = s(require("./v4/slim-arrow-right.js"));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const i = (0, e.isTheme)("sap_horizon") ? t.default : r.default;
        var o = { pathData: i };
        exports.default = o;
      },
      {
        "@ui5/webcomponents-base/dist/config/Theme.js": "b5d6",
        "./v5/slim-arrow-right.js": "To2I",
        "./v4/slim-arrow-right.js": "DLPE",
      },
    ],
    Oq9i: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.supportsTouch = exports.isTablet = exports.isSafari = exports.isPhone = exports.isIE = exports.isDesktop = exports.isCombi = exports.isChrome = void 0);
        const t = navigator.userAgent,
          e = "ontouchstart" in window || navigator.maxTouchPoints > 0,
          i = /(msie|trident)/i.test(t),
          o = !i && /(Chrome|CriOS)/.test(t),
          s = !i && !o && /(Version|PhantomJS)\/(\d+\.\d+).*Safari/.test(t),
          r = !i && /webkit/.test(t),
          n = -1 !== navigator.platform.indexOf("Win"),
          a = !n && /Android/.test(t),
          d = a && /(?=android)(?=.*mobile)/i.test(t),
          p = /ipad/i.test(t);
        let c, x, u;
        const f = () => {
            if (!n) return !1;
            if (void 0 === c) {
              const e = t.match(/Windows NT (\d+).(\d)/);
              c = e ? parseFloat(e[1]) : 0;
            }
            return c >= 8;
          },
          h = () => {
            if (!r) return !1;
            if (void 0 === x) {
              const e = t.match(/(webkit)[ /]([\w.]+)/);
              x = e ? parseFloat(e[1]) : 0;
            }
            return x >= 537.1;
          },
          w = () => {
            if (void 0 === u)
              if (p) u = !0;
              else {
                if (e) {
                  if (f()) return void (u = !0);
                  if (o && a) return void (u = !/Mobile Safari\/[.0-9]+/.test(t));
                  let e = window.devicePixelRatio ? window.devicePixelRatio : 1;
                  return (
                    a && h() && (e = 1), void (u = Math.min(window.screen.width / e, window.screen.height / e) >= 600)
                  );
                }
                u = (i && -1 !== t.indexOf("Touch")) || (a && !d);
              }
          },
          l = () => e;
        exports.supportsTouch = l;
        const m = () => i;
        exports.isIE = m;
        const v = () => s;
        exports.isSafari = v;
        const b = () => o;
        exports.isChrome = b;
        const P = () => (w(), (e || f()) && u);
        exports.isTablet = P;
        const T = () => (w(), e && !u);
        exports.isPhone = T;
        const C = () => (!P() && !T()) || f();
        exports.isDesktop = C;
        const S = () => P() && C();
        exports.isCombi = S;
      },
      {},
    ],
    fAPD: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = {
          Default: "Default",
          Positive: "Positive",
          Negative: "Negative",
          Transparent: "Transparent",
          Emphasized: "Emphasized",
          Attention: "Attention",
        };
        class a extends e.default {
          static isValid(e) {
            return !!s[e];
          }
        }
        a.generateTypeAccessors(s);
        var i = a;
        exports.default = i;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    BwkU: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const o = (o, n, a) =>
            e.html`<button type="button" class="ui5-button-root" ?disabled="${
              o.disabled
            }" data-sap-focus-ref  dir="${(0, e.ifDefined)(o.effectiveDir)}" @focusout=${o._onfocusout} @focusin=${
              o._onfocusin
            } @click=${o._onclick} @mousedown=${o._onmousedown} @mouseup=${o._onmouseup} @keydown=${
              o._onkeydown
            } @keyup=${o._onkeyup} @touchstart="${o._ontouchstart}" @touchend="${o._ontouchend}" tabindex=${(0,
            e.ifDefined)(o.tabIndexValue)} aria-expanded="${(0, e.ifDefined)(
              o.accInfo.ariaExpanded
            )}" aria-controls="${(0, e.ifDefined)(o.accInfo.ariaControls)}" aria-haspopup="${(0, e.ifDefined)(
              o.accInfo.ariaHaspopup
            )}" aria-label="${(0, e.ifDefined)(o.accessibleName)}" title="${(0, e.ifDefined)(
              o.accInfo.title
            )}" part="button">${o.icon ? t(o, n, a) : void 0}<span id="${(0, e.ifDefined)(
              o._id
            )}-content" class="ui5-button-text"><bdi><slot></slot></bdi></span>${
              o.hasButtonType ? i(o, n, a) : void 0
            }</button> `,
          t = (o, t, i) =>
            e.html`<${(0, e.scopeTag)("ui5-icon", t, i)} class="ui5-button-icon" name="${(0, e.ifDefined)(
              o.icon
            )}" part="icon" ?show-tooltip=${o.showIconTooltip}></${(0, e.scopeTag)("ui5-icon", t, i)}>`,
          i = (o, t, i) => e.html`<span class="ui5-hidden-text">${(0, e.ifDefined)(o.buttonTypeText)}</span>`;
        var n = o;
        exports.default = n;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    dMR7: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const i = (i, t, s) =>
            e.html`<svg class="ui5-icon-root" tabindex="${(0, e.ifDefined)(i.tabIndex)}" dir="${(0, e.ifDefined)(
              i._dir
            )}" viewBox="0 0 512 512" role="${(0, e.ifDefined)(
              i.effectiveAccessibleRole
            )}" focusable="false" preserveAspectRatio="xMidYMid meet" aria-label="${(0, e.ifDefined)(
              i.effectiveAccessibleName
            )}" aria-hidden=${(0, e.ifDefined)(i.effectiveAriaHidden)} xmlns="http://www.w3.org/2000/svg" @focusin=${
              i._onfocusin
            } @focusout=${i._onfocusout} @keydown=${i._onkeydown} @keyup=${i._onkeyup} @click=${i._onclick}>${o(
              i,
              t,
              s
            )}</svg>`,
          t = (i, t, o) =>
            e.svg`<title id="${(0, e.ifDefined)(i._id)}-tooltip">${(0, e.ifDefined)(
              i.effectiveAccessibleName
            )}</title>`,
          o = (i, o, s) =>
            e.svg`${i.hasIconTooltip ? t(i) : void 0}<g role="presentation"><path d="${(0, e.ifDefined)(
              i.pathData
            )}"/></g>`;
        var s = i;
        exports.default = s;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    kJHZ: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          o = i(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          t = i(require("./sap_fiori_3/parameters-bundle.css.js"));
        function i(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => o.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => t.default);
        var r = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/Icon.css",
          content:
            ":host{-webkit-tap-highlight-color:rgba(0,0,0,0)}:host([hidden]){display:none}:host([invalid]){display:none}:host(:not([hidden]).ui5_hovered){opacity:.7}:host{display:inline-block;width:1rem;height:1rem;color:var(--sapContent_NonInteractiveIconColor);fill:currentColor;outline:none}:host([interactive][focused]) .ui5-icon-root{outline:1px dotted var(--sapContent_FocusColor)}.ui5-icon-root{display:flex;outline:none;vertical-align:top}:host(:not([dir=ltr])) .ui5-icon-root[dir=rtl]{transform:scaleX(-1);transform-origin:center}",
        };
        exports.default = r;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    RJcw: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = l(require("@ui5/webcomponents-base/dist/UI5Element.js")),
          t = l(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js")),
          i = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js"),
          s = l(require("@ui5/webcomponents-base/dist/util/createStyleInHead.js")),
          a = require("@ui5/webcomponents-base/dist/i18nBundle.js"),
          n = require("@ui5/webcomponents-base/dist/Keys.js"),
          r = l(require("@ui5/webcomponents-base/dist/isLegacyBrowser.js")),
          o = l(require("./generated/templates/IconTemplate.lit.js")),
          c = l(require("./generated/themes/Icon.css.js"));
        function l(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const u = "ICON_NOT_FOUND",
          d = "presentation",
          h = {
            tag: "ui5-icon",
            languageAware: !0,
            themeAware: !0,
            properties: {
              interactive: { type: Boolean },
              name: { type: String },
              accessibleName: { type: String },
              showTooltip: { type: Boolean },
              role: { type: String },
              ariaHidden: { type: String },
              pathData: { type: String, noAttribute: !0 },
              accData: { type: Object, noAttribute: !0 },
              focused: { type: Boolean },
              invalid: { type: Boolean },
              effectiveAccessibleName: { type: String, defaultValue: void 0, noAttribute: !0 },
            },
            events: { click: {} },
          };
        class p extends e.default {
          static get metadata() {
            return h;
          }
          static get render() {
            return t.default;
          }
          static get template() {
            return o.default;
          }
          static get styles() {
            return c.default;
          }
          static async onDefine() {
            this.createGlobalStyle();
          }
          _onfocusin(e) {
            this.interactive && (this.focused = !0);
          }
          _onfocusout(e) {
            this.focused = !1;
          }
          _onkeydown(e) {
            this.interactive && ((0, n.isEnter)(e) && this.fireEvent("click"), (0, n.isSpace)(e) && e.preventDefault());
          }
          _onkeyup(e) {
            this.interactive && (0, n.isSpace)(e) && this.fireEvent("click");
          }
          _onClickHandler(e) {
            e.stopPropagation(), this.fireEvent("click");
          }
          get _dir() {
            if (this.effectiveDir) return this.ltr ? "ltr" : this.effectiveDir;
          }
          get effectiveAriaHidden() {
            return "" === this.ariaHidden ? !!this.isDecorative || void 0 : this.ariaHidden;
          }
          get tabIndex() {
            return this.interactive ? "0" : "-1";
          }
          get isDecorative() {
            return this.effectiveAccessibleRole === d;
          }
          get effectiveAccessibleRole() {
            return this.role ? this.role : this.interactive ? "button" : this.effectiveAccessibleName ? "img" : d;
          }
          static createGlobalStyle() {
            if ((0, r.default)()) {
              document.head.querySelector("style[data-ui5-icon-global]") ||
                (0, s.default)("ui5-icon { display: none !important; }", { "data-ui5-icon-global": "" });
            }
          }
          static removeGlobalStyle() {
            if ((0, r.default)()) {
              const e = document.head.querySelector("style[data-ui5-icon-global]");
              e && document.head.removeChild(e);
            }
          }
          async onBeforeRendering() {
            const e = this.name;
            if (!e) return console.warn("Icon name property is required", this);
            let t = (0, i.getIconDataSync)(e);
            if ((t || (t = await (0, i.getIconData)(e)), t === u))
              return (
                (this.invalid = !0),
                console.warn(
                  `Required icon is not registered. You can either import the icon as a module in order to use it e.g. "@ui5/webcomponents-icons/dist/${e.replace(
                    "sap-icon://",
                    ""
                  )}.js", or setup a JSON build step and import "@ui5/webcomponents-icons/dist/AllIcons.js".`
                )
              );
            if (!t)
              return (
                (this.invalid = !0), console.warn(`Required icon is not registered. Invalid icon name: ${this.name}`)
              );
            if (
              ((this.invalid = !1),
              (this.pathData = t.pathData),
              (this.accData = t.accData),
              (this.ltr = t.ltr),
              (this.packageName = t.packageName),
              (this._onclick = this.interactive ? this._onClickHandler.bind(this) : void 0),
              this.accessibleName)
            )
              this.effectiveAccessibleName = this.accessibleName;
            else if (this.accData) {
              const e = await (0, a.getI18nBundle)(this.packageName);
              this.effectiveAccessibleName = e.getText(this.accData) || void 0;
            }
          }
          get hasIconTooltip() {
            return this.showTooltip && this.effectiveAccessibleName;
          }
          async onEnterDOM() {
            setTimeout(() => {
              this.constructor.removeGlobalStyle();
            }, 0);
          }
        }
        p.define();
        var f = p;
        exports.default = f;
      },
      {
        "@ui5/webcomponents-base/dist/UI5Element.js": "Kogr",
        "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG",
        "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB",
        "@ui5/webcomponents-base/dist/util/createStyleInHead.js": "byga",
        "@ui5/webcomponents-base/dist/i18nBundle.js": "F4Ye",
        "@ui5/webcomponents-base/dist/Keys.js": "glQL",
        "@ui5/webcomponents-base/dist/isLegacyBrowser.js": "tMqU",
        "./generated/templates/IconTemplate.lit.js": "dMR7",
        "./generated/themes/Icon.css.js": "kJHZ",
      },
    ],
    XB3p: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS = exports.TOKENIZER_ARIA_CONTAIN_ONE_TOKEN = exports.TIMEPICKER_SUBMIT_BUTTON = exports.TIMEPICKER_SECONDS_LABEL = exports.TIMEPICKER_PERIODS_LABEL = exports.TIMEPICKER_MINUTES_LABEL = exports.TIMEPICKER_INPUT_DESCRIPTION = exports.TIMEPICKER_HOURS_LABEL = exports.TIMEPICKER_CANCEL_BUTTON = exports.TEXTAREA_CHARACTERS_LEFT = exports.TEXTAREA_CHARACTERS_EXCEEDED = exports.TABLE_ROW_POSITION = exports.TABLE_HEADER_ROW_TEXT = exports.TABLE_GROUP_ROW_ARIA_LABEL = exports.TABCONTAINER_PREVIOUS_ICON_ACC_NAME = exports.TABCONTAINER_OVERFLOW_MENU_TITLE = exports.TABCONTAINER_NEXT_ICON_ACC_NAME = exports.SWITCH_ON = exports.SWITCH_OFF = exports.STEPINPUT_INC_ICON_TITLE = exports.STEPINPUT_DEC_ICON_TITLE = exports.SLIDER_ARIA_DESCRIPTION = exports.SELECT_OPTIONS = exports.SEGMENTEDBUTTON_ARIA_DESCRIPTION = exports.SEGMENTEDBUTTON_ARIA_DESCRIBEDBY = exports.SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION = exports.RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON = exports.RATING_INDICATOR_TOOLTIP_TEXT = exports.RATING_INDICATOR_TEXT = exports.RANGE_SLIDER_START_HANDLE_DESCRIPTION = exports.RANGE_SLIDER_END_HANDLE_DESCRIPTION = exports.RANGE_SLIDER_ARIA_DESCRIPTION = exports.PANEL_ICON = exports.MULTIINPUT_SHOW_MORE_TOKENS = exports.MULTIINPUT_ROLEDESCRIPTION_TEXT = exports.MULTICOMBOBOX_DIALOG_OK_BUTTON = exports.MESSAGE_STRIP_CLOSE_BUTTON = exports.LOAD_MORE_TEXT = exports.LIST_ITEM_SELECTED = exports.LIST_ITEM_POSITION = exports.LIST_ITEM_NOT_SELECTED = exports.LINK_SUBTLE = exports.LINK_EMPHASIZED = exports.INPUT_SUGGESTIONS_TITLE = exports.INPUT_SUGGESTIONS_ONE_HIT = exports.INPUT_SUGGESTIONS_NO_HIT = exports.INPUT_SUGGESTIONS_MORE_HITS = exports.INPUT_SUGGESTIONS = exports.GROUP_HEADER_TEXT = exports.FILEUPLOAD_BROWSE = exports.FILEUPLOADER_TITLE = exports.DURATION_INPUT_DESCRIPTION = exports.DELETE = exports.DAY_PICKER_WEEK_NUMBER_TEXT = exports.DAY_PICKER_TODAY = exports.DAY_PICKER_NON_WORKING_DAY = exports.DATETIME_PICKER_TIME_BUTTON = exports.DATETIME_PICKER_DATE_BUTTON = exports.DATETIME_DESCRIPTION = exports.DATERANGE_DESCRIPTION = exports.DATEPICKER_OPEN_ICON_TITLE = exports.DATEPICKER_DATE_DESCRIPTION = exports.COLOR_PALETTE_MORE_COLORS_TEXT = exports.COLOR_PALETTE_DIALOG_TITLE = exports.COLOR_PALETTE_DIALOG_OK_BUTTON = exports.COLOR_PALETTE_DIALOG_CANCEL_BUTTON = exports.COLORPALETTE_POPOVER_TITLE = exports.COLORPALETTE_CONTAINER_LABEL = exports.COLORPALETTE_COLOR_LABEL = exports.CAROUSEL_PREVIOUS_ARROW_TEXT = exports.CAROUSEL_OF_TEXT = exports.CAROUSEL_NEXT_ARROW_TEXT = exports.CAROUSEL_DOT_TEXT = exports.CALENDAR_HEADER_PREVIOUS_BUTTON = exports.CALENDAR_HEADER_NEXT_BUTTON = exports.BUTTON_ARIA_TYPE_REJECT = exports.BUTTON_ARIA_TYPE_EMPHASIZED = exports.BUTTON_ARIA_TYPE_ACCEPT = exports.BUSY_INDICATOR_TITLE = exports.BREADCRUMBS_OVERFLOW_ARIA_LABEL = exports.BREADCRUMBS_CANCEL_BUTTON = exports.BREADCRUMBS_ARIA_LABEL = exports.BADGE_DESCRIPTION = exports.AVATAR_TOOLTIP = exports.AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL = exports.AVATAR_GROUP_MOVE = exports.AVATAR_GROUP_DISPLAYED_HIDDEN_LABEL = exports.AVATAR_GROUP_ARIA_LABEL_INDIVIDUAL = exports.AVATAR_GROUP_ARIA_LABEL_GROUP = exports.ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER = exports.ARIA_ROLEDESCRIPTION_CARD_HEADER = exports.ARIA_ROLEDESCRIPTION_CARD = exports.ARIA_LABEL_SELECT_ALL_CHECKBOX = exports.ARIA_LABEL_ROW_SELECTION = exports.ARIA_LABEL_LIST_SELECTABLE = exports.ARIA_LABEL_LIST_MULTISELECTABLE = exports.ARIA_LABEL_LIST_ITEM_RADIO_BUTTON = exports.ARIA_LABEL_LIST_ITEM_CHECKBOX = exports.ARIA_LABEL_LIST_DELETABLE = exports.ARIA_LABEL_CARD_CONTENT = void 0),
          (exports.VALUE_STATE_WARNING = exports.VALUE_STATE_SUCCESS = exports.VALUE_STATE_INFORMATION = exports.VALUE_STATE_ERROR_ALREADY_SELECTED = exports.VALUE_STATE_ERROR = exports.TREE_ITEM_EXPAND_NODE = exports.TREE_ITEM_COLLAPSE_NODE = exports.TREE_ITEM_ARIA_LABEL = exports.TOKEN_ARIA_DELETABLE = exports.TOKENIZER_POPOVER_REMOVE = exports.TOKENIZER_ARIA_LABEL = exports.TOKENIZER_ARIA_CONTAIN_TOKEN = void 0);
        const E = { key: "ARIA_LABEL_CARD_CONTENT", defaultText: "Card Content" };
        exports.ARIA_LABEL_CARD_CONTENT = E;
        const T = { key: "ARIA_ROLEDESCRIPTION_CARD", defaultText: "Card" };
        exports.ARIA_ROLEDESCRIPTION_CARD = T;
        const _ = { key: "ARIA_ROLEDESCRIPTION_CARD_HEADER", defaultText: "Card Header" };
        exports.ARIA_ROLEDESCRIPTION_CARD_HEADER = _;
        const e = { key: "ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER", defaultText: "Interactive Card Header" };
        exports.ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER = e;
        const A = { key: "AVATAR_TOOLTIP", defaultText: "Avatar" };
        exports.AVATAR_TOOLTIP = A;
        const t = { key: "AVATAR_GROUP_DISPLAYED_HIDDEN_LABEL", defaultText: "{0} displayed, {1} hidden." };
        exports.AVATAR_GROUP_DISPLAYED_HIDDEN_LABEL = t;
        const I = { key: "AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL", defaultText: "Activate for complete list." };
        exports.AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL = I;
        const R = { key: "AVATAR_GROUP_ARIA_LABEL_INDIVIDUAL", defaultText: "Individual avatars." };
        exports.AVATAR_GROUP_ARIA_LABEL_INDIVIDUAL = R;
        const O = { key: "AVATAR_GROUP_ARIA_LABEL_GROUP", defaultText: "Conjoined avatars." };
        exports.AVATAR_GROUP_ARIA_LABEL_GROUP = O;
        const L = { key: "AVATAR_GROUP_MOVE", defaultText: "Press ARROW keys to move." };
        exports.AVATAR_GROUP_MOVE = L;
        const N = { key: "BADGE_DESCRIPTION", defaultText: "Badge" };
        exports.BADGE_DESCRIPTION = N;
        const o = { key: "BREADCRUMBS_ARIA_LABEL", defaultText: "Breadcrumb Trail" };
        exports.BREADCRUMBS_ARIA_LABEL = o;
        const s = { key: "BREADCRUMBS_OVERFLOW_ARIA_LABEL", defaultText: "More" };
        exports.BREADCRUMBS_OVERFLOW_ARIA_LABEL = s;
        const C = { key: "BREADCRUMBS_CANCEL_BUTTON", defaultText: "Cancel" };
        exports.BREADCRUMBS_CANCEL_BUTTON = C;
        const S = { key: "BUSY_INDICATOR_TITLE", defaultText: "Please wait" };
        exports.BUSY_INDICATOR_TITLE = S;
        const x = { key: "BUTTON_ARIA_TYPE_ACCEPT", defaultText: "Positive Action" };
        exports.BUTTON_ARIA_TYPE_ACCEPT = x;
        const r = { key: "BUTTON_ARIA_TYPE_REJECT", defaultText: "Negative Action" };
        exports.BUTTON_ARIA_TYPE_REJECT = r;
        const D = { key: "BUTTON_ARIA_TYPE_EMPHASIZED", defaultText: "Emphasized" };
        exports.BUTTON_ARIA_TYPE_EMPHASIZED = D;
        const P = { key: "CAROUSEL_OF_TEXT", defaultText: "of" };
        exports.CAROUSEL_OF_TEXT = P;
        const p = { key: "CAROUSEL_DOT_TEXT", defaultText: "Item {0} of {1} displayed" };
        exports.CAROUSEL_DOT_TEXT = p;
        const U = { key: "CAROUSEL_PREVIOUS_ARROW_TEXT", defaultText: "Previous Page" };
        exports.CAROUSEL_PREVIOUS_ARROW_TEXT = U;
        const B = { key: "CAROUSEL_NEXT_ARROW_TEXT", defaultText: "Next Page" };
        exports.CAROUSEL_NEXT_ARROW_TEXT = B;
        const a = { key: "COLORPALETTE_CONTAINER_LABEL", defaultText: "Color Palette - Predefined Colors" };
        exports.COLORPALETTE_CONTAINER_LABEL = a;
        const l = { key: "COLORPALETTE_POPOVER_TITLE", defaultText: "Color Palette" };
        exports.COLORPALETTE_POPOVER_TITLE = l;
        const n = { key: "COLORPALETTE_COLOR_LABEL", defaultText: "Color" };
        exports.COLORPALETTE_COLOR_LABEL = n;
        const d = { key: "COLOR_PALETTE_DIALOG_CANCEL_BUTTON", defaultText: "Cancel" };
        exports.COLOR_PALETTE_DIALOG_CANCEL_BUTTON = d;
        const M = { key: "COLOR_PALETTE_DIALOG_OK_BUTTON", defaultText: "OK" };
        exports.COLOR_PALETTE_DIALOG_OK_BUTTON = M;
        const u = { key: "COLOR_PALETTE_DIALOG_TITLE", defaultText: "Change Color" };
        exports.COLOR_PALETTE_DIALOG_TITLE = u;
        const c = { key: "COLOR_PALETTE_MORE_COLORS_TEXT", defaultText: "More Colors..." };
        exports.COLOR_PALETTE_MORE_COLORS_TEXT = c;
        const f = { key: "DATEPICKER_OPEN_ICON_TITLE", defaultText: "Open Picker" };
        exports.DATEPICKER_OPEN_ICON_TITLE = f;
        const y = { key: "DATEPICKER_DATE_DESCRIPTION", defaultText: "Date Input" };
        exports.DATEPICKER_DATE_DESCRIPTION = y;
        const k = { key: "DATETIME_DESCRIPTION", defaultText: "Date Time Input" };
        exports.DATETIME_DESCRIPTION = k;
        const G = { key: "DATERANGE_DESCRIPTION", defaultText: "Date Range Input" };
        exports.DATERANGE_DESCRIPTION = G;
        const K = { key: "DELETE", defaultText: "Delete" };
        exports.DELETE = K;
        const V = { key: "FILEUPLOAD_BROWSE", defaultText: "Browse..." };
        exports.FILEUPLOAD_BROWSE = V;
        const H = { key: "FILEUPLOADER_TITLE", defaultText: "Upload File" };
        exports.FILEUPLOADER_TITLE = H;
        const i = { key: "GROUP_HEADER_TEXT", defaultText: "Group Header" };
        exports.GROUP_HEADER_TEXT = i;
        const X = { key: "SELECT_OPTIONS", defaultText: "Select Options" };
        exports.SELECT_OPTIONS = X;
        const W = { key: "INPUT_SUGGESTIONS", defaultText: "Suggestions Available" };
        exports.INPUT_SUGGESTIONS = W;
        const Y = { key: "INPUT_SUGGESTIONS_TITLE", defaultText: "Select" };
        exports.INPUT_SUGGESTIONS_TITLE = Y;
        const F = { key: "INPUT_SUGGESTIONS_ONE_HIT", defaultText: "1 result available" };
        exports.INPUT_SUGGESTIONS_ONE_HIT = F;
        const v = { key: "INPUT_SUGGESTIONS_MORE_HITS", defaultText: "{0} results are available" };
        exports.INPUT_SUGGESTIONS_MORE_HITS = v;
        const m = { key: "INPUT_SUGGESTIONS_NO_HIT", defaultText: "No results" };
        exports.INPUT_SUGGESTIONS_NO_HIT = m;
        const Z = { key: "LINK_SUBTLE", defaultText: "Subtle" };
        exports.LINK_SUBTLE = Z;
        const g = { key: "LINK_EMPHASIZED", defaultText: "Emphasized" };
        exports.LINK_EMPHASIZED = g;
        const b = { key: "LIST_ITEM_POSITION", defaultText: "List item {0} of {1}" };
        exports.LIST_ITEM_POSITION = b;
        const h = { key: "LIST_ITEM_SELECTED", defaultText: "Selected" };
        exports.LIST_ITEM_SELECTED = h;
        const w = { key: "LIST_ITEM_NOT_SELECTED", defaultText: "Not Selected" };
        exports.LIST_ITEM_NOT_SELECTED = w;
        const z = { key: "ARIA_LABEL_LIST_ITEM_CHECKBOX", defaultText: "Multiple Selection Mode" };
        exports.ARIA_LABEL_LIST_ITEM_CHECKBOX = z;
        const J = { key: "ARIA_LABEL_LIST_ITEM_RADIO_BUTTON", defaultText: "Item Selection." };
        exports.ARIA_LABEL_LIST_ITEM_RADIO_BUTTON = J;
        const j = { key: "ARIA_LABEL_LIST_SELECTABLE", defaultText: "Contains Selectable Items" };
        exports.ARIA_LABEL_LIST_SELECTABLE = j;
        const q = { key: "ARIA_LABEL_LIST_MULTISELECTABLE", defaultText: "Contains Multi-Selectable Items" };
        exports.ARIA_LABEL_LIST_MULTISELECTABLE = q;
        const Q = { key: "ARIA_LABEL_LIST_DELETABLE", defaultText: "Contains Deletable Items" };
        exports.ARIA_LABEL_LIST_DELETABLE = Q;
        const $ = { key: "MESSAGE_STRIP_CLOSE_BUTTON", defaultText: "Message Strip Close" };
        exports.MESSAGE_STRIP_CLOSE_BUTTON = $;
        const EE = { key: "MULTICOMBOBOX_DIALOG_OK_BUTTON", defaultText: "OK" };
        exports.MULTICOMBOBOX_DIALOG_OK_BUTTON = EE;
        const TE = { key: "VALUE_STATE_ERROR_ALREADY_SELECTED", defaultText: "This value is already selected." };
        exports.VALUE_STATE_ERROR_ALREADY_SELECTED = TE;
        const _E = { key: "MULTIINPUT_ROLEDESCRIPTION_TEXT", defaultText: "Multi Value Input" };
        exports.MULTIINPUT_ROLEDESCRIPTION_TEXT = _E;
        const eE = { key: "MULTIINPUT_SHOW_MORE_TOKENS", defaultText: "{0} More" };
        exports.MULTIINPUT_SHOW_MORE_TOKENS = eE;
        const AE = { key: "PANEL_ICON", defaultText: "Expand/Collapse" };
        exports.PANEL_ICON = AE;
        const tE = { key: "RANGE_SLIDER_ARIA_DESCRIPTION", defaultText: "Range" };
        exports.RANGE_SLIDER_ARIA_DESCRIPTION = tE;
        const IE = { key: "RANGE_SLIDER_START_HANDLE_DESCRIPTION", defaultText: "Left handle" };
        exports.RANGE_SLIDER_START_HANDLE_DESCRIPTION = IE;
        const RE = { key: "RANGE_SLIDER_END_HANDLE_DESCRIPTION", defaultText: "Right handle" };
        exports.RANGE_SLIDER_END_HANDLE_DESCRIPTION = RE;
        const OE = { key: "RATING_INDICATOR_TOOLTIP_TEXT", defaultText: "Rating" };
        exports.RATING_INDICATOR_TOOLTIP_TEXT = OE;
        const LE = { key: "RATING_INDICATOR_TEXT", defaultText: "Rating Indicator" };
        exports.RATING_INDICATOR_TEXT = LE;
        const NE = { key: "RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON", defaultText: "Decline" };
        exports.RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON = NE;
        const oE = { key: "SEGMENTEDBUTTON_ARIA_DESCRIPTION", defaultText: "Segmented button group" };
        exports.SEGMENTEDBUTTON_ARIA_DESCRIPTION = oE;
        const sE = { key: "SEGMENTEDBUTTON_ARIA_DESCRIBEDBY", defaultText: "Press SPACE or ENTER to select an item" };
        exports.SEGMENTEDBUTTON_ARIA_DESCRIBEDBY = sE;
        const CE = { key: "SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION", defaultText: "Segmented button" };
        exports.SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION = CE;
        const SE = { key: "SLIDER_ARIA_DESCRIPTION", defaultText: "Slider handle" };
        exports.SLIDER_ARIA_DESCRIPTION = SE;
        const xE = { key: "SWITCH_ON", defaultText: "On" };
        exports.SWITCH_ON = xE;
        const rE = { key: "SWITCH_OFF", defaultText: "Off" };
        exports.SWITCH_OFF = rE;
        const DE = { key: "LOAD_MORE_TEXT", defaultText: "More" };
        exports.LOAD_MORE_TEXT = DE;
        const PE = { key: "TABLE_HEADER_ROW_TEXT", defaultText: "Header Row" };
        exports.TABLE_HEADER_ROW_TEXT = PE;
        const pE = { key: "TABLE_ROW_POSITION", defaultText: "{0} of {1}" };
        exports.TABLE_ROW_POSITION = pE;
        const UE = { key: "TABLE_GROUP_ROW_ARIA_LABEL", defaultText: "Group Header Row" };
        exports.TABLE_GROUP_ROW_ARIA_LABEL = UE;
        const BE = { key: "ARIA_LABEL_ROW_SELECTION", defaultText: "Item Selection" };
        exports.ARIA_LABEL_ROW_SELECTION = BE;
        const aE = { key: "ARIA_LABEL_SELECT_ALL_CHECKBOX", defaultText: "Select All Rows" };
        exports.ARIA_LABEL_SELECT_ALL_CHECKBOX = aE;
        const lE = { key: "TABCONTAINER_NEXT_ICON_ACC_NAME", defaultText: "Next" };
        exports.TABCONTAINER_NEXT_ICON_ACC_NAME = lE;
        const nE = { key: "TABCONTAINER_PREVIOUS_ICON_ACC_NAME", defaultText: "Previous" };
        exports.TABCONTAINER_PREVIOUS_ICON_ACC_NAME = nE;
        const dE = { key: "TABCONTAINER_OVERFLOW_MENU_TITLE", defaultText: "Overflow Menu" };
        exports.TABCONTAINER_OVERFLOW_MENU_TITLE = dE;
        const ME = { key: "TEXTAREA_CHARACTERS_LEFT", defaultText: "{0} characters remaining" };
        exports.TEXTAREA_CHARACTERS_LEFT = ME;
        const uE = { key: "TEXTAREA_CHARACTERS_EXCEEDED", defaultText: "{0} characters over limit" };
        exports.TEXTAREA_CHARACTERS_EXCEEDED = uE;
        const cE = { key: "TIMEPICKER_HOURS_LABEL", defaultText: "Hours" };
        exports.TIMEPICKER_HOURS_LABEL = cE;
        const fE = { key: "TIMEPICKER_MINUTES_LABEL", defaultText: "Minutes" };
        exports.TIMEPICKER_MINUTES_LABEL = fE;
        const yE = { key: "TIMEPICKER_SECONDS_LABEL", defaultText: "Seconds" };
        exports.TIMEPICKER_SECONDS_LABEL = yE;
        const kE = { key: "TIMEPICKER_PERIODS_LABEL", defaultText: "AM/PM" };
        exports.TIMEPICKER_PERIODS_LABEL = kE;
        const GE = { key: "TIMEPICKER_SUBMIT_BUTTON", defaultText: "OK" };
        exports.TIMEPICKER_SUBMIT_BUTTON = GE;
        const KE = { key: "TIMEPICKER_CANCEL_BUTTON", defaultText: "Cancel" };
        exports.TIMEPICKER_CANCEL_BUTTON = KE;
        const VE = { key: "TIMEPICKER_INPUT_DESCRIPTION", defaultText: "Time Input" };
        exports.TIMEPICKER_INPUT_DESCRIPTION = VE;
        const HE = { key: "DURATION_INPUT_DESCRIPTION", defaultText: "Duration Input" };
        exports.DURATION_INPUT_DESCRIPTION = HE;
        const iE = { key: "DATETIME_PICKER_DATE_BUTTON", defaultText: "Date" };
        exports.DATETIME_PICKER_DATE_BUTTON = iE;
        const XE = { key: "DATETIME_PICKER_TIME_BUTTON", defaultText: "Time" };
        exports.DATETIME_PICKER_TIME_BUTTON = XE;
        const WE = { key: "TOKEN_ARIA_DELETABLE", defaultText: "Deletable" };
        exports.TOKEN_ARIA_DELETABLE = WE;
        const YE = { key: "TOKENIZER_ARIA_CONTAIN_TOKEN", defaultText: "No Tokens" };
        exports.TOKENIZER_ARIA_CONTAIN_TOKEN = YE;
        const FE = { key: "TOKENIZER_ARIA_CONTAIN_ONE_TOKEN", defaultText: "Contains 1 token" };
        exports.TOKENIZER_ARIA_CONTAIN_ONE_TOKEN = FE;
        const vE = { key: "TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS", defaultText: "Contains {0} tokens" };
        exports.TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS = vE;
        const mE = { key: "TOKENIZER_ARIA_LABEL", defaultText: "Tokenizer" };
        exports.TOKENIZER_ARIA_LABEL = mE;
        const ZE = { key: "TOKENIZER_POPOVER_REMOVE", defaultText: "Remove" };
        exports.TOKENIZER_POPOVER_REMOVE = ZE;
        const gE = { key: "TREE_ITEM_ARIA_LABEL", defaultText: "Tree Item" };
        exports.TREE_ITEM_ARIA_LABEL = gE;
        const bE = { key: "TREE_ITEM_EXPAND_NODE", defaultText: "Expand Node" };
        exports.TREE_ITEM_EXPAND_NODE = bE;
        const hE = { key: "TREE_ITEM_COLLAPSE_NODE", defaultText: "Collapse Node" };
        exports.TREE_ITEM_COLLAPSE_NODE = hE;
        const wE = { key: "VALUE_STATE_ERROR", defaultText: "Invalid entry" };
        exports.VALUE_STATE_ERROR = wE;
        const zE = { key: "VALUE_STATE_WARNING", defaultText: "Warning issued" };
        exports.VALUE_STATE_WARNING = zE;
        const JE = { key: "VALUE_STATE_INFORMATION", defaultText: "Informative entry" };
        exports.VALUE_STATE_INFORMATION = JE;
        const jE = { key: "VALUE_STATE_SUCCESS", defaultText: "Entry successfully validated" };
        exports.VALUE_STATE_SUCCESS = jE;
        const qE = { key: "CALENDAR_HEADER_NEXT_BUTTON", defaultText: "Next" };
        exports.CALENDAR_HEADER_NEXT_BUTTON = qE;
        const QE = { key: "CALENDAR_HEADER_PREVIOUS_BUTTON", defaultText: "Previous" };
        exports.CALENDAR_HEADER_PREVIOUS_BUTTON = QE;
        const $E = { key: "DAY_PICKER_WEEK_NUMBER_TEXT", defaultText: "Week Number" };
        exports.DAY_PICKER_WEEK_NUMBER_TEXT = $E;
        const ET = { key: "DAY_PICKER_NON_WORKING_DAY", defaultText: "Non-Working Day" };
        exports.DAY_PICKER_NON_WORKING_DAY = ET;
        const TT = { key: "DAY_PICKER_TODAY", defaultText: "Today" };
        exports.DAY_PICKER_TODAY = TT;
        const _T = { key: "STEPINPUT_DEC_ICON_TITLE", defaultText: "Decrease" };
        exports.STEPINPUT_DEC_ICON_TITLE = _T;
        const eT = { key: "STEPINPUT_INC_ICON_TITLE", defaultText: "Increase" };
        exports.STEPINPUT_INC_ICON_TITLE = eT;
      },
      {},
    ],
    ROoq: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var o = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          t = r(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          e = r(require("./sap_fiori_3/parameters-bundle.css.js"));
        function r(o) {
          return o && o.__esModule ? o : { default: o };
        }
        (0, o.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => t.default),
          (0, o.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => e.default);
        var n = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/Button.css",
          content:
            '.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block}:host{min-width:var(--_ui5_button_base_min_width);height:var(--_ui5_button_base_height);line-height:normal;font-family:var(--_ui5_button_fontFamily);font-size:var(--sapFontSize);text-shadow:var(--_ui5_button_text_shadow);border-radius:var(--_ui5_button_border_radius);border-width:.0625rem;cursor:pointer;background-color:var(--sapButton_Background);border:1px solid var(--sapButton_BorderColor);color:var(--sapButton_TextColor);box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host([has-icon]) button[dir=rtl].ui5-button-root .ui5-button-text{margin-right:var(--_ui5_button_base_icon_margin);margin-left:0}:host([has-icon][icon-end]) button[dir=rtl].ui5-button-root .ui5-button-icon{margin-right:var(--_ui5_button_base_icon_margin);margin-left:0}.ui5-button-root{min-width:inherit;cursor:inherit;height:100%;width:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;outline:none;padding:0 var(--_ui5_button_base_padding);position:relative;background:transparent;border:none;color:inherit;text-shadow:inherit;font:inherit;white-space:inherit;overflow:inherit;text-overflow:inherit;letter-spacing:inherit;word-spacing:inherit;line-height:inherit;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host(:not([active]):not([non-interactive]):not([_is-touch]):hover),:host(:not([hidden]).ui5_hovered){background:var(--sapButton_Hover_Background);box-shadow:var(--sapContent_Interaction_Shadow)}.ui5-button-icon{color:inherit;flex-shrink:0}:host([icon-end]) .ui5-button-root{flex-direction:row-reverse}:host([icon-end]) .ui5-button-icon{margin-left:var(--_ui5_button_base_icon_margin)}:host([icon-only]) .ui5-button-root{min-width:auto;padding:0}:host([icon-only]) .ui5-button-text{display:none}.ui5-button-text{outline:none;position:relative;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([has-icon]:not([icon-end])) .ui5-button-text{margin-left:var(--_ui5_button_base_icon_margin)}:host([has-icon][icon-end]) .ui5-button-text{margin-left:0}:host([disabled]){opacity:.5;pointer-events:none}:host([focused]){outline:var(--_ui5_button_outline);outline-offset:var(--_ui5_button_outline_offset)}:host([design=Emphasized][focused]){outline:var(--_ui5_button_emphasized_outline)}.ui5-button-root::-moz-focus-inner{border:0}bdi{display:block;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([ui5-button][active]:not([disabled]):not([non-interactive])){background-image:none;background-color:var(--sapButton_Active_Background);border-color:var(--sapButton_Active_BorderColor);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([ui5-button]:not([design=Emphasized])[active]:not([_is-touch])){outline-color:var(--_ui5_button_focus_outline_focus_color)}:host([design=Positive]){background-color:var(--sapButton_Accept_Background);border-color:var(--sapButton_Accept_BorderColor);color:var(--sapButton_Accept_TextColor);text-shadow:var(--_ui5_button_text_shadow)}:host([design=Positive]:not([active]):not([non-interactive]):not([_is-touch]).ui5_hovered),:host([design=Positive]:not([active]):not([non-interactive]):not([_is-touch]):hover){background-color:var(--sapButton_Accept_Hover_Background);border-color:var(--sapButton_Accept_Hover_BorderColor);box-shadow:var(--sapContent_Positive_Shadow)}:host([ui5-button][design=Positive][active]:not([non-interactive])){background-color:var(--sapButton_Accept_Active_Background);border-color:var(--sapButton_Accept_Active_BorderColor);color:var(--sapButton_Accept_Active_TextColor);text-shadow:none}:host([design=Positive][focused]:not([_is-touch])){outline-color:var(--_ui5_button_positive_border_focus_hover_color);border-color:var(--_ui5_button_positive_focus_border_color)}:host([design=Positive][active][focused]){outline-color:var(--_ui5_button_focus_outline_focus_color)}:host([design=Negative]){background-color:var(--sapButton_Reject_Background);border-color:var(--sapButton_Reject_BorderColor);color:var(--sapButton_Reject_TextColor);text-shadow:var(--_ui5_button_text_shadow)}:host([design=Negative]:not([active]):not([non-interactive]):not([_is-touch]).ui5_hovered),:host([design=Negative]:not([active]):not([non-interactive]):not([_is-touch]):hover){background-color:var(--sapButton_Reject_Hover_Background);border-color:var(--sapButton_Reject_Hover_BorderColor);box-shadow:var(--sapContent_Negative_Shadow)}:host([design=Negative][focused]){border-color:var(--_ui5_button_negative_focus_border_color);outline-color:var(--_ui5_button_positive_border_focus_hover_color)}:host([ui5-button][design=Negative][active]:not([non-interactive])){background-color:var(--sapButton_Reject_Active_Background);border-color:var(--sapButton_Reject_Active_BorderColor);color:var(--sapButton_Reject_Active_TextColor);text-shadow:none}:host([design=Negative][active][focused]){outline-color:var(--_ui5_button_focus_outline_focus_color)}:host([design=Attention]){background-color:var(--sapButton_Attention_Background);border-color:var(--sapButton_Attention_BorderColor);color:var(--sapButton_Attention_TextColor);text-shadow:var(--_ui5_button_text_shadow)}:host([design=Attention]:not([active]):not([non-interactive]):not([_is-touch]).ui5_hovered),:host([design=Attention]:not([active]):not([non-interactive]):not([_is-touch]):hover){background-color:var(--sapButton_Attention_Hover_Background);border-color:var(--sapButton_Attention_Hover_BorderColor);color:var(--sapButton_Attention_Hover_TextColor);box-shadow:var(--sapContent_Critical_Shadow)}:host([ui5-button][design=Attention][active]:not([non-interactive])){background-color:var(--sapButton_Attention_Active_Background);border-color:var(--sapButton_Attention_Active_BorderColor);color:var(--sapButton_Attention_Active_TextColor);text-shadow:none}:host([design=Attention][focused]:not([_is-touch])){outline-color:var(--_ui5_button_positive_border_focus_hover_color);border-color:var(--_ui5_button_attention_focus_border_color)}:host([design=Attention][active][focused]){outline-color:var(--_ui5_button_focus_outline_focus_color)}:host([design=Emphasized]){background-color:var(--sapButton_Emphasized_Background);border-color:var(--sapButton_Emphasized_BorderColor);color:var(--sapButton_Emphasized_TextColor);text-shadow:0 0 .125rem var(--sapButton_Emphasized_TextShadow);font-weight:var(--_ui5_button_emphasized_font_weight)}:host([design=Emphasized]:not([active]):not([non-interactive]):not([_is-touch]).ui5_hovered),:host([design=Emphasized]:not([active]):not([non-interactive]):not([_is-touch]):hover){background-color:var(--sapButton_Emphasized_Hover_Background);border-color:var(--sapButton_Emphasized_Hover_BorderColor);box-shadow:var(--sapContent_Informative_Shadow)}:host([ui5-button][design=Empasized][active]:not([non-interactive])){background-color:var(--sapButton_Emphasized_Active_Background);border-color:var(--sapButton_Emphasized_Active_BorderColor);color:var(--sapButton_Emphasized_Active_TextColor);text-shadow:none}:host([design=Emphasized][focused]) .ui5-button-root:after{content:"";position:absolute;box-sizing:border-box;left:.0625rem;top:.0625rem;right:.0625rem;bottom:.0625rem;border:var(--_ui5_button_emphasized_focused_border);pointer-events:none;border-radius:var(--_ui5_button_emphasized_focused_border_radius)}:host([design=Transparent]){background-color:var(--sapButton_Lite_Background);color:var(--sapButton_Lite_TextColor);text-shadow:var(--_ui5_button_text_shadow);border-color:var(--sapButton_Lite_BorderColor)}:host([design=Transparent]:not([active]):not([non-interactive]):not([_is-touch]):hover){background-color:var(--_ui5_button_transparent_hover)}:host([design=Transparent]:not([active]):not([non-interactive]):not([_is-touch]).ui5_hovered){background-color:var(--_ui5_button_transparent_hover);border-color:var(--sapButton_Lite_Hover_BorderColor);box-shadow:var(--sapContent_Critical_Shadow)}:host([ui5-button][design=Transparent][active]:not([non-interactive])){background-color:var(--sapButton_Active_Background);color:var(--sapButton_Active_TextColor);text-shadow:none}:host([design=Transparent]:not([active]):hover){border-color:var(--sapButton_Lite_Hover_BorderColor)}',
        };
        exports.default = n;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    H9dA: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var o = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          t = r(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          e = r(require("./sap_fiori_3/parameters-bundle.css.js"));
        function r(o) {
          return o && o.__esModule ? o : { default: o };
        }
        (0, o.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => t.default),
          (0, o.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => e.default);
        var u = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/Button.ie11.css",
          content:
            '[ui5-button][focused]{outline:none}[ui5-button][focused] .ui5-button-root{position:relative}[ui5-button][focused] .ui5-button-root:after{content:"";position:absolute;border-width:1px;border-style:dotted;border-color:var(--_ui5_button_focus_color);top:var(--_ui5_button_focus_offset);bottom:var(--_ui5_button_focus_offset);left:var(--_ui5_button_focus_offset);right:var(--_ui5_button_focus_offset)}[ui5-button][active] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-button][design=Positive][focused] .ui5-button-root:after{border-color:var(--_ui5_button_positive_border_focus_hover_color)}[ui5-button][design=Positive][active][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-button][design=Negative][focused] .ui5-button-root:after{border-color:var(--_ui5_button_positive_border_focus_hover_color)}[ui5-button][design=Negative][active][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-button][design=Emphasized][focused] .ui5-button-root:after{border-color:var(--sapContent_ContrastFocusColor)}[ui5-button] [ui5-icon].ui5-button-icon{height:var(--_ui5_button_icon_font_size);top:0}',
        };
        exports.default = u;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    PQe6: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = h(require("@ui5/webcomponents-base/dist/UI5Element.js")),
          t = h(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js")),
          n = require("@ui5/webcomponents-base/dist/Keys.js"),
          i = require("@ui5/webcomponents-base/dist/FeaturesRegistry.js"),
          s = require("@ui5/webcomponents-base/dist/i18nBundle.js"),
          o = h(require("@ui5/webcomponents-base/dist/isLegacyBrowser.js")),
          a = require("@ui5/webcomponents-base/dist/Device.js"),
          r = h(require("./types/ButtonDesign.js")),
          u = h(require("./generated/templates/ButtonTemplate.lit.js")),
          c = h(require("./Icon.js")),
          d = require("./generated/i18n/i18n-defaults.js"),
          l = h(require("./generated/themes/Button.css.js")),
          p = h(require("./generated/themes/Button.ie11.css.js"));
        function h(e) {
          return e && e.__esModule ? e : { default: e };
        }
        let b = !1,
          f = null;
        const g = {
          tag: "ui5-button",
          languageAware: !0,
          properties: {
            design: { type: r.default, defaultValue: r.default.Default },
            disabled: { type: Boolean },
            icon: { type: String },
            iconEnd: { type: Boolean },
            submits: { type: Boolean },
            title: { type: String },
            active: { type: Boolean },
            iconOnly: { type: Boolean },
            focused: { type: Boolean },
            hasIcon: { type: Boolean },
            accessibleName: { type: String, defaultValue: void 0 },
            ariaExpanded: { type: String },
            nonInteractive: { type: Boolean },
            _iconSettings: { type: Object },
            _buttonAccInfo: { type: Object },
            _tabIndex: { type: String, defaultValue: "0", noAttribute: !0 },
            _isTouch: { type: Boolean },
          },
          managedSlots: !0,
          slots: { default: { type: Node } },
          events: { click: {} },
        };
        class y extends e.default {
          static get metadata() {
            return g;
          }
          static get styles() {
            return [l.default, (0, o.default)() && p.default];
          }
          static get render() {
            return t.default;
          }
          static get template() {
            return u.default;
          }
          static get dependencies() {
            return [c.default];
          }
          constructor() {
            super(),
              (this._deactivate = () => {
                f && (f.active = !1);
              }),
              b || (document.addEventListener("mouseup", this._deactivate), (b = !0));
          }
          onEnterDOM() {
            this._isTouch = ((0, a.isPhone)() || (0, a.isTablet)()) && !(0, a.isCombi)();
          }
          onBeforeRendering() {
            const e = (0, i.getFeature)("FormSupport");
            this.submits &&
              !e &&
              console.warn(
                'In order for the "submits" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";'
              ),
              (this.iconOnly = this.isIconOnly),
              (this.hasIcon = !!this.icon);
          }
          _onclick(e) {
            if (this.nonInteractive) return;
            e.isMarked = "button";
            const t = (0, i.getFeature)("FormSupport");
            t && t.triggerFormSubmit(this);
          }
          _onmousedown(e) {
            this.nonInteractive || this._isTouch || ((e.isMarked = "button"), (this.active = !0), (f = this));
          }
          _ontouchstart(e) {
            (e.isMarked = "button"), this.nonInteractive || (this.active = !0);
          }
          _ontouchend(e) {
            (this.active = !1), f && (f.active = !1);
          }
          _onmouseup(e) {
            e.isMarked = "button";
          }
          _onkeydown(e) {
            (e.isMarked = "button"), ((0, n.isSpace)(e) || (0, n.isEnter)(e)) && (this.active = !0);
          }
          _onkeyup(e) {
            ((0, n.isSpace)(e) || (0, n.isEnter)(e)) && (this.active = !1);
          }
          _onfocusout(e) {
            this.nonInteractive || ((this.active = !1), (this.focused = !1));
          }
          _onfocusin(e) {
            this.nonInteractive || ((e.isMarked = "button"), (this.focused = !0));
          }
          get hasButtonType() {
            return this.design !== r.default.Default && this.design !== r.default.Transparent;
          }
          get isIconOnly() {
            return !Array.from(this.childNodes).filter(
              (e) =>
                e.nodeType !== Node.COMMENT_NODE && (e.nodeType !== Node.TEXT_NODE || 0 !== e.nodeValue.trim().length)
            ).length;
          }
          get accInfo() {
            return {
              ariaExpanded: this.ariaExpanded || (this._buttonAccInfo && this._buttonAccInfo.ariaExpanded),
              ariaControls: this._buttonAccInfo && this._buttonAccInfo.ariaControls,
              ariaHaspopup: this._buttonAccInfo && this._buttonAccInfo.ariaHaspopup,
              title: this.title || (this._buttonAccInfo && this._buttonAccInfo.title),
            };
          }
          static typeTextMappings() {
            return {
              Positive: d.BUTTON_ARIA_TYPE_ACCEPT,
              Negative: d.BUTTON_ARIA_TYPE_REJECT,
              Emphasized: d.BUTTON_ARIA_TYPE_EMPHASIZED,
            };
          }
          get buttonTypeText() {
            return y.i18nBundle.getText(y.typeTextMappings()[this.design]);
          }
          get tabIndexValue() {
            const e = this.getAttribute("tabindex");
            return e || (this.nonInteractive ? "-1" : this._tabIndex);
          }
          get showIconTooltip() {
            return this.iconOnly && !this.title;
          }
          static async onDefine() {
            y.i18nBundle = await (0, s.getI18nBundle)("@ui5/webcomponents");
          }
        }
        y.define();
        var _ = y;
        exports.default = _;
      },
      {
        "@ui5/webcomponents-base/dist/UI5Element.js": "Kogr",
        "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG",
        "@ui5/webcomponents-base/dist/Keys.js": "glQL",
        "@ui5/webcomponents-base/dist/FeaturesRegistry.js": "rnHX",
        "@ui5/webcomponents-base/dist/i18nBundle.js": "F4Ye",
        "@ui5/webcomponents-base/dist/isLegacyBrowser.js": "tMqU",
        "@ui5/webcomponents-base/dist/Device.js": "Oq9i",
        "./types/ButtonDesign.js": "fAPD",
        "./generated/templates/ButtonTemplate.lit.js": "BwkU",
        "./Icon.js": "RJcw",
        "./generated/i18n/i18n-defaults.js": "XB3p",
        "./generated/themes/Button.css.js": "ROoq",
        "./generated/themes/Button.ie11.css.js": "H9dA",
      },
    ],
    JCWs: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = { Complementary: "Complementary", Form: "Form", Region: "Region" };
        class r extends e.default {
          static isValid(e) {
            return !!s[e];
          }
        }
        r.generateTypeAccessors(s);
        var o = r;
        exports.default = o;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    z2YH: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const a = (a, t, n) =>
            e.html`<div data-sap-ui-fastnavgroup="true" class="ui5-panel-root" role="${(0, e.ifDefined)(
              a.accRole
            )}" aria-label="${(0, e.ifDefined)(
              a.effectiveAccessibleName
            )}"><!-- header: either header or h1 with header text --><div @click="${a._headerClick}" @keydown="${
              a._headerKeyDown
            }" @keyup="${a._headerKeyUp}" class="ui5-panel-header" tabindex="${(0, e.ifDefined)(
              a.headerTabIndex
            )}" role="${(0, e.ifDefined)(a.accInfo.role)}" aria-expanded="${(0, e.ifDefined)(
              a.accInfo.ariaExpanded
            )}" aria-controls="${(0, e.ifDefined)(a.accInfo.ariaControls)}" aria-labelledby="${(0, e.ifDefined)(
              a.accInfo.ariaLabelledby
            )}">${a.fixed ? void 0 : i(a, t, n)}${
              a._hasHeader ? d(a, t, n) : r(a, t, n)
            }</div><!-- content area --><div class="ui5-panel-content" id="${(0, e.ifDefined)(
              a._id
            )}-content" tabindex="-1" style="${(0, e.styleMap)(
              a.styles.content
            )}" part="content"><slot></slot></div></div>`,
          i = (a, i, d) =>
            e.html`<div class="ui5-panel-header-button-root">${a._hasHeader ? t(a, i, d) : n(a, i, d)}</div>`,
          t = (a, i, t) =>
            e.html`<${(0, e.scopeTag)("ui5-button", i, t)} design="Transparent" class="ui5-panel-header-button ${(0,
            e.classMap)(a.classes.headerBtn)}" icon="slim-arrow-right" @click="${
              a._toggleButtonClick
            }" ._buttonAccInfo="${(0, e.ifDefined)(a.accInfo.button)}" accessible-name="${(0, e.ifDefined)(
              a.accInfo.button.ariaLabelButton
            )}"></${(0, e.scopeTag)("ui5-button", i, t)}>`,
          n = (a, i, t) =>
            e.html`<${(0, e.scopeTag)("ui5-icon", i, t)} class="ui5-panel-header-button ui5-panel-header-icon ${(0,
            e.classMap)(a.classes.headerBtn)}" name="slim-arrow-right"></${(0, e.scopeTag)("ui5-icon", i, t)}>`,
          d = (a, i, t) => e.html`<slot name="header"></slot>`,
          r = (a, i, t) =>
            e.html`<div id="${(0, e.ifDefined)(a._id)}-header-title" role="heading" aria-level="${(0, e.ifDefined)(
              a.headerAriaLevel
            )}" class="ui5-panel-header-title">${(0, e.ifDefined)(a.headerText)}</div>`;
        var l = a;
        exports.default = l;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    m67c: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          r = t(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          o = t(require("./sap_fiori_3/parameters-bundle.css.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => r.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => o.default);
        var a = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/Panel.css",
          content:
            '.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:block}:host{font-family:"72override",var(--sapFontFamily);background-color:var(--_ui5_panel_background_color);border-radius:var(--_ui5_panel_border_radius);border-bottom:var(--_ui5_panel_border_bottom)}:host([fixed]) .ui5-panel-header{padding-left:1rem}.ui5-panel-header{height:var(--_ui5_panel_header_height);width:100%;display:flex;justify-content:flex-start;align-items:center;outline:none;box-sizing:border-box;padding-right:1rem;padding-left:.25rem;border-bottom:1px solid transparent}.ui5-panel-header-icon{color:var(--sapContent_IconColor)}.ui5-panel-header-button-animated{transition:transform .4s ease-out}:host(:not([_has-header])) .ui5-panel-header-button{pointer-events:none}:host(:not([_has-header]):not([fixed])){cursor:pointer}:host(:not([_has-header]):not([fixed])) .ui5-panel-header:focus{outline:var(--_ui5_panel_focus_border);outline-offset:var(--_ui5_panel_outline_offset);border-radius:var(--_ui5_panel_border_radius)}:host(:not([collapsed]):not([_has-header]):not([fixed])) .ui5-panel-header:focus{border-radius:var(--_ui5_panel_border_radius_expanded)}:host(:not([collapsed])) .ui5-panel-header-button{transform:rotate(90deg)}:host([fixed]) .ui5-panel-header-title{width:100%}.ui5-panel-header-title{width:calc(100% - var(--_ui5_panel_button_root_width));overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:"72override",var(--sapFontHeaderFamily);font-size:var(--sapFontHeader5Size);font-weight:400;color:var(--sapGroup_TitleTextColor);font-weight:var(--_ui5_panel_title_font_weight)}.ui5-panel-content{padding:.625rem 1rem 1.375rem 1rem;background-color:var(--sapGroup_ContentBackground);outline:none;border-bottom-left-radius:var(--_ui5_panel_border_radius);border-bottom-right-radius:var(--_ui5_panel_border_radius)}.ui5-panel-header-button-root{display:flex;justify-content:center;align-items:center;flex-shrink:0;width:var(--_ui5_panel_button_root_width);margin-right:.25rem}:host([fixed]:not([collapsed]):not([_has-header])) .ui5-panel-header{border-bottom:.0625rem solid var(--sapGroup_TitleBorderColor)}',
        };
        exports.default = a;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    Yg41: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = p(require("@ui5/webcomponents-base/dist/UI5Element.js")),
          t = p(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js")),
          n = p(require("@ui5/webcomponents-base/dist/animations/slideDown.js")),
          i = p(require("@ui5/webcomponents-base/dist/animations/slideUp.js")),
          s = require("@ui5/webcomponents-base/dist/Keys.js"),
          a = p(require("@ui5/webcomponents-base/dist/types/AnimationMode.js")),
          r = require("@ui5/webcomponents-base/dist/config/AnimationMode.js"),
          o = require("@ui5/webcomponents-base/dist/i18nBundle.js");
        require("@ui5/webcomponents-icons/dist/slim-arrow-right.js");
        var l = p(require("./Button.js")),
          d = p(require("./types/TitleLevel.js")),
          u = p(require("./types/PanelAccessibleRole.js")),
          h = p(require("./generated/templates/PanelTemplate.lit.js")),
          c = require("./generated/i18n/i18n-defaults.js"),
          g = p(require("./generated/themes/Panel.css.js"));
        function p(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const m = {
          tag: "ui5-panel",
          languageAware: !0,
          managedSlots: !0,
          slots: { header: { type: HTMLElement }, default: { type: HTMLElement } },
          properties: {
            headerText: { type: String },
            fixed: { type: Boolean },
            collapsed: { type: Boolean },
            noAnimation: { type: Boolean },
            accessibleRole: { type: u.default, defaultValue: u.default.Form },
            headerLevel: { type: d.default, defaultValue: d.default.H2 },
            accessibleName: { type: String },
            useAccessibleNameForToggleButton: { type: Boolean },
            _hasHeader: { type: Boolean },
            _header: { type: Object },
            _contentExpanded: { type: Boolean, noAttribute: !0 },
            _animationRunning: { type: Boolean, noAttribute: !0 },
            _buttonAccInfo: { type: Object },
          },
          events: { toggle: {} },
        };
        class b extends e.default {
          static get metadata() {
            return m;
          }
          static get render() {
            return t.default;
          }
          static get template() {
            return h.default;
          }
          static get styles() {
            return g.default;
          }
          constructor() {
            super(), (this._header = {});
          }
          onBeforeRendering() {
            this._animationRunning || (this._contentExpanded = !this.collapsed),
              (this._hasHeader = !!this.header.length);
          }
          shouldToggle(e) {
            return !this.header.length || e.classList.contains("ui5-panel-header-button");
          }
          shouldNotAnimate() {
            return this.noAnimation || (0, r.getAnimationMode)() === a.default.None;
          }
          _headerClick(e) {
            this.shouldToggle(e.target) && this._toggleOpen();
          }
          _toggleButtonClick(e) {
            0 === e.x && 0 === e.y && e.stopImmediatePropagation();
          }
          _headerKeyDown(e) {
            this.shouldToggle(e.target) &&
              ((0, s.isEnter)(e) && this._toggleOpen(), (0, s.isSpace)(e) && e.preventDefault());
          }
          _headerKeyUp(e) {
            this.shouldToggle(e.target) && (0, s.isSpace)(e) && this._toggleOpen();
          }
          _toggleOpen() {
            if (this.fixed) return;
            if (((this.collapsed = !this.collapsed), this.shouldNotAnimate())) return void this.fireEvent("toggle");
            this._animationRunning = !0;
            const e = this.getDomRef().querySelectorAll(".ui5-panel-content"),
              t = [];
            [].forEach.call(e, (e) => {
              this.collapsed
                ? t.push((0, i.default)({ element: e }).promise())
                : t.push((0, n.default)({ element: e }).promise());
            }),
              Promise.all(t).then((e) => {
                (this._animationRunning = !1), (this._contentExpanded = !this.collapsed), this.fireEvent("toggle");
              });
          }
          _headerOnTarget(e) {
            return e.classList.contains("sapMPanelWrappingDiv");
          }
          get classes() {
            return { headerBtn: { "ui5-panel-header-button-animated": !this.shouldNotAnimate() } };
          }
          get toggleButtonTitle() {
            return b.i18nBundle.getText(c.PANEL_ICON);
          }
          get expanded() {
            return !this.collapsed;
          }
          get accRole() {
            return this.accessibleRole.toLowerCase();
          }
          get effectiveAccessibleName() {
            return "string" == typeof this.accessibleName && this.accessibleName.length ? this.accessibleName : void 0;
          }
          get accInfo() {
            return {
              button: {
                ariaExpanded: this.expanded,
                ariaControls: `${this._id}-content`,
                title: this.toggleButtonTitle,
                ariaLabelButton:
                  !this.nonFocusableButton && this.useAccessibleNameForToggleButton
                    ? this.effectiveAccessibleName
                    : void 0,
              },
              ariaExpanded: this.nonFixedInternalHeader ? this.expanded : void 0,
              ariaControls: this.nonFixedInternalHeader ? `${this._id}-content` : void 0,
              ariaLabelledby: this.nonFocusableButton ? this.ariaLabelledbyReference : void 0,
              role: this.nonFixedInternalHeader ? "button" : void 0,
            };
          }
          get ariaLabelledbyReference() {
            return this.nonFocusableButton && this.headerText ? `${this._id}-header-title` : void 0;
          }
          get header() {
            return this.getDomRef().querySelector(`#${this._id}-header-title`);
          }
          get headerAriaLevel() {
            return this.headerLevel.slice(1);
          }
          get headerTabIndex() {
            return this.header.length || this.fixed ? "-1" : "0";
          }
          get nonFixedInternalHeader() {
            return !this._hasHeader && !this.fixed;
          }
          get nonFocusableButton() {
            return !this.header.length;
          }
          get shouldRenderH1() {
            return !this.header.length && (this.headerText || !this.fixed);
          }
          get styles() {
            return { content: { display: this._contentExpanded ? "block" : "none" } };
          }
          static get dependencies() {
            return [l.default];
          }
          static async onDefine() {
            b.i18nBundle = await (0, o.getI18nBundle)("@ui5/webcomponents");
          }
        }
        b.define();
        var f = b;
        exports.default = f;
      },
      {
        "@ui5/webcomponents-base/dist/UI5Element.js": "Kogr",
        "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG",
        "@ui5/webcomponents-base/dist/animations/slideDown.js": "bDoo",
        "@ui5/webcomponents-base/dist/animations/slideUp.js": "iIHK",
        "@ui5/webcomponents-base/dist/Keys.js": "glQL",
        "@ui5/webcomponents-base/dist/types/AnimationMode.js": "xc5H",
        "@ui5/webcomponents-base/dist/config/AnimationMode.js": "B6P1",
        "@ui5/webcomponents-base/dist/i18nBundle.js": "F4Ye",
        "@ui5/webcomponents-icons/dist/slim-arrow-right.js": "TK0l",
        "./Button.js": "PQe6",
        "./types/TitleLevel.js": "nuHb",
        "./types/PanelAccessibleRole.js": "JCWs",
        "./generated/templates/PanelTemplate.lit.js": "z2YH",
        "./generated/i18n/i18n-defaults.js": "XB3p",
        "./generated/themes/Panel.css.js": "m67c",
      },
    ],
    GezM: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const s = (s, i, r) =>
          e.html`<label class="ui5-label-root" dir="${(0, e.ifDefined)(s.effectiveDir)}" @click=${s._onclick} for="${(0,
          e.ifDefined)(s.for)}"><span class="${(0, e.classMap)(s.classes.textWrapper)}"><bdi id="${(0, e.ifDefined)(
            s._id
          )}-bdi"><slot></slot></bdi></span><span class="ui5-label-required-colon"></span></label>`;
        var i = s;
        exports.default = i;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    T6UX: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          r = o(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          t = o(require("./sap_fiori_3/parameters-bundle.css.js"));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => r.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => t.default);
        var i = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/Label.css",
          content:
            ':host(:not([hidden])){display:inline-flex}:host{max-width:100%;color:var(--sapContent_LabelColor);font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSize);font-weight:400;cursor:text}.ui5-label-root{width:100%;cursor:inherit}:host([wrapping-type=Normal]) .ui5-label-root{white-space:normal}:host(:not([wrapping-type=Normal])) .ui5-label-root{display:inline-block;white-space:nowrap}bdi{content:"";padding-right:.075rem}:host(:not([wrapping-type=Normal])) .ui5-label-text-wrapper{text-overflow:ellipsis;overflow:hidden;display:inline-block;vertical-align:top;max-width:100%}:host(:not([wrapping-type=Normal])[required][show-colon]) .ui5-label-text-wrapper,:host(:not([wrapping-type=Normal])[required][show-colon]) .ui5-label-text-wrapper.ui5-label-text-wrapper-safari{max-width:calc(100% - .8rem)}:host(:not([wrapping-type=Normal])[required]) .ui5-label-text-wrapper{max-width:calc(100% - .475rem)}:host(:not([wrapping-type=Normal])[required]) .ui5-label-text-wrapper.ui5-label-text-wrapper-safari{max-width:calc(100% - .425rem)}:host(:not([wrapping-type=Normal])[show-colon]) .ui5-label-text-wrapper{max-width:calc(100% - .125rem)}:host([show-colon]) .ui5-label-required-colon{margin-left:-.05rem}:host([show-colon]) .ui5-label-required-colon:before{content:":"}:host([required]) .ui5-label-required-colon:after{content:"*";color:var(--sapField_RequiredColor);font-size:1.25rem;font-weight:700;position:relative;font-style:normal;vertical-align:middle;line-height:0}:host([required][show-colon]) .ui5-label-required-colon:after{margin-right:0;margin-left:.125rem}:host([required][show-colon]) [dir=rtl] .ui5-label-required-colon:after{margin-right:.125rem;margin-left:0}',
        };
        exports.default = i;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    CXe7: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = i(require("@ui5/webcomponents-base/dist/UI5Element.js")),
          t = i(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js")),
          r = require("@ui5/webcomponents-base/dist/Device.js"),
          a = i(require("./types/WrappingType.js")),
          s = i(require("./generated/templates/LabelTemplate.lit.js")),
          u = i(require("./generated/themes/Label.css.js"));
        function i(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const l = {
          tag: "ui5-label",
          properties: {
            required: { type: Boolean },
            wrappingType: { type: a.default, defaultValue: a.default.None },
            showColon: { type: Boolean },
            for: { type: String },
          },
          slots: { default: { type: Node } },
        };
        class n extends e.default {
          static get metadata() {
            return l;
          }
          static get render() {
            return t.default;
          }
          static get template() {
            return s.default;
          }
          static get styles() {
            return u.default;
          }
          get classes() {
            return {
              textWrapper: { "ui5-label-text-wrapper": !0, "ui5-label-text-wrapper-safari": (0, r.isSafari)() },
            };
          }
          _onclick() {
            const e = document.getElementById(this.for);
            e && e.focus();
          }
        }
        n.define();
        var o = n;
        exports.default = o;
      },
      {
        "@ui5/webcomponents-base/dist/UI5Element.js": "Kogr",
        "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG",
        "@ui5/webcomponents-base/dist/Device.js": "Oq9i",
        "./types/WrappingType.js": "kicx",
        "./generated/templates/LabelTemplate.lit.js": "GezM",
        "./generated/themes/Label.css.js": "T6UX",
      },
    ],
    C7rv: [
      function (require, module, exports) {
        "use strict";
        let e;
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.setResizeHandlerUnobserveFn = exports.setResizeHandlerObserveFn = exports.default = void 0);
        const t = new Map(),
          s = () => (
            e ||
              (e = new window.ResizeObserver((e) => {
                e.forEach((e) => {
                  t.get(e.target).forEach((e) => e());
                });
              })),
            e
          );
        let n = (e, n) => {
            const r = t.get(e) || [];
            r.length || s().observe(e), t.set(e, [...r, n]);
          },
          r = (e, n) => {
            const r = t.get(e) || [];
            if (0 === r.length) return;
            const o = r.filter((e) => e !== n);
            0 === o.length ? (s().unobserve(e), t.delete(e)) : t.set(e, o);
          };
        class o {
          static register(e, t) {
            e.isUI5Element && (e = e.getDomRef()),
              e instanceof HTMLElement ? n(e, t) : console.warn("Cannot register ResizeHandler for element", e);
          }
          static deregister(e, t) {
            e.isUI5Element && (e = e.getDomRef()),
              e instanceof HTMLElement ? r(e, t) : console.warn("Cannot deregister ResizeHandler for element", e);
          }
        }
        const l = (e) => {
          n = e;
        };
        exports.setResizeHandlerObserveFn = l;
        const a = (e) => {
          r = e;
        };
        exports.setResizeHandlerUnobserveFn = a;
        var i = o;
        exports.default = i;
      },
      {},
    ],
    rs1i: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = r(require("./DataType.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const t = { None: "None", Success: "Success", Warning: "Warning", Error: "Error", Information: "Information" };
        class s extends e.default {
          static isValid(e) {
            return !!t[e];
          }
        }
        s.generateTypeAccessors(t);
        var n = s;
        exports.default = n;
      },
      { "./DataType.js": "bqvp" },
    ],
    y11y: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("./DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        class r extends e.default {
          static isValid(e) {
            return Number.isInteger(e);
          }
          static attributeToProperty(e) {
            return parseInt(e);
          }
        }
        var s = r;
        exports.default = s;
      },
      { "./DataType.js": "bqvp" },
    ],
    TK1S: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = (e) => {
          if (!(e instanceof HTMLElement)) throw new Error("Argument node should be of type HTMLElement");
          const t = [HTMLHtmlElement, HTMLIFrameElement];
          let o = !0,
            r = !0;
          for (; e; ) {
            if ("[object ShadowRoot]" === e.toString()) {
              if ((o && (o = !1), !r && !o)) return e;
            } else if (e.tagName && e.tagName.indexOf("-") > -1) {
              if (!r) return e;
              r = !1;
            } else if (t.indexOf(e.constructor) > -1) return e;
            e = e.parentNode || e.host;
          }
        };
        var t = e;
        exports.default = t;
      },
      {},
    ],
    OuVZ: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.getEffectiveAriaLabelText = exports.getAriaLabelledByTexts = void 0);
        var e = t(require("./findNodeOwner.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = (e) => (e.accessibleNameRef ? r(e) : e.accessibleName ? e.accessibleName : void 0);
        exports.getEffectiveAriaLabelText = s;
        const r = (t, s, r = "") => {
          const a = (r && r.split(" ")) || t.accessibleNameRef.split(" "),
            i = s || (0, e.default)(t);
          let l = "";
          return (
            a.forEach((e, t) => {
              const s = i.querySelector(`[id='${e}']`);
              (l += `${s ? s.textContent : ""}`), t < a.length - 1 && (l += " ");
            }),
            l
          );
        };
        exports.getAriaLabelledByTexts = r;
      },
      { "./findNodeOwner.js": "TK1S" },
    ],
    czLi: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.setCaretPosition = exports.getCaretPosition = void 0);
        const e = (e) => {
          let t = 0;
          if (document.selection) {
            e.focus();
            const o = document.selection.createRange();
            o.moveStart("character", -e.value.length), (t = o.text.length);
          } else
            (e.selectionStart || "0" === e.selectionStart) &&
              (t = "backward" === e.selectionDirection ? e.selectionStart : e.selectionEnd);
          return t;
        };
        exports.getCaretPosition = e;
        const t = (e, t) => {
          if (e.createTextRange) {
            const o = e.createTextRange();
            o.move("character", t), o.select();
          } else e.selectionStart ? (e.focus(), e.setSelectionRange(t, t)) : e.focus();
        };
        exports.setCaretPosition = t;
      },
      {},
    ],
    U0YU: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.ICON_ZOOM_OUT = exports.ICON_ZOOM_IN = exports.ICON_UPLOAD = exports.ICON_UP = exports.ICON_UNDO = exports.ICON_SYNCHRONIZE = exports.ICON_SORT_DESCENDING = exports.ICON_SORT_ASCENDING = exports.ICON_SORT = exports.ICON_SHOW = exports.ICON_SETTINGS = exports.ICON_SEARCH = exports.ICON_SAVE = exports.ICON_RESPONSE = exports.ICON_RESIZE_VERTICAL = exports.ICON_RESIZE_HORIZONTAL = exports.ICON_RESIZE = exports.ICON_REFRESH = exports.ICON_REDO = exports.ICON_OVERFLOW = exports.ICON_NAV_BACK = exports.ICON_MULTI_SELECT = exports.ICON_MOVE = exports.ICON_MESSAGE_WARNING = exports.ICON_MESSAGE_SUCCESS = exports.ICON_MESSAGE_INFORMATION = exports.ICON_MESSAGE_ERROR = exports.ICON_LAPTOP = exports.ICON_IPHONE = exports.ICON_IPAD = exports.ICON_HIDE = exports.ICON_GROUP_2 = exports.ICON_GENERATE_SHORTCUT = exports.ICON_FULL_SCREEN = exports.ICON_FORWARD = exports.ICON_FLAG = exports.ICON_FILTER = exports.ICON_EXPAND_GROUP = exports.ICON_EXPAND = exports.ICON_EXIT_FULL_SCREEN = exports.ICON_ERROR = exports.ICON_DRILL_UP = exports.ICON_DRILL_DOWN = exports.ICON_DOWNLOAD = exports.ICON_DOWN = exports.ICON_DISPLAY = exports.ICON_DELETE = exports.ICON_DECLINE = exports.ICON_CROP = exports.ICON_COLLAPSE_GROUP = exports.ICON_COLLAPSE = exports.ICON_BACK_TO_TOP = exports.ICON_ADD_PHOTO = exports.ICON_ADD_FILTER = exports.ICON_ADD_CONTACT = exports.ICON_ADD = exports.ICON_ACTIVATE = exports.ICON_ACTION_SETTINGS = void 0);
        const e = { key: "ICON_ACTION_SETTINGS", defaultText: "Settings" };
        exports.ICON_ACTION_SETTINGS = e;
        const t = { key: "ICON_ACTIVATE", defaultText: "Activate" };
        exports.ICON_ACTIVATE = t;
        const O = { key: "ICON_ADD", defaultText: "Add" };
        exports.ICON_ADD = O;
        const N = { key: "ICON_ADD_CONTACT", defaultText: "Add Contact" };
        exports.ICON_ADD_CONTACT = N;
        const I = { key: "ICON_ADD_FILTER", defaultText: "Add Filter" };
        exports.ICON_ADD_FILTER = I;
        const _ = { key: "ICON_ADD_PHOTO", defaultText: "Add Photo" };
        exports.ICON_ADD_PHOTO = _;
        const C = { key: "ICON_BACK_TO_TOP", defaultText: "Back to Top" };
        exports.ICON_BACK_TO_TOP = C;
        const o = { key: "ICON_COLLAPSE", defaultText: "Collapse" };
        exports.ICON_COLLAPSE = o;
        const s = { key: "ICON_COLLAPSE_GROUP", defaultText: "Collapse Group" };
        exports.ICON_COLLAPSE_GROUP = s;
        const x = { key: "ICON_CROP", defaultText: "Crop" };
        exports.ICON_CROP = x;
        const E = { key: "ICON_DECLINE", defaultText: "Decline" };
        exports.ICON_DECLINE = E;
        const r = { key: "ICON_DELETE", defaultText: "Delete" };
        exports.ICON_DELETE = r;
        const T = { key: "ICON_DISPLAY", defaultText: "Display" };
        exports.ICON_DISPLAY = T;
        const p = { key: "ICON_DOWN", defaultText: "Down" };
        exports.ICON_DOWN = p;
        const S = { key: "ICON_DOWNLOAD", defaultText: "Download" };
        exports.ICON_DOWNLOAD = S;
        const R = { key: "ICON_DRILL_DOWN", defaultText: "Drill Down" };
        exports.ICON_DRILL_DOWN = R;
        const A = { key: "ICON_DRILL_UP", defaultText: "Drill Up" };
        exports.ICON_DRILL_UP = A;
        const D = { key: "ICON_ERROR", defaultText: "Error" };
        exports.ICON_ERROR = D;
        const l = { key: "ICON_EXIT_FULL_SCREEN", defaultText: "Exit Full Screen" };
        exports.ICON_EXIT_FULL_SCREEN = l;
        const n = { key: "ICON_EXPAND", defaultText: "Expand" };
        exports.ICON_EXPAND = n;
        const a = { key: "ICON_EXPAND_GROUP", defaultText: "Expand Group" };
        exports.ICON_EXPAND_GROUP = a;
        const d = { key: "ICON_FILTER", defaultText: "Filter" };
        exports.ICON_FILTER = d;
        const L = { key: "ICON_FLAG", defaultText: "Flag" };
        exports.ICON_FLAG = L;
        const c = { key: "ICON_FORWARD", defaultText: "Forward" };
        exports.ICON_FORWARD = c;
        const u = { key: "ICON_FULL_SCREEN", defaultText: "Enter Full Screen" };
        exports.ICON_FULL_SCREEN = u;
        const y = { key: "ICON_GENERATE_SHORTCUT", defaultText: "Create Shortcut" };
        exports.ICON_GENERATE_SHORTCUT = y;
        const f = { key: "ICON_GROUP_2", defaultText: "Group" };
        exports.ICON_GROUP_2 = f;
        const k = { key: "ICON_HIDE", defaultText: "Hide" };
        exports.ICON_HIDE = k;
        const P = { key: "ICON_IPAD", defaultText: "Tablet" };
        exports.ICON_IPAD = P;
        const G = { key: "ICON_IPHONE", defaultText: "Phone" };
        exports.ICON_IPHONE = G;
        const U = { key: "ICON_LAPTOP", defaultText: "Laptop" };
        exports.ICON_LAPTOP = U;
        const F = { key: "ICON_MESSAGE_ERROR", defaultText: "Error" };
        exports.ICON_MESSAGE_ERROR = F;
        const M = { key: "ICON_MESSAGE_INFORMATION", defaultText: "Information" };
        exports.ICON_MESSAGE_INFORMATION = M;
        const H = { key: "ICON_MESSAGE_SUCCESS", defaultText: "Successful" };
        exports.ICON_MESSAGE_SUCCESS = H;
        const i = { key: "ICON_MESSAGE_WARNING", defaultText: "Warning" };
        exports.ICON_MESSAGE_WARNING = i;
        const Z = { key: "ICON_MOVE", defaultText: "Move" };
        exports.ICON_MOVE = Z;
        const W = { key: "ICON_MULTI_SELECT", defaultText: "Multi Select" };
        exports.ICON_MULTI_SELECT = W;
        const V = { key: "ICON_NAV_BACK", defaultText: "Navigate Back" };
        exports.ICON_NAV_BACK = V;
        const X = { key: "ICON_OVERFLOW", defaultText: "More" };
        exports.ICON_OVERFLOW = X;
        const B = { key: "ICON_REDO", defaultText: "Redo" };
        exports.ICON_REDO = B;
        const g = { key: "ICON_REFRESH", defaultText: "Refresh" };
        exports.ICON_REFRESH = g;
        const h = { key: "ICON_RESIZE", defaultText: "Resize" };
        exports.ICON_RESIZE = h;
        const v = { key: "ICON_RESIZE_HORIZONTAL", defaultText: "Resize Horizontally" };
        exports.ICON_RESIZE_HORIZONTAL = v;
        const K = { key: "ICON_RESIZE_VERTICAL", defaultText: "Resize Vertically" };
        exports.ICON_RESIZE_VERTICAL = K;
        const Y = { key: "ICON_RESPONSE", defaultText: "Reply" };
        exports.ICON_RESPONSE = Y;
        const w = { key: "ICON_SAVE", defaultText: "Save" };
        exports.ICON_SAVE = w;
        const z = { key: "ICON_SEARCH", defaultText: "Search" };
        exports.ICON_SEARCH = z;
        const m = { key: "ICON_SETTINGS", defaultText: "Settings" };
        exports.ICON_SETTINGS = m;
        const b = { key: "ICON_SHOW", defaultText: "Show" };
        exports.ICON_SHOW = b;
        const j = { key: "ICON_SORT", defaultText: "Sort" };
        exports.ICON_SORT = j;
        const q = { key: "ICON_SORT_ASCENDING", defaultText: "Sort Ascending" };
        exports.ICON_SORT_ASCENDING = q;
        const J = { key: "ICON_SORT_DESCENDING", defaultText: "Sort Descending" };
        exports.ICON_SORT_DESCENDING = J;
        const Q = { key: "ICON_SYNCHRONIZE", defaultText: "Synchronize" };
        exports.ICON_SYNCHRONIZE = Q;
        const $ = { key: "ICON_UNDO", defaultText: "Undo" };
        exports.ICON_UNDO = $;
        const ee = { key: "ICON_UP", defaultText: "Up" };
        exports.ICON_UP = ee;
        const te = { key: "ICON_UPLOAD", defaultText: "Upload" };
        exports.ICON_UPLOAD = te;
        const Oe = { key: "ICON_ZOOM_IN", defaultText: "Zoom In" };
        exports.ICON_ZOOM_IN = Oe;
        const Ne = { key: "ICON_ZOOM_OUT", defaultText: "Zoom Out" };
        exports.ICON_ZOOM_OUT = Ne;
      },
      {},
    ],
    JF0z: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js"),
          t = require("../generated/i18n/i18n-defaults.js");
        const s = "decline",
          a =
            "M452.5 417c8 7 12 17 12 26s-4 19-12 26c-7 8-17 12-26 12s-19-4-26-12l-144-143-145 143c-8 8-17 12-26 12-10 0-19-4-27-12-7-7-11-17-11-26s4-19 11-26l145-143-145-146c-7-8-11-17-11-26 0-10 4-19 11-27 8-7 17-11 27-11 9 0 18 4 26 11l145 146 144-146c7-7 17-11 26-11 10 0 19 4 26 11 8 8 12 17 12 27 0 9-4 18-12 26l-144 146z",
          c = !1,
          r = t.ICON_DECLINE,
          i = "SAP-icons-v5",
          o = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(s, { pathData: a, ltr: !1, accData: r, collection: i, packageName: o });
        var n = { pathData: a, accData: r };
        exports.default = n;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB",
        "../generated/i18n/i18n-defaults.js": "U0YU",
      },
    ],
    rIuh: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js"),
          t = require("../generated/i18n/i18n-defaults.js");
        const a = "decline",
          s =
            "M86 109l22-23q5-5 12-5 6 0 11 5l124 125L380 86q5-5 11-5 7 0 12 5l22 23q12 11 0 23L301 256l124 125q11 11 0 22l-22 23q-8 5-12 5-3 0-11-5L255 301 131 426q-5 5-11 5-4 0-12-5l-22-23q-11-11 0-22l124-125L86 132q-12-12 0-23z",
          r = !1,
          c = t.ICON_DECLINE,
          i = "SAP-icons",
          o = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(a, { pathData: s, ltr: !1, accData: c, collection: i, packageName: o });
        var l = { pathData: s, accData: c };
        exports.default = l;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB",
        "../generated/i18n/i18n-defaults.js": "U0YU",
      },
    ],
    vj7t: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/config/Theme.js"),
          t = s(require("./v5/decline.js")),
          r = s(require("./v4/decline.js"));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const u = (0, e.isTheme)("sap_horizon") ? r.default : t.default;
        var i = { pathData: u };
        exports.default = i;
      },
      { "@ui5/webcomponents-base/dist/config/Theme.js": "b5d6", "./v5/decline.js": "JF0z", "./v4/decline.js": "rIuh" },
    ],
    GizD: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const t = "not-editable",
          c =
            "M87.5 397l41 41 130-130-41-41zm-30-363l434 434c5 5 7 12 7 18 0 16-11 26-26 26-6 0-13-2-18-7l-160-161-148 148c-5 5-11 7-18 7h-77c-14 0-25-11-25-25v-77c0-7 2-13 7-18l148-148-161-160c-5-5-7-12-7-18 0-16 11-26 26-26 6 0 13 2 18 7zm367 108l-41-41-40 41 40 40zm-117 36l-10 9c-5 5-11 8-18 8-14 0-25-12-25-26 0-7 2-13 7-18l104-104c5-5 12-7 18-7 7 0 13 2 18 7l77 77c5 5 7 11 7 18 0 6-2 13-7 18l-104 104c-5 5-11 7-18 7-14 0-26-11-26-25 0-7 3-13 8-18l9-10z",
          s = !1,
          l = "SAP-icons-v5",
          o = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(t, { pathData: c, ltr: !1, collection: l, packageName: o });
        var a = { pathData: c };
        exports.default = a;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    iztI: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const t = "not-editable",
          s = "",
          o = !1,
          a = "SAP-icons",
          r = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(t, { pathData: "", ltr: !1, collection: a, packageName: r });
        var i = { pathData: "" };
        exports.default = i;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    GIi0: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/config/Theme.js"),
          t = o(require("./v5/not-editable.js")),
          r = o(require("./v4/not-editable.js"));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = (0, e.isTheme)("sap_horizon") ? r.default : t.default;
        var a = { pathData: s };
        exports.default = a;
      },
      {
        "@ui5/webcomponents-base/dist/config/Theme.js": "b5d6",
        "./v5/not-editable.js": "GizD",
        "./v4/not-editable.js": "iztI",
      },
    ],
    pDiJ: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = s(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const t = { Text: "Text", Email: "Email", Number: "Number", Password: "Password", Tel: "Tel", URL: "URL" };
        class r extends e.default {
          static isValid(e) {
            return !!t[e];
          }
        }
        r.generateTypeAccessors(t);
        var a = r;
        exports.default = a;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    U0bv: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = () => {
          let e = document.activeElement;
          for (; e && e.shadowRoot && e.shadowRoot.activeElement; ) e = e.shadowRoot.activeElement;
          return e;
        };
        var t = e;
        exports.default = t;
      },
      {},
    ],
    phX0: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.isFocusedElementWithinNode = exports.isClickInRect = exports.getNextZIndex = exports.getFocusedElement = exports.getCurrentZIndex = exports.getClosedPopupParent = void 0);
        var e = n(require("../getSharedResource.js")),
          t = require("../FeaturesRegistry.js"),
          o = n(require("./getActiveElement.js"));
        function n(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const r = (0, e.default)("PopupUtilsData", {});
        r.currentZIndex = r.currentZIndex || 100;
        const s = () => {
          const e = (0, o.default)();
          return e && "function" == typeof e.focus ? e : null;
        };
        exports.getFocusedElement = s;
        const c = (e) => {
          const t = s();
          return !!t && u(e, t);
        };
        exports.isFocusedElementWithinNode = c;
        const u = (e, t) => {
            let o = e;
            if ((o.shadowRoot && (o = Array.from(o.shadowRoot.children).find((e) => "style" !== e.localName)), o === t))
              return !0;
            const n = "slot" === o.localName ? o.assignedNodes() : o.children;
            return n ? Array.from(n).some((e) => u(e, t)) : void 0;
          },
          d = (e, t, o) => e >= o.left && e <= o.right && t >= o.top && t <= o.bottom,
          l = (e, t) => {
            let o, n;
            if (e.touches) {
              const t = e.touches[0];
              (o = t.clientX), (n = t.clientY);
            } else (o = e.clientX), (n = e.clientY);
            return d(o, n, t);
          };
        exports.isClickInRect = l;
        const i = (e) => {
          const t = e.parentElement || (e.getRootNode && e.getRootNode().host);
          return t && ((t.showAt && t.isUI5Element) || (t.open && t.isUI5Element) || t === document.documentElement)
            ? t
            : i(t);
        };
        exports.getClosedPopupParent = i;
        const p = () => {
          const e = (0, t.getFeature)("OpenUI5Support");
          return e && e.isLoaded() ? e.getNextZIndex() : ((r.currentZIndex += 2), r.currentZIndex);
        };
        exports.getNextZIndex = p;
        const x = () => r.currentZIndex;
        exports.getCurrentZIndex = x;
      },
      { "../getSharedResource.js": "bZie", "../FeaturesRegistry.js": "rnHX", "./getActiveElement.js": "U0bv" },
    ],
    seOl: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = (e, t, a) => Math.min(Math.max(e, t), a);
        var t = e;
        exports.default = t;
      },
      {},
    ],
    Qfq4: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = (e) =>
          "SLOT" !== e.nodeName && ((e.offsetWidth <= 0 && e.offsetHeight <= 0) || "hidden" === e.style.visibility);
        var t = e;
        exports.default = t;
      },
      {},
    ],
    Fq9x: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = /^(?:a|area)$/i,
          t = /^(?:input|select|textarea|button)$/i,
          r = (r) => {
            if (r.disabled) return !1;
            const a = r.getAttribute("tabindex");
            return null != a ? parseInt(a) >= 0 : t.test(r.nodeName) || (e.test(r.nodeName) && r.href);
          };
        var a = r;
        exports.default = a;
      },
      {},
    ],
    PrQ6: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.getLastFocusableElement = exports.getFirstFocusableElement = void 0);
        var e = s(require("./isNodeHidden.js")),
          t = s(require("./isNodeClickable.js"));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const o = (e) => e.hasAttribute("data-ui5-focus-trap"),
          l = async (t) => (!t || (0, e.default)(t) ? null : u(t, !0));
        exports.getFirstFocusableElement = l;
        const i = async (t) => (!t || (0, e.default)(t) ? null : u(t, !1));
        exports.getLastFocusableElement = i;
        const n = (t) => t.hasAttribute("data-ui5-focus-redirect") || !(0, e.default)(t),
          u = async (e, s) => {
            let l, i;
            if (e.shadowRoot) l = s ? e.shadowRoot.firstChild : e.shadowRoot.lastChild;
            else if (e.assignedNodes && e.assignedNodes()) {
              const t = e.assignedNodes();
              l = s ? t[0] : t[t.length - 1];
            } else l = s ? e.firstChild : e.lastChild;
            for (; l; ) {
              const e = l;
              if ((l.isUI5Element && (l = await l.getFocusDomRefAsync()), !l)) return null;
              if (1 === l.nodeType && n(l) && !o(l)) {
                if ((0, t.default)(l)) return l && "function" == typeof l.focus ? l : null;
                if ((i = await u(l, s))) return i && "function" == typeof i.focus ? i : null;
              }
              l = s ? e.nextSibling : e.previousSibling;
            }
            return null;
          };
      },
      { "./isNodeHidden.js": "Qfq4", "./isNodeClickable.js": "Fq9x" },
    ],
    GcCn: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const s = (s, a, o) =>
          e.html`<section style="${(0, e.styleMap)(s.styles.root)}" class="${(0, e.classMap)(
            s.classes.root
          )}" role="dialog" aria-modal="${(0, e.ifDefined)(s._ariaModal)}" aria-label="${(0, e.ifDefined)(
            s._ariaLabel
          )}" aria-labelledby="${(0, e.ifDefined)(s._ariaLabelledBy)}" dir="${(0, e.ifDefined)(
            s.effectiveDir
          )}" @keydown=${s._onkeydown} @focusout=${s._onfocusout} @mouseup=${s._onmouseup} @mousedown=${
            s._onmousedown
          }><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${s.forwardToLast}></span><div style="${(0,
          e.styleMap)(s.styles.content)}" class="${(0, e.classMap)(s.classes.content)}"  @scroll="${
            s._scroll
          }"><slot></slot></div><span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${
            s.forwardToFirst
          }></span></section> `;
        var a = s;
        exports.default = a;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    Ff0d: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const r = (r, s, t) =>
          e.html`<div class="ui5-block-layer" ?hidden=${r._blockLayerHidden} tabindex="1" style="${(0, e.styleMap)(
            r.styles.blockLayer
          )}" @keydown="${r._preventBlockLayerFocus}" @mousedown="${r._preventBlockLayerFocus}"></div>`;
        var s = r;
        exports.default = s;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    mnkA: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.removeOpenedPopup = exports.getOpenedPopups = exports.addOpenedPopup = void 0);
        var e = require("@ui5/webcomponents-base/dist/Keys.js");
        let t = [];
        const n = (e, n = []) => {
          t.includes(e) || t.push({ instance: e, parentPopovers: n }), 1 === t.length && d();
        };
        exports.addOpenedPopup = n;
        const o = (e) => {
          (t = t.filter((t) => t.instance !== e)).length || r();
        };
        exports.removeOpenedPopup = o;
        const s = () => [...t];
        exports.getOpenedPopups = s;
        const p = (n) => {
            t.length && (0, e.isEscape)(n) && t[t.length - 1].instance.close(!0);
          },
          d = () => {
            document.addEventListener("keydown", p);
          },
          r = () => {
            document.removeEventListener("keydown", p);
          };
      },
      { "@ui5/webcomponents-base/dist/Keys.js": "glQL" },
    ],
    Fu6U: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          s = i(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          t = i(require("./sap_fiori_3/parameters-bundle.css.js"));
        function i(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => s.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => t.default);
        var r = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/Popup.css",
          content: ":host{min-width:1px;display:none;position:fixed}",
        };
        exports.default = r;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    s9Gr: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          t = o(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          i = o(require("./sap_fiori_3/parameters-bundle.css.js"));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => t.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => i.default);
        var r = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/PopupStaticAreaStyles.css",
          content:
            ".ui5-block-layer{display:none;position:fixed;background-color:var(--sapBlockLayer_Background);opacity:.6;top:-500px;left:-500px;right:-500px;bottom:-500px;outline:none;pointer-events:all;z-index:-1}.ui5-block-layer:not([hidden]){display:inline-block}",
        };
        exports.default = r;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    wJsj: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          s = t(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          r = t(require("./sap_fiori_3/parameters-bundle.css.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => s.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => r.default);
        var i = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/PopupGlobal.css",
          content: ".ui5-popup-scroll-blocker{width:100%;height:100%;position:fixed;overflow:hidden}",
        };
        exports.default = i;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    yMHy: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/Render.js"),
          t = y(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js")),
          o = y(require("@ui5/webcomponents-base/dist/UI5Element.js")),
          s = require("@ui5/webcomponents-base/dist/Device.js"),
          i = require("@ui5/webcomponents-base/dist/util/FocusableElements.js"),
          r = require("@ui5/webcomponents-base/dist/ManagedStyles.js"),
          a = require("@ui5/webcomponents-base/dist/Keys.js"),
          n = require("@ui5/webcomponents-base/dist/util/PopupUtils.js"),
          l = y(require("./generated/templates/PopupTemplate.lit.js")),
          u = y(require("./generated/templates/PopupBlockLayerTemplate.lit.js")),
          d = require("./popup-utils/OpenedPopupsRegistry.js"),
          p = y(require("./generated/themes/Popup.css.js")),
          c = y(require("./generated/themes/PopupStaticAreaStyles.css.js")),
          h = y(require("./generated/themes/PopupGlobal.css.js"));
        function y(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const b = {
            managedSlots: !0,
            slots: { default: { type: HTMLElement, propertyName: "content" } },
            properties: {
              initialFocus: { type: String },
              preventFocusRestore: { type: Boolean },
              opened: { type: Boolean },
              accessibleName: { type: String, defaultValue: void 0 },
              _disableInitialFocus: { type: Boolean },
              _blockLayerHidden: { type: Boolean },
            },
            events: {
              "before-open": {},
              "after-open": {},
              "before-close": { detail: { escPressed: { type: Boolean } } },
              "after-close": {},
              scroll: {},
            },
          },
          f = () => {
            (0, r.hasStyle)("data-ui5-popup-scroll-blocker") ||
              (0, r.createStyle)(h.default, "data-ui5-popup-scroll-blocker");
          };
        (0, r.hasStyle)("data-ui5-popup-scroll-blocker") ||
          (0, r.createStyle)(h.default, "data-ui5-popup-scroll-blocker");
        const m = new Set();
        class _ extends o.default {
          static get metadata() {
            return b;
          }
          static get render() {
            return t.default;
          }
          static get styles() {
            return p.default;
          }
          static get template() {
            return l.default;
          }
          static get staticAreaTemplate() {
            return u.default;
          }
          static get staticAreaStyles() {
            return c.default;
          }
          onEnterDOM() {
            this.isOpen() || (this._blockLayerHidden = !0);
          }
          onExitDOM() {
            this.isOpen() && (_.unblockBodyScrolling(this), this._removeOpenedPopup());
          }
          get _displayProp() {
            return "block";
          }
          _preventBlockLayerFocus(e) {
            e.preventDefault();
          }
          static blockBodyScrolling(e) {
            m.add(e),
              1 === m.size &&
                (window.pageYOffset > 0 && (document.body.style.top = `-${window.pageYOffset}px`),
                document.body.classList.add("ui5-popup-scroll-blocker"));
          }
          static unblockBodyScrolling(e) {
            m.delete(e),
              0 === m.size &&
                (document.body.classList.remove("ui5-popup-scroll-blocker"),
                window.scrollTo(0, -parseFloat(document.body.style.top)),
                (document.body.style.top = ""));
          }
          _scroll(e) {
            this.fireEvent("scroll", { scrollTop: e.target.scrollTop, targetRef: e.target });
          }
          _onkeydown(e) {
            e.target === this._root && (0, a.isTabPrevious)(e) && e.preventDefault();
          }
          _onfocusout(e) {
            e.relatedTarget || (this._shouldFocusRoot = !0);
          }
          _onmousedown(e) {
            this._root.removeAttribute("tabindex"),
              this.shadowRoot.contains(e.target) ? (this._shouldFocusRoot = !0) : (this._shouldFocusRoot = !1);
          }
          _onmouseup() {
            (this._root.tabIndex = -1),
              this._shouldFocusRoot && ((0, s.isChrome)() && this._root.focus(), (this._shouldFocusRoot = !1));
          }
          async forwardToFirst() {
            const e = await (0, i.getFirstFocusableElement)(this);
            e ? e.focus() : this._root.focus();
          }
          async forwardToLast() {
            const e = await (0, i.getLastFocusableElement)(this);
            e ? e.focus() : this._root.focus();
          }
          async applyInitialFocus() {
            await this.applyFocus();
          }
          async applyFocus() {
            await this._waitForDomRef();
            const e =
              this.getRootNode().getElementById(this.initialFocus) ||
              document.getElementById(this.initialFocus) ||
              (await (0, i.getFirstFocusableElement)(this)) ||
              this._root;
            e && (e === this._root && (e.tabIndex = -1), e.focus());
          }
          isOpen() {
            return this.opened;
          }
          isFocusWithin() {
            return (0, n.isFocusedElementWithinNode)(this.shadowRoot.querySelector(".ui5-popup-root"));
          }
          async _open(t) {
            !this.fireEvent("before-open", {}, !0, !1) ||
              (this.isModal &&
                !this.shouldHideBackdrop &&
                (this.getStaticAreaItemDomRef(), (this._blockLayerHidden = !1), _.blockBodyScrolling(this)),
              (this._zIndex = (0, n.getNextZIndex)()),
              (this.style.zIndex = this._zIndex),
              (this._focusedElementBeforeOpen = (0, n.getFocusedElement)()),
              this._show(),
              this._disableInitialFocus || t || this.applyInitialFocus(),
              this._addOpenedPopup(),
              (this.opened = !0),
              await (0, e.renderFinished)(),
              this.fireEvent("after-open", {}, !1, !1));
          }
          _addOpenedPopup() {
            (0, d.addOpenedPopup)(this);
          }
          close(e = !1, t = !1, o = !1) {
            if (!this.opened) return;
            !this.fireEvent("before-close", { escPressed: e }, !0, !1) ||
              (this.isModal && ((this._blockLayerHidden = !0), _.unblockBodyScrolling(this)),
              this.hide(),
              (this.opened = !1),
              t || this._removeOpenedPopup(),
              this.preventFocusRestore || o || this.resetFocus(),
              this.fireEvent("after-close", {}, !1, !1));
          }
          _removeOpenedPopup() {
            (0, d.removeOpenedPopup)(this);
          }
          resetFocus() {
            this._focusedElementBeforeOpen &&
              (this._focusedElementBeforeOpen.focus(), (this._focusedElementBeforeOpen = null));
          }
          _show() {
            this.style.display = this._displayProp;
          }
          hide() {
            this.style.display = "none";
          }
          get isModal() {}
          get shouldHideBackdrop() {}
          get _ariaLabelledBy() {}
          get _ariaModal() {}
          get _ariaLabel() {
            return this.accessibleName || void 0;
          }
          get _root() {
            return this.shadowRoot.querySelector(".ui5-popup-root");
          }
          get styles() {
            return { root: {}, content: {}, blockLayer: { zIndex: this._zIndex - 1 } };
          }
          get classes() {
            return { root: { "ui5-popup-root": !0 }, content: { "ui5-popup-content": !0 } };
          }
        }
        var g = _;
        exports.default = g;
      },
      {
        "@ui5/webcomponents-base/dist/Render.js": "tP7g",
        "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG",
        "@ui5/webcomponents-base/dist/UI5Element.js": "Kogr",
        "@ui5/webcomponents-base/dist/Device.js": "Oq9i",
        "@ui5/webcomponents-base/dist/util/FocusableElements.js": "PrQ6",
        "@ui5/webcomponents-base/dist/ManagedStyles.js": "iNx9",
        "@ui5/webcomponents-base/dist/Keys.js": "glQL",
        "@ui5/webcomponents-base/dist/util/PopupUtils.js": "phX0",
        "./generated/templates/PopupTemplate.lit.js": "GcCn",
        "./generated/templates/PopupBlockLayerTemplate.lit.js": "Ff0d",
        "./popup-utils/OpenedPopupsRegistry.js": "mnkA",
        "./generated/themes/Popup.css.js": "Fu6U",
        "./generated/themes/PopupStaticAreaStyles.css.js": "s9Gr",
        "./generated/themes/PopupGlobal.css.js": "wJsj",
      },
    ],
    bBUA: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = { Left: "Left", Right: "Right", Top: "Top", Bottom: "Bottom" };
        class o extends e.default {
          static isValid(e) {
            return !!s[e];
          }
        }
        o.generateTypeAccessors(s);
        var r = o;
        exports.default = r;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    TeJW: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = { Center: "Center", Top: "Top", Bottom: "Bottom", Stretch: "Stretch" };
        class r extends e.default {
          static isValid(e) {
            return !!s[e];
          }
        }
        r.generateTypeAccessors(s);
        var o = r;
        exports.default = o;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    cVsS: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = { Center: "Center", Left: "Left", Right: "Right", Stretch: "Stretch" };
        class r extends e.default {
          static isValid(e) {
            return !!s[e];
          }
        }
        r.generateTypeAccessors(s);
        var a = r;
        exports.default = a;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    TYed: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.removeOpenedPopover = exports.getRegistry = exports.addOpenedPopover = void 0);
        var e = require("@ui5/webcomponents-base/dist/util/PopupUtils.js"),
          t = require("./OpenedPopupsRegistry.js");
        let n = null;
        const o = 300,
          s = [],
          r = (e) => {
            s.forEach((e) => {
              e.instance.reposition();
            });
          },
          d = () => {
            document.body.addEventListener("scroll", r, !0);
          },
          l = () => {
            document.body.removeEventListener("scroll", r, !0);
          },
          c = () => {
            n = setInterval(() => {
              r();
            }, 300);
          },
          i = () => {
            clearInterval(n);
          },
          p = () => {
            document.addEventListener("mousedown", v);
          },
          a = () => {
            document.removeEventListener("mousedown", v);
          },
          v = (n) => {
            const o = (0, t.getOpenedPopups)(),
              s = o[o.length - 1].instance.showAt;
            if (0 !== o.length && s)
              for (let t = o.length - 1; -1 !== t; t--) {
                const s = o[t].instance;
                if (s.isModal || s.isOpenerClicked(n)) return;
                if ((0, e.isClickInRect)(n, s.getBoundingClientRect())) break;
                s.close();
              }
          },
          u = (e) => {
            e && e.shadowRoot.addEventListener("scroll", r, !0);
          },
          m = (e) => {
            e && e.shadowRoot.removeEventListener("scroll", r);
          },
          g = (e) => {
            const o = P(e);
            (0, t.addOpenedPopup)(e, o),
              s.push({ instance: e, parentPopovers: o }),
              u(e),
              1 === s.length &&
                (document.body.addEventListener("scroll", r, !0),
                document.addEventListener("mousedown", v),
                (n = setInterval(() => {
                  r();
                }, 300)));
          };
        exports.addOpenedPopover = g;
        const h = (e) => {
          const o = [e];
          for (let t = 0; t < s.length; t++) {
            const n = s[t].parentPopovers.indexOf(e);
            s[t].parentPopovers.length > 0 && n > -1 && o.push(s[t].instance);
          }
          for (let n = o.length - 1; n >= 0; n--)
            for (let e = 0; e < s.length; e++) {
              let r;
              if ((o[n] === s[e].instance && (r = e), r >= 0)) {
                (0, t.removeOpenedPopup)(s[r].instance), m(s[r].instance), s.splice(r, 1)[0].instance.close(!1, !0);
              }
            }
          s.length ||
            (document.body.removeEventListener("scroll", r, !0),
            document.removeEventListener("mousedown", v),
            clearInterval(n));
        };
        exports.removeOpenedPopover = h;
        const f = () => s;
        exports.getRegistry = f;
        const P = (e) => {
          let t = e.parentNode;
          const n = [];
          for (; t.parentNode; ) {
            for (let e = 0; e < s.length; e++) t && t === s[e].instance && n.push(t);
            t = t.parentNode;
          }
          return n;
        };
      },
      { "@ui5/webcomponents-base/dist/util/PopupUtils.js": "phX0", "./OpenedPopupsRegistry.js": "mnkA" },
    ],
    ysmx: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const s = (s, a, t) =>
            e.html`<section style="${(0, e.styleMap)(s.styles.root)}" class="${(0, e.classMap)(
              s.classes.root
            )}" role="dialog" aria-modal="${(0, e.ifDefined)(s._ariaModal)}" aria-label="${(0, e.ifDefined)(
              s._ariaLabel
            )}" aria-labelledby="${(0, e.ifDefined)(s._ariaLabelledBy)}" dir="${(0, e.ifDefined)(
              s.effectiveDir
            )}" @keydown=${s._onkeydown} @focusout=${s._onfocusout} @mouseup=${s._onmouseup} @mousedown=${
              s._onmousedown
            }><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${
              s.forwardToLast
            }></span><span class="ui5-popover-arrow" style="${(0, e.styleMap)(s.styles.arrow)}"></span>${
              s._displayHeader ? o(s, a, t) : void 0
            }<div style="${(0, e.styleMap)(s.styles.content)}" class="${(0, e.classMap)(
              s.classes.content
            )}"  @scroll="${s._scroll}"><slot></slot></div>${
              s._displayFooter ? l(s, a, t) : void 0
            }<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${s.forwardToFirst}></span></section> `,
          o = (s, o, l) =>
            e.html`<header class="ui5-popup-header-root" id="ui5-popup-header">${
              s.header.length ? a(s, o, l) : t(s, o, l)
            }</header>`,
          a = (s, o, a) => e.html`<slot name="header"></slot>`,
          t = (s, o, a) => e.html`<h2 class="ui5-popup-header-text">${(0, e.ifDefined)(s.headerText)}</h2>`,
          l = (s, o, a) => e.html`${s.footer.length ? r(s, o, a) : void 0}`,
          r = (s, o, a) => e.html`<footer class="ui5-popup-footer-root"><slot name="footer"></slot></footer>`;
        var i = s;
        exports.default = i;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    rCxv: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          r = a(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          o = a(require("./sap_fiori_3/parameters-bundle.css.js"));
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => r.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => o.default);
        var s = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/BrowserScrollbar.css",
          content:
            "::-webkit-scrollbar:horizontal{height:var(--sapScrollBar_Dimension)}::-webkit-scrollbar:vertical{width:var(--sapScrollBar_Dimension)}::-webkit-scrollbar{background-color:var(--sapScrollBar_TrackColor)}::-webkit-scrollbar-thumb{background-color:var(--sapScrollBar_FaceColor)}::-webkit-scrollbar-thumb:hover{background-color:var(--sapScrollBar_Hover_FaceColor)}::-webkit-scrollbar-corner{background-color:var(--sapScrollBar_TrackColor)}",
        };
        exports.default = s;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    XtRV: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          o = t(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          r = t(require("./sap_fiori_3/parameters-bundle.css.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => o.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => r.default);
        var i = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/PopupsCommon.css",
          content:
            ':host{display:none;position:fixed;min-width:6.25rem;background:var(--sapGroup_ContentBackground);box-shadow:var(--sapContent_Shadow2);border-radius:var(--_ui5-popup-border-radius);min-height:2rem;box-sizing:border-box}.ui5-popup-root{background:inherit;border-radius:inherit;width:100%;height:100%;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;outline:none}@media screen and (-ms-high-contrast:active){.ui5-popup-root{border:1px solid var(--sapPageFooter_BorderColor)}}.ui5-popup-root .ui5-popup-header-root{box-shadow:var(--_ui5_popup_header_shadow);margin-bottom:.125rem}.ui5-popup-footer-root{background:var(--sapPageFooter_Background);border-top:var(--_ui5_popup_footer_border_top);color:var(--sapPageFooter_TextColor)}.ui5-popup-footer-root,.ui5-popup-header-root,:host([header-text]) .ui5-popup-header-text{margin:0;color:var(--sapPageHeader_TextColor);font-size:1rem;font-family:"72override",var(--sapFontFamily);display:flex;justify-content:center;align-items:center}.ui5-popup-header-root .ui5-popup-header-text{font-weight:var(--_ui5_popup_header_footer_font_weight)}.ui5-popup-content{overflow:auto;padding:var(--_ui5_popup_content_padding);box-sizing:border-box}:host([no-padding]) .ui5-popup-content{padding:0}:host([header-text]) .ui5-popup-header-text{padding:0 .25rem;text-align:center;min-height:var(--_ui5_popup_default_header_height);max-height:var(--_ui5_popup_default_header_height);line-height:var(--_ui5_popup_default_header_height);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;max-width:100%;display:inline-block}:host(:not([header-text])) .ui5-popup-header-text{display:none}:host([disable-scrolling]) .ui5-popup-content{overflow:hidden}',
        };
        exports.default = i;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    Xl6S: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          r = o(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          t = o(require("./sap_fiori_3/parameters-bundle.css.js"));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => r.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => t.default);
        var a = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/Popover.css",
          content:
            '.ui5-popover-arrow{pointer-events:none;display:block;width:1rem;height:1rem;position:absolute;overflow:hidden}.ui5-popover-arrow:after{content:"";display:block;width:.7rem;height:.7rem;background-color:var(--sapGroup_ContentBackground);box-shadow:var(--sapContent_Shadow3);transform:rotate(-45deg)}:host{max-width:calc(100% - var(--_ui5_popup_viewport_margin)*2)}:host([opened][actual-placement-type=Top]){margin-top:var(--_ui5-popover-margin-bottom)}:host([opened][actual-placement-type=Bottom]){margin-top:var(--_ui5-popover-margin-top)}:host([actual-placement-type=Bottom]) .ui5-popover-arrow{left:calc(50% - .5625rem);top:-.5rem;height:.5625rem}:host([actual-placement-type=Bottom]) .ui5-popover-arrow:after{margin:.1875rem 0 0 .1875rem}:host([actual-placement-type=Left]) .ui5-popover-arrow{top:calc(50% - .5625rem);right:-.5625rem;width:.5625rem}:host([actual-placement-type=Left]) .ui5-popover-arrow:after{margin:.1875rem 0 0 -.375rem}:host([actual-placement-type=Left]) [dir=rtl] .ui5-popover-arrow:after{margin:.1875rem .25rem 0 0}:host([actual-placement-type=Bottom]) [dir=rtl] .ui5-popover-arrow:after{margin:.1875rem .125rem 0 0}:host([actual-placement-type=Top]) [dir=rtl] .ui5-popover-arrow:after{margin:-.4375rem .125rem 0 0}:host([actual-placement-type=Top]) .ui5-popover-arrow{left:calc(50% - .5625rem);height:.5625rem;top:100%}:host([actual-placement-type=Top]) .ui5-popover-arrow:after{margin:-.375rem 0 0 .125rem}:host(:not([actual-placement-type])) .ui5-popover-arrow,:host([actual-placement-type=Right]) .ui5-popover-arrow{left:-.5625rem;top:calc(50% - .5625rem);width:.5625rem;height:1rem}:host(:not([actual-placement-type])) .ui5-popover-arrow:after,:host([actual-placement-type=Right]) .ui5-popover-arrow:after{margin:.125rem 0 0 .25rem}:host(:not([actual-placement-type])) [dir=rtl] .ui5-popover-arrow:after,:host([actual-placement-type=Right]) [dir=rtl] .ui5-popover-arrow:after{margin:.1875rem -.375rem 0 0}:host([hide-arrow]) .ui5-popover-arrow{display:none}',
        };
        exports.default = a;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    ZHo6: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var t = c(require("@ui5/webcomponents-base/dist/types/Integer.js")),
          e = c(require("@ui5/webcomponents-base/dist/delegate/ResizeHandler.js")),
          o = require("@ui5/webcomponents-base/dist/util/PopupUtils.js"),
          i = c(require("@ui5/webcomponents-base/dist/util/clamp.js")),
          a = c(require("./Popup.js")),
          l = c(require("./types/PopoverPlacementType.js")),
          h = c(require("./types/PopoverVerticalAlign.js")),
          s = c(require("./types/PopoverHorizontalAlign.js")),
          r = require("./popup-utils/PopoverRegistry.js"),
          n = c(require("./generated/templates/PopoverTemplate.lit.js")),
          d = c(require("./generated/themes/BrowserScrollbar.css.js")),
          u = c(require("./generated/themes/PopupsCommon.css.js")),
          p = c(require("./generated/themes/Popover.css.js"));
        function c(t) {
          return t && t.__esModule ? t : { default: t };
        }
        const f = 8,
          g = {
            tag: "ui5-popover",
            properties: {
              headerText: { type: String },
              placementType: { type: l.default, defaultValue: l.default.Right },
              horizontalAlign: { type: s.default, defaultValue: s.default.Center },
              verticalAlign: { type: h.default, defaultValue: h.default.Center },
              modal: { type: Boolean },
              hideBackdrop: { type: Boolean },
              hideArrow: { type: Boolean },
              allowTargetOverlap: { type: Boolean },
              disableScrolling: { type: Boolean },
              arrowTranslateX: { type: t.default, defaultValue: 0, noAttribute: !0 },
              arrowTranslateY: { type: t.default, defaultValue: 0, noAttribute: !0 },
              actualPlacementType: { type: l.default, defaultValue: l.default.Right },
              _maxContentHeight: { type: t.default, noAttribute: !0 },
              _maxContentWidth: { type: t.default, noAttribute: !0 },
            },
            managedSlots: !0,
            slots: { header: { type: HTMLElement }, footer: { type: HTMLElement } },
            events: {},
          };
        class m extends a.default {
          constructor() {
            super(), (this._handleResize = this.handleResize.bind(this));
          }
          static get metadata() {
            return g;
          }
          static get styles() {
            return [d.default, u.default, p.default];
          }
          static get template() {
            return n.default;
          }
          static get VIEWPORT_MARGIN() {
            return 10;
          }
          onEnterDOM() {
            e.default.register(this, this._handleResize);
          }
          onExitDOM() {
            e.default.deregister(this, this._handleResize);
          }
          isOpenerClicked(t) {
            const e = t.target;
            return (
              e === this._opener ||
              (e.getFocusDomRef && e.getFocusDomRef() === this._opener) ||
              t.composedPath().indexOf(this._opener) > -1
            );
          }
          async showAt(t, e = !1) {
            t &&
              !this.opened &&
              ((this._opener = t), (this._openerRect = t.getBoundingClientRect()), await super._open(e));
          }
          _addOpenedPopup() {
            (0, r.addOpenedPopover)(this);
          }
          _removeOpenedPopup() {
            (0, r.removeOpenedPopover)(this);
          }
          shouldCloseDueToOverflow(t, e) {
            const i = { Right: e.right, Left: e.left, Top: e.top, Bottom: e.bottom },
              a = (0, o.getClosedPopupParent)(this._opener);
            let l = !1,
              h = !1;
            if (a.showAt) {
              const t = a.contentDOM.getBoundingClientRect();
              (l = e.top > t.top + t.height), (h = e.top + e.height < t.top);
            }
            return i[t] < 0 || i[t] + 32 > a.innerHeight || l || h;
          }
          shouldCloseDueToNoOpener(t) {
            return 0 === t.top && 0 === t.bottom && 0 === t.left && 0 === t.right;
          }
          handleResize() {
            this.opened && this.reposition();
          }
          reposition() {
            this._show();
          }
          _show() {
            let t;
            const e = this.getPopoverSize();
            if (0 === e.width || 0 === e.height) return;
            this.isOpen() && (this._openerRect = this._opener.getBoundingClientRect()),
              (t =
                this.shouldCloseDueToNoOpener(this._openerRect) && this.isFocusWithin()
                  ? this._oldPlacement
                  : this.calcPlacement(this._openerRect, e));
            const o = this.horizontalAlign === s.default.Stretch;
            if (this._preventRepositionAndClose) return this.close();
            (this._oldPlacement = t), (this.actualPlacementType = t.placementType);
            let a = (0, i.default)(
              this._left,
              m.VIEWPORT_MARGIN,
              document.documentElement.clientWidth - e.width - m.VIEWPORT_MARGIN
            );
            this.actualPlacementType === l.default.Right && (a = Math.max(a, this._left));
            let h = (0, i.default)(
              this._top,
              m.VIEWPORT_MARGIN,
              document.documentElement.clientHeight - e.height - m.VIEWPORT_MARGIN
            );
            this.actualPlacementType === l.default.Bottom && (h = Math.max(h, this._top));
            let { arrowX: r, arrowY: n } = t;
            const d = this.actualPlacementType === l.default.Top || this.actualPlacementType === l.default.Bottom;
            if (d) {
              const t = m.VIEWPORT_MARGIN - this._left,
                o = this._left + e.width + m.VIEWPORT_MARGIN - document.documentElement.clientWidth;
              t > 0 ? (r -= t) : o > 0 && (r += o);
            }
            if (((this.arrowTranslateX = Math.round(r)), !d)) {
              const t = m.VIEWPORT_MARGIN - this._top,
                o = this._top + e.height + m.VIEWPORT_MARGIN - document.documentElement.clientHeight;
              t > 0 ? (n -= t) : o > 0 && (n += o);
            }
            (this.arrowTranslateY = Math.round(n)),
              Object.assign(this.style, { top: `${h}px`, left: `${a}px` }),
              super._show(),
              o && this._width && (this.style.width = this._width);
          }
          getPopoverSize() {
            this.opened || Object.assign(this.style, { display: "block", top: "-10000px", left: "-10000px" });
            const t = this.getBoundingClientRect();
            return { width: t.width, height: t.height };
          }
          get contentDOM() {
            return this.shadowRoot.querySelector(".ui5-popup-content");
          }
          get arrowDOM() {
            return this.shadowRoot.querySelector(".ui5-popover-arrow");
          }
          calcPlacement(t, e) {
            let o = 0,
              i = 0;
            const a = this.allowTargetOverlap,
              r = document.documentElement.clientWidth,
              n = document.documentElement.clientHeight;
            let d = n,
              u = r,
              p = "",
              c = "";
            const g = this.getActualPlacementType(t, e);
            this._preventRepositionAndClose = this.shouldCloseDueToNoOpener(t) || this.shouldCloseDueToOverflow(g, t);
            const w = g === l.default.Top || g === l.default.Bottom;
            this.horizontalAlign === s.default.Stretch && w
              ? ((e.width = t.width), (p = `${t.width}px`))
              : this.verticalAlign !== h.default.Stretch || w || ((e.height = t.height), (c = `${t.height}px`)),
              (this._width = p),
              (this._height = c);
            const _ = this.hideArrow ? 0 : f;
            switch (g) {
              case l.default.Top:
                (o = this.getVerticalLeft(t, e)), (i = Math.max(t.top - e.height - _, 0)), a || (d = t.top - _);
                break;
              case l.default.Bottom:
                (o = this.getVerticalLeft(t, e)),
                  a
                    ? (i = Math.max(Math.min(t.bottom + _, n - e.height), 0))
                    : ((i = t.bottom + _), (d = n - t.bottom - _));
                break;
              case l.default.Left:
                (o = Math.max(t.left - e.width - _, 0)), (i = this.getHorizontalTop(t, e)), a || (u = t.left - _);
                break;
              case l.default.Right:
                a
                  ? (o = Math.max(Math.min(t.left + t.width + _, r - e.width), 0))
                  : ((o = t.left + t.width + _), (u = r - t.right - _)),
                  (i = this.getHorizontalTop(t, e));
            }
            w
              ? e.width > r || o < 0
                ? (o = 0)
                : o + e.width > r && (o -= o + e.width - r)
              : e.height > n || i < 0
              ? (i = 0)
              : i + e.height > n && (i -= i + e.height - n);
            let R = d;
            if (this._displayHeader) {
              const t =
                this.shadowRoot.querySelector(".ui5-popup-header-root") ||
                this.shadowRoot.querySelector(".ui5-popup-header-text");
              t && (R = d - t.offsetHeight);
            }
            (this._maxContentHeight = Math.round(R - m.VIEWPORT_MARGIN)),
              (this._maxContentWidth = Math.round(u - m.VIEWPORT_MARGIN));
            const y = this.getArrowPosition(t, e, o, i, w);
            return (
              (void 0 === this._left || Math.abs(this._left - o) > 1.5) && (this._left = Math.round(o)),
              (void 0 === this._top || Math.abs(this._top - i) > 1.5) && (this._top = Math.round(i)),
              { arrowX: y.x, arrowY: y.y, top: this._top, left: this._left, placementType: g }
            );
          }
          getArrowPosition(t, e, o, i, a) {
            let l = this.horizontalAlign === s.default.Center || this.horizontalAlign === s.default.Stretch;
            this.horizontalAlign === s.default.Right && o <= t.left && (l = !0),
              this.horizontalAlign === s.default.Left && o + e.width >= t.left + t.width && (l = !0);
            let h = 0;
            a && l && (h = t.left + t.width / 2 - o - e.width / 2);
            let r = 0;
            return a || (r = t.top + t.height / 2 - i - e.height / 2), { x: Math.round(h), y: Math.round(r) };
          }
          fallbackPlacement(t, e, o, i) {
            return o.left > i.width
              ? l.default.Left
              : t - o.right > o.left
              ? l.default.Right
              : e - o.bottom > i.height
              ? l.default.Bottom
              : e - o.bottom < o.top
              ? l.default.Top
              : void 0;
          }
          getActualPlacementType(t, e) {
            const o = this.placementType;
            let i = o;
            const a = document.documentElement.clientWidth,
              h = document.documentElement.clientHeight;
            switch (o) {
              case l.default.Top:
                t.top < e.height && t.top < h - t.bottom && (i = l.default.Bottom);
                break;
              case l.default.Bottom:
                h - t.bottom < e.height && h - t.bottom < t.top && (i = l.default.Top);
                break;
              case l.default.Left:
                t.left < e.width && (i = this.fallbackPlacement(a, h, t, e) || o);
                break;
              case l.default.Right:
                a - t.right < e.width && (i = this.fallbackPlacement(a, h, t, e) || o);
            }
            return i;
          }
          getVerticalLeft(t, e) {
            let o;
            switch (this.horizontalAlign) {
              case s.default.Center:
              case s.default.Stretch:
                o = t.left - (e.width - t.width) / 2;
                break;
              case s.default.Left:
                o = t.left;
                break;
              case s.default.Right:
                o = t.right - e.width;
            }
            return o;
          }
          getHorizontalTop(t, e) {
            let o;
            switch (this.verticalAlign) {
              case h.default.Center:
              case h.default.Stretch:
                o = t.top - (e.height - t.height) / 2;
                break;
              case h.default.Top:
                o = t.top;
                break;
              case h.default.Bottom:
                o = t.bottom - e.height;
            }
            return o;
          }
          get isModal() {
            return this.modal;
          }
          get shouldHideBackdrop() {
            return this.hideBackdrop;
          }
          get _ariaLabelledBy() {
            return this.accessibleName ? void 0 : "ui5-popup-header";
          }
          get _ariaModal() {
            return !0;
          }
          get styles() {
            return {
              ...super.styles,
              content: { "max-height": `${this._maxContentHeight}px`, "max-width": `${this._maxContentWidth}px` },
              arrow: { transform: `translate(${this.arrowTranslateX}px, ${this.arrowTranslateY}px)` },
            };
          }
          get _displayHeader() {
            return this.header.length || this.headerText;
          }
          get _displayFooter() {
            return !0;
          }
        }
        m.define();
        var w = m;
        exports.default = w;
      },
      {
        "@ui5/webcomponents-base/dist/types/Integer.js": "y11y",
        "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js": "C7rv",
        "@ui5/webcomponents-base/dist/util/PopupUtils.js": "phX0",
        "@ui5/webcomponents-base/dist/util/clamp.js": "seOl",
        "./Popup.js": "yMHy",
        "./types/PopoverPlacementType.js": "bBUA",
        "./types/PopoverVerticalAlign.js": "TeJW",
        "./types/PopoverHorizontalAlign.js": "cVsS",
        "./popup-utils/PopoverRegistry.js": "TYed",
        "./generated/templates/PopoverTemplate.lit.js": "ysmx",
        "./generated/themes/BrowserScrollbar.css.js": "rCxv",
        "./generated/themes/PopupsCommon.css.js": "XtRV",
        "./generated/themes/Popover.css.js": "Xl6S",
      },
    ],
    RIFo: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var i = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const e = (e, s, u) =>
            i.html`<div class="ui5-input-root" @focusin="${e._onfocusin}" @focusout="${
              e._onfocusout
            }"><div class="ui5-input-content"><input id="${(0, i.ifDefined)(
              e._id
            )}-inner" class="ui5-input-inner" style="${(0, i.styleMap)(e.styles.innerInput)}" type="${(0, i.ifDefined)(
              e.inputType
            )}" inner-input ?inner-input-with-icon="${e.icon.length}" ?disabled="${e.disabled}" ?readonly="${
              e._readonly
            }" .value="${(0, i.ifDefined)(e.value)}" placeholder="${(0, i.ifDefined)(e._placeholder)}" maxlength="${(0,
            i.ifDefined)(e.maxlength)}" role="${(0, i.ifDefined)(e.accInfo.input.role)}" aria-controls="${(0,
            i.ifDefined)(e.accInfo.input.ariaControls)}" ?aria-invalid="${
              e.accInfo.input.ariaInvalid
            }" aria-haspopup="${(0, i.ifDefined)(e.accInfo.input.ariaHasPopup)}" aria-describedby="${(0, i.ifDefined)(
              e.accInfo.input.ariaDescribedBy
            )}" aria-roledescription="${(0, i.ifDefined)(e.accInfo.input.ariaRoledescription)}" aria-autocomplete="${(0,
            i.ifDefined)(e.accInfo.input.ariaAutoComplete)}" aria-expanded="${(0, i.ifDefined)(
              e.accInfo.input.ariaExpanded
            )}" aria-label="${(0, i.ifDefined)(e.accInfo.input.ariaLabel)}" aria-required="${(0, i.ifDefined)(
              e.required
            )}" @input="${e._handleInput}" @change="${e._handleChange}" @keydown="${e._onkeydown}" @keyup="${
              e._onkeyup
            }" @click=${e._click} @focusin=${e.innerFocusIn} data-sap-focus-ref step="${(0, i.ifDefined)(
              e.nativeInputAttributes.step
            )}" min="${(0, i.ifDefined)(e.nativeInputAttributes.min)}" max="${(0, i.ifDefined)(
              e.nativeInputAttributes.max
            )}" />${e.readonly ? n(e, s, u) : void 0}${
              e.icon.length ? a(e, s, u) : void 0
            }<div class="ui5-input-value-state-icon">${(0, i.unsafeHTML)(e._valueStateInputIcon)}</div>${
              e.showSuggestions ? t(e, s, u) : void 0
            }${e.accInfo.input.ariaDescription ? d(e, s, u) : void 0}${
              e.hasValueState ? o(e, s, u) : void 0
            }</div><slot name="formSupport"></slot></div>`,
          n = (e, n, a) =>
            i.html`<${(0, i.scopeTag)("ui5-icon", n, a)} class="ui5-input-readonly-icon" name="not-editable"></${(0,
            i.scopeTag)("ui5-icon", n, a)}>`,
          a = (e, n, a) => i.html`<div class="ui5-input-icon-root"><slot name="icon"></slot></div>`,
          t = (e, n, a) =>
            i.html`<span id="${(0, i.ifDefined)(e._id)}-suggestionsText" class="ui5-hidden-text">${(0, i.ifDefined)(
              e.suggestionsText
            )}</span><span id="${(0, i.ifDefined)(
              e._id
            )}-selectionText" class="ui5-hidden-text" aria-live="polite" role="status"></span><span id="${(0,
            i.ifDefined)(e._id)}-suggestionsCount" class="ui5-hidden-text" aria-live="polite">${(0, i.ifDefined)(
              e.availableSuggestionsCount
            )}</span>`,
          d = (e, n, a) =>
            i.html`<span id="${(0, i.ifDefined)(e._id)}-descr" class="ui5-hidden-text">${(0, i.ifDefined)(
              e.accInfo.input.ariaDescription
            )}</span>`,
          o = (e, n, a) =>
            i.html`<span id="${(0, i.ifDefined)(e._id)}-valueStateDesc" class="ui5-hidden-text">${(0, i.ifDefined)(
              e.ariaValueStateHiddenText
            )}</span>`;
        var s = e;
        exports.default = s;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    h664: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const s = (s, t, a) =>
            e.html`${s.showSuggestions ? i(s, t, a) : void 0}${s.hasValueStateMessage ? m(s, t, a) : void 0} `,
          i = (s, i, a) =>
            e.html`<${(0, e.scopeTag)("ui5-responsive-popover", i, a)} class="${(0, e.classMap)(
              s.classes.popover
            )}" hide-arrow _disable-initial-focus placement-type="Bottom" horizontal-align="Left" style="${(0,
            e.styleMap)(s.styles.suggestionsPopover)}" @ui5-after-open="${(0, e.ifDefined)(
              s._afterOpenPopover
            )}" @ui5-after-close="${(0, e.ifDefined)(s._afterClosePopover)}" @ui5-scroll="${(0, e.ifDefined)(
              s._scroll
            )}">${s._isPhone ? t(s, i, a) : void 0}${s._isPhone ? void 0 : n(s, i, a)}<${(0, e.scopeTag)(
              "ui5-list",
              i,
              a
            )} separators="${(0, e.ifDefined)(s.suggestionSeparators)}">${(0, e.repeat)(
              s.suggestionsTexts,
              (e, s) => e._id || s,
              (e, t) => $(e, t, s, i, a)
            )}</${(0, e.scopeTag)("ui5-list", i, a)}>${s._isPhone ? h(s, i, a) : void 0}</${(0, e.scopeTag)(
              "ui5-responsive-popover",
              i,
              a
            )}>`,
          t = (s, i, t) =>
            e.html`<div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${(0, e.ifDefined)(
              s._headerTitleText
            )}</span><${(0, e.scopeTag)(
              "ui5-button",
              i,
              t
            )} class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${
              s._closeRespPopover
            }"></${(0, e.scopeTag)(
              "ui5-button",
              i,
              t
            )}></div><div class="row"><div class="input-root-phone"><input class="ui5-input-inner-phone" type="${(0,
            e.ifDefined)(s.inputType)}" .value="${(0, e.ifDefined)(s.value)}" inner-input placeholder="${(0,
            e.ifDefined)(s.placeholder)}" @input="${s._handleInput}" @change="${s._handleChange}" /></div></div>${
              s.hasValueStateMessage ? a(s, i, t) : void 0
            }</div>`,
          a = (s, i, t) =>
            e.html`<div class="row ${(0, e.classMap)(s.classes.popoverValueState)}" style="${(0, e.styleMap)(
              s.styles.suggestionPopoverHeader
            )}">${s.shouldDisplayDefaultValueStateMessage ? o(s, i, t) : l(s, i, t)}</div>`,
          o = (s, i, t) => e.html`${(0, e.ifDefined)(s.valueStateText)}`,
          l = (s, i, t) =>
            e.html`${(0, e.repeat)(
              s.valueStateMessageText,
              (e, s) => e._id || s,
              (e, a) => p(e, a, s, i, t)
            )}`,
          p = (s, i, t, a, o) => e.html`${(0, e.ifDefined)(s)}`,
          n = (s, i, t) => e.html`${s.hasValueStateMessage ? u(s, i, t) : void 0}`,
          u = (s, i, t) =>
            e.html`<div slot="header" ?focused=${s._isValueStateFocused} class="ui5-responsive-popover-header ${(0,
            e.classMap)(s.classes.popoverValueState)}" style=${(0, e.styleMap)(s.styles.suggestionPopoverHeader)}><${(0,
            e.scopeTag)("ui5-icon", i, t)} class="ui5-input-value-state-message-icon" name="${(0, e.ifDefined)(
              s._valueStateMessageInputIcon
            )}"></${(0, e.scopeTag)("ui5-icon", i, t)}>${
              s.shouldDisplayDefaultValueStateMessage ? d(s, i, t) : r(s, i, t)
            }</div>`,
          d = (s, i, t) => e.html`${(0, e.ifDefined)(s.valueStateText)}`,
          r = (s, i, t) =>
            e.html`${(0, e.repeat)(
              s.valueStateMessageText,
              (e, s) => e._id || s,
              (e, a) => c(e, a, s, i, t)
            )}`,
          c = (s, i, t, a, o) => e.html`${(0, e.ifDefined)(s)}`,
          $ = (s, i, t, a, o) => e.html`${s.groupItem ? f(s, i, t, a, o) : v(s, i, t, a, o)}`,
          f = (s, i, t, a, o) =>
            e.html`<${(0, e.scopeTag)("ui5-li-groupheader", a, o)} data-ui5-key="${(0, e.ifDefined)(s.key)}">${(0,
            e.unsafeHTML)(s.text)}</${(0, e.scopeTag)("ui5-li-groupheader", a, o)}>`,
          v = (s, i, t, a, o) =>
            e.html`<${(0, e.scopeTag)("ui5-li-suggestion-item", a, o)} image="${(0, e.ifDefined)(s.image)}" icon="${(0,
            e.ifDefined)(s.icon)}" additional-text="${(0, e.ifDefined)(s.additionalText)}" type="${(0, e.ifDefined)(
              s.type
            )}" additional-text-state="${(0, e.ifDefined)(s.additionalTextState)}" @ui5-_item-press="${(0, e.ifDefined)(
              s.fnOnSuggestionItemPress
            )}" data-ui5-key="${(0, e.ifDefined)(s.key)}">${(0, e.unsafeHTML)(s.text)}${
              s.description ? g(s, i, t, a, o) : void 0
            }</${(0, e.scopeTag)("ui5-li-suggestion-item", a, o)}>`,
          g = (s, i, t, a, o) => e.html`<span slot="richDescription">${(0, e.unsafeHTML)(s.description)}</span>`,
          h = (s, i, t) =>
            e.html`<div slot="footer" class="ui5-responsive-popover-footer"><${(0, e.scopeTag)(
              "ui5-button",
              i,
              t
            )} design="Transparent" @click="${s._closeRespPopover}">OK</${(0, e.scopeTag)("ui5-button", i, t)}></div>`,
          m = (s, i, t) =>
            e.html`<${(0, e.scopeTag)(
              "ui5-popover",
              i,
              t
            )} skip-registry-update _disable-initial-focus prevent-focus-restore no-padding hide-arrow class="ui5-valuestatemessage-popover" placement-type="Bottom" horizontal-align="Left"><div slot="header" class="${(0,
            e.classMap)(s.classes.popoverValueState)}" style="${(0, e.styleMap)(s.styles.popoverHeader)}"><${(0,
            e.scopeTag)("ui5-icon", i, t)} class="ui5-input-value-state-message-icon" name="${(0, e.ifDefined)(
              s._valueStateMessageInputIcon
            )}"></${(0, e.scopeTag)("ui5-icon", i, t)}>${
              s.shouldDisplayDefaultValueStateMessage ? T(s, i, t) : D(s, i, t)
            }</div></${(0, e.scopeTag)("ui5-popover", i, t)}>`,
          T = (s, i, t) => e.html`${(0, e.ifDefined)(s.valueStateText)}`,
          D = (s, i, t) =>
            e.html`${(0, e.repeat)(
              s.valueStateMessageText,
              (e, s) => e._id || s,
              (e, a) => y(e, a, s, i, t)
            )}`,
          y = (s, i, t, a, o) => e.html`${(0, e.ifDefined)(s)}`;
        var M = s;
        exports.default = M;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    SI9d: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var o = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          r = t(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          e = t(require("./sap_fiori_3/parameters-bundle.css.js"));
        function t(o) {
          return o && o.__esModule ? o : { default: o };
        }
        (0, o.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => r.default),
          (0, o.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => e.default);
        var i = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/Input.css",
          content:
            '.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block}:host{width:var(--_ui5_input_width);min-width:var(--_ui5_input_width);height:var(--_ui5_input_height);color:var(--sapField_TextColor);font-size:var(--sapFontSize);font-family:"72override",var(--sapFontFamily);font-style:normal;background-color:var(--_ui5-input-background-color);border:var(--_ui5-input-border);border-radius:var(--_ui5-input-border-radius);box-sizing:border-box;line-height:normal;letter-spacing:normal;word-spacing:normal;text-align:start;transition:var(--_ui5-input-transition);background-image:var(--_ui5-input-background-image);background-size:100% var(--sapField_BorderWidth);background-repeat:repeat-x;background-position:bottom}:host([focused]){border-color:var(--_ui5-input-focused-border-color);background-color:var(--sapField_Focus_Background);outline:var(--_ui5-input-focus-outline);outline-offset:var(--_ui5-input-focus-outline-offset);box-shadow:var(--_ui5-input-focus-box-shadow)}.ui5-input-root:before{content:"";position:absolute;width:calc(100% - 2px);left:1px;bottom:-2px;border-bottom-left-radius:8px;border-bottom-right-radius:8px;height:var(--_ui5-input-bottom-border-height);transition:var(--_ui5-input-transition);background-color:var(--_ui5-input-bottom-border-color)}:host([value-state]:not([value-state=None])[focused]){outline:var(--_ui5-input-value-state-outline);outline-offset:var(--_ui5-input-value-state-outline-offset)}.ui5-input-root{width:100%;height:100%;position:relative;background:transparent;display:inline-block;outline:none;box-sizing:border-box;color:inherit;transition:border-color .2s ease-in-out}:host([disabled]){opacity:var(--_ui5_input_disabled_opacity);cursor:default;pointer-events:none;background-color:var(--_ui5-input-disabled-background);border-color:var(--_ui5_input_disabled_border_color)}:host([disabled]) .ui5-input-root:before,:host([readonly]) .ui5-input-root:before{content:none}[inner-input]{background:transparent;color:inherit;border:none;font-style:inherit;-webkit-appearance:none;-moz-appearance:textfield;padding:var(--_ui5_input_inner_padding);box-sizing:border-box;min-width:inherit;width:100%;text-overflow:ellipsis;flex:1;outline:none;font-size:inherit;font-family:inherit;line-height:inherit;letter-spacing:inherit;word-spacing:inherit;text-align:inherit}[inner-input][inner-input-with-icon]{padding:var(--_ui5_input_inner_padding_with_icon)}.ui5-input-readonly-icon{display:var(--_ui5_input_readonly_icon_display);padding:var(--_ui5_input_icon_padding);margin-right:.125rem;align-self:center}.ui5-input-value-state-icon{height:100%;display:var(--_ui5-input-value-state-icon-display);align-items:center}.ui5-input-value-state-icon>svg{margin-right:8px}[inner-input]::selection{background:var(--sapSelectedColor);color:var(--sapContent_ContrastTextColor)}:host([disabled]) [inner-input]::-webkit-input-placeholder{visibility:hidden}:host([readonly]) [inner-input]::-webkit-input-placeholder{visibility:hidden}[inner-input]::-webkit-input-placeholder{font-style:var(--_ui5-input-placeholder-style);color:var(--_ui5-input-placeholder-color);padding-right:.125rem}:host([disabled]) [inner-input]::-moz-placeholder{visibility:hidden}:host([readonly]) [inner-input]::-moz-placeholder{visibility:hidden}[inner-input]::-moz-placeholder{font-style:var(--_ui5-input-placeholder-style);color:var(--sapField_PlaceholderTextColor);padding-right:.125rem}:host([disabled]) [inner-input]:-ms-input-placeholder{visibility:hidden}:host([readonly]) [inner-input]:-ms-input-placeholder{visibility:hidden}[inner-input]:-ms-input-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor);padding-right:.125rem}:host([value-state=Error]) [inner-input]::-webkit-input-placeholder{color:var(--_ui5-input-value-state-error-border-botom-color)}:host([value-state=Error]) [inner-input]::-moz-placeholder{color:var(--_ui5-input-value-state-error-border-botom-color)}:host([value-state=Warning]) [inner-input]::-webkit-input-placeholder{color:var(--_ui5-input-value-state-warning-border-botom-color)}:host([value-state=Warning]) [inner-input]::-moz-placeholder{color:var(--_ui5-input-value-state-warning-border-botom-color)}:host([value-state=Success]) [inner-input]::-webkit-input-placeholder{color:var(--_ui5-input-value-state-success-border-botom-color)}:host([value-state=Success]) [inner-input]::-moz-placeholder{color:var(--_ui5-input-value-state-success-border-botom-color)}:host([value-state=Information]) [inner-input]::-webkit-input-placeholder{color:var(--_ui5-input-value-success-information-border-botom-color)}:host([value-state=Information]) [inner-input]::-moz-placeholder{color:var(--_ui5-input-value-success-information-border-botom-color)}.ui5-input-content{height:100%;box-sizing:border-box;display:flex;flex-direction:row;justify-content:flex-end;overflow:hidden;outline:none;background:transparent;color:inherit}:host([readonly]){border-color:var(--_ui5_input_readonly_border_color);background:var(--_ui5-input-readonly-background)}:host(:not([value-state]):not([readonly]):hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--_ui5-input-hover-box-shadow);background-image:var(--_ui5-input-background-image);background-size:100% var(--sapField_BorderWidth);background-repeat:repeat-x;background-position:bottom}:host(:not([value-state]):not([readonly])[focused]:hover),:host([value-state=None]:not([readonly])[focused]:hover){border-color:var(--_ui5-input-focused-border-color);box-shadow:var(--_ui5-input-focus-box-shadow)}:host(:not([value-state]):not([readonly]):hover){border:var(--_ui5-input-hover-border)}:host([focused]) .ui5-input-root:before{content:none}:host([value-state=None]:not([readonly]):hover){background-color:var(--sapField_Hover_Background);border:var(--_ui5-input-hover-border);box-shadow:var(--_ui5-input-hover-box-shadow)}:host([value-state]:not([value-state=None])){border-width:var(--_ui5_input_state_border_width)}:host([value-state=Error]) [inner-input],:host([value-state=Warning]) [inner-input]{font-style:var(--_ui5_input_error_warning_font_style)}:host([value-state=Error]) [inner-input]{font-weight:var(--_ui5_input_error_font_weight)}:host([value-state=Error]:not([readonly])){background-color:var(--sapField_InvalidBackground);border-color:var(--_ui5-input-value-state-error-border-color);background-image:var(--_ui5-input-error-background-image);background-size:100% var(--sapField_InvalidBorderWidth);background-repeat:repeat-x;background-position:bottom}:host([value-state=Error][focused]:not([readonly])){background-color:var(--_ui5-input-focused-value-state-error-background);border-color:var(--_ui5-input-focused-value-state-error-border-color);box-shadow:var(--_ui5-input-value-state-error-focus-box-shadow)}:host([value-state=Error]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-input-value-state-error-border-botom-color)}:host([value-state=Error]:not([readonly]):not([focused]):hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--_ui5-input-value-state-error-hover-box-shadow)}:host([value-state=Error]:not([readonly]):not([disabled])),:host([value-state=Information]:not([readonly]):not([disabled])),:host([value-state=Warning]:not([readonly]):not([disabled])){border-style:var(--_ui5_input_error_warning_border_style)}:host([value-state=Warning]:not([readonly])){background-color:var(--sapField_WarningBackground);border-color:var(--_ui5-input-value-state-warning-border-color);background-image:var(--_ui5-input-warning-background-image);background-size:100% var(--sapField_WarningBorderWidth);background-repeat:repeat-x;background-position:bottom}:host([value-state=Warning][focused]:not([readonly])){background-color:var(--_ui5-input-focused-value-state-warning-background);border-color:var(--_ui5-input-focused-value-state-warning-border-color);box-shadow:var(--_ui5-input-value-state-warning-focus-box-shadow)}:host([value-state=Warning]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-input-value-state-warning-border-botom-color)}:host([value-state=Warning]:not([readonly]):not([focused]):hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--_ui5-input-value-state-warning-hover-box-shadow)}:host([value-state=Success]:not([readonly])){background-color:var(--sapField_SuccessBackground);border-color:var(--_ui5-input-value-state-success-border-color);border-width:var(--_ui5-input-value-state-success-border-width);background-image:var(--_ui5-input-success-background-image);background-size:100% var(--sapField_SuccessBorderWidth);background-repeat:repeat-x;background-position:bottom}:host([value-state=Success][focused]:not([readonly])){background-color:var(--_ui5-input-focused-value-state-success-background);border-color:var(--_ui5-input-focused-value-state-success-border-color);box-shadow:var(--_ui5-input-value-state-success-focus-box-shadow)}:host([value-state=Success]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-input-value-state-success-border-botom-color)}:host([value-state=Success]:not([readonly]):not([focused]):hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--_ui5-input-value-state-success-hover-box-shadow)}:host([value-state=Information]:not([readonly])){background-color:var(--sapField_InformationBackground);border-color:var(--_ui5-input-value-state-information-border-color);border-width:var(--_ui5-input-information_border_width);background-image:var(--_ui5-input-information-background-image);background-size:100% var(--sapField_InformationBorderWidth);background-repeat:repeat-x;background-position:bottom}:host([value-state=Information][focused]:not([readonly])){background-color:var(--_ui5-input-focused-value-state-information-background);border-color:var(--_ui5-input-focused-value-state-information-border-color);box-shadow:var(--_ui5-input-focus-box-shadow)}:host([value-state=Information]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-input-value-success-information-border-botom-color)}:host([value-state=Information]:not([readonly]):not([focused]):hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--_ui5-input-value-state-information-hover-box-shadow)}[inner-input]::-ms-clear{height:0;width:0}.ui5-input-icon-root{min-width:var(--_ui5_input_icon_min_width);height:100%;display:flex;justify-content:center;align-items:center}::slotted([ui5-icon][slot=icon]){padding:var(--_ui5_input_icon_padding)}[inner-input]::-webkit-inner-spin-button,[inner-input]::-webkit-outer-spin-button{-webkit-appearance:inherit;margin:inherit}',
        };
        exports.default = i;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    wvzI: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var o = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          e = t(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          r = t(require("./sap_fiori_3/parameters-bundle.css.js"));
        function t(o) {
          return o && o.__esModule ? o : { default: o };
        }
        (0, o.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => e.default),
          (0, o.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => r.default);
        var n = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/ResponsivePopoverCommon.css",
          content:
            '.input-root-phone{flex:1;height:var(--_ui5_input_height);color:var(--sapField_TextColor);font-size:var(--sapFontSize);font-family:"72override",var(--sapFontFamily);background-color:var(--_ui5-input-background-color);border:var(--_ui5-input-border);border-radius:var(--_ui5-input-border-radius);box-sizing:border-box}.input-root-phone [inner-input]{padding:0 .5rem;width:100%;height:100%}.input-root-phone [inner-input]:focus{border-color:var(--_ui5-input-focused-border-color);background-color:var(--sapField_Focus_Background);box-shadow:var(--_ui5-input-focus-box-shadow)}.input-root-phone[value-state]:not([value-state=None])[focused]{outline:var(--_ui5_input_focus_border_width) dotted var(--sapContent_FocusColor);outline-offset:-4px}.input-root-phone [value-state=Error] [input-icon][data-ui5-compact-size],.input-root-phone [value-state=Success] [input-icon][data-ui5-compact-size],.input-root-phone [value-state=Warning] [input-icon][data-ui5-compact-size]{padding:.1875rem .5rem}[inner-input]{background:transparent;color:inherit;border:none;font-style:normal;-webkit-appearance:none;-moz-appearance:textfield;line-height:normal;padding:var(--_ui5_input_inner_padding);box-sizing:border-box;min-width:3rem;text-overflow:ellipsis;flex:1;outline:none;font-size:inherit;font-family:inherit;border-radius:var(--_ui5-input-border-radius)}[inner-input]::-moz-selection,[inner-input]::selection{background:var(--sapSelectedColor);color:var(--sapContent_ContrastTextColor)}[inner-input]::-webkit-input-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor)}[inner-input]::-moz-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor)}[inner-input]:-ms-input-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor)}.input-root-phone[value-state]:not([value-state=None]){border-width:var(--_ui5_input_state_border_width)}.input-root-phone[value-state=Error] [inner-input],.input-root-phone[value-state=Warning] [inner-input]{font-style:var(--_ui5_input_error_warning_font_style)}.input-root-phone[value-state=Error] [inner-input]{font-weight:var(--_ui5_input_error_font_weight)}.input-root-phone[value-state=Error]:not([readonly]){background-color:var(--sapField_InvalidBackground);border-color:var(--sapField_InvalidColor);background-image:var(--_ui5-input-error-background-image);background-size:100% var(--sapField_InvalidBorderWidth);background-repeat:repeat-x;background-position:bottom}.input-root-phone[value-state=Error]:not([readonly]) [inner-input]:focus{background-color:var(--_ui5-input-focused-value-state-error-background);border-color:var(--_ui5-input-focused-value-state-error-border-color);box-shadow:var(--_ui5-input-value-state-error-focus-box-shadow)}.input-root-phone[value-state=Error]:not([readonly]):not([disabled]),.input-root-phone[value-state=Warning]:not([readonly]):not([disabled]){border-style:var(--_ui5_input_error_warning_border_style)}.input-root-phone[value-state=Warning]:not([readonly]){background-color:var(--sapField_WarningBackground);border-color:var(--sapField_WarningColor);background-image:var(--_ui5-input-warning-background-image);background-size:100% var(--sapField_WarningBorderWidth);background-repeat:repeat-x;background-position:bottom}.input-root-phone[value-state=Warning]:not([readonly]) [inner-input]:focus{background-color:var(--_ui5-input-focused-value-state-warning-background);border-color:var(--_ui5-input-focused-value-state-warning-border-color);box-shadow:var(--_ui5-input-value-state-warning-focus-box-shadow)}.input-root-phone[value-state=Success]:not([readonly]){background-color:var(--sapField_SuccessBackground);border-color:var(--sapField_SuccessColor);background-image:var(--_ui5-input-success-background-image);background-size:100% var(--sapField_SuccessBorderWidth);background-repeat:repeat-x;background-position:bottom}.input-root-phone[value-state=Success]:not([readonly]) [inner-input]:focus{background-color:var(--_ui5-input-focused-value-state-success-background);border-color:var(--_ui5-input-focused-value-state-success-border-color);box-shadow:var(--_ui5-input-value-state-success-focus-box-shadow)}.input-root-phone[value-state=Information]:not([readonly]){background-color:var(--sapField_InformationBackground);border-color:var(--_ui5-input-value-state-information-border-color);border-width:var(--_ui5-input-information_border_width);background-image:var(--_ui5-input-information-background-image);background-size:100% var(--sapField_InformationBorderWidth);background-repeat:repeat-x;background-position:bottom}.input-root-phone[value-state=Information]:not([readonly]) [inner-input]:focus{background-color:var(--_ui5-input-focused-value-state-information-background);border-color:var(--_ui5-input-focused-value-state-information-border-color);box-shadow:var(--_ui5-input-focus-box-shadow)}.input-root-phone[value-state=None]:not([readonly]){background-image:var(--_ui5-input-background-image);background-size:100% var(--sapField_BorderWidth);background-repeat:repeat-x;background-position:bottom}[inner-input]::-ms-clear{height:0;width:0}.ui5-multi-combobox-toggle-button{margin-left:.5rem}.ui5-responsive-popover-header{width:100%;min-height:2.5rem;display:flex;flex-direction:column}.ui5-responsive-popover-header-text{width:calc(100% - var(--_ui5_button_base_min_width))}.ui5-responsive-popover-header .row{box-sizing:border-box;padding:.25rem 1rem;min-height:2.5rem;display:flex;justify-content:center;align-items:center;font-size:var(--sapFontHeader5Size)}.ui5-responsive-popover-footer{display:flex;justify-content:flex-end;padding:.25rem;width:100%}.ui5-responsive-popover-close-btn{position:absolute;right:1rem}',
        };
        exports.default = n;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    Pv08: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          a = r(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          s = r(require("./sap_fiori_3/parameters-bundle.css.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => a.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => s.default);
        var t = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/ValueStateMessage.css",
          content:
            '.ui5-valuestatemessage-popover{box-shadow:none}.ui5-input-value-state-message-icon{width:.875rem;height:.875rem;display:var(--_ui5_input_value_state_icon_display);position:absolute;padding-right:.5rem}.ui5-valuestatemessage-root .ui5-input-value-state-message-icon{left:.5rem}ui5-responsive-popover .ui5-valuestatemessage-header .ui5-input-value-state-message-icon{left:1rem}.ui5-input-value-state-message-icon[name=error]{color:var(--sapNegativeElementColor)}.ui5-input-value-state-message-icon[name=alert]{color:var(--sapCriticalElementColor)}.ui5-input-value-state-message-icon[name=success]{color:var(--sapPositiveElementColor)}.ui5-input-value-state-message-icon[name=information]{color:var(--sapInformativeElementColor)}.ui5-valuestatemessage-root{box-sizing:border-box;display:inline-block;color:var(--sapTextColor);font-size:var(--sapFontSmallSize);font-family:"72override",var(--sapFontFamily);height:auto;padding:var(--_ui5_value_state_message_padding);overflow:hidden;text-overflow:ellipsis;min-width:6.25rem;border:var(--_ui5_value_state_message_border)}ui5-responsive-popover .ui5-valuestatemessage-header{min-height:2rem;padding:var(--_ui5_value_state_header_padding)}.ui5-valuestatemessage--success{background:var(--sapSuccessBackground)}.ui5-valuestatemessage--warning{background:var(--sapWarningBackground)}.ui5-valuestatemessage--error{background:var(--sapErrorBackground)}.ui5-valuestatemessage--information{background:var(--sapInformationBackground)}.ui5-responsive-popover-header:focus,.ui5-responsive-popover-header[focused]{outline-offset:-.125rem;outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--_ui5_value_state_message_focus_border_radius)}',
        };
        exports.default = t;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    hH4D: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          i = t(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          s = t(require("./sap_fiori_3/parameters-bundle.css.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => i.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => s.default);
        var r = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/Suggestions.css",
          content:
            ".ui5-suggestions-popover:not(.ui5-suggestions-popover-with-value-state-header) [ui5-li-groupheader][focused]:first-child::part(native-li):after,.ui5-suggestions-popover:not(.ui5-suggestions-popover-with-value-state-header) [ui5-li-suggestion-item][focused]:first-child::part(native-li):after,.ui5-suggestions-popover:not(.ui5-suggestions-popover-with-value-state-header) [ui5-li][focused]:first-child::part(native-li):after,.ui5-tokenizer-list [ui5-li][focused]:first-child::part(native-li):after{border-top-left-radius:var(--_ui5_suggestions_item_focus_border_radius);border-top-right-radius:var(--_ui5_suggestions_item_focus_border_radius)}.ui5-suggestions-popover [ui5-li-suggestion-item][focused]:last-child::part(native-li):after,.ui5-suggestions-popover [ui5-li][focused]:last-child::part(native-li):after,.ui5-tokenizer-list [ui5-li][focused]:last-child::part(native-li):after{border-bottom-left-radius:var(--_ui5_suggestions_item_focus_border_radius);border-bottom-right-radius:var(--_ui5_suggestions_item_focus_border_radius)}",
        };
        exports.default = r;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    ItHX: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = _(require("@ui5/webcomponents-base/dist/UI5Element.js")),
          t = _(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js")),
          s = _(require("@ui5/webcomponents-base/dist/delegate/ResizeHandler.js")),
          i = require("@ui5/webcomponents-base/dist/Device.js"),
          n = _(require("@ui5/webcomponents-base/dist/types/ValueState.js")),
          o = require("@ui5/webcomponents-base/dist/FeaturesRegistry.js"),
          a = require("@ui5/webcomponents-base/dist/Keys.js"),
          u = _(require("@ui5/webcomponents-base/dist/types/Integer.js")),
          r = require("@ui5/webcomponents-base/dist/i18nBundle.js"),
          h = require("@ui5/webcomponents-base/dist/util/AriaLabelHelper.js"),
          l = require("@ui5/webcomponents-base/dist/util/Caret.js");
        require("@ui5/webcomponents-icons/dist/decline.js"), require("@ui5/webcomponents-icons/dist/not-editable.js");
        var g = _(require("./types/InputType.js")),
          p = _(require("./Popover.js")),
          d = _(require("./generated/templates/InputTemplate.lit.js")),
          c = _(require("./generated/templates/InputPopoverTemplate.lit.js")),
          S = require("./generated/i18n/i18n-defaults.js"),
          v = _(require("./generated/themes/Input.css.js")),
          f = _(require("./generated/themes/ResponsivePopoverCommon.css.js")),
          m = _(require("./generated/themes/ValueStateMessage.css.js")),
          I = _(require("./generated/themes/Suggestions.css.js"));
        function _(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const T = new RegExp(/(\+|-)?\d+(\.|,)\d+/),
          w = {
            tag: "ui5-input",
            languageAware: !0,
            managedSlots: !0,
            slots: {
              icon: { type: HTMLElement },
              default: { propertyName: "suggestionItems", type: HTMLElement },
              formSupport: { type: HTMLElement },
              valueStateMessage: { type: HTMLElement },
            },
            properties: {
              disabled: { type: Boolean },
              highlight: { type: Boolean },
              placeholder: { type: String },
              readonly: { type: Boolean },
              required: { type: Boolean },
              type: { type: g.default, defaultValue: g.default.Text },
              value: { type: String },
              valueState: { type: n.default, defaultValue: n.default.None },
              name: { type: String },
              showSuggestions: { type: Boolean },
              maxlength: { type: u.default },
              accessibleName: { type: String },
              accessibleNameRef: { type: String, defaultValue: "" },
              focused: { type: Boolean },
              _isValueStateFocused: { type: Boolean },
              open: { type: Boolean },
              _input: { type: Object },
              _inputAccInfo: { type: Object },
              _nativeInputAttributes: { type: Object },
              _inputWidth: { type: u.default },
              _listWidth: { type: u.default },
              _isPopoverOpen: { type: Boolean, noAttribute: !0 },
              _inputIconFocused: { type: Boolean, noAttribute: !0 },
            },
            events: {
              change: {},
              input: {},
              "suggestion-item-select": { detail: { item: { type: HTMLElement } } },
              "suggestion-item-preview": { detail: { item: { type: HTMLElement }, targetRef: { type: HTMLElement } } },
              "suggestion-scroll": {
                detail: { scrollTop: { type: u.default }, scrollContainer: { type: HTMLElement } },
              },
            },
          };
        class y extends e.default {
          static get metadata() {
            return w;
          }
          static get render() {
            return t.default;
          }
          static get template() {
            return d.default;
          }
          static get staticAreaTemplate() {
            return c.default;
          }
          static get styles() {
            return v.default;
          }
          static get staticAreaStyles() {
            return [f.default, m.default, I.default];
          }
          constructor() {
            super(),
              (this.hasSuggestionItemSelected = !1),
              (this.valueBeforeItemSelection = ""),
              (this.valueBeforeItemPreview = ""),
              (this.suggestionSelectionCanceled = !1),
              (this._changeFired = !1),
              (this.previousValue = void 0),
              (this.firstRendering = !0),
              (this.highlightValue = ""),
              (this.lastConfirmedValue = ""),
              (this._backspaceKeyDown = !1),
              (this.EVENT_CHANGE = "change"),
              (this.EVENT_INPUT = "input"),
              (this.EVENT_SUGGESTION_ITEM_SELECT = "suggestion-item-select"),
              (this.ACTION_ENTER = "enter"),
              (this.ACTION_USER_INPUT = "input"),
              (this.suggestionsTexts = []),
              (this._handleResizeBound = this._handleResize.bind(this));
          }
          onEnterDOM() {
            s.default.register(this, this._handleResizeBound);
          }
          onExitDOM() {
            s.default.deregister(this, this._handleResizeBound);
          }
          onBeforeRendering() {
            this.showSuggestions &&
              (this.enableSuggestions(),
              (this.suggestionsTexts = this.Suggestions.defaultSlotProperties(this.highlightValue))),
              (this.open = this.open && (!!this.suggestionItems.length || this._isPhone));
            const e = (0, o.getFeature)("FormSupport");
            e
              ? e.syncNativeHiddenInput(this)
              : this.name &&
                console.warn(
                  'In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";'
                );
          }
          async onAfterRendering() {
            this.Suggestions &&
              (this.Suggestions.toggle(this.open, { preventFocusRestore: !0 }),
              (this._listWidth = await this.Suggestions._getListWidth())),
              this.shouldDisplayOnlyValueStateMessage ? this.openPopover() : this.closePopover();
          }
          _onkeydown(e) {
            return (0, a.isUp)(e)
              ? this._handleUp(e)
              : (0, a.isDown)(e)
              ? this._handleDown(e)
              : (0, a.isSpace)(e)
              ? this._handleSpace(e)
              : (0, a.isTabNext)(e)
              ? this._handleTab(e)
              : (0, a.isEnter)(e)
              ? this._handleEnter(e)
              : (0, a.isEscape)(e)
              ? this._handleEscape(e)
              : ((0, a.isBackSpace)(e) &&
                  ((this._backspaceKeyDown = !0), (this._selectedText = window.getSelection().toString())),
                this.showSuggestions && this._clearPopoverFocusAndSelection(),
                void (this._keyDown = !0));
          }
          _onkeyup(e) {
            (this._keyDown = !1), (this._backspaceKeyDown = !1);
          }
          _handleUp(e) {
            this.Suggestions && this.Suggestions.isOpened() && this.Suggestions.onUp(e);
          }
          _handleDown(e) {
            this.Suggestions && this.Suggestions.isOpened() && this.Suggestions.onDown(e);
          }
          _handleSpace(e) {
            this.Suggestions && this.Suggestions.onSpace(e);
          }
          _handleTab(e) {
            this.Suggestions && this.previousValue !== this.value && this.Suggestions.onTab(e);
          }
          _handleEnter(e) {
            if (!!(!this.Suggestions || !this.Suggestions.onEnter(e)))
              return this.fireEventByAction(this.ACTION_ENTER), void (this.lastConfirmedValue = this.value);
            this.focused = !0;
          }
          _handleEscape() {
            const e = this.showSuggestions && !!this.Suggestions,
              t = e && this.open;
            t
              ? (e &&
                  t &&
                  this.Suggestions._isItemOnTarget() &&
                  ((this.value = this.valueBeforeItemPreview),
                  (this.suggestionSelectionCanceled = !0),
                  (this.focused = !0)),
                this._isValueStateFocused && ((this._isValueStateFocused = !1), (this.focused = !0)),
                (this.open = !1))
              : (this.value = this.lastConfirmedValue ? this.lastConfirmedValue : this.previousValue);
          }
          async _onfocusin(e) {
            await this.getInputDOMRef(),
              (this.focused = !0),
              (this.previousValue = this.value),
              (this.valueBeforeItemPreview = this.value),
              (this._inputIconFocused = e.target && e.target === this.querySelector("[ui5-icon]"));
          }
          _onfocusout(e) {
            const t =
                this.Suggestions &&
                e.relatedTarget &&
                e.relatedTarget.shadowRoot &&
                e.relatedTarget.shadowRoot.contains(this.Suggestions.responsivePopover),
              s =
                e.relatedTarget &&
                e.relatedTarget.shadowRoot &&
                e.relatedTarget.shadowRoot.querySelector(".ui5-valuestatemessage-root");
            if (t || s) return void e.stopImmediatePropagation();
            const i = e.relatedTarget;
            (i && i.classList.contains(this._id)) ||
              (this.closePopover(),
              this._clearPopoverFocusAndSelection(),
              (this.previousValue = ""),
              (this.lastConfirmedValue = ""),
              (this.focused = !1),
              (this.open = !1));
          }
          _clearPopoverFocusAndSelection() {
            this.showSuggestions &&
              this.Suggestions &&
              ((this._isValueStateFocused = !1),
              (this.hasSuggestionItemSelected = !1),
              this.Suggestions._deselectItems(),
              this.Suggestions._clearItemFocus());
          }
          _click(e) {
            (0, i.isPhone)() && !this.readonly && this.Suggestions && (this.blur(), (this.open = !0));
          }
          _handleChange(e) {
            this._changeFired || this.fireEvent(this.EVENT_CHANGE), (this._changeFired = !1);
          }
          _scroll(e) {
            const t = e.detail;
            this.fireEvent("suggestion-scroll", { scrollTop: t.scrollTop, scrollContainer: t.targetRef });
          }
          async _handleInput(e) {
            const t = await this.getInputDOMRef(),
              s = this.value && this.isTypeNumber && !t.value;
            if (((this.suggestionSelectionCanceled = !1), !s || this._backspaceKeyDown)) {
              if (s && this._backspaceKeyDown && T.test(this.value) && this._selectedText !== this.value) {
                const e = this.removeFractionalPart(this.value);
                return (
                  (this.value = e),
                  (this.highlightValue = e),
                  (this.valueBeforeItemPreview = e),
                  this.fireEvent(this.EVENT_INPUT),
                  void this.fireEvent("value-changed")
                );
              }
              e.target === t && ((this.focused = !0), e.stopImmediatePropagation()),
                !(t.value === this.value && (0, i.isIE)() && !this._keyDown && !!this.placeholder) &&
                  this.fireEventByAction(this.ACTION_USER_INPUT),
                (this.hasSuggestionItemSelected = !1),
                (this._isValueStateFocused = !1),
                this.Suggestions &&
                  (this.Suggestions.updateSelectedItemPosition(null), this._isPhone || (this.open = !!t.value));
            }
          }
          _handleResize() {
            this._inputWidth = this.offsetWidth;
          }
          _closeRespPopover(e) {
            this.Suggestions.close(e);
          }
          async _afterOpenPopover() {
            (0, i.isPhone)() && (await this.getInputDOMRef()).focus();
          }
          _afterClosePopover() {
            this.announceSelectedItem(), (0, i.isPhone)() && (this.blur(), (this.focused = !1));
          }
          isValueStateOpened() {
            return !!this._isPopoverOpen;
          }
          async openPopover() {
            const e = await this._getPopover();
            e && ((this._isPopoverOpen = !0), e.showAt(this));
          }
          async closePopover() {
            const e = await this._getPopover();
            e && e.close();
          }
          async _getPopover() {
            const e = await this.getStaticAreaItemDomRef();
            return e && e.querySelector("[ui5-popover]");
          }
          enableSuggestions() {
            if (this.Suggestions) return;
            const e = (0, o.getFeature)("InputSuggestions");
            if (!e)
              throw new Error(
                'You have to import "@ui5/webcomponents/dist/features/InputSuggestions.js" module to use ui5-input suggestions'
              );
            this.Suggestions = new e(this, "suggestionItems", !0);
          }
          selectSuggestion(e, t) {
            if (e.group) return;
            const s = e.text || e.textContent,
              i = t ? this.valueBeforeItemSelection !== s : this.value !== s;
            (this.hasSuggestionItemSelected = !0),
              i &&
                ((this.value = s),
                (this.valueBeforeItemSelection = s),
                (this.lastConfirmedValue = s),
                this.fireEvent(this.EVENT_INPUT),
                this.fireEvent(this.EVENT_CHANGE),
                (this._changeFired = !0)),
              (this.valueBeforeItemPreview = ""),
              (this.suggestionSelectionCanceled = !1),
              this.fireEvent(this.EVENT_SUGGESTION_ITEM_SELECT, { item: e });
          }
          previewSuggestion(e) {
            (this.valueBeforeItemSelection = this.value),
              this.updateValueOnPreview(e),
              this.announceSelectedItem(),
              (this._previewItem = e);
          }
          updateValueOnPreview(e) {
            const t =
              "Inactive" === e.type || e.group ? this.valueBeforeItemPreview : e.effectiveTitle || e.textContent;
            this.value = t;
          }
          get previewItem() {
            return this._previewItem ? this.getSuggestionByListItem(this._previewItem) : null;
          }
          async fireEventByAction(e) {
            if ((await this.getInputDOMRef(), this.disabled || this.readonly)) return;
            const t = await this.getInputValue(),
              s = e === this.ACTION_USER_INPUT,
              n = await this.getInputDOMRef(),
              o = n.selectionStart;
            if (
              ((this.value = t),
              (this.highlightValue = t),
              (this.valueBeforeItemPreview = t),
              (0, i.isSafari)() &&
                setTimeout(() => {
                  (n.selectionStart = o), (n.selectionEnd = o);
                }, 0),
              s)
            )
              return this.fireEvent(this.EVENT_INPUT), void this.fireEvent("value-changed");
            const a = void 0 !== this.previousValue && this.previousValue !== this.value;
            (0, i.isIE)() && e === this.ACTION_ENTER && a && this.fireEvent(this.EVENT_CHANGE);
          }
          async getInputValue() {
            return this.getDomRef() ? (await this.getInputDOMRef()).value : "";
          }
          async getInputDOMRef() {
            return (0, i.isPhone)() && this.Suggestions
              ? (await this.Suggestions._getSuggestionPopover(),
                this.Suggestions && this.Suggestions.responsivePopover.querySelector(".ui5-input-inner-phone"))
              : this.nativeInput;
          }
          get nativeInput() {
            return this.getDomRef() && this.getDomRef().querySelector("input");
          }
          get nativeInputWidth() {
            return this.nativeInput && this.nativeInput.offsetWidth;
          }
          getLabelableElementId() {
            return this.getInputId();
          }
          getSuggestionByListItem(e) {
            const t = parseInt(e.getAttribute("data-ui5-key"));
            return this.suggestionItems[t];
          }
          isSuggestionsScrollable() {
            return this.Suggestions ? this.Suggestions._isScrollable() : Promise.resolve(!1);
          }
          getInputId() {
            return `${this._id}-inner`;
          }
          onItemFocused() {}
          onItemMouseOver(e) {
            const t = e.target,
              s = this.getSuggestionByListItem(t);
            s && s.fireEvent("mouseover", { item: s, targetRef: t });
          }
          onItemMouseOut(e) {
            const t = e.target,
              s = this.getSuggestionByListItem(t);
            s && s.fireEvent("mouseout", { item: s, targetRef: t });
          }
          onItemSelected(e, t) {
            this.selectSuggestion(e, t);
          }
          onItemPreviewed(e) {
            this.previewSuggestion(e),
              this.fireEvent("suggestion-item-preview", { item: this.getSuggestionByListItem(e), targetRef: e });
          }
          onOpen() {}
          onClose() {}
          valueStateTextMappings() {
            return {
              Success: y.i18nBundle.getText(S.VALUE_STATE_SUCCESS),
              Information: y.i18nBundle.getText(S.VALUE_STATE_INFORMATION),
              Error: y.i18nBundle.getText(S.VALUE_STATE_ERROR),
              Warning: y.i18nBundle.getText(S.VALUE_STATE_WARNING),
            };
          }
          announceSelectedItem() {
            const e = this.shadowRoot.querySelector(`#${this._id}-selectionText`);
            this.Suggestions && this.Suggestions._isItemOnTarget()
              ? (e.textContent = this.itemSelectionAnnounce)
              : (e.textContent = "");
          }
          get _readonly() {
            return this.readonly && !this.disabled;
          }
          get _headerTitleText() {
            return y.i18nBundle.getText(S.INPUT_SUGGESTIONS_TITLE);
          }
          get inputType() {
            return this.type.toLowerCase();
          }
          get isTypeNumber() {
            return this.type === g.default.Number;
          }
          get suggestionsTextId() {
            return this.showSuggestions ? `${this._id}-suggestionsText` : "";
          }
          get valueStateTextId() {
            return this.hasValueState ? `${this._id}-valueStateDesc` : "";
          }
          get accInfo() {
            const e = this.showSuggestions ? "true" : void 0,
              t = this.showSuggestions ? "list" : void 0,
              s = this._inputAccInfo.ariaDescribedBy
                ? `${this.suggestionsTextId} ${this.valueStateTextId} ${this._inputAccInfo.ariaDescribedBy}`.trim()
                : `${this.suggestionsTextId} ${this.valueStateTextId}`.trim();
            return {
              input: {
                ariaRoledescription: this._inputAccInfo && (this._inputAccInfo.ariaRoledescription || void 0),
                ariaDescribedBy: s || void 0,
                ariaInvalid: this.valueState === n.default.Error ? "true" : void 0,
                ariaHasPopup: this._inputAccInfo.ariaHasPopup ? this._inputAccInfo.ariaHasPopup : e,
                ariaAutoComplete: this._inputAccInfo.ariaAutoComplete ? this._inputAccInfo.ariaAutoComplete : t,
                role: this._inputAccInfo && this._inputAccInfo.role,
                ariaControls: this._inputAccInfo && this._inputAccInfo.ariaControls,
                ariaExpanded: this._inputAccInfo && this._inputAccInfo.ariaExpanded,
                ariaDescription: this._inputAccInfo && this._inputAccInfo.ariaDescription,
                ariaLabel:
                  (this._inputAccInfo && this._inputAccInfo.ariaLabel) || (0, h.getEffectiveAriaLabelText)(this),
              },
            };
          }
          get nativeInputAttributes() {
            return {
              min: this.isTypeNumber ? this._nativeInputAttributes.min : void 0,
              max: this.isTypeNumber ? this._nativeInputAttributes.max : void 0,
              step: this.isTypeNumber ? this._nativeInputAttributes.step || "any" : void 0,
            };
          }
          get ariaValueStateHiddenText() {
            if (this.hasValueStateMessage)
              return this.shouldDisplayDefaultValueStateMessage
                ? this.valueStateText
                : this.valueStateMessageText.map((e) => e.textContent).join(" ");
          }
          get itemSelectionAnnounce() {
            return this.Suggestions ? this.Suggestions.itemSelectionAnnounce : void 0;
          }
          get classes() {
            return {
              popover: {
                "ui5-suggestions-popover": !this.isPhone && this.showSuggestions,
                "ui5-suggestions-popover-with-value-state-header":
                  !this.isPhone && this.showSuggestions && this.hasValueStateMessage,
              },
              popoverValueState: {
                "ui5-valuestatemessage-root": !0,
                "ui5-valuestatemessage-header": !0,
                "ui5-valuestatemessage--success": this.valueState === n.default.Success,
                "ui5-valuestatemessage--error": this.valueState === n.default.Error,
                "ui5-valuestatemessage--warning": this.valueState === n.default.Warning,
                "ui5-valuestatemessage--information": this.valueState === n.default.Information,
              },
            };
          }
          get styles() {
            const e = parseInt(getComputedStyle(document.documentElement).fontSize),
              t = {
                popoverHeader: { "max-width": `${this._inputWidth}px` },
                suggestionPopoverHeader: {
                  display: 0 === this._listWidth ? "none" : "inline-block",
                  width: `${this._listWidth}px`,
                },
                suggestionsPopover: {
                  "min-width": `${this._inputWidth}px`,
                  "max-width": this._inputWidth / e > 40 ? `${this._inputWidth}px` : "40rem",
                },
                innerInput: {},
              };
            return this.nativeInputWidth < 48 && (t.innerInput.padding = "0"), t;
          }
          get suggestionSeparators() {
            return "None";
          }
          get valueStateMessageText() {
            return this.getSlottedNodes("valueStateMessage").map((e) => e.cloneNode(!0));
          }
          get shouldDisplayOnlyValueStateMessage() {
            return this.hasValueStateMessage && !this.open && this.focused;
          }
          get shouldDisplayDefaultValueStateMessage() {
            return !this.valueStateMessage.length && this.hasValueStateMessage;
          }
          get hasValueState() {
            return this.valueState !== n.default.None;
          }
          get hasValueStateMessage() {
            return (
              this.hasValueState &&
              this.valueState !== n.default.Success &&
              (!this._inputIconFocused || (this._isPhone && this.Suggestions))
            );
          }
          get valueStateText() {
            return this.valueStateTextMappings()[this.valueState];
          }
          get suggestionsText() {
            return y.i18nBundle.getText(S.INPUT_SUGGESTIONS);
          }
          get availableSuggestionsCount() {
            if (this.showSuggestions && (this.value || this.Suggestions.isOpened()))
              switch (this.suggestionsTexts.length) {
                case 0:
                  return y.i18nBundle.getText(S.INPUT_SUGGESTIONS_NO_HIT);
                case 1:
                  return y.i18nBundle.getText(S.INPUT_SUGGESTIONS_ONE_HIT);
                default:
                  return y.i18nBundle.getText(S.INPUT_SUGGESTIONS_MORE_HITS, this.suggestionsTexts.length);
              }
          }
          get step() {
            return this.isTypeNumber ? "any" : void 0;
          }
          get _isPhone() {
            return (0, i.isPhone)();
          }
          get _placeholder() {
            return this.placeholder;
          }
          get _valueStateInputIcon() {
            const e = `\n\t\t<svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 20 20" fill="none">\n\t\t\t${
              {
                Error:
                  '<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071C5.90237 13.3166 5.90237 12.6834 6.29289 12.2929L8.58579 10L6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289L10 8.58579L12.2929 6.29289C12.6834 5.90237 13.3166 5.90237 13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711L11.4142 10L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L10 11.4142L7.70711 13.7071Z" fill="#EE3939"/>',
                Warning:
                  '<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M11.8619 0.49298C11.6823 0.187541 11.3544 0 11 0C10.6456 0 10.3177 0.187541 10.1381 0.49298L0.138066 17.493C-0.0438112 17.8022 -0.0461447 18.1851 0.13195 18.4965C0.310046 18.8079 0.641283 19 1 19H21C21.3587 19 21.69 18.8079 21.868 18.4965C22.0461 18.1851 22.0438 17.8022 21.8619 17.493L11.8619 0.49298ZM11 6C11.5523 6 12 6.44772 12 7V10C12 10.5523 11.5523 11 11 11C10.4477 11 10 10.5523 10 10V7C10 6.44772 10.4477 6 11 6ZM11 16C11.8284 16 12.5 15.3284 12.5 14.5C12.5 13.6716 11.8284 13 11 13C10.1716 13 9.5 13.6716 9.5 14.5C9.5 15.3284 10.1716 16 11 16Z" fill="#F58B00"/>',
                Success:
                  '<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10ZM14.7071 6.29289C14.3166 5.90237 13.6834 5.90237 13.2929 6.29289L8 11.5858L6.70711 10.2929C6.31658 9.90237 5.68342 9.90237 5.29289 10.2929C4.90237 10.6834 4.90237 11.3166 5.29289 11.7071L7.29289 13.7071C7.68342 14.0976 8.31658 14.0976 8.70711 13.7071L14.7071 7.70711C15.0976 7.31658 15.0976 6.68342 14.7071 6.29289Z" fill="#36A41D"/>',
                Information:
                  '<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M3 0C1.34315 0 0 1.34315 0 3V15C0 16.6569 1.34315 18 3 18H15C16.6569 18 18 16.6569 18 15V3C18 1.34315 16.6569 0 15 0H3ZM9 6.5C9.82843 6.5 10.5 5.82843 10.5 5C10.5 4.17157 9.82843 3.5 9 3.5C8.17157 3.5 7.5 4.17157 7.5 5C7.5 5.82843 8.17157 6.5 9 6.5ZM9 8.5C9.55228 8.5 10 8.94772 10 9.5V13.5C10 14.0523 9.55228 14.5 9 14.5C8.44771 14.5 8 14.0523 8 13.5V9.5C8 8.94772 8.44771 8.5 9 8.5Z" fill="#1B90FF"/>',
              }[this.valueState]
            };\n\t\t</svg>\n\t\t`;
            return this.valueState !== n.default.None ? e : "";
          }
          get _valueStateMessageInputIcon() {
            return this.valueState !== n.default.None
              ? { Error: "error", Warning: "alert", Success: "sys-enter-2", Information: "information" }[
                  this.valueState
                ]
              : "";
          }
          getCaretPosition() {
            return (0, l.getCaretPosition)(this.nativeInput);
          }
          setCaretPosition(e) {
            (0, l.setCaretPosition)(this.nativeInput, e);
          }
          removeFractionalPart(e) {
            return e.includes(".") ? e.slice(0, e.indexOf(".")) : e.includes(",") ? e.slice(0, e.indexOf(",")) : e;
          }
          static get dependencies() {
            const e = (0, o.getFeature)("InputSuggestions");
            return [p.default].concat(e ? e.dependencies : []);
          }
          static async onDefine() {
            const e = (0, o.getFeature)("InputSuggestions");
            [y.i18nBundle] = await Promise.all([
              (0, r.getI18nBundle)("@ui5/webcomponents"),
              e ? e.init() : Promise.resolve(),
            ]);
          }
        }
        y.define();
        var E = y;
        exports.default = E;
      },
      {
        "@ui5/webcomponents-base/dist/UI5Element.js": "Kogr",
        "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG",
        "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js": "C7rv",
        "@ui5/webcomponents-base/dist/Device.js": "Oq9i",
        "@ui5/webcomponents-base/dist/types/ValueState.js": "rs1i",
        "@ui5/webcomponents-base/dist/FeaturesRegistry.js": "rnHX",
        "@ui5/webcomponents-base/dist/Keys.js": "glQL",
        "@ui5/webcomponents-base/dist/types/Integer.js": "y11y",
        "@ui5/webcomponents-base/dist/i18nBundle.js": "F4Ye",
        "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js": "OuVZ",
        "@ui5/webcomponents-base/dist/util/Caret.js": "czLi",
        "@ui5/webcomponents-icons/dist/decline.js": "vj7t",
        "@ui5/webcomponents-icons/dist/not-editable.js": "GIi0",
        "./types/InputType.js": "pDiJ",
        "./Popover.js": "ZHo6",
        "./generated/templates/InputTemplate.lit.js": "RIFo",
        "./generated/templates/InputPopoverTemplate.lit.js": "h664",
        "./generated/i18n/i18n-defaults.js": "XB3p",
        "./generated/themes/Input.css.js": "SI9d",
        "./generated/themes/ResponsivePopoverCommon.css.js": "wvzI",
        "./generated/themes/ValueStateMessage.css.js": "Pv08",
        "./generated/themes/Suggestions.css.js": "hH4D",
      },
    ],
    eZ0Q: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        class e {
          static hasGroup(e) {
            return this.groups.has(e);
          }
          static getGroup(e) {
            return this.groups.get(e);
          }
          static getCheckedRadioFromGroup(e) {
            return this.checkedRadios.get(e);
          }
          static removeGroup(e) {
            return this.checkedRadios.delete(e), this.groups.delete(e);
          }
          static addToGroup(e, t) {
            this.hasGroup(t) ? (this.enforceSingleSelection(e, t), this.getGroup(t).push(e)) : this.createGroup(e, t),
              this.updateTabOrder(t);
          }
          static removeFromGroup(e, t) {
            if (!this.hasGroup(t)) return;
            const s = this.getGroup(t),
              i = this.getCheckedRadioFromGroup(t);
            s.forEach((t, s, i) => {
              if (e._id === t._id) return i.splice(s, 1);
            }),
              i === e && this.checkedRadios.set(t, null),
              s.length || this.removeGroup(t),
              this.updateTabOrder(t);
          }
          static createGroup(e, t) {
            e.checked && this.checkedRadios.set(t, e), this.groups.set(t, [e]);
          }
          static selectNextItem(e, t) {
            const s = this.getGroup(t),
              i = s.length,
              r = s.indexOf(e);
            if (i <= 1) return;
            const c = this._nextSelectable(r, s);
            this.updateSelectionInGroup(c, t);
          }
          static updateTabOrder(e) {
            if (!this.hasGroup(e)) return;
            const t = this.getGroup(e),
              s = t.some((e) => e.checked);
            t.filter((e) => !e.disabled).forEach((e, t) => {
              e._tabIndex = s ? (e.checked ? "0" : "-1") : 0 === t ? "0" : "-1";
            });
          }
          static selectPreviousItem(e, t) {
            const s = this.getGroup(t),
              i = s.length,
              r = s.indexOf(e);
            if (i <= 1) return;
            const c = this._previousSelectable(r, s);
            this.updateSelectionInGroup(c, t);
          }
          static selectItem(e, t) {
            this.updateSelectionInGroup(e, t), this.updateTabOrder(t);
          }
          static updateSelectionInGroup(e, t) {
            const s = this.getCheckedRadioFromGroup(t);
            this._deselectRadio(s), this._selectRadio(e), this.checkedRadios.set(t, e);
          }
          static _deselectRadio(e) {
            e && (e.checked = !1);
          }
          static _selectRadio(e) {
            e && (e.focus(), (e.checked = !0), (e._checked = !0), e.fireEvent("change"));
          }
          static _nextSelectable(e, t) {
            let s = null;
            if (e === t.length - 1) {
              if (t[0].disabled || t[0].readonly) return this._nextSelectable(1, t);
              s = t[0];
            } else {
              if (t[e + 1].disabled || t[e + 1].readonly) return this._nextSelectable(e + 1, t);
              s = t[e + 1];
            }
            return s;
          }
          static _previousSelectable(e, t) {
            const s = t.length;
            let i = null;
            if (0 === e) {
              if (t[s - 1].disabled || t[s - 1].readonly) return this._previousSelectable(s - 1, t);
              i = t[s - 1];
            } else {
              if (t[e - 1].disabled || t[e - 1].readonly) return this._previousSelectable(e - 1, t);
              i = t[e - 1];
            }
            return i;
          }
          static enforceSingleSelection(e, t) {
            const s = this.getCheckedRadioFromGroup(t);
            e.checked
              ? s
                ? e !== s && (this._deselectRadio(s), this.checkedRadios.set(t, e))
                : this.checkedRadios.set(t, e)
              : e === s && this.checkedRadios.set(t, null),
              this.updateTabOrder(t);
          }
          static get groups() {
            return this._groups || (this._groups = new Map()), this._groups;
          }
          static get checkedRadios() {
            return this._checkedRadios || (this._checkedRadios = new Map()), this._checkedRadios;
          }
        }
        var t = e;
        exports.default = t;
      },
      {},
    ],
    K1fZ: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const i = (i, r, n) =>
            e.html`<div class="ui5-radio-root ${(0, e.classMap)(i.classes.main)}" role="radio" aria-checked="${(0,
            e.ifDefined)(i.checked)}" aria-readonly="${(0, e.ifDefined)(i.ariaReadonly)}" aria-disabled="${(0,
            e.ifDefined)(i.ariaDisabled)}" aria-label="${(0, e.ifDefined)(i.ariaLabelText)}" aria-describedby="${(0,
            e.ifDefined)(i.ariaDescribedBy)}" tabindex="${(0, e.ifDefined)(i.tabIndex)}" dir="${(0, e.ifDefined)(
              i.effectiveDir
            )}" @click="${i._onclick}" @keydown="${i._onkeydown}" @keyup="${i._onkeyup}" @mousedown="${
              i._onmousedown
            }" @mouseup="${i._onmouseup}" @focusout="${i._onfocusout}"><div class='ui5-radio-inner ${(0, e.classMap)(
              i.classes.inner
            )}'><svg class="ui5-radio-svg" focusable="false" aria-hidden="true">${s(
              i,
              r,
              n
            )}</svg><input type='radio' ?checked="${i.checked}" ?readonly="${i.readonly}" ?disabled="${
              i.disabled
            }" name="${(0, e.ifDefined)(i.name)}" data-sap-no-tab-ref/></div>${i.text ? a(i, r, n) : void 0}${
              i.hasValueState ? d(i, r, n) : void 0
            }</div>`,
          a = (i, a, d) =>
            e.html`<${(0, e.scopeTag)("ui5-label", a, d)} id="${(0, e.ifDefined)(
              i._id
            )}-label" class="ui5-radio-label" for="${(0, e.ifDefined)(i._id)}" wrapping-type="${(0, e.ifDefined)(
              i.wrappingType
            )}">${(0, e.ifDefined)(i.text)}</${(0, e.scopeTag)("ui5-label", a, d)}>`,
          d = (i, a, d) =>
            e.html`<span id="${(0, e.ifDefined)(i._id)}-descr" class="ui5-hidden-text">${(0, e.ifDefined)(
              i.valueStateText
            )}</span>`,
          s = (i, a, d) =>
            e.svg`<circle class="ui5-radio-svg-outer" cx="50%" cy="50%" r="50%" /><circle class="ui5-radio-svg-inner" cx="50%" cy="50%" r="22%" />`;
        var r = i;
        exports.default = r;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    cOGb: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var o = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          r = t(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          i = t(require("./sap_fiori_3/parameters-bundle.css.js"));
        function t(o) {
          return o && o.__esModule ? o : { default: o };
        }
        (0, o.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => r.default),
          (0, o.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => i.default);
        var e = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/RadioButton.css",
          content:
            '.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block}:host{min-width:var(--_ui5_radio_button_min_width);max-width:100%;text-overflow:ellipsis;overflow:hidden;color:var(--_ui5_radio_button_color);cursor:pointer;border-radius:var(--_ui5_radio_button_border_radius);transition:var(--_ui5_radio_button_transition)}:host([checked]){color:var(--_ui5_radio_button_checked_fill)}:host([checked]) .ui5-radio-svg-inner{fill:currentColor}:host([checked]) .ui5-radio-svg-outer{stroke:var(--_ui5_radio_button_outer_ring_color)}:host([disabled]) .ui5-radio-root{color:var(--_ui5_radio_button_color);opacity:var(--sapContent_DisabledOpacity)}:host([disabled][checked]) .ui5-radio-svg-outer{stroke:var(--_ui5_radio_button_color)}:host(:not([disabled])) .ui5-radio-root:focus:before{content:"";display:var(--_ui5_radio_button_focus_outline);position:absolute;top:var(--_ui5_radio_button_focus_dist);bottom:var(--_ui5_radio_button_focus_dist);left:var(--_ui5_radio_button_focus_dist);right:var(--_ui5_radio_button_focus_dist);pointer-events:none;border:var(--_ui5_radio_button_border_width) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--_ui5_radio_button_border_radius)}:host(:not([disabled])[readonly]) .ui5-radio-root:focus:before{border:var(--_ui5_radio_button_border_width) var(--_ui5_radio_button_border_readonly_focus_style) var(--sapContent_FocusColor)}:host(:not([disabled])) .ui5-radio-root:focus{border-radius:var(--_ui5_radio_button_border_radius);border:var(--_ui5_radio_button_focus_border)}:host(:not([disabled]):hover){background:var(--_ui5_radio_button_hover_background);box-shadow:var(--_ui5_radio_button_hover_shadow)}:host(:not([active]):not([value-state=Error]):not([value-state=Warning])) .ui5-radio-root:hover .ui5-radio-inner--hoverable .ui5-radio-svg-outer{fill:var(--_ui5_radio_button_hover_fill);stroke:var(--_ui5_radio_button_outer_ring_hover_color)}:host(:not([value-state=Error]):not([value-state=Warning])[checked]) .ui5-radio-root:hover .ui5-radio-inner--hoverable .ui5-radio-svg-outer{fill:var(--_ui5_radio_button_hover_fill);stroke:var(--_ui5_radio_button_outer_ring_checked_hover_color)}:host([active][checked]:not([value-state])) .ui5-radio-svg-outer{stroke:var(--_ui5_radio_button_outer_ring_checked_hover_color)}:host([active]:not([checked]):not([value-state])) .ui5-radio-svg-outer{stroke:var(--_ui5_radio_button_outer_ring_active_color)}:host([text]) .ui5-radio-root:focus:before{right:0}:host([text]) .ui5-radio-inner{padding:var(--_ui5_radio_button_outer_ring_padding_with_label)}:host([checked][readonly]) .ui5-radio-svg-inner{fill:var(--sapContent_NonInteractiveIconColor)}:host([readonly]) .ui5-radio-root .ui5-radio-svg-outer{fill:var(--sapField_ReadOnly_Background);stroke:var(--sapField_ReadOnly_BorderColor)}:host([value-state=Error]) .ui5-radio-svg-outer,:host([value-state=Warning]) .ui5-radio-svg-outer{stroke-width:2}:host([value-state=Error][checked]) .ui5-radio-svg-inner{fill:var(--_ui5_radio_button_checked_error_fill)}:host([value-state=Error]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable:hover .ui5-radio-svg-outer,:host([value-state=Error]) .ui5-radio-svg-outer{stroke:var(--sapField_InvalidColor);fill:var(--sapField_InvalidBackground)}:host([value-state=Warning][checked]) .ui5-radio-svg-inner{fill:var(--_ui5_radio_button_checked_warning_fill)}:host([value-state=Warning]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable:hover .ui5-radio-svg-outer,:host([value-state=Warning]) .ui5-radio-svg-outer{stroke:var(--sapField_WarningColor);fill:var(--sapField_WarningBackground)}:host([value-state=Error]) .ui5-radio-root,:host([value-state=Information]) .ui5-radio-root,:host([value-state=Warning]) .ui5-radio-root{stroke-dasharray:var(--_ui5_radio_button_warning_error_border_dash)}.ui5-radio-root{height:var(--_ui5_radio_button_height);position:relative;display:inline-flex;flex-wrap:nowrap;outline:none;max-width:100%;width:var(--_ui5_radio_button_inner_width);box-sizing:border-box;border:var(--_ui5_radio_button_border);border-radius:var(--_ui5_radio_button_border_radius);transition:var(--_ui5_radio_button_transition);cursor:pointer}.ui5-radio-inner{display:flex;align-items:center;padding:var(--_ui5_radio_button_outer_ring_padding);flex-shrink:0;height:var(--_ui5_radio_button_inner_size);font-size:1rem;pointer-events:none;vertical-align:top}.ui5-radio-inner:focus{outline:none}.ui5-radio-inner input{-webkit-appearance:none;visibility:hidden;width:0;left:0;position:absolute;font-size:inherit;margin:0}[ui5-label].ui5-radio-label{display:flex;align-items:center;padding-right:var(--_ui5_radio_button_label_offset);vertical-align:top;cursor:default;max-width:100%;text-overflow:ellipsis;overflow:hidden;pointer-events:none;color:var(--_ui5_radio_button_label_color)}:host([wrapping-type=Normal][text]) .ui5-radio-root{height:auto}:host([wrapping-type=Normal][text]) [ui5-label].ui5-radio-label{padding:var(--_ui5_radio_button_label_side_padding) 0;word-break:break-all}.ui5-radio-svg{height:var(--_ui5_radio_button_svg_size);width:var(--_ui5_radio_button_svg_size);overflow:visible;pointer-events:none}.ui5-radio-svg-outer{fill:var(--_ui5_radio_button_outer_ring_bg);stroke:currentColor;stroke-width:var(--_ui5_radio_button_outer_ring_width)}.ui5-radio-svg-inner{fill:none}.ui5-radio-svg-inner,.ui5-radio-svg-outer{flex-shrink:0}:host([text]) [dir=rtl].ui5-radio-root:focus:before{left:0;right:var(--_ui5_radio_button_rtl_focus_right)}[dir=rtl] .ui5-radio-inner{padding:var(--_ui5_radio_button_outer_ring_padding_rtl)}[dir=rtl] [ui5-label].ui5-radio-label{padding-left:var(--_ui5_radio_button_label_offset);padding-right:0}:host(.ui5-li-singlesel-radiobtn) .ui5-radio-root .ui5-radio-inner .ui5-radio-svg-outer{fill:var(--sapList_Background)}',
        };
        exports.default = e;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    LdU0: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/Device.js"),
          t = require("@ui5/webcomponents-base/dist/FeaturesRegistry.js"),
          i = p(require("@ui5/webcomponents-base/dist/UI5Element.js")),
          s = p(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js")),
          a = require("@ui5/webcomponents-base/dist/i18nBundle.js"),
          n = p(require("@ui5/webcomponents-base/dist/types/ValueState.js")),
          r = require("@ui5/webcomponents-base/dist/Keys.js"),
          u = p(require("./Label.js")),
          o = p(require("./RadioButtonGroup.js")),
          d = p(require("./types/WrappingType.js")),
          l = p(require("./generated/templates/RadioButtonTemplate.lit.js")),
          h = require("./generated/i18n/i18n-defaults.js"),
          c = p(require("./generated/themes/RadioButton.css.js"));
        function p(e) {
          return e && e.__esModule ? e : { default: e };
        }
        let g = !1,
          m = null;
        const b = {
          tag: "ui5-radio-button",
          altTag: "ui5-radiobutton",
          languageAware: !0,
          properties: {
            disabled: { type: Boolean },
            readonly: { type: Boolean },
            checked: { type: Boolean },
            text: { type: String },
            valueState: { defaultValue: n.default.None, type: n.default },
            name: { type: String },
            value: { type: String },
            wrappingType: { type: d.default, defaultValue: d.default.None },
            accessibleName: { type: String },
            _tabIndex: { type: String, defaultValue: "-1", noAttribute: !0 },
            active: { type: Boolean },
          },
          slots: { formSupport: { type: HTMLElement } },
          events: { change: {} },
        };
        class f extends i.default {
          constructor() {
            super(),
              (this._deactivate = () => {
                m && (m.active = !1);
              }),
              g || (document.addEventListener("mouseup", this._deactivate), (g = !0));
          }
          static get metadata() {
            return b;
          }
          static get render() {
            return s.default;
          }
          static get template() {
            return l.default;
          }
          static get styles() {
            return c.default;
          }
          static get dependencies() {
            return [u.default];
          }
          static async onDefine() {
            f.i18nBundle = await (0, a.getI18nBundle)("@ui5/webcomponents");
          }
          onBeforeRendering() {
            this.syncGroup(), this._enableFormSupport();
          }
          syncGroup() {
            const e = this._name,
              t = this.name,
              i = this._checked,
              s = this.checked;
            t !== e
              ? (e && o.default.removeFromGroup(this, e), t && o.default.addToGroup(this, t))
              : t && o.default.enforceSingleSelection(this, t),
              this.name && s !== i && o.default.updateTabOrder(this.name),
              (this._name = this.name),
              (this._checked = this.checked);
          }
          _enableFormSupport() {
            const e = (0, t.getFeature)("FormSupport");
            e
              ? e.syncNativeHiddenInput(this, (e, t) => {
                  (t.disabled = e.disabled || !e.checked), (t.value = e.checked ? e.value : "");
                })
              : this.value &&
                console.warn(
                  'In order for the "value" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";'
                );
          }
          _onclick() {
            return this.toggle();
          }
          _handleDown(e) {
            const t = this.name;
            t && (e.preventDefault(), o.default.selectNextItem(this, t));
          }
          _handleUp(e) {
            const t = this.name;
            t && (e.preventDefault(), o.default.selectPreviousItem(this, t));
          }
          _onkeydown(e) {
            return (0, r.isSpace)(e)
              ? ((this.active = !0), e.preventDefault())
              : (0, r.isEnter)(e)
              ? ((this.active = !0), this.toggle())
              : (((0, r.isDown)(e) || (0, r.isRight)(e)) && this._handleDown(e),
                void (((0, r.isUp)(e) || (0, r.isLeft)(e)) && this._handleUp(e)));
          }
          _onkeyup(e) {
            (0, r.isSpace)(e) && this.toggle(), (this.active = !1);
          }
          _onmousedown() {
            (this.active = !0), (m = this);
          }
          _onmouseup() {
            this.active = !1;
          }
          _onfocusout() {
            this.active = !1;
          }
          toggle() {
            return this.canToggle()
              ? this.name
                ? (o.default.selectItem(this, this.name), this)
                : ((this.checked = !this.checked), this.fireEvent("change"), this)
              : this;
          }
          canToggle() {
            return !(this.disabled || this.readonly || this.checked);
          }
          valueStateTextMappings() {
            return {
              Error: f.i18nBundle.getText(h.VALUE_STATE_ERROR),
              Warning: f.i18nBundle.getText(h.VALUE_STATE_WARNING),
            };
          }
          get classes() {
            return {
              main: {},
              inner: { "ui5-radio-inner--hoverable": !this.disabled && !this.readonly && (0, e.isDesktop)() },
            };
          }
          get ariaReadonly() {
            return this.readonly ? "true" : void 0;
          }
          get ariaDisabled() {
            return this.disabled ? "true" : void 0;
          }
          get ariaLabelText() {
            return [this.text, this.accessibleName].filter(Boolean).join(" ");
          }
          get ariaDescribedBy() {
            return this.hasValueState ? `${this._id}-descr` : void 0;
          }
          get hasValueState() {
            return this.valueState !== n.default.None;
          }
          get valueStateText() {
            return this.valueStateTextMappings()[this.valueState];
          }
          get tabIndex() {
            const e = this.getAttribute("tabindex");
            return this.disabled ? "-1" : this.name ? this._tabIndex : e || "0";
          }
          get strokeWidth() {
            return "None" === this.valueState ? "1" : "2";
          }
        }
        f.define();
        var v = f;
        exports.default = v;
      },
      {
        "@ui5/webcomponents-base/dist/Device.js": "Oq9i",
        "@ui5/webcomponents-base/dist/FeaturesRegistry.js": "rnHX",
        "@ui5/webcomponents-base/dist/UI5Element.js": "Kogr",
        "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG",
        "@ui5/webcomponents-base/dist/i18nBundle.js": "F4Ye",
        "@ui5/webcomponents-base/dist/types/ValueState.js": "rs1i",
        "@ui5/webcomponents-base/dist/Keys.js": "glQL",
        "./Label.js": "CXe7",
        "./RadioButtonGroup.js": "eZ0Q",
        "./types/WrappingType.js": "kicx",
        "./generated/templates/RadioButtonTemplate.lit.js": "K1fZ",
        "./generated/i18n/i18n-defaults.js": "XB3p",
        "./generated/themes/RadioButton.css.js": "cOGb",
      },
    ],
    qvJs: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = { Default: "Default", Subtle: "Subtle", Emphasized: "Emphasized" };
        class a extends e.default {
          static isValid(e) {
            return !!s[e];
          }
        }
        a.generateTypeAccessors(s);
        var u = a;
        exports.default = u;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    Btm0: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const i = (i, n, o) =>
            e.html`<a class="ui5-link-root" role="${(0, e.ifDefined)(i.effectiveAccRole)}" href="${(0, e.ifDefined)(
              i.parsedRef
            )}" target="${(0, e.ifDefined)(i.target)}" rel="${(0, e.ifDefined)(i._rel)}" tabindex="${(0, e.ifDefined)(
              i.tabIndex
            )}" ?disabled="${i.disabled}" aria-label="${(0, e.ifDefined)(i.ariaLabelText)}" aria-haspopup="${(0,
            e.ifDefined)(i.ariaHaspopup)}" @focusin=${i._onfocusin} @focusout=${i._onfocusout} @click=${
              i._onclick
            } @keydown=${i._onkeydown} @keyup=${i._onkeyup}><slot></slot>${i.hasLinkType ? a(i, n, o) : void 0}</a>`,
          a = (i, a, n) => e.html`<span class="ui5-hidden-text">${(0, e.ifDefined)(i.linkTypeText)}</span>`;
        var n = i;
        exports.default = n;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    JhLO: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          o = t(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          i = t(require("./sap_fiori_3/parameters-bundle.css.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => o.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => i.default);
        var r = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/Link.css",
          content:
            '.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-flex}:host{max-width:100%;color:var(--sapLinkColor);font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSize);cursor:pointer;outline:none;text-decoration:var(--_ui5_link_text_decoration)}:host(:hover){text-decoration:var(--_ui5_link_hover_text_decoration)}:host([disabled]){pointer-events:none}:host([disabled]) .ui5-link-root{text-shadow:none;outline:none;cursor:default;pointer-events:none;opacity:var(--_ui5_link_opacity)}:host([design=Emphasized]) .ui5-link-root{font-weight:700}:host([design=Subtle]) .ui5-link-root,:host([design=Subtle]) .ui5-link-root:visited{color:var(--sapLink_SubtleColor)}:host([design=Subtle]) .ui5-link-root:focus{color:var(--sapLinkColor)}:host([wrapping-type=Normal]) .ui5-link-root{white-space:normal;word-wrap:break-word}.ui5-link-root{width:100%;display:inline-block;position:relative;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;word-wrap:normal;outline:none;text-decoration:inherit}.ui5-link-root,.ui5-link-root:active,.ui5-link-root:visited{color:currentColor}:host .ui5-link-root{border:var(--_ui5_link_border);border-radius:var(--_ui5_link_focus_border-radius)}:host([focused]) .ui5-link-root{border:var(--_ui5_link_border_focus);text-decoration:underline}',
        };
        exports.default = r;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    yLPi: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = d(require("@ui5/webcomponents-base/dist/UI5Element.js")),
          t = d(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js")),
          i = require("@ui5/webcomponents-base/dist/Keys.js"),
          r = require("@ui5/webcomponents-base/dist/util/AriaLabelHelper.js"),
          n = require("@ui5/webcomponents-base/dist/i18nBundle.js"),
          s = d(require("./types/LinkDesign.js")),
          a = d(require("./types/WrappingType.js")),
          u = d(require("./generated/templates/LinkTemplate.lit.js")),
          l = require("./generated/i18n/i18n-defaults.js"),
          o = d(require("./generated/themes/Link.css.js"));
        function d(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const p = {
          tag: "ui5-link",
          languageAware: !0,
          properties: {
            disabled: { type: Boolean },
            href: { type: String },
            target: { type: String },
            design: { type: s.default, defaultValue: s.default.Default },
            wrappingType: { type: a.default, defaultValue: a.default.None },
            accessibleNameRef: { type: String, defaultValue: "" },
            ariaHaspopup: { type: String, defaultValue: void 0 },
            accessibleRole: { type: String },
            _rel: { type: String, noAttribute: !0 },
            _tabIndex: { type: String, noAttribute: !0 },
            focused: { type: Boolean },
          },
          slots: { default: { type: Node } },
          events: { click: {} },
        };
        class c extends e.default {
          constructor() {
            super(), (this._dummyAnchor = document.createElement("a"));
          }
          static get metadata() {
            return p;
          }
          static get render() {
            return t.default;
          }
          static get template() {
            return u.default;
          }
          static get styles() {
            return o.default;
          }
          onBeforeRendering() {
            const e = "_blank" === this.target && this.href && this._isCrossOrigin();
            this._rel = e ? "noreferrer" : void 0;
          }
          _isCrossOrigin() {
            const e = window.location;
            return (
              (this._dummyAnchor.href = this.href),
              !(
                this._dummyAnchor.hostname === e.hostname &&
                this._dummyAnchor.port === e.port &&
                this._dummyAnchor.protocol === e.protocol
              )
            );
          }
          get tabIndex() {
            return this._tabIndex ? this._tabIndex : this.disabled || !this.textContent.length ? "-1" : "0";
          }
          get ariaLabelText() {
            return (0, r.getAriaLabelledByTexts)(this);
          }
          get hasLinkType() {
            return this.design !== s.default.Default;
          }
          static typeTextMappings() {
            return { Subtle: l.LINK_SUBTLE, Emphasized: l.LINK_EMPHASIZED };
          }
          get linkTypeText() {
            return c.i18nBundle.getText(c.typeTextMappings()[this.design]);
          }
          get parsedRef() {
            return this.href && this.href.length > 0 ? this.href : void 0;
          }
          get effectiveAccRole() {
            return this.accessibleRole || "link";
          }
          static async onDefine() {
            c.i18nBundle = await (0, n.getI18nBundle)("@ui5/webcomponents");
          }
          _onclick(e) {
            e.isMarked = "link";
          }
          _onfocusin(e) {
            (e.isMarked = "link"), (this.focused = !0);
          }
          _onfocusout(e) {
            this.focused = !1;
          }
          _onkeydown(e) {
            if ((0, i.isEnter)(e)) {
              this.fireEvent("click", null, !0) &&
                (e.preventDefault(), this.href && window.open(this.href, this.target));
            } else (0, i.isSpace)(e) && e.preventDefault();
            e.isMarked = "link";
          }
          _onkeyup(e) {
            if (!(0, i.isSpace)(e)) return void (e.isMarked = "link");
            e.preventDefault(), this.fireEvent("click", null, !0) && this.href && window.open(this.href, this.target);
          }
        }
        c.define();
        var h = c;
        exports.default = h;
      },
      {
        "@ui5/webcomponents-base/dist/UI5Element.js": "Kogr",
        "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG",
        "@ui5/webcomponents-base/dist/Keys.js": "glQL",
        "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js": "OuVZ",
        "@ui5/webcomponents-base/dist/i18nBundle.js": "F4Ye",
        "./types/LinkDesign.js": "qvJs",
        "./types/WrappingType.js": "kicx",
        "./generated/templates/LinkTemplate.lit.js": "Btm0",
        "./generated/i18n/i18n-defaults.js": "XB3p",
        "./generated/themes/Link.css.js": "JhLO",
      },
    ],
    NnHU: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const s = "information",
          t =
            "M256 0c141 0 256 115 256 256S397 512 256 512 0 397 0 256 115 0 256 0zm38 140c0-21-17-39-38-39s-38 18-38 39 17 38 38 38 38-17 38-38zm-6 238V250c0-18-14-32-32-32s-32 14-32 32v128c0 17 14 32 32 32s32-15 32-32z",
          o = !1,
          a = "SAP-icons-v5",
          c = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(s, { pathData: t, ltr: !1, collection: a, packageName: c });
        var r = { pathData: t };
        exports.default = r;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    ck9H: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var t = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const e = "information",
          s =
            "M0 256q0-53 20.5-100t55-81.5T157 20t99-20q54 0 100.5 20t81 55 54.5 81.5 20 99.5q0 54-20 100.5t-54.5 81T356 492t-100 20q-54 0-100.5-20t-81-55T20 355.5 0 256zm192 112v33h128v-33h-32V215q0-6-7-6h-88v31h32v128h-33zm34-201q14 11 30 11 17 0 29.5-11.5T298 138q0-19-13-31-12-12-29-12-19 0-30.5 12.5T214 138q0 17 12 29z",
          o = !1,
          a = "SAP-icons",
          r = "@ui5/webcomponents-icons";
        (0, t.registerIcon)(e, { pathData: s, ltr: !1, collection: a, packageName: r });
        var i = { pathData: s };
        exports.default = i;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    AlFx: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/config/Theme.js"),
          t = o(require("./v5/information.js")),
          r = o(require("./v4/information.js"));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const i = (0, e.isTheme)("sap_horizon") ? r.default : t.default;
        var s = { pathData: i };
        exports.default = s;
      },
      {
        "@ui5/webcomponents-base/dist/config/Theme.js": "b5d6",
        "./v5/information.js": "NnHU",
        "./v4/information.js": "ck9H",
      },
    ],
    l9KT: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const s = "sys-enter-2",
          t =
            "M256 0c141 0 256 115 256 256S397 512 256 512 0 397 0 256 115 0 256 0zM128 256c-18 0-32 14-32 32 0 8 3 16 9 23l64 64c7 6 15 9 23 9s16-3 23-9l192-192c6-7 9-15 9-23 0-17-15-32-32-32-8 0-16 3-23 9L192 307l-41-42c-7-6-15-9-23-9z",
          c = !0,
          o = "SAP-icons-v5",
          a = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(s, { pathData: t, ltr: !0, collection: o, packageName: a });
        var r = { pathData: t };
        exports.default = r;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    pAbY: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var t = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const e = "sys-enter-2",
          s =
            "M512 256q0 54-20 100.5t-54.5 81T356 492t-100 20q-54 0-100.5-20t-81-55T20 355.5 0 256t20.5-100 55-81.5T157 20t99-20q53 0 100 20t81.5 54.5T492 156t20 100zm-118-87q4-8-1-13l-36-36q-3-4-8-4t-8 5L237 294q-3 1-4 0l-70-52q-4-3-7-3t-4.5 2-2.5 3l-29 41q-6 8 2 14l113 95q2 2 7 2t8-4z",
          o = !0,
          a = "SAP-icons",
          r = "@ui5/webcomponents-icons";
        (0, t.registerIcon)(e, { pathData: s, ltr: !0, collection: a, packageName: r });
        var i = { pathData: s };
        exports.default = i;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    JlC3: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/config/Theme.js"),
          t = r(require("./v5/sys-enter-2.js")),
          s = r(require("./v4/sys-enter-2.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const u = (0, e.isTheme)("sap_horizon") ? s.default : t.default;
        var o = { pathData: u };
        exports.default = o;
      },
      {
        "@ui5/webcomponents-base/dist/config/Theme.js": "b5d6",
        "./v5/sys-enter-2.js": "l9KT",
        "./v4/sys-enter-2.js": "pAbY",
      },
    ],
    GISf: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js"),
          t = require("../generated/i18n/i18n-defaults.js");
        const a = "error",
          s =
            "M301 256l74-73c12-13 12-33 0-46-13-12-33-12-46 0l-73 74-73-74c-13-12-33-12-46 0-12 13-12 33 0 46l74 73-74 73c-12 13-12 33 0 46 13 12 33 12 46 0l73-74 73 74c13 12 33 12 46 0 12-13 12-33 0-46zm-45 256C115 512 0 397 0 256S115 0 256 0s256 115 256 256-115 256-256 256z",
          r = !1,
          c = t.ICON_ERROR,
          o = "SAP-icons-v5",
          i = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(a, { pathData: s, ltr: !1, accData: c, collection: o, packageName: i });
        var n = { pathData: s, accData: c };
        exports.default = n;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB",
        "../generated/i18n/i18n-defaults.js": "U0YU",
      },
    ],
    VjeM: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js"),
          t = require("../generated/i18n/i18n-defaults.js");
        const a = "error",
          s =
            "M512 256q0 53-20.5 100t-55 81.5-81 54.5-99.5 20-100-20.5-81.5-55T20 355 0 256q0-54 20-100.5t55-81T156.5 20 256 0t99.5 20T437 75t55 81.5 20 99.5zM399 364q6-6 0-12l-86-86q-6-6 0-12l81-81q6-6 0-12l-37-37q-2-2-6-2t-6 2l-83 82q-1 3-6 3-3 0-6-3l-84-83q-1-2-6-2-4 0-6 2l-37 37q-6 6 0 12l83 82q6 6 0 12l-83 82q-2 2-2.5 6t2.5 6l36 37q4 2 6 2 4 0 6-2l85-84q2-2 6-2t6 2l88 88q4 2 6 2t6-2z",
          r = !1,
          l = t.ICON_ERROR,
          o = "SAP-icons",
          c = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(a, { pathData: s, ltr: !1, accData: l, collection: o, packageName: c });
        var i = { pathData: s, accData: l };
        exports.default = i;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB",
        "../generated/i18n/i18n-defaults.js": "U0YU",
      },
    ],
    aGZq: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/config/Theme.js"),
          r = o(require("./v5/error.js")),
          t = o(require("./v4/error.js"));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = (0, e.isTheme)("sap_horizon") ? t.default : r.default;
        var u = { pathData: s };
        exports.default = u;
      },
      { "@ui5/webcomponents-base/dist/config/Theme.js": "b5d6", "./v5/error.js": "GISf", "./v4/error.js": "VjeM" },
    ],
    HWwz: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const s = "alert",
          t =
            "M8 387L200 34c12-23 34-34 56-34s44 11 56 34l192 353c6 10 8 20 8 30 0 33-27 64-64 64H64c-37 0-64-31-64-64 0-10 2-20 8-30zm280-106V153c0-17-14-32-32-32s-32 15-32 32v128c0 18 14 33 32 33s32-15 32-33zm6 110c0-21-17-38-38-38s-38 17-38 38c0 22 17 39 38 39s38-17 38-39z",
          c = !1,
          a = "SAP-icons-v5",
          o = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(s, { pathData: t, ltr: !1, collection: a, packageName: o });
        var r = { pathData: t };
        exports.default = r;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    yC9J: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var t = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const e = "alert",
          s =
            "M501 374q5 10 7.5 19.5T512 412v5q0 31-23 47.5T439 481H74q-13 0-26-4.5T24.5 464t-17-20T1 417q-1-13 3-22.5t9-20.5L198 38q24-38 61-38t59 38zM257 127q-13 0-23.5 8T223 161q1 7 3 23 2 14 3.5 37t3.5 61q0 11 7.5 16t15.5 5q22 0 24-21l2-36 9-85q0-18-10.5-26t-23.5-8zm0 299q20 0 31.5-12t11.5-32q0-19-11.5-31T257 339t-31.5 12-11.5 31q0 20 11.5 32t31.5 12z",
          a = !1,
          o = "SAP-icons",
          r = "@ui5/webcomponents-icons";
        (0, t.registerIcon)(e, { pathData: s, ltr: !1, collection: o, packageName: r });
        var q = { pathData: s };
        exports.default = q;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    VPwr: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/config/Theme.js"),
          t = s(require("./v5/alert.js")),
          r = s(require("./v4/alert.js"));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const a = (0, e.isTheme)("sap_horizon") ? r.default : t.default;
        var u = { pathData: a };
        exports.default = u;
      },
      { "@ui5/webcomponents-base/dist/config/Theme.js": "b5d6", "./v5/alert.js": "HWwz", "./v4/alert.js": "yC9J" },
    ],
    oDtf: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = { Information: "Information", Positive: "Positive", Negative: "Negative", Warning: "Warning" };
        class a extends e.default {
          static isValid(e) {
            return !!s[e];
          }
        }
        a.generateTypeAccessors(s);
        var i = a;
        exports.default = i;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    rRE0: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const i = (i, t, a) =>
            e.html`<div class="${(0, e.classMap)(i.classes.root)}" id="${(0, e.ifDefined)(
              i._id
            )}" role="note" dir="${(0, e.ifDefined)(i.effectiveDir)}" aria-live="assertive" aria-labelledby="${(0,
            e.ifDefined)(i._id)}">${i.hideIcon ? void 0 : s(i, t, a)}<span class="ui5-hidden-text">${(0, e.ifDefined)(
              i.hiddenText
            )}</span><span class="ui5-message-strip-text"><slot></slot></span>${
              i.hideCloseButton ? void 0 : o(i, t, a)
            }</div>`,
          s = (i, s, o) =>
            e.html`<div class="ui5-message-strip-icon-wrapper" aria-hidden="true">${
              i.iconProvided ? t(i, s, o) : a(i, s, o)
            }</div>`,
          t = (i, s, t) => e.html`<slot name="icon"></slot>`,
          a = (i, s, t) =>
            e.html`<${(0, e.scopeTag)("ui5-icon", s, t)} name="${(0, e.ifDefined)(
              i.standardIconName
            )}" class="ui5-message-strip-icon"></${(0, e.scopeTag)("ui5-icon", s, t)}>`,
          o = (i, s, t) =>
            e.html`<${(0, e.scopeTag)(
              "ui5-button",
              s,
              t
            )} icon="decline" design="Transparent" class="ui5-message-strip-close-button" title="${(0, e.ifDefined)(
              i._closeButtonText
            )}" @click=${i._closeClick}></${(0, e.scopeTag)("ui5-button", s, t)}>`;
        var n = i;
        exports.default = n;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    vLFK: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          r = s(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          i = s(require("./sap_fiori_3/parameters-bundle.css.js"));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => r.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => i.default);
        var o = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/MessageStrip.css",
          content:
            '.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block;width:100%}.ui5-message-strip-root{width:100%;height:100%;display:flex;border-radius:var(--_ui5_message_strip_border_radius);padding:var(--_ui5_message_strip_padding);border-width:var(--_ui5_message_strip_border_width);border-style:solid;box-sizing:border-box;position:relative}.ui5-message-strip-root-hide-icon{padding:var(--_ui5_message_strip_padding_no_icon)}.ui5-message-strip-root-hide-close-button{padding-right:1rem}.ui5-message-strip-root--info{background-color:var(--sapInformationBackground);border-color:var(--_ui5_message_strip_information_border_color);color:var(--sapTextColor)}.ui5-message-strip-root--info .ui5-message-strip-icon{color:var(--sapInformativeElementColor)}.ui5-message-strip-root--positive{background-color:var(--sapSuccessBackground);border-color:var(--_ui5_message_strip_success_border_color)}.ui5-message-strip-root--positive .ui5-message-strip-icon{color:var(--sapPositiveElementColor)}.ui5-message-strip-root--negative{background-color:var(--sapErrorBackground);border-color:var(--_ui5_message_strip_error_border_color)}.ui5-message-strip-root--negative .ui5-message-strip-icon{color:var(--sapNegativeElementColor)}.ui5-message-strip-root--warning{background-color:var(--sapWarningBackground);border-color:var(--_ui5_message_strip_warning_border_color)}.ui5-message-strip-root--warning .ui5-message-strip-icon{color:var(--sapCriticalElementColor)}.ui5-message-strip-icon-wrapper{position:absolute;top:var(--_ui5_message_strip_icon_top);left:.75rem;box-sizing:border-box}.ui5-message-strip-text{width:100%;color:var(--sapTextColor);line-height:1.2;font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSize)}.ui5-message-strip-close-button{width:var(--_ui5_message_strip_close_button_size);min-width:var(--_ui5_message_strip_close_button_size);height:var(--_ui5_message_strip_close_button_size);min-height:var(--_ui5_message_strip_close_button_size);position:absolute;right:.125rem;top:.125rem}.ui5-message-strip-close-button::part(icon){width:.75rem;height:.75rem}.ui5-message-strip-root[dir=rtl]{padding-right:2.5rem;padding-left:2rem}[dir=rtl] .ui5-message-strip-root-hide-icon{padding-right:1rem;padding-left:2rem}[dir=rtl] .ui5-message-strip-root-hide-close-button{padding-left:1rem;padding-right:0}[dir=rtl] .ui5-message-strip-icon-wrapper{right:.75rem;left:0}[dir=rtl] .ui5-message-strip-close-button{left:.125rem;right:auto}',
        };
        exports.default = o;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    bd39: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = d(require("@ui5/webcomponents-base/dist/UI5Element.js")),
          t = d(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js")),
          s = require("@ui5/webcomponents-base/dist/i18nBundle.js");
        require("@ui5/webcomponents-icons/dist/decline.js"),
          require("@ui5/webcomponents-icons/dist/information.js"),
          require("@ui5/webcomponents-icons/dist/sys-enter-2.js"),
          require("@ui5/webcomponents-icons/dist/error.js"),
          require("@ui5/webcomponents-icons/dist/alert.js");
        var i = d(require("./types/MessageStripDesign.js")),
          n = d(require("./generated/templates/MessageStripTemplate.lit.js")),
          r = d(require("./Icon.js")),
          o = d(require("./Button.js")),
          a = require("./generated/i18n/i18n-defaults.js"),
          u = d(require("./generated/themes/MessageStrip.css.js"));
        function d(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const l = {
          tag: "ui5-message-strip",
          altTag: "ui5-messagestrip",
          languageAware: !0,
          properties: {
            design: { type: i.default, defaultValue: i.default.Information },
            hideIcon: { type: Boolean },
            hideCloseButton: { type: Boolean },
          },
          managedSlots: !0,
          slots: { default: { type: Node }, icon: { type: HTMLElement } },
          events: { close: {} },
        };
        class g extends e.default {
          static get metadata() {
            return l;
          }
          static get render() {
            return t.default;
          }
          static get template() {
            return n.default;
          }
          static get styles() {
            return u.default;
          }
          constructor() {
            super();
          }
          _closeClick() {
            this.fireEvent("close", {});
          }
          static get dependencies() {
            return [r.default, o.default];
          }
          static async onDefine() {
            g.i18nBundle = await (0, s.getI18nBundle)("@ui5/webcomponents");
          }
          static designClassesMappings() {
            return {
              Information: "ui5-message-strip-root--info",
              Positive: "ui5-message-strip-root--positive",
              Negative: "ui5-message-strip-root--negative",
              Warning: "ui5-message-strip-root--warning",
            };
          }
          static iconMappings() {
            return { Information: "information", Positive: "sys-enter-2", Negative: "error", Warning: "alert" };
          }
          get hiddenText() {
            return `Message Strip ${this.design} ${this.hideCloseButton ? "" : "closable"}`;
          }
          get _closeButtonText() {
            return g.i18nBundle.getText(a.MESSAGE_STRIP_CLOSE_BUTTON);
          }
          get classes() {
            return {
              root: {
                "ui5-message-strip-root": !0,
                "ui5-message-strip-root-hide-icon": this.hideIcon,
                "ui5-message-strip-root-hide-close-button": this.hideCloseButton,
                [this.designClasses]: !0,
              },
            };
          }
          get iconProvided() {
            return this.icon.length > 0;
          }
          get standardIconName() {
            return g.iconMappings()[this.design];
          }
          get designClasses() {
            return g.designClassesMappings()[this.design];
          }
        }
        g.define();
        var c = g;
        exports.default = c;
      },
      {
        "@ui5/webcomponents-base/dist/UI5Element.js": "Kogr",
        "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG",
        "@ui5/webcomponents-base/dist/i18nBundle.js": "F4Ye",
        "@ui5/webcomponents-icons/dist/decline.js": "vj7t",
        "@ui5/webcomponents-icons/dist/information.js": "AlFx",
        "@ui5/webcomponents-icons/dist/sys-enter-2.js": "JlC3",
        "@ui5/webcomponents-icons/dist/error.js": "aGZq",
        "@ui5/webcomponents-icons/dist/alert.js": "VPwr",
        "./types/MessageStripDesign.js": "oDtf",
        "./generated/templates/MessageStripTemplate.lit.js": "rRE0",
        "./Icon.js": "RJcw",
        "./Button.js": "PQe6",
        "./generated/i18n/i18n-defaults.js": "XB3p",
        "./generated/themes/MessageStrip.css.js": "vLFK",
      },
    ],
    ME9B: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("./DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = { Polite: "Polite", Assertive: "Assertive" };
        class r extends e.default {
          static isValid(e) {
            return !!s[e];
          }
        }
        r.generateTypeAccessors(s);
        var a = s;
        exports.default = a;
      },
      { "./DataType.js": "bqvp" },
    ],
    lijI: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = a(require("../types/InvisibleMessageMode.js")),
          t = a(require("./getSingletonElementInstance.js")),
          s = require("../Boot.js");
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        let i, l;
        (0, s.attachBoot)(() => {
          if (i && l) return;
          const e =
            "position: absolute;\n\tclip: rect(1px,1px,1px,1px);\n\tuser-select: none;\n\tleft: -1000px;\n\ttop: -1000px;\n\tpointer-events: none;";
          (i = document.createElement("span")),
            (l = document.createElement("span")),
            i.classList.add("ui5-invisiblemessage-polite"),
            l.classList.add("ui5-invisiblemessage-assertive"),
            i.setAttribute("aria-live", "polite"),
            l.setAttribute("aria-live", "assertive"),
            i.setAttribute("role", "alert"),
            l.setAttribute("role", "alert"),
            (i.style.cssText = e),
            (l.style.cssText = e),
            (0, t.default)("ui5-static-area").appendChild(i),
            (0, t.default)("ui5-static-area").appendChild(l);
        });
        const n = (t, s) => {
          const a = s === e.default.Assertive ? l : i;
          (a.textContent = ""),
            (a.textContent = t),
            s !== e.default.Assertive &&
              s !== e.default.Polite &&
              console.warn(
                'You have entered an invalid mode. Valid values are: "Polite" and "Assertive". The framework will automatically set the mode to "Polite".'
              );
        };
        var r = n;
        exports.default = r;
      },
      { "../types/InvisibleMessageMode.js": "ME9B", "./getSingletonElementInstance.js": "zr7a", "../Boot.js": "oXKF" },
    ],
    XHrf: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const s = "slim-arrow-down",
          t =
            "M258.5 275l102-103c6-6 14-9 22-9s15 3 22 9c6 7 9 14 9 22s-3 16-9 22l-124 124c-6 6-14 9-22 9s-15-3-22-9l-124-124c-6-6-9-14-9-22s3-15 9-22c7-6 14-9 22-9s16 3 22 9z",
          o = !1,
          a = "SAP-icons-v5",
          c = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(s, { pathData: t, ltr: !1, collection: a, packageName: c });
        var r = { pathData: t };
        exports.default = r;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    zPWo: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const t = "slim-arrow-down",
          s =
            "M420.5 187q11-12 23 0 5 5 5 11t-5 11l-165 165q-10 9-23 9t-22-9l-166-165q-5-5-5-11.5t5-11.5 11.5-5 11.5 5l160 160q5 6 11 0z",
          o = !1,
          a = "SAP-icons",
          r = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(t, { pathData: s, ltr: !1, collection: a, packageName: r });
        var i = { pathData: s };
        exports.default = i;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    iPtt: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/config/Theme.js"),
          r = o(require("./v5/slim-arrow-down.js")),
          t = o(require("./v4/slim-arrow-down.js"));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = (0, e.isTheme)("sap_horizon") ? t.default : r.default;
        var a = { pathData: s };
        exports.default = a;
      },
      {
        "@ui5/webcomponents-base/dist/config/Theme.js": "b5d6",
        "./v5/slim-arrow-down.js": "XHrf",
        "./v4/slim-arrow-down.js": "zPWo",
      },
    ],
    QT6c: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("@ui5/webcomponents-base/dist/UI5Element.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const o = {
          tag: "ui5-option",
          managedSlots: !0,
          properties: {
            selected: { type: Boolean },
            disabled: { type: Boolean },
            icon: { type: String, defaultValue: null },
            value: { type: String },
            _focused: { type: Boolean },
          },
          slots: { default: { type: Node } },
          events: {},
        };
        class s extends e.default {
          static get metadata() {
            return o;
          }
          get stableDomRef() {
            return `${this._id}-stable-dom-ref`;
          }
        }
        s.define();
        var a = s;
        exports.default = a;
      },
      { "@ui5/webcomponents-base/dist/UI5Element.js": "Kogr" },
    ],
    SXvz: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const o = (o, s, t) => e.html`${o._isPhone ? a(o, s, t) : d(o, s, t)}`,
          a = (o, a, t) =>
            e.html`<${(0, e.scopeTag)("ui5-dialog", a, t)} ?with-padding=${
              o.withPadding
            } stretch _disable-initial-focus @ui5-before-open="${(0, e.ifDefined)(
              o._propagateDialogEvent
            )}" @ui5-after-open="${(0, e.ifDefined)(o._afterDialogOpen)}" @ui5-before-close="${(0, e.ifDefined)(
              o._propagateDialogEvent
            )}" @ui5-after-close="${(0, e.ifDefined)(o._afterDialogClose)}">${
              o._hideHeader ? void 0 : s(o, a, t)
            }<slot></slot><slot slot="footer" name="footer"></slot></${(0, e.scopeTag)("ui5-dialog", a, t)}>`,
          s = (o, a, s) => e.html`${o.header.length ? t(o, a, s) : i(o, a, s)}`,
          t = (o, a, s) => e.html`<slot slot="header" name="header"></slot>`,
          i = (o, a, s) =>
            e.html`<header class="${(0, e.classMap)(o.classes.header)}">${o.headerText ? l(o, a, s) : void 0}${
              o._hideCloseButton ? void 0 : r(o, a, s)
            }</header>`,
          l = (o, a, s) =>
            e.html`<${(0, e.scopeTag)(
              "ui5-title",
              a,
              s
            )} level="H2" class="ui5-popup-header-text ui5-responsive-popover-header-text">${(0, e.ifDefined)(
              o.headerText
            )}</${(0, e.scopeTag)("ui5-title", a, s)}>`,
          r = (o, a, s) =>
            e.html`<${(0, e.scopeTag)("ui5-button", a, s)} icon="decline" design="Transparent" aria-label="${(0,
            e.ifDefined)(o._closeDialogAriaLabel)}" @click="${o.close}"></${(0, e.scopeTag)("ui5-button", a, s)}>`,
          d = (o, a, s) =>
            e.html`<section style="${(0, e.styleMap)(o.styles.root)}" class="${(0, e.classMap)(
              o.classes.root
            )}" role="dialog" aria-modal="${(0, e.ifDefined)(o._ariaModal)}" aria-label="${(0, e.ifDefined)(
              o._ariaLabel
            )}" aria-labelledby="${(0, e.ifDefined)(o._ariaLabelledBy)}" dir="${(0, e.ifDefined)(
              o.effectiveDir
            )}" @keydown=${o._onkeydown} @focusout=${o._onfocusout} @mouseup=${o._onmouseup} @mousedown=${
              o._onmousedown
            }><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${
              o.forwardToLast
            }></span><span class="ui5-popover-arrow" style="${(0, e.styleMap)(o.styles.arrow)}"></span>${
              o._displayHeader ? n(o, a, s) : void 0
            }<div style="${(0, e.styleMap)(o.styles.content)}" class="${(0, e.classMap)(
              o.classes.content
            )}"  @scroll="${o._scroll}"><slot></slot></div>${
              o._displayFooter ? c(o, a, s) : void 0
            }<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${o.forwardToFirst}></span></section>`,
          n = (o, a, s) =>
            e.html`<header class="ui5-popup-header-root" id="ui5-popup-header">${
              o.header.length ? p(o, a, s) : f(o, a, s)
            }</header>`,
          p = (o, a, s) => e.html`<slot name="header"></slot>`,
          f = (o, a, s) => e.html`<h2 class="ui5-popup-header-text">${(0, e.ifDefined)(o.headerText)}</h2>`,
          c = (o, a, s) => e.html`${o.footer.length ? u(o, a, s) : void 0}`,
          u = (o, a, s) => e.html`<footer class="ui5-popup-footer-root"><slot name="footer"></slot></footer>`;
        var h = o;
        exports.default = h;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    U8uo: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const s = "resize-corner",
          t =
            "M386.5 305c6-5 13-8 19-8 7 0 14 3 19 8 5 6 8 12 8 19s-3 13-8 19l-161 161c-6 5-12 8-19 8s-13-3-19-8c-5-5-8-12-8-18 0-7 3-14 8-20zm38-134c5 5 8 12 8 19 0 6-3 13-8 18l-296 296c-5 5-12 8-18 8-7 0-14-3-19-8-6-5-8-12-8-19s2-13 8-19l295-295c6-6 13-8 19-8 7 0 14 2 19 8z",
          c = !1,
          o = "SAP-icons-v5",
          r = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(s, { pathData: t, ltr: !1, collection: o, packageName: r });
        var a = { pathData: t };
        exports.default = a;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    cExx: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const t = "resize-corner",
          s =
            "M384 224v32q0 12-10 22L182 470q-10 10-22 10h-32zM224 480l160-160v32q0 12-10 22l-96 96q-10 10-22 10h-32zm160-64v32q0 12-10 22t-22 10h-32z",
          o = !1,
          r = "SAP-icons",
          a = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(t, { pathData: s, ltr: !1, collection: r, packageName: a });
        var i = { pathData: s };
        exports.default = i;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    GNOv: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/config/Theme.js"),
          r = s(require("./v5/resize-corner.js")),
          t = s(require("./v4/resize-corner.js"));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const o = (0, e.isTheme)("sap_horizon") ? t.default : r.default;
        var u = { pathData: o };
        exports.default = u;
      },
      {
        "@ui5/webcomponents-base/dist/config/Theme.js": "b5d6",
        "./v5/resize-corner.js": "U8uo",
        "./v4/resize-corner.js": "cExx",
      },
    ],
    yRvi: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const o = (o, a, i) =>
            e.html`<section style="${(0, e.styleMap)(o.styles.root)}" class="${(0, e.classMap)(
              o.classes.root
            )}" role="dialog" aria-modal="${(0, e.ifDefined)(o._ariaModal)}" aria-label="${(0, e.ifDefined)(
              o._ariaLabel
            )}" aria-labelledby="${(0, e.ifDefined)(o._ariaLabelledBy)}" dir="${(0, e.ifDefined)(
              o.effectiveDir
            )}" @keydown=${o._onkeydown} @focusout=${o._onfocusout} @mouseup=${o._onmouseup} @mousedown=${
              o._onmousedown
            }><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${o.forwardToLast}></span>${
              o._displayHeader ? s(o, a, i) : void 0
            }<div style="${(0, e.styleMap)(o.styles.content)}" class="${(0, e.classMap)(
              o.classes.content
            )}"  @scroll="${o._scroll}"><slot></slot></div>${o.footer.length ? t(o, a, i) : void 0}${
              o.resizable ? r(o, a, i) : void 0
            }<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${o.forwardToFirst}></span></section> `,
          s = (o, s, t) =>
            e.html`<header class="ui5-popup-header-root" id="ui5-popup-header" tabindex="${(0, e.ifDefined)(
              o._headerTabIndex
            )}" @keydown="${o._onDragOrResizeKeyDown}" @mousedown="${o._onDragMouseDown}">${
              o.header.length ? a(o, s, t) : i(o, s, t)
            }</header>`,
          a = (o, s, a) => e.html`<slot name="header"></slot>`,
          i = (o, s, a) =>
            e.html`<h2 id="ui5-popup-header-text" class="ui5-popup-header-text">${(0, e.ifDefined)(o.headerText)}</h2>`,
          t = (o, s, a) => e.html`<footer class="ui5-popup-footer-root"><slot name="footer"></slot></footer>`,
          r = (o, s, a) =>
            e.html`<${(0, e.scopeTag)("ui5-icon", s, a)} name="resize-corner" dir="${(0, e.ifDefined)(
              o.effectiveDir
            )}" class="ui5-popup-resize-handle" @mousedown="${o._onResizeMouseDown}"></${(0, e.scopeTag)(
              "ui5-icon",
              s,
              a
            )}>`;
        var d = o;
        exports.default = d;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    pO0c: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          o = r(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          t = r(require("./sap_fiori_3/parameters-bundle.css.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => o.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => t.default);
        var i = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/Dialog.css",
          content:
            ":host{min-width:20rem;min-height:6rem;max-height:94%;max-width:90%;flex-direction:column;box-shadow:var(--sapContent_Shadow3)}:host([stretch]){width:90%;height:94%}:host([stretch][on-phone]){width:100%;height:100%;max-height:100%;max-width:100%}.ui5-popup-header-root{background:var(--sapPageHeader_Background)}:host([draggable]) .ui5-popup-header-root,:host([draggable]) ::slotted([slot=header]){cursor:move}:host([draggable]) .ui5-popup-header-root *{cursor:auto}.ui5-popup-header-root:focus{outline:var(--_ui5_dialog_outline);border-radius:var(--_ui5_dialog_header_border_radius);outline-offset:var(--_ui5_dialog_header_focus_offset)}.ui5-popup-root{display:flex;flex-direction:column;max-width:100vw}:host([stretch]) .ui5-popup-content{width:100%;height:100%}.ui5-popup-content{min-height:var(--_ui5_dialog_content_min_height);flex:1 1 auto}.ui5-popup-resize-handle{position:absolute;bottom:var(--_ui5_dialog_resize_handle_bottom);right:var(--_ui5_dialog_resize_handle_right);cursor:se-resize;color:var(--_ui5_dialog_resize_handle_color)}.ui5-popup-resize-handle[dir=rtl]{left:-.25rem;right:unset;cursor:sw-resize}",
        };
        exports.default = i;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    bjbo: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/Device.js"),
          t = d(require("@ui5/webcomponents-base/dist/util/clamp.js")),
          i = d(require("@ui5/webcomponents-base/dist/delegate/ResizeHandler.js")),
          s = require("@ui5/webcomponents-base/dist/Keys.js"),
          n = d(require("./Popup.js"));
        require("@ui5/webcomponents-icons/dist/resize-corner.js");
        var a = d(require("./Icon.js")),
          r = d(require("./generated/templates/DialogTemplate.lit.js")),
          h = d(require("./generated/themes/BrowserScrollbar.css.js")),
          o = d(require("./generated/themes/PopupsCommon.css.js")),
          l = d(require("./generated/themes/Dialog.css.js"));
        function d(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const u = 16,
          _ = {
            tag: "ui5-dialog",
            slots: { header: { type: HTMLElement }, footer: { type: HTMLElement } },
            properties: {
              headerText: { type: String },
              accessibleName: { type: String },
              stretch: { type: Boolean },
              draggable: { type: Boolean },
              resizable: { type: Boolean },
              onPhone: { type: Boolean },
              onDesktop: { type: Boolean },
            },
          };
        class c extends n.default {
          constructor() {
            super(),
              (this._screenResizeHandler = this._center.bind(this)),
              (this._dragMouseMoveHandler = this._onDragMouseMove.bind(this)),
              (this._dragMouseUpHandler = this._onDragMouseUp.bind(this)),
              (this._resizeMouseMoveHandler = this._onResizeMouseMove.bind(this)),
              (this._resizeMouseUpHandler = this._onResizeMouseUp.bind(this));
          }
          static get metadata() {
            return _;
          }
          static get dependencies() {
            return [a.default];
          }
          static get template() {
            return r.default;
          }
          static get styles() {
            return [h.default, o.default, l.default];
          }
          static _isHeader(e) {
            return e.classList.contains("ui5-popup-header-root") || "header" === e.getAttribute("slot");
          }
          async show(e = !1) {
            await super._open(e);
          }
          get isModal() {
            return !0;
          }
          get shouldHideBackdrop() {
            return !1;
          }
          get _ariaLabelledBy() {
            let e;
            return "" === this.headerText || this.accessibleName || (e = "ui5-popup-header-text"), e;
          }
          get _ariaLabel() {
            let e;
            return (
              this.header.length > 0 && this.accessibleName && (e = this.accessibleName),
              this.accessibleName ? this.accessibleName : e
            );
          }
          get _ariaModal() {
            return !0;
          }
          get _displayProp() {
            return "flex";
          }
          get _displayHeader() {
            return this.header.length || this.headerText || this.draggable || this.resizable;
          }
          get _movable() {
            return !this.stretch && this.onDesktop && (this.draggable || this.resizable);
          }
          get _headerTabIndex() {
            return this._movable ? "0" : void 0;
          }
          _show() {
            super._show(), this._center();
          }
          onBeforeRendering() {
            (this._isRTL = "rtl" === this.effectiveDir),
              (this.onPhone = (0, e.isPhone)()),
              (this.onDesktop = (0, e.isDesktop)()),
              this._detachResizeHandlers();
          }
          onAfterRendering() {
            this._attachResizeHandlers();
          }
          onExitDOM() {
            super.onExitDOM(), this._detachResizeHandlers();
          }
          _attachResizeHandlers() {
            i.default.register(this, this._screenResizeHandler),
              i.default.register(document.body, this._screenResizeHandler),
              (this._resizeHandlersAttached = !0);
          }
          _detachResizeHandlers() {
            this._resizeHandlersAttached &&
              (i.default.deregister(this, this._screenResizeHandler),
              i.default.deregister(document.body, this._screenResizeHandler),
              (this._resizeHandlersAttached = !1));
          }
          _center() {
            const e = window.innerHeight - this.offsetHeight,
              t = window.innerWidth - this.offsetWidth;
            Object.assign(this.style, { top: `${Math.round(e / 2)}px`, left: `${Math.round(t / 2)}px` });
          }
          _revertSize() {
            Object.assign(this.style, { top: "", left: "", width: "", height: "" }),
              this.removeEventListener("ui5-before-close", this._revertSize);
          }
          _onDragMouseDown(e) {
            if (!this._movable || !this.draggable || !c._isHeader(e.target)) return;
            e.preventDefault();
            const { top: t, left: i } = this.getBoundingClientRect(),
              { width: s, height: n } = window.getComputedStyle(this);
            Object.assign(this.style, {
              top: `${t}px`,
              left: `${i}px`,
              width: `${Math.round(100 * Number.parseFloat(s)) / 100}px`,
              height: `${Math.round(100 * Number.parseFloat(n)) / 100}px`,
            }),
              (this._x = e.clientX),
              (this._y = e.clientY),
              this._attachMouseDragHandlers();
          }
          _onDragMouseMove(e) {
            e.preventDefault();
            const t = this._x - e.clientX,
              i = this._y - e.clientY,
              { left: s, top: n } = this.getBoundingClientRect();
            Object.assign(this.style, { left: `${Math.floor(s - t)}px`, top: `${Math.floor(n - i)}px` }),
              (this._x = e.clientX),
              (this._y = e.clientY);
          }
          _onDragMouseUp() {
            (this._x = null), (this._y = null), this._detachMouseDragHandlers();
          }
          _onDragOrResizeKeyDown(e) {
            this._movable &&
              c._isHeader(e.target) &&
              (this.draggable && [s.isUp, s.isDown, s.isLeft, s.isRight].some((t) => t(e))
                ? this._dragWithEvent(e)
                : this.resizable &&
                  [s.isUpShift, s.isDownShift, s.isLeftShift, s.isRightShift].some((t) => t(e)) &&
                  this._resizeWithEvent(e));
          }
          _dragWithEvent(e) {
            const { top: i, left: n, width: a, height: r } = this.getBoundingClientRect();
            let h, o;
            switch (!0) {
              case (0, s.isUp)(e):
                (h = i - u), (o = "top");
                break;
              case (0, s.isDown)(e):
                (h = i + u), (o = "top");
                break;
              case (0, s.isLeft)(e):
                (h = n - u), (o = "left");
                break;
              case (0, s.isRight)(e):
                (h = n + u), (o = "left");
            }
            (h = (0, t.default)(h, 0, "left" === o ? window.innerWidth - a : window.innerHeight - r)),
              (this.style[o] = `${h}px`);
          }
          _resizeWithEvent(e) {
            this._detachResizeHandlers(), this.addEventListener("ui5-before-close", this._revertSize);
            const { top: i, left: n } = this.getBoundingClientRect(),
              a = window.getComputedStyle(this),
              r = Number.parseFloat(a.minWidth),
              h = Number.parseFloat(a.minHeight),
              o = window.innerWidth - n,
              l = window.innerHeight - i;
            let d = Number.parseFloat(a.width),
              _ = Number.parseFloat(a.height);
            switch (!0) {
              case (0, s.isUpShift)(e):
                _ -= u;
                break;
              case (0, s.isDownShift)(e):
                _ += u;
                break;
              case (0, s.isLeftShift)(e):
                d -= u;
                break;
              case (0, s.isRightShift)(e):
                d += u;
            }
            (d = (0, t.default)(d, r, o)),
              (_ = (0, t.default)(_, h, l)),
              Object.assign(this.style, { width: `${d}px`, height: `${_}px` });
          }
          _attachMouseDragHandlers() {
            this._detachResizeHandlers(),
              window.addEventListener("mousemove", this._dragMouseMoveHandler),
              window.addEventListener("mouseup", this._dragMouseUpHandler);
          }
          _detachMouseDragHandlers() {
            window.removeEventListener("mousemove", this._dragMouseMoveHandler),
              window.removeEventListener("mouseup", this._dragMouseUpHandler);
          }
          _onResizeMouseDown(e) {
            if (!this._movable || !this.resizable) return;
            e.preventDefault();
            const { top: t, left: i } = this.getBoundingClientRect(),
              { width: s, height: n, minWidth: a, minHeight: r } = window.getComputedStyle(this);
            (this._initialX = e.clientX),
              (this._initialY = e.clientY),
              (this._initialWidth = Number.parseFloat(s)),
              (this._initialHeight = Number.parseFloat(n)),
              (this._initialTop = t),
              (this._initialLeft = i),
              (this._minWidth = Number.parseFloat(a)),
              (this._minHeight = Number.parseFloat(r)),
              Object.assign(this.style, { top: `${t}px`, left: `${i}px` }),
              this._attachMouseResizeHandlers();
          }
          _onResizeMouseMove(e) {
            const { clientX: i, clientY: s } = e;
            let n, a;
            this._isRTL
              ? ((n = (0, t.default)(
                  this._initialWidth - (i - this._initialX),
                  this._minWidth,
                  this._initialLeft + this._initialWidth
                )),
                (a = (0, t.default)(
                  this._initialLeft + (i - this._initialX),
                  0,
                  this._initialX + this._initialWidth - this._minWidth
                )))
              : (n = (0, t.default)(
                  this._initialWidth + (i - this._initialX),
                  this._minWidth,
                  window.innerWidth - this._initialLeft
                ));
            const r = (0, t.default)(
              this._initialHeight + (s - this._initialY),
              this._minHeight,
              window.innerHeight - this._initialTop
            );
            Object.assign(this.style, { height: `${r}px`, width: `${n}px`, left: a ? `${a}px` : void 0 });
          }
          _onResizeMouseUp() {
            (this._initialX = null),
              (this._initialY = null),
              (this._initialWidth = null),
              (this._initialHeight = null),
              (this._initialTop = null),
              (this._initialLeft = null),
              (this._minWidth = null),
              (this._minHeight = null),
              this._detachMouseResizeHandlers();
          }
          _attachMouseResizeHandlers() {
            this._detachResizeHandlers(),
              window.addEventListener("mousemove", this._resizeMouseMoveHandler),
              window.addEventListener("mouseup", this._resizeMouseUpHandler),
              this.addEventListener("ui5-before-close", this._revertSize);
          }
          _detachMouseResizeHandlers() {
            window.removeEventListener("mousemove", this._resizeMouseMoveHandler),
              window.removeEventListener("mouseup", this._resizeMouseUpHandler);
          }
        }
        c.define();
        var p = c;
        exports.default = p;
      },
      {
        "@ui5/webcomponents-base/dist/Device.js": "Oq9i",
        "@ui5/webcomponents-base/dist/util/clamp.js": "seOl",
        "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js": "C7rv",
        "@ui5/webcomponents-base/dist/Keys.js": "glQL",
        "./Popup.js": "yMHy",
        "@ui5/webcomponents-icons/dist/resize-corner.js": "GNOv",
        "./Icon.js": "RJcw",
        "./generated/templates/DialogTemplate.lit.js": "yRvi",
        "./generated/themes/BrowserScrollbar.css.js": "rCxv",
        "./generated/themes/PopupsCommon.css.js": "XtRV",
        "./generated/themes/Dialog.css.js": "pO0c",
      },
    ],
    Drlb: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          i = s(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          t = s(require("./sap_fiori_3/parameters-bundle.css.js"));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => i.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => t.default);
        var r = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/ResponsivePopover.css",
          content:
            ":host{--_ui5_input_width:100%;min-width:6.25rem;min-height:2rem}:host(:not([with-padding])){--_ui5_popup_content_padding:0}:host([opened]){display:inline-block}.ui5-responsive-popover-header{height:var(--_ui5-responsive_popover_header_height);display:flex;justify-content:space-between;align-items:center;padding:0 1rem;box-shadow:var(--sapContent_HeaderShadow)}:host [dir=rtl] .ui5-responsive-popover-header{padding:0 1rem 0 0}.ui5-responsive-popover-header-text{width:calc(100% - var(--_ui5_button_base_min_width))}.ui5-responsive-popover-header-no-title{justify-content:flex-end}",
        };
        exports.default = r;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    F6VG: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/Device.js"),
          t = require("@ui5/webcomponents-base/dist/i18nBundle.js"),
          s = require("@ui5/webcomponents-base/dist/util/PopupUtils.js"),
          i = require("./generated/i18n/i18n-defaults.js"),
          o = p(require("./generated/templates/ResponsivePopoverTemplate.lit.js")),
          n = p(require("./Popover.js")),
          r = p(require("./Dialog.js")),
          a = p(require("./Button.js")),
          l = p(require("./Title.js"));
        require("@ui5/webcomponents-icons/dist/decline.js");
        var u = p(require("./generated/themes/ResponsivePopover.css.js"));
        function p(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const d = {
          tag: "ui5-responsive-popover",
          properties: {
            withPadding: { type: Boolean },
            contentOnlyOnDesktop: { type: Boolean },
            _hideHeader: { type: Boolean },
            _hideCloseButton: { type: Boolean },
          },
        };
        class c extends n.default {
          constructor() {
            super();
          }
          static get metadata() {
            return d;
          }
          static get styles() {
            return [n.default.styles, u.default];
          }
          get classes() {
            const e = super.classes;
            return (
              (e.header = {
                "ui5-responsive-popover-header": !0,
                "ui5-responsive-popover-header-no-title": !this.headerText,
              }),
              e
            );
          }
          static get template() {
            return o.default;
          }
          static get dependencies() {
            return [a.default, r.default, l.default];
          }
          async showAt(t, i = !1) {
            (0, e.isPhone)()
              ? ((this.style.display = "contents"),
                (this.style.zIndex = (0, s.getNextZIndex)()),
                await this._dialog.show(i))
              : await super.showAt(t, i);
          }
          close(t = !1, s = !1, i = !1) {
            (0, e.isPhone)() ? this._dialog.close(t, s, i) : super.close(t, s, i);
          }
          toggle(e) {
            if (this.isOpen()) return this.close();
            this.showAt(e);
          }
          isOpen() {
            return (0, e.isPhone)() ? this._dialog.isOpen() : super.isOpen();
          }
          get _dialog() {
            return this.shadowRoot.querySelector("[ui5-dialog]");
          }
          get _isPhone() {
            return (0, e.isPhone)();
          }
          get _displayHeader() {
            return (this._isPhone || !this.contentOnlyOnDesktop) && super._displayHeader;
          }
          get _displayFooter() {
            return this._isPhone || !this.contentOnlyOnDesktop;
          }
          get _closeDialogAriaLabel() {
            return c.i18nBundle.getText(i.RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON);
          }
          _afterDialogOpen(e) {
            (this.opened = !0), this._propagateDialogEvent(e);
          }
          _afterDialogClose(e) {
            (this.opened = !1), this._propagateDialogEvent(e);
          }
          _propagateDialogEvent(e) {
            const t = e.type.replace("ui5-", "");
            this.fireEvent(t, e.detail);
          }
          static async onDefine() {
            c.i18nBundle = await (0, t.getI18nBundle)("@ui5/webcomponents");
          }
        }
        c.define();
        var h = c;
        exports.default = h;
      },
      {
        "@ui5/webcomponents-base/dist/Device.js": "Oq9i",
        "@ui5/webcomponents-base/dist/i18nBundle.js": "F4Ye",
        "@ui5/webcomponents-base/dist/util/PopupUtils.js": "phX0",
        "./generated/i18n/i18n-defaults.js": "XB3p",
        "./generated/templates/ResponsivePopoverTemplate.lit.js": "SXvz",
        "./Popover.js": "ZHo6",
        "./Dialog.js": "bjbo",
        "./Button.js": "PQe6",
        "./Title.js": "Figp",
        "@ui5/webcomponents-icons/dist/decline.js": "vj7t",
        "./generated/themes/ResponsivePopover.css.js": "Drlb",
      },
    ],
    bTeu: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const t = { Auto: "Auto", Vertical: "Vertical", Horizontal: "Horizontal", Paging: "Paging" };
        var e = t;
        exports.default = e;
      },
      {},
    ],
    vKaa: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const t = { Static: "Static", Cyclic: "Cyclic" };
        var e = t;
        exports.default = e;
      },
      {},
    ],
    K1cr: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("../Keys.js"),
          t = s(require("../util/getActiveElement.js")),
          i = s(require("../types/NavigationMode.js")),
          n = s(require("../types/ItemNavigationBehavior.js"));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        class r {
          constructor(e, t = {}) {
            this._setRootComponent(e), this._initOptions(t);
          }
          _setRootComponent(e) {
            if (!e.isUI5Element) throw new Error("The root web component must be a UI5 Element instance");
            (this.rootWebComponent = e),
              this.rootWebComponent.addEventListener("keydown", this._onkeydown.bind(this)),
              (this.rootWebComponent._onComponentStateFinalized = () => {
                this._init();
              });
          }
          _initOptions(e) {
            if ("function" != typeof e.getItemsCallback) throw new Error("getItemsCallback is required");
            (this._getItems = e.getItemsCallback),
              (this._currentIndex = e.currentIndex || 0),
              (this._rowSize = e.rowSize || 1),
              (this._behavior = e.behavior || n.default.Static),
              (this._navigationMode = e.navigationMode || i.default.Auto),
              (this._affectedPropertiesNames = e.affectedPropertiesNames || []),
              (this._skipItemsSize = e.skipItemsSize || null);
          }
          setCurrentItem(e) {
            const t = this._getItems().indexOf(e);
            -1 !== t
              ? ((this._currentIndex = t), this._applyTabIndex())
              : console.warn("The provided item is not managed by ItemNavigation", e);
          }
          setRowSize(e) {
            this._rowSize = e;
          }
          _init() {
            this._getItems().forEach((e, t) => {
              e._tabIndex = t === this._currentIndex ? "0" : "-1";
            });
          }
          _onkeydown(t) {
            if (!this._canNavigate()) return;
            const n = this._navigationMode === i.default.Horizontal || this._navigationMode === i.default.Auto,
              s = this._navigationMode === i.default.Vertical || this._navigationMode === i.default.Auto;
            if ((0, e.isUp)(t) && s) this._handleUp();
            else if ((0, e.isDown)(t) && s) this._handleDown();
            else if ((0, e.isLeft)(t) && n) this._handleLeft();
            else if ((0, e.isRight)(t) && n) this._handleRight();
            else if ((0, e.isHome)(t)) this._handleHome();
            else if ((0, e.isEnd)(t)) this._handleEnd();
            else if ((0, e.isPageUp)(t)) this._handlePageUp();
            else {
              if (!(0, e.isPageDown)(t)) return;
              this._handlePageDown();
            }
            t.preventDefault(), this._applyTabIndex(), this._focusCurrentItem();
          }
          _handleUp() {
            const e = this._getItems().length;
            if (this._currentIndex - this._rowSize >= 0) this._currentIndex -= this._rowSize;
            else if (this._behavior === n.default.Cyclic) {
              const t = this._currentIndex % this._rowSize;
              let i = (0 === t ? this._rowSize - 1 : t - 1) + (Math.ceil(e / this._rowSize) - 1) * this._rowSize;
              i > e - 1 && (i -= this._rowSize), (this._currentIndex = i);
            } else this._currentIndex = 0;
          }
          _handleDown() {
            const e = this._getItems().length;
            if (this._currentIndex + this._rowSize < e) this._currentIndex += this._rowSize;
            else if (this._behavior === n.default.Cyclic) {
              const e = ((this._currentIndex % this._rowSize) + 1) % this._rowSize;
              this._currentIndex = e;
            } else this._currentIndex = e - 1;
          }
          _handleLeft() {
            const e = this._getItems().length;
            this._currentIndex > 0
              ? (this._currentIndex -= 1)
              : this._behavior === n.default.Cyclic && (this._currentIndex = e - 1);
          }
          _handleRight() {
            const e = this._getItems().length;
            this._currentIndex < e - 1
              ? (this._currentIndex += 1)
              : this._behavior === n.default.Cyclic && (this._currentIndex = 0);
          }
          _handleHome() {
            const e = this._rowSize > 1 ? this._rowSize : this._getItems().length;
            this._currentIndex -= this._currentIndex % e;
          }
          _handleEnd() {
            const e = this._rowSize > 1 ? this._rowSize : this._getItems().length;
            this._currentIndex += e - 1 - (this._currentIndex % e);
          }
          _handlePageUp() {
            this._rowSize > 1 || this._handlePageUpFlat();
          }
          _handlePageDown() {
            this._rowSize > 1 || this._handlePageDownFlat();
          }
          _handlePageUpFlat() {
            null === this._skipItemsSize && (this._currentIndex -= this._currentIndex),
              this._currentIndex + 1 > this._skipItemsSize
                ? (this._currentIndex -= this._skipItemsSize)
                : (this._currentIndex -= this._currentIndex);
          }
          _handlePageDownFlat() {
            null === this._skipItemsSize && (this._currentIndex = this._getItems().length - 1),
              this._getItems().length - this._currentIndex - 1 > this._skipItemsSize
                ? (this._currentIndex += this._skipItemsSize)
                : (this._currentIndex = this._getItems().length - 1);
          }
          _applyTabIndex() {
            const e = this._getItems();
            for (let t = 0; t < e.length; t++) e[t]._tabIndex = t === this._currentIndex ? "0" : "-1";
            this._affectedPropertiesNames.forEach((e) => {
              const t = this.rootWebComponent[e];
              this.rootWebComponent[e] = Array.isArray(t) ? [...t] : { ...t };
            });
          }
          _focusCurrentItem() {
            const e = this._getCurrentItem();
            e && e.focus();
          }
          _canNavigate() {
            const e = this._getCurrentItem(),
              i = (0, t.default)();
            return e && e === i;
          }
          _getCurrentItem() {
            const e = this._getItems();
            if (!e.length) return null;
            for (; this._currentIndex >= e.length; ) this._currentIndex -= this._rowSize;
            this._currentIndex < 0 && (this._currentIndex = 0);
            const t = e[this._currentIndex];
            if (t) {
              if (t.isUI5Element) return t.getFocusDomRef();
              if (this.rootWebComponent.getDomRef()) return this.rootWebComponent.getDomRef().querySelector(`#${t.id}`);
            }
          }
        }
        var h = r;
        exports.default = h;
      },
      {
        "../Keys.js": "glQL",
        "../util/getActiveElement.js": "U0bv",
        "../types/NavigationMode.js": "bTeu",
        "../types/ItemNavigationBehavior.js": "vKaa",
      },
    ],
    rT1k: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("./isNodeHidden.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const r = (t) => {
          if (!t) return !1;
          const r = t.nodeName.toLowerCase();
          if (t.hasAttribute("data-sap-no-tab-ref")) return !1;
          if ((0, e.default)(t)) return !1;
          const a = t.getAttribute("tabindex");
          return null != a
            ? parseInt(a) >= 0
            : "a" === r || /input|select|textarea|button|object/.test(r)
            ? !t.disabled
            : void 0;
        };
        var a = r;
        exports.default = a;
      },
      { "./isNodeHidden.js": "Qfq4" },
    ],
    yMap: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.getTabbableElements = exports.getLastTabbableElement = void 0);
        var e = t(require("./isNodeTabbable.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const o = (e) => r(e.children);
        exports.getTabbableElements = o;
        const a = (e) => {
          const t = r(e.children);
          return t.length ? t[t.length - 1] : null;
        };
        exports.getLastTabbableElement = a;
        const r = (t, o) => {
          const a = o || [];
          return t
            ? (Array.from(t).forEach((t) => {
                if (
                  t.nodeType !== Node.TEXT_NODE &&
                  t.nodeType !== Node.COMMENT_NODE &&
                  !t.hasAttribute("data-sap-no-tab-ref")
                ) {
                  if (t.shadowRoot) {
                    const e = t.shadowRoot.children;
                    t = Array.from(e).find((e) => "STYLE" !== e.tagName);
                  }
                  (0, e.default)(t) && a.push(t), "SLOT" === t.tagName ? r(t.assignedNodes(), a) : r(t.children, a);
                }
              }),
              a)
            : a;
        };
      },
      { "./isNodeTabbable.js": "rT1k" },
    ],
    qvh0: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        let e = null;
        const t = (t, l) => {
          clearTimeout(e),
            (e = setTimeout(() => {
              (e = null), t();
            }, l));
        };
        var l = t;
        exports.default = l;
      },
      {},
    ],
    ALFm: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = (e) => {
          const t = e.getBoundingClientRect();
          return (
            t.top >= 0 &&
            t.left >= 0 &&
            t.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            t.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
        };
        var t = e;
        exports.default = t;
      },
      {},
    ],
    oa5u: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const l = {
          None: "None",
          SingleSelect: "SingleSelect",
          SingleSelectBegin: "SingleSelectBegin",
          SingleSelectEnd: "SingleSelectEnd",
          SingleSelectAuto: "SingleSelectAuto",
          MultiSelect: "MultiSelect",
          Delete: "Delete",
        };
        class n extends e.default {
          static isValid(e) {
            return !!l[e];
          }
        }
        n.generateTypeAccessors(l);
        var i = n;
        exports.default = i;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    uNWv: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = { Button: "Button", Scroll: "Scroll", None: "None" };
        class o extends e.default {
          static isValid(e) {
            return !!s[e];
          }
        }
        o.generateTypeAccessors(s);
        var r = o;
        exports.default = r;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    wNZi: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("./GrowingMode.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        class r extends e.default {}
        var s = r;
        exports.default = s;
      },
      { "./GrowingMode.js": "uNWv" },
    ],
    oiDk: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = { All: "All", Inner: "Inner", None: "None" };
        class r extends e.default {
          static isValid(e) {
            return !!s[e];
          }
        }
        r.generateTypeAccessors(s);
        var n = r;
        exports.default = n;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    vODJ: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = { Small: "Small", Medium: "Medium", Large: "Large" };
        class a extends e.default {
          static isValid(e) {
            return !!s[e];
          }
        }
        a.generateTypeAccessors(s);
        var r = a;
        exports.default = r;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    jSoJ: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var i = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const e = (e, s, r) =>
            i.html`<div class="${(0, i.classMap)(e.classes.root)}">${e._isBusy ? a(e, s, r) : void 0}<slot></slot>${
              e.active ? t(e, s, r) : void 0
            }</div>`,
          a = (e, a, t) =>
            i.html`<div class="ui5-busy-indicator-busy-area" title="${(0, i.ifDefined)(
              e.ariaTitle
            )}" tabindex="0" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuetext="Busy" aria-labelledby="${(0,
            i.ifDefined)(
              e.labelId
            )}" data-sap-focus-ref><div class="ui5-busy-indicator-circles-wrapper"><div class="ui5-busy-indicator-circle circle-animation-0"></div><div class="ui5-busy-indicator-circle circle-animation-1"></div><div class="ui5-busy-indicator-circle circle-animation-2"></div></div>${
              e.text ? s(e, a, t) : void 0
            }</div>`,
          s = (e, a, s) =>
            i.html`<${(0, i.scopeTag)("ui5-label", a, s)} id="${(0, i.ifDefined)(
              e._id
            )}-label" class="ui5-busy-indicator-text">${(0, i.ifDefined)(e.text)}</${(0, i.scopeTag)(
              "ui5-label",
              a,
              s
            )}>`,
          t = (e, a, s) => i.html`<span data-ui5-focus-redirect tabindex="0" @focusin="${e._redirectFocus}"></span>`;
        var r = e;
        exports.default = r;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    dAMx: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var i = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          e = o(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          t = o(require("./sap_fiori_3/parameters-bundle.css.js"));
        function o(i) {
          return i && i.__esModule ? i : { default: i };
        }
        (0, i.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => e.default),
          (0, i.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => t.default);
        var r = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/BusyIndicator.css",
          content:
            ':host(:not([hidden])){display:inline-block}:host([active]){color:var(--_ui5_busy_indicator_color)}:host([active]) :not(.ui5-busy-indicator-root--ie) ::slotted(:not([class^=ui5-busy-indicator-])){opacity:.6}:host([active]) .ui5-busy-indicator-root--ie ::slotted(:not([class^=ui5-busy-indicator-])){opacity:.95}:host([size=Small]) .ui5-busy-indicator-root{min-width:1.5rem;min-height:.5rem}:host([size=Small][text]:not([text=""])) .ui5-busy-indicator-root{min-height:1.75rem}:host([size=Small]) .ui5-busy-indicator-circle{width:.5rem;height:.5rem}:host(:not([size])) .ui5-busy-indicator-root,:host([size=Medium]) .ui5-busy-indicator-root{min-width:3rem;min-height:1rem}:host(:not([size])[text]:not([text=""])) .ui5-busy-indicator-root,:host([size=Medium][text]:not([text=""])) .ui5-busy-indicator-root{min-height:2.25rem}:host(:not([size])) .ui5-busy-indicator-circle,:host([size=Medium]) .ui5-busy-indicator-circle{width:1rem;height:1rem}:host([size=Large]) .ui5-busy-indicator-root{min-width:6rem;min-height:2rem}:host([size=Large][text]:not([text=""])) .ui5-busy-indicator-root{min-height:3.25rem}:host([size=Large]) .ui5-busy-indicator-circle{width:2rem;height:2rem}.ui5-busy-indicator-root{display:flex;justify-content:center;align-items:center;position:relative;background-color:inherit}.ui5-busy-indicator-busy-area{position:absolute;z-index:99;left:0;right:0;top:0;bottom:0;display:flex;justify-content:center;align-items:center;background-color:inherit;flex-direction:column}.ui5-busy-indicator-busy-area:focus{outline:var(--_ui5_busy_indicator_focus_outline);outline-offset:-2px;border-radius:var(--_ui5_busy_indicator_focus_border_radius)}.ui5-busy-indicator-circles-wrapper{line-height:0}.ui5-busy-indicator-circle{display:inline-block;background-color:currentColor;border-radius:50%}.ui5-busy-indicator-circle:before{content:"";width:100%;height:100%;border-radius:100%}.circle-animation-0{animation:grow 1.6s cubic-bezier(.32,.06,.85,1.11) infinite}.circle-animation-1{animation:grow 1.6s cubic-bezier(.32,.06,.85,1.11) infinite;animation-delay:.2s}.circle-animation-2{animation:grow 1.6s cubic-bezier(.32,.06,.85,1.11) infinite;animation-delay:.4s}.ui5-busy-indicator-text{width:100%;margin-top:.25rem;text-align:center}@keyframes grow{0%,50%,to{-webkit-transform:scale(.5);-moz-transform:scale(.5);-ms-transform:scale(.5);transform:scale(.5)}25%{-webkit-transform:scale(1);-moz-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}}',
        };
        exports.default = r;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    djiq: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = c(require("@ui5/webcomponents-base/dist/UI5Element.js")),
          t = c(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js")),
          i = require("@ui5/webcomponents-base/dist/Device.js"),
          s = require("@ui5/webcomponents-base/dist/i18nBundle.js"),
          r = require("@ui5/webcomponents-base/dist/Keys.js"),
          u = c(require("@ui5/webcomponents-base/dist/types/Integer.js")),
          n = c(require("./types/BusyIndicatorSize.js")),
          a = c(require("./Label.js")),
          d = c(require("./generated/templates/BusyIndicatorTemplate.lit.js")),
          o = require("./generated/i18n/i18n-defaults.js"),
          l = c(require("./generated/themes/BusyIndicator.css.js"));
        function c(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const y = {
          tag: "ui5-busy-indicator",
          altTag: "ui5-busyindicator",
          languageAware: !0,
          slots: { default: { type: Node } },
          properties: {
            text: { type: String },
            size: { type: n.default, defaultValue: n.default.Medium },
            active: { type: Boolean },
            delay: { type: u.default, defaultValue: 1e3 },
            _isBusy: { type: Boolean, noAttribute: !0 },
          },
        };
        class h extends e.default {
          constructor() {
            super(),
              (this._keydownHandler = this._handleKeydown.bind(this)),
              (this._preventEventHandler = this._preventEvent.bind(this));
          }
          onEnterDOM() {
            this.addEventListener("keydown", this._keydownHandler, { capture: !0 }),
              this.addEventListener("keyup", this._preventEventHandler, { capture: !0 });
          }
          onExitDOM() {
            this._busyTimeoutId && (clearTimeout(this._busyTimeoutId), delete this._busyTimeoutId),
              this.removeEventListener("keydown", this._keydownHandler, !0),
              this.removeEventListener("keyup", this._preventEventHandler, !0);
          }
          static get metadata() {
            return y;
          }
          static get styles() {
            return l.default;
          }
          static get render() {
            return t.default;
          }
          static get template() {
            return d.default;
          }
          static get dependencies() {
            return [a.default];
          }
          static async onDefine() {
            h.i18nBundle = await (0, s.getI18nBundle)("@ui5/webcomponents");
          }
          get ariaTitle() {
            return h.i18nBundle.getText(o.BUSY_INDICATOR_TITLE);
          }
          get labelId() {
            return this.text ? `${this._id}-label` : void 0;
          }
          get classes() {
            return { root: { "ui5-busy-indicator-root": !0, "ui5-busy-indicator-root--ie": (0, i.isIE)() } };
          }
          onBeforeRendering() {
            this.active
              ? this._isBusy ||
                this._busyTimeoutId ||
                (this._busyTimeoutId = setTimeout(() => {
                  delete this._busyTimeoutId, (this._isBusy = !0);
                }, Math.max(0, this.delay)))
              : (this._busyTimeoutId && (clearTimeout(this._busyTimeoutId), delete this._busyTimeoutId),
                (this._isBusy = !1));
          }
          _handleKeydown(e) {
            this.active &&
              (e.stopImmediatePropagation(),
              (0, r.isTabNext)(e) &&
                ((this.focusForward = !0),
                this.shadowRoot.querySelector("[data-ui5-focus-redirect]").focus(),
                (this.focusForward = !1)));
          }
          _preventEvent(e) {
            this.active && e.stopImmediatePropagation();
          }
          _redirectFocus(e) {
            this.focusForward ||
              (e.preventDefault(), this.shadowRoot.querySelector(".ui5-busy-indicator-busy-area").focus());
          }
        }
        h.define();
        var p = h;
        exports.default = p;
      },
      {
        "@ui5/webcomponents-base/dist/UI5Element.js": "Kogr",
        "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG",
        "@ui5/webcomponents-base/dist/Device.js": "Oq9i",
        "@ui5/webcomponents-base/dist/i18nBundle.js": "F4Ye",
        "@ui5/webcomponents-base/dist/Keys.js": "glQL",
        "@ui5/webcomponents-base/dist/types/Integer.js": "y11y",
        "./types/BusyIndicatorSize.js": "vODJ",
        "./Label.js": "CXe7",
        "./generated/templates/BusyIndicatorTemplate.lit.js": "jSoJ",
        "./generated/i18n/i18n-defaults.js": "XB3p",
        "./generated/themes/BusyIndicator.css.js": "dAMx",
      },
    ],
    BPiD: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const i = (i, f, u) =>
            e.html`<div class="ui5-list-root" @focusin="${i._onfocusin}" @keydown="${
              i._onkeydown
            }"><div class="ui5-list-scroll-container"><!-- header -->${i.header.length ? d(i, f, u) : void 0}${
              i.shouldRenderH1 ? t(i, f, u) : void 0
            }${i.hasData ? a(i, f, u) : void 0}<span id="${(0, e.ifDefined)(
              i._id
            )}-modeLabel" class="ui5-hidden-text">${(0, e.ifDefined)(i.ariaLabelModeText)}</span><ul id="${(0,
            e.ifDefined)(i._id)}-listUl" class="ui5-list-ul" role="${(0, e.ifDefined)(
              i.accessibleRole
            )}" aria-label="${(0, e.ifDefined)(i.ariaLabelTxt)}" aria-labelledby="${(0, e.ifDefined)(
              i.ariaLabelledBy
            )}"><slot></slot>${i.showNoDataText ? o(i, f, u) : void 0}</ul>${i.growsWithButton ? s(i, f, u) : void 0}${
              i.footerText ? n(i, f, u) : void 0
            }${
              i.hasData ? l(i, f, u) : void 0
            }<span tabindex="-1" aria-hidden="true" class="ui5-list-end-marker"></span></div>${
              i.busy ? r(i, f, u) : void 0
            }</div> `,
          d = (i, d, t) => e.html`<slot name="header" />`,
          t = (i, d, t) =>
            e.html`<header id="${(0, e.ifDefined)(i.headerID)}" class="ui5-list-header">${(0, e.ifDefined)(
              i.headerText
            )}</header>`,
          a = (i, d, t) =>
            e.html`<div id="${(0, e.ifDefined)(i._id)}-before" tabindex="0" class="ui5-list-focusarea"></div>`,
          o = (i, d, t) =>
            e.html`<li id="${(0, e.ifDefined)(i._id)}-nodata" class="ui5-list-nodata" tabindex="${(0, e.ifDefined)(
              i.noDataTabIndex
            )}"><div id="${(0, e.ifDefined)(i._id)}-nodata-text" class="ui5-list-nodata-text">${(0, e.ifDefined)(
              i.noDataText
            )}</div></li>`,
          s = (i, d, t) =>
            e.html`<div growing-button><div tabindex="0" role="button" aria-labelledby="${(0, e.ifDefined)(
              i._id
            )}-growingButton-text" ?active="${i._loadMoreActive}" @click="${i._onLoadMoreClick}" @keydown="${
              i._onLoadMoreKeydown
            }" @keyup="${i._onLoadMoreKeyup}" @mousedown="${i._onLoadMoreMousedown}" @mouseup="${
              i._onLoadMoreMouseup
            }" growing-button-inner><span id="${(0, e.ifDefined)(i._id)}-growingButton-text" growing-button-text>${(0,
            e.ifDefined)(i._growingButtonText)}</span></div></div>`,
          n = (i, d, t) =>
            e.html`<footer id="${(0, e.ifDefined)(i._id)}-footer" class="ui5-list-footer">${(0, e.ifDefined)(
              i.footerText
            )}</footer>`,
          l = (i, d, t) =>
            e.html`<div id="${(0, e.ifDefined)(i._id)}-after" tabindex="0" class="ui5-list-focusarea"></div>`,
          r = (i, d, t) =>
            e.html`<div class="ui5-list-busy-row"><${(0, e.scopeTag)("ui5-busy-indicator", d, t)} delay="${(0,
            e.ifDefined)(i.busyDelay)}" active size="Medium" class="ui5-list-busy-ind" style="${(0, e.styleMap)(
              i.styles.busyInd
            )}" data-sap-focus-ref></${(0, e.scopeTag)("ui5-busy-indicator", d, t)}></div>`;
        var f = i;
        exports.default = f;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    keJ2: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          o = i(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          t = i(require("./sap_fiori_3/parameters-bundle.css.js"));
        function i(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => o.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => t.default);
        var r = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/List.css",
          content:
            '.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}[growing-button]{display:flex;align-items:center;padding:var(--_ui5_load_more_padding);border-top:1px solid var(--sapList_BorderColor);box-sizing:border-box;cursor:pointer;outline:none}[growing-button-inner]{display:flex;align-items:center;justify-content:center;flex-direction:column;min-height:var(--_ui5_load_more_text_height);width:100%;color:var(--sapButton_TextColor);background-color:var(--sapList_Background);border:var(--_ui5_load_more_border);border-radius:var(--_ui5_load_more_border_radius);box-sizing:border-box}[growing-button-inner]:focus{outline:var(--_ui5_load_more_outline_width) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);outline-offset:-.125rem;border-color:transparent}[growing-button-inner]:hover{background-color:var(--sapList_Hover_Background)}[growing-button-inner]:active,[growing-button-inner][active]{background-color:var(--sapList_Active_Background);border-color:var(--sapList_Active_Background)}[growing-button-inner]:active>*,[growing-button-inner][active]>*{color:var(--sapList_Active_TextColor)}[growing-button-subtext],[growing-button-text]{width:100%;text-align:center;font-family:"72override",var(--sapFontFamily);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-sizing:border-box}[growing-button-text]{height:var(--_ui5_load_more_text_height);padding:.875rem 1rem 0 1rem;font-size:var(--_ui5_load_more_text_font_size);font-weight:700}[growing-button-subtext]{font-size:var(--sapFontSize);padding:var(--_ui5_load_more_desc_padding)}:host(:not([hidden])){display:block;max-width:100%;width:100%}:host([indent]) .ui5-list-root{padding:2rem}:host([separators=None]) .ui5-list-nodata{border-bottom:0}:host([busy]){opacity:.72}:host([busy]) .ui5-list-busy-row{position:absolute;left:0;right:0;bottom:0;top:0;outline:none}:host([busy]) .ui5-list-busy-ind{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1}.ui5-list-root{width:100%;height:100%;position:relative;box-sizing:border-box}.ui5-list-scroll-container{overflow:auto;height:100%}.ui5-list-ul{list-style-type:none;padding:0;margin:0}.ui5-list-ul:focus{outline:none}.ui5-list-focusarea{position:fixed}.ui5-list-header{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box;font-size:var(--sapFontHeader4Size);font-family:"72override",var(--sapFontFamily);color:var(--sapGroup_TitleTextColor);height:3rem;line-height:3rem;padding:0 1rem;background-color:var(--sapGroup_TitleBackground);border-bottom:1px solid var(--sapGroup_TitleBorderColor)}.ui5-list-footer{height:2rem;box-sizing:border-box;-webkit-text-size-adjust:none;font-size:var(--sapFontSize);font-family:"72override",var(--sapFontFamily);line-height:2rem;background-color:var(--sapList_FooterBackground);color:var(--ui5_list_footer_text_color);padding:0 1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ui5-list-nodata{list-style-type:none;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;color:var(--sapTextColor);background-color:var(--sapList_Background);border-bottom:1px solid var(--sapList_BorderColor);padding:0 1rem!important;height:var(--_ui5_list_no_data_height);font-size:var(--sapFontSize)}.ui5-list-nodata-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
        };
        exports.default = r;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    k4fe: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = S(require("@ui5/webcomponents-base/dist/UI5Element.js")),
          t = S(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js")),
          s = S(require("@ui5/webcomponents-base/dist/delegate/ResizeHandler.js")),
          i = S(require("@ui5/webcomponents-base/dist/delegate/ItemNavigation.js")),
          r = require("@ui5/webcomponents-base/dist/Device.js"),
          o = require("@ui5/webcomponents-base/dist/Render.js"),
          n = require("@ui5/webcomponents-base/dist/util/TabbableElements.js"),
          l = require("@ui5/webcomponents-base/dist/Keys.js"),
          d = S(require("@ui5/webcomponents-base/dist/types/Integer.js")),
          a = S(require("@ui5/webcomponents-base/dist/types/NavigationMode.js")),
          u = require("@ui5/webcomponents-base/dist/util/AriaLabelHelper.js"),
          h = require("@ui5/webcomponents-base/dist/i18nBundle.js"),
          c = S(require("@ui5/webcomponents-base/dist/util/debounce.js")),
          m = S(require("@ui5/webcomponents-base/dist/util/isElementInView.js")),
          g = S(require("./types/ListMode.js")),
          f = S(require("./types/ListGrowingMode.js")),
          b = S(require("./types/ListSeparators.js")),
          I = S(require("./BusyIndicator.js")),
          p = S(require("./generated/templates/ListTemplate.lit.js")),
          E = S(require("./generated/themes/List.css.js")),
          v = require("./generated/i18n/i18n-defaults.js");
        function S(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const y = 250,
          w = 10,
          _ = {
            tag: "ui5-list",
            managedSlots: !0,
            slots: { header: { type: HTMLElement }, default: { propertyName: "items", type: HTMLElement } },
            properties: {
              headerText: { type: String },
              footerText: { type: String },
              indent: { type: Boolean },
              mode: { type: g.default, defaultValue: g.default.None },
              noDataText: { type: String },
              separators: { type: b.default, defaultValue: b.default.All },
              growing: { type: f.default, defaultValue: f.default.None },
              busy: { type: Boolean },
              busyDelay: { type: d.default, defaultValue: 1e3 },
              accessibleName: { type: String },
              accessibleNameRef: { type: String, defaultValue: "" },
              accessibleRole: { type: String, defaultValue: "list" },
              _inViewport: { type: Boolean },
              _loadMoreActive: { type: Boolean },
            },
            events: {
              "item-click": { detail: { item: { type: HTMLElement } } },
              "item-close": { detail: { item: { type: HTMLElement } } },
              "item-toggle": { detail: { item: { type: HTMLElement } } },
              "item-delete": { detail: { item: { type: HTMLElement } } },
              "selection-change": {
                detail: {
                  selectedItems: { type: Array },
                  previouslySelectedItems: { type: Array },
                  selectionComponentPressed: { type: Boolean },
                },
              },
              "load-more": {},
            },
          };
        class L extends e.default {
          static get metadata() {
            return _;
          }
          static get render() {
            return t.default;
          }
          static get template() {
            return p.default;
          }
          static get styles() {
            return E.default;
          }
          static async onDefine() {
            L.i18nBundle = await (0, h.getI18nBundle)("@ui5/webcomponents");
          }
          static get dependencies() {
            return [I.default];
          }
          constructor() {
            super(),
              this.initItemNavigation(),
              (this._previouslyFocusedItem = null),
              (this._forwardingFocus = !1),
              (this._previouslySelectedItem = null),
              (this.resizeListenerAttached = !1),
              (this.listEndObserved = !1),
              this.addEventListener("ui5-_press", this.onItemPress.bind(this)),
              this.addEventListener("ui5-close", this.onItemClose.bind(this)),
              this.addEventListener("ui5-toggle", this.onItemToggle.bind(this)),
              this.addEventListener("ui5-_focused", this.onItemFocused.bind(this)),
              this.addEventListener("ui5-_forward-after", this.onForwardAfter.bind(this)),
              this.addEventListener("ui5-_forward-before", this.onForwardBefore.bind(this)),
              this.addEventListener("ui5-_selection-requested", this.onSelectionRequested.bind(this)),
              this.addEventListener("ui5-_focus-requested", this.focusUploadCollectionItem.bind(this)),
              (this._handleResize = this.checkListInViewport.bind(this)),
              (this.initialIntersection = !0);
          }
          onExitDOM() {
            this.unobserveListEnd(),
              (this.resizeListenerAttached = !1),
              s.default.deregister(this.getDomRef(), this._handleResize);
          }
          onBeforeRendering() {
            this.prepareListItems();
          }
          onAfterRendering() {
            this.growsOnScroll ? this.observeListEnd() : this.listEndObserved && this.unobserveListEnd(),
              this.grows && (this.checkListInViewport(), this.attachForResize());
          }
          attachForResize() {
            this.resizeListenerAttached ||
              ((this.resizeListenerAttached = !0), s.default.register(this.getDomRef(), this._handleResize));
          }
          get shouldRenderH1() {
            return !this.header.length && this.headerText;
          }
          get headerID() {
            return `${this._id}-header`;
          }
          get modeLabelID() {
            return `${this._id}-modeLabel`;
          }
          get listEndDOM() {
            return this.shadowRoot.querySelector(".ui5-list-end-marker");
          }
          get hasData() {
            return 0 !== this.getSlottedNodes("items").length;
          }
          get showNoDataText() {
            return !this.hasData && this.noDataText;
          }
          get isDelete() {
            return this.mode === g.default.Delete;
          }
          get isSingleSelect() {
            return [
              g.default.SingleSelect,
              g.default.SingleSelectBegin,
              g.default.SingleSelectEnd,
              g.default.SingleSelectAuto,
            ].includes(this.mode);
          }
          get isMultiSelect() {
            return this.mode === g.default.MultiSelect;
          }
          get ariaLabelledBy() {
            if (this.accessibleNameRef || this.accessibleName) return;
            const e = [];
            return (
              (this.isMultiSelect || this.isSingleSelect || this.isDelete) && e.push(this.modeLabelID),
              this.shouldRenderH1 && e.push(this.headerID),
              e.length ? e.join(" ") : void 0
            );
          }
          get ariaLabelTxt() {
            return (0, u.getEffectiveAriaLabelText)(this);
          }
          get ariaLabelModeText() {
            return this.isMultiSelect
              ? L.i18nBundle.getText(v.ARIA_LABEL_LIST_MULTISELECTABLE)
              : this.isSingleSelect
              ? L.i18nBundle.getText(v.ARIA_LABEL_LIST_SELECTABLE)
              : this.isDelete
              ? L.i18nBundle.getText(v.ARIA_LABEL_LIST_DELETABLE)
              : void 0;
          }
          get grows() {
            return this.growing !== f.default.None;
          }
          get growsOnScroll() {
            return this.growing === f.default.Scroll && !(0, r.isIE)();
          }
          get growsWithButton() {
            return (0, r.isIE)() ? this.grows : this.growing === f.default.Button;
          }
          get _growingButtonText() {
            return L.i18nBundle.getText(v.LOAD_MORE_TEXT);
          }
          get busyIndPosition() {
            return (0, r.isIE)() || !this.grows ? "absolute" : this._inViewport ? "absolute" : "sticky";
          }
          get styles() {
            return { busyInd: { position: this.busyIndPosition } };
          }
          initItemNavigation() {
            this._itemNavigation = new i.default(this, {
              skipItemsSize: w,
              navigationMode: a.default.Vertical,
              getItemsCallback: () => this.getEnabledItems(),
            });
          }
          prepareListItems() {
            const e = this.getSlottedNodes("items");
            e.forEach((t, s) => {
              const i = s === e.length - 1,
                r = this.separators === b.default.All || (this.separators === b.default.Inner && !i);
              (t._mode = this.mode), (t.hasBorder = r);
            }),
              (this._previouslySelectedItem = null);
          }
          async observeListEnd() {
            this.listEndObserved ||
              (await (0, o.renderFinished)(),
              this.getIntersectionObserver().observe(this.listEndDOM),
              (this.listEndObserved = !0));
          }
          unobserveListEnd() {
            this.growingIntersectionObserver &&
              (this.growingIntersectionObserver.disconnect(),
              (this.growingIntersectionObserver = null),
              (this.listEndObserved = !1));
          }
          onInteresection(e) {
            this.initialIntersection
              ? (this.initialIntersection = !1)
              : e.forEach((e) => {
                  e.isIntersecting && (0, c.default)(this.loadMore.bind(this), y);
                });
          }
          onSelectionRequested(e) {
            const t = this.getSelectedItems();
            let s = !1;
            (this._selectionRequested = !0),
              this[`handle${this.mode}`] && (s = this[`handle${this.mode}`](e.detail.item, e.detail.selected)),
              s &&
                this.fireEvent("selection-change", {
                  selectedItems: this.getSelectedItems(),
                  previouslySelectedItems: t,
                  selectionComponentPressed: e.detail.selectionComponentPressed,
                  key: e.detail.key,
                });
          }
          handleSingleSelect(e) {
            return !e.selected && (this.deselectSelectedItems(), (e.selected = !0), !0);
          }
          handleSingleSelectBegin(e) {
            return this.handleSingleSelect(e);
          }
          handleSingleSelectEnd(e) {
            return this.handleSingleSelect(e);
          }
          handleSingleSelectAuto(e) {
            return this.handleSingleSelect(e);
          }
          handleMultiSelect(e, t) {
            return (e.selected = t), !0;
          }
          handleDelete(e) {
            this.fireEvent("item-delete", { item: e });
          }
          deselectSelectedItems() {
            this.getSelectedItems().forEach((e) => {
              e.selected = !1;
            });
          }
          getSelectedItems() {
            return this.getSlottedNodes("items").filter((e) => e.selected);
          }
          getEnabledItems() {
            return this.getSlottedNodes("items").filter((e) => !e.disabled);
          }
          _onkeydown(e) {
            (0, l.isTabNext)(e) && this._handleTabNext(e);
          }
          _onLoadMoreKeydown(e) {
            (0, l.isSpace)(e) && (e.preventDefault(), (this._loadMoreActive = !0)),
              (0, l.isEnter)(e) && (this._onLoadMoreClick(), (this._loadMoreActive = !0)),
              (0, l.isTabNext)(e) && (this.setPreviouslyFocusedItem(e.target), this.focusAfterElement());
          }
          _onLoadMoreKeyup(e) {
            (0, l.isSpace)(e) && this._onLoadMoreClick(), (this._loadMoreActive = !1);
          }
          _onLoadMoreMousedown() {
            this._loadMoreActive = !0;
          }
          _onLoadMoreMouseup() {
            this._loadMoreActive = !1;
          }
          _onLoadMoreClick() {
            this.loadMore();
          }
          checkListInViewport() {
            this._inViewport = (0, m.default)(this.getDomRef());
          }
          loadMore() {
            this.fireEvent("load-more");
          }
          _handleTabNext(e) {
            let t;
            const s = this.getNormalizedTarget(e.target);
            this.headerToolbar && (t = this.getHeaderToolbarLastTabbableElement()),
              t &&
                t === s &&
                (this.getFirstItem((e) => e.selected && !e.disabled)
                  ? this.focusFirstSelectedItem()
                  : this.getPreviouslyFocusedItem()
                  ? this.focusPreviouslyFocusedItem()
                  : this.focusFirstItem(),
                e.stopImmediatePropagation(),
                e.preventDefault());
          }
          _onfocusin(e) {
            if (this.isForwardElement(this.getNormalizedTarget(e.target))) {
              if (!this.getPreviouslyFocusedItem())
                return (
                  this.getFirstItem((e) => e.selected && !e.disabled)
                    ? this.focusFirstSelectedItem()
                    : this.focusFirstItem(),
                  void e.stopImmediatePropagation()
                );
              this.getForwardingFocus() ||
                (this.getFirstItem((e) => e.selected && !e.disabled)
                  ? this.focusFirstSelectedItem()
                  : this.focusPreviouslyFocusedItem(),
                e.stopImmediatePropagation()),
                this.setForwardingFocus(!1);
            } else e.stopImmediatePropagation();
          }
          isForwardElement(e) {
            const t = e.id,
              s = this.getAfterElement(),
              i = this.getBeforeElement();
            return !!(this._id === t || (i && i.id === t)) || (s && s.id === t);
          }
          onItemFocused(e) {
            const t = e.target;
            this._itemNavigation.setCurrentItem(t),
              this.fireEvent("item-focused", { item: t }),
              this.mode === g.default.SingleSelectAuto &&
                this.onSelectionRequested({
                  detail: { item: t, selectionComponentPressed: !1, selected: !0, key: e.detail.key },
                });
          }
          onItemPress(e) {
            const t = e.detail.item;
            this._selectionRequested ||
              this.mode === g.default.Delete ||
              ((this._selectionRequested = !0),
              this.onSelectionRequested({
                detail: { item: t, selectionComponentPressed: !1, selected: !t.selected, key: e.detail.key },
              })),
              this.fireEvent("item-press", { item: t }),
              this.fireEvent("item-click", { item: t }),
              (this._selectionRequested = !1);
          }
          onItemClose(e) {
            this.fireEvent("item-close", { item: e.detail.item });
          }
          onItemToggle(e) {
            this.fireEvent("item-toggle", { item: e.detail.item });
          }
          onForwardBefore(e) {
            this.setPreviouslyFocusedItem(e.target), this.focusBeforeElement(), e.stopImmediatePropagation();
          }
          onForwardAfter(e) {
            this.setPreviouslyFocusedItem(e.target), this.growsWithButton || this.focusAfterElement();
          }
          focusBeforeElement() {
            this.setForwardingFocus(!0), this.getBeforeElement().focus();
          }
          focusAfterElement() {
            this.setForwardingFocus(!0), this.getAfterElement().focus();
          }
          focusFirstItem() {
            const e = this.getFirstItem((e) => !e.disabled);
            e && e.focus();
          }
          focusPreviouslyFocusedItem() {
            const e = this.getPreviouslyFocusedItem();
            e && e.focus();
          }
          focusFirstSelectedItem() {
            const e = this.getFirstItem((e) => e.selected && !e.disabled);
            e && e.focus();
          }
          focusItem(e) {
            this._itemNavigation.setCurrentItem(e), e.focus();
          }
          focusUploadCollectionItem(e) {
            setTimeout(() => {
              this.setPreviouslyFocusedItem(e.target), this.focusPreviouslyFocusedItem();
            }, 0);
          }
          setForwardingFocus(e) {
            this._forwardingFocus = e;
          }
          getForwardingFocus() {
            return this._forwardingFocus;
          }
          setPreviouslyFocusedItem(e) {
            this._previouslyFocusedItem = e;
          }
          getPreviouslyFocusedItem() {
            return this._previouslyFocusedItem;
          }
          getFirstItem(e) {
            const t = this.getSlottedNodes("items");
            let s = null;
            if (!e) return !!t.length && t[0];
            for (let i = 0; i < t.length; i++)
              if (e(t[i])) {
                s = t[i];
                break;
              }
            return s;
          }
          getAfterElement() {
            return (
              this._afterElement || (this._afterElement = this.shadowRoot.querySelector(`#${this._id}-after`)),
              this._afterElement
            );
          }
          getBeforeElement() {
            return (
              this._beforeElement || (this._beforeElement = this.shadowRoot.querySelector(`#${this._id}-before`)),
              this._beforeElement
            );
          }
          getHeaderToolbarLastTabbableElement() {
            return (0, n.getLastTabbableElement)(this.headerToolbar.getDomRef()) || this.headerToolbar.getDomRef();
          }
          getNormalizedTarget(e) {
            let t = e;
            return e.shadowRoot && e.shadowRoot.activeElement && (t = e.shadowRoot.activeElement), t;
          }
          getIntersectionObserver() {
            return (
              this.growingIntersectionObserver ||
                (this.growingIntersectionObserver = new IntersectionObserver(this.onInteresection.bind(this), {
                  root: null,
                  rootMargin: "0px",
                  threshold: 1,
                })),
              this.growingIntersectionObserver
            );
          }
        }
        L.define();
        var F = L;
        exports.default = F;
      },
      {
        "@ui5/webcomponents-base/dist/UI5Element.js": "Kogr",
        "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG",
        "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js": "C7rv",
        "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js": "K1cr",
        "@ui5/webcomponents-base/dist/Device.js": "Oq9i",
        "@ui5/webcomponents-base/dist/Render.js": "tP7g",
        "@ui5/webcomponents-base/dist/util/TabbableElements.js": "yMap",
        "@ui5/webcomponents-base/dist/Keys.js": "glQL",
        "@ui5/webcomponents-base/dist/types/Integer.js": "y11y",
        "@ui5/webcomponents-base/dist/types/NavigationMode.js": "bTeu",
        "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js": "OuVZ",
        "@ui5/webcomponents-base/dist/i18nBundle.js": "F4Ye",
        "@ui5/webcomponents-base/dist/util/debounce.js": "qvh0",
        "@ui5/webcomponents-base/dist/util/isElementInView.js": "ALFm",
        "./types/ListMode.js": "oa5u",
        "./types/ListGrowingMode.js": "wNZi",
        "./types/ListSeparators.js": "oiDk",
        "./BusyIndicator.js": "djiq",
        "./generated/templates/ListTemplate.lit.js": "BPiD",
        "./generated/themes/List.css.js": "keJ2",
        "./generated/i18n/i18n-defaults.js": "XB3p",
      },
    ],
    IvL0: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const t = "edit",
          s =
            "M503 94c12 12 12 29 0 40l-85 85-284 285c-6 6-12 8-20 8H28c-17 0-28-11-28-28v-85c0-9 3-15 9-20L293 94l85-85c12-11 29-11 40 0zM114 444l244-244-45-46L68 399zm284-284l46-46-46-45-45 45z",
          c = !1,
          o = "SAP-icons-v5",
          a = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(t, { pathData: s, ltr: !1, collection: o, packageName: a });
        var r = { pathData: s };
        exports.default = r;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    CPae: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const t = "edit",
          s =
            "M475 104q5 7 5 12 0 6-5 11L150 453q-4 4-8 4L32 480l22-110q0-5 4-9L384 36q4-4 11-4t11 4zm-121 99l-46-45L84 381l46 46zm87-88l-46-44-64 64 45 45z",
          o = !1,
          a = "SAP-icons",
          r = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(t, { pathData: s, ltr: !1, collection: a, packageName: r });
        var i = { pathData: s };
        exports.default = i;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    Vr9K: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/config/Theme.js"),
          t = s(require("./v5/edit.js")),
          r = s(require("./v4/edit.js"));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const u = (0, e.isTheme)("sap_horizon") ? r.default : t.default;
        var i = { pathData: u };
        exports.default = i;
      },
      { "@ui5/webcomponents-base/dist/config/Theme.js": "b5d6", "./v5/edit.js": "IvL0", "./v4/edit.js": "CPae" },
    ],
    SZvt: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = { Inactive: "Inactive", Active: "Active", Detail: "Detail" };
        class a extends e.default {
          static isValid(e) {
            return !!s[e];
          }
        }
        a.generateTypeAccessors(s);
        var i = a;
        exports.default = i;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    Kjuq: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          t = i(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          o = i(require("./sap_fiori_3/parameters-bundle.css.js"));
        function i(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => t.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => o.default);
        var r = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/ListItemBase.css",
          content:
            ':host(:not([hidden])){display:block}:host{height:var(--_ui5_list_item_base_height);background:var(--ui5-listitem-background-color);box-sizing:border-box;border-bottom:1px solid transparent}:host([selected]){background:var(--sapList_SelectionBackgroundColor)}:host([has-border]){border-bottom:var(--ui5-listitem-border-bottom)}:host([selected]){border-bottom:var(--ui5-listitem-selected-border-bottom)}:host([selected][has-border]){border-bottom:var(--ui5-listitem-selected-border-bottom)}.ui5-li-root{position:relative;display:flex;align-items:center;width:100%;height:100%;padding:0 1rem 0 1rem;box-sizing:border-box}:host([focused]) .ui5-li-root.ui5-li--focusable{outline:none}:host([focused]) .ui5-li-root.ui5-li--focusable:after{content:"";border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}:host([focused]) .ui5-li-content:focus:after{content:"";border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}:host([active][focused]) .ui5-li-root.ui5-li--focusable:after{border-color:var(--ui5-listitem-active-border-color)}:host([disabled]){opacity:var(--_ui5-listitembase_disabled_opacity);pointer-events:none}.ui5-li-content{max-width:100%;min-height:1px;font-family:"72override",var(--sapFontFamily);pointer-events:none}',
        };
        exports.default = r;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    jia1: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = a(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js")),
          t = a(require("@ui5/webcomponents-base/dist/UI5Element.js")),
          s = require("@ui5/webcomponents-base/dist/util/TabbableElements.js"),
          r = require("@ui5/webcomponents-base/dist/Keys.js"),
          o = a(require("./generated/themes/ListItemBase.css.js"));
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const i = {
          properties: {
            selected: { type: Boolean },
            hasBorder: { type: Boolean },
            _tabIndex: { type: String, defaultValue: "-1", noAttribute: !0 },
            disabled: { type: Boolean },
            focused: { type: Boolean },
          },
          events: { _focused: {}, "_forward-after": {}, "_forward-before": {} },
        };
        class d extends t.default {
          static get metadata() {
            return i;
          }
          static get render() {
            return e.default;
          }
          static get styles() {
            return o.default;
          }
          _onfocusin(e) {
            "button" !== e.isMarked && "link" !== e.isMarked && ((this.focused = !0), this.fireEvent("_focused", e));
          }
          _onfocusout(e) {
            this.focused = !1;
          }
          _onkeydown(e) {
            return (0, r.isTabNext)(e)
              ? this._handleTabNext(e)
              : (0, r.isTabPrevious)(e)
              ? this._handleTabPrevious(e)
              : void 0;
          }
          _onkeyup() {}
          _handleTabNext(e) {
            const t = e.target;
            this.shouldForwardTabAfter(t) && this.fireEvent("_forward-after", { item: t });
          }
          _handleTabPrevious(e) {
            const t = e.target;
            if (this.shouldForwardTabBefore(t)) {
              const s = e;
              (s.item = t), this.fireEvent("_forward-before", s);
            }
          }
          shouldForwardTabAfter(e) {
            const t = (0, s.getTabbableElements)(this.getDomRef());
            return e.getFocusDomRef && (e = e.getFocusDomRef()), !t.length || t[t.length - 1] === e;
          }
          shouldForwardTabBefore(e) {
            return this.getDomRef() === e;
          }
          get classes() {
            return { main: { "ui5-li-root": !0, "ui5-li--focusable": !this.disabled } };
          }
          get ariaDisabled() {
            return this.disabled ? "true" : void 0;
          }
          get tabIndex() {
            return this.disabled ? -1 : this.selected ? 0 : this._tabIndex;
          }
        }
        var n = d;
        exports.default = n;
      },
      {
        "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG",
        "@ui5/webcomponents-base/dist/UI5Element.js": "Kogr",
        "@ui5/webcomponents-base/dist/util/TabbableElements.js": "yMap",
        "@ui5/webcomponents-base/dist/Keys.js": "glQL",
        "./generated/themes/ListItemBase.css.js": "Kjuq",
      },
    ],
    wIUN: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const t = "accept",
          s =
            "M468.5 106c6 7 9 16 9 24v3c0 9-4 18-11 25l-244 243c-7 7-15 10-24 10-10 0-20-4-28-12l-125-129c-7-7-10-15-10-24 0-10 4-20 12-28 7-6 16-9 24-10 10 0 20 4 28 12l100 103 217-219c7-7 15-10 24-10 10 0 20 4 28 12z",
          c = !0,
          a = "SAP-icons-v5",
          o = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(t, { pathData: s, ltr: !0, collection: a, packageName: o });
        var r = { pathData: s };
        exports.default = r;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    XHGV: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const t = "accept",
          s =
            "M455.8 94q9 9 3 19l-222 326q-4 8-12 9t-14-5l-151-167q-5-5-4.5-11t5.5-11l25-25q12-12 23 0l96 96q5 5 13 4.5t12-8.5l175-249q4-7 11.5-8t13.5 4z",
          a = !0,
          o = "SAP-icons",
          r = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(t, { pathData: s, ltr: !0, collection: o, packageName: r });
        var c = { pathData: s };
        exports.default = c;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "tYyB" },
    ],
    vs52: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/config/Theme.js"),
          t = s(require("./v5/accept.js")),
          r = s(require("./v4/accept.js"));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const a = (0, e.isTheme)("sap_horizon") ? r.default : t.default;
        var u = { pathData: a };
        exports.default = u;
      },
      { "@ui5/webcomponents-base/dist/config/Theme.js": "b5d6", "./v5/accept.js": "wIUN", "./v4/accept.js": "XHGV" },
    ],
    lKOX: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const i = (i, n, c) =>
            e.html`<div class="ui5-checkbox-root ${(0, e.classMap)(i.classes.main)}" role="checkbox" aria-checked="${(0,
            e.ifDefined)(i.ariaChecked)}" aria-readonly="${(0, e.ifDefined)(i.ariaReadonly)}" aria-disabled="${(0,
            e.ifDefined)(i.ariaDisabled)}" aria-labelledby="${(0, e.ifDefined)(
              i.ariaLabelledBy
            )}" aria-describedby="${(0, e.ifDefined)(i.ariaDescribedBy)}" tabindex="${(0, e.ifDefined)(
              i.tabIndex
            )}" @mousedown="${i._onmousedown}" @mouseup="${i._onmouseup}" @keydown="${i._onkeydown}" @keyup="${
              i._onkeyup
            }" @click="${i._onclick}" @focusout="${i._onfocusout}" dir="${(0, e.ifDefined)(
              i.effectiveDir
            )}"><div id="${(0, e.ifDefined)(i._id)}-CbBg" class="ui5-checkbox-inner">${
              i.isCompletelyChecked ? a(i, n, c) : void 0
            }<input id="${(0, e.ifDefined)(i._id)}-CB" type='checkbox' ?checked="${i.checked}" ?readonly="${
              i.readonly
            }" ?disabled="${i.disabled}" tabindex="-1" aria-hidden="true" data-sap-no-tab-ref /></div>${
              i.text ? d(i, n, c) : void 0
            }${i.hasValueState ? o(i, n, c) : void 0}<slot name="formSupport"></slot></div>`,
          a = (i, a, d) =>
            e.html`<${(0, e.scopeTag)(
              "ui5-icon",
              a,
              d
            )} aria-hidden="true" name="accept" class="ui5-checkbox-icon"></${(0, e.scopeTag)("ui5-icon", a, d)}>`,
          d = (i, a, d) =>
            e.html`<${(0, e.scopeTag)("ui5-label", a, d)} id="${(0, e.ifDefined)(
              i._id
            )}-label" class="ui5-checkbox-label" wrapping-type="${(0, e.ifDefined)(i.wrappingType)}">${(0, e.ifDefined)(
              i.text
            )}</${(0, e.scopeTag)("ui5-label", a, d)}>`,
          o = (i, a, d) =>
            e.html`<span id="${(0, e.ifDefined)(i._id)}-descr" class="ui5-hidden-text">${(0, e.ifDefined)(
              i.valueStateText
            )}</span>`;
        var n = i;
        exports.default = n;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    CtFK: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          o = i(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          r = i(require("./sap_fiori_3/parameters-bundle.css.js"));
        function i(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => o.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => r.default);
        var c = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/CheckBox.css",
          content:
            '.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host{-webkit-tap-highlight-color:rgba(0,0,0,0)}:host(:not([hidden])){display:inline-block}:host{overflow:hidden;max-width:100%;outline:none;border-radius:var(--_ui5_checkbox_border_radius);transition:var(--_ui5_checkbox_transition);cursor:pointer}:host([disabled]) .ui5-checkbox-root{opacity:.5}:host([disabled]) .ui5-checkbox-inner{border-color:var(--_ui5_checkbox_inner_disabled_border_color)}:host([disabled]) .ui5-checkbox-label{color:var(--_ui5_checkbox_disabled_label_color)}:host([readonly]:not([value-state=Warning]):not([value-state=Error])) .ui5-checkbox-inner{background:var(--sapField_ReadOnly_Background);border:var(--_ui5_checkbox_inner_readonly_border);color:var(--sapContent_NonInteractiveIconColor)}:host([wrapping-type=Normal][text]) .ui5-checkbox-root{min-height:auto;box-sizing:border-box;align-items:flex-start;padding-top:var(--_ui5_checkbox_root_side_padding);padding-bottom:var(--_ui5_checkbox_root_side_padding)}:host([wrapping-type=Normal][text]) .ui5-checkbox-root .ui5-checkbox-inner,:host([wrapping-type=Normal][text]) .ui5-checkbox-root .ui5-checkbox-label{margin-top:var(--_ui5_checkbox_wrapped_content_margin_top)}:host([wrapping-type=Normal][text]) .ui5-checkbox-root .ui5-checkbox-label{word-break:break-all;align-self:center}:host([wrapping-type=Normal]) .ui5-checkbox-root:focus:before{bottom:var(--_ui5_checkbox_wrapped_focus_left_top_bottom_position)}:host([value-state=Error]) .ui5-checkbox--hoverable .ui5-checkbox-inner:hover,:host([value-state=Error]) .ui5-checkbox-inner{background:var(--sapField_InvalidBackground);border:var(--_ui5_checkbox_inner_error_border);color:var(--sapField_InvalidColor)}:host([value-state=Error]) .ui5-checkbox--hoverable .ui5-checkbox-inner:hover{box-shadow:var(--_ui5_checkbox_inner_error_box_shadow);background:var(--_ui5_checkbox_inner_error_background_hover)}:host([value-state=Warning]) .ui5-checkbox--hoverable .ui5-checkbox-inner:hover,:host([value-state=Warning]) .ui5-checkbox-inner{background:var(--sapField_WarningBackground);border:var(--_ui5_checkbox_inner_warning_border);color:var(--sapField_WarningColor)}:host([value-state=Warning]) .ui5-checkbox--hoverable .ui5-checkbox-inner:hover{box-shadow:var(--_ui5_checkbox_inner_warning_box_shadow);background:var(--_ui5_checkbox_inner_warning_background_hover)}:host([value-state=Information]) .ui5-checkbox--hoverable .ui5-checkbox-inner:hover,:host([value-state=Information]) .ui5-checkbox-inner{background:var(--sapField_InformationBackground);border:var(--_ui5_checkbox_inner_information_border)}:host([value-state=Information]) .ui5-checkbox--hoverable .ui5-checkbox-inner:hover{box-shadow:var(--_ui5_checkbox_inner_information_box_shadow);background:var(--_ui5_checkbox_inner_information_background_hover)}:host([value-state=Success]) .ui5-checkbox--hoverable .ui5-checkbox-inner:hover,:host([value-state=Success]) .ui5-checkbox-inner{background:var(--sapField_SuccessBackground);border:var(--_ui5_checkbox_inner_success_border);color:var(--sapField_SuccessColor)}:host([value-state=Success]) .ui5-checkbox--hoverable .ui5-checkbox-inner:hover{box-shadow:var(--_ui5_checkbox_inner_success_box_shadow);background:var(--_ui5_checkbox_inner_success_background_hover)}:host(:not([value-state])) .ui5-checkbox--hoverable .ui5-checkbox-inner:hover,:host([value-state=None]) .ui5-checkbox--hoverable .ui5-checkbox-inner:hover{box-shadow:var(--_ui5_checkbox_inner_default_box_shadow)}:host([value-state=Warning]) .ui5-checkbox-icon,:host([value-state=Warning][indeterminate]) .ui5-checkbox-inner:after{color:var(--_ui5_checkbox_checkmark_warning_color)}:host([text]) .ui5-checkbox-root{padding-right:0}:host([text]) .ui5-checkbox-root:focus:before{right:0}.ui5-checkbox-root{position:relative;display:inline-flex;align-items:center;width:100%;min-height:var(--_ui5_checkbox_width_height);min-width:var(--_ui5_checkbox_width_height);padding:0 var(--_ui5_checkbox_wrapper_padding);outline:none;transition:var(--_ui5_checkbox_transition);border:var(--_ui5_checkbox_default_focus_border);border-radius:var(--_ui5_checkbox_border_radius);box-sizing:border-box}.ui5-checkbox-root:after{content:"";min-height:inherit;font-size:0}.ui5-checkbox-root:focus:before{display:var(--_ui5_checkbox_focus_outline_display);content:"";position:absolute;top:var(--_ui5_checkbox_focus_position);left:var(--_ui5_checkbox_focus_position);right:var(--_ui5_checkbox_focus_position);bottom:var(--_ui5_checkbox_focus_position);border:var(--_ui5_checkbox_focus_outline);border-radius:var(--_ui5_checkbox_focus_border_radius)}:host .ui5-checkbox-root:focus{border:var(--_ui5_checkbox_focus_border);border-radius:.5rem}:host(:hover:not([disabled])){background:var(--_ui5_checkbox_outer_hover_background);box-shadow:var(--_ui5_checkbox_box_shadow)}.ui5-checkbox--hoverable .ui5-checkbox-label:hover{color:var(--_ui5_checkbox_label_color)}:host(:not([active]):not([checked]):not([value-state])) .ui5-checkbox--hoverable .ui5-checkbox-inner:hover,:host(:not([active]):not([checked])[value-state=None]) .ui5-checkbox--hoverable .ui5-checkbox-inner:hover{background:var(--_ui5_checkbox_hover_background);border-color:var(--_ui5_checkbox_inner_hover_border_color)}:host(:not([active])[checked]:not([value-state])) .ui5-checkbox--hoverable .ui5-checkbox-inner:hover,:host(:not([active])[checked][value-state=None]) .ui5-checkbox--hoverable .ui5-checkbox-inner:hover{background:var(--_ui5_checkbox_hover_background);border-color:var(--_ui5_checkbox_inner_hover_checked_border_color)}:host([checked]:not([value-state])) .ui5-checkbox-inner,:host([checked][value-state=None]) .ui5-checkbox-inner{border-color:var(--_ui5_checkbox_inner_selected_border_color)}:host([active]:not([checked]):not([value-state]):not([disabled])) .ui5-checkbox-inner,:host([active]:not([checked])[value-state=None]:not([disabled])) .ui5-checkbox-inner{border-color:var(--_ui5_checkbox_inner_active_border_color);background-color:var(--_ui5_checkbox_active_background)}:host([active][checked]:not([value-state]):not([disabled])) .ui5-checkbox-inner,:host([active][checked][value-state=None]:not([disabled])) .ui5-checkbox-inner{border-color:var(--_ui5_checkbox_inner_selected_border_color)}.ui5-checkbox-inner{display:flex;justify-content:center;align-items:center;min-width:var(--_ui5_checkbox_inner_width_height);max-width:var(--_ui5_checkbox_inner_width_height);height:var(--_ui5_checkbox_inner_width_height);max-height:var(--_ui5_checkbox_inner_width_height);border:var(--_ui5_checkbox_inner_border);border-radius:var(--_ui5_checkbox_inner_border_radius);background:var(--_ui5_checkbox_inner_background);color:var(--_ui5_checkbox_checkmark_color);box-sizing:border-box;position:relative;cursor:default}:host([indeterminate][checked]) .ui5-checkbox-inner:after{content:"";background-color:currentColor;width:var(--_ui5_checkbox_partially_icon_size);height:var(--_ui5_checkbox_partially_icon_size)}.ui5-checkbox-inner input{-webkit-appearance:none;visibility:hidden;width:0;left:0;position:absolute;font-size:inherit}.ui5-checkbox-root .ui5-checkbox-label{margin-left:var(--_ui5_checkbox_label_offset_left);margin-right:var(--_ui5_checkbox_label_offset_right);cursor:default;text-overflow:ellipsis;overflow:hidden;pointer-events:none;user-select:none;-ms-user-select:none;-webkit-user-select:none;color:var(--_ui5_checkbox_label_color)}.ui5-checkbox-icon{width:var(--_ui5_checkbox_icon_size);height:var(--_ui5_checkbox_icon_size);color:currentColor;cursor:default;position:absolute}:host([text]) [dir=rtl].ui5-checkbox-root{padding-left:0;padding-right:var(--_ui5_checkbox_wrapper_padding)}:host([text]) [dir=rtl].ui5-checkbox-root:focus:before{left:0;right:var(--_ui5_checkbox_focus_position)}:host([text]) [dir=rtl].ui5-checkbox-root .ui5-checkbox-label{margin-left:0;margin-right:var(--_ui5_checkbox_compact_wrapper_padding)}',
        };
        exports.default = c;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    UhCo: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/Device.js"),
          t = p(require("@ui5/webcomponents-base/dist/UI5Element.js")),
          i = p(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js")),
          s = require("@ui5/webcomponents-base/dist/i18nBundle.js"),
          a = p(require("@ui5/webcomponents-base/dist/types/ValueState.js")),
          n = require("@ui5/webcomponents-base/dist/FeaturesRegistry.js"),
          r = require("@ui5/webcomponents-base/dist/Keys.js");
        require("@ui5/webcomponents-icons/dist/accept.js");
        var u = p(require("./Icon.js")),
          o = p(require("./Label.js")),
          d = p(require("./types/WrappingType.js")),
          l = require("./generated/i18n/i18n-defaults.js"),
          c = p(require("./generated/templates/CheckBoxTemplate.lit.js")),
          h = p(require("./generated/themes/CheckBox.css.js"));
        function p(e) {
          return e && e.__esModule ? e : { default: e };
        }
        let g = !1,
          b = null;
        const m = {
          tag: "ui5-checkbox",
          languageAware: !0,
          properties: {
            disabled: { type: Boolean },
            readonly: { type: Boolean },
            indeterminate: { type: Boolean },
            checked: { type: Boolean },
            text: { type: String },
            valueState: { type: a.default, defaultValue: a.default.None },
            wrappingType: { type: d.default, defaultValue: d.default.None },
            name: { type: String },
            active: { type: Boolean },
          },
          events: { change: {} },
          slots: { formSupport: { type: HTMLElement } },
        };
        class v extends t.default {
          static get metadata() {
            return m;
          }
          static get render() {
            return i.default;
          }
          static get template() {
            return c.default;
          }
          static get styles() {
            return h.default;
          }
          constructor() {
            super(),
              (this._deactivate = () => {
                b && (b.active = !1);
              }),
              g || (document.addEventListener("mouseup", this._deactivate), (g = !0));
          }
          onBeforeRendering() {
            this._enableFormSupport();
          }
          _enableFormSupport() {
            const e = (0, n.getFeature)("FormSupport");
            e
              ? e.syncNativeHiddenInput(this, (e, t) => {
                  (t.disabled = e.disabled || !e.checked), (t.value = e.checked ? "on" : "");
                })
              : this.name &&
                console.warn(
                  'In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";'
                );
          }
          _onclick() {
            this.toggle();
          }
          _onmousedown() {
            this.readonly || this.disabled || ((this.active = !0), (b = this));
          }
          _onmouseup() {
            this.active = !1;
          }
          _onfocusout() {
            this.active = !1;
          }
          _onkeydown(e) {
            (0, r.isSpace)(e) && (e.preventDefault(), (this.active = !0)),
              (0, r.isEnter)(e) && (this.toggle(), (this.active = !0));
          }
          _onkeyup(e) {
            (0, r.isSpace)(e) && this.toggle(), (this.active = !1);
          }
          toggle() {
            return (
              this.canToggle() &&
                (this.indeterminate ? ((this.indeterminate = !1), (this.checked = !0)) : (this.checked = !this.checked),
                this.fireEvent("change"),
                this.fireEvent("value-changed")),
              this
            );
          }
          canToggle() {
            return !(this.disabled || this.readonly);
          }
          valueStateTextMappings() {
            return {
              Error: v.i18nBundle.getText(l.VALUE_STATE_ERROR),
              Warning: v.i18nBundle.getText(l.VALUE_STATE_WARNING),
              Success: v.i18nBundle.getText(l.VALUE_STATE_SUCCESS),
            };
          }
          get classes() {
            return { main: { "ui5-checkbox--hoverable": !this.disabled && !this.readonly && (0, e.isDesktop)() } };
          }
          get ariaReadonly() {
            return this.readonly ? "true" : void 0;
          }
          get ariaDisabled() {
            return this.disabled ? "true" : void 0;
          }
          get ariaChecked() {
            return this.indeterminate && this.checked ? "mixed" : this.checked;
          }
          get ariaLabelledBy() {
            return this.text ? `${this._id}-label` : void 0;
          }
          get ariaDescribedBy() {
            return this.hasValueState ? `${this._id}-descr` : void 0;
          }
          get hasValueState() {
            return this.valueState !== a.default.None;
          }
          get valueStateText() {
            return this.valueStateTextMappings()[this.valueState];
          }
          get tabIndex() {
            const e = this.getAttribute("tabindex");
            return this.disabled ? void 0 : e || "0";
          }
          get isCompletelyChecked() {
            return this.checked && !this.indeterminate;
          }
          static get dependencies() {
            return [o.default, u.default];
          }
          static async onDefine() {
            v.i18nBundle = await (0, s.getI18nBundle)("@ui5/webcomponents");
          }
        }
        v.define();
        var y = v;
        exports.default = y;
      },
      {
        "@ui5/webcomponents-base/dist/Device.js": "Oq9i",
        "@ui5/webcomponents-base/dist/UI5Element.js": "Kogr",
        "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG",
        "@ui5/webcomponents-base/dist/i18nBundle.js": "F4Ye",
        "@ui5/webcomponents-base/dist/types/ValueState.js": "rs1i",
        "@ui5/webcomponents-base/dist/FeaturesRegistry.js": "rnHX",
        "@ui5/webcomponents-base/dist/Keys.js": "glQL",
        "@ui5/webcomponents-icons/dist/accept.js": "vs52",
        "./Icon.js": "RJcw",
        "./Label.js": "CXe7",
        "./types/WrappingType.js": "kicx",
        "./generated/i18n/i18n-defaults.js": "XB3p",
        "./generated/templates/CheckBoxTemplate.lit.js": "lKOX",
        "./generated/themes/CheckBox.css.js": "CtFK",
      },
    ],
    QqrO: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var i = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          t = o(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          e = o(require("./sap_fiori_3/parameters-bundle.css.js"));
        function o(i) {
          return i && i.__esModule ? i : { default: i };
        }
        (0, i.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => t.default),
          (0, i.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => e.default);
        var l = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/ListItem.css",
          content:
            ".ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host([actionable]:not([disabled])){cursor:pointer}:host([selected][actionable]:not([active]):hover){background:var(--sapList_Hover_SelectionBackground)}:host([active][actionable]),:host([selected][active][actionable]){background:var(--sapList_Active_Background)}:host([actionable]:not([active]):not([selected]):hover){background:var(--sapList_Hover_Background)}:host([active][actionable]) .ui5-li-root.ui5-li--focusable .ui5-li-content:focus,:host([active][actionable]) .ui5-li-root.ui5-li--focusable:focus{outline-color:var(--sapContent_ContrastFocusColor)}:host([active][actionable]) .ui5-li-root .ui5-li-icon{color:var(--sapList_Active_TextColor)}:host([active][actionable]) .ui5-li-additional-text,:host([active][actionable]) .ui5-li-desc,:host([active][actionable]) .ui5-li-title{color:var(--sapList_Active_TextColor)}:host([additional-text-state=Warning]) .ui5-li-additional-text{color:var(--sapCriticalTextColor)}:host([additional-text-state=Success]) .ui5-li-additional-text{color:var(--sapPositiveTextColor)}:host([additional-text-state=Error]) .ui5-li-additional-text{color:var(--sapNegativeTextColor)}:host([additional-text-state=Information]) .ui5-li-additional-text{color:var(--sapInformativeTextColor)}:host([has-title][description]){height:5rem}:host([has-title][image]){height:5rem}:host([image]) .ui5-li-content{height:3rem}:host([description]) .ui5-li-root{padding:1rem}:host([description]) .ui5-li-content{height:3rem}:host([has-title][description]) .ui5-li-title{padding-bottom:.375rem}.ui5-li-text-wrapper{display:flex;flex-direction:column;flex:auto;min-width:1px;line-height:normal}:host([description]) .ui5-li-text-wrapper{height:100%;justify-content:space-between;padding:.125rem 0}.ui5-li-description-info-wrapper{display:flex;justify-content:space-between}.ui5-li-title{color:var(--sapTextColor);font-size:var(--_ui5_list_item_title_size)}.ui5-li-additional-text,.ui5-li-desc,.ui5-li-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ui5-li-desc{color:var(--sapContent_LabelColor);font-size:var(--sapFontSize)}.ui5-li-additional-text{margin:0 .25rem;color:var(--sapNeutralTextColor);font-size:.875rem;min-width:3.75rem;text-align:right;max-width:40%}:host([description]) .ui5-li-additional-text{align-self:flex-end}.ui5-li-img{width:var(--_ui5_list_item_img_size);min-width:var(--_ui5_list_item_img_size);height:var(--_ui5_list_item_img_size);min-height:var(--_ui5_list_item_img_size);margin:var(--_ui5_list_item_img_margin);border-radius:.25rem}.ui5-li-img-inner{object-fit:contain}.ui5-li-icon{min-width:var(--_ui5_list_item_icon_size);min-height:var(--_ui5_list_item_icon_size);color:var(--sapContent_NonInteractiveIconColor);padding-right:.5rem}.ui5-li-content{display:flex;align-items:center;flex:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none}.ui5-li-deletebtn,.ui5-li-detailbtn{display:flex;align-items:center}.ui5-li-multisel-cb,.ui5-li-singlesel-radiobtn{flex-shrink:0}:host([description]) .ui5-li-singlesel-radiobtn{align-self:flex-start;margin-top:var(--_ui5_list_item_selection_btn_margin_top)}:host([description]) .ui5-li-multisel-cb{align-self:flex-start;margin-top:var(--_ui5_list_item_selection_btn_margin_top)}:host([_mode=SingleSelectBegin]) .ui5-li-root{padding-right:1rem;padding-left:0}:host([_mode=MultiSelect]) .ui5-li-root{padding-right:1rem;padding-left:0}:host([_mode=SingleSelectEnd]) .ui5-li-root{padding-right:0;padding-left:1rem}:host [ui5-checkbox].ui5-li-singlesel-radiobtn{margin-right:var(--_ui5_list_item_cb_margin_right)}:host [dir=rtl] .ui5-li-icon{padding-left:.5rem;padding-right:0}:host [dir=rtl] .ui5-li-img{margin:.5rem 0 .5rem .75rem}[dir=rtl] .ui5-li-additional-text{text-align:left}:host([_mode=SingleSelectBegin]) [dir=rtl].ui5-li-root{padding-right:0;padding-left:1rem}:host([_mode=MultiSelect]) [dir=rtl].ui5-li-root{padding-right:0;padding-left:1rem}:host([_mode=SingleSelectEnd]) [dir=rtl].ui5-li-root{padding-right:1rem;padding-left:0}",
        };
        exports.default = l;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    fCpr: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/Keys.js");
        require("@ui5/webcomponents-icons/dist/decline.js"), require("@ui5/webcomponents-icons/dist/edit.js");
        var t = require("@ui5/webcomponents-base/dist/i18nBundle.js"),
          i = u(require("./types/ListItemType.js")),
          s = u(require("./types/ListMode.js")),
          n = u(require("./ListItemBase.js")),
          a = u(require("./RadioButton.js")),
          d = u(require("./CheckBox.js")),
          l = u(require("./Button.js")),
          r = require("./generated/i18n/i18n-defaults.js"),
          o = u(require("./generated/themes/ListItem.css.js"));
        function u(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const c = {
          languageAware: !0,
          properties: {
            type: { type: i.default, defaultValue: i.default.Active },
            active: { type: Boolean },
            title: { type: String },
            actionable: { type: Boolean },
            role: { type: String, defaultValue: "listitem" },
            _mode: { type: s.default, defaultValue: s.default.None },
          },
          events: { "detail-click": {}, _press: {}, _focused: {}, "_selection-requested": {} },
        };
        class h extends n.default {
          static get metadata() {
            return c;
          }
          static get styles() {
            return [n.default.styles, o.default];
          }
          static get dependencies() {
            return [l.default, a.default, d.default];
          }
          constructor() {
            super(),
              (this.deactivateByKey = (t) => {
                (0, e.isEnter)(t) && this.deactivate();
              }),
              (this.deactivate = () => {
                this.active && (this.active = !1);
              });
          }
          onBeforeRendering(...e) {
            this.actionable = this.type === i.default.Active && this._mode !== s.default.Delete;
          }
          onEnterDOM() {
            document.addEventListener("mouseup", this.deactivate),
              document.addEventListener("touchend", this.deactivate),
              document.addEventListener("keyup", this.deactivateByKey);
          }
          onExitDOM() {
            document.removeEventListener("mouseup", this.deactivate),
              document.removeEventListener("keyup", this.deactivateByKey),
              document.removeEventListener("touchend", this.deactivate);
          }
          _onkeydown(t) {
            super._onkeydown(t);
            const s = this.type === i.default.Active;
            (0, e.isSpace)(t) && t.preventDefault(),
              ((0, e.isSpace)(t) || (0, e.isEnter)(t)) && s && this.activate(),
              (0, e.isEnter)(t) && this.fireItemPress(t);
          }
          _onkeyup(t) {
            ((0, e.isSpace)(t) || (0, e.isEnter)(t)) && this.deactivate(),
              (0, e.isSpace)(t) && this.fireItemPress(t),
              this.modeDelete && (0, e.isDelete)(t) && this.onDelete();
          }
          _onmousedown(e) {
            "button" !== e.isMarked && this.activate();
          }
          _onmouseup(e) {
            "button" !== e.isMarked && this.deactivate();
          }
          _ontouchstart(e) {
            this._onmousedown(e);
          }
          _ontouchend(e) {
            this._onmouseup(e);
          }
          _onfocusout() {
            super._onfocusout(), this.deactivate();
          }
          _onclick(e) {
            "button" !== e.isMarked && this.fireItemPress(e);
          }
          onMultiSelectionComponentPress(e) {
            this.isInactive ||
              this.fireEvent("_selection-requested", {
                item: this,
                selected: e.target.checked,
                selectionComponentPressed: !0,
              });
          }
          onSingleSelectionComponentPress(e) {
            this.isInactive ||
              this.fireEvent("_selection-requested", {
                item: this,
                selected: !e.target.selected,
                selectionComponentPressed: !0,
              });
          }
          activate() {
            this.type === i.default.Active && (this.active = !0);
          }
          onDelete(e) {
            this.fireEvent("_selection-requested", { item: this, selectionComponentPressed: !1 });
          }
          onDetailClick(e) {
            this.fireEvent("detail-click", { item: this, selected: this.selected });
          }
          fireItemPress(e) {
            this.isInactive || this.fireEvent("_press", { item: this, selected: this.selected, key: e.key });
          }
          get isInactive() {
            return this.type === i.default.Inactive || this.type === i.default.Detail;
          }
          get placeSelectionElementBefore() {
            return this._mode === s.default.MultiSelect || this._mode === s.default.SingleSelectBegin;
          }
          get placeSelectionElementAfter() {
            return (
              !this.placeSelectionElementBefore &&
              (this._mode === s.default.SingleSelectEnd || this._mode === s.default.Delete)
            );
          }
          get modeSingleSelect() {
            return [s.default.SingleSelectBegin, s.default.SingleSelectEnd, s.default.SingleSelect].includes(
              this._mode
            );
          }
          get modeMultiSelect() {
            return this._mode === s.default.MultiSelect;
          }
          get modeDelete() {
            return this._mode === s.default.Delete;
          }
          get renderDeleteButton() {
            return this.modeDelete;
          }
          get disableDeleteButton() {
            return !1;
          }
          get typeDetail() {
            return this.type === i.default.Detail;
          }
          get typeActive() {
            return this.type === i.default.Active;
          }
          get ariaSelected() {
            if (this.modeMultiSelect || this.modeSingleSelect) return this.selected;
          }
          get ariaSelectedText() {
            let e;
            return (
              void 0 !== this.ariaSelected &&
                (e = this.ariaSelected
                  ? h.i18nBundle.getText(r.LIST_ITEM_SELECTED)
                  : h.i18nBundle.getText(r.LIST_ITEM_NOT_SELECTED)),
              e
            );
          }
          get deleteText() {
            return h.i18nBundle.getText(r.DELETE);
          }
          get _accInfo() {
            return {
              role: this.role,
              ariaExpanded: void 0,
              ariaLevel: void 0,
              ariaLabel: h.i18nBundle.getText(r.ARIA_LABEL_LIST_ITEM_CHECKBOX),
              ariaLabelRadioButton: h.i18nBundle.getText(r.ARIA_LABEL_LIST_ITEM_RADIO_BUTTON),
              ariaSelectedText: this.ariaSelectedText,
            };
          }
          static async onDefine() {
            h.i18nBundle = await (0, t.getI18nBundle)("@ui5/webcomponents");
          }
        }
        var m = h;
        exports.default = m;
      },
      {
        "@ui5/webcomponents-base/dist/Keys.js": "glQL",
        "@ui5/webcomponents-icons/dist/decline.js": "vj7t",
        "@ui5/webcomponents-icons/dist/edit.js": "Vr9K",
        "@ui5/webcomponents-base/dist/i18nBundle.js": "F4Ye",
        "./types/ListItemType.js": "SZvt",
        "./types/ListMode.js": "oa5u",
        "./ListItemBase.js": "jia1",
        "./RadioButton.js": "LdU0",
        "./CheckBox.js": "UhCo",
        "./Button.js": "PQe6",
        "./generated/i18n/i18n-defaults.js": "XB3p",
        "./generated/themes/ListItem.css.js": "QqrO",
      },
    ],
    taYD: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const i = (i, s, n) =>
            e.html`<div class="ui5-avatar-root" tabindex="${(0, e.ifDefined)(i.tabindex)}" data-sap-focus-ref @keyup=${
              i._onkeyup
            } @keydown=${i._onkeydown} @focusout=${i._onfocusout} @focusin=${i._onfocusin} @click=${
              i._onclick
            } role="${(0, e.ifDefined)(i._role)}" aria-haspopup="${(0, e.ifDefined)(i._ariaHasPopup)}">${
              i.hasImage ? a(i, s, n) : o(i, s, n)
            }</div>`,
          a = (i, a, o) => e.html`<slot></slot>`,
          o = (i, a, o) => e.html`${i.icon ? s(i, a, o) : n(i, a, o)}`,
          s = (i, a, o) =>
            e.html`<${(0, e.scopeTag)("ui5-icon", a, o)} class="ui5-avatar-icon" name="${(0, e.ifDefined)(
              i.icon
            )}" accessible-name="${(0, e.ifDefined)(i.accessibleNameText)}"></${(0, e.scopeTag)("ui5-icon", a, o)}>`,
          n = (i, a, o) => e.html`${i.initials ? t(i, a, o) : void 0}`,
          t = (i, a, o) => e.html`<span class="ui5-avatar-initials">${(0, e.ifDefined)(i.validInitials)}</span>`;
        var c = i;
        exports.default = c;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    nnjY: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          o = r(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          a = r(require("./sap_fiori_3/parameters-bundle.css.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => o.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => a.default);
        var t = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/Avatar.css",
          content:
            ":host(:not([hidden])){display:inline-block;box-sizing:border-box}:host(:not([hidden]).ui5_hovered){opacity:.7}:host([focused]){outline:var(--_ui5_avatar_outline);outline-offset:var(--_ui5_avatar_focus_offset)}:host([interactive]){cursor:pointer}:host{height:3rem;width:3rem;border-radius:50%;border:var(--ui5-avatar-initials-border);outline:none;color:var(--ui5-avatar-initials-color)}:host([shape=Square]),:host([shape=Square]) ::slotted(*){border-radius:.25rem}:host([shape=Square]) .ui5-avatar-root{border-radius:inherit}:host([shape=Square]) .ui5-avatar-img{border-radius:inherit}:host([_size=XS]),:host([size=XS]){height:2rem;width:2rem;min-height:2rem;min-width:2rem;font-size:var(--_ui5_avatar_fontsize_XS)}:host([_size=S]),:host([size=S]){min-height:3rem;min-width:3rem;font-size:var(--_ui5_avatar_fontsize_S)}:host([_size=M]),:host([size=M]){min-height:4rem;min-width:4rem;font-size:var(--_ui5_avatar_fontsize_M)}:host([_size=L]),:host([size=L]){min-height:5rem;min-width:5rem;font-size:var(--_ui5_avatar_fontsize_L)}:host([_size=XL]),:host([size=XL]){min-height:7rem;min-width:7rem;font-size:var(--_ui5_avatar_fontsize_XL)}:host .ui5-avatar-icon{height:1.5rem;width:1.5rem;color:inherit}:host([_size=XS]) .ui5-avatar-icon,:host([size=XS]) .ui5-avatar-icon{height:1rem;width:1rem}:host([_size=S]) .ui5-avatar-icon,:host([size=S]) .ui5-avatar-icon{height:1.5rem;width:1.5rem}:host([_size=M]) .ui5-avatar-icon,:host([size=M]) .ui5-avatar-icon{height:2rem;width:2rem}:host([_size=L]) .ui5-avatar-icon,:host([size=L]) .ui5-avatar-icon{height:2.5rem;width:2.5rem}:host([_size=XL]) .ui5-avatar-icon,:host([size=XL]) .ui5-avatar-icon{height:3rem;width:3rem}::slotted(*){border-radius:50%;width:100%;height:100%}:host(:not([_has-image])),:host(:not([color-scheme])),:host([_color-scheme=Accent6]),:host([color-scheme=Accent6]){background-color:var(--ui5-avatar-accent6);color:var(--ui5-avatar-accent6-color)}:host([_color-scheme=Accent1]),:host([color-scheme=Accent1]){background-color:var(--ui5-avatar-accent1);color:var(--ui5-avatar-accent1-color)}:host([_color-scheme=Accent2]),:host([color-scheme=Accent2]){background-color:var(--ui5-avatar-accent2);color:var(--ui5-avatar-accent2-color)}:host([_color-scheme=Accent3]),:host([color-scheme=Accent3]){background-color:var(--ui5-avatar-accent3);color:var(--ui5-avatar-accent3-color)}:host([_color-scheme=Accent4]),:host([color-scheme=Accent4]){background-color:var(--ui5-avatar-accent4);color:var(--ui5-avatar-accent4-color)}:host([_color-scheme=Accent5]),:host([color-scheme=Accent5]){background-color:var(--ui5-avatar-accent5);color:var(--ui5-avatar-accent5-color)}:host([_color-scheme=Accent7]),:host([color-scheme=Accent7]){background-color:var(--ui5-avatar-accent7);color:var(--ui5-avatar-accent7-color)}:host([_color-scheme=Accent8]),:host([color-scheme=Accent8]){background-color:var(--ui5-avatar-accent8);color:var(--ui5-avatar-accent8-color)}:host([_color-scheme=Accent9]),:host([color-scheme=Accent9]){background-color:var(--ui5-avatar-accent9);color:var(--ui5-avatar-accent9-color)}:host([_color-scheme=Accent10]),:host([color-scheme=Accent10]){background-color:var(--ui5-avatar-accent10);color:var(--ui5-avatar-accent10-color)}:host([_color-scheme=Placeholder]),:host([color-scheme=Placeholder]){background-color:var(--ui5-avatar-placeholder);color:var(--ui5-avatar-placeholder-color)}:host([_has-image]){background-color:transparent}:host([image-fit-type=Contain]) .ui5-avatar-img{background-size:contain}.ui5-avatar-root{display:flex;align-items:center;justify-content:center;outline:none}.ui5-avatar-img,.ui5-avatar-root{height:100%;width:100%;border-radius:50%}.ui5-avatar-img{background-repeat:no-repeat;background-position:50%;background-size:cover}.ui5-avatar-initials{color:inherit}::slotted(*){pointer-events:none}",
        };
        exports.default = t;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    jlzL: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = { XS: "XS", S: "S", M: "M", L: "L", XL: "XL" };
        class r extends e.default {
          static isValid(e) {
            return !!s[e];
          }
        }
        r.generateTypeAccessors(s);
        var a = r;
        exports.default = a;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    mP3c: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = { Circle: "Circle", Square: "Square" };
        class r extends e.default {
          static isValid(e) {
            return !!s[e];
          }
        }
        r.generateTypeAccessors(s);
        var a = r;
        exports.default = a;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    capv: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = c(require("@ui5/webcomponents-base/dist/types/DataType.js"));
        function c(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const t = {
          Accent1: "Accent1",
          Accent2: "Accent2",
          Accent3: "Accent3",
          Accent4: "Accent4",
          Accent5: "Accent5",
          Accent6: "Accent6",
          Accent7: "Accent7",
          Accent8: "Accent8",
          Accent9: "Accent9",
          Accent10: "Accent10",
          Placeholder: "Placeholder",
        };
        class n extends e.default {
          static isValid(e) {
            return !!t[e];
          }
        }
        n.generateTypeAccessors(t);
        var s = n;
        exports.default = s;
      },
      { "@ui5/webcomponents-base/dist/types/DataType.js": "bqvp" },
    ],
    G1Sw: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = d(require("@ui5/webcomponents-base/dist/UI5Element.js")),
          t = d(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js")),
          i = require("@ui5/webcomponents-base/dist/i18nBundle.js"),
          a = require("@ui5/webcomponents-base/dist/Keys.js"),
          s = d(require("./generated/templates/AvatarTemplate.lit.js")),
          r = require("./generated/i18n/i18n-defaults.js"),
          n = d(require("./generated/themes/Avatar.css.js")),
          u = d(require("./Icon.js")),
          l = d(require("./types/AvatarSize.js")),
          o = d(require("./types/AvatarShape.js")),
          c = d(require("./types/AvatarColorScheme.js"));
        function d(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const p = {
          tag: "ui5-avatar",
          languageAware: !0,
          managedSlots: !0,
          properties: {
            interactive: { type: Boolean },
            focused: { type: Boolean },
            icon: { type: String },
            initials: { type: String },
            shape: { type: o.default, defaultValue: o.default.Circle },
            size: { type: l.default, defaultValue: l.default.S },
            _size: { type: String, defaultValue: l.default.S },
            colorScheme: { type: c.default, defaultValue: c.default.Accent6 },
            _colorScheme: { type: String, defaultValue: c.default.Accent6 },
            accessibleName: { type: String },
            ariaHaspopup: { type: String },
            _tabIndex: { type: String, noAttribute: !0 },
            _hasImage: { type: Boolean },
          },
          slots: { default: { propertyName: "image", type: HTMLElement } },
          events: { click: {} },
        };
        class h extends e.default {
          static get metadata() {
            return p;
          }
          static get render() {
            return t.default;
          }
          static get styles() {
            return n.default;
          }
          static get template() {
            return s.default;
          }
          static get dependencies() {
            return [u.default];
          }
          static async onDefine() {
            h.i18nBundle = await (0, i.getI18nBundle)("@ui5/webcomponents");
          }
          get tabindex() {
            return this._tabIndex || (this.interactive ? "0" : "-1");
          }
          get _effectiveSize() {
            return this.getAttribute("size") || this._size;
          }
          get _effectiveBackgroundColor() {
            return this.getAttribute("_color-scheme") || this._colorScheme;
          }
          get _role() {
            return this.interactive ? "button" : void 0;
          }
          get _ariaHasPopup() {
            return this._getAriaHasPopup();
          }
          get validInitials() {
            return this.initials && /^[a-zA-Z]{1,2}$/.test(this.initials) ? this.initials : null;
          }
          get accessibleNameText() {
            return this.accessibleName ? this.accessibleName : h.i18nBundle.getText(r.AVATAR_TOOLTIP) || void 0;
          }
          get hasImage() {
            return (this._hasImage = !!this.image.length), this._hasImage;
          }
          onBeforeRendering() {
            this._onclick = this.interactive ? this._onClickHandler.bind(this) : void 0;
          }
          _onClickHandler(e) {
            e.stopPropagation(), this.fireEvent("click");
          }
          _onkeydown(e) {
            this.interactive && ((0, a.isEnter)(e) && this.fireEvent("click"), (0, a.isSpace)(e) && e.preventDefault());
          }
          _onkeyup(e) {
            this.interactive && !e.shiftKey && (0, a.isSpace)(e) && this.fireEvent("click");
          }
          _onfocusout() {
            this.focused = !1;
          }
          _onfocusin() {
            this.interactive && (this.focused = !0);
          }
          _getAriaHasPopup() {
            if (this.interactive && "" !== this.ariaHaspopup) return this.ariaHaspopup;
          }
        }
        h.define();
        var f = h;
        exports.default = f;
      },
      {
        "@ui5/webcomponents-base/dist/UI5Element.js": "Kogr",
        "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG",
        "@ui5/webcomponents-base/dist/i18nBundle.js": "F4Ye",
        "@ui5/webcomponents-base/dist/Keys.js": "glQL",
        "./generated/templates/AvatarTemplate.lit.js": "taYD",
        "./generated/i18n/i18n-defaults.js": "XB3p",
        "./generated/themes/Avatar.css.js": "nnjY",
        "./Icon.js": "RJcw",
        "./types/AvatarSize.js": "jlzL",
        "./types/AvatarShape.js": "mP3c",
        "./types/AvatarColorScheme.js": "capv",
      },
    ],
    nNmv: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const i = (i, n, a) =>
            e.html`<li part="native-li" tabindex="${(0, e.ifDefined)(i.tabIndex)}" class="${(0, e.classMap)(
              i.classes.main
            )}" dir="${(0, e.ifDefined)(i.effectiveDir)}" @focusin="${i._onfocusin}" @focusout="${
              i._onfocusout
            }" @keyup="${i._onkeyup}" @keydown="${i._onkeydown}" @mouseup="${i._onmouseup}" @mousedown="${
              i._onmousedown
            }" @touchstart="${i._ontouchstart}" @touchend="${i._ontouchend}" @click="${i._onclick}" role="${(0,
            e.ifDefined)(i._accInfo.role)}" aria-expanded="${(0, e.ifDefined)(i._accInfo.ariaExpanded)}" title="${(0,
            e.ifDefined)(i.title)}" aria-level="${(0, e.ifDefined)(i._accInfo.ariaLevel)}" aria-posinset="${(0,
            e.ifDefined)(i._accInfo.posinset)}" aria-setsize="${(0, e.ifDefined)(
              i._accInfo.setsize
            )}" aria-describedby="${(0, e.ifDefined)(i._id)}-invisibleText-describedby" aria-labelledby="${(0,
            e.ifDefined)(i._id)}-invisibleText ${(0, e.ifDefined)(i._id)}-content" aria-disabled="${(0, e.ifDefined)(
              i.ariaDisabled
            )}">${i.placeSelectionElementBefore ? t(i, n, a) : void 0}<div id="${(0, e.ifDefined)(
              i._id
            )}-content" class="ui5-li-content">${i.displayImage ? l(i, n, a) : void 0}${
              i.displayIconBegin ? o(i, n, a) : void 0
            }<div class="ui5-li-text-wrapper"><span part="title" class="ui5-li-title"><slot></slot></span>${
              i.description ? s(i, n, a) : void 0
            }${i.typeActive ? void 0 : $(i, n, a)}</div>${i.description ? void 0 : f(i, n, a)}</div>${
              i.displayIconEnd ? r(i, n, a) : void 0
            }${i.typeDetail ? p(i, n, a) : void 0}${i.placeSelectionElementAfter ? b(i, n, a) : void 0}<span id="${(0,
            e.ifDefined)(i._id)}-invisibleText" class="ui5-hidden-text">${(0, e.ifDefined)(
              i._accInfo.listItemAriaLabel
            )}${(0, e.ifDefined)(i.accessibleName)}</span><span id="${(0, e.ifDefined)(
              i._id
            )}-invisibleText-describedby" class="ui5-hidden-text">${(0, e.ifDefined)(
              i._accInfo.ariaSelectedText
            )}</span></li> `,
          t = (i, t, l) =>
            e.html`${i.modeSingleSelect ? n(i, t, l) : void 0}${i.modeMultiSelect ? a(i, t, l) : void 0}${
              i.renderDeleteButton ? d(i, t, l) : void 0
            }`,
          n = (i, t, n) =>
            e.html`<${(0, e.scopeTag)("ui5-radio-button", t, n)} ?disabled="${i.isInactive}" accessible-name="${(0,
            e.ifDefined)(i._accInfo.ariaLabelRadioButton)}" tabindex="-1" id="${(0, e.ifDefined)(
              i._id
            )}-singleSelectionElement" class="ui5-li-singlesel-radiobtn" ?checked="${i.selected}" @click="${
              i.onSingleSelectionComponentPress
            }"></${(0, e.scopeTag)("ui5-radio-button", t, n)}>`,
          a = (i, t, n) =>
            e.html`<${(0, e.scopeTag)("ui5-checkbox", t, n)} ?disabled="${i.isInactive}" tabindex="-1" id="${(0,
            e.ifDefined)(i._id)}-multiSelectionElement" class="ui5-li-multisel-cb" ?checked="${
              i.selected
            }" aria-label="${(0, e.ifDefined)(i._accInfo.ariaLabel)}" @click="${
              i.onMultiSelectionComponentPress
            }"></${(0, e.scopeTag)("ui5-checkbox", t, n)}>`,
          d = (i, t, n) =>
            e.html`<div class="ui5-li-deletebtn"><${(0, e.scopeTag)(
              "ui5-button",
              t,
              n
            )} tabindex="-1" data-sap-no-tab-ref id="${(0, e.ifDefined)(
              i._id
            )}-deleteSelectionElement" design="Transparent" icon="decline" ?disabled="${
              i.disableDeleteButton
            }" @click="${i.onDelete}" title="${(0, e.ifDefined)(i.deleteText)}"></${(0, e.scopeTag)(
              "ui5-button",
              t,
              n
            )}></div>`,
          l = (i, t, n) =>
            e.html`<${(0, e.scopeTag)("ui5-avatar", t, n)} shape="Square" class="ui5-li-img"><img src="${(0,
            e.ifDefined)(i.image)}" class="ui5-li-img-inner" /></${(0, e.scopeTag)("ui5-avatar", t, n)}>`,
          o = (i, t, n) =>
            e.html`<${(0, e.scopeTag)("ui5-icon", t, n)} part="icon" name="${(0, e.ifDefined)(
              i.icon
            )}" class="ui5-li-icon"></${(0, e.scopeTag)("ui5-icon", t, n)}>`,
          s = (i, t, n) =>
            e.html`<div class="ui5-li-description-info-wrapper"><span part="description" class="ui5-li-desc">${(0,
            e.ifDefined)(i.description)}</span>${i.additionalText ? c(i, t, n) : void 0}</div>`,
          c = (i, t, n) =>
            e.html`<span part="additional-text" class="ui5-li-additional-text">${(0, e.ifDefined)(
              i.additionalText
            )}</span>`,
          $ = (i, t, n) => e.html`<span class="ui5-hidden-text">${(0, e.ifDefined)(i.type)}</span>`,
          f = (i, t, n) => e.html`${i.additionalText ? u(i, t, n) : void 0}`,
          u = (i, t, n) =>
            e.html`<span part="additional-text" class="ui5-li-additional-text">${(0, e.ifDefined)(
              i.additionalText
            )}</span>`,
          r = (i, t, n) =>
            e.html`<${(0, e.scopeTag)("ui5-icon", t, n)} part="icon" name="${(0, e.ifDefined)(
              i.icon
            )}" class="ui5-li-icon"></${(0, e.scopeTag)("ui5-icon", t, n)}>`,
          p = (i, t, n) =>
            e.html`<div class="ui5-li-detailbtn"><${(0, e.scopeTag)(
              "ui5-button",
              t,
              n
            )} design="Transparent" icon="edit" @click="${i.onDetailClick}"></${(0, e.scopeTag)(
              "ui5-button",
              t,
              n
            )}></div>`,
          b = (i, t, n) =>
            e.html`${i.modeSingleSelect ? m(i, t, n) : void 0}${i.modeMultiSelect ? v(i, t, n) : void 0}${
              i.renderDeleteButton ? D(i, t, n) : void 0
            }`,
          m = (i, t, n) =>
            e.html`<${(0, e.scopeTag)("ui5-radio-button", t, n)} ?disabled="${i.isInactive}" accessible-name="${(0,
            e.ifDefined)(i._accInfo.ariaLabelRadioButton)}" tabindex="-1" id="${(0, e.ifDefined)(
              i._id
            )}-singleSelectionElement" class="ui5-li-singlesel-radiobtn" ?checked="${i.selected}" @click="${
              i.onSingleSelectionComponentPress
            }"></${(0, e.scopeTag)("ui5-radio-button", t, n)}>`,
          v = (i, t, n) =>
            e.html`<${(0, e.scopeTag)("ui5-checkbox", t, n)} ?disabled="${i.isInactive}" tabindex="-1" id="${(0,
            e.ifDefined)(i._id)}-multiSelectionElement" class="ui5-li-multisel-cb" ?checked="${
              i.selected
            }" aria-label="${(0, e.ifDefined)(i._accInfo.ariaLabel)}" @click="${
              i.onMultiSelectionComponentPress
            }"></${(0, e.scopeTag)("ui5-checkbox", t, n)}>`,
          D = (i, t, n) =>
            e.html`<div class="ui5-li-deletebtn"><${(0, e.scopeTag)(
              "ui5-button",
              t,
              n
            )} tabindex="-1" data-sap-no-tab-ref id="${(0, e.ifDefined)(
              i._id
            )}-deleteSelectionElement" design="Transparent" icon="decline" ?disabled="${
              i.disableDeleteButton
            }" @click="${i.onDelete}" title="${(0, e.ifDefined)(i.deleteText)}"></${(0, e.scopeTag)(
              "ui5-button",
              t,
              n
            )}></div>`;
        var g = i;
        exports.default = g;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    S25h: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = r(require("@ui5/webcomponents-base/dist/types/ValueState.js")),
          t = r(require("./ListItem.js")),
          i = r(require("./Icon.js")),
          n = r(require("./Avatar.js")),
          a = r(require("./generated/templates/StandardListItemTemplate.lit.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = {
          tag: "ui5-li",
          properties: {
            description: { type: String },
            icon: { type: String },
            iconEnd: { type: Boolean },
            image: { type: String },
            additionalText: { type: String },
            additionalTextState: { type: e.default, defaultValue: e.default.None },
            accessibleName: { type: String },
            hasTitle: { type: Boolean },
          },
          slots: { default: { type: Node } },
        };
        class d extends t.default {
          static get template() {
            return a.default;
          }
          static get metadata() {
            return s;
          }
          onBeforeRendering(...e) {
            super.onBeforeRendering(...e), (this.hasTitle = !!this.textContent);
          }
          get displayImage() {
            return !!this.image;
          }
          get displayIconBegin() {
            return this.icon && !this.iconEnd;
          }
          get displayIconEnd() {
            return this.icon && this.iconEnd;
          }
          static get dependencies() {
            return [...t.default.dependencies, i.default, n.default];
          }
        }
        d.define();
        var o = d;
        exports.default = o;
      },
      {
        "@ui5/webcomponents-base/dist/types/ValueState.js": "rs1i",
        "./ListItem.js": "fCpr",
        "./Icon.js": "RJcw",
        "./Avatar.js": "G1Sw",
        "./generated/templates/StandardListItemTemplate.lit.js": "nNmv",
      },
    ],
    yCwY: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const i = (i, o, t) =>
            e.html`<div class="ui5-select-root" dir="${(0, e.ifDefined)(i.effectiveDir)}" id="${(0, e.ifDefined)(
              i._id
            )}-select" @click="${i._onclick}">${
              i.selectedOptionIcon ? a(i, o, t) : void 0
            }<div class="ui5-select-label-root" data-sap-focus-ref tabindex="${(0, e.ifDefined)(
              i.tabIndex
            )}" role="combobox" aria-haspopup="listbox" aria-label="${(0, e.ifDefined)(
              i.ariaLabelText
            )}" aria-describedby="${(0, e.ifDefined)(i.valueStateTextId)}" aria-disabled="${(0, e.ifDefined)(
              i.isDisabled
            )}" aria-required="${(0, e.ifDefined)(i.required)}" aria-expanded="${(0, e.ifDefined)(
              i._isPickerOpen
            )}" @keydown="${i._onkeydown}" @keypress="${i._handleKeyboardNavigation}" @keyup="${
              i._onkeyup
            }" @focusin="${i._onfocusin}" @focusout="${i._onfocusout}">${(0, e.ifDefined)(i._text)}</div><${(0,
            e.scopeTag)("ui5-icon", o, t)} name="slim-arrow-down" input-icon ?pressed="${i._iconPressed}" dir="${(0,
            e.ifDefined)(i.effectiveDir)}"></${(0, e.scopeTag)("ui5-icon", o, t)}>${
              i.hasValueState ? d(i, o, t) : void 0
            }<slot name="formSupport"></slot></div>`,
          a = (i, a, d) =>
            e.html`<${(0, e.scopeTag)("ui5-icon", a, d)} aria-hidden="true" class="ui5-select-option-icon" name="${(0,
            e.ifDefined)(i.selectedOptionIcon)}" dir="${(0, e.ifDefined)(i.effectiveDir)}"></${(0, e.scopeTag)(
              "ui5-icon",
              a,
              d
            )}>`,
          d = (i, a, d) =>
            e.html`<span id="${(0, e.ifDefined)(i._id)}-valueStateDesc" class="ui5-hidden-text">${(0, e.ifDefined)(
              i.valueStateText
            )}</span>`;
        var o = i;
        exports.default = o;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    Z1FJ: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js");
        const s = (s, a, i) =>
            e.html`${s.options ? t(s, a, i) : void 0}${s.shouldOpenValueStateMessagePopover ? v(s, a, i) : void 0}`,
          t = (s, t, i) =>
            e.html`<${(0, e.scopeTag)(
              "ui5-responsive-popover",
              t,
              i
            )} hide-arrow _disable-initial-focus placement-type="Bottom" class="ui5-select-popover ${(0, e.classMap)(
              s.classes.popover
            )}" horizontal-align="Stretch" @ui5-after-open="${(0, e.ifDefined)(s._afterOpen)}" @ui5-before-open="${(0,
            e.ifDefined)(s._beforeOpen)}" @ui5-after-close="${(0, e.ifDefined)(s._afterClose)}" @keydown="${
              s._onkeydown
            }">${s._isPhone ? a(s, t, i) : void 0}${s._isPhone ? void 0 : n(s, t, i)}<${(0, e.scopeTag)(
              "ui5-list",
              t,
              i
            )} mode="SingleSelectAuto" separators="None" @mousedown="${s._itemMousedown}" @ui5-item-press="${(0,
            e.ifDefined)(s._handleItemPress)}">${(0, e.repeat)(
              s._syncedOptions,
              (e, s) => e._id || s,
              (e, a) => $(e, a, s, t, i)
            )}</${(0, e.scopeTag)("ui5-list", t, i)}></${(0, e.scopeTag)("ui5-responsive-popover", t, i)}>`,
          a = (s, t, a) =>
            e.html`<div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${(0, e.ifDefined)(
              s._headerTitleText
            )}</span><${(0, e.scopeTag)(
              "ui5-button",
              t,
              a
            )} class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${
              s._toggleRespPopover
            }"></${(0, e.scopeTag)("ui5-button", t, a)}></div>${s.hasValueStateText ? i(s, t, a) : void 0}</div>`,
          i = (s, t, a) =>
            e.html`<div class="${(0, e.classMap)(
              s.classes.popoverValueState
            )} row ui5-select-value-state-dialog-header">${
              s.shouldDisplayDefaultValueStateMessage ? o(s, t, a) : l(s, t, a)
            }</div>`,
          o = (s, t, a) => e.html`${(0, e.ifDefined)(s.valueStateText)}`,
          l = (s, t, a) =>
            e.html`${(0, e.repeat)(
              s.valueStateMessageText,
              (e, s) => e._id || s,
              (e, i) => p(e, i, s, t, a)
            )}`,
          p = (s, t, a, i, o) => e.html`${(0, e.ifDefined)(s)}`,
          n = (s, t, a) => e.html`${s.hasValueStateText ? d(s, t, a) : void 0}`,
          d = (s, t, a) =>
            e.html`<div slot="header" class="${(0, e.classMap)(s.classes.popoverValueState)}" style=${(0, e.styleMap)(
              s.styles.responsivePopoverHeader
            )}><${(0, e.scopeTag)("ui5-icon", t, a)} class="ui5-input-value-state-message-icon" name="${(0,
            e.ifDefined)(s._valueStateMessageInputIcon)}"></${(0, e.scopeTag)("ui5-icon", t, a)}>${
              s.shouldDisplayDefaultValueStateMessage ? u(s, t, a) : r(s, t, a)
            }</div>`,
          u = (s, t, a) => e.html`${(0, e.ifDefined)(s.valueStateText)}`,
          r = (s, t, a) =>
            e.html`${(0, e.repeat)(
              s.valueStateMessageText,
              (e, s) => e._id || s,
              (e, i) => c(e, i, s, t, a)
            )}`,
          c = (s, t, a, i, o) => e.html`${(0, e.ifDefined)(s)}`,
          $ = (s, t, a, i, o) =>
            e.html`<${(0, e.scopeTag)("ui5-li", i, o)} id="${(0, e.ifDefined)(s.id)}-li" icon="${(0, e.ifDefined)(
              s.icon
            )}" ?selected="${s.selected}" ?focused="${s._focused}" ?aria-selected="${s.selected}" data-ui5-stable="${(0,
            e.ifDefined)(s.stableDomRef)}">${(0, e.ifDefined)(s.textContent)}</${(0, e.scopeTag)("ui5-li", i, o)}>`,
          v = (s, t, a) =>
            e.html`<${(0, e.scopeTag)(
              "ui5-popover",
              t,
              a
            )} skip-registry-update _disable-initial-focus prevent-focus-restore no-padding hide-arrow class="ui5-valuestatemessage-popover" placement-type="Bottom" horizontal-align="Left"><div slot="header" class="${(0,
            e.classMap)(s.classes.popoverValueState)}" style="${(0, e.styleMap)(s.styles.popoverHeader)}"><${(0,
            e.scopeTag)("ui5-icon", t, a)} class="ui5-input-value-state-message-icon" name="${(0, e.ifDefined)(
              s._valueStateMessageInputIcon
            )}"></${(0, e.scopeTag)("ui5-icon", t, a)}>${
              s.shouldDisplayDefaultValueStateMessage ? f(s, t, a) : h(s, t, a)
            }</div></${(0, e.scopeTag)("ui5-popover", t, a)}>`,
          f = (s, t, a) => e.html`${(0, e.ifDefined)(s.valueStateText)}`,
          h = (s, t, a) =>
            e.html`${(0, e.repeat)(
              s.valueStateMessageText,
              (e, s) => e._id || s,
              (e, i) => g(e, i, s, t, a)
            )}`,
          g = (s, t, a, i, o) => e.html`${(0, e.ifDefined)(s)}`;
        var m = s;
        exports.default = m;
      },
      { "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG" },
    ],
    sfpG: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var o = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          r = t(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          e = t(require("./sap_fiori_3/parameters-bundle.css.js"));
        function t(o) {
          return o && o.__esModule ? o : { default: o };
        }
        (0, o.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => r.default),
          (0, o.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => e.default);
        var i = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/Select.css",
          content:
            '[input-icon]{color:var(--_ui5_input_icon_color);cursor:pointer;outline:none;padding:var(--_ui5_input_icon_padding);margin-right:var(--_ui5_input_icon_margin);border-left:var(--_ui5_input_icon_border);min-width:1rem;min-height:1rem;border-radius:var(--_ui5_input_icon_border_radius);align-self:center}[input-icon][pressed]{background:var(--_ui5_input_icon_pressed_bg);box-shadow:var(--_ui5_input_icon_box_shadow);color:var(--_ui5_input_icon_pressed_color)}[input-icon]:active{background-color:var(--sapButton_Active_Background);box-shadow:var(--_ui5_input_icon_box_shadow);color:var(--_ui5_input_icon_pressed_color)}[input-icon]:not([pressed]):not(:active):hover{background:var(--_ui5_input_icon_hover_bg);box-shadow:var(--_ui5_input_icon_box_shadow)}[input-icon]:hover{border-left:var(--_ui5_select_hover_icon_left_border);box-shadow:var(--_ui5_input_icon_box_shadow)}[input-icon][dir=rtl]:hover{border-left:none;border-right:var(--_ui5_select_hover_icon_left_border)}[input-icon][dir=rtl]{border-left:none;margin-right:0;margin-left:var(--_ui5_input_icon_margin);border-right:var(--_ui5_input_icon_border)}.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block}:host{width:var(--_ui5_input_width);min-width:var(--_ui5_input_width);height:var(--_ui5_input_height);color:var(--sapField_TextColor);font-size:var(--sapFontSize);font-family:"72override",var(--sapFontFamily);font-style:normal;background-color:var(--_ui5-input-background-color);border:var(--_ui5-input-border);border-radius:var(--_ui5-input-border-radius);box-sizing:border-box;line-height:normal;letter-spacing:normal;word-spacing:normal;text-align:start;transition:var(--_ui5-input-transition);background-image:var(--_ui5-input-background-image);background-size:100% var(--sapField_BorderWidth);background-repeat:repeat-x;background-position:bottom}:host([focused]){border-color:var(--_ui5-input-focused-border-color);background-color:var(--sapField_Focus_Background);outline:var(--_ui5-input-focus-outline);outline-offset:var(--_ui5-input-focus-outline-offset);box-shadow:var(--_ui5-input-focus-box-shadow)}.ui5-input-root:before{content:"";position:absolute;width:calc(100% - 2px);left:1px;bottom:-2px;border-bottom-left-radius:8px;border-bottom-right-radius:8px;height:var(--_ui5-input-bottom-border-height);transition:var(--_ui5-input-transition);background-color:var(--_ui5-input-bottom-border-color)}:host([value-state]:not([value-state=None])[focused]){outline:var(--_ui5-input-value-state-outline);outline-offset:var(--_ui5-input-value-state-outline-offset)}.ui5-input-root{width:100%;height:100%;position:relative;background:transparent;display:inline-block;outline:none;box-sizing:border-box;color:inherit;transition:border-color .2s ease-in-out}:host([disabled]){opacity:var(--_ui5_input_disabled_opacity);cursor:default;pointer-events:none;background-color:var(--_ui5-input-disabled-background);border-color:var(--_ui5_input_disabled_border_color)}:host([disabled]) .ui5-input-root:before,:host([readonly]) .ui5-input-root:before{content:none}[inner-input]{background:transparent;color:inherit;border:none;font-style:inherit;-webkit-appearance:none;-moz-appearance:textfield;padding:var(--_ui5_input_inner_padding);box-sizing:border-box;min-width:inherit;width:100%;text-overflow:ellipsis;flex:1;outline:none;font-size:inherit;font-family:inherit;line-height:inherit;letter-spacing:inherit;word-spacing:inherit;text-align:inherit}[inner-input][inner-input-with-icon]{padding:var(--_ui5_input_inner_padding_with_icon)}.ui5-input-readonly-icon{display:var(--_ui5_input_readonly_icon_display);padding:var(--_ui5_input_icon_padding);margin-right:.125rem;align-self:center}.ui5-input-value-state-icon{height:100%;display:var(--_ui5-input-value-state-icon-display);align-items:center}.ui5-input-value-state-icon>svg{margin-right:8px}[inner-input]::selection{background:var(--sapSelectedColor);color:var(--sapContent_ContrastTextColor)}:host([disabled]) [inner-input]::-webkit-input-placeholder{visibility:hidden}:host([readonly]) [inner-input]::-webkit-input-placeholder{visibility:hidden}[inner-input]::-webkit-input-placeholder{font-style:var(--_ui5-input-placeholder-style);color:var(--_ui5-input-placeholder-color);padding-right:.125rem}:host([disabled]) [inner-input]::-moz-placeholder{visibility:hidden}:host([readonly]) [inner-input]::-moz-placeholder{visibility:hidden}[inner-input]::-moz-placeholder{font-style:var(--_ui5-input-placeholder-style);color:var(--sapField_PlaceholderTextColor);padding-right:.125rem}:host([disabled]) [inner-input]:-ms-input-placeholder{visibility:hidden}:host([readonly]) [inner-input]:-ms-input-placeholder{visibility:hidden}[inner-input]:-ms-input-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor);padding-right:.125rem}:host([value-state=Error]) [inner-input]::-webkit-input-placeholder{color:var(--_ui5-input-value-state-error-border-botom-color)}:host([value-state=Error]) [inner-input]::-moz-placeholder{color:var(--_ui5-input-value-state-error-border-botom-color)}:host([value-state=Warning]) [inner-input]::-webkit-input-placeholder{color:var(--_ui5-input-value-state-warning-border-botom-color)}:host([value-state=Warning]) [inner-input]::-moz-placeholder{color:var(--_ui5-input-value-state-warning-border-botom-color)}:host([value-state=Success]) [inner-input]::-webkit-input-placeholder{color:var(--_ui5-input-value-state-success-border-botom-color)}:host([value-state=Success]) [inner-input]::-moz-placeholder{color:var(--_ui5-input-value-state-success-border-botom-color)}:host([value-state=Information]) [inner-input]::-webkit-input-placeholder{color:var(--_ui5-input-value-success-information-border-botom-color)}:host([value-state=Information]) [inner-input]::-moz-placeholder{color:var(--_ui5-input-value-success-information-border-botom-color)}.ui5-input-content{height:100%;box-sizing:border-box;display:flex;flex-direction:row;justify-content:flex-end;overflow:hidden;outline:none;background:transparent;color:inherit}:host([readonly]){border-color:var(--_ui5_input_readonly_border_color);background:var(--_ui5-input-readonly-background)}:host(:not([value-state]):not([readonly]):hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--_ui5-input-hover-box-shadow);background-image:var(--_ui5-input-background-image);background-size:100% var(--sapField_BorderWidth);background-repeat:repeat-x;background-position:bottom}:host(:not([value-state]):not([readonly])[focused]:hover),:host([value-state=None]:not([readonly])[focused]:hover){border-color:var(--_ui5-input-focused-border-color);box-shadow:var(--_ui5-input-focus-box-shadow)}:host(:not([value-state]):not([readonly]):hover){border:var(--_ui5-input-hover-border)}:host([focused]) .ui5-input-root:before{content:none}:host([value-state=None]:not([readonly]):hover){background-color:var(--sapField_Hover_Background);border:var(--_ui5-input-hover-border);box-shadow:var(--_ui5-input-hover-box-shadow)}:host([value-state]:not([value-state=None])){border-width:var(--_ui5_input_state_border_width)}:host([value-state=Error]) [inner-input],:host([value-state=Warning]) [inner-input]{font-style:var(--_ui5_input_error_warning_font_style)}:host([value-state=Error]) [inner-input]{font-weight:var(--_ui5_input_error_font_weight)}:host([value-state=Error]:not([readonly])){background-color:var(--sapField_InvalidBackground);border-color:var(--_ui5-input-value-state-error-border-color);background-image:var(--_ui5-input-error-background-image);background-size:100% var(--sapField_InvalidBorderWidth);background-repeat:repeat-x;background-position:bottom}:host([value-state=Error][focused]:not([readonly])){background-color:var(--_ui5-input-focused-value-state-error-background);border-color:var(--_ui5-input-focused-value-state-error-border-color);box-shadow:var(--_ui5-input-value-state-error-focus-box-shadow)}:host([value-state=Error]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-input-value-state-error-border-botom-color)}:host([value-state=Error]:not([readonly]):not([focused]):hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--_ui5-input-value-state-error-hover-box-shadow)}:host([value-state=Error]:not([readonly]):not([disabled])),:host([value-state=Information]:not([readonly]):not([disabled])),:host([value-state=Warning]:not([readonly]):not([disabled])){border-style:var(--_ui5_input_error_warning_border_style)}:host([value-state=Warning]:not([readonly])){background-color:var(--sapField_WarningBackground);border-color:var(--_ui5-input-value-state-warning-border-color);background-image:var(--_ui5-input-warning-background-image);background-size:100% var(--sapField_WarningBorderWidth);background-repeat:repeat-x;background-position:bottom}:host([value-state=Warning][focused]:not([readonly])){background-color:var(--_ui5-input-focused-value-state-warning-background);border-color:var(--_ui5-input-focused-value-state-warning-border-color);box-shadow:var(--_ui5-input-value-state-warning-focus-box-shadow)}:host([value-state=Warning]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-input-value-state-warning-border-botom-color)}:host([value-state=Warning]:not([readonly]):not([focused]):hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--_ui5-input-value-state-warning-hover-box-shadow)}:host([value-state=Success]:not([readonly])){background-color:var(--sapField_SuccessBackground);border-color:var(--_ui5-input-value-state-success-border-color);border-width:var(--_ui5-input-value-state-success-border-width);background-image:var(--_ui5-input-success-background-image);background-size:100% var(--sapField_SuccessBorderWidth);background-repeat:repeat-x;background-position:bottom}:host([value-state=Success][focused]:not([readonly])){background-color:var(--_ui5-input-focused-value-state-success-background);border-color:var(--_ui5-input-focused-value-state-success-border-color);box-shadow:var(--_ui5-input-value-state-success-focus-box-shadow)}:host([value-state=Success]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-input-value-state-success-border-botom-color)}:host([value-state=Success]:not([readonly]):not([focused]):hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--_ui5-input-value-state-success-hover-box-shadow)}:host([value-state=Information]:not([readonly])){background-color:var(--sapField_InformationBackground);border-color:var(--_ui5-input-value-state-information-border-color);border-width:var(--_ui5-input-information_border_width);background-image:var(--_ui5-input-information-background-image);background-size:100% var(--sapField_InformationBorderWidth);background-repeat:repeat-x;background-position:bottom}:host([value-state=Information][focused]:not([readonly])){background-color:var(--_ui5-input-focused-value-state-information-background);border-color:var(--_ui5-input-focused-value-state-information-border-color);box-shadow:var(--_ui5-input-focus-box-shadow)}:host([value-state=Information]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-input-value-success-information-border-botom-color)}:host([value-state=Information]:not([readonly]):not([focused]):hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--_ui5-input-value-state-information-hover-box-shadow)}[inner-input]::-ms-clear{height:0;width:0}.ui5-input-icon-root{min-width:var(--_ui5_input_icon_min_width);height:100%;display:flex;justify-content:center;align-items:center}::slotted([ui5-icon][slot=icon]){padding:var(--_ui5_input_icon_padding)}[inner-input]::-webkit-inner-spin-button,[inner-input]::-webkit-outer-spin-button{-webkit-appearance:inherit;margin:inherit}.ui5-select-root{width:100%;height:100%;display:flex;outline:none;cursor:pointer;overflow:hidden}.ui5-select-label-root{flex-shrink:1;flex-grow:1;align-self:center;min-width:1rem;padding-left:.5rem;cursor:pointer;outline:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--_ui5_select_label_olor);font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSize);font-weight:400}.ui5-select-option-icon{padding-left:.5rem;color:var(--sapField_TextColor);align-self:center}:host [dir=rtl].ui5-select-root .ui5-select-label-root{padding-left:0;padding-right:.5rem}:host [dir=rtl] .ui5-select-option-icon{padding-right:.5rem;padding-left:0}:host(:not([disabled])){cursor:pointer}:host([focused][opened]),:host([value-state]:not([value-state=None])[focused][opened]){outline:none}',
        };
        exports.default = i;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    eGc4: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Themes.js"),
          r = s(require("@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js")),
          t = s(require("./sap_fiori_3/parameters-bundle.css.js"));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (0, e.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => r.default),
          (0, e.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", () => t.default);
        var i = {
          packageName: "@ui5/webcomponents",
          fileName: "themes/SelectPopover.css",
          content:
            ".ui5-select-popover:not(.ui5-valuestatemessage-popover) [ui5-li]:first-child::part(native-li):after{border-top-left-radius:var(--_ui5_select_option_focus_border_radius);border-top-right-radius:var(--_ui5_select_option_focus_border_radius)}.ui5-select-popover [ui5-li]:last-child::part(native-li):after{border-bottom-left-radius:var(--_ui5_select_option_focus_border_radius);border-bottom-right-radius:var(--_ui5_select_option_focus_border_radius)}",
        };
        exports.default = i;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Themes.js": "ZA2u",
        "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js": "QviM",
        "./sap_fiori_3/parameters-bundle.css.js": "TttV",
      },
    ],
    jdyY: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = T(require("@ui5/webcomponents-base/dist/UI5Element.js")),
          t = T(require("@ui5/webcomponents-base/dist/renderer/LitRenderer.js")),
          s = require("@ui5/webcomponents-base/dist/Keys.js"),
          i = T(require("@ui5/webcomponents-base/dist/util/InvisibleMessage.js")),
          n = T(require("@ui5/webcomponents-base/dist/types/Integer.js")),
          o = require("@ui5/webcomponents-base/dist/FeaturesRegistry.js"),
          r = require("@ui5/webcomponents-base/dist/util/AriaLabelHelper.js"),
          a = T(require("@ui5/webcomponents-base/dist/types/ValueState.js"));
        require("@ui5/webcomponents-icons/dist/slim-arrow-down.js");
        var l = require("@ui5/webcomponents-base/dist/Device.js"),
          d = require("@ui5/webcomponents-base/dist/i18nBundle.js");
        require("@ui5/webcomponents-icons/dist/decline.js");
        var h = require("./generated/i18n/i18n-defaults.js"),
          u = T(require("./Option.js")),
          c = T(require("./Label.js")),
          p = T(require("./ResponsivePopover.js")),
          _ = T(require("./Popover.js")),
          g = T(require("./List.js")),
          v = T(require("./StandardListItem.js")),
          f = T(require("./Icon.js")),
          m = T(require("./Button.js")),
          S = T(require("./generated/templates/SelectTemplate.lit.js")),
          I = T(require("./generated/templates/SelectPopoverTemplate.lit.js")),
          x = T(require("./generated/themes/Select.css.js")),
          y = T(require("./generated/themes/ResponsivePopoverCommon.css.js")),
          P = T(require("./generated/themes/ValueStateMessage.css.js")),
          b = T(require("./generated/themes/SelectPopover.css.js"));
        function T(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const O = {
          tag: "ui5-select",
          languageAware: !0,
          managedSlots: !0,
          slots: {
            default: { propertyName: "options", type: HTMLElement, invalidateOnChildChange: !0 },
            valueStateMessage: { type: HTMLElement },
            formSupport: { type: HTMLElement },
          },
          properties: {
            disabled: { type: Boolean },
            name: { type: String },
            valueState: { type: a.default, defaultValue: a.default.None },
            required: { type: Boolean },
            accessibleName: { type: String },
            accessibleNameRef: { type: String, defaultValue: "" },
            _text: { type: String, noAttribute: !0 },
            _iconPressed: { type: Boolean, noAttribute: !0 },
            opened: { type: Boolean },
            _listWidth: { type: n.default, defaultValue: 0, noAttribute: !0 },
            focused: { type: Boolean },
          },
          events: { change: { detail: { selectedOption: {} } } },
        };
        class w extends e.default {
          static get metadata() {
            return O;
          }
          static get render() {
            return t.default;
          }
          static get template() {
            return S.default;
          }
          static get staticAreaTemplate() {
            return I.default;
          }
          static get styles() {
            return x.default;
          }
          static get staticAreaStyles() {
            return [y.default, P.default, b.default];
          }
          constructor() {
            super(),
              (this._syncedOptions = []),
              (this._selectedIndex = -1),
              (this._selectedIndexBeforeOpen = -1),
              (this._escapePressed = !1),
              (this._lastSelectedOption = null),
              (this._typedChars = ""),
              (this._typingTimeoutID = -1);
          }
          onBeforeRendering() {
            this._syncSelection(), this._enableFormSupport();
          }
          onAfterRendering() {
            this.toggleValueStatePopover(this.shouldOpenValueStateMessagePopover),
              this._isPickerOpen && (this._listWidth || (this._listWidth = this.responsivePopover.offsetWidth)),
              this._attachRealDomRefs();
          }
          _onfocusin() {
            this.focused = !0;
          }
          _onfocusout() {
            this.focused = !1;
          }
          get _isPickerOpen() {
            return !!this.responsivePopover && this.responsivePopover.opened;
          }
          async _respPopover() {
            return (await this.getStaticAreaItemDomRef()).querySelector("[ui5-responsive-popover]");
          }
          get selectedOption() {
            return this._filteredItems.find((e) => e.selected);
          }
          async _toggleRespPopover() {
            (this._iconPressed = !0),
              (this.responsivePopover = await this._respPopover()),
              this.disabled ||
                (this._isPickerOpen ? this.responsivePopover.close() : this.responsivePopover.showAt(this));
          }
          async _attachRealDomRefs() {
            (this.responsivePopover = await this._respPopover()),
              this.options.forEach((e) => {
                e._getRealDomRef = () => this.responsivePopover.querySelector(`*[data-ui5-stable=${e.stableDomRef}]`);
              });
          }
          _syncSelection() {
            let e = -1,
              t = -1;
            const s = this._filteredItems,
              i = s.map(
                (s, i) => (
                  (s.selected || s.textContent === this.value) && (e = i),
                  -1 === t && (t = i),
                  (s.selected = !1),
                  (s._focused = !1),
                  {
                    selected: !1,
                    _focused: !1,
                    icon: s.icon,
                    value: s.value,
                    textContent: s.textContent,
                    id: s._id,
                    stableDomRef: s.stableDomRef,
                  }
                )
              );
            e > -1 && !i[e].disabled
              ? ((i[e].selected = !0),
                (i[e]._focused = !0),
                (s[e].selected = !0),
                (s[e]._focused = !0),
                (this._text = i[e].textContent),
                (this._selectedIndex = e))
              : ((this._text = ""),
                (this._selectedIndex = -1),
                i[t] &&
                  ((i[t].selected = !0),
                  (i[t]._focused = !0),
                  (s[t].selected = !0),
                  (s[t]._focused = !0),
                  (this._selectedIndex = t),
                  (this._text = s[t].textContent))),
              (this._syncedOptions = i);
          }
          _enableFormSupport() {
            const e = (0, o.getFeature)("FormSupport");
            e
              ? e.syncNativeHiddenInput(this, (e, t) => {
                  (t.disabled = e.disabled),
                    (t.value = e._currentlySelectedOption ? e._currentlySelectedOption.value : "");
                })
              : this.name &&
                console.warn(
                  'In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";'
                );
          }
          _onkeydown(e) {
            ((0, s.isTabNext)(e) || (0, s.isTabPrevious)(e)) &&
              this.responsivePopover &&
              this.responsivePopover.opened &&
              this.responsivePopover.close(),
              (0, s.isShow)(e)
                ? (e.preventDefault(), this._toggleRespPopover())
                : (0, s.isSpace)(e)
                ? e.preventDefault()
                : (0, s.isEscape)(e) && this._isPickerOpen
                ? (this._escapePressed = !0)
                : (0, s.isHome)(e)
                ? this._handleHomeKey(e)
                : (0, s.isEnd)(e)
                ? this._handleEndKey(e)
                : (0, s.isEnter)(e)
                ? this._handleSelectionChange()
                : ((0, s.isUp)(e) || (0, s.isDown)(e)) && this._handleArrowNavigation(e);
          }
          _handleKeyboardNavigation(e) {
            if ((0, s.isEnter)(e)) return;
            const t = e.key.toLowerCase();
            this._typedChars += t;
            const i = /^(.)\1+$/i.test(this._typedChars) ? t : this._typedChars;
            clearTimeout(this._typingTimeoutID),
              (this._typingTimeoutID = setTimeout(() => {
                (this._typedChars = ""), (this._typingTimeoutID = -1);
              }, 1e3)),
              this._selectTypedItem(i);
          }
          _selectTypedItem(e) {
            const t = this._selectedIndex,
              s = this._searchNextItemByText(e);
            if (s) {
              const e = this._getSelectedItemIndex(s);
              this._changeSelectedItem(this._selectedIndex, e),
                t !== this._selectedIndex && this.itemSelectionAnnounce();
            }
          }
          _searchNextItemByText(e) {
            let t = this._filteredItems.slice(0);
            const s = t.splice(this._selectedIndex + 1, t.length - this._selectedIndex),
              i = t.splice(0, t.length - 1);
            return (t = s.concat(i)).find((t) => t.textContent.toLowerCase().startsWith(e));
          }
          _handleHomeKey(e) {
            e.preventDefault(), this._changeSelectedItem(this._selectedIndex, 0);
          }
          _handleEndKey(e) {
            const t = this._filteredItems.length - 1;
            e.preventDefault(), this._changeSelectedItem(this._selectedIndex, t);
          }
          _onkeyup(e) {
            (0, s.isSpace)(e) && (this._isPickerOpen ? this._handleSelectionChange() : this._toggleRespPopover());
          }
          _getSelectedItemIndex(e) {
            return [].indexOf.call(e.parentElement.children, e);
          }
          _select(e) {
            (this._filteredItems[this._selectedIndex].selected = !1),
              (this._selectedIndex = e),
              (this._filteredItems[e].selected = !0);
          }
          _handleItemPress(e) {
            const t = e.detail.item,
              s = this._getSelectedItemIndex(t);
            this._handleSelectionChange(s);
          }
          _itemMousedown(e) {
            e.preventDefault();
          }
          _onclick(e) {
            this.getFocusDomRef().focus(), this._toggleRespPopover();
          }
          _handleSelectionChange(e = this._selectedIndex) {
            this._select(e), this._toggleRespPopover();
          }
          _handleArrowNavigation(e) {
            let t = -1;
            const i = this._selectedIndex,
              n = (0, s.isDown)(e);
            e.preventDefault(),
              (t = n ? this._getNextOptionIndex() : this._getPreviousOptionIndex()),
              this._changeSelectedItem(this._selectedIndex, t),
              i !== this._selectedIndex && this.itemSelectionAnnounce();
          }
          _changeSelectedItem(e, t) {
            const s = this._filteredItems;
            (s[e].selected = !1),
              (s[e]._focused = !1),
              (s[t].selected = !0),
              (s[t]._focused = !0),
              (this._selectedIndex = t),
              this._isPickerOpen || this._fireChangeEvent(s[t]);
          }
          _getNextOptionIndex() {
            return this._selectedIndex === this.options.length - 1 ? this._selectedIndex : this._selectedIndex + 1;
          }
          _getPreviousOptionIndex() {
            return 0 === this._selectedIndex ? this._selectedIndex : this._selectedIndex - 1;
          }
          _beforeOpen() {
            (this._selectedIndexBeforeOpen = this._selectedIndex),
              (this._lastSelectedOption = this._filteredItems[this._selectedIndex]);
          }
          _afterOpen() {
            this.opened = !0;
          }
          _afterClose() {
            (this.opened = !1),
              (this._iconPressed = !1),
              (this._listWidth = 0),
              this._escapePressed
                ? (this._select(this._selectedIndexBeforeOpen), (this._escapePressed = !1))
                : this._lastSelectedOption !== this._filteredItems[this._selectedIndex] &&
                  (this._fireChangeEvent(this._filteredItems[this._selectedIndex]),
                  (this._lastSelectedOption = this._filteredItems[this._selectedIndex]));
          }
          _fireChangeEvent(e) {
            this.fireEvent("change", { selectedOption: e }),
              (this.selectedItem = e.textContent),
              this.fireEvent("selected-item-changed");
          }
          get valueStateTextMappings() {
            return {
              Success: w.i18nBundle.getText(h.VALUE_STATE_SUCCESS),
              Information: w.i18nBundle.getText(h.VALUE_STATE_INFORMATION),
              Error: w.i18nBundle.getText(h.VALUE_STATE_ERROR),
              Warning: w.i18nBundle.getText(h.VALUE_STATE_WARNING),
            };
          }
          get valueStateText() {
            return this.valueStateTextMappings[this.valueState];
          }
          get hasValueState() {
            return this.valueState !== a.default.None;
          }
          get valueStateTextId() {
            return this.hasValueState ? `${this._id}-valueStateDesc` : void 0;
          }
          get isDisabled() {
            return this.disabled || void 0;
          }
          get _headerTitleText() {
            return w.i18nBundle.getText(h.INPUT_SUGGESTIONS_TITLE);
          }
          get _currentSelectedItem() {
            return this.shadowRoot.querySelector(`#${this._filteredItems[this._selectedIndex]._id}-li`);
          }
          get _currentlySelectedOption() {
            return this._filteredItems[this._selectedIndex];
          }
          get tabIndex() {
            return this.disabled || (this.responsivePopover && this.responsivePopover.opened) ? "-1" : "0";
          }
          get _valueStateMessageInputIcon() {
            return this.valueState !== a.default.None
              ? { Error: "error", Warning: "alert", Success: "sys-enter-2", Information: "information" }[
                  this.valueState
                ]
              : "";
          }
          get classes() {
            return {
              popoverValueState: {
                "ui5-valuestatemessage-root": !0,
                "ui5-valuestatemessage--success": this.valueState === a.default.Success,
                "ui5-valuestatemessage--error": this.valueState === a.default.Error,
                "ui5-valuestatemessage--warning": this.valueState === a.default.Warning,
                "ui5-valuestatemessage--information": this.valueState === a.default.Information,
              },
              popover: { "ui5-valuestatemessage-popover": this.hasValueState },
            };
          }
          get styles() {
            return {
              popoverHeader: { "max-width": `${this.offsetWidth}px` },
              responsivePopoverHeader: {
                display: this._filteredItems.length && 0 === this._listWidth ? "none" : "inline-block",
                width: `${this._filteredItems.length ? this._listWidth : this.offsetWidth}px`,
              },
            };
          }
          get ariaLabelText() {
            return (0, r.getEffectiveAriaLabelText)(this);
          }
          get valueStateMessageText() {
            return this.getSlottedNodes("valueStateMessage").map((e) => e.cloneNode(!0));
          }
          get shouldDisplayDefaultValueStateMessage() {
            return !this.valueStateMessage.length && this.hasValueStateText;
          }
          get hasValueStateText() {
            return this.hasValueState && this.valueState !== a.default.Success;
          }
          get shouldOpenValueStateMessagePopover() {
            return (
              this.focused && this.hasValueStateText && !this._iconPressed && !this._isPickerOpen && !this._isPhone
            );
          }
          get _isPhone() {
            return (0, l.isPhone)();
          }
          get _filteredItems() {
            return this.options.filter((e) => !e.disabled);
          }
          itemSelectionAnnounce() {
            let e;
            const t = this._filteredItems.length,
              s = w.i18nBundle.getText(h.LIST_ITEM_POSITION, this._selectedIndex + 1, t);
            this.focused &&
              this._currentlySelectedOption &&
              ((e = `${this._currentlySelectedOption.textContent} ${this._isPickerOpen ? s : ""}`),
              (0, i.default)(e, "Polite"));
          }
          async openValueStatePopover() {
            (this.popover = await this._getPopover()), this.popover && this.popover.showAt(this);
          }
          closeValueStatePopover() {
            this.popover && this.popover.close();
          }
          toggleValueStatePopover(e) {
            e ? this.openValueStatePopover() : this.closeValueStatePopover();
          }
          get selectedOptionIcon() {
            return this.selectedOption && this.selectedOption.icon;
          }
          async _getPopover() {
            return (await this.getStaticAreaItemDomRef()).querySelector("[ui5-popover]");
          }
          static get dependencies() {
            return [u.default, c.default, p.default, _.default, g.default, v.default, f.default, m.default];
          }
          static async onDefine() {
            w.i18nBundle = await (0, d.getI18nBundle)("@ui5/webcomponents");
          }
        }
        w.define();
        var E = w;
        exports.default = E;
      },
      {
        "@ui5/webcomponents-base/dist/UI5Element.js": "Kogr",
        "@ui5/webcomponents-base/dist/renderer/LitRenderer.js": "rvEG",
        "@ui5/webcomponents-base/dist/Keys.js": "glQL",
        "@ui5/webcomponents-base/dist/util/InvisibleMessage.js": "lijI",
        "@ui5/webcomponents-base/dist/types/Integer.js": "y11y",
        "@ui5/webcomponents-base/dist/FeaturesRegistry.js": "rnHX",
        "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js": "OuVZ",
        "@ui5/webcomponents-base/dist/types/ValueState.js": "rs1i",
        "@ui5/webcomponents-icons/dist/slim-arrow-down.js": "iPtt",
        "@ui5/webcomponents-base/dist/Device.js": "Oq9i",
        "@ui5/webcomponents-base/dist/i18nBundle.js": "F4Ye",
        "@ui5/webcomponents-icons/dist/decline.js": "vj7t",
        "./generated/i18n/i18n-defaults.js": "XB3p",
        "./Option.js": "QT6c",
        "./Label.js": "CXe7",
        "./ResponsivePopover.js": "F6VG",
        "./Popover.js": "ZHo6",
        "./List.js": "k4fe",
        "./StandardListItem.js": "S25h",
        "./Icon.js": "RJcw",
        "./Button.js": "PQe6",
        "./generated/templates/SelectTemplate.lit.js": "yCwY",
        "./generated/templates/SelectPopoverTemplate.lit.js": "Z1FJ",
        "./generated/themes/Select.css.js": "sfpG",
        "./generated/themes/ResponsivePopoverCommon.css.js": "wvzI",
        "./generated/themes/ValueStateMessage.css.js": "Pv08",
        "./generated/themes/SelectPopover.css.js": "eGc4",
      },
    ],
    NMnV: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = r(require("./isPlainObject.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var t = Object.create(null),
          o = function () {
            var r,
              u,
              a,
              f,
              i,
              l,
              n = arguments[2] || {},
              s = 3,
              d = arguments.length,
              c = arguments[0] || !1,
              _ = arguments[1] ? void 0 : t;
            for ("object" != typeof n && "function" != typeof n && (n = {}); s < d; s++)
              if (null != (i = arguments[s]))
                for (f in i)
                  (r = n[f]),
                    (a = i[f]),
                    "__proto__" !== f &&
                      n !== a &&
                      (c && a && ((0, e.default)(a) || (u = Array.isArray(a)))
                        ? (u ? ((u = !1), (l = r && Array.isArray(r) ? r : [])) : (l = r && (0, e.default)(r) ? r : {}),
                          (n[f] = o(c, arguments[1], l, a)))
                        : a !== _ && (n[f] = a));
            return n;
          },
          u = o;
        exports.default = u;
      },
      { "./isPlainObject.js": "L2W1" },
    ],
    zjP9: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = r(require("./_merge.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var t = function () {
            var r = [!0, !1];
            return r.push.apply(r, arguments), e.default.apply(null, r);
          },
          u = t;
        exports.default = u;
      },
      { "./_merge.js": "NMnV" },
    ],
    F8cn: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.SUPPORTED_LOCALES = exports.DEFAULT_THEME = exports.DEFAULT_LOCALE = exports.DEFAULT_LANGUAGE = void 0);
        const _ = {
            themes: {
              default: "sap_fiori_3",
              all: [
                "sap_fiori_3",
                "sap_fiori_3_dark",
                "sap_belize",
                "sap_belize_hcb",
                "sap_belize_hcw",
                "sap_fiori_3_hcb",
                "sap_fiori_3_hcw",
                "sap_horizon",
                "sap_horizon_dark",
                "sap_horizon_hcb",
                "sap_horizon_hcw",
                "sap_horizon_exp",
              ],
            },
            languages: {
              default: "en",
              all: [
                "ar",
                "bg",
                "ca",
                "cs",
                "cy",
                "da",
                "de",
                "el",
                "en",
                "en_GB",
                "en_US_sappsd",
                "en_US_saprigi",
                "en_US_saptrc",
                "es",
                "es_MX",
                "et",
                "fi",
                "fr",
                "fr_CA",
                "hi",
                "hr",
                "hu",
                "in",
                "it",
                "iw",
                "ja",
                "kk",
                "ko",
                "lt",
                "lv",
                "ms",
                "nl",
                "no",
                "pl",
                "pt_PT",
                "pt",
                "ro",
                "ru",
                "sh",
                "sk",
                "sl",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh_CN",
                "zh_TW",
              ],
            },
            locales: {
              default: "en",
              all: [
                "ar",
                "ar_EG",
                "ar_SA",
                "bg",
                "ca",
                "cs",
                "da",
                "de",
                "de_AT",
                "de_CH",
                "el",
                "el_CY",
                "en",
                "en_AU",
                "en_GB",
                "en_HK",
                "en_IE",
                "en_IN",
                "en_NZ",
                "en_PG",
                "en_SG",
                "en_ZA",
                "es",
                "es_AR",
                "es_BO",
                "es_CL",
                "es_CO",
                "es_MX",
                "es_PE",
                "es_UY",
                "es_VE",
                "et",
                "fa",
                "fi",
                "fr",
                "fr_BE",
                "fr_CA",
                "fr_CH",
                "fr_LU",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "it_CH",
                "ja",
                "kk",
                "ko",
                "lt",
                "lv",
                "ms",
                "nb",
                "nl",
                "nl_BE",
                "pl",
                "pt",
                "pt_PT",
                "ro",
                "ru",
                "ru_UA",
                "sk",
                "sl",
                "sr",
                "sr_Latn",
                "sv",
                "th",
                "tr",
                "uk",
                "vi",
                "zh_CN",
                "zh_HK",
                "zh_SG",
                "zh_TW",
              ],
            },
          },
          e = _.themes.default;
        exports.DEFAULT_THEME = e;
        const s = _.languages.default;
        exports.DEFAULT_LANGUAGE = s;
        const a = _.locales.default;
        exports.DEFAULT_LOCALE = a;
        const r = _.locales.all;
        exports.SUPPORTED_LOCALES = r;
      },
      {},
    ],
    qbGl: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.getTheme = exports.getRTL = exports.getNoConflict = exports.getLanguage = exports.getFormatSettings = exports.getFetchDefaultLanguage = exports.getCalendarType = exports.getAnimationMode = void 0);
        var e = o(require("./thirdparty/merge.js")),
          t = require("./FeaturesRegistry.js"),
          a = require("./generated/AssetParameters.js");
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        let n = !1,
          s = {
            animationMode: "full",
            theme: a.DEFAULT_THEME,
            rtl: null,
            language: null,
            calendarType: null,
            noConflict: !1,
            formatSettings: {},
            fetchDefaultLanguage: !1,
          };
        const r = () => (T(), s.animationMode);
        exports.getAnimationMode = r;
        const i = () => (T(), s.theme);
        exports.getTheme = i;
        const g = () => (T(), s.rtl);
        exports.getRTL = g;
        const c = () => (T(), s.language);
        exports.getLanguage = c;
        const u = () => (T(), s.fetchDefaultLanguage);
        exports.getFetchDefaultLanguage = u;
        const l = () => (T(), s.noConflict);
        exports.getNoConflict = l;
        const p = () => (T(), s.calendarType);
        exports.getCalendarType = p;
        const f = () => (T(), s.formatSettings);
        exports.getFormatSettings = f;
        const d = new Map();
        d.set("true", !0), d.set("false", !1);
        const h = () => {
            const t =
              document.querySelector("[data-ui5-config]") || document.querySelector("[data-id='sap-ui-config']");
            let a;
            if (t) {
              try {
                a = JSON.parse(t.innerHTML);
              } catch (o) {
                console.warn("Incorrect data-sap-ui-config format. Please use JSON");
              }
              a && (s = (0, e.default)(s, a));
            }
          },
          m = () => {
            const e = new URLSearchParams(window.location.search);
            e.forEach((e, t) => {
              const a = t.split("sap-").length;
              0 !== a && a !== t.split("sap-ui-").length && L(t, e, "sap");
            }),
              e.forEach((e, t) => {
                t.startsWith("sap-ui") && L(t, e, "sap-ui");
              });
          },
          x = (e, t) => ("theme" === e && t.includes("@") ? t.split("@")[0] : t),
          L = (e, t, a) => {
            const o = t.toLowerCase(),
              n = e.split(`${a}-`)[1];
            d.has(t) && (t = d.get(o)), (t = x(n, t)), (s[n] = t);
          },
          S = () => {
            const a = (0, t.getFeature)("OpenUI5Support");
            if (!a || !a.isLoaded()) return;
            const o = a.getConfigurationSettingsObject();
            s = (0, e.default)(s, o);
          },
          T = () => {
            n || (h(), m(), S(), (n = !0));
          };
      },
      { "./thirdparty/merge.js": "zjP9", "./FeaturesRegistry.js": "rnHX", "./generated/AssetParameters.js": "F8cn" },
    ],
    J0dU: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = t(require("./util/getSingletonElementInstance.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const r = () => (0, e.default)("ui5-shared-resources", document.head),
          o = (e, t) => {
            const o = e.split(".");
            let l = r();
            for (let r = 0; r < o.length; r++) {
              const e = o[r],
                n = r === o.length - 1;
              Object.prototype.hasOwnProperty.call(l, e) || (l[e] = n ? t : {}), (l = l[e]);
            }
            return l;
          };
        var l = o;
        exports.default = l;
      },
      { "./util/getSingletonElementInstance.js": "zr7a" },
    ],
    Y0ps: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        const e = { version: "1.3.1", major: 1, minor: 3, patch: 1, suffix: "", isNext: !1, buildTime: 1651077462 };
        var t = e;
        exports.default = t;
      },
      {},
    ],
    e2vJ: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.setRuntimeAlias = exports.registerCurrentRuntime = exports.getCurrentRuntimeIndex = exports.getAllRuntimes = exports.compareRuntimes = void 0);
        var e = r(require("./generated/VersionInfo.js")),
          t = r(require("./getSharedResource.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        let n,
          s = "";
        const i = new Map(),
          o = (0, t.default)("Runtimes", []),
          u = () => {
            void 0 === n &&
              ((n = o.length),
              o.push({
                ...e.default,
                alias: s,
                description: `Runtime ${n} - ver ${e.default.version}${s ? ` (${s})` : ""}`,
              }));
          };
        exports.registerCurrentRuntime = u;
        const a = () => n;
        exports.getCurrentRuntimeIndex = a;
        const l = (e, t) => {
          const r = `${e},${t}`;
          if (i.has(r)) return i.get(r);
          const n = o[e],
            s = o[t];
          if (!n || !s) throw new Error("Invalid runtime index supplied");
          if (n.isNext || s.isNext) return n.buildTime - s.buildTime;
          const u = n.major - s.major;
          if (u) return u;
          const a = n.minor - s.minor;
          if (a) return a;
          const l = n.patch - s.patch;
          if (l) return l;
          const m = new Intl.Collator(void 0, { numeric: !0, sensitivity: "base" }).compare(n.suffix, s.suffix);
          return i.set(r, m), m;
        };
        exports.compareRuntimes = l;
        const m = (e) => {
          s = e;
        };
        exports.setRuntimeAlias = m;
        const c = () => o;
        exports.getAllRuntimes = c;
      },
      { "./generated/VersionInfo.js": "Y0ps", "./getSharedResource.js": "J0dU" },
    ],
    ZaaC: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.registerTag = exports.recordTagRegistrationFailure = exports.isTagRegistered = exports.getAllRegisteredTags = void 0);
        var e = o(require("./util/setToArray.js")),
          t = o(require("./getSharedResource.js")),
          n = require("./Runtimes.js");
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = (0, t.default)("Tags", new Map()),
          r = new Set();
        let i,
          a = {};
        const d = "unknown",
          u = (e) => {
            r.add(e), s.set(e, (0, n.getCurrentRuntimeIndex)());
          };
        exports.registerTag = u;
        const c = (e) => r.has(e);
        exports.isTagRegistered = c;
        const g = () => (0, e.default)(r);
        exports.getAllRegisteredTags = g;
        const l = (e) => {
          let t = s.get(e);
          void 0 === t && (t = "unknown"),
            (a[t] = a[t] || new Set()),
            a[t].add(e),
            i ||
              (i = setTimeout(() => {
                p(), (a = {}), (i = void 0);
              }, 1e3));
        };
        exports.recordTagRegistrationFailure = l;
        const p = () => {
          const t = (0, n.getAllRuntimes)(),
            o = (0, n.getCurrentRuntimeIndex)(),
            s = t[o];
          let r = "Multiple UI5 Web Components instances detected.";
          t.length > 1 &&
            (r = `${r}\nLoading order (versions before 1.1.0 not listed): ${t
              .map((e) => `\n${e.description}`)
              .join("")}`),
            Object.keys(a).forEach((i) => {
              let d, u, c;
              "unknown" === i
                ? ((d = 1), (u = { description: "Older unknown runtime" }))
                : ((d = (0, n.compareRuntimes)(o, i)), (u = t[i])),
                (c = d > 0 ? "an older" : d < 0 ? "a newer" : "the same"),
                (r = `${r}\n\n"${s.description}" failed to define ${
                  a[i].size
                } tag(s) as they were defined by a runtime of ${c} version "${u.description}": ${(0, e.default)(a[i])
                  .sort()
                  .join(", ")}.`),
                (r =
                  d > 0
                    ? `${r}\nWARNING! If your code uses features of the above web components, unavailable in ${u.description}, it might not work as expected!`
                    : `${r}\nSince the above web components were defined by the same or newer version runtime, they should be compatible with your code.`);
            }),
            (r = `${r}\n\nTo prevent other runtimes from defining tags that you use, consider using scoping or have third-party libraries use scoping: https://github.com/SAP/ui5-webcomponents/blob/master/docs/2-advanced/03-scoping.md.`),
            console.warn(r);
        };
      },
      { "./util/setToArray.js": "TK0G", "./getSharedResource.js": "J0dU", "./Runtimes.js": "e2vJ" },
    ],
    r5Rx: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.renderImmediately = exports.renderFinished = exports.renderDeferred = exports.reRenderAllUI5Elements = exports.detachBeforeComponentRender = exports.cancelRender = exports.attachBeforeComponentRender = void 0);
        var e = o(require("./EventProvider.js")),
          t = o(require("./RenderQueue.js")),
          r = require("./CustomElementsRegistry.js"),
          n = require("./locale/RTLAwareRegistry.js");
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = new Set(),
          a = new e.default(),
          d = new t.default();
        let i, c, m, l;
        const p = async (e) => {
          d.add(e), await f();
        };
        exports.renderDeferred = p;
        const u = (e) => {
          a.fireEvent("beforeComponentRender", e), s.add(e), e._render();
        };
        exports.renderImmediately = u;
        const w = (e) => {
          d.remove(e), s.delete(e);
        };
        exports.cancelRender = w;
        const f = async () => {
            l ||
              (l = new Promise((e) => {
                window.requestAnimationFrame(() => {
                  d.process(u),
                    (l = null),
                    e(),
                    m ||
                      (m = setTimeout(() => {
                        (m = void 0), d.isEmpty() && v();
                      }, 200));
                });
              })),
              await l;
          },
          R = () =>
            i ||
            (i = new Promise((e) => {
              (c = e),
                window.requestAnimationFrame(() => {
                  d.isEmpty() && ((i = void 0), e());
                });
            })),
          g = () => {
            const e = (0, r.getAllRegisteredTags)().map((e) => customElements.whenDefined(e));
            return Promise.all(e);
          },
          x = async () => {
            await g(), await R();
          };
        exports.renderFinished = x;
        const v = () => {
            d.isEmpty() && c && (c(), (c = void 0), (i = void 0));
          },
          h = async (e) => {
            s.forEach((t) => {
              const r = t.constructor.getMetadata().getTag(),
                o = (0, n.isRtlAware)(t.constructor),
                s = t.constructor.getMetadata().isLanguageAware(),
                a = t.constructor.getMetadata().isThemeAware();
              (!e || e.tag === r || (e.rtlAware && o) || (e.languageAware && s) || (e.themeAware && a)) && p(t);
            }),
              await x();
          };
        exports.reRenderAllUI5Elements = h;
        const y = (e) => {
          a.attachEvent("beforeComponentRender", e);
        };
        exports.attachBeforeComponentRender = y;
        const A = (e) => {
          a.detachEvent("beforeComponentRender", e);
        };
        exports.detachBeforeComponentRender = A;
      },
      {
        "./EventProvider.js": "vNEW",
        "./RenderQueue.js": "E26R",
        "./CustomElementsRegistry.js": "ZaaC",
        "./locale/RTLAwareRegistry.js": "WhUZ",
      },
    ],
    HvAB: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.registerThemePropertiesLoader = exports.registerThemeProperties = exports.isThemeRegistered = exports.getThemeProperties = exports.getRegisteredPackages = void 0);
        var e = require("../generated/AssetParameters.js");
        const r = new Map(),
          t = new Map(),
          s = new Set(),
          o = new Set(),
          i = (e, r, t) => {
            throw new Error(
              "`registerThemeProperties` has been depracated. Use `registerThemePropertiesLoader` instead."
            );
          };
        exports.registerThemeProperties = i;
        const a = (e, r, i) => {
          t.set(`${e}/${r}`, i), s.add(e), o.add(r);
        };
        exports.registerThemePropertiesLoader = a;
        const n = async (s, i) => {
          const a = r.get(`${s}_${i}`);
          if (void 0 !== a) return a;
          if (!o.has(i)) {
            const t = [...o.values()].join(", ");
            return (
              console.warn(
                `You have requested a non-registered theme - falling back to ${e.DEFAULT_THEME}. Registered themes are: ${t}`
              ),
              r.get(`${s}_${e.DEFAULT_THEME}`)
            );
          }
          const n = t.get(`${s}/${i}`);
          if (!n) return void console.error(`Theme [${i}] not registered for package [${s}]`);
          let g;
          try {
            g = await n(i);
          } catch (p) {
            return void console.error(s, p.message);
          }
          const d = g._ || g;
          return r.set(`${s}_${i}`, d), d;
        };
        exports.getThemeProperties = n;
        const g = () => s;
        exports.getRegisteredPackages = g;
        const d = (e) => o.has(e);
        exports.isThemeRegistered = d;
      },
      { "../generated/AssetParameters.js": "F8cn" },
    ],
    pjKU: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.updateStyle = exports.removeStyle = exports.hasStyle = exports.createStyle = exports.createOrUpdateStyle = void 0);
        var e = d(require("./util/createStyleInHead.js")),
          t = d(require("./util/createLinkInHead.js")),
          o = require("./CSP.js");
        function d(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const l = (e, t) => (t ? `${e}|${t}` : e),
          s = (d, s, n = "") => {
            const r = "string" == typeof d ? d : d.content;
            if ((0, o.shouldUseLinks)()) {
              const e = {};
              e[s] = n;
              const l = (0, o.getUrl)(d.packageName, d.fileName);
              (0, t.default)(l, e);
            } else if (document.adoptedStyleSheets) {
              const e = new CSSStyleSheet();
              e.replaceSync(r),
                (e._ui5StyleId = l(s, n)),
                (document.adoptedStyleSheets = [...document.adoptedStyleSheets, e]);
            } else {
              const t = {};
              (t[s] = n), (0, e.default)(r, t);
            }
          };
        exports.createStyle = s;
        const n = (e, t, d = "") => {
          const s = "string" == typeof e ? e : e.content;
          (0, o.shouldUseLinks)()
            ? (document.querySelector(`head>link[${t}="${d}"]`).href = (0, o.getUrl)(e.packageName, e.fileName))
            : document.adoptedStyleSheets
            ? document.adoptedStyleSheets.find((e) => e._ui5StyleId === l(t, d)).replaceSync(s || "")
            : (document.querySelector(`head>style[${t}="${d}"]`).textContent = s || "");
        };
        exports.updateStyle = n;
        const r = (e, t = "") =>
          (0, o.shouldUseLinks)()
            ? !!document.querySelector(`head>link[${e}="${t}"]`)
            : document.adoptedStyleSheets
            ? !!document.adoptedStyleSheets.find((o) => o._ui5StyleId === l(e, t))
            : !!document.querySelector(`head>style[${e}="${t}"]`);
        exports.hasStyle = r;
        const c = (e, t = "") => {
          if ((0, o.shouldUseLinks)()) {
            const o = document.querySelector(`head>link[${e}="${t}"]`);
            o && o.parentElement.removeChild(o);
          } else if (document.adoptedStyleSheets)
            document.adoptedStyleSheets = document.adoptedStyleSheets.filter((o) => o._ui5StyleId !== l(e, t));
          else {
            const o = document.querySelector(`head > style[${e}="${t}"]`);
            o && o.parentElement.removeChild(o);
          }
        };
        exports.removeStyle = c;
        const S = (e, t, o = "") => {
          r(t, o) ? n(e, t, o) : s(e, t, o);
        };
        exports.createOrUpdateStyle = S;
      },
      { "./util/createStyleInHead.js": "byga", "./util/createLinkInHead.js": "uxMq", "./CSP.js": "TlaO" },
    ],
    jbyy: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.fireThemeLoaded = exports.detachThemeLoaded = exports.attachThemeLoaded = void 0);
        var e = t(require("../EventProvider.js"));
        function t(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const d = new e.default(),
          o = "themeLoaded",
          a = (e) => {
            d.attachEvent(o, e);
          };
        exports.attachThemeLoaded = a;
        const r = (e) => {
          d.detachEvent(o, e);
        };
        exports.detachThemeLoaded = r;
        const s = (e) => d.fireEvent(o, e);
        exports.fireThemeLoaded = s;
      },
      { "../EventProvider.js": "vNEW" },
    ],
    RNxW: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("../asset-registries/Themes.js"),
          t = require("../ManagedStyles.js"),
          r = i(require("./getThemeDesignerTheme.js")),
          a = require("./ThemeLoaded.js"),
          s = require("../FeaturesRegistry.js");
        function i(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const o = "@ui5/webcomponents-theming",
          n = () => {
            return (0, e.getRegisteredPackages)().has(o);
          },
          u = async (r) => {
            if (!(0, e.getRegisteredPackages)().has(o)) return;
            const a = await (0, e.getThemeProperties)(o, r);
            a && (0, t.createOrUpdateStyle)(a, "data-ui5-theme-properties", o);
          },
          d = () => {
            (0, t.removeStyle)("data-ui5-theme-properties", o);
          },
          c = async (r) => {
            (0, e.getRegisteredPackages)().forEach(async (a) => {
              if (a === o) return;
              const s = await (0, e.getThemeProperties)(a, r);
              s && (0, t.createOrUpdateStyle)(s, "data-ui5-theme-properties", a);
            });
          },
          m = () => {
            const e = (0, r.default)();
            if (e) return e;
            const t = (0, s.getFeature)("OpenUI5Support");
            if (t) {
              if (t.cssVariablesLoaded()) return { themeName: t.getConfigurationSettingsObject().theme };
            }
          },
          g = async (r) => {
            const s = m();
            s && r === s.themeName ? (0, t.removeStyle)("data-ui5-theme-properties", o) : await u(r);
            const i = (0, e.isThemeRegistered)(r) ? r : s && s.baseThemeName;
            await c(i), (0, a.fireThemeLoaded)(r);
          };
        var h = g;
        exports.default = h;
      },
      {
        "../asset-registries/Themes.js": "HvAB",
        "../ManagedStyles.js": "pjKU",
        "./getThemeDesignerTheme.js": "wrBv",
        "./ThemeLoaded.js": "jbyy",
        "../FeaturesRegistry.js": "rnHX",
      },
    ],
    ojY9: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.setTheme = exports.isThemeFamily = exports.isTheme = exports.getTheme = void 0);
        var e = require("../InitialConfiguration.js"),
          t = require("../Render.js"),
          s = r(require("../theming/applyTheme.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        let i;
        const o = () => (void 0 === i && (i = (0, e.getTheme)()), i);
        exports.getTheme = o;
        const n = async (e) => {
          i !== e && ((i = e), await (0, s.default)(i), await (0, t.reRenderAllUI5Elements)({ themeAware: !0 }));
        };
        exports.setTheme = n;
        const a = (e) => {
          const t = o();
          return t === e || t === `${e}_exp`;
        };
        exports.isTheme = a;
        const m = (e) => o().startsWith(e);
        exports.isThemeFamily = m;
      },
      { "../InitialConfiguration.js": "qbGl", "../Render.js": "r5Rx", "../theming/applyTheme.js": "RNxW" },
    ],
    Zwmo: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.setDefaultIconCollection = exports.getEffectiveDefaultIconCollection = exports.getDefaultIconCollection = void 0);
        var e = require("./Theme.js");
        const t = new Map(),
          o = (e, o) => {
            "horizon" === o && (o = "SAP-icons-v5"), t.set(e, o);
          };
        exports.setDefaultIconCollection = o;
        const n = (e) => t.get(e);
        exports.getDefaultIconCollection = n;
        const c = () => {
          const o = (0, e.getTheme)(),
            n = t.get(o);
          return n || ((0, e.isThemeFamily)("sap_horizon") ? "SAP-icons-v5" : "SAP-icons");
        };
        exports.getEffectiveDefaultIconCollection = c;
      },
      { "./Theme.js": "ojY9" },
    ],
    lg1E: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.registerIconLoader = exports.registerIconBundle = exports.registerIcon = exports.getIconDataSync = exports.getIconData = exports._getRegisteredNames = void 0);
        var e = o(require("../getSharedResource.js")),
          t = o(require("../assets-meta/IconCollectionsAlias.js")),
          r = require("../config/Icons.js");
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const a = new Map(),
          s = (0, e.default)("SVGIcons.registry", new Map()),
          c = (0, e.default)("SVGIcons.promises", new Map()),
          n = "ICON_NOT_FOUND",
          i = async (e, t) => {
            throw new Error("This method has been removed. Use `registerIconLoader` instead.");
          };
        exports.registerIconBundle = i;
        const l = async (e, t) => {
          a.set(e, t);
        };
        exports.registerIconLoader = l;
        const g = async (e) => {
            if (!c.has(e)) {
              if (!a.has(e))
                throw new Error(
                  `No loader registered for the ${e} icons collection. Probably you forgot to import the "AllIcons.js" module for the respective package.`
                );
              const t = a.get(e);
              c.set(e, t(e));
            }
            return c.get(e);
          },
          p = (e) => {
            Object.keys(e.data).forEach((t) => {
              const r = e.data[t];
              d(t, {
                pathData: r.path,
                ltr: r.ltr,
                accData: r.acc,
                collection: e.collection,
                packageName: e.packageName,
              });
            });
          },
          d = (e, { pathData: t, ltr: o, accData: a, collection: c, packageName: n } = {}) => {
            c || (c = (0, r.getEffectiveDefaultIconCollection)());
            const i = `${c}/${e}`;
            s.set(i, { pathData: t, ltr: o, accData: a, packageName: n });
          };
        exports.registerIcon = d;
        const u = (e) => {
            let t;
            return (
              e.startsWith("sap-icon://") && (e = e.replace("sap-icon://", "")),
              ([e, t] = e.split("/").reverse()),
              (t = t || (0, r.getEffectiveDefaultIconCollection)()),
              (t = I(t)),
              { name: (e = e.replace("icon-", "")), collection: t, registryKey: `${t}/${e}` }
            );
          },
          f = (e) => {
            const { registryKey: t } = u(e);
            return s.get(t);
          };
        exports.getIconDataSync = f;
        const y = async (e) => {
          const { collection: t, registryKey: r } = u(e);
          let o = n;
          try {
            o = await g(t);
          } catch (a) {
            console.error(a.message);
          }
          return o === n ? o : (s.has(r) || p(o), s.get(r));
        };
        exports.getIconData = y;
        const h = async () => (
          await y("edit"), await y("tnt/arrow"), await y("business-suite/3d"), Array.from(s.keys())
        );
        exports._getRegisteredNames = h;
        const I = (e) => (t.default[e] ? t.default[e] : e);
      },
      {
        "../getSharedResource.js": "J0dU",
        "../assets-meta/IconCollectionsAlias.js": "ODfo",
        "../config/Icons.js": "Zwmo",
      },
    ],
    QZhG: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const t = "paste",
          s =
            "M427 244q11 0 17.5 6.5T451 268v219q0 11-6.5 17.5T427 511H232q-24 0-24-24V268q0-24 24-24h195zm-25 48H256v171h146V292zm-97 73q-24 0-24-24t24-24h49q11 0 17.5 6.5T378 341t-6.5 17.5T354 365h-49zm0 73q-24 0-24-24t24-24h49q11 0 17.5 6.5T378 414t-6.5 17.5T354 438h-49zm49-316q0 24-25 24H183q-11 0-17.5-6.5T159 122V98h-49v340h25q11 0 17.5 7t6.5 18-6.5 17.5T135 487H86q-11 0-17.5-6.5T62 463V73q0-11 6.5-17.5T86 49h73V25q0-11 6.5-18T183 0h146q25 0 25 25v97zm-49-73h-97v49h97V49z",
          a = !1,
          o = "SAP-icons-v5",
          q = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(t, { pathData: s, ltr: !1, collection: o, packageName: q });
        var r = { pathData: s };
        exports.default = r;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "lg1E" },
    ],
    DUkK: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var t = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js");
        const e = "paste",
          q =
            "M32 96q0-14 9.5-23T65 64h65q11-28 38-32 8-14 23-23t33-9q17 0 32 9t23 23q27 4 38 32h67q13 0 22 9t9 23v64h-31V96h-68q-5 12-12.5 22T281 128H166q-15 0-22.5-10T131 96H65v384h95v32H65q-14 0-23.5-9.5T32 480V96zm143 0h96q7 0 11.5-5t4.5-11q0-16-16-16h-15q0-14-9.5-23T224 32q-14 0-23 9t-9 23h-17q-6 0-11 4.5T159 80q0 6 5 11t11 5zm17 128q0-14 9-23t23-9h224q13 0 22.5 9t9.5 23v256q0 13-9.5 22.5T448 512H224q-14 0-23-9.5t-9-22.5V224zm32 256h224V224H224v256zm48-160h128q16 0 16 16 0 6-4.5 11t-11.5 5H272q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5zm0 63h128q16 0 16 16 0 6-4.5 11t-11.5 5H272q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5z",
          s = !1,
          a = "SAP-icons",
          o = "@ui5/webcomponents-icons";
        (0, t.registerIcon)(e, { pathData: q, ltr: !1, collection: a, packageName: o });
        var r = { pathData: q };
        exports.default = r;
      },
      { "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "lg1E" },
    ],
    trzu: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/config/Theme.js"),
          t = r(require("./v5/paste.js")),
          s = r(require("./v4/paste.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const a = (0, e.isThemeFamily)("sap_horizon") ? s.default : t.default;
        var u = { pathData: a };
        exports.default = u;
      },
      { "@ui5/webcomponents-base/dist/config/Theme.js": "ojY9", "./v5/paste.js": "QZhG", "./v4/paste.js": "DUkK" },
    ],
    SHsO: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js"),
          t = require("../generated/i18n/i18n-defaults.js");
        const s = "message-success",
          a =
            "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zM128 256q-14 0-23 9t-9 23q0 12 9 23l64 64q11 9 23 9 13 0 23-9l192-192q9-11 9-23 0-13-9.5-22.5T384 128q-12 0-23 9L192 307l-41-42q-10-9-23-9z",
          c = !0,
          r = t.ICON_MESSAGE_SUCCESS,
          o = "SAP-icons-v5",
          i = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(s, { pathData: a, ltr: !0, accData: r, collection: o, packageName: i });
        var n = { pathData: a, accData: r };
        exports.default = n;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "lg1E",
        "../generated/i18n/i18n-defaults.js": "U0YU",
      },
    ],
    lbbx: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var t = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js"),
          e = require("../generated/i18n/i18n-defaults.js");
        const s = "message-success",
          a =
            "M512 256q0 54-20 100.5t-54.5 81T356 492t-100 20q-54 0-100.5-20t-81-55T20 355.5 0 256t20.5-100 55-81.5T157 20t99-20q53 0 100 20t81.5 54.5T492 156t20 100zm-32 0q0-47-17.5-87.5t-48-71-71.5-48T256 32t-87 18-71.5 48.5-48 71T32 256q0 47 17.5 88t48 71 71.5 47.5 87 17.5q47 0 88-17.5t71-47.5 47.5-71 17.5-88zm-97-93q2 2 2 4t-1 4L248 382q-3 3-6 3t-4-1l-107-90q-3-2-3-4t2-5l27-38q2-3 5-3 2 0 4 2l65 49q2 1 5 1 4 0 5-3l99-162q2-4 6-4 2 0 4 2z",
          c = !0,
          r = e.ICON_MESSAGE_SUCCESS,
          o = "SAP-icons",
          i = "@ui5/webcomponents-icons";
        (0, t.registerIcon)(s, { pathData: a, ltr: !0, accData: r, collection: o, packageName: i });
        var n = { pathData: a, accData: r };
        exports.default = n;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "lg1E",
        "../generated/i18n/i18n-defaults.js": "U0YU",
      },
    ],
    M349: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/config/Theme.js"),
          s = r(require("./v5/message-success.js")),
          t = r(require("./v4/message-success.js"));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const u = (0, e.isThemeFamily)("sap_horizon") ? t.default : s.default;
        var a = { pathData: u };
        exports.default = a;
      },
      {
        "@ui5/webcomponents-base/dist/config/Theme.js": "ojY9",
        "./v5/message-success.js": "SHsO",
        "./v4/message-success.js": "lbbx",
      },
    ],
    NQfe: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js"),
          t = require("../generated/i18n/i18n-defaults.js");
        const a = "error",
          s =
            "M375 183q9-11 9-23 0-13-9-23-10-9-23-9-12 0-23 9l-73 74-73-74q-10-9-23-9-12 0-23 9-9 10-9 23 0 12 9 23l74 73-74 73q-9 10-9 23 0 12 9 23 11 9 23 9 13 0 23-9l73-74 73 74q11 9 23 9 13 0 23-9 9-11 9-23 0-13-9-23l-74-73zM256 512q-53 0-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0t99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20z",
          r = !1,
          o = t.ICON_ERROR,
          c = "SAP-icons-v5",
          i = "@ui5/webcomponents-icons";
        (0, e.registerIcon)(a, { pathData: s, ltr: !1, accData: o, collection: c, packageName: i });
        var n = { pathData: s, accData: o };
        exports.default = n;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "lg1E",
        "../generated/i18n/i18n-defaults.js": "U0YU",
      },
    ],
    G3re: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var t = require("@ui5/webcomponents-base/dist/asset-registries/Icons.js"),
          e = require("../generated/i18n/i18n-defaults.js");
        const a = "error",
          s =
            "M512 256q0 53-20.5 100t-55 81.5-81 54.5-99.5 20-100-20.5-81.5-55T20 355 0 256q0-54 20-100.5t55-81T156.5 20 256 0t99.5 20T437 75t55 81.5 20 99.5zM399 364q3-3 3-6t-3-6l-86-86q-3-3-3-6t3-6l81-81q3-3 3-6t-3-6l-37-37q-2-2-6-2t-6 2l-83 82q-1 3-6 3-3 0-6-3l-84-83q-1-2-6-2-4 0-6 2l-37 37q-3 3-3 6t3 6l83 82q3 3 3 6t-3 6l-83 82q-2 2-2.5 4.5l-.5 2.5q0 3 3 5l36 37q4 2 6 2 4 0 6-2l85-84q2-2 6-2t6 2l88 88q4 2 6 2t6-2z",
          r = !1,
          l = e.ICON_ERROR,
          o = "SAP-icons",
          q = "@ui5/webcomponents-icons";
        (0, t.registerIcon)(a, { pathData: s, ltr: !1, accData: l, collection: o, packageName: q });
        var c = { pathData: s, accData: l };
        exports.default = c;
      },
      {
        "@ui5/webcomponents-base/dist/asset-registries/Icons.js": "lg1E",
        "../generated/i18n/i18n-defaults.js": "U0YU",
      },
    ],
    C5Lt: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.default = void 0);
        var e = require("@ui5/webcomponents-base/dist/config/Theme.js"),
          r = o(require("./v5/error.js")),
          t = o(require("./v4/error.js"));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const s = (0, e.isThemeFamily)("sap_horizon") ? t.default : r.default;
        var u = { pathData: s };
        exports.default = u;
      },
      { "@ui5/webcomponents-base/dist/config/Theme.js": "ojY9", "./v5/error.js": "NQfe", "./v4/error.js": "G3re" },
    ],
    tDas: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.RpcCommon = void 0);
        var e = function (e, s, t, o) {
          return new (t || (t = Promise))(function (n, i) {
            function r(e) {
              try {
                h(o.next(e));
              } catch (s) {
                i(s);
              }
            }
            function a(e) {
              try {
                h(o.throw(e));
              } catch (s) {
                i(s);
              }
            }
            function h(e) {
              var s;
              e.done
                ? n(e.value)
                : ((s = e.value),
                  s instanceof t
                    ? s
                    : new t(function (e) {
                        e(s);
                      })).then(r, a);
            }
            h((o = o.apply(e, s || [])).next());
          });
        };
        class s {
          constructor(e) {
            (this.timeout = 36e5),
              (this.promiseCallbacks = new Map()),
              (this.methods = new Map()),
              (this.baseLogger = e.getChildLogger({ label: "RpcCommon" })),
              this.registerMethod({ func: this.listLocalMethods, thisArg: this });
          }
          setResponseTimeout(e) {
            this.timeout = e;
          }
          registerMethod(e) {
            this.methods.set(e.name ? e.name : e.func.name, e);
          }
          unregisterMethod(e) {
            this.methods.delete(e.name ? e.name : e.func.name);
          }
          listLocalMethods() {
            return Array.from(this.methods.keys());
          }
          listRemoteMethods() {
            return this.invoke("listLocalMethods");
          }
          invoke(e, s) {
            const t = Math.random(),
              o = new Promise((e, s) => {
                this.promiseCallbacks.set(t, { resolve: e, reject: s });
              });
            return this.sendRequest(t, e, s), o;
          }
          handleResponse(e) {
            const s = this.promiseCallbacks.get(e.id);
            s &&
              (this.baseLogger.trace(
                `handleResponse: processing response for id: ${e.id} message success flag is: ${e.success}`
              ),
              e.success
                ? s.resolve(e.response)
                : (this.baseLogger.warn(`handleResponse: Message id ${e.id} rejected, response: ${e.response}`),
                  s.reject(e.response)),
              this.promiseCallbacks.delete(e.id));
          }
          handleRequest(s) {
            return e(this, void 0, void 0, function* () {
              const e = this.methods.get(s.method);
              if (
                (this.baseLogger.trace(
                  `handleRequest: processing request id: ${s.id} method: ${s.method} parameters: ${JSON.stringify(
                    s.params
                  )}`
                ),
                e)
              ) {
                const o = e.func,
                  n = e.thisArg;
                try {
                  let e = o.apply(n, s.params);
                  e && "function" == typeof e.then && (e = yield e), this.sendResponse(s.id, e);
                } catch (t) {
                  this.baseLogger.error(`handleRequest: Failed processing request ${s.command} id: ${s.id}`, {
                    error: t,
                  }),
                    this.sendResponse(s.id, t, !1);
                }
              }
            });
          }
        }
        exports.RpcCommon = s;
      },
      {},
    ],
    okmu: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.noopLogger = void 0);
        const e = () => {},
          o = {
            fatal: e,
            error: e,
            warn: e,
            info: e,
            debug: e,
            trace: e,
            getChildLogger: function () {
              return o;
            },
          };
        exports.noopLogger = o;
      },
      {},
    ],
    Tg0O: [
      function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }), (exports.RpcBrowser = void 0);
        var e = require("./rpc-common.js"),
          s = require("./noop-logger.js");
        class t extends e.RpcCommon {
          constructor(e, o, r = s.noopLogger) {
            super(r.getChildLogger({ label: t.className })),
              (this.logger = r.getChildLogger({ label: t.className })),
              (this.window = e),
              (this.vscode = o),
              (this.host = void 0),
              this.window.addEventListener("message", (e) => {
                const s = e.data;
                switch ((this.logger.debug(`Event Listener: Received event: ${JSON.stringify(s)}`), s.command)) {
                  case "rpc-response":
                    this.handleResponse(s);
                    break;
                  case "rpc-request":
                    this.handleRequest(s);
                }
              });
          }
          setHost(e) {
            this.host = e;
          }
          sendRequest(e, s, t) {
            setTimeout(() => {
              const s = this.promiseCallbacks.get(e);
              s && (s.reject("Request timed out"), this.promiseCallbacks.delete(e));
            }, this.timeout),
              this.vscode.postMessage({ command: "rpc-request", id: e, method: s, params: t }, this.host);
          }
          sendResponse(e, s, t = !0) {
            this.vscode.postMessage({ command: "rpc-response", id: e, response: s, success: t }, this.host);
          }
        }
        (exports.RpcBrowser = t), (t.className = "RpcBrowser");
      },
      { "./rpc-common.js": "tDas", "./noop-logger.js": "okmu" },
    ],
    zqrw: [
      function (require, module, exports) {
        "use strict";
        require("@ui5/webcomponents/dist/Title"),
          require("@ui5/webcomponents/dist/Panel"),
          require("@ui5/webcomponents/dist/Label"),
          require("@ui5/webcomponents/dist/Input"),
          require("@ui5/webcomponents/dist/RadioButton"),
          require("@ui5/webcomponents/dist/RadioButtonGroup"),
          require("@ui5/webcomponents/dist/Link"),
          require("@ui5/webcomponents/dist/MessageStrip"),
          require("@ui5/webcomponents/dist/Select"),
          require("@ui5/webcomponents/dist/Option"),
          require("@ui5/webcomponents/dist/Button"),
          require("@ui5/webcomponents/dist/BusyIndicator"),
          require("@ui5/webcomponents-icons/dist/paste.js"),
          require("@ui5/webcomponents-icons/dist/message-success.js"),
          require("@ui5/webcomponents-icons/dist/error.js");
        var e = require("/node_modules/@sap-devx/webview-rpc/out.browser/rpc-browser.js");
        function n() {
          (window.onload = function (e) {
            window.rpc.invoke("init").then(function (e) {
              t(e.defaultEndpoint),
                o(e.isLoggedIn),
                i(!e.isLoggedIn),
                e.passcodeUrl && (document.getElementById("passcodeLink").href = e.passcodeUrl),
                document.getElementById("orgSelect").addEventListener("change", function (n) {
                  s(n.detail.selectedOption.value), c(e);
                }),
                document.getElementById("spaceSelect").addEventListener("change", function (n) {
                  c(e);
                }),
                document.getElementById("targetBtn").addEventListener("click", r);
            });
          }),
            o(!1),
            i(!1),
            document.getElementById("radioSSO").addEventListener("change", function (e) {
              (document.getElementById("credentials-div").style.display = "none"),
                (document.getElementById("sso-div").style.display = "");
            }),
            document.getElementById("radioCredentials").addEventListener("change", function (e) {
              (document.getElementById("credentials-div").style.display = ""),
                (document.getElementById("sso-div").style.display = "none");
            }),
            document.getElementById("loginBtn").addEventListener("click", function () {
              var e = {};
              (e.endpoint = document.getElementById("endpointInput").value),
                document.getElementById("radioSSO").checked
                  ? (e.ssoPasscode = document.getElementById("passcodeInput").value)
                  : ((e.user = document.getElementById("usernameInput").value),
                    (e.password = document.getElementById("passwordInput").value)),
                window.rpc.invoke("loginClick", [e]).then(function (e) {
                  e && (o(!0), i(!1));
                });
            }),
            document.getElementById("logoutBtn").addEventListener("click", function () {
              window.rpc.invoke("logoutClick", [{}]).then(function (e) {
                e && (o(!1), i(!0));
              });
            }),
            document.getElementById("pasteIcon").addEventListener("click", function () {
              navigator.clipboard.readText().then(function (e) {
                return (document.getElementById("passcodeInput").value = e);
              });
            });
        }
        function t(e) {
          e &&
            ((document.getElementById("endpointInput").value = e),
            (document.getElementById("endpointLabel").innerHTML = e));
        }
        function o(e) {
          for (var n = document.getElementsByClassName("loggedIn"), t = 0; t < n.length; t++)
            n.item(t).style.display = e ? "" : "none";
          d();
        }
        function i(e) {
          for (var n = document.getElementsByClassName("notLoggedIn"), t = 0; t < n.length; t++)
            n.item(t).style.display = e ? "" : "none";
        }
        function d() {
          window.rpc.invoke("getSelectedTarget").then(function (e) {
            c(e),
              window.rpc.invoke("getOrgs").then(function (n) {
                for (var t = document.getElementById("orgSelect"); t.firstChild; ) t.removeChild(t.firstChild);
                var o = !1;
                n.forEach(function (n) {
                  n.label == e.org && ((o = !0), s(n.guid, e.space)),
                    t.appendChild(new Option(n.label, n.guid, !1, n.label == e.org));
                }),
                  !o && n && n.length > 0 && s(n[0].guid, e.space);
              });
          });
        }
        function c(e) {
          var n,
            t,
            o = document.getElementById("targetMessage"),
            i = document.getElementById("targetBtn");
          e && e.org && e.space
            ? ((o.innerText = "Organization and space are set to ".concat(e.org, " / ").concat(e.space)),
              (o.style.visibility = ""))
            : (o.style.visibility = "none");
          var d = null === (n = u(document.getElementById("orgSelect"))) || void 0 === n ? void 0 : n.label,
            c = null === (t = u(document.getElementById("spaceSelect"))) || void 0 === t ? void 0 : t.label;
          d === e.org && c === e.org ? (i.disabled = !0) : (i.disabled = !1);
        }
        function s(e, n) {
          window.rpc.invoke("getSpaces", [e]).then(function (e) {
            for (var t = document.getElementById("spaceSelect"); t.firstChild; ) t.removeChild(t.firstChild);
            e.forEach(function (e) {
              var o = void 0 !== n && e.label === n;
              t.appendChild(new Option(e.label, e.guid, !1, o));
            });
          });
        }
        function r() {
          var e = u(document.getElementById("orgSelect")).label,
            n = u(document.getElementById("spaceSelect")).label;
          window.rpc.invoke("applyTarget", [e, n]).then(function () {
            c({ org: e, space: n });
          });
        }
        function u(e) {
          var n;
          return (
            e.options.forEach(function (e) {
              e.selected && (n = e);
            }),
            n
          );
        }
        function l(e) {
          return (document.getElementById("busyIndicator").active = e), "return nothing";
        }
        var a = acquireVsCodeApi();
        (window.rpc = new e.RpcBrowser(window, a)),
          window.rpc.registerMethod({ func: l, thisArg: void 0, name: "showProgress" }),
          n();
      },
      {
        "@ui5/webcomponents/dist/Title": "Figp",
        "@ui5/webcomponents/dist/Panel": "Yg41",
        "@ui5/webcomponents/dist/Label": "CXe7",
        "@ui5/webcomponents/dist/Input": "ItHX",
        "@ui5/webcomponents/dist/RadioButton": "LdU0",
        "@ui5/webcomponents/dist/RadioButtonGroup": "eZ0Q",
        "@ui5/webcomponents/dist/Link": "yLPi",
        "@ui5/webcomponents/dist/MessageStrip": "bd39",
        "@ui5/webcomponents/dist/Select": "jdyY",
        "@ui5/webcomponents/dist/Option": "QT6c",
        "@ui5/webcomponents/dist/Button": "PQe6",
        "@ui5/webcomponents/dist/BusyIndicator": "djiq",
        "@ui5/webcomponents-icons/dist/paste.js": "trzu",
        "@ui5/webcomponents-icons/dist/message-success.js": "M349",
        "@ui5/webcomponents-icons/dist/error.js": "C5Lt",
        "/node_modules/@sap-devx/webview-rpc/out.browser/rpc-browser.js": "Tg0O",
      },
    ],
  },
  {},
  ["zqrw"],
  null
);
//# sourceMappingURL=/mainui.735c7c69.js.map
