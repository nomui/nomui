import Component from '../Component/index'

class UserList extends Component {
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



    // 选中用户
    clickUser() { }

    // 搜索用户
    searchUser() { }

    // 关闭
    closeUser() { }



}

Component.register(UserList)

export default UserList
