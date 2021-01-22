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

## Method

| 方法名称 | 说明                    | 参数          |
| -------- | ----------------------- | ------------- |
| focus    | 获得焦点                |               |
| blur     | 失焦                    |               |
| getValue | 获取 value 值           |               |
| setValue | 设置 value 值           | `(value)=>{}` |
| validate | 验证 |               |
