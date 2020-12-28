import Component from '../Component/index'

class ColGroupCol extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'col',
      column: {},
    }

    super(Component.extendProps(defaults, props), ...mixins)
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
      },
    })
  }
}

Component.register(ColGroupCol)

export default ColGroupCol
