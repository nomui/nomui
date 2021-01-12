表单元素项，可以用来组合 labe 跟 Control 类型组件

## API

| 参数            | 说明                   | 类型            | 默认值      |
| --------------- | ---------------------- | --------------- | ----------- |
| value           | 显示的值               | `string`        | -           |
| label           | 显示的 label 文字      | `string`        | -           |
| labelAlign      | label 对齐方式         | `left\|right`   | 'right'     |
| invalidTipAlign | 验证错误信息提示的位置 | `Layer层组合值` | `top right` |
| control         | 关联的 Control 组件    | `Props`         | -           |

## Method

| 方法名称 | 说明                    | 参数          |
| -------- | ----------------------- | ------------- |
| focus    | 获得焦点                |               |
| blur     | 失焦                    |               |
| getValue | 获取 value 值           |               |
| setValue | 设置 value 值           | `(value)=>{}` |
| validate | 验证关联的 Control 组件 |               |
