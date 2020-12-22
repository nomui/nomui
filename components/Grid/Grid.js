import Component from '../Component/index'
import GridHeader from './GridHeader'
import GridBody from './GridBody'

class Grid extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            columns: [],
            data: [],
            frozenHeader: false
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.minWidth = 0
    }

    _config() {
        this._calcMinWidth()

        this.setProps({
            classes: {
                'm-frozen-header': this.props.frozenHeader
            },
            children: [
                { component: GridHeader },
                { component: GridBody }
            ]
        })
    }

    _calcMinWidth() {
        this.minWidth = 0
        var props = this.props
        for (var i = 0; i < props.columns.length; i++) {
            var column = props.columns[i]
            if (column.width) {
                this.minWidth += column.width
            }
            else {
                this.minWidth += 120
            }
        }
    }

    _render() {
        this.loadingInst && this.loadingInst.remove()
    }

    loading() {
        this.loadingInst = new Loading({
            container: this.parent
        })
    }
}

Component.register(Grid)

export default Grid