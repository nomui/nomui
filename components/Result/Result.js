import Component from '../Component/index'
import { isString } from '../util/index'
import { NotFound, ServerError, UnAuthorized } from './Exceptions'

class Result extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      // icon: 'info',
      status: 'info', //  '403' | '404' | '500'|'success'|'error'|'info'|'warning',
      // title: '',
      // subTitle:'',
      // extra:null,
      // children:null
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  renderIcon({ status, icon }) {
    const exceptionStatus = Object.keys(Result.ExceptionMap)
    if (exceptionStatus.includes(`${status}`)) {
      const svgComponent = Result.ExceptionMap[status]
      return {
        classes: {
          'nom-result-icon': true,
          'nom-result-image': true,
        },
        children: svgComponent,
      }
    }
    let iconContent = Result.IconMap[status]
    if (icon) {
      if (isString(icon)) {
        iconContent = {
          component: 'Icon',
          type: icon,
        }
      } else {
        iconContent = icon
      }
    }
    return {
      classes: {
        'nom-result-icon': true,
      },
      children: {
        classes: {
          anticon: true,
        },
        ...iconContent,
      },
    }
  }

  _config() {
    const { status, title, subTitle, extra, icon, children } = this.props
    this.setProps({
      classes: {
        [`nom-result-${status}`]: true,
      },
      children: [
        this.renderIcon({ status, icon }),
        {
          classes: {
            'nom-result-title': true,
          },
          children: title,
        },
        subTitle
          ? {
              classes: {
                'nom-result-subtitle': true,
              },
              children: subTitle,
            }
          : null,
        extra
          ? {
              classes: {
                'nom-result-extra': true,
              },
              children: extra,
            }
          : null,
        children
          ? {
              classes: {
                'nom-result-content': true,
              },
              children,
            }
          : null,
      ],
    })
  }
}

Result.IconMap = {
  success: {
    component: 'Icon',
    type: 'check-circle',
  },
  error: {
    component: 'Icon',
    type: 'close-circle',
  },
  info: {
    component: 'Icon',
    type: 'info-circle',
  },
  warning: {
    component: 'Icon',
    type: 'exclamation-circle',
  },
}

Result.ExceptionMap = {
  404: NotFound,
  500: ServerError,
  403: UnAuthorized,
}

Component.register(Result)

export default Result
