define([], function () {
    return ({ drawer, modal, args }) => {
        const target = modal || drawer
        const { name, description } = args
        return {
            header: {
                caption: { title: name },
            },
            body: {
                children: description,
            },
            onOk: () => {
                target.close()
            },
        }
    }
})
