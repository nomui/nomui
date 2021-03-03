class ComponentDescriptor {
  constructor(tagOrComponent, props, children, mixins) {
    this.tagOrComponent = tagOrComponent
    this.props = props || {}
    this.children = children
    this.mixins = Array.isArray(mixins) ? mixins : []
  }

  getProps() {
    if (this.props instanceof ComponentDescriptor) {
      this.mixins = this.mixins.concat(this.props.mixins)
      this.props = this.props.getProps()
    }
    if (this.tagOrComponent) {
      this.props.component = this.tagOrComponent
    }
    if (this.children) {
      this.props.children = this.children
    }
    return this.props
  }
}

export default ComponentDescriptor
