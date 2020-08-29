/*! d1-web v2.0.0 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _default = /*#__PURE__*/function () {
  function _default(name) {
    _classCallCheck(this, _default);

    this.app = null;
    this.name = name || 'plugin';
    this.opt = {};
  }

  _createClass(_default, [{
    key: "install",
    value: function install(app, opt) {
      var _this = this;

      this.app = app;
      if (opt) Object.keys(opt).forEach(function (k) {
        return _this.opt[k] = opt[k];
      });
      this.init();
    }
  }, {
    key: "init",
    value: function init() {
      console.log('plugin.init()');
    }
  }]);

  return _default;
}();



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*! app - core of d1-web */
// (() => {
//let main = new (function(){
var _default = /*#__PURE__*/function () {
  function _default() {
    _classCallCheck(this, _default);

    this.sequence = 0;
    this.plugins = {};
    this.handlers = {};
    this.opt = {
      debug: 0,
      cAct: 'act',
      cHide: 'hide',
      cToggle: 'toggle',
      cOff: 'off',
      cClose: 'close',
      cJs: 'js',
      hClose: '#cancel',
      hOk: '#ok',
      sCancel: 'Cancel',
      sOk: 'OK'
    };
  }

  _createClass(_default, [{
    key: "init",
    value: function init(opt) {
      var _this = this;

      document.body.classList.add(this.opt.cJs); // prepare body: anti-hover, anti-target

      this.fire('beforeopt'); //options

      if (!opt) {
        opt = document.body.dataset.d1;
        if (opt) opt = this.parse(opt);
      }

      this.setOpt(opt);
      this.dbg(['opt', this.opt]);
      this.initPlugins(opt); // plugins
      // bind events

      this.b([window], 'hashchange', function (e) {
        return _this.on('hashchange', e);
      }); // on window

      this.b([document], ['invalid', 'focus', 'blur'], function (e) {
        return _this.on(e.type, e);
      }, true); //useCapture

      this.b([document], ['click', 'keydown', 'input', 'change', 'submit'], function (e) {
        return _this.on(e.type, e);
      });
      if (location.hash) this.on('hashchange');
      this.fire('after');
      this.fire('ready');
    } // event delegation
    // https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/

  }, {
    key: "on",
    value: function on(t, e) {
      this.fire('before', e);
      this.fire(t, e); //this.fire(t + 'ed', e);
      //if(!e || !e.defaultPrevented) ;

      this.fire('after', e);
    } //plugins

  }, {
    key: "setOpt",
    value: function setOpt(opt) {
      var _this2 = this;

      if (opt) Object.keys(opt).filter(function (k) {
        return k != 'plug';
      }).forEach(function (k) {
        return _this2.opt[k] = opt[k];
      });
    }
  }, {
    key: "plug",
    value: function plug(c, n) {
      var p = new c();
      this.plugins[n || p.name] = p;
    }
  }, {
    key: "initPlugins",
    value: function initPlugins(opt) {
      var _this3 = this;

      if (this.opt.disable) this.opt.disable.forEach(function (p) {
        return delete _this3.plugins[p];
      });
      this.dbg(['plugins', this.plugins]);
      this.fire('beforeinit');
      Object.keys(this.plugins).forEach(function (k) {
        var _opt$plug;

        return _this3.plugins[k].install(_this3, opt === null || opt === void 0 ? void 0 : (_opt$plug = opt.plug) === null || _opt$plug === void 0 ? void 0 : _opt$plug[k]);
      });
      this.fire('afterinit');
    } // call method of plugin

  }, {
    key: "pf",
    value: function pf(p, f) {
      var _this$plugins$p;

      for (var _len = arguments.length, a = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        a[_key - 2] = arguments[_key];
      }

      if (this.plugins[p] && this.plugins[p][f]) (_this$plugins$p = this.plugins[p])[f].apply(_this$plugins$p, a);else this.dbg(['no plugin function', p + '.' + f + '()'], -1);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      for (var _len2 = arguments.length, a = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        a[_key2] = arguments[_key2];
      }

      this.pf.apply(this, ['toggle', 'toggle'].concat(a));
    }
  }, {
    key: "fetch",
    value: function fetch() {
      for (var _len3 = arguments.length, a = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        a[_key3] = arguments[_key3];
      }

      this.pf.apply(this, ['fetch', 'fetch'].concat(a));
    }
  }, {
    key: "dialog",
    value: function dialog() {
      for (var _len4 = arguments.length, a = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        a[_key4] = arguments[_key4];
      }

      this.pf.apply(this, ['dialog', 'openDialog'].concat(a));
    } //events

  }, {
    key: "fire",
    value: function fire(et, e) {
      var _this4 = this;

      this.dbg(['fire ' + et, e]);
      if (this.handlers[et]) this.handlers[et].forEach(function (h) {
        return h.call(_this4, e);
      });
    }
  }, {
    key: "listen",
    value: function listen(et, f) {
      //if(!this.handlers[et]) this.handlers[et] = [];
      //this.handlers[et].push(f);
      this.h(et, '', f);
    } //handle

  }, {
    key: "h",
    value: function h(et, s, f, before) {
      var _this5 = this;

      if (et instanceof Array) et.forEach(function (ett) {
        return _this5.h(ett, s, f, before);
      });else {
        if (!this.handlers[et]) this.handlers[et] = [];
        this.handlers[et][before ? 'unshift' : 'push'](function (e) {
          if (s) e.recv = e.target.closest(s);
          if (!s || e.recv) f(e);
        });
      }
    }
  }, {
    key: "dispatch",
    value: function dispatch(n, et, p) {
      // {view: window, bubbles: true, cancelable: true, composed: false}
      if (!p) p = {
        bubbles: true,
        cancelable: true,
        view: window
      };

      if (typeof Event === 'function') {
        //-ie
        if (et instanceof Array) et.forEach(function (ett) {
          return n.dispatchEvent(new Event(ett, p));
        });else n.dispatchEvent(new Event(et, p));
      }
    } //utils
    // debug

  }, {
    key: "isDebug",
    value: function isDebug(l) {
      return this.opt.debug > (l || 0) || location.href.indexOf('d1debug') != -1;
    }
  }, {
    key: "dbg",
    value: function dbg(s, l, e) {
      if (this.isDebug(l)) console[e || l < 0 ? 'error' : 'log'](s);
    } // sequence for IDs of generated nodes

  }, {
    key: "seq",
    value: function seq() {
      return ++this.sequence;
    } // convert to array

  }, {
    key: "a",
    value: function a(c) {
      return c ? Array.prototype.slice.call(c) : c;
    } // find node

  }, {
    key: "q",
    value: function q(s, n) {
      try {
        return (n || document).querySelector(s);
      } catch (e) {
        return null;
      }
    } // find nodes

  }, {
    key: "qq",
    value: function qq(s, n) {
      try {
        var r = (n || document).querySelectorAll(s);
        return this.a(r);
      } catch (e) {
        return [];
      }
    }
  }, {
    key: "next",
    value: function next(n, s, prev) {
      while (n = n[prev ? 'previousElementSibling' : 'nextElementSibling']) {
        if (n.matches(s)) return n;
      }
    }
  }, {
    key: "nn",
    value: function nn(q) {
      if (!q) return [];else if (typeof q === 'string') return this.qq(q);else if (q.tagName) return [q];else return this.a(q);
    } // add event listener

  }, {
    key: "b",
    value: function b(q, et, f, capt) {
      if (!et) this.e(q, f);
      if (f) this.nn(q).forEach(function (n) {
        return et instanceof Array ? et.forEach(function (ett) {
          return n.addEventListener(ett, function (e) {
            return f(e);
          }, capt);
        }) : n.addEventListener(et, function (e) {
          return f(e);
        }
        /*f.bind(this)*/
        , capt);
      });
    } // execute for each node

  }, {
    key: "e",
    value: function e(q, f) {
      var _this6 = this;

      if (f) this.nn(q).forEach(function (n) {
        return f.call(_this6, n);
      });
    }
  }, {
    key: "typeOf",
    value: function typeOf(v) {
      return Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
    }
  }, {
    key: "parse",
    value: function parse(j, def) {
      var r = '';

      try {
        r = JSON.parse(j);
      } catch (e) {
        this.dbg(['JSON parse failed', j], -1);
        r = def === true ? j : def === undefined ? null : def;
      }

      return r;
    } // insert node
    //pos: -1=before, false=prepend, 0=append(default), 1=after

  }, {
    key: "ins",
    value: function ins(tag, t, attrs, n, pos) {
      var c = document.createElement(tag || 'span');
      if (this.typeOf(t) === 'array') t.forEach(function (m) {
        return m.nodeType ? c.appendChild(m) : c.innerHTML += m;
      });else if (t && t.nodeType) c.appendChild(t);else if (t) c.innerHTML = t;

      if (attrs) {
        for (var i in attrs) {
          if (attrs[i] !== null && attrs[i] !== undefined) {
            if (i.match(/-/)) c.setAttribute(i.replace(/^-/, ''), attrs[i]);else c[i] = attrs[i];
          }
        }
      }

      return n ? pos ? n.parentNode.insertBefore(c, pos < 0 ? n : n.nextSibling) : pos === false ? n.insertBefore(c, n.firstChild) : n.appendChild(c) : c;
    } // remove all children

  }, {
    key: "clr",
    value: function clr(n) {
      if (n) while (n.firstChild) {
        n.removeChild(n.firstChild);
      }
    } // insert close link with icon

  }, {
    key: "x",
    value: function x(d, pos, cls) {
      return this.ins('a', this.i('close', '&#x2715;'), {
        href: this.opt.hClose,
        className: cls || ''
      }, d, pos);
    } // insert icon

  }, {
    key: "i",
    value: function i(ico, alt) {
      return this.plugins.icons ? this.plugins.icons.i(ico, alt) : this.ins('span', alt || ico);
    } // get node toggle status

  }, {
    key: "vis",
    value: function vis(n) {
      return !n.classList.contains(this.opt.cOff);
    } // function

  }, {
    key: "throttle",
    value: function throttle(f, ms) {
      var p = false,
          c,
          a;
      return function ff() {
        if (p) {
          //2
          c = this;
          a = arguments;
        } else {
          f.apply(this, arguments); //1

          p = true;
          setTimeout(function () {
            //3
            p = false;

            if (a) {
              ff.apply(c, a);
              a = c = null;
            }
          }, ms);
        }
      };
    }
  }, {
    key: "delay",
    value: function delay(f, ms, skip) {
      var p = null;
      return function ff() {
        var _arguments = arguments,
            _this7 = this;

        if (skip && p) clearTimeout(p);
        p = setTimeout(function () {
          f.apply(_this7, _arguments);
          p = null;
        }, ms);
      };
    }
  }, {
    key: "debounce",
    value: function debounce(f, ms) {
      return this.delay(f, ms, true);
    } // url
    // get url parameter(s) from link node

  }, {
    key: "get",
    value: function get(a, g) {
      if (!a || a.tagName != 'A') return null;
      var i,
          gets = {};
      var args = a.search ? a.search.replace(/^\?/, '').split('&') : [];

      for (i = 0; i < args.length; i++) {
        var v = args[i].split('=');
        gets[v[0]] = decodeURIComponent(v[1]).replace(/\+/, ' ');
      }

      return g ? gets[g] : gets; //protocol, host (hostname, port), pathname, search, hash
    } // compose url from link node or string, with additional parameters

  }, {
    key: "makeUrl",
    value: function makeUrl(a, args) {
      if (!a.tagName) a = this.ins('a', '', {
        href: a
      });
      var g = this.get(a);
      Object.keys(args).forEach(function (k) {
        return g[encodeURIComponent(k)] = encodeURIComponent(args[k]);
      });
      var q = Object.keys(g).map(function (k) {
        return k + '=' + g[k];
      }).join('&');
      return a.host ? a.protocol + '//' + a.host + a.pathname + (q ? '?' + q : '') + a.hash : a.href.replace(/[\?#].*$/, '') + (q ? '?' + q : '') + a.hash; //ie
    }
  }]);

  return _default;
}();
/*
if (this.window === this) window[main.name] = main;
else module.exports = main;
})();
*/




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var _plugin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/*! toggle - togglable interactive components */
// Interface components: dropdown, popup, toggle, modal dialog, tabs, drawer, tree, gallery
// .nav, .pop, .toggle, .dlg, .tabs, .drawer, .tree, .gal


var _default = /*#__PURE__*/function (_Plugin) {
  _inherits(_default, _Plugin);

  var _super = _createSuper(_default);

  function _default() {
    var _this;

    _classCallCheck(this, _default);

    _this = _super.call(this, 'toggle');
    _this.shown = null;
    _this.nEsc = 0;
    _this.opt = {
      keepHash: true,
      mediaSuffixes: ['-mobile', '-desktop'],
      dlgUnscroll: true,
      //qTgl: '.toggle[id]',
      qTrg: '[id].target',
      qPop: '.pop>div[id]',
      qNav: '.nav ul',
      //auto [id]
      qDlg: '.dlg',
      //generated dialogs may have no [id]
      qTab: '.tabs+div>div[id]',
      qTre: 'ul.tree ul',
      //auto [id]
      qDrw: '.drawer[id]',
      qAccRoot: 'ul.tree.accordion',
      qAcc: 'ul.tree.accordion ul',
      qGal: '.gal>a[id]',
      // dup of gallery.opt.qGal
      qSubMem: '.tabs.mem+div>div[id], ul.mem:not(.nav) ul',
      //qMedia: '[id].target-mobile, [id].target-desktop',
      qDrawer: '.drawer[id]:not(.shift)',
      qTip: '[data-tip=""][title], .tip[title]',
      cMem: 'mem',
      cFade: 'fade',
      cTarget: 'target' //cToggle: 'toggle',

    };
    return _this;
  }

  _createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var app = this.app;
      app.e('a[data-href]', function (n) {
        return n.href = n.dataset.href;
      });
      app.listen('esc', function (e) {
        return _this2.esc(e);
      });
      app.listen('hashchange', function (e) {
        return _this2.onHash(e);
      });
      app.listen('keydown', function (e) {
        return _this2.onKey(e);
      });
      app.h('click', 'a[href^="#"]', function (e) {
        return _this2.onLink(e);
      });
      app.listen('click', function (e) {
        return _this2.onClick(e);
      });
      app.listen('after', function (e) {
        return e && e.type == 'click' ? _this2.unpop(e.target) : null;
      }); // click out

      app.listen('after', function (e) {
        return !e || ['click', 'keydown', 'hashchange'].indexOf(e.type) != -1 ? _this2.modalStyle(e) : null;
      });
      app.listen('after', function (e) {
        return !e || ['click', 'keydown', 'hashchange'].indexOf(e.type) != -1 ? _this2.setShown(null) : null;
      }); //toggle

      var q = this.opt;
      this.opt.qTgl = this.opt.mediaSuffixes.concat(['']).map(function (x) {
        return (
          /*'[id]' + */
          '.' + app.opt.cToggle + x
        );
      }).join(', ');
      var togglers = [q.qTrg, q.qPop, q.qNav, q.qDlg, q.qTab, q.qTre, q.qDrw
      /*, q.qMedia/*, q.qGal*/
      ].join(', ');
      this.opt.qUnpop = [q.qPop, q.qNav, q.qDlg, q.qDrw
      /*, q.qGal*/
      ].join(', ');
      this.opt.qUnpopOn = [q.qPop, q.qNav, q.qDlg, q.qDrw
      /*, q.qGal*/
      ].map(function (n) {
        return n + ':not(.' + app.opt.cOff + ')';
      }).join(', ');
      app.e(this.opt.qNav + ', ' + this.opt.qTre, function (n) {
        return _this2.attachSubNav(n);
      }); //nav, tree: attach to links

      app.e(togglers, function (n) {
        return _this2.initToggler(n);
      }); //initialize togglers

      this.opt.mediaSuffixes.forEach(function (x) {
        return app.e(_this2.opt.qTrg + x, function (n) {
          return _this2.initToggler(n, x);
        });
      }); //initialize togglers by media
      //let autohide = [        q.qPop, q.qNav, q.qDlg, q.qTab, q.qAcc, q.qDrw, q.qMedia/*, q.qGal*/].join(', ');
      //app.e(autohide, n => this.tgl(n, 0)); //autohide

      app.e(this.opt.qGal + ':last-child', function (n) {
        return app.x(n, 1);
      }); //gal: auto add close link

      app.e(this.opt.qSubMem, function (n) {
        return n.classList.add(_this2.opt.cMem);
      }); //initialize sub mem

      app.e('[id]', function (n) {
        return _this2.restoreVisibility(n);
      }); //restore visibility

      app.e(this.opt.qTab + ':not(.' + app.opt.cOff + ') ~ [id]:not(.' + app.opt.cOff + ')', function (n) {
        return _this2.tgl(n, 0);
      }); //undup tabs

      app.e(this.opt.qTab + ':first-child', function (n) {
        return app.a(n.parentNode.children).filter(function (m) {
          return app.vis(m);
        }).length ? null : _this2.tgl(app.q(app.q('a[href^="#"]', n.parentNode.previousElementSibling).hash), 1);
      }); //inactive tabs: show first

      app.e('.' + app.opt.cToggle + '[id]', function (n) {
        return _this2.hiliteLinks(n);
      }); //init links state

      app.e(this.opt.qTip, function (n) {
        n.setAttribute('data-tip', n.title.replace(/\s\s+/g, '\n'));
        n.title = '';
      }); //init tooltips

      app.listen('swipe', function (e) {
        return _this2.swipe(e);
      });
      /*
      app.e(this.opt.qTip, n => {
        let p = app.ins('div',app.ins('div', n.title.replace(/\s\s+/g, '<br>'), {className: 'btn bg-n'}), {className: 'pop'}, n, 1);
        n.title = '';
        p.insertBefore(n, p.firstChild);
      });//init tooltips as popup
      */
    }
  }, {
    key: "swipe",
    value: function swipe(e) {
      if (e.n.matches(this.opt.qDrw)) {
        this.tgl(e.n, false);
        setTimeout(function () {
          return e.n.style.transform = '';
        }, 500);
      }
    }
  }, {
    key: "modalStyle",
    value: function modalStyle(e) {
      var n = e ? e.target : null; //this.setShown(null);//do it just once when dialog is opened
      //let modal = this.app.q(this.opt.qDlg+':not(.'+this.app.opt.cOff+'), '+this.opt.qGal+':target'); // :target not updated after Esc key
      //styles

      var modal = this.app.q(this.opt.qDlg + ':not(.' + this.app.opt.cOff + '), ' + this.opt.qGal + '[id="' + location.hash.substr(1) + '"]');
      var bar = window.innerWidth - document.documentElement.clientWidth; //scroll bar width

      var s = document.body.style;
      document.body.classList[modal ? 'add' : 'remove'](this.opt.cFade);

      if (this.opt.dlgUnscroll) {
        //hide scroll
        s.overflow = modal ? 'hidden' : '';
        if (!(modal && s.paddingRight)) s.paddingRight = modal ? '' + bar + 'px' : ''; // avoid width reflow
      }

      this.app.dbg(['modalStyle', n, modal, s.paddingRight]); //focus first input

      if (modal) {
        //let f1 = this.app.q('input, a:not(.' + this.app.opt.cClose + ')', modal);
        var f1 = this.app.q('input:not([type="hidden"]), select, textarea, a.btn, a:not([href="' + this.app.opt.hClose + '"])', modal);
        var f = this.app.q(':focus', modal);

        if (f1 && !f && (!n || !n.nodeType || !modal.contains(n))) {
          this.app.dbg(['focus', n, modal, f1, f]);
          f1.focus(); //focus just once when dialog is opened

          if (f1.type == 'text') f1.select();
        }
      }
    }
  }, {
    key: "esc",
    value: function esc(e) {
      this.app.dbg(['esc', e]);
      if (e) e.preventDefault();
      this.unpop(null, true);
      this.unhash();
      this.modalStyle();
    }
  }, {
    key: "onHash",
    value: function onHash(e) {
      this.app.dbg(['hashchange', location.hash]);
      this.nEsc = 0;
      if (location.hash === this.app.opt.hClose) this.app.fire('esc', e);else if (location.hash) {
        var d = this.app.q(location.hash);

        if (d) {
          var t = d.matches(this.opt.qTgl);
          var g = d.matches(this.opt.qGal);

          if (t) {
            this.unpop();
            this.toggle(d, true);
            if (!this.opt.keepHash) this.unhash();
          }

          if (t || g) this.modalStyle();else this.unpop(); //this.app.fire('esc', e);
        }
      }
    }
  }, {
    key: "onKey",
    value: function onKey(e) {
      var k = e.keyCode;
      this.app.dbg(['keydown', k, this.nEsc]);
      if (k == 27 && this.nEsc >= 2) localStorage.clear();else if (k == 27) this.app.fire('esc', e);
      this.nEsc = k == 27 && this.nEsc < 2 ? this.nEsc + 1 : 0;
    }
  }, {
    key: "onLink",
    value: function onLink(e) {
      var a = e.recv;

      if (a && a.hash === this.app.opt.hClose) {
        e.preventDefault();
        var d = a.closest(this.opt.qTgl);
        this.app.dbg(['close', this.opt.qTgl, a, d]);
        if (d) this.tgl(d, false);else this.app.fire('esc', e);
      } else {
        var _d = this.app.q(a.hash);

        if (_d && _d.matches(this.opt.qTgl)) {
          e.preventDefault();
          _d = this.toggle(_d);
          if (this.app.vis(_d) && this.opt.keepHash) this.addHistory(a.hash);else this.unhash();
        }
      }
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      this.nEsc = 0;
      if (!e.target.closest('a, input, select, textarea')) this.unhash();
      if (e.clientX >= 0 && e.clientX <= 10 && e.clientY > 5 && this.opt.qDrawer) this.toggle(this.opt.qDrawer);
    }
  }, {
    key: "initToggler",
    value: function initToggler(n, suffix) {
      n.classList.remove(this.opt.cTarget + (suffix || ''));
      n.classList.add(this.app.opt.cToggle + (suffix || ''));
      this.tgl(n, 0);
    }
  }, {
    key: "attachSubNav",
    value: function attachSubNav(n) {
      //let a = n.previousElementSibling;
      var aa = this.app.a(n.parentNode.children).filter(function (v) {
        return v.tagName == 'A';
      });
      var a = aa.filter(function (v) {
        return !v.href;
      })[0] || aa[0] || this.app.ins('', ' ', {}, n.parentNode, false) && this.app.ins('a', this.app.i('toggle', '[+]'), {}, n.parentNode, false);

      if (a) {
        if (!n.id) n.id = 'ul-' + this.app.seq();
        a.href = '#' + n.id;
      }
    }
  }, {
    key: "setShown",
    value: function setShown(n) {
      this.shown = n;
    } //deep: -1=prepare, 0=click|hash, 1=deps|clo

  }, {
    key: "toggle",
    value: function toggle(h, on, deep) {
      var d = h ? h.tagName ? h : this.app.q(h) : null;

      if (d) {
        if (d.matches(this.opt.qTab) && on === undefined) on = true; //tabs: show instead of toggle
        //console.log('toggle '+d.id, on, deep);

        this.app.fire('beforetoggle', {
          n: d,
          on: on,
          deep: deep
        });
        this.tgl(d, on);
        this.app.dbg(['toggle' + (deep ? ' deep' : ''), on, d], deep ? 2 : 1);

        if (this.app.vis(d)) {
          this.fixPosition(d);
          if (!deep) this.setShown(d);
        }

        if (deep != -1) {
          if (!deep) this.toggleDependent(d);
          this.hiliteLinks(d);
          this.storeVisibility(d); //if(!deep) this.modalStyle(d);
        }

        this.app.fire('aftertoggle', {
          n: d,
          on: on,
          deep: deep
        });
      }

      return d;
    }
  }, {
    key: "tgl",
    value: function tgl(d, on) {
      if (d) d.classList[on ? 'remove' : on === undefined ? 'toggle' : 'add'](this.app.opt.cOff);
    }
  }, {
    key: "toggleDependent",
    value: function toggleDependent(d) {
      var _this3 = this;

      if (this.app.vis(d)) {
        if (d.matches(this.opt.qDlg)) ; //this.app.e(this.opt.qDlg, n => n==d ? null : this.toggle(n, false, 1)); //hide other dialogs
        else if (d.matches(this.opt.qTab)) this.app.e(d.parentNode.children, function (n) {
            return n == d ? null : _this3.toggle(n, false, 1);
          }); //hide sibling tabs
          else if (d.matches(this.opt.qAcc)) this.app.e(this.app.qq(this.opt.qAcc, d.closest(this.opt.qAccRoot)), function (n) {
              return n.contains(d) ? null : _this3.toggle(n, false, 1);
            }); //hide other ul
      }
    }
  }, {
    key: "unpop",
    value: function unpop(x, seq) {
      var _this4 = this;

      var keep = [x];
      keep.push(this.shown); // click out: keep

      if (x) {
        var a = x.closest('a');

        if (a && a.hash) {
          //if(a.hash==this.app.opt.hClose) keep = []; //return this.app.fire('esc'); //to close all, even container
          //else
          keep.push(this.app.q(a.hash)); //keep hash target
        }
      }

      this.app.dbg(['unpop', keep]); //this.app.e(this.opt.qUnpop, n => (keep && keep.filter(m => m && m.tagName && n.contains(m)).length) ? null : this.toggle(n, false, 1));

      var nn = this.app.qq(this.opt.qUnpopOn).filter(function (n) {
        return !(keep && keep.filter(function (m) {
          return m && m.tagName && n.contains(m);
        }).length);
      }); // skip if contains one of [keep]

      if (seq) nn = nn.filter(function (n) {
        return !_this4.app.q(_this4.opt.qUnpopOn, n);
      }); // to close nested subsequently

      this.app.e(nn, function (n) {
        return _this4.toggle(n, false, 1);
      });
    }
  }, {
    key: "unhash",
    value: function unhash() {
      //v1.
      if (location.hash) location.hash = this.app.opt.hClose; //v2.

      this.addHistory(location.pathname + location.search
      /* + this.app.opt.hClose*/
      ); //inputs flicker
    }
  }, {
    key: "addHistory",
    value: function addHistory(h) {
      history.pushState({}, '', h); //following required to re-render hash changes (test: open gallery, esc)
      //history.pushState({}, '', h);
      //history.go(-1);
    }
  }, {
    key: "storeVisibility",
    value: function storeVisibility(n) {
      if (n && n.id && n.classList.contains(this.opt.cMem)) {
        localStorage.setItem('vis#' + n.id, this.app.vis(n) ? 1 : -1);
      }
    }
  }, {
    key: "restoreVisibility",
    value: function restoreVisibility(n) {
      if (n && n.id && n.classList && n.classList.contains(this.opt.cMem)) {
        var v = localStorage.getItem('vis#' + n.id);
        if (v) this.toggle(n, v > 0, -1);
      }
    }
  }, {
    key: "hiliteLinks",
    value: function hiliteLinks(d) {
      var _this5 = this;

      var op = this.app.vis(d) ? 'add' : 'remove';
      this.app.e('a[href="#' + d.id + '"]', function (a) {
        return a.classList[op](_this5.app.opt.cAct);
      });
    }
  }, {
    key: "fixPosition",
    value: function fixPosition(n) {
      var nav = n.matches(this.opt.qNav);
      var ss = nav ? window.getComputedStyle(n.parentNode.parentNode) : null;
      var vert = ss ? ss.display != 'flex' : false;

      if (n.matches(this.opt.qPop) || nav) {
        var s = n.style;
        var p = n.parentNode;
        var i = p.nextElementSibling;
        i = i && i.tagName == 'INPUT' ? i : null;
        var r = i || n.parentNode;

        if (r) {
          s.right = 'auto';
          s.left = vert ? '100%' : 0;
          s.top = vert ? 0 : '100%';
          var qn = n.getBoundingClientRect();
          var qr = r.getBoundingClientRect();
          var dx = qn.right > window.innerWidth;
          var dy = qn.bottom > window.innerHeight;
          var wide = qr.width > 300; //x

          if (vert) s.left = dx || wide ? '3em' : '100%';else if (dx && qn.width > qr.width && qr.right > qn.width) {
            //if(overflows-right && wider-then-container && enough-place-on-the-left) pop-left
            s.left = qr.width - qn.width + 'px';
          } else s.left = 0; //y

          if (vert) s.top = dx || wide ? '90%' : 0;else if (dy && qr.top > qn.height) {
            //if(overflows-bottom && enough-place-on-the-top) pop-top
            s.top = (i ? -qr.height : 0) - qn.height + 'px';
          } else s.top = '100%';
          if (i) p.style.verticalAlign = 'bottom';
        }
      }
    }
  }]);

  return _default;
}(_plugin_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var _plugin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/*! dialog - replacement of standard Javascript dialogs: alert, confirm, prompt */
// a.alert([title]|[data-caption])
// a.dialog[href]([title]|[data-caption])[data-prompt] [data-src][data-go][data-ok][data-cancel][data-reverse][data-head][data-pic]
 // import Toggle from './toggle.js';

var _default = /*#__PURE__*/function (_Plugin) {
  _inherits(_default, _Plugin);

  var _super = _createSuper(_default);

  function _default() {
    var _this;

    _classCallCheck(this, _default);

    _this = _super.call(this, 'dialog');
    _this.dlg = null;
    _this.opt = {
      ccDlg: 'dlg rad',
      customDialog: true,
      aConfirm: '_confirm',
      dHead: 'head',
      // data-
      dPic: 'pic',
      dPrompt: 'prompt',
      dCaption: 'caption',
      cBtn: 'btn pad',
      qAlert: 'a.alert',
      qDialog: 'a.dialog, input.dialog'
    };
    return _this;
  }

  _createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      this.opt.ccDlg = this.app.opt.cToggle + ' ' + this.app.opt.cOff + ' ' + this.opt.ccDlg;
      if (!this.dlg) this.dlg = this.app.ins('div', '', {
        className: this.opt.ccDlg
      }, document.body);
      this.app.h('click', this.opt.qAlert + ', ' + this.opt.qDialog, function (e) {
        return _this2.onClick(e);
      });
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      e.preventDefault();
      return this.openByNode(e.recv);
    } //setup object keys: [ok, cancel, icon, class, btn, rev, def]

  }, {
    key: "openDialog",
    value: function openDialog(h, t, f, setup) {
      var _this3 = this;

      setup = setup || {};
      var d = this.dlg;
      var app = this.app;
      d.className = this.opt.ccDlg + (setup.class ? ' ' + setup.class : '');
      app.clr(d);
      if (h.nodeType) h = h.dataset[this.opt.dHead] || '';
      var hh = app.ins('div', '', {
        className: 'row bg'
      }, d);
      var hhh = app.ins('h3', ' ' + (h || ''), {
        className: 'fit pad'
      }, hh);

      if (setup.icon) {
        var m = setup.icon.match(/(\S+)(\s(.*))?/);
        if (m) hhh.insertBefore(app.ins('span', app.i(m[1]), {
          className: m[3] || ''
        }), hhh.firstChild);
      }

      app.x(hh, 0, 'pad hover col-0');
      var b = app.ins('div', '', {
        className: 'pad'
      }, d);
      if (t) app.ins('div', t, {}, b);
      var inp = {
        value: true
      };
      if (setup.def || setup.def === '') inp = app.ins('input', '', {
        value: setup.def
      }, b);
      var bb = app.ins('p', '', {
        className: 'r'
      }, b);
      var b1 = this.opt.cBtn + ' ' + (setup.btn || (t.substr(0, 1) == ' ' ? 'bg-e' : ''));
      var b2 = this.opt.cBtn + ' bg-n';
      var yes = app.ins('a', setup.ok || app.opt.sOk, {
        href: app.opt.hClose,
        className: setup.rev ? b2 : b1
      }, bb);

      if (f) {
        app.ins('a', setup.cancel || app.opt.sCancel, {
          href: app.opt.hClose,
          className: setup.rev ? b1 : b2
        }, yes, setup.rev ? -1 : 1);
        app.ins('', ' ', {}, yes, setup.rev ? -1 : 1);
        yes.href = app.opt.hOk;
        app.b([yes], 'click', function (e) {
          e.preventDefault();

          _this3.callback(f, inp.value, e);
        });
        if (inp.tagName) app.b([inp], 'keyup', function (e) {
          return e.keyCode == 13 ? _this3.callback(f, inp.value, e) : null;
        });
      }

      this.app.toggle(this.dlg, true);
    }
  }, {
    key: "closeDialog",
    value: function closeDialog() {
      this.app.pf('toggle', 'unpop');
    }
  }, {
    key: "callback",
    value: function callback(f, v, e) {
      if (!f.call(this, v, e)) this.closeDialog(); // close dialog unless callback returns true
    }
  }, {
    key: "openByNode",
    value: function openByNode(n, f) {
      var _this4 = this;

      if (n.form && !n.form.checkValidity()) {
        if (n.form.reportValidity) n.form.reportValidity();
        return;
      }

      var app = this.app;
      var h = (n.dataset[this.opt.dHead] || '').replace(/%([\w\-]+)%/g, function (m, a) {
        return n.getAttribute(a);
      });
      var icon = n.dataset[this.opt.dPic] || '';
      var p = n.dataset[this.opt.dPrompt] || '';
      var t = (n.dataset[this.opt.dCaption] || n.title || p || '!').replace(/%([\w\-]+)%/g, function (m, a) {
        return n.getAttribute(a);
      });
      var rev = ('reverse' in n.dataset);
      var src = n.dataset.src;
      src = src ? app.q(src) : null;
      if (!src && n.form) src = n.form.elements[p];
      var v = null;
      var al = n.matches(this.opt.qAlert);
      var def = p ? src ? src.value : app.get(n, p) : null;
      if (def && 'go' in n.dataset) this.onAnswer(n, def, p); //go with default
      else if (this.opt.customDialog) {
          this.openDialog(h, t, al ? null : function (w) {
            return _this4.onAnswer(n, w, p);
          }, {
            ok: n.dataset.ok,
            cancel: n.dataset.cancel,
            icon: icon,
            //class: '',
            btn: t.substr(0, 1) == ' ' || n && n.className.match(/-[we]\b/) ? 'bg-e' : 'bg-y',
            def: def,
            rev: rev
          });
        } else {
          if (al) v = alert(t); //undef
          else if (!p) v = confirm(t); //bool
            else v = prompt(t, def); //null|value

          this.onAnswer(n, v, p);
        }
      return this.dlg;
    }
  }, {
    key: "onAnswer",
    value: function onAnswer(n, v, p, e) {
      var app = this.app; //cancelled

      if (!v && v !== '') ; //form submit
      else if (n && n.form) {
          if (v !== true) {
            var i = n.form.elements[p] || app.ins('input', '', {
              type: 'hidden',
              name: p
            }, n.form);
            if (i) i.value = v;
          }

          if (n.form.reportValidity ? n.form.reportValidity() : n.form.checkValidity()) {
            app.q('[type="hidden"][name="' + n.name + '"]', n.form) || app.ins('input', '', {
              type: 'hidden',
              name: n.name,
              value: n.value
            }, n.form);
            n.form.elements[this.opt.aConfirm] || app.ins('input', '', {
              type: 'hidden',
              name: this.opt.aConfirm,
              value: 1
            }, n.form);
            n.form.submit();
          } else this.closeDialog(); //n.click();

        } //goto link
        else if (n && n.href) {
            var ha = (n.getAttribute('href') || '').substr(0, 1) === '#';
            var bl = n.target == '_blank';
            if (ha || bl) this.closeDialog();
            var u;
            if (ha) u = n.hash;else {
              var a = {};
              a[this.opt.aConfirm] = 1;
              if (v !== true) a[p] = v;
              u = app.makeUrl(n, a);
            }
            if (n.target == '_blank') window.open(u, n.target);else location.href = u;
          }
    }
  }]);

  return _default;
}(_plugin_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var _plugin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/*! gallery - image gallery */
// .gallery a.pic 


var _default = /*#__PURE__*/function (_Plugin) {
  _inherits(_default, _Plugin);

  var _super = _createSuper(_default);

  function _default() {
    var _this;

    _classCallCheck(this, _default);

    _this = _super.call(this, 'gallery');
    _this.opt = {
      idPrefix: 'pic-',
      num: true,
      cGal: 'gal',
      dCaption: 'caption',
      // data-caption
      qGal: '.gal>a[id]',
      // dup of toggle.opt.qGal
      qGallery: '.gallery',
      qLinks: 'a.pic'
    };
    return _this;
  }

  _createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      this.app.listen('hashchange', function (e) {
        return _this2.onHash(e);
      });
      this.app.listen('keydown', function (e) {
        return _this2.onKey(e);
      });
      this.app.h('click', this.opt.qGal, function (e) {
        return _this2.next(e);
      });
      this.app.listen('swipe', function (e) {
        return _this2.swipe(e);
      });
      this.prepareAll();
    }
  }, {
    key: "prepareAll",
    value: function prepareAll(d) {
      var _this3 = this;

      this.app.e(this.app.qq(this.opt.qGallery, d), function (n) {
        return _this3.prepare(n);
      });
    }
  }, {
    key: "swipe",
    value: function swipe(e) {
      if (e.n.matches(this.opt.qGal)) {
        if (e.dir == 4) this.browse(e.n);else if (e.dir == 2) this.browse(e.n, true);else if (e.dir == 3) this.app.fire('esc');
      }
    }
  }, {
    key: "next",
    value: function next(e) {
      //console.log(e.defaultPrevented);
      if (e.defaultPrevented) return;
      var n = e.recv;

      if (e.clientX > 0
      /* not Enter key */
      && e.clientX < n.clientWidth / 3) {
        this.browse(n, true);
        e.preventDefault();
      }
    }
  }, {
    key: "browse",
    value: function browse(n, back) {
      if (back) {
        var p = n.previousElementSibling || this.app.qq('a[id]', n.parentNode).pop();
        if (p.id) location.hash = '#' + p.id;
      } else location.hash = n.hash; //return p.id;

    }
  }, {
    key: "onHash",
    value: function onHash() {
      var n = this.app.q(location.hash);

      if (n) {
        this.loadImg(n);
        this.loadImg(this.app.q(n.hash)); // preview next
      }
    }
  }, {
    key: "loadImg",
    value: function loadImg(n) {
      if (n && n.vImg) {
        n.style.backgroundImage = 'url("' + n.vImg + '")';
        n.vImg = '';
      }
    }
  }, {
    key: "prepare",
    value: function prepare(n) {
      var app = this.app;
      var g = app.ins('div', '', {
        className: this.opt.cGal
      });
      var a = app.qq(this.opt.qLinks, n);
      var z = a.length;
      var first = 0;

      for (var i = 0; i < z; i++) {
        if (!a[i].vDone) {
          var s = app.seq();
          if (!i) first = s;
          var p = app.ins('a', '', {
            className: 'gallery-pic swipe drag',
            id: this.opt.idPrefix + s,
            href: '#' + this.opt.idPrefix + (i == z - 1 ? first : s + 1)
          }, g); //p.style.setProperty('--img', 'url("' + (a[i].getAttribute('href') || '') + '")');
          //p.style.backgroundImage = 'url("' + (a[i].getAttribute('href') || '') + '")';//preload all

          p.vLink = a[i].getAttribute('href') || ''; //real link

          p.vImg = p.vLink; //keep image url but do not load yet

          p.dataset[this.opt.dCaption] = (this.opt.num ? i + 1 + '/' + z + (a[i].title ? ' - ' : '') : '') + (a[i].title || '');
          a[i].href = '#' + p.id;
          a[i].vDone = 1;
        }
      }

      app.x(g);
      document.body.appendChild(g);
    }
  }, {
    key: "onKey",
    value: function onKey(e) {
      if (location.hash) {
        var a = this.app.q(location.hash);

        if (a && a.hash) {
          var k = e.keyCode;
          if (k == 37 || k == 38) this.browse(a, true);else if (k == 39 || k == 40) this.browse(a); //a.click();
          else if (k == 8) {
              var h = a.vLink;

              if (!h) {
                h = window.getComputedStyle(a).backgroundImage;
                h = h.substring(4, h.length - 1).replace(/^"|"$/g, '');
              }

              if (h) location.href = h;
            } //e.preventDefault();
        }
      }
    }
  }]);

  return _default;
}(_plugin_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);



