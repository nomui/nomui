import Component from '../Component/index'
import { isFunction } from '../util/index'
import { cloneFileWithInfo, DEFAULT_ACCEPT, getFileFromList, getUUID, isBlobFile } from './helper'
import Request from './request'

class Upload extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Upload.defaults, props), ...mixins)
  }

  _created() {
    this.reqs = {}
  }

  _config() {
    const that = this

    const { disabled, accept, multiple, trigger, draggable } = this.props

    this.fileList = this.props.fileList || this.props.defaultFileList

    this.acceptList = accept ? this.getAcceptList() : ''

    let initializing = true
    if (nomui.utils.isPromiseLike(that.fileList)) {
      that.fileList.then((res) => {
        initializing = false
        that.fileList = res

        that.props.onChange &&
          that._callHandler(that.props.onChange, { file: null, fileList: that.fileList })
        if (!disabled && this.triggerRef) {
          that.triggerRef.enable()
        }
      })
    } else {
      initializing = false
    }

    this._watchStatus()

    const defaults = {
      disabled: disabled || initializing,
      // disabled,
      ref: (c) => {
        that.triggerRef = c
      },
      classes: {
        'nom-upload-trigger': true,
      },
      attrs: {
        onclick() {
          !disabled && that._handleClick()
        },
        ondrop(e) {
          !disabled && draggable && that._onFileDrop(e)
        },
        ondragover(e) {
          e.preventDefault()
        },
      },
    }

    const defaultBtn = {
      component: 'Button',
      text: '上传',
    }

    const triggerProps = Component.extendProps(defaults, trigger || defaultBtn)

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
        triggerProps,
      ],
    })
  }

  getData() {
    return this.fileList
  }

  disable() {
    this.triggerRef.disable()
  }

  enable() {
    this.triggerRef.enable()
  }

  _watchStatus(file) {
    if (file && this.fileList && this.fileList.length) {
      const currentStatus = file.status
      const allStats = this.fileList.map((n) => {
        return n.status
      })
      const noUploading = !allStats.includes('uploading')

      if (currentStatus === 'uploading') {
        this._showLoading()
      } else if (currentStatus === 'done') {
        this._cancleLoading(noUploading)
      } else if (currentStatus === 'error') {
        this._cancleLoading(noUploading)
        new nomui.Message({
          content: '上传失败！',
          type: 'error',
        })
      }
    }
  }

  _showLoading() {
    if (!this.loading) {
      this.loading = new nomui.Loading({
        container: this.triggerRef,
      })
    }
  }

  _cancleLoading(flag) {
    if (flag && this.loading) {
      this.loading.remove()
      this.loading = null
    }
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
    this._uploadFiles(files, uploadedFiles)
  }

  _uploadFiles(files, uploadedFiles) {
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
      this._upload(file, [...uploadedFileList, ...fileList])
    })
  }

  _upload(file, fileList) {
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
        file,
        filename: props.name,
        data,
        method,
        headers,
        withCredentials,
        onProgress: (e) => {
          that._onProgress(e, file)
        },
        onSuccess: (ret, xhr) => {
          that._onSuccess(ret, file, xhr)
        },
        onError: (err, ret) => {
          that._onError(err, ret, file)
          that.reqs[uuid] && delete that.reqs[uuid]
        },
      }
      this._onStart(file)
      this.reqs[uuid] = Request(option)
    })
  }

  _watchChange({ file, fileList }) {
    // 更新列表
    this.fileList = fileList

    this._watchStatus(file)

    if (this.triggerRef) {
      const disableBtn = this.fileList.some((n) => ['removing', 'uploading'].includes(n.status))

      if (!this.props.disabled) {
        disableBtn ? this.triggerRef.disable() : this.triggerRef.enable()
      }
    }

    if (this.props.onChange) {
      this._callHandler(this.props.onChange, {
        file,
        fileList: [...this.fileList],
      })
    }
  }

  _onStart(file) {
    const currentFile = cloneFileWithInfo(file)
    currentFile.status = 'uploading'

    // 这里要改
    const fileList = Array.from(this.fileList)

    const findIndex = fileList.findIndex((f) => f.uuid === currentFile.uuid)
    if (findIndex === -1) {
      fileList.push(currentFile)
    } else {
      fileList[findIndex] = currentFile
    }

    this._watchChange({
      file: currentFile,
      fileList: fileList,
    })
  }

  _onProgress(e, file) {
    const currentFile = getFileFromList(file, this.fileList)
    if (!currentFile) {
      return
    }

    currentFile.percent = e.percent
    this._watchChange({
      event: e,
      file: currentFile,
      fileList: [...this.fileList],
    })
  }

  _onSuccess(response, file, xhr) {
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response)
      }
    } catch (e) {
      /* do nothing */
    }

    const currentFile = getFileFromList(file, this.fileList)
    if (!currentFile) {
      return
    }

    currentFile.response = response
    currentFile.status = 'done'
    currentFile.xhr = xhr

    this._watchChange({
      file: currentFile,
      fileList: [...this.fileList],
    })
  }

  _onError(error, response, file) {
    const currentFile = getFileFromList(file, this.fileList)
    if (!currentFile) {
      return
    }

    this.fileList = this.fileList.filter((n) => {
      return n.uuid !== file.uuid
    })

    currentFile.error = error
    currentFile.status = 'error'
    currentFile.response = response

    this._watchChange({
      file: currentFile,
      fileList: [...this.fileList],
    })
  }

  _handleClick() {
    if (this.inputFile) {
      this.inputFile.element.click()
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
    this._uploadFiles(files, this.fileList)
  }
}

Upload.defaults = {
  reference: 'body',
  action: '',
  disabled: false,
  beforeUpload: null,
  trigger: null, // 按钮界面
  draggable: false, // 拖拽界面
  defaultFileList: [], // 默认上传文件列表
  multiple: false,
  name: 'file',
  data: {},
  // request option
  method: 'post',
  headers: {},
  withCredentials: false,
  onChange: null,
}

Component.register(Upload)

export default Upload
