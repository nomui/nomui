import Component from '../Component/index'
import Field from '../Field/index'
import { debounce, extend, isNumeric } from '../util/index'

class IconPicker extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(IconPicker.defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.itemsRef = {}
    if (!this.props.data) {
      this.props.data = this.props.interalData
    }
  }

  _config() {
    const { iconRender, value, allowClear } = this.props
    this.setProps({
      classes: {
        'nom-icon-picker-simple': !!iconRender,
      },
      control: {
        children: [
          iconRender
            ? {
                ref: (c) => {
                  this.iconRef = c
                },
                children: iconRender(value),
              }
            : {
                component: 'Icon',
                classes: {
                  'nom-icon-picker-icon': true,
                },
                ref: (c) => {
                  this.iconRef = c
                },
                type: value,
              },
          !this.props.iconRender && {
            ref: (c) => {
              this.textRef = c
            },
            hidden: !value,
            classes: {
              'nom-icon-picker-text': true,
            },
            children: this._getIconValueText(),
          },
          !this.props.iconRender && {
            ref: (c) => {
              this.placeholder = c
            },
            hidden: !!value,
            classes: {
              'nom-icon-picker-text-placeholder': true,
            },
            children: this.props.placeholder,
          },
          !this.props.iconRender && {
            classes: {
              'nom-icon-picker-arrow': true,
            },
            component: 'Icon',
            type: 'down',
          },
          !this.props.iconRender &&
            allowClear && {
              component: 'Icon',
              type: 'times',
              classes: {
                'nom-icon-picker-clear': true,
                'nom-field-clear-handler': true,
              },
              hidden: !value,
              ref: (c) => {
                this.clearIcon = c
              },
              onClick: (args) => {
                this._clear()
                args.event && args.event.stopPropagation()
              },
            },
        ],
      },
    })
    super._config()
  }

  _rendered() {
    const me = this

    const {
      data,
      popupContainer,
      iconRender,
      clearText,
      popupWidth,
      searchPlaceholder,
    } = this.props
    let container
    if (popupContainer === 'self') {
      this.element.style.position = 'relative'
      container = this.element
    } else if (Object.prototype.toString.call(popupContainer) === '[object Function]') {
      const ref = popupContainer()
      ref.element.style.position = 'relative'
      container = ref.element
    }
    let w = popupWidth
    if (isNumeric(popupWidth)) {
      w = `${popupWidth}px`
    }
    this.popup = new nomui.Popup({
      classes: {
        'nom-icon-picker-popup': true,
        'nom-field-popup': true,
      },
      attrs: {
        style: {
          width: w,
        },
      },
      reference: container,
      trigger: this.control,
      content: {
        component: 'Flex',
        vertical: true,
        fit: true,
        items: [
          me.props.searchable && {
            component: 'Textbox',
            placeholder: searchPlaceholder,
            leftIcon: 'search',
            onValueChange: debounce(function ({ newValue }) {
              me._filterItem(newValue)
            }, 500),
          },
          {
            component: 'List',
            vertical: true,
            classes: {
              'nom-icon-picker-list': true,
            },
            data: data,
            itemRender: ({ itemData }) => {
              return {
                component: 'Flex',
                rows: [
                  itemData.category &&
                    itemData.text && {
                      tag: 'h6',
                      children: itemData.text,
                    },
                  {
                    component: 'List',
                    items: itemData.icons,
                    classes: {
                      'nom-icon-picker-sub-list': true,
                    },
                    itemDefaults: {
                      onCreated: ({ inst }) => {
                        me.itemsRef[inst.props.type] = inst
                      },
                      onConfig: ({ inst }) => {
                        inst.setProps({
                          classes: {
                            'nom-icon-picker-list-item': true,
                          },
                          tooltip: inst.props.text || undefined,
                          attrs: {
                            'data-icon-type': inst.props.type,
                            'data-icon-tooltip': inst.props.text,
                          },
                          onClick: () => {
                            me._handleIconClick(inst.props.type, inst.props.text)
                          },
                          children: me.props.itemRender
                            ? me.props.itemRender(inst.props.type)
                            : {
                                attrs: {
                                  style: {
                                    padding: '1rem',
                                    fontSize: '1.2rem',
                                  },
                                },
                                component: 'Icon',
                                type: inst.props.type,
                              },
                        })
                      },
                    },
                  },
                ],
              }
            },
          },
          !!iconRender && {
            component: 'Flex',
            justify: 'end',
            classes: {
              'nom-icon-picker-popup-tools': true,
            },
            cols: [
              {
                component: 'Button',
                size: 'small',
                text: clearText,
                onClick: () => {
                  me.clear()
                  me.popup.hide()
                },
              },
            ],
          },
        ],
      },
      onShow: () => {
        this.selectIcon()
      },
    })
    this._valueChange({ newValue: this.currentValue })
  }

  _getValue() {
    return this.props.value
  }

  _valueChange({ newValue }) {
    const { iconRender } = this.props

    if (newValue) {
      this.iconRef.show()
      this.textRef && this.textRef.show()
      this.placeholder && this.placeholder.hide()
      this.clearIcon && this.clearIcon.show()
    } else {
      !iconRender && this.iconRef.hide()
      this.textRef && this.textRef.hide()
      this.placeholder && this.placeholder.show()
      this.clearIcon && this.clearIcon.hide()
    }
    if (iconRender) {
      this.iconRef.update({ children: iconRender(newValue) })
    } else {
      this.iconRef.update({ type: newValue })
    }
    this.textRef &&
      this.textRef.update({
        children: this._getIconValueText(),
      })
  }

  _setValue(value, options) {
    if (options === false) {
      options = { triggerChange: false }
    } else {
      options = extend({ triggerChange: true }, options)
    }

    const newValue = value
    this.props.value = value
    this.oldValue = this.currentValue

    if (options.triggerChange) {
      if (newValue !== this.oldValue) {
        super._onValueChange()
      }
    }
    this.currentValue = newValue
  }

  selectIcon() {
    const value = this.getValue()
    this.popup.element.querySelectorAll('.nom-icon-picker-list-item.s-selected').forEach((n) => {
      n.component.unselect()
    })
    if (value && this.itemsRef[value]) {
      this.itemsRef[value].select()
      setTimeout(() => {
        value && this.itemsRef[value].element.scrollIntoView({ behavior: 'smooth' })
      }, 250)
    }
  }

  _getIconValueText() {
    const { value, data } = this.props
    let str = ''
    data.forEach((n) => {
      if (n.icons && n.icons.length) {
        n.icons.forEach((x) => {
          if (x.type === value) {
            str = x.text
          }
        })
      }
    })
    return str
  }

  _handleIconClick(type) {
    this.setValue(type)
    this.popup.hide()
  }

  _filterItem(val) {
    if (val) {
      this.popup.element.querySelectorAll('h6').forEach((n) => {
        n.classList.add('s-hidden')
      })
    } else {
      this.popup.element.querySelectorAll('h6').forEach((n) => {
        n.classList.remove('s-hidden')
      })
    }
    this.popup.element.querySelectorAll('.nom-icon-picker-list-item').forEach((n) => {
      if (
        !val ||
        n.getAttribute('data-icon-tooltip').includes(val) ||
        n.getAttribute('data-icon-type').includes(val)
      ) {
        n.classList.remove('s-hidden')
      } else {
        n.classList.add('s-hidden')
      }
    })
  }
}
IconPicker.defaults = {
  popupContainer: 'body',
  searchable: false,
  allowClear: true,
  placeholder: '请选择图标',
  searchPlaceholder: '请输入',
  clearText: '清空',
  popupWidth: 340,
  interalData: [
    {
      category: 'Direction',
      text: '方向',
      icons: [
        { type: 'up', text: '向上' },
        { type: 'down', text: '向下' },
        { type: 'left', text: '向左' },
        { type: 'right', text: '向右' },
        { type: 'swap', text: '交换' },
      ],
    },
    {
      category: 'Prompt',
      text: '提示',
      icons: [
        { type: 'square', text: '正方形' },
        { type: 'info-circle', text: '信息' },
        { type: 'question-circle', text: '疑问' },
        { type: 'exclamation-circle', text: '警告' },
        { type: 'close-circle', text: '关闭' },
        { type: 'check-circle', text: '勾选' },
        { type: 'check-circle-fill', text: '填充勾选' },
        { type: 'info-circle-fill', text: '填充信息' },
        { type: 'warning-circle-fill', text: '填充警告' },
        { type: 'help-circle-fill', text: '填充帮助' },
        { type: 'close-circle-fill', text: '填充关闭' },
        { type: 'up-circle', text: '向上圆圈' },
        { type: 'down-circle', text: '向下圆圈' },
        { type: 'check', text: '勾选' },
        { type: 'close', text: '关闭' },
        { type: 'ellipsis', text: '省略号' },
        { type: 'eye', text: '眼睛' },
        { type: 'eye-invisible', text: '隐藏眼睛' },
        { type: 'pin', text: '图钉' },
        { type: 'pin-fill', text: '填充图钉' },
      ],
    },
    {
      category: 'Editor',
      text: '编辑器',
      icons: [
        { type: 'form', text: '表单' },
        { type: 'plus', text: '加号' },
        { type: 'minus', text: '减号' },
        { type: 'edit', text: '编辑' },
        { type: 'delete', text: '删除' },
        { type: 'blank-square', text: '空白正方形' },
        { type: 'checked-square', text: '勾选正方形' },
        { type: 'half-square', text: '半选正方形' },
        { type: 'times', text: '乘号' },
        { type: 'search', text: '搜索' },
        { type: 'filter', text: '过滤' },
        { type: 'filter-remove', text: '移除过滤' },
        { type: 'sort', text: '排序' },
        { type: 'sort-down', text: '向下排序' },
        { type: 'sort-up', text: '向上排序' },
        { type: 'sort-right', text: '向右排序' },
        { type: 'sort-left', text: '向左排序' },
      ],
    },
    {
      category: 'Common',
      text: '常用',
      icons: [
        { type: 'cloud-upload', text: '云上传' },
        { type: 'upload', text: '上传' },
        { type: 'download', text: '下载' },
        { type: 'star', text: '星标' },
        { type: 'refresh', text: '刷新' },
      ],
    },
    {
      category: 'FileType',
      text: '文件类型',
      icons: [
        { type: 'folder', text: '文件夹' },
        { type: 'folder-filled', text: '填充文件夹' },
        { type: 'file', text: '文件' },
      ],
    },
    {
      category: 'Uncategorized',
      text: '未分类',
      icons: [
        { type: 'clock', text: '时钟' },
        { type: 'calendar', text: '日历' },
        { type: 'image', text: '图片' },
        { type: 'table', text: '表格' },
        { type: 'profile', text: '个人资料' },
        { type: 'user', text: '用户' },
        { type: 'company', text: '公司' },
        { type: 'image-pending', text: '图片' },
        { type: 'sandbox', text: '沙盒' },
      ],
    },
  ],
}
Component.register(IconPicker)

export default IconPicker
