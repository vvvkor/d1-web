// copy iconset, replace to "module.exports = ", require, remove

//const buildCssIcons = (callback) => {
const fs = require('fs');

module.exports = {

build: (from, to, iconset, callback) => {
  const tmp = './dist/_iconset.tmp';
  console.log('iconset...');
  fs.copyFileSync(iconset, tmp);
  
  //prepare module
  const replace = require('replace-in-file')
  const re = {
    files: tmp,
    from: /export default /g,
    to: 'module.exports = ',
  }
  replace.sync(re)
  
  // process
  
  const icons = require('../' + tmp)

  // fs.writeFileSync(to, '/* Hey there! */')

  const css = fs.readFileSync(from, 'utf8')
  fs.writeFileSync(to, css)

  var stream = fs.createWriteStream(to, {flags: 'a'})
  stream.once('open', fd => {
    Object.keys(icons).forEach(name => {
      const size = icons[name][0]
      const path = icons[name][1]
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
      let svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 "
        + size + " " + size + "'><path fill='#00f' d='" + path + "'/></svg>"
      svg = svg
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E')
        .replace(/#/g, '%23')
      const bg = "background-image:url(\"data:image/svg+xml," + svg + "\");"
      stream.write(".icon-" + name + ":before{" + bg + "}\n");
    })
    stream.end(null, null, _ => {
      console.log('-- iconset done --');
      if (callback) callback();
    });
  })

  // cleanup module
  fs.unlinkSync(tmp)
  
}
}
/*
const copyfiles = require('copyfiles')
copyfiles(['./src/js/iconset.js', './dist'], true, _ => {
  console.log('-- icons done --');
  buildCssIcons();
});
*/

//buildCssIcons();
