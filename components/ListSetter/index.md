列表设置器, 用于宽度有限的场景配置多个列表项，每个列表项又有多个配置项，需要弹窗设置，且列表项之间可以拖动排序。

## API

### props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| labelField | 列表项显示字段 | `string` | - |
| keyField | 列表项键字段 | `string` | `id` |
| minItems | 至少保留多少项目 | `number` | null |
| minItemsMessage | 至少保留多少项目提示信息 | `string` | `至少保留 {minItems} 项` |
| itemForm | 点击列表项弹出的表单的配置，也可以配置为函数，返回 form 组件 props,如果传 false 则不显示表单 | `object \| ({itemData})=>{} \| false` | - |
| actions | 操作栏配置 | `object` \| `({ listSetter }) => { return props }` | - |
| value | 字段值，对象数组 | `object[]` | - |
| sortable | 列表项是否可拖拽排序 | `object` \| `boolean` | - |
| itemRemovable | 项是否允许删除判断函数 | `({ itemData }) => { return boolean }` | - |
| onItemRemoved | 项删除事件 | `({ key }) => {}` | - |
| itemRender | 自定义组件列表渲染 | `({ itemData }) => {}` | - |
| formPopupAlign | 表单层默认对齐方式 | `left top` | - |

### methods

| 参数       | 说明         | 类型                           |
| ---------- | ------------ | ------------------------------ |
| appendItem | 在后面添加项 | `({ itemData }) => {}`         |
| removeItem | 删除项       | `({key, triggerEvent }) => {}` |

### sortable

| 参数   | 说明               | 类型     | 默认值          |
| ------ | ------------------ | -------- | --------------- |
| handle | 可拖拽元素的样式类 | `string` | `.p-type-drag'` |
