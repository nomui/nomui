import Component from '../Component/index'
import Field from '../Field/index'

class Transfer extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(Transfer.defaults, props), ...mixins)
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
                    component: 'Tree',
                    _created: function () {
                      me.sourceTree = this
                    },
                    data: data,
                    dataFields: dataFields,
                    nodeSelectable: false,
                    nodeDefaults: {
                      onClick: ({ sender }) => {
                        if (
                          sender.props.data[dataFields.children] &&
                          sender.props.data[dataFields.children].length
                        ) {
                          return
                        }
                        if (sender.props.checked) {
                          sender.uncheck()
                        } else {
                          sender.check()
                        }
                      },
                    },
                    nodeCheckable: {
                      cascade: false,
                      onCheckChange: (args) => {
                        console.log(args)
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
                    component: 'Tree',
                    _created: function () {
                      me.targetTree = this
                    },
                    data: data,
                    dataFields: dataFields,
                    nodeSelectable: false,
                    sortable: true,
                    nodeCheckable: {
                      cascade: false,
                      onCheckChange: (args) => {
                        console.log(args)
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
          ],
        },
      },
    })

    super._config()
  }

  addNodes() {}

  removeNodes() {}
}

Transfer.defaults = {
  data: [],
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
