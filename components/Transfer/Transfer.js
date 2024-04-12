import Component from '../Component/index'
import Field from '../Field/index'
import { debounce, isString } from '../util/index'

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
      // RadioList,CheckboxList等div组件不为 focusable 元素
      // 需设置 tabindex才有 fouces方法，进而触发校验的 Tooltip
      attrs: { tabindex: this.props.tabindex || 0 },
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
                attrs: {
                  style: {
                    'height': isString(me.props.height) ? me.props.height : `${me.props.height}px`
                  }
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
                          text: me.props.selectAllText,
                          size: 'small',
                          ref: (c) => {
                            me.checkAllBtn = c
                          },
                          type: 'text',
                          onClick: ({ sender }) => {
                            if (me.props.disabled) {
                              return
                            }
                            if (sender.props.text === me.props.selectAllText) {
                              sender.update({
                                text: me.props.deselectAllText,
                              })
                              me.checkAll()
                            } else {
                              sender.update({
                                text: me.props.selectAllText,
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

                        disabled: me.props.disabled,
                        expandable: {
                          byIndicator: true,
                        },

                        nodeCheckable: {
                          cascade: me.props.displayAsTree,
                          checkedNodeKeys: initKeys,
                          onCheckChange: () => {
                            me._updateSourceCount()
                          },
                        },
                        nodeDefaults: {
                          onClick: ({ sender, event }) => {
                            if (me.props.disabled || sender.checkboxRef.props.disabled) {
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
                  ref: (c) => {
                    me.addTrigger = c
                  },
                  onClick: () => {
                    if (me.props.disabled) {
                      return
                    }
                    me.addNodes()
                  },
                },
                {
                  component: 'Button',
                  size: 'small',
                  icon: 'left',
                  ref: (c) => {
                    me.removeTrigger = c
                  },
                  onClick: () => {
                    if (me.props.disabled) {
                      return
                    }
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
                attrs: {
                  style: {
                    'height': isString(me.props.height) ? me.props.height : `${me.props.height}px`
                  }
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
                          text: me.props.clearText,
                          size: 'small',
                          type: 'text',
                          onClick: () => {
                            if (me.props.disabled) {
                              return
                            }
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
                        disabled: me.props.disabled,
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
                            me._updateTargetCount()
                          },
                        },
                        nodeDefaults: {
                          onClick: ({ sender }) => {
                            if (me.props.disabled || sender.checkboxRef.props.disabled) {
                              return
                            }
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
    if (this.firstRender || this._refreshFlag) {
      this._updateCountNum()
      this.addNodes()
      this._refreshFlag = false
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

  _showParent(node) {
    const p = node.parentNode.parentNode
    if (p.classList.contains('nom-tree-node')) {
      p.classList.remove('s-hidden')
      this._showParent(p)
    }
  }

  _onSourceSearch(val) {
    this.sourceTree.element.querySelectorAll('.nom-tree-node').forEach((n) => {
      if (!val || n.querySelector('.nom-tree-node-content-text').innerHTML.includes(val)) {
        n.classList.remove('s-hidden')
        this._showParent(n)
      } else {
        n.classList.add('s-hidden')
      }
    })
  }

  _onTargetSearch(val) {
    this.targetTree.element.querySelectorAll('.nom-tree-node').forEach((n) => {
      if (!val || n.querySelector('.nom-tree-node-content-text').innerHTML.includes(val)) {
        n.classList.remove('s-hidden')
        this._showParent(n)
      } else {
        n.classList.add('s-hidden')
      }
    })
  }

  _updateCountNum() {
    this._updateSourceCount()
    this._updateTargetCount()
  }

  _updateSourceCount() {
    if (this.sourceTree.element.querySelectorAll('input:checked:enabled').length) {
      this.addTrigger.update({
        type: 'primary'
      })
    }
    else {
      this.addTrigger.update({
        type: null
      })
    }
    const u = this.sourceTree.getCheckedNodeKeys().length
    const d = this._getCheckedChildNodeKeys(this.sourceTree.getChildNodes(), true).length
    this.sourceCount.update({
      children: this.props.countText.replace('{{current}}', u).replace('{{total}}', d),
    })
  }

  _updateTargetCount() {
    if (this.targetTree.element.querySelectorAll('input:checked:enabled').length) {
      this.removeTrigger.update({
        type: 'primary'
      })
    }
    else {
      this.removeTrigger.update({
        type: null
      })
    }
    const u = this.targetTree.getCheckedNodeKeys().length
    const d = this._getCheckedChildNodeKeys(this.targetTree.getChildNodes(), true).length
    this.targetCount.update({
      children: this.props.countText.replace('{{current}}', u).replace('{{total}}', d),
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
    const nodes = this._getCheckedChildNodeKeys(this.sourceTree.getChildNodes())

    this._processChecked(nodes)
    this.targetTree.update({
      data: this.selectData,
    })
    this._updateCountNum()
    const v = this.getValue()
    this.props.value = v
    this.props.onChange && this._callHandler(this.props.onChange, { newValue: v })
  }

  removeNodes() {
    const nodes = this._getCheckedChildNodeKeys(this.targetTree.getChildNodes())
    if (!nodes.length) {
      return
    }

    this._removeItem(nodes)
    this.selectData = this.targetTree.getData()
    this._updateCountNum()
    const v = this.getValue()
    this.props.value = v
    this.props.onChange && this._callHandler(this.props.onChange, { newValue: v })
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
    this.sourceTree.checkAllNodes({ ignoreDisabled: true, ...options })
  }

  uncheckAll(options) {
    this.sourceTree.uncheckAllNodes({ ignoreDisabled: true, ...options })
  }

  disable() {
    this._refreshFlag = true
    this.update({
      disabled: true
    })
  }

  enable() {
    this._refreshFlag = true
    this.update({
      disabled: false
    })
  }


  clear() {
    this.checkAllBtn.update({
      text: this.props.selectAllText,
    })
    this.props.value = null

    const nodes = this._getCheckedChildNodeKeys(this.targetTree.getChildNodes(), true)
    if (!nodes.length) {
      return
    }

    this._removeItem(nodes)
    this.selectData = []
    this._updateCountNum()
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

Transfer.defaults = {
  data: [],
  value: null,
  hideOnSelect: false, // 隐藏已选择节点，不允许在树形数据当中使用
  footerRender: null,
  // pagination: false,
  itemRender: null,
  showSearch: false,
  onChange: null,
  height: 240,
  // onSearch: null,
  // onScroll: null,
  displayAsTree: false,
  dataFields: { key: 'key', text: 'text', children: 'children', parentKey: 'parentKey' },
  selectAllText: '全选',
  clearText: '清空',
  deselectAllText: '反选',
  countText: `{{current}}/{{total}}项`
}

Component.register(Transfer)

export default Transfer
