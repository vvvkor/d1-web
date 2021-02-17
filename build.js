const fs = require('fs')
const path = require('path');
var copyfiles = require('copyfiles');
const postcss = require('postcss');
/*
const replace = require('replace-in-file');
const {name, version} = require('./package.json');
const csso = require('csso');
const UglifyJS = require("uglify-js");
*/

// cleanup dist
const dist = 'dist'
fs.readdir(dist, (err, files) => {
  if (err) throw err;
  files.forEach(n => {
    try {
      fs.unlinkSync(path.join(dist, n))
      console.error('Remove ' + n);
    } catch (error) {
      console.error(error);
    }
  });
});

copyfiles(['./src/index.css', './dist'], true, _ => console.log('copied'));
fs.rename('dist/index.css', 'dist/d1.raw.css', err => console.log(err  || 'Renamed d1.raw.css.'));
fs.readFile('src/index.css', (err, css) => {
  postcss([/*precss, autoprefixer*/])
    .process(css, { from: 'src/index.css', to: 'dist/d1.css' })
    .then(result => {
      fs.writeFile('dist/d1.css', result.css, () => true)
      // if ( result.map ) fs.writeFile('dest/app.css.map', result.map.toString(), () => true)
    })
})
/*
    + "copy:css": "copyfiles ./src/index.css ./dist -f",
    + "rename:css": "node -e \"require('fs').rename('dist/index.css', 'dist/d1.raw.css', err => console.log(err  || 'Renamed d1.raw.css.'))\"",
    "build:css": "postcss src/index.css -o dist/d1.css",
      "copy:css-lite": "copyfiles ./src/index.css ./dist -f",
      "rename:css-lite": "node -e \"require('fs').rename('dist/index.css', 'dist/d1-lite.css', err => console.log(err  || 'Renamed d1-lite.css.'))\"",
      "replace:css-lite": "cross-var replace-in-file \"/\\/\\*\\(\\s*(\\S*)[\\s\\S]*?\\/\\*\\)\\*\\//g\" \"/* SKIP $1 * /\" \"dist/d1-lite.css\" --isRegex",
      "build:css-lite": "postcss dist/d1-lite.css -o dist/d1-lite.css --config src/css",
      "minify:css-lite": "postcss dist/d1-lite.css -u cssnano -o dist/d1-lite.min.css --no-map",
      "lite": "npm run copy:css-lite && npm run rename:css-lite && npm run replace:css-lite && npm run build:css-lite && npm run minify:css-lite",
    "build:css-icons": "node ./src/css-icons.js",
    "build:css-icons-post": "postcss dist/d1-icons.css -o dist/d1-icons.css",
    "minify:css-icons": "postcss dist/d1-icons.css -u cssnano -o dist/d1-icons.min.css --no-map",
    "minify:css": "postcss dist/d1.css -u cssnano -o dist/d1.min.css --no-map",
    "rollup": "rollup -c",
    "build:docs": "copyfiles ./src/*.html ./dist/d1.min.css ./dist/d1.min.js ./dist/d1-icons.min.css ./docs -f",
    "build:docs.cmt": "cross-var replace-in-file \"/REMOVE-/g\" \"\" \"docs/*.*\" --isRegex",
    "build:docs.version": "cross-var replace-in-file \"/0\\.0\\.0/g\" \"$npm_package_version\" \"docs/*.*\" --isRegex",
    "build:version": "cross-var replace-in-file \"/0\\.0\\.0/g\" \"$npm_package_version\" \"dist/*.*\" --isRegex",
*/

/*

// replace version

const replace_options = {
  files: [
    './*.css',
    './*.js',
    './*.html'
  ],
  from: /v\d+\.\d+\.\d+/g,
  to: 'v' + version,
};

try {
  const results = replace.sync(replace_options);
  console.log('Replacement (' + name +  ' v' + version + '):', results);
}
catch (error) {
  console.error('Error occurred:', error);
}

// minify css

['granum', 'granum-icons', 'granum-dropdown']
.forEach(n => {
  console.log('Minify ' + n + '.css...');
  const css = fs.readFileSync('./' + n + '.css', 'utf8');
  let min = csso.minify(css, {
    restructure: false,
  }).css;
  //min = '/*! ' + n + '.css v' + version + ' *' + '/\n' + min;
  fs.writeFileSync('./' + n + '.min.css', min);
});

// minify js

['granum', 'granum-edit']
.forEach(n => {
  console.log('Minify ' + n + '.js...');
  const js = fs.readFileSync('./' + n + '.js', 'utf8');
  var res = UglifyJS.minify(js, {
    compress: {
      // arrows: false,
      // comparisons: false,
      // sequences: false,
      // conditionals: false,
      // reduce_vars: false
    },
    output: {
      //preamble: '/*! ' + n + '.js v' + version + ' *' + '/',
      comments: /^!/,
    }
  });
  fs.writeFileSync('./' + n + '.min.js', res.code);
  if (res.error) console.error('UglifyJS failed [' + n + '.js]: ' + res.error);
});

*/