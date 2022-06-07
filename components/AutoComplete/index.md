自动完成

## 何时使用

- 需要一个输入框而不是选择器。
- 需要输入建议/辅助提示。和 Select 的区别是:
- AutoComplete 是一个带提示的文本输入框，用户可以自由输入，关键词是辅助输入。
- Select 是在限定的可选项中进行选择，关键词是选择。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 单选项配置 | `[{value:number\|string}]` | - |
| debounce | 是否开启防抖模式 | `boolean` | `true` |
| interval | 节流事件调用的间隔(单位毫秒) | `number` | `300` |
| filterOption | 是否根据输入项进行筛选。其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false | `function(input,option)` | true |
| onSearch | 搜索文本值变化时的回调 | `function(inputValue)` | - |
| mode | 模式(select 或 auto) | `'auto' \| 'select'` | `'auto'` |
| valueField | value 字段 | `strint` | `'value'` |
| onSelect | 下拉菜单选择回调 | `function(value,option)` | - |
