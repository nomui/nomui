import Component from '../Component/index'
import Empty from '../Empty/index'
import Layout from '../Layout/index'
import Popup from '../Popup/index'
import CascaderList from './CascaderList'

class CascaderPopup extends Popup {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this.cascaderControl = this.opener.field
  }

  _config() {
    const { popMenu } = this.props
    if (popMenu && popMenu.length) {
      this.setProps({
        classes: {
          'nom-cascader-animate-top-show': true,
        },
        children: {
          classes: {
            'nom-cascader-pop-container': true,
          },
          component: Layout,
          body: {
            children: {
              component: CascaderList,
              popMenu,
            },
          },
        },
      })
    } else {
      this.setProps({
        children: {
          styles: {
            padding: 2,
          },
          component: Layout,
          body: {
            children: {
              component: Empty,
            },
          },
        },
      })
    }

    super._config()
  }

  animateHide() {
    if (this.element) {
      console.log('hide', this.element.getAttribute('offset-y'))
      let animateName
      if (this.element.getAttribute('offset-y') !== '0') {
        animateName = 'nom-cascader-animate-bottom-hide'
      } else {
        animateName = 'nom-cascader-animate-top-hide'
      }
      this.addClass(animateName)
      setTimeout(() => {
        this.hide()
        this.removeClass(animateName)
      }, 120)
    }
  }

  _rendered() {
    if (this.element.getAttribute('offset-y') !== '0') {
      this.element.classList.add('nom-cascader-animate-bottom-show')
    } else {
      this.element.classList.add('nom-cascader-animate-top-show')
    }
  }
}

Component.register(CascaderPopup)

export default CascaderPopup
