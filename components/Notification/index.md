## 何时使用

全局展示通知提醒信息。

在系统四个角显示通知提醒信息。经常用于以下情况：

- 较为复杂的通知内容。
- 带有交互的通知，给出用户下一步的行动点。
- 系统主动推送。

## API

nomui.Notification.success(config)

nomui.Notification.info(config)

nomui.Notification.error(config)

nomui.Notification.warning(config)

nomui.Notification.open(config)

nomui.Notification.close(key: String)

config 参数如下：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 弹出的位置 | `'top'\|'bottom'\|'left'\|'right'\|'left top'\|'right top'\|'left bottom'\|'right bottom'\|'center' ` | `right top` |
| title | 通知提醒标题 | `string` | - |
| description | 通知提醒内容 | `string` | - |
| type | 通知类型 | `'success'\|'info'\|'warning'\|'error'` | - |
| icon | 自定义图标，优先级比 type 高 | `icon支持的type` | - |
| key | 相同的 key 会算作同一个通知实例 | `string` | `newGuid()` |
| duration | 默认 4.5 秒后自动关闭，配置为 null 则不自动关闭 | `number` | `4500` |
| btn | 自定义关闭按钮 | `boolean \| {text:'不在显示'}` | `false` |
| onClose | 当通知关闭时触发 | `()=>{}` | - |
| left | 消息位置在左侧弹出时，距离左侧的位置，单位像素 | `number` | `24` |
| top | 消息位置在上方弹出时，距离顶部的位置，单位像素 | `number` | `24` |
| right | 消息位置在右侧弹出时，距离右侧的位置，单位像素 | `number` | `24` |
| bottom | 消息位置在下方弹出时，距离底部的位置，单位像素 | `number` | `24` |
