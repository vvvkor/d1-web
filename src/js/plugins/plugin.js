export default class {
  
  constructor (name) {
    this.app = null
    this.name = name || 'plugin'
    this.opt = {}
  }
  
  init () {
    console.log('plugin.init()')
  }
  
}