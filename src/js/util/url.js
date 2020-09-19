/*! url - url build and arguments */

export default class Url {

  // build url from link node or string, with additional parameters
  static build(a, args) {this
    if (!a.tagName) {
      //a = this.ins('a', '', {href: a})
      const h = a
      a = document.createElement('a')
      a.href = h
    }
    let g = Url.get(a)
    Object.keys(args).forEach(k => g[encodeURIComponent(k)] = encodeURIComponent(args[k]))
    let q = Object.keys(g).map(k => k + '=' + g[k]).join('&')
    return a.host
      ? a.protocol + '//' + a.host + a.pathname+(q ? '?' + q : '') + a.hash
      : a.href.replace(/[\?#].*$/, '') + (q ? '?' + q : '') + a.hash //ie
  }

  // get url parameter(s) from link node or string
  static get(a, g) {
    if (!a || a.tagName!='A') return null
    let i, gets = {}
    let args = a.search ? a.search.replace(/^\?/, '').split('&') : []
    for (i=0; i<args.length; i++) {
      let v = args[i].split('=')
      gets[v[0]] = decodeURIComponent(v[1]).replace(/\+/, ' ')
    }
    return g ? gets[g] : gets
    //protocol, host (hostname, port), pathname, search, hash
  }

}