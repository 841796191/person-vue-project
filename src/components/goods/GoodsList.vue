<template>
    <div class="goods-list">
        <!-- 声明式导航--通过标签进行跳转 -->
        <!-- <router-link  class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </router-link> -->

        <!-- 编程式导航--通过使用 window.localtion.href 的形式进行跳转 -->
        <div  class="goods-item" v-for="item in goodslist" :key="item.id" @click="getDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>
    
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            pageindex:1,//分页页数
            goodslist:[]//存放商品列表
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList(){
            //获取商品列表
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
                // console.log(result)
                if(result.data.status===0){
                    // this.goodslist=result.data.message;
                    this.goodslist=this.goodslist.concat(result.data.message)
                }
            })
        },

        getMore(){
            this.pageindex++;
            this.getGoodsList();
        },

        getDetail(id){
            //使用 js 的形式进行路由导航
            //区分好 this.$route 和 this.$router 这两个对象
            //this.$route 是路由参数对象，所有路由中的参数，params 和 query 都属于它
            //this.$router 是一个路由导航对象，用它可以方便的使用 js 代码实现路由的前进和后退，跳转到新的 url 地址
            
            //1.最简单的
            // this.$router.push("/home/goodsinfo/"+id);
            //2.传递对象的
            // this.$router.push({path:'/home/goodsinfo/'+id})
            //3.传递命名路由,这种方法需在路由组件里面对应的路由里面使用 name 属性与这里的 name 属性相对应
            this.$router.push({name:"goodsinfo",params:{ id } })
            
        }
    },
}
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        margin: 4px 0;

        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;

            img{
                width: 100%
            }

            .title{
                font-size: 14px;
            }

            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .price{
                    .now{
                        color: red;
                        font-weight:bold;
                        font-size:16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }

                .sell{
                    display: flex;
                    font-size: 13px;
                    justify-content: space-between;
                }
            }
        }
    }
</style>