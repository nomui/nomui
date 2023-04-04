## 何时使用

- 多级字段组，需要使用带层级的字段组时使用，基本用法参考 Field 组件

## API

### GroupTree

| 参数 | 说明 | 类型 | 默认值 | 注释 |
| --- | --- | --- | --- | --- |
| value | 默认值的 | `array` | - | - |
| dataFields | 字段名配置 | `{}` | `{key: 'key',text: 'text',children: 'children',}` | - |
| columnWidth | 默认列宽 | `number` | 200 | - |
| onNodeDeleted | 节点删除时的回调 | `(nodeData)=>{}` | - | - |
