import Component from '../Component/index'
import List from '../List/index'
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
      optionDefaults: {
        key() {
          return this.props.value
        },
        _config: function () {
          this.setProps({
            children: this.props.text,
          })
        },
      },
      selectedSingle: {
        classes: {
          'nom-tree-select-single': true,
        },
        _config: function () {
          this.setProps({
            children: this.props.text,
          })
        },
      },
      selectedMultiple: {
        component: List,
        itemDefaults: {
          _config: function () {
            this.setProps({
              tag: 'span',
              children: this.props.text,
            })
          },
        },
        styles: {
          flex: 'row',
          gap: 'sm',
        },
      },
      multiple: false,
      showArrow: true,
      minItemsForSearch: 20,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const that = this
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
    console.log(children)

    this.setProps({
      selectedSingle: {
        _create() {
          that.selectedSingle = this
        },
      },
      selectedMultiple: {
        itemDefaults: {
          key() {
            return this.props.value
          },
        },
        _create() {
          that.selectedMultiple = this
        },
      },
    })

    // if (showArrow) {
    //   children.push({
    //     component: Icon,
    //     type: 'down',
    //     classes: {
    //       'nom-tree-select-arrow': true,
    //     },
    //   })
    // }

    this.setProps({
      children: {
        tag: 'ul',
        classes: {
          'nom-tree-warpper': true,
        },
        children: children,
      },
    })

    // super._config()
  }
}

Component.register(Tree)

export default Tree
