# 应用组件

App 组件是单页应用的顶层组件。

App 组件渲染在页面的 body 元素上，且有唯一的一个路由器组件做为子组件。

App 组件实例化时可以配置视图的根目录（viewsDir），默认路径（defaultPath）。

App 组件会监听浏览器的 hashchange 事件，在该事件响应代码里会解析出当前的路由对象，并且对比之前的路由对象，然后将路径变更级别（changedLevel），查询字符串是否变更（queryChanged），当前路由（route）以及应用组件实例本身（app）做为参数触发 nomui 组件的 hashChange 事件。该 hashChange 事件会被路由器组件监听。
