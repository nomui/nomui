import Component from '../Component/index'
import Field from '../Field/index'

class Transfer extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(Transfer.defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.selectedKeys = []
    this.selectData = []
  }

  _config() {
    const me = this
    const { data, dataFields } = this.props

    this.setProps({
      control: {
        children: {
          component: 'Flex',
          classes: {
            'nom-transfer-container': true,
          },
          align: 'center',
          gutter: 'medium',
          cols: [
            {
              children: {
                component: 'Layout',
                classes: {
                  'nom-transfer-box': true,
                },
                header: {
                  children: {
                    component: 'Flex',
                    align: 'center',
                    fit: true,

                    cols: [
                      {
                        grow: true,
                        children: {
                          component: 'Button',
                          text: '全选',
                          size: 'small',
                          type: 'text',
                        },
                      },
                      {
                        children: '10项',
                      },
                    ],
                  },
                },
                body: {
                  children: {
                    component: 'Layout',
                    header: {
                      _created: function () {
                        me.sourceSearchContainer = this
                      },
                      children: {
                        component: 'Textbox',
                        allowClear: false,
                        _created: function () {
                          me.sourceSearch = this
                        },
                      },
                    },
                    body: {
                      children: {
                        component: 'Tree',
                        _created: function () {
                          me.sourceTree = this
                        },
                        data: data,
                        dataFields: dataFields,
                        nodeSelectable: false,

                        nodeCheckable: {
                          cascade: false,
                          // onCheckChange: (args) => {
                          //   console.log(args)
                          // },
                        },
                        nodeDefaults: {
                          onClick: ({ sender }) => {
                            if (sender.props.checked) {
                              sender.uncheck()
                            } else {
                              sender.check()
                            }
                          },
                        },
                      },
                    },
                  },
                },
                footer:
                  this.props.pagination || this.props.footerRender
                    ? {
                        children: this.props.footerRender
                          ? this.props.footerRender()
                          : {
                              component: 'Flex',
                              fit: true,
                              align: 'center',
                              justify: 'end',
                              cols: [
                                {
                                  children: {
                                    component: 'Pager',
                                    itemsSort: ['pages'],
                                    totalCount: 50,
                                    simple: true,
                                    pageIndex: 1,
                                    pageSize: 20,
                                  },
                                },
                              ],
                            },
                      }
                    : false,
              },
            },
            {
              gutter: 'small',
              rows: [
                {
                  component: 'Button',
                  size: 'small',
                  icon: 'right',
                  onClick: () => {
                    me.addNodes()
                  },
                },
                {
                  component: 'Button',
                  size: 'small',
                  icon: 'left',
                  onClick: () => {
                    me.removeNodes()
                  },
                },
              ],
            },
            {
              children: {
                component: 'Layout',
                classes: {
                  'nom-transfer-box': true,
                },
                header: {
                  children: {
                    component: 'Flex',
                    align: 'center',
                    fit: true,
                    cols: [
                      {
                        grow: true,
                        children: {
                          component: 'Button',
                          text: '清空',
                          size: 'small',
                          type: 'text',
                        },
                      },
                      {
                        children: '10项',
                      },
                    ],
                  },
                },
                body: {
                  children: {
                    component: 'Layout',
                    header: {
                      _created: function () {
                        me.targetSearchContainer = this
                      },
                      children: {
                        component: 'Textbox',
                        allowClear: false,
                        _created: function () {
                          me.targetSearch = this
                        },
                      },
                    },
                    body: {
                      children: {
                        component: 'Tree',
                        _created: function () {
                          me.targetTree = this
                        },
                        data: [],
                        dataFields: dataFields,
                        nodeSelectable: false,
                        sortable: true,
                        nodeCheckable: {
                          cascade: false,
                          // onCheckChange: (args) => {
                          //   console.log(args)
                          // },
                        },
                        nodeDefaults: {
                          onClick: ({ sender }) => {
                            if (sender.props.checked) {
                              sender.uncheck()
                            } else {
                              sender.check()
                            }
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
    })

    super._config()
  }

  addNodes() {
    const nodes = this.sourceTree.getCheckedNodes()
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].props.data.disabled) {
        continue
      }
      // 添加目标项
      if (!this.selectedKeys.includes(nodes[i].key)) {
        this.selectedKeys.push(nodes[i].key)
        this.selectData.push(nodes[i].props.data)
        this.targetTree.update({
          data: this.selectData,
        })
      }

      // 禁用源项
      if (this.props.hideOnSelect) {
        nodes[i].hide()
      }
      nodes[i].disable()
    }
  }

  removeNodes() {
    const nodes = this.targetTree.getCheckedNodes()
    for (let i = 0; i < nodes.length; i++) {
      this.selectedKeys = this.selectedKeys.filter((n) => {
        return n !== nodes[i].key
      })
      const sourceItem = this.sourceTree.getNode(nodes[i].key)
      if (this.props.hideOnSelect) {
        sourceItem.show()
      }
      sourceItem.enable()
      sourceItem.uncheck()
      nodes[i].remove()
    }
    this.selectData = this.targetTree.getData()
  }

  getValue() {
    return this.selectedKeys
  }
}

Transfer.defaults = {
  data: [],
  hideOnSelect: true,
  filterOption: null,
  footerRender: null,
  operations: null,
  pagination: true,
  itemRender: null,
  selectedKeys: null,
  targetKeys: null,
  showSearch: false,
  showSelectAll: false,
  onChange: null,
  onSelectionChange: null,
  onSearch: null,
  onScroll: null,
  dataFields: { key: 'key', text: 'text', children: 'children' },
}

Component.register(Transfer)

export default Transfer
