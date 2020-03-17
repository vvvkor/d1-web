/*! d1-web v1.2.42 */
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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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
      return _this.on('hash', e);
    });
    this.b([document], 'keydown', function (e) {
      return _this.on('key', e);
    });
    this.b([document], 'click', function (e) {
      return _this.on('click', e);
    });
    if (location.hash) this.on('hash');
    this.fire('after');
    this.fire('afterinit');
  }; // event delegation
  // https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/


  this.on = function (t, e) {
    this.fire('before', e);
    this.fire(t, e);
    this.fire(t + 'ed', e);
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
  }; //events


  this.listen = function (t, f) {
    if (!this.handlers[t]) this.handlers[t] = [];
    this.handlers[t].push(f);
  };

  this.fire = function (t, e) {
    var _this3 = this;

    this.dbg(['fire ' + t, e]);
    if (this.handlers[t]) this.handlers[t].forEach(function (h) {
      return h.call(_this3, e);
    });
  }; //utils
  // debug


  this.dbg = function (s, l, e) {
    if (this.opt.debug >= (l || 1) || location.href.indexOf('d1debug') != -1) console[e ? 'error' : 'log'](s);
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
  }; // add event listener


  this.b = function (nn, et, f) {
    var _this4 = this;

    if (typeof nn === 'string') nn = this.qq(nn);else if (nn.tagName) nn = [nn];else nn = this.a(nn);
    if (nn && f) nn.forEach(function (n) {
      return et ? n.addEventListener(et, function (e) {
        return f(e);
      }
      /*f.bind(this)*/
      , false) : f.call(_this4, n);
    });
  }; // execute for each node


  this.e = function (nn, f) {
    return this.b(nn, '', f);
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
        if (i.match(/-/)) c.setAttribute(i.replace(/^-/, ''), attrs[i]);else c[i] = attrs[i];
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
    console.log('make ', a.href);
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

/***/ 1:
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
    app.listen('hash', function (e) {
      return _this.onHash(e);
    });
    app.listen('key', function (e) {
      return _this.onKey(e);
    });
    app.listen('click', function (e) {
      return _this.onClick(e);
    });
    app.listen('clicked', function (e) {
      return _this.unpop(e.target);
    }); // click out

    app.listen('after', function (e) {
      return _this.after(e ? e.target : null);
    }); //toggle

    var q = this.opt;
    this.opt.qTgl = this.opt.mediaSuffixes.concat(['']).map(function (x) {
      return '[id].' + app.opt.cToggle + x;
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

    /*
    app.e(this.opt.qTip, n => {
      let p = app.ins('div',app.ins('div', n.title.replace(/\s\s+/g, '<br>'), {className: 'btn bg-n'}), {className: 'pop'}, n, 1);
      n.title = '';
      p.insertBefore(n, p.firstChild);
    });//init tooltips as popup
    */
  };

  this.after = function (n) {
    this.shown = null; //do it just once when dialog is opened
    //let modal = app.q(this.opt.qDlg+':not(.'+app.opt.cOff+'), '+this.opt.qGal+':target'); // :target not updated after Esc key

    var modal = app.q(this.opt.qDlg + ':not(.' + app.opt.cOff + '), ' + this.opt.qGal + '[id="' + location.hash.substr(1) + '"]');
    var bar = window.innerWidth - document.documentElement.clientWidth; //scroll bar width

    var s = document.body.style;
    document.body.classList[modal ? 'add' : 'remove'](this.opt.cFade);

    if (this.opt.dlgUnscroll) {
      //hide scroll
      s.overflow = modal ? 'hidden' : '';
      if (!(modal && s.paddingRight)) s.paddingRight = modal ? '' + bar + 'px' : ''; // avoid width reflow
    }

    app.dbg(['after', n, modal, s.paddingRight]);

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
    if (e) e.preventDefault();
    this.unpop(null, true);
    this.unhash();
    this.after();
  };

  this.onHash = function (e) {
    app.dbg(['hash', location.hash]);
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

        if (t || g) this.after();else this.unpop(); //app.fire('esc', e);
      }
    }
  };

  this.onKey = function (e) {
    var k = e.keyCode;
    app.dbg(['key', k, this.nEsc]);
    if (k == 27 && this.nEsc >= 2) localStorage.clear();else if (k == 27) app.fire('esc', e);
    this.nEsc = k == 27 && this.nEsc < 2 ? this.nEsc + 1 : 0;
  };

  this.onClick = function (e) {
    this.nEsc = 0;
    var n = e.target;
    var a = n.closest('a');
    var d = a && a.matches('a[href^="#"]') ? app.q(a.hash) : null;
    if (a && a.hash === app.opt.hClose) app.fire('esc', e);else if (d && d.matches(this.opt.qTgl)) {
      e.preventDefault();
      d = this.toggle(d);
      if (app.vis(d) && this.opt.keepHash) this.addHistory(a.hash);else this.unhash();
      return d;
    } else if (!a) {
      this.unhash();
    }
    if (e.clientX <= 5 && e.clientY > 5 && this.opt.qDrawer) this.toggle(this.opt.qDrawer);
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

      this.tgl(d, on);
      app.dbg(['toggle' + (deep ? ' deep' : ''), on, d], deep ? 2 : 1);

      if (app.vis(d)) {
        this.fixPosition(d);
        if (!deep) this.shown = d;
      }

      if (deep != -1) {
        if (!deep) this.toggleDependent(d);
        this.hiliteLinks(d);
        this.storeVisibility(d); //if(!deep) this.after(d);
      }
    }

    return d;
  };

  this.tgl = function (d, on) {
    if (d) d.classList[on ? 'remove' : on === undefined ? 'toggle' : 'add'](app.opt.cOff);
  };

  this.toggleDependent = function (d) {
    var _this2 = this;

    if (app.vis(d)) {
      if (d.matches(this.opt.qDlg)) app.e(this.opt.qDlg, function (n) {
        return n == d ? null : _this2.toggle(n, false, 1);
      }); //hide other dialogs
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

    var a = x ? x.closest('a') : null;

    if (a && a.hash) {
      //if(a.hash==app.opt.hClose) keep = []; //to close all, even container
      //else
      keep.push(app.q(a.hash));
    }

    app.dbg(['unpop', keep]); //app.e(this.opt.qUnpop, n => (keep && keep.filter(m => m && m.tagName && n.contains(m)).length) ? null : this.toggle(n, false, 1));

    var nn = app.qq(this.opt.qUnpop).filter(function (n) {
      return !(keep && keep.filter(function (m) {
        return m && m.tagName && n.contains(m);
      }).length);
    });
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
    );
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

/***/ 2:
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

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);

