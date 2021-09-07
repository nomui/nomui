## 何时使用

- Flex 弹性布局

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 不为空表示行布局 `flex-direction: column` | `array` | - |
| cols | 不为空表示列布局 `flex-direction: row` | `string` | - |
| direction | 优先根据`rows`或`cols`自动计算出 | `row\|column` | column |
| wrap | 是否换行 | `boolean` | false |
| justify | 排列方式 | `start\|end\|canter\|between\|around` | - |
| align | 对齐方式 | `start\|end\|stretch` | - |
| fills | 是否按内容占满空间 | `boolean` | false |
| gap | 子项之间的间距大小 | `small\|medium\|large` | - |
| gutter | 子项内部的填充大小 | `small\|medium\|large` | - |
| inline | 设置布局为`display: inline-flex` | `boolean` | - |
| fit | 设置高度占满`height: 100%` | `boolean` | - |
| itemDefaults | 子项配置 | `object` | - |

### rows 和 cols

> 会根据`rows`和`cols`是否有值计算出`flex-direction`的值（优先级: rows>cols）

其`props`是用来配置其类型为 `FlexItem` 的子组件的，但是因为多数时候真正需要配置的是其 FlexItem 子组件的子组件，或者需要嵌套 Flex

所以做了一些约定，当满足如下条件时数组元素配置的是其子组件（FlextItem 类型）的子组件

- 数组的元素有 component 且其值不为 `FlexItem` 时；
- 数组元素有 rows 或 cols 且无 `component`时(`Flex嵌套`，省略 component 写法)

### FlexItem

| 参数   | 说明                                        | 类型      | 默认值 |
| ------ | ------------------------------------------- | --------- | ------ |
| grow   | item 是否占满空间                           | `boolean` | false  |
| shrink | item 是否收缩内容                           | `boolean` | false  |
| span   | item 所占比例                               | `1-12`    | -      |
| isBody | 和 fit 结合使用 item 会设置`overflow: auto` | `boolean` | false  |
