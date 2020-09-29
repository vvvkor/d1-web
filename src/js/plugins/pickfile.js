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
    d1.h('click', 'a.unpick', e => { e.preventDefault(); this.setPicker(e.recv, ''); });
    d1.h('change', this.opt.qPick, e => this.setPicker(e.recv, true));
    this.prepareDrop(this.app.q(this.opt.qDrop));
  }
  
  prepare(n) {
    if (!n.id) n.id = 'pick-' + this.app.seq();
    const nn = n.closest('label') || n;
    
    const cont = this.app.ins('label', '', {htmlFor: n.id, className: 'picker gallery'}, nn, -1);
    const tools = this.app.ins('div', '', {className: 'tools pad back'}, cont);
    this.app.ins('label', this.app.i('folder', '&uarr;'), {htmlFor: n.id}, tools);
    this.app.ins('a', this.app.i('image', '#'), {className: 'pic subtool'}, tools);
    this.app.ins('a', this.app.i('delete', '&times;'), {className: 'unpick subtool', href: '#unpick'}, tools);
    const hide = this.app.ins('div', '', {className: '-hide'}, cont);
    const s = hide.style;
    s.position = 'fixed';
    s.top = '-10em';
    hide.appendChild(nn);
    this.app.ins('input', '', {type: 'checkbox', value: 1, name: 'unpick_' + n.name, className: 'unpick'}, hide);
    this.setPicker(n, false);
  }

  setPicker(n, url) {
    var d = n.closest('.picker');
    if(d){
      var keep = (url === false);
      if (keep) url = this.app.q('[data-picked]', d)?.dataset.picked || '';
      if (url === true) {
        const f = this.app.q(this.opt.qPick, d);
        //1.
        //const fr = new FileReader();
        //const ref = this;
        //fr.onload = function(e){ ref.setPicker(n, this.result); }
        //if(f.files[0]) fr.readAsDataURL(f.files[0]);
        //2.
        if(f.files[0]){
          const blob = URL.createObjectURL(f.files[0]);
          this.setPicker(n, blob);
          // free memory - if gallery not used
          /*
          const img = document.createElement('img');
          img.src = blob;
          img.onload = e => URL.revokeObjectURL(img.src);
          */
        }
        else this.setPicker(n, false);
        return;
      }
      const bg = url ? 'url("' + url + '")' : '';
      d1.e(this.app.qq('input.unpick', d), n => n.checked = !url && !keep);
      d.style.backgroundImage = bg;
      d1.e(this.app.qq('a.pic', d), n => n.href = url);
      d.classList[url ? 'remove' : 'add']('unpicked');
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