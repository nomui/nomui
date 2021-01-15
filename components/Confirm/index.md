确认提示，询问用户是否要做某个操作。

## 何时使用

- 当某个页面需要向用户询问是否要做某个操作时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` \| `props` | - |
| description | 内容 | `string` \| `props` | - |
| icon | 自定义图标类型 | `string` \| `props` | - |
| okText | 确定按钮文本 | `string` | `确 定` |
| onOk | 点击确定按钮回调 | `function(e)` | - |
| cancelText | 取消按钮文本 | `string` | `取 消` |
| onCancel | 点击取消按钮回调 | `function(e)` | - |
| action | 自定义操作 | `array` \| `props` | - |

### action 配置
操作区的默认组件类型为 `Cols` ，其默认配置如下
``` javascript
{
    component: Cols,
    justify: 'end',
}
```
当 `action` 类型为数组时，会成为 `Cols` 组件的 `items` 配置，当类型为对象时，可完全自定义 `Cols` 组件的 `props`
