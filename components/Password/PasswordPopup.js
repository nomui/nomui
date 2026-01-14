import Component from '../Component/index'
import Popup from '../Popup/index'

class PasswordPopup extends Popup {
  constructor(props, ...mixins) {
    const defaults = {
      trigger: null,
      triggerAction: 'click',
      align: 'bottom left',
      alignOuter: true,

      closeOnClickOutside: true,
      placement: 'append',

      autoRender: false,

      uistyle: 'default',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
  }

  _config() {
    this.setProps({
      children: [
        this.props.text,
        {
          ref: (c) => {
            this.arrow = c
          },
          classes: { 'nom-password-arrow': true },
          children: `#<svg aria-hidden="true" width="24" height="6" viewBox="0 0 24 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg" ><path d="M24 0V1C20 1 18.5 2 16.5 4C14.5 6 14 7 12 7C10 7 9.5 6 7.5 4C5.5 2 4 1 0 1V0H24Z"></path></svg>`,
        },
      ],
    })

    super._config()
  }

  _onOpenerClickHandler() {
    if (this.opener.props.disabled !== true && !this.props.PasswordPopupHidden) {
      this.props.PasswordPopupHidden !== true ? this.show() : this.hide()
    }
  }
}

Component.register(PasswordPopup)

export default PasswordPopup
