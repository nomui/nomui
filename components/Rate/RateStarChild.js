import Component from '../Component/index'

class RateStarChild extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      rateIcon: '',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.rate = this.parent.rate
  }

  _config() {
    // this.setProps({
    //   children: 'A',
    // })

    super._config()
  }
}

Component.register(RateStarChild)

export default RateStarChild
