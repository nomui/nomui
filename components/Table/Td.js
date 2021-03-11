import Component from '../Component/index'
import { isFunction } from '../util/index'

class Td extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'td',
      data: null,
      column: {},
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    let children = this.props.data

    if (isFunction(this.props.column.render)) {
      children = this.props.column.render.call(this, this.props.data, this.props.record)
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

Component.register(Td)

export default Td
