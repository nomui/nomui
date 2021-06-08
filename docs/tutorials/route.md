# 路由切换

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
