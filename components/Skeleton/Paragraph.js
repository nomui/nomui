import Component from '../Component/index'

class SkeletonParagraph extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(SkeletonParagraph.defaults, props), ...mixins)
  }

  _config() {
    this.setProps({ tag: 'ul', children: this.getParagraph() })
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

SkeletonParagraph.defaults = {}

Component.register(SkeletonParagraph)

export default SkeletonParagraph
