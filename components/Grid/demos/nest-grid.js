define(['css!./nested-grid'], function () {
  return {
    title: '可展开-其他配置',
    file: 'nest-grid',
    demo: function () {
      return {
        component: 'Grid',
        rowExpandable: {
          // 自定义展开图标
          expandedProps: {
            type: 'up',
          },
          collapsedProps: {
            type: 'down',
          },
          expandSingle: true, // 手风琴模式
          onExpand: ({ sender, row }) => {
            // 行展开回调
            sender.element.querySelectorAll('.expand-highlight').forEach((el) => {
              el.classList.remove('expand-highlight')
            })
            row.element.classList.add('expand-highlight')
            row.expandedRow.element.classList.add('expand-highlight')
          },
          onCollapse: (args) => {
            // 行折叠回调
            console.log('onCollapse', args)
          },
          render: ({ rowData }) => {
            return {
              component: 'Grid',
              columns: [
                { field: 'name', title: '人物' },
                { field: 'sect', title: '门派' },
              ],
              data: rowData.roles,
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
        ],
        data: [
          {
            id: 1,
            name: '笑傲江湖',
            author: '金庸',
            roles: [
              { name: '令狐冲', sect: '华山派' },
              { name: '任盈盈', sect: '日月神教' },
            ],
            description:
              '《笑傲江湖》是中国现代作家金庸创作的一部长篇武侠小说，开始创作于1967年并连载于《明报》，1969年完成。这部小说通过叙述华山派大弟子令狐冲的江湖经历，反映了武林各派争霸夺权的历程。作品没有设置时代背景，“类似的情景可以发生在任何朝代”，折射出中国人独特的政治斗争状态，同时也表露出对斗争的哀叹，具有一定的政治寓意。小说情节跌宕起伏，波谲云诡，人物形象个性鲜明，生动可感。',
          },
          { id: 4, name: '天龙八部', author: '金庸' },
          { id: 5, name: '绝代双骄', author: '古龙' },
        ],
      }
    },
  }
})
