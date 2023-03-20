import Component from '../Component/index'
import Loading from '../Loading/index'
import ColGroup from './ColGroup'
import Tbody from './Tbody'
import Thead from './Thead'

class Table extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Table.defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.colRefs = []
    this.thRefs = []
    this.hasGrid = ['GridHeader', 'GridBody', 'GridFooter'].some(
      (item) => this.parent.componentType === item,
    )

    if (this.hasGrid) {
      this.grid = this.parent.parent
      this.parent.table = this
    }
    this.hasRowGroup = false
    this.hasMultipleThead = false
  }

  _config() {
    const that = this
    this._propStyleClasses = ['line', 'bordered']
    const isStriped =
      (this.hasGrid && this.grid.props.striped === true) || this.props.striped === true || false

    let hasMask = false
    if (this.hasGrid) {
      this.props.ellipsis = this.grid.props.ellipsis
      hasMask = this.grid.props.highlightCol
    }

    this.setProps({
      tag: 'table',
      classes: {
        'nom-table-striped': isStriped,
      },
      children: [
        { component: ColGroup },
        this.props.onlyBody !== true && { component: Thead },
        this.props.onlyHead !== true && { component: Tbody },
        hasMask &&
          this.parent.componentType === 'GridBody' && {
            tag: 'div',
            classes: { 'nom-table-th-hover-mask': true },
            _created() {
              that.grid.highlightMask = this
            },
          },
      ],
    })
  }

  _rendered() {
    if (this.loadingInst) {
      this.loadingInst.remove()
      this.loadingInst = null
    }

    if ((this.hasGrid && this.grid.props.autoMergeColumns) || this.hasRowGroup) {
      this.grid.setProps({
        classes: {
          'nom-table-has-row-group': true,
        },
      })
    }
  }

  loading() {
    this.loadingInst = new Loading({
      container: this.parent,
    })
  }

  appendRow(rowProps) {
    if (!this.props.data) {
      this.props.data = []
    }
    if (!this.props.data.length) {
      this.tbody.update({
        showEmpty: false,
      })
    }
    const row = this.tbody.appendChild({ ...rowProps, ...{ index: this.props.data.length } })
    this.props.data.push(rowProps.data)
    if (this.hasGrid) {
      this.grid.rowsRefs[row.key] = row
    }
  }

  getRows() {
    return this.tbody.getChildren()
  }

  selectTr(tr) {
    if (this.activeTr) {
      this.activeTr.element.classList.remove('nom-tr-selected')
    }
    this.activeTr = tr
    this.activeTr.element.classList.add('nom-tr-selected')

    this.hasGrid &&
      this.grid.props.rowSelectable &&
      this.grid.props.rowSelectable.onSelect &&
      this.grid._callHandler(this.grid.props.rowSelectable.onSelect, {
        row: tr,
        rowData: tr.props.data,
      })
  }
}

Table.defaults = {
  tag: 'table',
  columns: [],
  rowDefaults: {},
  onlyHead: false,
  onlyBody: false,
  keyField: 'id',
  striped: false,
  treeConfig: {
    childrenField: 'children',
    treeNodeColumn: null,
    initExpandLevel: -1,
    indentSize: 6,
  },
  showTitle: false,
  ellipsis: false,
  showEmpty: true,
}

Component.register(Table)

export default Table
