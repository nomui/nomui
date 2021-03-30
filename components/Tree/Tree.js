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
    const { nodes, nodeCheckable } = this.props
    if (nodeCheckable) {
      this.setProps({
        nodeCheckable: Component.extendProps(
          {
            cascadeCheckParent: true,
            cascadeUncheckChildren: true,
            cascade: false,
            checkedKeys: [],
          },
          nodeCheckable,
        ),
      })

      this.checkedKeysHash = {}
      this.props.nodeCheckable.checkedKeys.forEach((key) => {
        this.checkedKeysHash[key] = true
      })
    }

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
