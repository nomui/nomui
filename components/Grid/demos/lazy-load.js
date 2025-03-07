define([], function () {
  return {
    title: '懒加载(前端)',
    file: 'lazy-load',
    description:
      '通过配置 `lazyLoadLimit` 实现前端懒加载，注意：前端懒加载时表格props的data将被修改，此时要获取表格完整data需要用getData()方法',
    demo: function () {
      function generateData(num) {
        const authors = ['金庸', '古龙', '梁羽生', '温瑞安']
        const roles = ['令狐冲', '乔峰', '郭靖', '杨过', '张无忌', '李寻欢', '楚留香', '陆小凤']
        const books = [
          '笑傲江湖',
          '天龙八部',
          '射雕英雄传',
          '神雕侠侣',
          '倚天屠龙记',
          '多情剑客无情剑',
          '绝代双骄',
          '七剑下天山',
        ]

        const data = []
        for (let i = 1; i <= num; i++) {
          const randomAuthor = authors[Math.floor(Math.random() * authors.length)]
          const randomRole = roles[Math.floor(Math.random() * roles.length)]
          const randomBook = books[Math.floor(Math.random() * books.length)]
          const randomSales = Math.floor(Math.random() * 1000000)

          data.push({
            id: i,
            name: randomBook,
            author: randomAuthor,
            sales: randomSales,
            role: randomRole,
          })
        }
        return data
      }

      const arr = generateData(300)
      return {
        component: 'Grid',
        showTitle: true,
        lazyLoadLimit: 15,
        attrs: {
          style: {
            height: '400px',
          },
        },

        columns: [
          {
            field: 'name',
            key: 'name',
            title: '标题',
            width: 200,
          },
          {
            field: 'author',
            key: 'author',
            title: '作者',
          },
          {
            field: 'sales',
            key: 'sales',
            title: '销量',
          },

          {
            field: 'role',
            key: 'role',
            title: '主角',
            width: 500,
            showTitle: false,
          },
        ],
        data: arr,
      }
    },
  }
})
