define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'AutoComplete',
        value: 'a',
        optionFields: { value: 'name' },
        options: [
          { name: 'a' },
          { name: 'aa' },
          { name: 'ab' },
          { name: 'aba' },
          { name: 'ac' },
          { name: 'aad' },
          { name: 'aef' },
          { name: 'ag' },
          { name: 'ai' },
          { name: 'bo' },
          { name: 'ffc' },
        ],
      }
    },
  }
})
