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
    const { value, columns, columnWidth, dataFields } = this.props
    const { text } = dataFields
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
                            if (n.render) {
                              return Component.extendProps(n.render(param), {
                                controlWidth: n.width || columnWidth,
                              })
                            }
                            return Component.extendProps(n, {
                              controlWidth: n.width || columnWidth,
                            })
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
                                    onClick: () => {},
                                  },
                                  {
                                    text: '在下方插入行',
                                    onClick: () => {
                                      const { key, children } = dataFields
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
                                          const newChildren = [obj, ...c]
                                          parentNode.props.data[children] = newChildren
                                          parentNode.update({ data: that.props.data })
                                          sender.close()
                                        },
                                      })
                                    },
                                  },
                                  {
                                    text: '新增子节点',
                                    onClick: () => {
                                      const { key, children } = dataFields
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
