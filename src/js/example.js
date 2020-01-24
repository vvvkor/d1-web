/*! example - plugin template */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'example';

  this.opt = {
  };

  this.init = function () {
    //app.listen('click', e => this.onClick(e));
  }

  /*
  this.onClick = function(e){
    let n = e.target;
  }
  */

  //app.plug(this);

})();