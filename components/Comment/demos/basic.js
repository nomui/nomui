define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      let commentRef = null
      return {
        ref: (c) => {
          commentRef = c
        },
        component: 'Comment',
        author: '爷爷',
        avatar: '',
        userId: 1994,// 用户id唯一
        // 评论
        onComment: (reply, val) => {
          console.log(reply, val)
          const commentItem = [
            {
              userId: 987,// 用户id唯一
              key: '1',// 每条留言唯一key值
              author: '葫芦娃',
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              atRelevant: ['雅丽莎', '茱丽叶', '罗密欧'],// 该条留言@了哪些人
              content: '我是葫芦娃',
              datetime: '2017-03-13 09:25',
              reply: {},// 回复了谁
            }, {
              userId: 1994,
              key: '2',
              author: '爷爷',
              avatar: '',
              atRelevant: [],
              content: '我是你爷爷',
              datetime: '2017-03-13 09:25',
              reply: {
                author: '葫芦娃',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                atRelevant: ['雅丽莎', '茱丽叶', '罗密欧'],
                content: '我是葫芦娃',
                datetime: '2017-03-13 09:25',
              },
            },
          ]
          commentRef.addComment(commentItem)
          commentRef.textareaRef.element.innerHTML = ''
        },
        // 删除
        onDeleted: (items) => {
          console.log(items)
          const commentItem = [
            {
              userId: 987,// 用户id唯一
              key: '1',// 每条留言唯一key值
              author: '葫芦娃',
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              atRelevant: ['雅丽莎', '茱丽叶', '罗密欧'],// 该条留言@了哪些人
              content: '我是葫芦娃',
              datetime: '2017-03-13 09:25',
              reply: {},// 回复了谁
            }, {
              userId: 1994,
              key: '2',
              author: '爷爷',
              avatar: '',
              atRelevant: [],
              content: '我是你爷爷',
              datetime: '2017-03-13 09:25',
              reply: {
                author: '葫芦娃',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                atRelevant: ['雅丽莎', '茱丽叶', '罗密欧'],
                content: '我是葫芦娃',
                datetime: '2017-03-13 09:25',
              },
            },
          ]
          commentRef.addComment(commentItem)
        },
        // 留言列表
        commentItem: [
          {
            userId: 987,// 用户id唯一
            key: '1',// 每条留言唯一key值
            author: '葫芦娃',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            atRelevant: ['雅丽莎', '茱丽叶', '罗密欧'],// 该条留言@了哪些人
            content: '我是葫芦娃',
            datetime: '2017-03-13 09:25',
            reply: {},// 回复了谁
          },
          {
            userId: 1994,
            key: '2',
            author: '爷爷',
            avatar: '',
            atRelevant: [],
            content: '我是你爷爷',
            datetime: '2017-03-13 09:25',
            reply: {
              author: '葫芦娃',
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              atRelevant: ['雅丽莎', '茱丽叶', '罗密欧'],
              content: '我是葫芦娃',
              datetime: '2017-03-13 09:25',
            },
          },
          {
            userId: 567,
            key: '3',
            author: '齐天大圣',
            avatar: '',
            atRelevant: [],
            content: '哪来的妖怪',
            datetime: '2017-03-13 09:25',
            reply: {},
          },
          {
            userId: 1994,
            key: '4',
            author: '爷爷',
            avatar: '',
            atRelevant: ['雅丽莎', '茱丽叶', '罗密欧'],
            content: '吃饭去',
            datetime: '2017-03-13 09:25',
            reply: {
              author: '齐天大圣',
              avatar: '',
              atRelevant: [],
              content: '哪来的妖怪',
              datetime: '2017-03-13 09:25',
            },
          },
        ],
        // 艾特列表
        atUserLists: [
          {
            userId: 987,
            key: '1',
            author: '葫芦娃',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          },
          {
            userId: 133,
            key: '2',
            author: '猪八戒',
            avatar: '',
          },
          {
            userId: 758,
            key: '3',
            author: '猴哥',
            avatar: '',
          },
          {
            userId: 74658,
            key: '4',
            author: '大哥',
            avatar: '',
          },
          {
            userId: 7538,
            key: '5',
            author: '表哥',
            avatar: '',
          },
          {
            userId: 751128,
            key: '6',
            author: '猴哥',
            avatar: '',
          },
          {
            userId: 2333234,
            key: '7',
            author: '大哥',
            avatar: '',
          },
          {
            userId: 75323258,
            key: '8',
            author: '表哥',
            avatar: '',
          },
          {
            userId: 75321233258,
            key: '9',
            author: '表哥',
            avatar: '',
          },
          {
            userId: 7532123323543258,
            key: '10',
            author: '表哥',
            avatar: '',
          },
          {
            userId: 7532221233258,
            key: '11',
            author: '表哥',
            avatar: '',
          },
        ],

      }
    },
  }
})
