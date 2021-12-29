define([], function () {
  let ellipsisRef
  return {
    title: '展示行数',
    file: 'line',
    description: '配置组件的`line`属性实现多行文本的省略(通过`-webkit-line-clamp`实现，不兼容IE)',
    demo: function () {
      return {
        component: 'Flex',
        align: 'center',
        rows: [
          {
            component: 'Cols',
            items: [
              {
                component: 'RadioList',
                options: [
                  { text: '1行', value: 1 },
                  { text: '2行', value: 2 },
                  { text: '3行', value: 3 },
                  { text: '5行', value: 5 },
                  { text: '10行', value: 10 },
                ],
                value: 1,
                uistyle: 'button',
                onValueChange: function (changed) {
                  ellipsisRef.update({
                    line: changed.newValue,
                  })
                },
              },
            ],
          },
          {
            component: 'Ellipsis',
            attrs: { style: { width: '300px' } },
            ref: (c) => {
              ellipsisRef = c
            },
            text:
              '这是一段很长的文字，为了能达到换行的效果，这里将元素宽度设置为了300px。你可以在上面设置想展示的行数，点击设置即可查看效果。超过设定行数的文字，将会被 ... 显示。这是一段很长的文字，为了能达到换行的效果，这里将元素宽度设置为了300px。你可以在上面设置想展示的行数，点击设置即可查看效果。超过设定行数的文字，将会被 ... 显示。这是一段很长的文字，为了能达到换行的效果，这里将元素宽度设置为了300px。你可以在上面设置想展示的行数，点击设置即可查看效果。超过设定行数的文字，将会被 ... 显示。',
          },
        ],
      }
    },
  }
})
