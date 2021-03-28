import Component from '../Component/index'
import TreeNodes from './TreeNodes'

class Tree extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      nodes: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.nodeRefs = {}
  }

  _config() {
    const { nodes } = this.props
    this.setProps({
      children: {
        component: TreeNodes,
        nodes,
      },
    })
  }
}

Component.register(Tree)

export default Tree
