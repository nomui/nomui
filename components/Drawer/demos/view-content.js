define([], function () {
    return ({ drawer, modal, args }) => {
        const target = modal || drawer
        console.log(target) // 抽屉实例参数名是drawer，模态框是modal
        const { name, description } = args
        return {
            header: {
                caption: { title: name },
            },
            body: {
                children: description,
            },
        }
    }
})
