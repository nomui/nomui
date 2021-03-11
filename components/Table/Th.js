import Component from '../Component/index'

class Th extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'th',
      column: {},
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.tr = this.parent
    this.table = this.tr.table
  }

  _config() {
    const that = this
    const children = {
      component: 'Cols',
      align: 'center',
      items: [
        {
          children: this.props.column.header || this.props.column.title,
        },
        {
          component: 'Icon',
          type: 'sort',
          hidden: !this.props.column.sortable,
        },
        {
          component: 'Icon',
          type: 'pin',
          hidden: !that.table.hasGrid || !that.table.grid.props.allowFrozenCols,
          onClick: function () {
            // that.table.grid.handlePinClick(that.props.column)
          },
        },
      ],
    }

    this.setProps({
      children: children,
      classes: {
        'nom-table-fixed-left': this.props.column.fixed === 'left',
        'nom-table-fixed-left-last': this.props.column.lastLeft,
        'nom-table-fixed-right': this.props.column.fixed === 'right',
        'nom-table-fixed-right-first': this.props.column.firstRight,
      },
    })
  }

  _rendered() {
    if (this.props.column.fixed === 'left') {
      this._setStyle({ left: `${this.element.offsetLeft}px` })
    } else if (this.props.column.fixed === 'right') {
      this._setStyle({
        right: `${
          this.parent.element.offsetWidth - this.element.offsetLeft - this.element.offsetWidth
        }px`,
      })
    }
  }
}

Component.register(Th)

export default Th
