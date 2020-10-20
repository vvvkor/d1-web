/*! valid - custom form validation messages */

import Plugin from './plugin.js';

export default class extends Plugin {

  constructor() {
    super('valid')

    this.opt = {
      aHint: 'data-hint',
      qValidate: 'form', // set custom text for browser tooltips
      cUnhint: 'js-unhint', // turn off browser tooltips
      cLiveVal: 'js-live-val' // live validation, disable submit buttons if invalid
    };
  }
  
  init() {
    //let q = this.opt.qValidate;
    //let dh = '[' + this.opt.aHint + ']';
    //this.app.e(q + ' input' + dh + ', ' + q + ' textarea' + dh + ', '+ q +' select' + dh, n => this.initInput(n));
    
    let inputs = ['input', 'textarea', 'select'].map(s => this.opt.qValidate + ' ' + s + '[' + this.opt.aHint + ']').join(', ');
    inputs += ', .' + this.opt.cLiveVal + ' [name]';
    
    this.app.h(['input', 'change'], inputs, e => this.validateInput(e.target));
    this.app.h('invalid', inputs, e => this.setCustomMessage(e.target));
    this.app.e('form.' + this.opt.cUnhint, n => this.unhint(n));
    this.app.e('form.' + this.opt.cLiveVal, n => this.validateForm(n));
    this.app.h('submit', this.opt.qValidate, e => this.customValidate(e));//custom validation
    this.app.listen('validate', e => this.customValidate(e));
  }
  
  isLive(f) {
    return (f && f.classList.contains(this.opt.cLiveVal));
  }
  
  validateInput(n) {
    if (n.willValidate) {
      if (n.type == 'radio') this.app.ee(n.form, '[name="' + n.name + '"]', m => m.setCustomValidity(''));
      else n.setCustomValidity('');
      n.checkValidity();
      if (this.isLive(n.form)) this.validateForm(n.form);
    }
  }

  setCustomMessage(n) {
    if (n.willValidate) {
      let t = n.getAttribute('data-hint') || '';// || n.title;
      t = t.replace(/%([\w\-]+)%/g, (m, v) => n.getAttribute(v));
      n.setCustomValidity(t);
    }
  }
  
  unhint(n) {
    n.setAttribute('novalidate', true);
  }
  
  customValidate(e) {
    const f = e.target.closest('form');
    if (f && f.getAttribute('novalidate')) this.validateForm(f, e);
  }
  
  validateForm(n, e) {
    if (e) n.classList.remove(this.opt.cUnhint);
    let ok = n.checkValidity();// !== false
    if (!ok && e) {
      e.preventDefault();
      e.stopPropagation();
      let f = this.app.q('[name]:invalid:not(.hide):not(.off), [name]:invalid~.subinput', n);
      if (f) {
        this.app.dbg(['focus validate', f]);
        f.focus();
      }
    }
    if (this.isLive(n)) {
      //this.app.ee(n, '[type="submit"]', m => m.disabled = !ok);//if no cUnhint
      this.app.ee(n, '[type="submit"]', m => m.classList[ok ? 'remove' : 'add']('bg-n'));//if cUnhint used
    }
  }

}