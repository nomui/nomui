import Component from '../Component/index'

class TimelineItem extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'li',
      color: 'blue', // 指定圆圈颜色 blue, red, green, gray，或自定义的色值
      dot: null, // 自定义时间轴点
      label: null, // 设置标签
      pending: false, // 是否是幽灵节点
      children: null, // 内容
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { dot, color, label, pending, children } = this.props

    this.setProps({
      classes: {
        'nom-timeline-item': true,
        'nom-timeline-item-pending': pending,
      },
      children: [
        label && {
          tag: 'div',
          classes: {
            'nom-timeline-item-label': true,
          },
          children: label,
        },
        {
          tag: 'div',
          classes: {
            'nom-timeline-item-tail': true,
          },
        },
        {
          tag: 'div',
          classes: {
            'nom-timeline-item-head': true,
            'nom-timeline-item-head-custom': !!dot,
            [`nom-timeline-item-head-${color}`]: true,
          },
          attrs: {
            style: {
              'border-color': /blue|red|green|gray/.test(color || '') ? undefined : color,
            },
          },
          children: [dot],
        },
        {
          tag: 'div',
          classes: {
            'nom-timeline-item-content': true,
          },
          children,
        },
      ],
    })
  }
}

Component.register(TimelineItem)

export default TimelineItem
