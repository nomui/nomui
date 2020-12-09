import Component from '../Component/index'

class TabItem extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            tag: 'a',
            url: null,
            icon: null,
            text: null,
            subtext: null,
            selectable: {
                byClick: true
            }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }
    
    _config() {
        this.setProps({
            attrs: {
                href: this.getItemUrl(this.props.url)
            },
            children: [
                { component: 'Icon', type: this.props.icon },
                { tag: 'span', children: this.props.text },
                { tag: 'span', children: this.props.subtext }
            ]
        })
    }

    _select() {
        this.list.tabContent && this.list.tabContent.showPanel(this.name)
    }

    getItemUrl(url) {
        if (url) {
            return url
        }
        else {
            return 'javascript:void(0);'
        }
    }
}

Component.register(TabItem)

export default TabItem