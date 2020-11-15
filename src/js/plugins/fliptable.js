/*! fliptable - responsive table */

import Plugin from './plugin.js';

export default class extends Plugin {

  constructor() {
    super('fliptable')

    this.opt = {
      qFlipTable: 'table.flip', // , table.can-flip
    };
  }

  init() {
    this.app.listen('update', e => e.n.matches(this.opt.qFlipTable) ? this.prepareFlipTable(e.n) : null);
  }
  
  arrange({n}) {
    //this.app.ee(n, this.opt.qFlipTable, n => n.closest('form') ? null : this.prepareFlipTable(n)); 
    this.app.ee(n, this.opt.qFlipTable, m => this.prepareFlipTable(m)); 
  }

  prepareFlipTable(t) {
    if (t.dataset.readyFlip || !this.app.q('th', t)) return;
    t.dataset.readyFlip = 1;
    
    let ths = this.app.qq('thead th', t);
    let tds = this.app.qq('tbody tr>*, tfoot tr>*', t);
    // let order = (t.dataset.order || '0 1 2 3').split(/\D+/);
    // t.parentNode.classList.remove('roll');
    for (let i = 0; i < tds.length; i++) {
      let td = tds[i];
      let th = ths[td.cellIndex];
      //let ord = order.indexOf('' + td.cellIndex);
      //if (ord == -1) ord = 99;
      //td.style.order = ord;
      //if (td.textContent.replace(/\s+$/, '').length>0) {
        let c = this.app.ins('div', '', 'row');
        if (th) this.app.ins('div', th.textContent, 'hide-desktop cell-head', c)
        let v = this.app.ins('div', '', {}, c);
        while (td.firstChild) v.appendChild(td.firstChild);
        td.textContent = '';
        td.appendChild(c);
        if (!('val' in td.dataset)) td.dataset.val = v.textContent.replace(/^\s+|\s+$/g, '');
      //}
    }
    this.app.ee(t, 'thead', n => n.classList.add('hide-mobile'));
  }

}