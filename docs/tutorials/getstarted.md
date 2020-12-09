# 起步
nomui 是组件式，面向对象编程的 web 界面框架。
## 浏览器引入
在浏览器中使用 `script` 和 `link` 标签直接引入文件，并使用全局变量 `nomui`。
```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- nomui css -->
    <link href="nomui.min.css" rel="stylesheet">

    <title>Hello, world!</title>
  </head>
  <body>
    <div id="container"></div>

    <!-- nomui js -->
    <script src="nomui.min.js"></script>

    <!-- use nomui -->
    <script>
        new nomui.Component({reference:document.getElementById('container'), children:'Hello, world!'})
    </script>
  </body>
</html>
```
## 渲染文本
## 添加样式
## 响应事件
## 层次结构
## 做一个按钮
## 使用内置组件