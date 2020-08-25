/*
export default function(name){
  this.name = name
  this.plugins = []
  this.plug = function(p, n = ''){
    this.plugins.push(new p(n))
  }
  this.echo = function () {
    console.log(this.name, this.plugins)
    this.plugins.forEach(p => p.echo())
  }
}
*/

export default class {
  
  constructor (name) {
    this.name = name
    this.plugins = []
  }
  
  plug (p, n = '') {
    this.plugins.push(new p(this, n))
  }
  
  echo () {
    this.log('MAIN', this.name, this.plugins)
    this.plugins.forEach(p => p.echo())
  }
  
  log () {
    console.log(...arguments)
    document.body.innerHTML += '<pre>' + Array.prototype.slice.call(arguments).join(', ') + '</pre>'
  }
  
}
