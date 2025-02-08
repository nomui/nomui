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
            onConfig: ({ inst }) => {
              inst.setProps({
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
                      hidden: !inst.props.hasChildren,
                    },
                  ],
                },
              })
            },
          },
          itemSelectable: {
            byClick: true,
          },
          onItemSelectionChange: ({ sender }) => {
            const selectedItem = sender.getSelectedItem()
            this._drawNextLevel({ level: itemData.level, value: selectedItem.props.value })
          },
          onRendered: ({ inst }) => {
            if (this.cascaderControl && !!this.cascaderControl.props.value && inst.firstRender) {
              console.log(inst) // todo
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
    const { cascaderControl } = this
    const { options, fieldsMapping } = cascaderControl.props
    const firstCol = {
      items: options.map((x) => {
        return {
          label: x[fieldsMapping.label],
          value: x[fieldsMapping.value],
          disabled: x[fieldsMapping.disabled],
          hasChildren: x[fieldsMapping.children] && x[fieldsMapping.children].length > 0,
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
    this.removeItems(allItems.filter((x) => x > level))
    if (cascaderControl.remoteGetOptions) {
      cascaderControl.remoteGetOptions({
        value,
        level,
        callback: (options) => {
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
              }
            }),
            level: `${parseInt(level, 10) + 1}`,
          })
        },
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
    const { fieldsMapping } = cascaderControl.props
    cascaderControl.items.forEach((x) => {
      if (parseInt(level, 10) + 1 === x.level && x.pid === value) {
        x.hasChildren = x[fieldsMapping.children] && x[fieldsMapping.children].length > 0
        arr.push(x)
      }
    })
    return arr
  }
}

export default CascaderList
