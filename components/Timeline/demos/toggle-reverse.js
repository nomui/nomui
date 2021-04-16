define([], function () {
  return {
    title: '最后一个及排序',
    file: 'last-sort',
    description:
      '当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点，当 pending 为真值时展示幽灵节点，如果 pending 是 React 元素可用于定制该节点内容，同时 pendingDot 将可以用于定制其轴点。reverse 属性用于控制节点排序，为 false 时按正序排列，为 true 时按倒序排列。',
    demo: function () {
      let reverseTimeLine = null

      return {
        component: 'Rows',
        items: [
          {
            component: 'Timeline',
            pending: 'Recording...',
            ref: (c) => {
              reverseTimeLine = c
            },
            reverse: true,
            items: [
              {
                children: 'Create a services site 2015-09-01',
              },
              {
                children: 'Solve initial network problems 2015-09-01',
              },
              {
                children: 'Technical testing 2015-09-01',
              },
              {
                children: 'Network problems being solved 2015-09-01',
              },
            ],
          },
          {
            component: 'Button',
            text: '切换',
            onClick: () => {
              const reverse = reverseTimeLine.props.reverse
              reverseTimeLine.update({
                reverse: !reverse,
              })
            },
          },
        ],
      }
    },
  }
})
