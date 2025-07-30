define([], function () {
  return {
    title: 'Excel模式编辑',
    file: 'td-edit',
    demo: function () {
      let gridRef = null

      const roleArr = [
        {
          name: '前端开发工程师',
          value: '1',
        },
        {
          name: '后端开发工程师',
          value: '2',
        },
        {
          name: 'UI设计师',
          value: '3',
        },
        {
          name: '产品经理',
          value: '4',
        },
      ]

      const deptArr = [
        {
          text: '总经办',
          value: '0-0',
          children: [
            {
              text: '人事部',
              value: '0-0-1',
            },
            {
              text: '行政部',
              value: '0-0-2',
            },
          ],
        },
        {
          text: '技术中心',
          value: '0-1',
          children: [
            {
              text: '后端组',
              value: '0-1-1',
              children: [
                {
                  text: '开发一组',
                  value: '0-1-1-1',
                },
                {
                  text: '开发二组',
                  value: '0-1-1-2',
                },
              ],
            },
            {
              text: '前端组',
              value: '0-1-2',
            },
          ],
        },
      ]

      const sexArr = [
        {
          text: '男',
          value: '1',
        },
        {
          text: '女',
          value: '2',
        },
      ]

      return {
        component: 'Flex',
        gutter: 'small',
        rows: [
          {
            gutter: 'small',
            cols: [
              {
                component: 'Button',
                text: '获取数据',
                onClick: () => {
                  console.log(gridRef.getData({ saveEdit: true }))
                },
              },
            ],
          },
          {
            component: 'Grid',
            ref: (c) => {
              gridRef = c
            },
            bordered: true,
            line: 'both',
            excelMode: {
              isCellEditable: ({ rowData, field }) => {
                if (rowData.sex === '1' && field === 'name') {
                  return false
                }
              },
              onCellValueChange: (args) => {
                console.log(args)
              },
              onValidateFailed: ({ value }) => {
                new nomui.Message({
                  type: 'error',
                  content: `由于您输入的值${value}不合法,本次修改被忽略`,
                })
              },
            },
            columns: [
              {
                field: 'name',
                title: '姓名',
                editRender: ({ cellData }) => {
                  return {
                    component: 'Textbox',
                    value: cellData,
                  }
                },
                cellRender: ({ cellData }) => {
                  if (!cellData) return '-'
                  return cellData
                },
              },
              {
                field: 'age',
                title: '年龄',
                editRender: ({ cellData }) => {
                  return {
                    component: 'Textbox',
                    value: cellData,
                    rules: [{ type: 'number', message: '请输入有效的数字' }],
                  }
                },
                cellRender: ({ cellData }) => {
                  if (!cellData) return '-'
                  return {
                    children: cellData,
                  }
                },
              },
              {
                field: 'date',
                title: '入职日期',
                editRender: ({ cellData }) => {
                  return {
                    component: 'DatePicker',
                    required: true,
                    value: cellData,
                  }
                },
                cellRender: ({ cellData }) => {
                  if (!cellData) return '-'
                  return cellData
                },
              },
              {
                field: 'role',
                title: '岗位',
                editRender: ({ cellData }) => {
                  return {
                    component: 'Select',
                    optionFields: { text: 'name', value: 'value' },
                    value: cellData,
                    options: roleArr,
                  }
                },
                cellRender: ({ cellData }) => {
                  if (!cellData) return '-'
                  return roleArr.filter((n) => {
                    return n.value === cellData
                  })[0].name
                },
              },
              {
                field: 'dept',
                title: '部门',
                editRender: ({ cellData }) => {
                  return {
                    component: 'TreeSelect',
                    value: cellData,
                    options: deptArr,
                  }
                },
                cellRender: ({ cellData }) => {
                  if (!cellData) return '-'
                  let obj = {}
                  const mapTree = (arr) => {
                    arr.forEach((n) => {
                      if (n.value === cellData) {
                        obj = n
                      } else if (n.children) {
                        mapTree(n.children)
                      }
                    })
                  }
                  mapTree(deptArr)
                  return obj.text
                },
              },
              {
                field: 'sex',
                title: '性别',
                editRender: ({ cellData }) => {
                  return {
                    component: 'RadioList',
                    required: true,
                    value: cellData,
                    options: sexArr,
                  }
                },
                cellRender: ({ cellData }) => {
                  if (!cellData) return '-'
                  if (cellData === '1') return '男'
                  if (cellData === '2') return '女'
                },
              },
            ],
            data: [
              { id: 1, name: '张小花', date: '2020-03-15', role: '2', dept: '0-1-2', sex: '1' },
              { id: 2, name: '任盈盈', date: '2021-11-20', role: '1', dept: '0-0', sex: '2' },
              { id: 3, name: '东方不败', date: '2022-5-05', role: '3', dept: '0-1-1-1', sex: '2' },
              { id: 4, name: '任我行', date: '2020-02-20', role: '4', dept: '0-0-2', sex: '1' },
            ],
          },
        ],
      }
    },
  }
})
