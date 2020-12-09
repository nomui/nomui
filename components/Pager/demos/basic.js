define([], function () {
    return {
        text: '基础用法',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Pager',
                        totalCount: 100,
                        events: {
                            pageChange: function (params) {
                                this.update(params);
                            }
                        }
                    }
                ]
            };
        }
    };
});