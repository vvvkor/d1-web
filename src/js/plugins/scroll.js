/*! scroll - scrolling behaviours (topbar, drawer) */

// import toggle from './toggle.js'

import Plugin from './plugin.js'
import Func from '../util/func.js';

export default class extends Plugin {

  constructor() {
    super('scroll')
    
    this.y = null;
    //this.hashed = false;
    
    this.opt = {
      //gap: 20,
      qHideOnScroll: '', // '.drawer[id]'
      cStart: 'shade',
      qTopbar: '.topbar.toggle', //.topbar.let
      qEnable: '.topbar' // '.topbar, .drawer'
      //qTopbarFixed: '.topbar:not(.let)'
    };
  }
  
  init() {
    //let t;
    if (this.app.q(this.opt.qEnable)) {
      this.app.listen('hashchange', e => this.onHash(e));
      const ons = Func.throttle(() => this.onScroll(), 500);
      //const ons = Func.throttle((h) => this.onScroll(h), 500);
      //ons(); // forces reflow
      setTimeout(() => this.onScroll(), 20);
      this.app.b([window], 'scroll', e => ons(/*this.hashed*/));
    }
    /*
    else if (t = this.app.q(this.opt.qTopbarFixed)) {
      this.app.listen('hashchange', e => this.fixScroll());
    }
    */
  }
  
  onHash(e) {
    //to hide topbar on hash change
    // fires before onscroll, but page is already scrolled
    this.app.dbg(['scroll hash', location.hash, e, document.body.scrollHeight]);
    if (e && location.hash && this.app.q(location.hash)) {
      this.y = document.body.scrollHeight + 10; // show topbar on hash
      //this.y = window.scrollY - 10; // show/hide topbar on hash up/down
      //this.y = 1; // hide topbar on hash
      //this.hashed = true;
      this.onScroll();
    }
  }
  
  onScroll(/*h*/) {
    //const mode = this.hashed ? 'hash' : (h ? 'fix' : 'scroll');
    const dy = window.scrollY ===null ? null : window.scrollY - this.y;
    this.app.dbg(['scroll', window.scrollY, dy]); // ,mode,h,this.hashed
    if (this.y !== null /* && !h*/) {
      if (this.opt.qTopbar) this.app.e(this.opt.qTopbar, n => this.decorate(n, window.scrollY, dy));
      if (this.opt.qHideOnScroll) this.app.e(this.opt.qHideOnScroll, n => this.app.toggle(n, false));
    }
    this.y = window.scrollY; // forces reflow
    //if (this.hashed) this.fixScroll();
    //this.hashed = false;
  }
  
  decorate(n, y, dy) {
    n.classList[dy > 0 && y > n.offsetHeight ? 'add' : 'remove'](this.app.opt.cOff)
    n.classList[y && dy <= 0 ? 'add' : 'remove'](this.opt.cStart)
  }

  /*
  fixScroll() {
    this.app.dbg(['scroll-fix', location.hash]);
    if (this.app.q(location.hash)) {
      //const t = this.app.q(this.opt.qTopbar + ':not(.'+ this.app.opt.cOff +')');
      const t = this.app.q(this.opt.qTopbarFixed);
      window.scrollBy(0, (t ? -t.offsetHeight : 0) - this.opt.gap);
    }
    //this.hashed = false;
    //setTimeout(() => this.hashed = false, 500);
  }
  */
}