/***/ }),
/* 5 */
/***/ (function(module, exports) {

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  };
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*! iconset - svg paths for building icons */
// "module.exports" is used over "export default"
// to work with build step "css-icons.js"
module.exports = {
  menu: [7, 'M.5 1h6v1h-6zm0 2h6v1h-6zm0 2h6v1h-6z'],
  sort: [7, 'M1 1h2v1h-2zm0 2h3.5v1h-3.5zm0 2h5v1h-5z'],
  more: [17, 'M7 2h3v3h-3zm0 5h3v3h-3zm0 5h3v3h-3z'],
  grid: [7, 'M1 1h2v2h-2zM4 1h2v2h-2zM1 4h2v2h-2zM4 4h2v2h-2z'],
  home: [10, 'M1 4.8h1v4h2v-3h2v3h2v-4h1l-4-4z'],
  find: [12, 'M5 1a4 4 0 1 0 .01 0zm0 1a3 3 0 1 1-.01 0m3 5l-1 1 3 3 1-1z'],
  config: [220, 'M35 67l75 -44 75 44 0 89-75 44-75-44zm75 8a35 35 0 1 0 .01 0z'],
  close: [12, 'M2 1l4 4 4-4 1 1-4 4 4 4-1 1-4-4-4 4-1-1 4-4-4-4z'],
  user: [10, 'M5 9C13 -1.5 -3 -1.5 5 9zM1 8.5q4 1 8 0-4 -3 -8 0z'],
  exit: [10, 'M1 1h4v1h-3v6h3v1h-4zm2 3h3v-2l3 3-3 3v-2h-3z'],
  key: [20, 'M2 16l7-7v-4l3-3q7 0 7 7l-3 3h-4l-6 6h-4zm3 1h1l6-6h-1zm11-12a1.5 1.5 0 1 0 .01 .01z'],
  lock: [10, 'M1.5 4h7v5h-7zm1 0c0-4 5-4 5 0h-1c0-3-3-3-3 0zm2 1v2h1v-2z'],
  edit: [10, 'M7 1q1.6 .4 2 2l-5 5-3 1 1-3zM2.3 6.3l-.5 1.5.4.4 1.5-.5z'],
  add: [7, 'M3 1h1v2h2v1h-2v2h-1v-2h-2v-1h2z'],
  delete: [20, 'M5 3l5 5 5-5 2 2-5 5 5 5-2 2-5-5-5 5-2-2 5-5-5-5z'],
  ok: [100, 'M10 48l11-9 18 22 40-50 11 9-51 65z'],
  up: [10, 'M1 6l4-4 4 4-1 1-3-3-3 3z'],
  down: [10, 'M1 4l4 4 4-4-1-1-3 3-3-3z'],
  left: [10, 'M6 1l1 1-3 3 3 3-1 1-4-4z'],
  right: [10, 'M4 1l4 4-4 4-1-1 3-3-3-3z'],
  asc: [12, 'M2 7l-1-1 5-5 5 5-1 1 -3.25 -3.2v7h-1.5v-7z'],
  desc: [12, 'M2 5l-1 1 5 5 5-5-1-1 -3.25 3.2v-7h-1.5v7z'],
  back: [12, 'M7 2l-1-1 -5 5 5 5 1-1 -3.2 -3.25h7v-1.5h-7z'],
  forward: [12, 'M5 2l 1-1 5 5 -5 5 -1-1 3.2 -3.25h-7v-1.5h7z'],
  upload: [10, 'M1 8h8v1h-8zm1-4h2v3h2v-3h2l-3-3z'],
  download: [10, 'M1 8h8v1h-8zm1-3.7h2v-3h2v3h2l-3 3z'],
  first: [12, 'M2 2h1.5v8h-1.5zm2 4l6-4v8z'],
  last: [12, 'M2 2v8l6-4zm6.5 0h1.5v8h-1.5z'],
  folder: [12, 'M1 1.5h4l1 2h5v7h-10zm1 3v5h8v-5z'],
  open: [12, 'M.5 1.5h4l1 2h6.3l-2.3 7h-9zm3 3l-2 5h7l2-5z'],
  file: [12, 'M2 1h5l3 3v7h-8zm1 1v8h6v-6h-2v-2z'],
  attach: [15, 'M4.5 11q0 3 3 3t3-3v-8q0-2-2-2t-2 2v7h1v-7q0-1 1-1t1 1v8q0 2-2 2t-2-2v-7h-1z'],
  audio: [19, 'M8 14h-1v-10l8-2v10h-1v-6.5l-6 1.5za3 2 -20 1 1 0 -.01zm7-2a3 2 -20 1 1 0 -.01z'],
  video: [12, 'M1 3h7v2l3-2v6l-3-2v2h-7z'],
  image: [12, 'M1 2h10v8h-10zm1 1v5l3-3 2 2 1-1 2 2 v-5zm5 .5a1 1 0 1 0 ,001 0z'],
  text: [12, 'M2 1h5l3 3v7h-8zm1 1v8h6v-6h-2v-2zm1 4h4v1h-4zm0 2h4v1h-4z'],
  tree: [26, 'M9 3h8v6h-3v3h8v5h2v6h-6v-6h2v-3h-6v3h2v6h-6v-6h2v-3h-6v3h2v6h-6v-6h2v-5h8v-3h-3z'],
  list: [7, 'M1 1h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1z M3 1h3v1h-3zm0 2h3v1h-3zm0 2h3v1h-3z'],
  link: [20, 'M9 7l6-6 4 4-6 6-1-1 5-5-2-2-5 5zm-8 8l6-6 1 1-5 5 2 2 5-5 1 1-6 6zm5.5 -2.5l6-6 1 1-6 6z'],
  chart: [10, 'M1 9v-3h2v3zm3 0v-5h2v5zm3 0v-7h2v7z'],
  no: [7, 'M1 3h5v1h-5z'],
  ban: [20, 'M10 2a8 8 0 1 0 .01 0m0 2a6 6 0 1 1 -.01 0zm-4.5 .5l-1 1 10 10 1-1z'],
  warning: [16, 'M8 1.7l-7 12h14zm0 9a1 1 0 1 1-.01 0c-3-7 3-7 0 0z'],
  info: [20, 'M10 2a8 8 0 1 0 .01 0zm-1 3h2v2h-2zm-1 4h3v5l1 1h-3v-5'],
  share: [22, 'M6 8a3 3 0 1 0 .01 0zm10-5a3 3 0 1 0 .01 0zm0 10a3 3 0 1 0 .01 0zm-10-3v2l10 5v-2zv2l10-5v-2z'],
  world: [12, 'M6 1.2a4.8 4.8 0 1 0 .01 0zm0 .8a4 4 0 1 1-.01 0za3 4 0 1 0 .01 0za2.2 4 0 1 1-.01 0za.5 4 0 1 0 .01 0zm4 4a4 .2 0 1 0 0 .01z'],
  flag: [10, 'M2 1h1v1q2-1 3 0t3-0v4q-2 1-3 0t-3 0v3h-1z'],
  pin: [10, 'M2 4a3 3 0 0 1 6 0q0 2 -3 5q-3-3-3-5zm3 -2a2 2 0 1 0 .01 0z'],
  date: [10, 'M1 1.5h8v7h-8zm1 2v4h6v-4zm.5-3v2h1.5v-2zm3.5 0v2h1.5v-2z'],
  time: [24, 'M12 1a10 10 0 1 1 -.01 0zm0 2a8 8 0 1 0 .01 0zm-1.2 1h2v6.5l3.5 3.5-1.5 1.5-4-4z'],
  refresh: [20, 'M10 .3v3a7 7 0 1 0 7 7h-2a5 5 0 1 1-5-5v3l5-4z'],
  //refresh2: [20, 'M14.5 5.5a7 7 0 1 0 0 9l-1.5-1.5a5 5 0 1 1 0-6l-2 2h5.5v-5.5z'],
  view: [12, 'm1 6q5-6 10 0v1q-5 -6-10 0zm5-3a2.8 2.8 0 1 1 -.01 0zm0 1.8a1.1 1.1 0 1 0 .01 0z'],
  card: [14, 'M1 3h12v8h-12zm1 1v1h10v-1zm0 3v3h10v-3z'],
  sum: [12, 'M2.5 3v-1h7v1h-5l3 3-3 3h5v1h-7v-1l3-3z'],
  copy: [9, 'M1 3 h1v4h4v1h-5zm2-2h5v5h-5zm1 1v3h3v-3z'],
  help: [18, 'M9 2a7 7 0 1 0 .01 0zm-3 5q0-3 3-3t3 3c0 3-2 2-2 4h-2c0-3 2-2 2-4q0-1-1-1t-1 1zm3 4.5a1.3 1.3 0 1 1 -.01 0z'],
  phone: [13, 'M3 1l2 3-1.2 1.2 4 4 1.2-1.2 3 2c-3 6 -15 -6 -9-9z'],
  mail: [14, 'M1 2.5h12v9h-12zm1 1v1l5 5 5 -5v-1z'],
  chat: [12, 'M6 1.2a5 4 0 1 0 .01 0zm0 1a4 3 0 1 1-.01 0zm-3.8 5.5l-1 3 4-2z'],
  send: [12, 'M1 2l10 4-10 4 1.5-3.6 6-.4-6-.4z'],
  bookmark: [8, 'M4 5l-2 2v-6h4v6z'],
  star: [32, 'M16 2 l9 28-23-18 28 0-23 18z'],
  heart: [6, 'M3 2c2-2 4 1 0 3c-4-2-2-5 0-3z'],
  tag: [9, 'M1 5.2l4-4h3v3l-4 4zm6-3.1a.6 .6 0 1 0 .01 .01z'],
  expand: [10, 'M1 1h3v1h-2v2h-1zm5 0h3v3h-1v-2h-2zm2 5h1v3h-3v-1h2zm-7 0h1v2h2v1h-3z'],
  collapse: [10, 'M4 4h-3v-1h2v-2h1zm2 0v-3h1v2h2v1zm0 2h3v1h-2v2h-1zm-2 0v3h-1v-2h-2v-1z'],
  box: [26, 'M3 6l10-2.7 10 2.7-10 3zm-.8 1.2l10 3v13l-10-4zm21.6 0l-10 3v13l10-4z'],
  columns: [16, 'M1.5 2.5h13v11h-13zm1 2v8h5v-8zm6 0v8h5v-8z'],
  storage: [9, 'M1 1h7v3h-7zm0 4h7v3h-7zm4-3v1h2v-1zm0 4v1h2v-1z'],
  settings: [11, 'M1 2h9v1h-9zm0 3h9v1h-9zm0 3h9v1h-9zm2-7h1v3h-1zm4 3h1v3h-1zm-3 3h1v3h-1z'],
  power: [18, 'M6 3a6.7 6.7 0 1 0 6 0v2a4.9 4.9 0 1 1 -6 0zm2-1.5h2v8h-2z'],
  energy: [11, 'M5 1.5l-2 4h2l-2 5 5-6h-2l2-3z'],
  sound: [9, 'M3 6h-2v-3h2l3-2v7zm3.7-3q2 1.5 0 3z'],
  mic: [20, 'M7 5 a3 3 0 1 1 6 0v4a3 3 0 1 1 -6 0zm-2 4a5 5 0 1 0 10 0zm4 4v3h-3v2h8v-2h-3v-3z'],
  photo: [10, 'M1 2.5h2l1-1h2l1 1h2v5h-8zm4 .5a1.8 1.8 0 1 0 .01 0z'],
  print: [10, 'M1 2.5h2v-1h4v1h2v4h-8zm2 2l-1 4h6l-1-4zm4-1h1v-.5h-1z'],
  play: [12, 'M3 2v8l7-4z'],
  pause: [9, 'M2 2h2v5h-2zm3 0h2v5h-2z'],
  stop: [9, 'M2 2h5v5h-5z'],
  rec: [10, 'M5 2a3 3 0 1 0 .01 0z'],
  layers: [14, 'M1 5.5l6-3 6 3-6 3zm0 3l2-1 4 2 4-2 2 1-6 3z'],
  none: [1, 'M1 1z']
};

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/js/polyfill.js
var polyfill = __webpack_require__(5);

// EXTERNAL MODULE: ./src/js/app.js
var app = __webpack_require__(1);

// EXTERNAL MODULE: ./src/js/plugins/plugin.js
var plugins_plugin = __webpack_require__(0);

// CONCATENATED MODULE: ./src/js/plugins/code.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/*! code - source code sample */


var code_default = /*#__PURE__*/function (_Plugin) {
  _inherits(_default, _Plugin);

  var _super = _createSuper(_default);

  function _default() {
    var _this;

    _classCallCheck(this, _default);

    _this = _super.call(this, 'code');
    _this.langs = {
      html: {
        nm: 'HTML',
        re: [[/[a-z0-9_\-]+(?==")/g, 'w'], // attr name
        [/".*?"/g, 'e'], // attr value
        [/&lt;[^!A-Z][\s\S]*?&gt;/g, 'i'], // tag |&amp;[\w#]+;
        [/&lt;\![\s\S]*?&gt;/g, 'n'] // comment
        ]
      },
      js: {
        nm: 'Javascript',
        re: [[/".*?"|'.*?'/g, 'w'], // string // |'.*?'
        [/(\b|\b\d+\.|\.)\d+\b/g, 'e'], // number
        [/[{}()\[\]]/g, 'y'], // bracket
        [/\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|function|if|import|in|instanceof|new|return|super|switch|this|throw|try|typeof|var|void|while|with|yield|let|await|null|undefined|true|false|arguments|get|set|require)\b/g, 'i'], // keyword
        [/\/\*[\s\S]*?\*\/|(\/\/|#\!)[^\n]*/g, 'n'] // comment
        ]
      },
      css: {
        nm: 'CSS',
        re: [[/".*?"|'.*?'/g, 'w'], // string // |'.*?'
        [/#[\w\-]+/g, 'e'], // id, color
        [/[{}()]/g, 'y'], // brackets
        [/\.[A-za-z][\w\-]*/g, 'y'], // class
        [/((@\w+|\!important)|\b(none|inherit|initial|unset|attr|url|calc|var|rgba?|hsla?))\b/g, 'i'], // keyword
        [/\/\*[\s\S]*?\*\//g, 'n'] // comment
        ]
      }
    };
    _this.opt = {
      dLang: 'lang',
      //data-lang
      defLang: 'html',
      qCode: '.code'
    };
    return _this;
  }

  _createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      this.app.e(this.opt.qCode, function (n) {
        return _this2.showCode(n);
      });
      this.app.e('code[class*="language-"]', function (n) {
        return _this2.hiliteNode(n);
      });
      this.app.listen('update', function (e) {
        return _this2.updateCode(e);
      });
    }
  }, {
    key: "updateCode",
    value: function updateCode(e) {
      var n = e.n ? e.n : this.app.q(e.q);

      if (n) {
        var p = n.closest(this.opt.qCode);
        if (p) this.showCode(p);
      }
    }
  }, {
    key: "showCode",
    value: function showCode(src) {
      var lang = src.dataset[this.opt.dLang] || this.opt.defLang;
      var t = this.spaces(src.innerHTML);

      if (!src.vCode) {
        var cont = this.app.ins('div', '', {
          classList: 'bord'
        }, src, 1);
        cont.appendChild(src);
        src.classList.add('pad');
        var id = 'code-' + this.app.seq();
        this.app.ins('div', this.app.ins('a', (this.langs[lang] ? this.langs[lang].nm : lang) || lang, {
          className: 'pad',
          href: '#' + id
        }), {
          className: '-r bg small'
        }, cont);
        var pre = this.app.ins('pre', '', {
          className: this.app.opt.cToggle + ' ' + this.app.opt.cOff + ' fit pad',
          id: id
        }, cont);
        var cod = this.app.ins('code', '', {
          className: 'language-' + lang
        }, pre);
        src.vCode = cod;
      } //src.vCode.textContent = t;


      src.vCode.innerHTML = this.hiliteText(t, lang);
    }
  }, {
    key: "spaces",
    value: function spaces(s) {
      return s.replace(/^\s*\r?\n|\s+$/g, '').replace(/\t/g, '  '); //.replace(/=""/g, '');
    }
  }, {
    key: "hiliteNode",
    value: function hiliteNode(n) {
      n.innerHTML = this.hiliteText(this.spaces(n.textContent), this.app.a(n.classList).filter(function (c) {
        return c.match(/language-/);
      })[0].substr(9));
    }
  }, {
    key: "hiliteText",
    value: function hiliteText(t, lang) {
      var _this3 = this;

      var l = this.langs[lang];
      var d = this.app.ins('div');
      d.textContent = t;
      t = d.innerHTML;
      if (l && l.re) l.re.forEach(function (re) {
        return t = t.replace(re[0], function (m) {
          return _this3.token(re[1], m);
        });
      });
      return t;
    }
  }, {
    key: "token",
    value: function token(c, m) {
      return "<Span Class = 'text-" + c + "'>" + m + "</Span>";
    }
  }]);

  return _default;
}(plugins_plugin["a" /* default */]);


// EXTERNAL MODULE: ./src/js/iconset.js
var iconset = __webpack_require__(6);
var iconset_default = /*#__PURE__*/__webpack_require__.n(iconset);

// CONCATENATED MODULE: ./src/js/plugins/icons.js
function icons_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { icons_typeof = function _typeof(obj) { return typeof obj; }; } else { icons_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return icons_typeof(obj); }

function icons_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function icons_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function icons_createClass(Constructor, protoProps, staticProps) { if (protoProps) icons_defineProperties(Constructor.prototype, protoProps); if (staticProps) icons_defineProperties(Constructor, staticProps); return Constructor; }

function icons_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) icons_setPrototypeOf(subClass, superClass); }

