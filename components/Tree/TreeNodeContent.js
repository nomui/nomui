import Checkbox from '../Checkbox/index'
import Component from '../Component/index'
import Icon from '../Icon/index'
import { extend } from '../util/index'

class TreeNodeContent extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      text: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.node = this.parent
    this.node.content = this
    this.level = this.node.level
    this.tree = this.node.tree
  }

  _config() {
    const { text, icon, tools } = this.node.props
    const { initExpandLevel, nodeCheckable, expandable } = this.tree.props
    const expanded = initExpandLevel === -1 || initExpandLevel > this.level
    const tree = this.tree
    this.setProps({
      hidden: this.node.props.data.hidden,
      expanded,
      // byIndicator 属性通过外部传入
      expandable: extend(expandable, {
        byClick: true,
        target: () => {
          return this.node.nodesRef
        },
        indicator: {
          component: Icon,
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
      }),
      selectable: {
        byClick: this.tree.props.nodeSelectable.byClick,
      },
      selected: this.tree.props.nodeSelectable.selectedNodeKey === this.node.key,
      attrs: {
        style: {
          paddingLeft: `${this.level * 16}px`,
        },
      },
      onSelect: () => {
        if (tree.selectedNode !== null) tree.selectedNode.unselect()
        tree.selectedNode = this.node
        tree._onNodeSelect({ node: this.node, nodeData: this.node.props.data })
      },
    })

    if (this.tree.props.nodeSelectable.onlyleaf === true && this.node.isLeaf === false) {
      this.setProps({ selectable: false })
    }

    this.setProps({
      children: [
        this.getExpandableIndicatorProps(expanded),
        nodeCheckable && this._getCheckbox(),
        icon &&
          Component.extendProps(
            { classes: { 'nom-tree-node-content-icon': true } },
            Component.normalizeIconProps(icon),
          ),
        Component.extendProps(
          { tag: 'span', classes: { 'nom-tree-node-content-text': true } },
          Component.normalizeTemplateProps(text),
        ),
        tools &&
          Component.extendProps(
            { classes: { 'nom-tree-node-content-tools': true } },
            Component.normalizeIconProps(tools),
          ),
      ],
      onClick: () => {
        this.tree._onNodeClick({ node: this.node })
      },
    })
  }

  _getCheckbox() {
    const { disabled: treeDisabled } = this.tree.props
    const { disabled: nodeDisabled } = this.node.props

    return {
      component: Checkbox,
      plain: true,
      classes: {
        'nom-tree-node-checkbox': true,
      },
      disabled: treeDisabled || nodeDisabled,
      _created: (inst) => {
        this.node.checkboxRef = inst
      },
      value: this.tree.checkedNodeKeysHash[this.node.key] === true,
      onValueChange: ({ newValue }) => {
        if (newValue === true) {
          this.node.check({ checkCheckbox: false })
        } else {
          this.node.uncheck({ uncheckCheckbox: false })
        }
        this.node.autoCheckAll()
      },
    }
  }
}

Component.register(TreeNodeContent)

export default TreeNodeContent
