import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import RotateIndex from '../components/RotateIndex.vue'
import Login from '../components/Login.vue'
import Admin from '../components/Admin'
import Login1 from '../components/Login1.vue'
import Home from '../components/Home.vue'
import Content from '../components/home/Content.vue'
import Cate from '../components/home/Category.vue'
import Article from '../components/home/Article.vue'
import Register from '../components/Register.vue'
import Upload from '../components/Upload.vue'
import Wel from '../components/admin/wel.vue'
import Articlelist from '../components/admin/article/Articlelist.vue'
import Catelist from '../components/admin/article/Catelist.vue'
import Userlist from '../components/admin/user/userlist.vue'
import Swiperlist from '../components/admin/setting/Swiper.vue'
import Other from '../components/admin/setting/other.vue'
import Report from '../components/admin/setting/Report.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/upload',
    name: 'upload',
    component: Upload
  },
  {
    path: '/RIndex',
    name: 'rindex',
    component: RotateIndex
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        component: Wel
      },
      {
        path: 'userList',
        name: 'userlist',
        component: Userlist
      },
      {
        path: 'cateList',
        name: 'catelist',
        component: Catelist
      },
      {
        path: 'articleList',
        name: 'articlelist',
        component: Articlelist
      },
      {
        path: 'swiperList',
        name: 'swiperlist',
        component: Swiperlist
      },
      {
        path: 'other',
        name: 'other',
        component: Other
      },
      {
        path: 'report',
        name: 'report',
        component: Report
      }
    ]
  },
  {
    path: '/login1',
    naem: 'login1',
    component: Login1
  },
  {
    path: '/home',
    component: Home,
    // redirect: '/content',
    children: [
      {
        path: '',
        component: Content
      },
      {
        path: 'content',
        name: 'content',
        component: Content
      },
      {
        path: 'cate/:cId',
        name: 'cate',
        component: Cate
      },
      {
        path: 'article/:aId',
        name: 'article',
        component: Article
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

// 注册register

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   // to代表要访问的路径
//   // from代表从哪个路径而来
//   // next()放行  next('/login')强制跳转到/login
//   if (to.path === '/login' || to.path === '/register') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })
router.beforeEach((to, from, next) => {
  // to代表要访问的路径
  // from代表从哪个路径而来
  // next()放行  next('/login')强制跳转到/login
  if (to.path === '/admin') {
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) { return next('/login') }
  }
  next()
})

export default router
