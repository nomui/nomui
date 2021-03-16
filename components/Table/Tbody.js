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
    const { data = [], rowDefaults } = this.table.props
    const rows = []
    this._getRows(data, rows, 0, 0)

    this.setProps({
      children: rows,
      childDefaults: rowDefaults,
    })
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
