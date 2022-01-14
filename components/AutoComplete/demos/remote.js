define(['./fetch-jsonp.js'], function ({ jsonp }) {
  return {
    title: '异步搜索',
    file: 'remote',
    demo: function () {
      function fetchData(value, callback) {
        const str = `code=utf-8&q=${value}`
        jsonp(`https://suggest.taobao.com/sug?${str}`)
          .then((response) => response.json())
          .then(({ result }) => callback(result))
      }

      return {
        component: 'AutoComplete',
        filterOption: false,
        onSearch({ text, sender }) {
          fetchData(text, (data) => {
            const opts = data.map((item) => ({ value: item[0] }))
            sender.update({ options: opts })
          })
        },
      }
    },
  }
})
