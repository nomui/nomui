import Component from '../Component/index'
import Field from '../Field/index'

class GroupTree extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(GroupTree.defaults, props), ...mixins)
  }

  _created() {
    super._created()
  }

  _config() {
    const me = this
    const { value, columns, columnWidth, dataFields } = this.props
    const { text, key, children } = dataFields

    const hd = columns.map((n) => {
      return {
        text: n.field || '',
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
              onCreated: ({ inst }) => {
                this.headerRef = inst
              },
              items: [{ width: 260 }, ...hd],
              itemDefaults: {
                _config: function () {
                  this.setProps({
                    attrs: {
                      style: {
                        padding: '.5rem',
                      },
                    },
                    children: {
                      attrs: {
                        style: {
                          width: `${this.props.width}px`,
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
              component: 'Tree',
              _created: function () {
                me.tree = this
              },
              sortable: true,
              data: value,
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
                          const cols = columns.map((n) => {
                            const defaultProp = {
                              controlWidth: n.width || columnWidth,
                              onValueChange: ({ newValue }) => {
                                that.props.data[n.name] = newValue
                              },
                              value: that.props.data[n.name],
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
                                    text: '重命名',
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
                                    text: '删除行',
                                    onClick: () => {
                                      const parentNode = that.parent.parent
                                      const c = parentNode.props.data[children] || []
                                      const i = c.findIndex((n) => {
                                        return n[key] === that.props.data[key]
                                      })

                                      const newChildren = me._removeItem(c, i)
                                      parentNode.props.data[children] = newChildren
                                      parentNode.update({ data: parentNode.props.data })
                                    },
                                  },
                                  {
                                    text: '在下方插入行',
                                    onClick: () => {
                                      const obj = {}
                                      obj[key] = nomui.utils.newGuid()
                                      obj[text] = '新节点'
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
                                          const c = parentNode.props.data[children] || []
                                          const i = c.findIndex((n) => {
                                            return n[key] === that.props.data[key]
                                          })

                                          const newChildren = me._insertItem(c, i + 1, obj)
                                          parentNode.props.data[children] = newChildren
                                          parentNode.update({ data: parentNode.props.data })
                                          sender.close()
                                        },
                                      })
                                    },
                                  },
                                  {
                                    text: '新增子节点',
                                    onClick: () => {
                                      const obj = {}
                                      obj[key] = nomui.utils.newGuid()
                                      obj[text] = '新节点'
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
                                          const newChildren = [obj, ...c]
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
              _rendered: function () {},
            },
          ],
        },
      },
    })
    super._config()
  }

  _insertItem(arr, index, value) {
    arr.splice(index, 0, value)
    return arr
  }

  _removeItem(arr, index) {
    arr.splice(index, 1)
    return arr
  }

  _getValue() {
    return this.tree.getData()
  }
}
GroupTree.defaults = {
  columnWidth: 200,
  dataFields: {
    key: 'key',
    text: 'text',
    children: 'children',
    parentKey: 'parentKey',
  },
}

Component.register(GroupTree)

export default GroupTree
