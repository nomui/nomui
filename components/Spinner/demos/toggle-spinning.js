define([], function () {
  return {
    title: '切换状态',
    file: 'basic',
    demo: function () {
      return {
        component: 'Rows',
        ref: 'test',
        items: [
          {
            component: 'Spinner',
            ref: 'mySpinner',
            children: {
              component: 'Panel',
              header: {
                caption: {
                  title: 'Spinner带chindren',
                },
              },
              body: {
                children: '可以直接把内容内嵌到 Spin 中，将现有容器变为加载状态。',
              },
            },
          },
          {
            component: 'Button',
            text: '切换',
            events: {
              click: () => {
                const { mySpinner } = this.refs
                mySpinner.update({
                  spinning: !mySpinner.props.spinning,
                })
              },
            },
          },
        ],
      }
    },
  }
})
