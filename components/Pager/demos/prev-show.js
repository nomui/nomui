define([], function () {
    return {
        title: '上一页下一页的显示与隐藏',
        file: 'prev-show',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Pager',
                        totalCount: 100,
                        prevShowAlways: false,
                        nextShowAlways: false,
                        onPageChange: function (e) {
                            e.sender.update(e)
                            console.log(e)
                        }
                    }
                ]
            };
        }
    };
});