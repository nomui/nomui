import Component from '../Component/index'

class Skeleton extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      cols: null,
      rows: null,
      avatar: false,
      title: true,
      paragraph: 3,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const that = this
    const { cols, rows } = this.props

    if (rows && cols) {
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
    const that = this
    const { avatar, title, paragraph } = this.props
    const arr = []
    for (let i = 0; i < num; i++) {
      arr.push({
        component: 'Flex',
        gutter: 'medium',
        cols: [
          avatar && {
            component: 'Avatar',
            text: '#&nbsp;',
            classes: { 'nom-skeleton-avatar': true },
          },
          {
            grow: true,

            children: [
              title && {
                classes: { 'nom-skeleton-title': true },
              },
              paragraph && {
                classes: { 'nom-skeleton-paragraph': true },
                tag: 'ul',
                children: that.getParagraph(),
              },
            ],
          },
        ],
      })
    }

    return arr
  }

  getParagraph() {
    const rows = this.props.paragraph > 1 ? this.props.paragraph : 3
    const list = []
    for (let i = 0; i < rows; i++) {
      list.push({
        tag: 'li',
      })
    }
    return list
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
