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
    this.table.tbody = this
    this.props.showEmpty = this.table.props.showEmpty
  }

  _config() {
    const { data = [], rowDefaults, keyField } = this.table.props
    const rows = []

    Array.isArray(data) && this._getRows(data, rows, 0, 0, {})

    let props = {
      children: rows,
      childDefaults: Component.extendProps(
        {
          component: Tr,
          key: function () {
            return this.props.data[keyField]
          },
          _config: function () {
            this.setProps({
              attrs: {
                'data-key': this.props.data[keyField],
              },
            })
          },
          onClick: (args) => {
            const { event, sender } = args
            this.table.hasGrid &&
              this.table.grid.props.onRowClick &&
              this.table.grid._callHandler('onRowClick', { event, rowData: sender.props.data })

            this.table.hasGrid &&
              this.table.grid.props.rowSelectable &&
              this.table.selectTr(args.sender)
          },
        },
        rowDefaults,
      ),
    }

    if (this.props.showEmpty && this.table.props.data && !this.table.props.data.length) {
      props = {
        children: {
          tag: 'tr',
          classes: {
            'nom-tr-empty': true,
          },
          hidden: !!this.table.grid,
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

              description: this.table.props.emptyText,
            },
          },
        },
      }
    }

    this.setProps(props)
  }

  _rendered() {
    if (this.table.hasGrid && this.table.grid.props.rowSortable) {
      const me = this
      const { grid } = this.table
      new Sortable(this.element, {
        group: this.key,
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        handle: '.nom-grid-drag-handler',
        filter: '.nom-grid-tr-no-drag',
        onEnd: function ({ item, oldIndex, newIndex }) {
          me.table._showExpandedTr()
          grid.handleDrag({ item, oldIndex, newIndex })
        },
        onStart: function () {
          me.table._hideExpandedTr()
        },
      })
    }
  }

  _getRows(data, rows, index, level, lastRowRef = {}) {
    const curLevel = level
    const { treeConfig } = this.table.props
    const { childrenField } = treeConfig

    // currRowRef: 当前的tr实例
    // lastRowRef: 自身的上一个level的tr
    // 将自身 data.children 产生的tr实例，使用childTrs存下来
    // 在expand, collapse时即可更灵活
    // 免除了 key相同时导致的 tr实例被覆盖的问题
    data.forEach((item) => {
      let currRowRef = { childTrs: [] }
      rows.push({
        // component: Tr,
        data: item,
        index: index++,
        level: curLevel,
        isLeaf: !(item[childrenField] && item[childrenField].length > 0),
        childTrs: currRowRef.childTrs,
        ref: (c) => {
          currRowRef = c
          if (!lastRowRef.childTrs) lastRowRef.childTrs = []
          lastRowRef.childTrs.push(c)
        },
      })

      if (treeConfig.treeNodeColumn && item[childrenField] && item[childrenField].length > 0) {
        this._getRows(item[childrenField], rows, index, curLevel + 1, currRowRef)
      }
    })
  }
}

Component.register(Tbody)

export default Tbody
