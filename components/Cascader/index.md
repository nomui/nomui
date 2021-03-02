级联选择框

## 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。

- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。

- 比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项配置 | `[{label:string,value:number\|string,children:array}]` | - |
| separator | 分隔符 | `String` | `/` |
| showArrow | 是否显示下拉箭头 | `boolean` | true |
| valueType | 设/取值类型 | `cascade\|single` | `cascade` |
| fieldsMapping | 自定义 options 中 label value children key 的字段 | `object` | `{ label: label, value: value, children: children }`,`key`默认值与`value`字段相同 |
