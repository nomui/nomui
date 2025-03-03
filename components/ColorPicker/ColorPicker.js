import Component from '../Component/index'
import Field from '../Field/index'
import { isHexColor } from '../util/index'

class ColorPicker extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(ColorPicker.defaults, props), ...mixins)
  }

  _created() {
    super._created()
  }

  _config() {
    const { dataKey, useHex } = this.props
    let { data, popupWidth } = this.props

    if (!useHex) {
      data = this._generateDefaultData()
    } else if (!data || !data.length) {
      data = [
        { id: '#c6cacc' },
        { id: '#feda98' },
        { id: '#f9e89e' },
        { id: '#fde996' },
        { id: '#cbe394' },
        { id: '#c8e2a5' },
        { id: '#a4e0a7' },
        { id: '#87e0d3' },
        { id: '#8ad3e2' },
        { id: '#95d8f8' },
        { id: '#98cdf3' },
        { id: '#a7b3e1' },
        { id: '#c4a7e9' },
        { id: '#dd9bc0' },
        { id: '#f6a0b5' },
        { id: '#fdb7a5' },
        { id: '#a7abb0' },
        { id: '#fdd565' },
        { id: '#f6d871' },
        { id: '#fcde65' },
        { id: '#b7e365' },
        { id: '#add37e' },
        { id: '#7dd182' },
        { id: '#54d1c1' },
        { id: '#58cfd3' },
        { id: '#62c3f5' },
        { id: '#65b2fc' },
        { id: '#8072d3' },
        { id: '#a675dd' },
        { id: '#c975d1' },
        { id: '#f2739a' },
        { id: '#fba07c' },
        { id: '#888d92' },
        { id: '#fda635' },
        { id: '#f3c645' },
        { id: '#fbd032' },
        { id: '#a7da2c' },
        { id: '#93c55a' },
        { id: '#5ac264' },
        { id: '#27c2b0' },
        { id: '#2cb8c5' },
        { id: '#30ace1' },
        { id: '#32a5fb' },
        { id: '#5e73c4' },
        { id: '#885bd2' },
        { id: '#b44a9a' },
        { id: '#ed4a7b' },
        { id: '#fa6648' },
        { id: '#6b7279' },
        { id: '#fc8800' },
        { id: '#f0b112' },
        { id: '#fac800' },
        { id: '#9bd100' },
        { id: '#7bb63c' },
        { id: '#3bb346' },
        { id: '#00b3a1' },
        { id: '#05a4b6' },
        { id: '#0095ee' },
        { id: '#0077fa' },
        { id: '#3f51b5' },
        { id: '#6a3ac7' },
        { id: '#9e2cb3' },
        { id: '#e91e63' },
        { id: '#f93a20' },
        { id: '#555B61' },
        { id: '#D26700' },
        { id: '#C88A0F' },
        { id: '#D0AA00' },
        { id: '#7EAE00' },
        { id: '#649830' },
        { id: '#30953B' },
        { id: '#009589' },
        { id: '#038698' },
        { id: '#007BCA' },
        { id: '#0062D6' },
        { id: '#3342A1' },
        { id: '#572FB3' },
        { id: '#871E9E' },
        { id: '#C51356' },
        { id: '#D52515' },
      ]
    }

    if (useHex && data.length === 80 && data[0].id === '#c6cacc') {
      // 给预设hex数据源一个合适的浮层宽度
      popupWidth = 468
    }

    this.setProps({
      attrs: { tabindex: this.props.tabindex || 0 },
      control: {
        classes: { 'nom-color-picker-trigger': true },
        children: {
          ref: (c) => {
            this.colorBlock = c
          },
          classes: { 'nom-color-picker-color-block': true },
          styles: {
            color: !useHex ? this.initValue : undefined,
          },
          attrs: {
            style: {
              backgroundColor: useHex && isHexColor(this.initValue) ? this.initValue : undefined,
              color: useHex && isHexColor(this.initValue) ? '#fff' : undefined,
            },
          },
        },
        popup: {
          children: {
            component: 'DataList',
            ref: (c) => {
              this.colorList = c
            },
            classes: { 'nom-color-picker-list': true },
            // cols: 6,
            wrap: true,
            gap: 'xsmall',
            attrs: {
              style: {
                width: `${popupWidth}px`,
                padding: '12px',
              },
            },
            itemSelectable: {
              byClick: true,
            },
            selectedKeys: this.initValue,
            data: data,
            dataKey,
            itemRender: ({ itemData }) => {
              const color = itemData[dataKey]
              const isHex = isHexColor(color)
              return {
                classes: {
                  'nom-color-picker-list-item': true,
                },
                styles: {
                  color: !useHex ? color : undefined,
                },
                attrs: {
                  style: {
                    backgroundColor: isHex ? color : undefined,
                    color: isHex ? '#fff' : undefined,
                  },
                },
                children: {
                  component: 'Icon',
                  type: 'check',
                },
                onClick: () => {
                  if (isHex) {
                    this.colorBlock.update({
                      attrs: {
                        style: {
                          backgroundColor: color,
                          color: '#fff',
                        },
                      },
                    })
                  } else {
                    this.colorBlock.update({
                      styles: {
                        color: !useHex ? color : undefined,
                      },
                    })
                  }

                  this.control.popup.hide()
                },
              }
            },
            onItemSelectionChange: () => {
              this._onValueChange()
            },
          },
          onShow: () => {
            this.colorList.selectItem(this.currentValue)
          },
        },
      },
    })

    super._config()
  }

  _generateDefaultData() {
    let data = []
    const colors = [
      'red',
      'orange',
      'yellow',
      'green',
      'teal',
      'blue',
      'indigo',
      'purple',
      'pink',
      'cyan',
      'brown',
      'gray',
    ]

    colors.forEach((color) => {
      data = data.concat([
        { id: `l${color}-light` },
        { id: `l${color}` },
        { id: `l${color}-dark` },
        { id: `${color}-light` },
        { id: `${color}` },
        { id: `${color}-dark` },
      ])
    })
    return data
  }

  _getValue() {
    if (!this.colorList || !this.colorList.props || !this.colorList.getSelected()) {
      return this.currentValue
    }
    return this.colorList.getSelected().id
  }

  _setValue(value) {
    this.currentValue = value
    if (!this.props.useHex) {
      this.colorBlock.update({
        styles: {
          color: value,
        },
      })
    } else if (isHexColor(value)) {
      this.colorBlock.update({
        attrs: {
          style: {
            backgroundColor: value,
            color: '#fff',
          },
        },
      })
    }
  }

  _disable() {
    this.control.disable()
  }

  _enable() {
    this.control.enable()
  }
}

ColorPicker.defaults = {
  tag: 'div',
  dataKey: 'id',

  selectedKeys: null,

  itemSelectable: {
    multiple: false,
    byClick: false,
    scrollIntoView: false,
  },

  disabledItemKeys: [],
  showEmpty: false,
  popupWidth: 192,
  useHex: false,
  data: null,
}

Component.register(ColorPicker)

export default ColorPicker
