/*! swipe - detect touch swipe */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'swipe';
  this.moved = null;
  this.c = {};
  this.opt = {
    qSwipe: '.swipe',
    qDrag: '.drag',
    qKeepDrag: '.drawer',//', .gal a[id]',
    cDragging: 'dragging',
    maxClick: 20,
    minSwipe: 50
  };

  this.init = function(){
    console.log('swipe init');
    /*
    events order:
      touchstart
      touchmove(s)
      touchend
      if(!defaultPrevented){
        mousemove
        mousedown
        mouseup & click
      }
    */
    app.b([document], ['mousedown', 'touchstart'], e => this.onStart(e));
    app.b([document], ['mousemove', 'touchmove'], e => this.onMove(e));
    app.b([document], ['click', 'mouseleave', 'touchend', 'touchcancel'/*, 'mouseleave'/*, 'blur', 'keydown', 'contextmenu'*/], e => this.onEnd(e), true);
  }

  this.onStart = function(e){
    //console.log('swipe start', e.type, e.button, e.which);
    if(e.button > 0){
      this.moved = null;
      return;
    }
    this.moved = e.target.closest(this.opt.qSwipe);
    if(this.moved){
      let t = e.touches ? e.touches[0] : e;
      this.c.sX = this.c.eX = t.screenX; 
      this.c.sY = this.c.eY = t.screenY;
    }
  }

  this.onMove = function(e){
    if(this.moved){
      e.preventDefault();
      this.drag_(e);
    }
  }
  
  this.drag = function(e){
    //console.log('swipe drag');
    let t = e.touches ? e.touches[0] : e;
    this.c.eX = t.screenX; 
    this.c.eY = t.screenY;
    if(this.moved && this.moved.matches(this.opt.qDrag)){
      let xy = this.shift();
      this.moved.style.transform = 'translate(' + xy[0] + 'px, ' + xy[1] + 'px)';
      this.moved.classList.add(this.opt.cDragging);
      //this.moved.style.zIndex = 100;
    }
  }
  
  this.drag_ = app.throttle(e => this.drag(e), 30);

  this.onEnd = function(e){
    //console.log('swipe end', this.moved, e.which, e.button, e);
    if(this.moved){
      let undo = (e.type == 'mouseleave' || e.type == 'touchcancel');
      if(undo || !this.moved.matches(this.opt.qKeepDrag)) this.undrag();
      if(!undo){
        let xy = this.shift();
        //after touch event: handle mouse events only on A nodes without swipe
        //if(e.type.indexOf('touch')!=-1 && (dir || trg.tagName!='A')) e.preventDefault();
        if(xy[2]){
          app.fire('swipe', {n: this.moved, x: xy[0], y: xy[1], dir: xy[2]});
          e.preventDefault(); //if(e.type.indexOf('touch')!=-1)
        }
      }
      this.moved.classList.remove(this.opt.cDragging);
      this.moved = null;
    }
  }
  
  this.shift = function(){
    let dirs = app.attr(this.moved, 'data-swipe', '1234');
    let dx = this.c.eX - this.c.sX;
    let dy = this.c.eY - this.c.sY;
    let adx = Math.abs(dx);
    let ady = Math.abs(dy); 
    let r = [0, 0, 0];
    if(adx >= this.opt.minSwipe || ady >= this.opt.minSwipe){
      r = (adx > ady) ? [dx, 0, dx>0 ? 2 : 4] : [0, dy, dy>0 ? 3 : 1];
    }
    if(dirs.indexOf(r[2]) ===-1) r = [0, 0, 0];
    return r;
  }
  
  this.undrag = function(n){
    if(!n) n = this.moved;
    n.style.transform = '';
  }

})();