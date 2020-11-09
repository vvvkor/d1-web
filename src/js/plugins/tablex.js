/*! tablex - filter and sort HTML table */

// table.sort.totals.filter[data-filter][data-filter-report][data-case][data-filter-cols]

import Plugin from './plugin.js';
import Dt from '../util/dt.js';
import Func from '../util/func.js';

export default class extends Plugin {

  constructor() {
    super('tablex')

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
      aTotal: 'data-total',
      cFilter: 'filter',
      cFiltered: 'bg-w', // filter-on - non-empty filter field
      cScan: 'text-i', // col-scan - searchable columns' header (used if "data-filter-cols" is set)
      cShow: '', // row-show - matching row
      //cHide: 'hide', // row-hide - non-matching row (if not set the "display:none" is used)
      cSortable: '', // col-sort - sortable column's header
      cUnmatch: 'unmatch',
      cUnpage: 'unpage',
      cAsc:  'bg-y', // col-asc - !non-empty! - header of currently sorted column (ascending)
      cDesc: 'bg-w', // col-desc - header of currently sorted column (descending)
      dateFormat: 'd', //y=Y-m-d, d=d.m.Y, m=m/d Y
      wait: 200
    };
  }

  init() {
    this.lang = document.documentElement.getAttribute('lang') || 'en';
    this.skipComma = (this.lang == 'en');
    this.app.h('click', '.tablex-pagenav a', e => this.page(e));
  }
  
  arrange({n}) {
    let q = 'table.' + this.opt.cSort + ', table.' + this.opt.cFilter + ', table.' + this.opt.cTotals + ', table[' + this.opt.aFilter + ']' + ', table[data-limit]';
    this.app.ee(n, q, this.prepare.bind(this));
  }
  
  page(e) {
    e.preventDefault();
    let nav = e.recv.closest('.tablex-pagenav');
    this.paginate(nav.vTable, 1 * e.recv.hash.substr(1))
  }

  prepare(n) {
    if (n.dataset.ready) return;
    n.dataset.ready = 1;
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
    //let inp = this.app.ins('input','',{type:'search',size:4},rh.cells[0]);
    n.vCase = (n.getAttribute('data-case') !== null);
    let fq = n.dataset.filter;
    n.vInp = fq
      ? document.querySelector(fq)
      : n.querySelector('[name="_q"]');
    n.vRep = this.app.q((n.dataset.filterReport || '')); // dataset.filterReport
    n.vLimit = 1 * (n.dataset.limit || 0);
    n.vPage = 1;
    if (!n.vInp /* && !n.vRep */ && n.classList.contains(this.opt.cFilter)) this.addFilter(n);
    if (n.vLimit && tb.rows.length>n.vLimit) this.addPageNav(n);
    
    if (n.vInp) {
      //n.vInp.onsearch = n.vInp.onkeyup = this.doFilter.bind(this,n);
      //1.
      //if (!n.vInp.vListen) n.vInp.addEventListener('input', this.doFilter.bind(this, n), false);
      //2.
      const f = Func.debounce(this.doFilter.bind(this), this.opt.wait);
      if (!n.vInp.vListen) this.app.b([n.vInp], 'input', e => f(n));
      n.vInp.vListen = 1;
      //this.doFilter(n);
    }

    for (i = start; i < tb.rows.length; i++) {
      let c = tb.rows[i].cells;
      let row = [], vals = [];
      for (j = 0; j < c.length; j++) {
        row[j] = this.val(c[j], n.vCase);
        vals[j] = this.convert(row[j]);
        let type = (vals[j][0] === '') ? 'x' : vals[j][1];
        types[j][type]++;
        if (this.app.isDebug()) c[j].title = type+': '+vals[j][0];
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
    if (n.classList.contains(this.opt.cTotals)) {
      this.addFooter(n, rh);
      if (!n.vInp) this.updateTotals(n, a.length);
    }
    if (n.vInp) this.doFilter(n);
    else if (n.vLimit) this.paginate(n, 1);
    if (n.classList.contains(this.opt.cSort)) {
      for (j = 0; j < h.length; j++)
        if (this.isSortable(h[j])) {
          if (this.opt.cSortable) h[j].classList.add(this.opt.cSortable);
          if (!h[j].vListen) h[j].addEventListener('click', this.doSort.bind(this, n, h[j]), false);
          h[j].vListen = 1;
        }
    }
  }
  
  paginate(n, page) {
    n.vPage = page;
    if (n.vLimit && n.vPage) {
      this.setPageNav(n);
      let skip = n.vLimit * (page - 1);
      let last = skip + n.vLimit - 1;
      //console.log('paginate', page, n.vCount, skip, last, n.vPageNav.children.length);
      let j = 0;
      for (let i = 0; i < n.vData.length; i++) {
        let hide = n.vData[i].n.classList.contains(this.opt.cUnmatch);
        if (!hide) {
          let on = (j >= skip && j <= last);
          n.vData[i].n.classList[on ? 'remove' : 'add'](this.app.opt.cHide, this.opt.cUnpage);
          j++;
        }
      }
    }
  }
  
  addFilter(n) {
    let t = n.parentNode.classList.contains('roll') ? n.parentNode : n;
    let p = this.app.ins('p', ' ', {}, t, -1);
    n.vInp = this.app.ins('input', '', {type: 'search'}, p, false);
    n.vRep = this.app.ins('span', '', {}, p);
  }
  
  addPageNav(n) {
    let t = n.parentNode.classList.contains('roll') ? n.parentNode : n;
    n.vPageNav = this.app.ins('ul', '', 'nav hover tablex-pagenav');
    n.vPageNav.vTable = n;
    this.app.ins('div', n.vPageNav, 'mar small', t, 'pagesAfter' in n.dataset ? 1 : -1); // dataset.pagesAfter
  }
  
  setPageNav(n) {
    const app = this.app
    let m = 1 * (n.dataset.pages || 10);
    let h = Math.floor((m + 1) / 2); // shift to first
    //let h = Math.ceil((m + 1) / 2); // shift to last
    let ul = n.vPageNav;
    let last = Math.ceil(n.vCount / n.vLimit);
    let min = Math.max(1, Math.min(n.vPage - h + 1, last - m + 1));
    let max = Math.min(last, min + m - 1);
    let cur = Math.max(Math.min(n.vPage, last), 1);
    app.clr(ul);
    //console.log('pagenav', m, min, max, last, min + m - 1);
    if (max>1) {
      if (last>m) app.ins('li', app.ins('a', app.i('first', '&laquo;'), {href: '#1'}), {}, ul);
      app.ins('li', app.ins('a', app.i('left', '&lsaquo;'), {href: '#' + Math.max(1, cur-1), className: cur == 1 ? 'inact' : ''}), {}, ul);
      for (let i=min; i<=max; i++) {
        const a = app.ins('a', i, {href: '#' + i, className: (i == cur ? 'act bg' : '')});
        app.ins('li', a, {}, ul);
      }
      app.ins('li', app.ins('a', app.i('right', '&rsaquo;'), {href: '#' + Math.min(cur+1, last), className: cur == last ? 'inact' : ''}), {}, ul);
      if (last>m) app.ins('li', app.ins('a', app.i('last', '&raquo;'), {href: '#' + last}), {}, ul);
    }
  }

  addFooter(n, rh) {
    const f = this.app.ins('tfoot', this.app.ins('tr'), 'nobr', n);
    this.app.a(rh.cells).forEach(h => {
      const t = n.vTypes[h.cellIndex];
      const func = t == 's' ? 'count' : (t == 'd' ? 'max' : 'sum');
      const th = this.app.ins('th', this.app.ins(t == 's' ? 'i' : 'span', '', {[this.opt.aTotal]: func, className: (t == 's' ? 'text-n' : '')}), {title: func}, f.firstChild);
      if ('labels' in n.dataset) this.app.ins('div', func, 'small text-n', th, false);
    }
    );
  }
  
  doFilter(t, e) {
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

  doSort(t, th, e) {
    if (e.target.closest
      ? (!e.target.closest('a,input,select,label'))
      : (' A INPUT SELECT LABEL ').indexOf(' ' + e.target.tagName + ' ') == -1)
    {
      //e.preventDefault();
      this.sort(t, th.cellIndex);
    }
  }

  isSortable(th) {
    //return this.val(th).length > 0;
    return !th.hasAttribute('data-unsort');
  }

  val(s, cs) {
    let r = s.tagName ? (s.vVal ?? s.innerHTML) : '' + s;
    r = r.
    replace(/<!--.*?-->/g, '').
    replace(/<.*?>/g, '').
    replace(/&nbsp;/gi, ' ').
    replace(/^\s+/, '').
    replace(/\s+$/, '');
    if (!cs) r = r.toLowerCase();
    return r;
  }

  filter(n, q) {
    let cnt = 0;
    let i, j, data, s, hide;
    if (!n.vCols) {
      n.vCols = n.dataset.filterCols || '';
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
      if (this.app.opt.cHide) n.vData[i].n.classList[hide ? 'add' : 'remove'](this.app.opt.cHide, this.opt.cUnmatch);
      else n.vData[i].n.style.display = hide ? 'none' : '';
      if (this.opt.cShow) n.vData[i].n.classList[hide ? 'remove' : 'add'](this.opt.cShow);
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
  
  updateTotals(n, cnt) {
    this.app.ee(n, '[' + this.opt.aTotal + ']', m => m.textContent = this.countTotal(n, m, cnt));
  }
  
  countTotal(n, m, cnt) {
    let d = n.vData;
    let j = m.closest('th, td').cellIndex;
    let a = m.dataset.total || '';
    let dec = 1 * (m.dataset.dec || 2);
    let mode = m.dataset.mode || n.vTypes[j];
    let r = 0;
    //if (a == 'count' || a == 'cnt') r = cnt;
    if (a == 'count' || a == 'cnt') r = d.reduce((acc, cur) => acc + (cur.v && cur.x[j][0] !== '' ? 1 : 0), 0);
    else if (!cnt || mode == 'x') r = NaN;
    else if (a == 'sum' || a == 'avg') {
      r = (mode == 's')
        ? NaN
        : d.reduce((acc, cur) => acc + (cur.v ? this.numVal(cur.x[j]) : 0), 0) / (a == 'avg' ? cnt : 1);
    }
    // only for numbers
    else if (a == 'min') r = d.reduce((acc, cur) => Math.min(acc, (cur.v ? this.numVal(cur.x[j]) : Infinity)), Infinity);
    else if (a == 'max') r = d.reduce((acc, cur) => Math.max(acc, (cur.v ? this.numVal(cur.x[j]) : -Infinity)), -Infinity);
    return isNaN(r) ? '-' : this.strVal(r, mode, dec);
  }
  
  dec(x, d) {
    let m = Math.pow(10, d);
    if (d) x = Math.round(x * m) / m;
    return x;
  }

  matches(s, q, cs) {
    if (q.substr(0, 1) == '=') return s.indexOf('|' + q.substr(1).toLowerCase() + '|') != -1;
    else if (q.indexOf('*') != -1) {
      q = '\\|' + q.replace(/\*/g, '.*') + '\\|';
      return (new RegExp(q, cs ? '' : 'i')).test(s);
    } else return s.indexOf(cs ? q : q.toLowerCase()) != -1;
  }

  sort(n, col, desc) {
    if (desc === undefined) desc = (this.opt.cAsc && n.vHead[col].classList.contains(this.opt.cAsc));
    n.vData.sort(this.cmp.bind(this, col));
    if (desc) n.vData.reverse();
    for (let j = 0; j < n.vHead.length; j++) this.mark(n.vHead[j], j == col ? (desc ? -1 : 1) : 0);
    this.build(n);
    if (n.vLimit) this.paginate(n, 1);
  }

  build(n) {
    let tb = n.querySelector('tbody');
    for (let i = 0; i < n.vData.length; i++) {
      tb.appendChild(n.vData[i].n);
    }
  }

  mark(h, d) {
    if (this.opt.cAsc) h.classList[d > 0 ? 'add' : 'remove'](this.opt.cAsc);
    if (this.opt.cDesc) h.classList[d < 0 ? 'add' : 'remove'](this.opt.cDesc);
  }
  
  convert(v) {
    let r = Dt.parse(v);
    r = r ? r.getTime() : NaN;
    if (!isNaN(r)) return [r, 'd'];
    r = this.sz(v);
    if (!isNaN(r)) return [r, 'b'];
    r = this.interval(v);
    if (!isNaN(r)) return [r, 'i'];
    r = this.nr(v);
    if (!isNaN(r)) return [r, 'n'];
    return [v, 's'];
  }
  
  numVal(x) {
    return (x[1] == 's') ? this.nr(x[0], 1) : x[0];
  }

  strVal(x, mode, dec) {
    if (mode == 's') return x;
    else if (mode == 'n') return x.toFixed(dec) * 1;//this.dec(x, dec);
    else if (mode == 'b') return this.fmtSz(x, dec);
    else if (mode == 'i') return this.fmtInterval(x, dec);
    else if (mode == 'd') return Dt.fmt(new Date(x), dec, this.opt.dateFormat);
    else return x;
  }

  fmtSz(x, dec) {
    let i = x ? Math.min(5, Math.floor(Math.log(x) / Math.log(1024))) : 0;
    return (x / Math.pow(1024, i)).toFixed(dec) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB', 'PB'/*, 'EB', 'ZB', 'YB'*/][i];
  }
  
  fmtInterval(x, dec) {
    const y = this.intervalUnits.y;
    const m = this.intervalUnits.m;
    const s = [
        [Math.floor(x / y), 'y'],
        [Math.floor((x % y) / m), 'm'],
        [Math.floor(((x % y) % m) / 86400), 'd'],
        [Math.floor((((x % y) % m) % 86400) / 3600), 'h'],
        [Math.floor(((((x % y) % m) % 86400) % 3600) / 60), 'min'],
                   [((((x % y) % m) % 86400) % 3600) % 60, 'sec']
    ];
    return s.map(v => v[0] ? v[0] + v[1] : null).filter(v => v !== null).join(' ');
  }
  
  cmp(by, a, b) {
    a = a.x[by][0];
    b = b.x[by][0];
    return a < b ? -1 : (a > b ? 1 : 0);
  }
  
  nr(s, nanToZero) {
    //use Number instead of parseFloat for more strictness
    s = this.skipComma
      ? s.replace(/(\$|,|\s)/g, '')
      : s.replace(/(\$|\s)/g, '').replace(',', '.');
    s = parseFloat(s.replace(/\u2212/g, '-')); // unicode minus
    if (isNaN(s) && nanToZero) s = 0;
    return s;
  }

  interval(s) {
    let x = this.intervalUnits;
    let m = s.match(/\d+\s?(y|m|w|d|h|min|mi|sec|s|msec|ms)\b/gi);
    if (m) m = m.map(v => v.match(/^(\d+)\s?(.*)$/));
    //matchAll && m = [...m];
    return m && m.length>0 ? m.map(cur => x[cur[2]] ? cur[1] * x[cur[2]] : 0).reduce((a, b) => a + b, 0) : NaN;
  }

  sz(s) {
    let x = this.szUnits;
    let m = s.match(/^((\d*\.)?\d+)\s*(([kmgtp]i?)?b)$/i);
    if (m) {
      m[3] = m[3].replace(/ib$/i, 'b').toLowerCase();
      if (x[m[3]]) return m[1] * x[m[3]];
    }
    return NaN;
  }

}