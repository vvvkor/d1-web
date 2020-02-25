/*! fetch - asynchronous requests */

let app = require('./app.js');
let toggle = require('./toggle.js');
let dialog = require('./dialog.js');

module.exports = new(function () {

  "use strict";

  this.name = 'fetch';

  this.opt = {
  };

  this.init = function () {
    app.listen('click', e => this.onClick(e));
  }

  this.onClick = function(e){
    let a = e.target.closest('a[data-target]');
    if(a){
      e.preventDefault();
      this.fetchBy(a);
    }
  }

  this.fetchBy = function(n, f) {
    this.fetch(app.attr(n, 'href'), r => f ? f(n, r) : this.recv(n, r));
  }

  this.fetch = function(url, f) {
    let req = new XMLHttpRequest();
    if (f) req.addEventListener('load', e => { f(req); app.fire('after'); } );
    req.open('GET', url);
    req.send();
  }

  this.recv = function(n, req, e) {
    // JSON.parse(req.responseText)
    let d = app.q(app.attr(n, 'data-target'));
    if (req.status == '200') {
      if (d) {
        d.innerHTML = req.responseText;
        let dlg = d.closest('.dlg[id]');
        if (dlg) toggle.toggle(dlg, true);
      }
      else {
        dialog.initDlg(null, app.attr(n, dialog.opt.aHead), req.responseText);
      }
    }
    else console.error('XHTTP request failed', req);
    //app.fire('after', e);
  }

})();
