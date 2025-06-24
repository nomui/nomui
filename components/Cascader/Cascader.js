import Component from '../Component/index'
import Field from '../Field/index'
import Icon from '../Icon/index'
import { clone, deepEqual, isFunction, isNullish, isString } from '../util/index'
import CascaderPopup from './CascaderPopup'

class Cascader extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(Cascader.defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.valueMap = {}
    this.multiValueMap = []
  }

  _config() {
    const me = this

    const children = []
    const { showArrow, placeholder, allowClear, multiple } = this.props

    const { value, options, disabled } = this.props
    this.initValue = clone(value)
    this.internalOption = JSON.parse(JSON.stringify(options))
    this._flatItems()

    if (this.props.onlyleaf && !this.props.multiple) {
      this.props.changeOnSelect = false
    }

    if (value && value.length) {
      this.valueMap = {}
      this.multiValueMap = []
      this._setValueMap()
    }

    this.currentValue = this.initValue

    children.push({
      classes: { 'nom-cascader-content': true },
      ref: (c) => {
        me._content = c
      },
      children: multiple ? this._getMultipleText() : this.getValueText(),
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
    if (this.props.value && this.props.value.length && this.props.loadData) {
      this._loopLoadValueData()
    }
    this.popup = new CascaderPopup({
      trigger: this.control,
      onShow: () => {
        this.optionList && this._drawOptionLists()
        if (this.props.multiple) {
          this._lastShowValue = this.getValue()
        }
      },
      onHide: () => {
        if (this.props.changeOnClose && this.props.multiple) {
          const _currentValue = this.getValue()
          if (!deepEqual(_currentValue, this._lastShowValue)) {
            this._onValueChange()
          }
        }
      },
    })
  }

  // 数据异步加载且有默认值时需要先调请求加载value对应的字面值
  _loopLoadValueData() {
    const me = this
    let { value } = this.props
    const { fieldsMapping, multiple } = this.props
    if (!Array.isArray(value)) {
      value = [value]
    }
    value.unshift('')

    const promises = value.map((v, i) =>
      this.props.loadData({
        value: i === 0 ? null : v,
        itemData: i === 0 ? {} : { [fieldsMapping.value]: v },
        level: `${i}`,
      }),
    )

    Promise.all(promises)
      .then((results) => {
        results.forEach((res) => {
          if (res?.length) {
            me._flatItems(res)
          }
        })
        me._setValueMap()
        me._content.update({ children: multiple ? me._getMultipleText() : me.getValueText() })
      })
      .catch((error) => {
        console.error('load data failed:', error)
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
        if (this.props.multiple) {
          this.multiValueMap.push({
            value: item.value,
            text: item.label,
          })
        } else {
          this.valueMap[i] = {
            value: item.value,
            text: item.label,
          }
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

  _flatItems(source) {
    if (!source) {
      this.items = []
      source = this.internalOption
    }

    const { fieldsMapping } = this.props
    const findTree = (data, pid = null, level = 0) => {
      data.forEach((n) => {
        const hasChildren = n[fieldsMapping.children] && n[fieldsMapping.children].length
        if (
          this.items.filter((x) => {
            return x.value === n[fieldsMapping.value] && x.pid === pid
          }).length === 0
        ) {
          this.items.push({
            level: level,
            label: n[fieldsMapping.label],
            value: n[fieldsMapping.value],
            pid: pid,
            disabled: n[fieldsMapping.disabled],
            hasChildren,
            itemData: n,
          })
        }
        if (hasChildren) {
          findTree(n[fieldsMapping.children], n[fieldsMapping.value], level + 1)
        }
      })
    }
    findTree(source)
  }

  _getValue() {
    let v = []
    if (this.props.multiple) {
      v = this.multiValueMap.map((x) => x.value)
    } else {
      for (const k in this.valueMap) {
        v.push(this.valueMap[k].value)
      }
    }
    if (this.props.valueType === 'cascade') {
      return v.length ? v : null
    }
    return v.length ? v[v.length - 1] : null
  }

  _getValueText() {
    const t = []
    if (this.props.multiple) {
      if (!this.multiValueMap.length) {
        return ''
      }
      const arr = this.multiValueMap.map((n) => {
        return n.text
      })
      return arr.join(',')
    }

    for (const k in this.valueMap) {
      t.push(this.valueMap[k].text)
    }

    if (!this.props.singleShowFullPath) {
      return t.length ? t[t.length - 1] : ''
    }

    return t.length ? t.join(this.props.separator) : ''
  }

  _getMultipleText() {
    if (!this.multiValueMap.length) {
      return ''
    }
    let data = this.multiValueMap
    const hasOverTag =
      this.props.maxTagCount > 0 && this.multiValueMap.length > this.props.maxTagCount

    if (hasOverTag) {
      const overTags = this.multiValueMap.slice(this.props.maxTagCount, this.multiValueMap.length)
      const num = this.multiValueMap.length - this.props.maxTagCount
      data = this.multiValueMap.slice(0, this.props.maxTagCount)
      data.push({
        isOverCount: true,
        overList: overTags,
        overNum: num,
      })
    }
    return {
      component: 'List',
      classes: {
        'nom-cascader-multiple-content-list': true,
      },
      data: data,
      itemRender: ({ itemData }) => {
        if (itemData.isOverCount) {
          return {
            classes: {
              'nom-cascader-over-tags-trigger': true,
            },
            children: `+${itemData.overNum}`,
            popup: {
              triggerAction: 'hover',
              align: 'top left',
              children: {
                component: 'List',
                classes: {
                  'nom-cascader-over-tags-list': true,
                },
                items: itemData.overList,
                itemDefaults: {
                  onConfig: ({ inst }) => {
                    inst.setProps({
                      children: inst.props.text,
                    })
                  },
                },
              },
            },
          }
        }
        return {
          classes: {
            'nom-cascader-multiple-content-list-text': true,
          },
          onClick: ({ event }) => {
            event.stopPropagation()
          },
          children: [
            {
              attrs: {
                title: itemData.text,
              },
              children: itemData.text,
            },
            {
              component: 'Icon',
              type: 'times',
              onClick: () => {
                this._removeItem(itemData.value)
              },
            },
          ],
        }
      },
    }
  }

  _removeItem(value) {
    this.multiValueMap = this.multiValueMap.filter((x) => x.value !== value)
    this._onValueChange()
  }

  _onNodeCheckChange({ item, newValue }) {
    if (newValue === true) {
      if (!this.multiValueMap.some((x) => x.value === item.props.value)) {
        this.multiValueMap.push({
          value: item.props.value,
          text: item.props.label,
        })
      }
    } else {
      this.multiValueMap = this.multiValueMap.filter((x) => x.value !== item.props.value)
    }
    !this.props.changeOnClose && this._onValueChange()
  }

  _setValue(value) {
    if (!value && this._content) {
      this._content.element.innerText = ''
    }
    this.props.value = value
    this.valueMap = {}
    this.multiValueMap = []
    this._setValueMap()
    this._onValueChange()
  }

  _reset() {
    this.setValue(this.initValue)
  }

  _clear() {
    this.setValue(null)
  }

  _processCascade({ item, newValue, level }) {
    if (newValue === true) {
      this._cascadeCheckChildren(item.key, level)
      this._cascadeCheckParent(item.key, level)
    } else {
      this._cascadeUncheckChildren(item.key, level)
      this._cascadeUncheckParent(item.key, level)
    }
    this._onValueChange()
  }

  _cascadeCheckChildren(key, level) {
    const children = this.items.filter((n) => n.pid === key && n.level === level + 1)
    children.forEach((child) => {
      if (!this.multiValueMap.some((x) => x.value === child.value)) {
        this.multiValueMap.push({ text: child.label, value: child.value })
      }
      // 递归处理下一级
      this._cascadeCheckChildren(child.value, child.level)
    })
  }

  _cascadeUncheckChildren(key, level) {
    const children = this.items.filter((n) => n.pid === key && n.level === level + 1)
    children.forEach((child) => {
      const index = this.multiValueMap.findIndex((x) => x.value === child.value)
      if (index !== -1) {
        this.multiValueMap.splice(index, 1)
      }
      // 递归处理下一级
      this._cascadeUncheckChildren(child.value, child.level)
    })
  }

  _cascadeCheckParent(key, level) {
    if (level === 0) return // 如果已经是根节点，则停止递归

    const currentItem = this.items.find((x) => x.value === key)
    if (!currentItem) return

    const parentItem = this.items.find((x) => x.value === currentItem.pid)
    if (!parentItem) return

    const siblings = this.items.filter((x) => x.pid === parentItem.value && x.level === level)
    const allSiblingsChecked = siblings.every((sibling) =>
      this.multiValueMap.some((x) => x.value === sibling.value),
    )

    if (allSiblingsChecked) {
      if (!this.multiValueMap.some((x) => x.value === parentItem.value)) {
        this.multiValueMap.push({ text: parentItem.label, value: parentItem.value })
      }
      // 递归向上检查父级
      this._cascadeCheckParent(parentItem.value, parentItem.level)
    }
  }

  _cascadeUncheckParent(key, level) {
    if (level === 0) return // 如果已经是根节点，则停止递归

    const currentItem = this.items.find((x) => x.value === key)
    if (!currentItem) return

    const parentItem = this.items.find((x) => x.value === currentItem.pid)
    if (!parentItem) return

    const siblings = this.items.filter((x) => x.pid === parentItem.value && x.level === level)
    const allSiblingsUnchecked = siblings.every(
      (sibling) => !this.multiValueMap.some((x) => x.value === sibling.value),
    )

    if (allSiblingsUnchecked) {
      const index = this.multiValueMap.findIndex((x) => x.value === parentItem.value)
      if (index !== -1) {
        this.multiValueMap.splice(index, 1)
      }
      // 递归向上检查父级
      this._cascadeUncheckParent(parentItem.value, parentItem.level)
    }
  }

  _onValueChange() {
    const that = this
    this.oldValue = clone(this.currentValue)
    this.currentValue = clone(this.getValue())
    this.props.value = this.currentValue

    if (this._getValueText().length) {
      if (this.props.multiple) {
        this._content.update({ children: this._getMultipleText() })
      } else {
        this._content.element.innerText = this._getValueText()
      }

      this.placeholder && this.placeholder.hide()
    } else {
      if (this.props.multiple) {
        this._content.update({ children: '' })
      } else {
        this._content.element.innerText = ''
      }
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
    this._triggerDependencyValueChange()
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
  allowClear: true,
  multiple: false,
  changeOnClose: false, // 浮层关闭的时候才触发 onValueChange
  maxTagCount: 5,
}

Component.register(Cascader)

export default Cascader
