import Component from '../Component/index'
import Layout from '../Layout/index'
import Popup from '../Popup/index'
import Textbox from '../Textbox/index'
import { clone, isNumeric } from '../util/index'

class TreeSelectPopup extends Popup {
  constructor(props, ...mixins) {
    const defaults = {
      animate: true,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.selectControl = this.opener.parent.parent
  }

  _config() {
    const that = this
    const { nodeSelectable, nodeCheckable } = that.props
    const {
      searchable,
      options,
      treeDataFields,
      flatOptions,
      multiple,
      initExpandLevel,
      popupWidth,
    } = this.selectControl.props

    let { maxPopupWidth } = this.selectControl.props
    if (isNumeric(maxPopupWidth)) {
      maxPopupWidth = `${maxPopupWidth}px`
    }

    let w = `${this.selectControl.control.offsetWidth()}px`
    if (isNumeric(popupWidth)) {
      w = `${popupWidth}px`
    }
    else if (popupWidth === 'auto') {
      w = 'auto'
    }

    this.setProps({
      attrs: {
        style: {
          width: w,
          maxWidth: maxPopupWidth || `${this.selectControl.control.offsetWidth()}px`
        },
      },
      children: {
        component: Layout,
        header: searchable
          ? {
            children: {
              component: Textbox,
              placeholder: searchable.placeholder,
              _created: (inst) => {
                this.selectControl.searchBox = inst
              },
              onValueChange: ({ newValue }) => {
                this.timer && clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                  const loading = new nomui.Loading({
                    container: this.selectControl.tree.parent,
                  })
                  const result = searchable.filter({
                    inputValue: newValue,
                    options: options,
                    sender: this.selectControl,
                  })

                  if (result && result.then) {
                    return result
                      .then((value) => {
                        this.selectControl.tree.update({
                          initExpandLevel: newValue ? -1 : initExpandLevel, // 搜索时展开节点层级
                          data: value,
                        })
                        // 更新 optionsMap
                        this.selectControl.getOptionsMap()
                        loading && loading.remove()
                      })
                      .catch(() => {
                        loading && loading.remove()
                      })
                  }
                  loading && loading.remove()

                  result &&
                    this.selectControl.tree.update({
                      initExpandLevel: newValue ? -1 : initExpandLevel, // 搜索时展开节点层级
                      data: result,
                    })
                }, 300)
              },
            },
          }
          : null,
        body: {
          children: {
            component: 'Tree',
            expandable: {
              byIndicator: true,
            },
            data: clone(options),
            dataFields: treeDataFields,
            flatData: flatOptions,
            multiple,
            nodeSelectable,
            nodeCheckable,
            initExpandLevel,
            _created: function () {
              that.selectControl.tree = this
            },
          },
        },
      },
    })

    super._config()
  }

  animateHide() {
    if (!this.element) return false
    let animateName
    if (this.element.getAttribute('offset-y') !== '0') {
      animateName = 'nom-tree-select-animate-bottom-hide'
    } else {
      animateName = 'nom-tree-select-animate-top-hide'
    }
    this.addClass(animateName)
    setTimeout(() => {
      if (!this.element) return false
      this.hide()
      this.removeClass(animateName)
    }, 160)
  }

  _rendered() {
    this.removeClass('nom-layer-animate-show')
    this.selectControl.props.animate && this.props.animate && this.animateInit()

    if (this.selectControl.props.animate && !this.props.animate) {
      this.props.animate = true
    }
  }

  animateInit() {
    if (!this.element) return false
    if (this.element.getAttribute('offset-y') !== '0') {
      this.addClass('nom-tree-select-animate-bottom-show')
    } else {
      this.addClass('nom-tree-select-animate-top-show')
    }
  }

  _show() {
    super._show()
    this.selectControl.searchBox && this.selectControl.searchBox.focus()

    this.removeClass('nom-layer-animate-show')
    this.selectControl.props.animate && this.props.animate && this.animateInit()
  }
}

Component.register(TreeSelectPopup)

export default TreeSelectPopup
