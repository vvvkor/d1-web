/*! theme - live theme configurator */

import Plugin from './plugin.js';

export default class extends Plugin {

  constructor () {
    super('theme')
    this.drw = null;

    this.opt = {
      cTheme: 'js-theme',
      idTheme: 'theme-config'
    };
  }
  
  init () {
    if(!document.body.classList.contains(this.opt.cTheme)) return;
    this.restore(document.documentElement, 'theme-html');
    //this.restore(document.body, 'theme-body');

    //button
    //const cl = 'fix pad btn hover theme-btn hide-print';
    const cl = 'fix pad let back shade theme-btn hide-print';
    let a = this.app.ins('a', 'Theme', {href: '#' + this.opt.idTheme, className: cl}, document.body);
    let s = a.style;
    s.transform = 'rotate(-90deg)';
    s.transformOrigin = '100% 100%';
    s.top = '10vh';
    s.right = '-.2em';
    s.bottom = s.left = 'auto';
    s.margin = 0;
    s.opacity = .5;
    //drawer
    this.drw = this.app.ins('div', '', {id: this.opt.idTheme, className: this.app.opt.cToggle + ' ' + this.app.opt.cOff + ' drawer swipe drag pad small shift theme-drawer', 'data-swipe': '2'}, document.body);
    this.app.ins('a', '&#x2715;', {href: '#cancel', className: 'pad hover close'}, this.drw);
    
    //menu
    this.hx('Theme', 2);
    this.app.b([this.app.ins('a', 'Reset to default', {href:'#', className: ''}, this.drw)], 'click', e => this.unstyle(e));
    this.put('Background', ['#fff', '#eee', '#ffeee6', '#ffe', '#efe', '#e6fcf9', '#e3eeff', '#f9e9ff'], '--bg');
    this.put('Menu', ['rgba(255,255,255,0)', 'rgba(0,0,0,.1)', 'hsla(1,100%,55%,.3)', 'hsla(45,100%,50%,.3)', 'hsla(120,100%,35%,.3)', 'hsla(180,100%,35%,.3)', 'hsla(220,100%,55%,.3)', 'hsla(290,100%,50%,.3)'], ['--bg-pane', '--bg-hilite']);
    this.put('Links', ['#000', '#777', '#c00', '#c60', '#090', '#088', '#00c', '#909'], ['--link', '--visited', '--hover']);
    this.put('Text', ['#000', '#222', '#444', '#555',  '#666', '#777', '#888', '#999'], '--text');
    this.put('Font', this.opt.fonts || ['sans-serif', 'serif', 'monospace'], '--font');
    this.put('Gaps', ['0.5', '0.7', '1', '1.2', '1.5'], '--gap');
  }
  
  restore (n, v){
    let css = localStorage.getItem(v);
    if(css) n.style = css;
  }
  
  style (k, v/*, deep*/){
    if(k instanceof Array) k.forEach(w => this.style(w, v/*, 1*/));
    else{
      //let n = (k.substr(0, 2)=='--') ? document.documentElement : document.body;
      //let n = document.body;
      let n = document.documentElement;
      n.style.setProperty(k, v);
      localStorage.setItem('theme-'+n.tagName.toLowerCase(), n.style.cssText);
    }
  }
  
  unstyle (e){
    e.preventDefault();
    let s = document.documentElement.style;
    for(var i = s.length; i--;) s.removeProperty(s[i]);
    //document.documentElement.style = '';
    ////document.body.style = '';
    localStorage.removeItem('theme-html');
    //localStorage.removeItem('theme-body');
  }
  
  hx (s, l){
    this.app.ins('h'+(l || 1), s, {className: 'mar'}, this.drw);
  }
  
  put (hh, arr, func){
    this.hx(hh, 3);
    let c = [];
    arr.forEach((v/*, k*/) => {
      let color = v.match(/[#(]/);
      let a = this.app.ins('a', color ? '' : v, {href:'#', title: v, className: color ? 'pad hover bord' : 'pad hover'}, this.drw);
      if(color) a.style.backgroundColor = v;
      else if(typeof func === 'string') a.style[func] = v;
      c.push(a);
    });
    this.app.b(c, 'click', (func instanceof Function
      ? func
      : e => {
          e.preventDefault();
          this.style(func, e.target.title);
        }
    ));
  }

}