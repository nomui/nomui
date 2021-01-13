define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
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
                this.Loading = new nomui.Loading({})
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
