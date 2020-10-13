/*! swipe - detect touch swipe */

import Plugin from './plugin.js';
import Func from '../util/func.js';

export default class extends Plugin {

  constructor() {
    super('swipe')
    this.moved = null;
    this.startTime = 0;
    this.c = {}; // current move params
    this.opt = {
      qSwipe: '.swipe',
      qDrag: '.drag',
      qKeepDrag: '.drawer',//', .gal a[id]',
      cDragging: 'dragging',
      maxClick: 20,
      minSwipe: 25,
      timeLimit: 300 //ms
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
    //this.app.b([document], 'mousedown', e => e.preventDefault());
    this.app.b([document], ['mousedown', 'touchstart', 'dragstart'], e => this.onStart(e));
    this.app.b([document], ['mousemove', 'touchmove', 'dragover'], e => this.onMove(e), {passive: false});
    this.app.b([window], 'scroll', e => { this.undrag(); this.moved = null; }, true); // do not swipe if scrolling happened
    this.app.b([document], ['click'/*'mouseup'*/, 'mouseleave', 'touchend', 'touchcancel', 'dragend'/*, 'mouseleave'/*, 'blur', 'keydown', 'contextmenu'*/], e => this.onEnd(e), true /*{capture: true, passive: false}*/);
  }

  onStart(e) {
    // console.log('swipe start', e.type);
    if (e.button > 0) {
      this.moved = null;
      return;
    }
    this.moved = e.target.closest?.(this.opt.qSwipe);
    if (this.moved) {
      ////if (!e.type.match(/^touch/)) e.preventDefault(); // avoid click
      let t = e.touches ? e.touches[0] : e;
      this.c.sX = this.c.eX = t.screenX; 
      this.c.sY = this.c.eY = t.screenY;
      this.startTime = Date.now();
    }
  }

  onMove(e) {
    // console.log('swipe move', e.type, this.moved?.tagName, e.target.tagName)
    if (this.moved) {
      // avoid scroll on touch drag
      if (e.type.match(/^touch/) && this.moved.matches(this.opt.qDrag)) e.preventDefault();
      // avoid swipe inside scrollable elements
      //if (e.target.closest && e.target.closest('.roll')) this.moved = null;
      this.drag_(e);
    }
  }
/*
  hasScroll(n, hor) {
    return hor
      ? n.scrollWidth > n.clientWidth + 20
      : n.scrollHeight > n.clientHeight + 20
  }
  
  inScroll(n, hor) {
    while (n) {
      if (this.hasScroll(n, hor)) return true;
      n = n.parentNode;
    }
  }
*/
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
    // console.log('swipe end', e.type, this.moved?.tagName);
    if (this.moved) {
      if((Date.now() - this.startTime < this.opt.timeLimit) || this.moved.matches(this.opt.qDrag)) {
        let undo = (e.type == 'mouseleave' || e.type == 'touchcancel');
        if (undo || !this.moved.matches(this.opt.qKeepDrag)) this.undrag();
        else setTimeout(this.undrag.bind(this, this.moved), 500);
        if (!undo) {
          let xy = this.shift();
          if (xy[2]) {
            //if touch scroll then no swipe
            /*
            const scrollTouch = (
              e.type.match(/^touch/)
              && !this.moved.matches(this.opt.qDrag)
              && this.inScroll(e.target, xy[0])
            );
            if (!scrollTouch) {
            */
            //if (!e.type.match(/^touch/)) e.preventDefault(); // prevent click
            e.unfire = true; // avoid unhash()
            const url = this.moved.dataset['swipe' + xy[2]];
            if (url) location.href = url;
            else this.app.fire('swipe', {e, n: this.moved, x: xy[0], y: xy[1], dir: xy[2]});
            e.preventDefault();
            // console.log('swipe done', e.type, this.moved.tagName, xy[2], url);
            //}
          }
        }
        this.moved.classList.remove(this.opt.cDragging);
        this.moved = null;
      }
    }
  }
  
  shift() {
    //let dirs = this.moved.dataset.swipe || '1234'; // 1=up
    let dx = this.c.eX - this.c.sX;
    let dy = this.c.eY - this.c.sY;
    let adx = Math.abs(dx);
    let ady = Math.abs(dy); 
    let r = [0, 0, 0];
    if (adx >= this.opt.minSwipe || ady >= this.opt.minSwipe) {
      // r = (adx > ady) ? [dx, 0, dx>0 ? 2 : 4] : [0, dy, dy>0 ? 3 : 1];
      r = (adx > ady)
        ? [dx, 0, dx>0 ? 'Right' : 'Left']
        : [0, dy, dy>0 ? 'Down' : 'Up'];
    }
    //if (dirs.indexOf(r[2]) ===-1) r = [0, 0, 0];
    if (!('swipe' + r[2] in this.moved.dataset)) r = [0, 0, 0];
    return r;
  }
  
  undrag(n) {
    if (!n) n = this.moved;
    if(n) n.style.transform = '';
  }

}