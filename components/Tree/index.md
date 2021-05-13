## 何时使用

- 用于树形数据的展示以及交互

## API

### Tree props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 源数据,至少应该包含 `text` 与 `key`，并且 `key` 唯一 | `TreeData[]` | [] |
| dataFields | 数据字段映射，将传递的数据字段映射成树组件所需的字段 | `object` | `{key:'key',text:'text',children:'children',parentKey:'parentKey'}` |
| initExpandLevel | 初始展开节点的级别，默认为 -1 展开所有级别。从 0 级开始 | `number` | - |
| nodeSelectable | 节点可选中配置 | `boolean` \| `object` | - |
| nodeCheckable | 节点可勾选配置 | `boolean` \| `object` | - |
| onNodeClick | 点击节点的回调 | `({node}) => {}` | - |

### Tree methods

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| getData | 获取所有节点数据 | `(options:getDataOptions) => TreeData[]` | - |
| getCheckedNodeKeys | 获取勾选的节点键值数组 | `(options:getCheckedNodeKeysOptions) => string[]` | - |
| getCheckedNodesData | 获取勾选的节点数据，树形结构 | `(options:getCheckedNodesDataOptions) => TreeData[]` | - |

### nodeSelectable

节点可选中配置

目前只支持单选，多选用 nodeCheckable

| 参数            | 说明             | 类型             | 默认值 |
| --------------- | ---------------- | ---------------- | ------ |
| onlyleaf        | 仅叶子节点可选中 | `boolean`        | false  |
| byClick         | 点击节点时选中   | `boolean`        | true   |
| selectedNodeKey | 选中的节点键     | `string`         | true   |
| onNodeSelect    | 节点选中回调     | `({node}) => {}` | -      |
| onNodeUnselect  | 节点取消选中回调 | `({node}) => {}` | -      |

### nodeCheckable

节点可勾选配置

| 参数                   | 说明                   | 类型             | 默认值 |
| ---------------------- | ---------------------- | ---------------- | ------ |
| cascadeCheckParent     | 级联勾选父节点         | `boolean`        | true   |
| cascadeUncheckChildren | 级联取消勾选子节点     | `boolean`        | true   |
| checkedNodeKeys        | 初始选中节点数据键数组 | `array`          | -      |
| onNodeCheck            | 节点勾选回调           | `({node}) => {}` | -      |
| onNodeUncheck          | 节点取消勾选回调       | `({node}) => {}` | -      |

### TreeData

| 参数     | 说明           | 类型         | 默认值 |
| -------- | -------------- | ------------ | ------ |
| key      | 键             | `string`     | -      |
| text     | 文本           | `string`     | -      |
| children | 子节点数据数组 | `TreeData[]` | -      |
