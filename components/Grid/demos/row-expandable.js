define([], function () {
  return {
    title: '可展开',
    file: 'row-expandable',
    demo: function () {
      let gridRef = null
      return {
        component: 'Flex',
        rows: [
          {
            component: 'Button',
            text: '动态添加',
            onClick: () => {
              gridRef.getRow(5).update({
                data: {
                  id: 5,
                  name: '绝代双骄',
                  author: '古龙',
                  description:
                    '《绝代双骄》：古龙武侠巨著，讲述孪生兄弟江小鱼与花无缺，历经江湖恩怨，最终相认的故事。',
                },
              })
            },
          },
          {
            component: 'Grid',
            ref: (c) => {
              gridRef = c
            },
            rowSortable: {
              onEnd: () => {},
            },
            rowExpandable: {
              render: ({ rowData, row }) => {
                if (!rowData.description) {
                  return false
                }
                return {
                  ref: (c) => {
                    row.subContent = c
                  },
                  children: rowData.description,
                }
              },
            },
            columns: [
              {
                field: 'name',
                key: 'name',
                title: '书名',
                width: 200,
                sortable: true,
              },
              {
                field: 'author',
                key: 'author',
                title: '作者',
              },
              {
                field: 'actions',
                title: '操作',
                cellRender: ({ row }) => {
                  return {
                    component: 'Button',
                    text: '删除',
                    onClick: () => {
                      gridRef.removeRow(row, { removeExpandedRow: true })
                    },
                  }
                },
              },
            ],
            data: [
              {
                id: 1,
                name: '笑傲江湖',
                author: '金庸',
                description:
                  '《笑傲江湖》是中国现代作家金庸创作的一部长篇武侠小说，开始创作于1967年并连载于《明报》，1969年完成。这部小说通过叙述华山派大弟子令狐冲的江湖经历，反映了武林各派争霸夺权的历程。作品没有设置时代背景，“类似的情景可以发生在任何朝代”，折射出中国人独特的政治斗争状态，同时也表露出对斗争的哀叹，具有一定的政治寓意。小说情节跌宕起伏，波谲云诡，人物形象个性鲜明，生动可感。',
              },
              { id: 4, name: '天龙八部', author: '金庸', description: '天龙八部说明' },
              { id: 5, name: '绝代双骄', author: '古龙', description: '绝代双骄说明' },
            ],
          },
        ],
      }
    },
  }
})
