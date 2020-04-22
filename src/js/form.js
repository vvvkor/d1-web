/*! form - utilities for form inputs */

let app = require('./app.js');
let toggle = require('./toggle.js');

module.exports = new(function () {

  "use strict";

  this.name = 'form';

  this.opt = {
  };

  this.init = function () {
    app.e('input[type="color"]', n => this.prepareColor(n));
    app.h('click', 'a[href^="#"][data-value]', e => {
      e.preventDefault();
      this.setValue(e.recv);
    });
    app.h('click', 'input[data-group]', e => this.checkBoxes(e.target));
  }
  
  this.checkBoxes = function(n) {
    app.e(app.qq('input[type="checkbox"][class~="' + app.attr(n, 'data-group', '') + '"]', n.form),
      m => m.checked = n.checked);
  }
  
  this.setValue = function(n) {
    let d = app.q(n.hash);
    if (d) {
      d.value = app.attr(n, 'data-value', '');
      toggle.unpop(d, true);
      //toggle.modalStyle(); //generally not needed
    }
  }

  this.prepareColor = function(n) {
    let m = app.ins('input', '', {type: 'text', value: n.value, size: 7, className: 'color'}, n, -1);
    app.ins('', ' ', {}, m, 1);
    app.b([n, m], 'input', e => (e.target==n ? m : n).value = e.target.value );
  }

})();
