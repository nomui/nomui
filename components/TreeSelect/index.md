## 何时使用

- 用于带树形结构的下拉选择框

## API

### TreeSelect

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 默认选中的节点 | `array \| string ` | - |
| treeData | 源数据,至少应该包含 `text` 与 `key`，并且 `key` 唯一 | `array ` | [] |
| treeDataFields | `Tree`组件的`dataFields`字段 | `object ` | `{key:'key',text:'text',children:'children',parentKey:'parentKey'}` |
| treeCheckable | 节点可勾选配置 | `boolean` \| `object` | - |
| multiple | 支持多选（当设置 `treeCheckable` 时自动变为 true） | `boolean ` | `true` |
| allowClear | 显示清除按钮 | `boolean` | - |
