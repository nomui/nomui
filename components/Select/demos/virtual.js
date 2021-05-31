define(['./helper.js'], function (helper) {
  return {
    title: '多选开启虚拟渲染',
    file: 'virtual',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'Select',
            multiple: true,
            virtual: true,
            placeholder: '请选择你喜欢的作者们',
            options: helper.getData1(10000),
          },
        ],
      }
    },
  }
})
