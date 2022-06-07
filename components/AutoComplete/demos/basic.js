define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'AutoComplete',
        value: 'a',
        options: [
          { value: 'a' },
          { value: 'aa' },
          { value: 'ab' },
          { value: 'aba' },
          { value: 'ac' },
          { value: 'aad' },
          { value: 'aef' },
          { value: 'ag' },
          { value: 'ai' },
          { value: 'bo' },
          { value: 'ffc' },
        ],
        onSelect: (a, b) => {
          // eslint-disable-next-line no-console
          console.log(a, b)
        },
      }
    },
  }
})
