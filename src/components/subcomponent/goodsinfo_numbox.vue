<template>
<!-- 由于父组件请求商品数据时是通过异步操作，所以传递给子组件的 max 会为 undefind -->
<!-- 我们可以用 watch 属性监听来监听父组件传递过来的 max 值，不管 watch 会被触发几次，最后一次肯定是一个合法的 max 数值 -->
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <!-- 通过 change 事件来监听购物车文本框的数值变化 -->
		<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
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
            //每当文本框的数据被修改的时候，立即把最新的数据通过事件调用传递给父组件
            this.$emit("getcount",parseInt(this.$refs.numbox.value))
        }
    },
    props:["max"],
    watch:{
        //设置 max 的最新值，防止父组件异步操作传递过来 undefined
        'max':function(newVal,oldVal){
            //使用 mui 的 JS API设置 numbox
            mui(".mui-numbox").numbox().setOption('max',mewVal)
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>