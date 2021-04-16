import Component from '../Component/index'
import { isFunction } from '../util/index'
import { getDate, getFileSize } from './helper'

class FileItem extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      disabled: false,
      file: null,
    }
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { file, onRemove, extraAction } = this.props
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
            ? this.renderUploadedFile(file)
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

      const actions = []
      if (onRemove) {
        actions.push({
          tag: 'a',
          children: onRemove.text || '删除',
          attrs: {
            href: 'javascript:void(0)',
            onclick: (e) => {
              e.preventDefault()
              status !== 'removing' && onRemove.action(e, file)
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
                e.preventDefault()
                isFunction(action) && action(e, file)
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
                                // attrs: {
                                //   href: 'javascript:void(0)',
                                //   onclick: (e) => {
                                //     e.preventDefault()
                                //     if (isFunction(onPreview)) onPreview(file)
                                //   },
                                // },
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
                        classes: {
                          'upload-opt-btn': true,
                          'upload-opt-removing': status === 'removing',
                        },
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
    // const { name } = file
    const renderer = this.props.renderer
    if (isFunction(renderer)) {
      return {
        ...renderer(file),
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
    // const suffix = getFileExtension(name)
    // if (fileType.has(suffix)) {
    //   return {
    //     component: 'Icon',
    //     type: suffix,
    //     classes: {
    //       'file-img': true,
    //     },
    //   }
    // }
    // return {
    //   component: 'Icon',
    //   type: 'default',
    //   classes: {
    //     'file-img': true,
    //   },
    // }
  }
}

export default FileItem
