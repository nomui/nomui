import Component from '../Component/index'
import Field from '../Field/index'
import { debounce, extend } from '../util/index'

class GroupTree extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(GroupTree.defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.valid = true
  }

  _config() {
    const me = this
    const { value, columnWidth, dataFields } = this.props
    const { fields } = this.props.groupDefaults
    const { text, key, children } = dataFields

    const treeValue = value

    const hd = fields.map((n) => {
      return {
        text: n.label || '',
        name: n.name || '',
        width: n.width || columnWidth,
      }
    })

    this.setProps({
      control: {
        children: {
          component: 'Flex',
          rows: [
            {
              component: 'List',
              classes: {
                'nom-group-tree-hd': true,
              },
              _created: function () {
                me.headerRef = this
              },
              items: [{ width: 276 }, ...hd],
              itemDefaults: {
                _config: function () {
                  this.setProps({
                    children: {
                      attrs: {
                        style: {
                          width: `${this.props.width}px`,
                          paddingLeft: '.5rem',
                        },
                        'field-name': this.props.name,
                      },
                      children: this.props.text,
                    },
                  })
                },
              },
            },
            {
              hidden: treeValue && treeValue.length > 0,
              _created: function () {
                me.addBtn = this
              },
              classes: {
                'nom-group-tree-add': true,
              },
              children: {
                component: 'Button',
                type: 'dashed',
                text: me.props.addText,
                span: 12,
                block: true,
                onClick: () => {
                  me._addNode()
                },
              },
            },
            {
              component: 'Tree',
              _created: function () {
                me.tree = this
              },
              sortable: true,
              data: treeValue,
              nodeSelectable: false,
              expandable: {
                byIndicator: true,
              },
              dataFields: dataFields,
              nodeDefaults: {
                _config: function () {
                  const that = this
                  this.setProps({
                    data: {
                      tools: {
                        justify: 'start',
                        render: (param) => {
                          const cols = fields.map((n) => {
                            const defaultProp = {
                              controlWidth: n.width || columnWidth,
                              label: null,
                              onValueChange: debounce(({ newValue }) => {
                                that.props.data[n.name] = newValue
                                me._handleChange()
                              }, 1000),
                              value: that.props.data[n.name],
                              attrs: {
                                'field-name': n.name,
                              },
                            }
                            if (n.render) {
                              return Component.extendProps(n.render(param), defaultProp)
                            }
                            return Component.extendProps(n, defaultProp)
                          })
                          return {
                            component: 'Group',
                            classes: {
                              'nom-group-tree-group': true,
                            },
                            _created: function () {
                              that.group = this
                            },
                            _config: function () {
                              const node = this.parent.parent.parent.parent.node
                              this.setProps({
                                attrs: {
                                  style: {
                                    marginLeft: `-${node.level * 16}px`,
                                  },
                                },
                              })
                            },
                            fields: [
                              {
                                component: 'Toolbar',
                                _created: function () {
                                  that.rowOptions = this
                                },
                                classes: {
                                  'nom-group-tree-row-options': true,
                                },
                                icon: 'edit',
                                visibleItems: 0,
                                // size: 'small',
                                type: 'text',
                                attrs: {
                                  style: {
                                    width: '40px',
                                  },
                                },
                                items: [
                                  {
                                    text: me.props.renameText,
                                    onClick: () => {
                                      let rowText = that.props.data[text]
                                      new nomui.Modal({
                                        size: 'xsmall',
                                        content: {
                                          header: false,
                                          body: {
                                            children: [
                                              {
                                                component: 'Textbox',
                                                value: rowText,
                                                onValueChange: ({ newValue }) => {
                                                  rowText = newValue
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        onOk: ({ sender }) => {
                                          that.update({ data: { text: rowText } })
                                          sender.close()
                                        },
                                      })
                                    },
                                  },
                                  {
                                    text: me.props.removeNodeText,
                                    onClick: () => {
                                      const parentNode = that.parent.parent

                                      const isRoot = parentNode.componentType === 'Tree'

                                      const c = parentNode.getData() || []
                                      const i = c.findIndex((n) => {
                                        return n[key] === that.props.data[key]
                                      })
                                      const newChildren = me._removeItem(c, i)

                                      if (isRoot) {
                                        parentNode.props.data = newChildren
                                      } else {
                                        parentNode.props.data[children] = newChildren
                                      }

                                      setTimeout(() => {
                                        parentNode.update({ data: parentNode.props.data })
                                        if (isRoot && !parentNode.getData().length) {
                                          me.addBtn.show()
                                        }
                                      }, 200)

                                      const { tools, hidden, ...source } = that.props.data
                                      me.props.onNodeDeleted &&
                                        me._callHandler(me.props.onNodeDeleted, source)
                                    },
                                  },
                                  {
                                    text: me.props.addRowText,
                                    onClick: () => {
                                      const obj = {
                                        __isNew: true,
                                      }
                                      obj[key] = nomui.utils.newGuid()
                                      obj[text] = me.props.newNodeText
                                      new nomui.Modal({
                                        size: 'xsmall',
                                        content: {
                                          header: false,
                                          body: {
                                            children: [
                                              {
                                                component: 'Textbox',
                                                value: obj[text],
                                                onValueChange: ({ newValue }) => {
                                                  obj[text] = newValue
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        onOk: ({ sender }) => {
                                          const parentNode = that.parent.parent

                                          const c = parentNode.getData() || []
                                          const i = c.findIndex((n) => {
                                            return n[key] === that.props.data[key]
                                          })
                                          const newChildren = me._insertItem(c, i + 1, obj)

                                          if (parentNode.componentType === 'Tree') {
                                            parentNode.props.data = newChildren
                                          } else {
                                            parentNode.props.data[children] = newChildren
                                          }

                                          parentNode.update({ data: parentNode.props.data })
                                          sender.close()
                                        },
                                      })
                                    },
                                  },
                                  {
                                    text: me.props.addNodeText,
                                    onClick: () => {
                                      const obj = {
                                        __isNew: true,
                                      }
                                      obj[key] = nomui.utils.newGuid()
                                      obj[text] = me.props.newNodeText
                                      new nomui.Modal({
                                        size: 'xsmall',
                                        content: {
                                          header: false,
                                          body: {
                                            children: [
                                              {
                                                component: 'Textbox',
                                                value: obj[text],
                                                onValueChange: ({ newValue }) => {
                                                  obj[text] = newValue
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        onOk: ({ sender }) => {
                                          const c = that.props.data[children] || []
                                          const newChildren = [...c, obj]
                                          that.props.data[children] = newChildren
                                          that.update({ data: that.props.data })
                                          sender.close()
                                        },
                                      })
                                    },
                                  },
                                ],
                              },
                              ...cols,
                            ],
                            inline: true,
                          }
                        },
                      },
                    },
                  })
                },
                _rendered: function () {
                  this.contentText.element.style.paddingRight = `${this.level * 16}px`
                },
              },
              _rendered: function () {
                // 需要处理表头与列对齐问题
                setTimeout(() => {
                  me._fixColsWidth()
                }, 100)
              },
            },
          ],
        },
      },
    })
    super._config()
  }

  _addNode() {
    const { text, key } = this.props.dataFields
    const defaultObj = {}
    defaultObj[text] = this.props.newNodeText
    defaultObj[key] = nomui.utils.newGuid()
    this.update({ value: [defaultObj] })
  }

  _insertItem(arr, index, value) {
    arr.splice(index, 0, value)
    return arr
  }

  _removeItem(arr, index) {
    arr.splice(index, 1)
    return arr
  }

  _handleChange() {
    if (this.props.onValueChange) {
      this._callHandler(this.props.onValueChange, { newValue: this._getValue() })
    }
  }

  _getValue() {
    const data = this.tree.getData()
    this._cleanData(data)
    if (!data.length) {
      return null
    }
    return data
  }

  _setValue(value, options) {
    if (options === false) {
      options = { triggerChange: false }
    } else {
      options = extend({ triggerChange: true }, options)
    }
    if (value === null || !value.length) {
      this.tree.update({ data: [] })
      this.addBtn.show()
    } else {
      this.tree.update({ data: value })
      this.addBtn.hide()
    }
  }

  _cleanData(arr) {
    const { children } = this.props.dataFields
    for (let i = 0; i < arr.length; i++) {
      delete arr[i].tools
      delete arr[i].hidden
      if (arr[i][children] && arr[i][children].length) {
        this._cleanData(arr[i][children])
      }
    }
  }

  _validate(options) {
    this.valid = true
    return this._validateTree(options)
  }

  _validateTree(opts, node) {
    opts = opts || {}
    node = node || this.tree
    const childNodes = node.getChildNodes()
    childNodes.forEach((childNode) => {
      if (childNode.group.validate() === false) {
        this.valid = false
      }
      this._validateTree(opts, childNode)
    })
    return this.valid
  }

  // 确保表头与内容列宽一致
  _fixColsWidth() {
    const rows = this.tree.getChildNodes()
    if (!rows.length) {
      return
    }
    const firstGroup = rows[0].group.element
    const fields = firstGroup.querySelector('.nom-control').childNodes

    fields.forEach((n) => {
      const fieldName = n.getAttribute('field-name')
      if (fieldName) {
        const target = this.headerRef.element.querySelector(`[field-name=${fieldName}]`)
        target.style.width = `${n.offsetWidth}px`
      }
    })
  }
}
GroupTree.defaults = {
  columnWidth: 200,
  groupDefaults: {
    fields: [],
  },
  dataFields: {
    key: 'key',
    text: 'text',
    children: 'children',
  },
  onNodeDeleted: null,
  addText: '添加',
  renameText: '重命名',
  removeNodeText: '删除节点',
  addRowText: '在下方插入行',
  newNodeText: '新节点',
  addNodeText: '新增子节点',
}

Component.register(GroupTree)

export default GroupTree
