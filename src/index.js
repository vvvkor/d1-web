import './js/polyfill.js'

import App from './js/app.js'
import Code from './js/plugins/code.js'
import Icons from './js/plugins/icons.js'
import Toggle from './js/plugins/toggle.js'
const app = new App()
//console.log('app', app)
/*
const plugins = [
  'code', // should be first
  'icons',
  'toggle', 'dialog', 'gallery',
  'fetch', 'tablex',
  'calendar', 'lookup', 'edit', 'valid',
  'tools', 'form', 'keepform', 'items', 'filter',
  'fliptable', 'swipe', 'scroll',
  'theme'
]
*/
app.plug(Code)
app.plug(Icons)
app.plug(Toggle)

//let opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}}
app.b([document], 'DOMContentLoaded', e => app.init(/*opt*/))

// if (typeof module !== 'undefined') module.exports = app
if (window) window.d1 = app
