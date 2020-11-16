/*! filter - filter items */

import Plugin from './plugin.js';

export default class extends Plugin {

  constructor() {
    super('filter')

    this.opt = {
      qFilter: '.filters',
      qItem: '.item',
      dFilter: 'filter',
      cMem: 'mem'
    };
  }
  
  init() {
    this.app.e(this.opt.qFilter, n => this.prepare(n));
    this.app.h('click', 'a[data-' + this.opt.dFilter + ']', e => this.applyControl(e));
    this.app.h('input', ':not(a)[data-' + this.opt.dFilter + ']', e => this.applyControl(e));
  }

  prepare(n) {
    n.vInit = {};
    this.forAttrs(n, (a, k) => n.vInit[k] = n.dataset[a]);
    this.restore(n);
    this.apply(n);
  }
  
  applyControl(e) {
    e.preventDefault();
    const n = e.recv;
    let f = n.closest(this.opt.qFilter);
    let x = (n.dataset[this.opt.dFilter] || '').split(/=/, 2);
    if (f) {
      if (x[0]) {
        let a = this.opt.dFilter + '_' + x[0];
        let v = (n.tagName == 'SELECT' ? n.value : x[1]) || '';
        if (v.substr(0, 1) == '+' && v.length>1) {
          v = v.substr(1);
          let w = (f.dataset[a] || '').split(/;/);
          let i = w.indexOf(v);
          if (i == -1) w.push(v);
          else delete w[i];
          v = w.filter((val, key, arr) => (val !== '' && arr.indexOf(val) === key)).join(';');
        }
        f.dataset[a] = v;
        this.apply(f);
      }
      else {
        this.reset(f);
      }
    }
  }

  apply(n) {
    let f = {};
    this.forAttrs(n, (a, k) => n.dataset[a].length > 0 ? f[k] = n.dataset[a].split(/;/) : null);
    this.app.dbg(['filter', n, f]);
    this.app.ee(n, this.opt.qItem, m => m.classList[this.match(m, f) ? 'remove' : 'add'](this.app.opt.cHide))
    this.app.ee(n, '[data-' + this.opt.dFilter + ']', m => this.setUsed(m, f));
    this.store(n, f);
    this.app.fire('update', {n});
    this.app.fire('filter', {n, f});
  }
  
  match(n, f) {
    let r = true;
    Object.keys(f).forEach(k => (f[k] && f[k].length > 0 && f[k].indexOf(n.dataset[k] || '') == -1) ? (r = false) : null);
    return r;
  }
  
  setUsed(n, f) {
    let u = this.used(n, f);
    if (n.tagName == 'A') this.app.fire('active', {n, on: u});
    else if (n.type == 'checkbox') n.checked = u;
    else if (n.type == 'radio') n.checked = u;
    else if (n.tagName == 'SELECT') n.value = (f[(n.dataset[this.opt.dFilter] || '')] || [''])[0];
  }

  used(n, f) {
    let x = (n.dataset[this.opt.dFilter] || '').split(/=\+?/, 2);
    return (x[0] && !f[x[0]] && !x[1]) || (f[x[0]] && f[x[0]].length > 0 && f[x[0]].indexOf(x[1]) != -1);
    //return ((f[x[0]] || '') == (x[1] || ''));
  }
  
  store(n, f) {
    if (n.id && n.classList.contains(this.opt.cMem)) localStorage.setItem('filter-' + n.id, JSON.stringify(f));
  }

  restore(n) {
    if (n.id && n.classList.contains(this.opt.cMem)) {
      let f = localStorage.getItem('filter-' + n.id);
      if (f) {
        //create attributes if not exist
        this.app.ee(n, '[data-' + this.opt.dFilter + ']', m => {
          let x = (m.dataset[this.opt.dFilter] || '').split(/=/);
          if (x[0]) {
            x = this.opt.dFilter + '_' + x[0];
            if (!(x in n.dataset)) n.dataset[x] = '';
          }
        });
        //parse
        f = this.app.parse(f);
        if (f) this.forAttrs(n, (a, k) => n.dataset[a] = (f[k] || []).join(';'));
      }
    }
  }
  
  reset(n) {
    this.forAttrs(n, (a, k) => (k in n.vInit) ? (n.dataset[a] = n.vInit[k] || '') : (delete n.dataset[a.name]));
    this.apply(n);
  }
  
  forAttrs(n, f) {
    let z = this.opt.dFilter.length;
    Object.keys(n.dataset).forEach(a => (a.substr(0, z) == this.opt.dFilter) ? f(a, a.substr(z+1)) : null);
  }

}