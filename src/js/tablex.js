/*! tablex - filter and sort HTML table */

// table.sort.totals.filter[data-filter][data-filter-report][data-case][data-filter-cols]

let app = require('./app.js');
let date = require('./date.js');

module.exports = new(function() {

  "use strict";

  this.name = 'tablex';
  this.lang = '';
  this.skipComma = 0;
  this.intervalUnits = {
    ms: .001,
    msec: .001,
    s: 1,
    sec: 1,
    mi: 60,
    min: 60,
    h: 3600,
    hr: 3600,
    d: 86400,
    w: 604800,
    m: 2628000,
    mth: 2628000,
    y: 31536000,
    yr: 31536000 
    // 31556952 = average Gregorian year // 31536000 = common year (365 days)
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
    cSort: 'sort',
    cTotals: 'totals',
    aFilter: 'data-filter',
    aRep: 'data-filter-report',
    aTotal: 'data-total',
    aLimit: 'data-limit',
    aPages: 'data-pages',
    aPageNavAfter: 'data-pages-after',
    cFilter: 'filter',
    cFiltered: 'bg-w', // filter-on - non-empty filter field
    cScan: 'text-i', // col-scan - searchable columns' header (used if "data-filter-cols" is set)
    cShow: '', // row-show - matching row
    //cHide: 'hide', // row-hide - non-matching row (if not set the "display:none" is used)
    cSortable: '', // col-sort - sortable column's header
    cAsc:  'bg-y', // col-asc - !non-empty! - header of currently sorted column (ascending)
    cDesc: 'bg-w', // col-desc - header of currently sorted column (descending)
    dateFormat: 'd', //y=Y-m-d, d=d.m.Y, m=m/d Y
    wait: 200
  };

  this.init = function() {
    this.lang = app.attr(document.documentElement, 'lang') || 'en';
    this.skipComma = (this.lang=='en');
    app.e('table.' + this.opt.cSort + ', table.' + this.opt.cFilter + ', table.' + this.opt.cTotals + ', table[' + this.opt.aFilter + ']', this.prepare.bind(this));
    app.h('click', '.tablex-pagenav a', e => this.page(e));
  }
  
  this.page = function(e){
    e.preventDefault();
    let nav = e.recv.closest('.tablex-pagenav');
    this.paginate(nav.vTable, 1 * e.recv.hash.substr(1))
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
    let a = [], h = [], types = [];
    for (j = 0; j < rh.cells.length; j++) {
      h[j] = rh.cells[j];
      types[j] = {x: 0, s: 0, n: 0, b: 0, i: 0, d: 0};
      //if (this.opt.cSortable && this.isSortable(rh.cells[j])) h[j].classList.add(this.opt.cSortable);
    }
    //let inp = app.ins('input','',{type:'search',size:4},rh.cells[0]);
    n.vCase = (n.getAttribute('data-case') !== null);
    let fq = app.attr(n, this.opt.aFilter);
    n.vInp = fq
      ? document.querySelector(fq)
      : n.querySelector('[name="_q"]');
    n.vRep = app.q(app.attr(n, this.opt.aRep, ''));
    n.vLimit = 1 * app.attr(n, this.opt.aLimit, 0);
    n.vPage = 1;
    if(!n.vInp && !n.vRep && n.classList.contains(this.opt.cFilter)) this.addFilter(n);
    if(n.vLimit && tb.rows.length>n.vLimit) this.addPageNav(n);
    
    if (n.vInp) {
      //n.vInp.onsearch = n.vInp.onkeyup = this.doFilter.bind(this,n);
      //1.
      //if(!n.vInp.vListen) n.vInp.addEventListener('input', this.doFilter.bind(this, n), false);
      //2.
      let f = app.delay(this.doFilter, this.opt.wait, true);
      if(!n.vInp.vListen) n.vInp.addEventListener('input', f.bind(this, n), false);
      n.vInp.vListen = 1;
      //this.doFilter(n);
    }

    for (i = start; i < tb.rows.length; i++) {
      let c = tb.rows[i].cells;
      let row = [], vals = [];
      for (j = 0; j < c.length; j++){
        row[j] = this.val(c[j], n.vCase);
        vals[j] = this.convert(row[j]);
        let type = (vals[j][0] === '') ? 'x' : vals[j][1];
        types[j][type]++;
        //c[j].title = type+': '+vals[j][0];
        //c[j].setAttribute('data-cell', row[j]);
      }
      a.push({
        d: row, //string data
        x: vals, //converted data [value, type]
        n: tb.rows[i], //tr_node
        v: true //visible
      });
    }
    
    n.vCount = a.length;
    n.vData = a;
    n.vHead = h;
    n.vTypes = types.map(t => Object.keys(t).reduce((acc, cur) => t[cur] > acc[1] ? [cur, t[cur]] : acc, ['s', 0])[0]);
    if(n.classList.contains(this.opt.cTotals)){
      this.addFooter(n, rh);
      if(!n.vInp) this.updateTotals(n, a.length);
    }
    if(n.vInp) this.doFilter(n);
    else if(n.vLimit) this.paginate(n, 1);
    if(n.classList.contains(this.opt.cSort)) {
      for (j = 0; j < h.length; j++)
        if (this.isSortable(h[j])) {
          if (this.opt.cSortable) h[j].classList.add(this.opt.cSortable);
          if(!h[j].vListen) h[j].addEventListener('click', this.doSort.bind(this, n, h[j]), false);
          h[j].vListen = 1;
        }
    }
  }
  
  this.paginate = function(n, page){
    n.vPage = page;
    if(n.vLimit && n.vPage){
      this.setPageNav(n);
      let skip = n.vLimit * (page - 1);
      let last = skip + n.vLimit - 1;
      //console.log('paginate', page, n.vCount, skip, last, n.vPageNav.children.length);
      let j = 0;
      for (let i = 0; i < n.vData.length; i++) {
        let hide = n.vData[i].n.classList.contains(app.opt.cHide);
        if(!hide){
          let on = (j >= skip && j <= last);
          n.vData[i].n.classList[on ? 'remove' : 'add'](app.opt.cToggle, app.opt.cOff);
          j++;
        }
      }
    }
  }
  
  this.addFilter = function(n){
    let t = n.parentNode.classList.contains('roll') ? n.parentNode : n;
    let p = app.ins('p', ' ', {}, t, -1);
    n.vInp = app.ins('input', '', {type: 'search'}, p, false);
    n.vRep = app.ins('span', '', {}, p);
  }
  
  this.addPageNav = function(n){
    let t = n.parentNode.classList.contains('roll') ? n.parentNode : n;
    n.vPageNav = app.ins('ul', '', {className: 'nav hover tablex-pagenav'});
    n.vPageNav.vTable = n;
    app.ins('div', n.vPageNav, {className: 'mar small'}, t, app.attr(n, this.opt.aPageNavAfter)===null ? -1 : 1);
  }
  
  this.setPageNav = function(n){
    let m = 1 * app.attr(n, this.opt.aPages, 10);
    let h = Math.ceil((m - 1) / 2);
    let ul = n.vPageNav;
    let last = Math.ceil(n.vCount / n.vLimit);
    let min = Math.max(1, Math.min(n.vPage - h, last - m + 1));
    let max = Math.min(last, min + m - 1);
    let cur = Math.max(Math.min(n.vPage, last), 1);
    app.clr(ul);
    //console.log('pagenav', m, min, max, last, min + m - 1);
    if(max>1){
      if(last>m) app.ins('li', app.ins('a', app.i('first', '&laquo;'), {href: '#1'}), {}, ul);
      app.ins('li', app.ins('a', app.i('west', '&lsaquo;'), {href: '#' + Math.max(1, cur-1)}), {}, ul);
      for(var i=min; i<=max; i++){
        let a = app.ins('a', i, {href: '#' + i, className: (i==cur ? 'act bg' : '')});
        app.ins('li', a, {}, ul);
      }
      app.ins('li', app.ins('a', app.i('east', '&rsaquo;'), {href: '#' + Math.min(cur+1, last)}), {}, ul);
      if(last>m) app.ins('li', app.ins('a', app.i('last', '&raquo;'), {href: '#' + last}), {}, ul);
    }
  }

  this.addFooter = function(n, rh){
    let f = app.ins('tfoot', app.ins('tr'), {className: 'nobr'}, n);
    app.a(rh.cells).forEach(h => {
      let t = n.vTypes[h.cellIndex];
      let func = t=='s' ? 'count' : (t=='d' ? 'max' : 'sum');
      app.ins('th', app.ins(t=='s' ? 'i' : 'span', '', {[this.opt.aTotal]: func, className: (t=='s' ? 'text-n' : '')}), {title: func}, f.firstChild);
    }
    );
  }
  
  this.doFilter = function(t, e) {
    if (t.vPrev !== t.vInp.value || !e) {
      t.vPrev = t.vInp.value;
      if (this.opt.cFiltered) t.vInp.classList[t.vPrev.length > 0 ? 'add' : 'remove'](this.opt.cFiltered);
      //1.
      //clearTimeout(t.vTimeout);
      //t.vTimeout = setTimeout(this.filter.bind(this, t, t.vInp.value), this.opt.wait);
      //2.
      this.filter(t, t.vInp.value);
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
      n.vCols = app.attr(n, 'data-filter-cols', '');
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
    //update state
    n.vCount = cnt;
    this.updateTotals(n, cnt);
    let x = cnt + '/' + n.vData.length;
    if (n.vInp) n.vInp.title = x;
    if (n.vRep) n.vRep.textContent = x;
    if (n.vLimit) this.paginate(n, 1);
  }
  
  this.updateTotals = function(n, cnt){
    app.e(app.qq('[' + this.opt.aTotal + ']', n), m => m.textContent = this.countTotal(n, m, cnt));
  }
  
  this.countTotal = function(n, m, cnt){
    let d = n.vData;
    let j = m.closest('th, td').cellIndex;
    let a = app.attr(m, 'data-total', '');
    let dec = parseInt(app.attr(m, 'data-dec', 2), 10);
    let mode = app.attr(m, 'data-mode', /*'n'*/ n.vTypes[j]);
    let r = 0;
    //if(a == 'count' || a == 'cnt') r = cnt;
    if(a == 'count' || a == 'cnt') r = d.reduce((acc, cur) => acc + (cur.v && cur.x[j][0]!=='' ? 1 : 0), 0);
    else if(!cnt || mode=='x') r = NaN;
    else if(a == 'sum' || a == 'avg'){
      r = (mode=='s')
        ? NaN
        : d.reduce((acc, cur) => acc + (cur.v ? this.numVal(cur.x[j]) : 0), 0) / (a == 'avg' ? cnt : 1);
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
    if (n.vLimit) this.paginate(n, 1);
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
    let r = date.parse(v);
    r = r ? r.getTime() : NaN;
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
    else if(mode == 'd') return date.fmt(new Date(x), dec, this.opt.dateFormat);
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

  this.interval = function(s) {
    let x = this.intervalUnits;
    let m = s.match(/\d+\s?(y|m|w|d|h|min|mi|sec|s|msec|ms)\b/gi);
    if(m) m = m.map(v => v.match(/^(\d+)\s?(.*)$/));
    //matchAll && m = [...m];
    return m && m.length>0 ? m.map(cur => x[cur[2]] ? cur[1] * x[cur[2]] : 0).reduce((a, b) => a + b, 0) : NaN;
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