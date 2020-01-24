/*! gallery - image gallery */

// .gallery a.pic 

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'gallery';
  
  this.opt = {
    idPrefix: 'pic-',
    num: true,
    cGal: 'gal',
    qGal: '.gal>a[id]', // dup of toggle.opt.qGal
    qGallery: '.gallery',
    qLinks: 'a.pic'
  };
  
  this.init = function () {
    app.listen('hash', e => this.onHash(e));
    app.listen('key', e => this.onKey(e));
    app.listen('click', e => this.onClick(e));
    app.e(this.opt.qGallery, n => this.prepare(n));
  }
  
  this.onClick = function(e){
    let n = e.target;
    if(n.matches(this.opt.qGal)){
      if(e.clientX > 0 /* not Enter key */ && e.clientX < n.clientWidth / 3){
        if(this.prevImg(n)) e.preventDefault();
      }
      //return n;
    }
  }
  
  this.prevImg = function(n) {
    let p = n.previousElementSibling || app.qq('a[id]', n.parentNode).pop();
    if(p.id) location.hash = '#' + p.id;
    return p.id;
  }
  
  this.onHash = function() {
    let n = app.q(location.hash);
    if(n) {
      this.loadImg(n);
      this.loadImg(app.q(n.hash));
    }
  }
  
  this.loadImg = function(n){
    if(n && n.vImg){
      n.style.backgroundImage = 'url("' + n.vImg + '")';
      n.vImg = '';
    }
  }
  
  this.prepare = function (n) {
    let g = app.ins('div', '', {className: this.opt.cGal});
    let a = app.qq(this.opt.qLinks, n);
    let z = a.length;
    let first = 0;
    for(let i=0; i<z; i++) if(!a[i].vDone) {
      let s = app.seq();
      if(!i) first = s;
      let p = app.ins('a', '', {
          id: this.opt.idPrefix + s,
          href: '#' + this.opt.idPrefix + (i==z-1 ? first : s+1)
          }, g);
      //p.style.setProperty('--img', 'url("' + app.attr(a[i], 'href') + '")');
      //p.style.backgroundImage = 'url("' + app.attr(a[i], 'href') + '")';//preload all
      p.vLink = app.attr(a[i], 'href');//real link
      p.vImg = app.attr(a[i], 'href');//preload prev & next
      p.setAttribute(app.opt.aCaption, (this.opt.num ? (i+1)+'/'+z+(a[i].title ? ' - ' : '') : '') + (a[i].title || ''));
      a[i].href = '#' + p.id;
      a[i].vDone = 1;
    }
    app.x(g);
    app.b(app.qq('a[id]', g), 'click', app.gotoPrev);
    document.body.appendChild(g);
  }

  this.onKey = function(e) {
    if(location.hash) {
      let a = app.q(location.hash);
      if(a && a.hash){
        let k = e.keyCode;
        if (k==37 || k==38) this.prevImg(a);
        else if (k==39 || k==40) location.hash = a.hash;//a.click();
        else if(k==8){
          let h = a.vLink;
          if(!h){
            h = window.getComputedStyle(a).backgroundImage;
            h = h.substring(4, h.length-1).replace(/^"|"$/g, '');
          }
          if(h) location.href = h;
        }
        //e.preventDefault();
      }
    }
  }

})();