import Component from '../Component/index'
import ColGroup from './ColGroup'
import Thead from './Thead'
import Tbody from './Tbody'

class Table extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            tag: 'table',
            columns: [],
            row: {},
            onlyHead: false,
            onlyBody: false,
            keyField: 'id'
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        this.setProps({
            tag: 'table',
            children: [
                { component: ColGroup },
                this.props.onlyBody !== true && { component: Thead },
                this.props.onlyHead !== true && { component: Tbody }
            ]
        })
    }
}

Component.register(Table)

export default Table