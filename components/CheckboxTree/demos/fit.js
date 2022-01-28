define([], function () {
  return {
    title: '设定高度',
    file: 'fit',
    description:
      '组合的 Tree 组件的 `fit` 配置默认为 `true`，所以通过 attrs 设定字段的高度时，树部分会表现出自适应父容器的效果，为了兼容低版本浏览器，设置了高度的时候会自动加上overflow',
    demo: function () {
      return {
        children: [
          {
            component: 'CheckboxTree',
            showCheckAll: true,
            attrs: {
              style: {
                height: '300px',
              },
            },
            options: [
              {
                text: '节点 1',
                value: '1',
                children: [
                  {
                    text: '节点 1.1',
                    value: '1.1',
                    children: [
                      { text: '节点 1.1.1', value: '1.1.1' },
                      { text: '节点 1.1.2', value: '1.1.2' },
                      { text: '节点 1.1.3', value: '1.1.3' },
                    ],
                  },
                ],
              },
              {
                text: '节点 2',
                value: '2',
                children: [
                  { text: '节点 2.1', value: '2.1', children: [] },
                  { text: '节点 2.2', value: '2.2' },
                ],
              },
              {
                text: '节点 3',
                value: '3',
                children: [
                  { text: '节点 3.1', value: '3.1' },
                  { text: '节点 3.2', value: '3.2' },
                ],
              },
            ],
          },
        ],
      }
    },
  }
})
