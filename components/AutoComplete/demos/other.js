define([], function () {
  return {
    title: '其他',
    file: 'other',
    demo: function () {
      const myPromise = (text) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(Array.from({ length: 5 }, (_, i) => ({ value: text.repeat(i + 1) })))
          }, 3000)
        })
      return {
        component: 'AutoComplete',
        debounce: true,
        interval: 600,
        filterOption: null,
        options: [{ value: 'a' }, { value: 'aa' }, { value: 'ab' }],
        onSearch({ sender, text }) {
          myPromise(text).then((options) => {
            sender.update({ options })
          })
        },
      }
    },
  }
})
