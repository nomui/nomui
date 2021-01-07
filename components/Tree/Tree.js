import Component from '../Component/index'
import TreeNode from './TreeNode'

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
      selected: ['0-0-2', '0-1'],
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { treeData, selected } = this.props
    let selectedList = []
    if (typeof selected === 'string') {
      selectedList.push(selected)
    } else {
      selectedList = selected
    }

    function mapTree(data) {
      return data.map(function (item) {
        if (item.children && item.children.length > 0) {
          const c = mapTree(item.children)
          return {
            component: TreeNode,
            key: item.value,
            title: item.title,
            value: item.value,
            status: selectedList.indexOf(item.value) !== -1 ? 1 : 0,
            items: c,
          }
        }
        return {
          component: TreeNode,
          key: item.value,
          title: item.title,
          value: item.value,
          status: selectedList.indexOf(item.value) !== -1 ? 1 : 0,
        }
      })
    }

    const children = mapTree(treeData)

    this.setProps({
      children: {
        tag: 'ul',
        classes: {
          'nom-tree-warpper': true,
        },
        children: children,
      },
    })
  }
}

Component.register(Tree)

export default Tree
