Statistic 统计数值:展示统计数值

## 何时使用

- 当需要突出某个或某组数字时。
- 当需要展示带描述的统计类数据时使用。

## API

| 参数             | 说明             | 类型                        | 默认值 |
| ---------------- | ---------------- | --------------------------- | ------ |
| decimalSeparator | 设置小数点       | `string`                    | `.`    |
| formatter        | 自定义数值展示   | `(value)=>string \| number` | `-`    |
| groupSeparator   | 设置千分位标识符 | `string`                    | `,`    |
| precision        | 数值精度         | `number`                    | `0`    |
| prefix           | 设置数值的前缀   | `Component \| string`       | `-`    |
| suffix           | 设置数值的后缀   | `Component \| string`       | `-`    |
| title            | 数值的标题       | `string`                    | `-`    |
| value            | 数值内容         | `string\|number`            | `-`    |
