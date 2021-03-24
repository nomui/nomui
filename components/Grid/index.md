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

### Grid

| 参数            | 说明                           | 类型                  | 默认值  |
| --------------- | ------------------------------ | --------------------- | ------- |
| columns         | 表格列的配置描述，具体项见下表 | `array`               | []      |
| data            | 表格数据数组                   | `array`               | `[]`    |
| frozenHeader    | 冻结表头                       | `boolean`             | `false` |
| frozenLeftCols  | 指定冻结左侧多少列             | `number`              | -       |
| frozenRightCols | 指定冻结右侧多少列             | `number`              | -       |
| keyField        | 表格行数据的主键字段           | `string`              | `id`    |
| rowCheckable    | 表格行是否可选择               | `object` \| `boolean` | `id`    |

### column

列描述数据对象，是 columns 中的一项，column 使用相同的 API。

| 参数       | 说明                         | 类型                                      | 默认值 |
| ---------- | ---------------------------- | ----------------------------------------- | ------ |
| field      | 行数据（对象）的字段名       | `string`                                  | -      |
| title      | 列头显示标题                 | `string`                                  | -      |
| width      | 列宽度，单位 px              | `boolean`                                 | 120    |
| cellRender | 单元格渲染函数，返回组件配置 | `({cellData,cell,row,rowData,table})=>{}` | -      |

#### `cellRender` 使用示例及参数说明

```javascript
{
    component:'Grid',
    columns:[
        {
            field:'tags', title:'标签',
            cellRender:({
                cellData,   // 单元格数据
                cell,       // 单元格组件实例
                rowData,    // 行数据
                row,        // 行组件实例
                table       // 表格组件实例
            }) =>{
                return {
                    component:'List',
                    items:cellData,
                    itemDefaults:{
                        component:'Tag',
                        _config:itemInst=>{
                            itemInst.setProps({
                                text:''
                            })
                        }
                    }
                }
            }
        },
        data:[
            { tags: ['武侠','长篇','古代'] },
            { tags: ['散文','短篇','现代'] }
        ]
    ]
}
```

### rowCheckable

表格行可勾选配置

| 参数           | 说明               | 类型          | 默认值 |
| -------------- | ------------------ | ------------- | ------ |
| checkedRowKeys | 初始选中行主键数组 | `array`       | -      |
| onRowCheck     | 行勾选回调         | `({row})=>{}` | -      |
| onRowUncheck   | 行取消勾选回调     | `({row})=>{}` | -      |

### rowExpandable

表格行可展开

| 参数   | 说明             | 类型                  | 默认值 |
| ------ | ---------------- | --------------------- | ------ |
| render | 被展开行渲染函数 | `({rowData,row})=>{}` | -      |

### treeConfig

树形表格配置

| 参数            | 说明                                                       | 类型     | 默认值 |
| --------------- | ---------------------------------------------------------- | -------- | ------ |
| childrenField   | 指定树形结构的字段名                                       | `string` | -      |
| treeNodeColumn  | 树节点列，被指定列会显示展开及折叠图标，可点击切换展开与否 | `string` | -      |
| initExpandLevel | 初始展开层级，默认为 -1，代表展开所有层级                  | `number` | -1     |
| indentSize      | 缩进尺寸，单位 px                                          | `number` | 16     |
