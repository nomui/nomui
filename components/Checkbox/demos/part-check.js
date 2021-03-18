define([], function () {
  return {
    title: '部分选中',
    file: 'part-check',
    demo: function () {
      return {
        children: [
          {
            component: 'Checkbox',
            text: '同意',
            partChecked: true,
          },
        ],
      }
    },
  }
})
