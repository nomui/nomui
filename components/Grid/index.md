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
| columnAlign | 所有列的默认文本对齐方式 | `left`\|`center`\|`right` | `left` |
| data | 表格数据数组 | `array` | `[]` |
| frozenHeader | 冻结表头（注意配置列宽, 见下面的`注意事项`） | `boolean` | `false` |
| frozenLeftCols | 指定冻结左侧多少列 | `number` | - |
| frozenRightCols | 指定冻结右侧多少列 | `number` | - |
| allowFrozenCols | 是否允许用户手动固定列(有多级表头时无效) | `boolean` | `false` |
| keyField | 表格行数据的主键字段 | `string` | `id` |
| rowCheckable | 表格行是否可选择 | `object` \| `boolean` |  |
| rowExpandable | 表格行是否可展开 | `object` \| `boolean` |  |
| rowSortable | 表格行是否可拖动顺序 | `object` \| `boolean` | `false` |
| summary | 表尾总计行配置,多行统计则传入 summary 配置项数组 | `{ columns:[],rows:[],ignoreCellRender:boolean }` \| `boolean` | `false` |
| treeConfig | 树形表格配置 | `object` | - |
| bordered | 是否显示边框 | `boolean` | `false` |
| showTitle | 单元格显示 title | `boolean` | `false` |
| line | 线条样式，`row` 为行线条，`col` 为列线条，`both` 为行列线条 | `row` \| `col` \| `both` | - |
| columnResizable | 是否允许拖动列宽（此项为 true 以后，如果有某些列不想改变宽度，可单独设置 column.resizable:false） | `object` \| `boolean` | `false` |
| columnFrozenable | 是否允许手动固定列(比`allowFrozenCols`多了 cache 的选项) | `object` \| `boolean` | `false` |
| columnsCustomizable | 是否允许自定义列(如果是多级表头，父层级也必须有`field`)、可传入对象具体项见下表 | `object` \| `boolean` | `false` |
| ellipsis | 是否开启单元格文字超出自动省略 | `boolean` | `false` |
| highlightCol | 表头 hover 时将对应列高亮 | `boolean` | `false` |
| striped | 是否显示斑马间隔 | `boolean` | `false` |
| defaultSort | 默认排序的配置 | `object` | - |
| onSort | 后端排序触发回调 | `({field,sortDirection})=>{}` | - |
| forceSort | 是否在排序清空时仍触发 onSort 回调 | `boolean` | `false` |
| sortCacheable | 是否允许缓存排序条件，使用本功能，Grid 必须指定唯一标识`key` | `boolean` | `false` |
| onFilter | 列头筛选触发回调 | `({params})=>{}` | - |
| rowSelectable | 是否可选中行 | `false` | - |
| sticky | 是否开启吸附式表头以及虚拟滚动条,需要指定有滚动条的父容器，设为 true 则指定 window 为滚动容器 | `boolean` \| `component`\| `()=>{}` | false |

> `frozenLeftCols`和`frozenRightCols`: 若列头与内容不对齐或出现列重复，请指定固定列的宽度 width。

### methods

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| appendRow | 在后面新增一行 | `(rowProps)=>{}` |
| resetSort | 重置表格的排序状态 | - |
| getDataKeys | 获取当前顺序的 keyField 数组 | - |
| getData | 获取当前顺序的表格 data | - |
| resetColumnsCustom | 重置自定义列的展示 | - |
| resetColsWidth | 重置列的宽度(不传参数则重置所有列宽) | `Funciton(field \| null)` |
| getCheckedRows | 获取当前选中行数组 | - |
| getCheckedRowKeys | 获取当前选中行的 key 数组 | - |
| setScrollPlace | 记录当前表格滚动位置(下次 update 时会自动滚动), 若传入回调函数，则参数是当前滚动位置信息`{header,body}` | - |
| autoScrollGrid | 主动触发滚动条自动滚动到上次的位置 | `({header,body})=>{} ` |

### column

