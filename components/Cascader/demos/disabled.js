define(['./data.js'], function () {
  return {
    title: '禁用选项',
    file: 'disabled',
    demo: function () {
      return {
        component: 'Cascader',
        placeholder: '请选择',
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',

                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake',
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            // disabled: true,
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',

                children: [
                  {
                    value: 'zhonghuamen',
                    disabled: true,
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ],
      }
    },
  }
})
