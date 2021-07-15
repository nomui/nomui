define([], function () {
  return {
    title: '简写',
    file: 'shorthand',
    description:
      '`Flex` 组件的名为 `rows`，`cols` 的 props 本来是用来配置其类型为 `FlexItem` 的子组件的，但是因为多数时候真正需要配置的是其 `FlexItem` 子组件的子组件，或者需要嵌套 `Flex`，所以做了一些约定，当满足如下条件时数组元素配置的是其子组件（`FlextItem` 类型）的子组件。1 数组的元素有 `component` 且其值不为 `FlexItem` 时；2 数组元素有 `rows` 或 `cols` 且无 `component` （会做为 `Flex` 组件） 时 ',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          '第一行',
          {
            gap: 'small',
            cols: [
              {
                children: '第二行第一列',
              },
              {
                children: '第二行第二列',
              },
            ],
          },
          {
            component: 'Button',
            text: '第三行',
          },
        ],
      }
    },
  }
})
