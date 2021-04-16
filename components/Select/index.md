下拉选择器。

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择。

## API

| 参数       | 说明                   | 类型                                   | 默认值 |
| ---------- | ---------------------- | -------------------------------------- | ------ |
| options    | 单选项配置             | `[{text:string,value:number\|string}]` | -      |
| multiple   | 是否允许多选           | `boolean`                              | false  |
| showArrow  | 是否显示下拉箭头       | `boolean`                              | true   |
| showSearch | 使单选模式可搜索       | `boolean`                              | true   |
| onSearch   | 搜索文本值变化时的回调 | `boolean`                              | true   |
