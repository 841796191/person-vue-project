<template>
    <div class="app-container">
        <!-- 顶部 header 区域 -->
        <mt-header fixed title="Vue项目"></mt-header>
        
       
        <!-- 中间路由区域 -->
        <transition>
            <router-view></router-view>
        </transition>
        



       <!-- 底部 tabbar 区域 -->
       <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-lds" to="/home">
                <span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
            </router-link>
            
			<router-link class="mui-tab-item-lds" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
            </router-link>

            <router-link class="mui-tab-item-lds" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge" id="badge">0</span>
                </span>
				<span class="mui-tab-label">购物车</span>
            </router-link>
			
			<router-link class="mui-tab-item-lds" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>


    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
    .mint-header{
        z-index: 99;
    }
    .app-container{
        padding-top: 40px;//把内容挤下来，不然最前面的内容会被 header 挡住
        padding-bottom: 50px;//把内容顶上去，不然最下面的内容会被 tarbar 挡住
        overflow-x: hidden;//隐藏页面转场时出现的滚动条
    }




    .v-enter{
        opacity: 0;
        transform: translateX(100%);
    }

    .v-leave-to{//让页面从左边离开，不能跟 v-enter 写一起，不然页面会右边进右边出
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;//让一个页面离开的时候另一个页面平滑的进场，而不是从下往上飘上去
        //若设置 position 后页面跳转有细微抖动可在 v-leave-to 里面设置 top:40px;
    }


    .v-enter-active,
    .v-leave-active{
        transition: all 0.5s ease;
    }


    // 该类名，解决 tabbar 点击无法切换的问题
.mui-bar-tab .mui-tab-item-lds.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-lds {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-lds .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-lds .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>