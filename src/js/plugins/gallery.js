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
    this.app.h('click', this.opt.qGal, e => this.next(e));
    this.app.listen('hashchange', e => this.onHash(e));
    this.app.listen('keydown', e => this.onKey(e));
    this.arranger();
  }
  
  arrange({n, opt}) {
    if (n && n.matches(this.opt.qGallery)) this.prepare(n, opt?.gallery);
    this.app.e(this.app.qq(this.opt.qGallery, n), m => this.prepare(m, opt?.gallery));
  }
  
  prepare(n, opt) {
    opt = opt ? {...this.opt, ...opt} : this.opt;
    const app = this.app;
    const g = app.ins('div', '', {className: opt.cGal});
    const a = app.qq(opt.qLinks, n);
    const z = a.length;

    if (opt.rebuild) {
      if (n.vGal) n.vGal.parentNode.removeChild(n.vGal);
      this.app.e(this.app.qq(this.opt.qLinks, n), a => delete a.vDone);
    }
    
    let first = 0;
    for (let i=0; i<z; i++) if (!a[i].vDone) {
      const s = app.seq();
      if (!i) first = s;
      const next = '#' + opt.idPrefix + (i == z-1 ? first : s+1);
      const prev = '#' + opt.idPrefix + (i == 0 ? first+z-1 : s-1);
      const p = app.ins('a', '', {
          className: 'gallery-pic swipe drag',
          id: opt.idPrefix + s,
          href: next,
          'data-swipe-up': a[i].href || '',
          'data-swipe-right': prev,
          'data-swipe-down': this.app.opt.hClose,
          'data-swipe-left': next
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
    n.vGal = g;
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