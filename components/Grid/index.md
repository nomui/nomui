# Grid 高级表格

展示行列数据。在 Table 表格的基础上增加了很多高级功能。

## 何时使用

- 当有大量结构化的数据需要展现时；
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## 如何使用

指定表格的列配置及数据

```javascript
{
    component: 'Grid',
    columns: [
        { field: 'book', title: '书名' },
        { field: 'author', title: '作者' },
        { field: 'role', title: '主角' },
    ],
    data: [
        { book: '笑傲江湖', author: '金庸', role: '令狐冲' },
        { book: '绝代双骄', author: '古龙', role: '小鱼儿' },
        { book: '寻情记', author: '黄易', role: '项少龙' },
    ],
}
```

## API

### props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表格列的配置描述，具体项见下表 | `array` | `[]` |
| data | 表格数据数组 | `array` | `[]` |
| frozenHeader | 冻结表头 | `boolean` | `false` |
| frozenLeftCols | 指定冻结左侧多少列 | `number` | - |
| frozenRightCols | 指定冻结右侧多少列 | `number` | - |
| keyField | 表格行数据的主键字段 | `string` | `id` |
| rowCheckable | 表格行是否可选择 | `object` \| `boolean` |  |
| rowExpandable | 表格行是否可展开 | `object` \| `boolean` |  |
| rowSortable | 表格行是否可拖动顺序 | `object` \| `boolean` | `false` |
| treeConfig | 树形表格配置 | `object` | - |
| bordered | 是否显示边框 | `boolean` | `false` |
| showTitle | 单元格显示 title | `boolean` | `false` |
| line | 线条样式，`row` 为行线条，`col` 为列线条，`both` 为行列线条 | `row` \| `col` \| `both` | - |
| columnResizable | 是否允许拖动列宽（此项为 true 以后，如果有某些列不想改变宽度，可单独设置 column.resizable:false） | `boolean` | `false` |
| columnsCustomizable | 是否允许自定义列(如果是多级表头，父层级也必须有`field`)、可传入对象具体项见下表 | `object` \| `boolean` | `false` |
| ellipsis | 是否开启单元格文字超出自动省略 | `boolean` | `false` |
| striped | 是否显示斑马间隔 | `boolean` | `false` |
| onSort | 后端排序触发回调 | `({field,sortDirection})=>{}` | - |
| onFilter | 列头筛选触发回调 | `({params})=>{}` | - |
| sticky | 是否开启吸附式表头以及虚拟滚动条,需要指定有滚动条的父容器，设为 true 则指定 window 为滚动容器 | `boolean` \| `component`\| `()=>{}` | false |

> `frozenLeftCols`和`frozenRightCols`: 若列头与内容不对齐或出现列重复，请指定固定列的宽度 width。

### methods

| 名称               | 说明                         | 类型             |
| ------------------ | ---------------------------- | ---------------- |
| appendRow          | 在后面新增一行               | `(rowProps)=>{}` |
| resetSort          | 重置表格的排序状态           | -                |
| getDataKeys        | 获取当前顺序的 keyField 数组 | -                |
| getData            | 获取当前顺序的表格 data      | -                |
| resetColumnsCustom | 重置自定义列的展示           | -                |
| getCheckedRows     | 获取当前选中行数组           | -                |
| getCheckedRowKeys  | 获取当前选中行的 key 数组    | -                |

### column

列描述数据对象，是 columns 中的一项，column 使用相同的 API。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| field | 行数据（对象）的字段名 | `string` | - |
| title | 列头显示标题 | `string` | - |
| width | 列宽度，单位 px | `boolean` | 120 |
| cellRender | 单元格渲染函数，返回组件配置 | `({cellData,cell,row,rowData,table})=>{}` | - |
| resizable | 是否允许拖动列宽 | `boolean` | `false` |
| ellipsis | 单元格是否文字超出自动省略 | `boolean` | `false` |
| sortable | 是否启用排序，为 true 时后端排序，也可以传自定义排序函数进行前端排序，如：`(a, b) => a.sales - b.sales` | `boolean` \| `function` | `false` |
| filter | 是否启用列头筛选，启用的时候传入表单组件如：Textbox Select Checkbox，组件自动使用当前列的 field 作为表单 name | `component` | `false` |
| customizable | 可配置该列是否需要加入可配置项中，配置 false 则不加入 | `boolean` | `true` |

