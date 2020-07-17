<template>
  <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <!-- <img :src="userInfo.user_profile_photo" alt=""> -->
                <span>常陆--多人博客管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 页面主体 -->
        <el-container>
           <!-- 侧边栏  -->
           <el-aside :width="isCollapse?'64px':'200px'">
             <div class="toggle-btn" @click="toggleCollapse"> | | |</div>
               <!-- 侧边栏菜单 -->
               <el-menu background-color="#303133" text-color="#fff" active-text-color="#314976"  unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activepath">
                   <!-- 一级菜单 -->
                   <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
                       <!-- 一级菜单模板区域 -->
                       <template slot="title">
                           <!-- 图标 -->
                           <i :class="iconObj[item.id]" aria-hidden="true"></i>
                           <span>{{item.name}}</span>
                       </template>
                       <!-- 二级菜单 -->
                       <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
                           <template slot="title">
                           <!-- 图标 -->
                           <i class="el-icon-menu"></i>
                           <span>{{subItem.name}}</span>
                       </template>
                       </el-menu-item>
                   </el-submenu>
               </el-menu>
           </el-aside>
           <el-container>
            <!-- 右侧内容主体区域 -->
            <el-main>
              <!-- 路由占位符 -->
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
  </el-container>
</template>

<script>

// import { mapState, mapActions, mapMutations } from 'vuex'
export default {

  data () {
    return {
      userInfo: {},
      token: '',
      // 链接状态
      activepath: '',
      // 默认不折叠
      isCollapse: false,
      // 左侧菜单数据
      menulist: [{
        id: 1,
        name: '用户管理',
        children: [
          {
            id: 11,
            name: '用户列表',
            path: 'admin/userList'
          }
        ]
      },
      {
        id: 2,
        name: '文章管理',
        children: [
          {
            id: 21,
            name: '分类列表',
            path: 'admin/cateList'
          },
          {
            id: 22,
            name: '文章列表',
            path: 'admin/articlelist'
          }
        ]
      },
      {
        id: 3,
        name: '网站管理',
        children: [
          {
            id: 31,
            name: '轮播图',
            path: 'admin/swiperList'
          },
          {
            id: 32,
            name: '其它设置',
            path: 'admin/other'
          },
          {
            id: 33,
            name: '数据统计',
            path: 'admin/report'
          }
        ]
      }],
      iconObj: {
        1: 'fa fa-user',
        2: 'fa fa-book',
        3: 'fa fa-cubes',
        4: 'fa fa-file-code-o',
        5: 'fa fa-flask'
      }
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      //   清除vuex中的user数据
      //   this.updateUserInfo(null)
      //   this.updateToken(null)
      this.$router.push('/login')
    },
    // 点击按钮 切换菜单的展开与折叠状态
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState (activepath) {
      window.sessionStorage.setItem('activepath', activepath)
      this.activepath = activepath
    }
  },
  mounted () {
    this.token = window.sessionStorage.getItem('token') || ''
    this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo')) || {}
  }
}
</script>

<style lang="less" scoped>
.home-container{
    height: 100%;
}
.el-header{
    background-color: #000;
    display:flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
        display: flex;
        align-items: center;
        span {
            margin-left: 15px;
        }
    }
}
.el-aside{
    background-color: #C0C4CC;
    .el-menu{
      border-right: none;
    }
}
.el-main{
    background-color: #F2F6FC;
    padding: 0;
}
.toggle-btn{
  color: #fff;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
  background-color: #303133;
}
i{
  margin-right: 3px;
}
</style>
