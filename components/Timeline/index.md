垂直展示的时间流信息。

## 何时使用

- 当有一系列信息需按时间排列时，可正序和倒序。
- 需要有一条时间轴进行视觉上的串联时。

## API

### TimeLine

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 通过设置 mode 可以改变时间轴和内容的相对位置 | `left \| alternate \| right ` | left |
| pending | 指定最后一个幽灵节点是否存在或内容 | `boolean \| Component ` | false |
| pendingDot | 当最后一个幽灵节点存在時，指定其时间图点 | `Component ` | `{component:'Icon',type:'loading'}` |
| reverse | 节点排序 | `boolean` | false |
| items | 要显示的子 TimeLineItem 列表 | `TimeLineItem[] ` | [] |

### TimeLineItem

| 参数     | 说明                                                | 类型            | 默认值 |
| -------- | --------------------------------------------------- | --------------- | ------ |
| color    | 指定圆圈颜色 blue, red, green, gray，或自定义的色值 | `string `       | blue   |
| dot      | 自定义时间轴点                                      | `Component `    | -      |
| label    | 设置标签                                            | `Component `    | -      |
| position | 自定义节点位置                                      | `left \| right` | -      |
| children | 节点内容项                                          | `Component`     | -      |
