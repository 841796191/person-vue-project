<template>
    <div class="goodsdesc-container">
        <h3>{{ info.title }}</h3>

        <hr>

        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            info:{}
        }
    },

    created() {
        this.getGoodsDesc();
    },

    methods: {
        getGoodsDesc(){
            this.$http.get('api/goods/getdesc/'+this.$route.params.id).then(result=>{
                if(result.data.status===0){
                    this.info=result.data.message[0];
                }
            })
        }
    },
}
</script>

<style lang="scss" >
.goodsdesc-container{
    padding: 4px;
    h3{
        font-size: 16px;
        color: #222aff;
        text-align: center;
        margin: 15px 0;
    }

    .content{
        img{
            width: 100%;
        }
    }
}
</style>