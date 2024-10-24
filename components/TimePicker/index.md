当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。

## API

| 参数        | 说明             | 类型      | 默认值     |
| ----------- | ---------------- | --------- | ---------- |
| allowClear  | 是否显示清空按钮 | `boolean` | `true`     |
| value       | 默认值           | `string`  | -          |
| format      | 格式             | `string`  | `HH:mm:ss` |
| hourStep    | 时步长           | `number`  | -          |
| minuteStep  | 分步长           | `number`  | -          |
| secondStep  | 秒步长           | `number`  | -          |
| readonly    | 是否只读         | `boolean` | `true`     |
| disabled    | 是否禁用         | `boolean` | `false`    |
| placeholder | placeholder      | `string`  | -          |
| showNow     | 是否显示此刻按钮 | `boolean` | `true`     |
| minTime     | 最小可选时间     | `string`  | -          |
| maxTime     | 最大可选时间     | `string`  | -          |
| onClear | 点击清空按钮时的回调 | `()=>{}` | - |