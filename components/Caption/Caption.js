import Component from '../Component/index'
import { } from "../Icon/index";

class Caption extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            title: '',
            subtitle: '',
            icon: null,
            image: null
        }

        let tagProp = props.href ? { tag: 'a' } : {}

        super(Component.extendProps(defaults, props, tagProp), ...mixins)
    }

    _config() {
        let { title, subtitle, icon, image, href } = this.props
        let children = []
        if (image) {
            children.push({ tag: 'img', attrs: { src: image } })
        }
        else if (icon) {
            children.push(Component.normalizeIconProps(icon))
        }
        children.push({
            tag: 'h3',
            children: [
                title,
                subtitle && { tag: 'small', children: subtitle }
            ]
        })
        if (href) {
            this.setProps({ attrs: { href: href } })
        }
        this.setProps({
            children: children
        })
    }
}

Component.register(Caption)

export default Caption