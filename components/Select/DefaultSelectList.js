import Component from '../Component/index'
import List from '../List/index'
import SelectListMixin from './SelectListMixin'

class SelectList extends List {
    constructor(props, ...mixins) {
        const defaults = {
            gutter: 'x-md',
            cols: 1,
            itemDefaults: {
                key() {
                    return this.props.value;
                },
                selectable: {
                    byClick: true,
                    canRevert: true
                },
                _config: function () {
                    this.setProps({
                        children: this.props.text,
                        selectable: {
                            canRevert: this.list.selectControl.props.multiple === true
                        },
                    })
                },
                events: {
                    select() {
                        let selectControl = this.list.selectControl,
                            selectProps = selectControl.props

                        var selectedOption = { text: this.props.text, value: this.props.value };
                        if (selectProps.multiple === false) {
                            selectControl.selectedSingle.update(selectedOption);
                            selectControl.popup.hide();
                        }
                        else {
                            selectControl.selectedMultiple.appendItem(selectedOption);
                        }
                    },
                    unselect() {
                        let selectControl = this.list.selectControl,
                            selectProps = selectControl.props

                        if (selectProps.multiple === true) {
                            selectControl.selectedMultiple.removeItem(this.key);
                        }
                    }
                }
            }
        }

        super(Component.extendProps(defaults, props), SelectListMixin, ...mixins)
    }

    _config() {
        this.on('', function () {

        })

        super._config()
    }
}

export default SelectList