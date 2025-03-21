define([], function () {
  return {
    title: '懒加载(后端)',
    file: 'lazy-load-remote',
    description:
      '通过配置 `lazyLoadRemote` 实现后端懒加载，loadData方法接受两个参数，pageSize和pageIndex，其中pageIndex由组件自动计算，返回一个promise，promise返回的数组将作为表格数据',
    demo: function () {
      function generateData({ pageSize }) {
        const num = pageSize || 20
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
            id: nomui.utils.newGuid(),
            name: randomBook,
            author: randomAuthor,
            sales: randomSales,
            role: randomRole,
          })
        }
        return data
      }

      const arr = generateData(20)
      return {
        component: 'Grid',
        showTitle: true,
        lazyLoadRemote: {
          pageSize: 20,
          loadData: ({ pageSize, pageIndex }) => {
            console.log({ pageSize, pageIndex })
            // 由于组件内部无法判断异步请求返回数据格式，这里需要保证返回符合grid.props.data的数组
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(generateData({ pageSize, pageIndex }))
              }, 1000)
            })
          },
        },

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
