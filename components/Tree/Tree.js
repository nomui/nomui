import Component from '../Component/index'
import TreeWrapper from './TreeWrapper'

class Tree extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      treeData: [
        {
          title: 'Node1',
          value: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-1',
            },
            {
              title: 'Child Node2',
              value: '0-0-2',
              children: [
                {
                  title: 'Child Child Node1',
                  value: '0-0-0-1',
                },
              ],
            },
            {
              title: 'Child Node3',
              value: '0-0-3',
            },
          ],
        },
        {
          title: 'Node2',
          value: '0-1',
        },
      ],
      multiple: false,
      selectable: {
        multiple: true,
      },
      selected: ['0-0-0-1', '0-1'],
      // selected: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _create() {
    this.itemRefs = []
    this.selectedList = []
  }

  _config() {
    const that = this
    const { treeData, selected } = this.props

    if (selected) {
      if (typeof selected === 'string') {
        this.selectedList.push(selected)
      } else {
        this.selectedList = selected
      }
    }

    function mapTree(data) {
      return data.map(function (item) {
        if (item.children && item.children.length > 0) {
          const c = mapTree(item.children)
          return {
            component: TreeWrapper,
            key: item.value,
            title: item.title,
            value: item.value,
            checked: that.selectedList.indexOf(item.value) !== -1,
            items: c,
          }
        }
        return {
          component: TreeWrapper,
          key: item.value,
          title: item.title,
          value: item.value,
          checked: that.selectedList.indexOf(item.value) !== -1,
        }
      })
    }

    const children = mapTree(treeData)

    this.setProps({
      children: {
        tag: 'ul',
        classes: {
          'nom-tree-container': true,
        },
        children: children,
      },
    })
  }

  getSelected() {
    return Object.keys(this.itemRefs).filter((key) => {
      return this.itemRefs[key].props.checked === true
    })
  }

  // fixTreeNode() {
  //   const result = this.getSelected()

  // }
}

Component.register(Tree)

export default Tree
