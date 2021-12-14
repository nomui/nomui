import Component from '../Component/index'
import SkeletonAvatar from './Avatar'
import SkeletonImage from './Image'
import SkeletonParagraph from './Paragraph'
import SkeletonTitle from './Title'

class Skeleton extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      type: null,
      avatar: false,
      title: true,
      paragraph: 3,
      image: false,
      cols: null,
      rows: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const that = this
    const { type, cols, rows } = this.props
    if (type) {
      const typeMap = {
        avatar: {
          component: SkeletonAvatar,
          size: this.props.size,
        },
        title: {
          component: SkeletonTitle,
          width: this.props.width,
        },
        paragraph: {
          component: SkeletonParagraph,
          paragraph: this.props.paragraph,
        },
        image: {
          component: SkeletonImage,
          width: this.props.width,
          height: this.props.height,
        },
      }
      this.setProps({
        children: typeMap[this.props.type],
        classes: {
          'nom-skeleton-single': true,
        },
      })
    } else if (rows && cols) {
      this.setProps({
        children: {
          component: 'Flex',
          gutter: 'large',
          fills: true,
          rows: that.getCols(that.props.rows),
        },
      })
    } else if (rows || cols) {
      this.setProps({
        children: {
          component: 'Flex',
          gutter: 'large',
          fills: true,
          rows: that.props.rows ? that.getSkeleton(rows) : null,
          cols: that.props.cols ? that.getSkeleton(cols) : null,
        },
      })
    } else {
      this.setProps({
        children: that.getSkeleton(),
      })
    }
  }

  getCols(num) {
    if (!num) {
      num = 1
    }
    const that = this
    const arr = []
    for (let i = 0; i < num; i++) {
      arr.push({
        fills: true,
        gutter: 'large',
        cols: that.getSkeleton(that.props.cols),
      })
    }

    return arr
  }

  getSkeleton(num) {
    if (!num) {
      num = 1
    }
    const { avatar, title, paragraph, image } = this.props
    const arr = []
    for (let i = 0; i < num; i++) {
      arr.push({
        component: 'Flex',
        gutter: 'medium',
        cols: [
          avatar && {
            component: SkeletonAvatar,
            ...this.props.avatar,
          },
          image && {
            component: SkeletonImage,
            ...this.props.image,
          },
          {
            grow: true,
            children: [
              title && {
                component: SkeletonTitle,
              },
              paragraph && {
                component: SkeletonParagraph,
                paragraph: this.props.paragraph,
              },
            ],
          },
        ],
      })
    }

    return arr
  }
}

Component.mixin({
  _created: function () {
    if (this.props.skeleton && this.props.autoRender) {
      this.showSkeleton = true
    }
  },
  _config: function () {
    if (this.showSkeleton && this.firstRender) {
      this.setProps({
        children: {
          component: 'Skeleton',
          ...this.props.skeleton,
        },
      })
      return false
    }
  },
})

Component.register(Skeleton)

export default Skeleton
