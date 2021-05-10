import Component from '../Component/index'

class CommentUser extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            options: [],
        }
        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        const { options } = this.props
        this.setProps(
            {
                children: [
                    {
                        ref: (c) => {
                            this.commentUserRef = c
                        },
                        component: 'Select',
                        showArrow: false,
                        showSearch: true,
                        // multiple: true,
                        autofocus: true,
                        options,
                        onSearch(text) {
                            console.log(text)
                            // console.log(this.commentUserRef.getValue())
                        },
                        onValueChange(changed) {
                            console.log(changed)
                        },

                    },
                ]
            }
        )
    }



    // 选中用户
    clickUser() { }

    // 搜索用户
    searchUser() { }

    // 关闭
    closeUser() { }



}

Component.register(CommentUser)

export default CommentUser
