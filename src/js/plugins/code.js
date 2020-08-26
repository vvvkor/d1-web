/*! code - source code sample */

import Plugin from './plugin.js';

export default class extends Plugin {

  constructor () {
    super('code')

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
  }

  init () {
    this.app.e(this.opt.qCode, n => this.showCode(n));
    this.app.e('code[class*="language-"]', n => this.hiliteNode(n));
    this.app.listen('update', e => this.updateCode(e));
  }

  updateCode (e) {
    let n = e.n ? e.n : this.app.q(e.q);
    if(n){
      let p = n.closest(this.opt.qCode);
      if(p) this.showCode(p);
    }
  }
  
  showCode (src) {
    let lang = this.app.attr(src, this.opt.aLang, this.opt.defLang);
    let t = this.spaces(src.innerHTML);
    if(!src.vCode){
      let cont = this.app.ins('div', '', {classList: 'bord'}, src, 1);
      cont.appendChild(src);
      src.classList.add('pad');
      let id = 'code-' + this.app.seq();
      this.app.ins('div', this.app.ins('a', (this.langs[lang] ? this.langs[lang].nm : lang) || lang, {className: 'pad', href: '#'+id}), {className: '-r bg small'}, cont);
      let pre = this.app.ins('pre', '', {className: this.app.opt.cToggle + ' ' + this.app.opt.cOff + ' fit pad', id: id}, cont);
      let cod = this.app.ins('code', '', {className: 'language-' + lang}, pre);
      src.vCode = cod;
    }
    //src.vCode.textContent = t;
    src.vCode.innerHTML = this.hiliteText(t, lang);
  }
  
  spaces (s) {
    return s
      .replace(/^\s*\r?\n|\s+$/g, '')
      .replace(/\t/g, '  ');
      //.replace(/=""/g, '');
  }
  
  hiliteNode (n) {
    n.innerHTML = this.hiliteText(
      this.spaces(n.textContent), 
      this.app.a(n.classList).filter(c => c.match(/language-/))[0].substr(9)
      );
  }
  
  hiliteText (t, lang) {
    let l = this.langs[lang];
    let d = this.app.ins('div');
    d.textContent = t;
    t = d.innerHTML;
    if(l && l.re) l.re.forEach(re => t = t.replace(re[0], m => this.token(re[1], m)))
    return t;
  }
  
  token (c, m) {
    return "<Span Class = 'text-" + c + "'>" + m + "</Span>";
  }

}