import Component from '../Component/index'
import TheadTr from './TheadTr'

class Thead extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            tag: 'thead'
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.table = this.parent
    }

    _config() {
        this.setProps({
            children: [
                { component: TheadTr }
            ]
        })
    }
}

Component.register(Thead)

export default Thead