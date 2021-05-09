import Component from '../Component/index'

class Emoji extends Component {
    constructor(props, ...mixins) {
        const defaults = {

        }
        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {

        this.setProps(
            {
            }
        )


    }



    // 选中emoji
    clickEmoji() { }


    // 关闭
    closeEmoji() { }

}

Component.register(Emoji)

export default Emoji
