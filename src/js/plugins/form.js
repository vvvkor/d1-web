/*! form - utilities for form inputs */

import Plugin from './plugin.js';

export default class extends Plugin {

  constructor() {
    super('form')
    this.opt = {};
  }

  init() {
    this.app.h('click', 'a[href^="#"][data-value]', e => {
      e.preventDefault();
      this.setValue(e.recv);
    });
    this.app.h('click', 'input[data-group]', e => this.checkBoxes(e.target));
  }
  
  arrange({n}) {
    this.app.ee(n, 'input[type="color"]', n => this.prepareColor(n));
  }
  
  checkBoxes(n) {
    //this.app.ee(n.form, 'input[type="checkbox"][class~="' + (n.dataset.group || '') + '"]', m => m.checked = n.checked);
    this.app.ee(n.form, 'input[type="checkbox"]', m => {
      if (m.classList.contains(n.dataset.group)) {
        m.checked = n.checked;
        this.app.dispatch(m, ['input', 'change']);
      }
    });
  }
  
  setValue(n) {
    const d = this.app.q(n.hash);
    if (d) {
      d.value = n.dataset.value || '';
      this.app.dispatch(d, ['input', 'change']);
      this.app.pf('toggle', 'unpop', d, true);
      // this.app.pf('toggle', 'modalStyle'); //generally not needed
    }
  }

  prepareColor(n) {
    if (n.dataset.ready) return;
    n.dataset.ready = 1;
    const m = this.app.ins('input', '', {type: 'text', value: n.value, size: 7, className: 'color'}, n, -1);
    this.app.ins('', ' ', {}, m, 1);
    this.app.b([n, m], 'input', e => (e.target == n ? m : n).value = e.target.value );
  }

}