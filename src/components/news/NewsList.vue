<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<!-- to 加上v-bind才能计算 item.id ，所以需要给/home/newsinfo 加上 '' 来跟 item.id 拼接，最后再交给 to -->
                    <router-link :to="'/home/newsinfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{ item.title }}
							<p class='mui-ellipsis'>
                                <span>发表时间：{{ item.add_time | dateFormat }}</span>
                                <span>点击：{{ item.click }}次</span>
                            </p>
						</div>
					</router-link>
				</li>
		</ul>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            newslist:[]
        }
    },
    created() {
        this.getNewsList()
    },
    methods: {
        getNewsList(){
            axios.get('api/getnewslist').then(result=>{
                // console.log(result)
                if(result.data.status===0){
                    this.newslist=result.data.message
                }else{
                    Toast('获取新闻列表失败！')
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .mui-table-view{
        li{
            h1{font-size: 14px}
            .mui-ellipsis{
                font-size: 12px;
                color: #222aff;
                display: flex;
                justify-content: space-between;//flex 布局，space-between  两端对齐
            }
        }
    }
</style>