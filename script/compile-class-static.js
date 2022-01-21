const babel = require('@babel/core')

function compileClassStaticProps() {
  return {
    name: 'compile-class-static-props', // this name will show up in warnings and errors
    renderChunk(code) {
      return babel.transformSync(code, {
        minified: false,
        comments: true,
        compact: true,
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'babel-plugin-object-entries-and-values-to-object-keys',
          ['@babel/plugin-proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
        ],
      })
    },
  }
}
module.exports = compileClassStaticProps
