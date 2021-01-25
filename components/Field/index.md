表单元素项，可以用来组合 labe 跟 Control 类型组件

## API

| 参数            | 说明                   | 类型            | 默认值      |
| --------------- | ---------------------- | --------------- | ----------- |
| name           | 字段名称，未设置时会自动设置一个自增格式               | `string`        | `__field` + 自增长序号        |
| value           | 字段值               | `string`        | -           |
| label           | 标签文本，当未定义或为 null 时不显示标签栏      | `string`        | -           |
| labelAlign      | 标签对齐方式      | `left`\|`right`\|`top`   | `right`     |
| invalidTipAlign | 验证错误信息提示的位置 | `Layer层组合值` | `top right` |
| notShowLabel      | 不显示标签，不管 label 是否设置      | `boolean`   | `false`    |
| control      | 字段控件设置，可自定义配置控件内容，或者在特定字段类型中配置      | `props`   | -    |

## Method

| 方法名称 | 说明                    | 参数          |
| -------- | ----------------------- | ------------- |
| focus    | 获得焦点                |               |
| blur     | 失焦                    |               |
| getValue | 获取 value 值           |               |
| setValue | 设置 value 值           | `(value)=>{}` |
| validate | 验证                    |               |
| reset    | 重置字段值为初始值       |               |
| clear    | 清除字段值              |               |
