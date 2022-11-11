# GroupGrid

字段组表格，用表格的形式展示可动态增删改的记录

## API

### props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gridProps | grid 属性配置 | `{}` | - |
| addDefaultValue | 配置添加一行记录时的默认值 | `{}` | - |
| groupDefaults | 每个子 Group 的默认配置，api 参考 Group 的 api | `{}` | - |
| GroupDefaults.actionRender | 自定义每个子 Group 右边的操作栏 | `({row, grid})=>{}` \|`false` | - |
| GroupDefaults.actionWidth | 自定义每个子 Group 右边的操作栏宽度 | `number` | 80 |

> .tips 其他 props 请参考 Field 以及 Group
