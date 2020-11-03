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
    this.init()
    if (this.arrange) {
      this.app.listen('arrange', e => this.arrange(e));
      this.arrange({});
    }
    this.app.fire('plugin', {name: this.name});
  }
  
  init() {
    console.log('plugin.init()')
  }
  
}