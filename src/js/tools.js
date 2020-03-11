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
    cMem: 'mem',
    qTop: 'h2[id], h3[id], h4[id], h5[id], h6[id]', // h1[id],
    minDesktop: 900
  };

  this.init = function () {
    this.opt.qSet = '[' + this.opt.aSet + '], [' + this.opt.aNodes + ']';
    this.opt.qSetClick = 'a[' + this.opt.aSet + ']';
    this.opt.qSetChange = 'input[' + this.opt.aNodes + '], select[' + this.opt.aNodes + ']';
    app.e('table[class]', n => this.alignCells(n));
    app.e(this.opt.qSet, n => this.restore(n));
    app.e(this.opt.qSet, n => this.toggleClass(n));
    app.b(this.opt.qSetChange, 'change', e => this.toggleClass(e.target));
    app.e(this.opt.qTop, n => this.addTopLink(n));
    app.listen('click', e => this.onClick(e));
    this.onResize();
    app.b([window], 'resize', e => this.onResize(e));
  }

  this.onClick = function(e){
    let n = e.target;
    let a = n.closest(this.opt.qSetClick);
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
  
  this.store = function(n, v){
    if(n && (n.id || n.name) && n.classList.contains(this.opt.cMem)){
      localStorage.setItem('set#' + (n.id || '#' + n.name), v);
    }
  }
  
  this.restore = function(n){
    if(n && (n.id || n.name) && n.classList && n.classList.contains(this.opt.cMem)){
      let v = localStorage.getItem('set#' + (n.id || '#' + n.name));
      if(v !== null){
        let t = n.tagName;
        if(t=='A') n.classList[v ? 'add' : 'remove'](app.opt.cAct);
        else if(t=='SELECT') n.value = v;
        else if(n.type == 'checkbox') n.checked = !!v;
        else if(n.type == 'radio') n.checked = (n.value == v);
      }
    }
  }
  
  this.setClass = function(n, on, m, c){
    app.dbg(['setclass', m, c]);
    let sel = (n.type == 'radio' || n.tagName=='SELECT');
    let u = sel ? null /*''*/ : app.attr(n, this.opt.aUnset);
    let attr = app.attr(n, this.opt.aAttr) || 'class';
    if(attr !== 'class'){
      let v = on ? c : (u || '');
      if(v) m.setAttribute(attr, v);
      else m.removeAttribute(attr);
    }
    else if(u !== null) m.className = on ? c : (u || '');
    else{
      if(sel){
        //unset other select/radio values
        let u = (n.type == 'radio')
          ? app.qq('input[type="radio"][name="' + n.name + '"]').map(nn => /*app.attr(nn, this.opt.aSet, '')*/nn.value).join(' ')
          : app.qq('option', n).map(nn => nn.value).join(' ');
        u.split(/\s+/).filter(cc => cc).forEach(cc => m.classList.remove(cc));
      }
      c.split(/\s+/).filter(cc => cc).forEach(cc => m.classList[on ? 'add' : 'remove'](cc));
    }
    n.classList[on ? 'add' : 'remove'](app.opt.cAct);
    this.store(n, sel ? n.value : ((n.type=='checkbox' ? n.checked : n.classList.contains(app.opt.cAct)) ? '1' : ''));
  }

  this.toggleClass = function(n, e) {
    if(n.type == 'radio' && !n.checked) return;
    let box = (n.type == 'checkbox' || n.type == 'radio');
    let sel = (n.tagName == 'SELECT' || n.type == 'radio');
    let q = app.attr(n, this.opt.aNodes, n.hash);
    let c = sel ? n.value : app.attr(n, this.opt.aSet);
    let on = sel ? true : (box ? n.checked : n.classList.contains(app.opt.cAct));
    if(e && !box && !sel){
      on = !on;
      e.preventDefault();
      e.stopPropagation();
    }
    //app.dbg(['setclass?', c, on, q, e, box, sel]);
    if (c !== null){
      app.e(q, m => this.setClass(n, on, m, c));
      app.fire('updated', {q: q});
    }
  }

  this.addTopLink = function(n){
    let d = app.ins('div', '', {});
    while(n.firstChild) d.appendChild(n.firstChild);
    n.appendChild(d);
    d.style.position = 'relative';
    d.style.paddingRight = '1em';
    let a = app.ins('a', app.i('up', '&uarr;'), {href:'#', className: 'small close text-n hide-print'}, d  );
    //n.style.position = 'relative';
    //let a = app.ins('a', app.i('up', '&uarr;'), {href:'#', className: 'small close text-n hide-print'}, n);
  }

  this.onResize = function() {
    let m = (window.innerWidth <= this.opt.minDesktop);
    m
      ? app.e('[data-class-mobile]', n => n.className = app.attr(n, 'data-class-mobile', ''))
      : app.e('[data-class-desktop]', n => n.className = app.attr(n, 'data-class-desktop', ''));
  }

})();