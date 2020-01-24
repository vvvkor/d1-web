/*! tools - miscellaneous utilities */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'tools';

  this.opt = {
    aNodes: 'data-nodes',
    aSet: 'data-set',
    aUnset: 'data-unset',
    aAttr: 'data-attr',
    qTop: 'h2[id], h3[id], h4[id], h5[id], h6[id]', // h1[id],
    minDesktop: 900
  };

  this.init = function () {
    this.opt.qSet = '[' + this.opt.aSet + '], [' + this.opt.aNodes + ']';
    this.opt.qSetClick = 'a[' + this.opt.aSet + ']';
    this.opt.qSetChange = 'input[' + this.opt.aNodes + '], select[' + this.opt.aNodes + ']';
    app.e('table[class]', n => this.alignCells(n));
    app.e(this.opt.qSet, n => this.toggleClass(n));
    app.b(this.opt.qSetChange, 'change', e => this.toggleClass(e.target));
    app.e(this.opt.qTop, n => this.addTopLink(n));
    app.listen('click', e => this.onClick(e));
    this.onResize();
    app.b([window], 'resize', e => this.onResize(e));
  }

  this.onClick = function(e){
    let n = e.target;
    let a = app.closest(n, this.opt.qSetClick);
    if(a) this.toggleClass(n, e)
  }

  this.alignCells = function(n) {
    let m = n.className.match(/\b[lcr]\d\d?\b/g);
    if (m) {
      for (let i = 0; i < m.length; i++) {
        app.e(app.qq('tr>*:nth-child(' + m[i].substr(1) + ')', n), c => c.classList.add(m[i].substr(0, 1)) );
      }
    }
  }

  this.setClass = function(n, on, m, c){
    app.dbg(['setclass', m, c]);
    let u = (n.type == 'radio' || n.tagName=='SELECT') ? '' : app.attr(n, this.opt.aUnset, false);
    let attr = app.attr(n, this.opt.aAttr) || 'class';
    if(attr !== 'class'){
      let v = on ? c : (u || '');
      if(v) m.setAttribute(attr, v);
      else m.removeAttribute(attr);
    }
    else if(u !== false) m.className = on ? c : (u || '');
    else c.split(/\s+/).filter(cc => cc).forEach(cc => m.classList[on ? 'add' : 'remove'](cc));
    n.classList[on ? 'add' : 'remove'](app.opt.cAct);
  }

  this.toggleClass = function(n, e) {
    if(n.type == 'radio' && !n.checked) return;
    let box = (n.type == 'checkbox' || n.type == 'radio');
    let sel = (n.tagName == 'SELECT');
    let q = app.attr(n, this.opt.aNodes, n.hash);
    let c = sel ? n.value : app.attr(n, this.opt.aSet, false);
    let on = sel ? true : (box ? n.checked : n.classList.contains(app.opt.cAct));
    if(e && !box && !sel){
      on = !on;
      e.preventDefault();
    }
    app.dbg(['setclass?', c, on, q]);
    if (c !== false){
      app.e(q, m => this.setClass(n, on, m, c));
      app.fire('updated', {q: q});
    }
  }

  this.addTopLink = function(n){
    n.style.position = 'relative';
    let a = app.ins('a', app.i('up', '&uarr;'), {href:'#', className: 'close l text-n'}, n);
  }

  this.onResize = function() {
    let m = (window.innerWidth <= this.opt.minDesktop);
    m
      ? app.e('[data-class-mobile]', n => n.className = app.attr(n, 'data-class-mobile'))
      : app.e('[data-class-desktop]', n => n.className = app.attr(n, 'data-class-desktop'));
  }

})();