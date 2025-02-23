define([], function () {
  return {
    title: '自定义渲染',
    file: 'render',
    demo: function () {
      return {
        children: [
          {
            component: 'RadioList',
            cols: 1,
            itemRender: ({ itemData }) => {
              return {
                component: 'Flex',
                rows: [
                  {
                    tag: 'h5',
                    children: itemData.text,
                  },
                  {
                    styles: {
                      text: 'gray',
                    },
                    children: itemData.description,
                  },
                ],
              }
            },
            options: [
              {
                text: '金庸',
                value: 0,
                description:
                  '金庸，原名查良镛，著名武侠小说作家，作品如《射雕英雄传》《神雕侠侣》等广受欢迎。',
              },
              {
                text: '古龙',
                value: 1,
                description: '古龙，原名熊耀华，新派武侠小说宗师，以《多情剑客无情剑》等作品闻名。',
              },
              {
                text: '梁羽生',
                value: 3,
                description: '梁羽生，原名陈文统，武侠小说开山鼻祖，代表作有《七剑下天山》等。',
              },
              {
                text: '温瑞安',
                value: 4,
                description: '温瑞安，当代武侠大师，以《四大名捕》系列等作品著称，风格独特。',
              },
            ],
          },
        ],
      }
    },
  }
})
