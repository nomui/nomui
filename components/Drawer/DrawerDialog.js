import Component, { n } from '../Component/index'
import Panel from '../Panel/index'
import { isFunction, isPlainObject, isString } from '../util/index'
import DrawerContentMixin from './DrawerContentMixin'

class DrawerDialog extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      children: { component: Panel, uistyle: 'plain' },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    const drawer = (this.drawer = this.parent)
    const { content } = this.drawer.props
    if (isString(content)) {
      this.drawer.element && this.drawer.element.setAttribute('data-url', content)
      require([content], (contentConfig) => {
        let props = contentConfig
        if (isFunction(props)) {
          const pNames = this.getParameterNames(props)
          if (pNames.length && pNames[0] === '{') {
            const args = drawer.props.args || {}
            props = contentConfig({ drawer: drawer, args: args })
            if (props.then) {
              props.then((result) => {
                props = result
                props = Component.extendProps(this._getDefaultPanelContent(props), props)
                this.update({
                  children: n(null, props, null, [DrawerContentMixin]),
                })
              })
            } else {
              props = Component.extendProps(this._getDefaultPanelContent(props), props)
              this.update({
                children: n(null, props, null, [DrawerContentMixin]),
              })
            }
          } else {
            props = contentConfig.call(this, drawer)
            props = Component.extendProps(this._getDefaultPanelContent(props), props)
            this.update({
              children: n(null, props, null, [DrawerContentMixin]),
            })
          }
        }
      })
    }
  }

  _getDefaultPanelContent(contentProps) {
    const drawer = this.drawer
    drawer.setProps({
      okText: contentProps.okText,
      onOk: contentProps.onOk,
      cancelText: contentProps.cancelText,
      onCancel: contentProps.onCancel,
      okButton: contentProps.okButton,
    })

    const { okText, cancelText, okButton = {}, cancelButton = {} } = drawer.props
    return {
      component: Panel,
      fit: true,
      uistyle: 'plain',
      header: {
        caption: {
          title: drawer.props.title,
        },
        nav: {},
        tools: [
          {
            component: 'Button',
            icon: 'close',
            styles: {
              border: 'none',
            },
            onClick: function () {
              drawer.close()
            },
          },
        ],
      },
      footer: {
        children: {
          component: 'Cols',
          items: [
            okButton !== false &&
              Component.extendProps(
                {
                  component: 'Button',
                  type: 'primary',
                  text: okText,
                  onClick: () => {
                    drawer._handleOk()
                  },
                },
                okButton,
              ),
            cancelButton !== false &&
              Component.extendProps(
                {
                  component: 'Button',
                  text: cancelText,
                  onClick: () => {
                    drawer._handleCancel()
                  },
                },
                cancelButton,
              ),
          ],
        },
      },
    }
  }

  _config() {
    const { content, settle } = this.drawer.props
    const { size } = this.props
    if (isPlainObject(content)) {
      const extendContent = {}
      if (isFunction(content.footer)) {
        extendContent.footer = content.footer.call(this.drawer, this.drawer)
      }
      const contentProps = Component.extendProps(
        this._getDefaultPanelContent(content),
        content,
        extendContent,
      )

      this.setProps({
        children: n(null, contentProps, null, [DrawerContentMixin]),
      })
    }

    if (size) {
      if (settle === 'left' || settle === 'right') {
        this.setProps({
          attrs: {
            style: {
              width: size.width,
            },
          },
        })
      } else {
        this.setProps({
          attrs: {
            style: {
              height: size.height,
            },
          },
        })
      }
    }
  }

  getParameterNames(fn) {
    const code = fn.toString()
    const result = code.slice(code.indexOf('(') + 1, code.indexOf(')')).match(/([^\s,]+)/g)
    return result === null ? [] : result
  }
}

Component.register(DrawerDialog)

export default DrawerDialog
