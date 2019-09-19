#这是一个vue项目
#练习项目

##git上传
1.git add .
2.git commit -m "提交信息"
3.git push -u origin master

##制作首页App组件
1.完成 header 区域，使用 mint-ui 中的 header 组件
2.制作底部的 tabbar 区域，使用 tabbar.html
 +在制作购物车小图标的时候先把扩展图标的 css 样式拷贝到项目中
 +拷贝字体库 ttf 文件到项目中
 +为购物车小图标添加样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3.在中间区域放置一个 router-view 来展示路由匹配到的组件

##改造 tabbar 为 router-view

##设置路由高亮

##点击 tabbar 中的路由链接展示对应的路由组件

##制作首页轮播图

##加载首页轮播图数据
1.获取数据，使用 axios 
2.使用 axios 的 get 获取数据
3.获取到的数据保存到 data 身上
4.使用 v-for 循环渲染每个 item 项

##改造九宫格区域样式