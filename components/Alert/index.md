警告提示，展现需要关注的信息。

## 何时使用

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 指定警告提示的样式 | `info \| success \| error \| warning` | - |
| title | 标题 | `Props` | - |
| description | 内容 | `Props` | - |
| icon | 自定义图标类型 | `string \| Props ` | - |
| ok | 确定按钮配置 | `{callback:function,text:string} \| Props ` | - |
| cancel | 取消按钮配置,events 不能被覆盖 | `Props ` | - |
