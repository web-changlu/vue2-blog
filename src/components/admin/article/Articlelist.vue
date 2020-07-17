<template>
    <div class="bg">
      <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
          <el-row :style="{marginBottom:20+'px'}">
                <el-col><el-button type="primary" >添加文章</el-button></el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
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
