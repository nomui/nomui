数字微调器:允许用户使用向上/向下微调按钮滚动到一个期望值

## 何时使用

- 数字(decimal)微调
- 百分比(percent)微调
- 货币(currency)

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| style | 微调器类型 | `decimal,currency,percent` | `decimal` |
| currency | 货币类型,style=currency 配合使用。详见[ ISO 4217 currency code list](https://www.currency-iso.org/en/home/tables/table-a1.html) | `string` | `CNY` |
| showSpinner | 是否显示微调按钮 | `boolean` | `true` |
| align | 微调按钮拜访位置 | `left,right,horizontal` | `right` |
| step | 每次改变步数，可以为小数 | `number \| string` | 1 |
| onStep | 点击上下箭头的回调(或聚焦时点击上下按键) | `(value: number, info: { offset: number, type: 'up' \| 'down' }) => void` | - |
| style | 微调器类型 | `decimal,currency,percent` | `decimal` |
| formatter | 指定输入框展示值的格式 | `function(value: number \| string): string` | `null` |
| parser | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 | `function(string): number` | `null` |