function icons_setPrototypeOf(o, p) { icons_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return icons_setPrototypeOf(o, p); }

function icons_createSuper(Derived) { var hasNativeReflectConstruct = icons_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = icons_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = icons_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return icons_possibleConstructorReturn(this, result); }; }

function icons_possibleConstructorReturn(self, call) { if (call && (icons_typeof(call) === "object" || typeof call === "function")) { return call; } return icons_assertThisInitialized(self); }

function icons_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function icons_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function icons_getPrototypeOf(o) { icons_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return icons_getPrototypeOf(o); }

/*! icons - include svg icons */



var icons_default = /*#__PURE__*/function (_Plugin) {
  icons_inherits(_default, _Plugin);

  var _super = icons_createSuper(_default);

  function _default() {
    var _this;

    icons_classCallCheck(this, _default);

    _this = _super.call(this, 'icons');
    _this.opt = {
      cIcon: 'icon',
      // class of svg icon
      pIcon: 'icon-',
      // class prefix of tag to insert icon into
      cEmpty: 'empty',
      iconSize: 24,
      pSvg: 'icon-' // id prefix to search on page; set false to skip search

    };
    _this.parsed = {};
    _this.icons = iconset_default.a;
    return _this;
  }

  icons_createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      this.app.e('[class*="' + this.opt.pIcon + '"]', function (n) {
        return _this2.iconize(n);
      });
    }
  }, {
    key: "iconize",
    value: function iconize(n) {
      var m = n.className.match(new RegExp('\\b' + this.opt.pIcon + '([\\w\\-_]+)'));

      if (m && m[1]) {
        this.addIcon(m[1], n);
        n.classList.remove(m[0]);
      }
    }
  }, {
    key: "addIcon",
    value: function addIcon(i, n) {
      var t = n.textContent;
      var icon = this.i(i);

      if (icon) {
        if (n.classList.contains(this.opt.cEmpty)) {
          this.app.clr(n);
          if (!n.title) n.title = t;
        }

        if (n.firstChild && !n.firstChild.tagName) this.app.ins('span', n.firstChild, {}, n, false);
        n.insertBefore(icon, n.firstChild);
      }
    }
  }, {
    key: "i",
    value: function i(ico, alt) {
      var a = ico.split(/[\/_]/);
      ico = a[0];

      if (this.parsed[ico] === undefined) {
        var svg = '';

        if (this.opt.pSvg !== false) {
          var id = this.opt.pSvg + ico;
          var sym = document.getElementById(id);
          if (sym && sym.tagName.toLowerCase() == 'symbol') svg = '<svg><use xlink:href="#' + id + '"></use></svg>'; // from page
        }

        if (!svg) {
          svg = this.icons[ico] || '';

          if (typeof svg !== 'string') {
            svg = '<svg viewBox="0 0 ' + svg[0] + ' ' + svg[0] + '"><path d="' + svg[1] + '"/></svg>'; // from array
          }
        }

        var n;

        if (svg) {
          var div = document.createElement('div');
          div.innerHTML = svg;
          n = div.firstChild;
          if (!n.getAttribute('width')) n.setAttribute('width', this.opt.iconSize);
          if (!n.getAttribute('height')) n.setAttribute('height', this.opt.iconSize);
          if (!n.getAttribute('class')) n.setAttribute('class', this.opt.cIcon);
        } else n = '';

        this.parsed[ico] = n;
      }

      return this.parsed[ico] ? this.prepareSvg(this.parsed[ico].cloneNode(true), a.slice(1)) : alt ? this.app.ins('span', alt) : null;
    }
  }, {
    key: "prepareSvg",
    value: function prepareSvg(n, a) {
      if (a[0]) n.setAttribute('width', a[0]);
      if (a[1]) n.setAttribute('height', a[1]);
      if (a.length > 0) n.setAttribute('class', a.slice(2).join(' ') || '');
      return n;
    }
  }]);

  return _default;
}(plugins_plugin["a" /* default */]);


// EXTERNAL MODULE: ./src/js/plugins/toggle.js
var toggle = __webpack_require__(2);

// EXTERNAL MODULE: ./src/js/plugins/dialog.js
var dialog = __webpack_require__(3);

// EXTERNAL MODULE: ./src/js/plugins/gallery.js
var gallery = __webpack_require__(4);

// CONCATENATED MODULE: ./src/js/plugins/fetch.js
function fetch_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { fetch_typeof = function _typeof(obj) { return typeof obj; }; } else { fetch_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return fetch_typeof(obj); }

function fetch_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function fetch_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function fetch_createClass(Constructor, protoProps, staticProps) { if (protoProps) fetch_defineProperties(Constructor.prototype, protoProps); if (staticProps) fetch_defineProperties(Constructor, staticProps); return Constructor; }

function fetch_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) fetch_setPrototypeOf(subClass, superClass); }

function fetch_setPrototypeOf(o, p) { fetch_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return fetch_setPrototypeOf(o, p); }

function fetch_createSuper(Derived) { var hasNativeReflectConstruct = fetch_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = fetch_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = fetch_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return fetch_possibleConstructorReturn(this, result); }; }

function fetch_possibleConstructorReturn(self, call) { if (call && (fetch_typeof(call) === "object" || typeof call === "function")) { return call; } return fetch_assertThisInitialized(self); }

function fetch_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function fetch_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function fetch_getPrototypeOf(o) { fetch_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return fetch_getPrototypeOf(o); }

/*! fetch - asynchronous requests */
// import toggle from './toggle.js'
// import dialog from './dialog.js'


var fetch_default = /*#__PURE__*/function (_Plugin) {
  fetch_inherits(_default, _Plugin);

  var _super = fetch_createSuper(_default);

  function _default() {
    fetch_classCallCheck(this, _default);

    return _super.call(this, 'fetch'); // this.opt = {}
  }

  fetch_createClass(_default, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.app.h('click', 'a[data-target]', function (e) {
        return _this.onClick(e);
      });
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      e.preventDefault();
      this.fetchBy(e.recv);
    }
  }, {
    key: "fetchBy",
    value: function fetchBy(n, f) {
      var _this2 = this;

      this.fetch(n.getAttribute('href') || '', function (r) {
        return f ? f(n, r) : _this2.receive(n, r);
      });
    }
  }, {
    key: "fetch",
    value: function fetch(url, f) {
      var _this3 = this;

      var req = new XMLHttpRequest();
      if (f) req.addEventListener('load', function (e) {
        f(req);

        _this3.app.fire('after');
      });
      req.open('GET', url);
      req.send();
    }
  }, {
    key: "receive",
    value: function receive(n, req, e) {
      // this.app..parse(req.responseText)
      var d = this.app.q(n.dataset.target);

      if (req.status == '200') {
        if (d) {
          d.innerHTML = req.responseText;
          var dlg = d.closest('.dlg[id]');
          if (dlg) this.app.toggle(dlg, true);
        } else {
          this.app.dialog(n, req.responseText);
        }
      } else console.error('XHTTP request failed', req); //this.app.fire('after', e);

    }
  }]);

  return _default;
}(plugins_plugin["a" /* default */]);


// CONCATENATED MODULE: ./src/js/util/dt.js
function dt_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function dt_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function dt_createClass(Constructor, protoProps, staticProps) { if (protoProps) dt_defineProperties(Constructor.prototype, protoProps); if (staticProps) dt_defineProperties(Constructor, staticProps); return Constructor; }

/*! date - parse and format date */
var Dt = /*#__PURE__*/function () {
  function Dt() {
    dt_classCallCheck(this, Dt);
  }

  dt_createClass(Dt, null, [{
    key: "parse",
    value: function parse(s) {
      var d = '';
      var m = (s || '').match(/^(\d+)([\-\.\/\s])(\d+)[\-\.\/\s](\d+)(\D(\d+))?(\D(\d+))?(\D(\d+))?(\D(\d+))?$/);

      if (m) {
        var x;
        if (m[2] == '.') x = [4, 3, 1]; //d.m.Y
        else if (m[2] == '/') x = [4, 1, 3]; //m/d Y
          else x = [1, 3, 4]; //Y-m-d

        d = new Date(m[x[0]], m[x[1]] - 1, m[x[2]], m[6] || 0, m[8] || 0, m[10] || 0, m[12] || 0); //return d ? d.getTime() : NaN;
      }

      return d; // || NaN;
    }
    /*
      x: date object
      t: include time
      f: y=Y-m-d (default), d=d.m.Y, m=m/d Y
    */

  }, {
    key: "fmt",
    value: function fmt(x, t, f) {
      var y = x.getFullYear();
      var m = Dt.n(x.getMonth() + 1);
      var d = Dt.n(x.getDate());
      var h = Dt.n(x.getHours());
      var i = Dt.n(x.getMinutes());
      var s = Dt.n(x.getSeconds());
      return (f == 'm' ? m + '/' + d + ' ' + y : f == 'd' ? d + '.' + m + '.' + y : y + '-' + m + '-' + d) + (t && h + i + s > 0 ? ' ' + Dt.n(x.getHours()) + ':' + Dt.n(x.getMinutes()) + ':' + Dt.n(x.getSeconds()) : '');
    }
  }, {
    key: "n",
    value: function n(v, l) {
      return ('000' + v).substr(-(l || 2));
    }
  }]);

  return Dt;
}();


