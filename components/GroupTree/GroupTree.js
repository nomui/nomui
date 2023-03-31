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
    const { value, columns, columnWidth } = this.props
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
                                size: 'small',
                                type: 'text',
                                attrs: {
                                  style: {
                                    width: '40px',
                                  },
                                },
                                items: [
                                  {
                                    text: '重命名',
                                    onClick: () => {},
                                  },
                                  {
                                    text: '删除行',
                                    onClick: () => {},
                                  },
                                  {
                                    text: '在前方插入行',
                                    onClick: () => {},
                                  },
                                  {
                                    text: '在后方插入行',
                                    onClick: () => {},
                                  },
                                  {
                                    text: '新增子节点',
                                    onClick: () => {},
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
}

Component.register(GroupTree)

export default GroupTree
