import Component, { n } from '../Component/index'
import { isFunction, isNumeric, isPlainObject, isString } from '../util/index'
import { CSS_UNIT } from '../util/reg'
import { isValidZIndex, settles } from './helper'

class Drawer extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Drawer.defaults, props), ...mixins)
  }

  _config() {
    const drawer = this
    const { zIndex, settle, maskClosable, showMasker, animate, size } = this.props
    let { width, height } = this.props

    if (size) {
      if (isPlainObject(size)) {
        width = width || size.width
        height = height || size.height
      }
      else {
        const sizeMap = {
          'xsmall': {
            width: '256px',
            height: '256px'
          },
          'small': {
            width: '512px',
            height: '512px'
          },
          'medium': {
            width: '50vw',
            height: '50vh'
          },
          'large': {
            width: '75vw',
            height: '75vh'
          },
          'xlarge': {
            width: '100vw',
            height: '100vh'
          },
        }
        width = sizeMap[size].width
        height = sizeMap[size].height
      }
    }

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
          ? { ...drawer._handleSize(width, 'width') }
          : { ...drawer._handleSize(height, 'height') },
      },
      children: drawer._handleContent(),
    })

    const _container = this._getContainerElement()

    if (_container !== document.body) {
      this.referenceElement = _container
      _container.style.position = 'relative'
      _style = { ..._style, position: 'absolute' }
    }
    this.setProps({
      classes: {
        'nom-drawer-top': _settle === 'top',
        'nom-drawer-right': _settle === 'right',
        'nom-drawer-bottom': _settle === 'bottom',
        'nom-drawer-left': _settle === 'left',
        [`nom-drawer-animate-${_settle}-show`]: animate,
        'nom-drawer-mask-animate-show': animate,
      },
      onClick: () => {
        maskClosable && drawer.close(drawer)
      },
      attrs: {
        style: _style,
      },
      children,
    })
  }

  _handleContent() {
    const drawer = this
    const { content } = this.props

    let children = []

    if (isString(content)) {
      children = {

        _created() {
          require([content], (contentConfig) => {
            let props = contentConfig

            if (isFunction(props)) {
              const pNames = drawer.getParameterNames(props)

              if (pNames.length && pNames[0] === '{') {
                const args = drawer.props.args || {}
                props = contentConfig({ drawer: drawer, args: args })
                if (props.then) {
                  props.then((result) => {

                    props = result
                    props = Component.extendProps(drawer._getDefaultPanelContent(props), {
                      body: {
                        classes: {
                          'nom-drawer-body': true
                        },
                      }
                    }, props)
                    this.update({
                      attrs: {
                        style: {
                          height: '100%'
                        }
                      },
                      children: n(null, props, null, null)
                    })
                  })
                } else {
                  props = Component.extendProps(drawer._getDefaultPanelContent(props), {
                    body: {
                      classes: {
                        'nom-drawer-body': true
                      },
                    }
                  }, props)
                  this.update({
                    attrs: {
                      style: {
                        height: '100%'
                      }
                    },
                    children: n(null, props, null, null)
                  })
                }
              } else {
                props = contentConfig.call(this, drawer)
                props = Component.extendProps(drawer._getDefaultPanelContent(props), {
                  body: {
                    classes: {
                      'nom-drawer-body': true
                    },
                  }
                }, props)
                this.update({
                  attrs: {
                    style: {
                      height: '100%'
                    }
                  },
                  children: n(null, props, null, null)
                })
              }
            }
          })
        }
      }
    }
    else {
      children = Component.extendProps(drawer._getDefaultPanelContent({}), {
        body: {
          classes: {
            'nom-drawer-body': true
          },
          children: isFunction(content) ? content() : content
        }
      })

    }



    return [
      {
        classes: {
          'nom-drawer-contents': true,
        },
        onClick: ({ event }) => {
          event.stopPropagation()
        },
        children,
      },
    ]
  }

  getParameterNames(fn) {
    const code = fn.toString()
    const result = code.slice(code.indexOf('(') + 1, code.indexOf(')')).match(/([^\s,]+)/g)
    return result === null ? [] : result
  }


  _getDefaultPanelContent(contentProps) {
    const drawer = this
    drawer.setProps({
      okText: contentProps.okText || this.props.okText,
      onOk: contentProps.onOk || this.props.onOk,
      cancelText: contentProps.cancelText || this.props.cancelText,
      onCancel: contentProps.onCancel || this.props.onCancel,
    })

    const { okText, cancelText, onOk, onCancel, closable, title, closeIcon, content } = drawer.props
    return {
      component: 'Panel',
      fit: true,
      uistyle: 'splitline',
      header: (title || closable || isString(content)) ? {
        caption: {
          title: title
        },
        classes: {
          'nom-drawer-header': true
        },
        nav: {},
        tools: [
          closable && {
            component: 'Icon',
            classes: {
              'nom-drawer-close-icon': true
            },
            type: closeIcon || 'close',
            onClick: function () {
              drawer.close()
            },
          },
        ],
      } : false,
      footer: {
        classes: {
          'nom-drawer-footer': true
        },
        children: {
          component: 'Flex',

          fit: true,
          align: 'center',
          justify: 'center',
          gap: 'medium',
          cols: [
            {
              component: 'Button',
              type: 'primary',
              text: okText,
              onClick: () => {
                drawer._callHandler(onOk)
              },
            },
            {
              component: 'Button',
              text: cancelText,
              onClick: () => {
                drawer._callHandler(onCancel)
              },
            },
          ],
        },
      },
    }
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
    this.props && this.props.animate && this.animateHide()
    this.props && !this.props.animate && this.remove()
  }

  animateHide() {
    if (!this.element) return false
    this.addClass(`nom-drawer-animate-${this.props.settle}-hide`)
    setTimeout(() => {
      if (!this.element) return false
      this.addClass('nom-drawer-mask-animate-hide')
      setTimeout(() => {
        if (!this.element) return false
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
