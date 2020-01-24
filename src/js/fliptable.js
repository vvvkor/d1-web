/*! fliptable - responsive table */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'fliptable';

  this.opt = {
    qFlipTable: 'table.flip',
    ccCellHead: 'bg text-n hide th-dup'
  };

  this.init = function () {
    app.e(this.opt.qFlipTable, n => this.prepareFlipTable(n)); 
  }

  this.prepareFlipTable = function(t){
    let ths = app.qq('thead th', t);
    let tds = app.qq('tbody tr>*', t);
    let order = (app.attr(t, 'data-order') || '0 1 2 3').split(/\D+/);
    //t.parentNode.classList.remove('roll');
    for(let i=0; i<tds.length; i++){
      let td = tds[i];
      let th = ths[td.cellIndex];
      let ord = order.indexOf('' + td.cellIndex);
      if(ord==-1) ord = 99;
      td.style.order = ord;
      if(td.textContent.replace(/\s+$/, '').length>0){
        let v = app.ins('div');
        while(td.firstChild) v.appendChild(td.firstChild);
        td.textContent = '';
        if(th) app.ins('div', th.textContent, {className: this.opt.ccCellHead}, td)
        td.appendChild(v);
      }
    }
  }

})();