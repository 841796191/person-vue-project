<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{ newsinfo.title }}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
            <span>点击：{{ newsinfo.click }}次</span>
        </p>

        <hr>
        <!-- 内容区 -->
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论区 -->
        <!-- 父组件向子组件传递当前页面 id -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
// import axios from 'axios'
import { Toast } from 'mint-ui'

import comment from '../subcomponent/comment.vue'
export default {
    data(){
        return {
            id:this.$route.params.id,//将 URL 地址中传递过来的 id 值挂载到 data 上，方便调用
            newsinfo:{}
        }
    },
    created() {
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(result=>{
                if(result.data.status===0){
                    this.newsinfo=result.data.message[0];
                }else{
                    Toast("获取新闻详情失败")
                }
            })
        }
    },

    components:{
        "comment-box":comment
    }
}
</script>

<style lang="scss">
    .newsinfo-container{
        padding: 0 6px;
        .title{
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: black;
        }
        .subtitle{
            font-size: 13px;
            display: flex;
            justify-content: space-between;
        }
        .content{
            img{
                width: 100%//图片没有适应屏幕，需要把 scoped 去掉才有作用，样式都在 newsinfo-container 里面，
                //里面的样式解析后前面都带 newsinfo-container，不怕污染全局变量，只要我们不在其他地方使用同一变量名
            }
        }
    }
</style>