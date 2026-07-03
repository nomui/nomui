数据列表。

## 何时使用

- 需要直接通过 `data` 和 `itemRender` 渲染一组数据项，并通过 flex 布局控制排列方式。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 数据源 | `[]` | - |
| dataKey | 数据项唯一键字段名 | `string` | `'id'` |
| itemRender | 自定义渲染函数 | `function` | - |
| selectedKeys | 选中的数据项 key，单选为 key，多选为 key 数组 | `key \| key[]` | `null` |
| itemSelectable | 数据项是否可选中的配置 | `object` | - |
| disabledKeys | 禁用的数据项 key 数组 | `key[]` | - |
| showEmpty | 数据为空时是否显示空信息提示，可以是布尔值也可以是 `{Empty组件的属性}` | `boolean \| object` | `false` |
| virtual | 开启虚拟渲染，值为 number 时作为可视区高度 | `boolean \| number` | `false` |
| sortable | 数据项是否可拖拽排序 | `object \| boolean` | `false` |
| gap | 数据项间隔 | `'xsmall'\|'small'\|'medium'\|'large'\|'xlarge'` | - |
| align | 交叉轴对齐方式 | `'start'\|'end'\|'center'\|'stretch'` | - |
| justify | 主轴对齐方式 | `'start'\|'end'\|'center'\|'between'\|'around'` | - |
| wrap | 是否换行 | `boolean` | `false` |
| vertical | 是否纵向排列 | `boolean` | `false` |
| fills | 数据项是否自动填充剩余空间 | `boolean` | `false` |
| cols | 列数 | `number` | - |

### itemSelectable

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| multiple | 是否允许多选 | `boolean` | `false` |
| byClick | 点击数据项时选中 | `boolean` | `false` |
| scrollIntoView | 选中项是否自动滚动到可视区域 | `object \| boolean` | `false` |
| defaultSelectFirst | 是否默认选中第一项 | `boolean` | `false` |
| triggerOnInit | 初始化时是否触发选中事件 | `boolean` | `false` |

## Method

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| appendItem | 在最后添加数据项 | `itemData` |
| prependItem | 在最前添加数据项 | `itemData` |
| updateItem | 更新指定数据项 | `key, itemData` |
| removeItem | 删除指定数据项 | `key` |
| selectItem | 选中指定数据项 | `key, selectOption` |
| selectItems | 选中多个数据项 | `keys, selectOption` |
| selectAllItems | 选中所有数据项 | `selectOption` |
| unselectItem | 取消选中指定数据项 | `key, selectOption` |
| getSelected | 获取选中数据 | - |
| getItemKeys | 获取数据项 key | - |
| getItemDatas | 获取数据项数据 | - |
| disableItem | 禁用指定数据项 | `key` |
| enableItem | 启用指定数据项 | `key` |
| scrollTo | 滚动到指定数据项 | `key` |
