<template>
    <div class="shopcar-container">
        <div class="goods-list">

            <!-- 商品列表区域 -->
            <div class="mui-card" v-for="( item,i ) in goodslist" :key="item.id">
			    <div class="mui-card-content">
				    <div class="mui-card-content-inner">
                        <!-- getGoodsSelected 返回一个对象，通过 item.id 读取出 selected 状态 -->
						<mt-switch 
                            v-model="$store.getters.getGoodsSelected[item.id]"
                            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])">
                        </mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                
                                <!-- 如何从购物车中获取商品的数量 -->
                                <!-- 1.先创建一个空对象，然后循环购物车中所有商品的数据，把当前循环
                                    这件商品的 id 作为对象的属性名，count 值作为对象的属性值，这样所有商品
                                    循环一遍就会得到一个对象：{ id : count }-->
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- i 是用来删除 goodsinfo 中的数据，item.id 是用来删除 store 中的数据 -->
                                <a href="" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
				    </div>
			    </div>
		    </div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
					<div class="left">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件，
                        总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span> </p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
				</div>
			</div>
		</div>



    </div>
</template>

<script>
import numbox from '../subcomponent/shopcar_numbox.vue'

export default {
    data(){
        return {
            goodslist:[]//存储商品中所有商品数据
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        //getGoodsList 作用：拿 store 中的 car 的数据 id 去请求具体数据再渲染到页面
        getGoodsList(){
            //1.获取到 store 中所有商品的 id，然后拼接处一个用逗号分隔的字符串
            var idArr=[];
            this.$store.state.car.forEach(item => idArr.push(item.id));
            console.log(idArr)
            //如果购物车中没有商品，则直接返回，不需要请求数据接口
            if(idArr.length<=0){
                return;
            }
            //获取商品购物车列表
            this.$http.get('api/goods/getshopcarlist/'+idArr.join(",")).then(result=>{
                if(result.data.status===0){
                    this.goodslist=result.data.message;
                }
            })
        },

        remove(id,index){
            //点击删除，把商品从 store 中根据传递的 id 删除，同时把当前组件中的 goodsinfo 中的对
            //应要删除的那个商品使用 index 来删除
            this.goodslist.splice(index,1);
            this.$store.commit('removeFormCar',id)
        },

        selectedChanged(id,val){
            //每当点击开关，把最新的开关状态同步到 store 中
            // console.log(id+"-----"+val);
            this.$store.commit("updateGoodsSelected",{ id,selected:val });
        }

    },
    components:{
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .shopcar-container{
        background-color: #eee;
        overflow: hidden;

        .goods-list{

            .mui-card-content-inner{
                display: flex;
                align-items: center;
            }

            img{
                width: 60px;
                height: 60px;
            }

            h1{
                font-size: 13px;
            }

            .info{
                display:flex;
                flex-direction: column;
                justify-content: space-between;

                .price{
                    color: red;
                }
            }
        }

        .jiesuan{
            display:flex;
            justify-content: space-between;//左右对齐
            align-content: center;//上下居中

            .red{
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>