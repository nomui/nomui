import Component from '../Component/index'
import ListItemMixin from './ListItemMixin'

class ListItem extends Component {
    constructor(props, ...minxins) {
        super(props, ListItemMixin, ...minxins)
    }
}

export default ListItem