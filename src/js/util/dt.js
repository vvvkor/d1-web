/*! date - parse and format date */

export default class Dt {

  static parse(s) {
    let d = '';
    let m = (s || '').match(/^(\d+)([\-\.\/\s])(\d+)[\-\.\/\s](\d+)(\D(\d+))?(\D(\d+))?(\D(\d+))?(\D(\d+))?$/);
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
  static fmt(x, t, f) {
    let y = x.getFullYear();
    let m = Dt.n(x.getMonth()+1);
    let d = Dt.n(x.getDate());
    let h = Dt.n(x.getHours());
    let i = Dt.n(x.getMinutes());
    let s = Dt.n(x.getSeconds());
    return (f == 'm' ? m + '/' + d + ' ' + y : (f == 'd' ? d + '.' + m + '.' + y : y + '-' + m + '-' + d))
      + ((t && h+i+s>0) ? ' '+Dt.n(x.getHours())+':'+Dt.n(x.getMinutes())+':'+Dt.n(x.getSeconds()) : '');
  }

  static n(v, l) {
    return ('000'+v).substr(-(l || 2));
  }
  
}