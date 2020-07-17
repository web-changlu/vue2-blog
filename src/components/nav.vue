<template>
    <div class="top">
        <el-row>
            <el-col :xs="0" :sm="24" :md="24" :style="{position:'fixed', zIndex: 6}">
                <div class="nav">
                    <h1>changlu</h1>
                    <ul>
                        <li>
                            <router-link to="/" >
                            <i class="fa fa-home" aria-hidden="true" ></i>
                            <span>首页</span>
                        </router-link>
                        </li>
                        <li>
                            <router-link to="/home">
                            <i class="fa fa-book" aria-hidden="true"></i>
                            <span>文章</span>
                        </router-link>
                        </li>
                        <li>
                            <router-link to="/home/cate/1">
                            <i class="fa fa-bookmark" aria-hidden="true" ></i>
                            <span>分类</span>
                        </router-link>
                        </li>
                        <li @click="log">
                            <i class="fa" :class="this.userInfo.user_name?'fa-sign-in':'fa-user'" aria-hidden="true"></i>
                            <span v-show="this.userInfo.user_name">{{this.userInfo.user_name}}</span>
                            <span v-show="!this.userInfo.user_name">登录/注册</span>
                        </li>
                        <!-- {{userInfo}} -->
                        <!-- <li @click="Vrouter('')"><i class="fa fa-home"> 首页</i></li>
                        <li @click="Vrouter('home')"><i class="fa fa-book"> 文章</i></li>
                        <li @click="Vrouter('home/cate/1')"><i class="fa fa-bookmark"> 分类</i></li>
                        <li @click="Vrouter('GitHub')"><i class="fa fa-github"> GitHub</i></li>
                        <li @click="Vrouter('login')"><i class="fa fa-user" aria-hidden="true"> {{userInfo.uName?userInfo.uName:'登录/注册'}}</i></li> -->
                    </ul>
                </div>
            </el-col>
            <el-col :xs="24" :sm="0" :md="0" :style="{position:'fixed', zIndex: 6}">
                <div class="phonenav">
                    <ul class="bars">
                        <li @click="changeBar"><i class="fa fa-bars fa-3x"></i></li>
                    </ul>
                    <h1 class="logo">changlu</h1>
                    <ul class="search">
                        <li ><i class="fa fa-search fa-3x" aria-hidden="true"></i></li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <transition name="nav">
            <div class="m-navba" v-if="pnav">
                <dl>
                    <dt>
                        <!-- <el-avatar shape="circle" :size="50" :src="squareUrl"></el-avatar> -->
                        <el-avatar :src="userInfo.user_profile_photo" :size="50"></el-avatar>
                        <h3>{{userInfo.user_name?userInfo.user_name:'用户名'}}</h3>
                    </dt>
                    <dd>
                        <router-link to="/" >
                            <i class="fa fa-home" aria-hidden="true" ></i>
                            <span @click="pnav=false">首页</span>
                        </router-link>
                    </dd>
                    <dd>
                        <router-link to="/home">
                            <i class="fa fa-book" aria-hidden="true"></i>
                            <span @click="pnav=false">文章</span>
                        </router-link>
                    </dd>
                    <dd>
                        <router-link to="/home/cate/1">
                            <i class="fa fa-bookmark" aria-hidden="true" ></i>
                            <span @click="pnav=false">分类</span>
                        </router-link>
                    </dd>
                    <!-- <dd>
                        <router-link to="/login">
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <span @click="pnav=false">个人信息</span>
                        </router-link>
                    -->
                    <dd>
                            <i class="fa" :class="userInfo.user_name?'fa-sign-in':'fa-user'" aria-hidden="true"></i>
                            <span @click="phonelog">{{userInfo.user_name?'退出':'登录/注册'}}</span>
                    </dd>
                </dl>
            </div>
        </transition>
    </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      pnav: false,
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      userInfo: {}
    }
  },
  methods: {
    Vrouter (address) {
      if (address !== '') {
        if (address === 'GitHub') {
          window.open('https://github.com/web-qz')
        }
        this.$router.push('/' + address)
      } else {
        this.$router.push('/')
      }
    },
    changeBar () {
      this.pnav = !this.pnav
    },
    phonelog () {
      this.pnav = false
      if (this.userInfo.uName) {
        // 退出操作
        window.sessionStorage.clear()
        this.$router.push('/login')
        //   清除vuex中的user数据
        this.updateUserInfo(null)
        this.updateToken(null)
      } else {
        // 注册/登录操作
        this.$router.push('/login')
      }
    },
    log () {
      if (this.userInfo.user_name) {
        // 退出操作
        window.sessionStorage.clear()
        this.$router.push('/login')
        //   清除vuex中的user数据
        // this.updateUserInfo(null)
        // this.updateToken(null)
      } else {
        // 注册/登录操作
        this.$router.push('/login')
      }
    }
  },
  computed: {
    // ...mapState(['userInfo']),
    // ...mapActions(['updateToken', 'updateUserInfo'])
    finduser () {
      return this.userInfo
    }
  },
  created () {
    this.userInfo = window.sessionStorage.getItem('userInfo') ? JSON.parse(window.sessionStorage.getItem('userInfo')) : {}
  }
}
</script>

<style lang="less" scoped>
.top{
    position: fixed;
    height: 4rem;
    z-index: 9;
}
.nav{
    position: relative;
    opacity: .9;
    background-color: #1C1C1D;
    color: #fff;
    height: 4rem;
    // padding: .5rem;
    h1, li {
        float: left;
    }
    h1{
        margin-left: 5%;
        cursor: pointer;
        line-height: 4rem;
    }
    ul{
        position: absolute;
        right: 5%;
    }
    li{
        padding: 0.5rem;
        cursor: pointer;
        margin-right: 30px;
        line-height: 3rem;
    }
    li:hover{
        opacity: 0.6
    }
}
@media screen and (max-width:768px) {
    .phonenav{
        position: relative;
        opacity: .8;
        background-color: #1C1C1D;
        color: #fff;
        height: 4rem;
        li{
            padding: 5px;
        }
    }
    .bars{
        position: absolute;
        left: 0;
    }
    .logo{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .search{
        position: absolute;
        right: 0;
    }
}
.m-navbar {
    position: fixed;
    left: 0;
    top: 4rem;
    background-color: #000;
    opacity: .5;
    z-index: 10;
}
.m-navba {
    position: absolute;
    left: 0;
    top: 4rem;
    background:url("../assets/img/02.jpg") no-repeat center center/cover ;
    overflow: hidden;
    width: 25rem;
    height: 100vh;
    dl{
        i{
            margin-right: 2px;
        }
        a{
            color: #fff;
            font-size: 1rem;
        }
        color: #fff;
        dt{
            padding: 3rem;
            text-align: center;
        }
    }
    dd {
        padding: 1rem;
        cursor: pointer;
    }
}

.nav-leave {
  /* 定义 出场动画的 起始状态 */
  /* 只停留一帧 */
  transform: translateX(0px);
}
.nav-leave-active {
  /* 定义 出场动画 过程 */
  transition: all .4s ease;
}
.nav-leave-to {
  /* 定义 出场动画 结束状态（即：该动画要达到的目标状态） */
  transform: translateX(-600px);
}
/* 定义  入场动画 */
.nav-enter {
  /* 定义 入场动画 的起始状态 */
  transform: translateX(-600px);

}
.nav-enter-active {
  /* 定义 入场动画 过程 */
  transition: all .4s ease;
}
.nav-enter-to {
  /* 定义 入场动画 过程 */
  /* 只停留一帧 */
  transform: translateX(0px);
}
</style>
