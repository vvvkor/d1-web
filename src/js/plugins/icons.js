/*! icons - include svg icons */

// let app = require('./app.js');
// let iconset = require('./iconset.js');
import Plugin from './plugin.js';
import iconset from './iconset.js';

export default class extends Plugin {

  // "use strict";

  constructor () {
    super('icons')

    this.opt = {
      cIcon: 'icon',
      iconSize: 24,
      pSvg: 'icon-', // id prefix to search on page; set false to skip search
      //aReplace: 'data-ico',
      //aAdd: 'data-icon',
      qIcon: '[data-ico], [data-icon], [class*="ico-"], [class*="icon-"]',
      qIconReplace: '[data-ico], [class*="ico-"]'
    };
    
    this.parsed = {};
    this.icons = iconset;
  }

  init () {
    //this.app.e('[' + this.opt.aReplace + ']',  n => this.addIcon(this.app.attr(n, this.opt.aReplace, ''), n, true));
    //this.app.e('[' + this.opt.aAdd + ']', n => this.addIcon(this.app.attr(n, this.opt.aAdd, ''), n));
    this.app.e(this.opt.qIcon, n => this.iconize(n));
  }
  
  iconize (n) {
    let m, i = this.app.attr(n, 'data-ico') || this.app.attr(n, 'data-icon');
    if(!i){
      m = n.className.match(/\bicon?-([\w\-_]+)/);
      if(m) i = m[1];
    }
    if(i){
      let clr = n.matches(this.opt.qIconReplace);
      this.addIcon(i, n, clr);
      if(m) n.classList.remove(m[0]);
    }
  }

  addIcon (i, n, clr) {
    let t = n.textContent;
    let icon = this.i(i);
    if(icon){
      if(clr){
        this.app.clr(n);
        if(!n.title) n.title = t;
      }
      //if(n.firstChild) n.insertBefore(document.createTextNode(' '), n.firstChild);
      if(n.firstChild && !n.firstChild.tagName) this.app.ins('span', n.firstChild, {}, n, false);
      n.insertBefore(icon, n.firstChild);
    }
  }

  i (ico, alt) {
    let a = ico.split(/[\/_]/);
    ico = a[0];
    if(this.parsed[ico] === undefined){
      let svg = '';
      if(this.opt.pSvg !== false){
        let id = this.opt.pSvg + ico;
        let sym = document.getElementById(id);
        if(sym && sym.tagName.toLowerCase()=='symbol') svg = '<svg><use xlink:href="#' + id + '"></use></svg>'; // from page
      }
      if(!svg){
        svg = this.icons[ico] || '';
        if(typeof svg !== 'string'){
          svg = '<svg viewBox="0 0 ' + svg[0] + ' ' + svg[0] + '"><path d="' + svg[1] + '"/></svg>'; // from array
        }
      }

      let n;
      if(svg){
        let div = document.createElement('div');
        div.innerHTML = svg;
        n = div.firstChild;
        if(!this.app.attr(n, 'width'))  n.setAttribute('width', this.opt.iconSize);
        if(!this.app.attr(n, 'height')) n.setAttribute('height', this.opt.iconSize);
        if(!this.app.attr(n, 'class'))  n.setAttribute('class', this.opt.cIcon);
      }
      else n = '';
      this.parsed[ico] = n;
    }
    return this.parsed[ico]
      ? this.prepareSvg(this.parsed[ico].cloneNode(true), a.slice(1))
      : (alt
        ? this.app.ins('span', alt)
        : null
        );
  }
  
  prepareSvg (n, a) {
    if(a[0]) n.setAttribute('width', a[0]);
    if(a[1]) n.setAttribute('height', a[1]);
    if(a.length>0) n.setAttribute('class', a.slice(2).join(' ') || '');
    return n;
  }

}