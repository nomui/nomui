文件上传控件。

## 何时使用

将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。

## 使用方法

### 基础用法

- **基础用法**示例中展示了一个最简单的上传控件示例
- 包括一个必要的 component 属性`Uploader`和上传文件地址 action,如果用户没有指定上传的方法,则默认使用`POST`上传

### 指定上传文件类型

- 用户可以通过设置上传控件的`accept`属性,控制想要上传的文件种类。详见 [input accept attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
- 参见**图片上传**示例

### 事件回调

- 控件提供了三个回调函数，onDownload,onPreview,onRemove
- 回调函数的参数都为 file 对象
- onRemove 回调函数会监控文件上传后的删除操作，参数为一个函数或一个 Promise 对象。当返回 false 或 resolve(false)时则不移除。
- onPreview 和 onDownload 则对应文件预览和下载的回调，对于下载的回调，如果指定了 file 参数的 url，则默认会跳转到文件 url 对应的标签页
- 具体用法参见**事件回调**

### 监控上传状态

- 通过`onChange`回调函数监控文件的上传状态
- file 中的`status`字段指定了当前文件所处的状态，文件的状态有`uploading`,`done`,`error`,`removing`,`removed`分别对应正在上传,上传成功,上传失败,和文件已被删除
- 回调函数 onChange 中有一个参数，其中包含了 file 和 fileList 两个属性,对应当前文件和上传文件列表
- 具体用法参见示例**监控文件上传状态**

### 自定义事件

- 除了控件提供的三个回调事件之外，如果想要扩展自定义事件可以设置控件的`extraAction`属性
- `extraAction`属性是一个对象数组,每个元素对应`text`文本字段和`action`回调函数,回调函数的参数为 file
- 具体用法参见示例**自定义事件**

### 设置默认已上传列表

- 通过设置`defaultFileList`属性,可以设置已经上传的文件列表。其中 `uuid`,`name`,`status` 为必填字段
- 具体用法参见示例**默认已上传列表**

### 额外参数与请求头

- 有时候我们上传文件的时候除了文件本身可能还需要附带一些额外的信息，或还需要设置请求头
- 对于附加信息，可以通过设置控件的 `data` 属性来实现。请求头参数则在 `headers` 属性中设置
- 具体用法参见示例**额外参数**

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| accept | 接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozill a.org/en-US/docs/Web/HTML/Element/input/file#accept) | string | - |  |
| action | 上传的地址 | string \| (file) => Promise | - |  |
| button | 自定义上传按钮 | Button \| `false`| Button(设置为false则不显示上传按钮) |  |
| method | 上传请求的 http method | string | `post` |  |
| beforeUpload | 上传文件之前的钩子，参数为上传的文件，若返回 `false` 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 `File` 或 `Blob` 对象则上传 resolve 传入对象）。**注意：IE9 不支持该方法** | (file, fileList) => boolean \| Promise | - |  |
| data | 上传所需额外参数或返回上传额外参数的方法 | object\|(file) => object \| Promise&lt;object> | - |  |
| defaultFileList | 默认已经上传的文件列表 | object\[] | - |  |
| disabled | 是否禁用 | boolean | false |  |
| headers | 设置上传的请求头部，IE10 以上有效 | object | - |  |
| name | 发到后台的文件参数名 | string | `file` |  |
| withCredentials | 上传请求时是否携带 cookie | boolean | false |  |
| onChange | 上传文件改变时的状态 | function | - |  |
| onRemove   | 点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除               | `Array<{text:string,action:Function\|Promise}>` | -   |  |
| extraAction | 自定义 | `Array<{text:string,action:Function}>` | [] |  |
| renderer | 自定义文件显示的回调 | function(file): component | null |  |
