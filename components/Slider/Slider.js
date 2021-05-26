import Component from '../Component/index'
import Field from '../Field/index'
import { isFalsy, isFunction, isNumeric } from '../util/index'
import { getOffset, getValidMax, getValidValue } from './helper'

class Slider extends Field {
  constructor(props, ...mixins) {
    const defaults = {
      disable: false,
      max: 100,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    const { value } = this.props
    // 最大值不能小于或等于0，否则重置为默认值100
    const max = getValidMax()
    this.initValue = getValidValue(value, max)
    super._created()
  }

  _config() {
    const sliderRef = this
    const { value, disable, showTip } = this.props
    this._max = getValidMax(this.props.max)
    sliderRef._offset = getValidValue(value, this._max)

    this.setProps({
      control: {
        children: {
          classes: {
            'nom-slider-content': true,
            'nom-slider-content-disabled': disable,
          },
          _created() {
            sliderRef._bar = this
          },
          onClick: disable
            ? null
            : ({ event }) => {
                event.target.focus()
                const _offset = getOffset(sliderRef._bar, event.clientX, sliderRef._max)
                sliderRef.setValue(Math.round(_offset))
              },
          attrs: {
            tabindex: '0',
            onkeydown: sliderRef._handleKeyDown.bind(sliderRef),
          },
          children: [
            {
              classes: {
                'nom-slider-rail': true,
              },
            },
            {
              classes: {
                'nom-slider-track': true,
              },
              _created() {
                sliderRef._track = this
              },
              _config() {
                // const { offset } = this.props
                const offset = sliderRef.getValue()
                const _offset = offset / sliderRef._max
                this.setProps({
                  attrs: {
                    style: { left: 0, width: `${_offset * 100}%` },
                  },
                })
              },
            },
            // {
            //   classes: {
            //     'nom-slider-step': true,
            //   },
            // },
            {
              classes: {
                'nom-slider-handle': true,
              },
              _created() {
                sliderRef._handler = this
              },
              _config() {
                const offset = sliderRef.getValue()
                const _offset = offset / sliderRef._max

                const tip = isFalsy(offset) ? 0 : offset.toString()
                let tooltip = showTip === false ? null : tip
                if (showTip && isFunction(showTip)) {
                  tooltip = showTip(tip)
                }
                this.setProps({
                  attrs: {
                    style: { left: `${_offset * 100}%` },
                  },
                  tooltip,
                })
              },
            },
          ],
        },
      },
    })

    super._config()
  }

  _getValue() {
    return getValidValue(this._offset, this._max)
  }

  _setValue(value) {
    const _value = value === null ? 0 : value
    if (!isNumeric(_value) || _value < 0 || _value > this.props.max) return
    if (this._handler && _value !== this.oldValue) {
      this._offset = _value
      this._handler.update()
      this._track.update()

      super._onValueChange()
      this.oldValue = this.currentValue
      this.currentValue = _value
    }
  }

  _handleKeyDown(e) {
    const { keyCode } = e
    const value = this.getValue()
    if (keyCode === 38) {
      if (value <= this.props.max) {
        this.setValue(value + 1)
      }
    } else if (keyCode === 40) {
      if (value >= 0) {
        this.setValue(value - 1)
      }
    }
  }
}

Component.register(Slider)

export default Slider
