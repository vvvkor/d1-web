/*! app - core of d1-web */

// (() => {
//let main = new (function(){

module.exports = new (function(){

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

  this.init = function(opt){
    document.body.classList.add(this.opt.cJs); // prepare body: anti-hover, anti-target
    this.fire('beforeopt');
    //options
    if(!opt){
      opt = this.attr(document.body, 'data-d1');
      if(opt) opt = JSON.parse(opt);
    }
    this.setOpt(this, opt);
    this.dbg(['opt', this.opt]);

    this.initPlugins(opt); // plugins

    // bind events
    this.b([window], 'hashchange', e => this.on('hashchange', e)); // on window
    this.b([document], ['invalid', 'focus', 'blur'], e => this.on(e.type, e), true);//useCapture
    this.b([document], ['click', 'keydown', 'input', 'change', 'submit'], e => this.on(e.type, e));

    if(location.hash) this.on('hashchange')
    this.fire('after');
    this.fire('ready');
  }

  // event delegation
  // https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/
  this.on = function(t, e){
    this.fire('before', e);
    this.fire(t, e);
    //this.fire(t + 'ed', e);
    //if(!e || !e.defaultPrevented) ;
    this.fire('after', e);
  }

  //plugins

  this.setOpt = function(obj, opt){
    let i;
    if(opt) for(i in opt) if(i != 'plug') obj.opt[i] = opt[i];
  }

  this.plug = function(p) {
    this.plugins[p.name] = p;
  }

  this.initPlugins = function(opt){
    if(this.opt.disable) this.opt.disable.forEach(p => delete this.plugins[p]);
    this.dbg(['plugins', this.plugins]);
    Object.keys(this.plugins).forEach(k => (opt && opt.plug && opt.plug[k]) ? this.setOpt(this.plugins[k], opt.plug[k]) : null);
    this.fire('beforeinit');
    Object.keys(this.plugins).forEach(k => this.plugins[k].init());
    this.fire('afterinit');
  }

  //events

  this.fire = function(et, e){
    this.dbg(['fire ' + et, e]);
    if(this.handlers[et]) this.handlers[et].forEach(h => h.call(this, e));
  }
  
  this.listen = function(et, f){
    //if(!this.handlers[et]) this.handlers[et] = [];
    //this.handlers[et].push(f);
    this.h(et, '', f);
  }

  //handle
  this.h = function(et, s, f, before){
    if(et instanceof Array) et.forEach(ett => this.h(ett, s, f, before));
    else{
      if(!this.handlers[et]) this.handlers[et] = [];
      this.handlers[et][before ? 'unshift' : 'push'](e => {
        if(s) e.recv = e.target.closest(s);
        if(!s || e.recv) f(e);
      });
    }
  }
  
  this.dispatch = function(n, et, p){
    // {view: window, bubbles: true, cancelable: true, composed: false}
    if(!p) p = {bubbles: true, view: window};
    if(typeof(Event) === 'function'){ //-ie
      if(et instanceof Array) et.forEach(ett => n.dispatchEvent(new Event(ett, p)));
      else n.dispatchEvent(new Event(et, p));
    }
  }

  //utils

  // debug
  
  this.isDebug = function(l){
    return (this.opt.debug >= (l || 1) || location.href.indexOf('d1debug') != -1);
  }
  
  this.dbg = function(s, l, e){
    if(this.isDebug(l)) console[e ? 'error' : 'log'](s);
  }

  // sequence for IDs of generated nodes
  this.seq = function(){
    return ++this.sequence;
  }

  // convert to array
  this.a = function(c){
    return c ? Array.prototype.slice.call(c) : c;
  }

  // find node
  this.q = function(s, n){
    try{
      return (n || document).querySelector(s);
    }
    catch(e){
      return null;
    }
  }

  // find nodes
  this.qq = function(s, n){
    try{
      let r = (n || document).querySelectorAll(s);
      return this.a(r);
    }
    catch(e){
      return [];
    }
  }
  
  this.next = function(n, s, prev){
    while(n = n[prev ? 'previousElementSibling' : 'nextElementSibling']) if(n.matches(s)) return n;
  }
  
  this.nn = function(q){
    if(!q) return [];
    else if(typeof q === 'string') return this.qq(q);
    else if(q.tagName) return [q];
    else return this.a(q);
  }

  // add event listener
  this.b = function(q, et, f, capt){
    if(!et) this.e(q, f);
    if(f) this.nn(q).forEach(n => et instanceof Array
        ? et.forEach(ett => n.addEventListener(ett, e => f(e), capt))
        : n.addEventListener(et, e => f(e) /*f.bind(this)*/, capt)
      );
  }

  // execute for each node
  this.e = function(q, f){
    if(f) this.nn(q).forEach(n => f.call(this, n));
  }

  // get attribute of node
  this.attr = function(n, a, def){
    return (n && n.hasAttribute(a)) ? n.getAttribute(a) : (def !== undefined ? def : null);
  }

  this.typeOf = function(v){
    return Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
  }
  
  // insert node
  //pos: -1=before, false=prepend, 0=append(default), 1=after
  this.ins = function(tag, t, attrs, n, pos) {
    let c = document.createElement(tag || 'span');
    if (this.typeOf(t) === 'array') t.forEach(m => m.nodeType ? c.appendChild(m) : c.innerHTML += m);
    else if (t && t.nodeType) c.appendChild(t);
    else if (t) c.innerHTML = t;
    if (attrs) {
      for (let i in attrs) {
        if(attrs[i] !== null && attrs[i] !== undefined){
          if(i.match(/-/)) c.setAttribute(i.replace(/^-/, ''), attrs[i]);
          else c[i] = attrs[i];
        }
      }
    }
    return n
      ? (pos
        ? n.parentNode.insertBefore(c, pos<0 ? n : n.nextSibling)
        : (pos===false ? n.insertBefore(c, n.firstChild) : n.appendChild(c))
        )
      : c;
  }
  
  // remove all children
  this.clr = function(n){
    if(n) while(n.firstChild) n.removeChild(n.firstChild);
  }

  // insert close link with icon
  this.x = function(d, pos, cls){
    return this.ins('a', this.i('close', '&#x2715;'), {href: this.opt.hClose, className: (cls || '')}, d, pos);
  }

  // insert icon
  this.i = function(ico, alt){
    return this.plugins.icons
      ? this.plugins.icons.i(ico, alt)
      : this.ins('span', alt || ico);
  }
  
  // get node toggle status
  this.vis = function(n){
    return !n.classList.contains(this.opt.cOff);
  }

  // function

  this.throttle = function(f, ms){
    let p = false, c, a;
    return function ff(){
      if (p) { //2
        c = this;
        a = arguments;
      }
      else{
        f.apply(this, arguments); //1
        p = true;
        setTimeout(() => { //3
          p = false;
          if(a){
            ff.apply(c, a);
            a = c = null;
          }
        }, ms);
      }
    }
  }

  this.delay = function(f, ms, skip){
    let p = null;
    return function ff(){
      if(skip && p) clearTimeout(p);
      p = setTimeout(() => {
        f.apply(this, arguments);
        p = null;
      }, ms);
    }
  }

  // url

  // get url parameter(s) from link node
  this.get = function(a, g){
    if(!a || a.tagName!='A') return null;
    let i, gets={};
    let args = a.search ? a.search.replace(/^\?/, '').split('&') : [];
    for(i=0; i<args.length; i++){
      let v = args[i].split('=');
      gets[v[0]] = decodeURIComponent(v[1]).replace(/\+/, ' ');
    }
    return g ? gets[g] : gets;
    //protocol, host (hostname, port), pathname, search, hash
  }

  // compose url from link node or string, with additional parameters
  this.makeUrl = function(a, args){
    if(!a.tagName) a = this.ins('a', '', {href: a});
    let g = this.get(a);
    Object.keys(args).forEach(k => g[encodeURIComponent(k)] = encodeURIComponent(args[k]));
    let q = Object.keys(g).map(k => k + '=' + g[k]).join('&');
    return a.host
      ? a.protocol + '//' + a.host + a.pathname+(q ? '?' + q : '') + a.hash
      : a.href.replace(/[\?#].*$/, '') + (q ? '?' + q : '') + a.hash; //ie
  }

})();

/*
if (this.window === this) window[main.name] = main;
else module.exports = main;
})();
*/