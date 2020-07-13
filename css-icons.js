const fs = require('fs');
const icons = require('./src/js/iconset.js')
const src = './src/icons.css';
const dst = './dist/d1-icons.css';

// fs.writeFileSync(dst, '/* Hey there! */');

const css = fs.readFileSync(src, 'utf8');
fs.writeFileSync(dst, css);

var stream = fs.createWriteStream(dst, {flags: 'a'});
stream.once('open', function(fd) {
  Object.keys(icons).forEach(name => {
    const size = icons[name][0];
    const path = icons[name][1];
    /* svg+xml;utf-8, */
    stream.write(".icon-" + name + ":before{background-image:url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 " + size + " " + size + "'><path d='" + path + "'></path></svg>\");}\n");
  });
  stream.end();
});
