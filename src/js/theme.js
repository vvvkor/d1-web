/*! theme - live theme configurator */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'theme';
  this.drw = null;

  this.opt = {
    idTheme: 'theme-config'
  };

  this.init = function(){
    //this.restore(document.documentElement, 'theme-html');
    this.restore(document.body, 'theme-body');

    //button
    let a = app.ins('a', 'Theme', {href: '#' + this.opt.idTheme, className: 'fix pad btn theme-btn'}, document.body);
    let s = a.style;
    s.transform = 'rotate(-90deg)';
    s.transformOrigin = '100% 100%';
    s.top = '10vh';
    s.right = '-.2em';
    s.bottom = s.left = 'auto';
    s.margin = 0;
    //drawer
    this.drw = app.ins('div', '', {id: this.opt.idTheme, className: app.opt.cToggle + ' ' + app.opt.cOff + ' drawer pad shift theme-drawer'}, document.body);
    app.ins('a', '&#x2715;', {href: '#cancel', className: 'pad hover close'}, this.drw);
    
    //menu
    this.h('Theme', 2);
    app.b([app.ins('a', 'Reset to default', {href:'#', className: ''}, this.drw)], 'click', e => this.unstyle(e));
    this.put('Background', ['#fff', '#eee', '#ffeee6', '#ffe', '#efe', '#e6fcf9', '#e3eeff', '#f9e9ff'], '--bg');
    this.put('Menu', ['rgba(255,255,255,0)', 'rgba(0,0,0,.1)', 'hsla(1,100%,55%,.3)', 'hsla(45,100%,50%,.3)', 'hsla(120,100%,35%,.3)', 'hsla(180,100%,35%,.3)', 'hsla(220,100%,55%,.3)', 'hsla(290,100%,50%,.3)'], ['--bg-pane', '--bg-hilite']);
    this.put('Links', ['#000', '#777', '#c00', '#c60', '#090', '#088', '#00c', '#909'], ['--link', '--visited', '--hover']);
    this.put('Text', ['#000', '#222', '#444', '#555',  '#666', '#777', '#888', '#999'], '--text');
    this.put('Font', this.opt.fonts || ['sans-serif', 'serif', 'monospace'], 'font-family');
    this.put('Gaps', ['0.5', '0.7', '1', '1.2', '1.5'], '--gap');
  }
  
  this.restore = function(n, v){
    let css = localStorage.getItem(v);
    if(css) n.style = css;
  }
  
  this.style = function(k, v, deep){
    if(k instanceof Array) k.forEach(w => this.style(w, v, 1));
    else{
      //let n = (k.substr(0, 2)=='--') ? document.documentElement : document.body;
      let n = document.body;
      n.style.setProperty(k, v);
      localStorage.setItem('theme-'+n.tagName.toLowerCase(), n.style.cssText);
    }
  }
  
  this.unstyle = function(e){
    e.preventDefault();
    /*document.documentElement.style = */document.body.style = '';
    localStorage.removeItem('theme-html');
    localStorage.removeItem('theme-body');
  }
  
  this.h = function(s, l){
    app.ins('h'+(l || 1), s, {className: 'mar'}, this.drw);
  }
  
  this.put = function(hh, arr, func){
    this.h(hh, 3);
    let c = [];
    arr.forEach((v/*, k*/) => {
      let color = v.match(/[#(]/);
      let a = app.ins('a', color ? '' : v, {href:'#', title: v, className: color ? 'pad hover bord' : 'pad hover'}, this.drw);
      if(color) a.style.backgroundColor = v;
      else if(typeof func === 'string') a.style[func] = v;
      c.push(a);
    });
    app.b(c, 'click', (func instanceof Function
      ? func
      : e => {
          e.preventDefault();
          this.style(func, e.target.title);
        }
    ));
  }

})();