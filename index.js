;(function (win) {
  requirejs.onError = function (err) {
    console.log(err)
    console.log(`modules: ${err.requireModules}`)
  }

  let baseUrl = '/'
  if (window.location.href === 'https://nomui.github.io/nomui/') {
    baseUrl = 'https://nomui.github.io/nomui/'
  }

  requirejs.config({
    baseUrl: baseUrl,
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
    const detectZoom = () => {
      let ratio = 0
      const screen = win.screen,
        ua = navigator.userAgent.toLowerCase()
      if (win.devicePixelRatio !== undefined) {
        ratio = win.devicePixelRatio
      } else if (ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI
        }
      } else if (win.outerWidth !== undefined && win.innerWidth !== undefined) {
        ratio = win.outerWidth / win.innerWidth
      }
      if (ratio) {
        ratio = Math.round(ratio * 100)
      }
      return ratio
    }
    const m = detectZoom()
    // 处理笔记本系统默认系统比例为150%带来的布局影响
    if (m > 100) {
      const isMac = /macintosh|mac os x/i.test(navigator.userAgent)
      if (!isMac) {
        document.body.style.zoom = 120 / Number(m)
      }
    }
  })
})(window)
