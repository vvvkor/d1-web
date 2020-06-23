/*! toggle - togglable interactive components */

// Interface components: dropdown, popup, toggle, modal dialog, tabs, drawer, tree, gallery
// .nav, .pop, .toggle, .dlg, .tabs, .drawer, .tree, .gal

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'toggle';
  this.shown = null;
  this.nEsc = 0;

  this.opt = {
    keepHash: true,
    mediaSuffixes: ['-mobile', '-desktop'],
    dlgUnscroll: true,

    //qTgl: '.toggle[id]',
    
    qTrg: '[id].target',
    qPop: '.pop>div[id]',
    qNav: '.nav ul',//auto [id]
    qDlg: '.dlg',//generated dialogs may have no [id]
    qTab: '.tabs+div>div[id]',
    qTre: 'ul.tree ul', //auto [id]
    qDrw: '.drawer[id]',
    qAccRoot: 'ul.tree.accordion',
    qAcc: 'ul.tree.accordion ul',
    qGal: '.gal>a[id]', // dup of gallery.opt.qGal
    qSubMem: '.tabs.mem+div>div[id], ul.mem:not(.nav) ul',
    //qMedia: '[id].target-mobile, [id].target-desktop',
    qDrawer: '.drawer[id]:not(.shift)',
    qTip: '[data-tip=""][title], .tip[title]',

    cMem: 'mem',
    cFade: 'fade',
    cTarget: 'target'
    //cToggle: 'toggle',
  };

  this.init = function () {
    app.e('a[data-href]', n => n.href = app.attr(n, 'data-href'));
    app.listen('esc', e => this.esc(e));
    app.listen('hashchange', e => this.onHash(e));
    app.listen('keydown', e => this.onKey(e));
    app.h('click', 'a[href^="#"]', e => this.onLink(e));
    app.listen('click', e => this.onClick(e));
    app.listen('after', e => (e && e.type == 'click') ? this.unpop(e.target) : null); // click out
    app.listen('after', e => (!e || ['click', 'keydown', 'hashchange'].indexOf(e.type) != -1) ? this.modalStyle(e) : null);
    app.listen('after', e => (!e || ['click', 'keydown', 'hashchange'].indexOf(e.type) != -1) ? (this.shown = null) : null);
    //toggle
    let q = this.opt;
    this.opt.qTgl = this.opt.mediaSuffixes.concat(['']).map(x => /*'[id]' + */ '.' + app.opt.cToggle + x).join(', ')
    let togglers = [q.qTrg, q.qPop, q.qNav, q.qDlg, q.qTab, q.qTre, q.qDrw/*, q.qMedia/*, q.qGal*/].join(', ');
    this.opt.qUnpop = [q.qPop, q.qNav, q.qDlg, q.qDrw/*, q.qGal*/].join(', ');
    this.opt.qUnpopOn = [q.qPop, q.qNav, q.qDlg, q.qDrw/*, q.qGal*/].map(n => n + ':not(.' + app.opt.cOff + ')').join(', ');
    app.e(this.opt.qNav + ', ' + this.opt.qTre, n => this.attachSubNav(n)); //nav, tree: attach to links
    app.e(togglers, n => this.initToggler(n)); //initialize togglers
      this.opt.mediaSuffixes.forEach(x => app.e(this.opt.qTrg + x, n => this.initToggler(n, x))); //initialize togglers by media
    //let autohide = [        q.qPop, q.qNav, q.qDlg, q.qTab, q.qAcc, q.qDrw, q.qMedia/*, q.qGal*/].join(', ');
    //app.e(autohide, n => this.tgl(n, 0)); //autohide

    app.e(this.opt.qGal + ':last-child', n => app.x(n, 1));//gal: auto add close link
    app.e(this.opt.qSubMem, n => n.classList.add(this.opt.cMem)); //initialize sub mem
    app.e('[id]', n => this.restoreVisibility(n));//restore visibility
    app.e(this.opt.qTab + ':not(.'+app.opt.cOff+') ~ [id]:not(.'+app.opt.cOff+')', n => this.tgl(n, 0)); //undup tabs
    app.e(this.opt.qTab + ':first-child', n => app.a(n.parentNode.children).filter(m => app.vis(m)).length ? null : this.tgl(app.q(app.q('a[href^="#"]', n.parentNode.previousElementSibling).hash), 1));//inactive tabs: show first
    app.e('.' + app.opt.cToggle + '[id]', n => this.hiliteLinks(n));//init links state
    app.e(this.opt.qTip, n => { n.setAttribute('data-tip', n.title.replace(/\s\s+/g, '\n')); n.title = ''; });//init tooltips
    app.listen('swipe', e => this.swipe(e));
    /*
    app.e(this.opt.qTip, n => {
      let p = app.ins('div',app.ins('div', n.title.replace(/\s\s+/g, '<br>'), {className: 'btn bg-n'}), {className: 'pop'}, n, 1);
      n.title = '';
      p.insertBefore(n, p.firstChild);
    });//init tooltips as popup
    */
  }

  this.swipe = function(e){
    if(e.n.matches(this.opt.qDrw)){
      this.tgl(e.n, false);
      setTimeout(() => e.n.style.transform = '', 500);
    }
  }

  this.modalStyle = function(e){
    let n = e ? e.target : null;
    //this.shown = null;//do it just once when dialog is opened
    //let modal = app.q(this.opt.qDlg+':not(.'+app.opt.cOff+'), '+this.opt.qGal+':target'); // :target not updated after Esc key
    
    //styles
    let modal = app.q(this.opt.qDlg+':not(.'+app.opt.cOff+'), '+this.opt.qGal+'[id="' + location.hash.substr(1) + '"]');
    let bar = window.innerWidth - document.documentElement.clientWidth; //scroll bar width
    let s = document.body.style;
    document.body.classList[modal ? 'add' : 'remove'](this.opt.cFade);
    if(this.opt.dlgUnscroll){//hide scroll
      s.overflow = modal ? 'hidden' : '';
      if(!(modal && s.paddingRight)) s.paddingRight = modal ? '' + bar + 'px' : ''; // avoid width reflow
    }
    app.dbg(['modalStyle', n, modal, s.paddingRight]);
    
    //focus first input
    if(modal){
      //let f1 = app.q('input, a:not(.' + app.opt.cClose + ')', modal);
      let f1 = app.q('input:not([type="hidden"]), select, textarea, a.btn, a:not([href="' + app.opt.hClose + '"])', modal);
      let f = app.q(':focus', modal);
      if(f1 && !f && (!n || !n.nodeType || !modal.contains(n))){
        app.dbg(['focus', n, modal, f1, f]);
        f1.focus();//focus just once when dialog is opened
        if(f1.type == 'text') f1.select();
      }
    }
  }

  this.esc = function(e){
    app.dbg(['esc', e]);
    if(e) e.preventDefault();
    this.unpop(null, true);
    this.unhash();
    this.modalStyle();
  }

  this.onHash = function(e){
    app.dbg(['hashchange', location.hash]);
    this.nEsc = 0;
    if(location.hash===app.opt.hClose) app.fire('esc', e);
    else if(location.hash){
      let d = app.q(location.hash);
      if(d){
        let t = d.matches(this.opt.qTgl);
        let g = d.matches(this.opt.qGal);
        if(t){
          this.unpop();
          this.toggle(d, true);
          if(!this.opt.keepHash) this.unhash();
        }
        if(t || g) this.modalStyle();
        else this.unpop();//app.fire('esc', e);
      }
    }
  }

  this.onKey = function(e){
    let k = e.keyCode;
    app.dbg(['keydown', k, this.nEsc]);
    if(k==27 && this.nEsc>=2) localStorage.clear();
    else if(k==27) app.fire('esc', e);
    this.nEsc = (k==27 && this.nEsc<2) ? this.nEsc+1 : 0;
  }

  this.onLink = function(e){
    let a = e.recv;
    if(a && a.hash===app.opt.hClose){
      e.preventDefault();
      let d = a.closest(this.opt.qTgl);
      app.dbg(['close', this.opt.qTgl, a, d]);
      if(d) this.tgl(d, false);
      else app.fire('esc', e);
    }
    else{
      let d = app.q(a.hash);
      if(d && d.matches(this.opt.qTgl)){
        e.preventDefault();
        d = this.toggle(d);
        if(app.vis(d) && this.opt.keepHash) this.addHistory(a.hash);
        else this.unhash();
      }
    }
  }
  
  this.onClick = function(e){
    this.nEsc = 0;
    if(!e.target.closest('a, input, select, textarea')) this.unhash();
    if(e.clientX>=0 && e.clientX<=10 && e.clientY>5 && this.opt.qDrawer) this.toggle(this.opt.qDrawer);
  }
  
  this.initToggler = function(n, suffix){
    n.classList.remove(this.opt.cTarget + (suffix || ''));
    n.classList.add(app.opt.cToggle + (suffix || ''));
    this.tgl(n, 0);
  }

  this.attachSubNav = function(n){
    //let a = n.previousElementSibling;
    let aa = app.a(n.parentNode.children).filter(v => v.tagName=='A');
    let a = aa.filter(v => !v.href)[0] || aa[0]
      || (app.ins('',' ',{},n.parentNode, false) && app.ins('a', app.i('toggle', '[+]'), {}, n.parentNode, false));
    if(a){
      if(!n.id) n.id = 'ul-' + app.seq();
      a.href = '#' + n.id;
    }
  }

  //deep: -1=prepare, 0=click|hash, 1=deps|clo
  this.toggle = function(h, on, deep){
    let d = h ? (h.tagName ? h : app.q(h)) : null;
    if(d){
      if(d.matches(this.opt.qTab) && on===undefined) on = true; //tabs: show instead of toggle
      //console.log('toggle '+d.id, on, deep);
      app.fire('beforetoggle', {n: d, on: on, deep: deep});
      this.tgl(d, on);
      app.dbg(['toggle' + (deep ? ' deep' : ''), on, d], deep ? 2 : 1);
      if(app.vis(d)){
        this.fixPosition(d);
        if(!deep) this.shown = d;
      }
      if(deep!=-1){
        if(!deep) this.toggleDependent(d);
        this.hiliteLinks(d);
        this.storeVisibility(d);
        //if(!deep) this.modalStyle(d);
      }
      app.fire('aftertoggle', {n: d, on: on, deep: deep});
    }
    return d;
  }

  this.tgl = function(d, on){
    if(d) d.classList[on ? 'remove' : (on===undefined ? 'toggle' : 'add')](app.opt.cOff);
  }

  this.toggleDependent = function(d){
    if(app.vis(d)){
      if(d.matches(this.opt.qDlg)) ;//app.e(this.opt.qDlg, n => n==d ? null : this.toggle(n, false, 1)); //hide other dialogs
      else if(d.matches(this.opt.qTab)) app.e(d.parentNode.children, n => n==d ? null : this.toggle(n, false, 1)); //hide sibling tabs
      else if(d.matches(this.opt.qAcc)) app.e(app.qq(this.opt.qAcc, d.closest(this.opt.qAccRoot)), n => n.contains(d) ? null : this.toggle(n, false, 1)); //hide other ul
    }
  }

  this.unpop = function(x, seq){
    let keep = [x];
    keep.push(this.shown); // click out: keep
    if(x){
      let a = x.closest('a');
      if(a && a.hash){
        //if(a.hash==app.opt.hClose) keep = []; //return app.fire('esc'); //to close all, even container
        //else
          keep.push(app.q(a.hash));//keep hash target
      }
    }
    app.dbg(['unpop', keep]);
    //app.e(this.opt.qUnpop, n => (keep && keep.filter(m => m && m.tagName && n.contains(m)).length) ? null : this.toggle(n, false, 1));
    let nn = app.qq(this.opt.qUnpop)
      .filter(n => !(keep && keep.filter(m => m && m.tagName && n.contains(m)).length)); // skip if contains one of [keep]
    if(seq) nn = nn.filter(n => !app.q(this.opt.qUnpopOn, n)); // to close nested subsequently
    app.e(nn, n => this.toggle(n, false, 1));
  }

  this.unhash = function(){
    //v1.
    if(location.hash) location.hash = app.opt.hClose;
    //v2.
    this.addHistory(location.pathname + location.search /* + app.opt.hClose*/); //inputs flicker
  }

  this.addHistory = function(h) {
    history.pushState({}, '', h);
    //following required to re-render hash changes (test: open gallery, esc)
    //history.pushState({}, '', h);
    //history.go(-1);
  }

  this.storeVisibility = function(n){
    if(n && n.id && n.classList.contains(this.opt.cMem)){
      localStorage.setItem('vis#'+n.id, app.vis(n) ? 1 : -1);
    }
  }

  this.restoreVisibility = function(n){
    if(n && n.id && n.classList && n.classList.contains(this.opt.cMem)){
      let v = localStorage.getItem('vis#'+n.id);
      if(v) this.toggle(n, v>0, -1);
    }
  }

  this.hiliteLinks = function(d){
    let op = app.vis(d) ? 'add' : 'remove';
    app.e('a[href="#'+d.id+'"]', a => a.classList[op](app.opt.cAct));
  }

  this.fixPosition = function(n){
    let nav = n.matches(this.opt.qNav);
    let ss = nav ? window.getComputedStyle(n.parentNode.parentNode) : null;
    let vert = ss ? (ss.display!='flex') : false;
    if(n.matches(this.opt.qPop) || nav){
      let s = n.style;
      let p = n.parentNode;
      let i = p.nextElementSibling;
      i = (i && i.tagName=='INPUT') ? i : null;
      let r = i || n.parentNode;
      if(r){
        s.right = 'auto';
        s.left = vert ? '100%' : 0;
        s.top = vert ? 0 : '100%';
        let qn = n.getBoundingClientRect();
        let qr = r.getBoundingClientRect();
        let dx = (qn.right > window.innerWidth);
        let dy = (qn.bottom > window.innerHeight);
        let wide = (qr.width > 300);
        //x
        if(vert) s.left = (dx || wide) ? '3em' : '100%';
        else if(dx && qn.width > qr.width && qr.right > qn.width){
          //if(overflows-right && wider-then-container && enough-place-on-the-left) pop-left
          s.left = (qr.width - qn.width) + 'px';
        }
        else s.left = 0;
        //y
        if(vert) s.top = (dx || wide) ? '90%' : 0;
        else if(dy && qr.top > qn.height){
          //if(overflows-bottom && enough-place-on-the-top) pop-top
          s.top = ((i ? -qr.height : 0) - qn.height) + 'px';
        }
        else s.top = '100%';
        if(i) p.style.verticalAlign = 'bottom';
      }
    }
  }

})();
