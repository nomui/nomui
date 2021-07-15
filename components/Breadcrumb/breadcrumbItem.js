import Component from '../Component/index'

class BreadcrumbItem extends Component {
  constructor(props, ...mixins) {
    const defaults = { tag: 'span', url: null }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    // const that = this
    // const { icon, rightIcon, separator, url, text, overlay } = this.props
    const { icon, rightIcon, separator, url, text } = this.props

    if (icon || rightIcon) {
      this.setProps({
        classes: { 'p-with-icon': true },
      })

      if (!text) {
        this.setProps({
          classes: { 'p-only-icon': true },
        })
      }
    }

    // if (isNotEmptyArray(overlay)) {
    //   this.setProps({
    //     popup: {
    //       triggerAction: 'hover',
    //       aligin: 'left bottom',
    //       children: {
    //         component: BreadcrumbSub,
    //         items: overlay,
    //       },
    //     },
    //   })
    // }

    this.setProps({
      children: [
        Component.normalizeIconProps(icon),
        {
          tag: 'span',
          classes: { 'nom-breadcrumb-link': true },
          children: url ? { tag: 'a', attrs: { href: url }, children: text } : text,
        },
        Component.normalizeIconProps(rightIcon),
        {
          tag: 'span',
          classes: { 'nom-breadcrumb-separator': true },
          children: separator,
        },
      ],
    })
  }
}

Component.register(BreadcrumbItem)

export default BreadcrumbItem
