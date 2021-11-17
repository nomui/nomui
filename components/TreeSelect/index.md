## 何时使用

- 用于带树形结构的下拉选择框

## API

### TreeSelect

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 默认选中的节点 | `array \| string ` | - |
| options | 源数据,至少应该包含 `text` 与 `key`，并且 `key` 唯一 | `array ` | [] |
| treeDataFields | `Tree`组件的`dataFields`字段 | `object ` | `{key:'key',text:'text',children:'children',parentKey:'parentKey'}` |
| onlyleaf | 仅叶子节点可选中 | `boolean` | false |
| treeSelectable | 树节点的选择事件(同 Tree 组件`nodeSelectable`) | `boolean` \| `object` | - |
| treeCheckable | 树节点的可勾选配置(同 Tree 组件`nodeCheckable`) | `boolean` \| `object` | - |
| multiple | 支持多选（当设置 `treeCheckable` 时自动变为 true） | `boolean ` | `true` |
| allowClear | 显示清除按钮 | `boolean` | - |
| fit | 当下拉框超出高度时出现滚动条，支持自定义高度范围或者默认 200 | `boolean \| { height:200 } ` | `false` |

### TreeSelect methods

继承至[Field](./#!components!index?type=Field&tab=docs)组件, 拥有`value`值相关的方法和回调

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| getValue | 获取 value 值 |  |
| setValue | 设置 value 值, 第一个参数是要设置的值，第二个是一个可选的对象参数，其属性 `triggerChange` 指示该设值操作是否触发 onValueChange 事件 | `(value, options: { triggerChange: boolean } )=>{}` |
| onValueChange | value 值变化时触发 | `({ newValue, oldValue }) => {}` |

### treeSelectable

同 Tree 组件[nodeSelectable](./#!components!index?type=Tree&tab=docs)

| 参数     | 说明             | 类型      | 默认值 |
| -------- | ---------------- | --------- | ------ |
| onlyleaf | 仅叶子节点可选中 | `boolean` | false  |
