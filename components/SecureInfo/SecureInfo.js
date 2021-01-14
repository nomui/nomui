import Component from '../Component/index'

class SecureInfo extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'span',
      type: null,
      text: null,
      mask: true,
      icon: true,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.originText = this.props.text
  }

  _config() {
    const { text, type, icon } = this.props
    const that = this

    if (this.props.mask === true) {
      this.props.text = this.formatSecuredInfo(text, type)
    } else {
      this.props.text = this.originText
    }

    let textNode = null

    if (icon) {
      textNode = {
        tag: 'span',
        children: this.props.text,
      }
    } else if (!this.props.mask) {
      textNode = {
        tag: 'span',
        children: this.props.text,
      }
      if (that.tooltip) {
        that.tooltip.remove()
        delete that.tooltip
      }
    } else {
      textNode = {
        tag: 'span',
        children: this.props.text,
        onClick: () => {
          that.handleClick()
        },
      }
    }

    const children = [
      textNode,
      this.props.mask &&
        !!icon &&
        Component.normalizeIconProps({
          type: 'eye',
          onClick: function () {
            that.handleClick()
          },
        }),
    ]

    this.setProps({
      children: children,
    })
  }

  _rendered() {
    if (this.props.mask && !this.props.icon) {
      this.tooltip = new nomui.Tooltip({ trigger: this, children: '点击显示完整信息' })
    }
  }

  handleClick() {
    this.props.mask = false
    this.update(this.props.text)
    this.update(this.props.mask)
  }

  formatSecuredInfo(text, type) {
    if (!text) {
      return ''
    }
    if (text === 'NA' || text === '') {
      return text
    }

    let newText = ''

    // 手机号
    if (type === 'mobile') {
      newText = text.replace(/(\d{1,3})(\d{4})(\d+)/g, '$1****$3')
    }
    // 电话号码
    else if (type === 'phone') {
      newText = text.replace(/(\d+)(\d{4})/g, '$1*****')
    }
    // 传真号码
    else if (type === 'fax') {
      newText = text.replace(/(\d+)(\d{4})/g, '$1*****')
    }
    // 邮箱
    else if (type === 'mail') {
      let strend
      if (text.indexOf('@') < 5) {
        strend = text.substring(1, text.lastIndexOf('@') - 1)
      } else {
        strend = text.substring(2, text.lastIndexOf('@') - 2)
      }
      newText = text.replace(strend, '***')
    }
    // 银行卡
    else if (type === 'card') {
      const strend = text.substring(0, text.length - 4)
      newText = text.replace(strend, '************')
    }

    // 身份证
    else if (type === 'identity') {
      newText = text.replace(/(\d{4}).*(\w{3})/gi, '$1***********$2')
    }
    // 姓名
    else if (type === 'name') {
      const strend = text.substring(0, text.length - 1)
      let star = ''
      for (let i = 0; i < strend.length; i++) {
        star += '*'
      }
      newText = text.replace(strend, star)
    }
    // 中间
    else if (type === 'middle') {
      if (text.length <= 4) {
        newText = '****'
      } else if (text.length > 4 && text.length <= 8) {
        const strend = text.substring(text.length - 4, text.length)
        newText = `****${strend}`
      } else {
        const strend = text.substring(0, text.length - 8)
        const strend2 = text.substring(text.length - 4, text.length)
        newText = `${strend}****${strend2}`
      }
    }

    // 其他
    else if (!type || type === 'other') {
      if (text.length > 4) {
        const strend = text.substring(0, text.length - 4)
        newText = `${strend}****`
      } else {
        newText = ''
        for (let i = 0; i < text.length; i++) {
          newText += '*'
        }
      }
    }
    return newText
  }
}

Component.register(SecureInfo)

export default SecureInfo
