define([], function () {
  let gridRef
  return {
    title: '列设置',
    file: 'custom-columns',
    description:
      '设置 `columnsCustomizable.cache` 为`true`或`string`类型唯一值，实现列展示的本地缓存(优先取`Grid.key`为缓存的key)',
    demo: function () {
      const c = [
        {
          title: '姓名',
          field: 'name',
          sortable: true,
          cellRender: (args) => {
            return {
              component: 'Button',
              text: `${args.cellData}`,
            }
          },
        },
        {
          title: '其它',
          field: 'other',

          children: [
            {
              title: '年龄',
              field: 'age',
            },
            {
              title: '住址',
              field: 'address',
              children: [
                {
                  title: '街道',
                  field: 'street',
                },
                {
                  title: '小区',
                  field: 'area',
                  children: [
                    {
                      title: '单元',
                      field: 'building',
                    },
                    {
                      title: '门牌',
                      field: 'number',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: '公司',
          field: 'company',
          children: [
            {
              title: '地址',
              field: 'companyAddress',
            },
            {
              title: '名称',
              field: 'companyName',
            },
          ],
        },
        {
          title: '性别',
          field: 'gender',

          render: (data) => {
            return {
              component: 'Tag',
              text: data,
              color: 'yellow',
            }
          },
        },
      ]

      const s = [
        {
          title: '其它',
          field: 'other',
          children: [
            {
              title: '年龄',
              field: 'age',
            },
            {
              title: '住址',
              field: 'address',
              children: [
                {
                  title: '小区',
                  field: 'area',
                  children: [
                    {
                      title: '单元',
                      field: 'building',
                    },
                    {
                      title: '门牌',
                      field: 'number',
                    },
                  ],
                },
                {
                  title: '街道',
                  field: 'street',
                },
              ],
            },
          ],
        },
        {
          title: '公司',
          field: 'company',
          children: [
            {
              title: '地址',
              field: 'companyAddress',
            },
          ],
        },
      ]

      const source = [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          street: '拱墅区和睦街道',
          building: 1,
          number: 2033,
          companyAddress: '西湖区湖底公园',
          companyName: '湖底有限公司',
          gender: '男',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          street: '拱墅区和睦街道',
          building: 3,
          number: 2035,
          companyAddress: '西湖区湖底公园',
          companyName: '湖底有限公司',
          gender: '男',
        },
        {
          key: '3',
          name: '胡彦斌',
          age: 32,
          street: '拱墅区和睦街道',
          building: 1,
          number: 2033,
          companyAddress: '西湖区湖底公园',
          companyName: '湖底有限公司',
          gender: '男',
        },
        {
          key: '4',
          name: '胡彦祖',
          age: 42,
          street: '拱墅区和睦街道',
          building: 3,
          number: 2035,
          companyAddress: '西湖区湖底公园',
          companyName: '湖底有限公司',
          gender: '男',
        },
      ]

      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Grid',
            ref: (com) => {
              gridRef = com
            },
            onSort: (data) => {
              // eslint-disable-next-line
              console.log(data)
            },
            columns: c,
            line: 'both',
            data: source,
            bordered: true,
            columnsCustomizable: {
              selected: s,
              cache: 'grid-custome-columns',
              callback: (param) => {
                // eslint-disable-next-line
                console.log('selected:', param)
              },
              doubleGroupMode: true,
            },
          },
          {
            component: 'Button',
            text: '重置自定义列数据',
            onClick: () => {
              gridRef.resetColumnsCustom()
            },
          },
        ],
      }
    },
  }
})
