define([], function () {
  return {
    title: '其他',
    file: 'other',
    demo: function () {
      let autoComplete = null
      let loading = null
      let timer = null
      return {
        component: 'AutoComplete',
        ref: (c) => {
          autoComplete = c
        },
        label: '其他',
        options: [
          { value: 'a' },
          { value: '我们的世界' },
          { value: 'aab' },
          { value: 'aac' },
          { value: 'aadd' },
          { value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
        ],
        placeholder: '请输入',
        onSearch(txt) {
          loading = new nomui.Loading({ container: autoComplete.input })
          timer && clearTimeout(timer)
          timer = setTimeout(() => {
            loading && loading.remove()
            if (txt) {
              autoComplete.update({
                options: [
                  { value: txt },
                  { value: txt.repeat(2) },
                  { value: txt.repeat(3) },
                  { value: txt.repeat(4) },
                  { value: txt.repeat(5) },
                ],
              })
            }
          }, 1000)
        },
      }
    },
  }
})
