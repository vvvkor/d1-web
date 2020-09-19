/*! form - utilities for form inputs */

import Plugin from './plugin.js';

export default class extends Plugin {

  constructor() {
    super('form')
    this.opt = {};
  }

  init() {
    this.app.e('input[type="color"]', n => this.prepareColor(n));
    this.app.h('click', 'a[href^="#"][data-value]', e => {
      e.preventDefault();
      this.setValue(e.recv);
    });
    this.app.h('click', 'input[data-group]', e => this.checkBoxes(e.target));
  }
  
  checkBoxes(n) {
    this.app.e(this.app.qq('input[type="checkbox"][class~="' + (n.dataset.group || '') + '"]', n.form),
      m => m.checked = n.checked);
  }
  
  setValue(n) {
    let d = this.app.q(n.hash);
    if (d) {
      d.value = n.dataset.value || '';
      this.app.pf('toggle', 'unpop', d, true);
      // this.app.pf('toggle', 'modalStyle'); //generally not needed
    }
  }

  prepareColor(n) {
    let m = this.app.ins('input', '', {type: 'text', value: n.value, size: 7, className: 'color'}, n, -1);
    this.app.ins('', ' ', {}, m, 1);
    this.app.b([n, m], 'input', e => (e.target == n ? m : n).value = e.target.value );
  }

}