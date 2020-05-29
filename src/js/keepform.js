/*! keepform - store and restore user input */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'keepform';
  this.opt = {
    cKeep: 'keep',
    cRestore: 'restore'
  };

  this.init = function(){
    if(Object.fromEntries && FormData){
      let q = '.' + this.opt.cKeep + '[id]';
      app.e(q, f => this.addControls(f));
      app.e(q + '.' + this.opt.cRestore, f => this.restoreForm(f));
      app.h(['change', 'input'], q, e => this.store(e));
      app.h('click', q + ' a[href="#restore"]', e => this.restore(e));
      app.h('click', q + ' a[href="#reset"]', e => this.reset(e));
      app.h('click', q + ' a[href="#unstore"]', e => this.unstore(e));
    }
  }
  
  this.addControls = function(f){
    let d = app.ins('div', '', {className: 'pad r keepform-tools'}, f, false);
    app.ins('a', app.i('energy', '[^]'), {href: '#restore'}, d);
    app.ins('', ' ', {}, d);
    app.ins('a', app.i('refresh', '[-]'), {href: '#reset'}, d);
    app.ins('', ' ', {}, d);
    app.ins('a', app.i('ban', '[x]'), {href: '#unstore'}, d);
  }
  
  this.reset = function(e){
    e.preventDefault();
    e.target.closest('form').reset();
  }
  
  this.unstore = function(e){
    e.preventDefault();
    localStorage.removeItem(this.formId(e.target.closest('form')));
  }
  
  this.restore = function(e){
    e.preventDefault();
    this.restoreForm(e.target.closest('form'));
  }
  
  this.restoreForm = function(f){
    let id = this.formId(f);
    let d = localStorage.getItem(id);
    if(d){
      d = JSON.parse(d);
      if(d) Object.keys(d).forEach(k => {
        let i = f.elements[k];
        if(i) this.restoreInput(i, d[k]);
      });
    }
  }
  
  this.restoreInput = function(i, v){
    if(i instanceof NodeList) i.forEach(j => this.restoreInput(j, v));
    else if(i.type.match(/file|submit|password/)) ;
    else if(i.type.match(/checkbox|radio/)) i.checked = Array.isArray(v) ? (v.indexOf(i.value) != -1) : (i.value === v);
    else i.value = v;
  }
  
  this.store = function(e){
    let f = new FormData(e.recv);
    //let d = JSON.stringify(Object.fromEntries(f)); // does not support multiple
    let d = {};
    f.forEach((v, k) => {
      if(!d.hasOwnProperty(k)) d[k] = v;
      else{
        // multiple
        if(!Array.isArray(d[k])) d[k] = [d[k]];
        d[k].push(v);
      }
    });
    localStorage.setItem(this.formId(e.recv), JSON.stringify(d));
  }
  
  this.formId = function(f){
    return 'form#' + f.id + '@' + location.pathname;
  }
  
})();