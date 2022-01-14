通过鼠标或键盘，输入范围内的数值。

## 何时使用

- 当需要获取标准数值时。

## API

| 参数      | 说明       | 类型     | 默认值                  |
| --------- | ---------- | -------- | ----------------------- |
| value     | 输入框内容 | `number` | -                       |
| min       | 最小值     | `number` | Number.MIN_SAFE_INTEGER |
| max       | 最大值     | `number` | Number.MAX_SAFE_INTEGER |
| precision | 数值精度   | `number` | 0                       |

## 事件

| 参数       | 说明           | 类型                   |
| ---------- | -------------- | ---------------------- |
| focus      | 获取焦点       | -                      |
| blur       | 取消焦点       | -                      |
| \_getValue | 获取文本框的值 | `()=>string`           |
| \_setValue | 为文本框设置值 | `(value:string)=>void` |
