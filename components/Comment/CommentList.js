import Component from '../Component/index'

class CommentList extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            commentItem: [
                {
                    author: '',
                    avatar: '',
                    content: '',
                    datetime: '',
                    repbtn: false,
                    delbtn: false,
                    /* 回复谁的留言 */
                    reply: {
                        deleted: false,// 评论是否已删除
                        author: '',
                        avatar: '',
                        content: '',
                        datetime: '',
                        repbtn: false,
                        delbtn: false,
                    },
                    onReply: () => { },
                    onDeleted: () => { },
                },
            ],
        }
        super(Component.extendProps(defaults, props), ...mixins)
    }



    _config() {
        const { commentItem } = this.props
        const arry_list = this.getList(commentItem)
        let asyncRefmain = null
        let asyncRefdown = null
        let asyncRefup = null
        this.setProps(
            {
                children: [
                    {
                        ref: (c) => {
                            asyncRefdown = c
                        },
                        classes: {
                            'nom-comment-more': true,
                        },
                        children: `展开显示${commentItem.length}条更多评论`,
                        onClick: () => {
                            this.showMore(asyncRefmain, asyncRefup, asyncRefdown)
                        },
                    },
                    {
                        ref: (c) => {
                            asyncRefup = c
                        },
                        classes: {
                            'nom-comment-more': true,
                        },
                        children: `收起更多评论`,
                        autoRender: false,
                        onClick: () => {
                            this.hideMore(asyncRefmain, asyncRefup, asyncRefdown)
                        },
                    },
                    {
                        ref: (c) => {
                            asyncRefmain = c
                        },
                        classes: {
                            'nom-comment-item-box': true,
                        },
                        children: arry_list,
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
                                                    'nom-comment-reply-to-show': _that.isReply(currentValue.reply),
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
                                            'nom-comment-action-btn-none': !currentValue.delbtn,
                                        },
                                        onClick: (e) => {
                                            this.deleted(e)
                                            currentValue.onDeleted()
                                        },
                                    },
                                    {
                                        tag: 'a',
                                        children: '回复',
                                        classes: {
                                            'nom-comment-action-btn': true,
                                            'nom-comment-action-btn-none': !currentValue.repbtn,
                                        },
                                        onClick: () => {
                                            this.reply()
                                            currentValue.onReply()
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            }
            if (_that.isReply(currentValue.reply)) {
                if (!currentValue.reply.deleted) {
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
                                        {
                                            tag: 'a',
                                            children: '删除',
                                            classes: {
                                                'nom-comment-action-btn': true,
                                                'nom-comment-action-btn-none': !currentValue.reply.delbtn,
                                            },
                                            onClick: (e) => {
                                                this.deleted(e)
                                                currentValue.onDeleted()
                                            },
                                        },
                                        {
                                            tag: 'a',
                                            children: '回复',
                                            classes: {
                                                'nom-comment-action-btn': true,
                                                'nom-comment-action-btn-none': !currentValue.reply.repbtn,
                                            },
                                            onClick: () => {
                                                this.reply()
                                                currentValue.onReply()
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    })
                } else {
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
                                            children: '评论已删除',
                                        },
                                    ],
                                },
                            ],
                        },
                    })
                }
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
    isReply(val) {
        return JSON.stringify(val) !== '{}'
    }

    // 展开
    showMore(asyncRefmain, asyncRefup, asyncRefdown) {
        asyncRefmain.element.setAttribute('style', 'height: 100% ')
        asyncRefup.show()
        asyncRefdown.hide()
    }

    // 收起
    hideMore(asyncRefmain, asyncRefup, asyncRefdown) {
        asyncRefmain.element.setAttribute('style', 'height: 300px ')
        asyncRefdown.show()
        asyncRefup.hide()
    }

    // 删除
    deleted(e) {
        e.sender.parent.parent.parent.parent.remove()

    }

    // 回复
    reply() { }

    // 添加评论
    addComment() { }

}

Component.register(CommentList)

export default CommentList
