let app = require('./js/app.js');

[
  'code', 'icons',
  'toggle', 'dialog', 'gallery', 'tablex', 'scroll',
  'calendar', 'lookup', 'edit', 'valid',
  'tools', 'form', 'items', 'fliptable', 'fetch', 'theme'
]
.forEach(p => app.plug(require('./js/'+p+'.js')));

//let opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}};
app.b([document], 'DOMContentLoaded', e => app.init(/*opt*/));

if (typeof module !== 'undefined') module.exports = app;
if (window) window.d1 = app;
