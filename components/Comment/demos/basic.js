define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            component: 'Comment',
            submitComment: () => { },
            commentItem: [
              {
                author: '葫芦娃',
                avatar: '',
                content: '我是葫芦娃',
                datetime: '/Date(1489368353683)/',
                repbtn: true,
                delbtn: false,
                reply: {},
                onReply: () => { },
                onDeleted: () => { },
              },
              {
                author: '爷爷',
                avatar: '',
                content: '我是爷爷',
                datetime: '/Date(1489368353683)/',
                repbtn: true,
                delbtn: true,
                reply: {
                  deleted: false,
                  author: '葫芦娃',
                  avatar: '',
                  content: '我是葫芦娃',
                  datetime: '/Date(1489368353683)/',
                  repbtn: true,
                  delbtn: false,
                },
                onReply: () => { },
                onDeleted: () => { },
              },
              {
                author: '爷爷',
                avatar: '',
                content: '哪来的妖怪',
                datetime: '/Date(1489368353683)/',
                repbtn: true,
                delbtn: true,
                reply: {
                  deleted: true,
                  author: '八戒',
                  avatar: '',
                  content: '',
                  datetime: '',
                  repbtn: false,
                  delbtn: false,
                },
                onReply: () => { },
                onDeleted: () => { },
              },
              {
                author: '爷爷',
                avatar: '',
                content: '我饿了',
                datetime: '/Date(1489368353683)/',
                repbtn: true,
                delbtn: true,
                reply: {
                  deleted: false,
                  author: '爷爷',
                  avatar: '',
                  content: '我是爷爷',
                  datetime: '/Date(1489368353683)/',
                  repbtn: true,
                  delbtn: true,
                },
                onReply: () => { },
                onDeleted: () => { },
              },
            ],
          },
        ],
      }
    },
  }
})
