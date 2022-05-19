import Component from '../Component/index'
import { isFunction, isNumeric } from '../util/index'
import { CSS_UNIT } from '../util/reg'
import { isValidZIndex, settles } from './helper'

class Drawer extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Drawer.defaults, props), ...mixins)
  }

  _config() {
    const drawerRef = this
    const { zIndex, settle, maskClosable, showMasker, width, height, animate } = this.props

    const _settle = settles.includes(settle) ? settle : 'right'

    let _style = {}

    if (isValidZIndex(zIndex)) {
      _style = { ..._style, 'z-index': zIndex }
    }

    const children = []

    // mask
    if (showMasker) {
      children.push({
        classes: {
          'nom-drawer-mask': true,
        },
      })
    }

    // content
    children.push({
      classes: {
        'nom-drawer-content-wrapper': true,
      },
      attrs: {
        style: ['left', 'right'].includes(_settle)
          ? { ...drawerRef._handleSize(width, 'width') }
          : { ...drawerRef._handleSize(height, 'height') },
      },
      children: drawerRef._handleContent(),
    })

    const _container = this._getContainerElement()

    if (_container !== document.body) {
      // this.referenceElement = _container instanceof Component ? _container.element : _container
      this.referenceElement = _container
      _container.style.position = 'relative'
      _style = { ..._style, position: 'absolute' }
    }
    this.setProps({
      classes: {
        // [`nom-drawer-${_settle}`]: true,
        'nom-drawer-top': _settle === 'top',
        'nom-drawer-right': _settle === 'right',
        'nom-drawer-bottom': _settle === 'bottom',
        'nom-drawer-left': _settle === 'left',
        [`nom-drawer-animate-${_settle}-show`]: animate,
        'nom-drawer-mask-animate-show': animate,
      },
      onClick: () => {
        maskClosable && drawerRef.close(drawerRef)
      },
      attrs: {
        style: _style,
      },
      children,
    })
  }

  _handleContent() {
    const drawerRef = this
    const {
      closable,
      closeIcon,
      title,
      content,
      footer,
      okText,
      cancelText,
      onOk,
      onCancel,
    } = this.props

    const children = []

    if (title) {
      children.push({
        classes: {
          'nom-drawer-header': true,
        },
        children: closable
          ? [
              title,
              Component.extendProps(Component.normalizeIconProps(closeIcon), {
                classes: {
                  'nom-drawer-close-icon': true,
                },
                onClick: () => {
                  drawerRef.close()
                },
              }),
            ]
          : title,
      })
    } else if (closable) {
      children.push({
        classes: {
          'nom-drawer-no-header': true,
        },
        children: Component.extendProps(Component.normalizeIconProps(closeIcon), {
          classes: {
            'nom-drawer-close-icon': true,
          },
          onClick: () => {
            drawerRef.close()
          },
        }),
      })
    }

    children.push({
      classes: {
        'nom-drawer-content': true,
      },
      _config() {
        if (content) {
          this.setProps({ children: content })
        }
      },
    })

    if (footer !== null) {
      children.push({
        classes: {
          'nom-drawer-footer': true,
        },
        _config() {
          if (footer) {
            this.setProps({
              children: footer,
            })
          } else {
            this.setProps({
              children: {
                component: 'Cols',
                justify: 'center',
                items: [
                  {
                    component: 'Button',
                    type: 'primary',
                    text: okText,
                    onClick: () => {
                      drawerRef._callHandler(onOk)
                    },
                  },
                  {
                    component: 'Button',
                    text: cancelText,
                    onClick: () => {
                      drawerRef._callHandler(onCancel)
                    },
                  },
                ],
              },
            })
          }
        },
      })
    }

    return [
      {
        classes: {
          'nom-drawer-body': true,
        },
        onClick: ({ event }) => {
          event.stopPropagation()
        },
        children,
      },
    ]
  }

  _getRelativePosition(container) {
    if (container instanceof HTMLElement) {
      return container.getBoundingClientRect()
    }
  }

  _getContainerElement() {
    let _containerElement = document.body
    const { getContainer } = this.props

    if (isFunction(getContainer)) {
      const c = getContainer()

      if (c instanceof Component && c.element) {
        _containerElement = c.element
      } else if (c instanceof HTMLElement) {
        _containerElement = c
      }
    }
    return _containerElement
  }

  _getContainerRect(e) {
    if (e instanceof HTMLElement) {
      return e.getBoundingClientRect()
    }

    return null
  }

  close() {
    this.props.animate && this.hideAnimation()
    !this.props.animate && this.remove()
  }

  hideAnimation() {
    this.addClass(`nom-drawer-animate-${this.props.settle}-hide`)
    setTimeout(() => {
      this.addClass('nom-drawer-mask-animate-hide')
      setTimeout(() => {
        this.remove()
      }, 90)
    }, 90)
  }

  _handleSize(size, unit) {
    if (!CSS_UNIT.test(size)) return {}

    return isNumeric(size) ? { [unit]: `${size}px` } : { [unit]: size }
  }

  _animation(visible, x) {
    if (visible) return {}

    return x ? { transform: 'translateX(100%)' } : { transform: 'translateY(100%)' }
  }
}

Drawer.defaults = {
  closable: true,
  closeIcon: 'close',
  maskClosable: true,
  showMasker: true,
  settle: 'right',
  okText: '确 定',
  cancelText: '取 消',
  onOk: (e) => {
    e.sender.close()
  },
  onCancel: (e) => {
    e.sender.close()
  },
}

Component.register(Drawer)

export default Drawer
