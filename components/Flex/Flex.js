import Component from '../Component/index'
import { isPlainObject, isString } from '../util/index'
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
    this._propStyleClasses = [
      'direction',
      'wrap',
      'align',
      'justify',
      'gap',
      'gutter',
      'fills',
      'fit',
    ]

    const { rows, cols, itemDefaults } = this.props
    let { direction } = this.props
    let children = rows

    if (Array.isArray(cols) && cols.length) {
      direction = 'row'
      children = cols
    }

    children = children.map((item) => {
      return Component.extendProps(itemDefaults, this._normalizeItem(item), { component: FlexItem })
    })

    this.setProps({
      direction: direction,
      children: children,
      childDefaults: null,
    })
  }

  _normalizeItem(item) {
    let itemProps = {}
    const { component, tag, rows, cols, children: subChildren } = item
    if (
      (component && component !== FlexItem && component !== 'FlexItem') ||
      (component !== FlexItem && component !== 'FlexItem' && isString(tag))
    ) {
      itemProps.children = item
    } else if (Array.isArray(rows) || Array.isArray(cols)) {
      item.component = Flex
      itemProps.children = item
    } else if (isPlainObject(subChildren)) {
      const { rows: subRows, cols: subCols } = subChildren
      if (Array.isArray(subRows) || Array.isArray(subCols)) {
        subChildren.component = Flex
      }
      itemProps.children = subChildren
    } else {
      itemProps = item
    }

    return itemProps
  }
}

Component.register(Flex)

export default Flex
