## 何时使用

- 用于带树形结构的下拉选择框

## API

### TreeSelect

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 默认选中的节点 | `array \| string ` | - |
| options | 源数据,至少应该包含 `text` 与 `key`，并且 `key` 唯一 | `array ` | [] |
| treeDataFields | `Tree`组件的`dataFields`字段 | `object ` | `{key:'key',text:'text',children:'children',parentKey:'parentKey'}` |
| maxTagWidth | 最大已选中标签宽度 | `number` | 120 |
| maxTagCount | 最大显示已选中标签数,默认全部显示 | `number` | -1 |
| onlyleaf | 是否仅允许选中或者勾选叶子节点 | `boolean` | false |
| treeSelectable | 树节点的选择事件(同 Tree 组件`nodeSelectable`) | `boolean` \| `object` | - |
| treeCheckable | 树节点的可勾选配置(同 Tree 组件`nodeCheckable`) | `boolean` \| `object` | - |
| multiple | 支持多选（当设置 `treeCheckable` 时自动变为 true） | `boolean ` | `true` |
| allowClear | 显示清除按钮 | `boolean` | - |
| searchable | 树节点的可勾选配置(同 Tree 组件`nodeCheckable`) | `boolean` \| `object` | - |
| initExpandLevel | 默认展开节点层级，不传则展开所有层级 | `number` | -1 |

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

### treeCheckable

同 Tree 组件[nodeCheckable](./#!components!index?type=Tree&tab=docs)，少了`checkedNodeKeys`和`onCheckChange`，可分别通过`value`传入和`onValueChange`监听变化

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cascade | 级联勾选父节点（cascadeCheckParent）,级联勾选子节点（cascadeCheckChildren）,级联取消勾选子节点（cascadeUncheckChildren）的统一配置，优先级低于单项配置 | `boolean` | false |
| cascadeCheckParent | 级联勾选父节点 | `boolean` | true |
| cascadeUncheckParent | 级联取消勾选父节点 | `boolean` | true |
| cascadeCheckChildren | 级联勾选子节点 | `boolean` | true |
| cascadeUncheckChildren | 级联取消勾选子节点 | `boolean` | true |
| checkedNodeKeys | 初始选中节点数据键数组 | `array` | - |
| showCheckAll | 显示全选复选框 | `boolean` | false |
| checkAllText | 全选复选框文本 | `boolean` | `全选` |

## searchable

可搜索配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 搜索框占位文字 | `string` | - |
| filter | 过滤方法，返回选项数组，或者 Promise。参数 inputValue 为搜索框输入的文本，options 为配置的选项数组。默认匹配 option 的`text`字段，并将其父子节点都展示出，正确匹配的选项会加粗展示 | `({inputValue,options}) => {return Option[]}` | - |
