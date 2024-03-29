展示行列数据。

## 何时使用

- 当有大量结构化的数据需要展现时；
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## Api

### props

| 参数    | 说明                           | 类型 | 默认值 |
| ------- | ------------------------------ | ---- | ------ |
| columns | 表格列的配置描述，具体项见下表 | `[]` | -      |

### methods

| 名称      | 说明           | 类型             |
| --------- | -------------- | ---------------- |
| appendRow | 在后面新增一行 | `(rowProps)=>{}` |

### columns

| 参数  | 说明               | 类型     | 默认值 |
| ----- | ------------------ | -------- | ------ |
| field | 关联 data 中的字段 | `string` | -      |
| title | 表格标题           | `string` | -      |
| width | 表格宽             | `number` | -      |

### data

| 参数 | 说明    | 类型     | 默认值 |
| ---- | ------- | -------- | ------ |
| id   | 标识 id | `number` | -      |

> Tip：更高级用法与文档见 Grid 高级表格