// CONCATENATED MODULE: ./src/js/plugins/tablex.js
function tablex_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { tablex_typeof = function _typeof(obj) { return typeof obj; }; } else { tablex_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return tablex_typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function tablex_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function tablex_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function tablex_createClass(Constructor, protoProps, staticProps) { if (protoProps) tablex_defineProperties(Constructor.prototype, protoProps); if (staticProps) tablex_defineProperties(Constructor, staticProps); return Constructor; }

function tablex_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) tablex_setPrototypeOf(subClass, superClass); }

function tablex_setPrototypeOf(o, p) { tablex_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return tablex_setPrototypeOf(o, p); }

function tablex_createSuper(Derived) { var hasNativeReflectConstruct = tablex_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = tablex_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = tablex_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return tablex_possibleConstructorReturn(this, result); }; }

function tablex_possibleConstructorReturn(self, call) { if (call && (tablex_typeof(call) === "object" || typeof call === "function")) { return call; } return tablex_assertThisInitialized(self); }

function tablex_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function tablex_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function tablex_getPrototypeOf(o) { tablex_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return tablex_getPrototypeOf(o); }

/*! tablex - filter and sort HTML table */
// table.sort.totals.filter[data-filter][data-filter-report][data-case][data-filter-cols]



var tablex_default = /*#__PURE__*/function (_Plugin) {
  tablex_inherits(_default, _Plugin);

  var _super = tablex_createSuper(_default);

  function _default() {
    var _this;

    tablex_classCallCheck(this, _default);

    _this = _super.call(this, 'tablex');
    _this.lang = '';
    _this.skipComma = 0;
    _this.intervalUnits = {
      ms: .001,
      msec: .001,
      s: 1,
      sec: 1,
      mi: 60,
      min: 60,
      h: 3600,
      hr: 3600,
      d: 86400,
      w: 604800,
      m: 2628000,
      mth: 2628000,
      y: 31536000,
      yr: 31536000 // 31556952 = average Gregorian year // 31536000 = common year (365 days)

    };
    _this.szUnits = {
      b: 1,
      kb: 1024,
      mb: 1048576,
      gb: 1073741824,
      tb: 1099511627776,
      pb: 1125899906842624
    };
    _this.opt = {
      cSort: 'sort',
      cTotals: 'totals',
      dFilter: 'filter',
      // data-filter
      dRep: 'filterReport',
      // data-filter-report
      aTotal: 'data-total',
      dLimit: 'limit',
      // data-limit
      dPages: 'pages',
      // data-pages
      dPageNavAfter: 'pagesAfter',
      // data-pages-after
      cFilter: 'filter',
      cFiltered: 'bg-w',
      // filter-on - non-empty filter field
      cScan: 'text-i',
      // col-scan - searchable columns' header (used if "data-filter-cols" is set)
      cShow: '',
      // row-show - matching row
      //cHide: 'hide', // row-hide - non-matching row (if not set the "display:none" is used)
      cSortable: '',
      // col-sort - sortable column's header
      cUnmatch: 'unmatch',
      cUnpage: 'unpage',
      cAsc: 'bg-y',
      // col-asc - !non-empty! - header of currently sorted column (ascending)
      cDesc: 'bg-w',
      // col-desc - header of currently sorted column (descending)
      dateFormat: 'd',
      //y=Y-m-d, d=d.m.Y, m=m/d Y
      wait: 200
    };
    return _this;
  }

  tablex_createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      this.lang = document.documentElement.getAttribute('lang') || 'en';
      this.skipComma = this.lang == 'en';
      var q = 'table.' + this.opt.cSort + ', table.' + this.opt.cFilter + ', table.' + this.opt.cTotals + ', table[' + this.opt.aFilter + ']' + ', table[data-' + this.opt.dLimit + ']';
      this.app.e(q, this.prepare.bind(this));
      this.app.h('click', '.tablex-pagenav a', function (e) {
        return _this2.page(e);
      });
    }
  }, {
    key: "page",
    value: function page(e) {
      e.preventDefault();
      var nav = e.recv.closest('.tablex-pagenav');
      this.paginate(nav.vTable, 1 * e.recv.hash.substr(1));
    }
  }, {
    key: "prepare",
    value: function prepare(n) {
      var i,
          j,
          start = 0;
      var tb = n.querySelector('tbody');
      var rh = n.querySelector('thead tr');

      if (!rh) {
        rh = tb.rows[0];
        start = 1;
      }

      if (!rh || !tb || !tb.rows || tb.rows.length < 2) return;
      var a = [],
          h = [],
          types = [];

      for (j = 0; j < rh.cells.length; j++) {
        h[j] = rh.cells[j];
        types[j] = {
          x: 0,
          s: 0,
          n: 0,
          b: 0,
          i: 0,
          d: 0
        }; //if (this.opt.cSortable && this.isSortable(rh.cells[j])) h[j].classList.add(this.opt.cSortable);
      } //let inp = this.app.ins('input','',{type:'search',size:4},rh.cells[0]);


      n.vCase = n.getAttribute('data-case') !== null;
      var fq = n.dataset[this.opt.dFilter];
      n.vInp = fq ? document.querySelector(fq) : n.querySelector('[name="_q"]');
      n.vRep = this.app.q(n.dataset[this.opt.dRep] || '');
      n.vLimit = 1 * (n.dataset[this.opt.dLimit] || 0);
      n.vPage = 1;
      if (!n.vInp
      /* && !n.vRep */
      && n.classList.contains(this.opt.cFilter)) this.addFilter(n);
      if (n.vLimit && tb.rows.length > n.vLimit) this.addPageNav(n);

      if (n.vInp) {
        //n.vInp.onsearch = n.vInp.onkeyup = this.doFilter.bind(this,n);
        //1.
        //if(!n.vInp.vListen) n.vInp.addEventListener('input', this.doFilter.bind(this, n), false);
        //2.
        var f = this.app.debounce(this.doFilter.bind(this), this.opt.wait);
        if (!n.vInp.vListen) this.app.b([n.vInp], 'input', function (e) {
          return f(n);
        });
        n.vInp.vListen = 1; //this.doFilter(n);
      }

      for (i = start; i < tb.rows.length; i++) {
        var c = tb.rows[i].cells;
        var row = [],
            vals = [];

        for (j = 0; j < c.length; j++) {
          row[j] = this.val(c[j], n.vCase);
          vals[j] = this.convert(row[j]);
          var type = vals[j][0] === '' ? 'x' : vals[j][1];
          types[j][type]++;
          if (this.app.isDebug()) c[j].title = type + ': ' + vals[j][0]; //c[j].setAttribute('data-cell', row[j]);
        }

        a.push({
          d: row,
          //string data
          x: vals,
          //converted data [value, type]
          n: tb.rows[i],
          //tr_node
          v: true //visible

        });
      }

      n.vCount = a.length;
      n.vData = a;
      n.vHead = h;
      n.vTypes = types.map(function (t) {
        return Object.keys(t).reduce(function (acc, cur) {
          return t[cur] > acc[1] ? [cur, t[cur]] : acc;
        }, ['s', 0])[0];
      });

      if (n.classList.contains(this.opt.cTotals)) {
        this.addFooter(n, rh);
        if (!n.vInp) this.updateTotals(n, a.length);
      }

      if (n.vInp) this.doFilter(n);else if (n.vLimit) this.paginate(n, 1);

      if (n.classList.contains(this.opt.cSort)) {
        for (j = 0; j < h.length; j++) {
          if (this.isSortable(h[j])) {
            if (this.opt.cSortable) h[j].classList.add(this.opt.cSortable);
            if (!h[j].vListen) h[j].addEventListener('click', this.doSort.bind(this, n, h[j]), false);
            h[j].vListen = 1;
          }
        }
      }
    }
  }, {
    key: "paginate",
    value: function paginate(n, page) {
      n.vPage = page;

      if (n.vLimit && n.vPage) {
        this.setPageNav(n);
        var skip = n.vLimit * (page - 1);
        var last = skip + n.vLimit - 1; //console.log('paginate', page, n.vCount, skip, last, n.vPageNav.children.length);

        var j = 0;

        for (var i = 0; i < n.vData.length; i++) {
          var hide = n.vData[i].n.classList.contains(this.opt.cUnmatch);

          if (!hide) {
            var on = j >= skip && j <= last;
            n.vData[i].n.classList[on ? 'remove' : 'add'](this.app.opt.cHide, this.opt.cUnpage);
            j++;
          }
        }
      }
    }
  }, {
    key: "addFilter",
    value: function addFilter(n) {
      var t = n.parentNode.classList.contains('roll') ? n.parentNode : n;
      var p = this.app.ins('p', ' ', {}, t, -1);
      n.vInp = this.app.ins('input', '', {
        type: 'search'
      }, p, false);
      n.vRep = this.app.ins('span', '', {}, p);
    }
  }, {
    key: "addPageNav",
    value: function addPageNav(n) {
      var t = n.parentNode.classList.contains('roll') ? n.parentNode : n;
      n.vPageNav = this.app.ins('ul', '', {
        className: 'nav hover tablex-pagenav'
      });
      n.vPageNav.vTable = n;
      this.app.ins('div', n.vPageNav, {
        className: 'mar small'
      }, t, this.opt.dPageNavAfter in n.dataset ? 1 : -1);
    }
  }, {
    key: "setPageNav",
    value: function setPageNav(n) {
      var app = this.app;
      var m = 1 * (n.dataset[this.opt.dPages] || 10);
      var h = Math.floor((m + 1) / 2); // shift to first
      //let h = Math.ceil((m + 1) / 2); // shift to last

      var ul = n.vPageNav;
      var last = Math.ceil(n.vCount / n.vLimit);
      var min = Math.max(1, Math.min(n.vPage - h + 1, last - m + 1));
      var max = Math.min(last, min + m - 1);
      var cur = Math.max(Math.min(n.vPage, last), 1);
      app.clr(ul); //console.log('pagenav', m, min, max, last, min + m - 1);

      if (max > 1) {
        if (last > m) app.ins('li', app.ins('a', app.i('first', '&laquo;'), {
          href: '#1'
        }), {}, ul);
        app.ins('li', app.ins('a', app.i('left', '&lsaquo;'), {
          href: '#' + Math.max(1, cur - 1),
          className: cur == 1 ? 'inact' : ''
        }), {}, ul);

        for (var i = min; i <= max; i++) {
          var a = app.ins('a', i, {
            href: '#' + i,
            className: i == cur ? 'act bg' : ''
          });
          app.ins('li', a, {}, ul);
        }

        app.ins('li', app.ins('a', app.i('right', '&rsaquo;'), {
          href: '#' + Math.min(cur + 1, last),
          className: cur == last ? 'inact' : ''
        }), {}, ul);
        if (last > m) app.ins('li', app.ins('a', app.i('last', '&raquo;'), {
          href: '#' + last
        }), {}, ul);
      }
    }
  }, {
    key: "addFooter",
    value: function addFooter(n, rh) {
      var _this3 = this;

      var f = this.app.ins('tfoot', this.app.ins('tr'), {
        className: 'nobr'
      }, n);
      this.app.a(rh.cells).forEach(function (h) {
        var _this3$app$ins;

        var t = n.vTypes[h.cellIndex];
        var func = t == 's' ? 'count' : t == 'd' ? 'max' : 'sum';

        _this3.app.ins('th', _this3.app.ins(t == 's' ? 'i' : 'span', '', (_this3$app$ins = {}, _defineProperty(_this3$app$ins, _this3.opt.aTotal, func), _defineProperty(_this3$app$ins, "className", t == 's' ? 'text-n' : ''), _this3$app$ins)), {
          title: func
        }, f.firstChild);
      });
    }
  }, {
    key: "doFilter",
    value: function doFilter(t, e) {
      if (t.vPrev !== t.vInp.value || !e) {
        t.vPrev = t.vInp.value;
        if (this.opt.cFiltered) t.vInp.classList[t.vPrev.length > 0 ? 'add' : 'remove'](this.opt.cFiltered); //1.
        //clearTimeout(t.vTimeout);
        //t.vTimeout = setTimeout(this.filter.bind(this, t, t.vInp.value), this.opt.wait);
        //2.

        this.filter(t, t.vInp.value);
      }
    }
  }, {
    key: "doSort",
    value: function doSort(t, th, e) {
      if (e.target.closest ? !e.target.closest('a,input,select,label') : ' A INPUT SELECT LABEL '.indexOf(' ' + e.target.tagName + ' ') == -1) {
        //e.preventDefault();
        this.sort(t, th.cellIndex);
      }
    }
  }, {
    key: "isSortable",
    value: function isSortable(th) {
      //return this.val(th).length > 0;
      return !th.hasAttribute('data-unsort');
    }
  }, {
    key: "val",
    value: function val(s, cs) {
      var r = s.tagName ? s.innerHTML : '' + s;
      r = r.replace(/<!--.*?-->/g, '').replace(/<.*?>/g, '').replace(/&nbsp;/gi, ' ').replace(/^\s+/, '').replace(/\s+$/, '');
      if (!cs) r = r.toLowerCase();
      return r;
    }
  }, {
    key: "filter",
    value: function filter(n, q) {
      var cnt = 0;
      var i, j, data, s, hide;

      if (!n.vCols) {
        n.vCols = n.dataset.filterCols || '';
        n.vCols = n.vCols ? n.vCols.split(/\D+/) : false;
        if (n.vCols && this.opt.cScan) for (i = 0; i < n.vCols.length; i++) {
          if (n.vHead[n.vCols[i]]) n.vHead[n.vCols[i]].classList.add(this.opt.cScan);
        }
      }

      for (i = 0; i < n.vData.length; i++) {
        hide = 0;

        if (q !== '') {
          if (n.vCols.length > 0) {
            data = [];

            for (j = 0; j < n.vCols.length; j++) {
              data.push(n.vData[i].d[n.vCols[j]]);
            }
          } else data = n.vData[i].d;

          s = '|' + data.join('|') + '|';
          hide = !this.matches(s, q, n.vCase);
        }

        if (this.app.opt.cHide) n.vData[i].n.classList[hide ? 'add' : 'remove'](this.app.opt.cHide, this.opt.cUnmatch);else n.vData[i].n.style.display = hide ? 'none' : '';
        if (this.opt.cShow) n.vData[i].n.classList[hide ? 'remove' : 'add'](this.opt.cShow);
        n.vData[i].v = !hide;
        if (!hide) cnt++;
      } //update state


      n.vCount = cnt;
      this.updateTotals(n, cnt);
      var x = cnt + '/' + n.vData.length;
      if (n.vInp) n.vInp.title = x;
      if (n.vRep) n.vRep.textContent = x;
      if (n.vLimit) this.paginate(n, 1);
    }
  }, {
    key: "updateTotals",
    value: function updateTotals(n, cnt) {
      var _this4 = this;

      this.app.e(this.app.qq('[' + this.opt.aTotal + ']', n), function (m) {
        return m.textContent = _this4.countTotal(n, m, cnt);
      });
    }
  }, {
    key: "countTotal",
    value: function countTotal(n, m, cnt) {
      var _this5 = this;

      var d = n.vData;
      var j = m.closest('th, td').cellIndex;
      var a = m.dataset.total || '';
      var dec = 1 * (m.dataset.dec || 2);
      var mode = m.dataset.mode || n.vTypes[j];
      var r = 0; //if(a == 'count' || a == 'cnt') r = cnt;

      if (a == 'count' || a == 'cnt') r = d.reduce(function (acc, cur) {
        return acc + (cur.v && cur.x[j][0] !== '' ? 1 : 0);
      }, 0);else if (!cnt || mode == 'x') r = NaN;else if (a == 'sum' || a == 'avg') {
        r = mode == 's' ? NaN : d.reduce(function (acc, cur) {
          return acc + (cur.v ? _this5.numVal(cur.x[j]) : 0);
        }, 0) / (a == 'avg' ? cnt : 1);
      } // only for numbers
      else if (a == 'min') r = d.reduce(function (acc, cur) {
          return Math.min(acc, cur.v ? _this5.numVal(cur.x[j]) : Infinity);
        }, Infinity);else if (a == 'max') r = d.reduce(function (acc, cur) {
          return Math.max(acc, cur.v ? _this5.numVal(cur.x[j]) : -Infinity);
        }, -Infinity);
      return isNaN(r) ? '-' : this.strVal(r, mode, dec);
    }
  }, {
    key: "dec",
    value: function dec(x, d) {
      var m = Math.pow(10, d);
      if (d) x = Math.round(x * m) / m;
      return x;
    }
  }, {
    key: "matches",
    value: function matches(s, q, cs) {
      if (q.substr(0, 1) == '=') return s.indexOf('|' + q.substr(1).toLowerCase() + '|') != -1;else if (q.indexOf('*') != -1) {
        q = '\\|' + q.replace(/\*/g, '.*') + '\\|';
        return new RegExp(q, cs ? '' : 'i').test(s);
      } else return s.indexOf(cs ? q : q.toLowerCase()) != -1;
    }
  }, {
    key: "sort",
    value: function sort(n, col, desc) {
      if (desc === undefined) desc = this.opt.cAsc && n.vHead[col].classList.contains(this.opt.cAsc);
      n.vData.sort(this.cmp.bind(this, col));
      if (desc) n.vData.reverse();

      for (var j = 0; j < n.vHead.length; j++) {
        this.mark(n.vHead[j], j == col ? desc ? -1 : 1 : 0);
      }

      this.build(n);
      if (n.vLimit) this.paginate(n, 1);
    }
  }, {
    key: "build",
    value: function build(n) {
      var tb = n.querySelector('tbody');

      for (var i = 0; i < n.vData.length; i++) {
        tb.appendChild(n.vData[i].n);
      }
    }
  }, {
    key: "mark",
    value: function mark(h, d) {
      if (this.opt.cAsc) h.classList[d > 0 ? 'add' : 'remove'](this.opt.cAsc);
      if (this.opt.cDesc) h.classList[d < 0 ? 'add' : 'remove'](this.opt.cDesc);
    }
  }, {
    key: "convert",
    value: function convert(v) {
      var r = Dt.parse(v);
      r = r ? r.getTime() : NaN;
      if (!isNaN(r)) return [r, 'd'];
      r = this.sz(v);
      if (!isNaN(r)) return [r, 'b'];
      r = this.interval(v);
      if (!isNaN(r)) return [r, 'i'];
      r = this.nr(v);
      if (!isNaN(r)) return [r, 'n'];
      return [v, 's'];
    }
  }, {
    key: "numVal",
    value: function numVal(x) {
      return x[1] == 's' ? this.nr(x[0], 1) : x[0];
    }
  }, {
    key: "strVal",
    value: function strVal(x, mode, dec) {
      if (mode == 's') return x;else if (mode == 'n') return x.toFixed(dec) * 1; //this.dec(x, dec);
      else if (mode == 'b') return this.fmtSz(x, dec);else if (mode == 'i') return this.fmtInterval(x, dec);else if (mode == 'd') return Dt.fmt(new Date(x), dec, this.opt.dateFormat);else return x;
    }
  }, {
    key: "fmtSz",
    value: function fmtSz(x, dec) {
      var i = x ? Math.min(5, Math.floor(Math.log(x) / Math.log(1024))) : 0;
      return (x / Math.pow(1024, i)).toFixed(dec) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB', 'PB'
      /*, 'EB', 'ZB', 'YB'*/
      ][i];
    }
  }, {
    key: "fmtInterval",
    value: function fmtInterval(x, dec) {
      var y = this.intervalUnits.y;
      var m = this.intervalUnits.m;
      var s = [[Math.floor(x / y), 'y'], [Math.floor(x % y / m), 'm'], [Math.floor(x % y % m / 86400), 'd'], [Math.floor(x % y % m % 86400 / 3600), 'h'], [Math.floor(x % y % m % 86400 % 3600 / 60), 'min'], [x % y % m % 86400 % 3600 % 60, 'sec']];
      return s.map(function (v) {
        return v[0] ? v[0] + v[1] : null;
      }).filter(function (v) {
        return v !== null;
      }).join(' ');
    }
  }, {
    key: "cmp",
    value: function cmp(by, a, b) {
      a = a.x[by][0];
      b = b.x[by][0];
      return a < b ? -1 : a > b ? 1 : 0;
    }
  }, {
    key: "nr",
    value: function nr(s, nanToZero) {
      //use Number instead of parseFloat for more strictness
      s = this.skipComma ? s.replace(/(\$|,|\s)/g, '') : s.replace(/(\$|\s)/g, '').replace(',', '.');
      s = parseFloat(s.replace(/\u2212/g, '-')); // unicode minus

      if (isNaN(s) && nanToZero) s = 0;
      return s;
    }
  }, {
    key: "interval",
    value: function interval(s) {
      var x = this.intervalUnits;
      var m = s.match(/\d+\s?(y|m|w|d|h|min|mi|sec|s|msec|ms)\b/gi);
      if (m) m = m.map(function (v) {
        return v.match(/^(\d+)\s?(.*)$/);
      }); //matchAll && m = [...m];

      return m && m.length > 0 ? m.map(function (cur) {
        return x[cur[2]] ? cur[1] * x[cur[2]] : 0;
      }).reduce(function (a, b) {
        return a + b;
      }, 0) : NaN;
    }
  }, {
    key: "sz",
    value: function sz(s) {
      var x = this.szUnits;
      var m = s.match(/^((\d*\.)?\d+)\s*(([kmgtp]i?)?b)$/i);

      if (m) {
        m[3] = m[3].replace(/ib$/i, 'b').toLowerCase();
        if (x[m[3]]) return m[1] * x[m[3]];
      }

      return NaN;
    }
  }]);

  return _default;
}(plugins_plugin["a" /* default */]);


