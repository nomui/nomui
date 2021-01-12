define([], function () {
  return {
    title: '槽（填充）',
    file: 'gutter',
    demo: function () {
      let layout = null

      return {
        children: [
          {
            ref: (c) => {
              layout = c
            },
            children: [
              {
                children: [
                  {
                    component: 'Button',
                    text: 'button-item',
                  },
                ],
              },
              {
                children: [
                  {
                    component: 'Button',
                    text: 'button-item',
                  },
                ],
              },
              {
                children: [
                  {
                    component: 'Button',
                    text: 'button-item',
                  },
                ],
              },
            ],
            childDefaults: {
              styles: {
                color: 'lprimary-light',
                border: '1px',
              },
            },
            styles: {
              flex: 'row',
              color: 'lprimary',
              gutter: 'md',
            },
          },
          {
            children: [
              {
                component: 'RadioList',
                options: [
                  {
                    text: 'row',
                    value: 'row',
                  },
                  {
                    text: 'column',
                    value: 'column',
                  },
                ],
                value: 'row',
                onValueChange: function (changed) {
                  layout.update({ styles: { flex: changed.newValue } })
                },
              },
              {
                component: 'RadioList',
                options: [
                  {
                    text: 'gutter-sm',
                    value: 'sm',
                  },
                  {
                    text: 'gutter-md',
                    value: 'md',
                  },
                  {
                    text: 'gutter-lg',
                    value: 'lg',
                  },
                  {
                    text: 'gutter-1px',
                    value: '1px',
                  },
                  {
                    text: 'gutter-2px',
                    value: '2px',
                  },
                ],
                value: 'md',
                onValueChange: function (changed) {
                  layout.update({ styles: { gutter: changed.newValue } })
                },
              },
            ],
          },
        ],
      }
    },
  }
})
