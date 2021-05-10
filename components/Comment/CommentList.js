import Component from '../Component/index';

class CommentList extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            commentItem: [
                {
                    key: '',
                    author: '',
                    avatar: '',
                    content: '',
                    datetime: '',
                    reply: {
                        author: '',
                        avatar: '',
                        content: '',
                        datetime: '',
                    },
                },
            ],
        }
        super(Component.extendProps(defaults, props), ...mixins)
    }


    _created() {
        this._comment = this.parent
        this._comment._list = this
    }

    _config() {
        const _that = this
        const { commentItem } = this.props
        const listArry = this.getList(commentItem)
        this.setProps(
            {
                children: [
                    {
                        ref: (c) => {
                            this.downRef = c
                        },
                        classes: {
                            'nom-comment-more': true,
                        },
                        children: `展开显示${commentItem.length}条更多评论`,
                        onClick: () => {
                            _that.showMore()
                        },
                    },
                    {
                        ref: (c) => {
                            this.upRef = c
                        },
                        classes: {
                            'nom-comment-more': true,
                        },
                        children: `收起更多评论`,
                        autoRender: false,
                        onClick: () => {
                            _that.hideMore()
                        },
                    },
                    {
                        ref: (c) => {
                            this.boxRef = c
                        },
                        classes: {
                            'nom-comment-item-box': true,
                        },
                        children: listArry,
                    },
                ]

            }
        )


    }

    // 列表
    getList(arry) {
        const _that = this
        return arry.map(function (currentValue) {
            const list = {
                classes: {
                    'nom-comment-item': true,
                },
                children: [
                    {
                        classes: {
                            'nom-comment-one': true,
                        },
                        component: 'Cols',
                        align: 'start',
                        items: [
                            {
                                component: 'Avatar',
                                alt: currentValue.author,
                                text: currentValue.author,
                                src: currentValue.avatar,
                            },
                            {
                                children: [
                                    {
                                        tag: 'a',
                                        children: currentValue.author,
                                        classes: {
                                            'nom-comment-author': true,
                                        },
                                    },
                                    {
                                        tag: 'span',
                                        children: _that.getTime(currentValue.datetime),
                                    },
                                    {
                                        children: [
                                            {
                                                classes: {
                                                    'nom-comment-reply-to': true,
                                                    'nom-comment-reply-to-show': _that.hasReply(currentValue.reply),
                                                },
                                                tag: 'a',
                                                children: `@${currentValue.reply.author}:`,
                                            },
                                            {
                                                tag: 'span',
                                                children: currentValue.content,
                                            },
                                        ],
                                    },
                                    {
                                        tag: 'a',
                                        children: '删除',
                                        classes: {
                                            'nom-comment-action-btn': true,
                                            'nom-comment-action-btn-none': (currentValue.author !== _that.parent.props.author),
                                        },
                                        onClick: () => {
                                            _that.deleted(currentValue.key)
                                            _that.parent.props.onDeleted(currentValue.key, _that.props.commentItem)
                                        },
                                    },
                                    {
                                        tag: 'a',
                                        children: '回复',
                                        classes: {
                                            'nom-comment-action-btn': true,
                                        },
                                        onClick: () => {
                                            _that.reply(currentValue.key)
                                            _that.parent.props.onReply(currentValue.key, _that.props.commentItem)
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            }
            if (_that.hasReply(currentValue.reply)) {
                list.children.push({
                    classes: {
                        'nom-comment-reply': true,
                        'nom-comment-one': true,
                    },
                    children: {
                        component: 'Cols',
                        align: 'start',
                        items: [
                            {
                                component: 'Avatar',
                                size: 'small',
                                alt: currentValue.reply.author,
                                text: currentValue.reply.author,
                                src: currentValue.reply.avatar,
                            },
                            {
                                children: [
                                    {
                                        tag: 'a',
                                        children: currentValue.reply.author,
                                        classes: {
                                            'nom-comment-author': true,
                                        },
                                    },
                                    {
                                        tag: 'span',
                                        children: _that.getTime(currentValue.reply.datetime),
                                    },
                                    {
                                        children: currentValue.reply.content,
                                    },
                                ],
                            },
                        ],
                    },
                })

            }
            return list
        })
    }

    // 字符提取时间
    getTime(str) {
        const number = new RegExp('\\d+', 'g')
        return new Date(Number(str.match(number))).format('yyyy-MM-dd hh:mm')
    }

    // 有无回复
    hasReply(val) {
        return JSON.stringify(val) !== '{}'
    }

    // 展开
    showMore() {
        this.boxRef.element.setAttribute('style', 'height: 100% ')
        this.upRef.show()
        this.downRef.hide()
    }

    // 收起
    hideMore() {
        this.boxRef.element.setAttribute('style', 'height: 300px ')
        this.downRef.show()
        this.upRef.hide()
    }

    // 删除
    deleted(key) {
        this.parent.props.commentItem = this.props.commentItem = this.props.commentItem.filter(function (currentValue) {
            return key !== currentValue.key
        })
        this.boxRef.update({
            children: this.getList(this.props.commentItem)
        })
    }

    // 回复
    reply(key) {
        this._comment._textareaFocus(key)
    }

    // 添加评论
    _addComment(val) {
        console.log(val)


        // this.props.commentItem.unshift({
        //     key: newGuid(),
        //     author: this.parent.props.author,
        //     avatar: this.parent.props.avatar,
        //     content: val,
        //     datetime: `/Date(${new Date().getTime()})/`,
        //     reply: {},
        // })
        // this.boxRef.update({
        //     children: this.getList(this.props.commentItem)
        // })
    }

}

Component.register(CommentList)

export default CommentList
