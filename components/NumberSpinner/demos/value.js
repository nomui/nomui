define([], function () {
  return {
    title: '自定义',
    file: 'basic',
    demo: function () {
      let numberSpinnerRef = null
      return {
        component: 'Rows',
        items: [
          {
            component: 'NumberSpinner',
            ref: (c) => {
              numberSpinnerRef = c
            },
            label: '数字微调器',
            placeholder: '请输入',
            precision: 2,
            value: 1000,
            max: 999,
            min: 900,
            // style: 'percent',
            currency: 'cny',
            options: false,
            step: 1,
            onStep(a, b) {
              console.log(a, b)
            },
            onValueChange(changed) {
              console.log(changed)
            },
          },
          {
            component: 'Cols',
            items: [
              {
                component: 'Button',
                text: '获取值',
                onClick() {
                  new nomui.Message({
                    content: `当前值为:${numberSpinnerRef._getValue()}`,
                    type: 'info',
                  })
                },
              },
              {
                component: 'Button',
                text: '设置值',
                onClick() {
                  numberSpinnerRef.setValue(11111111111111111)
                  // numberSpinnerRef.setValue('aaa')
                },
              },
            ],
          },
        ],
      }
    },
  }
})
