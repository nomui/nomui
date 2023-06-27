import Component from '../Component/index'
import Field from '../Field/index'
import { debounce } from '../util/index'

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
                        onValueChange: debounce(({ newValue }) => {
                          me._onSourceSearch(newValue)
                        }, 1000),
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
                        expandable: {
                          byIndicator: true,
                        },

                        nodeCheckable: {
                          cascade: false,
                          // onCheckChange: (args) => {
                          //   console.log(args)
                          // },
                        },
                        nodeDefaults: {
                          onClick: ({ sender, event }) => {
                            if (sender.props.checked) {
                              sender.uncheck()
                            } else {
                              sender.check()
                            }
                            event.stopPropagation()
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
                        onValueChange: debounce(({ newValue }) => {
                          me._onTargetSearch(newValue)
                        }, 1000),
                      },
                    },
                    body: {
                      children: {
                        component: 'Tree',
                        _created: function () {
                          me.targetTree = this
                        },
                        data: [],
                        flatData: me.props.treeData && me.props.treeValue,
                        dataFields: { ...dataFields, ...{ children: 'noChildrenAllowed' } },
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

  _getCheckedChildNodes(nodes) {
    const checkedNodes = []
    nodes.forEach((node) => {
      if (node.isChecked()) {
        checkedNodes.push(node.key)
      }
      if (node.getChildNodes().length) {
        Array.prototype.push.apply(checkedNodes, this._getCheckedChildNodes(node.getChildNodes()))
      }
    })
    return checkedNodes
  }

  _onSourceSearch(val) {
    this.sourceTree.element.querySelectorAll('.nom-tree-node').forEach((n) => {
      if (!val || n.querySelector('.nom-tree-node-content-text').innerHTML.includes(val)) {
        n.classList.remove('s-hidden')
      } else {
        n.classList.add('s-hidden')
      }
    })
  }

  _onTargetSearch(val) {
    this.targetTree.element.querySelectorAll('.nom-tree-node').forEach((n) => {
      if (!val || n.querySelector('.nom-tree-node-content-text').innerHTML.includes(val)) {
        n.classList.remove('s-hidden')
      } else {
        n.classList.add('s-hidden')
      }
    })
  }

  _disableNode(node) {
    node.checkboxRef.disable()
  }

  _enableNode(node) {
    node.checkboxRef.enable()
  }

  _hideNode(node) {
    node.element.classList.add('s-hidden')
  }

  _showNode(node) {
    node.element.classList.remove('s-hidden')
  }

  _processChecked(nodes) {
    for (let i = 0; i < nodes.length; i++) {
      const node = this.sourceTree.getNode(nodes[i])

      if (!node.isChecked()) {
        continue
      }

      // 添加目标项
      if (!node.props.data.disabled && !this.selectedKeys.includes(node.key)) {
        this.selectedKeys.push(node.key)
        if (node.parentNode) {
          node.props.data.parentKey = node.parentNode.key
        }
        this.selectData.push(node.props.data)
      }

      // 禁用源项

      let hideFlag = true

      if (node.props.data.children) {
        const cNodes = node.getChildNodes()
        for (let x = 0; x < cNodes.length; x++) {
          if (!cNodes[x].isChecked()) {
            hideFlag = false
          }
        }
      }

      if (this.props.hideOnSelect && hideFlag) {
        this._hideNode(node)
      }

      this._disableNode(node)
    }
  }

  addNodes() {
    // const nodes = this.sourceTree.getCheckedNodes()
    const nodes = this._getCheckedChildNodes(this.sourceTree.getChildNodes())

    this._processChecked(nodes)
    this.targetTree.update({
      data: this.selectData,
    })
  }

  removeNodes() {
    const nodes = this.targetTree.getCheckedNodes()
    if (!nodes.length) {
      return
    }
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      this.selectedKeys = this.selectedKeys.filter((n) => {
        return n !== node.key
      })
      const sourceItem = this.sourceTree.getNode(node.key)
      if (this.props.hideOnSelect) {
        this._showNode(sourceItem)
      }
      this._enableNode(sourceItem)
      sourceItem.uncheck()
      node.remove()
    }
    this.selectData = this.targetTree.getData()
  }

  getValue() {
    return this.selectedKeys
  }
}

Transfer.defaults = {
  data: [],
  hideOnSelect: false,
  filterOption: null,
  footerRender: null,
  operations: null,
  // pagination: false,
  itemRender: null,
  selectedKeys: null,
  targetKeys: null,
  showSearch: false,
  showSelectAll: false,
  onChange: null,
  onSelectionChange: null,
  onSearch: null,
  onScroll: null,
  treeData: true,
  treeValue: true,
  dataFields: { key: 'key', text: 'text', children: 'children', parentKey: 'parentKey' },
}

Component.register(Transfer)

export default Transfer
