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
    /*
      https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
      - use single quotes inside SVG (URL-safe)
      - wrap URI with double quotes: <img src="">, url("").
      - do not use ";utf-8" (no need for ASCII)
      - encode "<" as "%3C"
      - encode ">" as "%3E"
      - encode "#" as "%23"
      - (use "rgb()" for colors) - Firefox
    */
    let svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 " + size + " " + size + "'><path fill='#00f' d='" + path + "'></path></svg>";
    svg = svg.replace(/</g, '%3C').replace(/>/g, '%3E').replace(/#/g, '%23');
    stream.write(".icon-" + name + ":before{background-image:url(\"data:image/svg+xml," + svg + "\");}\n");
  });
  stream.end();
});
