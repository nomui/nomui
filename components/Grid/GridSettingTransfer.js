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
    this.selectedData = [
      { title: '已冻结', field: 'isFrozen', isDivider: true },
      { title: '未冻结', field: 'isFree', isDivider: true },
    ]
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
                            allowClear: true,
                            _created: function () {
                              me.sourceSearch = this
                            },
                            placeholder: '搜索所有列',
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
                          cascade: true,
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
                          component: 'List',
                          items: [
                            {
                              children: '当前显示',
                            },
                            {
                              ref: (c) => {
                                me.targetCount = c
                              },
                              children: '',
                            },
                            {
                              children: '项',
                            },
                          ],
                        },
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
                            allowClear: true,
                            _created: function () {
                              me.targetSearch = this
                            },
                            placeholder: '搜索已添加列',
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
                        dataFields: { ...dataFields },
                        nodeSelectable: false,
                        sortable: {
                          filter: '.nom-grid-setting-group-title',
                          onMove: function (evt) {
                            if (evt.dragged.querySelector('.nom-tree-nodes')) {
                              const toKey = evt.related.component.key
                              const siblings = evt.dragged.parentNode.childNodes
                              let idx = 0
                              let dividerIdx = 0
                              siblings.forEach((n, i) => {
                                if (n.component.key === toKey) {
                                  idx = i
                                }

                                if (n.component.key === 'isFree') {
                                  dividerIdx = i
                                }
                              })

                              if (idx <= dividerIdx) {
                                return false
                              }
                            }
                            if (evt.related.innerHTML.includes('已冻结')) {
                              return 1
                            }
                          },
                          onEnd: function () {
                            const keys = me._getCheckedChildNodeKeys(
                              me.targetTree.getChildNodes(),
                              true,
                            )
                            me.selectedData = keys.map((n) => {
                              const { children, ...obj } = me.targetTree.getNode(n).props.data
                              return obj
                            })
                          },
                        },
                        expandable: {
                          byIndicator: true,
                        },

                        nodeCheckable: {
                          cascadeCheckParent: false,
                          cascadeCheckChildren: true,
                          cascadeUncheckParent: true,
                          cascadeUncheckChildren: true,
                          onCheckChange: ({ sender }) => {
                            me._onTargetCheck(sender)
                          },
                        },
                        nodeDefaults: {
                          onConfig: ({ inst }) => {
                            if (inst.props.data.isDivider) {
                              inst.setProps({
                                disabled: true,
                                classes: {
                                  'nom-grid-setting-group-title': true,
                                },
                              })
                            }
                          },
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

  _onSourceCheck() {
    const u = this.sourceTree.getCheckedNodeKeys().length
    const d = this._getCheckedChildNodeKeys(this.sourceTree.getChildNodes(), true).length
    this.sourceCount.update({
      children: `${u}/${d}项`,
    })
  }

  _onTargetCheck(node) {
    if (node && node.parentNode && node.parentNode.getChildNodes().length === 1) {
      if (node.props.checked === true) {
        node.parentNode.check({ fromChildren: true })
      } else {
        node.parentNode.uncheck({ skipChildren: true })
      }
    }

    const d = this._getCheckedChildNodeKeys(this.targetTree.getChildNodes(), true).length - 2
    this.targetCount.update({
      children: `${d}`,
    })
  }

  _disableNode(node) {
    node.checkboxRef.disable()
    node.props.disabled = true
  }

  _enableNode(node) {
    node.checkboxRef.enable()
    node.props.disabled = false
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

        this.selectedData.push(node.props.data)
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

    if (this.props.frozenCount) {
      this.selectedData = this.selectedData.filter((n) => {
        return n.field !== 'isFree'
      })
      this.selectedData.splice(this.props.frozenCount + 1, 0, {
        title: '未冻结',
        field: 'isFree',
        isDivider: true,
      })
    }
    this.targetTree.update({
      data: this.selectedData,
    })
    this._onSourceCheck()
    this._onTargetCheck()
    this.props.onChange && this._callHandler(this.props.onChange, { newValue: this.getValue() })
  }

  removeNodes() {
    const targetNodes = this.targetTree.getChildNodes()
    const nodes = this._getCheckedChildNodeKeys(
      targetNodes.filter((n) => {
        return n !== 'isFrozen' || n !== 'isFree'
      }),
    )
    if (!nodes.length) {
      return
    }

    this.selectedKeys = this._getCheckedChildNodeKeys(targetNodes, true)

    this._removeItem(nodes)

    this.selectedData = this.selectedData.filter((n) => {
      return this.selectedKeys.includes(n.field)
    })

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

      if (this.targetTree.getNode(nodeKey) && this.targetTree.getNode(nodeKey).props) {
        this.targetTree.getNode(nodeKey).remove()
      }
    }
  }

  checkAll() {
    this.sourceTree.checkAllNodes()
  }

  uncheckAll() {
    this.sourceTree.uncheckAllNodes({ ignoreDisabled: true })
  }

  clear() {
    this.checkAllBtn.update({
      text: '全选',
    })
    this.sourceTree.update({ data: this.props.data })
    this.selectedData = [
      { title: '已冻结', field: 'isFrozen', isDivider: true },
      { title: '未冻结', field: 'isFree', isDivider: true },
    ]
    this.selectedKeys = []
    this.targetTree.update({
      data: this.selectedData,
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

  getData() {
    return this.sourceTree.getData()
  }

  getFrozenCount() {
    let num = 0
    this.targetTree.getData().forEach((n, i) => {
      if (n.field === 'isFree') {
        num = i - 1
      }
    })

    return num
  }

  getSelectedData() {
    function mapTree(arr) {
      return arr.map((n) => {
        const obj = n.props.data
        const c = n.getChildNodes()
        if (c.length) {
          obj.children = mapTree(c)
        }
        return obj
      })
    }

    const data = mapTree(this.targetTree.getChildNodes()).filter((n) => {
      return n.isDivider !== true
    })

    return data
  }
}

GridSettingTransfer.defaults = {
  data: [],
  value: null,
  hideOnSelect: false,
  itemRender: null,
  showSearch: true,
  frozenCount: null,
  displayAsTree: true,
  dataFields: { key: 'field', text: 'title', children: 'children', parentKey: 'parentKey' },
}

Component.register(GridSettingTransfer)

export default GridSettingTransfer
