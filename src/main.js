//入口文件
import Vue from 'vue'

//1.1导入路由
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)

//每次刚进入网站，肯定会调用 main.js ，在刚调用的时候，先从本地存储中把购物车的数据读出来放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')

//注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({
    state: { //this.$store.state.XXX
        car: [] //将购物车中的商品的数据用一个数字存储起来，在 car 数组中存储一些商品的的对象
            //对象设计 { id:商品id,count:购买数量,price:商品单价,selected:false }
    },

    mutations: { //this.$store.commit('方法名称','按需传递的唯一参数')
        addToCar(state, goodsinfo) {
            //点击加入购物车，把商品信息保存到 store 中的 car 上
            //注意
            //1.如果购物车中之前就已经有这个对应的商品，那么只需要更新数量
            //2.如果没有则直接把商品数据 push 到 car 中即可

            //假设在购物车没有找到对应的商品
            var flag = false;

            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true
                }
            })

            //如果最终循环结束的到的 flag 还是 false ，则把商品数据直接 push 到购物车中
            if (!flag) {
                state.car.push(goodsinfo)
            }

            //当更新 car 之后把 car 数组存储到 本地的 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car))
        },


        updateGoodsInfo(state, goodsinfo) {
            //修改购物车中商品的数量值
            state.car.some(item => {
                    if (item.id == goodsinfo.id) {
                        item.count = parseInt(goodsinfo.count)
                        return true
                    }
                })
                //当修改完商品数量后把最新的购物车数据保存到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },

        removeFormCar(state, id) {
            //根据 id 从 store 中的 购物车中删除对应的那条商品数据
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true;
                }
            })

            //将删除完毕后的最新购物车数据同步到本地存储
            localStorage.setItem('car', JSON.stringify(state.car))
        },

        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            })

            //把最新的所有购物车商品状态保存到 store 
            localStorage.setItem('car', JSON.stringify(state.car))
        }



    },

    getters: { //this.$store.getters.XXX
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count;
            })
            return c
        },

        getGoodsCount(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count;
            })
            return o
        },

        getGoodsSelected(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.selected;
            })
            return o
        },

        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, //勾选的数量
                amount: 0 //勾选的总价
            }

            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })

            return o
        }
    }
})







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
Vue.prototype.$http = axios;

//设置请求根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3005'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


//导入 mui 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//按需导入 mint-ui 中的组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
import 'mint-ui/lib/style.css'
// Vue.component(Header.name, Header)
//     //注册轮播图组件
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
//     //按钮
// Vue.component(Button.name, Button)
//     //懒加载,按需导入没有懒加载的小图标
// Vue.use(Lazyload)
import MintUI from 'mint-ui'
Vue.use(MintUI)

//安装图片预览插件
import VuePreView from 'vue-preview'
Vue.use(VuePreView)

//1.3导入自己的路由模块
import router from './router.js'

//导入 app 组件
import app from './app.vue'


var vm = new Vue({
    el: '#app',
    render: c => c(app),
    //1.4挂载路由对象到 vm 实例
    router,
    store //挂载 store 状态管理对象

})