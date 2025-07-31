表单元素项，可以用来组合 labe 跟 Control 类型组件

## API

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| name | 字段名称，未设置时会自动设置一个自增格式 | `string` | `__field` + 自增长序号 |
| defaultValue | 默认值，仅在初始化组件时设置 | `string` | - |
| value | 字段值 | `string` | - |
| label | 标签文本，当未定义或为 null 时不显示标签栏 | `string` | - |
| labelAlign | 标签对齐方式 | `left`\|`right`\|`top` | `right` |
| actionAlign | 操作按钮对齐方式,配置为 end 时即使 labelAlign 是 top,操作按钮也会保持在字段右侧 | `default`\|`end` | `default` |
| invalidTip | 验证错误信息提示的配置（Tooltip 组件） | `object` | `参考Tooltip` |
| flatValue | 是否平面化数据 | `boolean` | `false` |
| notShowLabel | 不显示标签，不管 label 是否设置 | `boolean` | `false` |
| extra | 表单元素的拓展展示内容 | `string` | - |
| variant | 表单风格类型 | `default\|filled\|borderless` | `default` |
| labelWidth | 表单元素项提示文字宽度 | `number` | `126` |
| labelExpandable | 表单是否可折叠 | `boolean ` | {expanded:boolean}` | - |
| controlWidth | 表单元素项的宽度 | `xsmall\|small\|medium\|large\|xlarge` | `false` |
| rules | 配置的验证规则 | `Array` | `[]` |
| required | 是否必填 | `boolean` | - |
| disabled | 是否禁用 | `boolean` | - |
| compact | 一种界面显示更加紧凑的模式 | `boolean` | - |
| readonly | 是否只读(仅禁止用户手动输入，仍旧允许通过 setValue 方法赋值) | `boolean` | - |
| control | 关联的表单元素项 | `Props` | - |
| actions | 关联的表单元素项的操作按钮 | `Props[]` | - |
| onValueChange | 值变化的时候触发 | `(changed:{name:string,newValue:boolean,oldValue:boolean,sender:obj})=>void` | - |
| dependencies | 监听兄弟字段值变化 | `[name]` | - |
| onDependencyValueChange | 监听字段值发生变化触发事件，与`dependencies`结合使用 | `({name:string,newValue:boolean,oldValue:boolean,sender:obj,source:obj})=>void` | - |

## Rules item

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 内置的检验规则类型 | 下面的可选值中选取 | - |
| message | 错误提示信息 | `string` | 对应内置`type`所属的 message |
| value | rule 校验的具体规则配置值 | `object`\|`string`\|`number`\|`array` | - |

**type 可选值**:

> `number`,`digits`,`regex`,`email`,`url`,`min`,`max`,`range`,`minlength`,`maxlength`,`rangelength`,`remote`,`date`,`identifier`,`phoneNumber`,`telephone`,`IDCard`,`noScript`,`func`

```js
// 使用示例 value 为具体配置， message 为默认错误提示
{
  components: 'Textbox',
  rules: [
    // fieldValue 值类型 (无需配置 value )
    { type: 'number', value: -, message: '请输入有效的数字'  },
    { type: 'digits', value: -, message: '只能输入数字'  },
    { type: 'email', value: -, message: '请输入有效的 Email 地址'  },
    { type: 'url', value: -, message: '请输入有效的 URL'  },
    { type: 'date', value: -, message: '请输入有效的日期格式'  },
    { type: 'identifier', value: -, message: '只能输入字母、数字、下划线且必须以字母开头'  },
    { type: 'phoneNumber', value: -, message: '请输入正确的手机号'  },
    { type: 'telephone', value: -, message: '请输入正确的固话号码'  },
    { type: 'IDCard', value: -, message: '请输入正确的身份证号码'  },
    { type: 'noScript', value: -, message: '禁止输入"<script>"或"</script>"危险标签'  },

    // 正则表达式
    { type: 'regex', value: { pattern, attributes }, message: '' },

    // fieldValue 值大小
    { type: 'min', value: min, message: '输入值不能小于${min}'  },
    { type: 'max', value: max, message: '输入值不能大于${max}'  },
    { type: 'range', value: [min, max],  message: '输入值必须介于 ${min} 和 ${max} 之间'},

    // fieldValue 长度
    { type: 'minlength', value: minlength, message: '${minlength} 个字'  },
    { type: 'maxlength', value: maxlength, message: '${maxlength} 个字'  },
    { type: 'rangelength', value: max, message: '输入值不能大于${max}'  },


    /**
     * 复杂 value 配置项
     */
    { type: 'remote', value: [url, postDataKey], message: 'Please fix this field' }, // url为接口地址, post请求 data: {postDataKey: fieldValue} 的格式去校验
    { type: 'func', value: fn, message: '自定义错误信息' }, // fn(fieldValue) 的返回结果. true: 校验通过, false: 不通过
  ]
}
```

## Method

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| focus | 获得焦点 |  |
| blur | 失焦 |  |
| getValue | 获取 value 值 |  |
| setValue | 设置 value 值, 第一个参数是要设置的值，第二个是一个可选的对象参数，其属性 `triggerChange` 指示该设值操作是否触发 onValueChange 事件 | `(value, options: { triggerChange: boolean } )=>{}` |
| validate | 验证 | `()=>boolean` |
| toggleReadonly | 切换只读状态，如果不传参数则在只读与非只读状态之间切换，传参数 true 则强制只读，传 false 强制非只读 |  |
| reset | 重置字段值为初始值 |  |
| clear | 清除字段值 |  |
