当用户需要输入一个时间范围，可以点击标准输入框，弹出时间面板进行选择。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 是否显示清空按钮 | `boolean` | `true` |
| value | 默认值 | `string` | - |
| format | 格式 | `string` | `HH:mm:ss` |
| hourStep | 时步长 | `number` | - |
| minuteStep | 分步长 | `number` | - |
| secondStep | 秒步长 | `number` | - |
| readonly | 是否只读 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| placeholder | placeholder | `string` | - |
| autoPopupEnd | 选择完起始日期后是否自动弹出结束日期面板 | `boolean` | `true` |
| showNow | 是否显示此刻按钮 | `boolean` | `true` |
| minTime | 最小可选时间 | `string` | - |
| maxTime | 最大可选时间 | `string` | - |
| fieldName | 起止输入框的 name | `object` | `{start:'start',end:'end'}` |
| flatValue | 取值是否扁平化 | `boolean` | `true` |
| startPickerProps | 开始时间选择器参数，与 TimePicker 相同 | `object` | `{placeholder:'开始时间'}` |
| endPickerProps | 结束时间选择器参数，与 TimePicker 相同 | `object` | `{placeholder:'结束时间'}` |
