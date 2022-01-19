Drawer 抽屉

## 何时使用

- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
- 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| closable | 是否显示右上角的关闭按钮 | `boolean` | `false` |
| closeIcon | 自定义关闭图标 | `Icon` | `close` |
| maskClosable | 点击蒙层是否允许关闭 | `boolean` | `true` |
| showMasker | 是否显示蒙层 | `boolean` | `true` |
| settle | 抽屉弹出的方向 | `top\|right\|bottom\|left` | `right` |
| getContainer | 指定 Drawer 挂载的节点（默认挂载至`body`） | `-` | `()=>Component\|HTMLElement` |
| width | 抽屉的宽度，仅当弹出方向为左或右时生效，支持 rem,em,px,% | `-` | `256px` |
| height | 抽屉的高度，仅当弹出方向为上或下时生效，支持 rem,em,px,% | `-` | `256px` |
| title | 抽屉的标题 | `string \| Component` | `-` |
| content | 抽屉的内容 | `string\|Component` | `-` |
| footer | 抽屉的页脚 | `string\|Component` | `-` |
| okText | 页脚确认按钮文字 | `string` | `确 定` |
| onOk | 确认按钮回调 | `({sender})=>void` | `-` |
| cancelText | 页脚取消按钮文字 | `string\|Component` | `取 消` |
| onCancel | 页脚取消回调 | `({sender})=>void` | `-` |
