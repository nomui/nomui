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
              text: 'one',
              nodes: [{ text: 'one 1' }],
            },
            {
              text: 'two',
            },
          ],
        },
      }
    },
  }
})
