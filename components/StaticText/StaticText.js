import Component from '../Component/index'
import Field from '../Field/index'

class StaticText extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(StaticText.defaults, props), ...mixins)
  }

  _config() {
    this.setProps({
      // RadioList,CheckboxList等div组件不为 focusable 元素
      // 需设置 tabindex才有 fouces方法，进而触发校验的 Tooltip
      classes: {
        'nom-static-text-input-mode': this.props.appearance === 'input',
      },
      attrs: { tabindex: this.props.tabindex || 0 },
      control: {
        children: this.props.value,
      },
    })
    super._config()
  }

  _setValue(value) {
    this.update({
      value,
    })
  }

  _getValue() {
    return this.props.value
  }
}
StaticText.defaults = {
  value: null,
  appearance: 'input',
}
Component.register(StaticText)

export default StaticText
