/*! func - function derorators */

export default class Func {

  static throttle (f, ms) {
    let p = false, c, a
    return function ff () {
      if (p) { //2
        c = this
        a = arguments
      }
      else {
        f.apply(this, arguments) //1
        p = true
        setTimeout(() => { //3
          p = false
          if (a) {
            ff.apply(c, a)
            a = c = null
          }
        }, ms)
      }
    }
  }

  static delay (f, ms, skip) {
    let p = null
    return function () {
      if (skip && p) clearTimeout(p)
      p = setTimeout(() => {
        f.apply(this, arguments)
        p = null
      }, ms)
    }
  }
  
  static debounce (f, ms) {
    return Func.delay(f, ms, true)
  }

}