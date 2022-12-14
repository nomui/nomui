define(['./data.js'], function (options) {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      let cascader = null
      setTimeout(() => {
        cascader.update({ options })
      }, 1000)
      return {
        component: 'Cascader',
        ref: (c) => {
          cascader = c
        },
        placeholder: '请选择',
        fieldsMapping: {
          key: 'Id',
          label: 'Name',
          value: 'Name',
          children: 'Childs',
        },
        value: ['血液肿瘤', '急性淋巴细胞白血病'],
        options: [],
      }
    },
    description:
      '默认值通过数组的方式指定。',

  }
})
