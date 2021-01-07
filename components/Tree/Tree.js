import Component from '../Component/index'
import TreeItem from './TreeItem'

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
          ],
        },
        {
          title: 'Node2',
          value: '0-1',
        },
      ],
      multiple: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { treeData } = this.props

    function mapTree(data) {
      return data.map(function (item) {
        if (item.children && item.children.length > 0) {
          const c = mapTree(item.children)
          return {
            component: TreeItem,
            key: item.value,
            title: item.title,
            value: item.value,
            items: c,
          }
        }
        return {
          component: TreeItem,
          key: item.value,
          title: item.title,
          value: item.value,
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
