<template>
    <div>
      <Header/>
      <div class="art">
        <div class="yiyan">
          <h3>{{this.YiYanContent.hitokoto}}</h3>
        </div>
        <div class="phoneyiyan">
          <h3>{{this.YiYanContent.hitokoto}}</h3>
        </div>
        <div class="read" @click="startRead"><i class="fa fa-angle-double-down" aria-hidden="true"></i>开始阅读
        </div>
      </div>
      <!-- xs 小于768px  sm大于768px md大于992 lg大于1200px xl大于1920px -->
      <el-row >
            <el-button circle :style="{float: 'right'}" :icon="isLoad?'el-icon-loading':'el-icon-refresh-right'" @click="changeArt" class="reload"></el-button>
        <el-col :xs="24" :sm="6" v-for="(item) in articleData" :key="item.article_id">
          <div class="article">
            <h2 id="title">
              <router-link :to="`/home/article/${item.article_id}`">{{item.article_title}}</router-link>
            </h2>
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
            {{item.article_content | filterArt}}
          </div>
        </el-col>
      </el-row>
      <Footer/>
    </div>
</template>

<script>
import Header from './nav'
import Footer from './Footer'
// import Music from './home/Music'

export default {
  data () {
    return {
      YiYanContent: {
        from: '古代',
        from_who: '诗人',
        created_at: '4678-88-88',
        type: '诗歌',
        hitokoto: '千里江陵一日还'
      },
      articleData: [],
      isLoad: false
    }
  },
  components: {
    Header,
    Footer
    // Music
  },
  created () {
    this.getSuiJiTuiJian()
  },
  methods: {
    async getYiyan () {
      const { data: res } = await this.$http.get('https://v1.hitokoto.cn')
      this.YiYanContent = res
      console.log(this.YiYanContent)
    },
    changeArt () {
      this.isLoad = !this.isLoad
      this.getSuiJiTuiJian()
      this.isLoad = !this.isLoad
    },
    startRead () {
      document.getElementById('title').scrollIntoView({ block: 'start', behavior: 'smooth' })
    },
    async getSuiJiTuiJian () {
      const { data: res } = await this.$http.get('/home/sjtj')
      console.log(res)
      if (res.meta.status !== 200) { this.$message.error(res.meta.msg) }
      this.articleData = res.data
    }
  },
  mounted () {
    this.getYiyan()
  }
}
</script>

<style lang="less" scoped>
.art{
    background:url("../assets/img/06.jpg") no-repeat center center/cover ;
    height: 100vh;
    .yiyan{
      position: absolute;
      writing-mode: vertical-lr;
      left: 8%;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
    }
    .phoneyiyan{
      display: none;
    }
    .read{
      position: absolute;
      bottom: 20%;
      right: 50%;
      transform: translateX(50%);
      cursor: pointer;
      border: 1px solid #fff;
      color: #ffffff;
      background-color: #cccccc90;
      padding: .5rem 1rem;
      border-radius: 5px;
      &:hover{
        background-color: #ccc;
        color: #000;
      }
    }
}

.article
{
  height: 30rem;
  padding: 20px;
  border-bottom: 20px;
  background-color: #fff;
  border: 20px solid #ccc;
  overflow: hidden;
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
@media screen and (max-width:768px) {
  .yiyan{
    display: none;
  }
  .art .phoneyiyan{
    display: block;
      position: absolute;
      color: #fff;
      left: 50%;
      top: 35%;
      transform: translateX(-50%);
      z-index: 2;
  }
  .art .read{
    bottom: 35%;
    z-index: 2;
  }
}
.reload{
  position: absolute;
  right: 5%;
  bottom: 10%;
}
</style>
