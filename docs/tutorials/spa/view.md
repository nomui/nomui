# 视图模块

视图实际上对应一个 requirejs 的模块（包含 define 定义的 js 文件）。

视图模块返回一个函数，该函数接收 4 个参数，返回一个对象，该返回对象有一个 view 属性，代表路由器当前渲染的视图组件，其他属性说明见如下代码示例的注释。推荐视图模块里的函数都定义成匿名函数，避免使用 this 对象，造成 this 指代的混乱。

```js
define([], function () {
  /*
    route: 当前路由对象
    context：上下文，挂在应用组件实例上的全局变量
    router：路由器组件实例
    app： 应用组件实例
  */
  return ({ route, context, router, app }) => {
    return {
      title: 'xxx', // 页面标题
      onRendered: () => {}, // 视图组件渲染完成后调用
      onHashChange: ({ route }) => {}, // 页面 url 的 hash 部分更改时调用
      onSubpathChange: ({ route }) => {}, // 该页面所渲染的路由器所在的路径的子路径变更时调用
      onQueryChange: ({ route }) => {}, // 页面 url 的 hash 部分的查询字符串部分更改时调用
      view: {
        // 视图组件
        component: 'Layout',
        header: {},
        body: {},
      },
    }
  }
})
```
