import Component from '../Component/index'
import Field from '../Field/index'
import Icon from '../Icon/index'
import List from '../List/index'
import { clone, deepEqual, extend, isString } from '../util/index'
import SelectPopup from './SelectPopup'

class Select extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(Select.defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.internalOptions = []

    this.multipleItems = []
  }

  _config() {
    const that = this
    const {
      multiple,
      showArrow,
      disabled,
      allowClear,
      options,
      optionFields,
      searchable,
    } = this.props
    const children = []
    const placeholder = this.props.placeholder

    this.showSharedInput = searchable && searchable.sharedInput

    if (this.props.extraOptions?.length) {
      const valueKey = optionFields.value
      const existedValueSet = new Set(options.map((opt) => opt[valueKey]))

      this.props.extraOptions.forEach((n) => {
        const val = n[valueKey]

        if (!existedValueSet.has(val)) {
          options.push({
            ...n,
            isExtra: true,
          })
          existedValueSet.add(val) // 同步更新，防止 extraOptions 自己重复
        }
      })
    }

    this._normalizeInternalOptions(options)

    this._normalizeSearchable()

    this.setProps({
      selectedSingle: {
        _created() {
          that.selectedSingle = this
        },
        onClick: ({ event }) => {
          if (this.showSharedInput && this.getValue()) {
            event.stopPropagation()
            this.selectedSingle.hide()
            this.searchBox.show()
            this.searchBox.update({ placeholder: this.getValueText() })

            this.searchBox.focus()
            this.popup.show()
          }
        },
      },
      selectedMultiple: {
        itemDefaults: {
          key() {
            return this.props[that.props.optionFields.value]
          },
          _config: function () {
            this.setProps({
              tag: 'span',
              onClick: (args) => {
                args.event.stopPropagation()
              },
              hidden: this.props.isOverTag,
              classes: {
                'nom-select-overtag-trigger': !!this.props.overList,
              },
              attrs: { title: this.props[that.props.optionFields.text] },
              popup: this.props.overList
                ? {
                    triggerAction: 'hover',
                    align: 'top center',
                    classes: {
                      'nom-select-extra-tags': true,
                    },
                    children: {
                      component: 'List',
                      gutter: 'sm',
                      itemDefaults: {
                        key() {
                          return this.props[that.props.optionFields.value]
                        },
                        _config: function () {
                          this.setProps({
                            tag: 'span',
                            onClick: (args) => {
                              args.event.stopPropagation()
                            },

                            attrs: { title: this.props[that.props.optionFields.text] },

                            children: [
                              {
                                tag: 'span',
                                classes: { 'nom-select-item-content': true },
                                attrs: {
                                  style: {
                                    maxWidth: `${that.props.maxTagWidth}px`,
                                  },
                                },

                                children: this.props[that.props.optionFields.text],
                              },
                            ],
                          })
                        },
                      },
                      items: this.props.overList,
                    },
                  }
                : null,
              children: [
                {
                  tag: 'span',
                  classes: { 'nom-select-item-content': true },
                  attrs: {
                    style: {
                      maxWidth: `${that.props.maxTagWidth}px`,
                    },
                  },

                  children: this.props.overList
                    ? `+${this.props.overNum}`
                    : this.props[that.props.optionFields.text],
                },
                !this.props.overList && {
                  component: Icon,
                  type: 'times',
                  classes: {
                    'nom-select-item-remove': true,
                  },
                  attrs: {
                    style: {
                      cursor: 'pointer',
                    },
                  },
                  onClick: (args) => {
                    const key = args.sender.parent.key
                    that.selectedMultiple.removeItem(key)
                    const oldValue = that.getValue()
                    oldValue &&
                      oldValue.length &&
                      that.setValue(
                        oldValue.filter((n) => {
                          return n !== key
                        }),
                      )
                    that.optionList && that.optionList.unselectItem(key)
                    args.event && args.event.stopPropagation()
                  },
                },
              ],
            })
          },
          _rendered: function () {
            if (this.props.isOverTag) {
              this.element.closest('.nom-list-item-wrapper').classList.add('s-hidden')
            } else {
              this.element.closest('.nom-list-item-wrapper').classList.remove('s-hidden')
            }
          },
        },
        _config() {
          this.setProps({
            items: this.props.items.map((n) => {
              n.overList = null
              n.overNum = null
              return n
            }),
          })
          if (that.props.maxTagCount > 0 && this.props.items.length > that.props.maxTagCount) {
            const before = this.props.items.slice(0, that.props.maxTagCount + 1)
            const after = this.props.items.slice(
              that.props.maxTagCount + 1,
              this.props.items.length,
            )
            const overTags = this.props.items.slice(that.props.maxTagCount, this.props.items.length)
            const num = this.props.items.length - that.props.maxTagCount

            const newItems = [
              ...before.map((n, i) => {
                n.isOverTag = false
                if (i === before.length - 1) {
                  n.overList = overTags
                  n.overNum = num
                } else {
                  n.overList = null
                  n.overNum = null
                }
                return n
              }),
              ...after.map((n) => {
                n.isOverTag = true
                return n
              }),
            ]
            this.setProps({
              items: newItems,
            })
          }
        },
        _created() {
          that.selectedMultiple = this
        },
      },
    })

    if (multiple) {
      children.push(this.props.selectedMultiple)
    } else {
      children.push(this.props.selectedSingle)
    }

    if (this.showSharedInput) {
      const originOptions = this.props.options
      children.push({
        component: 'Textbox',
        variant: 'borderless',
        allowClear: false,
        classes: { 'nom-select-search-box': true },
        compact: true,
        placeholder: this.props.placeholder || searchable.placeholder,
        _created: (inst) => {
          this.searchBox = inst
        },
        hidden: !!this.props.value,
        onEnter: ({ value }) => {
          this._callHandler(this.props.onEnter, { value })
        },
        onValueChange: ({ newValue }) => {
          if (newValue) {
            this.popup.show()
          }
          this.timer && clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            const loading = new nomui.Loading({
              container: this.optionList.parent,
            })
            const result = this.props.searchable.filter({
              inputValue: newValue,
              options: originOptions,
              sender: this,
            })
            if (result && result.then) {
              return result
                .then((value) => {
                  this.props.options = value
                  this.optionList.update()
                  loading && loading.remove()
                })
                .catch(() => {
                  loading && loading.remove()
                })
            }
            loading && loading.remove()

            this.props.options = result

            result && this.optionList.update()
          }, 300)
        },
        attrs: {
          onmousedown: (e) => {
            // 阻止冒泡，避免触发 popup 关闭

            e.stopPropagation()
          },
        },
      })
    }

    if (isString(placeholder) && !this.showSharedInput) {
      children.push({
        _created() {
          that.placeholder = this
        },
        classes: { 'nom-select-placeholder': true },
        children: placeholder,
      })
    }

    if (showArrow) {
      children.push({
        component: Icon,
        type: 'down',
        classes: {
          'nom-select-arrow': true,
        },
      })
    }

    if (allowClear) {
      children.push({
        component: Icon,
        type: 'times',
        classes: {
          'nom-select-clear': true,
          'nom-field-clear-handler': true,
        },
        hidden: true,
        ref: (c) => {
          this.clearIcon = c
        },
        onClick: (args) => {
          this.setValue(null)
          this.props.allowClear && this.clearIcon.hide()
          this.placeholder && this.placeholder.show()
          if (this.showSharedInput) {
            this.searchBox.show()
            this.searchBox.clear()
            this.searchBox.update({
              placeholder: this.props.placeholder || this.props.searchable.placeholder,
            })
            this.popup && this.popup.hide()
          }
          this.props.onClear && this._callHandler(this.props.onClear)
          args.event && args.event.stopPropagation()
        },
      })
    }

    this.setProps({
      control: {
        disabled: disabled,
        children: children,
      },
      onClick: () => {
        // todo
      },
    })

    super._config()
  }

  _rendered() {
    const { value, virtual, popupContainer } = this.props
    let container
    if (popupContainer === 'self') {
      this.element.style.position = 'relative'
      container = this.element
    } else if (Object.prototype.toString.call(popupContainer) === '[object Function]') {
      const ref = popupContainer()
      ref.element.style.position = 'relative'
      container = ref.element
    }
    this.popup = new SelectPopup({
      reference: container,
      trigger: this.control,
      virtual,
      onShow: () => {
        if (this.selectedSingle && this.showSharedInput) {
          this.selectedSingle.hide()
          this.searchBox.show()
        }
        this.optionList.update({
          selectedItems: this.getValue(),
        })
        if (this.props.multiple) {
          this._lastShowValue = this.getValue()
        }
        this.optionList.scrollToSelected()
      },
      onHide: () => {
        if (this.selectedSingle && this.showSharedInput) {
          this.selectedSingle.show()
          this.searchBox.hide()
        }
        if (this.props.multiple && this.props.changeOnClose) {
          const _currentValue = this.getValue()
          if (!deepEqual(_currentValue, this._lastShowValue)) {
            this._onValueChange()
          }
        }
      },
    })

    this._directSetValue(value)

    this._valueChange({ newValue: this.currentValue })
  }

  _directSetValue(value, options) {
    const { valueOptions } = this.props
    options = extend(
      {
        asArray: false,
        nullWhenNotExists: false,
      },
      valueOptions,
      options,
    )
    const { multiple } = this.props
    if (multiple === true) {
      const selValueOptions = this._getOptions(value)
      if (Array.isArray(selValueOptions) && selValueOptions.length) {
        this.multipleItems = selValueOptions
        this.selectedMultiple.update({ items: this.multipleItems })
        this.currentValue = selValueOptions.map(function (item) {
          return item.value
        })
      } else {
        this.selectedMultiple.update({ items: [] })
        this.currentValue = null
      }
    } else {
      if (options.asArray === true) {
        value = Array.isArray(value) ? value[0] : value
      }
      const selValueOption = this._getOption(value)

      if (selValueOption !== null) {
        this.selectedSingle.update(selValueOption)
        this.currentValue = selValueOption.value
        if (options.asArray === true) {
          this.currentValue = [selValueOption.value]
        }
      } else if (options.nullWhenNotExists) {
        this.selectedSingle.element.innerText = null
        this.currentValue = null
      } else {
        this.selectedSingle.element.innerText = value
        this.currentValue = value
      }
    }
    // 解决select组件searchable模式，点清除、重置无法清掉原输入数据
    if (this.searchBox && this.searchBox.props && value === null) {
      this.searchBox._setValue('')
    }
  }

  selectOption(option) {
    this.optionList.selectItem(option)
  }

  selectOptions(options) {
    this.optionList.selectItems(options)
  }

  getMultipleValue(obj) {
    return Object.values(obj.itemRefs)
  }

  getSelectedOption() {
    if (!this.optionList || !this.optionList.props) {
      return null
    }
    if (this.props.multiple === false) {
      return this.optionList.getSelectedItem()
    }

    // console.log('旧---', this.optionList.getSelectedItems())
    // console.log('新---', this.getMultipleValue(this.optionList.selectControl.selectedMultiple))

    return this.getMultipleValue(this.optionList.selectControl.selectedMultiple)

    // return this.optionList.getSelectedItems()
  }

  _getOptionsByValue(value) {
    if (this.props.multiple === false) {
      return this._getOption(value)
    }

    return this._getOptions(value)
  }

  _getValueText(options, value) {
    const { valueOptions } = this.props
    const that = this
    options = extend(
      {
        asArray: false,
      },
      valueOptions,
      options,
    )

    if (!this.optionList) {
      value = this.currentValue
    }

    const selected = value !== undefined ? this._getOptionsByValue(value) : this.getSelectedOption()

    if (selected !== null) {
      if (Array.isArray(selected) && selected.length > 0) {
        const vals = selected.map(function (item) {
          return item.props ? item.props[that.props.optionFields.text] : item.text
        })

        return vals
      }
      if (options.asArray === true && !Array.isArray(selected)) {
        return selected.props ? [selected.props[that.props.optionFields.text]] : [selected.text]
      }

      if (!Array.isArray(selected)) {
        return selected.props ? selected.props[that.props.optionFields.text] : selected.text
      }
    }

    if (value || this.currentValue) {
      const opt = this._getOptionsByValue(value || this.currentValue)
      if (Array.isArray(opt) && opt.length) {
        return opt.map((o) => o[that.props.optionFields.text] || o.text)
      }
      if (opt && !Array.isArray(opt)) {
        return opt[that.props.optionFields.text] || opt.text
      }
    }
    return null
  }

  // 外部更新options时要同步更新optionList的选项
  _update(props) {
    if (props.options) {
      this._normalizeInternalOptions(props.options)
      this.optionList && this.optionList.update({})
    }
  }

  _getValue(options) {
    const { valueOptions } = this.props
    const that = this
    options = extend(
      {
        asArray: false,
      },
      valueOptions,
      options,
    )

    if (!this.optionList || !this.optionList.props) {
      return this.currentValue
    }

    const selected = this.getSelectedOption()

    if (selected !== null) {
      if (Array.isArray(selected) && selected.length > 0) {
        const vals = selected.map(function (item) {
          return item.props[that.props.optionFields.value]
        })

        return vals
      }
      if (options.asArray === true && !Array.isArray(selected)) {
        return [selected.props[that.props.optionFields.value]]
      }

      if (!Array.isArray(selected)) {
        return selected.props[that.props.optionFields.value]
      }
    }

    return this.currentValue
  }

  _setValue(value, options) {
    if (options === false) {
      options = { triggerChange: false }
    } else {
      options = extend({ triggerChange: true }, options)
    }

    if (this.optionList && this.optionList.props) {
      this.optionList.unselectAllItems({ triggerSelectionChange: false })
      this.selectOptions(value, { triggerSelectionChange: options.triggerChange })
    }

    this._directSetValue(value)

    if (options.triggerChange) {
      this._onValueChange()
    }
  }

  _getOption(value) {
    let option = null
    const options = this.internalOptions

    if (Array.isArray(value)) {
      value = value[0]
    }
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        option = options[i]
        break
      }
    }
    return option
  }

  _getOptions(value) {
    let retOptions = null
    const options = this.internalOptions

    if (Array.isArray(value)) {
      retOptions = []

      for (let i = 0; i < options.length; i++) {
        if (value.indexOf(options[i].value) !== -1) {
          retOptions.push(options[i])
        }
      }
    }
    return retOptions
  }

  _valueChange({ newValue }) {
    if (!this.props) return

    const { allowClear, multiple } = this.props

    const hasValue = Array.isArray(newValue)
      ? newValue.length > 0
      : newValue !== null && newValue !== undefined

    // const isValidOption = hasValue && !!this._getOption(newValue)

    /* clear icon */
    if (allowClear && this.clearIcon) {
      hasValue ? this.clearIcon.show() : this.clearIcon.hide()
    }

    /* placeholder */
    if (this.placeholder) {
      hasValue ? this.placeholder.hide() : this.placeholder.show()
    }

    /* searchBox（单选时） */
    if (this.searchBox) {
      if (hasValue) {
        if (multiple) {
          this.searchBox.update({ placeholder: null })
        }
      } else {
        this.searchBox.show()
        if (multiple) {
          this.searchBox.update({
            placeholder: this.props.placeholder || this.props.searchable.placeholder,
          })
        }
      }
    }
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

  appendOption() {}

  updateSearchPopup(text) {
    if (this.optionList) this.optionList.update({ text })
  }

  handleFilter(text, options) {
    const { filterOption } = this.props
    return filterOption(text, options)
  }

  selectAll() {
    if (!this.optionList) return
    const allKeys = this.optionList.getAllItems().map((n) => {
      return n.key
    })
    this.setValue(allKeys, { triggerChange: !this.props.changeOnClose })
  }

  clear(options = { triggerChange: true }) {
    this._resetValidStatus()
    this.setValue(null, options)
  }

  _normalizeSearchable() {
    const { searchable, optionFields } = this.props
    if (searchable) {
      this.setProps({
        searchable: Component.extendProps(
          {
            placeholder: null,
            filter: ({ inputValue, options }) => {
              if (!inputValue) {
                return options
              }
              const filteredOptions = []
              options.forEach((option) => {
                if (option[optionFields.text].contains(inputValue)) {
                  filteredOptions.push(option)
                }
              })
              return filteredOptions
            },
          },
          searchable,
        ),
      })
    }
  }

  _normalizeInternalOptions(options) {
    if (!Array.isArray(options) || !options.length) {
      this.internalOptions = []
      return
    }

    // if (this.props.extraOptions) {
    //   this.initHiddenOptions = this.props.extraOptions.map((n) => {
    //     return n[this.props.optionFields.value]
    //   })

    //   options = [...options, ...this.props.extraOptions]
    // }

    const { optionFields } = this.props
    this.internalOptions = clone(options)

    this.handleOptions(this.internalOptions, optionFields)
  }

  handleOptions(options, optionFields) {
    const { text: textField, value: valueField } = optionFields
    if (!Array.isArray(options)) return []
    const internalOptions = options
    for (let i = 0; i < internalOptions.length; i++) {
      const item = internalOptions[i]
      item.text = item[textField]
      item.value = item[valueField]
    }
  }
}

