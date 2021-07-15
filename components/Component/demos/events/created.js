define([], function () {
  return {
    title: 'onCreated: 生命周期-组件实例已创建事件',
    file: 'created',
    description:
      '`onCreated` 在组件实例创建完成后被调用。这时组件尚未渲染，一般在这里做一些异步获取数据然后更新组件的事情，为了性能考虑及界面不闪动，可配合 `autoRender` 设置为 `false` 使用',
    demo: function () {
      return {
        component: 'List',
        autoRender: false,
        cols: 1,
        data: [],
        itemRender: ({ itemData }) => {
          return {
            children: itemData.bookName,
          }
        },
        onCreated: ({ inst }) => {
          setTimeout(function () {
            inst.update({
              data: [{ bookName: '天龙八部' }, { bookName: '笑傲江湖' }, { bookName: '神雕侠侣' }],
            })
          }, 500)
        },
      }
    },
  }
})
