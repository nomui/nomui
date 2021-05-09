import CommentList from '../CommentList/index'
import Component from '../Component/index'

class Comment extends CommentList {
    constructor(props, ...mixins) {
        const defaults = {
            submitComment: () => { },
        }
        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        const { submitComment, commentItem } = this.props
        let refTextarea = null
        this.setProps(
            {
                children: [
                    {
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
                                    placeholder: '发表评论',
                                },
                                children: '',
                            },
                            {
                                classes: {
                                    'nom-comment-footer': true,
                                },
                                children: [
                                    {
                                        classes: {
                                            'nom-comment-emoji': true,
                                        },
                                        component: 'Icon',
                                        type: 'smile',
                                        onClick: () => {
                                            this.showEmoji()
                                        },
                                    },
                                    {
                                        classes: {
                                            'nom-comment-user': true,
                                        },
                                        children: '@',
                                        onClick: () => {
                                            this.showUser()
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
                                            this.submitReply(refTextarea)
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
    submitReply(refTextarea) {
        console.log(refTextarea.element.value, refTextarea.element.placeholder)
    }

    // 打开emoji面板
    showEmoji() { }

    // 打开@用户列表
    showUser() { }


}

Component.register(Comment)

export default Comment
