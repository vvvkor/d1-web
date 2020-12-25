module.exports = ctx => ({
  plugins: {
    'postcss-custom-properties': { preserve: false },
    'postcss-calc': {},
    'postcss-discard-comments': {},
    'perfectionist': { format: 'expanded'} //expanded | compact | compressed
}
})