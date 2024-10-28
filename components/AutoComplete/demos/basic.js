define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Flex',
        rows: [
          {
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
          },
          {
            component: 'AutoComplete',
            label: '控制浮层宽度',
            popupWidth: 300,
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
        ]
      }
    },
  }
})
