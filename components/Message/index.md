## 何时使用

- Message 消息层

## API

### Message

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 消息层类型，决定显示的外观 | `'info'\|'success'\|'warning'\|'error'` | - |
| icon | 自定义显示的图标 | `string` | - |
| content | 消息层内容 | `object \| string` | - |
| duration | 几秒以后自动关闭层，不设则不会自动关闭 | `number` | - |
| showClose | 是否显示关闭按钮 | `boolean` | `false` |
