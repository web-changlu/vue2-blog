<template>
<el-form>
  <el-form-item label="图标">
  <el-upload
    class="avatar-uploader"
    :action="$http.defaults.baseURL + 'admin/upload'"
    :show-file-list="false"
    :on-success="afterUpload"
  >
    <img v-if="model.icon" :src="model.icon" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</el-form-item>
<p>{{model.icon}}</p>
</el-form>
</template>
<script>
export default {
  data () {
    return {
      model: {}
    }
  },
  methods: {
    afterUpload (res) {
      console.log(res.url)
      this.$set(this.model, 'icon', res.url)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
