<template>
    <div>
        <div class="bgbox" :style="{transform: 'translate(-50%, -50%) rotateZ('+bgrotate+'deg)'}">
          <div class="row1">
            <div class="orb1"></div>
            <div class="orb2"></div>
            <div class="orb3"></div>
          </div>
          <div class="row2">
            <div class="orb1"></div>
            <div class="orb2"></div>
            <div class="orb3"></div>
          </div>
          <div class="row3">
            <div class="orb1"></div>
            <div class="orb2"></div>
          </div>
        </div>
        <full-page :options="options" ref="fullpage">
            <div class="section section1">
                <div class="p1" :style="{transform:'translate(-50%, -50%) translateZ('+p1shiju+'px) rotateY('+p1rotate+'deg)'}">
                   <img src="../assets/img/slide_1.jpg" alt="">
                </div>
            </div>
            <div class="section section2">
                <div class="p2" :style="{transform:'translate(-50%, -50%) translateZ('+-p2shiju+'px) scale('+p2suofang+')'}">
                  <!-- <div class="slide">
                    1
                  </div>
                  <div class="slide">
                    2
                  </div>
                  <div class="slide">
                    3
                  </div> -->
                  <img src="../assets/img/hzs.png" alt="">
                </div>
            </div>
            <div class="section section3">
                <div class="p3" :style="{transform:'translateX('+p3x+'px)translateZ('+p3shiju+'px)  rotateX('+p3rotate+'deg)'}">
                <img src="../assets/img/ctzs.jpg" alt="">
                </div>
                <img src="../assets/img/title.png" alt="" class="p3title" :style="{transform:'translateZ('+p3imgshiju+'px) rotateY('+p3imgrotate+'deg)'}">
            </div>
            <!-- <div class="section">
              第四屏
            </div> -->
        </full-page>
    </div>
</template>

<script>
import '../assets/css/fullpage.min.css'
export default {
  data () {
    return {
      YiYanContent: {
        from: '古代',
        from_who: '诗人',
        created_at: '4678-88-88',
        type: '诗歌',
        hitokoto: '千里江陵一日还'
      },
      options: {
        licenseKey: 'null',
        // 循环滚动
        continuousVertical: true,
        afterLoad: this.afterLoad,
        onLeave: this.onLeave,
        scrollOverflow: true,
        scrollBar: false,
        // 两侧导航
        controlArrows: false,
        // 是否显示横向幻灯片的导航
        slidesNavigation: true,
        // 横向幻灯片导航的位置，可以为top或者bottom
        slidesNavPosition: 'bottom',
        menu: '#menu',
        // 字体缩放
        resize: true,
        css3: true,
        // 项目导航
        navigation: true,
        navigationPosition: 'right',
        // 鼠标移动到小圆点上时显示出的提示信息
        navigationTooltips: ['第一页', '第二页', '第三页']
        // sectionsColor: ['rgba(243, 245, 247, 0.1)', 'rgba(243, 245, 247, 0.1)', 'rgba(243, 245, 247, 0.1)']
        // anchors: ['page1', 'page2', 'page3'],
        // sectionsColor: ['#41b883', '#ff5f45', '#0798ec', '#fec401', '#1bcee6', '#ee1a59', '#2c3e4f', '#ba5be9', '#b4b8ab']
      },
      bgrotate: 0,
      p1shiju: 500,
      p1rotate: -180,
      p2shiju: 6000,
      p2suofang: 0.1,
      p3shiju: 1200,
      p3rotate: 120,
      p3imgrotate: -60,
      p3imgshiju: 1200,
      p3x: 0
    }
  },
  created () {
  },
  methods: {
    async getYiyan () {
      const { data: res } = await this.$http.get('https://v1.hitokoto.cn')
      this.YiYanContent = res
      console.log(this.YiYanContent)
    },
    onLeave (anchors, item) {
      console.log(anchors)
      console.log(item)
      if (item.index !== 0) { // 第一屏
        // 初始化第二屏位置
        this.p2shiju = 6000
        this.p2suofang = 0.1
        // -----
        // 离开第一屏

        // alert('旋转')
      } else {
        // 到第一屏
        this.bgrotate = 0
        this.p1shiju = 0
        this.p1rotate = 0
      }
      if (item.index === 1) { // 第二屏
        // 初始化第一屏位置和背景
        this.p1shiju = 500
        this.p1rotate = -180
        this.bgrotate = -60
        // 初始化第二屏位置
        // this.p2shiju = 6000
        // this.p2suofang = 0.1
        // alert(11)
        this.p2shiju = 0
        this.p2suofang = 1
      } else {
        this.p2shiju = -2000
      }
      if (item.index === 2) { // 第三屏
        // 初始化第一屏位置和背景
        this.p1shiju = 500
        this.p1rotate = -180
        this.bgrotate = -60
        // 初始化第二屏位置
        // 此处不可初始化 会覆盖离场动画
        // this.p2shiju = 6000
        // this.p2suofang = 0.1

        this.p3shiju = -50
        this.p3rotate = 30
        this.p3x = 0
        this.p3imgrotate = 0
        this.p3imgshiju = 0
      } else {
        // 初始化第三屏位置
        this.p3shiju = -200
        this.p3rotate = -45
        this.p3x = 3000
        this.p3imgshiju = 1200
        this.p3imgrotate = -60
      }
      // if (item.index === 3) {
      //   // 初始化第二屏位置
      //   this.p2shiju = 6000
      //   this.p2suofang = 0.1

      //   this.p3shiju = -200
      //   this.p3rotate = -45
      //   this.p3x = 3000
      //   this.p3imgshiju = 1200
      //   this.p3imgrotate = -60
      // }
    }
  },
  mounted () {
    setTimeout(() => {
      this.p1shiju = 0
      this.p1rotate = 0
    }, 200)
  }
}
</script>

