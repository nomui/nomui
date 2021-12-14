import Avatar from '../Avatar/index'
import Component from '../Component/index'

class SkeletonAvatar extends Avatar {
  constructor(props, ...mixins) {
    const defaults = {
      text: '#&nbsp;',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }
}

Component.register(SkeletonAvatar)

export default SkeletonAvatar
