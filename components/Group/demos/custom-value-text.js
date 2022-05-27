define([], function () {
  return {
    title: '自定义获取字面值',
    file: 'custom-value-text',
    demo: function () {
      let mygroup = null
      return {
        component: 'Rows',
        items: [
          {
            component: 'Group',
            inline: true,
            ref: (c) => {
              mygroup = c
            },
            methods: {
              getValueTextA: (args) => {
                const result = args.sender.getValue()
                return `${result.start} - ${result.end}`
              },
            },
            fields: [
              {
                component: 'Numberbox',
                name: 'start',
              },
              {
                component: 'StaticText',
                value: '-',
              },
              {
                component: 'Numberbox',
                name: 'end',
              },
            ],
          },
          {
            component: 'Button',
            text: '获取字面值',
            onClick: () => {
              console.log(mygroup.getValueTextA())
            },
          },
        ],
      }
    },
  }
})
