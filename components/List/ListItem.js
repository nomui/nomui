import Component, { n } from '../Component/index'
import ListItemContentMixin from './ListItemContentMixin'

class ListItem extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'li',
      data: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.list = this.parent.list
    const { dataFields = { key: 'key' } } = this.list.props
    const { data } = this.props
    Object.keys(dataFields).forEach((dataField) => {
      this.props[dataField] = data[dataFields[dataField]]
    })
    this._setKey()
    this.list.itemRefs[this.key] = this
  }

  _config() {
    const {
      itemRender = ({ itemData }) => {
        return {
          children: itemData,
        }
      },
    } = this.list.props
    const { data } = this.props

    this.setProps({
      selectable: { byClick: false },
      children: itemRender({ itemData: data, list: this.list, item: this }),
      childDefaults: n(null, null, null, [ListItemContentMixin]),
    })
  }

  _remove() {
    delete this.list.itemRefs[this.key]
  }

  select() {
    this.content.select()
  }

  unselect() {
    this.content.unselect()
  }
}

Component.register(ListItem)

export default ListItem
