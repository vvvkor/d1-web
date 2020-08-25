import Test from './js/test.js'
import Plug from './js/test-plugin.js'

let app = new Test('v1')
app.plug(Plug, 'Plug-1')
app.plug(Plug, 'Plug-2')
app.echo()

if (window) window.app = app
