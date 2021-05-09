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
                children: [
                    {
                        component: 'AutoComplete',
                        autofocus: true,
                        leftIcon: 'user',
                        placeholder: '左图标',
                        options: [
                            { value: 'a' },
                            { value: 'aa' },
                            { value: 'ab' },
                            { value: 'aba' },
                            { value: 'ac' },
                            { value: 'aad' },
                            { value: 'aef' },
                            { value: 'ag' },
                            { value: 'ai' },
                            { value: 'bo' },
                            { value: 'ffc' },
                        ],
                    },
                    {},
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

Component.register(UserList)

export default UserList
