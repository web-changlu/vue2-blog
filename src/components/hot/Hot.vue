<template>
  <div class="hot">
        <h3>热门推荐</h3>
        <ul>
            <li v-for="item in hotArt" :key="item.article_id">
              <router-link :to="`/home/article/${item.article_id}`">
                <el-image
                :src="item.article_cover"
                fit='none'></el-image>
                <span>{{item.article_title}}</span></router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {
      hotArt: [],
      // fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'http://localhost:90/uploads/articlecover.jpg'
    }
  },
  created () {
    this.getHotArt()
  },
  methods: {
    async getHotArt () {
      const { data: res } = await this.$http.get('/home/hotart')
      console.log(res)
      if (res.meta.status !== 200) { this.$message.error(res.meta.msg) }
      this.hotArt = res.data
    }
  }
}
</script>

<style lang="less" scoped>
// 热门推荐
.hot{
    margin-bottom: 20px;
    padding: 20px;
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
    li{
        display: inline-block;
        width: 24%;
        font-size: 14px;
        overflow: hidden;
        img{
            height: 132px;
            margin-bottom: 5px;
        }
        span{
        display: inline-block;
        height: 40px;
        overflow: hidden;
        }
    }
}
.hot li:nth-child(n+2){
    margin-left: 1.3%;
}
</style>
