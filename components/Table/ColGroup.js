import Component from '../Component/index'
import ColGroupCol from './ColGroupCol'

class ColGroup extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            tag: 'colgroup'
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.table = this.parent;
        this.columns = this.table.props.columns;
    }

    _render() {
        var children = Array.isArray(this.props.columns)
            && this.props.columns.map(function (column) {
                return {
                    component: ColGroupCol,
                    name: column.field,
                    column: column
                }
            })

        this.setProps({
            children: children
        })
    }
}

Component.register(ColGroup)

export default ColGroup