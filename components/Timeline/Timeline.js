import Component from '../Component/index'
import TimelineItem from './TimelineItem'

class Timeline extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'ul',
      mode: 'left', // 通过设置 mode 可以改变时间轴和内容的相对位置 left | alternate | right
      pending: false, // 指定最后一个幽灵节点是否存在或内容,也可以是一个自定义的子元素
      // 当最后一个幽灵节点存在時，指定其时间图点
      pendingDot: {
        component: 'Icon',
        type: 'loading',
      },
      reverse: false, // 节点排序
      items: null, // 子元素项列表
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _getPositionClass(ele, index) {
    const { mode } = this.props
    if (mode === 'alternate') {
      return index % 2 === 0 ? `nom-timeline-item-left` : `nom-timeline-item-right`
    }
    if (mode === 'left') {
      return `nom-timeline-item-left`
    }
    if (mode === 'right') {
      return `nom-timeline-item-right`
    }
    if (ele.props && ele.props.position === 'right') {
      return `nom-timeline-item-right`
    }
    return ''
  }

  _config() {
    const { reverse, pending, mode, pendingDot, items } = this.props
    const that = this
    const hasLabelItem = items && items.some((item) => item && item.label)

    // 生成pending节点
    const pendingItem = pending
      ? {
          component: TimelineItem,
          pending: !!pending,
          dot: pendingDot || { component: 'Icon', type: 'loading' },
          children: typeof pending === 'boolean' ? null : pending,
        }
      : null

    // 获取position

    const children = []
    if (Array.isArray(items) && items.length > 0) {
      const timeLineItems = [...items]
      if (pendingItem) {
        timeLineItems.push(pendingItem)
      }
      if (reverse) {
        timeLineItems.reverse()
      }
      const itemsCount = timeLineItems.length
      const lastCls = 'nom-timeline-item-last'

      for (let i = 0; i < timeLineItems.length; i++) {
        const ele = timeLineItems[i]
        const positionCls = that._getPositionClass(ele, i)
        const pendingClass = i === itemsCount - 2 ? lastCls : ''
        const readyClass = i === itemsCount - 1 ? lastCls : ''
        children.push({
          component: TimelineItem,
          ...ele,
          classes: {
            ...ele.classes,
            [!reverse && !!pending ? pendingClass : readyClass]: true,
            [positionCls]: true,
          },
        })
      }
    }

    this.setProps({
      classes: {
        [`nom-timeline-pending`]: !!pending,
        [`nom-timeline-reverse`]: !!reverse,
        [`nom-timeline-${mode}`]: !!mode && !hasLabelItem,
        [`nom-timeline-label`]: hasLabelItem,
      },
      children,
    })
  }
}

Component.register(Timeline)

export default Timeline
