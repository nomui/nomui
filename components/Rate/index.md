Rate 评分

## 何时使用

- 对评价进行展示
- 对事物进行快速的评级操作

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 是否允许再次点击后清除 | `boolean` | `true` |
| allowHalf | 是否允许半选 | `boolean` | `false` |
| character | 自定义字符 | `fuction\|string` | `-` |
| count | star 总数 | `number` | `5` |
| defaultValue | 默认值 | `number` | `0` |
| value | 当前数，受控值 | `number` | `-` |
| tooltips | 自定义每项的提示信息 | `string[]` | `-` |
| onValueChange | 值变化的时候触发 | `(changed:{name:string,newValue:boolean,oldValue:boolean,sender:obj})=>void` | `-` |
