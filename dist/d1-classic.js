/*! d1-web/classic v2.7.5 */
(function () {
  'use strict';

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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /*! app - core of d1-web */
  // (() => {
  // const main = new (function () {
  var _default$b = /*#__PURE__*/function () {
    function _default() {
      _classCallCheck(this, _default);

      this.sequence = 0;
      this.plugins = {};
      this.handlers = {};
      this.opt = {
        plug: {},
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

        // console.time('start');
        document.body.classList.add(this.opt.cJs); // prepare body: anti-hover, anti-target

        this.fire('start'); //options

        if (!opt) {
          opt = document.body.dataset.d1;
          if (opt) opt = this.parse(opt);
        }

        this.setOpt(opt);
        this.dbg(['opt', this.opt]);
        this.fire('options');
        this.initPlugins(); // plugins
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
      }
    }, {
      key: "arrange",
      value: function arrange(n) {
        if (n) this.fire('arrange', {
          n: n
        });
      } //plugins

    }, {
      key: "setOpt",
      value: function setOpt(opt) {
        var _this2 = this;

        if (opt) Object.keys(opt)
        /*.filter(k => k != 'plug')*/
        .forEach(function (k) {
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
      value: function initPlugins() {
        var _this3 = this;

        if (this.opt.disable) this.opt.disable.forEach(function (p) {
          return delete _this3.plugins[p];
        });
        this.dbg(['plugins', this.plugins]);
        Object.keys(this.plugins).forEach(function (k) {
          _this3.plugins[k].install(_this3);

          _this3.fire('plugin', {
            name: k,
            plugin: _this3.plugins[k]
          });
        });
        this.fire('init');
        this.fire('arrange'); // , {n: document.body}

        this.fire('plugins');
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
        var _e,
            _this4 = this;

        e = (_e = e) !== null && _e !== void 0 ? _e : {};
        if (!e.type) e.type = et;
        this.dbg(['fire ' + et, e]);
        if (this.handlers[et]) this.handlers[et].forEach(function (h) {
          var _e2;

          return (_e2 = e) !== null && _e2 !== void 0 && _e2.unfire ? null : h.call(_this4, e);
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
      } // execute for each node inside some node

    }, {
      key: "ee",
      value: function ee(n, q, f) {
        this.e(this.qq(q, n), f);
      } // add/remove classes

    }, {
      key: "cls",
      value: function cls(n, add, del, rev) {
        var _this7 = this,
            _n$classList,
            _n$classList2;

        var a = rev ? [del, add] : [add, del];
        a = a.map(function (c) {
          return !c || _this7.typeOf(c) === 'array' ? c : c.split(/\s+/).filter(function (x) {
            return x;
          });
        });
        if (a[1]) (_n$classList = n.classList).remove.apply(_n$classList, _toConsumableArray(a[1]));
        if (a[0]) (_n$classList2 = n.classList).add.apply(_n$classList2, _toConsumableArray(a[0]));
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
        return n && !n.classList.contains(this.opt.cOff);
      } // fix clone IDs

    }, {
      key: "fixIds",
      value: function fixIds(m) {
        var _this8 = this;

        this.ee(m, '[id]', function (n) {
          var x = n.id;

          var id = 'id-' + _this8.seq();

          n.id = id;

          _this8.ee(m, 'a[href="#' + x + '"]', function (a) {
            return a.href = '#' + id;
          });

          _this8.ee(m, 'label[for="' + x + '"]', function (a) {
            return a.htmlFor = id;
          });
        });
      }
    }]);

    return _default;
  }(); // listen to all events

  var _default$a = /*#__PURE__*/function () {
    function _default(name) {
      _classCallCheck(this, _default);

      this.app = null;
      this.name = name || 'plugin';
      this.opt = {};
    }

    _createClass(_default, [{
      key: "install",
      value: function install(app) {
        var _this = this;

        if (!app.opt.plug[this.name]) app.opt.plug[this.name] = {};
        var opt = app.opt.plug[this.name];
        Object.keys(this.opt).forEach(function (k) {
          return k in opt ? null : opt[k] = _this.opt[k];
        });
        this.opt = opt; //

        this.app = app;
        this.app.listen('init', function (e) {
          return _this.init();
        });
        if (this.arrange) this.app.listen('arrange', function (e) {
          return _this.arrange(e);
        });
      }
    }, {
      key: "init",
      value: function init() {
        console.log('plugin.init()');
      }
    }]);

    return _default;
  }();

  /*! iconset - svg paths for building icons */
  // "module.exports" is used over "export default"
  // to work with build step "css-icons.js"
  var iconset = {
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
    image: [12, 'M1 2h10v8h-10zm1 1v5l3-3 2 2 1-1 2 2 v-5zm5.5 .5a1 1 0 1 0 .001 0z'],
    text: [12, 'M2 1h5l3 3v7h-8zm1 1v8h6v-6h-2v-2zm1 4h4v1h-4zm0 2h4v1h-4z'],
    tree: [26, 'M9 3h8v6h-3v3h8v5h2v6h-6v-6h2v-3h-6v3h2v6h-6v-6h2v-3h-6v3h2v6h-6v-6h2v-5h8v-3h-3z'],
    list: [7, 'M1 1h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1z M3 1h3v1h-3zm0 2h3v1h-3zm0 2h3v1h-3z'],
    // link: [20, 'M9 7l6-6 4 4-6 6-1-1 5-5-2-2-5 5zm-8 8l6-6 1 1-5 5 2 2 5-5 1 1-6 6zm5.5 -2.5l6-6 1 1-6 6z'],
    // link: [17, 'M2 11q-2 2 0 4t4 0l2-2q2-2 0-4t-4 0zm5 -5q-2 2 0 4t4 0l2-2q2-2 0-4t-4 0zm3-1q1-1 2 0t0 2l-9 9q-1 1 -2 0 t0-2z'],
    link: [17, 'M12 1h2l2 2v2l-4 4h-2l5-5-2-2-5 5v-2zm-5 7h-2l-4 4v2l2 2h2l4-4v-2l-5 5-2-2zm-1 4l-1-1 6-6 1 1z'],
    chart: [10, 'M1 9v-3h2v3zm3 0v-5h2v5zm3 0v-7h2v7z'],
    no: [7, 'M1 3h5v1h-5z'],
    ban: [20, 'M10 2a8 8 0 1 0 .01 0m0 2a6 6 0 1 1 -.01 0zm-4.5 .5l-1 1 10 10 1-1z'],
    warning: [16, 'M8 1.7l-7 12h14zm0 9a1 1 0 1 1-.01 0c-3-7 3-7 0 0z'],
    info: [20, 'M10 2a8 8 0 1 0 .01 0zm-1 3h2v2h-2zm-1 4h3v5l1 1h-3v-5'],
    share: [22, 'M6 8a3 3 0 1 0 .01 0zm10-5a3 3 0 1 0 .01 0zm0 10a3 3 0 1 0 .01 0zm-10-3v2l10 5v-2zv2l10-5v-2z'],
    world: [12, 'M6 1.2a4.8 4.8 0 1 0 .01 0zm0 .8a4 4 0 1 1-.01 0za3 4 0 1 0 .01 0za2.2 4 0 1 1-.01 0za.5 4 0 1 0 .01 0zm4 4a4 .2 0 1 0 0 .01z'],
    flag: [10, 'M2 1h1v1q2-1 3 0t3-0v4q-2 1-3 0t-3 0v3h-1z'],
    pin: [10, 'M2 4a3 3 0 0 1 6 0q0 2 -3 5q-3-3-3-5zm3 -2a2 2 0 1 0 .01 0z'],
    //date: [10, 'M1 1.5h8v7h-8zm1 2v4h6v-4zm.5-3v2h1.5v-2zm3.5 0v2h1.5v-2z'],
    date: [11, 'M1 1.5h9v8h-9zm1 2v5h7v-5zm.5-3v2h1.5v-2zm4.5 0v2h1.5v-2z'],
    time: [24, 'M12 1a10 10 0 1 1 -.01 0zm0 2a8 8 0 1 0 .01 0zm-1.2 1h2v6.5l3.5 3.5-1.5 1.5-4-4z'],
    refresh: [20, 'M10 .3v3a7 7 0 1 0 7 7h-2a5 5 0 1 1-5-5v3l5-4z'],
    //refresh2: [20, 'M14.5 5.5a7 7 0 1 0 0 9l-1.5-1.5a5 5 0 1 1 0-6l-2 2h5.5v-5.5z'],
    view: [12, 'm1 6q5-6 10 0v1q-5 -6-10 0zm5-3a2.8 2.8 0 1 1 -.01 0zm0 1.8a1.1 1.1 0 1 0 .01 0z'],
    //card: [14, 'M1 3h12v8h-12zm1 1v1h10v-1zm0 3v3h10v-3z'],
    card: [14, 'M1 3.5q0-1 1-1h10q1 0 1 1v7q0 1 -1 1h-10q-1 0-1-1zm1 0v1h10v-1zm0 3v4h10v-4z'],
    sum: [12, 'M2.5 3v-1h7v1h-5l3 3-3 3h5v1h-7v-1l3-3z'],
    //copy: [9, 'M1 3 h1v4h4v1h-5zm2-2h5v5h-5zm1 1v3h3v-3z'],
    copy: [12, 'M2 3 h1v7h5v1h-6zm2-2h6v8h-6zm1 1v6h4v-6z'],
    help: [18, 'M9 2a7 7 0 1 0 .01 0zm-3 5q0-3 3-3t3 3c0 3-2 2-2 4h-2c0-3 2-2 2-4q0-1-1-1t-1 1zm3 4.5a1.3 1.3 0 1 1 -.01 0z'],
    phone: [13, 'M3 1l2 3-1.2 1.2 4 4 1.2-1.2 3 2c-3 6 -15 -6 -9-9z'],
    //mail: [14, 'M1 2.5h12v9h-12zm1 1v1l5 5 5 -5v-1z'],
    mail: [14, 'M1 2.5h12v9h-12zm1 1v1l5 3 5 -3v-1zm0 2v5h10v-5l-5 3z'],
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
    //storage: [9, 'M1 1h7v3h-7zm0 4h7v3h-7zm4-3v1h2v-1zm0 4v1h2v-1z'],
    //storage: [10, 'M1 3v-2h9v2zm0 3zv-2h9v2zm0 3zv-2h9v2zm6 -1.5v1h2v-1zm0-3v1h2v-1zm0-3v1h2v-1z'],
    storage: [14, 'M1.5 4.5v-3h11v3zm0 4zv-3h11v3zm0 4zv-3h11v3zm8 -2v1h2v-1zm0-4v1h2v-1zm0-4v1h2v-1z'],
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

  var _default$9 = /*#__PURE__*/function (_Plugin) {
    _inherits(_default, _Plugin);

    var _super = _createSuper(_default);

    function _default() {
      var _this;

      _classCallCheck(this, _default);

      _this = _super.call(this, 'icons');
      _this.opt = {
        cIcon: 'icon',
        // class of svg icon
        pIcon: 'icon-',
        // class prefix of tag to insert icon into
        cEmpty: 'empty',
        qReplace: '.replace',
        re: {
          '+': ['ok', 'y'],
          '-': ['no', 'n'],
          'x': ['ban', 'e'],
          '!': ['warning', 'w'],
          '?': ['help', 'i']
        },
        // sort: !+-?x
        iconSize: 24,
        pSvg: 'icon-' // id prefix to search on page; set false to skip search

      };
      _this.parsed = {};
      _this.icons = iconset;
      return _this;
    }

    _createClass(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        document.body.classList.add('js-icons');
        this.app.listen('active', function (e) {
          return _this2.iconize(e.n, e.on);
        }); // as soon as possible

        this.arrange({
          n: document.body
        }); // console.timeEnd('start');
      }
    }, {
      key: "arrange",
      value: function arrange(_ref) {
        var _this3 = this;

        var n = _ref.n;

        if (n) {
          this.app.ee(n, '[class*="' + this.opt.pIcon + '"]', function (n) {
            return _this3.iconize(n);
          });
          this.app.ee(n, this.opt.qReplace, function (n) {
            return _this3.replace(n);
          });
        }
      }
    }, {
      key: "iconize",
      value: function iconize(n, on) {
        var m = n.className.match(new RegExp('(?:^|\\s)' + (on ? '(?:act-)' : '') + this.opt.pIcon + '([\\w\\-_\\/]+)'));

        if (m && (on === undefined || n.matches('[class*="act-"]'))) {
          this.app.ee(n, 'svg', function (s) {
            return s.parentNode.removeChild(s);
          });
          this.addIcon(m[1], n);
        }
      }
    }, {
      key: "addIcon",
      value: function addIcon(i, n) {
        var t = n.textContent;
        var icon = this.i(i);

        if (icon) {
          var _icon$classList;

          if (n.classList.contains(this.opt.cEmpty)) {
            this.app.clr(n);
            if (!n.hasAttribute('title')) n.title = t;
            n.classList.remove(this.opt.cEmpty);
          }

          if (n.firstChild && !n.firstChild.tagName) this.app.ins('span', n.firstChild, {}, n, false);
          n.insertBefore(icon, n.firstChild); // n.classList.add(this.opt.pIcon + i.split(/[\/_]/)[0]);

          var m = n.className.match(/\bic_([\w\-_]+)\b/);
          if (m) (_icon$classList = icon.classList).add.apply(_icon$classList, _toConsumableArray(m[1].split('_')));
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
        var _n$classList;

        var w = a.filter(function (x) {
          return x.match(/^\d+$/);
        });
        var c = a.filter(function (x) {
          return x && !x.match(/^\d+$/);
        });
        if (w.length) n.classList.add('js-resized');
        if (w[0]) n.style.width = w[0] + 'px';
        if (w[1]) n.style.height = w[1] + 'px';
        if (c.length) (_n$classList = n.classList).add.apply(_n$classList, _toConsumableArray(c));
        return n;
      }
    }, {
      key: "replace",
      value: function replace(n) {
        var _this4 = this;

        this.app.ee(n, '*', function (m) {
          return _this4.replaceItem(m, n);
        });
      }
    }, {
      key: "replaceItem",
      value: function replaceItem(n, p) {
        var t = 'innerText' in n && !n.firstElementChild ? n.innerText.replace(/^\s+|\s+$/g, '') : '';

        if (t.length == 1 && t in this.opt.re && !('val' in n.dataset)) {
          n.innerHTML = '';
          var i = p.dataset[this.opt.re[t][1]] || this.opt.re[t][0];
          this.app.ins('', this.i(i, t), 'text-' + this.opt.re[t][1], n);
          n.dataset.val = t;
        }
      }
    }]);

    return _default;
  }(_default$a);

  var _default$8 = /*#__PURE__*/function (_Plugin) {
    _inherits(_default, _Plugin);

    var _super = _createSuper(_default);

    function _default() {
      var _this;

      _classCallCheck(this, _default);

      _this = _super.call(this, 'toggle');
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
        qModal: '.gal>a[id], .dlg',
        qMassTgl: 'a[data-nodes]:not([data-set])',
        cMem: 'mem',
        cFade: 'fade',
        cTarget: 'target',
        // css
        cToggle: 'toggle',
        // js
        hUnhash: '#_'
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
        app.listen('before', function (e) {
          return (e === null || e === void 0 ? void 0 : e.type) == 'click' ? _this2.beforeClick(e) : null;
        }); // click out

        app.listen('keydown', function (e) {
          return _this2.onKey(e);
        }); //esc

        app.listen('click', function (e) {
          return _this2.onClick(e);
        });
        app.h('click', 'a[href^="#"]', function (e) {
          return _this2.onClickHash(e);
        });
        app.listen('hashchange', function (e) {
          return _this2.onHash(e);
        }); //initial state, #

        app.listen('esc', function (e) {
          return _this2.esc(e);
        }); //click #cancel, hash #cancel, key-27

        app.listen('active', function (e) {
          return _this2.hiliteLink(e.n, e.on);
        });
        app.h('click', this.opt.qMassTgl, function (e) {
          return _this2.massToggle(e.recv, e);
        });
        app.listen('modal', function (e) {
          return _this2.modalStyle(e);
        }); //toggle

        var q = this.opt;
        this.opt.qTgl = this.opt.mediaSuffixes.concat(['']).map(function (x) {
          return (
            /*'[id]' + */
            '.' + app.opt.cToggle + x
          );
        }).join(', ');
        this.opt.qUnpop = [q.qPop, q.qNav, q.qDlg, q.qDrw
        /*, q.qGal*/
        ].join(', ');
        this.opt.qUnpopOn = [q.qPop, q.qNav, q.qDlg, q.qDrw
        /*, q.qGal*/
        ].map(function (n) {
          return n + ':not(.' + app.opt.cOff + ')';
        }).join(', ');
        this.arrangeOnce();
      }
    }, {
      key: "arrangeOnce",
      value: function arrangeOnce() {
        var _this3 = this;

        var n = null;
        var app = this.app;
        var q = this.opt;
        var togglers = [q.qTrg, q.qPop, q.qNav, q.qDlg, q.qTab, q.qTre, q.qDrw
        /*, q.qMedia/*, q.qGal*/
        ].join(', '); //initialize togglers

        app.e(togglers, function (n) {
          return _this3.initToggler(n);
        });
        this.opt.mediaSuffixes.forEach(function (x) {
          return app.e(_this3.opt.qTrg + x, function (n) {
            return _this3.initToggler(n, x);
          });
        });
        app.e(this.opt.qMassTgl, function (n) {
          return app.e(n.dataset.nodes, function (m) {
            return _this3.initToggler(m, '', true);
          });
        }); //let autohide = [        q.qPop, q.qNav, q.qDlg, q.qTab, q.qAcc, q.qDrw, q.qMedia/*, q.qGal*/].join(', ');
        //app.e(autohide, n => this.tgl(n, 0)); //autohide

        app.ee(n, this.opt.qNav + ', ' + this.opt.qTre, function (m) {
          return _this3.attachSubNav(m);
        }); //nav, tree: attach to links

        app.ee(n, this.opt.qGal + ':last-child', function (m) {
          return app.x(m, 1);
        }); //gal: auto add close link

        app.ee(n, this.opt.qSubMem, function (m) {
          return m.classList.add(_this3.opt.cMem);
        }); //initialize sub mem

        app.ee(n, '[id]', function (m) {
          return _this3.restoreVisibility(m);
        }); //restore visibility

        app.ee(n, this.opt.qTab + ':not(.' + app.opt.cOff + ') ~ [id]:not(.' + app.opt.cOff + ')', function (m) {
          return _this3.tgl(m, 0);
        }); //undup tabs

        app.ee(n, this.opt.qTab + ':first-of-type', function (m) {
          return app.qq(_this3.opt.qTab, m.parentNode).filter(function (m) {
            return app.vis(m);
          }).length ? null : _this3.tgl(app.q(app.q('a[href^="#"]', m.parentNode.previousElementSibling).hash), 1);
        }); //inactive tabs: show first
        //init links state

        app.ee(n, '.' + app.opt.cToggle + '[id]', function (m) {
          return _this3.hiliteLinks(m);
        });
        app.ee(n, this.opt.qMassTgl, function (m) {
          return _this3.massToggle(m);
        });
      }
    }, {
      key: "arrange",
      value: function arrange(_ref) {
        var n = _ref.n;
        this.app.ee(n, this.opt.qTip, function (m) {
          m.setAttribute('data-tip', m.title.replace(/\s\s+/g, '\n'));
          m.removeAttribute('title');
        }); //init tooltips
      }
    }, {
      key: "modalStyle",
      value: function modalStyle(e, src) {
        var wasModal = document.body.classList.contains(this.opt.cFade);
        var modal = this.app.q(this.opt.qDlg + ':not(.' + this.app.opt.cOff + '), ' + this.opt.qGal + '[id="' + location.hash.substr(1) + '"]'); // add / remove overlay for every opened modal
        // ...
        // hide / show scrollbar

        if (wasModal !== !!modal) {
          //console.log('modalStyle', e);
          var bar = window.innerWidth - document.documentElement.clientWidth; //scroll bar width

          var s = document.body.style;
          document.body.classList[modal ? 'add' : 'remove'](this.opt.cFade);

          if (this.opt.dlgUnscroll) {
            //hide scroll
            s.overflow = modal ? 'hidden' : '';
            if (!(modal && s.paddingRight)) s.paddingRight = modal ? '' + bar + 'px' : ''; // avoid width reflow
          }

          this.app.dbg(['modalStyle', modal, s.paddingRight]);
        } //else console.log('modalStyle SKIP')
        //focus first input


        if (modal && e !== null && e !== void 0 && e.show) {
          //const f1 = this.app.q('input, a:not(.' + this.app.opt.cClose + ')', modal);
          var f1 = this.app.q('input:not([type="hidden"]), select, textarea, a.btn', modal);
          var f = this.app.q(':focus', modal);

          if (f1 && !f) {
            this.app.dbg(['focus', modal, f1, f]);
            f1.focus(); //focus just once when dialog is opened

            if (f1.type == 'text') f1.select();
          }
        }
      }
    }, {
      key: "esc",
      value: function esc(e) {
        this.app.dbg(['esc', e]);
        if (e && e.preventDefault) e.preventDefault();
        this.unpop(); //if (e.type != 'hashchange') {

        this.addHistory(); //this.modalStyle(null, 'esc');

        this.app.fire('modal', {
          n: null,
          src: 'esc',
          show: false
        }); //}
      }
    }, {
      key: "addHistory",
      value: function addHistory(h) {
        if (h) {
          history.pushState({}, '', h); //following required to re-render hash changes (test: open gallery, esc)
          //history.pushState({}, '', h);
          //history.go(-1);
        } else if (location.hash) {
          location.hash = this.opt.hUnhash; //this.app.opt.hClose; // update :target styles

          if (location.hash) history.replaceState({}, '', location.pathname + location.search); // remove hash in url
          //this.addHistory(location.pathname + location.search /* + this.app.opt.hClose*/);
        }
      }
    }, {
      key: "onKey",
      value: function onKey(e) {
        var k = e.keyCode;
        this.app.dbg(['keydown', k, this.nEsc]);
        if (k == 27 && this.nEsc >= 4) localStorage.clear();
        if (k == 27) this.app.fire('esc', e);
        this.nEsc = k == 27 && this.nEsc < 4 ? this.nEsc + 1 : 0;
      }
    }, {
      key: "onHash",
      value: function onHash(e) {
        var _ref2;

        if ((_ref2 = e ? e.newURL : location.hash) !== null && _ref2 !== void 0 && _ref2.match(new RegExp(this.opt.hUnhash + '$'))) return;
        this.app.dbg(['hashchange', location.hash, e === null || e === void 0 ? void 0 : e.newURL]);
        this.nEsc = 0;
        if (!location.hash || location.hash === this.app.opt.hClose) this.app.fire('esc', e);else if (location.hash === '#unstore') localStorage.clear();else {
          var d = this.app.q(location.hash);

          if (d) {
            var t = d.matches(this.opt.qTgl); // let g = d.matches(this.opt.qGal);

            if (t) {
              this.unpop();
              this.toggle(d, true);
              if (!this.opt.keepHash) this.addHistory();
            }
            /*
            else if (g) {
              this.app.fire('modal', {n: d, src: 'gal', show: true});
            }
            else this.app.fire('modal', {n: d, src: '#', show: false});
            */

          }

          this.app.fire('modal', {
            n: d,
            src: '#',
            show: null
          });
        }
      }
    }, {
      key: "beforeClick",
      value: function beforeClick(e) {
        if (location.hash) {
          var d = this.app.q(location.hash);
          if (!d || d.matches(this.opt.qUnpopOn) && !d.contains(e.target)) this.addHistory();
        }

        this.unpop(e.target, true);
      }
    }, {
      key: "onClickHash",
      value: function onClickHash(e) {
        var a = e.recv;

        if (a && a.hash === this.app.opt.hClose) {
          e.preventDefault();
          var d = a.closest(this.opt.qTgl);
          this.app.dbg(['close', this.opt.qTgl, a, d]);

          if (d) {
            this.tgl(d, false);
            this.addHistory(); //this.app.fire('esc', e);

            if (d.matches(this.opt.qModal)) this.app.fire('modal', {
              n: d,
              src: 'x',
              show: false
            });
          } else this.app.fire('esc', e);
        } else {
          var _d = this.app.q(a.hash);

          if (_d && _d.matches(this.opt.qTgl)) {
            e.preventDefault();
            _d = this.toggle(_d);
            if (this.app.vis(_d) && this.opt.keepHash) this.addHistory(a.hash);else this.addHistory();
          }

          var par = e.recv.closest(this.opt.qUnpopOn);
          if (_d && par && !par.contains(_d)) this.toggle(par, false);
        }
      }
    }, {
      key: "onClick",
      value: function onClick(e) {
        this.nEsc = 0; //if (!e.target.closest('a, input, select, textarea')) this.addHistory();
        //if (e.clientX>=0 && e.clientX<=10 && e.clientY>5 && this.opt.qDrawer) this.toggle(this.opt.qDrawer);
      }
    }, {
      key: "initToggler",
      value: function initToggler(n, suffix, keep) {
        n.classList.remove(this.opt.cTarget + (suffix || ''));
        n.classList.add(this.app.opt.cToggle + (suffix || ''));
        if (!keep) this.tgl(n, 0);
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
      value: function toggle(h, on, deep, id) {
        var d = h ? h.tagName ? h : this.app.q(h) : null;

        if (d) {
          if (d.matches(this.opt.qTab) && on === undefined) on = true; //tabs: show instead of toggle

          this.app.fire('beforetoggle', {
            n: d,
            on: on,
            deep: deep
          });
          this.tgl(d, on);
          this.app.dbg(['toggle' + (deep ? ' deep' : ''), on, d], deep ? 2 : 1);
          if (this.app.vis(d)) this.fixPosition(d);

          if (deep != -1) {
            if (!deep) {
              this.toggleDependent(d);

              if (id && this.opt.keepHash) {
                d.id = id;
                this.addHistory('#' + id);
              }
            } //this.hiliteLinks(d);


            this.storeVisibility(d); //if (!deep) this.modalStyle(d);

            if (!deep && d.matches(this.opt.qModal)) {
              var show = on === undefined ? this.app.vis(d) : on;
              this.app.fire('modal', {
                n: d,
                src: 'toggle',
                show: show
              });
            }
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
      value: function tgl(n, on) {
        var _on;

        if (n) n.classList[on ? 'remove' : on === undefined ? 'toggle' : 'add'](this.app.opt.cOff);
        this.hiliteLinks(n);
        on = (_on = on) !== null && _on !== void 0 ? _on : this.app.vis(n);
        this.app.fire('toggle', {
          n: n,
          on: on
        }); //this.app.fire('update', {n});
      }
    }, {
      key: "toggleDependent",
      value: function toggleDependent(d) {
        var _this4 = this;

        if (this.app.vis(d)) {
          if (d.matches(this.opt.qDlg)) ; //this.app.e(this.opt.qDlg, n => n == d ? null : this.toggle(n, false, 1)); //hide other dialogs
          else if (d.matches(this.opt.qTab)) this.app.e(d.parentNode.children, function (n) {
              return n == d ? null : _this4.toggle(n, false, 1);
            }); //hide sibling tabs
            else if (d.matches(this.opt.qAcc)) this.app.ee(d.closest(this.opt.qAccRoot), this.opt.qAcc, function (n) {
                return n.contains(d) ? null : _this4.toggle(n, false, 1);
              }); //hide other ul
        }
      }
    }, {
      key: "massToggle",
      value: function massToggle(n, e) {
        var _this5 = this;

        if (e) e.preventDefault(); //const on = !n.classList.contains(this.app.opt.cAct);

        var on = this.app.vis(this.app.q(n.dataset.nodes));
        if (e) on = !on;
        this.app.fire('active', {
          n: n,
          on: on
        });

        if (e) {
          this.app.qq(n.dataset.nodes).forEach(function (d) {
            return _this5.toggle(d, on);
          });
          this.addHistory(); //this.app.fire('update', {n});
        }
      }
    }, {
      key: "unpop",
      value: function unpop(x, force) {
        var _this6 = this;

        var keep = [x];

        if (x) {
          var a = x.closest('a');
          if (a && a.hash) keep.push(this.app.q(a.hash)); //keep hash target
        }

        this.app.dbg(['unpop', keep]); //this.app.e(this.opt.qUnpop, n => (keep && keep.filter(m => m && m.tagName && n.contains(m)).length) ? null : this.toggle(n, false, 1));

        var nn = this.app.qq(this.opt.qUnpopOn).filter(function (n) {
          return !(keep && keep.filter(function (m) {
            return m && m.tagName && n.contains(m);
          }).length);
        }); // skip if contains one of [keep]

        if (!force) {
          // to close nested subsequently
          nn = nn.filter(function (n) {
            return !_this6.app.q(_this6.opt.qUnpopOn, n);
          });
        } // to close vRel subsequently


        nn = nn.filter(function (n) {
          return !_this6.containsRels(n);
        });
        this.app.e(nn, function (n) {
          return _this6.toggle(n, false, !force);
        });
      }
    }, {
      key: "containsRels",
      value: function containsRels(n) {
        var rels = this.app.qq(this.opt.qUnpopOn).map(function (n) {
          return n.vRel;
        }).filter(function (n) {
          return n;
        });
        return rels.filter(function (r) {
          return n.contains(r);
        }).length;
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
        var _this7 = this;

        var on = this.app.vis(d);
        if (d.id) this.app.e('a[href="#' + d.id + '"]', function (n) {
          return _this7.app.fire('active', {
            n: n,
            on: on
          });
        });
      }
    }, {
      key: "hiliteLink",
      value: function hiliteLink(n, on) {
        n.classList[on ? 'add' : 'remove'](this.app.opt.cAct);
        this.app.cls(n, n.dataset.act, n.dataset.inact, !on);
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
  }(_default$a);

  /*! url - url build and arguments */
  var Url = /*#__PURE__*/function () {
    function Url() {
      _classCallCheck(this, Url);
    }

    _createClass(Url, null, [{
      key: "build",
      value: // build url from link node or string, with additional parameters
      function build(a, args) {
        a = Url.url2a(a);
        var g = Url.get(true, a);
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
      value: function get(g) {
        var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        if (a === true) a = location.href;
        if (!a) return null;
        a = Url.url2a(a);
        var i,
            gets = {};
        var args = a.search ? a.search.replace(/^\?/, '').split('&') : [];

        for (i = 0; i < args.length; i++) {
          var v = args[i].split('=');
          gets[v[0]] = decodeURIComponent(v[1].replace(/\+/g, ' '));
        }

        return g === true ? gets : gets[g]; //protocol, host (hostname, port), pathname, search, hash
      }
    }, {
      key: "url2a",
      value: function url2a(a) {
        if (a && !a.tagName) {
          var h = a;
          a = document.createElement('a');
          a.href = h;
        }

        return a;
      }
    }]);

    return Url;
  }();

  /*! date - parse and format date */
  var Dt = /*#__PURE__*/function () {
    function Dt() {
      _classCallCheck(this, Dt);
    }

    _createClass(Dt, null, [{
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
        f: y=Y-m-d (default), d=d.m.Y, m=m/d Y, i=ISO
      */

    }, {
      key: "fmt",
      value: function fmt(x, t, f) {
        if (!x) return '';

        if (f == 'i') {
          return new Date(x - x.getTimezoneOffset() * 60000).toISOString().replace(/Z$/, '').substr(0, t ? 30 : 10);
        }

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

  var _default$7 = /*#__PURE__*/function (_Plugin) {
    _inherits(_default, _Plugin);

    var _super = _createSuper(_default);

    function _default() {
      var _this;

      _classCallCheck(this, _default);

      _this = _super.call(this, 'form');
      _this.opt = {};
      return _this;
    }

    _createClass(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.app.h('click', 'a[href^="#"][data-value]', function (e) {
          e.preventDefault();

          _this2.setValue(e.recv);
        });
        this.app.h('click', 'input[data-group]', function (e) {
          return _this2.checkBoxes(e.target);
        });
      }
    }, {
      key: "arrange",
      value: function arrange(_ref) {
        var _this3 = this;

        var n = _ref.n;

        if (!n) {
          this.app.ee(n, 'form[data-q]', function (m) {
            return _this3.initValues(m, m.dataset.q);
          });
          this.app.ee(n, '[name][data-q]', function (m) {
            return _this3.initValue(m, m.dataset.q);
          });
        }

        this.app.ee(n, 'input[type="color"]', function (m) {
          return _this3.prepareColor(m);
        });
      }
    }, {
      key: "initValues",
      value: function initValues(n, g) {
        var _this4 = this;

        this.app.ee(n, '[name]', function (m) {
          return _this4.initValue(m, g ? g + '[' + m.name + ']' : m.name);
        });
      }
    }, {
      key: "initValue",
      value: function initValue(n, g) {
        if (g) {
          var v = Url.get(g);

          if (v !== undefined) {
            var _n$type;

            if (n.type == 'checkbox') n.checked = v && v !== '0';else if (n.type == 'radio') n.checked = v && n.value === v;else if ((_n$type = n.type) !== null && _n$type !== void 0 && _n$type.match(/^date/)) n.value = Dt.fmt(Dt.parse(v), n.type.match(/^datetime/), 'i');else n.value = v;
          }
        }
      }
    }, {
      key: "checkBoxes",
      value: function checkBoxes(n) {
        var _this5 = this;

        //this.app.ee(n.form, 'input[type="checkbox"][class~="' + (n.dataset.group || '') + '"]', m => m.checked = n.checked);
        this.app.ee(n.form, 'input[type="checkbox"]', function (m) {
          if (m.classList.contains(n.dataset.group)) {
            m.checked = n.checked;

            _this5.app.dispatch(m, ['input', 'change']);
          }
        });
      }
    }, {
      key: "setValue",
      value: function setValue(n) {
        var d = this.app.q(n.hash);

        if (d) {
          d.value = n.dataset.value || '';
          this.app.dispatch(d, ['input', 'change']);
          this.app.pf('toggle', 'unpop', d, true); // this.app.pf('toggle', 'modalStyle'); //generally not needed
        }
      }
    }, {
      key: "prepareColor",
      value: function prepareColor(n) {
        if (n.dataset.ready) return;
        n.dataset.ready = 1;
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
  }(_default$a);

  var _default$6 = /*#__PURE__*/function (_Plugin) {
    _inherits(_default, _Plugin);

    var _super = _createSuper(_default);

    function _default() {
      var _this;

      _classCallCheck(this, _default);

      _this = _super.call(this, 'calendar');
      _this.opt = {
        cBtn: 'pad hover',
        dateFormat: 'd',
        //y=Y-m-d, d=d.m.Y, m=m/d Y
        hCancel: '#close',
        hNow: '#now',
        addIcons: [['date', '#', '#open'], ['ok', '&check;', '#now'], ['delete', '&#x2715;', '#clear']],
        idPicker: 'pick-date',
        minWidth: 801,
        minWidthDropdown: 801,
        qsCalendar: 'input.calendar',
        showModal: 0,
        // ! avoid modal calendar inside modal dialog
        stepMinutes: 1,
        inPop: 0
      };
      _this.win = null;
      return _this;
    }

    _createClass(_default, [{
      key: "init",
      value: function init()
      /*opt*/
      {
        var _this2 = this;

        //let i;
        //for (i in opt) this.opt[i] = opt[i];
        this.win = this.app.ins('div', '', {
          id: this.opt.idPicker,
          className: this.app.opt.cToggle + ' ' + this.app.opt.cOff + ' pad'
        }); //dlg hide pad

        this.win.style.whiteSpace = 'nowrap';
        document.body.appendChild(this.win);
        this.app.h('click', this.opt.qsCalendar, function (e) {
          return _this2.openDialog(e.target, null, e);
        });
        this.app.h('input', this.opt.qsCalendar, function (e) {
          return _this2.validate(e.target, 0);
        }); //this.app.h('keydown', this.opt.qsCalendar, e => this.key(e));

        this.app.h('click', '#' + this.opt.idPicker + ' a', function (e) {
          return _this2.onClick(e);
        });
        this.app.h('click', '.calendar-tools a', function (e) {
          return _this2.onClick(e, true);
        });
      }
    }, {
      key: "arrange",
      value: function arrange(_ref) {
        var _this3 = this;

        var n = _ref.n;

        if (window.innerWidth >= this.opt.minWidth) {
          this.app.ee(n, this.opt.qsCalendar, function (m) {
            return _this3.prepare(m);
          });
        }
      }
      /*
      key(e) {
        if (e.keyCode == 40 && !this.app.vis(this.win)) this.openDialog(e.target, null, e);
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

          if (dy || dm) this.switchMonths(n, x.getFullYear() + dy, x.getMonth() + dm, x.getDate());else if (dh || di) this.setTime(n, dh, di);else if (h == this.opt.hNow) this.closeDialog(n, true);else if (h == this.opt.hCancel) this.closeDialog(n, null); // same as esc
          else if (h == '#open') this.openDialog(n, null);else if (h == '#clear') this.closeDialog(n, '');else if (h.match(/#\d\d?/)) this.closeDialog(n, this.fmt(x, h.substr(1)));
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
          else m = this.opt.showModal || Math.min(window.innerWidth, window.innerHeight) < this.opt.minWidthDropdown;

          if (on) {
            this.win.className = this.app.opt.cToggle + ' ' + this.app.opt.cOff + ' pad ' + (m ? 'dlg' : '');
            (m ? document.body : this.opt.inPop ? n.parentNode : n.previousElementSibling).appendChild(this.win);

            if (m) {
              var s = this.win.style;
              s.left = s.right = s.top = s.bottom = '';
            }

            this.win.vRel = n; //m ? n : null;//m ? null : n;//n;
          }
        }

        this.app.toggle(this.win, on); //if (!on) this.win.tabindex = -1;

        if (!on) document.body.appendChild(this.win); //this.app.fire('after');
      }
    }, {
      key: "prepare",
      value: function prepare(n) {
        if (n.dataset.ready) return;
        n.dataset.ready = 1;
        n.dataset.tm = n.type == 'datetime-local' || n.classList.contains('datetime') ? '1' : '';
        n.type = 'text';
        n.autocomplete = 'off';
        if (n.value) n.value = n.defaultValue = this.fmt(this.parse(n.value), 0, n.dataset.tm);
        var pop = this.app.ins('div', '', 'pop l', n, -1); //''

        if (!this.opt.inPop) pop.style.verticalAlign = 'bottom';

        if (this.opt.addIcons.length > 0) {
          var ic = this.app.ins('span', '', 'input-tools calendar-tools nobr', n, 1); //icons container

          for (var i in this.opt.addIcons) {
            var x = this.opt.addIcons[i];
            this.app.ins('', ' ', {}, ic);
            this.app.ins('a', this.app.i.apply(this.app, x.slice(0, 2)), {
              href: x[2],
              className: 'let'
            }, ic); //this.app.ins('a', x[1], {href: x[2], className: 'let empty icon-' + x[0]}, ic);
          }
        }

        if (this.opt.inPop) pop.appendChild(n);
      }
    }, {
      key: "openDialog",
      value: function openDialog(n, d, e) {
        if (n.dataset.ready) {
          if (e) e.preventDefault();
          this.build(n, d || n.value);
          this.toggle(true, n); //let f = (this.app.q('.bg-w', this.win) || this.app.q('#1', this.win));
          //if (f) f.focus();
        }
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
        var min = this.getLimit(n, 'min', n.dataset.tm);
        var max = this.getLimit(n, 'max', n.dataset.tm);
        var v = this.fmt(this.parse(n.value), 0, n.dataset.tm, 'y');
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
        this.win.vHours.textContent = this.n(n.dataset.tm ? x.getHours() : 0);
        this.win.vMinutes.textContent = this.n(n.dataset.tm ? x.getMinutes() : 0); //days

        var days = new Date(y, m + 1, 0).getDate(); //days in month

        var skip = (new Date(y, m, 1).getDay() + 6) % 7; //skip weekdays

        var maxd = Math.ceil((skip + days) / 7) * 7 - skip;
        var c, vv, sel, today, off, wd; // let cd = this.fmt(new Date());
        // let xd = this.fmt(x);

        var row;

        for (var i = -skip + 1; i <= maxd; i++) {
          wd = (skip + i - 1) % 7 + 1;
          if (wd == 1) row = this.app.ins('div', '', 'row', rows);
          if (i < 1 || i > days) c = this.app.ins('a', '', 'pad c center', row);else {
            vv = this.fmt(x, i, 0, 'y');
            sel = i == d;
            today = false; //(this.fmt(x, i) == cd);

            off = min && vv < min || max && vv > max;
            c = this.app.ins('a', i, 'pad c center ' + (sel ? 'bg-w ' : '') + (today ? 'bg-y ' : '') + (off ? 'text-n ' : 'hover ') + (wd > 5 ? 'text-e ' : ''), row);
            if (!off) c.href = '#' + i;
          }
        } //time


        this.win.vNodeTime.classList[n.dataset.tm ? 'remove' : 'add'](this.app.opt.cHide);
      }
    }, {
      key: "build",
      value: function build(n, x) {
        var app = this.app;
        if (typeof x === 'string') x = this.parse(x || n.dataset.def || '');
        this.win.vCur = x;

        if (!this.win.vDays) {
          app.clr(this.win); //buttons

          var p1 = app.ins('p', '', 'c', this.win);
          this.btn(this.opt.hNow, 'ok', '&check;', p1);
          this.btn('#prev-year', 'prev2', '&laquo;', p1);
          this.btn('#prev-month', 'prev', '&lsaquo;', p1);
          this.win.vNodeCur = app.ins('span', '', 'pad', p1);
          this.btn('#next-month', 'next', '&rsaquo;', p1);
          this.btn('#next-year', 'next2', '&raquo;', p1);
          this.btn(this.opt.hCancel, 'close', '&#x2715;', p1);
          app.ins('hr', '', {}, this.win); //dates

          this.win.vDays = app.ins('div', '', {}, this.win); //time

          var hm = app.ins('div', '', {}, this.win);
          this.win.vNodeTime = hm;
          app.ins('hr', '', {}, hm);
          var p2 = app.ins('p', '', 'c', hm);
          this.btn('#prev-hour', 'prev', '&lsaquo;', p2);
          this.win.vHours = app.ins('span', '', 'pad', p2);
          this.btn('#next-hour', 'next', '&rsaquo;', p2);
          app.ins('span', ':', 'pad', p2);
          this.btn('#prev-min', 'prev', '&lsaquo;', p2);
          this.win.vMinutes = app.ins('span', '', 'pad', p2);
          this.btn('#next-min', 'next', '&rsaquo;', p2); //this.app.pf('icons', 'arrange', {n: this.win});
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
          n.value = d === true ? this.fmt(0, 0, n.dataset.tm) : d;
          var h = this.win.vHours;
          var m = this.win.vMinutes;
          if (n.dataset.tm && d !== true && d !== '' && h && m) n.value += ' ' + this.n(h.textContent) + ':' + this.n(m.textContent);
          this.app.dispatch(n, ['input', 'change']);
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
        return Dt.fmt(x, t, f || this.opt.dateFormat);
      }
    }, {
      key: "btn",
      value: function btn(h, i, s, p) {
        s = this.app.i(i, s);
        return this.app.ins('a', s, {
          href: h,
          className: this.opt.cBtn
        }, p); //return this.app.ins('a', s, {href: h, className: this.opt.cBtn + ' empty icon-' + i}, p);
      }
    }]);

    return _default;
  }(_default$a);

  /*! func - function derorators */
  var Func = /*#__PURE__*/function () {
    function Func() {
      _classCallCheck(this, Func);
    }

    _createClass(Func, null, [{
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
        return function () {
          var _arguments = arguments,
              _this = this;

          if (skip && p) clearTimeout(p);
          p = setTimeout(function () {
            f.apply(_this, _arguments);
            p = null;
          }, ms);
        };
      }
    }, {
      key: "debounce",
      value: function debounce(f, ms) {
        return Func.delay(f, ms, true);
      }
    }]);

    return Func;
  }();

  var _default$5 = /*#__PURE__*/function (_Plugin) {
    _inherits(_default, _Plugin);

    var _super = _createSuper(_default);

    function _default() {
      var _this;

      _classCallCheck(this, _default);

      _this = _super.call(this, 'lookup');
      _this.opt = {
        cacheLimit: 0,
        pList: 'lookup-list-',
        max: 10,
        wait: 300,
        inPop: 0
      };
      _this.win = null;
      return _this;
    }

    _createClass(_default, [{
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
        var f = Func.debounce(this.find.bind(this), this.opt.wait);
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
      key: "arrange",
      value: function arrange(_ref) {
        var _this3 = this;

        var n = _ref.n;
        this.app.ee(n, 'input[data-lookup]', function (m) {
          return _this3.prepare(m);
        });
        this.app.ee(n, '[data-chain]', function (m) {
          return _this3.updateChain(m);
        });
      }
    }, {
      key: "prepare",
      value: function prepare(n) {
        if (n.dataset.ready) return;
        n.dataset.ready = 1;
        var app = this.app;
        n.vLabel = 'label' in n.dataset ? n.dataset.label : n.value || '';
        var pop = app.ins('div', '', 'pop l lookup-pop', n, 1);
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

        if ('url' in n.dataset) {
          var ic = app.ins('span', '', 'input-tools nobr', this.opt.inPop ? pop : m, 1); //icons container

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
        var _this4 = this;

        var uc = n.dataset.cap || '';

        if (uc && n.value && !('label' in n.dataset)) {
          var u = encodeURI(decodeURI(Url.build(uc, {
            time: new Date().getTime()
          })).replace(/\{q\}/, n.value));
          this.app.fetch(u, function (req) {
            var d = _this4.app.parse(req.responseText);

            if (d) {
              var h = u.split('#');
              if (!h[1] && d.data) d = d.data;

              _this4.fix(n, n.value, _this4.app.path(d, h[1] || '', n.value));
            }
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
              var u = encodeURI(decodeURI(Url.build(n.dataset.lookup || '', {
                //value: v,
                time: new Date().getTime()
              })).replace(/\{q\}/, v));
              n.vCur = null;
              this.app.fetch(u, this.list.bind(this, u, v, n));
            }
      }
    }, {
      key: "list",
      value: function list(u, v, n, req) {
        var d = this.app.parse(req.responseText);

        if (d) {
          var h = u.split('#');
          if (!h[1] && d.data) d = d.data;
          d = this.norm(this.app.path(d, h[1] || '', []), h[2], h[3], h[4]);
          if (v === this.cap(n).value) this.openList(n, d);
          this.store(n, v, d);
        }
      }
    }, {
      key: "openList",
      value: function openList(n, d, e) {
        //if (e) e.stopPropagation();
        this.closeList();
        var pop = this.pop(n);
        pop.appendChild(this.win);
        this.app.toggle(this.win, true);
        this.build(n, d);
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
        var ul = app.ins('ul', '', 'nav let hover', this.win);
        var w,
            j = 0;
        var go = n.dataset["goto"] || '';

        for (var i in d) {
          w = app.ins('li', '', {}, ul);
          var a = app.ins('a', '', {
            href: go ? go.replace(/\{id\}/, d[i].id) : '#' + d[i].id,
            className: '-pad -hover' + (go ? '' : ' lookup-item')
          }, w);
          app.ins('span', d[i].nm, {}, a);

          if (d[i].info) {
            app.ins('br', '', {}, a);
            app.ins('small', d[i].info, 'text-n', a);
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
        n.value = v;
        n.vLabel = this.cap(n).value = c;
        this.app.dispatch(n, ['input', 'change']);
        this.closeList();
      }
    }, {
      key: "key",
      value: function key(e) {
        var n = e.target ? this.ident(e.target) : null;

        if (n) {
          if (e.keyCode == 27) this.fix(n, n.value, n.vLabel || '');else if (e.keyCode == 40 && !this.app.vis(this.win)) this.find(e);else if (e.keyCode == 38 || e.keyCode == 40) this.hiliteNext(n, e.keyCode == 38);else if (e.keyCode == 13 && n.vCur) {
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
          var u = n.dataset.url || '';
          if (n.value.length > 0 && u) location.href = encodeURI(decodeURI(u).replace(/\{id\}/, n.value));
        }
      } // update chain

    }, {
      key: "updateChain",
      value: function updateChain(n) {
        var m = this.app.q(n.dataset.chain || '');

        if (m) {
          if (!n.value) this.setOptions(m, []);else {
            var u = (m.dataset.list || '').replace(/\{q\}/, n.value);
            if (m.vCache && m.vCache[u]) this.setOptions(m, m.vCache[u]);else this.app.fetch(u, this.onChainData.bind(this, u, m));
          }
        }
      }
    }, {
      key: "onChainData",
      value: function onChainData(u, n, req) {
        var d = this.app.parse(req.responseText);

        if (d) {
          var h = u.split('#');
          if (!h[1] && d.data) d = d.data;
          d = this.norm(this.app.path(d, h[1] || '', []), h[2], h[3]);
          this.setOptions(n, d);
          this.store(n, u, d);
        } else this.setOptions(n, []);
      }
    }, {
      key: "setOptions",
      value: function setOptions(n, a) {
        var _this5 = this;

        if (n.list) {
          if (n.list) {
            this.app.clr(n.list);
            n.value = '';
            if (a) a.forEach(function (v) {
              return _this5.app.ins('option', '', {
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
            return _this5.app.ins('option', v.nm, {
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
          if (d) n.vCache[u] = d;
        }
      }
    }, {
      key: "norm",
      value: function norm(d, fi, fn, fa) {
        var _this6 = this;

        if (this.app.typeOf(d) !== 'array') return [];
        return d.map(function (v) {
          var _ref2, _v$name;

          return {
            id: _this6.app.path(v, fi || 'id'),
            nm: fn ? _this6.app.path(v, fn) : (_ref2 = (_v$name = v['name']) !== null && _v$name !== void 0 ? _v$name : v['nm']) !== null && _ref2 !== void 0 ? _ref2 : v['title'],
            info: _this6.app.path(v, fa || 'info')
          };
        });
      }
    }]);

    return _default;
  }(_default$a);

  var _default$4 = /*#__PURE__*/function (_Plugin) {
    _inherits(_default, _Plugin);

    var _super = _createSuper(_default);

    function _default() {
      var _this;

      _classCallCheck(this, _default);

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

    _createClass(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        var app = this.app; //wysiwyg

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
          if (e.n.matches(_this2.opt.qEdit)) {
            var z = _this2.getWys(e.n);

            if (z) {
              _this2.up(1, z); // update wysiwyg from area


              if (e.modeAuto) _this2.modeAuto(e.n);
            }
          }
        });
        app.b([window], 'paste', function (e) {
          return _this2.onPaste(e);
        }, true); //adjust

        app.h('input', this.opt.qAdjust, function (e) {
          return _this2.adjust(e.target);
        });
        app.b([window], 'mouseup', function (e) {
          var _e$target$matches, _e$target;

          return (_e$target$matches = (_e$target = e.target).matches) !== null && _e$target$matches !== void 0 && _e$target$matches.call(_e$target, _this2.opt.qAdjust) ? _this2.resized(e.target) : null;
        });
        app.b([window], 'resize', function (e) {
          return _this2.adjustAll();
        });
      }
    }, {
      key: "arrange",
      value: function arrange(_ref) {
        var _this3 = this;

        var n = _ref.n;
        this.app.ee(n, this.opt.qEdit, function (m) {
          return _this3.prepare(m);
        });
        this.app.ee(n, this.opt.qAdjust, function (m) {
          return _this3.setStyle(m);
        });
        this.adjustAll(n);
      }
    }, {
      key: "setFocus",
      value: function setFocus(l) {
        var a = this.app.q('#' + l.htmlFor);
        var z = a ? this.getWys(a) : null;
        if (z && this.app.vis(z)) z.focus();
      }
    }, {
      key: "prepare",
      value: function prepare(n) {
        if (n.dataset.ready) return;
        n.dataset.ready = 1;
        var app = this.app;
        var m = app.ins('nav', '', 'bg',
        /*d*/
        n, -1);
        var mm = app.ins('div', '', {
          className: app.opt.cToggle + ' ' + app.opt.cOff
        }); //let zc = app.ins('div', '', 'subinput', n, 1)

        var z = app.ins('div', '', {
          className: app.opt.cToggle + ' bord pad subinput edit-wysiwyg'
        }, n, 1
        /*zc*/
        );
        z.setAttribute('contenteditable', true); //    z.theArea = n;
        //    n.theWys = z;

        n.classList.add(app.opt.cToggle);
        if (n.id) z.id = 'wys-' + n.id;
        var t = (n.dataset.tools || this.opt.tools).split('');
        var to = m;

        for (var i in t) {
          var b = this.btn[t[i]];
          app.ins('a', b[2], {
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

        this.up(1, this.getWys(n));
        this.modeAuto(n);
      }
    }, {
      key: "getNav",
      value: function getNav(z) {
        return z.previousElementSibling.previousElementSibling;
      }
    }, {
      key: "getArea",
      value: function getArea(z) {
        return z.previousElementSibling;
      }
    }, {
      key: "getWys",
      value: function getWys(a) {
        return a.nextElementSibling;
      }
    }, {
      key: "modeAuto",
      value: function modeAuto(n) {
        var wys = n.dataset.mode;
        if (wys) wys = wys[0] === 'w';else {
          wys = (n.dataset.tools || this.opt.tools).indexOf('/') == -1 || n.value.match(/(>|&\w+;)/) && !n.value.match(/<script/i);
        }
        this.mode(wys, this.getWys(n));
      }
    }, {
      key: "cmd",
      value: function cmd(e, bb
      /*, nn*/
      ) {
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
        var a = this.getArea(z);
        if (w) z.innerHTML = a.value;else a.value = z.innerHTML.replace(/(\shref=")!/ig, ' target="_blank"$1').replace(/(\ssrc="[^"]+#[a-z]*)(\d+%?)"/ig, ' width="$2"$1"'); //.replace(/(\ssrc="[^"]+)#([lrc])"/ig,' class="$2"$1"');

        if (!w) this.app.dispatch(a, ['input', 'change']);
      }
    }, {
      key: "mode",
      value: function mode(w, z) {
        var _this4 = this;

        var a = this.getArea(z);
        this.app.toggle(z, w);
        this.app.toggle(a, !w);

        if (!w) {
          if (z.style.height) a.style.height = z.style.height;else if (a.matches(this.opt.qAdjust)) this.adjust(a);
        }

        this.up(w, z);
        var nav = this.getNav(z); //this.app.ee(nav, 'a', n => (n.hash == '#cmd-src') ? null : this.app.toggle(n, w));//slow

        this.app.ee(nav, 'a', function (n) {
          return n.hash == '#cmd-src' ? null : n.classList[w ? 'remove' : 'add'](_this4.app.opt.cOff);
        }); //faster

        a.theManual = 0;
        a.style.width = '100%';
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
      value: function adjustAll(n) {
        var _this5 = this;

        this.app.ee(n, this.opt.qAdjust, function (m) {
          return _this5.adjust(m);
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
        var _this6 = this;

        var n = e.target.closest('.edit-wysiwyg');
        if (!n) return; //this.app.a(e.clipboardData.items).forEach(i => console.log(i)); // kind: 'file', type: 'image/...'

        var img = this.app.a(e.clipboardData.items).filter(function (i) {
          return i.type.indexOf('image') === 0;
        }).shift();

        if (img) {
          e.preventDefault();
          var reader = new FileReader();

          reader.onload = function (e) {
            return _this6.cmd(n, ['insertimage', e.target.result]);
          };

          reader.readAsDataURL(img.getAsFile()); //get blob as data url
          // to upload, use readAsBinaryString, or put it into an XHR using FormData
        }
      }
    }]);

    return _default;
  }(_default$a);

  var _default$3 = /*#__PURE__*/function (_Plugin) {
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
        cBtn: 'btn pad',
        qAlert: 'a.alert',
        qDialog: 'a.dialog, input.dialog, [type="submit"].dialog'
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
        if (h.nodeType) h = h.dataset.head || '';
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

        this.app.toggle(this.dlg, true, false, 'dlg-' + this.app.seq());
      }
    }, {
      key: "closeDialog",
      value: function closeDialog() {
        //this.app.pf('toggle', 'unpop')
        this.app.toggle(this.dlg, false);
      }
    }, {
      key: "callback",
      value: function callback(f, v, e) {
        if (!f.call(this, v, e)) this.closeDialog(); // close dialog unless callback returns true
      }
    }, {
      key: "onClick",
      value: function onClick(e) {
        var _this4 = this;

        var n = e.recv;

        if (n.form && !n.form.checkValidity()) {
          this.app.fire('validate', e);
          return;
        }

        e.preventDefault();
        var app = this.app;
        var h = (n.dataset.head || '').replace(/%([\w\-]+)%/g, function (m, a) {
          return n.getAttribute(a);
        });
        var icon = n.dataset.pic || '';
        var p = n.dataset.prompt || '';
        var t = (n.dataset.caption || n.title || p || '!').replace(/%([\w\-]+)%/g, function (m, a) {
          return n.getAttribute(a);
        });
        var rev = ('reverse' in n.dataset);
        var src = n.dataset.src;
        src = src ? app.q(src) : null;
        if (!src && n.form) src = n.form.elements[p];
        var v = null;
        var al = n.matches(this.opt.qAlert);
        var def = p ? src ? src.value : Url.get(p, n) || '' : null;
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
        this.dlg.vRel = n;
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
                u = Url.build(n, a);
              }
              if (n.target == '_blank') window.open(u, n.target);else location.href = u;
            }
      }
    }]);

    return _default;
  }(_default$a);

  var _default$2 = /*#__PURE__*/function (_Plugin) {
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
        qLinks: 'a.pic:not([href^="#"])'
      };
      return _this;
    }

    _createClass(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.app.h('click', this.opt.qGal, function (e) {
          return _this2.next(e);
        });
        this.app.listen('hashchange', function (e) {
          return _this2.onHash(e);
        });
        this.app.listen('keydown', function (e) {
          return _this2.onKey(e);
        });
        this.app.h('click', this.opt.qGallery + ' ' + this.opt.qLinks, function (e) {
          return _this2.prepareByClick(e);
        });
        this.app.e(this.opt.qGallery, function (n) {
          return _this2.prepare(n);
        }); // show by initial hash
      }
    }, {
      key: "prepareByClick",
      value: function prepareByClick(e) {
        //e.preventDefault();
        this.prepare(e.target.closest(this.opt.qGallery));
      }
    }, {
      key: "prepare",
      value: function prepare(n, opt) {
        if (n.dataset.ready) return;
        n.dataset.ready = 1;
        opt = opt ? _objectSpread2(_objectSpread2({}, this.opt), opt) : this.opt;
        var app = this.app;
        var g = app.ins('div', '', {
          className: opt.cGal
        });
        var a = app.qq(opt.qLinks, n);
        var z = a.length;
        if (n.vGal) n.vGal.parentNode.removeChild(n.vGal);
        var first = 0;

        for (var i = 0; i < z; i++) {
          if ((a[i].getAttribute('href') || '').substr(0, 1) != '#') {
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

            var num = opt.num;
            if ('num' in n.dataset) num = !!n.dataset.num;
            var t = a[i].title || a[i].dataset.tip || '';
            p.dataset.caption = num ? i + 1 + '/' + z + (t ? ' - ' + t : '') : '';
            a[i].href = '#' + p.id;
          }
        }

        app.x(g);
        document.body.appendChild(g);
        n.vGal = g;
      }
    }, {
      key: "next",
      value: function next(e) {
        if (e.defaultPrevented) return;
        var n = e.recv;
        var back = n && e.clientX > 0
        /* not Enter key */
        && e.clientX < n.clientWidth / 3;
        this.browse(n, back);
        e.preventDefault();
      }
    }, {
      key: "browse",
      value: function browse(n, back) {
        // by position

        /*
        const p = back
          ? n.previousElementSibling || this.app.qq('a[id]', n.parentNode).pop()
          : (n.nextElementSibling?.id ? n.nextElementSibling : n.parentNode.firstChild);
        */
        // by hash
        var p = this.app.q(back ? 'a[href="#' + n.id + '"]' : n.hash, n.parentNode);
        if (p.id) location.hash = '#' + p.id; //else location.hash = n.hash;
        //return p.id;
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
  }(_default$a);

  var _default$1 = /*#__PURE__*/function (_Plugin) {
    _inherits(_default, _Plugin);

    var _super = _createSuper(_default);

    function _default() {
      _classCallCheck(this, _default);

      return _super.call(this, 'fetch'); // this.opt = {}
    }

    _createClass(_default, [{
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

        var u = n.getAttribute('href') || '';
        this.fetch(u, function (r) {
          return f ? f(n, r) : _this2.receive(u, n, r);
        });
      }
    }, {
      key: "fetch",
      value: function fetch(url, f) {
        var _this3 = this;

        if (url && this.app.typeOf(url) === 'array') url = Url.build(url[0], url[1]);
        var request = new XMLHttpRequest();
        request.addEventListener('load', function (e) {
          _this3.app.fire('response', {
            request: request
          });

          if (f) f(request);
        });
        this.app.fire('request', {
          request: request
        });
        request.open('GET', url);
        request.send();
      }
    }, {
      key: "receive",
      value: function receive(u, n, req, e) {
        // this.app.parse(req.responseText)
        var d = this.app.q(n.dataset.target);

        if (req.status == '200') {
          var h = u.split('#');
          var t = req.responseText;
          t = h[1] ? JSON.stringify(this.app.path(this.app.parse(t), h[1])) : t; // console.log(h,t)

          if (d) {
            d.innerHTML = t;
            var dlg = d.closest('.dlg[id]');
            if (dlg) this.app.toggle(dlg, true);
          } else {
            this.app.dialog(n, t);
          }
        } else console.error('XHTTP request failed', req); //this.app.fire('after', e);

      }
    }]);

    return _default;
  }(_default$a);

  var _default = /*#__PURE__*/function (_Plugin) {
    _inherits(_default, _Plugin);

    var _super = _createSuper(_default);

    function _default() {
      var _this;

      _classCallCheck(this, _default);

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

    _createClass(_default, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        //const q = this.opt.qValidate;
        //const dh = '[' + this.opt.aHint + ']';
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
          return _this2.customValidate(e);
        }); //custom validation

        this.app.listen('validate', function (e) {
          return _this2.customValidate(e);
        });
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
          if (n.type == 'radio') this.app.ee(n.form, '[name="' + n.name + '"]', function (m) {
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
      key: "customValidate",
      value: function customValidate(e) {
        var f = e.target.closest('form');
        if (f && f.getAttribute('novalidate')) this.validateForm(f, e);
      }
    }, {
      key: "validateForm",
      value: function validateForm(n, e) {
        if (e) n.classList.remove(this.opt.cUnhint);
        var ok = n.checkValidity(); // !== false

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
          //this.app.ee(n, '[type="submit"]', m => m.disabled = !ok);//if no cUnhint
          this.app.ee(n, '[type="submit"]', function (m) {
            return m.classList[ok ? 'remove' : 'add']('bg-n');
          }); //if cUnhint used
        }
      }
    }]);

    return _default;
  }(_default$a);

  var app = new _default$b(); // app.plug(Code)

  app.plug(_default$9);
  app.plug(_default$8);
  app.plug(_default$7);
  app.plug(_default$6);
  app.plug(_default$5);
  app.plug(_default$4);
  app.plug(_default$3);
  app.plug(_default$2);
  app.plug(_default$1);
  app.plug(_default); // const opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}}

  app.b([document], 'DOMContentLoaded', function (e) {
    return app.init();
  }); // if (typeof module !== 'undefined') module.exports = app

  if (window) window.d1 = app;

}());
