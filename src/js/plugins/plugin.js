export default class {
  
  constructor(name) {
    this.app = null
    this.name = name || 'plugin'
    this.opt = {}
  }
  
  install(app, opt) {
    this.app = app
    if (opt) Object.keys(opt).forEach(k => this.opt[k] = opt[k])
    this.init()
    if (this.arrange) {
      this.app.listen('arrange', e => this.arrange(e));
      this.arrange({});
    }
  }
  
  init() {
    console.log('plugin.init()')
  }
  
}