<template>
    <el-col :xs="24" :sm="17" :md="14" :style="{marginTop:'4rem'}">
        <div class="cate">
            <h3>{{cateName}}</h3>
            <div class="list">
                <div class="entry" v-for="item in cateList" :key="item.article_id">
                    <div class="headcon">
                        <router-link :to="`/home/article/${item.article_id}`">{{item.article_title}}</router-link>
                    </div>
                    <div class="maincon">
                        <p class="authinfo">{{item.user_name}} 发表于{{item.article_date | filterDate}}</p>
                        <p class="brief">{{item.article_content | filterArt}}</p>
                        <p class="extra">
                            <span>阅读({{item.article_views}})</span>
                            <span>评论({{item.article_comment_count}})</span>
                            <span class="articlezan">👍 赞({{item.article_like_count}})</span>
                            <span class="articlecategory"> 分类：{{item.sort_name}}</span>
                        </p>
                        <router-link class="thumb" :to="`/home/article/${item.article_id}`"><img :src="item.article_cover" :alt="item.article_title"></router-link>
                        <!-- <a href="#" class="thumb">
                            <img :src="item.article_cover" alt="">
                        </a> -->
                    </div>
                </div>
            </div>
        </div>
    </el-col>
</template>

<script>
export default {
  data () {
    return {
      cateName: '奇趣事',
      cateList: [],
      cId: 0
    }
  },
  methods: {
    async getCateArt (cId) {
      const { data: res } = await this.$http.get('/home/cateart', {
        params: {
          cId: cId
        }
      })
      //   console.log(res)
      this.cateList = []
      if (res.meta.status !== 200) { this.$message.error(res.meta.msg) }
      let cl = []
      cl = res.data
      for (var i = 0; i < cl.length; i++) {
        if (cl[i] === null) {
          continue
        } else {
          this.cateList.push(cl[i])
        }
      }
      this.cateName = this.cateList[0].sort_name
    }
  },
  created () {
    this.cId = this.$route.params.cId
    this.getCateArt(this.cId)
  },
  mounted () {
    this.cId = this.$route.params.cId
    // console.log(this.$route.params.cId)
  },
  beforeRouteUpdate (to, from, next) {
    this.cId = to.params.cId
    console.log(this.cId)
    this.getCateArt(this.cId)
    next()
  }
}
</script>

<style lang="less" scoped>
.cate{
    padding: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    overflow: hidden;
    h3{
        display: inline-block;
        margin-bottom: 10px;
        line-height: 32px;
        font-size: 20px;
        font-weight: 600;
        border-bottom: 2px solid #409EFF;
    }
    .entry{
        position: relative;
        clear: both;
        &:nth-child(n+2){
            padding-top: 15px;
            border-top: 1px solid #f0f0f0;
        }
        .headcon{
            height: 30px;
            line-height: 1;
            padding: 5px 0;
            margin: 8px 0 10px 0;
            box-sizing: border-box;
            font-size: 22px;
            color: #444;
            a{
                color: #444;
                transition: all 0.5s;
                &:hover{
                    color: #409EFF;
                }
            }
        }
        .maincon{
            overflow: hidden;
            margin-bottom: 8px;
            p{
                width: 75%;
                float: left;
                clear: both;
            }
            .authinfo{
                font-size: 12px;
                color: #999;
            }
            .brief{
                margin-top: 6px;
                margin-bottom: 10px;
                font-size: 14px;
                line-height: 22px;
                color: #777;
            }
            .extra{
                color: #999;
                font-size: 12px;
                span{
                    margin-right: 20px;
                }
                .articlezan,.articlecategory{
                    cursor: pointer;
                    &:hover{
                        color: #409EFF;
                    }
                }
            }
            .thumb{
                display: inline-block;
                width: 20%;
                margin-left: 5%;
                position: relative;
                overflow: hidden;
                &::after{
                    display: inline-block;
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top: 0;
                    background-color: rgba(0,0,0,0);
                    box-sizing: border-box;
                    transition: all 0.25s ;
                }
                &:hover::after{
                        background-color: rgba(0,0,0,0.4);
                    }
            }
        }
    }
}
</style>
