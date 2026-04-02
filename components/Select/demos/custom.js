define(['css!./style.css'], function () {
  return {
    title: '自定义选项及选中项的呈现',
    file: 'custom',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Select',
            options: [
              { color: '#5484ED', value: 1, text: 'Option 1' },
              { color: '#A4BDFC', value: 2, text: 'Option 2' },
              { color: '#7AE7BF', value: 3, text: 'Option 3' },
              { color: '#51B749', value: 4, text: 'Option 4' },
              { color: '#FBD75B', value: 5, text: 'Option 5' },
            ],
            popupClasses: {
              'wt-tag-select-popup': true,
            },
            optionDefaults: {
              onConfig: ({ inst }) => {
                const { color, text } = inst.props
                inst.setProps({
                  children: {
                    component: 'Flex',
                    items: [
                      {
                        attrs: {
                          style: {
                            flexGrow: 1,
                          },
                        },
                        children: {
                          component: 'Tag',
                          color: color,
                          text: text,
                        },
                      },
                      {
                        component: 'Icon',
                        type: 'check-circle',
                      },
                    ],
                  },
                })
              },
            },
          },
          {
            component: 'Select',
            multiple: true,
            placeholder: '选择你喜欢的作者',
            value: [1, 2],
            options: [
              {
                text: '小李',
                value: 0,
              },
              {
                text: '小张',
                value: 1,
              },
              {
                text: '小王',
                value: 2,
              },
              {
                text: '小吴',
                value: 3,
              },
            ],
            optionDefaults: {
              _config: function () {
                const { text } = this.props
                this.setProps({
                  children: {
                    component: 'Flex',
                    align: 'center',
                    cols: [
                      {
                        component: 'Avatar',
                        text: text,
                      },
                      {
                        children: text,
                      },
                    ],
                  },
                })
              },
            },
            selectedMultiple: {
              itemDefaults: {
                _config: function () {
                  const { option } = this.props
                  if (option) {
                    this.setProps({
                      children: {
                        component: 'Avatar',
                        text: option.text,
                      },
                    })
                  }
                },
              },
            },
          },
        ],
      }
    },
  }
})
