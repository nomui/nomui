返回页面顶部的操作按钮。


## API

| 参数      | 说明               | 类型             | 默认值  |
| --------- | ------------------ | ---------------- | ------- |
| duration      | 滚动动画持续时间，单位 毫秒           | `number`         | 100       |
| animations      | 返回过程的动画效果           | `string`         | Linear       |
| target      | 需要监听滚动事件的DOM，值为该DOM的类名class，不需要 . 符号     | `string` | window       |
| height      | 滚动高度达到该值时才显示BackTop组件     | `number`         | 400       |
| right      | 组件距离右部的距离（参照是发生滚动事件的DOM的父元素，像素单位px）     | `number` | 30       |
| bottom      | 组件距离底部的距离（参照是发生滚动事件的DOM的父元素，像素单位px）     | `number`         | 30       |
| text      | 组件的文案，不写则默认使用箭头图标     | `string`         | -       |
| onClick | 点击按钮后触发     | `()=>{}`         | -       |

### animations
>tips:参考 [预设28种动画效果演示](https://www.zhangxinxu.com/study/201612/how-to-use-tween-js.html)