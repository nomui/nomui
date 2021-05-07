## 何时使用

- Modal 模态框

## API

| 参数       | 说明                           | 类型               | 默认值                     |
| ---------- | ------------------------------ | ------------------ | -------------------------- |
| okText     | 确定按钮内容                   | `string`           | `确 定`                    |
| cancelText | 取消按钮内容                   | `string`           | `取 消`                    |
| content    | 模态框内容                     | `Object\|string`   | -                          |
| onOk       | 确定回调                       | `(e)=>{}`          | `(e)=>{ e.sender.close()}` |
| onClose    | 关闭的回调，不管是确定还是取消 | `(e)=>{}`          | -                          |
| onCancel   | 取消回调                       | `(e)=>{}`          | `(e)=>{ e.sender.close()}` |
| width      | 宽度                           | `number \| string` | 960                        |
