/*! edit - wysiwyg text editor */

let app = require('./app.js');
let toggle = require('./toggle.js');

module.exports = new(function () {

  "use strict";

  this.name = 'edit';

  this.opt = {
    qAdjust: 'textarea.adjust',
    qEdit: 'textarea.edit',
    height: 30,//em
    tools: '/*@xbi_.#123p|c,s^vdqf~T(=)j+-'
  };
  
  this.btn = {
    // key: [command, html, icon, title]
    '/': ['src', '', '/', 'Source'], // &lt;/&gt;
    '*': ['insertimage', '~', '*', 'Image'],
    '@': ['createlink', '~', '@', 'Link'],
    'x': ['unlink', '', '&times;', 'Unlink'],
    'b': ['bold', '', '<b>B</b>', 'Bold'],
    'i': ['italic', '', '<i>I</i>', 'Italic'],
    '_': ['removeformat', '', '_', 'Unformat'],
    '.': ['insertUnorderedList', '', '&bull;', 'List'],
    '#': ['insertOrderedList', '', '#', 'Ordered'],
    '1': ['formatblock', '<h1>', 'H1', 'Head 1'],
    '2': ['formatblock', '<h2>', 'H2', 'Head 2'],
    '3': ['formatblock', '<h3>', 'H3', 'Head 3'],
    'p': ['formatblock', '<p>', '&sect;', 'Paragraph'],
    '|': ['tools', '', '&hellip;', 'Tools'],
    //more
    //inline
    'c': ['inserthtml', '<code>^</code>', '{}', 'Code'],
    ',': ['inserthtml', '<abbr title="~">^</abbr>', 'A.B.', 'Abbreviation'],
    's': ['strikeThrough', '', '<s>S</s>', 'Strike through'],
    '^': ['subscript','','a<sub>x</sub>','Subscript'],
    'v': ['superscript','','a<sup>x</sup>','Superscript'],
    //block
    'd': ['formatblock', '<div>', 'D', 'Div'],
    'q': ['formatblock', '<blockquote>', '&#8220;', 'Block quote'],
    'f': ['formatblock', '<pre>', '[]', 'Preformatted'],
    '~': ['inserthorizontalrule', '', '&minus;', 'Horizontal ruler'],
    'T': ['inserthtml', '<table><tr><th>#<th>#<tr><td>-<td>-</table>', 'T', 'Table'],
    //more
    '(': ['justifyLeft', '', '&lt;', 'Justify left'],
    '=': ['justifyCenter', '', '=', 'Justify center'],
    ')': ['justifyRight', '', '&gt;', 'Justify right'],
    'j': ['justifyFull', '', '&equiv;', 'Justify full'],
    '+': ['indent', '', '&raquo;', 'Increase indent'],
    '-': ['outdent', '', '&laquo;', 'Decrease indent']
    /*
    'u': ['underline', '', 'U', 'Underline'],
    'C': ['foreColor','~','TC','Text color','#c00'],
    'h': ['hiliteColor','~','HC','Hilite color','#ff0'],
    'B': ['backColor','~','BC','Back color','#eee'],
    'S': ['fontSize','~','FS','Font size',4],
    'F': ['fontName','~','FN','Font name','serif'],
    'L': ['inserthtml','<div class="pad bg left">^</div>','FL','Float left'],
    'R': ['inserthtml','<div class="pad bg right">^</div>','FR','Float right']
    */
  };

  this.init = function () {
    app.e(this.opt.qEdit, n => this.prepare(n));
    app.e(this.opt.qAdjust, n => this.setStyle(n));
    this.adjustAll();
    //wysiwyg
    app.h('click', 'label[for]', e => this.setFocus(e.recv));
    app.h('click', 'a[data-cmd]', e => this.cmd(e));
    app.h(['input', 'blur'], '.edit-wysiwyg', e => this.up(0, e.target));//for validation
    app.b([window], 'paste', e => this.onPaste(e), true);
    //adjust
    app.h('input', this.opt.qAdjust, e => this.adjust(e.target));
    app.h('mouseup', this.opt.qAdjust, e => this.resized(e.target));
    app.b([window], 'resize', e => this.adjustAll());
  }
  
  this.setFocus = function(l){
    let a = app.q('#' + l.htmlFor);
    if(a && a.theWys && app.vis(a.theWys)) a.theWys.focus();
  }

  this.prepare = function (n) {
    if(!n.theWys){
      let m = app.ins('nav', '', {className: 'bg'}, /*d*/ n, -1);
      let mm = app.ins('div', '', {className: app.opt.cToggle + ' ' + app.opt.cOff});
      //let zc = app.ins('div', '', {className:'subinput'}, n, 1)
      let z = app.ins('div', '', {className: app.opt.cToggle + ' bord pad subinput edit-wysiwyg'}, n, 1/*zc*/);
      z.setAttribute('contenteditable', true);
      z.theArea = n;
      z.theNav = m;
      n.theWys = z;
      n.classList.add(app.opt.cToggle);
      if(n.id) z.id = 'wys-' + n.id;
      let t = app.attr(n, 'data-tools', this.opt.tools).split('');
      let to = m;
      for (let i in t) {
        let b = this.btn[t[i]];
        let a = app.ins('a', b[2], {href: '#cmd-' + b[0]/*i*/, title: b[3], className: app.opt.cToggle + ' pad hover', 'data-cmd': t[i]}, to);
        if(b[0] == 'tools') to = mm;
      }
      m.appendChild(mm);
      n.className += ' bord pad';
      n.style.width = '100%';
      this.setStyle(n);
      this.setStyle(z);
      //let l = n.closest('label') || n;
    }
    this.up(1, n.theWys);
    this.modeAuto(n);
  }
  
  this.modeAuto = function(n){
    let t = app.attr(n, 'data-tools', this.opt.tools).split('');
    let wys = app.attr(n, 'data-wys');
    if(wys===null) wys = (t.indexOf('/')==-1) || (n.value.match(/(>|&\w+;)/) && !n.value.match(/<script/i));
    this.mode(n.theWys, wys);
  }

  this.cmd = function (e, bb, nn) { // (e) or (z, b)
    let n = e.recv;
    let b = bb || this.btn[n.getAttribute('data-cmd')];
    let z = bb ? e : app.next(n.closest('nav'), '.edit-wysiwyg');
    app.dbg(['cmd', z, b, n, e]);
    if(e && !bb){
      e.preventDefault();
      e.stopPropagation();
    }
    //let b = this.btn[n.hash.substr(4)];
    if (b[0] == 'src') this.mode(z, !app.vis(z));
    else if (b[0] == 'tools'){
      let mm = app.q('div', n.parentNode);
      if(mm) toggle.toggle(mm);
    }
    else {
      let arg = b[1];
      if (arg.match(/~/)) {
        let q = prompt(b[3], b[4] || '');
        arg = q === null ? q : arg.replace(/~/, q);
        if (arg && arg.match(/@/)) arg = 'mailto:' + arg;
      }
      if (arg) arg = arg.replace('^', document.getSelection());
      z.focus();
      if (arg !== null) document.execCommand(b[0], false, arg);
      if (b[2] == '*') {
        this.up(0, z);
        this.up(1, z);
      }
    }
  }

  this.up = function (w, z) {
    if (w) z.innerHTML = z.theArea.value;
    else z.theArea.value = z.innerHTML.
      replace(/(\shref=")!/ig, ' target="_blank"$1').
      replace(/(\ssrc="[^"]+#[a-z]*)(\d+%?)"/ig, ' width="$2"$1"');
      //.replace(/(\ssrc="[^"]+)#([lrc])"/ig,' class="$2"$1"');
    if(!w) app.dispatch(z.theArea, ['input', 'change']);
  }

  this.mode = function (z, w) {
    toggle.toggle(z, w);
    toggle.toggle(z.theArea, !w);
    if(!w){
      if(z.style.height) z.theArea.style.height = z.style.height;
      else this.adjust(z.theArea);
    }
    this.up(w, z);
    app.e(app.qq('a', z.theNav), n => (n.hash=='#cmd-src') ? null : toggle.toggle(n, w));
    z.theArea.theManual = 0;
    z.theArea.style.width = '100%';
  }

  this.setStyle = function(n){
    //n.style.resize = 'vertical'; //both
    n.style.overflow = 'auto';
    n.style.minHeight = '3em';
    n.style.maxHeight = '80vh';//n.type ? '80vh' : this.opt.height + 'em';
    this.storeSize(n);
  }
  
  this.storeSize = function(n){
    n.theH = n.clientHeight;
    n.theW = n.clientWidth;
  }
  
  this.resized = function(n){
    if(n.theH !== n.clientHeight || n.theW !== n.clientWidth) n.theManual = 1;
  }

  this.adjustAll = function(){
    app.e(this.opt.qAdjust, n => this.adjust(n));
  }

  this.adjust = function(n){
    if(n.theManual) return;
    //1. jumps
    //n.style.height = 'auto';
    //n.style.height = (24 + n.scrollHeight) + 'px';
    //2. not exact
    //n.style.height = (1.5 * (2 + Math.max(n.value.length/50, (n.value.match(/\n/g) || []).length))) + 'em';
    //3. better
    let a = n.value.split(/\n/)
      .map(function(v){ return Math.ceil(10 * (1 + v.length) / (n.clientWidth || 500)); })
      .reduce(function(v, r){ return r + v; });
    n.style.height = Math.min(1.5 * (2 + a), parseFloat(this.opt.height)) + 'em';
    this.storeSize(n);
  }

  // https://stackoverflow.com/questions/6333814/how-does-the-paste-image-from-clipboard-functionality-work-in-gmail-and-google-c
  this.onPaste = function (e) {
    let n = e.target.closest('.edit-wysiwyg');
    if(!n) return;
    //app.a(e.clipboardData.items).forEach(i => console.log(i)); // kind: 'file', type: 'image/...'
    let img = app.a(e.clipboardData.items).filter(i => i.type.indexOf('image') === 0).shift();
    if(img){
      e.preventDefault();
      let reader = new FileReader();
      reader.onload = e => this.cmd(n, ['insertimage', e.target.result]);
      reader.readAsDataURL(img.getAsFile());//get blob as data url
      // to upload, use readAsBinaryString, or put it into an XHR using FormData
    }
  }

})();