import Component from '../Component/index'
import Field from '../Field/index'
import Icon from '../Icon/index'
import { clone, isFunction, isNullish, isString } from '../util/index'
import CascaderPopup from './CascaderPopup'

class Cascader extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(Cascader.defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.valueMap = {}
  }

  _config() {
    const me = this

    const children = []
    const { showArrow, placeholder, allowClear } = this.props

    const { value, options, disabled } = this.props
    this.initValue = clone(value)
    this.internalOption = JSON.parse(JSON.stringify(options))
    this._flatItems()

    if (value && value.length) {
      this.valueMap = {}
      this._setValueMap()
    }

    this.currentValue = this.initValue

    children.push({
      classes: { 'nom-cascader-content': true },
      ref: (c) => {
        me._content = c
      },
      children: this.getValueText(),
    })

    if (isString(placeholder)) {
      children.push({
        _created() {
          me.placeholder = this
        },
        classes: { 'nom-cascader-placeholder': true },
        children: placeholder,
        hidden: !!this.props.value,
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

  _rendered() {
    this.popup = new CascaderPopup({
      trigger: this.control,
      onShow: () => {
        console.log('show')
        this.optionList && this._drawOptionLists()
      },
    })
  }

  _drawOptionLists() {
    this.optionList._drawLists()
  }

  _setValueMap() {
    let { value } = this.props
    if (isNullish(value)) {
      return
    }
    if (isString(value)) {
      value = this._getCascadeValue(value)
    }
    if (!Array.isArray(value)) {
      value = [value]
    }
    value.forEach((n, i) => {
      const item = this.items.find((x) => x.value === n)
      if (item) {
        this.valueMap[i] = {
          value: item.value,
          text: item.label,
        }
      }
    })
  }

  _getCascadeValue(val) {
    const me = this
    const arr = []

    function getParentNodeValue(id) {
      for (let i = 0; i < me.items.length; i++) {
        const item = me.items[i]
        if (id === item.value) {
          arr.unshift(item.value)
          getParentNodeValue(item.pid)
          break
        }
      }
    }

    getParentNodeValue(val)
    return arr
  }

  _flatItems() {
    this.items = []
    const { fieldsMapping } = this.props
    const findTree = (data, pid = null, level = 0) => {
      data.forEach((n) => {
        const hasChildren = n[fieldsMapping.children] && n[fieldsMapping.children].length
        this.items.push({
          level: level,
          label: n[fieldsMapping.label],
          value: n[fieldsMapping.value],
          pid: pid,
          disabled: n[fieldsMapping.disabled],
          hasChildren,
        })
        if (hasChildren) {
          findTree(n[fieldsMapping.children], n[fieldsMapping.value], level + 1)
        }
      })
    }
    findTree(this.internalOption)
  }

  _getValue() {
    const v = []
    for (const k in this.valueMap) {
      v.push(this.valueMap[k].value)
    }

    if (this.props.valueType === 'cascade') {
      return v.length ? v : null
    }

    return v.length ? v[v.length - 1] : null
  }

  _getValueText() {
    const t = []
    for (const k in this.valueMap) {
      t.push(this.valueMap[k].text)
    }

    if (!this.props.singleShowFullPath) {
      return t.length ? t[t.length - 1] : ''
    }

    return t.length ? t.join(this.props.separator) : ''
  }

  _setValue(value) {
    if (!value && this._content) {
      this._content.element.innerText = ''
    }
    this.props.value = value
    this.valueMap = {}
    this._setValueMap()
    this._onValueChange()
  }

  _reset() {
    this.setValue(this.initValue)
  }

  _clear() {
    this.setValue(null)
  }

  _onValueChange() {
    const that = this
    this.oldValue = clone(this.currentValue)
    this.currentValue = clone(this.getValue())
    this.props.value = this.currentValue

    if (this._getValueText().length) {
      this._content.element.innerText = this._getValueText()
      this.placeholder && this.placeholder.hide()
    } else {
      this.placeholder && this.placeholder.show()
    }

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
}

Cascader.defaults = {
  options: [],
  showArrow: true,
  separator: ' / ',
  fieldsMapping: {
    label: 'label',
    value: 'value',
    children: 'children',
    disabled: 'disabled',
    isLeaf: 'isLeaf',
  },
  singleShowFullPath: true, // valueType 为 'single' 时，是否显示全路径
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
