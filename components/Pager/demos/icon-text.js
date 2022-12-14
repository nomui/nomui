define([], function () {
  return {
    title: '替换上一页和下一页以及缩略字符',
    file: 'icon-text',
    demo: function () {
      return {
        children: [
          {
            component: 'Pager',
            totalCount: 100,
            texts: {
              prev: '上一页',
              next: '下一页',
              ellipse: '......',
            },
            onPageChange: function (e) {
              e.sender.update(e)
              console.log(e)
            },
          },
        ],
      }
    },
    description:
      '修改上一步和下一步为文字链接。',

  }
})
