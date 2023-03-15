## 何时使用

- Modal 模态框

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 模态框内容，当传入对象时为内容组件的 props 配置，默认会混入 Panel 的配置；当为字符串时代表按需加载对应 url 地址的模块做为内容 | `Object\|string` | - |
| args | 参数对象，可在弹窗内容模块的函数里获取 | `object` | null |
| fit | 设置是否自适应窗口高度 | `boolean` | false |
| centered | 模态框是否垂直居中 | `boolean` | true |
| size | 模态框尺寸，支持预定义以及自定义宽度 | `SizeProps` \|`xsmall \| small \| middle \| large \| xlarge` | small |
| okText | 确定按钮内容 | `string` | 确 定 |
| cancelText | 取消按钮内容 | `string` | 取 消 |
| okButton | 自定义确定按钮的 props，如果为 false 则不显示确定按钮 | `props`\|`boolean` | - |
| cancelButton | 自定义取消按钮的 props，如果为 false 则不显示取消按钮 | `props`\|`boolean` | - |
| onOk | 确定回调 | `(e)=>{}` | (e)=>{ e.sender.close()} |
| onCancel | 取消回调 | `(e)=>{}` | (e)=>{ e.sender.close()} |
| onClose | 关闭的回调，不管是确定还是取消 | `({result,sender})=>{}` | - |

### SizeProps

| 参数  | 说明     | 类型     | 默认值 |
| ----- | -------- | -------- | ------ |
| width | 具体宽度 | `number` | -      |
