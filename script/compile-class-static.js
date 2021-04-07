const { Parser } = require('acorn')
const staticClassFeatures = require('acorn-static-class-features')

const myParse = Parser.extend(staticClassFeatures)

// const testCode = myParse.parse('class X { static x = 0 }')
// console.log(testCode)

function compileClassStaticProps() {
  return {
    name: 'compile-class-static-props', // this name will show up in warnings and errors
    renderChunk(code) {
      // return myParse.parse(code, {
      //   plugins: {
      //     jsx: false, // true to enable JSX plugin
      //     staticClassPropertyInitializer: true, // true to enable staticClassPropertyInitializer plugin
      //   },
      // })
      return myParse.parse(code)
    },
  }
}
module.exports = compileClassStaticProps
