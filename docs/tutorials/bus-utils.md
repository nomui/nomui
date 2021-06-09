# 辅助方法

- formatDate 日期格式化

```js
utils.formatDate(new Date()) // 默认为 yyyy-mm-dd
utils.formatDate(new Date(), 'yyyy-mm-dd  HH:MM:ss')
```

- downloadFile 文件下载提供了

使用 axios 的 blob 形式下载资源，优点

- 支持 ajax 请求指定各种参数，请求头
- 支持显示下载进度百分比

```js
utils.downloadFile({
  url: '',
  name: 'xxxxx', // 可选,如果没有则根据后端返回的文件名来保存
  ext: '.xlsx', // 可选，如果没有则根据后端返回的后缀来保存
  key: '', // 可选，如果同时有多个的情况下，可以指定key
  // method:'GET', // 可选，POST|GET 默认为GET
  // data:{}, // 可选，要提交的数据
})
```

```c#
public void DownloadFileWithBytes(byte[] bytes, string fileName)
{
    HttpResponse contextResponse = HttpContext.Current.Response;
    contextResponse.Clear();
    contextResponse.Buffer = true;
    if (HttpContext.Current.Request.Browser.Browser == "IE")
    {
        contextResponse.AppendHeader("Content-Disposition", string.Format("attachment;filename={0}", HttpUtility.UrlPathEncode(fileName)));// HttpUtility.UrlEncode(saveFileName).Replace("+", "%20")));
    }
    else if (HttpContext.Current.Request.Browser.Browser == "Firefox")
    {
        contextResponse.AppendHeader("Content-Disposition", string.Format("attachment;filename=\"{0}\"", fileName));
    }
    else
    {
        contextResponse.AppendHeader("Content-Disposition", string.Format("attachment;filename={0}", HttpUtility.UrlEncode(fileName)));// .Replace("+", "%20")));
    }

    // 切记加上该行，不然无法解析文件大小，下载进度无法正常工作
    contextResponse.AppendHeader("Content-Length", bytes.Length.ToString());
    contextResponse.ContentEncoding = Encoding.UTF8;
    contextResponse.ContentType = System.Net.Mime.MediaTypeNames.Application.Octet;// "application/ms-excel";//设置输出文件类型为excel文件。

    contextResponse.OutputStream.Write(bytes, 0, bytes.Length);
    contextResponse.Flush();
    contextResponse.End();
}
```

- downloadFileIframe iframe 形式的文件下载采用隐藏的 iframe 来模拟浏览器下载

```js
utils.downloadFileIframe({
  url: '',
  data: {},
})
```

- formatFileSize 文件大小

获取文件大小格式化的方法

- btoa

浏览器的原生编码

```js
utils.btao('')
```

- atob 浏览器原生的解码

```js
utils.atob('')
```

- base64

对数据进行 base64 编码

```js
utils.base64('')
utils.base64({ name: '', age: '' })
```

- debase64

对数据进行 base64 解码

```js
utils.debase64('')
```

- encryptFile

对文件传输参数进行加密

```js
utils.encryptFile('')
```
