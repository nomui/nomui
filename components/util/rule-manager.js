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
      return !isEmpty(value) ? Number(value.replace(/,/g, '')) >= ruleValue : true
    },
    message: '输入值不能小于 {0}',
  },
  max: {
    validate: function (value, ruleValue) {
      return !isEmpty(value) ? Number(value.replace(/,/g, '')) <= ruleValue : true
    },
    message: '输入值不能大于 {0}',
  },
  range: {
    validate: function (value, ruleValue) {
      return !isEmpty(value)
        ? Number(value.replace(/,/g, '')) >= ruleValue[0] &&
            Number(value.replace(/,/g, '')) <= ruleValue[1]
        : true
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
      return !isEmpty(value) ? /^1[1-9][0-9]{9}$/.test(value) : true
    },
    message: '请输入正确的手机号',
  },
  telephone: {
    validate: function (value) {
      return !isEmpty(value) ? /^((\d{3,4}\-)|)\d{7,8}(|([-\u8f6c]{1}\d{1,5}))$/.test(value) : true
    },
    message: '请输入正确的固话号码',
  },
  IDCard: {
    validate: function (value) {
      return !isEmpty(value) ? checkIDCard(value) : true
    },
    message: '请输入正确的身份证号码',
  },
  noScript: {
    validate: function (value) {
      return !isEmpty(value) ? !hasScriptLabel(value) : true
    },
    message: '禁止输入"<script>"或"</script>"危险标签',
  },
  func: {
    validate: function (value, ruleValue) {
      if (isFunction(ruleValue)) {
        return ruleValue(value)
      }
      return true
    },
  },
}

RuleManager.validate = function (rules, controlValue, returnDetail = false) {
  const nonBlockErrors = []

  for (let i = 0; i < rules.length; i++) {
    const result = checkRule(rules[i], controlValue, returnDetail)

    if (result === true) continue

    if (nomui.utils.isPlainObject(result) && result.soft === true) {
      // 非阻断规则，收集
      nonBlockErrors.push(result)
      continue
    }

    // 阻断规则：直接返回 message（兼容旧逻辑）
    return result
  }

  // 有非阻断规则，返回它们（getValidDetail 用）
  if (nonBlockErrors.length) return nonBlockErrors

  return true
}

function isEmpty(val) {
  return val === undefined || val === null || val === '' || (Array.isArray(val) && !val.length)
}

function checkRule(ruleSettings, controlValue, returnDetail = false) {
  const rule = RuleManager.ruleTypes[ruleSettings.type]

  if (!rule) return true

  let ruleValue = ruleSettings.value ?? null
  if (!rule.validate(controlValue, ruleValue)) {
    let message = ruleSettings.message || rule.message

    if (ruleValue !== null) {
      if (!Array.isArray(ruleValue)) ruleValue = [ruleValue]
      for (let i = 0; i < ruleValue.length; i++) {
        message = message.replace(new RegExp(`\\{${i}\\}`, 'g'), ruleValue[i])
      }
    }

    // 非阻断规则 + returnDetail 时返回对象
    if (ruleSettings.soft === true && returnDetail) {
      return {
        soft: true,
        name: ruleSettings.name || null,
        rule: ruleSettings.type,
        message,
      }
    }

    // 阻断规则（或非阻断 + 不要求 detail）返回字符串（兼容原_validate）
    return message
  }

  return true
}

function checkIDCard(idcode) {
  // 加权因子
  const weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  // 校验码
  const check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  const code = `${idcode}`
  const last = idcode[17]
  const seventeen = code.substring(0, 17)
  // 判断最后一位校验码是否正确
  const arr = seventeen.split('')
  const len = arr.length
  let num = 0
  for (let i = 0; i < len; i++) {
    num += arr[i] * weight_factor[i]
  }
  const resisue = num % 11
  const last_no = check_code[resisue]
  /*
  第一位不可能是0
  第二位到第六位可以是0-9
  第七位到第十位是年份，所以七八位为19或者20
  十一位和十二位是月份，这两位是01-12之间的数值
  十三位和十四位是日期，是从01-31之间的数值
  十五，十六，十七都是数字0-9
  十八位可能是数字0-9，也可能是X
  */
  const idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/
  const format = idcard_patter.test(idcode)
  // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
  return !!(last === last_no && format)
}

function hasScriptLabel(str) {
  return new RegExp('.*?script[^>]*?.*?(</.*?script.*?>)*', 'ig').test(str)
}

export default RuleManager
