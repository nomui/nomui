define([], function () {
  return {
    title: '子项（FlexItem） 配置',
    file: 'cols',
    description:
      '子项除了通用的配置外，还可通过 `grow` 配置占满剩余空间，通过 `shrink` 配置收缩到内容大小，通过 `span` 配置所占空间的比例（1 ~ 12）',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'medium',
        cols: [
          {
            span: 6,
            children: '第一列',
          },
          {
            grow: true,
            children: '第二列',
          },
          {
            shrink: true,
            children: '第三列',
          },
        ],
        itemDefaults: {
          styles: {
            color: 'lprimary-light',
            border: '1px',
            padding: '1',
          },
        },
      }
    },
  }
})
