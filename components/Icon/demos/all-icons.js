define([], function () {

    return {
        title: '所有图标',
        file: 'all-icons',
        demo: function () {
            var navigationIcons = [
                'arrow-up', 'arrow-right', 'arrow-down', 'arrow-left',
                'upward', 'forward', 'downward', 'back',
                'caret', 'menu', 'apps', 'more-horiz', 'more-vert'
            ];

            var actionIcons = [
                'resize-horiz', 'resize-vert', 'plus', 'minus',
                'close', 'check', 'stop', 'shutdown',
                'refresh', 'search', 'flag', 'bookmark', 'edit', 'delete', 'share', 'download', 'upload', 'copy'
            ];

            var objectIcons = [
                'audio', 'mail', 'person', 'message',
                'photo', 'time', 'location', 'link',
                'emoji'
            ]

            function getItems(icons) {
                return icons.map(function (icon) {
                    return { iconType: icon }
                })
            }

            return {
                children: [
                    {
                        items: getItems(navigationIcons),
                        styles: {
                            lines: 'cross'
                        }
                    },
                    {
                        items: getItems(actionIcons)
                    },
                    {
                        items: getItems(objectIcons)
                    }
                ],
                childDefaults: {
                    component: 'List',
                    itemDefaults: {
                        _config() {
                            this.setProps({
                                children: [
                                    {
                                        component: 'Icon',
                                        type: this.props.iconType
                                    },
                                    {
                                        children: this.props.iconType
                                    }
                                ],
                                styles: {
                                    padding: '1',
                                    text: 'center',
                                    hover: {
                                        bg: 'lprimary'
                                    }
                                }
                            })
                        }
                    },
                    styles: {
                        flex: 'row-wrap',
                        cols: '6',
                        lines: 'grid'
                    }
                },
                styles: {
                    flex: 'column',
                    gap: 'md',
                    margins: 'x'
                }
            }
        }
    }
})