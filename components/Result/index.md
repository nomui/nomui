## 何时使用

- 当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| status | 结果的状态，决定图标和颜色 | `success` \| `error` \| `info` \| `warning` \| `404` \| `403` \| `500` | `info` |
| title | title 文字 | `Props` | - |
| subTitle | subTitle 文字 | `Props` | - |
| extra | 操作区 | `Props[]` | - |
| icon | 自定义 icon | `string\| Props` | - |
| children | 详情内容 | `Props` | - |
