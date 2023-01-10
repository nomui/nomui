import Component from '../Component/index'
import Field from '../Field/index'
import Icon from '../Icon/index'
import { clone, isFunction, isString } from '../util/index'
import CascaderPopup from './CascaderPopup'

class Cascader extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(Cascader.defaults, props), ...mixins)
  }

  _rendered() {
    const cascader = this
    this.popup = new CascaderPopup({
      trigger: this.control,
      popMenu: this.getSelectedMenu(),
      onShow: () => {
        const { optionList } = cascader
        if (optionList && optionList.selected && optionList.selected.length > 0) {
          optionList.selected.forEach((item) => {
            // 解决非SPA页面，滚动条自动滚动至底部问题
            if (!(document.querySelector('body').scrollHeight > window.innerHeight + 20)) {
              item.element.scrollIntoView({
                behavior: 'auto',
                scrollMode: 'if-needed',
              })
            }
          })
        }
      },
    })

    this._valueChange({ newValue: this.currentValue })
  }

  _created() {
    super._created()
    this._hidePopup = true
  }

  _config() {
    const cascader = this
    const children = []
    const { showArrow, placeholder, separator, valueType, allowClear } = this.props

    const { value, options, disabled } = this.props
    this.internalOption = JSON.parse(JSON.stringify(options))
    this._normalizeInternalOptions(options)
    this.flatItems(this.internalOption)

    this.initValue = isFunction(value) ? value() : value
    this.selectedOption = []
    this.handleOptionSelected(this.initValue)
    this.currentValue = this.initValue
    this.checked = true

    children.push({
      classes: { 'nom-cascader-content': true },
      _created() {
        cascader._content = this
      },
      _config() {
        const selectedOpt = cascader.selectedOption
        let c

        if (selectedOpt.length === 0) {
          c = null
        } else {
          c =
            valueType === 'cascade'
              ? selectedOpt.map((e) => e.label).join(separator)
              : selectedOpt[selectedOpt.length - 1].label
        }

        if (!c && cascader.props.value) {
          c = nomui.utils.isString(cascader.props.value)
            ? cascader.props.value
            : cascader.props.value.join(separator)
        }

        this.setProps({
          children: c,
        })
      },
    })

    if (isString(placeholder)) {
      children.push({
        _created() {
          cascader.placeholder = this
        },
        classes: { 'nom-cascader-placeholder': true },
        children: placeholder,
      })
    }

    if (showArrow) {
      children.push({
        component: Icon,
        type: 'down',
        classes: {
          'nom-cascader-icon': true,
        },
        _created() {
          cascader.down = this
        },
      })
    }

    if (allowClear) {
      children.push({
        component: Icon,
        type: 'close',
        classes: {
          'nom-cascader-icon': true,
        },
        hidden: true,
        _created() {
          cascader.close = this
        },
        onClick: ({ event }) => {
          event.stopPropagation()
          cascader.setValue(null)
          // if (this.selectedOption.length === 0) return
          // this.selectedOption = []
          // this.checked = true
          // this.content.element.innerText = ''
          // this.popup.update({
          //   popMenu: this.getSelectedMenu(),
          // })
          // this._onValueChange()
        },
      })
    }

    this.setProps({
      control: {
        children,
        disabled,
      },
      attrs: {
        onmouseover() {
          if (disabled) return
          cascader.close.show()
          showArrow && cascader.down.hide()
        },
        onmouseleave() {
          if (disabled) return
          showArrow && cascader.down.show()
          cascader.close.hide()
        },
      },
    })

    super._config()
  }

  _normalizeInternalOptions(options) {
    if (!Array.isArray(options) || !options.length) return options

    const { fieldsMapping } = this.props
    const { children } = this.props.fieldsMapping
    this.internalOption = clone(options)
    this.internalOption = this._filterEmptyChild(options, children)
    this.handleOptions(this.internalOption, fieldsMapping)
  }

  _filterEmptyChild(options, childrenMapping) {
    return options.map((option) => {
      if (Array.isArray(option[childrenMapping]) && option[childrenMapping].length) {
        return {
          ...option,
          childrenMapping: this._filterEmptyChild(option[childrenMapping], childrenMapping),
        }
      }

      option[childrenMapping] = null
      return option
    })
  }

  _itemSelected(selectedKey, checked = false, hidePopup = true) {
    if (!this.items) return
    this.selectedOption = []
    let recur = this.items.get(selectedKey)
    while (recur) {
      this.selectedOption.unshift(recur)

      recur = this.items.get(recur.pid)
    }

    this.checked = checked
    this._hidePopup = hidePopup

    const selectedItem = this.items.get(selectedKey)
    if (!selectedItem) return
    if ((this.checked && this.triggerChange(selectedItem.value)) || this.props.changeOnSelect) {
      this._onValueChange()
    }

    this.popup.update({ popMenu: this.getSelectedMenu(), animate: false })
  }

  _valueChange(changed) {
    if (this.placeholder) {
      if ((Array.isArray(changed.newValue) && changed.newValue.length === 0) || !changed.newValue) {
        this.placeholder.show()
      } else {
        this.placeholder.hide()
      }
    }

    this._content && this._content.update()

    this.popup && this._hidePopup && this.props.animate && this.popup.animateHide()
    this.popup && this._hidePopup && !this.props.animate && this.popup.hide()
  }

  _getValue() {
    if (!this.checked) {
      return this.currentValue
    }

    if (this.props.valueType === 'cascade') {
      const result = this.selectedOption.map((e) => e.value)
      return result.length ? result : null
    }

    return this.selectedOption.length
      ? this.selectedOption[this.selectedOption.length - 1].value
      : null
  }

  _getValueText() {
    let str = ''
    this.selectedOption.forEach(function (n) {
      str += `${n.label}/`
    })
    const result = str.substring(0, str.length - 1)
    return result
  }

  _setValue(value) {
    if (!value && this._content) {
      this._content.element.innerText = ''
    }
    if (this.triggerChange(value)) {
      this.handleOptionSelected(value)
      this._onValueChange()
    }
  }

  _onValueChange() {
    const that = this
    this.oldValue = clone(this.currentValue)
    this.currentValue = clone(this.getValue())
    this.props.value = this.currentValue

    const changed = {
      name: this.props.name,
      oldValue: this.oldValue,
      newValue: this.currentValue,
      checkedOption:
        this.props.valueType === 'cascade'
          ? this.selectedOption
          : this.selectedOption[this.selectedOption.length - 1],
    }

    setTimeout(function () {
      that._callHandler(that.props.onValueChange, changed)
      that.group && that.group._onValueChange(changed)
      isFunction(that._valueChange) && that._valueChange(changed)
      if (that.validateTriggered) {
        that._validate()
      }
    }, 0)
  }

  triggerChange(value) {
    if (!value || !this.currentValue || !Array.isArray(value)) return value !== this.currentValue
    return this.currentValue.toString() !== value.toString()
  }

  // handleOptions(options, fieldsMapping) {
  handleOptions(options, fieldsMapping) {
    const {
      key: keyField,
      label: labelField,
      value: valueField,
      children: childrenField,
      disabled: disabledField,
    } = fieldsMapping

    const key = keyField || valueField

    if (!Array.isArray(options)) return []
    const internalOption = options
    for (let i = 0; i < internalOption.length; i++) {
      const item = internalOption[i]
      item.label = item[labelField]
      item.value = item[valueField]
      item.key = item[key]
      item.children = item[childrenField]
      item.disabled = item[disabledField] === true
      if (Array.isArray(item.children) && item.children.length > 0) {
        this.handleOptions(item.children, fieldsMapping)
      }
    }
  }

  flatItems(options, level = 0, pid = null) {
    if (!options || !Array.isArray(options)) {
      return null
    }

    if (level === 0) {
      this.items = new Map()
    }

    for (let i = 0; i < options.length; i++) {
      const { key, value, label, children } = options[i]
      this.items.set(key, { key, label, value, pid, level, leaf: !children })
      if (children) {
        this.flatItems(children, level + 1, key)
      }
    }
  }

  handleOptionSelected(value) {
    let key = null

    const { valueType, onlyleaf } = this.props

    this.checked = false
    const oldCheckedOption = this.selectedOption
    this.selectedOption = []

    if (!value) this.checked = true

    if (!this.items || this.items.size === 0) return

    if (valueType === 'single') {
      for (const v of this.items.values()) {
        if (onlyleaf) {
          if (v.leaf && v.value === value) {
            key = v.key
          }
        } else if (v.value === value) {
          key = v.key
        }
      }

      if (!key) return

      while (key) {
        this.selectedOption.unshift(this.items.get(key))
        key = this.items.get(key).pid
      }
    } else {
      if (!Array.isArray(value)) return
      let opt = null
      let options = this.internalOption
      for (let i = 0; i < value.length; i++) {
        opt = options ? options.find((e) => e.value === value[i]) : null

        if (!opt) {
          this.selectedOption = oldCheckedOption
          return
        }
        this.selectedOption.push(this.items.get(opt.key))
        options = opt.children
      }
    }

    this.checked = true
    if (this.popup) this.popup.update({ popMenu: this.getSelectedMenu() })
    if (this._content) this._content.update()
  }

  _disable() {
    if (this.firstRender === false) {
      this.control.disable()
    }
  }

  _enable() {
    if (this.firstRender === false) {
      this.control.enable()
    }
  }

  getSelectedMenu() {
    if (!this.selectedOption) {
      return null
    }

    const val = this.selectedOption.map((e) => e.value)
    const internalOption = this.internalOption
    let recur = internalOption

    const options = internalOption && internalOption.length ? [internalOption] : []

    for (let i = 0; i < val.length; i++) {
      for (let j = 0; j < recur.length; j++) {
        if (val[i] === recur[j].value) {
          if (recur[j].children) {
            options.push([...recur[j].children])
            recur = recur[j].children
            break
          }
        }
      }
    }

    return options
  }
}

Cascader.defaults = {
  options: [],
  showArrow: true,
  separator: ' / ',
  fieldsMapping: { label: 'label', value: 'value', children: 'children', disabled: 'disabled' },
  valueType: 'cascade',
  changeOnSelect: true,
  width: 200,
  height: 250,
  disabled: false,
  onlyleaf: true,
  allowClear: true,
}

Component.register(Cascader)

export default Cascader
