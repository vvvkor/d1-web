/*! items - copy, hide, delete items */

import Plugin from './plugin.js';

export default class extends Plugin {

  constructor() {
    super('items')

    this.opt = {
      qItem: '.item' // ul, tr, div
    };
  }

  init() {
    this.app.h('click', 'a[href^="#"]', e => this.onClick(e));
  }

  onClick(e) {
    const n = e.recv;
    if (n && n.hash) {
      const q = n.dataset.item;
      const d = q ? this.app.q(q) : e.target.closest(this.opt.qItem);
      if (d) {
        const cont = d.parentNode;
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
  
  setInputs(n, src, clear) {
    this.app.ee(n, 'select', m => m.selectedIndex = clear ? 0 : this.app.q('select[name="' + m.name + '"]', src).selectedIndex);
    if (clear) this.app.ee(n, 'input, textarea', m => m.type == 'checkbox' ? m.checked = false : m.value = '');
  }
  
  process(n, x, before) {
    if (['copy', 'add', 'del', 'delete', 'delall', 'clear', 'hide'].indexOf(x) == -1) return false;
    const e = {n, a: x};
    this.app.fire('beforeitem', {n, a: x});
    if (x == 'copy' || x == 'add') {
      if (before === undefined) before = n.classList.contains(this.app.opt.cHide);
      const m = n.parentNode.insertBefore(n.cloneNode(true), before ? n : n.nextSibling);
      m.classList.remove(this.app.opt.cHide);
      m.removeAttribute('id');
      this.setInputs(m, n, x == 'add');
      this.app.fixIds(m);
      this.app.arrange(m);
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
    this.app.fire('item', e);
    return true;
  }
  
}