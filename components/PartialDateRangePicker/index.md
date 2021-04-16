选择部分日期范围的控件。

## 何时使用

- 当用户需要选择年 季度 周等时间的时候使用

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 时间模式 | `year` \|`quarter` \| `month` \| `week` | `year` |
| yearRange | 前后年显示范围 | `array` | `[50, 20]` |
| minDate | 最小可选日期，格式与 value 一致 | `string` | - |
| maxDate | 最大可选日期，格式与 value 一致 | `string` | - |
| fieldName | 起止输入框的 name | `object` | `{start:'start',end:'end'}` |
