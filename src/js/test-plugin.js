/*
export default function(name){
  this.name = name
  this.echo = function () {
    console.log('SUB', this.name)
  }
}
*/

export default class {
  
  constructor (app, name) {
    this.app = app
    this.name = name
  }
  
  echo () {
    this.app.log('PLUGIN', this.name)
  }
  
}