弹出确认框，继承至[Popup](./#!components!index?type=Popup&tab=docs)组件

## 何时使用

- 需要跟随操作按钮的确认框时候。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 确认框文字内容 | `string` \|`()=>{}` | - |
| onConfirm | 点击确认按钮回调 | `()=>{}` | - |
| okText | 确认按钮文本 | `string` | `是` |
| cancelText | 取消按钮文本 | `string` | `否` |
| icon | 确认框图标 | `string` | `nfo-circle` |
| align | 确认框相对于触发元素的对齐方式，参考 [Layer](./#!components!index?type=Layer&tab=docs) | `string` | `top left` |
