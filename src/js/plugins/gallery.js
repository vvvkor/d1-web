/*! gallery - image gallery */

// .gallery a.pic 

import Plugin from './plugin.js';

export default class extends Plugin {

  constructor() {
    super('gallery')
  
    this.opt = {
      idPrefix: 'pic-',
      num: true,
      cGal: 'gal',
      dCaption: 'caption', // data-caption
      qGal: '.gal>a[id]', // dup of toggle.opt.qGal
      qGallery: '.gallery',
      qLinks: 'a.pic'
    };
  }
  
  init() {
    this.app.listen('hashchange', e => this.onHash(e));
    this.app.listen('keydown', e => this.onKey(e));
    this.app.h('click', this.opt.qGal, e => this.next(e));
    this.app.listen('swipe', e => this.swipe(e));
    this.app.listen('exhibit', e => this.reinit(e));
    this.prepareAll();
  }
  
  reinit({n, opt}) {
    if (n.vGal) n.vGal.parentNode.removeChild(n.vGal);
    this.app.e(this.app.qq(this.opt.qLinks, n), a => delete a.vDone);
    n.vGal = this.prepare(n, opt);
  }
  
  prepareAll(d) {
    this.app.e(this.app.qq(this.opt.qGallery, d), n => this.prepare(n));
  }
  
  swipe(e) {
    if (e.n.matches(this.opt.qGal)) {
      if (e.dir == 4) this.browse(e.n); // left
      else if (e.dir == 2) this.browse(e.n, true); // right
      else if (e.dir == 3) this.app.fire('esc'); // down
      else if (e.dir == 1) this.visit(e.n); // up
    }
  }
  
  next(e) {
    if (e.defaultPrevented) return;
    const n = e.recv;
    if (e.clientX > 0 /* not Enter key */ && e.clientX < n.clientWidth / 3) {
      this.browse(n, true);
      e.preventDefault();
    }
  }
  
  browse(n, back) {
    if (back) {
      const p = n.previousElementSibling || this.app.qq('a[id]', n.parentNode).pop();
      if (p.id) location.hash = '#' + p.id;
    }
    else location.hash = n.hash;
    //return p.id;
  }
  
  onHash() {
    const n = this.app.q(location.hash);
    if (n) {
      this.loadImg(n);
      this.loadImg(this.app.q(n.hash)); // preview next
    }
  }
  
  loadImg(n) {
    if (n && n.vImg) {
      n.style.backgroundImage = 'url("' + n.vImg + '")';
      n.vImg = '';
    }
  }
  
  prepare(n, opt) {
    opt = opt ? {...this.opt, ...opt} : this.opt;
    const app = this.app;
    const g = app.ins('div', '', {className: opt.cGal});
    const a = app.qq(opt.qLinks, n);
    const z = a.length;
    let first = 0;
    for (let i=0; i<z; i++) if (!a[i].vDone) {
      const s = app.seq();
      if (!i) first = s;
      const p = app.ins('a', '', {
          className: 'gallery-pic swipe drag',
          id: opt.idPrefix + s,
          href: '#' + opt.idPrefix + (i == z-1 ? first : s+1)
          }, g);
      //p.style.setProperty('--img', 'url("' + (a[i].getAttribute('href') || '') + '")');
      //p.style.backgroundImage = 'url("' + (a[i].getAttribute('href') || '') + '")';//preload all
      p.vLink = a[i].getAttribute('href') || '';//real link
      p.vImg = p.vLink;//keep image url but do not load yet
      p.dataset[opt.dCaption] = (opt.num ? (i+1)+'/'+z+(a[i].title ? ' - ' : '') : '') + (a[i].title || '');
      a[i].href = '#' + p.id;
      a[i].vDone = 1;
    }
    app.x(g);
    document.body.appendChild(g);
    return g;
  }

  visit(a) {
    let h = a.vLink;
    if (!h) {
      h = window.getComputedStyle(a).backgroundImage;
      h = h.substring(4, h.length-1).replace(/^"|"$/g, '');
    }
    if (h) location.href = h;
  }
  
  onKey(e) {
    if (location.hash) {
      const a = this.app.q(location.hash);
      if (a && a.hash) {
        const k = e.keyCode;
        if (k == 37 || k == 38) this.browse(a, true);
        else if (k == 39 || k == 40) this.browse(a);//a.click();
        else if (k == 8) this.visit(a);
        //e.preventDefault();
      }
    }
  }

}