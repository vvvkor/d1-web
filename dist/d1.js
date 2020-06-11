/*! d1-web v1.2.86 */
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
/***/ (function(module, exports) {

/*! app - core of d1-web */
// (() => {
//let main = new (function(){
module.exports = new function () {
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

  this.plug = function (p) {
    this.plugins[p.name] = p;
  };

  this.initPlugins = function (opt) {
    var _this2 = this;

    if (this.opt.disable) this.opt.disable.forEach(function (p) {
      return delete _this2.plugins[p];
    });
    this.dbg(['plugins', this.plugins]);
    Object.keys(this.plugins).forEach(function (k) {
      return opt && opt.plug && opt.plug[k] ? _this2.setOpt(_this2.plugins[k], opt.plug[k]) : null;
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
  }; // insert node
  //pos: -1=before, false=prepend, 0=append(default), 1=after


  this.ins = function (tag, t, attrs, n, pos) {
    var c = document.createElement(tag || 'span');
    if (t && t.nodeType) c.appendChild(t);else if (t) c.innerHTML = t;

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
}();
/*
if (this.window === this) window[main.name] = main;
else module.exports = main;
})();
*/

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*! toggle - togglable interactive components */
// Interface components: dropdown, popup, toggle, modal dialog, tabs, drawer, tree, gallery
// .nav, .pop, .toggle, .dlg, .tabs, .drawer, .tree, .gal
var app = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'toggle';
  this.shown = null;
  this.nEsc = 0;
  this.opt = {
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

  this.init = function () {
    var _this = this;

    app.listen('esc', function (e) {
      return _this.esc(e);
    });
    app.listen('hashchange', function (e) {
      return _this.onHash(e);
    });
    app.listen('keydown', function (e) {
      return _this.onKey(e);
    });
    app.h('click', 'a[href^="#"]', function (e) {
      return _this.onLink(e);
    });
    app.listen('click', function (e) {
      return _this.onClick(e);
    });
    app.listen('after', function (e) {
      return e && e.type == 'click' ? _this.unpop(e.target) : null;
    }); // click out

    app.listen('after', function (e) {
      return !e || ['click', 'keydown', 'hashchange'].indexOf(e.type) != -1 ? _this.modalStyle(e) : null;
    });
    app.listen('after', function (e) {
      return !e || ['click', 'keydown', 'hashchange'].indexOf(e.type) != -1 ? _this.shown = null : null;
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
      return _this.attachSubNav(n);
    }); //nav, tree: attach to links

    app.e(togglers, function (n) {
      return _this.initToggler(n);
    }); //initialize togglers

    this.opt.mediaSuffixes.forEach(function (x) {
      return app.e(_this.opt.qTrg + x, function (n) {
        return _this.initToggler(n, x);
      });
    }); //initialize togglers by media
    //let autohide = [        q.qPop, q.qNav, q.qDlg, q.qTab, q.qAcc, q.qDrw, q.qMedia/*, q.qGal*/].join(', ');
    //app.e(autohide, n => this.tgl(n, 0)); //autohide

    app.e(this.opt.qGal + ':last-child', function (n) {
      return app.x(n, 1);
    }); //gal: auto add close link

    app.e(this.opt.qSubMem, function (n) {
      return n.classList.add(_this.opt.cMem);
    }); //initialize sub mem

    app.e('[id]', function (n) {
      return _this.restoreVisibility(n);
    }); //restore visibility

    app.e(this.opt.qTab + ':not(.' + app.opt.cOff + ') ~ [id]:not(.' + app.opt.cOff + ')', function (n) {
      return _this.tgl(n, 0);
    }); //undup tabs

    app.e(this.opt.qTab + ':first-child', function (n) {
      return app.a(n.parentNode.children).filter(function (m) {
        return app.vis(m);
      }).length ? null : _this.tgl(app.q(app.q('a[href^="#"]', n.parentNode.previousElementSibling).hash), 1);
    }); //inactive tabs: show first

    app.e('.' + app.opt.cToggle + '[id]', function (n) {
      return _this.hiliteLinks(n);
    }); //init links state

    app.e(this.opt.qTip, function (n) {
      n.setAttribute('data-tip', n.title.replace(/\s\s+/g, '\n'));
      n.title = '';
    }); //init tooltips

    app.listen('swipe', function (e) {
      return _this.swipe(e);
    });
    /*
    app.e(this.opt.qTip, n => {
      let p = app.ins('div',app.ins('div', n.title.replace(/\s\s+/g, '<br>'), {className: 'btn bg-n'}), {className: 'pop'}, n, 1);
      n.title = '';
      p.insertBefore(n, p.firstChild);
    });//init tooltips as popup
    */
  };

  this.swipe = function (e) {
    if (e.n.matches(this.opt.qDrw)) {
      this.tgl(e.n, false);
      setTimeout(function () {
        return e.n.style.transform = '';
      }, 500);
    }
  };

  this.modalStyle = function (e) {
    var n = e ? e.target : null; //this.shown = null;//do it just once when dialog is opened
    //let modal = app.q(this.opt.qDlg+':not(.'+app.opt.cOff+'), '+this.opt.qGal+':target'); // :target not updated after Esc key
    //styles

    var modal = app.q(this.opt.qDlg + ':not(.' + app.opt.cOff + '), ' + this.opt.qGal + '[id="' + location.hash.substr(1) + '"]');
    var bar = window.innerWidth - document.documentElement.clientWidth; //scroll bar width

    var s = document.body.style;
    document.body.classList[modal ? 'add' : 'remove'](this.opt.cFade);

    if (this.opt.dlgUnscroll) {
      //hide scroll
      s.overflow = modal ? 'hidden' : '';
      if (!(modal && s.paddingRight)) s.paddingRight = modal ? '' + bar + 'px' : ''; // avoid width reflow
    }

    app.dbg(['modalStyle', n, modal, s.paddingRight]); //focus first input

    if (modal) {
      //let f1 = app.q('input, a:not(.' + app.opt.cClose + ')', modal);
      var f1 = app.q('input:not([type="hidden"]), select, textarea, a.btn, a:not([href="' + app.opt.hClose + '"])', modal);
      var f = app.q(':focus', modal);

      if (f1 && !f && (!n || !n.nodeType || !modal.contains(n))) {
        app.dbg(['focus', n, modal, f1, f]);
        f1.focus(); //focus just once when dialog is opened

        if (f1.type == 'text') f1.select();
      }
    }
  };

  this.esc = function (e) {
    app.dbg(['esc', e]);
    if (e) e.preventDefault();
    this.unpop(null, true);
    this.unhash();
    this.modalStyle();
  };

  this.onHash = function (e) {
    app.dbg(['hashchange', location.hash]);
    this.nEsc = 0;
    if (location.hash === app.opt.hClose) app.fire('esc', e);else if (location.hash) {
      var d = app.q(location.hash);

      if (d) {
        var t = d.matches(this.opt.qTgl);
        var g = d.matches(this.opt.qGal);

        if (t) {
          this.unpop();
          this.toggle(d, true);
          if (!this.opt.keepHash) this.unhash();
        }

        if (t || g) this.modalStyle();else this.unpop(); //app.fire('esc', e);
      }
    }
  };

  this.onKey = function (e) {
    var k = e.keyCode;
    app.dbg(['keydown', k, this.nEsc]);
    if (k == 27 && this.nEsc >= 2) localStorage.clear();else if (k == 27) app.fire('esc', e);
    this.nEsc = k == 27 && this.nEsc < 2 ? this.nEsc + 1 : 0;
  };

  this.onLink = function (e) {
    var a = e.recv;

    if (a && a.hash === app.opt.hClose) {
      e.preventDefault();
      var d = a.closest(this.opt.qTgl);
      app.dbg(['close', this.opt.qTgl, a, d]);
      if (d) this.tgl(d, false);else app.fire('esc', e);
    } else {
      var _d = app.q(a.hash);

      if (_d && _d.matches(this.opt.qTgl)) {
        e.preventDefault();
        _d = this.toggle(_d);
        if (app.vis(_d) && this.opt.keepHash) this.addHistory(a.hash);else this.unhash();
      }
    }
  };

  this.onClick = function (e) {
    this.nEsc = 0;
    if (!e.target.closest('a, input, select, textarea')) this.unhash();
    if (e.clientX >= 0 && e.clientX <= 10 && e.clientY > 5 && this.opt.qDrawer) this.toggle(this.opt.qDrawer);
  };

  this.initToggler = function (n, suffix) {
    n.classList.remove(this.opt.cTarget + (suffix || ''));
    n.classList.add(app.opt.cToggle + (suffix || ''));
    this.tgl(n, 0);
  };

  this.attachSubNav = function (n) {
    //let a = n.previousElementSibling;
    var aa = app.a(n.parentNode.children).filter(function (v) {
      return v.tagName == 'A';
    });
    var a = aa.filter(function (v) {
      return !v.href;
    })[0] || aa[0] || app.ins('', ' ', {}, n.parentNode, false) && app.ins('a', app.i('toggle', '[+]'), {}, n.parentNode, false);

    if (a) {
      if (!n.id) n.id = 'ul-' + app.seq();
      a.href = '#' + n.id;
    }
  }; //deep: -1=prepare, 0=click|hash, 1=deps|clo


  this.toggle = function (h, on, deep) {
    var d = h ? h.tagName ? h : app.q(h) : null;

    if (d) {
      if (d.matches(this.opt.qTab) && on === undefined) on = true; //tabs: show instead of toggle
      //console.log('toggle '+d.id, on, deep);

      app.fire('beforetoggle', {
        n: d,
        on: on,
        deep: deep
      });
      this.tgl(d, on);
      app.dbg(['toggle' + (deep ? ' deep' : ''), on, d], deep ? 2 : 1);

      if (app.vis(d)) {
        this.fixPosition(d);
        if (!deep) this.shown = d;
      }

      if (deep != -1) {
        if (!deep) this.toggleDependent(d);
        this.hiliteLinks(d);
        this.storeVisibility(d); //if(!deep) this.modalStyle(d);
      }

      app.fire('aftertoggle', {
        n: d,
        on: on,
        deep: deep
      });
    }

    return d;
  };

  this.tgl = function (d, on) {
    if (d) d.classList[on ? 'remove' : on === undefined ? 'toggle' : 'add'](app.opt.cOff);
  };

  this.toggleDependent = function (d) {
    var _this2 = this;

    if (app.vis(d)) {
      if (d.matches(this.opt.qDlg)) ; //app.e(this.opt.qDlg, n => n==d ? null : this.toggle(n, false, 1)); //hide other dialogs
      else if (d.matches(this.opt.qTab)) app.e(d.parentNode.children, function (n) {
          return n == d ? null : _this2.toggle(n, false, 1);
        }); //hide sibling tabs
        else if (d.matches(this.opt.qAcc)) app.e(app.qq(this.opt.qAcc, d.closest(this.opt.qAccRoot)), function (n) {
            return n.contains(d) ? null : _this2.toggle(n, false, 1);
          }); //hide other ul
    }
  };

  this.unpop = function (x, seq) {
    var _this3 = this;

    var keep = [x];
    keep.push(this.shown); // click out: keep

    if (x) {
      var a = x.closest('a');

      if (a && a.hash) {
        //if(a.hash==app.opt.hClose) keep = []; //return app.fire('esc'); //to close all, even container
        //else
        keep.push(app.q(a.hash)); //keep hash target
      }
    }

    app.dbg(['unpop', keep]); //app.e(this.opt.qUnpop, n => (keep && keep.filter(m => m && m.tagName && n.contains(m)).length) ? null : this.toggle(n, false, 1));

    var nn = app.qq(this.opt.qUnpop).filter(function (n) {
      return !(keep && keep.filter(function (m) {
        return m && m.tagName && n.contains(m);
      }).length);
    }); // skip if contains one of [keep]

    if (seq) nn = nn.filter(function (n) {
      return !app.q(_this3.opt.qUnpopOn, n);
    }); // to close nested subsequently

    app.e(nn, function (n) {
      return _this3.toggle(n, false, 1);
    });
  };

  this.unhash = function () {
    //v1.
    if (location.hash) location.hash = app.opt.hClose; //v2.

    this.addHistory(location.pathname + location.search
    /* + app.opt.hClose*/
    ); //inputs flicker
  };

  this.addHistory = function (h) {
    history.pushState({}, '', h); //following required to re-render hash changes (test: open gallery, esc)
    //history.pushState({}, '', h);
    //history.go(-1);
  };

  this.storeVisibility = function (n) {
    if (n && n.id && n.classList.contains(this.opt.cMem)) {
      localStorage.setItem('vis#' + n.id, app.vis(n) ? 1 : -1);
    }
  };

  this.restoreVisibility = function (n) {
    if (n && n.id && n.classList && n.classList.contains(this.opt.cMem)) {
      var v = localStorage.getItem('vis#' + n.id);
      if (v) this.toggle(n, v > 0, -1);
    }
  };

  this.hiliteLinks = function (d) {
    var op = app.vis(d) ? 'add' : 'remove';
    app.e('a[href="#' + d.id + '"]', function (a) {
      return a.classList[op](app.opt.cAct);
    });
  };

  this.fixPosition = function (n) {
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
  };
}();

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*! dialog - replacement of standard Javascript dialogs: alert, confirm, prompt */
// a.alert([title]|[data-caption])
// a.dialog[href]([title]|[data-caption])[data-prompt] [data-src][data-go][data-ok][data-cancel][data-reverse][data-head][data-pic]
var app = __webpack_require__(0);

var toggle = __webpack_require__(1);

module.exports = new function () {
  "use strict";

  this.name = 'dialog';
  this.dlg = null;
  this.opt = {
    ccDlg: 'dlg rad',
    customDialog: 1,
    aConfirm: '_confirm',
    aHead: 'data-head',
    aPic: 'data-pic',
    aPrompt: 'data-prompt',
    cBtn: 'btn pad',
    qAlert: 'a.alert',
    qDialog: 'a.dialog, input.dialog'
  };

  this.init = function () {
    var _this = this;

    this.opt.ccDlg = app.opt.cToggle + ' ' + app.opt.cOff + ' ' + this.opt.ccDlg;
    if (!this.dlg) this.dlg = app.ins('div', '', {
      className: this.opt.ccDlg
    }, document.body);
    app.h('click', this.opt.qAlert + ', ' + this.opt.qDialog, function (e) {
      return _this.onClick(e);
    });
  };

  this.onClick = function (e) {
    e.preventDefault();
    return this.openByNode(e.recv);
  }; //setup object keys: [ok, cancel, icon, class, btn, rev, def]


  this.open = function (h, t, f, setup) {
    var _this2 = this;

    setup = setup || {};
    var d = this.dlg;
    d.className = this.opt.ccDlg + (setup["class"] ? ' ' + setup["class"] : '');
    app.clr(d);
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

        _this2.callback(f, inp.value, e);
      });
      if (inp.tagName) app.b([inp], 'keyup', function (e) {
        return e.keyCode == 13 ? _this2.callback(f, inp.value, e) : null;
      });
    }

    toggle.toggle(this.dlg, true);
  };

  this.callback = function (f, v, e) {
    if (!f.call(this, v, e)) toggle.unpop(); // close dialog unless callback returns true
  };

  this.openByNode = function (n, f) {
    var _this3 = this;

    if (n.form && !n.form.checkValidity()) {
      if (n.form.reportValidity) n.form.reportValidity();
      return;
    }

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
        this.open(h, t, al ? null : function (w) {
          return _this3.onAnswer(n, w, p);
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
  };

  this.onAnswer = function (n, v, p, e) {
    //cancelled
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
        } else toggle.unpop(); //n.click();

      } //goto link
      else if (n && n.href) {
          var ha = app.attr(n, 'href', '').substr(0, 1) == '#';
          var bl = n.target == '_blank';
          if (ha || bl) toggle.unpop();
          var u;
          if (ha) u = n.hash;else {
            var a = {};
            a[this.opt.aConfirm] = 1;
            if (v !== true) a[p] = v;
            u = app.makeUrl(n, a);
          }
          if (n.target == '_blank') window.open(u, n.target);else location.href = u;
        }
  };
}();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*! date - parse and format date */
module.exports = new function () {
  "use strict";

  this.parse = function (s) {
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
  };
  /*
    x: date object
    t: include time
    f: y=Y-m-d (default), d=d.m.Y, m=m/d Y
  */


  this.fmt = function (x, t, f) {
    var y = x.getFullYear();
    var m = this.n(x.getMonth() + 1);
    var d = this.n(x.getDate());
    var h = this.n(x.getHours());
    var i = this.n(x.getMinutes());
    var s = this.n(x.getSeconds());
    return (f == 'm' ? m + '/' + d + ' ' + y : f == 'd' ? d + '.' + m + '.' + y : y + '-' + m + '-' + d) + (t && h + i + s > 0 ? ' ' + this.n(x.getHours()) + ':' + this.n(x.getMinutes()) + ':' + this.n(x.getSeconds()) : '');
  };

  this.n = function (v, l) {
    return ('000' + v).substr(-(l || 2));
  };
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*! gallery - image gallery */
// .gallery a.pic 
var app = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'gallery';
  this.opt = {
    idPrefix: 'pic-',
    num: true,
    cGal: 'gal',
    qGal: '.gal>a[id]',
    // dup of toggle.opt.qGal
    qGallery: '.gallery',
    qLinks: 'a.pic'
  };

  this.init = function () {
    var _this = this;

    app.listen('hashchange', function (e) {
      return _this.onHash(e);
    });
    app.listen('keydown', function (e) {
      return _this.onKey(e);
    });
    app.h('click', this.opt.qGal, function (e) {
      return _this.next(e);
    });
    app.listen('swipe', function (e) {
      return _this.swipe(e);
    });
    this.prepareAll();
  };

  this.prepareAll = function (d) {
    var _this2 = this;

    app.e(app.qq(this.opt.qGallery, d), function (n) {
      return _this2.prepare(n);
    });
  };

  this.swipe = function (e) {
    if (e.n.matches(this.opt.qGal)) {
      /*
      if(e.dir==2 || e.dir==4){
        let x = app.next(e.n, this.opt.qGal, e.dir==2);
        if(!x) x = e.dir==4 ? app.q(this.opt.qGal, e.n.parentNode) : app.qq(this.opt.qGal, e.n.parentNode).pop();
        if(x && x.id){
          e.n.classList.add('fade');
          location.hash = '#' + x.id;
          e.n.classList.add('fade-out', 'fade-' + e.dir);
          x.classList.add('fade-in');
          setTimeout(() => app.qq(this.opt.qGal, x.parentNode).forEach(m => {
            m.classList.remove('fade', 'fade-out', 'fade-in', 'fade-2', 'fade-4');
            m.style.transform = '';
          }), 500);
        }
      }
      */
      if (e.dir == 4) this.browse(e.n);else if (e.dir == 2) this.browse(e.n, true);else if (e.dir == 3) app.fire('esc');
    }
  };

  this.next = function (e) {
    //console.log(e.defaultPrevented);
    if (e.defaultPrevented) return;
    var n = e.recv;

    if (e.clientX > 0
    /* not Enter key */
    && e.clientX < n.clientWidth / 3) {
      this.browse(n, true);
      e.preventDefault();
    }
  };

  this.browse = function (n, back) {
    if (back) {
      var p = n.previousElementSibling || app.qq('a[id]', n.parentNode).pop();
      if (p.id) location.hash = '#' + p.id;
    } else location.hash = n.hash; //return p.id;

  };

  this.onHash = function () {
    var n = app.q(location.hash);

    if (n) {
      this.loadImg(n);
      this.loadImg(app.q(n.hash));
    }
  };

  this.loadImg = function (n) {
    if (n && n.vImg) {
      n.style.backgroundImage = 'url("' + n.vImg + '")';
      n.vImg = '';
    }
  };

  this.prepare = function (n) {
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
  };

  this.onKey = function (e) {
    if (location.hash) {
      var a = app.q(location.hash);

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
  };
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*! fetch - asynchronous requests */
var app = __webpack_require__(0);

var toggle = __webpack_require__(1);

var dialog = __webpack_require__(3);

module.exports = new function () {
  "use strict";

  this.name = 'fetch';
  this.opt = {};

  this.init = function () {
    var _this = this;

    app.h('click', 'a[data-target]', function (e) {
      return _this.onClick(e);
    });
  };

  this.onClick = function (e) {
    e.preventDefault();
    this.fetchBy(e.recv);
  };

  this.fetchBy = function (n, f) {
    var _this2 = this;

    this.fetch(app.attr(n, 'href', ''), function (r) {
      return f ? f(n, r) : _this2.receive(n, r);
    });
  };

  this.fetch = function (url, f) {
    var req = new XMLHttpRequest();
    if (f) req.addEventListener('load', function (e) {
      f(req);
      app.fire('after');
    });
    req.open('GET', url);
    req.send();
  };

  this.receive = function (n, req, e) {
    // JSON.parse(req.responseText)
    var d = app.q(app.attr(n, 'data-target', ''));

    if (req.status == '200') {
      if (d) {
        d.innerHTML = req.responseText;
        var dlg = d.closest('.dlg[id]');
        if (dlg) toggle.toggle(dlg, true);
      } else {
        dialog.open(app.attr(n, dialog.opt.aHead, ''), req.responseText);
      }
    } else console.error('XHTTP request failed', req); //app.fire('after', e);

  };
}();

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*! iconset - svg paths for building icons */
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
  date: [10, 'M1 1.8h8v7h-8zm1 2v4h6v-4zm.5-3v2h1.5v-2zm3.5 0v2h1.5v-2z'],
  time: [24, 'M12 1a10 10 0 1 1 -.01 0zm0 2a8 8 0 1 0 .01 0zm-1.2 1h2v6.5l3.5 3.5-1.5 1.5-4-4z'],
  refresh: [20, 'M10 .3v3a7 7 0 1 0 7 7h-2a5 5 0 1 1-5-5v3l5-4z'],
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
  photo: [10, 'M1 3h2l1-1h2l1 1h2v5h-8zm4 .5a1.8 1.8 0 1 0 .01 0z'],
  print: [10, 'M1 2.5h2v-1h4v1h2v4h-8zm2 2l-1 4h6l-1-4zm4-1h1v-.5h-1z'],
  play: [12, 'M3 2v8l7-4z'],
  pause: [9, 'M2 2h2v5h-2zm3 0h2v5h-2z'],
  stop: [9, 'M2 2h5v5h-5z'],
  rec: [10, 'M5 2a3 3 0 1 0 .01 0z'],
  layers: [14, 'M1 5.5l6-3 6 3-6 3zm0 3l2-1 4 2 4-2 2 1-6 3z'],
  none: [1, 'M1 1z']
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);

var app = __webpack_require__(0);

['code',
/* should be first */
'icons', 'toggle', 'dialog', 'gallery', 'fetch', 'tablex', 'calendar', 'lookup', 'edit', 'valid', 'tools', 'form', 'keepform', 'items', 'filter', 'fliptable', 'swipe', 'scroll', 'theme'].forEach(function (p) {
  return app.plug(__webpack_require__(9)("./" + p + ".js"));
}); //let opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}};

app.b([document], 'DOMContentLoaded', function (e) {
  return app.init();
});
if (true) module.exports = app;
if (window) window.d1 = app;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.js": 0,
	"./calendar.js": 10,
	"./code.js": 11,
	"./date.js": 4,
	"./dialog.js": 3,
	"./edit.js": 12,
	"./example.js": 13,
	"./fetch.js": 6,
	"./filter.js": 14,
	"./fliptable.js": 15,
	"./form.js": 16,
	"./gallery.js": 5,
	"./icons.js": 17,
	"./iconset.js": 7,
	"./items.js": 18,
	"./keepform.js": 19,
	"./lookup.js": 20,
	"./polyfill.js": 2,
	"./scroll.js": 21,
	"./swipe.js": 22,
	"./tablex.js": 23,
	"./theme.js": 24,
	"./toggle.js": 1,
	"./tools.js": 25,
	"./valid.js": 26
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 9;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*! calendar - replacement of standard date and datetime-local inputs */
var app = __webpack_require__(0);

var toggle = __webpack_require__(1);

var date = __webpack_require__(4);

module.exports = new function () {
  "use strict";

  this.name = 'calendar';
  this.opt = {
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
  this.win = null;

  this.init = function (opt) {
    var _this = this;

    var i;

    for (i in opt) {
      this.opt[i] = opt[i];
    }

    if (window.innerWidth < this.opt.minWidth) return;
    this.win = app.ins('div', '', {
      id: this.opt.idPicker,
      className: app.opt.cToggle + ' ' + app.opt.cOff + ' pad'
    }); //dlg hide pad

    this.win.style.whiteSpace = 'nowrap';
    document.body.appendChild(this.win);
    app.e(this.opt.qsCalendar, function (n) {
      return _this.preparePick(n);
    });
    app.h('click', this.opt.qsCalendar, function (e) {
      return _this.openDialog(e.target, null, e);
    });
    app.h('input', this.opt.qsCalendar, function (e) {
      return _this.validate(e.target, 0);
    }); //app.h('keydown', this.opt.qsCalendar, e => this.key(e));
    //app.h('click', '#' + this.opt.idPicker, e => toggle.shown = e.recv.vRel);

    app.h('click', '#' + this.opt.idPicker + ' a', function (e) {
      return _this.onClick(e);
    });
    app.h('click', '.calendar-tools a', function (e) {
      return _this.onClick(e, true);
    });
  };
  /*
  this.key = function(e){
    if(e.keyCode == 40 && !app.vis(this.win)) this.openDialog(e.target, null, e);
  }
  */


  this.onClick = function (e, tool) {
    var a = e.recv;
    var h = a.hash;

    if (h) {
      //nodes
      var n;
      var c = this.opt.qsCalendar;

      if (tool) {
        n = this.opt.inPop ? app.q(c, app.next(a.parentNode, '.pop', true)) : app.next(a.parentNode, c, true);
      } else if (this.win.vRel) n = this.win.vRel;else {
        var p = a.closest('#' + this.opt.idPicker);
        n = this.opt.inPop ? app.next(p, c, true) : app.next(p.parentNode, c);
      } //data


      var x = this.win.vCur;
      var dy = h == '#prev-year' ? -1 : h == '#next-year' ? 1 : 0;
      var dm = h == '#prev-month' ? -1 : h == '#next-month' ? 1 : 0;
      var dh = h == '#prev-hour' ? -1 : h == '#next-hour' ? 1 : 0;
      var di = h == '#prev-min' ? -this.opt.stepMinutes : h == '#next-min' ? this.opt.stepMinutes : 0; //actions

      if (dy || dm) this.switchMonths(n, x.getFullYear() + dy, x.getMonth() + dm, x.getDate());else if (dh || di) this.setTime(n, dh, di);else if (h == this.opt.hashNow) this.closeDialog(n, true);else if (h == this.opt.hCancel) this.closeDialog(n, null); // same as esc
      else if (h == '#open') this.openDialog(n, null);else if (h == '#clear') this.closeDialog(n, '');else if (h.match(/#\d\d?/)) this.closeDialog(n, this.fmt(x, h.substr(1)));
      toggle.shown = h == '#open' ? this.win : n;
      e.preventDefault();
      e.stopPropagation();
    }
  };

  this.toggle = function (on, n) {
    if (n) {
      var m = app.attr(n, 'data-modal');
      if (m !== null) m = parseInt(m, 10);else m = this.opt.showModal || Math.min(window.innerWidth, window.innerHeight) < this.opt.sizeLimit;

      if (on) {
        this.win.className = app.opt.cToggle + ' ' + app.opt.cOff + ' pad ' + (m ? 'dlg' : '');
        (m ? document.body : n.thePop).appendChild(this.win);

        if (m) {
          var s = this.win.style;
          s.left = s.right = s.top = s.bottom = '';
        }

        this.win.vRel = n; //m ? n : null;//m ? null : n;//n;
      }
    }

    toggle.toggle(this.win, on); //if(!on) this.win.tabindex = -1;

    if (!on) document.body.appendChild(this.win); //app.fire('after');
  };

  this.preparePick = function (n) {
    n.vTime = n.type == 'datetime-local' || n.classList.contains('datetime');
    n.type = 'text';
    n.autocomplete = 'off';
    if (n.value) n.value = this.fmt(this.parse(n.value), 0, n.vTime);
    var pop = app.ins('div', '', {
      className: 'pop l'
    }, n, -1); //''

    if (!this.opt.inPop) pop.style.verticalAlign = 'bottom';
    n.thePop = pop;

    if (this.opt.addIcons.length > 0) {
      var ic = app.ins('span', '', {
        className: 'input-tools calendar-tools nobr'
      }, n, 1); //icons container

      for (var i in this.opt.addIcons) {
        app.ins('', ' ', {}, ic);
        app.ins('a', app.i.apply(app, this.opt.addIcons[i].slice(0, 2)), {
          href: this.opt.addIcons[i][2],
          className: 'let'
        }, ic);
      }
    }

    if (this.opt.inPop) pop.appendChild(n);
  };

  this.openDialog = function (n, d, e) {
    if (e) e.preventDefault();
    this.build(n, d || n.value);
    this.toggle(true, n); //let f = (app.q('.bg-w', this.win) || app.q('#1', this.win));
    //if(f) f.focus();
  };

  this.closeDialog = function (n, d) {
    if (n) {
      this.setValue(n, d);
      n.focus();
    }

    this.toggle(false);
  };

  this.n = function (v, l) {
    return ('000' + v).substr(-(l || 2));
  };

  this.getLimit = function (n, a, t) {
    var r = app.attr(n, a);
    return r ? this.fmt(this.parse(r), 0, t, 'y') : a == 'max' ? '9999' : '0000';
  };

  this.errLimits = function (n) {
    var min = this.getLimit(n, 'min', n.vTime);
    var max = this.getLimit(n, 'max', n.vTime);
    var v = this.fmt(this.parse(n.value), 0, n.vTime, 'y');
    return min && v < min || max && v > max ? min + ' .. ' + max : '';
  };

  this.validate = function (n, re) {
    n.setCustomValidity(re || n.value == '' ? '' : this.errLimits(n));
    n.checkValidity();
    if (n.reportValidity) n.reportValidity();
  };

  this.update = function (n, x) {
    var rows = this.win.vDays;
    app.clr(rows);
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
      if (wd == 1) row = app.ins('div', '', {
        className: 'row'
      }, rows);
      if (i < 1 || i > days) c = app.ins('a', '', {
        className: 'pad c center'
      }, row);else {
        vv = this.fmt(x, i, 0, 'y');
        sel = i == d;
        today = false; //(this.fmt(x, i) == cd);

        off = min && vv < min || max && vv > max;
        c = app.ins('a', i, {
          className: 'pad c center ' + (sel ? 'bg-w ' : '') + (today ? 'bg-y ' : '') + (off ? 'text-n ' : 'hover ') + (wd > 5 ? 'text-e ' : '')
        }, row);
        if (!off) c.href = '#' + i;
      }
    } //time


    this.win.vNodeTime.classList[n.vTime ? 'remove' : 'add'](app.opt.cHide);
  };

  this.build = function (n, x) {
    if (typeof x === 'string') x = this.parse(x || app.attr(n, 'data-def', ''));
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
  };

  this.switchMonths = function (n, y, m, d) {
    if (d > 28) {
      var days = new Date(y, m + 1, 0).getDate(); //days in month

      d = Math.min(d, days);
    }

    var h = parseInt(this.win.vHours.textContent, 10);
    var i = parseInt(this.win.vMinutes.textContent, 10);
    this.build(n, new Date(y, m, d, h, i));
  };

  this.setTime = function (n, dh, di) {
    var step = dh || di;
    var max = dh ? 24 : 60;
    var m = this.win[dh ? 'vHours' : 'vMinutes'];
    var v = parseInt(m.textContent, 10);
    var x = v % Math.abs(step);
    v += x ? step > 0 ? step - x : -x : max + step;
    m.textContent = this.n(v % max);
    this.setValue(n, this.fmt(this.parse(n.value)));
  };

  this.setValue = function (n, d) {
    if (d !== null) {
      n.value = d === true ? this.fmt(0, 0, n.vTime) : d;
      var h = this.win.vHours;
      var m = this.win.vMinutes;
      if (n.vTime && d !== true && d !== '' && h && m) n.value += ' ' + this.n(h.textContent) + ':' + this.n(m.textContent);
      this.validate(n, 0);
    }
  };

  this.parse = function (d) {
    return date.parse(d) || new Date();
  };

  this.fmt = function (x, i, t, f) {
    if (!x) x = new Date();
    if (i) x = new Date(x.getFullYear(), x.getMonth(), i);
    return date.fmt(x, t, f);
  };

  this.btn = function (h, s, p) {
    return app.ins('a', s, {
      href: h,
      className: this.opt.cBtn
    }, p);
  };
}();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*! code - source code sample */
var app = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'code';
  this.langs = {
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
  this.opt = {
    aLang: 'data-lang',
    defLang: 'html',
    qCode: '.code'
  };

  this.init = function () {
    var _this = this;

    app.e(this.opt.qCode, function (n) {
      return _this.showCode(n);
    });
    app.e('code[class*="language-"]', function (n) {
      return _this.hiliteNode(n);
    });
    app.listen('update', function (e) {
      return _this.updateCode(e);
    });
  };

  this.updateCode = function (e) {
    var n = e.n ? e.n : app.q(e.q);

    if (n) {
      var p = n.closest(this.opt.qCode);
      if (p) this.showCode(p);
    }
  };

  this.showCode = function (src) {
    var lang = app.attr(src, this.opt.aLang, this.opt.defLang);
    var t = this.spaces(src.innerHTML);

    if (!src.vCode) {
      var cont = app.ins('div', '', {
        classList: 'bord'
      }, src, 1);
      cont.appendChild(src);
      src.classList.add('pad');
      var id = 'code-' + app.seq();
      app.ins('div', app.ins('a', (this.langs[lang] ? this.langs[lang].nm : lang) || lang, {
        className: 'pad',
        href: '#' + id
      }), {
        className: '-r bg small'
      }, cont);
      var pre = app.ins('pre', '', {
        className: app.opt.cToggle + ' ' + app.opt.cOff + ' fit pad',
        id: id
      }, cont);
      var cod = app.ins('code', '', {
        className: 'language-' + lang
      }, pre);
      src.vCode = cod;
    } //src.vCode.textContent = t;


    src.vCode.innerHTML = this.hiliteText(t, lang);
  };

  this.spaces = function (s) {
    return s.replace(/^\s*\r?\n|\s+$/g, '').replace(/\t/g, '  '); //.replace(/=""/g, '');
  };

  this.hiliteNode = function (n) {
    n.innerHTML = this.hiliteText(this.spaces(n.textContent), app.a(n.classList).filter(function (c) {
      return c.match(/language-/);
    })[0].substr(9));
  };

  this.hiliteText = function (t, lang) {
    var _this2 = this;

    var l = this.langs[lang];
    var d = app.ins('div');
    d.textContent = t;
    t = d.innerHTML;
    if (l && l.re) l.re.forEach(function (re) {
      return t = t.replace(re[0], function (m) {
        return _this2.token(re[1], m);
      });
    });
    return t;
  };

  this.token = function (c, m) {
    return "<Span Class = 'text-" + c + "'>" + m + "</Span>";
  };
}();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*! edit - wysiwyg text editor */
var app = __webpack_require__(0);

var toggle = __webpack_require__(1);

module.exports = new function () {
  "use strict";

  this.name = 'edit';
  this.opt = {
    qAdjust: 'textarea.adjust',
    qEdit: 'textarea.edit',
    height: 30,
    //em
    tools: '/*@xbi_.#123p|c,s^vdqf~T(=)j+-'
  };
  this.btn = {
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

  this.init = function () {
    var _this = this;

    app.e(this.opt.qEdit, function (n) {
      return _this.prepare(n);
    });
    app.e(this.opt.qAdjust, function (n) {
      return _this.setStyle(n);
    });
    this.adjustAll(); //wysiwyg

    app.h('click', 'label[for]', function (e) {
      return _this.setFocus(e.recv);
    });
    app.h('click', 'a[data-cmd]', function (e) {
      return _this.cmd(e);
    });
    app.h(['input', 'blur'], '.edit-wysiwyg', function (e) {
      return _this.up(0, e.target);
    }); //for validation

    app.listen('value', function (e) {
      return e.n.theWys ? e.modeAuto ? _this.modeAuto(e.n) : _this.up(1, e.n.theWys) : null;
    });
    app.b([window], 'paste', function (e) {
      return _this.onPaste(e);
    }, true); //adjust

    app.h('input', this.opt.qAdjust, function (e) {
      return _this.adjust(e.target);
    });
    app.h('mouseup', this.opt.qAdjust, function (e) {
      return _this.resized(e.target);
    });
    app.b([window], 'resize', function (e) {
      return _this.adjustAll();
    });
  };

  this.setFocus = function (l) {
    var a = app.q('#' + l.htmlFor);
    if (a && a.theWys && app.vis(a.theWys)) a.theWys.focus();
  };

  this.prepare = function (n) {
    if (!n.theWys) {
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
      var t = app.attr(n, 'data-tools', this.opt.tools).split('');
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
  };

  this.modeAuto = function (n) {
    var t = app.attr(n, 'data-tools', this.opt.tools).split('');
    var wys = app.attr(n, 'data-wys');
    if (wys === null) wys = t.indexOf('/') == -1 || n.value.match(/(>|&\w+;)/) && !n.value.match(/<script/i);
    this.mode(wys, n.theWys);
  };

  this.cmd = function (e, bb, nn) {
    // (e) or (z, b)
    var n = e.recv;
    var b = bb || this.btn[n.getAttribute('data-cmd')];
    var z = bb ? e : app.next(n.closest('nav'), '.edit-wysiwyg');
    app.dbg(['cmd', z, b, n, e]);

    if (e && !bb) {
      e.preventDefault();
      e.stopPropagation();
    } //let b = this.btn[n.hash.substr(4)];


    if (b[0] == 'src') this.mode(!app.vis(z), z);else if (b[0] == 'tools') {
      var mm = app.q('div', n.parentNode);
      if (mm) toggle.toggle(mm);
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
  };

  this.up = function (w, z) {
    if (w) z.innerHTML = z.theArea.value;else z.theArea.value = z.innerHTML.replace(/(\shref=")!/ig, ' target="_blank"$1').replace(/(\ssrc="[^"]+#[a-z]*)(\d+%?)"/ig, ' width="$2"$1"'); //.replace(/(\ssrc="[^"]+)#([lrc])"/ig,' class="$2"$1"');

    if (!w) app.dispatch(z.theArea, ['input', 'change']);
  };

  this.mode = function (w, z) {
    toggle.toggle(z, w);
    toggle.toggle(z.theArea, !w);

    if (!w) {
      if (z.style.height) z.theArea.style.height = z.style.height;else this.adjust(z.theArea);
    }

    this.up(w, z);
    app.e(app.qq('a', z.theNav), function (n) {
      return n.hash == '#cmd-src' ? null : toggle.toggle(n, w);
    });
    z.theArea.theManual = 0;
    z.theArea.style.width = '100%';
  };

  this.setStyle = function (n) {
    //n.style.resize = 'vertical'; //both
    n.style.overflow = 'auto';
    n.style.minHeight = '3em';
    n.style.maxHeight = '80vh'; //n.type ? '80vh' : this.opt.height + 'em';

    this.storeSize(n);
  };

  this.storeSize = function (n) {
    n.theH = n.clientHeight;
    n.theW = n.clientWidth;
  };

  this.resized = function (n) {
    if (n.theH !== n.clientHeight || n.theW !== n.clientWidth) n.theManual = 1;
  };

  this.adjustAll = function () {
    var _this2 = this;

    app.e(this.opt.qAdjust, function (n) {
      return _this2.adjust(n);
    });
  };

  this.adjust = function (n) {
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
  }; // https://stackoverflow.com/questions/6333814/how-does-the-paste-image-from-clipboard-functionality-work-in-gmail-and-google-c


  this.onPaste = function (e) {
    var _this3 = this;

    var n = e.target.closest('.edit-wysiwyg');
    if (!n) return; //app.a(e.clipboardData.items).forEach(i => console.log(i)); // kind: 'file', type: 'image/...'

    var img = app.a(e.clipboardData.items).filter(function (i) {
      return i.type.indexOf('image') === 0;
    }).shift();

    if (img) {
      e.preventDefault();
      var reader = new FileReader();

      reader.onload = function (e) {
        return _this3.cmd(n, ['insertimage', e.target.result]);
      };

      reader.readAsDataURL(img.getAsFile()); //get blob as data url
      // to upload, use readAsBinaryString, or put it into an XHR using FormData
    }
  };
}();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*! example - plugin template */
var app = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'example';
  this.opt = {};

  this.init = function () {} //app.h('click', 'a.example', e => this.onClick(e));

  /*
  this.onClick = function(e){
    let n = e.target; //e.recv
  }
  */
  //app.plug(this);
  ;
}();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/*! filter - filter items */
var app = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'filter';
  this.opt = {
    qFilter: '.filters',
    qItem: '.item',
    aFilter: 'data-filter',
    cMem: 'mem'
  };

  this.init = function () {
    var _this = this;

    app.e(this.opt.qFilter, function (n) {
      return _this.prepare(n);
    });
    app.h('click', 'a[' + this.opt.aFilter + ']', function (e) {
      return _this.applyControl(e.recv);
    });
    app.h('input', ':not(a)[' + this.opt.aFilter + ']', function (e) {
      return _this.applyControl(e.recv);
    });
  };

  this.prepare = function (n) {
    n.vInit = {};
    this.forAttrs(n, function (a, k) {
      return n.vInit[k] = a.value;
    });
    this.restore(n);
    this.apply(n);
  };

  this.applyControl = function (n) {
    var f = n.closest(this.opt.qFilter);
    var x = app.attr(n, this.opt.aFilter, '').split(/=/, 2);

    if (f) {
      if (x[0]) {
        var a = this.opt.aFilter + '-' + x[0];
        var v = (n.tagName == 'SELECT' ? n.value : x[1]) || '';

        if (v.substr(0, 1) == '+' && v.length > 1) {
          v = v.substr(1);
          var w = app.attr(f, a, '').split(/;/);
          var i = w.indexOf(v);
          if (i == -1) w.push(v);else delete w[i];
          v = w.filter(function (val, key, arr) {
            return val !== '' && arr.indexOf(val) === key;
          }).join(';');
        }

        f.setAttribute(a, v);
        this.apply(f);
      } else {
        this.reset(f);
      }
    }
  };

  this.apply = function (n) {
    var _this2 = this;

    var f = {};
    var z = this.opt.aFilter.length;
    this.forAttrs(n, function (a, k) {
      return a.value.length > 0 ? f[k] = a.value.split(/;/) : null;
    });
    app.dbg(['filter', n, f]);
    app.e(app.qq(this.opt.qItem, n), function (m) {
      return m.classList[_this2.match(m, f) ? 'remove' : 'add'](app.opt.cHide);
    });
    app.e(app.qq('[' + this.opt.aFilter + ']', n), function (m) {
      return _this2.setUsed(m, f);
    });
    this.store(n, f);
    app.fire('update', {
      n: n
    });
  };

  this.match = function (n, f) {
    var r = true;
    Object.keys(f).forEach(function (k) {
      return f[k] && f[k].length > 0 && f[k].indexOf(app.attr(n, 'data-' + k, '')) == -1 ? r = false : null;
    });
    return r;
  };

  this.setUsed = function (n, f) {
    var u = this.used(n, f);
    if (n.tagName == 'A') n.classList[u ? 'add' : 'remove'](app.opt.cAct);else if (n.type == 'checkbox') n.checked = u;else if (n.type == 'radio') n.checked = u;else if (n.tagName == 'SELECT') n.value = (f[app.attr(n, this.opt.aFilter, '')] || [''])[0];
  };

  this.used = function (n, f) {
    var x = app.attr(n, this.opt.aFilter, '').split(/=\+?/, 2);
    return x[0] && !f[x[0]] && !x[1] || f[x[0]] && f[x[0]].length > 0 && f[x[0]].indexOf(x[1]) != -1; //return ((f[x[0]] || '') == (x[1] || ''));
  };

  this.store = function (n, f) {
    if (n.id && n.classList.contains(this.opt.cMem)) localStorage.setItem('filter-' + n.id, JSON.stringify(f));
  };

  this.restore = function (n) {
    var _this3 = this;

    if (n.id && n.classList.contains(this.opt.cMem)) {
      var f = localStorage.getItem('filter-' + n.id);

      if (f) {
        //create attributes if not exist
        app.e(app.qq('[' + this.opt.aFilter + ']', n), function (m) {
          var x = app.attr(m, _this3.opt.aFilter, '').split(/=/);

          if (x[0]) {
            x = _this3.opt.aFilter + '-' + x[0];
            if (!n.hasAttribute(x)) n.setAttribute(x, '');
          }
        }); //parse

        try {
          f = JSON.parse(f);
          this.forAttrs(n, function (a, k) {
            return n.setAttribute(a.name, (f[k] || []).join(';'));
          });
        } catch (e) {
          console.error('Failed JSON parse filter-' + n.id);
        }
      }
    }
  };

  this.reset = function (n) {
    //this.forAttrs(n, a => n.removeAttribute(a.name))
    this.forAttrs(n, function (a, k) {
      return k in n.vInit ? n.setAttribute(a.name, n.vInit[k] || '') : n.removeAttribute(a.name);
    });
    this.apply(n);
  };

  this.forAttrs = function (n, f) {
    var _this4 = this;

    var z = this.opt.aFilter.length;
    app.a(n.attributes).forEach(function (a) {
      return a.name.substr(0, z) == _this4.opt.aFilter ? f(a, a.name.substr(z + 1)) : null;
    });
  };
}();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/*! fliptable - responsive table */
var app = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'fliptable';
  this.opt = {
    qFlipTable: 'table.flip'
  };

  this.init = function () {
    var _this = this;

    app.e(this.opt.qFlipTable, function (n) {
      return n.closest('form') ? null : _this.prepareFlipTable(n);
    });
  };

  this.prepareFlipTable = function (t) {
    var ths = app.qq('thead th', t);
    var tds = app.qq('tbody tr>*, tfoot tr>*', t);
    var order = app.attr(t, 'data-order', '0 1 2 3').split(/\D+/); //t.parentNode.classList.remove('roll');

    for (var i = 0; i < tds.length; i++) {
      var td = tds[i];
      var th = ths[td.cellIndex];
      var ord = order.indexOf('' + td.cellIndex);
      if (ord == -1) ord = 99;
      td.style.order = ord; //if(td.textContent.replace(/\s+$/, '').length>0){

      var c = app.ins('div', '', {
        className: 'row'
      });
      if (th) app.ins('div', th.textContent, {
        className: 'hide-desktop'
      }, c);
      var v = app.ins('div', '', {}, c);

      while (td.firstChild) {
        v.appendChild(td.firstChild);
      }

      td.textContent = '';
      td.appendChild(c); //}
    }

    app.e(app.qq('thead', t), function (n) {
      return n.classList.add('hide-mobile');
    });
  };
}();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/*! form - utilities for form inputs */
var app = __webpack_require__(0);

var toggle = __webpack_require__(1);

module.exports = new function () {
  "use strict";

  this.name = 'form';
  this.opt = {};

  this.init = function () {
    var _this = this;

    app.e('input[type="color"]', function (n) {
      return _this.prepareColor(n);
    });
    app.h('click', 'a[href^="#"][data-value]', function (e) {
      e.preventDefault();

      _this.setValue(e.recv);
    });
    app.h('click', 'input[data-group]', function (e) {
      return _this.checkBoxes(e.target);
    });
  };

  this.checkBoxes = function (n) {
    app.e(app.qq('input[type="checkbox"][class~="' + app.attr(n, 'data-group', '') + '"]', n.form), function (m) {
      return m.checked = n.checked;
    });
  };

  this.setValue = function (n) {
    var d = app.q(n.hash);

    if (d) {
      d.value = app.attr(n, 'data-value', '');
      toggle.unpop(d, true); //toggle.modalStyle(); //generally not needed
    }
  };

  this.prepareColor = function (n) {
    var m = app.ins('input', '', {
      type: 'text',
      value: n.value,
      size: 7,
      className: 'color'
    }, n, -1);
    app.ins('', ' ', {}, m, 1);
    app.b([n, m], 'input', function (e) {
      return (e.target == n ? m : n).value = e.target.value;
    });
  };
}();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/*! icons - include svg icons */
var app = __webpack_require__(0);

var iconset = __webpack_require__(7);

module.exports = new function () {
  "use strict";

  this.name = 'icons';
  this.opt = {
    cIcon: 'icon',
    iconSize: 24,
    pSvg: 'icon-',
    // id prefix to search on page; set false to skip search
    //aReplace: 'data-ico',
    //aAdd: 'data-icon',
    qIcon: '[data-ico], [data-icon], [class*="ico-"], [class*="icon-"]',
    qIconReplace: '[data-ico], [class*="ico-"]'
  };
  this.parsed = {};
  this.icons = iconset;

  this.init = function () {
    var _this = this;

    //app.e('[' + this.opt.aReplace + ']',  n => this.addIcon(app.attr(n, this.opt.aReplace, ''), n, true));
    //app.e('[' + this.opt.aAdd + ']', n => this.addIcon(app.attr(n, this.opt.aAdd, ''), n));
    app.e(this.opt.qIcon, function (n) {
      return _this.iconize(n);
    });
  };

  this.iconize = function (n) {
    var m,
        i = app.attr(n, 'data-ico') || app.attr(n, 'data-icon');

    if (!i) {
      m = n.className.match(/\bicon?-([\w\-_]+)/);
      if (m) i = m[1];
    }

    if (i) {
      var clr = n.matches(this.opt.qIconReplace);
      this.addIcon(i, n, clr);
      if (m) n.classList.remove(m[0]);
    }
  };

  this.addIcon = function (i, n, clr) {
    var t = n.textContent;
    var icon = this.i(i);

    if (icon) {
      if (clr) {
        app.clr(n);
        if (!n.title) n.title = t;
      } //if(n.firstChild) n.insertBefore(document.createTextNode(' '), n.firstChild);


      if (n.firstChild && !n.firstChild.tagName) app.ins('span', n.firstChild, {}, n, false);
      n.insertBefore(icon, n.firstChild);
    }
  };

  this.i = function (ico, alt) {
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
        if (!app.attr(n, 'width')) n.setAttribute('width', this.opt.iconSize);
        if (!app.attr(n, 'height')) n.setAttribute('height', this.opt.iconSize);
        if (!app.attr(n, 'class')) n.setAttribute('class', this.opt.cIcon);
      } else n = '';

      this.parsed[ico] = n;
    }

    return this.parsed[ico] ? this.prepareSvg(this.parsed[ico].cloneNode(true), a.slice(1)) : alt ? app.ins('span', alt) : null;
  };

  this.prepareSvg = function (n, a) {
    if (a[0]) n.setAttribute('width', a[0]);
    if (a[1]) n.setAttribute('height', a[1]);
    if (a.length > 0) n.setAttribute('class', a.slice(2).join(' ') || '');
    return n;
  };
}();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/*! items - copy, hide, delete items */
var app = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'items';
  this.opt = {
    aItem: 'data-item',
    qItem: '.item' // ul, tr, div

  };

  this.init = function () {
    var _this = this;

    app.h('click', 'a[href^="#"]', function (e) {
      return _this.onClick(e);
    });
  };

  this.onClick = function (e) {
    var n = e.recv;

    if (n && n.hash) {
      var q = app.attr(n, this.opt.aItem);
      var d = q ? app.q(q) : e.target.closest(this.opt.qItem);

      if (d) {
        var cont = d.parentNode;

        if (this.process(d, n.hash.substr(1), !!q)) {
          app.fire('update', {
            n: cont
          });
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }
  };

  this.items = function (n) {
    var _this2 = this;

    //return app.qq(this.opt.qItem, n).filter(n => !n.classList.contains(app.opt.cHide));
    return app.a(n.children).filter(function (n) {
      return n.matches(_this2.opt.qItem);
    }).filter(function (n) {
      return !n.classList.contains(app.opt.cHide);
    });
  };

  this.process = function (n, x, before) {
    var _this3 = this;

    if (['copy', 'del', 'delete', 'delall', 'clear', 'hide'].indexOf(x) == -1) return false;
    app.fire('beforeitem', {
      n: n,
      a: x
    });
    var e = {
      n: n,
      a: x
    };

    if (x == 'copy') {
      if (before === undefined) before = n.classList.contains(app.opt.cHide);
      var m = n.parentNode.insertBefore(n.cloneNode(true), before ? n : n.nextSibling);
      m.classList.remove(app.opt.cHide);
      m.removeAttribute('id');
      app.e(app.qq('[id]', m), function (i) {
        return _this3.fixId(i, m);
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
      app.clr(n);
    } else if (x == 'hide') {
      n.classList.add(app.opt.cHide);
    }

    app.fire('afteritem', e);
    return true;
  };

  this.fixId = function (i, m) {
    var old = i.id;
    var id = i.id.replace(/-\d+$/, '') + '-' + app.seq();
    i.id = id;
    app.e(app.qq('a[href="#' + old + '"]', m), function (a) {
      return a.href = '#' + id;
    });
  };
}();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/*! keepform - store and restore user input */
var app = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'keepform';
  this.opt = {
    qStore: 'form.store[id]',
    qRestore: 'form.restore[id]'
  };

  this.init = function () {
    var _this = this;

    if (Object.fromEntries && FormData) {
      var q = this.opt.qStore;
      app.e(q, function (f) {
        return _this.addControls(f);
      });
      app.e(this.opt.qRestore, function (f) {
        return _this.restoreForm(f, true);
      });
      app.h(['change', 'input'], q, function (e) {
        return _this.store(e);
      });
      app.h('click', q + ' a[href="#restore"]', function (e) {
        return _this.restore(e);
      });
      app.h('click', q + ' a[href="#reset"]', function (e) {
        return _this.reset(e);
      });
      app.h('click', q + ' a[href="#unstore"]', function (e) {
        return _this.unstore(e);
      });
    }
  };

  this.addControls = function (f) {
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
  };

  this.reset = function (e) {
    e.preventDefault();
    var f = e.target.closest('form');
    f.reset();
    app.e(app.qq('[name]', f), function (n) {
      return app.fire('value', {
        n: n
      });
    });
  };

  this.unstore = function (e) {
    e.preventDefault();
    localStorage.removeItem(this.formId(e.target.closest('form')));
  };

  this.restore = function (e) {
    e.preventDefault();
    this.restoreForm(e.target.closest('form'));
  };

  this.restoreForm = function (f, mode) {
    var _this2 = this;

    var id = this.formId(f);
    var d = localStorage.getItem(id);

    if (d) {
      d = JSON.parse(d);
      if (d) Object.keys(d).forEach(function (k) {
        var i = f.elements[k];
        if (i) _this2.restoreInput(i, d[k], mode);
      });
    }
  };

  this.restoreInput = function (i, v, mode) {
    var _this3 = this;

    if (i instanceof NodeList) i.forEach(function (j) {
      return _this3.restoreInput(j, v, mode);
    });else {
      if (i.type.match(/file|submit|password/)) ;else if (i.type.match(/checkbox|radio/)) i.checked = Array.isArray(v) ? v.indexOf(i.value) != -1 : i.value === v;else i.value = v;
      app.fire('value', {
        n: i,
        modeAuto: mode
      });
    }
  };

  this.store = function (e) {
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
  };

  this.formId = function (f) {
    return 'form#' + f.id + '@' + location.pathname;
  };
}();

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/*! lookup - autocomplete lookups with data from XHTTP request */
var app = __webpack_require__(0);

var toggle = __webpack_require__(1);

var fetch = __webpack_require__(6);

module.exports = new function () {
  "use strict";

  this.name = 'lookup';
  this.opt = {
    aLabel: 'data-label',
    aLookup: 'data-lookup',
    aCap: 'data-cap',
    aList: 'data-list',
    aUrl: 'data-url',
    aGoto: 'data-goto',
    cacheLimit: 0,
    pList: 'lookup-list-',
    max: 10,
    wait: 300,
    inPop: 0
  };
  this.win = null;

  this.init = function () {
    var _this = this;

    this.win = app.ins('div', '', {
      id: this.opt.pList + app.seq(),
      className: app.opt.cToggle + ' ' + app.opt.cOff
    });
    this.closeList();
    document.body.appendChild(this.win);
    app.e('input[' + this.opt.aLookup + ']', function (n) {
      return _this.prepare(n);
    });
    app.e('[data-chain]', function (n) {
      return _this.updateChain(n);
    });
    app.h('input', '.lookup-input', function (e) {
      return app.delay(function (i) {
        return _this.find(i);
      }, _this.opt.wait, true)(e);
    });
    app.h('keydown', '.lookup-input', function (e) {
      return _this.key(e);
    });
    app.h('click', '.lookup-item', function (e) {
      return _this.choose(e);
    });
    app.h('click', '.lookup-goto', function (e) {
      return _this.go(e);
    });
    app.h('change', '[data-chain]', function (e) {
      return _this.updateChain(e.target);
    });
  };

  this.prepare = function (n) {
    if (this.cap(n)) return;
    var cap = app.attr(n, this.opt.aLabel);
    n.vLabel = cap || n.value || '';
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

    if (app.attr(n, this.opt.aUrl)) {
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
  };

  this.initCaption = function (n) {
    var _this2 = this;

    var cap = app.attr(n, this.opt.aLabel);
    var uc = app.attr(n, this.opt.aCap, '');

    if (n.value && !cap && uc) {
      var u = encodeURI(decodeURI(app.makeUrl(uc, {
        time: new Date().getTime()
      })).replace(/\{q\}/, n.value));
      fetch.fetch(u, function (req) {
        var d = JSON.parse(req.responseText);

        _this2.fix(n, n.value, d.data);
      });
    }
  };

  this.ident = function (n, mode) {
    if (mode != 't' && (mode == 'i' || this.opt.inPop)) n = n.closest('.lookup-pop');
    return app.next(n, '.lookup-id', true);
  };

  this.cap = function (n) {
    return this.opt.inPop ? app.q('.lookup-input', this.pop(n)) : app.next(n, '.lookup-input');
  };

  this.pop = function (n) {
    return app.next(n, '.lookup-pop');
  };

  this.find = function (e) {
    var c = e.target;
    var n = this.ident(c);
    if (!n) return;
    var v = c.value;
    if (v === '') this.fix(n, '', ''); //empty
    else if (n.vCache && n.vCache[v]) this.openList(n, n.vCache[v]); //cached
      else {
          var u = encodeURI(decodeURI(app.makeUrl(app.attr(n, this.opt.aLookup, ''), {
            //value: v,
            time: new Date().getTime()
          })).replace(/\{q\}/, v));
          n.vCur = null;
          fetch.fetch(u, this.list.bind(this, v, n));
        }
  };

  this.list = function (u, n, req) {
    var d = JSON.parse(req.responseText);
    if (u === this.cap(n).value) this.openList(n, d.data);
    this.store(n, u, d);
  };

  this.openList = function (n, d, e) {
    if (e) e.stopPropagation();
    this.closeList();
    var pop = this.pop(n);
    pop.appendChild(this.win); //this.win.vRel = n.vCap;

    toggle.toggle(this.win, true);
    this.build(n, d); //toggle.shown = null;
  };

  this.closeList = function () {
    toggle.toggle(this.win, false);
  };

  this.build = function (n, d) {
    app.clr(this.win);
    var ul = app.ins('ul', '', {
      className: 'nav let hover'
    }, this.win);
    var w,
        j = 0;
    var go = app.attr(n, this.opt.aGoto, '');

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
  };

  this.hilite = function (n, a) {
    if (n.vCur) n.vCur.classList.remove(app.opt.cAct);
    a.classList.add(app.opt.cAct);
    n.vCur = a;
  };

  this.hiliteNext = function (n, prev) {
    if (n.vCur) {
      var a = n.vCur.parentNode[prev ? 'previousSibling' : 'nextSibling'];
      if (!a) a = n.vCur.parentNode.parentNode[prev ? 'lastChild' : 'firstChild'];
      a = a.firstChild;
      this.hilite(n, a);
    }
  };

  this.choose = function (e) {
    if (e) e.preventDefault();
    var a = e.recv;
    var n = this.ident(a, 'i');
    n.vCur = a;
    this.fix(n, a.hash.substr(1), a.firstChild.textContent);
  };

  this.fix = function (n, v, c) {
    n.vCur = null;
    if (n.vWait) clearTimeout(n.vWait);
    n.value = v;
    n.vLabel = this.cap(n).value = c;
    app.dispatch(n, ['input', 'change']);
    this.closeList();
  };

  this.key = function (e) {
    var n = e.target ? this.ident(e.target) : null;
    ;

    if (n) {
      if (e.keyCode == 27) this.fix(n, n.value, n.vLabel);else if (e.keyCode == 40 && !app.vis(this.win)) this.find(e);else if (e.keyCode == 38 || e.keyCode == 40) this.hiliteNext(n, e.keyCode == 38);else if (e.keyCode == 13 && n.vCur) {
        if (app.vis(this.win)) e.preventDefault();
        n.vCur.click();
      }
    }
  };

  this.go = function (e) {
    var n = e.recv ? this.ident(e.recv.parentNode, 't') : null;

    if (n) {
      e.preventDefault();
      var u = app.attr(n, this.opt.aUrl, '');
      if (n.value.length > 0 && u) location.href = encodeURI(decodeURI(u).replace(/\{id\}/, n.value));
    }
  }; // update chain


  this.updateChain = function (n) {
    var m = app.q(app.attr(n, 'data-chain', ''), 0);

    if (m) {
      if (!n.value) this.setOptions(m, []);else {
        var u = app.attr(m, this.opt.aList, '').replace(/\{q\}/, n.value);
        if (m.vCache && m.vCache[u]) this.setOptions(m, m.vCache[u]);else fetch.fetch(u, this.onChainData.bind(this, u, m));
      }
    }
  };

  this.onChainData = function (u, n, req) {
    var d = JSON.parse(req.responseText);
    this.setOptions(n, d.data);
    this.store(n, u, d);
  };

  this.setOptions = function (n, a) {
    if (n.list) {
      if (n.list) {
        app.clr(n.list);
        n.value = '';
        if (a) a.forEach(function (v) {
          return app.ins('option', '', {
            value: v.nm
          }, n.list);
        });
      }
    } else {
      app.clr(n);
      var z = app.attr(n, 'data-placeholder', '');
      if (!a || a.length == 0 || z) app.ins('option', z || '-', {
        value: ''
      }, n);
      if (a) a.forEach(function (v) {
        return app.ins('option', v.nm, {
          value: v.id
        }, n);
      });
    }
  };

  this.store = function (n, u, d) {
    var c = app.attr(n, 'data-cache');
    if (c === null) c = this.opt.cacheLimit;
    c = parseInt(c, 10);

    if (c) {
      if (!n.vCache || Object.keys(n.vCache).length >= c) n.vCache = {};
      if (d) n.vCache[u] = d.data;
    }
  };
}();

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/*! scroll - scrolling behaviours (topbar, drawer) */
var app = __webpack_require__(0);

var toggle = __webpack_require__(1);

module.exports = new function () {
  "use strict";

  this.name = 'scroll';
  this.y = null; //this.hashed = false;

  this.opt = {
    //gap: 20,
    qHideOnScroll: '',
    // '.drawer[id]'
    cStart: 'shade',
    qTopbar: '.topbar.toggle',
    //.topbar.let
    qEnable: '.topbar' // '.topbar, .drawer'
    //qTopbarFixed: '.topbar:not(.let)'

  };

  this.init = function () {
    var _this = this;

    var t;

    if (app.q(this.opt.qEnable)) {
      app.listen('hashchange', function (e) {
        return _this.onHash(e);
      });
      var ons = app.throttle(function () {
        return _this.onScroll();
      }, 500); //let ons = app.throttle((h) => this.onScroll(h), 500);
      //ons(); // forces reflow

      setTimeout(function () {
        return _this.onScroll();
      }, 20);
      app.b([window], 'scroll', function (e) {
        return ons();
      });
    }
    /*
    else if(t = app.q(this.opt.qTopbarFixed)){
      app.listen('hashchange', e => this.fixScroll());
    }
    */

  };

  this.onHash = function (e) {
    //to hide topbar on hash change
    // fires before onscroll, but page is already scrolled
    app.dbg(['scroll hash', location.hash, e, document.body.scrollHeight]);

    if (e && location.hash && app.q(location.hash)) {
      this.y = document.body.scrollHeight + 10; // show topbar on hash
      //this.y = window.scrollY - 10; // show/hide topbar on hash up/down
      //this.y = 1; // hide topbar on hash
      //this.hashed = true;

      this.onScroll();
    }
  };

  this.onScroll = function ()
  /*h*/
  {
    var _this2 = this;

    //let mode = this.hashed ? 'hash' : (h ? 'fix' : 'scroll');
    var dy = window.scrollY === null ? null : window.scrollY - this.y;
    app.dbg(['scroll', window.scrollY, dy]); // ,mode,h,this.hashed

    if (this.y !== null
    /* && !h*/
    ) {
        if (this.opt.qTopbar) app.e(this.opt.qTopbar, function (n) {
          return _this2.decorate(n, window.scrollY, dy);
        });
        if (this.opt.qHideOnScroll) app.e(this.opt.qHideOnScroll, function (n) {
          return toggle.toggle(n, false);
        });
      }

    this.y = window.scrollY; // forces reflow
    //if(this.hashed) this.fixScroll();
    //this.hashed = false;
  };

  this.decorate = function (n, y, dy) {
    n.classList[dy > 0 && y > n.offsetHeight ? 'add' : 'remove'](app.opt.cOff);
    n.classList[y && dy <= 0 ? 'add' : 'remove'](this.opt.cStart);
  };
  /*
  this.fixScroll = function(){
    app.dbg(['scroll-fix', location.hash]);
    if(app.q(location.hash)){
      //let t = app.q(this.opt.qTopbar + ':not(.'+ app.opt.cOff +')');
      let t = app.q(this.opt.qTopbarFixed);
      window.scrollBy(0, (t ? -t.offsetHeight : 0) - this.opt.gap);
    }
    //this.hashed = false;
    //setTimeout(() => this.hashed = false, 500);
  }
  */

}();

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/*! swipe - detect touch swipe */
var app = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  var _this2 = this;

  this.name = 'swipe';
  this.moved = null;
  this.c = {};
  this.opt = {
    qSwipe: '.swipe',
    qDrag: '.drag',
    qKeepDrag: '.drawer',
    //', .gal a[id]',
    cDragging: 'dragging',
    maxClick: 20,
    minSwipe: 50
  };

  this.init = function () {
    var _this = this;

    //console.log('swipe init');

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
    app.b([document], ['mousedown', 'touchstart'], function (e) {
      return _this.onStart(e);
    });
    app.b([document], ['mousemove', 'touchmove'], function (e) {
      return _this.onMove(e);
    });
    app.b([document], ['click', 'mouseleave', 'touchend', 'touchcancel'
    /*, 'mouseleave'/*, 'blur', 'keydown', 'contextmenu'*/
    ], function (e) {
      return _this.onEnd(e);
    }, true);
  };

  this.onStart = function (e) {
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
  };

  this.onMove = function (e) {
    if (this.moved) {
      e.preventDefault();
      this.drag_(e);
    }
  };

  this.drag = function (e) {
    //console.log('swipe drag');
    var t = e.touches ? e.touches[0] : e;
    this.c.eX = t.screenX;
    this.c.eY = t.screenY;

    if (this.moved && this.moved.matches(this.opt.qDrag)) {
      var xy = this.shift();
      this.moved.style.transform = 'translate(' + xy[0] + 'px, ' + xy[1] + 'px)';
      this.moved.classList.add(this.opt.cDragging); //this.moved.style.zIndex = 100;
    }
  };

  this.drag_ = app.throttle(function (e) {
    return _this2.drag(e);
  }, 30);

  this.onEnd = function (e) {
    //console.log('swipe end', this.moved, e.which, e.button, e);
    if (this.moved) {
      var undo = e.type == 'mouseleave' || e.type == 'touchcancel';
      if (undo || !this.moved.matches(this.opt.qKeepDrag)) this.undrag();

      if (!undo) {
        var xy = this.shift(); //after touch event: handle mouse events only on A nodes without swipe
        //if(e.type.indexOf('touch')!=-1 && (dir || trg.tagName!='A')) e.preventDefault();

        if (xy[2]) {
          app.fire('swipe', {
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
  };

  this.shift = function () {
    var dirs = app.attr(this.moved, 'data-swipe', '1234');
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
  };

  this.undrag = function (n) {
    if (!n) n = this.moved;
    n.style.transform = '';
  };
}();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*! tablex - filter and sort HTML table */
// table.sort.totals.filter[data-filter][data-filter-report][data-case][data-filter-cols]
var app = __webpack_require__(0);

var date = __webpack_require__(4);

module.exports = new function () {
  "use strict";

  this.name = 'tablex';
  this.lang = '';
  this.skipComma = 0;
  this.intervalUnits = {
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
  this.szUnits = {
    b: 1,
    kb: 1024,
    mb: 1048576,
    gb: 1073741824,
    tb: 1099511627776,
    pb: 1125899906842624
  };
  this.opt = {
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

  this.init = function () {
    var _this = this;

    this.lang = app.attr(document.documentElement, 'lang') || 'en';
    this.skipComma = this.lang == 'en';
    var q = 'table.' + this.opt.cSort + ', table.' + this.opt.cFilter + ', table.' + this.opt.cTotals + ', table[' + this.opt.aFilter + ']' + ', table[' + this.opt.aLimit + ']';
    app.e(q, this.prepare.bind(this));
    app.h('click', '.tablex-pagenav a', function (e) {
      return _this.page(e);
    });
  };

  this.page = function (e) {
    e.preventDefault();
    var nav = e.recv.closest('.tablex-pagenav');
    this.paginate(nav.vTable, 1 * e.recv.hash.substr(1));
  };

  this.prepare = function (n) {
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
    } //let inp = app.ins('input','',{type:'search',size:4},rh.cells[0]);


    n.vCase = n.getAttribute('data-case') !== null;
    var fq = app.attr(n, this.opt.aFilter);
    n.vInp = fq ? document.querySelector(fq) : n.querySelector('[name="_q"]');
    n.vRep = app.q(app.attr(n, this.opt.aRep, ''));
    n.vLimit = 1 * app.attr(n, this.opt.aLimit, 0);
    n.vPage = 1;
    if (!n.vInp && !n.vRep && n.classList.contains(this.opt.cFilter)) this.addFilter(n);
    if (n.vLimit && tb.rows.length > n.vLimit) this.addPageNav(n);

    if (n.vInp) {
      //n.vInp.onsearch = n.vInp.onkeyup = this.doFilter.bind(this,n);
      //1.
      //if(!n.vInp.vListen) n.vInp.addEventListener('input', this.doFilter.bind(this, n), false);
      //2.
      var f = app.delay(this.doFilter, this.opt.wait, true);
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
        if (app.isDebug()) c[j].title = type + ': ' + vals[j][0]; //c[j].setAttribute('data-cell', row[j]);
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
  };

  this.paginate = function (n, page) {
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
          n.vData[i].n.classList[on ? 'remove' : 'add'](app.opt.cHide, this.opt.cUnpage);
          j++;
        }
      }
    }
  };

  this.addFilter = function (n) {
    var t = n.parentNode.classList.contains('roll') ? n.parentNode : n;
    var p = app.ins('p', ' ', {}, t, -1);
    n.vInp = app.ins('input', '', {
      type: 'search'
    }, p, false);
    n.vRep = app.ins('span', '', {}, p);
  };

  this.addPageNav = function (n) {
    var t = n.parentNode.classList.contains('roll') ? n.parentNode : n;
    n.vPageNav = app.ins('ul', '', {
      className: 'nav hover tablex-pagenav'
    });
    n.vPageNav.vTable = n;
    app.ins('div', n.vPageNav, {
      className: 'mar small'
    }, t, app.attr(n, this.opt.aPageNavAfter) === null ? -1 : 1);
  };

  this.setPageNav = function (n) {
    var m = 1 * app.attr(n, this.opt.aPages, 10);
    var h = Math.ceil((m - 1) / 2);
    var ul = n.vPageNav;
    var last = Math.ceil(n.vCount / n.vLimit);
    var min = Math.max(1, Math.min(n.vPage - h, last - m + 1));
    var max = Math.min(last, min + m - 1);
    var cur = Math.max(Math.min(n.vPage, last), 1);
    app.clr(ul); //console.log('pagenav', m, min, max, last, min + m - 1);

    if (max > 1) {
      if (last > m) app.ins('li', app.ins('a', app.i('first', '&laquo;'), {
        href: '#1'
      }), {}, ul);
      app.ins('li', app.ins('a', app.i('left', '&lsaquo;'), {
        href: '#' + Math.max(1, cur - 1)
      }), {}, ul);

      for (var i = min; i <= max; i++) {
        var a = app.ins('a', i, {
          href: '#' + i,
          className: i == cur ? 'act bg' : ''
        });
        app.ins('li', a, {}, ul);
      }

      app.ins('li', app.ins('a', app.i('right', '&rsaquo;'), {
        href: '#' + Math.min(cur + 1, last)
      }), {}, ul);
      if (last > m) app.ins('li', app.ins('a', app.i('last', '&raquo;'), {
        href: '#' + last
      }), {}, ul);
    }
  };

  this.addFooter = function (n, rh) {
    var _this2 = this;

    var f = app.ins('tfoot', app.ins('tr'), {
      className: 'nobr'
    }, n);
    app.a(rh.cells).forEach(function (h) {
      var _app$ins;

      var t = n.vTypes[h.cellIndex];
      var func = t == 's' ? 'count' : t == 'd' ? 'max' : 'sum';
      app.ins('th', app.ins(t == 's' ? 'i' : 'span', '', (_app$ins = {}, _defineProperty(_app$ins, _this2.opt.aTotal, func), _defineProperty(_app$ins, "className", t == 's' ? 'text-n' : ''), _app$ins)), {
        title: func
      }, f.firstChild);
    });
  };

  this.doFilter = function (t, e) {
    if (t.vPrev !== t.vInp.value || !e) {
      t.vPrev = t.vInp.value;
      if (this.opt.cFiltered) t.vInp.classList[t.vPrev.length > 0 ? 'add' : 'remove'](this.opt.cFiltered); //1.
      //clearTimeout(t.vTimeout);
      //t.vTimeout = setTimeout(this.filter.bind(this, t, t.vInp.value), this.opt.wait);
      //2.

      this.filter(t, t.vInp.value);
    }
  };

  this.doSort = function (t, th, e) {
    if (e.target.closest ? !e.target.closest('a,input,select,label') : ' A INPUT SELECT LABEL '.indexOf(' ' + e.target.tagName + ' ') == -1) {
      //e.preventDefault();
      this.sort(t, th.cellIndex);
    }
  };

  this.isSortable = function (th) {
    //return this.val(th).length > 0;
    return !th.hasAttribute('data-unsort');
  };

  this.val = function (s, cs) {
    var r = s.tagName ? s.innerHTML : '' + s;
    r = r.replace(/<!--.*?-->/g, '').replace(/<.*?>/g, '').replace(/&nbsp;/gi, ' ').replace(/^\s+/, '').replace(/\s+$/, '');
    if (!cs) r = r.toLowerCase();
    return r;
  };

  this.filter = function (n, q) {
    var cnt = 0;
    var i, j, data, s, hide;

    if (!n.vCols) {
      n.vCols = app.attr(n, 'data-filter-cols', '');
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

      if (app.opt.cHide) n.vData[i].n.classList[hide ? 'add' : 'remove'](app.opt.cHide, this.opt.cUnmatch);else n.vData[i].n.style.display = hide ? 'none' : '';
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
  };

  this.updateTotals = function (n, cnt) {
    var _this3 = this;

    app.e(app.qq('[' + this.opt.aTotal + ']', n), function (m) {
      return m.textContent = _this3.countTotal(n, m, cnt);
    });
  };

  this.countTotal = function (n, m, cnt) {
    var _this4 = this;

    var d = n.vData;
    var j = m.closest('th, td').cellIndex;
    var a = app.attr(m, 'data-total', '');
    var dec = parseInt(app.attr(m, 'data-dec', 2), 10);
    var mode = app.attr(m, 'data-mode',
    /*'n'*/
    n.vTypes[j]);
    var r = 0; //if(a == 'count' || a == 'cnt') r = cnt;

    if (a == 'count' || a == 'cnt') r = d.reduce(function (acc, cur) {
      return acc + (cur.v && cur.x[j][0] !== '' ? 1 : 0);
    }, 0);else if (!cnt || mode == 'x') r = NaN;else if (a == 'sum' || a == 'avg') {
      r = mode == 's' ? NaN : d.reduce(function (acc, cur) {
        return acc + (cur.v ? _this4.numVal(cur.x[j]) : 0);
      }, 0) / (a == 'avg' ? cnt : 1);
    } // only for numbers
    else if (a == 'min') r = d.reduce(function (acc, cur) {
        return Math.min(acc, cur.v ? _this4.numVal(cur.x[j]) : Infinity);
      }, Infinity);else if (a == 'max') r = d.reduce(function (acc, cur) {
        return Math.max(acc, cur.v ? _this4.numVal(cur.x[j]) : -Infinity);
      }, -Infinity);
    return isNaN(r) ? '-' : this.strVal(r, mode, dec);
  };

  this.dec = function (x, d) {
    var m = Math.pow(10, d);
    if (d) x = Math.round(x * m) / m;
    return x;
  };

  this.matches = function (s, q, cs) {
    if (q.substr(0, 1) == '=') return s.indexOf('|' + q.substr(1).toLowerCase() + '|') != -1;else if (q.indexOf('*') != -1) {
      q = '\\|' + q.replace(/\*/g, '.*') + '\\|';
      return new RegExp(q, cs ? '' : 'i').test(s);
    } else return s.indexOf(cs ? q : q.toLowerCase()) != -1;
  };

  this.sort = function (n, col, desc) {
    if (desc === undefined) desc = this.opt.cAsc && n.vHead[col].classList.contains(this.opt.cAsc);
    n.vData.sort(this.cmp.bind(this, col));
    if (desc) n.vData.reverse();

    for (var j = 0; j < n.vHead.length; j++) {
      this.mark(n.vHead[j], j == col ? desc ? -1 : 1 : 0);
    }

    this.build(n);
    if (n.vLimit) this.paginate(n, 1);
  };

  this.build = function (n) {
    var tb = n.querySelector('tbody');

    for (var i = 0; i < n.vData.length; i++) {
      tb.appendChild(n.vData[i].n);
    }
  };

  this.mark = function (h, d) {
    if (this.opt.cAsc) h.classList[d > 0 ? 'add' : 'remove'](this.opt.cAsc);
    if (this.opt.cDesc) h.classList[d < 0 ? 'add' : 'remove'](this.opt.cDesc);
  };

  this.convert = function (v) {
    var r = date.parse(v);
    r = r ? r.getTime() : NaN;
    if (!isNaN(r)) return [r, 'd'];
    r = this.sz(v);
    if (!isNaN(r)) return [r, 'b'];
    r = this.interval(v);
    if (!isNaN(r)) return [r, 'i'];
    r = this.nr(v);
    if (!isNaN(r)) return [r, 'n'];
    return [v, 's'];
  };

  this.numVal = function (x) {
    return x[1] == 's' ? this.nr(x[0], 1) : x[0];
  };

  this.strVal = function (x, mode, dec) {
    if (mode == 's') return x;else if (mode == 'n') return x.toFixed(dec) * 1; //this.dec(x, dec);
    else if (mode == 'b') return this.fmtSz(x, dec);else if (mode == 'i') return this.fmtInterval(x, dec);else if (mode == 'd') return date.fmt(new Date(x), dec, this.opt.dateFormat);else return x;
  };

  this.fmtSz = function (x, dec) {
    var i = x ? Math.min(5, Math.floor(Math.log(x) / Math.log(1024))) : 0;
    return (x / Math.pow(1024, i)).toFixed(dec) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB', 'PB'
    /*, 'EB', 'ZB', 'YB'*/
    ][i];
  };

  this.fmtInterval = function (x, dec) {
    var y = this.intervalUnits.y;
    var m = this.intervalUnits.m;
    var s = [[Math.floor(x / y), 'y'], [Math.floor(x % y / m), 'm'], [Math.floor(x % y % m / 86400), 'd'], [Math.floor(x % y % m % 86400 / 3600), 'h'], [Math.floor(x % y % m % 86400 % 3600 / 60), 'min'], [x % y % m % 86400 % 3600 % 60, 'sec']];
    return s.map(function (v) {
      return v[0] ? v[0] + v[1] : null;
    }).filter(function (v) {
      return v !== null;
    }).join(' ');
  };

  this.cmp = function (by, a, b) {
    a = a.x[by][0];
    b = b.x[by][0];
    return a < b ? -1 : a > b ? 1 : 0;
  };

  this.nr = function (s, nanToZero) {
    //use Number instead of parseFloat for more strictness
    s = this.skipComma ? s.replace(/(\$|,|\s)/g, '') : s.replace(/(\$|\s)/g, '').replace(',', '.');
    s = parseFloat(s.replace(/\u2212/g, '-')); // unicode minus

    if (isNaN(s) && nanToZero) s = 0;
    return s;
  };

  this.interval = function (s) {
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
  };

  this.sz = function (s) {
    var x = this.szUnits;
    var m = s.match(/^((\d*\.)?\d+)\s*(([kmgtp]i?)?b)$/i);

    if (m) {
      m[3] = m[3].replace(/ib$/i, 'b').toLowerCase();
      if (x[m[3]]) return m[1] * x[m[3]];
    }

    return NaN;
  };
}();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/*! theme - live theme configurator */
var app = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'theme';
  this.drw = null;
  this.opt = {
    cTheme: 'js-theme',
    idTheme: 'theme-config'
  };

  this.init = function () {
    var _this = this;

    if (!document.body.classList.contains(this.opt.cTheme)) return;
    this.restore(document.documentElement, 'theme-html'); //this.restore(document.body, 'theme-body');
    //button

    var a = app.ins('a', 'Theme', {
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

    this.drw = app.ins('div', '', {
      id: this.opt.idTheme,
      className: app.opt.cToggle + ' ' + app.opt.cOff + ' drawer swipe drag pad small shift theme-drawer',
      'data-swipe': '2'
    }, document.body);
    app.ins('a', '&#x2715;', {
      href: '#cancel',
      className: 'pad hover close'
    }, this.drw); //menu

    this.hx('Theme', 2);
    app.b([app.ins('a', 'Reset to default', {
      href: '#',
      className: ''
    }, this.drw)], 'click', function (e) {
      return _this.unstyle(e);
    });
    this.put('Background', ['#fff', '#eee', '#ffeee6', '#ffe', '#efe', '#e6fcf9', '#e3eeff', '#f9e9ff'], '--bg');
    this.put('Menu', ['rgba(255,255,255,0)', 'rgba(0,0,0,.1)', 'hsla(1,100%,55%,.3)', 'hsla(45,100%,50%,.3)', 'hsla(120,100%,35%,.3)', 'hsla(180,100%,35%,.3)', 'hsla(220,100%,55%,.3)', 'hsla(290,100%,50%,.3)'], ['--bg-pane', '--bg-hilite']);
    this.put('Links', ['#000', '#777', '#c00', '#c60', '#090', '#088', '#00c', '#909'], ['--link', '--visited', '--hover']);
    this.put('Text', ['#000', '#222', '#444', '#555', '#666', '#777', '#888', '#999'], '--text');
    this.put('Font', this.opt.fonts || ['sans-serif', 'serif', 'monospace'], '--font');
    this.put('Gaps', ['0.5', '0.7', '1', '1.2', '1.5'], '--gap');
  };

  this.restore = function (n, v) {
    var css = localStorage.getItem(v);
    if (css) n.style = css;
  };

  this.style = function (k, v, deep) {
    var _this2 = this;

    if (k instanceof Array) k.forEach(function (w) {
      return _this2.style(w, v, 1);
    });else {
      //let n = (k.substr(0, 2)=='--') ? document.documentElement : document.body;
      //let n = document.body;
      var n = document.documentElement;
      n.style.setProperty(k, v);
      localStorage.setItem('theme-' + n.tagName.toLowerCase(), n.style.cssText);
    }
  };

  this.unstyle = function (e) {
    e.preventDefault();
    var s = document.documentElement.style;

    for (var i = s.length; i--;) {
      s.removeProperty(s[i]);
    } //document.documentElement.style = '';
    ////document.body.style = '';


    localStorage.removeItem('theme-html'); //localStorage.removeItem('theme-body');
  };

  this.hx = function (s, l) {
    app.ins('h' + (l || 1), s, {
      className: 'mar'
    }, this.drw);
  };

  this.put = function (hh, arr, func) {
    var _this3 = this;

    this.hx(hh, 3);
    var c = [];
    arr.forEach(function (v
    /*, k*/
    ) {
      var color = v.match(/[#(]/);
      var a = app.ins('a', color ? '' : v, {
        href: '#',
        title: v,
        className: color ? 'pad hover bord' : 'pad hover'
      }, _this3.drw);
      if (color) a.style.backgroundColor = v;else if (typeof func === 'string') a.style[func] = v;
      c.push(a);
    });
    app.b(c, 'click', func instanceof Function ? func : function (e) {
      e.preventDefault();

      _this3.style(func, e.target.title);
    });
  };
}();

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/*! tools - miscellaneous utilities */
var app = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'tools';
  this.opt = {
    aNodes: 'data-nodes',
    aSet: 'data-set',
    aUnset: 'data-unset',
    aAttr: 'data-attr',
    cMem: 'mem',
    qTop: 'h2[id], h3[id], h4[id], h5[id], h6[id]',
    // h1[id],
    minDesktop: 900
  };

  this.init = function () {
    var _this = this;

    this.opt.qSet = '[' + this.opt.aSet + '], [' + this.opt.aNodes + ']';
    this.opt.qSetClick = 'a[' + this.opt.aSet + ']';
    this.opt.qSetChange = 'input[' + this.opt.aNodes + '], select[' + this.opt.aNodes + ']';
    app.e('table[class]', function (n) {
      return _this.alignCells(n);
    });
    app.e(this.opt.qSet, function (n) {
      return _this.restore(n);
    });
    app.e(this.opt.qSet, function (n) {
      return _this.toggleClass(n);
    });
    app.h('change', this.opt.qSetChange, function (e) {
      return _this.toggleClass(e.target);
    });
    app.e(this.opt.qTop, function (n) {
      return _this.addTopLink(n);
    });
    app.h('click', this.opt.qSetClick, function (e) {
      return _this.toggleClass(e.recv, e);
    });
    this.onResize();
    app.b([window], 'resize', function (e) {
      return _this.onResize(e);
    });
  };

  this.alignCells = function (n) {
    var m = n.className.match(/\b[lcr]\d\d?\b/g);

    if (m) {
      var _loop = function _loop(i) {
        app.e(app.qq('tr>*:nth-child(' + m[i].substr(1) + ')', n), function (c) {
          return c.classList.add(m[i].substr(0, 1));
        });
      };

      for (var i = 0; i < m.length; i++) {
        _loop(i);
      }
    }
  };

  this.store = function (n, v) {
    if (n && (n.id || n.name) && n.classList.contains(this.opt.cMem)) {
      localStorage.setItem('set#' + (n.id || '#' + n.name), v);
    }
  };

  this.restore = function (n) {
    if (n && (n.id || n.name) && n.classList && n.classList.contains(this.opt.cMem)) {
      var v = localStorage.getItem('set#' + (n.id || '#' + n.name));

      if (v !== null) {
        var t = n.tagName;
        if (t == 'A') n.classList[v ? 'add' : 'remove'](app.opt.cAct);else if (t == 'SELECT') n.value = v;else if (n.type == 'checkbox') n.checked = !!v;else if (n.type == 'radio') n.checked = n.value == v;
      }
    }
  };

  this.setClass = function (n, on, m, c) {
    app.dbg(['setclass', m, c]);
    var sel = n.type == 'radio' || n.tagName == 'SELECT';
    var u = sel ? null
    /*''*/
    : app.attr(n, this.opt.aUnset);
    var attr = app.attr(n, this.opt.aAttr) || 'class';

    if (attr !== 'class') {
      var v = on ? c : u || '';
      if (v) m.setAttribute(attr, v);else m.removeAttribute(attr);
    } else if (u !== null) m.className = on ? c : u || '';else {
      if (sel) {
        //unset other select/radio values
        var _u = n.type == 'radio' ? app.qq('input[type="radio"][name="' + n.name + '"]').map(function (nn) {
          return (
            /*app.attr(nn, this.opt.aSet, '')*/
            nn.value
          );
        }).join(' ') : app.qq('option', n).map(function (nn) {
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

    n.classList[on ? 'add' : 'remove'](app.opt.cAct);
    this.store(n, sel ? n.value : (n.type == 'checkbox' ? n.checked : n.classList.contains(app.opt.cAct)) ? '1' : '');
  };

  this.toggleClass = function (n, e) {
    var _this2 = this;

    if (n.type == 'radio' && !n.checked) return;
    var box = n.type == 'checkbox' || n.type == 'radio';
    var sel = n.tagName == 'SELECT' || n.type == 'radio';
    var q = app.attr(n, this.opt.aNodes, n.hash);
    var c = sel ? n.value : app.attr(n, this.opt.aSet);
    var on = sel ? true : box ? n.checked : n.classList.contains(app.opt.cAct);

    if (e && !box && !sel) {
      on = !on;
      e.preventDefault();
      e.stopPropagation();
    } //app.dbg(['setclass?', c, on, q, e, box, sel]);


    if (c !== null) {
      app.e(q, function (m) {
        return _this2.setClass(n, on, m, c);
      });
      app.fire('update', {
        q: q
      });
    }
  };

  this.addTopLink = function (n) {
    var d = app.ins('div', '', {});

    while (n.firstChild) {
      d.appendChild(n.firstChild);
    }

    n.appendChild(d);
    d.style.position = 'relative';
    d.style.paddingRight = '1em';
    var a = app.ins('a', app.i('asc', '&uarr;'), {
      href: '#',
      className: 'small close text-n hide-print'
    }, d); //n.style.position = 'relative';
    //let a = app.ins('a', app.i('asc', '&uarr;'), {href:'#', className: 'small close text-n hide-print'}, n);
  };

  this.onResize = function () {
    var m = window.innerWidth <= this.opt.minDesktop;
    m ? app.e('[data-class-mobile]', function (n) {
      return n.className = app.attr(n, 'data-class-mobile', '');
    }) : app.e('[data-class-desktop]', function (n) {
      return n.className = app.attr(n, 'data-class-desktop', '');
    });
  };
}();

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/*! valid - custom form validation messages */
var app = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'valid';
  this.opt = {
    aHint: 'data-hint',
    qValidate: 'form',
    // set custom text for browser tooltips
    cUnhint: 'js-unhint',
    // turn off browser tooltips
    cLiveVal: 'js-live-val' // live validation, disable submit buttons if invalid

  };

  this.init = function () {
    var _this = this;

    //let q = this.opt.qValidate;
    //let dh = '[' + this.opt.aHint + ']';
    //app.e(q + ' input' + dh + ', ' + q + ' textarea' + dh + ', '+ q +' select' + dh, n => this.initInput(n));
    var inputs = ['input', 'textarea', 'select'].map(function (s) {
      return _this.opt.qValidate + ' ' + s + '[' + _this.opt.aHint + ']';
    }).join(', ');
    inputs += ', .' + this.opt.cLiveVal + ' [name]';
    app.h(['input', 'change'], inputs, function (e) {
      return _this.validateInput(e.target);
    });
    app.h('invalid', inputs, function (e) {
      return _this.setCustomMessage(e.target);
    });
    app.e('form.' + this.opt.cUnhint, function (n) {
      return _this.unhint(n);
    });
    app.e('form.' + this.opt.cLiveVal, function (n) {
      return _this.validateForm(n);
    });
    app.h('submit', this.opt.qValidate, function (e) {
      return e.target.getAttribute('novalidate') ? _this.validateForm(e.target, e) : null;
    }); //custom validation
  };

  this.isLive = function (f) {
    return f && f.classList.contains(this.opt.cLiveVal);
  };

  this.validateInput = function (n) {
    if (n.willValidate) {
      if (n.type == 'radio') app.e(app.qq('[name="' + n.name + '"]', n.form), function (m) {
        return m.setCustomValidity('');
      });else n.setCustomValidity('');
      n.checkValidity();
      if (this.isLive(n.form)) this.validateForm(n.form);
    }
  };

  this.setCustomMessage = function (n) {
    if (n.willValidate) {
      var t = n.getAttribute('data-hint') || ''; // || n.title;

      t = t.replace(/%([\w\-]+)%/g, function (m, v) {
        return n.getAttribute(v);
      });
      n.setCustomValidity(t);
    }
  };

  this.unhint = function (n) {
    n.setAttribute('novalidate', true);
  };

  this.validateForm = function (n, e) {
    if (e) n.classList.remove(this.opt.cUnhint);
    var ok = n.checkValidity(); //!==false

    if (!ok && e) {
      e.preventDefault();
      e.stopPropagation();
      var f = app.q('[name]:invalid:not(.hide):not(.off), [name]:invalid~.subinput', n);

      if (f) {
        app.dbg(['focus validate', f]);
        f.focus();
      }
    }

    if (this.isLive(n)) {
      //app.e(app.qq('[type="submit"]', n), m => m.disabled = !ok);//if no cUnhint
      app.e(app.qq('[type="submit"]', n), function (m) {
        return m.classList[ok ? 'remove' : 'add']('bg-n');
      }); //if cUnhint used
    }
  };
}();

/***/ })
/******/ ]);