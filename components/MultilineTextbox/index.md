通过鼠标或键盘输入比较多的内容，是最基础的表单域的包装。

## API

| 参数      | 说明             | 类型                                       | 默认值 |
| --------- | ---------------- | ------------------------------------------ | ------ |
| autofocus | 是否自动获得焦点 | `boolean`                                  | -      |
| autoSize  | 自适应内容高度   | `boolean\|{minRows:number,maxRows:number}` | false  |
| maxLength | 内容最大长度     | `number`                                   | -      |
| value     | 输入框内容       | `string`                                   | -      |

## 事件

| 参数       | 说明           | 类型                   |
| ---------- | -------------- | ---------------------- |
| focus      | 获取焦点       | -                      |
| blur       | 取消焦点       | -                      |
| \_getValue | 获取文本框的值 | `()=>string`           |
| \_setValue | 为文本框设置值 | `(value:string)=>void` |
