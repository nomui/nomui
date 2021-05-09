import Component from '../Component/index'
import UserList from './UserList'

class Comment extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            author: '',
            avatar: '',
            submitComment: () => { },
        }
        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        const { submitComment, commentItem, author, avatar } = this.props
        let refTextarea = null
        let refCommentList = null

        this.setProps(
            {
                children: [
                    {
                        ref: (c) => {
                            refCommentList = c
                        },
                        component: 'CommentList',
                        commentItem,
                        // commentItem: [
                        //     {
                        //         author: '葫芦娃',
                        //         avatar: '',
                        //         content: '我是葫芦娃',
                        //         datetime: '/Date(1489368353683)/',
                        //         repbtn: true,
                        //         delbtn: false,
                        //         reply: {},
                        //         onReply: () => {
                        //             refTextarea.element.focus()
                        //             refTextarea.element.setAttribute("placeholder", '回复 葫芦娃:')
                        //         },
                        //         onDeleted: () => { },
                        //     }
                        // ],
                    },
                    {
                        classes: {
                            'nom-comment-body': true,
                        },
                        children: [
                            {
                                ref: (c) => {
                                    refTextarea = c
                                },
                                tag: 'textarea',
                                classes: {
                                    'nom-comment-textarea': true,
                                },
                                attrs: {
                                    rows: 4,
                                    placeholder: '留下你的评论吧',
                                },
                                children: '',
                            },
                            {
                                classes: {
                                    'nom-comment-bottom': true,
                                },
                                children: [
                                    {
                                        classes: {
                                            'nom-comment-emoji': true,
                                        },
                                        component: 'Icon',
                                        type: 'smile',
                                        onClick: (arg) => {
                                            this.showEmoji(arg)
                                        },
                                    },
                                    {
                                        classes: {
                                            'nom-comment-user': true,
                                        },
                                        children: '@',
                                        onClick: (arg) => {
                                            this.showUser(arg)
                                        },
                                    },
                                    {
                                        classes: {
                                            'nom-comment-submit': true,
                                        },
                                        component: 'Button',
                                        text: '发表评论',
                                        type: 'primary',
                                        onClick: () => {
                                            this.submitReply(author, avatar, refTextarea, refCommentList)
                                            submitComment()
                                        },
                                    },
                                ]
                            }
                        ]
                    },
                ],
            }
        )


    }

    // 发表评论
    submitReply(author, avatar, refTextarea, refCommentList) {
        // console.log(author, avatar, refTextarea, refCommentList, new Date().format('yyyy-MM-dd hh:mm'))
        refCommentList.addComment(author, avatar, refTextarea)
    }

    // 打开emoji面板
    showEmoji(arg) {
        const align = 'top left'
        const sender = arg.sender
        if (!sender[align]) {
            sender[align] = new nomui.Layer({
                align: align,
                alignTo: sender.element,
                alignOuter: true,
                children: {
                    styles: {
                        padding: '1',
                        color: 'white',
                        border: '1px',
                    },
                    children: '我是层内容',
                },
                closeOnClickOutside: true,
            })
        }

        sender[align].show()
    }

    // 打开@用户列表
    showUser(arg) {
        const align = 'top left'
        const sender = arg.sender
        if (!sender[align]) {
            sender[align] = new nomui.Layer({
                align: align,
                alignTo: sender.element,
                alignOuter: true,
                children: {
                    styles: {
                        padding: '1',
                        color: 'white',
                        border: '1px',
                    },
                    children: {
                        component: UserList,
                    },
                },
                closeOnClickOutside: true,
            })
        }

        sender[align].show()
    }


}

Component.register(Comment)

export default Comment
