## 何时使用

- 页面需要添加水印标识版权或防止信息泄露时使用

## API

| 参数  | 说明       | 类型     | 默认值 |
| ----- | ---------- | -------- | ------ |
| content | 子内容（水印本身可以理解为一个包裹容器） | `object \| ()=>{}` | -  |
| image | 水印图片 | `url` | -  |
| text | 水印文字 | `string \| array` | -  |
| rotate | 水印旋转角度 | `number` | `-35` |
| gap | 水印间距 | `number` | 100  |
| font | 水印文字样式配置 | `object` | -  |

### font 配置

| 参数  | 说明       | 类型     | 默认值 |
| ----- | ---------- | -------- | ------ |
| color | 文字颜色 | `string` | `'rgba(0,0,0,.15)'`  |
| fontSize | 文字字号 | `number` | `14`  |
| fontFamily | 文字字体 | `string` | `'sans-serif'`  |
| fontWeight | 文字粗细 | `string` | `normal`  |
| textAlign | 文字对齐方式 | `left \| center \| right` | `center`  |