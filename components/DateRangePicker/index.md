选择日期范围的控件。

## 何时使用

- 选择日期范围。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| format | 格式 | `string` | `yyyy-MM-dd` |
| minDate | 最小可选日期 | `string` | - |
| maxDate | 最大可选日期 | `string` | - |
| yearRange | 前后年显示范围 | `array` | `[50,20]` |
| showTime | 是否显示时间，需要显示的时候建议传一个对象，内部包含 TimePicker 的 props | `object` | false |
| allowClear | 是否显示清空按钮 | `boolean` | `true` |
| autoPopupEnd | 选择完起始日期后是否自动弹出结束日期面板 | `boolean` | `true` |
| onChange | 面板关闭且值发生改变时触发回调 | `function` | - |
| fieldName | 起止输入框的 name | `object` | `{start:'start',end:'end'}` |
| flatValue | 取值是否扁平化 | `boolean` | `true` |
| startPickerProps | 开始日期选择器参数，与 DatePicker 相同 | `object` | `{placeholder:'开始日期'}` |
| endPickerProps | 结束日期选择器参数，与 DatePicker 相同 | `object` | `{placeholder:'结束日期'}` |
