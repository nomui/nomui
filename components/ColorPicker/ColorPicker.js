import Component from '../Component/index'
import Field from '../Field/index'

class ColorPicker extends Field {
    constructor(props, ...mixins) {
        super(Component.extendProps(ColorPicker.defaults, props), ...mixins)
    }

    _config() {
        const { dataKey } = this.props
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

        let data = []

        colors.forEach(color => {
            data = data.concat([
                { id: `l${color}-light` },
                { id: `l${color}` },
                { id: `l${color}-dark` },
                { id: `${color}-light` },
                { id: `${color}` },
                { id: `${color}-dark` },
            ])
        })

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
                        color: this.initValue
                    }
                },
                popup: {
                    children: {
                        component: 'DataList',
                        ref: (c) => {
                            this.colorList = c
                        },
                        classes: { 'nom-color-picker-list': true },
                        cols: 6,
                        wrap: true,
                        gap: 'xsmall',
                        attrs: {
                            style: {
                                width: '190px',
                                padding: '12px',
                            }
                        },
                        itemSelectable: {
                            byClick: true
                        },
                        selectedKeys: this.initValue,
                        data: data,
                        dataKey,
                        itemRender: ({ itemData }) => {
                            return {
                                styles: {
                                    color: itemData.id,

                                },
                                attrs: {
                                    style: {
                                        width: '24px',
                                        height: '24px',
                                    }
                                },
                                onClick: () => {
                                    this.colorBlock.update({
                                        styles: {
                                            color: itemData.id
                                        }
                                    })

                                    this.control.popup.hide()
                                }
                            }
                        },
                        onItemSelectionChange: () => {
                            this._onValueChange()
                        },
                    },
                    onShow: () => {
                        this.colorList.selectItem(this.currentValue)
                    },
                }
            },
        })

        super._config()
    }

    _getValue() {
        if (!this.colorList || !this.colorList.props) {
            return this.currentValue
        }
        return this.colorList.getSelected().id
    }

    _setValue(value) {
        this.currentValue = value
        this.colorBlock.update({
            styles: {
                color: value
            }
        })
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
    data: null,
    dataKey: 'id',

    selectedKeys: null,

    itemSelectable: {
        multiple: false,
        byClick: false,
        scrollIntoView: false,
    },

    disabledItemKeys: [],
    showEmpty: false,
}

Component.register(ColorPicker)

export default ColorPicker