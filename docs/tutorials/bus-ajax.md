# ajax

引入了 axios 库来作为 ajax 请求库，在页面入口处可定义拦截器

[github](https://github.com/axios/axios)

[官方文档](https://axios-http.com/docs/api_intro)

## 正常使用

```js

axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
```

## 通过 axios 增加 loading 效果

- 全局 loading 效果

```js
axios.get('', {
  loading: true,
})
```

- 局部组件 loading 效果

```js
// 传递给loading一个dom节点【切记是dom节点而并非一个ref对象(一般是ref.element)】
axios.get('', {
  loading: document.getElementById('#xxx'),
})
```

## 加密传输

部分情况下，api 涉及到用户敏感数据的传输的情况需要对传输的数据进行加密传输

### crypto 取值类型说明

1. 客户端向服务器端发送的数据为加密数据

一般用于表单提交的数据包含用户的身份证、手机、邮箱、银行卡、密码等场景

```js
axios.post('', data, {
  crypto: 1,
})
```

2. 服务器端响应的内容为加密内容,这种需要客户端进行解密

一般用于服务器端返回的数据包含用户的身份证、手机、邮箱、银行卡、密码等场景

```js
axios.post('', data, {
  crypto: 2,
})
```

3. 同时包含请求加密以及响应解密的情况，属于 1、2 两种情况的合并

```js
axios.post('', data, {
  crypto: 4,
})
```

> 注意

加密传输需要前后端的搭配使用，后端提供了 Attribute 过滤器一般为 [ApiEncryptResponseFilter]、 [ApiDecryptRequestFilter] 之类的，具体根据后端定义的情况来

## 全局定义拦截器

```js
axios.interceptors.request.use((config) => {
  if (config.loading) {
    var container = config.loading === true ? document.body : config.loading
    config.loadingInst = new nomui.Loading({ container: container })
  }

  let crypto = config.crypto
  if (crypto) {
    config.cryptoKey = wt.crypto.generateKey()
    config.headers['Triple_DES_Key'] = wt.crypto.encryptKey(config.cryptoKey)
    if (crypto === 1 || crypto === 4) {
      config.data = wt.crypto.encrypt(config.data, config.cryptoKey)
    }
  }
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  return config
})

axios.interceptors.response.use(
  (response) => {
    let { loadingInst, cryptoKey, crypto, skipResponseInterceptors } = response.config
    if (loadingInst) {
      loadingInst.remove && loadingInst.remove()
    }
    // 配置了跳过拦截器
    if (skipResponseInterceptors) {
      return response
    }
    let data = response.data
    if (data && data.success === false) {
      new nomui.Alert({
        type: 'warning',
        title: data.message,
        size: 'xssmall',
      })
      return Promise.reject(data)
    }
    if (crypto === 2 || crypto === 4) {
      response.data = wt.crypto.decryptResponse(response.data, cryptoKey)
    }
    return response.data
  },
  ({ response }) => {
    let { loadingInst } = response.config
    if (loadingInst) {
      loadingInst.remove && loadingInst.remove()
    }
    new nomui.Alert({
      type: 'error',
      title: '网络或服务器故障！！！',
      size: 'xssmall',
    })
    return Promise.reject(response)
  },
)
```
