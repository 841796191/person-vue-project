<template>

    <div class="mui-numbox" data-numbox-min='1' style="height:25px" >
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <!-- 通过 change 事件来监听购物车文本框的数值变化 -->
		<input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox"/>
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
//bug:GoodsInfo 页面刷新一次后加的数量点一次加2，刷2次点一次加3
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted() {
        //初始化数字选择框组件
        mui('.mui-numbox').numbox();
    },
    methods: {
        countChanged(){
            //数量改变了
            //每当数量值改变，则立即把最新的数量同步到购物车的 store 中，覆盖之前的数量值
            this.$store.commit('updateGoodsInfo',{
                id:this.goodsid,
                count:this.$refs.numbox.value
            })
        }
    },
    props:["initcount","goodsid"]
   
}
</script>

<style lang="scss" scoped>
    
</style>