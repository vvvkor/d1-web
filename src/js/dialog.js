/*! dialog - replacement of standard Javascript dialogs: alert, confirm, prompt */

// a.alert([title]|[data-caption])
// a.dialog[href]([title]|[data-caption])[data-prompt] [data-src][data-ok][data-cancel][data-reverse] 

let app = require('./app.js');
let toggle = require('./toggle.js');

module.exports = new(function () {

  "use strict";

  this.name = 'dialog';
  this.dlg = null;
  
  this.opt = {
    ccDlg: 'dlg rad',
    customDialog: 1,
    aConfirm: '_confirm',
    aPrompt: 'data-prompt',
    cBtn: 'btn pad',
    qAlert: 'a.alert',
    qDialog: 'a.dialog, input.dialog'
  };
  
  this.init = function () {
    app.listen('click', e => this.onClick(e));
  }
  
  this.onClick = function(e){
    let as = app.closest(e.target, 'a, input, button');
    if(as && as.matches(this.opt.qAlert+','+this.opt.qDialog)){
      //d = this.dialog(e, a, (m, v) => !console.log(v) && toggle.unpop()); //custom callback
      e.preventDefault();
      return this.dialog(as);
    }
  }

  this.initDlg = function(n, h, t, f, def, rev){
    if(!this.dlg) this.dlg = app.ins('div', '', {className: app.opt.cToggle + ' ' + app.opt.cOff + ' ' + this.opt.ccDlg}, document.body);
    let d = this.dlg;
    app.clr(d);
    let hh = app.ins('div', '', {className: 'row bg'}, d);
    app.ins('h3', h || '', {className: 'fit pad'}, hh);
    app.x(hh, 0, 'pad hover col-0');
    let b = app.ins('div', '', {className: 'pad'}, d);
    if(t) app.ins('div', t, {}, b);
    let inp = {value: true};
    if(def || def==='') inp = app.ins('input', '', {value: def}, b);
    let bb = app.ins('p', '', {className: 'r'}, b);
    let warn = this.opt.cBtn + ' ' + ((t.substr(0,1)==' ' || (n && n.className.match(/-[we]\b/))) ? 'bg-e' : 'bg-y');
    let sec = this.opt.cBtn + ' bg-n';
    let yes = app.ins('a', app.attr(n, 'data-ok', app.opt.sOk), {href: app.opt.hClose, className: (rev ? sec : warn)}, bb);
    if(f){
      app.ins('a', app.attr(n, 'data-cancel', app.opt.sCancel), {href: app.opt.hClose, className: (rev ? warn : sec)}, yes, rev ? -1 : 1);
      app.ins('', ' ', {}, yes, rev ? -1 : 1);
      yes.href = app.opt.hOk;
      app.b([yes], 'click', e => { e.preventDefault(); f.call(this, inp.value); });
      if(inp.tagName) app.b([inp], 'keyup', e => e.keyCode==13 ? f.call(this, inp.value, e) : null);
    }
    toggle.toggle(this.dlg, true);
  }
  
  
  this.dialog = function(n, f){
    if (n.form && !n.form.checkValidity()){
      n.form.reportValidity();
      return;
    }
    let p = app.attr(n, this.opt.aPrompt);
    let t = app.attr(n, app.opt.aCaption, n.title || p || '!');
    let rev = app.attr(n, 'data-reverse');
    let src = app.attr(n, 'data-src');
    src = src ? app.q(src) : null;
    if(!src && n.form) src = n.form.elements[p];
    let v = null;
    let al = n.matches(this.opt.qAlert);
    let def = p ? (src ? src.value : app.get(n, p)) : null;
    if(this.opt.customDialog){
      this.initDlg(n, '', t, al ? null : (w => this.onAnswer(n, f, p, w)), def, rev);
    }
    else{
      if(al) v = alert(t);//undef
      else if(!p) v = confirm(t);//bool
      else v = prompt(t, def);//null|value
      this.onAnswer(n, f, p, v);
    }
    return this.dlg;
  }
  
  this.onAnswer = function(n, f, p, v){
    //call custom func
    if(f) f.call(this, n, v);
    //cancelled
    else if(!v && v!=='') ;
    //form submit
    else if(n.form){
      if(v!==true){
        let i = n.form.elements[p] || app.ins('input', '', {type: 'hidden', name: p}, n.form);
        if(i) i.value = v;
      }
      if(n.form.reportValidity()){
        app.q('[type="hidden"][name="'+ n.name +'"]', n.form) || app.ins('input', '', {type: 'hidden', name: n.name, value: n.value}, n.form);
        n.form.elements[this.opt.aConfirm] || app.ins('input', '', {type: 'hidden', name: this.opt.aConfirm, value: 1}, n.form);
        n.form.submit();
      }
      else toggle.unpop();
      //n.click();
    }
    //goto link
    else if(n.href){
      let ha = (app.attr(n, 'href').substr(0, 1)=='#');
      let bl = (n.target=='_blank');
      if(ha || bl) toggle.unpop();
      let u;
      if(ha) u = n.hash;
      else{
        let a = {};
        a[this.opt.aConfirm] = 1;
        if(v!==true) a[p] = v;
        u = app.makeUrl(n, a);
      }
      if(n.target=='_blank') window.open(u, n.target);
      else location.href = u;
    }
  }

})();
