import Checkbox from '../Checkbox/index'
import Component from '../Component/index'
import Icon from '../Icon/index'
import { extend } from '../util/index'

class TreeNodeContent extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(TreeNodeContent.defaults, props), ...mixins)
  }

  _created() {
    this.node = this.parent
    this.node.content = this
    this.level = this.node.level
    this.tree = this.node.tree
  }

  _config() {
    const me = this
    const { text, icon, tools } = this.node.props
    const { initExpandLevel, nodeCheckable, expandable } = this.tree.props
    const { nodes, childrenData } = this.node.props

    const isNotEmptyNode =
      this.node._isNotEmptyArray(nodes) || this.node._isNotEmptyArray(childrenData)
    let expanded = (initExpandLevel === -1 || initExpandLevel > this.level) && isNotEmptyNode

    if (this.tree.expandedNodeRefs[this.node.key] !== undefined) {
      expanded = true
    }

    const tree = this.tree

    const indicatorProps = {
      component: Icon,
      classes: {
        'nom-tree-node-expandable-indicator': true,
        'is-leaf': this.node.isLeaf && !this.node.isLoadData,
      },
      expandable: {
        expandedProps: {
          type: 'sort-down',
        },
        collapsedProps: {
          type: 'sort-right',
        },
      },
    }

    if (nomui.utils.isFunction(this.tree.props.loadData) && !isNotEmptyNode) {
      indicatorProps.onClick = () => {
        this._handleLoadData()
      }
    }

    let toolProps = null
    let isNewToolProp = false

    if (tools) {
      if (nomui.utils.isFunction(tools)) {
        toolProps = tools({ node: this.node, tree: this.tree })
      } else if (tools.component) {
        toolProps = tools
      } else if (tools.render) {
        isNewToolProp = true
        const n = tools.render({ node: this.node, tree: this.tree, nodeData: this.node.props.data })
        toolProps = {
          justify: tools.justify || 'start',
          items: Array.isArray(n) ? n : [n],
        }
      }
    }

    this.setProps({
      hidden: this.node.props.data.hidden,
      expanded,
      // byIndicator 属性通过外部传入
      expandable: extend(expandable, {
        byClick: true,
        target: () => {
          return this.node.nodesRef
        },
        indicator: indicatorProps,
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
        this.tree.props.sortable &&
          this.tree.props.sortable.showHandler && {
            attrs: {
              style: {
                paddingLeft: '1rem',
              },
            },
            children: {
              component: 'Icon',
              type: 'swap',
              classes: { 'nom-tree-drag-handler': true },
            },
          },
        this.getExpandableIndicatorProps(expanded),
        nodeCheckable && this._getCheckbox(),
        icon &&
          Component.extendProps(
            { classes: { 'nom-tree-node-content-icon': true } },
            Component.normalizeIconProps(icon),
          ),
        Component.extendProps(
          {
            tag: 'span',
            classes: { 'nom-tree-node-content-text': true },
            created: function () {
              me.node.contentText = this
            },
          },
          Component.normalizeTemplateProps(text),
        ),
        tools &&
          (isNewToolProp
            ? {
                classes: {
                  'nom-tree-node-content-tools': true,
                  'nom-tree-node-content-tools-flex': true,
                  'nom-tree-node-content-tools-hover': !!tools.hover,
                },
                children: {
                  component: 'Flex',
                  justify: toolProps.justify,
                  fit: true,
                  cols: toolProps.items,
                },
              }
            : Component.extendProps(
                {
                  classes: {
                    'nom-tree-node-content-tools': true,
                    'nom-tree-node-content-tools-hover': !!tools.hover,
                  },
                },
                toolProps,
              )),
      ],
      onClick: () => {
        this.tree._onNodeClick({ node: this.node })
      },
    })
  }

  expand() {
    this.tree.expandedNodeRefs[this.node.key] = this.node
    super.expand()
  }

  collapse() {
    delete this.tree.expandedNodeRefs[this.node.key]
    super.collapse()
  }

  _handleLoadData() {
    const r = this.tree.props.loadData({
      data: this.node.props.data,
      key: this.node.key,
      node: this.node,
    })
    if (nomui.utils.isPromiseLike(r)) {
      r.then((res) => {
        if (!Array.isArray(res) || res.length === 0) {
          this.node.update({ data: { ...this.node.props.data, isLeaf: true } })
          return
        }
        this.node.addNodes(res)
      })
    } else if (Array.isArray(r)) {
      if (r.length === 0) {
        this.node.update({ data: { ...this.node.props.data, isLeaf: true } })
        return
      }
      this.node.addNodes(r)
    }
  }

  _getCheckbox() {
    const { disabled: treeDisabled, nodeCheckable } = this.tree.props
    const { disabled: nodeDisabled, partChecked } = this.node.props

    return {
      component: Checkbox,
      plain: true,
      classes: {
        'nom-tree-node-checkbox': true,
      },
      partChecked,
      hidden: nodeCheckable && nodeCheckable.onlyleaf && !this.node.isLeaf,
      disabled: treeDisabled || nodeDisabled,
      _created: (inst) => {
        this.node.checkboxRef = inst
      },
      onClick: ({ event }) => {
        event.stopPropagation()
      },
      value:
        this.node.props.checked === true || this.tree.checkedNodeKeysHash[this.node.key] === true,
      onValueChange: ({ newValue }) => {
        if (newValue === true) {
          this.node.check({ checkCheckbox: false })
        } else {
          this.node.uncheck({ uncheckCheckbox: false })
        }
        this.node && this.node.autoCheckAll()
      },
    }
  }
}
TreeNodeContent.defaults = {
  text: null,
}
Component.register(TreeNodeContent)

export default TreeNodeContent
