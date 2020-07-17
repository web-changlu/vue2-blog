<template>
  <el-col :xs="24" :sm="17" :md="14" :style="{marginTop:'4rem'}">
      <div class="article">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{articleData.sort_name?articleData.sort_name:'分类'}}</el-breadcrumb-item>
          <el-breadcrumb-item>文章详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div v-for="item in articleData" :key="item.article_id">
          <h2><a href="#">{{item.article_title}}</a></h2>
        <div class="tag">
          <el-tag effect="plain" size="mini">标签一</el-tag>
          <el-tag effect="plain" size="mini">标签一</el-tag>
          <el-tag effect="plain" size="mini">标签一</el-tag>
        </div>
        <div class="meta">
          <span>{{item.user_name}} 发布于{{item.article_date | filterDate}}</span>
          <span>分类: {{item.sort_name}}</span>
          <span>阅读({{item.article_views}}) 评论({{item.article_comment_count}})</span>
          <span>👍赞({{item.article_like_count}})</span>
        </div>
        {{item.article_content}}
        </div>
      </div>
      <div class="comment">
        <el-input
          type="textarea"
          placeholder="我有一个大胆的想法..."
          v-model="commentText"
          maxlength="30"
          show-word-limit
        >
        </el-input>
        <el-button size="small">提交评论</el-button>
      </div>
      <div class="commentBox" v-show="pingLunData[0]">
          <h4>全部评论</h4>
          <ul class="clear">
              <li v-for="item in pingLunData" :key="item.comment_id">
                <router-link :to="`/home/article/${item.article_id}`">
                  <div class="avatar">
                      <img :src="item.user_profile_photo" alt="">
                  </div>
                  <div class="comtext">
                      <p> <span>{{item.user_name}}</span> {{item.comment_date}}说</p>
                      <p>{{item.comment_content}}</p>
                  </div>
                </router-link></li>
          </ul>
      </div>
      <Hot/>
  </el-col>
</template>

<script>
import Hot from '../hot/Hot.vue'
export default {
  data () {
    return {
      commentText: '',
      articleData: {},
      pingLunData: [
      ],
      aId: 1118
    }
  },
  components: {
    Hot
  },
  methods: {
    async getArt (aId) {
      const { data: res } = await this.$http.get('/home/art', {
        params: {
          aId: aId
        }
      })
      console.log(res)
      if (res.meta.status !== 200) { this.$message.error(res.meta.msg) }
      this.articleData = res.data
    },
    async getCom (articleId) {
      const { data: res } = await this.$http.get('/home/comments', {
        params: {
          articleId: articleId
        }
      })
      console.log(res)
      if (res.meta.status !== 200) { this.$message.error(res.meta.msg) }
      this.pingLunData = res.data
    }
  },
  created () {
    this.aId = this.$route.params.aId
    console.log(this.aId)
    this.getArt(this.aId)
    this.getCom(this.aId)
  },
  watch: {
    '$route' (to, from) {
      if (this.$route.params.aId) {
        this.aId = this.$route.params.aId
        // console.log(this.aId)
        this.getArt(this.aId)
        this.getCom(this.aId)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article
{
  padding: 20px;
  border-bottom: 20px;
  background-color: #fff;
  h2{
    line-height: 1;
    margin: 20px 0 15px 0;
    a{
      color: #444;
      font-size: 22px;
      transition: all 0.25s;
      &:hover{
        color: #409EFF;
      }
    }
  }
  .tag{
    margin-bottom: 10px;
    .el-tag{
      margin-right: 5px;
    }
  }
  .meta{
    color: #999;
    font-size: 12px;
    padding: 0 20px 20px;
    margin: 0 -20px;
    border-bottom: 1px solid #eee;
    span{
      margin-right: 15px;
    }
    :nth-child(2n){
        cursor: pointer;
        &:hover{
          color: #409EFF;
        }
      }
  }
}
.comment{
    margin: 20px 0;
    .el-button{
      margin-top: 10px;
      border-radius: 0;
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
