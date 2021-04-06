define([], function () {
  return {
    title: '列设置',
    file: 'custom-columns',
    demo: function () {
      const c = [
        {
          title: '姓名',
          field: 'name',
          key: 'name',
        },
        {
          title: '其它',
          key: 'other',
          children: [
            {
              title: '年龄',
              field: 'age',
              key: 'age',
            },
            {
              title: '住址',
              key: 'address',
              children: [
                {
                  title: '街道',
                  field: 'street',
                  key: 'street',
                },
                {
                  title: '小区',
                  key: 'area',
                  children: [
                    {
                      title: '单元',
                      field: 'building',
                      key: 'building',
                    },
                    {
                      title: '门牌',
                      field: 'number',
                      key: 'number',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: '公司',
          key: 'company',
          children: [
            {
              title: '地址',
              field: 'companyAddress',
              key: 'companyAddress',
            },
            {
              title: '名称',
              field: 'companyName',
              key: 'companyName',
            },
          ],
        },
        {
          title: '性别',
          field: 'gender',
          key: 'gender',
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
          title: '姓名',
          field: 'name',
          key: 'name',
        },
        {
          title: '其它',
          key: 'other',
          children: [
            {
              title: '年龄',
              field: 'age',
              key: 'age',
            },
            {
              title: '住址',
              key: 'address',
              children: [
                {
                  title: '小区',
                  key: 'area',
                  children: [
                    {
                      title: '单元',
                      field: 'building',
                      key: 'building',
                    },
                    {
                      title: '门牌',
                      field: 'number',
                      key: 'number',
                    },
                  ],
                },
                {
                  title: '街道',
                  field: 'street',
                  key: 'street',
                },
              ],
            },
          ],
        },
        {
          title: '公司',
          key: 'company',
          children: [
            {
              title: '地址',
              field: 'companyAddress',
              key: 'companyAddress',
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
        component: 'Grid',
        onSort: (data) => {
          console.log(data)
        },
        columns: c,
        line: 'both',
        data: source,
        bordered: true,
        columnsCustomizable: {
          selected: s,
        },
      }
    },
  }
})
