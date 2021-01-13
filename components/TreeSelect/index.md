## 何时使用

- 用于带树形结构的下拉选择框

## API

### TreeSelect

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| treeData | 源数据,至少应该包含 `title` 与 `value`，并且 `value` 唯一 | `array ` | [] |
| selectedNodes | 默认选中的节点 | `array \| string ` | - |
| multiple | 是否允许多选 | `boolean ` | `true` |
| leafOnly | 是否只允许选择叶子层级 | `boolean ` | `false` |
