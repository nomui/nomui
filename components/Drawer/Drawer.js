import Component from '../Component/index'
import { isNumeric } from '../util/index'
import { CSS_UNIT } from '../util/reg'
import { isValidZIndex, settles } from './helper'

class Drawer extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      closable: true,
      closeIcon: 'close',
      maskClosable: true,
      showMasker: true,
      visible: false,
      settle: 'right',
      okText: '确 定',
      cancelText: '取 消',
      placeGlobal: true,
      onOk: (e) => {
        e.sender.close()
      },
      onCancel: (e) => {
        e.sender.close()
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const drawerRef = this
    const {
      zIndex,
      settle,
      visible,
      maskClosable,
      showMasker,
      placeGlobal,
      width,
      height,
    } = this.props

    if (!placeGlobal && this.parent && this.parent.element) {
      this.parent.element.style.position = 'relative'
    }

    const _settle = settles.includes(settle) ? settle : 'right'

    const children = []

    // mask
    if (showMasker) {
      children.push({
        classes: { 'nom-drawer-mask': true },
      })
    }

    // content
    children.push({
      classes: {
        'nom-drawer-content-wrapper': true,
      },
      attrs: {
        style: ['left', 'right'].includes(_settle)
          ? { ...drawerRef._handleSize(width, 'width'), ...drawerRef._animation(visible, true) }
          : { ...drawerRef._handleSize(height, 'height'), ...drawerRef._animation(visible, false) },
      },
      children: drawerRef._handleContent(),
    })

    // 是否挂在到body或是当前dom
    let _style = placeGlobal ? {} : { position: 'absolute' }
    // customize z-index
    _style = isValidZIndex(zIndex) ? { ..._style, 'z-index': zIndex } : _style

    this.setProps({
      classes: {
        // [`nom-drawer-${_settle}`]: true,
        'nom-drawer-top': _settle === 'top',
        'nom-drawer-right': _settle === 'right',
        'nom-drawer-bottom': _settle === 'bottom',
        'nom-drawer-left': _settle === 'left',
        'nom-drawer-open': visible,
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
      visible,
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

    return visible
      ? [
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
      : null
  }

  _handleSize(size, unit) {
    if (!CSS_UNIT.test(size)) return {}

    return isNumeric(size) ? { [unit]: `${size}px` } : { [unit]: size }
  }

  _animation(visible, x) {
    if (visible) return {}

    return x ? { transform: 'translateX(100%)' } : { transform: 'translateY(100%)' }
  }

  close() {
    this.update({ visible: false })
  }
}

Component.register(Drawer)

export default Drawer
