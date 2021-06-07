# 应用组件

页面级别的组件，请勿全局注册；使用通过引入的形式

## 组件定义

```js
define([], function () {
  class QrCode extends nomui.Component {
    constructor(props, ...mixins) {
      const defaults = {}
      super(nomui.Component.extendProps(defaults, props), ...mixins)
    }
  }
  return QrCode
})
```

## 使用

```js
define(['/xxxxx/qrcode.js'], function (QrCode) {
  return function () {
    return {
      component: QrCode,
    }
  }
})
```
