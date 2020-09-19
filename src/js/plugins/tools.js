/*! tools - miscellaneous utilities (toggle class and attributes) */

import Plugin from './plugin.js';

export default class extends Plugin {

  constructor() {
    super('tools')

    this.opt = {
      dNodes: 'nodes', // data-nodes
      dSet: 'set',
      dUnset: 'unset',
      dAttr: 'attr',
      cMem: 'mem',
      qHeading: 'h2[id], h3[id], h4[id], h5[id], h6[id]', // h1[id],
      minDesktop: 900
    };
  }
  
  init() {
    const app = this.app
    this.opt.qSet = '[data-' + this.opt.dSet + '], [data-' + this.opt.dNodes + ']';
    this.opt.qSetClick = 'a[data-' + this.opt.dSet + ']';
    this.opt.qSetChange = 'input[data-' + this.opt.dNodes + '], select[data-' + this.opt.dNodes + ']';
    app.e('table[class]', n => this.alignCells(n));
    app.e(this.opt.qSet, n => this.restore(n));
    app.e(this.opt.qSet, n => this.toggleClass(n));
    app.e(this.opt.qHeading, n => this.smartHeading(n));
    app.h('change', this.opt.qSetChange, e => this.toggleClass(e.target));
    app.h('click', this.opt.qSetClick, e => this.toggleClass(e.recv, e));
    this.onResize();
    app.b([window], 'resize', e => this.onResize(e));
  }

  alignCells(n) {
    let m = n.className.match(/\b[lcr]\d\d?\b/g);
    if (m) {
      for (let i = 0; i < m.length; i++) {
        this.app.e(this.app.qq('tr>*:nth-child(' + m[i].substr(1) + ')', n), c => c.classList.add(m[i].substr(0, 1)) );
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
        if (t == 'A') n.classList[v ? 'add' : 'remove'](this.app.opt.cAct);
        else if (t == 'SELECT') n.value = v;
        else if (n.type == 'checkbox') n.checked = !!v;
        else if (n.type == 'radio') n.checked = (n.value == v);
      }
    }
  }
  
  setClass(n, on, m, c) {
    this.app.dbg(['setclass', m, c]);
    let sel = (n.type == 'radio' || n.tagName == 'SELECT');
    let u = sel ? null /*''*/ : n.dataset[this.opt.dUnset];
    let attr = n.dataset[this.opt.dAttr] || 'class';
    if (attr !== 'class') {
      let v = on ? c : (u || '');
      if (v) m.setAttribute(attr, v);
      else m.removeAttribute(attr);
    }
    else if (u !== null && u !== undefined) m.className = on ? c : (u || '');
    else {
      if (sel) {
        //unset other select/radio values
        let u = (n.type == 'radio')
          ? this.app.qq('input[type="radio"][name="' + n.name + '"]').map(nn => /*(nn.dataset[this.opt.dSet] || '')*/nn.value).join(' ')
          : this.app.qq('option', n).map(nn => nn.value).join(' ');
        u.split(/\s+/).filter(cc => cc).forEach(cc => m.classList.remove(cc));
      }
      c.split(/\s+/).filter(cc => cc).forEach(cc => m.classList[on ? 'add' : 'remove'](cc));
    }
    n.classList[on ? 'add' : 'remove'](this.app.opt.cAct);
    this.store(n, sel ? n.value : ((n.type == 'checkbox' ? n.checked : n.classList.contains(this.app.opt.cAct)) ? '1' : ''));
  }

  toggleClass(n, e) {
    if (n.type == 'radio' && !n.checked) return;
    let box = (n.type == 'checkbox' || n.type == 'radio');
    let sel = (n.tagName == 'SELECT' || n.type == 'radio');
    let q = n.dataset[this.opt.dNodes] || n.hash;
    let c = sel ? n.value : n.dataset[this.opt.dSet];
    let on = sel ? true : (box ? n.checked : n.classList.contains(this.app.opt.cAct));
    if (e && !box && !sel) {
      on = !on;
      e.preventDefault();
      e.stopPropagation();
    }
    //this.app.dbg(['setclass?', c, on, q, e, box, sel]);
    if (c !== null && c !== undefined) {
      this.app.e(q, m => this.setClass(n, on, m, c));
      this.app.fire('update', {q: q});
    }
  }

  smartHeading(n) {
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
    let m = (window.innerWidth <= this.opt.minDesktop);
    m
      ? this.app.e('[data-class-mobile]', n => n.className = (n.dataset.classMobile || ''))
      : this.app.e('[data-class-desktop]', n => n.className = (n.dataset.classDesktop || ''));
  }

}