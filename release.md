# 自动发布流程

1. 修改 package.json 中的 version
2. main 分支上提交一个 tag 建议：v+版本号

> 说明 main 上提交 tag 会触发 github 的 actions，actions 里面会获取 package.json 中的 version 作为包的版本进行发布，建议 tag 跟版本保持一致，以 v 开头
