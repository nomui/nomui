define([], function () {
  return {
    title: '圆形',
    file: 'uistyle',
    demo: function () {
      return {
        children: [
          {
            component: 'Checkbox',
            uistyle: 'round',
            text: '同意',
            value: true,
          },
        ],
      }
    },
  }
})
