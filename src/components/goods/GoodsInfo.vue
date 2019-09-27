<template>
    <div class="goodsinfo-container">

        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 商品轮播图区域 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
				</div>
			</div>
		</div>



        <!-- 商品购买区域 -->
        <div class="mui-card">
			<div class="mui-card-header">{{ goodsinfo.title }}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
                        市场价:<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价:<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
                    </p>
                    <!-- max 是把物品库存量传递给子组件，修改购物车文本框的购买上限 -->
                    <p>购买数量:
                        <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar()">加入购物车</mt-button>
                    </p>
				</div>
			</div>
		</div>



        <!-- 商品参数区域 -->
        <div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号:{{ goodsinfo.goods_no }}</p>
                    <p>库存情况:{{ goodsinfo.stock_quantity }}</p>
                    <p>上架时间:{{ goodsinfo.add_time | dateFormat }}</p>
				</div>
			</div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
		</div>


    </div>
</template>

<script>
import swiper from '../subcomponent/swiper.vue'
//导入数字选择框组件
import numbox from '../subcomponent/goodsinfo_numbox.vue'
export default {
    data(){
        return {
            id:this.$route.params.id,//将路由参数对象中的 id 挂载到 data 上
            lunbotu:[],//轮播图数据
            goodsinfo:{},//获取商品信息
            ballFlag:false,//控制小球隐藏和显示
            selectdCount:1,//保存用户选中的商品数量，默认为1个
        }
    },

    created() {
        this.getLunbotu();
        this.getGoodsInfo();
    },

    methods: {
        getLunbotu(){
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if(result.data.status===0){
                    //先循环轮播图数组的每一项，为 item 添加 img 属性，因为轮播图组件中只识别 item.img ,不能识别 item.src
                    result.data.message.forEach(item => {
                        item.img=item.src;
                    });
                    this.lunbotu=result.data.message;
                }
            })
        },

        getGoodsInfo(){
            this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                if(result.data.status===0){
                    this.goodsinfo=result.data.message[0]
                }
            })
        },

        goDesc(id){
            //编程式导航，跳转图文介绍页面
            this.$router.push({ name:'goodsdesc',params:{ id } })
        },

        goComment(id){
            //点击跳转评论页面
            this.$router.push({ name:'goodscomment',params:{ id } })
        },

        addToShopCar(){
            //添加到购物车
            this.ballFlag=!this.ballFlag;

            //{ id:商品id,count:购买数量,price:商品单价,selected:false }
            //拼接出一个要保存到 store 中 car 数组里的商品信息对象
            var goodsinfo={
                id:this.id,
                count:this.selectdCount,
                price:this.goodsinfo.sell_price,
                selected:true
            };
            //调用 store 中的 mutations 来将商品加入购物车
            this.$store.commit("addToCar",goodsinfo)

        },

        beforeEnter(el){
            //translate(0,0) 是设置小球绝对定位后的位置为（0，0）
            el.style.transform="translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;

            //小球动画思路分析
            //1.动画不准确的原因：小求最终位移的位置已经局限在了某一分辨率下的滚动条未滚动的情况下
            //2.只有分辨率和测试时不一样，或者滚动条有一定的滚动距离后，问题就会出现
            //3.因此，不能把位置的横纵坐标直接写死了，而是应该根据不同情况动态计算坐标值
            //4.解决：先得到徽标的横纵坐标，再得到小球的横纵坐标，然后让两者的横纵坐标求差得到的结果就是横纵坐标要位移的距离
            //5.获取徽标和小球的位置  domObject.getBoundingClientRect()

            //获取小球在页面的位置
            const ballPosition=this.$refs.ball.getBoundingClientRect();
            //获取徽标在页面中的位置
            const badgePosition=document.getElementById("badge").getBoundingClientRect();

            const xDist=badgePosition.left-ballPosition.left;
            const yDist=badgePosition.top-ballPosition.top;


            el.style.transform=`translate(${xDist}px,${yDist}px)`;
            //ease 是动画效果，cubic-bezier 是贝塞尔曲线效果，可以写在 ease 位置上
            el.style.transition="all 0.5s cubic-bezier(.4,-0.3,1,.68)";
            done()
        },
        afterEnter(el){
            this.ballFlag=!this.ballFlag;
        },


        getSelectedCount(count){
            //当子组件把选中的数量传递给父组件的时候，把选中的值保存到 data 上
            this.selectdCount=count;
            // console.log("父组件拿到的数量值为："+this.selectdCount);
        }
    },

    components:{
        swiper,
        numbox
    }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;

    .now_price{
        color: red;
        font-size:16px;
        font-weight:bold;
    }

    .mui-card-footer{
        display: block;

        button{
            margin: 15px 0;
        }
    }

    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        top:390px;
        left: 140px;
        z-index: 99;
    }
}
</style>