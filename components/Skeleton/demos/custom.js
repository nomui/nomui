define([], function () {
  return {
    title: '自定义显示',
    file: 'custom',
    demo: function () {
      return {
        children: [
          {
            component: 'List',
            skeleton: {
              avatar: {
                size: 'xlarge',
              }, // boolean:是否显示头像, object: AvatarProps
              title: true, // 是否显示标题
              image: false, // 是否显示图像
              paragraph: 5, // boolean:是否显示段落，number:表示段落有几行
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
