define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            component: 'Comment',
            author: '爷爷',
            avatar: '',
            onComment: (val) => {
              console.log(val)
            },
            onReply: (key, items) => {
              console.log(key, items)
            },
            onDeleted: (key, items) => {
              console.log(key, items)
            },
            commentItem: [
              {
                key: '1',
                author: '葫芦娃',
                avatar: '',
                content: '我是葫芦娃',
                datetime: '/Date(1489368353683)/',
                reply: {},
              },
              {
                key: '2',
                author: '爷爷',
                avatar: '',
                content: '我是你爷爷',
                datetime: '/Date(1489368353683)/',
                reply: {
                  author: '葫芦娃',
                  avatar: '',
                  content: '我是葫芦娃',
                  datetime: '/Date(1489368353683)/',
                },
              },
              {
                key: '3',
                author: '齐天大圣',
                avatar: '',
                content: '哪来的妖怪',
                datetime: '/Date(1489368353683)/',
                reply: {},
              },
              {
                key: '4',
                author: '爷爷',
                avatar: '',
                content: '吃饭去',
                datetime: '/Date(1489368353683)/',
                reply: {
                  author: '齐天大圣',
                  avatar: '',
                  content: '哪来的妖怪',
                  datetime: '/Date(1489368353683)/',
                },
              },
            ],
            options: [
              {
                text: '金庸',
                value: 0,
              },
              {
                text: '古龙',
                value: 1,
              },
              {
                text: '梁羽生',
                value: 2,
              },
              {
                text: '温瑞安',
                value: 3,
              },
              {
                text: '肯尼迪',
                value: 4,
              },
              {
                text: '杰克',
                value: 5,
              },
              {
                text: '爱丽丝',
                value: 6,
              },
            ],
          },
        ],
      }
    },
  }
})
