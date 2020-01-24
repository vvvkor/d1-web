/*! icons - include svg icons */

let app = require('./app.js');
let iconset = require('./iconset.js');

module.exports = new(function () {

  "use strict";

  this.name = 'icons';

  this.opt = {
    cIcon: 'icon',
    iconSize: 24,
    pSvg: 'icon-', // id prefix to search on page; set false to skip search
    aReplace: 'data-ico',
    aAdd: 'data-icon'
  };
  
  this.parsed = {};
  this.icons = iconset;

  this.init = function () {
    app.e('[' + this.opt.aReplace + ']',  n => this.addIcon(app.attr(n, this.opt.aReplace), n, true));
    app.e('[' + this.opt.aAdd + ']', n => this.addIcon(app.attr(n, this.opt.aAdd), n));
  }

  this.addIcon = function(i, n, clr){
    let t = n.textContent;
    let icon = this.i(i);
    if(icon){
      if(clr){
        app.clr(n);
        if(!n.title) n.title = t;
      }
      //if(n.firstChild) n.insertBefore(document.createTextNode(' '), n.firstChild);
      if(n.firstChild && !n.firstChild.tagName) app.ins('span', n.firstChild, {}, n, false);
      n.insertBefore(icon, n.firstChild);
    }
  }

  this.i = function(ico, alt){
    let a = ico.split(/\//);
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
        if(!app.attr(n, 'width'))  n.setAttribute('width', this.opt.iconSize);
        if(!app.attr(n, 'height')) n.setAttribute('height', this.opt.iconSize);
        if(!app.attr(n, 'class'))  n.setAttribute('class', this.opt.cIcon);
      }
      else n = '';
      this.parsed[ico] = n;
    }
    return this.parsed[ico]
      ? this.prepareSvg(this.parsed[ico].cloneNode(true), a.slice(1))
      : (alt
        ? app.ins('span', alt)
        : null
        );
  }
  
  this.prepareSvg = function(n, a){
    if(a[0]) n.setAttribute('width', a[0]);
    if(a[1]) n.setAttribute('height', a[1]);
    if(a.length>0) n.setAttribute('class', a[2] || '');
    return n;
  }

})();