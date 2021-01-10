define([], function () {
  return {
    title: '指定容器',
    file: 'basic',
    demo: function () {
      const demo = this

      return {
        component: 'Rows',
        items: [
          {
            ref: 'container',
            styles: {
              padding: '4',
              border: '1px',
            },
            children: 'container',
          },
          {
            component: 'Checkbox',
            text: '加载中',
            onValueChange: function (changed) {
              if (changed.newValue === true) {
                this.Loading = new nomui.Loading({
                  container: demo.refs.container,
                })
              } else {
                this.Loading.remove()
              }
            },
          },
        ],
      }
    },
  }
})
