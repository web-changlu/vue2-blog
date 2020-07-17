<template  >
  <div>
    <vue-particles color="#409EFF"
        :particleOpacity="0.7"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#409EFF"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="100"
        :moveSpeed="8"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push">
    </vue-particles>
    <div class="registerBox">
        <h1>注册</h1>
        <el-form :model="registerForm" status-icon :rules="registerFormRules" ref="registerFormRef">
            <!-- 用户名 -->
            <el-form-item prop="uName" label="用户名">
            <el-input v-model="registerForm.uName"></el-input>
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item prop="email" label="邮箱">
            <el-input v-model="registerForm.email" prefix-icon="iconfont icon-user">
            </el-input>
            <Button type="button" v-text="btntext" :disabled="showBtn" class="btns" @click="sendEmailCode"></Button>
            </el-form-item>
            <!-- 邮箱验证码 -->
            <el-form-item label="验证码">
            <el-input v-model="registerForm.code"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item >
                <button class="regBtn leftBtn" @click="submitForm">注册</button>
                <button class="regBtn rightBtn" @click="resetForm">重置</button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      registerForm: {
        uName: '',
        password: '',
        email: '',
        code: ''
      },
      btntext: '发送验证码',
      showBtn: false,
      timer: null,
      count: 60,
      //   表单验证对象
      registerFormRules: {
        //   用户名验证
        uName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在3到12个字符之内', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在6到20个字符之内', trigger: 'blur' }
        ],
        // 验证密码
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在6到12之内', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    if (localStorage.getItem('show')) {
      this.showBtn = true
      this.count = parseInt(localStorage.getItem('show'))
      this.timer = setInterval(() => {
        this.count -= 1
        if (this.count === 0) {
          clearInterval(this.timer)
          localStorage.removeItem('show')
          this.btntext = '发送验证码'
          this.showBtn = false
        } else {
          this.btntext = `${this.count}秒后重新发送`
          localStorage.setItem('show', this.count)
        }
      }, 1000)
    }
  },
  methods: {
    async sendEmailCode () {
      if (this.registerForm.email.trim().length !== 0) {
        const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        if (reg.test(this.registerForm.email)) {
          // 发起验证码请求
          const { data: res } = await this.$http.post('/admin/code', { email: this.registerForm.email })
          console.log(res)
          if (res.status === 200) {
            this.$message.success(res.msg)
            localStorage.setItem('code', res.data)
            // 设置倒计时一分钟后和重新发送验证码
            localStorage.setItem('show', 60)
            this.showBtn = true
            this.count = 60
            this.timer = setInterval(() => {
              this.count -= 1
              if (this.count === 0) {
                clearInterval(this.timer)
                localStorage.removeItem('show')
                this.btntext = '发送验证码'
                this.showBtn = false
              } else {
                this.btntext = `${this.count}秒后重新发送`
                localStorage.setItem('show', this.count)
              }
            }, 1000)
          } else {
            this.$message.error('网络不行稍后再试试噢')
          }
        } else {
          this.$message.error('输入正确的邮箱噢，太马虎啦！')
        }
      } else {
        this.$message.error('邮箱不能空着呢！')
      }
      return false
    },
    async submitForm () {
      if (this.registerForm.uName.trim().length !== 0 && this.registerForm.password.trim().length !== 0 && this.registerForm.email.trim().length !== 0 && this.registerForm.code.trim().length !== 0) {
        const code = localStorage.getItem('code')
        if (this.registerForm.code === code) {
          // 注册账号
          const { data: res } = await this.$http.post('/admin/register', this.registerForm)
          console.log(res)
          if (res.meta.status === 200) {
            this.$message.success(res.meta.msg)
            // 保存token
            window.sessionStorage.setItem('token', res.token)
            window.sessionStorage.setItem('userInfo', JSON.stringify(res.data))
            // this.setUserInfo({ userInfo: res.data })
            // this.updateUserInfo(res.data)
            // this.setToken(res.token)
            // // window.sessionStorage.setItem('token', res.token)
            // 保存用户信息
            // 将用户数据存储到vuex中以供其他组件使用
            // 清除验证码缓存
            localStorage.removeItem('code')
            setTimeout(() => {
              this.$router.push('/home')
            }, 1000)
          } else {
            this.$message.error(res.meta.msg)
          }
        } else {
          this.$message.error('验证码不正确，请重新获取验证码！')
        }
      } else {
        this.$message.error('每一项都不能为空(＾Ｕ＾)ノ~ＹＯ')
      }
    },
    resetForm () {
      this.$refs.registerFormRef.resetFields()
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
#particles-js{
        width: 100%;
        height: calc(100% - 100px);
        position: absolute;
        overflow: hidden;
}
.registerBox{
    width: 40vw;
    min-width: 350px;
    height: auto;
    // margin: 50px auto;
    position: relative;
    // top: 50%;
    left: 50%;
    transform: translate(-50%, 10%);
    background: #00000080;
    padding: 20px;
    color: #fff;
    overflow: hidden;
    text-align: center;
    border-radius: 4px;
    h1{
      margin-bottom: 20px;
    }
    .regBtn {
      // float: left;
      width: 50%;
      font-size: 20px;
      color: #fff;
      font-weight: 700;
      border: 0;
      cursor: pointer;
      margin-top: 20px;
      padding: 4px;
  }

}
.leftBtn{
  border-radius: 4px 0 0 4px;
  border-right: 1px solid #ccc!important;
  background-image: linear-gradient(to right, #fff 0%, rgb(134, 193, 252) 100%);
}
.rightBtn{
  border-radius: 0px 4px 4px 0;
  background-image: linear-gradient(to right, rgb(134, 193, 252) 0%, #409EFF 100%);
}
.btns{
  border: 0;
  float: right;
  // position: relative;
  // top: 0;
  // right: 0;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 4px;
  z-index: 5;
  background-color: transparent;
  outline: 0;
  &:hover{
    background-color: #ffffff90;
  }
}
</style>
