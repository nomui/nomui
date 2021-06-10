import Component from '../Component/index'
import { isPlainObject } from '../util/index'
import FlexItem from './FlexItem'

class Flex extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      rows: null,
      cols: null,
      direction: 'column',
      wrap: false,
      align: null,
      justify: null,
      gap: null,
      gutter: null,
      fills: false,
      inline: false,
      fit: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this._propStyleClasses = ['direction', 'wrap', 'align', 'justify', 'gap', 'gutter', 'fills', 'fit']

    const { rows, cols, itemDefaults } = this.props
    let { direction } = this.props
    let children = rows

    if (Array.isArray(cols) && cols.length) {
      direction = 'row'
      children = cols
    }

    const childDefaults = Component.extendProps(itemDefaults, {
      component: FlexItem,
      _config: (flexItem) => {
        const { children: subChildren } = flexItem.props
        if (isPlainObject(subChildren)) {
          const { rows: subRows, cols: subCols, component } = subChildren
          if (!component && (Array.isArray(subRows) || Array.isArray(subCols))) {
            subChildren.component = Flex
          }
          flexItem.props.children = subChildren
        }
      },
    })

    this.setProps({
      direction: direction,
      children: children,
      childDefaults: childDefaults,
    })
  }
}

Component.register(Flex)

export default Flex
