define([], function () {
    return ({ drawer, args }) => {
        const { name, description } = args
        return {
            header: {
                caption: { title: name },
            },
            body: {
                children: description,
            },
            onOk: () => {
                drawer.close()
            },
        }
    }
})
