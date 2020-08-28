/*! fetch - asynchronous requests */

// import toggle from './toggle.js'
// import dialog from './dialog.js'

import Plugin from './plugin.js'

export default class extends Plugin {

  constructor () {
    super('fetch')
    // this.opt = {}
  }

  init () {
    this.app.h('click', 'a[data-target]', e => this.onClick(e));
  }

  onClick (e){
    e.preventDefault();
    this.fetchBy(e.recv);
  }

  fetchBy (n, f) {
    this.fetch(n.getAttribute('href') || '', r => f ? f(n, r) : this.receive(n, r));
  }

  fetch (url, f) {
    let req = new XMLHttpRequest();
    if (f) req.addEventListener('load', e => { f(req); this.app.fire('after'); } );
    req.open('GET', url);
    req.send();
  }

  receive (n, req, e) {
    // this.app..parse(req.responseText)
    let d = this.app.q(n.dataset.target);
    if (req.status == '200') {
      if (d) {
        d.innerHTML = req.responseText;
        let dlg = d.closest('.dlg[id]');
        if (dlg) this.app.toggle(dlg, true)
      }
      else {
        this.app.dialog(n, req.responseText)
      }
    }
    else console.error('XHTTP request failed', req);
    //this.app.fire('after', e);
  }

}