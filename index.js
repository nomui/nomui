;(function (win) {
  requirejs.onError = function (err) {
    console.log(err)
    console.log(`modules: ${err.requireModules}`)
  }

  requirejs.config({
    baseUrl: '/',
    map: {
      '*': {
        css: 'libs/require-css.min.js',
      },
    },
    paths: {
      text: 'libs/text',
    },
  })

  require([], function () {
    win.nomapp = new nomui.App({
      viewsDir: '/docs',
    })
    const renderer = new marked.Renderer()
    marked.setOptions({
      renderer: renderer,
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: false,
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      },
    })
  })
})(window)
