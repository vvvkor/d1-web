/*! example - plugin template */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'example';

  this.opt = {
  };

  this.init = function () {
    //app.h('click', 'a.example', e => this.onClick(e));
  }

  /*
  this.onClick = function(e){
    let n = e.target; //e.recv
  }
  */

  //app.plug(this);

})();