import Component from '../Component/index'
import Field from '../Field/index'
import Input from '../Textbox/Input'
import { SPINNER_POSITION } from './helper'

class NumberSpinner extends Field {
  constructor(props, ...mixins) {
    const defaults = {
      align: 'right',
    }

    super(Component.extendProps(defaults, props), ...mixins)
    this._handleSpinnerIcon.bind(this)
    this._handleMinus.bind(this)
    this._handlePlus.bind(this)
  }

  _config() {
    const numberSpinner = this
    const { align, showSpinner, component: com, reference, tag, ...contentProps } = this.props
    const { left, right, horizontal } = SPINNER_POSITION

    // console.log('props', contentProps)
    const inputProps = {
      component: Input,
      name: 'input',
      ...contentProps,
      _created() {
        this.textbox = numberSpinner
        this.textbox.input = this
      },
      classes: {
        'spinner-input-with-left-icon': align === left,
        'spinner-input-with-right-icon': align === right && showSpinner === true,
        'spinner-input-with-double-icon': align === horizontal,
      },
      attrs: {
        onkeydown(key) {
          if (key.keyCode === 38) {
            numberSpinner._handlePlus()
          } else if (key.keyCode === 40) {
            numberSpinner._handleMinus()
          }
        },
        onmouseover() {
          // numberSpinner._handleInputMouseover()
        },
        onmouseout() {
          // numberSpinner._handleInputMouseout()
        },
      },
    }

    const spinner = numberSpinner._handleSpinnerIcon()

    this.setProps({
      control: {
        children: [inputProps, ...spinner],
      },
    })

    super._config()
  }

  _handleSpinnerIcon() {
    const { align, showSpinner } = this.props
    if (showSpinner === false) return []

    const numberSpinner = this
    const { left, right, horizontal } = SPINNER_POSITION

    // enum:left,right,horizontal,
    if ([left, right].includes(align)) {
      return [
        {
          tag: 'span',
          _created(c) {
            numberSpinner.iconContainer = c
          },
          // hidden: true,
          classes: {
            [`nom-textbox-${align}-icon-container`]: true,
          },
          children: [
            {
              component: 'Icon',
              type: 'up',
              onClick: numberSpinner._handlePlus,
            },
            {
              component: 'Icon',
              type: 'down',
              onClick: numberSpinner._handleMinus,
            },
          ],
        },
      ]
    }

    if (align === horizontal) {
      return [
        {
          component: 'Icon',
          type: 'down',
          classes: {
            'nom-textbox-left-icon-container': true,
          },
          onClick: numberSpinner._handleMinus,
        },
        {
          component: 'Icon',
          type: 'up',
          classes: {
            'nom-textbox-right-icon-container': true,
          },
          onClick: numberSpinner._handlePlus,
        },
      ]
    }

    return []
  }

  _handleInputMouseover() {
    this.iconContainer && this.iconContainer.show()
  }

  _handleInputMouseout() {
    this.iconContainer && this.iconContainer.hide()
  }

  _handlePlus(args) {
    if (args) {
      const { event } = args
      if (event) {
        event.preventDefault && event.preventDefault()
        event.stopPropagation && event.stopPropagation()
      }
    }
    console.log('do plus')
    // const n = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(123456.789)
  }

  _handleMinus(args) {
    if (args) {
      const { event } = args
      if (event) {
        event.preventDefault && event.preventDefault()
        event.stopPropagation && event.stopPropagation()
      }
    }
    console.log('do minus')
  }
}

Component.register(NumberSpinner)

export default NumberSpinner
