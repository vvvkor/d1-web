/*! items - copy, hide, delete items */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'items';

  this.opt = {
    aItem: 'data-item',
    qItem: '.item' // ul, tr, div
  };

  this.init = function () {
    app.listen('click', e => this.onClick(e));
  }

  this.onClick = function(e){
    let n = e.target.closest('a[href^="#"]');
    if(n && n.hash){
      let q = app.attr(n, this.opt.aItem);
      let d = q ? app.q(q) : e.target.closest(this.opt.qItem);
      if(d){
        let cont = d.parentNode;
        if(this.process(d, n.hash.substr(1)), !!q){
          app.fire('updated', {n: cont});
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }
  }
  
  this.items = function(n){
    //return app.qq(this.opt.qItem, n).filter(n => !n.classList.contains(app.opt.cHide));
    return app.a(n.children)
      .filter(n => n.matches(this.opt.qItem))
      .filter(n => !n.classList.contains(app.opt.cHide));
  }
  
  this.process = function(n, x, before){
    if(['copy', 'del', 'delete', 'delall', 'clear', 'hide'].indexOf(x) == -1) return false;
    d1.fire('beforeitem', {n: n, a: x});
    let e = {n: n, a: x};
    if(x=='copy'){
      if(before === undefined) before = n.classList.contains(app.opt.cHide);
      let m = n.parentNode.insertBefore(n.cloneNode(true), before ? n : n.nextSibling);
      m.classList.remove(app.opt.cHide);
      m.removeAttribute('id');
      app.e(app.qq('[id]', m), i => this.fixId(i, m));
      e.p = e.n; // prototype
      e.n = m; // new node
    }
    else if(x=='del'){
      if(this.items(n.parentNode).length>1) n.parentNode.removeChild(n);
    }
    else if(x=='delete'){
      n.parentNode.removeChild(n);
    }
    else if(x=='delall'){
      this.items(n).forEach(m => m.parentNode.removeChild(m));
    }
    else if(x=='clear'){
      app.clr(n);
    }
    else if(x=='hide'){
      n.classList.add(app.opt.cHide);
    }
    d1.fire('afteritem', e);
    return true;
  }
  
  this.fixId = function(i, m){
    let old = i.id;
    let id = i.id.replace(/-\d+$/, '') + '-' + app.seq();
    i.id = id;
    app.e(app.qq('a[href="#'+ old +'"]', m), a => a.href = '#' + id);
  }

})();