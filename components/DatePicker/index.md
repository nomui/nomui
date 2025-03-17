输入或选择日期的控件。

## 何时使用

- 当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| format | 格式 | `string` | `yyyy-MM-dd` |
| disabledTime | 禁用日期函数 | `(data)=>{ return true/false }` | - |
| startWeekOnMonday | 日历界面是否将周一视作一周的开始(否则将周日作为开始 ) | `boolean` | true |
| weekMode | 周选择模式，此时取值为当周的第一天所在日期，如果传入子配置项 format 则按照 format 格式取值为某年某周，此时值不符合日期校验规则 | `boolean,object` | false |
| minDate | 最小可选日期 | `string` | - |  | maxDate | 最大可选日期 | `string` | - |  | yearRange | 前后年显示范围 | `array` | `[50,20]` |  | autoHideYearMonthPicker | 当选择年月之后自动切换回日期选择界面 | `boolean` | true |  | showYearSkip | 是否显示年份增减按钮 | `boolean` | false |  | showTime | 是否显示时间，需要显示的时候建议传一个对象，内部包含 TimePicker 的 props | `object` | false |  | allowClear | 是否显示清空按钮 | `boolean` | `true` |  | extraTools | 额外的工具栏，为函数的时候参数是组件实例，可以返回单个对象或者对象数组 | `(inst)=>{} \| array` | - |  | onChange | 面板关闭且值发生改变时触发回调 | `function` | - |  | onClear | 点击清空按钮时的回调 | `()=>{}` | - |

## weekMode

| 名称 | 说明 | 建议 |
| --- | --- | --- |
| format | 以某年某周的格式取值时，需要配置它的格式，此时取值赋值都以该格式为准 | `{year}年{week}周` |

## Methods

| 名称           | 说明                     | 类型 |
| -------------- | ------------------------ | ---- |
| setNow         | 设置为今天               | -    |
| close          | 关闭日期面板             | -    |
| getWeekDetails | 周模式下获取当周详细信息 | -    |
