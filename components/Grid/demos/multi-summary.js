define([], function () {
  const options = [
    { id: 1, name: '萧峰', power: 90, speed: 90, agile: 85 },
    { id: 4, name: '虚竹', power: 100, speed: 80, agile: 90 },
    { id: 5, name: '段誉', power: 80, speed: 100, agile: 95 },
    { id: 6, name: '扫地僧', power: 100, speed: 100, agile: 'xxx' },
  ]

  const gridColumns = [
    { field: 'name', key: 'name', title: '姓名', width: 200, sortable: true },
    {
      field: 'power',
      key: 'power',
      title: '力量',
      cellRender: ({ cellData }) => {
        return {
          component: 'Progress',
          percent: cellData,
        }
      },
    },
    { field: 'speed', key: 'speed', title: '速度', sortable: (a, b) => b.speed - a.speed },
    { field: 'agile', key: 'agile', title: '敏捷', width: 500 },
  ]

  const footerColumns = [
    {
      field: 'name',
      key: 'name',
      title: '姓名',
      width: 200,
    },
    {
      field: 'power',
      key: 'power',
      title: '力量',
      cellRender: ({ cellData }) => {
        return `合计有:${cellData}`
      },
    },
    { field: 'speed', key: 'speed', title: '速度', sortable: (a, b) => b.speed - a.speed },
    { field: 'agile', key: 'agile', title: '敏捷', width: 500 },
  ]

  return {
    title: '多个表尾合计行',
    file: 'multi-summary',
    demo: function () {
      return {
        component: 'Flex',
        gutter: 'large',
        rows: [
          {
            component: 'Grid',
            summary: {
              columns: footerColumns, // 统计行默认使用Grid的列数组，也可以自己配置（主要用来区分定义cellRender）
              rows: [
                {
                  text: '最小值',
                  // method 返回 { field: 需要展示的总结的数据 } 格式的对象
                  method: ({ columns, data, text }) => {
                    console.log(text) // 根据text可以判断当前是哪个统计行
                    const res = {}
                    columns.forEach((col) => {
                      const values = data.map((item) => Number(item[col.field]))
                      const min = Math.min(...values)
                      res[col.field] = Number.isNaN(min) ? '-' : min
                    })
                    return res
                  },
                },
                {
                  text: '最大值',

                  // method 返回 { field: 需要展示的总结的数据 } 格式的对象
                  method: ({ columns, data }) => {
                    const res = {}
                    columns.forEach((col) => {
                      const values = data.map((item) => Number(item[col.field]))
                      const max = Math.max(...values)
                      res[col.field] = Number.isNaN(max) ? '-' : max
                    })
                    return res
                  },
                },
              ],
            },
            columns: gridColumns,
            data: options,
          },

          {
            component: 'Grid',
            summary: {
              //   ignoreCellRender: true, // 是否忽略cellRender，直接显示字段值

              rows: [
                {
                  text: '最小值',
                  // method 返回 { field: 需要展示的总结的数据 } 格式的对象
                  method: ({ columns, data, text }) => {
                    console.log(text) // 根据text可以判断当前是哪个统计行
                    const res = {}
                    columns.forEach((col) => {
                      const values = data.map((item) => Number(item[col.field]))
                      const min = Math.min(...values)
                      res[col.field] = Number.isNaN(min) ? '-' : min
                    })
                    return res
                  },
                },
                {
                  text: '最大值',

                  // method 返回 { field: 需要展示的总结的数据 } 格式的对象
                  method: ({ columns, data }) => {
                    const res = {}
                    columns.forEach((col) => {
                      const values = data.map((item) => Number(item[col.field]))
                      const max = Math.max(...values)
                      res[col.field] = Number.isNaN(max) ? '-' : max
                    })
                    return res
                  },
                },
              ],
            },
            columns: gridColumns,
            data: options,
          },
        ],
      }
    },
  }
})
