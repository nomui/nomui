define(['./data.js'], function (options) {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      console.log(options)
      // let cascader = null
      // setTimeout(() => {
      //   cascader.update({ options })
      // }, 1000)
      return {
        component: 'Cascader',
        // ref: (c) => {
        //   cascader = c
        // },
        placeholder: '请选择',
        fieldsMapping: {
          key: 'value',
          label: 'text',
          value: 'value',
          children: 'children',
        },
        // value: ['血液肿瘤', '急性淋巴细胞白血病'],
        options: [
          {
            value: 'PQK9DZSTrQtu4TAvlPWcc',
            text: '广州医科大学附属番禺中心医院',
            children: [
              {
                value: 'TdtIrbqMsGT2pG-_tSH3D',
                text: '板蓝根颗粒',
                children: null,
                label: '板蓝根颗粒',
                disabled: false,
              },
              {
                value: 'YqNnRlbGksR7pS8Z0ajfi',
                text: '999感冒灵颗粒',
                children: null,
                label: '999感冒灵颗粒',
                disabled: false,
              },
            ],
          },
          {
            value: 'dEd7SUB1qwLx_pVIjihLW',
            text: '北京市平谷区医院',
            children: [
              {
                value: 'TdtIrbqMsGT2pG-_tSH3D',
                text: '板蓝根颗粒',
                children: null,
                label: '板蓝根颗粒',
                disabled: true,
              },
            ],
          },
          {
            value: 'SYpXnRzpr4gAq8UEi3qG1',
            text: '厦门弘爱医院',
            children: [
              {
                value: 'YqNnRlbGksR7pS8Z0ajfi',
                text: '999感冒灵颗粒',
                children: null,
                label: '999感冒灵颗粒',
                disabled: false,
              },
            ],
          },
        ],
      }
    },
  }
})
