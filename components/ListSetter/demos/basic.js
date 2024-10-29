define([
  'css!./basic.css'], function () {
    return {
      title: '基础用法',
      file: 'basic',
      demo: function () {
        let gridRef = null, fieldSelectorRef = null

        const columns = [
          { field: 'name', title: '姓名', width: 120, align: 'left' },
          { field: 'sex', title: '性别', width: 120, align: 'left' },
          { field: 'age', title: '年龄', width: 120, align: 'right' },
          { field: 'birthday', title: '生日', width: 120, align: 'right' },
        ]

        const initColumns = [
          { field: 'name', title: '姓名', width: 120, align: 'left' },
        ]

        const gridData = [
          { name: '张三', sex: '男', age: 18, birthday: '1990-01-01' },
          { name: '李四', sex: '女', age: 19, birthday: '1991-01-01' },
          { name: '王五', sex: '男', age: 20, birthday: '1992-01-01' },
        ]

        return {
          component: 'Layout',
          body: {
            styles: {
              padding: '1'
            },
            children: {
              component: 'Grid',
              ref: (c) => { gridRef = c },
              columns: initColumns,
              data: gridData
            }
          },
          asider: {
            styles: {
              padding: '1'
            },
            children: {
              component: 'ListSetter',
              label: '表格列设置',
              labelAlign: 'top',
              minItems: 1,
              actions: ({ listSetter }) => {
                return {
                  component: 'Icon',
                  type: 'plus',
                  popup: {
                    autoRender: true,
                    children: {
                      component: 'DataList',
                      ref: (c) => {
                        fieldSelectorRef = c
                      },
                      vertical: true,
                      itemSelectable: {
                        byClick: true,
                        multiple: true,
                      },
                      gap: 'xsmall',
                      classes: { 'field-selector': true },
                      dataKey: 'field',
                      data: columns,
                      selectedKeys: initColumns.map(column => {
                        return column.field
                      }),
                      onItemSelected: ({ itemData }) => {
                        listSetter.appendItem(itemData)
                      },
                      onItemUnselected: ({ key }) => {
                        listSetter.removeItem(key)
                      },
                      itemRender: ({ itemData }) => {
                        return {
                          component: 'Flex',
                          justify: 'between',
                          gap: 'large',
                          items: [
                            {
                              children: itemData.title
                            },
                            {
                              component: 'Icon',
                              type: 'check-light'
                            }
                          ]

                        }
                      }
                    }
                  }
                }
              },
              onValueChange: ({ newValue }) => {
                gridRef.update({ columns: newValue })
              },
              onItemRemoved: ({ key }) => {
                fieldSelectorRef.unselectItem(key, { triggerUnselect: false })
              },
              itemForm: {
                fields: [
                  {
                    component: 'Textbox',
                    name: 'title',
                    label: '表头',
                  },
                  {
                    component: 'Numberbox',
                    name: 'width',
                    label: '宽度',
                  },
                  {
                    component: 'Select',
                    name: 'align',
                    label: '对齐方式',
                    options: [
                      { text: '左', value: 'left' },
                      { text: '中', value: 'center' },
                      { text: '右', value: 'right' },
                    ]
                  },
                ],
              },
              labelField: 'title',
              keyField: 'field',
              value: initColumns,
            },
          }
        }
      },
    }
  })
