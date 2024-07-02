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
            // uncheckPart: true, // 半选状态下点击默认是勾选，如果此项配置为true则在半选状态下点击会取消勾选
            onValueChange: ({ newValue }) => {
              console.log(newValue)
            }
          },
        ],
      }
    },
  }
})
