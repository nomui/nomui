define([], function () {
  return {
    title: '额外已选中列表',
    file: 'extra-options',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            children: '某些特殊需求，数据不在options列表内，但是要可以显示跟取值，可以这样配置。',
          },
          {
            component: 'Select',
            multiple: true,
            placeholder: '选择你喜欢的作者',
            value: [1, 2, 100], // value包括不在选项内的值

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
            extraOptions: [
              // 额外的选项，格式跟options一致，但是不会显示在下拉列表当中
              {
                text: '乱入的',
                value: 100,
                shide: true,
              },
            ],
            onValueChange: (args) => {
              console.log(args.newValue)
            },
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
