define([], function () {
  return {
    title: '重复布局',
    file: 'repeat',
    demo: function () {
      return {
        children: [
          {
            component: 'List',
            skeleton: {
              image: {
                width: 200,
                height: 100,
              },
              title: true,
              rows: 2, // 显示几行
              cols: 3, // 显示几列
            },
            items: [
              { text: '飞狐外传' },
              { text: '雪山飞狐' },
              { text: '连城诀' },
              { text: '天龙八部' },
              { text: '射雕英雄传' },
              { text: '白马啸西风' },
              { text: '鹿鼎记' },
            ],
            itemDefaults: {
              _config: function () {
                this.setProps({
                  children: this.props.text,
                })
              },
            },
            // onCreated: ({ inst }) => {
            //   setTimeout(function () {
            //     inst.update()
            //   }, 3000)
            // },
          },
        ],
      }
    },
  }
})
