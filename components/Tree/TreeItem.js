import Component from '../Component/index'
import List from '../List/index'

class TreeItem extends List {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'li',
      items: null,
      // itemSelectable: {
      //   multiple: false,
      //   byClick: true,
      // },
      status: 0,
      selectChild: false,
      collapsed: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    if (this.parent.parent.props.selectChild) {
      this.props.status = 1
      this.props.selectChild = true
    }

    const { value, title, key, items, status, collapsed, selectChild } = this.props
    const that = this

    let checked = null
    if (status === 0) {
      checked = 'blank-square'
    } else if (status === 1) {
      checked = 'checked-square'
    } else {
      checked = 'half-square'
    }

    if (items) {
      this.setProps({
        value: value,
        title: title,
        key: key,
        children: [
          Component.normalizeIconProps({
            type: collapsed ? 'up' : 'right',
            events: {
              click: function () {
                that.props.collapsed = !that.props.collapsed
                that.update(collapsed)
              },
            },
          }),
          {
            tag: 'span',
            classes: {
              'nom-tree-node-name': true,
            },
            children: [
              Component.normalizeIconProps({
                type: checked,
                events: {
                  click: function () {
                    if (that.props.status === 0) {
                      that.props.status = 1
                      that.props.selectChild = true
                    } else if (that.props.status === 1) {
                      that.props.status = 0
                      that.props.selectChild = false
                    }
                    that.update(status)
                    that.update(selectChild)
                  },
                },
              }),
              {
                tag: 'span',
                children: title,
              },
            ],
          },
          {
            tag: 'ul',
            hidden: !!collapsed,
            classes: {
              'nom-tree-select-sub': true,
            },
            children: items,
          },
        ],
      })
    } else {
      this.setProps({
        value: value,
        title: title,
        key: key,
        children: {
          tag: 'span',
          classes: {
            'nom-tree-node-name': true,
          },
          children: [
            Component.normalizeIconProps({
              type: checked,
              events: {
                click: function () {
                  if (that.props.status === 0) {
                    that.props.status = 1
                  } else if (that.props.status === 1) {
                    that.props.status = 0
                  }
                  that.update(status)
                },
              },
            }),
            {
              tag: 'span',
              children: title,
            },
          ],
        },
      })
    }
  }

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }
}

Component.register(TreeItem)

export default TreeItem
