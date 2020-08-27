/*! example - plugin template */

import Plugin from './plugin.js';

export default class extends Plugin {

  constructor () {
    super('example')
    this.opt = {
    };
  }

  init () {
    //app.h('click', 'a.example', e => this.onClick(e));
  }

  /*
  onClick (e) {
    let n = e.target; // e.recv
  }
  */

}