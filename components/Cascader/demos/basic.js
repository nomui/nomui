define(['./data.js'], function (options) {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Cascader',
        placeholder: '请选择',
        fieldsMapping: {
          key: 'Id',
          label: 'Name',
          value: 'Name',
          children: 'Childs',
        },
        value: ['内分泌', '肥胖症', 'aaa'],
        options,
      }
    },
  }
})
