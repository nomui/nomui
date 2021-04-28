import Component from '../Component/index'
import Tr from './Tr'

class Tbody extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'tbody',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.table = this.parent
  }

  _config() {
    const { data = [], rowDefaults, keyField } = this.table.props
    const rows = []
    this._getRows(data, rows, 0, 0)

    let props = {
      children: rows,
      childDefaults: Component.extendProps(
        {
          component: Tr,
          key: function () {
            return this.props.data[keyField]
          },
        },
        rowDefaults,
      ),
    }

    if (!rows.length) {
      props = {
        component: Tr,
        children: {
          tag: 'Td',
          attrs: {
            colspan: this.table.props.columns.length,
            style: {
              padding: '25px 0',
            },
          },
          children: {
            component: 'Empty',
          },
        },
      }
    }

    this.setProps(props)
  }

  _getRows(data, rows, index, level) {
    const curLevel = level
    for (const item of data) {
      rows.push({
        component: Tr,
        data: item,
        index: index++,
        level: curLevel,
        isLeaf: !(item.children && item.children.length > 0),
      })

      if (item.children && item.children.length > 0) {
        this._getRows(item.children, rows, index, curLevel + 1)
      }
    }
  }
}

Component.register(Tbody)

export default Tbody
