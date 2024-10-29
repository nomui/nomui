通用列表。

## 何时使用

- 最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gutter | 栅格间隔 | `'sm'\|'md'\|'lg'` | - |
| line | 分割线、网格线、交叉线 | `'null'\|'split'\|'grid'\|'cross'` | null |
| items | 列表数据源 | `[]` | - |
| data | 为自定义渲染列表时的数据源 | `[]` | - |
| itemRender | 自定义渲染函数 | `function` | ({itemData}) => ({children: itemData}) |
| disabledItems | 禁用的选项，传入想要禁用选项的 key 的数组 | `[key]` | - |
| itemDefaults | 列表数据源的统一默认配置(仅在数据源使用 items 时有效) | `ComponentProps` | - |
| itemSelectable | 子项是否可选中的配置 | `object` | - |
| cols | 列表展示为多少列 | `'number'` | - |
| onItemSelectionChange | 当列表选项改变时触发 | `'function'` | - |
| showEmpty | 数据为空的时候是否显示空信息提示，可以是布尔值也可以是`{Empty组件的属性}` | `boolean \| object` | `false` |
| virtual | 开启虚拟渲染，值为 number 则为可视区的高度配置（number 默认为 400） | `boolean\|number` | false |
| sortable | ListItem 是否可拖拽排序 | `object\|boolean` | false |
| loadMore | 是否支持加载更多项 | `object\|boolean` | false |
| vertical | 列表是否纵向排列 | `boolean` | false |

### itemSelectable

| 参数           | 说明                         | 类型              | 默认值 |
| -------------- | ---------------------------- | ----------------- | ------ |
| multiple       | 是否允许多选                 | `boolean`         | false  |
| byClick        | 点击项目时选中               | `boolean`         | false  |
| scrollIntoView | 选中项是否自动滚动到可视区域 | `object\|boolean` | false  |

#### scrollIntoView

| 参数       | 说明             | 类型                 | 默认值      |
| ---------- | ---------------- | -------------------- | ----------- |
| block      | 自动滚动对齐位置 | `start\|center\|end` | `center`    |
| scrollMode | 滚动选项         | `always\|if-needed`  | `if-needed` |

### sortable

表格行可拖动顺序

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| draggableName | 允许拖拽的项目类名 | `.clasNmae` | - |
| disabledDragKeys | 不可拖拽选项的 key 的数组 | `[key]` | false |
| handleClassName | 为简单 css 选择器的字符串，使列表单元中符合选择器的元素成为拖动的手柄 | `.clasNmae` | `.could-drag` |
| onEnd | ListItem 每次拖拽完成的回调 | `function` | - |

### loadMore

加载更多项的配置，必须配置 `resolve`函数，返回加载出的更多的数据

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 点击加载更多的文字 | `string` | `加载更多~` |
| resolve | 返回值为数据数组或`Promise`的函数，返回空数组或`null`时会隐藏按钮 | `() => option[] \| Promise.resolve(option[])` | - |

## Method

| 方法名          | 说明                         | 参数                                          |
| --------------- | ---------------------------- | --------------------------------------------- |
| prependDataItem | 在 List 数据第一条添加数据   | listItem                                      |
| appendDataItem  | 在 List 数据最后一条添加数据 | listItem                                      |
| scrollTo        | 滚动到某一项                 | key \| keyFunction \| Component               |
| selectItem      | 选中某一项                   | key \| keyFunction \| Component, selectOption |
| unselectItem    | 取消选中某一项               | key \| keyFunction \| Component, selectOption |
| getLastDragItem | 获取上一次拖拽的 item 数据   | -                                             |
