表单元素项，可以用来组合 labe 跟 Control 类型组件

## API

| 参数            | 说明                   | 类型            | 默认值      |
| --------------- | ---------------------- | --------------- | ----------- |
| type           | 字段类型               | `Single`\|`Group`\|`List`\|`Matrix`        | `Single`        |
| name           | 字段名称               | `string`        | `__field` + 自增长序号        |
| value           | 字段值               | `string`        | -           |
| label           | 标签文本      | `string`        | -           |
| labelAlign      | 标签对齐方式，当为 none 值时表示不显示 label 栏         | `left`\|`right`\|`top`\|`none`   | 'right'     |
| invalidTipAlign | 验证错误信息提示的位置 | `Layer层组合值` | `top right` |
| control         | 关联的 Control 组件，当 `type` 为 `Single` 时使用    | `Props`         | -           |
| fields         | 子字段数组，当 `type` 不为 `Single` 时使用    | `Array`         | -           |
| inline         | 内联布局，当 `type` 为 `Group` 时有效    | `Boolean`         | -           |
| striped         | 条纹样式，标签栏有背景色，当 `type` 为 `Group` 时有效    | `Boolean`         | -           |
| line         | 线条样式，当 `type` 为 `Group` 时有效    | `splitline`\|`outline`         | -           |

## Method

| 方法名称 | 说明                    | 参数          |
| -------- | ----------------------- | ------------- |
| focus    | 获得焦点                |               |
| blur     | 失焦                    |               |
| getValue | 获取 value 值           |               |
| setValue | 设置 value 值           | `(value)=>{}` |
| validate | 验证 |               |
| getField | 获取子字段，参数为字段名，可有圆点分隔，例如`foo.bar`来获取多层级的子孙字段 |               |
