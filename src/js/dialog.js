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
    aHead: 'data-head',
    aPic: 'data-pic',
    aPrompt: 'data-prompt',
    cBtn: 'btn pad',
    qAlert: 'a.alert',
    qDialog: 'a.dialog, input.dialog'
  };
  
  this.init = function () {
    this.opt.ccDlg = app.opt.cToggle + ' ' + app.opt.cOff + ' ' + this.opt.ccDlg;
    if(!this.dlg) this.dlg = app.ins('div', '', {className: this.opt.ccDlg}, document.body);
    app.listen('click', e => this.onClick(e));
  }
  
  this.onClick = function(e){
    let as = e.target.closest('a, input, button');
    if(as && as.matches(this.opt.qAlert+','+this.opt.qDialog)){
      //d = this.open(e, a, (m, v) => !console.log(v) && toggle.unpop()); //custom callback
      e.preventDefault();
      return this.openByNode(as);
    }
  }

  //setup object keys: [ok, cancel, icon, class, btn, rev, def]
  this.open = function(h, t, f, setup /*icon, cls, def, rev, n*/){
    setup = setup || {};
    let d = this.dlg;
    d.className = this.opt.ccDlg + (setup.class ? ' '+setup.class : '');
    app.clr(d);
    let hh = app.ins('div', '', {className: 'row bg'}, d);
    let hhh = app.ins('h3', ' ' + (h || ''), {className: 'fit pad'}, hh);
    if(setup.icon){
      let m = setup.icon.match(/(\S+)(\s(.*))?/);
      if(m) hhh.insertBefore(app.ins('span', app.i(m[1]), {className: m[3] || ''}), hhh.firstChild);
    }
    app.x(hh, 0, 'pad hover col-0');
    let b = app.ins('div', '', {className: 'pad'}, d);
    if(t) app.ins('div', t, {}, b);
    let inp = {value: true};
    if(setup.def || setup.def==='') inp = app.ins('input', '', {value: setup.def}, b);
    let bb = app.ins('p', '', {className: 'r'}, b);
    let b1 = this.opt.cBtn + ' ' + (setup.btn || '');
    let b2 = this.opt.cBtn + ' bg-n';
    let yes = app.ins('a', setup.ok || app.opt.sOk, {href: app.opt.hClose, className: (setup.rev ? b2 : b1)}, bb);
    if(f){
      app.ins('a', setup.cancel || app.opt.sCancel, {href: app.opt.hClose, className: (setup.rev ? b1 : b2)}, yes, setup.rev ? -1 : 1);
      app.ins('', ' ', {}, yes, setup.rev ? -1 : 1);
      yes.href = app.opt.hOk;
      app.b([yes], 'click', e => { e.preventDefault(); this.callback(f, inp.value, e); });
      if(inp.tagName) app.b([inp], 'keyup', e => e.keyCode==13 ? this.callback(f, inp.value, e) : null);
    }
    toggle.toggle(this.dlg, true);
  }
  
  this.callback = function(f, v, e){
    if(!f.call(this, v, e)) toggle.unpop(); // close dialog unless callback returns true
  }
  
  this.openByNode = function(n, f){
    if (n.form && !n.form.checkValidity()){
      if(n.form.reportValidity) n.form.reportValidity();
      return;
    }
    let h = app.attr(n, this.opt.aHead).replace(/%([\w\-]+)%/g, (m, a) => n.getAttribute(a));
    let icon = app.attr(n, this.opt.aPic);
    let p = app.attr(n, this.opt.aPrompt);
    let t = app.attr(n, app.opt.aCaption, n.title || p || '!').replace(/%([\w\-]+)%/g, (m, a) => n.getAttribute(a));
    let rev = app.attr(n, 'data-reverse');
    let src = app.attr(n, 'data-src');
    src = src ? app.q(src) : null;
    if(!src && n.form) src = n.form.elements[p];
    let v = null;
    let al = n.matches(this.opt.qAlert);
    let def = p ? (src ? src.value : app.get(n, p)) : null;
    if(this.opt.customDialog){
      this.open(h, t, al ? null : (w => this.onAnswer(n, w, p)), {
        ok: app.attr(n, 'data-ok'),
        cancel: app.attr(n, 'data-cancel'),
        icon: icon,
        //class: '',
        btn: (t.substr(0,1)==' ' || (n && n.className.match(/-[we]\b/))) ? 'bg-e' : 'bg-y',
        def: def,
        rev: rev
      });
    }
    else{
      if(al) v = alert(t);//undef
      else if(!p) v = confirm(t);//bool
      else v = prompt(t, def);//null|value
      this.onAnswer(n, v, p);
    }
    return this.dlg;
  }
  
  this.onAnswer = function(n, v, p, e){
    //cancelled
    if(!v && v!=='') ;
    //form submit
    else if(n && n.form){
      if(v!==true){
        let i = n.form.elements[p] || app.ins('input', '', {type: 'hidden', name: p}, n.form);
        if(i) i.value = v;
      }
      if(n.form.reportValidity ? n.form.reportValidity() : n.form.checkValidity()){
        app.q('[type="hidden"][name="'+ n.name +'"]', n.form) || app.ins('input', '', {type: 'hidden', name: n.name, value: n.value}, n.form);
        n.form.elements[this.opt.aConfirm] || app.ins('input', '', {type: 'hidden', name: this.opt.aConfirm, value: 1}, n.form);
        n.form.submit();
      }
      else toggle.unpop();
      //n.click();
    }
    //goto link
    else if(n && n.href){
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
