# 自动发布流程

1. 执行 npm run release -- --prerelease alpha，会自动发布一个 alpha 版本并更新版号，生成对应的 changelog
2. 发 pull request，merge 到 main
3. 切换到 main 分支，拉取最新代码，提交一个 tag 建议：v+版本号(git push origin v+版本号)
4. workflow 实时工作情况可以在 https://github.com/nomui/nomui/actions 查看

> 说明 main 上提交 tag 会触发 github 的 actions，actions 里面会获取 package.json 中的 version 作为包的版本进行发布，建议 tag 跟版本保持一致，以 v 开头
