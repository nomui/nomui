## 何时使用

- 多级字段组，需要使用带层级的字段组时使用，基本用法参考 Field 组件

## API

### GroupTree

| 参数 | 说明 | 类型 | 默认值 | 注释 |
| --- | --- | --- | --- | --- |
| value | 默认值 | `array` | - | 每个节点对象必须包含`key`(唯一标识)与`text`(节点名称) |
| dataFields | 字段名配置 | `{}` | `{key: 'key',text: 'text',children: 'children',}` | - |
| groupDefaults | 字段组默认配置 | `{fields}` | - | - |
| columnWidth | 默认列宽 | `number` | 200 | - |
| onNodeDeleted | 节点删除时的回调 | `(nodeData)=>{}` | - | - |

### groupDefaults

| 参数   | 说明                                 | 类型   | 默认值 | 注释 |
| ------ | ------------------------------------ | ------ | ------ | ---- |
| fields | 节点字段组集合，具体配置参考下方表格 | `[{}]` | -      | -    |

### 单个字段配置

| 参数 | 说明 | 类型 | 默认值 | 注释 |
| --- | --- | --- | --- | --- |
| label | 字段显示名(会显示在表头位置) | `string` | - | - |
| name | 字段的 name(必填),对应 value 里面的字段名 | `string` | - | - |
| width | 字段列宽 | `number` | 200 | - |
| render | 自定义渲染内容 | `({tree,node,nodeData})=>{return componentProps}` | - | - |
| rules | 字段校验规则,参考 Field 组件 | `array` | - | - |
