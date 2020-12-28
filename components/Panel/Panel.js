import Component from '../Component/index'
import PanelBody from './PanelBody'
import PanelFooter from './PanelFooter'
import PanelHeader from './PanelHeader'

class Panel extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      header: null,
      body: null,
      footer: null,
      type: 'default',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { header, body, footer } = this.props
    let footerProps
    const headerProps = Component.extendProps({ component: PanelHeader }, header)
    const bodyProps = Component.extendProps({ component: PanelBody }, body)
    if (footer) {
      footerProps = Component.extendProps({ component: PanelFooter }, footer)
    }

    this.setProps({
      children: [headerProps, bodyProps, footerProps],
    })
  }
}

Component.register(Panel)

export default Panel
