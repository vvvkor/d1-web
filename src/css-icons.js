// copy iconset, replace to "module.exports = ", require, remove

const buildCssIcons = () => {
  
  //prepare module
  const replace = require('replace-in-file')
  const re = {
    files: './dist/iconset.js',
    from: /export default /g,
    to: 'module.exports = ',
  }
  replace.sync(re)
  
  // process
  
  const fs = require('fs')
  const icons = require('../dist/iconset.js')
  const src = './src/icons.css'
  const dst = './dist/d1-icons.css'

  // fs.writeFileSync(dst, '/* Hey there! */')

  const css = fs.readFileSync(src, 'utf8')
  fs.writeFileSync(dst, css)

  var stream = fs.createWriteStream(dst, {flags: 'a'})
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
    stream.end(null, null, _ => console.log('-- icons done --'));
  })

  // cleanup module
  fs.unlinkSync('./dist/iconset.js')
  
}

/*
const copyfiles = require('copyfiles')
copyfiles(['./src/js/iconset.js', './dist'], true, _ => {
  console.log('-- icons done --');
  buildCssIcons();
});
*/

const fs = require('fs')
fs.copyFileSync('./src/js/iconset.js', './dist/iconset.js');
buildCssIcons();
