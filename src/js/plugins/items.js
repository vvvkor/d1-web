/*! items - copy, hide, delete items */

import Plugin from './plugin.js';

export default class extends Plugin {

  constructor() {
    super('items')

    this.opt = {
      dItem: 'item', // data-item
      qItem: '.item' // ul, tr, div
    };
  }

  init() {
    this.app.h('click', 'a[href^="#"]', e => this.onClick(e));
  }

  onClick(e) {
    let n = e.recv;
    if (n && n.hash) {
      let q = n.dataset[this.opt.dItem];
      let d = q ? this.app.q(q) : e.target.closest(this.opt.qItem);
      if (d) {
        let cont = d.parentNode;
        if (this.process(d, n.hash.substr(1), !!q)) {
          this.app.fire('update', {n: cont});
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }
  }
  
  items(n) {
    //return this.app.qq(this.opt.qItem, n).filter(n => !n.classList.contains(this.app.opt.cHide));
    return this.app.a(n.children)
      .filter(n => n.matches(this.opt.qItem))
      .filter(n => !n.classList.contains(this.app.opt.cHide));
  }
  
  process(n, x, before) {
    if (['copy', 'del', 'delete', 'delall', 'clear', 'hide'].indexOf(x) == -1) return false;
    this.app.fire('beforeitem', {n: n, a: x});
    let e = {n: n, a: x};
    if (x == 'copy') {
      if (before === undefined) before = n.classList.contains(this.app.opt.cHide);
      let m = n.parentNode.insertBefore(n.cloneNode(true), before ? n : n.nextSibling);
      m.classList.remove(this.app.opt.cHide);
      m.removeAttribute('id');
      this.app.e(this.app.qq('[id]', m), i => this.fixId(i, m));
      e.p = e.n; // prototype
      e.n = m; // new node
    }
    else if (x == 'del') {
      e.p = n.parentNode;
      if (this.items(n.parentNode).length>1) n.parentNode.removeChild(n);
    }
    else if (x == 'delete') {
      e.p = n.parentNode;
      n.parentNode.removeChild(n);
    }
    else if (x == 'delall') {
      this.items(n).forEach(m => m.parentNode.removeChild(m));
    }
    else if (x == 'clear') {
      this.app.clr(n);
    }
    else if (x == 'hide') {
      n.classList.add(this.app.opt.cHide);
    }
    this.app.fire('afteritem', e);
    return true;
  }
  
  fixId(i, m) {
    let old = i.id;
    let id = i.id.replace(/-\d+$/, '') + '-' + this.app.seq();
    i.id = id;
    this.app.e(this.app.qq('a[href="#'+ old +'"]', m), a => a.href = '#' + id);
  }

}