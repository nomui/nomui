define([], function () {
    return {
        title: '弹出其他视图',
        file: 'view',
        description:
            '当 `content` 配置的值为字符串时，代表一个指向某个 js 模块（视图）的 url，当模态框的内容比较复杂或者可多处复用时，将抽屉内容分离到独立的 js 模块是一个好的代码实践，这样组件的内容低耦合高内聚，方便维护。独立出来的 js 模块返回一个函数，函数的参数是一个对象`{ drawer, args }` 其中 `drawer` 是抽屉组件自身的实例，`args` 是组件调用方传递的参数（通过 args prop）。',
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
                                text: '笑傲江湖',
                                attrs: {
                                    onclick: function () {
                                        new nomui.Drawer({
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
