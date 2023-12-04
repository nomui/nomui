双栏穿梭选择框。

## 何时使用

- 需要直观的进行多选时。
- 比起 Select 和 TreeSelect，穿梭框占据更大的空间，可以展示可选项的更多信息。

## API

| 参数          | 说明             | 类型                          | 默认值 |
| ------------- | ---------------- | ----------------------------- | ------ |
| data          | 数据源，默认需要有`key`与`text`         | `array`                      | -      |
| value          | 默认值           | `array`                      | -      |
| dataFields        | 字段名配置         | `object`                      | `{ key: 'key', text: 'text', children: 'children', parentKey: 'parentKey' }`     |
| height          | 穿梭框高度           | `number`                      | 240      |
| hideOnSelect          | 是否隐藏已选择节点，不允许在树形数据当中使用           | `boolean`                      | `false`      |
| showSearch          | 是否显示搜索框           | `boolean`                      | `false`      |
| onChange          | 值发生变化时的回调           | `({newValue})=>{}`                      | -      |