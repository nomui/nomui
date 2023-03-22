import Component from '../Component/index'
import { isFunction } from '../util/index'
import { cloneFileWithInfo, DEFAULT_ACCEPT, getFileFromList, getUUID, isBlobFile } from './helper'
import Request from './request'

class UploaderCore extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(UploaderCore.defaults, props), ...mixins)
  }

  _created() {
    this.reqs = {}
  }

  _config() {
    const that = this

    const { disabled, accept, multiple, button, dragger } = this.props

    this.fileList = this.props.fileList || this.props.defaultFileList

    this.acceptList = accept ? this.getAcceptList() : ''

    let initializing = true
    if (nomui.utils.isPromiseLike(that.fileList)) {
      that.fileList.then((res) => {
        initializing = false
        that.fileList = res

        if (!disabled && this.trigger) {
          that.trigger.enable()
        }
      })
    } else {
      initializing = false
    }

    this._setInterface()

    let trigger = null

    const defaults = {
      disabled: disabled || initializing,
      // disabled,
      ref: (c) => {
        that.trigger = c
      },
      attrs: {
        onclick() {
          that._handleClick()
        },
        ondrop(e) {
          that.props.dragger && that._onFileDrop(e)
        },
        ondragover(e) {
          e.preventDefault()
        },
      },
    }

    if (button) {
      if (isFunction(button)) {
        trigger = button()
      } else {
        trigger = Component.extendProps(defaults, button)
      }
    } else if (dragger) {
      if (isFunction(dragger)) {
        trigger = dragger()
      } else {
        trigger = Component.extendProps(defaults, dragger)
      }
    }

    this.setProps({
      children: [
        {
          tag: 'input',
          hidden: true,
          _created() {
            that.inputFile = this
          },
          attrs: {
            type: 'file',
            multiple: multiple,
            accept: accept || DEFAULT_ACCEPT,
            onchange: that._onChange.bind(that),
            onclick: (e) => {
              e.stopPropagation()
            },
          },
        },
        trigger,
      ],
    })
  }

  _setInterface(file) {
    if (this.fileList && this.fileList.length) {
      const currentStatus = file.status
      const allStats = this.fileList.map((n) => {
        return n.status
      })

      if (currentStatus === 'uploading') {
        this._showLoading()
      } else if (currentStatus === 'done' && !allStats.includes('uploading')) {
        this._cancleLoading()
      } else if (currentStatus === 'error') {
        this._cancleLoading()
        new nomui.Message({
          content: '上传失败！',
          type: 'error',
        })
      }
    }
  }

  getFiles() {
    return this.fileList
  }

  _showLoading() {
    if (!this.loading) {
      this.loading = new nomui.Loading({
        container: this.trigger,
      })
    }
  }

  _cancleLoading() {
    if (this.loading) {
      this.loading.remove()
      this.loading = null
    }
  }

  _onFileDrop = (e) => {
    const { multiple } = this.props

    e.preventDefault()

    if (e.type === 'dragover') {
      return
    }

    let files = [...e.dataTransfer.files]

    if (multiple === false) {
      files = files.slice(0, 1)
    }

    this.uploadFiles(files, this.fileList)
  }

  getAcceptList() {
    if (this.props.accept) {
      return this.props.accept
        .replace('image/*', '.jpg,.png,.gif,.jpeg,.jp2,.jpe,.bmp,.tif,.tiff')
        .replace('video/*', '.3gpp,.mp2,.mp3,.mp4,.mpeg,.mpg')
        .replace('audio/*', '.3gpp,.ac3,.asf,.au,.mp2,.mp3,.mp4,.ogg')
    }
  }

  checkType(file) {
    if (!this.props.accept) {
      return true
    }
    if (!file || !file.name) {
      return false
    }
    const { name } = file
    const type = name.substring(name.lastIndexOf('.')).toLowerCase()
    if (this.acceptList.toLowerCase().includes(type)) {
      return true
    }
    return false
  }

  _onChange(e) {
    const { files } = e.target
    const uploadedFiles = this.fileList
    this.uploadFiles(files, uploadedFiles)
  }

  uploadFiles(files, uploadedFiles) {
    // 转为数组
    let fileList = Array.from(files)
    const uploadedFileList = Array.from(uploadedFiles)

    fileList = fileList.map((e) => {
      if (!e.uuid) {
        e.uuid = getUUID()
      }
      e.uploadTime = new Date().getTime()
      return e
    })

    fileList.forEach((file) => {
      this.upload(file, [...uploadedFileList, ...fileList])
    })
  }

  upload(file, fileList) {
    const beforeUpload = this.props.beforeUpload
    if (!this.checkType(file)) {
      new nomui.Alert({
        title: '不支持此格式，请重新上传。',
      })
      return
    }
    if (!beforeUpload) {
      Promise.resolve().then(() => this.post(file))
      return
    }

    const before = beforeUpload(file, fileList)
    if (this.inputFile && this.inputFile.element) this.inputFile.element.value = ''
    if (nomui.utils.isPromiseLike(before)) {
      before.then((pFile) => {
        if (isBlobFile(pFile)) {
          this.post(pFile)
          return
        }
        this.post(file)
      })
    } else if (before !== false) {
      Promise.resolve().then(() => {
        this.post(file)
      })
    }
  }

  post(file) {
    if (!this.rendered) {
      return
    }

    const that = this
    const { props } = this
    const { uuid } = file
    new Promise((resolve) => {
      const actionRet = this.props.action
      resolve(isFunction(actionRet) ? actionRet(file) : actionRet)
    }).then((action) => {
      const { data, method, headers, withCredentials } = props
      const option = {
        action,
        data,
        file,
        filename: props.name,
        method,
        headers,
        withCredentials,
        onProgress: (e) => {
          that.onProgress(e, file)
        },
        onSuccess: (ret, xhr) => {
          that.onSuccess(ret, file, xhr)
        },
        onError: (err, ret) => {
          that.onError(err, ret, file)
          that.reqs[uuid] && delete that.reqs[uuid]
        },
      }
      this.onStart(file)
      this.reqs[uuid] = Request(option)
    })
  }

  _watchChange({ file, fileList }) {
    // 更新列表
    this.fileList = fileList

    this._setInterface(file)
    // this.update({ fileList: [...info.fileList] })

    if (this.trigger) {
      const disableBtn = this.fileList.some((n) => ['removing', 'uploading'].includes(n.status))

      if (!this.props.disabled) {
        disableBtn ? this.trigger.disable() : this.trigger.enable()
      }
    }

    if (this.props.onChange) {
      this._callHandler(this.props.onChange, {
        file,
        fileList: [...this.fileList],
      })
    }
  }

  onStart(file) {
    const uploadFile = cloneFileWithInfo(file)
    uploadFile.status = 'uploading'

    // 这里要改
    const fileList = Array.from(this.fileList)

    const findIndex = fileList.findIndex((f) => f.uuid === uploadFile.uuid)
    if (findIndex === -1) {
      fileList.push(uploadFile)
    } else {
      fileList[findIndex] = uploadFile
    }

    this._watchChange({
      file: uploadFile,
      fileList: fileList,
    })
  }

  onProgress(e, file) {
    const uploadingFile = getFileFromList(file, this.fileList)
    if (!uploadingFile) {
      return
    }

    uploadingFile.percent = e.percent
    this._watchChange({
      event: e,
      file: uploadingFile,
      fileList: [...this.fileList],
    })
  }

  onSuccess(response, file, xhr) {
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response)
      }
    } catch (e) {
      /* do nothing */
    }

    const uploadFile = getFileFromList(file, this.fileList)
    if (!uploadFile) {
      return
    }

    uploadFile.response = response
    uploadFile.status = 'done'
    uploadFile.xhr = xhr

    this._watchChange({
      file: uploadFile,
      fileList: [...this.fileList],
    })
  }

  onError(error, response, file) {
    const uploadFile = getFileFromList(file, this.fileList)
    if (!uploadFile) {
      return
    }

    uploadFile.error = error
    uploadFile.status = 'error'
    uploadFile.response = response

    this._watchChange({
      file: uploadFile,
      fileList: [...this.fileList],
    })
  }

  _handleClick() {
    if (this.inputFile) {
      this.inputFile.element.click()
    }
  }
}

UploaderCore.defaults = {
  reference: 'body',
  // 测试地址
  action: '',
  disabled: false,
  beforeUpload: null,
  button: null,
  defaultFileList: [],
  multiple: false,
  name: 'file',
  data: {},
  // request option
  method: 'post',
  headers: {},
  withCredentials: false,
  renderer: null,
  extraAction: [],
  customizeInfo: null,
  actionRender: null,
}

Component.register(UploaderCore)

export default UploaderCore
