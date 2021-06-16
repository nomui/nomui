import Component from '../Component/index'
import Sortable from '../util/sortable.core.esm'
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

    Array.isArray(data) && this._getRows(data, rows, 0, 0)

    // const gridProps = this.table.hasGrid ? this.table.grid.props : this.table.props

    // const emptyHeight =
    //   gridProps.attrs && gridProps.attrs.style && gridProps.attrs.style.height
    //     ? `${parseInt(gridProps.attrs.style.height, 10) - 45}px`
    //     : '200px'

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

    if (this.table.props.data && !this.table.props.data.length) {
      props = {
        children: {
          tag: 'tr',
          children: {
            tag: 'Td',
            attrs: {
              colspan: this.table.colLength,
              style: {
                'vertical-align': 'middle',
              },
            },
            children: {
              component: 'Empty',

              description: false,
            },
          },
        },
      }
    }

    this.setProps(props)
  }

  _rendered() {
    if (this.table.hasGrid && this.table.grid.props.rowSortable) {
      new Sortable(this.element, {
        group: this.key,
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        handle: '.nom-grid-drag-handler',
      })
    }
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
