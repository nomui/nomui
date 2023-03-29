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

    this.setProps({
      control: {
        children: {
          component: 'Flex',
          rows: [
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
                  // const that = this
                  this.setProps({
                    data: {
                      tools: {
                        justify: 'end',
                        render: (param) => {
                          const cols = columns.map((n) => {
                            if (n.render) {
                              return n.render(param)
                            }
                            return Component.extendProps(n, {
                              controlWidth: n.width || columnWidth,
                            })
                          })
                          return { component: 'Group', fields: cols, inline: true }
                        },
                      },
                    },
                  })
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
GroupTree.defaults = {
  columnWidth: 200,
}

Component.register(GroupTree)

export default GroupTree
