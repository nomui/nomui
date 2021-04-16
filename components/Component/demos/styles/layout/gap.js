define([], function () {
  return {
    title: '间隔',
    file: 'gap',
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
                children: 'flex-item',
              },
              {
                children: 'flex-item',
              },
              {
                children: 'flex-item',
              },
            ],
            childDefaults: {
              styles: {
                color: 'lprimary-light',
                border: '1px',
                padding: '1',
              },
            },
            styles: {
              flex: 'row',
              color: 'lprimary',
              gap: 'md',
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
                    text: 'gap-sm',
                    value: 'sm',
                  },
                  {
                    text: 'gap-md',
                    value: 'md',
                  },
                  {
                    text: 'gap-lg',
                    value: 'lg',
                  },
                  {
                    text: 'gap-1px',
                    value: '1px',
                  },
                ],
                value: 'md',
                onValueChange: function (changed) {
                  layout.update({ styles: { gap: changed.newValue } })
                },
              },
            ],
          },
        ],
      }
    },
  }
})
