define([], function () {
  return {
    title: '列选择+列序号',
    file: 'row-checkable-type',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Grid',
            line: 'both',
            rowCheckable: {
              checkedRowKeys: [5],
              type: 'checker&order',
              width: 80,
              //   align: 'center',
              toolbar: {
                align: 'left', // 工具栏靠左
                placement: 'both', // 工具栏位置 header表头 body表身 both表头+表身
                hover: true,
                render: ({ isHeader, field, row, cellData, rowData, index }) => {
                  // isHeader表示当前渲染在表头，此时还会传出当前field

                  console.log({ isHeader, field, row, cellData, rowData, index })
                  return {
                    component: 'Toolbar',
                    visibleItems: 0,
                    size: 'small',
                    type: 'text',
                    items: [
                      {
                        text: '导出Word',
                        onClick: () => {},
                      },
                      {
                        text: '导出Word',
                        onClick: () => {},
                      },
                      {
                        text: '导出Word',
                        onClick: () => {},
                      },
                    ],
                  }
                },
              },
            },
            allowFrozenCols: {
              showPinner: true,
            },
            columnsCustomizable: true,
            columns: [
              {
                field: 'name',
                title: '标题',
                key: '001',
              },
              {
                field: 'author',
                title: '作者',
                width: 200,
                key: '002',
              },
              {
                field: 'role',
                title: '主角',
                width: 200,
                key: '003',
              },
              {
                field: 'tags',
                title: '标签',
                width: 200,
                key: '004',
                render: function (tags) {
                  const tagItems = tags.map(function (tag) {
                    return {
                      tagobj: tag,
                    }
                  })
                  return {
                    component: 'List',
                    gutter: 'md',
                    items: tagItems,
                    itemDefaults: {
                      styles: {
                        border: '1px',
                        padding: ['x-1', 'y-d125'],
                      },
                      _config: function () {
                        return this.setProps({
                          children: this.props.tagobj,
                        })
                      },
                    },
                  }
                },
              },
              {
                field: 'isMiddle',
                title: '是否中篇',
                width: 200,
                key: '005',
                render: function (isMiddle) {
                  return {
                    component: 'Checkbox',
                    value: isMiddle,
                  }
                },
              },
            ],
            data: [
              {
                id: 0,
                name: '笑傲江湖',
                author: '金庸',
                role: '令狐冲',
                tags: ['中篇', '明朝'],
                isMiddle: true,
              },
              {
                id: 4,
                name: '天龙八部',
                author: '金庸',
                role: '乔峰',
                tags: ['长篇', '宋朝'],
                isMiddle: false,
              },
              {
                id: 5,
                name: '射雕英雄传',
                author: '金庸',
                role: '郭靖',
                tags: ['长篇', '元朝'],
                isMiddle: false,
              },
            ],
          },
        ],
      }
    },
  }
})
