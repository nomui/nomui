## 何时使用

- 用于树形数据的展示以及交互

## API

### Tree

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| treeData | 源数据,至少应该包含 `title` 与 `value`，并且 `value` 唯一 | `array ` | [] |
| selectedNodes | 默认选中的节点 | `array \| string ` | - |
| multiple | 是否允许多选 | `boolean ` | `true` |
| leafOnly | 是否只允许选择叶子层级 | `boolean ` | `false` |
| showLine | 是否显示层级线条 | `boolean` | `false` |
| toolbar | 额外工具条,其中 `placement` 可选`before \| after`，控制工具条出现的位置 | `{ placement:string, item:Component}` | - |
| onCheck | 点击勾选框的回调，其中 `items` 是已选中数据，`key` 是当前点击节点的 key，`status` 是当前点击节点的勾选状态 | `{items,key,status} ` | - |
