通用列表。

## 何时使用

- 最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

## API

| 参数      | 说明               | 类型             | 默认值  |
| --------- | ------------------ | ---------------- | ------- |
| gutter      | 栅格间隔      | `'sm'\|'md'\|'lg'`      | -      |
| line      | 分割线、网格线、交叉线      | `'null'\|'split'\|'grid'\|'cross'`      | null      |
| items      | 列表数据源      | `[]`      | -      |
| itemDefaults      | 列表数据源的统一默认配置      | `{}`      | -      |
| cols      | 列表展示为多少列      | `'number'`      | -      |
| onItemSelectionChange      | 当列表选项改变时触发      | `'function'`      | -      |
| virtualOpen      | 开启虚拟渲染，值为 number 则为可视区的高度配置（number默认为400）      | `boolean\|number`      | false      |



### itemSelectable

| 参数      | 说明               | 类型             | 默认值  |
| --------- | ------------------ | ---------------- | ------- |
| multiple   | 是否允许多选           | `boolean`                              | false  |
| byClick      | 点击项目时选中 | `boolean`         | false       |






