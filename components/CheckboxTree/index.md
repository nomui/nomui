# CheckboxTree 多选树

使用 `Field` 包了一层的 Tree 组件，更多参数和方法可查看 [Tree](#/!components!index?type=Tree&tab=docs) 组件

## 何时使用

- 用于树形数据的展示以及交互

## API

### CheckboxTree props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 源数据，至少应该包含 `text` 与 `key`，并且 `key` 唯一 | `TreeData[]` | [] |
| treeDataFields | `Tree`组件的`dataFields`字段 | `object` | `{key:'key',text:'text',children:'children',parentKey:'parentKey'}` |
| showCheckAll | 展示全选的按钮 | `boolean` | false |
| checkAllText | 全选按钮的文案 | `string` | 全选 |
| cascade | 级联勾选父节点（cascadeCheckParent）,级联勾选子节点（cascadeCheckChildren）,级联取消勾选子节点（cascadeUncheckChildren）的统一配置，优先级低于单项配置 | `boolean` | false |
| cascadeCheckParent | 级联勾选父节点 | `boolean` | true |
| cascadeCheckChildren | 级联勾选子节点 | `boolean` | true |
| cascadeUncheckChildren | 级联取消勾选子节点 | `boolean` | true |
