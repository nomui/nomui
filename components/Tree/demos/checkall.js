define([], function () {
  return {
    title: '额外工具栏 & 全选',
    file: 'checkall',
    demo: function () {
      let mybutton = null
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
          selectedNodes: ['0-0-0-1', '0-1'],
          toolbar: {
            placement: 'before',
            item: {
              tag: 'div',
              children: {
                component: 'Button',
                text: '全选',
                ref: (c) => {
                  // eslint-disable-next-line no-unused-vars
                  mybutton = c
                },
                onClick: function () {
                  if (mybutton.props.text === '全选') {
                    mybutton.props.text = '清空'
                    mybutton.update(mybutton.props.text)
                    mybutton.parent.parent.checkAll()
                  } else if (mybutton.props.text === '清空') {
                    mybutton.props.text = '全选'
                    mybutton.update(mybutton.props.text)
                    mybutton.parent.parent.unCheckAll()
                  }
                },
              },
            },
          },
          onCheck: function (param) {
            console.log(`你选中了：${param.items}。`)
          },
        },
      }
    },
  }
})
