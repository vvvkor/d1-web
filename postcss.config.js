module.exports = ctx => ({
//module.exports = {
  //map: ctx.options.map,
  //parser: ctx.file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    //'postcss-import': { root: ctx.file.dirname },
    //cssnano: ctx.env === 'production' ? {} : false,
    
    //'autoprefixer': {},
    //'postcss-preset-env': {},
    'postcss-custom-properties': { preserve: true },
    'postcss-calc': {},
    'postcss-discard-comments': {},
    'perfectionist': { format: 'expanded'} //expanded | compact | compressed
}
//}
})