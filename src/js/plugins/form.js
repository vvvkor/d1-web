/*! form - utilities for form inputs */

import Plugin from './plugin.js';
import Url from '../util/url.js';
import Dt from '../util/dt.js';

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
    if (!n) {
      this.app.ee(n, 'form[data-get]', m => this.initValues(m, m.dataset.get));
      this.app.ee(n, '[data-get][name]', m => this.initValue(m, m.dataset.get));
    }
    this.app.ee(n, 'input[type="color"]', m => this.prepareColor(m));
  }
  
  initValues(n, g) {
    this.app.ee(n, '[name]', m => this.initValue(m, g ? g + '[' + m.name + ']' : m.name));
  }
  
  initValue(n, g) {
    if (g) {
      let v = Url.get(true, g);
      if (v !== undefined) {
        if (n.matches('.calendar')){
          const t = Dt.parse(v);
          if (t) v = (new Date(t - t.getTimezoneOffset() * 60000)).toISOString().replace(/Z$/, '');
        }
        if (n.type == 'checkbox') n.checked = (v && v !== '0');
        else if (n.type == 'radio') n.checked = (v && n.value === v);
        else n.value = v;
      }
    }
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