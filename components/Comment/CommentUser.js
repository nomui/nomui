import Component from '../Component/index'

class CommentUser extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            // 艾特列表
            atUserLists: [
                {
                    userId: '',
                    key: '',
                    author: '',
                    avatar: '',
                },
            ],
        }
        super(Component.extendProps(defaults, props), ...mixins)
    }

    _created() {
        this.capsLock = false
        this.searchMode = false
        this.clearContent = true
        this.searechRelated = []
    }

    _config() {
        const { atUserLists } = this.props
        const listArry = this.getList(atUserLists)
        this.setProps(
            {
                children: [
                    {

                        classes: {
                            'nom-comment-search': true,
                        },
                        children: [
                            {
                                ref: (c) => {
                                    this.commentUserSearch = c
                                },
                                classes: {
                                    'nom-comment-input-search': true,
                                },
                                tag: 'input',
                                attrs: {
                                    type: 'search',
                                },
                            },
                            {
                                classes: {
                                    'nom-comment-search-button': true,
                                },
                                component: 'Button',
                                icon: 'search',
                                type: 'text',

                            },
                        ],
                    },
                    {
                        ref: (c) => {
                            this.commentUserBoxs = c
                        },
                        classes: {
                            'nom-comment-atboxs': true,
                        },
                        tag: 'ul',
                        children: listArry,
                    },
                ]
            }
        )
    }

    _rendered() {

        this.commentUserSearch && this.init()
    }

    _remove() {
        document.onkeydown = null
    }

    getList(arry) {
        const _that = this
        return arry.map(function (currentValue) {
            return {
                ref: (c) => {
                    _that.commentUserItem = c
                },
                classes: {
                    'nom-comment-atboxs-li': true,
                    'on': currentValue.active && !!currentValue.active,
                },
                tag: 'li',
                attrs: {
                    userId: currentValue.userId,
                    key: currentValue.key,
                },
                children: {
                    component: 'Cols',
                    align: 'center',
                    items: [
                        {
                            component: 'Avatar',
                            alt: currentValue.author,
                            text: currentValue.author,
                            src: currentValue.avatar,
                        },
                        {
                            classes: {
                                'nom-comment-atboxs-li-name': true,
                            },
                            children: currentValue.author,
                        },
                    ],
                },
                onClick: () => {
                    _that.clickUser(currentValue)
                },
            }
        })
    }

    init() {
        const _that = this
        let timer
        let input
        this.commentUserSearch.element.addEventListener('input', function () {
            if (!_that.capsLock) {
                clearTimeout(timer)
                input = this
                timer = setTimeout(function () {
                    _that.searchUser(input.value)
                }, 500)

            }
        })

        this.commentUserSearch.element.addEventListener('compositionstart', function () {
            _that.capsLock = true
        })
        this.commentUserSearch.element.addEventListener('compositionend', function () {
            _that.capsLock = false
            clearTimeout(timer)
            input = this
            timer = setTimeout(function () {
                _that.searchUser(input.value)
            }, 500)
        })
        this.commentUserItem.element.addEventListener('mouseenter', function () {
            this.searechRelated.forEach(function (currentValue) {
                currentValue.active = false
            })
            this.commentUserBoxs.update({
                children: this.getList(this.searechRelated)
            })
        })

        document.onkeydown = function (e) {
            const keyNum = window.event ? e.keyCode : e.which;

            if (keyNum === 13) {
                if (_that.searechRelated.length !== 0) {
                    const none = _that.searechRelated.some(function (currentValue) {
                        return currentValue.active
                    })
                    if (!none) {
                        _that.searechRelated[0].active = true
                        _that.commentUserBoxs.update({
                            children: _that.getList(_that.searechRelated)
                        })
                    } else {
                        _that.clickUser(_that.searechRelated[0])
                    }
                }

            }

            if (keyNum === 38) {
                if (_that.searechRelated.length !== 0) {
                    const none = _that.searechRelated.some(function (currentValue) {
                        return currentValue.active
                    })
                    if (!none) {
                        _that.searechRelated[0].active = true
                        _that.commentUserBoxs.update({
                            children: _that.getList(_that.searechRelated)
                        })
                    } else {
                        let pointer = null
                        _that.searechRelated.forEach(function (currentValue, index) {
                            if (currentValue.active === true) {
                                pointer = --index
                                currentValue.active = false
                            }
                        })
                        if (pointer >= 0) {
                            _that.searechRelated[pointer].active = true
                            _that.commentUserBoxs.update({
                                children: _that.getList(_that.searechRelated)
                            })
                            /* _that.commentUserBoxs.element.scrollTop = 100 */
                        }
                    }
                }
            }

            if (keyNum === 40) {
                if (_that.searechRelated.length !== 0) {
                    const none = _that.searechRelated.some(function (currentValue) {
                        return currentValue.active
                    })
                    if (!none) {
                        _that.searechRelated[0].active = true
                        _that.commentUserBoxs.update({
                            children: _that.getList(_that.searechRelated)
                        })
                    } else {
                        let pointer = null
                        _that.searechRelated.forEach(function (currentValue, index) {
                            if (currentValue.active === true) {
                                pointer = ++index
                                currentValue.active = false
                            }
                        })
                        if (pointer <= _that.searechRelated.length) {
                            _that.searechRelated[pointer].active = true
                            _that.commentUserBoxs.update({
                                children: _that.getList(_that.searechRelated)
                            })
                            _that.commentUserBoxs.element.scrollTop = 100
                        }
                    }
                }
            }

        }
    }

    // 选中用户
    clickUser(val) {
        console.log(val)

    }

    // 选择
    selectedUser() {

    }

    // 搜索用户
    searchUser(val) {
        // console.log(val, this.props.atUserLists)
        this.searechRelated = this.props.atUserLists.filter(function (currentValue) {
            return (val === String(currentValue.author) || val === String(currentValue.userId) || String(currentValue.author).includes(val))

        })
        // console.log(this.searechRelated)
        if (this.commentUserSearch.element.value.length === 0) {
            this.commentUserBoxs.update({
                children: this.getList(this.props.atUserLists)
            })
        } else {
            this.commentUserBoxs.update({
                children: this.getList(this.searechRelated)
            })
        }

    }

    // 关闭
    closeUser() { }



}

Component.register(CommentUser)

export default CommentUser
