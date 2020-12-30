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
        byClick: true,
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { icon, text, subtext } = this.props
    this.setProps({
      attrs: {
        href: this.getItemUrl(this.props.url),
      },
      children: [
        icon && { component: 'Icon', type: icon },
        text && { tag: 'span', children: text },
        subtext && { tag: 'span', children: subtext },
      ],
    })
  }

  _select() {
    setTimeout(() => {
      const tabContent = this.list.getTabContent()
      tabContent.showPanel(this.key)
    }, 0)
  }

  getItemUrl(url) {
    if (url) {
      return url
    }

    return 'javascript:void(0);'
  }
}

Component.register(TabItem)

export default TabItem
