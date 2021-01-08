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

  _config() {
    const { files, onPreview, onRemove, onDownload, extraAction } = this.props
    const children = []
    if (Array.isArray(files) && files.length > 0) {
      files.forEach((file) => {
        children.push({ component: FileItem, file, onPreview, onRemove, onDownload, extraAction })
      })
    }

    this.setProps({
      tag: 'div',
      children,
    })
  }
}

export default FileList
