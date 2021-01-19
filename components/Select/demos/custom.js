define([], function () {
    return {
        title: '自定义选项及选中项的呈现',
        file: 'custom',
        demo: function () {
            return {
                component: 'Rows',
                items: [
                    {
                        component: 'Select',
                        options: [
                            { color: '#5484ED', vlaue: 1 },
                            { color: '#A4BDFC', vlaue: 2 },
                            { color: '#7AE7BF', vlaue: 3 },
                            { color: '#51B749', vlaue: 4 },
                            { color: '#FBD75B', vlaue: 5 }
                        ],
                        optionDefaults: {
                            _config: function () {
                                const { color } = this.props
                                this.setProps({
                                    attrs: {
                                        style: {
                                            height: '30px',
                                            backgroundColor: color
                                        }
                                    },
                                    styles: {
                                        margin: '1'
                                    }
                                })
                            }
                        },
                        selectedSingle: {
                            _config: function () {
                                const { option } = this.props
                                if (option) {
                                    this.setProps({
                                        attrs: {
                                            style: {
                                                height: '20px',
                                                backgroundColor: option.color
                                            }
                                        },
                                    })
                                }
                            }
                        }
                    },
                    {
                        component: 'Select',
                        multiple: true,
                        placeholder: '选择你喜欢的作者',
                        options: [
                            {
                                text: '小李',
                                value: 0,
                            },
                            {
                                text: '小张',
                                value: 1,
                            },
                            {
                                text: '小王',
                                value: 2,
                            },
                            {
                                text: '小吴',
                                value: 3,
                            },
                        ],
                        optionDefaults: {
                            _config: function () {
                                const { text } = this.props
                                this.setProps({
                                    children: {
                                        component: 'Avatar',
                                        text: text
                                    }
                                })
                            }
                        },
                        selectedMultiple: {
                            itemDefaults: {
                                _config: function () {
                                    const { option } = this.props
                                    if (option) {
                                        this.setProps({
                                            children: {
                                                component: 'Avatar',
                                                text: option.text
                                            }
                                        })
                                    }
                                }
                            }
                        }
                    },
                ],
            }
        },
    }
})
