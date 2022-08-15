import Component from '../Component/index'

class MaskInfo extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(MaskInfo.defaults, props), ...mixins)
  }

  _created() {
    this.originText = this.props.text
    this.showText = ''
  }

  _config() {
    const { text, type, icon } = this.props
    const that = this

    if (this.props.mask === true) {
      this.showText = MaskInfo.format({
        value: text,
        type: type,
      })
    } else {
      this.showText = this.props.text
    }

    let textNode = null

    if (icon) {
      textNode = {
        tag: 'span',
        children: this.showText,
      }
    } else if (!this.props.mask) {
      textNode = {
        tag: 'span',
        children: this.showText,
      }
      if (that.tooltip) {
        that.tooltip.remove()
        delete that.tooltip
      }
    } else {
      textNode = {
        tag: 'span',
        children: this.showText,
        onClick: () => {
          that.handleClick()
        },
      }
    }

    const children = [
      this.props.mask &&
        !!icon &&
        this.props.text &&
        this.props.toggle &&
        Component.normalizeIconProps({
          type: 'eye',
          onClick: function () {
            that.handleClick()
          },
        }),
      textNode,
    ]

    this.setProps({
      children: this.props.text ? children : this.props.empty,
    })
  }

  _rendered() {
    if (this.props.mask && !this.props.icon && this.props.toggle) {
      this.tooltip = new nomui.Tooltip({ trigger: this, children: '点击显示完整信息' })
    }
  }

  handleClick() {
    // this.props.mask = false
    this.update({
      mask: false,
      attrs: {
        title: this.props.text,
      },
    })
  }

  static format(data) {
    const { value, type } = data

    if (!value) {
      return ''
    }
    if (value === 'NA' || value === '') {
      return value
    }

    let newText = ''

    // 手机号
    if (type === 'mobile') {
      newText = value.replace(/(\d{1,3})(\d{4})(\d+)/g, '$1****$3')
    }
    // 电话号码
    else if (type === 'phone') {
      newText = value.replace(/(\d+)(\d{4})/g, '$1*****')
    }
    // 传真号码
    else if (type === 'fax') {
      newText = value.replace(/(\d+)(\d{4})/g, '$1*****')
    }
    // 邮箱
    else if (type === 'mail' || type === 'email') {
      let strend
      if (value.indexOf('@') < 5) {
        strend = value.substring(1, value.lastIndexOf('@') - 1)
      } else {
        strend = value.substring(2, value.lastIndexOf('@') - 2)
      }
      newText = value.replace(strend, '***')
    }
    // 银行卡
    else if (type === 'card') {
      const strend = value.substring(0, value.length - 4)
      newText = value.replace(strend, '************')
    }

    // 身份证
    else if (type === 'identity') {
      newText = value.replace(/(\d{4}).*(\w{3})/gi, '$1***********$2')
    }
    // 姓名
    else if (type === 'name') {
      const strend = value.substring(0, value.length - 1)
      let star = ''
      for (let i = 0; i < strend.length; i++) {
        star += '*'
      }
      newText = value.replace(strend, star)
    }
    // 中间
    else if (type === 'middle') {
      if (value.length <= 4) {
        newText = '****'
      } else if (value.length > 4 && value.length <= 8) {
        const strend = value.substring(value.length - 4, value.length)
        newText = `****${strend}`
      } else {
        const strend = value.substring(0, value.length - 8)
        const strend2 = value.substring(value.length - 4, value.length)
        newText = `${strend}****${strend2}`
      }
    }

    // 其他
    else if (!type || type === 'other') {
      if (value.length > 4) {
        const strend = value.substring(0, value.length - 4)
        newText = `${strend}****`
      } else {
        newText = ''
        for (let i = 0; i < value.length; i++) {
          newText += '*'
        }
      }
    }
    return newText
  }
}
MaskInfo.defaults = {
  tag: 'span',
  type: null,
  text: null,
  mask: true,
  icon: true,
  empty: null,
  showTitle: true,
  toggle: true,
}
Component.register(MaskInfo)

export default MaskInfo
