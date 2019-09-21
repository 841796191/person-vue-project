#这是一个vue项目
#练习项目

##git上传
##1.git add .
##2.git commit -m "提交信息"
##3.git push -u origin master

##制作首页App组件
##1.完成 header 区域，使用 mint-ui 中的 header 组件
##2.制作底部的 tabbar 区域，使用 tabbar.html
 +在制作购物车小图标的时候先把扩展图标的 css 样式拷贝到项目中
 +拷贝字体库 ttf 文件到项目中
 +为购物车小图标添加样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
##3.在中间区域放置一个 router-view 来展示路由匹配到的组件

##改造 tabbar 为 router-view

##设置路由高亮

##点击 tabbar 中的路由链接展示对应的路由组件

##制作首页轮播图

##加载首页轮播图数据
##1.获取数据，使用 axios 
##2.使用 axios 的 get 获取数据
##3.获取到的数据保存到 data 身上
##4.使用 v-for 循环渲染每个 item 项

##改造九宫格区域样式

##改造新闻资讯路由链接
##1.绘制页面，使用 MUI 中的 media-list.html
##2.使用 axios 获取数据
##3.渲染数据

##实现新闻资讯列表，点击跳转到新闻详情
##1.把列表中的每一项改造为 router-link ，同时在跳转的时候应该提供唯一的id标识符
##2.创建新闻详情的组件页面 NewsInfo.vue
##3.在路由模块中将新闻详情的路由地址和组件页面对应起来

##实现新闻详情的页面布局和数据渲染

##单独封装一个 comment.vue 评论子组件
##1.创建一个单独的 comment.vue 组件模板
##2.在需要使用 comment 组件的页面中，先手动导入 comment 组件
##+`import comment from './comment.vue'`
##3.在父组件张使用 components 属性，将刚才导入的 comment 组件组册为自己的子组件
##4.将注册子组件时的注册名称以标签形式在页面中引用

##获取所有评论数据显示到页面中

##实现点击加载更多评论的功能
##1.为加载更多按钮绑定点击事件，在事件中请求下一页数据
##2.点击加载更多，让 pageIndex++，然后重新调用 this.getComments() 方法重新获取下一页的数据
##3.为了防止新数据覆盖老数据，在点击加载更多获取新数据时应该让老数据调用数组的 concat 方法拼接上新数组

