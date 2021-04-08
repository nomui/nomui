define([], function () {
  return {
    title: '可勾选',
    file: 'checkable',
    demo: function () {
      return {
        children: {
          component: 'Tree',
          initExpandLevel: -1,
          nodeCheckable: true,
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
