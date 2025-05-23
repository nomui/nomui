import Component from '../Component/index'
import Layout from '../Layout/index'
import Popup from '../Popup/index'
import CascaderList from './CascaderList'

class CascaderPopup extends Popup {
  constructor(props, ...mixins) {
    const defaults = {
      animate: true,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this.cascaderControl = this.opener.field
  }

  _config() {
    const { cascaderControl } = this

    this.setProps({
      children: {
        classes: {
          'nom-cascader-pop-container': true,
        },
        component: Layout,
        fit: true,
        body: {
          children: [
            {
              ref: (c) => {
                cascaderControl.emptyRef = c
              },
              classes: {
                'nom-cascader-empty': true,
              },
              hidden: true,
              component: Layout,
              body: {
                children: {
                  component: 'Empty',
                },
              },
            },
            {
              component: CascaderList,
            },
          ],
        },
      },
    })

    super._config()
  }

  _rendered() {
    this.removeClass('nom-layer-animate-show')
    this.cascaderControl.props.animate && this.props.animate && this.animateInit()
  }

  animateInit() {
    if (!this.element) return false
    if (this.element.getAttribute('offset-y') !== '0') {
      this.addClass('nom-cascader-animate-bottom-show')
    } else {
      this.addClass('nom-cascader-animate-top-show')
    }
  }

  animateHide() {
    if (!this.element) return false
    let animateName
    if (this.element.getAttribute('offset-y') !== '0') {
      animateName = 'nom-cascader-animate-bottom'
    } else {
      animateName = 'nom-cascader-animate-top'
    }
    this.addClass(`${animateName}-hide`)
    setTimeout(() => {
      if (!this.element) return false
      this.hide()
      this.removeClass(`${animateName}-hide`)
      this.addClass(`${animateName}-show`)
    }, 160)
  }
}

Component.register(CascaderPopup)

export default CascaderPopup
