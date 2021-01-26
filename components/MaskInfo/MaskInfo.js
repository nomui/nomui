import Component from '../Component/index'

class MaskInfo extends Component {
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
      this.props.text = MaskInfo.format({
        value: text,
        type: type,
      })
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
    else if (type === 'mail') {
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

Component.register(MaskInfo)

export default MaskInfo
