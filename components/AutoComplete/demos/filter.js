define([], function () {
  return {
    title: '搜索筛选',
    file: 'filterOption',
    demo: function () {
      return {
        component: 'AutoComplete',
        label: '搜索筛选',
        options: [
          { value: 'a' },
          { value: 'A' },
          { value: 'aa' },
          { value: 'AA' },
          { value: 'aaa' },
          { value: 'AAA' },
          { value: 'aaaa' },
          { value: 'AAAA' },
          { value: 'aaaaa' },
          { value: 'AAAAA' },
        ],
        filterOption: (txt, options) =>
          options.filter((o) => o.value.toLowerCase().includes(txt.toLowerCase())),
      }
    },
  }
})
