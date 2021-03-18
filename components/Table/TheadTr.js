import Checkbox from '../Checkbox/index'
import Component from '../Component/index'
import Th from './Th'

class TheadTr extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'tr',
      columns: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.thead = this.parent
    this.table = this.thead.table
  }

  _config() {
    const table = this.table
    const { columns } = this.props
    const { checkable } = this.table.props

    const thArr = []
    if (checkable) {
      thArr.push({
        component: Th,
        column: {
          header: {
            component: Checkbox,
            _created: function () {
              table._checkboxAllRef = this
            },
            onValueChange: (args) => {
              if (args.newValue === true) {
                table.checkAllRows(false)
              } else {
                table.uncheckAllRows(false)
              }
            },
          },
          width: 70,
        },
      })
    }
    const children =
      Array.isArray(columns) &&
      columns.map(function (column) {
        return {
          component: Th,
          column: column,
        }
      })

    thArr.push(...children)

    this.setProps({
      children: thArr,
    })
  }
}

Component.register(TheadTr)

export default TheadTr
