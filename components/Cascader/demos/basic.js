define(['./data.js'], function (options) {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      let cascader = null
      setTimeout(() => {
        cascader.update({ options })
      }, 3000)
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
        value: ['内分泌', '肥胖症', 'aaa'],
        options: [],
      }
    },
  }
})
