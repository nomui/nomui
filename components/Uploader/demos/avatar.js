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
                    actionRender: {
                        classes: {
                            'upload-img-button': true,
                        },
                        children: [{
                            ref: (c) => {
                                avatarRef = c
                            },
                            styles: {
                                border: [true, 'primary'],
                                padding: '1',
                                shape: 'square',
                            },
                            component: 'Avatar',
                            text: '头像',
                            icon: 'plus',
                            size: 'xlarge',
                        },]
                    },
                    showList: false,
                    onRemove: {
                        action: () => {
                            return new Promise((resolve) => {
                                avatarRef.update({ src: null, icon: 'plus' })
                                resolve(true)
                            })
                        },
                    },
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
