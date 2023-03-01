# 路由对象

单页应用中页面不会跳转，而应用中不同的视图（页面）通常需要被链接、收藏或分享，所以需要记录视图的地址，SPA 提供基于 hash fragments 的 URL 路由控制，每个路由路径都绑定相应的页面视图，应用启动后将根据路由变化自动转换视图。

## 路由匹配规则

nomui 的路由匹配规则，遵循固定的约定，不需要定义路由表，直接通过 url 的 hash 部分根据固定的规则寻找视图。

为了更好的理解路由到视图的过程，我们假设有如下一个完整的 hash 路径：

![这是图片](/docs/images/route.png 'route')

上述 url 解析出来的路由对象如下图所示：

![这是图片](/docs/images/route_obj.png 'route')

支持无限级路径，由感叹号分隔。

感叹号分隔开的路径组成了路径数组 paths，数组中的每一个元素（路径）都对应一个视图。

视图寻址以应用组件（App）配置的根视图目录（下图中的 viewsDir）为起点。

![这是图片](/docs/images/route-path-query.png 'route')

支持路径直接附带参数，格式为 `pathname--pathquery`,路径与参数之间以`--`(两个横杠)隔开，添加在路径中的参数同样会解析到路由的 query 对象当中。

![这是图片](/docs/images/app.png 'route')

访问一个 url，系统会逐级渲染每个路径对应的视图。每个路径寻找视图的步骤如下：

1. 如果是最后一级路径，则该级路径代表视图文件，否则代表视图文件夹（视图文件为该文件夹下的 \_layout.js 文件）。
2. 如果路径以斜杆开头，代表绝对路径，即相对 App 组件配置的 viewsDir 文件夹。
3. 如果路径不以斜杆开头，代表相对路径，即相对父路径的文件夹。第一级路径相对 App 组件配置的 viewsDir 文件夹。

## 路由切换

1. 简单的用法

```js
// 指定路由
nomapp.currentRoute.push('!dashboard/org')
// 带参数
nomapp.currentRoute.push('!dashboard/org?id=1')
```

2. 对象形式写法

```js
nomapp.currentRoute.push({
  pathname: '!projects/project/apply',
})
```

3. 对象形式带参数

```js
nomapp.currentRoute.push({
  pathname: '!projects/project/apply',
  query: {
    pid: '',
  },
})
```

4. 仅更新查询参数的情况

```js
nomapp.currentRoute.push({
  query: {
    pid: '',
  },
})
```

5. 参数增量更新|替换由于路由的参数是完全替换形式，某些情况下需要增量更新|替换,可以获取当前路由的查询对象 query，然后使用展开运算符赋给 query

```js
nomapp.currentRoute.push({
  query: {
    ...route.query,
    pid: '',
  },
})
```

## 获取路由参数

```js
define([], function () {
  return ({ route }) => {
    // 通过route.query获取当前路由的query,会自动解析成对象
  }
})
```
