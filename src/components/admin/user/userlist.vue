<template>
  <div class="bg">
    <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card >
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20" :style="{marginBottom:20+'px'}">
                <el-col :span="15">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
                <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
            </el-input>
                </el-col >
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区域 -->
            <el-table :data="userlist" border stripe :style="{marginBottom:20+'px'}">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column label="用户名" prop="user_name"></el-table-column>
                <el-table-column label="昵称" prop="user_nickname"></el-table-column>
                <el-table-column label="邮箱" prop="user_email"></el-table-column>
                <!-- <el-table-column label="角色" prop="role"></el-table-column> -->
                <el-table-column label="管理权限" >
                    <!-- 组件插槽 -->
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.role" :active-value="1" :inactive-value="0" @change="userStateChanged(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button :id="scope" type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.user_id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.user_id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
        <!-- 添加用户对话框 -->
        <el-dialog
            title="添加用户"
            :visible.sync="addDialogVisible"
            width="50%"  @close="addDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="用户名" prop="user_name">
                    <el-input v-model="addForm.user_name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="user_password">
                    <el-input v-model="addForm.user_password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="user_email">
                    <el-input v-model="addForm.user_email"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改用户对话框 -->
        <el-dialog
            title="修改用户"
            :visible.sync="editDialogVisible"
            width="50%" @close="editDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="用户名" prop="user_name">
                    <el-input v-model="editForm.user_name" disabled></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="user_nickname">
                    <el-input v-model="editForm.user_nickname"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="user_email">
                    <el-input v-model="editForm.user_email"></el-input>
                </el-form-item>
                <el-form-item label="个性签名" prop="info">
                    <el-input v-model="editForm.info"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    //   邮箱验证规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9])+/

      if (regEmail.test(value)) {
        //   合法的邮箱
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    return {
      userlist: [],
      // 获取用户列表的请求参数对象
      queryInfo: {
        query: '',
        // 当前页码
        pagenum: 1,
        // 每页显示的数据条数
        pagesize: 2
      },
      total: 0,
      //   控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      //   添加用户的表单数据
      addForm: {
        user_name: '',
        user_password: '',
        user_email: ''
      },
      //   添加用户表单的验证规则对象
      addFormRules: {
        user_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '用户名在3到10个字符之间', trigger: 'blur' }
        ],
        user_password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码在6到15个字符之间', trigger: 'blur' }
        ],
        user_email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: checkEmail, trigger: 'blur'
          }
        ]
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 修改用户表单数据对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        user_email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }, { validator: checkEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('/admin/user', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.userlist = res.data.userlist
      this.total = res.data.total
      console.log(res)
    },
    // 监听pagesize改变的事件
    handleSizeChange (newsize) {
    //   console.log(newsize)
      this.queryInfo.pagesize = newsize
      this.getUserList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newpage) {
    //   console.log(newpage)
      this.queryInfo.pagenum = newpage
      this.getUserList()
    },
    // 监听用户状态开关的变化
    async userStateChanged (userInfo) {
      // console.log(userInfo)
      const { data: res } = await this.$http.put(`/admin/changestate/${userInfo.user_id}/state/${userInfo.role}`)
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
    },
    // 编辑用户信息对话框
    async showEditDialog (id) {
      // 根据id查询用户信息
      // console.log(id)
      const { data: res } = await this.$http.get(`/admin/finduser/${id}`)
      // console.log(res)

      if (res.meta.status !== 200) { return this.$message.error(res.meta.msg) }

      this.editForm = res.data
      this.editDialogVisible = true
      console.log(this.editForm)
    },

    // 修改用户信息对话框关闭
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息表单预验证 通过之后发送请求 修改用户信息
    editUserInfo () {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return this.$message('请按照规则输入正确用户信息')
        // 通过验证 发送请求 修改用户信息
        const { data: res } = await this.$http.put('/admin/changeuser/', {
          params: {
            user_id: this.editForm.user_id,
            user_email: this.editForm.user_email,
            user_nickname: this.editForm.user_nickname,
            info: this.editForm.info
          }
        })
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error('更新用户信息失败！')

        // 重新查询用户列表
        this.getUserList()
        // 提示用户信息修改成功
        this.$message.success(res.meta.msg)
        // 隐藏修改用户信息对话框
        this.editDialogVisible = false
      })
    },
    // 根据id删除用户
    async removeUserById (id) {
      // console.log(id)
      // 弹窗询问用户是否确定删除
      const confirmResult = await this.$confirm('此操作将永久删除该用户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 用户确认了删除 返回值为confirm
      // 用户取消了删除 返回值为cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除')
      // 发送请求根据id删除用户
      const { data: res } = await this.$http.delete(`/admin/user/${id}`)
      // console.log(res)
      if (res.meta.status !== 200) { return this.$message.error(res.meta.msg) }
      this.$message.success(res.meta.msg)
      this.getUserList()
    },
    // 添加用户对话框关闭 重置表单
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 点击添加按钮 检验格式 添加用户
    addUser () {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('请按照规则填写信息(＾Ｕ＾)ノ~ＹＯ')
        // 验证成功 发送请求添加用户
        const { data: res } = await this.$http.post('/admin/user', this.addForm)
        console.log(res)
        if (res.meta.status !== 200) { this.$message.error(res.meta.msg) }

        this.$message.success(res.meta.msg)
        // 隐藏添加用户对话框
        this.addDialogVisible = false
        // // 重新查询用户列表
        this.getUserList()
      })
    }
  },
  created () {
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
.bg{
  padding: 20px;
  .bread{
    margin-bottom: 20px;
  }
}
</style>
