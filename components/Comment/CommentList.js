import Component from '../Component/index';

class CommentList extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            // 留言列表
            commentItem: [
                {
                    userId: '',// 用户id唯一
                    key: '',// 每条留言唯一key值
                    author: '',
                    avatar: '',
                    atRelevant: [],// 该条留言@了哪些人
                    content: '',
                    datetime: '',
                    // 回复了谁
                    reply: {
                        author: '',
                        avatar: '',
                        atRelevant: [],
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
                        children:
                            [
                                {
                                    children: `展开 ${commentItem.length} 条更多评论`,
                                },
                                {
                                    component: 'Icon',
                                    type: 'down',
                                },
                            ],
                        onClick: () => {
                            this.showMore()
                        },
                    },
                    {
                        ref: (c) => {
                            this.upRef = c
                        },
                        classes: {
                            'nom-comment-more': true,
                        },
                        children:
                            [
                                {
                                    children: `收起更多评论`,
                                },
                                {
                                    component: 'Icon',
                                    type: 'up',
                                },
                            ],
                        autoRender: false,
                        onClick: () => {
                            this.hideMore()
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

    getList(arry) {
        const _that = this
        return arry.map(function (item) {
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
                                alt: item.author,
                                text: item.author,
                                src: item.avatar,
                            },
                            {
                                children: [
                                    {
                                        tag: 'a',
                                        children: item.author,
                                        classes: {
                                            'nom-comment-author': true,
                                        },
                                    },
                                    {
                                        tag: 'span',
                                        children: item.datetime,
                                    },
                                    {
                                        children: [
                                            {
                                                classes: {
                                                    'nom-comment-reply-to': true,
                                                    'nom-comment-reply-to-show': _that.hasReply(item.reply),
                                                },
                                                tag: 'span',
                                                children: _that.hasReply(item.reply) ? `回复 ${item.reply.author}:` : '',
                                            },
                                            {
                                                tag: 'span',
                                                children: [
                                                    {
                                                        tag: 'a',
                                                        children: _that.atFormat(item.atRelevant),
                                                    },
                                                    {
                                                        tag: 'span',
                                                        children: item.content
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        tag: 'a',
                                        children: '删除',
                                        classes: {
                                            'nom-comment-action-btn': true,
                                            'nom-comment-action-btn-none': (item.userId !== _that.parent.props.userId),
                                        },
                                        onClick: () => {
                                            new nomui.Confirm({
                                                title: '确定删除吗 ？',
                                                onOk: function () {
                                                    _that.parent.props.onDeleted(item)
                                                },
                                            })
                                        },
                                    },
                                    {
                                        tag: 'a',
                                        children: '回复',
                                        classes: {
                                            'nom-comment-action-btn': true,
                                        },
                                        onClick: () => {
                                            _that.reply(item.key)
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            }
            if (_that.hasReply(item.reply)) {
                list.children.push({
                    classes: {
                        'nom-comment-reply': true,
                        'nom-comment-one': true,
                    },
                    children: {
                        component: 'Cols',
                        align: 'center',
                        items: [
                            {
                                component: 'Avatar',
                                size: 'small',
                                alt: item.reply.author,
                                text: item.reply.author,
                                src: item.reply.avatar,
                            },
                            {
                                children: [
                                    {
                                        tag: 'a',
                                        children: item.reply.author,
                                        classes: {
                                            'nom-comment-author': true,
                                        },
                                    },
                                    {
                                        tag: 'span',
                                        children: item.reply.datetime,
                                    },
                                    {
                                        children: [
                                            {
                                                tag: 'a',
                                                children: _that.atFormat(item.reply.atRelevant),
                                            },
                                            {
                                                tag: 'span',
                                                children: item.reply.content,
                                            },
                                        ],
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

    hasReply(val) {
        return JSON.stringify(val) !== '{}'
    }

    atFormat(val) {
        const arry = val.map(function (item) {
            return `@${item}\n`
        })
        return arry.join('')
    }

    timeFormat(str) {
        const number = new RegExp('\\d+', 'g')
        return new Date(Number(str.match(number))).format('yyyy-MM-dd hh:mm')
    }

    showMore() {
        this.boxRef.element.setAttribute('style', 'height: 100% ')
        this.upRef.show()
        this.downRef.hide()
    }

    hideMore() {
        this.boxRef.element.setAttribute('style', 'height: 300px ')
        this.downRef.show()
        this.upRef.hide()
    }

    deleted(key) {
        const commentItem = this.props.commentItem
        this.parent.props.commentItem = this.props.commentItem = commentItem.filter(function (item) {
            return key !== item.key
        })
        this.boxRef.update({
            children: this.getList(commentItem)
        })
    }

    reply(key) {
        this._comment._textareaFocus(key)
    }

    _addComment(commentItem) {
        this.boxRef.update({
            children: this.getList(commentItem)
        })
        // this.boxRef.element.scrollTop = 0
    }

}

Component.register(CommentList)

export default CommentList
