define([], function () {
  let list = null
  return {
    title: '禁用部分',
    file: 'disabled',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'List',
            ref: (c) => {
              list = c
            },
            gutter: 'md',
            items: [
              { text: '飞狐外传', key: 1 },
              { text: '雪山飞狐', key: 2 },
              { text: '连城诀', key: 3 },
              { text: '天龙八部', key: 4 },
              { text: '射雕英雄传', key: 5 },
              { text: '白马啸西风', key: 6 },
              { text: '鹿鼎记', key: 7 },
            ],
            itemDefaults: {
              _config: function () {
                this.setProps({
                  children: this.props.text,
                })
              },
            },
            itemSelectable: {
              byClick: true,
            },
            disabledItems: [1, 3],
            onItemSelectionChange({ sender }) {
              console.log(sender)
            },
          },
          {
            component: 'Button',
            text: '更新禁用',
            onClick: () => {
              list.update({
                disabledItems: [1, 2, 3],
              })
            },
          },
        ],
      }
    },
  }
})
