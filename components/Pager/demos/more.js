define([], function () {
    return {
        title: '更多用法',
        file: 'more',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Pager',
                        totalCount: 1000,
                        pageIndex: 3,
                        pageSize: 20,
                        displayItemCount: 6,
                        edgeItemCount: 2,
                        prevShowAlways: false,
                        nextShowAlways: false,
                        texts: {
                            prev: '上一页',
                            next: '下一页',
                            ellipse: '...',
                        },
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