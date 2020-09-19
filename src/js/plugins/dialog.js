/*! dialog - replacement of standard Javascript dialogs: alert, confirm, prompt */

// a.alert([title]|[data-caption])
// a.dialog[href]([title]|[data-caption])[data-prompt] [data-src][data-go][data-ok][data-cancel][data-reverse][data-head][data-pic]

import Plugin from './plugin.js';
import Url from '../util/url.js'
// import Toggle from './toggle.js';

export default class extends Plugin {

  constructor() {
    super('dialog')
    
    this.dlg = null;
  
    this.opt = {
      ccDlg: 'dlg rad',
      customDialog: true,
      aConfirm: '_confirm',
      dHead: 'head', // data-
      dPic: 'pic',
      dPrompt: 'prompt',
      dCaption: 'caption',
      cBtn: 'btn pad',
      qAlert: 'a.alert',
      qDialog: 'a.dialog, input.dialog'
    };
  }
  
  init() {
    this.opt.ccDlg = this.app.opt.cToggle + ' ' + this.app.opt.cOff + ' ' + this.opt.ccDlg;
    if (!this.dlg) this.dlg = this.app.ins('div', '', {className: this.opt.ccDlg}, document.body);
    this.app.h('click', this.opt.qAlert+', '+this.opt.qDialog, e => this.onClick(e));
  }
  
  onClick(e) {
      e.preventDefault();
      return this.openByNode(e.recv);
  }

  //setup object keys: [ok, cancel, icon, class, btn, rev, def]
  openDialog(h, t, f, setup) {
    setup = setup || {};
    let d = this.dlg;
    const app = this.app
    d.className = this.opt.ccDlg + (setup.class ? ' '+setup.class : '');
    app.clr(d);
    if (h.nodeType) h = h.dataset[this.opt.dHead] || '';
    let hh = app.ins('div', '', {className: 'row bg'}, d);
    let hhh = app.ins('h3', ' ' + (h || ''), {className: 'fit pad'}, hh);
    if (setup.icon) {
      let m = setup.icon.match(/(\S+)(\s(.*))?/);
      if (m) hhh.insertBefore(app.ins('span', app.i(m[1]), {className: m[3] || ''}), hhh.firstChild);
    }
    app.x(hh, 0, 'pad hover col-0');
    let b = app.ins('div', '', {className: 'pad'}, d);
    if (t) app.ins('div', t, {}, b);
    let inp = {value: true};
    if (setup.def || setup.def === '') inp = app.ins('input', '', {value: setup.def}, b);
    let bb = app.ins('p', '', {className: 'r'}, b);
    let b1 = this.opt.cBtn + ' ' + (setup.btn || (t.substr(0,1) == ' ' ? 'bg-e' : ''));
    let b2 = this.opt.cBtn + ' bg-n';
    let yes = app.ins('a', setup.ok || app.opt.sOk, {href: app.opt.hClose, className: (setup.rev ? b2 : b1)}, bb);
    if (f) {
      app.ins('a', setup.cancel || app.opt.sCancel, {href: app.opt.hClose, className: (setup.rev ? b1 : b2)}, yes, setup.rev ? -1 : 1);
      app.ins('', ' ', {}, yes, setup.rev ? -1 : 1);
      yes.href = app.opt.hOk;
      app.b([yes], 'click', e => { e.preventDefault(); this.callback(f, inp.value, e); });
      if (inp.tagName) app.b([inp], 'keyup', e => e.keyCode == 13 ? this.callback(f, inp.value, e) : null);
    }
    this.app.toggle(this.dlg, true)
  }
  
  closeDialog() {
    this.app.pf('toggle', 'unpop')
  }
  
  callback(f, v, e) {
    if (!f.call(this, v, e)) this.closeDialog(); // close dialog unless callback returns true
  }
  
  openByNode(n, f) {
    if (n.form && !n.form.checkValidity()) {
      if (n.form.reportValidity) n.form.reportValidity();
      return;
    }
    const app = this.app
    let h = (n.dataset[this.opt.dHead] || '').replace(/%([\w\-]+)%/g, (m, a) => n.getAttribute(a));
    let icon = n.dataset[this.opt.dPic] || '';
    let p = n.dataset[this.opt.dPrompt] || '';
    let t = (n.dataset[this.opt.dCaption] || n.title || p || '!').replace(/%([\w\-]+)%/g, (m, a) => n.getAttribute(a));
    let rev = 'reverse' in n.dataset;
    let src = n.dataset.src;
    src = src ? app.q(src) : null;
    if (!src && n.form) src = n.form.elements[p];
    let v = null;
    let al = n.matches(this.opt.qAlert);
    let def = p ? (src ? src.value : Url.get(n, p)) : null;
    
    if (def && 'go' in n.dataset) this.onAnswer(n, def, p);//go with default
    else if (this.opt.customDialog) {
      this.openDialog(h, t, al ? null : (w => this.onAnswer(n, w, p)), {
        ok: n.dataset.ok,
        cancel: n.dataset.cancel,
        icon: icon,
        //class: '',
        btn: (t.substr(0,1) == ' ' || (n && n.className.match(/-[we]\b/))) ? 'bg-e' : 'bg-y',
        def: def,
        rev: rev
      });
    }
    else {
      if (al) v = alert(t);//undef
      else if (!p) v = confirm(t);//bool
      else v = prompt(t, def);//null|value
      this.onAnswer(n, v, p);
    }
    return this.dlg;
  }
  
  onAnswer(n, v, p, e) {
    const app = this.app
    //cancelled
    if (!v && v !== '') ;
    //form submit
    else if (n && n.form) {
      if (v !== true) {
        let i = n.form.elements[p] || app.ins('input', '', {type: 'hidden', name: p}, n.form);
        if (i) i.value = v;
      }
      if (n.form.reportValidity ? n.form.reportValidity() : n.form.checkValidity()) {
        app.q('[type="hidden"][name="'+ n.name +'"]', n.form) || app.ins('input', '', {type: 'hidden', name: n.name, value: n.value}, n.form);
        n.form.elements[this.opt.aConfirm] || app.ins('input', '', {type: 'hidden', name: this.opt.aConfirm, value: 1}, n.form);
        n.form.submit();
      }
      else this.closeDialog();
      //n.click();
    }
    //goto link
    else if (n && n.href) {
      let ha = (n.getAttribute('href') || '').substr(0, 1) === '#';
      let bl = (n.target == '_blank');
      if (ha || bl) this.closeDialog();
      let u;
      if (ha) u = n.hash;
      else {
        let a = {};
        a[this.opt.aConfirm] = 1;
        if (v !== true) a[p] = v;
        u = Url.build(n, a);
      }
      if (n.target == '_blank') window.open(u, n.target);
      else location.href = u;
    }
  }

}