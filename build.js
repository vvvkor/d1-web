const chalk = require('chalk');
const fs = require('fs')
const cpy = require('cpy');
const path = require('path');
//const copyfiles = require('copyfiles');
const postcss = require('postcss');
const customProperties = require('postcss-custom-properties');
const calc = require('postcss-calc');
const discardComments = require('postcss-discard-comments');
const perfectionist = require('perfectionist');
const cssnano = require('cssnano');
const cssIcons = require('./src/css-icons.js');
const replace = require('replace-in-file');
const rollup = require('rollup');
const {name, version} = require('./package.json'); 
const {babel} = require('@rollup/plugin-babel');
const {terser} = require('rollup-plugin-terser');
/*
const replace = require('replace-in-file');
const {name, version} = require('./package.json');
const csso = require('csso');
const UglifyJS = require("uglify-js");
*/

(async () => {

const cleanup = function(dir, callback) {
  fs.readdirSync(dir).forEach(n => {
      try {
        console.log('Remove ' + n);
        fs.unlinkSync(path.join(dir, n))
      } catch (error) {
        console.error(error);
      }
  });
}

const copy = function (from, to/*, callback*/) {
  console.log('copy to ' + to);
  fs.copyFileSync(from, to);
  /*
  fs.copyFile(from, to, err => {
    if (err) console.error(err);
    if (callback) callback();
  });
  */
}

const processCss = function (callback, from, to, preserve, minify) {
  console.log('postcss to ' + to);
  fs.readFile(from, (err, css) => {
    postcss([
      customProperties({preserve}),
      calc,
      discardComments,
      perfectionist({format: 'expanded'}) //expanded | compact | compressed
    ])
    .process(css, { from, to})
    .then(result => {
      fs.writeFile(to, result.css, () => true)
      if ( result.map ) fs.writeFile(to + '.map', result.map.toString(), () => true)
      
      if (minify) {
        to = to.replace('.css', '.min.css');
        console.log('cssnano to ' + to);
        postcss([cssnano])
        .process(result.css, {from, to})
        .then(min => {
          fs.writeFile(to, min.css, () => true);
          if (callback) callback();
        });
      }
      else if (callback) callback();
    })
  })
}

const promiseCss = (...args) => new Promise(resolve => { processCss(resolve, ...args) });

// prepare dir
cleanup('./dist');
console.log(chalk.cyan('-- dist cleared --'));

// css
copy('./src/index.css', './dist/d1.raw.css');
console.log(chalk.cyan('-- raw css ready --'));
await promiseCss('./src/index.css', './dist/d1.css', true, true);
console.log(chalk.cyan('-- d1 css ready --'));
await cssIcons.promiseBuild('./src/icons.css', './dist/d1-icons.css', './src/js/iconset.js');
await promiseCss('./dist/d1-icons.css', './dist/d1-icons.css', true, true);
console.log(chalk.cyan('-- css iconset ready  --'));

// css lite
copy('./src/index.css', './dist/d1-lite.css');
try {
  const results = replace.sync({
    files: './dist/d1-lite.css',
    from: /\/\*\(\s*(\S*)[\s\S]*?\/\*\)\*\//g,
    to: '/* SKIP $1 */'
  });
  console.log('Replace lite css', results.length);
}
catch (error) {
  console.error('Replace error', error);
}
await promiseCss('./dist/d1-lite.css', './dist/d1-lite.css', false, true);
console.log(chalk.cyan('-- lite css ready  --'));

// js

const rollupOptions = [
  {
    input: "src/index.js",
    output: [
      {
        banner: '/*! ' + name + ' v' + version + ' */',
        file: "dist/d1.js",
        format: "iife" // iife | es | cjs
      },
      {
        banner: '/*! ' + name + ' v' + version + ' */',
        file: "dist/d1.min.js",
        format: "iife",
        plugins: [ terser() ]
      }
    ],
    plugins: [ babel({ babelHelpers: 'bundled' }) ]
  },
  {
    input: "src/basic.js",
    output: [
      {
        banner: '/*! ' + name + '/basic v' + version + ' */',
        file: "dist/d1-basic.js",
        format: "iife"
      },
      {
        banner: '/*! ' + name + '/basic v' + version + ' */',
        file: "dist/d1-basic.min.js",
        format: "iife",
        plugins: [ terser() ]
      }
    ],
    plugins: [ babel({ babelHelpers: 'bundled' }) ]
  },
  {
    input: "src/classic.js",
    output: [
      {
        banner: '/*! ' + name + '/classic v' + version + ' */',
        file: "dist/d1-classic.js",
        format: "iife"
      },
      {
        banner: '/*! ' + name + '/classic v' + version + ' */',
        file: "dist/d1-classic.min.js",
        format: "iife",
        plugins: [ terser() ]
      }
    ],
    plugins: [ babel({ babelHelpers: 'bundled' }) ]
  }
];

async function buildJs() {
  await Promise.all(rollupOptions.map(async ({input, output, plugins}) => {
    console.log('rollup', input);
    const bundle = await rollup.rollup({input, plugins});
    //console.log(bundle.watchFiles); // an array of file names this bundle depends on
    // const { output } = await bundle.generate(outputOptions); // to mem
    //await bundle.write(outputOptions); // to disk
    await Promise.all(output.map(opt => bundle.write(opt)));
    const p = await bundle.close();
    console.log('rollup done', input);
    return p;
  }));
}
console.log('rollup...');
await buildJs();
console.log(chalk.cyan('-- d1 js ready --'));

// docs

// copyfiles ./src/*.html ./dist/d1.min.css ./dist/d1.min.js ./dist/d1-icons.min.css ./docs -f
(async () => {
    await cpy(['./src/*.html', './dist/d1.min.css', './dist/d1.min.js', './dist/d1-icons.min.css'], './docs');
    console.log(chalk.cyan('-- docs copied --')); //fix: css may not be ready
    //replace
    let results = replace.sync({
      files: './docs/*.*',
      from: /REMOVE-/g,
      to: ''
    });
    console.log('Replace asset source', results.length);
    results = replace.sync({
      files: './docs/*.*',
      from: /0\.0\.0/g,
      to: version
    });
    console.log('Replace docs version', results.length);
    results = replace.sync({
      files: './dist/*.*',
      from: /0\.0\.0/g,
      to: version
    });
    console.log('Replace dist version', results.length);
})();

})();
