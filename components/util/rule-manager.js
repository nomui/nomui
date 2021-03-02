/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
import { isFunction } from './index'

const RuleManager = {}
RuleManager.ruleTypes = {
  required: {
    validate: function (value) {
      return !isEmpty(value)
    },
    message: '必填',
  },
  number: {
    validate: function (value) {
      return !isEmpty(value) ? /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value) : true
    },
    message: '请输入有效的数字',
  },
  digits: {
    validate: function (value) {
      return !isEmpty(value) ? /^\d+$/.test(value) : true
    },
    message: '只能输入数字',
  },
  regex: {
    validate: function (value, ruleValue) {
      return !isEmpty(value)
        ? new RegExp(ruleValue.pattern, ruleValue.attributes).test(value)
        : true
    },
  },
  email: {
    validate: function (value) {
      return !isEmpty(value)
        ? /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(
            value,
          )
        : true
    },
    message: '请输入有效的 Email 地址',
  },
  url: {
    validate: function (value) {
      return !isEmpty(value)
        ? /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
            value,
          )
        : true
    },
    message: '请输入有效的 URL',
  },
  min: {
    validate: function (value, ruleValue) {
      return !isEmpty(value) ? Number(value) >= ruleValue : true
    },
    message: '输入值不能小于 {0}',
  },
  max: {
    validate: function (value, ruleValue) {
      return !isEmpty(value) ? Number(value) <= ruleValue : true
    },
    message: '输入值不能大于 {0}',
  },
  range: {
    validate: function (value, ruleValue) {
      return !isEmpty(value) ? Number(value) >= ruleValue[0] && Number(value) <= ruleValue[1] : true
    },
    message: '输入值必须介于 {0} 和 {1} 之间',
  },
  minlength: {
    validate: function (value, ruleValue) {
      if (!isEmpty(value)) {
        let length = 0
        if (Array.isArray(value)) {
          length = value.length
        } else {
          length = value.trim().length
        }

        return length >= ruleValue
      }
      return true
    },
    message: '不能少于 {0} 个字',
  },
  maxlength: {
    validate: function (value, ruleValue) {
      if (!isEmpty(value)) {
        let length = 0
        if (Array.isArray(value)) {
          length = value.length
        } else {
          length = value.trim().length
        }

        return length <= ruleValue
      }
      return true
    },
    message: '不能多于 {0} 个字',
  },
  rangelength: {
    validate: function (value, ruleValue) {
      if (!isEmpty(value)) {
        let length = 0
        if (Array.isArray(value)) {
          length = value.length
        } else {
          length = value.trim().length
        }

        return ruleValue[0] <= length && length <= ruleValue[1]
      }
      return true
    },
    message: '输入字数在 {0} 个到 {1} 个之间',
  },
  remote: {
    validate: function (value, ruleValue) {
      const data = {}
      data[ruleValue[1]] = value
      const response = $.ajax({
        url: ruleValue[0],
        dataType: 'json',
        data: data,
        async: false,
        cache: false,
        type: 'post',
      }).responseText
      return response === 'true'
    },
    message: 'Please fix this field',
  },
  date: {
    validate: function () {
      return true
    },
    message: '请输入有效的日期格式.',
  },
  identifier: {
    validate: function (value) {
      return !isEmpty(value) ? /^[a-zA-Z][a-zA-Z0-9_]*$/.test(value) : true
    },
    message: '只能输入字母、数字、下划线且必须以字母开头',
  },
  phoneNumber: {
    validate: function (value) {
      return !isEmpty(value) ? /^1[3|4|5|7|8][0-9]{9}$/.test(value) : true
    },
    message: '请输入正确的手机号',
  },
  func: {
    validate: function (value, ruleValue) {
      if (!isEmpty(value) && isFunction(ruleValue)) {
        return ruleValue(value)
      }
      return true
    },
  },
}

RuleManager.validate = function (rules, controlValue) {
  for (let i = 0; i < rules.length; i++) {
    const checkResult = checkRule(rules[i], controlValue)
    if (checkResult !== true) {
      return checkResult
    }
  }

  return true
}

function isEmpty(val) {
  return val === undefined || val === null || val === '' || (Array.isArray(val) && !val.length)
}

function checkRule(ruleSettings, controlValue) {
  const rule = RuleManager.ruleTypes[ruleSettings.type]

  if (rule) {
    let ruleValue = ruleSettings.value || null
    if (!rule.validate(controlValue, ruleValue)) {
      let message = ruleSettings.message || rule.message
      if (ruleValue !== null) {
        if (!Array.isArray(ruleValue)) {
          ruleValue = [ruleValue]
        }
        for (let i = 0; i < ruleValue.length; i++) {
          message = message.replace(new RegExp(`\\{${i}\\}`, 'g'), ruleValue[i])
        }
      }
      return message
    }
  }
  return true
}

export default RuleManager
