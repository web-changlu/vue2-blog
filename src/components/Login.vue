<template>
  <div class="login_container">
        <el-row class="lg">
            <el-col :xs="12" :sm="12" :md="12" :offset="6">
              <div class="login_box">
                      <h1>Login</h1>
                      <form :model="loginForm" >
                          <div class="item">
                              <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                              <input type="text" placeholder="Username" v-model="loginForm.uName">
                          </div>
                          <div class="item">
                              <i class="fa fa-key" aria-hidden="true"></i>
                              <input type="password" placeholder="******" v-model="loginForm.password">
                          </div>
                      </form>
                      <button @click="login">Login</button>
                      <div class="ic">
                        <ul>
                          <li><i class="fa fa-qq" aria-hidden="true"></i></li>
                          <li><i class="fa fa-weixin" aria-hidden="true"></i></li>
                          <li><i class="fa fa-weibo" aria-hidden="true"></i></li>
                        </ul>
                      </div>
                      <router-link to="/register" class="register">没有账号？去注册</router-link>
              </div>
            </el-col>
        </el-row>
  </div>
</template>

<script>
// import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      loginForm: {
        uName: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      if (this.loginForm.uName.trim().length !== 0 && this.loginForm.password.trim().length !== 0) {
        // console.log(this.loginForm)
        const { data: res } = await this.$http.post('admin/login', this.loginForm)
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功！')
        // console.log(window.sessionStorage)
        window.sessionStorage.setItem('token', res.token)
        window.sessionStorage.setItem('userInfo', JSON.stringify(res.data))
        // 将用户数据存储到vuex中以供其他组件使用
        // this.setUserInfo(res.data)
        // this.setToken(res.token)
        if (res.data.role === 1) {
          this.$router.push('/admin')
        } else if (res.data.role === 0) {
          this.$router.push('/home')
        } else {
          alert('非法用户，请重新登录！')
          this.$router.push('/login')
        }
      } else {
        alert('用户名或者密码不能为空！')
      }
    }
  },
  computed: {
    // ...mapState(['userInfo', 'token']),
    // ...mapActions(['updateToken', 'updateUserInfo']),
    // ...mapMutations(['setUserInfo', 'setToken'])
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background:url("../assets/img/06.jpg") no-repeat center center/cover ;
    height: 100%;
    overflow: hidden;
    text-align: center;
    color: #fff;
    .lg{
      margin: 200px auto;
      height: 50%;
    }
    .login_box{
      position: relative;
      padding: 2rem 2rem 6rem;
      background-color: #00000090;
      overflow: hidden;
      color: #fff;
      h1{
        margin-bottom: 2rem;
      }
      form{
        overflow: hidden;
        .item{
          margin-bottom: 1rem;
          input{
            padding: 1rem;
            border:0;
            color: #fff;
            border-bottom: 1px solid #fff;
            outline: none;
            background-color: transparent;
          }
        }
      }
      li{
        float: left;
        margin-right: 1rem;
        i{
        border: 1px solid #fff;
        border-radius: 50%;
        padding: 1px;
        }
      }
      .ic{
        position: absolute;
        bottom: 3%;
        left: 51%;
        transform: translateX(-50%);
      }
      button{
        border:none;
        position: absolute;
        left: 50%;
        bottom: 12%;
        transform: translateX(-50%);
        border-radius: 10%;
        padding: .5rem 3rem;
      }
    }
}
.register{
    position: absolute;
    right: 5%;
    color: #fff;
    transition: all .25s;
    &:hover{
        color: #409EFF;
    }
}
// 解决chrome浏览器自动填充底色的问题
input:-webkit-autofill {
    animation: autofill-fix 1s infinite;
    -webkit-text-fill-color: #fff;
}
@keyframes autofill-fix {
from {
background-color: transparent
}
to {
background-color: transparent
    }
}
// @media screen and (max-width:768px) {
//   .register{
//     font-size: .5rem;
//   }
// }
</style>
