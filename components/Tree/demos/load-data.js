define([], function () {
  return {
    title: '异步加载数据',
    file: 'load-data',
    description: '通过 `loadData` 异步加载数据,仅在节点无子数据且`isLeaf:false`时会触发',
    demo: function () {
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

      return {
        children: {
          component: 'Tree',
          initExpandLevel: 1,
          expandable: {
            byIndicator: true,
          },
          data: initData,
          loadData: ({ key }) => {
            console.log(key)
            // 可以通过key查找对应的子集

            if (key === '3.1') {
              return new Promise(function (resolve) {
                this.timer && clearTimeout(this.timer)
                this.timer = setTimeout(function () {
                  resolve([])
                }, 500)
              })
            }

            return new Promise(function (resolve) {
              this.timer && clearTimeout(this.timer)
              this.timer = setTimeout(function () {
                resolve([
                  { text: '节点 3.1', key: '3.1', isLeaf: false },
                  { text: '节点 3.2', key: '3.2', isLeaf: true },
                ])
              }, 500)
            })
          },
        },
      }
    },
  }
})
