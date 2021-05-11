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
        this.atUserListsCopy = []
    }

    _config() {
        const { atUserLists } = this.props
        const listArry = this.getList(atUserLists)
        this.setProps({
            ref: (c) => {
                this.atUserRef = c
            },
            children: [
                {
                    classes: {
                        'nom-comment-search': true,
                    },
                    children: [
                        {
                            ref: (c) => {
                                this.searchInputRef = c
                            },
                            classes: {
                                'nom-comment-input-search': true,
                            },
                            tag: 'input',
                            attrs: {
                                type: 'search',
                                placeholder: '支持用户id或名字搜索',
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
                        this.atBoxsRef = c
                    },
                    classes: {
                        'nom-comment-atboxs': true,
                    },
                    tag: 'ul',
                    children: listArry,
                },
            ]
        })
    }

    _rendered() {
        this.initUser()
    }

    getList(arry) {
        const _that = this
        return arry.map(function (item) {
            return {
                classes: {
                    'nom-comment-atboxs-item': true,
                    'on': item.active && !!item.active,
                },
                tag: 'li',
                attrs: {
                    userId: item.userId,
                    key: item.key,
                },
                children: {
                    component: 'Cols',
                    align: 'center',
                    items: [
                        {
                            component: 'Avatar',
                            alt: item.author,
                            text: item.author,
                            src: item.avatar,
                        },
                        {
                            classes: {
                                'nom-comment-atboxs-name': true,
                            },
                            children: item.author,
                        },
                    ],
                },
                onClick: () => {
                    _that.selectUser(item)
                },
            }
        })
    }

    initUser() {
        const _that = this
        const search = this.searchInputRef.element
        search.focus()
        search.addEventListener('input', function () {
            if (!_that.capsLock) {
                _that.debounce(_that.autoSearch(this.value), 500)
            }
        })

        search.addEventListener('compositionstart', function () {
            _that.capsLock = true
        })

        search.addEventListener('compositionend', function () {
            _that.capsLock = false
            _that.debounce(_that.autoSearch(this.value), 500)
        })
        // TODO:键盘响应事件
        // document.onkeydown = function (e) {
        //     const keyNum = window.event ? e.keyCode : e.which
        //     if (keyNum === 13) {
        //         _that.keyEnter()
        //     }
        //     // ↑
        //     if (keyNum === 38) {
        //         _that.keyUp()
        //     }
        //     // ↓
        //     if (keyNum === 40) {
        //         _that.keyDown()
        //     }
        //     e.preventDefault()
        //     e.stopPropagation()
        // }
    }

    keyUp() {
        if (this.atUserListsCopy.length !== 0) {
            const none = this.atUserListsCopy.some(function (item) {
                return item.active
            })
            if (!none) {
                this.atUserListsCopy[0].active = true
                this.atBoxsRef.update({
                    children: this.getList(this.atUserListsCopy)
                })
            } else {
                let pointer = null
                this.atUserListsCopy.forEach(function (item, index) {
                    if (item.active === true) {
                        pointer = --index
                        item.active = false
                    }
                })
                if (pointer >= 0) {
                    this.atUserListsCopy[pointer].active = true
                    this.atBoxsRef.update({
                        children: this.getList(this.atUserListsCopy)
                    })
                    /* this.atBoxs.element.scrollTop = 100 */
                }
            }
        }
    }

    keyDown() {
        if (this.atUserListsCopy.length !== 0) {
            const none = this.atUserListsCopy.some(function (item) {
                return item.active
            })
            if (!none) {
                this.atUserListsCopy[0].active = true
                this.atBoxsRef.update({
                    children: this.getList(this.atUserListsCopy)
                })
            } else {
                let pointer = null
                this.atUserListsCopy.forEach(function (item, index) {
                    if (item.active === true) {
                        pointer = ++index
                        item.active = false
                    }
                })
                if (pointer <= this.atUserListsCopy.length) {
                    this.atUserListsCopy[pointer].active = true
                    this.atBoxsRef.update({
                        children: this.getList(this.atUserListsCopy)
                    })
                    this.atBoxsRef.element.scrollTop = 100
                }
            }
        }
    }

    keyEnter() {
        if (this.atUserListsCopy.length !== 0) {
            const none = this.atUserListsCopy.some(function (item) {
                return item.active
            })
            if (!none) {
                this.atUserListsCopy[0].active = true
                this.atBoxsRef.update({
                    children: this.getList(this.atUserListsCopy)
                })
            } else {
                this.selectUser(this.atUserListsCopy[0])
            }
        }
    }

    selectUser(obj) {
        this.closeUserModal()
        this._comment._insertUser(obj)
    }

    closeUserModal() {
        this._comment._closeUserModal()
    }

    autoSearch(val) {
        const { atUserLists } = this.props
        this.atUserListsCopy = atUserLists.filter(function (item) {
            return (val === String(item.author) || String(item.author).includes(val) || val === String(item.userId))
        })
        if (this.searchInputRef.element.value.trim().length === 0) {
            this.atBoxsRef.update({
                children: this.getList(atUserLists)
            })
        } else {
            this.atBoxsRef.update({
                children: this.getList(this.atUserListsCopy)
            })
        }
    }

    // 防抖函数
    debounce(func, wait) {
        let timer = null;
        return function () {
            const context = this
            const args = arguments
            timer && clearTimeout(timer)
            timer = setTimeout(function () {
                func.apply(context, args)
            }, wait)
        }
    }
}

Component.register(CommentUser)

export default CommentUser
