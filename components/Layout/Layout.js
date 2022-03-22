import Component from '../Component/index'
import LayoutAsider from './LayoutAsider'
import LayoutBody from './LayoutBody'
import LayoutFooter from './LayoutFooter'
import LayoutHeader from './LayoutHeader'
import LayoutSider from './LayoutSider'

class Layout extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Layout.defaults, props), ...mixins)
  }

  _config() {
    const { header, body, footer, sider, asider } = this.props
    this._addPropStyle('fit')

    this.setProps({
      tag: 'div',
      header: header && { component: LayoutHeader },
      body: body && { component: LayoutBody },
      footer: footer && { component: LayoutFooter },
      sider: sider && { component: LayoutSider },
      asider: asider && { component: LayoutAsider },
    })

    if (sider || asider) {
      this.setProps({
        classes: {
          'p-has-sider': true,
        },
        children: [this.props.sider, this.props.body, this.props.asider],
      })
    } else {
      this.setProps({
        children: [this.props.header, this.props.body, this.props.footer],
      })
    }
  }
}
Layout.defaults = {
  header: null,
  body: null,
  footer: null,
  sider: null,
  asider: null,
  fit: true,
}

Component.register(Layout)

export default Layout
