/*! scroll - scrolling behaviours (topbar, drawer) */

// import toggle from './toggle.js'

import Plugin from './plugin.js'
import Func from '../util/func.js';

export default class extends Plugin {

  constructor() {
    super('scroll')
    
    this.h = null;
    this.y = null;
    
    this.opt = {
      //gap: 20,
      //qHideOnScroll: '', // '.drawer[id]'
      cMiddle: 'shade',
      qTopbar: '.stick.toggle',
      qEnable: '.stick.toggle'
    };
  }
  
  init() {
    if (this.app.q(this.opt.qEnable)) {
      //this.app.listen('hashchange', e => this.onHash(e));
      const ons = Func.throttle(() => this.onScroll(), 500);
      //const ons = Func.throttle((h) => this.onScroll(h), 500);
      //ons(); // forces reflow
      setTimeout(() => this.onScroll(true), 20);
      this.app.b([window], 'scroll', e => ons());
    }
  }
  
  /*
  onHash(e) {
    // to hide topbar on hash change
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
  */
  
  onScroll(force) {
    if (!force && this.h !== document.body.clientHeight) {
      this.h = document.body.clientHeight;
      this.y = window.scrollY; 
      return;
    }
    const dy = window.scrollY === null ? null : (this.y === null ? -1 : window.scrollY - this.y); // "-" = up, show
    this.app.dbg(['scroll', window.scrollY, dy]);
    if (this.opt.qTopbar && dy) this.app.e(this.opt.qTopbar, n => this.decorate(n, window.scrollY, dy));
    //if (this.opt.qHideOnScroll) this.app.e(this.opt.qHideOnScroll, n => this.app.toggle(n, false));
    this.y = window.scrollY; // forces reflow
  }
  
  decorate(n, y, dy) {
    n.classList[dy > 0 && y > n.offsetHeight ? 'add' : 'remove'](this.app.opt.cOff)
    n.classList[y /*&& dy <= 0*/ ? 'add' : 'remove'](this.opt.cMiddle)
  }

}
