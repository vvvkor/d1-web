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
/*! app - core of d1-web */
// (() => {
//let main = new (function(){
/* harmony default export */ __webpack_exports__["a"] = (function () {
  this.sequence = 0;
  this.plugins = {};
  this.handlers = {};
  this.opt = {
    debug: 0,
    aCaption: 'data-caption',
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

  this.init = function (opt) {
    var _this = this;

    document.body.classList.add(this.opt.cJs); // prepare body: anti-hover, anti-target

    this.fire('beforeopt'); //options

    if (!opt) {
      opt = this.attr(document.body, 'data-d1');
      if (opt) opt = JSON.parse(opt);
    }

    this.setOpt(this, opt);
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
  }; // event delegation
  // https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/


  this.on = function (t, e) {
    this.fire('before', e);
    this.fire(t, e); //this.fire(t + 'ed', e);
    //if(!e || !e.defaultPrevented) ;

    this.fire('after', e);
  }; //plugins


  this.setOpt = function (obj, opt) {
    var i;
    if (opt) for (i in opt) {
      if (i != 'plug') obj.opt[i] = opt[i];
    }
  };

  this.plug = function (c, n) {
    var p = new c();
    this.plugins[n || p.name] = p;
  };

  this.initPlugins = function (opt) {
    var _this2 = this;

    if (this.opt.disable) this.opt.disable.forEach(function (p) {
      return delete _this2.plugins[p];
    });
    this.dbg(['plugins', this.plugins]);
    Object.keys(this.plugins).forEach(function (k) {
      _this2.plugins[k].app = _this2;
      if (opt && opt.plug && opt.plug[k]) _this2.setOpt(_this2.plugins[k], opt.plug[k]);
    });
    this.fire('beforeinit');
    Object.keys(this.plugins).forEach(function (k) {
      return _this2.plugins[k].init();
    });
    this.fire('afterinit');
  }; //events


  this.fire = function (et, e) {
    var _this3 = this;

    this.dbg(['fire ' + et, e]);
    if (this.handlers[et]) this.handlers[et].forEach(function (h) {
      return h.call(_this3, e);
    });
  };

  this.listen = function (et, f) {
    //if(!this.handlers[et]) this.handlers[et] = [];
    //this.handlers[et].push(f);
    this.h(et, '', f);
  }; //handle


  this.h = function (et, s, f, before) {
    var _this4 = this;

    if (et instanceof Array) et.forEach(function (ett) {
      return _this4.h(ett, s, f, before);
    });else {
      if (!this.handlers[et]) this.handlers[et] = [];
      this.handlers[et][before ? 'unshift' : 'push'](function (e) {
        if (s) e.recv = e.target.closest(s);
        if (!s || e.recv) f(e);
      });
    }
  };

  this.dispatch = function (n, et, p) {
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
  }; //utils
  // debug


  this.isDebug = function (l) {
    return this.opt.debug >= (l || 1) || location.href.indexOf('d1debug') != -1;
  };

  this.dbg = function (s, l, e) {
    if (this.isDebug(l)) console[e ? 'error' : 'log'](s);
  }; // sequence for IDs of generated nodes


  this.seq = function () {
    return ++this.sequence;
  }; // convert to array


  this.a = function (c) {
    return c ? Array.prototype.slice.call(c) : c;
  }; // find node


  this.q = function (s, n) {
    try {
      return (n || document).querySelector(s);
    } catch (e) {
      return null;
    }
  }; // find nodes


  this.qq = function (s, n) {
    try {
      var r = (n || document).querySelectorAll(s);
      return this.a(r);
    } catch (e) {
      return [];
    }
  };

  this.next = function (n, s, prev) {
    while (n = n[prev ? 'previousElementSibling' : 'nextElementSibling']) {
      if (n.matches(s)) return n;
    }
  };

  this.nn = function (q) {
    if (!q) return [];else if (typeof q === 'string') return this.qq(q);else if (q.tagName) return [q];else return this.a(q);
  }; // add event listener


  this.b = function (q, et, f, capt) {
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
  }; // execute for each node


  this.e = function (q, f) {
    var _this5 = this;

    if (f) this.nn(q).forEach(function (n) {
      return f.call(_this5, n);
    });
  }; // get attribute of node


  this.attr = function (n, a, def) {
    return n && n.hasAttribute(a) ? n.getAttribute(a) : def !== undefined ? def : null;
  };

  this.typeOf = function (v) {
    return Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
  }; // insert node
  //pos: -1=before, false=prepend, 0=append(default), 1=after


  this.ins = function (tag, t, attrs, n, pos) {
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
  }; // remove all children


  this.clr = function (n) {
    if (n) while (n.firstChild) {
      n.removeChild(n.firstChild);
    }
  }; // insert close link with icon


  this.x = function (d, pos, cls) {
    return this.ins('a', this.i('close', '&#x2715;'), {
      href: this.opt.hClose,
      className: cls || ''
    }, d, pos);
  }; // insert icon


  this.i = function (ico, alt) {
    return this.plugins.icons ? this.plugins.icons.i(ico, alt) : this.ins('span', alt || ico);
  }; // get node toggle status


  this.vis = function (n) {
    return !n.classList.contains(this.opt.cOff);
  }; // function


  this.throttle = function (f, ms) {
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
  };

  this.delay = function (f, ms, skip) {
    var p = null;
    return function ff() {
      var _arguments = arguments,
          _this6 = this;

      if (skip && p) clearTimeout(p);
      p = setTimeout(function () {
        f.apply(_this6, _arguments);
        p = null;
      }, ms);
    };
  }; // url
  // get url parameter(s) from link node


  this.get = function (a, g) {
    if (!a || a.tagName != 'A') return null;
    var i,
        gets = {};
    var args = a.search ? a.search.replace(/^\?/, '').split('&') : [];

    for (i = 0; i < args.length; i++) {
      var v = args[i].split('=');
      gets[v[0]] = decodeURIComponent(v[1]).replace(/\+/, ' ');
    }

    return g ? gets[g] : gets; //protocol, host (hostname, port), pathname, search, hash
  }; // compose url from link node or string, with additional parameters


  this.makeUrl = function (a, args) {
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
  };
});
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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
        return n.href = _this2.app.attr(n, 'data-href');
      });
      app.listen('esc', function (e) {
        return _this2.esc(e);
      });
      app.listen('unpop', function (e) {
        return _this2.unpop.apply(_this2, _toConsumableArray(e));
      });
      app.listen('toggle', function (e) {
        return _this2.toggle.apply(_this2, _toConsumableArray(e));
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
        return !e || ['click', 'keydown', 'hashchange'].indexOf(e.type) != -1 ? _this2.shown = null : null;
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
      var n = e ? e.target : null; //this.shown = null;//do it just once when dialog is opened
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
          if (!deep) this.shown = d;
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

      var nn = this.app.qq(this.opt.qUnpop).filter(function (n) {
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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
      aHead: 'data-head',
      aPic: 'data-pic',
      aPrompt: 'data-prompt',
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
      this.app.listen('dialog', function (e) {
        return _this2.openDialog.apply(_this2, _toConsumableArray(e));
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
      d.className = this.opt.ccDlg + (setup["class"] ? ' ' + setup["class"] : '');
      app.clr(d);
      if (h.nodeType) h = app.attr(h, this.opt.aHead, '');
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

      this.app.fire('toggle', [this.dlg, true]);
    }
  }, {
    key: "closeDialog",
    value: function closeDialog() {
      this.app.fire('unpop', []);
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
      var h = app.attr(n, this.opt.aHead, '').replace(/%([\w\-]+)%/g, function (m, a) {
        return n.getAttribute(a);
      });
      var icon = app.attr(n, this.opt.aPic, '');
      var p = app.attr(n, this.opt.aPrompt, '');
      var t = app.attr(n, app.opt.aCaption, n.title || p || '!').replace(/%([\w\-]+)%/g, function (m, a) {
        return n.getAttribute(a);
      });
      var rev = app.attr(n, 'data-reverse');
      var src = app.attr(n, 'data-src');
      var go = app.attr(n, 'data-go');
      src = src ? app.q(src) : null;
      if (!src && n.form) src = n.form.elements[p];
      var v = null;
      var al = n.matches(this.opt.qAlert);
      var def = p ? src ? src.value : app.get(n, p) : null;
      if (def && go !== null) this.onAnswer(n, def, p); //go with default
      else if (this.opt.customDialog) {
          this.openDialog(h, t, al ? null : function (w) {
            return _this4.onAnswer(n, w, p);
          }, {
            ok: app.attr(n, 'data-ok', ''),
            cancel: app.attr(n, 'data-cancel', ''),
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
            var ha = app.attr(n, 'href', '').substr(0, 1) == '#';
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
        this.loadImg(this.app.q(n.hash));
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
          }, g); //p.style.setProperty('--img', 'url("' + app.attr(a[i], 'href', '') + '")');
          //p.style.backgroundImage = 'url("' + app.attr(a[i], 'href', '') + '")';//preload all

          p.vLink = app.attr(a[i], 'href', ''); //real link

          p.vImg = app.attr(a[i], 'href', ''); //preload prev & next

          p.setAttribute(app.opt.aCaption, (this.opt.num ? i + 1 + '/' + z + (a[i].title ? ' - ' : '') : '') + (a[i].title || ''));
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
  "delete": [20, 'M5 3l5 5 5-5 2 2-5 5 5 5-2 2-5-5-5 5-2-2 5-5-5-5z'],
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
      aLang: 'data-lang',
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
      var lang = this.app.attr(src, this.opt.aLang, this.opt.defLang);
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


// EXTERNAL MODULE: ./src/js/util/iconset.js
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
      iconSize: 24,
      pSvg: 'icon-',
      // id prefix to search on page; set false to skip search
      //aReplace: 'data-ico',
      //aAdd: 'data-icon',
      qIcon: '[data-ico], [data-icon], [class*="ico-"], [class*="icon-"]',
      qIconReplace: '[data-ico], [class*="ico-"]'
    };
    _this.parsed = {};
    _this.icons = iconset_default.a;
    return _this;
  }

  icons_createClass(_default, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      //this.app.e('[' + this.opt.aReplace + ']',  n => this.addIcon(this.app.attr(n, this.opt.aReplace, ''), n, true));
      //this.app.e('[' + this.opt.aAdd + ']', n => this.addIcon(this.app.attr(n, this.opt.aAdd, ''), n));
      this.app.e(this.opt.qIcon, function (n) {
        return _this2.iconize(n);
      });
    }
  }, {
    key: "iconize",
    value: function iconize(n) {
      var m,
          i = this.app.attr(n, 'data-ico') || this.app.attr(n, 'data-icon');

      if (!i) {
        m = n.className.match(/\bicon?-([\w\-_]+)/);
        if (m) i = m[1];
      }

      if (i) {
        var clr = n.matches(this.opt.qIconReplace);
        this.addIcon(i, n, clr);
        if (m) n.classList.remove(m[0]);
      }
    }
  }, {
    key: "addIcon",
    value: function addIcon(i, n, clr) {
      var t = n.textContent;
      var icon = this.i(i);

      if (icon) {
        if (clr) {
          this.app.clr(n);
          if (!n.title) n.title = t;
        } //if(n.firstChild) n.insertBefore(document.createTextNode(' '), n.firstChild);


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
          if (!this.app.attr(n, 'width')) n.setAttribute('width', this.opt.iconSize);
          if (!this.app.attr(n, 'height')) n.setAttribute('height', this.opt.iconSize);
          if (!this.app.attr(n, 'class')) n.setAttribute('class', this.opt.cIcon);
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
// let toggle = require('./toggle.js');
// let dialog = require('./dialog.js');


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

      this.fetch(this.app.attr(n, 'href', ''), function (r) {
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
      // JSON.parse(req.responseText)
      var d = this.app.q(this.app.attr(n, 'data-target', ''));

      if (req.status == '200') {
        if (d) {
          d.innerHTML = req.responseText;
          var dlg = d.closest('.dlg[id]');
          if (dlg) this.app.fire('toggle', [dlg, true]);
        } else {
          this.app.fire('dialog', [n, req.responseText]);
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
var dt_default = /*#__PURE__*/function () {
  function _default() {
    dt_classCallCheck(this, _default);
  }

  dt_createClass(_default, null, [{
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
      var m = this.n(x.getMonth() + 1);
      var d = this.n(x.getDate());
      var h = this.n(x.getHours());
      var i = this.n(x.getMinutes());
      var s = this.n(x.getSeconds());
      return (f == 'm' ? m + '/' + d + ' ' + y : f == 'd' ? d + '.' + m + '.' + y : y + '-' + m + '-' + d) + (t && h + i + s > 0 ? ' ' + this.n(x.getHours()) + ':' + this.n(x.getMinutes()) + ':' + this.n(x.getSeconds()) : '');
    }
  }, {
    key: "n",
    value: function n(v, l) {
      return ('000' + v).substr(-(l || 2));
    }
  }]);

  return _default;
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
      aFilter: 'data-filter',
      aRep: 'data-filter-report',
      aTotal: 'data-total',
      aLimit: 'data-limit',
      aPages: 'data-pages',
      aPageNavAfter: 'data-pages-after',
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

      this.lang = this.app.attr(document.documentElement, 'lang') || 'en';
      this.skipComma = this.lang == 'en';
      var q = 'table.' + this.opt.cSort + ', table.' + this.opt.cFilter + ', table.' + this.opt.cTotals + ', table[' + this.opt.aFilter + ']' + ', table[' + this.opt.aLimit + ']';
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
      var fq = this.app.attr(n, this.opt.aFilter);
      n.vInp = fq ? document.querySelector(fq) : n.querySelector('[name="_q"]');
      n.vRep = this.app.q(this.app.attr(n, this.opt.aRep, ''));
      n.vLimit = 1 * this.app.attr(n, this.opt.aLimit, 0);
      n.vPage = 1;
      if (!n.vInp && !n.vRep && n.classList.contains(this.opt.cFilter)) this.addFilter(n);
      if (n.vLimit && tb.rows.length > n.vLimit) this.addPageNav(n);

      if (n.vInp) {
        //n.vInp.onsearch = n.vInp.onkeyup = this.doFilter.bind(this,n);
        //1.
        //if(!n.vInp.vListen) n.vInp.addEventListener('input', this.doFilter.bind(this, n), false);
        //2.
        var f = this.app.delay(this.doFilter, this.opt.wait, true);
        if (!n.vInp.vListen) n.vInp.addEventListener('input', f.bind(this, n), false);
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
      }, t, this.app.attr(n, this.opt.aPageNavAfter) === null ? -1 : 1);
    }
  }, {
    key: "setPageNav",
    value: function setPageNav(n) {
      var app = this.app;
      var m = 1 * app.attr(n, this.opt.aPages, 10);
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
        n.vCols = this.app.attr(n, 'data-filter-cols', '');
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
      var a = this.app.attr(m, 'data-total', '');
      var dec = parseInt(this.app.attr(m, 'data-dec', 2), 10);
      var mode = this.app.attr(m, 'data-mode',
      /*'n'*/
      n.vTypes[j]);
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
      var r = dt_default.parse(v);
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
      else if (mode == 'b') return this.fmtSz(x, dec);else if (mode == 'i') return this.fmtInterval(x, dec);else if (mode == 'd') return dt_default.fmt(new Date(x), dec, this.opt.dateFormat);else return x;
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


// CONCATENATED MODULE: ./src/index.js









var src_app = new app["a" /* default */](); //console.log('app', app)

/*
const plugins = [
  'code', // should be first
  'icons',
  'toggle', 'dialog', 'gallery',
  'fetch', 'tablex',
  // todo:
  'calendar', 'lookup', 'edit', 'valid',
  'tools', 'form', 'keepform', 'items', 'filter',
  'fliptable', 'swipe', 'scroll',
  'theme'
]
*/

src_app.plug(code_default);
src_app.plug(icons_default);
src_app.plug(toggle["a" /* default */]);
src_app.plug(dialog["a" /* default */]);
src_app.plug(gallery["a" /* default */]);
src_app.plug(fetch_default);
src_app.plug(tablex_default); // let opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}}

src_app.b([document], 'DOMContentLoaded', function (e) {
  return src_app.init();
}); // if (typeof module !== 'undefined') module.exports = app

if (window) window.d1 = src_app;

/***/ })
/******/ ]);