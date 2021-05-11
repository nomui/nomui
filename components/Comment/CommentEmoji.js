import Component from '../Component/index';

class CommentEmoji extends Component {
    constructor(props, ...mixins) {
        const defaults = {}
        super(Component.extendProps(defaults, props), ...mixins)
    }

    _created() {
        this.emojiArry = []
        this.initEmoji()
    }

    _config() {
        const listArry = this.getList(this.emojiArry)
        this.setProps(
            {
                tag: 'ul',
                children: listArry,
                onClick: (e) => {
                    this.selectEmoji(e)
                },
            }
        )
    }

    initEmoji() {
        // const src = `${location.protocol}//${location.host}/Assets/img/comment/`
        const src = 'http://www.wetrial.vip:8080/Assets/img/comment/'
        for (let i = 0; i < 105; i++) {
            const emojiObj = {}
            emojiObj.src = `${src}png/${i}.png`
            emojiObj._src = `${src}gif/${i}.gif`
            this.emojiArry.push(emojiObj)
        }
    }

    getList(arry) {
        return arry.map(function (item) {
            return {
                classes: {
                    'nom-comment-emoji-item': true,
                },
                tag: 'li',
                children: {
                    tag: 'img',
                    attrs: {
                        'data-src': item._src,
                        src: item.src,
                    },
                },
            }
        })
    }

    selectEmoji(e) {
        const emoji = e.event.target
        if (emoji.nodeName === 'IMG') {
            this.closeEmojiModal()
            this._comment._insertEmoji(emoji.dataset.src)
        }
    }

    closeEmojiModal() {
        this._comment._closeEmojiModal()
    }

}

Component.register(CommentEmoji)

export default CommentEmoji
