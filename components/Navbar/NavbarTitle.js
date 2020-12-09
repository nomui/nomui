import Component from '../Component/index'

class NavbarTitle extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            heading: null,
            subheading: null,
            icon: null,
            image: null
        }

        let tagProp = props.href ? { tag: 'a' } : {}

        super(Component.extendProps(defaults, props, tagProp), ...mixins)
    }

    config() {
        if (this.props.href) {
            this.setProps({
                tag: 'a',
                attrs: {
                    href: this.props.href
                }
            })
        }
        this.setProps({
            children: [
                this.props.heading && { component: Component, tag: 'h3', children: [this.props.heading.text, this.props.subheading && { component: Component, tag: 'small', children: this.props.subheading.text }] },
                //this.props.subheading && { component: Component, tag: 'span', children: this.props.subheading.text }
            ]
        })
    }
}

Component.register(NavbarTitle)

export default NavbarTitle