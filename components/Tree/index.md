## 何时使用

- 用于树形数据的展示以及交互

## API

### Tree props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 源数据,至少应该包含 `text` 与 `key`，并且 `key` 唯一 | `TreeData[]` | [] |
| flatData | 是否根据传入的扁平结构数据转成 tree 结构 | `boolean` | id |
| nodeDefaults | 节点默认配置 | `ComponentProps` | - |
| dataFields | 数据字段映射，将传递的数据字段映射成树组件所需的字段 | `object` | `{key:'key',text:'text',children:'children',parentKey:'parentKey'}` |
| initExpandLevel | 初始展开节点的级别，默认为 -1 展开所有级别。从 0 级开始 | `number` | - |
| nodeSelectable | 节点可选中配置 | `boolean` \| `object` | - |
| nodeCheckable | 节点可勾选配置 | `boolean` \| `object` | - |
| fit | 自适应父容器高度，当树超出高度时出现滚动条，如果有全选框，该全选框会固定 | `boolean` | false |
| onNodeClick | 点击节点的回调 | `({node}) => {}` | - |
| loadData | 异步加载子节点数据(仅在该节点子数据为空且 isLeaf:false 时才能触发,该方法返回值为子节点数据数组或者返回该子节点数据的 promise) | `({key,node,data}) => { return array(promise) }` | - |

## Tree methods

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| setCheckedNodeKeys | 设置选中节点数据键数组 | `(options:array) => void` | - |
| getData | 获取所有节点数据 | `(options:getDataOptions) => TreeData[]` | - |
| getCheckedNodeKeys | 获取勾选的节点键值数组，参数 includePartialChecked 表示包括半勾选状态的节点 | `({includePartialChecked:true}) => []` | - |
| getCheckedNodesData | 获取`node`节点下的勾选的节点数据，`flatData: false`则返回树形结构,参数 includePartialChecked 表示包括半勾选状态的节点 | `(options, node) => TreeData[]` | `({flatData: false,includePartialChecked:true}) => []` |
| selectNode | 选中指定节点 | `(options:getDataOptions) => void` | - |
| clearSelection | 清空选中 | `function` | - |
| getSelectedNode | 获取当前选中节点 | `(options:getDataOptions) => node` | - |
| expandTo | 展开指定节点 | `(options:getDataOptions) => void` | - |
| scrollTo | 滚动到指定节点 | `(options:getDataOptions) => void` | - |
| checkAllNodes | 全部勾选中，若`ignoreDisabled:true`时忽略被禁用的节点 | `({ignoreDisabled}) => void` | - |
| uncheckAllNodes | 全部取消勾选，若`ignoreDisabled:true`时忽略被禁用的节点 | `({ignoreDisabled}) => void` | - |
| checkNodes | 勾选指定内容，若`ignoreDisabled:true`时忽略被禁用的节点 | `(param,{ignoreDisabled}) => void` | - |
| unCheckNodes | 取消指定内容，若`ignoreDisabled:true`时忽略被禁用的节点 | `(param,{ignoreDisabled}) => void` | - |

`getDataOptions`: 获取节点的参数，可以为一下三种情况

> - node 的 `key`
> - node 的对应实例 `nodeRef`
> - 以 nodeRef 为参数的`函数`，返回结果为`true`

### nodeSelectable

节点可选中配置

目前只支持单选，多选用 nodeCheckable

| 参数            | 说明             | 类型             | 默认值 |
| --------------- | ---------------- | ---------------- | ------ |
| onlyleaf        | 仅叶子节点可选中 | `boolean`        | false  |
| byClick         | 点击节点时选中   | `boolean`        | true   |
| selectedNodeKey | 选中的节点键     | `string`         | true   |
| onNodeSelect    | 节点选中回调     | `({node}) => {}` | -      |

### nodeCheckable

节点可勾选配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cascade | 级联勾选父节点（cascadeCheckParent）,级联勾选子节点（cascadeCheckChildren）,级联取消勾选父节点（cascadeUncheckParent）和级联取消勾选子节点（cascadeUncheckChildren）的统一配置，优先级低于单项配置 | `boolean` | false |
| cascadeCheckParent | 级联勾选父节点 | `boolean` | true |
| cascadeCheckChildren | 级联勾选子节点 | `boolean` | true |
| cascadeUncheckParent | 级联取消勾选父节点 | `boolean` | true |
| cascadeUncheckChildren | 级联取消勾选子节点 | `boolean` | true |
| checkedNodeKeys | 初始选中节点数据键数组 | `array` | - |
| onlyleaf | 是否只允许选择叶子节点 | `boolean` | false |
| showCheckAll | 显示全选复选框 | `boolean` | false |
| checkAllText | 全选复选框文本 | `boolean` | 全选 |
| onCheckChange | 节点勾选回调 | `({node}) => {}` | - |

### TreeData

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 键 | `string` | - |
| text | 文本 | `string` | - |
| icon | 配置节点图标 | `string` | - |
| tools | 节点工具栏配置，通过 justify 配置对齐方式,hover 配置是否悬停显示,render 传入参数当前节点与整个 Tree 实例，返回一个 Flex 组件子项数组 | `{justify:string,hover:boolean,render:{ node, tree }=>{}}` | - |
| disabled | 该节点是否禁用 | `boolean` | - |
| children | 子节点数据数组 | `TreeData[]` | - |

### sortable

| 参数        | 说明                           | 类型      | 默认值 |
| ----------- | ------------------------------ | --------- | ------ |
| showHandler | 是否显示拖拽图标               | `boolean` | -      |
| byHandler   | 是否仅允许通过拖拽图标进行排序 | `boolean` | -      |
