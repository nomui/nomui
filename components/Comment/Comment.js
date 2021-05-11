import Component from '../Component/index'
import CommentEmoji from './CommentEmoji'
import CommentList from './CommentList'
import CommentUser from './CommentUser'

class Comment extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            author: '',
            avatar: '',
            userId: '',
            onComment: () => { },
            onDeleted: () => { },
        }
        super(Component.extendProps(defaults, props), ...mixins)
    }

    _created() {
        this.replyObj = {}
        this.userModal = null
        this.emojiModal = null
        this.lastEditRange = null
    }

    _config() {
        const { onComment, commentItem } = this.props

        this.setProps(
            {
                children: [
                    {
                        ref: (c) => {
                            this.listRef = c
                        },
                        component: CommentList,
                        commentItem,
                    },
                    {
                        classes: {
                            'nom-comment-body': true,
                        },
                        children: [
                            {
                                ref: (c) => {
                                    this.replyTitleRef = c
                                },
                                tag: 'span',
                                classes: {
                                    'nom-comment-title': true,
                                },
                                autoRender: false,
                                children: '',
                                onClick: () => {
                                    this.closeReply()
                                },
                            },
                            {
                                ref: (c) => {
                                    this.textareaRef = c
                                },
                                tag: 'div',
                                classes: {
                                    'nom-comment-textarea': true,
                                },
                                attrs: {
                                    contenteditable: true,
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
                                            'nom-comment-icon-emoji': true,
                                        },
                                        component: 'Icon',
                                        type: 'smile',
                                        onClick: (arg) => {
                                            this.showEmoji(arg)
                                        },
                                    },
                                    {
                                        classes: {
                                            'nom-comment-icon-user': true,
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
                                            const val = this.getDomValue(this.textareaRef.element).replace(/^\n/, "").replace(/\n$/, "")
                                            if (val.trim().length === 0) {
                                                new nomui.Message({
                                                    content: '请输入评论内容',
                                                    type: 'info',
                                                    duration: 2.5,
                                                })
                                                return false
                                            }
                                            onComment(this.replyObj, this.getCommentValue(this.textareaRef.element))
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

    _rendered() {
        this.init()
    }

    init() {
        const _that = this
        this.textareaRef.element.addEventListener('input', function () {
            const rang = window.getSelection().getRangeAt(0).endOffset
            _that.lastEditRange = rang
            console.log(rang)
        })
        this.textareaRef.element.addEventListener('click', function () {
            const rang = window.getSelection().getRangeAt(0).endOffset
            _that.lastEditRange = rang
            console.log(rang)
        })
        this.textareaRef.element.addEventListener('keyup', function () {
            const rang = window.getSelection().getRangeAt(0).endOffset
            _that.lastEditRange = rang
            console.log(rang)
        })
    }

    // 取消回复
    closeReply() {
        this.replyTitleRef.hide()
        this.replyObj = {}
    }

    // 文本域获得焦点
    _textareaFocus(key) {
        const target = this.props.commentItem.find(function (currentValue) {
            return currentValue.key === key
        })
        // this.textareaRef.element.focus()
        this.replyTitleRef.update({
            children: `回复 ${target.author}:`,

        })
        this.replyTitleRef.show()
        this.replyObj = target
        this.keepLastIndex(this.textareaRef.element)
    }

    // 发表评论
    addComment(commentItem) {
        this._list._addComment(commentItem)
    }

    // 打开emoji面板
    showEmoji(arg) {
        console.log(this.lastEditRange)
        const align = 'top left'
        const _that = this
        this.emojiModal = arg.sender
        if (!this.emojiModal[align]) {
            this.emojiModal[align] = new nomui.Layer({
                align: align,
                alignTo: this.emojiModal.element,
                alignOuter: true,
                children: {
                    component: CommentEmoji,
                    _created() {
                        this._comment = _that;
                    },
                },
                closeOnClickOutside: true,
            })
        }
        this.emojiModal[align].show()
    }

    // 打开@用户列表
    showUser(arg) {
        console.log(this.lastEditRange)
        const align = 'top left'
        const _that = this
        this.userModal = arg.sender
        if (!this.userModal[align]) {
            this.userModal[align] = new nomui.Layer({
                align: align,
                alignTo: this.userModal.element,
                alignOuter: true,
                children: {
                    component: CommentUser,
                    _created() {
                        this._comment = _that;
                    },
                    atUserLists: this.props.atUserLists,
                },
                onHide: function () {
                    document.onkeydown = null
                },
                closeOnClickOutside: true,

            })
        }
        this.userModal[align].show()
    }

    getCommentValue(elem) {
        const res = []
        Array.from(elem.childNodes).forEach((child) => {
            if (child.nodeName === '#text') {
                res.push({
                    type: 'text',
                    content: child.nodeValue,
                })
            } else if (child.nodeName === 'BR') {
                res.push({
                    type: 'BR',
                    content: '\n',
                })
            } else if (child.nodeName === 'BUTTON') {
                res.push({
                    type: 'BUTTON',
                    content: this.getDomValue(child).replace(/^\n/, '').replace(/\n$/, '').replace(/@/, ''),
                })
            } else if (child.nodeName === 'IMG') {
                res.push({
                    type: 'IMG',
                    content: child.src,
                })
            } else if (child.nodeName === 'DIV') {
                res.push({
                    type: 'DIV',
                    content: `\n${this.getDomValue(child)}`,
                })
            }
        })
        return res
    }

    // 获取目标节点的纯文本内容
    // 这里只涉及到了之后可能会用到的一些节点
    getDomValue(elem) {
        let res = ''
        Array.from(elem.childNodes).forEach((child) => {
            if (child.nodeName === '#text') {
                res += child.nodeValue
            } else if (child.nodeName === 'BR') {
                res += '\n'
            } else if (child.nodeName === 'BUTTON') {
                res += this.getDomValue(child)
            } else if (child.nodeName === 'IMG') {
                res += child.src
            } else if (child.nodeName === 'DIV') {
                res += `\n${this.getDomValue(child)}`
            }
        })
        return res
    }

    // 往光标位置插入HTML片段
    insertHtmlAtCaret(html) {
        let sel, range, frag
        if (window.getSelection) {
            sel = window.getSelection()
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0)
                range.deleteContents()
                const el = document.createElement('div')
                el.innerHTML = html
                frag = document.createDocumentFragment()
                let node
                let lastNode
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node)
                }
                range.insertNode(frag)
                if (lastNode) {
                    range = range.cloneRange()
                    range.setStartAfter(lastNode)
                    range.collapse(true)
                    sel.removeAllRanges()
                    sel.addRange(range)
                }
            }
        }
    }

    // 获取光标位置
    getCursortPosition() {
        return window.getSelection().getRangeAt(0).endOffset
    }

    // 设置光标位置
    setFocusFun(ele, focusOffset) {
        const sel = window.getSelection()
        const rang = document.createRange()// 创建一个rang对象
        const content = ele.firstChild
        rang.setStart(content, 0)
        rang.setEnd(content, focusOffset)
        rang.collapse(false)// 起始位置和终止位置是否相同的布尔值
        sel.removeAllRanges()// 移除选中区域的range对象
        sel.addRange(rang)// 给选中区域添加range对象
    }

    // 光标移至最后
    keepLastIndex(obj) {
        if (window.getSelection) {// ie11 10 9 ff safari
            obj.focus() // 解决ff不获取焦点无法定位问题
            const range = window.getSelection()// 创建range
            range.selectAllChildren(obj)// range 选择obj下所有子内容
            range.collapseToEnd()// 光标移至最后
        }
        else if (document.selection) {// ie10 9 8 7 6 5
            const range = document.selection.createRange()// 创建选择对象
            // var range = document.body.createTextRange();
            range.moveToElementText(obj)// range定位到obj
            range.collapse(false)// 光标移至最后
            range.select()
        }
    }

    _insertUser(userObj) {
        // TODO:需要获取光标原来的位置插入
        console.log(this.lastEditRange)
        this.setFocusFun(this.textareaRef.element, this.lastEditRange)
        // this.textareaRef.element.focus()
        const button = `<button contenteditable="false" class="nom-comment-atbtn">@${userObj.author}</button>`
        this.insertHtmlAtCaret(button)
    }

    _closeUserModal() {
        this.userModal['top left'].hide()
    }

    _insertEmoji(val) {
        // TODO:需要获取光标原来的位置插入
        console.log(this.lastEditRange)
        this.setFocusFun(this.textareaRef.element, this.lastEditRange)
        // this.textareaRef.element.focus()
        const img = `<img class="nom-comment-emoji-img" src="${val}">`
        this.insertHtmlAtCaret(img)
    }

    _closeEmojiModal() {
        this.emojiModal['top left'].hide()
    }

}

Component.register(Comment)

export default Comment
