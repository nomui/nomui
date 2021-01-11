define([], function () {
  return {
    title: '切换状态',
    file: 'basic',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            component: 'Spinner',
            ref: 'mySpinner',
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
