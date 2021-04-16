define([], function () {
  return {
    title: '指定容器',
    file: 'container',
    demo: function () {
      let container = null

      return {
        component: 'Rows',
        items: [
          {
            ref: (c) => {
              container = c
            },
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
                  container: container,
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
