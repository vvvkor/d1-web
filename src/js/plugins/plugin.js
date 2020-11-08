export default class {
  
  constructor(name) {
    this.app = null
    this.name = name || 'plugin'
    this.opt = {}
  }
  
  install(app) {
    if (!app.opt.plug[this.name]) app.opt.plug[this.name] = {};
    const opt = app.opt.plug[this.name];
    Object.keys(this.opt).forEach(k => (k in opt) ? null : opt[k] = this.opt[k])
    this.opt = opt;
    //
    this.app = app
    this.app.listen('init', e => this.init());
    if (this.arrange) this.app.listen('arrange', e => this.arrange(e));
  }
  
  init() {
    console.log('plugin.init()')
  }
  
}