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
        this.commentCursortPosition = null
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
        this.textareaRef && this.textareaRef.element.focus()
        this.replyTitleRef.update({
            children: `回复 ${target.author}:`,

        })
        this.replyTitleRef.show()
        this.replyObj = target
    }

    // 发表评论
    addComment(commentItem) {
        this._list._addComment(commentItem)
    }

    // 打开emoji面板
    showEmoji(arg) {
        this.commentCursortPosition = this.getCursortPosition(this.textareaRef.element)
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
        this.commentCursortPosition = this.getCursortPosition(this.textareaRef.element)
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
    getCursortPosition(element) {
        let caretOffset = 0
        const doc = element.ownerDocument || element.document
        const win = doc.defaultView || doc.parentWindow
        let sel
        if (element.tagName === 'DIV') { // 谷歌、火狐
            sel = win.getSelection()
            if (sel.rangeCount > 0) { // 选中的区域
                const range = win.getSelection().getRangeAt(0)
                const preCaretRange = range.cloneRange() // 克隆一个选中区域
                preCaretRange.selectNodeContents(element) // 设置选中区域的节点内容为当前节点
                preCaretRange.setEnd(range.endContainer, range.endOffset)  // 重置选中区域的结束位置
                // caretOffset = preCaretRange.toString().length
                const tempElem = preCaretRange.cloneContents()
                caretOffset = this.getDomValue(tempElem).replace(/\n/g, '').length
            }
        } else { // IE
            caretOffset = element.selectionEnd
        }
        return caretOffset
    }

    // 设置光标位置
    setCursortPosition(textDom, pos) {
        if (textDom.setSelectionRange) {
            // IE Support
            textDom.focus()
            textDom.setSelectionRange(pos, pos)
        } else if (textDom.createTextRange) {
            // Firefox support
            const range = textDom.createTextRange()
            range.collapse(true)
            range.moveEnd('character', pos)
            range.moveStart('character', pos)
            range.select()
        }
    }

    _insertUser(userObj) {
        // console.log(this.textareaRef, this.textareaRef.element, this.textareaRef.element.value)

        // // 获取输入框中的值
        // const fullText = this.textareaRef.element.textContent.replace(/\n/g, '')
        // console.log(fullText.length)
        // // // 获取光标位置
        // const end = this.getCursortPosition(this.textareaRef.element)
        // // console.log(end)
        // this.setCursortPosition(this.textareaRef.element, end)

        this.textareaRef.element.focus()
        const button = `<button contenteditable="false" class="nom-comment-atbtn">@${userObj.author}</button>`
        this.insertHtmlAtCaret(button)
    }

    _closeUserModal() {
        this.userModal['top left'].hide()
    }

    _insertEmoji(val) {
        // TODO:需要获取光标原来的位置插入
        this.textareaRef.element.focus()
        const img = `<img class="nom-comment-emoji-img" src="${val}">`
        this.insertHtmlAtCaret(img)
    }

    _closeEmojiModal() {
        this.emojiModal['top left'].hide()
    }

}

Component.register(Comment)

export default Comment
