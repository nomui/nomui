## 何时使用

- 上传组件，可配置点击或者拖拽上传，并提供上传成功回调以及上传文件列表

## API

### Upload

| 参数 | 说明 | 类型 | 默认值 | 注释 |
| --- | --- | --- | --- | --- |
| accept | 接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | string | - |  |
| action | 上传的地址 | string \| (file) => Promise | - |  |
| trigger | 触发器的属性配置 | `{}` | 上传按钮 |  |
| draggable | 是否允许拖拽上传 | `boolean` | false |  |
| multiple | 是否允许多选上传 | `boolean` | `false` |  |
| folder | 是否支持文件夹上传 | `boolean` | `false` |  |
| method | 上传请求的 http method | string | `post` |  |
| beforeUpload | 上传文件之前的钩子，参数为上传的文件，若返回 `false` 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 `File` 或 `Blob` 对象则上传 resolve 传入对象）。**注意：IE9 不支持该方法** | (file, fileList) => boolean \| Promise | - |  |
| data | 上传所需额外参数或返回上传额外参数的方法 | object\|(file) => object \| Promise&lt;object> | - |  |
| defaultFileList | 默认已经上传的文件列表 | object\[] | - |  |
| disabled | 是否禁用 | boolean | false |  |
| headers | 设置上传的请求头部，IE10 以上有效 | object | - |  |
| name | 发到后台的文件名字段 | string | `file` |  |
| withCredentials | 上传请求时是否携带 cookie | boolean | false |  |
| onChange | 上传文件改变时的状态 | `({file,fileList})=>{}` | - |  |

### methods

| 名称    | 说明               | 类型     |
| ------- | ------------------ | -------- |
| getData | 获取已上传文件列表 | `()=>{}` |
| enable  | 启用               | -        |
| disable | 禁用               | -        |
