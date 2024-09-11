## 何时使用

- loading 加载提示

## API

### Modal

| 参数      | 说明                      | 类型      | 默认值          |
| --------- | ------------------------- | --------- | --------------- |
| container | 指定 loading 效果附着元素 | `object`  | `document.body` |
| backdrop  | 是否带遮罩层              | `boolean` | `false`         |

## Method

| 方法名          | 说明                         | 参数                                          |
| --------------- | ---------------------------- | --------------------------------------------- |
| close | 关闭Loading，通过传参数type可以为Loading添加事件动画   | ` {type:'success' \| 'fail'} `                                     |
| success  | 不展示加载动画，直接显示成功事件动画 |  `{container}`                                      |