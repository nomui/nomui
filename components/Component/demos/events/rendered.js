define([], function () {
  return {
    title: 'onRendered',
    file: 'rendered',
    description: '`onRendered` 在组件渲染完成后被调用。',
    demo: function () {
      return {
        component: 'List',
        autoRender: false,
        cols: 1,
        itemSelectable: {
          scrollIntoView: false,
        },
        data: [],
        dataFields: {
          key: 'bookName',
        },
        itemRender: ({ itemData }) => {
          return {
            styles: {
              selected: {
                text: 'red',
              },
            },
            children: itemData.bookName,
          }
        },
        onRendered: ({ inst }) => {
          inst.selectItem('笑傲江湖')
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
