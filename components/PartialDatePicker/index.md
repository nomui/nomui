选择部分日期的控件。

## 何时使用

- 当用户需要选择年 季度 周等时间的时候使用

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 时间模式 | `year` \|`quarter` \| `month` \| `week` | `year` |
| yearRange | 前后年显示范围 | `array` | `[50, 20]` |
| allowClear | 是否显示清空按钮 | `booean` | `true` |
| onChange | 面板关闭且值发生变化时触发回调 | `function` | - |
| placeholder | placeholder | `string` | - |
| value | 默认值，格式为`2020`\|`2020 1季度` \| `2020-01` \| `2020 15周` | `string` | - |
| minDate | 最小可选日期，格式与 value 一致 | `string` | - |
| maxDate | 最大可选日期，格式与 value 一致 | `string` | - |

## METHODS

| 方法名        | 说明                         | 参数     |
| ------------- | ---------------------------- | -------- |
| getDateString | 获取对应时间段的详细开始日期 | `format` |
