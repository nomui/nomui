## 何时使用

- Modal 模态框

## API

| 参数                | 说明                       | 类型             | 默认值                     |
| ------------------- | -------------------------- | ---------------- | -------------------------- |
| okText              | 确定按钮内容               | `string`         | `确 定`                    |
| cancelText          | 取消按钮内容               | `string`         | `取 消`                    |
| content             | 模态框内容                 | `Object\|string` | -                          |
| closeOnClickOutside | 是否点击外部区域关闭模态框 | `boolean`        | `false`                    |
| onOk                | 确定回调                   | `(e)=>{}`        | `(e)=>{ e.sender.close()}` |
| onCancel            | 取消回调                   | `(e)=>{}`        | `(e)=>{ e.sender.close()}` |
