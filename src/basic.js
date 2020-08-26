import './js/polyfill.js'

import App from './js/app.js'
import Toggle from './js/plugins/toggle.js'
import Dialog from './js/plugins/dialog.js'
import Gallery from './js/plugins/gallery.js'
const app = new App()
app.plug(Toggle)
app.plug(Dialog)
app.plug(Gallery)


// let opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}}
app.b([document], 'DOMContentLoaded', e => app.init(/*opt*/))

// if (typeof module !== 'undefined') module.exports = app
if (window) window.d1 = app