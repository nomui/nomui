define([], function () {
  return {
    title: '异步加载数据',
    file: 'load-data',
    description: '通过 `loadData` 异步加载数据,仅在节点无子数据且`isLeaf:false`时会触发',
    demo: function () {
      let treeRef = null
      const initData = [
        {
          text: '节点 1',
          children: [
            {
              key: '1',
              text: '节点 1.1',
              children: [{ text: '节点 1.1.1' }, { text: '节点 1.1.2' }, { text: '节点 1.1.3' }],
            },
          ],
        },
        {
          key: '2',
          text: '节点 2',
          children: [{ text: '节点 2.1', children: [] }, { text: '节点 2.2' }],
        },
        {
          key: '3',
          text: '节点 3',
          isLeaf: false, // 非叶子节点，可以触发展开动作
          children: [],
        },
      ]

      const loadMore = ({ key }) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve([{ text: '节点 3.1' }, { text: '节点 3.2' }])
          }, 1000)
        }).then((res) => {
          initData.forEach((n) => {
            if (n.key === key) {
              n.children = [...n.children, ...res]
            }
          })

          treeRef.update({ data: initData })
        })

      return {
        children: {
          component: 'Tree',
          ref: (c) => {
            treeRef = c
          },
          initExpandLevel: 1,
          expandable: {
            byIndicator: true,
          },
          data: initData,
          loadData: (param) => {
            loadMore(param)
          },
        },
      }
    },
  }
})
