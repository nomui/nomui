define([], function () {
  return {
    title: '自适应父容器',
    file: 'fit',
    description: '通过 `fit` 配置自适应父容器高度，当树内容超出时出现滚动条，如果配置了显示全选复选框，该全选复选框会固定',
    demo: function () {
      return {
        attrs: {
          style: {
            height: '200px',
          },
        },
        children: {
          component: 'Tree',
          fit: true,
          initExpandLevel: 1,
          nodeCheckable: {
            showCheckAll: true,
          },
          data: [
            {
              text: '节点 1',
              children: [
                {
                  text: '节点 1.1',
                  children: [
                    { text: '节点 1.1.1' },
                    { text: '节点 1.1.2' },
                    { text: '节点 1.1.3' },
                  ],
                },
              ],
            },
            {
              text: '节点 2',
              children: [{ text: '节点 2.1', children: [] }, { text: '节点 2.2' }],
            },
            {
              text: '节点 3',
              children: [{ text: '节点 3.1' }, { text: '节点 3.2' }],
            },
          ],
        },
      }
    },
  }
})
