import './js/polyfill.js'

import App from './js/app.js'
import Code from './js/plugins/code.js'
import Icons from './js/plugins/icons.js'
import Toggle from './js/plugins/toggle.js'
import Dialog from './js/plugins/dialog.js'
import Gallery from './js/plugins/gallery.js'
import Fetch from './js/plugins/fetch.js'
import Tablex from './js/plugins/tablex.js'
import Calendar from './js/plugins/calendar.js'
import Lookup from './js/plugins/lookup.js'
/*
import Edit from './js/plugins/edit.js'
import Valid from './js/plugins/valid.js'
import Tools from './js/plugins/tools.js'
import Form from './js/plugins/form.js'
import Keepform from './js/plugins/keepform.js'
import Items from './js/plugins/items.js'
import Filter from './js/plugins/filter.js'
import Fliptable from './js/plugins/fliptable.js'
import Swipe from './js/plugins/swipe.js'
import Scroll from './js/plugins/scroll.js'
import Theme from './js/plugins/theme.js'
*/
const app = new App()
//console.log('app', app)
/*
const plugins = [
  'code', // should be first
  'icons',
  'toggle', 'dialog', 'gallery',
  'fetch', 'tablex',
  // todo:
  'calendar', 'lookup', 'edit', 'valid',
  'tools', 'form', 'keepform', 'items', 'filter',
  'fliptable', 'swipe', 'scroll',
  'theme'
]
*/
app.plug(Code)
app.plug(Icons)
app.plug(Toggle)
app.plug(Dialog)
app.plug(Gallery)
app.plug(Fetch)
app.plug(Tablex)
app.plug(Calendar)
app.plug(Lookup)
/*
app.plug(Edit)
app.plug(Valid)
app.plug(Tools)
app.plug(Form)
app.plug(Keepform)
app.plug(Items)
app.plug(Filter)
app.plug(Fliptable)
app.plug(Swipe)
app.plug(Scroll)
app.plug(Theme)
*/
// let opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}}
app.b([document], 'DOMContentLoaded', e => app.init(/*opt*/))

// if (typeof module !== 'undefined') module.exports = app
if (window) window.d1 = app
