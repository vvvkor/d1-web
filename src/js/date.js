/*! date - parse and formate date */

module.exports = new(function() {

  "use strict"; 

  this.parse = function(s) {
    let d = '';
    let m = s.match(/^(\d+)(\D)(\d+)\D(\d+)(\D(\d+))?(\D(\d+))?(\D(\d+))?(\D(\d+))?$/);
    if (m) {
      let x;
      if (m[2] == '.') x = [4, 3, 1]; //d.m.Y
      else if (m[2] == '/') x = [4, 1, 3]; //m/d Y
      else x = [1, 3, 4]; //Y-m-d
      d = new Date(m[x[0]], m[x[1]] - 1, m[x[2]], m[6] || 0, m[8] || 0, m[10] || 0, m[12] || 0);
      //return d ? d.getTime() : NaN;
    }
    return d;// || NaN;
  }

  /*
    x: date object
    t: include time
    f: y=Y-m-d (default), d=d.m.Y, m=m/d Y
  */
  this.fmt = function(x, t, f){
    let y = x.getFullYear();
    let m = this.n(x.getMonth()+1);
    let d = this.n(x.getDate());
    let h = this.n(x.getHours());
    let i = this.n(x.getMinutes());
    let s = this.n(x.getSeconds());
    return (f=='m' ? m + '/' + d + ' ' + y : (f=='d' ? d + '.' + m + '.' + y : y + '-' + m + '-' + d))
      + ((t && h+i+s>0) ? ' '+this.n(x.getHours())+':'+this.n(x.getMinutes())+':'+this.n(x.getSeconds()) : '');
  }

  this.n = function(v, l){
    return ('000'+v).substr(-(l || 2));
  }
  
})();