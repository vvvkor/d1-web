/*! calendar - replacement of standard date and datetime-local inputs */

// import toggle from './toggle.js'
import Dt from '../util/dt.js'

import Plugin from './plugin.js'

export default class extends Plugin {

  constructor () {
    super('calendar')

    this.opt = {
      cBtn: 'pad hover',
      dateFormat: 'd', //y=Y-m-d, d=d.m.Y, m=m/d Y
      hCancel: '#close',
      hashNow: '#now',
      addIcons: [['date', '#', '#open'], ['ok', '&check;', '#now'], ['delete', '&#x2715;', '#clear']],
      idPicker: 'pick-date',
      minWidth: 801,
      qsCalendar: 'input.calendar',
      showModal: 0, // ! avoid modal calendar inside modal dialog
      sizeLimit: 801,
      stepMinutes: 1,
      inPop: 0
    };

    this.win = null;
  }

  init (/*opt*/) {
    //let i;
    //for(i in opt) this.opt[i] = opt[i];

    if(window.innerWidth < this.opt.minWidth) return;
    this.win = this.app.ins('div', '', {id: this.opt.idPicker, className: this.app.opt.cToggle + ' ' + this.app.opt.cOff + ' pad'});//dlg hide pad
    this.win.style.whiteSpace = 'nowrap';
    document.body.appendChild(this.win);

    this.app.e(this.opt.qsCalendar, n => this.preparePick(n));
    this.app.h('click', this.opt.qsCalendar, e => this.openDialog(e.target, null, e));
    this.app.h('input', this.opt.qsCalendar, e => this.validate(e.target, 0));
    //this.app.h('keydown', this.opt.qsCalendar, e => this.key(e));
    //this.app.h('click', '#' + this.opt.idPicker, e => app.pf('toggle', 'setShown', e.recv.vRel));
    this.app.h('click', '#' + this.opt.idPicker + ' a', e => this.onClick(e));
    this.app.h('click', '.calendar-tools a', e => this.onClick(e, true));
  }
  
  /*
  key (e){
    if(e.keyCode == 40 && !this.app.vis(this.win)) this.openDialog(e.target, null, e);
  }
  */
  
