define([], function () {

    return {
        title: '所有图标',
        file: 'all-icons',
        demo: function () {
            let icons = Object.keys(nomui.Icon.svgs)

            console.log(icons)

            function getItems(icons) {
                return icons.map(function (icon) {
                    return { iconType: icon }
                })
            }

            return {
                children: [
                    {
                        items: getItems(icons),
                        styles: {
                            lines: 'cross'
                        }
                    }
                ],
                childDefaults: {
                    component: 'List',
                    styles: {
                        flex: 'row-wrap',
                        cols: '6',
                        lines: 'grid'
                    },
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
                                        color: 'lprimary'
                                    }
                                }
                            })
                        }
                    },
                },
            }
        }
    }
})