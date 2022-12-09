define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    description:
      '当使用Tag组件删除回调时，建议使用 removable:true , onRemove: (args) => { }, 这种用法',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        cols: [
          {
            component: 'Tag',
            text: 0,
            onClick: () => { },
          },
          {
            component: 'Tag',
            text: '带图标',
            icon: 'plus',
          },
          {
            component: 'Tag',
            text: '带右侧图标',
            rightIcon: 'edit',
          },
          {
            component: 'Tag',
            text: '带数字',
            number: '5',
          },
          {
            component: 'Tag',
            text: '尺寸',
            size: 'xxl',
          },
          {
            component: 'Tag',
            text: '颜色',
            color: 'red',
          },
          {
            component: 'Tag',
            text: '颜色',
            color: 'orange',
          },
          {
            component: 'Tag',
            text: '颜色',
            color: 'yellow',
          },
          {
            component: 'Tag',
            text: '颜色',
            color: 'olive',
          },
          {
            component: 'Tag',
            text: '颜色',
            color: 'green',
          },
          {
            component: 'Tag',
            text: '颜色',
            color: 'teal',
          },
          {
            component: 'Tag',
            text: '颜色',
            color: 'blue',
          },
          {
            component: 'Tag',
            text: '颜色',
            color: 'violet',
          },
          {
            component: 'Tag',
            text: '颜色',
            color: 'purple',
          },
          {
            component: 'Tag',
            text: '颜色',
            color: 'pink',
          },
          {
            component: 'Tag',
            text: '颜色',
            color: 'brown',
          },
          {
            component: 'Tag',
            text: '颜色',
            color: 'crimson',
          },
          {
            component: 'Tag',
            text: '颜色',
            color: 'skyblue',
          },
          {
            component: 'Tag',
            text: '颜色',
            color: 'silver',
          },

          {
            component: 'Tag',
            text: '药丸型',
            type: 'round',
            color: 'red',
          },
          {
            component: 'Tag',
            text: '可删除',
            type: 'round',
            key: '001',
            removable: true,
            onRemove: (args) => {
              console.log(args)
            },
          },
        ],
      }
    },
  }
})
