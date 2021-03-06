import './js/polyfill.js'

import App from './js/app.js'
import Func from './js/util/func.js'
import Dt from './js/util/dt.js'
import Url from './js/util/url.js'

import Icons from './js/plugins/icons.js'
import Code from './js/plugins/code.js'
import Toggle from './js/plugins/toggle.js'
import Form from './js/plugins/form.js'
import Calendar from './js/plugins/calendar.js'
import Lookup from './js/plugins/lookup.js'
import Edit from './js/plugins/edit.js'
import Pickfile from './js/plugins/pickfile.js'
import Tools from './js/plugins/tools.js'
import Store from './js/plugins/store.js'
import Tablex from './js/plugins/tablex.js'
import Dialog from './js/plugins/dialog.js'
import Gallery from './js/plugins/gallery.js'
import Fetch from './js/plugins/fetch.js'
import Valid from './js/plugins/valid.js'
import Items from './js/plugins/items.js'
import Filter from './js/plugins/filter.js'
import Fliptable from './js/plugins/fliptable.js'
import Swipe from './js/plugins/swipe.js'
import Scroll from './js/plugins/scroll.js'
import Theme from './js/plugins/theme.js'

const app = new App()

app.plug(Icons)
app.plug(Code)
app.plug(Toggle)
app.plug(Form)
app.plug(Calendar)
app.plug(Lookup)
app.plug(Edit)
app.plug(Tools)
app.plug(Pickfile)
app.plug(Store)
app.plug(Tablex)
app.plug(Dialog)
app.plug(Gallery)
app.plug(Fetch)
app.plug(Valid)
app.plug(Items)
app.plug(Filter)
app.plug(Fliptable)
app.plug(Swipe)
app.plug(Scroll)
app.plug(Theme)

app.Func = Func
app.Dt = Dt
app.Url = Url
// const opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}}
app.b([document], 'DOMContentLoaded', e => app.init(/*opt*/))

// if (typeof module !== 'undefined') module.exports = app
if (window) window.d1 = app