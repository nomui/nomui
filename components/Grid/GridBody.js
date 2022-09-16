import Component from '../Component/index'
import Table from '../Table/index'
import { isChrome49 } from '../util/index'
import GridTableMixin from './GridTableMixin'

class GridBody extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      children: { component: Table },
    }

    super(Component.extendProps(defaults, props), GridTableMixin, ...mixins)
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
        keyField: this.grid.props.keyField,
        showEmpty: this.grid.props.showEmpty,
      },
      attrs: {
        onscroll: () => {
          const { scrollLeft } = this.element

          this.grid.header.element.scrollLeft = scrollLeft
          if (this.grid.footer) {
            this.grid.footer.element.scrollLeft = scrollLeft
          }
          this.grid.header.scrollbar && this.grid.header.scrollbar.setScrollLeft(scrollLeft)
        },
      },
    })
  }

  _rendered() {
    // fix: chrome下,最下面的横向滚动条会挡住部分内容,读取过一次dom的属性后,又恢复正常
    if (isChrome49()) {
      this._elWidth = this.element.offsetWidth
    }
  }
}

Component.register(GridBody)

export default GridBody
