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
            {
              component: 'List',
              classes: {
                'nom-cascader-search-option-list': true,
              },
              ref: (c) => {
                cascaderControl.searchOptionList = c
              },
              hidden: true,
              cols: 1,
              itemDefaults: {
                onConfig: ({ inst }) => {
                  const fullText = inst.props.label.join(cascaderControl.props.separator)
                  const searchText = cascaderControl._currentSearchText || ''

                  const childrenArray = []

                  if (searchText && fullText.toLowerCase().includes(searchText.toLowerCase())) {
                    const index = fullText.indexOf(searchText)
                    const before = fullText.slice(0, index)
                    const match = fullText.slice(index, index + searchText.length)
                    const after = fullText.slice(index + searchText.length)

                    if (before) {
                      childrenArray.push({ tag: 'span', children: before })
                    }
                    if (match) {
                      childrenArray.push({
                        tag: 'span',
                        children: match,
                        classes: {
                          'nom-cascader-highlight': true,
                        },
                      })
                    }
                    if (after) {
                      childrenArray.push({ tag: 'span', children: after })
                    }
                  } else {
                    childrenArray.push({ tag: 'span', children: fullText })
                  }
                  inst.setProps({
                    children: {
                      classes: {
                        's-disable1d': !!inst.props.disabled,
                      },
                      children: childrenArray,
                      onClick: () => {
                        if (inst.props.disabled) {
                          return
                        }
                        const { label, value } = inst.props
                        cascaderControl.onSearchItemClick({ label, value })
                      },
                    },
                  })
                },
              },
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
