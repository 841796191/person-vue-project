<template>
    <div class="cmt-container">
        <h4>发表评论</h4>
        <hr>
        <textarea name="" placeholder="请输入要BB的内容(最多BB120字)" cols="20" rows="5" maxlength="120"></textarea>

        <mt-button type="primary" size="large">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间:{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content ==='undefined'?'此用户很懒，啥都没说':item.content}}
                </div>
            </div>
        </div>


        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            pageIndex:1,//默认展示第一页数据
            comments:[]
        }
    },
    created() {
        this.getComments()
    },
    methods: {
        getComments(){//获取评论
            axios.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(result=>{
                // console.log(result)
                if(result.data.status===0){
                    // this.comments=result.data.message
                    //每当获取新评论数据的时候，不用把老数据清空覆盖，而是拼接在一起
                    this.comments=this.comments.concat(result.data.message)
                }else{
                    Toast('获取评论失败！')
                }
            });
        },

        getMore(){
            this.pageIndex++;
            this.getComments();
        }
    },   
    props:["id"]
}
</script>

<style lang="scss" scoped>
    .cmt-container{
        h4{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            margin: 5px 0;
            .cmt-item{
                font-size: 13px;
                .cmt-title{
                    padding-left: 2px;
                    line-height: 30px;
                    background-color: #ccc;
                }
                .cmt-body{
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>