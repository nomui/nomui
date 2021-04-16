import Component from '../Component/index'

class ColGroupCol extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'col',
      column: {},
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.table = this.parent.table
    this.table.colRefs[this.props.column.field] = this
  }

  _config() {
    const { width } = this.props.column
    let widthPx = null
    if (width) {
      widthPx = `${width}px`
    }
    this.setProps({
      attrs: {
        style: {
          width: widthPx,
        },
        'data-field': this.props.column.field || null,
      },
    })
  }
}

Component.register(ColGroupCol)

export default ColGroupCol
