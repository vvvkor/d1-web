/*! tools - miscellaneous utilities (toggle class and attributes) */

import Plugin from './plugin.js';

export default class extends Plugin {

  constructor() {
    super('tools')

    this.opt = {
      cMem: 'mem',
      qHeading: 'h2[id], h3[id], h4[id], h5[id], h6[id]', // h1[id],
      qSetClick: '[data-set]',
      qSetChange: 'input[data-nodes], select[data-nodes]',
      minDesktop: 900
    };
  }
  
  init() {
    this.app.h('change', this.opt.qSetChange, e => this.toggleClass(e.target));
    this.app.h('click', this.opt.qSetClick, e => this.toggleClass(e.recv, e));
    this.app.b([window], 'resize', e => this.onResize(e));
  }
  
  arrange({n}) {
    const q = this.opt.qSetClick + ', ' + this.opt.qSetChange;
    this.app.ee(n, q, m => this.restore(m));
    this.app.ee(n, 'table[class]', m => this.alignCells(m));
    this.app.ee(n, q, m => this.toggleClass(m));
    this.app.ee(n, this.opt.qHeading, m => this.smartHeading(m));
    this.onResize();
  }

  alignCells(n) {
    let m = n.className.match(/\b[lcr]\d\d?\b/g);
    if (m) {
      for (let i = 0; i < m.length; i++) {
        this.app.ee(n, 'tr>*:nth-child(' + m[i].substr(1) + ')', c => c.classList.add(m[i].substr(0, 1)) );
      }
    }
  }
  
  store(n, v) {
    if (n && (n.id || n.name) && n.classList.contains(this.opt.cMem)) {
      localStorage.setItem('set#' + (n.id || '#' + n.name), v);
    }
  }
  
  restore(n) {
    if (n && (n.id || n.name) && n.classList && n.classList.contains(this.opt.cMem)) {
      let v = localStorage.getItem('set#' + (n.id || '#' + n.name));
      if (v !== null) {
        let t = n.tagName;
        if (t == 'A'){
          n.classList[v ? 'add' : 'remove'](this.app.opt.cAct);
          //this.app.fire('active', {n, on: v}); // dup in setClass()
        }
        else if (t == 'SELECT') n.value = v;
        else if (n.type == 'checkbox') n.checked = !!v;
        else if (n.type == 'radio') n.checked = (n.value == v);
      }
    }
  }
  
  setClass(n, on, m) {
    let add = n.dataset.set ?? n.value;
    this.app.dbg(['setclass', m, add]);
    const sel = (n.type == 'radio' || n.tagName == 'SELECT');
    let del = sel
      ? (n.type == 'radio' //unset other select/radio values
          ? this.app.qq('input[type="radio"][name="' + n.name + '"]').map(nn => nn.value).join(' ')
          : this.app.qq('option', n).map(nn => nn.value).join(' ')
          )
      : (n.dataset.unset || '');
    const attr = n.dataset.attr || 'class';
    
    if (attr !== 'class') {
      const val = on ? add : (del || '');
      if (val) m.setAttribute(attr, val);
      else m.removeAttribute(attr);
    }
    else this.app.cls(m, add, del, !on);
    
    this.app.fire('active', {n, on});
    this.app.fire('switch', {n: m, on, attr, set: add, unset: del});
    this.store(n, sel ? n.value : (on ? 1 : ''));
  }

  toggleClass(n, e) {
    if (n.type == 'radio' && !n.checked) return;
    let box = (n.type == 'checkbox' || n.type == 'radio');
    let sel = (n.tagName == 'SELECT' || n.type == 'radio');
    let p = n.dataset.parent ? n.closest(n.dataset.parent) : null;
    let q = n.dataset.nodes ?? n.hash;
    let on = sel ? true : (box ? n.checked : n.classList.contains(this.app.opt.cAct));
    if (e && !box && !sel) {
      on = !on;
      e.preventDefault();
      e.stopPropagation();
    }
    const nn = q ? this.app.qq(q, p) : [p];
    this.app.e(nn, m => this.setClass(n, on, m));
    this.app.fire('update', {n: nn[0]});
  }
  
  setAttr(n) {
    
  }

  smartHeading(n) {
    if (n.dataset.ready) return;
    n.dataset.ready = 1;
    
    let d = this.app.ins('div', '', {});
    while (n.firstChild) d.appendChild(n.firstChild);
    n.appendChild(d);
    d.style.position = 'relative';
    d.style.paddingRight = '1em';
    this.app.ins('', ' ', {}, d);
    this.app.ins('a', '#', {href: '#' + n.id, className: 'small text-n inact  hide-print'}, d);
    this.app.ins('a', this.app.i('asc', '&uarr;'), {href: '#', className: 'small close text-n inact hide-print'}, d);
    //n.style.position = 'relative';
    //let a = this.app.ins('a', this.app.i('asc', '&uarr;'), {href:'#', className: 'small close text-n hide-print'}, n);
  }

  onResize() {
    let m = (window.innerWidth < this.opt.minDesktop);
    m
      ? this.app.e('[data-class-mobile]', n => n.className = (n.dataset.classMobile || ''))
      : this.app.e('[data-class-desktop]', n => n.className = (n.dataset.classDesktop || ''));
  }

}