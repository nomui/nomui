## 何时使用

- 当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。

## API

### Rows

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| extra | 操作区 | `Props[]` | - |
| icon | 自定义 icon | `string\| Props` | - |
| status | 结果的状态，决定图标和颜色 | `success` \| `error` \| `info` \| `warning` \| `404` \| `403` \| `500` | `info` |
| subTitle | subTitle 文字 | `Props` | - |
| title | title 文字 | `Props` | - |
| children | 详情内容 | `Props` | - |
