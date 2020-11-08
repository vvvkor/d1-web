/*! toggle - togglable interactive components */

// Interface components: dropdown, popup, toggle, modal dialog, tabs, drawer, tree, gallery
// .nav, .pop, .toggle, .dlg, .tabs, .drawer, .tree, .gal

import Plugin from './plugin.js';

export default class extends Plugin{

  constructor() {
    super('toggle')
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
      qModal: '.gal>a[id], .dlg',

      cMem: 'mem',
      cFade: 'fade',
      cTarget: 'target', // css
      cToggle: 'toggle', // js
      hUnhash: '#_'
    };
  }

  init() {
    const app = this.app
    app.e('a[data-href]', n => n.href = n.dataset.href);

    app.listen('before', e => (e?.type == 'click') ? this.beforeClick(e) : null); // click out
    app.listen('keydown', e => this.onKey(e));//esc
    app.listen('click', e => this.onClick(e));
    app.h('click', 'a[href^="#"]', e => this.onClickHash(e));
    app.listen('hashchange', e => this.onHash(e));//initial state, #
    app.listen('esc', e => this.esc(e));//click #cancel, hash #cancel, key-27

    app.listen('modal', e => this.modalStyle(e));
    //toggle
    let q = this.opt;
    this.opt.qTgl = this.opt.mediaSuffixes.concat(['']).map(x => /*'[id]' + */ '.' + app.opt.cToggle + x).join(', ')
    this.opt.qUnpop = [q.qPop, q.qNav, q.qDlg, q.qDrw/*, q.qGal*/].join(', ');
    this.opt.qUnpopOn = [q.qPop, q.qNav, q.qDlg, q.qDrw/*, q.qGal*/].map(n => n + ':not(.' + app.opt.cOff + ')').join(', ');
    this.arrangeOnce();
  }
  
  arrangeOnce() {
    const n = null;
    const app = this.app;
    const q = this.opt;
    const togglers = [q.qTrg, q.qPop, q.qNav, q.qDlg, q.qTab, q.qTre, q.qDrw/*, q.qMedia/*, q.qGal*/].join(', ');
    app.e(togglers, n => this.initToggler(n)); //initialize togglers
    this.opt.mediaSuffixes.forEach(x => app.e(this.opt.qTrg + x, n => this.initToggler(n, x))); //initialize togglers by media
    //let autohide = [        q.qPop, q.qNav, q.qDlg, q.qTab, q.qAcc, q.qDrw, q.qMedia/*, q.qGal*/].join(', ');
    //app.e(autohide, n => this.tgl(n, 0)); //autohide
    app.ee(n, this.opt.qNav + ', ' + this.opt.qTre, m => this.attachSubNav(m)); //nav, tree: attach to links
    app.ee(n, this.opt.qGal + ':last-child', m => app.x(m, 1));//gal: auto add close link
    app.ee(n, this.opt.qSubMem, m => m.classList.add(this.opt.cMem)); //initialize sub mem
    app.ee(n, '[id]', m => this.restoreVisibility(m));//restore visibility
    app.ee(n, this.opt.qTab + ':not(.'+app.opt.cOff+') ~ [id]:not(.'+app.opt.cOff+')', m => this.tgl(m, 0)); //undup tabs
    app.ee(n, this.opt.qTab + ':first-child', m => app.a(m.parentNode.children).filter(m => app.vis(m)).length ? null : this.tgl(app.q(app.q('a[href^="#"]', m.parentNode.previousElementSibling).hash), 1));//inactive tabs: show first
    app.ee(n, '.' + app.opt.cToggle + '[id]', m => this.hiliteLinks(m));//init links state
  }

  arrange({n}) {
    this.app.ee(n, this.opt.qTip, m => { m.setAttribute('data-tip', m.title.replace(/\s\s+/g, '\n')); m.removeAttribute('title'); });//init tooltips
  }

  modalStyle(e, src) {
    const wasModal = document.body.classList.contains(this.opt.cFade);
    const modal = this.app.q(this.opt.qDlg+':not(.'+this.app.opt.cOff+'), '+this.opt.qGal+'[id="' + location.hash.substr(1) + '"]');
    
    // add / remove overlay for every opened modal
    // ...
    
    // hide / show scrollbar
    if (wasModal !== !!modal) {
      //console.log('modalStyle', e);
      const bar = window.innerWidth - document.documentElement.clientWidth; //scroll bar width
      const s = document.body.style;
      document.body.classList[modal ? 'add' : 'remove'](this.opt.cFade);
      if (this.opt.dlgUnscroll) {//hide scroll
        s.overflow = modal ? 'hidden' : '';
        if (!(modal && s.paddingRight)) s.paddingRight = modal ? '' + bar + 'px' : ''; // avoid width reflow
      }
      this.app.dbg(['modalStyle', modal, s.paddingRight]);
    }
    //else console.log('modalStyle SKIP')
    
    //focus first input
    if (modal && e?.show) {
      //const f1 = this.app.q('input, a:not(.' + this.app.opt.cClose + ')', modal);
      const f1 = this.app.q('input:not([type="hidden"]), select, textarea, a.btn', modal);
      const f = this.app.q(':focus', modal);
      if (f1 && !f) {
        this.app.dbg(['focus', modal, f1, f]);
        f1.focus();//focus just once when dialog is opened
        if (f1.type == 'text') f1.select();
      }
    }
  }

  esc(e) {
    this.app.dbg(['esc', e]);
    if (e) e.preventDefault();
    this.unpop();
    //if (e.type != 'hashchange') {
      this.addHistory();
      //this.modalStyle(null, 'esc');
      this.app.fire('modal', {n: null, src: 'esc', show: false});
    //}
  }

  addHistory(h) {
    if (h) {
      history.pushState({}, '', h);
      //following required to re-render hash changes (test: open gallery, esc)
      //history.pushState({}, '', h);
      //history.go(-1);
    }
    else if (location.hash) {
      location.hash = this.opt.hUnhash;//this.app.opt.hClose; // update :target styles
      if (location.hash) history.replaceState({}, '', location.pathname + location.search); // remove hash in url
      //this.addHistory(location.pathname + location.search /* + this.app.opt.hClose*/);
    }
  }

  onKey(e) {
    let k = e.keyCode;
    this.app.dbg(['keydown', k, this.nEsc]);
    if (k == 27 && this.nEsc>=2) localStorage.clear();
    if (k == 27) this.app.fire('esc', e);
    this.nEsc = (k == 27 && this.nEsc<2) ? this.nEsc+1 : 0;
  }

  onHash(e) {
    if((e ? e.newURL : location.hash)?.match(new RegExp(this.opt.hUnhash + '$'))) return;

    this.app.dbg(['hashchange', location.hash, e?.newURL]);
    this.nEsc = 0;
    if (!location.hash || location.hash === this.app.opt.hClose) this.app.fire('esc', e);
    else {
      let d = this.app.q(location.hash);
      if (d) {
        let t = d.matches(this.opt.qTgl);
        let g = d.matches(this.opt.qGal);
        if (t) {
          this.unpop();
          this.toggle(d, true);
          if (!this.opt.keepHash) this.addHistory();
        }
        /*
        else if (g) {
          this.app.fire('modal', {n: d, src: 'gal', show: true});
        }
        else this.app.fire('modal', {n: d, src: '#', show: false});
        */
      }
      this.app.fire('modal', {n: d, src: '#', show: null});
    }
  }
  
  beforeClick(e) {
    this.unpop(e.target, true);
    //this.addHistory();
  }

  onClickHash(e) {
    let a = e.recv;
    if (a && a.hash === this.app.opt.hClose) {
      e.preventDefault();
      let d = a.closest(this.opt.qTgl);
      this.app.dbg(['close', this.opt.qTgl, a, d]);
      if (d) {
        this.tgl(d, false);
        this.addHistory();
        //this.app.fire('esc', e);
        if (d.matches(this.opt.qModal)) this.app.fire('modal', {n: d, src: 'x', show: false});
      }
      else this.app.fire('esc', e);
    }
    else {
      let d = this.app.q(a.hash);
      if (d && d.matches(this.opt.qTgl)) {
        e.preventDefault();
        d = this.toggle(d);
        if (this.app.vis(d) && this.opt.keepHash) this.addHistory(a.hash);
        else this.addHistory();
      }
      const par = e.recv.closest(this.opt.qUnpopOn);
      if(d && par && !par.contains(d)) this.toggle(par, false);
    }
  }
  
  onClick(e) {
    this.nEsc = 0;
    //if (!e.target.closest('a, input, select, textarea')) this.addHistory();
    //if (e.clientX>=0 && e.clientX<=10 && e.clientY>5 && this.opt.qDrawer) this.toggle(this.opt.qDrawer);
  }
  
  initToggler(n, suffix) {
    n.classList.remove(this.opt.cTarget + (suffix || ''));
    n.classList.add(this.app.opt.cToggle + (suffix || ''));
    this.tgl(n, 0);
  }

  attachSubNav(n) {
    //let a = n.previousElementSibling;
    let aa = this.app.a(n.parentNode.children).filter(v => v.tagName == 'A');
    let a = aa.filter(v => !v.href)[0] || aa[0]
      || (this.app.ins('',' ',{},n.parentNode, false) && this.app.ins('a', this.app.i('toggle', '[+]'), {}, n.parentNode, false));
    if (a) {
      if (!n.id) n.id = 'ul-' + this.app.seq();
      a.href = '#' + n.id;
    }
  }

  //deep: -1=prepare, 0=click|hash, 1=deps|clo
  toggle(h, on, deep, hist) {
    let d = h ? (h.tagName ? h : this.app.q(h)) : null;
    if (d) {
      if (d.matches(this.opt.qTab) && on === undefined) on = true; //tabs: show instead of toggle
      this.app.fire('beforetoggle', {n: d, on, deep: deep});
      this.tgl(d, on);
      this.app.dbg(['toggle' + (deep ? ' deep' : ''), on, d], deep ? 2 : 1);
      if (this.app.vis(d)) this.fixPosition(d);
      if (deep != -1) {
        if (!deep) {
          this.toggleDependent(d);
          if (hist && this.opt.keepHash) this.addHistory(hist);
        }
        //this.hiliteLinks(d);
        this.storeVisibility(d);
        //if (!deep) this.modalStyle(d);
        if (!deep && d.matches(this.opt.qModal)){
          const show = (on === undefined) ? this.app.vis(d) : on;
          this.app.fire('modal', {n: d, src: 'toggle', show});
        }
      }
      this.app.fire('aftertoggle', {n: d, on, deep: deep});
    }
    return d;
  }

  tgl(n, on) {
    if (n) n.classList[on ? 'remove' : (on === undefined ? 'toggle' : 'add')](this.app.opt.cOff);
    this.hiliteLinks(n);
    on = on ?? this.app.vis(n);
    this.app.fire('toggle', {n, on});
  }

  toggleDependent(d) {
    if (this.app.vis(d)) {
      if (d.matches(this.opt.qDlg)) ;//this.app.e(this.opt.qDlg, n => n == d ? null : this.toggle(n, false, 1)); //hide other dialogs
      else if (d.matches(this.opt.qTab)) this.app.e(d.parentNode.children, n => n == d ? null : this.toggle(n, false, 1)); //hide sibling tabs
      else if (d.matches(this.opt.qAcc)) this.app.ee(d.closest(this.opt.qAccRoot), this.opt.qAcc, n => n.contains(d) ? null : this.toggle(n, false, 1)); //hide other ul
    }
  }

  unpop(x, force) {
    let keep = [x];
    if (x) {
      let a = x.closest('a');
      if (a && a.hash) keep.push(this.app.q(a.hash));//keep hash target
    }
    this.app.dbg(['unpop', keep]);
    //this.app.e(this.opt.qUnpop, n => (keep && keep.filter(m => m && m.tagName && n.contains(m)).length) ? null : this.toggle(n, false, 1));
    let nn = this.app.qq(this.opt.qUnpopOn)
      .filter(n => !(keep && keep.filter(m => m && m.tagName && n.contains(m)).length)); // skip if contains one of [keep]
    if (!force) {
      // to close nested subsequently
      nn = nn.filter(n => !this.app.q(this.opt.qUnpopOn, n)); 
    }
    // to close vRel subsequently
    nn = nn.filter(n => !this.containsRels(n));
    this.app.e(nn, n => this.toggle(n, false, !force));
  }

  containsRels(n) {
    const rels = this.app.qq(this.opt.qUnpopOn).map(n => n.vRel).filter(n => n);
    return rels.filter(r => n.contains(r)).length;
  }
  
  storeVisibility(n) {
    if (n && n.id && n.classList.contains(this.opt.cMem)) {
      localStorage.setItem('vis#'+n.id, this.app.vis(n) ? 1 : -1);
    }
  }

  restoreVisibility(n) {
    if (n && n.id && n.classList && n.classList.contains(this.opt.cMem)) {
      let v = localStorage.getItem('vis#'+n.id);
      if (v) this.toggle(n, v>0, -1);
    }
  }

  hiliteLinks(d) {
    let v = this.app.vis(d);
    if(d.id) this.app.e('a[href="#' + d.id + '"]', a => this.hiliteLink(a, v));
  }
  
  hiliteLink(n, on) {
    n.classList[on ? 'add' : 'remove'](this.app.opt.cAct);
    this.app.fire('active', {n, on});
  }

  fixPosition(n) {
    let nav = n.matches(this.opt.qNav);
    let ss = nav ? window.getComputedStyle(n.parentNode.parentNode) : null;
    let vert = ss ? (ss.display != 'flex') : false;
    if (n.matches(this.opt.qPop) || nav) {
      let s = n.style;
      let p = n.parentNode;
      let i = p.nextElementSibling;
      i = (i && i.tagName == 'INPUT') ? i : null;
      let r = i || n.parentNode;
      if (r) {
        //const is_touch = 'ontouchstart' in document.documentElement;
        //const maxw = is_touch ? screen.width : window.innerWidth;
        const maxw = document.documentElement.clientWidth;
        s.right = 'auto';
        s.left = vert ? '100%' : 0;
        s.top = vert ? 0 : '100%';
        let qn = n.getBoundingClientRect();
        let qr = r.getBoundingClientRect();
        let dx = (qn.right > maxw);
        let dy = (qn.bottom > window.innerHeight);
        let wide = (qr.width > 300);
        //x
        if (vert) s.left = (dx || wide) ? '3em' : '100%';
        else if (dx && qn.width > qr.width && qr.right > qn.width) {
          //if (overflows-right && wider-then-container && enough-place-on-the-left) pop-left
          s.left = (qr.width - qn.width) + 'px';
        }
        else s.left = 0;
        //y
        if (vert) s.top = (dx || wide) ? '90%' : 0;
        else if (dy && qr.top > qn.height) {
          //if (overflows-bottom && enough-place-on-the-top) pop-top
          s.top = ((i ? -qr.height : 0) - qn.height) + 'px';
        }
        else s.top = '100%';
        if (i) p.style.verticalAlign = 'bottom';
      }
    }
  }
}