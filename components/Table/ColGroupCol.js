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
    this.maxTdWidth = 0
  }

  _config() {
    const { width } = this.props.column
    let widthPx = null
    if (width) {
      widthPx = `${width}px`
    }
    if (this.maxTdWidth) {
      widthPx = `${this.maxTdWidth}px`
    }
    this.setProps({
      attrs: {
        style: {
          width: widthPx,
          minWidth: !widthPx ? '60px' : null,
        },
        'data-field': this.props.column.field || null,
      },
    })
  }

  setMaxTdWidth(width) {
    if (this.maxTdWidth < 60 && width < 60) {
      this.maxTdWidth = 0
    } else {
      this.maxTdWidth = Math.max(this.maxTdWidth, width)
    }
  }
}

Component.register(ColGroupCol)

export default ColGroupCol
