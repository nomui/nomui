import Component from '../Component/index'
import FileItem from './FileItem'

class FileList extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      disabled: false,
      files: null,
    }
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this.uploaderControl = this.parent.parent.parent.control
    this.uploaderControl.list = this
  }

  _config() {
    const { files, onRemove, extraAction, initializing, renderer } = this.props
    const children = []
    if (Array.isArray(files) && files.length > 0) {
      files.forEach((file) => {
        children.push({ component: FileItem, file, onRemove, extraAction, renderer })
      })
    }

    if (initializing) {
      this.setProps({
        tag: 'div',
        children: {
          component: 'Icon',
          type: 'loading',
          classes: {
            'file-img': true,
          },
        },
      })
    } else {
      this.setProps({
        tag: 'div',
        children,
      })
    }
  }
}

export default FileList
