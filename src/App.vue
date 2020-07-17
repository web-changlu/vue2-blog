<template>
  <div id="app">
    <!-- 路由占位符 -->
    <transition mode="out-in">
    <router-view></router-view>

    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: 'live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-shizuku/assets/',
        tagMode: false,
        debug: false,
        model: { jsonPath: '../live2dw/live2d-widget-model-shizuku/assets/shizuku.model.json' },
        display: { position: 'right', width: 200, height: 400 },
        mobile: { show: true },
        log: false
      })
    }, 1000)
  }
}
</script>

<style>
.v-enter,
.v-leave-to{
  opacity: 0;
  transform: translateX(140px);
}
.v-enter-active,
v-leave-actice{
  transition: all 0.5s ease;
}
.live2d-widget-container {
  opacity: 0.7!important;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
@media screen and (max-width:1200px) {
    body,html {
      font-size:15px ;
    }
}
@media screen and (max-width:992px) {
    body,html {
      font-size:14px ;
    }
}
@media screen and (max-width:768px) {
    body,html {
      font-size:13px ;
    }
}
@media screen and (max-width:576px) {
    body,html {
      font-size:12px ;
    }
}
@media screen and (max-width:400px) {
    body,html {
      font-size:11px ;
    }
}
</style>
