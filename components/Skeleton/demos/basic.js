define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            tag: 'p',
            styles: {
              text: 'orange',
            },
            children: '先显示骨架屏，update组件(在本案例是延时三秒)以后会显示原本的内容',
          },
          {
            component: 'List',
            skeleton: true,
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
            onCreated: ({ inst }) => {
              setTimeout(function () {
                inst.update()
              }, 3000)
            },
          },
        ],
      }
    },
  }
})
