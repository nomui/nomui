import Component from '../Component/index'
import List from '../List/index'
import { isString } from '../util/index'

class CascaderList extends List {
  constructor(props, ...mixins) {
    const defaults = {
      classes: {
        'nom-cascader-option-wrapper': true,
      },
      itemRender: ({ itemData }) => {
        return {
          component: 'List',
          classes: {
            'nom-cascader-option-list': true,
          },
          ref: (c) => {
            this.listRefs[itemData.level] = c
          },
          attrs: {
            style: {
              width: isString(this.cascaderControl.props.width)
                ? this.cascaderControl.props.width
                : `${this.cascaderControl.props.width}px`,
              height: isString(this.cascaderControl.props.height)
                ? this.cascaderControl.props.height
                : `${this.cascaderControl.props.height}px`,
            },
          },
          items: itemData.items,
          level: itemData.level,
          cols: 1,
          itemDefaults: {
            key: function () {
              return this.props.value
            },
            onConfig: ({ inst }) => {
              const arr = [
                {
                  grow: true,
                  children: {
                    component: 'Ellipsis',
                    text: inst.props.label,
                  },
                },
                {
                  component: 'Icon',
                  type: 'right',
                  ref: (c) => {
                    inst.iconRef = c
                  },
                  hidden:
                    inst.props.isLeaf !== false && (!!inst.props.isLeaf || !inst.props.hasChildren),
                },
              ]

              if (this.cascaderControl.props.multiple) {
                arr.unshift({
                  classes: {
                    'nom-cascader-option-checker': true,
                  },
                  children: {
                    component: 'Checkbox',
                    compact: true,
                    ref: (c) => {
                      inst.checkerRef = c
                    },
                    hidden:
                      this.cascaderControl.props.onlyleaf &&
                      (inst.props.isLeaf === false || inst.props.hasChildren),
                    value: this._isNodeChecked(inst.props.value),
                    onClick: ({ event }) => {
                      event.stopPropagation()
                    },
                    onValueChange: ({ newValue }) => {
                      this._handleNodeCheck({
                        item: inst,
                        level: parseInt(itemData.level, 10),
                        newValue,
                      })
                    },
                  },
                })
              }

              inst.setProps({
                onClick: () => {
                  !inst.props.disabled &&
                    this._handleItemSelect({
                      item: inst,
                      level: parseInt(itemData.level, 10),
                    })
                },
                children: {
                  component: 'Flex',
                  align: 'center',
                  cols: arr,
                },
              })
            },
          },
          itemSelectable: {
            byClick: true,
            scrollIntoView: true,
          },
          onItemSelectionChange: ({ selectedItem }) => {
            this._drawNextLevel({
              level: itemData.level,
              value: selectedItem.props.value,
              item: selectedItem,
            })

            // 代码自动选中时临时保存valueMap
            this.tempValueMap[parseInt(itemData.level, 10)] = {
              value: selectedItem.props.value,
              text: selectedItem.props.label,
            }
          },
          onRendered: ({ inst }) => {
            if (this.cascaderControl && !!this.cascaderControl.props.value) {
              if (this.cascaderControl.props.multiple) {
                for (let i = 0; i < this.cascaderControl.multiValueMap.length; i++) {
                  const item = this.cascaderControl.multiValueMap[i]
                  if (inst.getItem(item.value)) {
                    inst.selectItem(item.value)
                    break
                  }
                }
              } else {
                for (const k in this.cascaderControl.valueMap) {
                  if (parseInt(k, 10) === parseInt(itemData.level, 10)) {
                    inst.selectItem(this.cascaderControl.valueMap[k].value)
                  }
                }
              }
            }
          },
        }
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.listRefs = {}
    this.cascaderControl = this.parent.parent.parent.cascaderControl
    this.cascaderControl.optionList = this
  }

  _rendered() {
    if (!this.props.data || !this.props.data.length) {
      this.cascaderControl.emptyRef.show()
    } else {
      this.cascaderControl.emptyRef.hide()
    }
  }

  _drawLists() {
    this.tempValueMap = {}
    const { cascaderControl } = this
    const { options, fieldsMapping } = cascaderControl.props

    if (!options || !options.length) {
      this._drawNextLevel({ level: '0', value: '' })
      return
    }
    const firstCol = {
      items: options.map((x) => {
        return {
          label: x[fieldsMapping.label],
          value: x[fieldsMapping.value],
          disabled: x[fieldsMapping.disabled],
          hasChildren: x[fieldsMapping.children] && x[fieldsMapping.children].length > 0,
          isLeaf: x[fieldsMapping.isLeaf],
          itemData: x,
        }
      }),
      level: '0',
      key: '0',
    }
    this.update({
      data: [firstCol],
    })
  }

  _drawNextLevel({ value, level, item }) {
    const { cascaderControl } = this
    const { fieldsMapping } = cascaderControl.props

    const allItems = this.getAllItems().map((x) => {
      return x.key
    })
    this.removeItems(allItems.filter((x) => parseInt(x, 10) > parseInt(level, 10)))

    if (cascaderControl.props.loadData) {
      if (item && item.iconRef) {
        item.iconRef.update({
          type: 'loading',
        })
      }
      cascaderControl.props
        .loadData({
          value,
          level,
          itemData: item ? item.props.itemData : {},
        })
        .then((options) => {
          if (item && item.iconRef) {
            item.iconRef.update({
              type: 'right',
            })
          }

          if (!options || !options.length) {
            return
          }
          this.cascaderControl.emptyRef.hide()
          this.appendDataItem({
            items: options.map((x) => {
              return {
                label: x[fieldsMapping.label],
                value: x[fieldsMapping.value],
                disabled: x[fieldsMapping.disabled],
                hasChildren: x[fieldsMapping.children] && x[fieldsMapping.children].length > 0,
                isLeaf: x[fieldsMapping.isLeaf],
                itemData: x,
              }
            }),
            level: `${parseInt(level, 10) + 1}`,
            key: `${parseInt(level, 10) + 1}`,
          })
        })
    } else {
      const arr = this._getNextLevelItems({ value, level })
      if (arr.length) {
        this.cascaderControl.emptyRef.hide()
        this.appendDataItem({
          items: arr,
          level: `${parseInt(level, 10) + 1}`,
          key: `${parseInt(level, 10) + 1}`,
        })
      }
    }
  }

  _getNextLevelItems({ value, level }) {
    const arr = []
    const { cascaderControl } = this
    cascaderControl.items.forEach((x) => {
      if (parseInt(level, 10) + 1 === x.level && x.pid === value) {
        arr.push(x)
      }
    })
    return arr
  }

  // 手动点击选项时触发
  _handleItemSelect({ item, level }) {
    const isLeaf = item.props.isLeaf !== false && !item.props.hasChildren
    const { cascaderControl } = this
    const { changeOnSelect, multiple } = cascaderControl.props

    // 保持当前栏目的value text
    this.tempValueMap[level] = {
      value: item.props.value,
      text: item.props.label,
    }

    // 清除历史的栏目数据
    for (let i = level + 1; i < 20; i++) {
      delete this.tempValueMap[i]
    }

    if (multiple) {
      return
    }

    if (isLeaf || changeOnSelect) {
      cascaderControl.valueMap = this.tempValueMap
      cascaderControl._onValueChange()
    }

    if (isLeaf && !cascaderControl.props.multiple) {
      cascaderControl.popup.animateHide()
    }
  }

  _isNodeChecked(val) {
    return this.cascaderControl.multiValueMap.some((x) => x.value === val)
  }

  _handleNodeCheck({ item, newValue, level }) {
    this.cascaderControl._onNodeCheckChange({ item, newValue })
    if (this.cascaderControl.props.multiple.cascade) {
      this.cascaderControl._processCascade({ item, newValue, level })
    }
  }
}

export default CascaderList
