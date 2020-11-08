import './js/polyfill.js'

import App from './js/app.js'
// import Code from './js/plugins/code.js'
import Icons from './js/plugins/icons.js'
import Toggle from './js/plugins/toggle.js'
import Calendar from './js/plugins/calendar.js'
import Lookup from './js/plugins/lookup.js'
import Edit from './js/plugins/edit.js'
import Form from './js/plugins/form.js'
import Dialog from './js/plugins/dialog.js'
import Gallery from './js/plugins/gallery.js'
import Fetch from './js/plugins/fetch.js'
import Valid from './js/plugins/valid.js'

const app = new App()

// app.plug(Code)
app.plug(Icons)
app.plug(Toggle)
app.plug(Calendar)
app.plug(Lookup)
app.plug(Edit)
app.plug(Form)
app.plug(Dialog)
app.plug(Gallery)
app.plug(Fetch)
app.plug(Valid)

// const opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}}
app.b([document], 'DOMContentLoaded', e => app.init(/*opt*/))

// if (typeof module !== 'undefined') module.exports = app
if (window) window.d1 = app