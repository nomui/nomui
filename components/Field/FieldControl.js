import Component from '../Component/index'

class FieldControl extends Component {
    constructor(props, ...mixins) {
        super(props)
    }

    _create() {
        this.field = this.parent
    }

    _config() {
        this.setProps({
            children: {
                value: this.props.value
            }
        });

        this.setProps({
            children: this.field.props.control
        })
    }
}

Component.register(FieldControl)

export default FieldControl