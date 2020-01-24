/*! code - source code sample */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'code';

  this.langs = {
    html: {
      nm: 'HTML',
      re: [
        [/[a-z0-9_\-]+(?==")/g, 'w'], // attr name
        [/".*?"/g, 'e'], // attr value
        [/&lt;[^!A-Z][\s\S]*?&gt;/g, 'i'], // tag |&amp;[\w#]+;
        [/&lt;\![\s\S]*?&gt;/g, 'n'] // comment
      ]
    },
    js: {
      nm: 'Javascript',
      re: [
        [/".*?"|'.*?'/g, 'w'], // string // |'.*?'
        [/(\b|\b\d+\.|\.)\d+\b/g, 'e'], // number
        [/[{}()\[\]]/g, 'y'], // bracket
        [/\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|function|if|import|in|instanceof|new|return|super|switch|this|throw|try|typeof|var|void|while|with|yield|let|await|null|undefined|true|false|arguments|get|set|require)\b/g, 'i'], // keyword
        [/\/\*[\s\S]*?\*\/|(\/\/|#\!)[^\n]*/g, 'n'] // comment
      ]
    },
    css: {
      nm: 'CSS',
      re: [
        [/".*?"|'.*?'/g, 'w'], // string // |'.*?'
        [/#[\w\-]+/g, 'e'], // id, color
        [/[{}()]/g, 'y'], // brackets
        [/\.[A-za-z][\w\-]*/g, 'y'], // class
        [/((@\w+|\!important)|\b(none|inherit|initial|unset|attr|url|calc|var|rgba?|hsla?))\b/g, 'i'], // keyword
        [/\/\*[\s\S]*?\*\//g, 'n'] // comment
      ]
    }
  };

  this.opt = {
    aLang: 'data-lang',
    defLang: 'html',
    qCode: '.code'
  };

  this.init = function () {
    app.e(this.opt.qCode, n => this.showCode(n));
    app.e('code[class*="language-"]', n => this.hiliteNode(n));
    app.listen('updated', e => this.updateCode(e));
  }

  this.updateCode = function(e){
    let p = app.closest(e.n ? e.n : app.q(e.q), this.opt.qCode);
    if(p) this.showCode(p);
  }
  
  this.showCode = function(src){
    let lang = app.attr(src, this.opt.aLang, this.opt.defLang);
    let t = this.spaces(src.innerHTML);
    if(!src.vCode){
      let cont = app.ins('div', '', {classList: 'bord'}, src, 1);
      cont.appendChild(src);
      src.classList.add('pad');
      let id = 'code-' + app.seq();
      app.ins('div', app.ins('a', (this.langs[lang] ? this.langs[lang].nm : lang) || lang, {className: 'pad', href: '#'+id}), {className: '-r bg small'}, cont);
      let pre = app.ins('pre', '', {className: app.opt.cToggle + ' ' + app.opt.cOff + ' fit pad', id: id}, cont);
      let cod = app.ins('code', '', {className: 'language-' + lang}, pre);
      src.vCode = cod;
    }
    //src.vCode.textContent = t;
    src.vCode.innerHTML = this.hiliteText(t, lang);
  }
  
  this.spaces = function(s){
    return s
      .replace(/^\s*\r?\n|\s+$/g, '')
      .replace(/\t/g, '  ');
      //.replace(/=""/g, '');
  }
  
  this.hiliteNode = function(n){
    n.innerHTML = this.hiliteText(
      this.spaces(n.textContent), 
      app.a(n.classList).filter(c => c.match(/language-/))[0].substr(9)
      );
  }
  
  this.hiliteText = function(t, lang){
    let l = this.langs[lang];
    let d = app.ins('div');
    d.textContent = t;
    t = d.innerHTML;
    if(l && l.re) l.re.forEach(re => t = t.replace(re[0], m => this.token(re[1], m)))
    return t;
  }
  
  this.token = function(c, m){
    return "<Span Class = 'text-" + c + "'>" + m + "</Span>";
  }

})();