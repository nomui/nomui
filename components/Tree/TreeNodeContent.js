import Checkbox from '../Checkbox/index'
import Component from '../Component/index'

class TreeNodeContent extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      text: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.node = this.parent
    this.level = this.node.level
    this.tree = this.node.tree
  }

  _config() {
    const { text } = this.node.props
    const { initExpandLevel, nodeCheckable } = this.tree.props
    const expanded = initExpandLevel === -1 || initExpandLevel > this.level
    this.setProps({
      expanded,
      expandable: {
        byIndicator: true,
        target: () => {
          return this.node.nodesRef
        },
        indicator: {
          component: 'Icon',
          classes: { 'nom-tree-node-expandable-indicator': true, 'is-leaf': this.node.isLeaf },
          expandable: {
            expandedProps: {
              type: 'down',
            },
            collapsedProps: {
              type: 'right',
            },
          },
        },
      },
      attrs: {
        style: {
          paddingLeft: `${this.level * 16}px`,
        },
      },
    })

    this.setProps({
      children: [
        this.getExpandableIndicatorProps(expanded),
        nodeCheckable && this._getCheckbox(),
        { tag: 'span', classes: { 'nom-tree-node-content-text': true }, children: text },
      ],
      onClick: () => {
        this.tree_onNodeCheck({ node: this.node })
      },
    })
  }

  _getCheckbox() {
    return {
      component: Checkbox,
      plain: true,
      classes: {
        'nom-tree-node-checkbox': true,
      },
      _created: (inst) => {
        this.node.checkboxRef = inst
      },
      value: this.tree.checkedKeysHash[this.node.key] === true,
      onValueChange: ({ newValue }) => {
        if (newValue === true) {
          this.node.check({ checkCheckbox: false })
        } else {
          this.node.uncheck({ uncheckCheckbox: false })
        }
      },
    }
  }
}

Component.register(TreeNodeContent)

export default TreeNodeContent
