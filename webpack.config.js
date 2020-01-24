const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

var pkg = require('./package.json');
var banner = pkg.name + ' v' + pkg.version;

module.exports = {
  entry:{
    'd1': './src/index.js',
    'd1-basic': './src/basic.js',
    'd1.min': './src/index.js',
    'd1-basic.min': './src/basic.js'
  },
  mode: 'production',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  optimization: {
    //mangleExports: false,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/i,
        //terserOptions: {mangle: false}
        //terserOptions: {output: {comments: false}}
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ]
}