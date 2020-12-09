define([], function () {

    return {
        text: '基础用法',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Tabs',
                        tabs: [
                            {
                                item: { text: 'Home' },
                                panel: {
                                    children: 'home content'
                                }
                            },
                            {
                                item: { text: 'Profile' },
                                panel: {
                                    children: 'profile content'
                                }
                            },
                            {
                                item: { text: 'Contact' },
                                panel: {
                                    children: 'contact content'
                                }
                            }
                        ]
                    }
                ]
            }
        }
    }

})