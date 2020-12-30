import { extend } from '../util/index'

class ComponentDescriptor {
    constructor(tagOrComponent, props, children, mixins) {
        this.tagOrComponent = tagOrComponent
        this.props = props || {} // todo:处理 props 是 ComponentDescriptor 对象的情况
        this.children = children
        this.mixins = Array.isArray(mixins) ? mixins : []
    }

    getProps() {
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