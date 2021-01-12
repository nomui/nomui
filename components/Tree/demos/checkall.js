define([], function () {
  return {
    title: '额外工具栏 & 全选',
    file: 'checkall',
    demo: function () {
      return {
        children: {
          component: 'Tree',
          treeData: [
            {
              title: 'Node1',
              value: '0-0',
              children: [
                {
                  title: 'Child Node1',
                  value: '0-0-1',
                },
                {
                  title: 'Child Node2',
                  value: '0-0-2',
                  children: [
                    {
                      title: 'Child Child Node1',
                      value: '0-0-0-1',
                    },
                  ],
                },
                {
                  title: 'Child Node3',
                  value: '0-0-3',
                },
              ],
            },
            {
              title: 'Node2',
              value: '0-1',
            },
          ],
          multiple: true,
          showline: true,
          selected: ['0-0-0-1', '0-1'],
          toolbar: {
            placement: 'before',
            item: {
              tag: 'div',
              children: {
                component: 'Button',
                text: '全选',
                events: {
                  click: function () {
                    if (this.props.text === '全选') {
                      this.props.text = '清空'
                      this.update(this.props.text)
                      this.parent.parent.checkAll()
                    } else if (this.props.text === '清空') {
                      this.props.text = '全选'
                      this.update(this.props.text)
                      this.parent.parent.unCheckAll()
                    }
                  },
                },
              },
            },
          },
          onCheck: function (data) {
            console.log(`你选中了：${data}`)
          },
        },
      }
    },
  }
})
