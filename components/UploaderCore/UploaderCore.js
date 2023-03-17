import Component from '../Component/index'

class UploaderCore extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(UploaderCore.defaults, props), ...mixins)
  }

  _created() {
    super._created()
  }

  _config() {
    super._config()
  }

  _rendered() {}
}
UploaderCore.defaults = {
  trigger: null,
  align: 'top',
  alignOuter: true,

  closeOnClickOutside: true,

  autoRender: false,
  hidden: false,
}

Component.register(UploaderCore)

export default UploaderCore
