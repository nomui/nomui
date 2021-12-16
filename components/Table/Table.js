import Component from '../Component/index'
import Loading from '../Loading/index'
import ColGroup from './ColGroup'
import Tbody from './Tbody'
import Thead from './Thead'

class Table extends Component {
  constructor(props, ...mixins) {
    const defaults = {
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
    }

    super(Component.extendProps(defaults, props), ...mixins)
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
  }

  _config() {
    this._propStyleClasses = ['line', 'bordered']
    const isStriped =
      (this.hasGrid && this.grid.props.striped === true) || this.props.striped === true || false

    if (this.hasGrid) {
      this.props.ellipsis = this.grid.props.ellipsis
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
    this.tbody.appendChild(rowProps)
  }

  getRows() {
    return this.tbody.getChildren()
  }
}

Component.register(Table)

export default Table
