/*! url - url build and arguments */

export default class Url {

  // build url from link node or string, with additional parameters
  static build(a, args) {
    a = Url.url2a(a)
    const g = Url.get(a)
    Object.keys(args).forEach(k => g[encodeURIComponent(k)] = encodeURIComponent(args[k]))
    const q = Object.keys(g).map(k => k + '=' + g[k]).join('&')
    return a.host
      ? a.protocol + '//' + a.host + a.pathname+(q ? '?' + q : '') + a.hash
      : a.href.replace(/[\?#].*$/, '') + (q ? '?' + q : '') + a.hash //ie
  }

  // get url parameter(s) from link node or string
  static get(a, g) {
    if (a === true) a = location.href
    if (!a) return null
    a = Url.url2a(a)
    let i, gets = {}
    const args = a.search ? a.search.replace(/^\?/, '').split('&') : []
    for (i=0; i<args.length; i++) {
      const v = args[i].split('=')
      gets[v[0]] = decodeURIComponent(v[1]).replace(/\+/, ' ')
    }
    return g ? gets[g] : gets
    //protocol, host (hostname, port), pathname, search, hash
  }
  
  static url2a(a) {
    if (a && !a.tagName) {
      const h = a
      a = document.createElement('a')
      a.href = h
    }
    return a
  }

}