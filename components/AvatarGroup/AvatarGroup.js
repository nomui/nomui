import Avatar from '../Avatar/index'
import Component from '../Component/index'

class AvatarGroup extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'div',
      size: 'default', // 通过设置 mode 可以改变时间轴和内容的相对位置 left | alternate | right
      maxCount: null, // 显示的最大头像个数
      maxPopoverPlacement: 'top', // 多余头像气泡弹出位置
      items: [], // 子元素项列表
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { size, items, maxCount, maxPopoverPlacement, itemDefaults } = this.props

    // 赋size值
    const avatars = items.map((item) => {
      return {
        component: Avatar,
        size,
        ...itemDefaults,
        ...item,
      }
    })
    const numOfChildren = avatars.length
    if (maxCount && maxCount < numOfChildren) {
      const childrenShow = avatars.slice(0, maxCount)
      const childrenHidden = avatars.slice(maxCount, numOfChildren)
      childrenShow.push({
        component: Avatar,
        text: `+${numOfChildren - maxCount}`,
        size,
        ...itemDefaults,
        popup: {
          triggerAction: 'hover',
          align: maxPopoverPlacement,
          children: childrenHidden,
          attrs: {
            style: {
              padding: '8px 12px',
            },
          },
        },
      })
      this.setProps({
        children: childrenShow,
      })
    } else {
      this.setProps({
        children: avatars,
      })
    }
  }
}

Component.register(AvatarGroup)

export default AvatarGroup
