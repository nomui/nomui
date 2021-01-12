import Component from '../Component/index'
import Table from '../Table/index'

class GridBody extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      children: { component: Table },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.grid = this.parent
    this.grid.body = this
  }

  _config() {
    this.setProps({
      children: {
        columns: this.grid.props.columns,
        data: this.grid.props.data,
        attrs: {
          style: {
            minWidth: `${this.grid.minWidth}px`,
          },
        },
        onlyBody: true,
        line: this.props.line
      },
      attrs: {
        onscroll: () => {
          const { scrollLeft } = this.element
          this.grid.header.element.scrollLeft = scrollLeft
        },
      },
    })
  }
}

Component.register(GridBody)

export default GridBody
