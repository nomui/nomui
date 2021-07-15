define([], function () {
  return {
    title: '层次结构',
    file: 'children',
    description: '通过 `children` 配置子组件，可以无限层级级联下去，形成一颗组件树',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'large',
        rows: [
          {
            tag: 'h4',
            children: '金庸作品集',
          },
          {
            tag: 'ul',
            children: [
              {
                tag: 'li',
                children: '飞狐外传',
              },
              {
                tag: 'li',
                children: '雪山飞狐',
              },
              {
                tag: 'li',
                children: '连城诀',
              },
              {
                tag: 'li',
                children: '射雕英雄传',
              },
            ],
          },
          {
            tag: 'select',
            children: [
              {
                tag: 'option',
                value: 1,
                children: '飞狐外传',
              },
              {
                tag: 'option',
                value: 2,
                attrs: { selected: true },
                children: '雪山飞狐',
              },
              {
                tag: 'option',
                value: 3,
                children: '连城诀',
              },
              {
                tag: 'option',
                value: 4,
                children: '射雕英雄传',
              },
            ],
          },
          {
            tag: 'table',
            children: [
              {
                tag: 'thead',
                children: {
                  tag: 'tr',
                  children: [
                    {
                      tag: 'th',
                      children: '作品',
                    },
                    {
                      tag: 'th',
                      children: '作者',
                    },
                  ],
                },
              },
              {
                tag: 'tbody',
                children: [
                  {
                    tag: 'tr',
                    children: [
                      {
                        tag: 'td',
                        children: '飞狐外传',
                      },
                      {
                        tag: 'td',
                        children: '金庸',
                      },
                    ],
                  },
                  {
                    tag: 'tr',
                    children: [
                      {
                        tag: 'td',
                        children: '雪山飞狐',
                      },
                      {
                        tag: 'td',
                        children: '金庸',
                      },
                    ],
                  },
                  {
                    tag: 'tr',
                    children: [
                      {
                        tag: 'td',
                        children: '连城诀',
                      },
                      {
                        tag: 'td',
                        children: '金庸',
                      },
                    ],
                  },
                  {
                    tag: 'tr',
                    children: [
                      {
                        tag: 'td',
                        children: '射雕英雄传',
                      },
                      {
                        tag: 'td',
                        children: '金庸',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }
    },
  }
})
