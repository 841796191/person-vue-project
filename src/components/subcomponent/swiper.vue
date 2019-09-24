<template>
    <div>

        <mt-swipe :auto='4000'>
            <!-- 谁使用轮播图组件，谁为我们传递 lunbotuList -->
            <!-- 此时 lunbotoList 应该是父组件向子组件传值来设置 -->
            <mt-swipe-item v-for="item in lunbotuList" :key='item.id'>
                <!-- src 的属性只是普通字符串，需要加 ：才能计算 item.img 里面的地址 -->
                <img :src="item.img" alt="" :class="{ 'full':isfull }">
            </mt-swipe-item>
        </mt-swipe>

        <!-- 分析：为什么商品评论中的轮播图那么丑 -->
        <!-- 1.首页中的图片宽和高都使用了 100% 的宽度 -->
        <!-- 2.在商品详情页面中，轮播图的图片如果也使用宽高为 100% 的话，页面不好看 -->
        <!-- 3.商品详情页面中的轮播图，期望 高度是100%，宽带自适应 -->
        <!-- 4.首页中的轮播图和商品详情的轮播图分歧点是 宽带到底是 100% 还是自适应 -->
        <!-- 5.让轮播图调用者手动指定是否为 100% 的宽度 -->
    </div>
</template>

<script>
export default {
    props:["lunbotuList","isfull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 200px;

    .mint-swipe-item{//scss 语法，选中某个元素
        
        text-align: center;

        img{
            // width: 100%;
            height: 100%;
        }
    }
}

.full{
    width: 100%;
}
</style>