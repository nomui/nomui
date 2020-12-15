import Component from '../Component/index'
import Col from './Col'

class Cols extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            wrap: false,
            items: [],
            itemDefaults: null,
            gutter: 'md',
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        this._propStyleClasses = ['gutter', 'align', 'justify']
        let items = this.props.items
        var children = []
        if (Array.isArray(items) && items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                let item = items[i]
                item = Component.extendProps({}, this.props.itemDefaults, item)
                children.push({ component: Col, children: item })
            }
        }

        this.setProps({
            children: children
        })
    }
}

Component.register(Cols)

export default Cols