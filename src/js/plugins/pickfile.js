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
    d1.h('click', 'a.pickdef', e => this.pick(e.recv, false, e));
    d1.h('click', 'a.unpick', e => this.pick(e.recv, '', e));
    d1.h('change', this.opt.qPick, e => this.pick(e.recv, true));
    this.prepareDrop(this.app.q(this.opt.qDrop));
  }
  
  prepare(n) {
    if (!n.id) n.id = 'pick-' + this.app.seq();
    const nn = n.closest('label') || n;
    
    const cont = this.app.ins('label', '', {htmlFor: n.id, className: 'picker gallery'}, nn, -1);
    const tools = this.app.ins('div', '', {className: 'tools pad back'}, cont);
    this.app.ins('label', this.app.i('folder', '&uarr;'), {htmlFor: n.id}, tools);
    this.app.ins('a', this.app.i('image', '#'), {className: 'pic subtool'}, tools);
    if (n.multiple) this.app.ins('a', '', {className: 'picknum subtool'}, tools);
    if (n.dataset.picked) this.app.ins('a', this.app.i('back', '&times;'), {className: 'pickdef', href: '#pickdef'}, tools);
    this.app.ins('a', this.app.i('delete', '&times;'), {className: 'unpick subtool', href: '#unpick'}, tools);
    const hide = this.app.ins('div', '', {className: 'tools-hide'}, cont);
    hide.appendChild(nn);
    this.app.ins('input', '', {type: 'checkbox', value: 1, name: 'unpick_' + n.name, className: 'unpick'}, hide);
    this.pick(n, false);
  }

  pick(n, url, e) {
    if (e) e.preventDefault();
    const d = n.closest('.picker');
    if(d){
      const f = this.app.q(this.opt.qPick, d);
      const def = this.app.q('[data-picked]', d)?.dataset.picked || '';
      let keep = (url === false);
      let img = keep;
      let num = '';

      if (url === '') f.value = '';
      else if (keep) url = def;
      else if (url === true) {
        //1.
        //const fr = new FileReader();
        //const ref = this;
        //fr.onload = function(e){ ref.pick(n, this.result); }
        //if(f.files[0]) fr.readAsDataURL(f.files[0]);
        //return;
        //2.
        if(f.files[0]){
          url = URL.createObjectURL(f.files[0]);
          if (f.files[0].type.match(/^image/)) img = true;
          num = f.files.length;
          /*
          // free memory - if gallery not used
          const img = document.createElement('img');
          img.src = url;
          img.onload = e => URL.revokeObjectURL(img.src);
          */
        }
        else {
          url = def;
          keep = img = true;
        }
      }
      const bg = url ? (img ? 'url("' + url + '")' : '') : '';
      d.style.backgroundImage = bg;
      d1.e(this.app.qq('input.unpick', d), n => n.checked = !url && !keep);
      d1.e(this.app.qq('a.pic', d), n => img ? n.href = url : null);
      d1.e(this.app.qq('a.picknum', d), n => n.textContent = num);
      d.classList[url ? 'remove' : 'add']('unpicked');
      d.classList[!keep && url && !img ? 'add' : 'remove']('pickdoc');
    }
    if (url) {
      // (re)init gallery
      if (d.vGal) d.vGal.parentNode.removeChild(d.vGal);
      this.app.e(this.app.qq('a.pic', d), n => delete n.vDone);
      d.vGal = this.app.plugins.gallery?.prepare(d);
    }
  }
  
  prepareDrop(n) {
    if(n){
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