import Component from '../Component/index'

class TreeSub extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'ul',
      items: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _create() {
    this.wrapper = this.props.wrapper || this.parent
    this.wrapper.subtree = this
    this.tree = this.wrapper.tree
    // this.props.itemDefaults = this.tree.props.itemDefaults
  }

  _config() {
    // if (this.parentTree.props.checkChild) {
    //   this.props.checked = true
    //   if (this.props.items) {
    //     this.props.checkChild = this.props.checked
    //   }
    // }

    const { items } = this.props

    // console.log(checked)
    // if (status === 0) {
    //   checkIcon = 'blank-square'
    // } else if (status === 1) {
    //   debugger
    //   checkIcon = 'checked-square'
    // } else {
    //   checkIcon = 'half-square'
    // }

    // function mapTree(data) {
    //   return data.map(function (item) {
    //     if (item.children && item.children.length > 0) {
    //       const c = mapTree(item.children)
    //       return {
    //         component: 'MenuItemWrapper',
    //         key: item.value,
    //         title: item.title,
    //         value: item.value,
    //         // checked: selectedList.indexOf(item.value) !== -1,
    //         items: c,
    //       }
    //     }
    //     return {
    //       component: 'MenuItemWrapper',
    //       key: item.value,
    //       title: item.title,
    //       value: item.value,
    //       // checked: selectedList.indexOf(item.value) !== -1,
    //     }
    //   })
    // }

    // const children = mapTree(items)

    this.setProps({
      children: items,
    })

    // if (items) {
    //   this.setProps({
    //     value: value,
    //     title: title,
    //     key: key,
    //     children: [
    //       Component.normalizeIconProps({
    //         type: collapsed ? 'down' : 'right',
    //         events: {
    //           click: function () {
    //             that.props.collapsed = !that.props.collapsed
    //             that.update(collapsed)
    //           },
    //         },
    //       }),
    //       {
    //         tag: 'span',
    //         classes: {
    //           'nom-tree-node-name': true,
    //         },
    //         children: [
    //           Component.normalizeIconProps({
    //             type: checkIcon,
    //             events: {
    //               click: function () {
    //                 that.handleCheck()
    //               },
    //             },
    //           }),
    //           {
    //             tag: 'span',
    //             children: title,
    //           },
    //         ],
    //       },
    //       {
    //         tag: 'ul',
    //         hidden: !!collapsed,
    //         classes: {
    //           'nom-tree-node-sub': true,
    //         },
    //         children: items,
    //       },
    //     ],
    //   })
    // } else {
    //   this.setProps({
    //     value: value,
    //     title: title,
    //     key: key,
    //     children: {
    //       tag: 'span',
    //       classes: {
    //         'nom-tree-node-name': true,
    //         indent: true,
    //       },
    //       children: [
    //         Component.normalizeIconProps({
    //           type: checkIcon,
    //           events: {
    //             click: function () {
    //               that.handleCheck()
    //             },
    //           },
    //         }),
    //         {
    //           tag: 'span',
    //           children: title,
    //         },
    //       ],
    //     },
    //   })
    // }
  }

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }
}

Component.register(TreeSub)

export default TreeSub
