define([], function () {

    return {
        title: '界面风格',
        file: 'uistyle',
        demo: function () {
            function getPanel(uistyle) {
                return {
                    component: 'Panel',
                    uistyle: uistyle,
                    header: {
                        caption: {
                            title: uistyle
                        }
                    },
                    body: {
                        children: '部件内容'
                    }
                }
            }
            function getPanels(...uistyles) {
                return uistyles.map(item => {
                    return getPanel(item)
                })
            }

            return {
                component: 'List',
                cols: 2,
                gutter: 'md',
                items: getPanels('plain', 'bordered', 'card', 'splitline', 'outline', 'default')
            }
        }
    }

})