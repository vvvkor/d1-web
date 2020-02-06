/*! tablex - filter and sort HTML table */

// table.sort[data-filter] [data-filter-report][data-case][data-filter-cols]

let app = require('./app.js');

module.exports = new(function() {

  "use strict";

  this.name = 'tablex';
  this.lang = '';
  this.skipComma = 0;
  this.intervalUnits = {
    msec: .001,
    ms: .001,
    s: 1,
    mi: 60,
    sec: 1,
    min: 60,
    h: 3600,
    d: 86400,
    w: 604800,
    m: 2628000,
    y: 31536000 // 31556952 = average Gregorian year // 31536000 = common year (365 days)
  };
  this.szUnits = {
    b: 1,
    kb: 1024,
    mb: 1048576,
    gb: 1073741824,
    tb: 1099511627776,
    pb: 1125899906842624
  };
    
  this.opt = {
    aFilter: 'data-filter',
    cFilter: 'bg-w', // filter-on - non-empty filter field
    cScan: 'text-i', // col-scan - searchable columns' header (used if "data-filter-cols" is set)
    cShow: '', // row-show - matching row
    //cHide: 'hide', // row-hide - non-matching row (if not set the "display:none" is used)
    cSort: '', // col-sort - sortable column's header
    cAsc:  'bg-y', // col-asc - !non-empty! - header of currently sorted column (ascending)
    cDesc: 'bg-w', // col-desc - header of currently sorted column (descending)
    qSort: 'table.sort',
    dateFormat: 'd', //y=Y-m-d, d=d.m.Y, m=m/d Y
    wait: 200
  };

  this.init = function() {
    this.lang = app.attr(document.documentElement, 'lang') || 'en';
    this.skipComma = (this.lang=='en');
    //let t = document.querySelectorAll(this.opt.qSort + ', table[' + this.opt.aFilter + ']');
    //t.forEach(this.prepare.bind(this));
    //for (i = 0; i < t.length; i++) this.prepare(t[i]);
    app.e(this.opt.qSort + ', table[' + this.opt.aFilter + ']', this.prepare.bind(this))
  }

  this.prepare = function(n) {
    let i, j, start = 0;
    let tb = n.querySelector('tbody');
    let rh = n.querySelector('thead tr');
    if (!rh) {
      rh = tb.rows[0];
      start = 1;
    }
    if (!rh || !tb || !tb.rows || tb.rows.length < 2) return;
    let a = [], h = [];
    for (j = 0; j < rh.cells.length; j++) {
      h[j] = rh.cells[j];
      //if (this.opt.cSort && this.isSortable(rh.cells[j])) h[j].classList.add(this.opt.cSort);
    }
    //let inp = app.ins('input','',{type:'search',size:4},rh.cells[0]);
    n.vCase = (n.getAttribute('data-case') !== null);
    let fq = n.getAttribute(this.opt.aFilter);
    n.vInp = fq
      ? document.querySelector(fq)
      : n.querySelector('[name="_q"]');
    if (n.vInp) {
      //n.vInp.onsearch = n.vInp.onkeyup = this.doFilter.bind(this,n);
      if(!n.vInp.vListen) n.vInp.addEventListener('input', this.doFilter.bind(this, n), false);
      n.vInp.vListen = 1;
      this.doFilter(n);
    }
    for (i = start; i < tb.rows.length; i++) {
      let c = tb.rows[i].cells;
      let row = [], vals = [];
      for (j = 0; j < c.length; j++){
        row[j] = this.val(c[j], n.vCase);
        vals[j] = this.convert(row[j]);
        //c[j].setAttribute('data-cell', row[j]);
      }
      a.push({
        d: row, //string data
        x: vals, //converted data [value, type]
        n: tb.rows[i], //tr_node
        v: true //visible
      });
    }
    n.vData = a;
    n.vHead = h;
    if (n.classList.contains('sort')) {
      for (j = 0; j < h.length; j++)
        if (this.isSortable(h[j])) {
          if (this.opt.cSort) h[j].classList.add(this.opt.cSort);
          //h[j].onclick = this.doSort.bind(this,n,h[j]);
          if(!h[j].vListen) h[j].addEventListener('click', this.doSort.bind(this, n, h[j]), false);
          h[j].vListen = 1;
        }
    }
  }

  this.doFilter = function(t, e) {
    if (t.vPrev !== t.vInp.value || !e) {
      t.vPrev = t.vInp.value;
      if (this.opt.cFilter) t.vInp.classList[t.vPrev.length > 0 ? 'add' : 'remove'](this.opt.cFilter);
      clearTimeout(t.vTimeout);
      t.vTimeout = setTimeout(this.filter.bind(this, t, t.vInp.value), this.opt.wait);
    }
  }

  this.doSort = function(t, th, e) {
    if (e.target.closest
      ? (!e.target.closest('a,input,select,label'))
      : (' A INPUT SELECT LABEL ').indexOf(' ' + e.target.tagName + ' ') == -1)
    {
      //e.preventDefault();
      this.sort(t, th.cellIndex);
    }
  }

  this.isSortable = function(th) {
    //return this.val(th).length > 0;
    return !th.hasAttribute('data-unsort');
  }

  this.val = function(s, cs) {
    let r = s.tagName ? s.innerHTML : '' + s;
    r = r.
    replace(/<!--.*?-->/g, '').
    replace(/<.*?>/g, '').
    replace(/&nbsp;/gi, ' ').
    replace(/^\s+/, '').
    replace(/\s+$/, '');
    if (!cs) r = r.toLowerCase();
    return r;
  }

  this.filter = function(n, q) {
    let cnt = 0;
    let i, j, data, s, hide;
    if (!n.vCols) {
      n.vCols = n.getAttribute('data-filter-cols');
      n.vCols = n.vCols ? n.vCols.split(/\D+/) : false;
      if (n.vCols && this.opt.cScan)
        for (i = 0; i < n.vCols.length; i++) {
          if (n.vHead[n.vCols[i]]) n.vHead[n.vCols[i]].classList.add(this.opt.cScan);
        }
    }
    for (i = 0; i < n.vData.length; i++) {
      hide = 0;
      if (q !== '') {
        if (n.vCols.length > 0) {
          data = [];
          for (j = 0; j < n.vCols.length; j++) data.push(n.vData[i].d[n.vCols[j]]);
        } else data = n.vData[i].d;
        s = '|' + data.join('|') + '|';
        hide = !this.matches(s, q, n.vCase);
      }
      if(app.opt.cHide) n.vData[i].n.classList[hide ? 'add' : 'remove'](app.opt.cHide);
      else n.vData[i].n.style.display = hide ? 'none' : '';
      if(this.opt.cShow) n.vData[i].n.classList[hide ? 'remove' : 'add'](this.opt.cShow);
      n.vData[i].v = !hide;
      if (!hide) cnt++;
    }
    //update totals
    app.e(app.qq('tfoot [data-total]', n), m => m.textContent = this.countTotal(n.vData, m, cnt));
    //update state
    if (n.vInp) {
      n.vInp.title = cnt + '/' + n.vData.length;
      let rep = n.getAttribute('data-filter-report');
      if (rep) rep = document.querySelector(rep);
      if (rep) rep.textContent = n.vInp.title;
    }
  }
  
  this.countTotal = function(d, m, cnt){
    let f = m.closest('th, td');
    let j = f.cellIndex;
    let a = app.attr(m, 'data-total');
    let dec = parseInt(app.attr(m, 'data-dec', 2), 10);
    let mode = app.attr(m, 'data-mode', 'n');
    let r = 0;
    if(a == 'count' || a == 'cnt') r = cnt;
    else if(!cnt) r = NaN;
    else if(a == 'sum' || a == 'avg'){
      r = d.reduce((acc, cur) => acc + (cur.v ? this.numVal(cur.x[j]) : 0), 0) / (a == 'avg' ? cnt : 1);
    }
    // only for numbers
    else if(a == 'min') r = d.reduce((acc, cur) => Math.min(acc, (cur.v ? this.numVal(cur.x[j]) : Infinity)), Infinity);
    else if(a == 'max') r = d.reduce((acc, cur) => Math.max(acc, (cur.v ? this.numVal(cur.x[j]) : -Infinity)), -Infinity);
    return isNaN(r) ? '-' : this.strVal(r, mode, dec);
  }
  
  this.dec = function(x, d){
    let m = Math.pow(10, d);
    if(d) x = Math.round(x * m) / m;
    return x;
  }

  this.matches = function(s, q, cs) {
    if (q.substr(0, 1) == '=') return s.indexOf('|' + q.substr(1).toLowerCase() + '|') != -1;
    else if (q.indexOf('*') != -1) {
      q = '\\|' + q.replace(/\*/g, '.*') + '\\|';
      return (new RegExp(q, cs ? '' : 'i')).test(s);
    } else return s.indexOf(cs ? q : q.toLowerCase()) != -1;
  }

  this.sort = function(n, col, desc) {
    if (desc === undefined) desc = (this.opt.cAsc && n.vHead[col].classList.contains(this.opt.cAsc));
    n.vData.sort(this.cmp.bind(this, col));
    if (desc) n.vData.reverse();
    for (let j = 0; j < n.vHead.length; j++) this.mark(n.vHead[j], j == col ? (desc ? -1 : 1) : 0);
    this.build(n);
  }

  this.build = function(n) {
    let tb = n.querySelector('tbody');
    for (let i = 0; i < n.vData.length; i++) {
      tb.appendChild(n.vData[i].n);
    }
  }

  this.mark = function(h, d) {
    if (this.opt.cAsc) h.classList[d > 0 ? 'add' : 'remove'](this.opt.cAsc);
    if (this.opt.cDesc) h.classList[d < 0 ? 'add' : 'remove'](this.opt.cDesc);
  }
  
  this.convert = function(v){
    let r = this.dt(v);
    if(!isNaN(r)) return [r, 'd'];
    r = this.sz(v);
    if(!isNaN(r)) return [r, 'b'];
    r = this.interval(v);
    if(!isNaN(r)) return [r, 'i'];
    r = this.nr(v);
    if(!isNaN(r)) return [r, 'n'];
    return [v, 's'];
  }
  
  this.numVal = function(x){
    return (x[1] == 's') ? this.nr(x[0], 1) : x[0];
  }

  this.strVal = function(x, mode, dec){
    if (mode == 's') return x;
    else if(mode == 'n') return x.toFixed(dec) * 1;//this.dec(x, dec);
    else if(mode == 'b') return this.fmtSz(x, dec);
    else if(mode == 'i') return this.fmtInterval(x, dec);
    else if(mode == 'd') return this.fmtDt(new Date(x), dec);
    else return x;
  }

  this.fmtSz = function(x, dec){
    let i = x ? Math.min(5, Math.floor(Math.log(x) / Math.log(1024))) : 0;
    return (x / Math.pow(1024, i)).toFixed(dec) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB', 'PB'/*, 'EB', 'ZB', 'YB'*/][i];
  }
  
  this.fmtInterval = function(x, dec){
    let y = this.intervalUnits.y;
    let m = this.intervalUnits.m;
    var s = [
        [Math.floor(x / y), 'y'],
        [Math.floor((x % y) / m), 'm'],
        [Math.floor(((x % y) % m) / 86400), 'd'],
        [Math.floor((((x % y) % m) % 86400) / 3600), 'h'],
        [Math.floor(((((x % y) % m) % 86400) % 3600) / 60), 'min'],
                   [((((x % y) % m) % 86400) % 3600) % 60, 'sec']
    ];
    return s.map(v => v[0] ? v[0] + v[1] : null).filter(v => v !== null).join(' ');
  }
  
  this.fmtDt = function(x, t, f){
    let d = this.n(x.getDate());
    let m = this.n(x.getMonth()+1);
    let y = x.getFullYear();
    if(!f) f = this.opt.dateFormat;
    return (f=='m' ? m + '/' + d + ' ' + y : (f=='d' ? d + '.' + m + '.' + y : y + '-' + m + '-' + d))
      + (t ? ' '+this.n(x.getHours())+':'+this.n(x.getMinutes())+':'+this.n(x.getSeconds()) : '');
  }
  
  this.n = function(v, l){
    return ('000'+v).substr(-(l || 2));
  }
  
  this.cmp = function(by, a, b) {
    a = a.x[by][0];
    b = b.x[by][0];
    return a < b ? -1 : (a > b ? 1 : 0);
  }
  
  this.nr = function(s, nanToZero){
    //use Number instead of parseFloat for more strictness
    s = this.skipComma
      ? s.replace(/(\$|,|\s)/g, '')
      : s.replace(/(\$|\s)/g, '').replace(',', '.');
    s = parseFloat(s);
    if(isNaN(s) && nanToZero) s = 0;
    return s;
  }

  this.dt = function(s) {
    let m = s.match(/^(\d+)(\D)(\d+)\D(\d+)(\D(\d+))?(\D(\d+))?(\D(\d+))?(\D(\d+))?$/);
    if (m) {
      let x;
      if (m[2] == '.') x = [4, 3, 1]; //d.m.Y
      else if (m[2] == '/') x = [4, 1, 3]; //m/d Y
      else x = [1, 3, 4]; //Y-m-d
      let d = new Date(m[x[0]], m[x[1]] - 1, m[x[2]], m[6] || 0, m[8] || 0, m[10] || 0, m[12] || 0);
      return d ? d.getTime() : NaN;
    }
    return NaN;
  }

  this.interval = function(s) {
    let x = this.intervalUnits;
    let m = s.match(/^(\d+)\s*(y|m|w|d|h|min|mi|sec|s|ms|msec)$/i);
    if (m && x[m[2]]) return m[1] * x[m[2]];
    return NaN;
  }

  this.sz = function(s) {
    let x = this.szUnits;
    let m = s.match(/^((\d*\.)?\d+)\s*(([kmgtp]i?)?b)$/i);
    if (m) {
      m[3] = m[3].replace(/ib$/i, 'b').toLowerCase();
      if (x[m[3]]) return m[1] * x[m[3]];
    }
    return NaN;
  }

})();