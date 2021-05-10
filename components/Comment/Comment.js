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
            // 存放被@的用户列表
            atUsers: [],
            onComment: () => { },
            onReply: () => { },
            onDeleted: () => { },
        }
        super(Component.extendProps(defaults, props), ...mixins)
    }

    _created() {
        this.replyTitle = ''
        this.commentUserModal = null
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
                                            this.addComment(val)
                                            onComment(val)
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
        this.replyTitle = ''
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
        this.replyTitle = target.author
        // this.handleSelectUser(target)
    }

    // 发表评论
    addComment(val) {
        this._list._addComment(this.replyTitle, val)
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
                    component: CommentEmoji,
                },
                closeOnClickOutside: true,
            })
        }
        sender[align].show()
    }

    // 打开@用户列表
    showUser(arg) {
        const align = 'top left'
        this.commentUserModal = arg.sender
        if (!this.commentUserModal[align]) {
            this.commentUserModal[align] = new nomui.Layer({
                align: align,
                alignTo: this.commentUserModal.element,
                alignOuter: true,
                children: {
                    component: CommentUser,
                    atUserLists: this.props.atUserLists,
                },
                onHide: function () {
                    document.onkeydown = null
                },
                closeOnClickOutside: true,

            })
        }
        this.commentUserModal[align].show()
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
                res += child.alt
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

    // 处理节点的删除
    handleDOMRemoved(e) {
        if (e.keyCode === 8) {
            // 获取输入框中的值
            const fullText = this.textarea.value.replace(/\n/g, "");
            // 获取光标位置
            const end = this.getCursortPosition(this.textarea);
            // 光标之前用户名最大可能长度的文本
            // const content = fullText.slice(end - this.maxLength, end);
            // 获取离光标最近的一个@的位置
            const lastAtIndex = fullText.lastIndexOf("@");
            if (lastAtIndex > -1) {
                // 如果存在 @
                const user = fullText
                    .slice(lastAtIndex, end)
                    .trim()
                    .replace(/@/, "");
                const index = this.props.atUsers.indexOf(user);
                if (index > -1) {
                    // 从@列表中删除被@的用户
                    this.props.atUsers.splice(index, 1);
                }
            }
        }
    }

    onPaste(e) {
        e.preventDefault();
        let text = "";

        if (window.clipboardData && window.clipboardData.setData) {
            // IE
            text = window.clipboardData.getData("text");
        } else {
            text = (e.originalEvent || e).clipboardData.getData("text/plain") || "";
        }
        // 过滤转义html标签
        text = text.replace(/</g, "&lt").replace(/>/g, "&gt");
        text = text.replace(/\r\n/g, "<br>");
        document.execCommand("insertHTML", false, text);
    }

    // 艾特用户
    handleSelectUser(target) {
        console.log(this.textareaRef, this.textareaRef.element, this.textareaRef.element.value)
        // 获取输入框中的值
        // const fullText = this.textareaRef.element.textContent.replace(/\n/g, "")
        // // 获取光标位置
        // const end = this.getCursortPosition(this.textareaRef.element)
        // // 获取离光标最近的一个@的位置
        // const lastAtIndex = fullText.lastIndexOf("@")
        // const offset = end - lastAtIndex
        // // 删除之前的内容
        // const range = window.getSelection().getRangeAt(0)
        // range.setStart(range.endContainer, range.endOffset - offset)
        // range.deleteContents()
        // 插入选中的user
        const input = `<button contenteditable="false" class="nom-comment-atbtn">@${target.author}&nbsp;</button>`
        this.insertHtmlAtCaret(input)
        // 添加用户
        if (!this.props.atUsers.includes(target.author)) {
            this.props.atUsers.push(target.author)
        }
        console.log(this.props.atUsers)
    }

}

Component.register(Comment)

export default Comment
