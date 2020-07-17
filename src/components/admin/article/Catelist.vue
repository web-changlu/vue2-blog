<template>
    <div class="bg">
      <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
          <!-- 搜索与添加区域 -->
            <el-row :gutter="20" :style="{marginBottom:20+'px'}">
                <el-col :span="15">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getSortList">
                <el-button slot="append" icon="el-icon-search" @click="getSortList"></el-button>
            </el-input>
                </el-col >
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加分类</el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区域 -->
            <el-table :data="sortlist" border stripe :style="{marginBottom:20+'px'}">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column label="分类名" prop="sort_name"></el-table-column>
                <el-table-column label="分类图标" prop="sort_icon"></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button :id="scope" type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.sort_id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeSortById(scope.row.sort_id)"></el-button>
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
        <!-- 添加分类对话框 -->
        <el-dialog
            title="添加分类"
            :visible.sync="addDialogVisible"
            width="50%"  @close="addDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
                <el-form-item label="分类名称" prop="sort_name">
                    <el-input v-model="addForm.sort_name"></el-input>
                </el-form-item>
                <el-form-item label="分类图标" prop="sort_icon">
                    <el-input v-model="addForm.sort_icon"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSort">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改分类对话框 -->
        <el-dialog
            title="修改分类"
            :visible.sync="editDialogVisible"
            width="50%" @close="editDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
                <el-form-item label="分类名称" prop="sort_name">
                    <el-input v-model="editForm.sort_name" ></el-input>
                </el-form-item>
                <el-form-item label="分类图标" prop="sort_icon">
                    <el-input v-model="editForm.sort_icon"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSortInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      sortlist: [],
      // 获取分类列表的请求参数对象
      queryInfo: {
        query: '',
        // 当前页码
        pagenum: 1,
        // 每页显示的数据条数
        pagesize: 2
      },
      total: 0,
      //   控制添加分类对话框的显示与隐藏
      addDialogVisible: false,
      //   添加分类的表单数据
      addForm: {
        sort_name: '',
        sort_icon: ''
      },
      //   添加用户表单的验证规则对象
      addFormRules: {
        sort_name: [
          { required: true, message: '请输入分类名', trigger: 'blur' },
          { min: 3, max: 20, message: '分类名在3到20个字符之间', trigger: 'blur' }
        ],
        sort_icon: [
          { required: true, message: '请输入分类图标', trigger: 'blur' },
          { min: 3, max: 30, message: '分类图标在3到30个字符之间，支持font awesome图标库', trigger: 'blur' }
        ]
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 修改用户表单数据对象
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        sort_name: [
          { required: true, message: '请输入分类名', trigger: 'blur' },
          { min: 3, max: 20, message: '分类名在3到20个字符之间', trigger: 'blur' }
        ],
        sort_icon: [
          { required: true, message: '请输入分类图标', trigger: 'blur' },
          { min: 3, max: 30, message: '分类图标在3到30个字符之间，支持font awesome图标库', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getSortList()
  },
  methods: {
    async getSortList () {
      const { data: res } = await this.$http.get('/admin/sort', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.sortlist = res.data.sortlist
      this.total = res.data.total
      console.log(res)
    },
    // 监听pagesize改变的事件
    handleSizeChange (newsize) {
    //   console.log(newsize)
      this.queryInfo.pagesize = newsize
      this.getSortList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newpage) {
    //   console.log(newpage)
      this.queryInfo.pagenum = newpage
      this.getSortList()
    },
    // 添加分类对话框关闭 重置表单
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 点击添加按钮 检验格式 添加分类
    addSort () {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('请按照规则填写信息(＾Ｕ＾)ノ~ＹＯ')
        // 验证成功 发送请求添加分类
        const { data: res } = await this.$http.post('/admin/sort', this.addForm)
        console.log(res)
        if (res.meta.status !== 200) { this.$message.error(res.meta.msg) }

        this.$message.success(res.meta.msg)
        // // 隐藏添加用户对话框
        this.addDialogVisible = false
        // // // 重新查询用户列表
        this.getSortList()
      })
    },
    // 编辑用户信息对话框
    async showEditDialog (id) {
      // 根据id查询用户信息
      // console.log(id)
      const { data: res } = await this.$http.get(`/admin/findsort/${id}`)
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
    editSortInfo () {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return this.$message('请按照规则输入分类信息')
        // 通过验证 发送请求 修改分类信息
        const { data: res } = await this.$http.put('/admin/changesort/', {
          params: {
            sort_id: this.editForm.sort_id,
            sort_name: this.editForm.sort_name,
            sort_icon: this.editForm.sort_icon
          }
        })
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error('更新分类信息失败！')

        // 重新查询分类列表
        this.getSortList()
        // 提示分类信息修改成功
        this.$message.success(res.meta.msg)
        // 隐藏修改分类信息对话框
        this.editDialogVisible = false
      })
    },
    // 根据id删除分类
    async removeSortById (id) {
      // console.log(id)
      // 弹窗询问用户是否确定删除
      const confirmResult = await this.$confirm('此操作将永久删除该分类，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 用户确认了删除 返回值为confirm
      // 用户取消了删除 返回值为cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除')
      // 发送请求根据id删除分类
      const { data: res } = await this.$http.delete(`/admin/sort/${id}`)
      // console.log(res)
      if (res.meta.status !== 200) { return this.$message.error(res.meta.msg) }
      this.$message.success(res.meta.msg)
      this.getSortList()
    }
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
