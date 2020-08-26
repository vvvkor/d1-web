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
    this.fetch(this.app.attr(n, 'href', ''), r => f ? f(n, r) : this.receive(n, r));
  }

  fetch (url, f) {
    let req = new XMLHttpRequest();
    if (f) req.addEventListener('load', e => { f(req); this.app.fire('after'); } );
    req.open('GET', url);
    req.send();
  }

  receive (n, req, e) {
    // JSON.parse(req.responseText)
    let d = this.app.q(this.app.attr(n, 'data-target', ''));
    if (req.status == '200') {
      if (d) {
        d.innerHTML = req.responseText;
        let dlg = d.closest('.dlg[id]');
        if (dlg) this.app.pf('toggle', 'toggle', dlg, true)
      }
      else {
        this.app.pf('dialog', 'openDialog', n, req.responseText)
      }
    }
    else console.error('XHTTP request failed', req);
    //this.app.fire('after', e);
  }

}