function highlightSelectKeyword(text, kw) {
  if (!text || !kw) return text

  // 转义正则特殊字符
  const escapedKw = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const reg = new RegExp(escapedKw, 'gi')

  // 如果没匹配到，直接返回原文本
  if (!reg.test(text)) return text

  return `#${text.replace(reg, (match) => {
    return `<span class="nom-select-highlight-keyword">${match}</span>`
  })}`
}

Select.defaults = {
  options: [],
  optionFields: { text: 'text', value: 'value' },
  optionDefaults: {
    key() {
      return this.props.value
    },
    _config: function () {
      let strFormat = this.props.text

      if (
        this?.list?.selectControl?.props?.searchable &&
        this.list.selectControl.props.searchable.highlight !== false
      ) {
        const keyStr = this.list.selectControl.searchBox.getValue()
        if (keyStr) {
          strFormat = highlightSelectKeyword(this.props.text, keyStr)
        }
      }
      this.setProps({
        children: strFormat,
      })
    },
  },
  selectedSingle: {
    classes: {
      'nom-select-single': true,
    },
    _config: function () {
      this.setProps({
        children: this.props.text,
      })
    },
  },
  selectedMultiple: {
    classes: { 'nom-select-multiple': true },
    component: List,
    itemDefaults: {},
    itemSelectable: {
      scrollIntoView: true,
    },

    gutter: 'sm',
  },
  extraOptions: [],
  multiple: false,
  showArrow: true,
  maxTagWidth: 120,
  maxTagCount: -1,
  minItemsForSearch: 20,
  filterOption: (text, options) => options.filter((o) => o.text.indexOf(text) >= 0),
  virtual: false,
  allowClear: true,
  popupContainer: 'body',
  popupWidth: null,
  showSelectAll: false,
  selectAllText: '全选',
  clearText: '清空',
}

Component.register(Select)

export default Select
