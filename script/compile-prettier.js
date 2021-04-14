const prettier = require('prettier/standalone')
const parserBabel = require('prettier/parser-babel')

function compileClassStaticProps() {
  return {
    name: 'compile-prettier', // this name will show up in warnings and errors
    renderChunk(code) {
      return prettier.format(code, {
        parser: 'babel',
        plugins: [parserBabel],
      })
    },
  }
}
module.exports = compileClassStaticProps
