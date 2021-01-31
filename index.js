;(function (win) {
  requirejs.onError = function (err) {
    console.log(err)
    console.log(`modules: ${err.requireModules}`)
  }

  requirejs.config({
    baseUrl: window.location.host.endsWith('.github.io')
      ? 'https://cdn.jsdelivr.net/gh/nomui/nomui@gh-pages/'
      : '/',
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
