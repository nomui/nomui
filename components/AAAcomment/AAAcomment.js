import Component from '../Component/index'

class AAAcomment extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            commentList: [
                {
                    author: '葫芦娃',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: '我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃我是葫芦娃',
                    datetime: '/Date(1489368353683)/',
                    reply: {} // 回复时，别人的留言,
                },
                {
                    author: '红孩儿',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: '你真的是葫芦娃',
                    datetime: '/Date(1489368353683)/',
                    reply: {
                        deleted: false,
                        author: '葫芦娃',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: '我是葫芦娃',
                        datetime: '/Date(1489368353683)/',
                    },
                },
                {
                    author: '红孩儿',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: '666',
                    datetime: '/Date(1489368353683)/',
                    reply: {
                        deleted: true,
                        author: '齐天大圣',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: '',
                        datetime: '',
                    },
                },
            ],
        }
        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        const { commentList } = this.props
        const object_list = this.getList(commentList)
        this.setProps({
            children: object_list,
        })
    }

    // 列表
    getList(arry) {
        const _that = this
        return arry.map(function (currentValue) {
            const list = {
                children: [
                    {
                        classes: {
                            'nom-comment-list': true,
                        },
                        children: {
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
                                            },
                                        },
                                        {
                                            tag: 'a',
                                            children: '回复',
                                            classes: {
                                                'nom-comment-action-btn': true,
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                ],
            }
            if (_that.isReply(currentValue.reply)) {
                if (!currentValue.reply.deleted) {
                    list.children.push({
                        classes: {
                            'nom-comment-list': true,
                            'nom-comment-reply': true,
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
                                            },
                                        },
                                        {
                                            tag: 'a',
                                            children: '回复',
                                            classes: {
                                                'nom-comment-action-btn': true,
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
                            'nom-comment-list': true,
                            'nom-comment-reply': true,
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
}

Component.register(AAAcomment)

export default AAAcomment
