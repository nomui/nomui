import Component from '../Component/index'
import Field from '../Field/index'
import { debounce, isString } from '../util/index'

class GridSettingTransfer extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(GridSettingTransfer.defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.selectedKeys = []
    this.selectData = []
  }

  _config() {
    const me = this
    const { data, dataFields, value, showSearch } = this.props

    let initKeys = []
    if (this.props.value) {
      if (isString(value)) {
        initKeys = [value]
      } else {
        initKeys = value
      }
    }

    this.setProps({
      control: {
        children: {
          component: 'Flex',
          classes: {
            'nom-grid-setting-transfer-container': true,
          },
          align: 'center',
          gutter: 'medium',
          cols: [
            {
              children: {
                component: 'Layout',
                classes: {
                  'nom-grid-setting-transfer-box': true,
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
                          ref: (c) => {
                            me.checkAllBtn = c
                          },
                          type: 'text',
                          onClick: ({ sender }) => {
                            if (sender.props.text === '全选') {
                              sender.update({
                                text: '反选',
                              })
                              me.checkAll()
                            } else {
                              sender.update({
                                text: '全选',
                              })
                              me.uncheckAll()
                            }
                          },
                        },
                      },
                      {
                        ref: (c) => {
                          me.sourceCount = c
                        },
                        children: '',
                      },
                    ],
                  },
                },
                body: {
                  children: {
                    component: 'Layout',
                    header: showSearch
                      ? {
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
                        }
                      : false,
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
                          cascade: me.props.displayAsTree,
                          checkedNodeKeys: initKeys,
                          onCheckChange: () => {
                            me._onSourceCheck()
                          },
                        },
                        nodeDefaults: {
                          onClick: ({ sender, event }) => {
                            if (sender.checkboxRef.props.disabled) {
                              return
                            }
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
                  'nom-grid-setting-transfer-box': true,
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
                          onClick: () => {
                            me.clear()
                          },
                        },
                      },
                      {
                        ref: (c) => {
                          me.targetCount = c
                        },
                        children: '',
                      },
                    ],
                  },
                },
                body: {
                  children: {
                    component: 'Layout',
                    header: showSearch
                      ? {
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
                        }
                      : false,
                    body: {
                      children: {
                        component: 'Tree',
                        _created: function () {
                          me.targetTree = this
                        },
                        data: [],
                        flatData: me.props.displayAsTree,
                        dataFields: { ...dataFields, ...{ children: 'noChildrenAllowed' } },
                        nodeSelectable: false,
                        sortable: true,
                        expandable: {
                          byIndicator: true,
                        },

                        nodeCheckable: {
                          cascade: me.props.displayAsTree,
                          onCheckChange: () => {
                            me._onTargetCheck()
                          },
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

  _rendered() {
    if (this.firstRender) {
      this._onSourceCheck()
      this._onTargetCheck()
      this.addNodes()
    }
  }

  _getCheckedChildNodeKeys(nodes, ignoreCheck) {
    const checkedNodes = []
    nodes.forEach((node) => {
      if (ignoreCheck || node.isChecked()) {
        checkedNodes.push(node.key)
      }

      if (node.getChildNodes().length) {
        Array.prototype.push.apply(
          checkedNodes,
          this._getCheckedChildNodeKeys(node.getChildNodes(), ignoreCheck),
        )
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

  _onSourceCheck() {
    const u = this.sourceTree.getCheckedNodeKeys().length
    const d = this._getCheckedChildNodeKeys(this.sourceTree.getChildNodes(), true).length
    this.sourceCount.update({
      children: `${u}/${d}项`,
    })
  }

  _onTargetCheck() {
    const u = this.targetTree.getCheckedNodeKeys().length
    const d = this._getCheckedChildNodeKeys(this.targetTree.getChildNodes(), true).length
    this.targetCount.update({
      children: `${u}/${d}项`,
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
        node.props.data.tools = (args) => {
          return {
            classes: {
              'nom-grid-setting-item-pin': true,
            },
            component: 'Button',
            type: 'text',
            icon: 'pin',
            onClick({ event }) {
              console.log(args)
              event.stopPropagation()
            },
          }
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
    const nodes = this._getCheckedChildNodeKeys(this.sourceTree.getChildNodes())

    this._processChecked(nodes)
    this.targetTree.update({
      data: this.selectData,
    })
    this._onSourceCheck()
    this._onTargetCheck()
    this.props.onChange && this._callHandler(this.props.onChange, { newValue: this.getValue() })
  }

  removeNodes() {
    const nodes = this._getCheckedChildNodeKeys(this.targetTree.getChildNodes())
    if (!nodes.length) {
      return
    }

    this._removeItem(nodes)
    this.selectData = this.targetTree.getData()
    this._onSourceCheck()
    this._onTargetCheck()
    this.props.onChange && this._callHandler(this.props.onChange, { newValue: this.getValue() })
  }

  _removeItem(nodes) {
    for (let i = 0; i < nodes.length; i++) {
      const nodeKey = nodes[i]
      this.selectedKeys = this.selectedKeys.filter((n) => {
        return n !== nodeKey
      })

      const sourceItem = this.sourceTree.getNode(nodeKey)

      if (this.props.hideOnSelect) {
        this._showNode(sourceItem)
      }
      this._enableNode(sourceItem)
      sourceItem.uncheck()

      this.targetTree.getNode(nodeKey) &&
        this.targetTree.getNode(nodeKey).props &&
        this.targetTree.getNode(nodeKey).remove()
    }
  }

  checkAll(options) {
    this.sourceTree.checkAllNodes(options)
  }

  uncheckAll(options) {
    this.sourceTree.uncheckAllNodes(options)
  }

  clear() {
    this.checkAllBtn.update({
      text: '全选',
    })
    this.sourceTree.update({ data: this.props.data })
    this.targetTree.update({
      data: [],
    })
    this._onSourceCheck()
    this._onTargetCheck()
    this.props.onChange && this._callHandler(this.props.onChange, { newValue: this.getValue() })
  }

  getValue() {
    const keys = this._getCheckedChildNodeKeys(this.targetTree.getChildNodes(), true)
    if (!keys || !keys.length) {
      return null
    }
    return keys
  }
}

GridSettingTransfer.defaults = {
  data: [],
  value: null,
  hideOnSelect: false, // 隐藏已选择节点，不允许在树形数据当中使用
  footerRender: null,
  // pagination: false,
  itemRender: null,
  showSearch: true,
  onChange: null,
  // onSearch: null,
  // onScroll: null,
  displayAsTree: true,
  dataFields: { key: 'field', text: 'title', children: 'children', parentKey: 'parentKey' },
}

Component.register(GridSettingTransfer)

export default GridSettingTransfer
