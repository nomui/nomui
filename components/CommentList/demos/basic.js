define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            component: 'CommentList',
            commentItem: [
              {
                author: '葫芦娃',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: '我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃',
                datetime: '/Date(1489368353683)/',
                repbtn: true,
                delbtn: false,
                reply: {},
                onReply: () => { },
                onDeleted: () => { },
              },
              {
                author: '红孩儿',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: '你真的是葫芦娃',
                datetime: '/Date(1489368353683)/',
                repbtn: true,
                delbtn: true,
                reply: {
                  deleted: false,
                  author: '葫芦娃',
                  avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                  content: '我是葫芦娃',
                  datetime: '/Date(1489368353683)/',
                  repbtn: true,
                  delbtn: false,
                },
                onReply: () => { },
                onDeleted: () => { },
              },
              {
                author: '红孩儿',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: '666',
                datetime: '/Date(1489368353683)/',
                repbtn: true,
                delbtn: true,
                reply: {
                  deleted: true,
                  author: '齐天大圣',
                  avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                  content: '',
                  datetime: '',
                  repbtn: false,
                  delbtn: false,
                },
                onReply: () => { },
                onDeleted: () => { },
              },
              {
                author: '红孩儿',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: '我是红孩儿',
                datetime: '/Date(1489368353683)/',
                repbtn: true,
                delbtn: true,
                reply: {
                  deleted: false,
                  author: '红孩儿',
                  avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                  content: '你真的是葫芦娃',
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
