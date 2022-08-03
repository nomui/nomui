define([], function () {
    return {
        title: '自定义头像上传按钮样式',
        file: 'avatar',
        demo: function () {
            let avatarRef = null
            return {
                children: {
                    component: 'Uploader',
                    accept: 'image/*',
                    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
                    label: 'LOGO',
                    attrs: {
                        style: {
                            alignItems: 'center'
                        },
                    },
                    actionRender: () => {
                        return {
                            attrs: {
                                style: {
                                    position: 'relative',
                                    display: 'inline-block'
                                },
                            },
                            children: [{
                                ref: (c) => {
                                    avatarRef = c
                                },
                                attrs: {
                                    style: {
                                        width: '4rem',
                                        height: '4rem',
                                        lineHeight: '4rem',
                                    },
                                },
                                styles: {
                                    border: [true, 'primary'],
                                    padding: '1',
                                    shape: 'square',
                                },
                                component: 'Avatar',
                                text: '头像',
                                icon: 'plus',
                            },]
                        }
                    },
                    showList: false,
                    onChange: function ({ file, fileList }) {
                        const { originFile } = file
                        if (fileList && fileList.length > 0) {
                            if (fileList[0].status === 'done' && originFile && originFile instanceof File) {
                                const src = URL.createObjectURL(originFile)
                                avatarRef.update({ src, icon: null })
                            }
                        }

                    },
                },
            }
        },
    }
})
