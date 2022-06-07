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
  },
  {},
  ["tDas"],
  null
);
//# sourceMappingURL=/rpc-common.8219231f.js.map