#### `cellRender` 使用示例及参数说明

```javascript
{
    component:'Grid',
    columns:[
        {
            field: 'tags', title: '标签',
            cellRender:({
                cellData,   // 单元格数据
                cell,       // 单元格组件实例
                rowData,    // 行数据
                row,        // 行组件实例
                table       // 表格组件实例
            }) => {
                const tagItems = cellData.map(function (item) {
                    return {
                      text: item,
                    }
                  })

                return {
                    component: 'List',
                    items: tagItems,
                    itemDefaults: {
                        component: 'Tag',
                        _config: itemInst => {
                            itemInst.setProps({
                                text: itemInst.props.text
                            })
                        }
                    }
                }
            }
        },
    ]
    data:[
        { tags: ['武侠','长篇','古代'] },
        { tags: ['散文','短篇','现代'] }
    ]
}
```

### rowCheckable

表格行可勾选配置

| 参数           | 说明                 | 类型                                         | 默认值 |
| -------------- | -------------------- | -------------------------------------------- | ------ |
| checkedRowKeys | 初始选中行主键数组   | `array`                                      | -      |
| checkboxRender | 函数返回 Checkbox 的 | `({row, rowData, index})=>{ checkboxProps }` | -      |
| onCheck        | 行勾选回调           | `({row})=>{}`                                | -      |
| onUncheck      | 行取消勾选回调       | `({row})=>{}`                                | -      |

#### `checkboxRender` 使用示例及参数说明

```javascript
// 隐藏id为 0的行的 checkbox展示
{
  component:'Grid',
  rowCheckable: {
    checkboxRender: ({ row, rowData, index}) => {
      return { hidden: rowData.id === 0 }
    }
  }
  columns:[
    {
      field: 'id',
      title: 'ID',
      width: 60,
    },
    {
      field: 'name',
      title: '标题',
    },
  ],
  data:[
    { id: 0, name: '笑傲江湖' },
    { id: 4, name: '天龙八部' },
  ]
}
```

### rowExpandable

表格行可展开

| 参数   | 说明             | 类型                  | 默认值 |
| ------ | ---------------- | --------------------- | ------ |
| render | 被展开行渲染函数 | `({rowData,row})=>{}` | -      |

### rowSortable

表格行可拖动顺序

| 参数  | 说明                     | 类型     | 默认值 |
| ----- | ------------------------ | -------- | ------ |
| onEnd | 表格行每次拖拽完成的回调 | `()=>{}` | -      |

### treeConfig

树形表格配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| flatData | 是否根据传入的扁平结构数据转成 tree 结构 | `boolean` | id |
| parentField | 指定树形结构的`parentKey` | `string` | id |
| childrenField | 指定树形结构的字段名 | `string` | children |
| treeNodeColumn | 树节点列，被指定列会显示展开及折叠图标，可点击切换展开与否 | `string` | - |
| initExpandLevel | 初始展开层级，默认为 -1，代表展开所有层级 | `number` | -1 |
| indentSize | 缩进尺寸，单位 px | `number` | 16 |
| indicator | 自定义展开折叠图标的配置，与基组件的 `expandable.indicator` 配置一致 | `props` | - |

### columnsCustomizable

自定义配置列

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selected | 默认展示出的列 | `array` | - |
| cache | 是否需要缓存到 store 中（刷新页面不会重置，需要 cache 设置为`唯一的标识`） | `string \| boolean` | - |
| callback | 点击 modal 的保存的回调事件 | `function` | - |
