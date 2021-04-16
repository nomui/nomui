define([], function () {
    return {
        title: '拉伸高度',
        file: 'fit',
        description: '设置 `fit` 为 `true`，会让 tabs 拉伸充满父容器的高度，同时选项内容超过高度时出现滚动条。',
        demo: function () {
            return {
                attrs: {
                    style: {
                        height: '200px'
                    }
                },
                children: [
                    {
                        component: 'Tabs',
                        uistyle: 'card',
                        fit: true,
                        tabs: [
                            {
                                item: { text: 'Home' },
                                panel: {
                                    children: `Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                                    
                                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                                    
                                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                    
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                                    
                                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                                    
                                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                            
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                                    
                                    Aenean lacinia bibendum nulla sed consectetur.`
                                },
                            },
                            {
                                item: { text: 'Profile' },
                                panel: {
                                    children: 'profile content',
                                },
                            },
                            {
                                item: { text: 'Contact' },
                                panel: {
                                    children: 'contact content',
                                },
                            },
                        ],
                    },
                ],
            }
        },
    }
})
