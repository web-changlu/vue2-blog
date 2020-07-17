<template>
    <el-col :xs="0" :sm="1" :md="6" class="hidden-sm-and-down" :style="{marginTop:'4rem'}">
                <div class="search">
                     <form>
                         <input placeholder="关键词" v-model="searchKey" class="searchKey">
                         <button class="el-icon-search searchBtn"></button>
                     </form>
                </div>
                <div class="suiji">
                    <h4>随机推荐</h4>
                    <ul class="clear">
                        <li v-for="item in suiJiTuiJian" :key="item.article_id">
                                <router-link :to="`/home/article/${item.article_id}`">
                                <p class="suijititle">{{item.article_title}}</p>
                                <p class="suijiyuedu">阅读({{item.article_views}})</p>
                                <div class="suijicover">
                                    <el-image
                                    :src="item.article_cover"
                                    fit='none'></el-image>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="commentBox">
                    <h4>最新评论</h4>
                    <ul class="clear">
                        <li v-for="item in zuiXingPingLun" :key="item.comment_id"><router-link :to="`/home/article/${item.article_id}`">
                            <div class="avatar">
                                <img :src="item.user_profile_photo" alt="">
                            </div>
                            <div class="comtext">
                                <p> <span>{{item.user_name}}</span> {{item.comment_date | filterDate}}说</p>
                                <p>{{item.comment_content | filterArt}}</p>
                            </div>
                        </router-link></li>
                    </ul>
                </div>
            </el-col>
</template>

<script>
export default {
  data () {
    return {
      searchKey: '',
      suiJiTuiJian: [],
      zuiXingPingLun: [],
      //   fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'http://localhost:90/uploads/articlecover.jpg'
    }
  },
  created () {
    this.getZuiXingPingLunList()
    this.getSuiJiTuiJian()
  },
  methods: {
    async getZuiXingPingLunList () {
      const { data: res } = await this.$http.get('/home/newcom')
      console.log(res)
      if (res.meta.status !== 200) { this.$message.error(res.meta.msg) }
      this.zuiXingPingLun = res.data
    },
    async getSuiJiTuiJian () {
      const { data: res } = await this.$http.get('/home/sjtj')
      console.log(res)
      if (res.meta.status !== 200) { this.$message.error(res.meta.msg) }
      this.suiJiTuiJian = res.data
    }
  }
}
</script>

<style lang="less" scoped>
// 第三列
.search{
    position: relative;
    padding: 20px 12px;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    form{
        overflow: hidden;
        .searchKey,.searchBtn{
        display: block;
        float: left;
        box-sizing: border-box;
    }
    .searchKey{
        width: 75%;
        height: 34px;
        color: #666;
        border: 1px solid #ddd;
        border-right: 0 none;
        padding: 5px 5px 5px 10px;
    }
    .searchBtn{
        width: 25%;
        height: 34px;
        border: 0 none;
        background-color: #409EFF;
        opacity: 0.85;
    }
    }

}
.suiji{
    background-color: #fff;
    padding: 15px 20px;
    margin-bottom: 20px;
    h4{
        margin-bottom: 5px;
        border-bottom: 2px solid #409eff;
        font-size: 20px;
        float: left;
    }
    li{
        position: relative;
        height: 60px;
        padding: 10px 0;
        &:nth-child(n+2){
            border-top: 1px solid #f0f0f0;
        }
        &:hover{
            background-color: #F8FCFE;
        }
        p{
            float: left;
            clear: both;
            line-height: 20px;
            display: block;
        }
        a p:nth-child(1){
            width: 66.66%;
            font-size: 14px;
            color: #444;
            &:hover{
                color: #409eff;
            }
        }
        a p:nth-child(2){
            font-size: 12px;
            color: #999;
        }
        a .suijicover{
            // display: inline-block;
            width: 28%;
            margin-left: 10px;
            height: 100%;
            overflow: hidden;
        }
    }
}
.commentBox{
    padding: 15px 20px;
    margin-bottom: 20px;
    background-color: #fff;
    overflow: hidden;
    h4{
        margin-bottom: 5px;
        font-size: 20px;
        border-bottom: 2px solid #409eff;
        float: left;
    }
    li{
        padding: 10px 0;
        &:nth-child(n+2){
            border-top: 1px solid #f0f0f0;
        }
        a{
            display: block;
            .avatar{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                float: left;
            }
            .comtext{
                // height: 40px;
                line-height: 20px;
                padding-left: 50px;
                font-size: 12px;
                color: #999;
                span{
                    color: #666;
                    margin-right: 5px;
                }
            }
        }
    }
}
</style>
