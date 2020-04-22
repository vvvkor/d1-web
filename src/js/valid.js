/*! valid - custom form validation messages */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'valid';

  this.opt = {
    aHint: 'data-hint',
    qValidate: 'form', // set custom text for browser tooltips
    cUnhint: 'js-unhint', // turn off browser tooltips
    cLiveVal: 'js-live-val' // live validation, disable submit buttons if invalid
  };
  
  this.init = function () {
    //let q = this.opt.qValidate;
    //let dh = '[' + this.opt.aHint + ']';
    //app.e(q + ' input' + dh + ', ' + q + ' textarea' + dh + ', '+ q +' select' + dh, n => this.initInput(n));
    
    let inputs = ['input', 'textarea', 'select'].map(s => this.opt.qValidate + ' ' + s + '[' + this.opt.aHint + ']').join(', ');
    inputs += ', .' + this.opt.cLiveVal + ' [name]';
    
    app.h(['input', 'change'], inputs, e => this.validateInput(e.target));
    app.h('invalid', inputs, e => this.setCustomMessage(e.target));
    app.e('form.' + this.opt.cUnhint, n => this.unhint(n));
    app.e('form.' + this.opt.cLiveVal, n => this.validateForm(n));
    app.h('submit', this.opt.qValidate, e => e.target.getAttribute('novalidate') ? this.validateForm(e.target, e) : null);//custom validation
  }
  
  this.isLive = function(f){
    return (f && f.classList.contains(this.opt.cLiveVal));
  }
  
  this.validateInput = function(n) {
    if (n.willValidate){
      if (n.type == 'radio') app.e(app.qq('[name="'+n.name+'"]', n.form), m => m.setCustomValidity(''));
      else n.setCustomValidity('');
      n.checkValidity();
      if(this.isLive(n.form)) this.validateForm(n.form);
    }
  }

  this.setCustomMessage = function(n) {
    if (n.willValidate){
      let t = n.getAttribute('data-hint') || '';// || n.title;
      t = t.replace(/%([\w\-]+)%/g, (m, v) => n.getAttribute(v));
      n.setCustomValidity(t);
    }
  }
  
  this.unhint = function(n) {
    n.setAttribute('novalidate', true);
  }
  
  this.validateForm = function(n, e) {
    if(e) n.classList.remove(this.opt.cUnhint);
    let ok = n.checkValidity();//!==false
    if (!ok && e) {
      e.preventDefault();
      e.stopPropagation();
      let f = app.q('[name]:invalid:not(.hide):not(.off), [name]:invalid~.subinput', n);
      if(f){
        app.dbg(['focus validate', f]);
        f.focus();
      }
    }
    if(this.isLive(n)){
      //app.e(app.qq('[type="submit"]', n), m => m.disabled = !ok);//if no cUnhint
      app.e(app.qq('[type="submit"]', n), m => m.classList[ok ? 'remove' : 'add']('bg-n'));//if cUnhint used
    }
  }

})();