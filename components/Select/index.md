下拉选择器。

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择。

## API

| 参数       | 说明             | 类型                                   | 默认值 |
| ---------- | ---------------- | -------------------------------------- | ------ |
| options    | 选项配置         | `[{text:string,value:number\|string}]` | -      |
| multiple   | 是否允许多选     | `boolean`                              | false  |
| showArrow  | 是否显示下拉箭头 | `boolean`                              | true   |
| searchable | 可搜索配置       | `boolean` \| `object`                  | -      |

### searchable

可搜索配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 搜索框占位文字 | `string` | false |
| filter | 过滤方法，返回选项数组，或者 Promise。参数 inputValue 为搜索框输入的文本，options 为配置的选项数组 | `({inputValue,options}) => {return Option[]}` | - |

### Option

选项

| 参数  | 说明 | 类型                 | 默认值 |
| ----- | ---- | -------------------- | ------ |
| text  | 文本 | `string`             | -      |
| value | 值   | `string` \| `number` | -      |
