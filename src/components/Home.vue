<template>
    <div class="articlebg">
        <Header />
        <el-row :gutter="20">
            <el-col :xs="0" :sm="6" :md="4"><div :style="{height:'100vh', marginTop:'4rem'}"></div></el-col>
            <el-col :xs="0" :sm="6" :md="4" :style="{position:'fixed', paddingRight:'0',height:'100vh',backgroundColor:'#fff', marginTop:'4rem'}">
                <div class="nav">
                    <ul>
                        <li v-for="item in cateList" :key="item.sort_id">
                            <!-- <a href="javascript:;" :class="item.cateIcon">{{item.cateName}}</a> -->
                            <router-link :to="`/home/cate/${item.sort_id}`" :class="item.sort_icon">{{item.sort_name}}</router-link>
                        </li>
                    </ul>
                </div>
                <div class="search">
                     <form>
                         <input placeholder="关键词" v-model="searchKey" class="searchKey">
                         <button class="el-icon-search searchBtn"></button>
                     </form>
                </div>
                <div class="userInfo">
                     <el-avatar :src="userInfo.user_profile_photo"></el-avatar>
                     <h4>{{userInfo.user_name?userInfo.user_name:'未登录'}}</h4>
                    <p v-show="userInfo.user_email">{{userInfo.email}}</p>
                    <p v-show="userInfo.info">{{userInfo.info}}</p>
                    <el-badge v-show="userInfo.user_name" :value="12" class="item" :max="99">
                    <el-button size="small">评论</el-button>
                    </el-badge>
                    <el-badge v-show="userInfo.user_name" :value="3" class="item" :max="99">
                    <el-button size="small">回复</el-button>
                    </el-badge>
                    <el-badge class="item" v-show="userInfo.user_name">
                    <el-button size="small" @click="logout">退出</el-button>
                    </el-badge>
                </div>
            </el-col>
            <!-- 第二栏 -->
            <router-view></router-view>
            <!-- 第三栏组件 -->
            <Aside/>
        </el-row>
        <Music/>
    </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import Header from './nav.vue'
import Aside from './home/Aside.vue'
import Music from './home/Music.vue'
// import { mapState, mapActions } from 'vuex'
export default {

  data () {
    return {
      cateList: [],
      searchKey: '',
      userInfo: {},
      token: ''
    }
  },
  components: {
    Aside,
    Header,
    Music
  },
  created () {
    this.getCateName()
  },
  methods: {
    async getCateName () {
      const { data: res } = await this.$http.get('/home/catename')
      console.log(res)
      if (res.meta.status !== 200) { this.$message.error('获取分类失败，请稍后重试') }
      this.cateList = res.data
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
      //   清除vuex中的user数据
    //   this.updateUserInfo(null)
    //   this.updateToken(null)
    //   this.$router.push('/login')
    }
    // getUser() {
    //     this.token = sessionStorage.getItem('token') || '',
    //     this.userInfo =  JSON.parse(sessionStorage.getItem('userInfo')) || {}
    // }
  },
  computed: {
    // ...mapState(['userInfo', 'token']),
    // ...mapActions(['updateToken', 'updateUserInfo'])
    // getUser()
  },
  mounted () {
    this.token = window.sessionStorage.getItem('token') || ''
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo')) || {}
  }
}
</script>

<style lang="less" scoped>
.articlebg{
    background: #eee;
    overflow: hidden;
}
ul, dl, dt, dd, h1, h2, h3, h4, h5, h6, p{
    margin: 0;
    padding: 0;
}
ul{
    list-style: none;
}
a{
    color: #666;
    text-decoration: none;
}
a:hover{
    text-decoration: none;
    color: #409EFF;
}
img{
    display: block;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    border-style: none;
}
.clear{
    clear: both;
}
// 第一列
.logo{
    background-color: #409EFF;
    text-align: center;
    padding: 10px;
    cursor: pointer;
}
.nav{
    background-color: #fff;
    border-bottom: 1px solid #eee;
    a{
        display: block;
        height: 100%;
        line-height: 50px;
        padding-left: 20%;
        font-size: 16px;
    }
}
.nav a:hover{
    background-color: #eee;
    color: #409EFF;
}
.nav a::before{
    vertical-align: middle;
    padding-right: 5px;
}
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
.userInfo{
    overflow: hidden;
    text-align: center;
    p{
        padding: 5px 0;
        border-bottom: 1px solid #ccc;
        margin-bottom: 5px;
    }
    .item{
  margin-top: 20px;
  margin-right: 18px;
    }
}
</style>
