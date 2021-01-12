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
    const { data } = this.table.props
    const children =
      Array.isArray(data) &&
      data.map(function (rowData) {
        return {
          component: Tr,
          data: rowData,
        }
      })

    this.setProps({
      children,
    })
  }
}

Component.register(Tbody)

export default Tbody
