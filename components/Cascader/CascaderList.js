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
                  cols: [
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
                      hidden:
                        inst.props.isLeaf !== false &&
                        (!!inst.props.isLeaf || !inst.props.hasChildren),
                    },
                  ],
                },
              })
            },
          },
          itemSelectable: {
            byClick: true,
            scrollIntoView: true,
          },
          onItemSelectionChange: ({ selectedItem }) => {
            this._drawNextLevel({ level: itemData.level, value: selectedItem.props.value })

            // 代码自动选中时临时保存valueMap
            this.tempValueMap[parseInt(itemData.level, 10)] = {
              value: selectedItem.props.value,
              text: selectedItem.props.label,
            }
          },
          onRendered: ({ inst }) => {
            if (this.cascaderControl && !!this.cascaderControl.props.value) {
              for (const k in this.cascaderControl.valueMap) {
                if (parseInt(k, 10) === parseInt(itemData.level, 10)) {
                  inst.selectItem(this.cascaderControl.valueMap[k].value)
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
    this.cascaderControl = this.parent.parent.parent.cascaderControl
    this.cascaderControl.optionList = this
  }

  _drawLists() {
    this.tempValueMap = {}
    const { cascaderControl } = this
    const { options, fieldsMapping } = cascaderControl.props
    const firstCol = {
      items: options.map((x) => {
        return {
          label: x[fieldsMapping.label],
          value: x[fieldsMapping.value],
          disabled: x[fieldsMapping.disabled],
          hasChildren: x[fieldsMapping.children] && x[fieldsMapping.children].length > 0,
          isLeaf: x[fieldsMapping.isLeaf],
        }
      }),
      level: '0',
      key: '0',
    }
    this.update({
      data: [firstCol],
    })
  }

  _drawNextLevel({ value, level }) {
    const { cascaderControl } = this
    const { fieldsMapping } = cascaderControl.props

    const allItems = this.getAllItems().map((x) => {
      return x.key
    })
    this.removeItems(allItems.filter((x) => parseInt(x, 10) > parseInt(level, 10)))

    if (cascaderControl.props.loadData) {
      cascaderControl.props
        .loadData({
          value,
          level,
        })
        .then((options) => {
          if (!options || !options.length) {
            return
          }

          this.appendDataItem({
            items: options.map((x) => {
              return {
                label: x[fieldsMapping.label],
                value: x[fieldsMapping.value],
                disabled: x[fieldsMapping.disabled],
                hasChildren: x[fieldsMapping.children] && x[fieldsMapping.children].length > 0,
                isLeaf: x[fieldsMapping.isLeaf],
              }
            }),
            level: `${parseInt(level, 10) + 1}`,
            key: `${parseInt(level, 10) + 1}`,
          })
        })
    } else {
      const arr = this._getNextLevelItems({ value, level })
      arr.length &&
        this.appendDataItem({
          items: arr,
          level: `${parseInt(level, 10) + 1}`,
          key: `${parseInt(level, 10) + 1}`,
        })
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
    const { changeOnSelect } = cascaderControl.props

    // 保持当前栏目的value text
    this.tempValueMap[level] = {
      value: item.props.value,
      text: item.props.label,
    }

    // 清除历史的栏目数据
    for (let i = level + 1; i < 20; i++) {
      delete this.tempValueMap[i]
    }

    if (isLeaf || changeOnSelect) {
      cascaderControl.valueMap = this.tempValueMap
      cascaderControl._onValueChange()
    }
    if (isLeaf) {
      // cascaderControl.popup.animateHide()
    }
  }
}

export default CascaderList
