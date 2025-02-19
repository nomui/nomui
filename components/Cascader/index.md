级联选择框

## 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。

- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 可以点击清除图标删除内容 | `boolean` | `true` |
| options | 选项配置 | `[{label:string,value:number\|string,children:array}]` | - |
| loadData | 异步获取下一级数据 | `(value,level,itemData)=>{ promise.resolve([]) }` | - |
| separator | 分隔符 | `String` | `/` |
| showArrow | 是否显示下拉箭头 | `boolean` | true |
| valueType | 设/取值类型 | `cascade\|single` | `cascade` |
| fieldsMapping | 自定义 options 中 label value children isLeaf 的字段 | `object` | 参考下方说明 |
| changeOnSelect | 当此项为 true 时，点选每级菜单选项值都会发生变化(参见示例`选择即改变`) | `boolean` | `false` |
| multiple | 是否支持多选 | `boolean` | `true` |
| onlyleaf | 是否只能选择叶子节点 | `boolean` | `true` |
| onClear | 点击清空按钮时的回调 | `()=>{}` | - |

## fieldsMapping

自定义 options 对应数据字段名

| 参数     | 说明           | 类型      | 默认值     |
| -------- | -------------- | --------- | ---------- |
| label    | label 显示字段 | `String`  | `label`    |
| value    | value 值字段   | `String`  | `value`    |
| children | children 字段  | `String`  | `children` |
| disabled | disabled 字段  | `boolean` | `false`    |
| isLeaf   | 是否叶子节点   | `boolean` | `isLeaf`   |