// CONCATENATED MODULE: ./src/js/plugins/calendar.js
function calendar_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { calendar_typeof = function _typeof(obj) { return typeof obj; }; } else { calendar_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return calendar_typeof(obj); }

function calendar_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function calendar_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function calendar_createClass(Constructor, protoProps, staticProps) { if (protoProps) calendar_defineProperties(Constructor.prototype, protoProps); if (staticProps) calendar_defineProperties(Constructor, staticProps); return Constructor; }

function calendar_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) calendar_setPrototypeOf(subClass, superClass); }

function calendar_setPrototypeOf(o, p) { calendar_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return calendar_setPrototypeOf(o, p); }

function calendar_createSuper(Derived) { var hasNativeReflectConstruct = calendar_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = calendar_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = calendar_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return calendar_possibleConstructorReturn(this, result); }; }

function calendar_possibleConstructorReturn(self, call) { if (call && (calendar_typeof(call) === "object" || typeof call === "function")) { return call; } return calendar_assertThisInitialized(self); }

function calendar_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function calendar_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function calendar_getPrototypeOf(o) { calendar_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return calendar_getPrototypeOf(o); }

/*! calendar - replacement of standard date and datetime-local inputs */
// import toggle from './toggle.js'



var calendar_default = /*#__PURE__*/function (_Plugin) {
  calendar_inherits(_default, _Plugin);

  var _super = calendar_createSuper(_default);

  function _default() {
    var _this;

    calendar_classCallCheck(this, _default);

    _this = _super.call(this, 'calendar');
    _this.opt = {
      cBtn: 'pad hover',
      dateFormat: 'd',
      //y=Y-m-d, d=d.m.Y, m=m/d Y
      hCancel: '#close',
      hashNow: '#now',
      addIcons: [['date', '#', '#open'], ['ok', '&check;', '#now'], ['delete', '&#x2715;', '#clear']],
      idPicker: 'pick-date',
      minWidth: 801,
      qsCalendar: 'input.calendar',
      showModal: 0,
      // ! avoid modal calendar inside modal dialog
      sizeLimit: 801,
      stepMinutes: 1,
      inPop: 0
    };
    _this.win = null;
    return _this;
  }

  calendar_createClass(_default, [{
    key: "init",
    value: function init()
    /*opt*/
    {
      var _this2 = this;

      //let i;
      //for(i in opt) this.opt[i] = opt[i];
      if (window.innerWidth < this.opt.minWidth) return;
      this.win = this.app.ins('div', '', {
        id: this.opt.idPicker,
        className: this.app.opt.cToggle + ' ' + this.app.opt.cOff + ' pad'
      }); //dlg hide pad

      this.win.style.whiteSpace = 'nowrap';
      document.body.appendChild(this.win);
      this.app.e(this.opt.qsCalendar, function (n) {
        return _this2.preparePick(n);
      });
      this.app.h('click', this.opt.qsCalendar, function (e) {
        return _this2.openDialog(e.target, null, e);
      });
      this.app.h('input', this.opt.qsCalendar, function (e) {
        return _this2.validate(e.target, 0);
      }); //this.app.h('keydown', this.opt.qsCalendar, e => this.key(e));
      //this.app.h('click', '#' + this.opt.idPicker, e => app.pf('toggle', 'setShown', e.recv.vRel));

      this.app.h('click', '#' + this.opt.idPicker + ' a', function (e) {
        return _this2.onClick(e);
      });
      this.app.h('click', '.calendar-tools a', function (e) {
        return _this2.onClick(e, true);
      });
    }
    /*
    key (e){
      if(e.keyCode == 40 && !this.app.vis(this.win)) this.openDialog(e.target, null, e);
    }
    */

  }, {
    key: "onClick",
    value: function onClick(e, tool) {
      var a = e.recv;
      var h = a.hash;

      if (h) {
        //nodes
        var n;
        var c = this.opt.qsCalendar;

        if (tool) {
          n = this.opt.inPop ? this.app.q(c, this.app.next(a.parentNode, '.pop', true)) : this.app.next(a.parentNode, c, true);
        } else if (this.win.vRel) n = this.win.vRel;else {
          var p = a.closest('#' + this.opt.idPicker);
          n = this.opt.inPop ? this.app.next(p, c, true) : this.app.next(p.parentNode, c);
        } //data


        var x = this.win.vCur;
        var dy = h == '#prev-year' ? -1 : h == '#next-year' ? 1 : 0;
        var dm = h == '#prev-month' ? -1 : h == '#next-month' ? 1 : 0;
        var dh = h == '#prev-hour' ? -1 : h == '#next-hour' ? 1 : 0;
        var di = h == '#prev-min' ? -this.opt.stepMinutes : h == '#next-min' ? this.opt.stepMinutes : 0; //actions

        if (dy || dm) this.switchMonths(n, x.getFullYear() + dy, x.getMonth() + dm, x.getDate());else if (dh || di) this.setTime(n, dh, di);else if (h == this.opt.hashNow) this.closeDialog(n, true);else if (h == this.opt.hCancel) this.closeDialog(n, null); // same as esc
        else if (h == '#open') this.openDialog(n, null);else if (h == '#clear') this.closeDialog(n, '');else if (h.match(/#\d\d?/)) this.closeDialog(n, this.fmt(x, h.substr(1)));
        this.app.pf('toggle', 'setShown', h == '#open' ? this.win : n);
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }, {
    key: "toggle",
    value: function toggle(on, n) {
      if (n) {
        var m = n.dataset.mode;
        if (m) m = m[0] === 'm'; // modal | popup
        else m = this.opt.showModal || Math.min(window.innerWidth, window.innerHeight) < this.opt.sizeLimit;

        if (on) {
          this.win.className = this.app.opt.cToggle + ' ' + this.app.opt.cOff + ' pad ' + (m ? 'dlg' : '');
          (m ? document.body : n.thePop).appendChild(this.win);

          if (m) {
            var s = this.win.style;
            s.left = s.right = s.top = s.bottom = '';
          }

          this.win.vRel = n; //m ? n : null;//m ? null : n;//n;
        }
      }

      this.app.toggle(this.win, on); //if(!on) this.win.tabindex = -1;

      if (!on) document.body.appendChild(this.win); //this.app.fire('after');
    }
  }, {
    key: "preparePick",
    value: function preparePick(n) {
      n.vTime = n.type == 'datetime-local' || n.classList.contains('datetime');
      n.type = 'text';
      n.autocomplete = 'off';
      if (n.value) n.value = this.fmt(this.parse(n.value), 0, n.vTime);
      var pop = this.app.ins('div', '', {
        className: 'pop l'
      }, n, -1); //''

      if (!this.opt.inPop) pop.style.verticalAlign = 'bottom';
      n.thePop = pop;

      if (this.opt.addIcons.length > 0) {
        var ic = this.app.ins('span', '', {
          className: 'input-tools calendar-tools nobr'
        }, n, 1); //icons container

        for (var i in this.opt.addIcons) {
          this.app.ins('', ' ', {}, ic);
          this.app.ins('a', this.app.i.apply(this.app, this.opt.addIcons[i].slice(0, 2)), {
            href: this.opt.addIcons[i][2],
            className: 'let'
          }, ic);
        }
      }

      if (this.opt.inPop) pop.appendChild(n);
    }
  }, {
    key: "openDialog",
    value: function openDialog(n, d, e) {
      if (e) e.preventDefault();
      this.build(n, d || n.value);
      this.toggle(true, n); //let f = (this.app.q('.bg-w', this.win) || this.app.q('#1', this.win));
      //if(f) f.focus();
    }
  }, {
    key: "closeDialog",
    value: function closeDialog(n, d) {
      if (n) {
        this.setValue(n, d);
        n.focus();
      }

      this.toggle(false);
    }
  }, {
    key: "n",
    value: function n(v, l) {
      return ('000' + v).substr(-(l || 2));
    }
  }, {
    key: "getLimit",
    value: function getLimit(n, a, t) {
      return n[a] ? this.fmt(this.parse(n[a]), 0, t, 'y') : a == 'max' ? '9999' : '0000';
    }
  }, {
    key: "errLimits",
    value: function errLimits(n) {
      var min = this.getLimit(n, 'min', n.vTime);
      var max = this.getLimit(n, 'max', n.vTime);
      var v = this.fmt(this.parse(n.value), 0, n.vTime, 'y');
      return min && v < min || max && v > max ? min + ' .. ' + max : '';
    }
  }, {
    key: "validate",
    value: function validate(n, re) {
      n.setCustomValidity(re || n.value == '' ? '' : this.errLimits(n));
      n.checkValidity();
      if (n.reportValidity) n.reportValidity();
    }
  }, {
    key: "update",
    value: function update(n, x) {
      var rows = this.win.vDays;
      this.app.clr(rows);
      var y = x.getFullYear();
      var m = x.getMonth();
      var d = x.getDate();
      var min = this.getLimit(n, 'min', 0);
      var max = this.getLimit(n, 'max', 0); //y,m,h,mi

      this.win.vNodeCur.textContent = this.n(m + 1) + '.' + y;
      this.win.vHours.textContent = this.n(n.vTime ? x.getHours() : 0);
      this.win.vMinutes.textContent = this.n(n.vTime ? x.getMinutes() : 0); //days

      var days = new Date(y, m + 1, 0).getDate(); //days in month

      var skip = (new Date(y, m, 1).getDay() + 6) % 7; //skip weekdays

      var maxd = Math.ceil((skip + days) / 7) * 7 - skip;
      var c, vv, sel, today, off, wd;
      var cd = this.fmt(new Date());
      var xd = this.fmt(x);
      var row;

      for (var i = -skip + 1; i <= maxd; i++) {
        wd = (skip + i - 1) % 7 + 1;
        if (wd == 1) row = this.app.ins('div', '', {
          className: 'row'
        }, rows);
        if (i < 1 || i > days) c = this.app.ins('a', '', {
          className: 'pad c center'
        }, row);else {
          vv = this.fmt(x, i, 0, 'y');
          sel = i == d;
          today = false; //(this.fmt(x, i) == cd);

          off = min && vv < min || max && vv > max;
          c = this.app.ins('a', i, {
            className: 'pad c center ' + (sel ? 'bg-w ' : '') + (today ? 'bg-y ' : '') + (off ? 'text-n ' : 'hover ') + (wd > 5 ? 'text-e ' : '')
          }, row);
          if (!off) c.href = '#' + i;
        }
      } //time


      this.win.vNodeTime.classList[n.vTime ? 'remove' : 'add'](this.app.opt.cHide);
    }
  }, {
    key: "build",
    value: function build(n, x) {
      var app = this.app;
      if (typeof x === 'string') x = this.parse(x || n.dataset.def || '');
      this.win.vCur = x;

      if (!this.win.vDays) {
        app.clr(this.win); //buttons

        var p1 = app.ins('p', '', {
          className: 'c'
        }, this.win);
        this.btn(this.opt.hashNow, app.i('ok', '&check;'), p1);
        this.btn('#prev-year', app.i('prev2', '&laquo;'), p1);
        this.btn('#prev-month', app.i('prev', '&lsaquo;'), p1);
        this.win.vNodeCur = app.ins('span', '', {
          className: 'pad'
        }, p1);
        this.btn('#next-month', app.i('next', '&rsaquo;'), p1);
        this.btn('#next-year', app.i('next2', '&raquo;'), p1);
        this.btn(this.opt.hCancel, app.i('close', '&#x2715;'), p1);
        app.ins('hr', '', {}, this.win); //dates

        this.win.vDays = app.ins('div', '', {}, this.win); //time

        var hm = app.ins('div', '', {}, this.win);
        this.win.vNodeTime = hm;
        app.ins('hr', '', {}, hm);
        var p2 = app.ins('p', '', {
          className: 'c'
        }, hm);
        this.btn('#prev-hour', app.i('prev', '&lsaquo;'), p2);
        this.win.vHours = app.ins('span', '', {
          className: 'pad'
        }, p2);
        this.btn('#next-hour', app.i('next', '&rsaquo;'), p2);
        app.ins('span', ':', {
          className: 'pad'
        }, p2);
        this.btn('#prev-min', app.i('prev', '&lsaquo;'), p2);
        this.win.vMinutes = app.ins('span', '', {
          className: 'pad'
        }, p2);
        this.btn('#next-min', app.i('next', '&rsaquo;'), p2);
      }

      this.update(n, x);
    }
  }, {
    key: "switchMonths",
    value: function switchMonths(n, y, m, d) {
      if (d > 28) {
        var days = new Date(y, m + 1, 0).getDate(); //days in month

        d = Math.min(d, days);
      }

      var h = parseInt(this.win.vHours.textContent, 10);
      var i = parseInt(this.win.vMinutes.textContent, 10);
      this.build(n, new Date(y, m, d, h, i));
    }
  }, {
    key: "setTime",
    value: function setTime(n, dh, di) {
      var step = dh || di;
      var max = dh ? 24 : 60;
      var m = this.win[dh ? 'vHours' : 'vMinutes'];
      var v = parseInt(m.textContent, 10);
      var x = v % Math.abs(step);
      v += x ? step > 0 ? step - x : -x : max + step;
      m.textContent = this.n(v % max);
      this.setValue(n, this.fmt(this.parse(n.value)));
    }
  }, {
    key: "setValue",
    value: function setValue(n, d) {
      if (d !== null) {
        n.value = d === true ? this.fmt(0, 0, n.vTime) : d;
        var h = this.win.vHours;
        var m = this.win.vMinutes;
        if (n.vTime && d !== true && d !== '' && h && m) n.value += ' ' + this.n(h.textContent) + ':' + this.n(m.textContent);
        this.validate(n, 0);
      }
    }
  }, {
    key: "parse",
    value: function parse(d) {
      return Dt.parse(d) || new Date();
    }
  }, {
    key: "fmt",
    value: function fmt(x, i, t, f) {
      if (!x) x = new Date();
      if (i) x = new Date(x.getFullYear(), x.getMonth(), i);
      return Dt.fmt(x, t, f);
    }
  }, {
    key: "btn",
    value: function btn(h, s, p) {
      return this.app.ins('a', s, {
        href: h,
        className: this.opt.cBtn
      }, p);
    }
  }]);

  return _default;
}(plugins_plugin["a" /* default */]);


// CONCATENATED MODULE: ./src/js/plugins/lookup.js
function lookup_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { lookup_typeof = function _typeof(obj) { return typeof obj; }; } else { lookup_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return lookup_typeof(obj); }

function lookup_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function lookup_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function lookup_createClass(Constructor, protoProps, staticProps) { if (protoProps) lookup_defineProperties(Constructor.prototype, protoProps); if (staticProps) lookup_defineProperties(Constructor, staticProps); return Constructor; }

function lookup_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) lookup_setPrototypeOf(subClass, superClass); }

function lookup_setPrototypeOf(o, p) { lookup_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return lookup_setPrototypeOf(o, p); }

function lookup_createSuper(Derived) { var hasNativeReflectConstruct = lookup_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = lookup_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = lookup_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return lookup_possibleConstructorReturn(this, result); }; }

function lookup_possibleConstructorReturn(self, call) { if (call && (lookup_typeof(call) === "object" || typeof call === "function")) { return call; } return lookup_assertThisInitialized(self); }

function lookup_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function lookup_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function lookup_getPrototypeOf(o) { lookup_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return lookup_getPrototypeOf(o); }

/*! lookup - autocomplete lookups with data from XHTTP request */
// import toggle from './toggle.js'
// import fetch from './fetch.js'


var lookup_default = /*#__PURE__*/function (_Plugin) {
  lookup_inherits(_default, _Plugin);

  var _super = lookup_createSuper(_default);

  function _default() {
    var _this;

    lookup_classCallCheck(this, _default);

    _this = _super.call(this, 'lookup');
    _this.opt = {
      dLabel: 'label',
      // data-label
      dLookup: 'lookup',
      dCap: 'cap',
      dList: 'list',
      dUrl: 'url',
      dGoto: 'goto',
      cacheLimit: 0,
      pList: 'lookup-list-',
      max: 10,
      wait: 300,
      inPop: 0
    };
    _this.win = null;
    return _this;
  }

  lookup_createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var app = this.app;
      this.win = app.ins('div', '', {
        id: this.opt.pList + app.seq(),
        className: app.opt.cToggle + ' ' + app.opt.cOff
      });
      this.closeList();
      document.body.appendChild(this.win);
      app.e('input[data-' + this.opt.dLookup + ']', function (n) {
        return _this2.prepare(n);
      });
      app.e('[data-chain]', function (n) {
        return _this2.updateChain(n);
      });
      var f = app.debounce(this.find.bind(this), this.opt.wait);
      app.h('input', '.lookup-input', f); // e => f(e)

      app.h('keydown', '.lookup-input', function (e) {
        return _this2.key(e);
      });
      app.h('click', '.lookup-item', function (e) {
        return _this2.choose(e);
      });
      app.h('click', '.lookup-goto', function (e) {
        return _this2.go(e);
      });
      app.h('change', '[data-chain]', function (e) {
        return _this2.updateChain(e.target);
      });
    }
  }, {
    key: "prepare",
    value: function prepare(n) {
      var app = this.app;
      if (this.cap(n)) return;
      n.vLabel = this.opt.dLabel in n.dataset ? n.dataset[this.opt.dLabel] : n.value || '';
      var pop = app.ins('div', '', {
        className: 'pop l lookup-pop'
      }, n, 1);
      if (!this.opt.inPop) pop.style.verticalAlign = 'bottom';
      n.classList.add('bg-n', 'lookup-id');
      n.classList.add(app.opt.cHide); //n.type = 'hidden';

      var m = app.ins('input', '', {
        type: 'text',
        value: n.vLabel,
        className: 'lookup-input subinput'
      }, pop, this.opt.inPop ? 0 : 1);
      m.name = 'lookup-' + n.name; //m.required = n.required;
      //n.required = false;

      if (n.id) {
        m.id = 'lookup-' + n.id;
        if (n.title) m.title = n.title;
        app.e('[for="' + n.id + '"]', function (lbl) {
          return lbl.htmlFor = m.id;
        });
      }

      if (n.placeholder) m.placeholder = n.placeholder;
      m.autocomplete = 'off';
      var i = null;

      if (this.opt.dUrl in n.dataset) {
        var ic = app.ins('span', '', {
          className: 'input-tools nobr'
        }, this.opt.inPop ? pop : m, 1); //icons container

        i = app.ins('a', app.i('forward', '&rarr;'), {
          href: '#goto',
          className: 'let lookup-goto'
        }, ic);
        i.style.cursor = 'pointer';
        app.ins('', ' ', {}, ic, -1);
      }

      this.initCaption(n);
    }
  }, {
    key: "initCaption",
    value: function initCaption(n) {
      var _this3 = this;

      var uc = n.dataset[this.opt.dCap] || '';

      if (uc && n.value && !(this.opt.dLabel in n.dataset)) {
        var u = encodeURI(decodeURI(this.app.makeUrl(uc, {
          time: new Date().getTime()
        })).replace(/\{q\}/, n.value));
        this.app.fetch(u, function (req) {
          var d = _this3.app.parse(req.responseText);

          if (d) _this3.fix(n, n.value, d.data);
        });
      }
    }
  }, {
    key: "ident",
    value: function ident(n, mode) {
      if (mode != 't' && (mode == 'i' || this.opt.inPop)) n = n.closest('.lookup-pop');
      return this.app.next(n, '.lookup-id', true);
    }
  }, {
    key: "cap",
    value: function cap(n) {
      return this.opt.inPop ? this.app.q('.lookup-input', this.pop(n)) : this.app.next(n, '.lookup-input');
    }
  }, {
    key: "pop",
    value: function pop(n) {
      return this.app.next(n, '.lookup-pop');
    }
  }, {
    key: "find",
    value: function find(e) {
      var c = e.target;
      var n = this.ident(c);
      if (!n) return;
      var v = c.value;
      if (v === '') this.fix(n, '', ''); //empty
      else if (n.vCache && n.vCache[v]) this.openList(n, n.vCache[v]); //cached
        else {
            var u = encodeURI(decodeURI(this.app.makeUrl(n.dataset[this.opt.dLookup] || '', {
              //value: v,
              time: new Date().getTime()
            })).replace(/\{q\}/, v));
            n.vCur = null;
            this.app.fetch(u, this.list.bind(this, v, n));
          }
    }
  }, {
    key: "list",
    value: function list(u, n, req) {
      var d = this.app.parse(req.responseText);

      if (d) {
        if (u === this.cap(n).value) this.openList(n, d.data);
        this.store(n, u, d);
      }
    }
  }, {
    key: "openList",
    value: function openList(n, d, e) {
      if (e) e.stopPropagation();
      this.closeList();
      var pop = this.pop(n);
      pop.appendChild(this.win); //this.win.vRel = n.vCap;

      this.app.toggle(this.win, true);
      this.build(n, d); //this.app.pf('toggle', 'setShown', null);
    }
  }, {
    key: "closeList",
    value: function closeList() {
      this.app.toggle(this.win, false);
    }
  }, {
    key: "build",
    value: function build(n, d) {
      var app = this.app;
      app.clr(this.win);
      var ul = app.ins('ul', '', {
        className: 'nav let hover'
      }, this.win);
      var w,
          j = 0;
      var go = n.dataset[this.opt.dGoto] || '';

      for (var i in d) {
        w = app.ins('li', '', {}, ul);
        var a = app.ins('a', '', {
          href: go ? go.replace(/\{id\}/, d[i].id) : '#' + d[i].id,
          className: '-pad -hover' + (go ? '' : ' lookup-item')
        }, w);
        app.ins('span', d[i].nm, {}, a);

        if (d[i].info) {
          app.ins('br', '', {}, a);
          app.ins('small', d[i].info, {
            className: 'text-n'
          }, a);
        }

        j++;
        if (j >= this.opt.max) break;
      }

      if (ul.firstChild) this.hilite(n, ul.firstChild.firstChild);
    }
  }, {
    key: "hilite",
    value: function hilite(n, a) {
      if (n.vCur) n.vCur.classList.remove(this.app.opt.cAct);
      a.classList.add(this.app.opt.cAct);
      n.vCur = a;
    }
  }, {
    key: "hiliteNext",
    value: function hiliteNext(n, prev) {
      if (n.vCur) {
        var a = n.vCur.parentNode[prev ? 'previousSibling' : 'nextSibling'];
        if (!a) a = n.vCur.parentNode.parentNode[prev ? 'lastChild' : 'firstChild'];
        a = a.firstChild;
        this.hilite(n, a);
      }
    }
  }, {
    key: "choose",
    value: function choose(e) {
      if (e) e.preventDefault();
      var a = e.recv;
      var n = this.ident(a, 'i');
      n.vCur = a;
      this.fix(n, a.hash.substr(1), a.firstChild.textContent);
    }
  }, {
    key: "fix",
    value: function fix(n, v, c) {
      n.vCur = null;
      if (n.vWait) clearTimeout(n.vWait);
      n.value = v;
      n.vLabel = this.cap(n).value = c;
      this.app.dispatch(n, ['input', 'change']);
      this.closeList();
    }
  }, {
    key: "key",
    value: function key(e) {
      var n = e.target ? this.ident(e.target) : null;
      ;

      if (n) {
        if (e.keyCode == 27) this.fix(n, n.value, n.vLabel);else if (e.keyCode == 40 && !this.app.vis(this.win)) this.find(e);else if (e.keyCode == 38 || e.keyCode == 40) this.hiliteNext(n, e.keyCode == 38);else if (e.keyCode == 13 && n.vCur) {
          if (this.app.vis(this.win)) e.preventDefault();
          n.vCur.click();
        }
      }
    }
  }, {
    key: "go",
    value: function go(e) {
      var n = e.recv ? this.ident(e.recv.parentNode, 't') : null;

      if (n) {
        e.preventDefault();
        var u = n.dataset[this.opt.dUrl] || '';
        if (n.value.length > 0 && u) location.href = encodeURI(decodeURI(u).replace(/\{id\}/, n.value));
      }
    } // update chain

  }, {
    key: "updateChain",
    value: function updateChain(n) {
      var m = this.app.q(n.dataset.chain || '');

      if (m) {
        if (!n.value) this.setOptions(m, []);else {
          var u = (m.dataset[this.opt.dList] || '').replace(/\{q\}/, n.value);
          if (m.vCache && m.vCache[u]) this.setOptions(m, m.vCache[u]);else this.app.fetch(u, this.onChainData.bind(this, u, m));
        }
      }
    }
  }, {
    key: "onChainData",
    value: function onChainData(u, n, req) {
      var d = this.app.parse(req.responseText);

      if (d) {
        this.setOptions(n, d.data);
        this.store(n, u, d);
      }
    }
  }, {
    key: "setOptions",
    value: function setOptions(n, a) {
      var _this4 = this;

      if (n.list) {
        if (n.list) {
          this.app.clr(n.list);
          n.value = '';
          if (a) a.forEach(function (v) {
            return _this4.app.ins('option', '', {
              value: v.nm
            }, n.list);
          });
        }
      } else {
        this.app.clr(n);
        var z = n.dataset.placeholder || '';
        if (!a || a.length == 0 || z) this.app.ins('option', z || '-', {
          value: ''
        }, n);
        if (a) a.forEach(function (v) {
          return _this4.app.ins('option', v.nm, {
            value: v.id
          }, n);
        });
      }
    }
  }, {
    key: "store",
    value: function store(n, u, d) {
      var c = 1 * (n.dataset.cache || this.opt.cacheLimit);

      if (c) {
        if (!n.vCache || Object.keys(n.vCache).length >= c) n.vCache = {};
        if (d) n.vCache[u] = d.data;
      }
    }
  }]);

  return _default;
}(plugins_plugin["a" /* default */]);


