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
    app.listen('click', e => this.onClick(e));
  }

  this.onClick = function(e){
    let n = e.target;
    let a = app.closest(n, 'a[href^="#"][data-value]');
    if(a){
      e.preventDefault();
      this.setValue(a);
    }
    else if(n.matches('input[data-group]')){
      this.checkBoxes(n);
    }
  }

  this.checkBoxes = function(n) {
    app.e(app.qq('input[type="checkbox"][class~="' + app.attr(n, 'data-group') + '"]', n.form),
      m => m.checked = n.checked);
  }
  
  this.setValue = function(n) {
    let d = app.q(n.hash);
    if (d) {
      d.value = app.attr(n, 'data-value');
      toggle.esc();
    }
  }

  this.prepareColor = function(n) {
    let m = app.ins('input', '', {type: 'text', value: n.value, size: 7, className: 'color'}, n, -1);
    app.ins('', ' ', {}, m, 1);
    app.b([n, m], 'input', e => (e.target==n ? m : n).value = e.target.value );
  }

})();