列描述数据对象，是 columns 中的一项，column 使用相同的 API。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| field | 行数据（对象）的字段名 | `string` | - |
| title | 列头显示标题 | `string` | - |
| width | 列宽度，单位 px | `boolean` | 120 |
| align | 文本对齐方式 | `left`\|`center`\|`right` | `left` |
| cellRender | 单元格渲染函数，返回组件配置 | `({cellData,cell,row,rowData,table})=>{}` | - |
| autoWidth | 是否自适应宽度（最终列显示的宽度，由`Td`子元素计算得出。若`column.width`小于子元素宽度，Td 会被撑大，否则不操作） | `boolean` | `false` |
| resizable | 是否允许拖动列宽 | `boolean` | `false` |
| ellipsis | 单元格是否文字超出自动省略 | `boolean` | `false` |
| sortable | 是否启用排序，为`true`时后端排序，为`string`时自动对字符串进行中文前端排序，为`number`对数字进行前端排序，也可以传自定义排序函数进行前端排序，如：`(a, b) => a.sales - b.sales` | `boolean` \| `function`\| `'string'`\| `'number'` | `false` |
| filter | 是否启用列头筛选，启用的时候传入表单组件如：Textbox Select Checkbox，组件自动使用当前列的 field 作为表单 name | `component` | `false` |
| customizable | 可配置该列是否需要加入可配置项中，配置 false 则不加入 | `boolean` | `true` |
| frozenable | 可配置该列是否能被固定，配置 false 则不展示固定图标 | `boolean` | `true` |

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

### rowSelectable

表格行可勾选配置

| 参数     | 说明       | 类型                  | 默认值 |
| -------- | ---------- | --------------------- | ------ |
| onSelect | 行选中回调 | `({row,rowData})=>{}` | -      |

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

### summary

表尾总计行配置

| 参数             | 说明                                           | 类型              | 默认值  |
| ---------------- | ---------------------------------------------- | ----------------- | ------- |
| columns          | 统计行的列数组，如果不传则默认用 Grid 的列数组 | `array`           | ``      |
| ignoreCellRender | 统计行数据渲染是否忽略 cellRender              | `boolean`         | `false` |
| rows             | 统计行                                         | `[{text,method}]` | ``      |

rows 子对象配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 该行显示的统计名称 | `string` | `总计` |
| method | 字段统计方法，返回 field 与对应的值 | `({ columns, data }) => { {field:value}}` | `` |

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
| cascade | 级联勾选父节点（cascadeCheckParent）,级联勾选子节点（cascadeCheckChildren）,级联取消勾选子节点（cascadeUncheckChildren）的统一配置，优先级低于单项配置 | `boolean` | false |
| cascadeCheckParent | 级联勾选父节点 | `boolean` | true |
| cascadeCheckChildren | 级联勾选子节点 | `boolean` | true |
| cascadeUncheckChildren | 级联取消勾选子节点 | `boolean` | true |

### columnResizable

自定义设置列宽

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cache | 是否缓存自定义列宽设置，为`true`时需配置 Grid 的`key`属性为唯一值 | `boolean` | - |
| allowFixedCol | 固定列是否允许被拖动(当 data 太多时拖动，会造成渲染卡顿, 此时可设置 false 关闭) | `boolean` | - |

### columnFrozenable

自定义设置列宽

| 参数  | 说明                                                          | 类型      | 默认值 |
| ----- | ------------------------------------------------------------- | --------- | ------ |
| cache | 是否缓存固定列设置，为`true`时需配置 Grid 的`key`属性为唯一值 | `boolean` | -      |

### columnsCustomizable

自定义配置列

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selected | 默认展示出的列 | `array` | - |
| cache | 是否缓存自定义列展示设置，为`true`时需配置 Grid 的`key`属性为唯一值 | `boolean` | - |
| callback | 点击 modal 的保存的回调事件 | `function` | - |

### 注意事项

#### frozenHeader

当配置了`frozenHeader: true`时, 会出现列不对齐的情况

**原因**：

- 配置了`frozenHeader: true`时, `body`右侧始终会出现滚动条
- 为了使`header`和`body`的列一一对应
- `header`的`colgroup`中加了一列`width: 17px`的占位
- 但当表格宽度大于所有 `column.width` 之和时, 每一列的实际展示`width`就会根据比例计算出来，实际的宽度会比设置的`width`大
- 但是, 原本用来占位的 `width: 17px` 也变大了, 就导致`header`中每列计算出的宽度比`body`中的小。就出现了不对应的情况
- ex: `column: [{field: 'col1', width: 200}, {field: 'col2', width: 200}]`
  - 若此时表格宽度为 `body: 800`,则 `header: 817`
  - 展示效果: `body`的两列是 400,`header`中的只有`200 * (817 / 417) = 391.84`
  - 因为原本`17px`的列也同比增加到`17 * (817 / 417) = 33.31`了

所以解决方案需要`columns`配置满足以下一种方案:

1. 至少预留一列, 不设置其`width`, 让其自适应(`width: 17px`的占位列就不会自动变化了)
2. 总的列宽一定要足够, 越大越好(让`17px`导致的影响微乎其微,看不出差别即可)

### defaultSort

| 参数          | 说明         | 类型              | 默认值 |
| ------------- | ------------ | ----------------- | ------ |
| field         | 字段名       | `string`          | -      |
| sortDirection | 升序还是降序 | `'asc' \| 'desc'` | -      |
