define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      let maskInfoFieldRef

      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Flex',
            gap: 'small',
            cols: [
              {
                component: 'Button',
                text: `setValue('17788889999')`,
                onClick() {
                  maskInfoFieldRef.setValue('17788889999')
                },
              },
              {
                component: 'Button',
                text: 'getValue',
                onClick() {
                  console.log(maskInfoFieldRef.getValue())
                },
              },
            ],
          },
          {
            component: 'MaskInfoField',
            ref: (c) => {
              maskInfoFieldRef = c
            },
            type: 'mobile',
            value: '13344445555',
          },
        ],
      }
    },
  }
})
