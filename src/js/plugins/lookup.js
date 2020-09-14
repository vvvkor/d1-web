/*! lookup - autocomplete lookups with data from XHTTP request */

// import toggle from './toggle.js'
// import fetch from './fetch.js'

import Plugin from './plugin.js'
import Url from '../util/url.js'
import Func from '../util/func.js';

export default class extends Plugin {

  constructor () {
    super('lookup')

    this.opt = {
      dLabel: 'label', // data-label
      dLookup: 'lookup',
      dCap: 'cap',
      dList: 'list',
      dUrl: 'url',
      dGoto: 'goto',
      cacheLimit: 0,
      pList: 'lookup-list-',
      max: 10,
      wait: 300,
      inPop: 0
    };
    
    this.win = null;
  }
  
  init () {
    const app = this.app
    this.win = app.ins('div', '', {id: this.opt.pList + app.seq(), className: app.opt.cToggle + ' ' + app.opt.cOff});
    this.closeList();
    document.body.appendChild(this.win);

    app.e('input[data-' + this.opt.dLookup + ']', n => this.prepare(n));
    app.e('[data-chain]', n => this.updateChain(n));
    const f = Func.debounce(this.find.bind(this), this.opt.wait);
    app.h('input', '.lookup-input', f); // e => f(e)
    app.h('keydown', '.lookup-input', e => this.key(e));
    app.h('click', '.lookup-item', e => this.choose(e));
    app.h('click', '.lookup-goto', e => this.go(e));
    app.h('change', '[data-chain]', e => this.updateChain(e.target));
  }

  prepare (n) {
    const app = this.app
    if(this.cap(n)) return;
    n.vLabel = (this.opt.dLabel in n.dataset)
      ? n.dataset[this.opt.dLabel]
      : (n.value || '');
    let pop = app.ins('div', '', {className: 'pop l lookup-pop'}, n, 1);
    if(!this.opt.inPop) pop.style.verticalAlign = 'bottom';
    n.classList.add('bg-n', 'lookup-id');
    n.classList.add(app.opt.cHide);
    //n.type = 'hidden';
    let m = app.ins('input', '', {type: 'text', value: n.vLabel, className:'lookup-input subinput'}, pop, this.opt.inPop ? 0 : 1);
    m.name = 'lookup-' + n.name;
    //m.required = n.required;
    //n.required = false;
    if(n.id) {
      m.id = 'lookup-' + n.id;
      if(n.title) m.title = n.title;
      app.e('[for="' + n.id + '"]', lbl => lbl.htmlFor = m.id);
    }
    if(n.placeholder) m.placeholder = n.placeholder;
    m.autocomplete = 'off';
    let i = null;
    if(this.opt.dUrl in n.dataset){
      let ic = app.ins('span', '', {className:'input-tools nobr'}, this.opt.inPop ? pop : m, 1);//icons container
      i = app.ins('a', app.i('forward', '&rarr;'), {href: '#goto', className: 'let lookup-goto'}, ic);
      i.style.cursor = 'pointer';
      app.ins('', ' ', {}, ic, -1);
    }
    this.initCaption(n)
  }
  
  initCaption (n){
    let uc = n.dataset[this.opt.dCap] || '';
    if(uc && n.value && !(this.opt.dLabel in n.dataset)){
      let u = encodeURI(decodeURI(Url.build(uc, {time: (new Date()).getTime()}))
        .replace(/\{q\}/, n.value));
      this.app.fetch(u, req => {
        let d = this.app.parse(req.responseText);
        if(d){
          const h = u.split('#');
          if (!h[1] && d.data) d = d.data
          this.fix(n, n.value, this.app.path(d, h[1] || '', n.value));
        }
      });
    }
  }
  
  ident (n, mode){
    if(mode != 't' && (mode == 'i' || this.opt.inPop)) n = n.closest('.lookup-pop');
    return this.app.next(n, '.lookup-id', true);
  }

  cap (n){
    return this.opt.inPop
      ? this.app.q('.lookup-input', this.pop(n))
      : this.app.next(n, '.lookup-input');
  }

  pop (n){
    return this.app.next(n, '.lookup-pop');
  }

  find (e){
    let c = e.target;
    let n = this.ident(c);
    if(!n) return;
    let v = c.value;
    if(v==='') this.fix(n, '', ''); //empty
    else if(n.vCache && n.vCache[v]) this.openList(n, n.vCache[v]); //cached
    else{
      let u = encodeURI(decodeURI(Url.build((n.dataset[this.opt.dLookup] || ''), {
          //value: v,
          time: (new Date()).getTime()
      })).replace(/\{q\}/, v));
      n.vCur = null;
      this.app.fetch(u, this.list.bind(this, u, v, n));
    }
  }
  
  list (u, v, n, req){
    let d = this.app.parse(req.responseText);
    if(d){
      const h = u.split('#');
      if (!h[1] && d.data) d = d.data
      d = this.norm(this.app.path(d, h[1] || '', []), h[2], h[3], h[4]);
      if(v===this.cap(n).value) this.openList(n, d);
      this.store(n, v, d);
    }
  }