<style lang="less" scoped>
.bgbox{
  width: 1000px;
  height: 1000px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // background: pink;
  transition: all 2s;
}
.row1 .orb1,.row1 .orb2 {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  margin-top: -280px;
  margin-left: -30px;
}
.row1 .orb2{
  margin-top: -280px;
  margin-left: 500px;
}
.row1 div,
.row2 div,
.row3 div {
  background-image: linear-gradient(to right, #ffffff 0%, #bebdbd 100%);
  // background: -webkit-linear-gradient(top,#fff,#bebdbd);
  border-radius: 50%;
}
.row2 .orb1,
.row2 .orb2,
.row2 .orb3 {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  margin-top: -280px;
  margin-left: -500px;
}
.row2 .orb2{
  margin-top: -180px;
  margin-left: 500px;
}
.row2 .orb3{
  margin-top: 10px;
  margin-left: 0px;
}
.row3 .orb1,.row3 .orb2 {
  position: absolute;
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  margin-top: 0px;
  margin-left: 0px;
}
.row1 div{
  animation: orbmove 80s linear infinite ;
}
.row2 div{
  animation: orbmove 40s linear infinite ;
}
.row3 div{
  animation: orbmove 80s linear infinite ;
}
@keyframes orbmove {
  from{
    transform: translateX(0) rotate(0deg);
  }
  to{
    transform: translateX(-2000px) rotate(-1800deg);
  }
}
// 第一屏
.section1{
  perspective: 1000px; //透视
  // background: rgba(243, 245, 247, 0.1);
}
// 起始状态
// 第一屏幕
.p1{
  position: absolute;
  top:45%;
  left: 50%;
  background: pink;
  width: 880px;
  height: 320px;
  transition: all 1s; //过渡
  img{
    width: 100%;
    height: 100%;
  }
}
// 第二屏幕
.section2{
  perspective: 1000px;
}
.p2{
  position: absolute;
  width: 316px;
  height: 360px;
  text-align: center;
  background-color: pink;
  top: 50%;
  left: 50%;
  transition: all 2s;
  img{
    width: 100%;
    height: 100%;
  }
}
//第三屏幕
.section3{
  perspective: 1000px
}
.p3{
  position: absolute;
  width: 1440px;
  height: 760px;
  top:50%;
  left: 50%;
  margin-left: -270px;
  margin-top: -284px;
  background-color: pink;
  transition: all 4s;
  img{
    width: 100%;
    height: 100%;
  }
}
.p3title{
  position: absolute;
  top: 50%;
  left:50%;
  width: 200px;
  height: 100px;
  margin-left: -412px;
  margin-top: -10px;
  transition: all 4s;
}
</style>
