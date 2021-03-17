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
        line: this.props.line,
        rowDefaults: this.props.rowDefaults,
        treeConfig: this.grid.props.treeConfig,
      },
      attrs: {
        onscroll: () => {
          const { scrollLeft } = this.element

          this.grid.header.element.scrollLeft = scrollLeft

          // console.log(scrollLeft)
          // console.log(this.grid.header.element.scrollLeft)
          // if (scrollLeft > this.grid.header.element.scrollLeft) {
          //   debugger
          // }

          // this.grid.update({
          //   classes: {
          //     'nom-table-has-left-fixed': scrollLeft > 0,
          //     'nom-table-has-right-fixed': scrollLeft !== this.element.scrollWidth,
          //   },
          // })
        },
      },
    })
  }
}

Component.register(GridBody)

export default GridBody
