## 何时使用

- 多级字段组，需要使用带层级的字段组时使用，基本用法参考 Field 组件

## API

### GroupTree

| 参数 | 说明 | 类型 | 默认值 | 注释 |
| --- | --- | --- | --- | --- |
| value | 默认值 | `array` | - | - |
| dataFields | 字段名配置 | `{}` | `{key: 'key',text: 'text',children: 'children',}` | - |
| columns | 列内容设置 | `array` | - | - |
| columnWidth | 默认列宽 | `number` | 200 | - |
| onNodeDeleted | 节点删除时的回调 | `(nodeData)=>{}` | - | - |

### columns

| 参数 | 说明 | 类型 | 默认值 | 注释 |
| --- | --- | --- | --- | --- |
| field | 显示的表头名称 | `string` | - | - |
| name | 字段的 name(必填),对应 value 里面的字段名 | `string` | - | - |
| width | 字段列宽 | `number` | - | - |
| render | 自定义渲染内容 | `({tree,node,nodeData})=>{return componentProps}` | - | - |
| rules | 字段校验规则,参考 Field 组件 | `array` | - | - |
