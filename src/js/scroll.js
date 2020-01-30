/*! scroll - scrolling behaviours (topbar, drawer) */

let app = require('./app.js');
let toggle = require('./toggle.js');

module.exports = new(function () {

  "use strict";

  this.name = 'scroll';
  
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
  
  this.init = function () {
    let t;
    if(app.q(this.opt.qEnable)){
      app.listen('hash', e => this.onHash(e));
      let ons = app.throttle(() => this.onScroll(), 500);
      //let ons = app.throttle((h) => this.onScroll(h), 500);
      //ons(); // forces reflow
      setTimeout(() => this.onScroll(), 20);
      app.b([window], 'scroll', e => ons(/*this.hashed*/));
    }
    /*
    else if(t = app.q(this.opt.qTopbarFixed)){
      app.listen('hash', e => this.fixScroll());
    }
    */
  }
  
  this.onHash = function(e){
    //to hide topbar on hash change
    // fires before onscroll, but page is already scrolled
    app.dbg(['scroll hash', location.hash,e]);
    if(e && location.hash && app.q(location.hash)){
      this.y = window.scrollY - 10;
      //this.y = 1;
      //this.hashed = true;
    }
  }
  
  this.onScroll = function(/*h*/){
    //let mode = this.hashed ? 'hash' : (h ? 'fix' : 'scroll');
    let dy = window.scrollY ===null ? null : window.scrollY - this.y;
    app.dbg(['scroll', window.scrollY, dy]); // ,mode,h,this.hashed
    if(this.y!==null/* && !h*/){
      if(this.opt.qTopbar) app.e(this.opt.qTopbar, n => this.decorate(n, window.scrollY, dy));
      if(this.opt.qHideOnScroll) app.e(this.opt.qHideOnScroll, n => toggle.toggle(n, false));
    }
    this.y = window.scrollY; // forces reflow
    //if(this.hashed) this.fixScroll();
    //this.hashed = false;
  }
  
  this.decorate = function(n, y, dy){
    n.classList[dy > 0 && y > n.offsetHeight ? 'add' : 'remove'](app.opt.cOff)
    n.classList[y && dy <= 0 ? 'add' : 'remove'](this.opt.cStart)
  }

  /*
  this.fixScroll = function(){
    app.dbg(['scroll-fix', location.hash]);
    if(app.q(location.hash)){
      //let t = app.q(this.opt.qTopbar + ':not(.'+ app.opt.cOff +')');
      let t = app.q(this.opt.qTopbarFixed);
      window.scrollBy(0, (t ? -t.offsetHeight : 0) - this.opt.gap);
    }
    //this.hashed = false;
    //setTimeout(() => this.hashed = false, 500);
  }
  */
})();
