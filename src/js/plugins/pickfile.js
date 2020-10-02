/*! example - file input decorator */

import Plugin from './plugin.js';

export default class extends Plugin {

  constructor() {
    super('pickfile')
    this.opt = {
      qPick: '.pick[name]',
      qDrop: 'input.drop'
    };
    this.dragging = 0;
  }

  init() {
    //pick
    this.app.e(this.opt.qPick, n => this.prepare(n));
    this.app.h('click', '.picker [href="#pickdef"]', e => this.pick(e.recv, false, e));
    this.app.h('click', '.picker [href="#unpick"]', e => this.pick(e.recv, '', e));
    this.app.h('change', this.opt.qPick, e => this.pick(e.recv, true));
    //drop
    if (this.app.q(this.opt.qDrop + ',' + this.opt.qPick)) {
      const b = document.body;
      this.app.b([b], ['dragenter', 'dragleave', 'drop', 'mouseover'], e => this.detectDrag(e));
      // fix ff - avoid dropzones for drags inside document
      //this.app.b([b], 'dragstart', e => e.preventDefault());
      this.app.b([b], 'dragstart', e => this.dragging = -100);
      this.app.b([b], 'dragend', e => this.dragging = 0);
      this.app.b([b], 'drop', e => this.drop(e));
    }
//listen to all events
/*
Object.keys(window).forEach(key => {
    if (/^on/.test(key)) window.addEventListener(key.slice(2), e => console.log('EVENT', e.type));
});
*/
  }
  
  prepare(n) {
    const a = this.app;
    if (!n.id) n.id = 'pick-' + this.app.seq();
    const nn = n.closest('label') || n;
    
    const cont = a.ins('div', '', 'picker gallery', nn, -1);
      const nav = a.ins('nav', '', 'pad bg row', cont);
        a.ins('label', a.i('folder', '&uarr;'), {htmlFor: n.id, className: 'col-0' + (n.multiple ? ' text-i' : '')}, nav);
        a.ins('a', a.i('image', '#'), 'pic col-0', nav);
        /*if (n.multiple)*/ a.ins('a', '', 'picknum', nav);
        if (n.dataset.picked) a.ins('a', a.i('back', '&larr;'), {className: 'col-0', href: '#pickdef'}, nav);
        a.ins('a', a.i('delete', '&times;'), {className: 'col-0', href: '#unpick'}, nav);
      const preview = a.ins('label', '', {htmlFor: n.id}, cont);
        a.ins('span', a.i('text', '[]'), 'mar pad', preview);
      const hide = a.ins('div', '', {}, cont);
        hide.appendChild(nn);
        a.ins('input', '', {type: 'checkbox', value: 1, name: 'remove_' + n.name}, hide);
    this.pick(n, false);
  }

  pick(n, url, e) {
    if (e) e.preventDefault();
    const d = n.closest('.picker');
    if(d){
      const f = this.app.q(this.opt.qPick, d);
      const ch = this.app.a(d.children);
      //const nav = ch.find(m => m.matches('nav'));
      const preview = ch.find(m => m.matches('label'));
      //const inputs = ch.find(m => m.matches('div'));
      
      let keep = false;
      let img = '';
      let num = '';
      let fn = '';

      if (url === '' || url === false) f.value = '';
      
      if (url === true && f.files[0]) { // files selected
        //1.
        //const fr = new FileReader();
        //const ref = this;
        //fr.onload = function(e){ ref.pick(n, this.result); }
        //if(f.files[0]) fr.readAsDataURL(f.files[0]);
        //return;
        //2.
        url = URL.createObjectURL(f.files[0]);
        if (f.files[0].type.match(/^image/)) img = url;
        num = f.files.length;
        fn = f.files[0].name;
        /*
        // free memory - if gallery not used
        const im = document.createElement('img');
        im.src = url;
        im.onload = e => URL.revokeObjectURL(im.src);
        */
      }
      else if (url === true || url === false) { // selection cancelled or reset to default
        url = fn = f.dataset.picked || '';
        keep = true;
        img = url.match(/\.(PNG|GIF|SVG|WEBP|BMP|ICO|JPE?G)$/i) ? url : '';
      }
      
      d.classList[url ? 'remove' : 'add']('unpicked');
      preview.style.backgroundImage = img ? 'url("' + img + '")' : '';
      preview.title = fn;
      //preview.dataset.tip = fn;
      this.app.e(this.app.qq('[name^="remove_"]', d), n => n.checked = !url && !keep);
      this.app.e(this.app.qq('a.pic', d), n => { n.href = img; n.title = fn; n.classList[img ? 'remove' : 'add'](this.app.opt.cHide); });
      this.app.e(this.app.qq('.picknum', d), n => n.textContent = num);
      //this.app.e(this.app.qq('[href="#unpick"]', d), n => n.classList[url ? 'remove' : 'add']('inact'));
      preview.firstChild.classList[url && !img ? 'remove' : 'add'](this.app.opt.cHide);
    }
    if (url) this.app.fire('exhibit', {n: d, opt: {num: false}}); // re-init gallery
  }
  
  detectDrag(e) {
    /*
    events sequence:
    - dragenter
    - [dragenter dragleave] *
    - [dragleave | drop | NOTHING]
      - NOTHING if dropped not into file input causing download; use mouseover/focus/blur
    */
    if (e.type === 'drop' || e.type === 'mouseover'){
      if (this.dragging > 0) this.dragging = 0;
    }
    else{
      if (this.dragging >= 0) e.preventDefault();
      this.dragging += (e.type === 'dragenter' ? 1 : -1);
    }
    document.body.classList[this.dragging > 0 ? 'add' : 'remove']('drag');
    if (e.type !== 'mouseover') {
      if (e.target.matches && e.target.matches('[type="file"]')) { // skip text nodes
        if (e.type === 'drop') e.target.vDragging = 0;
        else e.target.vDragging = (e.target.vDragging || 0) + (e.type === 'dragenter' ? 1 : -1); //fix ff
        e.target.classList[e.target.vDragging > 0 && e.type !== 'drop' ? 'add' : 'remove']('act');
        //e.target.classList[e.target.vDragging > 0 && e.type === 'dragenter' ? 'add' : 'remove']('act');
        //console.log('DRAG', this.dragging, e.target.vDragging, e.type, e.target.id);
      }
    }
  }

  drop(e) {
    //if (e.target.tagName !== 'INPUT') e.preventDefault();
    if (e.target.form && e.target.hasAttribute('data-submit') || e.ctrlKey || e.shiftKey) {
      setTimeout(() => e.target.form.submit(), 200);
    }
  }

}