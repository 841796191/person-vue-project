<template>
    <div>
        <!-- 顶部滑动条 mui-fullscreen 会导致滑动条占整个页面 -->
        
        <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
                    <!-- @click 在手机上调试会无效，改为 @tap ,tap 只能在 mui 中用 -->
					<a :class="['mui-control-item',item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
						{{ item.title }}
					</a>
				</div>
			</div>

		</div>



        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>


    </div>
</template>

<script>
//1.导入 mui 的 js 文件
import mui from '../../lib/mui/js/mui.js'

export default {
    data(){
        return {
            cates:[],//所有分类的列表数组
            list:[]//图片列表的数组
        }
    },
    created() {
        this.getAllCategory();
        //默认进入页面就主动请求所有图片列表的数据，全部图片的 id 为 0
        this.getPhotoListByCateId(0);
    },
    mounted() {//当组件中的 dom 结构渲染好并放到页面中后，会执行这个钩子函数
        //如果要操作元素，最后在 mounted 里面，因为这时候的 dom 元素是最新的

        //2.初始化滑动控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration:0.005//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小
        })
    },
    methods: {
        getAllCategory(){
            //获取所有的图片分类
            this.$http.get('api/getimgcategory').then(result=>{
                if(result.data.status===0){
                    //手动拼接处一个最完整的分类列表
                    // console.log(result.data.message)
                    result.data.message.unshift({title:"全部",id:0});
                    this.cates=result.data.message
                }
            })
        },


        getPhotoListByCateId(cateId){
            //根据分类 id 获取图片列表
            this.$http.get('api/getimages/'+cateId).then(result=>{
                // console.log(result)
                if(result.data.status===0){
                    this.list=result.data.message
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    *{
        touch-action: pan-y;//去除滑动条滑动的时候的警告， chrome 弄的标准
    }

    .photo-list{
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
        
        li{
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;

            img{
                width: 100%;
                vertical-align: middle;
            }

            img[lazy="loading"]{
                width: 40px;
                height: 300px;
                margin: auto;
            }


            .info{
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0;
                max-height: 84px;
                background-color: rgba(0,0,0,0.4);
                .info-title{
                    font-size: 14px;
                }

                .info-body{
                    font-size: 13px;
                }
            }
        }
    }


    
</style>