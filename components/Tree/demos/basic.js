define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        children: {
          component: 'Tree',
          initExpandLevel: -1,
          nodes: [
            {
              text: '层级 1',
              nodes: [{ text: '层级 1.1', nodes: [{ text: '层级 1.1.1' }, { text: '层级 1.2' }] }],
            },
            {
              text: '层级 2',
              nodes: [{ text: '层级 2.1' }, { text: '层级 2.2' }],
            },
          ],
        },
      }
    },
  }
})
