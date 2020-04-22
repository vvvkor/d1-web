/*! filter - filter items */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'filter';

  this.opt = {
    qFilter: '.filters',
    qItem: '.item',
    aFilter: 'data-filter',
    cMem: 'mem'
  };

  this.init = function () {
    app.e(this.opt.qFilter, n => this.prepare(n));
    app.h('click', 'a[' + this.opt.aFilter + ']', e => this.applyControl(e.recv));
    app.h('input', ':not(a)[' + this.opt.aFilter + ']', e => this.applyControl(e.recv));
  }

  this.prepare = function(n){
    n.vInit = {};
    this.forAttrs(n, (a, k) => n.vInit[k] = a.value);
    this.restore(n);
    this.apply(n);
  }
  
  this.applyControl = function(n){
    let f = n.closest(this.opt.qFilter);
    let x = app.attr(n, this.opt.aFilter, '').split(/=/, 2);
    if(f){
      if(x[0]){
        let a = this.opt.aFilter + '-' + x[0];
        let v = (n.tagName=='SELECT' ? n.value : x[1]) || '';
        if(v.substr(0, 1) == '+' && v.length>1){
          v = v.substr(1);
          let w = app.attr(f, a, '').split(/;/);
          let i = w.indexOf(v);
          if(i==-1) w.push(v);
          else delete w[i];
          v = w.filter((val, key, arr) => (val !== '' && arr.indexOf(val) === key)).join(';');
        }
        f.setAttribute(a, v);
        this.apply(f);
      }
      else{
        this.reset(f);
      }
    }
  }

  this.apply = function(n){
    let f = {};
    let z = this.opt.aFilter.length;
    this.forAttrs(n, (a, k) => a.value.length > 0 ? f[k] = a.value.split(/;/) : null);
    app.dbg(['filter', n, f]);
    app.e(app.qq(this.opt.qItem, n), m => m.classList[this.match(m, f) ? 'remove' : 'add'](app.opt.cHide))
    app.e(app.qq('[' + this.opt.aFilter + ']', n), m => this.setUsed(m, f));
    this.store(n, f);
    app.fire('update', {n: n});
  }
  
  this.match = function(n, f){
    let r = true;
    Object.keys(f).forEach(k => (f[k] && f[k].length > 0 && f[k].indexOf(app.attr(n, 'data-' + k, ''))==-1) ? (r = false) : null);
    return r;
  }
  
  this.setUsed = function(n, f){
    let u = this.used(n, f);
    if(n.tagName=='A') n.classList[u ? 'add' : 'remove'](app.opt.cAct);
    else if(n.type=='checkbox') n.checked = u;
    else if(n.type=='radio') n.checked = u;
    else if(n.tagName=='SELECT') n.value = (f[app.attr(n, this.opt.aFilter, '')] || [''])[0];
  }

  this.used = function(n, f){
    let x = app.attr(n, this.opt.aFilter, '').split(/=\+?/, 2);
    return (x[0] && !f[x[0]] && !x[1]) || (f[x[0]] && f[x[0]].length > 0 && f[x[0]].indexOf(x[1]) != -1);
    //return ((f[x[0]] || '') == (x[1] || ''));
  }
  
  this.store = function(n, f){
    if(n.id && n.classList.contains(this.opt.cMem)) localStorage.setItem('filter-' + n.id, JSON.stringify(f));
  }

  this.restore = function(n){
    if(n.id && n.classList.contains(this.opt.cMem)){
      let f = localStorage.getItem('filter-' + n.id);
      if(f){
        //create attributes if not exist
        app.e(app.qq('[' + this.opt.aFilter + ']', n), m => {
          let x = app.attr(m, this.opt.aFilter, '').split(/=/);
          if(x[0]){
            x = this.opt.aFilter + '-' + x[0];
            if(!n.hasAttribute(x)) n.setAttribute(x, '');
          }
        });
        //parse
        try{
          f = JSON.parse(f);
          this.forAttrs(n, (a, k) => n.setAttribute(a.name, (f[k] || []).join(';')));
        }
        catch(e){
          console.error('Failed JSON parse filter-' + n.id);
        }
      }
    }
  }
  
  this.reset = function(n){
    //this.forAttrs(n, a => n.removeAttribute(a.name))
    this.forAttrs(n, (a, k) => (k in n.vInit) ? n.setAttribute(a.name, n.vInit[k] || '') : n.removeAttribute(a.name));
    this.apply(n);
  }
  
  this.forAttrs = function(n, f){
    let z = this.opt.aFilter.length;
    app.a(n.attributes).forEach(a => (a.name.substr(0, z)==this.opt.aFilter) ? f(a, a.name.substr(z+1)) : null);
  }

})();