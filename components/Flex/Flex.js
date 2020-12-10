import Component from '../Component/index'
import FlexItem from './FlexItem'

class Flex extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            wrap: false,
            items: [],
            itemDefaults: null,
            direction: 'horizontal',
            gap: 'md',
            wrap: false
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        this._propStyleClasses = ['direction', 'gap', 'wrap']
        let items = this.props.items
        var children = []
        if (Array.isArray(items) && items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                let item = items[i]
                item = Component.extendProps({}, this.props.itemDefaults, item)
                children.push({ component: FlexItem, children: item })
            }
        }

        this.setProps({
            children: children
        })
    }
}

Component.register(Flex)

export default Flex