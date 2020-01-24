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
    app.e(inputs + ', .' + this.opt.cLiveVal + ' [name]', n => this.initInput(n));
    app.e('form.' + this.opt.cUnhint, n => this.unhint(n));
    app.e('form.' + this.opt.cLiveVal, n => this.validateForm(n));
    app.b('form.' + this.opt.cUnhint, 'submit', e => this.validateForm(e.target, e));
  }
  
  this.initInput = function(n) {
    if (n.willValidate) {
      if (n.tagName == 'select' || n.type == 'radio' || n.type == 'checkbox') app.b(n, 'change', e => this.validateInput(e.target));
      else app.b([n], 'input', e => this.validateInput(e.target));
      app.b([n], 'invalid', e => this.setCustomMessage(e.target));
    }
  }

  this.isLive = function(f){
    return (f && f.classList.contains(this.opt.cLiveVal));
  }
  
  this.validateInput = function(n) {
    if (n.type == 'radio') app.e(app.qq('[name="'+n.name+'"]', n.form), m => m.setCustomValidity(''));
    else n.setCustomValidity('');
    n.checkValidity();
    if(this.isLive(n.form)) this.validateForm(n.form);
  }

  this.setCustomMessage = function(n) {
    let t = n.getAttribute('data-hint') || '';// || n.title;
    t = t.replace(/%([\w\-]+)%/g, function(m,v){ return n.getAttribute(v); })
    n.setCustomValidity(t);
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
      let f = app.q(':invalid', n);
      if(f) f.focus();
    }
    if(this.isLive(n)){
      //app.e(app.qq('[type="submit"]', n), m => m.disabled = !ok);//if no cUnhint
      app.e(app.qq('[type="submit"]', n), m => m.classList[ok ? 'remove' : 'add']('bg-n'));//if cUnhint used
    }
  }

})();