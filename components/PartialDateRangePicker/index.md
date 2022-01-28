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
| autoPopupEnd | 选择完起始日期后是否自动弹出结束日期面板 | `boolean` | `true` |
| fieldName | 起止输入框的 name | `object` | `{start:'start',end:'end'}` |
| flatValue | 取值是否扁平化 | `boolean` | `true` |
| startPickerProps | 开始日期选择器参数，与 PartialDatePicker 相同 | `object` | `{placeholder:'开始日期'}` |
| endPickerProps | 结束日期选择器参数，与 PartialDatePicker 相同 | `object` | `{placeholder:'结束日期'}` |
