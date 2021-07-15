通用列表。

## 何时使用

- 最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gutter | 栅格间隔 | `'sm'\|'md'\|'lg'` | - |
| line | 分割线、网格线、交叉线 | `'null'\|'split'\|'grid'\|'cross'` | null |
| items | 列表数据源 | `[]` | - |
| disabledItems | 禁用的选项，传入想要禁用选项的 key 的数组 | `[key]` | - |
| itemDefaults | 列表数据源的统一默认配置 | `{}` | - |
| cols | 列表展示为多少列 | `'number'` | - |
| onItemSelectionChange | 当列表选项改变时触发 | `'function'` | - |
| showEmpty | 数据为空的时候是否显示空信息提示，可以是布尔值也可以是`{Empty组件的属性}` | `boolean \| object` | `false` |
| virtual | 开启虚拟渲染，值为 number 则为可视区的高度配置（number 默认为 400） | `boolean\|number` | false |
| sortable | ListItem 是否可拖拽排序 | `object\|boolean` | false |

### itemSelectable

| 参数     | 说明           | 类型      | 默认值 |
| -------- | -------------- | --------- | ------ |
| multiple | 是否允许多选   | `boolean` | false  |
| byClick  | 点击项目时选中 | `boolean` | false  |

### rowSortable

表格行可拖动顺序

| 参数  | 说明                        | 类型     | 默认值 |
| ----- | --------------------------- | -------- | ------ |
| onEnd | ListItem 每次拖拽完成的回调 | `()=>{}` | -      |

## Method

| 方法名          | 说明                         | 参数                                          |
| --------------- | ---------------------------- | --------------------------------------------- |
| prependDataItem | 在 List 数据第一条添加数据   | listItem                                      |
| appendDataItem  | 在 List 数据最后一条添加数据 | listItem                                      |
| scrollTo        | 滚动到某一项                 | key \| keyFunction \| Component               |
| selectItem      | 选中某一项                   | key \| keyFunction \| Component, selectOption |
| unselectItem    | 取消选中某一项               | key \| keyFunction \| Component, selectOption |
| getLastDragItem | 获取上一次拖拽的 item 数据   | -                                             |
