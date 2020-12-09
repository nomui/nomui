import Component from '../Component/index'

class ColGroupCol extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            tag: 'col',
            column: {}
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        this.setProps({
            attrs: {
                style: {
                    width: this.props.column.width || null
                }
            }
        })
    }
}

Component.register(ColGroupCol)

export default ColGroupCol