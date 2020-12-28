define([], function () {
  return {
    title: '间隔',
    file: 'gap',
    demo: function () {
      const demo = this

      return {
        children: [
          {
            ref: 'layout',
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
                events: {
                  valueChange: function (changed) {
                    demo.refs.layout.update({ styles: { flex: changed.newValue } })
                  },
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
                events: {
                  valueChange: function (changed) {
                    demo.refs.layout.update({ styles: { gap: changed.newValue } })
                  },
                },
              },
            ],
          },
        ],
      }
    },
  }
})
