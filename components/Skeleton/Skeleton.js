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
    const { rows } = this.props

    this.setProps({
      children: {
        component: 'Flex',
        gutter: 'large',
        rows: that.getSkeleton(rows),
      },
    })
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
})

Component.register(Skeleton)

export default Skeleton
