define([], function () {
  return {
    title: '选择叶子节点',
    file: 'onlyleaf',
    description:
      '可通过 `onlyleaf` 或 `treeSelectable` 来设置 `Tree` 的选择事件的配置。`treeSelectable`配置同 `Tree` 组件的 `nodeSelectable`',
    demo: function () {
      const options = [
        {
          title: 'Node1',
          value: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-1',
            },
            {
              title: 'Child Node2',
              value: '0-0-2',
              children: [
                {
                  title: 'Child Child Node1',
                  value: '0-0-0-1',
                },
              ],
            },
          ],
        },
        {
          title: 'Node2',
          value: '0-1',
        },
      ]
      return {
        component: 'Flex',
        rows: [
          {
            cols: [
              { span: 2, children: '直接配置onlyleaf：' },
              {
                span: 6,
                children: {
                  component: 'TreeSelect',
                  allowClear: true,
                  onlyleaf: true,
                  treeDataFields: {
                    key: 'value',
                    text: 'title',
                  },
                  options,
                  value: '0-1',
                },
              },
            ],
          },
          {
            cols: [
              { span: 2, children: '配置treeSelectable：' },
              {
                span: 6,
                children: {
                  component: 'TreeSelect',
                  allowClear: true,
                  treeSelectable: {
                    onlyleaf: true,
                  },
                  treeDataFields: {
                    key: 'value',
                    text: 'title',
                  },
                  options,
                  value: '0-0',
                },
              },
            ],
          },
        ],
      }
    },
  }
})
