import Component from '../Component/index'
import Control from '../Control/index'

class Switch extends Control {
  constructor(props, ...mixins) {
    const defaults = {}
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this.setProps({
      tag: 'button',
      children: [
        {
          tag: 'span',
          children: 'switch',
        },
      ],
    })

    super._config()
  }
}

Component.register(Switch)
export default Switch
