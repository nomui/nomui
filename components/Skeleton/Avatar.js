import Avatar from '../Avatar/index'
import Component from '../Component/index'

class SkeletonAvatar extends Avatar {
  constructor(props, ...mixins) {
    super(Component.extendProps(SkeletonAvatar.defaults, props), ...mixins)
  }
}

SkeletonAvatar.defaults = {}

Component.register(SkeletonAvatar)

export default SkeletonAvatar