  openList (n, d, e){
    if(e) e.stopPropagation();
    this.closeList();
    let pop = this.pop(n);
    pop.appendChild(this.win);
    //this.win.vRel = n.vCap;
    this.app.toggle(this.win, true);
    this.build(n, d);
    //this.app.pf('toggle', 'setShown', null);
  }
  
  closeList (){
    this.app.toggle(this.win, false);
  }
  
  build (n, d){
    const app = this.app
    app.clr(this.win);
    let ul = app.ins('ul', '', {className: 'nav let hover'}, this.win);
    let w, j = 0;
    let go = n.dataset[this.opt.dGoto] || '';
    for(let i in d){
      w = app.ins('li', '', {}, ul);
      let a = app.ins('a', '', {href: go ? go.replace(/\{id\}/, d[i].id) : '#' + d[i].id, className: '-pad -hover' + (go ? '' : ' lookup-item')}, w);
      app.ins('span', d[i].nm, {}, a);
      if(d[i].info){
        app.ins('br', '', {}, a);
        app.ins('small', d[i].info, {className: 'text-n'}, a);
      }
      j++;
      if(j >= this.opt.max) break;
    }
    if(ul.firstChild) this.hilite(n, ul.firstChild.firstChild);
  }
  
  hilite (n, a){
    if(n.vCur) n.vCur.classList.remove(this.app.opt.cAct);
    a.classList.add(this.app.opt.cAct);
    n.vCur = a;
  }
  
  hiliteNext (n, prev){
    if(n.vCur) {
      let a = n.vCur.parentNode[prev ? 'previousSibling' : 'nextSibling'];
      if(!a) a = n.vCur.parentNode.parentNode[prev ? 'lastChild' : 'firstChild'];
      a = a.firstChild;
      this.hilite(n, a);
    }
  }
  
  choose (e){
    if(e) e.preventDefault();
    let a = e.recv;
    let n = this.ident(a, 'i');
    n.vCur = a;
    this.fix(n, a.hash.substr(1), a.firstChild.textContent);
  }
  
  fix (n, v, c){
    n.vCur = null;
    if(n.vWait) clearTimeout(n.vWait);
    n.value = v;
    n.vLabel = this.cap(n).value = c;
    this.app.dispatch(n, ['input', 'change']);
    this.closeList();
  }
  
  key (e){
    let n = e.target ? this.ident(e.target) : null;
    if(n){
      if(e.keyCode == 27) this.fix(n, n.value, n.vLabel);
      else if(e.keyCode == 40 && !this.app.vis(this.win)) this.find(e);
      else if(e.keyCode == 38 || e.keyCode == 40) this.hiliteNext(n, e.keyCode == 38);
      else if(e.keyCode == 13 && n.vCur){
        if(this.app.vis(this.win)) e.preventDefault();
        n.vCur.click();
      }
    }
  }
  
  go (e){
    let n = e.recv ? this.ident(e.recv.parentNode, 't') : null;
    if(n){
      e.preventDefault();
      let u = n.dataset[this.opt.dUrl] || '';
      if(n.value.length>0 && u) location.href = encodeURI(decodeURI(u).replace(/\{id\}/, n.value));
    }
  }

  // update chain
  
  updateChain (n){
    let m = this.app.q((n.dataset.chain || ''));
    if(m){
      if(!n.value) this.setOptions(m,[]);
      else{
        let u = (m.dataset[this.opt.dList] || '').replace(/\{q\}/,n.value);
        if(m.vCache && m.vCache[u]) this.setOptions(m,m.vCache[u]);
        else this.app.fetch(u, this.onChainData.bind(this, u, m));
      }
    }
  }
  
  onChainData (u, n, req){
    let d = this.app.parse(req.responseText);
    if(d){
      const h = u.split('#');
      if (!h[1] && d.data) d = d.data
      d = this.norm(this.app.path(d, h[1] || '', []), h[2], h[3]);
      this.setOptions(n, d);
      this.store(n, u, d);
    }
    else this.setOptions(n, []);
  }

  setOptions (n, a){
    if(n.list){
      if(n.list){
        this.app.clr(n.list);
        n.value = '';
        if(a) a.forEach(v => this.app.ins('option', '', {value: v.nm}, n.list));
      }
    }
    else{
      this.app.clr(n);
      let z = n.dataset.placeholder || '';
      if(!a || a.length==0 || z) this.app.ins('option', z || '-', {value: ''}, n);
      if(a) a.forEach(v => this.app.ins('option', v.nm, {value: v.id}, n));
    }
  }
  
  store (n, u, d){
    let c = 1 * (n.dataset.cache || this.opt.cacheLimit);
    if(c){
      if(!n.vCache || Object.keys(n.vCache).length>=c) n.vCache = {};
      if(d) n.vCache[u] = d;
    }
  }
  
  norm (d, fi, fn, fa) {
    if (this.app.typeOf(d) !== 'array')  return [];
    return d.map(v => ({
      id: this.app.path(v, fi || 'id'),
      nm: fn ? this.app.path(v, fn) : (v['name'] ?? v['nm'] ?? v['title']),
      info: this.app.path(v, fa || 'info')
    }));
  }

}