var app = __webpack_require__(0); //['toggle', 'dialog', 'gallery']
//  .forEach(p => app.plug(require('./js/'+p+'.js')));


app.plug(__webpack_require__(1));
app.plug(__webpack_require__(3));
app.plug(__webpack_require__(5)); //let opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}};

app.b([document], 'DOMContentLoaded', function (e) {
  return app.init();
});
if (true) module.exports = app;
if (window) window.d1 = app;

/***/ }),

/***/ 3:
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
    app.listen('click', function (e) {
      return _this.onClick(e);
    });
  };

  this.onClick = function (e) {
    var as = e.target.closest('a, input, button');

    if (as && as.matches(this.opt.qAlert + ',' + this.opt.qDialog)) {
      //d = this.open(e, a, (m, v) => !console.log(v) && toggle.unpop()); //custom callback
      e.preventDefault();
      return this.openByNode(as);
    }
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

/***/ 5:
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

    app.listen('hash', function (e) {
      return _this.onHash(e);
    });
    app.listen('key', function (e) {
      return _this.onKey(e);
    });
    app.listen('click', function (e) {
      return _this.onClick(e);
    });
    app.e(this.opt.qGallery, function (n) {
      return _this.prepare(n);
    });
  };

  this.onClick = function (e) {
    var n = e.target;

    if (n.matches(this.opt.qGal)) {
      if (e.clientX > 0
      /* not Enter key */
      && e.clientX < n.clientWidth / 3) {
        if (this.prevImg(n)) e.preventDefault();
      } //return n;

    }
  };

  this.prevImg = function (n) {
    var p = n.previousElementSibling || app.qq('a[id]', n.parentNode).pop();
    if (p.id) location.hash = '#' + p.id;
    return p.id;
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
    app.b(app.qq('a[id]', g), 'click', app.gotoPrev);
    document.body.appendChild(g);
  };

  this.onKey = function (e) {
    if (location.hash) {
      var a = app.q(location.hash);

      if (a && a.hash) {
        var k = e.keyCode;
        if (k == 37 || k == 38) this.prevImg(a);else if (k == 39 || k == 40) location.hash = a.hash; //a.click();
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

/***/ })

/******/ });