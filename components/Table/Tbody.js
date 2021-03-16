import Component from '../Component/index'
import Tr from './Tr'

class Tbody extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'tbody',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.table = this.parent
  }

  _config() {
    const { data, rowDefaults } = this.table.props
    const children =
      Array.isArray(data) &&
      data.map(function (rowData, index) {
        return {
          component: Tr,
          data: rowData,
          index: index,
        }
      })

    this.setProps({
      children,
      childDefaults: rowDefaults,
    })
  }
}

Component.register(Tbody)

export default Tbody
