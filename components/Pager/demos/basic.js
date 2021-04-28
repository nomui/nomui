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
                        pageIndex: 1,
                        displayItemCount: 5,
                        edgeItemCount: 1,
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