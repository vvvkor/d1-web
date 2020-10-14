/*! fetch - asynchronous requests */

// import toggle from './toggle.js'
// import dialog from './dialog.js'

import Plugin from './plugin.js'

export default class extends Plugin {

  constructor() {
    super('fetch')
    // this.opt = {}
  }

  init() {
    this.app.h('click', 'a[data-target]', e => this.onClick(e));
  }

  onClick(e) {
    e.preventDefault();
    this.fetchBy(e.recv);
  }

  fetchBy(n, f) {
    const u = n.getAttribute('href') || '';
    this.fetch(u, r => f ? f(n, r) : this.receive(u, n, r));
  }

  fetch(url, f) {
    let req = new XMLHttpRequest();
    if (f) req.addEventListener('load', e => { f(req); this.app.fire('fetch', req); } );
    req.open('GET', url);
    req.send();
  }

  receive(u, n, req, e) {
    // this.app..parse(req.responseText)
    let d = this.app.q(n.dataset.target);
    if (req.status == '200') {
      const h = u.split('#');
      let t = req.responseText;
      t = h[1] ? JSON.stringify(this.app.path(this.app.parse(t), h[1])) : t;
      // console.log(h,t)
      if (d) {
        d.innerHTML = t;
        let dlg = d.closest('.dlg[id]');
        if (dlg) this.app.toggle(dlg, true)
      }
      else {
        this.app.dialog(n, t)
      }
    }
    else console.error('XHTTP request failed', req);
    //this.app.fire('after', e);
  }

}