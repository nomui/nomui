# 自动发布流程

1. 切换到 main 分支，拉取最新代码
2. 执行 `npm run release`，会自动更新小版本号，如果是更新次级版本号则执行`npm run release -- --release-as minor`，生成对应的 changelog
3. 在 main 分支手动提交一个 tag，触发 publish 工作流`git push origin v+版本号`
4. workflow 实时工作情况可以在 https://github.com/nomui/nomui/actions 查看

> 说明 main 上提交 tag 会触发 github 的 actions，actions 里面会获取 package.json 中的 version 作为包的版本进行发布，建议 tag 跟版本保持一致，以 v 开头
