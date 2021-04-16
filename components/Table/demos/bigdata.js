define([], function () {
  function getSource(n) {
    const dataSource = []
    for (let i = 1; i < n; i++) {
      dataSource.push({
        id: i,
        name: `飞狐外传-${i}`,
        author: `金庸-${i}`,
        role: `胡斐-${i}`,
      })
    }
    return dataSource
  }

  return {
    title: '大数据',
    file: 'bigdata',
    demo: function () {
      let table = null

      function loadDataTableData(n) {
        const data = getSource(n)
        const start = performance.now()
        table.update({
          data: data,
        })
        const end = performance.now()
        console.log(`${n}条数据,渲染时间总计:${end - start}ms`)
      }

      return {
        children: [
          {
            component: 'Button',
            text: '加载100条',
            styleClass: 'u-m-1',
            attrs: {
              onclick: function () {
                loadDataTableData(100)
              },
            },
          },
          {
            component: 'Button',
            text: '加载500条',
            styleClass: 'u-m-1',
            attrs: {
              onclick: function () {
                loadDataTableData(500)
              },
            },
          },
          {
            component: 'Button',
            text: '加载1000条',
            styleClass: 'u-m-1',
            attrs: {
              onclick: function () {
                loadDataTableData(1000)
              },
            },
          },
          {
            component: 'Button',
            text: '加载3000条',
            styleClass: 'u-m-1',
            attrs: {
              onclick: function () {
                loadDataTableData(3000)
              },
            },
          },
          {
            component: 'Table',
            ref: (c) => {
              table = c
            },
            columns: [
              {
                field: 'name',
                title: '标题',
                width: 200,
              },
              {
                field: 'author',
                title: '作者',
                width: 200,
              },
              {
                field: 'role',
                title: '主角',
                width: 500,
              },
              {
                field: 'role',
                title: '主角',
                width: 500,
              },
              {
                field: 'role',
                title: '主角',
                width: 500,
              },
              {
                field: 'role',
                title: '主角',
                width: 500,
              },
              {
                field: 'role',
                title: '主角',
                width: 500,
              },
              {
                field: 'role',
                title: '主角',
                width: 500,
              },
              {
                field: 'role',
                title: '主角',
                width: 500,
              },
              {
                field: 'role',
                title: '主角',
                width: 500,
              },
            ],
            data: getSource(10),
          },
        ],
      }
    },
  }
})
