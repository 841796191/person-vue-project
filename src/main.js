//入口文件
import Vue from 'vue'

//1.1导入路由
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)

//2.1导入 axios
import Axios from 'axios'
//2.2安装 axios
Vue.use(Axios)



//导入 mui 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//按需导入 mint-ui 中的组件
import { Header, Swipe, SwipeItem } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)
    //注册轮播图组件
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

//1.3导入自己的路由模块
import router from './router.js'

//导入 app 组件
import app from './app.vue'


var vm = new Vue({
    el: '#app',
    render: c => c(app),
    //1.4挂载路由对象到 vm 实例
    router

})