import Component from '../Component/index'
import { STATUS } from './helper'

class Step extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      disabled: false,
      current: 0,
      // wait process finish error
      status: 'wait',
    }
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    // status wait process finish error
    const { status, title, subTitle, description, onChange, index, icon: i } = this.props

    const icon = this._handleIcon()

    this.setProps({
      classes: {
        [`nom-step-item-${status}`]: true,
      },
      children: {
        classes: {
          'nom-step-item-container': true,
        },
        _config() {
          if (onChange) {
            this.setProps({
              attrs: { role: 'button' },
              onClick: () => {
                onChange(index)
              },
            })
          }
        },
        children: [
          {
            classes: {
              'nom-step-item-tail': true,
            },
          },
          {
            classes: {
              'nom-step-item-icon': true,
              'nom-step-item-icon-customer': !!i,
            },
            children: icon,
          },
          {
            classes: {
              'nom-step-item-content': true,
            },
            children: [
              {
                classes: {
                  'nom-step-item-title': true,
                },
                children: title,
              },
              {
                classes: {
                  'nom-step-item-subtitle': true,
                },
                children: subTitle,
              },
              {
                classes: {
                  'nom-step-item-description': true,
                },
                children: description,
              },
            ],
          },
        ],
      },
    })

    super._config()
  }

  _handleIcon() {
    const { status, icon: i, index } = this.props
    // const { WAIT, PROCESS, FINISH, ERROR } = STATUS
    const { FINISH, ERROR } = STATUS

    if (i) {
      return Component.normalizeIconProps(i)
    }
    if (status === FINISH) {
      return {
        component: 'Icon',
        type: 'check',
        classes: {
          [`nom-step-${status}-icon`]: true,
        },
      }
    }
    if (status === ERROR) {
      return {
        component: 'Icon',
        type: 'close',
        classes: {
          [`nom-step-${status}-icon`]: true,
        },
      }
    }
    return {
      tag: 'span',
      children: index + 1,
      classes: {
        [`nom-step-${status}-icon`]: true,
      },
    }
  }
}

export default Step
