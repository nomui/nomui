define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        children: {
          component: 'Switch',
          text: 'switch',
          name: 'x',
          value: true,
          onValueChange(changed) {
            // eslint-disable-next-line
            console.log(changed)
          },
        },
      }
    },
  }
})
