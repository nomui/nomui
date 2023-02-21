import Component from '../Component/index'
import { isFunction, isNullish } from '../util/index'
import { getDate, getFileSize } from './helper'

class FileItem extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(FileItem.defaults, props), ...mixins)
  }

  _created() {
    this._uploader = this.parent.parent.parent.parent
  }

  _config() {
    const that = this
    const { file, onRemove, allowUpdate, extraAction, customizeInfo } = this.props
    const { uuid, status } = file

    const _info = isFunction(customizeInfo)
      ? customizeInfo(file)
      : this._handleDefaultCustomizeInfo(file)

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
              status !== 'removing' && onRemove.action({ sender: that._uploader, file })
            },
          },
        })
      }

      if (allowUpdate) {
        actions.push({
          tag: 'a',
          children: '更新',
          onClick() {
            that._uploader._handleUpdate({ file })
          },
        })
      }

      if (Array.isArray(extraAction) && extraAction.length > 0) {
        extraAction.forEach(({ text, action }) => {
          const children = isFunction(text) ? text(file) : text
          if (!isNullish(children)) {
            actions.push({
              tag: 'a',
              children,
              attrs: {
                href: 'javascript:void(0)',
                onclick: (e) => {
                  e.preventDefault()
                  isFunction(action) && action({ sender: that._uploader, file })
                },
              },
            })
          }
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
                    // tag: 'div',
                    _config() {
                      this.setProps({
                        children: _info,
                      })
                    },
                  },
                  {
                    // tag: 'div',
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
      type: 'file',
      classes: {
        'file-img': true,
      },
    }
  }

  _handleDefaultCustomizeInfo(file) {
    if (!file) return null
    const { name, size, uploadTime } = file
    return [
      {
        tag: 'span',
        children: [
          {
            tag: 'a',
            children: name,
            classes: { 'upload-file-name': true },
          },
        ],
      },
      {
        tag: 'span',
        children: getFileSize(size),
      },
      {
        tag: 'span',
        children: `更新日期 : ${getDate(uploadTime) ? getDate(uploadTime) : 'NA'}`,
        classes: {
          'upload-file-update': true,
          'u-border-left ': true,
        },
      },
    ]
  }
}

FileItem.defaults = {
  disabled: false,
  file: null,
}

export default FileItem
