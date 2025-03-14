export { default as Alert } from './Alert/index'
export { default as Anchor } from './Anchor/index'
export { default as AnchorContent } from './AnchorContent/index'
export { default as App } from './App/index'
export { default as Router } from './App/Router'
export { default as AutoComplete } from './AutoComplete/index'
export { default as Avatar } from './Avatar/index'
export { default as AvatarGroup } from './AvatarGroup/index'
export { default as BackTop } from './BackTop/index'
export { default as Badge } from './Badge/index'
export { default as Breadcrumb } from './Breadcrumb/index'
export { default as Button } from './Button/index'
export { default as Caption } from './Caption/index'
export { default as Carousel } from './Carousel/index'
export { default as Cascader } from './Cascader/index'
export { default as Checkbox } from './Checkbox/index'
export { default as CheckboxList } from './CheckboxList/index'
export { default as CheckboxTree } from './CheckboxTree/index'
export { default as Collapse } from './Collapse/index'
export { default as ColorPicker } from './ColorPicker/index'
export { default as Cols } from './Cols/index'
export { default as Component, n } from './Component/index'
export { default as Confirm } from './Confirm/index'
export { default as Container } from './Container/index'
export { default as Countdown } from './Countdown/index'
export { default as DataList } from './DataList/index'
export { default as DatePicker } from './DatePicker/index'
export { default as DateRangePicker } from './DateRangePicker/index'
export { default as Divider } from './Divider/index'
export { default as Drawer } from './Drawer/index'
export { default as Dropdown } from './Dropdown/index'
export { default as Ellipsis } from './Ellipsis/index'
export { default as Empty } from './Empty/index'
export { default as Field } from './Field/index'
export { default as Flex } from './Flex/index'
export { default as Form } from './Form/index'
export { default as Grid } from './Grid/index'
export { default as Group } from './Group/index'
export { default as GroupGrid } from './GroupGrid/index'
export { default as GroupList } from './GroupList/index'
export { default as GroupTree } from './GroupTree/index'
export { default as Icon } from './Icon/index'
export { default as IconPicker } from './IconPicker/index'
export { default as Image } from './Image/index'
export { default as Layer } from './Layer/index'
export { default as Layout } from './Layout/index'
export { default as List, ListItemMixin } from './List/index'
export { default as ListSetter } from './ListSetter/index'
export { default as Loading } from './Loading/index'
export { default as MaskInfo } from './MaskInfo/index'
export { default as MaskInfoField } from './MaskInfoField/index'
export { default as Menu } from './Menu/index'
export { default as Message } from './Message/index'
export { default as Modal } from './Modal/index'
export { default as MultilineTextbox } from './MultilineTextbox/index'
export { default as Navbar } from './Navbar/index'
export { default as Notification } from './Notification/index'
export { default as Numberbox } from './Numberbox/index'
export { default as NumberInput } from './NumberInput/index'
export { default as NumberSpinner } from './NumberSpinner/index'
export { default as Pager } from './Pager/index'
export { default as Panel } from './Panel/index'
export { default as PartialDatePicker } from './PartialDatePicker/index'
export { default as PartialDateRangePicker } from './PartialDateRangePicker/index'
export { default as Password } from './Password/index'
export { default as Popconfirm } from './Popconfirm/index'
export { default as Popup } from './Popup/index'
export { default as Progress } from './Progress/index'
export { default as RadioList } from './RadioList/index'
export { default as Rate } from './Rate/index'
export { default as Result } from './Result/index'
export { default as Rows } from './Rows/index'
export { default as Scrollbar } from './Scrollbar/index'
export { default as Select } from './Select/index'
export { default as Skeleton } from './Skeleton/index'
export { default as SlideCaptcha } from './SlideCaptcha/index'
export { default as Slider } from './Slider/index'
export { default as Spinner } from './Spinner/index'
export { default as StaticText } from './StaticText/index'
export { default as Statistic } from './Statistic/index'
export { default as Steps } from './Steps/index'
export { default as Switch } from './Switch/index'
export { default as Table } from './Table/index'
export { default as Tabs } from './Tabs/index'
export { default as Tag } from './Tag/index'
export { default as Textbox } from './Textbox/index'
export { default as Timeline } from './Timeline/index'
export { default as TimePicker } from './TimePicker/index'
export { default as TimeRangePicker } from './TimeRangePicker/index'
export { default as Toolbar } from './Toolbar/index'
export { default as Tooltip } from './Tooltip/index'
export { default as Tour } from './Tour/index'
export { default as Transfer } from './Transfer/index'
export { default as Tree } from './Tree/index'
export { default as TreeSelect } from './TreeSelect/index'
export { default as Upload } from './Upload/index'
export { default as Uploader } from './Uploader/index'
export * as utils from './util/index'
export { default as RuleManager } from './util/rule-manager'
export { default as Watermark } from './Watermark/index'

/**
 * nomui的插件机制
 * @param {install:(nomui)=>{}} plugin
 * @description plugin必须包含一个install对象
 */
export function use(plugin) {
  plugin.install(this)
}
