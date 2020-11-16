/*! app - core of d1-web */

// (() => {
// const main = new (function () {

export default class {

  constructor() {
    this.sequence = 0
    this.plugins = {}
    this.handlers = {}
    
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
    }
  }

  init(opt) {
    //console.time('start');
    document.body.classList.add(this.opt.cJs) // prepare body: anti-hover, anti-target
    this.fire('start')
    //options
    if (!opt) {
      opt = document.body.dataset.d1
      if (opt) opt = this.parse(opt)
    }
    this.setOpt(opt)
    this.dbg(['opt', this.opt])
    this.fire('options')

    this.initPlugins() // plugins

    // bind events
    this.b([window], 'hashchange', e => this.on('hashchange', e)) // on window
    this.b([document], ['invalid', 'focus', 'blur'], e => this.on(e.type, e), true)//useCapture
    this.b([document], ['click', 'keydown', 'input', 'change', 'submit'], e => this.on(e.type, e))

    if (location.hash) this.on('hashchange')
    this.fire('after')
    this.fire('ready')
  }

  // event delegation
  // https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/
  on(t, e) {
    this.fire('before', e)
    this.fire(t, e)
    //this.fire(t + 'ed', e)
    //if (!e || !e.defaultPrevented)
    this.fire('after', e)
  }
  
  arrange(n) {
    if (n) this.fire('arrange', {n});
  }

  //plugins

  setOpt(opt) {
    if (opt) Object.keys(opt)/*.filter(k => k != 'plug')*/.forEach(k => this.opt[k] = opt[k])
  }

  plug(c, n) {
    const p = new c()
    this.plugins[n || p.name] = p
  }

  initPlugins() {
    if (this.opt.disable) this.opt.disable.forEach(p => delete this.plugins[p])
    this.dbg(['plugins', this.plugins])
    Object.keys(this.plugins).forEach(k => {
      this.plugins[k].install(this)
      this.fire('plugin', {name: k, plugin: this.plugins[k]})
    })
    this.fire('init')
    this.fire('arrange') // , {n: document.body}
    this.fire('plugins')
  }
  
  // call method of plugin
  pf(p, f, ...a) {
    if (this.plugins[p] && this.plugins[p][f]) this.plugins[p][f](...a)
    else this.dbg(['no plugin function', p + '.' + f + '()'], -1)
  }
  
  toggle(...a) {
    this.pf('toggle', 'toggle', ...a)
  }

  fetch(...a) {
    this.pf('fetch', 'fetch', ...a)
  }

  dialog(...a) {
    this.pf('dialog', 'openDialog', ...a)
  }

  //events

  fire(et, e) {
    e = e ?? {}
    if (!e.type) e.type = et
    this.dbg(['fire ' + et, e])
    if (this.handlers[et]) this.handlers[et].forEach(h => e?.unfire ? null : h.call(this, e))
  }
  
  listen(et, f) {
    //if (!this.handlers[et]) this.handlers[et] = []
    //this.handlers[et].push(f)
    this.h(et, '', f)
  }

  //handle
  h(et, s, f, before) {
    if (et instanceof Array) et.forEach(ett => this.h(ett, s, f, before))
    else {
      if (!this.handlers[et]) this.handlers[et] = []
      this.handlers[et][before ? 'unshift' : 'push'](e => {
        if (s) e.recv = e.target.closest ? e.target.closest(s) : null
        if (!s || e.recv) f(e)
      })
    }
  }
  
  dispatch(n, et, p) {
    // {view: window, bubbles: true, cancelable: true, composed: false}
    if (!p) p = {bubbles: true, cancelable: true, view: window}
    if (typeof(Event) === 'function') { //-ie
      if (et instanceof Array) et.forEach(ett => n.dispatchEvent(new Event(ett, p)))
      else n.dispatchEvent(new Event(et, p))
    }
  }

  //utils

  // debug
  
  isDebug(l) {
    return (this.opt.debug > (l || 0) || location.href.indexOf('d1debug') != -1)
  }
  
  dbg(s, l, e) {
    if (this.isDebug(l)) console[e || l<0 ? 'error' : 'log'](s)
  }

  // sequence for IDs of generated nodes
  seq() {
    return ++this.sequence
  }

  // convert to array
  a(c) {
    return c ? Array.prototype.slice.call(c) : c
  }
  
  // get object item by path
  path(r, p, def) {
    if (p) {
      if (this.typeOf(p) === 'string') p = p.split('.')
      for (let i=0; i<p.length; i++) if (p[i] || p[i] === 0) {
        if (r === null || r[p[i]] === undefined) return def
        r = r[p[i]]
      }
    }
    return r
  }

  // find node
  q(s, n) {
    try {
      return (n || document).querySelector(s)
    }
    catch (e) {
      return null
    }
  }

  // find nodes
  qq(s, n) {
    try {
      return this.a((n || document).querySelectorAll(s))
    }
    catch (e) {
      return []
    }
  }
  
  next(n, s, prev) {
    while (n = n[prev ? 'previousElementSibling' : 'nextElementSibling']) if (n.matches(s)) return n
  }
  
  nn(q) {
    if (!q) return []
    else if (typeof q === 'string') return this.qq(q)
    else if (q.tagName) return [q]
    else return this.a(q)
  }

  // add event listener
  b(q, et, f, capt) {
    if (!et) this.e(q, f)
    if (f) this.nn(q).forEach(n => et instanceof Array
      ? et.forEach(ett => n.addEventListener(ett, e => f(e), capt))
      : n.addEventListener(et, e => f(e) /*f.bind(this)*/, capt)
    )
  }

  // execute for each node
  e(q, f) {
    if (f) this.nn(q).forEach(n => f.call(this, n))
  }

  // execute for each node inside some node
  ee(n, q, f) {
    this.e(this.qq(q, n), f)
  }
  
  // add/remove classes
  cls(n, c, del) {
    if (this.typeOf(c) !== 'array') c = (c || '').split(/\s+/).filter(x => x);
    n.classList[del ? 'remove' : 'add'](...c);
  }

  typeOf(v) {
    return Object.prototype.toString.call(v).slice(8, -1).toLowerCase()
  }
  
  parse(j, def) {
    let r = ''
    try {
      r = JSON.parse(j)
    }
    catch (e) {
      this.dbg(['JSON parse failed', j], -1)
      r = def === true ? j : (def === undefined ? null : def)
    }
    return r
  }
  
  // insert node
  //pos: -1=before, false=prepend, 0=append(default), 1=after
  ins(tag, t, attrs, n, pos) {
    const c = document.createElement(tag || 'span')
    if (this.typeOf(t) === 'array') t.forEach(m => m.nodeType ? c.appendChild(m) : c.innerHTML += m)
    else if (t && t.nodeType) c.appendChild(t)
    else if (t) c.innerHTML = t
    if (attrs) {
      if (this.typeOf(attrs) === 'string') attrs = {className: attrs}
      for (let i in attrs) {
        if (attrs[i] !== null && attrs[i] !== undefined) {
          if (i.match(/-/)) c.setAttribute(i.replace(/^-/, ''), attrs[i])
          else c[i] = attrs[i]
        }
      }
    }
    return n
      ? (pos
          ? n.parentNode.insertBefore(c, pos<0 ? n : n.nextSibling)
          : (pos === false ? n.insertBefore(c, n.firstChild) : n.appendChild(c))
        )
      : c
  }
  
  // remove all children
  clr(n) {
    if (n) while (n.firstChild) n.removeChild(n.firstChild)
  }

  // insert close link with icon
  x(d, pos, cls) {
    return this.ins('a', this.i('close', '&#x2715;'), {href: this.opt.hClose, className: (cls || '')}, d, pos)
  }

  // insert icon
  i(ico, alt) {
    return this.plugins.icons
      ? this.plugins.icons.i(ico, alt)
      : this.ins('span', alt || ico)
  }
  
  // get node toggle status
  vis(n) {
    return !n.classList.contains(this.opt.cOff)
  }
  
  // fix clone IDs
  fixIds(m) {
    this.ee(m, '[id]', n => {
      const x = n.id;
      const id = 'id-' + this.seq();
      n.id = id;
      this.ee(m, 'a[href="#'+ x +'"]', a => a.href = '#' + id);
      this.ee(m, 'label[for="'+ x +'"]', a => a.htmlFor = id);
    });
  }

}

// listen to all events
/*
Object.keys(window).forEach(key => {
    if (/^on/.test(key)) window.addEventListener(key.slice(2), e => console.log('EVENT', e.type));
});
*/

/*
if (this.window === this) window[main.name] = main
else module.exports = main
})()
*/