//入口文件
import Vue from 'vue'

//1.1导入路由
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)

//导入格式化时间的插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})




//2.1导入 axios
import axios from 'axios'
//2.2安装 axios
Vue.use(axios)

//设置请求根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3005'

//导入 mui 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//按需导入 mint-ui 中的组件
import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)
    //注册轮播图组件
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
    //按钮
Vue.component(Button.name, Button)


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