/*! swipe - detect touch swipe */

import Plugin from './plugin.js';

export default class extends Plugin {

  constructor () {
    super('swipe')
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
  }

  init (){
    this.drag_ = this.app.throttle(e => this.drag(e), 30);
    //console.log('swipe init');
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
    this.app.b([document], ['mousedown', 'touchstart'], e => this.onStart(e));
    this.app.b([document], ['mousemove', 'touchmove'], e => this.onMove(e));
    this.app.b([document], ['click', 'mouseleave', 'touchend', 'touchcancel'/*, 'mouseleave'/*, 'blur', 'keydown', 'contextmenu'*/], e => this.onEnd(e), true);
  }

  onStart (e){
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

  onMove (e){
    if(this.moved){
      e.preventDefault();
      this.drag_(e);
    }
  }
  
  drag (e){
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
  
  onEnd (e){
    //console.log('swipe end', this.moved, e.which, e.button, e);
    if(this.moved){
      let undo = (e.type == 'mouseleave' || e.type == 'touchcancel');
      if(undo || !this.moved.matches(this.opt.qKeepDrag)) this.undrag();
      if(!undo){
        let xy = this.shift();
        //after touch event: handle mouse events only on A nodes without swipe
        //if(e.type.indexOf('touch')!=-1 && (dir || trg.tagName!='A')) e.preventDefault();
        if(xy[2]){
          this.app.fire('swipe', {n: this.moved, x: xy[0], y: xy[1], dir: xy[2]});
          e.preventDefault(); //if(e.type.indexOf('touch')!=-1)
        }
      }
      this.moved.classList.remove(this.opt.cDragging);
      this.moved = null;
    }
  }
  
  shift (){
    let dirs = this.moved.dataset.swipe || '1234'; // 1=up
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
  
  undrag (n){
    if(!n) n = this.moved;
    n.style.transform = '';
  }

}