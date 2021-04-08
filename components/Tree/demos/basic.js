define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        children: {
          component: 'Tree',
          initExpandLevel: -1,
          data: [
            {
              text: '层级 1',
              children: [
                { text: '层级 1.1', children: [{ text: '层级 1.1.1' }, { text: '层级 1.2' }] },
              ],
            },
            {
              text: '层级 2',
              children: [{ text: '层级 2.1' }, { text: '层级 2.2' }],
            },
          ],
        },
      }
    },
  }
})
