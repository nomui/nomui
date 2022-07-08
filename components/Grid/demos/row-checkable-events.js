define([], function () {
  return {
    title: '选择事件',
    file: 'row-checkable-events',
    demo: function () {
      let gridRef = null
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Button',
            text: '获取选中行',
            onClick: () => {
              new nomui.Alert({
                type: 'info',
                description: {
                  component: 'Flex',
                  rows: [
                    {
                      children: gridRef.getCheckedRowKeys().toString(),
                    },
                  ],
                },
              })
            },
          },
          {
            component: 'Grid',
            ref: (c) => {
              gridRef = c
            },
            rowCheckable: {
              checkedRowKeys: [1, 5],
              onUncheck: ({ row }) => {
                row.permissions.setValue(null, false)
              },
            },
            columns: [
              {
                field: 'menu',
                title: '菜单',
              },
              {
                field: 'permissions',
                title: '权限',
                cellRender: ({ row }) => {
                  return {
                    component: 'CheckboxList',
                    _created: (inst) => {
                      row.permissions = inst
                    },
                    options: [
                      { text: '新增', value: 'add' },
                      { text: '修改', value: 'update' },
                      { text: '删除', value: 'delete' },
                      { text: '查询', value: 'find' },
                    ],
                    onValueChange(args) {
                      if (args.newValue.length) {
                        row.check()
                      }
                    },
                  }
                },
              },
            ],
            data: [
              {
                id: 'department',
                menu: '部门管理',
              },
              {
                id: 'role',
                menu: '角色管理',
              },
              {
                id: 'user',
                menu: '用户管理',
              },
            ],
          },
        ],
      }
    },
  }
})
