/*! calendar - replacement of standard date and datetime-local inputs */

let app = require('./app.js');
let toggle = require('./toggle.js');

module.exports = new(function () {

  "use strict";

  this.name = 'calendar';

  this.opt = {
    cBtn: 'pad hover',
    dateFormat: 'd', //y=Y-m-d, d=d.m.Y, m=m/d Y
    hashCancel: '#cancel',
    hashNow: '#now',
    addIcons: [['date', '#'], ['ok', '&check;'], ['delete', '&#x2715;']],
    idPicker: 'pick-date',
    minWidth: 801,
    qsCalendar: 'input.calendar',
    showModal: 0,
    sizeLimit: 801,
    stepMinutes: 1,
    inPop: 0
  };

  this.win = null;

  this.init = function(opt) {
    let i;
    for(i in opt) this.opt[i] = opt[i];

    if(window.innerWidth < this.opt.minWidth) return;
    this.win = app.ins('div', '', {id: this.opt.idPicker, className: app.opt.cToggle + ' ' + app.opt.cOff + ' pad'});//dlg hide pad
    this.win.style.whiteSpace = 'nowrap';
    //this.toggle(false);
    document.body.appendChild(this.win);
    
    let t = app.qq(this.opt.qsCalendar);
    for (let i = 0; i < t.length; i++){
      this.preparePick(t[i]);
      app.b(t[i], 'click', e => this.openDialog(t[i], null, e), false);
      app.b(t[i], 'input', e => this.validate(t[i], 0), false);
    }
  }
  
  this.toggle = function(on, n){
    if(n){
      let m = app.attr(n, 'data-modal');
      if(m!==null) m = parseInt(m, 10);
      else m = this.opt.showModal || (Math.min(window.innerWidth, window.innerHeight) < this.opt.sizeLimit);
      if(on){
        this.win.className = app.opt.cToggle + ' ' + app.opt.cOff + ' pad ' + (m ? 'dlg' : '');
        (m ? document.body : n.thePop).appendChild(this.win);
        if(m){
          let s = this.win.style;
          s.left = s.right = s.top = s.bottom = '';
        }
        this.win.vRel = m ? null : n;
      }
    }
    toggle.toggle(this.win, on);
    app.fire('after');
  }
  
  this.preparePick = function(n){
    n.vTime = (n.type == 'datetime-local' || n.classList.contains('datetime'));
    n.type = 'text';
    n.autocomplete = 'off';
    if(n.value) n.value = this.fmt(this.parse(n.value), 0, n.vTime);
    let pop = app.ins('div', '', {className:'pop l'}, n, -1); //''
    if(!this.opt.inPop) pop.style.verticalAlign = 'bottom';
    n.thePop = pop;
    if(this.opt.addIcons.length>0){
      let ico = [];
      let ic = app.ins('span', '', {className:'input-tools nobr'}, n, 1);//icons container
      for(let i in this.opt.addIcons){
        app.ins('', ' ', {}, ic);
        let ii = app.ins('a', app.i(...this.opt.addIcons[i]), {href: '#'+this.opt.addIcons[i][0], className: 'let'}, ic);
        ico.push(ii);
      }
      if(ico[0]) app.b(ico[0], 'click', e => this.openDialog(n, null, e), false);
      if(ico[1]) app.b(ico[1], 'click', e => this.closeDialog(n, true, null, null, e), false);
      if(ico[2]) app.b(ico[2], 'click', e => this.closeDialog(n, '', null, null, e), false);
    }
    if(this.opt.inPop) pop.appendChild(n);
  }
  
  this.switchMonth = function(n, y, m, d, ch, ci, e){
    e.preventDefault();
    if(d>28){
      let days = (new Date(y, m+1, 0)).getDate();//days in month
      d = Math.min(d, days);
    }
    let h = ch ? parseInt(ch.textContent, 10) : 0;
    let i = ci ? parseInt(ci.textContent, 10) : 0;
    this.openDialog(n, new Date(y, m, d, h, i), e);
  }
  
  this.openDialog = function(n, d, e){
    e.stopPropagation();
    this.build(n, d || n.value);
    this.toggle(true, n);
  }

  this.closeDialog = function(n, d, h, m, e){
    e.preventDefault();
    e.stopPropagation();
    if(n){
      this.setValue(n, d, h, m);
      n.focus();
    }
    this.toggle(false);
  }
  
  this.setValue = function(n, d, h, m){
    if(d !== null){
      n.value = (d===true) ? this.fmt(0, 0, n.vTime) : d;
      if(!(d===true && n.vTime) && h && m) n.value += ' ' + this.n(h.textContent) + ':' + this.n(m.textContent);
      this.validate(n, 0);
    }
  }
  
  this.n = function(v, l){
    return ('000'+v).substr(-(l || 2));
  }
  
  this.getLimit = function(n, a, t){
    let r = app.attr(n, a);
    return r ? this.fmt(this.parse(r), 0, t, 'y') : (a == 'max' ? '9999' : '0000');
  }
  
  this.errLimits = function(n){
    let min = this.getLimit(n, 'min', n.vTime);
    let max = this.getLimit(n, 'max', n.vTime);
    let v = this.fmt(this.parse(n.value), 0, n.vTime, 'y');
    return (min && v<min) || (max && v>max) ? min + ' .. ' + max : '';
  }
  
  this.validate = function(n, re){
    n.setCustomValidity((re || n.value=='') ? '' : this.errLimits(n));
    n.checkValidity();
    n.reportValidity();
  }
  
  this.build = function(n, x){
    app.clr(this.win);
    if (typeof x === 'string') x = this.parse(x || app.attr(n, 'data-def'));
    let min = this.getLimit(n, 'min', 0);
    let max = this.getLimit(n, 'max', 0);
    //time
    let ch = null;
    let ci = null;
    let p2 = null;
    if(n.vTime){
        p2 = app.ins('p', '', {className: 'c'});
        let ph = this.btn('#prev-hour', app.i('prev', '&lsaquo;'), p2);
        ch = app.ins('span', this.n(x.getHours()), {className: 'pad'}, p2);
        let nh = this.btn('#next-hour', app.i('next', '&rsaquo;'), p2);
        app.ins('span', ':', {className: 'pad'}, p2);
        let pi = this.btn('#prev-min', app.i('prev', '&lsaquo;'), p2);
        ci = app.ins('span', this.n(x.getMinutes()), {className: 'pad'}, p2);
        let ni = this.btn('#next-min', app.i('next', '&rsaquo;'), p2);
        app.b(ph, 'click', e => this.setTime(n, ch, ci, -1, 'h', e), false);
        app.b(nh, 'click', e => this.setTime(n, ch, ci, +1, 'h', e), false);
        app.b(pi, 'click', e => this.setTime(n, ch, ci, -this.opt.stepMinutes, 'i', e), false);
        app.b(ni, 'click', e => this.setTime(n, ch, ci, +this.opt.stepMinutes, 'i', e), false);
    }
   //buttons
    let y = x.getFullYear();
    let m = x.getMonth();
    let d = x.getDate();
    let my = this.n(m+1) + '.' + y;
    let p1 = app.ins('p', '', {className: 'c'}, this.win);
    let now = this.btn(this.opt.hashNow, app.i('ok', '&check;'), p1);
    let py = this.btn('#prev-year', app.i('prev2', '&laquo;'), p1);
    let pm = this.btn('#prev-month', app.i('prev', '&lsaquo;'), p1);
    let cur = app.ins('span', my, {className: 'pad'}, p1);
    let nm = this.btn('#next-month', app.i('next', '&rsaquo;'), p1);
    let ny = this.btn('#next-year', app.i('next2', '&raquo;'), p1);
    let cls = this.btn(this.opt.hashCancel, app.i('close', '&#x2715;'), p1);
    app.ins('hr', '', {}, this.win);
    app.b(now, 'click', e => this.closeDialog(n, true, ch, ci, e), false);
    app.b(cls, 'click', e => this.closeDialog(n, null, null, null, e), false);
    app.b(py, 'click', e => this.switchMonth(n, y-1, m, d, ch, ci, e), false);
    app.b(ny, 'click', e => this.switchMonth(n, y+1, m, d, ch, ci, e), false);
    app.b(pm, 'click', e => this.switchMonth(n, y, m-1, d, ch, ci, e), false);
    app.b(nm, 'click', e => this.switchMonth(n, y, m+1, d, ch, ci, e), false);
    //dates
    let days = (new Date(y, m+1, 0)).getDate();//days in month
    let skip = ((new Date(y, m, 1)).getDay() + 6) % 7;//skip weekdays
    let maxd = Math.ceil((skip + days) / 7) * 7 - skip;
    let c, vv, sel, today, off, wd;
    let cd = this.fmt(new Date());
    let xd = this.fmt(x);
    let row;
    for(let i=-skip+1; i<=maxd; i++){
      wd = ((skip+i-1)%7)+1;
      if(wd == 1) row = app.ins('div', '', {className:'row'}, this.win);
      if(i<1 || i>days) c = app.ins('a', '', {className: 'pad c center'}, row);
      else{
        let v = this.fmt(x, i);
        vv = this.fmt(x, i, 0, 'y');
        sel = (v == xd);
        today = false;//(v == cd);
        off = (min && vv<min) || (max && vv>max);
        c = app.ins('a', i, {className: 'pad c center ' + (sel ? 'bg-w ' : '') + (today ? 'bg-y ' : '') + (off ? 'text-n ' : 'hover ') + (wd>5 ? 'text-e ' : '')}, row);
        if(!off){
          c.href = '#' + i;
          app.b(c, 'click', e => this.closeDialog(n, v, ch, ci, e), false);
        }
      }
    }
    if(n.vTime){
      app.ins('hr', '', {}, this.win);
      this.win.appendChild(p2);
    }
  }
  
  this.setTime = function(n, ch, ci, step, item, e){
    let max = (item == 'h') ? 24 : 60;
    let m = (item == 'h') ? ch : ci;
    e.preventDefault();
    let v = parseInt(m.textContent, 10);
    let x = v % Math.abs(step);
    v += x ? (step>0 ? step-x : -x) : max+step;
    m.textContent = this.n(v % max);
    this.setValue(n, this.fmt(this.parse(n.value)), ch, ci);
  }

  this.parse = function(d){
    if(!d) d = '';
    let mode = d.indexOf('/')!=-1 ? 'm' : (d.indexOf('.')!=-1 ? 'd' : 'y');
    let seq = (mode=='m') ? [2, 0, 1] : (mode=='d' ? [2, 1, 0] : [0, 1, 2]);
    d = d.split(/\D/);
    while(d.length<6) d.push(d.length==2 ? 1 : 0);
    d = new Date(parseInt(d[seq[0]], 10), parseInt(d[seq[1]]-1, 10), parseInt(d[seq[2]], 10), parseInt(d[3], 10), parseInt(d[4], 10), parseInt(d[5], 10));
    if(!d.getFullYear()) d = new Date();
    return d;
  }
  
  this.fmt = function(x, i, t, f){
    if(!x) x = new Date();
    if(i) x = new Date(x.getFullYear(), x.getMonth(), i);
    let d = this.n(x.getDate());
    let m = this.n(x.getMonth()+1);
    let y = x.getFullYear();
    if(!f) f = this.opt.dateFormat;
    return (f=='m' ? m + '/' + d + ' ' + y : (f=='d' ? d + '.' + m + '.' + y : y + '-' + m + '-' + d))
      + (t ? ' '+this.n(x.getHours())+':'+this.n(x.getMinutes()) : '');
  }
  
  this.btn = function(h, s, p){
    return app.ins('a', s, {href: h, className: this.opt.cBtn}, p);
  }

})();