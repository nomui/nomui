define([], function () {
  return {
    title: '多级表格的小计与合计',
    file: 'nested-summary',
    demo: function () {
      const data = [
        {
          id: 1,
          name: '电子产品',
          quantity: 50,
          cost: 10000,
          subData: [
            { id: 101, name: '手机', quantity: 20, cost: 4000 },
            { id: 102, name: '笔记本电脑', quantity: 10, cost: 3000 },
            { id: 103, name: '平板电脑', quantity: 10, cost: 2000 },
            { id: 104, name: '耳机', quantity: 5, cost: 500 },
            { id: 105, name: '智能手表', quantity: 5, cost: 500 },
          ],
        },
        {
          id: 2,
          name: '家居用品',
          quantity: 100,
          cost: 5000,
          subData: [
            { id: 201, name: '沙发', quantity: 10, cost: 2000 },
            { id: 202, name: '床', quantity: 20, cost: 1500 },
            { id: 203, name: '餐桌', quantity: 15, cost: 1000 },
            { id: 204, name: '椅子', quantity: 30, cost: 400 },
            { id: 205, name: '衣柜', quantity: 25, cost: 100 },
          ],
        },
        {
          id: 3,
          name: '服装',
          quantity: 200,
          cost: 8000,
          subData: [
            { id: 301, name: 'T恤', quantity: 100, cost: 3000 },
            { id: 302, name: '牛仔裤', quantity: 50, cost: 2500 },
            { id: 303, name: '外套', quantity: 30, cost: 1500 },
            { id: 304, name: '裙子', quantity: 15, cost: 800 },
            { id: 305, name: '鞋子', quantity: 5, cost: 200 },
          ],
        },
        {
          id: 4,
          name: '食品',
          quantity: 300,
          cost: 6000,
          subData: [
            { id: 401, name: '面包', quantity: 100, cost: 2000 },
            { id: 402, name: '牛奶', quantity: 80, cost: 1600 },
            { id: 403, name: '鸡蛋', quantity: 60, cost: 1200 },
            { id: 404, name: '水果', quantity: 40, cost: 800 },
            { id: 405, name: '蔬菜', quantity: 20, cost: 400 },
          ],
        },
        {
          id: 5,
          name: '书籍',
          quantity: 150,
          cost: 3000,
          subData: [
            { id: 501, name: '小说', quantity: 50, cost: 1000 },
            { id: 502, name: '历史', quantity: 40, cost: 800 },
            { id: 503, name: '科技', quantity: 30, cost: 600 },
            { id: 504, name: '艺术', quantity: 20, cost: 400 },
            { id: 505, name: '教育', quantity: 10, cost: 200 },
          ],
        },
      ]

      return {
        component: 'Grid',
        showTitle: true,
        rowExpandable: {
          //   expanded: true,
          compact: true,
          render: ({ rowData }) => {
            return {
              component: 'Grid',
              header: false,
              rowExpandable: {}, // 这里配置一个rowExpandable目的让表格与父级对齐
              columns: [
                {
                  field: 'name',
                  title: '类别',
                  width: 200,
                },
                {
                  field: 'quantity',
                  title: '件数',
                },
                {
                  field: 'cost',
                  title: '价格',
                },
              ],
              data: rowData.subData,
              summary: true,
            }
          },
        },
        columns: [
          {
            field: 'name',
            title: '类别',
            width: 200,
          },
          {
            field: 'quantity',
            title: '件数',
          },
          {
            field: 'cost',
            title: '价格',
          },
        ],
        data: data,
      }
    },
  }
})
