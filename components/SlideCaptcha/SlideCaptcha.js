import Component from '../Component/index'

class SlideCaptcha extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      token: null,
      bgSrc: '',
      captchSrc: '',
      width: 300,
      height: 300,
      top: 0,
      // onRefresh:()=>{},
      // validate:()=>{},
      // onFinish:()=>{},
      // onFinishFailed:()=>{},
      refreshTitle: '换一张',
      tip: '向右滑动完成拼图',
      autoRefreshOnFail: true, // 失败后是否自动刷新图片
    }

    super(
      Component.extendProps(defaults, props, {
        state: {
          // 记录开始滑动的时间
          startTime: new Date(),
          // 记录结束滑动的时间
          endTime: new Date(),
          // 当前是否正在移动中
          isMove: false,
          // 位置差(相当于页面浏览器最左端)
          poorX: 0,
          // 拖拽元素距离左边的距离
          distance: 0,
        },
      }),
      ...mixins,
    )
  }

  dispatch(action) {
    let newState = {}
    switch (action.type) {
      // 重置
      case 'reset':
        newState = {
          // 记录开始滑动的时间
          startTime: new Date(),
          // 记录结束滑动的时间
          endTime: new Date(),
          // 当前是否正在移动中
          isMove: false,
          // 位置差(相当于页面浏览器最左端)
          poorX: 0,
          // 拖拽元素距离左边的距离
          distance: 0,
        }
        break
      // 记录开始时间
      case 'setStartTime':
        newState = {
          startTime: action.payload,
        }
        break
      // 记录结束时间
      case 'setEndTime':
        newState = {
          endTime: action.payload,
        }
        break
      // 记录移动状态
      case 'setMove':
        newState = {
          isMove: action.payload,
        }
        break
      // 记录位置差
      case 'setPoorX':
        newState = {
          poorX: action.payload,
        }
        break
      // 设置拖拽元素距离左边的距离
      case 'setDistance':
        newState = {
          distance: action.payload,
        }
        break
      case 'change':
        newState = {
          ...action.payload,
        }
        break
      default:
        throw new Error(`unsupport dispatch type:${action} in SlideCaptcha reducer`)
    }
    this.update({
      state: {
        ...newState,
      },
    })
  }

  /**
   * 获取最大可拖拽宽度
   */
  getMaxSlideWidth() {
    return this.props.width - 40
  }

  defaultEvent(e) {
    e.preventDefault()
  }

  refresh() {
    this.props.onRefresh && this.props.onRefresh()
    this.dispatch({ type: 'reset' })
  }

  /**
   * 鼠标/手指开始滑动
   * @param {*} currentPageX 当前所处位置距离浏览器最左边的位置
   */
  dragStart(currentPageX) {
    const { state } = this.props
    this.dispatch({
      type: 'change',
      payload: {
        isMove: true,
        poorX: currentPageX - state.distance, // 当前位置减去已拖拽的位置作为位置差
        startTime: new Date(),
      },
    })
  }

  /**
   * 拖拽移动过程触发
   * @param {*} currentPageX 当前所处位置距离浏览器最左边的位置
   */
  dragMoving(currentPageX) {
    const { state } = this.props
    const distance = currentPageX - state.poorX
    // 鼠标指针移动距离超过最大时清空事件
    const maxSlideWidth = this.getMaxSlideWidth()
    if (state.isMove && distance !== state.distance && distance >= 0 && distance < maxSlideWidth) {
      this.dispatch({
        type: 'change',
        payload: {
          distance,
        },
      })
    }
  }

  /**
   * 拖拽结束触发
   * @param {*} currentPageX 当前所处位置距离浏览器最左边的位置
   */
  dragEnd() {
    const that = this
    const { state, validate, autoRefreshOnFail, onFinish, token, onFinishFailed } = that.props
    // 距离不能少于5 否则算没拖动
    if (!state.isMove || state.distance < 5) {
      that.dispatch({ type: 'reset' })
      return true
    }
    that.dispatch({ type: 'setMove', payload: false })
    if (state.poorX === undefined) {
      return true
    }
    that.dispatch({ type: 'setEndTime', payload: new Date() })
    setTimeout(() => {
      // 调用远程进行校验
      validate &&
        validate({
          token: token,
          point: state.distance,
          timespan: Math.abs(Number(state.endTime) - Number(state.startTime)),
        })
          .then((result) => {
            onFinish && onFinish(result)
            return result
          })
          .catch((err) => {
            if (onFinishFailed) {
              onFinishFailed(err, that.refresh)
            }
            if (autoRefreshOnFail) {
              that.refresh()
            }
          })
    })
  }

  handleMouseMove(e) {
    this.dragMoving(e.pageX)
  }

  handleMouseUp() {
    this.dragEnd()
  }

  handleRefreshCaptcha(e) {
    this.refresh()
    e.preventDefault && e.preventDefault()
    e.stopPropagation && e.stopPropagation()
    e.stopImmediatePropagation && e.stopImmediatePropagation()
  }

  _config() {
    const { width, height, bgSrc, captchSrc, top, tip, refreshTitle, state } = this.props
    const that = this
    this.setProps({
      attrs: {
        style: {
          height: `${height + 34}px`,
          width: `${width}px`,
        },
      },
      children: [
        {
          tag: 'div',
          attrs: {
            style: {
              width: `${width}px`,
              height: `${height}px`,
              background: '#e8e8e8',
            },
          },
          children: [
            {
              tag: 'div',
              classes: {
                'captcha-img': true,
              },
              attrs: {
                style: {
                  backgroundImage: `url(${bgSrc})`,
                  width: `${width}px`,
                  height: `${height}px`,
                },
              },
            },
            {
              tag: 'div',
              classes: {
                'small-drag': true,
              },

              attrs: {
                style: {
                  backgroundImage: `url(${captchSrc})`,
                  top: `${top}px`,
                  left: `${state.distance}px`,
                },
              },
            },
          ],
        },
        {
          tag: 'div',
          classes: {
            drag: true,
          },
          attrs: {
            style: {
              width: `${width}px`,
            },
          },
          children: [
            {
              tag: 'div',
              classes: {
                'drag-bg': true,
              },
              attrs: {
                style: {
                  width: `${state.distance}px`,
                },
              },
            },
            {
              tag: 'div',
              classes: {
                'drag-text': true,
              },
              attrs: {
                style: {
                  width: `${width}px`,
                },
                unselectable: 'on',
              },
              children: tip,
            },
            {
              tag: 'div',
              classes: {
                handler: true,
                'handler-bg': true,
              },
              attrs: {
                style: {
                  left: `${state.distance}px`,
                },
                onmousedown: function (e) {
                  that.dragStart(e.pageX)
                },
              },
            },
            {
              classes: {
                'refesh-btn': true,
              },
              component: 'Button',
              icon: 'refresh',
              shape: 'circle',
              type: 'link',
              attrs: {
                onmouseup: this.handleRefreshCaptcha,
                style: {
                  visibility: state.isMove ? 'hidden' : 'visible',
                },
                title: refreshTitle,
              },
            },
          ],
        },
      ],
    })
  }

  _created() {
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.dragStart = this.dragStart.bind(this)
    this.dragEnd = this.dragEnd.bind(this)
    this.dragMoving = this.dragMoving.bind(this)

    this.handleRefreshCaptcha = this.handleRefreshCaptcha.bind(this)
    this.defaultEvent = this.defaultEvent.bind(this)

    // 移动鼠标、松开鼠标
    this.referenceElement.addEventListener('mousemove', this.handleMouseMove, true)
    this.referenceElement.addEventListener('mouseup', this.handleMouseUp)
  }

  _remove() {
    this.referenceElement.removeEventListener('mousemove', this.handleMouseMove, true)
    this.referenceElement.removeEventListener('mouseup', this.handleMouseUp)
  }
}

Component.register(SlideCaptcha)

export default SlideCaptcha
