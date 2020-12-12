define([], function () {
    return {
        title: '基础用法',
        file: 'basic',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Pager',
                        totalCount: 100,
                        events: {
                            pageChange: function (params) {
                                if (!params.isInit) {
                                    this.update(params);
                                }
                            }
                        }
                    }
                ]
            };
        }
    };
});