import Component from '../Component/index'
import { isFunction } from '../util/index'
import { fileType, getDate, getFileExtension, getFileSize } from './helper'

class FileItem extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      disabled: false,
      file: null,
    }
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { file, onPreview, onRemove, onDownload, extraAction } = this.props
    const { name, size, uploadTime, uuid, status } = file

    if (uuid) {
      let imgDisplay = {}
      if (status === 'error') {
        imgDisplay = {
          children: [
            {
              component: 'Icon',
              type: 'file-error',
              classes: {
                'file-img': true,
              },
            },
          ],
        }
      } else {
        imgDisplay =
          status === 'done'
            ? // ? { tag: 'img', attrs: { src: URL.createObjectURL(file) } }
              this.renderUploadedFile(file)
            : {
                children: [
                  {
                    component: 'Icon',
                    type: 'loading',
                    classes: {
                      'file-img': true,
                    },
                  },
                ],
              }
      }

      const actions = [
        {
          tag: 'a',
          children: '删除',
          attrs: {
            href: 'javascript:void(0)',
            onclick: () => onRemove(file),
          },
        },
        {
          tag: 'a',
          children: '下载',
          attrs: {
            href: 'javascript:void(0)',
            onclick: () => {
              if (isFunction(onDownload)) {
                onDownload(file)
              } else if (file.url) {
                window.open(file.url)
              }
            },
          },
        },
      ]

      if (onPreview) {
        actions.push({
          tag: 'a',
          children: '预览',
          attrs: {
            href: 'javascript:void(0)',
            onclick: (e) => {
              e.preventDefault()
              if (isFunction(onPreview)) onPreview(file)
            },
          },
        })
      }

      if (Array.isArray(extraAction) && extraAction.length > 0) {
        extraAction.forEach(({ text, action }) => {
          actions.push({
            tag: 'a',
            children: text,
            attrs: {
              href: 'javascript:void(0)',
              onclick: (e) => {
                if (isFunction(action)) {
                  e.preventDefault()
                  action(file)
                }
              },
            },
          })
        })
      }

      this.setProps({
        tag: 'div',
        children: [
          {
            tag: 'div',
            _config() {
              this.setProps({
                children: [
                  {
                    ...imgDisplay,
                  },
                ],
              })
              this.setProps({
                classes: { 'upload-img-container': true },
              })
            },
          },
          {
            tag: 'div',
            _config() {
              this.setProps({
                children: [
                  {
                    tag: 'div',
                    _config() {
                      this.setProps({
                        children: [
                          {
                            tag: 'span',
                            children: [
                              {
                                tag: 'a',
                                children: name,
                                _config() {
                                  this.setProps({
                                    classes: { 'upload-file-name': true },
                                  })
                                },
                                attrs: {
                                  href: 'javascript:void(0)',
                                  onclick: (e) => {
                                    e.preventDefault()
                                    if (isFunction(onPreview)) onPreview(file)
                                  },
                                },
                              },
                            ],
                          },
                          {
                            tag: 'span',
                            children: getFileSize(size),
                          },
                          {
                            tag: 'span',
                            children: `更新日期 : ${
                              getDate(uploadTime) ? getDate(uploadTime) : 'NA'
                            }`,
                            _config() {
                              this.setProps({
                                classes: {
                                  'upload-file-update': true,
                                  'u-border-left ': true,
                                },
                              })
                            },
                          },
                        ],
                      })
                    },
                  },
                  {
                    tag: 'div',
                    _config() {
                      this.setProps({
                        classes: { 'upload-opt-btn': true },
                      })
                    },
                    children: actions,
                  },
                ],
              })
              this.setProps({
                classes: { 'upload-info-container': true },
              })
            },
          },
        ],
      })

      this.setProps({
        classes: {
          'u-flex-row': true,
        },
      })
    }
  }

  renderUploadedFile(file) {
    const { name } = file
    const suffix = getFileExtension(name)
    if (fileType.has(suffix)) {
      return {
        component: 'Icon',
        type: suffix,
        classes: {
          'file-img': true,
        },
      }
    }
    return {
      component: 'Icon',
      type: 'default',
      classes: {
        'file-img': true,
      },
    }
  }
}

export default FileItem
