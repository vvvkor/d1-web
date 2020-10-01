/*! example - file input decorator */

import Plugin from './plugin.js';

export default class extends Plugin {

  constructor() {
    super('pickfile')
    this.opt = {
      qPick: '.pick[name]',
      qDrop: 'input.drop'
    };
  }

  init() {
    this.app.e(this.opt.qPick, n => this.prepare(n));
    this.app.h('click', '.picker [href="#pickdef"]', e => this.pick(e.recv, false, e));
    this.app.h('click', '.picker [href="#unpick"]', e => this.pick(e.recv, '', e));
    this.app.h('change', this.opt.qPick, e => this.pick(e.recv, true));
    this.prepareDrop(this.app.q(this.opt.qDrop));
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
  
  prepareDrop(n) {
    if (n) {
      const b = document.body;
      //this.app.b([b], 'dragover', (e) => e.preventDefault());
      this.app.b([b], 'dragenter', e => b.classList.add('drag'));
      this.app.b([b], 'dragend', e => b.classList.remove('drag'));
      this.app.b([n], 'dragleave', e => b.classList.remove('drag'));
      
      this.app.b([n], 'drop', (e) => {
        b.classList.remove('drag');
        if (e.target.hasAttribute('data-submit') || e.ctrlKey || e.shiftKey) {
          setTimeout(() => n.form.submit(), 200);
        }
      });
    } 
  }

}