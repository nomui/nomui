import Component from '../Component/index'
import Field from '../Field/index'

class Transfer extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(Transfer.defaults, props), ...mixins)
  }

  _config() {
    const { data, dataFields } = this.props

    this.setProps({
      control: {
        children: {
          component: 'Flex',
          classes: {
            'nom-transfer-container': true,
          },
          cols: [
            {
              component: 'Layout',
              body: {
                children: {
                  component: 'Tree',
                  data: data,
                  dataFields: dataFields,
                  nodeSelectable: false,
                  nodeCheckable: {
                    cascade: false,
                    // onCheckChange: (args) => {
                    //   console.log(args)
                    // },
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
}

Transfer.defaults = {
  data: [],
  filterOption: null,
  footerRender: null,
  operations: null,
  pagination: false,
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
