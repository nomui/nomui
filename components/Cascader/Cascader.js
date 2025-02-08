import Component from '../Component/index'
import Field from '../Field/index'
import Icon from '../Icon/index'
import { clone, isFunction, isString } from '../util/index'
import CascaderPopup from './CascaderPopup'

class Cascader extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(Cascader.defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.valueMap = {}
    // this._hidePopup = true
  }

  _config() {
    const me = this

    const children = []
    const {
      showArrow,
      placeholder,
      // separator,
      // valueType,
      allowClear,
      // singleShowFullPath,
    } = this.props

    const { value, options, disabled } = this.props
    this.internalOption = JSON.parse(JSON.stringify(options))
    this._flatItems()

    this.initValue = value

    this.currentValue = this.initValue

    children.push({
      classes: { 'nom-cascader-content': true },
      ref: (c) => {
        me._content = c
      },
    })

    if (isString(placeholder)) {
      children.push({
        _created() {
          me.placeholder = this
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
          me.down = this
        },
      })
    }

    if (allowClear) {
      children.push({
        component: Icon,
        type: 'times',
        classes: {
          'nom-cascader-icon': true,
        },
        hidden: true,
        _created() {
          me.close = this
        },
        onClick: ({ event }) => {
          event.stopPropagation()
          me.props.onClear && me._callHandler(me.props.onClear)
          me.setValue(null)
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
          me.close.show()
          showArrow && me.down.hide()
        },
        onmouseleave() {
          if (disabled) return
          showArrow && me.down.show()
          me.close.hide()
        },
      },
    })

    super._config()
  }

  _flatItems() {
    this.items = []
    const { fieldsMapping } = this.props
    const findTree = (data, pid = null, level = 0) => {
      data.forEach((n) => {
        this.items.push({
          level: level,
          label: n[fieldsMapping.label],
          value: n[fieldsMapping.value],
          pid: pid,
          disabled: n[fieldsMapping.disabled],
        })
        if (n[fieldsMapping.children] && n[fieldsMapping.children].length) {
          findTree(n[fieldsMapping.children], n[fieldsMapping.value], level + 1)
        }
      })
    }
    findTree(this.internalOption)
  }

  _rendered() {
    this.__cascaderPopup = new CascaderPopup({
      trigger: this.control,
      onShow: () => {
        this.optionList && this._drawOptionLists()
        // const { optionList } = me
        // if (optionList && optionList.selected && optionList.selected.length > 0) {
        //   optionList.selected.forEach((item) => {
        //     // 解决非SPA页面，滚动条自动滚动至底部问题
        //     if (!(document.querySelector('body').scrollHeight > window.innerHeight + 20)) {
        //       item.element.scrollIntoView({
        //         behavior: 'auto',
        //         scrollMode: 'if-needed',
        //       })
        //     }
        //   })
        // }
      },
    })

    // this._valueChange({ newValue: this.currentValue })
  }

  _drawOptionLists() {
    this.optionList._drawLists()
  }

  // _normalizeInternalOptions(options) {
  //   if (!Array.isArray(options) || !options.length) return options

  //   const { fieldsMapping } = this.props
  //   const { children } = this.props.fieldsMapping
  //   this.internalOption = clone(options)
  //   this.internalOption = this._filterEmptyChild(options, children)
  //   this.handleOptions(this.internalOption, fieldsMapping)
  // }

  // _filterEmptyChild(options, childrenMapping) {
  //   return options.map((option) => {
  //     if (Array.isArray(option[childrenMapping]) && option[childrenMapping].length) {
  //       return {
  //         ...option,
  //         childrenMapping: this._filterEmptyChild(option[childrenMapping], childrenMapping),
  //       }
  //     }

  //     option[childrenMapping] = null
  //     return option
  //   })
  // }

  // _itemSelected({ selectedKey, checked = false, hidePopup = true, pid }) {
  //   if (!this.items || !this.items.length) return
  //   this.selectedOption = []

  //   let recur = this.items.filter((x) => {
  //     return x.key === selectedKey && (x.pid === pid || !x.pid)
  //   })[0]
  //   while (recur) {
  //     this.selectedOption.unshift(recur)
  //     const parentItem = this.items.filter((y) => {
  //       return y.key === recur.pid
  //     })

  //     recur = parentItem
  //   }

  //   this.checked = checked
  //   this._hidePopup = hidePopup

  //   const selectedItem = this.items.get(itemKey)
  //   if (!selectedItem) return
  //   if ((this.checked && this.triggerChange(selectedItem.value)) || this.props.changeOnSelect) {
  //     this._onValueChange()
  //   }

  //   this.__cascaderPopup.update({ popMenu: this.getSelectedMenu(), animate: false })
  // }

  // _valueChange(changed) {
  //   if (this.placeholder) {
  //     if ((Array.isArray(changed.newValue) && changed.newValue.length === 0) || !changed.newValue) {
  //       this.placeholder.show()
  //     } else {
  //       this.placeholder.hide()
  //     }
  //   }

  //   this._content && this._content.update()

  //   this.__cascaderPopup &&
  //     this._hidePopup &&
  //     this.props.animate &&
  //     this.__cascaderPopup.animateHide()
  //   this.__cascaderPopup && this._hidePopup && !this.props.animate && this.__cascaderPopup.hide()
  // }

  _getValue() {
    const result = []
    for (const k in this.valueMap) {
      result.push(this.valueMap[k].value)
    }

    if (this.props.valueType === 'cascade') {
      return result.length ? result : null
    }

    return result.length ? result[result.length - 1] : null
  }

  _getValueText() {
    const result = []
    for (const k in this.valueMap) {
      result.push(this.valueMap[k].text)
    }

    if (this.props.valueType === 'cascade') {
      return result.length ? result : null
    }

    return result.length ? result[result.length - 1] : null
  }

  _setValue(value) {
    if (!value && this._content) {
      this._content.element.innerText = ''
    }
    this._onValueChange()
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

  // triggerChange(value) {
  //   if (!value || !this.currentValue || !Array.isArray(value)) return value !== this.currentValue
  //   return this.currentValue.toString() !== value.toString()
  // }

  // // handleOptions(options, fieldsMapping) {
  // handleOptions(options, fieldsMapping, pid) {
  //   const {
  //     key: keyField,
  //     label: labelField,
  //     value: valueField,
  //     children: childrenField,
  //     disabled: disabledField,
  //   } = fieldsMapping

  //   const key = keyField || valueField

  //   if (!Array.isArray(options)) return []
  //   const internalOption = options
  //   for (let i = 0; i < internalOption.length; i++) {
  //     const item = internalOption[i]
  //     item.label = item[labelField]
  //     item.value = item[valueField]
  //     item.key = item[key]
  //     item.children = item[childrenField]
  //     item.disabled = item[disabledField] === true
  //     item.pid = pid
  //     if (Array.isArray(item.children) && item.children.length > 0) {
  //       this.handleOptions(item.children, fieldsMapping, item.key)
  //     }
  //   }
  // }

  // flatItems(options, level = 0, pid = null) {
  //   if (!options || !Array.isArray(options)) {
  //     return null
  //   }

  //   if (level === 0) {
  //     this.items = []
  //   }

  //   for (let i = 0; i < options.length; i++) {
  //     const { key, value, label, children } = options[i]

  //     this.items.push({ key, label, value, pid, level, leaf: !children })

  //     if (children) {
  //       this.flatItems(children, level + 1, key)
  //     }
  //   }
  // }

  // handleOptionSelected(value) {
  //   let key = null

  //   const { valueType, onlyleaf } = this.props

  //   this.checked = false
  //   const oldCheckedOption = this.selectedOption
  //   this.selectedOption = []

  //   if (!value) this.checked = true

  //   if (!this.items || !this.items.length) return

  //   if (valueType === 'single') {
  //     for (const v of this.items.values()) {
  //       if (onlyleaf) {
  //         if (v.leaf && v.value === value) {
  //           key = v.key
  //         }
  //       } else if (v.value === value) {
  //         key = v.key
  //       }
  //     }

  //     if (!key) return

  //     while (key) {
  //       this.selectedOption.unshift(this.items.get(key))
  //       key = this.items.get(key).pid
  //     }
  //   } else {
  //     if (!Array.isArray(value)) return
  //     let opt = null
  //     let options = this.internalOption
  //     for (let i = 0; i < value.length; i++) {
  //       opt = options ? options.find((e) => e.value === value[i]) : null

  //       if (!opt) {
  //         this.selectedOption = oldCheckedOption
  //         return
  //       }
  //       this.selectedOption.push(this.items.get(opt.key))
  //       options = opt.children
  //     }
  //   }

  //   this.checked = true
  //   if (this.__cascaderPopup) this.__cascaderPopup.update({ popMenu: this.getSelectedMenu() })
  //   if (this._content) this._content.update()
  // }

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

  // getSelectedMenu() {
  //   if (!this.selectedOption) {
  //     return null
  //   }

  //   const val = this.selectedOption.map((e) => e.value)
  //   const internalOption = this.internalOption
  //   let recur = internalOption

  //   const options = internalOption && internalOption.length ? [internalOption] : []

  //   for (let i = 0; i < val.length; i++) {
  //     for (let j = 0; j < recur.length; j++) {
  //       if (val[i] === recur[j].value) {
  //         if (recur[j].children) {
  //           options.push([...recur[j].children])
  //           recur = recur[j].children
  //           break
  //         }
  //       }
  //     }
  //   }

  //   return options
  // }
}

Cascader.defaults = {
  options: [],
  showArrow: true,
  separator: ' / ',
  fieldsMapping: { label: 'label', value: 'value', children: 'children', disabled: 'disabled' },
  singleShowFullPath: false, // valueType 为 'single' 时，是否显示全路径
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
