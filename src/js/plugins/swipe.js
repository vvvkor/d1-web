/*! swipe - detect touch swipe */

import Plugin from './plugin.js';
import Func from '../util/func.js';

export default class extends Plugin {

  constructor() {
    super('swipe')
    this.moved = null;
    this.c = {}; // current move params
    this.opt = {
      qSwipe: '.swipe',
      qDrag: '.drag',
      qKeepDrag: '.drawer',//', .gal a[id]',
      cDragging: 'dragging',
      maxClick: 20,
      minSwipe: 25
    };
  }

  init() {
    //this.drag_ = e => this.drag(e);
    this.drag_ = Func.throttle(e => this.drag(e), 30);
    //console.log('swipe init');
    /*
    events order:
      touchstart
      touchmove(s)
      touchend
      if (!defaultPrevented) {
        mousemove
        mousedown
        mouseup & click
      }
    */
    //firefox needs also: dragover, dragend (click is not prevented!)
    this.app.b([document], ['mousedown', 'touchstart'], e => this.onStart(e));
    this.app.b([document], ['mousemove', 'touchmove', 'dragover'], e => this.onMove(e), {passive: false});
    this.app.b([document], ['click', 'mouseleave', 'touchend', 'touchcancel', 'dragend'/*, 'mouseleave'/*, 'blur', 'keydown', 'contextmenu'*/], e => this.onEnd(e), true);
  }

  onStart(e) {
    //console.log('swipe start', e.type, e.button, e.which);
    if (e.button > 0) {
      this.moved = null;
      return;
    }
    this.moved = e.target.closest(this.opt.qSwipe);
    if (this.moved) {
      e.preventDefault(); // fix firefox: avoid click on dragend
      let t = e.touches ? e.touches[0] : e;
      this.c.sX = this.c.eX = t.screenX; 
      this.c.sY = this.c.eY = t.screenY;
    }
  }

  onMove(e) {
    //console.log('swipe move', e.type, this.moved?.tagName)
    if (this.moved) {
      e.preventDefault();
      this.drag_(e);
    }
  }

  drag(e) {
    let t = e.touches ? e.touches[0] : e;
    this.c.eX = t.screenX; 
    this.c.eY = t.screenY;
    if (this.moved && this.moved.matches(this.opt.qDrag)) {
      //requestAnimationFrame(() => {
      //console.log('swipe drag');
      let xy = this.shift();
      this.moved.style.transform = 'translate(' + xy[0] + 'px, ' + xy[1] + 'px)';
      this.moved.classList.add(this.opt.cDragging);
      //this.moved.style.zIndex = 99;
      //});
    }
  }
  
  onEnd(e) {
    //console.log('swipe end', this.moved, e.which, e.button, e);
    if (this.moved) {
      let undo = (e.type == 'mouseleave' || e.type == 'touchcancel');
      if (undo || !this.moved.matches(this.opt.qKeepDrag)) this.undrag();
      if (!undo) {
        let xy = this.shift();
        //after touch event: handle mouse events only on A nodes without swipe
        //if (e.type.indexOf('touch') != -1 && (dir || trg.tagName != 'A')) e.preventDefault();
        if (xy[2]) {
          //console.log('swiped', xy[2], this.moved);
          e.preventDefault(); //if (e.type.indexOf('touch') != -1)
          this.app.fire('swipe', {n: this.moved, x: xy[0], y: xy[1], dir: xy[2]});
        }
      }
      this.moved.classList.remove(this.opt.cDragging);
      this.moved = null;
    }
  }
  
  shift() {
    let dirs = this.moved.dataset.swipe || '1234'; // 1=up
    let dx = this.c.eX - this.c.sX;
    let dy = this.c.eY - this.c.sY;
    let adx = Math.abs(dx);
    let ady = Math.abs(dy); 
    let r = [0, 0, 0];
    if (adx >= this.opt.minSwipe || ady >= this.opt.minSwipe) {
      r = (adx > ady) ? [dx, 0, dx>0 ? 2 : 4] : [0, dy, dy>0 ? 3 : 1];
    }
    if (dirs.indexOf(r[2]) ===-1) r = [0, 0, 0];
    return r;
  }
  
  undrag(n) {
    if (!n) n = this.moved;
    n.style.transform = '';
  }

}