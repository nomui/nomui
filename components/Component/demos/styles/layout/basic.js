define([], function () {
  return {
    title: '排列与对齐',
    file: 'basic',
    demo: function () {
      let layout = null
      let flexDir = 'row'
      let flexFills = false

      return {
        children: [
          {
            ref: (c) => {
              layout = c
            },
            styles: {
              flex: 'row',
              color: 'lprimary',
              align: 'center',
              justify: 'center',
            },
            attrs: {
              style: {
                height: '100px',
              },
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
                padding: '1',
                border: '1px',
              },
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
                  let height = '100px'
                  if (changed.newValue === 'column') {
                    height = '200px'
                  }
                  flexDir = changed.newValue
                  const flexArr = [flexDir]
                  if (flexFills !== false) {
                    flexArr.push(flexFills)
                  }
                  layout && layout.update({
                    attrs: {
                      style: {
                        height: height,
                      },
                    },
                    styles: { flex: flexArr },
                  })
                },
              },
              {
                component: 'RadioList',
                options: [
                  {
                    text: 'align-items-start',
                    value: 'start',
                  },
                  {
                    text: 'align-items-end',
                    value: 'end',
                  },
                  {
                    text: 'align-items-center',
                    value: 'center',
                  },
                  {
                    text: 'align-items-stretch (default)',
                    value: 'stretch',
                  },
                ],
                value: 'center',
                onValueChange: function (changed) {
                  layout && layout.update({ styles: { align: changed.newValue } })
                },
              },
              {
                component: 'RadioList',
                options: [
                  {
                    text: 'justify-conten-start (default)',
                    value: 'start',
                  },
                  {
                    text: 'justify-conten-end',
                    value: 'end',
                  },
                  {
                    text: 'justify-conten-center',
                    value: 'center',
                  },
                  {
                    text: 'justify-conten-between',
                    value: 'between',
                  },
                  {
                    text: 'justify-conten-around',
                    value: 'around',
                  },
                ],
                value: 'center',
                onValueChange: function (changed) {
                  layout && layout.update({
                    styles: {
                      justify: changed.newValue,
                    },
                  })
                },
              },
              {
                component: 'Checkbox',
                text: 'fills',
                onValueChange: function (changed) {
                  flexFills = changed.newValue
                  const flexArr = [flexDir]
                  if (flexFills !== false) {
                    flexArr.push('fills')
                  } else {
                    flexArr.push(false)
                  }
                  layout.update({
                    styles: {
                      flex: flexArr,
                    },
                  })
                },
              },
            ],
          },
        ],
      }
    },
  }
})
