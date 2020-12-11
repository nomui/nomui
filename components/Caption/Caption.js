import Component from '../Component/index'
import { } from "../Icon/index";

class Caption extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            title: '',
            subtitle: '',
            icon: null,
            image: null,
            titleLevel: 5
        }

        let tagProp = props.href ? { tag: 'a' } : {}

        super(Component.extendProps(defaults, props, tagProp), ...mixins)
    }

    _config() {
        let { title, subtitle, icon, image, href, titleLevel } = this.props
        let children = []
        if (image) {
            children.push({ tag: 'img', attrs: { src: image } })
        }
        else if (icon) {
            children.push(Component.normalizeIconProps(icon))
        }
        let titleTag = `h${titleLevel}`
        children.push({
            tag: titleTag,
            classes: {
                'nom-caption-title': true
            },
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