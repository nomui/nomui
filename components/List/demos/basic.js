define([], function () {

    return {
        title: '基本用法',
        file: 'basic',
        demo: function () {
            return {
                component: 'List',
                gutter: 'md',
                items: [
                    { text: '飞狐外传' },
                    { text: '雪山飞狐' },
                    { text: '连城诀' },
                    { text: '天龙八部' },
                    { text: '射雕英雄传' },
                    { text: '白马啸西风' },
                    { text: '鹿鼎记' }
                ],
                itemDefaults: {
                    _config: function () {
                        this.setProps({
                            children: this.props.text
                        })
                    }
                }
            }
        }
    }

})