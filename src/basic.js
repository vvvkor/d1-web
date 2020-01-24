let app = require('./js/app.js');

//['toggle', 'dialog', 'gallery']
//  .forEach(p => app.plug(require('./js/'+p+'.js')));

app.plug(require('./js/toggle.js'))
app.plug(require('./js/dialog.js'))
app.plug(require('./js/gallery.js'))

//let opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}};
app.b([document], 'DOMContentLoaded', e => app.init(/*opt*/));

if (typeof module !== 'undefined') module.exports = app;
if (window) window.d1 = app;