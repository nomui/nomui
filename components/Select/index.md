下拉选择器。

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项配置 | `[{text:string,value:number\|string}]` | - |
| extraOptions | 额外的选项，不会显示在下拉列表当中，用于默认有值却不属于数据源列表的特殊情况 | `[{text:string,value:number\|string}]` | - |
| multiple | 是否允许多选 | `boolean` | false |
| maxTagWidth | 最大已选中标签宽度 | `number` | 120 |
| maxTagCount | 最大显示已选中标签数,默认全部显示 | `number` | -1 |
| showArrow | 是否显示下拉箭头 | `boolean` | true |
| searchable | 可搜索配置 | `boolean` \| `object` | - |
| popupContainer | 下拉菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，即可相对其定位。self 为当前组件，返回函数可指定其它组件 | `'self'` \| `()=>{return ref}` | `body` |
| optionFields | 自定义 options 中 text value 的字段 | `object` | `{ text: text, value: value, }` |

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
