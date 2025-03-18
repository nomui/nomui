import Component from '../Component/index'
import DataList from '../DataList/index'
import Field from '../Field/index'
import Form from '../Form/index'
import { isFunction } from '../util/index'

class ListSetter extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(ListSetter.defaults, props), ...mixins)
  }

  _config() {
    const that = this
    const {
      itemForm,
      actions,
      value,
      labelField,
      keyField = 'id',
      sortable,
      minItems,
      minItemsMessage,
      itemRender,
      formPopupAlign,
      itemRemovable,
    } = this.props

    let sortableProps = sortable
    if (sortable) {
      sortableProps = Component.extendProps(
        {
          onEnd: () => {
            this._onValueChange()
          },
        },
        sortable,
      )
    }

    const dataList = {
      component: DataList,
      ref: (c) => {
        this.listRef = c
      },
      gap: 'small',
      vertical: true,
      data: value,
      dataKey: keyField,
      sortable: sortableProps,
      itemRender: ({ itemData }) => {
        let myFormProps = itemForm
        if (isFunction(itemForm)) {
          myFormProps = itemForm({ itemData })
        }
        const itemFormProps = Component.extendProps(myFormProps, {
          component: Form,
          fieldDefaults: {
            labelAlign: 'left',
          },
          value: itemData,
          onValueChange: ({ newValue }) => {
            newValue = Component.extendProps(itemData, newValue)
            this.listRef.updateItem(itemData[keyField], newValue)
            this._onValueChange()
          },
        })

        return {
          component: 'Flex',
          items: [
            {
              component: 'Icon',
              type: 'drag',
              classes: { 'nom-list-setter-item-drag': true },
            },
            {
              classes: { 'nom-list-setter-item-label': true },
              children: itemRender ? itemRender({ itemData }) : itemData[labelField],
            },
            {
              component: 'Icon',
              classes: { 'nom-list-setter-item-delete': true },
              type: 'delete',
              renderIf: itemRemovable ? itemRemovable({ itemData }) : true,
              onClick: ({ sender, event }) => {
                const currentValue = this.getValue()
                if (minItems && currentValue.length === minItems) {
                  new nomui.Message({
                    content: minItemsMessage.replace('{minItems}', minItems),
                    type: 'warning',
                    align: 'top right',
                    alignTo: sender,
                    alignOuter: true,
                  })
                  event.stopPropagation()
                } else {
                  that.removeItem(itemData[keyField])
                }
              },
            },
          ],
          onClick: ({ sender }) => {
            if (itemForm === false || (isFunction(itemForm) && itemForm() === false)) {
              return
            }
            new nomui.Layer({
              classes: { 'nom-list-setter-layer': true, 'nom-popup': true },
              closeOnClickOutside: true,
              closeToRemove: true,
              children: itemFormProps,
              align: formPopupAlign,
              alignTo: sender.element,
              alignOuter: true,
            })
          },
        }
      },
    }

    let actionsProps = actions
    if (isFunction(actions)) {
      actionsProps = actions({ listSetter: that })
    }

    this.setProps({
      labelAlign: 'top',
      labelActions: actionsProps,
      control: { children: dataList },
    })

    super._config()
  }

  getValue() {
    return this.listRef.getItemDatas()
  }

  setValue(value, options) {
    if (Array.isArray(value)) {
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i]
        if (field.setValue) {
          field.setValue(value[i], options)
        }
      }
    }
  }

  appendItem(itemData) {
    this.listRef.appendItem(itemData)
    this._onValueChange()
  }

  removeItem(key, triggerEvent) {
    this.listRef.removeItem(key)
    this._onValueChange()
    if (triggerEvent !== false) {
      this._onItemRemoved(key)
    }
  }

  _onItemRemoved(key) {
    this._callHandler(this.props.onItemRemoved, { key })
  }
}

ListSetter.defaults = {
  labelField: 'title',
  keyField: 'id',
  sortable: {
    handle: '.p-type-drag',
  },
  actions: null,
  minItems: null,
  minItemsMessage: '至少保留 {minItems} 项',
  itemRender: null,
  formPopupAlign: 'left top',
}

Component.register(ListSetter)

export default ListSetter