// CONCATENATED MODULE: ./src/js/plugins/edit.js
function edit_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { edit_typeof = function _typeof(obj) { return typeof obj; }; } else { edit_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return edit_typeof(obj); }

function edit_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function edit_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function edit_createClass(Constructor, protoProps, staticProps) { if (protoProps) edit_defineProperties(Constructor.prototype, protoProps); if (staticProps) edit_defineProperties(Constructor, staticProps); return Constructor; }

function edit_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) edit_setPrototypeOf(subClass, superClass); }

function edit_setPrototypeOf(o, p) { edit_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return edit_setPrototypeOf(o, p); }

function edit_createSuper(Derived) { var hasNativeReflectConstruct = edit_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = edit_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = edit_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return edit_possibleConstructorReturn(this, result); }; }

function edit_possibleConstructorReturn(self, call) { if (call && (edit_typeof(call) === "object" || typeof call === "function")) { return call; } return edit_assertThisInitialized(self); }

function edit_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function edit_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function edit_getPrototypeOf(o) { edit_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return edit_getPrototypeOf(o); }

/*! edit - wysiwyg text editor */
// import toggle from './toggle.js'


var edit_default = /*#__PURE__*/function (_Plugin) {
  edit_inherits(_default, _Plugin);

  var _super = edit_createSuper(_default);

  function _default() {
    var _this;

    edit_classCallCheck(this, _default);

    _this = _super.call(this, 'edit');
    _this.opt = {
      qAdjust: 'textarea.adjust',
      qEdit: 'textarea.edit',
      height: 30,
      //em
      tools: '/*@xbi_.#123p|c,s^vdqf~T(=)j+-'
    };
    _this.btn = {
      // key: [command, html, icon, title]
      '/': ['src', '', '/', 'Source'],
      // &lt;/&gt;
      '*': ['insertimage', '~', '*', 'Image'],
      '@': ['createlink', '~', '@', 'Link'],
      'x': ['unlink', '', '&times;', 'Unlink'],
      'b': ['bold', '', '<b>B</b>', 'Bold'],
      'i': ['italic', '', '<i>I</i>', 'Italic'],
      '_': ['removeformat', '', '_', 'Unformat'],
      '.': ['insertUnorderedList', '', '&bull;', 'List'],
      '#': ['insertOrderedList', '', '#', 'Ordered'],
      '1': ['formatblock', '<h1>', 'H1', 'Head 1'],
      '2': ['formatblock', '<h2>', 'H2', 'Head 2'],
      '3': ['formatblock', '<h3>', 'H3', 'Head 3'],
      'p': ['formatblock', '<p>', '&sect;', 'Paragraph'],
      '|': ['tools', '', '&hellip;', 'Tools'],
      //more
      //inline
      'c': ['inserthtml', '<code>^</code>', '{}', 'Code'],
      ',': ['inserthtml', '<abbr title="~">^</abbr>', 'A.B.', 'Abbreviation'],
      's': ['strikeThrough', '', '<s>S</s>', 'Strike through'],
      '^': ['subscript', '', 'a<sub>x</sub>', 'Subscript'],
      'v': ['superscript', '', 'a<sup>x</sup>', 'Superscript'],
      //block
      'd': ['formatblock', '<div>', 'D', 'Div'],
      'q': ['formatblock', '<blockquote>', '&#8220;', 'Block quote'],
      'f': ['formatblock', '<pre>', '[]', 'Preformatted'],
      '~': ['inserthorizontalrule', '', '&minus;', 'Horizontal ruler'],
      'T': ['inserthtml', '<table><tr><th>#<th>#<tr><td>-<td>-</table>', 'T', 'Table'],
      //more
      '(': ['justifyLeft', '', '&lt;', 'Justify left'],
      '=': ['justifyCenter', '', '=', 'Justify center'],
      ')': ['justifyRight', '', '&gt;', 'Justify right'],
      'j': ['justifyFull', '', '&equiv;', 'Justify full'],
      '+': ['indent', '', '&raquo;', 'Increase indent'],
      '-': ['outdent', '', '&laquo;', 'Decrease indent']
      /*
      'u': ['underline', '', 'U', 'Underline'],
      'C': ['foreColor','~','TC','Text color','#c00'],
      'h': ['hiliteColor','~','HC','Hilite color','#ff0'],
      'B': ['backColor','~','BC','Back color','#eee'],
      'S': ['fontSize','~','FS','Font size',4],
      'F': ['fontName','~','FN','Font name','serif'],
      'L': ['inserthtml','<div class="pad bg left">^</div>','FL','Float left'],
      'R': ['inserthtml','<div class="pad bg right">^</div>','FR','Float right']
      */

    };
    return _this;
  }

  edit_createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var app = this.app;
      app.e(this.opt.qEdit, function (n) {
        return _this2.prepare(n);
      });
      app.e(this.opt.qAdjust, function (n) {
        return _this2.setStyle(n);
      });
      this.adjustAll(); //wysiwyg

      app.h('click', 'label[for]', function (e) {
        return _this2.setFocus(e.recv);
      });
      app.h('click', 'a[data-cmd]', function (e) {
        return _this2.cmd(e);
      });
      app.h(['input', 'blur'], '.edit-wysiwyg', function (e) {
        return _this2.up(0, e.target);
      }); //for validation
      //app.listen('value', e => e.n.theWys ? (e.modeAuto ? this.modeAuto(e.n) : this.up(1, e.n.theWys)) : null);

      app.listen('value', function (e) {
        if (e.n.theWys) {
          _this2.up(1, e.n.theWys); // update wysiwyg from area


          if (e.modeAuto) _this2.modeAuto(e.n);
        }
      });
      app.b([window], 'paste', function (e) {
        return _this2.onPaste(e);
      }, true); //adjust

      app.h('input', this.opt.qAdjust, function (e) {
        return _this2.adjust(e.target);
      });
      app.h('mouseup', this.opt.qAdjust, function (e) {
        return _this2.resized(e.target);
      });
      app.b([window], 'resize', function (e) {
        return _this2.adjustAll();
      });
    }
  }, {
    key: "setFocus",
    value: function setFocus(l) {
      var a = this.app.q('#' + l.htmlFor);
      if (a && a.theWys && this.app.vis(a.theWys)) a.theWys.focus();
    }
  }, {
    key: "prepare",
    value: function prepare(n) {
      if (!n.theWys) {
        var app = this.app;
        var m = app.ins('nav', '', {
          className: 'bg'
        },
        /*d*/
        n, -1);
        var mm = app.ins('div', '', {
          className: app.opt.cToggle + ' ' + app.opt.cOff
        }); //let zc = app.ins('div', '', {className:'subinput'}, n, 1)

        var z = app.ins('div', '', {
          className: app.opt.cToggle + ' bord pad subinput edit-wysiwyg'
        }, n, 1
        /*zc*/
        );
        z.setAttribute('contenteditable', true);
        z.theArea = n;
        z.theNav = m;
        n.theWys = z;
        n.classList.add(app.opt.cToggle);
        if (n.id) z.id = 'wys-' + n.id;
        var t = (n.dataset.tools || this.opt.tools).split('');
        var to = m;

        for (var i in t) {
          var b = this.btn[t[i]];
          var a = app.ins('a', b[2], {
            href: '#cmd-' + b[0]
            /*i*/
            ,
            title: b[3],
            className: app.opt.cToggle + ' pad hover',
            'data-cmd': t[i]
          }, to);
          if (b[0] == 'tools') to = mm;
        }

        m.appendChild(mm);
        n.className += ' bord pad';
        n.style.width = '100%';
        this.setStyle(n);
        this.setStyle(z); //let l = n.closest('label') || n;
      }

      this.up(1, n.theWys);
      this.modeAuto(n);
    }
  }, {
    key: "modeAuto",
    value: function modeAuto(n) {
      var wys = n.dataset.mode;
      if (wys) wys = wys[0] === 'w';else {
        wys = (n.dataset.tools || this.opt.tools).indexOf('/') == -1 || n.value.match(/(>|&\w+;)/) && !n.value.match(/<script/i);
      }
      this.mode(wys, n.theWys);
    }
  }, {
    key: "cmd",
    value: function cmd(e, bb, nn) {
      // (e) or (z, b)
      var n = e.recv;
      var b = bb || this.btn[n.getAttribute('data-cmd')];
      var z = bb ? e : this.app.next(n.closest('nav'), '.edit-wysiwyg');
      this.app.dbg(['cmd', z, b, n, e]);

      if (e && !bb) {
        e.preventDefault();
        e.stopPropagation();
      } //let b = this.btn[n.hash.substr(4)];


      if (b[0] == 'src') this.mode(!this.app.vis(z), z);else if (b[0] == 'tools') {
        var mm = this.app.q('div', n.parentNode);
        if (mm) this.app.toggle(mm);
      } else {
        var arg = b[1];

        if (arg.match(/~/)) {
          var q = prompt(b[3], b[4] || '');
          arg = q === null ? q : arg.replace(/~/, q);
          if (arg && arg.match(/@/)) arg = 'mailto:' + arg;
        }

        if (arg) arg = arg.replace('^', document.getSelection());
        z.focus();
        if (arg !== null) document.execCommand(b[0], false, arg);

        if (b[2] == '*') {
          this.up(0, z);
          this.up(1, z);
        }
      }
    }
  }, {
    key: "up",
    value: function up(w, z) {
      if (w) z.innerHTML = z.theArea.value;else z.theArea.value = z.innerHTML.replace(/(\shref=")!/ig, ' target="_blank"$1').replace(/(\ssrc="[^"]+#[a-z]*)(\d+%?)"/ig, ' width="$2"$1"'); //.replace(/(\ssrc="[^"]+)#([lrc])"/ig,' class="$2"$1"');

      if (!w) this.app.dispatch(z.theArea, ['input', 'change']);
    }
  }, {
    key: "mode",
    value: function mode(w, z) {
      var _this3 = this;

      this.app.toggle(z, w);
      this.app.toggle(z.theArea, !w);

      if (!w) {
        if (z.style.height) z.theArea.style.height = z.style.height;else this.adjust(z.theArea);
      }

      this.up(w, z);
      this.app.e(this.app.qq('a', z.theNav), function (n) {
        return n.hash == '#cmd-src' ? null : _this3.app.toggle(n, w);
      });
      z.theArea.theManual = 0;
      z.theArea.style.width = '100%';
    }
  }, {
    key: "setStyle",
    value: function setStyle(n) {
      //n.style.resize = 'vertical'; //both
      n.style.overflow = 'auto';
      n.style.minHeight = '3em';
      n.style.maxHeight = '80vh'; //n.type ? '80vh' : this.opt.height + 'em';

      this.storeSize(n);
    }
  }, {
    key: "storeSize",
    value: function storeSize(n) {
      n.theH = n.clientHeight;
      n.theW = n.clientWidth;
    }
  }, {
    key: "resized",
    value: function resized(n) {
      if (n.theH !== n.clientHeight || n.theW !== n.clientWidth) n.theManual = 1;
    }
  }, {
    key: "adjustAll",
    value: function adjustAll() {
      var _this4 = this;

      this.app.e(this.opt.qAdjust, function (n) {
        return _this4.adjust(n);
      });
    }
  }, {
    key: "adjust",
    value: function adjust(n) {
      if (n.theManual) return; //1. jumps
      //n.style.height = 'auto';
      //n.style.height = (24 + n.scrollHeight) + 'px';
      //2. not exact
      //n.style.height = (1.5 * (2 + Math.max(n.value.length/50, (n.value.match(/\n/g) || []).length))) + 'em';
      //3. better

      var a = n.value.split(/\n/).map(function (v) {
        return Math.ceil(10 * (1 + v.length) / (n.clientWidth || 500));
      }).reduce(function (v, r) {
        return r + v;
      });
      n.style.height = Math.min(1.5 * (2 + a), parseFloat(this.opt.height)) + 'em';
      this.storeSize(n);
    } // https://stackoverflow.com/questions/6333814/how-does-the-paste-image-from-clipboard-functionality-work-in-gmail-and-google-c

  }, {
    key: "onPaste",
    value: function onPaste(e) {
      var _this5 = this;

      var n = e.target.closest('.edit-wysiwyg');
      if (!n) return; //this.app.a(e.clipboardData.items).forEach(i => console.log(i)); // kind: 'file', type: 'image/...'

      var img = this.app.a(e.clipboardData.items).filter(function (i) {
        return i.type.indexOf('image') === 0;
      }).shift();

      if (img) {
        e.preventDefault();
        var reader = new FileReader();

        reader.onload = function (e) {
          return _this5.cmd(n, ['insertimage', e.target.result]);
        };

        reader.readAsDataURL(img.getAsFile()); //get blob as data url
        // to upload, use readAsBinaryString, or put it into an XHR using FormData
      }
    }
  }]);

  return _default;
}(plugins_plugin["a" /* default */]);


// CONCATENATED MODULE: ./src/js/plugins/valid.js
function valid_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { valid_typeof = function _typeof(obj) { return typeof obj; }; } else { valid_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return valid_typeof(obj); }

function valid_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function valid_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function valid_createClass(Constructor, protoProps, staticProps) { if (protoProps) valid_defineProperties(Constructor.prototype, protoProps); if (staticProps) valid_defineProperties(Constructor, staticProps); return Constructor; }

function valid_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) valid_setPrototypeOf(subClass, superClass); }

function valid_setPrototypeOf(o, p) { valid_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return valid_setPrototypeOf(o, p); }

function valid_createSuper(Derived) { var hasNativeReflectConstruct = valid_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = valid_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = valid_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return valid_possibleConstructorReturn(this, result); }; }

function valid_possibleConstructorReturn(self, call) { if (call && (valid_typeof(call) === "object" || typeof call === "function")) { return call; } return valid_assertThisInitialized(self); }

function valid_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function valid_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function valid_getPrototypeOf(o) { valid_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return valid_getPrototypeOf(o); }

/*! valid - custom form validation messages */


var valid_default = /*#__PURE__*/function (_Plugin) {
  valid_inherits(_default, _Plugin);

  var _super = valid_createSuper(_default);

  function _default() {
    var _this;

    valid_classCallCheck(this, _default);

    _this = _super.call(this, 'valid');
    _this.opt = {
      aHint: 'data-hint',
      qValidate: 'form',
      // set custom text for browser tooltips
      cUnhint: 'js-unhint',
      // turn off browser tooltips
      cLiveVal: 'js-live-val' // live validation, disable submit buttons if invalid

    };
    return _this;
  }

  valid_createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      //let q = this.opt.qValidate;
      //let dh = '[' + this.opt.aHint + ']';
      //this.app.e(q + ' input' + dh + ', ' + q + ' textarea' + dh + ', '+ q +' select' + dh, n => this.initInput(n));
      var inputs = ['input', 'textarea', 'select'].map(function (s) {
        return _this2.opt.qValidate + ' ' + s + '[' + _this2.opt.aHint + ']';
      }).join(', ');
      inputs += ', .' + this.opt.cLiveVal + ' [name]';
      this.app.h(['input', 'change'], inputs, function (e) {
        return _this2.validateInput(e.target);
      });
      this.app.h('invalid', inputs, function (e) {
        return _this2.setCustomMessage(e.target);
      });
      this.app.e('form.' + this.opt.cUnhint, function (n) {
        return _this2.unhint(n);
      });
      this.app.e('form.' + this.opt.cLiveVal, function (n) {
        return _this2.validateForm(n);
      });
      this.app.h('submit', this.opt.qValidate, function (e) {
        return e.target.getAttribute('novalidate') ? _this2.validateForm(e.target, e) : null;
      }); //custom validation
    }
  }, {
    key: "isLive",
    value: function isLive(f) {
      return f && f.classList.contains(this.opt.cLiveVal);
    }
  }, {
    key: "validateInput",
    value: function validateInput(n) {
      if (n.willValidate) {
        if (n.type == 'radio') this.app.e(this.app.qq('[name="' + n.name + '"]', n.form), function (m) {
          return m.setCustomValidity('');
        });else n.setCustomValidity('');
        n.checkValidity();
        if (this.isLive(n.form)) this.validateForm(n.form);
      }
    }
  }, {
    key: "setCustomMessage",
    value: function setCustomMessage(n) {
      if (n.willValidate) {
        var t = n.getAttribute('data-hint') || ''; // || n.title;

        t = t.replace(/%([\w\-]+)%/g, function (m, v) {
          return n.getAttribute(v);
        });
        n.setCustomValidity(t);
      }
    }
  }, {
    key: "unhint",
    value: function unhint(n) {
      n.setAttribute('novalidate', true);
    }
  }, {
    key: "validateForm",
    value: function validateForm(n, e) {
      if (e) n.classList.remove(this.opt.cUnhint);
      var ok = n.checkValidity(); //!==false

      if (!ok && e) {
        e.preventDefault();
        e.stopPropagation();
        var f = this.app.q('[name]:invalid:not(.hide):not(.off), [name]:invalid~.subinput', n);

        if (f) {
          this.app.dbg(['focus validate', f]);
          f.focus();
        }
      }

      if (this.isLive(n)) {
        //this.app.e(this.app.qq('[type="submit"]', n), m => m.disabled = !ok);//if no cUnhint
        this.app.e(this.app.qq('[type="submit"]', n), function (m) {
          return m.classList[ok ? 'remove' : 'add']('bg-n');
        }); //if cUnhint used
      }
    }
  }]);

  return _default;
}(plugins_plugin["a" /* default */]);


// CONCATENATED MODULE: ./src/js/plugins/tools.js
function tools_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { tools_typeof = function _typeof(obj) { return typeof obj; }; } else { tools_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return tools_typeof(obj); }

function tools_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function tools_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function tools_createClass(Constructor, protoProps, staticProps) { if (protoProps) tools_defineProperties(Constructor.prototype, protoProps); if (staticProps) tools_defineProperties(Constructor, staticProps); return Constructor; }

function tools_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) tools_setPrototypeOf(subClass, superClass); }

function tools_setPrototypeOf(o, p) { tools_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return tools_setPrototypeOf(o, p); }

function tools_createSuper(Derived) { var hasNativeReflectConstruct = tools_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = tools_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = tools_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return tools_possibleConstructorReturn(this, result); }; }

function tools_possibleConstructorReturn(self, call) { if (call && (tools_typeof(call) === "object" || typeof call === "function")) { return call; } return tools_assertThisInitialized(self); }

function tools_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function tools_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function tools_getPrototypeOf(o) { tools_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return tools_getPrototypeOf(o); }

/*! tools - miscellaneous utilities (toggle class and attributes) */


