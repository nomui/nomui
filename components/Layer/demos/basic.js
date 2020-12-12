define([], function () {
    return {
        title: '基本用法',
        file: 'basic',
        demo: function () {
            var view = this;
            return {
                children: [
                    {
                        component: 'Button',
                        text: '隐藏',
                        attrs: {
                            onclick: function () {
                                view.refs.layer.hide();
                            }
                        }
                    },
                    {
                        component: 'Button',
                        text: '显示',
                        attrs: {
                            onclick: function () {
                                view.refs.layer.show();
                            }
                        }
                    },
                    {
                        component: 'Layer',
                        ref: 'layer',
                        children: '我是层内容，只有显示、隐藏的行为，不定位，不设置大小，不额外设置内容，且已经在dom中。'
                    }
                ]
            };
        }
    }
});