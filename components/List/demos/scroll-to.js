define([], function () {
  return {
    title: '滚动到某个项',
    file: 'scroll-to',
    demo: function () {
      let listRef = null
      return {
        attrs: {
          style: {
            height: '200px',
          },
        },
        children: {
          component: 'Panel',
          fit: true,
          header: {
            nav: [
              {
                component: 'Button',
                text: '滚动到射雕英雄传',
                onClick: () => {
                  listRef.scrollTo('射雕英雄传')
                },
              },
              {
                component: 'Button',
                text: '选择笑傲江湖',
                onClick: () => {
                  listRef.selectItem('笑傲江湖')
                },
              },
            ],
          },
          body: {
            children: {
              component: 'List',
              ref: (c) => {
                listRef = c
              },
              gutter: 'md',
              cols: 1,
              items: [
                { text: '飞狐外传' },
                { text: '雪山飞狐' },
                { text: '连城诀' },
                { text: '天龙八部' },
                { text: '射雕英雄传' },
                { text: '白马啸西风' },
                { text: '鹿鼎记' },
                { text: '笑傲江湖' },
                { text: '书剑恩仇录' },
                { text: '侠客行' },
                { text: '倚天屠龙记' },
                { text: '碧血剑' },
                { text: '鸳鸯记' },
              ],
              itemDefaults: {
                key: (inst) => {
                  return inst.props.text
                },
                _config: (inst) => {
                  inst.setProps({
                    children: inst.props.text,
                  })
                },
              },
            },
          },
        },
      }
    },
  }
})
