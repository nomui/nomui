开关选择器

## 何时使用

需要表示开关状态/两种状态之间的切换时

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 指定 Switch 的大小 | `xsmall\|small\|large\|xlarge` | default |
| selectedText | 自定义选中时的显示文本 | `string` | - |
| unselectedText | 自定义未选中时的显示文本 | `string` | - |
| name | 自定义表单项的 name 属性 | `string` | - |
| value | 是否选中状态 | `boolean` | - |
| onValueChange | 值变化的时候触发 | `(changed:{name:string,newValue:boolean,oldValue:boolean,sender:obj})=>void` | - |
