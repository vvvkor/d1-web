/*! d1-web v2.2.14 */
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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Url; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*! url - url build and arguments */
var Url = /*#__PURE__*/function () {
  function Url() {
    _classCallCheck(this, Url);
  }

  _createClass(Url, null, [{
    key: "build",
    // build url from link node or string, with additional parameters
    value: function build(a, args) {
      this;

      if (!a.tagName) {
        //a = this.ins('a', '', {href: a})
        var h = a;
        a = document.createElement('a');
        a.href = h;
      }

      var g = Url.get(a);
      Object.keys(args).forEach(function (k) {
        return g[encodeURIComponent(k)] = encodeURIComponent(args[k]);
      });
      var q = Object.keys(g).map(function (k) {
        return k + '=' + g[k];
      }).join('&');
      return a.host ? a.protocol + '//' + a.host + a.pathname + (q ? '?' + q : '') + a.hash : a.href.replace(/[\?#].*$/, '') + (q ? '?' + q : '') + a.hash; //ie
    } // get url parameter(s) from link node or string

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
    }
  }]);

  return Url;
}();



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*! app - core of d1-web */
// (() => {
// const main = new (function () {
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
      this.fire(t, e); //this.fire(t + 'ed', e)
      //if (!e || !e.defaultPrevented)

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
        return (e === null || e === void 0 ? void 0 : e.unfire) ? null : h.call(_this4, e);
      });
    }
  }, {
    key: "listen",
    value: function listen(et, f) {
      //if (!this.handlers[et]) this.handlers[et] = []
      //this.handlers[et].push(f)
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
          if (s) e.recv = e.target.closest ? e.target.closest(s) : null;
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
    } // get object item by path

  }, {
    key: "path",
    value: function path(r, p, def) {
      if (p) {
        if (this.typeOf(p) === 'string') p = p.split('.');

        for (var i = 0; i < p.length; i++) {
          if (p[i] || p[i] === 0) {
            if (r === null || r[p[i]] === undefined) return def;
            r = r[p[i]];
          }
        }
      }

      return r;
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
        return this.a((n || document).querySelectorAll(s));
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
        if (this.typeOf(attrs) === 'string') attrs = {
          className: attrs
        };

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
    }
  }]);

  return _default;
}();
/*
if (this.window === this) window[main.name] = main
else module.exports = main
})()
*/




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
      //app.listen('swipe', e => this.swipe(e));

      /*
      app.e(this.opt.qTip, n => {
        let p = app.ins('div',app.ins('div', n.title.replace(/\s\s+/g, '<br>'), 'btn bg-n'), 'pop', n, 1);
        n.title = '';
        p.insertBefore(n, p.firstChild);
      });//init tooltips as popup
      */
    }
    /*
    swipe(e) {
      if (e.n.matches(this.opt.qDrw)) {
        this.tgl(e.n, false);
        setTimeout(() => e.n.style.transform = '', 500);
      }
    }
    */

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
          this.storeVisibility(d); //if (!deep) this.modalStyle(d);
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
        if (d.matches(this.opt.qDlg)) ; //this.app.e(this.opt.qDlg, n => n == d ? null : this.toggle(n, false, 1)); //hide other dialogs
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
          //if (a.hash == this.app.opt.hClose) keep = []; //return this.app.fire('esc'); //to close all, even container
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
          //const is_touch = 'ontouchstart' in document.documentElement;
          //const maxw = is_touch ? screen.width : window.innerWidth;
          var maxw = document.documentElement.clientWidth;
          s.right = 'auto';
          s.left = vert ? '100%' : 0;
          s.top = vert ? 0 : '100%';
          var qn = n.getBoundingClientRect();
          var qr = r.getBoundingClientRect();
          var dx = qn.right > maxw;
          var dy = qn.bottom > window.innerHeight;
          var wide = qr.width > 300; //x

          if (vert) s.left = dx || wide ? '3em' : '100%';else if (dx && qn.width > qr.width && qr.right > qn.width) {
            //if (overflows-right && wider-then-container && enough-place-on-the-left) pop-left
            s.left = qr.width - qn.width + 'px';
          } else s.left = 0; //y

          if (vert) s.top = dx || wide ? '90%' : 0;else if (dy && qr.top > qn.height) {
            //if (overflows-bottom && enough-place-on-the-top) pop-top
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var _plugin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _util_url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
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
      var hh = app.ins('div', '', 'row bg', d);
      var hhh = app.ins('h3', ' ' + (h || ''), 'fit pad', hh);

      if (setup.icon) {
        var m = setup.icon.match(/(\S+)(\s(.*))?/);
        if (m) hhh.insertBefore(app.ins('span', app.i(m[1]), {
          className: m[3] || ''
        }), hhh.firstChild);
      }

      app.x(hh, 0, 'pad hover col-0');
      var b = app.ins('div', '', 'pad', d);
      if (t) app.ins('div', t, {}, b);
      var inp = {
        value: true
      };
      if (setup.def || setup.def === '') inp = app.ins('input', '', {
        value: setup.def
      }, b);
      var bb = app.ins('p', '', 'r', b);
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
      var def = p ? src ? src.value : _util_url_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].get(n, p) : null;
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
              u = _util_url_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].build(n, a);
            }
            if (n.target == '_blank') window.open(u, n.target);else location.href = u;
          }
    }
  }]);

  return _default;
}(_plugin_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var _plugin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      }); //this.app.listen('swipe', e => this.swipe(e));

      this.app.listen('exhibit', function (e) {
        return _this2.reinit(e);
      });
      this.prepareAll();
    }
  }, {
    key: "reinit",
    value: function reinit(_ref) {
      var n = _ref.n,
          opt = _ref.opt;
      if (n.vGal) n.vGal.parentNode.removeChild(n.vGal);
      this.app.e(this.app.qq(this.opt.qLinks, n), function (a) {
        return delete a.vDone;
      });
      n.vGal = this.prepare(n, opt);
    }
  }, {
    key: "prepareAll",
    value: function prepareAll(d) {
      var _this3 = this;

      this.app.e(this.app.qq(this.opt.qGallery, d), function (n) {
        return _this3.prepare(n);
      });
    }
    /*
    swipe(e) {
      if (e.n.matches(this.opt.qGal)) {
        if (e.dir == 4) this.browse(e.n); // left
        else if (e.dir == 2) this.browse(e.n, true); // right
        else if (e.dir == 3) this.app.fire('esc'); // down
        else if (e.dir == 1) this.visit(e.n); // up
      }
    }
    */

  }, {
    key: "next",
    value: function next(e) {
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
    value: function prepare(n, opt) {
      opt = opt ? _objectSpread(_objectSpread({}, this.opt), opt) : this.opt;
      var app = this.app;
      var g = app.ins('div', '', {
        className: opt.cGal
      });
      var a = app.qq(opt.qLinks, n);
      var z = a.length;
      var first = 0;

      for (var i = 0; i < z; i++) {
        if (!a[i].vDone) {
          var s = app.seq();
          if (!i) first = s;
          var next = '#' + opt.idPrefix + (i == z - 1 ? first : s + 1);
          var prev = '#' + opt.idPrefix + (i == 0 ? first + z - 1 : s - 1);
          var p = app.ins('a', '', {
            className: 'gallery-pic swipe drag',
            id: opt.idPrefix + s,
            href: next,
            'data-swipe-up': a[i].href || '',
            'data-swipe-right': prev,
            'data-swipe-down': this.app.opt.hClose,
            'data-swipe-left': next
          }, g); //p.style.setProperty('--img', 'url("' + (a[i].getAttribute('href') || '') + '")');
          //p.style.backgroundImage = 'url("' + (a[i].getAttribute('href') || '') + '")';//preload all

          p.vLink = a[i].getAttribute('href') || ''; //real link

          p.vImg = p.vLink; //keep image url but do not load yet

          p.dataset[opt.dCaption] = (opt.num ? i + 1 + '/' + z + (a[i].title ? ' - ' : '') : '') + (a[i].title || '');
          a[i].href = '#' + p.id;
          a[i].vDone = 1;
        }
      }

      app.x(g);
      document.body.appendChild(g);
      return g;
    }
  }, {
    key: "visit",
    value: function visit(a) {
      var h = a.vLink;

      if (!h) {
        h = window.getComputedStyle(a).backgroundImage;
        h = h.substring(4, h.length - 1).replace(/^"|"$/g, '');
      }

      if (h) location.href = h;
    }
  }, {
    key: "onKey",
    value: function onKey(e) {
      if (location.hash) {
        var a = this.app.q(location.hash);

        if (a && a.hash) {
          var k = e.keyCode;
          if (k == 37 || k == 38) this.browse(a, true);else if (k == 39 || k == 40) this.browse(a); //a.click();
          else if (k == 8) this.visit(a); //e.preventDefault();
        }
      }
    }
  }]);

  return _default;
}(_plugin_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);



/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_polyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _js_polyfill_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_polyfill_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _js_plugins_toggle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _js_plugins_dialog_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _js_plugins_gallery_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);





var app = new _js_app_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]();
app.plug(_js_plugins_toggle_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);
app.plug(_js_plugins_dialog_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);
app.plug(_js_plugins_gallery_js__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]); // let opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}}

app.b([document], 'DOMContentLoaded', function (e) {
  return app.init();
}); // if (typeof module !== 'undefined') module.exports = app

if (window) window.d1 = app;

/***/ })
/******/ ]);