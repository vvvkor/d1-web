import babel from "@rollup/plugin-babel";
import {terser} from 'rollup-plugin-terser';
import {name, version} from './package.json';

export default [
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
]