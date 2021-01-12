define([], function () {
  return {
    title: '综合示例',
    file: 'integration',
    demo: function () {
      let textList = null
      let buttonList = null

      const items = [
        { text: '飞狐外传' },
        { text: '雪山飞狐' },
        { text: '连城诀' },
        { text: '天龙八部' },
        { text: '射雕英雄传' },
        { text: '白马啸西风' },
        { text: '鹿鼎记' },
      ]

      return {
        component: 'Rows',
        gutter: 'md',
        items: [
          {
            component: 'Cols',
            items: [
              {
                component: 'RadioList',
                options: [
                  { text: '自动', value: null },
                  { text: '1 列', value: 1 },
                  { text: '2 列', value: 2 },
                  { text: '3 列', value: 3 },
                  { text: '4 列', value: 4 },
                  { text: '5 列', value: 5 },
                  { text: '6 列', value: 6 },
                ],
                type: 'button',
                onValueChange: function (changed) {
                  textList.update({
                    cols: changed.newValue,
                  })
                  buttonList.update({
                    cols: changed.newValue,
                  })
                },
              },
              {
                component: 'RadioList',
                options: [
                  { text: '无间隔', value: null },
                  { text: '小间隔', value: 'sm' },
                  { text: '中间隔', value: 'md' },
                  { text: '大间隔', value: 'lg' },
                ],
                type: 'button',
                onValueChange: function (changed) {
                  textList.update({
                    gutter: changed.newValue,
                  })
                  buttonList.update({
                    gutter: changed.newValue,
                  })
                },
              },
              {
                component: 'RadioList',
                options: [
                  { text: '没有线', value: null },
                  { text: '分隔线', value: 'split' },
                  { text: '网格线', value: 'grid' },
                  { text: '交叉线', value: 'cross' },
                ],
                type: 'button',
                onValueChange: function (changed) {
                  textList.update({
                    line: changed.newValue,
                  })
                  buttonList.update({
                    line: changed.newValue,
                  })
                },
              },
              {
                component: 'RadioList',
                options: [
                  { text: '按钮宽度自动', value: null },
                  { text: '按钮宽度百分百', value: 'full' },
                ],
                type: 'button',
                onValueChange: function (changed) {
                  buttonList.update({
                    itemDefaults: {
                      styles: {
                        width: changed.newValue,
                      },
                    },
                  })
                },
              },
            ],
          },
          {
            component: 'Cols',
            align: 'stretch',
            fills: true,
            items: [
              {
                component: 'Panel',
                styles: {
                  height: 'full',
                },
                header: {
                  caption: {
                    title: '文本项',
                  },
                },
                body: {
                  children: {
                    component: 'List',
                    ref: (c) => {
                      textList = c
                    },
                    direction: 'horizontal',
                    wrap: true,
                    items: items,
                    itemDefaults: {
                      _config: function () {
                        this.setProps({
                          children: this.props.text,
                        })
                      },
                    },
                  },
                },
              },
              {
                component: 'Panel',
                header: {
                  caption: {
                    title: '按钮项',
                  },
                },
                body: {
                  children: {
                    component: 'List',
                    ref: (c) => {
                      buttonList = c
                    },
                    direction: 'horizontal',
                    wrap: true,
                    items: items,
                    itemDefaults: {
                      component: 'Button',
                    },
                  },
                },
              },
            ],
          },
        ],
      }
    },
  }
})
