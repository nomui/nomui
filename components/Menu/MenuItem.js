import Component from '../Component/index'

class MenuItem extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            tag: 'a',
            url: null,
            icon: null,
            text: null,
            subtext: null,
            indicator: {
                component: 'Icon',
                expandable: {
                    expandedProps: {
                        type: 'up'
                    },
                    collapsedProps: {
                        type: 'down'
                    }
                },
                type: 'down'
            }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.wrapper = this.parent
        this.wrapper.item = this
        this.menu = this.wrapper.menu
        this.level = this.wrapper.level
        this.isLeaf = this.wrapper.isLeaf
        this.menu.itemRefs[this.key] = this
        this.parentItem = null
        if (this.wrapper.parentWrapper) {
            this.parentItem = this.wrapper.parentWrapper.item
        }
    }

    _config() {
        var menu = this.menu, menuProps = menu.props

        var indicatorIconType = 'down'
        if (menuProps.type === 'horizontal' && this.level > 0) {
            indicatorIconType = 'right'
        }


        if (menuProps.type === 'horizontal') {
            this.setProps({
                indicator: {
                    expandable: false
                }
            })
        }

        this.setProps({
            indicator: {
                type: indicatorIconType,
                classes: { 'nom-menu-toggler': true },
                _create() {
                    this.parent.indicator = this
                }
            },
            expandable: {
                byClick: !this.isLeaf,
                target: function () {
                    return this.wrapper.submenu
                },
            },
            attrs: {
                href: this.getItemUrl(this.props.url),
                style: {
                    paddingLeft: menuProps.type === 'vertical' ? (this.level + 1) * menuProps.indent + 'rem' : null
                }
            },
            events: {
                select() {
                    if (menu.selectedItem !== null) menu.selectedItem.unselect()
                    menu.selectedItem = this
                },
                unselect() {
                    if (menu.selectedItem === this) menu.selectedItem = null
                }
            }
        })

        this.setProps({
            children: [
                this.props.icon && { component: 'Icon', type: this.props.icon, classes: { 'nom-menu-item-icon': true } },
                { component: Component, tag: 'span', classes: { 'text': true }, children: this.props.text },
                this.props.subtext && { component: Component, tag: 'span', classes: { 'subtext': true }, children: this.props.subtext },
                this.props.indicator && !this.isLeaf && this.props.indicator
            ]
        })
    }

    _collapse() {
        this.indicator && this.indicator.collapse()
        if (this.menu.props.itemExpandable.expandSingle === true) {
            this.wrapper.parent.expandedChildItem = null
        }
    }

    _expand() {
        this.indicator && this.indicator.expand()
        if (this.menu.props.itemExpandable.expandSingle === true) {
            if (this.wrapper.parent.expandedChildItem) {
                this.wrapper.parent.expandedChildItem.collapse()
            }
            this.wrapper.parent.expandedChildItem = this
        }
    }

    getItemUrl(url) {
        if (url) {
            return url;
        }
        else {
            return 'javascript:void(0);'
        }
    }
}

Component.register(MenuItem)

export default MenuItem