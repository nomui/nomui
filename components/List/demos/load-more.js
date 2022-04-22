define([], function () {
  let count1 = 0,
    count2 = 0
  const items = [
    { text: '飞狐外传' },
    { text: '雪山飞狐' },
    { text: '连城诀' },
    { text: '天龙八部' },
    { text: '射雕英雄传' },
    { text: '白马啸西风' },
    { text: '鹿鼎记' },
  ]
  const itemDefaults = {
    _config: function () {
      this.setProps({
        children: this.props.text,
      })
    },
  }
  return {
    title: '加载更多',
    file: 'load-more',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'List',
            gutter: 'md',
            items: items,
            itemDefaults,
            loadMore: {
              // resolve 返回 null || [] 则隐藏加载按钮
              resolve: () => {
                if (count1 >= 5) {
                  return []
                }
                return [{ text: `resolve-${++count1}` }]
              },
            },
          },
          {
            component: 'List',
            gutter: 'md',
            items: items,
            itemDefaults,
            loadMore: {
              text: '点击我去调接口加载更多哦，亲~',
              resolve: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    if (count2 >= 6) {
                      resolve(null)
                    } else {
                      resolve([{ text: `promise-${++count2}` }, { text: `promise-${++count2}` }])
                    }
                  }, 1000)
                })
              },
            },
          },
        ],
      }
    },
  }
})