var tools_default = /*#__PURE__*/function (_Plugin) {
  tools_inherits(_default, _Plugin);

  var _super = tools_createSuper(_default);

  function _default() {
    var _this;

    tools_classCallCheck(this, _default);

    _this = _super.call(this, 'tools');
    _this.opt = {
      dNodes: 'nodes',
      // data-nodes
      dSet: 'set',
      dUnset: 'unset',
      dAttr: 'attr',
      cMem: 'mem',
      qHeading: 'h2[id], h3[id], h4[id], h5[id], h6[id]',
      // h1[id],
      minDesktop: 900
    };
    return _this;
  }

  tools_createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var app = this.app;
      this.opt.qSet = '[data-' + this.opt.dSet + '], [data-' + this.opt.dNodes + ']';
      this.opt.qSetClick = 'a[data-' + this.opt.dSet + ']';
      this.opt.qSetChange = 'input[data-' + this.opt.dNodes + '], select[data-' + this.opt.dNodes + ']';
      app.e('table[class]', function (n) {
        return _this2.alignCells(n);
      });
      app.e(this.opt.qSet, function (n) {
        return _this2.restore(n);
      });
      app.e(this.opt.qSet, function (n) {
        return _this2.toggleClass(n);
      });
      app.e(this.opt.qHeading, function (n) {
        return _this2.smartHeading(n);
      });
      app.h('change', this.opt.qSetChange, function (e) {
        return _this2.toggleClass(e.target);
      });
      app.h('click', this.opt.qSetClick, function (e) {
        return _this2.toggleClass(e.recv, e);
      });
      this.onResize();
      app.b([window], 'resize', function (e) {
        return _this2.onResize(e);
      });
    }
  }, {
    key: "alignCells",
    value: function alignCells(n) {
      var _this3 = this;

      var m = n.className.match(/\b[lcr]\d\d?\b/g);

      if (m) {
        var _loop = function _loop(i) {
          _this3.app.e(_this3.app.qq('tr>*:nth-child(' + m[i].substr(1) + ')', n), function (c) {
            return c.classList.add(m[i].substr(0, 1));
          });
        };

        for (var i = 0; i < m.length; i++) {
          _loop(i);
        }
      }
    }
  }, {
    key: "store",
    value: function store(n, v) {
      if (n && (n.id || n.name) && n.classList.contains(this.opt.cMem)) {
        localStorage.setItem('set#' + (n.id || '#' + n.name), v);
      }
    }
  }, {
    key: "restore",
    value: function restore(n) {
      if (n && (n.id || n.name) && n.classList && n.classList.contains(this.opt.cMem)) {
        var v = localStorage.getItem('set#' + (n.id || '#' + n.name));

        if (v !== null) {
          var t = n.tagName;
          if (t == 'A') n.classList[v ? 'add' : 'remove'](this.app.opt.cAct);else if (t == 'SELECT') n.value = v;else if (n.type == 'checkbox') n.checked = !!v;else if (n.type == 'radio') n.checked = n.value == v;
        }
      }
    }
  }, {
    key: "setClass",
    value: function setClass(n, on, m, c) {
      this.app.dbg(['setclass', m, c]);
      var sel = n.type == 'radio' || n.tagName == 'SELECT';
      var u = sel ? null
      /*''*/
      : n.dataset[this.opt.dUnset];
      var attr = n.dataset[this.opt.dAttr] || 'class';

      if (attr !== 'class') {
        var v = on ? c : u || '';
        if (v) m.setAttribute(attr, v);else m.removeAttribute(attr);
      } else if (u !== null && u !== undefined) m.className = on ? c : u || '';else {
        if (sel) {
          //unset other select/radio values
          var _u = n.type == 'radio' ? this.app.qq('input[type="radio"][name="' + n.name + '"]').map(function (nn) {
            return (
              /*(nn.dataset[this.opt.dSet] || '')*/
              nn.value
            );
          }).join(' ') : this.app.qq('option', n).map(function (nn) {
            return nn.value;
          }).join(' ');

          _u.split(/\s+/).filter(function (cc) {
            return cc;
          }).forEach(function (cc) {
            return m.classList.remove(cc);
          });
        }

        c.split(/\s+/).filter(function (cc) {
          return cc;
        }).forEach(function (cc) {
          return m.classList[on ? 'add' : 'remove'](cc);
        });
      }

      n.classList[on ? 'add' : 'remove'](this.app.opt.cAct);
      this.store(n, sel ? n.value : (n.type == 'checkbox' ? n.checked : n.classList.contains(this.app.opt.cAct)) ? '1' : '');
    }
  }, {
    key: "toggleClass",
    value: function toggleClass(n, e) {
      var _this4 = this;

      if (n.type == 'radio' && !n.checked) return;
      var box = n.type == 'checkbox' || n.type == 'radio';
      var sel = n.tagName == 'SELECT' || n.type == 'radio';
      var q = n.dataset[this.opt.dNodes] || n.hash;
      var c = sel ? n.value : n.dataset[this.opt.dSet];
      var on = sel ? true : box ? n.checked : n.classList.contains(this.app.opt.cAct);

      if (e && !box && !sel) {
        on = !on;
        e.preventDefault();
        e.stopPropagation();
      } //this.app.dbg(['setclass?', c, on, q, e, box, sel]);


      if (c !== null && c !== undefined) {
        this.app.e(q, function (m) {
          return _this4.setClass(n, on, m, c);
        });
        this.app.fire('update', {
          q: q
        });
      }
    }
  }, {
    key: "smartHeading",
    value: function smartHeading(n) {
      var d = this.app.ins('div', '', {});

      while (n.firstChild) {
        d.appendChild(n.firstChild);
      }

      n.appendChild(d);
      d.style.position = 'relative';
      d.style.paddingRight = '1em';
      this.app.ins('', ' ', {}, d);
      this.app.ins('a', '#', {
        href: '#' + n.id,
        className: 'small text-n inact  hide-print'
      }, d);
      this.app.ins('a', this.app.i('asc', '&uarr;'), {
        href: '#',
        className: 'small close text-n inact hide-print'
      }, d); //n.style.position = 'relative';
      //let a = this.app.ins('a', this.app.i('asc', '&uarr;'), {href:'#', className: 'small close text-n hide-print'}, n);
    }
  }, {
    key: "onResize",
    value: function onResize() {
      var m = window.innerWidth <= this.opt.minDesktop;
      m ? this.app.e('[data-class-mobile]', function (n) {
        return n.className = n.dataset.classMobile || '';
      }) : this.app.e('[data-class-desktop]', function (n) {
        return n.className = n.dataset.classDesktop || '';
      });
    }
  }]);

  return _default;
}(plugins_plugin["a" /* default */]);


// CONCATENATED MODULE: ./src/js/plugins/form.js
function form_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { form_typeof = function _typeof(obj) { return typeof obj; }; } else { form_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return form_typeof(obj); }

function form_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function form_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function form_createClass(Constructor, protoProps, staticProps) { if (protoProps) form_defineProperties(Constructor.prototype, protoProps); if (staticProps) form_defineProperties(Constructor, staticProps); return Constructor; }

function form_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) form_setPrototypeOf(subClass, superClass); }

function form_setPrototypeOf(o, p) { form_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return form_setPrototypeOf(o, p); }

function form_createSuper(Derived) { var hasNativeReflectConstruct = form_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = form_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = form_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return form_possibleConstructorReturn(this, result); }; }

function form_possibleConstructorReturn(self, call) { if (call && (form_typeof(call) === "object" || typeof call === "function")) { return call; } return form_assertThisInitialized(self); }

function form_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function form_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function form_getPrototypeOf(o) { form_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return form_getPrototypeOf(o); }

/*! form - utilities for form inputs */


var form_default = /*#__PURE__*/function (_Plugin) {
  form_inherits(_default, _Plugin);

  var _super = form_createSuper(_default);

  function _default() {
    var _this;

    form_classCallCheck(this, _default);

    _this = _super.call(this, 'form');
    _this.opt = {};
    return _this;
  }

  form_createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      this.app.e('input[type="color"]', function (n) {
        return _this2.prepareColor(n);
      });
      this.app.h('click', 'a[href^="#"][data-value]', function (e) {
        e.preventDefault();

        _this2.setValue(e.recv);
      });
      this.app.h('click', 'input[data-group]', function (e) {
        return _this2.checkBoxes(e.target);
      });
    }
  }, {
    key: "checkBoxes",
    value: function checkBoxes(n) {
      this.app.e(this.app.qq('input[type="checkbox"][class~="' + (n.dataset.group || '') + '"]', n.form), function (m) {
        return m.checked = n.checked;
      });
    }
  }, {
    key: "setValue",
    value: function setValue(n) {
      var d = this.app.q(n.hash);

      if (d) {
        d.value = n.dataset.value || '';
        this.app.pf('toggle', 'unpop', d, true); // this.app.pf('toggle', 'modalStyle'); //generally not needed
      }
    }
  }, {
    key: "prepareColor",
    value: function prepareColor(n) {
      var m = this.app.ins('input', '', {
        type: 'text',
        value: n.value,
        size: 7,
        className: 'color'
      }, n, -1);
      this.app.ins('', ' ', {}, m, 1);
      this.app.b([n, m], 'input', function (e) {
        return (e.target == n ? m : n).value = e.target.value;
      });
    }
  }]);

  return _default;
}(plugins_plugin["a" /* default */]);


// CONCATENATED MODULE: ./src/js/plugins/keepform.js
function keepform_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { keepform_typeof = function _typeof(obj) { return typeof obj; }; } else { keepform_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return keepform_typeof(obj); }

function keepform_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function keepform_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function keepform_createClass(Constructor, protoProps, staticProps) { if (protoProps) keepform_defineProperties(Constructor.prototype, protoProps); if (staticProps) keepform_defineProperties(Constructor, staticProps); return Constructor; }

function keepform_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) keepform_setPrototypeOf(subClass, superClass); }

function keepform_setPrototypeOf(o, p) { keepform_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return keepform_setPrototypeOf(o, p); }

function keepform_createSuper(Derived) { var hasNativeReflectConstruct = keepform_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = keepform_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = keepform_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return keepform_possibleConstructorReturn(this, result); }; }

function keepform_possibleConstructorReturn(self, call) { if (call && (keepform_typeof(call) === "object" || typeof call === "function")) { return call; } return keepform_assertThisInitialized(self); }

function keepform_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function keepform_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function keepform_getPrototypeOf(o) { keepform_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return keepform_getPrototypeOf(o); }

/*! keepform - store and restore user input */


var keepform_default = /*#__PURE__*/function (_Plugin) {
  keepform_inherits(_default, _Plugin);

  var _super = keepform_createSuper(_default);

  function _default() {
    var _this;

    keepform_classCallCheck(this, _default);

    _this = _super.call(this, 'keepform');
    _this.opt = {
      qStore: 'form.store[id]',
      qRestore: 'form.restore[id]'
    };
    return _this;
  }

  keepform_createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (Object.fromEntries && FormData) {
        var app = this.app;
        var q = this.opt.qStore;
        app.e(q, function (f) {
          return _this2.addControls(f);
        });
        app.e(this.opt.qRestore, function (f) {
          return _this2.restoreForm(f, true);
        });
        app.h(['change', 'input'], q, function (e) {
          return _this2.store(e);
        });
        app.h('click', q + ' a[href="#restore"]', function (e) {
          return _this2.restore(e);
        });
        app.h('click', q + ' a[href="#reset"]', function (e) {
          return _this2.reset(e);
        });
        app.h('click', q + ' a[href="#unstore"]', function (e) {
          return _this2.unstore(e);
        });
      }
    }
  }, {
    key: "addControls",
    value: function addControls(f) {
      var app = this.app;
      var d = app.ins('div', '', {
        className: 'pad r keepform-tools'
      }, f, false);
      app.ins('a', app.i('energy', '[^]'), {
        href: '#restore'
      }, d);
      app.ins('', ' ', {}, d);
      app.ins('a', app.i('refresh', '[-]'), {
        href: '#reset'
      }, d);
      app.ins('', ' ', {}, d);
      app.ins('a', app.i('ban', '[x]'), {
        href: '#unstore'
      }, d);
    }
  }, {
    key: "reset",
    value: function reset(e) {
      var _this3 = this;

      e.preventDefault();
      var f = e.target.closest('form');
      f.reset();
      this.app.e(this.app.qq('[name]', f), function (n) {
        return _this3.app.fire('value', {
          n: n
        });
      });
    }
  }, {
    key: "unstore",
    value: function unstore(e) {
      e.preventDefault();
      localStorage.removeItem(this.formId(e.target.closest('form')));
    }
  }, {
    key: "restore",
    value: function restore(e) {
      e.preventDefault();
      this.restoreForm(e.target.closest('form'));
    }
  }, {
    key: "restoreForm",
    value: function restoreForm(f, mode) {
      var _this4 = this;

      var id = this.formId(f);
      var d = localStorage.getItem(id);

      if (d) {
        d = this.app.parse(d);
        if (d) Object.keys(d).forEach(function (k) {
          var i = f.elements[k];
          if (i) _this4.restoreInput(i, d[k], mode);
        });
      }
    }
  }, {
    key: "restoreInput",
    value: function restoreInput(i, v, mode) {
      var _this5 = this;

      if (i instanceof NodeList) i.forEach(function (j) {
        return _this5.restoreInput(j, v, mode);
      });else {
        if (i.type.match(/file|submit|password/)) ;else if (i.type.match(/checkbox|radio/)) i.checked = Array.isArray(v) ? v.indexOf(i.value) != -1 : i.value === v;else i.value = v;
        this.app.fire('value', {
          n: i,
          modeAuto: mode
        });
      }
    }
  }, {
    key: "store",
    value: function store(e) {
      var f = new FormData(e.recv); //let d = JSON.stringify(Object.fromEntries(f)); // does not support multiple

      var d = {};
      f.forEach(function (v, k) {
        if (!d.hasOwnProperty(k)) d[k] = v;else {
          // multiple
          if (!Array.isArray(d[k])) d[k] = [d[k]];
          d[k].push(v);
        }
      });
      localStorage.setItem(this.formId(e.recv), JSON.stringify(d));
    }
  }, {
    key: "formId",
    value: function formId(f) {
      return 'form#' + f.id + '@' + location.pathname;
    }
  }]);

  return _default;
}(plugins_plugin["a" /* default */]);


// CONCATENATED MODULE: ./src/js/plugins/items.js
function items_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { items_typeof = function _typeof(obj) { return typeof obj; }; } else { items_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return items_typeof(obj); }

function items_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function items_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function items_createClass(Constructor, protoProps, staticProps) { if (protoProps) items_defineProperties(Constructor.prototype, protoProps); if (staticProps) items_defineProperties(Constructor, staticProps); return Constructor; }

function items_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) items_setPrototypeOf(subClass, superClass); }

function items_setPrototypeOf(o, p) { items_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return items_setPrototypeOf(o, p); }

function items_createSuper(Derived) { var hasNativeReflectConstruct = items_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = items_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = items_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return items_possibleConstructorReturn(this, result); }; }

function items_possibleConstructorReturn(self, call) { if (call && (items_typeof(call) === "object" || typeof call === "function")) { return call; } return items_assertThisInitialized(self); }

function items_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function items_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function items_getPrototypeOf(o) { items_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return items_getPrototypeOf(o); }

/*! items - copy, hide, delete items */


var items_default = /*#__PURE__*/function (_Plugin) {
  items_inherits(_default, _Plugin);

  var _super = items_createSuper(_default);

  function _default() {
    var _this;

    items_classCallCheck(this, _default);

    _this = _super.call(this, 'items');
    _this.opt = {
      dItem: 'item',
      // data-item
      qItem: '.item' // ul, tr, div

    };
    return _this;
  }

  items_createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      this.app.h('click', 'a[href^="#"]', function (e) {
        return _this2.onClick(e);
      });
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      var n = e.recv;

      if (n && n.hash) {
        var q = n.dataset[this.opt.dItem];
        var d = q ? this.app.q(q) : e.target.closest(this.opt.qItem);

        if (d) {
          var cont = d.parentNode;

          if (this.process(d, n.hash.substr(1), !!q)) {
            this.app.fire('update', {
              n: cont
            });
            e.preventDefault();
            e.stopPropagation();
          }
        }
      }
    }
  }, {
    key: "items",
    value: function items(n) {
      var _this3 = this;

      //return this.app.qq(this.opt.qItem, n).filter(n => !n.classList.contains(this.app.opt.cHide));
      return this.app.a(n.children).filter(function (n) {
        return n.matches(_this3.opt.qItem);
      }).filter(function (n) {
        return !n.classList.contains(_this3.app.opt.cHide);
      });
    }
  }, {
    key: "process",
    value: function process(n, x, before) {
      var _this4 = this;

      if (['copy', 'del', 'delete', 'delall', 'clear', 'hide'].indexOf(x) == -1) return false;
      this.app.fire('beforeitem', {
        n: n,
        a: x
      });
      var e = {
        n: n,
        a: x
      };

      if (x == 'copy') {
        if (before === undefined) before = n.classList.contains(this.app.opt.cHide);
        var m = n.parentNode.insertBefore(n.cloneNode(true), before ? n : n.nextSibling);
        m.classList.remove(this.app.opt.cHide);
        m.removeAttribute('id');
        this.app.e(this.app.qq('[id]', m), function (i) {
          return _this4.fixId(i, m);
        });
        e.p = e.n; // prototype

        e.n = m; // new node
      } else if (x == 'del') {
        e.p = n.parentNode;
        if (this.items(n.parentNode).length > 1) n.parentNode.removeChild(n);
      } else if (x == 'delete') {
        e.p = n.parentNode;
        n.parentNode.removeChild(n);
      } else if (x == 'delall') {
        this.items(n).forEach(function (m) {
          return m.parentNode.removeChild(m);
        });
      } else if (x == 'clear') {
        this.app.clr(n);
      } else if (x == 'hide') {
        n.classList.add(this.app.opt.cHide);
      }

      this.app.fire('afteritem', e);
      return true;
    }
  }, {
    key: "fixId",
    value: function fixId(i, m) {
      var old = i.id;
      var id = i.id.replace(/-\d+$/, '') + '-' + this.app.seq();
      i.id = id;
      this.app.e(this.app.qq('a[href="#' + old + '"]', m), function (a) {
        return a.href = '#' + id;
      });
    }
  }]);

  return _default;
}(plugins_plugin["a" /* default */]);


// CONCATENATED MODULE: ./src/js/plugins/filter.js
function filter_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { filter_typeof = function _typeof(obj) { return typeof obj; }; } else { filter_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return filter_typeof(obj); }

function filter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function filter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function filter_createClass(Constructor, protoProps, staticProps) { if (protoProps) filter_defineProperties(Constructor.prototype, protoProps); if (staticProps) filter_defineProperties(Constructor, staticProps); return Constructor; }

function filter_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) filter_setPrototypeOf(subClass, superClass); }

function filter_setPrototypeOf(o, p) { filter_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return filter_setPrototypeOf(o, p); }

function filter_createSuper(Derived) { var hasNativeReflectConstruct = filter_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = filter_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = filter_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return filter_possibleConstructorReturn(this, result); }; }

function filter_possibleConstructorReturn(self, call) { if (call && (filter_typeof(call) === "object" || typeof call === "function")) { return call; } return filter_assertThisInitialized(self); }

function filter_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function filter_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function filter_getPrototypeOf(o) { filter_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return filter_getPrototypeOf(o); }

/*! filter - filter items */


var filter_default = /*#__PURE__*/function (_Plugin) {
  filter_inherits(_default, _Plugin);

  var _super = filter_createSuper(_default);

  function _default() {
    var _this;

    filter_classCallCheck(this, _default);

    _this = _super.call(this, 'filter');
    _this.opt = {
      qFilter: '.filters',
      qItem: '.item',
      dFilter: 'filter',
      cMem: 'mem'
    };
    return _this;
  }

  filter_createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      this.app.e(this.opt.qFilter, function (n) {
        return _this2.prepare(n);
      });
      this.app.h('click', 'a[data-' + this.opt.dFilter + ']', function (e) {
        return _this2.applyControl(e.recv);
      });
      this.app.h('input', ':not(a)[data-' + this.opt.dFilter + ']', function (e) {
        return _this2.applyControl(e.recv);
      });
    }
  }, {
    key: "prepare",
    value: function prepare(n) {
      n.vInit = {};
      this.forAttrs(n, function (a, k) {
        return n.vInit[k] = n.dataset[a];
      });
      this.restore(n);
      this.apply(n);
    }
  }, {
    key: "applyControl",
    value: function applyControl(n) {
      var f = n.closest(this.opt.qFilter);
      var x = (n.dataset[this.opt.dFilter] || '').split(/=/, 2);

      if (f) {
        if (x[0]) {
          var a = this.opt.dFilter + '_' + x[0];
          var v = (n.tagName == 'SELECT' ? n.value : x[1]) || '';

          if (v.substr(0, 1) == '+' && v.length > 1) {
            v = v.substr(1);
            var w = (f.dataset[a] || '').split(/;/);
            var i = w.indexOf(v);
            if (i == -1) w.push(v);else delete w[i];
            v = w.filter(function (val, key, arr) {
              return val !== '' && arr.indexOf(val) === key;
            }).join(';');
          }

          f.dataset[a] = v;
          this.apply(f);
        } else {
          this.reset(f);
        }
      }
    }
  }, {
    key: "apply",
    value: function apply(n) {
      var _this3 = this;

      var f = {};
      this.forAttrs(n, function (a, k) {
        return n.dataset[a].length > 0 ? f[k] = n.dataset[a].split(/;/) : null;
      });
      this.app.dbg(['filter', n, f]);
      this.app.e(this.app.qq(this.opt.qItem, n), function (m) {
        return m.classList[_this3.match(m, f) ? 'remove' : 'add'](_this3.app.opt.cHide);
      });
      this.app.e(this.app.qq('[data-' + this.opt.dFilter + ']', n), function (m) {
        return _this3.setUsed(m, f);
      });
      this.store(n, f);
      this.app.fire('update', {
        n: n
      });
    }
  }, {
    key: "match",
    value: function match(n, f) {
      var r = true;
      Object.keys(f).forEach(function (k) {
        return f[k] && f[k].length > 0 && f[k].indexOf(n.dataset[k] || '') == -1 ? r = false : null;
      });
      return r;
    }
  }, {
    key: "setUsed",
    value: function setUsed(n, f) {
      var u = this.used(n, f);
      if (n.tagName == 'A') n.classList[u ? 'add' : 'remove'](this.app.opt.cAct);else if (n.type == 'checkbox') n.checked = u;else if (n.type == 'radio') n.checked = u;else if (n.tagName == 'SELECT') n.value = (f[n.dataset[this.opt.dFilter] || ''] || [''])[0];
    }
  }, {
    key: "used",
    value: function used(n, f) {
      var x = (n.dataset[this.opt.dFilter] || '').split(/=\+?/, 2);
      return x[0] && !f[x[0]] && !x[1] || f[x[0]] && f[x[0]].length > 0 && f[x[0]].indexOf(x[1]) != -1; //return ((f[x[0]] || '') == (x[1] || ''));
    }
  }, {
    key: "store",
    value: function store(n, f) {
      if (n.id && n.classList.contains(this.opt.cMem)) localStorage.setItem('filter-' + n.id, JSON.stringify(f));
    }
  }, {
    key: "restore",
    value: function restore(n) {
      var _this4 = this;

      if (n.id && n.classList.contains(this.opt.cMem)) {
        var f = localStorage.getItem('filter-' + n.id);

        if (f) {
          //create attributes if not exist
          this.app.e(this.app.qq('[data-' + this.opt.dFilter + ']', n), function (m) {
            var x = (m.dataset[_this4.opt.dFilter] || '').split(/=/);

            if (x[0]) {
              x = _this4.opt.dFilter + '_' + x[0];
              if (!(x in n.dataset)) n.dataset[x] = '';
            }
          }); //parse

          f = this.app.parse(f);
          if (f) this.forAttrs(n, function (a, k) {
            return n.dataset[a] = (f[k] || []).join(';');
          });
        }
      }
    }
  }, {
    key: "reset",
    value: function reset(n) {
      this.forAttrs(n, function (a, k) {
        return k in n.vInit ? n.dataset[a] = n.vInit[k] || '' : delete n.dataset[a.name];
      });
      this.apply(n);
    }
  }, {
    key: "forAttrs",
    value: function forAttrs(n, f) {
      var _this5 = this;

      var z = this.opt.dFilter.length;
      Object.keys(n.dataset).forEach(function (a) {
        return a.substr(0, z) == _this5.opt.dFilter ? f(a, a.substr(z + 1)) : null;
      });
    }
  }]);

  return _default;
}(plugins_plugin["a" /* default */]);


