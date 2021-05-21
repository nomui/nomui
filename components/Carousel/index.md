一组轮播的区域。


## API

| 参数      | 说明               | 类型             | 默认值  |
| --------- | ------------------ | ---------------- | ------- |
| imgs      | 轮播图片数组           | `[]`         | -       |
| height      | 轮播图内容区高度     | `number` | 100       |
| arrows      | 是否显示箭头     | `boolean`         | false       |
| autoplay | 是否自动播放     | `boolean`         | false       |
| autoplaySpeed | 自动播放的速度，单位毫秒（ms）     | `number`         | 1000       |
| speed | 轮播速度，单位毫秒（ms）     | `number`         | 300       |
| dots | 是否显示导航锚点     | `boolean`         | true       |
| defaultActiveIndex | 初始被激活的轮播图     | `number`         | 1       |
| easing | 动画效果,在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。     | `linear\|ease\|ease-in\|ease-out\|ease-in-out\|cubic-bezier(n,n,n,n)`         | linear       |
| pauseOnHover |  在鼠标悬浮时自动停止轮播     | `boolean`         | true       |
| triggerType |  锚点导航触发方式     | `'click'或'hover'`         | click       |
