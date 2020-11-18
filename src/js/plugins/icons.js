/*! icons - include svg icons */

import Plugin from './plugin.js';
import iconset from '../iconset.js';

export default class extends Plugin {

  constructor() {
    super('icons')

    this.opt = {
      cIcon: 'icon', // class of svg icon
      pIcon: 'icon-', // class prefix of tag to insert icon into
      cEmpty: 'empty',
      qReplace: '.replace',
      re: {'+': ['ok', 'y'], '-': ['no', 'n'], 'x': ['ban', 'e'], '!': ['warning', 'w'], '?': ['help', 'i']}, // sort: !+-?x
      iconSize: 24,
      pSvg: 'icon-' // id prefix to search on page; set false to skip search
    };
    
    this.parsed = {};
    this.icons = iconset;
  }

  init() {
    document.body.classList.add('js-icons');
    this.app.listen('active', e => this.iconize(e.n, e.on)); // as soon as possible
    this.arrange({n: document.body});
    // console.timeEnd('start');
  }
  
  arrange({n}) {
    if (n) {
      this.app.ee(n, '[class*="' + this.opt.pIcon + '"]', n => this.iconize(n));
      this.app.ee(n, this.opt.qReplace, n => this.replace(n));
    }
  }
  
  iconize(n, on) {
    let m = n.className.match(new RegExp('(?:^|\\s)' + (on ? '(?:act-)' : '') + this.opt.pIcon + '([\\w\\-_]+)'));
    if (m && (on === undefined || n.matches('[class*="act-"]'))) {
      this.app.ee(n, 'svg', s => s.parentNode.removeChild(s));
      this.addIcon(m[1], n);
    }
  }
  
  addIcon(i, n) {
    let t = n.textContent;
    let icon = this.i(i);
    if (icon) {
      if (n.classList.contains(this.opt.cEmpty)) {
        this.app.clr(n);
        if (!n.hasAttribute('title')) n.title = t;
        n.classList.remove(this.opt.cEmpty);
      }
      if (n.firstChild && !n.firstChild.tagName) this.app.ins('span', n.firstChild, {}, n, false);
      n.insertBefore(icon, n.firstChild);
    }
  }

  i(ico, alt) {
    let a = ico.split(/[\/_]/);
    ico = a[0];
    if (this.parsed[ico] === undefined) {
      let svg = '';
      if (this.opt.pSvg !== false) {
        let id = this.opt.pSvg + ico;
        let sym = document.getElementById(id);
        if (sym && sym.tagName.toLowerCase() == 'symbol') svg = '<svg><use xlink:href="#' + id + '"></use></svg>'; // from page
      }
      if (!svg) {
        svg = this.icons[ico] || '';
        if (typeof svg !== 'string') {
          svg = '<svg viewBox="0 0 ' + svg[0] + ' ' + svg[0] + '"><path d="' + svg[1] + '"/></svg>'; // from array
        }
      }

      let n;
      if (svg) {
        let div = document.createElement('div');
        div.innerHTML = svg;
        n = div.firstChild;
        if (!n.getAttribute('width'))  n.setAttribute('width', this.opt.iconSize);
        if (!n.getAttribute('height')) n.setAttribute('height', this.opt.iconSize);
        if (!n.getAttribute('class'))  n.setAttribute('class', this.opt.cIcon);
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
  
  prepareSvg(n, a) {
    if (a[0]) n.setAttribute('width', a[0]);
    if (a[1]) n.setAttribute('height', a[1]);
    if (a.length>0) n.setAttribute('class', a.slice(2).join(' ') || '');
    return n;
  }
  
  replace(n) {
    this.app.ee(n, '*', m => this.replaceItem(m, n));
  }
  
  replaceItem (n, p) {
    const t = ('innerText' in n) ? n.innerText.replace(/^\s+|\s+$/g, '') : '';
    if (t.length == 1 && t in this.opt.re && !('val' in n.dataset)) {
      n.innerHTML = '';
      const i = p.dataset[this.opt.re[t][1]] || this.opt.re[t][0];
      this.app.ins('', this.i(i, t), 'text-' + this.opt.re[t][1], n);
      n.dataset.val = t;
    }
  }

}