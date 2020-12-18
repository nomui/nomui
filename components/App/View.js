import Component from '../Component/index'

class View extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            defaultPath: null
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    render() {
        this._mountElement()
        this.$app.routeView(this.$app.lastLevel, this.element, this.props.defaultPath)
    }

}

Component.register(View)

export default View