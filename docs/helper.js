define([], function () {
  return {
    DOC_URL_KEY: 'doc_url_key',
    GLOBAL_SEARCH_INTERVAL: 600,
    SANDBOX_LIMIT:
      'allow-pointer-lock allow-scripts allow-downloads allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-modals',
    debounce(callback, time) {
      let timer = null
      return function (e) {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
          callback.call(this, e)
          timer = null
        }, time)
      }
    },
    polling(callback, time) {
      return (function _polling() {
        const timer = setTimeout(() => {
          callback.call(this) ? clearTimeout(timer) : _polling(callback, time)
        }, time)
      })()
    },
    formatSearchText(match) {
      return `<font color="red">${match}</font>`
    },
  }
})