// CONCATENATED MODULE: ./src/js/plugins/fliptable.js
function fliptable_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { fliptable_typeof = function _typeof(obj) { return typeof obj; }; } else { fliptable_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return fliptable_typeof(obj); }

function fliptable_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function fliptable_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function fliptable_createClass(Constructor, protoProps, staticProps) { if (protoProps) fliptable_defineProperties(Constructor.prototype, protoProps); if (staticProps) fliptable_defineProperties(Constructor, staticProps); return Constructor; }

function fliptable_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) fliptable_setPrototypeOf(subClass, superClass); }

function fliptable_setPrototypeOf(o, p) { fliptable_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return fliptable_setPrototypeOf(o, p); }

function fliptable_createSuper(Derived) { var hasNativeReflectConstruct = fliptable_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = fliptable_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = fliptable_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return fliptable_possibleConstructorReturn(this, result); }; }

function fliptable_possibleConstructorReturn(self, call) { if (call && (fliptable_typeof(call) === "object" || typeof call === "function")) { return call; } return fliptable_assertThisInitialized(self); }

function fliptable_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function fliptable_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function fliptable_getPrototypeOf(o) { fliptable_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return fliptable_getPrototypeOf(o); }

/*! fliptable - responsive table */


var fliptable_default = /*#__PURE__*/function (_Plugin) {
  fliptable_inherits(_default, _Plugin);

  var _super = fliptable_createSuper(_default);

  function _default() {
    var _this;

    fliptable_classCallCheck(this, _default);

    _this = _super.call(this, 'fliptable');
    _this.opt = {
      qFlipTable: 'table.flip'
    };
    return _this;
  }

  fliptable_createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      this.app.e(this.opt.qFlipTable, function (n) {
        return n.closest('form') ? null : _this2.prepareFlipTable(n);
      });
    }
  }, {
    key: "prepareFlipTable",
    value: function prepareFlipTable(t) {
      var ths = this.app.qq('thead th', t);
      var tds = this.app.qq('tbody tr>*, tfoot tr>*', t); // let order = (t.dataset.order || '0 1 2 3').split(/\D+/);
      // t.parentNode.classList.remove('roll');

      for (var i = 0; i < tds.length; i++) {
        var td = tds[i];
        var th = ths[td.cellIndex]; //let ord = order.indexOf('' + td.cellIndex);
        //if(ord==-1) ord = 99;
        //td.style.order = ord;
        //if(td.textContent.replace(/\s+$/, '').length>0){

        var c = this.app.ins('div', '', {
          className: 'row'
        });
        if (th) this.app.ins('div', th.textContent, {
          className: 'hide-desktop'
        }, c);
        var v = this.app.ins('div', '', {}, c);

        while (td.firstChild) {
          v.appendChild(td.firstChild);
        }

        td.textContent = '';
        td.appendChild(c); //}
      }

      this.app.e(this.app.qq('thead', t), function (n) {
        return n.classList.add('hide-mobile');
      });
    }
  }]);

  return _default;
}(plugins_plugin["a" /* default */]);


// CONCATENATED MODULE: ./src/js/plugins/swipe.js
function swipe_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { swipe_typeof = function _typeof(obj) { return typeof obj; }; } else { swipe_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return swipe_typeof(obj); }

function swipe_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function swipe_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function swipe_createClass(Constructor, protoProps, staticProps) { if (protoProps) swipe_defineProperties(Constructor.prototype, protoProps); if (staticProps) swipe_defineProperties(Constructor, staticProps); return Constructor; }

function swipe_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) swipe_setPrototypeOf(subClass, superClass); }

function swipe_setPrototypeOf(o, p) { swipe_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return swipe_setPrototypeOf(o, p); }

function swipe_createSuper(Derived) { var hasNativeReflectConstruct = swipe_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = swipe_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = swipe_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return swipe_possibleConstructorReturn(this, result); }; }

function swipe_possibleConstructorReturn(self, call) { if (call && (swipe_typeof(call) === "object" || typeof call === "function")) { return call; } return swipe_assertThisInitialized(self); }

function swipe_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function swipe_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function swipe_getPrototypeOf(o) { swipe_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return swipe_getPrototypeOf(o); }

/*! swipe - detect touch swipe */


var swipe_default = /*#__PURE__*/function (_Plugin) {
  swipe_inherits(_default, _Plugin);

  var _super = swipe_createSuper(_default);

  function _default() {
    var _this;

    swipe_classCallCheck(this, _default);

    _this = _super.call(this, 'swipe');
    _this.moved = null;
    _this.c = {};
    _this.opt = {
      qSwipe: '.swipe',
      qDrag: '.drag',
      qKeepDrag: '.drawer',
      //', .gal a[id]',
      cDragging: 'dragging',
      maxClick: 20,
      minSwipe: 50
    };
    return _this;
  }

  swipe_createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      this.drag_ = this.app.throttle(function (e) {
        return _this2.drag(e);
      }, 30); //console.log('swipe init');

      /*
      events order:
        touchstart
        touchmove(s)
        touchend
        if(!defaultPrevented){
          mousemove
          mousedown
          mouseup & click
        }
      */

      this.app.b([document], ['mousedown', 'touchstart'], function (e) {
        return _this2.onStart(e);
      });
      this.app.b([document], ['mousemove', 'touchmove'], function (e) {
        return _this2.onMove(e);
      });
      this.app.b([document], ['click', 'mouseleave', 'touchend', 'touchcancel'
      /*, 'mouseleave'/*, 'blur', 'keydown', 'contextmenu'*/
      ], function (e) {
        return _this2.onEnd(e);
      }, true);
    }
  }, {
    key: "onStart",
    value: function onStart(e) {
      //console.log('swipe start', e.type, e.button, e.which);
      if (e.button > 0) {
        this.moved = null;
        return;
      }

      this.moved = e.target.closest(this.opt.qSwipe);

      if (this.moved) {
        var t = e.touches ? e.touches[0] : e;
        this.c.sX = this.c.eX = t.screenX;
        this.c.sY = this.c.eY = t.screenY;
      }
    }
  }, {
    key: "onMove",
    value: function onMove(e) {
      if (this.moved) {
        e.preventDefault();
        this.drag_(e);
      }
    }
  }, {
    key: "drag",
    value: function drag(e) {
      //console.log('swipe drag');
      var t = e.touches ? e.touches[0] : e;
      this.c.eX = t.screenX;
      this.c.eY = t.screenY;

      if (this.moved && this.moved.matches(this.opt.qDrag)) {
        var xy = this.shift();
        this.moved.style.transform = 'translate(' + xy[0] + 'px, ' + xy[1] + 'px)';
        this.moved.classList.add(this.opt.cDragging); //this.moved.style.zIndex = 100;
      }
    }
  }, {
    key: "onEnd",
    value: function onEnd(e) {
      //console.log('swipe end', this.moved, e.which, e.button, e);
      if (this.moved) {
        var undo = e.type == 'mouseleave' || e.type == 'touchcancel';
        if (undo || !this.moved.matches(this.opt.qKeepDrag)) this.undrag();

        if (!undo) {
          var xy = this.shift(); //after touch event: handle mouse events only on A nodes without swipe
          //if(e.type.indexOf('touch')!=-1 && (dir || trg.tagName!='A')) e.preventDefault();

          if (xy[2]) {
            this.app.fire('swipe', {
              n: this.moved,
              x: xy[0],
              y: xy[1],
              dir: xy[2]
            });
            e.preventDefault(); //if(e.type.indexOf('touch')!=-1)
          }
        }

        this.moved.classList.remove(this.opt.cDragging);
        this.moved = null;
      }
    }
  }, {
    key: "shift",
    value: function shift() {
      var dirs = this.moved.dataset.swipe || '1234'; // 1=up

      var dx = this.c.eX - this.c.sX;
      var dy = this.c.eY - this.c.sY;
      var adx = Math.abs(dx);
      var ady = Math.abs(dy);
      var r = [0, 0, 0];

      if (adx >= this.opt.minSwipe || ady >= this.opt.minSwipe) {
        r = adx > ady ? [dx, 0, dx > 0 ? 2 : 4] : [0, dy, dy > 0 ? 3 : 1];
      }

      if (dirs.indexOf(r[2]) === -1) r = [0, 0, 0];
      return r;
    }
  }, {
    key: "undrag",
    value: function undrag(n) {
      if (!n) n = this.moved;
      n.style.transform = '';
    }
  }]);

  return _default;
}(plugins_plugin["a" /* default */]);


// CONCATENATED MODULE: ./src/js/plugins/scroll.js
function scroll_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { scroll_typeof = function _typeof(obj) { return typeof obj; }; } else { scroll_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return scroll_typeof(obj); }

function scroll_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function scroll_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function scroll_createClass(Constructor, protoProps, staticProps) { if (protoProps) scroll_defineProperties(Constructor.prototype, protoProps); if (staticProps) scroll_defineProperties(Constructor, staticProps); return Constructor; }

function scroll_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) scroll_setPrototypeOf(subClass, superClass); }

function scroll_setPrototypeOf(o, p) { scroll_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return scroll_setPrototypeOf(o, p); }

function scroll_createSuper(Derived) { var hasNativeReflectConstruct = scroll_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = scroll_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = scroll_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return scroll_possibleConstructorReturn(this, result); }; }

function scroll_possibleConstructorReturn(self, call) { if (call && (scroll_typeof(call) === "object" || typeof call === "function")) { return call; } return scroll_assertThisInitialized(self); }

function scroll_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function scroll_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function scroll_getPrototypeOf(o) { scroll_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return scroll_getPrototypeOf(o); }

/*! scroll - scrolling behaviours (topbar, drawer) */
// import toggle from './toggle.js'


var scroll_default = /*#__PURE__*/function (_Plugin) {
  scroll_inherits(_default, _Plugin);

  var _super = scroll_createSuper(_default);

  function _default() {
    var _this;

    scroll_classCallCheck(this, _default);

    _this = _super.call(this, 'scroll');
    _this.y = null; //this.hashed = false;

    _this.opt = {
      //gap: 20,
      qHideOnScroll: '',
      // '.drawer[id]'
      cStart: 'shade',
      qTopbar: '.topbar.toggle',
      //.topbar.let
      qEnable: '.topbar' // '.topbar, .drawer'
      //qTopbarFixed: '.topbar:not(.let)'

    };
    return _this;
  }

  scroll_createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var t;

      if (this.app.q(this.opt.qEnable)) {
        this.app.listen('hashchange', function (e) {
          return _this2.onHash(e);
        });
        var ons = this.app.throttle(function () {
          return _this2.onScroll();
        }, 500); //const ons = this.app.throttle((h) => this.onScroll(h), 500);
        //ons(); // forces reflow

        setTimeout(function () {
          return _this2.onScroll();
        }, 20);
        this.app.b([window], 'scroll', function (e) {
          return ons();
        });
      }
      /*
      else if(t = this.app.q(this.opt.qTopbarFixed)){
        this.app.listen('hashchange', e => this.fixScroll());
      }
      */

    }
  }, {
    key: "onHash",
    value: function onHash(e) {
      //to hide topbar on hash change
      // fires before onscroll, but page is already scrolled
      this.app.dbg(['scroll hash', location.hash, e, document.body.scrollHeight]);

      if (e && location.hash && this.app.q(location.hash)) {
        this.y = document.body.scrollHeight + 10; // show topbar on hash
        //this.y = window.scrollY - 10; // show/hide topbar on hash up/down
        //this.y = 1; // hide topbar on hash
        //this.hashed = true;

        this.onScroll();
      }
    }
  }, {
    key: "onScroll",
    value: function onScroll()
    /*h*/
    {
      var _this3 = this;

      //let mode = this.hashed ? 'hash' : (h ? 'fix' : 'scroll');
      var dy = window.scrollY === null ? null : window.scrollY - this.y;
      this.app.dbg(['scroll', window.scrollY, dy]); // ,mode,h,this.hashed

      if (this.y !== null
      /* && !h*/
      ) {
          if (this.opt.qTopbar) this.app.e(this.opt.qTopbar, function (n) {
            return _this3.decorate(n, window.scrollY, dy);
          });
          if (this.opt.qHideOnScroll) this.app.e(this.opt.qHideOnScroll, function (n) {
            return _this3.app.toggle(n, false);
          });
        }

      this.y = window.scrollY; // forces reflow
      //if(this.hashed) this.fixScroll();
      //this.hashed = false;
    }
  }, {
    key: "decorate",
    value: function decorate(n, y, dy) {
      n.classList[dy > 0 && y > n.offsetHeight ? 'add' : 'remove'](this.app.opt.cOff);
      n.classList[y && dy <= 0 ? 'add' : 'remove'](this.opt.cStart);
    }
    /*
    fixScroll (){
      this.app.dbg(['scroll-fix', location.hash]);
      if(this.app.q(location.hash)){
        //let t = this.app.q(this.opt.qTopbar + ':not(.'+ this.app.opt.cOff +')');
        let t = this.app.q(this.opt.qTopbarFixed);
        window.scrollBy(0, (t ? -t.offsetHeight : 0) - this.opt.gap);
      }
      //this.hashed = false;
      //setTimeout(() => this.hashed = false, 500);
    }
    */

  }]);

  return _default;
}(plugins_plugin["a" /* default */]);


// CONCATENATED MODULE: ./src/js/plugins/theme.js
function theme_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { theme_typeof = function _typeof(obj) { return typeof obj; }; } else { theme_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return theme_typeof(obj); }

function theme_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function theme_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function theme_createClass(Constructor, protoProps, staticProps) { if (protoProps) theme_defineProperties(Constructor.prototype, protoProps); if (staticProps) theme_defineProperties(Constructor, staticProps); return Constructor; }

function theme_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) theme_setPrototypeOf(subClass, superClass); }

function theme_setPrototypeOf(o, p) { theme_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return theme_setPrototypeOf(o, p); }

function theme_createSuper(Derived) { var hasNativeReflectConstruct = theme_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = theme_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = theme_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return theme_possibleConstructorReturn(this, result); }; }

function theme_possibleConstructorReturn(self, call) { if (call && (theme_typeof(call) === "object" || typeof call === "function")) { return call; } return theme_assertThisInitialized(self); }

function theme_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function theme_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function theme_getPrototypeOf(o) { theme_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return theme_getPrototypeOf(o); }

/*! theme - live theme configurator */


var theme_default = /*#__PURE__*/function (_Plugin) {
  theme_inherits(_default, _Plugin);

  var _super = theme_createSuper(_default);

  function _default() {
    var _this;

    theme_classCallCheck(this, _default);

    _this = _super.call(this, 'theme');
    _this.drw = null;
    _this.opt = {
      cTheme: 'js-theme',
      idTheme: 'theme-config'
    };
    return _this;
  }

  theme_createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (!document.body.classList.contains(this.opt.cTheme)) return;
      this.restore(document.documentElement, 'theme-html'); //this.restore(document.body, 'theme-body');
      //button

      var a = this.app.ins('a', 'Theme', {
        href: '#' + this.opt.idTheme,
        className: 'fix pad btn theme-btn hide-print'
      }, document.body);
      var s = a.style;
      s.transform = 'rotate(-90deg)';
      s.transformOrigin = '100% 100%';
      s.top = '10vh';
      s.right = '-.2em';
      s.bottom = s.left = 'auto';
      s.margin = 0; //drawer

      this.drw = this.app.ins('div', '', {
        id: this.opt.idTheme,
        className: this.app.opt.cToggle + ' ' + this.app.opt.cOff + ' drawer swipe drag pad small shift theme-drawer',
        'data-swipe': '2'
      }, document.body);
      this.app.ins('a', '&#x2715;', {
        href: '#cancel',
        className: 'pad hover close'
      }, this.drw); //menu

      this.hx('Theme', 2);
      this.app.b([this.app.ins('a', 'Reset to default', {
        href: '#',
        className: ''
      }, this.drw)], 'click', function (e) {
        return _this2.unstyle(e);
      });
      this.put('Background', ['#fff', '#eee', '#ffeee6', '#ffe', '#efe', '#e6fcf9', '#e3eeff', '#f9e9ff'], '--bg');
      this.put('Menu', ['rgba(255,255,255,0)', 'rgba(0,0,0,.1)', 'hsla(1,100%,55%,.3)', 'hsla(45,100%,50%,.3)', 'hsla(120,100%,35%,.3)', 'hsla(180,100%,35%,.3)', 'hsla(220,100%,55%,.3)', 'hsla(290,100%,50%,.3)'], ['--bg-pane', '--bg-hilite']);
      this.put('Links', ['#000', '#777', '#c00', '#c60', '#090', '#088', '#00c', '#909'], ['--link', '--visited', '--hover']);
      this.put('Text', ['#000', '#222', '#444', '#555', '#666', '#777', '#888', '#999'], '--text');
      this.put('Font', this.opt.fonts || ['sans-serif', 'serif', 'monospace'], '--font');
      this.put('Gaps', ['0.5', '0.7', '1', '1.2', '1.5'], '--gap');
    }
  }, {
    key: "restore",
    value: function restore(n, v) {
      var css = localStorage.getItem(v);
      if (css) n.style = css;
    }
  }, {
    key: "style",
    value: function style(k, v, deep) {
      var _this3 = this;

      if (k instanceof Array) k.forEach(function (w) {
        return _this3.style(w, v, 1);
      });else {
        //let n = (k.substr(0, 2)=='--') ? document.documentElement : document.body;
        //let n = document.body;
        var n = document.documentElement;
        n.style.setProperty(k, v);
        localStorage.setItem('theme-' + n.tagName.toLowerCase(), n.style.cssText);
      }
    }
  }, {
    key: "unstyle",
    value: function unstyle(e) {
      e.preventDefault();
      var s = document.documentElement.style;

      for (var i = s.length; i--;) {
        s.removeProperty(s[i]);
      } //document.documentElement.style = '';
      ////document.body.style = '';


      localStorage.removeItem('theme-html'); //localStorage.removeItem('theme-body');
    }
  }, {
    key: "hx",
    value: function hx(s, l) {
      this.app.ins('h' + (l || 1), s, {
        className: 'mar'
      }, this.drw);
    }
  }, {
    key: "put",
    value: function put(hh, arr, func) {
      var _this4 = this;

      this.hx(hh, 3);
      var c = [];
      arr.forEach(function (v
      /*, k*/
      ) {
        var color = v.match(/[#(]/);

        var a = _this4.app.ins('a', color ? '' : v, {
          href: '#',
          title: v,
          className: color ? 'pad hover bord' : 'pad hover'
        }, _this4.drw);

        if (color) a.style.backgroundColor = v;else if (typeof func === 'string') a.style[func] = v;
        c.push(a);
      });
      this.app.b(c, 'click', func instanceof Function ? func : function (e) {
        e.preventDefault();

        _this4.style(func, e.target.title);
      });
    }
  }]);

  return _default;
}(plugins_plugin["a" /* default */]);


// CONCATENATED MODULE: ./src/index.js






















var src_app = new app["a" /* default */]();
src_app.plug(code_default);
src_app.plug(icons_default);
src_app.plug(toggle["a" /* default */]);
src_app.plug(dialog["a" /* default */]);
src_app.plug(gallery["a" /* default */]);
src_app.plug(fetch_default);
src_app.plug(tablex_default);
src_app.plug(calendar_default);
src_app.plug(lookup_default);
src_app.plug(edit_default);
src_app.plug(valid_default);
src_app.plug(tools_default);
src_app.plug(form_default);
src_app.plug(keepform_default);
src_app.plug(items_default);
src_app.plug(filter_default);
src_app.plug(fliptable_default);
src_app.plug(swipe_default);
src_app.plug(scroll_default);
src_app.plug(theme_default); // const opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}}

src_app.b([document], 'DOMContentLoaded', function (e) {
  return src_app.init();
}); // if (typeof module !== 'undefined') module.exports = app

if (window) window.d1 = src_app;

/***/ })
/******/ ]);