  onClick (e, tool){
    let a = e.recv;
    let h = a.hash;
    if(h){
      //nodes
      let n;
      let c = this.opt.qsCalendar;
      if(tool){
        n = this.opt.inPop
          ? this.app.q(c, this.app.next(a.parentNode, '.pop', true))
          : this.app.next(a.parentNode, c, true);
      }
      else if(this.win.vRel) n = this.win.vRel;
      else{
        let p = a.closest('#' + this.opt.idPicker);
        n = this.opt.inPop
          ? this.app.next(p, c, true)
          : this.app.next(p.parentNode, c);
      }
      
      
      //data
      let x = this.win.vCur;
      let dy = (h=='#prev-year') ? -1 : (h=='#next-year' ? 1 : 0);
      let dm = (h=='#prev-month') ? -1 : (h=='#next-month' ? 1 : 0);
      let dh = (h=='#prev-hour') ? -1 : (h=='#next-hour' ? 1 : 0);
      let di = (h=='#prev-min') ? -this.opt.stepMinutes : (h=='#next-min' ? this.opt.stepMinutes : 0);
      
      //actions
      if(dy || dm) this.switchMonths(n, x.getFullYear()+dy, x.getMonth()+dm, x.getDate());
      else if(dh || di) this.setTime(n, dh, di);
      else if(h==this.opt.hashNow) this.closeDialog(n, true);
      else if(h==this.opt.hCancel) this.closeDialog(n, null); // same as esc
      else if(h=='#open') this.openDialog(n, null);
      else if(h=='#clear') this.closeDialog(n, '');
      else if(h.match(/#\d\d?/)) this.closeDialog(n, this.fmt(x, h.substr(1)));
      this.app.pf('toggle', 'setShown', (h=='#open') ? this.win : n);
      e.preventDefault();
      e.stopPropagation();
    }
  }
  
  toggle (on, n){
    if(n){
      let m = n.dataset.mode
      if(m) m = m[0] === 'm'; // modal | popup
      else m = this.opt.showModal || (Math.min(window.innerWidth, window.innerHeight) < this.opt.sizeLimit);
      if(on){
        this.win.className = this.app.opt.cToggle + ' ' + this.app.opt.cOff + ' pad ' + (m ? 'dlg' : '');
        (m ? document.body : n.thePop).appendChild(this.win);
        if(m){
          let s = this.win.style;
          s.left = s.right = s.top = s.bottom = '';
        }
        this.win.vRel = n;//m ? n : null;//m ? null : n;//n;
      }
    }
    this.app.toggle(this.win, on);
    //if(!on) this.win.tabindex = -1;
    if(!on) document.body.appendChild(this.win);
    //this.app.fire('after');
  }
  
  preparePick (n){
    n.vTime = (n.type == 'datetime-local' || n.classList.contains('datetime'));
    n.type = 'text';
    n.autocomplete = 'off';
    if(n.value) n.value = this.fmt(this.parse(n.value), 0, n.vTime);
    let pop = this.app.ins('div', '', {className:'pop l'}, n, -1); //''
    if(!this.opt.inPop) pop.style.verticalAlign = 'bottom';
    n.thePop = pop;
    if(this.opt.addIcons.length>0){
      let ic = this.app.ins('span', '', {className:'input-tools calendar-tools nobr'}, n, 1);//icons container
      for(let i in this.opt.addIcons){
        this.app.ins('', ' ', {}, ic);
        this.app.ins('a', this.app.i.apply(this.app, this.opt.addIcons[i].slice(0, 2)), {href: this.opt.addIcons[i][2], className: 'let'}, ic);
      }
    }
    if(this.opt.inPop) pop.appendChild(n);
  }
  
  openDialog (n, d, e){
    if(e) e.preventDefault();
    this.build(n, d || n.value);
    this.toggle(true, n);
    //let f = (this.app.q('.bg-w', this.win) || this.app.q('#1', this.win));
    //if(f) f.focus();
  }

  closeDialog (n, d){
    if(n){
      this.setValue(n, d);
      n.focus();
    }
    this.toggle(false);
  }
  
  n (v, l){
    return ('000'+v).substr(-(l || 2));
  }
  
  getLimit (n, a, t){
    return n[a] ? this.fmt(this.parse(n[a]), 0, t, 'y') : (a == 'max' ? '9999' : '0000');
  }
  
  errLimits (n){
    let min = this.getLimit(n, 'min', n.vTime);
    let max = this.getLimit(n, 'max', n.vTime);
    let v = this.fmt(this.parse(n.value), 0, n.vTime, 'y');
    return (min && v<min) || (max && v>max) ? min + ' .. ' + max : '';
  }
  
  validate (n, re){
    n.setCustomValidity((re || n.value=='') ? '' : this.errLimits(n));
    n.checkValidity();
    if(n.reportValidity) n.reportValidity();
  }
  
  update (n, x){
    let rows = this.win.vDays;
    this.app.clr(rows);
    let y = x.getFullYear();
    let m = x.getMonth();
    let d = x.getDate();
    let min = this.getLimit(n, 'min', 0);
    let max = this.getLimit(n, 'max', 0);
    //y,m,h,mi
    this.win.vNodeCur.textContent = this.n(m+1) + '.' + y;
    this.win.vHours.textContent = this.n(n.vTime ? x.getHours() : 0);
    this.win.vMinutes.textContent = this.n(n.vTime ? x.getMinutes() : 0);
    //days
    let days = (new Date(y, m+1, 0)).getDate();//days in month
    let skip = ((new Date(y, m, 1)).getDay() + 6) % 7;//skip weekdays
    let maxd = Math.ceil((skip + days) / 7) * 7 - skip;
    let c, vv, sel, today, off, wd;
    // let cd = this.fmt(new Date());
    // let xd = this.fmt(x);
    let row;
    for(let i=-skip+1; i<=maxd; i++){
      wd = ((skip+i-1)%7)+1;
      if(wd == 1) row = this.app.ins('div', '', {className:'row'}, rows);
      if(i<1 || i>days) c = this.app.ins('a', '', {className: 'pad c center'}, row);
      else{
        vv = this.fmt(x, i, 0, 'y');
        sel = (i == d);
        today = false;//(this.fmt(x, i) == cd);
        off = (min && vv<min) || (max && vv>max);
        c = this.app.ins('a', i, {className: 'pad c center ' + (sel ? 'bg-w ' : '') + (today ? 'bg-y ' : '') + (off ? 'text-n ' : 'hover ') + (wd>5 ? 'text-e ' : '')}, row);
        if(!off) c.href = '#' + i;
      }
    }
    //time
    this.win.vNodeTime.classList[n.vTime ? 'remove' : 'add'](this.app.opt.cHide);
  }
  
  build (n, x){
    const app = this.app
    if (typeof x === 'string') x = this.parse(x || n.dataset.def || '');
    this.win.vCur = x;
    
    if(!this.win.vDays){
      app.clr(this.win);
      //buttons
      let p1 = app.ins('p', '', {className: 'c'}, this.win);
      this.btn(this.opt.hashNow, app.i('ok', '&check;'), p1);
      this.btn('#prev-year', app.i('prev2', '&laquo;'), p1);
      this.btn('#prev-month', app.i('prev', '&lsaquo;'), p1);
      this.win.vNodeCur = app.ins('span', '', {className: 'pad'}, p1);
      this.btn('#next-month', app.i('next', '&rsaquo;'), p1);
      this.btn('#next-year', app.i('next2', '&raquo;'), p1);
      this.btn(this.opt.hCancel, app.i('close', '&#x2715;'), p1);
      app.ins('hr', '', {}, this.win);
      //dates
      this.win.vDays = app.ins('div', '', {}, this.win);
      //time
      let hm = app.ins('div', '', {}, this.win);
      this.win.vNodeTime = hm;
      app.ins('hr', '', {}, hm);
      let p2 = app.ins('p', '', {className: 'c'}, hm);
      this.btn('#prev-hour', app.i('prev', '&lsaquo;'), p2);
      this.win.vHours = app.ins('span', '', {className: 'pad'}, p2);
      this.btn('#next-hour', app.i('next', '&rsaquo;'), p2);
      app.ins('span', ':', {className: 'pad'}, p2);
      this.btn('#prev-min', app.i('prev', '&lsaquo;'), p2);
      this.win.vMinutes = app.ins('span', '', {className: 'pad'}, p2);
      this.btn('#next-min', app.i('next', '&rsaquo;'), p2);
    }
    this.update(n, x);
  }
  
  switchMonths (n, y, m, d){
    if(d>28){
      let days = (new Date(y, m+1, 0)).getDate();//days in month
      d = Math.min(d, days);
    }
    let h = parseInt(this.win.vHours.textContent, 10);
    let i = parseInt(this.win.vMinutes.textContent, 10);
    this.build(n, new Date(y, m, d, h, i));
  }
  
  setTime (n, dh, di){
    let step = dh || di;
    let max = dh ? 24 : 60;
    let m = this.win[dh ? 'vHours' : 'vMinutes'];
    let v = parseInt(m.textContent, 10);
    let x = v % Math.abs(step);
    v += x ? (step>0 ? step-x : -x) : max+step;
    m.textContent = this.n(v % max);
    this.setValue(n, this.fmt(this.parse(n.value)));
  }

  setValue (n, d){
    if(d !== null){
      n.value = (d===true) ? this.fmt(0, 0, n.vTime) : d;
      let h = this.win.vHours;
      let m = this.win.vMinutes;
      if(n.vTime && d!==true && d!=='' && h && m) n.value += ' ' + this.n(h.textContent) + ':' + this.n(m.textContent);
      this.validate(n, 0);
    }
  }
  
  parse (d){
    return Dt.parse(d) || (new Date());
  }
  
  fmt (x, i, t, f){
    if(!x) x = new Date();
    if(i) x = new Date(x.getFullYear(), x.getMonth(), i);
    return Dt.fmt(x, t, f || this.opt.dateFormat);
  }
  
  btn (h, s, p){
    return this.app.ins('a', s, {href: h, className: this.opt.cBtn}, p);
  }

}