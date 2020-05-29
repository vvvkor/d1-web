require('./js/polyfill.js');

let app = require('./js/app.js');

[
  'toggle', 'dialog', 'gallery',
  'fetch', 'icons', 'tablex', 'code',
  'calendar', 'lookup', 'edit', 'valid',
  'tools', 'form', 'keepform', 'items', 'filter',
  'fliptable', 'swipe', 'scroll',
  'theme'
]
.forEach(p => app.plug(require('./js/'+p+'.js')));

//let opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}};
app.b([document], 'DOMContentLoaded', e => app.init(/*opt*/));

if (typeof module !== 'undefined') module.exports = app;
if (window) window.d1 = app;
