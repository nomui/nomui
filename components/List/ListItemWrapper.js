import Component from "../Component/index";
import ListItem from "./ListItem";

class ListItemWrapper extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            tag: 'li',
            item: { component: ListItem },
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.list = this.parent
    }

    _config() {
        this.setProps({
            selectable: false,
            children: [this.props.item],
        })
    }
}

Component.register(ListItemWrapper)

export default ListItemWrapper