#这是一个vue项目
#练习项目

##git上传
##1.git add .
##2.git commit -m "提交信息"
##3.git push -u origin master

## 制作首页App组件
##1.完成 header 区域，使用 mint-ui 中的 header 组件
##2.制作底部的 tabbar 区域，使用 tabbar.html
 +在制作购物车小图标的时候先把扩展图标的 css 样式拷贝到项目中
 +拷贝字体库 ttf 文件到项目中
 +为购物车小图标添加样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
##3.在中间区域放置一个 router-view 来展示路由匹配到的组件

##改造 tabbar 为 router-view

##设置路由高亮

## 点击 tabbar 中的路由链接展示对应的路由组件

## 制作首页轮播图

## 加载首页轮播图数据
##1.获取数据，使用 axios 
##2.使用 axios 的 get 获取数据
##3.获取到的数据保存到 data 身上
##4.使用 v-for 循环渲染每个 item 项

## 改造九宫格区域样式

## 改造新闻资讯路由链接
##1.绘制页面，使用 MUI 中的 media-list.html
##2.使用 axios 获取数据
##3.渲染数据

## 实现新闻资讯列表，点击跳转到新闻详情
##1.把列表中的每一项改造为 router-link ，同时在跳转的时候应该提供唯一的id标识符
##2.创建新闻详情的组件页面 NewsInfo.vue
##3.在路由模块中将新闻详情的路由地址和组件页面对应起来

## 实现新闻详情的页面布局和数据渲染

##单独封装一个 comment.vue 评论子组件
##1.创建一个单独的 comment.vue 组件模板
##2.在需要使用 comment 组件的页面中，先手动导入 comment 组件
##+`import comment from './comment.vue'`
##3.在父组件张使用 components 属性，将刚才导入的 comment 组件组册为自己的子组件
##4.将注册子组件时的注册名称以标签形式在页面中引用

##获取所有评论数据显示到页面中

## 实现点击加载更多评论的功能
##1.为加载更多按钮绑定点击事件，在事件中请求下一页数据
##2.点击加载更多，让 pageIndex++，然后重新调用 this.getComments() 方法重新获取下一页的数据
##3.为了防止新数据覆盖老数据，在点击加载更多获取新数据时应该让老数据调用数组的 concat 方法拼接上新数组

## 发表评论
##1.把文本框做双向数据绑定
##2.为发表按钮绑定一个事件
##3.校验评论内容是否为空，如果为空，提示用户
##4.通过 axios 发生请求，把评论数据发送到服务器
##5.当发表评论后重新刷新列表
 ##+如果调用 getcomponents 方法重新刷新评论列表，可能只能得到最后一页的评论，前几页的评论得不到
 ##+当评论成功后，在客户端手动拼接出一个最新得评论对象，然后调用数组得 unshift 方法，把最新评论追加到 data 中 comments 的开头，实现刷新评论列表的需求


 ## 改造图片分享按钮为路由链接并显示对应的组件页面

 ## 绘制图片列表组件页面结构并美化样式
 ##1.制作顶部滑动条
 ##2.制作底部的图片列表
### 制作顶部滑动条的坑
##1.需要借助 mui 中的 tab-top-webview-main.html
##2.需要把 slider 区域的 mui-fullscreen 类去掉
##3.滑动条无法正常触发滑动，是js组件，需要被初始化
  +导入 mui.js
  +调用官方提供的方式去初始化
  `mui('.mui-scroll-wrapper').scroll({
      deceleration:0.005//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小
  })`
##4.初始化滑动条的时候导入的 mui.js 控制台报错:`TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them`
  +这是因为 mui.js 中用到了 'caller','callee','arguments'，但是 webpack 打包好的 bundle.js 中，默认启用严格模式，导致两者冲突
  +解决方案:把 webpack 打包时候的严格模式禁用掉
  +使用 babel-plugin-transform-remove-strict-mode 插件移除 webpack 的严格模式

##5刚进入图片分享页面的时候，滑动条无法正常工作，需等 dom 元素加载完毕，所以把 初始化滑动条的代码写到 mounted 生命周期函数中

##6.滑动条调试好后，tabbar 无法正常工作，需要把每个 tabbar 按钮的样式中的`mui-tab-item`重新改名

##7.获取所有分类并渲染分类列表

### 制作图片列表区域
##1.图片列表需要使用懒加载技术，可以使用 mint-ui 提供的现成组件`lazy-load`
##2.渲染图片列表数据

### 实现了图片列表的懒加载和样式美化

## 实现了点击图片跳转到图片详情页
##1.在改造 li 成 router-link 时使用 tag 属性指定渲染成哪种元素

##实现详情页面的布局和美化，同时获取数据渲染页面

##实现图片详情中缩略图的功能
##1.使用插件 vue-preview
##2.获取到所有图片列表，然后使用 v-for 指令渲染数据
##3.img 上的 class 不能去掉
##4.每个图片数据对象中必须有 width 和 height 属性

## 绘制商品列表