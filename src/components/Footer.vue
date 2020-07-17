<template>
    <footer class="footer">
        <div class="container">
            <p>
                ChangLu 0.0.1 · 更新于2020年7月2日
            </p>
            <p>
                版权所有：西安 备1503xxxxx117号-3
            </p>
        </div>
    </footer>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.footer{
    height: 10rem;
    background-color: #404041;
    color: #fff;
    position: relative;
    text-align: center;
    opacity: .8;
    .container{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
}
</style>
