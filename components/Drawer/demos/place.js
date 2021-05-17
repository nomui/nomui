define([], function () {
  return {
    title: '渲染在当前dom',
    file: 'renderCurrent',
    demo: function () {
      let containerRef = null
      return {
        component: 'Container',
        ref: (c) => {
          containerRef = c
        },
        attrs: {
          style: { width: '100%', height: '300px', 'background-color': '#fafafa' },
        },
        styles: {
          flex: 'row',
          align: 'center',
          justify: 'center',
        },
        children: [
          {
            component: 'Button',
            type: 'primary',
            text: '渲染在这里',
            onClick: () => {
              new nomui.Drawer({
                maskClosable: false,
                zIndex: 100,
                width: '80%',
                title: '这是一个不允许点击遮罩关闭的抽屉',
                settle: 'left',
                getContainer: () => containerRef,
                content: {
                  component: 'Form',
                  fields: [
                    {
                      component: 'Textbox',
                      name: 'name',
                      label: '姓名',
                    },
                    {
                      component: 'Numberbox',
                      name: 'age',
                      label: '年龄',
                    },
                    {
                      component: 'Textbox',
                      name: 'email',
                      label: 'Email',
                    },
                  ],
                },
              })
            },
          },
          // {
          //   component: 'Drawer',
          //   ref: (c) => {
          //     drawerRef = c
          //   },
          //   placeGlobal: false,
          //   maskClosable: false,
          //   zIndex: 100,
          //   width: '80%',
          //   title: '这是一个不允许点击遮罩关闭的抽屉',
          //   content: {
          //     component: 'Form',
          //     fields: [
          //       {
          //         component: 'Textbox',
          //         name: 'name',
          //         label: '姓名',
          //       },
          //       {
          //         component: 'Numberbox',
          //         name: 'age',
          //         label: '年龄',
          //       },
          //       {
          //         component: 'Textbox',
          //         name: 'email',
          //         label: 'Email',
          //       },
          //     ],
          //   },
          // },
        ],
      }
    },
  }
})
