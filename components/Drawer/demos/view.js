define([], function () {
    return {
        title: '弹出其他视图',
        file: 'view',
        description: '抽屉组件内容引用其他视图的用法与Modal组件一致，唯一区别是组件实例参数名为drawer，因此开发者可以通过一个外部js同时支持Modal与Drawer的调用。',
        demo: function () {
            return {
                component: 'Flex',
                gap: 'small',
                rows: [
                    {
                        children: '金庸小说介绍',
                    },
                    {
                        gap: 'small',
                        cols: [
                            {
                                component: 'Button',
                                name: 'button',
                                text: '抽屉打开',
                                attrs: {
                                    onclick: function () {
                                        new nomui.Drawer({
                                            content: 'components/Drawer/demos/view-content.js',
                                            width: '30vw',
                                            args: {
                                                name: '笑傲江湖',
                                                description:
                                                    '《笑傲江湖》是中国现代作家金庸创作的一部长篇武侠小说，开始创作于1967年并连载于《明报》，1969年完成。这部小说通过叙述华山派大弟子令狐冲的江湖经历，反映了武林各派争霸夺权的历程。作品没有设置时代背景，“类似的情景可以发生在任何朝代”，折射出中国人独特的政治斗争状态，同时也表露出对斗争的哀叹，具有一定的政治寓意。小说情节跌宕起伏，波谲云诡，人物形象个性鲜明，生动可感。',
                                            },
                                        })
                                    },
                                },
                            },
                            {
                                component: 'Button',
                                name: 'button',
                                text: '模态框打开',
                                attrs: {
                                    onclick: function () {
                                        new nomui.Modal({
                                            content: 'components/Drawer/demos/view-content.js',
                                            width: '50vw',
                                            args: {
                                                name: '笑傲江湖',
                                                description:
                                                    '《笑傲江湖》是中国现代作家金庸创作的一部长篇武侠小说，开始创作于1967年并连载于《明报》，1969年完成。这部小说通过叙述华山派大弟子令狐冲的江湖经历，反映了武林各派争霸夺权的历程。作品没有设置时代背景，“类似的情景可以发生在任何朝代”，折射出中国人独特的政治斗争状态，同时也表露出对斗争的哀叹，具有一定的政治寓意。小说情节跌宕起伏，波谲云诡，人物形象个性鲜明，生动可感。',
                                            },
                                        })
                                    },
                                },
                            },

                        ],
                    },
                ],
            }
        },
    }
})
