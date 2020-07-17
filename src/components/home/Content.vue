<template>
    <el-col :xs="24" :sm="17" :md="14" :style="{marginTop:'4rem'}">
                <div class="swipe">
                    <el-carousel :interval="3000">
                        <el-carousel-item v-for="item in swipeData" :key="item.id">
                        <img :src="item.img" alt="" class="swimg">
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <!-- 热门推荐组件 -->
                <Hot/>
                <div class="new">
                    <h3>最新发布</h3>
                    <div class="newcon">
                        <div class="entry" v-for="item in zuiXinData" :key="item.article_id">
                            <div class="headcon">
                                <span class="sort">{{item.sort_name}}</span>
                                <!-- <a href="#">{{item.title}}</a> -->
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
                                </!--> -->
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
</template>

<script>
import Hot from '../hot/Hot.vue'
export default {
  data () {
    return {
      swipeData: [
        { id: '11', img: require('../../assets/img/slide_1.jpg') },
        { id: '12', img: require('../../assets/img/slide_1.jpg') },
        { id: '13', img: require('../../assets/img/slide_1.jpg') },
        { id: '14', img: require('../../assets/img/slide_1.jpg') }
      ],
      zuiXinData: []
    }
  },
  components: {
    Hot
  },
  created () {
    this.getNewArt()
  },
  methods: {
    async getNewArt () {
      const { data: res } = await this.$http.get('/home/newart')
      console.log(res)
      if (res.meta.status !== 200) { this.$message.error(res.meta.msg) }
      this.zuiXinData = res.data
    }
  }
}
</script>

<style lang="less" scoped>
// 第二列
// 轮播图
.swipe{
    margin-bottom: 20px;
}
.el-carousel__item h3 {
color: #475669;
font-size: 18px;
opacity: 0.75;
line-height: 300px;
margin: 0;
}

.el-carousel__item:nth-child(2n) {
background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
background-color: #d3dce6;
}
.swimg{
    width: 100%;
    height: 100%;
}
.new{
    padding: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    overflow: hidden;
    h3{
        display: inline-block;
        line-height: 32px;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
        border-bottom: 2px solid #409EFF;
    }
    .entry{
        position: relative;
        clear: both;
        &:nth-child(n+2){
            padding-top: 15px;
            border-top: 1px solid #f0f0f0;
        }
    }
}
.headcon{
    height: 30px;
    line-height: 1;
    padding: 5px 0;
    margin: 8px 0 10px 0;
    box-sizing: border-box;
    font-size: 22px;
    color: #444;
}
.sort{
    position: relative;
    display: block;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    margin-right: 10px;
    float: left;
    color: #fff;
    background-color: #409EFF;
    font-size: 12px;
    &::after{
        display: block;
        content: '';
        position: absolute;
        top: 8px;
        right: -8px;
        border: 4px solid;
        border-color: transparent transparent transparent #409EFF;
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
</style>
