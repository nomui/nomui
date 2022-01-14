复选框

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 显示的文字 | `string` | - |
| partChecked | 是否部分选中 | `boolean` | false |
| disabled | 是否禁用 | `boolean` | false |
| onValueChange | 值变化的时候触发 | `(changed:{name:string,newValue:boolean,oldValue:boolean,sender:obj})=>void` | - |

## 事件

| 参数  | 说明     | 类型 |
| ----- | -------- | ---- |
| focus | 获取焦点 | -    |
| blur  | 取消焦点 | -    |
